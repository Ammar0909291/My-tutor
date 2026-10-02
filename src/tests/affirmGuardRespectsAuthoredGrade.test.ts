/**
 * A CORRECT ANSWER, GRADED BY THE AUTHORED KEY, IS NOT TREATED AS A GUESS
 * (real-learner baseline 2026-10-01, C2 chem.equil.le-chatelier, log 18:47:03).
 *
 * The learner tapped "Four on the left and two on the right, so it shifts to
 * the right" — the correct authored option. `[mcq-grade] correct:true`,
 * gradeSource server-key. V-AFFIRM then read the option text as a proposal
 * ("…, so it shifts…"), found two words shared with the concept's authored
 * misconceptions, rejected the model's "That's correct", and the learner got
 * "Let's check that one carefully rather than me just agreeing — …". On the next
 * turn the model told them the correct answer had been wrong.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { vAffirm } from '@/lib/kernel/verifier/rules'
import { loadBlueprintContent, loadEBConceptContext } from '@/lib/curriculum/blueprintLoader'
import type { VerifierContext } from '@/lib/kernel/verifier/types'
import { driveTurns, type TurnResult } from './support/turnHarness'

const h = await vi.hoisted(async () => (await import('./support/turnHarness')).createHarness())
vi.mock('@/lib/auth', () => ({ auth: () => h.auth() }))
vi.mock('@/lib/db/prisma', () => ({ prisma: h.prisma }))
vi.mock('@/lib/rateLimit', () => ({ checkRateLimit: async () => ({ allowed: true }), rateLimitResponse: () => new Response('{}', { status: 429 }) }))
vi.mock('@/lib/ai/router', async (o) => ({ ...(await o<Record<string, unknown>>()), routeAI: (...a: unknown[]) => h.routeAI(...a) }))
const { POST } = await import('@/app/api/learn/chat/route')
beforeEach(() => { h.state.messages = []; h.state.snapshot = {} })

const CID = 'chem.equil.le-chatelier'
function known(cid: string): string {
  let out = ''
  const bp = loadBlueprintContent(cid)
  if (bp.found) for (const mc of bp.content.misconceptions) out += `\n${mc.title} ${mc.characteristicPhrase ?? ''}`
  const eb = loadEBConceptContext(cid)
  if (eb.found) {
    for (const mc of eb.context.ebMisconceptions) out += `\n${mc.title} ${mc.symptom ?? ''}`
    for (const a of eb.context.antiAnalogies) out += `\n${a}`
  }
  return out.trim()
}
const CORRECT = 'Four on the left and two on the right, so it shifts to the right'
const REPLY = "That's correct — four moles of gas on the left and two on the right, so higher pressure pushes the equilibrium to the right."

describe('the production text', () => {
  it('the rule alone rejects this correct confirmation (why the authored grade must decide)', () => {
    expect(vAffirm(REPLY, { learnerText: CORRECT, knownMisconceptionText: known(CID) } as unknown as VerifierContext)?.code).toBe('V-AFFIRM')
  })
})

const PROBES = [1, 2, 3, 4].map((n) => ({
  assetId: `probe-${n}`, conceptId: CID,
  stem: `Q${n}: For N₂(g) + 3H₂(g) ⇌ 2NH₃(g), raising the pressure shifts the equilibrium towards the side with fewer moles of gas. How many moles of gas are on each side, and which way does it shift (case ${n})?`,
  choices: [
    { text: 'Four on each side, so pressure has no effect', isCorrect: false },
    { text: 'Three on the left and two on the right, so it shifts to the right', isCorrect: false },
    { text: CORRECT, isCorrect: true },
  ],
}))
const LANE = { probes: PROBES, subjectSlug: 'chemistry', conceptId: CID, lessonTitle: "Le Chatelier's Principle" }
const mcqOf = (t: TurnResult) => (t.body as { mcq?: { question?: string; options?: string[] } | null }).mcq ?? null

describe('through the real route', () => {
  it('the correct tap keeps the model\'s confirmation', async () => {
    let onScreen: TurnResult | null = null
    for (let i = 0; i < 14 && !onScreen; i++) {
      const [t] = await driveTurns(h, POST, [{ learnerSays: 'ok', modelReplies: `Pressure and moles of gas, part ${i}.` }], LANE)
      if (mcqOf(t)) onScreen = t
    }
    expect(onScreen, 'no quiz was served').not.toBeNull()
    const [t] = await driveTurns(h, POST, [{ learnerSays: CORRECT, modelReplies: REPLY }], LANE)
    const text = String((t.body as { text?: string }).text ?? '')
    expect(t.logs.some((l) => l.includes('[mcq-grade]') && l.includes('"correct":true'))).toBe(true)
    expect(text).not.toMatch(/rather than me just agreeing/)
    expect(text).toMatch(/correct|right/i)
    expect(t.logs.some((l) => l.includes('graded-correct-by-authored-key'))).toBe(true)
  }, 180_000)
})
