/**
 * Third math.abst asset batch — group-inverse and subgroup.
 *
 * Continues serving-asset coverage for math.abst (4/36 -> 6/36). Transcribed
 * from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.abst.group-inverse.md and
 * math.abst.subgroup.md.
 *
 *   GROUPINV   group-inverse — the inverse of any element is unique;
 *              (a·b)^-1=b^-1·a^-1, order reverses; (a^-1)^-1=a via
 *              uniqueness, not re-derivation.
 *   SUBGROUP   subgroup — the criterion is non-empty + closed under the
 *              operation + closed under inverses (associativity is free);
 *              the one-line ab^-1∈H criterion packages all three; proper
 *              subgroups are just as genuine as the trivial ones.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const GROUPINV = 'math.abst.group-inverse'
const SUBGROUP = 'math.abst.subgroup'

export const MATHEMATICS_ABSTRACT_ALGEBRA_SUBGROUP_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: GROUPINV, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'UNIQUENESS: the inverse of any element is unique. If a·b=e and a·c=e, then '
      + 'b=b·e=b·(a·c)=(b·a)·c=e·c=c — G4 only asserts an inverse EXISTS; this proof, combining '
      + 'G2 (associativity) with G4, is what forces there to be exactly one.\n\n'
      + 'The PRODUCT-INVERSE FORMULA: (a·b)^-1=b^-1·a^-1 — the order REVERSES, never stays '
      + 'parallel to the original product. In ABELIAN groups, commutativity HIDES this reversal '
      + '(a^-1·b^-1 and b^-1·a^-1 coincide), but in NON-ABELIAN groups like GL_n(R), the reversal '
      + 'is essential: (AB)^-1 genuinely differs from A^-1B^-1 and equals B^-1A^-1 instead.\n\n'
      + 'The DOUBLE-INVERSE theorem: (a^-1)^-1=a for every a. Since a^-1·a=e (G4), a itself '
      + 'satisfies the defining property of being the inverse of a^-1; by UNIQUENESS, '
      + '(a^-1)^-1=a directly — the shortest path, reusing uniqueness rather than re-solving from '
      + 'scratch.',
    targetedMisconceptions: [`${GROUPINV}:MC-1`, `${GROUPINV}:MC-2`],
    source: eb(GROUPINV, 'Core Understanding — inverse uniqueness, the product-inverse formula reverses order, double-inverse via uniqueness'),
  },
  {
    conceptId: SUBGROUP, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'The SUBGROUP CRITERION: H≤G iff H is (1) NON-EMPTY (typically verified via e∈H), (2) '
      + 'CLOSED UNDER THE OPERATION (for all a,b∈H, ab∈H), and (3) CLOSED UNDER INVERSES (for all '
      + 'a∈H, a^-1∈H). Associativity is AUTOMATICALLY INHERITED from G — it holds for ALL elements '
      + 'of G, hence for the subset H too, requiring no separate check.\n\n'
      + 'The EQUIVALENT ONE-LINE CRITERION packages all three: H≤G iff H≠∅ and for all a,b∈H, '
      + 'ab^-1∈H. Setting a=b recovers aa^-1=e∈H (identity); setting a=e recovers eb^-1=b^-1∈H '
      + '(inverse-closure); then applying the criterion to a and b^-1 recovers a(b^-1)^-1=ab∈H '
      + '(operation-closure) — the compact condition genuinely implies all three.\n\n'
      + 'Every group G has two TRIVIAL subgroups: {e} and G itself — "trivial" meaning '
      + '"automatically present in every group," NEVER "the only genuine subgroups." Any OTHER '
      + 'subgroup is called PROPER, and is every bit as legitimate a subgroup as the trivial ones.',
    targetedMisconceptions: [`${SUBGROUP}:MC-1`, `${SUBGROUP}:MC-2`, `${SUBGROUP}:MC-3`],
    source: eb(SUBGROUP, 'Core Understanding — the subgroup criterion, the one-line criterion, trivial vs. proper subgroups'),
  },
]

export const MATHEMATICS_ABSTRACT_ALGEBRA_SUBGROUP_PROBES: SeedProbe[] = [
  // --- math.abst.group-inverse ------------------------------------------------
  {
    conceptId: GROUPINV, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Could a group element have two genuinely different inverses?',
    choices: [
      { text: 'No — combining G2 (associativity) with G4 (inverse existence) forces uniqueness: if a·b=e and a·c=e, then b=c necessarily', isCorrect: true },
      { text: 'Yes — G4 only guarantees existence, so an element could have multiple inverses', isCorrect: false, misconceptionId: `${GROUPINV}:MC-1` },
      { text: 'Yes, in groups where the operation is not commutative', isCorrect: false, misconceptionId: `${GROUPINV}:MC-1` },
    ],
    targetedMisconceptions: [`${GROUPINV}:MC-1`],
    source: eb(GROUPINV, 'Assessment gate — the inverse of any group element is unique'),
  },
  {
    conceptId: GROUPINV, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is (a·b)^-1 equal to a^-1·b^-1, or to b^-1·a^-1?',
    choices: [
      { text: 'b^-1·a^-1 — the order reverses; in non-abelian groups like GL_n(R), (AB)^-1=B^-1A^-1, genuinely different from A^-1B^-1', isCorrect: true },
      { text: 'a^-1·b^-1 — the order stays parallel to the original product', isCorrect: false, misconceptionId: `${GROUPINV}:MC-2` },
      { text: 'Either one, since they always give the same result in any group', isCorrect: false, misconceptionId: `${GROUPINV}:MC-2` },
    ],
    targetedMisconceptions: [`${GROUPINV}:MC-2`],
    source: eb(GROUPINV, 'Misconception register — the product-inverse formula reverses order, never stays parallel'),
  },
  {
    conceptId: GROUPINV, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'What is (a^-1)^-1, and is it necessary to re-solve the defining inverse equation from scratch to find it?',
    choices: [
      { text: '(a^-1)^-1=a; since a^-1·a=e, a itself satisfies the defining property of being the inverse of a^-1, so uniqueness gives the answer directly without re-solving', isCorrect: true },
      { text: 'It cannot be determined without first re-solving the defining equation for a^-1 from scratch each time', isCorrect: false, misconceptionId: `${GROUPINV}:MC-1` },
      { text: '(a^-1)^-1=a^-1, since inverting twice just repeats the same element', isCorrect: false, misconceptionId: `${GROUPINV}:MC-1` },
    ],
    targetedMisconceptions: [`${GROUPINV}:MC-1`],
    source: eb(GROUPINV, 'Transfer probe — the double-inverse theorem follows from uniqueness, the shortest proof path'),
  },

  // --- math.abst.subgroup -------------------------------------------------------
  {
    conceptId: SUBGROUP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is a proper subgroup — one that is neither {e} nor all of G — a real subgroup, or does it not really count?',
    choices: [
      { text: 'It is a real, genuine subgroup — "trivial" only means "automatically present in every group," never "the only genuine ones"; a proper subgroup satisfies the identical criterion', isCorrect: true },
      { text: 'It does not really count — only {e} and G are genuine subgroups', isCorrect: false, misconceptionId: `${SUBGROUP}:MC-1` },
      { text: 'It only counts if it happens to equal one of the trivial subgroups', isCorrect: false, misconceptionId: `${SUBGROUP}:MC-1` },
    ],
    targetedMisconceptions: [`${SUBGROUP}:MC-1`],
    source: eb(SUBGROUP, 'Assessment gate — proper subgroups are just as genuine as the trivial ones'),
  },
  {
    conceptId: SUBGROUP, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'When verifying the subgroup criterion for a candidate subset H, do you need to separately check associativity?',
    choices: [
      { text: 'No — associativity holds for the operation on all of G, so it is automatically inherited by any subset H; only non-emptiness, closure, and inverse-closure are new checks', isCorrect: true },
      { text: 'Yes — associativity must be independently verified for H just like for a full group', isCorrect: false, misconceptionId: `${SUBGROUP}:MC-2` },
      { text: 'Yes, since subsets can behave differently from the parent group under the same operation', isCorrect: false, misconceptionId: `${SUBGROUP}:MC-2` },
    ],
    targetedMisconceptions: [`${SUBGROUP}:MC-2`],
    source: eb(SUBGROUP, 'Misconception register — associativity is automatically inherited, never a separate check'),
  },
  {
    conceptId: SUBGROUP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'In the additive group (Z,+), what does the one-line criterion "ab^-1∈H" actually look like?',
    choices: [
      { text: 'a-b∈H — the multiplicative notation must be translated: · becomes +, and inverse becomes negation', isCorrect: true },
      { text: 'ab^-1∈H, applied literally with no translation, even in an additive group', isCorrect: false, misconceptionId: `${SUBGROUP}:MC-3` },
      { text: 'a+b∈H, since addition replaces multiplication directly with no other change', isCorrect: false, misconceptionId: `${SUBGROUP}:MC-3` },
    ],
    targetedMisconceptions: [`${SUBGROUP}:MC-3`],
    source: eb(SUBGROUP, 'Transfer probe — the one-line criterion must be correctly translated to additive notation'),
  },
]
