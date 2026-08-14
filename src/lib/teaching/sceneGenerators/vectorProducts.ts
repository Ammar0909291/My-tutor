/**
 * Dot and cross products — the figure `phys.meas.vector-products` never had.
 *
 * THE DEFECT THIS CLOSES. The concept's only binding was the shared
 * `three_vector_visualization` card: ONE fixed illustration of a single vector
 * resolved into x/y/z components, also bound to `phys.meas.scalars-vectors`,
 * `phys.meas.vector-addition` and two mathematics concepts. Components,
 * addition and products are three different geometric claims, and the card can
 * only be a faithful figure of at most one of them. The M3-A audit caught it —
 * `scope.ts` recorded "one vector; dot/cross need two and their product" — but
 * scope only restrains what the tutor may SAY; the card still rendered. A
 * learner mid-way through the lawnmower example, asking "can you give me a
 * diagram to visualize this?", was shown axes and directional components with
 * no second vector, no angle and no projection in the picture at all.
 *
 * WHAT THIS IS NOT. Not a new engine and not a new renderer. A plain SceneSpec
 * built from the primitives SceneSpecRenderer already paints, resolved through
 * the same registry → resolver → admission → contract path as every other
 * asset. No LLM, no network, no randomness.
 *
 * ── WHY ONE FIGURE FOR BOTH PRODUCTS ────────────────────────────────────────
 * The KG node is "Dot and Cross Products" and its description names both. The
 * figure cannot be chosen per turn either: `resolveVisual` is pure and is
 * re-derived from the concept id alone when a session rehydrates (with an
 * EMPTY message), so a message-dependent figure would restore as a different
 * picture than the one that was on screen. So both products are drawn, from
 * ONE shared pair of vectors — which is the stronger teaching point anyway:
 * same A, same B, same θ, two products, one a number and one a vector.
 *
 * ── CORRECT BY CONSTRUCTION ─────────────────────────────────────────────────
 * Every coordinate below is COMPUTED, never eyeballed: the projection foot from
 * |A|cos θ, the parallelogram from A + B, and the cross-product direction from
 * the actual determinant. The right-hand-rule direction is the one thing a
 * hand-placed arrow gets silently wrong, so it is never hand-placed.
 * `src/tests/vectorProductVisualSelection.test.ts` re-derives all three from
 * the drawn endpoints — the same independent-derivation net `vectorAddition.ts`
 * uses for its resultant.
 *
 * Authoring rules (M4.1, see physicsPilot.ts): shared palette, labels are names
 * not sentences, steps are cumulative so no annotation may contradict a later
 * step, coordinates inside ±5.
 */

import type { SceneSpec, Vec3 } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, dot, label, line } from './visualDesign'

/** The pair both products are taken of. Textbook-canonical, and deliberately
 *  not a right angle: at 90° the dot product vanishes and the projection the
 *  figure exists to show would have zero length. */
const A_MAG = 3
const B_MAG = 4
const THETA_DEG = 60

/** Scene units per unit of magnitude, so |B| = 4 spans 3 units of canvas. */
const SCALE = 0.75

/** Panel origins. Both panels share the same construction, tilted differently. */
const LEFT: Vec3 = [-4.3, -1.5, 0]
const RIGHT: Vec3 = [0.75, -1.2, 0]

/**
 * Display length of the A × B arrow.
 *
 * The cross product is an AREA, not a length — drawing it to the same scale as
 * A and B would assert a comparison between quantities of different dimension.
 * Textbooks draw its direction exactly and annotate its magnitude, which is
 * what this does; the narration says so rather than leaving it implied.
 */
const CROSS_ARROW_LENGTH = 2

const rad = (deg: number) => (deg * Math.PI) / 180
const r = (n: number) => Math.round(n * 1000) / 1000

const add = (p: Vec3, q: Vec3): Vec3 => [r(p[0] + q[0]), r(p[1] + q[1]), r(p[2] + q[2])]
const scaleVec = (v: Vec3, k: number): Vec3 => [r(v[0] * k), r(v[1] * k), r(v[2] * k)]
const cross = (u: Vec3, v: Vec3): Vec3 => [
  r(u[1] * v[2] - u[2] * v[1]),
  r(u[2] * v[0] - u[0] * v[2]),
  r(u[0] * v[1] - u[1] * v[0]),
]
const norm = (v: Vec3) => Math.hypot(v[0], v[1], v[2])

