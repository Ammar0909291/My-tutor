/**
 * mistakeRecord.test.ts
 *
 * Contract test against the REAL production functions
 * (src/lib/mistakeRecords.ts, used by src/app/api/practice/submit/route.ts,
 * src/app/api/school/assessment/submit/route.ts, and
 * src/app/api/school/mock/submit/route.ts) rather than hand-copied
 * replicas.
 *
 * Logic:
 *   - practice/submit: one record per index where correct[i] === false,
 *     questionId = "<sessionId>-<index>", category = topicSlug.
 *   - assessment/submit: one record per weak node id, category =
 *     'chapter_assessment', questionId = topicSlug = nodeId.
 *   - mock/submit: one record per weak topic id, category = 'mock_test',
 *     questionId = topicSlug = nodeId.
 */

import { describe, it, expect } from 'vitest'
import { buildPracticeMistakeRecords, buildWeakNodeMistakeRecords } from '@/lib/mistakeRecords'

// ── Practice submit mistake tests ─────────────────────────────────────────────

describe('practice/submit: mistake record creation', () => {
  const USER = 'user-1'
  const SESSION = 'sess-abc'
  const SUBJECT = 'mathematics'
  const TOPIC = 'fractions'

  it('correct[i]=false → creates mistake record for that index', () => {
    const records = buildPracticeMistakeRecords([false], USER, SUBJECT, TOPIC, SESSION)
    expect(records).toHaveLength(1)
    expect(records[0].questionId).toBe(`${SESSION}-0`)
    expect(records[0].category).toBe(TOPIC)
    expect(records[0].userId).toBe(USER)
    expect(records[0].sessionId).toBe(SESSION)
    expect(records[0].subjectSlug).toBe(SUBJECT)
  })

  it('correct[i]=true → no mistake record', () => {
    const records = buildPracticeMistakeRecords([true], USER, SUBJECT, TOPIC, SESSION)
    expect(records).toHaveLength(0)
  })

  it('empty correct array → no mistakes', () => {
    const records = buildPracticeMistakeRecords([], USER, SUBJECT, TOPIC, SESSION)
    expect(records).toHaveLength(0)
  })

  it('all correct → no mistakes', () => {
    const records = buildPracticeMistakeRecords([true, true, true], USER, SUBJECT, TOPIC, SESSION)
    expect(records).toHaveLength(0)
  })

  it('mixed correct/incorrect: only wrong answers create records', () => {
    const records = buildPracticeMistakeRecords([true, false, true, false, true], USER, SUBJECT, TOPIC, SESSION)
    expect(records).toHaveLength(2)
    expect(records[0].questionId).toBe(`${SESSION}-1`)
    expect(records[1].questionId).toBe(`${SESSION}-3`)
  })

  it('all incorrect → one record per question', () => {
    const records = buildPracticeMistakeRecords([false, false, false], USER, SUBJECT, TOPIC, SESSION)
    expect(records).toHaveLength(3)
    expect(records.map((r) => r.questionId)).toEqual([
      `${SESSION}-0`,
      `${SESSION}-1`,
      `${SESSION}-2`,
    ])
  })

  it('questionId format is "<sessionId>-<index>"', () => {
    const records = buildPracticeMistakeRecords([false, true, false], USER, SUBJECT, TOPIC, 's1')
    expect(records[0].questionId).toBe('s1-0')
    expect(records[1].questionId).toBe('s1-2')
  })

  it('category equals topicSlug', () => {
    const records = buildPracticeMistakeRecords([false], USER, SUBJECT, 'algebra', SESSION)
    expect(records[0].category).toBe('algebra')
  })

  it('subjectSlug is propagated correctly', () => {
    const records = buildPracticeMistakeRecords([false], USER, 'physics', TOPIC, SESSION)
    expect(records[0].subjectSlug).toBe('physics')
  })
})

describe('assessment/submit: weak node mistake records', () => {
  it('weak nodes → records with category=chapter_assessment', () => {
    const records = buildWeakNodeMistakeRecords(['node-1', 'node-2'], 'user-1', 'science', 'sess-1', 'chapter_assessment')
    expect(records).toHaveLength(2)
    expect(records[0].category).toBe('chapter_assessment')
    expect(records[0].questionId).toBe('node-1')
    expect(records[0].topicSlug).toBe('node-1')
    expect(records[1].questionId).toBe('node-2')
  })

  it('empty weak nodes → no records', () => {
    const records = buildWeakNodeMistakeRecords([], 'user-1', 'science', 'sess-1', 'chapter_assessment')
    expect(records).toHaveLength(0)
  })
})

describe('mock/submit: weak topic mistake records', () => {
  it('weak topics → records with category=mock_test', () => {
    const records = buildWeakNodeMistakeRecords(['node-a', 'node-b'], 'user-1', 'mathematics', 'sess-1', 'mock_test')
    expect(records).toHaveLength(2)
    expect(records[0].category).toBe('mock_test')
    expect(records[1].category).toBe('mock_test')
  })

  it('empty weak topics → no records', () => {
    const records = buildWeakNodeMistakeRecords([], 'user-1', 'mathematics', 'sess-1', 'mock_test')
    expect(records).toHaveLength(0)
  })
})
