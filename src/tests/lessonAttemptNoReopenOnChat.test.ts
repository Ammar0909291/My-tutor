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
  openLessonAttempt, saveLessonAttempt, finalizeLessonAttempt, latestLessonAttempt,
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

/**
 * THE ADAPTIVE LAYER READS THE NEWEST ROW.
 *
 * latestLessonAttempt orders by startedAt DESC, and it is the single read
 * behind all three consumers: the lesson SUMMARY block injected into the
 * prompt (route.ts ~1826), the completion gate that sets lessonCompletedHoisted
 * on the same read, and the D-0a deterministic serve (route.ts ~3479).
 *
 * So under the defect the tutor was not reading the learner's real attempt at
 * all — it was reading the 1-second row the previous turn had manufactured.
 * These tests pin the REAL attempt's signals surviving post-completion chatter.
 */
describe('post-completion turns do not corrupt the signals the adaptive layer reads', () => {
  /** A genuine long attempt: opened, taught, closed 2621s later — the real
   *  duration measured on the production account that exposed this. */
  async function realAttempt(db: any) {
    const { id, outcome } = await openLessonAttempt(db, { ...ARGS, lessonTitle: 'SI Units' })
    const folded = recordConceptOutcome(outcome, CLOSED, 'SI Units')
    await saveLessonAttempt(db, id, folded)
    return finalizeLessonAttempt(
      db, id, folded, new Date(folded.startedAt.getTime() + 2621_000),
    )
  }

  it('preserves durationSeconds — the real attempt is not buried under 1s rows', async () => {
    const { db, rows } = fakeDb()
    await realAttempt(db)
    expect(rows[0].durationSeconds).toBe(2621)

    for (let i = 0; i < 5; i++) await recordTurn(db, true)

    const latest = await latestLessonAttempt(db, ARGS)
    expect(rows.length).toBe(1)
    expect(latest!.durationSeconds).toBe(2621)
  })

  it('does not reset teachingAttempts or budgetExhaustions', async () => {
    const { db } = fakeDb()
    const { outcome } = await realAttempt(db)
    // The closed concept spent its budget, so both counters carry real history.
    expect(outcome.budgetExhaustions).toBeGreaterThan(0)
    const before = {
      teachingAttempts: outcome.teachingAttempts,
      budgetExhaustions: outcome.budgetExhaustions,
    }

    for (let i = 0; i < 5; i++) await recordTurn(db, true)

    const latest = await latestLessonAttempt(db, ARGS)
    expect(latest!.teachingAttempts).toBe(before.teachingAttempts)
    expect(latest!.budgetExhaustions).toBe(before.budgetExhaustions)
  })

  it('leaves latestLessonAttempt pointing at the learner\'s real attempt', async () => {
    const { db } = fakeDb()
    const { outcome } = await realAttempt(db)
    for (let i = 0; i < 3; i++) await recordTurn(db, true)

    const latest = await latestLessonAttempt(db, ARGS)
    // Same attempt, same close, same evidence the summary is built from.
    expect(latest!.startedAt.getTime()).toBe(outcome.startedAt.getTime())
    expect(latest!.completedAt!.getTime()).toBe(outcome.completedAt!.getTime())
    expect(latest!.conceptsNeedingReview).toEqual(outcome.conceptsNeedingReview)
    expect(latest!.status).toBe('COMPLETED')
  })

  it('holds for a RECOVERY turn — D-0a serves without writing an attempt', async () => {
    const { db, rows } = fakeDb()
    await realAttempt(db)
    // decideTeaching returns SERVE_LESSON_COMPLETE for a recovery utterance on a
    // closed lesson (pinned in completedLessonRecoveryPreempt.test.ts). That
    // serve is deterministic and must not touch the ledger: the gate is read
    // from the same lessonCompleted signal the decision used.
    for (const _ of ['i dont understand any of this', 'i feel stupid', 'please help me i am lost']) {
      await recordTurn(db, true)
    }
    expect(rows.length).toBe(1)
    expect(rows[0].durationSeconds).toBe(2621)
  })

  it('reuses an IN_PROGRESS attempt instead of opening a second one', async () => {
    const { db, rows } = fakeDb()
    const first = await openLessonAttempt(db, { ...ARGS, lessonTitle: 'SI Units' })
    const second = await openLessonAttempt(db, { ...ARGS, lessonTitle: 'SI Units' })
    expect(second.id).toBe(first.id)
    expect(rows.length).toBe(1)
    expect(rows[0].status).toBe('IN_PROGRESS')
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
