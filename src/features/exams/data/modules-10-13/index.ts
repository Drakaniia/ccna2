import type { ExamModule } from "../../lib/types";
import { questions1to41 } from "./questions-1-41";
import { questions42to82 } from "./questions-42-82";

/** Modules 10 - 13: L2 Security and WLANs (81 questions; the dump has no question 63). */
export const modules1013: ExamModule = {
  id: "modules-10-13",
  title: "Modules 10 - 13",
  subtitle: "L2 Security and WLANs",
  groupLabel: "Checkpoint Exam",
  questions: [...questions1to41, ...questions42to82],
};