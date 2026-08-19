/**
 * Third authoring batch — written procedures, and the vocabulary of proof.
 *
 * Two clusters, both chosen the same way as the batches before: fewest
 * prerequisites first, because that is the order a learner meets them.
 *
 *   ARITHMETIC   the written and mental procedures that turn place value into
 *                something you can actually compute with, plus the language
 *                division is spoken in.
 *   FOUNDATIONS  the last of the set vocabulary, and the word "axiom" — the
 *                place every proof eventually bottoms out.
 *
 * All eight carried a full Educational Brain entry and served the learner
 * nothing. Each now has one explanation and three closed-choice probes, which
 * is the asset contract.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const COLADD = 'math.arith.column-addition'
const MENADD = 'math.arith.mental-addition'
const TABLE = 'math.arith.multiplication-table'
const REM = 'math.arith.remainder'
const DD = 'math.arith.divisor-dividend'
const SEQL = 'math.found.set-equality'
const PSUB = 'math.found.proper-subset'
const AX = 'math.found.axiom'

export const MATHEMATICS_BATCH3_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: COLADD, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.ELEMENTARY,
    content:
      'Stacking numbers to add them is not a new trick — it is place value doing the work.\n\n'
      + 'Write 47 above 28 so the ones line up under the ones and the tens under the tens. '
      + 'That lining up is the whole method: you may only add ones to ones, because seven '
      + 'ones and two TENS are not the same kind of thing.\n\n'
      + 'Now 7 + 8 = 15, and 15 will not fit in the ones column — a column holds one digit. '
      + 'So you keep the 5 and carry the ten next door, where it belongs. Then 4 + 2 + 1 = 7, '
      + 'giving 75.\n\n'
      + 'The carried 1 is not a rule to memorise. It is one ten, moving to the place where '
      + 'tens are counted. Anyone who can say that out loud will never lose a carry again.',
    targetedMisconceptions: [`${COLADD}:MC-carry-as-ritual`],
    source: eb(COLADD, 'Identity + Misconception register — carrying as regrouping, not ritual'),
  },
  {
    conceptId: MENADD, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.ELEMENTARY,
    content:
      'To add 47 and 28 in your head, do not picture the columns. Break the numbers up '
      + 'instead: 47 + 20 is 67, then 67 + 8 is 75.\n\n'
      + 'That works because you may split an addition however you like without changing the '
      + 'answer. So you choose the split that makes the steps easy, which is usually tens '
      + 'first, then ones.\n\n'
      + 'A second move is worth having: 47 + 28 is also 47 + 30 − 2, because 28 is two short '
      + 'of thirty. Adding thirty is easy, and taking two back is easy. Mental arithmetic is '
      + 'mostly this — noticing which nearby number is friendlier, and correcting afterwards.',
    targetedMisconceptions: [`${MENADD}:MC-mental-is-column-in-head`],
    source: eb(MENADD, 'Identity — decomposition and compensation as the mental strategies'),
  },
  {
    conceptId: TABLE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.ELEMENTARY,
    content:
      'The times table looks like a hundred facts to memorise. It is far fewer, and the grid '
      + 'shows why.\n\n'
      + 'Fold it along the diagonal and the two halves match: 3 × 7 and 7 × 3 are the same '
      + 'square. That immediately halves the work. The ones, twos, fives and tens follow '
      + 'patterns you already know, and nines have their own — the digits of every answer '
      + 'add to nine.\n\n'
      + 'What is left is a small handful in the middle, around 6 × 7 and 7 × 8. Those are the '
      + 'ones genuinely worth drilling. The table is not a wall of facts; it is a few '
      + 'patterns and a short list of exceptions.',
    targetedMisconceptions: [`${TABLE}:MC-hundred-separate-facts`],
    source: eb(TABLE, 'Identity — symmetry and pattern reduce the memory load'),
  },
  {
    conceptId: REM, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.ELEMENTARY,
    content:
      'Share 17 sweets between 5 children. Each gets 3, and 2 are left over. Those 2 are the '
      + 'remainder — what is left when you cannot make another full share.\n\n'
      + 'The remainder is always smaller than the number you are dividing by. If it were not, '
      + 'you could hand out another sweet each. So dividing by 5 can leave 0, 1, 2, 3 or 4 — '
      + 'never 5, never more.\n\n'
      + 'Whether to give the remainder as a leftover or as a fraction depends on what you are '
      + 'sharing. Sweets you cannot cut leave 2 over. A cake you can cut gives each child 3 '
      + 'and two-fifths. Same division, different answer, because the situation is different.',
    targetedMisconceptions: [`${REM}:MC-remainder-can-exceed-divisor`],
    source: eb(REM, 'Identity + Misconception register — the remainder is bounded by the divisor'),
  },
  {
    conceptId: DD, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.ELEMENTARY,
    content:
      'In 20 ÷ 4, the 20 is the dividend — the amount being shared — and the 4 is the '
      + 'divisor, the number of shares.\n\n'
      + 'The names matter because division does not care about your feelings on order. '
      + '20 ÷ 4 is 5; 4 ÷ 20 is a fifth. Swapping them gives a completely different answer, '
      + 'unlike addition or multiplication where swapping is harmless.\n\n'
      + 'A simple check: the dividend is what you START with, and it goes first, under the '
      + 'bar or on the left. Say "twenty divided by four" aloud and the order is already in '
      + 'the words.',
    targetedMisconceptions: [`${DD}:MC-division-commutative`],
    source: eb(DD, 'Identity + Misconception register — division is not commutative'),
  },
  {
    conceptId: SEQL, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'Two sets are equal when they have exactly the same members. Nothing else counts — not '
      + 'the order, not how the set was described, not how many times something was listed.\n\n'
      + 'So {1, 2, 3} and {3, 2, 1} are the same set. So are "the even numbers between 1 and '
      + '5" and {2, 4}, even though one is a sentence and the other a list.\n\n'
      + 'The practical test is two-way: show every member of A is in B, then show every '
      + 'member of B is in A. Both directions are needed, and forgetting the second is the '
      + 'usual slip — proving A ⊆ B alone leaves open that B has something extra.',
    targetedMisconceptions: [`${SEQL}:MC-one-direction-suffices`],
    source: eb(SEQL, 'Identity + Misconception register — extensionality and the two-way test'),
  },
  {
    conceptId: PSUB, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'A ⊆ B allows A and B to be the same set. A ⊂ B does not — a proper subset must leave '
      + 'something out.\n\n'
      + 'So {1, 2} is a proper subset of {1, 2, 3}, because everything in it is in the '
      + 'bigger set AND the bigger set has a 3 that it lacks. But {1, 2} is not a proper '
      + 'subset of {1, 2}: nothing is left over.\n\n'
      + 'It is the same distinction as < against ≤ for numbers, and it is worth carrying that '
      + 'comparison. A set is always a subset of itself, exactly as 5 ≤ 5; a set is never a '
      + 'proper subset of itself, exactly as 5 < 5 is false.',
    targetedMisconceptions: [`${PSUB}:MC-proper-vs-improper`],
    source: eb(PSUB, 'Identity — ⊂ against ⊆, mapped onto < against ≤'),
  },
  {
    conceptId: AX, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'Every proof rests on something earlier. Follow the chain back far enough and you reach '
      + 'statements with nothing behind them — the ones taken as starting points. Those are '
      + 'axioms.\n\n'
      + 'An axiom is not a statement too obvious to doubt. It is one you agree to ASSUME so '
      + 'that reasoning can begin at all. Without a floor, every justification would need a '
      + 'justification, forever.\n\n'
      + 'That makes them choices, and different choices give different mathematics. For two '
      + 'thousand years people tried to prove Euclid\'s parallel postulate from the others '
      + 'and failed — because it is independent. Drop it and you get geometry on a sphere, '
      + 'where triangles have more than 180°, and nothing is broken. The axioms decide which '
      + 'world you are reasoning about.',
    targetedMisconceptions: [`${AX}:MC-axiom-is-obvious-truth`],
    source: eb(AX, 'Identity + Misconception register — axioms as assumptions, not self-evident truths'),
  },
]

export const MATHEMATICS_BATCH3_PROBES: SeedProbe[] = [
  // ── column-addition ───────────────────────────────────────────────────────
  {
    conceptId: COLADD, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.ELEMENTARY,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Adding 47 and 28 in columns, you work out 7 + 8 = 15. What do you write in the ones column?',
    choices: [
      { text: '5, and carry the ten into the tens column', isCorrect: true },
      { text: '15', isCorrect: false, misconceptionId: `${COLADD}:MC-no-carry` },
      { text: '1, and carry the 5', isCorrect: false, misconceptionId: `${COLADD}:MC-carry-wrong-digit` },
    ],
    targetedMisconceptions: [`${COLADD}:MC-no-carry`],
    source: eb(COLADD, 'Assessment gate — a column holds one digit; the ten regroups'),
  },
  {
    conceptId: COLADD, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.ELEMENTARY,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'What does the small 1 you carry actually stand for?',
    choices: [
      { text: 'One ten, moving to the column where tens are counted', isCorrect: true },
      { text: 'One — just a reminder mark with no value', isCorrect: false, misconceptionId: `${COLADD}:MC-carry-as-ritual` },
    ],
    targetedMisconceptions: [`${COLADD}:MC-carry-as-ritual`],
    source: eb(COLADD, 'Assessment gate — the carry has a value, and it is ten'),
  },
  {
    conceptId: COLADD, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.ELEMENTARY,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A student adds 9 and 45 by lining up the 9 under the 4. What is wrong?',
    choices: [
      { text: 'The 9 is ones and the 4 is tens — the ones must line up under the ones', isCorrect: true },
      { text: 'Nothing, as long as the digits are neatly stacked', isCorrect: false, misconceptionId: `${COLADD}:MC-left-align` },
    ],
    targetedMisconceptions: [`${COLADD}:MC-left-align`],
    source: eb(COLADD, 'Assessment gate — alignment is by place, not by edge'),
  },

  // ── mental-addition ───────────────────────────────────────────────────────
  {
    conceptId: MENADD, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.ELEMENTARY,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Which is the easier way to add 47 + 28 in your head?',
    choices: [
      { text: '47 + 20 = 67, then 67 + 8 = 75', isCorrect: true },
      { text: 'Picture the columns and carry, exactly as on paper', isCorrect: false, misconceptionId: `${MENADD}:MC-mental-is-column-in-head` },
    ],
    targetedMisconceptions: [`${MENADD}:MC-mental-is-column-in-head`],
    source: eb(MENADD, 'Assessment gate — decomposition beats visualising the algorithm'),
  },
  {
    conceptId: MENADD, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.ELEMENTARY,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'To work out 47 + 28, a student adds 47 + 30 and gets 77. What must they do next?',
    choices: [
      { text: 'Subtract 2 — they added two more than they meant to, so 75', isCorrect: true },
      { text: 'Add 2, giving 79', isCorrect: false, misconceptionId: `${MENADD}:MC-compensation-direction` },
      { text: 'Nothing — 77 is the answer', isCorrect: false, misconceptionId: `${MENADD}:MC-forgot-to-compensate` },
    ],
    targetedMisconceptions: [`${MENADD}:MC-compensation-direction`],
    source: eb(MENADD, 'Assessment gate — the direction of the compensating step'),
  },
  {
    conceptId: MENADD, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.ELEMENTARY,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Why is splitting 28 into 20 and 8 allowed when adding?',
    choices: [
      { text: 'Because you can break an addition into parts however you like without changing the total', isCorrect: true },
      { text: 'Because 28 is an even number', isCorrect: false, misconceptionId: `${MENADD}:MC-special-case` },
    ],
    targetedMisconceptions: [`${MENADD}:MC-special-case`],
    source: eb(MENADD, 'Assessment gate — the property that licenses decomposition'),
  },

  // ── multiplication-table ──────────────────────────────────────────────────
  {
    conceptId: TABLE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.ELEMENTARY,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'You know 7 × 3 = 21. What is 3 × 7?',
    choices: [
      { text: '21 — the same fact, so the table is symmetric', isCorrect: true },
      { text: 'A separate fact you have to learn on its own', isCorrect: false, misconceptionId: `${TABLE}:MC-hundred-separate-facts` },
    ],
    targetedMisconceptions: [`${TABLE}:MC-hundred-separate-facts`],
    source: eb(TABLE, 'Assessment gate — symmetry halves the memory load'),
  },
  {
    conceptId: TABLE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.ELEMENTARY,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'The answers in the nine times table are 9, 18, 27, 36, 45… What pattern do their digits show?',
    choices: [
      { text: 'The digits of each answer add up to nine', isCorrect: true },
      { text: 'There is no pattern; they must simply be memorised', isCorrect: false, misconceptionId: `${TABLE}:MC-no-patterns` },
    ],
    targetedMisconceptions: [`${TABLE}:MC-no-patterns`],
    source: eb(TABLE, 'Assessment gate — the nine-times digit-sum pattern'),
  },
  {
    conceptId: TABLE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.ELEMENTARY,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'You have forgotten 6 × 7. You do remember 6 × 6 = 36. How does that help?',
    choices: [
      { text: 'Add one more six: 36 + 6 = 42', isCorrect: true },
      { text: 'Add one: 37', isCorrect: false, misconceptionId: `${TABLE}:MC-add-one-not-one-group` },
      { text: 'It does not help — each fact stands alone', isCorrect: false, misconceptionId: `${TABLE}:MC-hundred-separate-facts` },
    ],
    targetedMisconceptions: [`${TABLE}:MC-add-one-not-one-group`],
    source: eb(TABLE, 'Assessment gate — deriving a fact from a neighbouring one'),
  },

  // ── remainder ─────────────────────────────────────────────────────────────
  {
    conceptId: REM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.ELEMENTARY,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: '17 sweets are shared equally between 5 children. How many are left over?',
    choices: [
      { text: '2', isCorrect: true },
      { text: '3', isCorrect: false, misconceptionId: `${REM}:MC-quotient-as-remainder` },
    ],
    targetedMisconceptions: [`${REM}:MC-quotient-as-remainder`],
    source: eb(REM, 'Assessment gate — separating the share from the leftover'),
  },
  {
    conceptId: REM, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.ELEMENTARY,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Dividing by 5, a student writes "3 remainder 7". What is wrong?',
    choices: [
      { text: 'A remainder of 7 is bigger than 5, so another whole share could still be given out', isCorrect: true },
      { text: 'Nothing — a remainder can be any size', isCorrect: false, misconceptionId: `${REM}:MC-remainder-can-exceed-divisor` },
    ],
    targetedMisconceptions: [`${REM}:MC-remainder-can-exceed-divisor`],
    source: eb(REM, 'Assessment gate — the remainder is bounded by the divisor'),
  },
  {
    conceptId: REM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.ELEMENTARY,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: '17 metres of ribbon are cut into 5 equal pieces. How long is each piece?',
    choices: [
      { text: '3.4 metres — ribbon can be cut, so the leftover is shared out too', isCorrect: true },
      { text: '3 metres, with 2 left over', isCorrect: false, misconceptionId: `${REM}:MC-context-ignored` },
    ],
    targetedMisconceptions: [`${REM}:MC-context-ignored`],
    source: eb(REM, 'Assessment gate — whether a remainder stays whole depends on what is shared'),
  },

  // ── divisor-dividend ──────────────────────────────────────────────────────
  {
    conceptId: DD, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.ELEMENTARY,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'In 20 ÷ 4, which number is the dividend?',
    choices: [
      { text: '20 — the amount being shared out', isCorrect: true },
      { text: '4', isCorrect: false, misconceptionId: `${DD}:MC-names-swapped` },
    ],
    targetedMisconceptions: [`${DD}:MC-names-swapped`],
    source: eb(DD, 'Assessment gate — naming the parts of a division'),
  },
  {
    conceptId: DD, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.ELEMENTARY,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is 20 ÷ 4 the same as 4 ÷ 20?',
    choices: [
      { text: 'No — the first is 5 and the second is a fifth; order matters in division', isCorrect: true },
      { text: 'Yes — order does not matter, as with multiplication', isCorrect: false, misconceptionId: `${DD}:MC-division-commutative` },
    ],
    targetedMisconceptions: [`${DD}:MC-division-commutative`],
    source: eb(DD, 'Assessment gate — division is not commutative'),
  },
  {
    conceptId: DD, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.ELEMENTARY,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: '24 pencils are packed into boxes of 6. Which division answers "how many boxes?"',
    choices: [
      { text: '24 ÷ 6 — the pencils are what you start with, so they are the dividend', isCorrect: true },
      { text: '6 ÷ 24', isCorrect: false, misconceptionId: `${DD}:MC-order-reversed-in-context` },
    ],
    targetedMisconceptions: [`${DD}:MC-order-reversed-in-context`],
    source: eb(DD, 'Assessment gate — mapping a word problem onto the right order'),
  },

  // ── set-equality ──────────────────────────────────────────────────────────
  {
    conceptId: SEQL, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Are {1, 2, 3} and {3, 2, 1} equal sets?',
    choices: [
      { text: 'Yes — they have exactly the same members, and order is not part of a set', isCorrect: true },
      { text: 'No — the members are in a different order', isCorrect: false, misconceptionId: `${SEQL}:MC-order-matters` },
    ],
    targetedMisconceptions: [`${SEQL}:MC-order-matters`],
    source: eb(SEQL, 'Assessment gate — equality is decided by membership alone'),
  },
  {
    conceptId: SEQL, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'You have shown every member of A is in B. Have you shown A = B?',
    choices: [
      { text: 'Not yet — B might have something extra, so you must also show every member of B is in A', isCorrect: true },
      { text: 'Yes — that is what equality means', isCorrect: false, misconceptionId: `${SEQL}:MC-one-direction-suffices` },
    ],
    targetedMisconceptions: [`${SEQL}:MC-one-direction-suffices`],
    source: eb(SEQL, 'Assessment gate — the two-way test for set equality'),
  },
  {
    conceptId: SEQL, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is "the even numbers between 1 and 5" equal to {2, 4}?',
    choices: [
      { text: 'Yes — a set is decided by its members, not by how it was described', isCorrect: true },
      { text: 'No — one is a description and the other is a list', isCorrect: false, misconceptionId: `${SEQL}:MC-description-matters` },
    ],
    targetedMisconceptions: [`${SEQL}:MC-description-matters`],
    source: eb(SEQL, 'Assessment gate — extensionality across different descriptions'),
  },

  // ── proper-subset ─────────────────────────────────────────────────────────
  {
    conceptId: PSUB, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is {1, 2} a proper subset of {1, 2, 3}?',
    choices: [
      { text: 'Yes — everything in it is in the bigger set, and the bigger set has a 3 it lacks', isCorrect: true },
      { text: 'No — a proper subset must be missing at least two things', isCorrect: false, misconceptionId: `${PSUB}:MC-needs-large-gap` },
    ],
    targetedMisconceptions: [`${PSUB}:MC-needs-large-gap`],
    source: eb(PSUB, 'Assessment gate — one missing element is enough'),
  },
  {
    conceptId: PSUB, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is {1, 2} a proper subset of {1, 2}?',
    choices: [
      { text: 'No — nothing is left over, and a proper subset must leave something out', isCorrect: true },
      { text: 'Yes — every set is a proper subset of itself', isCorrect: false, misconceptionId: `${PSUB}:MC-proper-vs-improper` },
    ],
    targetedMisconceptions: [`${PSUB}:MC-proper-vs-improper`],
    source: eb(PSUB, 'Assessment gate — ⊂ excludes equality, as < excludes it for numbers'),
  },
  {
    conceptId: PSUB, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Which number comparison is ⊂ most like?',
    choices: [
      { text: '< — it rules out being equal', isCorrect: true },
      { text: '≤ — it allows being equal', isCorrect: false, misconceptionId: `${PSUB}:MC-proper-vs-improper` },
    ],
    targetedMisconceptions: [`${PSUB}:MC-proper-vs-improper`],
    source: eb(PSUB, 'Assessment gate — the ⊂ / ⊆ against < / ≤ mapping'),
  },

  // ── axiom ─────────────────────────────────────────────────────────────────
  {
    conceptId: AX, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What is an axiom?',
    choices: [
      { text: 'A statement taken as a starting point, assumed rather than proved', isCorrect: true },
      { text: 'A statement that has been proved from simpler ones', isCorrect: false, misconceptionId: `${AX}:MC-axiom-is-theorem` },
    ],
    targetedMisconceptions: [`${AX}:MC-axiom-is-theorem`],
    source: eb(AX, 'Assessment gate — axiom against theorem'),
  },
  {
    conceptId: AX, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Must an axiom be something obviously true that nobody could doubt?',
    choices: [
      { text: 'No — it is a statement you agree to assume so reasoning can begin; different choices give different mathematics', isCorrect: true },
      { text: 'Yes — axioms are the self-evident truths', isCorrect: false, misconceptionId: `${AX}:MC-axiom-is-obvious-truth` },
    ],
    targetedMisconceptions: [`${AX}:MC-axiom-is-obvious-truth`],
    source: eb(AX, 'Assessment gate — axioms are chosen, not discovered'),
  },
  {
    conceptId: AX, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Why can a proof not justify every single statement it uses?',
    choices: [
      { text: 'Because each justification would need its own, forever — so some statements must be assumed to start', isCorrect: true },
      { text: 'Because some statements are too complicated to prove', isCorrect: false, misconceptionId: `${AX}:MC-too-hard-to-prove` },
    ],
    targetedMisconceptions: [`${AX}:MC-too-hard-to-prove`],
    source: eb(AX, 'Assessment gate — the regress that makes a starting point necessary'),
  },
]
