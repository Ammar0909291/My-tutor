/**
 * Physics coverage-driven KG extension, batch 2 (2026-10-03): experimental
 * graphs, simple machines, variation of g, terminal velocity. Same contract as
 * batch 1 (physicsExtensionBatch1.test.ts): every node arrives with its
 * blueprint, compiled package, Educational Brain entry, probe set and figure.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync } from 'fs'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { loadBlueprint, loadEBConceptContext } from '@/lib/curriculum/blueprintLoader'
import { AUTHORED_EXPLANATIONS, AUTHORED_PROBES } from '@/lib/teaching/assets/authoredSeedAssets'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import {
  buildExperimentalGraphScene, buildSimpleMachineScene, buildVariationOfGScene, buildTerminalVelocityScene,
  pendulumGradient, gFromGradient, LEVER, leverEffort, effortDistance, gAt, EARTH, terminalVelocity, STOKES,
} from '@/lib/teaching/sceneGenerators/physicsExtensionScenesB2'

const BATCH = [
  'phys.meas.linearisation-and-uncertainty', 'phys.mech.simple-machines', 'phys.mech.variation-of-g', 'phys.mech.terminal-velocity',
] as const
const SCENES: Record<(typeof BATCH)[number], [string, () => SceneSpec]> = {
  'phys.meas.linearisation-and-uncertainty': ['phys-linearisation', buildExperimentalGraphScene],
  'phys.mech.simple-machines': ['phys-simple-machines', buildSimpleMachineScene],
  'phys.mech.variation-of-g': ['phys-variation-of-g', buildVariationOfGScene],
  'phys.mech.terminal-velocity': ['phys-terminal-velocity', buildTerminalVelocityScene],
}

type Obj = { text?: string; from?: number[]; to?: number[]; position?: number[]; points?: number[][] }
const texts = (s: SceneSpec) => s.steps.flatMap((st) => st.objects as Obj[]).map((o) => o.text ?? '').join(' | ')
const graph = JSON.parse(readFileSync('docs/physics/kg/graph.json', 'utf8'))
const byId = new Map<string, { requires: string[]; unlocks: string[] }>(graph.concepts.map((c: { id: string }) => [c.id, c]))

describe('every batch-2 concept arrives complete', () => {
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
  it('are the transitively reduced ones, mirrored as unlocks', () => {
    expect(byId.get('phys.meas.linearisation-and-uncertainty')!.requires).toEqual(['phys.meas.significant-figures'])
    expect(byId.get('phys.mech.simple-machines')!.requires).toEqual(['phys.mech.work'])
    expect(byId.get('phys.mech.variation-of-g')!.requires).toEqual(['phys.mech.gravitational-field'])
    expect(byId.get('phys.mech.terminal-velocity')!.requires).toEqual(['phys.mech.viscosity'])
    for (const id of BATCH) for (const r of byId.get(id)!.requires) expect(byId.get(r)!.unlocks).toContain(id)
  })
  it('each new node sits after its prerequisites in lesson order', () => {
    const order = graph.concepts.map((c: { id: string }) => c.id)
    for (const id of BATCH) for (const r of byId.get(id)!.requires) expect(order.indexOf(r)).toBeLessThan(order.indexOf(id))
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
  it('pendulum: the T²–L gradient is about 4.02 s²/m and gives g ≈ 9.8 m/s²', () => {
    expect(pendulumGradient()).toBeCloseTo(4.02, 2)
    expect(gFromGradient(pendulumGradient())).toBeCloseTo(9.81, 1)
    expect(texts(buildExperimentalGraphScene())).toContain('g = 4π² / 4.02 = 9.8 m/s²')
  })
  it('lever: 600 × 0.2 / 1.2 = 100 N; the effort moves 0.6 m; 60 J in = 60 J out', () => {
    expect(leverEffort()).toBeCloseTo(100, 10)
    expect(effortDistance()).toBeCloseTo(0.6, 10)
    expect(leverEffort() * effortDistance()).toBeCloseTo(LEVER.load * LEVER.lift, 10)
    expect(texts(buildSimpleMachineScene())).toContain('60 J in = 60 J out')
  })
  it('g: linear inside, inverse-square outside, continuous at the surface; ≈ 8.7 m/s² at the station', () => {
    expect(gAt(0)).toBe(0)
    expect(gAt(0.5)).toBeCloseTo(EARTH.g / 2, 10)
    expect(gAt(1)).toBeCloseTo(EARTH.g, 10)
    expect(gAt(2)).toBeCloseTo(EARTH.g / 4, 10)
    expect(gAt(1 + EARTH.station / EARTH.R)).toBeCloseTo(8.68, 2)
    expect(texts(buildVariationOfGScene())).toContain('station: g ≈ 8.7 m/s²')
  })
  it('Stokes: v_t = 2r²(ρ − σ)g/(9η) ≈ 9.5 mm/s, and doubling r quadruples it', () => {
    expect(terminalVelocity() * 1000).toBeCloseTo(9.5, 1)
    expect(terminalVelocity({ ...STOKES, r: 2 * STOKES.r }) / terminalVelocity()).toBeCloseTo(4, 10)
    expect(texts(buildTerminalVelocityScene())).toContain('≈ 9.5 mm/s')
  })
})
