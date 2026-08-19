/**
 * Twentieth batch — the coordinate plane, and two conics.
 *
 *   PLANE      quadrants, midpoint-formula, line-equation. Where a point
 *              lives, the point between two points, and the three ways
 *              of writing one line that learners take for three lines.
 *   SHAPE      parallelogram, pythagorean-converse. The quadrilateral
 *              whose height is not a side, and the theorem whose CONVERSE
 *              had to be proved separately — the one place this corpus
 *              can show why "the converse is not automatic" costs
 *              something concrete.
 *   TRANSFORM  reflection. Orientation reverses; that is the definition,
 *              not a side effect.
 *   CONICS     ellipse, hyperbola. A matched pair that get confused with
 *              each other in exactly three ways, so they are authored
 *              together and each explanation names the other.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const QUAD = 'math.geom.quadrants'
const MIDP = 'math.geom.midpoint-formula'
const LEQN = 'math.geom.line-equation'
const PARA = 'math.geom.parallelogram'
const PCONV = 'math.geom.pythagorean-converse'
const REFL = 'math.geom.reflection'
const ELL = 'math.geom.ellipse'
const HYP = 'math.geom.hyperbola'

export const MATHEMATICS_COORDINATE_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: QUAD, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'The two axes cut the plane into four quadrants, numbered I to IV starting at the top '
      + 'right and going ANTI-clockwise. So II is top left, III is bottom left, IV is bottom '
      + 'right — and the anticlockwise direction is the part to fix in memory, because clocks '
      + 'and everyday habit both pull the other way.\n\n'
      + 'Each quadrant is a pair of signs, and reading them off is more reliable than '
      + 'recalling the picture. I is (+, +); II is (−, +) — left of the axis and above it; '
      + 'III is (−, −); IV is (+, −). The pair II and IV are the ones that get swapped, and '
      + 'they are opposite corners, so the error puts a point as far from the truth as the '
      + 'plane allows.\n\n'
      + 'Points ON an axis are in NO quadrant. (0, 5) sits on the y-axis and (−3, 0) on the '
      + 'x-axis; the quadrants are the open regions between the axes, and a point with a zero '
      + 'coordinate is on the boundary rather than inside one. The origin is in none of '
      + 'them.',
    targetedMisconceptions: [`${QUAD}:MC-1`, `${QUAD}:MC-3`],
    source: eb(QUAD, 'Identity + Misconception register — anticlockwise; axis points are in no quadrant'),
  },
  {
    conceptId: MIDP, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'The midpoint of a segment is the average of the endpoints, taken one coordinate at a '
      + 'time: ((x₁+x₂)/2, (y₁+y₂)/2). From (2, 3) to (8, 7) the midpoint is (5, 5) — average '
      + 'the x\'s to get 5, average the y\'s to get 5.\n\n'
      + '"Average the coordinates" has to mean SEPARATELY. Averaging all four together gives '
      + 'one number where a point was wanted, and pairing them the wrong way — (x₁+y₁)/2 for '
      + 'the first component — mixes across the two axes and produces a point unrelated to '
      + 'the segment. The x\'s only ever meet x\'s.\n\n'
      + 'Distance and midpoint use the same two coordinates and are different questions. The '
      + 'midpoint ADDS and halves; the distance SUBTRACTS, squares and roots. And working '
      + 'backwards is not halving: given one endpoint and the midpoint, the other endpoint is '
      + 'found by going the same distance again — from (2,3) through midpoint (5,5) the far '
      + 'end is (8,7), because you double the step rather than take half of anything.',
    targetedMisconceptions: [`${MIDP}:MC-1`, `${MIDP}:MC-2`],
    source: eb(MIDP, 'Identity + Misconception register — average each coordinate separately; the inverse doubles'),
  },
  {
    conceptId: LEQN, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'One line can be written three ways. SLOPE-INTERCEPT y = mx + b shows the gradient and '
      + 'where it crosses the y-axis. POINT-SLOPE y − y₁ = m(x − x₁) is built from any single '
      + 'point and the gradient. STANDARD ax + by = c is the tidy form for systems and for '
      + 'vertical lines, which slope-intercept cannot express at all.\n\n'
      + 'These are the SAME LINE. y = 2x + 1 and y − 3 = 2(x − 1) and 2x − y = −1 all draw the '
      + 'identical set of points; rearranging one into another changes the writing and not '
      + 'the object. Treating a rearranged equation as a new line is the error the register '
      + 'records, and it costs a step in every problem where the answer is checked against a '
      + 'differently-written source.\n\n'
      + 'Choose by what you were given. A point and a gradient go straight into point-slope '
      + 'with no algebra at all — converting to y = mx + b first is extra work for a form you '
      + 'may not need. And intercepts can be read from standard form directly: set x = 0 for '
      + 'the y-intercept, y = 0 for the x-intercept, without rearranging anything.',
    targetedMisconceptions: [`${LEQN}:MC-1`, `${LEQN}:MC-3`],
    source: eb(LEQN, 'Identity + Misconception register — three forms, one line; choose by what you have'),
  },
  {
    conceptId: PARA, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'A parallelogram has both pairs of opposite sides parallel. That single condition '
      + 'forces the rest: opposite sides equal, opposite angles equal, and the diagonals '
      + 'bisecting each other.\n\n'
      + 'Its height is PERPENDICULAR, and on a slanted parallelogram that is shorter than the '
      + 'slanted side. With base 6, slant side 4 and perpendicular height 3, the area is 18 '
      + 'and not 24 — the rectangle habit of "the other dimension is the adjacent side" is '
      + 'exactly what breaks here, and it is the same trap as the triangle\'s height.\n\n'
      + 'Two more things are easy to over-claim. Opposite angles are EQUAL; it is the '
      + 'ADJACENT ones that sum to 180°, since they sit between two parallel lines. And the '
      + 'diagonals bisect each other without being equal — equal diagonals belong to '
      + 'rectangles specifically. Rectangles, rhombuses and squares ARE parallelograms, so '
      + 'every parallelogram property holds for all of them; the inheritance runs downward '
      + 'only, which is why a parallelogram need not have any property special to a '
      + 'rectangle.',
    targetedMisconceptions: [`${PARA}:MC-1`, `${PARA}:MC-2`],
    source: eb(PARA, 'Identity + Misconception register — perpendicular height; adjacent angles supplement'),
  },
  {
    conceptId: PCONV, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'The Pythagorean theorem says a right triangle has a² + b² = c². The CONVERSE says the '
      + 'reverse: if a triangle\'s sides satisfy a² + b² = c², then it must be right-angled. '
      + 'That is a separate claim needing its own proof, and it happens to be true.\n\n'
      + 'It did not have to be. Converses fail constantly — "if it is raining the ground is '
      + 'wet" does not run backwards — so a theorem being true tells you nothing about its '
      + 'converse, and the fact that BOTH hold here is a property of this theorem rather than '
      + 'a rule of logic. This is the cleanest example in school mathematics of why the '
      + 'direction of an implication is part of what is being claimed.\n\n'
      + 'Using it, c must be the LONGEST side — put a shorter one there and a genuine right '
      + 'triangle will fail the test. The idea also extends past equality, which is what makes '
      + 'it useful: if a² + b² > c² the triangle is acute, and if a² + b² < c² it is obtuse. '
      + 'One comparison classifies the triangle rather than merely accepting or rejecting '
      + 'it.',
    targetedMisconceptions: [`${PCONV}:MC-1`, `${PCONV}:MC-2`],
    source: eb(PCONV, 'Identity + Misconception register — the converse needs its own proof; c is the longest side'),
  },
  {
    conceptId: REFL, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A reflection flips every point across a line, keeping each one the same PERPENDICULAR '
      + 'distance from that line but on the other side. Distances and angles inside the shape '
      + 'are untouched, so the image is congruent to the original.\n\n'
      + 'What does change is orientation, and that is the definition rather than a side '
      + 'effect. Label a triangle A, B, C going clockwise and the reflection reads '
      + 'anticlockwise — which is exactly why your reflection cannot shake your right hand. A '
      + 'transformation that preserves orientation is a rotation or a translation, not a '
      + 'reflection.\n\n'
      + 'The common mirror lines act on the coordinates in different ways, and they are worth '
      + 'separating. Over the x-axis, (x, y) → (x, −y); over the y-axis, (x, y) → (−x, y). '
      + 'Over the line y = x the coordinates SWAP: (x, y) → (y, x), with no negation at all — '
      + 'reaching for a minus sign there is the error the register records, and testing the '
      + 'rule on a point already on the line settles it, since such a point must not move.',
    targetedMisconceptions: [`${REFL}:MC-1`, `${REFL}:MC-3`],
    source: eb(REFL, 'Identity + Misconception register — y=x swaps rather than negates; orientation reverses'),
  },
  {
    conceptId: ELL, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'An ellipse is the set of points whose distances to two fixed foci SUM to a constant. '
      + 'Pin two ends of a loop of string and draw round it taut, and you have one; move the '
      + 'foci together and it becomes a circle.\n\n'
      + 'In x²/a² + y²/b² = 1, a is not automatically the one under x. The larger denominator '
      + 'marks the major axis, so if b > a the ellipse is taller than it is wide and the foci '
      + 'lie on the y-axis. Reading the shape means comparing the two denominators, not '
      + 'trusting their position.\n\n'
      + 'The focal distance uses a DIFFERENCE of squares: c² = a² − b² for an ellipse, with a '
      + 'the semi-major axis. Adding them instead — importing the Pythagorean habit — puts '
      + 'the foci outside the curve, which is impossible. That subtraction is also the '
      + 'clearest line between the two conics: the ellipse SUMS distances and SUBTRACTS '
      + 'squares, while the hyperbola does the exact opposite on both counts.',
    targetedMisconceptions: [`${ELL}:MC-1`, `${ELL}:MC-2`],
    source: eb(ELL, 'Identity + Misconception register — the larger denominator marks the major axis; c² = a² − b²'),
  },
  {
    conceptId: HYP, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A hyperbola is the set of points whose distances to two foci have a constant '
      + 'DIFFERENCE — the ellipse\'s sum, swapped. It comes in two separate branches, one '
      + 'around each focus.\n\n'
      + 'x²/a² − y²/b² = 1 opens LEFT AND RIGHT, and x is the positive term. That is the '
      + 'reliable reading: the variable whose term is positive is the direction the branches '
      + 'go, because setting the other variable to zero is the only way to get a real '
      + 'solution. In y²/a² − x²/b² = 1 the branches open up and down.\n\n'
      + 'Its focal distance also swaps: c² = a² + b², an ADDITION, where the ellipse '
      + 'subtracts. So the two conics differ on both counts at once — sum versus difference '
      + 'of distances, difference versus sum of squares — and the pairing is worth memorising '
      + 'as a pair rather than as two separate facts. Finally the asymptotes y = ±(b/a)x are '
      + 'guide lines that the branches approach forever and never touch; they are not part of '
      + 'the hyperbola, and no point of the curve lies on them.',
    targetedMisconceptions: [`${HYP}:MC-1`, `${HYP}:MC-2`],
    source: eb(HYP, 'Identity + Misconception register — the positive term gives the opening; c² = a² + b²'),
  },
]

export const MATHEMATICS_COORDINATE_PROBES: SeedProbe[] = [
  // --- math.geom.quadrants -----------------------------------------------------------
  {
    conceptId: QUAD, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Where is Quadrant II?',
    choices: [
      { text: 'Top left — the numbering runs anticlockwise from the top right', isCorrect: true },
      { text: 'Bottom right — the numbering runs clockwise', isCorrect: false, misconceptionId: `${QUAD}:MC-1` },
      { text: 'Bottom left', isCorrect: false, misconceptionId: `${QUAD}:MC-1` },
    ],
    targetedMisconceptions: [`${QUAD}:MC-1`],
    source: eb(QUAD, 'Assessment gate — the numbering is anticlockwise'),
  },
  {
    conceptId: QUAD, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Which quadrant contains (−4, 6)?',
    choices: [
      { text: 'II — negative x, positive y: left of the axis and above it', isCorrect: true },
      { text: 'IV — the signs are one positive and one negative', isCorrect: false, misconceptionId: `${QUAD}:MC-2` },
      { text: 'III — the x is negative', isCorrect: false, misconceptionId: `${QUAD}:MC-2` },
    ],
    targetedMisconceptions: [`${QUAD}:MC-2`],
    source: eb(QUAD, 'Misconception register — II and IV are opposite corners'),
  },
  {
    conceptId: QUAD, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Which quadrant is (0, 5) in?',
    choices: [
      { text: 'None — it sits on the y-axis, and the quadrants are the regions between the axes', isCorrect: true },
      { text: 'I, since 5 is positive', isCorrect: false, misconceptionId: `${QUAD}:MC-3` },
      { text: 'Both I and II, since it is on their border', isCorrect: false, misconceptionId: `${QUAD}:MC-3` },
    ],
    targetedMisconceptions: [`${QUAD}:MC-3`],
    source: eb(QUAD, 'Transfer probe — axis points are in no quadrant'),
  },

  // --- math.geom.midpoint-formula ------------------------------------------------------
  {
    conceptId: MIDP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What is the midpoint of (2, 3) and (8, 7)?',
    choices: [
      { text: '(5, 5) — average the x\'s, then the y\'s', isCorrect: true },
      { text: '(5) — average all four coordinates together', isCorrect: false, misconceptionId: `${MIDP}:MC-1` },
      { text: '(2.5, 7.5) — average x₁ with y₁, and x₂ with y₂', isCorrect: false, misconceptionId: `${MIDP}:MC-1` },
    ],
    targetedMisconceptions: [`${MIDP}:MC-1`],
    source: eb(MIDP, 'Assessment gate — average each coordinate separately'),
  },
  {
    conceptId: MIDP, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Midpoint and distance use the same coordinates. How do the operations differ?',
    choices: [
      { text: 'Midpoint ADDS and halves; distance SUBTRACTS, squares and roots', isCorrect: true },
      { text: 'They are the same calculation reported differently', isCorrect: false, misconceptionId: `${MIDP}:MC-2` },
      { text: 'Midpoint subtracts and distance adds', isCorrect: false, misconceptionId: `${MIDP}:MC-2` },
    ],
    targetedMisconceptions: [`${MIDP}:MC-2`],
    source: eb(MIDP, 'Misconception register — midpoint and distance are different questions'),
  },
  {
    conceptId: MIDP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'One endpoint is (2, 3) and the midpoint is (5, 5). What is the other endpoint?',
    choices: [
      { text: '(8, 7) — go the same step again; you double it, not halve it', isCorrect: true },
      { text: '(3.5, 4) — halve the step from the endpoint', isCorrect: false, misconceptionId: `${MIDP}:MC-3` },
      { text: '(2.5, 2.5) — halve the midpoint', isCorrect: false, misconceptionId: `${MIDP}:MC-3` },
    ],
    targetedMisconceptions: [`${MIDP}:MC-3`],
    source: eb(MIDP, 'Transfer probe — the inverse doubles the step'),
  },

  // --- math.geom.line-equation -----------------------------------------------------------
  {
    conceptId: LEQN, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Are y = 2x + 1 and 2x − y = −1 the same line?',
    choices: [
      { text: 'Yes — rearranging changes the writing, not the set of points', isCorrect: true },
      { text: 'No — different forms describe different lines', isCorrect: false, misconceptionId: `${LEQN}:MC-3` },
      { text: 'No — the second has no gradient', isCorrect: false, misconceptionId: `${LEQN}:MC-3` },
    ],
    targetedMisconceptions: [`${LEQN}:MC-3`],
    source: eb(LEQN, 'Assessment gate — three forms, one line'),
  },
  {
    conceptId: LEQN, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'You are given the point (1, 3) and gradient 2. What is the least work?',
    choices: [
      { text: 'Write y − 3 = 2(x − 1) directly — point-slope takes exactly what you were given', isCorrect: true },
      { text: 'Convert to y = mx + b first, then substitute', isCorrect: false, misconceptionId: `${LEQN}:MC-1` },
      { text: 'Find a second point, then use standard form', isCorrect: false, misconceptionId: `${LEQN}:MC-1` },
    ],
    targetedMisconceptions: [`${LEQN}:MC-1`],
    source: eb(LEQN, 'Misconception register — point-slope avoided out of habit'),
  },
  {
    conceptId: LEQN, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'How do you get the x-intercept from 3x + 4y = 12?',
    choices: [
      { text: 'Set y = 0 and read off x = 4 — no rearrangement needed', isCorrect: true },
      { text: 'Convert to y = mx + b first, then solve', isCorrect: false, misconceptionId: `${LEQN}:MC-2` },
      { text: 'Divide 12 by 3 and by 4 and add', isCorrect: false },
    ],
    targetedMisconceptions: [`${LEQN}:MC-2`],
    source: eb(LEQN, 'Transfer probe — intercepts read straight from standard form'),
  },

  // --- math.geom.parallelogram -------------------------------------------------------------
  {
    conceptId: PARA, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'A parallelogram has base 6, slant side 4 and perpendicular height 3. What is its area?',
    choices: [
      { text: '18 — base × perpendicular height', isCorrect: true },
      { text: '24 — base × the adjacent side', isCorrect: false, misconceptionId: `${PARA}:MC-1` },
      { text: '9 — ½ × base × height', isCorrect: false },
    ],
    targetedMisconceptions: [`${PARA}:MC-1`],
    source: eb(PARA, 'Assessment gate — the height is perpendicular, not the slant side'),
  },
  {
    conceptId: PARA, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'In a parallelogram, which angles sum to 180°?',
    choices: [
      { text: 'Adjacent ones — they sit between two parallel lines; opposite angles are EQUAL', isCorrect: true },
      { text: 'Opposite ones', isCorrect: false, misconceptionId: `${PARA}:MC-2` },
      { text: 'All four pairs', isCorrect: false, misconceptionId: `${PARA}:MC-2` },
    ],
    targetedMisconceptions: [`${PARA}:MC-2`],
    source: eb(PARA, 'Misconception register — opposite equal, adjacent supplementary'),
  },
  {
    conceptId: PARA, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Are a parallelogram\'s diagonals equal?',
    choices: [
      { text: 'Not generally — they BISECT each other; equal diagonals belong to rectangles', isCorrect: true },
      { text: 'Yes — opposite sides are equal, so the diagonals are too', isCorrect: false, misconceptionId: `${PARA}:MC-3` },
      { text: 'Yes, because they bisect each other', isCorrect: false, misconceptionId: `${PARA}:MC-3` },
    ],
    targetedMisconceptions: [`${PARA}:MC-3`],
    source: eb(PARA, 'Transfer probe — bisecting is not being equal'),
  },

  // --- math.geom.pythagorean-converse ---------------------------------------------------------
  {
    conceptId: PCONV, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'A triangle has sides 6, 8 and 10. Is it right-angled?',
    choices: [
      { text: 'Yes — 36 + 64 = 100, and the converse says that makes it right-angled', isCorrect: true },
      { text: 'Cannot tell without an angle measurement', isCorrect: false, misconceptionId: `${PCONV}:MC-1` },
      { text: 'No — the theorem only works the other way round', isCorrect: false, misconceptionId: `${PCONV}:MC-1` },
    ],
    targetedMisconceptions: [`${PCONV}:MC-1`],
    source: eb(PCONV, 'Assessment gate — applying the converse'),
  },
  {
    conceptId: PCONV, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does the converse hold automatically because the Pythagorean theorem is true?',
    choices: [
      { text: 'No — converses fail constantly; that BOTH hold here is a property of this theorem, proved separately', isCorrect: true },
      { text: 'Yes — a true statement\'s converse is always true', isCorrect: false, misconceptionId: `${PCONV}:MC-1` },
      { text: 'Yes — the equation is symmetric, so the implication is too', isCorrect: false, misconceptionId: `${PCONV}:MC-1` },
    ],
    targetedMisconceptions: [`${PCONV}:MC-1`],
    source: eb(PCONV, 'Misconception register — the converse needed its own proof'),
  },
  {
    conceptId: PCONV, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A triangle has sides 5, 6 and 7. What does 25 + 36 vs 49 tell you?',
    choices: [
      { text: '61 > 49, so it is ACUTE — the test classifies rather than merely accepting or rejecting', isCorrect: true },
      { text: 'Nothing — the test only works when the sums are equal', isCorrect: false, misconceptionId: `${PCONV}:MC-3` },
      { text: 'It is obtuse, since the sums differ', isCorrect: false, misconceptionId: `${PCONV}:MC-3` },
    ],
    targetedMisconceptions: [`${PCONV}:MC-3`],
    source: eb(PCONV, 'Transfer probe — the inequality extension'),
  },

  // --- math.geom.reflection --------------------------------------------------------------------
  {
    conceptId: REFL, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Reflecting (3, 5) over the x-axis gives what?',
    choices: [
      { text: '(3, −5)', isCorrect: true },
      { text: '(−3, 5)', isCorrect: false },
      { text: '(5, 3)', isCorrect: false, misconceptionId: `${REFL}:MC-1` },
    ],
    targetedMisconceptions: [`${REFL}:MC-1`],
    source: eb(REFL, 'Assessment gate — the x-axis negates y'),
  },
  {
    conceptId: REFL, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Reflecting (3, 5) over the line y = x gives what?',
    choices: [
      { text: '(5, 3) — the coordinates SWAP, with no negation', isCorrect: true },
      { text: '(−3, −5) — negate both', isCorrect: false, misconceptionId: `${REFL}:MC-1` },
      { text: '(−5, −3) — swap and negate', isCorrect: false, misconceptionId: `${REFL}:MC-1` },
    ],
    targetedMisconceptions: [`${REFL}:MC-1`],
    source: eb(REFL, 'Misconception register — y = x swaps rather than negates'),
  },
  {
    conceptId: REFL, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A triangle labelled A, B, C clockwise is reflected. How does the image read?',
    choices: [
      { text: 'Anticlockwise — reversing orientation is the definition, not a side effect', isCorrect: true },
      { text: 'Clockwise still — reflections preserve orientation', isCorrect: false, misconceptionId: `${REFL}:MC-3` },
      { text: 'It depends which line you reflect over', isCorrect: false, misconceptionId: `${REFL}:MC-3` },
    ],
    targetedMisconceptions: [`${REFL}:MC-3`],
    source: eb(REFL, 'Transfer probe — orientation always reverses'),
  },

  // --- math.geom.ellipse ---------------------------------------------------------------------------
  {
    conceptId: ELL, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What is constant for every point on an ellipse?',
    choices: [
      { text: 'The SUM of the distances to the two foci', isCorrect: true },
      { text: 'The difference of the distances to the two foci', isCorrect: false, misconceptionId: `${ELL}:MC-3` },
      { text: 'The distance to the centre', isCorrect: false },
    ],
    targetedMisconceptions: [`${ELL}:MC-3`],
    source: eb(ELL, 'Assessment gate — the ellipse sums distances'),
  },
  {
    conceptId: ELL, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For x²/9 + y²/25 = 1, which way is the major axis?',
    choices: [
      { text: 'Vertical — 25 > 9, and the larger denominator marks the major axis wherever it sits', isCorrect: true },
      { text: 'Horizontal — the term under x always gives the major axis', isCorrect: false, misconceptionId: `${ELL}:MC-1` },
      { text: 'Neither; the axes are equal', isCorrect: false, misconceptionId: `${ELL}:MC-1` },
    ],
    targetedMisconceptions: [`${ELL}:MC-1`],
    source: eb(ELL, 'Misconception register — compare the denominators, not their position'),
  },
  {
    conceptId: ELL, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'What is the focal distance relation for an ellipse?',
    choices: [
      { text: 'c² = a² − b² — a subtraction; adding would put the foci outside the curve', isCorrect: true },
      { text: 'c² = a² + b², as in Pythagoras', isCorrect: false, misconceptionId: `${ELL}:MC-2` },
      { text: 'c = a − b', isCorrect: false, misconceptionId: `${ELL}:MC-2` },
    ],
    targetedMisconceptions: [`${ELL}:MC-2`],
    source: eb(ELL, 'Transfer probe — the ellipse subtracts squares'),
  },

  // --- math.geom.hyperbola --------------------------------------------------------------------------
  {
    conceptId: HYP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Which way does x²/9 − y²/16 = 1 open?',
    choices: [
      { text: 'Left and right — the variable with the POSITIVE term gives the direction', isCorrect: true },
      { text: 'Up and down — it opens toward the negative term', isCorrect: false, misconceptionId: `${HYP}:MC-1` },
      { text: 'In all four directions', isCorrect: false, misconceptionId: `${HYP}:MC-1` },
    ],
    targetedMisconceptions: [`${HYP}:MC-1`],
    source: eb(HYP, 'Assessment gate — the positive term gives the opening'),
  },
  {
    conceptId: HYP, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'What is the focal relation for a hyperbola, compared with an ellipse?',
    choices: [
      { text: 'c² = a² + b² — an addition, where the ellipse subtracts; the two swap on both counts', isCorrect: true },
      { text: 'c² = a² − b², the same as the ellipse', isCorrect: false, misconceptionId: `${HYP}:MC-2` },
      { text: 'There is no focal relation for a hyperbola', isCorrect: false, misconceptionId: `${HYP}:MC-2` },
    ],
    targetedMisconceptions: [`${HYP}:MC-2`],
    source: eb(HYP, 'Misconception register — the hyperbola adds squares'),
  },
  {
    conceptId: HYP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Do any points of a hyperbola lie on its asymptotes?',
    choices: [
      { text: 'No — the branches approach them forever and never touch; they are guide lines, not part of the curve', isCorrect: true },
      { text: 'Yes — the asymptotes are where the two branches meet', isCorrect: false, misconceptionId: `${HYP}:MC-3` },
      { text: 'Yes, at one point on each branch', isCorrect: false, misconceptionId: `${HYP}:MC-3` },
    ],
    targetedMisconceptions: [`${HYP}:MC-3`],
    source: eb(HYP, 'Transfer probe — asymptotes are not part of the hyperbola'),
  },
]
