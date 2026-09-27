import { describe, expect, it } from "vitest";
import {
  SESSION_COOKIE,
  SESSION_TTL_SECONDS,
  createSessionToken,
  parseCookieHeader,
  serializeCookie,
  sessionCookie,
  signJwt,
  verifyJwt,
  verifySessionToken,
} from "../src/session";
import type { SessionUser } from "../src/types";

const SECRET = "test-secret-value";
const user: SessionUser = {
  sub: "google-sub-1",
  email: "2401117078@student.buksu.edu.ph",
  name: "Juan Dela Cruz",
  picture: "https://example.com/pic.png",
  studentId: "2401117078",
  role: "student",
};

describe("session token", () => {
  it("round-trips the user and expires 8 hours out", async () => {
    const now = 1_700_000_000;
    const token = await createSessionToken(user, SECRET, now);
    const claims = await verifySessionToken(token, SECRET, now);
    expect(claims).not.toBeNull();
    expect(claims?.email).toBe(user.email);
    expect(claims?.studentId).toBe(user.studentId);
    expect(claims?.role).toBe("student");
    expect(claims!.exp - claims!.iat).toBe(SESSION_TTL_SECONDS);
  });

  it("rejects a tampered payload", async () => {
    const token = await createSessionToken(user, SECRET);
    const [header, , signature] = token.split(".");
    const forged = `${header}.${btoa(JSON.stringify({ email: "attacker@example.com" }))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "")}.${signature}`;
    expect(await verifySessionToken(forged, SECRET)).toBeNull();
  });

  it("rejects a tampered signature", async () => {
    const token = await createSessionToken(user, SECRET);
    const last = token.slice(-1) === "A" ? "B" : "A";
    expect(await verifySessionToken(token.slice(0, -1) + last, SECRET)).toBeNull();
  });

  it("rejects a token signed with a different secret", async () => {
    const token = await createSessionToken(user, "other-secret");
    expect(await verifySessionToken(token, SECRET)).toBeNull();
  });

  it("rejects an expired token", async () => {
    const now = 1_700_000_000;
    const token = await createSessionToken(user, SECRET, now);
    expect(await verifySessionToken(token, SECRET, now + SESSION_TTL_SECONDS + 1)).toBeNull();
  });

  it("rejects a malformed token", async () => {
    expect(await verifyJwt("not-a-jwt", SECRET)).toBeNull();
  });
});

describe("cookies", () => {
  it("uses Secure + SameSite=None for cross-site production cookies", () => {
    const cookie = sessionCookie("abc", true);
    expect(cookie).toContain(`${SESSION_COOKIE}=abc`);
    expect(cookie).toContain("HttpOnly");
    expect(cookie).toContain("Secure");
    expect(cookie).toContain("SameSite=None");
    // Browser-session cookie: no Max-Age unless explicitly requested.
    expect(cookie).not.toContain("Max-Age");
  });

  it("falls back to SameSite=Lax without Secure on http dev", () => {
    const cookie = sessionCookie("abc", false);
    expect(cookie).toContain("SameSite=Lax");
    expect(cookie).not.toContain("Secure");
  });

  it("clears with Max-Age=0", () => {
    expect(sessionCookie("", true, 0)).toContain("Max-Age=0");
  });

  it("parses a Cookie header", () => {
    expect(parseCookieHeader("a=1; b=two; ccna_session=xyz")).toEqual({
      a: "1",
      b: "two",
      ccna_session: "xyz",
    });
  });

  it("serialises signed state-style cookies with a Max-Age", async () => {
    const token = await signJwt({ state: "s" }, SECRET, 600);
    const cookie = serializeCookie("ccna_oauth_state", token, {
      path: "/",
      httpOnly: true,
      sameSite: "Lax",
      maxAge: 600,
    });
    expect(cookie).toContain("ccna_oauth_state=");
    expect(cookie).toContain("Max-Age=600");
    expect(cookie).toContain("SameSite=Lax");
  });
});
