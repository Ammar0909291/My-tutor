/**
 * The learner's topic_progress rows across ALL subjects — the one read the
 * intelligence profiles share (revision, difficulty, teaching plan, adaptation
 * effectiveness). One column superset so a single read serves every caller;
 * memoized per request (see src/lib/db/requestMemo.ts for the measured cost).
 */
import { prisma } from '@/lib/db/prisma'
import { memoized } from '@/lib/db/requestMemo'

export function loadUserTopicRows(userId: string) {
  return memoized(`topicProgress:user:${userId}`, () => prisma.topicProgress.findMany({
    where: { userId },
    select: {
      subjectSlug: true, topicSlug: true, status: true,
      masteryPct: true, attempts: true, revisionCount: true, lastScore: true,
    },
  }))
}
