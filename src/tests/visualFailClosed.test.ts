/**
 * M1 — the visualization runtime fails closed.
 *
 * Phase 0 measured two symptom classes that turned out to be one defect. When
 * the authority owned the turn, concepts with no curated asset correctly showed
 * nothing. When it did NOT own the turn — flag off, resolver throw, or the
 * block simply not reached — four post-LLM pipelines derived a figure from the
 * TUTOR'S OWN PROSE, with no concept input at all, and produced measured
 * mismatches: a concave mirror on a Total Internal Reflection lesson, a
 * two-cart collision on Calorimetry, a lens on Wave Interference, a projectile
 * parabola on Viscosity.
 *
 * M1 removed those pipelines from the request path rather than gating them
 * harder. These tests prove the resulting invariant:
 *
 *   the resolver decides, or nothing does.
 *
 * They deliberately do NOT assert that the seven concepts gained a figure —
 * they have no asset yet, and inventing one is the failure mode being closed.
 */

import { describe, expect, it } from 'vitest'
import { resolveVisual, resolveVisualForTurn } from '@/lib/teaching/visual/resolveVisual'
import { buildVisualContractBlock } from '@/lib/teaching/visual/visualContract'
import { noFigureDecision } from '@/lib/teaching/visual/types'
import { routeSceneGenerator } from '@/lib/teaching/sceneGenerators/sceneRouter'

/** The Phase 0 cases, with prose that measurably hijacked the old pipelines. */
const HIJACK_CASES = [
  {
    concept: 'phys.opt.total-internal-reflection',
    label: 'Total Internal Reflection',
    prose:
      'Total internal reflection happens when light hits the boundary beyond ' +
      'the critical angle. Let us look at a ray diagram to see how the ray behaves.',
    usedToRouteTo: 'ray_optics',
  },
  {
    concept: 'phys.opt.total-internal-reflection',
    label: 'Total Internal Reflection (mirror comparison)',
    prose: 'Unlike a concave mirror, total internal reflection needs no silvered surface.',
    usedToRouteTo: 'ray_optics',
  },
  {
    concept: 'phys.therm.calorimetry',
    label: 'Calorimetry',
    prose:
      'When two objects at different temperatures touch, heat flows until ' +
      'thermal equilibrium. Two bodies collide in energy terms.',
    usedToRouteTo: 'collision',
  },
  {
    concept: 'phys.wave.interference',
    label: 'Wave Interference',
    prose: 'Two waves overlap and produce a real image of bright and dark fringes.',
    usedToRouteTo: 'ray_optics',
  },
  {
    concept: 'phys.mech.viscosity',
    label: 'Viscosity',
    prose:
      'A sphere falling through a fluid reaches terminal velocity; the ' +
      'initial velocity is zero.',
    usedToRouteTo: 'projectile',
  },
] as const

/** Concepts Phase 0 measured as NO FIGURE under the authority. */
const NO_ASSET_CONCEPTS = [
  'phys.opt.total-internal-reflection',
  'phys.therm.calorimetry',
  'phys.therm.first-law',
  'phys.wave.transverse-waves',
  'phys.mech.viscosity',
  'phys.mech.surface-tension',
  'phys.wave.interference',
] as const

describe('the prose routers still misroute — which is why they are not authorities', () => {
  // If these ever start returning null, the test above them stops proving
  // anything, so the misrouting is asserted rather than assumed. M1 did not
  // patch a keyword table; it removed the keyword table's authority.
  it.each(HIJACK_CASES)('$label prose still routes to $usedToRouteTo', ({ prose, usedToRouteTo }) => {
    expect(routeSceneGenerator(prose)).toBe(usedToRouteTo)
  })
})

