/**
 * The question-tab colour rule, as a pure function.
 *
 * It is deliberately dependency-free (no imports at all) so it can be asserted
 * on its own — see `scripts/verify-tab-state.ts` — and so the precedence it
 * encodes is readable in one place rather than buried in the tab renderer.
 *
 * Rule: a tab's colour depends only on that question's own state.
 *
 *   current > reviewed (orange) > no answer recorded (white)
 *           > checked && wrong (red) > answered (green)
 *
 * Skipping is deliberately **not** an input. It used to be, tested above the
 * verdict branches, so one press of "Skip All" repainted every already-answered
 * tab white. Skipping is not a visual state: a skipped question keeps whatever
 * colour its own answer earns, and white now means exactly "no answer recorded
 * for this question".
 */

export type TabState =
  "current" | "reviewed" | "unanswered" | "wrong" | "answered";

export interface TabSignals {
  /** This tab holds the cursor. */
  current: boolean;
  /** Flagged to revisit — orange wins over every other state. */
  reviewed: boolean;
  /** An answer (or at least one pair) is recorded for this question. */
  answered: boolean;
  /** Answered, checked, and graded wrong. Only meaningful when `answered`. */
  wrong: boolean;
}

export function tabStateFor(s: TabSignals): TabState {
  if (s.current) return "current";
  if (s.reviewed) return "reviewed";
  if (!s.answered) return "unanswered";
  if (s.wrong) return "wrong";
  return "answered";
}
