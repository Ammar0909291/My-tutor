/**
 * Edge-safe sliding-window rate limiter (Sprint EK — DEF-EJ-10).
 *
 * Pure in-memory, NO ioredis/Node imports, so it is importable from
 * `middleware.ts` (Edge runtime) and reused as the fallback in the Node-side
 * `rateLimit.ts` when Redis is unavailable. State is per-instance.
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

/** Extract the best-effort client IP from forwarding headers. */
export function clientIp(headers: Headers): string {
  const xff = headers.get('x-forwarded-for')
  if (xff) return xff.split(',')[0].trim()
  return headers.get('x-real-ip') ?? 'unknown'
}
