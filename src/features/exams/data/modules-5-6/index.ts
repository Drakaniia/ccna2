import type { ExamModule } from "../../lib/types";
import { questions1to28 } from "./questions-1-28";
import { questions29to56 } from "./questions-29-56";

/**
 * Modules 5 - 6: Redundant Networks.
 * The source dump numbers its 55 questions 1 - 40 and 42 - 56 (question 41 is
 * missing), so the `number` fields keep that exact numbering.
 */
export const modules56: ExamModule = {
  id: "modules-5-6",
  title: "Modules 5 - 6",
  subtitle: "Redundant Networks",
  groupLabel: "Checkpoint Exam",
  questions: [...questions1to28, ...questions29to56],
};
