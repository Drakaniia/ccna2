# Spec — Mobile polish, Review mode, Skip-All tab colors, Offline mode

**Status:** Draft for review (no code written yet)
**Project:** CCNA 2 v7 — SRWE Practice Exams (Astro static site, GitHub Pages)
**Scope:** Four workstreams, described in priority order below.

This spec is the output of a six-round interview. Every decision in the
**Decisions log** (§6) is an explicit answer from the requester, not an
inference. Where the codebase contradicted an answer, the contradiction is
called out in **Open questions** (§7).

---

## 1. Summary

| #   | Workstream                 | One-line goal                                                                                                           |
| --- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| W1  | **Mobile optimization**    | A site-wide pass so every screen is comfortable at iPhone widths (390–430 px), including safe-area handling.            |
| W2  | **Review mode footer**     | Replace `Skip All / Review Question / Submit` with `Prev / Next / Back to Results` while reviewing a submitted attempt. |
| W3  | **Skip-All tab-color bug** | Answering a question must never lose its tab color just because _another_ question was skipped.                         |
| W4  | **Offline mode**           | An installable PWA plus a per-exam, opt-in offline switch in Exam settings that caches the current exam.                |

W1 and W3 are bug/quality fixes. W2 is a small feature. W4 is the largest and
the only one that introduces new architecture (a service worker + manifest).

**Suggested implementation order:** W3 → W2 → W1 → W4.
Rationale: W3 is a few lines with a testable rule; W2 builds on the phase
machine W3 touches; W1 is CSS-only and can land independently; W4 is additive
and riskiest (new SW lifecycle, cache invalidation across deploys).

---

## 2. Current behavior (verified in code)

These are the facts the changes are built on. Line references are to the
present `main`.

### 2.1 Footer

`src/pages/exam/[module].astro` renders one fixed footer for the whole quiz
lifecycle:

```html
<footer class="quiz-footer">
  <button id="skipAllBtn" class="link-btn">Skip All</button>
  <button id="reviewQBtn" class="link-btn" aria-pressed="false">
    Review Question
  </button>
  <button id="footerNextBtn" class="primary">Submit</button>
</footer>
```

- `#footerNextBtn` **always reads “Submit”**, even though its handler advances
  to the next question until the last one, where it opens the submit overlay.
- `syncFooter()` disables all three while the sign-in gate is showing
  (`atGate(state)`).

### 2.2 Phases

`AttemptState.phase` is `"quiz" | "submit" | "result"`
(`src/features/exams/lib/quiz-state.ts`). It is mirrored onto
`<body data-phase="…">` by `chrome()`, and CSS keys off it:

- `body[data-phase="intro"]` hides nav / main / progress / footer (`[module].astro`)
- `body[data-phase="submit"] .center-screen.submit` (`SubmitOverlay.astro`)
- `body[data-phase="result"] .result-screen` (`ResultScreen.astro`)
- `body:not([data-phase="result"]) .site-credit-exam` (`global.css`)

`reviewAssessment()` currently does:

```ts
export function reviewAssessment(): void {
  mutate((s) => {
    s.phase = "quiz";
    s.current = 0;
  });
}
```

So "Review Assessment" is **not a mode** today — it just drops back into the
normal quiz with the normal footer. That is the behavior W2 replaces.

### 2.3 Tab coloring (`renderTabs()`)

Per attempt position, first matching branch wins:

```
idx === current                      → .current
st.reviewed[idx]                     → .reviewed   (orange)
st.skipped[idx] || !answered         → .unanswered (white)
st.checked[idx] && !isQuestionCorrect → .wrong     (red)
otherwise                            → .answered   (green)
```

`skipAll()` sets `s.skipped = s.skipped.map(() => true)` for every position.
Because the `skipped` test sits **above** the `wrong` / `answered` tests, a
single "Skip All" repaints every already-answered tab white. That is exactly
the reported bug.

### 2.4 Settings

`src/features/exams/components/HeaderActions.tsx` (React island) owns the
settings modal. It renders **only when `hasSettings`**, i.e. only on exam pages
with a known `moduleId` and `maxQuestions`. It already contains:

- "Solution feedback" radio group (`auto` / `manual`, `exam-mode.ts`)
- "Number of items" field + presets, hidden in preview mode
  (`exam-limits.ts`)

This is where the offline switch goes (W4).

