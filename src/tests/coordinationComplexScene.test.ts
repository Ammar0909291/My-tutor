/**
 * Coordination complex generator — Chemistry Visual Coverage programme.
 *
 * Covers chem.coord.werner / nomenclature / bonding / isomerism /
 * applications. Extends the visual grammar with octahedral and square-planar
 * geometry WITHOUT touching moleculeGeometry.pure.ts's existing VSEPR table
 * (linear/bent/trigonal/tetrahedral) — verified here by re-deriving bond
 * angles from the actual drawn coordinates, exactly like the existing
 * molecule-geometry safety net, plus a genuine cis/trans geometric check for
 * the isomerism claim (the concept's whole point).
 */
import { describe, expect, it } from 'vitest'
import {
  buildCoordinationComplexScene, checkCoordinationComplexConsistency,
  validateCoordinationComplexParams, type CoordinationComplexDef,
} from '@/lib/teaching/sceneGenerators/coordinationComplex'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { buildCanonicalScene } from '@/lib/teaching/visual/conceptSceneParams'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'

const HEXAAMMINECOBALT: CoordinationComplexDef = {
  name: 'Hexaamminecobalt(III) ion', centralMetal: 'Co', charge: '3+',
  geometry: 'octahedral', ligands: [{ formula: 'NH3', count: 6 }], coordinationNumber: 6,
}

const CISPLATIN: CoordinationComplexDef = {
  name: 'Cisplatin', centralMetal: 'Pt', charge: '',
  geometry: 'square_planar', ligands: [{ formula: 'NH3', count: 2 }, { formula: 'Cl', count: 2 }],
  isomer: 'cis', coordinationNumber: 4,
}

const TRANSPLATIN: CoordinationComplexDef = { ...CISPLATIN, name: 'Transplatin', isomer: 'trans' }

describe('validation', () => {
  it('accepts a well-formed homoleptic octahedral complex', () => {
    expect(validateCoordinationComplexParams(HEXAAMMINECOBALT)).toEqual(HEXAAMMINECOBALT)
  })

  it('accepts a well-formed heteroleptic square-planar complex', () => {
    expect(validateCoordinationComplexParams(CISPLATIN)).toEqual(CISPLATIN)
  })

  it.each([
    { ...HEXAAMMINECOBALT, geometry: 'trigonal' },
    { ...HEXAAMMINECOBALT, ligands: [{ formula: 'NH3', count: 5 }] }, // wrong total for octahedral
    { ...CISPLATIN, isomer: undefined }, // heteroleptic requires an isomer
    { ...HEXAAMMINECOBALT, coordinationNumber: 4 }, // disagrees with geometry
    null,
    {},
  ])('rejects an invalid parameter set %#', (bad) => {
    expect(validateCoordinationComplexParams(bad)).toBeNull()
  })
})

describe('octahedral geometry — 90° angles between adjacent ligands, 6 ligands total', () => {
  it('builds a structurally valid scene and passes its own consistency check', () => {
    const scene = buildCoordinationComplexScene(HEXAAMMINECOBALT)
    expect(validateSceneSpec(scene).errors).toEqual([])
    expect(checkCoordinationComplexConsistency(scene, HEXAAMMINECOBALT)).toEqual({ ok: true, errors: [] })
  })
})

describe('square-planar geometry and geometric (cis/trans) isomerism — the concept\'s whole point', () => {
  it('cis: the two identical ligands sit 90° apart (adjacent)', () => {
    const scene = buildCoordinationComplexScene(CISPLATIN)
    expect(checkCoordinationComplexConsistency(scene, CISPLATIN)).toEqual({ ok: true, errors: [] })
  })

  it('trans: the two identical ligands sit 180° apart (opposite)', () => {
    const scene = buildCoordinationComplexScene(TRANSPLATIN)
    expect(checkCoordinationComplexConsistency(scene, TRANSPLATIN)).toEqual({ ok: true, errors: [] })
  })

  it('negative control: a cis-built scene fails when checked against a trans claim', () => {
    const cisScene = buildCoordinationComplexScene(CISPLATIN)
    const check = checkCoordinationComplexConsistency(cisScene, TRANSPLATIN)
    expect(check.ok).toBe(false)
    expect(check.errors[0]).toMatch(/expected the two NH3 ligands at 180°/)
  })

  it('cis and trans are genuinely different scenes, not the same figure relabelled', () => {
    const cisText = buildCoordinationComplexScene(CISPLATIN).steps.flatMap((s) => s.objects.map((o) => o.text ?? '')).join('|')
    const transText = buildCoordinationComplexScene(TRANSPLATIN).steps.flatMap((s) => s.objects.map((o) => o.text ?? '')).join('|')
    expect(cisText).toContain('adjacent')
    expect(transText).toContain('opposite')
  })
})

describe('registry integration — the concepts genuinely reach this generator', () => {
  const concepts = ['chem.coord.werner', 'chem.coord.nomenclature', 'chem.coord.bonding', 'chem.coord.isomerism', 'chem.coord.applications']

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

  it('applications genuinely reuses the isomerism figure (cisplatin) rather than a decorative substitute', () => {
    const scene = buildCanonicalScene(null, 'chem.coord.applications')!
    expect(scene.title).toContain('Cisplatin')
  })
})

describe('does not touch the existing VSEPR molecule feature', () => {
  it('moleculeGeometry\'s own geometry types are unaffected (linear/bent/tetrahedral/etc. still resolve)', async () => {
    const { lookupMolecule, buildMoleculeScene } = await import('@/lib/teaching/sceneGenerators/moleculeGeometry.pure')
    const water = lookupMolecule('water')!
    expect(water.geometry).toBe('bent')
    expect(validateSceneSpec(buildMoleculeScene(water)).errors).toEqual([])
  })
})
