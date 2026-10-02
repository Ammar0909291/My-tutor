/**
 * A server-graded answer was answered with "So you're saying … is that right?".
 *
 * MEASURED LIVE 2026-10-01 (real account, chem.found.mole-concept): the learner
 * tapped the correct option of an authored quiz ([mcq-grade] correct:true,
 * [c5] servedGradedCorrect). The model's draft was "That's right. So you're
 * saying … Is that correct?" — because the OBSERVATION REPAIR block
 * (buildSignalRepairBlock: "restate what you understood … ask them to confirm")
 * was in the prompt, triggered by an earlier dropped signal. The confirm-back
 * strip then left the bare "That's right." stub, the stub repair regenerated,
 * and the learner received "I understand that you're saying … Is that right?"
 * — no verdict on an answer the server had already graded. Same shape after a
 * graded WRONG tap in the RC-C live run.
 *
 * A turn the server graded HAS its observation; the repair block must not
 * fire on it.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { driveTurns, type TurnResult } from './support/turnHarness'

const h = await vi.hoisted(async () => (await import('./support/turnHarness')).createHarness())
vi.mock('@/lib/auth', () => ({ auth: () => h.auth() }))
vi.mock('@/lib/db/prisma', () => ({ prisma: h.prisma }))
vi.mock('@/lib/rateLimit', () => ({ checkRateLimit: async () => ({ allowed: true }), rateLimitResponse: () => new Response('{}', { status: 429 }) }))
vi.mock('@/lib/ai/router', async (o) => ({ ...(await o<Record<string, unknown>>()), routeAI: (...a: unknown[]) => h.routeAI(...a) }))
const { POST } = await import('@/app/api/learn/chat/route')

const prompts: string[] = []
const original = h.routeAI
h.routeAI = async (...a: unknown[]) => { prompts.push(String(a[1] ?? '')); return original(...a) }
beforeEach(() => { h.state.messages = []; h.state.snapshot = {}; prompts.length = 0 })

const PROBES = [1, 2, 3, 4, 5, 6].map((n) => ({
  assetId: `probe-${n}`, conceptId: 'chem.found.mole-concept', stem: `Q${n}: How many moles are 3.011 × 10²³ molecules?`,
  choices: [{ text: `0.5 mol (${n})`, isCorrect: true }, { text: `2 mol (${n})`, isCorrect: false }],
}))
const LANE = { probes: PROBES, subjectSlug: 'chemistry', conceptId: 'chem.found.mole-concept', lessonTitle: 'Mole Concept' }
const mcqOf = (t: TurnResult) => (t.body as { mcq?: { options?: string[] } | null }).mcq ?? null
const REPAIR = 'OBSERVATION REPAIR'

async function quizOnScreen() {
  for (let i = 0; i < 14; i++) {
    const [t] = await driveTurns(h, POST, [{ learnerSays: 'ok', modelReplies: `Teaching segment ${i}.` }], LANE)
    if (mcqOf(t)) return mcqOf(t)!
  }
  throw new Error('no quiz was ever served')
}
const dropASignal = () => {
  h.state.snapshot = { ...h.state.snapshot, progressionMetrics: { consecutiveMissingSignals: 3, missingSignalOnAnsweredTurn: 3 } }
}

describe('a graded tap is never answered with a restate-and-confirm', () => {
  it('the production shape: signal debt + a graded correct tap → no repair block', async () => {
    const mcq = await quizOnScreen()
    dropASignal()
    prompts.length = 0
    await driveTurns(h, POST, [{ learnerSays: mcq.options!.find((o) => o.startsWith('0.5 mol'))!, modelReplies: 'That is right — dividing by Avogadro gives 0.5 mol.' }], LANE)
    expect(prompts.length).toBeGreaterThan(0)
    expect(prompts.some((p) => p.includes(REPAIR))).toBe(false)
  }, 120_000)

  it('a graded wrong tap too', async () => {
    const mcq = await quizOnScreen()
    dropASignal()
    prompts.length = 0
    await driveTurns(h, POST, [{ learnerSays: mcq.options!.find((o) => o.startsWith('2 mol'))!, modelReplies: 'Not quite — you multiply instead of divide.' }], LANE)
    expect(prompts.some((p) => p.includes(REPAIR))).toBe(false)
  }, 120_000)

  it('control: signal debt on an ungraded typed answer still gets the repair', async () => {
    await driveTurns(h, POST, [{ learnerSays: 'ok', modelReplies: 'Teaching segment.' }], LANE)
    dropASignal()
    prompts.length = 0
    await driveTurns(h, POST, [{ learnerSays: 'I think the total stays the same', modelReplies: 'So you are saying it stays the same?' }], LANE)
    expect(prompts.some((p) => p.includes(REPAIR))).toBe(true)
  }, 120_000)
})
