import { describe, it, expect } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { resolveVisualTarget, requestTargetsSomethingElse } from '@/lib/teaching/visual/resolveVisualTarget'

/**
 * THE OFF-CURRICULUM REQUEST — the wrong-figure case no downstream gate catches.
 *
 * Target resolution matches the learner's words against a KG index and falls
 * back to the lesson when nothing matches. A topic the curriculum has never
 * heard of CANNOT match, so it fell back silently. Measured before this rule
 * existed, in a `phys.meas.units` lesson:
 *
 *   "Explain Kubernetes pod scheduling"
 *      -> target phys.meas.units · origin lesson-concept · excursion false
 *
 * Every check downstream would then have agreed, because they all ask "is this
 * a good figure of the concept it claims to be" — and a generated SI-units
 * figure is exactly that. The claim is what was wrong.
 *
 * The bar for firing is POSITIVE evidence that a different topic was named,
 * because a false suppression costs a learner a figure they should have had.
 * The table below is the measurement: every phrasing a real learner types
 * during a lesson, and what the rule must do with it.
 */

const LESSON = 'phys.meas.units'   // "SI Units and Measurement"

function target(message: string) {
  return resolveVisualTarget(message, LESSON, 'physics')!
}

describe('Off-curriculum request — the rule fires only on a named topic', () => {
  const NAMES_ANOTHER_TOPIC = [
    'Explain Kubernetes pod scheduling',
    'explain kubernetes pod scheduling',
    'teach me about docker container networking',
    'what is transformer attention',
    'can you explain byzantine fault tolerance',
    'show me how mortgage amortisation works',
  ]

  for (const message of NAMES_ANOTHER_TOPIC) {
    it(`suppresses: "${message}"`, () => {
      expect(requestTargetsSomethingElse(message, target(message))).toBe(true)
    })
  }

  const ABOUT_THE_LESSON = [
    'explain this again please',
    'explain it more simply',
    'can you explain that again',
    'explain differently',
    'show me a diagram',
    'what is this',
    'tell me more',
    'explain the units again',
    'what is a base unit',
    'teach me measurement',
    'i want to learn more about measurement',
    'explain why units matter',
  ]

  for (const message of ABOUT_THE_LESSON) {
    it(`allows: "${message}"`, () => {
      expect(requestTargetsSomethingElse(message, target(message))).toBe(false)
    })
  }

  it('never fires on a concept the learner actually named', () => {
    // origin `learner-request` means the KG recognised the topic; by
    // construction the figure IS what was asked for.
    const t = resolveVisualTarget('teach me vectors', LESSON, 'physics')!
    expect(t.origin).toBe('learner-request')
    expect(requestTargetsSomethingElse('teach me vectors', t)).toBe(false)
  })
})

describe('Off-curriculum request — what the authority returns', () => {
  it('declines rather than drawing the lesson the learner did not ask about', () => {
    const d = resolveVisual({
      message: 'Explain Kubernetes pod scheduling',
      lessonConceptId: LESSON,
      subject: 'physics',
      learnerRequest: 'diagram',
    })
    expect(d.graphical).toBe(false)
    expect(d.payload).toBeNull()
    expect(d.provenance).toBe('no-figure:request-names-an-uncatalogued-topic')
    expect(d.continuityReason).toBe('request-off-topic')
    // It does not claim the lesson concept either: naming one would tell the
    // tutor a figure of SI units was considered for a Kubernetes question.
    expect(d.conceptId).toBeNull()
  })

  it('never takes away a figure already on the learner screen', () => {
    // Suppression withholds a NEW figure; a held one belongs to continuity.
    // Getting this backwards would blank the screen mid-explanation.
    const d = resolveVisual({
      message: 'Explain Kubernetes pod scheduling',
      lessonConceptId: 'phys.meas.vector-addition',
      subject: 'physics',
      activeSession: {
        conceptId: 'phys.meas.vector-addition',
        representation: 'vector',
        renderer: 'scene',
        returnToConceptId: null,
        turns: 1,
      },
      lastAssistantAskedQuestion: false,
    })
    expect(d.graphical).toBe(true)
    expect(d.conceptId).toBe('phys.meas.vector-addition')
  })

  it('an ordinary lesson turn is untouched', () => {
    const d = resolveVisual({
      message: 'explain this again please',
      lessonConceptId: 'phys.meas.vector-addition',
      subject: 'physics',
      learnerRequest: 'explain_differently',
    })
    expect(d.conceptId).toBe('phys.meas.vector-addition')
    expect(d.graphical).toBe(true)
  })
})
