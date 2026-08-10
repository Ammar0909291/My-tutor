import { describe, it, expect } from 'vitest'
import { decideVisualNeed, mayIntroduceFigure } from '@/lib/teaching/visual/visualNeed'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import type { VisualSession } from '@/lib/teaching/visual/session'

/**
 * WHETHER, NOT WHAT.
 *
 * Every other part of the engine answers "is there a faithful figure for this
 * concept?". This is the only part that asks whether the learner benefits from
 * seeing one on THIS turn. The tests that matter are the two directions of the
 * same rule: an answering learner is not interrupted, and an answering learner
 * does not lose the figure they are looking at.
 */

// A concept with a curated figure, so "no figure" can only come from the need
// decision and never from an empty registry.
const CONCEPT = 'phys.mech.viscosity'

const session = (conceptId: string): VisualSession => ({
  conceptId, representation: 'diagram', renderer: 'scene',
  returnToConceptId: null, turns: 1,
})

describe('the need decision', () => {
  it('an explicit request outranks everything, including a pending question', () => {
    const v = decideVisualNeed({
      message: 'yes', learnerRequest: 'diagram', lastAssistantAskedQuestion: true,
    })
    expect(v.need).toBe('required')
  })

  it('the remediation ladder requires a figure at tier 3', () => {
    expect(decideVisualNeed({
      message: 'I still do not get it', learnerRequest: 'explain_differently', remediationTier: 3,
    }).need).toBe('required')
  })

  it('but not before tier 3 — saying it another way is still allowed to work', () => {
    expect(decideVisualNeed({
      message: 'I still do not get it', learnerRequest: 'explain_differently', remediationTier: 1,
    }).need).toBe('helpful')
  })

  it('a short answer to the tutor is suppressed, not answered with a picture', () => {
    const v = decideVisualNeed({ message: '12', lastAssistantAskedQuestion: true })
    expect(v.need).toBe('suppress')
    expect(v.reason).toBe('turn-is-an-answer-not-a-request')
  })

  it('the same words are NOT an answer when nothing was asked', () => {
    expect(decideVisualNeed({ message: '12', lastAssistantAskedQuestion: false }).need)
      .not.toBe('suppress')
  })

  it('an ordinary teaching turn is helpful, and says so', () => {
    const v = decideVisualNeed({ message: 'tell me about viscosity' })
    expect(v.need).toBe('helpful')
    expect(v.reason).toBeTruthy()
  })

  it('an empty message is not an answer — it is no learner turn at all', () => {
    // How the restore path and the offline audits call the resolver. Treating
    // it as answer-shaped withheld every figure on every restore.
    const v = decideVisualNeed({ message: '', lastAssistantAskedQuestion: true })
    expect(v.need).toBe('helpful')
    expect(v.reason).toBe('no-learner-utterance')
    expect(mayIntroduceFigure(v, null)).toBe(true)
  })

  it('every verdict carries a reason — an unexplained decision is an invented one', () => {
    for (const input of [
      { message: 'show me a diagram', learnerRequest: 'diagram' as const },
      { message: 'ok', lastAssistantAskedQuestion: true },
      { message: 'what is shear' },
    ]) {
      expect(decideVisualNeed(input).reason.length).toBeGreaterThan(0)
    }
  })
})

describe('suppress withholds, it never removes', () => {
  it('a new figure is withheld on an answering turn', () => {
    const v = decideVisualNeed({ message: 'yes', lastAssistantAskedQuestion: true })
    expect(mayIntroduceFigure(v, null)).toBe(false)
  })

  it('THE FLICKER GUARD: a figure already on screen is untouched', () => {
    // The learner is answering a question ABOUT the figure in front of them.
    // Taking it away at that moment would be worse than the interruption this
    // whole decision exists to prevent.
    const v = decideVisualNeed({ message: 'yes', lastAssistantAskedQuestion: true })
    expect(v.need).toBe('suppress')
    expect(mayIntroduceFigure(v, session(CONCEPT))).toBe(true)
  })
})

describe('wired into the resolver, on the input side', () => {
  it('an answering turn with nothing on screen yields no figure, with a reason', () => {
    const d = resolveVisual({
      message: 'yes',
      lessonConceptId: CONCEPT,
      subject: 'physics',
      lastAssistantAskedQuestion: true,
    })
    expect(d.graphical).toBe(false)
    expect(d.provenance).toContain('suppressed:')
    expect(d.continuityReason).toBe('need:suppress')
  })

  it('the same turn WITH a figure on screen keeps it — continuity still owns that', () => {
    const d = resolveVisual({
      message: 'yes',
      lessonConceptId: CONCEPT,
      subject: 'physics',
      lastAssistantAskedQuestion: true,
      activeSession: session(CONCEPT),
    })
    expect(d.graphical).toBe(true)
    expect(d.conceptId).toBe(CONCEPT)
  })

  it('an explicit request on the same turn still produces the figure', () => {
    const d = resolveVisual({
      message: 'show me a diagram',
      lessonConceptId: CONCEPT,
      subject: 'physics',
      learnerRequest: 'diagram',
      lastAssistantAskedQuestion: true,
    })
    expect(d.graphical).toBe(true)
  })

  it('an ordinary turn is unaffected — this adds no new way to lose a figure', () => {
    const d = resolveVisual({
      message: 'explain viscosity to me',
      lessonConceptId: CONCEPT,
      subject: 'physics',
      learnerRequest: 'diagram',
    })
    expect(d.graphical).toBe(true)
  })
})
