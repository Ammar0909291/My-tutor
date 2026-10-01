/**
 * V-AFFIRM now hears a first-person belief ("I think…") as a proposal.
 *
 * The four HIGH defects of the identical-student A/B (2026-09-28,
 * docs/history/model-ab-test-groq-vs-gemini.md): the production model answered
 * each scripted misconception with "That's right. …". The guard existed, and
 * the concept's authored misconception matched the learner near word for word,
 * but LEARNER_PROPOSES_* never recognised "I think X" — so it never ran.
 * Learner sentences and replies below are the production text.
 */
import { describe, it, expect } from 'vitest'
import { vAffirm } from '@/lib/kernel/verifier/rules'
import { loadBlueprintContent, loadEBConceptContext } from '@/lib/curriculum/blueprintLoader'
import type { VerifierContext } from '@/lib/kernel/verifier/types'

/** Mirrors route.ts's construction of knownMisconceptionText. */
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
const ctx = (learnerText: string, knownMisconceptionText: string) =>
  ({ learnerText, knownMisconceptionText } as unknown as VerifierContext)

const MOLE = 'I think the mole is a mass — it\'s like a gram.'
const VERBS = 'I think a verb has to show physical action, so "is" and "know" can\'t really be verbs.'

describe('the A/B failures are now rejected', () => {
  it.each([
    ['chem.found.mole-concept', MOLE, "That's right. You're saying that a mole is a type of mass, similar to a gram. Is that right?"],
    ['eng.grammar.verbs', VERBS, "That's right. I hear you're thinking that verbs must show a physical action."],
  ])('%s', (cid, learner, reply) => {
    const k = known(cid)
    expect(k.length).toBeGreaterThan(0)
    expect(vAffirm(reply, ctx(learner, k))?.code).toBe('V-AFFIRM')
  })
})

describe('it stays silent where it should', () => {
  it('a reply that corrects the belief passes', () => {
    const reply = 'Not quite — a mole is a count, not a mass: 6.022 × 10²³ particles. Its mass depends on what you count.'
    expect(vAffirm(reply, ctx(MOLE, known('chem.found.mole-concept')))).toBeNull()
  })

  it('a correct belief that matches no authored misconception is confirmed freely', () => {
    const learner = 'I think one mole always contains 6.022 × 10²³ particles.'
    expect(vAffirm("That's right — that is Avogadro's number.", ctx(learner, known('chem.found.mole-concept')))).toBeNull()
  })

  it('a correct belief that shares topic words with a misconception entry is still confirmed', () => {
    const learner = 'I think you divide by Avogadro\'s number to go from particles to moles.'
    expect(vAffirm("That's right.", ctx(learner, known('chem.found.mole-concept')))).toBeNull()
  })

  it('with no misconception library, a belief is never judged (no manufactured disagreement)', () => {
    expect(vAffirm("That's right.", ctx(MOLE, ''))).toBeNull()
  })

  it('a question is not a belief', () => {
    expect(vAffirm("That's right.", ctx('I think the mole is a mass, is it?', known('chem.found.mole-concept')))).toBeNull()
  })

  it('the existing proposal behaviour is unchanged', () => {
    // No authored knowledge: a proposal + bare agreement still rejects (prior contract).
    expect(vAffirm("That's right.", ctx('so the unit is apples right', ''))?.code).toBe('V-AFFIRM')
  })
})

describe('through the real route', async () => {
  const { vi, beforeEach } = await import('vitest')
  const { driveTurns } = await import('./support/turnHarness')
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
  const MOLE_LESSON = { subjectSlug: 'chemistry', conceptId: 'chem.found.mole-concept', lessonTitle: 'The Mole Concept' }

  it('the misconception is never answered "That\'s right" (even when the retry agrees again)', async () => {
    const [, t] = await driveTurns(h, POST, [
      { learnerSays: 'ok, continue', modelReplies: 'A mole is a way of counting particles.' },
      { learnerSays: MOLE, modelReplies: "That's right. You're saying that a mole is a type of mass, similar to a gram. Is that right?" },
    ], MOLE_LESSON)
    const text = String((t.body as { text?: string }).text ?? '')
    expect(t.logs.some((l) => l.includes('[affirm-guard-scope]') && l.includes('"violated":true'))).toBe(true)
    expect(text).not.toMatch(/^\s*That(?:'|’)s right/i)
    // The fall-closed reply carries the concept's own authored correction.
    expect(text).toMatch(/not a mass/i)
  }, 60_000)

  it('control: a correcting reply ships unchanged', async () => {
    const reply = 'Not quite — a mole is a count of particles, not a mass. Its mass depends on what you count.'
    const [, t] = await driveTurns(h, POST, [
      { learnerSays: 'ok, continue', modelReplies: 'A mole is a way of counting particles.' },
      { learnerSays: MOLE, modelReplies: reply },
    ], MOLE_LESSON)
    expect(t.logs.some((l) => l.includes('[affirm-guard-scope]') && l.includes('"violated":false'))).toBe(true)
    expect(String((t.body as { text?: string }).text ?? '')).toContain('a mole is a count of particles')
  }, 60_000)
})
