/**
 * Mathematics foundations — serving content for concepts that had none.
 *
 * ── WHY THESE EIGHT ─────────────────────────────────────────────────────────
 * Measured 2026-08-19: 221 concepts on the 245-concept spine carry a full
 * Educational Brain entry and serve the learner NOTHING, because an EB entry
 * only reaches a lesson once it is transcribed into AssetIdentity. Among them
 * was `math.found.mathematical-thinking` — the ROOT of the subject, the concept
 * with zero prerequisites that a beginner starting mathematics meets first.
 *
 * These eight are chosen by what a beginner hits earliest: the root, then the
 * definitional and set-membership vocabulary every later concept is written in,
 * then the logic that proof rests on. Each carries one explanation and three
 * closed-choice probes, which is the asset contract — enough for a learner who
 * answers correctly to reach mastery without the model volunteering a question.
 *
 * ── HOW THEY ARE WRITTEN ────────────────────────────────────────────────────
 * The explanations teach rather than define: a concrete anchor first, the idea
 * named second, and a sentence saying why it will matter later. That ordering
 * is the house style set by the chemistry and physics seeds, and it is not
 * decoration — a definition-first opening is the single most-recorded teaching
 * failure in this project's own notes.
 *
 * Every distractor is an error a real student makes and carries the
 * misconceptionId naming it, so a wrong answer routes to repair rather than a
 * bare "no".
 *
 * Seeded as DRAFT. Nothing reaches a learner until a human promotes it through
 * `/api/admin/knowledge-assets`.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

// ─── math.found.mathematical-thinking — the root of the subject ──────────────
const MT = 'math.found.mathematical-thinking'
// ─── math.found.definition ───────────────────────────────────────────────────
const DEF = 'math.found.definition'
// ─── set vocabulary ──────────────────────────────────────────────────────────
const MEM = 'math.found.set-membership'
const EMPTY = 'math.found.empty-set'
const SUB = 'math.found.subset'
// ─── logic ───────────────────────────────────────────────────────────────────
const PROP = 'math.found.proposition'
const CONN = 'math.found.logical-connectives'
const TT = 'math.found.truth-table'

export const MATHEMATICS_FOUNDATION_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: MT, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'Look at 2, 4, 6, 8 and you probably already guessed 10. Nobody taught you that '
      + 'sequence — you SPOTTED something, guessed what came next, and would have checked '
      + 'your guess if the next number had been 11. That is mathematical thinking, and you '
      + 'were doing it before anyone called it that.\n\n'
      + 'It is a small set of moves: noticing a pattern, making a guess about it, testing '
      + 'the guess, finding an example that breaks it, and building a reason it must always '
      + 'hold. None of them is calculation. You can be fast at arithmetic and never make a '
      + 'single one of these moves, and you can make all of them about shapes, or words, or '
      + 'a game with no numbers in it at all.\n\n'
      + 'This matters more than any formula ahead of you. Every result you will meet was '
      + 'found by somebody making exactly these moves — and when you get stuck later, being '
      + 'stuck almost always means you have stopped making them and started hunting for a '
      + 'rule to apply instead.',
    targetedMisconceptions: [`${MT}:MC-thinking-is-calculating`],
    source: eb(MT, 'Identity + Mental models — thinking as moves, not as arithmetic speed'),
  },
  {
    conceptId: DEF, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'Ask ten people what a "chair" is and you get ten answers, all roughly right. Ask ten '
      + 'mathematicians what an even number is and you get one: a whole number that is '
      + 'exactly 2 times another whole number. Not "a number you can halve nicely", not '
      + '"one that ends in 0, 2, 4, 6 or 8" — those are things that happen to be TRUE of '
      + 'even numbers, not what being even MEANS.\n\n'
      + 'A mathematical definition is a decision, not a discovery. It draws a line and says '
      + 'exactly what falls inside it, so that two people arguing can always settle the '
      + 'argument by checking. That is why definitions are allowed to be strange: 1 is not '
      + 'prime because the definition says so, and the definition says so because keeping it '
      + 'out makes every later theorem simpler.\n\n'
      + 'When something later feels unfair or arbitrary, go back to the definition. Nine '
      + 'times out of ten the confusion is that you are using the everyday meaning of a word '
      + 'while the mathematics is using its own.',
    targetedMisconceptions: [`${DEF}:MC-definition-as-description`],
    source: eb(DEF, 'Identity + Misconception register — definition as stipulation, not description'),
  },
  {
    conceptId: MEM, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'Think of a set as a box with a label on it, and membership as the single question '
      + '"is this thing in that box?" The answer is always yes or no — never "sort of", '
      + 'never "twice".\n\n'
      + 'We write it 3 ∈ A, read "3 is in A" or "3 is an element of A". If it is not in '
      + 'there we write 3 ∉ A. That is the whole idea, and it is deliberately small: '
      + 'membership does not care what order things were put in, and it does not care how '
      + 'many times you mention them. The set {a, b, a} is just the box containing a and b.\n\n'
      + 'Almost everything later is built on this one question. "Is this number a solution?" '
      + '"Is this shape a rectangle?" "Is this function continuous?" — all of them are '
      + 'asking whether something belongs to a set, and all of them get a yes or a no.',
    targetedMisconceptions: [`${MEM}:MC-membership-degrees`],
    source: eb(MEM, 'Identity + Mental models — membership as a yes/no question about a box'),
  },
  {
    conceptId: EMPTY, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'An empty shopping bag is still a bag. That is the whole idea behind the empty set, '
      + 'written ∅ — the set with no elements in it at all.\n\n'
      + 'It feels like nothing, so people expect it to behave like nothing, and it does not. '
      + 'There is exactly ONE empty set, not one per subject: the set of even prime numbers '
      + 'bigger than 2 and the set of square circles are the same set, because a set is '
      + 'decided entirely by what is in it, and neither has anything in it.\n\n'
      + 'The trap worth naming now: ∅ and {∅} are different. The first is the empty bag. The '
      + 'second is a bag with an empty bag inside it — it has one element, so it is not '
      + 'empty. If that distinction feels like a word game, it is the same distinction as an '
      + 'empty box versus a box containing an empty box, and you would not confuse those '
      + 'when moving house.',
    targetedMisconceptions: [`${EMPTY}:MC-empty-is-nothing`],
    source: eb(EMPTY, 'Identity + Misconception register — ∅ vs {∅}, uniqueness of the empty set'),
  },
  {
    conceptId: SUB, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'A ⊆ B means every single thing in A is also in B. Nothing more. The people in your '
      + 'class are a subset of the people in your school: pick any one of them, and they are '
      + 'in the school too.\n\n'
      + 'Two consequences surprise people, and both follow from reading the definition '
      + 'literally. First, every set is a subset of itself — pick anything in A, and yes, it '
      + 'is in A. Second, the empty set is a subset of everything: to fail, it would need an '
      + 'element that is missing from B, and it has no elements to offer.\n\n'
      + 'Keep this separate from membership. Your class is a subset of your school; your '
      + 'class is not a member of your school, because the school\'s members are people, not '
      + 'classes. Confusing ⊆ with ∈ is the most common early set-theory error, and it comes '
      + 'from the English word "in" doing both jobs.',
    targetedMisconceptions: [`${SUB}:MC-subset-vs-membership`],
    source: eb(SUB, 'Identity + Misconception register — ⊆ vs ∈, the two senses of "in"'),
  },
  {
    conceptId: PROP, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      '"Paris is the capital of France" is either true or false — true, as it happens. '
      + '"Close the door" is neither. Neither is "Wow!" or "What time is it?" A proposition '
      + 'is a statement that has a definite truth value, and logic only works on those.\n\n'
      + 'The test is not whether YOU know the answer. "There are infinitely many twin primes" '
      + 'is a proposition even though nobody currently knows which way it goes — it is '
      + 'definitely one or the other. What disqualifies a sentence is having no truth value '
      + 'to have: commands, questions, exclamations, and opinions that depend on who is '
      + 'asking.\n\n'
      + 'This is the ground floor of everything that follows. Connectives combine '
      + 'propositions, truth tables tabulate them, and a proof is a chain of them — so a '
      + 'sentence that is not a proposition cannot enter the machinery at all.',
    targetedMisconceptions: [`${PROP}:MC-unknown-means-not-proposition`],
    source: eb(PROP, 'Identity + Misconception register — truth value exists vs is known'),
  },
  {
    conceptId: CONN, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'Connectives are the words that glue propositions together: AND, OR, NOT, and IF…THEN. '
      + 'Each one has a fixed meaning that does not always match ordinary speech, and the '
      + 'mismatches are where marks are lost.\n\n'
      + 'AND is strict — "it is raining AND it is cold" needs both. NOT flips. But OR is '
      + 'INCLUSIVE: "tea or coffee" in mathematics allows both, unlike a waiter asking the '
      + 'same question. And IF…THEN makes a promise that is only broken in one situation — '
      + 'when the first part holds and the second fails. "If it rains, I will take an '
      + 'umbrella" is not broken on a dry day, whatever you carry.\n\n'
      + 'Learn these as rules rather than as intuitions, because your intuition was trained '
      + 'on English. Once they are fixed, a truth table can settle any argument built from '
      + 'them mechanically — which is exactly the point of pinning them down.',
    targetedMisconceptions: [`${CONN}:MC-exclusive-or`],
    source: eb(CONN, 'Identity + Misconception register — inclusive OR, the conditional promise'),
  },
  {
    conceptId: TT, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A truth table is brute force, and that is its virtue. Instead of arguing about whether '
      + 'a compound statement holds, you list every possible combination of true and false '
      + 'for its parts and read off the answer.\n\n'
      + 'One proposition has 2 rows. Two have 4. Three have 8 — the count doubles with each '
      + 'new letter, because each one can independently be true or false. Fill the rows '
      + 'systematically rather than at random and you cannot miss a case, which is the whole '
      + 'reason to build one.\n\n'
      + 'What makes it powerful is that it settles questions no amount of staring will. Is '
      + '"P AND NOT P" ever true? Build the table: both rows come out false, so it is a '
      + 'contradiction, permanently. Does "P OR NOT P" ever fail? Every row is true — a '
      + 'tautology. Neither answer depends on what P actually says, which is why logic can '
      + 'be done on the shape of a statement alone.',
    targetedMisconceptions: [`${TT}:MC-row-count`],
    source: eb(TT, 'Identity + Mental models — exhaustive enumeration, 2^n rows'),
  },
]

export const MATHEMATICS_FOUNDATION_PROBES: SeedProbe[] = [
  // ── math.found.mathematical-thinking ──────────────────────────────────────
  {
    conceptId: MT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Which of these is an act of mathematical THINKING rather than calculation?',
    choices: [
      { text: 'Noticing that every square number seems to be a sum of consecutive odd numbers, and wondering whether that always holds', isCorrect: true },
      { text: 'Working out 47 × 63 quickly in your head', isCorrect: false, misconceptionId: `${MT}:MC-thinking-is-calculating` },
      { text: 'Remembering that the area of a circle is πr²', isCorrect: false, misconceptionId: `${MT}:MC-thinking-is-recall` },
    ],
    targetedMisconceptions: [`${MT}:MC-thinking-is-calculating`],
    source: eb(MT, 'Assessment gate — separating a thinking move from speed and recall'),
  },
  {
    conceptId: MT, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A student checks a rule for n = 1, 2, 3, 4 and 5, finds it works every time, and says it is proved. What move are they missing?',
    choices: [
      { text: 'An argument covering every case — examples can support a guess but never settle it for all numbers', isCorrect: true },
      { text: 'Nothing — five checks with no failures is enough', isCorrect: false, misconceptionId: `${MT}:MC-examples-as-proof` },
      { text: 'They should check faster', isCorrect: false, misconceptionId: `${MT}:MC-thinking-is-calculating` },
    ],
    targetedMisconceptions: [`${MT}:MC-examples-as-proof`],
    source: eb(MT, 'Assessment gate — the gap between testing a conjecture and proving it'),
  },
  {
    conceptId: MT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'You guess "every number ending in 3 is prime", then find 33 = 3 × 11. What have you just produced?',
    choices: [
      { text: 'A counterexample — a single case that settles the guess as false', isCorrect: true },
      { text: 'Bad luck; the guess still holds for most numbers', isCorrect: false, misconceptionId: `${MT}:MC-mostly-true` },
      { text: 'A proof that the guess is true', isCorrect: false, misconceptionId: `${MT}:MC-examples-as-proof` },
    ],
    targetedMisconceptions: [`${MT}:MC-mostly-true`],
    source: eb(MT, 'Assessment gate — one counterexample is decisive, unlike one example'),
  },

  // ── math.found.definition ─────────────────────────────────────────────────
  {
    conceptId: DEF, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Which statement is the DEFINITION of an even number?',
    choices: [
      { text: 'A whole number that equals 2 times some whole number', isCorrect: true },
      { text: 'A number ending in 0, 2, 4, 6 or 8', isCorrect: false, misconceptionId: `${DEF}:MC-definition-as-description` },
      { text: 'A number you can halve without a remainder', isCorrect: false, misconceptionId: `${DEF}:MC-definition-as-description` },
    ],
    targetedMisconceptions: [`${DEF}:MC-definition-as-description`],
    source: eb(DEF, 'Assessment gate — the definition vs true consequences of it'),
  },
  {
    conceptId: DEF, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Why is 1 not counted as a prime number?',
    choices: [
      { text: 'Because the definition requires exactly two distinct divisors, and 1 has only one', isCorrect: true },
      { text: 'Because mathematicians have not decided yet', isCorrect: false, misconceptionId: `${DEF}:MC-definition-undecided` },
      { text: 'Because 1 is too small to count', isCorrect: false, misconceptionId: `${DEF}:MC-definition-as-description` },
    ],
    targetedMisconceptions: [`${DEF}:MC-definition-undecided`],
    source: eb(DEF, 'Assessment gate — a definition is a decision, and it settles the case'),
  },
  {
    conceptId: DEF, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A definition says a "widget" is any whole number divisible by 6. Is 9 a widget?',
    choices: [
      { text: 'No — check it against the definition: 9 is not divisible by 6, so it is out', isCorrect: true },
      { text: 'Yes, because 9 is divisible by 3 and 3 divides 6', isCorrect: false, misconceptionId: `${DEF}:MC-loose-matching` },
      { text: 'It depends what widgets are usually used for', isCorrect: false, misconceptionId: `${DEF}:MC-definition-as-description` },
    ],
    targetedMisconceptions: [`${DEF}:MC-loose-matching`],
    source: eb(DEF, 'Assessment gate — applying a definition literally to an unfamiliar term'),
  },

  // ── math.found.set-membership ─────────────────────────────────────────────
  {
    conceptId: MEM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Let A = {2, 4, 6}. Which is true?',
    choices: [
      { text: '4 ∈ A', isCorrect: true },
      { text: '5 ∈ A', isCorrect: false, misconceptionId: `${MEM}:MC-guessing-membership` },
      { text: '4 ∉ A', isCorrect: false, misconceptionId: `${MEM}:MC-symbol-direction` },
    ],
    targetedMisconceptions: [`${MEM}:MC-symbol-direction`],
    source: eb(MEM, 'Assessment gate — reading ∈ and ∉'),
  },
  {
    conceptId: MEM, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'How many elements does the set {7, 3, 7, 3, 7} have?',
    choices: [
      { text: 'Two — a set records only WHICH things are in it, not how many times they are listed', isCorrect: true },
      { text: 'Five', isCorrect: false, misconceptionId: `${MEM}:MC-membership-degrees` },
      { text: 'Three', isCorrect: false, misconceptionId: `${MEM}:MC-membership-degrees` },
    ],
    targetedMisconceptions: [`${MEM}:MC-membership-degrees`],
    source: eb(MEM, 'Assessment gate — repetition does not multiply membership'),
  },
  {
    conceptId: MEM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Let B = {1, {2, 3}}. Is 2 an element of B?',
    choices: [
      { text: 'No — B has two elements: the number 1 and the SET {2, 3}. The number 2 sits inside that set, not inside B', isCorrect: true },
      { text: 'Yes, because 2 appears somewhere inside B', isCorrect: false, misconceptionId: `${MEM}:MC-nested-membership` },
    ],
    targetedMisconceptions: [`${MEM}:MC-nested-membership`],
    source: eb(MEM, 'Assessment gate — membership is not transitive through a nested set'),
  },

  // ── math.found.empty-set ──────────────────────────────────────────────────
  {
    conceptId: EMPTY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'How many elements does ∅ have?',
    choices: [
      { text: 'Zero', isCorrect: true },
      { text: 'One — the empty set itself', isCorrect: false, misconceptionId: `${EMPTY}:MC-empty-vs-singleton` },
    ],
    targetedMisconceptions: [`${EMPTY}:MC-empty-vs-singleton`],
    source: eb(EMPTY, 'Assessment gate — the cardinality of the empty set'),
  },
  {
    conceptId: EMPTY, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Are ∅ and {∅} the same thing?',
    choices: [
      { text: 'No — ∅ is an empty box; {∅} is a box containing an empty box, so it has one element', isCorrect: true },
      { text: 'Yes — both are empty', isCorrect: false, misconceptionId: `${EMPTY}:MC-empty-vs-singleton` },
    ],
    targetedMisconceptions: [`${EMPTY}:MC-empty-vs-singleton`],
    source: eb(EMPTY, 'Assessment gate — the ∅ vs {∅} distinction'),
  },
  {
    conceptId: EMPTY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'The set of even primes greater than 2 is empty. So is the set of square circles. How do these two sets compare?',
    choices: [
      { text: 'They are the same set — a set is decided entirely by its elements, and neither has any', isCorrect: true },
      { text: 'They are different, because they are described differently', isCorrect: false, misconceptionId: `${EMPTY}:MC-many-empty-sets` },
    ],
    targetedMisconceptions: [`${EMPTY}:MC-many-empty-sets`],
    source: eb(EMPTY, 'Assessment gate — uniqueness of the empty set'),
  },

  // ── math.found.subset ─────────────────────────────────────────────────────
  {
    conceptId: SUB, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Let A = {1, 2} and B = {1, 2, 3}. Which is true?',
    choices: [
      { text: 'A ⊆ B — everything in A is also in B', isCorrect: true },
      { text: 'B ⊆ A', isCorrect: false, misconceptionId: `${SUB}:MC-direction-reversed` },
    ],
    targetedMisconceptions: [`${SUB}:MC-direction-reversed`],
    source: eb(SUB, 'Assessment gate — the direction of ⊆'),
  },
  {
    conceptId: SUB, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is every set a subset of itself?',
    choices: [
      { text: 'Yes — pick anything in A and it is certainly in A, which is all ⊆ asks', isCorrect: true },
      { text: 'No — a subset must be smaller', isCorrect: false, misconceptionId: `${SUB}:MC-subset-must-be-smaller` },
    ],
    targetedMisconceptions: [`${SUB}:MC-subset-must-be-smaller`],
    source: eb(SUB, 'Assessment gate — reading ⊆ literally rather than as "part of"'),
  },
  {
    conceptId: SUB, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Let C = {1, 2}. Which is true: {1} ⊆ C, or {1} ∈ C?',
    choices: [
      { text: '{1} ⊆ C — the set {1} is a subset of C, but C\'s elements are 1 and 2, not {1}', isCorrect: true },
      { text: '{1} ∈ C', isCorrect: false, misconceptionId: `${SUB}:MC-subset-vs-membership` },
      { text: 'Both', isCorrect: false, misconceptionId: `${SUB}:MC-subset-vs-membership` },
    ],
    targetedMisconceptions: [`${SUB}:MC-subset-vs-membership`],
    source: eb(SUB, 'Assessment gate — ⊆ vs ∈, the most common early set-theory error'),
  },

  // ── math.found.proposition ────────────────────────────────────────────────
  {
    conceptId: PROP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Which of these is a proposition?',
    choices: [
      { text: 'The square root of 16 is 4', isCorrect: true },
      { text: 'Please simplify this fraction', isCorrect: false, misconceptionId: `${PROP}:MC-command-as-proposition` },
      { text: 'What is the value of x?', isCorrect: false, misconceptionId: `${PROP}:MC-question-as-proposition` },
    ],
    targetedMisconceptions: [`${PROP}:MC-command-as-proposition`],
    source: eb(PROP, 'Assessment gate — commands and questions carry no truth value'),
  },
  {
    conceptId: PROP, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Nobody currently knows whether there are infinitely many twin primes. Is "there are infinitely many twin primes" a proposition?',
    choices: [
      { text: 'Yes — it is definitely true or definitely false; we simply do not know which yet', isCorrect: true },
      { text: 'No — a proposition must have a known truth value', isCorrect: false, misconceptionId: `${PROP}:MC-unknown-means-not-proposition` },
    ],
    targetedMisconceptions: [`${PROP}:MC-unknown-means-not-proposition`],
    source: eb(PROP, 'Assessment gate — having a truth value vs knowing it'),
  },
  {
    conceptId: PROP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is "x + 1 = 5" a proposition as it stands?',
    choices: [
      { text: 'Not until x is fixed — its truth changes with x, so on its own it has no single truth value', isCorrect: true },
      { text: 'Yes, and it is true', isCorrect: false, misconceptionId: `${PROP}:MC-open-sentence` },
      { text: 'Yes, and it is false', isCorrect: false, misconceptionId: `${PROP}:MC-open-sentence` },
    ],
    targetedMisconceptions: [`${PROP}:MC-open-sentence`],
    source: eb(PROP, 'Assessment gate — an open sentence is not yet a proposition'),
  },

  // ── math.found.logical-connectives ────────────────────────────────────────
  {
    conceptId: CONN, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'P is true and Q is false. What is the truth value of "P AND Q"?',
    choices: [
      { text: 'False — AND needs both parts to be true', isCorrect: true },
      { text: 'True — one part is true', isCorrect: false, misconceptionId: `${CONN}:MC-and-as-or` },
    ],
    targetedMisconceptions: [`${CONN}:MC-and-as-or`],
    source: eb(CONN, 'Assessment gate — conjunction is strict'),
  },
  {
    conceptId: CONN, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'P is true and Q is true. What is the truth value of "P OR Q"?',
    choices: [
      { text: 'True — mathematical OR is inclusive, so both being true is fine', isCorrect: true },
      { text: 'False — OR means one or the other, not both', isCorrect: false, misconceptionId: `${CONN}:MC-exclusive-or` },
    ],
    targetedMisconceptions: [`${CONN}:MC-exclusive-or`],
    source: eb(CONN, 'Assessment gate — inclusive OR, against the everyday reading'),
  },
  {
    conceptId: CONN, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: '"If it rains, I will take an umbrella." It does not rain, and I take one anyway. Was the statement broken?',
    choices: [
      { text: 'No — the promise only fails if it rains AND I have no umbrella', isCorrect: true },
      { text: 'Yes — I took an umbrella without rain', isCorrect: false, misconceptionId: `${CONN}:MC-conditional-as-biconditional` },
    ],
    targetedMisconceptions: [`${CONN}:MC-conditional-as-biconditional`],
    source: eb(CONN, 'Assessment gate — the single case that falsifies a conditional'),
  },

  // ── math.found.truth-table ────────────────────────────────────────────────
  {
    conceptId: TT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'How many rows does a truth table need for a statement built from two propositions, P and Q?',
    choices: [
      { text: 'Four', isCorrect: true },
      { text: 'Two', isCorrect: false, misconceptionId: `${TT}:MC-row-count` },
      { text: 'Three', isCorrect: false, misconceptionId: `${TT}:MC-row-count` },
    ],
    targetedMisconceptions: [`${TT}:MC-row-count`],
    source: eb(TT, 'Assessment gate — 2^n rows, one per combination'),
  },
  {
    conceptId: TT, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Every row of a statement\'s truth table comes out TRUE. What is the statement?',
    choices: [
      { text: 'A tautology — true no matter what its parts are', isCorrect: true },
      { text: 'A contradiction', isCorrect: false, misconceptionId: `${TT}:MC-tautology-contradiction-swap` },
      { text: 'Impossible — some row must be false', isCorrect: false, misconceptionId: `${TT}:MC-must-vary` },
    ],
    targetedMisconceptions: [`${TT}:MC-tautology-contradiction-swap`],
    source: eb(TT, 'Assessment gate — reading a table\'s final column'),
  },
  {
    conceptId: TT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'You build the table for "P AND NOT P". What do you find?',
    choices: [
      { text: 'Every row is false — it is a contradiction, whatever P says', isCorrect: true },
      { text: 'It is true when P is true', isCorrect: false, misconceptionId: `${TT}:MC-ignores-negation` },
      { text: 'It depends what P stands for', isCorrect: false, misconceptionId: `${TT}:MC-content-dependent` },
    ],
    targetedMisconceptions: [`${TT}:MC-content-dependent`],
    source: eb(TT, 'Assessment gate — logic works on the shape of a statement, not its content'),
  },
]
