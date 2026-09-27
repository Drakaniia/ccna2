import { afterEach, describe, expect, it, vi } from "vitest";
import worker from "../src/index";
import {
  SESSION_COOKIE,
  STATE_COOKIE,
  STATE_TTL_SECONDS,
  createSessionToken,
  signJwt,
  verifyJwt,
} from "../src/session";
import type { Env, Role, SessionUser } from "../src/types";

/* -------------------------------- fixtures -------------------------------- */

const SECRET = "test-secret-value";
const CLIENT_ID = "test-client-id.apps.googleusercontent.com";
const WORKER_URL = "https://ccna-auth.example.workers.dev";
const SITE_ORIGIN = "https://drakaniia.github.io";

const student: SessionUser = {
  sub: "google-sub-student",
  email: "2401117078@student.buksu.edu.ph",
  name: "Juan Dela Cruz",
  studentId: "2401117078",
  role: "student",
};

function sessionUser(role: Role): SessionUser {
  return {
    ...student,
    role,
    email: role === "admin" ? "2400000000@student.buksu.edu.ph" : student.email,
    studentId: role === "admin" ? "2400000000" : student.studentId,
  };
}

interface DbCall {
  sql: string;
  bindings: unknown[];
}

/** Minimal D1 stand-in: records calls and can be made to fail on demand. */
function makeDb(opts: { failWrites?: boolean; rows?: unknown[] } = {}) {
  const calls: DbCall[] = [];
  const makeStatement = (sql: string) => {
    const statement = {
      _sql: sql,
      _bindings: [] as unknown[],
      bind(...args: unknown[]) {
        statement._bindings = args;
        return statement;
      },
      async run() {
        calls.push({ sql, bindings: statement._bindings });
        if (opts.failWrites) throw new Error("d1 unavailable");
        return { success: true };
      },
      async all() {
        calls.push({ sql, bindings: statement._bindings });
        return { results: opts.rows ?? [] };
      },
    };
    return statement;
  };

  const db = { prepare: (sql: string) => makeStatement(sql) } as unknown as D1Database;
  return { db, calls };
}

function makeEnv(overrides: Partial<Env> = {}): { env: Env; calls: DbCall[] } {
  const { db, calls } = makeDb();
  const env = {
    DB: db,
    GOOGLE_CLIENT_ID: CLIENT_ID,
    GOOGLE_CLIENT_SECRET: "test-client-secret",
    SESSION_SECRET: SECRET,
    WORKER_URL,
    ALLOWED_EMAIL_DOMAIN: "student.buksu.edu.ph",
    ALLOWED_HD_DOMAINS: "student.buksu.edu.ph,buksu.edu.ph",
    STUDENT_ID_REGEX: "^\\d{10}$",
    ADMIN_EMAIL: "2400000000@student.buksu.edu.ph",
    SITE_ORIGIN,
    SITE_BASE_PATH: "/ccna2",
    ...overrides,
  } as Env;
  return { env, calls };
}

const ctx = {} as ExecutionContext;

function get(path: string, headers: Record<string, string> = {}): Request {
  return new Request(`https://worker.example${path}`, { headers });
}

function b64url(value: unknown): string {
  return Buffer.from(JSON.stringify(value)).toString("base64url");
}

/** Build a Google-shaped ID token (only the payload is read by the worker). */
function idToken(overrides: Record<string, unknown> = {}): string {
  const now = Math.floor(Date.now() / 1000);
  const header = b64url({ alg: "RS256", typ: "JWT" });
  const payload = b64url({
    sub: "google-sub-student",
    email: "2401117078@student.buksu.edu.ph",
    email_verified: true,
    name: "Juan Dela Cruz",
    iss: "https://accounts.google.com",
    aud: CLIENT_ID,
    iat: now,
    exp: now + 3600,
    ...overrides,
  });
  return `${header}.${payload}.not-a-real-signature`;
}

/** A signed state cookie as `/auth/login` would issue it. */
function stateCookie(redirect = "/ccna2/"): Promise<string> {
  return signJwt({ state: "state-abc", verifier: "verifier-123", redirect }, SECRET, STATE_TTL_SECONDS);
}

function cookieHeader(token: string): Record<string, string> {
  return { Cookie: `${STATE_COOKIE}=${token}` };
}

function readSetCookie(res: Response, name: string): string | null {
  const raw = res.headers.get("set-cookie");
  if (!raw) return null;
  const match = raw.match(new RegExp(`${name}=([^;]*)`));
  return match ? match[1] : null;
}

/** Stub Google's token endpoint with a canned response. */
function stubTokenEndpoint(body: unknown, status = 200): void {
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } }))
  );
}

afterEach(() => {
  vi.unstubAllGlobals();
});

/* ---------------------------------- tests --------------------------------- */

