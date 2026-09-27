import type { Env, SessionUser } from "./types";
import { configFromEnv, denyMessage, evaluateIdentity } from "./rules";
import {
  buildAuthorizeUrl,
  decodeIdToken,
  exchangeCode,
  generatePkce,
  generateState,
  validateIdTokenClaims,
} from "./google";
import {
  SESSION_COOKIE,
  STATE_COOKIE,
  STATE_TTL_SECONDS,
  createSessionToken,
  parseCookieHeader,
  serializeCookie,
  sessionCookie,
  signJwt,
  verifySessionToken,
  verifyJwt,
  type SessionClaims,
} from "./session";
import { listUsers, upsertUser } from "./db";
import { deniedPage, errorPage, normaliseBasePath } from "./pages";

interface StatePayload {
  state: string;
  verifier: string;
  redirect: string;
}

export default {
  async fetch(request: Request, env: Env, _ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const cors = corsHeaders(env);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    try {
      switch (`${request.method} ${url.pathname}`) {
        case "GET /health":
          return json({ ok: true, service: "ccna-auth" }, 200, cors);
        case "GET /auth/login":
          return handleLogin(env, url, cors);
        case "GET /auth/callback":
          return handleCallback(request, env, url, cors);
        case "GET /auth/session":
          return handleSession(request, env, cors);
        case "POST /auth/logout":
          return handleLogout(env, cors);
        case "GET /admin/users":
          return handleAdminUsers(request, env, cors);
        default:
          return json({ error: "not_found" }, 404, cors);
      }
    } catch (err) {
      console.error("ccna-auth: unhandled error", err);
      return htmlResponse(errorPage(env, "Something went wrong", "Please try signing in again."), 500);
    }
  },
} satisfies ExportedHandler<Env>;

/* --------------------------------- /auth ---------------------------------- */

async function handleLogin(env: Env, url: URL, cors: Headers): Promise<Response> {
  const redirect = resolveRedirect(url.searchParams.get("redirect"), env);
  const state = generateState();
  const { verifier, challenge } = await generatePkce();
  const redirectUri = `${trimSlash(env.WORKER_URL)}/auth/callback`;

  const authorizeUrl = buildAuthorizeUrl({
    clientId: env.GOOGLE_CLIENT_ID,
    redirectUri,
    state,
    codeChallenge: challenge,
  });

  const stateToken = await signJwt({ state, verifier, redirect } satisfies StatePayload, env.SESSION_SECRET, STATE_TTL_SECONDS);

  const headers = new Headers(cors);
  // The state cookie is scoped to the Worker and sent on the top-level
  // navigation back from Google, so SameSite=Lax is enough (and safer).
  headers.append(
    "Set-Cookie",
    serializeCookie(STATE_COOKIE, stateToken, {
      path: "/",
      httpOnly: true,
      secure: isHttps(env),
      sameSite: "Lax",
      maxAge: STATE_TTL_SECONDS,
    })
  );
  headers.set("Location", authorizeUrl);
  headers.set("Cache-Control", "no-store");
  return new Response(null, { status: 302, headers });
}

async function handleCallback(request: Request, env: Env, url: URL, cors: Headers): Promise<Response> {
  const clearStateCookie = serializeCookie(STATE_COOKIE, "", {
    path: "/",
    httpOnly: true,
    secure: isHttps(env),
    sameSite: "Lax",
    maxAge: 0,
  });

  const cookies = parseCookieHeader(request.headers.get("Cookie"));
  const stateToken = cookies[STATE_COOKIE];
  const statePayload = stateToken
    ? await verifyJwt<StatePayload>(stateToken, env.SESSION_SECRET)
    : null;

  const respond = (body: string, status: number): Response => {
    const headers = new Headers(cors);
    headers.append("Set-Cookie", clearStateCookie);
    headers.set("Content-Type", "text/html; charset=utf-8");
    headers.set("Cache-Control", "no-store");
    return new Response(body, { status, headers });
  };

  const errorParam = url.searchParams.get("error");
  if (errorParam) {
    const message =
      errorParam === "access_denied"
        ? "You cancelled the Google sign-in, or access was denied."
        : `Google returned an error: ${errorParam}.`;
    return respond(errorPage(env, "Sign-in was declined", message, statePayload?.redirect ?? null), 200);
  }

  const stateParam = url.searchParams.get("state");
  const code = url.searchParams.get("code");
  if (!statePayload || !stateParam || stateParam !== statePayload.state || !code) {
    // CSRF guard (spec §11): never exchange the code when state is bad.
    return respond(
      errorPage(
        env,
        "Sign-in session expired",
        "The sign-in link was stale or did not match. Please start again.",
        statePayload?.redirect ?? null
      ),
      200
    );
  }

  const redirectUri = `${trimSlash(env.WORKER_URL)}/auth/callback`;
  const tokens = await exchangeCode({
    code,
    clientId: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
    redirectUri,
    codeVerifier: statePayload.verifier,
  });

  if (!tokens.id_token) {
    return respond(
      errorPage(
        env,
        "Sign-in failed",
        tokens.error_description || "Google did not return an identity token.",
        statePayload.redirect
      ),
      200
    );
  }

  const claims = decodeIdToken(tokens.id_token);
  if (!claims) {
    return respond(
      errorPage(env, "Sign-in failed", "Could not read the identity token from Google.", statePayload.redirect),
      200
    );
  }

  const invalid = validateIdTokenClaims(claims, env.GOOGLE_CLIENT_ID);
  if (invalid) {
    return respond(
      errorPage(env, "Sign-in failed", `Identity token rejected (${invalid}).`, statePayload.redirect),
      200
    );
  }

  // Admission rules (spec §4).
  const result = evaluateIdentity(claims, configFromEnv(env));
  if (!result.allowed) {
    return respond(deniedPage(env, denyMessage(result.reason), statePayload.redirect), 403);
  }

  const user: SessionUser = {
    sub: claims.sub,
    email: result.email!,
    name: claims.name,
    picture: claims.picture,
    studentId: result.studentId!,
    role: result.role,
  };

  // Fail open (spec §11): a D1 outage must never block a valid student.
  try {
    await upsertUser(env.DB, {
      sub: user.sub,
      email: user.email,
      studentId: user.studentId,
      name: claims.name,
      givenName: claims.given_name,
      familyName: claims.family_name,
      picture: claims.picture,
      role: user.role,
    });
  } catch (err) {
    console.error("ccna-auth: D1 upsert failed (fail-open, login allowed)", err);
  }

  const sessionToken = await createSessionToken(user, env.SESSION_SECRET);
  const headers = new Headers(cors);
  headers.append("Set-Cookie", clearStateCookie);
  // Browser-session cookie: no Max-Age, so it dies with the browser. The token
  // itself also expires after 8 hours, whichever comes first.
  headers.append("Set-Cookie", sessionCookie(sessionToken, isHttps(env)));
  headers.set("Location", `${trimSlash(env.SITE_ORIGIN)}${withAuthFlag(statePayload.redirect)}`);
  headers.set("Cache-Control", "no-store");
  return new Response(null, { status: 302, headers });
}

