import { describe, it, expect, vi } from 'vitest'
import { initialConversationState, type ConversationState } from '@/lib/teaching/conversationState'
import { CONCEPT_TURN_BUDGET } from '@/lib/teaching/conceptBudget'
import {
  startLessonAttempt, recordConceptOutcome, summaryFromAttempt, isConceptClosed,
} from '@/lib/teaching/lessonAttempt'
import {
  requiredConceptsForLesson, closedConceptIds, areAllRequiredConceptsClosed,
  shouldFinalizeLesson, buildCompletionPayload, buildLessonCompleteBlock,
} from '@/lib/teaching/lessonCompletion'
import { openLessonAttempt, saveLessonAttempt, finalizeLessonAttempt, latestLessonAttempt }
  from '@/lib/teaching/lessonAttemptStore'

function st(id: string, over: Partial<ConversationState> = {}): ConversationState {
  return { ...initialConversationState(id), ...over }
}
const mastered = (id: string) => st(id, { correctAtCheck: 1, correctAtPractice: 2 })
const exhausted = (id: string) => st(id, { turnsOnConcept: CONCEPT_TURN_BUDGET })
const T0 = new Date('2026-08-02T10:00:00Z')

describe('requiredConceptsForLesson — reads the KG mapping, invents nothing', () => {
  it('returns the lesson concept', () => {
    expect(requiredConceptsForLesson('frac.addition')).toEqual(['frac.addition'])
  })
  it('returns nothing when the lesson has no resolved concept', () => {
    expect(requiredConceptsForLesson(null)).toEqual([])
    expect(requiredConceptsForLesson(undefined)).toEqual([])
    expect(requiredConceptsForLesson('   ')).toEqual([])
  })
})

describe('areAllRequiredConceptsClosed', () => {
  it('is false while the required concept is still open', () => {
    const a = startLessonAttempt('lesson:1', null, T0)
    expect(areAllRequiredConceptsClosed(['c1'], a)).toBe(false)
  })

  it('is true when a MASTERED concept closes it', () => {
    const a = recordConceptOutcome(startLessonAttempt('lesson:1', null, T0), mastered('c1'))
    expect(areAllRequiredConceptsClosed(['c1'], a)).toBe(true)
  })

  it('is true when an EXHAUSTED concept closes it', () => {
    const a = recordConceptOutcome(startLessonAttempt('lesson:1', null, T0), exhausted('c1'))
    expect(areAllRequiredConceptsClosed(['c1'], a)).toBe(true)
  })

  it('is false when only SOME required concepts are closed (non-final concept)', () => {
    const a = recordConceptOutcome(startLessonAttempt('lesson:1', null, T0), mastered('c1'))
    expect(areAllRequiredConceptsClosed(['c1', 'c2'], a)).toBe(false)
  })

  it('never completes on an empty requirement list', () => {
    const a = recordConceptOutcome(startLessonAttempt('lesson:1', null, T0), mastered('c1'))
    expect(areAllRequiredConceptsClosed([], a)).toBe(false)
  })

  it('closedConceptIds covers both closure kinds', () => {
    let a = recordConceptOutcome(startLessonAttempt('l', null, T0), mastered('c1'))
    a = recordConceptOutcome(a, exhausted('c2'))
    expect(closedConceptIds(a).sort()).toEqual(['c1', 'c2'])
  })
})

describe('shouldFinalizeLesson — duplicate completion prevented', () => {
  it('finalizes once the last concept closes', () => {
    const a = recordConceptOutcome(startLessonAttempt('l', null, T0), mastered('c1'))
    expect(shouldFinalizeLesson(['c1'], a)).toBe(true)
  })

  it('refuses to finalize an already-COMPLETED attempt', () => {
    const a = recordConceptOutcome(startLessonAttempt('l', null, T0), mastered('c1'))
    expect(shouldFinalizeLesson(['c1'], { ...a, status: 'COMPLETED' })).toBe(false)
  })

  it('does not finalize a lesson whose concept is still open', () => {
    expect(shouldFinalizeLesson(['c1'], startLessonAttempt('l', null, T0))).toBe(false)
  })
})

describe('buildCompletionPayload — reuses the P6.5 summary', () => {
  it('carries mastery, review, duration and the next lesson', () => {
    let a = recordConceptOutcome(startLessonAttempt('lesson:3', 'Fractions', T0), mastered('c1'))
    a = { ...a, status: 'COMPLETED', completedAt: new Date(T0.getTime() + 120_000), durationSeconds: 120 }
    const payload = buildCompletionPayload(a, summaryFromAttempt(a), 3)
    expect(payload.complete).toBe(true)
    expect(payload.lessonTitle).toBe('Fractions')
    expect(payload.mastered).toEqual(['c1'])
    expect(payload.needsReview).toEqual([])
    expect(payload.durationSeconds).toBe(120)
    expect(payload.nextLessonOrder).toBe(4)
    expect(payload.fullyMastered).toBe(true)
  })

  it('reports needs-review honestly and is not fully mastered', () => {
    let a = recordConceptOutcome(startLessonAttempt('lesson:1', null, T0), mastered('c1'))
    a = recordConceptOutcome(a, exhausted('c2'))
    const payload = buildCompletionPayload(a, summaryFromAttempt(a), 1)
    expect(payload.needsReview).toEqual(['c2'])
    expect(payload.fullyMastered).toBe(false)
  })

  it('has no next lesson when the lesson is not curriculum-ordered', () => {
    const a = recordConceptOutcome(startLessonAttempt('slug', null, T0), mastered('c1'))
    expect(buildCompletionPayload(a, summaryFromAttempt(a), null).nextLessonOrder).toBeNull()
    expect(buildCompletionPayload(a, summaryFromAttempt(a), 0).nextLessonOrder).toBeNull()
  })
})

