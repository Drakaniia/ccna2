import type { ChoiceQuestion, ExamModule, Question } from "./types";
import { mulberry32, range, seededShuffle } from "./shuffle";
import { scoreAttempt, type AttemptResult } from "./scoring";
import { getEffectiveLimit } from "./exam-limits";
import { isAutoCheck } from "./exam-mode";
import { PREVIEW_QUESTION_COUNT, isAccessMode, type AccessMode } from "../../auth/auth-client";

export interface AttemptState {
  seed: number; // shuffle seed for this attempt
  order: number[]; // shuffled question order: display position -> source index
  optionOrders: (number[] | null)[]; // per display position: display index -> source option index
  rightOrders: (number[] | null)[]; // per display position: display index -> source right-column index
  leftOrders: (number[] | null)[]; // per display position: display index -> source left-column index
  answers: number[][]; // per display position: selected option display indices
  pairs: (Record<number, number> | null)[]; // per display position: left source idx -> right display idx
  skipped: boolean[];
  current: number;
  checked: boolean[]; // questions whose Check feedback has been revealed
  reviewed: boolean[]; // questions the user flagged to revisit (tab turns orange)
  phase: "quiz" | "submit" | "result";
  result?: AttemptResult;
  /** access mode this attempt was built for — also the storage namespace */
  access: AccessMode;
  /** real module question count, for display only; the attempt may hold fewer */
  total: number;
}

const CHANGE_EVENT = "quiz:change";
const STORAGE_PREFIX = "ccna-exam:";
/** One-shot guard, per module, so the legacy-key cleanup below runs once per module. */
const MIGRATION_FLAG = "ccna-exam-migrated:";

interface QuizContext {
  moduleId: string;
  module: ExamModule;
  state: AttemptState;
  access: AccessMode;
  /** active (highlighted) left item of the current pair board — memory only */
  activeLeft: number | null;
}

let ctx: QuizContext | null = null;

/** Attempts are namespaced per access mode so a 5-question preview can never be resumed as a full-bank attempt. */
export function storageKey(moduleId: string, access: AccessMode): string {
  return `${STORAGE_PREFIX}${access}:${moduleId}`;
}

/**
 * Drop the pre-namespace `ccna-exam:<moduleId>` key. Anything saved under it was
 * always a full-bank attempt, so deleting loses nothing meaningful; the flag key
 * keeps this from running on every page load. Delete only — never migrate a save.
 * The flag is per module — a single global one would orphan the legacy key of
 * every module but the first one opened after the upgrade.
 */
function dropLegacyKeys(moduleId: string): void {
  try {
    const flag = `${MIGRATION_FLAG}${moduleId}`;
    if (localStorage.getItem(flag) !== null) return;
    localStorage.removeItem(`${STORAGE_PREFIX}${moduleId}`);
    localStorage.setItem(flag, "1");
  } catch {
    /* storage unavailable — nothing to clean up */
  }
}

/* ---------------------------------- persistence -------------------------------- */

function persist(): void {
  if (!ctx) return;
  writeSaved(ctx.moduleId, ctx.state);
}

/** Store an attempt under its own access namespace. Never throws. */
function writeSaved(moduleId: string, state: AttemptState): void {
  try {
    localStorage.setItem(storageKey(moduleId, state.access), JSON.stringify(state));
  } catch {
    /* storage unavailable — quiz still works for the session */
  }
}

function emit(): void {
  persist();
  if (typeof document !== "undefined") {
    document.dispatchEvent(new CustomEvent(CHANGE_EVENT));
  }
}

function freshSeed(): number {
  return (Date.now() ^ Math.floor(Math.random() * 0x100000000)) >>> 0;
}

/**
 * How many questions this attempt may hold, or undefined for the whole module.
 *
 * A preview always takes a fixed small slice and never consults the stored
 * "Number of items" setting, so a stale `ccna-limit:` key cannot leak into it.
 */
function resolveLimit(access: AccessMode, moduleId: string, total: number): number | undefined {
  if (access === "preview") return Math.min(PREVIEW_QUESTION_COUNT, total);
  const limit = getEffectiveLimit(moduleId, total);
  return limit === total ? undefined : limit;
}

