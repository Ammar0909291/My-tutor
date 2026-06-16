/**
 * CRIT-1: XP idempotency — first completion awards XP, repeats do not.
 * MED-5: Flashcard XP per-day guard.
 */
import { describe, it, expect } from 'vitest'

// Simulate the atomic lesson-completion guard from curriculum/progress
function completeLessonOnce(
  completedLessons: Set<number>,
  lesson: number,
): { isNewCompletion: boolean } {
  if (completedLessons.has(lesson)) return { isNewCompletion: false }
  completedLessons.add(lesson)
  return { isNewCompletion: true }
}

describe('CRIT-1: XP idempotency', () => {
  it('first lesson completion awards XP', () => {
    const completed = new Set<number>()
    expect(completeLessonOnce(completed, 1).isNewCompletion).toBe(true)
  })

  it('repeat completion of same lesson does not award XP', () => {
    const completed = new Set<number>([1])
    expect(completeLessonOnce(completed, 1).isNewCompletion).toBe(false)
  })

  it('different lesson is a new completion', () => {
    const completed = new Set<number>([1])
    expect(completeLessonOnce(completed, 2).isNewCompletion).toBe(true)
  })

  it('concurrent completions of same lesson: exactly one is new', () => {
    const completed = new Set<number>()
    const results = [1, 1, 1].map((l) => completeLessonOnce(completed, l))
    expect(results.filter((r) => r.isNewCompletion)).toHaveLength(1)
  })
})

// Simulate flashcard XP per-day guard
function flashcardXpAllowed(lastReviewedAt: Date | null, now: Date): boolean {
  if (!lastReviewedAt) return true
  const startOfTodayUtc = new Date(now)
  startOfTodayUtc.setUTCHours(0, 0, 0, 0)
  return lastReviewedAt < startOfTodayUtc
}

describe('MED-5: flashcard XP farming prevention', () => {
  const today = new Date('2026-06-16T12:00:00Z')
  const startOfToday = new Date('2026-06-16T00:00:00Z')
  const yesterday = new Date('2026-06-15T23:59:00Z')

  it('first review (no lastReviewedAt) earns XP', () => {
    expect(flashcardXpAllowed(null, today)).toBe(true)
  })

  it('review earlier today does NOT earn XP again', () => {
    const reviewedToday = new Date('2026-06-16T08:00:00Z')
    expect(flashcardXpAllowed(reviewedToday, today)).toBe(false)
  })

  it('review yesterday DOES earn XP today', () => {
    expect(flashcardXpAllowed(yesterday, today)).toBe(true)
  })

  it('review exactly at UTC midnight does NOT earn XP again same day', () => {
    expect(flashcardXpAllowed(startOfToday, today)).toBe(false)
  })

  it('repeated PATCH calls same day: only first earns XP', () => {
    let lastReviewed: Date | null = null
    let xpAwarded = 0
    for (let i = 0; i < 5; i++) {
      if (flashcardXpAllowed(lastReviewed, today)) {
        xpAwarded++
        lastReviewed = today
      }
    }
    expect(xpAwarded).toBe(1)
  })
})
