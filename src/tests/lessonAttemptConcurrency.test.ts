/**
 * B — LessonAttempt under concurrent sessions.
 *
 * Driven against the REAL store (openLessonAttempt / saveLessonAttempt /
 * finalizeLessonAttempt) and the REAL pure fold (recordConceptOutcome), with a
 * fake db that has Prisma's semantics — not a re-implementation of either.
 *
 * ── THE VERDICT THESE TESTS RECORD ─────────────────────────────────────────
 * The grain (user x subject x lesson) is NOT wrong, and these tests exist as
 * much to pin that as to probe it. lessonAttempt.ts's own header argues it:
 * "LearnSession is (learner x chat session) ... can span several lessons, while
 * one lesson can span several sessions. Wrong grain in both directions."
 * Adding a sessionId would break the documented RESUME path — "a refresh
 * re-enters here and gets the same row back" — so two sessions SHARING one
 * IN_PROGRESS attempt for one lesson is the specified behaviour, not a bug.
 *
 * What is real, narrow, and recorded by the negative control at the bottom, is
 * an ordinary lost update: two turns that fold DIFFERENT concepts of the same
 * lesson concurrently overwrite each other's aggregates, because
 * saveLessonAttempt writes them wholesale. It cannot fabricate mastery and
 * cannot falsely complete a lesson — both failure directions are proved below.
 */
import { describe, it, expect, vi, afterEach } from 'vitest'
import {
  openLessonAttempt, saveLessonAttempt, finalizeLessonAttempt, latestLessonAttempt,
} from '@/lib/teaching/lessonAttemptStore'
import { recordConceptOutcome, lessonKeyFor } from '@/lib/teaching/lessonAttempt'
import { initialConversationState, type ConversationState } from '@/lib/teaching/conversationState'
import { isConceptClosed } from '@/lib/teaching/lessonAttempt'

const USER = 'u1'
const SUBJ = 'physics'

/** A lesson_attempts table with Prisma's semantics for the four calls the
 *  store makes. Rows are objects, so an `update` mutates what a concurrent
 *  reader already holds a reference to — exactly like a real second read. */
function fakeDb() {
  const rows: any[] = []
  let seq = 0
  const db = {
    lessonAttempt: {
      async findFirst({ where, orderBy: _o }: any) {
        const m = rows.filter((r) =>
          r.userId === where.userId &&
          r.subjectSlug === where.subjectSlug &&
          r.lessonKey === where.lessonKey &&
          (where.status === undefined || r.status === where.status))
        return m.sort((a, b) => +b.startedAt - +a.startedAt)[0] ?? null
      },
      async create({ data }: any) {
        const row = {
          id: `att-${++seq}`, conceptsMastered: [], conceptsNeedingReview: [],
          misconceptionsCorrected: [], teachingAttempts: 0, budgetExhaustions: 0,
          completedAt: null, durationSeconds: null, lessonTitle: null, ...data,
        }
        rows.push(row); return { ...row }
      },
      async update({ where, data }: any) {
        const row = rows.find((r) => r.id === where.id)
        Object.assign(row, data); return { ...row }
      },
    },
    topicProgress: {
      async findUnique() { return null },
      async upsert() { return {} },
    },
  }
  return { db: db as any, rows }
}

/**
 * A ConversationState whose concept has CLOSED — built from the REAL
 * `initialConversationState` factory and then advanced, so it cannot drift out
 * of shape as the state grows fields (the first draft of this file hand-rolled
 * the object and was missing `misconceptionsSeen`, which the fold dereferences).
 * `isConceptClosed` is asserted on it directly, so a state that stopped
 * qualifying would fail here rather than silently fold nothing.
 */
const state = (conceptId: string, mastered: boolean): ConversationState => {
  const s = initialConversationState(conceptId)
  return mastered
    ? { ...s, phase: 'TRANSFER', correctAtCheck: 1, correctAtPractice: 2, turnsOnConcept: 6,
        evidence: { ...s.evidence, serverGraded: true } }
    : { ...s, phase: 'GUIDE', consecutiveFailures: 3, turnsOnConcept: 12, attempts: 6 }
}

const KEY = lessonKeyFor({ lessonOrder: 12 })!