/**
 * The right-hand panel's plane is TILTED out of the screen so that A × B has a
 * large on-screen component. The camera is fixed head-on at +z
 * (`ThreeDVisual`, `position: [0, 0, cameraDistance]`), so a product drawn
 * along a pure +z axis projects to a single point — an invisible arrow, for
 * the one claim the panel exists to make.
 *
 * `q` is the in-plane direction perpendicular to B, carrying most of its length
 * toward the viewer. A is then B's direction rotated by θ within that plane, so
 * the 60° between them is exact in 3D and not merely apparent on screen.
 */
const TILT_SCREEN = 0.45
const TILT_DEPTH = Math.sqrt(1 - TILT_SCREEN * TILT_SCREEN)

/** Both products, from one pair of vectors. Pure and deterministic. */
export function buildVectorProductsScene(): SceneSpec {
  const aLen = A_MAG * SCALE
  const bLen = B_MAG * SCALE

  // ── left panel: everything flat in the screen plane ──────────────────────
  const bFlat: Vec3 = [bLen, 0, 0]
  const aFlat: Vec3 = [r(aLen * Math.cos(rad(THETA_DEG))), r(aLen * Math.sin(rad(THETA_DEG))), 0]

  const aTipL = add(LEFT, aFlat)
  const bTipL = add(LEFT, bFlat)
  // The projection of A onto B: |A| cos θ along B's direction. Because B runs
  // along +x here, the foot sits directly below A's tip — which is precisely
  // what makes the perpendicular drop readable.
  const projLen = aLen * Math.cos(rad(THETA_DEG))
  const footL = add(LEFT, [r(projLen), 0, 0])

  // ── right panel: the same pair, in a plane tilted toward the viewer ──────
  const bTilt: Vec3 = [bLen, 0, 0]
  const qHat: Vec3 = [0, TILT_SCREEN, TILT_DEPTH]
  const aTilt: Vec3 = [
    r(aLen * Math.cos(rad(THETA_DEG))),
    r(aLen * Math.sin(rad(THETA_DEG)) * qHat[1]),
    r(aLen * Math.sin(rad(THETA_DEG)) * qHat[2]),
  ]

  const aTipR = add(RIGHT, aTilt)
  const bTipR = add(RIGHT, bTilt)
  const farR = add(RIGHT, add(aTilt, bTilt))

  // THE DIRECTION IS THE DETERMINANT, never a placed arrow.
  const axb = cross(aTilt, bTilt)
  const crossTip = add(RIGHT, scaleVec(axb, CROSS_ARROW_LENGTH / norm(axb)))

  const dotValue = A_MAG * B_MAG * Math.cos(rad(THETA_DEG))
  const crossValue = A_MAG * B_MAG * Math.sin(rad(THETA_DEG))
  const round2 = (n: number) => Math.round(n * 100) / 100

  return {
    id: 'phys-vector-products',
    title: 'Dot and cross products of the same two vectors',
    sceneType: 'comparison',
    cameraDistance: 13,
    // Kept under 160 characters: `visualSemantics` clamps the caption there,
    // and a goal that overflows reaches the tutor cut off mid-clause.
    teachingGoal:
      'The dot product measures how much of A lies along B and gives a number; the cross product ' +
      'measures what A and B sweep out and gives a perpendicular vector.',
    ariaLabel:
      'Two panels sharing the same pair of vectors A and B with 60 degrees between them. On the ' +
      'left, a perpendicular dropped from the tip of A onto B marks the projection of A along B, ' +
      'labelled |A| cos theta, and the dot product is a single number. On the right, A and B span ' +
      'a parallelogram whose area is the magnitude of the cross product, and an arrow perpendicular ' +
      'to that parallelogram shows the direction of A cross B.',
    steps: [
      {
        narration:
          `Both products start from the SAME pair: A of magnitude ${A_MAG}, B of magnitude ${B_MAG}, ` +
          `with ${THETA_DEG}° between them. What changes is the question each product asks about that pair.`,
        objects: [
          // Panel names at PRIMARY rather than heading tier. Measured, not
          // preferred: at heading size (1.75×) both names wrap on the mobile
          // viewport into blocks tall enough to collide with the relation
          // below them, and every other authored scene measures clean at all
          // three viewports. The word headings survive — they are the
          // non-colour channel separating the two panels — just one tier down.
          label('DOT PRODUCT', [-3.0, 3.75, 0], ROLE.ink, 'primary'),
          label('CROSS PRODUCT', [2.45, 3.75, 0], ROLE.ink, 'primary'),

          dot(LEFT, ROLE.reference, 0.11),
          arrow(LEFT, aTipL, ROLE.input),
          arrow(LEFT, bTipL, ROLE.output),
          label('A', [-3.48, 0.98, 0], ROLE.input, 'primary'),
          label('B', [-1.55, -1.98, 0], ROLE.output, 'primary'),
          label(`θ = ${THETA_DEG}°`, [-3.6, -1.02, 0], ROLE.aid, 'detail'),

          dot(RIGHT, ROLE.reference, 0.11),
          arrow(RIGHT, aTipR, ROLE.input),
          arrow(RIGHT, bTipR, ROLE.output),
          label('A', [1.42, 0.42, aTilt[2]], ROLE.input, 'primary'),
          label('B', [2.95, -1.92, 0], ROLE.output, 'primary'),
          label(`θ = ${THETA_DEG}°`, [1.38, -0.92, 0.3], ROLE.aid, 'detail'),
        ],
      },
      {
        // Every narration stays under 220 characters — `buildSemanticsBlock`
        // clamps each stage there, and a clipped stage hands the tutor half a
        // sentence to teach from.
        narration:
          'The dot product asks how much of A points ALONG B. Drop a perpendicular from A\'s tip onto ' +
          `B: the piece it lands on is |A| cos θ. Multiply by |B| and you get one number — here ` +
          `${round2(dotValue)}, the lawnmower's useful push.`,
        objects: [
          // The perpendicular dropped from A's tip — the component that is NOT
          // along B, and the construction the projection is read from.
          line(aTipL, footL, ROLE.aid, 0.028),
          label('⊥ to B', [-2.42, -0.58, 0], ROLE.aid, 'detail'),
          // The projection itself, drawn ON B and thicker than it.
          line(LEFT, footL, ROLE.result, 0.075),
          dot(footL, ROLE.result, 0.1),
          label('|A| cos θ', [-3.74, -2.05, 0], ROLE.result, 'primary'),
          label(`A · B = |A||B| cos θ = ${round2(dotValue)}`, [-3.0, 2.35, 0], ROLE.result, 'primary'),
          label('a SCALAR — just a number', [-3.0, -2.78, 0], ROLE.ink, 'detail'),
        ],
      },
      {
        narration:
          'The cross product asks what A and B sweep out: a parallelogram of area |A||B| sin θ — here ' +
          `${round2(crossValue)} — and a vector perpendicular to BOTH, pointing where the right-hand ` +
          'rule says. The arrow shows direction, not length.',
        objects: [
          line(aTipR, farR, ROLE.reference, 0.03),
          line(bTipR, farR, ROLE.reference, 0.03),
          // The parallelogram carries the VALUE and the top line carries the
          // RELATION. Keeping both on one label made a 30-character string that
          // wrapped on mobile into a block overhanging the canvas by 44px and
          // colliding with three other labels — measured by checkSceneLayout.
          label(`area = ${round2(crossValue)}`, [3.62, -0.62, 1.1], ROLE.reference, 'detail'),
          arrow(RIGHT, crossTip, ROLE.result),
          label('A × B', [0.42, 1.12, crossTip[2]], ROLE.result, 'primary'),
          // The arrow's DIRECTION is exact; its LENGTH is not, because the cross
          // product is an area and A and B are lengths. That caveat lives in
          // step 3's narration rather than on the canvas: every other authored
          // scene measures clean at all three viewports, and a third label
          // stacked above this arrow was the one thing that put this figure
          // over the mobile budget (checkSceneLayout — collisions with the
          // CROSS PRODUCT heading and the equation row).
          label('⊥ to both', [0.46, 1.72, crossTip[2]], ROLE.aid, 'detail'),
          label('|A×B| = |A||B| sin θ', [2.2, 2.35, 0], ROLE.result, 'primary'),
          label('a VECTOR — with a direction', [2.6, -2.78, 0], ROLE.ink, 'detail'),
        ],
      },
    ],
  }
}

/**
 * The figure's own parameters, exported so the regression test can re-derive
 * the geometry independently instead of restating the numbers it is checking.
 */
export const VECTOR_PRODUCTS_PARAMS = {
  aMag: A_MAG,
  bMag: B_MAG,
  thetaDeg: THETA_DEG,
  scale: SCALE,
  dotValue: A_MAG * B_MAG * Math.cos(rad(THETA_DEG)),
  crossMagnitude: A_MAG * B_MAG * Math.sin(rad(THETA_DEG)),
} as const
