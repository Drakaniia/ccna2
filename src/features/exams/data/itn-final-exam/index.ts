import type { ExamModule } from "../../lib/types";
import { questions1to80 } from "./questions-1-80";
import { questions81to159 } from "./questions-81-159";

/**
 * CCNA 1 v7 Course FINAL Exam: Introduction to Networks.
 * The source dump numbers the 158 questions 1 - 159; question 21 is missing,
 * so the `number` fields keep that exact numbering.
 */
export const itnFinalExam: ExamModule = {
  id: "itn-final-exam",
  title: "CCNA 1 v7 Course FINAL Exam",
  subtitle: "Introduction to Networks",
  groupLabel: "Final Exam",
  questions: [...questions1to80, ...questions81to159],
};
