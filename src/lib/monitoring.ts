/**
 * Error monitoring (Sprint EK, DEF-EJ-11 + restored Sprint AR Sentry path).
 *
 * Two independent, best-effort channels — neither ever throws or blocks a request:
 * - Always logs a structured line to stderr (captured by the platform logger)
 *   and increments an in-process counter, readable via getFailureCounters()
 *   (used by /api/admin/ops).
 * - Optionally POSTs a redacted payload to MONITORING_WEBHOOK_URL when set
 *   (Slack/Logtail/any JSON-accepting endpoint).
 * - Optionally sends directly to Sentry's store API when SENTRY_DSN is set —
 *   no @sentry/nextjs SDK dependency, no build-pipeline changes, no client-
 *   bundle impact (a prior "consolidation" merge on 2026-06-15 replaced this
 *   path with the webhook-only version above without updating
 *   docs/DEPLOYMENT.md, which still documents this exact Sentry behavior —
 *   restored here rather than left as a silently-broken promise). Deduped
 *   (5 min per route+message) and capped (20 events/min process-wide) so the
 *   free tier isn't flooded.
 *
 * NEVER includes credentials or secrets on any channel — callers must pass
 * only non-sensitive metadata; redact() strips anything that looks sensitive
 * regardless.
 */

type Meta = Record<string, string | number | boolean | null | undefined>

const counters = new Map<string, number>()

/** Increment and return the failure count for a context key. */
export function recordFailure(context: string): number {
  const next = (counters.get(context) ?? 0) + 1
  counters.set(context, next)
  return next
}

/** Snapshot of all failure counters (for health/ops dashboards). */
export function getFailureCounters(): Record<string, number> {
  return Object.fromEntries(counters)
}

// Keys that must never leave the process even if a caller passes them by mistake.
const REDACT_KEYS = /pass|secret|token|key|authorization|cookie|smtp_pass/i

function redact(meta: Meta): Meta {
  const out: Meta = {}
  for (const [k, v] of Object.entries(meta)) {
    out[k] = REDACT_KEYS.test(k) ? '[redacted]' : v
  }
  return out
}

/**
 * Report an operational error. Returns the running failure count for `context`.
 * `meta` must contain only non-sensitive values (emails should be pre-masked).
 */
export function reportError(context: string, err: unknown, meta: Meta = {}): number {
  const count = recordFailure(context)
  const message = err instanceof Error ? err.message : String(err)
  const safeMeta = redact(meta)

  console.error(`[monitor] ${context} failed (#${count}):`, message, safeMeta)

  const webhook = process.env.MONITORING_WEBHOOK_URL
  if (webhook) {
    // Fire-and-forget; never throw from the monitoring path.
    void fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ context, message, count, meta: safeMeta, at: new Date().toISOString() }),
    }).catch(() => {})
  }

  return count
}

type CaptureErrorOptions = {
  route?: string
  tags?: Record<string, string>
  extra?: Record<string, unknown>
}

// ─── Sentry direct-capture (SENTRY_DSN) ──────────────────────────────────────
// Independent dedupe/cap state from the counters above — Sentry's free tier
// (5k events/month) is a tighter budget than the local counters need to respect.
const SENTRY_DEDUPE_WINDOW_MS = 5 * 60_000
const SENTRY_MAX_EVENTS_PER_MIN = 20
const sentryRecentEvents = new Map<string, number>() // dedupe key -> expires-at
let sentryWindowStart = 0
let sentryWindowCount = 0

function parseSentryDsn(dsn: string): { protocol: string; publicKey: string; host: string; projectId: string } | null {
  // DSN format: https://{publicKey}@{host}/{projectId}
  const m = dsn.match(/^(https?):\/\/([^@]+)@([^/]+)\/(.+)$/)
  if (!m) return null
  return { protocol: m[1], publicKey: m[2], host: m[3], projectId: m[4] }
}

function sentryShouldSend(dedupeKey: string): boolean {
  const now = Date.now()

  if (now - sentryWindowStart > 60_000) {
    sentryWindowStart = now
    sentryWindowCount = 0
  }
  if (sentryWindowCount >= SENTRY_MAX_EVENTS_PER_MIN) return false

  const expires = sentryRecentEvents.get(dedupeKey)
  if (expires && expires > now) return false

  sentryRecentEvents.set(dedupeKey, now + SENTRY_DEDUPE_WINDOW_MS)
  if (sentryRecentEvents.size > 1000) {
    for (const [k, exp] of sentryRecentEvents) {
      if (exp <= now) sentryRecentEvents.delete(k)
    }
  }
  sentryWindowCount += 1
  return true
}

function sendToSentry(err: unknown, opts: CaptureErrorOptions): void {
  const dsn = process.env.SENTRY_DSN
  if (!dsn) return
  const parsed = parseSentryDsn(dsn)
  if (!parsed) return

  const route = opts.route ?? 'unknown'
  const error = err instanceof Error ? err : new Error(String(err))
  if (!sentryShouldSend(`${route}:${error.message}`)) return

  const event = {
    event_id: crypto.randomUUID().replace(/-/g, ''),
    timestamp: new Date().toISOString(),
    platform: 'node',
    level: 'error',
    logger: route,
    environment: process.env.NODE_ENV ?? 'development',
    exception: { values: [{ type: error.name, value: error.message }] },
    tags: { route, ...opts.tags },
    extra: { ...redact((opts.extra as Meta) ?? {}), stack: error.stack?.split('\n').slice(0, 20).join('\n') },
  }

  const url = `${parsed.protocol}://${parsed.host}/api/${parsed.projectId}/store/`
  // Fire-and-forget; reporting must never affect the request path.
  void fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Sentry-Auth': `Sentry sentry_version=7, sentry_client=my-tutor/1.0, sentry_key=${parsed.publicKey}`,
    },
    body: JSON.stringify(event),
  }).catch(() => {})
}

/** Alias used by foundation-branch callers: captureError(err, { route, tags, extra }) */
export function captureError(err: unknown, opts: CaptureErrorOptions = {}): void {
  const context = opts.route ?? 'unknown'
  const meta: Meta = { ...opts.tags }
  if (opts.extra) {
    for (const [k, v] of Object.entries(opts.extra)) {
      if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean' || v == null) {
        meta[k] = v as Meta[string]
      }
    }
  }
  reportError(context, err, meta)
  sendToSentry(err, opts)
}

/** Mask an email for logging: keeps first char + domain (a***@example.com). */
export function maskEmail(email: string): string {
  const [local, domain] = email.split('@')
  if (!domain) return '[invalid-email]'
  const head = local.slice(0, 1)
  return `${head}***@${domain}`
}
