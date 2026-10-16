/**
 * Per-exam offline switch, persisted in localStorage, plus the cache prefetch
 * that backs it.
 *
 * Mirrors the `exam-mode.ts` / `exam-limits.ts` conventions: one small module,
 * one event constant, never throws. The switch is per exam, defaults off, and
 * controls two things — what is downloaded up front, and whether the exam
 * claims to be ready offline.
 *
 * Turning it **off** deletes nothing. That is deliberate: the decision is then
 * cheap and reversible, and it keeps the promise made in the settings copy. An
 * exam that is already on the device keeps working; it just stops being
 * advertised as ready.
 */

export const OFFLINE_EVENT = "exam:offline-change";

/**
 * Per-exam downloads live outside the service worker's versioned caches, so a
 * new deploy does not silently throw away something the student asked for.
 */
export const OFFLINE_CACHE_PREFIX = "ccna-exam-offline:";

function key(moduleId: string): string {
  return `ccna-offline:${moduleId}`;
}

export function getOfflineEnabled(moduleId: string): boolean {
  if (typeof localStorage === "undefined") return false;
  try {
    return localStorage.getItem(key(moduleId)) === "1";
  } catch {
    return false;
  }
}

export function setOfflineEnabled(moduleId: string, enabled: boolean): void {
  try {
    if (enabled) localStorage.setItem(key(moduleId), "1");
    else localStorage.removeItem(key(moduleId));
  } catch {
    /* private mode — the switch still applies for this visit */
  }
  if (typeof document !== "undefined") {
    document.dispatchEvent(
      new CustomEvent(OFFLINE_EVENT, { detail: { moduleId, enabled } }),
    );
  }
}

export function offlineCacheName(moduleId: string): string {
  return `${OFFLINE_CACHE_PREFIX}${moduleId}`;
}

export interface OfflineSummary {
  count: number;
  bytes: number;
}

export interface CacheProgress {
  done: number;
  total: number;
  bytes: number;
}

export interface CacheResult {
  /** Files actually stored by this run. */
  count: number;
  bytes: number;
  failed: number;
}

/** Byte size of a response without consuming the body it is read from. */
async function responseBytes(res: Response): Promise<number> {
  const header = res.headers.get("content-length");
  if (header) {
    const n = Number(header);
    if (Number.isFinite(n) && n > 0) return n;
  }
  try {
    return (await res.clone().blob()).size;
  } catch {
    return 0;
  }
}

/**
 * What this exam currently occupies on the device. Read from Cache Storage
 * rather than from a stored number, so an eviction by the browser is reflected
 * instead of reported as a download that is no longer there.
 */
export async function offlineCacheSummary(
  moduleId: string,
): Promise<OfflineSummary> {
  if (typeof caches === "undefined") return { count: 0, bytes: 0 };
  try {
    const cache = await caches.open(offlineCacheName(moduleId));
    const requests = await cache.keys();
    let bytes = 0;
    for (const request of requests) {
      const cached = await cache.match(request);
      if (cached) bytes += await responseBytes(cached);
    }
    return { count: requests.length, bytes };
  } catch {
    return { count: 0, bytes: 0 };
  }
}

/**
 * Download `urls` into this exam's cache, reporting progress as it goes.
 *
 * The download runs in the page rather than through a message to the worker:
 * the Cache Storage API is the same one the worker reads, so the page can fill
 * it directly — no message protocol, and progress is a plain callback.
 * `cache: "no-store"` asks for the real network copy, so "Refresh download"
 * refreshes instead of re-reading the copies already on disk.
 */
export async function cacheExamFiles(
  moduleId: string,
  urls: string[],
  onProgress?: (progress: CacheProgress) => void,
): Promise<CacheResult> {
  const total = urls.length;
  if (typeof caches === "undefined")
    return { count: 0, bytes: 0, failed: total };

  const cache = await caches.open(offlineCacheName(moduleId));
  let done = 0;
  let stored = 0;
  let bytes = 0;
  let failed = 0;
  onProgress?.({ done, total, bytes });

  for (const url of urls) {
    try {
      const res = await fetch(url, {
        credentials: "same-origin",
        cache: "no-store",
      });
      if (!res.ok) {
        failed += 1;
      } else {
        bytes += await responseBytes(res);
        await cache.put(url, res);
        stored += 1;
      }
    } catch {
      // One unreachable file must not abandon the rest of the download.
      failed += 1;
    }
    done += 1;
    onProgress?.({ done, total, bytes });
  }

  return { count: stored, bytes, failed };
}

/** Compact, human-readable size for the settings readout. */
export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 MB";
  const mb = bytes / (1024 * 1024);
  if (mb >= 1) return `${mb.toFixed(mb >= 10 ? 0 : 1)} MB`;
  const kb = Math.max(1, Math.round(bytes / 1024));
  return `${kb} KB`;
}
