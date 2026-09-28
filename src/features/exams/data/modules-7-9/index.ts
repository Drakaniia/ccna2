import type { ExamModule } from "../../lib/types";
import { questions1to35 } from "./questions-1-35";
import { questions36to69 } from "./questions-36-69";
import { questions70to78 } from "./questions-70-78";
import { questions79to91 } from "./questions-79-91";

/** Modules 7 - 9: Available and Reliable Networks (all 91 questions). */
export const modules79: ExamModule = {
  id: "modules-7-9",
  title: "Modules 7 - 9",
  subtitle: "Available and Reliable Networks",
  groupLabel: "Checkpoint Exam",
  questions: [...questions1to35, ...questions36to69, ...questions70to78, ...questions79to91],
};