/**
 * Browser-side helpers for the app error boundary (src/app/error.tsx). Kept out of that file: Next.js special files should export only their default component.
 */

/** Tell the server what crashed (api/client-error): a browser-side render error leaves no server log of its own. Fire-and-forget; never throws. */
export function reportClientError(error: Error & { digest?: string }) {
  try {
    const body = JSON.stringify({
      name: error?.name, message: error?.message, digest: error?.digest, stack: error?.stack,
      url: typeof location !== 'undefined' ? location.pathname + location.search : '', lang: typeof localStorage !== 'undefined' ? localStorage.getItem('mytutor_lang') : '',
    })
    if (typeof navigator !== 'undefined' && navigator.sendBeacon) navigator.sendBeacon('/api/client-error', new Blob([body], { type: 'application/json' }))
    else void fetch('/api/client-error', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, keepalive: true })
  } catch { /* reporting must never make a crash worse */ }
}

export const isChunkLoadError = (e: unknown): boolean => {
  const text = `${(e as Error)?.name ?? ''} ${(e as Error)?.message ?? ''}`
  return /ChunkLoadError|Loading chunk [\w-]+ failed|Loading CSS chunk|Failed to fetch dynamically imported module/i.test(text)
}

