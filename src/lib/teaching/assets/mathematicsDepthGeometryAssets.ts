/**
 * MATHEMATICS — probe DEPTH, batch 4: math.geom (69 (concept, band) pairs, 138 probes).
 *
 * Why depth, and the identity rule every probe here obeys, are stated once in
 * mathematicsDepthArithAssets.ts (batch 1): five gradeable probes per pair so a
 * learner recovers from one or two mistakes on questions they have not seen;
 * every probe extends the pair's existing ladder slot at an unused difficulty
 * rung, so no seeded probe is re-identified.
 *
 * Arithmetic checked by hand, including: distance √((6−2)² + (8−5)²) = 5,
 * midpoint (−1, 4), (x + 1)² + (y − 2)² = 9 centred at (−1, 2), dot product
 * (2, −1)·(3, 6) = 0, cross product i × j = k, regular octagon interior angle
 * 135°, hexagon angle sum 720°, Euler V − E + F = 2 on the triangular prism
 * (6 − 9 + 5), and the volume and area scale factors k³ and k².
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const { ELEMENTARY, MIDDLE, HIGH, UNDERGRADUATE: UG } = GradeBand
const { FOUNDATIONAL: F, DEVELOPING: D, PROFICIENT: P, ADVANCED: A } = ProbeDifficulty
type Kind = 'mcq' | 'misconception_probe'

function q(
  conceptId: string, gradeBand: GradeBand, probeKind: Kind, difficulty: ProbeDifficulty,
  stem: string, correct: string, wrong: string[], what: string,
): SeedProbe {
  return {
    conceptId, subjectSlug: S, probeKind, gradeBand, difficulty, stem,
    choices: [{ text: correct, isCorrect: true }, ...wrong.map((text) => ({ text, isCorrect: false }))],
    correctValue: correct,
    targetedMisconceptions: [],
    source: `educational-brain/concepts/mathematics/${conceptId}.md — probe-depth set 2026-10-02: ${what}`,
  }
}

export const MATHEMATICS_DEPTH_GEOMETRY_PROBES: SeedProbe[] = [
  q('math.geom.angle-measurement', MIDDLE, 'mcq', D, 'An obtuse angle is measured with a protractor. Which reading is possible?', '128°', ['52°', '90°', '210°'], 'an obtuse angle lies strictly between 90° and 180°'),
  q('math.geom.angle-measurement', MIDDLE, 'mcq', A, 'A reflex angle is shown. The protractor reads 70° for the smaller angle between its arms. What is the reflex angle?', '290°', ['70°', '110°', '250°'], 'the reflex angle is 360° minus the smaller angle'),

  q('math.geom.angle-pairs', MIDDLE, 'mcq', D, 'Two angles form a linear pair and one measures 115°. What is the other?', '65°', ['115°', '245°', '25°'], 'a linear pair sums to 180°'),
  q('math.geom.angle-pairs', MIDDLE, 'mcq', A, 'An angle is three times its complement. How big is the angle?', '67.5°', ['45°', '135°', '22.5°'], 'x + x/3 = 90'),

  q('math.geom.angle-types', MIDDLE, 'mcq', D, 'Which of these angles is reflex?', '200°', ['90°', '150°', '180°'], 'a reflex angle is between 180° and 360°'),
  q('math.geom.angle-types', MIDDLE, 'mcq', A, 'Half of an obtuse angle is always what type of angle?', 'Acute', ['Obtuse', 'Right', 'It depends on the angle'], 'an obtuse angle is below 180°, so half is below 90°'),

  q('math.geom.angle', MIDDLE, 'mcq', D, 'Two rays from one point make an angle of 40°. Extending both rays to twice their length, what is the angle now?', '40°', ['80°', '20°', '160°'], 'angle size is the turn between the rays, not their length'),
  q('math.geom.angle', MIDDLE, 'mcq', A, 'Angles A and B are supplementary, and A is 20° more than B. What is A?', '100°', ['80°', '110°', '55°'], 'A + B = 180 and A − B = 20'),

  q('math.geom.area-polygon', MIDDLE, 'mcq', D, 'A trapezoid has parallel sides 6 and 10 and height 4. What is its area?', '32', ['64', '40', '24'], '½ × (6 + 10) × 4'),
  q('math.geom.area-polygon', MIDDLE, 'mcq', A, 'An L-shape is a 6 × 4 rectangle with a 2 × 2 square cut from one corner. What is its area?', '20', ['24', '28', '16'], 'split or subtract: 24 − 4'),

  q('math.geom.area-triangle', MIDDLE, 'mcq', D, 'A triangle has base 10 cm and height 7 cm. What is its area?', '35 cm²', ['70 cm²', '17 cm²', '35 cm'], '½ × base × height, in square units'),
  q('math.geom.area-triangle', MIDDLE, 'mcq', A, 'A triangle has area 24 cm² and base 8 cm. What is its height?', '6 cm', ['3 cm', '12 cm', '16 cm'], '½ × 8 × h = 24'),

  q('math.geom.area', MIDDLE, 'mcq', D, 'How many square centimetres are in 1 square metre?', '10 000', ['100', '1000', '1 000 000'], '100 cm × 100 cm'),
  q('math.geom.area', MIDDLE, 'mcq', A, 'A square has area 49 cm². What is its perimeter?', '28 cm', ['49 cm', '14 cm', '7 cm'], 'side 7 cm, four sides'),

  q('math.geom.circle-area', MIDDLE, 'mcq', D, 'What is the exact area of a circle with radius 5 cm?', '25π cm²', ['10π cm²', '5π cm²', '100π cm²'], 'πr², not 2πr'),
  q('math.geom.circle-area', MIDDLE, 'mcq', A, 'A circle has area 36π. What is its radius?', '6', ['18', '36', '√36π'], 'r² = 36'),

  q('math.geom.circle-circumference', MIDDLE, 'mcq', D, 'A circle has radius 4 cm. What is its exact circumference?', '8π cm', ['4π cm', '16π cm', '8 cm'], 'C = 2πr'),
  q('math.geom.circle-circumference', MIDDLE, 'mcq', A, 'A wheel of diameter 70 cm turns 100 times. Roughly how far does it roll?', 'About 220 m', ['About 70 m', 'About 110 m', 'About 440 m'], 'one turn is πd ≈ 2.2 m'),

  q('math.geom.circle-equation', HIGH, 'mcq', D, 'What are the centre and radius of (x + 1)² + (y − 2)² = 9?', 'Centre (−1, 2), radius 3', ['Centre (1, −2), radius 3', 'Centre (−1, 2), radius 9', 'Centre (1, 2), radius 9'], 'the signs inside the brackets flip'),
  q('math.geom.circle-equation', HIGH, 'mcq', A, 'Which equation is the circle with centre (3, 0) passing through the origin?', '(x − 3)² + y² = 9', ['(x + 3)² + y² = 9', '(x − 3)² + y² = 3', 'x² + y² = 9'], 'the radius is the distance from the centre to the origin'),

  q('math.geom.circle-parts', MIDDLE, 'mcq', D, 'What is the longest chord of a circle?', 'A diameter', ['A radius', 'An arc', 'A tangent'], 'a chord through the centre'),
  q('math.geom.circle-parts', MIDDLE, 'mcq', A, 'Which line meets a circle at exactly one point?', 'A tangent', ['A secant', 'A chord', 'A diameter'], 'a secant cuts the circle twice'),

  q('math.geom.circle-theorems', HIGH, 'mcq', D, 'An inscribed angle stands on an arc whose central angle is 110°. What is the inscribed angle?', '55°', ['110°', '220°', '70°'], 'the inscribed angle is half the central angle on the same arc'),
  q('math.geom.circle-theorems', HIGH, 'mcq', A, 'In a cyclic quadrilateral, one angle is 75°. What is the angle opposite it?', '105°', ['75°', '15°', '285°'], 'opposite angles of a cyclic quadrilateral are supplementary'),

  q('math.geom.circle', MIDDLE, 'misconception_probe', F, 'A circle has radius 6. What is its diameter?', '12', ['3', '36', '6π'], 'the diameter is twice the radius'),
  q('math.geom.circle', MIDDLE, 'misconception_probe', P, 'A circle has radius 10. A student writes its area as 20π. What did they compute?', 'The circumference, 2πr', ['The area correctly', 'π times the diameter squared', 'Half the area'], 'πr² = 100π; 2πr is the circumference'),

  q('math.geom.congruent-triangles', HIGH, 'mcq', D, 'Two triangles have two sides and the angle between them equal. Which test proves them congruent?', 'SAS', ['SSA', 'AAA', 'They cannot be proved congruent'], 'the included angle'),
  q('math.geom.congruent-triangles', HIGH, 'mcq', A, 'Two right triangles have equal hypotenuses and one pair of equal legs. Are they congruent?', 'Yes, by RHS', ['No, that is SSA', 'Only if they are isosceles', 'No, the angles are unknown'], 'the right angle rescues the SSA case'),

  q('math.geom.conic-sections', UG, 'mcq', D, 'What kind of conic is 4x² + 9y² = 36?', 'An ellipse', ['A circle', 'A hyperbola', 'A parabola'], 'both squares positive with different coefficients'),
  q('math.geom.conic-sections', UG, 'mcq', A, 'For x² + 4xy + y² = 1, what does B² − 4AC say?', 'Hyperbola, since 16 − 4 = 12 > 0', ['Ellipse, since both squares are positive', 'Parabola, since B² = 4AC', 'Circle, since A = C'], 'the discriminant classifies the conic'),

  q('math.geom.coordinate-plane', MIDDLE, 'misconception_probe', F, 'Which point lies on the y-axis?', '(0, 5)', ['(5, 0)', '(5, 5)', '(1, 5)'], 'points on the y-axis have x = 0'),
  q('math.geom.coordinate-plane', MIDDLE, 'misconception_probe', P, 'Starting at (2, −1), you move 3 left and 4 up. Where are you?', '(−1, 3)', ['(5, 3)', '(−2, 2)', '(6, −4)'], 'left changes x, up changes y'),

  q('math.geom.cross-product', HIGH, 'mcq', D, 'What is i × j?', 'k', ['−k', '0', '1'], 'the right-handed order i, j, k'),
  q('math.geom.cross-product', HIGH, 'mcq', A, 'What is the area of the parallelogram spanned by a = (1, 0, 0) and b = (1, 2, 0)?', '2', ['1', '3', '√5'], 'the area is |a × b| = |(0, 0, 2)|'),

  q('math.geom.curvature', UG, 'mcq', D, 'What is the curvature of a straight line?', '0', ['1', 'It is infinite', 'It depends on the slope'], 'a line does not turn'),
  q('math.geom.curvature', UG, 'mcq', A, 'Where is the curvature of y = x² largest?', 'At the vertex, x = 0', ['Far from the vertex', 'It is the same everywhere', 'At x = 1'], 'κ = 2/(1 + 4x²)^(3/2) is largest at x = 0'),

  q('math.geom.differential-geometry-curves', UG, 'mcq', D, 'For r(t) = (cos t, sin t, t), what is |r′(t)|?', '√2', ['1', '2', 't'], 'r′ = (−sin t, cos t, 1)'),
  q('math.geom.differential-geometry-curves', UG, 'mcq', A, 'A curve is parametrised by arc length s. What is |r′(s)|?', '1', ['s', '0', 'It depends on the curve'], 'unit speed is what arc-length parametrisation means'),

  q('math.geom.differential-geometry-surfaces', UG, 'mcq', D, 'What is the Gaussian curvature of a sphere of radius R?', '1/R²', ['1/R', '0', 'R²'], 'the product of the two principal curvatures 1/R'),
  q('math.geom.differential-geometry-surfaces', UG, 'mcq', A, 'What sign is the Gaussian curvature at the centre of a saddle?', 'Negative', ['Positive', 'Zero', 'It has no sign'], 'the principal curvatures have opposite signs'),

  q('math.geom.dilation', HIGH, 'mcq', D, 'A segment of length 6 is dilated by scale factor ½. How long is the image?', '3', ['12', '6', '1.5'], 'lengths scale by k'),
  q('math.geom.dilation', HIGH, 'mcq', A, 'A cube is dilated by scale factor 2. By what factor does its volume change?', '8', ['2', '4', '6'], 'volume scales by k³'),

  q('math.geom.distance-formula', HIGH, 'mcq', D, 'What is the distance between (2, 5) and (6, 8)?', '5', ['7', '25', '√7'], '√(4² + 3²)'),
  q('math.geom.distance-formula', HIGH, 'mcq', A, 'Which point is exactly 10 units from the origin?', '(6, −8)', ['(5, 5)', '(10, 10)', '(7, 3)'], '6² + 8² = 100'),

  q('math.geom.dot-product', HIGH, 'mcq', D, 'Are (2, −1) and (3, 6) perpendicular?', 'Yes, their dot product is 0', ['No, they point in different directions', 'No, their lengths differ', 'Only in three dimensions'], '6 − 6 = 0'),
  q('math.geom.dot-product', HIGH, 'mcq', A, 'If |a| = 3, |b| = 4 and the angle between them is 60°, what is a · b?', '6', ['12', '7', '6√3'], '3 × 4 × cos 60°'),

  q('math.geom.ellipse', HIGH, 'mcq', D, 'What are the x-intercepts of x²/16 + y²/4 = 1?', '±4', ['±16', '±2', '±8'], 'set y = 0'),
  q('math.geom.ellipse', HIGH, 'mcq', A, 'For x²/25 + y²/9 = 1, where are the foci?', '(±4, 0)', ['(±5, 0)', '(0, ±4)', '(±3, 0)'], 'c² = a² − b² = 16'),

  q('math.geom.frenet-serret', UG, 'mcq', D, 'What does the torsion of a curve measure?', 'How fast it twists out of its osculating plane', ['How fast it turns within the plane', 'Its length', 'Its speed'], 'torsion is the twist; curvature the turn'),
  q('math.geom.frenet-serret', UG, 'mcq', A, 'How is the binormal B defined from T and N?', 'B = T × N', ['B = T + N', 'B = T · N', 'B = N × T'], 'the right-handed Frenet frame'),

  q('math.geom.geometric-constructions', HIGH, 'mcq', D, 'Which of these can be constructed with compass and straightedge?', 'The perpendicular bisector of a segment', ['A segment of length π', 'The trisection of a 60° angle', 'A square with the same area as a given circle'], 'the other three are classical impossibilities'),
  q('math.geom.geometric-constructions', HIGH, 'mcq', A, 'Can a regular hexagon be constructed with compass and straightedge?', 'Yes, by stepping the radius around a circle', ['No, 6 sides is too many', 'Only with a protractor', 'Only approximately'], 'the side of a regular hexagon equals its circumradius'),

  q('math.geom.geometric-proof', HIGH, 'mcq', D, 'In a proof, which reason justifies "∠ABC = ∠ABC"?', 'Reflexive property', ['Given', 'Vertical angles', 'Definition of a midpoint'], 'a shared angle equals itself'),
  q('math.geom.geometric-proof', HIGH, 'mcq', A, 'You proved two triangles congruent by SAS. Which phrase lets you conclude a pair of corresponding sides is equal?', 'Corresponding parts of congruent triangles are equal', ['Vertical angles are equal', 'Given', 'Alternate angles'], 'CPCTC'),

  q('math.geom.hyperbola', HIGH, 'mcq', D, 'What are the asymptotes of x²/9 − y²/16 = 1?', 'y = ±(4/3)x', ['y = ±(3/4)x', 'y = ±(16/9)x', 'x = ±3'], 'y = ±(b/a)x'),
  q('math.geom.hyperbola', HIGH, 'mcq', A, 'Which way does y²/4 − x²/9 = 1 open?', 'Up and down', ['Left and right', 'Only up', 'It is an ellipse'], 'the positive square decides the direction'),

  q('math.geom.length', ELEMENTARY, 'mcq', D, 'How many centimetres are in 2.5 metres?', '250', ['25', '2500', '205'], '1 m = 100 cm'),
  q('math.geom.length', ELEMENTARY, 'mcq', A, 'A pencil is 15 cm long. How many pencils laid end to end make 1.5 m?', '10', ['100', '1', '15'], '150 cm ÷ 15 cm'),

  q('math.geom.line-equation', HIGH, 'mcq', D, 'What is the equation of the line through (0, 4) with gradient −3?', 'y = −3x + 4', ['y = 4x − 3', 'y = −3x − 4', 'y = 3x + 4'], 'y = mx + c'),
  q('math.geom.line-equation', HIGH, 'mcq', A, 'What is the equation of the line through (1, 2) and (3, 8)?', 'y = 3x − 1', ['y = 3x + 2', 'y = 6x − 4', 'y = (1/3)x + 2'], 'gradient 6/2 = 3, then substitute (1, 2)'),

  q('math.geom.line-segment', MIDDLE, 'mcq', D, 'M is the midpoint of segment AB and AM = 7 cm. How long is AB?', '14 cm', ['7 cm', '3.5 cm', '21 cm'], 'the midpoint halves the segment'),
  q('math.geom.line-segment', MIDDLE, 'mcq', A, 'Points A, B and C lie on a line in that order with AB = 4 and AC = 11. What is BC?', '7', ['15', '4', '11'], 'segment addition: AB + BC = AC'),

  q('math.geom.line', MIDDLE, 'mcq', D, 'Two different lines in a plane meet. In how many points?', 'Exactly one', ['Two', 'Infinitely many', 'None'], 'distinct lines share at most one point'),
  q('math.geom.line', MIDDLE, 'mcq', A, 'Two lines in space never meet and are not parallel. What are they called?', 'Skew lines', ['Perpendicular lines', 'Intersecting lines', 'Such lines cannot exist'], 'skew lines exist only in three dimensions'),

  q('math.geom.midpoint-formula', MIDDLE, 'mcq', D, 'What is the midpoint of (−4, 1) and (2, 7)?', '(−1, 4)', ['(−3, 3)', '(−2, 8)', '(3, 3)'], 'average each coordinate'),
  q('math.geom.midpoint-formula', MIDDLE, 'mcq', A, 'The midpoint of A and B is (0, 0), and A = (3, −5). What is B?', '(−3, 5)', ['(3, −5)', '(1.5, −2.5)', '(6, −10)'], 'B is the reflection of A through the midpoint'),

  q('math.geom.parabola', HIGH, 'mcq', D, 'Where is the vertex of y = (x + 2)² + 1?', '(−2, 1)', ['(2, 1)', '(−2, −1)', '(1, −2)'], 'vertex form y = (x − h)² + k'),
  q('math.geom.parabola', HIGH, 'mcq', A, 'Where is the focus of y = x²/8?', '(0, 2)', ['(0, 8)', '(0, 1/8)', '(2, 0)'], 'x² = 4py with 4p = 8'),

  q('math.geom.parallel-lines', MIDDLE, 'mcq', D, 'A transversal cuts two parallel lines and one angle is 70°. What is its alternate angle?', '70°', ['110°', '20°', '140°'], 'alternate angles are equal'),
  q('math.geom.parallel-lines', MIDDLE, 'mcq', A, 'Do the lines y = 2x + 1 and y = 2x − 5 ever meet?', 'No, they are parallel', ['Yes, at x = 3', 'Yes, at the origin', 'Only far away'], 'equal gradients, different intercepts'),

  q('math.geom.parallelogram', MIDDLE, 'mcq', D, 'One angle of a parallelogram is 72°. What are the other three?', '108°, 72°, 108°', ['72°, 72°, 72°', '108°, 108°, 108°', '18°, 72°, 18°'], 'opposite angles are equal; neighbours sum to 180°'),
  q('math.geom.parallelogram', MIDDLE, 'mcq', A, 'Which property do the diagonals of every parallelogram have?', 'They bisect each other', ['They are equal in length', 'They are perpendicular', 'They bisect the angles'], 'the other properties need a rectangle or rhombus'),

  q('math.geom.perimeter', ELEMENTARY, 'mcq', D, 'A square has perimeter 36 cm. How long is each side?', '9 cm', ['6 cm', '18 cm', '12 cm'], 'four equal sides'),
  q('math.geom.perimeter', ELEMENTARY, 'mcq', A, 'A rectangle is 7 cm long and has perimeter 22 cm. How wide is it?', '4 cm', ['8 cm', '15 cm', '3 cm'], '2 × (7 + w) = 22'),

  q('math.geom.perpendicular-lines', MIDDLE, 'mcq', D, 'A line has gradient 2. What is the gradient of a line perpendicular to it?', '−1/2', ['2', '−2', '1/2'], 'gradients multiply to −1'),
  q('math.geom.perpendicular-lines', MIDDLE, 'mcq', A, 'Are y = 3x + 1 and x + 3y = 6 perpendicular?', 'Yes', ['No, they are parallel', 'No, their gradients are 3 and 3', 'Only where they cross'], 'gradients 3 and −1/3'),

  q('math.geom.plane', MIDDLE, 'mcq', D, 'Two different planes meet. What is their intersection?', 'A line', ['A point', 'Two points', 'A plane'], 'non-parallel planes meet in a line'),
  q('math.geom.plane', MIDDLE, 'mcq', A, 'How many planes contain a given straight line?', 'Infinitely many', ['Exactly one', 'Exactly two', 'None'], 'planes rotate about the line like pages of a book'),

  q('math.geom.platonic-solids', HIGH, 'mcq', D, 'Which Platonic solid has 12 pentagonal faces?', 'The dodecahedron', ['The icosahedron', 'The octahedron', 'The cube'], 'dodeca means twelve'),
  q('math.geom.platonic-solids', HIGH, 'mcq', A, 'Why can no Platonic solid have regular hexagons for faces?', 'Three hexagons at a vertex already make 360°, leaving no corner', ['Hexagons have too many sides to count', 'Hexagons cannot be regular', 'It is only a convention'], 'the angles meeting at a vertex must total less than 360°'),

  q('math.geom.point', MIDDLE, 'mcq', D, 'How many points lie on a line segment?', 'Infinitely many', ['Two', 'As many as you draw', 'One for each centimetre'], 'points have no size, so a segment holds endlessly many'),
  q('math.geom.point', MIDDLE, 'mcq', A, 'Three points do not lie on one line. How many different lines pass through two of them?', '3', ['1', '6', '2'], 'one line for each pair'),

  q('math.geom.polar-coordinates', HIGH, 'mcq', D, 'What are the Cartesian coordinates of the polar point (2, π/2)?', '(0, 2)', ['(2, 0)', '(2, π/2)', '(−2, 0)'], 'x = r cos θ, y = r sin θ'),
  q('math.geom.polar-coordinates', HIGH, 'mcq', A, 'Which polar coordinates describe the Cartesian point (−3, 0)?', '(3, π)', ['(3, 0)', '(−3, π)', '(0, 3)'], 'distance 3, pointing along the negative x-axis'),

  q('math.geom.polar-curves', HIGH, 'mcq', D, 'What curve is θ = π/4 in polar coordinates?', 'A straight line through the origin', ['A circle', 'A spiral', 'A single point'], 'every point at that angle'),
  q('math.geom.polar-curves', HIGH, 'mcq', A, 'How many petals does r = sin(3θ) have?', '3', ['6', '9', '1'], 'an odd multiplier gives that many petals'),

  q('math.geom.polygon-angle-sum', MIDDLE, 'mcq', D, 'What do the interior angles of a hexagon sum to?', '720°', ['1080°', '360°', '540°'], '(6 − 2) × 180°'),
  q('math.geom.polygon-angle-sum', MIDDLE, 'mcq', A, 'A polygon\'s interior angles sum to 1440°. How many sides has it?', '10', ['8', '12', '9'], '(n − 2) × 180 = 1440'),

  q('math.geom.polygon', MIDDLE, 'mcq', D, 'What is the name of a polygon with 8 sides?', 'Octagon', ['Hexagon', 'Heptagon', 'Decagon'], 'octo means eight'),
  q('math.geom.polygon', MIDDLE, 'mcq', A, 'How many diagonals does a pentagon have?', '5', ['10', '2', '3'], 'n(n − 3)/2'),

  q('math.geom.pythagorean-converse', MIDDLE, 'mcq', D, 'Which set of sides makes a right-angled triangle?', '9, 12, 15', ['4, 5, 6', '5, 7, 9', '2, 3, 4'], '81 + 144 = 225'),
  q('math.geom.pythagorean-converse', MIDDLE, 'mcq', A, 'A triangle has sides 7, 8 and 11. Is its largest angle acute, right or obtuse?', 'Obtuse, because 49 + 64 < 121', ['Acute, because 49 + 64 < 121', 'Right', 'It cannot be decided'], 'compare a² + b² with c²'),

  q('math.geom.pythagorean-theorem', MIDDLE, 'mcq', D, 'A ladder 13 m long reaches 12 m up a wall. How far is its foot from the wall?', '5 m', ['1 m', '25 m', '√313 m'], '13² − 12² = 25'),
  q('math.geom.pythagorean-theorem', MIDDLE, 'mcq', A, 'What is the length of the diagonal of a square with side 5 cm?', '5√2 cm', ['10 cm', '25 cm', '5 cm'], '√(5² + 5²)'),

  q('math.geom.quadrants', MIDDLE, 'mcq', D, 'In which quadrant are both coordinates negative?', 'Quadrant III', ['Quadrant I', 'Quadrant II', 'Quadrant IV'], 'quadrants are numbered anticlockwise from the top right'),
  q('math.geom.quadrants', MIDDLE, 'mcq', A, 'The point (a, b) is in Quadrant II. Which quadrant is (−a, b) in?', 'Quadrant I', ['Quadrant II', 'Quadrant III', 'Quadrant IV'], 'negating x reflects across the y-axis'),

  q('math.geom.quadrilateral', MIDDLE, 'mcq', D, 'What do the interior angles of any quadrilateral sum to?', '360°', ['180°', '540°', '400°'], 'two triangles'),
  q('math.geom.quadrilateral', MIDDLE, 'mcq', A, 'A quadrilateral has four equal sides but no right angle. What is it?', 'A rhombus', ['A square', 'A rectangle', 'A trapezoid'], 'equal sides without right angles'),

  q('math.geom.ray', MIDDLE, 'mcq', D, 'Ray PQ starts at P. Which point must lie on it?', 'P', ['Every point on line PQ', 'A point beyond P away from Q', 'None'], 'a ray includes its endpoint and continues through Q'),
  q('math.geom.ray', MIDDLE, 'mcq', A, 'Two rays share an endpoint and point in opposite directions. What do they form?', 'A straight line (a straight angle)', ['A right angle', 'A segment', 'Two separate lines'], 'opposite rays'),

  q('math.geom.reflection', HIGH, 'mcq', D, 'Reflecting (−2, 7) in the y-axis gives which point?', '(2, 7)', ['(−2, −7)', '(7, −2)', '(2, −7)'], 'the y-axis flips the sign of x'),
  q('math.geom.reflection', HIGH, 'mcq', A, 'Reflecting (4, 1) in the line y = −x gives which point?', '(−1, −4)', ['(1, 4)', '(−4, −1)', '(4, −1)'], 'swap the coordinates and negate both'),

  q('math.geom.regular-polygon', MIDDLE, 'mcq', D, 'What is each interior angle of a regular octagon?', '135°', ['120°', '45°', '150°'], '1080° ÷ 8'),
  q('math.geom.regular-polygon', MIDDLE, 'mcq', A, 'Each exterior angle of a regular polygon is 24°. How many sides has it?', '15', ['24', '12', '7.5'], 'exterior angles sum to 360°'),

  q('math.geom.right-triangle', MIDDLE, 'misconception_probe', F, 'In a right triangle, which side is always the longest?', 'The hypotenuse', ['The side at the bottom', 'The side next to the right angle', 'It depends on how it is drawn'], 'the side opposite the right angle'),
  q('math.geom.right-triangle', MIDDLE, 'misconception_probe', P, 'Can a right triangle also have an obtuse angle?', 'No, the other two angles must sum to 90°', ['Yes, if it is large', 'Yes, if the legs are unequal', 'Only on a curved surface'], 'the angle sum leaves 90° for the two others'),

  q('math.geom.rotation', HIGH, 'mcq', D, 'Rotating (3, 1) by 180° about the origin gives which point?', '(−3, −1)', ['(1, 3)', '(−1, 3)', '(3, −1)'], 'a half-turn negates both coordinates'),
  q('math.geom.rotation', HIGH, 'mcq', A, 'Rotating (2, 0) by 90° anticlockwise about (1, 0) gives which point?', '(1, 1)', ['(0, 2)', '(1, −1)', '(2, 1)'], 'shift so the centre is the origin, rotate, then shift back'),

  q('math.geom.similar-triangles', HIGH, 'mcq', F, 'Two triangles are similar with scale factor 2. A side of the small one is 5. How long is the matching side of the large one?', '10', ['7', '2.5', '25'], 'lengths scale by the factor'),
  q('math.geom.similar-triangles', HIGH, 'mcq', P, 'A 2 m post casts a 3 m shadow. At the same time a tree casts a 12 m shadow. How tall is the tree?', '8 m', ['18 m', '11 m', '6 m'], 'similar right triangles: 2/3 = h/12'),

  q('math.geom.slope', MIDDLE, 'misconception_probe', F, 'What is the slope of the line through (0, 0) and (2, 6)?', '3', ['1/3', '6', '2'], 'rise over run'),
  q('math.geom.slope', MIDDLE, 'misconception_probe', P, 'What is the slope of the line through (1, 5) and (4, −1)?', '−2', ['2', '−1/2', '4/3'], 'a falling line has negative slope: −6 ÷ 3'),

  q('math.geom.solid-3d', MIDDLE, 'mcq', D, 'How many faces, edges and vertices does a triangular prism have?', '5 faces, 9 edges, 6 vertices', ['6 faces, 9 edges, 5 vertices', '5 faces, 6 edges, 9 vertices', '3 faces, 6 edges, 6 vertices'], 'check V − E + F = 6 − 9 + 5 = 2'),
  q('math.geom.solid-3d', MIDDLE, 'mcq', A, 'A polyhedron has 12 vertices and 30 edges. How many faces does it have?', '20', ['18', '42', '22'], "Euler's formula V − E + F = 2"),

  q('math.geom.surface-area', MIDDLE, 'mcq', D, 'What is the surface area of a cube with edge 3 cm?', '54 cm²', ['27 cm²', '9 cm²', '36 cm²'], 'six faces of 9 cm²'),
  q('math.geom.surface-area', MIDDLE, 'mcq', A, 'What is the total surface area of a closed cylinder with radius 2 and height 5?', '28π', ['20π', '24π', '10π'], '2πr² + 2πrh = 8π + 20π'),

  q('math.geom.transformations', HIGH, 'mcq', D, 'Which transformation changes the size of a shape?', 'A dilation', ['A rotation', 'A reflection', 'A translation'], 'the other three are rigid motions'),
  q('math.geom.transformations', HIGH, 'mcq', A, 'Reflecting in the x-axis and then in the y-axis has the same effect as which single transformation?', 'A rotation of 180° about the origin', ['A reflection in y = x', 'A translation', 'Nothing changes'], '(x, y) → (x, −y) → (−x, −y)'),

  q('math.geom.translation', MIDDLE, 'mcq', D, 'A shape is translated by the vector (−4, 2). Where does the point (5, 1) go?', '(1, 3)', ['(9, −1)', '(1, −1)', '(−20, 2)'], 'add the vector to the coordinates'),
  q('math.geom.translation', MIDDLE, 'mcq', A, 'Translating by (2, 3) and then by (−5, 1) is the same as one translation by what?', '(−3, 4)', ['(7, 2)', '(−10, 3)', '(3, −4)'], 'translation vectors add'),

  q('math.geom.trapezoid', MIDDLE, 'mcq', D, 'A trapezoid has parallel sides 5 and 9 and height 6. What is its area?', '42', ['84', '30', '54'], '½ × (5 + 9) × 6'),
  q('math.geom.trapezoid', MIDDLE, 'mcq', A, 'A trapezoid has area 60, height 6 and one parallel side 8. How long is the other parallel side?', '12', ['20', '4', '10'], '½ × (8 + b) × 6 = 60'),

  q('math.geom.triangle-angle-sum', MIDDLE, 'mcq', D, 'An isosceles triangle has a top angle of 40°. What is each base angle?', '70°', ['40°', '140°', '50°'], '(180 − 40) ÷ 2'),
  q('math.geom.triangle-angle-sum', MIDDLE, 'mcq', A, 'A triangle\'s angles are x, 2x and 3x. What is the largest angle?', '90°', ['60°', '30°', '120°'], '6x = 180'),

  q('math.geom.triangle-centers', HIGH, 'mcq', D, 'Which centre is the intersection of the three medians?', 'The centroid', ['The circumcentre', 'The incentre', 'The orthocentre'], 'medians meet at the balance point'),
  q('math.geom.triangle-centers', HIGH, 'mcq', A, 'In a right triangle, where is the circumcentre?', 'At the midpoint of the hypotenuse', ['At the right-angle vertex', 'Outside the triangle', 'At the centroid'], 'the hypotenuse is a diameter of the circumcircle'),

  q('math.geom.triangle-types', MIDDLE, 'mcq', D, 'A triangle has angles 30°, 60° and 90°. What type is it?', 'A right-angled scalene triangle', ['An isosceles triangle', 'An equilateral triangle', 'An obtuse triangle'], 'all three angles differ, so all three sides do'),
  q('math.geom.triangle-types', MIDDLE, 'mcq', A, 'Can a triangle be both obtuse and isosceles?', 'Yes, for example angles 120°, 30°, 30°', ['No, isosceles triangles are acute', 'No, an obtuse angle needs a long side', 'Only if it is also right-angled'], 'the obtuse angle sits between the equal sides'),

  q('math.geom.triangle', MIDDLE, 'misconception_probe', F, 'How many sides does a triangle have?', '3', ['4', '2', 'It depends on the triangle'], 'tri means three'),
  q('math.geom.triangle', MIDDLE, 'misconception_probe', P, 'Can a triangle have sides 4, 5 and 9?', 'No, 4 + 5 is not more than 9', ['Yes', 'Yes, it is a right triangle', 'Only if it is drawn large'], 'the triangle inequality'),

  q('math.geom.vectors-2d', HIGH, 'misconception_probe', F, 'What is (2, 3) + (4, −1)?', '(6, 2)', ['(8, −3)', '(6, 4)', '(2, 3, 4, −1)'], 'add component by component'),
  q('math.geom.vectors-2d', HIGH, 'misconception_probe', D, 'What is 3 × (2, −1)?', '(6, −3)', ['(6, −1)', '(5, 2)', '(6, 3)'], 'scalar multiplication scales every component'),

  q('math.geom.vectors-3d', HIGH, 'mcq', D, 'What is (1, 2, 3) + (4, 0, −1)?', '(5, 2, 2)', ['(4, 0, −3)', '(5, 2, 4)', '(5, 2, −2)'], 'componentwise addition'),
  q('math.geom.vectors-3d', HIGH, 'mcq', A, 'Which vector is a unit vector?', '(0, 0.6, 0.8)', ['(1, 1, 1)', '(0.5, 0.5, 0.5)', '(1, 0, 1)'], '0.36 + 0.64 = 1'),

  q('math.geom.volume', MIDDLE, 'mcq', D, 'What is the volume of a cylinder with radius 3 cm and height 10 cm?', '90π cm³', ['30π cm³', '60π cm³', '900π cm³'], 'πr²h'),
  q('math.geom.volume', MIDDLE, 'mcq', A, 'A cone and a cylinder have the same base and height. The cylinder holds 36 litres. How much does the cone hold?', '12 litres', ['18 litres', '36 litres', '108 litres'], 'a cone is one third of its cylinder'),

  q('math.geom.x-y-coordinates', ELEMENTARY, 'mcq', D, 'A point is 4 steps right of the origin and 0 steps up. What are its coordinates?', '(4, 0)', ['(0, 4)', '(4, 4)', '(0, 0)'], 'x first, then y'),
  q('math.geom.x-y-coordinates', ELEMENTARY, 'mcq', A, 'Which point is further from the x-axis: (2, 7) or (7, 2)?', '(2, 7)', ['(7, 2)', 'They are the same distance', 'Neither is near the axis'], 'the distance from the x-axis is the y-coordinate'),
]
