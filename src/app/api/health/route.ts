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

  /**
   * WHAT TIMEOUTS THIS DEPLOYMENT'S DATABASE CONNECTION ACTUALLY HAS.
   *
   * `poolConfig.ts` asks for `statement_timeout` and `lock_timeout` via the
   * datasource URL's `options` parameter. Whether the request ARRIVES is not
   * something the app could previously answer about itself, and the difference
   * matters: the previous form of that request (bare URL parameters) was
   * silently ignored by the Prisma query engine for the life of the project,
   * so the "no single query may starve the pool" layer poolConfig.ts describes
   * had never once been in effect. That was invisible from outside, and the
   * only external symptom was an absence — no `57014` cancellations, ever.
   *
   * It is unanswerable from the database side too: PostgreSQL exposes a GUC
   * only to the session that holds it, so no query from another connection —
   * including an operator's — can report what the app's pooled connections
   * carry. It has to be asked BY the app, ON its own client. Hence this.
   *
   * The open question this exists to settle: production connects through
   * Supavisor in TRANSACTION mode (`.env.example`: port 6543, `?pgbouncer=true`,
   * confirmed in the pooler's own logs). A transaction-mode pooler may accept
   * the `options` startup parameter and not forward it to the backend, in which
   * case a perfectly successful connection still carries no timeouts at all.
   * A connection that works is NOT evidence that the setting was adopted, and
   * this reports the setting rather than the connection.
   *
   * READ-ONLY and NON-FATAL. Two `current_setting` reads touch no table and take
   * no lock. It runs only when `db` already succeeded — a failed health check
   * must not be delayed by a second query — and on any error it reports null
   * rather than changing `status`, exactly like the `ai`/`visual` blocks above.
   * Values are PostgreSQL's own rendering ('15s', '8s', '0'), not a re-derived
   * copy of what the app requested; echoing the request back would answer the
   * wrong question.
   */
  let dbTimeouts: { statementTimeout: string; lockTimeout: string } | null = null
  if (db) {
    try {
      const rows = await Promise.race([
        prisma.$queryRaw<Array<{ statement_timeout: string; lock_timeout: string }>>`
          SELECT current_setting('statement_timeout') AS statement_timeout,
                 current_setting('lock_timeout')      AS lock_timeout`,
        new Promise<never>((_, reject) => setTimeout(() => reject(new Error('timeout')), 2000)),
      ])
      const r = rows?.[0]
      if (r) dbTimeouts = { statementTimeout: r.statement_timeout, lockTimeout: r.lock_timeout }
    } catch {
      // dbTimeouts stays null — diagnostic only, never affects the status code.
    }
  }

  return NextResponse.json(
    { status: db ? 'ok' : 'degraded', db, dbTimeouts, redis: redisStatus, ai, visual, config: { missing } },
    { status: db ? 200 : 503 },
  )
}