function buildAttempt(
  questions: Question[],
  seed: number,
  access: AccessMode,
  limit?: number,
): AttemptState {
  const rand = mulberry32(seed);
  const total = questions.length;
  const effectiveTotal = limit !== undefined && limit !== null && limit > 0 && limit < total ? limit : total;

  // One shuffle per source question (options for choice, right column for pair).
  const perSourceOption: (number[] | null)[] = questions.map((q) =>
    q.type === "pair" ? null : seededShuffle(range(q.options.length), rand)
  );
  const perSourceRight: (number[] | null)[] = questions.map((q) =>
    q.type === "pair" ? seededShuffle(range(q.right.length), rand) : null
  );
  const perSourceLeft: (number[] | null)[] = questions.map((q) =>
    q.type === "pair" ? seededShuffle(range(q.left.length), rand) : null
  );

  // Always random: shuffle full order then slice to limit for random subset.
  const fullOrder = seededShuffle(range(total), rand);
  const order = effectiveTotal < total ? fullOrder.slice(0, effectiveTotal) : fullOrder;

  // Slot shuffles into per-display-position arrays.
  const optionOrders: (number[] | null)[] = order.map((src) => perSourceOption[src]);
  const rightOrders: (number[] | null)[] = order.map((src) => perSourceRight[src]);
  const leftOrders: (number[] | null)[] = order.map((src) => perSourceLeft[src]);

  return {
    seed,
    order,
    optionOrders,
    rightOrders,
    leftOrders,
    answers: Array.from({ length: effectiveTotal }, () => []),
    pairs: new Array(effectiveTotal).fill(null),
    skipped: new Array(effectiveTotal).fill(false),
    current: 0,
    checked: new Array(effectiveTotal).fill(false),
    reviewed: new Array(effectiveTotal).fill(false),
    phase: "quiz",
    access,
    total,
  };
}

/* ---------------------------------- lifecycle --------------------------------- */

/**
 * Start a fresh, fully re-shuffled attempt and drop any saved session for this
 * module in the current access mode. The page only calls this when the user
 * explicitly picks "Start" / "Start New Exam" — a plain refresh goes through
 * resumeQuiz() instead so the saved attempt survives. Returns the active state.
 * The question slice follows the access mode: a preview takes a short random
 * subset, full mode honours the stored "Number of items" setting when there is one.
 */
export function bootQuiz(moduleId: string, module: ExamModule, access: AccessMode): AttemptState {
  dropLegacyKeys(moduleId);
  clearSaved(moduleId, access); // drop any previous session's stored attempt
  const total = module.questions.length;
  const state = buildAttempt(module.questions, freshSeed(), access, resolveLimit(access, moduleId, total));
  ctx = { moduleId, module, state, access, activeLeft: null };
  emit(); // initial paint for every subscribed view
  return state;
}

/** Start a brand-new attempt (new seed -> re-shuffle) and persist immediately. Re-applies the current access mode's limit. */
export function resetQuiz(): AttemptState {
  if (!ctx) throw new Error("resetQuiz() called before bootQuiz()");
  const total = ctx.module.questions.length;
  const state = buildAttempt(
    ctx.module.questions,
    freshSeed(),
    ctx.access,
    resolveLimit(ctx.access, ctx.moduleId, total),
  );
  ctx.state = state;
  ctx.activeLeft = null;
  emit();
  return state;
}

/**
 * Re-boot after a limit change mid-session.
 * Preserves the same module object and access mode but picks a new random subset.
 */
export function rebootWithLimit(module: ExamModule): AttemptState {
  if (!ctx) throw new Error("rebootWithLimit() called before bootQuiz()");
  const total = module.questions.length;
  const state = buildAttempt(
    module.questions,
    freshSeed(),
    ctx.access,
    resolveLimit(ctx.access, ctx.moduleId, total),
  );
  clearSaved(ctx.moduleId, ctx.access);
  ctx.module = module;
  ctx.state = state;
  ctx.activeLeft = null;
  emit();
  return state;
}

export function getState(): AttemptState | null {
  return ctx ? ctx.state : null;
}

export function getModule(): ExamModule | null {
  return ctx ? ctx.module : null;
}

export function getActiveLeft(): number | null {
  return ctx ? ctx.activeLeft : null;
}

export function subscribe(fn: () => void): () => void {
  if (typeof document === "undefined") return () => {};
  document.addEventListener(CHANGE_EVENT, fn);
  return () => document.removeEventListener(CHANGE_EVENT, fn);
}

