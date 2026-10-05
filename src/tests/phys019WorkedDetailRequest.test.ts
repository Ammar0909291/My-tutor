/**
 * PHYS-002 / PHYS-014 / PHYS-019 / PHYS-013 (2026-10-05, physics real-learner run).
 *
 * "give me example", "give me example with numbers please" and "explain
 * simpler. what is gamma and how i get 1.25?" are remediation turns, so the
 * curated remediation card owned them:
 *  - first such turn: the card verbatim (provider=memory, curated_remediation_card)
 *    — no numbers, an unrelated muon story (PHYS-002, PHYS-014);
 *  - later turns: the card HELD, and the output floor rejected any reply with
 *    notation as `went-beyond-card`. A worked example carries notation (θ,
 *    γ = 1/√(1 − v²/c²)), so draft and regeneration were both rejected and the
 *    fallback served "Let me put it in the simplest words I have." + the KG
 *    definition (PHYS-019: 42 of 45 such fallbacks in 3 days of production
 *    followed an "example" message, read-only SQL 2026-10-05).
 *
 * And "…you said 44 minutes. which is right?" read as 'confused'; the recovery
 * script ("No new content this turn") produced filler with no answer (PHYS-013).
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { asksForWorkedDetail, checkRemediationOutput } from '@/lib/teaching/remediationOutputContract'
import { detectLearnerRequest } from '@/lib/teaching/masteryGate'
import { findRemediationCard } from '@/lib/teaching/remediationCards'
import { buildRecoveryBlock } from '@/lib/teaching/recoveryGuard'

const ask = (m: string) => asksForWorkedDetail(m, detectLearnerRequest(m))

describe('asksForWorkedDetail', () => {
  it('reads the persona messages that the card ignored', () => {
    for (const m of [
      'give me example',
      'ok. give me example with numbers please',
      'explain simpler. what is gamma and how i get 1.25?',
      'i dont understand the muon story. i asked how to calculate gamma. where 1.25 come from?',
      'the fuzzy part is 1.25. v is 0.6c. how i put 0.6 in the formula? show me step by step',
      'can you give me example first, a simple one with a fast spaceship?',
    ]) expect(ask(m), m).toBe(true)
  })
  it('leaves plain confusion to the card it was written for', () => {
    for (const m of ['i dont understand', 'explain again please', 'explain simpler', 'sir i still not understand', 'ok',
      'what is friction?', 'yes', 'i got it', 'how i get better at physics']) expect(ask(m), m).toBe(false)
  })
})

describe('the mechanism, reproduced: a held card rejects the worked example asked for', () => {
  it('the step-by-step gamma calculation is `went-beyond-card` while the card holds — so it must not hold', () => {
    const lookup = findRemediationCard('phys.rel.time-dilation') as { servable: boolean; card?: { plainExplanation: string } }
    expect(lookup.servable).toBe(true)
    const v = checkRemediationOutput({
      remediationTurn: true, recoveryTurn: false, previousAssistantText: 'x', hasStructuredMcq: false,
      text: 'γ = 1/√(1 − v²/c²). With v = 0.6c: v²/c² = 0.36, 1 − 0.36 = 0.64, √0.64 = 0.8, so γ = 1/0.8 = 1.25.',
      heldCardText: lookup.card!.plainExplanation,
    })
    expect(v.violation).toBe('went-beyond-card')
    // With no card holding the turn, the same answer passes the floor.
    expect(checkRemediationOutput({
      remediationTurn: true, recoveryTurn: false, previousAssistantText: 'x', hasStructuredMcq: false,
      text: 'γ = 1/√(1 − v²/c²). With v = 0.6c: v²/c² = 0.36, 1 − 0.36 = 0.64, √0.64 = 0.8, so γ = 1/0.8 = 1.25.',
      heldCardText: null,
    }).violation).toBeNull()
  })
})

describe('route wiring (source)', () => {
  const SRC = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')
  it('the card yields before it can be served, held or bound', () => {
    const yieldAt = SRC.indexOf("event: 'yielded-to-learner-request'")
    const serveAt = SRC.indexOf('remediationCardText = renderRemediationCard(lookup.card)')
    expect(yieldAt).toBeGreaterThan(0)
    expect(yieldAt).toBeLessThan(serveAt)
    expect(SRC).toMatch(/const workedDetailAsked = asksForWorkedDetail\(learnerAuthoredMessage, learnerRequestHoisted\)/)
    expect(SRC).toMatch(/if \(lookup\.servable && workedDetailAsked\) \{[\s\S]{0,300}\} else if \(lookup\.servable\) \{/)
  })
  it('a recovery turn is told about a question in the learner\'s own words', () => {
    expect(SRC).toMatch(/learnerAskedAQuestion: \/\\\?\/\.test\(learnerAuthoredMessage\)/)
  })
})

describe('recovery answers the question first (PHYS-013)', () => {
  it('with a question: answer first, admit a slip, never invent a reason', () => {
    const b = buildRecoveryBlock('confused', false, 0, false, { learnerAskedAQuestion: true })
    expect(b).toMatch(/Answer it FIRST/)
    expect(b).toMatch(/never invent a reason/)
    expect(b).toMatch(/No new content beyond that answer/)
    expect(b.indexOf('Answer it FIRST')).toBeLessThan(b.indexOf('No new content'))
  })
  it('without one the script is unchanged', () => {
    const b = buildRecoveryBlock('confused', false, 0, false)
    expect(b).not.toMatch(/Answer it FIRST/)
    expect(b).toMatch(/No new content this turn\./)
  })
})
