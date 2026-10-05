/**
 * CHEM-035 (2026-10-05, chem.equil.concept #58, account 4; production session
 * rows read-only). The learner tapped "The concentrations of all species remain
 * unchanged." on a MODEL-WRITTEN card ("Which of the following is NOT an
 * observable characteristic…" — not in the corpus, so no authored key). The
 * reply was "I see you chose “No.” Could you walk me through how you decided
 * that a mixture with 95 % reactants…" — the answer to a card two turns back.
 * On an unkeyed tap the neutral assembled reply (the idea the question tests,
 * no verdict) now also replaces a live reply that quotes an answer the learner
 * did not give.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { misattributesChoice, neutralServeDecision } from '@/lib/teaching/neutralAssembly'

const OPTIONS = [
  'The concentrations of all species remain unchanged.',
  'The system must be open to allow material exchange.',
  'The same equilibrium composition is reached whether you begin with reactants or products.',
  'Changing the temperature will shift the equilibrium position.',
]
const LIVE = 'I see you chose “No.” Could you walk me through how you decided that a mixture with 95 % reactants and 5 % products isn’t at equilibrium?'
const GOOD = 'At equilibrium the forward and reverse reactions keep running at equal rates, so nothing you can measure changes. An open system loses material, so it can never settle into equilibrium at all.'

describe('misattributesChoice', () => {
  it('flags the production reply (it quotes "No"; the learner tapped option A)', () => {
    expect(misattributesChoice(LIVE, OPTIONS, 0)).toBe(true)
  })
  it('does not flag a reply that quotes the learner\'s actual choice, its letter, or quotes nothing', () => {
    expect(misattributesChoice('You chose “The concentrations of all species remain unchanged.” That is observable.', OPTIONS, 0)).toBe(false)
    expect(misattributesChoice('You picked "A". Let us look at why.', OPTIONS, 0)).toBe(false)
    expect(misattributesChoice('Equilibrium means constant concentrations.', OPTIONS, 0)).toBe(false)
  })
})

describe('neutralServeDecision', () => {
  it('replaces a misattributing live reply even when it is not a stub', () => {
    const d = neutralServeDecision({ mode: 'serve', liveText: LIVE, cardOnScreen: false, codes: [], feedback: GOOD, leadIn: null, liveMisattributes: true })
    expect(d.liveStub).toBe(false)
    expect(d.serve).toBe(true)
    expect(d.assembled).toBe(GOOD)
  })
  it('a correct, non-stub live reply is still kept', () => {
    expect(neutralServeDecision({ mode: 'serve', liveText: GOOD, cardOnScreen: false, codes: [], feedback: GOOD, leadIn: null, liveMisattributes: false }).serve).toBe(false)
  })
  it('the route passes the check and logs it', () => {
    const SRC = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')
    expect(SRC).toMatch(/const liveMisattributes = na\.misattributesChoice\(servedText, r\.facts\.options, r\.facts\.chosenIndex\)/)
    expect(SRC).toMatch(/codes, liveStub, liveMisattributes, served:/)
  })
})
