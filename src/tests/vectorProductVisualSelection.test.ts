/**
 * Semantic visual selection — a figure must support the CLAIM being taught,
 * not merely belong to the same topic family.
 *
 * THE PRODUCTION DEFECT. Lesson 7, "Dot and Cross Products". The tutor taught
 * the lawnmower example — only the forward component of the push does work —
 * and introduced A · B = |A||B| cos θ. The learner asked "Can you give me a
 * diagram to visualize this?" and was shown "3D Vector Visualization": an
 * origin, one vector, x/y/z axes and its directional components. Mathematically
 * valid, and about a different claim: no second vector, no angle, no
 * projection.
 *
 * Three distinct geometric claims — components, addition, products — shared one
 * `three_vector_visualization` card. This suite pins them apart, and pins the
 * general rule that produced the defect rather than only its one instance.
 */

import { describe, it, expect } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { buildVectorProductsScene, VECTOR_PRODUCTS_PARAMS } from '@/lib/teaching/sceneGenerators/vectorProducts'
import { INSUFFICIENT_FOR_CONCEPT, isInsufficientForConcept } from '@/lib/teaching/visual/scope'
import { CONCEPT_SCENE_OVERRIDES } from '@/lib/teaching/visual/conceptSceneParams'
import { isLayoutSafe, checkSceneLayoutAllViewports } from '@/lib/teaching/visual/layout'
import type { SceneObject, SceneSpec, Vec3 } from '@/lib/teaching/sceneSpec'

const DIAGRAM_REQUEST = 'Can you give me a diagram to visualize this?'

/** The production turn: an explicit request while teaching `conceptId`. */
function requestDiagram(conceptId: string, subject = 'physics') {
  return resolveVisual({
    message: DIAGRAM_REQUEST,
    lessonConceptId: conceptId,
    subject,
    learnerRequest: 'diagram',
  })
}

function sceneOf(conceptId: string): SceneSpec {
  const decision = requestDiagram(conceptId)
  expect(decision.graphical).toBe(true)
  expect(decision.payload?.renderer).toBe('scene')
  const spec = decision.payload?.sceneSpec
  if (!spec) throw new Error(`no sceneSpec for ${conceptId}`)
  return spec
}

const allObjects = (spec: SceneSpec): SceneObject[] => spec.steps.flatMap((s) => s.objects ?? [])
const allText = (spec: SceneSpec): string =>
  [
    spec.title, spec.teachingGoal ?? '', spec.ariaLabel ?? '',
    ...spec.steps.map((s) => s.narration ?? ''),
    ...allObjects(spec).map((o) => o.text ?? ''),
  ].join(' ')

// ── the defect itself ────────────────────────────────────────────────────────

describe('dot product: the exact production turn', () => {
  it('no longer falls through to the generic vector-components card', () => {
    const decision = requestDiagram('phys.meas.vector-products')
    expect(decision.payload?.renderer).not.toBe('card')
    expect(JSON.stringify(decision.payload)).not.toContain('three_vector_visualization')
  })

  it('serves a concept-scoped figure with declared identity, not a domain illustration', () => {
    const decision = requestDiagram('phys.meas.vector-products')
    expect(decision.graphical).toBe(true)
    expect(decision.asset?.conceptId).toBe('phys.meas.vector-products')
    // Before the fix this was scope 'domain' — the audit knew the figure did
    // not depict the concept, and the card rendered anyway.
    expect(decision.asset?.scope).toBe('concept')
    expect(decision.asset?.identity).toBe('declared')
  })

  it('the figure teaches projection, the angle, and the dot-product relation', () => {
    const text = allText(sceneOf('phys.meas.vector-products'))
    expect(text).toContain('|A| cos θ')          // the projection itself
    expect(text).toContain('θ = 60°')            // the angle between them
    expect(text).toMatch(/A · B = \|A\|\|B\| cos θ/)
    expect(text).toMatch(/perpendicular|⊥/)      // the component that is NOT used
    expect(text.toLowerCase()).toContain('scalar')
  })

  it('draws two distinct vectors from a common origin — the thing the card lacked', () => {
    const arrows = allObjects(sceneOf('phys.meas.vector-products'))
      .filter((o) => (o.type === 'arrow' || o.type === 'vector') && o.from && o.to)
    expect(arrows.length).toBeGreaterThanOrEqual(4)   // A and B in both panels
    const origins = new Set(arrows.map((a) => JSON.stringify(a.from)))
    // At least one origin carries two different arrows: a pair, not a lone vector.
    const shared = [...origins].filter(
      (o) => arrows.filter((a) => JSON.stringify(a.from) === o).length >= 2,
    )
    expect(shared.length).toBeGreaterThanOrEqual(1)
  })

  it('also covers the cross product, which the same KG node names', () => {
    const text = allText(sceneOf('phys.meas.vector-products'))
    expect(text).toMatch(/A × B/)
    // Spacing around × is a layout concession (see the mobile note in the
    // generator), so the relation is matched tolerantly rather than pinned.
    expect(text).toMatch(/\|A ?× ?B\| = \|A\|\|B\| sin θ/)
    expect(text.toLowerCase()).toContain('vector')
  })

  it('renders cleanly at every viewport, the bar every authored scene meets', () => {
    // The figure carries 17 labels — twice the density of the other authored
    // scenes — so this is measured rather than assumed. It caught a 44px
    // mobile overhang and four label collisions while this figure was written.
    expect(isLayoutSafe(buildVectorProductsScene())).toBe(true)
    for (const report of checkSceneLayoutAllViewports(buildVectorProductsScene())) {
      expect(report.violations, report.viewport).toEqual([])
    }
  })
})

