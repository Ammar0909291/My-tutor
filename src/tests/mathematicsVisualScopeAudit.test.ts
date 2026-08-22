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
