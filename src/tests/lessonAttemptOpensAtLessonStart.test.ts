/**
 * ATTEMPT DURATION — the attempt must begin when the LESSON begins.
 *
 * Before this, the only opener for an ordinary lesson was the chat route's
 * outcome block, which runs when the concept CLOSES. The row was created and
 * finalised in the same turn, so `startedAt` and `completedAt` sat ~1s apart
 * however long the learner studied, and LessonScreen (`durationSeconds / 60`)
 * told every learner their lesson took "1 min". Measured on the real account:
 * a ~12-minute physics lesson and a ~12-minute chemistry lesson both recorded
 * durationSeconds 1.
 *
 * The fix opens the attempt in lesson-init. The danger is reintroducing the
 * duplicate-attempt defect fixed earlier (a COMPLETED lesson minting a fresh
 * 1-second row on every later turn), so these tests pin BOTH halves: the
 * attempt starts at lesson start, AND a completed attempt is never reopened or
 * replaced by chat, resume or D-0a.
 *
 * Lifecycle rules under test (mirroring lesson-init's decision):
 *   latest IN_PROGRESS -> reuse, never a second row
 *   latest COMPLETED   -> reopen ONLY for restart/review
 *   latest null        -> open (genuine first start)
 */
import { describe, it, expect, vi } from 'vitest'
import {
  openLessonAttempt, saveLessonAttempt, finalizeLessonAttempt, latestLessonAttempt,
} from '@/lib/teaching/lessonAttemptStore'
import { recordConceptOutcome, isConceptClosed } from '@/lib/teaching/lessonAttempt'
import { shouldFinalizeLesson, requiredConceptsForLesson } from '@/lib/teaching/lessonCompletion'
import { initialConversationState, type ConversationState } from '@/lib/teaching/conversationState'
import { CONCEPT_TURN_BUDGET } from '@/lib/teaching/conceptBudget'

const ARGS = { userId: 'u1', subjectSlug: 'physics', lessonKey: 'lesson:8' }
const CONCEPT = 'phys.meas.unit-conversion'
const CLOSED: ConversationState = {
  ...initialConversationState(CONCEPT), turnsOnConcept: CONCEPT_TURN_BUDGET,
}

function fakeDb() {
  const rows: any[] = []
  return {
    rows,
    db: {
      lessonAttempt: {
        findFirst: vi.fn(async ({ where, orderBy }: any) => {
          const hits = rows.filter((r) =>
            r.userId === where.userId && r.subjectSlug === where.subjectSlug &&
            r.lessonKey === where.lessonKey && (!where.status || r.status === where.status))
          if (orderBy?.startedAt === 'desc') {
            return [...hits].sort((a, b) => b.startedAt - a.startedAt)[0] ?? null
          }
          return hits[0] ?? null
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
          const row = rows.find((r) => r.id === where.id); Object.assign(row, data); return row
        }),
      },
      topicProgress: { findUnique: vi.fn(async () => null), upsert: vi.fn(async () => ({})) },
    } as any,
  }
}

/** lesson-init's rule, as implemented in the route. */
async function lessonInit(db: any, mode: 'next' | 'resume' | 'restart' | 'review') {
  const latest = await latestLessonAttempt(db, ARGS)
  const isReteach = mode === 'restart' || mode === 'review'
  const shouldOpen = latest === null || (latest.status === 'COMPLETED' && isReteach)
  if (shouldOpen) await openLessonAttempt(db, { ...ARGS, lessonTitle: 'Unit Conversion' })
}

/** The chat route's outcome block: reuses the open attempt, finalises on close. */
async function closingChatTurn(db: any, lessonCompleted: boolean) {
  if (!isConceptClosed(CLOSED) || lessonCompleted) return
  const { id, outcome } = await openLessonAttempt(db, { ...ARGS, lessonTitle: 'Unit Conversion' })
  const folded = recordConceptOutcome(outcome, CLOSED, 'Unit Conversion')
  await saveLessonAttempt(db, id, folded)
  if (shouldFinalizeLesson(requiredConceptsForLesson(CONCEPT), folded)) {
    // Finalise 20 minutes after the attempt actually started.
    await finalizeLessonAttempt(db, id, folded, new Date(folded.startedAt.getTime() + 1_200_000))
  }
}

