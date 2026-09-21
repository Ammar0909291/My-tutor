/**
 * Eighth math.alg asset batch — factoring and polynomial-roots.
 *
 * Continues serving-asset coverage for math.alg (28/59 -> 30/59).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.alg.factoring.md
 * and math.alg.polynomial-roots.md.
 *
 *   FACTORING   factoring — extracting the GCF is never the whole job,
 *               the residual must be re-checked recursively; the
 *               ac-method (product = a·c, not c alone) is the general
 *               rule for EVERY trinomial, monic or not; a sum of squares
 *               never factors into real linear factors, only a
 *               difference of squares does — verified by the
 *               discriminant, never by sign-spotting alone.
 *   POLYROOTS   polynomial-roots — roots must be counted WITH
 *               multiplicity, never just distinct values, to match the
 *               polynomial's degree; for a REAL-coefficient polynomial,
 *               a non-real root's conjugate is automatically also a
 *               root, never solo; the real-coefficients hypothesis must
 *               be checked before applying that pairing, never assumed.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const FACTORING = 'math.alg.factoring'
const POLYROOTS = 'math.alg.polynomial-roots'

export const MATHEMATICS_ALGEBRA_FACTORING_ROOTS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: FACTORING, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'Factoring is a decision tree applied in a fixed order, never a single technique: first, '
      + 'extract the Greatest Common Factor from every term — this step is never optional, since a '
      + 'GCF left inside a "fully factored" answer means the answer is not actually fully factored. '
      + 'Second, classify what remains by term count: two terms suggest a difference of squares '
      + '(a²−b²=(a−b)(a+b)) or sum/difference of cubes; three terms suggest a perfect-square '
      + 'trinomial or the general ac-method (find two numbers multiplying to a·c and summing to b — '
      + 'NEVER search against c alone, since that silently drops the leading coefficient\'s role and '
      + 'fails on non-monic trinomials); four terms suggest grouping.\n\n'
      + 'Critically, this is NOT a one-shot action: the resulting factors must themselves be checked '
      + 'for further factorability. The procedure repeats until every remaining piece is either a '
      + 'linear factor or a genuinely irreducible quadratic — a factor produced by one step is never '
      + 'automatically the final answer.\n\n'
      + 'The discriminant test (b²−4ac<0 implies no real linear factors) is what makes '
      + '"genuinely irreducible" a checkable fact rather than a guess: a difference of squares '
      + '(a²−b², discriminant of x²−b² is 4b²>0) always factors over the reals, while a sum of '
      + 'squares (a²+b², discriminant of x²+b² is −4b²<0) NEVER does — two forms that look almost '
      + 'identical on the page but behave oppositely, distinguished by computation, never by '
      + 'sign-spotting alone.',
    targetedMisconceptions: [`${FACTORING}:MC-1`, `${FACTORING}:MC-2`, `${FACTORING}:MC-3`],
    source: eb(FACTORING, 'Core Understanding — factoring is a recursive decision tree (GCF, then classify by term count, then re-check every resulting factor), the ac-method uses a·c not c alone, and the discriminant certifies irreducibility by computation'),
  },
  {
    conceptId: POLYROOTS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A root of p(x) is a value x=a with p(a)=0, and by the Factor Theorem this is exactly '
      + 'equivalent to (x−a) being a factor of p(x) — root-finding and factor-finding are the same '
      + 'question asked two ways. The Fundamental Theorem of Algebra guarantees a degree-n '
      + 'polynomial has EXACTLY n roots, counting multiplicity, over the complex numbers. When a '
      + 'factor (x−a) appears k times, a is a root of MULTIPLICITY k, and it counts as k roots '
      + 'toward the total of n even though it is a single repeated value — this distinction '
      + '(distinct root VALUES versus roots counted WITH multiplicity) is essential, since only the '
      + 'multiplicity-weighted count is guaranteed to match the degree.\n\n'
      + 'The Conjugate Root Theorem adds a second constraint specifically for polynomials with REAL '
      + 'coefficients: if a+bi (with b≠0) is a root, its conjugate a−bi is ALSO automatically a '
      + 'root — non-real roots of a real-coefficient polynomial never appear "alone," they always '
      + 'arrive in matched pairs. This guarantee depends entirely on its hypothesis: it requires '
      + 'EVERY coefficient to be real, and a genuinely complex-coefficient polynomial gives no such '
      + 'guarantee at all — checking this hypothesis before applying the theorem\'s conclusion is a '
      + 'genuine precondition, never optional formality.',
    targetedMisconceptions: [`${POLYROOTS}:MC-1`, `${POLYROOTS}:MC-2`, `${POLYROOTS}:MC-3`],
    source: eb(POLYROOTS, 'Core Understanding — roots must be counted with multiplicity to match the degree, and the Conjugate Root Theorem\'s pairing guarantee applies only after its real-coefficients hypothesis is checked'),
  },
]

export const MATHEMATICS_ALGEBRA_FACTORING_ROOTS_PROBES: SeedProbe[] = [
  // --- math.alg.factoring ------------------------------------------
  {
    conceptId: FACTORING, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Factoring 6x³−21x²−12x, you extract the GCF of 3x to get 3x(2x²−7x−4). Is this the complete factorisation?',
    choices: [
      { text: 'No — check whether (2x²−7x−4) is itself factorable; it is: (2x+1)(x−4), giving 3x(2x+1)(x−4)', isCorrect: true },
      { text: 'Yes — once the GCF is extracted, the factorisation is complete', isCorrect: false, misconceptionId: `${FACTORING}:MC-1` },
      { text: 'Yes, since GCF extraction is the only required step in factoring', isCorrect: false, misconceptionId: `${FACTORING}:MC-1` },
    ],
    targetedMisconceptions: [`${FACTORING}:MC-1`],
    source: eb(FACTORING, 'Detection probe (Blueprint) — GCF extraction is never the whole job; the residual must be checked for further factorability before declaring the factorisation complete'),
  },
  {
    conceptId: FACTORING, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'To factor the non-monic trinomial 6x²+11x+3 using the ac-method, what product should the two numbers you find multiply to?',
    choices: [
      { text: 'a·c = 6×3 = 18 — the leading coefficient is essential, not a bystander, so the two numbers must multiply to 18 and sum to 11', isCorrect: true },
      { text: 'Just c = 3, ignoring the leading coefficient 6', isCorrect: false, misconceptionId: `${FACTORING}:MC-2` },
      { text: 'Just a = 6, ignoring the constant term', isCorrect: false, misconceptionId: `${FACTORING}:MC-2` },
    ],
    targetedMisconceptions: [`${FACTORING}:MC-2`],
    source: eb(FACTORING, 'Detection probe (Blueprint) — the ac-method searches against the product a·c, never c alone, which is what makes it work identically for monic and non-monic trinomials'),
  },
  {
    conceptId: FACTORING, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does x²+9 factor into real linear factors the same way x²−9 does?',
    choices: [
      { text: 'No — the discriminant of x²+9 (a=1, b=0, c=9) is 0−36=−36<0, confirming no real linear factors exist; only x²−9 (discriminant 36>0) factors as (x−3)(x+3)', isCorrect: true },
      { text: 'Yes — both are differences of two squared terms, so both factor as (x−3)(x+3) or (x+3)(x−3)', isCorrect: false, misconceptionId: `${FACTORING}:MC-3` },
      { text: 'Yes, since any expression with two perfect squares can be factored the same way regardless of the sign between them', isCorrect: false, misconceptionId: `${FACTORING}:MC-3` },
    ],
    targetedMisconceptions: [`${FACTORING}:MC-3`],
    source: eb(FACTORING, 'Detection probe (Blueprint) — a sum of squares never factors into real linear factors, unlike a difference of squares; the discriminant test distinguishes them by computation, not visual pattern-matching'),
  },

  // --- math.alg.polynomial-roots -------------------------------------------
  {
    conceptId: POLYROOTS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'The degree-4 polynomial p(x)=(x−1)⁴ has how many roots?',
    choices: [
      { text: '4 roots, all at x=1, counted with multiplicity — matching the degree of 4 exactly', isCorrect: true },
      { text: '1 root, since x=1 is the only distinct value that makes p(x)=0', isCorrect: false, misconceptionId: `${POLYROOTS}:MC-1` },
      { text: 'It depends on whether you count the repeated factor or not — there is no single correct answer', isCorrect: false, misconceptionId: `${POLYROOTS}:MC-1` },
    ],
    targetedMisconceptions: [`${POLYROOTS}:MC-1`],
    source: eb(POLYROOTS, 'Detection probe (Blueprint) — roots must be counted with multiplicity, not just distinct values, since only the multiplicity-weighted total is guaranteed to match the polynomial\'s degree'),
  },
  {
    conceptId: POLYROOTS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A real-coefficient cubic has known roots x=2 and x=1+2i. What is the complete root list?',
    choices: [
      { text: '2, 1+2i, and 1−2i — the Conjugate Root Theorem guarantees the conjugate of a non-real root is also a root, for a real-coefficient polynomial', isCorrect: true },
      { text: 'Just 2 and 1+2i — those are the only roots given, and nothing more is guaranteed', isCorrect: false, misconceptionId: `${POLYROOTS}:MC-2` },
      { text: '2 and 1+2i, with the third root undetermined without more information', isCorrect: false, misconceptionId: `${POLYROOTS}:MC-2` },
    ],
    targetedMisconceptions: [`${POLYROOTS}:MC-2`],
    source: eb(POLYROOTS, 'Detection probe (Blueprint) — a real-coefficient polynomial\'s non-real root is never solo; its conjugate is automatically also a root by the Conjugate Root Theorem'),
  },
  {
    conceptId: POLYROOTS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'q(x)=x−i has known root x=i. Must −i (the conjugate) also be a root?',
    choices: [
      { text: 'No — q(x) has a genuinely complex coefficient (−i is not real), so the Conjugate Root Theorem\'s hypothesis fails; checking directly, q(−i)=−i−i=−2i≠0 confirms −i is not a root', isCorrect: true },
      { text: 'Yes — the Conjugate Root Theorem guarantees that any complex root\'s conjugate is also a root, regardless of the polynomial\'s coefficients', isCorrect: false, misconceptionId: `${POLYROOTS}:MC-3` },
      { text: 'Yes, since conjugate pairing is a universal property of all polynomials with complex roots', isCorrect: false, misconceptionId: `${POLYROOTS}:MC-3` },
    ],
    targetedMisconceptions: [`${POLYROOTS}:MC-3`],
    source: eb(POLYROOTS, 'Detection probe (Blueprint) — the Conjugate Root Theorem requires real coefficients as a genuine precondition; for a complex-coefficient polynomial no pairing is guaranteed, and must be checked directly'),
  },
]
