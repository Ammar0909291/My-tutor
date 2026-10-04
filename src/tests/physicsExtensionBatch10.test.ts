/**
 * Physics coverage-driven KG extension, batch 10 (advanced tier, 2026-10-04):
 * lasers, radiation safety, communication systems, and radiation from accelerating
 * charges. Same contract as batch 1 (physicsExtensionBatch1.test.ts).
 */
import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync } from 'fs'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { loadBlueprint, loadEBConceptContext } from '@/lib/curriculum/blueprintLoader'
import { AUTHORED_EXPLANATIONS, AUTHORED_PROBES } from '@/lib/teaching/assets/authoredSeedAssets'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import {
  buildLaserScene, buildRadiationSafetyScene, buildModulationScene, buildDipoleScene,
  photonEnergyEv, photonRate, boltzmannFraction, equivalentDoseSv, doseRateAt, WEIGHTING,
  quarterWaveM, amBandwidthHz, horizonM, radiationPressure, halfWaveDipoleM, SOLAR_I,
} from '@/lib/teaching/sceneGenerators/physicsExtensionScenesB10'

const BATCH = [
  'phys.mod.lasers', 'phys.mod.radiation-safety', 'phys.em.communication-systems', 'phys.em.radiation-and-antennas',
] as const
const SCENES: Record<(typeof BATCH)[number], [string, () => SceneSpec]> = {
  'phys.mod.lasers': ['phys-laser', buildLaserScene],
  'phys.mod.radiation-safety': ['phys-radiation-safety', buildRadiationSafetyScene],
  'phys.em.communication-systems': ['phys-modulation', buildModulationScene],
  'phys.em.radiation-and-antennas': ['phys-dipole-radiation', buildDipoleScene],
}

type Obj = { text?: string; from?: number[]; to?: number[]; position?: number[]; points?: number[][] }
const texts = (s: SceneSpec) => s.steps.flatMap((st) => st.objects as Obj[]).map((o) => o.text ?? '').join(' | ')
const graph = JSON.parse(readFileSync('docs/physics/kg/graph.json', 'utf8'))
const byId = new Map<string, { requires: string[]; unlocks: string[] }>(graph.concepts.map((c: { id: string }) => [c.id, c]))

describe('every batch-10 concept arrives complete', () => {
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
    // photons is reached through atomic-spectra -> bohr-model (KGCS P2)
    expect(byId.get('phys.mod.lasers')!.requires).toEqual(['phys.mod.atomic-spectra'])
    expect(byId.get('phys.mod.radiation-safety')!.requires).toEqual(['phys.mod.radioactivity'])
    expect(byId.get('phys.em.communication-systems')!.requires).toEqual(['phys.em.electromagnetic-waves'])
    // radiation pressure needs momentum, which is not in the EM-wave chain (KGCS P1)
    expect(byId.get('phys.em.radiation-and-antennas')!.requires).toEqual(['phys.em.electromagnetic-waves', 'phys.mech.momentum'])
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
  it('lasers: 632.8 nm → 1.96 eV; 1 mW → 3.2e15 photons/s; room-temperature fraction 1.96 eV up ≈ 1e-33', () => {
    expect(photonEnergyEv(632.8)).toBeCloseTo(1.959, 3)
    expect(photonRate(1e-3, 632.8)).toBeCloseTo(3.186e15, -12)
    expect(boltzmannFraction(1.96)).toBeLessThan(1e-32)
    expect(boltzmannFraction(1.96)).toBeGreaterThan(1e-34)
    const t = texts(buildLaserScene())
    expect(t).toContain('1.96 eV, 632.8 nm')
    expect(t).toContain('1 photon in → 2 identical out')
  })
  it('radiation safety: 40 → 10 → 2.5 μSv/h at 1, 2, 4 m; 0.1 mGy alpha = 2 mSv', () => {
    expect(doseRateAt(2, 40)).toBeCloseTo(10, 10)
    expect(doseRateAt(4, 40)).toBeCloseTo(2.5, 10)
    expect(doseRateAt(3, 90)).toBeCloseTo(10, 10)
    expect(equivalentDoseSv(0.1, WEIGHTING.alpha)).toBeCloseTo(2, 10)
    expect(equivalentDoseSv(0.2, WEIGHTING.gamma)).toBeCloseTo(0.2, 10)
    const t = texts(buildRadiationSafetyScene())
    expect(t).toContain('2 m: 10')
    expect(t).toContain('0.1 mGy α × 20 = 2 mSv')
  })
  it('communication: 1 kHz needs a 75 km quarter-wave antenna, 100 MHz 0.75 m; AM 5 kHz → 10 kHz; 100 m mast → ≈ 36 km', () => {
    expect(quarterWaveM(1e3)).toBeCloseTo(75000, 6)
    expect(quarterWaveM(1e8)).toBeCloseTo(0.75, 10)
    expect(amBandwidthHz(5000)).toBe(10000)
    expect(horizonM(100)).toBeCloseTo(35777, 0)
    expect(horizonM(400)).toBeCloseTo(2 * horizonM(100), 6)
    expect(texts(buildModulationScene())).toContain('AM bandwidth = 2 × 5 kHz = 10 kHz · 100 m mast: 36 km')
  })
  it('antennas: half-wave dipole at 100 MHz = 1.5 m; sunlight 4.5 μPa absorbed, 9.1 μPa reflected', () => {
    expect(halfWaveDipoleM(1e8)).toBeCloseTo(1.5, 10)
    expect(radiationPressure(SOLAR_I, false)).toBeCloseTo(4.537e-6, 9)
    expect(radiationPressure(SOLAR_I, true)).toBeCloseTo(2 * radiationPressure(SOLAR_I, false), 15)
    expect(radiationPressure(SOLAR_I, true) * 1e4).toBeCloseTo(0.0907, 4)
    expect(texts(buildDipoleScene())).toContain('mirror: 9.1 μPa')
  })
})
