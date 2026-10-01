/**
 * A MASTERED LESSON THE LEARNER CLOSED WAS NEVER COUNTED.
 *
 * 2026-09-30 learner baseline (real account, real browser): nine lessons were
 * fully mastered; eight of them were dismissed with the completion card's
 * Close button. Close recorded nothing, so chemistry `completedLessons`
 * stayed `[]` — roadmap "0% Complete" and dashboard "1 of 3 lessons done"
 * after nine verified masteries.
 *
 * Close keeps the learner on the lesson, so recording must not move them:
 * `advance: false` appends to completedLessons (with first-completion XP) and
 * leaves currentLesson, the lesson selection and the session pointer alone.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'

const state = vi.hoisted(() => ({
  existing: null as null | { currentLesson: number; completedLessons: number[]; completionPercent: number; isCompleted: boolean; completedAt: Date | null },
  upserts: [] as Array<{ create: Record<string, unknown>; update: Record<string, unknown> }>,
  appended: [] as number[],
  subjectLookups: 0,
  xp: 0,
}))

vi.mock('@/lib/auth', () => ({ auth: async () => ({ user: { id: 'u1' } }) }))
vi.mock('@/lib/xp', () => ({ awardXP: async (_u: string, n: number) => { state.xp += n } }))
vi.mock('@/lib/ai/client', () => ({ generateJSON: async () => [] }))
vi.mock('@/lib/db/prisma', () => ({
  prisma: {
    studentProgress: {
      findUnique: async () => state.existing,
      upsert: async (a: { create: Record<string, unknown>; update: Record<string, unknown> }) => {
        state.upserts.push(a)
        return { ...(state.existing ?? {}), ...a.update }
      },
    },
    $executeRaw: async (_s: TemplateStringsArray, ...v: unknown[]) => {
      const lesson = v.find((x) => typeof x === 'number') as number
      if (state.existing!.completedLessons.includes(lesson)) return 0
      state.existing!.completedLessons.push(lesson)
      state.appended.push(lesson)
      return 1
    },
    subject: { findUnique: async () => { state.subjectLookups++; return { id: 's1' } } },
    learnSession: { findFirst: async () => ({ id: 'sess1' }) },
    topicProgress: { upsert: async () => ({}) },
  },
}))

const { PATCH } = await import('@/app/api/curriculum/progress/route')

const patch = (body: Record<string, unknown>) => PATCH(new Request('http://x/api/curriculum/progress', {
  method: 'PATCH', body: JSON.stringify({ subjectCode: 'chemistry', completedLesson: 3, totalLessons: 186, ...body }),
}))

beforeEach(() => {
  state.existing = { currentLesson: 1, completedLessons: [], completionPercent: 0, isCompleted: false, completedAt: null }
  state.upserts = []; state.appended = []; state.subjectLookups = 0; state.xp = 0
})

describe('advance:false records a mastered lesson without moving the learner', () => {
  it('appends the lesson and awards first-completion XP', async () => {
    const res = await patch({ advance: false })
    expect((await res.json()).success).toBe(true)
    expect(state.appended).toEqual([3])
    expect(state.xp).toBe(10)
  })

  it('leaves currentLesson and the lesson selection untouched', async () => {
    await patch({ advance: false })
    const update = state.upserts[0].update
    expect(update).not.toHaveProperty('currentLesson')
    expect(update).not.toHaveProperty('activeLessonSlug')
  })

  it('does not clear the session lesson pointer', async () => {
    await patch({ advance: false })
    expect(state.subjectLookups).toBe(0)
  })

  it('a later "Next lesson" advances but awards no second XP', async () => {
    await patch({ advance: false })
    await patch({})
    expect(state.xp).toBe(10)
    expect(state.upserts[1].update).toMatchObject({ currentLesson: 4, activeLessonSlug: null })
  })
})

describe('nothing else changes', () => {
  it('the default call still advances and clears the selection', async () => {
    await patch({})
    expect(state.upserts[0].update).toMatchObject({ currentLesson: 4, activeLessonSlug: null })
    expect(state.subjectLookups).toBe(1)
  })

  it('a skip can never be recorded in place', async () => {
    await patch({ advance: false, mastered: false })
    expect(state.upserts[0].update).toMatchObject({ currentLesson: 4, activeLessonSlug: null })
  })
})
