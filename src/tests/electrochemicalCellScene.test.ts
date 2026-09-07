/**
 * Electrochemical cell generator — Chemistry Visual Coverage programme.
 *
 * Covers chem.elect.galvanic-cell / standard-electrode / nernst /
 * concentration-cell / electrolysis / industrial / batteries, plus
 * chem.thermo.cell-thermo. Verifies the electrochemistry (E°cell, the Nernst
 * correction, spontaneity, ΔG = −nFE) against independently computed values,
 * not just that a scene was produced.
 */
import { describe, expect, it } from 'vitest'
import {
  buildElectrochemicalCellScene, checkElectrochemicalCellConsistency, deriveCell,
  validateElectrochemicalCellParams, type ElectrochemicalCellParams,
} from '@/lib/teaching/sceneGenerators/electrochemicalCell'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { buildCanonicalScene } from '@/lib/teaching/visual/conceptSceneParams'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'

const DANIELL: ElectrochemicalCellParams = {
  cellType: 'galvanic',
  anode: { material: 'Zn', ion: 'Zn2+', standardPotential: -0.76 },
  cathode: { material: 'Cu', ion: 'Cu2+', standardPotential: 0.34 },
  electronsTransferred: 2,
  name: 'Daniell Cell',
}

describe('validation', () => {
  it('accepts a well-formed galvanic cell', () => {
    expect(validateElectrochemicalCellParams(DANIELL)).toEqual({
      ...DANIELL, temperature: 298, externalVoltage: undefined, divided: undefined,
    })
  })

  it.each([
    { ...DANIELL, cellType: 'battery' },
    { ...DANIELL, electronsTransferred: 0 },
    { ...DANIELL, anode: { material: '', ion: 'Zn2+' } },
    { ...DANIELL, name: '' },
    null,
    {},
  ])('rejects an invalid parameter set %#', (bad) => {
    expect(validateElectrochemicalCellParams(bad)).toBeNull()
  })
})

describe('E°cell = E°cathode − E°anode, and ΔG = −nFE', () => {
  it('the Daniell cell: E°cell = +1.10 V, spontaneous, matches the textbook value', () => {
    const d = deriveCell(DANIELL)
    expect(d.standardEmf).toBeCloseTo(1.1, 3)
    expect(d.cellEmf).toBeCloseTo(1.1, 3)
    expect(d.spontaneous).toBe(true)
    // ΔG = −nFE = −2 × 96485 × 1.10 J/mol ≈ −212.27 kJ/mol
    expect(d.deltaGkJ).toBeCloseTo(-212.27, 1)
  })

  it('a cell with a negative E°cell is correctly reported non-spontaneous', () => {
    const reversed: ElectrochemicalCellParams = {
      ...DANIELL,
      anode: DANIELL.cathode,
      cathode: DANIELL.anode,
      name: 'Reversed (non-spontaneous)',
    }
    const d = deriveCell(reversed)
    expect(d.standardEmf).toBeCloseTo(-1.1, 3)
    expect(d.spontaneous).toBe(false)
    expect(d.deltaGkJ).toBeGreaterThan(0)
  })

  it('an electrolytic cell with no standard potentials reports null EMF, not a fabricated one', () => {
    const electrolysis: ElectrochemicalCellParams = {
      cellType: 'electrolytic',
      anode: { material: 'C', ion: 'Cl-' },
      cathode: { material: 'Fe', ion: 'Na+' },
      electronsTransferred: 2,
      externalVoltage: 4,
      name: 'Electrolysis of Molten NaCl',
    }
    const d = deriveCell(electrolysis)
    expect(d.standardEmf).toBeNull()
    expect(d.cellEmf).toBeNull()
    expect(d.spontaneous).toBeNull()
    expect(d.deltaGkJ).toBeNull()
  })
})

describe('the Nernst correction — concentration genuinely moves the EMF', () => {
  it('the Daniell cell at non-standard concentrations shifts EMF away from standard', () => {
    const nernst: ElectrochemicalCellParams = {
      ...DANIELL,
      anode: { ...DANIELL.anode, concentration: 1.0 },
      cathode: { ...DANIELL.cathode, concentration: 0.01 },
    }
    const d = deriveCell(nernst)
    expect(d.cellEmf).not.toBeCloseTo(1.1, 2)
    // Lowering the cathode's own ion concentration REDUCES the EMF below standard.
    expect(d.cellEmf!).toBeLessThan(d.standardEmf!)
  })

  it('a concentration cell has E° = 0 but a genuine, non-zero, spontaneous EMF', () => {
    const concCell: ElectrochemicalCellParams = {
      cellType: 'galvanic',
      anode: { material: 'Cu', ion: 'Cu2+', standardPotential: 0.34, concentration: 0.001 },
      cathode: { material: 'Cu', ion: 'Cu2+', standardPotential: 0.34, concentration: 1.0 },
      electronsTransferred: 2,
      name: 'Copper Concentration Cell',
    }
    const d = deriveCell(concCell)
    expect(d.standardEmf).toBe(0)
    expect(d.cellEmf).toBeGreaterThan(0)
    expect(d.spontaneous).toBe(true)
  })
})

