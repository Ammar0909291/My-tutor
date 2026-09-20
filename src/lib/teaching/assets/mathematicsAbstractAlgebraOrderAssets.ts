/**
 * Fourth math.abst asset batch — group-order and symmetric-group.
 *
 * Continues serving-asset coverage for math.abst (6/36 -> 8/36). Transcribed
 * from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.abst.group-order.md and
 * math.abst.symmetric-group.md.
 *
 *   GROUPORDER   group-order — |G| (group order) and ord(g) (element
 *                order) are genuinely different quantities; not every
 *                element has order |G|; ord(g) always divides |G|.
 *   SYMGROUP     symmetric-group — S_n genuinely satisfies the group
 *                axioms (checked, not assumed); same cycle structure
 *                means conjugate; Cayley's theorem embeds, never equates.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const GROUPORDER = 'math.abst.group-order'
const SYMGROUP = 'math.abst.symmetric-group'

export const MATHEMATICS_ABSTRACT_ALGEBRA_ORDER_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: GROUPORDER, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'Two SEPARATE uses of "order" coexist. The ORDER OF THE GROUP, |G|, is simply the number of '
      + 'elements: |Z/6Z|=6, |D3|=6. The ORDER OF AN ELEMENT, ord(g), is the smallest positive '
      + 'integer k such that g^k=e; ord(e)=1 in EVERY group, with no exceptions.\n\n'
      + 'The ORBIT TABLE is the computational tool: compute g,g^2,g^3,... until reaching e; the '
      + 'step count IS ord(g). Not every element has order equal to |G| — in Z/6Z, ord(0)=1 and '
      + 'ord(2)=3, both strictly less than 6, contradicting "every element has order |G|." A '
      + 'GENERATOR is an element with ord(g)=|G|; in D3, NO element has order 6 (maximum order is '
      + '3), so D3 is not cyclic despite also having 6 elements.\n\n'
      + 'In a FINITE group, every element\'s order DIVIDES the group order: |Z/6Z|=6, observed '
      + 'orders {1,2,3,6} all divide 6. This is a usable prospective constraint, not a mere '
      + 'coincidence — an element of order 5 or 3 is IMPOSSIBLE in a group of order 8, since '
      + 'neither divides 8.',
    targetedMisconceptions: [`${GROUPORDER}:MC-1`, `${GROUPORDER}:MC-2`, `${GROUPORDER}:MC-3`],
    source: eb(GROUPORDER, 'Core Understanding — group order vs. element order are different quantities, not every element has order |G|, ord(g) divides |G|'),
  },
  {
    conceptId: SYMGROUP, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'S_n GENUINELY SATISFIES THE GROUP AXIOMS: S_n consists of ALL bijections of {1,...,n} '
      + 'under composition. CLOSURE (composing two bijections gives another), IDENTITY (the '
      + 'identity permutation), INVERSES (every bijection has one), ASSOCIATIVITY (composition is '
      + 'always associative) — all checked explicitly, never assumed from the name. Direct '
      + 'counting gives |S_n|=n!.\n\n'
      + 'CYCLE STRUCTURE determines CONJUGACY: two permutations in S_n are CONJUGATE if and only '
      + 'if they have the SAME cycle structure (the multiset of cycle lengths). In S_5, '
      + '(1 3)(2 4 5) and (1 5)(2 3 4) share the same structure (one 2-cycle, one 3-cycle), so '
      + 'they are conjugate — a structural comparison that replaces trial-and-error search for a '
      + 'conjugating element.\n\n'
      + 'CAYLEY\'S THEOREM: every finite group G embeds in S_|G| — a genuine injective copy of G '
      + 'sitting inside S_|G|, NOT necessarily an onto identification. A group of order 4 embeds '
      + 'into S_4, which has order 24 — the ambient group is genuinely larger, never equal.',
    targetedMisconceptions: [`${SYMGROUP}:MC-1`, `${SYMGROUP}:MC-2`, `${SYMGROUP}:MC-3`],
    source: eb(SYMGROUP, 'Core Understanding — S_n satisfies the group axioms by verification, cycle structure determines conjugacy, Cayley\'s theorem embeds rather than equates'),
  },
]

export const MATHEMATICS_ABSTRACT_ALGEBRA_ORDER_PROBES: SeedProbe[] = [
  // --- math.abst.group-order ----------------------------------------------------
  {
    conceptId: GROUPORDER, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is |G| the same quantity as ord(g) for a specific element g?',
    choices: [
      { text: 'No — |G| counts the group\'s total elements, while ord(g) counts the smallest positive power giving e; they answer different questions, even for the same group', isCorrect: true },
      { text: 'Yes — both notations refer to the identical quantity', isCorrect: false, misconceptionId: `${GROUPORDER}:MC-1` },
      { text: 'Yes, since "order" always means the same thing in group theory', isCorrect: false, misconceptionId: `${GROUPORDER}:MC-1` },
    ],
    targetedMisconceptions: [`${GROUPORDER}:MC-1`],
    source: eb(GROUPORDER, 'Assessment gate — the order of the group and the order of an element are genuinely different quantities'),
  },
  {
    conceptId: GROUPORDER, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does every element of a group have order equal to the group\'s own order |G|?',
    choices: [
      { text: 'No — the identity always has order 1 regardless of |G|, and most elements have strictly smaller order; only generators achieve ord(g)=|G|', isCorrect: true },
      { text: 'Yes — every element\'s order always equals |G|', isCorrect: false, misconceptionId: `${GROUPORDER}:MC-2` },
      { text: 'Yes, except in trivial groups', isCorrect: false, misconceptionId: `${GROUPORDER}:MC-2` },
    ],
    targetedMisconceptions: [`${GROUPORDER}:MC-2`],
    source: eb(GROUPORDER, 'Misconception register — not every element has order equal to the group order'),
  },
  {
    conceptId: GROUPORDER, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'If a group has order 12, could an element have order 5?',
    choices: [
      { text: 'No — ord(g) must divide |G|, and 5 does not divide 12, so an element of order 5 is impossible in this group', isCorrect: true },
      { text: 'Yes — element orders can be any positive integer regardless of |G|', isCorrect: false, misconceptionId: `${GROUPORDER}:MC-3` },
      { text: 'Yes, since the divisibility pattern is only a coincidence observed in small examples', isCorrect: false, misconceptionId: `${GROUPORDER}:MC-3` },
    ],
    targetedMisconceptions: [`${GROUPORDER}:MC-3`],
    source: eb(GROUPORDER, 'Transfer probe — ord(g) always divides |G|, a usable prospective constraint'),
  },

  // --- math.abst.symmetric-group ------------------------------------------------
  {
    conceptId: SYMGROUP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is S_n automatically a group simply by being called "the symmetric group," without checking the actual group axioms?',
    choices: [
      { text: 'No — closure, identity, inverses, and associativity must each be verified explicitly for permutations under composition, exactly like any other candidate group', isCorrect: true },
      { text: 'Yes — the name "symmetric group" already guarantees the group axioms hold', isCorrect: false, misconceptionId: `${SYMGROUP}:MC-1` },
      { text: 'Yes, since any set of bijections automatically forms a group', isCorrect: false, misconceptionId: `${SYMGROUP}:MC-1` },
    ],
    targetedMisconceptions: [`${SYMGROUP}:MC-1`],
    source: eb(SYMGROUP, 'Assessment gate — S_n\'s group axioms must be verified, never assumed automatic'),
  },
  {
    conceptId: SYMGROUP, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'To determine whether two permutations in S_n are conjugate, must you explicitly find a conjugating element by trial and error?',
    choices: [
      { text: 'No — comparing their cycle structures (the multiset of cycle lengths) is a decisive shortcut: matching structure means conjugate, with no search required', isCorrect: true },
      { text: 'Yes — conjugacy can only be confirmed by explicitly constructing a conjugating element', isCorrect: false, misconceptionId: `${SYMGROUP}:MC-2` },
      { text: 'Yes, since cycle structure is unrelated to conjugacy', isCorrect: false, misconceptionId: `${SYMGROUP}:MC-2` },
    ],
    targetedMisconceptions: [`${SYMGROUP}:MC-2`],
    source: eb(SYMGROUP, 'Misconception register — same cycle structure means conjugate, a structural shortcut replacing search'),
  },
  {
    conceptId: SYMGROUP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does Cayley\'s theorem mean a finite group G literally EQUALS some S_n?',
    choices: [
      { text: 'No — it means G embeds injectively into S_|G|, a genuine copy sitting inside a possibly much larger ambient group (e.g. order-4 G embeds in order-24 S_4)', isCorrect: true },
      { text: 'Yes — Cayley\'s theorem asserts a literal equality between G and some S_n', isCorrect: false, misconceptionId: `${SYMGROUP}:MC-3` },
      { text: 'Yes, since embedding and equality mean the same thing in group theory', isCorrect: false, misconceptionId: `${SYMGROUP}:MC-3` },
    ],
    targetedMisconceptions: [`${SYMGROUP}:MC-3`],
    source: eb(SYMGROUP, 'Transfer probe — Cayley\'s theorem embeds, never equates'),
  },
]
