/**
 * Chemistry Visual Coverage programme — full-domain audit.
 *
 * A single regression guard over all 25 concepts across chem.thermo,
 * chem.coord and chem.elect: the 20 concepts this programme covers must
 * genuinely reach resolveVisual() as a graphical figure, and the 5
 * deliberately deferred concepts must continue to return an honest
 * "no figure" decision rather than a wrong or decorative one being added
 * later without this test being updated to acknowledge it.
 *
 * If this test ever needs to move a concept between the two lists, that is
 * the signal that the coverage matrix in the task's final report is stale
 * and must be updated alongside the code change.
 */
import { describe, expect, it } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { buildCanonicalScene, CONCEPT_SCENE_OVERRIDES } from '@/lib/teaching/visual/conceptSceneParams'

const COVERED = [
  // Archetype A — electrochemical cell
  'chem.elect.galvanic-cell', 'chem.elect.standard-electrode', 'chem.elect.nernst',
  'chem.elect.concentration-cell', 'chem.elect.electrolysis', 'chem.elect.industrial',
  'chem.elect.batteries', 'chem.thermo.cell-thermo',
  // Archetype B — energy cycle
  'chem.thermo.enthalpy', 'chem.thermo.bond-enthalpy', 'chem.coord.cft',
  // Archetype D — coordination geometry
  'chem.coord.werner', 'chem.coord.nomenclature', 'chem.coord.bonding',
  'chem.coord.isomerism', 'chem.coord.applications',
  // Archetype E — reused statistics_bar_chart
  'chem.coord.stability', 'chem.thermo.heat-capacities',
  // Archetype C — system/energy-balance
  'chem.thermo.system', 'chem.thermo.first-law',
]

const DEFERRED = [
  'chem.elect.conductance',
  'chem.elect.corrosion',
  'chem.thermo.entropy',
  'chem.thermo.gibbs',
  'chem.thermo.third-law',
]

describe('the coverage matrix is exactly 20 covered + 5 deferred = all 25 domain concepts', () => {
  it('no concept appears in both lists, and no domain concept is missing from either', () => {
    const all = [...COVERED, ...DEFERRED]
    expect(new Set(all).size).toBe(25)
    expect(all.filter((c) => c.startsWith('chem.thermo.')).length).toBe(9)
    expect(all.filter((c) => c.startsWith('chem.coord.')).length).toBe(7)
    expect(all.filter((c) => c.startsWith('chem.elect.')).length).toBe(9)
  })
})

describe('every covered concept reaches a real, structurally valid, learner-visible figure', () => {
  it.each(COVERED)('%s', (conceptId) => {
    expect(CONCEPT_SCENE_OVERRIDES, conceptId).toContain(conceptId)
    const scene = buildCanonicalScene(null, conceptId)
    expect(scene, conceptId).not.toBeNull()
    expect(validateSceneSpec(scene!).errors, conceptId).toEqual([])

    const decision = resolveVisual({ message: 'can you show me a diagram?', lessonConceptId: conceptId, learnerRequest: 'diagram' })
    expect(decision.graphical, conceptId).toBe(true)
    expect(decision.source, conceptId).toBe('registry')
    expect(decision.payload, conceptId).not.toBeNull()
  })
})

describe('every deferred concept honestly returns NO FIGURE — never a substitute, never a stretch', () => {
  it.each(DEFERRED)('%s', (conceptId) => {
    expect(CONCEPT_SCENE_OVERRIDES, conceptId).not.toContain(conceptId)
    const decision = resolveVisual({ message: 'can you show me a diagram?', lessonConceptId: conceptId, learnerRequest: 'diagram' })
    expect(decision.graphical, conceptId).toBe(false)
    expect(decision.payload, conceptId).toBeNull()
    expect(decision.source, conceptId).toBe('none')
  })
})