describe("worker routes — health and CORS", () => {
  it("answers /health and echoes the exact site origin", async () => {
    const { env } = makeEnv();
    const res = await worker.fetch(get("/health"), env, ctx);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true, service: "ccna-auth" });
    expect(res.headers.get("access-control-allow-origin")).toBe(SITE_ORIGIN);
    expect(res.headers.get("access-control-allow-origin")).not.toBe("*");
    expect(res.headers.get("access-control-allow-credentials")).toBe("true");
  });

  it("answers an OPTIONS preflight with 204", async () => {
    const { env } = makeEnv();
    const res = await worker.fetch(new Request("https://worker.example/auth/session", { method: "OPTIONS" }), env, ctx);
    expect(res.status).toBe(204);
    expect(res.headers.get("access-control-allow-origin")).toBe(SITE_ORIGIN);
  });

  it("returns 404 for an unknown route", async () => {
    const { env } = makeEnv();
    const res = await worker.fetch(get("/nope"), env, ctx);
    expect(res.status).toBe(404);
    expect(await res.json()).toEqual({ error: "not_found" });
  });
});

describe("worker routes — /auth/login", () => {
  it("redirects to Google with PKCE and the worker redirect URI", async () => {
    const { env } = makeEnv();
    const res = await worker.fetch(get("/auth/login"), env, ctx);

    expect(res.status).toBe(302);
    const location = new URL(res.headers.get("location")!);
    expect(location.origin + location.pathname).toBe("https://accounts.google.com/o/oauth2/v2/auth");
    expect(location.searchParams.get("client_id")).toBe(CLIENT_ID);
    expect(location.searchParams.get("redirect_uri")).toBe(`${WORKER_URL}/auth/callback`);
    expect(location.searchParams.get("code_challenge_method")).toBe("S256");
    expect(location.searchParams.get("state")).toBeTruthy();

    const state = readSetCookie(res, STATE_COOKIE);
    expect(state).toBeTruthy();
    expect(res.headers.get("set-cookie")).toContain("HttpOnly");
    expect(res.headers.get("set-cookie")).toContain("SameSite=Lax");
  });

  it("keeps a same-base redirect and rejects an open redirect", async () => {
    const { env } = makeEnv();

    const okRes = await worker.fetch(get("/auth/login?redirect=/ccna2/exam/1"), env, ctx);
    const okState = (await verifyJwt<{ redirect: string }>(readSetCookie(okRes, STATE_COOKIE)!, SECRET))!;
    expect(okState.redirect).toBe("/ccna2/exam/1");

    const evilRes = await worker.fetch(get("/auth/login?redirect=https://evil.example/phish"), env, ctx);
    const evilState = (await verifyJwt<{ redirect: string }>(readSetCookie(evilRes, STATE_COOKIE)!, SECRET))!;
    expect(evilState.redirect).toBe("/ccna2/");
  });
});

describe("worker routes — /auth/callback", () => {
  it("denies when the state cookie is missing (no token exchange)", async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);
    const { env } = makeEnv();

    const res = await worker.fetch(get("/auth/callback?state=state-abc&code=abc"), env, ctx);
    expect(res.status).toBe(200);
    expect(await res.text()).toContain("expired");
    expect(fetchSpy).not.toHaveBeenCalled();
    expect(readSetCookie(res, STATE_COOKIE)).toBe("");
  });

  it("denies when state does not match", async () => {
    const { env } = makeEnv();
    const token = await stateCookie();
    const res = await worker.fetch(get("/auth/callback?state=WRONG&code=abc", cookieHeader(token)), env, ctx);
    expect(res.status).toBe(200);
    expect(await res.text()).toContain("expired");
  });

  it("renders a friendly page when Google returns error=access_denied", async () => {
    const { env } = makeEnv();
    const res = await worker.fetch(get("/auth/callback?error=access_denied"), env, ctx);
    expect(res.status).toBe(200);
    expect(await res.text()).toContain("declined");
  });

  it("admits a valid student, sets the session cookie and 302s with auth=ok", async () => {
    stubTokenEndpoint({ id_token: idToken() });
    const { env, calls } = makeEnv();
    const token = await stateCookie("/ccna2/exam/2");

    const res = await worker.fetch(get("/auth/callback?state=state-abc&code=abc", cookieHeader(token)), env, ctx);

    expect(res.status).toBe(302);
    expect(res.headers.get("location")).toBe(`${SITE_ORIGIN}/ccna2/exam/2?auth=ok`);
    const session = readSetCookie(res, SESSION_COOKIE);
    expect(session).toBeTruthy();
    expect(res.headers.get("set-cookie")).toContain("SameSite=None");

    // The roster upsert ran with the student's identity.
    expect(calls.some((c) => c.sql.includes("INSERT INTO users"))).toBe(true);
    expect(calls[0].bindings[1]).toBe("2401117078@student.buksu.edu.ph");
  });

  it("rejects a non-Buksu identity with a 403 denied page", async () => {
    stubTokenEndpoint({ id_token: idToken({ email: "someone@gmail.com", email_verified: true }) });
    const { env, calls } = makeEnv();
    const token = await stateCookie();

    const res = await worker.fetch(get("/auth/callback?state=state-abc&code=abc", cookieHeader(token)), env, ctx);

    expect(res.status).toBe(403);
    expect(await res.text()).toContain("Buksu student");
    expect(calls).toHaveLength(0);
  });

  it("rejects an ID token with the wrong audience", async () => {
    stubTokenEndpoint({ id_token: idToken({ aud: "someone-elses-client" }) });
    const { env } = makeEnv();
    const token = await stateCookie();
    const res = await worker.fetch(get("/auth/callback?state=state-abc&code=abc", cookieHeader(token)), env, ctx);
    expect(res.status).toBe(200);
    expect(await res.text()).toContain("bad_audience");
  });

  it("fails open when D1 is unavailable", async () => {
    stubTokenEndpoint({ id_token: idToken() });
    const { db } = makeDb({ failWrites: true });
    const { env } = makeEnv();
    (env as Env).DB = db;
    const token = await stateCookie();

    const res = await worker.fetch(get("/auth/callback?state=state-abc&code=abc", cookieHeader(token)), env, ctx);

    expect(res.status).toBe(302);
    expect(readSetCookie(res, SESSION_COOKIE)).toBeTruthy();
  });
});

