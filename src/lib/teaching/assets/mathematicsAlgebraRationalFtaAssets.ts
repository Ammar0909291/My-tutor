/**
 * Ninth math.alg asset batch — rational-expressions and fundamental-theorem-algebra.
 *
 * Continues serving-asset coverage for math.alg (30/59 -> 32/59).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.alg.rational-expressions.md
 * and math.alg.fundamental-theorem-algebra.md.
 *
 *   RATIONALEXPR rational-expressions — the domain restriction is a
 *                property of the ORIGINAL denominator, never the
 *                simplified one, and survives cancellation; only a
 *                genuine multiplicative factor of the WHOLE numerator/
 *                denominator can be cancelled, never an added term;
 *                addition/subtraction needs a genuine common
 *                denominator, never combining tops and bottoms
 *                separately.
 *   FTA          fundamental-theorem-algebra — the theorem's actual
 *                minimal claim is "at least one complex root exists,"
 *                never "exactly n roots"; the "exactly n" statement
 *                follows by REPEATING that minimal claim, never as a
 *                separately-proved fact; the proof genuinely requires
 *                analytic tools (Liouville's theorem), never a purely
 *                algebraic one, despite the theorem's algebraic name
 *                and use.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const RATIONALEXPR = 'math.alg.rational-expressions'
const FTA = 'math.alg.fundamental-theorem-algebra'

export const MATHEMATICS_ALGEBRA_RATIONAL_FTA_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: RATIONALEXPR, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A rational expression p(x)/q(x), with p and q polynomials and q(x)≠0, is the direct '
      + 'algebraic generalisation of a numeric fraction — every rule already fluent for numbers '
      + '(simplify by factoring and cancelling; the four arithmetic operations) applies here with '
      + 'polynomial factoring standing in for integer factoring. The one genuinely new idea is the '
      + 'DOMAIN RESTRICTION: every value of x making the ORIGINAL denominator zero must be '
      + 'permanently excluded — and this exclusion is a property of the original expression as '
      + 'GIVEN, never of whatever simplified form it eventually takes. Cancelling a shared factor '
      + 'does NOT bring back an excluded value merely because it no longer appears in the '
      + 'simplified denominator.\n\n'
      + 'Cancellation is only valid for a factor that is genuinely MULTIPLIED across the whole '
      + 'numerator and the whole denominator, never for a term that is merely ADDED inside a larger '
      + 'sum — for (x+3)/x, the x terms cannot be cancelled, exactly as 7 cannot be "cancelled" '
      + 'from (7+3)/7.\n\n'
      + 'The four arithmetic operations mirror numeric fraction rules exactly: multiplication '
      + 'multiplies straight across then simplifies; division multiplies by the reciprocal; '
      + 'addition and subtraction require a genuine common denominator (typically the LCD built '
      + 'from each denominator\'s factored form) — NEVER combining numerators and denominators '
      + 'independently, which is not a valid operation for fractions of any kind, numeric or '
      + 'algebraic.',
    targetedMisconceptions: [`${RATIONALEXPR}:MC-1`, `${RATIONALEXPR}:MC-2`, `${RATIONALEXPR}:MC-3`],
    source: eb(RATIONALEXPR, 'Core Understanding — the domain restriction comes from the original denominator and survives simplification, only multiplicative factors can be cancelled, and addition requires a genuine common denominator'),
  },
  {
    conceptId: FTA, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'The Fundamental Theorem of Algebra\'s ACTUAL minimal claim — the one genuinely requiring '
      + 'proof — is simply that any non-constant polynomial with complex coefficients has AT LEAST '
      + 'ONE root somewhere in ℂ. Over the real numbers, polynomials like x²+1 have NO roots at '
      + 'all, but ℂ is specifically constructed so that EVERY non-constant polynomial is guaranteed '
      + 'a root: p(i)=i²+1=−1+1=0, so x=i is a root of x²+1.\n\n'
      + 'The familiar, stronger-sounding "exactly n roots" statement is NOT a separately-proved '
      + 'fact — it follows directly from REPEATING the minimal claim: given at least one root r₁ '
      + 'exists, the Factor Theorem gives p(x)=(x−r₁)q(x) with q(x) of degree n−1; applying the '
      + 'MINIMAL claim AGAIN to q(x) gives another root r₂, and so on, n times total, producing the '
      + 'full factorisation p(x)=c(x−r₁)(x−r₂)⋯(x−rₙ) — exactly n roots, obtained purely by '
      + 'repeatedly invoking the SAME minimal existence claim, never a separately-proved stronger '
      + 'fact.\n\n'
      + 'Despite the theorem\'s algebraic name and constant algebraic use, NO purely algebraic '
      + 'proof of even the minimal claim exists — every known proof requires tools from complex '
      + 'ANALYSIS, for instance Liouville\'s theorem (a bounded entire function must be constant), '
      + 'applied to 1/p(z) to derive a contradiction if p had no roots at all.',
    targetedMisconceptions: [`${FTA}:MC-1`, `${FTA}:MC-2`, `${FTA}:MC-3`],
    source: eb(FTA, 'Core Understanding — the theorem\'s minimal claim is "at least one root exists," the "exactly n" statement follows by repeated application, and the proof genuinely requires analytic (not algebraic) tools'),
  },
]

export const MATHEMATICS_ALGEBRA_RATIONAL_FTA_PROBES: SeedProbe[] = [
  // --- math.alg.rational-expressions ------------------------------------------
  {
    conceptId: RATIONALEXPR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: '(x²−9)/(x²+x−12) simplifies to (x+3)/(x+4) after cancelling (x−3). What is the correct domain restriction?',
    choices: [
      { text: 'x≠−4, 3 — the ORIGINAL denominator (x+4)(x−3) is zero at both values, and cancelling (x−3) does not remove that exclusion', isCorrect: true },
      { text: 'x≠−4 only, reading the simplified denominator (x+4)', isCorrect: false, misconceptionId: `${RATIONALEXPR}:MC-1` },
      { text: 'There is no domain restriction once the expression has been simplified', isCorrect: false, misconceptionId: `${RATIONALEXPR}:MC-1` },
    ],
    targetedMisconceptions: [`${RATIONALEXPR}:MC-1`],
    source: eb(RATIONALEXPR, 'Detection probe — the domain is a property of the original expression as given; simplification changes appearance, never the domain'),
  },
  {
    conceptId: RATIONALEXPR, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does (x+3)/x simplify to 3 by cancelling the x terms?',
    choices: [
      { text: 'No — x is added to 3 in the numerator, not multiplied across the whole numerator, so it cannot be cancelled; just as 7 cannot be cancelled from (7+3)/7', isCorrect: true },
      { text: 'Yes — any matching symbol appearing in both numerator and denominator can be cancelled', isCorrect: false, misconceptionId: `${RATIONALEXPR}:MC-2` },
      { text: 'Yes, since x appears in both the numerator and denominator', isCorrect: false, misconceptionId: `${RATIONALEXPR}:MC-2` },
    ],
    targetedMisconceptions: [`${RATIONALEXPR}:MC-2`],
    source: eb(RATIONALEXPR, 'Detection probe — only a true multiplicative factor of the whole numerator/denominator can be cancelled, never a term that is merely added within a sum'),
  },
  {
    conceptId: RATIONALEXPR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'How should 3/(x−2) + 5/(x+1) be computed?',
    choices: [
      { text: 'Build the LCD (x−2)(x+1), rewrite each fraction over it, then add numerators: [3(x+1)+5(x−2)]/[(x−2)(x+1)] = (8x−7)/[(x−2)(x+1)]', isCorrect: true },
      { text: 'Add the numerators and denominators separately: (3+5)/[(x−2)+(x+1)]', isCorrect: false, misconceptionId: `${RATIONALEXPR}:MC-3` },
      { text: 'Since the denominators differ, simply place both numerators over either one of the original denominators', isCorrect: false, misconceptionId: `${RATIONALEXPR}:MC-3` },
    ],
    targetedMisconceptions: [`${RATIONALEXPR}:MC-3`],
    source: eb(RATIONALEXPR, 'Detection probe — addition/subtraction of rational expressions requires a genuine common denominator (the LCD), never combining numerators and denominators independently'),
  },

  // --- math.alg.fundamental-theorem-algebra -------------------------------------------
  {
    conceptId: FTA, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What is the Fundamental Theorem of Algebra\'s actual MINIMAL statement?',
    choices: [
      { text: 'Every non-constant polynomial with complex coefficients has AT LEAST ONE root in ℂ — the "exactly n roots" version is a consequence of this, not the minimal claim itself', isCorrect: true },
      { text: 'Every degree-n polynomial has exactly n roots — this is the theorem\'s own foundational form', isCorrect: false, misconceptionId: `${FTA}:MC-1` },
      { text: 'Every polynomial has at least one real root', isCorrect: false, misconceptionId: `${FTA}:MC-1` },
    ],
    targetedMisconceptions: [`${FTA}:MC-1`],
    source: eb(FTA, 'Detection probe (Blueprint) — the true minimal claim is "at least one root exists," a simpler and more basic statement than the commonly-used "exactly n roots" version'),
  },
  {
    conceptId: FTA, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For p(x)=x³−6x²+11x−6, finding one root (r₁=1), factoring, finding another (r₂=2), factoring again to get the third (r₃=3) — is "exactly 3 roots" proved by one theorem or three separate theorems?',
    choices: [
      { text: 'One theorem, applied three times in succession — the minimal existence claim is invoked repeatedly, once per degree reduction, not proved separately each time', isCorrect: true },
      { text: 'Three separate theorems, one for each root found', isCorrect: false, misconceptionId: `${FTA}:MC-2` },
      { text: 'The "exactly 3" count requires its own independent proof, unrelated to the existence claim used to find each root', isCorrect: false, misconceptionId: `${FTA}:MC-2` },
    ],
    targetedMisconceptions: [`${FTA}:MC-2`],
    source: eb(FTA, 'Detection probe (Blueprint) — "exactly n roots" follows from repeating the same minimal existence claim n times, not from a separately-proved stronger fact'),
  },
  {
    conceptId: FTA, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'The Fundamental Theorem of Algebra is used constantly for algebraic purposes like factoring and root-counting. Does that mean its proof is also purely algebraic?',
    choices: [
      { text: 'No — every known proof requires tools from complex ANALYSIS (e.g. Liouville\'s theorem, applied to 1/p(z)); there is a genuine gap between the theorem\'s algebraic name/use and its analytic proof', isCorrect: true },
      { text: 'Yes — a theorem used for algebra must have an algebraic proof', isCorrect: false, misconceptionId: `${FTA}:MC-3` },
      { text: 'Yes, since the theorem itself is stated using only algebraic objects (polynomials and roots)', isCorrect: false, misconceptionId: `${FTA}:MC-3` },
    ],
    targetedMisconceptions: [`${FTA}:MC-3`],
    source: eb(FTA, 'Detection probe (Blueprint) — despite the theorem\'s algebraic name and use, no purely algebraic proof exists; every known proof requires analytic tools'),
  },
]
