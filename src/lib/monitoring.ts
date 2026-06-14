/**
 * Lightweight error monitoring hook (Sprint EK — DEF-EJ-11).
 *
 * Provides structured error reporting + in-process failure counters so
 * operational failures (e.g. SMTP outages) are observable instead of silent.
 *
 * - Always logs a structured line to stderr (captured by the platform logger).
 * - Optionally POSTs a redacted payload to MONITORING_WEBHOOK_URL when set
 *   (Sentry/Logtail/Slack-compatible). NEVER includes credentials or secrets —
 *   callers must pass only non-sensitive metadata.
 * - Maintains per-context counters readable via getFailureCounters() for a
 *   future health endpoint.
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

/** Mask an email for logging: keeps first char + domain (a***@example.com). */
export function maskEmail(email: string): string {
  const [local, domain] = email.split('@')
  if (!domain) return '[invalid-email]'
  const head = local.slice(0, 1)
  return `${head}***@${domain}`
}
