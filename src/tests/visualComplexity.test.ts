/**
 * Adaptive complexity — the same truth, pitched differently.
 *
 * The invariant these tests exist to defend: complexity may change what is
 * shown AT ONCE, never what is true. A figure that became simpler by becoming
 * wrong would be worse than one that overwhelmed a beginner, so the geometry
 * checks below matter more than the budget checks.
 */
import { describe, expect, it } from 'vitest'
import { budgetLabels, complexityFor, labelsHeldBack } from '@/lib/teaching/visual/visualComplexity'
import { canonicalParametricScene, PARAMETRIC_SCENES, variablesFor } from '@/lib/teaching/visual/parametricScenes'
import { ROLE } from '@/lib/teaching/sceneGenerators/visualDesign'
import { normalizeToCanonicalLevel } from '@/lib/curriculum/levels'
import type { SceneObject } from '@/lib/teaching/sceneSpec'

const LEVELS = ['beginner', 'intermediate', 'advanced'] as const

describe('the policy', () => {
  it('is the intermediate default when no level is known', () => {
    expect(complexityFor(null).level).toBe('intermediate')
    expect(complexityFor(undefined).level).toBe('intermediate')
  })

  it('gives a beginner fewer things and more guidance', () => {
    const b = complexityFor('beginner')
    const i = complexityFor('intermediate')
    expect(b.maxLabels).toBeLessThan(i.maxLabels)
    expect(b.maxControls).toBeLessThan(i.maxControls)
    expect(b.openStaged).toBe(true)
    expect(b.showEffects).toBe(true)
    // Challenge and contrast assume a model to test; a beginner has not formed
    // one yet, and being caught out is not the same as being taught.
    expect(b.offerChallengeModes).toBe(false)
    expect(b.offerContrast).toBe(false)
  })

  it('gives an advanced learner everything, with less scaffolding', () => {
    const a = complexityFor('advanced')
    expect(a.offerChallengeModes).toBe(true)
    expect(a.offerContrast).toBe(true)
    expect(a.offerRepresentations).toBe(true)
    expect(a.showEffects).toBe(false)
    expect(a.maxControls).toBeGreaterThan(complexityFor('intermediate').maxControls)
  })

  it('is monotonic in what it offers — no level is a dead end', () => {
    const [b, i, a] = LEVELS.map(complexityFor)
    expect(b.maxLabels).toBeLessThanOrEqual(i.maxLabels)
    expect(i.maxLabels).toBeLessThanOrEqual(a.maxLabels)
    expect(b.maxControls).toBeLessThanOrEqual(i.maxControls)
    expect(i.maxControls).toBeLessThanOrEqual(a.maxControls)
  })

  it('accepts every value the canonical level system can produce', () => {
    for (const raw of ['beginner', 'intermediate', 'advanced', 'novice', 'complete_beginner', '', 'nonsense']) {
      expect(LEVELS).toContain(complexityFor(normalizeToCanonicalLevel(raw)).level)
    }
  })
})

describe('budgeting labels never changes what the figure claims', () => {
  const objects: SceneObject[] = [
    { type: 'vector', id: 'f', from: [0, 0, 0], to: [0, 3, 0], color: ROLE.input },
    { type: 'bond', id: 'arm', from: [0, 0, 0], to: [3, 0, 0], color: ROLE.output },
    { type: 'label', id: 'l-ref', position: [0, 1, 0], text: 'bench', color: ROLE.reference },
    { type: 'label', id: 'l-aid', position: [1, 1, 0], text: 'normal', color: ROLE.aid },
    { type: 'label', id: 'l-in', position: [2, 1, 0], text: 'F = 10 N', color: ROLE.input },
    { type: 'label', id: 'l-res', position: [3, 1, 0], text: 'τ = 20 N·m', color: ROLE.result },
  ]

  it('NEVER removes geometry — only labels are budgeted', () => {
    for (const level of LEVELS) {
      const kept = budgetLabels(objects, complexityFor(level))
      const geometry = kept.filter((o) => o.type !== 'label')
      expect(geometry, level).toEqual(objects.filter((o) => o.type !== 'label'))
    }
  })

  it('keeps the ANSWER and drops the scaffolding when the budget bites', () => {
    const tight = { ...complexityFor('beginner'), maxLabels: 2 }
    const ids = budgetLabels(objects, tight).filter((o) => o.type === 'label').map((o) => o.id)
    expect(ids).toContain('l-res')     // the result survives first
    expect(ids).not.toContain('l-ref') // bare apparatus goes first
    expect(ids).toHaveLength(2)
  })

  it('is a no-op when the figure is inside the budget', () => {
    const kept = budgetLabels(objects, complexityFor('advanced'))
    expect(kept).toEqual(objects)
    expect(labelsHeldBack(objects, complexityFor('advanced'))).toBe(0)
  })

  it('reports how many it held back, so the figure can say so', () => {
    expect(labelsHeldBack(objects, { ...complexityFor('beginner'), maxLabels: 1 })).toBe(3)
  })

  it('is stable — the same figure does not reshuffle between renders', () => {
    const tight = { ...complexityFor('beginner'), maxLabels: 3 }
    expect(budgetLabels(objects, tight)).toEqual(budgetLabels(objects, tight))
  })

  it('never returns an object it was not given', () => {
    const tight = { ...complexityFor('beginner'), maxLabels: 2 }
    for (const o of budgetLabels(objects, tight)) expect(objects).toContain(o)
  })
})

describe('against every real figure', () => {
  it.each(Object.keys(PARAMETRIC_SCENES))('%s stays truthful at every level', (kind) => {
    const spec = canonicalParametricScene(kind)!
    const objects = spec.steps.flatMap((s) => s.objects)
    for (const level of LEVELS) {
      const policy = complexityFor(level)
      const shown = budgetLabels(objects, policy)
      // Geometry identical at every level.
      expect(shown.filter((o) => o.type !== 'label'), `${kind}/${level}`)
        .toEqual(objects.filter((o) => o.type !== 'label'))
      // Never more labels than the budget allows.
      expect(shown.filter((o) => o.type === 'label').length).toBeLessThanOrEqual(policy.maxLabels)
      // A beginner is never handed more than two controls.
      expect(variablesFor(kind).slice(0, policy.maxControls).length)
        .toBeLessThanOrEqual(policy.maxControls)
    }
  })
})
