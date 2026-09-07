/**
 * System-boundary and first-law scenes — Chemistry Visual Coverage programme.
 *
 * Covers chem.thermo.system (open/closed/isolated classification) and
 * chem.thermo.first-law (ΔU = q + w). Concept-owned, parameter-light scenes
 * in the style of physicsPilot.ts — verified against the arithmetic and
 * classification rules they claim to teach, not just "a scene exists".
 */
import { describe, expect, it } from 'vitest'
import {
  buildFirstLawScene, buildSystemBoundaryScene, checkFirstLawConsistency,
  checkSystemBoundaryConsistency, type SystemType,
} from '@/lib/teaching/sceneGenerators/chemistrySystemScenes'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { buildCanonicalScene } from '@/lib/teaching/visual/conceptSceneParams'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'

describe('system classification — matter/energy arrows match the type exactly', () => {
  const cases: { type: SystemType; matter: boolean; energy: boolean }[] = [
    { type: 'open', matter: true, energy: true },
    { type: 'closed', matter: false, energy: true },
    { type: 'isolated', matter: false, energy: false },
  ]

  it.each(cases)('$type: matter=$matter, energy=$energy', ({ type, matter, energy }) => {
    const scene = buildSystemBoundaryScene(type)
    expect(validateSceneSpec(scene).errors).toEqual([])
    const check = checkSystemBoundaryConsistency(scene, type)
    expect(check).toEqual({ ok: true, errors: [] })
    const text = scene.steps.flatMap((s) => s.objects.map((o) => o.text ?? '')).join('|')
    expect(text.includes('matter in')).toBe(matter)
    expect(text.includes('heat in')).toBe(energy)
  })

  it('negative control: checking an open-system scene against "isolated" fails', () => {
    const openScene = buildSystemBoundaryScene('open')
    expect(checkSystemBoundaryConsistency(openScene, 'isolated').ok).toBe(false)
  })

  it('the three system types are genuinely different scenes', () => {
    const texts = (['open', 'closed', 'isolated'] as const).map((t) =>
      buildSystemBoundaryScene(t).steps.flatMap((s) => s.objects.map((o) => o.text ?? '')).join('|'))
    expect(new Set(texts).size).toBe(3)
  })
})

describe('the First Law — ΔU = q + w, with a signed, derived (never hardcoded) result', () => {
  it.each([
    [100, -40, 60],
    [-393.5, 0, -393.5],
    [50, 50, 100],
    [-20, -30, -50],
  ])('q=%d, w=%d → ΔU=%d', (q, w, expected) => {
    const scene = buildFirstLawScene(q, w)
    expect(validateSceneSpec(scene).errors).toEqual([])
    const check = checkFirstLawConsistency(scene, q, w)
    expect(check).toEqual({ ok: true, errors: [] })
    const text = scene.steps.flatMap((s) => s.objects.map((o) => o.text ?? '')).join('|')
    expect(text).toContain(`ΔU = ${expected}`)
  })

  it('negative control: a scene tampered to show the wrong ΔU fails the check', () => {
    const scene = buildFirstLawScene(100, -40)
    const tampered = { ...scene, steps: scene.steps.map((s) => ({ ...s, objects: s.objects.map((o) => (o.text ?? '').includes('ΔU') ? { ...o, text: 'ΔU = 999' } : o) })) }
    expect(checkFirstLawConsistency(tampered, 100, -40).ok).toBe(false)
  })

  it('the arrow direction flips with the sign of q and w (never hardcoded "in")', () => {
    const positive = buildFirstLawScene(50, 0).steps.flatMap((s) => s.objects).find((o) => (o.text ?? '').startsWith('q ='))!
    const negative = buildFirstLawScene(-50, 0).steps.flatMap((s) => s.objects).find((o) => (o.text ?? '').startsWith('q ='))!
    expect(positive.from![0]).toBeLessThan(positive.to![0])   // flows toward the system
    expect(negative.from![0]).toBeGreaterThan(negative.to![0]) // flows away from the system
  })
})

describe('registry integration — the concepts genuinely reach these builders', () => {
  const concepts = ['chem.thermo.system', 'chem.thermo.first-law']

  it.each(concepts)('%s resolves to a valid canonical scene', (conceptId) => {
    const scene = buildCanonicalScene(null, conceptId)
    expect(scene, conceptId).not.toBeNull()
    expect(validateSceneSpec(scene!).errors, conceptId).toEqual([])
  })

  it.each(concepts)('%s reaches resolveVisual() as a graphical, registry-sourced figure', (conceptId) => {
    const decision = resolveVisual({ message: 'can you show me a diagram?', lessonConceptId: conceptId, learnerRequest: 'diagram' })
    expect(decision.graphical, conceptId).toBe(true)
    expect(decision.source, conceptId).toBe('registry')
  })
})
