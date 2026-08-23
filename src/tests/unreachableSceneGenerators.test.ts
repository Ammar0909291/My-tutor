/**
 * Authored scene generators that no learner could reach.
 *
 * The premise "20 orphan keys with scene generators = 20 pieces of unreachable
 * content" was WRONG, and measuring it is what produced the real number. Of the
 * eleven generators named by orphan keys, five were already wired to real
 * concepts elsewhere (cell_division via bio.cell.mitosis/meiosis, dna_structure
 * via bio.mol.dna-replication, coordinate_geometry_line via
 * math.geom.distance-formula, plus triangle and vector) — their orphan rows
 * were redundant duplicates, not lost content.
 *
 * SIX generators were genuinely unreachable: every key naming them was an
 * orphan, so the scene existed, worked, and was never served to anybody.
 * Five are wired here. The sixth is not, and that is deliberate — see below.
 */
import { describe, it, expect } from 'vitest'
import { getConceptSceneGenerator, getConceptVisualType } from '@/lib/teaching/visualRegistry'
import { buildCanonicalScene, CONCEPT_SCENE_OVERRIDES } from '@/lib/teaching/visual/conceptSceneParams'
import { INSUFFICIENT_FOR_CONCEPT } from '@/lib/teaching/visual/scope'

/** concept -> the generator it must now reach. */
const WIRED: Array<[string, string]> = [
  ['bio.gen.mendelian-genetics', 'punnett_square'],
  ['bio.eco.ecosystem-structure-function', 'ecological_pyramid'],
  ['math.stats.data-visualization', 'statistics_bar_chart'],
  ['math.calc.critical-points', 'calculus_graph'],
  ['cs.db.er-modeling', 'er_diagram'],
]

describe('previously unreachable generators now serve a real concept', () => {
  it.each(WIRED)('%s reaches %s', (conceptId, kind) => {
    expect(getConceptSceneGenerator(conceptId)).toBe(kind)
  })

  it.each(WIRED)('%s actually produces a scene, not just a binding', (conceptId) => {
    // The binding is worthless if buildCanonicalScene returns null: the learner
    // would fall through to the static card instead. Asserted per concept
    // because that fallback is exactly what makes a wrong `primary` dangerous.
    const scene = buildCanonicalScene(getConceptSceneGenerator(conceptId) as never, conceptId)
    expect(scene, conceptId).not.toBeNull()
  })

  it('critical-points is PROMOTED — it owns a figure better than the default', () => {
    // Earned, not declared: the shared default is a parabola with ONE critical
    // point; this concept owns a cubic with a maximum AND a minimum, so the
    // figure teaches the concept better than the kind default does.
    expect(CONCEPT_SCENE_OVERRIDES.includes('math.calc.critical-points')).toBe(true)
    expect(INSUFFICIENT_FOR_CONCEPT.has('math.calc.critical-points')).toBe(false)
  })

  it('and the promoted figure really does show TWO critical points', () => {
    // The whole basis of the promotion. If a future edit reverts the
    // parameters to the one-critical-point default, the claim is no longer
    // earned and this fails.
    const own = buildCanonicalScene('calculus_graph' as never, 'math.calc.critical-points') as unknown as { title?: string } | null
    const shared = buildCanonicalScene('calculus_graph' as never, 'some.other.concept') as unknown as { title?: string } | null
    expect(own?.title).toMatch(/2 critical points/)
    expect(shared?.title).toMatch(/1 critical point/)
  })

  it('the other four stay DEMOTED — provenance decides, not resemblance', () => {
    // Three of them arguably DO depict their concept (a Punnett square is a
    // Mendelian cross; an ER diagram is entity-relationship modelling; the
    // calculus scene marks the critical points). They are demoted anyway,
    // because none authors its own parameters in CONCEPT_SCENES: each is
    // served that generator KIND's ONE shared canonical instance, so its
    // identity is widened from something shared rather than declared for it.
    // visualGeneratorDefaultScope.test.ts exists to stop that set growing, and
    // its rule is that it may only ever shrink.
    for (const [id] of WIRED) {
      if (id === 'math.calc.critical-points') continue
      expect(INSUFFICIENT_FOR_CONCEPT.has(id), id).toBe(true)
    }
  })

  it('demoted means the figure still RENDERS — the claim is what is withdrawn', () => {
    // Under-claiming is the safe direction; withholding would throw away the
    // upgrade these concepts just gained over a generic default or nothing.
    for (const [id] of WIRED) {
      expect(getConceptVisualType(id), id).not.toBeNull()
    }
  })

  it('the four that stay demoted genuinely own no concept parameters', () => {
    // Which is exactly why they are demoted — they borrow the generator kind's
    // one shared instance. cs.db.er-modeling is the interesting case: its kind
    // default already depicts the concept, so authoring identical parameters
    // would change provenance without changing the figure. That is declaring
    // scope, not earning it.
    for (const [id] of WIRED) {
      if (id === 'math.calc.critical-points') continue
      expect(CONCEPT_SCENE_OVERRIDES.includes(id), id).toBe(false)
    }
  })

  it('the generators that were ALREADY reachable were not disturbed', () => {
    // The five whose orphan rows were duplicates. If a future cleanup deletes
    // the real row instead of the duplicate, this fails.
    expect(getConceptSceneGenerator('bio.cell.mitosis')).toBe('cell_division')
    expect(getConceptSceneGenerator('bio.cell.meiosis')).toBe('cell_division')
    expect(getConceptSceneGenerator('bio.mol.dna-replication')).toBe('dna_structure')
    expect(getConceptSceneGenerator('math.geom.distance-formula')).toBe('coordinate_geometry_line')
  })
})

