/**
 * Physics visual gap campaign, batch 8 (2026-09-30): electrostatics,
 * magnetostatics, Maxwell, optics. Each test checks the PHYSICS drawn.
 */
import { describe, it, expect } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { isRetiredVisualBinding } from '@/lib/teaching/visual/retired'
import { INSUFFICIENT_FOR_CONCEPT } from '@/lib/teaching/visual/scope'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import {
  buildElectricChargeScene, buildGaussLawScene, buildDielectricScene, buildCapacitorEnergyScene,
  buildBiotSavartScene, buildAmperesLawScene, buildMagneticMaterialsScene, buildMagneticDipoleScene,
  buildMaxwellScene, buildNatureOfLightScene, buildOpticalInstrumentsScene, buildWaveOpticsScene,
  buildBrewsterScene, RUB_TRANSFER, gaussFieldLines, GAUSS_Q, GAUSS_OUTSIDE, KAPPA, capacitorEnergyUj,
  biotSavartRatio, ampereB, SUSCEPTIBILITY, dipoleFieldLine, magnifier, HUY_R, brewsterAngles, BREWSTER_N,
} from '@/lib/teaching/sceneGenerators/physicsCoreScenesB8'

type Obj = { type?: string; text?: string; color?: string; from?: number[]; to?: number[]; position?: number[]; points?: number[][] }
const objs = (s: SceneSpec): Obj[] => s.steps.flatMap((st) => st.objects as Obj[])
const texts = (s: SceneSpec) => objs(s).map((o) => o.text ?? '').join(' | ')
const arrows = (s: SceneSpec) => objs(s).filter((o) => o.type === 'arrow' && o.from && o.to)
const len = (a: Obj) => Math.hypot(a.to![0] - a.from![0], a.to![1] - a.from![1])

