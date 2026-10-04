/**
 * Physics coverage-driven KG extension, batch 11 (advanced tier, 2026-10-04):
 * coupled oscillators, nonlinear dynamics and chaos, fields in matter, and
 * superconductivity. Same contract as batch 1 (physicsExtensionBatch1.test.ts).
 */
import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync } from 'fs'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { loadBlueprint, loadEBConceptContext } from '@/lib/curriculum/blueprintLoader'
import { AUTHORED_EXPLANATIONS, AUTHORED_PROBES } from '@/lib/teaching/assets/authoredSeedAssets'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import {
  buildCoupledScene, buildChaosScene, buildFieldsInMatterScene, buildSuperconductivityScene,
  modeFrequencies, pendulumModes, swapTime, COUPLED,
  logisticStep, iterateLogistic, fixedPoint, divergenceStep,
  fieldInDielectric, polarisation, solenoidH, solenoidB, criticalField, LEAD,
} from '@/lib/teaching/sceneGenerators/physicsExtensionScenesB11'

const BATCH = [
  'phys.wave.coupled-oscillators', 'phys.wave.nonlinear-dynamics', 'phys.em.fields-in-matter', 'phys.mod.superconductivity',
] as const
const SCENES: Record<(typeof BATCH)[number], [string, () => SceneSpec]> = {
  'phys.wave.coupled-oscillators': ['phys-coupled-oscillators', buildCoupledScene],
  'phys.wave.nonlinear-dynamics': ['phys-logistic-chaos', buildChaosScene],
  'phys.em.fields-in-matter': ['phys-fields-in-matter', buildFieldsInMatterScene],
  'phys.mod.superconductivity': ['phys-superconductivity', buildSuperconductivityScene],
}

type Obj = { text?: string; from?: number[]; to?: number[]; position?: number[]; points?: number[][] }
const texts = (s: SceneSpec) => s.steps.flatMap((st) => st.objects as Obj[]).map((o) => o.text ?? '').join(' | ')
const graph = JSON.parse(readFileSync('docs/physics/kg/graph.json', 'utf8'))
const byId = new Map<string, { requires: string[]; unlocks: string[] }>(graph.concepts.map((c: { id: string }) => [c.id, c]))

describe('every batch-11 concept arrives complete', () => {
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
    expect(byId.get('phys.wave.coupled-oscillators')!.requires).toEqual(['phys.wave.shm', 'phys.wave.standing-waves'])
    expect(byId.get('phys.wave.nonlinear-dynamics')!.requires).toEqual(['phys.wave.forced-oscillations'])
    // Ampère's law for H is load-bearing and in neither audit chain (KGCS P1)
    expect(byId.get('phys.em.fields-in-matter')!.requires).toEqual(['phys.em.dielectrics', 'phys.em.magnetic-materials', 'phys.em.amperes-law'])
    // zero resistance is the defining property; resistivity is in neither audit chain (KGCS P1)
    expect(byId.get('phys.mod.superconductivity')!.requires).toEqual(['phys.em.resistivity', 'phys.em.magnetic-materials', 'phys.mod.energy-bands'])
    for (const id of BATCH) for (const r of byId.get(id)!.requires) expect(byId.get(r)!.unlocks).toContain(id)
  })
  it('nonlinear dynamics sits in the wave domain, after its prerequisites in lesson order', () => {
    const ids = graph.concepts.map((c: { id: string }) => c.id)
    expect(ids.indexOf('phys.wave.nonlinear-dynamics')).toBeGreaterThan(ids.indexOf('phys.wave.forced-oscillations'))
    expect(ids.indexOf('phys.wave.nonlinear-dynamics')).toBeGreaterThan(ids.indexOf('phys.wave.shm'))
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
  it('coupled oscillators: modes 10 and 17.3 rad/s; pendulum modes 3.130/3.286 rad/s swap energy every ≈ 20 s', () => {
    const [w1, w2] = modeFrequencies(COUPLED.k, COUPLED.m)
    expect(w1).toBeCloseTo(10, 10)
    expect(w2).toBeCloseTo(17.32, 2)
    const [p1, p2] = pendulumModes(COUPLED.g, COUPLED.L, COUPLED.kOverM)
    expect(p1).toBeCloseTo(3.130, 3)
    expect(p2).toBeCloseTo(3.286, 3)
    expect(swapTime(p1, p2)).toBeCloseTo(20.16, 2)
    const t = texts(buildCoupledScene())
    expect(t).toContain('out of phase 17.3 rad/s')
    expect(t).toContain('swap time = π/(ω₂ − ω₁) ≈ 20 s')
  })
  it('chaos: r = 2.8 → 0.643; r = 3.2 → 0.513/0.799; r = 3.9 runs 1e-6 apart diverge by step 22; reruns are identical', () => {
    expect(fixedPoint(2.8)).toBeCloseTo(0.6429, 4)
    expect(logisticStep(2.8, fixedPoint(2.8))).toBeCloseTo(fixedPoint(2.8), 12)
    const tail = iterateLogistic(3.2, 0.5, 200).slice(-2).sort()
    expect(tail[0]).toBeCloseTo(0.5130, 4)
    expect(tail[1]).toBeCloseTo(0.7995, 4)
    expect(divergenceStep(3.9, 0.2, 1e-6)).toBe(22)
    // deterministic: identical starts give identical sequences
    expect(iterateLogistic(3.9, 0.2, 50)).toEqual(iterateLogistic(3.9, 0.2, 50))
    expect(texts(buildChaosScene())).toContain('diverge by step 22')
  })
  it('fields in matter: σ = 1e-6 C/m², ε_r = 4 → E ≈ 2.82e4 V/m, P = 7.5e-7 C/m²; n = 1000, I = 2 A → H = 2000 A/m, B 2.5 mT → 1.26 T', () => {
    expect(fieldInDielectric(1e-6, 4)).toBeCloseTo(2.8236e4, -1)
    expect(fieldInDielectric(1e-6, 1) / fieldInDielectric(1e-6, 4)).toBeCloseTo(4, 10)
    expect(polarisation(1e-6, 4)).toBeCloseTo(7.5e-7, 12)
    expect(solenoidH(1000, 2)).toBe(2000)
    expect(solenoidB(1000, 2)).toBeCloseTo(2.513e-3, 6)
    expect(solenoidB(1000, 2, 500)).toBeCloseTo(1.2566, 4)
    expect(texts(buildFieldsInMatterScene())).toContain('H = 2000 A/m · B: 2.5 mT → 1.26 T')
  })
  it('superconductivity: lead B_c(4.2 K) ≈ 0.053 T, zero at T_c', () => {
    expect(criticalField(LEAD.Bc0, 4.2, LEAD.Tc)).toBeCloseTo(0.05278, 5)
    expect(criticalField(LEAD.Bc0, LEAD.Tc, LEAD.Tc)).toBe(0)
    expect(criticalField(LEAD.Bc0, 0, LEAD.Tc)).toBeCloseTo(0.080, 10)
    expect(texts(buildSuperconductivityScene())).toContain('4.2 K: 0.053 T')
  })
})
