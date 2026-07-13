import type { TopicStatus } from '@prisma/client'

/**
 * Running-average mastery score used by TopicProgress. Extracted verbatim
 * from src/app/api/practice/submit/route.ts so it can be contract-tested
 * directly instead of via a hand-copied replica.
 */
export function computeMasteryPct(existingPct: number | null, score: number): number {
  return existingPct === null ? score : Math.round((existingPct + score) / 2)
}

/**
 * Status only auto-derives from masteryPct while a topic is still
 * NOT_STARTED/IN_PROGRESS. Once it reaches any other status (COMPLETED,
 * MASTERED, SKIPPED, REVISION, ...) it is sticky and a later lower-scoring
 * attempt does not downgrade it. Extracted verbatim from
 * src/app/api/practice/submit/route.ts.
 */
export function deriveTopicStatus(currentStatus: TopicStatus, masteryPct: number): TopicStatus {
  if (currentStatus !== 'NOT_STARTED' && currentStatus !== 'IN_PROGRESS') return currentStatus
  if (masteryPct >= 80) return 'MASTERED'
  if (masteryPct >= 50) return 'COMPLETED'
  return 'IN_PROGRESS'
}
