/**
 * A STRAY-QUESTION CUT MUST NOT LEAVE THE LEARNER A STUB (real-learner
 * baseline, 2026-10-01).
 *
 * P4 (phys.mech.collisions-inelastic), log 19:14:25: the learner answered the
 * tutor's own cart problem with the classic averaging mistake ("i think 2.5
 * m/s"). The model's ENTIRE reply was "How did you work out the 2.5 m/s
 * value?"; an authored quiz was attached the same turn, so the one-question
 * contract (withholdUngradedGateQuestion, stray-question-alongside-mcq) cut the
 * question and the learner received only "Let me check your thinking with
 * this." Same shape in P2, P3, C1, C4; in P5 the cut left a bare "Not quite —
 * the answer is: …". The confirm-back strip already regenerates once when it
 * leaves a stub (repairStubReply); this cut did not.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { driveTurns, type TurnResult } from './support/turnHarness'
import { buildConfirmBackRepairAppendix } from '@/lib/teaching/confirmBackRepair'

const h = await vi.hoisted(async () => (await import('./support/turnHarness')).createHarness())
vi.mock('@/lib/auth', () => ({ auth: () => h.auth() }))
vi.mock('@/lib/db/prisma', () => ({ prisma: h.prisma }))
vi.mock('@/lib/rateLimit', () => ({ checkRateLimit: async () => ({ allowed: true }), rateLimitResponse: () => new Response('{}', { status: 429 }) }))
vi.mock('@/lib/ai/router', async (o) => ({ ...(await o<Record<string, unknown>>()), routeAI: (...a: unknown[]) => h.routeAI(...a) }))
const { POST } = await import('@/app/api/learn/chat/route')

const REPAIR = 'Not quite. Do not average the speeds. Add the two momenta: 2 × 4 + 3 × 1 = 11. Divide by the total mass, 5 kg, to get 2.2 metres per second.'
const baseRouteAI = h.routeAI
beforeEach(() => {
  h.state.messages = []; h.state.snapshot = {}
  // The scripted model answers the repair instruction with a real reply.
  h.routeAI = async (...args: unknown[]) => {
    if (String(args[1] ?? '').includes('OUTPUT REJECTED (server-side check)')) {
      return { text: REPAIR, provider: 'harness', finishReason: 'stop' }
    }
    return baseRouteAI(...args)
  }
})

const PROBES = [1, 2, 3, 4, 5].map((n) => ({
  assetId: `probe-${n}`, conceptId: 'phys.mech.collisions-inelastic',
  stem: `Q${n}: Two carts stick together after colliding. What stays the same (case ${n})?`,
  choices: [{ text: `Total momentum (${n})`, isCorrect: true }, { text: `Total kinetic energy (${n})`, isCorrect: false }],
}))
const LANE = { probes: PROBES, subjectSlug: 'physics', conceptId: 'phys.mech.collisions-inelastic', lessonTitle: 'Inelastic Collisions' }
const mcqOf = (t: TurnResult) => (t.body as { mcq?: { question?: string } | null }).mcq ?? null
const textOf = (t: TurnResult) => String((t.body as { message?: string; response?: string; text?: string }).message
  ?? (t.body as { response?: string }).response ?? (t.body as { text?: string }).text ?? '')

describe('a reply cut down to a stub by the one-question contract is regenerated once', () => {
  it('the P4 shape: the learner gets a real reply, not "Let me check your thinking with this."', async () => {
    let cut: TurnResult | null = null
    for (let i = 0; i < 16 && !cut; i++) {
      const [t] = await driveTurns(h, POST, [{ learnerSays: 'i think 2.5 m/s', modelReplies: 'How did you work out the 2.5 m/s value?' }], LANE)
      if (t.logs.some((l) => l.includes('stray-question-alongside-mcq'))) cut = t
    }
    expect(cut, 'the gate-contract cut never fired').not.toBeNull()
    const t = cut!
    expect(mcqOf(t)).not.toBeNull()
    expect(textOf(t)).not.toMatch(/^\s*Let me check your thinking with this\.\s*$/)
    expect(textOf(t)).toContain('2.2 metres per second')
    expect(t.logs.some((l) => l.includes('[stub-repair]') && l.includes('"source":"gate-contract"'))).toBe(true)
  }, 180_000)
})

describe('the repair instruction', () => {
  it('asks for a verdict on an answer to the tutor\'s own question', () => {
    const a = buildConfirmBackRepairAppendix({ graded: null, chosenOption: null, correctOption: null })
    expect(a).toMatch(/say plainly whether their answer is right or wrong, and why/)
  })
  it('forbids a second question when a question card follows', () => {
    expect(buildConfirmBackRepairAppendix({ graded: null, chosenOption: null, correctOption: null, questionFollows: true }))
      .toContain('do NOT ask a question yourself')
    expect(buildConfirmBackRepairAppendix({ graded: null, chosenOption: null, correctOption: null }))
      .not.toContain('do NOT ask a question yourself')
  })
})
