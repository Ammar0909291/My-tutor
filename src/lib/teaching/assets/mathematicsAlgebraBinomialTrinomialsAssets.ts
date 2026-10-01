/**
 * Fourteenth math.alg asset batch — binomial-theorem and factoring-trinomials.
 *
 * Continues serving-asset coverage for math.alg (40/59 -> 42/59).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.alg.binomial-theorem.md
 * and math.alg.factoring-trinomials.md.
 *
 *   BINOMIALTHM  binomial-theorem — (a+b)^n is NEVER a^n+b^n (the
 *                "freshman's dream" error); every intermediate cross
 *                term, weighted by its binomial coefficient, is
 *                genuinely present. The induction step closes because
 *                of Pascal's identity SPECIFICALLY, never generic
 *                algebra. Pascal's triangle IS the coefficients C(n,k),
 *                never a coincidentally-matching separate pattern.
 *   FACTORTRINOM factoring-trinomials — the non-monic search target is
 *                ac, NEVER c alone (the monic rule is the a=1 special
 *                case, not a separate rule); a grouping step's
 *                extracted sign must be verified by expanding back,
 *                never assumed correct; a sum of squares is never
 *                factorable, confirmed by the discriminant, never by
 *                visual resemblance to a difference of squares.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const BINOMIALTHM = 'math.alg.binomial-theorem'
const FACTORTRINOM = 'math.alg.factoring-trinomials'

export const MATHEMATICS_ALGEBRA_BINOMIAL_TRINOMIALS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: BINOMIALTHM, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'The Binomial Theorem, (a+b)^n = Σ C(n,k)·a^(n−k)·b^k, generalizes the already-familiar '
      + 'expansions of (a+b)² and (a+b)³: each term\'s coefficient is C(n,k), the number of ways to '
      + 'choose which k of the n factors (a+b)(a+b)...(a+b) contribute a b. This is NOT a coincidental '
      + 'numeric pattern — it is a direct combinatorial consequence of how polynomial multiplication '
      + 'works. Critically, (a+b)^n is NEVER equal to a^n+b^n — every intermediate cross term is '
      + 'genuinely present: (a+b)³=a³+3a²b+3ab²+b³, never merely a³+b³.\n\n'
      + 'The induction proof is not generic algebra that "happens" to simplify — Pascal\'s identity '
      + 'C(n,k)+C(n,k−1)=C(n+1,k) is the SPECIFIC mechanism making the inductive step close. Tracing '
      + 'the coefficient of a²b in (a+b)³: it comes from combining C(2,0)=1 and C(2,1)=2 from the '
      + '(a+b)² expansion, giving 1+2=3 — exactly Pascal\'s identity at work, never unexplained '
      + 'algebra.\n\n'
      + 'Arranging the coefficients C(n,k) by row produces Pascal\'s triangle, where each entry is '
      + 'the sum of the two entries above it. The triangle IS the coefficients, arranged visually — '
      + 'NEVER a separate topic that coincidentally shares the same numbers. These same coefficients, '
      + 'normalized by 2^n, become term probabilities in the binomial distribution.',
    targetedMisconceptions: [`${BINOMIALTHM}:MC-1`, `${BINOMIALTHM}:MC-2`, `${BINOMIALTHM}:MC-3`],
    source: eb(BINOMIALTHM, 'Core Understanding — (a+b)^n is never a^n+b^n, Pascal\'s identity specifically (not generic algebra) makes the induction step close, and Pascal\'s triangle is the same coefficients viewed visually, not a coincidence'),
  },
  {
    conceptId: FACTORTRINOM, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'Factoring a trinomial ax²+bx+c reduces to one search: find two numbers with a specified '
      + 'product and sum. For the MONIC case (a=1), the target is product=c, sum=b, giving (x+p)(x+q) '
      + 'directly. For the NON-MONIC case (a≠1), the identical search idea applies, but the product '
      + 'target changes to ac, NEVER c alone — searching against c alone for 2x²+7x+3 misses the '
      + 'leading coefficient\'s role entirely. This is ONE rule (search for a product/sum pair) '
      + 'applied to two targets, with the monic case being the special instance where a=1 makes ac=c '
      + '— never a separate, unrelated procedure.\n\n'
      + 'After splitting the middle term using the found pair and grouping, the extracted GCF from '
      + 'each group must be VERIFIED by expanding back through the binomial and comparing term-by-'
      + 'term to the original split terms — never assumed correct, since a sign error (especially '
      + 'when the second group\'s leading coefficient is negative) produces a binomial that does not '
      + 'actually match the first group\'s.\n\n'
      + 'A trinomial that resists every integer product/sum search is not necessarily a missed pair — '
      + 'it may be genuinely irreducible, most commonly a sum-of-squares shape (x²+k²), confirmed by '
      + 'the discriminant (b²−4ac<0), NEVER by assuming a positive-constant quadratic shape must '
      + 'factor.',
    targetedMisconceptions: [`${FACTORTRINOM}:MC-1`, `${FACTORTRINOM}:MC-2`, `${FACTORTRINOM}:MC-3`],
    source: eb(FACTORTRINOM, 'Core Understanding — the non-monic search target is ac never c alone, a grouping step\'s sign must be verified by expanding back, and a sum of squares is never factorable, confirmed by the discriminant'),
  },
]

export const MATHEMATICS_ALGEBRA_BINOMIAL_TRINOMIALS_PROBES: SeedProbe[] = [
  // --- math.alg.binomial-theorem ------------------------------------------
  {
    conceptId: BINOMIALTHM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does (a+b)³ = a³+b³?',
    choices: [
      { text: 'No — the full expansion is a³+3a²b+3ab²+b³; the cross terms 3a²b and 3ab² are genuinely present, confirmed by the already-known FOIL-based expansion', isCorrect: true },
      { text: 'Yes — exponentiation distributes over addition just as it distributes over multiplication', isCorrect: false, misconceptionId: `${BINOMIALTHM}:MC-1` },
      { text: 'Yes, since (a+b)^n always simplifies to just the two outer terms a^n and b^n', isCorrect: false, misconceptionId: `${BINOMIALTHM}:MC-1` },
    ],
    targetedMisconceptions: [`${BINOMIALTHM}:MC-1`],
    source: eb(BINOMIALTHM, 'Detection probe (Blueprint) — (a+b)^n is never a^n+b^n; every intermediate cross term, weighted by its binomial coefficient, is genuinely present'),
  },
  {
    conceptId: BINOMIALTHM, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'In the induction proof of the Binomial Theorem, why do the coefficients from the n-th expansion combine into exactly the (n+1)-th expansion\'s coefficients?',
    choices: [
      { text: 'Because of Pascal\'s identity specifically — C(n,k)+C(n,k−1)=C(n+1,k) is the exact mechanism making the two contributing coefficients combine correctly at every step', isCorrect: true },
      { text: 'Because the algebra just happens to simplify correctly at each step, through routine manipulation', isCorrect: false, misconceptionId: `${BINOMIALTHM}:MC-2` },
      { text: 'Because binomial coefficients always sum to a power of 2, which forces the equation to close', isCorrect: false, misconceptionId: `${BINOMIALTHM}:MC-2` },
    ],
    targetedMisconceptions: [`${BINOMIALTHM}:MC-2`],
    source: eb(BINOMIALTHM, 'Detection probe (Blueprint) — the induction step works through Pascal\'s identity specifically, a named combinatorial fact, never generic algebraic simplification that merely happens to work'),
  },
  {
    conceptId: BINOMIALTHM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Row 4 of Pascal\'s triangle is 1, 4, 6, 4, 1. Is the entry 6 the same thing as C(4,2), or just a coincidental match?',
    choices: [
      { text: 'The same thing — Pascal\'s triangle IS the binomial coefficients arranged visually, one row per value of n; row 4\'s entries are exactly C(4,0) through C(4,4)', isCorrect: true },
      { text: 'A coincidence — Pascal\'s triangle and the binomial coefficients are two separate topics that happen to use the same numbers', isCorrect: false, misconceptionId: `${BINOMIALTHM}:MC-3` },
      { text: 'A coincidence, since Pascal\'s triangle is built by addition while binomial coefficients are computed by factorials', isCorrect: false, misconceptionId: `${BINOMIALTHM}:MC-3` },
    ],
    targetedMisconceptions: [`${BINOMIALTHM}:MC-3`],
    source: eb(BINOMIALTHM, 'Detection probe (Blueprint) — Pascal\'s triangle is a direct visual encoding of the binomial coefficients, never a separate topic that coincidentally shares the same numbers'),
  },

  // --- math.alg.factoring-trinomials -------------------------------------------
  {
    conceptId: FACTORTRINOM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Factoring 2x²+7x+3 using the AC method, what should the two numbers you search for multiply to?',
    choices: [
      { text: 'ac = 2×3 = 6 — the leading coefficient is essential; searching against c=3 alone misses its role in the search entirely', isCorrect: true },
      { text: 'Just c=3, the constant term alone, exactly as in the monic case', isCorrect: false, misconceptionId: `${FACTORTRINOM}:MC-1` },
      { text: 'Just a=2, the leading coefficient alone', isCorrect: false, misconceptionId: `${FACTORTRINOM}:MC-1` },
    ],
    targetedMisconceptions: [`${FACTORTRINOM}:MC-1`],
    source: eb(FACTORTRINOM, 'Detection probe (Blueprint) — for a non-monic trinomial, the product target is ac, never c alone; the monic rule is the special case where a=1 makes ac=c'),
  },
  {
    conceptId: FACTORTRINOM, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Splitting 2x²−5x+3 as 2x²−2x−3x+3, the second group is written as −3(x+1). Is this correct?',
    choices: [
      { text: 'No — expanding −3(x+1) gives −3x−3, not −3x+3; the correct extraction is −3(x−1), which expands to −3x+3 exactly, verified by multiplying back', isCorrect: true },
      { text: 'Yes — the sign of the extracted factor does not need to be checked as long as the numbers involved are correct', isCorrect: false, misconceptionId: `${FACTORTRINOM}:MC-2` },
      { text: 'Yes, since −3(x+1) and −3(x−1) are equivalent ways of writing the same extraction', isCorrect: false, misconceptionId: `${FACTORTRINOM}:MC-2` },
    ],
    targetedMisconceptions: [`${FACTORTRINOM}:MC-2`],
    source: eb(FACTORTRINOM, 'Detection probe (Blueprint) — an extracted factor\'s sign must be verified by expanding it back through the binomial and comparing term-by-term, never assumed correct'),
  },
  {
    conceptId: FACTORTRINOM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'x²+16 has a positive constant term and looks like a quadratic. Does it factor into real linear factors?',
    choices: [
      { text: 'No — the discriminant is 0−4(1)(16)=−64<0, confirming irreducibility over the reals regardless of how the expression visually resembles a factorable difference-of-squares pattern', isCorrect: true },
      { text: 'Yes — as (x+4)(x+4), since 16 is a perfect square', isCorrect: false, misconceptionId: `${FACTORTRINOM}:MC-3` },
      { text: 'Yes, since any trinomial with a perfect-square constant term factors into matching binomials', isCorrect: false, misconceptionId: `${FACTORTRINOM}:MC-3` },
    ],
    targetedMisconceptions: [`${FACTORTRINOM}:MC-3`],
    source: eb(FACTORTRINOM, 'Detection probe (Blueprint) — a sum of squares is never factorable into real linear factors, confirmed by a negative discriminant, never by visual resemblance to a factorable pattern'),
  },
]
