import type { ExamModule } from "../../lib/types";
import { questions1to38 } from "./questions-1-38";
import { questions39to76 } from "./questions-39-76";

/** Modules 8 - 10: Communicating Between Networks. */
export const itnModules810: ExamModule = {
  id: "itn-modules-8-10",
  title: "Modules 8 - 10",
  subtitle: "Communicating Between Networks",
  groupLabel: "Checkpoint Exam",
  questions: [...questions1to38, ...questions39to76],
};
