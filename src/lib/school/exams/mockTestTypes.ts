/** Client-safe types and constants for mock tests (no server imports). */

export type MockTestType = 'quick' | 'standard' | 'full'

export const MOCK_TEST_CONFIG: Record<MockTestType, { questionCount: number; estimatedMinutes: number; label: string }> = {
  quick:    { questionCount: 10, estimatedMinutes: 10, label: 'Quick Mock (10 Q)' },
  standard: { questionCount: 25, estimatedMinutes: 25, label: 'Standard Mock (25 Q)' },
  full:     { questionCount: 50, estimatedMinutes: 55, label: 'Full Mock (50 Q)' },
}

export interface MockTestResult {
  sessionId: string
  score: number
  totalQuestions: number
  correctCount: number
  timeTakenSeconds: number
  strongTopicIds: string[]
  weakTopicIds: string[]
  strongTopicTitles: string[]
  weakTopicTitles: string[]
  chapterBreakdown: { chapterId: string; chapterTitle: string; correct: number; total: number }[]
  review: import('@/lib/school/practice/practiceTypes').QuestionReview[]
  updatedReadinessPercent?: number
}