function mutate(fn: (s: AttemptState) => void): void {
  if (!ctx) return;
  fn(ctx.state);
  emit();
}

/* ---------------------------------- navigation -------------------------------- */

export function goTo(p: number): void {
  mutate((s) => {
    s.current = Math.max(0, Math.min(s.order.length - 1, p));
    ctx!.activeLeft = null;
  });
}

export function goNext(): void {
  const s = getState();
  if (s && s.current < s.order.length - 1) goTo(s.current + 1);
}

export function goPrev(): void {
  const s = getState();
  if (s && s.current > 0) goTo(s.current - 1);
}

/**
 * True when the cursor sits on the first locked question — the sign-in gate.
 *
 * A preview attempt holds only the free questions, so `current === order.length`
 * is one past the last answerable position: progress reads "6 of 91", the tab
 * strip highlights the first locked tab, and the question body shows the gate.
 * Nothing may index `order` with it, which is what the callers check for.
 */
export function atGate(s: AttemptState | null): boolean {
  return !!s && s.current >= s.order.length;
}

/**
 * Put the cursor on the first locked question, where the sign-in gate lives.
 *
 * Jumping the cursor there (rather than veiling the question the visitor is
 * already on) is what makes the gate read as question 6: the progress counter
 * and the tab strip both say so, and the questions behind it stay one click
 * away. No-op once the cursor is already at or past the gate, so a second press
 * cannot walk further out.
 */
export function goToGate(): void {
  if (!ctx) return;
  if (atGate(ctx.state)) return;
  mutate((s) => {
    s.current = s.order.length;
    ctx!.activeLeft = null;
  });
}

/* ----------------------------------- answering -------------------------------- */

/**
 * Toggle a displayed choice option (radio for single, capped checkbox for multi).
 * Answers are recorded on every click; once the required count is reached the
 * question is auto-checked and locked — re-select only via Retry Question.
 */
export function toggleChoice(optionDisplayIndex: number): "ok" | "cap" | "locked" {
  const s = getState();
  if (!ctx || !s) return "locked";
  const qRaw = ctx.module.questions[s.order[s.current]];
  if (qRaw.type === "pair") return "locked";
  const q = qRaw as ChoiceQuestion;
  const p = s.current;
  if (s.checked[p]) return "locked"; // feedback shown — answers are final
  const selected = s.answers[p];
  const need = q.type === "single" ? 1 : (q.choose ?? 2);

  let next: number[];
  if (q.type === "single") {
    next = [optionDisplayIndex];
  } else if (selected.includes(optionDisplayIndex)) {
    next = selected.filter((x) => x !== optionDisplayIndex);
  } else if (selected.length < need) {
    next = [...selected, optionDisplayIndex];
  } else {
    return "cap"; // cap reached — caller shows the "choose only N" alert
  }

  mutate((st) => {
    st.answers[p] = next;
    st.skipped[p] = false;
    // auto-calc: reveal feedback as soon as the selection is complete.
    // In manual mode the selection is only recorded — Check reveals it.
    if (isAutoCheck()) st.checked[p] = next.length === need;
  });
  return "ok";
}

/** Click a left column item on the current pair board. */
export function clickLeftItem(leftIndex: number): void {
  if (!ctx) return;
  const q = currentQuestion();
  const s = getState();
  if (!q || q.type !== "pair" || !s) return;
  if (s.checked[s.current]) return; // locked once feedback is shown
  ctx.activeLeft = ctx.activeLeft === leftIndex ? null : leftIndex;
  emit();
}

/**
 * Click a right column item (display index) on the current pair board.
 * - with an active left: create/replace the pair
 * - without an active left on an already paired item: unlink + re-activate its left
 */
