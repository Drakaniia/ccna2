import type { ExamModule } from "../../lib/types";
import { questions1to31 } from "./questions-1-31";
import { questions32to64 } from "./questions-32-64";

/** Modules 14 - 16: Routing Concepts and Configuration (63 questions; the dump has no question 11). */
export const modules1416: ExamModule = {
  id: "modules-14-16",
  title: "Modules 14 - 16",
  subtitle: "Routing Concepts and Configuration",
  groupLabel: "Checkpoint Exam",
  questions: [...questions1to31, ...questions32to64],
};