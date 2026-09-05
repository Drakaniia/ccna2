import type { ExamModule } from "../lib/types";
import { modules810 } from "./modules-8-10";

export interface ModuleMeta {
  id: string;
  title: string; // "Modules 8 - 10"
  subtitle: string; // "Communicating Between Networks"
  groupLabel: string; // "Checkpoint Exam"
  available: boolean;
}

/**
 * Module registry — one entry per CCNA1 v7 exam group.
 * The chooser page reads this list, so future modules appear automatically
 * once their data files exist and `available` is flipped to true.
 */
export const moduleRegistry: ModuleMeta[] = [
  {
    id: "modules-1-3",
    title: "Modules 1 - 3",
    subtitle: "Basic Network Connectivity and Communications",
    groupLabel: "Checkpoint Exam",
    available: false,
  },
  {
    id: "modules-4-7",
    title: "Modules 4 - 7",
    subtitle: "Ethernet Concepts",
    groupLabel: "Checkpoint Exam",
    available: false,
  },
  {
    id: "modules-8-10",
    title: "Modules 8 - 10",
    subtitle: "Communicating Between Networks",
    groupLabel: "Checkpoint Exam",
    available: true,
  },
  {
    id: "modules-11-13",
    title: "Modules 11 - 13",
    subtitle: "IP Addressing",
    groupLabel: "Checkpoint Exam",
    available: false,
  },
  {
    id: "modules-14-16",
    title: "Modules 14 - 16",
    subtitle: "Routing Concepts and Essentials",
    groupLabel: "Checkpoint Exam",
    available: false,
  },
  {
    id: "modules-17-20",
    title: "Modules 17 - 20",
    subtitle: "Build a Small Cisco Network",
    groupLabel: "Checkpoint Exam",
    available: false,
  },
];

/** Modules that currently ship question data (keyed by registry id). */
export const availableModules: Record<string, ExamModule> = {
  [modules810.id]: modules810,
};

/** Registry lookup helper for the module chooser. */
export function getModuleMeta(id: string): ModuleMeta | undefined {
  return moduleRegistry.find((m) => m.id === id);
}

/** Return the full exam data for an available module id (null if unavailable). */
export function getModuleData(id: string): ExamModule | null {
  return availableModules[id] ?? null;
}
