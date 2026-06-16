/**
 * mistakeRecord.test.ts
 *
 * Tests for mistake record determination logic from
 * src/app/api/practice/submit/route.ts
 *
 * Logic:
 *   - For each i where correct[i] === false, create a MistakeRecord
 *     with questionId = "<sessionId>-<index>"
 *   - correct[i] === true → no MistakeRecord for that question
 *   - Category for practice/submit is the topicSlug
 *   - Assessment mistakes use category='chapter_assessment' with questionId=nodeId
 *   - Mock mistakes use category='mock_test' with questionId=nodeId
 */

import { describe, it, expect } from 'vitest'

// ── Pure mistake-detection logic mirrored from the route ──────────────────────

interface MistakeEntry {
  sessionId: string
  questionId: string
  category: string
  subjectSlug: string
  topicSlug: string
}

/** Mirrors practice/submit route: creates mistake entries for wrong answers. */
function buildMistakeEntries(
  sessionId: string,
  correct: boolean[],
  subjectSlug: string,
  topicSlug: string,
): MistakeEntry[] {
  const entries: MistakeEntry[] = []
  for (let i = 0; i < correct.length; i++) {
    if (!correct[i]) {
      entries.push({
        sessionId,
        questionId: `${sessionId}-${i}`,
        category: topicSlug,
        subjectSlug,
        topicSlug,
      })
    }
  }
  return entries
}

/** Mirrors assessment/submit: weak nodeIds → MistakeRecord with category='chapter_assessment'. */
function buildAssessmentMistakes(
  sessionId: string,
  weakNodeIds: string[],
  subjectSlug: string,
): Array<{ questionId: string; category: string; subjectSlug: string }> {
  return weakNodeIds.map((nodeId) => ({
    questionId: nodeId,
    category: 'chapter_assessment',
    subjectSlug,
  }))
}

/** Mirrors mock/submit: weakTopicIds → MistakeRecord with category='mock_test'. */
function buildMockMistakes(
  weakTopicIds: string[],
  subjectSlug: string,
): Array<{ questionId: string; category: string; subjectSlug: string }> {
  return weakTopicIds.map((nodeId) => ({
    questionId: nodeId,
    category: 'mock_test',
    subjectSlug,
  }))
}

// ── Practice submit mistake tests ─────────────────────────────────────────────

describe('practice/submit: mistake record creation', () => {
  const SESSION = 'sess-abc'
  const SUBJECT = 'mathematics'
  const TOPIC = 'fractions'

  it('correct[i]=false → creates mistake record for that index', () => {
    const entries = buildMistakeEntries(SESSION, [false], SUBJECT, TOPIC)
    expect(entries).toHaveLength(1)
    expect(entries[0].questionId).toBe(`${SESSION}-0`)
    expect(entries[0].category).toBe(TOPIC)
  })

  it('correct[i]=true → no mistake record', () => {
    const entries = buildMistakeEntries(SESSION, [true], SUBJECT, TOPIC)
    expect(entries).toHaveLength(0)
  })

  it('empty correct array → no mistakes', () => {
    const entries = buildMistakeEntries(SESSION, [], SUBJECT, TOPIC)
    expect(entries).toHaveLength(0)
  })

  it('all correct → no mistakes', () => {
    const entries = buildMistakeEntries(SESSION, [true, true, true], SUBJECT, TOPIC)
    expect(entries).toHaveLength(0)
  })

  it('mixed correct/incorrect: only wrong answers create records', () => {
    const entries = buildMistakeEntries(SESSION, [true, false, true, false, true], SUBJECT, TOPIC)
    expect(entries).toHaveLength(2)
    expect(entries[0].questionId).toBe(`${SESSION}-1`)
    expect(entries[1].questionId).toBe(`${SESSION}-3`)
  })

  it('all incorrect → one record per question', () => {
    const entries = buildMistakeEntries(SESSION, [false, false, false], SUBJECT, TOPIC)
    expect(entries).toHaveLength(3)
    expect(entries.map((e) => e.questionId)).toEqual([
      `${SESSION}-0`,
      `${SESSION}-1`,
      `${SESSION}-2`,
    ])
  })

  it('questionId format is "<sessionId>-<index>"', () => {
    const entries = buildMistakeEntries('s1', [false, true, false], SUBJECT, TOPIC)
    expect(entries[0].questionId).toBe('s1-0')
    expect(entries[1].questionId).toBe('s1-2')
  })

  it('category equals topicSlug', () => {
    const entries = buildMistakeEntries(SESSION, [false], SUBJECT, 'algebra')
    expect(entries[0].category).toBe('algebra')
  })

  it('subjectSlug is propagated correctly', () => {
    const entries = buildMistakeEntries(SESSION, [false], 'physics', TOPIC)
    expect(entries[0].subjectSlug).toBe('physics')
  })
})

describe('assessment/submit: weak node mistake records', () => {
  it('weak nodes → records with category=chapter_assessment', () => {
    const records = buildAssessmentMistakes('sess-1', ['node-1', 'node-2'], 'science')
    expect(records).toHaveLength(2)
    expect(records[0].category).toBe('chapter_assessment')
    expect(records[0].questionId).toBe('node-1')
    expect(records[1].questionId).toBe('node-2')
  })

  it('empty weak nodes → no records', () => {
    const records = buildAssessmentMistakes('sess-1', [], 'science')
    expect(records).toHaveLength(0)
  })
})

describe('mock/submit: weak topic mistake records', () => {
  it('weak topics → records with category=mock_test', () => {
    const records = buildMockMistakes(['node-a', 'node-b'], 'mathematics')
    expect(records).toHaveLength(2)
    expect(records[0].category).toBe('mock_test')
    expect(records[1].category).toBe('mock_test')
  })

  it('empty weak topics → no records', () => {
    const records = buildMockMistakes([], 'mathematics')
    expect(records).toHaveLength(0)
  })
})