export function clickRightItem(rightDisplayIndex: number): void {
  if (!ctx) return;
  const q = currentQuestion();
  const s = getState();
  if (!q || q.type !== "pair" || !s) return;
  const p = s.current;
  if (s.checked[p]) return; // locked once feedback is shown

  mutate((st) => {
    const cur = st.pairs[p] ?? {};
    let active = ctx!.activeLeft;
    if (active === null) {
      // editing flow: unlink the left partner of this right item and re-activate it
      const pairedLeft = Object.keys(cur).find((l) => cur[Number(l)] === rightDisplayIndex);
      if (pairedLeft !== undefined) {
        const next = { ...cur };
        delete next[Number(pairedLeft)];
        st.pairs[p] = next;
        ctx!.activeLeft = Number(pairedLeft);
        if (st.checked[p]) st.checked[p] = false;
      }
      return;
    }
    // For classification questions several left items may share one right
    // target; otherwise evict any other left already claiming this right item.
    const next: Record<number, number> = {};
    Object.entries(cur).forEach(([l, r]) => {
      if (Number(l) !== active && (q.allowMultiMatch || Number(r) !== rightDisplayIndex)) {
        next[Number(l)] = Number(r);
      }
    });
    next[active] = rightDisplayIndex;
    st.pairs[p] = next;
    st.skipped[p] = false;
    ctx!.activeLeft = null;
    // auto-calc: feedback appears once every left item is paired.
    // In manual mode the pairing is only recorded — Check reveals it.
    if (isAutoCheck()) st.checked[p] = Object.keys(next).length === q.left.length;
  });
}

/* ----------------------------------- checking --------------------------------- */

/**
 * Reveal the solution for the current question (manual mode's Check button).
 * No-op until the question has an answer, and idempotent once revealed.
 */
export function checkCurrent(): void {
  const s = getState();
  if (!ctx || !s) return;
  const p = s.current;
  if (s.checked[p]) return;
  if (!hasAnswerFor(p)) return;
  mutate((st) => {
    st.checked[p] = true;
  });
}

/**
 * Flag / unflag the current question to revisit (its tab turns orange).
 * Allowed before Check: the footer "Review Question" button lives outside the
 * check bar, so a question can be flagged the moment it is read.
 */
export function toggleReview(): void {
  const s = getState();
  if (!ctx || !s) return;
  const p = s.current;
  mutate((st) => {
    st.reviewed[p] = !st.reviewed[p];
  });
}

/**
 * Fresh seeded shuffle for one column/option list. When the new order comes out
 * identical to the previous one (a pure random shuffle keeps 2-option lists in
 * the same order half the time) it is rotated by one so the layout visibly
 * changes on every retry / reshuffle.
 */
function rerollOrder(prev: number[] | null | undefined, length: number): number[] {
  let next = seededShuffle(range(length), mulberry32(freshSeed()));
  if (length > 1 && prev && next.length === prev.length && next.every((v, i) => v === prev[i])) {
    next = [...next.slice(1), next[0]!];
  }
  return next;
}

/**
 * Retry the current question: clear its answer/pairings + feedback and
 * re-shuffle its items (option order for choice, both columns for matching)
 * so a retry is not just the same layout. Uses a fresh seeded shuffle so
 * the layout actually changes on every retry (including 2-option questions
 * where a pure random shuffle would keep the original order 50% of the time).
 */
export function clearCurrentAnswer(): void {
  if (!ctx) return;
  mutate((s) => {
    const p = s.current;
    const q = ctx!.module.questions[s.order[p]];
    if (q.type === "pair") {
      s.rightOrders[p] = rerollOrder(s.rightOrders[p], q.right.length);
      s.leftOrders[p] = rerollOrder(s.leftOrders[p], q.left.length);
      s.pairs[p] = null;
    } else {
      s.optionOrders[p] = rerollOrder(s.optionOrders[p], q.options.length);
      s.answers[p] = [];
    }
    s.checked[p] = false;
    s.reviewed[p] = false;
    s.skipped[p] = false;
    ctx!.activeLeft = null;
  });
}

/**
 * Randomize the current question's layout without touching an answer: the
 * option order for choice questions, both columns for matching questions.
 * Only allowed while nothing is recorded for the question — answers/pairings
 * are stored as display indices, so moving the items afterwards would
 * silently re-point them. Once Check has run, Retry (clearCurrentAnswer)
 * shuffles and clears at the same time instead.
 */
export function reshuffleCurrent(): void {
  const s = getState();
  if (!ctx || !s) return;
  const p = s.current;
  if (s.checked[p] || hasAnswerFor(p)) return;
  mutate((st) => {
    const q = ctx!.module.questions[st.order[p]];
    if (q.type === "pair") {
      st.rightOrders[p] = rerollOrder(st.rightOrders[p], q.right.length);
      st.leftOrders[p] = rerollOrder(st.leftOrders[p], q.left.length);
    } else {
      st.optionOrders[p] = rerollOrder(st.optionOrders[p], q.options.length);
    }
    ctx!.activeLeft = null;
  });
}


