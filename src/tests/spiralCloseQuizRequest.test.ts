/**
 * RC-C — THE LESSON-ONE DEADLOCK.
 *
 * In lesson one the affect budget is 1, so ONE graded miss closes the episode
 * as a spiral (applySignalToEpisode). A spiral close reopens only on a correct
 * answer to an AUTHORED question — and CLOSING withheld every authored
 * question (CLOSE arbitration, notClosingTurn, the closing MCQ withhold). Seen
 * in production as "quiz me" refused nine times on a lesson that could no
 * longer be finished.
 *
 * Now: in a spiral close only, an explicit practice request serves one
 * authored probe; a correct answer takes the existing reopen. The explicit
 * close ("I'm done") stays absolute.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { driveTurns, readLog, type TurnResult } from './support/turnHarness'

const h = await vi.hoisted(async () => (await import('./support/turnHarness')).createHarness())
vi.mock('@/lib/auth', () => ({ auth: () => h.auth() }))
vi.mock('@/lib/db/prisma', () => ({ prisma: h.prisma }))
vi.mock('@/lib/rateLimit', () => ({ checkRateLimit: async () => ({ allowed: true }), rateLimitResponse: () => new Response('{}', { status: 429 }) }))
vi.mock('@/lib/ai/router', async (o) => ({ ...(await o<Record<string, unknown>>()), routeAI: (...a: unknown[]) => h.routeAI(...a) }))
const { POST } = await import('@/app/api/learn/chat/route')

beforeEach(() => { h.state.messages = []; h.state.snapshot = {} })

// Six, like production physics (every pair at five or more gradeable probes):
// the miss drops the ladder below GUIDE, where a probe is spent only while
// three remain afterwards (mayAttachProbeBelowGuide).
const PROBES = [1, 2, 3, 4, 5, 6].map((n) => ({
  assetId: `probe-${n}`, conceptId: 'phys.meas.units', stem: `Q${n}: Which of these is an SI base unit?`,
  choices: [{ text: `The kilogram (${n})`, isCorrect: true }, { text: `The newton (${n})`, isCorrect: false }],
}))
const LANE = { probes: PROBES, subjectSlug: 'physics', conceptId: 'phys.meas.units', lessonTitle: 'SI Units and Measurement', lessonOne: true }
type Mcq = { question?: string; options?: string[] }
const mcqOf = (t: TurnResult) => (t.body as { mcq?: Mcq | null }).mcq ?? null
const episode = () => (h.state.snapshot as { sessionEpisode?: { phase?: string; closedBy?: string } }).sessionEpisode

async function spiralClosed() {
  await driveTurns(h, POST, [
    { learnerSays: "ok, let's start", modelReplies: 'Two friends measure a plank with their hands and disagree.' },
    { learnerSays: 'ok, continue', modelReplies: 'A number alone says nothing until the unit is named.' },
    { learnerSays: 'ok', modelReplies: 'Scientists agree on a small set of base units.' },
  ], LANE)
  const [q] = await driveTurns(h, POST, [{ learnerSays: 'quiz me', modelReplies: 'Here is a quick check.' }], LANE)
  const wrong = mcqOf(q)!.options!.find((o) => o.startsWith('The newton'))!
  await driveTurns(h, POST, [{ learnerSays: wrong, modelReplies: 'Not quite — the newton is derived.' }], LANE)
  expect(episode()).toMatchObject({ phase: 'CLOSING', closedBy: 'spiral' })
}

describe('a spiral-closed lesson one', () => {
  it('"quiz me" is served one authored probe', async () => {
    await spiralClosed()
    const [t] = await driveTurns(h, POST, [{ learnerSays: 'quiz me', modelReplies: 'Here is a quick check.' }], LANE)
    expect(mcqOf(t)?.question).toMatch(/SI base unit/)
    expect(readLog(t, '[arbitration]')).toMatchObject({ owner: expect.not.stringMatching(/^CLOSE$/) })
  }, 120_000)

  it('a correct answer to it reopens the episode', async () => {
    await spiralClosed()
    const [t] = await driveTurns(h, POST, [{ learnerSays: 'quiz me', modelReplies: 'Here is a quick check.' }], LANE)
    const right = mcqOf(t)!.options!.find((o) => o.startsWith('The kilogram'))!
    await driveTurns(h, POST, [{ learnerSays: right, modelReplies: 'Yes — the kilogram is a base unit.' }], LANE)
    expect(episode()?.phase).toBe('CORE')
  }, 120_000)

  it('control: without a practice request the close still withholds questions', async () => {
    await spiralClosed()
    const [t] = await driveTurns(h, POST, [{ learnerSays: 'ok', modelReplies: 'Let us pause here for today.' }], LANE)
    expect(mcqOf(t)).toBeNull()
    expect(readLog(t, '[arbitration]')).toMatchObject({ owner: 'CLOSE' })
  }, 120_000)
})
