-- Cloudflare D1 schema for ccna-auth-db.
-- Apply locally:  wrangler d1 execute ccna-auth-db --local  --file=schema.sql
-- Apply remotely: wrangler d1 execute ccna-auth-db --remote --file=schema.sql

CREATE TABLE IF NOT EXISTS users (
  id             TEXT PRIMARY KEY,          -- Google 'sub'
  email          TEXT NOT NULL UNIQUE,      -- lowercase, e.g. 2401117078@student.buksu.edu.ph
  student_id     TEXT NOT NULL,             -- local part, e.g. 2401117078
  name           TEXT,
  given_name     TEXT,
  family_name    TEXT,
  picture        TEXT,
  role           TEXT NOT NULL DEFAULT 'student',   -- 'student' | 'admin'
  login_count    INTEGER NOT NULL DEFAULT 0,
  first_login_at TEXT NOT NULL,             -- ISO-8601 UTC
  last_login_at  TEXT NOT NULL,
  created_at     TEXT NOT NULL,
  updated_at     TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_users_last_login ON users(last_login_at DESC);
CREATE INDEX IF NOT EXISTS idx_users_role       ON users(role);
