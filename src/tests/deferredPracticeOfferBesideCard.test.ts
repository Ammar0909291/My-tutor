/**
 * "Let me know when you'd like another practice problem" beside a quiz card.
 *
 * MEASURED LIVE 2026-10-02 (real account): chem.found.concentration ended a
 * reply with it while the next authored quiz was already attached; the
 * stoichiometry and earlier concentration turns did the same ("If you'd like
 * to try another problem … just let me know!"). The learner is told to ask for
 * a problem that is already waiting under the message.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { dropDeferredPracticeOffer } from '@/lib/teaching/gateAssessment'

const LIVE = 'That’s right—ppm by mass means milligrams of solute per kilogram of material.\n\nUnderstanding that ppm usually refers to mass helps you see why.\n\nLet me know when you’d like another practice problem.'

describe('with a card attached', () => {
  it('drops the production closing offer and keeps the teaching', () => {
    const r = dropDeferredPracticeOffer(LIVE, true)
    expect(r).not.toMatch(/Let me know/)
    expect(r).toContain('ppm by mass')
    expect(r).toContain('Understanding that ppm')
  })

  it.each([
    'If you’d like to try another problem to solidify this, just let me know!',
    'When you’re ready, just let me know and I’ll give you a quick check question.',
    'Let me know when you’d like another practice problem.',
  ])('%s', (offer) => {
    expect(dropDeferredPracticeOffer(`Molarity is moles per litre. ${offer}`, true)).toBe('Molarity is moles per litre.')
  })

  it('keeps teaching that merely mentions problems', () => {
    const t = 'Let me know if anything in the next step is unclear. A limiting reagent problem always starts with moles.'
    expect(dropDeferredPracticeOffer(t, true)).toBe(t)
  })

  it('never empties a reply', () => {
    expect(dropDeferredPracticeOffer('Let me know when you’d like another problem.', true)).toBe('Let me know when you’d like another problem.')
  })
})

describe('without a card', () => {
  it('the offer is a real offer and stays', () => {
    expect(dropDeferredPracticeOffer(LIVE, false)).toBe(LIVE)
  })

  it('the route applies it only when an MCQ is attached', () => {
    const ROUTE = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')
    expect(ROUTE).toContain('dropDeferredPracticeOffer(cleanText, true)')
    const at = ROUTE.indexOf('dropDeferredPracticeOffer(cleanText, true)')
    expect(ROUTE.slice(Math.max(0, at - 300), at)).toContain('if (mcqHoisted)')
  })
})
