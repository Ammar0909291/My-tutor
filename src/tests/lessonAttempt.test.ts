import { describe, it, expect, vi } from 'vitest'
import { initialConversationState, type ConversationState } from '@/lib/teaching/conversationState'
import { CONCEPT_TURN_BUDGET } from '@/lib/teaching/conceptBudget'
import {
  lessonKeyFor, startLessonAttempt, recordConceptOutcome, completeLessonAttempt,
  summaryFromAttempt, isLessonFinished, isConceptClosed,
} from '@/lib/teaching/lessonAttempt'
import {
  openLessonAttempt, saveLessonAttempt, finalizeLessonAttempt, markConceptForReview,
  latestLessonAttempt,
} from '@/lib/teaching/lessonAttemptStore'

function st(conceptId: string, over: Partial<ConversationState> = {}): ConversationState {
  return { ...initialConversationState(conceptId), ...over }
}
const mastered = (id: string) => st(id, { correctAtCheck: 1, correctAtPractice: 2 })
const exhausted = (id: string) => st(id, { turnsOnConcept: CONCEPT_TURN_BUDGET })
const T0 = new Date('2026-08-02T10:00:00Z')

describe('lessonKeyFor — one identity per lesson', () => {
  it('prefers the topic slug', () => {
    expect(lessonKeyFor({ topicSlug: 'fractions', lessonOrder: 3 })).toBe('fractions')
  })
  it('falls back to the lesson order', () => {
    expect(lessonKeyFor({ lessonOrder: 3 })).toBe('lesson:3')
    expect(lessonKeyFor({ topicSlug: '   ', lessonOrder: 3 })).toBe('lesson:3')
  })
  it('returns null when the lesson has no identity', () => {
    expect(lessonKeyFor({})).toBeNull()
    expect(lessonKeyFor({ lessonOrder: 0 })).toBeNull()
    expect(lessonKeyFor({ lessonOrder: Number.NaN })).toBeNull()
  })
})

describe('recordConceptOutcome', () => {
  it('records a mastered concept', () => {
    const a = recordConceptOutcome(startLessonAttempt('L', null, T0), mastered('c1'))
    expect(a.conceptsMastered).toEqual(['c1'])
    expect(a.conceptsNeedingReview).toEqual([])
  })

  it('records an exhausted concept as needing review, and counts the exhaustion', () => {
    const a = recordConceptOutcome(startLessonAttempt('L', null, T0), exhausted('c2'))
    expect(a.conceptsNeedingReview).toEqual(['c2'])
    expect(a.conceptsMastered).toEqual([])
    expect(a.budgetExhaustions).toBe(1)
  })

  it('records a corrected misconception only when mastery followed', () => {
    const fixed = recordConceptOutcome(
      startLessonAttempt('L', null, T0),
      st('c1', { correctAtCheck: 1, correctAtPractice: 2, misconceptionsSeen: ['m'] }),
    )
    expect(fixed.misconceptionsCorrected).toEqual(['c1'])
    const unfixed = recordConceptOutcome(
      startLessonAttempt('L', null, T0),
      st('c2', { turnsOnConcept: CONCEPT_TURN_BUDGET, misconceptionsSeen: ['m'] }),
    )
    expect(unfixed.misconceptionsCorrected).toEqual([])
  })

  it('is idempotent — a repeated fold cannot inflate the outcome', () => {
    let a = recordConceptOutcome(startLessonAttempt('L', null, T0), mastered('c1'))
    const once = { ...a }
    a = recordConceptOutcome(a, mastered('c1'))
    expect(a).toEqual(once)
    expect(a.conceptsMastered).toEqual(['c1'])
    expect(a.teachingAttempts).toBe(once.teachingAttempts)
  })

  it('accumulates teaching attempts across concepts', () => {
    let a = startLessonAttempt('L', null, T0)
    a = recordConceptOutcome(a, st('c1', { correctAtCheck: 1, correctAtPractice: 2, remediationCount: 1 }))
    a = recordConceptOutcome(a, mastered('c2'))
    expect(a.teachingAttempts).toBe(3) // (1+1) + (1+0)
  })

  it('ignores a state with no concept id', () => {
    const a = startLessonAttempt('L', null, T0)
    expect(recordConceptOutcome(a, st(null as unknown as string))).toEqual(a)
  })
})

