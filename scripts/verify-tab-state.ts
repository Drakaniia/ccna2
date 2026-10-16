/**
 * Assert the question-tab colour rule.
 *
 * Run with: node scripts/verify-tab-state.ts
 *
 * The rule is the fix for "Skip All repaints answered tabs white", so the point
 * of testing it here is that `skipped` cannot come back into the decision
 * without this file changing: skipping is simply not one of the inputs, and
 * every case below re-checks the precedence the spec settled on (§3.1, §3.2).
 *
 * `tab-state.ts` is deliberately import-free so Node can load it directly — the
 * rest of the quiz library is bundler-only (extensionless imports, Vite env
 * placeholders) and cannot run in plain Node.
 */
import {
  tabStateFor,
  type TabSignals,
  type TabState,
} from "../src/features/exams/lib/tab-state.ts";

let failures = 0;
let checks = 0;

function signals(overrides: Partial<TabSignals> = {}): TabSignals {
  return {
    current: false,
    reviewed: false,
    answered: false,
    wrong: false,
    ...overrides,
  };
}

function expect(name: string, actual: TabState, wanted: TabState): void {
  checks += 1;
  if (actual === wanted) {
    console.log(`  ok    ${name} → ${actual}`);
  } else {
    failures += 1;
    console.log(`  FAIL  ${name} → ${actual} (wanted ${wanted})`);
  }
}

console.log("tab colour rule");

// The reported bug: Skip All used to repaint every answered tab white because
// `skipped` was tested above the verdict branches. Skipping is not an input, so
// an answered question keeps its own colour no matter how it was reached.
expect(
  "answered, not checked (manual mode)",
  tabStateFor(signals({ answered: true })),
  "answered",
);
expect(
  "answered and checked, correct",
  tabStateFor(signals({ answered: true })),
  "answered",
);
expect(
  "answered and checked, wrong",
  tabStateFor(signals({ answered: true, wrong: true })),
  "wrong",
);
expect(
  "answered, flagged for review",
  tabStateFor(signals({ answered: true, reviewed: true })),
  "reviewed",
);
expect(
  "flagged for review while wrong",
  tabStateFor(signals({ answered: true, reviewed: true, wrong: true })),
  "reviewed",
);
expect(
  "flagged for review, never answered",
  tabStateFor(signals({ reviewed: true })),
  "reviewed",
);
expect("never answered", tabStateFor(signals()), "unanswered");
expect(
  "current, however wrong or flagged",
  tabStateFor(
    signals({ current: true, answered: true, wrong: true, reviewed: true }),
  ),
  "current",
);
// In review mode every position is `checked`; an unanswered one stays white, so
// the strip still reads as a map of what was actually answered.
expect(
  "unanswered while reviewing",
  tabStateFor(signals({ answered: false, wrong: false })),
  "unanswered",
);

console.log(`\n${checks - failures}/${checks} checks passed`);
if (failures > 0) process.exitCode = 1;
