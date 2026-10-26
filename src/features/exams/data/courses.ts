export type CourseId = "ccna1" | "ccna";

export interface CourseMeta {
  id: CourseId;
  /** Kicker on the chooser card, e.g. "CCNA 1" */
  label: string;
  /** Card headline, e.g. "Introduction to Networks" */
  title: string;
  /** Small tag under the title, e.g. "ITN · v7" */
  tag: string;
  /** Drawer brand prefix, e.g. "CCNA 1 v7 — ITN" */
  brand: string;
  /** One-line description under "Choose an Exam" */
  lead: string;
  /** Optional note shown above the exam grid */
  note?: string;
}

/**
 * Course registry — one entry per Cisco course the site covers.
 * Card order follows this array, so CCNA 1 stays first on the chooser.
 */
export const courseRegistry: CourseMeta[] = [
  {
    id: "ccna1",
    label: "CCNA 1",
    title: "Introduction to Networks",
    tag: "ITN · v7",
    brand: "CCNA 1 v7 — ITN",
    lead: "CCNA 1 v7 — Introduction to Networks (ITN) module checkpoint exams.",
    note: "More CCNA 1 exams are being prepared — check back soon.",
  },
  {
    id: "ccna",
    label: "CCNA 2",
    title: "Switching, Routing & Wireless",
    tag: "SRWE · v7",
    brand: "CCNA 2 v7 — SRWE",
    lead: "CCNA 2 v7 — Switching, Routing, and Wireless Essentials (SRWE) module checkpoint exams.",
  },
];

const coursesById = new Map(courseRegistry.map((c) => [c.id, c]));

export function isCourseId(value: unknown): value is CourseId {
  return value === "ccna1" || value === "ccna";
}

/** Course metadata by id; falls back to CCNA 2 for unknown ids. */
export function getCourseMeta(id: string | null | undefined): CourseMeta {
  return (
    (id ? coursesById.get(id as CourseId) : undefined) ??
    coursesById.get("ccna")!
  );
}
