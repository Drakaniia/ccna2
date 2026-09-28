/**
 * Browser-side auth client for the Buksu SSO gate.
 *
 * The site is static (GitHub Pages) and the Worker owns the session cookie, so
 * every check is an explicit cross-origin fetch with `credentials: "include"`.
 * No token ever reaches JS — the cookie is HttpOnly.
 */

export interface SessionUser {
  email: string;
  name?: string;
  picture?: string;
  studentId?: string;
  role: "student" | "admin";
}

export interface SessionResponse {
  authenticated: boolean;
  user?: SessionUser;
}

/** Public Worker origin. Defaults to the local `wrangler dev` server. */
export const AUTH_BASE_URL: string = (
  (import.meta.env.PUBLIC_AUTH_BASE_URL as string | undefined) ?? "http://localhost:8787"
).replace(/\/+$/, "");

/** Site root including the repo-name base path, without a trailing slash. */
export const SITE_BASE: string = import.meta.env.BASE_URL.replace(/\/+$/, "");

/** Build an absolute site path that respects the `/ccna2` base. */
export function sitePath(path = ""): string {
  const clean = path.replace(/^\/+/, "");
  return clean ? `${SITE_BASE}/${clean}` : `${SITE_BASE}/`;
}

/**
 * Start the OAuth flow, returning to `redirectPath` (a site-relative path).
 *
 * This is the only sign-in entry point in the site: the gate on the first
 * locked question, the header chip, the admin lock and the cookie-blocked
 * retry all link here, so there is no sign-in page of our own to keep in sync
 * or to bounce through.
 */
export function loginUrlFor(redirectPath: string): string {
  return `${AUTH_BASE_URL}/auth/login?redirect=${encodeURIComponent(redirectPath)}`;
}

/**
 * Keep a return path on this site (everything else falls back to the site root),
 * so a `redirect` query handed to the auth service can never become an open
 * redirect. Mirrors the Worker's own `resolveRedirect` check.
 */
export function safeReturnPath(raw: string | null | undefined): string {
  const fallback = `${SITE_BASE}/`;
  if (!raw) return fallback;
  const value = raw.trim();
  if (!value.startsWith("/") || value.startsWith("//") || value.includes("\\")) return fallback;
  const pathOnly = value.split(/[?#]/)[0];
  if (SITE_BASE === "") return value;
  if (pathOnly === SITE_BASE || pathOnly === `${SITE_BASE}/`) return value;
  if (!pathOnly.startsWith(`${SITE_BASE}/`)) return fallback;
  return value;
}

/**
 * Auth API this site needs from the Worker (see `AUTH_API_VERSION` in
 * `worker/src/index.ts`). Bump it in the same change that starts using a new
 * Worker endpoint, so a stale Worker is reported as a stale Worker.
 */
export const REQUIRED_AUTH_API = 2;

/** How the Worker answered the version handshake. */
export type AuthServiceState = "ready" | "outdated" | "unreachable";

/**
 * Ask the Worker which auth API it speaks.
 *
 * Redeeming a hand-off token needs a Worker from `REQUIRED_AUTH_API` onwards.
 * Until this distinction existed, a site running ahead of its Worker (a failed
 * `wrangler deploy`) showed the same "your sign-in did not finish" page as a
 * genuinely expired link, and every visitor was told their browser was at
 * fault. Never throws.
 */
export async function probeAuthService(): Promise<AuthServiceState> {
  try {
    const res = await fetch(`${AUTH_BASE_URL}/health`, { headers: { Accept: "application/json" } });
    if (!res.ok) return "unreachable";
    const body = (await res.json()) as { api?: unknown };
    return typeof body.api === "number" && body.api >= REQUIRED_AUTH_API ? "ready" : "outdated";
  } catch {
    // No answer is not an old answer: the service may simply be unreachable.
    return "unreachable";
  }
}

/**
 * URL of the cookie-blocked explanation page, carrying where the visitor came
 * from so its "try again" link can bring them straight back afterwards.
 */
export function cookieBlockedUrl(redirectPath: string): string {
  return `${sitePath("cookie-blocked")}?redirect=${encodeURIComponent(redirectPath)}`;
}

/* --------------------------------- session -------------------------------- */

/** localStorage key holding the session token handed over at sign-in. */
const TOKEN_KEY = "ccna-session-token";
/** Fragment parameter the Worker uses for the handoff token (`#s=...`). */
const HANDOFF_PARAM = "s";

/**
 * The session token lives in localStorage, not a cookie, because the Worker sits
 * on a different site (workers.dev) from the exams (github.io): the session
 * cookie is third-party to the site, and Safari/iOS, Firefox, Brave and Chrome's
 * third-party-cookie settings all drop it. A header the page sends itself works
 * on every device.
 */
function readToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null; // storage blocked — this visit stays signed out
  }
}

function writeToken(token: string | null): void {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* storage unavailable — nothing to keep */
  }
}