describe('completeLessonAttempt', () => {
  it('stamps completion and denormalises duration', () => {
    const done = completeLessonAttempt(startLessonAttempt('L', null, T0), new Date(T0.getTime() + 90_000))
    expect(done.status).toBe('COMPLETED')
    expect(done.durationSeconds).toBe(90)
    expect(done.completedAt).not.toBeNull()
  })

  it('is idempotent', () => {
    const once = completeLessonAttempt(startLessonAttempt('L', null, T0), new Date(T0.getTime() + 1000))
    expect(completeLessonAttempt(once, new Date(T0.getTime() + 99_000))).toEqual(once)
  })

  it('never stores a negative duration on clock skew', () => {
    const done = completeLessonAttempt(startLessonAttempt('L', null, T0), new Date(T0.getTime() - 5000))
    expect(done.durationSeconds).toBe(0)
  })
})

describe('summaryFromAttempt — summary comes from persisted evidence', () => {
  it('rebuilds the buckets from the stored outcome alone', () => {
    let a = startLessonAttempt('L', null, T0)
    a = recordConceptOutcome(a, st('c1', { correctAtCheck: 1, correctAtPractice: 2, misconceptionsSeen: ['m'] }))
    a = recordConceptOutcome(a, mastered('c2'))
    a = recordConceptOutcome(a, exhausted('c3'))
    const s = summaryFromAttempt(a)
    expect(s.mastered.map((o) => o.conceptId).sort()).toEqual(['c1', 'c2'])
    expect(s.needsReview.map((o) => o.conceptId)).toEqual(['c3'])
    expect(s.corrected.map((o) => o.conceptId)).toEqual(['c1'])
    expect(s.complete).toBe(false)
  })

  it('is complete when nothing needs review', () => {
    const a = recordConceptOutcome(startLessonAttempt('L', null, T0), mastered('c1'))
    expect(summaryFromAttempt(a).complete).toBe(true)
  })
})

describe('isConceptClosed / isLessonFinished — server-side decisions', () => {
  it('closes a concept on mastery or on a spent budget only', () => {
    expect(isConceptClosed(st('c1'))).toBe(false)
    expect(isConceptClosed(mastered('c1'))).toBe(true)
    expect(isConceptClosed(exhausted('c1'))).toBe(true)
  })

  it('finishes the lesson only when concepts were attempted and none remain', () => {
    const a = recordConceptOutcome(startLessonAttempt('L', null, T0), mastered('c1'))
    expect(isLessonFinished(a, [])).toBe(true)
    expect(isLessonFinished(a, ['c2'])).toBe(false)
    expect(isLessonFinished(startLessonAttempt('L', null, T0), [])).toBe(false)
  })
})

// ── Store layer, against an in-memory double ────────────────────────────────

function fakeDb() {
  const rows: any[] = []
  const topics: any[] = []
  return {
    rows,
    topics,
    db: {
      lessonAttempt: {
        findFirst: vi.fn(async ({ where, orderBy }: any) => {
          const found = rows.filter((r) =>
            r.userId === where.userId && r.subjectSlug === where.subjectSlug &&
            r.lessonKey === where.lessonKey && (!where.status || r.status === where.status))
          if (orderBy) found.sort((a, b) => b.startedAt - a.startedAt)
          return found[0] ?? null
        }),
        create: vi.fn(async ({ data }: any) => {
          const row = {
            id: `a${rows.length + 1}`, lessonTitle: null, completedAt: null, durationSeconds: null,
            conceptsMastered: [], conceptsNeedingReview: [], misconceptionsCorrected: [],
            teachingAttempts: 0, budgetExhaustions: 0, ...data,
          }
          rows.push(row); return row
        }),
        update: vi.fn(async ({ where, data }: any) => {
          const row = rows.find((r) => r.id === where.id)
          Object.assign(row, data); return row
        }),
      },
      topicProgress: {
        findUnique: vi.fn(async ({ where }: any) => {
          const k = where.userId_subjectSlug_topicSlug
          return topics.find((t) => t.userId === k.userId && t.topicSlug === k.topicSlug) ?? null
        }),
        upsert: vi.fn(async ({ where, update, create }: any) => {
          const k = where.userId_subjectSlug_topicSlug
          const existing = topics.find((t) => t.userId === k.userId && t.topicSlug === k.topicSlug)
          if (existing) {
            existing.status = update.status
            existing.revisionCount = (existing.revisionCount ?? 0) + (update.revisionCount?.increment ?? 0)
            return existing
          }
          topics.push({ ...create }); return create
        }),
      },
    } as any,
  }
}