describe('buildLessonCompleteBlock — no "let us continue"', () => {
  it('tells the tutor to stop and not start the next concept', () => {
    const block = buildLessonCompleteBlock()
    expect(block).toMatch(/STOP/)
    expect(block).toMatch(/do NOT ask another question/i)
    expect(block).toMatch(/let's continue/i)
    expect(block).toMatch(/learner chooses when to start the next lesson/i)
  })
})

// ── Lifecycle against an in-memory store ────────────────────────────────────

function fakeDb() {
  const rows: any[] = []
  return {
    rows,
    db: {
      lessonAttempt: {
        findFirst: vi.fn(async ({ where }: any) => rows.find((r) =>
          r.userId === where.userId && r.subjectSlug === where.subjectSlug &&
          r.lessonKey === where.lessonKey && (!where.status || r.status === where.status)) ?? null),
        create: vi.fn(async ({ data }: any) => {
          const row = {
            id: `a${rows.length + 1}`, lessonTitle: null, completedAt: null, durationSeconds: null,
            conceptsMastered: [], conceptsNeedingReview: [], misconceptionsCorrected: [],
            teachingAttempts: 0, budgetExhaustions: 0, ...data,
          }
          rows.push(row); return row
        }),
        update: vi.fn(async ({ where, data }: any) => {
          const row = rows.find((r) => r.id === where.id); Object.assign(row, data); return row
        }),
      },
      topicProgress: { findUnique: vi.fn(async () => null), upsert: vi.fn(async () => ({})) },
    } as any,
  }
}
const ARGS = { userId: 'u1', subjectSlug: 'mathematics', lessonKey: 'lesson:3' }

describe('MANUAL TRACE — final concept closes, lesson completes, refresh resumes', () => {
  it('completes exactly once and preserves evidence across a refresh', async () => {
    const { db, rows } = fakeDb()

    // Lesson with one required concept (the KG 1:1 mapping).
    const required = requiredConceptsForLesson('frac.addition')

    // Open + teach. Non-final state does not complete the lesson.
    const opened = await openLessonAttempt(db, { ...ARGS, lessonTitle: 'Adding fractions' })
    expect(shouldFinalizeLesson(required, opened.outcome)).toBe(false)

    // FINAL CONCEPT CLOSES (mastered).
    const state = mastered('frac.addition')
    expect(isConceptClosed(state)).toBe(true)
    const folded = recordConceptOutcome(opened.outcome, state, 'Adding fractions')
    await saveLessonAttempt(db, opened.id, folded)
    expect(shouldFinalizeLesson(required, folded)).toBe(true)

    // FINALIZE — summary comes from persisted evidence, not the model.
    const { outcome: finalOutcome, summary } = await finalizeLessonAttempt(
      db, opened.id, folded, new Date(folded.startedAt.getTime() + 240_000),
    )
    const payload = buildCompletionPayload(finalOutcome, summary, 3)

    expect(rows[0].status).toBe('COMPLETED')
    expect(rows[0].durationSeconds).toBe(240)
    expect(payload.mastered).toEqual(['frac.addition'])
    expect(payload.nextLessonOrder).toBe(4)

    // DUPLICATE COMPLETION PREVENTED — a second closing turn must not refinalize.
    expect(shouldFinalizeLesson(required, finalOutcome)).toBe(false)

    // REFRESH — re-read from the single owner.
    const resumed = await latestLessonAttempt(db, ARGS)
    expect(resumed!.status).toBe('COMPLETED')
    expect(resumed!.durationSeconds).toBe(240)          // duration preserved
    expect(resumed!.conceptsMastered).toEqual(['frac.addition']) // evidence unchanged

    // Summary on resume is identical, rebuilt from the same evidence.
    expect(summaryFromAttempt(resumed!).mastered.map((o) => o.conceptId))
      .toEqual(payload.mastered)

    // Exactly one lesson row — no duplicate lesson state.
    expect(rows).toHaveLength(1)
  })

  it('finalize is idempotent at the store layer', async () => {
    const { db, rows } = fakeDb()
    const opened = await openLessonAttempt(db, ARGS)
    const folded = recordConceptOutcome(opened.outcome, mastered('c1'))
    const first = await finalizeLessonAttempt(db, opened.id, folded, new Date(folded.startedAt.getTime() + 1000))
    const second = await finalizeLessonAttempt(db, opened.id, first.outcome, new Date(folded.startedAt.getTime() + 90_000))
    // Duration is not re-stretched by a second call.
    expect(second.outcome.durationSeconds).toBe(1)
    expect(rows[0].durationSeconds).toBe(1)
  })

  it('an exhausted final concept still completes the lesson', async () => {
    const { db } = fakeDb()
    const required = requiredConceptsForLesson('frac.addition')
    const opened = await openLessonAttempt(db, ARGS)
    const folded = recordConceptOutcome(opened.outcome, exhausted('frac.addition'))
    expect(shouldFinalizeLesson(required, folded)).toBe(true)
    const { summary } = await finalizeLessonAttempt(db, opened.id, folded)
    const payload = buildCompletionPayload(folded, summary, 3)
    expect(payload.needsReview).toEqual(['frac.addition'])
    expect(payload.fullyMastered).toBe(false)
  })
})
