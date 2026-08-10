import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { redis } from '@/lib/redis/client'
import { missingRequiredEnv } from '@/lib/env'
import { snapshotProviderMetrics } from '@/lib/ai/providers/metrics'
import { generationPolicySummary } from '@/lib/teaching/visual/generationPolicy'

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
 * `ai` reports in-process provider metrics (request counts, failovers,
 * latency) — informational only, never affects the status code.
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
  const ai = snapshotProviderMetrics()

  /**
   * What the visualization engine is actually permitted to do IN THIS
   * DEPLOYMENT.
   *
   * Added because there was no way to answer it from outside. Whether
   * generation is live depends on environment variables read inside the
   * running lambda, and the alternative to reporting it is inferring it from
   * whether figures happen to appear — which cannot distinguish "disabled"
   * from "enabled but nothing eligible yet". Both are silent, and they call
   * for opposite responses.
   *
   * `scope: 'rule-based'` is the load-bearing value: it says eligibility is
   * decided by grounding and budget for every topic, rather than by an
   * enumeration. A non-empty `narrowedTo` would mean a hidden allowlist is
   * still restricting the engine.
   *
   * Reports PRESENCE only, never a key or any part of one.
   */
  const visual = {
    ...generationPolicySummary(),
    providerKey: Boolean(process.env.GEMINI_API_KEY),
  }

  return NextResponse.json(
    { status: db ? 'ok' : 'degraded', db, redis: redisStatus, ai, visual, config: { missing } },
    { status: db ? 200 : 503 },
  )
}
