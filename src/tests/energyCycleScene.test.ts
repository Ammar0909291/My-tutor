/**
 * Energy cycle generator — Chemistry Visual Coverage programme.
 *
 * Covers chem.thermo.enthalpy (Hess's Law), chem.thermo.bond-enthalpy (the
 * Born–Haber cycle) and chem.coord.cft (Crystal Field Theory splitting).
 * The core claim under test is Hess's Law itself: every path between the
 * same start and end state must total the same ΔH — verified against real
 * textbook thermochemical data, with a negative control proving the checker
 * actually catches a physically wrong data set rather than always passing.
 */
import { describe, expect, it } from 'vitest'
import {
  buildEnergyCycleScene, checkEnergyCycleConsistency, derivePaths,
  validateEnergyCycleParams, type EnergyCycleParams,
} from '@/lib/teaching/sceneGenerators/energyCycle'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { buildCanonicalScene } from '@/lib/teaching/visual/conceptSceneParams'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'

const HESS: EnergyCycleParams = {
  title: "Hess's Law: Combustion of Carbon",
  startLabel: 'C(s) + O2(g)',
  unit: 'kJ/mol',
  paths: [
    { name: 'Direct', steps: [{ label: 'CO2(g)', delta: -393.5, deltaLabel: 'ΔH = −393.5 kJ/mol' }] },
    { name: 'Via CO(g)', steps: [
      { label: 'CO(g) + ½O2(g)', delta: -110.5, deltaLabel: 'ΔH1 = −110.5 kJ/mol' },
      { label: 'CO2(g)', delta: -283.0, deltaLabel: 'ΔH2 = −283.0 kJ/mol' },
    ] },
  ],
}

const BORN_HABER: EnergyCycleParams = {
  title: 'Born–Haber Cycle: Formation of NaCl',
  startLabel: 'Na(s) + ½Cl2(g)',
  unit: 'kJ/mol',
  paths: [
    { name: 'Direct', steps: [{ label: 'NaCl(s)', delta: -411, deltaLabel: 'ΔHf° = −411 kJ/mol' }] },
    { name: 'Via ions', steps: [
      { label: 'Na(g) + ½Cl2(g)', delta: 107, deltaLabel: 'sublimation ΔHsub = +107' },
      { label: 'Na+(g) + e− + ½Cl2(g)', delta: 496, deltaLabel: 'ionization IE = +496' },
      { label: 'Na+(g) + e− + Cl(g)', delta: 122, deltaLabel: 'dissociation ½ΔHdiss = +122' },
      { label: 'Na+(g) + Cl−(g)', delta: -349, deltaLabel: 'electron affinity EA = −349' },
      { label: 'NaCl(s)', delta: -787, deltaLabel: 'lattice energy U = −787' },
    ] },
  ],
}

describe('validation', () => {
  it('accepts a well-formed cycle', () => {
    expect(validateEnergyCycleParams(HESS)).toEqual(HESS)
  })

  it.each([
    { ...HESS, paths: [] },
    { ...HESS, title: '' },
    { ...HESS, paths: [{ name: 'X', steps: [] }] },
    null,
    {},
  ])('rejects an invalid parameter set %#', (bad) => {
    expect(validateEnergyCycleParams(bad)).toBeNull()
  })
})

describe("Hess's Law — every path totals the same ΔH, verified against real data", () => {
  it('the carbon combustion example: −110.5 + −283.0 = −393.5, matching the direct value exactly', () => {
    const paths = derivePaths(HESS)
    expect(paths[0].total).toBeCloseTo(-393.5, 6)
    expect(paths[1].total).toBeCloseTo(-393.5, 6)
    expect(paths[0].total).toBeCloseTo(paths[1].total, 9)
  })

  it('the Born–Haber cycle for NaCl: the five-step sum equals the direct enthalpy of formation', () => {
    const paths = derivePaths(BORN_HABER)
    // 107 + 496 + 122 − 349 − 787 = −411
    expect(paths[1].total).toBeCloseTo(-411, 6)
    expect(paths[0].total).toBeCloseTo(paths[1].total, 9)
  })

  it('the consistency checker PASSES real, physically correct thermochemical data', () => {
    expect(checkEnergyCycleConsistency(buildEnergyCycleScene(HESS), HESS)).toEqual({ ok: true, errors: [] })
    expect(checkEnergyCycleConsistency(buildEnergyCycleScene(BORN_HABER), BORN_HABER)).toEqual({ ok: true, errors: [] })
  })

  it('negative control: the consistency checker FAILS a data set that violates Hess\'s Law', () => {
    const bad: EnergyCycleParams = {
      title: 'Physically wrong cycle', startLabel: 'A', unit: 'kJ/mol',
      paths: [
        { name: 'Direct', steps: [{ label: 'Z', delta: -100, deltaLabel: 'd1' }] },
        { name: 'Indirect', steps: [{ label: 'Y', delta: -50, deltaLabel: 'd2' }, { label: 'Z', delta: -60, deltaLabel: 'd3' }] },
      ],
    }
    const check = checkEnergyCycleConsistency(buildEnergyCycleScene(bad), bad)
    expect(check.ok).toBe(false)
    expect(check.errors[0]).toMatch(/do not converge/)
  })
})

describe('Crystal Field Theory splitting — a single-path, single-gap diagram', () => {
  const CFT: EnergyCycleParams = {
    title: 'Crystal Field Splitting: [Ti(H2O)6]3+',
    startLabel: 't2g (lower set)',
    unit: 'Δo units',
    paths: [{ name: 'Splitting', steps: [{ label: 'eg (upper set)', delta: 1, deltaLabel: 'Δo (octahedral splitting)' }] }],
    occupancy: [{ levelLabel: 't2g (lower set)', dots: 1 }, { levelLabel: 'eg (upper set)', dots: 0 }],
  }

  it('draws exactly one occupancy dot at the lower (t2g) level for a d1 configuration', () => {
    const scene = buildEnergyCycleScene(CFT)
    const dots = scene.steps.flatMap((s) => s.objects).filter((o) => o.type === 'node')
    expect(dots.length).toBe(1)
  })

  it('builds a structurally valid, self-consistent scene with no convergence claim (only one path)', () => {
    const scene = buildEnergyCycleScene(CFT)
    expect(validateSceneSpec(scene).errors).toEqual([])
    expect(checkEnergyCycleConsistency(scene, CFT)).toEqual({ ok: true, errors: [] })
  })
})

describe('structural validity', () => {
  it.each([HESS, BORN_HABER])('builds a structurally valid scene', (params) => {
    expect(validateSceneSpec(buildEnergyCycleScene(params)).errors).toEqual([])
  })
})

describe('registry integration — the concepts genuinely reach this generator', () => {
  const concepts = ['chem.thermo.enthalpy', 'chem.thermo.bond-enthalpy', 'chem.coord.cft']

  it.each(concepts)('%s resolves to a valid canonical scene', (conceptId) => {
    const scene = buildCanonicalScene(null, conceptId)
    expect(scene, conceptId).not.toBeNull()
    expect(validateSceneSpec(scene!).errors, conceptId).toEqual([])
  })

  it.each(concepts)('%s reaches resolveVisual() as a graphical, registry-sourced figure', (conceptId) => {
    const decision = resolveVisual({ message: 'can you show me a diagram?', lessonConceptId: conceptId, learnerRequest: 'diagram' })
    expect(decision.graphical, conceptId).toBe(true)
    expect(decision.source, conceptId).toBe('registry')
  })
})
