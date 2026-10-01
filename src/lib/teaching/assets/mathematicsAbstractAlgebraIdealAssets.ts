/**
 * Eighth math.abst asset batch — ideal and polynomial-ring.
 *
 * Continues serving-asset coverage for math.abst (14/36 -> 16/36).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.abst.ideal.md and
 * math.abst.polynomial-ring.md.
 *
 *   IDEAL     ideal — absorption must hold against the WHOLE ring, not
 *             just the subset's own elements; left and right absorption
 *             are independent in non-commutative rings; principal ideals
 *             use ring-element multiples, never just integer multiples.
 *   POLYRING  polynomial-ring — F[x] is never a field even when F is;
 *             the division algorithm needs the coefficient ring to be a
 *             field; irreducible generates maximal, not merely prime.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const IDEAL = 'math.abst.ideal'
const POLYRING = 'math.abst.polynomial-ring'

export const MATHEMATICS_ABSTRACT_ALGEBRA_IDEAL_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: IDEAL, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'An ideal I of a ring R needs (I,+) to be an additive subgroup, PLUS closure under '
      + 'ABSORPTION by EVERY element of R, not merely by elements of I itself. LEFT absorption: '
      + 'ri∈I for every r∈R and i∈I. RIGHT absorption: ir∈I for every r∈R and i∈I. In a '
      + 'COMMUTATIVE ring these coincide, but in a NON-COMMUTATIVE ring they are genuinely '
      + 'independent — a subset can satisfy one without the other. In M2(R), the subset of '
      + 'matrices with zero second row satisfies LEFT absorption but NOT right absorption — a '
      + 'genuine left ideal that is not two-sided.\n\n'
      + 'This absorption-by-everyone requirement is what makes an ideal STRICTLY STRONGER than a '
      + 'subring: a subring only needs closure among its OWN elements.\n\n'
      + 'A PRINCIPAL ideal ⟨a⟩=aR={ra : r∈R} sweeps out every RING-ELEMENT multiple of a, never '
      + 'just integer multiples. In R[x], ⟨x²⟩ contains x³=x·x², a genuine element the wrong '
      + '"integer multiples only" formula would never produce.\n\n'
      + 'The KERNEL of any ring homomorphism is ALWAYS a two-sided ideal — proved unconditionally '
      + 'from 0 absorbing multiplication on either side in the target ring.',
    targetedMisconceptions: [`${IDEAL}:MC-1`, `${IDEAL}:MC-2`, `${IDEAL}:MC-3`],
    source: eb(IDEAL, 'Core Understanding — absorption by the whole ring is required, left/right absorption are independent in non-commutative rings, principal ideals use ring-element multiples'),
  },
  {
    conceptId: POLYRING, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'R[x] generalizes real-coefficient polynomials to coefficients drawn from ANY ring R, '
      + 'inheriting ring-hood automatically via the same axiom-checking procedure. But EVEN when F '
      + 'IS a field, F[x] is NEVER a field: x has no multiplicative inverse, since '
      + 'deg(x·p(x))=deg(x)+deg(p(x))≥1 for any nonzero p(x), while deg(1)=0 — no polynomial can '
      + 'multiply x back to 1.\n\n'
      + 'The polynomial DIVISION ALGORITHM specifically requires the coefficient ring to be a '
      + 'FIELD, since each step needs to invert the divisor\'s leading coefficient. Dividing x² by '
      + '2x in Z[x] (Z is NOT a field) would need quotient x/2 — not an integer-coefficient '
      + 'polynomial at all; the algorithm genuinely fails, not merely becomes harder.\n\n'
      + 'An IRREDUCIBLE polynomial in F[x] generates a MAXIMAL ideal, not merely a prime one — the '
      + 'quotient ring is always a genuine FIELD. In R[x], x²+1 is irreducible, and '
      + 'R[x]/⟨x²+1⟩≅C, a genuine field, confirming maximality. The reducible x²-1=(x-1)(x+1) '
      + 'gives an ideal that is NOT maximal, sitting properly inside ⟨x-1⟩.',
    targetedMisconceptions: [`${POLYRING}:MC-1`, `${POLYRING}:MC-2`, `${POLYRING}:MC-3`],
    source: eb(POLYRING, 'Core Understanding — F[x] is never a field even when F is, the division algorithm requires a field of coefficients, irreducible generates maximal not merely prime'),
  },
]

export const MATHEMATICS_ABSTRACT_ALGEBRA_IDEAL_PROBES: SeedProbe[] = [
  // --- math.abst.ideal ----------------------------------------------------------
  {
    conceptId: IDEAL, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is it enough to check that a subset I is closed under multiplication by ITS OWN elements to confirm it is an ideal?',
    choices: [
      { text: 'No — an ideal must additionally absorb multiplication by EVERY element of the ambient ring R, not just elements of I itself; that stronger requirement distinguishes it from a subring', isCorrect: true },
      { text: 'Yes — closure among the subset\'s own elements is the complete ideal criterion', isCorrect: false, misconceptionId: `${IDEAL}:MC-1` },
      { text: 'Yes, since being an additive subgroup already guarantees full absorption', isCorrect: false, misconceptionId: `${IDEAL}:MC-1` },
    ],
    targetedMisconceptions: [`${IDEAL}:MC-1`],
    source: eb(IDEAL, 'Assessment gate — ideal absorption must be checked against the whole ring, not just the subset itself'),
  },
  {
    conceptId: IDEAL, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'In a non-commutative ring, does checking left absorption (rI⊆I) automatically confirm right absorption (Ir⊆I) too?',
    choices: [
      { text: 'No — in a non-commutative ring the two conditions are genuinely independent; a subset can be a left ideal without being a right ideal, so both must be checked separately', isCorrect: true },
      { text: 'Yes — left absorption always implies right absorption in any ring', isCorrect: false, misconceptionId: `${IDEAL}:MC-2` },
      { text: 'Yes, since absorption is a symmetric property by definition', isCorrect: false, misconceptionId: `${IDEAL}:MC-2` },
    ],
    targetedMisconceptions: [`${IDEAL}:MC-2`],
    source: eb(IDEAL, 'Misconception register — left and right absorption are independent checks in non-commutative rings'),
  },
  {
    conceptId: IDEAL, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does the principal ideal ⟨a⟩ consist of INTEGER multiples of a, or RING-ELEMENT multiples of a?',
    choices: [
      { text: 'Ring-element multiples: ⟨a⟩=aR={ra : r∈R}; e.g. ⟨x²⟩ in R[x] contains x³=x·x², which is not an integer multiple of x²', isCorrect: true },
      { text: 'Integer multiples only, exactly as in the cyclic-subgroup-generation formula {na : n∈Z}', isCorrect: false, misconceptionId: `${IDEAL}:MC-3` },
      { text: 'Integer multiples, since this always coincides with ring-element multiples in every ring', isCorrect: false, misconceptionId: `${IDEAL}:MC-3` },
    ],
    targetedMisconceptions: [`${IDEAL}:MC-3`],
    source: eb(IDEAL, 'Transfer probe — principal ideals use ring-element multiples, never merely integer multiples'),
  },

  // --- math.abst.polynomial-ring ---------------------------------------------------
  {
    conceptId: POLYRING, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'If F is a field, is F[x] automatically a field too?',
    choices: [
      { text: 'No — x never has a multiplicative inverse in F[x], since deg(x·p(x))≥1 for any nonzero p(x) while deg(1)=0; F[x] is never a field, no matter how nice F is', isCorrect: true },
      { text: 'Yes — F[x] inherits every nice property of F, including field-hood', isCorrect: false, misconceptionId: `${POLYRING}:MC-1` },
      { text: 'Yes, since polynomials over a field always have multiplicative inverses', isCorrect: false, misconceptionId: `${POLYRING}:MC-1` },
    ],
    targetedMisconceptions: [`${POLYRING}:MC-1`],
    source: eb(POLYRING, 'Assessment gate — F[x] is never a field even when F is, x is a permanent obstruction'),
  },
  {
    conceptId: POLYRING, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does the polynomial division algorithm work over any ring R[x], or does it need something special about R?',
    choices: [
      { text: 'It needs R to be a field — each step requires inverting the divisor\'s leading coefficient; dividing x² by 2x in Z[x] fails since 2 has no inverse in Z', isCorrect: true },
      { text: 'It works over any ring, just like ordinary integer long division', isCorrect: false, misconceptionId: `${POLYRING}:MC-2` },
      { text: 'It works over any ring, only becoming slower but never actually failing', isCorrect: false, misconceptionId: `${POLYRING}:MC-2` },
    ],
    targetedMisconceptions: [`${POLYRING}:MC-2`],
    source: eb(POLYRING, 'Misconception register — the division algorithm requires the coefficient ring to be a field, or it can genuinely fail'),
  },
  {
    conceptId: POLYRING, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does an irreducible polynomial\'s ideal being "maximal" mean something stronger than just "prime"?',
    choices: [
      { text: 'Yes — maximal means the quotient ring is a genuine FIELD (e.g. R[x]/⟨x²+1⟩≅C), a strictly stronger property than merely prime', isCorrect: true },
      { text: 'No — "maximal" and "prime" mean exactly the same thing for polynomial ideals', isCorrect: false, misconceptionId: `${POLYRING}:MC-3` },
      { text: 'No, since irreducible polynomials only ever generate prime ideals, never maximal ones', isCorrect: false, misconceptionId: `${POLYRING}:MC-3` },
    ],
    targetedMisconceptions: [`${POLYRING}:MC-3`],
    source: eb(POLYRING, 'Transfer probe — irreducible generates maximal, a strictly stronger property than merely prime'),
  },
]
