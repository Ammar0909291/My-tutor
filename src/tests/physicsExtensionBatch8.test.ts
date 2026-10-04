/**
 * Physics coverage-driven KG extension, batch 8 (2026-10-04): non-inertial
 * frames, the equation of continuity, and the specific heats of gases — the
 * last three concepts of the core tier. Same contract as batch 1 (physicsExtensionBatch1.test.ts).
 */
import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync } from 'fs'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { loadBlueprint, loadEBConceptContext } from '@/lib/curriculum/blueprintLoader'
import { AUTHORED_EXPLANATIONS, AUTHORED_PROBES } from '@/lib/teaching/assets/authoredSeedAssets'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import {
  buildFramesScene, buildContinuityScene, buildSpecificHeatsScene,
  apparentWeight, tiltDeg, centrifugal, continuitySpeed, flowRate, reynolds,
  cvOf, cpOf, gammaOf, heatAtConstantV, heatAtConstantP, GAS,
} from '@/lib/teaching/sceneGenerators/physicsExtensionScenesB8'

const BATCH = [
  'phys.mech.non-inertial-frames', 'phys.mech.fluid-flow', 'phys.therm.specific-heats-of-gases',
] as const
const SCENES: Record<(typeof BATCH)[number], [string, () => SceneSpec]> = {
  'phys.mech.non-inertial-frames': ['phys-non-inertial-frames', buildFramesScene],
  'phys.mech.fluid-flow': ['phys-continuity', buildContinuityScene],
  'phys.therm.specific-heats-of-gases': ['phys-specific-heats-gases', buildSpecificHeatsScene],
}

type Obj = { text?: string; from?: number[]; to?: number[]; position?: number[]; points?: number[][] }
const texts = (s: SceneSpec) => s.steps.flatMap((st) => st.objects as Obj[]).map((o) => o.text ?? '').join(' | ')
const graph = JSON.parse(readFileSync('docs/physics/kg/graph.json', 'utf8'))
const byId = new Map<string, { requires: string[]; unlocks: string[] }>(graph.concepts.map((c: { id: string }) => [c.id, c]))

describe('every batch-8 concept arrives complete', () => {
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
      // fluid-flow gained a sixth (Reynolds number, audit §C enrichment, 2026-10-04)
      expect(probes).toHaveLength(id === 'phys.mech.fluid-flow' ? 6 : 5)
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
    // newtons-second-law is reached through circular-motion (KGCS P2)
    expect(byId.get('phys.mech.non-inertial-frames')!.requires).toEqual(['phys.mech.relative-motion', 'phys.mech.circular-motion'])
    expect(byId.get('phys.mech.fluid-flow')!.requires).toEqual(['phys.mech.pressure-fluids'])
    // kinetic-theory is reached through first-law -> internal-energy (KGCS P2)
    expect(byId.get('phys.therm.specific-heats-of-gases')!.requires).toEqual(['phys.therm.first-law'])
    for (const id of BATCH) for (const r of byId.get(id)!.requires) expect(byId.get(r)!.unlocks).toContain(id)
  })
  it('bernoulli now builds on continuity, with its pressure-fluids edge reduced away', () => {
    expect(byId.get('phys.mech.bernoulli')!.requires).toEqual(['phys.mech.conservation-of-energy', 'phys.mech.fluid-flow'])
    expect(byId.get('phys.mech.fluid-flow')!.unlocks).toContain('phys.mech.bernoulli')
    expect(byId.get('phys.mech.pressure-fluids')!.unlocks).not.toContain('phys.mech.bernoulli')
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
  it('frames: lift up 708 N, down 468 N, free fall 0; car tilt ≈ 17°; bend 270 N inward', () => {
    expect(apparentWeight(2)).toBeCloseTo(708, 8)
    expect(apparentWeight(-2)).toBeCloseTo(468, 8)
    expect(apparentWeight(-9.8)).toBeCloseTo(0, 8)
    expect(tiltDeg(3)).toBeCloseTo(17.02, 2)
    expect(centrifugal()).toBeCloseTo(270, 8)
    const t = texts(buildFramesScene())
    expect(t).toContain('N = 708 N')
    expect(t).toContain('270 N inward')
    expect(t).not.toMatch(/centrifugal force = /)
  })
  it('continuity: 4 cm² at 1.5 m/s -> 6 m/s in 1 cm², 0.6 L/s; Re = 2000 at 0.1 m/s in a 2 cm water pipe', () => {
    expect(continuitySpeed()).toBeCloseTo(6, 10)
    expect(flowRate()).toBeCloseTo(6e-4, 12)
    expect(continuitySpeed(1, 1, 0.25)).toBeCloseTo(4, 10)
    expect(reynolds(1000, 0.1, 0.02, 1e-3)).toBeCloseTo(2000, 8)
    const t = texts(buildContinuityScene())
    expect(t).toContain('6 m/s')
    expect(t).toContain('A₁v₁ = A₂v₂ = 0.6 L/s')
  })
  it('specific heats: Cp − Cv = R; 2 mol N₂ +10 K: 416 J at constant V, 582 J at constant p; γ 5/3 and 7/5', () => {
    expect(cpOf(5) - cvOf(5)).toBeCloseTo(GAS.R, 10)
    expect(heatAtConstantV(5)).toBeCloseTo(415.7, 1)
    expect(heatAtConstantP(5)).toBeCloseTo(581.98, 1)
    expect(heatAtConstantP(5) - heatAtConstantV(5)).toBeCloseTo(GAS.n * GAS.R * GAS.dT, 8)
    expect(gammaOf(3)).toBeCloseTo(5 / 3, 10)
    expect(gammaOf(5)).toBeCloseTo(1.4, 10)
    const t = texts(buildSpecificHeatsScene())
    expect(t).toContain('constant p: 582 J')
    expect(t).toContain('γ: He 1.67 · N₂ 1.40')
  })
})
