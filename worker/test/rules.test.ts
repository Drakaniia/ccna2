import { describe, expect, it } from "vitest";
import { evaluateIdentity, type RuleConfig } from "../src/rules";
import type { GoogleClaims } from "../src/types";

const config: RuleConfig = {
  allowedEmailDomain: "student.buksu.edu.ph",
  allowedHdDomains: ["student.buksu.edu.ph", "buksu.edu.ph"],
  studentIdRegex: "^\\d{10}$",
  adminEmail: "2400000000@student.buksu.edu.ph",
};

function claims(overrides: Partial<GoogleClaims> = {}): GoogleClaims {
  return {
    sub: "google-sub-1",
    email: "2401117078@student.buksu.edu.ph",
    email_verified: true,
    name: "Juan Dela Cruz",
    ...overrides,
  };
}

describe("evaluateIdentity — accepts", () => {
  it("admits a 10-digit student ID on the student domain", () => {
    const result = evaluateIdentity(claims(), config);
    expect(result.allowed).toBe(true);
    expect(result.studentId).toBe("2401117078");
    expect(result.email).toBe("2401117078@student.buksu.edu.ph");
    expect(result.role).toBe("student");
  });

  it("normalises case and surrounding whitespace", () => {
    const result = evaluateIdentity(
      claims({ email: "  2401117078@Student.Buksu.Edu.PH  " }),
      config
    );
    expect(result.allowed).toBe(true);
    expect(result.email).toBe("2401117078@student.buksu.edu.ph");
  });

  it("tolerates an absent hd claim", () => {
    expect(evaluateIdentity(claims({ hd: undefined }), config).allowed).toBe(true);
  });

  it("tolerates the primary Workspace domain in hd (secondary-domain students)", () => {
    expect(evaluateIdentity(claims({ hd: "buksu.edu.ph" }), config).allowed).toBe(true);
    expect(evaluateIdentity(claims({ hd: "student.buksu.edu.ph" }), config).allowed).toBe(true);
  });

  it("grants the admin role to ADMIN_EMAIL", () => {
    const result = evaluateIdentity(
      claims({ email: "2401117078@student.buksu.edu.ph" }),
      { ...config, adminEmail: "2401117078@student.buksu.edu.ph" }
    );
    expect(result.role).toBe("admin");
  });
});

describe("evaluateIdentity — rejects", () => {
  it("rejects a personal Gmail mailbox", () => {
    const r = evaluateIdentity(claims({ email: "2401117078@gmail.com", hd: undefined }), config);
    expect(r.allowed).toBe(false);
    expect(r.reason).toBe("wrong_domain");
  });

  it("rejects a faculty @buksu.edu.ph address", () => {
    expect(evaluateIdentity(claims({ email: "juan@buksu.edu.ph" }), config).reason).toBe("wrong_domain");
  });

  it("rejects a non-numeric local part", () => {
    expect(evaluateIdentity(claims({ email: "student@student.buksu.edu.ph" }), config).reason).toBe(
      "not_student_id"
    );
  });

  it("rejects a 9-digit student ID", () => {
    expect(evaluateIdentity(claims({ email: "240111707@student.buksu.edu.ph" }), config).reason).toBe(
      "not_student_id"
    );
  });

  it("rejects suffix spoofing", () => {
    expect(
      evaluateIdentity(claims({ email: "2401117078@student.buksu.edu.ph.EVIL.com" }), config).reason
    ).toBe("wrong_domain");
  });

  it("rejects an unverified email", () => {
    expect(evaluateIdentity(claims({ email_verified: false }), config).reason).toBe("email_not_verified");
  });

  it("rejects a hostile Workspace hd claim", () => {
    expect(evaluateIdentity(claims({ hd: "evil.com" }), config).reason).toBe("wrong_hd");
  });

  it("rejects a missing email", () => {
    expect(evaluateIdentity(claims({ email: undefined }), config).reason).toBe("missing_email");
  });

  it("fails closed when the configured regex is invalid", () => {
    expect(
      evaluateIdentity(claims(), { ...config, studentIdRegex: "(" }).allowed
    ).toBe(false);
  });
});
