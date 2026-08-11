/**
 * A held figure must not survive the learner moving to a different topic.
 *
 * REPRODUCED FROM PRODUCTION (2026-08-11, deployment
 * dpl_Gsu5153jhJ4fd3pjqv2mnBK15MLV, session cmso15fsh0001l1043gzu7iwo). A
 * kinetic-energy graph was on screen; the learner then asked about SI units and
 * received, on three consecutive turns, the same kinetic-energy graph — which
 * the tutor narrated as though it were a figure about units:
 *
 *   turn 1  "Look at the plotted curve on your screen: the mass of two
 *            kilograms uses the SI unit for mass, and the velocity uses the SI
 *            unit for metres per second…"
 *   turn 3  "Look at the plotted curve on your screen: the mass of two
 *            kilograms and the units of speed on the axes are built directly
 *            from those fundamental base units."
 *
 * The axes are Velocity and Kinetic Energy, and no mass appears on the screen.
 *
 * The engine's guarantee is not "the figure is usually right" — it is that the
 * tutor never describes a figure the learner is not looking at. These tests
 * hold that guarantee at the continuity layer, and hold the follow-up
 * phrasings that must still keep their figure.
 */
import { describe, it, expect } from 'vitest'
import { decideContinuity, type VisualSession } from '@/lib/teaching/visual/session'
import { requestLeavesActiveFigure } from '@/lib/teaching/visual/resolveVisualTarget'
import { getKGNode } from '@/lib/curriculum/knowledgeGraph'

const LESSON = 'phys.mech.free-body-diagrams'
const ON_SCREEN = 'phys.mech.kinetic-energy'

const figureText = (conceptId: string) => {
  const node = getKGNode(conceptId)
  return `${node?.title ?? ''} ${node?.description ?? ''}`
}

const session: VisualSession = {
  conceptId: ON_SCREEN,
  representation: 'graph',
  renderer: 'graph',
  returnToConceptId: LESSON,
  turns: 1,
}

/** The production call shape: continuity asked with the on-screen figure's words. */
const continuity = (message: string, requestedConceptId: string | null = null) =>
  decideContinuity({
    session,
    message,
    lessonConceptId: LESSON,
    requestedConceptId,
    // The worst case for this defect: the tutor had just asked something, so
    // every short reply is already protected by the answer rule.
    lastAssistantAskedQuestion: true,
    requestLeftActiveFigure: requestLeavesActiveFigure(message, figureText(ON_SCREEN)),
  })

describe('a figure is released when the learner names a different topic', () => {
  it('releases the kinetic-energy graph on the exact production message', () => {
    const action = continuity('What are SI units and why do we need them?')
    expect(action.kind).toBe('switch')
    expect(action.reason).toBe('named-topic-left-the-figure')
  })

  it('draws NOTHING rather than substituting the lesson figure', () => {
    // The curriculum cannot name "SI units" at the excursion confidence floor,
    // so the switch target is null — and a null target is no figure. Swapping
    // in the lesson's own figure would be a second wrong figure, not a fix.
    const action = continuity('What are SI units and why do we need them?')
    expect(action.kind === 'switch' && action.targetConceptId).toBe(null)
  })

  it('switches to the named concept when the curriculum can name it', () => {
    const action = continuity('What is an electric field?', 'phys.em.electric-field')
    expect(action.kind).toBe('switch')
    expect(action.kind === 'switch' && action.targetConceptId).toBe('phys.em.electric-field')
  })
})

describe('the figure a learner is reading is never snatched away', () => {
  // Each of these reached the same catch-all hold as the defect. They must
  // still hold: releasing here would cost a learner the figure mid-explanation,
  // which is the failure the continuity law was written for.
  it.each([
    ['a request to repeat', 'Explain that again'],
    ['a request to simplify', 'explain it more simply'],
    ['a request for a picture, naming no topic', 'show me a diagram'],
    ['a bare question', 'Why?'],
    ['confusion', "I don't understand."],
    ['an answer to the tutor', 'The starting point.'],
  ])('holds on %s', (_label, message) => {
    expect(continuity(message).kind).toBe('hold')
  })

  it('holds when the named topic IS what the figure shows', () => {
    expect(continuity('What is kinetic energy?', ON_SCREEN).kind).toBe('hold')
  })

  it('holds when the named topic elaborates what the figure shows', () => {
    // One shared content word is deliberately enough: a false release costs a
    // learner a figure they were using, so the bar to keep it is low.
    expect(continuity('what is kinetic energy in a collision').kind).toBe('hold')
  })
})

describe('requestLeavesActiveFigure', () => {
  it('needs a named topic — a request alone never releases', () => {
    expect(requestLeavesActiveFigure('explain', figureText(ON_SCREEN))).toBe(false)
  })

  it('says no when there are no figure words to compare against', () => {
    // A figure that cannot describe itself is not evidence the learner moved.
    expect(requestLeavesActiveFigure('What are SI units and why do we need them?', '')).toBe(false)
  })

  it('works for a figure the curriculum does not contain', () => {
    // Runtime topics describe themselves through the session, so the rule
    // behaves identically for a topic nobody authored.
    const k8s = 'Kubernetes Pod Scheduling How the scheduler places pods onto nodes'
    expect(requestLeavesActiveFigure('What is orbital hybridisation?', k8s)).toBe(true)
    expect(requestLeavesActiveFigure('explain pod scheduling in more detail', k8s)).toBe(false)
  })
})
