/**
 * Physics visual gap campaign, batch 3 (2026-09-30): eleven more concepts that
 * had no deterministic figure now own an authored one. As in batches 1 and 2,
 * each test checks the PHYSICS the figure draws, not just that a figure exists.
 */
import { describe, it, expect } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { isRetiredVisualBinding } from '@/lib/teaching/visual/retired'
import { INSUFFICIENT_FOR_CONCEPT } from '@/lib/teaching/visual/scope'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import {
  buildBernoulliScene, buildCenterOfMassScene, buildMomentOfInertiaScene, buildSpringMassScene,
  buildDampedOscillationScene, buildSuperpositionScene, buildBeatsScene, buildDispersionScene,
  buildSingleSlitScene, buildCapacitanceScene, buildSolenoidScene,
} from '@/lib/teaching/sceneGenerators/physicsCoreScenes'

type Obj = { type?: string; text?: string; color?: string; from?: number[]; to?: number[]; position?: number[]; points?: number[][] }
const objs = (s: SceneSpec): Obj[] => s.steps.flatMap((st) => st.objects as Obj[])
const texts = (s: SceneSpec) => objs(s).map((o) => o.text ?? '').join(' | ')
const arrows = (s: SceneSpec) => objs(s).filter((o) => o.type === 'arrow' && o.from && o.to)
const paths = (s: SceneSpec) => objs(s).filter((o) => o.type === 'path' && o.points && o.points.length > 0)
const labelAt = (s: SceneSpec, text: string) => objs(s).find((o) => o.text === text)!.position!

const BATCH: Array<[string, () => SceneSpec, string]> = [
  ['phys.mech.bernoulli', buildBernoulliScene, 'phys-bernoulli'],
  ['phys.mech.center-of-mass', buildCenterOfMassScene, 'phys-center-of-mass'],
  ['phys.mech.moment-of-inertia', buildMomentOfInertiaScene, 'phys-moment-of-inertia'],
  ['phys.wave.spring-mass', buildSpringMassScene, 'phys-spring-mass'],
  ['phys.wave.damped-oscillations', buildDampedOscillationScene, 'phys-damped-oscillation'],
  ['phys.wave.superposition', buildSuperpositionScene, 'phys-superposition'],
  ['phys.wave.beats', buildBeatsScene, 'phys-beats'],
  ['phys.opt.dispersion', buildDispersionScene, 'phys-dispersion'],
  ['phys.opt.single-slit', buildSingleSlitScene, 'phys-single-slit'],
  ['phys.em.capacitance', buildCapacitanceScene, 'phys-capacitance'],
  ['phys.em.solenoid', buildSolenoidScene, 'phys-solenoid'],
]

describe('each concept is served its own figure, as a figure OF the concept', () => {
  it.each(BATCH)('%s', (conceptId, build, id) => {
    for (const req of [null, 'diagram'] as const) {
      const d = resolveVisual({ message: req ? 'show me a diagram' : '', lessonConceptId: conceptId, learnerRequest: req, subject: 'physics' } as Parameters<typeof resolveVisual>[0])
      expect(d.graphical, conceptId).toBe(true)
      expect(d.asset?.scope, conceptId).toBe('concept')
      expect((d.payload as { sceneSpec?: { id?: string } }).sceneSpec?.id).toBe(id)
    }
    expect(isRetiredVisualBinding(conceptId)).toBe(false)
    expect(INSUFFICIENT_FOR_CONCEPT.has(conceptId)).toBe(false)
    for (const o of objs(build())) {
      for (const p of [o.from, o.to, o.position, ...(o.points ?? [])].filter(Boolean) as number[][]) {
        expect(Math.abs(p[0]), `${conceptId} x`).toBeLessThanOrEqual(5)
        expect(Math.abs(p[1]), `${conceptId} y`).toBeLessThanOrEqual(5)
      }
    }
  })
})

describe('every figure passes the scene validator the renderer uses', () => {
  it.each(BATCH)('%s', (_id, build) => {
    const v = validateSceneSpec(build()) as { valid?: boolean; ok?: boolean; errors?: unknown }
    expect(v.valid ?? v.ok, JSON.stringify(v.errors ?? v)).toBe(true)
  })
})

