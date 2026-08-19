/**
 * Nineteenth batch — measuring: angles, boundary, inside, and the first
 * criterion for two figures being the same.
 *
 * The single misconception this batch exists to fight appears in FOUR
 * registers independently: area and perimeter conflated, and the belief
 * that one determines the other. It does not. Two shapes can share a
 * perimeter and differ wildly in area, which is why a rectangle and a
 * circle of the same boundary length are not interchangeable.
 *
 *   ANGLES    angle-pairs. Four named relationships, three of which get
 *             swapped for each other.
 *   BOUNDARY  length, perimeter. What a measurement without a unit is
 *             (nothing), and why a circle's perimeter has its own name.
 *   INSIDE    area, area-triangle, area-polygon. Every polygon formula
 *             in school comes from the rectangle by cutting and moving,
 *             and each register records learners treating them as
 *             independent facts to memorise.
 *   SAME      congruent-triangles. Which letter-triples are criteria and
 *             which two are impostors.
 *
 * NOTE on misconception ids: math.geom.perimeter and math.geom.length are
 * the only two entries in this batch whose Educational Brain registers list
 * their misconceptions WITHOUT MC-n numbers. The `:MC-1` / `:MC-2` ids used
 * here refer to those entries in the order the register lists them, matching
 * the convention every other concept in this corpus already uses. If those
 * two registers are later numbered, the ids should be re-checked against
 * them rather than assumed to line up.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const ANGP = 'math.geom.angle-pairs'
const LEN = 'math.geom.length'
const PERI = 'math.geom.perimeter'
const AREA = 'math.geom.area'
const ATRI = 'math.geom.area-triangle'
const APOLY = 'math.geom.area-polygon'
const CPARTS = 'math.geom.circle-parts'
const CONGR = 'math.geom.congruent-triangles'

export const MATHEMATICS_MEASUREMENT_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: ANGP, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'Four relationships between angles are worth naming. COMPLEMENTARY: they sum to 90°. '
      + 'SUPPLEMENTARY: they sum to 180°. VERTICAL: the opposite pair where two lines cross, '
      + 'always equal. LINEAR PAIR: two adjacent angles on a straight line.\n\n'
      + 'Supplementary and linear pair are close but not the same, and the difference is '
      + 'position. A linear pair is always supplementary, because a straight line is 180°. '
      + 'But two angles in different rooms of a diagram can sum to 180° without touching — '
      + 'supplementary is about the NUMBERS and linear pair is about the ARRANGEMENT, so the '
      + 'implication runs one way only.\n\n'
      + 'Vertical angles are the opposite pair, not the neighbouring one. Where two lines '
      + 'cross, the two angles facing each other are equal; the two side by side are the '
      + 'linear pair and sum to 180°. Picking the adjacent pair and calling it vertical gives '
      + 'exactly the wrong relationship. (The mnemonic for the sums: Complementary is Corner, '
      + '90°; Supplementary is Straight, 180°.)',
    targetedMisconceptions: [`${ANGP}:MC-1`, `${ANGP}:MC-2`],
    source: eb(ANGP, 'Identity + Misconception register — supplementary is not linear pair; vertical is the opposite pair'),
  },
  {
    conceptId: LEN, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.ELEMENTARY,
    content:
      'Length is how far it is from one end to the other, measured by counting how many of '
      + 'some agreed unit fit along it. The unit is not optional decoration — "the table is '
      + '3" says nothing until you know 3 what, and the same table is 3 feet or 91 '
      + 'centimetres or 0.91 metres.\n\n'
      + 'Two lengths can only be compared once they are in the same unit. 50 centimetres '
      + 'against 2 feet cannot be judged as written, and 50 beats 2 as a number while 2 feet '
      + 'is the longer distance. Converting first is the whole of the technique.\n\n'
      + 'Lengths add along a path, and only along a path. Walk 3 m east then 4 m north and '
      + 'you have travelled 7 m, but you are 5 m from where you started — those are two '
      + 'different questions and both are legitimate. Distance travelled adds; distance '
      + 'between two points does not, which is exactly the gap the Pythagorean theorem '
      + 'exists to close.',
    targetedMisconceptions: [`${LEN}:MC-1`, `${LEN}:MC-2`],
    source: eb(LEN, 'Identity + Misconception register — the unit is part of the measurement; path length is not displacement'),
  },
  {
    conceptId: PERI, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.ELEMENTARY,
    content:
      'Perimeter is the distance all the way round the edge — the length of the fence, not '
      + 'the size of the field. For a 3 by 5 rectangle it is 3 + 5 + 3 + 5 = 16.\n\n'
      + 'That is a different question from area, and neither determines the other. A 1 by 8 '
      + 'rectangle and a 3 by 6 rectangle BOTH have perimeter 18 — and their areas are 8 and '
      + '18. Same fence, more than twice the field. So "bigger perimeter means bigger area" '
      + 'is not a rule with exceptions; it is simply not a rule.\n\n'
      + 'Circles have a perimeter too; it is called the CIRCUMFERENCE, and the different name '
      + 'is the only thing that is different. It is still the distance once round the edge, '
      + 'and it is 2πr rather than a sum of straight sides because there are no corners to '
      + 'add up — measuring round a curve is what π is for.',
    targetedMisconceptions: [`${PERI}:MC-1`, `${PERI}:MC-2`],
    source: eb(PERI, 'Identity + Misconception register — the fence not the field; circumference is a perimeter'),
  },
  {
    conceptId: AREA, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'Area counts how many unit squares fit inside a shape, which is why it is measured in '
      + 'SQUARE units. A 3 by 5 rectangle holds 15 squares — that is where length × width '
      + 'comes from, not a formula to be taken on trust.\n\n'
      + 'Because area counts squares, it does not scale like length. Double every side of a '
      + 'shape and the area goes up FOUR times, because each unit square becomes a 2 by 2 '
      + 'block of four. Triple the sides and area goes up nine times. This surprises people '
      + 'reliably, and it is the reason a pizza of twice the diameter is worth four times as '
      + 'much rather than twice.\n\n'
      + 'And area is not perimeter. One counts the inside, the other measures the edge, and '
      + 'they are reported in different units — square metres against metres — which is the '
      + 'quickest check that you have answered the question that was asked.',
    targetedMisconceptions: [`${AREA}:MC-1`, `${AREA}:MC-2`],
    source: eb(AREA, 'Identity + Misconception register — counting squares; area scales as the square'),
  },
  {
    conceptId: ATRI, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'A triangle is half a parallelogram: two copies of any triangle fit together to make '
      + 'one, so its area is ½ × base × height. The ½ is not decoration, it is the second '
      + 'copy you did not use.\n\n'
      + 'The HEIGHT is the perpendicular distance from the base to the opposite vertex — '
      + 'straight up, at a right angle. On a slanted triangle that is not the length of any '
      + 'side, and using a slant side instead gives an answer that is too big every time. For '
      + 'an obtuse triangle the height may fall outside the triangle altogether, which is '
      + 'legitimate: it is a distance, not a part of the shape.\n\n'
      + 'When the height is genuinely unknown, Heron\'s formula computes the area from the '
      + 'three side lengths alone: √(s(s−a)(s−b)(s−c)), with s the semiperimeter. It needs no '
      + 'height at all — that is the point of it. And where both methods apply they agree '
      + 'exactly, because they are two routes to one quantity; a disagreement means an '
      + 'arithmetic slip, never a choice between formulas.',
    targetedMisconceptions: [`${ATRI}:MC-1`, `${ATRI}:MC-2`],
    source: eb(ATRI, 'Identity + Misconception register — height is perpendicular; Heron needs no height'),
  },
  {
    conceptId: APOLY, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'Every polygon area formula in school comes from the rectangle by cutting and moving. A '
      + 'parallelogram: slice the triangle off one end and slide it to the other, and you '
      + 'have a rectangle — so its area is base × height, with NO half. A trapezoid: two '
      + 'copies rotated together make a parallelogram of base (b₁ + b₂), so one of them is '
      + '½(b₁ + b₂)h.\n\n'
      + 'These are therefore not independent facts to memorise. Each is one cut away from the '
      + 'rectangle, and a learner who has seen the cut can rebuild a forgotten formula while '
      + 'a learner who memorised the list cannot. The parallelogram is where the memorised '
      + 'list breaks first, because ½bh is the triangle\'s formula and gets borrowed by '
      + 'mistake.\n\n'
      + 'Any polygon at all can be cut into triangles and the areas added — irregular ones '
      + 'included, which is exactly when you need it, since no formula exists for a shape '
      + 'with no name. For a REGULAR polygon that decomposition gives ½ap, where a is the '
      + 'apothem and p the perimeter: n identical triangles, each ½ × side × apothem.',
    targetedMisconceptions: [`${APOLY}:MC-1`, `${APOLY}:MC-2`],
    source: eb(APOLY, 'Identity + Misconception register — each formula is one cut from the rectangle'),
  },
  {
    conceptId: CPARTS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'A circle\'s parts are named by what they touch. RADIUS: centre to edge. DIAMETER: edge '
      + 'to edge through the centre, so twice the radius. CHORD: edge to edge by any route, '
      + 'not necessarily through the centre. ARC: a piece of the edge itself.\n\n'
      + 'The diameter is the longest chord, but not every chord is a diameter — most are not. '
      + 'That distinction matters because the formulas take the RADIUS: area is πr² and '
      + 'circumference 2πr, so feeding a diameter into either quadruples or doubles the '
      + 'answer. Halving first is the step to make automatic.\n\n'
      + 'Two regions get swapped constantly. A SECTOR is the pie slice, bounded by two radii '
      + 'and an arc. A SEGMENT is what a single chord cuts off, bounded by the chord and the '
      + 'arc. The sector reaches the centre and the segment does not — that is the whole '
      + 'test, and it is why a sector\'s area is a fraction of πr² while a segment\'s takes a '
      + 'subtraction.',
    targetedMisconceptions: [`${CPARTS}:MC-1`, `${CPARTS}:MC-2`],
    source: eb(CPARTS, 'Identity + Misconception register — sector reaches the centre; formulas take the radius'),
  },
  {
    conceptId: CONGR, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'Two triangles are congruent when they have the same shape AND the same size — one '
      + 'would sit exactly on the other if you moved it. Similar is the weaker relation: same '
      + 'shape, any size. Every congruent pair is similar, and the reverse fails constantly.\n\n'
      + 'You do not need all six measurements. SSS, SAS, ASA, AAS and (for right triangles) '
      + 'HL each pin the triangle down completely, because once those three are fixed nothing '
      + 'about the rest can vary.\n\n'
      + 'Two letter-triples that look like they belong are impostors. AAA fixes the shape and '
      + 'says nothing about size — it gives SIMILARITY, and a triangle with the same three '
      + 'angles can be a millimetre or a mile across. SSA fails differently and more subtly: '
      + 'two sides and a NON-included angle can often be assembled into two genuinely '
      + 'different triangles, which is why it is sometimes called the ambiguous case. The '
      + 'included-ness in SAS is doing real work, and that is why the order of the letters '
      + 'is part of the criterion rather than a way of writing it.',
    targetedMisconceptions: [`${CONGR}:MC-1`, `${CONGR}:MC-2`],
    source: eb(CONGR, 'Identity + Misconception register — AAA is similarity; SSA is ambiguous'),
  },
]

export const MATHEMATICS_MEASUREMENT_PROBES: SeedProbe[] = [
  // --- math.geom.angle-pairs ------------------------------------------------------
  {
    conceptId: ANGP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Two angles sum to 90°. What are they called?',
    choices: [
      { text: 'Complementary — Corner, 90°', isCorrect: true },
      { text: 'Supplementary', isCorrect: false, misconceptionId: `${ANGP}:MC-3` },
      { text: 'Vertical', isCorrect: false, misconceptionId: `${ANGP}:MC-2` },
    ],
    targetedMisconceptions: [`${ANGP}:MC-3`],
    source: eb(ANGP, 'Assessment gate — complementary is 90°'),
  },
  {
    conceptId: ANGP, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Two angles in separate parts of a diagram sum to 180°. Are they a linear pair?',
    choices: [
      { text: 'No — they are supplementary, but a linear pair must be adjacent on a straight line', isCorrect: true },
      { text: 'Yes — summing to 180° is what linear pair means', isCorrect: false, misconceptionId: `${ANGP}:MC-1` },
      { text: 'Yes, provided both are acute', isCorrect: false, misconceptionId: `${ANGP}:MC-1` },
    ],
    targetedMisconceptions: [`${ANGP}:MC-1`],
    source: eb(ANGP, 'Misconception register — supplementary is numbers, linear pair is arrangement'),
  },
  {
    conceptId: ANGP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Two lines cross. Which pair of angles is equal?',
    choices: [
      { text: 'The opposite pair — vertical angles', isCorrect: true },
      { text: 'The adjacent pair, side by side', isCorrect: false, misconceptionId: `${ANGP}:MC-2` },
      { text: 'All four are equal', isCorrect: false, misconceptionId: `${ANGP}:MC-2` },
    ],
    targetedMisconceptions: [`${ANGP}:MC-2`],
    source: eb(ANGP, 'Transfer probe — vertical is the opposite pair'),
  },

  // --- math.geom.length -------------------------------------------------------------
  {
    conceptId: LEN, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.ELEMENTARY,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Someone says "the table is 3". What is missing?',
    choices: [
      { text: 'The unit — 3 feet and 3 metres are very different tables', isCorrect: true },
      { text: 'Nothing — 3 is the measurement', isCorrect: false, misconceptionId: `${LEN}:MC-1` },
      { text: 'Which end you measured from', isCorrect: false },
    ],
    targetedMisconceptions: [`${LEN}:MC-1`],
    source: eb(LEN, 'Assessment gate — a length needs a unit'),
  },
  {
    conceptId: LEN, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.ELEMENTARY,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Which is longer, 50 centimetres or 2 feet?',
    choices: [
      { text: '2 feet — convert to the same unit first; 2 feet is about 61 cm', isCorrect: true },
      { text: '50 centimetres — 50 is the bigger number', isCorrect: false, misconceptionId: `${LEN}:MC-3` },
      { text: 'They cannot be compared', isCorrect: false, misconceptionId: `${LEN}:MC-3` },
    ],
    targetedMisconceptions: [`${LEN}:MC-3`],
    source: eb(LEN, 'Misconception register — convert before comparing'),
  },
  {
    conceptId: LEN, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.ELEMENTARY,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'You walk 3 m east then 4 m north. How far have you travelled, and how far are you from the start?',
    choices: [
      { text: 'Travelled 7 m; 5 m from the start — two different questions', isCorrect: true },
      { text: 'Both 7 m — lengths always add', isCorrect: false, misconceptionId: `${LEN}:MC-2` },
      { text: 'Both 5 m', isCorrect: false, misconceptionId: `${LEN}:MC-2` },
    ],
    targetedMisconceptions: [`${LEN}:MC-2`],
    source: eb(LEN, 'Transfer probe — path length is not displacement'),
  },

  // --- math.geom.perimeter -------------------------------------------------------------
  {
    conceptId: PERI, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.ELEMENTARY,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What is the perimeter of a 3 by 5 rectangle?',
    choices: [
      { text: '16 — the distance all the way round', isCorrect: true },
      { text: '15 — 3 times 5', isCorrect: false, misconceptionId: `${PERI}:MC-1` },
      { text: '8 — 3 plus 5', isCorrect: false },
    ],
    targetedMisconceptions: [`${PERI}:MC-1`],
    source: eb(PERI, 'Assessment gate — the fence, not the field'),
  },
  {
    conceptId: PERI, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.ELEMENTARY,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A 1×8 rectangle and a 3×6 rectangle both have perimeter 18. What about their areas?',
    choices: [
      { text: '8 and 18 — the same perimeter can enclose very different areas', isCorrect: true },
      { text: 'Both the same, since the perimeters match', isCorrect: false, misconceptionId: `${PERI}:MC-2` },
      { text: 'The 1×8 must be larger, as it is longer', isCorrect: false, misconceptionId: `${PERI}:MC-2` },
    ],
    targetedMisconceptions: [`${PERI}:MC-2`],
    source: eb(PERI, 'Misconception register — perimeter does not determine area'),
  },
  {
    conceptId: PERI, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.ELEMENTARY,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Do circles have a perimeter?',
    choices: [
      { text: 'Yes — it is called the circumference, 2πr, and only the name is different', isCorrect: true },
      { text: 'No — perimeter applies only to straight-sided shapes', isCorrect: false, misconceptionId: `${PERI}:MC-3` },
      { text: 'No — circles have area but no boundary length', isCorrect: false, misconceptionId: `${PERI}:MC-3` },
    ],
    targetedMisconceptions: [`${PERI}:MC-3`],
    source: eb(PERI, 'Transfer probe — circumference is a perimeter'),
  },

  // --- math.geom.area --------------------------------------------------------------------
  {
    conceptId: AREA, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Why is the area of a 3 by 5 rectangle 15?',
    choices: [
      { text: 'Fifteen unit squares fit inside it — that is what length × width counts', isCorrect: true },
      { text: 'Because 3 + 5 + 3 + 5 = 16, minus one for the corner', isCorrect: false, misconceptionId: `${AREA}:MC-1` },
      { text: 'It is a formula that has to be taken on trust', isCorrect: false, misconceptionId: `${AREA}:MC-3` },
    ],
    targetedMisconceptions: [`${AREA}:MC-1`, `${AREA}:MC-3`],
    source: eb(AREA, 'Assessment gate — area counts squares'),
  },
  {
    conceptId: AREA, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Double every side of a shape. What happens to its area?',
    choices: [
      { text: 'It goes up FOUR times — each unit square becomes a 2 by 2 block', isCorrect: true },
      { text: 'It doubles, like the sides', isCorrect: false, misconceptionId: `${AREA}:MC-2` },
      { text: 'It goes up eight times', isCorrect: false, misconceptionId: `${AREA}:MC-2` },
    ],
    targetedMisconceptions: [`${AREA}:MC-2`],
    source: eb(AREA, 'Misconception register — area does not scale linearly'),
  },
  {
    conceptId: AREA, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Your answer came out in metres, not square metres. What does that tell you?',
    choices: [
      { text: 'You computed a perimeter, not an area — the units are the quickest check', isCorrect: true },
      { text: 'Nothing — the units are a labelling choice', isCorrect: false, misconceptionId: `${AREA}:MC-1` },
      { text: 'The shape must have curved sides', isCorrect: false },
    ],
    targetedMisconceptions: [`${AREA}:MC-1`],
    source: eb(AREA, 'Transfer probe — units distinguish area from perimeter'),
  },

  // --- math.geom.area-triangle ----------------------------------------------------------------
  {
    conceptId: ATRI, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Why does the triangle area formula have a ½ in it?',
    choices: [
      { text: 'Two copies of the triangle make a parallelogram — the ½ is the copy you did not use', isCorrect: true },
      { text: 'Because a triangle has three sides rather than four', isCorrect: false },
      { text: 'It is a correction factor found by measurement', isCorrect: false },
    ],
    targetedMisconceptions: [`${ATRI}:MC-3`],
    source: eb(ATRI, 'Assessment gate — half a parallelogram'),
  },
  {
    conceptId: ATRI, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'On a slanted triangle, which measurement is the height?',
    choices: [
      { text: 'The perpendicular distance from the base to the opposite vertex — often not any side', isCorrect: true },
      { text: 'The length of the slanted side going up from the base', isCorrect: false, misconceptionId: `${ATRI}:MC-1` },
      { text: 'The longest side', isCorrect: false, misconceptionId: `${ATRI}:MC-1` },
    ],
    targetedMisconceptions: [`${ATRI}:MC-1`],
    source: eb(ATRI, 'Misconception register — the height is perpendicular, not a slant side'),
  },
  {
    conceptId: ATRI, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'You know all three sides and no height. Can you find the area?',
    choices: [
      { text: 'Yes — Heron\'s formula uses the three sides alone, which is the point of it', isCorrect: true },
      { text: 'No — every area formula needs a height', isCorrect: false, misconceptionId: `${ATRI}:MC-2` },
      { text: 'Only if the triangle is right-angled', isCorrect: false, misconceptionId: `${ATRI}:MC-2` },
    ],
    targetedMisconceptions: [`${ATRI}:MC-2`],
    source: eb(ATRI, 'Transfer probe — Heron needs no height'),
  },

  // --- math.geom.area-polygon ------------------------------------------------------------------
  {
    conceptId: APOLY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What is the area of a parallelogram with base 6 and height 4?',
    choices: [
      { text: '24 — base × height, with no half', isCorrect: true },
      { text: '12 — ½ × base × height', isCorrect: false, misconceptionId: `${APOLY}:MC-2` },
      { text: '20 — the perimeter', isCorrect: false },
    ],
    targetedMisconceptions: [`${APOLY}:MC-2`],
    source: eb(APOLY, 'Assessment gate — the parallelogram has no half'),
  },
  {
    conceptId: APOLY, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'You have forgotten the trapezoid formula. What can you do?',
    choices: [
      { text: 'Rebuild it — two copies rotated together make a parallelogram of base (b₁+b₂), so one is ½(b₁+b₂)h', isCorrect: true },
      { text: 'Nothing — the formulas are independent facts that must be memorised', isCorrect: false, misconceptionId: `${APOLY}:MC-1` },
      { text: 'Use the triangle formula instead, as it is closest', isCorrect: false, misconceptionId: `${APOLY}:MC-2` },
    ],
    targetedMisconceptions: [`${APOLY}:MC-1`],
    source: eb(APOLY, 'Misconception register — each formula is one cut from the rectangle'),
  },
  {
    conceptId: APOLY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'How do you find the area of an irregular seven-sided shape with no named formula?',
    choices: [
      { text: 'Cut it into triangles and add — decomposition works on any polygon, which is when you need it most', isCorrect: true },
      { text: 'Triangle decomposition only works for regular polygons', isCorrect: false, misconceptionId: `${APOLY}:MC-3` },
      { text: 'Measure the perimeter and divide by seven', isCorrect: false },
    ],
    targetedMisconceptions: [`${APOLY}:MC-3`],
    source: eb(APOLY, 'Transfer probe — decomposition is not just for regular polygons'),
  },

  // --- math.geom.circle-parts --------------------------------------------------------------------
  {
    conceptId: CPARTS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is every chord a diameter?',
    choices: [
      { text: 'No — a diameter is the chord that passes through the centre, and it is the longest', isCorrect: true },
      { text: 'Yes — chord is another word for diameter', isCorrect: false, misconceptionId: `${CPARTS}:MC-3` },
      { text: 'Yes, provided it touches the edge at both ends', isCorrect: false, misconceptionId: `${CPARTS}:MC-3` },
    ],
    targetedMisconceptions: [`${CPARTS}:MC-3`],
    source: eb(CPARTS, 'Assessment gate — the diameter is a special chord'),
  },
  {
    conceptId: CPARTS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A circle has diameter 10. What is its area?',
    choices: [
      { text: '25π — halve to get r = 5 first, since the formula takes the radius', isCorrect: true },
      { text: '100π — substitute 10 into πr²', isCorrect: false, misconceptionId: `${CPARTS}:MC-2` },
      { text: '10π', isCorrect: false, misconceptionId: `${CPARTS}:MC-2` },
    ],
    targetedMisconceptions: [`${CPARTS}:MC-2`],
    source: eb(CPARTS, 'Misconception register — the formulas take the radius'),
  },
  {
    conceptId: CPARTS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'What distinguishes a sector from a segment?',
    choices: [
      { text: 'The sector reaches the centre (two radii and an arc); the segment is cut off by a chord and does not', isCorrect: true },
      { text: 'The segment is the pie slice and the sector is the offcut', isCorrect: false, misconceptionId: `${CPARTS}:MC-1` },
      { text: 'They are two names for the same region', isCorrect: false, misconceptionId: `${CPARTS}:MC-1` },
    ],
    targetedMisconceptions: [`${CPARTS}:MC-1`],
    source: eb(CPARTS, 'Transfer probe — reaching the centre is the test'),
  },

  // --- math.geom.congruent-triangles ---------------------------------------------------------------
  {
    conceptId: CONGR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What does congruent mean, as against similar?',
    choices: [
      { text: 'Same shape AND same size; similar is same shape, any size', isCorrect: true },
      { text: 'Same shape, any size — the two words are interchangeable', isCorrect: false, misconceptionId: `${CONGR}:MC-1` },
      { text: 'Same area, whatever the shape', isCorrect: false, misconceptionId: `${CONGR}:MC-1` },
    ],
    targetedMisconceptions: [`${CONGR}:MC-1`],
    source: eb(CONGR, 'Assessment gate — congruence includes size'),
  },
  {
    conceptId: CONGR, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Two triangles have all three angles equal. Are they congruent?',
    choices: [
      { text: 'No — AAA gives SIMILARITY; they can be a millimetre or a mile across', isCorrect: true },
      { text: 'Yes — three matching measurements is a criterion', isCorrect: false, misconceptionId: `${CONGR}:MC-2` },
      { text: 'Yes, provided the angles are listed in the same order', isCorrect: false, misconceptionId: `${CONGR}:MC-2` },
    ],
    targetedMisconceptions: [`${CONGR}:MC-2`],
    source: eb(CONGR, 'Misconception register — AAA fixes shape, not size'),
  },
  {
    conceptId: CONGR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Why is SSA not a congruence criterion when SAS is?',
    choices: [
      { text: 'A non-included angle can often be completed into two different triangles — the included-ness in SAS is doing real work', isCorrect: true },
      { text: 'It is — SSA and SAS are the same three measurements', isCorrect: false, misconceptionId: `${CONGR}:MC-3` },
      { text: 'Because the letters must always be in alphabetical order', isCorrect: false, misconceptionId: `${CONGR}:MC-3` },
    ],
    targetedMisconceptions: [`${CONGR}:MC-3`],
    source: eb(CONGR, 'Transfer probe — the ambiguous case'),
  },
]