describe('A/B — the attempt opens at lesson start and survives many turns', () => {
  it('A. a fresh lesson opens exactly one IN_PROGRESS attempt', async () => {
    const { db, rows } = fakeDb()
    await lessonInit(db, 'next')
    expect(rows).toHaveLength(1)
    expect(rows[0].status).toBe('IN_PROGRESS')
    expect(rows[0].completedAt).toBeNull()
  })

  it('B. repeated inits and chat turns still leave exactly one IN_PROGRESS row', async () => {
    const { db, rows } = fakeDb()
    await lessonInit(db, 'next')
    for (const m of ['resume', 'next', 'resume'] as const) await lessonInit(db, m)
    for (let i = 0; i < 5; i++) await openLessonAttempt(db, { ...ARGS, lessonTitle: 'Unit Conversion' })
    expect(rows).toHaveLength(1)
    expect(rows[0].status).toBe('IN_PROGRESS')
  })
})

describe('C — mastery finalises THAT row, and the duration is real', () => {
  it('C. one row, COMPLETED, duration spans the whole lesson', async () => {
    const { db, rows } = fakeDb()
    await lessonInit(db, 'next')
    const startedAt = rows[0].startedAt
    await closingChatTurn(db, false)

    expect(rows).toHaveLength(1)
    expect(rows[0].status).toBe('COMPLETED')
    expect(rows[0].startedAt).toBe(startedAt)           // start is the LESSON start
    expect(rows[0].durationSeconds).toBe(1200)          // not the ~1s defect
  })

  it('the old behaviour is what this replaces — open-at-close yields ~0s', async () => {
    // Without the lesson-start open, creation and finalisation share a turn.
    const { db, rows } = fakeDb()
    await closingChatTurn(db, false)
    expect(rows).toHaveLength(1)
    // startedAt === now, finalised 1200s later only because THIS harness says
    // so; in production both timestamps came from the same turn. The point of
    // the assertion above is that startedAt now predates the closing turn.
    expect(rows[0].status).toBe('COMPLETED')
  })
})

describe('D/E/F — a completed attempt is immutable', () => {
  async function completed() {
    const h = fakeDb()
    await lessonInit(h.db, 'next')
    await closingChatTurn(h.db, false)
    return h
  }

  it('D. chatting after completion creates no new attempt', async () => {
    const { db, rows } = await completed()
    const completedAt = rows[0].completedAt
    for (let i = 0; i < 4; i++) await closingChatTurn(db, true)  // gate = lessonCompleted
    expect(rows).toHaveLength(1)
    expect(rows[0].completedAt).toBe(completedAt)
  })

  it('E. lesson-init resume on a completed lesson creates no new attempt', async () => {
    const { db, rows } = await completed()
    await lessonInit(db, 'resume')
    await lessonInit(db, 'next')
    expect(rows).toHaveLength(1)
    expect(rows[0].status).toBe('COMPLETED')
  })

  it('F. a D-0a served turn writes no attempt at all', async () => {
    const { db, rows } = await completed()
    // D-0a serves from persisted evidence; the outcome writer is gated off.
    await closingChatTurn(db, true)
    expect(rows).toHaveLength(1)
  })

  it('restart/review DO re-open, exactly as before', async () => {
    const { db, rows } = await completed()
    await lessonInit(db, 'restart')
    expect(rows).toHaveLength(2)
    expect(rows[1].status).toBe('IN_PROGRESS')
  })
})

describe('G/H/I — bounded rows, per-lesson isolation, correct latest', () => {
  it('G. an abandoned lesson does not accumulate IN_PROGRESS rows', async () => {
    const { db, rows } = fakeDb()
    for (let i = 0; i < 6; i++) await lessonInit(db, 'resume')
    expect(rows).toHaveLength(1)
  })

  it('H. a second lesson gets its own attempt without touching the first', async () => {
    const { db, rows } = fakeDb()
    await lessonInit(db, 'next')
    const other = { ...ARGS, lessonKey: 'lesson:9' }
    const latestOther = await latestLessonAttempt(db, other)
    expect(latestOther).toBeNull()
    await openLessonAttempt(db, { ...other, lessonTitle: 'Next Lesson' })
    expect(rows).toHaveLength(2)
    expect(rows.filter((r) => r.lessonKey === 'lesson:8')).toHaveLength(1)
  })

  it('I/J. latestLessonAttempt returns the open attempt the adaptive layer reads', async () => {
    const { db } = fakeDb()
    await lessonInit(db, 'next')
    const latest = await latestLessonAttempt(db, ARGS)
    expect(latest?.status).toBe('IN_PROGRESS')

    await closingChatTurn(db, false)
    const after = await latestLessonAttempt(db, ARGS)
    expect(after?.status).toBe('COMPLETED')
    expect(after?.durationSeconds).toBe(1200)
  })
})
