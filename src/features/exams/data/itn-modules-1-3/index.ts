import type { ExamModule } from "../../lib/types";
import { questions1to40 } from "./questions-1-40";
import { questions41to76 } from "./questions-41-76";

/**
 * Modules 1 - 3: Basic Network Connectivity and Communications.
 * The source dump numbers its 75 questions 1 - 76; 60 is missing, so the
 * `number` fields keep that exact numbering.
 */
export const itnModules13: ExamModule = {
  id: "itn-modules-1-3",
  title: "Modules 1 - 3",
  subtitle: "Basic Network Connectivity and Communications",
  groupLabel: "Checkpoint Exam",
  questions: [...questions1to40, ...questions41to76],
};
