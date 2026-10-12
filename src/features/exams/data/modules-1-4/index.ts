import type { ExamModule } from "../../lib/types";
import { questions1to39 } from "./questions-1-39";
import { questions40to79 } from "./questions-40-79";

/**
 * Modules 1 - 4: Switching Concepts, VLANs, and InterVLAN Routing.
 * The source dump numbers its 77 questions 1 - 60 and 62 - 79 (questions 61
 * and 67 are missing), so the `number` fields keep that exact numbering.
 */
export const modules14: ExamModule = {
  id: "modules-1-4",
  title: "Modules 1 - 4",
  subtitle: "Switching Concepts, VLANs, and InterVLAN Routing",
  groupLabel: "Checkpoint Exam",
  questions: [...questions1to39, ...questions40to79],
};
