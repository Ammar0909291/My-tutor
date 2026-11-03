/**
 * chem.bond.polar-molecules was served a generated five-box procedure flowchart with no dipole on it (learner run on Test6, 2026-11-03). It now draws the rule the
 * Educational Brain entry teaches: bond dipoles are vectors; CO₂'s cancel, bent water's add and the net points toward O. The sums are re-derived from the DRAWN arrows.
 */
import { describe, it, expect } from 'vitest'
import { buildPolarMoleculesScene, checkPolarMoleculesConsistency, netOfWater, NET_X, BOND, H2O, CO2 } from '@/lib/teaching/sceneGenerators/polarMoleculeDipoles'
import { buildCanonicalScene } from '@/lib/teaching/visual/conceptSceneParams'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'

const spec = buildPolarMoleculesScene()
const objects = (s: SceneSpec) => s.steps.flatMap((st) => st.objects)
const clone = (s: SceneSpec): SceneSpec => JSON.parse(JSON.stringify(s))
const arrows = (s: SceneSpec) => objects(s).filter((o) => o.type === 'arrow')
const vec = (a: { from?: number[]; to?: number[] }) => [a.to![0] - a.from![0], a.to![1] - a.from![1]]
const co2 = (s: SceneSpec) => arrows(s).filter((a) => a.from![0] < 0)
const water = (s: SceneSpec) => arrows(s).filter((a) => a.from![0] > 2 && a.from![0] < 8)
const netArrow = (s: SceneSpec) => arrows(s).find((a) => a.from![0] === NET_X)!

describe('polar molecules figure', () => {
  it('is a valid scene, deterministic, and served for chem.bond.polar-molecules', () => {
    expect(validateSceneSpec(spec as never).valid).toBe(true)
    expect(JSON.stringify(buildPolarMoleculesScene())).toBe(JSON.stringify(spec))
    expect((buildCanonicalScene(null, 'chem.bond.polar-molecules') as SceneSpec).id).toBe(spec.id)
  })
  it('passes its own consistency check', () => { expect(checkPolarMoleculesConsistency(spec)).toEqual({ ok: true, errors: [] }) })

  it('CO₂ is linear (C between the O atoms, 180°) and its two DRAWN bond dipoles sum to zero', () => {
    expect(CO2.o1[1]).toBe(CO2.c[1]); expect(CO2.o2[1]).toBe(CO2.c[1]); expect(CO2.o1[0]).toBeLessThan(CO2.c[0]); expect(CO2.o2[0]).toBeGreaterThan(CO2.c[0])
    const [a, b] = co2(spec).map(vec)
    expect(a[0] + b[0]).toBeCloseTo(0, 9); expect(a[1] + b[1]).toBeCloseTo(0, 9)
    expect(Math.hypot(a[0], a[1])).toBeGreaterThan(1)
  })
  it('water is bent at 104.5° (angle between the DRAWN O–H bonds) and its two dipoles add to a non-zero vector pointing toward O', () => {
    const b1 = [H2O.h1[0] - H2O.o[0], H2O.h1[1] - H2O.o[1]], b2 = [H2O.h2[0] - H2O.o[0], H2O.h2[1] - H2O.o[1]]
    const ang = (Math.acos((b1[0] * b2[0] + b1[1] * b2[1]) / (Math.hypot(...b1) * Math.hypot(...b2))) * 180) / Math.PI
    expect(ang).toBeCloseTo(104.5, 0)
    expect(Math.hypot(...b1)).toBeCloseTo(BOND, 1)
    const sum = water(spec).map(vec).reduce((t, x) => [t[0] + x[0], t[1] + x[1]], [0, 0])
    expect(Math.hypot(sum[0], sum[1])).toBeGreaterThan(0.5)
    expect(sum[1]).toBeGreaterThan(0)                // toward O, which is above the H atoms
    expect(Math.abs(sum[0])).toBeLessThan(0.05)      // on the bisector: the x components cancel
  })
  it('the net arrow IS that sum, in direction and length', () => {
    const n = vec(netArrow(spec)), s = netOfWater()
    expect(n[0]).toBeCloseTo(s[0], 2); expect(n[1]).toBeCloseTo(s[1], 2)
  })
  it('every bond dipole points toward the more electronegative atom (O)', () => {
    for (const a of co2(spec)) expect(Math.min(Math.hypot(a.to![0] - CO2.o1[0], a.to![1] - CO2.o1[1]), Math.hypot(a.to![0] - CO2.o2[0], a.to![1] - CO2.o2[1]))).toBeLessThan(1.2)
    for (const a of water(spec)) expect(Math.hypot(a.to![0] - H2O.o[0], a.to![1] - H2O.o[1])).toBeLessThan(1.2)
  })
  it('narration stays inside the figure panel budget and says shape decides', () => {
    expect(spec.steps.reduce((n, s) => n + (s.narration ?? '').length, 0)).toBeLessThan(950)
    expect(spec.steps.map((s) => s.narration).join(' ')).toMatch(/necessary, but not sufficient/)
  })

  // Mutations: figures that look the same and say something false.
  it('CO₂ dipoles drawn to add (not cancel) are rejected', () => {
    const bad = clone(spec); const a = co2(bad)[1]; [a.from, a.to] = [a.to, a.from]
    expect(checkPolarMoleculesConsistency(bad).errors.join(' ')).toMatch(/do not cancel/)
  })
  it('water drawn with its dipoles cancelling (a linear water) is rejected', () => {
    const bad = clone(spec); const a = water(bad)[1]; [a.from, a.to] = [a.to, a.from]
    expect(checkPolarMoleculesConsistency(bad).ok).toBe(false)
  })
  it('a net arrow that is not the sum is rejected', () => {
    const bad = clone(spec); netArrow(bad).to![1] += 1.5
    expect(checkPolarMoleculesConsistency(bad).errors.join(' ')).toMatch(/not the sum/)
  })
  it('a net arrow pointing away from O is rejected', () => {
    const bad = clone(spec); const n = netArrow(bad); [n.from, n.to] = [n.to, n.from]
    expect(checkPolarMoleculesConsistency(bad).ok).toBe(false)
  })
})
