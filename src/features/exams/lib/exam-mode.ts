/**
 * Global solution-feedback preference, persisted in localStorage.
 * - "auto"   (default) the solution is revealed as soon as the answer is complete
 * - "manual" the user must press Check to reveal the solution
 *
 * This is a study preference, not a property of an exam, so it is stored once
 * for the whole site rather than per module like the question limit.
 */

export const MODE_EVENT = "exam:mode-change";

export type CheckMode = "auto" | "manual";

const KEY = "ccna-check-mode";

/** Stored mode, falling back to "auto" when absent or unreadable. */
export function getCheckMode(): CheckMode {
  if (typeof localStorage === "undefined") return "auto";
  try {
    return localStorage.getItem(KEY) === "manual" ? "manual" : "auto";
  } catch {
    return "auto";
  }
}

/** True when feedback should be revealed automatically on a complete answer. */
export function isAutoCheck(): boolean {
  return getCheckMode() === "auto";
}

export function setCheckMode(mode: CheckMode): void {
  try {
    localStorage.setItem(KEY, mode);
  } catch {
    /* private mode — the mode still applies for this visit */
  }
  if (typeof document !== "undefined") {
    document.dispatchEvent(new CustomEvent(MODE_EVENT, { detail: { mode } }));
  }
}
