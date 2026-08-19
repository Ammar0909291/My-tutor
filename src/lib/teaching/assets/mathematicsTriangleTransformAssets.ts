/**
 * Twenty-second batch — the angle facts, the distance fact, and the two
 * transformations that change size or turn.
 *
 * There is one spine running through the first half of this batch, and
 * the registers show learners never being shown it:
 *
 *   parallel lines  ->  triangle angle sum  ->  polygon angle sum
 *
 * The triangle's 180° is PROVED from parallel-line angles; the polygon's
 * (n−2)×180° is the triangle result applied n−2 times. Three registers
 * independently record these being memorised as separate facts, which is
 * also why the polygon formula gets misremembered as n×180°.
 *
 *   ANGLES      parallel-lines, triangle-angle-sum, polygon-angle-sum
 *   RIGHT       pythagorean-theorem, distance-formula. The second IS the
 *               first, in coordinates — not a new formula to learn.
 *   SHAPES      quadrilateral. Where the categories nest rather than
 *               exclude, and a square is all four things at once.
 *   TRANSFORMS  rotation, dilation. What is preserved, and what is not.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const PAR = 'math.geom.parallel-lines'
const TAS = 'math.geom.triangle-angle-sum'
const PAS = 'math.geom.polygon-angle-sum'
const PYTH = 'math.geom.pythagorean-theorem'
const DIST = 'math.geom.distance-formula'
const QUADR = 'math.geom.quadrilateral'
const ROT = 'math.geom.rotation'
const DIL = 'math.geom.dilation'

export const MATHEMATICS_TRIANGLE_TRANSFORM_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: PAR, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'Two parallel lines cut by a transversal produce eight angles, and only TWO distinct '
      + 'sizes among them — every angle is either equal to a given one or supplementary to '
      + 'it. That single fact is all three named relationships at once.\n\n'
      + 'CORRESPONDING angles (same position at each crossing) are equal. ALTERNATE INTERIOR '
      + 'angles (opposite sides of the transversal, between the lines) are equal. CO-INTERIOR '
      + 'angles (same side, between the lines) sum to 180°. These are not three facts to '
      + 'memorise — mark one angle, and vertical angles and the straight line fill in the '
      + 'other seven.\n\n'
      + 'The relationship runs BOTH ways, and this is the half usually left out. If the lines '
      + 'are parallel the angles are equal — and if the angles are equal the lines MUST be '
      + 'parallel. That converse is what lets you PROVE two lines parallel rather than only '
      + 'read angles off lines already known to be, and it is what makes the triangle angle '
      + 'sum provable at all.',
    targetedMisconceptions: [`${PAR}:MC-1`, `${PAR}:MC-2`],
    source: eb(PAR, 'Identity + Misconception register — one fact, three names; the converse is what proves things'),
  },
  {
    conceptId: TAS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'Every triangle\'s three angles sum to exactly 180°. Not approximately, and not usually '
      + '— it is proved, so measuring carefully and getting 179° means the protractor was off '
      + 'rather than the theorem.\n\n'
      + 'The proof takes one line: draw a line through one vertex parallel to the opposite '
      + 'side. The two base angles reappear at that vertex as alternate interior angles, and '
      + 'the three angles now sit along a straight line — which is 180°. This is why parallel '
      + 'lines come first: the triangle fact is a CONSEQUENCE of them, not a separate thing '
      + 'to remember.\n\n'
      + 'It holds for every triangle without exception — tiny, enormous, right, obtuse, '
      + 'scalene. Size changes the SIDES and the AREA, not the angle sum, and a triangle the '
      + 'size of a country still sums to 180° (as long as the country is flat; on a sphere it '
      + 'genuinely exceeds 180°, which is a different geometry with a different parallel '
      + 'axiom, and exactly why that axiom is doing the work here).',
    targetedMisconceptions: [`${TAS}:MC-1`, `${TAS}:MC-2`],
    source: eb(TAS, 'Identity + Misconception register — proved not measured; size does not scale the sum'),
  },
  {
    conceptId: PAS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'A convex n-gon\'s interior angles sum to (n − 2) × 180°. The reason is the subtraction: '
      + 'pick one vertex and draw diagonals from it, and the polygon splits into exactly '
      + 'n − 2 triangles — a quadrilateral gives 2, a pentagon 3 — each contributing 180°.\n\n'
      + 'So it is NOT n × 180°, and the −2 is not a correction factor. A quadrilateral has '
      + 'four vertices and only two triangles, giving 360°; using n × 180° would claim 720° '
      + 'and every angle would average 180°, which would make the shape a straight line. '
      + 'Counting the triangles is the check that catches this instantly.\n\n'
      + 'Dividing by n gives EACH angle only when the polygon is REGULAR. For an irregular '
      + 'pentagon the total is still 540° and the individual angles differ, so the division '
      + 'answers a question nobody asked. Exterior angles behave differently and more simply: '
      + 'they sum to 360° for any convex polygon whatever n is, because walking once round '
      + 'the boundary turns you through a full circle.',
    targetedMisconceptions: [`${PAS}:MC-1`, `${PAS}:MC-2`],
    source: eb(PAS, 'Identity + Misconception register — n−2 triangles; per-angle division needs regularity'),
  },
  {
    conceptId: PYTH, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'In a RIGHT triangle, a² + b² = c², where c is the hypotenuse — the side opposite the '
      + 'right angle, and always the longest. The squares are literal: build a square on each '
      + 'side and the two smaller ones have exactly the area of the big one.\n\n'
      + 'The right angle is a condition, not scenery. On a triangle with no right angle the '
      + 'relation simply fails, and applying it anyway produces a confident wrong answer with '
      + 'nothing to flag it.\n\n'
      + 'Identify c before substituting. If you know the hypotenuse and one leg, the unknown '
      + 'leg comes from SUBTRACTION: with c = 5 and a = 3, b² = 25 − 9 = 16, so b = 4. Adding '
      + 'the two known squares whatever their roles is the commonest failure here, and it '
      + 'gives 34 — a number larger than the hypotenuse\'s square, which is impossible and is '
      + 'worth noticing as the check.',
    targetedMisconceptions: [`${PYTH}:MC-1`, `${PYTH}:MC-3`],
    source: eb(PYTH, 'Identity + Misconception register — identify c first; the missing leg subtracts'),
  },
  {
    conceptId: DIST, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'The distance between (x₁, y₁) and (x₂, y₂) is √((x₂−x₁)² + (y₂−y₁)²). This is not a '
      + 'new formula: the horizontal gap and the vertical gap are the legs of a right '
      + 'triangle, and the distance is its hypotenuse. It is the Pythagorean theorem wearing '
      + 'coordinates.\n\n'
      + 'The squaring is doing real work and cannot be skipped. From (0,0) to (3,4) the gaps '
      + 'are 3 and 4; adding them gives 7, which is the distance you would walk along the '
      + 'grid, while the straight-line distance is 5. Both are real quantities and only one '
      + 'was asked for.\n\n'
      + 'Order does not matter. (x₂−x₁)² and (x₁−x₂)² are equal, because squaring destroys '
      + 'the sign — so there is no need to decide which point is "first", and a negative '
      + 'intermediate difference is not an error. Nor do horizontal and vertical segments '
      + 'need special handling: from (2,5) to (2,9) the x-difference is 0, the formula gives '
      + '√16 = 4, and it has quietly reduced to simple subtraction on its own.',
    targetedMisconceptions: [`${DIST}:MC-1`, `${DIST}:MC-2`],
    source: eb(DIST, 'Identity + Misconception register — Pythagoras in coordinates; order is irrelevant'),
  },
  {
    conceptId: QUADR, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'A quadrilateral is any four-sided polygon, and the named types are defined by '
      + 'PROPERTIES rather than by appearance. Parallelogram: both pairs of opposite sides '
      + 'parallel. Rectangle: a parallelogram with right angles. Rhombus: a parallelogram '
      + 'with all sides equal. Square: both.\n\n'
      + 'The categories NEST, they do not exclude. Every square is a rectangle, a rhombus, a '
      + 'parallelogram and a quadrilateral, all at once — so "is this a rectangle or a '
      + 'square?" is a false choice, and the answer for a square is both. Treating the names '
      + 'as a set of separate boxes is the recorded error and it makes half the classification '
      + 'questions unanswerable.\n\n'
      + 'The nesting is not an arbitrary convention either: it exists so that every theorem '
      + 'about parallelograms applies automatically to rectangles, rhombuses and squares '
      + 'without being restated four times. And classification is by properties, not by the '
      + 'picture — a square balanced on a corner is still a square, and a rectangle drawn '
      + 'nearly square is not one unless its angles are right.',
    targetedMisconceptions: [`${QUADR}:MC-1`, `${QUADR}:MC-2`],
    source: eb(QUADR, 'Identity + Misconception register — the categories nest; properties not appearance'),
  },
  {
    conceptId: ROT, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A rotation turns every point through an angle θ about a fixed centre. Distances from '
      + 'that centre are unchanged — that is what "turning" means — so the image is congruent '
      + 'to the original and orientation is preserved, unlike a reflection.\n\n'
      + 'About the ORIGIN, the matrix is [cos θ, −sin θ; sin θ, cos θ], with positive θ '
      + 'meaning anticlockwise. The minus sign sits in the top right, and putting it '
      + 'elsewhere rotates the wrong way — testing on (1, 0) with θ = 90° settles it, since '
      + 'the answer must be (0, 1).\n\n'
      + 'About any OTHER centre, the matrix alone is wrong. Translate so the centre goes to '
      + 'the origin, rotate, then translate back: to turn about (2, 3) you subtract (2, 3), '
      + 'apply the matrix, and add (2, 3) again. Skipping the shift rotates about the origin '
      + 'instead and moves the whole figure somewhere it should not be — and the centre '
      + 'itself is the test, since a rotation must leave its own centre exactly where it '
      + 'was.',
    targetedMisconceptions: [`${ROT}:MC-1`, `${ROT}:MC-2`],
    source: eb(ROT, 'Identity + Misconception register — the sign convention; translate for a non-origin centre'),
  },
  {
    conceptId: DIL, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A dilation scales every distance from a fixed centre by a factor k, producing a '
      + 'SIMILAR figure — same shape, different size. Angles survive unchanged; lengths '
      + 'multiply by k.\n\n'
      + 'Area multiplies by k², not by k. Dilating by 3 makes each length three times longer '
      + 'and the area NINE times bigger, for the same reason doubling a rectangle\'s sides '
      + 'quadruples it: area is a product of two lengths and each picks up its own factor. '
      + 'Volume, by the same argument, scales by k³.\n\n'
      + 'The centre is chosen, not fixed at the origin, and the figure moves as well as grows '
      + 'unless its centre is the point you dilated about. A negative k both scales and sends '
      + 'every point through the centre to the far side — which is a 180° rotation combined '
      + 'with the scaling, and NOT a reflection: a reflection reverses orientation and this '
      + 'does not, so labelling it a flip predicts the wrong image.',
    targetedMisconceptions: [`${DIL}:MC-1`, `${DIL}:MC-3`],
    source: eb(DIL, 'Identity + Misconception register — area scales by k²; negative k is not a reflection'),
  },
]

export const MATHEMATICS_TRIANGLE_TRANSFORM_PROBES: SeedProbe[] = [
  // --- math.geom.parallel-lines -----------------------------------------------------
  {
    conceptId: PAR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'A transversal cuts two parallel lines. How many DIFFERENT angle sizes appear among the eight angles?',
    choices: [
      { text: 'Two — every angle is either equal to a given one or supplementary to it', isCorrect: true },
      { text: 'Eight — each position is its own size', isCorrect: false, misconceptionId: `${PAR}:MC-2` },
      { text: 'Four — one for each named relationship', isCorrect: false, misconceptionId: `${PAR}:MC-2` },
    ],
    targetedMisconceptions: [`${PAR}:MC-2`],
    source: eb(PAR, 'Assessment gate — one fact behind three names'),
  },
  {
    conceptId: PAR, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'You measure corresponding angles at two crossings and they are equal. What follows?',
    choices: [
      { text: 'The lines are parallel — the relationship runs both ways, which is what lets you PROVE parallelism', isCorrect: true },
      { text: 'Nothing — the rule only works from parallel lines to equal angles', isCorrect: false, misconceptionId: `${PAR}:MC-1` },
      { text: 'Only that the transversal is perpendicular', isCorrect: false, misconceptionId: `${PAR}:MC-3` },
    ],
    targetedMisconceptions: [`${PAR}:MC-1`],
    source: eb(PAR, 'Misconception register — the converse is the useful direction'),
  },
  {
    conceptId: PAR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Co-interior angles between two parallel lines: equal, or supplementary?',
    choices: [
      { text: 'Supplementary — they sum to 180°, unlike corresponding and alternate interior angles', isCorrect: true },
      { text: 'Equal, like the other two relationships', isCorrect: false, misconceptionId: `${PAR}:MC-3` },
      { text: 'Neither; there is no fixed relationship', isCorrect: false, misconceptionId: `${PAR}:MC-3` },
    ],
    targetedMisconceptions: [`${PAR}:MC-3`],
    source: eb(PAR, 'Transfer probe — telling the three positions apart'),
  },

  // --- math.geom.triangle-angle-sum --------------------------------------------------
  {
    conceptId: TAS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'A triangle has angles 50° and 60°. What is the third?',
    choices: [
      { text: '70° — the three sum to 180°', isCorrect: true },
      { text: '90°, so the triangle is right-angled', isCorrect: false },
      { text: 'It depends on the size of the triangle', isCorrect: false, misconceptionId: `${TAS}:MC-1` },
    ],
    targetedMisconceptions: [`${TAS}:MC-1`],
    source: eb(TAS, 'Assessment gate — the sum is 180°'),
  },
  {
    conceptId: TAS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does a much bigger triangle have a bigger angle sum?',
    choices: [
      { text: 'No — size scales the SIDES and the AREA, not the angle sum', isCorrect: true },
      { text: 'Yes — bigger triangles have bigger angles', isCorrect: false, misconceptionId: `${TAS}:MC-1` },
      { text: 'Yes, proportionally to the scale factor', isCorrect: false, misconceptionId: `${TAS}:MC-1` },
    ],
    targetedMisconceptions: [`${TAS}:MC-1`],
    source: eb(TAS, 'Misconception register — size does not scale the angle sum'),
  },
  {
    conceptId: TAS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'You measure a triangle carefully and get 179°. What does that mean?',
    choices: [
      { text: 'The protractor was off — the result is PROVED, not measured', isCorrect: true },
      { text: 'The sum is approximately 180° and varies slightly', isCorrect: false, misconceptionId: `${TAS}:MC-2` },
      { text: 'This triangle is an exception to the rule', isCorrect: false, misconceptionId: `${TAS}:MC-2` },
    ],
    targetedMisconceptions: [`${TAS}:MC-2`],
    source: eb(TAS, 'Transfer probe — measurement cannot undermine a proof'),
  },

  // --- math.geom.polygon-angle-sum -----------------------------------------------------
  {
    conceptId: PAS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What do the interior angles of a pentagon sum to?',
    choices: [
      { text: '540° — three triangles, each 180°', isCorrect: true },
      { text: '900° — five times 180°', isCorrect: false, misconceptionId: `${PAS}:MC-1` },
      { text: '360°', isCorrect: false },
    ],
    targetedMisconceptions: [`${PAS}:MC-1`],
    source: eb(PAS, 'Assessment gate — (n−2) × 180°'),
  },
  {
    conceptId: PAS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Why is it (n − 2) × 180° and not n × 180°?',
    choices: [
      { text: 'Diagonals from one vertex split the polygon into n − 2 triangles — a quadrilateral gives 2, not 4', isCorrect: true },
      { text: 'The −2 is a correction factor found by measurement', isCorrect: false, misconceptionId: `${PAS}:MC-1` },
      { text: 'Two of the angles are exterior', isCorrect: false, misconceptionId: `${PAS}:MC-3` },
    ],
    targetedMisconceptions: [`${PAS}:MC-1`],
    source: eb(PAS, 'Misconception register — count the triangles'),
  },
  {
    conceptId: PAS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'An IRREGULAR pentagon: can you get each angle by dividing 540° by 5?',
    choices: [
      { text: 'No — the division gives each angle only for a REGULAR polygon; here the total holds but the angles differ', isCorrect: true },
      { text: 'Yes — 108° each, whatever the shape', isCorrect: false, misconceptionId: `${PAS}:MC-2` },
      { text: 'Yes, provided it is convex', isCorrect: false, misconceptionId: `${PAS}:MC-2` },
    ],
    targetedMisconceptions: [`${PAS}:MC-2`],
    source: eb(PAS, 'Transfer probe — per-angle division needs regularity'),
  },

  // --- math.geom.pythagorean-theorem ------------------------------------------------------
  {
    conceptId: PYTH, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'A right triangle has legs 3 and 4. What is the hypotenuse?',
    choices: [
      { text: '5 — 9 + 16 = 25', isCorrect: true },
      { text: '7 — add the legs', isCorrect: false },
      { text: '12', isCorrect: false },
    ],
    targetedMisconceptions: [`${PYTH}:MC-1`],
    source: eb(PYTH, 'Assessment gate — the basic application'),
  },
  {
    conceptId: PYTH, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'The hypotenuse is 5 and one leg is 3. What is the other leg?',
    choices: [
      { text: '4 — subtract: 25 − 9 = 16', isCorrect: true },
      { text: '√34 — add the two known squares', isCorrect: false, misconceptionId: `${PYTH}:MC-1` },
      { text: '8 — add the two known sides', isCorrect: false, misconceptionId: `${PYTH}:MC-1` },
    ],
    targetedMisconceptions: [`${PYTH}:MC-1`],
    source: eb(PYTH, 'Misconception register — the missing leg subtracts'),
  },
  {
    conceptId: PYTH, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Which side is c?',
    choices: [
      { text: 'The hypotenuse — opposite the right angle, and always the longest', isCorrect: true },
      { text: 'Whichever side is listed last', isCorrect: false, misconceptionId: `${PYTH}:MC-3` },
      { text: 'Either of the two legs', isCorrect: false, misconceptionId: `${PYTH}:MC-3` },
    ],
    targetedMisconceptions: [`${PYTH}:MC-3`],
    source: eb(PYTH, 'Transfer probe — identify c before substituting'),
  },

  // --- math.geom.distance-formula ------------------------------------------------------------
  {
    conceptId: DIST, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What is the distance from (0, 0) to (3, 4)?',
    choices: [
      { text: '5 — √(9 + 16)', isCorrect: true },
      { text: '7 — add the gaps, 3 + 4', isCorrect: false, misconceptionId: `${DIST}:MC-1` },
      { text: '12', isCorrect: false },
    ],
    targetedMisconceptions: [`${DIST}:MC-1`],
    source: eb(DIST, 'Assessment gate — the squaring is not optional'),
  },
  {
    conceptId: DIST, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does it matter which point you call first?',
    choices: [
      { text: 'No — squaring destroys the sign, so (x₂−x₁)² equals (x₁−x₂)²', isCorrect: true },
      { text: 'Yes — a negative difference gives a negative distance', isCorrect: false, misconceptionId: `${DIST}:MC-2` },
      { text: 'Yes — you must always subtract the smaller from the larger', isCorrect: false, misconceptionId: `${DIST}:MC-2` },
    ],
    targetedMisconceptions: [`${DIST}:MC-2`],
    source: eb(DIST, 'Misconception register — order is irrelevant'),
  },
  {
    conceptId: DIST, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'From (2, 5) to (2, 9) the segment is vertical. Do you need a different formula?',
    choices: [
      { text: 'No — the x-difference is 0, so √16 = 4; it reduces to subtraction on its own', isCorrect: true },
      { text: 'Yes — vertical segments need their own rule', isCorrect: false, misconceptionId: `${DIST}:MC-3` },
      { text: 'Yes — the formula divides by zero here', isCorrect: false, misconceptionId: `${DIST}:MC-3` },
    ],
    targetedMisconceptions: [`${DIST}:MC-3`],
    source: eb(DIST, 'Transfer probe — the general formula covers the special cases'),
  },

  // --- math.geom.quadrilateral -------------------------------------------------------------------
  {
    conceptId: QUADR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is a square a rectangle?',
    choices: [
      { text: 'Yes — and a rhombus, a parallelogram and a quadrilateral, all at once', isCorrect: true },
      { text: 'No — it is a square, which is a different category', isCorrect: false, misconceptionId: `${QUADR}:MC-2` },
      { text: 'Only if it is drawn with horizontal sides', isCorrect: false, misconceptionId: `${QUADR}:MC-1` },
    ],
    targetedMisconceptions: [`${QUADR}:MC-2`],
    source: eb(QUADR, 'Assessment gate — the categories nest'),
  },
  {
    conceptId: QUADR, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A square is balanced on one corner. Is it still a square?',
    choices: [
      { text: 'Yes — classification is by PROPERTIES, not by how it sits on the page', isCorrect: true },
      { text: 'No — it is now a rhombus or a diamond', isCorrect: false, misconceptionId: `${QUADR}:MC-1` },
      { text: 'No — a square must have horizontal and vertical sides', isCorrect: false, misconceptionId: `${QUADR}:MC-1` },
    ],
    targetedMisconceptions: [`${QUADR}:MC-1`],
    source: eb(QUADR, 'Misconception register — properties, not visual impression'),
  },
  {
    conceptId: QUADR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Why do the quadrilateral categories nest rather than exclude?',
    choices: [
      { text: 'So every theorem about parallelograms applies automatically to rectangles, rhombuses and squares', isCorrect: true },
      { text: 'It is an arbitrary convention that could have gone the other way', isCorrect: false, misconceptionId: `${QUADR}:MC-3` },
      { text: 'To keep the number of named shapes small', isCorrect: false, misconceptionId: `${QUADR}:MC-3` },
    ],
    targetedMisconceptions: [`${QUADR}:MC-3`],
    source: eb(QUADR, 'Transfer probe — nesting inherits theorems'),
  },

  // --- math.geom.rotation ---------------------------------------------------------------------------
  {
    conceptId: ROT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What does a rotation preserve?',
    choices: [
      { text: 'Distance from the centre, and orientation', isCorrect: true },
      { text: 'Distance from the centre, but orientation reverses', isCorrect: false },
      { text: 'Orientation, but points move closer to the centre', isCorrect: false, misconceptionId: `${ROT}:MC-3` },
    ],
    targetedMisconceptions: [`${ROT}:MC-3`],
    source: eb(ROT, 'Assessment gate — turning preserves distance from the centre'),
  },
  {
    conceptId: ROT, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'You must rotate 90° about (2, 3). Is the rotation matrix enough on its own?',
    choices: [
      { text: 'No — subtract (2,3), rotate, then add it back; the matrix alone rotates about the origin', isCorrect: true },
      { text: 'Yes — the matrix handles any centre', isCorrect: false, misconceptionId: `${ROT}:MC-2` },
      { text: 'Yes, provided you use a bigger angle', isCorrect: false, misconceptionId: `${ROT}:MC-2` },
    ],
    targetedMisconceptions: [`${ROT}:MC-2`],
    source: eb(ROT, 'Misconception register — translate for a non-origin centre'),
  },
  {
    conceptId: ROT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Rotating (1, 0) by 90° anticlockwise about the origin gives what — and what does that check?',
    choices: [
      { text: '(0, 1) — it confirms the minus sign sits in the top right of the matrix', isCorrect: true },
      { text: '(0, −1) — the minus belongs in the top left', isCorrect: false, misconceptionId: `${ROT}:MC-1` },
      { text: '(−1, 0)', isCorrect: false, misconceptionId: `${ROT}:MC-1` },
    ],
    targetedMisconceptions: [`${ROT}:MC-1`],
    source: eb(ROT, 'Transfer probe — testing the sign convention on a known point'),
  },

  // --- math.geom.dilation ----------------------------------------------------------------------------
  {
    conceptId: DIL, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'A figure is dilated by k = 3. What happens to its AREA?',
    choices: [
      { text: 'It becomes 9 times bigger — area scales by k²', isCorrect: true },
      { text: '3 times bigger, like the lengths', isCorrect: false, misconceptionId: `${DIL}:MC-1` },
      { text: '27 times bigger', isCorrect: false, misconceptionId: `${DIL}:MC-1` },
    ],
    targetedMisconceptions: [`${DIL}:MC-1`],
    source: eb(DIL, 'Assessment gate — area scales by the square'),
  },
  {
    conceptId: DIL, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'What does a NEGATIVE scale factor do?',
    choices: [
      { text: 'Scales and sends every point through the centre — a 180° rotation with scaling, NOT a reflection', isCorrect: true },
      { text: 'Reflects the figure across a line', isCorrect: false, misconceptionId: `${DIL}:MC-3` },
      { text: 'Nothing valid — k must be positive', isCorrect: false, misconceptionId: `${DIL}:MC-3` },
    ],
    targetedMisconceptions: [`${DIL}:MC-3`],
    source: eb(DIL, 'Misconception register — negative k is not a reflection'),
  },
  {
    conceptId: DIL, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Must a dilation be centred at the origin?',
    choices: [
      { text: 'No — the centre is chosen, and the figure moves as well as grows unless it is centred there', isCorrect: true },
      { text: 'Yes — dilations are always about the origin', isCorrect: false, misconceptionId: `${DIL}:MC-2` },
      { text: 'Yes, otherwise the shape is not similar', isCorrect: false, misconceptionId: `${DIL}:MC-2` },
    ],
    targetedMisconceptions: [`${DIL}:MC-2`],
    source: eb(DIL, 'Transfer probe — the centre is a choice'),
  },
]