describe('the physics each figure draws', () => {
  it('Bernoulli: continuity makes the narrow-part arrow longer, and its gauge column shorter', () => {
    const [v1, v2] = arrows(buildBernoulliScene())
    const l1 = v1.to![0] - v1.from![0], l2 = v2.to![0] - v2.from![0]
    expect(l2 / l1).toBeCloseTo(1.2 / 0.5, 1) // A₁v₁ = A₂v₂
    const cols = objs(buildBernoulliScene()).filter((o) => o.type !== 'arrow' && o.from && o.to && o.from[0] === o.to[0])
    const [c1, c2] = cols.map((c) => c.to![1] - c.from![1])
    expect(c2).toBeLessThan(c1)
  })

  it('centre of mass: the mass-weighted average, closer to the heavier mass', () => {
    const s = buildCenterOfMassScene()
    expect(labelAt(s, 'centre of mass')[0]).toBeCloseTo((3 * -3 + 1 * 3) / 4, 5)
  })

  it('moment of inertia: three times the radius is nine times I', () => {
    const t = texts(buildMomentOfInertiaScene())
    expect(t).toContain('I_far = 9 × I_close')
    const rods = objs(buildMomentOfInertiaScene()).filter((o) => o.from && o.to && o.from[1] === o.to[1] && o.from[0] === -o.to[0])
    const [near, far] = rods.map((r) => r.to![0]).sort((a, b) => a - b)
    expect((far / near) ** 2).toBeCloseTo(9, 5)
  })

  it('spring–mass: released from −A, the position trace starts at the bottom', () => {
    const [trace] = paths(buildSpringMassScene()).filter((p) => p.points!.length > 30)
    const ys = trace.points!.map((p) => p[1])
    expect(ys[0]).toBeCloseTo(Math.min(...ys), 2)
    expect(texts(buildSpringMassScene())).toContain('T = 2π√(m/k)')
  })

  it('damped oscillation: every peak stays inside a shrinking envelope', () => {
    const [osc, upper] = paths(buildDampedOscillationScene())
    const env = (x: number) => 2.4 * Math.exp(-0.32 * (x + 4.2))
    for (const [x, y] of osc.points!) expect(Math.abs(y)).toBeLessThanOrEqual(env(x) + 0.01) // points are rounded to 0.01
    expect(upper.points![0][1]).toBeGreaterThan(upper.points![upper.points!.length - 1][1])
  })

  it('superposition: the sum trace is the point-by-point sum of the two waves', () => {
    const [w1, w2, sum] = paths(buildSuperpositionScene())
    const at = (p: Obj, i: number, base: number) => p.points![i][1] - base
    // w1/w2 have 60 samples, sum 120 over the same span: compare the shared ends and midpoint.
    for (const [i, j] of [[0, 0], [w1.points!.length - 1, sum.points!.length - 1]]) {
      expect(at(sum, j, -1.9)).toBeCloseTo(at(w1, i, 2.6) + at(w2, i, 0.9), 5)
    }
  })

  it('beats: one labelled beat spans loud → soft → loud', () => {
    const s = buildBeatsScene()
    expect(texts(s)).toContain('f_beat = |f₁ − f₂|')
    const soft = labelAt(s, 'soft')[0], loud = labelAt(s, 'loud')[0]
    const bar = objs(s).find((o) => o.from && o.to && o.from[1] === -2.3)!
    expect(soft - loud).toBeGreaterThan(0)
    expect(bar.to![0] - bar.from![0]).toBeCloseTo(2 * (soft - (loud - 0.2)), 5)
  })

  it('dispersion: blue is bent more than red, toward the base of the prism', () => {
    const rays = arrows(buildDispersionScene()).filter((a) => a.from![0] > 0)
    const drop = (a: Obj) => a.from![1] - a.to![1]
    const byName = (n: string) => rays.find((r) => objs(buildDispersionScene()).some((o) => o.text === n && o.color === r.color))!
    expect(drop(byName('blue'))).toBeGreaterThan(drop(byName('green')))
    expect(drop(byName('green'))).toBeGreaterThan(drop(byName('red')))
  })

  it('single slit: the central peak is tallest, side maxima under 5 % of it, minima at zero', () => {
    const [curve] = paths(buildSingleSlitScene())
    const ys = curve.points!.map((p) => p[1] + 2.2)
    const peak = Math.max(...ys)
    const outer = curve.points!.filter((p) => Math.abs(p[0]) > 1.2).map((p) => p[1] + 2.2)
    expect(Math.max(...outer) / peak).toBeLessThan(0.05)
    expect(Math.max(...outer)).toBeGreaterThan(0)
  })

  it('capacitor: the field points from the + plate to the − plate', () => {
    const s = buildCapacitanceScene()
    const plus = labelAt(s, '+Q')[0], minus = labelAt(s, '−Q')[0]
    for (const a of arrows(s)) expect(Math.sign(a.to![0] - a.from![0])).toBe(Math.sign(minus - plus))
    expect(texts(s)).toContain('C = Q / V')
  })

  it('solenoid: straight, parallel field lines inside, running toward N', () => {
    const s = buildSolenoidScene()
    const lines = arrows(s)
    expect(lines.length).toBeGreaterThanOrEqual(3)
    for (const a of lines) expect(a.from![1]).toBe(a.to![1])
    const n = labelAt(s, 'N')[0]
    for (const a of lines) expect(Math.sign(a.to![0] - a.from![0])).toBe(Math.sign(n))
  })
})
