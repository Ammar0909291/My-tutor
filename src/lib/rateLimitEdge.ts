/**
 * Edge-safe sliding-window rate limiter (Sprint EK — DEF-EJ-10).
 *
 * Pure in-memory, NO ioredis/Node imports, so it is importable from
 * `middleware.ts` (Edge runtime) and reused as the fallback in the Node-side
 * `rateLimit.ts` when Redis is unavailable. State is per-instance.
 *
 * ── LOW-3: Known limitations ─────────────────────────────────────────────────
 *
 * 1. Per-process state (not shared).
 *    Each Node.js worker or Edge runtime instance holds its own `store` Map.
 *    In a horizontally-scaled deployment (multiple pods / serverless replicas)
 *    each instance tracks only the requests it personally handled. A client
 *    distributing requests across N replicas can make N×limit calls before any
 *    single instance blocks them.
 *
 * 2. Cold-start reset.
 *    Serverless / Edge deployments spin up new instances on demand. A cold start
 *    clears all in-memory counters, resetting the window for every key. This
 *    means burst limits are ineffective immediately after a cold start.
 *
 * 3. No persistence.
 *    Restarting the process (deploy, crash, scale-down) erases all state.
 *
 * Mitigation in production:
 *    The Node-side `rateLimit.ts` uses Redis (via `checkRateLimit`) for all
 *    sensitive routes (/api/auth/register, /api/auth/forgot-password, etc.)
 *    when REDIS_URL is configured. This limiter is the fallback for those routes
 *    when Redis is unavailable, and the primary limiter for the Edge middleware.
 *    For strict single-instance or dev environments it provides adequate protection.
 *    For multi-replica production, provision Redis and set REDIS_URL.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  /** Seconds until the caller may retry (0 when allowed). */
  retryAfterSec: number
}

interface Bucket {
  hits: number[]
}

const store = new Map<string, Bucket>()

/** Allow at most `limit` requests per `windowMs` for `key` (sliding window). */
export function slidingWindow(key: string, limit: number, windowMs: number, now: number = Date.now()): RateLimitResult {
  const cutoff = now - windowMs
  const bucket = store.get(key) ?? { hits: [] }
  bucket.hits = bucket.hits.filter((t) => t > cutoff)

  if (bucket.hits.length >= limit) {
    const oldest = bucket.hits[0]
    const retryAfterSec = Math.max(1, Math.ceil((oldest + windowMs - now) / 1000))
    store.set(key, bucket)
    return { success: false, limit, remaining: 0, retryAfterSec }
  }

  bucket.hits.push(now)
  store.set(key, bucket)

  // Opportunistic cleanup so the Map can't grow unbounded under attack.
  if (store.size > 10_000) {
    for (const [k, b] of store) {
      b.hits = b.hits.filter((t) => t > cutoff)
      if (b.hits.length === 0) store.delete(k)
    }
  }

  return { success: true, limit, remaining: limit - bucket.hits.length, retryAfterSec: 0 }
}

/** Per-IP request ceilings (requests per 60s window) by route sensitivity. */
export const RL_TIERS = {
  /** Email + credential actions: brute-force / enumeration / inbox-spam guard. */
  strict: { limit: 5, windowMs: 60_000 },
  /** AI-backed routes: protects model credits from automated drain. */
  ai: { limit: 30, windowMs: 60_000 },
  /** Everything else under /api. */
  general: { limit: 120, windowMs: 60_000 },
} as const

export type RateLimitTier = keyof typeof RL_TIERS

const STRICT_PATHS = ['/api/auth/forgot-password', '/api/auth/reset-password', '/api/auth/register']
const AI_PREFIXES = ['/api/learn', '/api/quiz', '/api/practice', '/api/assessment', '/api/coach', '/api/stt']
const AUTH_INTERNAL_PREFIXES = [
  '/api/auth/callback',
  '/api/auth/session',
  '/api/auth/csrf',
  '/api/auth/providers',
  '/api/auth/signin',
  '/api/auth/signout',
  '/api/auth/error',
  '/api/auth/_log',
]

/** Classify an /api pathname into a tier, or null when it should be exempt. */
export function classifyApiPath(pathname: string): RateLimitTier | null {
  if (AUTH_INTERNAL_PREFIXES.some((p) => pathname.startsWith(p))) return null
  if (STRICT_PATHS.includes(pathname)) return 'strict'
  if (AI_PREFIXES.some((p) => pathname.startsWith(p))) return 'ai'
  return 'general'
}

/**
 * HIGH-3: Extract a rate-limit key that cannot be trivially spoofed.
 *
 * Attack: a client sets X-Forwarded-For: <rotating IPs> to appear as different
 * callers. The first entry in XFF is always client-supplied and untrustworthy.
 *
 * Defence:
 * 1. x-real-ip — set by a trusted reverse proxy (nginx, Vercel edge); a
 *    single authoritative value the client cannot override.
 * 2. Last value in x-forwarded-for — appended by the outermost trusted proxy,
 *    not the client (who can only inject values at the front).
 * 3. First XFF value — only as last resort in single-hop setups where there
 *    is no proxy wrapping; still better than 'unknown'.
 *
 * This does not defend against a compromised proxy layer, but it closes the
 * trivial client-side spoofing attack described in HIGH-3.
 */
export function clientIp(headers: Headers): string {
  // Prefer the single-value header set by the trusted proxy layer.
  const realIp = headers.get('x-real-ip')?.trim()
  if (realIp) return realIp

  const xff = headers.get('x-forwarded-for')
  if (xff) {
    const parts = xff.split(',').map((s) => s.trim()).filter(Boolean)
    // Last entry is set by the outermost trusted proxy, not the client.
    if (parts.length > 0) return parts[parts.length - 1]
  }

  return 'unknown'
}
