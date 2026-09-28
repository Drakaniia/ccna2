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
  HANDOFF_HASH_PARAM,
  HANDOFF_PURPOSE,
  SESSION_COOKIE,
  STATE_COOKIE,
  STATE_TTL_SECONDS,
  createHandoffToken,
  createSessionToken,
  parseCookieHeader,
  serializeCookie,
  sessionCookie,
  signJwt,
  verifyJwt,
  verifySessionToken,
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
        case "POST /auth/exchange":
          return handleExchange(request, env, cors);
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
  const handoffToken = await createHandoffToken(user, env.SESSION_SECRET);
  const headers = new Headers(cors);
  headers.append("Set-Cookie", clearStateCookie);
  // Browser-session cookie: no Max-Age, so it dies with the browser. The token
  // itself also expires after 8 hours, whichever comes first. Kept as a
  // first-party fallback — the handoff below is what the site actually uses.
  headers.append("Set-Cookie", sessionCookie(sessionToken, isHttps(env)));
  headers.set("Location", handoffLocation(env, statePayload.redirect, handoffToken));
  headers.set("Cache-Control", "no-store");
  return new Response(null, { status: 302, headers });
}

/**
 * Where the callback sends the browser: back to the page that asked for a
 * sign-in, with the handoff token in the fragment. A fragment never reaches a
 * server, so the token stays out of access logs and `Referer` headers, and the
 * site strips it from the address bar the moment it has traded it in.
 */
function handoffLocation(env: Env, redirect: string, handoffToken: string): string {
  const target = `${trimSlash(env.SITE_ORIGIN)}${withAuthFlag(redirect)}`;
  return `${target}#${HANDOFF_HASH_PARAM}=${handoffToken}`;
}

/**
 * Trade a sign-in handoff token for a session token the site stores itself.
 *
 * This exists because the session cookie is third-party to the site and is
 * blocked on a lot of devices; a token the page can send as a header works
 * everywhere. Only a token minted by `/auth/callback` is accepted, and only
 * within its short TTL.
 */
async function handleExchange(request: Request, env: Env, cors: Headers): Promise<Response> {
  let handoff: string | null = null;
  try {
    const body = (await request.json()) as { s?: unknown } | null;
    if (typeof body?.s === "string") handoff = body.s;
  } catch {
    /* malformed body — reported as an invalid handoff below */
  }
  if (!handoff) return json({ error: "invalid_handoff" }, 400, cors);

  const payload = await verifyJwt<{ purpose?: string; user?: SessionUser }>(
    handoff,
    env.SESSION_SECRET
  );
  if (payload?.purpose !== HANDOFF_PURPOSE || !payload.user?.email) {
    return json({ error: "invalid_handoff" }, 400, cors);
  }

  const token = await createSessionToken(payload.user, env.SESSION_SECRET);
  return json({ token }, 200, cors);
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
  // Bearer first: the site's own token survives third-party-cookie blocking,
  // while the cookie only works where the browser lets a cross-site cookie
  // through (and on localhost, where the two ports are same-site).
  const bearer = bearerToken(request);
  if (bearer) return verifySessionToken(bearer, env.SESSION_SECRET);

  const cookies = parseCookieHeader(request.headers.get("Cookie"));
  const token = cookies[SESSION_COOKIE];
  if (!token) return null;
  return verifySessionToken(token, env.SESSION_SECRET);
}

/** `Authorization: Bearer <token>` value, or null when the header is absent. */
function bearerToken(request: Request): string | null {
  const header = request.headers.get("Authorization");
  if (!header) return null;
  const match = /^Bearer\s+(.+)$/i.exec(header.trim());
  return match?.[1]?.trim() || null;
}

function corsHeaders(env: Env): Headers {
  const headers = new Headers();
  // Never `*` — credentialed requests require an exact origin.
  headers.set("Access-Control-Allow-Origin", trimSlash(env.SITE_ORIGIN));
  headers.set("Access-Control-Allow-Credentials", "true");
  headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  // Authorization is not a CORS-safelisted header, so sending the session token
  // as a Bearer header preflights. Accept is listed defensively — it is
  // safelisted, but a browser that still reports it would otherwise fail the
  // whole sign-in. The cache keeps the preflight to one extra round trip.
  headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept");
  headers.set("Access-Control-Max-Age", "600");
  headers.set("Vary", "Origin");
  return headers;
}

function json(body: unknown, status: number, base: Headers): Response {
  const headers = new Headers(base);
  headers.set("Content-Type", "application/json");
  // Never cache an auth answer: a stored `authenticated:false` would outlive the
  // sign-in that fixed it.
  headers.set("Cache-Control", "no-store");
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
