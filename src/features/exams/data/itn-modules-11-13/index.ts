import type { ExamModule } from "../../lib/types";
import { questions1to35 } from "./questions-1-35";
import { questions36to77 } from "./questions-36-77";

/** Modules 11 - 13: IP Addressing. */
export const itnModules1113: ExamModule = {
  id: "itn-modules-11-13",
  title: "Modules 11 - 13",
  subtitle: "IP Addressing",
  groupLabel: "Checkpoint Exam",
  questions: [...questions1to35, ...questions36to77],
};
