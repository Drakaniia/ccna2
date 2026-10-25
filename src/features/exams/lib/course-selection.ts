import { isCourseId, type CourseId } from "../data/courses";

/**
 * Remembered course for the home chooser, persisted in localStorage.
 * - absent / unreadable / unknown => CCNA 2 (first-visit default)
 * - written on an explicit course-card click and when an exam page boots,
 *   so a deep link teaches the chooser which course the student is in.
 *
 * Kept dependency-free like `exam-mode.ts`; this is a UI preference, never
 * consulted on the server (the static build has no storage).
 */

const KEY = "ccna-course";
export const DEFAULT_COURSE: CourseId = "ccna2";

export function getStoredCourse(): CourseId {
  if (typeof localStorage === "undefined") return DEFAULT_COURSE;
  try {
    const raw = localStorage.getItem(KEY);
    return isCourseId(raw) ? raw : DEFAULT_COURSE;
  } catch {
    /* private mode — fall back to the default for this visit */
    return DEFAULT_COURSE;
  }
}

export function setStoredCourse(id: CourseId): void {
  try {
    localStorage.setItem(KEY, id);
  } catch {
    /* private mode — the choice still applies for this visit */
  }
}
