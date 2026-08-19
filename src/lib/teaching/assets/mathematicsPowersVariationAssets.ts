/**
 * Eighth batch — powers and their inverses, how two quantities move together,
 * and the two kinds of reasoning.
 *
 *   POWERS       square-numbers, cube-numbers, square-roots, estimation.
 *                Squaring is taught next to doubling and tripling and gets
 *                absorbed into them; estimation is treated as the thing you
 *                do when you cannot be bothered to be right.
 *   VARIATION    direct-variation, inverse-variation. Both are "y depends on
 *                x", and the word inverse does not say which way.
 *   REASONING    deductive-reasoning, inductive-reasoning. The pair that
 *                decides whether a learner believes evidence settles things.
 *                Note that inductive reasoning and mathematical induction
 *                share a name and are opposites in certainty — that is
 *                explicitly the misconception, not an aside.
 *
 * All eight carried a full Educational Brain entry and served the learner
 * nothing. Each now has one explanation and three closed-choice probes.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const SQN = 'math.arith.square-numbers'
const CUBN = 'math.arith.cube-numbers'
const SQRT = 'math.arith.square-roots'
const EST = 'math.arith.estimation'
const DVAR = 'math.arith.direct-variation'
const IVAR = 'math.arith.inverse-variation'
const DED = 'math.found.deductive-reasoning'
const IND = 'math.found.inductive-reasoning'

export const MATHEMATICS_POWERS_VARIATION_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: SQN, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.ELEMENTARY,
    content:
      'Lay counters in a square and count them: 1, 4, 9, 16, 25. Those are the square '
      + 'numbers, and the name is literal — 4² = 16 because a 4-by-4 square holds sixteen '
      + 'counters.\n\n'
      + 'The trap is that squaring sits in lessons next to doubling and quietly borrows its '
      + 'meaning. They agree once, at 2, and then separate for good: 5 doubled is 10 but 5 '
      + 'squared is 25, and 10 doubled is 20 while 10 squared is 100. If squaring were '
      + 'doubling, the counters would only ever make a strip two wide.\n\n'
      + 'Squaring a negative gives a positive, because (−3)² is (−3) × (−3) and two negatives '
      + 'multiply to a positive. And no perfect square ends in 2, 3, 7 or 8 — a useful check, '
      + 'though not a proof of the reverse: 12 ends in 2 so it cannot be one, but 24 ends in '
      + '4 and is not one either.',
    targetedMisconceptions: [`${SQN}:MC-1`, `${SQN}:MC-2`],
    source: eb(SQN, 'Identity + Misconception register — squaring is not doubling'),
  },
  {
    conceptId: CUBN, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.ELEMENTARY,
    content:
      'Stack cubes into a cube and count them: 1, 8, 27, 64, 125. A 3-by-3-by-3 box holds 27 '
      + 'of them, which is why 3³ = 27 and why the word cube means the same thing in the '
      + 'shape and in the arithmetic.\n\n'
      + 'Cubing is not tripling, for the same reason squaring is not doubling. 4 tripled is '
      + '12; 4 cubed is 64. They agree only at 0 and at the point where the pattern has not '
      + 'yet had room to separate, and after that the gap grows fast — which is why doubling '
      + 'the side of a box multiplies what it holds by eight, not by two.\n\n'
      + 'Unlike squares, cubes keep the sign: (−2)³ = −8, because three negatives multiply to '
      + 'a negative. That is a real difference between even and odd powers, and it is the '
      + 'reason every real number has exactly one cube root while positive numbers have two '
      + 'square roots.',
    targetedMisconceptions: [`${CUBN}:MC-1`, `${CUBN}:MC-2`],
    source: eb(CUBN, 'Identity + Misconception register — odd powers keep the sign'),
  },
  {
    conceptId: SQRT, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'Taking a square root undoes squaring: √49 = 7 because 7² = 49. If squaring asks "how '
      + 'many counters in this square?", the root asks "how long is the side?".\n\n'
      + 'Both 7 and −7 square to 49, so the equation x² = 49 has two solutions. The SYMBOL √ '
      + 'is defined to give only the non-negative one, which is why √49 is 7 and not ±7 — the '
      + 'plus-or-minus in "x = ±7" is written in deliberately, because the symbol alone will '
      + 'not supply it.\n\n'
      + 'Most roots are not whole numbers, and trapping them between two squares is the '
      + 'honest way to handle it: 49 < 60 < 64, so √60 is between 7 and 8, and nearer 8 '
      + 'because 60 is nearer 64. Answering "about 7.7" is a real answer, not a failure to '
      + 'find the exact one.',
    targetedMisconceptions: [`${SQRT}:MC-1`, `${SQRT}:MC-3`],
    source: eb(SQRT, 'Identity + Misconception register — the symbol picks the non-negative root'),
  },
  {
    conceptId: EST, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.ELEMENTARY,
    content:
      'Estimating is deciding roughly what an answer should be BEFORE working it out, so that '
      + 'a wrong answer announces itself. 48 × 21 is about 50 × 20 = 1000, so a calculator '
      + 'showing 108 has caught a mistyped key.\n\n'
      + 'That is why estimating after computing exactly is the wrong way round — the estimate '
      + 'had one job and the job is already gone. The estimate is the check, not a summary of '
      + 'the answer.\n\n'
      + 'Which way to round depends on what the number is for. Costing a trip, round UP and '
      + 'you will have enough; judging whether a shelf will take a load, round the load up '
      + 'and the capacity down, so an error lands on the safe side. An estimate is not a '
      + 'wrong answer — it is a different and deliberately cheaper question, and being '
      + 'roughly right in advance is what makes exact work trustworthy.',
    targetedMisconceptions: [`${EST}:MC-1`, `${EST}:MC-2`],
    source: eb(EST, 'Identity + Misconception register — the estimate comes first, and rounds with a purpose'),
  },
  {
    conceptId: DVAR, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'Two quantities vary directly when one is always a fixed multiple of the other: y = kx. '
      + 'Petrol at £1.50 a litre gives cost = 1.50 × litres, and k is 1.50 — the amount of y '
      + 'per one x, which is where the number comes from rather than being handed over with '
      + 'the question.\n\n'
      + 'The test is not that the graph is a straight line. y = 2x + 5 is perfectly straight '
      + 'and is NOT direct variation, because zero litres would still cost £5. Direct '
      + 'variation passes through the origin: nothing of x means nothing of y, and doubling '
      + 'x doubles y. That fails for y = 2x + 5, where doubling 1 to 2 takes y from 7 to 9.\n\n'
      + 'The quickest check is to divide: if y/x gives the same number for every pair, k is '
      + 'that number and the relationship is direct. k may be negative — y = −3x is still '
      + 'direct variation, with y falling as x rises.',
    targetedMisconceptions: [`${DVAR}:MC-1`, `${DVAR}:MC-2`],
    source: eb(DVAR, 'Identity + Misconception register — straight is not enough; it must pass through the origin'),
  },
  {
    conceptId: IVAR, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'Two quantities vary inversely when their PRODUCT stays constant: y = k/x, so xy = k. '
      + 'Six people share a job that takes 12 hours alone, and it takes 2 hours; twelve '
      + 'people take 1 hour. People × hours is 12 every time.\n\n'
      + 'This is the opposite of direct variation, where the RATIO stays constant. That gives '
      + 'a clean test on any table: divide the pairs and get the same number, it is direct; '
      + 'multiply them and get the same number, it is inverse. Do not decide from the shape '
      + 'of the words — "inverse" tells you which quantity is constant, not merely that y '
      + 'goes down.\n\n'
      + 'The graph is a curve, never a line. As x grows the curve flattens toward the axis '
      + 'without reaching it, because k/x never becomes zero — and x = 0 is excluded, since '
      + 'no number of hours completes a job with nobody doing it.',
    targetedMisconceptions: [`${IVAR}:MC-1`, `${IVAR}:MC-2`],
    source: eb(IVAR, 'Identity + Misconception register — constant product versus constant ratio'),
  },
  {
    conceptId: DED, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'Deductive reasoning goes from general to particular, and its promise is unusually '
      + 'strong: if the premises are true, the conclusion CANNOT be false. All squares are '
      + 'rectangles; this is a square; so this is a rectangle. There is no room left for it '
      + 'not to be.\n\n'
      + 'Valid and true are different, and keeping them apart is most of the skill. "All '
      + 'birds can fly; a penguin is a bird; so a penguin can fly" is perfectly VALID — the '
      + 'conclusion does follow — and its conclusion is false, because the first premise was. '
      + 'Validity is about the joinery of the argument; truth is about the materials.\n\n'
      + 'An argument that is both valid and built on true premises is called sound, and only '
      + 'sound arguments deliver true conclusions. This is exactly what a mathematical proof '
      + 'is: a chain of deductive steps from axioms and results already established, which is '
      + 'why a proved theorem does not need to be revisited when new evidence turns up.',
    targetedMisconceptions: [`${DED}:MC-1`, `${DED}:MC-2`],
    source: eb(DED, 'Identity + Misconception register — validity versus truth versus soundness'),
  },
  {
    conceptId: IND, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'Inductive reasoning goes the other way, from particular to general: you see 3, 5, 7 '
      + 'and 11 are prime and odd, and propose that all primes past 2 are odd. It is how '
      + 'nearly every mathematical idea is first noticed.\n\n'
      + 'What it does not do is make anything certain. n² + n + 41 gives a prime for n = 0, '
      + '1, 2 and on up to 39 — forty cases without a failure — and then fails at n = 40. A '
      + 'pattern holding on every case you checked is a reason to investigate, and never a '
      + 'reason to stop.\n\n'
      + 'This matters because of a genuine collision of names. MATHEMATICAL INDUCTION is not '
      + 'inductive reasoning; it is deductive, and it is certain. It proves a base case and '
      + 'proves that each case forces the next, which settles infinitely many cases at once '
      + 'by argument rather than by checking. The two share a word and sit on opposite sides '
      + 'of the line between conjecture and proof.',
    targetedMisconceptions: [`${IND}:MC-1`, `${IND}:MC-2`],
    source: eb(IND, 'Identity + Misconception register — the name collision with mathematical induction'),
  },
]

export const MATHEMATICS_POWERS_VARIATION_PROBES: SeedProbe[] = [
  // --- math.arith.square-numbers ---------------------------------------------
  {
    conceptId: SQN, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.ELEMENTARY,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What is 5 squared?',
    choices: [
      { text: '25 — a 5-by-5 square holds 25', isCorrect: true },
      { text: '10 — squaring means doubling', isCorrect: false, misconceptionId: `${SQN}:MC-1` },
      { text: '7 — add 2 for the power', isCorrect: false },
    ],
    targetedMisconceptions: [`${SQN}:MC-1`],
    source: eb(SQN, 'Assessment gate — squaring is not doubling'),
  },
  {
    conceptId: SQN, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.ELEMENTARY,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'What is (−3)²?',
    choices: [
      { text: '9 — two negatives multiply to a positive', isCorrect: true },
      { text: '−9 — the minus carries through', isCorrect: false, misconceptionId: `${SQN}:MC-2` },
      { text: '−6 — multiply −3 by 2', isCorrect: false, misconceptionId: `${SQN}:MC-1` },
    ],
    targetedMisconceptions: [`${SQN}:MC-2`],
    source: eb(SQN, 'Misconception register — an even power destroys the sign'),
  },
  {
    conceptId: SQN, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.ELEMENTARY,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: '24 ends in 4, and so does the square number 4. Is 24 a perfect square?',
    choices: [
      { text: 'No — the last digit can rule a number OUT but never rule one in', isCorrect: true },
      { text: 'Yes — squares end in 4, so 24 qualifies', isCorrect: false, misconceptionId: `${SQN}:MC-3` },
      { text: 'Yes, because 24 is even and even numbers have whole square roots', isCorrect: false },
    ],
    targetedMisconceptions: [`${SQN}:MC-3`],
    source: eb(SQN, 'Transfer probe — a one-way test used both ways'),
  },

  // --- math.arith.cube-numbers ------------------------------------------------
  {
    conceptId: CUBN, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.ELEMENTARY,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What is 4 cubed?',
    choices: [
      { text: '64 — a 4-by-4-by-4 box holds 64', isCorrect: true },
      { text: '12 — cubing means tripling', isCorrect: false, misconceptionId: `${CUBN}:MC-1` },
      { text: '16 — 4 times 4', isCorrect: false },
    ],
    targetedMisconceptions: [`${CUBN}:MC-1`],
    source: eb(CUBN, 'Assessment gate — cubing is not tripling'),
  },
  {
    conceptId: CUBN, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.ELEMENTARY,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'What is (−2)³, and how does it differ from (−2)²?',
    choices: [
      { text: '−8 — three negatives multiply to a negative, while (−2)² is +4', isCorrect: true },
      { text: '8 — powers always give a positive result', isCorrect: false, misconceptionId: `${CUBN}:MC-2` },
      { text: '−6 — multiply −2 by 3', isCorrect: false, misconceptionId: `${CUBN}:MC-1` },
    ],
    targetedMisconceptions: [`${CUBN}:MC-2`],
    source: eb(CUBN, 'Misconception register — odd powers keep the sign'),
  },
  {
    conceptId: CUBN, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.ELEMENTARY,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Double the side of a cubical box. What happens to how much it holds?',
    choices: [
      { text: 'It holds eight times as much — 2³ = 8', isCorrect: true },
      { text: 'It holds twice as much', isCorrect: false, misconceptionId: `${CUBN}:MC-1` },
      { text: 'It holds three times as much, one for each dimension', isCorrect: false, misconceptionId: `${CUBN}:MC-1` },
    ],
    targetedMisconceptions: [`${CUBN}:MC-1`],
    source: eb(CUBN, 'Transfer probe — cubing in a volume setting'),
  },

  // --- math.arith.square-roots ------------------------------------------------
  {
    conceptId: SQRT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What is √49?',
    choices: [
      { text: '7 — because 7² = 49', isCorrect: true },
      { text: '24.5 — half of 49', isCorrect: false },
      { text: '±7 — the symbol gives both roots', isCorrect: false, misconceptionId: `${SQRT}:MC-1` },
    ],
    targetedMisconceptions: [`${SQRT}:MC-1`],
    source: eb(SQRT, 'Assessment gate — the symbol gives the non-negative root'),
  },
  {
    conceptId: SQRT, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Solve x² = 49.',
    choices: [
      { text: 'x = 7 or x = −7 — both square to 49, so the ± must be written in', isCorrect: true },
      { text: 'x = 7 only — that is what √49 gives', isCorrect: false, misconceptionId: `${SQRT}:MC-1` },
      { text: 'x = 49/2', isCorrect: false },
    ],
    targetedMisconceptions: [`${SQRT}:MC-1`],
    source: eb(SQRT, 'Misconception register — the equation has two solutions, the symbol gives one'),
  },
  {
    conceptId: SQRT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Estimate √60 without a calculator.',
    choices: [
      { text: 'About 7.7 — it sits between 7 and 8, and nearer 8 since 60 is nearer 64 than 49', isCorrect: true },
      { text: '8 — round to the nearest whole number and stop', isCorrect: false, misconceptionId: `${SQRT}:MC-3` },
      { text: '30 — half of 60', isCorrect: false },
    ],
    targetedMisconceptions: [`${SQRT}:MC-3`],
    source: eb(SQRT, 'Transfer probe — trapping a root between two squares'),
  },

  // --- math.arith.estimation --------------------------------------------------
  {
    conceptId: EST, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.ELEMENTARY,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Estimate 48 × 21.',
    choices: [
      { text: 'About 1000 — 50 × 20', isCorrect: true },
      { text: '1008 — you must work it out exactly first', isCorrect: false, misconceptionId: `${EST}:MC-1` },
      { text: 'About 70 — 48 plus 21', isCorrect: false },
    ],
    targetedMisconceptions: [`${EST}:MC-1`],
    source: eb(EST, 'Assessment gate — rounding to friendly numbers'),
  },
  {
    conceptId: EST, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.ELEMENTARY,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Your estimate for 48 × 21 was 1000 and the exact answer is 1008. Was the estimate wrong?',
    choices: [
      { text: 'No — it answered a cheaper question and did its job, which was to show 1008 is reasonable', isCorrect: true },
      { text: 'Yes — it missed by 8', isCorrect: false, misconceptionId: `${EST}:MC-2` },
      { text: 'Yes — an estimate is only right if it matches exactly', isCorrect: false, misconceptionId: `${EST}:MC-2` },
    ],
    targetedMisconceptions: [`${EST}:MC-2`],
    source: eb(EST, 'Misconception register — an estimate is not a failed exact answer'),
  },
  {
    conceptId: EST, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.ELEMENTARY,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'You are checking whether a shelf rated at 30 kg will take 4 boxes of about 7.4 kg. Which way should you round?',
    choices: [
      { text: 'Round the boxes UP to 8 kg each — 32 kg, so the error lands on the safe side', isCorrect: true },
      { text: 'Round them down to 7 kg each — 28 kg, which fits', isCorrect: false, misconceptionId: `${EST}:MC-3` },
      { text: 'Round to the nearest whole number regardless of what the answer is for', isCorrect: false, misconceptionId: `${EST}:MC-3` },
    ],
    targetedMisconceptions: [`${EST}:MC-3`],
    source: eb(EST, 'Transfer probe — rounding direction chosen for purpose'),
  },

  // --- math.arith.direct-variation --------------------------------------------
  {
    conceptId: DVAR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Petrol costs £1.50 per litre. In cost = k × litres, what is k?',
    choices: [
      { text: '1.50 — the cost of one litre', isCorrect: true },
      { text: 'The number of litres bought', isCorrect: false, misconceptionId: `${DVAR}:MC-1` },
      { text: 'The total cost', isCorrect: false, misconceptionId: `${DVAR}:MC-1` },
    ],
    targetedMisconceptions: [`${DVAR}:MC-1`],
    source: eb(DVAR, 'Assessment gate — k is the amount per one'),
  },
  {
    conceptId: DVAR, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is y = 2x + 5 direct variation?',
    choices: [
      { text: 'No — at x = 0 it gives y = 5, so it misses the origin and doubling x does not double y', isCorrect: true },
      { text: 'Yes — its graph is a straight line', isCorrect: false, misconceptionId: `${DVAR}:MC-2` },
      { text: 'Yes — y goes up whenever x does', isCorrect: false, misconceptionId: `${DVAR}:MC-2` },
    ],
    targetedMisconceptions: [`${DVAR}:MC-2`],
    source: eb(DVAR, 'Misconception register — straight is not enough'),
  },
  {
    conceptId: DVAR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is y = −3x direct variation?',
    choices: [
      { text: 'Yes — k is −3; it passes through the origin and y/x is constant', isCorrect: true },
      { text: 'No — k must be positive for direct variation', isCorrect: false, misconceptionId: `${DVAR}:MC-3` },
      { text: 'No — y falls as x rises, so it is inverse variation', isCorrect: false, misconceptionId: `${IVAR}:MC-1` },
    ],
    targetedMisconceptions: [`${DVAR}:MC-3`],
    source: eb(DVAR, 'Transfer probe — negative k is still direct variation'),
  },

  // --- math.arith.inverse-variation -------------------------------------------
  {
    conceptId: IVAR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'A job takes 12 hours for one person. With 6 people it takes 2 hours. What stays constant?',
    choices: [
      { text: 'The product, people × hours = 12', isCorrect: true },
      { text: 'The ratio, people ÷ hours', isCorrect: false, misconceptionId: `${IVAR}:MC-1` },
      { text: 'The difference, people − hours', isCorrect: false },
    ],
    targetedMisconceptions: [`${IVAR}:MC-1`],
    source: eb(IVAR, 'Assessment gate — inverse variation holds the product'),
  },
  {
    conceptId: IVAR, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A table shows y falling as x rises. What must you check before calling it inverse variation?',
    choices: [
      { text: 'Whether xy is the same for every pair — falling is not enough', isCorrect: true },
      { text: 'Nothing — y falling as x rises is what inverse means', isCorrect: false, misconceptionId: `${IVAR}:MC-3` },
      { text: 'Whether the points lie on a straight line', isCorrect: false, misconceptionId: `${IVAR}:MC-2` },
    ],
    targetedMisconceptions: [`${IVAR}:MC-3`],
    source: eb(IVAR, 'Misconception register — the product test, not the direction of travel'),
  },
  {
    conceptId: IVAR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'What shape is the graph of y = 12/x for x > 0?',
    choices: [
      { text: 'A curve that flattens toward the axis without ever reaching it', isCorrect: true },
      { text: 'A straight line sloping downward', isCorrect: false, misconceptionId: `${IVAR}:MC-2` },
      { text: 'A straight line through the origin', isCorrect: false, misconceptionId: `${IVAR}:MC-1` },
    ],
    targetedMisconceptions: [`${IVAR}:MC-2`],
    source: eb(IVAR, 'Transfer probe — inverse variation is never linear'),
  },

  // --- math.found.deductive-reasoning -----------------------------------------
  {
    conceptId: DED, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Which direction does deductive reasoning run?',
    choices: [
      { text: 'From general principles to a particular conclusion', isCorrect: true },
      { text: 'From particular observations to a general rule', isCorrect: false, misconceptionId: `${IND}:MC-1` },
      { text: 'From evidence to increasing confidence', isCorrect: false, misconceptionId: `${IND}:MC-1` },
    ],
    targetedMisconceptions: [`${DED}:MC-1`],
    source: eb(DED, 'Assessment gate — general to particular'),
  },
  {
    conceptId: DED, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: '"All birds can fly. A penguin is a bird. So a penguin can fly." Is this argument valid?',
    choices: [
      { text: 'Yes, valid but not sound — the conclusion does follow, and the first premise is false', isCorrect: true },
      { text: 'No — the conclusion is false, so the argument cannot be valid', isCorrect: false, misconceptionId: `${DED}:MC-1` },
      { text: 'Yes, and therefore the conclusion is true', isCorrect: false, misconceptionId: `${DED}:MC-1` },
    ],
    targetedMisconceptions: [`${DED}:MC-1`, `${DED}:MC-2`],
    source: eb(DED, 'Misconception register — validity is about joinery, truth about materials'),
  },
  {
    conceptId: DED, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'What must hold for an argument to deliver a true conclusion?',
    choices: [
      { text: 'It must be sound — valid AND built on true premises', isCorrect: true },
      { text: 'Validity alone is enough', isCorrect: false, misconceptionId: `${DED}:MC-2` },
      { text: 'True premises alone are enough', isCorrect: false, misconceptionId: `${DED}:MC-2` },
    ],
    targetedMisconceptions: [`${DED}:MC-2`],
    source: eb(DED, 'Transfer probe — soundness is the conjunction'),
  },

  // --- math.found.inductive-reasoning ------------------------------------------
  {
    conceptId: IND, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What does inductive reasoning give you?',
    choices: [
      { text: 'A general claim suggested by particular cases, held without certainty', isCorrect: true },
      { text: 'A conclusion that cannot be false if the premises are true', isCorrect: false, misconceptionId: `${IND}:MC-1` },
      { text: 'A proof, once enough cases have been checked', isCorrect: false, misconceptionId: `${IND}:MC-1` },
    ],
    targetedMisconceptions: [`${IND}:MC-1`],
    source: eb(IND, 'Assessment gate — particular to general, without certainty'),
  },
  {
    conceptId: IND, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'n² + n + 41 gives a prime for every n from 0 to 39. What does that establish?',
    choices: [
      { text: 'Only that the pattern is worth investigating — it fails at n = 40', isCorrect: true },
      { text: 'That the formula always gives a prime; forty cases is convincing', isCorrect: false, misconceptionId: `${IND}:MC-1` },
      { text: 'That it is proved for all n by induction', isCorrect: false, misconceptionId: `${IND}:MC-2` },
    ],
    targetedMisconceptions: [`${IND}:MC-1`],
    source: eb(IND, 'Misconception register — a pattern that holds forty times and then stops'),
  },
  {
    conceptId: IND, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is mathematical induction a form of inductive reasoning?',
    choices: [
      { text: 'No — despite the name it is deductive and gives certainty, proving a base case and that each case forces the next', isCorrect: true },
      { text: 'Yes — both generalise from cases, so both are inductive', isCorrect: false, misconceptionId: `${IND}:MC-2` },
      { text: 'Yes — it checks cases one after another until the pattern is safe', isCorrect: false, misconceptionId: `${IND}:MC-2` },
    ],
    targetedMisconceptions: [`${IND}:MC-2`],
    source: eb(IND, 'Transfer probe — the name collision'),
  },
]
