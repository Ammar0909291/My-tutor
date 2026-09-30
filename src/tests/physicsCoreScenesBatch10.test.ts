/**
 * Physics visual gap campaign, batch 10 (2026-09-30): particle physics. Each
 * test checks the PHYSICS drawn.
 */
import { describe, it, expect } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { isRetiredVisualBinding } from '@/lib/teaching/visual/retired'
import { INSUFFICIENT_FOR_CONCEPT } from '@/lib/teaching/visual/scope'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import {
  buildFourForcesScene, buildParticleClassificationScene, buildAntimatterScene, buildQuarksScene,
  buildLeptonsScene, buildNeutrinoScene, buildHadronQuarkScene, buildGaugeBosonsScene,
  buildStrongInteractionScene, buildWeakInteractionScene, buildElectroweakScene, buildHiggsScene,
  buildParticleConservationScene, buildFeynmanScene, buildAcceleratorScene, buildStandardModelScene,
  FORCES, ME_MEV, QUARKS, LEPTON_MASS, betaSpectrum, BETA_Q, hadronCharge, HADRONS, cornell, WEAK_VERTEX,
  weakEffective, M_W, higgsV, higgsVev, tally, invariantMass, PHOTON_E,
} from '@/lib/teaching/sceneGenerators/physicsCoreScenesB10'

type Obj = { type?: string; text?: string; from?: number[]; to?: number[]; position?: number[]; points?: number[][] }
const objs = (s: SceneSpec): Obj[] => s.steps.flatMap((st) => st.objects as Obj[])
const texts = (s: SceneSpec) => objs(s).map((o) => o.text ?? '').join(' | ')

