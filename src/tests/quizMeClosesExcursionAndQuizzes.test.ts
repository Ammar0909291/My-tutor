/**
 * "quiz me" after a side question closed the detour and still got no quiz.
 *
 * 2026-09-30 learner baseline, P4 (phys.mech.collisions-inelastic, real
 * account): "what is deform?" opened a side-topic excursion. On "quiz me" the
 * excursion closed this turn (`closed-wants-practice` — the exit exists so the
 * learner can be assessed), but the gate read `notExcursion: false` from the
 * closing turn's own attribution, so no authored probe was attached and the
 * reply fell back to a KG summary. The closing turn of THIS exit is exactly
 * the turn the learner asked to be assessed on.
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

const PROBES = [1, 2, 3, 4].map((n) => ({
  assetId: `probe-${n}`, conceptId: 'chem.elect.galvanic-cell', stem: `Q${n}: In a galvanic cell, where does oxidation occur?`,
  choices: [{ text: `At the anode (${n})`, isCorrect: true }, { text: `At the cathode (${n})`, isCorrect: false }],
}))
const LANE = { probes: PROBES, subjectSlug: 'chemistry', conceptId: 'chem.elect.galvanic-cell', lessonTitle: 'Galvanic Cells' }
const mcqOf = (t: TurnResult) => (t.body as { mcq?: { question?: string; options?: string[] } | null }).mcq ?? null

async function answeredFirstQuiz() {
  for (let i = 0; i < 14; i++) {
    const [t] = await driveTurns(h, POST, [{ learnerSays: 'ok', modelReplies: `Teaching segment ${i}.` }], LANE)
    const mcq = mcqOf(t)
    if (mcq) {
      const right = mcq.options!.find((o) => o.startsWith('At the anode'))!
      await driveTurns(h, POST, [{ learnerSays: right, modelReplies: 'Yes — oxidation happens at the anode.' }], LANE)
      return
    }
  }
  throw new Error('no quiz was ever served')
}

const openExcursion = () => {
  h.state.snapshot = {
    ...h.state.snapshot,
    excursion: { active: true, targetTopicTitle: 'deformation', returnToConceptId: 'chem.elect.galvanic-cell', turns: 2 },
  }
}

describe('quiz me closes the detour AND gets the quiz', () => {
  it('the production shape: the excursion closes and a question is attached', async () => {
    await answeredFirstQuiz()
    openExcursion()
    const [t] = await driveTurns(h, POST, [{ learnerSays: 'quiz me', modelReplies: 'Here is a quick check.' }], LANE)
    expect(readLog(t, '[excursion]')).toMatchObject({ transition: 'closed-wants-practice', active: false })
    expect(mcqOf(t)).not.toBeNull()
  }, 120_000)

  it('control: any other close of the detour still credits nothing and attaches nothing extra', async () => {
    await answeredFirstQuiz()
    openExcursion()
    const [t] = await driveTurns(h, POST, [{ learnerSays: 'ok got it, thanks', modelReplies: 'Back to galvanic cells.' }], LANE)
    const ex = readLog(t, '[excursion]') as { transition?: string } | null
    expect(ex?.transition).not.toBe('closed-wants-practice')
    const gate = readLog(t, '[gate-eligibility]') as { terms?: { notExcursion?: boolean } } | null
    if (gate?.terms) expect(gate.terms.notExcursion).toBe(false)
  }, 120_000)
})