async function handleSession(request: Request, env: Env, cors: Headers): Promise<Response> {
  const user = await currentUser(request, env);
  if (!user) return json({ authenticated: false }, 200, cors);
  return json(
    {
      authenticated: true,
      user: {
        email: user.email,
        name: user.name,
        picture: user.picture,
        studentId: user.studentId,
        role: user.role,
      },
    },
    200,
    cors
  );
}

async function handleLogout(env: Env, cors: Headers): Promise<Response> {
  const headers = new Headers(cors);
  headers.append("Set-Cookie", sessionCookie("", isHttps(env), 0));
  headers.set("Cache-Control", "no-store");
  return new Response(null, { status: 204, headers });
}

/* -------------------------------- /admin ---------------------------------- */

async function handleAdminUsers(request: Request, env: Env, cors: Headers): Promise<Response> {
  const user = await currentUser(request, env);
  if (!user) return json({ error: "unauthorized" }, 401, cors);
  if (user.role !== "admin") return json({ error: "forbidden" }, 403, cors);

  try {
    const config = configFromEnv(env);
    // Derive the displayed role from live config instead of the stored column:
    // a row written before an ADMIN_EMAIL change keeps its old role until that
    // account signs in again, which would mislabel a new admin as a student.
    const users = (await listUsers(env.DB)).map((row) => ({
      ...row,
      role: config.adminEmails.includes(row.email.trim().toLowerCase())
        ? ("admin" as const)
        : ("student" as const),
    }));
    return json({ users }, 200, cors);
  } catch (err) {
    console.error("ccna-auth: roster query failed", err);
    return json({ error: "db_unavailable" }, 500, cors);
  }
}

/* --------------------------------- helpers -------------------------------- */

async function currentUser(request: Request, env: Env): Promise<SessionClaims | null> {
  const cookies = parseCookieHeader(request.headers.get("Cookie"));
  const token = cookies[SESSION_COOKIE];
  if (!token) return null;
  return verifySessionToken(token, env.SESSION_SECRET);
}

function corsHeaders(env: Env): Headers {
  const headers = new Headers();
  // Never `*` — credentialed requests require an exact origin.
  headers.set("Access-Control-Allow-Origin", trimSlash(env.SITE_ORIGIN));
  headers.set("Access-Control-Allow-Credentials", "true");
  headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type");
  headers.set("Vary", "Origin");
  return headers;
}

function json(body: unknown, status: number, base: Headers): Response {
  const headers = new Headers(base);
  headers.set("Content-Type", "application/json");
  return new Response(JSON.stringify(body), { status, headers });
}

function htmlResponse(body: string, status: number): Response {
  return new Response(body, {
    status,
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
  });
}

function isHttps(env: Env): boolean {
  return env.WORKER_URL.trim().toLowerCase().startsWith("https:");
}

function trimSlash(value: string | undefined): string {
  return (value ?? "").trim().replace(/\/+$/, "");
}

/**
 * Open-redirect protection (spec §5): the `redirect` parameter must be a path
 * under SITE_BASE_PATH. Anything else falls back to the site root.
 */
export function resolveRedirect(raw: string | null, env: Env): string {
  const base = normaliseBasePath(env.SITE_BASE_PATH);
  const fallback = `${base}/`;
  if (!raw) return fallback;

  const value = raw.trim();
  if (!value.startsWith("/") || value.startsWith("//") || value.includes("\\")) return fallback;

  const pathOnly = value.split(/[?#]/)[0];
  if (base === "") return value;
  if (pathOnly === base || pathOnly === `${base}/`) return value;
  if (!pathOnly.startsWith(`${base}/`)) return fallback;
  return value;
}

function withAuthFlag(path: string): string {
  return `${path}${path.includes("?") ? "&" : "?"}auth=ok`;
}
