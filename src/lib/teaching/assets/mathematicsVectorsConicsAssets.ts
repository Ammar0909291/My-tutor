/**
 * Twenty-eighth batch — vectors in space, polar coordinates, and the
 * conics as one family.
 *
 * Two threads run through this batch, and both are TYPE errors:
 *
 *   The dot product returns a NUMBER; the cross product returns a
 *   VECTOR. Three registers record them being swapped, and the swap is
 *   not a slip of memory — it makes every downstream step meaningless,
 *   because you cannot take the angle of a vector or the direction of
 *   a scalar.
 *
 *   The conics are ONE family, not four. Slice a cone at different
 *   angles and you get circle, ellipse, parabola, hyperbola — and each
 *   general equation is handled by completing the square, which is the
 *   technique you already have rather than a new one per curve.
 *
 *   VECTORS   vectors-3d, dot-product, cross-product
 *   POLAR     polar-coordinates, polar-curves
 *   CONICS    conic-sections, parabola
 *   CLASSICAL triangle-centers
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const V3 = 'math.geom.vectors-3d'
const DOT = 'math.geom.dot-product'
const CROSS = 'math.geom.cross-product'
const PCOORD = 'math.geom.polar-coordinates'
const PCURVE = 'math.geom.polar-curves'
const CONIC = 'math.geom.conic-sections'
const PARAB = 'math.geom.parabola'
const TCENT = 'math.geom.triangle-centers'

export const MATHEMATICS_VECTORS_CONICS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: V3, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A 3-D vector is (x, y, z) — a direction and a magnitude in space. Addition and scalar '
      + 'multiplication work componentwise exactly as in two dimensions, and the magnitude is '
      + '√(x² + y² + z²), which is Pythagoras applied twice.\n\n'
      + 'The z-component is not decoration. Dropping it and working in the xy-plane gives a '
      + 'PROJECTION, not the vector — (3, 4, 12) has magnitude 13 while its shadow (3, 4) has '
      + 'magnitude 5. Every component carries as much weight as the others, and the third one '
      + 'is simply the one you cannot see on the page.\n\n'
      + 'Three dimensions is also where the two products separate and the TYPES matter. The '
      + 'dot product of two vectors is a NUMBER; the cross product is a VECTOR, and it exists '
      + 'only in three dimensions because "perpendicular to both" picks out a unique '
      + 'direction there and not in the plane. Getting the type wrong makes the next step '
      + 'meaningless rather than merely wrong — you cannot take the direction of a scalar.',
    targetedMisconceptions: [`${V3}:MC-1`, `${V3}:MC-3`],
    source: eb(V3, 'Identity + Misconception register — the z-component is not decoration; the products differ in type'),
  },
  {
    conceptId: DOT, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'The dot product a·b = a₁b₁ + a₂b₂ + a₃b₃ is a NUMBER. (1,2,3)·(4,5,6) = 4 + 10 + 18 = '
      + '32 — one value, not a vector, and asking which direction it points is a category '
      + 'error.\n\n'
      + 'It measures how much the two vectors agree in direction, because a·b = |a||b|cos θ. '
      + 'ZERO means perpendicular — cos 90° = 0 — so the orthogonality test is "dot product '
      + 'is zero", not "dot product is one". Positive means the angle is acute and negative '
      + 'means obtuse, which lets you read the rough geometry off a single number.\n\n'
      + 'To get the ANGLE you must undo the cosine. cos θ = (a·b)/(|a||b|) gives you the '
      + 'cosine, and θ = arccos of that — stopping at the fraction reports a cosine as though '
      + 'it were an angle, and since cosines live in [−1, 1] a "θ" of 0.8 is a strong sign '
      + 'the arccos was skipped.',
    targetedMisconceptions: [`${DOT}:MC-1`, `${DOT}:MC-2`],
    source: eb(DOT, 'Identity + Misconception register — it is a number; zero means perpendicular; arccos is required'),
  },
  {
    conceptId: CROSS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'The cross product a × b is a VECTOR, perpendicular to both inputs, with magnitude '
      + '|a||b|sin θ — the area of the parallelogram they span. It answers "which direction '
      + 'is perpendicular to both?", which is a question only three dimensions can answer '
      + 'uniquely.\n\n'
      + 'It is NOT commutative. a × b = −(b × a): same length, opposite direction. Swapping '
      + 'the order flips the result through 180°, so unlike almost every product met before '
      + 'it, the order is part of the answer — the right-hand rule tells you which way, and '
      + 'reversing the inputs reverses your thumb.\n\n'
      + 'The determinant formula carries a sign trap: the middle component takes a MINUS. '
      + 'Expanding along the top row the pattern is +, −, +, and forgetting the middle minus '
      + 'produces a vector that is not perpendicular to either input — which is the check '
      + 'worth making, since dotting your answer with both originals must give zero.',
    targetedMisconceptions: [`${CROSS}:MC-1`, `${CROSS}:MC-2`],
    source: eb(CROSS, 'Identity + Misconception register — it is a vector; not commutative; the middle minus'),
  },
  {
    conceptId: PCOORD, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'Polar coordinates locate a point by (r, θ) — distance from the origin and angle from '
      + 'the positive x-axis. Conversion is x = r cos θ and y = r sin θ, and back the other '
      + 'way r = √(x² + y²).\n\n'
      + 'The notation is identical to Cartesian and the meaning is not. (2, 3) as a polar '
      + 'pair means distance 2 at angle 3 radians, which is nowhere near the Cartesian point '
      + '(2, 3). Nothing in the writing tells you which system is meant, so it has to be '
      + 'stated.\n\n'
      + 'A point has infinitely many polar names: (2, θ) and (2, θ + 2π) are the same place, '
      + 'and a NEGATIVE r is perfectly defined — it means go backwards, so (−2, θ) equals '
      + '(2, θ + π). And recovering θ from arctan(y/x) needs a quadrant check: arctan returns '
      + 'an angle in (−π/2, π/2), so for a point in the second or third quadrant you must add '
      + 'π, and (−1, −1) is at 5π/4 rather than the π/4 the calculator reports.',
    targetedMisconceptions: [`${PCOORD}:MC-1`, `${PCOORD}:MC-3`],
    source: eb(PCOORD, 'Identity + Misconception register — same notation, different meaning; arctan needs a quadrant check'),
  },
  {
    conceptId: PCURVE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A polar curve gives r as a function of θ, and shapes that are awkward in Cartesian '
      + 'form become simple. A circle centred at the origin is just r = 5; a cardioid is '
      + 'r = 1 + cos θ.\n\n'
      + 'Negative r plots a point rather than skipping one. When r = 1 + 2cos θ goes negative '
      + 'you plot in the OPPOSITE direction from θ, which is exactly what produces the inner '
      + 'loop of a limaçon — treating those values as "no point" loses part of the curve and '
      + 'leaves a gap that looks like a plotting error.\n\n'
      + 'Rose curves r = cos(nθ) have a count that surprises: n petals when n is ODD, and 2n '
      + 'when n is EVEN. r = cos(3θ) has three petals and r = cos(2θ) has four, because for '
      + 'even n the negative-r values trace petals the positive ones did not. And polar '
      + 'symmetry is tested differently — replacing θ by −θ tests symmetry about the '
      + 'horizontal axis, and the Cartesian x/y tests do not transfer.',
    targetedMisconceptions: [`${PCURVE}:MC-1`, `${PCURVE}:MC-2`],
    source: eb(PCURVE, 'Identity + Misconception register — negative r plots opposite; petal count depends on parity'),
  },
  {
    conceptId: CONIC, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'The conic sections are ONE family, not four unrelated curves. Slice a double cone with '
      + 'a plane: perpendicular to the axis gives a circle, tilt it and you get an ellipse, '
      + 'tilt to match the slope of the side and you get a parabola, and steeper still cuts '
      + 'both nappes and gives a hyperbola.\n\n'
      + 'All are Ax² + Bxy + Cy² + Dx + Ey + F = 0, and which curve you have is read off the '
      + 'discriminant B² − 4AC: negative for an ellipse, zero for a parabola, positive for a '
      + 'hyperbola. One test, one family.\n\n'
      + 'Getting from the general equation to the standard form needs COMPLETING THE SQUARE — '
      + 'the same technique as for quadratics, applied to the x-terms and the y-terms '
      + 'separately, not a new method per curve. What differs between them is only the labels '
      + 'afterwards: for an ellipse a is the SEMI-MAJOR axis and belongs to the larger '
      + 'denominator wherever it sits, while for a hyperbola a always belongs to the POSITIVE '
      + 'term regardless of size.',
    targetedMisconceptions: [`${CONIC}:MC-1`, `${CONIC}:MC-2`],
    source: eb(CONIC, 'Identity + Misconception register — one family; completing the square is not a new technique'),
  },
  {
    conceptId: PARAB, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A parabola is the set of points equidistant from a fixed FOCUS and a fixed line, the '
      + 'DIRECTRIX. That is what makes it reflect parallel rays to a point, which is why '
      + 'satellite dishes and headlamp mirrors are parabolic.\n\n'
      + 'Which variable is squared tells you the axis, and the reading is the opposite of the '
      + 'instinctive one. y = ax² has x squared and opens UP or DOWN — a vertical axis — '
      + 'while x = ay² has y squared and opens LEFT or RIGHT. The SQUARED variable is the one '
      + 'that does not determine the direction; the linear one does.\n\n'
      + 'So the sign of a means different things in the two orientations. In y = ax², positive '
      + 'a opens upward; in x = ay², positive a opens to the RIGHT, not upward. "Positive '
      + 'means up" is only true for the vertical family. Reaching vertex form from '
      + 'y = ax² + bx + c is completing the square, and the sign flips there: y = x² − 6x + 5 '
      + 'becomes y = (x − 3)² − 4, with vertex (3, −4) — the 3 is positive although the '
      + 'bracket shows a minus.',
    targetedMisconceptions: [`${PARAB}:MC-1`, `${PARAB}:MC-2`],
    source: eb(PARAB, 'Identity + Misconception register — the squared variable does not give the direction'),
  },
  {
    conceptId: TCENT, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A triangle has four classical centres, each built from a different set of lines. '
      + 'CIRCUMCENTRE: perpendicular bisectors of the sides, equidistant from the three '
      + 'VERTICES, centre of the circle through them. INCENTRE: angle bisectors, equidistant '
      + 'from the three SIDES, centre of the circle inside. CENTROID: medians, the balance '
      + 'point. ORTHOCENTRE: altitudes.\n\n'
      + 'The two "equidistant" ones are constantly swapped, and the fix is to ask '
      + 'equidistant from WHAT. Vertices are points, so the circle through them passes '
      + 'outside — circumcentre. Sides are lines, so the circle touching them sits inside — '
      + 'incentre. The construction follows: bisect the sides for one, bisect the angles for '
      + 'the other.\n\n'
      + 'Only the centroid and incentre are always INSIDE. In an obtuse triangle both the '
      + 'circumcentre and the orthocentre fall outside it entirely, which surprises people '
      + 'who have only met acute examples. And a median joins a vertex to the MIDPOINT of the '
      + 'opposite side while an altitude drops PERPENDICULARLY to it — they coincide only in '
      + 'special triangles, so using one where the other is meant lands on the wrong centre.',
    targetedMisconceptions: [`${TCENT}:MC-1`, `${TCENT}:MC-2`],
    source: eb(TCENT, 'Identity + Misconception register — equidistant from what; not all centres are inside'),
  },
]

export const MATHEMATICS_VECTORS_CONICS_PROBES: SeedProbe[] = [
  // --- math.geom.vectors-3d ---------------------------------------------------------
  {
    conceptId: V3, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What is the magnitude of (3, 4, 12)?',
    choices: [
      { text: '13 — √(9 + 16 + 144)', isCorrect: true },
      { text: '5 — √(9 + 16), ignoring z', isCorrect: false, misconceptionId: `${V3}:MC-1` },
      { text: '19 — add the components', isCorrect: false },
    ],
    targetedMisconceptions: [`${V3}:MC-1`],
    source: eb(V3, 'Assessment gate — every component counts'),
  },
  {
    conceptId: V3, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Dropping the z-component of a 3-D vector gives you what?',
    choices: [
      { text: 'Its PROJECTION onto the xy-plane — a different vector, of different magnitude', isCorrect: true },
      { text: 'The same vector, written more simply', isCorrect: false, misconceptionId: `${V3}:MC-1` },
      { text: 'Its magnitude', isCorrect: false, misconceptionId: `${V3}:MC-1` },
    ],
    targetedMisconceptions: [`${V3}:MC-1`],
    source: eb(V3, 'Misconception register — the z-component is not decoration'),
  },
  {
    conceptId: V3, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Why does the cross product exist only in three dimensions?',
    choices: [
      { text: '"Perpendicular to both" picks out a unique direction there, and not in the plane', isCorrect: true },
      { text: 'It exists in two dimensions too, as a number', isCorrect: false, misconceptionId: `${V3}:MC-3` },
      { text: 'Because the dot product covers the two-dimensional case', isCorrect: false, misconceptionId: `${V3}:MC-3` },
    ],
    targetedMisconceptions: [`${V3}:MC-3`],
    source: eb(V3, 'Transfer probe — uniqueness of the perpendicular direction'),
  },

  // --- math.geom.dot-product ----------------------------------------------------------
  {
    conceptId: DOT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What is (1, 2, 3) · (4, 5, 6)?',
    choices: [
      { text: '32 — a NUMBER', isCorrect: true },
      { text: '(4, 10, 18) — a vector', isCorrect: false, misconceptionId: `${DOT}:MC-1` },
      { text: '(−3, 6, −3)', isCorrect: false, misconceptionId: `${DOT}:MC-1` },
    ],
    targetedMisconceptions: [`${DOT}:MC-1`],
    source: eb(DOT, 'Assessment gate — the dot product is a scalar'),
  },
  {
    conceptId: DOT, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'How do you test whether two vectors are perpendicular?',
    choices: [
      { text: 'Dot product equals ZERO — since cos 90° = 0', isCorrect: true },
      { text: 'Dot product equals one', isCorrect: false, misconceptionId: `${DOT}:MC-2` },
      { text: 'Dot product is negative', isCorrect: false, misconceptionId: `${DOT}:MC-2` },
    ],
    targetedMisconceptions: [`${DOT}:MC-2`],
    source: eb(DOT, 'Misconception register — the orthogonality test is zero'),
  },
  {
    conceptId: DOT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'You computed (a·b)/(|a||b|) = 0.8 and wrote "θ = 0.8". What is wrong?',
    choices: [
      { text: '0.8 is the COSINE; θ = arccos(0.8) ≈ 0.64 rad — and a cosine in [−1,1] is the giveaway', isCorrect: true },
      { text: 'Nothing — that fraction is the angle', isCorrect: false, misconceptionId: `${DOT}:MC-3` },
      { text: 'The fraction should have been inverted first', isCorrect: false, misconceptionId: `${DOT}:MC-3` },
    ],
    targetedMisconceptions: [`${DOT}:MC-3`],
    source: eb(DOT, 'Transfer probe — the arccos cannot be skipped'),
  },

  // --- math.geom.cross-product ----------------------------------------------------------
  {
    conceptId: CROSS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What kind of object is a × b?',
    choices: [
      { text: 'A VECTOR, perpendicular to both inputs', isCorrect: true },
      { text: 'A number, like the dot product', isCorrect: false, misconceptionId: `${CROSS}:MC-1` },
      { text: 'An angle', isCorrect: false, misconceptionId: `${CROSS}:MC-1` },
    ],
    targetedMisconceptions: [`${CROSS}:MC-1`],
    source: eb(CROSS, 'Assessment gate — the cross product is a vector'),
  },
  {
    conceptId: CROSS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'How does b × a relate to a × b?',
    choices: [
      { text: 'b × a = −(a × b) — same length, opposite direction; the order is part of the answer', isCorrect: true },
      { text: 'They are equal — products commute', isCorrect: false, misconceptionId: `${CROSS}:MC-2` },
      { text: 'They differ in magnitude but point the same way', isCorrect: false, misconceptionId: `${CROSS}:MC-2` },
    ],
    targetedMisconceptions: [`${CROSS}:MC-2`],
    source: eb(CROSS, 'Misconception register — the cross product is anticommutative'),
  },
  {
    conceptId: CROSS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'How do you check a computed cross product?',
    choices: [
      { text: 'Dot it with both originals — each must give zero, which catches the missing middle minus', isCorrect: true },
      { text: 'Check its magnitude equals |a||b|', isCorrect: false, misconceptionId: `${CROSS}:MC-3` },
      { text: 'There is no quick check', isCorrect: false, misconceptionId: `${CROSS}:MC-3` },
    ],
    targetedMisconceptions: [`${CROSS}:MC-3`],
    source: eb(CROSS, 'Transfer probe — perpendicularity is the check'),
  },

  // --- math.geom.polar-coordinates ------------------------------------------------------
  {
    conceptId: PCOORD, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'In POLAR form, what does (2, 3) mean?',
    choices: [
      { text: 'Distance 2 from the origin at angle 3 radians', isCorrect: true },
      { text: 'Two across and three up', isCorrect: false, misconceptionId: `${PCOORD}:MC-1` },
      { text: 'The same point as Cartesian (2, 3)', isCorrect: false, misconceptionId: `${PCOORD}:MC-1` },
    ],
    targetedMisconceptions: [`${PCOORD}:MC-1`],
    source: eb(PCOORD, 'Assessment gate — same notation, different meaning'),
  },
  {
    conceptId: PCOORD, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is (−2, θ) a valid polar point?',
    choices: [
      { text: 'Yes — negative r means go backwards, so it equals (2, θ + π)', isCorrect: true },
      { text: 'No — r must be positive', isCorrect: false, misconceptionId: `${PCOORD}:MC-2` },
      { text: 'No — it is undefined', isCorrect: false, misconceptionId: `${PCOORD}:MC-2` },
    ],
    targetedMisconceptions: [`${PCOORD}:MC-2`],
    source: eb(PCOORD, 'Misconception register — negative r is defined'),
  },
  {
    conceptId: PCOORD, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For the point (−1, −1), arctan(y/x) gives π/4. Is that the angle?',
    choices: [
      { text: 'No — that point is in the third quadrant, so θ = 5π/4; arctan only returns (−π/2, π/2)', isCorrect: true },
      { text: 'Yes — arctan gives the angle directly', isCorrect: false, misconceptionId: `${PCOORD}:MC-3` },
      { text: 'Yes, since both coordinates are negative and cancel', isCorrect: false, misconceptionId: `${PCOORD}:MC-3` },
    ],
    targetedMisconceptions: [`${PCOORD}:MC-3`],
    source: eb(PCOORD, 'Transfer probe — arctan needs a quadrant check'),
  },

  // --- math.geom.polar-curves ------------------------------------------------------------
  {
    conceptId: PCURVE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What curve is r = 5?',
    choices: [
      { text: 'A circle of radius 5 centred at the origin', isCorrect: true },
      { text: 'A horizontal line at height 5', isCorrect: false },
      { text: 'A single point', isCorrect: false },
    ],
    targetedMisconceptions: [`${PCURVE}:MC-3`],
    source: eb(PCURVE, 'Assessment gate — polar form makes some curves simple'),
  },
  {
    conceptId: PCURVE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For r = 1 + 2cos θ, some values of r come out negative. What do you plot?',
    choices: [
      { text: 'The point in the OPPOSITE direction from θ — this is what makes the inner loop', isCorrect: true },
      { text: 'Nothing — negative r means no point there', isCorrect: false, misconceptionId: `${PCURVE}:MC-1` },
      { text: 'The absolute value, at angle θ', isCorrect: false, misconceptionId: `${PCURVE}:MC-1` },
    ],
    targetedMisconceptions: [`${PCURVE}:MC-1`],
    source: eb(PCURVE, 'Misconception register — negative r plots opposite'),
  },
  {
    conceptId: PCURVE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'How many petals does r = cos(2θ) have?',
    choices: [
      { text: 'Four — for EVEN n you get 2n, since negative-r values trace extra petals', isCorrect: true },
      { text: 'Two — n petals', isCorrect: false, misconceptionId: `${PCURVE}:MC-2` },
      { text: 'Three', isCorrect: false, misconceptionId: `${PCURVE}:MC-2` },
    ],
    targetedMisconceptions: [`${PCURVE}:MC-2`],
    source: eb(PCURVE, 'Transfer probe — the petal count depends on parity'),
  },

  // --- math.geom.conic-sections -------------------------------------------------------------
  {
    conceptId: CONIC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What makes circle, ellipse, parabola and hyperbola one family?',
    choices: [
      { text: 'Each is a slice of the same double cone, at a different angle', isCorrect: true },
      { text: 'Nothing — they are four unrelated curves', isCorrect: false, misconceptionId: `${CONIC}:MC-1` },
      { text: 'They all have the same equation', isCorrect: false },
    ],
    targetedMisconceptions: [`${CONIC}:MC-1`],
    source: eb(CONIC, 'Assessment gate — one family, four slices'),
  },
  {
    conceptId: CONIC, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'How do you get a general conic equation into standard form?',
    choices: [
      { text: 'Complete the square on the x-terms and the y-terms — the technique you already have', isCorrect: true },
      { text: 'A new technique specific to each of the four curves', isCorrect: false, misconceptionId: `${CONIC}:MC-2` },
      { text: 'By factorising into two linear factors', isCorrect: false, misconceptionId: `${CONIC}:MC-2` },
    ],
    targetedMisconceptions: [`${CONIC}:MC-2`],
    source: eb(CONIC, 'Misconception register — completing the square is not new'),
  },
  {
    conceptId: CONIC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'What does the discriminant B² − 4AC tell you?',
    choices: [
      { text: 'Which conic it is — negative ellipse, zero parabola, positive hyperbola', isCorrect: true },
      { text: 'How many solutions the equation has', isCorrect: false },
      { text: 'Whether a is under x or under y', isCorrect: false, misconceptionId: `${CONIC}:MC-3` },
    ],
    targetedMisconceptions: [`${CONIC}:MC-3`],
    source: eb(CONIC, 'Transfer probe — one test identifies the curve'),
  },

  // --- math.geom.parabola -----------------------------------------------------------------------
  {
    conceptId: PARAB, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Which way does x = ay² open?',
    choices: [
      { text: 'Left or right — the SQUARED variable is not the one that gives the direction', isCorrect: true },
      { text: 'Up or down, since y is squared', isCorrect: false, misconceptionId: `${PARAB}:MC-1` },
      { text: 'It depends only on the sign of a', isCorrect: false, misconceptionId: `${PARAB}:MC-2` },
    ],
    targetedMisconceptions: [`${PARAB}:MC-1`],
    source: eb(PARAB, 'Assessment gate — the squared variable does not give direction'),
  },
  {
    conceptId: PARAB, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'In x = ay² with a positive, which way does it open?',
    choices: [
      { text: 'To the RIGHT — "positive means up" only holds for the vertical family', isCorrect: true },
      { text: 'Upward — positive a always means up', isCorrect: false, misconceptionId: `${PARAB}:MC-2` },
      { text: 'Downward', isCorrect: false, misconceptionId: `${PARAB}:MC-2` },
    ],
    targetedMisconceptions: [`${PARAB}:MC-2`],
    source: eb(PARAB, 'Misconception register — the sign means different things per orientation'),
  },
  {
    conceptId: PARAB, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'y = x² − 6x + 5 becomes y = (x − 3)² − 4. Where is the vertex?',
    choices: [
      { text: '(3, −4) — the bracket shows a minus and the x-coordinate is POSITIVE 3', isCorrect: true },
      { text: '(−3, −4) — read the sign straight from the bracket', isCorrect: false, misconceptionId: `${PARAB}:MC-3` },
      { text: '(3, 4)', isCorrect: false, misconceptionId: `${PARAB}:MC-3` },
    ],
    targetedMisconceptions: [`${PARAB}:MC-3`],
    source: eb(PARAB, 'Transfer probe — the sign flips out of the bracket'),
  },

  // --- math.geom.triangle-centers ------------------------------------------------------------------
  {
    conceptId: TCENT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Which centre is equidistant from the three VERTICES?',
    choices: [
      { text: 'The circumcentre — built from perpendicular bisectors', isCorrect: true },
      { text: 'The incentre', isCorrect: false, misconceptionId: `${TCENT}:MC-1` },
      { text: 'The centroid', isCorrect: false, misconceptionId: `${TCENT}:MC-1` },
    ],
    targetedMisconceptions: [`${TCENT}:MC-1`],
    source: eb(TCENT, 'Assessment gate — equidistant from what'),
  },
  {
    conceptId: TCENT, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Are all four triangle centres inside the triangle?',
    choices: [
      { text: 'No — in an obtuse triangle the circumcentre and orthocentre fall outside it', isCorrect: true },
      { text: 'Yes — a centre is by definition inside', isCorrect: false, misconceptionId: `${TCENT}:MC-2` },
      { text: 'Yes, except for very thin triangles', isCorrect: false, misconceptionId: `${TCENT}:MC-2` },
    ],
    targetedMisconceptions: [`${TCENT}:MC-2`],
    source: eb(TCENT, 'Misconception register — only centroid and incentre are always inside'),
  },
  {
    conceptId: TCENT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'What is the difference between a median and an altitude?',
    choices: [
      { text: 'A median goes to the MIDPOINT of the opposite side; an altitude drops PERPENDICULARLY to it', isCorrect: true },
      { text: 'They are the same line', isCorrect: false, misconceptionId: `${TCENT}:MC-3` },
      { text: 'A median is perpendicular and an altitude bisects', isCorrect: false, misconceptionId: `${TCENT}:MC-3` },
    ],
    targetedMisconceptions: [`${TCENT}:MC-3`],
    source: eb(TCENT, 'Transfer probe — different lines, different centres'),
  },
]
