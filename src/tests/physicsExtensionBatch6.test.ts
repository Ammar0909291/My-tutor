/**
 * Physics coverage-driven KG extension, batch 6 (2026-10-03): thin-film
 * interference, the diffraction grating, resolving power, and conductors in
 * electrostatics. Same contract as batch 1 (physicsExtensionBatch1.test.ts).
 */
import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync } from 'fs'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { loadBlueprint, loadEBConceptContext } from '@/lib/curriculum/blueprintLoader'
import { AUTHORED_EXPLANATIONS, AUTHORED_PROBES } from '@/lib/teaching/assets/authoredSeedAssets'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import {
  buildThinFilmScene, buildGratingScene, buildResolvingPowerScene, buildConductorScene,
  quarterWave, SOAP, COATING, slitSpacingUm, orderAngleDeg, maxOrder,
  besselJ1, airy, firstAiryZero, rayleighAngle, APERTURES, fieldJustOutside,
} from '@/lib/teaching/sceneGenerators/physicsExtensionScenesB6'

const BATCH = [
  'phys.opt.thin-film-interference', 'phys.opt.diffraction-grating', 'phys.opt.resolving-power', 'phys.em.conductors-electrostatics',
] as const
const SCENES: Record<(typeof BATCH)[number], [string, () => SceneSpec]> = {
  'phys.opt.thin-film-interference': ['phys-thin-film', buildThinFilmScene],
  'phys.opt.diffraction-grating': ['phys-diffraction-grating', buildGratingScene],
  'phys.opt.resolving-power': ['phys-resolving-power', buildResolvingPowerScene],
  'phys.em.conductors-electrostatics': ['phys-conductor-electrostatics', buildConductorScene],
}

type Obj = { text?: string; from?: number[]; to?: number[]; position?: number[]; points?: number[][] }
const texts = (s: SceneSpec) => s.steps.flatMap((st) => st.objects as Obj[]).map((o) => o.text ?? '').join(' | ')
const graph = JSON.parse(readFileSync('docs/physics/kg/graph.json', 'utf8'))
const byId = new Map<string, { requires: string[]; unlocks: string[] }>(graph.concepts.map((c: { id: string }) => [c.id, c]))

