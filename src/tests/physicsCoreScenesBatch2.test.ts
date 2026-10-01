/**
 * Physics visual gap campaign, batch 2 (2026-09-30): twelve more concepts own an
 * authored figure. Each test checks the physics drawn, not only that it exists.
 */
import { describe, it, expect } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { INSUFFICIENT_FOR_CONCEPT } from '@/lib/teaching/visual/scope'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import {
  buildKineticEnergyScene, buildPotentialEnergyScene, buildWorkScene, buildNewtonsThirdLawScene,
  buildInclinedPlaneScene, buildPressureFluidsScene, buildImpulseScene, buildThermalExpansionScene,
  buildPhaseTransitionsScene, buildIdealGasScene, buildWavePropertiesScene, buildLongitudinalWaveScene,
} from '@/lib/teaching/sceneGenerators/physicsCoreScenes'

type Obj = { type?: string; text?: string; from?: number[]; to?: number[]; position?: number[]; points?: number[][]; thickness?: number }
const objs = (s: SceneSpec): Obj[] => s.steps.flatMap((st) => st.objects as Obj[])
const texts = (s: SceneSpec) => objs(s).map((o) => o.text ?? '').join(' | ')
const arrows = (s: SceneSpec) => objs(s).filter((o) => o.type === 'arrow' && o.from && o.to)
const len = (a: Obj) => Math.hypot(a.to![0] - a.from![0], a.to![1] - a.from![1])
const bars = (s: SceneSpec) => objs(s).filter((o) => o.from && o.to && o.type !== 'arrow' && (o.thickness ?? 0) >= 0.15)

const BATCH: Array<[string, () => SceneSpec, string]> = [
  ['phys.mech.kinetic-energy', buildKineticEnergyScene, 'phys-kinetic-energy'],
  ['phys.mech.potential-energy', buildPotentialEnergyScene, 'phys-potential-energy'],
  ['phys.mech.work', buildWorkScene, 'phys-work'],
  ['phys.mech.newtons-third-law', buildNewtonsThirdLawScene, 'phys-newtons-third-law'],
  ['phys.mech.inclined-plane', buildInclinedPlaneScene, 'phys-inclined-plane'],
  ['phys.mech.pressure-fluids', buildPressureFluidsScene, 'phys-pressure-fluids'],
  ['phys.mech.impulse', buildImpulseScene, 'phys-impulse'],
  ['phys.therm.thermal-expansion', buildThermalExpansionScene, 'phys-thermal-expansion'],
  ['phys.therm.phase-transitions', buildPhaseTransitionsScene, 'phys-phase-transitions'],
  ['phys.therm.ideal-gas-law', buildIdealGasScene, 'phys-ideal-gas'],
  ['phys.wave.wave-properties', buildWavePropertiesScene, 'phys-wave-properties'],
  ['phys.wave.longitudinal-waves', buildLongitudinalWaveScene, 'phys-longitudinal-wave'],
]

