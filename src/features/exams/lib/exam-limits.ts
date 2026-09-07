/**
 * Per-module question limit persisted in localStorage.
 * - null / absent => "All" (no limit)
 * - number 1..max => random subset of that size on next boot
 */

export const LIMIT_EVENT = "exam:limit-change";

function key(moduleId: string): string {
  return `ccna-limit:${moduleId}`;
}

/** Raw stored value: number string or empty. Returns number | null (null = All). */
export function getStoredLimit(moduleId: string): number | null {
  if (typeof window === "undefined" || typeof localStorage === "undefined") return null;
  try {
    const raw = localStorage.getItem(key(moduleId));
    if (raw === null || raw === "") return null;
    const n = Number(raw);
    if (!Number.isFinite(n) || !Number.isInteger(n)) return null;
    return n;
  } catch {
    return null;
  }
}

/** Effective limit clamped to 1..max, or max when stored is null/invalid/out-of-range. */
export function getEffectiveLimit(moduleId: string, max: number): number {
  const stored = getStoredLimit(moduleId);
  if (stored === null) return max;
  if (stored < 1) return max;
  if (stored > max) return max;
  return stored;
}

/** Effective count to display (same as getEffectiveLimit, semantic alias). */
export function getEffectiveCount(moduleId: string, max: number): number {
  return getEffectiveLimit(moduleId, max);
}

export function setStoredLimit(moduleId: string, value: number | null): void {
  try {
    if (value === null) {
      localStorage.removeItem(key(moduleId));
    } else {
      localStorage.setItem(key(moduleId), String(value));
    }
  } catch {
    /* private mode */
  }
  if (typeof document !== "undefined") {
    document.dispatchEvent(new CustomEvent(LIMIT_EVENT, { detail: { moduleId, value } }));
  }
}

export function clearStoredLimit(moduleId: string): void {
  setStoredLimit(moduleId, null);
}
