import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { redis } from '@/lib/redis/client'
import { missingRequiredEnv } from '@/lib/env'

export const dynamic = 'force-dynamic'

/**
 * GET /api/health — unauthenticated liveness/readiness probe for uptime
 * monitors and load balancers (Sprint AQ).
 *
 * 200 = app + database reachable. 503 = database unreachable.
 * Redis state is reported but never fails the check — it's optional
 * by design (rate limiting fails open without it).
 * `config.missing` is purely informational (never affects the status
 * code) — it surfaces an incomplete deployment (per docs/DEPLOYMENT.md
 * §1's Required table) from the outside instead of as a later 500.
 */
export async function GET() {
  let db = false
  try {
    await Promise.race([
      prisma.$queryRaw`SELECT 1`,
      new Promise((_, reject) => setTimeout(() => reject(new Error('db timeout')), 3000)),
    ])
    db = true
  } catch {
    // db stays false
  }

  let redisStatus: 'ok' | 'unavailable' | 'not-configured' = 'not-configured'
  if (redis) {
    try {
      await Promise.race([
        redis.ping(),
        new Promise((_, reject) => setTimeout(() => reject(new Error('redis timeout')), 1000)),
      ])
      redisStatus = 'ok'
    } catch {
      redisStatus = 'unavailable'
    }
  }

  const missing = missingRequiredEnv()

  return NextResponse.json(
    { status: db ? 'ok' : 'degraded', db, redis: redisStatus, config: { missing } },
    { status: db ? 200 : 503 },
  )
}
