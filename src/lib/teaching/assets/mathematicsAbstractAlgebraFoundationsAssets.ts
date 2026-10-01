/**
 * First math.abst asset batch — algebraic-structure and binary-operation.
 *
 * Opens serving-asset coverage for math.abst (0/36 -> 2/36). Transcribed
 * from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.abst.algebraic-structure.md and
 * math.abst.binary-operation.md.
 *
 *   ALGSTRUCT   algebraic-structure — a structure is set PLUS operation,
 *               never the set alone; one set supports unlimited distinct
 *               structures; axioms are verified from operation behavior
 *               alone.
 *   BINOP       binary-operation — closure is the entire defining
 *               requirement; associativity/commutativity/identity/inverses
 *               are optional extras, never part of the definition.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const ALGSTRUCT = 'math.abst.algebraic-structure'
const BINOP = 'math.abst.binary-operation'

export const MATHEMATICS_ABSTRACT_ALGEBRA_FOUNDATIONS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: ALGSTRUCT, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'An algebraic structure is a SET paired with one or more operations satisfying specified '
      + 'axioms — closure, associativity, identity, inverses, commutativity, and so on. The '
      + 'structure is the PAIR (set, operation), NEVER the set in isolation.\n\n'
      + 'The SAME underlying set can carry MULTIPLE, genuinely different algebraic structures: '
      + '(Z,+) and (Z,×) share the identical set Z, yet behave differently under the inverse '
      + 'axiom — every integer has an additive inverse (-n), but only 1 and -1 have a '
      + 'multiplicative inverse within Z. There is NO upper limit on how many distinct structures '
      + 'a single set can support: a*b=a+b+1 on Z (identity e=-1) is a THIRD, equally valid '
      + 'structure on the identical set.\n\n'
      + 'Structural axioms are verified PURELY from the OPERATION\'s behavior, never from any '
      + 'deeper "nature" of the elements. For strings under concatenation, closure, '
      + 'associativity, and identity (the empty string) can all be confirmed without any '
      + 'philosophical understanding of what a string "really is" — the same style of check '
      + 'applies identically to numbers, matrices, functions, or symbols.',
    targetedMisconceptions: [`${ALGSTRUCT}:MC-1`, `${ALGSTRUCT}:MC-2`, `${ALGSTRUCT}:MC-3`],
    source: eb(ALGSTRUCT, 'Core Understanding — a structure is set plus operation, one set supports unlimited structures, axioms come from operation behavior alone'),
  },
  {
    conceptId: BINOP, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A binary operation on a set S is a function *:S×S→S that assigns to every ordered pair '
      + '(a,b) exactly one element a*b in S. The CRITICAL constraint is CLOSURE: the result a*b '
      + 'must lie IN S for EVERY pair, with no exceptions. Subtraction is a binary operation on Z '
      + '(every difference of integers is an integer) but NOT on N={1,2,3,...} (since 2-5=-3∉N) — '
      + 'the SAME rule, applied to a DIFFERENT set, gives a genuinely different answer.\n\n'
      + 'ASSOCIATIVITY, COMMUTATIVITY, the existence of an IDENTITY, and the existence of INVERSES '
      + 'are ADDITIONAL properties an operation MAY OR MAY NOT have — NEVER part of the definition '
      + 'of a binary operation itself. Matrix multiplication and function composition are '
      + 'perfectly valid binary operations (closed) despite being NON-commutative; rejecting them '
      + 'as "not binary operations" because AB≠BA confuses an optional extra property with the '
      + 'one true requirement.\n\n'
      + 'Binary operations extend well beyond ordinary arithmetic: set intersection, string '
      + 'concatenation, and XOR are all genuine binary operations on their respective sets, '
      + 'verified by the identical closure test regardless of how unfamiliar the operation looks.',
    targetedMisconceptions: [`${BINOP}:MC-1`, `${BINOP}:MC-2`, `${BINOP}:MC-3`],
    source: eb(BINOP, 'Core Understanding — closure is the entire defining requirement, other properties are optional extras, operations extend beyond arithmetic'),
  },
]

export const MATHEMATICS_ABSTRACT_ALGEBRA_FOUNDATIONS_PROBES: SeedProbe[] = [
  // --- math.abst.algebraic-structure ------------------------------------------
  {
    conceptId: ALGSTRUCT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does naming a set, like "the integers," also tell you which algebraic structure is being discussed?',
    choices: [
      { text: 'No — a structure is the pair (set, operation); the set alone (e.g. Z under + vs. Z under ×) leaves the structure unspecified since they behave differently under the inverse axiom', isCorrect: true },
      { text: 'Yes — naming the set fully determines the algebraic structure', isCorrect: false, misconceptionId: `${ALGSTRUCT}:MC-1` },
      { text: 'Yes, since every set has exactly one natural structure', isCorrect: false, misconceptionId: `${ALGSTRUCT}:MC-1` },
    ],
    targetedMisconceptions: [`${ALGSTRUCT}:MC-1`],
    source: eb(ALGSTRUCT, 'Assessment gate — a structure is set plus operation, never the set alone'),
  },
  {
    conceptId: ALGSTRUCT, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Can a single set, like the integers, support more than two or three natural algebraic structures?',
    choices: [
      { text: 'Yes — there is no upper limit; any new well-defined operation, like a*b=a+b+1 on Z, gives a genuinely new, equally valid structure', isCorrect: true },
      { text: 'No — a set can only carry the one or two most familiar operations as valid structures', isCorrect: false, misconceptionId: `${ALGSTRUCT}:MC-2` },
      { text: 'No, since only + and × ever define genuine structures on Z', isCorrect: false, misconceptionId: `${ALGSTRUCT}:MC-2` },
    ],
    targetedMisconceptions: [`${ALGSTRUCT}:MC-2`],
    source: eb(ALGSTRUCT, 'Misconception register — one set can carry unlimited distinct structures'),
  },
  {
    conceptId: ALGSTRUCT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'To check whether a set of strings satisfies the identity axiom under concatenation, do you need to first understand what a string fundamentally "is"?',
    choices: [
      { text: 'No — axioms are verified purely from the operation\'s behavior (e.g. the empty string leaves any string unchanged under concatenation), with no reference to the elements\' deeper nature', isCorrect: true },
      { text: 'Yes — some philosophical grasp of what a string "is" is required before verifying any axiom', isCorrect: false, misconceptionId: `${ALGSTRUCT}:MC-3` },
      { text: 'Yes, since axiom checks differ fundamentally depending on the type of element involved', isCorrect: false, misconceptionId: `${ALGSTRUCT}:MC-3` },
    ],
    targetedMisconceptions: [`${ALGSTRUCT}:MC-3`],
    source: eb(ALGSTRUCT, 'Transfer probe — axioms are verified from operation behavior alone'),
  },

  // --- math.abst.binary-operation ----------------------------------------------
  {
    conceptId: BINOP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is subtraction a binary operation on the natural numbers N={1,2,3,...}?',
    choices: [
      { text: 'No — closure fails: 2-5=-3 is not in N, so subtraction is not a binary operation on N (though it is one on Z)', isCorrect: true },
      { text: 'Yes — subtraction is always a binary operation on any set of numbers', isCorrect: false, misconceptionId: `${BINOP}:MC-1` },
      { text: 'Yes, since it works for most pairs of natural numbers', isCorrect: false, misconceptionId: `${BINOP}:MC-1` },
    ],
    targetedMisconceptions: [`${BINOP}:MC-1`],
    source: eb(BINOP, 'Assessment gate — closure is the entire defining requirement, checked for every pair'),
  },
  {
    conceptId: BINOP, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does an operation have to satisfy a*b=b*a to count as a binary operation?',
    choices: [
      { text: 'No — commutativity is an optional extra property; matrix multiplication is closed and non-commutative yet is still a perfectly valid binary operation', isCorrect: true },
      { text: 'Yes — commutativity is required by the definition of a binary operation', isCorrect: false, misconceptionId: `${BINOP}:MC-2` },
      { text: 'Yes, since matrix multiplication therefore cannot be a binary operation', isCorrect: false, misconceptionId: `${BINOP}:MC-2` },
    ],
    targetedMisconceptions: [`${BINOP}:MC-2`],
    source: eb(BINOP, 'Misconception register — commutativity, associativity, identity, inverses are optional, never required'),
  },
  {
    conceptId: BINOP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Are set intersection, string concatenation, and XOR genuine binary operations?',
    choices: [
      { text: 'Yes — each satisfies the identical closure test on its respective set, regardless of looking unlike ordinary arithmetic', isCorrect: true },
      { text: 'No — only the familiar arithmetic operations (+, -, ×, ÷) qualify as binary operations', isCorrect: false, misconceptionId: `${BINOP}:MC-3` },
      { text: 'No, since none of them produce a numeric result', isCorrect: false, misconceptionId: `${BINOP}:MC-3` },
    ],
    targetedMisconceptions: [`${BINOP}:MC-3`],
    source: eb(BINOP, 'Transfer probe — binary operations extend well beyond arithmetic, verified by the identical closure test'),
  },
]
