/**
 * Visualization Knowledge Registry (VKR).
 *
 * The pedagogical knowledge source that feeds VisualIntent construction
 * (§7.2, `src/lib/teaching/visualIntent.ts`). Sits ABOVE the visual tier
 * boundary, not inside it:
 *
 *   Tutor Brain -> Visualization Intelligence Engine -> VKR -> VisualIntent -> ADR 12 -> Renderer
 *
 * The registry owns only pedagogical KNOWLEDGE about how a concept ought to
 * be visualized: patterns, objectives, prerequisite/misconception mappings,
 * interaction/animation/narration recommendations, emphasis targets,
 * accessibility guidance, assessment hints, continuation hints. It is
 * deliberately concept-ID-keyed (canonical KG IDs), mirroring the existing
 * `visualRegistry.ts` lookup shape — but that file answers "which renderer
 * exists for this concept" (ADR 12 / production tier); this file answers
 * "what should a visualization of this concept accomplish, pedagogically"
 * (Phase 2 / pedagogical tier). Neither file imports the other.
 *
 * It NEVER owns rendering, SVG/HTML/Canvas, providers, cache, VisualAsset,
 * renderer selection, or LLM calls — those remain ADR 12's (and ADR 14's)
 * territory, untouched here. Pure, deterministic, side-effect-free: a
 * static Record plus lookup functions, same shape as `visualRegistry.ts`.
 */

import type { VisualPurpose, VisualFormClass, CpaRung } from './visualIntent'

// ── Knowledge shapes ─────────────────────────────────────────────────────────

/** A reusable visualization pattern: the pedagogical shape a visual for this
 *  concept should take, expressed in Phase 2's own vocabulary (purpose / form
 *  class / CPA rung) — never a renderer name. */
export interface VisualizationPattern {
  purpose: VisualPurpose
  formClass: VisualFormClass
  cpaRung: CpaRung
  /** One sentence: the proposition this pattern makes perceptible. Mirrors
   *  VisualIntent.claim's contract (§7.2) so a VIE can lift it directly. */
  claim: string
  /** Required when purpose is CONTRAST-DISCRIMINATE (VP-E's one-dimension
   *  discipline, §7.2): the single dimension the minimal pair must vary. */
  mustVaryExactlyOne?: string
}

/** A misconception this concept's visualization must actively guard
 *  against, mapped to the guidance a producer should follow. */
export interface MisconceptionMapping {
  misconception: string
  /** What the visual must do to avoid reinforcing it (maps toward
   *  VisualConstraints.mustNotReveal / mustVaryExactlyOne downstream). */
  guardance: string
}

/** A prerequisite concept the visualization can assume is already
 *  perceptually established, and what it may reuse from it. */
export interface PrerequisiteMapping {
  conceptId: string
  /** What this visualization may build on/reuse from the prerequisite's own
   *  visual treatment (a shared axis convention, a shared shape, etc.). */
  reuses: string
}

/** The full pedagogical knowledge entry for one concept. Every field is
 *  knowledge, never an implementation instruction — a VIE consumes this to
 *  construct a VisualIntent; it does not execute anything itself. */
export interface ConceptVisualKnowledge {
  conceptId: string
  /** One or more reusable patterns, ordered best-first. A VIE picks among
   *  these rather than inventing a purpose/form-class pairing per turn. */
  patterns: readonly VisualizationPattern[]
  /** What the learner should be able to do after this visualization lands. */
  learningObjectives: readonly string[]
  prerequisiteMappings: readonly PrerequisiteMapping[]
  misconceptionMappings: readonly MisconceptionMapping[]
  /** Recommended learner interactions, plain-language (e.g. "drag the
   *  vector tip and watch the components update"). Not an implementation. */
  interactionRecommendations: readonly string[]
  animationRecommendations: readonly string[]
  narrationRecommendations: readonly string[]
  /** What the visual should draw the learner's eye to, and why. */
  emphasisTargets: readonly string[]
  /** VH-3-shaped: the instructional content an accessible description must
   *  convey for this concept specifically. */
  accessibilityGuidance: string
  /** Prompts a mastery check for this visualization can use. */
  assessmentHints: readonly string[]
  /** What should logically follow once this visualization has landed. */
  continuationHints: readonly string[]
}

// ── Registry ──────────────────────────────────────────────────────────────

