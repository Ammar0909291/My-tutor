/**
 * Fifteenth batch — the foundations proper: what everything is built out
 * of, what counts as building, and how sizes are compared once counting
 * stops working.
 *
 *   GROUND     set-theory, axiomatic-system, set-theory-axiomatic. The
 *              language everything else is written in, what an axiomatic
 *              system actually consists of, and why naive comprehension
 *              had to be given up.
 *   STRUCTURE  function-set-theoretic, equivalence-relation,
 *              partial-order. The three things you can do to a set with a
 *              relation, each defined by which properties hold.
 *   SIZE       cardinality, countable-set. Where counting is replaced by
 *              matching, and where the answers stop being intuitive:
 *              an infinite set CAN match a proper part of itself, and the
 *              rationals are not larger than the integers.
 *
 * All eight carried a full Educational Brain entry and served the learner
 * nothing. Each now has one explanation and three closed-choice probes.
 * This leaves math.found with four unserved concepts.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const ST = 'math.found.set-theory'
const AXS = 'math.found.axiomatic-system'
const ZFC = 'math.found.set-theory-axiomatic'
const FN = 'math.found.function-set-theoretic'
const EQR = 'math.found.equivalence-relation'
const PO = 'math.found.partial-order'
const CARD = 'math.found.cardinality'
const CTBL = 'math.found.countable-set'

export const MATHEMATICS_FOUNDATIONS_CLOSE_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: ST, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A set is a collection of distinct objects, and the whole of modern mathematics is '
      + 'written in this language — numbers, functions, spaces and proofs are all ultimately '
      + 'sets. Its power comes from how little it assumes: a set records WHAT is in it and '
      + 'nothing else.\n\n'
      + 'So order and repetition are invisible. {1, 2, 3} and {3, 2, 1} are the same set, and '
      + '{1, 1, 2} is just {1, 2}, because "is 1 in it?" gets the same answer either way. If '
      + 'you need order you need a different object — an ordered pair or a sequence — and '
      + 'that is precisely why those exist as separate ideas.\n\n'
      + 'Two things routinely trip people up. A subset need not be smaller: A ⊆ A is true, '
      + 'and only ⊂ demands the subset be strictly smaller. And ∅ is not {∅}. The first is an '
      + 'empty box, with nothing in it; the second is a box with one thing in it, and that '
      + 'thing happens to be an empty box. |∅| = 0 and |{∅}| = 1, which is as different as '
      + 'two sets can be.',
    targetedMisconceptions: [`${ST}:MC-1`, `${ST}:MC-2`],
    source: eb(ST, 'Identity + Misconception register — order and repetition invisible; ∅ is not {∅}'),
  },
  {
    conceptId: AXS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'An axiomatic system is not just a list of axioms. It is axioms PLUS the rules of '
      + 'logic for getting from them to anything else — and without the second half nothing '
      + 'can be derived, because the axioms alone are inert statements with no way to be '
      + 'combined.\n\n'
      + 'Three properties get run together and are separate questions. CONSISTENT: no '
      + 'contradiction can be derived — the one property a system cannot do without, since an '
      + 'inconsistent system proves everything and so says nothing. COMPLETE: every statement '
      + 'in the language can be proved or disproved. INDEPENDENT: no axiom follows from the '
      + 'others, which is about economy rather than correctness — a redundant axiom is untidy, '
      + 'not wrong.\n\n'
      + 'And there is no single correct set of axioms. Euclidean and non-Euclidean geometry '
      + 'differ in exactly one axiom about parallels, and both are consistent; the second is '
      + 'not a mistaken version of the first, it describes different spaces. Choosing axioms '
      + 'is choosing which objects you want to talk about, which is why the question "but '
      + 'which geometry is TRUE?" has no answer inside mathematics.',
    targetedMisconceptions: [`${AXS}:MC-1`, `${AXS}:MC-3`],
    source: eb(AXS, 'Identity + Misconception register — axioms plus logic; three separate properties'),
  },
  {
    conceptId: ZFC, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'ZFC — the Zermelo-Fraenkel axioms plus the Axiom of Choice — is the standard '
      + 'foundation mathematics is built on. It exists because the naive version broke.\n\n'
      + 'Naive set theory allowed any property to define a set, and Russell asked about the '
      + 'set of all sets that do not contain themselves: if it contains itself it must not, '
      + 'and if it does not it must. ZFC removes unrestricted comprehension and permits only '
      + 'SEPARATION — you may carve a subset out of a set you already have, but you may not '
      + 'conjure a set from a property alone. That single restriction is what dissolves the '
      + 'paradox, and it is the reason "the set of all sets" is not a legal object in ZFC.\n\n'
      + 'The Axiom of Choice is genuinely independent: Gödel and Cohen showed it can neither '
      + 'be proved nor disproved from ZF, so adopting it is a decision rather than a '
      + 'discovery. And ZFC is not complete — Gödel showed any consistent system strong '
      + 'enough for arithmetic has true statements it cannot prove, and cannot prove its own '
      + 'consistency. That is a permanent feature of foundations, not a gap awaiting a better '
      + 'axiom list.',
    targetedMisconceptions: [`${ZFC}:MC-1`, `${ZFC}:MC-3`],
    source: eb(ZFC, 'Identity + Misconception register — separation not comprehension; AC independent; ZFC incomplete'),
  },
  {
    conceptId: FN, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'Set-theoretically, a function f: A → B is a relation with two extra demands: every '
      + 'element of A appears in exactly one pair. "Every" is totality — nothing in the '
      + 'domain may be left out — and "exactly one" is single-valuedness.\n\n'
      + 'Both conditions have to be checked, and the first is the one that gets skipped. On '
      + 'A = {1, 2, 3}, the relation {(1,x), (2,y)} is single-valued everywhere it is defined '
      + 'and is still not a function, because 3 has no output. Checking a few elements '
      + 'establishes nothing about the ones you did not check.\n\n'
      + 'A function need not be a formula. {(1,x), (2,y), (3,x)} is a perfectly good function '
      + 'given by a list, with no rule behind it — school makes formulas feel definitional, '
      + 'and they are just the convenient case. Finally, the codomain B is declared and the '
      + 'RANGE is what actually gets hit: f(x) = x² from ℝ to ℝ has codomain ℝ and range '
      + '[0, ∞), and the two coincide only when the function happens to be onto.',
    targetedMisconceptions: [`${FN}:MC-1`, `${FN}:MC-2`],
    source: eb(FN, 'Identity + Misconception register — totality is checked too; range is not codomain'),
  },
  {
    conceptId: EQR, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'An equivalence relation has all THREE properties: reflexive (a ~ a), symmetric (a ~ b '
      + 'gives b ~ a) and transitive (a ~ b and b ~ c give a ~ c). "Same remainder mod 3" has '
      + 'all three and is one; "is a sibling of" is symmetric and not reflexive, so it is '
      + 'not.\n\n'
      + 'Two out of three is not nearly an equivalence relation, it is not one, and the '
      + 'missing property is exactly what would break the structure. Drop transitivity and '
      + '"within 1cm of" lets a chain of near-equal heights connect two very different people; '
      + 'drop reflexivity and some element belongs to no class at all.\n\n'
      + 'When all three hold you get a partition for free: the classes cover everything and '
      + 'cannot partially overlap, since two classes sharing one element must — by symmetry '
      + 'and transitivity — be the same class entirely. The correspondence runs both ways, '
      + 'and that is the part usually met in only one direction: every equivalence relation '
      + 'yields a partition, AND every partition defines an equivalence relation, namely "in '
      + 'the same block". They are two descriptions of one structure.',
    targetedMisconceptions: [`${EQR}:MC-1`, `${EQR}:MC-2`],
    source: eb(EQR, 'Identity + Misconception register — all three properties; the correspondence is two-way'),
  },
  {
    conceptId: PO, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A partial order is reflexive, ANTIsymmetric and transitive. Subset inclusion is the '
      + 'standard example: A ⊆ A, and if A ⊆ B and B ⊆ A then A = B, and inclusion chains '
      + 'through.\n\n'
      + 'Antisymmetric does not mean "never symmetric" — the prefix misleads. It says that if '
      + 'the relation holds BOTH ways between two elements, those elements must be equal. So '
      + 'a ≤ a is fine and a ≤ b with b ≤ a simply forces a = b; the condition rules out two '
      + 'DIFFERENT elements each being below the other, which is what would make "below" '
      + 'meaningless.\n\n'
      + '"Partial" is the other half of the name and the more important one: not every pair '
      + 'need be comparable. Under divisibility, 3 and 4 are simply unrelated — neither '
      + 'divides the other — and that is allowed. A TOTAL order additionally demands every '
      + 'pair be comparable, which ≤ on the reals satisfies and which is why ≤ on ℝ is a '
      + 'misleading first example: it hides the possibility this definition was written to '
      + 'permit.',
    targetedMisconceptions: [`${PO}:MC-1`, `${PO}:MC-2`],
    source: eb(PO, 'Identity + Misconception register — antisymmetric is not non-symmetric; partial means incomparable pairs allowed'),
  },
  {
    conceptId: CARD, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'Cardinality is the size of a set, and for infinite sets it is defined by MATCHING '
      + 'rather than counting. Two sets have the same cardinality when their elements can be '
      + 'paired off one-for-one with none left over on either side — which works whether or '
      + 'not you can count either of them.\n\n'
      + 'That definition delivers a result that looks wrong and is not. The naturals and the '
      + 'even naturals have the same cardinality: match n with 2n and every natural pairs with '
      + 'exactly one even number, with nothing missed. The evens are a PROPER SUBSET of the '
      + 'naturals and are the same size — and rather than being a defect this is the standard '
      + 'test for infinity, since it is exactly what finite sets cannot do.\n\n'
      + 'It does not follow that all infinite sets match. Cantor showed no pairing between the '
      + 'naturals and the reals can succeed: given any proposed list of reals you can build '
      + 'one it missed, by differing from the first in its first digit, the second in its '
      + 'second, and so on. So there are strictly more reals than naturals, and infinity is a '
      + 'category rather than a size.',
    targetedMisconceptions: [`${CARD}:MC-2`, `${CARD}:MC-3`],
    source: eb(CARD, 'Identity + Misconception register — matching not counting; proper subsets can match'),
  },
  {
    conceptId: CTBL, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A set is countable when it is finite or can be listed as a first, second, third and so '
      + 'on — that is, put in bijection with ℕ. Countable is not a synonym for small: ℕ '
      + 'itself is countable and infinite, and so is ℤ, which is listed by zigzagging 0, 1, '
      + '−1, 2, −2, and so on rather than by starting at the bottom, since there is no bottom '
      + 'to start at.\n\n'
      + 'The word covers two cases and this causes real confusion: countable means finite OR '
      + 'countably infinite. If you mean the second, "countably infinite" is the phrase — '
      + '{1, 2, 3} is countable, and saying so is not a claim about infinity at all.\n\n'
      + 'Being densely packed does not make a set bigger. Between any two rationals lie '
      + 'infinitely many more, and ℚ is still countable — arrange the fractions in a grid by '
      + 'numerator and denominator and sweep the diagonals, and every one is reached. Density '
      + 'and cardinality are unrelated questions, which is why the reals being uncountable '
      + 'cannot be blamed on how tightly they sit together.',
    targetedMisconceptions: [`${CTBL}:MC-1`, `${CTBL}:MC-2`],
    source: eb(CTBL, 'Identity + Misconception register — countable is not small; density does not raise cardinality'),
  },
]

export const MATHEMATICS_FOUNDATIONS_CLOSE_PROBES: SeedProbe[] = [
  // --- math.found.set-theory ------------------------------------------------------
  {
    conceptId: ST, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Are {1, 2, 3} and {3, 2, 1} the same set?',
    choices: [
      { text: 'Yes — a set records what is in it, not the order', isCorrect: true },
      { text: 'No — the elements appear in a different order', isCorrect: false, misconceptionId: `${ST}:MC-2` },
      { text: 'Only if the elements are numbers', isCorrect: false, misconceptionId: `${ST}:MC-2` },
    ],
    targetedMisconceptions: [`${ST}:MC-2`],
    source: eb(ST, 'Assessment gate — order is invisible to a set'),
  },
  {
    conceptId: ST, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is ∅ the same as {∅}?',
    choices: [
      { text: 'No — |∅| = 0 and |{∅}| = 1; the second is a box containing an empty box', isCorrect: true },
      { text: 'Yes — both are empty', isCorrect: false, misconceptionId: `${ST}:MC-1` },
      { text: 'Yes — the braces are just notation around the same object', isCorrect: false, misconceptionId: `${ST}:MC-1` },
    ],
    targetedMisconceptions: [`${ST}:MC-1`],
    source: eb(ST, 'Misconception register — ∅ is not {∅}'),
  },
  {
    conceptId: ST, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Must a subset be strictly smaller than the set it sits in?',
    choices: [
      { text: 'No — A ⊆ A is true; only ⊂ demands strictly smaller', isCorrect: true },
      { text: 'Yes — otherwise it would not be a part of it', isCorrect: false, misconceptionId: `${ST}:MC-3` },
      { text: 'Yes, unless the set is infinite', isCorrect: false, misconceptionId: `${ST}:MC-3` },
    ],
    targetedMisconceptions: [`${ST}:MC-3`],
    source: eb(ST, 'Transfer probe — a set is a subset of itself'),
  },

  // --- math.found.axiomatic-system --------------------------------------------------
  {
    conceptId: AXS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What does an axiomatic system consist of?',
    choices: [
      { text: 'Axioms plus the rules of logic for deriving things from them', isCorrect: true },
      { text: 'A list of axioms', isCorrect: false, misconceptionId: `${AXS}:MC-1` },
      { text: 'A list of axioms and the theorems already proved from them', isCorrect: false, misconceptionId: `${AXS}:MC-1` },
    ],
    targetedMisconceptions: [`${AXS}:MC-1`],
    source: eb(AXS, 'Assessment gate — axioms alone are inert'),
  },
  {
    conceptId: AXS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'An axiom in your system turns out to follow from the others. What is wrong?',
    choices: [
      { text: 'The system is not independent — untidy, but not incorrect; it stays consistent', isCorrect: true },
      { text: 'It is inconsistent, so it proves everything', isCorrect: false, misconceptionId: `${AXS}:MC-2` },
      { text: 'It is incomplete, so some statements cannot be decided', isCorrect: false, misconceptionId: `${AXS}:MC-2` },
    ],
    targetedMisconceptions: [`${AXS}:MC-2`],
    source: eb(AXS, 'Misconception register — independence is economy, not correctness'),
  },
  {
    conceptId: AXS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Euclidean and non-Euclidean geometry differ in one axiom. Which is the true one?',
    choices: [
      { text: 'Neither — both are consistent and describe different spaces; choosing axioms chooses your subject matter', isCorrect: true },
      { text: 'Euclidean, since it matches the space we live in', isCorrect: false, misconceptionId: `${AXS}:MC-3` },
      { text: 'Non-Euclidean, since it is the more general system', isCorrect: false, misconceptionId: `${AXS}:MC-3` },
    ],
    targetedMisconceptions: [`${AXS}:MC-3`],
    source: eb(AXS, 'Transfer probe — there is no single correct axiom set'),
  },

  // --- math.found.set-theory-axiomatic ------------------------------------------------
  {
    conceptId: ZFC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Why was naive set theory replaced?',
    choices: [
      { text: 'Unrestricted comprehension produced Russell\'s paradox', isCorrect: true },
      { text: 'It could not handle infinite sets', isCorrect: false },
      { text: 'It lacked notation for functions', isCorrect: false },
    ],
    targetedMisconceptions: [`${ZFC}:MC-1`],
    source: eb(ZFC, 'Assessment gate — the paradox forced the axiomatisation'),
  },
  {
    conceptId: ZFC, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'In ZFC, can you form a set from any property you like?',
    choices: [
      { text: 'No — only SEPARATION: you carve a subset from a set you already have', isCorrect: true },
      { text: 'Yes — ZFC restored unrestricted comprehension on a safe footing', isCorrect: false, misconceptionId: `${ZFC}:MC-1` },
      { text: 'Yes, provided the property is stated in the formal language', isCorrect: false, misconceptionId: `${ZFC}:MC-1` },
    ],
    targetedMisconceptions: [`${ZFC}:MC-1`],
    source: eb(ZFC, 'Misconception register — separation, not comprehension'),
  },
  {
    conceptId: ZFC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is ZFC complete?',
    choices: [
      { text: 'No — Gödel showed any consistent system strong enough for arithmetic has true statements it cannot prove', isCorrect: true },
      { text: 'Yes — that is what axiomatising set theory achieved', isCorrect: false, misconceptionId: `${ZFC}:MC-3` },
      { text: 'Not yet, but a better axiom list would make it so', isCorrect: false, misconceptionId: `${ZFC}:MC-3` },
    ],
    targetedMisconceptions: [`${ZFC}:MC-3`],
    source: eb(ZFC, 'Transfer probe — incompleteness is permanent, not a gap'),
  },

  // --- math.found.function-set-theoretic ------------------------------------------------
  {
    conceptId: FN, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What two conditions make a relation from A to B a function?',
    choices: [
      { text: 'Every element of A appears, and each appears in exactly one pair', isCorrect: true },
      { text: 'Each element of A appears at most once', isCorrect: false, misconceptionId: `${FN}:MC-1` },
      { text: 'Every element of B is reached exactly once', isCorrect: false, misconceptionId: `${FN}:MC-3` },
    ],
    targetedMisconceptions: [`${FN}:MC-1`],
    source: eb(FN, 'Assessment gate — totality and single-valuedness'),
  },
  {
    conceptId: FN, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'On A = {1, 2, 3}, is {(1,x), (2,y)} a function?',
    choices: [
      { text: 'No — 3 has no output, so it fails totality even though nothing is double-valued', isCorrect: true },
      { text: 'Yes — every pair present is single-valued', isCorrect: false, misconceptionId: `${FN}:MC-1` },
      { text: 'Yes — 3 can be assigned any value later', isCorrect: false, misconceptionId: `${FN}:MC-1` },
    ],
    targetedMisconceptions: [`${FN}:MC-1`],
    source: eb(FN, 'Misconception register — domain coverage is checked too'),
  },
  {
    conceptId: FN, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For f(x) = x² from ℝ to ℝ, what is the codomain and what is the range?',
    choices: [
      { text: 'Codomain ℝ, range [0, ∞) — they coincide only when the function is onto', isCorrect: true },
      { text: 'Both are ℝ — codomain and range are the same thing', isCorrect: false, misconceptionId: `${FN}:MC-3` },
      { text: 'Both are [0, ∞)', isCorrect: false, misconceptionId: `${FN}:MC-3` },
    ],
    targetedMisconceptions: [`${FN}:MC-3`],
    source: eb(FN, 'Transfer probe — range is what is hit, codomain is what was declared'),
  },

  // --- math.found.equivalence-relation ---------------------------------------------------
  {
    conceptId: EQR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Which three properties define an equivalence relation?',
    choices: [
      { text: 'Reflexive, symmetric, transitive', isCorrect: true },
      { text: 'Reflexive, antisymmetric, transitive', isCorrect: false },
      { text: 'Symmetric and transitive — reflexivity follows from those two', isCorrect: false, misconceptionId: `${EQR}:MC-1` },
    ],
    targetedMisconceptions: [`${EQR}:MC-1`],
    source: eb(EQR, 'Assessment gate — all three properties'),
  },
  {
    conceptId: EQR, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: '"Is within 1cm of" is reflexive and symmetric. Is it an equivalence relation?',
    choices: [
      { text: 'No — it fails transitivity, so a chain of near-equal heights connects two very different people', isCorrect: true },
      { text: 'Yes — two of the three properties is enough in practice', isCorrect: false, misconceptionId: `${EQR}:MC-1` },
      { text: 'Yes — transitivity follows from symmetry', isCorrect: false, misconceptionId: `${EQR}:MC-1` },
    ],
    targetedMisconceptions: [`${EQR}:MC-1`],
    source: eb(EQR, 'Misconception register — a partial property set is not enough'),
  },
  {
    conceptId: EQR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Every equivalence relation gives a partition. Does the reverse hold?',
    choices: [
      { text: 'Yes — every partition defines one, namely "in the same block"; they are two descriptions of one structure', isCorrect: true },
      { text: 'No — the correspondence runs one way only', isCorrect: false, misconceptionId: `${EQR}:MC-3` },
      { text: 'Only for finite sets', isCorrect: false, misconceptionId: `${EQR}:MC-3` },
    ],
    targetedMisconceptions: [`${EQR}:MC-3`],
    source: eb(EQR, 'Transfer probe — the correspondence is two-way'),
  },

  // --- math.found.partial-order -----------------------------------------------------------
  {
    conceptId: PO, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Which three properties define a partial order?',
    choices: [
      { text: 'Reflexive, antisymmetric, transitive', isCorrect: true },
      { text: 'Reflexive, symmetric, transitive', isCorrect: false },
      { text: 'Irreflexive, antisymmetric, transitive', isCorrect: false, misconceptionId: `${PO}:MC-3` },
    ],
    targetedMisconceptions: [`${PO}:MC-3`],
    source: eb(PO, 'Assessment gate — the three properties, reflexive not strict'),
  },
  {
    conceptId: PO, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does "antisymmetric" mean the relation never holds both ways?',
    choices: [
      { text: 'No — it says that if it holds both ways the two elements must be EQUAL, which is why A ⊆ A is fine', isCorrect: true },
      { text: 'Yes — "anti" means the symmetric case is forbidden', isCorrect: false, misconceptionId: `${PO}:MC-1` },
      { text: 'Yes — it is the exact opposite of symmetric', isCorrect: false, misconceptionId: `${PO}:MC-1` },
    ],
    targetedMisconceptions: [`${PO}:MC-1`],
    source: eb(PO, 'Misconception register — antisymmetric is not non-symmetric'),
  },
  {
    conceptId: PO, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Under divisibility, neither 3 nor 4 divides the other. Does that break the partial order?',
    choices: [
      { text: 'No — "partial" means incomparable pairs are allowed; only a TOTAL order requires every pair to compare', isCorrect: true },
      { text: 'Yes — an order must rank every pair', isCorrect: false, misconceptionId: `${PO}:MC-2` },
      { text: 'Yes — 4 is larger, so it should come above 3', isCorrect: false, misconceptionId: `${PO}:MC-2` },
    ],
    targetedMisconceptions: [`${PO}:MC-2`],
    source: eb(PO, 'Transfer probe — ≤ on ℝ is a misleading first example'),
  },

  // --- math.found.cardinality --------------------------------------------------------------
  {
    conceptId: CARD, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'How is "same size" defined for infinite sets?',
    choices: [
      { text: 'By a one-for-one pairing with nothing left over on either side', isCorrect: true },
      { text: 'By counting the elements of each', isCorrect: false, misconceptionId: `${CARD}:MC-1` },
      { text: 'By checking one is not a subset of the other', isCorrect: false, misconceptionId: `${CARD}:MC-2` },
    ],
    targetedMisconceptions: [`${CARD}:MC-1`],
    source: eb(CARD, 'Assessment gate — matching, not counting'),
  },
  {
    conceptId: CARD, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Do the naturals and the even naturals have the same cardinality?',
    choices: [
      { text: 'Yes — match n with 2n; an infinite set matching a proper subset is the standard test for infinity', isCorrect: true },
      { text: 'No — the evens are half of the naturals', isCorrect: false, misconceptionId: `${CARD}:MC-2` },
      { text: 'No — a proper subset must be strictly smaller', isCorrect: false, misconceptionId: `${CARD}:MC-2` },
    ],
    targetedMisconceptions: [`${CARD}:MC-2`],
    source: eb(CARD, 'Misconception register — an infinite set CAN match a proper subset'),
  },
  {
    conceptId: CARD, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does it follow that all infinite sets have the same cardinality?',
    choices: [
      { text: 'No — Cantor\'s diagonal argument builds a real missed by any proposed list, so the reals are strictly larger', isCorrect: true },
      { text: 'Yes — infinity is infinity', isCorrect: false, misconceptionId: `${CARD}:MC-3` },
      { text: 'Yes — any two infinite sets can be paired off with enough ingenuity', isCorrect: false, misconceptionId: `${CARD}:MC-3` },
    ],
    targetedMisconceptions: [`${CARD}:MC-3`],
    source: eb(CARD, 'Transfer probe — infinity is a category, not a size'),
  },

  // --- math.found.countable-set ---------------------------------------------------------------
  {
    conceptId: CTBL, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is ℤ countable?',
    choices: [
      { text: 'Yes — zigzag 0, 1, −1, 2, −2, … and every integer is reached', isCorrect: true },
      { text: 'No — it has no smallest element to start the list from', isCorrect: false },
      { text: 'No — it is twice as big as ℕ', isCorrect: false, misconceptionId: `${CTBL}:MC-1` },
    ],
    targetedMisconceptions: [`${CTBL}:MC-1`],
    source: eb(CTBL, 'Assessment gate — the listing may zigzag'),
  },
  {
    conceptId: CTBL, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Between any two rationals lie infinitely many more. Is ℚ therefore uncountable?',
    choices: [
      { text: 'No — arrange fractions in a grid and sweep the diagonals; density and cardinality are unrelated', isCorrect: true },
      { text: 'Yes — being densely packed makes it bigger than ℕ', isCorrect: false, misconceptionId: `${CTBL}:MC-2` },
      { text: 'Yes — you can never say which rational comes next', isCorrect: false, misconceptionId: `${CTBL}:MC-2` },
    ],
    targetedMisconceptions: [`${CTBL}:MC-2`],
    source: eb(CTBL, 'Misconception register — density does not raise cardinality'),
  },
  {
    conceptId: CTBL, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is {1, 2, 3} countable?',
    choices: [
      { text: 'Yes — countable means finite OR countably infinite, and saying so claims nothing about infinity', isCorrect: true },
      { text: 'No — countable applies only to infinite sets', isCorrect: false, misconceptionId: `${CTBL}:MC-3` },
      { text: 'No — it must be in bijection with ℕ, and it is not', isCorrect: false, misconceptionId: `${CTBL}:MC-3` },
    ],
    targetedMisconceptions: [`${CTBL}:MC-3`],
    source: eb(CTBL, 'Transfer probe — countable versus countably infinite'),
  },
]
