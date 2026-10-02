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

/**
 * LIVE 2026-10-02 (chem.found.stoichiometry, deploy 5c8d576e): on "quiz me" the
 * cut left "Let me check your thinking with this." + the authored quiz — the
 * right answer to a practice request — and the repair replaced it with "We
 * still need to work through the thermite problem I gave earlier" (no such
 * problem existed) plus a second typed question beside the card.
 */
describe('the repair never fires on a practice request, and never adds a question', () => {
  async function cutTurn(learnerSays: string) {
    for (let i = 0; i < 16; i++) {
      const [t] = await driveTurns(h, POST, [{ learnerSays, modelReplies: 'What is the next step shown in the diagram?' }], LANE)
      if (t.logs.some((l) => l.includes('stray-question-alongside-mcq'))) return t
    }
    return null
  }

  it('"quiz me" keeps the hand-off line and the quiz; no repair runs', async () => {
    const t = await cutTurn('quiz me')
    expect(t, 'the gate-contract cut never fired').not.toBeNull()
    expect(mcqOf(t!)).not.toBeNull()
    expect(t!.logs.some((l) => l.includes('"source":"gate-contract"'))).toBe(false)
  }, 180_000)

  it('a repair that asks its own question beside the card is discarded', async () => {
    h.routeAI = async (...args: unknown[]) => {
      if (String(args[1] ?? '').includes('OUTPUT REJECTED (server-side check)')) {
        return { text: 'We still need the thermite problem I gave earlier. Which reactant limits the reaction?', provider: 'harness', finishReason: 'stop' }
      }
      return baseRouteAI(...args)
    }
    let cut: TurnResult | null = null
    for (let i = 0; i < 16 && !cut; i++) {
      const [t] = await driveTurns(h, POST, [{ learnerSays: 'i think 2.5 m/s', modelReplies: 'How did you work out the 2.5 m/s value?' }], LANE)
      if (t.logs.some((l) => l.includes('stray-question-alongside-mcq'))) cut = t
    }
    expect(cut).not.toBeNull()
    expect(textOf(cut!)).not.toContain('thermite')
    expect(cut!.logs.some((l) => l.includes('repair-asked-a-question-beside-the-card'))).toBe(true)
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

/**
 * LIVE 2026-10-02 (chem.found.measurement, deploy a96b53fb). A correct tap; the
 * model wrote "That's right. How did you arrive at 2.50 dm³? Could you walk me
 * through the steps …?" with no card attached. The cut's reason was
 * no-gradeable-probe, the repair was wired only for
 * stray-question-alongside-mcq, and the learner got a bare "That's right.".
 */
describe('a no-gradeable-probe cut is repaired too, and the repair adds no question', () => {
  const POOL = { ...LANE, probes: PROBES.slice(0, 3) }
  const STRAY = "That's right. How did you arrive at that answer? Could you walk me through the steps you used?"

  // At DEMONSTRATE the gate declines a 3-probe pool (below-guide-no-surplus),
  // so no card is attached and the cut's reason is no-gradeable-probe.
  async function noCardCut() {
    for (let i = 0; i < 8; i++) {
      h.state.messages = []; h.state.snapshot = {}
      const res = await driveTurns(h, POST, [
        { learnerSays: 'ok', modelReplies: 'Momentum is mass times velocity. In a collision the total momentum stays the same.' },
        { learnerSays: 'ok', modelReplies: STRAY },
      ], POOL)
      const t = res[1]
      if (t.logs.some((l) => l.includes('"reason":"no-gradeable-probe"'))) return t
    }
    return null
  }

  it('the learner gets the repair, not "That\'s right."', async () => {
    const t = await noCardCut()
    expect(t, 'the no-gradeable-probe cut never fired').not.toBeNull()
    expect(mcqOf(t!)).toBeNull()
    expect(textOf(t!)).toContain('2.2 metres per second')
    expect(t!.logs.some((l) => l.includes('[stub-repair]') && l.includes('"source":"gate-contract"'))).toBe(true)
  }, 180_000)

  it('a question in the repair is dropped even with no card, its teaching kept', async () => {
    h.routeAI = async (...args: unknown[]) => {
      if (String(args[1] ?? '').includes('OUTPUT REJECTED (server-side check)')) {
        return { text: REPAIR + ' Can you try the next one the same way?', provider: 'harness', finishReason: 'stop' }
      }
      return baseRouteAI(...args)
    }
    const t = await noCardCut()
    expect(t).not.toBeNull()
    expect(textOf(t!)).toContain('2.2 metres per second')
    expect(textOf(t!)).not.toContain('Can you try the next one')
  }, 180_000)

  it('the instruction forbids a question for a question cut even with no card', () => {
    const a = buildConfirmBackRepairAppendix({ graded: null, chosenOption: null, correctOption: null, cause: 'question-cut' })
    expect(a).toMatch(/do NOT ask/i)
  })
})
