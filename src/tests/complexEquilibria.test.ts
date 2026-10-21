/**
 * chem.equil.complex-equil was served a generated five-box flowchart (the procedure for working a problem) with no equilibrium
 * constant on it (learner run, 2026-10-21). It now draws the lesson's own arithmetic: log Ksp and log Kf as bars that STACK into the net
 * constant of AgCl(s) + 2NH₃ ⇌ [Ag(NH₃)₂]⁺ + Cl⁻. These tests pin what makes the picture the idea rather than a decoration: the numbers are
 * re-read from the drawn bar lengths, the net bar is exactly the two bars end to end, and a figure that breaks either is rejected.
 */
import { describe, it, expect } from 'vitest'
import {
  buildComplexEquilibriaScene, checkComplexEquilibriaConsistency, bars, kOf, sci, KSP, KF, NET_K, BAR_X, SCALE,
} from '@/lib/teaching/sceneGenerators/complexEquilibria'
import { buildCanonicalScene } from '@/lib/teaching/visual/conceptSceneParams'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'

const objects = (s: SceneSpec) => s.steps.flatMap((st) => st.objects)
const clone = (s: SceneSpec): SceneSpec => JSON.parse(JSON.stringify(s))
const vertical = (s: SceneSpec) => objects(s).filter((o) => o.type === 'bond' && Math.abs(o.from![0] - o.to![0]) < 1e-9 && Math.abs(o.to![1] - o.from![1]) > 0.3)

describe('complex-ion equilibria figure', () => {
  const spec = buildComplexEquilibriaScene()

  it('is a valid scene, deterministic, and served for chem.equil.complex-equil', () => {
    expect(validateSceneSpec(spec as never).valid).toBe(true)
    expect(JSON.stringify(buildComplexEquilibriaScene())).toBe(JSON.stringify(spec))
    expect((buildCanonicalScene(null, 'chem.equil.complex-equil') as SceneSpec).id).toBe(spec.id)
  })

  it('the lesson’s numbers are the ones its Educational Brain entry states, and the product is their product', () => {
    expect(KSP).toBe(1.8e-10); expect(KF).toBe(1.7e7)
    expect(sci(NET_K)).toBe('3.1×10⁻³')
    expect(NET_K).toBeCloseTo(KSP * KF, 15)
  })

  it('draws three bars; the net bar is the Ksp bar and the Kf bar stacked end to end', () => {
    const v = vertical(spec)
    expect(v).toHaveLength(3)
    const [ksp, kf, net] = [BAR_X.ksp, BAR_X.kf, BAR_X.net].map((x) => v.find((o) => o.from![0] === x)!)
    const dy = (o: typeof ksp) => o.to![1] - o.from![1]
    expect(ksp.from![1]).toBe(0)
    expect(kf.from![1]).toBe(ksp.to![1])
    expect(net.to![1]).toBe(kf.to![1])
    expect(dy(net)).toBeCloseTo(dy(ksp) + dy(kf), 9)
    expect(dy(ksp)).toBeLessThan(0)   // a sparingly soluble salt: K far below 1
    expect(dy(kf)).toBeGreaterThan(0) // a stable complex: K far above 1
  })

  it('every number in a label is read back from the bar it names', () => {
    const b = bars()
    // Heights are rounded to 3 decimals in scene units, so compare at the precision the labels print (two significant figures).
    expect(sci(kOf(b.ksp[1]))).toBe(sci(KSP))
    expect(sci(kOf(b.kf[1] - b.kf[0]))).toBe(sci(KF))    // read from the bar's own LENGTH, not from where it ends
    expect(sci(kOf(b.net[1]))).toBe(sci(NET_K))
    expect(b.net[1] - b.ksp[1]).toBeCloseTo(Math.log10(KF) * SCALE, 2)
    const text = objects(spec).map((o) => o.text ?? '').join(' | ')
    for (const want of ['Ksp 1.8×10⁻¹⁰', 'Kf 1.7×10⁷', 'Ksp × Kf = 3.1×10⁻³', 'log K', 'K = 1']) expect(text).toContain(want)
  })

  it('passes its own consistency check', () => { expect(checkComplexEquilibriaConsistency(spec)).toEqual({ ok: true, errors: [] }) })

  it('narration stays inside the figure panel budget and states the rule the lesson teaches', () => {
    const all = spec.steps.map((s) => s.narration).join(' ')
    expect(spec.steps.reduce((n, s) => n + s.narration.length, 0)).toBeLessThan(950)
    expect(all).toMatch(/Adding equations multiplies the K values/)
  })

  // Mutations: each is a figure that LOOKS like the stack but breaks the arithmetic.
  it('a net bar that does not end where the Kf bar ends is rejected', () => {
    const bad = clone(spec)
    const net = vertical(bad).find((o) => o.from![0] === BAR_X.net)!
    net.to![1] = net.to![1] + 0.8
    expect(checkComplexEquilibriaConsistency(bad).ok).toBe(false)
  })
  it('a Kf bar that does not start where the Ksp bar ended is rejected', () => {
    const bad = clone(spec)
    const kf = vertical(bad).find((o) => o.from![0] === BAR_X.kf)!
    kf.from![1] = kf.from![1] + 0.5
    expect(checkComplexEquilibriaConsistency(bad).errors.join(' ')).toMatch(/Kf bar does not start/)
  })
  it('a label whose number disagrees with its bar is rejected', () => {
    const bad = clone(spec)
    const l = objects(bad).find((o) => o.text?.startsWith('Kf '))!
    l.text = 'Kf 1.7×10⁶'
    expect(checkComplexEquilibriaConsistency(bad).errors.join(' ')).toMatch(/label for Kf/)
  })
  it('a Ksp bar drawn upward is rejected', () => {
    const bad = clone(spec)
    const ksp = vertical(bad).find((o) => o.from![0] === BAR_X.ksp)!
    ksp.to![1] = -ksp.to![1]
    expect(checkComplexEquilibriaConsistency(bad).ok).toBe(false)
  })
})
