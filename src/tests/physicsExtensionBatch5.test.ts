/**
 * Physics coverage-driven KG extension, batch 5 (2026-10-03): the moving-coil
 * galvanometer, motors and generators, household electricity, and connected
 * bodies. Same contract as batch 1 (physicsExtensionBatch1.test.ts).
 */
import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync } from 'fs'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { loadBlueprint, loadEBConceptContext } from '@/lib/curriculum/blueprintLoader'
import { AUTHORED_EXPLANATIONS, AUTHORED_PROBES } from '@/lib/teaching/assets/authoredSeedAssets'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import {
  buildGalvanometerScene, buildGeneratorScene, buildHouseholdScene, buildAtwoodScene,
  shunt, multiplier, peakEmf, GEN, applianceCurrent, totalCurrent, HOUSE, atwoodAcceleration, atwoodTension, ATWOOD,
} from '@/lib/teaching/sceneGenerators/physicsExtensionScenesB5'

const BATCH = [
  'phys.em.moving-coil-galvanometer', 'phys.em.motors-and-generators', 'phys.em.domestic-electricity', 'phys.mech.constraint-motion',
] as const
const SCENES: Record<(typeof BATCH)[number], [string, () => SceneSpec]> = {
  'phys.em.moving-coil-galvanometer': ['phys-galvanometer', buildGalvanometerScene],
  'phys.em.motors-and-generators': ['phys-motor-generator', buildGeneratorScene],
  'phys.em.domestic-electricity': ['phys-household-circuit', buildHouseholdScene],
  'phys.mech.constraint-motion': ['phys-atwood', buildAtwoodScene],
}

type Obj = { text?: string; from?: number[]; to?: number[]; position?: number[]; points?: number[][] }
const texts = (s: SceneSpec) => s.steps.flatMap((st) => st.objects as Obj[]).map((o) => o.text ?? '').join(' | ')
const graph = JSON.parse(readFileSync('docs/physics/kg/graph.json', 'utf8'))
const byId = new Map<string, { requires: string[]; unlocks: string[] }>(graph.concepts.map((c: { id: string }) => [c.id, c]))

describe('every batch-5 concept arrives complete', () => {
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
    expect(byId.get('phys.em.moving-coil-galvanometer')!.requires).toEqual(['phys.em.magnetic-force', 'phys.mech.torque'])
    expect(byId.get('phys.em.motors-and-generators')!.requires).toEqual(['phys.em.magnetic-force', 'phys.em.faradays-law'])
    expect(byId.get('phys.em.domestic-electricity')!.requires).toEqual(['phys.em.electrical-power'])
    expect(byId.get('phys.mech.constraint-motion')!.requires).toEqual(['phys.mech.tension'])
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
  it('galvanometer: S = 0.002 × 50 / 0.998 ≈ 0.100 Ω; R = 10/0.002 − 50 = 4950 Ω', () => {
    expect(shunt()).toBeCloseTo(0.1002, 4)
    expect(multiplier()).toBeCloseTo(4950, 10)
    expect(texts(buildGalvanometerScene())).toContain('R = 4950 Ω')
  })
  it('generator: NABω = 100 × 0.01 × 0.5 × 100 = 50 V, and doubling ω doubles it', () => {
    expect(peakEmf()).toBeCloseTo(50, 10)
    expect(peakEmf({ ...GEN, omega: 2 * GEN.omega })).toBeCloseTo(100, 10)
    expect(texts(buildGeneratorScene())).toContain('+50 V')
  })
  it('household: 2 kW on 220 V ≈ 9.1 A; iron + heater + kettle ≈ 20.5 A > 15 A', () => {
    expect(applianceCurrent(2000)).toBeCloseTo(9.09, 2)
    expect(totalCurrent()).toBeCloseTo(4500 / 220, 10)
    expect(totalCurrent()).toBeGreaterThan(HOUSE.limit)
    expect(texts(buildHouseholdScene())).toContain('total 20.5 A > 15 A')
  })
  it('Atwood: a = 1.96 m/s², T = 23.52 N, between the two weights', () => {
    expect(atwoodAcceleration()).toBeCloseTo(1.96, 10)
    expect(atwoodTension()).toBeCloseTo(23.52, 10)
    expect(atwoodTension()).toBeGreaterThan(ATWOOD.m2 * ATWOOD.g)
    expect(atwoodTension()).toBeLessThan(ATWOOD.m1 * ATWOOD.g)
    expect(texts(buildAtwoodScene())).toContain('T = 23.52 N')
  })
})
