/**
 * Physics visual gap campaign, batch 11 (2026-09-30): relativity (remaining
 * four), astrophysics, and three core quantum ideas. Each test checks the
 * PHYSICS drawn.
 */
import { describe, it, expect } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { isRetiredVisualBinding } from '@/lib/teaching/visual/retired'
import { INSUFFICIENT_FOR_CONCEPT } from '@/lib/teaching/visual/scope'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import {
  buildSimultaneityScene, buildLorentzScene, buildRelativisticMomentumScene, buildSpacetimeScene,
  buildStellarStructureScene, buildStellarEvolutionScene, buildCosmologyScene, buildDarkMatterScene,
  buildBlackHoleScene, buildUncertaintyScene, buildQuantumOscillatorScene, buildPauliScene,
  SIM, platformTimes, LT, lorentz, relMomentum, SPACETIME_EVENT, interval, STELLAR_ENDS, H0, GALAXIES,
  hubbleTimeGyr, visibleOnlySpeed, observedSpeed, schwarzschildKm, M_SUN, PACKETS, sigmaP, qhoEnergy, SHELL_CAPACITY,
} from '@/lib/teaching/sceneGenerators/physicsCoreScenesB11'

type Obj = { type?: string; text?: string; from?: number[]; to?: number[]; position?: number[]; points?: number[][] }
const objs = (s: SceneSpec): Obj[] => s.steps.flatMap((st) => st.objects as Obj[])
const texts = (s: SceneSpec) => objs(s).map((o) => o.text ?? '').join(' | ')

const BATCH: Array<[string, () => SceneSpec, string]> = [
  ['phys.rel.simultaneity', buildSimultaneityScene, 'phys-simultaneity'],
  ['phys.rel.lorentz-transform', buildLorentzScene, 'phys-lorentz'],
  ['phys.rel.relativistic-momentum', buildRelativisticMomentumScene, 'phys-relativistic-momentum'],
  ['phys.rel.spacetime', buildSpacetimeScene, 'phys-spacetime'],
  ['phys.astro.stellar-structure', buildStellarStructureScene, 'phys-stellar-structure'],
  ['phys.astro.stellar-evolution', buildStellarEvolutionScene, 'phys-stellar-evolution'],
  ['phys.astro.cosmology', buildCosmologyScene, 'phys-cosmology'],
  ['phys.astro.dark-matter', buildDarkMatterScene, 'phys-dark-matter'],
  ['phys.astro.black-holes', buildBlackHoleScene, 'phys-black-hole'],
  ['phys.qm.uncertainty-principle', buildUncertaintyScene, 'phys-uncertainty'],
  ['phys.qm.harmonic-oscillator-qm', buildQuantumOscillatorScene, 'phys-quantum-oscillator'],
  ['phys.qm.pauli-exclusion', buildPauliScene, 'phys-pauli'],
]

describe('each concept is served its own figure, as a figure OF the concept', () => {
  it.each(BATCH)('%s', (conceptId, build, id) => {
    for (const req of [null, 'diagram'] as const) {
      const d = resolveVisual({ message: req ? 'show me a diagram' : '', lessonConceptId: conceptId, learnerRequest: req, subject: 'physics' } as Parameters<typeof resolveVisual>[0])
      expect(d.graphical, conceptId).toBe(true)
      expect(d.asset?.scope, conceptId).toBe('concept')
      expect((d.payload as { sceneSpec?: { id?: string } }).sceneSpec?.id).toBe(id)
    }
    expect(isRetiredVisualBinding(conceptId)).toBe(false)
    expect(INSUFFICIENT_FOR_CONCEPT.has(conceptId)).toBe(false)
    for (const o of objs(build())) {
      for (const p of [o.from, o.to, o.position, ...(o.points ?? [])].filter(Boolean) as number[][]) {
        expect(Math.abs(p[0]), `${conceptId} x`).toBeLessThanOrEqual(5)
        expect(Math.abs(p[1]), `${conceptId} y`).toBeLessThanOrEqual(5)
      }
    }
  })
})

describe('every figure passes the scene validator the renderer uses', () => {
  it.each(BATCH)('%s', (_id, build) => {
    const v = validateSceneSpec(build()) as { valid?: boolean; ok?: boolean; errors?: unknown }
    expect(v.valid ?? v.ok, JSON.stringify(v.errors ?? v)).toBe(true)
  })
})

