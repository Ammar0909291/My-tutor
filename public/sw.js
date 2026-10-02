// v3 (2026-10-02): bumped so the activate step below deletes v2, whose cache-first copy of the
// manifest and icons kept serving the OLD eagle branding to every browser that already had it.
const CACHE_NAME = 'my-tutor-static-v3'

// Only truly static assets that never change between builds
const PRECACHE_URLS = [
  '/manifest.json',
  '/icons/mascot-192.png',
  '/icons/mascot-512.png',
  '/icons/mascot-maskable-192.png',
  '/icons/mascot-maskable-512.png',
]

// ─── Install: pre-cache only static assets ────────────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      // ignore failures — icons may not exist yet
      Promise.allSettled(PRECACHE_URLS.map((url) => cache.add(url)))
    )
  )
  self.skipWaiting()
})

// ─── Activate: delete all old caches ─────────────────────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  )
  self.clients.claim()
})

// ─── Fetch: network-first for everything except static icons ─────────────────
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return

  const url = new URL(event.request.url)

  // Never intercept API calls or Next.js internal requests
  if (
    url.pathname.startsWith('/api/') ||
    url.pathname.startsWith('/_next/') ||
    url.pathname.startsWith('/__nextjs')
  ) return

  // Navigation requests (HTML pages) — always network-first, no caching
  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request))
    return
  }

  // Icons and manifest — NETWORK-first, cache only as the offline fallback. These were cache-first
  // ("they never change"), which froze installed apps and favicons on stale branding. Branding does
  // change, so the network wins whenever it is reachable and the cache is refreshed from it.
  if (
    url.pathname.startsWith('/icons/') ||
    url.pathname === '/manifest.json'
  ) {
    event.respondWith(
      fetch(event.request)
        .then((res) => {
          if (res.ok) {
            const copy = res.clone()
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy))
          }
          return res
        })
        .catch(() => caches.match(event.request))
    )
    return
  }

  // Everything else — network-first, no caching
  event.respondWith(fetch(event.request))
})
