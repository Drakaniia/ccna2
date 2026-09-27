import type { Env, GoogleClaims, Role } from "./types";

/**
 * Admission rules for the exam gate (spec §4). This module is deliberately
 * free of Cloudflare/D1 dependencies so it can be unit-tested in plain Node.
 *
 * A Google account is admitted only if ALL of the following hold:
 *   1. email_verified === true
 *   2. the email domain, case-insensitively, is exactly ALLOWED_EMAIL_DOMAIN
 *   3. the local part (before @) matches STUDENT_ID_REGEX
 *   4. hd is absent, or is one of ALLOWED_HD_DOMAINS
 *
 * Note on rule 4: Workspace secondary domains often report the *primary*
 * domain in `hd`, so `buksu.edu.ph` is tolerated here even though
 * `@buksu.edu.ph` email addresses are rejected. Rule 2 is authoritative.
 */

export interface RuleConfig {
  allowedEmailDomain: string;
  allowedHdDomains: string[];
  studentIdRegex: string;
  adminEmail: string;
}

export type DenyReason =
  | "missing_email"
  | "email_not_verified"
  | "wrong_domain"
  | "not_student_id"
  | "wrong_hd";

export interface RuleResult {
  allowed: boolean;
  reason?: DenyReason;
  /** The numeric student ID, present only when allowed. */
  studentId?: string;
  /** Normalised lowercase email, present only when allowed. */
  email?: string;
  role: Role;
}

/** Read rule configuration out of the Worker environment. */
export function configFromEnv(env: Env): RuleConfig {
  return {
    allowedEmailDomain: (env.ALLOWED_EMAIL_DOMAIN || "student.buksu.edu.ph").trim().toLowerCase(),
    allowedHdDomains: (env.ALLOWED_HD_DOMAINS || "student.buksu.edu.ph,buksu.edu.ph")
      .split(",")
      .map((d) => d.trim().toLowerCase())
      .filter(Boolean),
    studentIdRegex: env.STUDENT_ID_REGEX || "^\\d{10}$",
    adminEmail: (env.ADMIN_EMAIL || "").trim().toLowerCase(),
  };
}

/** Extract the domain portion of an email (everything after the last @). */
function emailDomain(email: string): string {
  const at = email.lastIndexOf("@");
  return at <= 0 ? "" : email.slice(at + 1);
}

/** Extract the local part of an email (everything before the last @). */
function emailLocalPart(email: string): string {
  const at = email.lastIndexOf("@");
  return at <= 0 ? "" : email.slice(0, at);
}

/**
 * Evaluate a decoded Google identity against the admission rules.
 * Pure and synchronous — pass a clock-free set of claims.
 */
export function evaluateIdentity(claims: GoogleClaims, config: RuleConfig): RuleResult {
  const raw = typeof claims.email === "string" ? claims.email : "";
  const email = raw.trim().toLowerCase();

  if (!email) {
    return { allowed: false, reason: "missing_email", role: "student" };
  }
  if (claims.email_verified !== true) {
    return { allowed: false, reason: "email_not_verified", role: "student" };
  }

  // Rule 2 — exact domain match. `...@student.buksu.edu.ph.EVIL.com` fails here.
  const domain = emailDomain(email);
  if (domain !== config.allowedEmailDomain) {
    return { allowed: false, reason: "wrong_domain", role: "student" };
  }

  // Rule 3 — numeric student ID.
  let idRegex: RegExp;
  try {
    idRegex = new RegExp(config.studentIdRegex);
  } catch {
    // A broken config must not open the gate.
    return { allowed: false, reason: "not_student_id", role: "student" };
  }
  const studentId = emailLocalPart(email);
  if (!idRegex.test(studentId)) {
    return { allowed: false, reason: "not_student_id", role: "student" };
  }

  // Rule 4 — tolerated Workspace hosted-domain claim.
  const hd = typeof claims.hd === "string" ? claims.hd.trim().toLowerCase() : "";
  if (hd && !config.allowedHdDomains.includes(hd)) {
    return { allowed: false, reason: "wrong_hd", role: "student" };
  }

  const role: Role = config.adminEmail && email === config.adminEmail ? "admin" : "student";
  return { allowed: true, email, studentId, role };
}

/** Human-friendly copy for each denial reason. */
export function denyMessage(reason: DenyReason | undefined): string {
  switch (reason) {
    case "email_not_verified":
      return "That Google account's email address is not verified.";
    case "wrong_domain":
      return "Only Buksu student accounts may take the practice exams. Personal mailboxes and @buksu.edu.ph staff accounts are not accepted.";
    case "not_student_id":
      return "Your Buksu account name does not look like a numeric student ID.";
    case "wrong_hd":
      return "That Google Workspace is not a recognised Buksu workspace.";
    case "missing_email":
    default:
      return "Google did not return an email address for that account.";
  }
}