// ── correct by construction: an independent re-derivation ────────────────────

describe('the authored figure is geometrically correct, re-derived from what it draws', () => {
  const spec = buildVectorProductsScene()
  const objects = allObjects(spec)
  const sub = (p: Vec3, q: Vec3): Vec3 => [p[0] - q[0], p[1] - q[1], p[2] - q[2]]
  const dot3 = (u: Vec3, v: Vec3) => u[0] * v[0] + u[1] * v[1] + u[2] * v[2]
  const mag = (v: Vec3) => Math.hypot(v[0], v[1], v[2])

  /** The two red/blue arrows sharing an origin in the right-hand (tilted) panel. */
  const tiltedPair = (() => {
    const arrows = objects.filter((o) => o.type === 'arrow' && o.from && o.to)
    // The cross-product panel is the one whose A leaves the screen plane.
    const a = arrows.find((o) => o.to![2] !== 0 && o.from![2] === 0)
    if (!a) throw new Error('no out-of-plane A vector found')
    const b = arrows.find(
      (o) => o !== a && JSON.stringify(o.from) === JSON.stringify(a.from) && o.to![2] === 0,
    )
    if (!b) throw new Error('no partner B vector found')
    return { origin: a.from as Vec3, A: sub(a.to as Vec3, a.from as Vec3), B: sub(b.to as Vec3, b.from as Vec3) }
  })()

  it('the drawn pair really is |A|=3, |B|=4 at 60° — in 3D, not merely on screen', () => {
    const { A, B } = tiltedPair
    expect(mag(A)).toBeCloseTo(VECTOR_PRODUCTS_PARAMS.aMag * VECTOR_PRODUCTS_PARAMS.scale, 2)
    expect(mag(B)).toBeCloseTo(VECTOR_PRODUCTS_PARAMS.bMag * VECTOR_PRODUCTS_PARAMS.scale, 2)
    const cosTheta = dot3(A, B) / (mag(A) * mag(B))
    expect((Math.acos(cosTheta) * 180) / Math.PI).toBeCloseTo(VECTOR_PRODUCTS_PARAMS.thetaDeg, 1)
  })

  it('the A × B arrow is perpendicular to BOTH operands and points the right-hand way', () => {
    const { origin, A, B } = tiltedPair
    const crossArrow = objects.find(
      (o) => o.type === 'arrow' && o.from && o.to &&
        JSON.stringify(o.from) === JSON.stringify(origin) &&
        o.to![0] === origin[0] && o.to![1] !== origin[1],
    )
    if (!crossArrow) throw new Error('no cross-product arrow found')
    const drawn = sub(crossArrow.to as Vec3, origin)

    // Perpendicularity — the defining property of the cross product.
    expect(Math.abs(dot3(drawn, A)) / (mag(drawn) * mag(A))).toBeLessThan(0.01)
    expect(Math.abs(dot3(drawn, B)) / (mag(drawn) * mag(B))).toBeLessThan(0.01)

    // SIGN: re-derived here by the determinant, independently of the builder.
    const expected: Vec3 = [
      A[1] * B[2] - A[2] * B[1],
      A[2] * B[0] - A[0] * B[2],
      A[0] * B[1] - A[1] * B[0],
    ]
    const alignment = dot3(drawn, expected) / (mag(drawn) * mag(expected))
    expect(alignment).toBeCloseTo(1, 3)   // same direction, not the reverse
  })

  it('the left panel drops a genuine perpendicular onto B and marks |A| cos θ', () => {
    const projection = objects.find((o) => o.type === 'bond' && o.color === '#22c55e')
    if (!projection) throw new Error('no projection segment found')
    const drawnLen = mag(sub(projection.to as Vec3, projection.from as Vec3))
    const expectedLen =
      VECTOR_PRODUCTS_PARAMS.aMag * VECTOR_PRODUCTS_PARAMS.scale *
      Math.cos((VECTOR_PRODUCTS_PARAMS.thetaDeg * Math.PI) / 180)
    expect(drawnLen).toBeCloseTo(expectedLen, 2)
  })

  it('states the actual values of both products', () => {
    expect(VECTOR_PRODUCTS_PARAMS.dotValue).toBeCloseTo(6, 5)
    expect(VECTOR_PRODUCTS_PARAMS.crossMagnitude).toBeCloseTo(10.39, 2)
    const text = allText(spec)
    expect(text).toContain('= 6')
    expect(text).toContain('10.39')
  })

  it('is deterministic — the same bytes every time, so a rehydrated session matches', () => {
    expect(JSON.stringify(buildVectorProductsScene())).toBe(JSON.stringify(buildVectorProductsScene()))
  })

  it('keeps every coordinate inside the ±5 authoring bound', () => {
    for (const o of objects) {
      for (const p of [o.position, o.from, o.to].filter(Boolean) as Vec3[]) {
        for (const c of p) expect(Math.abs(c)).toBeLessThanOrEqual(5)
      }
    }
  })
})

