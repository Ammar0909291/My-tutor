/**
 * Feedback went to the previous question.
 *
 * MEASURED LIVE 2026-10-02 (real account, chem.found.concentration): the
 * learner tapped "No" on "A student dissolves 40g NaOH … in 1 litre of water
 * and says 'this is exactly 1M.' Is that correct?" — graded correct
 * ([mcq-grade] asked 'A student dissolves 40g NaOH…', correct:true). The reply:
 * "That's correct — you recognized that ppm means milligrams per kilogram…",
 * the PREVIOUS question's topic. The verdict block named the right question,
 * but thousands of tokens before the end of the prompt. The graded question is
 * now restated as the prompt's last line.
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
  assetId: `probe-${n}`, conceptId: 'chem.found.concentration', stem: `Q${n}: Is 40g NaOH in 1 litre of water exactly 1M?`,
  choices: [{ text: `No (${n})`, isCorrect: true }, { text: `Yes (${n})`, isCorrect: false }],
}))
const LANE = { probes: PROBES, subjectSlug: 'chemistry', conceptId: 'chem.found.concentration', lessonTitle: 'Concentration Units' }
const mcqOf = (t: TurnResult) => (t.body as { mcq?: { question?: string; options?: string[] } | null }).mcq ?? null

describe('a graded turn names the answered question last', () => {
  it('the main prompt ends with that question and its grade', async () => {
    let mcq: { question?: string; options?: string[] } | null = null
    for (let i = 0; i < 14 && !mcq; i++) {
      const [t] = await driveTurns(h, POST, [{ learnerSays: 'ok', modelReplies: `Teaching segment ${i}.` }], LANE)
      mcq = mcqOf(t)
    }
    expect(mcq).not.toBeNull()
    prompts.length = 0
    await driveTurns(h, POST, [{ learnerSays: mcq!.options!.find((o) => o.startsWith('No'))!, modelReplies: 'That is right.' }], LANE)
    const main = prompts[0]
    expect(main.trimEnd()).toMatch(/every earlier question is already settled\.$/)
    expect(main.slice(-400)).toContain(mcq!.question!.slice(0, 40))
    expect(main.slice(-400)).toContain('graded CORRECT')
  }, 120_000)

  it('an ungraded turn adds nothing', async () => {
    await driveTurns(h, POST, [{ learnerSays: 'ok', modelReplies: 'Teaching.' }], LANE)
    for (const p of prompts) expect(p).not.toContain("THIS TURN'S ANSWER")
  }, 120_000)
})
