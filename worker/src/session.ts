import type { SessionUser } from "./types";

/** Session cookie + token lifetime (spec §5). */
export const SESSION_COOKIE = "ccna_session";
export const STATE_COOKIE = "ccna_oauth_state";
export const SESSION_TTL_SECONDS = 8 * 60 * 60; // 8-hour hard ceiling
export const STATE_TTL_SECONDS = 10 * 60; // OAuth state / PKCE lifetime
/**
 * How long the sign-in handoff token stays exchangeable. The site redeems it on
 * the page load that follows the redirect, so it only has to outlive one
 * navigation — short enough that a URL left in the browser history ages out.
 */
export const HANDOFF_TTL_SECONDS = 5 * 60;
/** Fragment parameter carrying the handoff token back to the site (`#s=...`). */
export const HANDOFF_HASH_PARAM = "s";
/** Marks a token as an unredeemed handoff rather than a live session. */
export const HANDOFF_PURPOSE = "handoff";

const encoder = new TextEncoder();

export interface SessionClaims extends SessionUser {
  iat: number;
  exp: number;
}

/* ------------------------------- base64url ------------------------------- */

function bytesToB64url(bytes: Uint8Array): string {
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function b64urlToBytes(value: string): Uint8Array {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const pad = padded.length % 4 === 0 ? "" : "=".repeat(4 - (padded.length % 4));
  const binary = atob(padded + pad);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function encodeSegment(value: unknown): string {
  return bytesToB64url(encoder.encode(JSON.stringify(value)));
}

function decodeSegment<T>(segment: string): T {
  return JSON.parse(new TextDecoder().decode(b64urlToBytes(segment))) as T;
}

/* --------------------------------- crypto -------------------------------- */

async function importKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/* ---------------------------------- JWT ---------------------------------- */

/** Sign an arbitrary payload into an HS256 JWT with `iat`/`exp` claims. */
export async function signJwt(
  payload: Record<string, unknown>,
  secret: string,
  ttlSeconds: number,
  now: number = Math.floor(Date.now() / 1000)
): Promise<string> {
  const header = encodeSegment({ alg: "HS256", typ: "JWT" });
  const body = encodeSegment({ ...payload, iat: now, exp: now + ttlSeconds });
  const data = `${header}.${body}`;
  const signature = await crypto.subtle.sign("HMAC", await importKey(secret), encoder.encode(data));
  return `${data}.${bytesToB64url(new Uint8Array(signature))}`;
}

/** Verify an HS256 JWT. Returns the payload, or null if invalid/expired. */
export async function verifyJwt<T = Record<string, unknown>>(
  token: string,
  secret: string,
  now: number = Math.floor(Date.now() / 1000)
): Promise<(T & { iat: number; exp: number }) | null> {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [header, body, signature] = parts;
  try {
    const expected = await crypto.subtle.sign(
      "HMAC",
      await importKey(secret),
      encoder.encode(`${header}.${body}`)
    );
    if (!constantTimeEqual(signature, bytesToB64url(new Uint8Array(expected)))) return null;

    const payload = decodeSegment<T & { iat: number; exp: number }>(body);
    if (typeof payload.exp !== "number" || payload.exp <= now) return null;
    return payload;
  } catch {
    return null;
  }
}

/**
 * Build the short-lived handoff token the callback hands to the site in the URL
 * fragment.
 *
 * The cross-site session cookie cannot be relied on — Safari/iOS, Firefox,
 * Brave and Chrome's third-party-cookie settings all drop it — so the site
 * trades this token for a session token of its own at `/auth/exchange` and sends
 * that back as `Authorization: Bearer`. It carries `purpose` so it can never be
 * replayed as a session, and stays short-lived because the redirect URL can end
 * up in browser history.
 */
export function createHandoffToken(
  user: SessionUser,
  secret: string,
  now: number = Math.floor(Date.now() / 1000)
): Promise<string> {
  return signJwt(
    {
      purpose: HANDOFF_PURPOSE,
      user: {
        sub: user.sub,
        email: user.email,
        name: user.name,
        picture: user.picture,
        studentId: user.studentId,
        role: user.role,
      },
    },
    secret,
    HANDOFF_TTL_SECONDS,
    now
  );
}

/** Build the signed session token for a freshly authenticated user. */
export function createSessionToken(
  user: SessionUser,
  secret: string,
  now: number = Math.floor(Date.now() / 1000)
): Promise<string> {
  return signJwt(
    {
      sub: user.sub,
      email: user.email,
      name: user.name,
      picture: user.picture,
      studentId: user.studentId,
      role: user.role,
    },
    secret,
    SESSION_TTL_SECONDS,
    now
  );
}

/**
 * Verify a session token (cookie value or `Authorization: Bearer` header).
 * Handoff tokens are rejected here: only `/auth/exchange` may redeem one, so a
 * redirect URL leaked from the history can never stand in for a live session.
 */
export async function verifySessionToken(
  token: string,
  secret: string,
  now: number = Math.floor(Date.now() / 1000)
): Promise<SessionClaims | null> {
  const claims = await verifyJwt<SessionClaims & { purpose?: string }>(token, secret, now);
  if (!claims || claims.purpose !== undefined) return null;
  return claims;
}

/* --------------------------------- cookies -------------------------------- */

export interface CookieOptions {
  path?: string;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: "Lax" | "Strict" | "None";
  maxAge?: number;
}

/** Serialise one Set-Cookie header value. */
export function serializeCookie(name: string, value: string, opts: CookieOptions = {}): string {
  const parts = [`${name}=${value}`];
  parts.push(`Path=${opts.path ?? "/"}`);
  if (opts.httpOnly !== false) parts.push("HttpOnly");
  if (opts.secure) parts.push("Secure");
  parts.push(`SameSite=${opts.sameSite ?? "Lax"}`);
  if (typeof opts.maxAge === "number") parts.push(`Max-Age=${opts.maxAge}`);
  return parts.join("; ");
}

/** Parse a Cookie request header into a name → value map. */
export function parseCookieHeader(header: string | null | undefined): Record<string, string> {
  const out: Record<string, string> = {};
  if (!header) return out;
  for (const pair of header.split(";")) {
    const eq = pair.indexOf("=");
    if (eq === -1) continue;
    const name = pair.slice(0, eq).trim();
    const value = pair.slice(eq + 1).trim();
    if (name) out[name] = value;
  }
  return out;
}

/** Session cookie with the cross-site flags production needs, but dev-friendly. */
export function sessionCookie(value: string, secure: boolean, maxAge?: number): string {
  return serializeCookie(SESSION_COOKIE, value, {
    httpOnly: true,
    secure,
    sameSite: secure ? "None" : "Lax",
    maxAge,
  });
}