// ── the three claims stay distinct ───────────────────────────────────────────

describe('vector-family claims are not interchangeable', () => {
  it('vector ADDITION still selects the addition figure — an existing valid selection', () => {
    const spec = sceneOf('phys.meas.vector-addition')
    expect(allText(spec)).toMatch(/resultant|R = A \+ B/i)
    // and is NOT the products figure
    expect(spec.id).not.toBe('phys-vector-products')
  })

  it('PRODUCTS and ADDITION resolve to different figures', () => {
    expect(sceneOf('phys.meas.vector-products').id)
      .not.toBe(sceneOf('phys.meas.vector-addition').id)
  })

  it('the products figure is not an addition figure wearing a new label', () => {
    const text = allText(sceneOf('phys.meas.vector-products'))
    expect(text).not.toMatch(/tip-to-tail|parallelogram law|R = A \+ B/i)
  })

  it('a components-style concept does not receive the products figure', () => {
    // math.vec.vectors keeps its own binding; it must not inherit dot/cross.
    const decision = requestDiagram('math.vec.vectors', 'mathematics')
    expect(JSON.stringify(decision.payload)).not.toContain('phys-vector-products')
  })
})

// ── the repair mechanism, and the backlog it draws from ──────────────────────

describe('the repair path is the general one, not a special case', () => {
  it('phys.meas.vector-products has LEFT the insufficient set, by being repaired', () => {
    // The intended exit from INSUFFICIENT_FOR_CONCEPT: author the concept's own
    // figure through CONCEPT_SCENES — which outranks the shared card — then drop
    // the entry, because the audit's verdict no longer describes what renders.
    expect(isInsufficientForConcept('phys.meas.vector-products')).toBe(false)
    expect(CONCEPT_SCENE_OVERRIDES).toContain('phys.meas.vector-products')
  })

  it('uses the SAME mechanism that already repairs physics, chemistry and biology', () => {
    // Not a new tier and not a new renderer: the per-concept override table
    // that reflection, inelastic collisions, Kirchhoff and meiosis go through.
    for (const id of ['phys.opt.reflection', 'phys.mech.collisions-inelastic', 'bio.cell.meiosis']) {
      expect(CONCEPT_SCENE_OVERRIDES).toContain(id)
    }
    expect(CONCEPT_SCENE_OVERRIDES.length).toBeGreaterThanOrEqual(15)
  })

  /**
   * WITHHOLDING WAS TRIED AND REJECTED ON EVIDENCE.
   *
   * Making audit-insufficient concepts yield on an explicit request looked like
   * the general fix. Measured, it blanked excursions — "Teach me vectors with
   * diagram" resolved to phys.meas.scalars-vectors and returned NO FIGURE — and
   * contradicted the recorded decision that these concepts keep their generic
   * figure until a faithful one is authored. These pin the behaviour that was
   * deliberately kept, so the idea is not silently re-attempted.
   */
  it('an insufficient concept still renders, demoted rather than withheld', () => {
    const decision = requestDiagram('phys.em.resistivity')
    expect(decision.graphical).toBe(true)
    expect(decision.asset?.scope).toBe('domain')
  })

  it('an excursion to an insufficient concept still gets its figure', () => {
    const decision = resolveVisual({
      message: 'Teach me vectors with diagram.',
      lessonConceptId: 'phys.mech.kinetic-energy',
      subject: 'physics',
      learnerRequest: 'diagram',
    })
    expect(decision.excursion).toBe(true)
    expect(decision.graphical).toBe(true)
  })

  it('the remaining backlog is executable, and still contains chemistry', () => {
    // The list is the tracked authoring queue, not a wontfix. Asserting it here
    // means the next repair has to come back and update this number.
    //
    // 26 -> 30: the visual semantic moat sweep found four concept-level rows
    // carrying the STRONG contract ("a <representation> of <concept> is
    // attached") while pointing at a generic card — phys.mech.displacement,
    // phys.mech.tension, phys.em.emf, and phys.opt.lens-power, the last of
    // which B2's own "requires authoring" list had already described as
    // needing a lens COMBINATION without ever demoting it. They are thin, not
    // contradictory, so they join this queue rather than the retirement
    // register. The number going UP here is the correct direction for a
    // finding of this kind: it means a claim was withdrawn, not that a figure
    // got worse.
    // 30 -> 32: round 4 read the tutor contract's own "WHAT THE LEARNER SEES"
    // text for every card-backed figure carrying the strong contract.
    // phys.qm.schrodinger-equation is served a STATIC ψ(x) for the
    // TIME-DEPENDENT equation, and phys.qm.selection-rules a level diagram
    // that draws transitions without saying which are allowed.
    // 32 -> 34: round 5 rebound chem.bond.hybridization and
    // chem.bond.bond-parameters off the chem.bond domain default onto the
    // molecular-shapes card, which labels 109.5° tetrahedral angles instead of
    // showing an abstract A-B pair. An exact registry row promotes a concept
    // to concept SCOPE, so both were recorded here in the same change to keep
    // the contract exactly as honest as it was: the picture improves, the
    // claim does not. Entries added alongside a rebind are the good kind.
    // 34 -> 41: round 6 found that `scopeForAsset` demotes 'domain-default'
    // but not 'generator-default', even though asset.ts declares BOTH
    // 'derived' identity. 20 concepts name a generator KIND without authoring
    // parameters, are served that kind's one shared canonical scene, and were
    // told to introduce it as a figure of themselves. Seven were judged
    // individually — scene title against the KG's own description — and each
    // shows ONE INSTANCE of something the concept defines more broadly
    // (crystal-systems gets an FCC cell for "seven crystal systems";
    // ohms-law gets a series network for V = IR). The other thirteen genuinely
    // ARE depicted by their shared instance and were deliberately left alone;
    // they are enumerated in visualGeneratorDefaultScope.test.ts so the gap
    // cannot grow in the dark.
    // 41 -> 43: the P1 audit found this set contained NO mathematics id at
    // all — every entry above came from the physics/chemistry sweep, and the
    // repo's only moat suite is visualSemanticMoatPhysicsChemistry. So the
    // defect that sweep found and demoted in physics was still standing in
    // mathematics on the STRONG contract. math.alg.quadratic-equation and
    // math.alg.polynomial are the same shape as phys.mech.work and
    // phys.therm.carnot-cycle: coordinate_plane with NO scene generator, i.e.
    // an empty grid, bound to a concept whose whole content is the curve that
    // is not drawn. Demoted, not retired — the number going up is again a
    // claim withdrawn, not a figure made worse.
    // 43 -> 44: net of one removal and two additions.
    // REMOVED 'phys.mech.angular-kinematics' — its verdict described a curated
    // binding that no longer exists, and scopeForAsset tests this set for EVERY
    // provenance, so a criticism of a deleted card was demoting the faithful
    // generated graph that replaced it.
    // ADDED 'math.found.rational-numbers' and 'math.found.real-numbers' — the
    // number-line renderer is hardcoded -5..5 with integer ticks only, so it
    // never draws anything between them, which is precisely what defines both.
    // 44 -> 49: the orphan census wired five previously UNREACHABLE authored
    // scene generators to real concepts. Three depict their concept and keep
    // concept scope (punnett_square IS a Mendelian cross, er_diagram IS
    // entity-relationship modelling, calculus_graph identifies the critical
    // points). Two draw ONE INSTANCE of a broader concept and are demoted for
    // exactly the reason round 6 demoted crystal-systems: an energy pyramid
    // for "Ecosystem Structure and Function", one frequency distribution for
    // "Data Visualization". Both are still a real upgrade on the generic
    // domain default they previously received.
    expect(INSUFFICIENT_FOR_CONCEPT.size).toBe(49)
    expect([...INSUFFICIENT_FOR_CONCEPT].some((id) => id.startsWith('chem.'))).toBe(true)
    // The queue now tracks mathematics too, which it did not before.
    expect([...INSUFFICIENT_FOR_CONCEPT].some((id) => id.startsWith('math.'))).toBe(true)
    expect(INSUFFICIENT_FOR_CONCEPT.has('phys.meas.scalars-vectors')).toBe(true)
  })
})
