/**
 * chem.kinet.photochemistry was served a generated six-box flowchart whose last two boxes ("Determine quantum yield", "Apply Beer-Lambert law") were
 * calculation steps, with no energy on it (learner run, 2026-10-21). It now draws what the lesson teaches: ONE photon lifts a molecule to an excited state;
 * the excited molecule reacts (primary step, then thermal secondary steps) or falls back as light or heat. These tests pin the structure from the geometry.
 */
import { describe, it, expect } from 'vitest'
import { buildPhotochemistryScene, checkPhotochemistryConsistency, LEVEL, ARROW_X } from '@/lib/teaching/sceneGenerators/photochemistryFate'
import { buildCanonicalScene } from '@/lib/teaching/visual/conceptSceneParams'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'

const objects = (s: SceneSpec) => s.steps.flatMap((st) => st.objects)
const clone = (s: SceneSpec): SceneSpec => JSON.parse(JSON.stringify(s))
const arrows = (s: SceneSpec) => objects(s).filter((o) => o.type === 'arrow')

describe('photochemistry figure', () => {
  const spec = buildPhotochemistryScene()

  it('is a valid scene, deterministic, and served for chem.kinet.photochemistry', () => {
    expect(validateSceneSpec(spec as never).valid).toBe(true)
    expect(JSON.stringify(buildPhotochemistryScene())).toBe(JSON.stringify(spec))
    expect((buildCanonicalScene(null, 'chem.kinet.photochemistry') as SceneSpec).id).toBe(spec.id)
  })
  it('passes its own consistency check', () => { expect(checkPhotochemistryConsistency(spec)).toEqual({ ok: true, errors: [] }) })

  it('exactly one photon arrow lifts the molecule from the ground level to the excited level (one photon excites at most one molecule)', () => {
    const up = arrows(spec).filter((a) => a.to![1] > a.from![1] && a.from![0] === ARROW_X.photon)
    expect(up).toHaveLength(1)
    expect(up[0].from![1]).toBe(LEVEL.ground); expect(up[0].to![1]).toBe(LEVEL.excited)
  })
  it('the two harmless routes fall back to the ground level and make no product', () => {
    const down = arrows(spec).filter((a) => a.from![1] === LEVEL.excited && a.to![1] === LEVEL.ground)
    expect(down.map((a) => a.from![0]).sort()).toEqual([ARROW_X.light, ARROW_X.heat].sort())
  })
  it('the secondary (thermal) step starts exactly where the primary step ended', () => {
    const [primary, secondary] = [arrows(spec).find((a) => a.from![0] > 2 && a.from![1] === LEVEL.excited)!, arrows(spec).find((a) => a.from![0] > 3 && a.to![1] < a.from![1])!]
    expect(secondary.from).toEqual(primary.to)
  })
  it('carries no number: every word is one the lesson uses, and Φ is defined as the lesson defines it', () => {
    const text = objects(spec).map((o) => o.text ?? '').join(' | ')
    expect(text).toContain('Φ = products ÷ photons')
    expect(text).not.toMatch(/\d/)
    expect(spec.steps.reduce((n, s) => n + s.narration.length, 0)).toBeLessThan(950)
  })

  // Mutations: figures that look the same and teach something false.
  it('a second photon arrow is rejected', () => {
    const bad = clone(spec)
    bad.steps[0].objects.push({ ...arrows(spec).find((a) => a.from![0] === ARROW_X.photon)!, from: [-4.4, LEVEL.ground, 0], to: [-4.4, LEVEL.excited, 0] })
    expect(checkPhotochemistryConsistency(bad).errors.join(' ')).toMatch(/exactly one photon arrow/)
  })
  it('a harmless route that does not return to the ground state is rejected', () => {
    const bad = clone(spec)
    const light = arrows(bad).find((a) => a.from![0] === ARROW_X.light)!
    light.to![1] = LEVEL.ground + 3
    expect(checkPhotochemistryConsistency(bad).errors.join(' ')).toMatch(/two arrows must fall/)
  })
  it('a secondary step detached from the primary product is rejected', () => {
    const bad = clone(spec)
    const sec = arrows(bad).find((a) => a.from![0] > 3 && a.to![1] < a.from![1])!
    sec.from![1] = sec.from![1] + 1.2
    expect(checkPhotochemistryConsistency(bad).errors.join(' ')).toMatch(/secondary step must start where the primary/)
  })
  it('the excited level drawn below the ground level is rejected', () => {
    const bad = clone(spec)
    const lv = objects(bad).filter((o) => o.type === 'bond' && o.from![1] === LEVEL.excited)
    for (const o of lv) { o.from![1] = LEVEL.ground - 1; o.to![1] = LEVEL.ground - 1 }
    expect(checkPhotochemistryConsistency(bad).ok).toBe(false)
  })
})
