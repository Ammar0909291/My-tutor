/**
 * A FINISHED LESSON MUST NOT ACCRUE NEW ATTEMPTS FROM CHAT TURNS.
 *
 * PRODUCTION (measured 2026-08-16, real learner account, physics):
 *
 *   lesson_attempts for one user
 *   ├─ lesson:6   14 rows, 11 of them durationSeconds <= 3
 *   ├─ lesson:1    7 rows,  6 of them durationSeconds <= 3
 *   └─ lesson:4    4 rows,  4 of them durationSeconds <= 3
 *
 * The real lesson:1 attempt ran 2621s. Every other row was manufactured by an
 * idle utterance AFTER the lesson had closed, because:
 *
 *   openLessonAttempt() reuses only an IN_PROGRESS row. Against a COMPLETED
 *   lesson it creates a NEW attempt -> the still-closed concept is folded in
 *   -> shouldFinalizeLesson() is immediately true -> finalize -> a fresh
 *   1-second COMPLETED row, once per turn, forever.
 *
 * Three consequences, all on the evidence ledger the teaching engine reads:
 *   - durationSeconds stops describing the real attempt,
 *   - completedAt drifts forward to the last thing the learner typed,
 *   - teachingAttempts / budgetExhaustions reset to a fresh attempt's values,
 *     discarding the struggle history.
 *
 * And one the learner sees: the fresh finalise overwrites the "you've already
 * finished" close with the FIRST-TIME close, so a learner typing "i dont
 * understand any of this" is congratulated with "nice work" on every turn.
 *
 * Re-opening a completed lesson is lesson-init's job, scoped there to
 * mode=restart|review. A chat turn is not that act.
 */
import { describe, it, expect, vi } from 'vitest'
import { readFileSync } from 'node:fs'
import {
  openLessonAttempt, saveLessonAttempt, finalizeLessonAttempt,
} from '@/lib/teaching/lessonAttemptStore'
import { recordConceptOutcome, isConceptClosed } from '@/lib/teaching/lessonAttempt'
import { shouldFinalizeLesson, requiredConceptsForLesson } from '@/lib/teaching/lessonCompletion'
import { initialConversationState, type ConversationState } from '@/lib/teaching/conversationState'
import { CONCEPT_TURN_BUDGET } from '@/lib/teaching/conceptBudget'

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

const ARGS = { userId: 'u1', subjectSlug: 'physics', lessonKey: 'lesson:1' }
const CONCEPT = 'phys.meas.units'

/** A concept closed by a spent turn budget — exactly the production shape:
 *  nothing mastered, the concept flagged for review. */
const CLOSED: ConversationState = {
  ...initialConversationState(CONCEPT),
  turnsOnConcept: CONCEPT_TURN_BUDGET,
}

/** One chat turn's outcome-recording, as route.ts performs it. `lessonClosed`
 *  is the route's `lessonCompletedHoisted` — read at turn start from the
 *  latest attempt for this same lessonKey. */
async function recordTurn(db: any, lessonClosed: boolean) {
  if (!isConceptClosed(CLOSED) || lessonClosed) return
  const { id, outcome } = await openLessonAttempt(db, { ...ARGS, lessonTitle: 'SI Units' })
  const folded = recordConceptOutcome(outcome, CLOSED, 'SI Units')
  await saveLessonAttempt(db, id, folded)
  if (shouldFinalizeLesson(requiredConceptsForLesson(CONCEPT), folded)) {
    await finalizeLessonAttempt(db, id, folded)
  }
}

describe('a completed lesson does not accrue attempts from later chat turns', () => {
  it('reproduces the defect when the completion gate is ignored', async () => {
    const { db, rows } = fakeDb()
    // The real attempt, then five idle post-completion utterances.
    for (let i = 0; i < 6; i++) await recordTurn(db, false);
    // This is the production shape: one row per turn, all COMPLETED.
    expect(rows.length).toBe(6)
    expect(rows.every((r) => r.status === 'COMPLETED')).toBe(true)
  })

  it('creates exactly ONE attempt when the gate is honoured', async () => {
    const { db, rows } = fakeDb()
    // Turn 1 closes the lesson. Every later turn sees lessonCompleted=true.
    await recordTurn(db, false)
    const closedAt = rows[0].completedAt
    const attemptsAfterClose = rows[0].teachingAttempts
    for (let i = 0; i < 5; i++) await recordTurn(db, true)

    expect(rows.length).toBe(1)
    // completedAt does not drift forward onto later idle chatter, and the
    // struggle counters are not reset by a fresh attempt.
    expect(rows[0].completedAt).toBe(closedAt)
    expect(rows[0].teachingAttempts).toBe(attemptsAfterClose)
  })

  it('still records normally while the lesson is open', async () => {
    const { db, rows } = fakeDb()
    await recordTurn(db, false)
    expect(rows.length).toBe(1)
    expect(rows[0].status).toBe('COMPLETED')
    expect(rows[0].conceptsNeedingReview).toContain(CONCEPT)
  })

  it('resumes recording after a real restart re-opens the lesson', async () => {
    const { db, rows } = fakeDb()
    await recordTurn(db, false)
    // lesson-init (mode=restart|review) re-opens the completed lesson.
    await openLessonAttempt(db, { ...ARGS, lessonTitle: 'SI Units' })
    expect(rows.length).toBe(2)
    expect(rows[1].status).toBe('IN_PROGRESS')
    // The gate is now false again (latest attempt is IN_PROGRESS), so the
    // next turn folds into THAT attempt rather than creating a third.
    await recordTurn(db, false)
    expect(rows.length).toBe(2)
    expect(rows[1].status).toBe('COMPLETED')
  })
})

describe('the route keeps the completion gate on the outcome writer', () => {
  const ROUTE = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')

  it('gates the attempt writer on lessonCompletedHoisted', () => {
    expect(ROUTE).toContain('isConceptClosed(stateForOutcome) && !lessonCompletedHoisted')
  })

  it('leaves lesson-init as the only path that re-opens a completed lesson', () => {
    const INIT = readFileSync('src/app/api/learn/lesson-init/route.ts', 'utf8')
    expect(INIT).toContain("mode === 'restart' || mode === 'review'")
    expect(INIT).toContain('openLessonAttempt')
  })
})
