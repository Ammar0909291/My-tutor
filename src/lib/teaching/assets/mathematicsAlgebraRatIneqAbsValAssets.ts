/**
 * Nineteenth math.alg asset batch — rational-inequality and absolute-value-equations.
 *
 * Continues serving-asset coverage for math.alg (50/59 -> 52/59).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.alg.rational-inequality.md
 * and math.alg.absolute-value-equations.md.
 *
 *   RATIONALINEQ rational-inequality — critical points come from BOTH
 *                the numerator AND the denominator, never numerator
 *                zeros alone; a denominator zero is EXCLUDED
 *                unconditionally regardless of the inequality's
 *                strictness, never included even in a non-strict
 *                inequality; a variable-sign denominator must never be
 *                cross-multiplied directly, always move everything to
 *                one side first.
 *   ABSVALEQ     absolute-value-equations — the sign of k must be
 *                checked BEFORE case-splitting |expr|=k, since a
 *                negative k means no solution at all, never solved by
 *                splitting anyway; |expr|<k gives a single CONNECTED
 *                interval (AND), while |expr|>k gives two DISCONNECTED
 *                pieces (OR), never the same structure for both
 *                directions.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const RATIONALINEQ = 'math.alg.rational-inequality'
const ABSVALEQ = 'math.alg.absolute-value-equations'

export const MATHEMATICS_ALGEBRA_RAT_INEQ_ABS_VAL_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: RATIONALINEQ, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A rational inequality p(x)/q(x)>0 (or <,≥,≤) is solved by the SAME sign-chart procedure as a '
      + 'polynomial inequality, but critical points now come from TWO sources, never one: zeros of '
      + 'the NUMERATOR p(x) behave as before, while zeros of the DENOMINATOR q(x) are a new kind of '
      + 'critical point where the expression is UNDEFINED, not zero. A sign chart built from '
      + 'numerator zeros alone is incomplete.\n\n'
      + 'Endpoint inclusion depends on SOURCE: a numerator zero may be included when the inequality '
      + 'is non-strict (≤,≥), following the ordinary rule; a denominator zero is EXCLUDED '
      + 'UNCONDITIONALLY, regardless of the inequality\'s strictness — no strictness symbol can ever '
      + 'include a point where the expression simply does not exist. For (x−3)/(x+2)≥0, x=3 is '
      + 'included but x=−2 is NEVER included, even though the symbol is non-strict.\n\n'
      + 'A rational inequality generally CANNOT be solved by cross-multiplying the denominator '
      + 'directly, since the denominator\'s sign is unknown across the domain and multiplying by a '
      + 'negative quantity flips the inequality — for (x+1)/(x−2)>1, cross-multiplying gives the '
      + 'flawed "x+1>x−2" (always true), while the correct approach moves everything to ONE side '
      + 'first: (x+1)/(x−2)−1>0 → 3/(x−2)>0, giving the correct x>2.',
    targetedMisconceptions: [`${RATIONALINEQ}:MC-1`, `${RATIONALINEQ}:MC-2`, `${RATIONALINEQ}:MC-3`],
    source: eb(RATIONALINEQ, 'Core Understanding — critical points come from both numerator and denominator zeros, a denominator zero is always excluded regardless of strictness, and cross-multiplication is unsafe since the denominator\'s sign is unknown'),
  },
  {
    conceptId: ABSVALEQ, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'An absolute value equation |expression|=k asks what values make the expression\'s distance '
      + 'from zero equal k. Because a distance value k corresponds to exactly two points, the '
      + 'expression must equal either k or −k — this two-case split is a direct restatement of what '
      + 'absolute value means, never an arbitrary trick. Critically, the sign of k must be checked '
      + 'BEFORE splitting into cases: since distance is never negative, if k is negative the equation '
      + 'has NO SOLUTION at all — splitting anyway (as with |3x+1|=−4) produces candidate values that '
      + 'fail to check out, wasted work that the sign check would have caught immediately.\n\n'
      + 'Absolute value inequalities extend the same idea to a range, but the two directions produce '
      + 'genuinely DIFFERENT structures: |expression|<k asks for points CLOSER to zero than k, a '
      + 'single CONNECTED region between −k and k (both conditions must hold — an AND). '
      + '|expression|>k asks for points FARTHER from zero than k, which falls into two SEPARATE, '
      + 'DISCONNECTED pieces (either past k or past −k — an OR). The same logical structure never '
      + 'applies to both directions.',
    targetedMisconceptions: [`${ABSVALEQ}:MC-1`, `${ABSVALEQ}:MC-2`, `${ABSVALEQ}:MC-3`],
    source: eb(ABSVALEQ, 'Core Understanding — the sign of k must be checked before case-splitting since distance is never negative, and the two inequality directions produce genuinely different AND/connected versus OR/disconnected structures'),
  },
]

export const MATHEMATICS_ALGEBRA_RAT_INEQ_ABS_VAL_PROBES: SeedProbe[] = [
  // --- math.alg.rational-inequality ------------------------------------------
  {
    conceptId: RATIONALINEQ, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Solving (x-3)/(x+2)>0, what are ALL the critical points for the sign chart?',
    choices: [
      { text: 'x=3 (numerator zero) AND x=−2 (denominator zero) — both sources must be checked before constructing the chart', isCorrect: true },
      { text: 'x=3 only, the zero of the numerator', isCorrect: false, misconceptionId: `${RATIONALINEQ}:MC-3` },
      { text: 'x=−2 only, the zero of the denominator', isCorrect: false, misconceptionId: `${RATIONALINEQ}:MC-3` },
    ],
    targetedMisconceptions: [`${RATIONALINEQ}:MC-3`],
    source: eb(RATIONALINEQ, 'Detection probe (Blueprint) — a rational inequality\'s sign chart requires critical points from both the numerator\'s zeros AND the denominator\'s zeros, never one source alone'),
  },
  {
    conceptId: RATIONALINEQ, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Solving the non-strict inequality (x-3)/(x+2)≥0, using critical points x=3 and x=−2, should both be included in the solution set?',
    choices: [
      { text: 'No — x=3 (numerator zero) is included, but x=−2 (denominator zero) is EXCLUDED regardless of the non-strict symbol, since the expression is undefined there, not zero', isCorrect: true },
      { text: 'Yes — the inequality is non-strict, so both critical points are included', isCorrect: false, misconceptionId: `${RATIONALINEQ}:MC-1` },
      { text: 'Yes, since both values make the sign chart change at that point', isCorrect: false, misconceptionId: `${RATIONALINEQ}:MC-1` },
    ],
    targetedMisconceptions: [`${RATIONALINEQ}:MC-1`],
    source: eb(RATIONALINEQ, 'Detection probe (Blueprint) — a denominator zero is excluded unconditionally regardless of the inequality\'s strictness, since the expression is undefined there rather than equal to zero'),
  },
  {
    conceptId: RATIONALINEQ, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'To solve (x+1)/(x-2)>1, can you cross-multiply directly to get x+1>x−2?',
    choices: [
      { text: 'No — the sign of (x−2) is unknown across the domain, so cross-multiplying could require flipping the inequality; instead move everything to one side first: (x+1)/(x−2)−1>0 simplifies to 3/(x−2)>0, giving the correct x>2', isCorrect: true },
      { text: 'Yes — cross-multiplication is always safe for inequalities, just as it is for equations', isCorrect: false, misconceptionId: `${RATIONALINEQ}:MC-2` },
      { text: 'Yes, since x+1>x−2 correctly simplifies to the always-true statement 1>−2, meaning every x works', isCorrect: false, misconceptionId: `${RATIONALINEQ}:MC-2` },
    ],
    targetedMisconceptions: [`${RATIONALINEQ}:MC-2`],
    source: eb(RATIONALINEQ, 'Detection probe (Blueprint) — cross-multiplying a rational inequality is unsafe since the denominator\'s sign is unknown and may require flipping the inequality; move everything to one side first instead'),
  },

  // --- math.alg.absolute-value-equations -------------------------------------------
  {
    conceptId: ABSVALEQ, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Solving |3x+1|=−4, what should be done first?',
    choices: [
      { text: 'Check the sign of −4: since it is negative and distance can never be negative, the equation has NO SOLUTION — no case-splitting is needed or valid', isCorrect: true },
      { text: 'Split immediately into 3x+1=−4 or 3x+1=4, then solve each case', isCorrect: false, misconceptionId: `${ABSVALEQ}:MC-1` },
      { text: 'Split into 3x+1=4 only, since the other case cannot be valid', isCorrect: false, misconceptionId: `${ABSVALEQ}:MC-1` },
    ],
    targetedMisconceptions: [`${ABSVALEQ}:MC-1`],
    source: eb(ABSVALEQ, 'Detection probe (Blueprint P41) — the sign of the right-hand side must be checked before case-splitting; a negative value means no solution exists, since distance is never negative'),
  },
  {
    conceptId: ABSVALEQ, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Do |x−2|<5 and |x−2|>5 have the same logical structure (both AND, or both OR)?',
    choices: [
      { text: 'No — |x−2|<5 is a single connected "between" interval (AND: both conditions must hold), while |x−2|>5 is two disconnected "outside" pieces (OR: either condition suffices)', isCorrect: true },
      { text: 'Yes — both inequalities split into two conditions, so both use the same AND structure', isCorrect: false, misconceptionId: `${ABSVALEQ}:MC-2` },
      { text: 'Yes, both use the OR structure since both come from splitting an absolute value', isCorrect: false, misconceptionId: `${ABSVALEQ}:MC-2` },
    ],
    targetedMisconceptions: [`${ABSVALEQ}:MC-2`],
    source: eb(ABSVALEQ, 'Detection probe (Blueprint P41) — |expression|<k produces a connected AND-region while |expression|>k produces two disconnected OR-pieces; the two directions are never structurally interchangeable'),
  },
  {
    conceptId: ABSVALEQ, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'After case-splitting an absolute value equation and finding two candidate values, should they be reported as the final solution immediately?',
    choices: [
      { text: 'No — each candidate should be substituted back into the ORIGINAL absolute value equation to confirm it genuinely checks out, since a case can occasionally fail this check, especially when the expression was not perfectly isolated before splitting', isCorrect: true },
      { text: 'Yes — a correctly executed case split always produces two genuine solutions with no further check needed', isCorrect: false, misconceptionId: `${ABSVALEQ}:MC-3` },
      { text: 'Yes, since verification is only needed for absolute value inequalities, never for equations', isCorrect: false, misconceptionId: `${ABSVALEQ}:MC-3` },
    ],
    targetedMisconceptions: [`${ABSVALEQ}:MC-3`],
    source: eb(ABSVALEQ, 'Detection probe (Blueprint P41) — case-split candidates must be verified by substitution into the original equation, since a candidate can occasionally fail to check out, particularly in embedded contexts'),
  },
]
