/**
 * Physics visual gap campaign, batch 4 (2026-09-30): electromagnetism, AC,
 * modern physics and wave optics. Each test checks the PHYSICS the figure draws.
 */
import { describe, it, expect } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { isRetiredVisualBinding } from '@/lib/teaching/visual/retired'
import { INSUFFICIENT_FOR_CONCEPT } from '@/lib/teaching/visual/scope'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import {
  buildElectricPotentialScene, buildMagneticForceScene, buildMagneticFluxScene, buildFaradaysLawScene,
  buildLenzsLawScene, buildAcBasicsScene, buildRcCircuitScene, buildElectromagneticWaveScene,
  buildPhotoelectricScene, buildRadioactiveDecayScene, buildPolarizationScene, buildDiffractionScene,
  POTENTIAL_KQ, LORENTZ_V, LORENTZ_B, faradayFlux, faradayEmf, AC_PEAK, PE_F0, DIFF_LAMBDA, EMW_OBLIQUE,
} from '@/lib/teaching/sceneGenerators/physicsCoreScenesB4'

type Obj = { type?: string; text?: string; color?: string; from?: number[]; to?: number[]; position?: number[]; points?: number[][] }
const objs = (s: SceneSpec): Obj[] => s.steps.flatMap((st) => st.objects as Obj[])
const texts = (s: SceneSpec) => objs(s).map((o) => o.text ?? '').join(' | ')
const arrows = (s: SceneSpec) => objs(s).filter((o) => o.type === 'arrow' && o.from && o.to)
const paths = (s: SceneSpec) => objs(s).filter((o) => o.type === 'path' && o.points && o.points.length > 0)
const labelAt = (s: SceneSpec, text: string) => objs(s).find((o) => o.text === text)!.position!

