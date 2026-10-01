/**
 * "Show me a ray diagram" in an optics lesson asks for THAT lesson's figure.
 *
 * MEASURED 2026-09-30 (physics visual gap campaign, batch 8): once
 * phys.opt.nature-of-light gained an authored figure, a Total Internal
 * Reflection learner who typed "show me a ray diagram" was about to be shown
 * "Light: rays or waves?" — "ray" matched math "Ray", and the same-subject
 * re-read turned it into "Nature of Light: Ray and Wave Models". Before that
 * concept had a figure the same mis-resolution showed nothing at all, so the
 * lesson's own ray diagram was never served either.
 *
 * The fix is lesson vocabulary, not a new rule: the visual layer now hands the
 * resolver what the lesson's own figure SAYS (labels and narration), and
 * requestedConcept's existing L3 rule keeps a lesson's own one-word term from
 * opening a detour.
 */
import { describe, it, expect } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { authoredFigureText } from '@/lib/teaching/visual/resolveVisualTarget'

const ask = (lessonConceptId: string, message: string) =>
  resolveVisual({ message, lessonConceptId, learnerRequest: 'diagram' } as Parameters<typeof resolveVisual>[0])

describe("an optics lesson's own word does not open a detour", () => {
  it.each(['phys.opt.total-internal-reflection', 'phys.opt.refraction'])('%s: "show me a ray diagram" serves this lesson\'s figure', (lesson) => {
    expect(authoredFigureText(lesson)).toMatch(/\bray\b/)
    const d = ask(lesson, 'show me a ray diagram')
    expect(d.graphical).toBe(true)
    expect(d.asset?.conceptId).toBe(lesson)
  })

  it('from a lesson whose figure never mentions rays, rays are a real request and never the lesson\'s own figure', () => {
    const d = ask('phys.therm.calorimetry', 'show me a ray diagram')
    expect(d.asset?.conceptId).not.toBe('phys.therm.calorimetry')
  })

  it('a concept with no authored figure contributes no vocabulary', () => {
    // (phys.mech.power was this example until physics batch 14, 2026-09-30.)
    expect(authoredFigureText('chem.found.significant-figures')).toBe('')
    expect(authoredFigureText(null)).toBe('')
  })
})
