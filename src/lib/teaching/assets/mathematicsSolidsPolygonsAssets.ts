/**
 * Twenty-sixth batch — polygons named properly, and the step into three
 * dimensions.
 *
 * The plane half of this batch is one misconception in four costumes:
 * classifying by APPEARANCE rather than by measured property. A rhombus
 * "feels" regular; a rotated right triangle "doesn't look right"; a
 * slanted trapezoid leg gets read as its height. Each register records
 * the same substitution of impression for check.
 *
 * The solid half is one derivation the registers show being skipped:
 * volume and surface area are not new techniques. Surface area is the
 * area of the faces, added — nothing more. And the 1/3 in a pyramid's
 * volume is not arbitrary: three pyramids fill their prism.
 *
 *   PLANE  polygon, triangle-types, regular-polygon, trapezoid
 *   SOLID  solid-3d, volume, surface-area, platonic-solids
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const POLY = 'math.geom.polygon'
const TTYPE = 'math.geom.triangle-types'
const REGP = 'math.geom.regular-polygon'
const TRAP = 'math.geom.trapezoid'
const SOL3 = 'math.geom.solid-3d'
const VOL = 'math.geom.volume'
const SAREA = 'math.geom.surface-area'
const PLAT = 'math.geom.platonic-solids'

export const MATHEMATICS_SOLIDS_POLYGONS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: POLY, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'A polygon is a closed figure made of STRAIGHT line segments meeting end to end. A '
      + 'circle is not one, and neither is a shape with a single curved side however many '
      + 'straight ones it has — one curve disqualifies it outright.\n\n'
      + 'Equal sides do not make it regular. A rhombus has four equal sides and is not a '
      + 'regular polygon, because its angles are not equal; regularity needs BOTH, and each '
      + 'condition alone is satisfied by a shape that fails the other.\n\n'
      + 'Its interior angles sum to (n − 2) × 180°, and that comes from cutting it into n − 2 '
      + 'triangles by diagonals from one vertex — not from a formula to be recalled. A '
      + 'hexagon gives four triangles and 720°. Knowing the cut means you can rebuild the '
      + 'formula and can also check it: divide by n only when the polygon is regular, since '
      + 'otherwise the total is right and the individual angles differ.',
    targetedMisconceptions: [`${POLY}:MC-1`, `${POLY}:MC-3`],
    source: eb(POLY, 'Identity + Misconception register — straight sides only; equal sides is not regular'),
  },
  {
    conceptId: TTYPE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'Triangles are classified twice over, and the two systems run at the same time. By '
      + 'SIDES: equilateral (three equal), isosceles (at least two), scalene (none). By '
      + 'ANGLES: acute, right, obtuse.\n\n'
      + 'Every triangle gets one label from each list. A triangle can be right AND isosceles '
      + '— legs 1, 1 and hypotenuse √2 — and calling it "a right triangle" does not stop it '
      + 'being isosceles; the right angle is not a classification that replaces the others. '
      + 'Answering only one system leaves half the description missing.\n\n'
      + 'Classification is by MEASUREMENT, never by how the drawing looks. A triangle with '
      + 'sides 5.0, 5.05 and 5.0 is isosceles-ish only to the eye and is scalene in fact, and '
      + 'a right triangle rotated 45° stops looking right and remains one. The prototype '
      + 'drawn in every textbook — a wide triangle sitting flat on its base — is one example, '
      + 'not the shape a triangle has to have.',
    targetedMisconceptions: [`${TTYPE}:MC-1`, `${TTYPE}:MC-4`],
    source: eb(TTYPE, 'Identity + Misconception register — two systems at once; measure rather than look'),
  },
  {
    conceptId: REGP, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'A regular polygon has all sides equal AND all angles equal. Both, always — a rhombus '
      + 'satisfies the first and a rectangle the second, and neither is regular. "Regular" is '
      + 'a strict conjunction rather than a word for "looks tidy".\n\n'
      + 'Its EXTERIOR angles are the easy ones: they sum to 360° for any convex polygon, so '
      + 'each one is 360°/n. Walking once round the boundary turns you through a full circle, '
      + 'and each turn is the exterior angle — which is why this is the formula worth '
      + 'remembering.\n\n'
      + 'The interior angle is then its SUPPLEMENT: 180° − 360°/n. For a hexagon that is 180 '
      + '− 60 = 120°. It is not 180/n, which would give 30° for a hexagon and shrink as the '
      + 'polygon gains sides — the opposite of what happens, since more sides means flatter '
      + 'corners and LARGER interior angles. Checking the direction of change catches that '
      + 'error without recalling anything.',
    targetedMisconceptions: [`${REGP}:MC-1`, `${REGP}:MC-3`],
    source: eb(REGP, 'Identity + Misconception register — both conditions; interior is the supplement of 360/n'),
  },
  {
    conceptId: TRAP, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'A trapezoid is a quadrilateral with at least one pair of parallel sides. Those two '
      + 'parallel sides are BOTH called bases — the word is not reserved for the one at the '
      + 'bottom, which is why the area formula ½(b₁ + b₂)h names two of them.\n\n'
      + 'The height is the perpendicular distance between the bases, and on a general '
      + 'trapezoid that is NOT the slanted leg. Worked examples often use right trapezoids, '
      + 'where one leg happens to be perpendicular and so equals the height, and the habit '
      + 'transfers to slanted cases where it is simply wrong — a leg of 5 with a true height '
      + 'of 4 gives an area a quarter too large.\n\n'
      + 'The legs need not be equal either. An isosceles trapezoid is the special case with '
      + 'equal legs and a line of symmetry; most trapezoids have neither. And whether a '
      + 'parallelogram counts as one depends on the definition in use — "at least one pair" '
      + 'includes parallelograms, "exactly one pair" excludes them — so it is worth checking '
      + 'which convention a question assumes rather than assuming there is only one.',
    targetedMisconceptions: [`${TRAP}:MC-1`, `${TRAP}:MC-2`],
    source: eb(TRAP, 'Identity + Misconception register — both sides are bases; the leg is not the height'),
  },
  {
    conceptId: SOL3, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'A polyhedron is a solid bounded by flat polygonal faces. Faces, edges and vertices are '
      + 'counted, and Euler\'s formula ties them: V − E + F = 2. A cube gives 8 − 12 + 6 = 2.\n\n'
      + 'The formula applies to POLYHEDRA, and only to those without holes. A cylinder or '
      + 'sphere has curved surfaces and is not a polyhedron, so the count does not apply; and '
      + 'a polyhedron with a hole through it — a torus-shaped one — gives V − E + F = 0 '
      + 'instead. The 2 is a property of solids topologically like a sphere, not a universal '
      + 'arithmetic fact.\n\n'
      + 'Prisms and pyramids are the two families worth telling apart. A PRISM has two '
      + 'identical parallel faces joined by rectangles, and a constant cross-section all the '
      + 'way along. A PYRAMID has one base and an apex, and its cross-section shrinks to a '
      + 'point. That structural difference is exactly what produces the ⅓ in the pyramid\'s '
      + 'volume, so confusing them makes both volume formulas arbitrary.',
    targetedMisconceptions: [`${SOL3}:MC-1`, `${SOL3}:MC-2`],
    source: eb(SOL3, 'Identity + Misconception register — Euler needs a hole-free polyhedron; prism vs pyramid'),
  },
  {
    conceptId: VOL, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'Volume counts unit CUBES that fit inside, which is why it is measured in cubic units. '
      + 'For any prism or cylinder it is (area of cross-section) × height — one formula, not '
      + 'a list, because the cross-section never changes as you go along.\n\n'
      + 'A pyramid or cone is exactly ⅓ of the prism or cylinder with the same base and '
      + 'height. The ⅓ is not arbitrary: three pyramids of the right shape assemble into '
      + 'their prism, and you can build the demonstration out of card. Knowing that means the '
      + 'formula is recoverable rather than remembered.\n\n'
      + 'So the apparent zoo of formulas is one idea plus one factor. And volume scales as '
      + 'the CUBE of length — double every dimension and it goes up eight times, which is why '
      + 'a tin twice the size holds eight times as much rather than twice. Getting an answer '
      + 'in square units instead of cubic is the fastest sign you computed a surface area '
      + 'instead.',
    targetedMisconceptions: [`${VOL}:MC-1`, `${VOL}:MC-2`],
    source: eb(VOL, 'Identity + Misconception register — cross-section × height; three pyramids fill the prism'),
  },
  {
    conceptId: SAREA, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'Surface area is the total area of everything on the outside — the area of the faces, '
      + 'added up. It is not a new technique: it is the plane-area formulas you already have, '
      + 'applied once per face.\n\n'
      + 'Which makes the net the reliable method. Unfold the solid flat and every face is '
      + 'visible and countable; a closed box has SIX rectangles, and the ones you cannot see '
      + 'in the drawing are the ones that get dropped. A missing face is not a small slip — '
      + 'it can be a sixth of the answer, and the arithmetic that follows will look perfectly '
      + 'reasonable.\n\n'
      + 'Curved surfaces cannot be handled by summing faces, because they have none. A '
      + 'sphere\'s 4πr² and a cylinder\'s curved 2πrh come from calculus, not from '
      + 'decomposition — a cylinder is two circles plus one rectangle that has been rolled '
      + 'up, and a sphere cannot be flattened at all, which is also why every world map '
      + 'distorts something.',
    targetedMisconceptions: [`${SAREA}:MC-1`, `${SAREA}:MC-2`],
    source: eb(SAREA, 'Identity + Misconception register — add the faces; use a net so none is dropped'),
  },
  {
    conceptId: PLAT, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A Platonic solid has faces that are all the SAME regular polygon, with the same number '
      + 'meeting at every vertex. There are exactly five: tetrahedron, cube, octahedron, '
      + 'dodecahedron, icosahedron — and exactly five is a theorem, not a historical '
      + 'accident.\n\n'
      + 'The faces need not be triangles. The cube is Platonic with six squares, and the '
      + 'dodecahedron with twelve pentagons; three of the five are triangular and that is not '
      + 'the requirement. What matters is that all faces are congruent regular polygons and '
      + 'every vertex looks alike.\n\n'
      + 'And a rectangular box is NOT one, even though it is tidy and every vertex matches — '
      + 'its faces are rectangles, which are not regular polygons unless they are squares. '
      + 'Only five exist because the angles run out: at least three faces must meet at a '
      + 'vertex and their angles must total under 360°, which permits three, four or five '
      + 'triangles, three squares, or three pentagons, and nothing else. All five satisfy '
      + 'V − E + F = 2 — the cube is 8 − 12 + 6, and getting the signs the other way round '
      + 'gives 10, which is the check that something has been mis-set.',
    targetedMisconceptions: [`${PLAT}:MC-1`, `${PLAT}:MC-2`],
    source: eb(PLAT, 'Identity + Misconception register — not only triangles; a box is not Platonic'),
  },
]

export const MATHEMATICS_SOLIDS_POLYGONS_PROBES: SeedProbe[] = [
  // --- math.geom.polygon --------------------------------------------------------------
  {
    conceptId: POLY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'A closed figure has five straight sides and one curved one. Is it a polygon?',
    choices: [
      { text: 'No — one curve disqualifies it; every side must be straight', isCorrect: true },
      { text: 'Yes — most of its sides are straight', isCorrect: false, misconceptionId: `${POLY}:MC-3` },
      { text: 'Yes — it is closed, which is the only condition', isCorrect: false, misconceptionId: `${POLY}:MC-3` },
    ],
    targetedMisconceptions: [`${POLY}:MC-3`],
    source: eb(POLY, 'Assessment gate — straight sides only'),
  },
  {
    conceptId: POLY, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A rhombus has four equal sides. Is it a regular polygon?',
    choices: [
      { text: 'No — regularity needs equal sides AND equal angles, and its angles differ', isCorrect: true },
      { text: 'Yes — equal sides is what regular means', isCorrect: false, misconceptionId: `${POLY}:MC-1` },
      { text: 'Yes, provided it is drawn symmetrically', isCorrect: false, misconceptionId: `${POLY}:MC-1` },
    ],
    targetedMisconceptions: [`${POLY}:MC-1`],
    source: eb(POLY, 'Misconception register — equal sides is not enough'),
  },
  {
    conceptId: POLY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Where does (n − 2) × 180° come from?',
    choices: [
      { text: 'Diagonals from one vertex cut the polygon into n − 2 triangles', isCorrect: true },
      { text: 'It is a formula to memorise', isCorrect: false, misconceptionId: `${POLY}:MC-2` },
      { text: 'From subtracting the two exterior angles', isCorrect: false, misconceptionId: `${POLY}:MC-2` },
    ],
    targetedMisconceptions: [`${POLY}:MC-2`],
    source: eb(POLY, 'Transfer probe — the derivation makes it recoverable'),
  },

  // --- math.geom.triangle-types ---------------------------------------------------------
  {
    conceptId: TTYPE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'A triangle has sides 5.0, 5.05 and 5.0 cm. What is it?',
    choices: [
      { text: 'Scalene — no two sides are equal, however close they look', isCorrect: true },
      { text: 'Isosceles — two sides are nearly the same', isCorrect: false, misconceptionId: `${TTYPE}:MC-1` },
      { text: 'Equilateral — all three are about 5', isCorrect: false, misconceptionId: `${TTYPE}:MC-1` },
    ],
    targetedMisconceptions: [`${TTYPE}:MC-1`],
    source: eb(TTYPE, 'Assessment gate — measurement, not appearance'),
  },
  {
    conceptId: TTYPE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A triangle has legs 1, 1 and hypotenuse √2. How do you classify it?',
    choices: [
      { text: 'Right AND isosceles — the two systems run at the same time', isCorrect: true },
      { text: 'Right only — the right angle replaces the side classification', isCorrect: false, misconceptionId: `${TTYPE}:MC-4` },
      { text: 'Isosceles only — you pick one system', isCorrect: false, misconceptionId: `${TTYPE}:MC-3` },
    ],
    targetedMisconceptions: [`${TTYPE}:MC-3`, `${TTYPE}:MC-4`],
    source: eb(TTYPE, 'Misconception register — both classifications apply'),
  },
  {
    conceptId: TTYPE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A right triangle is rotated 45° so it no longer "looks right". Is it still right-angled?',
    choices: [
      { text: 'Yes — rotation does not change any angle; the prototype orientation is one example, not a requirement', isCorrect: true },
      { text: 'No — it must sit flat on its base to count', isCorrect: false, misconceptionId: `${TTYPE}:MC-2` },
      { text: 'Only if the right angle is at the bottom left', isCorrect: false, misconceptionId: `${TTYPE}:MC-2` },
    ],
    targetedMisconceptions: [`${TTYPE}:MC-2`],
    source: eb(TTYPE, 'Transfer probe — prototype bias'),
  },

  // --- math.geom.regular-polygon ----------------------------------------------------------
  {
    conceptId: REGP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is a rectangle a regular polygon?',
    choices: [
      { text: 'No — its angles are equal but its sides are not; regular needs BOTH', isCorrect: true },
      { text: 'Yes — all four angles are equal', isCorrect: false, misconceptionId: `${REGP}:MC-1` },
      { text: 'Yes — it is symmetric', isCorrect: false, misconceptionId: `${REGP}:MC-1` },
    ],
    targetedMisconceptions: [`${REGP}:MC-1`],
    source: eb(REGP, 'Assessment gate — a strict conjunction'),
  },
  {
    conceptId: REGP, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'What is each interior angle of a regular hexagon?',
    choices: [
      { text: '120° — the exterior angle is 360/6 = 60°, and the interior is its supplement', isCorrect: true },
      { text: '30° — that is 180/6', isCorrect: false, misconceptionId: `${REGP}:MC-3` },
      { text: '60° — the exterior angle', isCorrect: false, misconceptionId: `${REGP}:MC-2` },
    ],
    targetedMisconceptions: [`${REGP}:MC-2`, `${REGP}:MC-3`],
    source: eb(REGP, 'Misconception register — the interior is the supplement, not 180/n'),
  },
  {
    conceptId: REGP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'As a regular polygon gains sides, what happens to each interior angle?',
    choices: [
      { text: 'It GROWS toward 180° — more sides means flatter corners, which rules out 180/n', isCorrect: true },
      { text: 'It shrinks, since 180 is divided among more sides', isCorrect: false, misconceptionId: `${REGP}:MC-3` },
      { text: 'It stays the same', isCorrect: false, misconceptionId: `${REGP}:MC-3` },
    ],
    targetedMisconceptions: [`${REGP}:MC-3`],
    source: eb(REGP, 'Transfer probe — the direction of change catches the error'),
  },

  // --- math.geom.trapezoid ------------------------------------------------------------------
  {
    conceptId: TRAP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'In ½(b₁ + b₂)h, what are b₁ and b₂?',
    choices: [
      { text: 'BOTH parallel sides — the word "base" covers both, not just the lower one', isCorrect: true },
      { text: 'The bottom side and the height', isCorrect: false, misconceptionId: `${TRAP}:MC-2` },
      { text: 'The two slanted legs', isCorrect: false, misconceptionId: `${TRAP}:MC-2` },
    ],
    targetedMisconceptions: [`${TRAP}:MC-2`],
    source: eb(TRAP, 'Assessment gate — both parallel sides are bases'),
  },
  {
    conceptId: TRAP, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A trapezoid has a slanted leg of 5 and a perpendicular height of 4. Which goes in the area formula?',
    choices: [
      { text: '4 — the height is the perpendicular distance between the bases, not the leg', isCorrect: true },
      { text: '5 — the leg is the height', isCorrect: false, misconceptionId: `${TRAP}:MC-1` },
      { text: 'Either; they are close enough', isCorrect: false, misconceptionId: `${TRAP}:MC-1` },
    ],
    targetedMisconceptions: [`${TRAP}:MC-1`],
    source: eb(TRAP, 'Misconception register — leg-as-height, learnt from right trapezoids'),
  },
  {
    conceptId: TRAP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Must a trapezoid have equal legs?',
    choices: [
      { text: 'No — that is the ISOSCELES special case; most trapezoids have unequal legs', isCorrect: true },
      { text: 'Yes — trapezoids are symmetric by definition', isCorrect: false, misconceptionId: `${TRAP}:MC-3` },
      { text: 'Yes, otherwise it is a parallelogram', isCorrect: false, misconceptionId: `${TRAP}:MC-4` },
    ],
    targetedMisconceptions: [`${TRAP}:MC-3`, `${TRAP}:MC-4`],
    source: eb(TRAP, 'Transfer probe — isosceles is the special case'),
  },

  // --- math.geom.solid-3d --------------------------------------------------------------------
  {
    conceptId: SOL3, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Check Euler\'s formula on a cube.',
    choices: [
      { text: '8 − 12 + 6 = 2', isCorrect: true },
      { text: '8 + 12 − 6 = 14', isCorrect: false, misconceptionId: `${SOL3}:MC-1` },
      { text: '8 − 6 + 12 = 14, counting faces where edges belong', isCorrect: false, misconceptionId: `${SOL3}:MC-1` },
    ],
    targetedMisconceptions: [`${SOL3}:MC-1`],
    source: eb(SOL3, 'Assessment gate — V − E + F = 2'),
  },
  {
    conceptId: SOL3, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does Euler\'s formula apply to a cylinder?',
    choices: [
      { text: 'No — a cylinder has curved surfaces, so it is not a polyhedron and the count does not apply', isCorrect: true },
      { text: 'Yes — it has 2 faces, 2 edges and 0 vertices', isCorrect: false, misconceptionId: `${SOL3}:MC-1` },
      { text: 'Yes — the formula holds for every solid', isCorrect: false, misconceptionId: `${SOL3}:MC-1` },
    ],
    targetedMisconceptions: [`${SOL3}:MC-1`],
    source: eb(SOL3, 'Misconception register — Euler needs a polyhedron'),
  },
  {
    conceptId: SOL3, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'What distinguishes a prism from a pyramid?',
    choices: [
      { text: 'A prism has a constant cross-section; a pyramid\'s shrinks to an apex — which is where the ⅓ comes from', isCorrect: true },
      { text: 'Nothing structural; the names are interchangeable', isCorrect: false, misconceptionId: `${SOL3}:MC-2` },
      { text: 'A prism has triangular faces and a pyramid rectangular ones', isCorrect: false, misconceptionId: `${SOL3}:MC-2` },
    ],
    targetedMisconceptions: [`${SOL3}:MC-2`],
    source: eb(SOL3, 'Transfer probe — the structural difference produces the ⅓'),
  },

  // --- math.geom.volume ------------------------------------------------------------------------
  {
    conceptId: VOL, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What is the volume of any prism or cylinder?',
    choices: [
      { text: 'Cross-sectional area × height — one formula, since the cross-section never changes', isCorrect: true },
      { text: 'A different formula for each solid, to be memorised', isCorrect: false, misconceptionId: `${VOL}:MC-1` },
      { text: 'Length × width × height, always', isCorrect: false, misconceptionId: `${VOL}:MC-1` },
    ],
    targetedMisconceptions: [`${VOL}:MC-1`],
    source: eb(VOL, 'Assessment gate — one formula for constant cross-section'),
  },
  {
    conceptId: VOL, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Why does a pyramid\'s volume have a ⅓ in it?',
    choices: [
      { text: 'Three pyramids of the right shape assemble into their prism — you can build it from card', isCorrect: true },
      { text: 'It is an arbitrary constant found by measurement', isCorrect: false, misconceptionId: `${VOL}:MC-2` },
      { text: 'Because a pyramid has three dimensions', isCorrect: false, misconceptionId: `${VOL}:MC-2` },
    ],
    targetedMisconceptions: [`${VOL}:MC-2`],
    source: eb(VOL, 'Misconception register — the ⅓ is derivable'),
  },
  {
    conceptId: VOL, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Double every dimension of a tin. How much more does it hold?',
    choices: [
      { text: 'Eight times — volume scales as the CUBE of length', isCorrect: true },
      { text: 'Twice as much', isCorrect: false, misconceptionId: `${VOL}:MC-1` },
      { text: 'Four times — that is how AREA scales', isCorrect: false, misconceptionId: `${VOL}:MC-1` },
    ],
    targetedMisconceptions: [`${VOL}:MC-1`],
    source: eb(VOL, 'Transfer probe — volume scales as the cube (extends the register: cubic scaling is not listed there)'),
  },

  // --- math.geom.surface-area ---------------------------------------------------------------------
  {
    conceptId: SAREA, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'How do you find the surface area of a box?',
    choices: [
      { text: 'Add the areas of its faces — it is plane geometry applied once per face', isCorrect: true },
      { text: 'With a separate three-dimensional technique', isCorrect: false, misconceptionId: `${SAREA}:MC-1` },
      { text: 'Multiply length by width by height', isCorrect: false },
    ],
    targetedMisconceptions: [`${SAREA}:MC-1`],
    source: eb(SAREA, 'Assessment gate — no new technique'),
  },
  {
    conceptId: SAREA, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'You counted five faces on a closed box. How serious is that?',
    choices: [
      { text: 'A sixth of the answer is missing — draw the net so no face can be dropped', isCorrect: true },
      { text: 'Minor — one face out of six is a rounding-level error', isCorrect: false, misconceptionId: `${SAREA}:MC-2` },
      { text: 'Not serious if the five were computed correctly', isCorrect: false, misconceptionId: `${SAREA}:MC-2` },
    ],
    targetedMisconceptions: [`${SAREA}:MC-2`],
    source: eb(SAREA, 'Misconception register — a missed face is not minor'),
  },
  {
    conceptId: SAREA, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Can you get a sphere\'s surface area by adding up faces?',
    choices: [
      { text: 'No — it has none; 4πr² comes from calculus, and a sphere cannot be flattened at all', isCorrect: true },
      { text: 'Yes — treat it as many small flat faces and add them', isCorrect: false, misconceptionId: `${SAREA}:MC-3` },
      { text: 'Yes — unfold it into a net like any other solid', isCorrect: false, misconceptionId: `${SAREA}:MC-3` },
    ],
    targetedMisconceptions: [`${SAREA}:MC-3`],
    source: eb(SAREA, 'Transfer probe — curved surfaces have no faces'),
  },

  // --- math.geom.platonic-solids ---------------------------------------------------------------------
  {
    conceptId: PLAT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is a cube a Platonic solid?',
    choices: [
      { text: 'Yes — six congruent squares, three meeting at each vertex', isCorrect: true },
      { text: 'No — Platonic solids must have triangular faces', isCorrect: false, misconceptionId: `${PLAT}:MC-1` },
      { text: 'No — only the tetrahedron qualifies', isCorrect: false, misconceptionId: `${PLAT}:MC-1` },
    ],
    targetedMisconceptions: [`${PLAT}:MC-1`],
    source: eb(PLAT, 'Assessment gate — the faces need not be triangles'),
  },
  {
    conceptId: PLAT, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A rectangular box has matching vertices and flat faces. Is it Platonic?',
    choices: [
      { text: 'No — its faces are rectangles, which are not REGULAR polygons unless they are squares', isCorrect: true },
      { text: 'Yes — every vertex looks alike', isCorrect: false, misconceptionId: `${PLAT}:MC-2` },
      { text: 'Yes — it is a cube stretched, and a cube is Platonic', isCorrect: false, misconceptionId: `${PLAT}:MC-2` },
    ],
    targetedMisconceptions: [`${PLAT}:MC-2`],
    source: eb(PLAT, 'Misconception register — a box is not Platonic'),
  },
  {
    conceptId: PLAT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Why are there exactly five?',
    choices: [
      { text: 'Three faces must meet at a vertex with angles totalling under 360°, which permits only five combinations', isCorrect: true },
      { text: 'Nobody has found a sixth yet', isCorrect: false },
      { text: 'Because five regular polygons exist', isCorrect: false, misconceptionId: `${PLAT}:MC-1` },
    ],
    targetedMisconceptions: [`${PLAT}:MC-1`],
    source: eb(PLAT, 'Transfer probe — exactly five is a theorem'),
  },
]
