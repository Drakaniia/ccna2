import type { GoogleClaims } from "./types";

/** Google OAuth 2.0 endpoints. */
export const GOOGLE_AUTH_ENDPOINT = "https://accounts.google.com/o/oauth2/v2/auth";
export const GOOGLE_TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token";

const encoder = new TextEncoder();

function bytesToB64url(bytes: Uint8Array): string {
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function b64urlToString(value: string): string {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const pad = padded.length % 4 === 0 ? "" : "=".repeat(4 - (padded.length % 4));
  return atob(padded + pad);
}

/** Random, URL-safe state value for the CSRF check (spec §5). */
export function generateState(): string {
  return bytesToB64url(crypto.getRandomValues(new Uint8Array(16)));
}

/**
 * PKCE verifier + S256 challenge. The verifier is stashed inside the signed
 * state cookie and replayed on the callback.
 */
export async function generatePkce(): Promise<{ verifier: string; challenge: string }> {
  const verifier = bytesToB64url(crypto.getRandomValues(new Uint8Array(32)));
  const digest = await crypto.subtle.digest("SHA-256", encoder.encode(verifier));
  return { verifier, challenge: bytesToB64url(new Uint8Array(digest)) };
}

export interface AuthorizeParams {
  clientId: string;
  redirectUri: string;
  state: string;
  codeChallenge: string;
}

/** Build the Google authorization URL to 302 the browser to. */
export function buildAuthorizeUrl(params: AuthorizeParams): string {
  const url = new URL(GOOGLE_AUTH_ENDPOINT);
  url.searchParams.set("client_id", params.clientId);
  url.searchParams.set("redirect_uri", params.redirectUri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "openid email profile");
  url.searchParams.set("state", params.state);
  url.searchParams.set("code_challenge", params.codeChallenge);
  url.searchParams.set("code_challenge_method", "S256");
  // Let the student pick which Google account to use, so a faculty session
  // already open in the browser is not silently reused.
  url.searchParams.set("prompt", "select_account");
  return url.toString();
}

export interface TokenResponse {
  access_token?: string;
  id_token?: string;
  expires_in?: number;
  token_type?: string;
  error?: string;
  error_description?: string;
}

export interface ExchangeParams {
  code: string;
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  codeVerifier: string;
}

/** Exchange the authorization code for tokens (server-side, holds the secret). */
export async function exchangeCode(params: ExchangeParams): Promise<TokenResponse> {
  const body = new URLSearchParams({
    code: params.code,
    client_id: params.clientId,
    client_secret: params.clientSecret,
    redirect_uri: params.redirectUri,
    grant_type: "authorization_code",
    code_verifier: params.codeVerifier,
  });

  const res = await fetch(GOOGLE_TOKEN_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  // Google returns JSON on both success and error.
  return (await res.json()) as TokenResponse;
}

/**
 * Decode the ID token's payload. The token arrives directly from Google's
 * token endpoint over TLS in response to a request carrying our client secret,
 * so the payload is trusted without a JWKS signature check; we still validate
 * the standard claims below.
 */
export function decodeIdToken(idToken: string): GoogleClaims | null {
  const parts = idToken.split(".");
  if (parts.length !== 3) return null;
  try {
    return JSON.parse(b64urlToString(parts[1])) as GoogleClaims;
  } catch {
    return null;
  }
}

/** Standard ID-token claim checks. Returns null when valid, else a reason. */
export function validateIdTokenClaims(
  claims: GoogleClaims,
  clientId: string,
  now: number = Math.floor(Date.now() / 1000)
): string | null {
  if (claims.iss !== "accounts.google.com" && claims.iss !== "https://accounts.google.com") {
    return "bad_issuer";
  }
  if (claims.aud !== clientId) return "bad_audience";
  if (typeof claims.exp === "number" && claims.exp <= now) return "expired";
  return null;
}