const BATCH: Array<[string, () => SceneSpec, string]> = [
  ['phys.em.electric-potential', buildElectricPotentialScene, 'phys-electric-potential'],
  ['phys.em.magnetic-force', buildMagneticForceScene, 'phys-magnetic-force'],
  ['phys.em.magnetic-flux', buildMagneticFluxScene, 'phys-magnetic-flux'],
  ['phys.em.faradays-law', buildFaradaysLawScene, 'phys-faradays-law'],
  ['phys.em.lenzs-law', buildLenzsLawScene, 'phys-lenzs-law'],
  ['phys.em.ac-basics', buildAcBasicsScene, 'phys-ac-basics'],
  ['phys.em.rc-circuits', buildRcCircuitScene, 'phys-rc-circuits'],
  ['phys.em.electromagnetic-waves', buildElectromagneticWaveScene, 'phys-electromagnetic-wave'],
  ['phys.mod.photoelectric-effect', buildPhotoelectricScene, 'phys-photoelectric'],
  ['phys.mod.radioactive-decay', buildRadioactiveDecayScene, 'phys-radioactive-decay'],
  ['phys.opt.polarization', buildPolarizationScene, 'phys-polarization'],
  ['phys.opt.diffraction', buildDiffractionScene, 'phys-diffraction'],
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
  it('electric potential: V = kQ/r on each equipotential, field lines radial', () => {
    const t = texts(buildElectricPotentialScene())
    for (const r of [1, 2, 3, 4]) expect(t).toContain(`${Math.round((POTENTIAL_KQ / r) * 100) / 100} V`)
    for (const a of arrows(buildElectricPotentialScene())) {
      const cross = a.from![0] * a.to![1] - a.from![1] * a.to![0]
      expect(Math.abs(cross)).toBeLessThan(0.05) // along a radius
      expect(Math.hypot(a.to![0], a.to![1])).toBeGreaterThan(Math.hypot(a.from![0], a.from![1])) // outward from +Q
    }
  })

  it('magnetic force: F is v × B for a positive charge and the orbit centre lies along F', () => {
    const s = buildMagneticForceScene()
    const F = [LORENTZ_V[1] * LORENTZ_B[2] - LORENTZ_V[2] * LORENTZ_B[1], LORENTZ_V[2] * LORENTZ_B[0] - LORENTZ_V[0] * LORENTZ_B[2], LORENTZ_V[0] * LORENTZ_B[1] - LORENTZ_V[1] * LORENTZ_B[0]]
    const force = arrows(s).find((a) => a.color === '#22c55e')!
    const dir = [force.to![0] - force.from![0], force.to![1] - force.from![1]]
    expect(Math.sign(dir[1])).toBe(Math.sign(F[1]))
    expect(Math.abs(dir[0])).toBeLessThan(1e-9)
    const orbit = paths(s)[0].points!
    const cy = (Math.max(...orbit.map((p) => p[1])) + Math.min(...orbit.map((p) => p[1]))) / 2
    expect(cy).toBeGreaterThan(force.from![1]) // curves toward F
  })

  it('magnetic flux: the tilted loop catches fewer field lines, Φ = BA cos 60° = 0.5 BA', () => {
    const s = buildMagneticFluxScene()
    const through = (xMin: number) => arrows(s).filter((a) => a.from![0] >= xMin && a.from![0] < xMin + 1 && a.color === '#3b82f6').length
    expect(through(-4.6)).toBe(5)
    expect(through(0.5)).toBe(3)
    expect(texts(s)).toContain('= 0.5 BA')
  })

  it("Faraday: ε = −dΦ/dt — negative while Φ rises, zero while constant, positive while it falls", () => {
    expect(faradayEmf(1)).toBeCloseTo(-0.8, 5)
    expect(faradayEmf(3)).toBeCloseTo(0, 5)
    expect(faradayEmf(5)).toBeCloseTo(0.8, 5)
    expect(faradayFlux(3)).toBe(1.6)
  })

  it("Lenz: the induced field inside the coil points against the magnet's increasing field", () => {
    const s = buildLenzsLawScene()
    const magnet = arrows(s).find((a) => a.color === '#ef4444')!
    const induced = arrows(s).find((a) => a.color === '#3b82f6')!
    expect(Math.sign(induced.to![0] - induced.from![0])).toBe(-Math.sign(magnet.to![0] - magnet.from![0]))
  })

  it('AC: V_rms = V₀/√2', () => {
    const rms = Math.round((AC_PEAK / Math.SQRT2) * 100) / 100
    expect(texts(buildAcBasicsScene())).toContain(`= ${rms} V`)
    const rmsLine = objs(buildAcBasicsScene()).find((o) => o.type === 'bond' && o.color === '#22c55e')!
    expect(rmsLine.from![1]).toBeCloseTo(rms, 5)
  })

  it('RC: the curve passes through 0.63 V₀ at t = τ', () => {
    expect(texts(buildRcCircuitScene())).toContain('V = 0.63 V₀')
    const dot = objs(buildRcCircuitScene()).find((o) => o.type === 'node')!
    const [curve] = paths(buildRcCircuitScene())
    const near = curve.points!.reduce((b, p) => (Math.abs(p[0] - dot.position![0]) < Math.abs(b[0] - dot.position![0]) ? p : b))
    expect(near[1]).toBeCloseTo(dot.position![1], 1)
  })

  it('EM wave: E and B are in phase (peaks at the same x) and drawn in perpendicular planes', () => {
    const [e, b] = paths(buildElectromagneticWaveScene())
    const iE = e.points!.findIndex((p) => p[1] === Math.max(...e.points!.map((q) => q[1])))
    const iB = b.points!.findIndex((p) => p[1] === Math.min(...b.points!.map((q) => q[1])))
    expect(Math.abs(iE - iB)).toBeLessThanOrEqual(1)
    expect(EMW_OBLIQUE[1]).toBeLessThan(0)
  })

  it('photoelectric: no emission below f₀; above, a straight line whose extension meets −φ', () => {
    const s = buildPhotoelectricScene()
    const sloped = objs(s).filter((o) => o.type === 'bond' && o.color === '#22c55e')[0]
    const slope = (sloped.to![1] - sloped.from![1]) / (sloped.to![0] - sloped.from![0])
    expect(slope).toBeGreaterThan(0)
    expect(sloped.from![0] - labelAt(s, 'f₀')[0]).toBeCloseTo(0, 5)
    expect(labelAt(s, 'f₀')[0] - (-0.6)).toBeCloseTo(PE_F0, 5)
    expect(texts(s)).toContain('KE_max = hf − φ')
  })

  it('radioactive decay: halves every half-life', () => {
    const s = buildRadioactiveDecayScene()
    const dots = objs(s).filter((o) => o.type === 'node').map((o) => o.position![1] + 2.6)
    expect(dots[1] / dots[0]).toBeCloseTo(0.5, 1)
    expect(dots[2] / dots[1]).toBeCloseTo(0.5, 1)
  })

  it('polarization: the crossed second polarizer passes I = 0', () => {
    expect(texts(buildPolarizationScene())).toContain('I = 0')
    expect(texts(buildPolarizationScene())).toContain('I₀/2')
  })

  it('diffraction: wavefronts keep their spacing λ after the gap', () => {
    const arcs = paths(buildDiffractionScene())
    const radius = (o: Obj) => Math.max(...o.points!.map((p) => p[0])) + 0.6
    for (let i = 1; i < arcs.length; i++) expect(radius(arcs[i]) - radius(arcs[i - 1])).toBeCloseTo(DIFF_LAMBDA, 1)
  })
})
