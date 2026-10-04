/**
 * Physics coverage-driven KG extension, batch 1 (2026-10-03).
 *
 * Owner exception (CLAUDE.md, "Standing owner exception (2026-10-03)"): each
 * subject's KG is extended until the subject is covered, and every new node
 * ships WITH its blueprint, Educational Brain entry, probe set and figure — a
 * node without content is a lesson the tutor would have to improvise. This
 * pins that the four batch-1 concepts arrived complete, that their prerequisite
 * edges are the ones the gap audit justified, and the physics their figures draw.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync } from 'fs'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { loadBlueprint, loadEBConceptContext } from '@/lib/curriculum/blueprintLoader'
import { AUTHORED_EXPLANATIONS, AUTHORED_PROBES } from '@/lib/teaching/assets/authoredSeedAssets'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import {
  buildDensityScene, buildVernierScene, buildMassWeightScene, buildRectilinearScene,
  CUBES, density, VERNIER, leastCount, vernierReading, BAG, weight, SHADOW, shadowHalfHeight,
} from '@/lib/teaching/sceneGenerators/physicsExtensionScenesB1'

const BATCH = [
  'phys.meas.density', 'phys.meas.measuring-instruments', 'phys.mech.mass-and-weight', 'phys.opt.rectilinear-propagation',
] as const
const SCENES: Record<(typeof BATCH)[number], [string, () => SceneSpec]> = {
  'phys.meas.density': ['phys-density', buildDensityScene],
  'phys.meas.measuring-instruments': ['phys-vernier', buildVernierScene],
  'phys.mech.mass-and-weight': ['phys-mass-weight', buildMassWeightScene],
  'phys.opt.rectilinear-propagation': ['phys-rectilinear', buildRectilinearScene],
}

type Obj = { text?: string; from?: number[]; to?: number[]; position?: number[]; points?: number[][] }
const texts = (s: SceneSpec) => s.steps.flatMap((st) => st.objects as Obj[]).map((o) => o.text ?? '').join(' | ')
const graph = JSON.parse(readFileSync('docs/physics/kg/graph.json', 'utf8'))
const byId = new Map<string, { requires: string[]; unlocks: string[] }>(graph.concepts.map((c: { id: string }) => [c.id, c]))

describe('every batch-1 concept arrives complete', () => {
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
  it('match the gap audit, and are mirrored as unlocks', () => {
    expect(byId.get('phys.meas.density')!.requires).toEqual(['phys.meas.units'])
    expect(byId.get('phys.meas.measuring-instruments')!.requires).toEqual(['phys.meas.errors'])
    expect(byId.get('phys.mech.mass-and-weight')!.requires).toEqual(['phys.mech.force'])
    expect(byId.get('phys.opt.rectilinear-propagation')!.requires).toEqual([])
    for (const id of BATCH) for (const r of byId.get(id)!.requires) expect(byId.get(r)!.unlocks).toContain(id)
  })
  it('pressure in fluids now requires density: P = ρgh cannot be taught without it', () => {
    expect(byId.get('phys.mech.pressure-fluids')!.requires).toContain('phys.meas.density')
    expect(byId.get('phys.meas.density')!.unlocks).toContain('phys.mech.pressure-fluids')
  })
  it('each new node sits after its prerequisites in lesson order, not at the end of its domain', () => {
    const order = graph.concepts.map((c: { id: string }) => c.id)
    for (const id of BATCH) for (const r of byId.get(id)!.requires) expect(order.indexOf(r)).toBeLessThan(order.indexOf(id))
    expect(order.indexOf('phys.mech.mass-and-weight')).toBe(order.indexOf('phys.mech.force') + 1)
    expect(order.indexOf('phys.opt.rectilinear-propagation')).toBe(order.indexOf('phys.opt.nature-of-light') - 1)
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
  it('density: 6/10 = 0.6 and 27/10 = 2.7 g/cm³; wood floats in water, aluminium sinks', () => {
    expect(density(CUBES.wood, CUBES.V)).toBeCloseTo(0.6, 10)
    expect(density(CUBES.alu, CUBES.V)).toBeCloseTo(2.7, 10)
    expect(density(CUBES.wood, CUBES.V)).toBeLessThan(CUBES.water)
    expect(density(CUBES.alu, CUBES.V)).toBeGreaterThan(CUBES.water)
    expect(texts(buildDensityScene())).toContain('aluminium 2.7 g/cm³')
  })
  it('vernier: LC = 1 − 9/10 = 0.1 mm; 23 + 6 × 0.1 = 23.6 mm, and mark 6 lands on a main-scale mark', () => {
    expect(leastCount()).toBeCloseTo(0.1, 10)
    expect(vernierReading()).toBeCloseTo(23.6, 10)
    const mark6 = vernierReading() + VERNIER.coincide * (VERNIER.span / VERNIER.n)
    expect(mark6).toBeCloseTo(Math.round(mark6), 10)
    expect(texts(buildVernierScene())).toContain('23 mm + 6 × 0.1 mm = 23.6 mm')
  })
  it('mass and weight: 5 × 9.8 = 49 N and 5 × 1.6 = 8 N; the mass label is 5 kg on both worlds', () => {
    expect(weight(BAG.m, BAG.gEarth)).toBeCloseTo(49, 10)
    expect(weight(BAG.m, BAG.gMoon)).toBeCloseTo(8, 10)
    const t = texts(buildMassWeightScene())
    expect(t).toContain('W = 49 N')
    expect(t).toContain('W = 8 N')
    expect(t.split('m = 5 kg').length - 1).toBe(2)
  })
  it('shadow: half-height = r × (wall − source) / (ball − source), and the shadow is bigger than the ball', () => {
    const { srcX, ballX, wallX, ballR } = SHADOW
    expect(shadowHalfHeight()).toBeCloseTo(ballR * (wallX - srcX) / (ballX - srcX), 10)
    expect(shadowHalfHeight()).toBeGreaterThan(ballR)
    expect(texts(buildRectilinearScene())).toContain('shadow / ball = 3.15')
  })
})
