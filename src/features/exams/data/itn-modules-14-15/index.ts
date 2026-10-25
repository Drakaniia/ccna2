import type { ExamModule } from "../../lib/types";
import { questions1to31 } from "./questions-1-31";
import { questions32to61 } from "./questions-32-61";

/** Modules 14 - 15: Network Application Communications. */
export const itnModules1415: ExamModule = {
  id: "itn-modules-14-15",
  title: "Modules 14 - 15",
  subtitle: "Network Application Communications",
  groupLabel: "Checkpoint Exam",
  questions: [...questions1to31, ...questions32to61],
};
