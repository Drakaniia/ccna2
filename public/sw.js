/*
 * CCNA 2 v7 practice exams — service worker.
 *
 * Registered on every visit (not only when an exam is marked offline-ready), so
 * the site is installable and the last visit stays readable without a network.
 * The per-exam "Save this exam for offline use" switch only decides what is
 * downloaded up front; it never gates whether this file runs.
 *
 * Hand-written rather than generated from a build manifest: the project has no
 * runtime dependencies and no build-step machinery, and everything except the
 * shell is picked up by runtime caching anyway. Bump SW_VERSION in the same
 * change as anything that alters what the shell contains — that is what evicts
 * the previous deploy instead of leaving two shells fighting.
 */
const SW_VERSION = "1";
const SHELL_CACHE = `ccna-shell-v${SW_VERSION}`;
const RUNTIME_CACHE = `ccna-runtime-v${SW_VERSION}`;

/** Per-exam downloads made by the settings toggle. Kept across deploys. */
const EXAM_CACHE_PREFIX = "ccna-exam-offline:";

/**
 * The shell, by stable (un-hashed) path only — the fingerprinted `_astro/*`
 * bundles are picked up by runtime caching on first load, because their names
 * change every build and cannot be listed here.
 */
const SHELL_PATHS = [
  "./",
  "./offline.html",
  "./manifest.webmanifest",
  "./favicon.svg",
  "./favicon.ico",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./icons/apple-touch-icon.png",
];

function absolute(path) {
  return new URL(path, self.location).href;
}

const OFFLINE_URL = absolute("./offline.html");

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(SHELL_CACHE);
      // Individually, not addAll: one 404 in the list must not abort the whole
      // precache and leave the app with no shell at all.
      await Promise.allSettled(
        SHELL_PATHS.map((path) => cache.add(absolute(path))),
      );
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.map((name) => {
          if (name === SHELL_CACHE || name === RUNTIME_CACHE) return undefined;
          // Anything else this origin cached belongs to an older build — except
          // the per-exam downloads, which are the student's, not the build's.
          if (name.startsWith(EXAM_CACHE_PREFIX)) return undefined;
          return name.startsWith("ccna-") ? caches.delete(name) : undefined;
        }),
      );
      await self.clients.claim();
    })(),
  );
});

/** A navigation request: fresh HTML when the network answers, cached when not. */
async function networkFirstNavigation(request) {
  try {
    const response = await fetch(request);
    if (response && response.ok) {
      const cache = await caches.open(SHELL_CACHE);
      // `vary` headers on a stored response can make a later match miss, and a
      // navigation has nothing to vary on, so matching ignores it.
      await cache.put(request, response.clone());
    }
    return response;
  } catch {
    const hit = await caches.match(request, { ignoreVary: true });
    if (hit) return hit;
    const shell = await caches.match(OFFLINE_URL, { ignoreVary: true });
    if (shell) return shell;
    return new Response("You are offline.", {
      status: 503,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}

/** Any other same-origin GET: the cached copy is as good as a fresh one. */
async function cacheFirst(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  const hit = await cache.match(request);
  if (hit) return hit;
  const response = await fetch(request);
  if (response && response.ok) await cache.put(request, response.clone());
  return response;
}

/**
 * Exhibits: the cached copy is served immediately and refreshed behind it, so a
 * new screenshot lands one visit later instead of blocking the question.
 */
async function staleWhileRevalidate(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  const hit = await cache.match(request);
  const update = fetch(request)
    .then((response) => {
      if (response && response.ok) void cache.put(request, response.clone());
      return response;
    })
    .catch(() => undefined);

  if (hit) return hit;
  const response = await update;
  if (response) return response;
  return new Response("", { status: 504, statusText: "Offline" });
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  // Cross-origin is never touched. The auth worker lives on workers.dev, and a
  // cached session answer is worse than no answer at all.
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(networkFirstNavigation(request));
    return;
  }

  // The offline toggle asks for the network copy on purpose ("Refresh
  // download"), so that request is not allowed to be answered from a cache.
  if (request.cache === "no-store" || request.cache === "reload") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.ok) {
            void caches
              .open(RUNTIME_CACHE)
              .then((cache) => cache.put(request, response.clone()))
              .catch(() => undefined);
          }
          return response;
        })
        .catch(async () => (await caches.match(request)) ?? Response.error()),
    );
    return;
  }

  if (url.pathname.includes("/images/")) {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }

  event.respondWith(cacheFirst(request));
});