/* ------------------------------------ submit ---------------------------------- */

export function openSubmit(): void {
  mutate((s) => {
    s.phase = "submit";
  });
}

export function submitQuiz(): void {
  if (!ctx) return;
  const result = scoreAttempt(ctx.module, ctx.state);
  mutate((s) => {
    s.phase = "result";
    s.result = result;
  });
}

/** Back from the submit overlay to the quiz (used by review tabs). */
export function backToQuiz(p?: number): void {
  mutate((s) => {
    s.phase = "quiz";
    if (p !== undefined) s.current = p;
  });
}

/** Result screen: return to the quiz with all answers + Check feedback intact. */
export function reviewAssessment(): void {
  mutate((s) => {
    s.phase = "quiz";
    s.current = 0;
  });
}

/* ------------------------------------ helpers --------------------------------- */

export function currentQuestion(): Question | null {
  if (!ctx) return null;
  return ctx.module.questions[ctx.state.order[ctx.state.current]];
}

export function currentPosition(): number {
  return ctx?.state.current ?? 0;
}

export function questionCount(): number {
  return ctx?.state.order.length ?? ctx?.module.questions.length ?? 0;
}

/** Display positions with no answer recorded (unanswered count for the submit screen). */
export function unansweredPositions(): number[] {
  const s = getState();
  if (!ctx || !s) return [];
  const questions = ctx.module.questions;
  const out: number[] = [];
  s.order.forEach((sourceIndex, p) => {
    const q = questions[sourceIndex];
    const pairs = s.pairs[p];
    const has =
      q.type === "pair"
        ? !!pairs && Object.keys(pairs).length > 0
        : s.answers[p].length > 0;
    if (!has) out.push(p);
  });
  return out;
}

/** Display-position "answered" flag (also clears skip state once answered). */
export function hasAnswerFor(p: number): boolean {
  const s = getState();
  if (!ctx || !s) return false;
  const q = ctx.module.questions[s.order[p]];
  if (q.type === "pair") {
    const pairs = s.pairs[p];
    return !!pairs && Object.keys(pairs).length > 0;
  }
  return s.answers[p].length > 0;
}

export function skipCurrent(): void {
  const s = getState();
  if (!s) return;
  mutate((st) => {
    st.skipped[st.current] = true;
    st.checked[st.current] = false;
  });
  if (s.current < s.order.length - 1) goTo(s.current + 1);
  else openSubmit();
}

export function skipAll(): void {
  mutate((s) => {
    s.skipped = s.skipped.map(() => true);
    s.phase = "submit";
  });
}

export function clearSaved(moduleId: string, access: AccessMode): void {
  try {
    localStorage.removeItem(storageKey(moduleId, access));
  } catch {
    /* ignore */
  }
}

/* ----------------------------------- resume ---------------------------------- */

/** True when the value is a permutation of 0..len-1 (a valid saved shuffle). */
function isPermutation(value: unknown, len: number): value is number[] {
  return (
    Array.isArray(value) &&
    value.length === len &&
    value.every((x) => Number.isInteger(x) && x >= 0 && x < len) &&
    new Set(value).size === len
  );
}

/**
 * Validate + normalize a parsed payload from localStorage against the module's
 * question data. Anything structurally off (stale shuffle, wrong option counts,
 * out-of-range indices) is repaired or rejected here so a corrupt save can
 * never crash the renderers — worst case it returns null and a fresh attempt
 * is offered instead.
 *
 * A save written in the other access mode is rejected outright: the storage key
 * already namespaces attempts, so this is only a backstop against a hand-edited
 * or hand-copied payload. Saves predating the namespace have no `access` field
 * and are always full-bank attempts.
 */
