# CCNA 2 v7 — SRWE Practice Exams

![CCNA 2 v7 — SRWE Practice Exams banner](./public/images/banner.png)

Interactive practice exams for the **CCNA 2 v7 (Switching, Routing, and Wireless Essentials)** module checkpoint quizzes, built as a static site with [Astro](https://astro.build).

Choose an exam group from the home page and work through its questions with instant checking, explanations, exhibit images, and a final score gauge. Taking an exam requires signing in with a Buksu student Google account (see [Authentication](#authentication-buksu-sso)); the chooser itself stays public.

## Features

- **Module chooser** home page listing all eight CCNA 2 v7 exam groups (unfinished groups are shown as "Coming soon")
- **In-browser quiz engine** with no server state — answers, checking, and results live entirely on the client
- **Three question types**:
  - Single-answer multiple choice
  - Multi-answer multiple choice (choose N)
  - Pairing / drag-matching boards
- **Instant feedback**: check an answer to reveal correctness, a plain-language explanation, and answer-revealing exhibit images
- **Per-question navigation** via a tab strip that tracks answered / wrong / unanswered states
- **Retry, Skip Question, and Skip All** controls
- **Submit overlay** warning about unanswered questions, with confirmation
- **Results screen** with an animated score gauge and pass/fail feedback
- **Dark / light theme** (auto-detected, persisted in `localStorage`)

## Available exams

| Module | Title | Status |
| --- | --- | --- |
| System Test | — | 🚧 Coming soon |
| Modules 1 – 4 | Switching Concepts, VLANs, and InterVLAN Routing | 🚧 Coming soon |
| Modules 5 – 6 | Redundant Networks | 🚧 Coming soon |
| Modules 7 – 9 | Available and Reliable Networks | ✅ Available |
| Modules 10 – 13 | L2 Security and WLANs | ✅ Available |
| Modules 14 – 16 | Routing Concepts and Configuration | ✅ Available |
| SRWEv7 Practice Final Exam | CCNA 2 v7 (SRWE) | 🚧 Coming soon |
| CCNA 2 v7 Course FINAL Exam | Switching, Routing, and Wireless Essentials | ✅ Available |

> The deployed site is live at <https://Drakaniia.github.io/ccna2/>.

## Tech stack

- [Astro](https://astro.build) — static site generation, routing, and server-isolated rendering
- [React](https://react.dev) — island components (`@astrojs/react`)
- [lucide-react](https://lucide.dev) — icons
- [Cloudflare Workers](https://workers.cloudflare.com) + [Wrangler](https://developers.cloudflare.com/workers/wrangler/) — the auth-only backend (`worker/`) that performs Google OAuth and holds the session
- [Cloudflare D1](https://developers.cloudflare.com/d1/) — free SQLite database holding the student identity roster
- Cisco Sans — self-hosted brand typeface (`src/styles/fonts/`, Regular/Bold/Heavy + obliques). Licensed, so the source archive is gitignored and the extracted woff2/woff files are committed. The files live under `src/` rather than `public/` so Vite applies the `/ccna2` base path; see the `@font-face` block in `src/styles/global.css` for the weight mapping.

## Getting started

Requires **Node.js >= 22.12**.

```bash
npm install
npm run dev
```

Open `http://localhost:4321`. Because the site deploys under the GitHub Pages repo-name base path (`/ccna2`), run the dev server from the project's standard workflow:

```bash
astro dev --background   # start the dev server in the background
astro dev logs           # tail dev-server output
astro dev stop           # stop the dev server
```

### Build & preview

```bash
npm run build      # static output goes to dist/
npm run preview    # serve the production build locally
```

## Authentication (Buksu SSO)

Exams are gated behind a **Cloudflare Worker** (`worker/`) that performs Google OAuth 2.0 and issues an `httpOnly` session cookie. Only Buksu **student** accounts are admitted — a numeric student ID on the `student.buksu.edu.ph` domain (e.g. `2401117078@student.buksu.edu.ph`). Personal mailboxes and `@buksu.edu.ph` staff addresses are intentionally rejected. The home page and module chooser remain public.

Why a Worker: GitHub Pages is static and cannot exchange an OAuth code, hold a client secret, or keep a session. The Worker is the only trusted component; the static site merely asks it who the visitor is.

### Worker API

| Method | Route | Auth | Behavior |
| --- | --- | --- | --- |
| `GET` | `/auth/login` | none | Builds `state` + PKCE, 302s to Google. |
| `GET` | `/auth/callback` | none | Validates `state`, exchanges the code, applies the admission rules, upserts D1 (fail-open), sets the cookie, 302s back to the site. |
| `GET` | `/auth/session` | cookie | `{ authenticated, user }`. |
| `POST` | `/auth/logout` | cookie | Clears this site's cookie, 204. |
| `GET` | `/admin/users` | admin | Read-only roster for the admin page. |
| `GET` | `/health` | none | Deployment smoke test. |

### One-time setup

1. `cd worker && npm install`
2. `npx wrangler d1 create ccna-auth-db` and paste the printed `database_id` into `worker/wrangler.toml`.
3. Apply the schema: `npx wrangler d1 execute ccna-auth-db --remote --file=schema.sql`
4. Set the secrets:
   ```bash
   npx wrangler secret put GOOGLE_CLIENT_ID
   npx wrangler secret put GOOGLE_CLIENT_SECRET
   openssl rand -base64 48 | npx wrangler secret put SESSION_SECRET
   npx wrangler secret put WORKER_URL   # https://ccna-auth.floresaybaez574.workers.dev
   ```
   `wrangler secret put` requires the Worker to already exist on the account, so run `npx wrangler deploy` once (from step 5) before setting secrets on a fresh setup.
5. `npx wrangler deploy` — the Worker is live at `https://ccna-auth.floresaybaez574.workers.dev`.
6. In the Google Cloud console, add the redirect URI `https://ccna-auth.floresaybaez574.workers.dev/auth/callback` (and the JavaScript origin `https://ccna-auth.floresaybaez574.workers.dev`) and publish the consent screen (or add test users).

### Local development

```bash
# terminal 1 — auth backend at http://localhost:8787
cd worker && cp .dev.vars.example .dev.vars   # fill in the secrets
npx wrangler d1 execute ccna-auth-db --local --file=schema.sql
npx wrangler dev --var SITE_ORIGIN:http://localhost:4321

# terminal 2 — site at http://localhost:4321 (PUBLIC_AUTH_BASE_URL defaults to :8787)
astro dev --background
```

`worker/.dev.vars` and `worker/.wrangler/` are gitignored. The root `.env` holds the raw Google client credentials for reference only; the Worker reads secrets from `.dev.vars` / `wrangler secret`.

### Tests

```bash
cd worker && npm test
```

`worker/test/rules.test.ts` covers the admission matrix (accepted student IDs, personal mailboxes, faculty addresses, non-numeric IDs, wrong digit counts, suffix spoofing, unverified emails); `worker/test/session.test.ts` covers JWT expiry/tamper rejection and cookie flags.

### Honest limitation

The exam pages are static files, so the questions live in the public bundle. The gate stops a casual visitor who opens an exam URL; it does not stop anyone who downloads the JS payload. Real enforcement would require serving exam content from behind the Worker — out of scope for this release.

## Deployment

The site is automatically built and deployed to **GitHub Pages** on every push to `main` via `.github/workflows/deploy.yml`. See that workflow's header comment for the one-time GitHub repository settings it requires.

## Project structure

```
src/
  pages/
    index.astro            # module chooser (home)
    exam/[module].astro    # quiz page — one route per available exam group
  features/exams/
    components/            # Astro + React UI components (tabs, question view,
                           #   choice options, pairing board, submit/result screens)
    data/
      index.ts             # module registry & availability list
      <module-id>/         # question data per exam group (added as groups ship)
    lib/
      types.ts             # question/module types & exhibit helpers
      quiz-state.ts        # client-side quiz store & transitions
      scoring.ts           # answer checking & scoring
      shuffle.ts           # option/order shuffling
  styles/
    global.css             # design tokens, light/dark themes, shared styles
public/
  images/                  # README banner + question exhibit images
```

### Adding a new exam group

1. Add a question data file under `src/features/exams/data/<module-id>/`.
2. Register it in `src/features/exams/data/index.ts` by adding an `ExamModule` to `availableModules`.
3. Flip `available` to `true` in the matching `moduleRegistry` entry — the chooser and `exam/[module]` routes pick it up automatically.

## Disclaimer

Practice questions for studying the CCNA 2 v7 curriculum. Cisco and CCNA are trademarks of Cisco Systems, Inc.; this project is not affiliated with or endorsed by Cisco.
