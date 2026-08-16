/**
 * A LESSON'S OWN FIGURE MUST NOT SURVIVE A LESSON CHANGE.
 *
 * PRODUCTION (measured 2026-08-16, real learner account, chemistry):
 * the learner moved from `chem.found.states-of-matter` to
 * `chem.found.pure-substances` and the States-of-Matter process flow stayed on
 * screen for EVERY turn of the new lesson:
 *
 *   [visual-v2] concept: 'chem.found.states-of-matter'
 *               provenance: 'generated:chem.found.states-of-matter:cached'
 *               continuity: 'continuity'
 *   RESPONSE    resolvedConceptId=chem.found.pure-substances
 *
 * Cause: `decideContinuity`'s lesson-changed guard required
 * `session.returnToConceptId`, which is only set when a figure is introduced
 * for a concept that is NOT the lesson's own — i.e. for EXCURSION figures. A
 * plain lesson figure has no anchor, so the guard could not fire and the turn
 * fell through to the catch-all hold meant for follow-ups and corrections.
 *
 * It matters because the tutor narrates whatever is on screen; a held figure
 * from the previous lesson gets explained as though it depicts the new one.
 */
import { describe, it, expect } from 'vitest'
import { decideContinuity, type VisualSession } from '@/lib/teaching/visual/session'

const OLD_LESSON = 'chem.found.states-of-matter'
const NEW_LESSON = 'chem.found.pure-substances'

/** A figure introduced AS the lesson's own figure: no excursion anchor. */
function lessonFigure(conceptId: string): VisualSession {
  return {
    conceptId, representation: 'labelled_figure', renderer: 'spec',
    returnToConceptId: null, turns: 1,
  } as VisualSession
}

/** An excursion figure: anchored back to the lesson it detoured from. */
function excursionFigure(conceptId: string, returnTo: string): VisualSession {
  return {
    conceptId, representation: 'labelled_figure', renderer: 'spec',
    returnToConceptId: returnTo, turns: 1,
  } as VisualSession
}

const turn = (session: VisualSession, lessonConceptId: string, message = 'ok') =>
  decideContinuity({
    session, message, lessonConceptId, requestedConceptId: null,
    lastAssistantAskedQuestion: false,
  })

describe('a lesson figure is released when the lesson changes', () => {
  it('releases the previous lesson figure and targets the new lesson', () => {
    const action = turn(lessonFigure(OLD_LESSON), NEW_LESSON)
    expect(action.kind).toBe('switch')
    expect(action.reason).toBe('lesson-changed')
    if (action.kind === 'switch') expect(action.targetConceptId).toBe(NEW_LESSON)
  })

  it('releases it even on an answer-shaped turn — the production case', () => {
    // "learner-answering-not-requesting" holds the figure, and it sits BELOW
    // the lesson-changed guard. A learner answering a question about the NEW
    // lesson must not keep the OLD lesson's figure.
    const action = decideContinuity({
      session: lessonFigure(OLD_LESSON), message: 'i dont know',
      lessonConceptId: NEW_LESSON, requestedConceptId: null,
      lastAssistantAskedQuestion: true,
    })
    expect(action.reason).toBe('lesson-changed')
  })

  it('holds when the lesson has NOT changed', () => {
    const action = turn(lessonFigure(OLD_LESSON), OLD_LESSON)
    expect(action.kind).toBe('hold')
    expect(action.reason).toBe('continuity')
  })
})

describe('excursion behaviour is unchanged', () => {
  it('an excursion anchored to the CURRENT lesson still holds', () => {
    const action = turn(excursionFigure('chem.bond.ionic-bonding', NEW_LESSON), NEW_LESSON)
    expect(action.kind).toBe('hold')
    expect(action.reason).toBe('continuity')
  })

  it('an excursion whose lesson changed underneath it still releases', () => {
    // This is what the guard already did before the fix; it must keep doing it.
    const action = turn(excursionFigure('chem.bond.ionic-bonding', OLD_LESSON), NEW_LESSON)
    expect(action.kind).toBe('switch')
    expect(action.reason).toBe('lesson-changed')
    if (action.kind === 'switch') expect(action.targetConceptId).toBe(NEW_LESSON)
  })

  it('a figure showing the concept the lesson just moved ONTO is kept', () => {
    // The lesson caught up with the excursion's topic — not a stale surface.
    const action = turn(excursionFigure(NEW_LESSON, OLD_LESSON), NEW_LESSON)
    expect(action.kind).toBe('hold')
  })

  it('does nothing when there is no lesson concept to compare against', () => {
    const action = turn(lessonFigure(OLD_LESSON), null as unknown as string)
    expect(action.kind).toBe('hold')
  })
})