describe('prose can no longer reach the learner', () => {
  it.each(HIJACK_CASES)('$label: the authority declines regardless of prose', ({ concept, prose }) => {
    // The learner's own message is the only text the authority reads, and it
    // reads it to identify a CONCEPT, never to pick a picture. Feeding it the
    // exact prose that hijacked the old pipelines must not produce a figure.
    const decision = resolveVisual({
      message: prose,
      lessonConceptId: concept,
      subject: 'physics',
      learnerRequest: 'diagram',
    })
    expect(decision.graphical).toBe(false)
    expect(decision.payload).toBeNull()
  })

  it.each(NO_ASSET_CONCEPTS)('%s asks for a diagram and honestly gets none', async (concept) => {
    const decision = await resolveVisualForTurn({
      message: 'explain with diagram',
      lessonConceptId: concept,
      subject: 'physics',
      learnerRequest: 'diagram',
    })
    expect(decision.graphical).toBe(false)
    expect(decision.payload).toBeNull()
    expect(decision.source).toBe('none')
  })
})

describe('curated assets are untouched by M1', () => {
  it('a curated registry binding still resolves to its card', () => {
    const decision = resolveVisual({
      message: 'explain with diagram',
      lessonConceptId: 'phys.mech.newtons-first-law',
      subject: 'physics',
      learnerRequest: 'diagram',
    })
    expect(decision.graphical).toBe(true)
    expect(decision.payload?.renderer).toBe('card')
    expect(decision.provenance).toBe('registry:phys.mech.newtons-first-law:three_newton_forces')
  })

  it('a concept-bound scene generator still resolves to its scene', () => {
    const decision = resolveVisual({
      message: 'explain with diagram',
      lessonConceptId: 'phys.opt.reflection',
      subject: 'physics',
      learnerRequest: 'diagram',
    })
    expect(decision.graphical).toBe(true)
    expect(decision.payload?.renderer).toBe('scene')
    expect(decision.provenance).toBe('generator:phys.opt.reflection:ray_optics')
  })

  it('the ray_optics scene belongs to Reflection and not to its neighbour', () => {
    // The two optics concepts sit next to each other in the KG and only one
    // has an asset. That asymmetry must stay visible rather than being papered
    // over by giving the neighbour the same figure.
    const tir = resolveVisual({
      message: 'explain with diagram',
      lessonConceptId: 'phys.opt.total-internal-reflection',
      subject: 'physics',
      learnerRequest: 'diagram',
    })
    expect(tir.payload).toBeNull()
  })
})

describe('the no-figure contract', () => {
  it('a declining decision tells the tutor the screen is empty', () => {
    const decision = resolveVisual({
      message: 'explain total internal reflection with a ray diagram',
      lessonConceptId: 'phys.opt.total-internal-reflection',
      subject: 'physics',
      learnerRequest: 'diagram',
    })
    const block = buildVisualContractBlock(decision)
    expect(block).toContain('NO FIGURE IS ATTACHED')
    // It must not claim, or invite the model to claim, that anything is drawn.
    expect(block).not.toMatch(/A FIGURE IS ALREADY BEING RENDERED/)
    // Mental-imagery language stays explicitly permitted.
    expect(block).toContain('imagine a ball thrown at an angle')
  })

  it('a resolver ERROR produces the same contract as an honest decline', () => {
    // This is the M1 fail-closed path: route.ts turns a thrown resolver into
    // this decision instead of into four prose-keyword pipelines.
    const errored = {
      ...noFigureDecision('resolver-error', 'phys.opt.total-internal-reflection', null, 'explain' as const),
      continuityReason: 'resolver-error',
      session: null,
    }
    expect(errored.graphical).toBe(false)
    expect(errored.payload).toBeNull()
    expect(errored.session).toBeNull()

    const declined = resolveVisual({
      message: 'explain with diagram',
      lessonConceptId: 'phys.opt.total-internal-reflection',
      subject: 'physics',
      learnerRequest: 'diagram',
    })

    // Byte-identical instruction to the tutor: the two states are
    // indistinguishable downstream, which is the property M1 exists to create.
    expect(buildVisualContractBlock(errored)).toBe(buildVisualContractBlock(declined))
  })

  it('a null decision (resolver never ran) also yields no visual instruction', () => {
    expect(buildVisualContractBlock(null)).toBe('')
  })
})
