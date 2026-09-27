#!/usr/bin/env node
/**
 * One-command dev runner: starts the Astro site AND the ccna-auth Worker in this
 * one terminal, so `bun run dev` (or `npm run dev`) is all you need.
 *
 * It also fixes the most common local failure up front. `wrangler dev` reads
 * worker/.dev.vars, which is gitignored and therefore often missing — and a
 * missing SESSION_SECRET makes the Worker crash on the first sign-in with:
 *
 *   DataError: Imported HMAC key length (0) must be a non-zero value
 *
 * So worker/.dev.vars is generated from the root .env (which holds your Google
 * credentials, SESSION_SECRET and ADMIN_EMAIL), with a SESSION_SECRET generated
 * once and then preserved. Re-running never rotates your session secret.
 *
 * Usage:
 *   bun run dev            # generate .dev.vars, then run both servers
 *   bun run dev -- --sync  # regenerate .dev.vars and exit
 *
 * Ports: site 4321 (SITE_PORT), worker 8787 (WORKER_PORT). The Worker is started
 * with SITE_ORIGIN=http://localhost:4321 so its CORS allowlist accepts the dev
 * site — without that override, /auth/session is blocked by CORS during development.
 */

import { spawn, spawnSync } from "node:child_process";
import { randomBytes } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const WORKER_DIR = join(ROOT, "worker");
const ENV_FILE = join(ROOT, ".env");
const DEV_VARS_FILE = join(WORKER_DIR, ".dev.vars");

const isWindows = process.platform === "win32";

/**
 * Named SITE_PORT / WORKER_PORT on purpose: `PORT` is not used because some
 * environments export PORT=0, which would make Astro bind a random port and
 * print a useless "localhost:0".
 */
function readPort(name, fallback) {
  const value = Number(process.env[name]);
  return Number.isInteger(value) && value > 0 && value <= 65535 ? value : fallback;
}

const SITE_PORT = readPort("SITE_PORT", 4321);
const WORKER_PORT = readPort("WORKER_PORT", 8787);

/* --------------------------------- helpers -------------------------------- */

/** Parse a KEY=value file; quotes around the value are optional. */
function parseEnvFile(text) {
  const out = {};
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq <= 0) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    const quoted =
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"));
    if (quoted && value.length >= 2) value = value.slice(1, -1);
    if (key) out[key] = value;
  }
  return out;
}

