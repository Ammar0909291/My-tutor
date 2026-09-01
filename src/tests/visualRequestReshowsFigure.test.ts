/**
 * ASKING FOR THE PICTURE MUST PRODUCE A PICTURE.
 *
 * MEASURED on phys.opt.mirrors against the deployed app, twice, with a
 * struggling-learner script (`scripts/qa/verify-diagram-under-struggle.ts`):
 * two of the three explicit figure requests came back with NO figure in the
 * payload. The production logs for the same shape read
 *
 *   [visual-v2] concept: 'phys.opt.mirrors' continuity: 'continuity' heldTurns: 1
 *   [visual-v2] concept: 'phys.opt.mirrors' continuity: 'continuity' heldTurns: 2
 *
 * so the figure existed and was HELD. route.ts's ownership gate —
 * `figureIntroducedThisTurn = session.turns === 0` — then withheld it from the
 * message, which is correct for an ordinary reply and wrong for the one turn
 * the learner asked to be shown something.
 *
 * I first suspected my own harness (`carriesFigure` reads the payload only,
 * and a held figure is deliberately not re-sent). Driving the real
 * `decideContinuity` offline settled it: every one of the four request
 * phrasings below reached the catch-all `continuity` hold. The gap is the
 * product's, not the instrument's.
 *
 * These cases pin the branch and, just as importantly, every path that must
 * still win over it.
 */
import { describe, it, expect } from 'vitest'
import { decideContinuity, MAX_EXCURSION_TURNS, type VisualSession } from '@/lib/teaching/visual/session'

const LESSON = 'phys.opt.mirrors'

function held(over: Partial<VisualSession> = {}): VisualSession {
  return { conceptId: LESSON, returnToConceptId: null, turns: 2, ...over } as VisualSession
}

function decide(message: string, over: Record<string, unknown> = {}) {
  return decideContinuity({
    session: held(),
    message,
    lessonConceptId: LESSON,
    requestedConceptId: null,
    lastAssistantAskedQuestion: false,
    offeredMcqOptions: null,
    visualRequested: true,
    requestLeftActiveFigure: false,
    ...over,
  } as Parameters<typeof decideContinuity>[0])
}

describe('an explicit request re-introduces the lesson figure', () => {
  for (const message of [
    'can you show me a diagram',
    'i still dont get it, can you draw it',
    'show me a picture of the rays',
    'show me the diagram again',
  ]) {
    it(`${JSON.stringify(message)} attaches the figure to this message`, () => {
      const action = decide(message)
      expect(action.kind).toBe('switch')
      expect(action.reason).toBe('visual-request-reshows-figure')
      // The SAME figure — a request to see it again is not a request for a
      // different one.
      expect(action.kind === 'switch' && action.targetConceptId).toBe(LESSON)
    })
  }
})

describe('everything that must still win over the re-show', () => {
  it('an ordinary turn with no request still holds — the gate it protects', () => {
    const action = decide('ok that makes sense', { visualRequested: false })
    expect(action.kind).toBe('hold')
    expect(action.reason).toBe('continuity')
  })

  it('answering the tutor holds, even when the words look like a request', () => {
    const action = decide('show me the rays', {
      lastAssistantAskedQuestion: true,
      offeredMcqOptions: ['show me the rays', 'reflect them back'],
    })
    expect(action.kind).toBe('hold')
    expect(action.reason).toBe('learner-answering-not-requesting')
  })

  it('a request that NAMES another concept still switches to that concept', () => {
    const action = decide('show me a diagram of refraction', {
      requestedConceptId: 'phys.opt.refraction',
    })
    expect(action.kind).toBe('switch')
    expect(action.reason).toBe('explicit-new-topic-request')
    expect(action.kind === 'switch' && action.targetConceptId).toBe('phys.opt.refraction')
  })

  it('a request while the figure is elsewhere still returns to the lesson', () => {
    const action = decideContinuity({
      session: held({ conceptId: 'phys.mech.friction', returnToConceptId: LESSON }),
      message: 'can you show me a diagram',
      lessonConceptId: LESSON,
      requestedConceptId: null,
      lastAssistantAskedQuestion: false,
      offeredMcqOptions: null,
      visualRequested: true,
      requestLeftActiveFigure: false,
    })
    expect(action.kind).toBe('switch')
    expect(action.reason).toBe('visual-request-returns-to-lesson')
  })

  it('a named topic that left the figure still RELEASES it, request or not', () => {
    const action = decide('what about total internal reflection', {
      requestLeftActiveFigure: true,
    })
    expect(action.kind).toBe('switch')
    expect(action.reason).toBe('named-topic-left-the-figure')
  })

  it('the lesson moving on still wins — a stale figure is never re-shown', () => {
    const action = decideContinuity({
      session: held({ conceptId: 'phys.opt.lenses' }),
      message: 'can you show me a diagram',
      lessonConceptId: LESSON,
      requestedConceptId: null,
      lastAssistantAskedQuestion: false,
      offeredMcqOptions: null,
      visualRequested: true,
      requestLeftActiveFigure: false,
    })
    expect(action.kind).toBe('switch')
    expect(action.reason).toBe('lesson-changed')
  })

  it('an EXCURSION figure keeps its counter, so repeated asks cannot hold a detour open', () => {
    // The safety valve reads `session.turns`, and the re-show resets it. If it
    // applied to excursion figures, "show me that again" would push the valve
    // away every time. It is scoped to the lesson's own concept precisely so
    // this stays true.
    const action = decideContinuity({
      session: held({ conceptId: 'phys.mech.friction', returnToConceptId: LESSON, turns: MAX_EXCURSION_TURNS }),
      message: 'show me the diagram again',
      lessonConceptId: LESSON,
      requestedConceptId: null,
      lastAssistantAskedQuestion: false,
      offeredMcqOptions: null,
      visualRequested: true,
      requestLeftActiveFigure: false,
    })
    expect(action.kind).toBe('switch')
    expect(action.reason).toBe('excursion-turn-limit')
  })
})
