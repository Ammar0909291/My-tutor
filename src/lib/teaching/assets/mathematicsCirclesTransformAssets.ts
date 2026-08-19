/**
 * Twenty-seventh batch — circles, and moving things about the plane.
 *
 * The circle half is dominated by ONE error, and both formula registers
 * name it as their foundational entry: substituting the DIAMETER where
 * the formula wants a radius. It costs a factor of 2 in circumference
 * and a factor of 4 in area, and it happens because the diameter is
 * usually the measurement given while every formula is written in r.
 *
 * The transformation half turns on what each move PRESERVES, and the
 * one that surprises: composition does not commute. Rotate-then-
 * translate and translate-then-rotate land in different places.
 *
 *   CIRCLES     circle-circumference, circle-area, circle-equation,
 *               circle-theorems
 *   MOVING      x-y-coordinates, transformations, translation
 *   CLASSICAL   geometric-constructions
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const CIRC = 'math.geom.circle-circumference'
const CAREA = 'math.geom.circle-area'
const CEQN = 'math.geom.circle-equation'
const CTHM = 'math.geom.circle-theorems'
const XY = 'math.geom.x-y-coordinates'
const TRANS = 'math.geom.transformations'
const TRANSL = 'math.geom.translation'
const CONSTR = 'math.geom.geometric-constructions'

export const MATHEMATICS_CIRCLES_TRANSFORM_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CIRC, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'Circumference is the distance once round a circle: C = 2πr, or equivalently C = πd. '
      + 'The two are the same formula, since d = 2r — and having both is what causes the '
      + 'trouble.\n\n'
      + 'Check which one you were GIVEN. With diameter 14, C = π × 14 ≈ 44 cm. Putting 14 '
      + 'into 2πr instead gives ≈ 88 — exactly double, because the diameter was treated as a '
      + 'radius. Halving first, or switching to πd, both fix it; picking a formula before '
      + 'reading the measurement does not.\n\n'
      + 'π is not 22/7 and not 3. Those are approximations used for mental arithmetic, and π '
      + 'is irrational — its decimal never ends and never repeats. When a question says '
      + '"exact", the answer is 14π and converting it to 43.98 makes it less correct rather '
      + 'than more finished. Note also that circumference is measured in LENGTH units while '
      + 'area is in square units, which is the fastest way to catch having grabbed the wrong '
      + 'formula.',
    targetedMisconceptions: [`${CIRC}:MC-1`, `${CIRC}:MC-2`],
    source: eb(CIRC, 'Identity + Misconception register — check what you were given; π is not 22/7'),
  },
  {
    conceptId: CAREA, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'A circle\'s area is A = πr². The r is a RADIUS, and there is no diameter version — '
      + 'which makes this the formula the diameter error hits hardest.\n\n'
      + 'With diameter 14 the area is π × 7² ≈ 154 cm². Substituting 14 gives π × 196 ≈ 616, '
      + 'four times too large, because the mistake is inside a square. The same slip costs a '
      + 'factor of 2 in circumference and a factor of 4 here, so halving first is a habit '
      + 'worth having rather than a step to remember.\n\n'
      + 'Squaring is also why area does not scale with radius. Double the radius and the area '
      + 'QUADRUPLES — a pizza of twice the diameter is worth four times as much, not twice. '
      + 'And the two circle formulas are told apart by their units: πr² is square units and '
      + '2πr is length, so an answer in cm where cm² was wanted means you took the wrong one.',
    targetedMisconceptions: [`${CAREA}:MC-1`, `${CAREA}:MC-4`],
    source: eb(CAREA, 'Identity + Misconception register — no diameter version; the error is inside a square'),
  },
  {
    conceptId: CEQN, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A circle of centre (h, k) and radius r is (x − h)² + (y − k)² = r². It is the distance '
      + 'formula rearranged: every point exactly r from the centre, with both sides squared '
      + 'to remove the root.\n\n'
      + 'The right-hand side is r SQUARED. For radius 5 the equation ends in 25, and reading '
      + '25 back as the radius gives 25 instead of 5 — the number on the page is always the '
      + 'square, and taking its root is part of reading the equation.\n\n'
      + 'Expanded forms need completing the square, and not every one is a circle. '
      + 'x² + y² − 4x + 6y + 20 = 0 completes to (x−2)² + (y+3)² = −7, and no real point has '
      + 'negative squared distance — so the equation describes nothing. A negative or zero '
      + 'right-hand side is the check to make before assuming a circle exists. Testing '
      + 'whether a point is inside needs no solving either: substitute it and compare with '
      + 'r² — smaller is inside, equal is on, larger is outside.',
    targetedMisconceptions: [`${CEQN}:MC-1`, `${CEQN}:MC-2`],
    source: eb(CEQN, 'Identity + Misconception register — the constant is r²; not every expanded form is a circle'),
  },
  {
    conceptId: CTHM, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'The circle theorems all follow from where the ANGLE\'S VERTEX sits. At the CENTRE, the '
      + 'angle equals its arc. ON the circle — inscribed — it is HALF the arc. That single '
      + 'distinction generates most of the results.\n\n'
      + 'So halving applies to inscribed angles only. A central angle of 60° cuts a 60° arc, '
      + 'not 30°; the halving rule belongs to the vertex on the circumference, and applying '
      + 'it at the centre is the commonest error here. Two inscribed angles on the same arc '
      + 'are equal for the same reason — both are half of it.\n\n'
      + 'The semicircle case is the famous one: an angle inscribed in a SEMICIRCLE is 90°, '
      + 'because the arc is 180° and half of that is 90°. It requires the diameter as the '
      + 'chord — an inscribed angle on any smaller arc is not a right angle, and the rule '
      + 'gets over-applied to chords that merely look long. One more tool is easy to miss: '
      + 'two radii to the ends of a chord always make an ISOSCELES triangle, since both are '
      + 'the radius, and that fact solves a great many problems that look under-specified.',
    targetedMisconceptions: [`${CTHM}:MC-1`, `${CTHM}:MC-2`],
    source: eb(CTHM, 'Identity + Misconception register — halving is for inscribed angles; two radii are isosceles'),
  },
  {
    conceptId: XY, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.ELEMENTARY,
    content:
      'A point is written (x, y) — ALWAYS across first, then up. (3, 5) means three right and '
      + 'five up; (5, 3) is a different point, and the order is fixed by convention rather '
      + 'than by which number is larger.\n\n'
      + 'Both start from the ORIGIN, (0, 0), where the axes cross. Counting from the edge of '
      + 'the paper or from wherever the drawing begins puts every point wrong by the same '
      + 'amount, which is hard to spot because the shape still looks right.\n\n'
      + 'Signs say which direction. Negative x is left, negative y is down — so (−3, 5) is '
      + 'three LEFT and five up, and dropping the minus lands you in the wrong quadrant '
      + 'entirely rather than slightly off. The mnemonic worth keeping is that you walk along '
      + 'the hall before you go up the stairs.',
    targetedMisconceptions: [`${XY}:MC-1`, `${XY}:MC-3`],
    source: eb(XY, 'Identity + Misconception register — across then up, from the origin, with signs'),
  },
  {
    conceptId: TRANS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A transformation moves every point by a rule. Translations, rotations and reflections '
      + 'are ISOMETRIES — they preserve distances, so the image is congruent to the original. '
      + 'Dilations are not: they change size, and produce a SIMILAR figure instead.\n\n'
      + 'So "transformation" does not imply congruence, and grouping all four together as '
      + '"moves that keep the shape the same" quietly loses the one that does not. What all '
      + 'four preserve is angles; only the first three preserve length.\n\n'
      + 'Composing them does NOT commute. Rotate 90° about the origin then translate by '
      + '(3, 0), and you land somewhere different from translating first and then rotating — '
      + 'because the rotation acts on wherever the point currently is. Order is part of the '
      + 'instruction. And a rotation needs its CENTRE stated: about the origin is only the '
      + 'default of convenience, and about any other point you must translate, rotate, and '
      + 'translate back.',
    targetedMisconceptions: [`${TRANS}:MC-1`, `${TRANS}:MC-2`],
    source: eb(TRANS, 'Identity + Misconception register — dilation is not an isometry; composition does not commute'),
  },
  {
    conceptId: TRANSL, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'A translation slides every point by the same amount: (x, y) → (x + a, y + b). Nothing '
      + 'turns and nothing changes size — the figure keeps its orientation exactly, which is '
      + 'what separates it from a rotation.\n\n'
      + 'The SAME shift applies to every vertex. Moving one corner by (3, −2) and another by '
      + '(3, −1) does not translate the shape, it distorts it; the reliable check is that '
      + 'every vertex moved identically, and that the image is the same shape and the same '
      + 'way up.\n\n'
      + 'Signs give the direction, and they are added rather than obeyed as instructions. '
      + '(x − 4, y + 1) moves LEFT four and UP one — the minus is part of the arithmetic, and '
      + '"minus means down" is the confusion to avoid, since a minus on the x affects '
      + 'left-right and a minus on the y affects up-down. Translating by (0, 0) leaves '
      + 'everything where it was, which is the identity and a legitimate translation.',
    targetedMisconceptions: [`${TRANSL}:MC-1`, `${TRANSL}:MC-2`],
    source: eb(TRANSL, 'Identity + Misconception register — the same shift for every vertex; signs give direction'),
  },
  {
    conceptId: CONSTR, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A classical construction uses a COMPASS and an UNMARKED straightedge, and nothing '
      + 'else. The straightedge draws lines and does not measure — that restriction is the '
      + 'whole game, and it is what makes the results exact rather than as accurate as your '
      + 'ruler.\n\n'
      + 'So measuring 5 cm and marking 2.5 is not a construction of the midpoint, however '
      + 'correct the answer. The construction draws two equal arcs from each endpoint and '
      + 'joins where they cross — and that works BECAUSE the crossing points are equidistant '
      + 'from both ends, which is the definition of the perpendicular bisector. The '
      + 'justification is the point, not the picture, which is also why the construction arcs '
      + 'are left on the page rather than rubbed out: they are the working.\n\n'
      + 'Some things are provably IMPOSSIBLE with these tools — trisecting an arbitrary '
      + 'angle, doubling the cube, squaring the circle. Those are proved results from '
      + 'nineteenth-century algebra, not challenges awaiting a cleverer diagram, and the '
      + 'proofs are about which lengths compass and straightedge can construct at all.',
    targetedMisconceptions: [`${CONSTR}:MC-1`, `${CONSTR}:MC-4`],
    source: eb(CONSTR, 'Identity + Misconception register — unmarked straightedge; impossibility is proved'),
  },
]

export const MATHEMATICS_CIRCLES_TRANSFORM_PROBES: SeedProbe[] = [
  // --- math.geom.circle-circumference -------------------------------------------------
  {
    conceptId: CIRC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'A circle has DIAMETER 14 cm. What is its circumference?',
    choices: [
      { text: 'About 44 cm — π × 14, or 2π × 7', isCorrect: true },
      { text: 'About 88 cm — 2π × 14', isCorrect: false, misconceptionId: `${CIRC}:MC-1` },
      { text: 'About 154 cm² — π × 7²', isCorrect: false, misconceptionId: `${CIRC}:MC-3` },
    ],
    targetedMisconceptions: [`${CIRC}:MC-1`, `${CIRC}:MC-3`],
    source: eb(CIRC, 'Assessment gate — check whether you were given r or d'),
  },
  {
    conceptId: CIRC, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is π equal to 22/7?',
    choices: [
      { text: 'No — that is an approximation; π is irrational, so its decimal never ends or repeats', isCorrect: true },
      { text: 'Yes — 22/7 is its exact value', isCorrect: false, misconceptionId: `${CIRC}:MC-2` },
      { text: 'Yes, and 3 is an equally exact alternative', isCorrect: false, misconceptionId: `${CIRC}:MC-2` },
    ],
    targetedMisconceptions: [`${CIRC}:MC-2`],
    source: eb(CIRC, 'Misconception register — 22/7 and 3 are approximations'),
  },
  {
    conceptId: CIRC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A question asks for the EXACT circumference of a circle with diameter 14. What do you write?',
    choices: [
      { text: '14π — converting to 43.98 makes it less exact, not more finished', isCorrect: true },
      { text: '43.98 cm', isCorrect: false, misconceptionId: `${CIRC}:MC-4` },
      { text: '44 cm', isCorrect: false, misconceptionId: `${CIRC}:MC-4` },
    ],
    targetedMisconceptions: [`${CIRC}:MC-4`],
    source: eb(CIRC, 'Transfer probe — exact means leave π in'),
  },

  // --- math.geom.circle-area -----------------------------------------------------------
  {
    conceptId: CAREA, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'A circle has DIAMETER 14 cm. What is its area?',
    choices: [
      { text: 'About 154 cm² — π × 7²', isCorrect: true },
      { text: 'About 616 cm² — π × 14²', isCorrect: false, misconceptionId: `${CAREA}:MC-1` },
      { text: 'About 44 cm — 2π × 7', isCorrect: false, misconceptionId: `${CAREA}:MC-2` },
    ],
    targetedMisconceptions: [`${CAREA}:MC-1`, `${CAREA}:MC-2`],
    source: eb(CAREA, 'Assessment gate — halve the diameter first'),
  },
  {
    conceptId: CAREA, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Why does the diameter slip cost a factor of 4 in area but only 2 in circumference?',
    choices: [
      { text: 'Because in πr² the mistake sits inside a SQUARE — doubling r quadruples r²', isCorrect: true },
      { text: 'It costs 2 in both; the area case is a different error', isCorrect: false, misconceptionId: `${CAREA}:MC-3` },
      { text: 'Because area formulas are less forgiving of approximation', isCorrect: false, misconceptionId: `${CAREA}:MC-3` },
    ],
    targetedMisconceptions: [`${CAREA}:MC-3`],
    source: eb(CAREA, 'Misconception register — the error is inside a square'),
  },
  {
    conceptId: CAREA, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Double a circle\'s radius. What happens to its area?',
    choices: [
      { text: 'It QUADRUPLES — which is why a pizza of twice the diameter is worth four times as much', isCorrect: true },
      { text: 'It doubles, like the radius', isCorrect: false, misconceptionId: `${CAREA}:MC-4` },
      { text: 'It goes up eight times', isCorrect: false, misconceptionId: `${CAREA}:MC-4` },
    ],
    targetedMisconceptions: [`${CAREA}:MC-4`],
    source: eb(CAREA, 'Transfer probe — area does not scale linearly with radius'),
  },

  // --- math.geom.circle-equation --------------------------------------------------------
  {
    conceptId: CEQN, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: '(x − 2)² + (y + 3)² = 25. What is the radius?',
    choices: [
      { text: '5 — the constant is r SQUARED, so take its root', isCorrect: true },
      { text: '25 — read it straight off', isCorrect: false, misconceptionId: `${CEQN}:MC-1` },
      { text: '12.5 — halve it', isCorrect: false, misconceptionId: `${CEQN}:MC-1` },
    ],
    targetedMisconceptions: [`${CEQN}:MC-1`],
    source: eb(CEQN, 'Assessment gate — the constant is r²'),
  },
  {
    conceptId: CEQN, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'x² + y² − 4x + 6y + 20 = 0 completes to (x−2)² + (y+3)² = −7. What does it describe?',
    choices: [
      { text: 'Nothing — no real point has negative squared distance, so this is not a circle', isCorrect: true },
      { text: 'A circle of radius −7', isCorrect: false, misconceptionId: `${CEQN}:MC-2` },
      { text: 'A circle of radius √7', isCorrect: false, misconceptionId: `${CEQN}:MC-2` },
    ],
    targetedMisconceptions: [`${CEQN}:MC-2`],
    source: eb(CEQN, 'Misconception register — not every expanded form is a circle'),
  },
  {
    conceptId: CEQN, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'How do you tell whether a point lies inside a circle?',
    choices: [
      { text: 'Substitute it and compare with r² — smaller is inside, equal is on, larger is outside', isCorrect: true },
      { text: 'Solve the equation for that point', isCorrect: false, misconceptionId: `${CEQN}:MC-3` },
      { text: 'You must plot it and look', isCorrect: false, misconceptionId: `${CEQN}:MC-3` },
    ],
    targetedMisconceptions: [`${CEQN}:MC-3`],
    source: eb(CEQN, 'Transfer probe — the position check needs no solving'),
  },

  // --- math.geom.circle-theorems ---------------------------------------------------------
  {
    conceptId: CTHM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'A CENTRAL angle measures 60°. What arc does it cut?',
    choices: [
      { text: '60° — a central angle equals its arc', isCorrect: true },
      { text: '30° — halve it', isCorrect: false, misconceptionId: `${CTHM}:MC-1` },
      { text: '120° — double it', isCorrect: false, misconceptionId: `${CTHM}:MC-1` },
    ],
    targetedMisconceptions: [`${CTHM}:MC-1`],
    source: eb(CTHM, 'Assessment gate — halving is for inscribed angles only'),
  },
  {
    conceptId: CTHM, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'An angle inscribed in a semicircle is 90°. Does that hold for any long chord?',
    choices: [
      { text: 'No — it needs the DIAMETER; the arc must be 180° for its half to be 90°', isCorrect: true },
      { text: 'Yes — any chord that looks long enough gives a right angle', isCorrect: false, misconceptionId: `${CTHM}:MC-2` },
      { text: 'Yes — every inscribed angle is 90°', isCorrect: false, misconceptionId: `${CTHM}:MC-2` },
    ],
    targetedMisconceptions: [`${CTHM}:MC-2`],
    source: eb(CTHM, 'Misconception register — the semicircle rule needs the diameter'),
  },
  {
    conceptId: CTHM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Two radii are drawn to the ends of a chord. What have you got?',
    choices: [
      { text: 'An ISOSCELES triangle — both sides are the radius, which solves many under-specified problems', isCorrect: true },
      { text: 'A scalene triangle, in general', isCorrect: false, misconceptionId: `${CTHM}:MC-3` },
      { text: 'Nothing useful without more measurements', isCorrect: false, misconceptionId: `${CTHM}:MC-3` },
    ],
    targetedMisconceptions: [`${CTHM}:MC-3`],
    source: eb(CTHM, 'Transfer probe — two radii are always isosceles'),
  },

  // --- math.geom.x-y-coordinates ------------------------------------------------------------
  {
    conceptId: XY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.ELEMENTARY,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What does (3, 5) mean?',
    choices: [
      { text: 'Three across, five up — x first, always', isCorrect: true },
      { text: 'Three up, five across', isCorrect: false, misconceptionId: `${XY}:MC-1` },
      { text: 'The larger number is the across one, so five across', isCorrect: false, misconceptionId: `${XY}:MC-1` },
    ],
    targetedMisconceptions: [`${XY}:MC-1`],
    source: eb(XY, 'Assessment gate — across then up'),
  },
  {
    conceptId: XY, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.ELEMENTARY,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Where is (−3, 5)?',
    choices: [
      { text: 'Three LEFT and five up — the minus gives direction', isCorrect: true },
      { text: 'Three right and five up; the minus can be ignored', isCorrect: false, misconceptionId: `${XY}:MC-2` },
      { text: 'Three left and five down', isCorrect: false, misconceptionId: `${XY}:MC-2` },
    ],
    targetedMisconceptions: [`${XY}:MC-2`],
    source: eb(XY, 'Misconception register — signs are directions'),
  },
  {
    conceptId: XY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.ELEMENTARY,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Where do you start counting from?',
    choices: [
      { text: 'The origin (0, 0), where the axes cross', isCorrect: true },
      { text: 'The bottom left corner of the paper', isCorrect: false, misconceptionId: `${XY}:MC-3` },
      { text: 'Wherever the drawing begins', isCorrect: false, misconceptionId: `${XY}:MC-3` },
    ],
    targetedMisconceptions: [`${XY}:MC-3`],
    source: eb(XY, 'Transfer probe — everything is measured from the origin'),
  },

  // --- math.geom.transformations --------------------------------------------------------------
  {
    conceptId: TRANS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Which of these does NOT produce a congruent image?',
    choices: [
      { text: 'Dilation — it changes size, giving a SIMILAR figure', isCorrect: true },
      { text: 'Rotation', isCorrect: false, misconceptionId: `${TRANS}:MC-1` },
      { text: 'Reflection', isCorrect: false, misconceptionId: `${TRANS}:MC-1` },
    ],
    targetedMisconceptions: [`${TRANS}:MC-1`],
    source: eb(TRANS, 'Assessment gate — dilation is not an isometry'),
  },
  {
    conceptId: TRANS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Rotate 90° about the origin then translate by (3, 0). Same result as doing it the other way round?',
    choices: [
      { text: 'No — composition does not commute; the rotation acts on wherever the point currently is', isCorrect: true },
      { text: 'Yes — the same two moves give the same place', isCorrect: false, misconceptionId: `${TRANS}:MC-2` },
      { text: 'Yes, provided both are isometries', isCorrect: false, misconceptionId: `${TRANS}:MC-2` },
    ],
    targetedMisconceptions: [`${TRANS}:MC-2`],
    source: eb(TRANS, 'Misconception register — order is part of the instruction'),
  },
  {
    conceptId: TRANS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A question says "rotate 90°" and names no centre. What is missing?',
    choices: [
      { text: 'The centre — the origin is only a default of convenience, and any other point changes the image', isCorrect: true },
      { text: 'Nothing — rotations are always about the origin', isCorrect: false, misconceptionId: `${TRANS}:MC-3` },
      { text: 'The direction only', isCorrect: false, misconceptionId: `${TRANS}:MC-3` },
    ],
    targetedMisconceptions: [`${TRANS}:MC-3`],
    source: eb(TRANS, 'Transfer probe — the centre must be stated'),
  },

  // --- math.geom.translation -------------------------------------------------------------------
  {
    conceptId: TRANSL, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Translating by (x + 3, y − 2), where does (1, 5) go?',
    choices: [
      { text: '(4, 3)', isCorrect: true },
      { text: '(4, 7)', isCorrect: false, misconceptionId: `${TRANSL}:MC-2` },
      { text: '(3, −2)', isCorrect: false },
    ],
    targetedMisconceptions: [`${TRANSL}:MC-2`],
    source: eb(TRANSL, 'Assessment gate — add the shift to each coordinate'),
  },
  {
    conceptId: TRANSL, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'You moved one vertex by (3, −2) and another by (3, −1). Is that a translation?',
    choices: [
      { text: 'No — it distorts the shape; every vertex must move by the SAME amount', isCorrect: true },
      { text: 'Yes — both moved three across', isCorrect: false, misconceptionId: `${TRANSL}:MC-1` },
      { text: 'Yes — small differences are acceptable', isCorrect: false, misconceptionId: `${TRANSL}:MC-1` },
    ],
    targetedMisconceptions: [`${TRANSL}:MC-1`],
    source: eb(TRANSL, 'Misconception register — an inconsistent shift is not a translation'),
  },
  {
    conceptId: TRANSL, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'How can you tell a translation from a rotation by looking at the image?',
    choices: [
      { text: 'A translation keeps the figure the same way up — orientation is completely unchanged', isCorrect: true },
      { text: 'You cannot tell them apart from the image', isCorrect: false, misconceptionId: `${TRANSL}:MC-3` },
      { text: 'A translation also turns the figure slightly', isCorrect: false, misconceptionId: `${TRANSL}:MC-3` },
    ],
    targetedMisconceptions: [`${TRANSL}:MC-3`],
    source: eb(TRANSL, 'Transfer probe — nothing turns in a translation'),
  },

  // --- math.geom.geometric-constructions ----------------------------------------------------------
  {
    conceptId: CONSTR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What tools does a classical construction allow?',
    choices: [
      { text: 'A compass and an UNMARKED straightedge — the straightedge draws, it does not measure', isCorrect: true },
      { text: 'A compass and a ruler with markings', isCorrect: false, misconceptionId: `${CONSTR}:MC-1` },
      { text: 'Any drawing instrument, used carefully', isCorrect: false, misconceptionId: `${CONSTR}:MC-1` },
    ],
    targetedMisconceptions: [`${CONSTR}:MC-1`],
    source: eb(CONSTR, 'Assessment gate — the straightedge is unmarked'),
  },
  {
    conceptId: CONSTR, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'You measured 5 cm and marked the midpoint at 2.5 cm. Is that a construction?',
    choices: [
      { text: 'No — measuring is exactly what the restriction forbids, however correct the answer', isCorrect: true },
      { text: 'Yes — the midpoint is in the right place', isCorrect: false, misconceptionId: `${CONSTR}:MC-1` },
      { text: 'Yes, provided the ruler is accurate', isCorrect: false, misconceptionId: `${CONSTR}:MC-1` },
    ],
    targetedMisconceptions: [`${CONSTR}:MC-1`],
    source: eb(CONSTR, 'Misconception register — measurement is not construction'),
  },
  {
    conceptId: CONSTR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Can an arbitrary angle be trisected with compass and straightedge?',
    choices: [
      { text: 'No — proved impossible in the nineteenth century, by algebra about which lengths are constructible', isCorrect: true },
      { text: 'Not yet, but a clever enough diagram might do it', isCorrect: false, misconceptionId: `${CONSTR}:MC-4` },
      { text: 'Yes — it just takes many steps', isCorrect: false, misconceptionId: `${CONSTR}:MC-4` },
    ],
    targetedMisconceptions: [`${CONSTR}:MC-4`],
    source: eb(CONSTR, 'Transfer probe — impossibility is proved, not unattempted'),
  },
]
