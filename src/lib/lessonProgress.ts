/**
 * Pure completion-percent / completed-flag formula for the lesson-based
 * StudentProgress row, extracted from src/app/api/curriculum/progress/route.ts
 * so it can be unit tested without a DB.
 */

export function computeLessonCompletionPercent(completedCount: number, totalLessons: number): number {
  return Math.min(100, Math.round((completedCount / totalLessons) * 100))
}

export function isLessonSetCompleted(completedCount: number, totalLessons: number): boolean {
  return completedCount >= totalLessons
}
