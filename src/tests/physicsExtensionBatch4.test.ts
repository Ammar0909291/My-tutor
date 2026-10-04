/**
 * Physics coverage-driven KG extension, batch 4 (2026-10-03): the human eye,
 * scattering of light, the potential energy of a system of charges, and cells in
 * series and parallel. Same contract as batch 1 (physicsExtensionBatch1.test.ts).
 */
import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync } from 'fs'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { loadBlueprint, loadEBConceptContext } from '@/lib/curriculum/blueprintLoader'
import { AUTHORED_EXPLANATIONS, AUTHORED_PROBES } from '@/lib/teaching/assets/authoredSeedAssets'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import {
  buildHumanEyeScene, buildScatteringScene, buildSystemEnergyScene, buildCellsScene,
  myopiaPower, hypermetropiaPower, relativeScattering, pairCount, systemEnergy, seriesCurrent, parallelCurrent, CELLS,
} from '@/lib/teaching/sceneGenerators/physicsExtensionScenesB4'

const BATCH = [
  'phys.opt.human-eye', 'phys.opt.scattering-of-light', 'phys.em.electrostatic-potential-energy', 'phys.em.cells-combination',
] as const
const SCENES: Record<(typeof BATCH)[number], [string, () => SceneSpec]> = {
  'phys.opt.human-eye': ['phys-human-eye', buildHumanEyeScene],
  'phys.opt.scattering-of-light': ['phys-scattering', buildScatteringScene],
  'phys.em.electrostatic-potential-energy': ['phys-system-energy', buildSystemEnergyScene],
  'phys.em.cells-combination': ['phys-cells-combination', buildCellsScene],
}

type Obj = { text?: string; from?: number[]; to?: number[]; position?: number[]; points?: number[][] }
const texts = (s: SceneSpec) => s.steps.flatMap((st) => st.objects as Obj[]).map((o) => o.text ?? '').join(' | ')
const graph = JSON.parse(readFileSync('docs/physics/kg/graph.json', 'utf8'))
const byId = new Map<string, { requires: string[]; unlocks: string[] }>(graph.concepts.map((c: { id: string }) => [c.id, c]))

describe('every batch-4 concept arrives complete', () => {
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
    expect(byId.get('phys.opt.human-eye')!.requires).toEqual(['phys.opt.lens-power'])
    expect(byId.get('phys.opt.scattering-of-light')!.requires).toEqual(['phys.opt.nature-of-light'])
    expect(byId.get('phys.em.electrostatic-potential-energy')!.requires).toEqual(['phys.em.electric-potential'])
    expect(byId.get('phys.em.cells-combination')!.requires).toEqual(['phys.em.emf'])
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
  it('eye: far point 2 m → −0.5 D; near point 100 cm → +3 D; near point 75 cm → ≈ +2.67 D', () => {
    expect(myopiaPower(2)).toBeCloseTo(-0.5, 10)
    expect(hypermetropiaPower(100)).toBeCloseTo(3, 10)
    expect(hypermetropiaPower(75)).toBeCloseTo(8 / 3, 10)
    expect(texts(buildHumanEyeScene())).toContain('P = −0.5 D')
  })
  it('scattering: blue (450 nm) ≈ 5.9× red; 400 vs 800 nm is exactly 16', () => {
    expect(relativeScattering(450)).toBeCloseTo(5.86, 2)
    expect(relativeScattering(400, 800)).toBeCloseTo(16, 10)
    expect(texts(buildScatteringScene())).toContain('blue ≈ 5.9 × red')
  })
  it('system energy: 3 pairs for 3 charges, 6 for 4; the triangle sums to 3kq²/a; +q,+q,−q/4 sums to zero', () => {
    expect(pairCount(3)).toBe(3)
    expect(pairCount(4)).toBe(6)
    const k = 9e9, q = 1e-6, a = 0.1
    const tri = [{ q, x: 0, y: 0 }, { q, x: a, y: 0 }, { q, x: a / 2, y: (a * Math.sqrt(3)) / 2 }]
    expect(systemEnergy(tri)).toBeCloseTo((3 * k * q * q) / a, 10)
    expect(systemEnergy([{ q, x: 0, y: 0 }, { q, x: a, y: 0 }, { q: -q / 4, x: a / 2, y: 0 }])).toBeCloseTo(0, 12)
    expect(systemEnergy([{ q: 2e-6, x: 0, y: 0 }, { q: 3e-6, x: 0.3, y: 0 }])).toBeCloseTo(0.18, 10)
  })
  it('cells: series 0.50 A vs parallel ≈ 0.148 A at 10 Ω; parallel wins at 0.1 Ω; the curves cross at R = r', () => {
    expect(seriesCurrent(10)).toBeCloseTo(0.5, 10)
    expect(parallelCurrent(10)).toBeCloseTo(1.5 / 10.125, 10)
    expect(parallelCurrent(0.1)).toBeGreaterThan(seriesCurrent(0.1))
    expect(seriesCurrent(CELLS.r)).toBeCloseTo(parallelCurrent(CELLS.r), 10)
  })
})