describe("worker routes — session and logout", () => {
  it("reports authenticated:false without a cookie", async () => {
    const { env } = makeEnv();
    const res = await worker.fetch(get("/auth/session"), env, ctx);
    expect(await res.json()).toEqual({ authenticated: false });
  });

  it("returns the user for a valid session cookie", async () => {
    const { env } = makeEnv();
    const token = await createSessionToken(student, SECRET);
    const res = await worker.fetch(get("/auth/session", { Cookie: `${SESSION_COOKIE}=${token}` }), env, ctx);
    const body = (await res.json()) as { authenticated: boolean; user: { studentId: string; role: string } };
    expect(body.authenticated).toBe(true);
    expect(body.user.studentId).toBe("2401117078");
    expect(body.user.role).toBe("student");
    expect(JSON.stringify(body)).not.toContain("sub");
  });

  it("ignores a token signed with the wrong secret", async () => {
    const { env } = makeEnv();
    const token = await createSessionToken(student, "attacker-secret");
    const res = await worker.fetch(get("/auth/session", { Cookie: `${SESSION_COOKIE}=${token}` }), env, ctx);
    expect(await res.json()).toEqual({ authenticated: false });
  });

  it("clears the session cookie on logout", async () => {
    const { env } = makeEnv();
    const token = await createSessionToken(student, SECRET);
    const res = await worker.fetch(
      new Request("https://worker.example/auth/logout", {
        method: "POST",
        headers: { Cookie: `${SESSION_COOKIE}=${token}` },
      }),
      env,
      ctx
    );
    expect(res.status).toBe(204);
    expect(res.headers.get("set-cookie")).toContain("Max-Age=0");
  });
});

describe("worker routes — /admin/users", () => {
  it("rejects anonymous callers with 401", async () => {
    const { env } = makeEnv();
    const res = await worker.fetch(get("/admin/users"), env, ctx);
    expect(res.status).toBe(401);
  });

  it("rejects a student with 403", async () => {
    const { env } = makeEnv();
    const token = await createSessionToken(sessionUser("student"), SECRET);
    const res = await worker.fetch(get("/admin/users", { Cookie: `${SESSION_COOKIE}=${token}` }), env, ctx);
    expect(res.status).toBe(403);
  });

  it("returns the roster for an admin", async () => {
    const rows = [{ student_id: "2400000000", email: "2400000000@student.buksu.edu.ph" }];
    const { db } = makeDb({ rows });
    const { env } = makeEnv();
    (env as Env).DB = db;
    const token = await createSessionToken(sessionUser("admin"), SECRET);

    const res = await worker.fetch(get("/admin/users", { Cookie: `${SESSION_COOKIE}=${token}` }), env, ctx);
    expect(res.status).toBe(200);
    // The handler stamps the live role onto each row.
    expect(await res.json()).toEqual({ users: rows.map((row) => ({ ...row, role: "admin" })) });
  });

  it("labels a stale row as admin once ADMIN_EMAIL lists it", async () => {
    // Simulates a row written before the account was promoted: the stored role
    // is 'student', but the live config now includes it.
    const rows = [
      { student_id: "2401115560", email: "2401115560@student.buksu.edu.ph", role: "student", login_count: 1 },
      { student_id: "2401101397", email: "2401101397@student.buksu.edu.ph", role: "student", login_count: 1 },
    ];
    const { db } = makeDb({ rows });
    const { env } = makeEnv({
      ADMIN_EMAIL: "2401117078@student.buksu.edu.ph,2401115560@student.buksu.edu.ph",
    });
    (env as Env).DB = db;
    const token = await createSessionToken(sessionUser("admin"), SECRET);

    const res = await worker.fetch(get("/admin/users", { Cookie: `${SESSION_COOKIE}=${token}` }), env, ctx);
    const body = (await res.json()) as { users: { role: string }[] };
    expect(body.users.map((u) => u.role)).toEqual(["admin", "student"]);
  });
});
