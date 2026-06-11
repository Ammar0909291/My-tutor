import { redis } from '@/lib/redis/client'
import { NextResponse } from 'next/server'

/**
 * Sliding-window rate limiter backed by Redis.
 * Falls back silently (allows the request) when Redis is unavailable.
 *
 * @param key    Unique key, e.g. `rl:chat:${userId}`
 * @param limit  Max requests per window
 * @param windowSec  Window size in seconds
 */
export async function checkRateLimit(
  key: string,
  limit: number,
  windowSec: number,
): Promise<{ allowed: boolean; remaining: number }> {
  if (!redis) return { allowed: true, remaining: limit }

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
    return { allowed: true, remaining: limit }
  }
}

export function rateLimitResponse() {
  return NextResponse.json(
    { error: 'Too many requests. Please wait before trying again.' },
    { status: 429 },
  )
}

/**
 * Client IP for rate-limiting unauthenticated endpoints (register,
 * forgot-password, reset-password). On Vercel the left-most entry of
 * x-forwarded-for is the real client address.
 */
export function getClientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0].trim()
  return req.headers.get('x-real-ip') ?? 'unknown'
}
