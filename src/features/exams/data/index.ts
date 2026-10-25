import type { ExamModule } from "../lib/types";
import { modules14 } from "./modules-1-4";
import { modules56 } from "./modules-5-6";
import { modules79 } from "./modules-7-9";
import { modules1013 } from "./modules-10-13";
import { modules1416 } from "./modules-14-16";
import { srweFinalExam } from "./srwe-final-exam";
import { itnModules47 } from "./itn-modules-4-7";
import { itnModules13 } from "./itn-modules-1-3";
import type { CourseId } from "./courses";

export interface ModuleMeta {
  id: string;
  courseId: CourseId; // "ccna2" — the course this exam group belongs to
  title: string; // "Modules 1 - 4"
  subtitle: string; // "Switching Concepts, VLANs, and InterVLAN Routing"
  groupLabel: string; // "Checkpoint Exam"
  available: boolean;
}

/**
 * Module registry — one entry per exam group, across every course.
 * The chooser filters this list by course, so a new group appears
 * automatically once its data files exist and `available` is flipped to true.
 *
 * Entries are grouped by course (CCNA 2 first, then CCNA 1) so consumers can
 * filter by `courseId` and still group the survivors by consecutive
 * `groupLabel` without the two courses interleaving.
 */
export const moduleRegistry: ModuleMeta[] = [
  {
    id: "system-test",
    courseId: "ccna2",
    title: "System Test Exam",
    subtitle: "",
    groupLabel: "Course Exam",
    available: false,
  },
  {
    id: "modules-1-4",
    courseId: "ccna2",
    title: "Modules 1 - 4",
    subtitle: "Switching Concepts, VLANs, and InterVLAN Routing",
    groupLabel: "Checkpoint Exam",
    available: true,
  },
  {
    id: "modules-5-6",
    courseId: "ccna2",
    title: "Modules 5 - 6",
    subtitle: "Redundant Networks",
    groupLabel: "Checkpoint Exam",
    available: true,
  },
  {
    id: "modules-7-9",
    courseId: "ccna2",
    title: "Modules 7 - 9",
    subtitle: "Available and Reliable Networks",
    groupLabel: "Checkpoint Exam",
    available: true,
  },
  {
    id: "modules-10-13",
    courseId: "ccna2",
    title: "Modules 10 - 13",
    subtitle: "L2 Security and WLANs",
    groupLabel: "Checkpoint Exam",
    available: true,
  },
  {
    id: "modules-14-16",
    courseId: "ccna2",
    title: "Modules 14 - 16",
    subtitle: "Routing Concepts and Configuration",
    groupLabel: "Checkpoint Exam",
    available: true,
  },
  {
    id: "srwe-practice-final",
    courseId: "ccna2",
    title: "SRWEv7 Practice Final Exam",
    subtitle: "CCNA 2 v7 (SRWE)",
    groupLabel: "Practice Exam",
    available: false,
  },
  {
    id: "srwe-final-exam",
    courseId: "ccna2",
    title: "CCNA 2 v7 Course FINAL Exam",
    subtitle: "Switching, Routing, and Wireless Essentials",
    groupLabel: "Final Exam",
    available: true,
  },

  /*
   * CCNA 1 v7 (ITN) — navigation only for now. These ids are pre-registered so
   * the chooser, the drawer and the `itn-` route convention already exist;
   * adding a real exam later means dropping in question data, registering the
   * module in `availableModules`, and flipping `available` here.
   */
  {
    id: "itn-modules-1-3",
    courseId: "ccna1",
    title: "Modules 1 - 3",
    subtitle: "Basic Network Connectivity and Communications",
    groupLabel: "Checkpoint Exam",
    available: true,
  },
  {
    id: "itn-modules-4-7",
    courseId: "ccna1",
    title: "Modules 4 - 7",
    subtitle: "Ethernet Concepts",
    groupLabel: "Checkpoint Exam",
    available: true,
  },
  {
    id: "itn-modules-8-10",
    courseId: "ccna1",
    title: "Modules 8 - 10",
    subtitle: "Communicating Between Networks",
    groupLabel: "Checkpoint Exam",
    available: false,
  },
  {
    id: "itn-modules-11-13",
    courseId: "ccna1",
    title: "Modules 11 - 13",
    subtitle: "IP Addressing",
    groupLabel: "Checkpoint Exam",
    available: false,
  },
  {
    id: "itn-modules-14-15",
    courseId: "ccna1",
    title: "Modules 14 - 15",
    subtitle: "Network Application Communications",
    groupLabel: "Checkpoint Exam",
    available: false,
  },
  {
    id: "itn-modules-16-17",
    courseId: "ccna1",
    title: "Modules 16 - 17",
    subtitle: "Building and Securing a Small Network",
    groupLabel: "Checkpoint Exam",
    available: false,
  },
  {
    id: "itn-final-exam",
    courseId: "ccna1",
    title: "CCNA 1 v7 Course FINAL Exam",
    subtitle: "Introduction to Networks",
    groupLabel: "Final Exam",
    available: false,
  },
];

/** Modules that currently ship question data (keyed by registry id). */
export const availableModules: Record<string, ExamModule> = {
  [modules14.id]: modules14,
  [modules56.id]: modules56,
  [modules79.id]: modules79,
  [modules1013.id]: modules1013,
  [modules1416.id]: modules1416,
  [srweFinalExam.id]: srweFinalExam,
  [itnModules47.id]: itnModules47,
  [itnModules13.id]: itnModules13,
};

/** Registry lookup helper for the module chooser. */
export function getModuleMeta(id: string): ModuleMeta | undefined {
  return moduleRegistry.find((m) => m.id === id);
}

/** Every exam group of one course, in registry (display) order. */
export function modulesForCourse(courseId: CourseId): ModuleMeta[] {
  return moduleRegistry.filter((m) => m.courseId === courseId);
}

/** Course an exam id belongs to (undefined for unknown ids). */
export function getModuleCourseId(id: string): CourseId | undefined {
  return moduleRegistry.find((m) => m.id === id)?.courseId;
}

/** Return the full exam data for an available module id (null if unavailable). */
export function getModuleData(id: string): ExamModule | null {
  return availableModules[id] ?? null;
}
