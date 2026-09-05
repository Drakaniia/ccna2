import type { ExamModule } from "../../lib/types";
import { questions1to35 } from "./questions-1-35";
import { questions36to69 } from "./questions-36-69";

/** Modules 7 - 9: Available and Reliable Networks (all 69 questions). */
export const modules79: ExamModule = {
  id: "modules-7-9",
  title: "Modules 7 - 9",
  subtitle: "Available and Reliable Networks",
  groupLabel: "Checkpoint Exam",
  questions: [...questions1to35, ...questions36to69],
};