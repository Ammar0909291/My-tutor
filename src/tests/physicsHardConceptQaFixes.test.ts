/**
 * THREE DEFECTS FROM THE 5-HARD-CONCEPT PRODUCTION RUN (2026-09-24, real account).
 *
 * D1  A reply told the learner to choose from options that were never shown.
 * D3  An explicit picture request was silently ignored where no figure exists.
 * D4  A general-illustration grid was introduced as "the motion graph" in a
 *     thermodynamics lesson.
 * Each case below is the production text or shape, not a paraphrase.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'
import { enforceQuestionDeliveryContract, dropSentencesPointingAtMissingOptions } from '@/lib/teaching/gateAssessment'
import {
  acknowledgeUnavailablePicture, ensureVisualAcknowledged, NO_PICTURE_AVAILABLE_LINE,
} from '@/lib/teaching/visual/visualAcknowledgement'
import type { VisualDecision } from '@/lib/teaching/visual/types'

const FALLBACK = 'FALLBACK'

describe('D1 — no "pick an option" without options', () => {
  it('lc-circuits: keeps the correct teaching, drops the promise of options', () => {
    const t = 'Yes – the resonant angular frequency is ω₀ = 1/√(LC). That cuts the frequency in half. So your intuition is correct. '
      + 'Now, to check your understanding of how an ideal (zero‑resistance) LC circuit behaves, pick the best answer: '
      + "Let me know which option you choose when you're ready."
    const out = enforceQuestionDeliveryContract(t, FALLBACK)
    expect(out).toContain('So your intuition is correct.')
    expect(out).not.toMatch(/pick the best answer|which option you choose/i)
  })

  it('particle-in-box: drops "which of the following … ?" but keeps the figure pointer after it', () => {
    const t = 'When the width L is doubled, the new ground-state energy becomes 1/4 of the original value. '
      + 'Now predict what happens if the well is made twice as wide: which of the following statements is correct, and why? '
      + 'Take a look at the labelled figure beside this message — it shows Particle in an Infinite Square Well.'
    const out = enforceQuestionDeliveryContract(t, FALLBACK)
    expect(out).not.toMatch(/which of the following/i)
    expect(out).toContain('1/4 of the original value')
    expect(out).toContain('Take a look at the labelled figure')
  })

  it('a prose question that carries its own options is left alone', () => {
    const inline = 'Which of the following is a vector? A) mass B) velocity C) time'
    expect(dropSentencesPointingAtMissingOptions(inline)).toBe(inline)
    const lined = 'Which of the following is a vector?\nA) mass\nB) velocity\nC) time'
    expect(dropSentencesPointingAtMissingOptions(lined)).toBe(lined)
  })

  it('ordinary prose using "the following" is untouched', () => {
    const t = 'Good work. The following example shows why energy is conserved.'
    expect(enforceQuestionDeliveryContract(t, FALLBACK)).toBe(t)
  })

  it('a reply that was ONLY the promise falls back instead of shipping empty', () => {
    expect(enforceQuestionDeliveryContract('Pick the best answer.', FALLBACK)).toBe(FALLBACK)
  })

  it('the pre-existing trailing-colon rule still holds', () => {
    expect(enforceQuestionDeliveryContract("Good. Here's the question:", FALLBACK)).toBe(FALLBACK)
  })
})

describe('D3 — an unmet picture request is said out loud', () => {
  const base = { learnerAskedForPicture: true, figureAttachedThisTurn: false, figureShownEarlierForConcept: false }
  const kepler = 'A comet whips past the Sun in weeks and then spends decades crawling through the far end of its orbit.'

  it('keplers-laws: the words-only reply now opens by saying there is no picture', () => {
    const r = acknowledgeUnavailablePicture({ ...base, text: kepler })
    expect(r.appended).toBe(true)
    expect(r.text.startsWith(NO_PICTURE_AVAILABLE_LINE)).toBe(true)
    expect(r.text).toContain(kepler)
  })

  it('silent whenever it would be untrue or redundant', () => {
    expect(acknowledgeUnavailablePicture({ ...base, text: kepler, learnerAskedForPicture: false }).appended).toBe(false)
    expect(acknowledgeUnavailablePicture({ ...base, text: kepler, figureAttachedThisTurn: true }).appended).toBe(false)
    expect(acknowledgeUnavailablePicture({ ...base, text: kepler, figureShownEarlierForConcept: true }).appended).toBe(false)
    expect(acknowledgeUnavailablePicture({ ...base, text: "I don't have a picture I can display here, but imagine an ellipse." }).appended).toBe(false)
    expect(acknowledgeUnavailablePicture({ ...base, text: '' }).appended).toBe(false)
  })

  it('route.ts wires it after the phantom-claim strip, from the turn\'s own request and the rendered-figure log', () => {
    const route = readFileSync(join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')
    const strip = route.indexOf("stripped a phantom visual claim")
    const call = route.indexOf('acknowledgeUnavailablePicture({')
    expect(strip).toBeGreaterThan(0)
    expect(call).toBeGreaterThan(strip)
    expect(route.slice(call, call + 600)).toMatch(/learnerAskedForPicture: learnerRequestHoisted === 'diagram'/)
    expect(route.slice(call, call + 600)).toMatch(/snapshotRRMLog\.some\(\(e\) => e\.matchedConcept === resolvedConceptId\)/)
  })
})

describe('D4 — a general illustration is named "figure", never by an inferred representation', () => {
  const decision = (scope: 'domain' | 'concept', representation: string) => ({
    graphical: true, purpose: 'explain',
    asset: { scope, representation, conceptTitle: 'Carnot Cycle' },
  }) as unknown as VisualDecision

  it('carnot-cycle: the domain-scope grid is "the figure", not "the motion graph"', () => {
    const r = ensureVisualAcknowledged('The efficiency depends only on the two temperatures.', decision('domain', 'motion_graph'), true)
    expect(r.text).toContain('Take a look at the figure beside this message — it\'s a general illustration related to the topic.')
    expect(r.text).not.toMatch(/motion graph/)
  })

  it('a concept-scope figure keeps its specific name', () => {
    const r = ensureVisualAcknowledged('Here is the idea.', decision('concept', 'free_body_diagram'), true)
    expect(r.text).toContain('Take a look at the free body diagram beside this message')
  })
})