describe('a generator with no concept to attach to is left alone', () => {
  it('heights_and_distances stays unwired — the KG has no such concept', () => {
    // It renders "Heights & Distances: distance=…, angle of elevation=…", an
    // APPLIED trigonometry figure. math.trig contains only pure trigonometry
    // (ratios, identities, laws of sines/cosines) and no heights-and-distances
    // concept exists in any KG. Inventing curriculum to retire an orphan is
    // exactly the wrong trade, so this one stays on the backlog.
    expect(getConceptSceneGenerator('math.geom.heights-distances')).toBe('heights_and_distances')
    expect(getConceptVisualType('math.trig.basic-ratios')).toBe('geometry_shape')
  })
})

describe('rejected mappings stay rejected', () => {
  it('measures-of-center does NOT get the frequency-distribution chart', () => {
    // A frequency distribution draws no mean, median or mode, so it cannot
    // claim to depict them. It went to data-visualization instead.
    expect(getConceptSceneGenerator('math.stats.measures-of-center')).toBeNull()
  })

  it('the relational model does NOT get the ER diagram', () => {
    // The relational model is tables and keys; an ER diagram is entities and
    // relationships. Adjacent, not the same.
    expect(getConceptSceneGenerator('cs.db.relational-model')).toBeNull()
  })
})

// ── Phase 5: a verdict must describe the figure it currently governs ─────────
// scopeForAsset() tests INSUFFICIENT_FOR_CONCEPT against the conceptId for
// EVERY provenance, generated figures included. So an entry written about a
// curated card outlives that card's removal and silently demotes whatever
// replaces it — which is exactly what happened to phys.mech.angular-kinematics:
// its verdict ("empty x-y plane; no theta/omega/alpha curves") kept demoting
// the faithful generated theta-vs-time graph after the card was deleted.
describe('no verdict may outlive the figure it judged', () => {
  it('angular kinematics carries no stale verdict', () => {
    expect(INSUFFICIENT_FOR_CONCEPT.has('phys.mech.angular-kinematics')).toBe(false)
    expect(getConceptVisualType('phys.mech.angular-kinematics')).toBeNull()
  })

  it('GENERAL RULE: every demoted concept still has a figure to demote', () => {
    // The invariant that makes the rule enforceable rather than a comment. A
    // demotion is a statement ABOUT a figure; if the concept resolves to no
    // figure at all, the verdict governs nothing and can only mis-fire on the
    // next one. Concepts served purely by the generation engine must not sit
    // in this set.
    const stale = [...INSUFFICIENT_FOR_CONCEPT].filter((id) => getConceptVisualType(id) === null)
    expect(stale, `demoted but resolve to no figure: ${stale.join(', ')}`).toEqual([])
  })
})
