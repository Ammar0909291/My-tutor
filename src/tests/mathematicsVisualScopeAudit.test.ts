/**
 * P1 audit — the semantic-moat sweep never reached mathematics.
 *
 * Every id in INSUFFICIENT_FOR_CONCEPT came from the physics/chemistry sweep
 * (the repo's only moat suite is visualSemanticMoatPhysicsChemistry). The set
 * contained no mathematics id at all, so the identical defect that sweep found
 * and demoted in physics was still standing in mathematics on the STRONG
 * contract, where the tutor may introduce a figure as "a diagram of <concept>".
 *
 * The shape: coordinate_plane with NO scene generator is an empty grid. Bound
 * to a concept whose entire content is the curve that is not drawn, it cannot
 * honestly claim to depict it — which is exactly the verdict already recorded
 * for phys.mech.work ("empty x-y plane; work is the area under an F-d curve")
 * and phys.therm.carnot-cycle ("empty x-y plane; no closed four-stage cycle").
 */
import { describe, it, expect } from 'vitest'
import { INSUFFICIENT_FOR_CONCEPT } from '@/lib/teaching/visual/scope'
import { getConceptVisualType, getConceptSceneGenerator } from '@/lib/teaching/visualRegistry'

const BARE_CANVAS = new Set(['coordinate_plane', 'number_line'])

describe('mathematics bare-canvas bindings carry the same verdict as physics', () => {
  it.each(['math.alg.quadratic-equation', 'math.alg.polynomial'])(
    '%s is demoted — an empty grid may not claim to be the concept', (id) => {
      // The precondition that makes the demotion correct: still a bare canvas.
      expect(getConceptVisualType(id)).toBe('coordinate_plane')
      expect(getConceptSceneGenerator(id)).toBeNull()
      expect(INSUFFICIENT_FOR_CONCEPT.has(id)).toBe(true)
    })

  it('the figure is DEMOTED, never retired — it still renders', () => {
    // The moat's own remedy: remove the false claim, keep the picture. If a
    // future change suppresses these instead, that is a different decision and
    // should fail here.
    for (const id of ['math.alg.quadratic-equation', 'math.alg.polynomial']) {
      expect(getConceptVisualType(id)).not.toBeNull()
    }
  })

  it('a canvas that IS the concept keeps concept scope', () => {
    // The distinction the audit turns on, asserted so it cannot be flattened
    // into "every bare canvas is demoted". A number line is a faithful figure
    // OF the number line.
    for (const id of ['math.arith.number-line', 'math.arith.decimals']) {
      const t = getConceptVisualType(id)
      expect(t).not.toBeNull()
      expect(BARE_CANVAS.has(t as string)).toBe(true)
      expect(INSUFFICIENT_FOR_CONCEPT.has(id), id).toBe(false)
    }
  })

  it('the physics verdicts this mirrors are unchanged', () => {
    // If these ever stop being demoted, the mathematics rows lose their basis.
    for (const id of ['phys.mech.work', 'phys.therm.carnot-cycle']) {
      expect(INSUFFICIENT_FOR_CONCEPT.has(id), id).toBe(true)
      expect(getConceptVisualType(id)).toBe('coordinate_plane')
    }
  })
})

// ── Orphan repair (P1 audit, second pass) ───────────────────────────────────
// Three registry keys named no concept in the KG and were unreachable — the
// same silent-orphan defect this registry already fixed for phys.mech.pendulum
// and phys.mech.gravitation.
describe('the orphan number-line keys now reach real concepts', () => {
  it('the real ids resolve, where the orphans could never be reached', () => {
    for (const id of ['math.found.integers', 'math.found.rational-numbers', 'math.found.real-numbers']) {
      expect(getConceptVisualType(id), id).toBe('number_line')
    }
  })

  it('integers keeps concept scope — the canvas IS the concept', () => {
    // NumberLine.tsx is hardcoded -5..5 with integer ticks and integer labels.
    // For the integers that is a faithful figure.
    expect(INSUFFICIENT_FOR_CONCEPT.has('math.found.integers')).toBe(false)
  })

  it('rationals and reals are demoted — nothing is drawn between the ticks', () => {
    // What defines them is exactly what the renderer never draws.
    expect(INSUFFICIENT_FOR_CONCEPT.has('math.found.rational-numbers')).toBe(true)
    expect(INSUFFICIENT_FOR_CONCEPT.has('math.found.real-numbers')).toBe(true)
  })

  it('trig identities was deliberately NOT repointed — it would be a downgrade', () => {
    // The real id already resolves to geometry_shape via a domain default.
    // Repointing its orphan would replace a real figure with a bare grid.
    expect(getConceptVisualType('math.trig.trig-identities')).toBe('geometry_shape')
  })
})

describe('a stale verdict must not outlive the figure it judged', () => {
  it('angular kinematics is no longer demoted — its curated card is gone', () => {
    // scopeForAsset tests this set for EVERY provenance, so the entry was
    // demoting the faithful generated graph that replaced the deleted card.
    expect(INSUFFICIENT_FOR_CONCEPT.has('phys.mech.angular-kinematics')).toBe(false)
    expect(getConceptVisualType('phys.mech.angular-kinematics')).toBeNull()
  })
})

// ── The orphan-key census (P1 audit, complete pass) ─────────────────────────
// 42 of 151 CONCEPT_VISUALS keys (28%) named no concept in any KG and were
// unreachable at runtime. 20 of those carry an AUTHORED scene generator —
// punnett_square, cell_division, dna_structure, ecological_pyramid,
// coordinate_geometry_line, triangle, heights_and_distances,
// statistics_bar_chart, calculus_graph, vector, er_diagram — i.e. real built
// content wired to keys no learner can ever hit.
//
// Only THREE were repaired, and only because each passed both tests:
//   (1) exactly one KG concept matches the key's final segment or title, and
//   (2) repointing does not replace something better.
// The census is asserted here so the remaining backlog is tracked rather than
// re-derived, and so a future repair cannot quietly shrink it by guessing.
describe('orphan keys are repaired only when the mapping is unambiguous', () => {
  it('the three repaired keys point at concepts that had NO figure before', () => {
    // The repair gives a figure to concepts that had none; it replaces nothing.
    for (const id of ['math.found.integers', 'math.found.rational-numbers', 'math.found.real-numbers']) {
      expect(getConceptVisualType(id), id).toBe('number_line')
    }
  })

  it('a false friend is NOT repointed, despite an exact title match', () => {
    // 'math.geom.congruence' has exactly one exact-title match in the KG:
    // 'math.nt.congruence', "Congruence" — which is NUMBER-THEORY congruence
    // (a === b mod n), not congruent triangles. A mechanical exact-match rule
    // gets this wrong, which is why the rule is not applied mechanically.
    // Repointing would attach geometry_shape to modular arithmetic.
    expect(getConceptVisualType('math.nt.congruence')).toBeNull()
  })

  it('a repoint that would DOWNGRADE the target is not made', () => {
    // 'math.trig.trigonometric-identities' (a bare coordinate_plane) matches
    // 'math.trig.trig-identities' exactly — but that concept already resolves
    // to geometry_shape through a domain default, so repointing would replace
    // a real figure with an empty grid.
    expect(getConceptVisualType('math.trig.trig-identities')).toBe('geometry_shape')
  })
})
