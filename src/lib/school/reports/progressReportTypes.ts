/** Client-safe types for progress reports (no server imports). */

export type ReportWindow = '7d' | '30d'

export interface ReportRecommendation {
  title: string
  reason: string
  sourceSystem: string
  href: string
}

export interface ProgressReport {
  window: ReportWindow
  windowLabel: string
  generatedAt: string
  /** AI-written (or deterministic) one-paragraph summary. */
  summaryText: string
  /** Section 1: chapters/topics completed in the window. */
  completedItems: string[]
  /** Section 2: strength topics. */
  strengths: string[]
  /** Section 3: weak topics to improve. */
  areasToImprove: string[]
  /** Section 4: study habits. */
  studyHabits: {
    currentStreak: number
    longestStreak: number
    activeDays: number
    assessmentsCompleted: number
    practiceCompleted: number
    mocksCompleted: number
    recentAchievement: { title: string; icon: string } | null
  }
  /** Section 5: single orchestrator recommendation. */
  recommendation: ReportRecommendation | null
}

export const REPORT_WINDOW_META: Record<ReportWindow, { label: string; days: number }> = {
  '7d':  { label: 'Last 7 Days', days: 7 },
  '30d': { label: 'Last 30 Days', days: 30 },
}
