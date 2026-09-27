import type { Role } from "./types";

/** The subset of a users row the admin roster renders. */
export interface RosterRow {
  student_id: string;
  email: string;
  name: string | null;
  picture: string | null;
  role: Role;
  login_count: number;
  first_login_at: string;
  last_login_at: string;
}

export interface UpsertIdentity {
  sub: string;
  email: string;
  studentId: string;
  name?: string;
  givenName?: string;
  familyName?: string;
  picture?: string;
  role: "student" | "admin";
}

/**
 * Insert or refresh a roster row, keyed on email so a re-created Google
 * account keeps a single row (spec §7). Callers treat failures as fail-open.
 */
export async function upsertUser(db: D1Database, identity: UpsertIdentity): Promise<void> {
  const now = new Date().toISOString();
  await db
    .prepare(
      `INSERT INTO users (id, email, student_id, name, given_name, family_name, picture,
                          role, login_count, first_login_at, last_login_at, created_at, updated_at)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, 1, ?9, ?9, ?9, ?9)
       ON CONFLICT(email) DO UPDATE SET
         id            = excluded.id,
         student_id    = excluded.student_id,
         name          = excluded.name,
         given_name    = excluded.given_name,
         family_name   = excluded.family_name,
         picture       = excluded.picture,
         role          = excluded.role,
         login_count   = users.login_count + 1,
         last_login_at = excluded.last_login_at,
         updated_at    = excluded.updated_at`
    )
    .bind(
      identity.sub,
      identity.email,
      identity.studentId,
      identity.name ?? null,
      identity.givenName ?? null,
      identity.familyName ?? null,
      identity.picture ?? null,
      identity.role,
      now
    )
    .run();
}

/** Roster for the admin page, newest login first. */
export async function listUsers(db: D1Database): Promise<RosterRow[]> {
  const result = await db
    .prepare(
      `SELECT student_id, email, name, picture, role, login_count,
              first_login_at, last_login_at
         FROM users
        ORDER BY last_login_at DESC`
    )
    .all<RosterRow>();
  return result.results ?? [];
}
