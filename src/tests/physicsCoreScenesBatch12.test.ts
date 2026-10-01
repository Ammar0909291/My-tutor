/**
 * Physics visual gap campaign, batch 12 (2026-09-30): statistical physics (all
 * fourteen). Each test checks the PHYSICS drawn.
 */
import { describe, it, expect } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { isRetiredVisualBinding } from '@/lib/teaching/visual/retired'
import { INSUFFICIENT_FOR_CONCEPT } from '@/lib/teaching/visual/scope'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import {
  buildBoltzmannFactorScene, buildPartitionFunctionScene, buildMaxwellBoltzmannScene, buildFermiDiracScene,
  buildBoseEinsteinScene, buildStatisticalEntropyScene, buildFreeEnergyScene, buildGrandCanonicalScene,
  buildChemicalPotentialScene, buildFluctuationsScene, buildLandauScene, buildIsingScene, buildCriticalScene,
  buildMonteCarloScene,
  boltzmann, partition, mostProbableSpeed, mbDensity, fermiDirac, condensateFraction, microstates, COINS,
  deltaG, FE, MU_DENSITIES, relativeFluctuation, landauF, landauMinimum, isingEnergy, ISING_COLD, ISING_HOT,
  orderParameter, susceptibility, metropolisAccept,
} from '@/lib/teaching/sceneGenerators/physicsCoreScenesB12'

type Obj = { type?: string; text?: string; from?: number[]; to?: number[]; position?: number[]; points?: number[][] }
const objs = (s: SceneSpec): Obj[] => s.steps.flatMap((st) => st.objects as Obj[])
const texts = (s: SceneSpec) => objs(s).map((o) => o.text ?? '').join(' | ')

