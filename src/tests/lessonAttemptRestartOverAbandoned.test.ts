/**
 * A RESTART OVER AN ABANDONED ATTEMPT MUST ACTUALLY RESTART.
 *
 * lesson-init's original decision handled `latest === null` and `latest
 * COMPLETED`, and fell through to "nothing to do" for IN_PROGRESS. That is
 * right for `resume` — the one mode that never means start again — and silently
 * wrong for `restart`, whose own lesson-opening prompt says "teach it from the
 * beginning".
 *
 * An abandoned attempt is the common case: a learner who walks away mid-lesson
 * leaves an IN_PROGRESS row that nothing completes. Measured on the real
 * account (physics lesson 24, phys.mech.normal-force, 2026-08-30): a restart
 * resumed an attempt whose startedAt was 10.7 days old, turn one arrived
 * already at PRACTICE with the concept budget spent, and the lesson closed on
 * turn THREE having taught nothing and graded nothing. durationSeconds: 928967.
 */
import { describe, it, expect } from 'vitest'
import { lessonAttemptStartDecision } from '@/lib/teaching/lessonAttempt'
import { openLessonAttempt } from '@/lib/teaching/lessonAttemptStore'

const ARGS = { userId: 'u1', subjectSlug: 'physics', lessonKey: 'lesson:24' }

function fakeDb(seed: any[] = []) {
  const rows: any[] = [...seed]
  return {
    rows,
    lessonAttempt: {
      findFirst: async ({ where }: any) =>
        rows.filter((r) => r.status === where.status && r.lessonKey === where.lessonKey)
          .sort((a, b) => b.startedAt - a.startedAt)[0] ?? null,
      create: async ({ data }: any) => {
        const row = { id: `a${rows.length + 1}`, ...data, conceptsMastered: [], conceptsNeedingReview: [], misconceptionsCorrected: [], teachingAttempts: 0, budgetExhaustions: 0, completedAt: null, durationSeconds: null }
        rows.push(row); return row
      },
      update: async ({ where, data }: any) => {
        const row = rows.find((r) => r.id === where.id)
        Object.assign(row, data); return row
      },
    },
  } as any
}

describe('lessonAttemptStartDecision', () => {
  it('restarts over an ABANDONED attempt — the case that regressed', () => {
    const d = lessonAttemptStartDecision({ status: 'IN_PROGRESS' }, 'restart')
    expect(d.freshStart).toBe(true)
    expect(d.resetStartedAt).toBe(true)
    expect(d.reason).toContain('abandoned')
  })

  it('review behaves the same as restart — both mean "teach it again"', () => {
    expect(lessonAttemptStartDecision({ status: 'IN_PROGRESS' }, 'review').freshStart).toBe(true)
  })

  it('RESUME still carries on — it must never clear the earned ladder', () => {
    const d = lessonAttemptStartDecision({ status: 'IN_PROGRESS' }, 'resume')
    expect(d.freshStart).toBe(false)
    expect(d.resetStartedAt).toBe(false)
    expect(d.reason).toBeNull()
  })

  it('next over an in-progress row does nothing — it addresses another lesson', () => {
    expect(lessonAttemptStartDecision({ status: 'IN_PROGRESS' }, 'next').reason).toBeNull()
  })

  it('a COMPLETED attempt still reopens only for restart/review, never resume', () => {
    expect(lessonAttemptStartDecision({ status: 'COMPLETED' }, 'restart').freshStart).toBe(true)
    expect(lessonAttemptStartDecision({ status: 'COMPLETED' }, 'restart').resetStartedAt).toBe(false)
    expect(lessonAttemptStartDecision({ status: 'COMPLETED' }, 'resume').reason).toBeNull()
  })

  it('a genuine first start is unchanged, and resume on no row never clears', () => {
    expect(lessonAttemptStartDecision(null, 'restart')).toMatchObject({ reason: 'first-start', freshStart: true })
    expect(lessonAttemptStartDecision(null, 'resume')).toMatchObject({ reason: 'first-start', freshStart: false })
  })
})

describe('openLessonAttempt — resetStartedAt', () => {
  it('moves an abandoned row\'s clock to now instead of inheriting 10 days', async () => {
    const stale = new Date(Date.now() - 928967 * 1000)
    const db = fakeDb([{ id: 'a1', ...ARGS, lessonTitle: null, status: 'IN_PROGRESS', startedAt: stale, conceptsMastered: [], conceptsNeedingReview: [], misconceptionsCorrected: [], teachingAttempts: 0, budgetExhaustions: 0, completedAt: null, durationSeconds: null }])
    const { id, outcome } = await openLessonAttempt(db, { ...ARGS, resetStartedAt: true })
    expect(id).toBe('a1')
    expect(db.rows).toHaveLength(1)
    expect(outcome.startedAt.getTime()).toBeGreaterThan(stale.getTime())
    expect(Date.now() - outcome.startedAt.getTime()).toBeLessThan(5000)
  })

  it('without the flag the row is reused untouched — resume must not lose its clock', async () => {
    const stale = new Date(Date.now() - 928967 * 1000)
    const db = fakeDb([{ id: 'a1', ...ARGS, lessonTitle: null, status: 'IN_PROGRESS', startedAt: stale, conceptsMastered: [], conceptsNeedingReview: [], misconceptionsCorrected: [], teachingAttempts: 0, budgetExhaustions: 0, completedAt: null, durationSeconds: null }])
    const { outcome } = await openLessonAttempt(db, ARGS)
    expect(outcome.startedAt.getTime()).toBe(stale.getTime())
    expect(db.rows).toHaveLength(1)
  })
})
