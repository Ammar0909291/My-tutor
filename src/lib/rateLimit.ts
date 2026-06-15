import { redis } from '@/lib/redis/client'
import { NextResponse } from 'next/server'
import { slidingWindow, clientIp } from '@/lib/rateLimitEdge'

export { clientIp } from '@/lib/rateLimitEdge'

/**
 * Sliding-window rate limiter backed by Redis (Node runtime).
 *
 * When Redis is unavailable it falls back to an in-memory per-instance limiter
 * (Sprint EK — DEF-EJ-10) rather than silently allowing every request, so
 * protection still holds in single-instance / Redis-less deployments.
 *
 * @param key    Unique key, e.g. `rl:chat:${userId}` or `rl:forgot:${ip}`
 * @param limit  Max requests per window
 * @param windowSec  Window size in seconds
 */
export async function checkRateLimit(
  key: string,
  limit: number,
  windowSec: number,
): Promise<{ allowed: boolean; remaining: number }> {
  if (!redis) {
    const r = slidingWindow(key, limit, windowSec * 1000)
    return { allowed: r.success, remaining: r.remaining }
  }

  try {
    const now = Date.now()
    const windowMs = windowSec * 1000
    const cutoff = now - windowMs

    const pipe = redis.pipeline()
    pipe.zremrangebyscore(key, '-inf', cutoff)
    pipe.zadd(key, now, `${now}-${Math.random()}`)
    pipe.zcard(key)
    pipe.expire(key, windowSec + 1)
    const results = await pipe.exec()

    const count = (results?.[2]?.[1] as number) ?? 0
    const remaining = Math.max(0, limit - count)
    return { allowed: count <= limit, remaining }
  } catch {
    // Redis errored mid-request — degrade to in-memory limiting, not open.
    const r = slidingWindow(key, limit, windowSec * 1000)
    return { allowed: r.success, remaining: r.remaining }
  }
}

export function rateLimitResponse() {
  return NextResponse.json(
    { error: 'Too many requests. Please wait before trying again.' },
    { status: 429 },
  )
}

/** Convenience: derive the client IP from a Request's headers. */
export function requestIp(req: Request): string {
  return clientIp(req.headers)
}

/** @deprecated Use requestIp instead. Kept for backward compatibility. */
export function getClientIp(req: Request): string {
  return clientIp(req.headers)
}
