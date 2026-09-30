/**
 * Physics visual gap campaign, batch 7 (2026-09-30): measurement, mechanics,
 * gravitation. Each test checks the PHYSICS drawn.
 */
import { describe, it, expect } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { isRetiredVisualBinding } from '@/lib/teaching/visual/retired'
import { INSUFFICIENT_FOR_CONCEPT } from '@/lib/teaching/visual/scope'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import {
  buildSiUnitsScene, buildDimensionsScene, buildMeasurementErrorsScene, buildSignificantFiguresScene,
  buildUnitConversionScene, buildWorkEnergyTheoremScene, buildAngularKinematicsScene, buildRollingMotionScene,
  buildGravitationalPotentialScene, buildKeplersLawsScene, buildEscapeVelocityScene, buildStressStrainScene,
  buildThirdLawScene, SI_BASE, readingStats, sigFigs, RULER_READING, kmhToMs, KMH, workEnergy,
  rollingPointVelocity, keplerPosition, KEPLER, earthSpeeds, launchPath, stressOf, crystalEntropy,
} from '@/lib/teaching/sceneGenerators/physicsCoreScenesB7'

type Obj = { type?: string; text?: string; color?: string; from?: number[]; to?: number[]; position?: number[]; points?: number[][] }
const objs = (s: SceneSpec): Obj[] => s.steps.flatMap((st) => st.objects as Obj[])
const texts = (s: SceneSpec) => objs(s).map((o) => o.text ?? '').join(' | ')
const arrows = (s: SceneSpec) => objs(s).filter((o) => o.type === 'arrow' && o.from && o.to)
const len = (a: Obj) => Math.hypot(a.to![0] - a.from![0], a.to![1] - a.from![1])

