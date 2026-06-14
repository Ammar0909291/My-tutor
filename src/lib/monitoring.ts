/**
 * Lightweight server-side error reporting to Sentry (Sprint AR).
 *
 * Sends events straight to Sentry's store API using only SENTRY_DSN — no SDK
 * dependency, no build-pipeline changes, no client-bundle impact. Swapping in
 * the full @sentry/nextjs SDK later is a drop-in upgrade (same DSN).
 *
 * No-ops entirely when SENTRY_DSN is unset, so local dev and tests are
 * unaffected. Fire-and-forget: reporting never blocks or fails a request.
 *
 * Spam guards (Sentry free tier is 5k events/month):
 *  - identical (route, message) pairs are deduped for 5 minutes
 *  - hard cap of 20 events per minute process-wide
 */

const DEDUPE_WINDOW_MS = 5 * 60_000
const MAX_EVENTS_PER_MIN = 20

const recentEvents = new Map<string, number>() // dedupe key -> expires
let windowStart = 0
let windowCount = 0

interface DsnParts {
  protocol: string
  publicKey: string
  host: string
  projectId: string
}

function parseDsn(dsn: string): DsnParts | null {
  // DSN format: https://{publicKey}@{host}/{projectId}
  const m = dsn.match(/^(https?):\/\/([^@]+)@([^/]+)\/(.+)$/)
  if (!m) return null
  return { protocol: m[1], publicKey: m[2], host: m[3], projectId: m[4] }
}

function shouldSend(dedupeKey: string): boolean {
  const now = Date.now()

  if (now - windowStart > 60_000) {
    windowStart = now
    windowCount = 0
  }
  if (windowCount >= MAX_EVENTS_PER_MIN) return false

  const seen = recentEvents.get(dedupeKey)
  if (seen && seen > now) return false

  recentEvents.set(dedupeKey, now + DEDUPE_WINDOW_MS)
  if (recentEvents.size > 1000) {
    for (const [k, exp] of recentEvents) {
      if (exp <= now) recentEvents.delete(k)
    }
  }
  windowCount += 1
  return true
}

export interface CaptureContext {
  /** Route or module name, e.g. 'api/learn/chat' — used for grouping/dedupe */
  route: string
  /** Extra searchable tags, e.g. { provider: 'groq' } */
  tags?: Record<string, string>
  /** Non-indexed debugging context */
  extra?: Record<string, unknown>
}

/**
 * Report an error to Sentry. Safe to call anywhere on the server —
 * never throws, never blocks (returns immediately, sends in background).
 */
export function captureError(error: unknown, ctx: CaptureContext): void {
  const dsn = process.env.SENTRY_DSN
  if (!dsn) return

  const parsed = parseDsn(dsn)
  if (!parsed) return

  const err = error instanceof Error ? error : new Error(String(error))
  if (!shouldSend(`${ctx.route}:${err.message}`)) return

  const event = {
    event_id: crypto.randomUUID().replace(/-/g, ''),
    timestamp: new Date().toISOString(),
    platform: 'node',
    level: 'error',
    logger: ctx.route,
    environment: process.env.NODE_ENV ?? 'development',
    exception: {
      values: [{ type: err.name, value: err.message }],
    },
    tags: { route: ctx.route, ...ctx.tags },
    extra: { ...ctx.extra, stack: err.stack?.split('\n').slice(0, 20).join('\n') },
  }

  const url = `${parsed.protocol}://${parsed.host}/api/${parsed.projectId}/store/`
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Sentry-Auth': `Sentry sentry_version=7, sentry_client=my-tutor/1.0, sentry_key=${parsed.publicKey}`,
    },
    body: JSON.stringify(event),
  }).catch(() => {
    // Reporting must never affect the request path.
  })
}
