/**
 * phys.qm.harmonic-oscillator-qm (learner run, 2026-10-21, rated 6.5): the "E₀ = ½ħω" label sat in the empty space under the bowl, nowhere near the lowest
 * level, "ΔE = ħω" named no pair of levels, and two unlabelled wavefunctions overlapped the levels. Now the gap and the ground level are carried out of the bowl
 * by leaders, the bracket spans exactly one gap, and each wavefunction is named. These tests pin that from the drawn geometry.
 */
import { describe, it, expect } from 'vitest'
import { buildQuantumOscillatorScene, qhoEnergy } from '@/lib/teaching/sceneGenerators/physicsCoreScenesB11'
import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'

const spec: SceneSpec = buildQuantumOscillatorScene()
const objs = (i?: number): SceneObject[] => (i === undefined ? spec.steps.flatMap((s) => s.objects) : spec.steps[i].objects)
const levelYs = () => objs(1).filter((o) => o.type === 'bond' && o.color === '#3b82f6' && Math.abs(o.from![1] - o.to![1]) < 1e-9).map((o) => o.from![1]).sort((a, b) => a - b)

describe('quantum harmonic oscillator figure', () => {
  it('five levels, equally spaced: the spacing is the same between every neighbouring pair', () => {
    const ys = levelYs()
    expect(ys).toHaveLength(5)
    const gaps = ys.slice(1).map((y, i) => y - ys[i])
    for (const g of gaps) expect(g).toBeCloseTo(gaps[0], 9)
  })
  it('the ΔE bracket spans exactly one gap, between levels 2 and 3, and carries its label', () => {
    const ys = levelYs()
    const br = objs(1).find((o) => o.type === 'arrow')!
    expect(br.from![1]).toBeCloseTo(ys[2], 9); expect(br.to![1]).toBeCloseTo(ys[3], 9)
    expect(objs(1).some((o) => o.type === 'label' && o.text === 'ΔE = ħω')).toBe(true)
  })
  it('the lowest level is at ½ħω above the bottom of the bowl, and E₀ is read off a leader AT that level', () => {
    const ys = levelYs()
    expect(ys[0] - -3.6).toBeCloseTo(qhoEnergy(0), 9)
    const e0 = objs(2).find((o) => o.type === 'label' && o.text === 'E₀ = ½ħω')!
    expect(e0.position![1]).toBeCloseTo(ys[0], 9)
    const leader = objs(2).find((o) => o.type === 'bond' && Math.abs(o.from![1] - ys[0]) < 1e-9 && Math.abs(o.to![1] - ys[0]) < 1e-9)!
    expect(leader).toBeTruthy()
  })
  it('the wavefunctions are named (ψ₀ on the lowest level, ψ₁ on the next)', () => {
    const t = objs(2).filter((o) => o.type === 'label').map((o) => o.text)
    expect(t).toContain('ψ₀'); expect(t).toContain('ψ₁')
  })
  it('narration stays inside the figure panel budget', () => { expect(spec.steps.reduce((n, s) => n + s.narration.length, 0)).toBeLessThan(950) })
})