### 2.5 Auth

`fetchSession()` (`src/features/auth/auth-client.ts`) is awaited before the
exam paints; results are published via `publishAccessMode()` →
`<html data-access>` + `exam:access`. A thrown fetch (offline) currently
returns `{ authenticated: false }` — i.e. **offline silently demotes a
signed-in student to the 5-question preview.** W4 changes that.

---

## 3. Workstream W3 — Skip-All tab colors (do first)

### 3.1 Rule

> A tab's color must depend only on that question's own state. Skipping is not
> a visual state.

Precedence becomes:

```
current > reviewed (orange) > no answer recorded (white)
        > checked && wrong (red) > answered (green)
```

- `skipped[idx]` is **removed from the color decision entirely**
  (requester: _"skipped has no separate look"_).
- White now means exactly "no answer recorded for this question".
- Green **and red** both survive Skip All
  (requester corrected the earlier asymmetric answer: _"all answered keep
  color"_).

`st.skipped` may remain in `AttemptState` for other uses — it is part of the
persisted schema and `hasAnswerFor` / `unansweredPositions` already ignore it —
but it must not drive `renderTabs()`.

### 3.2 Edge cases

| Case                                                  | Expected                                                    |
| ----------------------------------------------------- | ----------------------------------------------------------- |
| Answered, never checked (manual mode)                 | Green, survives Skip All.                                   |
| Answered and checked, correct                         | Green, survives Skip All.                                   |
| Answered and checked, wrong                           | Red, survives Skip All.                                     |
| Answered, currently flagged orange                    | Orange (flag still wins over green/red).                    |
| Never answered                                        | White.                                                      |
| One question skipped individually via `skipCurrent()` | That question stays white; others unaffected.               |
| Skip All → answer a question afterwards               | It goes green/red normally (skip state no longer masks it). |

---

## 4. Workstream W2 — Review mode

### 4.1 Decision summary

- Reviewing is a **real phase**, `"review"`, added to the `phase` union.
- Footer in review mode is exactly three controls:
  **`Prev` · `Next` · `Back to Results`**.
- **`Skip All` and `Review Question` are not rendered in review mode.**
- **Locked / read-only**: options, pairings, `Check`, and `Retry` are all
  inert. The submitted score can never drift.
- The **tab strip stays clickable** — tapping any number jumps to it.
- Answer feedback (verdict + explanation) is **revealed for every question**,
  including ones never `Check`ed during the exam.
- A **"Reviewing" indicator lives in the header bar**, beside the exam title.
- Review **survives a page refresh**.
- Entering review lands on **where you left off**, not Q1.
- `Next` on the last question = `Back to Results`. `Prev` is disabled on Q1
  (no looping).
- A **completed attempt resumed from the intro screen goes straight into
  review mode**.

### 4.2 Phase machine changes

Add `"review"` to:

- `AttemptState["phase"]`
- the `phase` validator in `normalizeSaved()` (currently only accepts
  `"submit"` / `"result"`, everything else → `"quiz"`)
- the site-credit rule in `global.css`: the credit chip is shown only on
  `result` today. Decide: show it in review too, or keep it result-only.
  **Recommendation: keep result-only** — review is a reading surface and the
  chip would overlap the footer; this is a one-word change if you disagree.

`reviewAssessment()` becomes an explicit transition:

```ts
// enters phase "review"; keeps s.current so "where you left off" is honoured
```

`current` must **not** be reset to 0 (contrast with today's implementation).

`Back to Results` is `mutate(s => { s.phase = "result" })`, preserving `result`.

### 4.3 Rendering

Because `body[data-phase="review"]` is neither `intro` nor `submit` nor
`result`, the existing shell (nav / main / progress / footer) shows
automatically — no new layout rule is needed to _show_ the quiz chrome.

Two footers, one visible per phase:

```html
<footer class="quiz-footer" id="quizFooter">
  <!-- Skip All / Review / Submit -->
  <footer class="quiz-footer review-footer" id="reviewFooter">
    <!-- Prev / Next / Back -->
  </footer>
</footer>
```

Toggled with `body[data-phase="review"] .quiz-footer { display: none }` and
`body:not([data-phase="review"]) .review-footer { display: none }`.

Per-question behavior in review:

- `syncCheckBar()` → force `bar.hidden = true` when phase is `review`
  (no Check / Retry).
- `syncReviewBtn()` → irrelevant (the button isn't rendered).
- Answer inputs: `toggleChoice`, `clickLeftItem`, `clickRightItem`,
  `checkCurrent`, `clearCurrentAnswer`, `reshuffleCurrent` must all early-return
  while `phase === "review"`. Guarding inside `quiz-state.ts` (not only in the
  DOM) is what makes the lock trustworthy and testable.
- `syncExplanation()` → in review, reveal whenever
  `st.checked[current] || phase === "review"`. **Recommended:** set
  `checked[p] = true` for all positions on entry to review, so verdicts and
  explanations come from one source of truth. This _does_ mutate persisted
  state; it is the simplest way to satisfy "reveal for all" and keeps the
  per-question render path unchanged. (Alternative: a derived `isRevealed(p)`
  helper — cleaner, slightly more code.)
- Tab strip rendering is unchanged in review (green / red / orange / white per
  §3.1), so the strip doubles as a review map.

### 4.4 "Reviewing" badge

`ExamHeader.astro` renders `.title` inside `header.topbar`. Add a badge
element next to it, hidden unless `body[data-phase="review"]`:

```html
<span class="review-badge" hidden>Reviewing</span>
```

Show it with a `body[data-phase="review"] …` rule rather than React state, so
no island has to know about the phase. Must be labelled for screen readers
(e.g. `aria-label="Reviewing a submitted attempt"` or visible text — it is
visible text already, so no extra ARIA is required).

### 4.5 Resume-into-review

In `main()` (`[module].astro`), the saved attempt drives the intro's
Resume / Start New Exam box via `describeSaved()` and `resumeQuiz()`.

Today `resumeQuiz()` restores whatever `phase` was saved, so a saved
`"result"` phase boots straight to the result screen. Requirement: a
**completed** attempt (`phase === "result"` or `"review"`) that is resumed
lands in **review**, not on the score screen.

Implementation note: the intro branch currently only special-cases
_in progress_ vs _completed_ for the copy (`describeSaved`). The resume path
needs one extra decision: `if (saved.phase === "result" || saved.phase === "review") → enter review`.

### 4.6 Acceptance criteria (W2)

1. From the result screen, "Review Assessment" shows `Prev` / `Next` /
   `Back to Results` and **no** `Skip All` / `Review Question` / `Submit`.
2. `Prev` is disabled on the first question; `Next` on the last question
   returns to the result screen.
3. Selecting an option, pairing, `Check`, `Retry` and reshuffle do nothing in
   review mode.
4. Every question shows its verdict and explanation, including ones never
   checked during the exam.
5. A "Reviewing" badge is visible in the top bar.
6. Tab strip is clickable throughout review.
7. Reloading mid-review returns to review, on the same question.
8. Resuming a completed attempt from the intro enters review directly.
9. The submitted score is unchanged by anything done in review.

---

## 5. Workstream W1 — Mobile optimization (site-wide)

### 5.1 Target

- **Primary target: 390–430 px portrait, modern iPhones (12–16), with
  safe-area insets.** This is the requester's explicit must-pass range.
- 360 px small Android, tablets, and landscape phone are **not** stated
  requirements. They should not _regress_, but effort is concentrated on
  390–430 px.

### 5.2 Required changes

**a) Safe-area support.** Every page's viewport meta currently reads
`width=device-width, initial-scale=1`. Add `viewport-fit=cover` and use
`env(safe-area-inset-*)` on the fixed bars.

Pages carrying the meta tag:

- `src/pages/index.astro`
- `src/pages/exam/[module].astro`
- `src/pages/admin.astro`
- `src/pages/privacy.astro`
- `src/pages/cookie-blocked.astro`
- `worker/src/pages.ts` (worker-rendered pages — check whether it needs the same)

Apply insets to the fixed chrome in `global.css`:

- `footer.quiz-footer` — `padding-bottom: env(safe-area-inset-bottom)`
  (and `height` must account for it, or switch to `padding` + `height: auto`).
- `.progress` — `bottom: calc(74px + env(safe-area-inset-bottom))`.
- `.site-credit` — `bottom: calc(14px + env(safe-area-inset-bottom))`.

**b) Footer targets (decision: bigger targets, same row).** Keep the three
buttons in one row, but raise every control in the footer to a **≥44 px**
touch target. Today the footer is 73 px tall with `button.link-btn` text at
14 px and no padding — the _hit_ area is only the text. Give the link buttons
vertical padding and a min-height, and increase the gap. Note this must hold for
**both** footers (quiz and review), so the rule belongs on
`footer.quiz-footer button`, not on one variant.

**c) Tab-strip arrows.** `.nav-arrow` is `34 × 34`.
**Decision: raise to ~44 px touch targets** while keeping the chevrons visually
slim (e.g. 44 px button, 32 px icon — the icon already renders at 32).

