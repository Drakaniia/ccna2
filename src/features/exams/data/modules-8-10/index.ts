import type { ExamModule } from "../../lib/types";
import { questions1to40 } from "./questions-1-40";
import { questions41to76 } from "./questions-41-76";

/** Modules 8 - 10: Communicating Between Networks (all 76 questions). */
export const modules810: ExamModule = {
  id: "modules-8-10",
  title: "Modules 8 - 10",
  subtitle: "Communicating Between Networks",
  groupLabel: "Checkpoint Exam",
  questions: [...questions1to40, ...questions41to76],
};