const REGISTRY: Record<string, ConceptVisualKnowledge> = {
  // ── Physics ────────────────────────────────────────────────────────────
  'phys.meas.scalars-vectors': {
    conceptId: 'phys.meas.scalars-vectors',
    patterns: [
      { purpose: 'CONTRAST-DISCRIMINATE', formClass: 'side-by-side-minimal-pair', cpaRung: 'pictorial',
        claim: 'A vector has both magnitude and direction; a scalar has magnitude only.',
        mustVaryExactlyOne: 'presence of a direction component' },
      { purpose: 'STRUCTURE-REVEAL', formClass: 'labelled-static-diagram', cpaRung: 'pictorial',
        claim: 'An arrow\'s length encodes magnitude and its heading encodes direction.' },
    ],
    learningObjectives: ['Distinguish a vector quantity from a scalar quantity by example', 'Read magnitude and direction off an arrow diagram'],
    prerequisiteMappings: [],
    misconceptionMappings: [
      { misconception: 'Treating vector magnitude alone as the whole quantity (ignoring direction)',
        guardance: 'Always pair the arrow with an explicit direction label; never show magnitude without heading.' },
    ],
    interactionRecommendations: ['Rotate the arrow and observe that magnitude stays fixed while direction changes'],
    animationRecommendations: ['Morph a scalar (a bare number) into a vector by growing a directional arrow from it'],
    narrationRecommendations: ['Name magnitude and direction separately every time the arrow is referenced'],
    emphasisTargets: ['The arrowhead (direction)', 'The arrow length relative to a scale (magnitude)'],
    accessibilityGuidance: 'State both the numeric magnitude and the compass/axis direction in words; do not describe the arrow only by its visual length.',
    assessmentHints: ['Show two arrows of equal length, different heading — ask whether the quantities are equal'],
    continuationHints: ['phys.meas.vector-addition'],
  },
  'phys.meas.vector-addition': {
    conceptId: 'phys.meas.vector-addition',
    patterns: [
      { purpose: 'PROCESS-TRACE', formClass: 'stepped-sequence', cpaRung: 'pictorial',
        claim: 'Placing the second vector\'s tail at the first vector\'s head traces the resultant.' },
    ],
    learningObjectives: ['Construct a resultant vector using the tip-to-tail method'],
    prerequisiteMappings: [{ conceptId: 'phys.meas.scalars-vectors', reuses: 'the arrow-as-magnitude-and-direction convention' }],
    misconceptionMappings: [
      { misconception: 'Adding vector magnitudes arithmetically regardless of direction',
        guardance: 'Never show a numeric sum without the tip-to-tail construction alongside it.' },
    ],
    interactionRecommendations: ['Drag the second vector\'s tail to the first vector\'s head and watch the resultant appear'],
    animationRecommendations: ['Slide the second arrow along its own direction until tail meets head'],
    narrationRecommendations: ['Narrate "tail to head" at the moment of each placement'],
    emphasisTargets: ['The join point between the two vectors', 'The resultant arrow drawn from the very first tail to the very last head'],
    accessibilityGuidance: 'Describe the construction as an ordered sequence of tail-to-head placements, not a static picture.',
    assessmentHints: ['Give two vectors at a right angle; ask for the resultant\'s approximate direction before computing magnitude'],
    continuationHints: ['phys.meas.vector-products'],
  },
  'phys.mech.force': {
    conceptId: 'phys.mech.force',
    patterns: [
      { purpose: 'RELATION-MAP', formClass: 'schematic-with-named-parts', cpaRung: 'pictorial',
        claim: 'A force is a push or pull on an object, drawn as an arrow acting at a point of contact.' },
    ],
    learningObjectives: ['Identify all forces acting on a labelled object'],
    prerequisiteMappings: [{ conceptId: 'phys.meas.scalars-vectors', reuses: 'the arrow-as-vector convention' }],
    misconceptionMappings: [
      { misconception: 'Believing a moving object needs a force in its direction of motion to keep moving',
        guardance: 'Show constant-velocity motion with balanced (not zero) forces, never with no arrows at all.' },
    ],
    interactionRecommendations: ['Toggle candidate forces on/off and observe which combination matches the described motion'],
    animationRecommendations: [],
    narrationRecommendations: ['Name the source and the receiver of every force arrow shown'],
    emphasisTargets: ['The point of application', 'The relative lengths of opposing force arrows'],
    accessibilityGuidance: 'List each force by name, direction, and relative size in a short ordered list.',
    assessmentHints: ['Ask the learner to add a missing force arrow to an incomplete free-body diagram'],
    continuationHints: ['phys.mech.free-body-diagram', 'phys.mech.equilibrium'],
  },
  'phys.mech.velocity': {
    conceptId: 'phys.mech.velocity',
    patterns: [
      { purpose: 'QUANTITY-SENSE', formClass: 'number-line', cpaRung: 'pictorial',
        claim: 'Velocity is the signed rate of change of position along a line.' },
    ],
    learningObjectives: ['Read a velocity\'s sign as direction and its size as speed'],
    prerequisiteMappings: [],
    misconceptionMappings: [
      { misconception: 'Confusing velocity with position (thinking a large velocity means "far away")',
        guardance: 'Keep the position marker and the velocity arrow visually distinct — never overlay them as one glyph.' },
    ],
    interactionRecommendations: ['Drag a marker along the line and watch a synced velocity arrow update in real time'],
    animationRecommendations: ['Animate the marker moving at constant vs. changing speed, side by side'],
    narrationRecommendations: ['State speed and direction as two separate facts each time velocity is mentioned'],
    emphasisTargets: ['Sign of the velocity arrow', 'Rate at which the marker position changes'],
    accessibilityGuidance: 'Report velocity as "moving at X units per second toward [direction]", never as a bare signed number.',
    assessmentHints: ['Show two markers moving at the same speed, opposite direction — ask whether their velocities are equal'],
    continuationHints: ['phys.mech.acceleration'],
  },
  'phys.mech.acceleration': {
    conceptId: 'phys.mech.acceleration',
    patterns: [
      { purpose: 'PROCESS-TRACE', formClass: 'animation-with-prediction-points', cpaRung: 'pictorial',
        claim: 'Acceleration is how fast velocity itself is changing.' },
    ],
    learningObjectives: ['Distinguish a constant-velocity segment from an accelerating one on a motion diagram'],
    prerequisiteMappings: [{ conceptId: 'phys.mech.velocity', reuses: 'the marker-plus-arrow convention, adding a second derived arrow' }],
    misconceptionMappings: [
      { misconception: 'Assuming zero velocity implies zero acceleration (e.g. at the top of a toss)',
        guardance: 'Include at least one worked case where velocity is momentarily zero but acceleration is not.' },
    ],
    interactionRecommendations: ['Pause the animation at a prediction point and ask what happens next'],
    animationRecommendations: ['Animate a ball thrown upward, holding the acceleration arrow constant while the velocity arrow shrinks, vanishes, and reverses'],
    narrationRecommendations: ['Narrate the velocity arrow\'s change explicitly at each animation step'],
    emphasisTargets: ['The moment velocity crosses zero while acceleration does not'],
    accessibilityGuidance: 'Describe acceleration as "the velocity arrow shrinking/growing/reversing over time," anchored to specific timestamps.',
    assessmentHints: ['At the top-of-toss frame, ask for both velocity and acceleration'],
    continuationHints: ['phys.mech.newtons-first-law', 'phys.mech.newtons-second-law'],
  },
  'phys.mech.kinetic-energy': {
    conceptId: 'phys.mech.kinetic-energy',
    patterns: [
      { purpose: 'QUANTITY-SENSE', formClass: 'scaled-comparison', cpaRung: 'pictorial',
        claim: 'Kinetic energy grows with the square of speed, not linearly.' },
    ],
    learningObjectives: ['Predict how doubling speed affects kinetic energy'],
    prerequisiteMappings: [{ conceptId: 'phys.mech.velocity', reuses: 'the speed magnitude already established' }],
    misconceptionMappings: [
      { misconception: 'Assuming kinetic energy doubles when speed doubles (linear intuition)',
        guardance: 'Show the v^2 scaling explicitly with a side-by-side area or bar comparison, not just the formula.' },
    ],
    interactionRecommendations: ['Slide a speed control and watch a bar/area representation grow quadratically'],
    animationRecommendations: [],
    narrationRecommendations: ['State the multiplier (e.g. "4x", not just "more") whenever speed changes'],
    emphasisTargets: ['The quadratic gap between the linear-intuition bar and the true bar'],
    accessibilityGuidance: 'State the numeric ratio explicitly: "doubling speed quadruples kinetic energy."',
    assessmentHints: ['Ask what happens to KE when speed triples, before revealing the answer'],
    continuationHints: ['phys.mech.work-energy-theorem', 'phys.mech.conservation-of-energy'],
  },
  'phys.mech.momentum': {
    conceptId: 'phys.mech.momentum',
    patterns: [
      { purpose: 'PROCESS-TRACE', formClass: 'animation-with-prediction-points', cpaRung: 'pictorial',
        claim: 'Total momentum before a collision equals total momentum after it.' },
    ],
    learningObjectives: ['Predict post-collision velocities using conservation of momentum'],
    prerequisiteMappings: [{ conceptId: 'phys.mech.velocity', reuses: 'the arrow-as-vector convention, scaled by mass' }],
    misconceptionMappings: [
      { misconception: 'Believing the heavier object "wins" and keeps all its velocity',
        guardance: 'Show at least one case where the lighter object ends up moving faster than the heavier one.' },
    ],
    interactionRecommendations: ['Set pre-collision masses and velocities, predict the outcome, then run the collision'],
    animationRecommendations: ['Animate the collision with a running total-momentum readout that stays constant across the impact frame'],
    narrationRecommendations: ['Call out the total-momentum readout before and after impact as the same number'],
    emphasisTargets: ['The unchanged total-momentum readout across the collision instant'],
    accessibilityGuidance: 'State the pre- and post-collision total momentum values explicitly and confirm they match.',
    assessmentHints: ['Given pre-collision values, ask the learner to predict one post-collision velocity'],
    continuationHints: ['phys.mech.conservation-of-momentum', 'phys.mech.impulse'],
  },
  'phys.em.electric-current': {
    conceptId: 'phys.em.electric-current',
    patterns: [
      { purpose: 'PROCESS-TRACE', formClass: 'animation-with-prediction-points', cpaRung: 'pictorial',
        claim: 'Current is the steady, ongoing flow of charge around a closed circuit.' },
    ],
    learningObjectives: ['Trace the direction of conventional current around a simple loop'],
    prerequisiteMappings: [],
    misconceptionMappings: [
      { misconception: 'Believing current is "used up" as it travels around the loop',
        guardance: 'Animate equal charge flow entering and leaving every component, including after the load.' },
    ],
    interactionRecommendations: ['Place a probe at different points on the loop and read the (equal) current at each'],
    animationRecommendations: ['Animate charge markers moving at a constant rate around the full loop'],
    narrationRecommendations: ['State that the current reading is identical at every probed point'],
    emphasisTargets: ['Equal spacing/speed of charge markers before and after the load'],
    accessibilityGuidance: 'State explicitly that current magnitude is the same at every point of a series loop.',
    assessmentHints: ['Ask whether current is larger before or after a bulb in a simple series loop'],
    continuationHints: ['phys.em.ohms-law', 'phys.em.dc-circuits'],
  },
  'phys.em.ohms-law': {
    conceptId: 'phys.em.ohms-law',
    patterns: [
      { purpose: 'RELATION-MAP', formClass: 'plot', cpaRung: 'abstract',
        claim: 'Voltage, current and resistance vary together; fixing any two determines the third.' },
    ],
    learningObjectives: ['Predict how current changes when voltage or resistance changes'],
    prerequisiteMappings: [{ conceptId: 'phys.em.electric-current', reuses: 'the loop and probe convention' }],
    misconceptionMappings: [
      { misconception: 'Treating V, I and R as independent instead of linked by one relationship',
        guardance: 'Always change one slider and show the dependent one move automatically, never let all three float freely.' },
    ],
    interactionRecommendations: ['Drag a resistance slider and watch the current update on a live V-I plot'],
    animationRecommendations: [],
    narrationRecommendations: ['Name which quantity is held fixed before each change'],
    emphasisTargets: ['The slope of the V-I line as the resistance value'],
    accessibilityGuidance: 'State the held-fixed quantity and the resulting change in words, not just the plotted line.',
    assessmentHints: ['Ask what happens to current if resistance doubles at fixed voltage'],
    continuationHints: ['phys.em.dc-circuits'],
  },
  'phys.mech.work': {
    conceptId: 'phys.mech.work',
    patterns: [
      { purpose: 'QUANTITY-SENSE', formClass: 'plot', cpaRung: 'abstract',
        claim: 'Work done is the area under a force-versus-displacement graph.' },
    ],
    learningObjectives: ['Read work done off the area under a force-displacement curve'],
    prerequisiteMappings: [{ conceptId: 'phys.mech.force', reuses: 'the force-arrow convention, now plotted against displacement' }],
    misconceptionMappings: [
      { misconception: 'Believing work is done whenever a force is applied, even with zero displacement',
        guardance: 'Include a worked example of a force applied to a stationary object, with zero shaded area.' },
    ],
    interactionRecommendations: ['Shade the region under the curve between two chosen displacement points'],
    animationRecommendations: [],
    narrationRecommendations: ['Name the shaded area as the work value each time it is highlighted'],
    emphasisTargets: ['The shaded area, not the curve\'s height alone'],
    accessibilityGuidance: 'State the numeric area value and the displacement interval it spans.',
    assessmentHints: ['Give a force applied with zero displacement; ask for the work done'],
    continuationHints: ['phys.mech.work-energy-theorem'],
  },

  // ── Mathematics ───────────────────────────────────────────────────────────
  'math.arith.fractions': {
    conceptId: 'math.arith.fractions',
    patterns: [
      { purpose: 'STRUCTURE-REVEAL', formClass: 'labelled-static-diagram', cpaRung: 'pictorial',
        claim: 'A fraction names how many equal parts of a whole are being counted.' },
    ],
    learningObjectives: ['Identify the numerator and denominator\'s separate roles from a shaded region'],
    prerequisiteMappings: [],
    misconceptionMappings: [
      { misconception: 'Believing a larger denominator always means a larger fraction',
        guardance: 'Show two shaded regions with the same numerator, different denominators, and compare the shaded area directly.' },
    ],
    interactionRecommendations: ['Drag a slider to change the number of shaded parts out of a fixed total'],
    animationRecommendations: [],
    narrationRecommendations: ['Name "parts shaded" and "parts total" separately every time'],
    emphasisTargets: ['The boundary between shaded and unshaded regions', 'The equal size of every part'],
    accessibilityGuidance: 'State "X shaded parts out of Y equal parts" rather than describing shading visually.',
    assessmentHints: ['Show 1/3 and 1/5 shaded regions side by side; ask which is larger'],
    continuationHints: ['math.arith.fraction-equivalence', 'math.arith.fraction-addition'],
  },
  'math.arith.fraction-addition': {
    conceptId: 'math.arith.fraction-addition',
    patterns: [
      { purpose: 'PROCESS-TRACE', formClass: 'stepped-sequence', cpaRung: 'pictorial',
        claim: 'Fractions must share equal-sized parts (a common denominator) before their counts can be added.' },
    ],
    learningObjectives: ['Explain why unlike denominators must be converted before adding'],
    prerequisiteMappings: [{ conceptId: 'math.arith.fractions', reuses: 'the shaded-parts-of-a-whole convention' }],
    misconceptionMappings: [
      { misconception: 'Adding numerators and denominators straight across (1/2 + 1/3 = 2/5)',
        guardance: 'Always show the re-partitioning step that equalizes part size before any addition happens.' },
    ],
    interactionRecommendations: ['Split both wholes into a common number of parts, then count the shaded total'],
    animationRecommendations: ['Animate each whole re-partitioning into equal-size pieces before the shaded regions merge'],
    narrationRecommendations: ['Narrate "now the parts are the same size" as the re-partition completes'],
    emphasisTargets: ['The moment part sizes become equal across both fractions'],
    accessibilityGuidance: 'Describe the re-partition step explicitly before stating the summed count.',
    assessmentHints: ['Ask the learner to identify the missing re-partition step in a wrong straight-across sum'],
    continuationHints: ['math.arith.fraction-simplification'],
  },
  'math.func.function-concept': {
    conceptId: 'math.func.function-concept',
    patterns: [
      { purpose: 'RELATION-MAP', formClass: 'schematic-with-named-parts', cpaRung: 'pictorial',
        claim: 'A function assigns each input exactly one output.' },
    ],
    learningObjectives: ['Determine whether a given input-output mapping qualifies as a function'],
    prerequisiteMappings: [],
    misconceptionMappings: [
      { misconception: 'Believing every relation between two sets is automatically a function',
        guardance: 'Include one counter-example mapping where an input has two arrows out, and mark it invalid.' },
    ],
    interactionRecommendations: ['Toggle candidate arrows on/off and get feedback on whether the mapping is still a function'],
    animationRecommendations: [],
    narrationRecommendations: ['State "exactly one output" whenever a valid mapping is confirmed'],
    emphasisTargets: ['Any input with more than one outgoing arrow'],
    accessibilityGuidance: 'List each input-output pair as text; flag any input listed twice with different outputs.',
    assessmentHints: ['Present a mapping diagram with one double-arrow input; ask if it is a function'],
    continuationHints: ['math.func.function-notation', 'math.func.graph-of-function'],
  },
  'math.func.graph-of-function': {
    conceptId: 'math.func.graph-of-function',
    patterns: [
      { purpose: 'STRUCTURE-REVEAL', formClass: 'plot', cpaRung: 'abstract',
        claim: 'A function\'s graph is the set of all (input, output) points plotted on axes.' },
      { purpose: 'CONTRAST-DISCRIMINATE', formClass: 'side-by-side-minimal-pair', cpaRung: 'abstract',
        claim: 'A curve is a valid function graph only if every vertical line crosses it at most once.',
        mustVaryExactlyOne: 'whether the vertical line test passes' },
    ],
    learningObjectives: ['Apply the vertical line test to decide whether a curve is a function'],
    prerequisiteMappings: [{ conceptId: 'math.func.function-concept', reuses: 'the exactly-one-output rule, now read spatially' }],
    misconceptionMappings: [
      { misconception: 'Believing any smooth curve on axes represents a function',
        guardance: 'Include one curve that fails the vertical line test (e.g. a circle) alongside one that passes.' },
    ],
    interactionRecommendations: ['Drag a vertical line across the plotted curve and count crossings live'],
    animationRecommendations: ['Sweep the vertical line left to right, highlighting crossing count at each position'],
    narrationRecommendations: ['State the crossing count at each sweep position'],
    emphasisTargets: ['Any position where the vertical line crosses the curve more than once'],
    accessibilityGuidance: 'State whether the maximum vertical-line crossing count is 1 (function) or more (not a function).',
    assessmentHints: ['Show a circle and a parabola; ask which passes the vertical line test'],
    continuationHints: ['math.func.linear-function', 'math.func.quadratic-function'],
  },
  'math.geom.triangle': {
    conceptId: 'math.geom.triangle',
    patterns: [
      { purpose: 'STRUCTURE-REVEAL', formClass: 'labelled-static-diagram', cpaRung: 'pictorial',
        claim: 'A triangle is a closed shape with exactly three straight sides and three angles.' },
    ],
    learningObjectives: ['Identify the three sides and three vertices on a labelled triangle'],
    prerequisiteMappings: [],
    misconceptionMappings: [
      { misconception: 'Believing "triangle" means only the equilateral, upright prototype shape',
        guardance: 'Show scalene, obtuse, and rotated triangles alongside the prototype, all correctly labelled as triangles.' },
    ],
    interactionRecommendations: ['Drag a vertex and watch the triangle deform while remaining a valid triangle'],
    animationRecommendations: [],
    narrationRecommendations: ['Name each vertex and side as it is highlighted'],
    emphasisTargets: ['The three vertices', 'The three straight sides'],
    accessibilityGuidance: 'List the three vertex labels and the three side lengths/relationships in words.',
    assessmentHints: ['Show a rotated, non-prototype triangle; ask if it is still a triangle'],
    continuationHints: ['math.geom.triangle-types', 'math.geom.triangle-angle-sum'],
  },
  'math.geom.congruent-triangles': {
    conceptId: 'math.geom.congruent-triangles',
    patterns: [
      { purpose: 'CONTRAST-DISCRIMINATE', formClass: 'side-by-side-minimal-pair', cpaRung: 'pictorial',
        claim: 'Congruent triangles have identical corresponding sides and angles, regardless of orientation.',
        mustVaryExactlyOne: 'orientation (rotation/reflection) only' },
    ],
    learningObjectives: ['Match corresponding sides and angles between two congruent triangles shown in different orientations'],
    prerequisiteMappings: [{ conceptId: 'math.geom.triangle', reuses: 'the vertex/side labelling convention' }],
    misconceptionMappings: [
      { misconception: 'Believing two triangles must look identically oriented to be congruent',
        guardance: 'Show one triangle rotated or reflected relative to the other, both still marked congruent.' },
    ],
    interactionRecommendations: ['Rotate/flip one triangle onto the other and confirm the overlap'],
    animationRecommendations: ['Animate one triangle sliding, rotating, and flipping until it exactly overlaps the other'],
    narrationRecommendations: ['Name each pair of corresponding parts as the overlap is demonstrated'],
    emphasisTargets: ['The moment of exact overlap after rotation/reflection'],
    accessibilityGuidance: 'List each corresponding side and angle pair explicitly by label.',
    assessmentHints: ['Show two triangles in different orientations; ask the learner to name corresponding vertices'],
    continuationHints: ['math.geom.similar-triangles'],
  },

  // ── Chemistry ─────────────────────────────────────────────────────────────
  'chem.atomic.atomic-theory': {
    conceptId: 'chem.atomic.atomic-theory',
    patterns: [
      { purpose: 'STRUCTURE-REVEAL', formClass: 'exploded-view', cpaRung: 'pictorial',
        claim: 'An atom has a dense, positively charged nucleus surrounded by orbiting electrons.' },
    ],
    learningObjectives: ['Locate the nucleus, protons, neutrons, and electrons on a labelled atom diagram'],
    prerequisiteMappings: [],
    misconceptionMappings: [
      { misconception: 'Believing the atom is mostly solid matter rather than mostly empty space',
        guardance: 'Draw the nucleus at true relative scale (a tiny dot) against the much larger electron cloud radius.' },
    ],
    interactionRecommendations: ['Zoom from the whole atom into the nucleus to reveal proton/neutron composition'],
    animationRecommendations: [],
    narrationRecommendations: ['State the relative size difference between nucleus and atom explicitly'],
    emphasisTargets: ['The scale gap between nucleus size and electron cloud size'],
    accessibilityGuidance: 'State proton, neutron, and electron counts and their charges in words, not just as diagram dots.',
    assessmentHints: ['Ask the learner to identify which particle carries no charge'],
    continuationHints: ['chem.atomic.subatomic-particles', 'chem.atomic.electronic-config'],
  },
  'chem.atomic.electronic-config': {
    conceptId: 'chem.atomic.electronic-config',
    patterns: [
      { purpose: 'PROCESS-TRACE', formClass: 'stepped-sequence', cpaRung: 'pictorial',
        claim: 'Electrons fill shells in order, from lowest energy outward.' },
    ],
    learningObjectives: ['Write the shell-by-shell electron configuration for a given atomic number'],
    prerequisiteMappings: [{ conceptId: 'chem.atomic.atomic-theory', reuses: 'the nucleus-plus-electron-cloud structure' }],
    misconceptionMappings: [
      { misconception: 'Filling outer shells before inner shells are full',
        guardance: 'Animate strictly in fill order, disallowing any outer-shell electron from appearing before its inner shell is at capacity.' },
    ],
    interactionRecommendations: ['Step through electron placement one at a time, choosing the next valid shell'],
    animationRecommendations: ['Animate electrons dropping into shells one by one in energy order'],
    narrationRecommendations: ['Announce the shell capacity reached at each fill step'],
    emphasisTargets: ['The shell currently being filled'],
    accessibilityGuidance: 'State the electron count per shell as an ordered list (e.g. "2, 8, 1").',
    assessmentHints: ['Ask for the next shell to fill given a partially completed configuration'],
    continuationHints: ['chem.bond.ionic-bonding', 'chem.bond.covalent-bonding'],
  },
  'chem.bond.ionic-bonding': {
    conceptId: 'chem.bond.ionic-bonding',
    patterns: [
      { purpose: 'PROCESS-TRACE', formClass: 'stepped-sequence', cpaRung: 'pictorial',
        claim: 'An ionic bond forms when one atom transfers electrons to another, creating oppositely charged ions that attract.' },
    ],
    learningObjectives: ['Trace electron transfer from a metal atom to a non-metal atom and identify the resulting ions'],
    prerequisiteMappings: [{ conceptId: 'chem.atomic.electronic-config', reuses: 'the shell-filling convention, now showing a shell emptying/filling by transfer' }],
    misconceptionMappings: [
      { misconception: 'Believing electrons are shared, not transferred, in an ionic bond',
        guardance: 'Animate the electron moving fully from one atom\'s outer shell to the other\'s, never showing it shared between both.' },
    ],
    interactionRecommendations: ['Drag an electron from the metal atom\'s outer shell to the non-metal atom\'s outer shell'],
    animationRecommendations: ['Animate the electron transfer, then the resulting attraction between the now-charged ions'],
    narrationRecommendations: ['State each ion\'s resulting charge immediately after the transfer'],
    emphasisTargets: ['The single transferred electron', 'The resulting + / - charge labels'],
    accessibilityGuidance: 'State which atom loses and which gains the electron, and the resulting charge on each.',
    assessmentHints: ['Ask which atom becomes the cation after the transfer'],
    continuationHints: ['chem.bond.covalent-bonding'],
  },
  'chem.bond.covalent-bonding': {
    conceptId: 'chem.bond.covalent-bonding',
    patterns: [
      { purpose: 'CONTRAST-DISCRIMINATE', formClass: 'side-by-side-minimal-pair', cpaRung: 'pictorial',
        claim: 'A covalent bond forms when atoms share, rather than transfer, electron pairs.',
        mustVaryExactlyOne: 'whether the electron pair is shared or transferred' },
    ],
    learningObjectives: ['Distinguish a shared electron pair from a transferred electron'],
    prerequisiteMappings: [{ conceptId: 'chem.bond.ionic-bonding', reuses: 'the electron-as-dot convention, contrasted rather than transferred' }],
    misconceptionMappings: [
      { misconception: 'Believing covalent bonding also transfers electrons fully to one atom',
        guardance: 'Keep the shared electron pair visually positioned between both nuclei, never resting fully inside either shell.' },
    ],
    interactionRecommendations: ['Drag two atoms together and watch a shared electron pair form between them'],
    animationRecommendations: [],
    narrationRecommendations: ['State "shared, not transferred" explicitly when the bond forms'],
    emphasisTargets: ['The shared electron pair positioned between the two nuclei'],
    accessibilityGuidance: 'State that the electron pair is shared between both atoms, positioned between their nuclei.',
    assessmentHints: ['Ask the learner to contrast this diagram with an ionic-bonding one shown earlier'],
    continuationHints: ['chem.bond.vsepr'],
  },
  'chem.bond.vsepr': {
    conceptId: 'chem.bond.vsepr',
    patterns: [
      { purpose: 'MODEL-EXTERNALIZE', formClass: 'bounded-interactive', cpaRung: 'concrete',
        claim: 'A molecule\'s 3D shape comes from electron pairs (bonding and lone) repelling each other into the most spread-out arrangement.' },
    ],
    learningObjectives: ['Predict a simple molecule\'s 3D shape from its count of bonding and lone electron pairs'],
    prerequisiteMappings: [{ conceptId: 'chem.bond.covalent-bonding', reuses: 'the shared electron pair as the unit being spatially arranged' }],
    misconceptionMappings: [
      { misconception: 'Ignoring lone pairs when predicting molecular shape',
        guardance: 'Always render lone pairs as space-occupying regions, even though they have no attached atom to show.' },
    ],
    interactionRecommendations: ['Rotate the 3D molecule model and count bonding vs. lone electron-pair regions'],
    animationRecommendations: ['Animate the electron-pair regions repelling into their final spread-out arrangement'],
    narrationRecommendations: ['Name the total electron-pair count and the resulting shape name'],
    emphasisTargets: ['Lone pair regions', 'The angle between bonding pairs'],
    accessibilityGuidance: 'State the electron-pair geometry name (e.g. "tetrahedral") and the count of bonding vs. lone pairs.',
    assessmentHints: ['Ask for the shape name given a bonding/lone pair count'],
    continuationHints: [],
  },

  // ── Biology ───────────────────────────────────────────────────────────────
  'bio.cell.cell-theory': {
    conceptId: 'bio.cell.cell-theory',
    patterns: [
      { purpose: 'STRUCTURE-REVEAL', formClass: 'labelled-static-diagram', cpaRung: 'pictorial',
        claim: 'All living things are made of one or more cells, the basic unit of life.' },
    ],
    learningObjectives: ['Identify a cell as the structural unit shared across different organisms'],
    prerequisiteMappings: [],
    misconceptionMappings: [
      { misconception: 'Believing only large/complex organisms are made of cells',
        guardance: 'Show a single-celled organism alongside a multicellular one, both labelled as made of cells.' },
    ],
    interactionRecommendations: ['Zoom from a whole organism down to a single labelled cell'],
    animationRecommendations: [],
    narrationRecommendations: ['State the organism scale before zooming to the cell scale'],
    emphasisTargets: ['The cell boundary at each zoom level'],
    accessibilityGuidance: 'State explicitly that both organisms shown are made of cells, at their respective scales.',
    assessmentHints: ['Ask whether a single-celled organism is still made of cells'],
    continuationHints: ['bio.cell.eukaryotic-cell', 'bio.cell.prokaryotic-cell'],
  },
  'bio.cell.eukaryotic-cell': {
    conceptId: 'bio.cell.eukaryotic-cell',
    patterns: [
      { purpose: 'STRUCTURE-REVEAL', formClass: 'exploded-view', cpaRung: 'pictorial',
        claim: 'A eukaryotic cell contains a membrane-bound nucleus and multiple specialized organelles.' },
    ],
    learningObjectives: ['Name and locate the nucleus and at least three organelles in a labelled cell diagram'],
    prerequisiteMappings: [{ conceptId: 'bio.cell.cell-theory', reuses: 'the cell-as-basic-unit framing, now viewed internally' }],
    misconceptionMappings: [
      { misconception: 'Believing organelles float freely with no organization inside the cell',
        guardance: 'Position each organelle at its characteristic location (e.g. nucleus central, mitochondria distributed) rather than randomly.' },
    ],
    interactionRecommendations: ['Click each organelle to reveal its name and one function'],
    animationRecommendations: [],
    narrationRecommendations: ['Name the organelle and its one-sentence function together'],
    emphasisTargets: ['The nuclear membrane boundary', 'Organelle boundaries distinct from the cytoplasm'],
    accessibilityGuidance: 'List each organelle by name with its function, in a fixed reading order (nucleus first).',
    assessmentHints: ['Ask the learner to name the organelle responsible for energy production'],
    continuationHints: ['bio.cell.mitochondria-energy', 'bio.cell.nucleus-chromosomes'],
  },
  'bio.cell.mitosis': {
    conceptId: 'bio.cell.mitosis',
    patterns: [
      { purpose: 'PROCESS-TRACE', formClass: 'stepped-sequence', cpaRung: 'pictorial',
        claim: 'Mitosis produces two genetically identical daughter cells through an ordered sequence of phases.' },
    ],
    learningObjectives: ['Order the phases of mitosis and identify what happens to the chromosomes in each'],
    prerequisiteMappings: [{ conceptId: 'bio.cell.nucleus-chromosomes', reuses: 'the chromosome-inside-nucleus representation, now animated over time' }],
    misconceptionMappings: [
      { misconception: 'Believing the daughter cells end up with different genetic material',
        guardance: 'Render both daughter cells with visually identical chromosome sets at the final frame.' },
    ],
    interactionRecommendations: ['Step through each phase one click at a time and predict the next phase'],
    animationRecommendations: ['Animate chromosomes condensing, aligning, separating, and the cell dividing, in phase order'],
    narrationRecommendations: ['Name the current phase at each step'],
    emphasisTargets: ['The moment sister chromatids separate'],
    accessibilityGuidance: 'Name each phase in order and state what happens to the chromosomes during it.',
    assessmentHints: ['Show two out-of-order phase images; ask which comes first'],
    continuationHints: ['bio.cell.meiosis'],
  },

  // ── English ───────────────────────────────────────────────────────────────
  'eng.grammar.simple-sentences': {
    conceptId: 'eng.grammar.simple-sentences',
    patterns: [
      { purpose: 'STRUCTURE-REVEAL', formClass: 'annotation-overlay', cpaRung: 'abstract',
        claim: 'A simple sentence contains exactly one independent clause: a subject and a verb expressing a complete thought.' },
    ],
    learningObjectives: ['Underline the subject and verb in a simple sentence and confirm the thought is complete'],
    prerequisiteMappings: [],
    misconceptionMappings: [
      { misconception: 'Believing sentence length determines whether it is "simple" (assuming short = simple, long = complex)',
        guardance: 'Include one long simple sentence with compound subjects/objects, still one clause, alongside one short complex sentence.' },
    ],
    interactionRecommendations: ['Click the subject, then the verb, in a given sentence to confirm the clause is complete'],
    animationRecommendations: [],
    narrationRecommendations: ['Name "subject" and "verb" as each is highlighted'],
    emphasisTargets: ['The single subject-verb pairing'],
    accessibilityGuidance: 'State the subject and verb explicitly rather than relying on colour or underline alone.',
    assessmentHints: ['Show a long simple sentence and a short complex one; ask which is grammatically simple'],
    continuationHints: ['eng.grammar.compound-sentences', 'eng.grammar.complex-sentences'],
  },
  'eng.writing.paragraph-structure': {
    conceptId: 'eng.writing.paragraph-structure',
    patterns: [
      { purpose: 'STRUCTURE-REVEAL', formClass: 'annotation-overlay', cpaRung: 'abstract',
        claim: 'A paragraph is built from a topic sentence, supporting sentences, and a concluding sentence, in that role order.' },
    ],
    learningObjectives: ['Label the topic, supporting, and concluding sentences within a sample paragraph'],
    prerequisiteMappings: [{ conceptId: 'eng.grammar.simple-sentences', reuses: 'the sentence-as-unit boundary, now grouped by role' }],
    misconceptionMappings: [
      { misconception: 'Believing every sentence in a paragraph carries equal structural weight',
        guardance: 'Visually differentiate the topic sentence\'s role (colour/border) from the supporting sentences\', never rendering them identically.' },
    ],
    interactionRecommendations: ['Drag sentence blocks into topic / supporting / concluding roles'],
    animationRecommendations: [],
    narrationRecommendations: ['Name the role of each sentence as it is highlighted'],
    emphasisTargets: ['The topic sentence', 'The concluding sentence'],
    accessibilityGuidance: 'List each sentence with its assigned role (topic, supporting, or concluding) as text.',
    assessmentHints: ['Give a paragraph with the topic sentence moved to the middle; ask the learner to identify it'],
    continuationHints: ['eng.writing.topic-sentences'],
  },
}

// ── Lookup API ────────────────────────────────────────────────────────────

/** Look up the pedagogical visualization knowledge for a canonical KG
 *  concept ID. Returns null when the concept has no registry entry — the
 *  caller (a VIE) should fall back to whatever default-purpose logic it
 *  already has, never fabricate registry content. */
export function lookupVisualKnowledge(conceptId: string | null): ConceptVisualKnowledge | null {
  if (!conceptId) return null
  return REGISTRY[conceptId] ?? null
}

/** True iff the registry carries an entry for this concept. */
export function hasVisualKnowledge(conceptId: string | null): boolean {
  return conceptId !== null && conceptId in REGISTRY
}

/** The best (first-listed) reusable pattern for a concept, or null. A VIE
 *  uses this as the default pattern when it has no turn-specific reason to
 *  pick a different one from `patterns`. */
export function bestPatternFor(conceptId: string | null): VisualizationPattern | null {
  return lookupVisualKnowledge(conceptId)?.patterns[0] ?? null
}

/** Every concept ID currently covered by the registry, for coverage
 *  reporting / tests. Order is insertion order (not significant). */
export function registeredConceptIds(): readonly string[] {
  return Object.keys(REGISTRY)
}
