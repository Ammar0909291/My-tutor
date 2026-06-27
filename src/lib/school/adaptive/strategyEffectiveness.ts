/**
 * Strategy effectiveness reader (docs/STUDENT_MEMORY_AUDIT.md, gap #3).
 *
 * Reads back the TeachingStrategyEvent log (written fire-and-forget by
 * route.ts) to close the feedback loop: did the same strategy keep firing
 * on this topic without the student actually progressing? Pure read, no
 * writes. Cross-references TopicProgress.status for the staleMate check.
 */

import type { PrismaClient } from '@prisma/client'
import type { TeachingStrategyType } from './teachingStrategy'

export interface StrategyEffectiveness {
  /** Most frequently fired strategy among the last 5 events, or null if no events exist. */
  dominantStrategy: TeachingStrategyType | null
  /** Fraction (0-1) of the last 5 events where a visual actually rendered. */
  visualFireRate: number
  /** How many of the most recent events, scanning back from now, share the same strategy. */
  repeatCount: number
  /** Same strategy fired 3+ times in a row and the topic is still not MASTERED. */
  staleMate: boolean
}

const EMPTY_EFFECTIVENESS: StrategyEffectiveness = {
  dominantStrategy: null,
  visualFireRate: 0,
  repeatCount: 0,
  staleMate: false,
}

/**
 * Inspects the last 5 TeachingStrategyEvent rows for this (userId, topicSlug)
 * pair to detect whether the engine is stuck repeating a strategy that
 * isn't moving the student toward mastery.
 */
export async function getStrategyEffectiveness(
  userId: string,
  topicSlug: string,
  prisma: PrismaClient,
): Promise<StrategyEffectiveness> {
  const events = await prisma.teachingStrategyEvent.findMany({
    where: { userId, topicSlug },
    orderBy: { createdAt: 'desc' },
    take: 5,
  })

  if (events.length === 0) return EMPTY_EFFECTIVENESS

  const counts = new Map<string, number>()
  for (const e of events) counts.set(e.strategy, (counts.get(e.strategy) ?? 0) + 1)

  let dominantStrategy: TeachingStrategyType | null = null
  let maxCount = 0
  for (const e of events) {
    const count = counts.get(e.strategy) ?? 0
    if (count > maxCount) {
      maxCount = count
      dominantStrategy = e.strategy as TeachingStrategyType
    }
  }

  const mostRecentStrategy = events[0].strategy
  let repeatCount = 0
  for (const e of events) {
    if (e.strategy !== mostRecentStrategy) break
    repeatCount++
  }

  const visualFireRate = events.filter((e) => e.visualFired).length / events.length

  const topicProgress = await prisma.topicProgress.findFirst({ where: { userId, topicSlug } })
  const mastered = topicProgress?.status === 'MASTERED'

  const staleMate = repeatCount >= 3 && !mastered

  return { dominantStrategy, visualFireRate, repeatCount, staleMate }
}