function normalizeSaved(data: unknown, module: ExamModule, access: AccessMode): AttemptState | null {
  if (!data || typeof data !== "object") return null;
  const d = data as Partial<AttemptState>;

  const savedAccess: AccessMode = isAccessMode(d.access) ? d.access : "full";
  if (savedAccess !== access) return null;

  // The order array is the backbone: display position -> source question index.
  const order = d.order;
  const sourceCount = module.questions.length;
  if (
    !Array.isArray(order) ||
    order.length === 0 ||
    !order.every((i) => Number.isInteger(i) && i >= 0 && i < sourceCount) ||
    new Set(order).size !== order.length
  ) {
    return null;
  }
  const n = order.length;

  // A preview attempt is exactly the free question count, never more. Rejecting
  // anything longer keeps a full-bank payload that reached a preview key from
  // being replayed as a "preview" attempt with more unlocked questions than the
  // visitor is entitled to.
  if (access === "preview" && n !== Math.min(PREVIEW_QUESTION_COUNT, module.questions.length)) {
    return null;
  }

  // Per-position shuffles must line up with the question they belong to,
  // otherwise answers would be graded against the wrong option layout.
  const optionOrders: (number[] | null)[] = [];
  const rightOrders: (number[] | null)[] = [];
  const leftOrders: (number[] | null)[] = [];
  for (let p = 0; p < n; p += 1) {
    const q = module.questions[order[p]!];
    const oo = d.optionOrders?.[p];
    const ro = d.rightOrders?.[p];
    if (q.type === "pair") {
      if (!isPermutation(ro, q.right.length)) return null;
      // Saves written before the left column was shuffled have no leftOrders:
      // fall back to source order, which is exactly what they were showing.
      // The left order never affects grading, so repairing is always safe.
      const lo = d.leftOrders?.[p];
      optionOrders.push(null);
      rightOrders.push(ro);
      leftOrders.push(isPermutation(lo, q.left.length) ? lo : range(q.left.length));
    } else {
      if (!isPermutation(oo, q.options.length)) return null;
      optionOrders.push(oo);
      rightOrders.push(null);
      leftOrders.push(null);
    }
  }

  // Selected display indices — drop anything outside the question's options.
  const answers: number[][] = Array.from({ length: n }, (_, p) => {
    const q = module.questions[order[p]!];
    const raw = d.answers?.[p];
    if (q.type === "pair" || !Array.isArray(raw)) return [];
    return raw.filter(
      (x, i) =>
        Number.isInteger(x) && x >= 0 && x < q.options.length && raw.indexOf(x) === i,
    );
  });

  // Pairings — keep only left/right indices the question actually has.
  const pairs: (Record<number, number> | null)[] = Array.from({ length: n }, (_, p) => {
    const q = module.questions[order[p]!];
    const raw = d.pairs?.[p];
    if (q.type !== "pair" || !raw || typeof raw !== "object") return null;
    const out: Record<number, number> = {};
    for (const [l, r] of Object.entries(raw)) {
      const li = Number(l);
      const ri = Number(r);
      if (
        Number.isInteger(li) && li >= 0 && li < q.left.length &&
        Number.isInteger(ri) && ri >= 0 && ri < q.right.length
      ) {
        out[li] = ri;
      }
    }
    return Object.keys(out).length > 0 ? out : null;
  });

  const bools = (v: unknown): boolean[] =>
    Array.from({ length: n }, (_, i) => Array.isArray(v) && v[i] === true);

  const phase = d.phase === "submit" || d.phase === "result" ? d.phase : "quiz";
  let result: AttemptResult | undefined;
  if (phase === "result") {
    const r = d.result;
    if (
      !r || typeof r !== "object" ||
      !Number.isFinite(r.score) || !Number.isFinite(r.correct) || !Number.isFinite(r.total)
    ) {
      return null; // a result screen without a grade is unusable — drop the save
    }
    result = {
      score: Math.round(r.score),
      correct: Math.round(r.correct),
      total: Math.round(r.total),
      passed: !!r.passed,
    };
  }

  return {
    seed: Number.isFinite(d.seed) ? (d.seed as number) : 0,
    order,
    optionOrders,
    rightOrders,
    leftOrders,
    answers,
    pairs,
    skipped: bools(d.skipped),
    current: Number.isInteger(d.current)
      ? Math.min(Math.max(d.current as number, 0), n - 1)
      : 0,
    checked: bools(d.checked),
    reviewed: bools(d.reviewed),
    phase,
    access,
    total: sourceCount,
    ...(result ? { result } : {}),
  };
}

/** Read + validate the saved attempt without booting the quiz (intro screen). */
export function loadSaved(moduleId: string, module: ExamModule, access: AccessMode): AttemptState | null {
  try {
    dropLegacyKeys(moduleId);
    const raw = localStorage.getItem(storageKey(moduleId, access));
    if (!raw) return null;
    return normalizeSaved(JSON.parse(raw), module, access);
  } catch {
    return null;
  }
}