describe('structural validity and the safety-net checker', () => {
  it('builds a structurally valid scene for the canonical galvanic case', () => {
    const scene = buildElectrochemicalCellScene(DANIELL)
    expect(validateSceneSpec(scene).errors).toEqual([])
  })

  it('the independent re-derivation agrees with the built scene', () => {
    expect(checkElectrochemicalCellConsistency(buildElectrochemicalCellScene(DANIELL), DANIELL)).toEqual({ ok: true, errors: [] })
  })

  it('catches a scene whose printed EMF disagrees with the derived value', () => {
    const scene = buildElectrochemicalCellScene(DANIELL)
    const tampered = {
      ...scene,
      steps: scene.steps.map((s) => ({ ...s, objects: s.objects.map((o) => (o.text ?? '').includes('spontaneous') ? { ...o, text: 'E = +9.99 V, spontaneous' } : o) })),
    }
    expect(checkElectrochemicalCellConsistency(tampered, DANIELL).ok).toBe(false)
  })

  it('electron flow always runs from the anode side toward the cathode side, for both cell types', () => {
    for (const cellType of ['galvanic', 'electrolytic'] as const) {
      const params: ElectrochemicalCellParams = { ...DANIELL, cellType, externalVoltage: cellType === 'electrolytic' ? 4 : undefined }
      const check = checkElectrochemicalCellConsistency(buildElectrochemicalCellScene(params), params)
      expect(check.ok, cellType).toBe(true)
    }
  })
})

describe('container topology — a divided cell only when the science needs one', () => {
  it('a galvanic cell defaults to a divided (salt-bridge) layout', () => {
    const scene = buildElectrochemicalCellScene(DANIELL)
    const text = scene.steps.flatMap((s) => s.objects.map((o) => o.text ?? '')).join(' ')
    expect(text).toContain('salt bridge')
  })

  it('an electrolytic cell defaults to one undivided electrolyte', () => {
    const scene = buildElectrochemicalCellScene({
      cellType: 'electrolytic', anode: { material: 'Pt', ion: 'Cl-' }, cathode: { material: 'Pt', ion: 'Na+' },
      electronsTransferred: 2, name: 'Electrolysis',
    })
    const text = scene.steps.flatMap((s) => s.objects.map((o) => o.text ?? '')).join(' ')
    expect(text).not.toContain('salt bridge')
  })

  it('a galvanic cell can be overridden to an undivided layout for a real single-electrolyte battery', () => {
    const scene = buildElectrochemicalCellScene({ ...DANIELL, divided: false, name: 'Dry Cell' })
    const text = scene.steps.flatMap((s) => s.objects.map((o) => o.text ?? '')).join(' ')
    expect(text).not.toContain('salt bridge')
  })
})

describe('registry integration — the concepts genuinely reach this generator', () => {
  const concepts = [
    'chem.elect.galvanic-cell', 'chem.elect.standard-electrode', 'chem.elect.nernst',
    'chem.elect.concentration-cell', 'chem.elect.electrolysis', 'chem.elect.industrial',
    'chem.elect.batteries', 'chem.thermo.cell-thermo',
  ]

  it.each(concepts)('%s resolves to a valid, structurally sound canonical scene', (conceptId) => {
    const scene = buildCanonicalScene(null, conceptId)
    expect(scene, conceptId).not.toBeNull()
    expect(validateSceneSpec(scene!).errors, conceptId).toEqual([])
  })

  it.each(concepts)('%s reaches resolveVisual() as a graphical, registry-sourced figure', (conceptId) => {
    const decision = resolveVisual({ message: 'can you show me a diagram?', lessonConceptId: conceptId, learnerRequest: 'diagram' })
    expect(decision.graphical, conceptId).toBe(true)
    expect(decision.source, conceptId).toBe('registry')
  })

  it('the cathode/cell-thermo instance actually states ΔG (the concept it teaches)', () => {
    const scene = buildCanonicalScene(null, 'chem.thermo.cell-thermo')!
    const text = scene.steps.flatMap((s) => s.objects.map((o) => o.text ?? '')).join(' ')
    expect(text).toContain('ΔG')
  })
})
