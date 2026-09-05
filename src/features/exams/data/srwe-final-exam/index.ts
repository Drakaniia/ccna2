import type { ExamModule } from "../../lib/types";
import { questions1to86 } from "./questions-1-86";
import { questions87to174 } from "./questions-87-174";

/** CCNA 2 v7 Course FINAL Exam (Switching, Routing, and Wireless Essentials) — all questions. */
export const srweFinalExam: ExamModule = {
  id: "srwe-final-exam",
  title: "CCNA 2 v7 Course FINAL Exam",
  subtitle: "Switching, Routing, and Wireless Essentials",
  groupLabel: "Final Exam",
  questions: [...questions1to86, ...questions87to174],
};