describe('the physics each figure draws', () => {
  it('simultaneity: on the platform the rear is reached first, (L/2)/(c ± v)', () => {
    const t = platformTimes()
    expect(t.rear).toBeCloseTo(SIM.L / 2 / (1 + SIM.beta), 2)
    expect(t.front).toBeCloseTo(SIM.L / 2 / (1 - SIM.beta), 2)
    expect(t.rear).toBeLessThan(t.front)
  })

  it('Lorentz: the event transforms with γ(x − βct), γ(ct − βx)', () => {
    const e = lorentz(LT.x, LT.ct)
    expect(e.x).toBeCloseTo(2.31, 2)
    expect(e.ct).toBeCloseTo(0.58, 2)
    expect(texts(buildLorentzScene())).toContain(`x′ = ${e.x}, ct′ = ${e.ct}`)
  })

  it('relativistic momentum: agrees with mv at low speed, runs away near c', () => {
    expect(relMomentum(0.05) / 0.05).toBeCloseTo(1, 2)
    expect(relMomentum(0.9) / 0.9).toBeCloseTo(2.29, 2)
    expect(relMomentum(0.99)).toBeGreaterThan(6)
  })

  it('spacetime: the interval is the same in both frames', () => {
    const e = SPACETIME_EVENT
    const g = 1 / Math.sqrt(1 - 0.25)
    const xp = g * (e.x - 0.5 * e.ct), ctp = g * (e.ct - 0.5 * e.x)
    expect(interval(e.x, e.ct)).toBe(12)
    expect(ctp * ctp - xp * xp).toBeCloseTo(12, 6)
  })

  it('stellar structure: the pressure and gravity arrows at the shell are equal and opposite', () => {
    const [out, inn] = objs(buildStellarStructureScene()).filter((o) => o.type === 'arrow')
    const v = (a: Obj) => [a.to![0] - a.from![0], a.to![1] - a.from![1]]
    expect(v(out)[0]).toBeCloseTo(-v(inn)[0], 2)
    expect(v(out)[1]).toBeCloseTo(-v(inn)[1], 2)
  })

  it('stellar evolution: the end is ordered by mass', () => {
    expect(STELLAR_ENDS.map((s) => s.end)).toEqual(['white dwarf', 'neutron star', 'black hole'])
  })

  it('cosmology: galaxies follow v ≈ H₀d, and 1/H₀ ≈ 14 Gyr', () => {
    for (const [d, v] of GALAXIES) expect(Math.abs(v - H0 * d) / (H0 * d)).toBeLessThan(0.1)
    expect(hubbleTimeGyr()).toBeCloseTo(13.97, 1)
  })

  it('dark matter: visible-only speed falls as 1/√r far out; observed stays flat', () => {
    expect(visibleOnlySpeed(4) / visibleOnlySpeed(1)).toBeCloseTo(0.5, 5)
    expect(observedSpeed(4) / observedSpeed(2)).toBeGreaterThan(0.95)
  })

  it('black hole: r_s = 2GM/c² ≈ 2.95 km for the Sun; the passing ray leaves at a new angle', () => {
    expect(schwarzschildKm(M_SUN)).toBeCloseTo(2.95, 2)
    const ray = objs(buildBlackHoleScene()).find((o) => o.type === 'path' && o.points!.length > 60)!.points!
    const slope = (i: number, j: number) => (ray[j][1] - ray[i][1]) / (ray[j][0] - ray[i][0])
    expect(Math.abs(slope(0, 5))).toBeLessThan(0.05)                              // comes in level
    expect(slope(ray.length - 6, ray.length - 1)).toBeLessThan(-0.25)             // leaves deflected
  })

  it('uncertainty: σx·σp = ℏ/2 for both packets, and the narrow one is wide in momentum', () => {
    for (const p of PACKETS) expect(p.sx * sigmaP(p.sx)).toBeCloseTo(0.5, 10)
    expect(sigmaP(PACKETS[0].sx)).toBeGreaterThan(sigmaP(PACKETS[1].sx))
  })

  it('quantum oscillator: levels equally spaced by ℏω, the lowest at ½ℏω', () => {
    expect(qhoEnergy(0)).toBe(0.5)
    for (let n = 1; n < 5; n++) expect(qhoEnergy(n) - qhoEnergy(n - 1)).toBe(1)
  })

  it('Pauli: 1s holds two with opposite spins, so the third electron goes to 2s', () => {
    expect(SHELL_CAPACITY['1s']).toBe(2)
    const spins = objs(buildPauliScene()).filter((o) => o.type === 'arrow')
    const [a, b] = spins
    expect(Math.sign(a.to![1] - a.from![1])).toBe(-Math.sign(b.to![1] - b.from![1]))
  })
})
