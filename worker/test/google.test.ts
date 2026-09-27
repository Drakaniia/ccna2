import { describe, expect, it } from "vitest";
import { buildAuthorizeUrl, decodeIdToken, generatePkce } from "../src/google";

/** base64url-encode UTF-8 text the way Google encodes a JWT segment. */
function b64urlText(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function token(payload: unknown): string {
  return `${b64urlText(JSON.stringify({ alg: "RS256", typ: "JWT" }))}.${b64urlText(
    JSON.stringify(payload)
  )}.not-a-real-signature`;
}

describe("decodeIdToken", () => {
  it("decodes multi-byte UTF-8 claims instead of mojibake", () => {
    const claims = decodeIdToken(token({ email: "2401117078@student.buksu.edu.ph", name: "Alistair Ybañez" }));
    expect(claims?.name).toBe("Alistair Ybañez");
  });

  it("decodes a name in a non-Latin script", () => {
    const claims = decodeIdToken(token({ name: "José Peña 日本語" }));
    expect(claims?.name).toBe("José Peña 日本語");
  });

  it("round-trips ASCII claims unchanged", () => {
    expect(decodeIdToken(token({ name: "Juan Dela Cruz" }))?.name).toBe("Juan Dela Cruz");
  });

  it("returns null for malformed tokens", () => {
    expect(decodeIdToken("not-a-jwt")).toBeNull();
    expect(decodeIdToken("a.b.c")).toBeNull();
    expect(decodeIdToken("")).toBeNull();
  });
});

describe("buildAuthorizeUrl", () => {
  it("requests the openid/email/profile scopes with PKCE S256", () => {
    const url = new URL(
      buildAuthorizeUrl({
        clientId: "client-id",
        redirectUri: "https://worker.example/auth/callback",
        state: "state-value",
        codeChallenge: "challenge-value",
      })
    );
    expect(url.origin + url.pathname).toBe("https://accounts.google.com/o/oauth2/v2/auth");
    expect(url.searchParams.get("scope")).toBe("openid email profile");
    expect(url.searchParams.get("code_challenge_method")).toBe("S256");
    expect(url.searchParams.get("redirect_uri")).toBe("https://worker.example/auth/callback");
    expect(url.searchParams.get("prompt")).toBe("select_account");
  });
});

describe("generatePkce", () => {
  it("produces a URL-safe verifier and an S256 challenge", async () => {
    const { verifier, challenge } = await generatePkce();
    expect(verifier).toMatch(/^[A-Za-z0-9_-]+$/);
    expect(challenge).toMatch(/^[A-Za-z0-9_-]+$/);

    // The challenge must be the base64url SHA-256 of the verifier.
    const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(verifier));
    let binary = "";
    for (const b of new Uint8Array(digest)) binary += String.fromCharCode(b);
    const expected = btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    expect(challenge).toBe(expected);
  });

  it("generates a fresh verifier each time", async () => {
    const a = await generatePkce();
    const b = await generatePkce();
    expect(a.verifier).not.toBe(b.verifier);
  });
});
