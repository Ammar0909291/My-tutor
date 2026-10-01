/**
 * Seventh math.alg asset batch — factor-theorem and discriminant.
 *
 * Continues serving-asset coverage for math.alg (26/59 -> 28/59).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.alg.factor-theorem.md
 * and math.alg.discriminant.md.
 *
 *   FACTORTHM   factor-theorem — a must still be derived by solving
 *               (divisor)=0, never read off its visible sign; finding one
 *               factor of a cubic-or-higher polynomial is one step, never
 *               the finished factorisation, until the quotient is
 *               deflated and re-tested; Rational Root candidates bound
 *               the search to a finite list, never open-ended guessing.
 *   DISCRIM     discriminant — a zero discriminant means one REPEATED
 *               real root, never "no solution"; a negative discriminant
 *               means two complex conjugate roots exist, never "no
 *               solution" outright — "no real solution" and "no
 *               solution" are different claims.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const FACTORTHM = 'math.alg.factor-theorem'
const DISCRIM = 'math.alg.discriminant'

export const MATHEMATICS_ALGEBRA_FACTOR_DISCRIMINANT_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: FACTORTHM, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'The Factor Theorem states that (x−a) is a factor of p(x) if and only if p(a)=0 — this is NOT '
      + 'a second fact alongside the Remainder Theorem, it is the Remainder Theorem\'s own logic '
      + 'examined at exactly the one special value where the remainder is zero. Since dividing p(x) '
      + 'by (x−a) leaves remainder p(a), and a divisor is a true factor precisely when that remainder '
      + 'is zero, "p(a)=0 implies (x−a) is a factor" follows with no new machinery. As with the '
      + 'Remainder Theorem, a must be derived by solving (divisor)=0, NEVER read off the divisor\'s '
      + 'visible sign.\n\n'
      + 'The theorem\'s real power is in ITERATING, not a single test: once a factor (x−a) is '
      + 'confirmed, dividing p(x) by it (synthetic division) produces a quotient one degree lower, to '
      + 'which the theorem is applied again — this DEFLATION step turns a one-shot test into a '
      + 'complete factorisation. Treating the first successful test as the finished answer stops the '
      + 'process before a cubic-or-higher polynomial\'s remaining factors have been found.\n\n'
      + 'Because testing arbitrary values is unbounded, the Rational Root candidates — every value of '
      + 'the form (a divisor of the constant term) / (a divisor of the leading coefficient) — narrow '
      + 'the search to a small, finite, checkable list, turning "guess forever" into "check this '
      + 'specific short list."',
    targetedMisconceptions: [`${FACTORTHM}:MC-1`, `${FACTORTHM}:MC-2`, `${FACTORTHM}:MC-3`],
    source: eb(FACTORTHM, 'Core Understanding — the theorem is the Remainder Theorem\'s r=0 special case, finding one factor requires deflating and continuing, and the Rational Root candidates bound the search to a finite list'),
  },
  {
    conceptId: DISCRIM, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'The discriminant Δ=b²−4ac of ax²+bx+c=0 determines the nature of its roots without fully '
      + 'applying the quadratic formula, because it is EXACTLY the expression under that formula\'s '
      + 'radical. When Δ>0, the square root of a positive number is real and nonzero, so the ± '
      + 'produces two DIFFERENT values: two distinct real roots. When Δ=0, the square root of zero is '
      + 'zero, collapsing both ± branches onto the SAME value, x=−b/2a: ONE REPEATED real root — a '
      + 'genuine solution occurring twice, NOT an absence of solutions. When Δ<0, the square root of '
      + 'a negative number is imaginary, producing a genuine pair of complex conjugate roots p±qi — '
      + 'solutions that DO exist, just not among the real numbers.\n\n'
      + '"No real solution" and "no solution" are entirely different claims. A zero discriminant is '
      + 'never "no solution" — it is one repeated real root. A negative discriminant is never "no '
      + 'solution" outright — it is two complex conjugate roots, genuinely existing, just not real. '
      + 'The discriminant lets a learner answer "how many roots, and of what kind?" with a single '
      + 'quick computation, entirely before — and without needing — the fuller work of actually '
      + 'solving the equation.',
    targetedMisconceptions: [`${DISCRIM}:MC-1`, `${DISCRIM}:MC-2`, `${DISCRIM}:MC-3`],
    source: eb(DISCRIM, 'Core Understanding — the discriminant is the quadratic formula\'s own radical term; zero means one repeated real root and negative means two complex conjugate roots, never "no solution" in either case'),
  },
]

export const MATHEMATICS_ALGEBRA_FACTOR_DISCRIMINANT_PROBES: SeedProbe[] = [
  // --- math.alg.factor-theorem ------------------------------------------
  {
    conceptId: FACTORTHM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'To test whether (x+5) is a factor of p(x) using the Factor Theorem, which value of a should you evaluate p(a) at?',
    choices: [
      { text: 'a = −5, since solving x+5=0 gives x=−5 — never the divisor\'s visible constant read directly', isCorrect: true },
      { text: 'a = 5, the visible constant in the divisor', isCorrect: false, misconceptionId: `${FACTORTHM}:MC-1` },
      { text: 'Either sign works, since only whether the result is zero matters', isCorrect: false, misconceptionId: `${FACTORTHM}:MC-1` },
    ],
    targetedMisconceptions: [`${FACTORTHM}:MC-1`],
    source: eb(FACTORTHM, 'Detection probe (Blueprint P41) — the test value a is derived by solving (divisor)=0, identical to the sign-derivation rule already secured in the Remainder Theorem'),
  },
  {
    conceptId: FACTORTHM, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For a cubic p(x), you find p(2)=0, confirming (x−2) is a factor. Is the factorisation now complete?',
    choices: [
      { text: 'No — divide p(x) by (x−2) to get a quotient one degree lower (a quadratic), then apply the theorem again to that quotient', isCorrect: true },
      { text: 'Yes — finding one confirmed factor means the factorisation is done', isCorrect: false, misconceptionId: `${FACTORTHM}:MC-2` },
      { text: 'Yes, since the Factor Theorem\'s job is only to find a single factor', isCorrect: false, misconceptionId: `${FACTORTHM}:MC-2` },
    ],
    targetedMisconceptions: [`${FACTORTHM}:MC-2`],
    source: eb(FACTORTHM, 'Detection probe (Blueprint P41) — finding one factor is one step; deflating the quotient and re-testing is required to reach a complete factorisation of a cubic or higher-degree polynomial'),
  },
  {
    conceptId: FACTORTHM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Before testing any values to factor a monic cubic with integer coefficients and constant term 6, what should you do first?',
    choices: [
      { text: 'Write down the finite list of Rational Root candidates — the divisors of 6 (±1, ±2, ±3, ±6) — and test only those, in order', isCorrect: true },
      { text: 'Start testing arbitrary integers one at a time until one happens to work', isCorrect: false, misconceptionId: `${FACTORTHM}:MC-3` },
      { text: 'Test every integer from 1 to 6 only, since the constant term is 6', isCorrect: false, misconceptionId: `${FACTORTHM}:MC-3` },
    ],
    targetedMisconceptions: [`${FACTORTHM}:MC-3`],
    source: eb(FACTORTHM, 'Detection probe (Blueprint P41) — the Rational Root candidates (divisors of the constant term over divisors of the leading coefficient) bound the search to a specific, finite, checkable list'),
  },

  // --- math.alg.discriminant -------------------------------------------
  {
    conceptId: DISCRIM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For x²−6x+9=0, the discriminant Δ=(−6)²−4(1)(9)=36−36=0. What does this mean?',
    choices: [
      { text: 'One repeated real root, x=3 — Δ=0 collapses the ± into a single genuine value, not an absence of solutions', isCorrect: true },
      { text: 'The equation has no solution', isCorrect: false, misconceptionId: `${DISCRIM}:MC-1` },
      { text: 'The equation cannot be solved using the quadratic formula', isCorrect: false, misconceptionId: `${DISCRIM}:MC-1` },
    ],
    targetedMisconceptions: [`${DISCRIM}:MC-1`],
    source: eb(DISCRIM, 'Detection probe (Blueprint) — a zero discriminant collapses the ± into one real value, a genuine repeated solution, never "no solution"'),
  },
  {
    conceptId: DISCRIM, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For x²+2x+5=0, the discriminant Δ=(2)²−4(1)(5)=4−20=−16, which is negative. What does this mean?',
    choices: [
      { text: 'No REAL solution, but two complex conjugate roots genuinely exist: x=−1±2i', isCorrect: true },
      { text: 'The equation has no solution at all', isCorrect: false, misconceptionId: `${DISCRIM}:MC-2` },
      { text: 'The equation was set up incorrectly, since a negative discriminant is impossible', isCorrect: false, misconceptionId: `${DISCRIM}:MC-2` },
    ],
    targetedMisconceptions: [`${DISCRIM}:MC-2`],
    source: eb(DISCRIM, 'Detection probe (Blueprint) — "no real solution" and "no solution" are different claims; a negative discriminant means complex conjugate roots exist, not that nothing exists'),
  },
  {
    conceptId: DISCRIM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For 2x²+7x−4=0, compute the discriminant Δ=b²−4ac carefully.',
    choices: [
      { text: 'Δ=(7)²−4(2)(−4)=49−(−32)=49+32=81 — two negative signs multiplying to a positive, computed explicitly', isCorrect: true },
      { text: 'Δ=49−32=17, treating −4ac as simply subtracting the product of the magnitudes', isCorrect: false, misconceptionId: `${DISCRIM}:MC-3` },
      { text: 'Δ=49−(-4)(2)(4)=49-32=17 by dropping the sign on c before multiplying', isCorrect: false, misconceptionId: `${DISCRIM}:MC-3` },
    ],
    targetedMisconceptions: [`${DISCRIM}:MC-3`],
    source: eb(DISCRIM, 'Detection probe (Blueprint) — negative b or c values must be explicitly parenthesised before squaring or multiplying to avoid a sign error in the discriminant'),
  },
]
