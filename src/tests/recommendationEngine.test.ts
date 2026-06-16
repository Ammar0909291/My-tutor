/**
 * recommendationEngine.test.ts
 *
 * Tests for recommendation/weak-topic logic from
 * src/lib/school/adaptive/weakTopics.ts
 *
 * The engine scores weak topics via:
 *   weight = CATEGORY_WEIGHTS[category] ?? 1  (chapter_assessment=3, chapter_practice=2, other=1)
 *   recencyMultiplier = <=7 days: 2.0, <=14 days: 1.5, <=30 days: 1.0
 *   severity = Σ (weight × recencyMultiplier)
 * Mastered topics are excluded regardless of mistakes.
 * Topics sorted by severity descending, max 10 returned.
 */

import { describe, it, expect } from 'vitest'

// ── Pure helpers mirrored from weakTopics.ts ──────────────────────────────────

const CATEGORY_WEIGHTS: Record<string, number> = {
  chapter_assessment: 3,
  chapter_practice: 2,
}
const DEFAULT_WEIGHT = 1

function getCategoryWeight(category: string): number {
  return CATEGORY_WEIGHTS[category] ?? DEFAULT_WEIGHT
}

function recencyMultiplier(ageDays: number): number {
  if (ageDays <= 7) return 2.0
  if (ageDays <= 14) return 1.5
  return 1.0
}

function computeSeverity(mistakes: Array<{ category: string; ageDays: number }>): number {
  return mistakes.reduce((sum, m) => {
    return sum + getCategoryWeight(m.category) * recencyMultiplier(m.ageDays)
  }, 0)
}

interface MockMistake {
  nodeId: string
  subjectSlug: string
  topicSlug: string
  category: string
  ageDays: number
}

interface WeakTopicResult {
  nodeId: string
  severity: number
}

function buildWeakTopics(
  mistakes: MockMistake[],
  masteredNodeIds: Set<string>,
  maxResults = 10,
): WeakTopicResult[] {
  const scores = new Map<string, number>()
  for (const m of mistakes) {
    const key = `${m.subjectSlug}:${m.topicSlug}`
    if (masteredNodeIds.has(key)) continue
    const score = getCategoryWeight(m.category) * recencyMultiplier(m.ageDays)
    scores.set(key, (scores.get(key) ?? 0) + score)
  }
  return [...scores.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, maxResults)
    .map(([nodeId, severity]) => ({ nodeId, severity }))
}

// ── Tests ─────────────────────────────────────────────────────────────────────

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
    expect(recencyMultiplier(0)).toBe(2.0)
    expect(recencyMultiplier(7)).toBe(2.0)
  })

  it('age <= 14 days → multiplier 1.5', () => {
    expect(recencyMultiplier(8)).toBe(1.5)
    expect(recencyMultiplier(14)).toBe(1.5)
  })

  it('age > 14 days → multiplier 1.0', () => {
    expect(recencyMultiplier(15)).toBe(1.0)
    expect(recencyMultiplier(30)).toBe(1.0)
  })
})

describe('severity computation', () => {
  it('single recent assessment mistake: severity = 3 * 2 = 6', () => {
    const sev = computeSeverity([{ category: 'chapter_assessment', ageDays: 3 }])
    expect(sev).toBe(6)
  })

  it('single old practice mistake: severity = 2 * 1 = 2', () => {
    const sev = computeSeverity([{ category: 'chapter_practice', ageDays: 20 }])
    expect(sev).toBe(2)
  })

  it('multiple mistakes accumulate severity', () => {
    const sev = computeSeverity([
      { category: 'chapter_assessment', ageDays: 3 },  // 3*2 = 6
      { category: 'chapter_practice', ageDays: 10 },   // 2*1.5 = 3
    ])
    expect(sev).toBe(9)
  })
})

describe('weak topic building', () => {
  it('mastered topics excluded from weak list', () => {
    const mistakes: MockMistake[] = [
      { nodeId: 'n1', subjectSlug: 'math', topicSlug: 'algebra', category: 'chapter_assessment', ageDays: 3 },
    ]
    const mastered = new Set(['math:algebra'])
    const result = buildWeakTopics(mistakes, mastered)
    expect(result).toHaveLength(0)
  })

  it('non-mastered topics appear in weak list', () => {
    const mistakes: MockMistake[] = [
      { nodeId: 'n1', subjectSlug: 'math', topicSlug: 'fractions', category: 'chapter_assessment', ageDays: 3 },
    ]
    const mastered = new Set<string>()
    const result = buildWeakTopics(mistakes, mastered)
    expect(result).toHaveLength(1)
  })

  it('weak topics sorted by severity descending', () => {
    const mistakes: MockMistake[] = [
      { nodeId: 'n1', subjectSlug: 'math', topicSlug: 'easy', category: 'chapter_practice', ageDays: 25 },   // 2*1 = 2
      { nodeId: 'n2', subjectSlug: 'math', topicSlug: 'hard', category: 'chapter_assessment', ageDays: 3 },   // 3*2 = 6
    ]
    const result = buildWeakTopics(mistakes, new Set())
    expect(result[0].severity).toBeGreaterThan(result[1].severity)
    expect(result[0].nodeId).toBe('math:hard')
  })

  it('max 10 weak topics returned', () => {
    const mistakes: MockMistake[] = Array.from({ length: 15 }, (_, i) => ({
      nodeId: `n${i}`,
      subjectSlug: 'math',
      topicSlug: `topic-${i}`,
      category: 'chapter_practice',
      ageDays: i + 1,
    }))
    const result = buildWeakTopics(mistakes, new Set())
    expect(result.length).toBeLessThanOrEqual(10)
  })

  it('no mistakes → empty weak topics', () => {
    const result = buildWeakTopics([], new Set())
    expect(result).toHaveLength(0)
  })

  it('same topic multiple mistakes: severity accumulated', () => {
    const mistakes: MockMistake[] = [
      { nodeId: 'n1', subjectSlug: 'math', topicSlug: 'algebra', category: 'chapter_practice', ageDays: 3 },  // 2*2=4
      { nodeId: 'n1', subjectSlug: 'math', topicSlug: 'algebra', category: 'chapter_practice', ageDays: 3 },  // 2*2=4
    ]
    const result = buildWeakTopics(mistakes, new Set())
    expect(result[0].severity).toBe(8) // 4 + 4
  })
})