**d) Tab strip.** `.qtab` is 34 × 31 px with a 10 px gap — below the 44 px
guideline but it is a _scrollable_ strip, not a fixed row, and 8 tabs at 44 px
would not fit. Do **not** enlarge tabs to 44 px; instead make sure strip
scrolling and arrow tapping both work well at 390 px and that the current tab
stays centred (already implemented). Confirm the strip's own height/padding
does not push content off-screen on a 390 px viewport.

**e) Screens to review at 390 px** (requester chose _everything, site-wide_):

| Screen                           | File                                                              | What to check                                                         |
| -------------------------------- | ----------------------------------------------------------------- | --------------------------------------------------------------------- |
| Home chooser                     | `src/pages/index.astro`                                           | Card padding, title wrapping, grid at 1 column                        |
| Header + module drawer           | `ExamHeader.astro`                                                | Title truncation, drawer width `min(360px, 88vw)`, safe-area top      |
| Intro screen                     | `[module].astro`                                                  | Button width, `intro-warn` line length                                |
| Quiz / question view             | `QuestionView.astro`, `ChoiceOptions.astro`, `PairingBoard.astro` | Option tap targets, pairing board two-column fit, code block overflow |
| Submit overlay                   | `SubmitOverlay.astro`                                             | Review-tab wrap, checkbox row, Submit button reach                    |
| Result screen                    | `ResultScreen.astro`                                              | Gauge width (240 px fixed) vs 390 px viewport, button stack           |
| **Review mode (new)**            | `[module].astro`                                                  | Three-button row at 390 px                                            |
| Settings modal                   | `HeaderActions.tsx` / `global.css`                                | `min(440px, 92vw)`, numeric input, mode radios, new offline switch    |
| Follow modal                     | `FollowModal.astro`                                               | Already has a 480 px rule                                             |
| Privacy / admin / cookie-blocked | respective pages                                                  | Baseline pass                                                         |

