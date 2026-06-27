import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { isAdmin } from '@/lib/auth/admin'
import { prisma } from '@/lib/db/prisma'

export const dynamic = 'force-dynamic'

const LOOKBACK_MS = 7 * 24 * 60 * 60 * 1000
const STALEMATE_RUN_LENGTH = 3

interface StrategyInsight {
  userId: string
  userEmail: string | null
  topicSlug: string
  dominantStrategy: string
  stalemateCount: number
  visualFireRate: number
  mostRecentActionType: string
  eventCount: number
}

/**
 * Read-only teacher/admin dashboard feed (Sprint CW follow-up): summarizes
 * the TeachingStrategyEvent log per (student, topic) over the last 7 days.
 * No new table — reuses the same event log strategyEffectiveness.ts reads
 * for the per-turn stalemate check, aggregated here across all students.
 *
 * "Most recent action type" = the outputBias.kind of the latest event —
 * the only other categorical field route.ts records per turn alongside
 * the fired strategy (PROMOTE / SUPPRESS_OPTIONAL / NEUTRAL — see
 * teachingOutputBias.ts).
 */
export async function GET() {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const adminOk = await isAdmin(session.user.id)
  if (!adminOk) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const since = new Date(Date.now() - LOOKBACK_MS)
  const events = await prisma.teachingStrategyEvent.findMany({
    where: { createdAt: { gte: since } },
    orderBy: { createdAt: 'asc' },
    select: { userId: true, topicSlug: true, strategy: true, outputBias: true, visualFired: true, createdAt: true },
  })

  if (events.length === 0) {
    return NextResponse.json({ insights: [], windowDays: 7, timestamp: new Date().toISOString() })
  }

  const userIds = [...new Set(events.map((e) => e.userId))]
  const users = await prisma.user.findMany({
    where: { id: { in: userIds } },
    select: { id: true, email: true },
  })
  const emailByUserId = new Map(users.map((u) => [u.id, u.email]))

  const groups = new Map<string, typeof events>()
  for (const e of events) {
    const key = `${e.userId}::${e.topicSlug}`
    const list = groups.get(key)
    if (list) list.push(e)
    else groups.set(key, [e])
  }

  const insights: StrategyInsight[] = []
  for (const [key, groupEvents] of groups) {
    const [userId, topicSlug] = key.split('::')

    const counts = new Map<string, number>()
    for (const e of groupEvents) counts.set(e.strategy, (counts.get(e.strategy) ?? 0) + 1)
    // groupEvents is chronological ascending — use >= so a count tie is broken
    // in favor of the more recently occurring strategy, not the earliest.
    let dominantStrategy = groupEvents[0].strategy
    let maxCount = 0
    for (const e of groupEvents) {
      const count = counts.get(e.strategy) ?? 0
      if (count >= maxCount) {
        maxCount = count
        dominantStrategy = e.strategy
      }
    }

    // Stalemate count: number of distinct same-strategy runs (chronological,
    // consecutive) that reach 3+ in a row — mirrors strategyEffectiveness.ts's
    // repeatCount >= 3 threshold, counted once per run rather than per event.
    let stalemateCount = 0
    let runStrategy: string | null = null
    let runLength = 0
    for (const e of groupEvents) {
      if (e.strategy === runStrategy) {
        runLength++
      } else {
        runStrategy = e.strategy
        runLength = 1
      }
      if (runLength === STALEMATE_RUN_LENGTH) stalemateCount++
    }

    const visualFireRate = groupEvents.filter((e) => e.visualFired).length / groupEvents.length
    const mostRecent = groupEvents[groupEvents.length - 1]

    insights.push({
      userId,
      userEmail: emailByUserId.get(userId) ?? null,
      topicSlug,
      dominantStrategy,
      stalemateCount,
      visualFireRate: Math.round(visualFireRate * 100) / 100,
      mostRecentActionType: mostRecent.outputBias,
      eventCount: groupEvents.length,
    })
  }

  insights.sort((a, b) => b.stalemateCount - a.stalemateCount || b.eventCount - a.eventCount)

  return NextResponse.json({
    insights,
    windowDays: 7,
    timestamp: new Date().toISOString(),
  })
}
