/**
 * Sixth math.alg asset batch — remainder-theorem and quadratic-formula.
 *
 * Continues serving-asset coverage for math.alg (24/59 -> 26/59).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.alg.remainder-theorem.md
 * and math.alg.quadratic-formula.md.
 *
 *   REMAINDERTHM remainder-theorem — a must be derived by solving
 *                (divisor)=0, never read off the divisor's visible sign;
 *                the theorem holds unconditionally, a nonzero remainder
 *                is just as complete an answer as a zero one; p(a) IS the
 *                remainder exactly, never an approximation needing
 *                verification by long division.
 *   QUADFORMULA  quadratic-formula — the formula is completing-the-square's
 *                own procedure run with symbols, never an unrelated fact
 *                to memorise; once derived it replaces re-derivation with
 *                direct substitution; the discriminant's SIGN alone
 *                answers "how many real roots," never requiring the
 *                equation to be fully solved first.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const REMAINDERTHM = 'math.alg.remainder-theorem'
const QUADFORMULA = 'math.alg.quadratic-formula'

export const MATHEMATICS_ALGEBRA_REMAINDER_QUADRATIC_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: REMAINDERTHM, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'The Remainder Theorem is not a new fact to memorise — it is a direct, two-line consequence '
      + 'of the Division Algorithm: p(x) = (x−a)q(x) + r, where r is a constant. Substituting x = a '
      + 'makes the first term vanish — (a−a)·q(a) = 0·q(a) = 0 — leaving p(a) = r, EXACTLY. This is '
      + 'not an approximation or a shortcut that "usually works"; it is an algebraic identity, which '
      + 'means p(a) deserves complete trust rather than habitual re-verification by long division.\n\n'
      + 'The theorem places NO restriction on r: it holds identically whether r turns out to be zero '
      + 'or not. A nonzero remainder is exactly as legitimate and exactly as fully answered a '
      + 'question as a zero one — treating "the theorem gives a useful answer" as conditional on '
      + 'r = 0 conflates this general statement with the Factor Theorem, a separate, narrower '
      + 'special case.\n\n'
      + 'The one place genuine care is required is identifying a: it is NEVER read directly off the '
      + 'divisor\'s visible sign, but derived by solving (divisor) = 0 for x. For (x−3), solving '
      + 'x−3=0 gives a=3. For (x+5), rewritten as (x−(−5)), solving gives a=−5 — the sign of a is '
      + 'the OPPOSITE of the divisor\'s visible constant whenever that constant is being added.',
    targetedMisconceptions: [`${REMAINDERTHM}:MC-1`, `${REMAINDERTHM}:MC-2`, `${REMAINDERTHM}:MC-3`],
    source: eb(REMAINDERTHM, 'Core Understanding — a is derived by solving (divisor)=0 not read off its sign, the theorem holds unconditionally regardless of whether r is zero, and p(a) equals the remainder exactly with no verification needed'),
  },
  {
    conceptId: QUADFORMULA, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'The quadratic formula is not a separate fact to memorise — it is exactly what completing '
      + 'the square\'s own non-monic procedure produces when run with letters instead of numbers. '
      + 'Applying that identical procedure to ax²+bx+c=0 with a, b, c left as general symbols: '
      + 'factor out a, complete the square, distribute and isolate, divide by a, take the square '
      + 'root — giving x=(−b±√(b²−4ac))/2a, produced by the EXACT SAME procedure already verified '
      + 'on a specific numeric case, now confirmed to work identically with general symbols.\n\n'
      + 'The formula\'s entire practical payoff is that, once derived, it lets any quadratic '
      + 'ax²+bx+c=0 be solved by DIRECT SUBSTITUTION of a, b, c — no need to repeat the '
      + 'completing-the-square process for every new equation; subsequent problems become '
      + 'substitution-and-arithmetic, not a fresh derivation.\n\n'
      + 'At an orientation level, the quantity under the square root, b²−4ac (the discriminant), '
      + 'determines how many distinct real roots the equation has WITHOUT needing to fully solve '
      + 'for them: positive gives two distinct real roots, zero gives exactly one repeated real '
      + 'root, negative gives no real roots. The discriminant\'s SIGN ALONE — a single quick '
      + 'computation, performed before any square root or final answer is needed — answers this '
      + 'question completely on its own; the full three-way classification is developed in this '
      + 'concept\'s own unlock, math.alg.discriminant.',
    targetedMisconceptions: [`${QUADFORMULA}:MC-1`, `${QUADFORMULA}:MC-2`, `${QUADFORMULA}:MC-3`],
    source: eb(QUADFORMULA, 'Core Understanding — the formula is completing-the-square run with symbols, once derived it is applied by direct substitution rather than re-derivation, and the discriminant\'s sign alone determines the root count before any solving'),
  },
]

export const MATHEMATICS_ALGEBRA_REMAINDER_QUADRATIC_PROBES: SeedProbe[] = [
  // --- math.alg.remainder-theorem ------------------------------------------
  {
    conceptId: REMAINDERTHM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'To find the remainder of p(x) divided by (x+3) using the Remainder Theorem, what value of a should you substitute into p(a)?',
    choices: [
      { text: 'a = −3, because solving x+3=0 gives x=−3 — the sign is the OPPOSITE of the divisor\'s visible "+3"', isCorrect: true },
      { text: 'a = 3, using the divisor\'s visible constant directly', isCorrect: false, misconceptionId: `${REMAINDERTHM}:MC-1` },
      { text: 'It does not matter which sign you use, since only the magnitude affects the remainder', isCorrect: false, misconceptionId: `${REMAINDERTHM}:MC-1` },
    ],
    targetedMisconceptions: [`${REMAINDERTHM}:MC-1`],
    source: eb(REMAINDERTHM, 'Detection probe (Blueprint P41) — a is derived by solving (divisor)=0, never by reading the divisor\'s visible sign'),
  },
  {
    conceptId: REMAINDERTHM, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'p(x)=x²+1 is divided by (x−1). Computing p(1)=2, a nonzero result. What does this tell you?',
    choices: [
      { text: 'The remainder is exactly 2 — a complete, correct answer; the theorem holds unconditionally whether or not the remainder is zero', isCorrect: true },
      { text: 'The theorem does not really apply here, since the remainder is not zero', isCorrect: false, misconceptionId: `${REMAINDERTHM}:MC-2` },
      { text: 'A nonzero result means the computation must be redone, since the theorem is meant to find factors', isCorrect: false, misconceptionId: `${REMAINDERTHM}:MC-2` },
    ],
    targetedMisconceptions: [`${REMAINDERTHM}:MC-2`],
    source: eb(REMAINDERTHM, 'Detection probe (Blueprint P41) — the theorem states remainder=p(a) unconditionally; the Factor Theorem\'s r=0 case is a narrower, separate corollary, not a precondition'),
  },
  {
    conceptId: REMAINDERTHM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'p(x)=x³+2x+1 divided by (x−1) gives p(1)=4 by substitution. Should you also perform long division to verify this is really the remainder?',
    choices: [
      { text: 'No — p(x)=(x−a)q(x)+r substituted at x=a proves p(a)=r as an algebraic identity, holding for every polynomial and every a; long division would produce the identical number, not a more trustworthy one', isCorrect: true },
      { text: 'Yes — substitution is a shortcut that usually works, so long division should confirm it before trusting the result', isCorrect: false, misconceptionId: `${REMAINDERTHM}:MC-3` },
      { text: 'Yes, but only when the remainder looks like an unusual number', isCorrect: false, misconceptionId: `${REMAINDERTHM}:MC-3` },
    ],
    targetedMisconceptions: [`${REMAINDERTHM}:MC-3`],
    source: eb(REMAINDERTHM, 'Detection probe (Blueprint P41) — the substitution proof (p(x)=(x−a)q(x)+r, substitute x=a, first term vanishes, p(a)=r) is a proven identity, not a pattern requiring habitual re-verification by division'),
  },

  // --- math.alg.quadratic-formula -------------------------------------------
  {
    conceptId: QUADFORMULA, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Where does the quadratic formula x=(−b±√(b²−4ac))/2a actually come from?',
    choices: [
      { text: 'It is completing-the-square\'s own non-monic procedure, applied to the general ax²+bx+c=0 with a, b, c left as symbols instead of numbers', isCorrect: true },
      { text: 'It is an independent fact to memorise, unrelated to completing the square', isCorrect: false, misconceptionId: `${QUADFORMULA}:MC-1` },
      { text: 'It was discovered empirically by testing many quadratics and finding a pattern', isCorrect: false, misconceptionId: `${QUADFORMULA}:MC-1` },
    ],
    targetedMisconceptions: [`${QUADFORMULA}:MC-1`],
    source: eb(QUADFORMULA, 'Detection probe (Blueprint) — the formula is the symbolic output of completing-the-square\'s already-trusted procedure, not a standalone memorised fact'),
  },
  {
    conceptId: QUADFORMULA, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'You need to solve a brand-new equation, 2x²+5x−3=0. Having already derived the quadratic formula once, what should you do?',
    choices: [
      { text: 'Substitute a=2, b=5, c=−3 directly into the formula — no need to repeat completing the square, since the formula IS the already-derived shortcut', isCorrect: true },
      { text: 'Complete the square again from scratch on this new equation, since each equation is different', isCorrect: false, misconceptionId: `${QUADFORMULA}:MC-2` },
      { text: 'Re-derive the formula symbolically again before applying it, to make sure it still applies', isCorrect: false, misconceptionId: `${QUADFORMULA}:MC-2` },
    ],
    targetedMisconceptions: [`${QUADFORMULA}:MC-2`],
    source: eb(QUADFORMULA, 'Detection probe (Blueprint) — once derived, the formula replaces re-derivation with direct substitution for every new quadratic'),
  },
  {
    conceptId: QUADFORMULA, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Without solving x²+4x+4=0 all the way through, can you tell how many real roots it has?',
    choices: [
      { text: 'Yes — compute the discriminant b²−4ac=16−16=0; a discriminant of exactly zero means exactly one repeated real root, with no further solving needed', isCorrect: true },
      { text: 'No — the equation must be fully solved for x first, and only then can the roots be counted', isCorrect: false, misconceptionId: `${QUADFORMULA}:MC-3` },
      { text: 'No — the number of roots can only be determined by graphing the equation', isCorrect: false, misconceptionId: `${QUADFORMULA}:MC-3` },
    ],
    targetedMisconceptions: [`${QUADFORMULA}:MC-3`],
    source: eb(QUADFORMULA, 'Detection probe (Blueprint) — the discriminant\'s sign alone (positive=two roots, zero=one repeated root, negative=no real roots) answers the root-count question before any solving is performed'),
  },
]