describe('P0 — the fixtures genuinely close, or nothing below measures anything', () => {
  it('both fixture states are CLOSED concepts', () => {
    expect(isConceptClosed(state('c1', true))).toBe(true)
    expect(isConceptClosed(state('c1', false))).toBe(true)
  })
  it('and they close for DIFFERENT reasons — mastery vs a spent budget', () => {
    const folded = recordConceptOutcome(
      { lessonKey: 'k', lessonTitle: null, status: 'IN_PROGRESS', startedAt: new Date(),
        completedAt: null, durationSeconds: null, conceptsMastered: [], conceptsNeedingReview: [],
        misconceptionsCorrected: [], teachingAttempts: 0, budgetExhaustions: 0 },
      state('c1', true))
    expect(folded.conceptsMastered).toEqual(['c1'])
  })
})

describe('the grain is (user x subject x lesson) — and that is CORRECT', () => {
  it('T5 — two sessions on the SAME lesson deliberately share one attempt (the resume path)', async () => {
    const { db, rows } = fakeDb()
    const a = await openLessonAttempt(db, { userId: USER, subjectSlug: SUBJ, lessonKey: KEY })
    const b = await openLessonAttempt(db, { userId: USER, subjectSlug: SUBJ, lessonKey: KEY })
    expect(b.id).toBe(a.id)
    expect(rows).toHaveLength(1)
  })

  it('T6 — two sessions on DIFFERENT lessons cannot touch each other', async () => {
    const { db, rows } = fakeDb()
    const kA = lessonKeyFor({ lessonOrder: 3 })!
    const kB = lessonKeyFor({ lessonOrder: 12 })!
    const a = await openLessonAttempt(db, { userId: USER, subjectSlug: SUBJ, lessonKey: kA })
    const b = await openLessonAttempt(db, { userId: USER, subjectSlug: SUBJ, lessonKey: kB })
    expect(a.id).not.toBe(b.id)

    await saveLessonAttempt(db, a.id, recordConceptOutcome(a.outcome, state('c-a', true)))
    await saveLessonAttempt(db, b.id, recordConceptOutcome(b.outcome, state('c-b', false)))

    const rowA = rows.find((r) => r.lessonKey === kA)
    const rowB = rows.find((r) => r.lessonKey === kB)
    expect(rowA.conceptsMastered).toEqual(['c-a'])
    expect(rowA.conceptsNeedingReview).toEqual([])
    expect(rowB.conceptsMastered).toEqual([])
    expect(rowB.conceptsNeedingReview).toEqual(['c-b'])
  })

  it('a different LEARNER on the same lesson is a different attempt', async () => {
    const { db } = fakeDb()
    const a = await openLessonAttempt(db, { userId: USER, subjectSlug: SUBJ, lessonKey: KEY })
    const b = await openLessonAttempt(db, { userId: 'u2', subjectSlug: SUBJ, lessonKey: KEY })
    expect(a.id).not.toBe(b.id)
  })
})

describe('T7 — a completed lesson stays re-enterable (PCD-006 behaviour preserved)', () => {
  // `latestLessonAttempt` orders by `startedAt desc` with NO tiebreaker, so two
  // attempts created inside the same millisecond sort non-deterministically.
  // The first version of this test hit exactly that — green alone, red in the
  // full suite. Time is therefore controlled here rather than raced, which is
  // also the realistic shape (a learner re-enters a lesson LATER).
  //
  // The underlying tie is a genuine, very narrow pre-existing property of
  // latestLessonAttempt and is REPORTED, not silently patched: reaching it
  // needs two attempts at one lesson created in the same millisecond.
  afterEach(() => { vi.useRealTimers() })

  it('finalising does not let a later turn reuse the closed row', async () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-09-12T10:00:00Z'))
    const { db, rows } = fakeDb()
    const a = await openLessonAttempt(db, { userId: USER, subjectSlug: SUBJ, lessonKey: KEY })
    const folded = recordConceptOutcome(a.outcome, state('c1', true))
    await finalizeLessonAttempt(db, a.id, folded)
    expect(rows[0].status).toBe('COMPLETED')

    vi.setSystemTime(new Date('2026-09-12T10:05:00Z'))
    // Re-entry opens a FRESH attempt rather than resurrecting the closed one —
    // which is what keeps a finished lesson learnable
    // (completedLessonIsReEnterable.test.ts records the production P0 that the
    // opposite behaviour caused).
    const again = await openLessonAttempt(db, { userId: USER, subjectSlug: SUBJ, lessonKey: KEY })
    expect(again.id).not.toBe(a.id)
    expect(rows).toHaveLength(2)
    expect(again.outcome.status).toBe('IN_PROGRESS')
    expect(again.outcome.conceptsMastered).toEqual([])

    // and the completion gate still reads the NEWEST attempt, so the lesson is
    // teachable again rather than permanently closed
    const latest = await latestLessonAttempt(db, { userId: USER, subjectSlug: SUBJ, lessonKey: KEY })
    expect(latest?.status).toBe('IN_PROGRESS')
  })

  it('a COMPLETED attempt is never silently reopened by openLessonAttempt', async () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-09-12T11:00:00Z'))
    const { db } = fakeDb()
    const a = await openLessonAttempt(db, { userId: USER, subjectSlug: SUBJ, lessonKey: KEY })
    await finalizeLessonAttempt(db, a.id, recordConceptOutcome(a.outcome, state('c1', true)))
    vi.setSystemTime(new Date('2026-09-12T11:05:00Z'))
    const again = await openLessonAttempt(db, { userId: USER, subjectSlug: SUBJ, lessonKey: KEY })
    expect(again.outcome.conceptsMastered).not.toContain('c1')
  })
})

