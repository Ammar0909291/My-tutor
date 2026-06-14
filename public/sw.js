const CACHE_NAME = 'my-tutor-static-v2'

// Only truly static assets that never change between builds
const PRECACHE_URLS = [
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
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

  // Static icons and manifest — cache-first (these truly never change)
  if (
    url.pathname.startsWith('/icons/') ||
    url.pathname === '/manifest.json'
  ) {
    event.respondWith(
      caches.match(event.request).then((cached) => cached || fetch(event.request))
    )
    return
  }

  // Everything else — network-first, no caching
  event.respondWith(fetch(event.request))
})
