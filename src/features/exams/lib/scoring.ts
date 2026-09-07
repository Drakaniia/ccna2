import type { ChoiceQuestion, ExamModule, PairQuestion, Question } from "./types";
import type { AttemptState } from "./quiz-state";

export const PASS_THRESHOLD = 70;

/** Does the user have any answer recorded for this question? */
export function isAnswered(
  q: Question,
  answer: number[],
  pairs: Record<number, number> | null | undefined
): boolean {
  if (q.type === "pair") {
    return !!pairs && Object.keys(pairs).length > 0;
  }
  return answer.length > 0;
}

/**
 * single/multi: exact set equality between the selected options and the
 * correct options (compared in source space via the option order map).
 */
export function isChoiceQuestionCorrect(
  q: ChoiceQuestion,
  answer: number[],
  optionOrder: number[]
): boolean {
  if (answer.length === 0) return false;
  const selected = [...answer].map((i) => optionOrder[i]).sort((a, b) => a - b).join(",");
  const correct = [...q.correct].sort((a, b) => a - b).join(",");
  return selected === correct;
}

/**
 * pair: all-or-nothing — every left item must be paired and each pair must
 * equal the correct source pairing (right column compared in source space).
 */
export function isPairQuestionCorrect(
  q: PairQuestion,
  pairs: Record<number, number> | null | undefined,
  rightOrder: number[]
): boolean {
  if (!pairs) return false;
  const lefts = Object.keys(pairs).map(Number);
  if (lefts.length !== q.left.length) return false;
  return lefts.every((left) => pairs[left] === rightOrder.indexOf(q.correctPairs[left]));
}

/** Grade one displayed question (display position `p` maps to source question `q`). */
export function isQuestionCorrect(
  q: Question,
  state: AttemptState,
  p: number
): boolean {
  if (q.type === "pair") {
    return isPairQuestionCorrect(q, state.pairs[p] ?? {}, state.rightOrders[p] ?? []);
  }
  return isChoiceQuestionCorrect(q, state.answers[p], state.optionOrders[p] ?? []);
}

export interface AttemptResult {
  correct: number;
  total: number;
  score: number;
  passed: boolean;
}

/** Equal weight per question; unanswered counts as wrong; round to nearest %; pass >= 70%. */
export function scoreAttempt(module: ExamModule, state: AttemptState): AttemptResult {
  let correct = 0;
  const total = state.order.length;
  state.order.forEach((sourceIndex, p) => {
    const q = module.questions[sourceIndex];
    if (isQuestionCorrect(q, state, p)) correct++;
  });
  const score = total === 0 ? 0 : Math.round((correct / total) * 100);
  return { correct, total, score, passed: score >= PASS_THRESHOLD };
}