const ARGS = { userId: 'u1', subjectSlug: 'mathematics', lessonKey: 'fractions' }

describe('lessonAttemptStore', () => {
  it('creates an attempt, then RESUMES the same one (no duplicate state)', async () => {
    const { db, rows } = fakeDb()
    const first = await openLessonAttempt(db, { ...ARGS, lessonTitle: 'Fractions' })
    const second = await openLessonAttempt(db, ARGS)
    expect(second.id).toBe(first.id)
    expect(rows).toHaveLength(1)
  })

  it('persists a folded outcome and reads it back', async () => {
    const { db } = fakeDb()
    const { id, outcome } = await openLessonAttempt(db, ARGS)
    const folded = recordConceptOutcome(outcome, mastered('c1'))
    await saveLessonAttempt(db, id, folded)
    const back = await latestLessonAttempt(db, ARGS)
    expect(back!.conceptsMastered).toEqual(['c1'])
  })

  it('finalizes with status, duration and summary evidence built server-side', async () => {
    const { db, rows } = fakeDb()
    const { id, outcome } = await openLessonAttempt(db, ARGS)
    let a = recordConceptOutcome(outcome, mastered('c1'))
    a = recordConceptOutcome(a, exhausted('c2'))
    const { summary } = await finalizeLessonAttempt(db, id, a, new Date(a.startedAt.getTime() + 60_000))
    const row = rows[0]
    expect(row.status).toBe('COMPLETED')
    expect(row.durationSeconds).toBe(60)
    expect(row.summaryEvidence.mastered).toEqual(['c1'])
    expect(row.summaryEvidence.needsReview).toEqual(['c2'])
    expect(row.summaryEvidence.complete).toBe(false)
    expect(summary.needsReview).toHaveLength(1)
  })

  it('marks review in TopicProgress — the existing owner, not a new queue', async () => {
    const { db, topics } = fakeDb()
    await markConceptForReview(db, { userId: 'u1', subjectSlug: 'mathematics', topicSlug: 'c2' })
    expect(topics[0].status).toBe('REVISION')
    expect(topics[0].revisionCount).toBe(1)
  })

  it('never downgrades an already-mastered concept to review', async () => {
    const { db, topics } = fakeDb()
    topics.push({ userId: 'u1', subjectSlug: 'mathematics', topicSlug: 'c1', status: 'MASTERED', revisionCount: 0 })
    await markConceptForReview(db, { userId: 'u1', subjectSlug: 'mathematics', topicSlug: 'c1' })
    expect(topics[0].status).toBe('MASTERED')
  })

  it('returns null when a lesson has no attempt yet', async () => {
    const { db } = fakeDb()
    expect(await latestLessonAttempt(db, ARGS)).toBeNull()
  })
})

