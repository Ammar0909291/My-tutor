import { describe, it, expect, vi, beforeEach } from 'vitest'
import { driveTurns, readLog, type TurnResult } from './support/turnHarness'

/**
 * AN EXPLICIT REQUEST TO THE TUTOR IS ANSWERED BEFORE THE AUTHORED-PROBE GATE.
 *
 * Rerun of the learner-intent A/B on the fixed tutor (2026-09-25), math.cat.topos,
 * both arms: the imperative follow-up below (no '?') was answered by the gate
 * with a canned "One to try, on Topos." and an authored probe, llmCallCount 0.
 * The LEARNER_QUESTION rung now also claims `readsAsRequestToTutor`.
 *
 * Method: fork the REAL route at the exact state where the gate fires — drive
 * "ok" until a turn serves an authored probe, rewind to just before it, and
 * send the request from that identical state instead.
 */
const h = await vi.hoisted(async () => (await import('./support/turnHarness')).createHarness())
vi.mock('@/lib/auth', () => ({ auth: () => h.auth() }))
vi.mock('@/lib/db/prisma', () => ({ prisma: h.prisma }))
vi.mock('@/lib/rateLimit', () => ({
  checkRateLimit: async () => ({ allowed: true }),
  rateLimitResponse: () => new Response('{}', { status: 429 }),
}))
vi.mock('@/lib/ai/router', async (o) => ({ ...(await o<Record<string, unknown>>()), routeAI: (...a: unknown[]) => h.routeAI(...a) }))
const { POST } = await import('@/app/api/learn/chat/route')
beforeEach(() => { h.state.messages = []; h.state.snapshot = {} })

const TOPOS_T3 = 'I mean specifically sheaves on a topological space X — show me how Sh(X) is a topos and what its subobject classifier is.'
const PROBES = [1, 2, 3, 4].map((n) => ({
  assetId: `probe-${n}`,
  conceptId: 'chem.elect.galvanic-cell',
  stem: `Q${n}: In a galvanic cell, where does oxidation occur?`,
  choices: [
    { text: `At the anode (${n})`, isCorrect: true },
    { text: `At the cathode (${n})`, isCorrect: false },
    { text: `In the salt bridge (${n})`, isCorrect: false },
  ],
}))
const LANE = { probes: PROBES, subjectSlug: 'chemistry', conceptId: 'chem.elect.galvanic-cell', lessonTitle: 'Galvanic Cells' }
const mcqOf = (t: TurnResult) => (t.body as { mcq?: { options?: string[] } | null }).mcq ?? null
const owner = (t: TurnResult) => (readLog(t, '[arbitration]') as { owner?: string } | null)?.owner ?? null

/** Returns the harness state from just before the first "ok" turn that served a probe. */
async function stateBeforeGateFires() {
  for (let i = 0; i < 14; i++) {
    const saved = JSON.parse(JSON.stringify({ messages: h.state.messages, snapshot: h.state.snapshot }))
    const [t] = await driveTurns(h, POST, [{ learnerSays: 'ok', modelReplies: `Teaching segment ${i}.` }], LANE)
    if (mcqOf(t)?.options) return saved
  }
  throw new Error('the gate never fired')
}
const restore = (s: { messages: typeof h.state.messages; snapshot: Record<string, unknown> }) => {
  h.state.messages = s.messages.map((m) => ({ ...m, createdAt: new Date(m.createdAt) }))
  h.state.snapshot = JSON.parse(JSON.stringify(s.snapshot))
}

describe('the quiz-gate rung', () => {
  it('from the state where "ok" gets a probe, the observed request is answered by the model instead', async () => {
    const saved = await stateBeforeGateFires()

    restore(saved)
    const [ok] = await driveTurns(h, POST, [{ learnerSays: 'ok', modelReplies: 'unused' }], LANE)
    expect(mcqOf(ok)?.options).toBeTruthy()                         // control: the gate fires here

    restore(saved)
    h.script.lastSystemPrompt = ''
    const [req] = await driveTurns(h, POST, [{ learnerSays: TOPOS_T3, modelReplies: 'Sh(X) is a topos because…' }], LANE)
    expect(owner(req)).toBe('LEARNER_QUESTION')
    expect(mcqOf(req)).toBeNull()                                   // no authored probe pre-empting it
    expect(req.systemPrompt.length).toBeGreaterThan(0)              // the model was actually asked
    expect((req.body as { text?: string }).text).toContain('Sh(X) is a topos')
  }, 120_000)

  it('an explicit practice request from the same state still gets the probe', async () => {
    const saved = await stateBeforeGateFires()
    restore(saved)
    const [t] = await driveTurns(h, POST, [{ learnerSays: 'give me a practice question please', modelReplies: 'unused' }], LANE)
    expect(owner(t)).not.toBe('LEARNER_QUESTION')
    expect(mcqOf(t)?.options).toBeTruthy()
  }, 120_000)
})
