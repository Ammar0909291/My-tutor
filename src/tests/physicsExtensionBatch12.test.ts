/**
 * Physics coverage-driven KG extension, batch 12 (advanced tier, 2026-10-04):
 * the equivalence principle and curved spacetime. Same contract as batch 1
 * (physicsExtensionBatch1.test.ts).
 */
import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync } from 'fs'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { loadBlueprint, loadEBConceptContext } from '@/lib/curriculum/blueprintLoader'
import { AUTHORED_EXPLANATIONS, AUTHORED_PROBES } from '@/lib/teaching/assets/authoredSeedAssets'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import {
  buildGeneralRelativityScene, heightShift, gpsGravityGainUs, gpsSpeedLossUs, gpsNetUs, gpsDriftKm,
  schwarzschildRadius, GR,
} from '@/lib/teaching/sceneGenerators/physicsExtensionScenesB12'

const BATCH = ['phys.rel.general-relativity-intro'] as const
const SCENES: Record<(typeof BATCH)[number], [string, () => SceneSpec]> = {
  'phys.rel.general-relativity-intro': ['phys-general-relativity', buildGeneralRelativityScene],
}

type Obj = { text?: string; from?: number[]; to?: number[]; position?: number[]; points?: number[][] }
const texts = (s: SceneSpec) => s.steps.flatMap((st) => st.objects as Obj[]).map((o) => o.text ?? '').join(' | ')
const graph = JSON.parse(readFileSync('docs/physics/kg/graph.json', 'utf8'))
const byId = new Map<string, { requires: string[]; unlocks: string[] }>(graph.concepts.map((c: { id: string }) => [c.id, c]))

describe('every batch-12 concept arrives complete', () => {
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
    // the accelerating-lift frame is load-bearing for equivalence and in neither audit chain (KGCS P1)
    expect(byId.get('phys.rel.general-relativity-intro')!.requires)
      .toEqual(['phys.rel.spacetime', 'phys.mech.universal-gravitation', 'phys.mech.non-inertial-frames'])
    for (const id of BATCH) for (const r of byId.get(id)!.requires) expect(byId.get(r)!.unlocks).toContain(id)
  })
  it('sits in the relativity domain, right after spacetime', () => {
    const ids = graph.concepts.map((c: { id: string }) => c.id)
    expect(ids.indexOf('phys.rel.general-relativity-intro')).toBe(ids.indexOf('phys.rel.spacetime') + 1)
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
  it('GPS: +45.7 μs/day gravity, −7.2 μs/day speed, net +38.5 μs/day ≈ 11.5 km/day; Pound–Rebka 2.5e-15', () => {
    expect(gpsGravityGainUs()).toBeCloseTo(45.7, 1)
    expect(gpsSpeedLossUs()).toBeCloseTo(7.2, 1)
    expect(gpsNetUs()).toBeCloseTo(38.5, 1)
    expect(gpsDriftKm()).toBeCloseTo(11.5, 1)
    expect(heightShift(9.81, 22.5)).toBeCloseTo(2.456e-15, 17)
    const t = texts(buildGeneralRelativityScene())
    expect(t).toContain('+45.7 μs gravity')
    expect(t).toContain('−7.2 μs speed')
    expect(t).toContain('GPS net = +38.5 μs/day')
    expect(t).toContain('gh/c² = 2.5e-15 over 22.5 m')
  })
  it('Schwarzschild radii: Sun 2.95 km, Earth 8.9 mm', () => {
    expect(schwarzschildRadius(GR.M_SUN)).toBeCloseTo(2954, 0)
    expect(schwarzschildRadius(GR.M_EARTH) * 1000).toBeCloseTo(8.87, 2)
    const t = texts(buildGeneralRelativityScene())
    expect(t).toContain('r_s: Sun 2.95 km · Earth 8.9 mm')
  })
})
