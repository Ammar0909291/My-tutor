/**
 * Physics coverage-driven KG extension, batch 7 (2026-10-03): the series
 * LCR circuit, AC power, the nuclear atom and alpha scattering, and nuclear size
 * and force. Same contract as batch 1 (physicsExtensionBatch1.test.ts).
 */
import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync } from 'fs'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { loadBlueprint, loadEBConceptContext } from '@/lib/curriculum/blueprintLoader'
import { AUTHORED_EXPLANATIONS, AUTHORED_PROBES } from '@/lib/teaching/assets/authoredSeedAssets'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import {
  buildLcrScene, buildAcPowerScene, buildAlphaScatteringScene, buildNucleusScene,
  reactances, impedance, lcrCurrent, resonantOmega, qFactor, averagePower, apparentPower, lineCurrent,
  closestApproach, deflectionDeg, alphaPath, nuclearRadiusFm, nuclearDensity,
} from '@/lib/teaching/sceneGenerators/physicsExtensionScenesB7'

const BATCH = [
  'phys.em.lcr-circuits', 'phys.em.ac-power', 'phys.mod.atomic-models', 'phys.mod.nucleus-size-and-force',
] as const
const SCENES: Record<(typeof BATCH)[number], [string, () => SceneSpec]> = {
  'phys.em.lcr-circuits': ['phys-lcr-resonance', buildLcrScene],
  'phys.em.ac-power': ['phys-ac-power', buildAcPowerScene],
  'phys.mod.atomic-models': ['phys-alpha-scattering', buildAlphaScatteringScene],
  'phys.mod.nucleus-size-and-force': ['phys-nucleus-size', buildNucleusScene],
}

type Obj = { text?: string; from?: number[]; to?: number[]; position?: number[]; points?: number[][] }
const texts = (s: SceneSpec) => s.steps.flatMap((st) => st.objects as Obj[]).map((o) => o.text ?? '').join(' | ')
const graph = JSON.parse(readFileSync('docs/physics/kg/graph.json', 'utf8'))
const byId = new Map<string, { requires: string[]; unlocks: string[] }>(graph.concepts.map((c: { id: string }) => [c.id, c]))

describe('every batch-7 concept arrives complete', () => {
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
    // ac-basics, self-inductance and capacitance are reached through lc-circuits (KGCS P2)
    expect(byId.get('phys.em.lcr-circuits')!.requires).toEqual(['phys.em.lc-circuits'])
    expect(byId.get('phys.em.ac-power')!.requires).toEqual(['phys.em.lcr-circuits'])
    expect(byId.get('phys.mod.atomic-models')!.requires).toEqual(['phys.em.coulombs-law'])
    expect(byId.get('phys.mod.nucleus-size-and-force')!.requires).toEqual(['phys.mod.atomic-models'])
    for (const id of BATCH) for (const r of byId.get(id)!.requires) expect(byId.get(r)!.unlocks).toContain(id)
  })
  it('bohr-model now builds on the nuclear atom, with its coulombs-law edge reduced away', () => {
    expect(byId.get('phys.mod.bohr-model')!.requires).toEqual(['phys.mod.photons', 'phys.mod.atomic-models'])
    expect(byId.get('phys.mod.atomic-models')!.unlocks).toContain('phys.mod.bohr-model')
    expect(byId.get('phys.em.coulombs-law')!.unlocks).not.toContain('phys.mod.bohr-model')
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
  it('LCR: at 400 rad/s X_L = 80, X_C = 50, Z = 50 Ω, I = 4 A; resonance at ≈ 316 rad/s with Z = R and I = 5 A', () => {
    const { XL, XC } = reactances(400)
    expect(XL).toBeCloseTo(80, 10)
    expect(XC).toBeCloseTo(50, 10)
    expect(impedance(400)).toBeCloseTo(50, 10)
    expect(lcrCurrent(400)).toBeCloseTo(4, 10)
    expect(resonantOmega()).toBeCloseTo(316.23, 2)
    expect(impedance(resonantOmega())).toBeCloseTo(40, 8)
    // the current really peaks at resonance (not a dip)
    expect(lcrCurrent(resonantOmega())).toBeGreaterThan(lcrCurrent(250))
    expect(lcrCurrent(resonantOmega())).toBeGreaterThan(lcrCurrent(400))
    expect(qFactor()).toBeCloseTo(1.58, 2)
    expect(qFactor(10)).toBeCloseTo(6.32, 2)
    const t = texts(buildLcrScene())
    expect(t).toContain('ω = 400: Z = 50 Ω, I = 4 A')
    expect(t).toContain('Z = R, I = 5 A')
  })
  it('AC power: 200 V × 4 A × 0.8 = 640 W of 800 VA; 640 W needs 4 A at pf 0.8, 3.2 A at pf 1', () => {
    expect(averagePower()).toBeCloseTo(640, 8)
    expect(apparentPower()).toBe(800)
    expect(lineCurrent(640, 200, 0.8)).toBeCloseTo(4, 10)
    expect(lineCurrent(640, 200, 1)).toBeCloseTo(3.2, 10)
    expect(texts(buildAcPowerScene())).toContain('average 640 W   (apparent 800 VA)')
  })
  it('alpha scattering: 7.7 MeV on gold stops at ≈ 3.0e-14 m; near-head-on alphas turn back, distant ones barely deviate', () => {
    expect(closestApproach(7.7, 79)).toBeCloseTo(2.95e-14, 16)
    expect(deflectionDeg(0.05, 0.6)).toBeGreaterThan(150)
    expect(deflectionDeg(3.2, 0.6)).toBeLessThan(12)
    // the drawn path for the near-head-on alpha really heads back to the left
    const p = alphaPath(0.05, 0.6)
    expect(p[p.length - 1][0]).toBeLessThan(p[p.length - 2][0])
    // the integrated path agrees with Rutherford's θ = 2 tan⁻¹(d/2b) where it fully develops
    const q = alphaPath(0.3, 0.6), a = q[q.length - 1], c = q[q.length - 2]
    expect((Math.atan2(a[1] - c[1], a[0] - c[0]) * 180) / Math.PI).toBeCloseTo(deflectionDeg(0.3, 0.6), 0)
    expect(texts(buildAlphaScatteringScene())).toContain('closest approach ≈ 3.0e-14 m (7.7 MeV, gold)')
  })
  it('nucleus: R(Fe-56) ≈ 4.6 fm, R(U-238) ≈ 7.4 fm, and the density is the same ≈ 2.3e17 kg/m³ for every A', () => {
    expect(nuclearRadiusFm(56)).toBeCloseTo(4.59, 2)
    expect(nuclearRadiusFm(238)).toBeCloseTo(7.44, 2)
    expect(nuclearDensity(1)).toBeCloseTo(2.294e17, -14)
    expect(nuclearDensity(238) / nuclearDensity(1)).toBeCloseTo(1, 10)
    const t = texts(buildNucleusScene())
    expect(t).toContain('U-238: 7.4 fm')
    expect(t).toContain('density ≈ 2.3e+17 kg/m³ for every A')
  })
})
