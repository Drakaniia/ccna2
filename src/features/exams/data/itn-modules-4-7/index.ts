import type { ExamModule } from "../../lib/types";
import { questions1to40 } from "./questions-1-40";
import { questions41to79 } from "./questions-41-79";

/**
 * Modules 4 - 7: Ethernet Concepts.
 * The source dump numbers its 70 questions 1 - 79; 52, 62, 63, 65, 67, 69, 70,
 * 72 and 77 are missing, so the `number` fields keep that exact numbering.
 */
export const itnModules47: ExamModule = {
  id: "itn-modules-4-7",
  title: "Modules 4 - 7",
  subtitle: "Ethernet Concepts",
  groupLabel: "Checkpoint Exam",
  questions: [...questions1to40, ...questions41to79],
};
