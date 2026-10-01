import type { Page, Request } from '@playwright/test'

// The simulation's network contract (ADR 16 §7): it makes NO requests of its
// own — no API, no tutor, no database, no third-party service.
//
// The page it lives in is still a Next.js app, and the app SHELL makes one
// request the simulation does not: NextAuth's SessionProvider refetches
// GET /api/auth/session when the window regains focus (measured: it caught the
// G3 zero-request assertion). That one request is allowed by EXACT match —
// method, same origin, path and an empty query — and nothing else is. Any other
// /api call, the tutor endpoint, a POST to the session route, a query string,
// or another origin is reported as unexpected, so the assertion still fails if
// simulation code ever reaches the network.

export type NetworkClass = 'dev-tooling' | 'app-shell' | 'unexpected'

/** The app-shell requests the simulation is not responsible for — exact entries only. */
export const APP_SHELL_REQUESTS: ReadonlyArray<{ method: string; path: string }> = [
  { method: 'GET', path: '/api/auth/session' },
]

export function classifyRequest(method: string, url: string, origin: string): NetworkClass {
  const u = new URL(url)
  if (u.origin === origin && (u.pathname.startsWith('/_next/') || u.pathname.includes('__nextjs'))) return 'dev-tooling'
  const shell = APP_SHELL_REQUESTS.some((r) => r.method === method && r.path === u.pathname)
  return shell && u.origin === origin && u.search === '' ? 'app-shell' : 'unexpected'
}

/** Record every request from now on; `unexpected` is what the simulation must never produce. */
export function watchNetwork(page: Page, origin: string) {
  const seen: Array<{ cls: NetworkClass; line: string }> = []
  const onRequest = (r: Request) => seen.push({ cls: classifyRequest(r.method(), r.url(), origin), line: `${r.method()} ${r.url()}` })
  page.on('request', onRequest)
  return {
    unexpected: () => seen.filter((s) => s.cls === 'unexpected').map((s) => s.line),
    appShell: () => seen.filter((s) => s.cls === 'app-shell').map((s) => s.line),
    stop: () => page.off('request', onRequest),
  }
}