**f) Pairing board is the highest-risk area.** `PairingBoard.astro` renders a
two-column click-to-pair board with an SVG connector overlay. Verify at 390 px
that both columns remain usable, labels wrap rather than clip, and the line
overlay still aligns. This is the component most likely to need real layout
work rather than spacing tweaks.

### 5.3 Non-goals (W1)

- No redesign of the desktop layout. Desktop rules stay as they are.
- No new breakpoints beyond what is needed; existing ones are
  800 px / 640 px / 480 px / 600 px and should be consolidated where they
  conflict, not multiplied.

### 5.4 Acceptance criteria (W1)

1. Every listed screen is usable and non-overflowing at 390 px and 430 px
   portrait, with safe-area insets respected (tested with a simulated notch /
   home indicator).
2. All interactive controls in the fixed bars are ≥44 px touch targets.
3. No horizontal page scroll at 390 px.
4. Desktop rendering is visually unchanged.

---

## 6. Workstream W4 — Offline mode

### 6.1 Decision summary

| Question                       | Decision                                                         |
| ------------------------------ | ---------------------------------------------------------------- |
| What "offline" means           | **Both**: an installable PWA **and** resilient session behavior  |
| Toggle location                | **Exam settings modal** (`HeaderActions.tsx`)                    |
| Default                        | **Off**                                                          |
| Toggle granularity             | **Per-exam switch** (Module 5–6 can be offline while 7–9 is not) |
| Service-worker registration    | **Always registered**                                            |
| Precaching scope (on enable)   | **Only the current exam** (question data + that exam's images)   |
| Enable feedback                | **Cache immediately with visible progress**                      |
| Status readout                 | **State + size** ("Ready offline" / "Caching…" + e.g. "12 MB")   |
| Install affordance             | **Install button in settings**                                   |
| Non-supporting browsers (iOS)  | **Show "Add to Home Screen" steps** instead of a dead button     |
| When the Worker is unreachable | **Keep last known access mode**, show an offline banner          |
| Uncached module opened offline | **Friendly "you're offline" screen** with retry                  |
| Turning the toggle OFF         | **Keep caches, stop using them**                                 |

### 6.2 App shell (always)

- `public/manifest.webmanifest` — name, short name, `start_url` respecting the
  `/ccna2` base, `display: standalone`, theme/background colours, 192/512 icons
  (+ maskable). The site deploys under a repo-name base path, so **every
  manifest path and SW scope must be base-aware.**
- `<link rel="manifest">` + `theme-color` on every page (or at minimum the
  exam + home pages).
- Icons: add to `public/` (no icons exist beyond `favicon.svg`/`.ico` today).

### 6.3 Service worker

**Always registered**, so the app is installable and the shell is resilient
regardless of the toggle. Suggested file: `public/sw.js` (served from the base
root so its scope covers the whole site).

Strategy outline:

| Resource                            | Strategy                                                                                              |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------- |
| App shell (HTML, CSS, JS, fonts)    | Precache on install; network-first for HTML (so a deploy is picked up), cache-first for hashed assets |
| Exam question data (JS chunks)      | Runtime cache on first visit                                                                          |
| Exhibit images (`public/images/**`) | Stale-while-revalidate                                                                                |
| `/auth/*` (Worker, cross-origin)    | **Never cache**                                                                                       |
| Versioned cache name                | Bump on build so a new deploy evicts the old shell                                                    |

Because the build is static and fingerprinted by Astro/Vite, a precache
manifest generated at build time is more reliable than hand-listing files.
Options: hand-write `sw.js` with a version constant, or add a small build step
that injects the asset list. **Decision needed at implementation time** — see
§7.

### 6.4 Per-exam toggle

State: a per-module flag, e.g. `ccna-offline:<moduleId>` in `localStorage`
(mirroring the existing `ccna-limit:<moduleId>` pattern in `exam-limits.ts`).
A small `exam-offline.ts` lib with `getOfflineEnabled` / `setOfflineEnabled`
plus an event constant matches the existing `exam-mode.ts` / `exam-limits.ts`
conventions exactly.

Modal UI (inside `.settings-mode`-style block, reusing existing classes):

- A labelled switch (checkbox styled as a toggle, or a radio pair — match the
  existing "Solution feedback" radio styling for consistency).
- Copy explaining: _"Save this exam to your device so you can take it without a
  connection. Only this exam is downloaded."_
- When on: status line — `Caching…` → `Ready offline · 12 MB`, plus a
  `Refresh download` affordance if desired.
- When off (but caches exist): _"Offline data for this exam is kept on your
  device but not used."_

### 6.5 Resilient session (the harder half)

Today, `fetchSession()` failing offline returns `{ authenticated: false }` and
the visitor is silently demoted to the 5-question preview — with
`data-auth="pending"` hiding the page until that resolves.

Required behavior:

1. **Cache the last resolved access mode** (e.g. `ccna-last-access` in
   `localStorage`, written by `publishAccessMode()`).
2. On a _thrown_ fetch (offline / unreachable), `fetchSession()` (or the caller
   in `[module].astro`) falls back to the **last known access mode** instead of
   `preview`.
3. Distinguish "the Worker said no" (a real 401 / `authenticated: false`
   response → drop the token, preview) from "the Worker said nothing" (thrown
   fetch → keep last known mode). This distinction already exists for the token
   (`if (token && !body.authenticated) writeToken(null)` — only on a real
   answer); the same principle must extend to the **access mode**.
4. Show an **offline banner** (a thin bar, e.g. under the top bar) when the
   app is running from the fallback, so the student knows the state is stale.
   Use `navigator.onLine` plus `online` / `offline` events.

Risk: a signed-out visitor on a shared device could inherit a previous
signed-in visitor's "full" mode offline. Mitigation options: expire the cached
mode after N hours, or key it to the presence of the stored session token
(`ccna-session-token`) — if the token is gone, offline falls back to preview.
**Recommendation: require a stored session token for the offline "full"
fallback.** This closes the shared-device hole without an arbitrary TTL.

### 6.6 Uncached / offline-miss screen

Opening a module that was never cached while offline must not show the
browser's error page. Add a cached fallback page (SW `navigation` fallback)
saying _"You're offline — this exam isn't downloaded yet."_ with a **Retry**
button. Ensure the fallback page is itself precached.

### 6.7 Install button

- Rendered in the settings modal.
- Uses the captured `beforeinstallprompt` event: store it on
  `window`/module scope, call `.prompt()` on click.
- After install, hide the button (`appinstalled` event).
- **iOS / browsers without the prompt:** swap the button for short
  _"Share → Add to Home Screen"_ instructions instead.

Note: `beforeinstallprompt` fires on the **page**, but the button lives in a
React island inside the settings modal. Capturing the event must happen at page
level (or in the island's `useEffect`) early — the event fires once and is lost
if nothing listens. Register the listener when the island mounts
(`HeaderActions` is `client:load`, so this is safe) and store the deferred
prompt in state.

### 6.8 Non-goals (W4)

- No background sync, push notifications, or periodic background sync.
- No offline write queue for the auth service.
- No caching of `/auth/*` responses (session state must never be served stale
  from a cache).

### 6.9 Acceptance criteria (W4)

1. With the toggle on for an exam and then the network disabled, that exam
   opens, questions render, exhibits load, and answers can be given.
2. The settings modal shows live state + cache size while caching.
3. The toggle is per-exam: enabling Module 5–6 does not mark Module 7–9 ready.
4. Turning the toggle off keeps caches on disk but the exam is no longer
   presented as offline-ready.
5. Offline, a previously signed-in student keeps **full** access; a
   never-signed-in visitor stays on **preview**. An offline banner is visible.
6. Opening a never-cached module offline shows the friendly offline screen with
   a working Retry.
7. The app is installable (manifest + SW), and the settings install button
   prompts on supported browsers and shows iOS instructions otherwise.
8. A new deploy evicts the old shell (no stale-JS soup).
9. `npm run build`, `npm run check`, `npm run typecheck` and
   `cd worker && npm test` all still pass.

---

## 7. Open questions / residual ambiguity

These are small, but they should be settled before implementation rather than
guessed at.

1. **SW asset manifest: generated or hand-written?**
   A build step that injects the fingerprinted asset list is more robust; a
   hand-written `sw.js` is simpler and dependency-free (matching this project's
   zero-runtime-dependency style). _Recommendation: hand-written `sw.js` with a
   version constant bumped in the same commit as risky changes, and runtime
   caching for everything except the shell — no new build dependency._

2. **"Keep caches, stop using them" (W4).** Because the SW is _always_
   registered, an exam can still be served from cache even with its toggle off.
   Interpretation used in this spec: the toggle controls **precaching and the
   offline-ready claim**, while already-cached content continues to serve (which
   is what makes toggling off cheap and reversible). If instead the toggle
   should actively refuse cached content for that exam, say so — it changes the
   fetch strategy per module.

3. **Site credit chip during review.** Spec recommends keeping it result-only
   (§4.2). Confirm.

4. **Revealing all verdicts in review (§4.3)** — mutating `checked[]` on entry
   versus a derived `isRevealed()`. The latter is cleaner but touches the render
   path; the former is a one-line write. Spec recommends a derived helper.

5. **Offline banner placement.** A bar under the top bar, or a chip near the
   progress pill? Recommendation: a thin bar under `header.topbar`, so it is
   visible on the intro, quiz, submit and review screens alike.

6. **Does the worker-rendered page (`worker/src/pages.ts`) need the mobile /
   PWA treatment too?** It carries its own viewport meta. Presumably yes if it
   is user-facing; needs a look at what it renders.

---

## 8. Files likely touched

| File                                                                      | W      | Change                                                                                                   |
| ------------------------------------------------------------------------- | ------ | -------------------------------------------------------------------------------------------------------- |
| `src/features/exams/lib/quiz-state.ts`                                    | W2, W3 | `"review"` phase, `reviewAssessment()` semantics, skip-free tab rule support, read-only guards           |
| `src/features/exams/components/QuestionTabs.astro`                        | W1, W3 | Arrow touch targets; confirm tab color rules                                                             |
| `src/pages/exam/[module].astro`                                           | W2, W3 | `renderTabs()` precedence, review footer markup + wiring, resume-into-review, review-phase render branch |
| `src/features/exams/components/HeaderActions.tsx`                         | W1, W4 | Offline switch, status readout, install button + iOS fallback                                            |
| `src/features/exams/components/ExamHeader.astro`                          | W1, W2 | "Reviewing" badge, mobile header spacing, safe-area top                                                  |
| `src/styles/global.css`                                                   | W1, W2 | Footer variants, safe-area insets, 44 px targets, offline banner, review badge                           |
| `src/features/exams/components/SubmitOverlay.astro`                       | W1     | Mobile spacing                                                                                           |
| `src/features/exams/components/ResultScreen.astro`                        | W1     | Gauge / button fit at 390 px                                                                             |
| `src/features/exams/components/PairingBoard.astro`                        | W1     | Two-column fit at 390 px (highest risk)                                                                  |
| `src/features/exams/components/ChoiceOptions.astro`, `QuestionView.astro` | W1     | Option tap targets, code-block overflow                                                                  |
| `src/features/auth/auth-client.ts`                                        | W4     | Last-known-access cache, offline fallback                                                                |
| `public/manifest.webmanifest`, `public/sw.js`, `public/icons/*`           | W4     | New PWA assets                                                                                           |
| `src/pages/*.astro`                                                       | W1, W4 | Viewport meta `viewport-fit=cover`, manifest link                                                        |
| `src/features/exams/lib/exam-offline.ts`                                  | W4     | New small lib, mirrors `exam-mode.ts` / `exam-limits.ts`                                                 |
| `scripts/verify-*.ts`, `worker/test/*`                                    | all    | Regression coverage (see §9)                                                                             |

---

## 9. Verification plan

**W3 (bug fix) — highest-value regression test.** `scripts/verify-modules-1-4.ts`
already exists as the project's data-verification pattern; the tab-color rule is
pure logic and should be extracted into a small, testable function
(e.g. `tabStateFor(position, state, question)` in `quiz-state.ts`) so it can be
asserted directly:

- answered → green; then `skipAll()` → still green.
- checked-wrong → red; then `skipAll()` → still red.
- reviewed → orange, regardless of skip.
- unanswered → white.

**W2.** Manual walkthrough of §4.6's nine criteria, plus a reload test
mid-review and a resume-from-intro test.

**W1.** Chrome DevTools device emulation at 390 × 844 and 430 × 932, with
safe-area insets enabled; check `document.documentElement.scrollWidth <=
innerWidth` (no horizontal scroll) per screen.

**W4.** DevTools → Application → Service Workers / Cache Storage; then Network
→ Offline. Walk §6.9's nine criteria. Also run `npm run build && npm run
preview` — the SW must be tested against the **production build**, not
`astro dev`, because the fingerprinted assets and base path differ.

**Global gates (every workstream):**

```bash
npm run typecheck
npm run check
npm run build
cd worker && npm test
```

---

## 10. Decisions log (verbatim answers)

**Round 1** — Mobile scope: _everything, site-wide_ · Review buttons: _Prev ·
Next · Back to Results_ · Skip-All: _answered stays green, unanswered stays
white_ · Offline: _both (installable PWA + resilient session)_.

**Round 2** — Review ends: _Next on last = Back to Results_ · Review extras:
_tab strip clickable · keep feedback visible · "Reviewing" indicator_ · Skip
All: _no confirmation, as today_ · Offline cache: _full (later narrowed)_ ·
Offline + auth: _keep last known access mode_.

**Round 3** — Mobile widths: _390–430 px w/ safe-area_ · Mobile footer: _bigger
targets, same row_ · Install: _button in settings_ · Toggle: _exam settings
modal, default off_ · Review persist: _survives refresh_ · Skipped: _no separate
look_.

**Round 4** — Review editing: _locked / read-only_ · Review start: _where you
left off_ · Precache: _only the current exam_ · SW: _always registered_ ·
Status: _state + size_ · Wrong tabs: _go white_ **(later corrected)**.

**Round 5** — Red vs green: _no — all answered keep color_ (corrects round 4) ·
"Reviewing" badge: _header bar_ · Install fallback: _show "Add to Home Screen"
steps_ · Offline miss: _friendly offline screen_ · Enable feedback: _cache now
with progress_.

**Round 6** — Toggle scope: _per-exam switch_ · Turning off: _keep caches, stop
using them_ · Review feedback: _reveal verdict + explanation for all_ ·
Finished resume: _straight into Review mode_ · Nav arrows: _yes, ~44 px_.