const BATCH: Array<[string, () => SceneSpec, string]> = [
  ['phys.particle.four-forces', buildFourForcesScene, 'phys-four-forces'],
  ['phys.particle.particle-classification', buildParticleClassificationScene, 'phys-particle-classification'],
  ['phys.particle.antimatter', buildAntimatterScene, 'phys-antimatter'],
  ['phys.particle.quarks', buildQuarksScene, 'phys-quarks'],
  ['phys.particle.leptons', buildLeptonsScene, 'phys-leptons'],
  ['phys.particle.neutrinos', buildNeutrinoScene, 'phys-neutrinos'],
  ['phys.particle.hadron-quark-model', buildHadronQuarkScene, 'phys-hadron-quarks'],
  ['phys.particle.gauge-bosons', buildGaugeBosonsScene, 'phys-gauge-bosons'],
  ['phys.particle.strong-interaction', buildStrongInteractionScene, 'phys-strong-interaction'],
  ['phys.particle.weak-interaction', buildWeakInteractionScene, 'phys-weak-interaction'],
  ['phys.particle.electroweak-unification', buildElectroweakScene, 'phys-electroweak'],
  ['phys.particle.higgs-mechanism', buildHiggsScene, 'phys-higgs'],
  ['phys.particle.conservation-laws', buildParticleConservationScene, 'phys-particle-conservation'],
  ['phys.particle.feynman-diagrams', buildFeynmanScene, 'phys-feynman'],
  ['phys.particle.accelerators-detectors', buildAcceleratorScene, 'phys-accelerator'],
  ['phys.particle.standard-model', buildStandardModelScene, 'phys-standard-model'],
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
  it('four forces: strong > EM > weak > gravity, and the bars are in that order', () => {
    const rel = FORCES.map((f) => f.rel)
    for (let i = 1; i < rel.length; i++) expect(rel[i]).toBeLessThan(rel[i - 1])
    const bars = objs(buildFourForcesScene()).filter((o) => o.type === 'bond').map((o) => o.to![0] - o.from![0])
    for (let i = 1; i < bars.length; i++) expect(bars[i]).toBeLessThan(bars[i - 1])
  })

  it('classification: hadrons feel the strong force, leptons do not', () => {
    expect(texts(buildParticleClassificationScene())).toContain('strong force: hadrons only')
  })

  it('antimatter: pair threshold 2mₑc² = 1.02 MeV; the two tracks curve opposite ways', () => {
    expect(2 * ME_MEV).toBeCloseTo(1.022, 3)
    const [e, p] = objs(buildAntimatterScene()).filter((o) => o.type === 'path' && o.points!.length > 20 && o.points!.length < 40)
    const endY = (o: Obj) => o.points![o.points!.length - 1][1]
    expect(Math.sign(endY(e))).toBe(-Math.sign(endY(p)))
  })

  it('quarks: up-type +⅔, down-type −⅓, three generations each', () => {
    expect(QUARKS.filter((q) => q.up).every((q) => q.q === '+⅔')).toBe(true)
    expect(QUARKS.filter((q) => !q.up).every((q) => q.q === '−⅓')).toBe(true)
    expect(new Set(QUARKS.map((q) => q.gen)).size).toBe(3)
  })

  it('leptons: each generation heavier than the last', () => {
    expect(LEPTON_MASS.mu).toBeGreaterThan(LEPTON_MASS.e * 100)
    expect(LEPTON_MASS.tau).toBeGreaterThan(LEPTON_MASS.mu * 10)
  })

  it('neutrinos: the beta spectrum is continuous, zero at 0 and at Q', () => {
    expect(betaSpectrum(0)).toBe(0)
    expect(betaSpectrum(BETA_Q)).toBe(0)
    expect(betaSpectrum(BETA_Q / 3)).toBeGreaterThan(0)
  })

  it('hadrons: proton +1, neutron 0, π⁺ +1 from quark charges', () => {
    expect(HADRONS.map((h) => hadronCharge(h.q))).toEqual([1, 0, 1])
  })

  it('gauge bosons: photon and gluon massless, W and Z heavy', () => {
    const t = texts(buildGaugeBosonsScene())
    expect(t).toContain('photon γ, m = 0')
    expect(t).toContain('W±, Z, m = 80.4, 91.2 GeV')
  })

  it('strong interaction: the potential keeps rising with separation (confinement)', () => {
    expect(cornell(3) - cornell(2)).toBeCloseTo(cornell(4) - cornell(3), 1)
    expect(cornell(4)).toBeGreaterThan(cornell(1))
  })

  it('weak interaction: charge balances at the d → u + W⁻ vertex', () => {
    expect(WEAK_VERTEX.d).toBeCloseTo(WEAK_VERTEX.u + WEAK_VERTEX.W, 10)
    expect(WEAK_VERTEX.W).toBeCloseTo(WEAK_VERTEX.e + WEAK_VERTEX.nubar, 10)
  })

  it('electroweak: the weak strength rises to meet electromagnetism at M_W, and stays on the axes', () => {
    expect(weakEffective(M_W)).toBe(1)
    expect(weakEffective(8)).toBeCloseTo(0.01, 2)
    const weak = objs(buildElectroweakScene()).find((o) => o.type === 'path')!
    for (const p of weak.points!) expect(p[1]).toBeGreaterThanOrEqual(-2.6 - 1e-6)
  })

  it('Higgs: the minimum of V is at φ = v ≠ 0, below V(0)', () => {
    const v = higgsVev()
    expect(v).toBeGreaterThan(0)
    expect(higgsV(v)).toBeLessThan(higgsV(0))
    expect(higgsV(v)).toBeLessThan(higgsV(v * 0.9))
    expect(higgsV(v)).toBeLessThan(higgsV(v * 1.1))
  })

  it('conservation: neutron decay balances B and L; p → e⁺ γ breaks B', () => {
    expect(tally(['n'])).toEqual(tally(['p', 'e⁻', 'ν̄ₑ']))
    expect(tally(['p'])[0]).not.toBe(tally(['e⁺', 'γ'])[0])
  })

  it('Feynman diagram: a photon exchanged between two vertices, time upward', () => {
    const t = texts(buildFeynmanScene())
    expect(t).toContain('γ')
    expect(t).toContain('time')
  })

  it('accelerator: two 63.5 GeV photons 160° apart reconstruct ≈ 125 GeV', () => {
    expect(invariantMass(PHOTON_E[0], PHOTON_E[1], 160)).toBeCloseTo(125, 0)
    expect(invariantMass(62.5, 62.5, 180)).toBeCloseTo(125, 5)
  })

  it('Standard Model: all 17 particle names appear', () => {
    const t = texts(buildStandardModelScene())
    for (const n of ['u', 'c', 't', 'd', 's', 'b', 'e', 'μ', 'τ', 'νₑ', 'ν_μ', 'ν_τ', 'g', 'γ', 'Z', 'W', 'H']) expect(t).toContain(n)
  })
})
