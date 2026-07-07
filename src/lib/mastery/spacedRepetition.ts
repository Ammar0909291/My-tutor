import { prisma } from '@/lib/db/prisma'
import { withRetry } from '@/lib/db/withRetry'

export interface RepetitionSchedule {
  nextReviewAt: Date
  interval: number
  easeFactor: number
}

export function calculateNextReview(
  _correct: boolean,
  schedule?: RepetitionSchedule
): RepetitionSchedule {
  return schedule ?? { nextReviewAt: new Date(), interval: 1, easeFactor: 2.5 }
}

export interface ReviewItem {
  topicSlug?: string
  topic: string
  subjectId: string
  lastReviewedAt: Date
  createdAt: Date
  daysOverdue?: number
}

export interface DueReviewsResult {
  overdue: ReviewItem[]
  today: ReviewItem[]
  upcoming: ReviewItem[]
  all: ReviewItem[]
}

// SM-2-style fixed interval ladder keyed by review count, applied against
// RetentionMetric.lastReviewedAt (or createdAt for never-reviewed topics).
const REVIEW_INTERVALS_DAYS = [1, 3, 7, 14, 30, 60]

export async function getDueReviews(userId: string): Promise<DueReviewsResult> {
  const metrics = await withRetry(() => prisma.retentionMetric.findMany({ where: { userId } }))

  const now = Date.now()
  const startOfToday = new Date()
  startOfToday.setHours(0, 0, 0, 0)
  const endOfToday = new Date(startOfToday.getTime() + 86400000)

  const overdue: ReviewItem[] = []
  const today: ReviewItem[] = []
  const upcoming: ReviewItem[] = []

  for (const m of metrics) {
    const basis = m.lastReviewedAt ?? m.createdAt
    const interval = REVIEW_INTERVALS_DAYS[Math.min(m.reviewCount, REVIEW_INTERVALS_DAYS.length - 1)]
    const nextReviewAt = new Date(basis.getTime() + interval * 86400000)
    const item: ReviewItem = {
      topicSlug: m.topic,
      topic: m.topic,
      subjectId: m.subjectId,
      lastReviewedAt: m.lastReviewedAt ?? m.createdAt,
      createdAt: m.createdAt,
    }

    if (nextReviewAt.getTime() < startOfToday.getTime()) {
      item.daysOverdue = Math.floor((now - nextReviewAt.getTime()) / 86400000)
      overdue.push(item)
    } else if (nextReviewAt.getTime() < endOfToday.getTime()) {
      today.push(item)
    } else {
      upcoming.push(item)
    }
  }

  overdue.sort((a, b) => (b.daysOverdue ?? 0) - (a.daysOverdue ?? 0))

  return { overdue, today, upcoming, all: [...overdue, ...today, ...upcoming] }
}

export function daysSince(date: Date): number {
  return Math.floor((Date.now() - date.getTime()) / 86400000)
}
