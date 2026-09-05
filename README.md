# CCNA 1 v7 — ITN Practice Exams

![CCNA 1 v7 — ITN Practice Exams banner](./public/images/banner.png)

Interactive practice exams for the **CCNA 1 v7 (Introduction to Networks)** module checkpoint quizzes, built as a static site with [Astro](https://astro.build).

Choose an exam group from the home page and work through its questions with instant checking, explanations, exhibit images, and a final score gauge — no account or backend required.

## Features

- **Module chooser** home page listing all six CCNA 1 v7 checkpoint exam groups (unfinished groups are shown as "Coming soon")
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
| Modules 8 – 10 | Communicating Between Networks | ✅ Available (76 questions) |
| Modules 1 – 3 | Basic Network Connectivity and Communications | 🚧 Coming soon |
| Modules 4 – 7 | Ethernet Concepts | 🚧 Coming soon |
| Modules 11 – 13 | IP Addressing | 🚧 Coming soon |
| Modules 14 – 16 | Routing Concepts and Essentials | 🚧 Coming soon |
| Modules 17 – 20 | Build a Small Cisco Network | 🚧 Coming soon |

> The deployed site is live at <https://Drakaniia.github.io/ccna2/>.

## Tech stack

- [Astro](https://astro.build) — static site generation, routing, and server-isolated rendering
- [React](https://react.dev) — island components (`@astrojs/react`)
- [lucide-react](https://lucide.dev) — icons
- [Inter](https://rsms.me/inter/) variable font (`@fontsource-variable/inter`)

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
      modules-8-10/        # question data for the available exam group
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

Practice questions for studying the CCNA 1 v7 curriculum. Cisco and CCNA are trademarks of Cisco Systems, Inc.; this project is not affiliated with or endorsed by Cisco.
