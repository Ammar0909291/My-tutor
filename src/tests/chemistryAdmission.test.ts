/**
 * Chemistry figures face the deterministic chemistry validators at the ONE admission
 * gate (`admitVisualAsset`), whatever tier built them — so a generated figure meets
 * the same bar as an authored one, and a figure the client would silently drop, or
 * one whose own text contradicts its own chemistry, never reaches a learner or the
 * tutor contract (2026-10-08 Chemistry Visual Quality audit, Phase 5 / 8).
 *
 * The other half of the contract matters as much: the gate must NOT blank figures
 * that merely carry reference data it cannot verify (REVIEW_REQUIRED).
 */

import { describe, expect, it } from 'vitest'
import { admitVisualAsset, makeVisualAsset, type VisualIntent } from '@/lib/teaching/visual/asset'
import { chemistryAdmissionFailure } from '@/lib/teaching/visual/chemistryAdmission'
import { auditChemistryPayload, auditChemistryScene } from '@/lib/teaching/visual/chemistryFigureAudit.pure'
import { typesetSceneChemistry } from '@/lib/teaching/visual/typesetSceneChemistry'
import { buildCanonicalScene, CONCEPT_SCENE_OVERRIDES } from '@/lib/teaching/visual/conceptSceneParams'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { buildElectrochemicalCellScene } from '@/lib/teaching/sceneGenerators/electrochemicalCell'
import { getAllNodes, getKnowledgeGraph } from '@/lib/curriculum/knowledgeGraph'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'

const intent = (conceptId: string): VisualIntent => ({ conceptId, conceptTitle: 'T', purpose: 'explain', excursion: false, returnToConceptId: null })

function sceneAsset(conceptId: string, scene: SceneSpec) {
  return makeVisualAsset({
    assetId: `test:${conceptId}`, conceptId, conceptTitle: 'T', representation: 'labelled_figure',
    payload: { renderer: 'scene', sceneSpec: scene }, provenance: 'engine',
  })
}

const cell = (overrides: Partial<Parameters<typeof buildElectrochemicalCellScene>[0]> = {}): SceneSpec => buildElectrochemicalCellScene({
  cellType: 'electrolytic',
  anode: { material: 'C (graphite)', ion: 'Cl-' },
  cathode: { material: 'Fe (steel)', ion: 'Na+' },
  electronsTransferred: 2,
  externalVoltage: 4,
  name: 'Electrolysis of Molten NaCl',
  medium: 'molten',
  ...overrides,
})

describe('a chemistry figure with a deterministic FAIL is refused', () => {
  it('a molten-salt cell labelled "in solution" (CVD: chem.elect.electrolysis, pre-fix) is rejected', () => {
    // The pre-fix figure: no `medium`, so the builder wrote "Na+ in solution" on a melt.
    const bad = cell({ medium: undefined })
    const result = admitVisualAsset(intent('chem.elect.electrolysis'), sceneAsset('chem.elect.electrolysis', bad))
    expect(result.ok).toBe(false)
    if (result.ok) throw new Error('unreachable')
    expect(result.reason).toBe('chemistry-validation-failed')
    expect(result.detail).toMatch(/E-ELEC-SOLUTION-FOR-MOLTEN/)
  })

  it('the corrected figure ("in the melt") is admitted', () => {
    const result = admitVisualAsset(intent('chem.elect.electrolysis'), sceneAsset('chem.elect.electrolysis', cell()))
    expect(result.ok).toBe(true)
  })

  it('a non-finite coordinate is refused (the client would drop the payload; the tutor must not be told it exists)', () => {
    const scene = cell()
    scene.steps[1].objects[0] = { ...scene.steps[1].objects[0], position: [Number.NaN, 0, 0] }
    const result = admitVisualAsset(intent('chem.elect.electrolysis'), sceneAsset('chem.elect.electrolysis', scene))
    expect(result.ok).toBe(false)
  })

  it('a spec payload (generated graph/flow) is checked too', () => {
    const asset = makeVisualAsset({
      assetId: 'generated:chem.kinet.rate-law', conceptId: 'chem.kinet.rate-law', conceptTitle: 'T', representation: 'process_flow',
      payload: { renderer: 'spec', visualSpec: { type: 'process_flow', title: 'Steps', steps: [{ title: 'chem.kinet.rate-law' }, { title: 'second' }] } as never },
      provenance: 'engine',
    })
    // A raw internal concept id in a step label is a structural FAIL.
    expect(chemistryAdmissionFailure('chem.kinet.rate-law', asset.payload)).toMatch(/A-RAW-ID/)
  })
})