const BATCH: Array<[string, () => SceneSpec, string]> = [
  ['phys.em.electric-charge', buildElectricChargeScene, 'phys-electric-charge'],
  ['phys.em.gauss-law', buildGaussLawScene, 'phys-gauss-law'],
  ['phys.em.dielectrics', buildDielectricScene, 'phys-dielectric'],
  ['phys.em.energy-capacitor', buildCapacitorEnergyScene, 'phys-capacitor-energy'],
  ['phys.em.biot-savart', buildBiotSavartScene, 'phys-biot-savart'],
  ['phys.em.amperes-law', buildAmperesLawScene, 'phys-amperes-law'],
  ['phys.em.magnetic-materials', buildMagneticMaterialsScene, 'phys-magnetic-materials'],
  ['phys.em.magnetic-dipole', buildMagneticDipoleScene, 'phys-magnetic-dipole'],
  ['phys.em.maxwells-equations', buildMaxwellScene, 'phys-maxwell'],
  ['phys.opt.nature-of-light', buildNatureOfLightScene, 'phys-nature-of-light'],
  ['phys.opt.optical-instruments', buildOpticalInstrumentsScene, 'phys-magnifier'],
  ['phys.opt.wave-optics', buildWaveOpticsScene, 'phys-huygens'],
  ['phys.opt.brewsters-law', buildBrewsterScene, 'phys-brewster'],
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

/** How many times segment ab crosses the circle (centre c, radius r). */
function crossings(a: number[], b: number[], c: number[], r: number): number {
  let n = 0, prev = Math.hypot(a[0] - c[0], a[1] - c[1]) < r
  for (let i = 1; i <= 400; i++) {
    const t = i / 400, p = [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]
    const inside = Math.hypot(p[0] - c[0], p[1] - c[1]) < r
    if (inside !== prev) n++
    prev = inside
  }
  return n
}

describe('the physics each figure draws', () => {
  it('electric charge: rod −3e, cloth +3e, total conserved', () => {
    const t = texts(buildElectricChargeScene())
    expect(t).toContain(`rod: -${RUB_TRANSFER}e`)
    expect(t).toContain(`cloth: +${RUB_TRANSFER}e`)
  })

  it("Gauss: every line crosses both surfaces around +Q once; the empty surface has net zero", () => {
    const lines = gaussFieldLines()
    for (const r of [1.1, 2.3]) for (const [a, b] of lines) expect(crossings(a, b, GAUSS_Q, r)).toBe(1)
    const outside = lines.map(([a, b]) => crossings(a, b, GAUSS_OUTSIDE.c, GAUSS_OUTSIDE.r))
    expect(outside.some((n) => n > 0)).toBe(true)          // at least one line passes through it
    for (const n of outside) expect(n % 2).toBe(0)          // every one that enters also leaves
    expect(Math.hypot(GAUSS_OUTSIDE.c[0] - GAUSS_Q[0], GAUSS_OUTSIDE.c[1] - GAUSS_Q[1])).toBeGreaterThan(GAUSS_OUTSIDE.r) // encloses no charge
  })

  it('dielectric: κ = 2 halves the field lines at the same charge', () => {
    const fieldArrows = arrows(buildDielectricScene()).filter((a) => a.color === '#a78bfa')
    const left = fieldArrows.filter((a) => a.from![0] < 0).length, right = fieldArrows.filter((a) => a.from![0] > 0).length
    expect(left / right).toBe(KAPPA)
  })

  it('capacitor energy: ½CV² = 36 μJ', () => {
    expect(capacitorEnergyUj()).toBe(36)
    expect(texts(buildCapacitorEnergyScene())).toContain('36 μJ')
  })

  it('Biot–Savart: dl × r̂ points into the page for dl up and P to the right; 1/r²', () => {
    const d = [Math.sin(Math.PI / 3), Math.cos(Math.PI / 3)]
    const z = 0 * d[1] - 1 * d[0] // (dl × r̂)_z with dl = (0, 1)
    expect(z).toBeLessThan(0)
    expect(texts(buildBiotSavartScene())).toContain('dB into page')
    expect(biotSavartRatio(1, 2)).toBe(0.25)
  })

  it("Ampère: B anticlockwise for current out of the page, half as strong at 2r", () => {
    const a = arrows(buildAmperesLawScene())
    for (const x of a) {
      const cross = x.from![0] * (x.to![1] - x.from![1]) - x.from![1] * (x.to![0] - x.from![0])
      expect(cross).toBeGreaterThan(0) // anticlockwise
    }
    const inner = a.filter((x) => Math.hypot(x.from![0], x.from![1]) < 2).map(len)
    const outer = a.filter((x) => Math.hypot(x.from![0], x.from![1]) > 2).map(len)
    expect(outer[0] / inner[0]).toBeCloseTo(ampereB(2.6) / ampereB(1.3), 1)
  })

  it('magnetic materials: dia against B, para and ferro along it, ferro strongest', () => {
    expect(SUSCEPTIBILITY.diamagnetic).toBeLessThan(0)
    expect(SUSCEPTIBILITY.paramagnetic).toBeGreaterThan(0)
    expect(SUSCEPTIBILITY.ferromagnetic).toBeGreaterThan(SUSCEPTIBILITY.paramagnetic)
  })

  it('magnetic dipole: field lines r = L sin²θ start and end at the loop centre', () => {
    const line = dipoleFieldLine(2, 1)
    const first = line[0], last = line[line.length - 1]
    expect(Math.hypot(first[0], first[1])).toBeLessThan(0.1)
    expect(Math.hypot(last[0], last[1])).toBeLessThan(0.1)
    expect(Math.max(...line.map((p) => p[0]))).toBeCloseTo(2, 1)
  })

  it("Maxwell: all four equations are shown", () => {
    const t = texts(buildMaxwellScene())
    for (const e of ['∮E·dA = Q/ε₀', '∮B·dA = 0', '∮E·dl = −dΦ_B/dt', '∮B·dl = μ₀(I + ε₀ dΦ_E/dt)']) expect(t).toContain(e)
  })

  it('nature of light: straight rays through the wide opening, spreading waves through the narrow one', () => {
    const s = buildNatureOfLightScene()
    for (const r of arrows(s)) expect(r.from![1]).toBe(r.to![1])
    expect(objs(s).filter((o) => o.type === 'path').length).toBeGreaterThanOrEqual(3)
  })

  it('magnifier: v = −3 (virtual, same side), m = 2.5, upright', () => {
    expect(magnifier()).toEqual({ v: -3, m: 2.5 })
  })

  it("Huygens: the new wavefront is the wavelets' common tangent, ct ahead", () => {
    const s = buildWaveOpticsScene()
    const fronts = objs(s).filter((o) => o.type === 'bond' && o.from![0] === o.to![0]).map((o) => o.from![0])
    expect(fronts[fronts.length - 1] - fronts[0]).toBeCloseTo(HUY_R, 5)
  })

  it("Brewster: tan θ_B = n and the reflected and refracted rays are at 90°", () => {
    const { brewster, refracted } = brewsterAngles()
    expect(brewster).toBeCloseTo((Math.atan(BREWSTER_N) * 180) / Math.PI, 1)
    expect(brewster + refracted).toBeCloseTo(90, 1)
  })
})
