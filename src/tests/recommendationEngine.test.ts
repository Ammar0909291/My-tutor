/**
 * recommendationEngine.test.ts
 *
 * Contract test against the REAL production functions in
 * src/lib/school/adaptive/weakTopics.ts (recencyMultiplier,
 * getCategoryWeight, computeWeakTopics) rather than hand-copied replicas.
 * recencyMultiplier existed but wasn't exported; getCategoryWeight and the
 * full severity-scoring/ranking pass were inline inside getWeakTopics —
 * both extracted as pure functions over already-fetched DB rows, leaving
 * the two Prisma queries themselves in getWeakTopics.
 *
 * Scoring per weak node:
 *   weight = getCategoryWeight(category)  (chapter_assessment=3, chapter_practice=2, other=1)
 *   recencyMultiplier = <=7 days: 2.0, <=14 days: 1.5, else: 1.0
 *   severity = Σ (weight × recencyMultiplier) per topic (subjectSlug:topicSlug)
 * Mastered topics are excluded regardless of mistakes.
 * Topics sorted by severity descending, max 10 returned (default).
 */

import { describe, it, expect } from 'vitest'
import { recencyMultiplier, getCategoryWeight, computeWeakTopics, type MistakeInput } from '@/lib/school/adaptive/weakTopics'

const NOW = Date.now()
function daysAgo(days: number): Date {
  return new Date(NOW - days * 86400000)
}

describe('category weights', () => {
  it('chapter_assessment weight is 3', () => {
    expect(getCategoryWeight('chapter_assessment')).toBe(3)
  })

  it('chapter_practice weight is 2', () => {
    expect(getCategoryWeight('chapter_practice')).toBe(2)
  })

  it('unknown category defaults to 1', () => {
    expect(getCategoryWeight('mock_test')).toBe(1)
    expect(getCategoryWeight('other')).toBe(1)
  })
})

describe('recency multiplier', () => {
  it('age <= 7 days → multiplier 2.0', () => {
    expect(recencyMultiplier(daysAgo(0), NOW)).toBe(2.0)
    expect(recencyMultiplier(daysAgo(7), NOW)).toBe(2.0)
  })

  it('age <= 14 days → multiplier 1.5', () => {
    expect(recencyMultiplier(daysAgo(8), NOW)).toBe(1.5)
    expect(recencyMultiplier(daysAgo(14), NOW)).toBe(1.5)
  })

  it('age > 14 days → multiplier 1.0', () => {
    expect(recencyMultiplier(daysAgo(15), NOW)).toBe(1.0)
    expect(recencyMultiplier(daysAgo(30), NOW)).toBe(1.0)
  })
})

describe('severity computation (computeWeakTopics aggregation)', () => {
  it('single recent assessment mistake: severity = 3 * 2 = 6', () => {
    const mistakes: MistakeInput[] = [
      { subjectSlug: 'math', topicSlug: 'algebra', category: 'chapter_assessment', createdAt: daysAgo(3) },
    ]
    const result = computeWeakTopics(mistakes, new Set(), NOW)
    expect(result[0].severity).toBe(6)
  })

  it('single old practice mistake: severity = 2 * 1 = 2', () => {
    const mistakes: MistakeInput[] = [
      { subjectSlug: 'math', topicSlug: 'algebra', category: 'chapter_practice', createdAt: daysAgo(20) },
    ]
    const result = computeWeakTopics(mistakes, new Set(), NOW)
    expect(result[0].severity).toBe(2)
  })

  it('multiple mistakes on the same topic accumulate severity', () => {
    const mistakes: MistakeInput[] = [
      { subjectSlug: 'math', topicSlug: 'algebra', category: 'chapter_assessment', createdAt: daysAgo(3) },  // 3*2 = 6
      { subjectSlug: 'math', topicSlug: 'algebra', category: 'chapter_practice', createdAt: daysAgo(10) },   // 2*1.5 = 3
    ]
    const result = computeWeakTopics(mistakes, new Set(), NOW)
    expect(result).toHaveLength(1)
    expect(result[0].severity).toBe(9)
  })
})

describe('weak topic building', () => {
  it('mastered topics excluded from weak list', () => {
    const mistakes: MistakeInput[] = [
      { subjectSlug: 'math', topicSlug: 'algebra', category: 'chapter_assessment', createdAt: daysAgo(3) },
    ]
    const mastered = new Set(['math:algebra'])
    const result = computeWeakTopics(mistakes, mastered, NOW)
    expect(result).toHaveLength(0)
  })

  it('non-mastered topics appear in weak list', () => {
    const mistakes: MistakeInput[] = [
      { subjectSlug: 'math', topicSlug: 'fractions', category: 'chapter_assessment', createdAt: daysAgo(3) },
    ]
    const result = computeWeakTopics(mistakes, new Set(), NOW)
    expect(result).toHaveLength(1)
  })

  it('weak topics sorted by severity descending', () => {
    const mistakes: MistakeInput[] = [
      { subjectSlug: 'math', topicSlug: 'easy', category: 'chapter_practice', createdAt: daysAgo(25) },   // 2*1 = 2
      { subjectSlug: 'math', topicSlug: 'hard', category: 'chapter_assessment', createdAt: daysAgo(3) },  // 3*2 = 6
    ]
    const result = computeWeakTopics(mistakes, new Set(), NOW)
    expect(result[0].severity).toBeGreaterThan(result[1].severity)
    expect(result[0].nodeId).toBe('hard')
  })

  it('max 10 weak topics returned by default', () => {
    const mistakes: MistakeInput[] = Array.from({ length: 15 }, (_, i) => ({
      subjectSlug: 'math',
      topicSlug: `topic-${i}`,
      category: 'chapter_practice',
      createdAt: daysAgo(i + 1),
    }))
    const result = computeWeakTopics(mistakes, new Set(), NOW)
    expect(result.length).toBeLessThanOrEqual(10)
  })

  it('no mistakes → empty weak topics', () => {
    const result = computeWeakTopics([], new Set(), NOW)
    expect(result).toHaveLength(0)
  })

  it('same topic multiple mistakes: severity accumulated', () => {
    const mistakes: MistakeInput[] = [
      { subjectSlug: 'math', topicSlug: 'algebra', category: 'chapter_practice', createdAt: daysAgo(3) },  // 2*2=4
      { subjectSlug: 'math', topicSlug: 'algebra', category: 'chapter_practice', createdAt: daysAgo(3) },  // 2*2=4
    ]
    const result = computeWeakTopics(mistakes, new Set(), NOW)
    expect(result[0].severity).toBe(8) // 4 + 4
  })
})