describe('the gate blocks only what is deterministically wrong', () => {
  it('REVIEW_REQUIRED does not block: a card, and a scene full of unverifiable reference data', () => {
    const card = makeVisualAsset({
      assetId: 'registry:chem.atomic.bohr-model:three_atomic_structure', conceptId: 'chem.atomic.bohr-model', conceptTitle: 'T',
      representation: 'atom_model' as never, payload: { renderer: 'card', visualType: 'three_atomic_structure' }, provenance: 'curated',
    })
    expect(admitVisualAsset(intent('chem.atomic.bohr-model'), card).ok).toBe(true)

    const daniell = buildElectrochemicalCellScene({
      cellType: 'galvanic',
      anode: { material: 'Zn', ion: 'Zn2+', standardPotential: -0.76 },
      cathode: { material: 'Cu', ion: 'Cu2+', standardPotential: 0.34 },
      electronsTransferred: 2, name: 'Daniell Cell',
    })
    expect(auditChemistryPayload({ renderer: 'scene', sceneSpec: daniell }).verdict).toBe('REVIEW_REQUIRED')
    expect(admitVisualAsset(intent('chem.elect.galvanic-cell'), sceneAsset('chem.elect.galvanic-cell', daniell)).ok).toBe(true)
  })

  it('is chemistry-only: the same defective payload under a non-chemistry concept is untouched', () => {
    const bad = cell({ medium: undefined })
    expect(chemistryAdmissionFailure('phys.elect.circuits', { renderer: 'scene', sceneSpec: bad })).toBeNull()
  })

  it('never throws, whatever it is handed', () => {
    for (const junk of [{}, { title: 1 }, { steps: 'x' }, { steps: [null] }, { steps: [{ objects: [null, 3, { text: {} }] }] }]) {
      expect(() => chemistryAdmissionFailure('chem.x.y', { renderer: 'scene', sceneSpec: junk as never })).not.toThrow()
    }
  })
})

describe('no chemistry figure the resolver serves today is blanked by the gate', () => {
  const concepts = getAllNodes(getKnowledgeGraph('chemistry'))
  const decisions = concepts.map((n) => ({ id: n.id, d: resolveVisual({ message: '', lessonConceptId: n.id, subject: 'chemistry' }) }))

  // 51 -> 53 (2026-10-07): chem.found.matter (CHEM-013) and chem.bond.ionic-bonding (CHEM-095)
  // gained curated figures; both pass this gate (nothing rejected).
  it('still serves the same 53 concepts a figure (nothing rejected:chemistry-validation-failed)', () => {
    const rejected = decisions.filter((x) => String(x.d.reason ?? '').includes('chemistry-validation-failed')).map((x) => x.id)
    expect(rejected).toEqual([])
    expect(decisions.filter((x) => x.d.graphical).length).toBe(53)
  })

  it('every served chemistry scene audits without a single FAIL finding', () => {
    for (const { id, d } of decisions) {
      if (!d.payload) continue
      const r = auditChemistryPayload(d.payload as never)
      expect(r.findings.filter((f) => f.severity === 'FAIL'), id).toEqual([])
    }
  })
})

describe('the audit is notation-neutral (typeset figures are verified as strictly as ASCII ones)', () => {
  // The family verifiers read labels with ASCII regexes. Figures are served typeset, so a verifier that
  // stopped matching `NH₃` / `Co³⁺` would silently become a no-op (or count 0 ligands and falsely FAIL —
  // which is exactly what blanked the three hexaammine concepts the first time this gate ran).
  const chemOwned = CONCEPT_SCENE_OVERRIDES.filter((id) => id.startsWith('chem.'))

  it('finds the concept-authored chemistry scenes (guards the enumeration)', () => {
    expect(chemOwned.length).toBeGreaterThanOrEqual(25)
  })

  for (const id of chemOwned) {
    it(`${id}: same verdict, same verified claims, same FAILs before and after typesetting`, () => {
      const raw = buildCanonicalScene(null, id)
      expect(raw, id).not.toBeNull()
      const typeset = typesetSceneChemistry(raw!)
      const a = auditChemistryScene(raw!)
      const b = auditChemistryScene(typeset)
      expect(b.verdict).toBe(a.verdict)
      expect([...b.verified].sort()).toEqual([...a.verified].sort())
      expect(b.findings.filter((f) => f.severity === 'FAIL').map((f) => f.code)).toEqual(a.findings.filter((f) => f.severity === 'FAIL').map((f) => f.code))
    })
  }
})