function quote(value) {
  return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

/**
 * Resolve a package-local binary, plus whether it must run through a shell.
 *
 * Windows cannot spawn a `.cmd` shim directly — Node throws `spawn EINVAL` — so
 * prefer bun's `.exe` shim and otherwise go through cmd.exe with the path
 * quoted. On POSIX the shim is a real script and needs no shell.
 */
function resolveBin(name, dir) {
  const binDir = join(dir, "node_modules", ".bin");
  if (isWindows) {
    const exe = join(binDir, `${name}.exe`);
    if (existsSync(exe)) return { file: exe, shell: false };
    const cmd = join(binDir, `${name}.cmd`);
    if (existsSync(cmd)) return { file: cmd, shell: true };
    return { file: name, shell: true }; // fall back to PATH (cmd resolves .cmd)
  }
  const shim = join(binDir, name);
  if (existsSync(shim)) return { file: shim, shell: false };
  return { file: name, shell: false };
}

/** Quote the executable when a shell will parse the command line. */
function shellFile({ file, shell }) {
  return shell && isWindows && /[\\/]/.test(file) ? `"${file}"` : file;
}

/* ------------------------------- .dev.vars -------------------------------- */

function syncDevVars() {
  const fromEnv = existsSync(ENV_FILE) ? parseEnvFile(readFileSync(ENV_FILE, "utf8")) : {};
  const previous = existsSync(DEV_VARS_FILE)
    ? parseEnvFile(readFileSync(DEV_VARS_FILE, "utf8"))
    : {};

  const clientId = fromEnv.GOOGLE_CLIENT_ID || previous.GOOGLE_CLIENT_ID;
  const clientSecret = fromEnv.GOOGLE_CLIENT_SECRET || previous.GOOGLE_CLIENT_SECRET;
  const adminEmail = fromEnv.ADMIN_EMAIL || previous.ADMIN_EMAIL;
  // Reuse the existing secret so logging everyone out on every `dev` is avoided.
  const sessionSecret =
    process.env.SESSION_SECRET ||
    fromEnv.SESSION_SECRET ||
    previous.SESSION_SECRET ||
    randomBytes(48).toString("base64");

  const missing = [];
  if (!clientId) missing.push("GOOGLE_CLIENT_ID");
  if (!clientSecret) missing.push("GOOGLE_CLIENT_SECRET");
  if (missing.length > 0) {
    console.error(
      `\n  Missing ${missing.join(" and ")}.\n\n` +
        `  Add them to ${ENV_FILE} (see the README's "Local development" section),\n` +
        `  then run this command again.\n`
    );
    process.exit(1);
  }

  const lines = [
    "# GENERATED by scripts/dev.mjs — edits here are overwritten on the next `dev` run.",
    "# Google credentials, SESSION_SECRET and ADMIN_EMAIL all come from the root .env.",
    `GOOGLE_CLIENT_ID=${quote(clientId)}`,
    `GOOGLE_CLIENT_SECRET=${quote(clientSecret)}`,
    `SESSION_SECRET=${quote(sessionSecret)}`,
    `WORKER_URL=${quote(`http://localhost:${WORKER_PORT}`)}`,
  ];
  // Present only when set: otherwise the value from wrangler.toml [vars] applies.
  if (adminEmail) lines.push(`ADMIN_EMAIL=${quote(adminEmail)}`);
  lines.push("");

  writeFileSync(DEV_VARS_FILE, lines.join("\n"));
  console.log(`[dev] wrote worker/.dev.vars${adminEmail ? " (including ADMIN_EMAIL)" : ""}`);
}

/* --------------------------------- runner --------------------------------- */

const children = [];
let shuttingDown = false;

function killTree(child) {
  if (!child || child.exitCode !== null || child.signalCode !== null) return;
  if (isWindows) {
    // wrangler dev spawns miniflare children; a plain kill would orphan them.
    spawnSync("taskkill", ["/pid", String(child.pid), "/T", "/F"], { stdio: "ignore" });
  } else {
    child.kill("SIGTERM");
  }
}

function shutdown(code) {
  if (shuttingDown) return;
  shuttingDown = true;
  for (const child of children) killTree(child);
  process.exit(code);
}

function start(label, name, args, cwd, env) {
  const target = resolveBin(name, cwd);
  const child = spawn(shellFile(target), args, {
    cwd,
    env: env ? { ...process.env, ...env } : process.env,
    // Only the Worker gets stdin: `wrangler dev` has an interactive menu
    // ([b] browser, [x] exit). Astro's own key shortcuts are not needed here.
    stdio: [label === "worker" ? "inherit" : "ignore", "inherit", "inherit"],
    shell: target.shell,
  });
  child.on("exit", (code, signal) => {
    if (shuttingDown) return;
    console.log(`[dev] ${label} exited (${signal ?? code}) — stopping everything`);
    shutdown(code ?? 0);
  });
  children.push(child);
  return child;
}

/* ---------------------------------- main ---------------------------------- */

if (!existsSync(WORKER_DIR)) {
  console.error(`[dev] no worker/ directory at ${WORKER_DIR}`);
  process.exit(1);
}

syncDevVars();

if (process.argv.includes("--sync")) process.exit(0);

// The tables are created with IF NOT EXISTS, so this is a cheap no-op once done —
// but without it a fresh checkout fails at login with "no such table: users".
const wrangler = resolveBin("wrangler", WORKER_DIR);
const schema = spawnSync(
  shellFile(wrangler),
  ["d1", "execute", "ccna-auth-db", "--local", "--file=./schema.sql"],
  { cwd: WORKER_DIR, stdio: "inherit", shell: wrangler.shell }
);
if (schema.status !== 0) {
  console.error("[dev] could not apply the local D1 schema — continuing anyway");
}

process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));

console.log(`\n[dev] site   http://localhost:${SITE_PORT}`);
console.log(`[dev] worker http://localhost:${WORKER_PORT}   (Ctrl+C stops both)\n`);

start("site", "astro", ["dev", "--port", String(SITE_PORT)], ROOT, {
  // Keep anything that reads PORT in agreement with the flag above.
  PORT: String(SITE_PORT),
});
start(
  "worker",
  "wrangler",
  ["dev", "--port", String(WORKER_PORT), "--var", `SITE_ORIGIN:http://localhost:${SITE_PORT}`],
  WORKER_DIR
);
