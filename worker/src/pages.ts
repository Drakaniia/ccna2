import type { Env } from "./types";

/** Escape untrusted text before interpolating it into HTML. */
function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function siteUrl(env: Env, path = "/"): string {
  const origin = env.SITE_ORIGIN.replace(/\/+$/, "");
  const base = normaliseBasePath(env.SITE_BASE_PATH);
  const suffix = path === "/" ? "/" : path.startsWith("/") ? path : `/${path}`;
  return `${origin}${base}${suffix}`;
}

function normaliseBasePath(raw: string | undefined): string {
  if (!raw) return "";
  const trimmed = raw.trim();
  if (!trimmed || trimmed === "/") return "";
  return `/${trimmed.replace(/^\/+/, "").replace(/\/+$/, "")}`;
}

function loginUrl(env: Env, redirect: string | null): string {
  const base = `${env.WORKER_URL.replace(/\/+$/, "")}/auth/login`;
  return redirect ? `${base}?redirect=${encodeURIComponent(redirect)}` : base;
}

/* --------------------------------- styling -------------------------------- */

const STYLE = `
  :root { color-scheme: light dark; }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    min-height: 100vh;
    display: grid;
    place-items: center;
    padding: 32px 18px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    background: #f4f7f4;
    color: #17211b;
  }
  .card {
    width: 100%;
    max-width: 560px;
    background: #fff;
    border: 2px solid #dfe6df;
    border-radius: 16px;
    padding: 34px 34px 30px;
    box-shadow: 0 10px 30px rgba(40, 70, 40, 0.08);
  }
  .kicker {
    display: inline-block;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.9px;
    text-transform: uppercase;
    color: #12a0c6;
    margin-bottom: 10px;
  }
  h1 { margin: 0 0 12px; font-size: 25px; line-height: 1.25; }
  p { margin: 0 0 14px; font-size: 15px; line-height: 1.6; color: #46524a; }
  ul { margin: 0 0 18px; padding-left: 20px; }
  li { font-size: 14px; line-height: 1.6; color: #46524a; margin-bottom: 6px; }
  .actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 22px; }
  .btn {
    display: inline-block;
    padding: 11px 22px;
    border-radius: 9px;
    font-size: 14.5px;
    font-weight: 700;
    text-decoration: none;
    border: 2px solid transparent;
    cursor: pointer;
  }
  .btn-primary { background: #4d9838; color: #0f1a0c; }
  .btn-primary:hover { background: #3d7c2c; color: #fff; }
  .btn-ghost { border-color: #d5ddd5; color: #46524a; background: transparent; }
  .btn-ghost:hover { background: #f1f5f1; }
  .foot { margin-top: 18px; font-size: 12.5px; color: #88938b; }
  @media (prefers-color-scheme: dark) {
    body { background: #14181b; color: #e7ece7; }
    .card { background: #1d2327; border-color: #303a34; box-shadow: none; }
    p, li { color: #a9b3ab; }
    .btn-ghost { border-color: #3a453d; color: #c6cec7; }
    .btn-ghost:hover { background: #252c28; }
    .foot { color: #7d877f; }
  }
`;

function layout(title: string, body: string): string {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex" />
  <title>${esc(title)}</title>
  <style>${STYLE}</style>
</head>
<body>
  <main class="card">${body}</main>
</body>
</html>`;
}

/* ---------------------------------- pages --------------------------------- */

/** "Buksu account required" page (spec §4 rejection UX). */
export function deniedPage(env: Env, message: string, redirect: string | null): string {
  const retry = loginUrl(env, redirect);
  return layout(
    "Buksu account required",
    `
    <span class="kicker">CCNA 2 v7 Practice Exams</span>
    <h1>Buksu account required</h1>
    <p>${esc(message)}</p>
    <p>Practice exams are limited to Buksu student accounts. To be admitted, the Google account must be:</p>
    <ul>
      <li>on the <strong>student.buksu.edu.ph</strong> domain, and</li>
      <li>named with a numeric student ID (10 digits), e.g. <code>2401117078@student.buksu.edu.ph</code>.</li>
    </ul>
    <p>Personal mailboxes (<code>@gmail.com</code>, <code>@yahoo.com</code>, …) and <code>@buksu.edu.ph</code> staff accounts are not accepted.</p>
    <div class="actions">
      <a class="btn btn-primary" href="${esc(retry)}">Try another account</a>
      <a class="btn btn-ghost" href="${esc(siteUrl(env))}">Back to home</a>
    </div>
    <p class="foot">Signed in with the wrong account? Choose “Try another account” and pick a different Google login.</p>`
  );
}

/** Generic failure page (state mismatch, Google error, unexpected exception). */
export function errorPage(env: Env, title: string, message: string, redirect: string | null = null): string {
  const retry = loginUrl(env, redirect);
  return layout(
    title,
    `
    <span class="kicker">CCNA 2 v7 Practice Exams</span>
    <h1>${esc(title)}</h1>
    <p>${esc(message)}</p>
    <div class="actions">
      <a class="btn btn-primary" href="${esc(retry)}">Try signing in again</a>
      <a class="btn btn-ghost" href="${esc(siteUrl(env))}">Back to home</a>
    </div>`
  );
}

export { normaliseBasePath };
