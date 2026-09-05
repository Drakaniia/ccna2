import type { ExamModule } from "../lib/types";
import { modules79 } from "./modules-7-9";
import { modules1013 } from "./modules-10-13";
import { modules1416 } from "./modules-14-16";
import { srweFinalExam } from "./srwe-final-exam";

export interface ModuleMeta {
  id: string;
  title: string; // "Modules 1 - 4"
  subtitle: string; // "Switching Concepts, VLANs, and InterVLAN Routing"
  groupLabel: string; // "Checkpoint Exam"
  available: boolean;
}

/**
 * Module registry — one entry per CCNA 2 v7 (SRWE) exam group.
 * The chooser page reads this list, so future modules appear automatically
 * once their data files exist and `available` is flipped to true.
 */
export const moduleRegistry: ModuleMeta[] = [
  {
    id: "system-test",
    title: "System Test Exam",
    subtitle: "",
    groupLabel: "Course Exam",
    available: false,
  },
  {
    id: "modules-1-4",
    title: "Modules 1 - 4",
    subtitle: "Switching Concepts, VLANs, and InterVLAN Routing",
    groupLabel: "Checkpoint Exam",
    available: false,
  },
  {
    id: "modules-5-6",
    title: "Modules 5 - 6",
    subtitle: "Redundant Networks",
    groupLabel: "Checkpoint Exam",
    available: false,
  },
  {
    id: "modules-7-9",
    title: "Modules 7 - 9",
    subtitle: "Available and Reliable Networks",
    groupLabel: "Checkpoint Exam",
    available: true,
  },
  {
    id: "modules-10-13",
    title: "Modules 10 - 13",
    subtitle: "L2 Security and WLANs",
    groupLabel: "Checkpoint Exam",
    available: true,
  },
  {
    id: "modules-14-16",
    title: "Modules 14 - 16",
    subtitle: "Routing Concepts and Configuration",
    groupLabel: "Checkpoint Exam",
    available: true,
  },
  {
    id: "srwe-practice-final",
    title: "SRWEv7 Practice Final Exam",
    subtitle: "CCNA 2 v7 (SRWE)",
    groupLabel: "Practice Exam",
    available: false,
  },
  {
    id: "srwe-final-exam",
    title: "CCNA 2 v7 Course FINAL Exam",
    subtitle: "Switching, Routing, and Wireless Essentials",
    groupLabel: "Final Exam",
    available: true,
  },
];

/** Modules that currently ship question data (keyed by registry id). */
export const availableModules: Record<string, ExamModule> = {
  [modules79.id]: modules79,
  [modules1013.id]: modules1013,
  [modules1416.id]: modules1416,
  [srweFinalExam.id]: srweFinalExam,
};

/** Registry lookup helper for the module chooser. */
export function getModuleMeta(id: string): ModuleMeta | undefined {
  return moduleRegistry.find((m) => m.id === id);
}

/** Return the full exam data for an available module id (null if unavailable). */
export function getModuleData(id: string): ExamModule | null {
  return availableModules[id] ?? null;
}