describe('each concept is served its own figure, as a figure OF the concept', () => {
  it.each(BATCH)('%s', (conceptId, build, id) => {
    for (const req of [null, 'diagram'] as const) {
      const d = resolveVisual({ message: req ? 'show me a diagram' : '', lessonConceptId: conceptId, learnerRequest: req, subject: 'physics' } as Parameters<typeof resolveVisual>[0])
      expect(d.graphical, conceptId).toBe(true)
      expect(d.asset?.scope, conceptId).toBe('concept')
      expect((d.payload as { sceneSpec?: { id?: string } }).sceneSpec?.id).toBe(id)
    }
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
  it('kinetic energy: twice the speed, four times the KE bar', () => {
    const [b1, b2] = bars(buildKineticEnergyScene()).map((b) => b.to![0] - b.from![0])
    expect(b2 / b1).toBeCloseTo(4, 1)
  })
  it('potential energy: twice the height, twice the PE bar', () => {
    const [b1, b2] = bars(buildPotentialEnergyScene()).map((b) => b.to![0] - b.from![0])
    expect(b2 / b1).toBeCloseTo(2, 1)
  })
  it('work: the drawn component along d is F cos 30°', () => {
    const F = arrows(buildWorkScene()).find((a) => a.to![1] > a.from![1])!
    const comp = objs(buildWorkScene()).find((o) => o.type !== 'arrow' && o.from && o.to && o.from[1] === F.from![1] && o.to[1] === F.from![1])!
    expect(comp.to![0] - comp.from![0]).toBeCloseTo(len(F) * Math.cos(Math.PI / 6), 1)
  })
  it("Newton's third law: equal, opposite, on two different bodies", () => {
    const [a, b] = arrows(buildNewtonsThirdLawScene())
    expect(len(a)).toBeCloseTo(len(b), 5)
    expect(Math.sign(a.to![0] - a.from![0])).toBe(-Math.sign(b.to![0] - b.from![0]))
    expect(texts(buildNewtonsThirdLawScene())).toMatch(/force on A by B/)
    expect(texts(buildNewtonsThirdLawScene())).toMatch(/force on B by A/)
  })
  it('inclined plane: mg sin θ and mg cos θ are the right components, N balances mg cos θ', () => {
    const a = arrows(buildInclinedPlaneScene())
    const mg = len(a[0])
    expect(len(a[1])).toBeCloseTo(mg * Math.sin(Math.PI / 6), 1)
    expect(len(a[2])).toBeCloseTo(mg * Math.cos(Math.PI / 6), 1)
    expect(len(a[3])).toBeCloseTo(len(a[2]), 5)
    // the two components add back to the weight (vector sum points straight down)
    const sx = (a[1].to![0] - a[1].from![0]) + (a[2].to![0] - a[2].from![0])
    expect(sx).toBeCloseTo(0, 1)
  })
  it('pressure: arrows are longer at the deeper point, equal in all four directions', () => {
    const a = arrows(buildPressureFluidsScene())
    const shallow = a.slice(0, 4).map(len), deep = a.slice(4, 8).map(len)
    for (const l of shallow) expect(l).toBeCloseTo(shallow[0], 5)
    for (const l of deep) expect(l).toBeCloseTo(deep[0], 5)
    expect(deep[0]).toBeGreaterThan(shallow[0])
  })
  it('impulse: the area under F–t is labelled impulse = Δp', () => {
    expect(texts(buildImpulseScene())).toMatch(/area = impulse/)
    expect(texts(buildImpulseScene())).toMatch(/Δp/)
  })
  it('thermal expansion: the heated rod is longer', () => {
    const rods = bars(buildThermalExpansionScene()).map((b) => b.to![0] - b.from![0])
    expect(rods[1]).toBeGreaterThan(rods[0])
  })
  it('heating curve: the melting and boiling segments are flat, the rest rise', () => {
    const segs = objs(buildPhaseTransitionsScene()).filter((o) => o.type !== 'arrow' && o.from && o.to && (o.thickness ?? 0) >= 0.06)
    const flat = segs.filter((s) => s.from![1] === s.to![1])
    const rising = segs.filter((s) => s.to![1] > s.from![1])
    expect(flat.length).toBe(2)
    expect(rising.length).toBe(3)
    const [melt, boil] = flat.map((s) => s.to![0] - s.from![0])
    expect(boil).toBeGreaterThan(melt)
  })
  it('ideal gas: PV is constant along each curve, and the hotter curve is higher', () => {
    const curves = objs(buildIdealGasScene()).filter((o) => o.type === 'path' && o.points)
    const pv = (pts: number[][]) => pts.map((p) => (p[0] + 4) * (p[1] + 2.6))
    for (const c of curves) { const v = pv(c.points!); for (const x of v) expect(x).toBeCloseTo(v[0], 0) }
    expect(pv(curves[1].points!)[0]).toBeCloseTo(2 * pv(curves[0].points!)[0], 0)
  })
  it('wave properties: crest, trough, amplitude and wavelength are all named; v = fλ', () => {
    const t = texts(buildWavePropertiesScene())
    for (const w of ['crest', 'trough', 'amplitude', 'wavelength', 'v = f λ']) expect(t).toContain(w)
  })
  it('longitudinal wave: particles are densest at the compression and sparsest at the rarefaction', () => {
    const xs = objs(buildLongitudinalWaveScene()).filter((o) => o.type === 'node' && o.position![1] === 0.3).map((o) => o.position![0]).sort((a, b) => a - b)
    const density = (x: number) => xs.filter((p) => Math.abs(p - x) < 0.6).length
    expect(density(-4.4 + 2.2)).toBeGreaterThan(density(-4.4 + 4.4))
  })
})
