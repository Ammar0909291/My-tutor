/**
 * Leaving a mastered lesson recorded it as SKIPPED.
 *
 * MEASURED 2026-10-01 on the real account (post-deploy verification): Newton's
 * Second Law was MASTERED (masteryPct 100). The learner re-entered it for
 * review, then opened Simple Pendulum from the roadmap. The switch records a
 * skip of the lesson being left (Option B, markLessonSkipped). Its client guard
 * reads a possibly stale map, and the server applied SKIPPED unconditionally:
 * topic_progress went MASTERED → SKIPPED at 21:17:06. The server now refuses
 * to demote COMPLETED, MASTERED or REVISION, as 'start' already does.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'

const state = vi.hoisted(() => ({ existing: null as null | { status: string; masteryPct: number }, updates: [] as unknown[] }))
vi.mock('@/lib/auth', () => ({ auth: async () => ({ user: { id: 'u1' } }) }))
vi.mock('@/lib/db/withRetry', () => ({ withRetry: (f: () => unknown) => f() }))
vi.mock('@/lib/db/prisma', () => ({
  prisma: {
    topicProgress: {
      findUnique: async () => state.existing,
      upsert: async (a: { update: { status: string }; create: { status: string } }) => {
        state.updates.push(a.update)
        return { status: state.existing ? a.update.status : a.create.status, masteryPct: state.existing?.masteryPct ?? 0, revisionCount: 0 }
      },
    },
  },
}))

const { PATCH } = await import('@/app/api/topic-progress/route')
const skip = async () => (await (await PATCH(new Request('http://x', {
  method: 'PATCH', body: JSON.stringify({ subjectSlug: 'physics', topicSlug: 'phys.mech.newtons-second-law', action: 'skip' }),
}))).json()) as { topicProgress: { status: string } }

beforeEach(() => { state.existing = null; state.updates = [] })

describe('skip never demotes earned progress', () => {
  it.each(['MASTERED', 'COMPLETED', 'REVISION'])('%s stays %s', async (status) => {
    state.existing = { status, masteryPct: 100 }
    expect((await skip()).topicProgress.status).toBe(status)
  })

  it.each(['IN_PROGRESS', 'NOT_STARTED', 'AVAILABLE'])('%s becomes SKIPPED, as before', async (status) => {
    state.existing = { status, masteryPct: 0 }
    expect((await skip()).topicProgress.status).toBe('SKIPPED')
  })

  it('a topic never started is recorded SKIPPED, as before', async () => {
    expect((await skip()).topicProgress.status).toBe('SKIPPED')
  })
})
