/**
 * THE LESSON'S FIGURE MUST NOT BE SERVED FOR SOMEBODY ELSE'S TOPIC.
 *
 * ── MEASURED, 40 fresh topics / 80 turns in production (2026-08-11) ─────────
 * 46 of the 62 figures a learner received were the LESSON's own curated card,
 * shown for a topic that was not the lesson:
 *
 *   three_crystal_lattice  served on 17 chemistry topics — isotopes, moles,
 *                          molar mass, molarity, acids and bases, pH,
 *                          titration, oxidation state, redox, solubility,
 *                          catalysts, rate law, enthalpy, electrolysis,
 *                          isomerism, Kc … 31 turns in total
 *   force_diagram          served on 8 physics topics — friction, momentum,
 *                          centripetal force, Hooke's law, pressure, magnetic
 *                          fields, induction, and the refraction of light
 *
 * and the tutor narrated them, because a figure on screen binds the turn.
 * Two of those were answers to an EXPLICIT request: "Draw it for me" about
 * refraction returned a free-body diagram.
 *
 * ── WHY THE EXISTING GUARD NEVER FIRED ──────────────────────────────────────
 * `requestTargetsSomethingElse` asks what the learner named via
 * `extractRequestedTopic`, which required TWO content words. The commonest way
 * a learner names a topic is with one noun — "What are isotopes?", "What is a
 * titration?" — so the guard concluded they had named nothing and let the
 * fallback through.
 *
 * The two-word floor still governs everywhere else. It is lowered ONLY here,
 * where the sole question is whether to introduce a NEW figure: withholding
 * one costs a picture the learner never had, while drawing the wrong concept
 * teaches them something false.
 */
import { describe, it, expect } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { resolveVisualTarget, requestTargetsSomethingElse } from '@/lib/teaching/visual/resolveVisualTarget'

const CHEM_LESSON = 'chem.solid.ionic-solids'
const PHYS_LESSON = 'phys.mech.free-body-diagram'

const targetFor = (message: string, lesson: string, subject: string) =>
  resolveVisualTarget(message, lesson, subject)

describe('a single-word topic is still a topic', () => {
  it.each([
    ['isotopes', 'What are isotopes?', CHEM_LESSON, 'chemistry'],
    ['titration', 'What is a titration and why do we do it?', CHEM_LESSON, 'chemistry'],
    ['electrolysis', 'What is electrolysis?', CHEM_LESSON, 'chemistry'],
    ['isomers', 'What are isomers?', CHEM_LESSON, 'chemistry'],
  ])('refuses the lesson figure when the learner asked about %s', (_label, message, lesson, subject) => {
    const target = targetFor(message, lesson, subject)
    if (target && target.origin === 'lesson-concept') {
      expect(requestTargetsSomethingElse(message, target), message).toBe(true)
    }
    // End to end: no figure rather than the lesson's.
    const d = resolveVisual({ message, lessonConceptId: lesson, subject })
    if (d.conceptId === lesson) expect(d.graphical, message).toBe(false)
  })

  it('refuses the lesson figure for refraction, the case that produced a free-body diagram', () => {
    const message = 'What is refraction of light?'
    const target = targetFor(message, PHYS_LESSON, 'physics')
    if (target && target.origin === 'lesson-concept') {
      expect(requestTargetsSomethingElse(message, target)).toBe(true)
    }
  })

  // KNOWN RECALL GAP, recorded rather than tuned away. `isExplicitTopicRequest`
  // recognises "what is/are", "explain", "teach me", "show me" and friends —
  // but NOT "what happens during X" or "why does X…". Both are ordinary
  // learner phrasings and both were observed in the 40-topic run, and for both
  // this guard never runs at all, so the lesson's figure is still served.
  // Widening that regex touches the shared definition of a request used by the
  // excursion lifecycle too, so it is reported, not changed here.
  it('does not yet recognise "what happens during…" or "why does…" as requests', () => {
    for (const m of ['What happens during electrolysis?', 'Why does light bend when it enters water?']) {
      const t = targetFor(m, PHYS_LESSON, 'physics')
      expect(t && requestTargetsSomethingElse(m, t), m).toBe(false)
    }
  })
})

describe('the things that must still get the lesson figure', () => {
  it.each([
    ['a bare medium request', 'show me a diagram'],
    ['another medium request', 'can you draw a picture'],
    ['a graph request', 'Can you graph this for me?'],
  ])('%s means "draw what we are studying"', (_label, message) => {
    const target = targetFor(message, PHYS_LESSON, 'physics')
    if (target && target.origin === 'lesson-concept') {
      expect(requestTargetsSomethingElse(message, target), message).toBe(false)
    }
  })

  it.each([
    ['a request to repeat', 'Please explain this topic to me.'],
    ['a request to differ', 'explain differently'],
    ['a request to simplify', 'explain it more simply'],
  ])('%s names nothing and keeps the lesson figure', (_label, message) => {
    const target = targetFor(message, PHYS_LESSON, 'physics')
    if (target && target.origin === 'lesson-concept') {
      expect(requestTargetsSomethingElse(message, target), message).toBe(false)
    }
  })

  it('a question about the lesson itself is untouched', () => {
    const message = 'What is a free body diagram?'
    const target = targetFor(message, PHYS_LESSON, 'physics')
    // It resolves to the lesson as a NAMED request, so the guard never applies.
    expect(target?.origin).toBe('learner-request')
    expect(requestTargetsSomethingElse(message, target!)).toBe(false)
  })
})
