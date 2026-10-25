import type { ExamModule } from "../../lib/types";
import { questions1to34 } from "./questions-1-34";
import { questions35to67 } from "./questions-35-67";

/** Modules 16 - 17: Building and Securing a Small Network. */
export const itnModules1617: ExamModule = {
  id: "itn-modules-16-17",
  title: "Modules 16 - 17",
  subtitle: "Building and Securing a Small Network",
  groupLabel: "Checkpoint Exam",
  questions: [...questions1to34, ...questions35to67],
};
