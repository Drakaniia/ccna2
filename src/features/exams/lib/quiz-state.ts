import type { ChoiceQuestion, ExamModule, Question } from "./types";
import { mulberry32, range, seededShuffle } from "./shuffle";
import { scoreAttempt, type AttemptResult } from "./scoring";

export interface AttemptState {
  seed: number; // shuffle seed for this attempt
  order: number[]; // shuffled question order: display position -> source index
  optionOrders: (number[] | null)[]; // per display position: display index -> source option index
  rightOrders: (number[] | null)[]; // per display position: display index -> source right-column index
  answers: number[][]; // per display position: selected option display indices
  pairs: (Record<number, number> | null)[]; // per display position: left source idx -> right display idx
  skipped: boolean[];
  current: number;
  checked: boolean[]; // questions whose Check feedback has been revealed
  phase: "quiz" | "submit" | "result";
  result?: AttemptResult;
}

const CHANGE_EVENT = "quiz:change";
const STORAGE_PREFIX = "ccna-exam:";

interface QuizContext {
  moduleId: string;
  module: ExamModule;
  state: AttemptState;
  /** active (highlighted) left item of the current pair board — memory only */
  activeLeft: number | null;
}

let ctx: QuizContext | null = null;

export function storageKey(moduleId: string): string {
  return `${STORAGE_PREFIX}${moduleId}`;
}

/* ---------------------------------- persistence -------------------------------- */

function persist(): void {
  if (!ctx) return;
  try {
    localStorage.setItem(storageKey(ctx.moduleId), JSON.stringify(ctx.state));
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

function buildAttempt(questions: Question[], seed: number): AttemptState {
  const rand = mulberry32(seed);
  const total = questions.length;

  // One shuffle per source question (options for choice, right column for pair).
  const perSourceOption: (number[] | null)[] = questions.map((q) =>
    q.type === "pair" ? null : seededShuffle(range(q.options.length), rand)
  );
  const perSourceRight: (number[] | null)[] = questions.map((q) =>
    q.type === "pair" ? seededShuffle(range(q.right.length), rand) : null
  );

  const order = seededShuffle(range(total), rand);

  // Slot shuffles into per-display-position arrays.
  const optionOrders: (number[] | null)[] = order.map((src) => perSourceOption[src]);
  const rightOrders: (number[] | null)[] = order.map((src) => perSourceRight[src]);

  return {
    seed,
    order,
    optionOrders,
    rightOrders,
    answers: Array.from({ length: total }, () => []),
    pairs: new Array(total).fill(null),
    skipped: new Array(total).fill(false),
    current: 0,
    checked: new Array(total).fill(false),
    phase: "quiz",
  };
}

/* ---------------------------------- lifecycle --------------------------------- */

/**
 * Start a fresh, fully re-shuffled attempt on every page load. Nothing is
 * restored from a previous session, so question 1 is never always the same
 * after a refresh. Returns the active state.
 */
export function bootQuiz(moduleId: string, module: ExamModule): AttemptState {
  clearSaved(moduleId); // drop any previous session's stored attempt
  const state = buildAttempt(module.questions, freshSeed());
  ctx = { moduleId, module, state, activeLeft: null };
  emit(); // initial paint for every subscribed view
  return state;
}

/** Start a brand-new attempt (new seed -> re-shuffle) and persist immediately. */
export function resetQuiz(): AttemptState {
  if (!ctx) throw new Error("resetQuiz() called before bootQuiz()");
  ctx.state = buildAttempt(ctx.module.questions, Date.now());
  ctx.activeLeft = null;
  emit();
  return ctx.state;
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

/* ----------------------------------- answering -------------------------------- */

/**
 * Toggle a displayed choice option (radio for single, capped checkbox for multi).
 * Answers are recorded on every click; once the required count is reached the
 * question is auto-checked and locked — re-select only via Retry Question.
 */
export function toggleChoice(optionDisplayIndex: number): "ok" | "cap" | "locked" {
  const s = getState();
  if (!ctx || !s) return "locked";
  const q = ctx.module.questions[s.order[s.current]] as ChoiceQuestion;
  if (q.type === "pair") return "locked";
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
    // auto-calc: reveal feedback as soon as the selection is complete
    st.checked[p] = next.length === need;
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
    // remove any other left already claiming this right item
    const next: Record<number, number> = {};
    Object.entries(cur).forEach(([l, r]) => {
      if (Number(l) !== active && Number(r) !== rightDisplayIndex) next[Number(l)] = Number(r);
    });
    next[active] = rightDisplayIndex;
    st.pairs[p] = next;
    st.skipped[p] = false;
    ctx!.activeLeft = null;
    // auto-calc: feedback appears once every left item is paired
    st.checked[p] = Object.keys(next).length === q.left.length;
  });
}

/* ----------------------------------- checking --------------------------------- */

/**
 * Retry the current question: clear its answer/pairings + feedback and
 * re-shuffle its items (option order for choice, right column for matching)
 * so a retry is not just the same layout.
 */
export function clearCurrentAnswer(): void {
  if (!ctx) return;
  mutate((s) => {
    const p = s.current;
    const q = ctx!.module.questions[s.order[p]];
    if (q.type === "pair") {
      s.rightOrders[p] = seededShuffle(range(q.right.length), Math.random);
      s.pairs[p] = null;
    } else {
      s.optionOrders[p] = seededShuffle(range(q.options.length), Math.random);
      s.answers[p] = [];
    }
    s.checked[p] = false;
    s.skipped[p] = false;
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
  return ctx?.module.questions.length ?? 0;
}

/** Display positions with no answer recorded (unanswered count for the submit screen). */
export function unansweredPositions(): number[] {
  const s = getState();
  if (!ctx || !s) return [];
  const out: number[] = [];
  s.order.forEach((sourceIndex, p) => {
    const q = ctx.module.questions[sourceIndex];
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

export function clearSaved(moduleId: string): void {
  try {
    localStorage.removeItem(storageKey(moduleId));
  } catch {
    /* ignore */
  }
}
