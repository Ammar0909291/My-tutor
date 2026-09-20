/**
 * Fourteenth math.abst asset batch — group-isomorphism and finite-field.
 *
 * Continues serving-asset coverage for math.abst (26/36 -> 28/36).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.abst.group-isomorphism.md and
 * math.abst.finite-field.md.
 *
 *   GROUPISO    group-isomorphism — same order is necessary but never
 *               sufficient for isomorphism; a bijection alone is not an
 *               isomorphism without the homomorphism condition;
 *               isomorphic groups share structure, never literal elements.
 *   FINITEFIELD finite-field — finite fields exist only at prime-power
 *               orders, never every order; F_{p^n} for n≥2 is not Z/p^nZ;
 *               the nonzero elements of any finite field always form a
 *               cyclic group.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const GROUPISO = 'math.abst.group-isomorphism'
const FINITEFIELD = 'math.abst.finite-field'

export const MATHEMATICS_ABSTRACT_ALGEBRA_ISO_FINITE_FIELD_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: GROUPISO, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A group isomorphism φ:G→H is a BIJECTIVE group homomorphism — bijection ALONE says '
      + 'nothing about whether the group operation is respected. |G|=|H| is NECESSARY for G≅H but '
      + 'NEVER SUFFICIENT: Z/4Z and V4 both have order 4, yet Z/4Z has an element of order 4 while '
      + 'every non-identity element of V4 has order 2 — since isomorphisms preserve element '
      + 'orders, Z/4Z is NOT isomorphic to V4 despite identical size.\n\n'
      + 'A mere BIJECTION is NOT automatically an isomorphism: ψ(0)=1,ψ(1)=-1,ψ(2)=i,ψ(3)=-i is a '
      + 'genuine bijection between Z/4Z and the fourth roots of unity, yet '
      + 'ψ(1+1)=ψ(2)=i≠ψ(1)·ψ(1)=(-1)(-1)=1 — the homomorphism condition genuinely fails, so ψ '
      + 'is not an isomorphism despite being a valid bijection.\n\n'
      + 'Isomorphic groups are structurally IDENTICAL but need NOT share elements or notation — '
      + 'Z/4Z and {1,i,-1,-i} consist of genuinely different objects (integers vs. complex '
      + 'numbers), sharing only the underlying algebraic structure, never the literal element set.',
    targetedMisconceptions: [`${GROUPISO}:MC-1`, `${GROUPISO}:MC-2`, `${GROUPISO}:MC-3`],
    source: eb(GROUPISO, 'Core Understanding — same order is necessary but not sufficient, bijection alone is not isomorphism, isomorphic groups share structure not literal elements'),
  },
  {
    conceptId: FINITEFIELD, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'FINITE FIELDS EXIST ONLY AT PRIME-POWER ORDERS — a genuine restriction, unlike finite '
      + 'groups, which exist at essentially every order. A finite field\'s order must be p^n for '
      + 'some prime p and integer n≥1: there is no field with exactly 6, 10, 12, or 15 elements, '
      + 'since none of these are prime powers.\n\n'
      + 'Z/pZ IS the n=1 case; n≥2 needs a GENUINELY DIFFERENT construction. F_{p^n} for n≥2 is '
      + 'NOT Z/p^nZ: Z/4Z has zero divisors (2×2=4≡0 mod 4, yet neither factor is 0), failing even '
      + 'to be an integral domain. The genuine F_4 is instead built from polynomials over F_2 '
      + 'modulo an irreducible quadratic, a fundamentally different object sharing only the '
      + 'element COUNT.\n\n'
      + 'THE NONZERO ELEMENTS ALWAYS FORM A CYCLIC GROUP under multiplication — a nontrivial '
      + 'structural fact, not automatic for an arbitrary finite group of that order, but '
      + 'GUARANTEED for every finite field: in F_7, powers of g=3 (3,2,6,4,5,1) list ALL 6 '
      + 'nonzero elements exactly once before cycling back.',
    targetedMisconceptions: [`${FINITEFIELD}:MC-1`, `${FINITEFIELD}:MC-2`, `${FINITEFIELD}:MC-3`],
    source: eb(FINITEFIELD, 'Core Understanding — finite fields exist only at prime-power orders, F_{p^n} for n≥2 is not Z/p^nZ, the nonzero elements always form a cyclic group'),
  },
]

export const MATHEMATICS_ABSTRACT_ALGEBRA_ISO_FINITE_FIELD_PROBES: SeedProbe[] = [
  // --- math.abst.group-isomorphism -------------------------------------------------
  {
    conceptId: GROUPISO, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Are Z/4Z and V4 isomorphic? Both have order 4 — is that enough to conclude yes?',
    choices: [
      { text: 'No — same order is necessary but never sufficient; Z/4Z has an element of order 4 while V4\'s every non-identity element has order 2, a structural invariant that rules out isomorphism', isCorrect: true },
      { text: 'Yes — any two groups of the same order are automatically isomorphic', isCorrect: false, misconceptionId: `${GROUPISO}:MC-1` },
      { text: 'Yes, since element order never matters for determining isomorphism', isCorrect: false, misconceptionId: `${GROUPISO}:MC-1` },
    ],
    targetedMisconceptions: [`${GROUPISO}:MC-1`],
    source: eb(GROUPISO, 'Assessment gate — same order is necessary but not sufficient for isomorphism'),
  },
  {
    conceptId: GROUPISO, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'If a map between two groups is a bijection, is it automatically an isomorphism?',
    choices: [
      { text: 'No — the map ψ(0)=1,ψ(1)=-1,ψ(2)=i,ψ(3)=-i is a genuine bijection yet fails the homomorphism condition (ψ(1+1)≠ψ(1)·ψ(1)); an isomorphism requires bijection AND homomorphism together', isCorrect: true },
      { text: 'Yes — any bijection between two groups automatically qualifies as an isomorphism', isCorrect: false, misconceptionId: `${GROUPISO}:MC-2` },
      { text: 'Yes, since preserving element count is the entire content of being an isomorphism', isCorrect: false, misconceptionId: `${GROUPISO}:MC-2` },
    ],
    targetedMisconceptions: [`${GROUPISO}:MC-2`],
    source: eb(GROUPISO, 'Misconception register — a bijection alone is not an isomorphism, the homomorphism condition must also be verified'),
  },
  {
    conceptId: GROUPISO, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'If G≅H, do G and H have to share the same elements or operation symbol?',
    choices: [
      { text: 'No — isomorphic groups share only the underlying algebraic structure; Z/4Z and {1,i,-1,-i} consist of genuinely different objects (integers vs. complex numbers)', isCorrect: true },
      { text: 'Yes — isomorphic groups must literally consist of the same elements', isCorrect: false, misconceptionId: `${GROUPISO}:MC-3` },
      { text: 'Yes, since the isomorphism relation implies a shared operation symbol as well as shared elements', isCorrect: false, misconceptionId: `${GROUPISO}:MC-3` },
    ],
    targetedMisconceptions: [`${GROUPISO}:MC-3`],
    source: eb(GROUPISO, 'Transfer probe — isomorphic groups share structure, never literal elements or notation'),
  },

  // --- math.abst.finite-field -------------------------------------------------------
  {
    conceptId: FINITEFIELD, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does a finite field exist for every positive integer order, the way finite groups do?',
    choices: [
      { text: 'No — a finite field\'s order must be p^n for a prime p and integer n≥1; there is no field of order 6, 10, or 12, since none of these are prime powers', isCorrect: true },
      { text: 'Yes — a finite field exists at every positive integer order, exactly like finite groups', isCorrect: false, misconceptionId: `${FINITEFIELD}:MC-1` },
      { text: 'Yes, since the field axioms place no restriction on achievable orders', isCorrect: false, misconceptionId: `${FINITEFIELD}:MC-1` },
    ],
    targetedMisconceptions: [`${FINITEFIELD}:MC-1`],
    source: eb(FINITEFIELD, 'Assessment gate — finite fields exist only at prime-power orders'),
  },
  {
    conceptId: FINITEFIELD, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is F_4 (the field of order 4) the same set as Z/4Z?',
    choices: [
      { text: 'No — Z/4Z has zero divisors (2×2=4≡0 mod 4), failing to even be an integral domain; the genuine F_4 is built from polynomials over F_2 modulo an irreducible quadratic', isCorrect: true },
      { text: 'Yes — F_{p^n} always equals Z/p^nZ for every prime p and integer n', isCorrect: false, misconceptionId: `${FINITEFIELD}:MC-2` },
      { text: 'Yes, since both have exactly 4 elements, which is sufficient to conclude they are the same field', isCorrect: false, misconceptionId: `${FINITEFIELD}:MC-2` },
    ],
    targetedMisconceptions: [`${FINITEFIELD}:MC-2`],
    source: eb(FINITEFIELD, 'Misconception register — F_{p^n} for n≥2 is not Z/p^nZ, a genuinely different construction'),
  },
  {
    conceptId: FINITEFIELD, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is it guaranteed that some single element\'s powers generate every nonzero element of a finite field, or could the multiplicative structure be arbitrary?',
    choices: [
      { text: 'It is guaranteed — the nonzero elements of ANY finite field always form a cyclic group under multiplication; e.g. in F_7, powers of 3 list all 6 nonzero elements before cycling back', isCorrect: true },
      { text: 'It is not guaranteed — the multiplicative structure of a finite field\'s nonzero elements could be an arbitrary, non-cyclic group', isCorrect: false, misconceptionId: `${FINITEFIELD}:MC-3` },
      { text: 'It only happens to be true for the specific small examples typically shown, not as a general fact', isCorrect: false, misconceptionId: `${FINITEFIELD}:MC-3` },
    ],
    targetedMisconceptions: [`${FINITEFIELD}:MC-3`],
    source: eb(FINITEFIELD, 'Transfer probe — the nonzero elements of any finite field always form a cyclic group, a guaranteed structural fact'),
  },
]
