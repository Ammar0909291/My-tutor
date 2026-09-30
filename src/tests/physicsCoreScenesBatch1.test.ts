/**
 * Physics visual gap campaign, batch 1 (2026-09-30): ten core concepts that had
 * no deterministic figure (or only a general illustration / a retired one) now
 * own an authored figure. Each test checks the PHYSICS the figure draws, not
 * just that a figure exists.
 */
import { describe, it, expect } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { isRetiredVisualBinding } from '@/lib/teaching/visual/retired'
import { INSUFFICIENT_FOR_CONCEPT } from '@/lib/teaching/visual/scope'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import {
  buildReflectionScene, buildCoulombsLawScene, buildElectricFieldScene, buildMagneticFieldScene,
  buildStandingWavesScene, buildDopplerScene, buildConservationOfEnergyScene, buildHeatTransferScene,
  buildBuoyancyScene, buildHookesLawScene,
} from '@/lib/teaching/sceneGenerators/physicsCoreScenes'

type Obj = { type?: string; text?: string; from?: number[]; to?: number[]; position?: number[]; points?: number[][] }
const objs = (s: SceneSpec): Obj[] => s.steps.flatMap((st) => st.objects as Obj[])
const texts = (s: SceneSpec) => objs(s).map((o) => o.text ?? '').join(' | ')
const arrows = (s: SceneSpec) => objs(s).filter((o) => o.type === 'arrow' && o.from && o.to)
const len = (a: Obj) => Math.hypot(a.to![0] - a.from![0], a.to![1] - a.from![1])

const BATCH: Array<[string, () => SceneSpec, string]> = [
  ['phys.opt.reflection', buildReflectionScene, 'phys-reflection'],
  ['phys.em.coulombs-law', buildCoulombsLawScene, 'phys-coulombs-law'],
  ['phys.em.electric-field', buildElectricFieldScene, 'phys-electric-field'],
  ['phys.em.magnetic-field', buildMagneticFieldScene, 'phys-magnetic-field'],
  ['phys.wave.standing-waves', buildStandingWavesScene, 'phys-standing-waves'],
  ['phys.wave.doppler-effect', buildDopplerScene, 'phys-doppler'],
  ['phys.mech.conservation-of-energy', buildConservationOfEnergyScene, 'phys-conservation-of-energy'],
  ['phys.therm.heat-transfer', buildHeatTransferScene, 'phys-heat-transfer'],
  ['phys.mech.buoyancy', buildBuoyancyScene, 'phys-buoyancy'],
  ['phys.mech.hookes-law', buildHookesLawScene, 'phys-hookes-law'],
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
    // Rule 5: everything inside ±5 so nothing is clipped at any width.
    for (const o of objs(build())) {
      for (const p of [o.from, o.to, o.position, ...(o.points ?? [])].filter(Boolean) as number[][]) {
        expect(Math.abs(p[0]), `${conceptId} x`).toBeLessThanOrEqual(5)
        expect(Math.abs(p[1]), `${conceptId} y`).toBeLessThanOrEqual(5)
      }
    }
  })
})

