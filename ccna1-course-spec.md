# Spec — Add a CCNA 1 course alongside CCNA 2

Status: waiting for implementation
Date: 2026-10-22
Scope owner: Alistair Ybanez
Reference mock: `paste-1792638255429-21664.png` (attached screenshot — the exact visual target)

---

## 1. Problem

The site is currently a single-course CCNA 2 v7 (SRWE) practice-exam app. The home page lists
one flat `moduleRegistry` of eight CCNA 2 exam groups, and `/exam/<id>` serves whichever of
them have question data.

A student taking **CCNA 1 v7 (ITN)** now needs a place in the same app. CCNA 1 has **no module
group exams yet** — only the navigation and placeholder cards should exist, so the real exams
can be dropped in later without touching the page, the drawer, or the exam engine.

The home page therefore needs a **course chooser**: pick CCNA 1 or CCNA 2, then see only that
course's exam groups.

---

## 2. Goals

1. Home page gains a **"Choose a Course"** section with CCNA 1 and CCNA 2 cards, matching the
   attached mock exactly (visual fidelity is a requirement, not a suggestion).
2. Selecting a course **swaps the "Choose an Exam" grid in place** to that course's exam groups.
   No navigation, no URL change, no scroll jump.
3. **CCNA 1 view** shows its six checkpoint groups + final exam as greyed-out "Coming soon"
   cards, with a clear note that the exams are being prepared.
4. **CCNA 2 view** is behaviourally identical to today: same eight cards, same ids, same URLs,
   same saved attempts.
