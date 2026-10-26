/**
 * PWA plumbing shared by the pages and the header island.
 *
 * Kept dependency-free and side-effect-free at import time: the exam page's
 * analytics-free, no-framework script and a React island both use it, and the
 * `beforeinstallprompt` capture has to be installed as early as possible — the
 * event fires once and is gone if nothing is listening.
 */

/** Marks the lifetime listeners as installed, so every caller can ask twice. */
let captureInstalled = false;

/** The `beforeinstallprompt` event, which is not in lib.dom. */
export interface InstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

let deferredPrompt: InstallPromptEvent | null = null;
const subscribers = new Set<() => void>();

function notify(): void {
  for (const fn of subscribers) fn();
}

/**
 * Watch the install affordance. Fires immediately-adjacent changes only; read
 * `installPromptReady()` for the current value, since the prompt may already
 * have been captured before a late subscriber mounted.
 */
export function onInstallStateChange(fn: () => void): () => void {
  subscribers.add(fn);
  return () => {
    subscribers.delete(fn);
  };
}

export function installPromptReady(): boolean {
  return deferredPrompt !== null;
}

/** True when the page is running as an installed app rather than in a tab. */
export function isInstalled(): boolean {
  if (typeof window === "undefined") return false;
  const standalone =
    window.matchMedia?.("(display-mode: standalone)").matches ?? false;
  // Safari on iOS predates display-mode and uses its own flag.
  const iosStandalone =
    (window.navigator as Navigator & { standalone?: boolean }).standalone ===
    true;
  return standalone || iosStandalone;
}

/**
 * iOS Safari never fires `beforeinstallprompt`, so its install affordance is
 * instructions rather than a button that would do nothing when pressed.
 */
export function needsIosInstallSteps(): boolean {
  if (typeof navigator === "undefined" || isInstalled()) return false;
  const ua = navigator.userAgent;
  if (/iPad|iPhone|iPod/.test(ua)) return true;
  // iPadOS 13+ asks for the desktop site and reports itself as a Macintosh;
  // a real Mac has no touch points, which is what tells the two apart.
  return /Macintosh/.test(ua) && navigator.maxTouchPoints > 1;
}

/** Install the one-shot listeners. Safe to call from several places. */
export function captureInstallPrompt(): void {
  if (captureInstalled || typeof window === "undefined") return;
  captureInstalled = true;
  window.addEventListener("beforeinstallprompt", (event) => {
    // Suppressing the browser's own mini-infobar is what lets the settings
    // modal own the moment instead.
    event.preventDefault();
    deferredPrompt = event as InstallPromptEvent;
    notify();
  });
  window.addEventListener("appinstalled", () => {
    deferredPrompt = null;
    notify();
  });
}

/** Show the browser's install prompt, if one was captured. */
export async function promptInstall(): Promise<
  "accepted" | "dismissed" | "unavailable"
> {
  const event = deferredPrompt;
  if (!event) return "unavailable";
  // The captured event is single-use, so it is spent here either way.
  deferredPrompt = null;
  notify();
  await event.prompt();
  const choice = await event.userChoice;
  return choice.outcome;
}

/**
 * Register the service worker.
 *
 * Production only. `astro dev` serves un-hashed module URLs, and a cache-first
 * worker would serve yesterday's module graph — the worker exists so a deploy
 * can be read offline, which is a production concern. Test it against
 * `npm run build && npm run preview`.
 */
export function registerServiceWorker(): void {
  if (!import.meta.env.PROD) return;
  if (typeof navigator === "undefined" || !("serviceWorker" in navigator))
    return;

  const register = (): void => {
    // `BASE_URL` carries no trailing slash under this build, so it is normalised
    // the same way the pages' `abs()` helper does — otherwise the worker URL
    // comes out as `/ccnasw.js` and the registration silently 404s.
    const base = import.meta.env.BASE_URL.replace(/\/?$/, "/");
    // Default scope is the worker's own directory — the base root — which is
    // exactly the whole site under the `/ccna` deploy.
    void navigator.serviceWorker.register(`${base}sw.js`).catch(() => {
      /* no worker: the site still works online */
    });
  };

  if (document.readyState === "complete") register();
  else window.addEventListener("load", register, { once: true });
}
