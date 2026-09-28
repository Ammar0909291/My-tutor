/**
 * "quiz me" is never answered with no quiz (2026-09-28, Physics Unit-1
 * certification pass 1: 59 of 92 practice requests got no question, 52 of them
 * at GUIDE with a quiz already on screen). The held-probe release (turnProgress
 * rung 1) fired on the practice-request turn itself, after selection, so the
 * learner who asked for a question was left with none.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { driveTurns, type TurnResult } from './support/turnHarness'

const h = await vi.hoisted(async () => (await import('./support/turnHarness')).createHarness())
vi.mock('@/lib/auth', () => ({ auth: () => h.auth() }))
vi.mock('@/lib/db/prisma', () => ({ prisma: h.prisma }))
vi.mock('@/lib/rateLimit', () => ({ checkRateLimit: async () => ({ allowed: true }), rateLimitResponse: () => new Response('{}', { status: 429 }) }))
vi.mock('@/lib/ai/router', async (o) => ({ ...(await o<Record<string, unknown>>()), routeAI: (...a: unknown[]) => h.routeAI(...a) }))
const { POST } = await import('@/app/api/learn/chat/route')
beforeEach(() => { h.state.messages = []; h.state.snapshot = {} })

const PROBES = [1, 2, 3, 4].map((n) => ({
  assetId: `probe-${n}`, conceptId: 'chem.elect.galvanic-cell', stem: `Q${n}: In a galvanic cell, where does oxidation occur?`,
  choices: [{ text: `At the anode (${n})`, isCorrect: true }, { text: `At the cathode (${n})`, isCorrect: false }],
}))
const LANE = { probes: PROBES, subjectSlug: 'chemistry', conceptId: 'chem.elect.galvanic-cell', lessonTitle: 'Galvanic Cells' }
const mcqOf = (t: TurnResult) => (t.body as { mcq?: { question?: string } | null }).mcq ?? null

async function quizOnScreen() {
  for (let i = 0; i < 14; i++) {
    const [t] = await driveTurns(h, POST, [{ learnerSays: 'ok', modelReplies: `Teaching segment ${i}.` }], LANE)
    if (mcqOf(t)) return t
  }
  throw new Error('no quiz was ever served')
}

describe('a practice request with a held quiz', () => {
  // Production timing (pass 1): quiz shown (slot 4), one unanswered turn
  // (slot 5), then the practice request (slot 6) — the turn the release fires.
  it('on the release turn, "quiz me" still gets the quiz', async () => {
    await quizOnScreen()
    await driveTurns(h, POST, [
      { learnerSays: 'I think oxidation happens where electrons are gained.', modelReplies: 'Let us look at the electrodes again.' },
    ], LANE)
    const [q] = await driveTurns(h, POST, [{ learnerSays: 'quiz me', modelReplies: 'Here is a quick check.' }], LANE)
    expect(mcqOf(q)).not.toBeNull()
    expect(q.logs.some((l) => l.includes('released-pending-probe'))).toBe(false)
  }, 120_000)

  it('control: on the same turn without a practice request the held quiz is still released', async () => {
    await quizOnScreen()
    await driveTurns(h, POST, [
      { learnerSays: 'I think oxidation happens where electrons are gained.', modelReplies: 'Let us look at the electrodes again.' },
    ], LANE)
    const [t] = await driveTurns(h, POST, [{ learnerSays: 'why does that matter?', modelReplies: 'It decides which electrode loses mass.' }], LANE)
    expect(t.logs.some((l) => l.includes('released-pending-probe'))).toBe(true)
  }, 120_000)
})
