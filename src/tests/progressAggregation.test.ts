/**
 * progressAggregation.test.ts
 *
 * Tests for curriculum progress aggregation logic.
 *
 * Lesson-based half tests the REAL production formula
 * (computeLessonCompletionPercent / isLessonSetCompleted from
 * src/lib/lessonProgress.ts, used by curriculum/progress/route.ts). A prior
 * replica of this formula independently re-derived isCompleted from the
 * *rounded* percentage (percent >= 100), which diverges from production for
 * counts like 199/200: percent rounds to 100 while the real route's raw-count
 * comparison (199 >= 200) is still false. See the regression test below.
 *
 * KG-based half (below) remains a hand-written model — not backed by a single
 * canonical production function — and is unchanged.
 */

import { describe, it, expect } from 'vitest'
import { computeLessonCompletionPercent, isLessonSetCompleted } from '@/lib/lessonProgress'

// ── Pure progress computation helpers (KG-based section only) ────────────────

function computeCompletionPercent(completedCount: number, totalLessons: number): number {
  if (totalLessons === 0) return 0
  return Math.round((completedCount / totalLessons) * 100)
}

function isCompleted(completionPercent: number): boolean {
  return completionPercent >= 100
}

type TopicStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'MASTERED' | 'SKIPPED' | 'REVISION'

interface TopicProgress {
  topicSlug: string
  status: TopicStatus
  masteryPct: number
}

/** Counts topics considered "done" for KG progress (MASTERED or COMPLETED). */
function countCompletedTopics(topics: TopicProgress[]): number {
  return topics.filter((t) => t.status === 'MASTERED' || t.status === 'COMPLETED').length
}

/** Computes KG curriculum completion percent. */
function computeKGCompletionPercent(topics: TopicProgress[], totalTopics: number): number {
  const completed = countCompletedTopics(topics)
  return computeCompletionPercent(completed, totalTopics)
}

// ── Lesson-based curriculum progress ─────────────────────────────────────────

describe('lesson-based completionPercent', () => {
  it('0 of 10 completed → 0%', () => {
    expect(computeLessonCompletionPercent(0, 10)).toBe(0)
  })

  it('5 of 10 completed → 50%', () => {
    expect(computeLessonCompletionPercent(5, 10)).toBe(50)
  })

  it('10 of 10 completed → 100%', () => {
    expect(computeLessonCompletionPercent(10, 10)).toBe(100)
  })

  it('1 of 3 completed → 33% (rounded)', () => {
    expect(computeLessonCompletionPercent(1, 3)).toBe(33)
  })

  it('2 of 3 completed → 67% (rounded)', () => {
    expect(computeLessonCompletionPercent(2, 3)).toBe(67)
  })

  it('completionPercent is capped at 100 even if completedCount > totalLessons', () => {
    expect(computeLessonCompletionPercent(12, 10)).toBe(100)
  })

  it('isLessonSetCompleted true when completedCount >= totalLessons', () => {
    expect(isLessonSetCompleted(10, 10)).toBe(true)
  })

  it('isLessonSetCompleted false when completedCount < totalLessons', () => {
    expect(isLessonSetCompleted(9, 10)).toBe(false)
  })

  it('result is always an integer', () => {
    for (const [done, total] of [[1, 7], [3, 8], [5, 9], [7, 12]]) {
      expect(Number.isInteger(computeLessonCompletionPercent(done, total))).toBe(true)
    }
  })

  it('regression: 199 of 200 rounds completionPercent to 100, but isLessonSetCompleted stays false (compares raw counts, not the rounded percent)', () => {
    expect(computeLessonCompletionPercent(199, 200)).toBe(100)
    expect(isLessonSetCompleted(199, 200)).toBe(false)
  })
})

// ── KG topic progress aggregation ─────────────────────────────────────────────

describe('KG topic completion aggregation', () => {
  it('MASTERED topics count as complete', () => {
    const topics: TopicProgress[] = [
      { topicSlug: 'a', status: 'MASTERED', masteryPct: 100 },
      { topicSlug: 'b', status: 'IN_PROGRESS', masteryPct: 60 },
    ]
    expect(countCompletedTopics(topics)).toBe(1)
  })

  it('COMPLETED topics count as complete', () => {
    const topics: TopicProgress[] = [
      { topicSlug: 'a', status: 'COMPLETED', masteryPct: 70 },
    ]
    expect(countCompletedTopics(topics)).toBe(1)
  })

  it('IN_PROGRESS does not count as complete', () => {
    const topics: TopicProgress[] = [
      { topicSlug: 'a', status: 'IN_PROGRESS', masteryPct: 60 },
    ]
    expect(countCompletedTopics(topics)).toBe(0)
  })

  it('NOT_STARTED does not count as complete', () => {
    const topics: TopicProgress[] = [
      { topicSlug: 'a', status: 'NOT_STARTED', masteryPct: 0 },
    ]
    expect(countCompletedTopics(topics)).toBe(0)
  })

  it('SKIPPED does not count as complete', () => {
    const topics: TopicProgress[] = [
      { topicSlug: 'a', status: 'SKIPPED', masteryPct: 0 },
    ]
    expect(countCompletedTopics(topics)).toBe(0)
  })

  it('multiple topics: correct count of completed', () => {
    const topics: TopicProgress[] = [
      { topicSlug: 'a', status: 'MASTERED', masteryPct: 100 },
      { topicSlug: 'b', status: 'COMPLETED', masteryPct: 75 },
      { topicSlug: 'c', status: 'IN_PROGRESS', masteryPct: 40 },
      { topicSlug: 'd', status: 'NOT_STARTED', masteryPct: 0 },
      { topicSlug: 'e', status: 'MASTERED', masteryPct: 90 },
    ]
    expect(countCompletedTopics(topics)).toBe(3)
  })

  it('KG completion percent: 3 of 5 topics done → 60%', () => {
    const topics: TopicProgress[] = [
      { topicSlug: 'a', status: 'MASTERED', masteryPct: 100 },
      { topicSlug: 'b', status: 'COMPLETED', masteryPct: 70 },
      { topicSlug: 'c', status: 'MASTERED', masteryPct: 90 },
      { topicSlug: 'd', status: 'IN_PROGRESS', masteryPct: 40 },
      { topicSlug: 'e', status: 'NOT_STARTED', masteryPct: 0 },
    ]
    expect(computeKGCompletionPercent(topics, 5)).toBe(60)
  })

  it('all topics MASTERED → 100% complete', () => {
    const topics: TopicProgress[] = [
      { topicSlug: 'a', status: 'MASTERED', masteryPct: 100 },
      { topicSlug: 'b', status: 'MASTERED', masteryPct: 90 },
    ]
    expect(computeKGCompletionPercent(topics, 2)).toBe(100)
    expect(isCompleted(computeKGCompletionPercent(topics, 2))).toBe(true)
  })

  it('no topics → 0% complete', () => {
    expect(computeKGCompletionPercent([], 10)).toBe(0)
  })
})

describe('completedLessons dedup logic', () => {
  it('completing the same lesson twice should not double-count', () => {
    // Mirrors atomic SQL dedup: only unique lesson numbers count
    const completedLessons = [1, 2, 3, 2, 1] // with duplicates
    const uniqueCompleted = [...new Set(completedLessons)]
    expect(computeLessonCompletionPercent(uniqueCompleted.length, 10)).toBe(30)
  })

  it('array with all unique lessons counts correctly', () => {
    const completedLessons = [1, 2, 3, 4, 5]
    const unique = [...new Set(completedLessons)]
    expect(computeLessonCompletionPercent(unique.length, 10)).toBe(50)
  })
})
