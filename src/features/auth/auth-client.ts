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

/** Start the OAuth flow, returning to `redirectPath` (a site-relative path). */
export function loginUrlFor(redirectPath: string): string {
  return `${AUTH_BASE_URL}/auth/login?redirect=${encodeURIComponent(redirectPath)}`;
}

/** URL of the site's own login page, preserving where the visitor was headed. */
export function loginPageUrl(redirectPath: string): string {
  return `${sitePath("login")}?redirect=${encodeURIComponent(redirectPath)}`;
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
 * URL of the cookie-blocked explanation page, carrying where the visitor came
 * from so its "try again" link can bring them straight back afterwards.
 */
export function cookieBlockedUrl(redirectPath: string): string {
  return `${sitePath("cookie-blocked")}?redirect=${encodeURIComponent(redirectPath)}`;
}

/** Ask the Worker who the visitor is. Never throws. */
export async function fetchSession(): Promise<SessionResponse> {
  try {
    const res = await fetch(`${AUTH_BASE_URL}/auth/session`, {
      credentials: "include",
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return { authenticated: false };
    return (await res.json()) as SessionResponse;
  } catch {
    return { authenticated: false };
  }
}

/** End this site's session only (the Google session is left alone). */
export async function signOut(returnTo: string = sitePath("login")): Promise<void> {
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
 * for free and are sent to the login page when they try to go further.
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
