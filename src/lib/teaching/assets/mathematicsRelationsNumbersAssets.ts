/**
 * Tenth batch — relations, the sets you build FROM sets, two number kinds,
 * and the proof shape that depends on Batch 9's partition.
 *
 *   RELATE     relation, reflexive-relation, hasse-diagram. A relation is a
 *              SET of pairs, not a rule — which is why most relations have
 *              no formula and why "reflexive" means the whole diagonal, not
 *              some of it.
 *   BUILD      set-difference, power-set. Difference is the operation that
 *              is NOT symmetric, and the power set is where the empty set
 *              stops being a curiosity and starts being an element.
 *   NUMBER     irrational-numbers, ordinal-number. Irrational is not
 *              imprecise; ordinals are not cardinals and do not commute.
 *   PROVE      proof-by-cases. Its only real obligation is exhaustiveness,
 *              which is precisely what Batch 9's partition entry supplies.
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

const REL = 'math.found.relation'
const REFL = 'math.found.reflexive-relation'
const HASSE = 'math.found.hasse-diagram'
const SDIFF = 'math.found.set-difference'
const PSET = 'math.found.power-set'
const IRR = 'math.found.irrational-numbers'
const ORD = 'math.found.ordinal-number'
const PCASE = 'math.found.proof-by-cases'

export const MATHEMATICS_RELATIONS_NUMBERS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: REL, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A relation from A to B is any set of ordered pairs drawn from A × B. That is the '
      + 'whole definition, and the word ANY is carrying most of the weight: you may simply '
      + 'list which pairs are in it — {(1,x), (3,y)} is a perfectly good relation — with no '
      + 'formula, no pattern and no reason.\n\n'
      + 'So a relation is not a machine and not a rule. A rule is one convenient way to '
      + 'DESCRIBE a relation when one happens to exist, and most relations on a finite set '
      + 'have none; there are simply too many of them for the short descriptions to go '
      + 'round.\n\n'
      + 'A function is the special case where each input appears in exactly one pair. '
      + 'Relations are not required to be that well behaved: "is a sibling of" pairs one '
      + 'person with several, and "was born in the same year as" pairs almost everyone with '
      + 'almost everyone. Both are relations, and neither is a function.',
    targetedMisconceptions: [`${REL}:MC-1`, `${REL}:MC-3`],
    source: eb(REL, 'Identity + Misconception register — a set of pairs, not a rule, not a function'),
  },
  {
    conceptId: REFL, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A relation on A is reflexive when EVERY element is related to itself: (a, a) ∈ R for '
      + 'all a in A. "Is the same age as" is reflexive; "is older than" is not, because '
      + 'nobody is older than themselves.\n\n'
      + 'Every is the load-bearing word. On {1, 2, 3} a relation containing (1,1) and (2,2) '
      + 'but not (3,3) is NOT reflexive — it is not "mostly reflexive" or "reflexive except '
      + 'for 3". One missing self-pair breaks the property outright, which is why checking '
      + 'means going through the whole set rather than seeing a couple of self-pairs and '
      + 'being satisfied.\n\n'
      + 'Reflexive is also a separate question from symmetric. Symmetry asks whether (a,b) '
      + 'forces (b,a); reflexivity asks only about pairs where both slots are the same '
      + 'element, and says nothing whatsoever about the rest. A relation can have either, '
      + 'both, or neither.',
    targetedMisconceptions: [`${REFL}:MC-1`, `${REFL}:MC-2`],
    source: eb(REFL, 'Identity + Misconception register — every element, and independent of symmetry'),
  },
  {
    conceptId: HASSE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A Hasse diagram draws a partial order with as few edges as possible. Height carries '
      + 'the direction — higher means greater — so no arrowheads are needed, and only '
      + 'IMMEDIATE relationships are drawn.\n\n'
      + 'Everything implied is therefore left out on purpose. If a is below b and b below c, '
      + 'the diagram shows two edges and not three: the a-to-c relationship is read by '
      + 'following the path upward. Self-loops are omitted too, since a partial order relates '
      + 'every element to itself and drawing that would add a loop at every node saying '
      + 'nothing. A missing edge is not a missing relationship.\n\n'
      + 'The compensating cost is that the picture can suggest comparisons that do not exist. '
      + 'Two elements drawn at different heights with no upward path between them are '
      + 'INCOMPARABLE — that is what "partial" means, and in the divisibility order on '
      + '{2, 3, 4} neither 3 nor 4 divides the other however they happen to be positioned '
      + 'on the page.',
    targetedMisconceptions: [`${HASSE}:MC-1`, `${HASSE}:MC-2`],
    source: eb(HASSE, 'Identity + Misconception register — implied edges omitted; height is not comparability'),
  },
  {
    conceptId: SDIFF, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A \\ B is what is left of A once anything also in B is removed. With A = {1, 2, 3} and '
      + 'B = {3, 4}, A \\ B = {1, 2} — and note that 4 plays no part at all, since it was '
      + 'never in A to be taken out.\n\n'
      + 'Order matters here in a way it does not for union or intersection. B \\ A = {4}, '
      + 'which shares nothing with {1, 2}. Union and intersection are symmetric and difference '
      + 'is not, so "the difference between A and B" is an ambiguous phrase and the notation '
      + 'has to be read carefully rather than skimmed.\n\n'
      + 'Complement is the special case where you subtract from the universe: A\' is U \\ A. '
      + 'That makes difference the more general operation of the two, and it is why A \\ B can '
      + 'also be written A ∩ B\' — keep what is in A, and keep what is outside B.',
    targetedMisconceptions: [`${SDIFF}:MC-1`, `${SDIFF}:MC-2`],
    source: eb(SDIFF, 'Identity + Misconception register — not symmetric; complement is the special case'),
  },
  {
    conceptId: PSET, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'The power set P(A) collects every subset of A. For A = {1, 2} that is ∅, {1}, {2} and '
      + '{1, 2} — four subsets, so P(A) = {∅, {1}, {2}, {1,2}}.\n\n'
      + 'Both ends of that list are easy to leave out and both belong. ∅ is a subset of every '
      + 'set, and A is a subset of itself, so they are always members. Counting explains why: '
      + 'building a subset means deciding in or out for each of n elements, giving 2ⁿ subsets '
      + '— and 2² = 4 only if the two extreme choices, all-out and all-in, are counted like '
      + 'any other.\n\n'
      + 'That formula survives the case that looks paradoxical. P(∅) has 2⁰ = 1 element, and '
      + 'that element is ∅ itself, so P(∅) = {∅}. It is not empty: it is a set containing one '
      + 'thing, and that one thing happens to be the empty set. This is the same distinction '
      + 'as an empty box versus a box containing an empty box.',
    targetedMisconceptions: [`${PSET}:MC-1`, `${PSET}:MC-2`],
    source: eb(PSET, 'Identity + Misconception register — both extremes belong; P(∅) is not empty'),
  },
  {
    conceptId: IRR, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A number is irrational when it cannot be written as p/q for whole numbers p and q. √2 '
      + 'is the classic case, and it is not a claim about how hard the fraction is to find — '
      + 'it is proved that none exists.\n\n'
      + 'Irrational does not mean imprecise or approximate. √2 is one exact point on the '
      + 'number line, the diagonal of a unit square, and 1.41421 is an approximation of it in '
      + 'the same way 0.333 is an approximation of ⅓. The number is exact; the decimal '
      + 'writing is what runs out of room.\n\n'
      + 'Nor does a never-ending decimal make a number irrational. ⅓ = 0.333… never ends and '
      + 'is perfectly rational; what marks the irrationals is that their expansions never '
      + 'end AND never settle into a repeating block. And they are not the rare exceptions '
      + 'they look like — there are more irrationals than rationals, so a real number picked '
      + 'at random is almost certainly one.',
    targetedMisconceptions: [`${IRR}:MC-1`, `${IRR}:MC-2`],
    source: eb(IRR, 'Identity + Misconception register — exact, not approximate; repeating is the real test'),
  },
  {
    conceptId: ORD, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Ordinals answer "what position?" where cardinals answer "how many?". For finite sets '
      + 'the two agree and the distinction seems like fussiness. Past the finite they come '
      + 'apart completely.\n\n'
      + 'Keep counting 0, 1, 2, 3, … and the whole sequence has an order type, ω. Then there '
      + 'is a position after all of them, ω + 1, and then ω + 2, and eventually ω + ω. Every '
      + 'one of these describes a different WAY of being well-ordered, while all of them '
      + 'have the same size, ℵ₀ — which is exactly why ordinal and cardinal are two ideas '
      + 'and not one.\n\n'
      + 'Ordinal addition is not commutative, and the failure is easy to see rather than '
      + 'technical. 1 + ω means putting one item before an infinite queue, which is just an '
      + 'infinite queue again: 1 + ω = ω. But ω + 1 means putting an item AFTER the whole '
      + 'infinite queue, and that item has infinitely many predecessors, so ω + 1 ≠ ω. '
      + 'Position is about arrangement, and arrangement notices which end you added to.',
    targetedMisconceptions: [`${ORD}:MC-2`, `${ORD}:MC-3`],
    source: eb(ORD, 'Identity + Misconception register — order type versus size; addition does not commute'),
  },
  {
    conceptId: PCASE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'Proof by cases splits every possibility into finitely many situations and proves the '
      + 'claim separately in each. To show n² + n is always even, take n even and n odd: in '
      + 'the first case n² + n is a sum of two evens, in the second a sum of two odds, and '
      + 'both are even. Two cases, and every integer is in one of them.\n\n'
      + 'That last clause is the entire obligation. The cases must be EXHAUSTIVE, and a set '
      + 'of cases that looks thorough is not the same as one proved to cover everything — a '
      + 'proof about real numbers splitting into "positive" and "negative" has quietly '
      + 'dropped zero, and the argument establishes nothing however careful each branch is.\n\n'
      + 'Overlap, by contrast, is harmless. If a value falls into two cases, it simply gets '
      + 'proved twice, and being proved twice is not a defect. So the cases need not form a '
      + 'partition in the strict sense — they need only cover the ground, which is a weaker '
      + 'requirement than partitioning and the one place these two ideas differ.',
    targetedMisconceptions: [`${PCASE}:MC-1`, `${PCASE}:MC-2`],
    source: eb(PCASE, 'Identity + Misconception register — exhaustiveness is required, disjointness is not'),
  },
]

export const MATHEMATICS_RELATIONS_NUMBERS_PROBES: SeedProbe[] = [
  // --- math.found.relation ----------------------------------------------------
  {
    conceptId: REL, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What is a relation from A to B?',
    choices: [
      { text: 'Any set of ordered pairs drawn from A × B', isCorrect: true },
      { text: 'A rule that turns each element of A into an element of B', isCorrect: false, misconceptionId: `${REL}:MC-1` },
      { text: 'A formula linking the two sets', isCorrect: false, misconceptionId: `${REL}:MC-3` },
    ],
    targetedMisconceptions: [`${REL}:MC-1`, `${REL}:MC-3`],
    source: eb(REL, 'Assessment gate — a relation is a set of pairs'),
  },
  {
    conceptId: REL, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is {(1, x), (3, y)} a relation, given no pattern connects the pairs?',
    choices: [
      { text: 'Yes — any set of pairs qualifies; no rule is required', isCorrect: true },
      { text: 'No — a relation must be describable by a rule', isCorrect: false, misconceptionId: `${REL}:MC-3` },
      { text: 'No — 2 has been skipped, so it is incomplete', isCorrect: false, misconceptionId: `${REL}:MC-1` },
    ],
    targetedMisconceptions: [`${REL}:MC-3`],
    source: eb(REL, 'Misconception register — most relations have no rule'),
  },
  {
    conceptId: REL, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is "is a sibling of" a function?',
    choices: [
      { text: 'No — one person can be paired with several, and a function allows only one', isCorrect: true },
      { text: 'Yes — every relation is a function', isCorrect: false, misconceptionId: `${REL}:MC-1` },
      { text: 'Yes, because siblinghood is symmetric', isCorrect: false, misconceptionId: `${REL}:MC-1` },
    ],
    targetedMisconceptions: [`${REL}:MC-1`],
    source: eb(REL, 'Transfer probe — a function is the special case'),
  },

  // --- math.found.reflexive-relation ------------------------------------------
  {
    conceptId: REFL, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Which relation on people is reflexive?',
    choices: [
      { text: '"is the same age as" — everyone is the same age as themselves', isCorrect: true },
      { text: '"is older than" — age relates people', isCorrect: false },
      { text: '"is a sibling of" — it works in both directions', isCorrect: false, misconceptionId: `${REFL}:MC-2` },
    ],
    targetedMisconceptions: [`${REFL}:MC-2`],
    source: eb(REFL, 'Assessment gate — every element related to itself'),
  },
  {
    conceptId: REFL, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'On {1, 2, 3}, R contains (1,1) and (2,2) but not (3,3). Is R reflexive?',
    choices: [
      { text: 'No — reflexive requires every self-pair, and one missing breaks it outright', isCorrect: true },
      { text: 'Yes, mostly — it holds for two of the three elements', isCorrect: false, misconceptionId: `${REFL}:MC-1` },
      { text: 'Yes — some self-pairs are present, which is what reflexive means', isCorrect: false, misconceptionId: `${REFL}:MC-3` },
    ],
    targetedMisconceptions: [`${REFL}:MC-1`, `${REFL}:MC-3`],
    source: eb(REFL, 'Misconception register — a partial diagonal is not reflexive'),
  },
  {
    conceptId: REFL, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'If a relation is reflexive, does that make it symmetric?',
    choices: [
      { text: 'No — reflexivity says nothing about pairs whose two slots differ', isCorrect: true },
      { text: 'Yes — self-pairs go both ways, so the relation does too', isCorrect: false, misconceptionId: `${REFL}:MC-2` },
      { text: 'Yes — the two properties always appear together', isCorrect: false, misconceptionId: `${REFL}:MC-2` },
    ],
    targetedMisconceptions: [`${REFL}:MC-2`],
    source: eb(REFL, 'Transfer probe — the two properties are independent'),
  },

  // --- math.found.hasse-diagram -----------------------------------------------
  {
    conceptId: HASSE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Why does a Hasse diagram need no arrowheads?',
    choices: [
      { text: 'Height carries the direction — higher means greater', isCorrect: true },
      { text: 'Because the order runs both ways', isCorrect: false },
      { text: 'Because every element relates to every other', isCorrect: false, misconceptionId: `${HASSE}:MC-2` },
    ],
    targetedMisconceptions: [`${HASSE}:MC-2`],
    source: eb(HASSE, 'Assessment gate — height encodes direction'),
  },
  {
    conceptId: HASSE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'a is below b and b below c, but the diagram shows no edge from a to c. Are a and c related?',
    choices: [
      { text: 'Yes — the relationship is read by following the upward path; implied edges are omitted', isCorrect: true },
      { text: 'No — a missing edge means a missing relationship', isCorrect: false, misconceptionId: `${HASSE}:MC-1` },
      { text: 'Only if a self-loop is drawn at each node', isCorrect: false, misconceptionId: `${HASSE}:MC-1` },
    ],
    targetedMisconceptions: [`${HASSE}:MC-1`],
    source: eb(HASSE, 'Misconception register — only immediate edges are drawn'),
  },
  {
    conceptId: HASSE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'In the divisibility order on {2, 3, 4}, 3 and 4 sit at different heights. Are they comparable?',
    choices: [
      { text: 'No — neither divides the other; "partial" order means some pairs are incomparable', isCorrect: true },
      { text: 'Yes — different heights means one is greater', isCorrect: false, misconceptionId: `${HASSE}:MC-2` },
      { text: 'Yes — 4 is the larger number', isCorrect: false, misconceptionId: `${HASSE}:MC-2` },
    ],
    targetedMisconceptions: [`${HASSE}:MC-2`],
    source: eb(HASSE, 'Transfer probe — position on the page is not comparability'),
  },

  // --- math.found.set-difference ----------------------------------------------
  {
    conceptId: SDIFF, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'A = {1, 2, 3} and B = {3, 4}. What is A \\ B?',
    choices: [
      { text: '{1, 2} — remove from A anything also in B', isCorrect: true },
      { text: '{1, 2, 4} — everything not shared', isCorrect: false, misconceptionId: `${SDIFF}:MC-1` },
      { text: '{4} — what B has that A does not', isCorrect: false, misconceptionId: `${SDIFF}:MC-1` },
    ],
    targetedMisconceptions: [`${SDIFF}:MC-1`],
    source: eb(SDIFF, 'Assessment gate — what remains of A'),
  },
  {
    conceptId: SDIFF, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'With the same sets, is B \\ A the same as A \\ B?',
    choices: [
      { text: 'No — B \\ A = {4} and A \\ B = {1, 2}; they share nothing', isCorrect: true },
      { text: 'Yes — difference is symmetric like union and intersection', isCorrect: false, misconceptionId: `${SDIFF}:MC-1` },
      { text: 'Yes — both describe the difference between A and B', isCorrect: false, misconceptionId: `${SDIFF}:MC-1` },
    ],
    targetedMisconceptions: [`${SDIFF}:MC-1`],
    source: eb(SDIFF, 'Misconception register — order matters for difference'),
  },
  {
    conceptId: SDIFF, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'How does set difference relate to complement?',
    choices: [
      { text: 'Complement is the special case U \\ A, so difference is the more general operation', isCorrect: true },
      { text: 'They are unrelated operations', isCorrect: false, misconceptionId: `${SDIFF}:MC-2` },
      { text: 'Complement is the more general one; difference only works on finite sets', isCorrect: false, misconceptionId: `${SDIFF}:MC-2` },
    ],
    targetedMisconceptions: [`${SDIFF}:MC-2`],
    source: eb(SDIFF, 'Transfer probe — complement as difference from the universe'),
  },

  // --- math.found.power-set ---------------------------------------------------
  {
    conceptId: PSET, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What is P({1, 2})?',
    choices: [
      { text: '{∅, {1}, {2}, {1,2}} — all four subsets', isCorrect: true },
      { text: '{{1}, {2}} — the two single-element subsets', isCorrect: false, misconceptionId: `${PSET}:MC-1` },
      { text: '{{1}, {2}, {1,2}} — every subset except the empty one', isCorrect: false, misconceptionId: `${PSET}:MC-1` },
    ],
    targetedMisconceptions: [`${PSET}:MC-1`],
    source: eb(PSET, 'Assessment gate — both extremes are members'),
  },
  {
    conceptId: PSET, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'What is P(∅)?',
    choices: [
      { text: '{∅} — one element, and that element is the empty set', isCorrect: true },
      { text: '∅ — the empty set has no subsets', isCorrect: false, misconceptionId: `${PSET}:MC-2` },
      { text: 'Undefined — you cannot take subsets of nothing', isCorrect: false, misconceptionId: `${PSET}:MC-2` },
    ],
    targetedMisconceptions: [`${PSET}:MC-2`],
    source: eb(PSET, 'Misconception register — a box containing an empty box'),
  },
  {
    conceptId: PSET, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Why does a set with n elements have exactly 2ⁿ subsets?',
    choices: [
      { text: 'Building a subset means deciding in or out for each element — two choices, n times', isCorrect: true },
      { text: 'Because you can pair each element with every other', isCorrect: false },
      { text: 'Because n elements give n subsets, doubled for the empty and full ones', isCorrect: false, misconceptionId: `${PSET}:MC-1` },
    ],
    targetedMisconceptions: [`${PSET}:MC-1`],
    source: eb(PSET, 'Transfer probe — the counting argument behind 2^n'),
  },

  // --- math.found.irrational-numbers ------------------------------------------
  {
    conceptId: IRR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What makes a number irrational?',
    choices: [
      { text: 'It cannot be written as p/q for whole numbers p and q', isCorrect: true },
      { text: 'Its decimal expansion never ends', isCorrect: false, misconceptionId: `${IRR}:MC-2` },
      { text: 'Its exact value can only be approximated', isCorrect: false, misconceptionId: `${IRR}:MC-1` },
    ],
    targetedMisconceptions: [`${IRR}:MC-1`, `${IRR}:MC-2`],
    source: eb(IRR, 'Assessment gate — the p/q test'),
  },
  {
    conceptId: IRR, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: '⅓ = 0.333… never ends. Is it irrational?',
    choices: [
      { text: 'No — it repeats, and repeating expansions are rational; irrationals never end AND never repeat', isCorrect: true },
      { text: 'Yes — a non-terminating decimal is irrational', isCorrect: false, misconceptionId: `${IRR}:MC-2` },
      { text: 'Yes — 0.333 is only an approximation of the true value', isCorrect: false, misconceptionId: `${IRR}:MC-1` },
    ],
    targetedMisconceptions: [`${IRR}:MC-2`],
    source: eb(IRR, 'Misconception register — repeating is the real test'),
  },
  {
    conceptId: IRR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is √2 an exact number or an approximate one?',
    choices: [
      { text: 'Exact — it is one point on the line, the diagonal of a unit square; 1.41421 is the approximation', isCorrect: true },
      { text: 'Approximate — nobody can write its full value', isCorrect: false, misconceptionId: `${IRR}:MC-1` },
      { text: 'Approximate — irrational means imprecise', isCorrect: false, misconceptionId: `${IRR}:MC-1` },
    ],
    targetedMisconceptions: [`${IRR}:MC-1`],
    source: eb(IRR, 'Transfer probe — the number is exact, the writing runs out'),
  },

  // --- math.found.ordinal-number ----------------------------------------------
  {
    conceptId: ORD, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What question does an ordinal answer, as opposed to a cardinal?',
    choices: [
      { text: 'What position — cardinals answer how many', isCorrect: true },
      { text: 'How many — cardinals answer what position', isCorrect: false, misconceptionId: `${ORD}:MC-3` },
      { text: 'The same question; the two words are interchangeable', isCorrect: false, misconceptionId: `${ORD}:MC-3` },
    ],
    targetedMisconceptions: [`${ORD}:MC-3`],
    source: eb(ORD, 'Assessment gate — position versus size'),
  },
  {
    conceptId: ORD, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'ω and ω + 1 are different ordinals. Do they have different sizes?',
    choices: [
      { text: 'No — both have cardinality ℵ₀; they differ in order type, not in size', isCorrect: true },
      { text: 'Yes — ω + 1 has one more element', isCorrect: false, misconceptionId: `${ORD}:MC-3` },
      { text: 'Yes — a larger ordinal is always a larger set', isCorrect: false, misconceptionId: `${ORD}:MC-3` },
    ],
    targetedMisconceptions: [`${ORD}:MC-3`],
    source: eb(ORD, 'Misconception register — ordinal is not cardinal'),
  },
  {
    conceptId: ORD, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is 1 + ω the same as ω + 1?',
    choices: [
      { text: 'No — 1 + ω is an infinite queue with one item in front, which is just ω; ω + 1 puts an item after all of them', isCorrect: true },
      { text: 'Yes — addition is commutative', isCorrect: false, misconceptionId: `${ORD}:MC-2` },
      { text: 'Yes — both add one element to an infinite set', isCorrect: false, misconceptionId: `${ORD}:MC-2` },
    ],
    targetedMisconceptions: [`${ORD}:MC-2`],
    source: eb(ORD, 'Transfer probe — ordinal addition notices which end'),
  },

  // --- math.found.proof-by-cases ----------------------------------------------
  {
    conceptId: PCASE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'To prove n² + n is always even, which split of the integers works?',
    choices: [
      { text: 'n even and n odd — every integer is one or the other', isCorrect: true },
      { text: 'n positive and n negative', isCorrect: false, misconceptionId: `${PCASE}:MC-1` },
      { text: 'n prime and n composite', isCorrect: false, misconceptionId: `${PCASE}:MC-1` },
    ],
    targetedMisconceptions: [`${PCASE}:MC-1`],
    source: eb(PCASE, 'Assessment gate — the split must cover every integer'),
  },
  {
    conceptId: PCASE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A proof about real numbers uses the cases "positive" and "negative". What is wrong?',
    choices: [
      { text: 'Zero is in neither case, so the cases are not exhaustive and the proof establishes nothing', isCorrect: true },
      { text: 'Nothing — the two cases look thorough', isCorrect: false, misconceptionId: `${PCASE}:MC-1` },
      { text: 'The cases overlap and must be made disjoint', isCorrect: false, misconceptionId: `${PCASE}:MC-2` },
    ],
    targetedMisconceptions: [`${PCASE}:MC-1`],
    source: eb(PCASE, 'Misconception register — reasonable-looking is not exhaustive'),
  },
  {
    conceptId: PCASE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Two of your cases overlap, so some values are covered twice. Is the proof broken?',
    choices: [
      { text: 'No — those values simply get proved twice; only exhaustiveness is required', isCorrect: true },
      { text: 'Yes — the cases must form a partition, so overlap is fatal', isCorrect: false, misconceptionId: `${PCASE}:MC-2` },
      { text: 'Yes — a value proved twice may be proved inconsistently', isCorrect: false, misconceptionId: `${PCASE}:MC-2` },
    ],
    targetedMisconceptions: [`${PCASE}:MC-2`],
    source: eb(PCASE, 'Transfer probe — covering, not partitioning'),
  },
]
