/**
 * Client-safe types for the Learning Navigator (Sprint CQ).
 *
 * Extracted from learningNavigator.ts so that client components (quiz
 * results screens) can import the type and colour constant without pulling
 * in server-only modules (prisma, orchestrator, daily-plan).
 */

export type NavigatorUrgency = 'high' | 'medium' | 'low'

export type NavigatorSource =
  | 'assessment'
  | 'prerequisite'
  | 'revision'
  | 'weak_topic'
  | 'exam_readiness'
  | 'mock_test'
  | 'chapter'
  | 'daily_plan'

export interface LearningNavigatorAction {
  type: string
  title: string
  description: string
  reason: string
  urgency: NavigatorUrgency
  estimatedMinutes: number
  expectedOutcome: string
  href: string
  source: NavigatorSource
  /** Sprint CO.1: populated when the action targets a specific chapter */
  subjectSlug?: string
  chapterId?: string
}

/** Urgency → colour for "🎯 Recommended Next Action" cards. */
export const NAVIGATOR_URGENCY_COLORS: Record<NavigatorUrgency, string> = {
  high:   'var(--coral)',
  medium: 'var(--yellow)',
  low:    'var(--text-dim)',
}
