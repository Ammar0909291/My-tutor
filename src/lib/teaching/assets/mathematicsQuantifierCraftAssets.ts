/**
 * Fourteenth batch — saying something precise about many objects at once,
 * and the two skills of consuming and producing it.
 *
 * One arc, in strict dependency order, and one motive at the end:
 *
 *   HOLD       variable. A placeholder, not a label — the "3 apples" reading
 *              of 3a is the single most durable error in school algebra.
 *   CLAIM      predicate. A sentence with a hole in it; not yet true or false.
 *   BIND       quantifiers. What fills the hole and turns a predicate into a
 *              claim. "For all" is not "most"; "there exists" is not "one".
 *   COMBINE    predicate-logic. Where ORDER starts to matter — the one place
 *              in elementary logic where swapping two symbols changes a true
 *              statement into a false one.
 *   USE        set-builder-notation. The first place all four appear at once,
 *              and where an empty result stops looking like a failure.
 *   READ/WRITE reading-mathematics, writing-mathematics. The two halves of
 *              the same discipline, and they fail in opposite directions:
 *              readers skim, writers over-symbolise.
 *   WHY        abstraction. The reason to pay all of the above costs.
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

const VAR = 'math.found.variable'
const PRED = 'math.found.predicate'
const QUANT = 'math.found.quantifiers'
const PLOG = 'math.found.predicate-logic'
const SBN = 'math.found.set-builder-notation'
const READ = 'math.found.reading-mathematics'
const WRITE = 'math.found.writing-mathematics'
const ABS = 'math.found.abstraction'

export const MATHEMATICS_QUANTIFIER_CRAFT_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: VAR, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'A variable is a symbol holding a place where a NUMBER goes. In 3a, the a stands for '
      + 'some number and 3a means three times that number — it does not mean three apples, '
      + 'and the a is not short for "apples". That reading survives for years because the '
      + 'letters chosen are so often the first letter of a word, and it quietly makes 3a + 2b '
      + 'look combinable.\n\n'
      + 'Variables are not confined to equations. In the expression 3a there is nothing to '
      + 'solve; it is a recipe you can run on any input, giving 6 when a is 2 and 30 when a '
      + 'is 10. Only when a variable appears in an equation does the question "which value?" '
      + 'even arise.\n\n'
      + 'And a variable need not be pinned to one value. In "the area of a rectangle is lw", '
      + 'l and w range over every rectangle there is, which is exactly what makes that one '
      + 'short sentence a statement about infinitely many shapes. Letters used this way are '
      + 'what allow a claim to be made once instead of case by case.',
    targetedMisconceptions: [`${VAR}:MC-1`, `${VAR}:MC-3`],
    source: eb(VAR, 'Identity + Misconception register — a placeholder for a number, not a label'),
  },
  {
    conceptId: PRED, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A predicate is a sentence with a hole in it. "x > 5" is not true and not false, '
      + 'because until somebody says what x is there is nothing to judge — it becomes true at '
      + 'x = 7 and false at x = 2.\n\n'
      + 'That is the whole difference from a proposition. A proposition already has a truth '
      + 'value: "7 > 5" is true, full stop. A predicate is the machinery for producing '
      + 'propositions, and asking whether P(x) is true is a category error in the same way '
      + 'as asking whether a recipe is delicious.\n\n'
      + 'Predicates may have several holes, and most interesting ones do: "x + y = z" needs '
      + 'three values, "x is a divisor of y" needs two. And a predicate is not the same thing '
      + 'as a formula — "x is prime" has no algebra in it at all and is a perfectly good '
      + 'predicate. What makes something a predicate is the free variable, not the notation '
      + 'it happens to be written in.',
    targetedMisconceptions: [`${PRED}:MC-1`, `${PRED}:MC-2`],
    source: eb(PRED, 'Identity + Misconception register — a sentence with a hole; free variables, not algebra'),
  },
  {
    conceptId: QUANT, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'Quantifiers fill a predicate\'s hole with a claim about a whole domain. ∀ says "for '
      + 'all" and ∃ says "there exists at least one" — and both turn a predicate into '
      + 'something with a definite truth value.\n\n'
      + 'Neither word means what its everyday cousin means. ∀ is not "most" or "generally": '
      + '"∀n, n² > n" is FALSE, defeated by n = 1 alone, and one counterexample is enough '
      + 'because "for all" tolerates no exceptions. ∃ is not "exactly one": "∃x, x² = 4" is '
      + 'true, and it stays true although there are two such x, because "there exists" is a '
      + 'floor and never a count.\n\n'
      + 'Negation swaps them rather than distributing over them. The negation of "∀x P(x)" is '
      + '"∃x ¬P(x)" — to deny that everything works you need one thing that fails, not that '
      + 'everything fails. Likewise ¬∃x P(x) becomes ∀x ¬P(x). Pushing the ¬ inward while '
      + 'leaving the quantifier alone produces a statement that is usually far stronger than '
      + 'the one you meant to make.',
    targetedMisconceptions: [`${QUANT}:MC-1`, `${QUANT}:MC-2`],
    source: eb(QUANT, 'Identity + Misconception register — not "most", not "exactly one", and negation swaps'),
  },
  {
    conceptId: PLOG, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'Predicate logic adds predicates, terms and quantifiers to propositional logic, so you '
      + 'can say things ABOUT objects rather than only combining whole statements. The price '
      + 'is that order and scope now carry meaning.\n\n'
      + 'Swapping two quantifiers can change a true statement into a false one, and this is '
      + 'the one place in elementary logic where symbol order alone does that. "∀x ∃y, y > x" '
      + 'says every number has something bigger — true, and y may be chosen after seeing x. '
      + '"∃y ∀x, y > x" says one single y beats every x — false, because y is now fixed '
      + 'before x is chosen. Same four symbols, opposite truth values, and the difference is '
      + 'entirely which variable gets to depend on which.\n\n'
      + 'The domain is part of the statement too. "∀x, x² ≥ 0" is true over the reals and '
      + 'false over the complex numbers, so a quantifier with no stated domain is an '
      + 'incomplete claim rather than a claim about everything. Assuming the domain is '
      + 'always the reals is a habit picked up from school algebra, and it stops being '
      + 'harmless the moment another domain is in play.',
    targetedMisconceptions: [`${PLOG}:MC-1`, `${PLOG}:MC-3`],
    source: eb(PLOG, 'Identity + Misconception register — quantifier order, and the domain is part of the claim'),
  },
  {
    conceptId: SBN, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'Set-builder notation describes a set by a rule instead of a list: {x ∈ ℤ : x > 5} is '
      + '"the integers greater than 5". It has exactly two parts, and both are load-bearing — '
      + 'a domain saying what x ranges over, and a predicate saying which of those to keep.\n\n'
      + 'Dropping the domain does not leave the meaning intact. {x : x > 5} is a different '
      + 'and much larger collection than {x ∈ ℤ : x > 5}, since 5.5 and π now qualify. The '
      + 'domain is not scene-setting before the real condition; swap it and the set changes.\n\n'
      + 'The two parts also do different jobs and cannot be traded off. {x ∈ ℕ : x < 0} is '
      + 'perfectly well-formed and denotes the empty set — nothing in ℕ satisfies the '
      + 'condition, which is an ANSWER and not a sign the notation was used wrongly. Being '
      + 'able to describe a set that turns out to be empty is a feature: it is how you state '
      + 'a claim before you know whether anything satisfies it.',
    targetedMisconceptions: [`${SBN}:MC-1`, `${SBN}:MC-2`],
    source: eb(SBN, 'Identity + Misconception register — the domain is mandatory; an empty result is an answer'),
  },
  {
    conceptId: READ, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'Mathematics is not read at the speed of prose, and slowing down is the technique '
      + 'rather than a symptom of struggling. Ordinary reading works because context repairs '
      + 'whatever you miss; here a single skipped word can invert a statement, so the correct '
      + 'pace is roughly one line per pass with a check at the end of each.\n\n'
      + 'Word order is load-bearing in a way it is not in English. "For every x there is a y" '
      + 'and "there is a y for every x" are different claims, and reading them as stylistic '
      + 'variants of the same sentence is the most expensive habit a reader can carry, '
      + 'because nothing later in the text will flag the error.\n\n'
      + 'Unfamiliar notation cannot be passed over the way an unfamiliar word can. You can '
      + 'often infer "perambulate" from a sentence; you cannot infer ⊕ or ⊨, because their '
      + 'meanings were assigned rather than derived. The working method is to stop, find the '
      + 'definition, and try the statement on a small concrete case — a definition tested on '
      + 'one example is understood, and one read three times is memorised.',
    targetedMisconceptions: [`${READ}:MC-1`, `${READ}:MC-2`],
    source: eb(READ, 'Identity + Misconception register — order is load-bearing; notation cannot be inferred'),
  },
  {
    conceptId: WRITE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'Writing mathematics well means a competent reader can follow the argument without '
      + 'reconstructing it. The test is not whether it is correct in your head — it is '
      + 'whether the page carries the reasoning.\n\n'
      + 'Symbols do not supply rigour. A proof written mostly in words can be completely '
      + 'rigorous, and a wall of notation can hide a gap very effectively; ∀ε>0 ∃δ>0 ∀x '
      + 'strung together is not more rigorous than the same claim in a sentence, only '
      + 'shorter. Use a symbol when it is clearer than the words, which is often, and not to '
      + 'signal seriousness.\n\n'
      + 'What may never be left implicit is a hypothesis or a quantifier. "n² > n" is not a '
      + 'claim until you say for which n, and "if the function is continuous" cannot be '
      + 'dropped because it felt obvious while you were writing. The reader cannot see what '
      + 'you were assuming, and the most common defect in a student proof is not a wrong step '
      + 'but a true argument whose conditions were never stated.',
    targetedMisconceptions: [`${WRITE}:MC-1`, `${WRITE}:MC-2`],
    source: eb(WRITE, 'Identity + Misconception register — symbols are not rigour; hypotheses must be stated'),
  },
  {
    conceptId: ABS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'Abstraction is deliberately dropping the details that do not matter so that one piece '
      + 'of reasoning covers many situations. Three apples and three hours share nothing '
      + 'except threeness, and noticing that is what makes the number 3 useful for both.\n\n'
      + 'It is the opposite of vagueness, not a form of it. Vague means underspecified — you '
      + 'do not know what is meant. Abstract means precisely specified at a level that '
      + 'happens to ignore some features: "for all integers n" is entirely exact about which '
      + 'objects it covers, and it covers a great many. Abstraction removes irrelevant '
      + 'detail and adds precision about what remains.\n\n'
      + 'Nor does it begin at university. A child who works out that adding zero changes '
      + 'nothing — for any number, not just the ones tried — has abstracted, and that is the '
      + 'same move as any identity law in algebra. The catch is that an abstract rule does '
      + 'not transfer by itself: someone who is fluent with a + 0 = a may not see that the '
      + 'same fact is at work in a matrix or a set union until the connection is drawn, so '
      + 'meeting a rule in several surfaces is part of learning it, not revision.',
    targetedMisconceptions: [`${ABS}:MC-1`, `${ABS}:MC-3`],
    source: eb(ABS, 'Identity + Misconception register — the opposite of vagueness; transfer must be drawn'),
  },
]

export const MATHEMATICS_QUANTIFIER_CRAFT_PROBES: SeedProbe[] = [
  // --- math.found.variable ------------------------------------------------------
  {
    conceptId: VAR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'In the expression 3a, what does a stand for?',
    choices: [
      { text: 'A number — so 3a means three times that number', isCorrect: true },
      { text: 'Apples — so 3a means three apples', isCorrect: false, misconceptionId: `${VAR}:MC-1` },
      { text: 'The label of the quantity being counted', isCorrect: false, misconceptionId: `${VAR}:MC-1` },
    ],
    targetedMisconceptions: [`${VAR}:MC-1`],
    source: eb(VAR, 'Assessment gate — a variable holds a number'),
  },
  {
    conceptId: VAR, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'There is no equals sign in 3a. Is a still a variable?',
    choices: [
      { text: 'Yes — 3a is a recipe that gives 6 when a is 2 and 30 when a is 10; nothing needs solving', isCorrect: true },
      { text: 'No — variables only appear in equations', isCorrect: false, misconceptionId: `${VAR}:MC-2` },
      { text: 'No — without an equation a has no value, so it means nothing', isCorrect: false, misconceptionId: `${VAR}:MC-2` },
    ],
    targetedMisconceptions: [`${VAR}:MC-2`],
    source: eb(VAR, 'Misconception register — variables are not confined to equations'),
  },
  {
    conceptId: VAR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'In "the area of a rectangle is lw", how many values do l and w take?',
    choices: [
      { text: 'They range over every rectangle — which is what makes one sentence cover infinitely many shapes', isCorrect: true },
      { text: 'One each, fixed by the particular rectangle in the question', isCorrect: false, misconceptionId: `${VAR}:MC-3` },
      { text: 'One each, to be found by solving', isCorrect: false, misconceptionId: `${VAR}:MC-3` },
    ],
    targetedMisconceptions: [`${VAR}:MC-3`],
    source: eb(VAR, 'Transfer probe — a variable need not be pinned to one value'),
  },

  // --- math.found.predicate -----------------------------------------------------
  {
    conceptId: PRED, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is "x > 5" true or false?',
    choices: [
      { text: 'Neither — until x is given there is nothing to judge', isCorrect: true },
      { text: 'True, since 5 is a small number', isCorrect: false, misconceptionId: `${PRED}:MC-1` },
      { text: 'False, since x has not been shown to exceed 5', isCorrect: false, misconceptionId: `${PRED}:MC-1` },
    ],
    targetedMisconceptions: [`${PRED}:MC-1`],
    source: eb(PRED, 'Assessment gate — a predicate has no truth value yet'),
  },
  {
    conceptId: PRED, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is "x is prime" a predicate, given it contains no algebra?',
    choices: [
      { text: 'Yes — what makes it a predicate is the free variable, not the notation', isCorrect: true },
      { text: 'No — a predicate must be a formula with operations in it', isCorrect: false, misconceptionId: `${PRED}:MC-3` },
      { text: 'No — it is an English sentence, so it is a proposition', isCorrect: false, misconceptionId: `${PRED}:MC-1` },
    ],
    targetedMisconceptions: [`${PRED}:MC-3`],
    source: eb(PRED, 'Misconception register — a predicate is not a formula'),
  },
  {
    conceptId: PRED, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'How many free variables can a predicate have?',
    choices: [
      { text: 'Any number — "x + y = z" needs three values before it says anything', isCorrect: true },
      { text: 'Exactly one, by definition', isCorrect: false, misconceptionId: `${PRED}:MC-2` },
      { text: 'At most two, since more would make it a system', isCorrect: false, misconceptionId: `${PRED}:MC-2` },
    ],
    targetedMisconceptions: [`${PRED}:MC-2`],
    source: eb(PRED, 'Transfer probe — most interesting predicates have several holes'),
  },

  // --- math.found.quantifiers ---------------------------------------------------
  {
    conceptId: QUANT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is "∀n, n² > n" true over the natural numbers?',
    choices: [
      { text: 'No — n = 1 gives 1 > 1, which is false, and one counterexample is enough', isCorrect: true },
      { text: 'Yes — it holds for almost every n', isCorrect: false, misconceptionId: `${QUANT}:MC-1` },
      { text: 'Yes — a single exception does not defeat a general claim', isCorrect: false, misconceptionId: `${QUANT}:MC-1` },
    ],
    targetedMisconceptions: [`${QUANT}:MC-1`],
    source: eb(QUANT, 'Assessment gate — "for all" tolerates no exceptions'),
  },
  {
    conceptId: QUANT, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is "∃x, x² = 4" true, given that both 2 and −2 work?',
    choices: [
      { text: 'Yes — "there exists" asks for at least one and is a floor, never a count', isCorrect: true },
      { text: 'No — ∃ means exactly one, and there are two', isCorrect: false, misconceptionId: `${QUANT}:MC-2` },
      { text: 'Only if you restrict to the positive root', isCorrect: false, misconceptionId: `${QUANT}:MC-2` },
    ],
    targetedMisconceptions: [`${QUANT}:MC-2`],
    source: eb(QUANT, 'Misconception register — ∃ is not "exactly one"'),
  },
  {
    conceptId: QUANT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'What is the negation of "∀x P(x)"?',
    choices: [
      { text: '∃x ¬P(x) — to deny that everything works you need one thing that fails', isCorrect: true },
      { text: '∀x ¬P(x) — push the ¬ inward and leave the quantifier', isCorrect: false, misconceptionId: `${QUANT}:MC-3` },
      { text: '¬∃x P(x) — nothing works at all', isCorrect: false, misconceptionId: `${QUANT}:MC-3` },
    ],
    targetedMisconceptions: [`${QUANT}:MC-3`],
    source: eb(QUANT, 'Transfer probe — negation swaps the quantifier'),
  },

  // --- math.found.predicate-logic ------------------------------------------------
  {
    conceptId: PLOG, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What does predicate logic add to propositional logic?',
    choices: [
      { text: 'Predicates, terms and quantifiers — so you can talk about objects, not just whole statements', isCorrect: true },
      { text: 'Only extra connectives for joining statements', isCorrect: false },
      { text: 'A way to assign numbers to truth values', isCorrect: false },
    ],
    targetedMisconceptions: [`${PLOG}:MC-1`],
    source: eb(PLOG, 'Assessment gate — statements about objects'),
  },
  {
    conceptId: PLOG, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Over the integers, "∀x ∃y, y > x" is true. Is "∃y ∀x, y > x" also true?',
    choices: [
      { text: 'No — it now claims ONE y beats every x, and y is fixed before x is chosen', isCorrect: true },
      { text: 'Yes — the same symbols appear, so the meaning is the same', isCorrect: false, misconceptionId: `${PLOG}:MC-1` },
      { text: 'Yes — quantifier order is a stylistic choice', isCorrect: false, misconceptionId: `${PLOG}:MC-1` },
    ],
    targetedMisconceptions: [`${PLOG}:MC-1`],
    source: eb(PLOG, 'Misconception register — swapping quantifiers changes the claim'),
  },
  {
    conceptId: PLOG, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is "∀x, x² ≥ 0" true?',
    choices: [
      { text: 'It depends on the domain — true over the reals, false over the complex numbers', isCorrect: true },
      { text: 'Yes, always — a square is never negative', isCorrect: false, misconceptionId: `${PLOG}:MC-3` },
      { text: 'Yes — the domain is the reals unless stated otherwise', isCorrect: false, misconceptionId: `${PLOG}:MC-3` },
    ],
    targetedMisconceptions: [`${PLOG}:MC-3`],
    source: eb(PLOG, 'Transfer probe — the domain is part of the statement'),
  },

  // --- math.found.set-builder-notation --------------------------------------------
  {
    conceptId: SBN, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What does {x ∈ ℤ : x > 5} describe?',
    choices: [
      { text: 'The integers greater than 5', isCorrect: true },
      { text: 'All numbers greater than 5', isCorrect: false, misconceptionId: `${SBN}:MC-1` },
      { text: 'The single integer 5', isCorrect: false },
    ],
    targetedMisconceptions: [`${SBN}:MC-1`],
    source: eb(SBN, 'Assessment gate — domain plus predicate'),
  },
  {
    conceptId: SBN, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does dropping the domain change {x ∈ ℤ : x > 5} to {x : x > 5}?',
    choices: [
      { text: 'Yes, substantially — 5.5 and π now qualify, so it is a different and much larger set', isCorrect: true },
      { text: 'No — the domain is scene-setting before the real condition', isCorrect: false, misconceptionId: `${SBN}:MC-1` },
      { text: 'No — the condition x > 5 already implies the integers', isCorrect: false, misconceptionId: `${SBN}:MC-3` },
    ],
    targetedMisconceptions: [`${SBN}:MC-1`, `${SBN}:MC-3`],
    source: eb(SBN, 'Misconception register — the domain is not optional'),
  },
  {
    conceptId: SBN, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'What is {x ∈ ℕ : x < 0}?',
    choices: [
      { text: 'The empty set — a well-formed description whose answer happens to be nothing', isCorrect: true },
      { text: 'An error — the notation has been used incorrectly', isCorrect: false, misconceptionId: `${SBN}:MC-2` },
      { text: 'The negative integers', isCorrect: false, misconceptionId: `${SBN}:MC-1` },
    ],
    targetedMisconceptions: [`${SBN}:MC-2`],
    source: eb(SBN, 'Transfer probe — an empty result is an answer'),
  },

  // --- math.found.reading-mathematics ----------------------------------------------
  {
    conceptId: READ, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What is the right pace for reading a mathematical statement?',
    choices: [
      { text: 'Roughly a line per pass, checking as you go — slowness is the technique', isCorrect: true },
      { text: 'The same as prose; context will repair anything missed', isCorrect: false, misconceptionId: `${READ}:MC-1` },
      { text: 'Fast on the first pass, slowly only if something later fails', isCorrect: false, misconceptionId: `${READ}:MC-1` },
    ],
    targetedMisconceptions: [`${READ}:MC-1`],
    source: eb(READ, 'Assessment gate — mathematics is not read at prose speed'),
  },
  {
    conceptId: READ, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: '"For every x there is a y" and "there is a y for every x" — same claim?',
    choices: [
      { text: 'No — the order fixes which variable may depend on which, and nothing later will flag the error', isCorrect: true },
      { text: 'Yes — English word order is stylistic', isCorrect: false, misconceptionId: `${READ}:MC-2` },
      { text: 'Yes, provided the domain is the same', isCorrect: false, misconceptionId: `${READ}:MC-2` },
    ],
    targetedMisconceptions: [`${READ}:MC-2`],
    source: eb(READ, 'Misconception register — quantifier order is not stylistic'),
  },
  {
    conceptId: READ, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'You hit an unfamiliar symbol mid-proof. What works?',
    choices: [
      { text: 'Stop, find the definition, and try it on a small concrete case — its meaning was assigned, not derivable', isCorrect: true },
      { text: 'Read on and infer it from context, as with an unfamiliar word', isCorrect: false, misconceptionId: `${READ}:MC-3` },
      { text: 'Guess from its shape and check later', isCorrect: false, misconceptionId: `${READ}:MC-3` },
    ],
    targetedMisconceptions: [`${READ}:MC-3`],
    source: eb(READ, 'Transfer probe — notation cannot be skipped like a word'),
  },

  // --- math.found.writing-mathematics ------------------------------------------------
  {
    conceptId: WRITE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What is the test of well-written mathematics?',
    choices: [
      { text: 'A competent reader can follow it without reconstructing the argument', isCorrect: true },
      { text: 'It is correct in the author\'s head', isCorrect: false, misconceptionId: `${WRITE}:MC-2` },
      { text: 'It uses standard notation throughout', isCorrect: false, misconceptionId: `${WRITE}:MC-1` },
    ],
    targetedMisconceptions: [`${WRITE}:MC-2`],
    source: eb(WRITE, 'Assessment gate — the page must carry the reasoning'),
  },
  {
    conceptId: WRITE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is a proof written mostly in words less rigorous than one written mostly in symbols?',
    choices: [
      { text: 'No — rigour is in the reasoning; a wall of notation can hide a gap very effectively', isCorrect: true },
      { text: 'Yes — symbols are what make an argument rigorous', isCorrect: false, misconceptionId: `${WRITE}:MC-1` },
      { text: 'Yes — words are acceptable only for outlines', isCorrect: false, misconceptionId: `${WRITE}:MC-1` },
    ],
    targetedMisconceptions: [`${WRITE}:MC-1`],
    source: eb(WRITE, 'Misconception register — more symbols is not more rigorous'),
  },
  {
    conceptId: WRITE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A hypothesis felt obvious while you were writing. May it be left out?',
    choices: [
      { text: 'No — the reader cannot see what you assumed, and a true argument with unstated conditions is the commonest defect', isCorrect: true },
      { text: 'Yes — obvious conditions clutter the argument', isCorrect: false, misconceptionId: `${WRITE}:MC-2` },
      { text: 'Yes, provided the conclusion is correct', isCorrect: false, misconceptionId: `${WRITE}:MC-2` },
    ],
    targetedMisconceptions: [`${WRITE}:MC-2`],
    source: eb(WRITE, 'Transfer probe — hypotheses and quantifiers stay explicit'),
  },

  // --- math.found.abstraction ----------------------------------------------------------
  {
    conceptId: ABS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What does abstraction do?',
    choices: [
      { text: 'Drops the details that do not matter so one piece of reasoning covers many situations', isCorrect: true },
      { text: 'Leaves things unspecified so they are open to interpretation', isCorrect: false, misconceptionId: `${ABS}:MC-1` },
      { text: 'Replaces numbers with letters to make work look harder', isCorrect: false },
    ],
    targetedMisconceptions: [`${ABS}:MC-1`],
    source: eb(ABS, 'Assessment gate — dropping irrelevant detail'),
  },
  {
    conceptId: ABS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is "for all integers n" vague?',
    choices: [
      { text: 'No — it is exact about which objects it covers; abstract means precise at a level that ignores some features', isCorrect: true },
      { text: 'Yes — it does not say which integer, so it is underspecified', isCorrect: false, misconceptionId: `${ABS}:MC-1` },
      { text: 'Yes — abstraction and vagueness are the same thing', isCorrect: false, misconceptionId: `${ABS}:MC-1` },
    ],
    targetedMisconceptions: [`${ABS}:MC-1`],
    source: eb(ABS, 'Misconception register — abstraction is the opposite of vagueness'),
  },
  {
    conceptId: ABS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A learner is fluent with a + 0 = a but does not see the same fact in set union. What follows?',
    choices: [
      { text: 'An abstract rule does not transfer by itself — meeting it in several surfaces is part of learning it', isCorrect: true },
      { text: 'They never understood a + 0 = a in the first place', isCorrect: false, misconceptionId: `${ABS}:MC-3` },
      { text: 'Set union is unrelated, so there is nothing to transfer', isCorrect: false, misconceptionId: `${ABS}:MC-3` },
    ],
    targetedMisconceptions: [`${ABS}:MC-3`],
    source: eb(ABS, 'Transfer probe — transfer must be drawn, not assumed'),
  },
]
