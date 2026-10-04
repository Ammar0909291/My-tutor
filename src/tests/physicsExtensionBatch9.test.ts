/**
 * Physics coverage-driven KG extension, batch 9 (advanced tier, 2026-10-04):
 * the Earth–Moon–Sun system, stellar properties and the HR diagram, the distance
 * ladder, and the Hall effect. Same contract as batch 1 (physicsExtensionBatch1.test.ts).
 */
import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync } from 'fs'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { loadBlueprint, loadEBConceptContext } from '@/lib/curriculum/blueprintLoader'
import { AUTHORED_EXPLANATIONS, AUTHORED_PROBES } from '@/lib/teaching/assets/authoredSeedAssets'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import {
  buildEarthMoonSunScene, buildHrDiagramScene, buildDistanceLadderScene, buildHallScene,
  noonHeight, spreadRatio, pullRatioSunMoon, tidalRatioMoonSun, SKY,
  luminosityW, radiusInSuns, wienPeakNm, SUN,
  parallaxDistancePc, redshift, hubbleDistanceMpc, distanceModulusPc, C_KMS, hallVoltage,
} from '@/lib/teaching/sceneGenerators/physicsExtensionScenesB9'

const BATCH = [
  'phys.astro.solar-system', 'phys.astro.stellar-properties', 'phys.astro.distance-ladder', 'phys.em.hall-effect',
] as const
const SCENES: Record<(typeof BATCH)[number], [string, () => SceneSpec]> = {
  'phys.astro.solar-system': ['phys-earth-moon-sun', buildEarthMoonSunScene],
  'phys.astro.stellar-properties': ['phys-hr-diagram', buildHrDiagramScene],
  'phys.astro.distance-ladder': ['phys-distance-ladder', buildDistanceLadderScene],
  'phys.em.hall-effect': ['phys-hall-effect', buildHallScene],
}

type Obj = { text?: string; from?: number[]; to?: number[]; position?: number[]; points?: number[][] }
const texts = (s: SceneSpec) => s.steps.flatMap((st) => st.objects as Obj[]).map((o) => o.text ?? '').join(' | ')
const graph = JSON.parse(readFileSync('docs/physics/kg/graph.json', 'utf8'))
const byId = new Map<string, { requires: string[]; unlocks: string[] }>(graph.concepts.map((c: { id: string }) => [c.id, c]))

describe('every batch-9 concept arrives complete', () => {
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
    // eclipses and the slanting-beam argument need straight-line light and shadows (KGCS P1)
    expect(byId.get('phys.astro.solar-system')!.requires).toEqual(['phys.mech.universal-gravitation', 'phys.opt.rectilinear-propagation'])
    expect(byId.get('phys.astro.stellar-properties')!.requires).toEqual(['phys.therm.blackbody-radiation'])
    // redshift and Hubble's law need the Doppler effect (KGCS P1)
    expect(byId.get('phys.astro.distance-ladder')!.requires).toEqual(['phys.astro.stellar-properties', 'phys.wave.doppler-effect'])
    // electric-current (I = nqv_dA) is reached through magnetic-force (KGCS P2)
    expect(byId.get('phys.em.hall-effect')!.requires).toEqual(['phys.em.magnetic-force'])
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
  it('Earth–Moon–Sun: 28.6°N noon Sun 84.8° / 38.0°, spread ×1.6; Sun pulls ≈ 179× harder, Moon tides ≈ 2.2× the Sun\'s', () => {
    expect(noonHeight(SKY.lat, SKY.tilt)).toBeCloseTo(84.8, 10)
    expect(noonHeight(SKY.lat, -SKY.tilt)).toBeCloseTo(38.0, 10)
    expect(spreadRatio(84.8, 38.0)).toBeCloseTo(1.618, 3)
    expect(pullRatioSunMoon()).toBeCloseTo(178.7, 0)
    expect(tidalRatioMoonSun()).toBeCloseTo(2.18, 2)
    const t = texts(buildEarthMoonSunScene())
    expect(t).toContain('June 84.8°')
    expect(t).toContain('tidal effect: Moon 2.2× Sun')
  })
  it('stellar properties: L☉ ≈ 3.83e26 W; Betelgeuse ≈ 860 R☉; Sirius B ≈ 0.013 R☉; Wien 3500 K → 828 nm', () => {
    expect(luminosityW(SUN.R, SUN.T)).toBeCloseTo(3.828e26, -23)
    expect(luminosityW(SUN.R, 2 * SUN.T) / luminosityW(SUN.R, SUN.T)).toBeCloseTo(16, 10)
    expect(radiusInSuns(100, 3500)).toBeCloseTo(27.2, 1)
    expect(radiusInSuns(1e5, 3500)).toBeCloseTo(860, 0)
    expect(radiusInSuns(0.056, 25000)).toBeCloseTo(0.0126, 4)
    expect(wienPeakNm(3500)).toBeCloseTo(828, 6)
    const t = texts(buildHrDiagramScene())
    expect(t).toContain('Betelgeuse: 860 R☉')
    expect(t).toContain('Sirius B: 0.013 R☉')
  })
  it('distance ladder: Proxima 1.30 pc; Cepheid m − M = 25 → 1 Mpc; z = 0.020 → 6000 km/s → ≈ 86 Mpc', () => {
    expect(parallaxDistancePc(0.768)).toBeCloseTo(1.302, 3)
    expect(parallaxDistancePc(0.1)).toBeGreaterThan(parallaxDistancePc(0.5))
    expect(distanceModulusPc(21, -4)).toBeCloseTo(1e6, 0)
    const z = redshift(669.4, 656.3)
    expect(z).toBeCloseTo(0.01996, 5)
    expect(hubbleDistanceMpc(z * C_KMS)).toBeCloseTo(85.5, 1)
    const t = texts(buildDistanceLadderScene())
    expect(t).toContain('Proxima: p = 0.768″ → 1.30 pc')
    expect(t).toContain('86 Mpc, 6000 km/s')
  })
  it('Hall effect: copper 5 A, 1 T, 0.1 mm → 3.7 μV; semiconductor 10 mA, 0.5 T → 31 mV', () => {
    expect(hallVoltage(5, 1, 8.5e28, 1e-4)).toBeCloseTo(3.676e-6, 9)
    expect(hallVoltage(0.01, 0.5, 1e22, 1e-4)).toBeCloseTo(0.03125, 8)
    // fewer carriers, larger Hall voltage
    expect(hallVoltage(1, 1, 1e22, 1e-4)).toBeGreaterThan(hallVoltage(1, 1, 1e28, 1e-4))
    expect(texts(buildHallScene())).toContain('copper 3.7 μV · semiconductor 31 mV')
  })
})
