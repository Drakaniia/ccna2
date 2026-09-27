/**
 * Persistence for the "follow me on GitHub" prompt.
 *
 * The prompt is deliberately persistent-until-converted: it reappears on every
 * page load until the visitor actually clicks the GitHub link. Closing it early
 * (Escape, backdrop, or the close button) is a *deferral*, not a dismissal, so
 * only {@link markFollowed} writes to storage.
 */

const KEY = "ccna-followed-github";

/** Profile the CTA points at. Matches the repo owner in astro.config.mjs. */
export const GITHUB_URL = "https://github.com/Drakaniia";
export const GITHUB_HANDLE = "Drakaniia";

/** Credited contributor on the prompt's second slide. */
export const CREDIT_URL = "https://github.com/Didigzz";
export const CREDIT_HANDLE = "Didigzz";

/** True once the visitor has clicked through to the profile. */
export function hasFollowed(): boolean {
  if (typeof localStorage === "undefined") return false;
  try {
    return localStorage.getItem(KEY) === "1";
  } catch {
    // Private mode / storage disabled — assume not yet, so the CTA keeps asking.
    return false;
  }
}

/** Latch the flag so the prompt never interrupts this visitor again. */
export function markFollowed(): void {
  try {
    localStorage.setItem(KEY, "1");
  } catch {
    /* private mode — the prompt will simply return next visit */
  }
}
