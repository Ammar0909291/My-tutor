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

export function getDueReviews(_profileId: string): Promise<DueReviewsResult> {
  return Promise.resolve({ overdue: [], today: [], upcoming: [], all: [] })
}

export function daysSince(date: Date): number {
  return Math.floor((Date.now() - date.getTime()) / 86400000)
}