/**
 * Reinstate a previously saved attempt as the live session — answers, pairings,
 * Check feedback, review flags, skip state, position and phase all come back
 * exactly as they were. Returns null when there is no usable save in this access
 * mode (the caller falls back to bootQuiz for a fresh start).
 */
export function resumeQuiz(moduleId: string, module: ExamModule, access: AccessMode): AttemptState | null {
  const state = loadSaved(moduleId, module, access);
  if (!state) return null;
  ctx = { moduleId, module, state, access, activeLeft: null };
  emit(); // re-persist (normalized) and paint every subscribed view
  return state;
}

/* -------------------------------- promotion -------------------------------- */

/**
 * Whether a saved attempt holds anything worth resuming.
 *
 * A save left behind by pressing Start and walking away again — nothing
 * answered, paired, checked, flagged or submitted — is empty, so the intro
 * offers a plain Start instead of Resume, and there is nothing to promote.
 */
export function attemptHasProgress(s: AttemptState, module: ExamModule): boolean {
  const answered = s.order.some((sourceIndex, p) => {
    const q = module.questions[sourceIndex];
    if (!q) return false;
    return q.type === "pair"
      ? !!s.pairs[p] && Object.keys(s.pairs[p] ?? {}).length > 0
      : (s.answers[p]?.length ?? 0) > 0;
  });
  return (
    answered ||
    s.phase === "submit" ||
    s.phase === "result" ||
    s.checked.some(Boolean) ||
    s.reviewed.some(Boolean)
  );
}

/**
 * Carry a signed-out visitor's preview attempt into full mode after they sign
 * in, so the questions they already answered survive the sign-in round trip.
 *
 * Attempts are namespaced per access mode, so signing in would otherwise look
 * for a key the preview never wrote and start the module from scratch. It does
 * not have to: `buildAttempt` derives every shuffle from the seed, and a
 * preview is just the full order sliced to the free count, so rebuilding with
 * the *same* seed reproduces the preview's positions and option layouts
 * exactly. Answers are stored as display indices against those layouts, so they
 * can be copied straight across.
 *
 * Returns true when a full attempt was written and is worth resuming. Nothing
 * is promoted when:
 *   - the preview was empty, or already submitted (its score was shown; a
 *     preview result is not a full attempt's result),
 *   - a full attempt with progress already exists — that one is the student's
 *     real work and must win.
 *
 * The preview save is left in place: signing out again resumes it as it was.
 */
export function promotePreviewAttempt(moduleId: string, module: ExamModule): boolean {
  const preview = loadSaved(moduleId, module, "preview");
  if (!preview || preview.phase !== "quiz") return false;
  if (!attemptHasProgress(preview, module)) return false;

  const existing = loadSaved(moduleId, module, "full");
  if (existing && attemptHasProgress(existing, module)) return false;

  const total = module.questions.length;
  const state = buildAttempt(
    module.questions,
    preview.seed,
    "full",
    resolveLimit("full", moduleId, total),
  );

  // A full attempt can be shorter than the preview was when the student capped
  // the item count below the free questions, so only the shared positions move.
  const carried = Math.min(preview.order.length, state.order.length);
  const answeredAt = (p: number): boolean => {
    const q = module.questions[state.order[p]!];
    return q.type === "pair"
      ? !!state.pairs[p] && Object.keys(state.pairs[p] ?? {}).length > 0
      : state.answers[p]!.length > 0;
  };
  for (let p = 0; p < carried; p += 1) {
    state.answers[p] = [...preview.answers[p]!];
    state.pairs[p] = preview.pairs[p] ? { ...preview.pairs[p] } : null;
    state.skipped[p] = preview.skipped[p]!;
    state.checked[p] = preview.checked[p]!;
    state.reviewed[p] = preview.reviewed[p]!;
  }
  state.phase = "quiz";
  // Come back on the first question with no answer yet — signing in was for the
  // questions after the preview, so dropping the visitor on the last question
  // they happened to be reading would be a small own-goal.
  const nextUp = state.order.findIndex((_, p) => !answeredAt(p));
  state.current = nextUp >= 0 ? nextUp : state.order.length - 1;

  writeSaved(moduleId, state);
  return true;
}
