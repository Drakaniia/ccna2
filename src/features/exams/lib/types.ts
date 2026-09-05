export type QuestionType = "single" | "multi" | "pair";

export interface Exhibit {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  /** When true the image is hidden while answering and revealed only after Check. */
  revealOnly?: boolean;
}

export interface ChoiceQuestion {
  number: number;
  type: "single" | "multi";
  text: string; // question text (exhibit/code markers rendered around this)
  options: string[]; // choice options
  correct: number[]; // indices into options
  choose?: number; // for multi: max selectable
  explanation?: string; // plain-text explanation (from message_box)
  exhibit?: Exhibit | Exhibit[]; // exhibit image(s), usually one
  code?: string; // <pre> content, if any
}

export interface PairQuestion {
  number: number;
  type: "pair";
  text: string;
  left: string[]; // descriptions (source order)
  right: string[]; // targets
  correctPairs: Record<number, number>; // leftIndex -> rightIndex (source order)
  /**
   * Allow several left items to pair to the same right target (classification
   * questions, e.g. "match each description to Stateless/Stateful"). Without
   * this flag each right target can be claimed by at most one left item.
   */
  allowMultiMatch?: boolean;
  explanation?: string;
  exhibit?: Exhibit | Exhibit[];
}

export type Question = ChoiceQuestion | PairQuestion;

export interface ExamModule {
  id: string; // "modules-7-9"
  title: string; // "Modules 8 - 10"
  subtitle: string; // "Communicating Between Networks"
  groupLabel: string; // "Checkpoint Exam"
  questions: Question[];
}

/** Normalize the exhibit field (may be a single image or an array). */
export function exhibitList(exhibit: Exhibit | Exhibit[] | undefined): Exhibit[] {
  if (!exhibit) return [];
  return Array.isArray(exhibit) ? exhibit : [exhibit];
}
