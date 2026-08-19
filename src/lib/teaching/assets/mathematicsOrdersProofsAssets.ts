/**
 * Eleventh batch — finishing the relation properties, the operations
 * survey, and three ideas that each hinge on a word doing less than it
 * appears to.
 *
 *   PROPERTIES  symmetric-relation, transitive-relation, total-order.
 *               All three are universally quantified claims, so ONE
 *               counterexample settles them — and all three are satisfied
 *               vacuously when there is nothing to check, which reads as a
 *               trick and is not one.
 *   OPERATIONS  union, set-operations. Union is "or" and its size is not
 *               the sum; the survey entry names grouping and the
 *               non-symmetry of difference as the two things that actually
 *               go wrong in mixed expressions.
 *   BEYOND      uncountable-set, strong-induction, uniqueness-proof.
 *               Uncountable is not "very large"; STRONG induction is not
 *               stronger; a uniqueness proof does not prove existence.
 *               Three words that promise more than they deliver.
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

const SYM = 'math.found.symmetric-relation'
const TRANS = 'math.found.transitive-relation'
const TOT = 'math.found.total-order'
const UNION = 'math.found.union'
const SOPS = 'math.found.set-operations'
const UNC = 'math.found.uncountable-set'
const SIND = 'math.found.strong-induction'
const UNIQ = 'math.found.uniqueness-proof'

export const MATHEMATICS_ORDERS_PROOFS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: SYM, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A relation is symmetric when (a, b) being in it forces (b, a) to be in it too. "Is a '
      + 'sibling of" is symmetric; "is the parent of" is not, because parenthood only runs '
      + 'one way.\n\n'
      + 'It is a claim about every pair, so it takes only ONE pair to destroy it. If R holds '
      + 'a hundred mirrored pairs and a single unmirrored one, R is not symmetric — there is '
      + 'no partial credit in a universally quantified statement, and hunting for one '
      + 'counterexample is a faster way to check than verifying the rest.\n\n'
      + 'The case that feels like a trick is when there is nothing to check. A relation '
      + 'containing only self-pairs is symmetric, because (a, a) reversed is (a, a); the '
      + 'empty relation is symmetric too, since it has no pair that could fail. That is '
      + 'ordinary logic rather than a loophole: a rule with no cases to violate is not '
      + 'violated.',
    targetedMisconceptions: [`${SYM}:MC-1`, `${SYM}:MC-3`],
    source: eb(SYM, 'Identity + Misconception register — one counterexample settles it; vacuous cases hold'),
  },
  {
    conceptId: TRANS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A relation is transitive when a chain can be short-circuited: if (a, b) and (b, c) are '
      + 'both in R, then (a, c) must be too. "Is less than" is transitive — 2 < 5 and 5 < 9 '
      + 'give 2 < 9 — and the chain runs one way only, so the shared element must be the '
      + 'SECOND slot of the first pair and the FIRST slot of the second.\n\n'
      + '"Is the parent of" fails this immediately: a parent of a parent is a grandparent, not '
      + 'a parent. Transitivity is a real restriction and most everyday relations do not have '
      + 'it.\n\n'
      + 'The implication runs in one direction and is easy to reverse by accident. '
      + 'Transitivity requires that whenever the two links exist, the shortcut exists; it '
      + 'never requires the links to exist in the first place, and it says nothing about a '
      + 'relation that simply contains (a, c). So a relation with no chains at all — the '
      + 'empty relation among them — is transitive, having nothing that could fail.',
    targetedMisconceptions: [`${TRANS}:MC-1`, `${TRANS}:MC-2`],
    source: eb(TRANS, 'Identity + Misconception register — chain direction and implication direction'),
  },
  {
    conceptId: TOT, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A total order is a partial order with one extra demand: every pair of elements is '
      + 'comparable. Given any a and b, either a comes first or b does, with no third '
      + 'possibility.\n\n'
      + 'That demand is doing real work rather than restating the definition. Divisibility on '
      + '{2, 3, 4} is a genuine partial order, and 3 and 4 are simply not comparable — '
      + 'neither divides the other. Subset order does the same: {1} and {2} sit side by side '
      + 'with no relationship. "Partial" is the honest default, and totality is the '
      + 'additional promise.\n\n'
      + 'It is also not a promise about numbers. Alphabetical order on words is total, and '
      + 'ordering strings by length is not — two different four-letter words tie, and a tie '
      + 'is exactly the failure of comparability. Any set can carry a total order provided '
      + 'the rule you choose can separate every pair.',
    targetedMisconceptions: [`${TOT}:MC-1`, `${TOT}:MC-2`],
    source: eb(TOT, 'Identity + Misconception register — totality is a real extra demand, and not about numbers'),
  },
  {
    conceptId: UNION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A ∪ B collects everything in A, in B, or in both. With A = {1, 2, 3} and B = {3, 4, 5} '
      + 'the union is {1, 2, 3, 4, 5} — five elements, not six, because 3 is in the set once '
      + 'and a set has no way to hold it twice.\n\n'
      + 'That is why |A ∪ B| is generally NOT |A| + |B|. Adding the sizes counts every shared '
      + 'element twice, and the repair is to subtract the overlap: |A ∪ B| = |A| + |B| − '
      + '|A ∩ B|, which gives 3 + 3 − 1 = 5. The sum is right only when the sets are '
      + 'disjoint.\n\n'
      + 'Union is the "or" operation, and it is the inclusive or — in or in both, never one '
      + 'but not the other. Everyday speech blurs this ("tea or coffee" usually means pick '
      + 'one), which is exactly why the union of two sets is at least as big as either of '
      + 'them, while their intersection is at most as big as either.',
    targetedMisconceptions: [`${UNION}:MC-1`, `${UNION}:MC-2`],
    source: eb(UNION, 'Identity + Misconception register — inclusive or, and sizes do not simply add'),
  },
  {
    conceptId: SOPS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'Four operations build every set expression: union (∪) for "or", intersection (∩) for '
      + '"and", difference (\\) for "in the first but not the second", and complement (ᶜ) for '
      + '"everything outside". Together they behave like an algebra, with laws you can rely '
      + 'on — associativity, distributivity, De Morgan\'s.\n\n'
      + 'Two of the four carry a warning the other two do not. Complement means nothing until '
      + 'a universal set is fixed, and difference is not symmetric — A \\ B and B \\ A are '
      + 'different sets. Union and intersection are safe to reorder; those two are not.\n\n'
      + 'Because of that, grouping changes the answer in mixed expressions. A ∪ (B ∩ C) is '
      + 'not A ∪ B ∩ C read left to right, and (A \\ B) \\ C is not A \\ (B \\ C). Brackets in '
      + 'set algebra are load-bearing in exactly the way they are in arithmetic, and the '
      + 'habit of writing them is cheaper than the habit of recovering from not writing '
      + 'them.',
    targetedMisconceptions: [`${SOPS}:MC-1`, `${SOPS}:MC-2`],
    source: eb(SOPS, 'Identity + Misconception register — the survey, plus grouping and non-symmetry'),
  },
  {
    conceptId: UNC, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A set is uncountable when it cannot be put in a list — not even an infinite one. It is '
      + 'a statement about failure to enumerate, and it has nothing to do with being big in '
      + 'any everyday sense.\n\n'
      + 'That distinction is the whole idea. The rationals look enormously denser than the '
      + 'integers, and they are still countable: there is a listing that catches every one. '
      + 'The reals are not, and Cantor\'s diagonal argument shows why. Take ANY proposed '
      + 'list of reals and build a number differing from the first in its first decimal '
      + 'place, from the second in its second, and so on. The result cannot be anywhere on '
      + 'that list, because it is wrong in the relevant digit at every position.\n\n'
      + 'The argument therefore does not defeat one clever listing; it defeats every listing '
      + 'at once, which is what makes it a proof rather than a difficulty. And it does not '
      + 'apply to countable sets — run it on a genuine listing of the rationals and the '
      + 'number you construct is real but irrational, so it was never required to be on the '
      + 'list.',
    targetedMisconceptions: [`${UNC}:MC-1`, `${UNC}:MC-2`],
    source: eb(UNC, 'Identity + Misconception register — not "very large"; the diagonal defeats every list'),
  },
  {
    conceptId: SIND, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'Strong induction lets the inductive step assume the statement for ALL values up to n, '
      + 'rather than for n alone. Proving every integer above 1 has a prime factorisation '
      + 'needs it: n factors as a × b with both smaller than n, and you need the claim for '
      + 'both, not just for n − 1.\n\n'
      + 'Despite the name it is not more powerful. Anything provable by strong induction is '
      + 'provable by ordinary induction — apply ordinary induction to the statement "it holds '
      + 'for everything up to n" and the two become the same argument. Strong is a comment on '
      + 'convenience, not on reach, and the word oversells it.\n\n'
      + 'So the choice is about what the step actually needs. If it reaches back only one '
      + 'place, ordinary induction is the clearer write-up; if it reaches back an unpredictable '
      + 'distance, strong induction saves the bookkeeping. Either way the base cases must '
      + 'cover every value the step cannot reach — a step that drops back two places needs '
      + 'two base cases, and forgetting the second leaves a real hole.',
    targetedMisconceptions: [`${SIND}:MC-1`, `${SIND}:MC-3`],
    source: eb(SIND, 'Identity + Misconception register — not more powerful; base cases must cover the reach'),
  },
  {
    conceptId: UNIQ, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A uniqueness proof shows there is at most one object with a property, and the standard '
      + 'move is to suppose there are two — call them x and y — and derive that x = y. For '
      + 'the identity element of a group: if e and f both act as identities then e = ef = f, '
      + 'and the supposed two collapse into one.\n\n'
      + 'Notice what that argument never did: it never produced an identity. Uniqueness and '
      + 'existence are separate claims and need separate work. "There is at most one solution" '
      + 'is entirely compatible with there being none — the equation x² = −1 has at most one '
      + 'real solution and has no real solution at all.\n\n'
      + 'The reverse gap is the more common one. Finding an object shows existence and says '
      + 'nothing about whether a second one exists, however hard the first was to find. That '
      + 'is why "there exists exactly one" is proved in two halves, and why a proof that '
      + 'stops after exhibiting one object has finished only the easier half.',
    targetedMisconceptions: [`${UNIQ}:MC-1`, `${UNIQ}:MC-2`],
    source: eb(UNIQ, 'Identity + Misconception register — existence and uniqueness are separate halves'),
  },
]

export const MATHEMATICS_ORDERS_PROOFS_PROBES: SeedProbe[] = [
  // --- math.found.symmetric-relation ------------------------------------------
  {
    conceptId: SYM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Which relation on people is symmetric?',
    choices: [
      { text: '"is a sibling of" — if a is b\'s sibling, b is a\'s', isCorrect: true },
      { text: '"is the parent of" — parenthood connects two people', isCorrect: false },
      { text: '"is older than" — age compares both ways', isCorrect: false },
    ],
    targetedMisconceptions: [`${SYM}:MC-1`],
    source: eb(SYM, 'Assessment gate — the reversed pair must also be present'),
  },
  {
    conceptId: SYM, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'R holds a hundred mirrored pairs and one unmirrored pair. Is R symmetric?',
    choices: [
      { text: 'No — symmetry is a claim about every pair, so one counterexample settles it', isCorrect: true },
      { text: 'Yes, almost entirely — one exception out of a hundred is negligible', isCorrect: false, misconceptionId: `${SYM}:MC-1` },
      { text: 'Yes — most of the relation mirrors correctly', isCorrect: false, misconceptionId: `${SYM}:MC-1` },
    ],
    targetedMisconceptions: [`${SYM}:MC-1`],
    source: eb(SYM, 'Misconception register — no partial credit in a universal claim'),
  },
  {
    conceptId: SYM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is the empty relation symmetric?',
    choices: [
      { text: 'Yes — it has no pair that could fail, and a rule with no cases to violate is not violated', isCorrect: true },
      { text: 'No — it contains no mirrored pairs', isCorrect: false, misconceptionId: `${SYM}:MC-3` },
      { text: 'Undefined — symmetry needs at least one pair to assess', isCorrect: false, misconceptionId: `${SYM}:MC-3` },
    ],
    targetedMisconceptions: [`${SYM}:MC-3`],
    source: eb(SYM, 'Transfer probe — vacuous satisfaction is ordinary logic'),
  },

  // --- math.found.transitive-relation ------------------------------------------
  {
    conceptId: TRANS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Which relation is transitive?',
    choices: [
      { text: '"is less than" — 2 < 5 and 5 < 9 give 2 < 9', isCorrect: true },
      { text: '"is the parent of" — a parent of a parent is still family', isCorrect: false, misconceptionId: `${TRANS}:MC-1` },
      { text: '"is a sibling of" — siblinghood chains through the family', isCorrect: false, misconceptionId: `${TRANS}:MC-1` },
    ],
    targetedMisconceptions: [`${TRANS}:MC-1`],
    source: eb(TRANS, 'Assessment gate — the chain must short-circuit'),
  },
  {
    conceptId: TRANS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For transitivity, which two pairs must combine?',
    choices: [
      { text: '(a, b) and (b, c) — the shared element is second in one and first in the other', isCorrect: true },
      { text: '(a, b) and (c, b) — both must point at the same element', isCorrect: false, misconceptionId: `${TRANS}:MC-1` },
      { text: '(a, b) and (b, a) — the pair and its reverse', isCorrect: false, misconceptionId: `${TRANS}:MC-1` },
    ],
    targetedMisconceptions: [`${TRANS}:MC-1`],
    source: eb(TRANS, 'Misconception register — chain-direction reversal'),
  },
  {
    conceptId: TRANS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does transitivity require that the linking pairs actually exist?',
    choices: [
      { text: 'No — it only requires the shortcut whenever the links are present, so a relation with no chains is transitive', isCorrect: true },
      { text: 'Yes — a transitive relation must contain chains to be transitive', isCorrect: false, misconceptionId: `${TRANS}:MC-3` },
      { text: 'Yes — otherwise there is nothing to short-circuit', isCorrect: false, misconceptionId: `${TRANS}:MC-3` },
    ],
    targetedMisconceptions: [`${TRANS}:MC-2`, `${TRANS}:MC-3`],
    source: eb(TRANS, 'Transfer probe — the implication runs one way'),
  },

  // --- math.found.total-order ---------------------------------------------------
  {
    conceptId: TOT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What does a total order demand that a partial order does not?',
    choices: [
      { text: 'That every pair of elements is comparable', isCorrect: true },
      { text: 'That the elements are numbers', isCorrect: false, misconceptionId: `${TOT}:MC-2` },
      { text: 'Nothing — every partial order is already total', isCorrect: false, misconceptionId: `${TOT}:MC-1` },
    ],
    targetedMisconceptions: [`${TOT}:MC-1`, `${TOT}:MC-2`],
    source: eb(TOT, 'Assessment gate — comparability of every pair'),
  },
  {
    conceptId: TOT, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is divisibility on {2, 3, 4} a total order?',
    choices: [
      { text: 'No — neither 3 nor 4 divides the other, so that pair is incomparable', isCorrect: true },
      { text: 'Yes — any order on numbers is total', isCorrect: false, misconceptionId: `${TOT}:MC-2` },
      { text: 'Yes — every partial order on a finite set is total', isCorrect: false, misconceptionId: `${TOT}:MC-1` },
    ],
    targetedMisconceptions: [`${TOT}:MC-1`, `${TOT}:MC-2`],
    source: eb(TOT, 'Misconception register — totality is a real extra demand'),
  },
  {
    conceptId: TOT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is ordering words by LENGTH a total order?',
    choices: [
      { text: 'No — two different four-letter words tie, and a tie is a failure of comparability', isCorrect: true },
      { text: 'Yes — lengths are numbers and numbers are totally ordered', isCorrect: false, misconceptionId: `${TOT}:MC-2` },
      { text: 'No — total orders apply only to numbers, not words', isCorrect: false, misconceptionId: `${TOT}:MC-2` },
    ],
    targetedMisconceptions: [`${TOT}:MC-2`],
    source: eb(TOT, 'Transfer probe — alphabetical is total, by-length is not'),
  },

  // --- math.found.union ----------------------------------------------------------
  {
    conceptId: UNION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'A = {1, 2, 3} and B = {3, 4, 5}. What is A ∪ B?',
    choices: [
      { text: '{1, 2, 3, 4, 5}', isCorrect: true },
      { text: '{3} — the elements in both', isCorrect: false, misconceptionId: `${UNION}:MC-2` },
      { text: '{1, 2, 3, 3, 4, 5} — all six elements', isCorrect: false, misconceptionId: `${UNION}:MC-1` },
    ],
    targetedMisconceptions: [`${UNION}:MC-1`, `${UNION}:MC-2`],
    source: eb(UNION, 'Assessment gate — union is "or", and sets hold nothing twice'),
  },
  {
    conceptId: UNION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'With those sets, |A| = 3 and |B| = 3. Why is |A ∪ B| not 6?',
    choices: [
      { text: 'Adding the sizes counts 3 twice; |A ∪ B| = |A| + |B| − |A ∩ B| = 5', isCorrect: true },
      { text: 'It is 6 — the sizes simply add', isCorrect: false, misconceptionId: `${UNION}:MC-1` },
      { text: 'Because union always loses one element', isCorrect: false, misconceptionId: `${UNION}:MC-1` },
    ],
    targetedMisconceptions: [`${UNION}:MC-1`],
    source: eb(UNION, 'Misconception register — subtract the overlap'),
  },
  {
    conceptId: UNION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'The "or" in union — is it inclusive or exclusive?',
    choices: [
      { text: 'Inclusive — in A, in B, or in both', isCorrect: true },
      { text: 'Exclusive — in one but not the other, like "tea or coffee"', isCorrect: false, misconceptionId: `${UNION}:MC-2` },
      { text: 'It depends on whether the sets overlap', isCorrect: false, misconceptionId: `${UNION}:MC-2` },
    ],
    targetedMisconceptions: [`${UNION}:MC-2`],
    source: eb(UNION, 'Transfer probe — everyday "or" is not the set-theoretic one'),
  },

  // --- math.found.set-operations ---------------------------------------------------
  {
    conceptId: SOPS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Which of the four standard set operations needs a universal set before it means anything?',
    choices: [
      { text: 'Complement', isCorrect: true },
      { text: 'Union', isCorrect: false },
      { text: 'Intersection', isCorrect: false },
    ],
    targetedMisconceptions: [`${SOPS}:MC-1`],
    source: eb(SOPS, 'Assessment gate — complement is the one that needs a universe'),
  },
  {
    conceptId: SOPS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does A ∪ (B ∩ C) mean the same as (A ∪ B) ∩ C?',
    choices: [
      { text: 'No — grouping changes the answer in mixed expressions, so the brackets are load-bearing', isCorrect: true },
      { text: 'Yes — set operations can be read left to right like addition', isCorrect: false, misconceptionId: `${SOPS}:MC-2` },
      { text: 'Yes — union and intersection distribute, so grouping is irrelevant', isCorrect: false, misconceptionId: `${SOPS}:MC-2` },
    ],
    targetedMisconceptions: [`${SOPS}:MC-2`],
    source: eb(SOPS, 'Misconception register — grouping in mixed expressions'),
  },
  {
    conceptId: SOPS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Which of the four operations is NOT symmetric in its two arguments?',
    choices: [
      { text: 'Difference — A \\ B and B \\ A are different sets', isCorrect: true },
      { text: 'Union — the order of the sets changes the result', isCorrect: false, misconceptionId: `${SOPS}:MC-3` },
      { text: 'Intersection — the first set takes priority', isCorrect: false, misconceptionId: `${SOPS}:MC-3` },
    ],
    targetedMisconceptions: [`${SOPS}:MC-3`],
    source: eb(SOPS, 'Transfer probe — difference is the asymmetric one'),
  },

  // --- math.found.uncountable-set ----------------------------------------------------
  {
    conceptId: UNC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What does it mean for a set to be uncountable?',
    choices: [
      { text: 'It cannot be put in a list, not even an infinite one', isCorrect: true },
      { text: 'It is too large to count in practice', isCorrect: false, misconceptionId: `${UNC}:MC-1` },
      { text: 'It has more elements than any finite set', isCorrect: false, misconceptionId: `${UNC}:MC-1` },
    ],
    targetedMisconceptions: [`${UNC}:MC-1`],
    source: eb(UNC, 'Assessment gate — failure to enumerate, not size'),
  },
  {
    conceptId: UNC, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'The rationals are far denser than the integers. Are they uncountable?',
    choices: [
      { text: 'No — a listing exists that catches every rational, so density is not the issue', isCorrect: true },
      { text: 'Yes — between any two there are infinitely many more', isCorrect: false, misconceptionId: `${UNC}:MC-1` },
      { text: 'Yes — they are much larger than the integers', isCorrect: false, misconceptionId: `${UNC}:MC-1` },
    ],
    targetedMisconceptions: [`${UNC}:MC-1`],
    source: eb(UNC, 'Misconception register — dense is not uncountable'),
  },
  {
    conceptId: UNC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Why does the diagonal argument prove something, rather than just defeating one bad list?',
    choices: [
      { text: 'It starts from ANY proposed list and builds a real missing from it, so it defeats every listing at once', isCorrect: true },
      { text: 'Because the lists people try are always constructed the same way', isCorrect: false, misconceptionId: `${UNC}:MC-2` },
      { text: 'Because it works on any infinite set, countable ones included', isCorrect: false, misconceptionId: `${UNC}:MC-3` },
    ],
    targetedMisconceptions: [`${UNC}:MC-2`, `${UNC}:MC-3`],
    source: eb(UNC, 'Transfer probe — the argument is universally quantified over lists'),
  },

  // --- math.found.strong-induction ----------------------------------------------------
  {
    conceptId: SIND, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What does the inductive step assume in strong induction?',
    choices: [
      { text: 'The statement for all values up to n, not just for n', isCorrect: true },
      { text: 'The statement for n only, as in ordinary induction', isCorrect: false },
      { text: 'The statement for n + 1, working backwards', isCorrect: false },
    ],
    targetedMisconceptions: [`${SIND}:MC-2`],
    source: eb(SIND, 'Assessment gate — the wider assumption'),
  },
  {
    conceptId: SIND, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Can strong induction prove statements that ordinary induction cannot?',
    choices: [
      { text: 'No — apply ordinary induction to "it holds for everything up to n" and the two become the same argument', isCorrect: true },
      { text: 'Yes — that is what "strong" refers to', isCorrect: false, misconceptionId: `${SIND}:MC-1` },
      { text: 'Yes — it reaches further back, so it settles more', isCorrect: false, misconceptionId: `${SIND}:MC-1` },
    ],
    targetedMisconceptions: [`${SIND}:MC-1`],
    source: eb(SIND, 'Misconception register — the name oversells it'),
  },
  {
    conceptId: SIND, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Your inductive step reaches back two places. How many base cases do you need?',
    choices: [
      { text: 'Two — the base cases must cover every value the step cannot reach', isCorrect: true },
      { text: 'One — a single base case always suffices', isCorrect: false, misconceptionId: `${SIND}:MC-3` },
      { text: 'None — strong induction removes the need for base cases', isCorrect: false, misconceptionId: `${SIND}:MC-3` },
    ],
    targetedMisconceptions: [`${SIND}:MC-3`],
    source: eb(SIND, 'Transfer probe — base cases must cover the reach'),
  },

  // --- math.found.uniqueness-proof -----------------------------------------------------
  {
    conceptId: UNIQ, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What is the standard move in a uniqueness proof?',
    choices: [
      { text: 'Suppose two such objects exist and derive that they are equal', isCorrect: true },
      { text: 'Construct one such object explicitly', isCorrect: false, misconceptionId: `${UNIQ}:MC-1` },
      { text: 'Show that no such object exists', isCorrect: false },
    ],
    targetedMisconceptions: [`${UNIQ}:MC-1`],
    source: eb(UNIQ, 'Assessment gate — assume two, show they collapse'),
  },
  {
    conceptId: UNIQ, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'You found one object with the property, after considerable effort. Have you proved uniqueness?',
    choices: [
      { text: 'No — that proves existence and says nothing about whether a second exists', isCorrect: true },
      { text: 'Yes — finding it establishes that it is the one', isCorrect: false, misconceptionId: `${UNIQ}:MC-1` },
      { text: 'Yes, provided the search was exhaustive enough to be convincing', isCorrect: false, misconceptionId: `${UNIQ}:MC-1` },
    ],
    targetedMisconceptions: [`${UNIQ}:MC-1`],
    source: eb(UNIQ, 'Misconception register — existence is the easier half'),
  },
  {
    conceptId: UNIQ, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Can a statement have at most one solution and yet no solution at all?',
    choices: [
      { text: 'Yes — x² = −1 has at most one real solution and has none; uniqueness does not give existence', isCorrect: true },
      { text: 'No — proving uniqueness proves the object exists', isCorrect: false, misconceptionId: `${UNIQ}:MC-2` },
      { text: 'No — "at most one" already asserts there is one', isCorrect: false, misconceptionId: `${UNIQ}:MC-2` },
    ],
    targetedMisconceptions: [`${UNIQ}:MC-2`],
    source: eb(UNIQ, 'Transfer probe — the two halves are independent'),
  },
]
