/**
 * Physics coverage-driven KG extension, batch 3 (2026-10-03): Newton's law of
 * cooling, blackbody radiation, energy resources, echo and SONAR. Same contract
 * as batch 1 (physicsExtensionBatch1.test.ts).
 */
import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync } from 'fs'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { loadBlueprint, loadEBConceptContext } from '@/lib/curriculum/blueprintLoader'
import { AUTHORED_EXPLANATIONS, AUTHORED_PROBES } from '@/lib/teaching/assets/authoredSeedAssets'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import {
  buildCoolingScene, buildBlackbodyScene, buildEnergyResourcesScene, buildEchoScene,
  teaTemp, TEA, planck, wienPeak, efficiency, STATION, echoDepth,
} from '@/lib/teaching/sceneGenerators/physicsExtensionScenesB3'

const BATCH = [
  'phys.therm.newtons-law-of-cooling', 'phys.therm.blackbody-radiation', 'phys.therm.energy-resources', 'phys.wave.echo-and-sonar',
] as const
const SCENES: Record<(typeof BATCH)[number], [string, () => SceneSpec]> = {
  'phys.therm.newtons-law-of-cooling': ['phys-newtons-cooling', buildCoolingScene],
  'phys.therm.blackbody-radiation': ['phys-blackbody', buildBlackbodyScene],
  'phys.therm.energy-resources': ['phys-energy-resources', buildEnergyResourcesScene],
  'phys.wave.echo-and-sonar': ['phys-echo-sonar', buildEchoScene],
}

type Obj = { text?: string; from?: number[]; to?: number[]; position?: number[]; points?: number[][] }
const texts = (s: SceneSpec) => s.steps.flatMap((st) => st.objects as Obj[]).map((o) => o.text ?? '').join(' | ')
const graph = JSON.parse(readFileSync('docs/physics/kg/graph.json', 'utf8'))
const byId = new Map<string, { requires: string[]; unlocks: string[] }>(graph.concepts.map((c: { id: string }) => [c.id, c]))

describe('every batch-3 concept arrives complete', () => {
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
    expect(byId.get('phys.therm.newtons-law-of-cooling')!.requires).toEqual(['phys.therm.heat-transfer'])
    expect(byId.get('phys.therm.blackbody-radiation')!.requires).toEqual(['phys.therm.heat-transfer'])
    expect(byId.get('phys.therm.energy-resources')!.requires).toEqual(['phys.mech.power'])
    expect(byId.get('phys.wave.echo-and-sonar')!.requires).toEqual(['phys.wave.sound-waves'])
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
  it('cooling: 80 → 60 °C in 10 min, excess × 2/3 per 10 min, never below the room', () => {
    expect(teaTemp(0)).toBeCloseTo(80, 10)
    expect(teaTemp(10)).toBeCloseTo(60, 10)
    expect(teaTemp(20) - TEA.Ts).toBeCloseTo((teaTemp(10) - TEA.Ts) * (2 / 3), 10)
    expect(teaTemp(300)).toBeGreaterThan(TEA.Ts)
    expect(teaTemp(10) - teaTemp(20)).toBeLessThan(teaTemp(0) - teaTemp(10))
  })
  it("blackbody: Planck's curve peaks where Wien says, and 2× T gives ≈16× the area", () => {
    for (const T of [3000, 6000]) {
      const p = wienPeak(T)
      expect(planck(p, T)).toBeGreaterThan(planck(p * 0.9, T))
      expect(planck(p, T)).toBeGreaterThan(planck(p * 1.1, T))
    }
    const area = (T: number) => { let s = 0; for (let i = 1; i < 4000; i++) s += planck(i * 1e-8, T); return s }
    expect(area(6000) / area(3000)).toBeCloseTo(16, 0)
  })
  it('energy: 350/1000 = 35 %; 350 + 650 = 1000 MJ', () => {
    expect(efficiency()).toBeCloseTo(0.35, 10)
    expect(texts(buildEnergyResourcesScene())).toContain(`350 + ${STATION.input - STATION.useful} = 1000 MJ`)
  })
  it('SONAR: 1500 × 0.8 / 2 = 600 m', () => {
    expect(echoDepth()).toBe(600)
    expect(texts(buildEchoScene())).toContain('= 600 m')
  })
})
