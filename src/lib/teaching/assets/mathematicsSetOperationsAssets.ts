/**
 * Ninth batch — combining sets, pairing them, carving them up, and counting
 * what is left.
 *
 * One arc, in dependency order:
 *
 *   COMBINE   intersection, complement. "And" versus "or", and the fact that
 *             a complement is meaningless until somebody names the universe.
 *   PAIR      ordered-pair, cartesian-product. Where order starts to matter,
 *             and where A × B stops equalling B × A.
 *   CARVE     partition, equivalence-class. Covering is not partitioning, and
 *             two different names can label the same class.
 *   COUNT     finite-set, cardinal-arithmetic. Finite does not mean small,
 *             and infinite does not mean one size.
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

const INT = 'math.found.intersection'
const COMP = 'math.found.complement'
const OP = 'math.found.ordered-pair'
const CP = 'math.found.cartesian-product'
const PART = 'math.found.partition'
const EQC = 'math.found.equivalence-class'
const FIN = 'math.found.finite-set'
const CARD = 'math.found.cardinal-arithmetic'

export const MATHEMATICS_SET_OPERATIONS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: INT, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A ∩ B is the set of things in A AND in B — the overlap, and nothing else. If A = '
      + '{1, 2, 3} and B = {3, 4, 5}, then A ∩ B = {3}: 3 is the only member that belongs '
      + 'to both.\n\n'
      + 'Union is the "or" operation and intersection is the "and" one, so intersection is '
      + 'the SMALLER of the two — it can never be bigger than either set it came from, while '
      + 'union can never be smaller. That single sentence catches the mix-up faster than the '
      + 'symbols do, since ∩ and ∪ differ only by which way up they are.\n\n'
      + 'When two sets share nothing, A ∩ B = ∅. That is an ordinary answer and not an '
      + 'error: the sets are called disjoint, which is a property worth naming — the odd '
      + 'numbers and the even numbers are disjoint, and their intersection being empty is '
      + 'exactly what makes them a clean way to split the integers.',
    targetedMisconceptions: [`${INT}:MC-1`, `${INT}:MC-2`],
    source: eb(INT, 'Identity + Misconception register — "and" not "or"; empty is an answer'),
  },
  {
    conceptId: COMP, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'The complement of A is everything NOT in A — but everything within what? A\' means '
      + 'nothing until a universal set U is named. If A is the even numbers and U is the '
      + 'integers, A\' is the odd numbers. If U is instead the real numbers, A\' now contains '
      + '½ and π as well.\n\n'
      + 'So the universe is part of the question, not scenery. "The complement of the set of '
      + 'dogs" has no answer; "the complement of the set of dogs within the set of mammals" '
      + 'has one.\n\n'
      + 'Complementing twice returns you exactly where you started: (A\')\' = A, because '
      + 'excluding everything that was excluded leaves precisely what was there. This is why '
      + 'complement pairs so well with intersection — De Morgan\'s laws let you turn an '
      + '"and" into an "or" by complementing both sides, which is often the cheapest way to '
      + 'describe a complicated set.',
    targetedMisconceptions: [`${COMP}:MC-1`, `${COMP}:MC-2`],
    source: eb(COMP, 'Identity + Misconception register — the universal set is part of the question'),
  },
  {
    conceptId: OP, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'An ordered pair (a, b) is two things with a first and a second. The order is the '
      + 'whole point: (2, 5) and (5, 2) are different pairs, which is why they are different '
      + 'points on a graph and why the coordinates are read in a fixed order.\n\n'
      + 'This is exactly where a pair stops behaving like a set. {2, 5} and {5, 2} ARE the '
      + 'same set, because a set only records what is in it. A pair records what is in it and '
      + 'where — so round brackets and curly brackets are not two styles of writing the same '
      + 'thing.\n\n'
      + 'Equality is therefore strict on both slots at once: (a, b) = (c, d) exactly when a = '
      + 'c AND b = d. Matching one coordinate is not half a match, it is a mismatch — (2, 5) '
      + 'and (2, 7) share a first slot and are simply different pairs.',
    targetedMisconceptions: [`${OP}:MC-1`, `${OP}:MC-2`],
    source: eb(OP, 'Identity + Misconception register — a pair is not a set; equality needs both slots'),
  },
  {
    conceptId: CP, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A × B is the set of every ordered pair whose first entry comes from A and second from '
      + 'B. With A = {1, 2} and B = {x, y}, A × B = {(1,x), (1,y), (2,x), (2,y)} — four '
      + 'pairs, because each of two choices meets each of two choices. That is where |A × B| '
      + '= |A| × |B| comes from, and where the operation gets its name.\n\n'
      + 'Because the pairs are ordered, A × B is NOT the same as B × A. Here B × A contains '
      + '(x,1), which is not in A × B at all. The two sets have the same size and, unless A '
      + 'and B are equal, no members in common.\n\n'
      + 'The empty case follows from the counting rather than needing its own rule: A × ∅ = '
      + '∅, because a pair needs a second entry and there is nothing available to be one. '
      + 'Multiplying by zero choices leaves zero pairs.',
    targetedMisconceptions: [`${CP}:MC-1`, `${CP}:MC-3`],
    source: eb(CP, 'Identity + Misconception register — not commutative; the empty case is forced by counting'),
  },
  {
    conceptId: PART, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A partition cuts a set into pieces with no gaps and no overlaps. Splitting the '
      + 'integers into evens and odds is a partition: every integer lands in exactly one '
      + 'piece.\n\n'
      + 'Three conditions do the work, and dropping any one breaks it. The pieces must be '
      + 'non-empty, they must be pairwise disjoint, and their union must be the whole set. '
      + 'Covering is the weaker idea and is often mistaken for this one: {1,2,3} and {3,4} '
      + 'together cover {1,2,3,4}, but 3 is in both, so nothing has been cut — it has been '
      + 'draped.\n\n'
      + 'Disjointness has to hold for EVERY pair of pieces, not for the pairs you happened to '
      + 'check. With four pieces there are six pairs, and a single shared element among them '
      + 'is enough to disqualify the whole arrangement. The reward for that strictness is '
      + 'that "which piece is x in?" always has exactly one answer.',
    targetedMisconceptions: [`${PART}:MC-1`, `${PART}:MC-2`],
    source: eb(PART, 'Identity + Misconception register — covering is not partitioning'),
  },
  {
    conceptId: EQC, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'Given an equivalence relation, the class [a] gathers everything related to a. Under '
      + '"same remainder when divided by 3", [1] is {…, 1, 4, 7, 10, …} — every integer one '
      + 'more than a multiple of 3.\n\n'
      + 'Every element is in its own class, because an equivalence relation is reflexive: a '
      + 'is related to a, so a ∈ [a] always. No element is ever left classless.\n\n'
      + 'The point that takes longest to accept is that one class has many names. [1] and [4] '
      + 'and [7] are the SAME SET written three ways, since 1, 4 and 7 are all related to '
      + 'each other. So [a] = [b] does not require a = b — it requires only that a and b are '
      + 'related. That is why "same remainder mod 3" produces three classes and not '
      + 'infinitely many, and why the classes always form a partition: everything is in '
      + 'exactly one, however many labels that one answers to.',
    targetedMisconceptions: [`${EQC}:MC-1`, `${EQC}:MC-2`],
    source: eb(EQC, 'Identity + Misconception register — one class, many names'),
  },
  {
    conceptId: FIN, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A set is finite when counting it stops. Formally, when its elements can be matched '
      + 'one-for-one with {1, 2, …, n} for some natural number n — which is a precise way of '
      + 'saying the count ends at some particular number.\n\n'
      + 'Finite does not mean small, and it does not mean writable. The set of atoms in the '
      + 'observable universe is finite; nobody will ever list it. Size and finiteness are '
      + 'different questions, and only the second one is about whether the counting '
      + 'terminates.\n\n'
      + 'Nor does finite mean "has a largest member". {1, ½, ¼, ⅛, …} has a largest member, '
      + '1, and is infinite. The natural numbers have a smallest member and no largest and '
      + 'are infinite. Having a boundary at one end says nothing about whether the list ever '
      + 'ends — and it is exactly that distinction which makes an infinite set possible to '
      + 'reason about at all.',
    targetedMisconceptions: [`${FIN}:MC-1`, `${FIN}:MC-2`],
    source: eb(FIN, 'Identity + Misconception register — finite is not small, and not bounded'),
  },
  {
    conceptId: CARD, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Infinite sets come in different sizes, and cardinal arithmetic is how those sizes '
      + 'combine. The smallest infinity is ℵ₀, the size of the natural numbers, and any set '
      + 'that can be listed one after another — the integers, the rationals — has exactly '
      + 'that size, however much larger it looks.\n\n'
      + 'The arithmetic does not behave like the finite kind. ℵ₀ + 1 = ℵ₀, and ℵ₀ + ℵ₀ = ℵ₀, '
      + 'and ℵ₀ × ℵ₀ = ℵ₀. Adding a guest to a full infinite hotel works because every '
      + 'existing guest can shift along one room; nothing was created and nothing was lost.\n\n'
      + 'But the reals are strictly larger — Cantor\'s diagonal argument shows no listing can '
      + 'catch them all, so "infinite" is not one category. Whether there is a size strictly '
      + 'between ℵ₀ and the reals is the continuum hypothesis, and the answer is stranger '
      + 'than yes or no: it can neither be proved nor disproved from the standard axioms. '
      + 'That is a separate question from countability, which Cantor settled outright.',
    targetedMisconceptions: [`${CARD}:MC-1`, `${CARD}:MC-2`],
    source: eb(CARD, 'Identity + Misconception register — infinities differ; CH is not the countability question'),
  },
]

export const MATHEMATICS_SET_OPERATIONS_PROBES: SeedProbe[] = [
  // --- math.found.intersection -----------------------------------------------
  {
    conceptId: INT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'A = {1, 2, 3} and B = {3, 4, 5}. What is A ∩ B?',
    choices: [
      { text: '{3} — the only element in both', isCorrect: true },
      { text: '{1, 2, 3, 4, 5} — everything in either', isCorrect: false, misconceptionId: `${INT}:MC-1` },
      { text: '{1, 2, 4, 5} — everything not shared', isCorrect: false },
    ],
    targetedMisconceptions: [`${INT}:MC-1`],
    source: eb(INT, 'Assessment gate — intersection is "and"'),
  },
  {
    conceptId: INT, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'The evens and the odds have empty intersection. What does that tell you?',
    choices: [
      { text: 'They are disjoint — an ordinary and useful fact, not an error', isCorrect: true },
      { text: 'One of the two sets must have been written down wrongly', isCorrect: false, misconceptionId: `${INT}:MC-2` },
      { text: 'The intersection is undefined when nothing is shared', isCorrect: false, misconceptionId: `${INT}:MC-2` },
    ],
    targetedMisconceptions: [`${INT}:MC-2`],
    source: eb(INT, 'Misconception register — an empty intersection is an answer'),
  },
  {
    conceptId: INT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Can A ∩ B ever have more elements than A?',
    choices: [
      { text: 'No — every element of the intersection is already in A, so it is at most as large', isCorrect: true },
      { text: 'Yes, when B is much larger than A', isCorrect: false, misconceptionId: `${INT}:MC-1` },
      { text: 'Yes, when the sets overlap heavily', isCorrect: false, misconceptionId: `${INT}:MC-1` },
    ],
    targetedMisconceptions: [`${INT}:MC-1`],
    source: eb(INT, 'Transfer probe — intersection is the smaller operation'),
  },

  // --- math.found.complement --------------------------------------------------
  {
    conceptId: COMP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'A is the even integers and the universal set is the integers. What is A\'?',
    choices: [
      { text: 'The odd integers', isCorrect: true },
      { text: 'The negative integers', isCorrect: false },
      { text: 'The empty set — evens have no opposite', isCorrect: false },
    ],
    targetedMisconceptions: [`${COMP}:MC-1`],
    source: eb(COMP, 'Assessment gate — complement within a stated universe'),
  },
  {
    conceptId: COMP, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Someone asks for "the complement of the set of dogs". What is missing?',
    choices: [
      { text: 'The universal set — within mammals the answer differs from within all animals', isCorrect: true },
      { text: 'Nothing — the complement is everything that is not a dog', isCorrect: false, misconceptionId: `${COMP}:MC-1` },
      { text: 'The number of dogs', isCorrect: false },
    ],
    targetedMisconceptions: [`${COMP}:MC-1`],
    source: eb(COMP, 'Misconception register — no universe, no complement'),
  },
  {
    conceptId: COMP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'What is (A\')\'?',
    choices: [
      { text: 'A — excluding everything that was excluded leaves what was there', isCorrect: true },
      { text: 'The universal set', isCorrect: false, misconceptionId: `${COMP}:MC-2` },
      { text: 'The empty set', isCorrect: false, misconceptionId: `${COMP}:MC-2` },
    ],
    targetedMisconceptions: [`${COMP}:MC-2`],
    source: eb(COMP, 'Transfer probe — complementing twice returns you'),
  },

  // --- math.found.ordered-pair ------------------------------------------------
  {
    conceptId: OP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is (2, 5) the same as (5, 2)?',
    choices: [
      { text: 'No — the order is part of the pair', isCorrect: true },
      { text: 'Yes — both contain 2 and 5', isCorrect: false, misconceptionId: `${OP}:MC-1` },
      { text: 'Yes, unless they are plotted on a graph', isCorrect: false, misconceptionId: `${OP}:MC-1` },
    ],
    targetedMisconceptions: [`${OP}:MC-1`],
    source: eb(OP, 'Assessment gate — order is part of the identity'),
  },
  {
    conceptId: OP, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: '{2, 5} and {5, 2} are the same set. Why does the same not hold for (2, 5) and (5, 2)?',
    choices: [
      { text: 'A set records only what is in it; a pair records what is in it and where', isCorrect: true },
      { text: 'It does hold — round and curly brackets are two styles of the same thing', isCorrect: false, misconceptionId: `${OP}:MC-1` },
      { text: 'Because pairs may not contain repeated elements', isCorrect: false },
    ],
    targetedMisconceptions: [`${OP}:MC-1`],
    source: eb(OP, 'Misconception register — a pair is not a set'),
  },
  {
    conceptId: OP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'When is (a, b) = (c, d)?',
    choices: [
      { text: 'When a = c AND b = d — both slots must match', isCorrect: true },
      { text: 'When a = c OR b = d — one match is enough', isCorrect: false, misconceptionId: `${OP}:MC-3` },
      { text: 'When the two pairs contain the same two values in some order', isCorrect: false, misconceptionId: `${OP}:MC-2` },
    ],
    targetedMisconceptions: [`${OP}:MC-2`, `${OP}:MC-3`],
    source: eb(OP, 'Transfer probe — equality is a conjunction'),
  },

  // --- math.found.cartesian-product --------------------------------------------
  {
    conceptId: CP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'A = {1, 2} and B = {x, y}. How many elements does A × B have?',
    choices: [
      { text: 'Four — each of two choices meets each of two choices', isCorrect: true },
      { text: 'Two — the sets are the same size', isCorrect: false },
      { text: 'Six — 2 + 2 pairs plus the two originals', isCorrect: false },
    ],
    targetedMisconceptions: [`${CP}:MC-2`],
    source: eb(CP, 'Assessment gate — |A × B| = |A| × |B|'),
  },
  {
    conceptId: CP, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is A × B the same set as B × A?',
    choices: [
      { text: 'No — B × A contains (x, 1), which is not in A × B, because the pairs are ordered', isCorrect: true },
      { text: 'Yes — multiplication is commutative', isCorrect: false, misconceptionId: `${CP}:MC-1` },
      { text: 'Yes — both list all the combinations', isCorrect: false, misconceptionId: `${CP}:MC-1` },
    ],
    targetedMisconceptions: [`${CP}:MC-1`],
    source: eb(CP, 'Misconception register — the Cartesian product is not commutative'),
  },
  {
    conceptId: CP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'What is A × ∅?',
    choices: [
      { text: 'The empty set — a pair needs a second entry and there is none available', isCorrect: true },
      { text: 'A — the empty set disappears', isCorrect: false, misconceptionId: `${CP}:MC-3` },
      { text: 'Undefined — you cannot pair with nothing', isCorrect: false, misconceptionId: `${CP}:MC-3` },
    ],
    targetedMisconceptions: [`${CP}:MC-3`],
    source: eb(CP, 'Transfer probe — the empty case falls out of the counting'),
  },

  // --- math.found.partition -----------------------------------------------------
  {
    conceptId: PART, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Do {1, 2} and {3, 4} form a partition of {1, 2, 3, 4}?',
    choices: [
      { text: 'Yes — non-empty, disjoint, and together they give the whole set', isCorrect: true },
      { text: 'No — a partition must have more than two pieces', isCorrect: false },
      { text: 'No — the pieces must be the same size', isCorrect: false },
    ],
    targetedMisconceptions: [`${PART}:MC-1`],
    source: eb(PART, 'Assessment gate — the three conditions'),
  },
  {
    conceptId: PART, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Do {1, 2, 3} and {3, 4} partition {1, 2, 3, 4}?',
    choices: [
      { text: 'No — 3 is in both, so the pieces are not disjoint; they cover the set without cutting it', isCorrect: true },
      { text: 'Yes — every element appears somewhere', isCorrect: false, misconceptionId: `${PART}:MC-1` },
      { text: 'Yes — the union is the whole set, which is what matters', isCorrect: false, misconceptionId: `${PART}:MC-1` },
    ],
    targetedMisconceptions: [`${PART}:MC-1`],
    source: eb(PART, 'Misconception register — covering is not partitioning'),
  },
  {
    conceptId: PART, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A proposed partition has four pieces and you checked three pairs for overlap. Is that enough?',
    choices: [
      { text: 'No — four pieces give six pairs, and disjointness must hold for every one', isCorrect: true },
      { text: 'Yes — checking a sample is standard practice', isCorrect: false, misconceptionId: `${PART}:MC-3` },
      { text: 'Yes, provided the union is already known to be the whole set', isCorrect: false, misconceptionId: `${PART}:MC-3` },
    ],
    targetedMisconceptions: [`${PART}:MC-3`],
    source: eb(PART, 'Transfer probe — pairwise means every pair'),
  },

  // --- math.found.equivalence-class ---------------------------------------------
  {
    conceptId: EQC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Under "same remainder when divided by 3", which of these is in [1]?',
    choices: [
      { text: '7 — it leaves remainder 1, like 1 does', isCorrect: true },
      { text: '3 — it is a multiple of 3', isCorrect: false },
      { text: 'Only 1 itself', isCorrect: false, misconceptionId: `${EQC}:MC-2` },
    ],
    targetedMisconceptions: [`${EQC}:MC-2`],
    source: eb(EQC, 'Assessment gate — the class gathers everything related'),
  },
  {
    conceptId: EQC, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Under the same relation, is [1] the same set as [4]?',
    choices: [
      { text: 'Yes — 1 and 4 are related, so [1] and [4] are one class with two names', isCorrect: true },
      { text: 'No — they are labelled by different elements, so they are different classes', isCorrect: false, misconceptionId: `${EQC}:MC-2` },
      { text: 'No — 4 is larger, so its class is larger', isCorrect: false, misconceptionId: `${EQC}:MC-3` },
    ],
    targetedMisconceptions: [`${EQC}:MC-2`],
    source: eb(EQC, 'Misconception register — class equality is not element equality'),
  },
  {
    conceptId: EQC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'How many distinct classes does "same remainder mod 3" produce on the integers?',
    choices: [
      { text: 'Three — one for each possible remainder, even though there are infinitely many integers', isCorrect: true },
      { text: 'Infinitely many — one for each integer', isCorrect: false, misconceptionId: `${EQC}:MC-3` },
      { text: 'One — they are all related in the end', isCorrect: false },
    ],
    targetedMisconceptions: [`${EQC}:MC-3`],
    source: eb(EQC, 'Transfer probe — class count is not element count'),
  },

  // --- math.found.finite-set -----------------------------------------------------
  {
    conceptId: FIN, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What makes a set finite?',
    choices: [
      { text: 'Its elements can be matched one-for-one with {1, 2, …, n} for some n — the counting stops', isCorrect: true },
      { text: 'It is small enough to write out', isCorrect: false, misconceptionId: `${FIN}:MC-1` },
      { text: 'It has a largest member', isCorrect: false, misconceptionId: `${FIN}:MC-2` },
    ],
    targetedMisconceptions: [`${FIN}:MC-1`, `${FIN}:MC-2`],
    source: eb(FIN, 'Assessment gate — finiteness is about the count terminating'),
  },
  {
    conceptId: FIN, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is the set of atoms in the observable universe finite?',
    choices: [
      { text: 'Yes — nobody could list it, but the count ends at some particular number', isCorrect: true },
      { text: 'No — it is far too large to be finite', isCorrect: false, misconceptionId: `${FIN}:MC-1` },
      { text: 'No — it can never be written down', isCorrect: false, misconceptionId: `${FIN}:MC-1` },
    ],
    targetedMisconceptions: [`${FIN}:MC-1`],
    source: eb(FIN, 'Misconception register — finite is not small or writable'),
  },
  {
    conceptId: FIN, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: '{1, ½, ¼, ⅛, …} has a largest member, 1. Is it finite?',
    choices: [
      { text: 'No — having a boundary at one end says nothing about whether the list ends', isCorrect: true },
      { text: 'Yes — a set with a largest member must be finite', isCorrect: false, misconceptionId: `${FIN}:MC-2` },
      { text: 'Yes — the values shrink toward zero, so they run out', isCorrect: false, misconceptionId: `${FIN}:MC-2` },
    ],
    targetedMisconceptions: [`${FIN}:MC-2`],
    source: eb(FIN, 'Transfer probe — bounded is not finite'),
  },

  // --- math.found.cardinal-arithmetic ---------------------------------------------
  {
    conceptId: CARD, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What is ℵ₀ + 1?',
    choices: [
      { text: 'ℵ₀ — every guest shifts along one room and the new one fits', isCorrect: true },
      { text: 'ℵ₀ + 1, a strictly larger infinity', isCorrect: false, misconceptionId: `${CARD}:MC-2` },
      { text: 'Undefined — you cannot add to infinity', isCorrect: false, misconceptionId: `${CARD}:MC-2` },
    ],
    targetedMisconceptions: [`${CARD}:MC-2`],
    source: eb(CARD, 'Assessment gate — infinite cardinal arithmetic does not grow like finite'),
  },
  {
    conceptId: CARD, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Are the rationals and the reals the same size?',
    choices: [
      { text: 'No — the rationals can be listed and have size ℵ₀; the reals cannot, by Cantor\'s diagonal argument', isCorrect: true },
      { text: 'Yes — both are infinite, and infinite is infinite', isCorrect: false, misconceptionId: `${CARD}:MC-1` },
      { text: 'Yes — between any two reals there is a rational, so they interleave evenly', isCorrect: false, misconceptionId: `${CARD}:MC-1` },
    ],
    targetedMisconceptions: [`${CARD}:MC-1`],
    source: eb(CARD, 'Misconception register — infinite is not one size'),
  },
  {
    conceptId: CARD, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'What does the continuum hypothesis assert, and what is known about it?',
    choices: [
      { text: 'That no size sits strictly between ℵ₀ and the reals — and it can neither be proved nor disproved from the standard axioms', isCorrect: true },
      { text: 'That the reals are uncountable — which Cantor proved', isCorrect: false, misconceptionId: `${CARD}:MC-3` },
      { text: 'That every infinite set is countable — which is false', isCorrect: false, misconceptionId: `${CARD}:MC-3` },
    ],
    targetedMisconceptions: [`${CARD}:MC-3`],
    source: eb(CARD, 'Transfer probe — CH is a separate question from countability'),
  },
]
