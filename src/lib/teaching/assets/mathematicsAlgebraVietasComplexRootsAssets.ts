/**
 * Seventeenth math.alg asset batch — vietas-formulas and complex-polynomial-roots.
 *
 * Continues serving-asset coverage for math.alg (46/59 -> 48/59).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.alg.vietas-formulas.md
 * and math.alg.complex-polynomial-roots.md.
 *
 *   VIETAS       vietas-formulas — the sum/product of roots must ALWAYS
 *                be divided by the leading coefficient a, never left as
 *                bare −b or c (which is only correct by coincidence
 *                when a=1); a cubic's alternating signs come from the
 *                ACTUAL coefficient values, never a memorised fixed
 *                pattern; the formulas run in REVERSE too — root
 *                properties to coefficients needs no full root-solving
 *                detour.
 *   COMPLEXROOTS complex-polynomial-roots — a real-coefficient
 *                polynomial's conjugate-pair guarantee needs NO
 *                verification, it is a proven structural fact; "factor
 *                over the reals" means combining a conjugate pair into
 *                ONE real quadratic, never leaving two separate complex
 *                linear factors; a partial root list must be checked
 *                against the polynomial's DEGREE, never assumed
 *                complete just because no more roots come easily.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const VIETAS = 'math.alg.vietas-formulas'
const COMPLEXROOTS = 'math.alg.complex-polynomial-roots'

export const MATHEMATICS_ALGEBRA_VIETAS_COMPLEX_ROOTS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: VIETAS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'Vieta\'s formulas relate a polynomial\'s coefficients directly to symmetric functions of its '
      + 'roots, with no need to find individual root values. For a QUADRATIC ax²+bx+c=0 with roots '
      + 'r₁,r₂: sum r₁+r₂=−b/a; product r₁r₂=c/a. The division by a is ALWAYS required, NEVER '
      + 'optional — for 2x²−7x+3=0, the sum is 7/2, never simply 7; comparing coefficients in '
      + 'a(x−r₁)(x−r₂)=ax²−a(r₁+r₂)x+ar₁r₂ shows the division by a is structurally forced, not an '
      + 'arbitrary extra step.\n\n'
      + 'For a CUBIC ax³+bx²+cx+d=0 with roots r₁,r₂,r₃: sum=−b/a; sum of pairwise products=c/a; '
      + 'full product=−d/a — an ALTERNATING sign pattern as the symmetric function\'s degree '
      + 'increases. This sign must come from the ACTUAL computed values of the coefficients, NEVER '
      + 'from a memorised fixed rule — for x³−6x²+11x−6=0, verifying against the actual roots '
      + '1,2,3 confirms sum=6, pairwise products=11, product=6, matching −b/a, c/a, −d/a exactly.\n\n'
      + 'The formulas run in REVERSE too: given desired root properties (a target sum and product), '
      + 'a matching polynomial can be constructed directly by substitution, with NO need for a full '
      + 'root-solving or guess-and-check detour — the same relationship that predicts root '
      + 'properties from coefficients also predicts coefficients from root properties.',
    targetedMisconceptions: [`${VIETAS}:MC-1`, `${VIETAS}:MC-2`, `${VIETAS}:MC-3`],
    source: eb(VIETAS, 'Core Understanding — sum/product of roots always requires dividing by the leading coefficient, cubic signs come from actual coefficient values not a memorised pattern, and the formulas work bidirectionally'),
  },
  {
    conceptId: COMPLEXROOTS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'For a polynomial with REAL coefficients, non-real roots always arrive in CONJUGATE PAIRS: if '
      + 'a+bi (b≠0) is a root, a−bi is automatically also a root — a proven structural fact, NEVER '
      + 'requiring verification. The reason: conjugating both sides of p(a+bi)=0 and using that '
      + 'every coefficient equals its own conjugate (since all are real) gives p(a−bi)=0 directly, '
      + 'with no substitution or division performed on the actual polynomial needed.\n\n'
      + 'Combined with the Fundamental Theorem of Algebra\'s exact-root-count guarantee, once some '
      + 'roots are known, any non-real root\'s conjugate can be added to the list for free — but the '
      + 'total must be checked against the polynomial\'s DEGREE, never assumed complete just because '
      + 'no further roots come easily; a partial list shorter than the degree is genuinely '
      + 'incomplete.\n\n'
      + '"Factoring over the reals" specifically requires every factor to itself have real '
      + 'coefficients: a single non-real root a+bi gives a complex linear factor (x−(a+bi)), which '
      + 'does NOT qualify alone. Instead, a conjugate PAIR must be COMBINED into one real quadratic: '
      + '(x−(a+bi))(x−(a−bi))=x²−2ax+(a²+b²) — the imaginary parts cancel exactly. Leaving a '
      + 'conjugate pair as two separate complex linear factors NEVER counts as "over the reals."',
    targetedMisconceptions: [`${COMPLEXROOTS}:MC-1`, `${COMPLEXROOTS}:MC-2`, `${COMPLEXROOTS}:MC-3`],
    source: eb(COMPLEXROOTS, 'Core Understanding — the conjugate-pair guarantee needs no verification, a root list must be checked against the degree, and factoring over the reals requires combining a conjugate pair into one real quadratic'),
  },
]

export const MATHEMATICS_ALGEBRA_VIETAS_COMPLEX_ROOTS_PROBES: SeedProbe[] = [
  // --- math.alg.vietas-formulas ------------------------------------------
  {
    conceptId: VIETAS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For 2x²−7x+3=0, what is the sum of the roots?',
    choices: [
      { text: '7/2 — the sum is −b/a = −(−7)/2 = 7/2; the division by the leading coefficient a=2 is always required', isCorrect: true },
      { text: '7 — simply −b, without dividing by the leading coefficient', isCorrect: false, misconceptionId: `${VIETAS}:MC-1` },
      { text: '−7 — simply b, taken directly from the equation', isCorrect: false, misconceptionId: `${VIETAS}:MC-1` },
    ],
    targetedMisconceptions: [`${VIETAS}:MC-1`],
    source: eb(VIETAS, 'Detection probe (Blueprint) — the sum and product of roots must always be divided by the leading coefficient a, which is structurally forced by matching coefficients in the factored form'),
  },
  {
    conceptId: VIETAS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For the cubic x³−6x²+11x−6=0, verified to have roots 1, 2, 3, what determines the sign of the product of all three roots?',
    choices: [
      { text: 'The actual coefficient values: −d/a=−(−6)/1=6, confirmed directly by 1×2×3=6 — the sign comes from computing with the real d and a, never from a memorized "cubic products are negative" rule', isCorrect: true },
      { text: 'A fixed rule that the product of roots for any cubic is always negative', isCorrect: false, misconceptionId: `${VIETAS}:MC-2` },
      { text: 'A fixed rule that the product of roots for any cubic is always positive', isCorrect: false, misconceptionId: `${VIETAS}:MC-2` },
    ],
    targetedMisconceptions: [`${VIETAS}:MC-2`],
    source: eb(VIETAS, 'Detection probe (Blueprint) — each symmetric function\'s sign must be computed from the actual coefficient values, never applied from a memorized fixed pattern disconnected from the specific polynomial'),
  },
  {
    conceptId: VIETAS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'You need to construct a quadratic whose roots sum to 5 and multiply to 6. What is the most direct approach?',
    choices: [
      { text: 'Substitute directly into Vieta\'s formulas in reverse: −b/a=5 and c/a=6; choosing a=1 gives b=−5, c=6, so x²−5x+6=0', isCorrect: true },
      { text: 'Guess candidate quadratics and solve each one with the quadratic formula to check whether its roots happen to sum to 5 and multiply to 6', isCorrect: false, misconceptionId: `${VIETAS}:MC-3` },
      { text: 'It cannot be done without first knowing the individual root values through some other solving method', isCorrect: false, misconceptionId: `${VIETAS}:MC-3` },
    ],
    targetedMisconceptions: [`${VIETAS}:MC-3`],
    source: eb(VIETAS, 'Detection probe (Blueprint) — Vieta\'s formulas run in reverse: given desired root properties, substitute directly to find the coefficients, with no root-solving or guess-and-check needed'),
  },

  // --- math.alg.complex-polynomial-roots -------------------------------------------
  {
    conceptId: COMPLEXROOTS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'A real-coefficient cubic has a known root 2+3i. Should you substitute 2−3i back into the polynomial to verify it is also a root before accepting it?',
    choices: [
      { text: 'No — conjugating both sides of p(2+3i)=0 and using that every coefficient is real (equal to its own conjugate) gives p(2−3i)=0 directly; this is a proven guarantee, not a pattern needing case-by-case confirmation', isCorrect: true },
      { text: 'Yes — every claimed root, including a conjugate, should be verified by substitution before being accepted', isCorrect: false, misconceptionId: `${COMPLEXROOTS}:MC-1` },
      { text: 'Yes, since conjugate pairing is only a heuristic that usually but not always holds', isCorrect: false, misconceptionId: `${COMPLEXROOTS}:MC-1` },
    ],
    targetedMisconceptions: [`${COMPLEXROOTS}:MC-1`],
    source: eb(COMPLEXROOTS, 'Detection probe (Blueprint) — the conjugate-pair guarantee is a proven structural fact following directly from real coefficients, never a pattern requiring individual verification'),
  },
  {
    conceptId: COMPLEXROOTS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A real-coefficient polynomial has roots 2, 1+i, 1−i. Factoring it "over the reals," can (x−(1+i)) and (x−(1−i)) each be left as separate final factors?',
    choices: [
      { text: 'No — each of those factors individually has non-real coefficients; they must be multiplied together into the single real quadratic x²−2x+2, giving the full factorization (x−2)(x²−2x+2)', isCorrect: true },
      { text: 'Yes — since each factor correctly corresponds to one of the polynomial\'s actual roots', isCorrect: false, misconceptionId: `${COMPLEXROOTS}:MC-2` },
      { text: 'Yes, as long as both complex factors are listed together in the final answer', isCorrect: false, misconceptionId: `${COMPLEXROOTS}:MC-2` },
    ],
    targetedMisconceptions: [`${COMPLEXROOTS}:MC-2`],
    source: eb(COMPLEXROOTS, 'Detection probe (Blueprint) — "factoring over the reals" requires every factor to have real coefficients; a conjugate pair must be combined into one real quadratic, never left as two separate complex linear factors'),
  },
  {
    conceptId: COMPLEXROOTS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A degree-6 real-coefficient polynomial\'s known roots so far are 1, 2, 3, 1+i — four listed. Is this root list complete?',
    choices: [
      { text: 'No — the degree guarantees exactly 6 roots, and 1+i being non-real means its conjugate 1−i must also be a root, bringing the count to 5, with one more root still needed', isCorrect: true },
      { text: 'Yes — four distinct roots have been found, and that is sufficient once no further roots come easily', isCorrect: false, misconceptionId: `${COMPLEXROOTS}:MC-3` },
      { text: 'Yes, since the Fundamental Theorem of Algebra only guarantees an upper bound on the number of roots, not an exact count', isCorrect: false, misconceptionId: `${COMPLEXROOTS}:MC-3` },
    ],
    targetedMisconceptions: [`${COMPLEXROOTS}:MC-3`],
    source: eb(COMPLEXROOTS, 'Detection probe (Blueprint) — a root list must be checked against the polynomial\'s degree via the Fundamental Theorem of Algebra, never assumed complete just because no further roots come easily'),
  },
]
