/** Bindings and configuration available to the Worker at runtime. */
export interface Env {
  /** D1 binding (see wrangler.toml). */
  DB: D1Database;

  // Secrets (wrangler secret put / .dev.vars)
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  SESSION_SECRET: string;
  /** Public origin of this Worker, e.g. https://ccna-auth.<sub>.workers.dev */
  WORKER_URL: string;

  // Plain vars (wrangler.toml [vars])
  ALLOWED_EMAIL_DOMAIN: string;
  ALLOWED_HD_DOMAINS: string;
  STUDENT_ID_REGEX: string;
  ADMIN_EMAIL: string;
  SITE_ORIGIN: string;
  SITE_BASE_PATH: string;
}

/** Claims decoded from Google's ID token (only the fields we rely on). */
export interface GoogleClaims {
  sub: string;
  email?: string;
  email_verified?: boolean;
  name?: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
  hd?: string;
  iss?: string;
  aud?: string;
  exp?: number;
  iat?: number;
}

export type Role = "student" | "admin";

/** The authenticated identity handed to the site. */
export interface SessionUser {
  sub: string;
  email: string;
  name?: string;
  picture?: string;
  studentId: string;
  role: Role;
}

/** Shape stored in D1. */
export interface UserRow {
  id: string;
  email: string;
  student_id: string;
  name: string | null;
  given_name: string | null;
  family_name: string | null;
  picture: string | null;
  role: Role;
  login_count: number;
  first_login_at: string;
  last_login_at: string;
  created_at: string;
  updated_at: string;
}
