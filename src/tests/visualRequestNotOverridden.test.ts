/**
 * A learner who asks for something must not have the request discarded.
 *
 * Measured live on chem.found.pure-substances — a concept with NO visual
 * binding — twice in one seven-turn beginner journey:
 *
 *     learner  "can you show me a picture?"
 *     tutor    "A question about Pure Substances and Mixtures now — read it
 *               carefully first."        [a graded question, no figure]
 *
 * The request was not declined; it was DISCARDED. A rendered deterministic
 * lead-in means the provider is never called for that turn, so nothing in the
 * turn ever saw what the learner typed.
 *
 * The three visual-availability states are covered here because the correct
 * behaviour differs in each and a fix aimed only at "no visual" would be
 * guessing:
 *
 *   A. a visual EXISTS      → show/explain it
 *   B. a generic/domain one → serve it, but it may not claim concept scope
 *   C. NO visual exists     → say so honestly and offer something useful
 *
 * All three share one requirement, which is what this pins: the turn must
 * reach something that can answer. The renderer cannot answer, so on a request
 * turn it must refuse.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { renderGateLeadIn, type GateLeadInInput } from '@/lib/teaching/gateAssessmentRenderer'
import { detectLearnerRequest } from '@/lib/teaching/masteryGate'
import { getConceptVisualType } from '@/lib/teaching/visualRegistry'

const base: GateLeadInInput = {
  question: 'Which of these is a homogeneous mixture?',
  conceptTitle: 'Pure Substances and Mixtures',
  teachingLanguage: 'en',
  hasPendingAnswerToReactTo: false,
  hasAttachedFigure: false,
  learnerMadeARequest: false,
}

describe('a request is answered, never overwritten by the gate lead-in', () => {
  it('the reported phrasing is a request the route already detects', () => {
    // The signal is not new. This is the function the route computes for the
    // teaching-action dispatch, ~800 lines before the gate runs.
    // All four phrasings the live probe used, so a narrowing of the detector
    // would fail here rather than silently re-opening the defect.
    for (const phrase of [
      'can you show me a picture?', 'show me a diagram',
      'can I see a picture of this?', 'is there a diagram for this?',
    ]) expect(detectLearnerRequest(phrase)).toBe('diagram')
    expect(detectLearnerRequest('can you give me a real life example?')).toBe('real_life_example')
    expect(detectLearnerRequest('explain it differently')).toBe('explain_differently')
  })

  it('the renderer REFUSES the turn when the learner made a request', () => {
    expect(renderGateLeadIn({ ...base, learnerMadeARequest: true })).toBeNull()
  })

  it('and still renders normally when they did not', () => {
    const lead = renderGateLeadIn(base)
    expect(lead).not.toBeNull()
    expect(lead!.length).toBeGreaterThan(0)
  })

  it('NEGATIVE CONTROL — an ordinary answer is not a request, so the gate is unaffected', () => {
    // The saving this renderer exists for must survive the fix. A learner
    // typing an answer, an acknowledgement, or a bare continuation still gets
    // the deterministic lead-in and still costs no provider call.
    for (const msg of ['B', 'the second one', 'ok', 'got it', 'yes', 'next']) {
      expect(detectLearnerRequest(msg)).toBeNull()
      expect(renderGateLeadIn({ ...base, learnerMadeARequest: detectLearnerRequest(msg) !== null })).not.toBeNull()
    }
  })

  it('the three earlier refusals are untouched', () => {
    expect(renderGateLeadIn({ ...base, hasPendingAnswerToReactTo: true })).toBeNull()
    expect(renderGateLeadIn({ ...base, hasAttachedFigure: true })).toBeNull()
    expect(renderGateLeadIn({ ...base, teachingLanguage: 'hi' })).toBeNull()
  })

  it('the route feeds it the already-computed signal, not a fresh detector', () => {
    const ROUTE = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')
    expect(ROUTE).toContain('learnerMadeARequest: learnerRequestHoisted !== null')
    // And the gate still attaches its question either way — a request must not
    // disable assessment, only stop overwriting the learner.
    expect(ROUTE).toContain('systemPrompt += buildGateAssessmentBlock(converted)')
  })

  it('the three visual-availability states are real, not hypothetical', () => {
    // A: curated. C: none — the concept from the live report. Both asserted
    // against the live registry so this test fails if the premise changes.
    expect(getConceptVisualType('phys.mech.newtons-first-law')).toBeTruthy()
    expect(getConceptVisualType('chem.found.pure-substances')).toBeFalsy()
  })
})