describe('every batch-6 concept arrives complete', () => {
  for (const id of BATCH) {
    it(`${id}: KG node, blueprint, package, EB entry, 2 explanations, 5 gradeable probes, its own figure`, () => {
      expect(byId.has(id)).toBe(true)
      expect(loadBlueprint(id).found).toBe(true)
      expect(loadEBConceptContext(id).found).toBe(true)
      expect(existsSync(`educational-brain/concepts/physics/${id}.md`)).toBe(true)
      expect(existsSync(`brain/packages/${id}.package.json`)).toBe(true)
      expect(AUTHORED_EXPLANATIONS.filter((e) => e.conceptId === id).map((e) => e.familyKind).sort())
        .toEqual(['core_explanation', 'misconception_repair'])
      const probes = AUTHORED_PROBES.filter((p) => p.conceptId === id)
      expect(probes).toHaveLength(5)
      for (const p of probes) expect(p.choices?.filter((c) => c.isCorrect)).toHaveLength(1)
      const d = resolveVisual({ message: 'show me a diagram', lessonConceptId: id, learnerRequest: 'diagram', subject: 'physics' } as Parameters<typeof resolveVisual>[0])
      expect(d.graphical).toBe(true)
      expect(d.asset?.scope).toBe('concept')
      expect((d.payload as { sceneSpec?: { id?: string } }).sceneSpec?.id).toBe(SCENES[id][0])
    })
  }

  it('every documented blueprint misconception is probed by a mapped distractor', () => {
    for (const id of BATCH) {
      const bp = readFileSync(`docs/curriculum/blueprints/${id}.md`, 'utf8')
      const mcs = [...bp.matchAll(/^### (MC-[A-Z0-9-]+):/gm)].map((m) => m[1])
      expect(mcs.length).toBeGreaterThanOrEqual(2)
      const mapped = new Set(AUTHORED_PROBES.filter((p) => p.conceptId === id)
        .flatMap((p) => (p.choices ?? []).map((c) => c.misconceptionId)).filter(Boolean))
      for (const mc of mcs) expect(mapped.has(`${id}:${mc}`), `${id}:${mc}`).toBe(true)
    }
  })
})

describe('the prerequisite edges', () => {
  it('are the minimal ones, mirrored as unlocks', () => {
    expect(byId.get('phys.opt.thin-film-interference')!.requires).toEqual(['phys.opt.youngs-experiment', 'phys.opt.refraction'])
    expect(byId.get('phys.opt.diffraction-grating')!.requires).toEqual(['phys.opt.diffraction'])
    expect(byId.get('phys.opt.resolving-power')!.requires).toEqual(['phys.opt.diffraction', 'phys.opt.optical-instruments'])
    // gauss-law is reached through electric-potential (transitive reduction, KGCS P2)
    expect(byId.get('phys.em.conductors-electrostatics')!.requires).toEqual(['phys.em.electric-potential'])
    for (const id of BATCH) for (const r of byId.get(id)!.requires) expect(byId.get(r)!.unlocks).toContain(id)
  })
})

describe('the figures', () => {
  it('are valid and within the frame', () => {
    for (const [, build] of Object.values(SCENES)) {
      const s = build()
      const v = validateSceneSpec(s) as { valid?: boolean; ok?: boolean; errors?: unknown }
      expect(v.valid ?? v.ok, `${s.id}: ${JSON.stringify(v.errors ?? v)}`).toBe(true)
      for (const o of s.steps.flatMap((st) => st.objects as Obj[])) {
        for (const p of [o.from, o.to, o.position, ...(o.points ?? [])].filter(Boolean) as number[][]) {
          expect(Math.abs(p[0])).toBeLessThanOrEqual(5)
          expect(Math.abs(p[1])).toBeLessThanOrEqual(5)
        }
      }
    }
  })
  it('thin film: soap t = 600/(4 × 1.33) ≈ 113 nm; MgF₂ coating t = 550/(4 × 1.38) ≈ 100 nm', () => {
    expect(quarterWave(SOAP.n, SOAP.lambdaNm)).toBeCloseTo(112.78, 2)
    expect(quarterWave(COATING.n, COATING.lambdaNm)).toBeCloseTo(99.64, 2)
    const t = texts(buildThinFilmScene())
    expect(t).toContain('soap: t ≈ 113 nm (bright)')
    expect(t).toContain('MgF₂ coating: t ≈ 100 nm')
    expect(t).toContain('flip (λ/2)')
  })
  it('grating: 500 lines/mm, 600 nm → d = 2.0 μm, θ₁ = 17.5°, highest order 3; 1000 lines/mm → θ₁ = 36.9°, highest order 1', () => {
    expect(slitSpacingUm(500)).toBeCloseTo(2, 10)
    expect(orderAngleDeg(1)).toBeCloseTo(17.46, 2)
    expect(maxOrder()).toBe(3)
    expect(Number.isNaN(orderAngleDeg(4))).toBe(true)
    expect(orderAngleDeg(1, 1000)).toBeCloseTo(36.87, 2)
    expect(maxOrder(1000)).toBe(1)
    // red is diffracted more than violet (the reverse of a prism)
    expect(orderAngleDeg(1, 500, 700)).toBeGreaterThan(orderAngleDeg(1, 500, 400))
    // second-order red lands beyond third-order violet: the orders overlap
    expect(orderAngleDeg(2, 300, 700)).toBeGreaterThan(orderAngleDeg(3, 300, 400))
    const t = texts(buildGratingScene())
    expect(t).toContain('m = 3, 64.2°')
    expect(t).toContain('1000 lines/mm: m = 1 at 36.9°')
  })
  it('resolving power: the Airy disc falls to zero at u ≈ 3.832; eye 2.2e-4 rad, 10 cm telescope 6.7e-6 rad', () => {
    expect(besselJ1(1)).toBeCloseTo(0.4400505857, 8)
    expect(firstAiryZero()).toBeCloseTo(3.8317, 4)
    expect(airy(0)).toBe(1)
    expect(airy(firstAiryZero())).toBeLessThan(1e-12)
    expect(rayleighAngle(APERTURES.eye)).toBeCloseTo(2.237e-4, 6)
    expect(rayleighAngle(APERTURES.telescope)).toBeCloseTo(6.71e-6, 8)
    // headlights 1.5 m apart merge for the eye beyond about 7 km
    expect(1.5 / rayleighAngle(APERTURES.eye)).toBeCloseTo(6706, 0)
    expect(texts(buildResolvingPowerScene())).toContain('eye 2.2e-4 rad · telescope 6.7e-6 rad')
  })
  it('conductor: E = σ/ε₀ = 2.0e-6 / 8.854e-12 ≈ 2.3 × 10⁵ V/m; the label inside reads E = 0', () => {
    expect(fieldJustOutside()).toBeCloseTo(2.2589e5, -1)
    const t = texts(buildConductorScene())
    expect(t).toContain('E = 0')
    expect(t).toContain('E = σ/ε₀ ≈ 2.3e+5 V/m')
  })
})