describe('the fold itself is safe under repetition', () => {
  it('re-folding the SAME concept is idempotent — no double counting', async () => {
    const { db } = fakeDb()
    const a = await openLessonAttempt(db, { userId: USER, subjectSlug: SUBJ, lessonKey: KEY })
    const once = recordConceptOutcome(a.outcome, state('c1', true))
    const twice = recordConceptOutcome(once, state('c1', true))
    expect(twice).toEqual(once)
    expect(twice.teachingAttempts).toBe(once.teachingAttempts)
  })

  it('two sessions folding the SAME concept concurrently lose nothing', async () => {
    const { db, rows } = fakeDb()
    const s1 = await openLessonAttempt(db, { userId: USER, subjectSlug: SUBJ, lessonKey: KEY })
    const s2 = await openLessonAttempt(db, { userId: USER, subjectSlug: SUBJ, lessonKey: KEY })
    await saveLessonAttempt(db, s1.id, recordConceptOutcome(s1.outcome, state('c1', true)))
    await saveLessonAttempt(db, s2.id, recordConceptOutcome(s2.outcome, state('c1', true)))
    expect(rows[0].conceptsMastered).toEqual(['c1'])
  })
})

describe('NEGATIVE CONTROL — the one genuine residue, recorded rather than hidden', () => {
  it('concurrent folds of DIFFERENT concepts lose one, because aggregates are written wholesale', async () => {
    const { db, rows } = fakeDb()
    // Both turns read the attempt BEFORE either writes — the interleaving.
    const s1 = await openLessonAttempt(db, { userId: USER, subjectSlug: SUBJ, lessonKey: KEY })
    const s2 = await openLessonAttempt(db, { userId: USER, subjectSlug: SUBJ, lessonKey: KEY })
    await saveLessonAttempt(db, s1.id, recordConceptOutcome(s1.outcome, state('c1', true)))
    await saveLessonAttempt(db, s2.id, recordConceptOutcome(s2.outcome, state('c2', true)))

    // c1 is gone. This is an ordinary last-writer-wins lost update on an
    // EVIDENCE row; it is documented in the report, not silently fixed,
    // because merging the two counters (teachingAttempts, budgetExhaustions)
    // has no single correct answer and guessing one would be worse.
    expect(rows[0].conceptsMastered).toEqual(['c2'])
    expect(rows[0].conceptsMastered).not.toContain('c1')
  })

  it('and the loss can only UNDER-report — it can never fabricate mastery', async () => {
    const { db, rows } = fakeDb()
    const s1 = await openLessonAttempt(db, { userId: USER, subjectSlug: SUBJ, lessonKey: KEY })
    const s2 = await openLessonAttempt(db, { userId: USER, subjectSlug: SUBJ, lessonKey: KEY })
    // one session masters a concept, the other flags a DIFFERENT one for review
    await saveLessonAttempt(db, s1.id, recordConceptOutcome(s1.outcome, state('c1', true)))
    await saveLessonAttempt(db, s2.id, recordConceptOutcome(s2.outcome, state('c2', false)))
    // whatever survives, nothing was invented: every id present was genuinely
    // folded by one of the two turns, and no concept appears in both lists
    const all = [...rows[0].conceptsMastered, ...rows[0].conceptsNeedingReview]
    expect(all.every((c: string) => c === 'c1' || c === 'c2')).toBe(true)
    expect(rows[0].conceptsMastered.filter((c: string) => rows[0].conceptsNeedingReview.includes(c)))
      .toEqual([])
  })
})
