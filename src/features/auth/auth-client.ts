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
 * Gate for exam routes. Returns `true` only when the visitor may proceed;
 * otherwise it has already started navigating away.
 *
 * @param redirectPath the current site path (including base) to return to,
 *                     e.g. `/ccna2/exam/modules-7-9`.
 */
export async function ensureExamAccess(redirectPath: string): Promise<boolean> {
  const session = await fetchSession();
  if (session.authenticated) return true;

  // We just came back from a successful callback but still look signed out —
  // the browser dropped the cross-site cookie.
  const params = new URLSearchParams(window.location.search);
  if (params.get("auth") === "ok") {
    window.location.replace(sitePath("cookie-blocked"));
    return false;
  }

  window.location.replace(loginPageUrl(redirectPath));
  return false;
}

/** Turn the current location into a site-relative redirect path. */
export function currentPath(): string {
  return `${window.location.pathname}${window.location.search}`;
}