describe('the physics each figure draws', () => {
  it('reflection: the reflected ray leaves at the same angle to the normal', () => {
    const [inc, ref] = arrows(buildReflectionScene())
    const angle = (dx: number, dy: number) => Math.atan2(Math.abs(dx), Math.abs(dy))
    expect(angle(inc.from![0], inc.from![1])).toBeCloseTo(angle(ref.to![0], ref.to![1]), 5)
    expect(inc.from![0]).toBeLessThan(0)
    expect(ref.to![0]).toBeGreaterThan(0)
    expect(texts(buildReflectionScene())).toContain('normal')
  })

  it("Coulomb: at twice the distance the force arrow is a quarter as long", () => {
    const a = arrows(buildCoulombsLawScene())
    const near = a.filter((x) => x.from![1] > 0).map(len)
    const far = a.filter((x) => x.from![1] < 0).map(len)
    expect(near[0]).toBeCloseTo(near[1], 5)            // equal and opposite
    expect(far[0]).toBeCloseTo(near[0] / 4, 1)         // 1 / r²
  })

  it('electric field: arrows point away from + and toward −', () => {
    const a = arrows(buildElectricFieldScene()).filter((x) => Math.abs(x.from![1]) < 2 && Math.abs(x.to![1]) < 2)
    const dist = (p: number[], cx: number) => Math.hypot(p[0] - cx, p[1])
    for (const x of a.filter((x) => x.from![0] < 0)) expect(dist(x.to!, -2.4)).toBeGreaterThan(dist(x.from!, -2.4))
    for (const x of a.filter((x) => x.from![0] > 0)) expect(dist(x.to!, 2.4)).toBeLessThan(dist(x.from!, 2.4))
  })

  it('magnetic field: outside the magnet the lines run from N (right) to S (left)', () => {
    const marks = arrows(buildMagneticFieldScene())
    expect(marks.length).toBeGreaterThan(0)
    for (const m of marks) expect(m.to![0]).toBeLessThan(m.from![0])
    expect(texts(buildMagneticFieldScene())).toMatch(/\bN\b.*\bS\b|\bS\b.*\bN\b/)
  })

  it('standing waves: nodes at both ends and every λ/2, antinodes midway', () => {
    const t = texts(buildStandingWavesScene())
    expect(t).toContain('node')
    expect(t).toContain('antinode')
    const nodeDots = objs(buildStandingWavesScene()).filter((o) => o.type === 'node' && o.position && o.position[1] === 0)
    const xs = [...new Set(nodeDots.map((o) => o.position![0]))].sort((a, b) => a - b)
    expect(xs[0]).toBe(-4)
    expect(xs[xs.length - 1]).toBe(4)
    expect(xs.length).toBe(4) // third harmonic: 4 nodes
  })

  it('Doppler: older wavefronts are centred further behind the source', () => {
    const circles = objs(buildDopplerScene()).filter((o) => o.type === 'path' && o.points)
    const centre = (pts: number[][]) => (Math.max(...pts.map((p) => p[0])) + Math.min(...pts.map((p) => p[0]))) / 2
    const radius = (pts: number[][]) => (Math.max(...pts.map((p) => p[0])) - Math.min(...pts.map((p) => p[0]))) / 2
    const cs = circles.map((c) => ({ c: centre(c.points!), r: radius(c.points!) })).sort((a, b) => b.r - a.r)
    for (let i = 1; i < cs.length; i++) expect(cs[i].c).toBeGreaterThan(cs[i - 1].c) // bigger (older) = further left
    // bunched ahead: the gap between successive fronts is smaller on the right
    const rightGap = (cs[0].c + cs[0].r) - (cs[1].c + cs[1].r)
    const leftGap = (cs[1].c - cs[1].r) - (cs[0].c - cs[0].r)
    expect(rightGap).toBeLessThan(leftGap)
  })

  it('conservation of energy: PE + KE is the same at every height', () => {
    const bars = objs(buildConservationOfEnergyScene()).filter((o) => o.type === 'line' || (o.from && o.to && o.type !== 'arrow'))
      .filter((o) => o.from && o.to && o.from[0] === -1.6 && o.from[1] === o.to[1])
    const byRow = new Map<number, number>()
    for (const b of bars) {
      const row = Math.round((b.from![1]) * 10) / 10
      const key = [...byRow.keys()].find((k) => Math.abs(k - row) < 0.5) ?? row
      byRow.set(key, (byRow.get(key) ?? 0) + (b.to![0] - b.from![0]))
    }
    const totals = [...byRow.values()]
    expect(totals.length).toBe(3)
    for (const t of totals) expect(t).toBeCloseTo(totals[0], 1)
  })

  it('heat transfer: all three mechanisms are named', () => {
    const t = texts(buildHeatTransferScene())
    for (const w of ['conduction', 'convection', 'radiation']) expect(t).toContain(w)
  })

  it('buoyancy: floating at rest, buoyant force and weight are equal and opposite', () => {
    const [up, down] = arrows(buildBuoyancyScene())
    expect(len(up)).toBeCloseTo(len(down), 5)
    expect(up.to![1]).toBeGreaterThan(up.from![1])
    expect(down.to![1]).toBeLessThan(down.from![1])
    expect(texts(buildBuoyancyScene())).toContain('displaced water')
  })

  it("Hooke's law: the restoring force points back toward equilibrium, opposite to x", () => {
    const [restoring] = arrows(buildHookesLawScene())
    expect(restoring.to![0]).toBeLessThan(restoring.from![0]) // x is to the right, F to the left
    expect(texts(buildHookesLawScene())).toContain('F = −kx')
  })
})
