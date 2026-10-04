/**
 * Physics coverage-driven KG extension, batch 13 (advanced tier, 2026-10-04):
 * special-purpose diodes. Same contract as batch 1 (physicsExtensionBatch1.test.ts).
 */
import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync } from 'fs'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { loadBlueprint, loadEBConceptContext } from '@/lib/curriculum/blueprintLoader'
import { AUTHORED_EXPLANATIONS, AUTHORED_PROBES } from '@/lib/teaching/assets/authoredSeedAssets'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import {
  buildSpecialDiodesScene, zenerCurrents, gapWavelengthNm, seriesResistor, REG, SI_GAP,
} from '@/lib/teaching/sceneGenerators/physicsExtensionScenesB13'

const BATCH = ['phys.mod.special-diodes'] as const
const SCENES: Record<(typeof BATCH)[number], [string, () => SceneSpec]> = {
  'phys.mod.special-diodes': ['phys-special-diodes', buildSpecialDiodesScene],
}

type Obj = { text?: string; from?: number[]; to?: number[]; position?: number[]; points?: number[][] }
const texts = (s: SceneSpec) => s.steps.flatMap((st) => st.objects as Obj[]).map((o) => o.text ?? '').join(' | ')
const graph = JSON.parse(readFileSync('docs/physics/kg/graph.json', 'utf8'))
const byId = new Map<string, { requires: string[]; unlocks: string[] }>(graph.concepts.map((c: { id: string }) => [c.id, c]))

describe('every batch-13 concept arrives complete', () => {
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
    // the I–V characteristic is load-bearing (pn-junction is its own prerequisite, KGCS P2);
    // Ohm's law for the series resistors is in neither chain (KGCS P1)
    expect(byId.get('phys.mod.special-diodes')!.requires).toEqual(['phys.mod.diode-rectification', 'phys.em.ohms-law'])
    for (const id of BATCH) for (const r of byId.get(id)!.requires) expect(byId.get(r)!.unlocks).toContain(id)
  })
  it('sits right after diode rectification in lesson order', () => {
    const ids = graph.concepts.map((c: { id: string }) => c.id)
    expect(ids.indexOf('phys.mod.special-diodes')).toBe(ids.indexOf('phys.mod.diode-rectification') + 1)
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
  it('Zener regulator: 58 / 10 / 48 mA at 12 V, 68 mA at 14 V, off below V_Z', () => {
    const r = zenerCurrents(REG.Vs, REG.Vz, REG.R, REG.RL)
    expect(r.IR).toBeCloseTo(0.058, 10)
    expect(r.IL).toBeCloseTo(0.010, 10)
    expect(r.IZ).toBeCloseTo(0.048, 10)
    expect(zenerCurrents(14, REG.Vz, REG.R, REG.RL).IZ).toBeCloseTo(0.068, 10)
    expect(zenerCurrents(6.0, REG.Vz, REG.R, REG.RL).IZ).toBe(0)
    const t = texts(buildSpecialDiodesScene())
    expect(t).toContain('I_Z = 58 − 10 = 48 mA')
    expect(t).toContain('14 V supply: I_Z = 68 mA')
  })
  it('LED and photodiode: 1.9 eV → 653 nm, 2.3 → 539, 2.7 → 459; Si cutoff 1107 nm; 150 Ω', () => {
    expect(gapWavelengthNm(1.9)).toBeCloseTo(652.5, 1)
    expect(gapWavelengthNm(2.3)).toBeCloseTo(539.1, 1)
    expect(gapWavelengthNm(2.7)).toBeCloseTo(459.2, 1)
    expect(gapWavelengthNm(SI_GAP)).toBeCloseTo(1107.0, 0)
    expect(seriesResistor(5, 2.0, 0.02)).toBeCloseTo(150, 10)
    const t = texts(buildSpecialDiodesScene())
    expect(t).toContain('653 nm')
    expect(t).toContain('459 nm')
    expect(t).toContain('Si photodiode: < 1107 nm')
  })
})
