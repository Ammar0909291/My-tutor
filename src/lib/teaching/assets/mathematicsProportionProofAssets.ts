/**
 * Sixth batch — proportional reasoning, and the words results are filed under.
 *
 * Two clusters that both suffer from the same thing: learners meeting the WORD
 * long before they meet a reason to care about it.
 *
 *   PROPORTION   ratio, rate and scaling. The place where "cross-multiply"
 *                arrives as a spell rather than a consequence.
 *   RESULTS      theorem, lemma, corollary, conjecture. Four words that sound
 *                like a difficulty ranking and are not — they describe a
 *                statement's ROLE, and one of them is not proved at all.
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

const PROP = 'math.arith.proportion'
const RATE = 'math.arith.unit-rate'
const MENMUL = 'math.arith.mental-multiplication'
const BASE = 'math.arith.number-base'
const THM = 'math.found.theorem'
const LEM = 'math.found.lemma'
const COR = 'math.found.corollary'
const CONJ = 'math.found.conjecture'

export const MATHEMATICS_PROPORTION_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: PROP, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'A proportion says two ratios are equal. If 2 pens cost £3, then 4 pens cost £6 — the '
      + 'ratio of pens to pounds has not changed, only the size of the order.\n\n'
      + 'Written as 2/3 = 4/6, the useful move is to notice what stayed constant. Doubling '
      + 'both sides kept the relationship intact, which is exactly what "in proportion" '
      + 'means: scale one part and the other scales to match.\n\n'
      + 'Cross-multiplication is not a separate spell. From 2/3 = 4/6, multiplying both '
      + 'sides by 3 and by 6 clears the fractions and leaves 2 × 6 = 3 × 4. It is one legal '
      + 'step done twice — which is why it works, and why it can be trusted when the numbers '
      + 'are not friendly enough to spot by eye.',
    targetedMisconceptions: [`${PROP}:MC-cross-multiply-as-magic`],
    source: eb(PROP, 'Identity — equal ratios, and cross-multiplication as a consequence'),
  },
  {
    conceptId: RATE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'A unit rate answers "how much for ONE?" — 3 apples for £1.50 is 50p per apple; 120 '
      + 'miles in 2 hours is 60 miles per hour.\n\n'
      + 'Reducing to one is what makes comparison possible. A 400g jar at £2.00 and a 600g '
      + 'jar at £2.70 cannot be compared as they stand, but 0.5p per gram against 0.45p per '
      + 'gram can. That is the whole reason supermarkets are required to print it.\n\n'
      + 'The word "per" is the instruction: it means divide, and it tells you which way '
      + 'round. Miles per hour is miles ÷ hours. Get that backwards and you have hours per '
      + 'mile — a perfectly real quantity, and not the one you were asked for.',
    targetedMisconceptions: [`${RATE}:MC-rate-inverted`],
    source: eb(RATE, 'Identity + Misconception register — "per" names the divisor'),
  },
  {
    conceptId: MENMUL, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'To multiply 6 × 23 in your head, break the 23 apart: 6 × 20 is 120, 6 × 3 is 18, and '
      + '120 + 18 is 138. You are allowed to split one factor because multiplying is '
      + 'distributive — 6 lots of 23 really is 6 lots of 20 plus 6 lots of 3.\n\n'
      + 'A second move is doubling and halving: 5 × 18 is awkward, but halve the 18 and '
      + 'double the 5, and it becomes 10 × 9 = 90. The product survives because you divided '
      + 'by two and multiplied by two.\n\n'
      + 'And multiplying by 5 is often easiest as multiplying by 10 and halving: 5 × 46 is '
      + '460 ÷ 2 = 230. None of these is a trick. Each is a property of multiplication being '
      + 'used deliberately, and knowing which property you are leaning on is what stops the '
      + 'method collapsing under pressure.',
    targetedMisconceptions: [`${MENMUL}:MC-split-both-factors`],
    source: eb(MENMUL, 'Identity — distributivity and compensating pairs as named strategies'),
  },
  {
    conceptId: BASE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'We write numbers in base ten because we have ten fingers, not because ten is special. '
      + 'The base is simply how many symbols you use before you need a new column.\n\n'
      + 'In base ten the places are 1, 10, 100 — powers of ten. In base two they are 1, 2, 4, '
      + '8, and the only digits are 0 and 1, so 1011 in base two means 8 + 0 + 2 + 1 = 11. '
      + 'The NUMBER eleven has not changed; only its costume has.\n\n'
      + 'Nothing about arithmetic depends on the choice. Carrying still means the column is '
      + 'full — it just fills at two instead of at ten. Meeting a second base is the moment '
      + 'place value stops being a rule about our digits and becomes a general idea about '
      + 'positions, which is why computers can get by on two symbols.',
    targetedMisconceptions: [`${BASE}:MC-base-changes-the-number`],
    source: eb(BASE, 'Identity + Misconception register — the base is notation, not quantity'),
  },
  {
    conceptId: THM, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'Of the four words used to file mathematical results, exactly one means PROVED, and '
      + 'this is it. A theorem is a proved statement — that is the whole of the definition, '
      + 'and it is what separates mathematics from every other subject: once proved, a '
      + 'theorem does not later turn out to be wrong when better evidence arrives.\n\n'
      + 'Proved means derived, by valid steps, from axioms and from results already '
      + 'established. So every theorem carries an invisible "if" — Pythagoras holds in the '
      + 'geometry Euclid\'s axioms describe, and fails on a sphere, where no axiom was '
      + 'broken but a different one was chosen.\n\n'
      + 'The word carries no measure of importance or difficulty. Some theorems are one line '
      + 'and some took three hundred years; both are theorems. What they share is that '
      + 'somebody closed the argument.',
    targetedMisconceptions: [`${THM}:MC-theorem-is-important-fact`],
    source: eb(THM, 'Identity + Misconception register — proved, and the assumptions it rests on'),
  },
  {
    conceptId: LEM, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A lemma is a proved result whose job is to help prove something else. It is a stepping '
      + 'stone, and the name describes its role in an argument, not its quality.\n\n'
      + 'Long proofs get unreadable when everything happens at once, so a writer pulls a '
      + 'self-contained piece out, proves it separately, and then uses it. Reading becomes '
      + 'possible again, and the piece can be reused elsewhere.\n\n'
      + 'The role is not permanent. Some lemmas turn out to matter far more than the theorem '
      + 'they were invented for — Zorn\'s Lemma is used constantly across mathematics, and '
      + 'nobody renamed it. Whether something is called a lemma or a theorem is a decision '
      + 'about how the argument is organised, and occasionally just about history.',
    targetedMisconceptions: [`${LEM}:MC-lemma-is-lesser`],
    source: eb(LEM, 'Identity — role in an argument, not rank'),
  },
  {
    conceptId: COR, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'Prove that the angles of any triangle sum to 180°, and something else arrives almost '
      + 'free: a right-angled triangle\'s other two angles must sum to 90°. No new machinery '
      + 'was needed — you substitute and read the answer off.\n\n'
      + 'That second statement is a corollary: a result that follows quickly from a theorem '
      + 'just proved. The heavy lifting is already done, and the corollary collects what '
      + 'falls out.\n\n'
      + 'So lemma, theorem and corollary describe WHERE a statement sits relative to an '
      + 'argument: before it, at its centre, or just after. A corollary is still fully '
      + 'proved, and being easy to reach says nothing about how useful it is — a great many '
      + 'of the results people actually apply are corollaries.',
    targetedMisconceptions: [`${COR}:MC-corollary-unproved`],
    source: eb(COR, 'Identity — an immediate consequence, still fully proved'),
  },
  {
    conceptId: CONJ, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A conjecture is a statement believed true and NOT proved. It is the odd one out among '
      + 'these words, and the difference is not a matter of degree.\n\n'
      + 'Goldbach\'s conjecture — every even number above 2 is a sum of two primes — has been '
      + 'checked past 4 × 10^18 without a single failure. It is still a conjecture, and no '
      + 'amount of further checking will change that, because no finite amount of checking '
      + 'can settle a claim about infinitely many numbers.\n\n'
      + 'Conjectures are not second-rate mathematics; they are where the subject is alive. '
      + 'A good one directs decades of work, and it ends in one of two ways: someone finds a '
      + 'proof and it becomes a theorem, or someone finds a single counterexample and it '
      + 'becomes false. Fermat\'s Last Theorem spent 358 years as the first kind of '
      + 'uncertainty before Wiles closed it.',
    targetedMisconceptions: [`${CONJ}:MC-evidence-is-proof`],
    source: eb(CONJ, 'Identity + Misconception register — unproved, however much evidence there is'),
  },
]

export const MATHEMATICS_PROPORTION_PROBES: SeedProbe[] = [
  // --- math.arith.proportion -------------------------------------------------
  {
    conceptId: PROP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'If 3 notebooks cost £4.50, what do 6 notebooks cost at the same rate?',
    choices: [
      { text: '£9.00 — twice as many notebooks, twice the cost', isCorrect: true },
      { text: '£7.50 — add £3 for the three extra notebooks', isCorrect: false },
      { text: '£4.50 — the rate has not changed', isCorrect: false },
    ],
    targetedMisconceptions: [`${PROP}:MC-cross-multiply-as-magic`],
    source: eb(PROP, 'Assessment gate — scaling both sides keeps the ratio'),
  },
  {
    conceptId: PROP, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'From 2/3 = 8/x you get 2x = 24. WHY is cross-multiplying allowed here?',
    choices: [
      { text: 'Multiplying both sides of a true equation by 3 and by x is legal, and doing both clears the fractions', isCorrect: true },
      { text: 'It is a special rule for fractions that only works when the two sides are equal', isCorrect: false, misconceptionId: `${PROP}:MC-cross-multiply-as-magic` },
      { text: 'Because the numbers always cross diagonally in a proportion', isCorrect: false, misconceptionId: `${PROP}:MC-cross-multiply-as-magic` },
    ],
    targetedMisconceptions: [`${PROP}:MC-cross-multiply-as-magic`],
    source: eb(PROP, 'Misconception register — cross-multiplication as a consequence, not a spell'),
  },
  {
    conceptId: PROP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A map uses 2 cm to represent 5 km. A road measures 7 cm on the map. How long is it?',
    choices: [
      { text: '17.5 km — 2/5 = 7/x gives 2x = 35', isCorrect: true },
      { text: '10 km — 7 cm is about 5 cm more, so add 5 km', isCorrect: false },
      { text: '2.8 km — divide 7 by 2.5', isCorrect: false, misconceptionId: `${PROP}:MC-cross-multiply-as-magic` },
    ],
    targetedMisconceptions: [`${PROP}:MC-cross-multiply-as-magic`],
    source: eb(PROP, 'Transfer probe — proportion applied to scale'),
  },

  // --- math.arith.unit-rate -------------------------------------------------
  {
    conceptId: RATE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'A car travels 150 miles in 3 hours. What is its speed in miles per hour?',
    choices: [
      { text: '50 mph — 150 ÷ 3', isCorrect: true },
      { text: '0.02 mph — 3 ÷ 150', isCorrect: false, misconceptionId: `${RATE}:MC-rate-inverted` },
      { text: '450 mph — 150 × 3', isCorrect: false },
    ],
    targetedMisconceptions: [`${RATE}:MC-rate-inverted`],
    source: eb(RATE, 'Assessment gate — "per" names the divisor'),
  },
  {
    conceptId: RATE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A printer produces 240 pages in 8 minutes. Which quantity is "minutes per page"?',
    choices: [
      { text: '8 ÷ 240 = 1/30 of a minute — minutes on top, because "per page" means divide by pages', isCorrect: true },
      { text: '240 ÷ 8 = 30 — that is the bigger, more useful number', isCorrect: false, misconceptionId: `${RATE}:MC-rate-inverted` },
      { text: 'Either one; "per" does not fix which way round the division goes', isCorrect: false, misconceptionId: `${RATE}:MC-rate-inverted` },
    ],
    targetedMisconceptions: [`${RATE}:MC-rate-inverted`],
    source: eb(RATE, 'Misconception register — the inverted rate is also a real quantity'),
  },
  {
    conceptId: RATE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Jar A: 400 g for £2.00. Jar B: 600 g for £2.70. Which is better value, and why?',
    choices: [
      { text: 'B — 0.45p per gram against A\'s 0.50p per gram', isCorrect: true },
      { text: 'A — it costs less in total', isCorrect: false },
      { text: 'Neither; different sizes cannot be compared', isCorrect: false, misconceptionId: `${RATE}:MC-rate-inverted` },
    ],
    targetedMisconceptions: [`${RATE}:MC-rate-inverted`],
    source: eb(RATE, 'Transfer probe — reducing to one makes comparison possible'),
  },

  // --- math.arith.mental-multiplication --------------------------------------
  {
    conceptId: MENMUL, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Work out 7 × 24 mentally by splitting the 24.',
    choices: [
      { text: '168 — 7 × 20 = 140, 7 × 4 = 28, and 140 + 28 = 168', isCorrect: true },
      { text: '148 — 7 × 20 = 140, then add the 4 twos... 8', isCorrect: false },
      { text: '84 — 7 × 2 = 14 and 7 × 4 = 28, so 14 and 28 make 84', isCorrect: false, misconceptionId: `${MENMUL}:MC-split-both-factors` },
    ],
    targetedMisconceptions: [`${MENMUL}:MC-split-both-factors`],
    source: eb(MENMUL, 'Assessment gate — distributing over one factor'),
  },
  {
    conceptId: MENMUL, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A learner computes 12 × 14 as (10 × 10) + (2 × 4) = 108. What has gone wrong?',
    choices: [
      { text: 'Both factors were split at once, so the 10 × 4 and 2 × 10 pieces were never counted — the answer is 168', isCorrect: true },
      { text: 'Nothing; the method is right but the arithmetic slipped', isCorrect: false, misconceptionId: `${MENMUL}:MC-split-both-factors` },
      { text: 'The 12 should have been split into 6 and 6 instead', isCorrect: false, misconceptionId: `${MENMUL}:MC-split-both-factors` },
    ],
    targetedMisconceptions: [`${MENMUL}:MC-split-both-factors`],
    source: eb(MENMUL, 'Misconception register — splitting both factors drops two products'),
  },
  {
    conceptId: MENMUL, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Which single move makes 5 × 36 easiest, and what does it give?',
    choices: [
      { text: 'Multiply by 10 and halve: 360 ÷ 2 = 180', isCorrect: true },
      { text: 'Split both factors into 5 × 30 and 5 × 6 and multiply the results', isCorrect: false, misconceptionId: `${MENMUL}:MC-split-both-factors` },
      { text: 'Halve both numbers: 2.5 × 18 = 45', isCorrect: false },
    ],
    targetedMisconceptions: [`${MENMUL}:MC-split-both-factors`],
    source: eb(MENMUL, 'Transfer probe — choosing the property that fits the numbers'),
  },

  // --- math.arith.number-base ------------------------------------------------
  {
    conceptId: BASE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What number does 1101 represent in base two?',
    choices: [
      { text: '13 — that is 8 + 4 + 0 + 1', isCorrect: true },
      { text: '1101 — the digits are the number', isCorrect: false, misconceptionId: `${BASE}:MC-base-changes-the-number` },
      { text: '3 — count the ones', isCorrect: false },
    ],
    targetedMisconceptions: [`${BASE}:MC-base-changes-the-number`],
    source: eb(BASE, 'Assessment gate — reading positional value in another base'),
  },
  {
    conceptId: BASE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Eleven objects are written 11 in base ten and 1011 in base two. Are there more objects in base two?',
    choices: [
      { text: 'No — the quantity is identical; only the notation changed', isCorrect: true },
      { text: 'Yes — 1011 has four digits, so it is a larger number', isCorrect: false, misconceptionId: `${BASE}:MC-base-changes-the-number` },
      { text: 'Yes — base two counts differently, so the total is different', isCorrect: false, misconceptionId: `${BASE}:MC-base-changes-the-number` },
    ],
    targetedMisconceptions: [`${BASE}:MC-base-changes-the-number`],
    source: eb(BASE, 'Misconception register — the base is a costume, not a quantity'),
  },
  {
    conceptId: BASE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'In base two, what happens when you add 1 to 111?',
    choices: [
      { text: 'You get 1000 — each column is full at two, so the carry cascades', isCorrect: true },
      { text: 'You get 112 — the last column becomes 2', isCorrect: false, misconceptionId: `${BASE}:MC-base-changes-the-number` },
      { text: 'You get 118 — carrying still happens at ten', isCorrect: false },
    ],
    targetedMisconceptions: [`${BASE}:MC-base-changes-the-number`],
    source: eb(BASE, 'Transfer probe — carrying fills at the base, whatever it is'),
  },

  // --- math.found.theorem ----------------------------------------------------
  {
    conceptId: THM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What makes a statement a theorem?',
    choices: [
      { text: 'It has been proved', isCorrect: true },
      { text: 'It is one of the most important results in its field', isCorrect: false, misconceptionId: `${THM}:MC-theorem-is-important-fact` },
      { text: 'It has been tested on very many cases without failing', isCorrect: false },
    ],
    targetedMisconceptions: [`${THM}:MC-theorem-is-important-fact`],
    source: eb(THM, 'Assessment gate — proof is the criterion'),
  },
  {
    conceptId: THM, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A result is proved but almost nobody uses it. Is it a theorem?',
    choices: [
      { text: 'Yes — importance is a judgement about usefulness, not part of the definition', isCorrect: true },
      { text: 'No — a theorem has to be a major result', isCorrect: false, misconceptionId: `${THM}:MC-theorem-is-important-fact` },
      { text: 'Only if it is later cited by other proofs', isCorrect: false, misconceptionId: `${THM}:MC-theorem-is-important-fact` },
    ],
    targetedMisconceptions: [`${THM}:MC-theorem-is-important-fact`],
    source: eb(THM, 'Misconception register — "theorem" is a status, not a compliment'),
  },
  {
    conceptId: THM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Why can a proved theorem not be overturned by new evidence, the way a scientific claim can?',
    choices: [
      { text: 'Its truth follows from the stated assumptions by argument, so no observation can bear on it', isCorrect: true },
      { text: 'Because mathematicians check theorems more carefully than scientists check theories', isCorrect: false },
      { text: 'It can be — a counterexample would overturn it', isCorrect: false, misconceptionId: `${THM}:MC-theorem-is-important-fact` },
    ],
    targetedMisconceptions: [`${THM}:MC-theorem-is-important-fact`],
    source: eb(THM, 'Transfer probe — deductive status versus empirical support'),
  },

  // --- math.found.lemma ------------------------------------------------------
  {
    conceptId: LEM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What is a lemma?',
    choices: [
      { text: 'A proved result used as a step toward proving something else', isCorrect: true },
      { text: 'A result that is too weak to be called a theorem', isCorrect: false, misconceptionId: `${LEM}:MC-lemma-is-lesser` },
      { text: 'A statement assumed without proof so an argument can start', isCorrect: false },
    ],
    targetedMisconceptions: [`${LEM}:MC-lemma-is-lesser`],
    source: eb(LEM, 'Assessment gate — a lemma names a role, not a rank'),
  },
  {
    conceptId: LEM, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is a lemma held to a lower standard of proof than a theorem?',
    choices: [
      { text: 'No — it is proved exactly as rigorously; the word describes where it sits in the argument', isCorrect: true },
      { text: 'Yes — lemmas are minor, so a sketch is acceptable', isCorrect: false, misconceptionId: `${LEM}:MC-lemma-is-lesser` },
      { text: 'Yes — a lemma only has to hold in the case it is used for', isCorrect: false, misconceptionId: `${LEM}:MC-lemma-is-lesser` },
    ],
    targetedMisconceptions: [`${LEM}:MC-lemma-is-lesser`],
    source: eb(LEM, 'Misconception register — role, not a difficulty ranking'),
  },
  {
    conceptId: LEM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Why do mathematicians pull a step out of a long proof and label it a lemma?',
    choices: [
      { text: 'To isolate a reusable step so the main argument stays readable and the step can be cited elsewhere', isCorrect: true },
      { text: 'To mark the parts of the proof that are least certain', isCorrect: false, misconceptionId: `${LEM}:MC-lemma-is-lesser` },
      { text: 'To shorten the proof by leaving that step unproved', isCorrect: false },
    ],
    targetedMisconceptions: [`${LEM}:MC-lemma-is-lesser`],
    source: eb(LEM, 'Transfer probe — why the label exists at all'),
  },

  // --- math.found.corollary --------------------------------------------------
  {
    conceptId: COR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'A triangle\'s angles sum to 180°. It follows at once that a right-angled triangle\'s other two angles sum to 90°. What is that second statement?',
    choices: [
      { text: 'A corollary of the first', isCorrect: true },
      { text: 'A conjecture, since it has not been proved separately', isCorrect: false, misconceptionId: `${COR}:MC-corollary-unproved` },
      { text: 'An axiom, since it is obvious', isCorrect: false },
    ],
    targetedMisconceptions: [`${COR}:MC-corollary-unproved`],
    source: eb(COR, 'Assessment gate — an immediate consequence'),
  },
  {
    conceptId: COR, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A corollary was reached in two lines. Does that make it less firmly established?',
    choices: [
      { text: 'No — it is fully proved; the heavy lifting simply happened in the theorem it follows from', isCorrect: true },
      { text: 'Yes — a short argument leaves more room for error', isCorrect: false, misconceptionId: `${COR}:MC-corollary-unproved` },
      { text: 'Yes — a corollary is only expected to hold in typical cases', isCorrect: false, misconceptionId: `${COR}:MC-corollary-unproved` },
    ],
    targetedMisconceptions: [`${COR}:MC-corollary-unproved`],
    source: eb(COR, 'Misconception register — easy to reach is still proved'),
  },
  {
    conceptId: COR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Lemma, theorem, corollary — what do the three words actually distinguish?',
    choices: [
      { text: 'Where a proved statement sits relative to an argument: before it, at its centre, or just after', isCorrect: true },
      { text: 'How hard each was to prove, from easiest to hardest', isCorrect: false, misconceptionId: `${COR}:MC-corollary-unproved` },
      { text: 'How much evidence supports each one', isCorrect: false },
    ],
    targetedMisconceptions: [`${COR}:MC-corollary-unproved`],
    source: eb(COR, 'Transfer probe — the three words as positions in an argument'),
  },

  // --- math.found.conjecture -------------------------------------------------
  {
    conceptId: CONJ, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Which of these words describes a statement that is NOT proved?',
    choices: [
      { text: 'Conjecture', isCorrect: true },
      { text: 'Lemma', isCorrect: false },
      { text: 'Corollary', isCorrect: false, misconceptionId: `${COR}:MC-corollary-unproved` },
    ],
    targetedMisconceptions: [`${CONJ}:MC-evidence-is-proof`],
    source: eb(CONJ, 'Assessment gate — the odd one out among the four words'),
  },
  {
    conceptId: CONJ, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Goldbach\'s conjecture has been verified past 4 × 10^18 with no failures. Is it a theorem yet?',
    choices: [
      { text: 'No — no finite amount of checking can settle a claim about infinitely many numbers', isCorrect: true },
      { text: 'Yes — that much evidence amounts to a proof in practice', isCorrect: false, misconceptionId: `${CONJ}:MC-evidence-is-proof` },
      { text: 'Yes, for every number checked so far, which is what a theorem means', isCorrect: false, misconceptionId: `${CONJ}:MC-evidence-is-proof` },
    ],
    targetedMisconceptions: [`${CONJ}:MC-evidence-is-proof`],
    source: eb(CONJ, 'Misconception register — evidence is not proof'),
  },
  {
    conceptId: CONJ, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'In how many ways can a conjecture stop being a conjecture?',
    choices: [
      { text: 'Two — someone proves it and it becomes a theorem, or someone finds a counterexample and it is false', isCorrect: true },
      { text: 'One — enough verified cases eventually promote it', isCorrect: false, misconceptionId: `${CONJ}:MC-evidence-is-proof` },
      { text: 'None — a conjecture stays a conjecture permanently', isCorrect: false },
    ],
    targetedMisconceptions: [`${CONJ}:MC-evidence-is-proof`],
    source: eb(CONJ, 'Transfer probe — the two exits, and neither is accumulation'),
  },
]