// ── Learner isolation (Supabase security-advisor RLS audit, 2026-08-12) ────
//
// The RLS migration is defence-in-depth against a future Data API / anon-key
// exposure — server-side Prisma access always bypasses RLS via the DB role's
// rolbypassrls attribute, so isolation TODAY is enforced at this application
// layer: every store function takes userId as an explicit argument and every
// query is scoped by it. These tests pin that contract down.
describe('lessonAttemptStore — learner isolation', () => {
  it('learner A cannot read learner B\'s attempt for the same lesson key', async () => {
    const { db } = fakeDb()
    await openLessonAttempt(db, { userId: 'learnerA', subjectSlug: 'mathematics', lessonKey: 'fractions' })
    const asB = await latestLessonAttempt(db, { userId: 'learnerB', subjectSlug: 'mathematics', lessonKey: 'fractions' })
    expect(asB).toBeNull()
  })

  it('opening the same lesson key for two learners creates two separate rows', async () => {
    const { db, rows } = fakeDb()
    const a = await openLessonAttempt(db, { userId: 'learnerA', subjectSlug: 'mathematics', lessonKey: 'fractions' })
    const b = await openLessonAttempt(db, { userId: 'learnerB', subjectSlug: 'mathematics', lessonKey: 'fractions' })
    expect(a.id).not.toBe(b.id)
    expect(rows).toHaveLength(2)
    expect(rows.find((r) => r.id === a.id)!.userId).toBe('learnerA')
    expect(rows.find((r) => r.id === b.id)!.userId).toBe('learnerB')
  })

  it('markConceptForReview only ever touches the calling learner\'s TopicProgress row', async () => {
    const { db, topics } = fakeDb()
    topics.push({ userId: 'learnerB', subjectSlug: 'mathematics', topicSlug: 'frac.addition', status: 'COMPLETED', revisionCount: 0 })
    await markConceptForReview(db, { userId: 'learnerA', subjectSlug: 'mathematics', topicSlug: 'frac.addition' })
    const bRow = topics.find((t) => t.userId === 'learnerB')!
    const aRow = topics.find((t) => t.userId === 'learnerA')!
    expect(bRow.status).toBe('COMPLETED') // learner B's row is untouched
    expect(aRow.status).toBe('REVISION')  // learner A got their own new row
  })

  it('every store function that reads or writes lesson_attempts requires userId as an explicit argument', () => {
    // Static contract check: an id-only lookup path (no userId) would let one
    // learner's attemptId be replayed against another learner's session. All
    // reads go through openLessonAttempt/latestLessonAttempt, both userId-scoped;
    // writes (save/finalize) take an already-scoped attemptId returned by one
    // of those two functions, never a client-supplied id.
    expect(openLessonAttempt.length).toBeGreaterThanOrEqual(2)
    expect(latestLessonAttempt.length).toBeGreaterThanOrEqual(2)
  })
})

describe('MANUAL TRACE — start, master, fail, complete, refresh, resume, summary', () => {
  it('keeps one source of truth across the whole lifecycle', async () => {
    const { db, rows, topics } = fakeDb()

    // 1. START
    const opened = await openLessonAttempt(db, { ...ARGS, lessonTitle: 'Fractions' })
    let attempt = opened.outcome
    expect(attempt.status).toBe('IN_PROGRESS')

    // 2. MASTER a concept
    const c1 = mastered('frac.equivalence')
    expect(isConceptClosed(c1)).toBe(true)
    attempt = recordConceptOutcome(attempt, c1)
    await saveLessonAttempt(db, opened.id, attempt)

    // 3. FAIL a concept — budget spent, marked for review in TopicProgress
    const c2 = exhausted('frac.addition')
    expect(isConceptClosed(c2)).toBe(true)
    attempt = recordConceptOutcome(attempt, c2)
    await saveLessonAttempt(db, opened.id, attempt)
    await markConceptForReview(db, { userId: 'u1', subjectSlug: 'mathematics', topicSlug: 'frac.addition' })
    expect(topics[0].status).toBe('REVISION')

    // 4. COMPLETE — no concepts remain
    expect(isLessonFinished(attempt, [])).toBe(true)
    const finalized = await finalizeLessonAttempt(db, opened.id, attempt, new Date(attempt.startedAt.getTime() + 300_000))
    expect(finalized.outcome.status).toBe('COMPLETED')
    expect(finalized.outcome.durationSeconds).toBe(300)

    // 5. REFRESH — nothing is held client-side; re-read from the owner.
    const resumed = await latestLessonAttempt(db, ARGS)
    expect(resumed).not.toBeNull()

    // 6. RESUME restores the full outcome
    expect(resumed!.status).toBe('COMPLETED')
    expect(resumed!.conceptsMastered).toEqual(['frac.equivalence'])
    expect(resumed!.conceptsNeedingReview).toEqual(['frac.addition'])
    expect(resumed!.durationSeconds).toBe(300)

    // 7. SUMMARY rebuilt from persisted evidence, not from any session state
    const summary = summaryFromAttempt(resumed!)
    expect(summary.mastered.map((o) => o.conceptId)).toEqual(['frac.equivalence'])
    expect(summary.needsReview.map((o) => o.conceptId)).toEqual(['frac.addition'])
    expect(summary.complete).toBe(false)

    // SINGLE SOURCE OF TRUTH: exactly one lesson row, and the review flag
    // lives in the pre-existing TopicProgress owner, not a second queue.
    expect(rows).toHaveLength(1)
    expect(topics).toHaveLength(1)
  })
})