5. The **hamburger drawer** follows the active course (on the home page, whichever card is
   selected; on an exam page, that exam's course).
6. The choice is **remembered in `localStorage`** across visits, defaulting to CCNA 2 on a
   first-ever visit.
7. Adding a real CCNA 1 exam later is a **data-only change**: add question files, register the
   module, flip `available: true`.

### Non-goals

- Authoring any CCNA 1 questions, exhibits, or scoring data.
- Any change to the quiz engine (`quiz-state.ts`, scoring, tabs, submit, results).
- Nested per-course URLs (`/ccna1/...`) or query/hash course state — explicitly rejected.
- Changes to auth, the Worker, the admin roster, or the privacy page.
- Renaming or re-ID-ing existing CCNA 2 modules (would orphan saved attempts and shared links).
- Course indicators on individual exam pages (explicitly out of scope).

---

## 3. Decisions taken in the design interview

| # | Decision | Choice |
| --- | --- | --- |
| D1 | Course selection model | Client-side toggle on `/`, same page, no navigation |
| D2 | CCNA 1 with no exams | Placeholder cards, greyed out, "Coming soon" |
| D3 | Routing | Keep flat `/exam/<id>`; prefix future CCNA 1 ids with `itn-` |
| D4 | Branding scope | Home header + browser title only, course-aware; README/privacy/Worker wording untouched |
| D5 | Default course | Remember last choice in `localStorage`; default CCNA 2 |
| D6 | CCNA 1 group list | Official ITN v7 checkpoint groups (6) + Course Final Exam |
| D7 | Drawer | Lists the current course only; course switching happens on the home page |
| D8 | Deep links | Opening an exam URL updates the remembered course from that exam's `courseId` |
| D9 | Card semantics | Two toggle buttons with `aria-pressed`, always exactly one selected |
| D10 | Course card set | Checkpoints + final for CCNA 1 (no System Test / Practice Exam placeholders) |
| D11 | CCNA 1 registry | Pre-create all seven CCNA 1 entries now as `available: false` |
| D12 | Exam pages | No course indicator added; drawer brand only |
| D13 | Selection side effects | None beyond the grid swap (no scroll, no animation) |
| D14 | CCNA 1 copy | Course lead + "being prepared / check back soon" hint above the cards |
| D15 | Page title | `CCNA 1 & CCNA 2 Practice Exams`; description names both courses |
| D16 | No-JS fallback | Server-render the CCNA 2 view as today; CCNA 1 grid hidden until hydration |
| D17 | Verification | `npm run build` + browser smoke of toggle, persistence, drawer, and a live CCNA 2 exam |

---

## 4. Current state (what exists today)

- `src/features/exams/data/index.ts`
  - `ModuleMeta { id, title, subtitle, groupLabel, available }` and one flat
    `moduleRegistry` of 8 CCNA 2 entries.
  - `availableModules: Record<string, ExamModule>` — only modules with question data.
  - `getModuleMeta(id)`, `getModuleData(id)` helpers.
- `src/pages/index.astro`
  - Server-rendered `<h1>Choose an Exam</h1>`, lead paragraph, and the `moduleRegistry` grid.
  - Header title is hard-coded `CCNA 2 v7 — SRWE Practice Exams`.
  - No client script at all.
- `src/pages/exam/[module].astro`
  - `getStaticPaths()` filters `moduleRegistry` by `available` and emits `{ module: id }`.
  - Redirects to home if `availableModules[moduleId]` is missing.
- `src/features/exams/components/ExamHeader.astro`
  - Renders the hamburger drawer from `moduleRegistry`, grouping **consecutive** entries by
    `groupLabel`, and hard-codes the drawer brand `CCNA 2 v7 — SRWE`.
  - Drawer is server-rendered; its open/close script is inline.
- Persistence keys already namespaced by module id: `ccna-exam:<access>:<moduleId>`,
  `ccna-limit:<moduleId>`, `ccna-exam-migrated:<moduleId>`. Theme key: `ccna-theme`.
- Astro static build; deployed under the `/ccna2` GitHub Pages base path (`abs()` helpers
  everywhere).

**Important:** the screenshot's "Choose a Course" section does **not** exist in the code yet.
It is the target design, not a regression.

---

## 5. Data model

### 5.1 New file: `src/features/exams/data/courses.ts`

```ts
export type CourseId = "ccna1" | "ccna2";

export interface CourseMeta {
  id: CourseId;
  /** Kicker on the card, e.g. "CCNA 1" */
  label: string;
  /** Card headline, e.g. "Introduction to Networks" */
  title: string;
  /** Small tag under the title, e.g. "ITN · v7" */
  tag: string;
  /** Drawer brand prefix, e.g. "CCNA 1 v7 — ITN" */
  brand: string;
  /** One-line description under "Choose an Exam" */
  lead: string;
  /** Optional note shown above the grid (CCNA 1 only) */
  note?: string;
}

export const courseRegistry: CourseMeta[] = [ /* CCNA 1 first, then CCNA 2 */ ];

export function getCourseMeta(id: string | undefined | null): CourseMeta;
export function isCourseId(value: unknown): value is CourseId;
```

Exact copy (from the mock / decisions):

| Field | CCNA 1 | CCNA 2 |
| --- | --- | --- |
| `label` | `CCNA 1` | `CCNA 2` |
| `title` | `Introduction to Networks` | `Switching, Routing & Wireless` |
| `tag` | `ITN · v7` | `SRWE · v7` |
| `brand` | `CCNA 1 v7 — ITN` | `CCNA 2 v7 — SRWE` |
| `lead` | `CCNA 1 v7 — Introduction to Networks (ITN) module checkpoint exams.` | `CCNA 2 v7 — Switching, Routing, and Wireless Essentials (SRWE) module checkpoint exams.` |
| `note` | `These exams are being prepared — check back soon.` | *(none)* |

### 5.2 `src/features/exams/data/index.ts` changes

- `ModuleMeta` gains a required `courseId: CourseId`.
- Existing eight CCNA 2 entries keep **every field and id unchanged**; add `courseId: "ccna2"`.
- Registry order: keep the eight CCNA 2 entries in their present order, then **append** the
  seven CCNA 1 entries. All consumers must filter by course before grouping.
- New helpers:
  - `modulesForCourse(courseId: CourseId): ModuleMeta[]`
  - `getModuleCourseId(id: string): CourseId | undefined`
- `availableModules` stays keyed by module id and gains no CCNA 1 entries (no data yet).

### 5.3 CCNA 1 placeholder entries (pre-created, all `available: false`)

| id | title | subtitle | groupLabel |
| --- | --- | --- | --- |
| `itn-modules-1-3` | Modules 1 - 3 | Basic Switch and End Device Configuration | Checkpoint Exam |
| `itn-modules-4-7` | Modules 4 - 7 | Ethernet Concepts | Checkpoint Exam |
| `itn-modules-8-10` | Modules 8 - 10 | Communicating Between Networks | Checkpoint Exam |
| `itn-modules-11-13` | Modules 11 - 13 | IP Addressing | Checkpoint Exam |
| `itn-modules-14-15` | Modules 14 - 15 | Network Application Communications | Checkpoint Exam |
| `itn-modules-16-17` | Modules 16 - 17 | Building and Securing a Small Network | Checkpoint Exam |
| `itn-final-exam` | CCNA 1 v7 Course FINAL Exam | Introduction to Networks | Final Exam |

Notes:
- Subtitles follow the official ITN v7 checkpoint-exam titles; they are plain data and can be
  edited later without touching layout.
- No `System Test Exam` and no `Practice Final` entry for CCNA 1 (D10).
- Because `getStaticPaths()` filters on `available`, these ids **must not** produce routes yet.

---

## 6. Routing and existing-behaviour guarantees

- Exam routes stay flat: `/exam/modules-1-4` (CCNA 2) and, in future, `/exam/itn-modules-1-3`
  (CCNA 1). No redirects, no route renames.
- `getStaticPaths()` continues to emit routes only for `available` modules across **both**
  courses.
- Saved attempt keys and limits are untouched: `ccna-exam:full:modules-1-4` still resumes,
  `ccna-limit:modules-1-4` still applies. CCNA 1 ids are distinct, so no collisions occur.
- `ExamHeader` still resolves `maxQuestions` from `availableModules[currentId]`.

---

## 7. Remembered course

New file `src/features/exams/lib/course-selection.ts`, modelled on `exam-mode.ts` /
theme persistence:

- Key: `ccna-course` (matches the `ccna-*` convention; the theme script reads `ccna-theme`
  separately and is unchanged).
- Values: `"ccna1"` | `"ccna2"`. Anything else, absent, or a throwing `localStorage`
  (private mode) resolves to **`"ccna2"`**.
- Exports: `getStoredCourse()`, `setStoredCourse(id)`, and an optional
  `COURSE_EVENT = "course:change"` if the home page needs cross-component sync.
- Written **only** on:
  1. an explicit course-card click on the home page;
  2. exam page boot, from the module's `courseId` (D8) — so a deep link teaches the home page
     which course the student is actually in.
- Never read during server rendering (static build has no storage).

---

## 8. Home page (`src/pages/index.astro`)

### 8.1 Header and metadata

- `<ExamHeader title="CCNA Practice Exams" />` (screenshot header text).
- `<title>CCNA 1 & CCNA 2 Practice Exams</title>`.
- `<meta name="description" content="CCNA 1 (ITN) and CCNA 2 (SRWE) practice exams — module checkpoint quizzes." />`.
- Browser tab and meta text are the **only** branding change outside the home body; README,
  privacy page, and the Worker OAuth app name stay untouched (D4).

### 8.2 Markup

```
<main class="chooser">
  <h1>Choose a Course</h1>
  <p class="lead">Select CCNA 1 or CCNA 2 to view its practice exams and module checkpoints.</p>

  <section class="course-grid" aria-label="Courses">
    <button type="button" class="course-card" data-course="ccna1" aria-pressed="false" aria-controls="examPanels">
      <span class="course-kicker">CCNA 1</span>
      <span class="course-title">Introduction to Networks</span>
      <span class="course-tag">ITN · v7</span>
      <span class="course-cta">View exams <ArrowRightIcon /></span>
      <span class="course-badge" hidden>Selected</span>
    </button>
    <button type="button" class="course-card is-selected" data-course="ccna2" aria-pressed="true" aria-controls="examPanels">
      ... same structure, CTA "Current course", badge "SELECTED" visible ...
    </button>
  </section>

  <!-- one panel per course; server renders CCNA 2 visible, CCNA 1 hidden -->
  <div id="examPanels">
    <section class="exam-panel" data-course-panel="ccna2">
      <h2>Choose an Exam</h2>
      <p class="lead">{course.lead}</p>
      <div class="module-grid">{existing CCNA 2 cards, unchanged markup}</div>
    </section>
    <section class="exam-panel" data-course-panel="ccna1" hidden>
      <h2>Choose an Exam</h2>
      <p class="lead">{CCNA 1 lead}</p>
      <p class="panel-note">{CCNA 1 note}</p>
      <div class="module-grid">{seven CCNA 1 coming-soon cards}</div>
    </section>
  </div>
</main>
```

- Both panels are server-rendered (progressive enhancement): with JS disabled the CCNA 2
  panel is visible and interactive as today, and the CCNA 1 panel stays hidden (D16).
- Card markup inside each panel reuses today's `module-card` / `module-card disabled`
  structure and badge text (`Coming soon`) verbatim.
- Unavailable cards remain non-interactive `<div aria-disabled="true">` — no links, no fake
  pages for `itn-*` ids.

### 8.3 Behaviour (small inline `<script>`)

1. On load: `getStoredCourse()` → `applyCourse(id)`.
2. `applyCourse(id)`:
   - toggles `is-selected`, `aria-pressed`, badge visibility, and CTA text
     (`Current course` vs `View exams`) on the two cards;
   - shows the matching `[data-course-panel]`, hides the other;
   - no scrolling, no animation (D13).
3. Click on a course card: if already selected, no-op; otherwise `applyCourse(id)` +
   `setStoredCourse(id)`.
4. Keep the two `<h2>Choose an Exam</h2>` headings as the only panel headings so the document
   outline stays `h1` → `h2` → card `h2`s. Card exam titles stay `h2`.
5. Announce the swap for assistive tech: a visually hidden `role="status"` line updated to
   e.g. `Showing CCNA 1 exams. 7 exams coming soon.` / `Showing CCNA 2 exams. 6 exams available.`
6. Keyboard: native `<button>` tab/Enter/Space behaviour, visible focus ring; no roving
   tabindex, no arrow-key handling required.

### 8.4 Visual spec (match the mock)

- Container: existing `.app` (max-width 1030px). `main.chooser` padding unchanged.
- `h1` "Choose a Course": 27px / 700, same rhythm as today's chooser heading.
- `h2` "Choose an Exam": ~22px / 700, `margin: 40px 0 10px`.
- `.course-grid`: 2 columns, `gap: 18px`, `margin-bottom: 8px`; single column under
  `~640px` (cards stack, CCNA 1 first).
- `.course-card`:
  - `border: 2px solid var(--border)`, `border-radius: 12px`, `background: #fff`,
    `padding: 20px 24px`, `min-height: 104px`, `text-align: left`, `position: relative`,
    `display: flex; flex-direction: column;`, `cursor: pointer`, `font: inherit`,
    `color: var(--text)`;
  - `.is-selected`: `border-color: var(--cyan)`; optional soft cyan glow only if it does not
    fight the mock's flat look;
  - hover on the unselected card: `border-color: var(--green)` + the same
    `translateY(-2px)` / shadow used by exam cards (subtle, 0.15s ease);
  - `.course-kicker`: 11px / 600 uppercase, `letter-spacing: 0.8px`, `color: var(--cyan)`;
  - `.course-title`: 20px / 700, `margin-top: 8px`;
  - `.course-tag`: 12px / 500, `color: var(--muted)`, `margin-top: 6px`;
  - `.course-cta`: 14px / 600, `color: var(--green-dark)`, inline-flex with the 15px arrow,
    `margin-top: 14px`;
  - `.course-badge`: absolute top-right (`top: 16px; right: 16px`), 10–11px uppercase,
    `color: var(--cyan)`, `background: var(--cyan-soft)`, `border-radius: 20px`,
    `padding: 4px 10px`, `letter-spacing: 0.6px`; text `SELECTED`.
- `.exam-panel > .lead`: reuse the existing muted 15px lead.
- `.panel-note` (CCNA 1 only): 13.5px, `color: var(--muted)`, margin `-18px 0 24px`.
- Dark mode: use the existing tokens (`--text`, `--muted`, `--border`, `--cyan`,
  `--cyan-soft`, `--green-dark`) and add the same kind of `html[data-theme="dark"]`
  overrides other cards use (`#23272d`-style surface, adjusted badge contrast). No new
  hard-coded light-only colours.
- `prefers-reduced-motion`: no transition on the course cards beyond colour (or none).

---

## 9. Header drawer (`ExamHeader.astro`)

- New prop: `course?: CourseId` (optional, derived by the caller).
  - Home page passes the **initial** course (server default `ccna2`; hydration syncs it via
    `getStoredCourse()`).
  - Exam page passes `getModuleCourseId(mod.id)`.
- Drawer brand becomes `{course.brand}` + existing `Practice Exams` subtitle:
  - `CCNA 2 v7 — SRWE` / `Practice Exams` (visually unchanged from today),
  - `CCNA 1 v7 — ITN` / `Practice Exams`.
- Drawer nav renders **one section per course**, each wrapped in
  `[data-drawer-course="ccna1"|"ccna2"]`, filtering `moduleRegistry` by `courseId` **before**
  grouping by consecutive `groupLabel` (the current grouping loop must never see mixed
  courses).
- Visibility:
  - Exam pages: only the current course's block is rendered/visible.
  - Home page: both blocks exist; only the selected course's block is visible, and the inline
    script toggles them on course change. Implementation may either render both and hide one,
    or move the existing `data-drawer-course` blocks; whichever is chosen must keep focus,
    `aria-hidden`, and the scrim/keyboard trap untouched.
- Disabled (`available: false`) drawer items keep the current non-link "Coming soon" markup —
  CCNA 1's seven entries are listed and disabled, which is exactly the requested "navigation
  only" state.
- Drawer footer text `Select an exam group to begin practicing.` unchanged.

---

## 10. Exam pages (`src/pages/exam/[module].astro`)

- No markup, title, intro, or behaviour changes (D12).
- Add only the side effect: after the module resolves, `setStoredCourse(getModuleCourseId(moduleId))`
  during boot so returning home lands on that course (D8). Guard for unknown ids.
- Existing redirect for data-less modules stays.

---

## 11. Accessibility requirements

- Course chooser: two `<button type="button">` elements with `aria-pressed` reflecting
  selection; exactly one is `true` whenever the page is interactive.
- Each card has an accessible name that includes the course (visible text already does:
  "CCNA 1 Introduction to Networks ITN · v7 View exams").
- `aria-controls` points at the panel container; the heading of the visible panel is the
  meaningful landmark.
- Announce panel swaps with a polite live region (see §8.3.5); it must not fire on initial
  page load to avoid noise.
- Focus ring: 2px `var(--cyan)` outline with offset, matching other chooser controls.
- Colour is never the only selected signal: badge text + CTA wording + `aria-pressed` all
  change together.
- Contrast: badge text and CTA must meet WCAG AA in both themes.

---

## 12. Acceptance criteria

Verified against `npm run build` output served at the `/ccna2` base path.

1. `/` shows `h1` "Choose a Course", the lead line, and **two** course cards in the order
   CCNA 1, CCNA 2.
2. Fresh browser (no `ccna-course`): CCNA 2 card is selected (`aria-pressed="true"`,
   `SELECTED` badge, CTA "Current course"), CCNA 1 CTA reads "View exams"; CCNA 2's existing
   eight exam cards are visible and unchanged (System Test, Modules 1-4, 5-6, 7-9, 10-13,
   14-16, Practice, Final, with today's availability states).
3. Clicking CCNA 1: selection styling/badge/CTA swap, CCNA 2 grid hides, CCNA 1 grid shows
   exactly the seven pre-created placeholder cards with "Coming soon" badges, the ITN lead
   and the "being prepared" note. URL is unchanged, page does not scroll.
4. Reload: CCNA 1 remains selected (`localStorage.ccna-course === "ccna1"`).
5. Clicking CCNA 2 back: CCNA 2 grid returns, CCNA 1 placeholders hide, storage updates.
6. Visiting `/exam/modules-1-4` (or any CCNA 2 exam) and returning to `/` selects CCNA 2,
   even if CCNA 1 was stored before. The exam itself loads and behaves exactly as before
   (intro count, resume, a question check, submit → score).
7. Opening `/exam/itn-modules-1-3` 404s/redirects — placeholder ids produce no route.
8. Home drawer with CCNA 1 selected: brand "CCNA 1 v7 — ITN", nav lists only the seven ITN
   groups, all disabled "Coming soon". With CCNA 2 selected: brand "CCNA 2 v7 — SRWE" and the
   existing eight entries, all links working. On an exam page: only that course's groups.
9. Tab title is "CCNA 1 & CCNA 2 Practice Exams"; meta description names both courses.
10. With JavaScript disabled, CCNA 2's grid is visible and unchanged; the CCNA 1 panel stays
    hidden and no placeholder cards leak into the CCNA 2 view.
11. Light and dark themes both render the course cards legibly; keyboard-only use can select
    a course and reach both grids; the live region announces the swap.
12. No CCNA 2 id, title, subtitle, group label, URL, saved attempt, or limit key changed.

---

## 13. Files to touch

| File | Change |
| --- | --- |
| `src/features/exams/data/courses.ts` | **New** — course registry, copy, helpers |
| `src/features/exams/data/index.ts` | `courseId` on `ModuleMeta`, seven CCNA 1 entries, `modulesForCourse`, `getModuleCourseId` |
| `src/features/exams/lib/course-selection.ts` | **New** — `ccna-course` read/write, default `ccna2` |
| `src/pages/index.astro` | Course section, dual panels, header/title/meta copy, toggle script, styles |
| `src/features/exams/components/ExamHeader.astro` | `course` prop, course-aware brand, per-course drawer blocks, home sync |
| `src/pages/exam/[module].astro` | One-line: persist the module's course on boot |
| `README.md` | Optional, non-branding: document the course chooser and the `itn-*` id convention / how to add a CCNA 1 exam |

Do not touch: question data, `quiz-state.ts`, `exam-limits.ts`, `exam-mode.ts`, auth files,
`worker/`, `public/` dumps, existing scripts.

---

## 14. Verification plan

1. `npm run build` — clean, no Astro/TS errors; confirm `dist/index.html` contains
   "Choose a Course" and both panels, and that `dist/exam/` has **no** `itn-*` directory.
2. Start the dev server the project's way (`astro dev --background`, then `astro dev logs`);
   open the site under the `/ccna2` base path in the browser panel.
3. Smoke (browser):
   - fresh storage → CCNA 2 selected, eight cards;
   - click CCNA 1 → seven placeholders, note visible, no scroll, URL unchanged;
   - reload → CCNA 1 still selected;
   - reload `/exam/modules-1-4` → exam starts and works; back to `/` → CCNA 2 selected;
   - `/exam/itn-modules-1-3` → no route;
   - open the drawer in each state → correct brand and group list, disabled placeholders;
   - check `preview_logs` for console errors / failed requests;
   - repeat the visual check in dark mode and at a mobile width (cards stack).
4. Re-run the existing smoke scripts that cover module data if touched by imports
   (`scripts/smoke-m14.mjs` is unaffected but cheap to run).

---

## 15. Adding a real CCNA 1 exam later (the payoff)

1. Create `src/features/exams/data/itn-modules-1-3/` following the existing module pattern
   (`index.ts` exporting an `ExamModule` with `id`, `title`, `subtitle`, `groupLabel`,
   `questions`).
2. Import it in `data/index.ts`, add it to `availableModules`, and flip its pre-created
   registry entry to `available: true`.
3. Nothing on the home page, drawer, routing, or storage needs to change — the card becomes a
   link at `/exam/itn-modules-1-3`, the drawer entry becomes navigable, and the CCNA 1 panel
   automatically shows it as available.

---

## 16. Risks / notes

- **Drawer grouping assumption:** `ExamHeader` groups consecutive registry entries by
  `groupLabel`. Filtering by `courseId` first (never interleaving courses) keeps that
  behaviour correct. Add a short comment where the filter happens.
- **Static-page drawer sync:** because the drawer is server-rendered and the home page is
  static, following the selected course on `/` requires a small client script. Keep it
  minimal (reuse the same `applyCourse` function as the panels).
- **Hydration vs no-JS:** server renders CCNA 2 selected, so the no-JS state is coherent;
  hydration must not flash the wrong panel — apply the remembered course before paint where
  practical (inline head script setting a `data-course` attribute is acceptable), or accept a
  single frame with CCNA 2 visible.
- **Copy drift:** ITN subtitles are proposed from the official checkpoint-exam names and are
  data-only; correct them whenever the real dumps are added.
- **Do not invent CCNA 1 question data** — placeholders must stay `available: false`.