/**
 * Redeem the handoff token the Worker put in the URL fragment at sign-in.
 *
 * One promise per page, so the exam shell and every island hydrate against the
 * same exchange: an AccountChip that mounted a moment earlier can never read
 * "signed out" while the token is still being traded.
 */
let signIn: Promise<void> | null = null;

function finishSignIn(): Promise<void> {
  if (!signIn) signIn = consumeHandoff();
  return signIn;
}

async function consumeHandoff(): Promise<void> {
  if (typeof window === "undefined") return;

  let handoff: string | null = null;
  try {
    handoff = new URLSearchParams(window.location.hash.replace(/^#/, "")).get(HANDOFF_PARAM);
  } catch {
    return;
  }
  if (!handoff) return;

  // Strip it from the address bar before redeeming: the token is spent either
  // way, and this keeps it out of history and out of a shared screen.
  window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);

  try {
    const res = await fetch(`${AUTH_BASE_URL}/auth/exchange`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ [HANDOFF_PARAM]: handoff }),
    });
    if (!res.ok) return;
    const data = (await res.json()) as { token?: string };
    if (typeof data.token === "string" && data.token) writeToken(data.token);
  } catch {
    /* offline or blocked — the visitor stays signed out and can sign in again */
  }
}

/**
 * Headers for a Worker request: the stored session token as a Bearer token when
 * we have one, so Worker-authenticated calls work without the session cookie.
 */
export function authHeaders(extra: Record<string, string> = {}): Record<string, string> {
  const token = readToken();
  return { ...extra, ...(token ? { Authorization: `Bearer ${token}` } : {}) };
}

/** Ask the Worker who the visitor is. Never throws. */
export async function fetchSession(): Promise<SessionResponse> {
  await finishSignIn();
  const token = readToken();
  try {
    const res = await fetch(`${AUTH_BASE_URL}/auth/session`, {
      credentials: "include",
      headers: authHeaders({ Accept: "application/json" }),
    });
    if (!res.ok) return { authenticated: false };
    const body = (await res.json()) as SessionResponse;
    // The Worker answered, and it did not recognise the token we sent — drop it
    // so a later visit stops replaying a dead session.
    if (token && !body.authenticated) writeToken(null);
    return body;
  } catch {
    // A thrown fetch (offline, blocked) is not an answer, so the token stays.
    return { authenticated: false };
  }
}

/** End this site's session only (the Google session is left alone). */
export async function signOut(returnTo: string = sitePath("")): Promise<void> {
  // The Worker can only clear its own cookie, so the stored token goes too.
  writeToken(null);
  try {
    await fetch(`${AUTH_BASE_URL}/auth/logout`, { method: "POST", credentials: "include" });
  } catch {
    /* even if the Worker is unreachable, still send the visitor to login */
  }
  window.location.assign(returnTo);
}

/**
 * How much of an exam a visitor gets.
 *
 * `full` is any valid session — a Buksu student or an admin, since both hold the
 * cookie. `preview` is everyone else: they may answer the first few questions
 * for free and are shown the sign-in gate when they try to go further.
 */
export type AccessMode = "full" | "preview";

/** Number of questions a signed-out visitor gets before the login redirect. */
export const PREVIEW_QUESTION_COUNT = 5;

/**
 * Fired on `window` by the exam page right after it resolves the mode.
 *
 * `data-access` is only written once an awaited session fetch returns, which is
 * strictly after any `client:load` island has hydrated. An island that reads the
 * flag once on mount therefore reads the `"full"` default and can never observe
 * `"preview"` — this event is how it learns the real answer.
 */
export const ACCESS_MODE_EVENT = "exam:access";

/** Type guard for values read back out of storage or the DOM. */
export function isAccessMode(value: unknown): value is AccessMode {
  return value === "full" || value === "preview";
}

/**
 * Publish the resolved access mode to islands that hydrated before it was known.
 * Sets the document flag first so a late reader still gets the right answer.
 */
export function publishAccessMode(access: AccessMode): void {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.access = access;
  window.dispatchEvent(new CustomEvent<AccessMode>(ACCESS_MODE_EVENT, { detail: access }));
}

/**
 * Access mode as advertised by the document root, which the exam page sets
 * during boot (`<html data-access="full|preview">`).
 *
 * Lets late-mounting islands (the settings modal) read the mode without a second
 * session round trip. Defaults to `"full"` when the flag is missing or
 * unrecognised — the chooser page, SSR, and a storage-less browser all land there,
 * and the default must never silently shrink what a signed-in student can do.
 */
export function currentAccessMode(): AccessMode {
  if (typeof document === "undefined") return "full";
  const flag = document.documentElement.dataset.access;
  return isAccessMode(flag) ? flag : "full";
}

/** Turn the current location into a site-relative redirect path. */
export function currentPath(): string {
  return `${window.location.pathname}${window.location.search}`;
}