const BATCH: Array<[string, () => SceneSpec, string]> = [
  ['phys.meas.units', buildSiUnitsScene, 'phys-si-units'],
  ['phys.meas.dimensions', buildDimensionsScene, 'phys-dimensions'],
  ['phys.meas.errors', buildMeasurementErrorsScene, 'phys-measurement-errors'],
  ['phys.meas.significant-figures', buildSignificantFiguresScene, 'phys-significant-figures'],
  ['phys.meas.unit-conversion', buildUnitConversionScene, 'phys-unit-conversion'],
  ['phys.mech.work-energy-theorem', buildWorkEnergyTheoremScene, 'phys-work-energy-theorem'],
  ['phys.mech.angular-kinematics', buildAngularKinematicsScene, 'phys-angular-kinematics'],
  ['phys.mech.rolling-motion', buildRollingMotionScene, 'phys-rolling'],
  ['phys.mech.gravitational-potential', buildGravitationalPotentialScene, 'phys-gravitational-potential'],
  ['phys.mech.keplers-laws', buildKeplersLawsScene, 'phys-keplers-laws'],
  ['phys.mech.escape-velocity', buildEscapeVelocityScene, 'phys-escape-velocity'],
  ['phys.mech.stress-strain', buildStressStrainScene, 'phys-stress-strain'],
  ['phys.therm.third-law', buildThirdLawScene, 'phys-third-law'],
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
  it('SI: all seven base units are named', () => {
    const t = texts(buildSiUnitsScene())
    expect(SI_BASE.length).toBe(7)
    for (const [q, u] of SI_BASE) expect(t).toContain(`${q}: ${u}`)
  })

  it('dimensions: v = u + at is consistent, v = u + at² is not', () => {
    const t = texts(buildDimensionsScene())
    expect(t).toContain('at: [L T⁻²][T] = [L T⁻¹]')
    expect(t).toContain('at²: [L]  ≠  [L T⁻¹]')
  })

  it('errors: mean 9.92, absolute error 0.08, relative 0.8 %', () => {
    expect(readingStats()).toEqual({ mean: 9.92, abs: 0.08, rel: 0.8 })
  })

  it('significant figures: 4.37 has three', () => {
    expect(sigFigs(String(RULER_READING))).toBe(3)
    expect(sigFigs('0.0450')).toBe(3)
  })

  it('unit conversion: 72 km/h = 20 m/s', () => {
    expect(kmhToMs(KMH)).toBe(20)
    expect(texts(buildUnitConversionScene())).toContain('72 km/h = 20 m/s')
  })

  it('work–energy: W = Fd equals the gain in KE, and the KE bars show it', () => {
    const e = workEnergy()
    expect(e.KE2 - e.KE1).toBe(e.W)
    const bars = objs(buildWorkEnergyTheoremScene()).filter((o) => o.type === 'bond' && o.from![1] === -1 && o.to![1] === -1).map(len)
    expect(bars[1] / bars[0]).toBeCloseTo(e.KE2 / e.KE1, 1)
  })

  it('angular kinematics: v = ωr — twice the radius, twice the speed, perpendicular to the radius', () => {
    const [inner, outer] = arrows(buildAngularKinematicsScene())
    expect(len(outer) / len(inner)).toBeCloseTo(2, 1) // coordinates are rounded to 0.01
    const radial = [outer.from![0], outer.from![1]], t = [outer.to![0] - outer.from![0], outer.to![1] - outer.from![1]]
    expect(Math.abs(radial[0] * t[0] + radial[1] * t[1])).toBeLessThan(0.05)
  })

  it('rolling: top 2v, centre v, contact 0', () => {
    expect(rollingPointVelocity(1.8, 1, 1.8)).toBe(2)
    expect(rollingPointVelocity(0, 1, 1.8)).toBe(1)
    expect(rollingPointVelocity(-1.8, 1, 1.8)).toBe(0)
    const [c, top] = arrows(buildRollingMotionScene())
    expect(len(top) / len(c)).toBeCloseTo(2, 5)
  })

  it('gravitational potential: negative everywhere and rising toward zero', () => {
    const curve = objs(buildGravitationalPotentialScene()).find((o) => o.type === 'path')!.points!
    for (let i = 1; i < curve.length; i++) expect(curve[i][1]).toBeGreaterThanOrEqual(curve[i - 1][1])
    for (const p of curve) expect(p[1]).toBeLessThan(2.4) // below the U = 0 axis
  })

  it("Kepler: equal-time sectors near perihelion and aphelion have equal areas", () => {
    const area = (M0: number) => {
      let A = 0
      const n = 400, dM = 0.35
      for (let i = 0; i < n; i++) {
        const [x1, y1] = keplerPosition(M0 - dM / 2 + (dM * i) / n), [x2, y2] = keplerPosition(M0 - dM / 2 + (dM * (i + 1)) / n)
        A += 0.5 * Math.abs(x1 * y2 - x2 * y1)
      }
      return A
    }
    expect(area(0)).toBeCloseTo(area(Math.PI), 3)
    const peri = keplerPosition(0), aph = keplerPosition(Math.PI)
    expect(Math.hypot(...peri)).toBeCloseTo(KEPLER.a * (1 - KEPLER.e), 5)
    expect(Math.hypot(...aph)).toBeCloseTo(KEPLER.a * (1 + KEPLER.e), 5)
  })

  it('escape velocity: 7.91 and 11.19 km/s; slow falls back, circular stays, √2 escapes', () => {
    expect(earthSpeeds()).toEqual({ circ: 7.91, esc: 11.19 })
    const slow = launchPath(0.7, 1.5, 1.0), circ = launchPath(1, 1.5, 1.0), esc = launchPath(Math.SQRT2, 1.5, 1.0)
    const r = (p: number[]) => Math.hypot(p[0], p[1])
    expect(r(slow[slow.length - 1])).toBeLessThan(1.1)            // reached the ground
    for (const p of circ) expect(r(p)).toBeCloseTo(1.5, 1)
    expect(r(esc[esc.length - 1])).toBeGreaterThan(4)              // left the frame
  })

  it('stress–strain: straight (slope E) to the elastic limit, then flatter', () => {
    expect(stressOf(0.5) / 0.5).toBeCloseTo(stressOf(1.0) / 1.0, 5)
    expect(stressOf(2) - stressOf(1)).toBeLessThan(stressOf(1) - stressOf(0))
  })

  it('third law: S → 0 as T → 0, ∝ T³ near zero, still rising at higher T', () => {
    expect(crystalEntropy(0)).toBe(0)
    expect(crystalEntropy(0.2) / crystalEntropy(0.1)).toBeCloseTo(8, 0)
    expect(crystalEntropy(3.0)).toBeGreaterThan(crystalEntropy(2.5))
  })
})