const BATCH: Array<[string, () => SceneSpec, string]> = [
  ['phys.stat.boltzmann-factor', buildBoltzmannFactorScene, 'phys-boltzmann-factor'],
  ['phys.stat.partition-function', buildPartitionFunctionScene, 'phys-partition-function'],
  ['phys.stat.maxwell-boltzmann', buildMaxwellBoltzmannScene, 'phys-maxwell-boltzmann'],
  ['phys.stat.fermi-dirac', buildFermiDiracScene, 'phys-fermi-dirac'],
  ['phys.stat.bose-einstein', buildBoseEinsteinScene, 'phys-bose-einstein'],
  ['phys.stat.entropy-statistical', buildStatisticalEntropyScene, 'phys-entropy-statistical'],
  ['phys.stat.free-energy', buildFreeEnergyScene, 'phys-free-energy'],
  ['phys.stat.grand-canonical-ensemble', buildGrandCanonicalScene, 'phys-grand-canonical'],
  ['phys.stat.chemical-potential', buildChemicalPotentialScene, 'phys-chemical-potential'],
  ['phys.stat.fluctuations-correlations', buildFluctuationsScene, 'phys-fluctuations'],
  ['phys.stat.phase-transitions', buildLandauScene, 'phys-landau'],
  ['phys.stat.ising-model', buildIsingScene, 'phys-ising'],
  ['phys.stat.phase-transitions-critical-phenomena', buildCriticalScene, 'phys-critical-phenomena'],
  ['phys.stat.monte-carlo-basics', buildMonteCarloScene, 'phys-monte-carlo'],
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
  it('Boltzmann factor: each kT costs a factor e; a hotter system falls more slowly', () => {
    expect(boltzmann(1, 1) / boltzmann(0, 1)).toBeCloseTo(1 / Math.E, 10)
    expect(boltzmann(2, 2)).toBeGreaterThan(boltzmann(2, 1))
    expect(texts(buildBoltzmannFactorScene())).toContain('e^(−1) = 0.37 vs e^(−2) = 0.14')
  })

  it('partition function: Z sums the factors and the probabilities sum to 1', () => {
    const pf = partition()
    expect(pf.Z).toBeCloseTo(1 + Math.exp(-1) + Math.exp(-2), 2)
    expect(pf.p.reduce((a, b) => a + b, 0)).toBeCloseTo(1, 2)
    expect(pf.p[0]).toBeGreaterThan(pf.p[1])
  })

  it('Maxwell–Boltzmann: v_p = √(2kT/m) is 422 m/s for N₂ at 300 K and grows as √T', () => {
    expect(mostProbableSpeed(300)).toBe(422)
    expect(mostProbableSpeed(900) / mostProbableSpeed(300)).toBeCloseTo(Math.sqrt(3), 2)
    const v = mostProbableSpeed(300)
    expect(mbDensity(v, 300)).toBeGreaterThan(mbDensity(v * 0.8, 300))
    expect(mbDensity(v, 300)).toBeGreaterThan(mbDensity(v * 1.2, 300))
  })

  it('Fermi–Dirac: a step at T = 0, exactly ½ at E_F when warm', () => {
    expect(fermiDirac(0.5, 1, 0)).toBe(1)
    expect(fermiDirac(1.5, 1, 0)).toBe(0)
    expect(fermiDirac(1, 1, 0.1)).toBe(0.5)
  })

  it('Bose–Einstein: all condensed at T = 0, none at or above T_c', () => {
    expect(condensateFraction(0)).toBe(1)
    expect(condensateFraction(1)).toBe(0)
    expect(condensateFraction(0.5)).toBeCloseTo(1 - 0.5 ** 1.5, 10)
  })

  it('statistical entropy: 2⁶ microstates in all, and "3 heads" has the most (20)', () => {
    const om = microstates()
    expect(om).toEqual([1, 6, 15, 20, 15, 6, 1])
    expect(om.reduce((a, b) => a + b, 0)).toBe(2 ** COINS)
  })

  it('free energy: ΔG changes sign at T = ΔH/ΔS = 400 K', () => {
    expect(deltaG(FE.dH / FE.dS)).toBeCloseTo(0, 10)
    expect(deltaG(300)).toBeGreaterThan(0)
    expect(deltaG(500)).toBeLessThan(0)
  })

  it('grand canonical: the figure shows exchange of energy and particles, and Ξ', () => {
    const t = texts(buildGrandCanonicalScene())
    for (const s of ['energy', 'particles', 'Ξ', 'μ']) expect(t).toContain(s)
  })

  it('chemical potential: particles flow from high μ to low μ and settle at equal numbers', () => {
    const [flow] = objs(buildChemicalPotentialScene()).filter((o) => o.type === 'arrow')
    expect(flow.to![0]).toBeGreaterThan(flow.from![0])          // left (dense, high μ) → right
    expect(MU_DENSITIES.left).toBeGreaterThan(MU_DENSITIES.right)
    const eq = (MU_DENSITIES.left + MU_DENSITIES.right) / 2
    expect(texts(buildChemicalPotentialScene())).toContain(`(${eq} and ${eq})`)
  })

  it('fluctuations: 1/√N — 10% at N = 100, ~10⁻¹² for a mole', () => {
    expect(relativeFluctuation(100)).toBeCloseTo(0.1, 10)
    expect(relativeFluctuation(6.022e23)).toBeLessThan(2e-12)
  })

  it('Landau: one minimum at η = 0 above T_c; two symmetric minima below', () => {
    expect(landauMinimum(1.5)).toBe(0)
    const e0 = landauMinimum(0.2)
    expect(e0).toBeGreaterThan(0)
    expect(landauF(e0, 0.2)).toBeLessThan(landauF(0, 0.2))
    expect(landauF(-e0, 0.2)).toBeCloseTo(landauF(e0, 0.2), 10)
    expect(landauF(e0 * 1.05, 0.2)).toBeGreaterThan(landauF(e0, 0.2))
  })

  it('Ising: the aligned lattice has lower energy than the mixed one; energies match the labels', () => {
    expect(isingEnergy(ISING_COLD)).toBe(-32)
    expect(isingEnergy(ISING_HOT)).toBeGreaterThan(isingEnergy(ISING_COLD))
    const t = texts(buildIsingScene())
    expect(t).toContain('E = −32 J')
    expect(t).toContain(`E = ${isingEnergy(ISING_HOT)} J`)
  })

  it('critical phenomena: the order parameter vanishes at T_c and χ peaks there', () => {
    expect(orderParameter(1)).toBe(0)
    expect(orderParameter(0.5)).toBeGreaterThan(0)
    expect(susceptibility(0.99)).toBeGreaterThan(susceptibility(0.5))
  })

  it('Monte Carlo: downhill always accepted, uphill with e^(−ΔE/kT), more often when hot', () => {
    expect(metropolisAccept(-1, 1)).toBe(1)
    expect(metropolisAccept(1, 1)).toBeCloseTo(Math.exp(-1), 10)
    expect(metropolisAccept(1, 3)).toBeGreaterThan(metropolisAccept(1, 1))
  })
})
