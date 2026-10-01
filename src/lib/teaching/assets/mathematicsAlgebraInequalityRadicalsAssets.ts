/**
 * Second math.alg asset batch — inequality-1var and radicals.
 *
 * Continues serving-asset coverage for math.alg (2/45 -> 4/45). Transcribed
 * from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.alg.inequality-1var.md and
 * math.alg.radicals.md.
 *
 *   INEQ1VAR  inequality-1var — the sign-flip decision is unanswerable
 *             before variable terms are collected; every operation on a
 *             compound inequality applies to all three parts at once;
 *             cancelling variable terms yields always-true or
 *             always-false, never forces an interval.
 *   RADICALS  radicals — combining radicals needs both index and radicand
 *             to match, never just a shared radical sign; a binomial
 *             radical denominator needs the conjugate, never the same
 *             expression; extraction must pull out the LARGEST perfect
 *             power, not just any factor.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const INEQ1VAR = 'math.alg.inequality-1var'
const RADICALS = 'math.alg.radicals'

export const MATHEMATICS_ALGEBRA_INEQUALITY_RADICALS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: INEQ1VAR, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'When a variable appears on both sides of an inequality, the sign-flip decision cannot be '
      + 'judged from the ORIGINAL form — there is no single isolating coefficient yet, since '
      + 'variable terms haven\'t been consolidated. Collecting them onto one side is a MANDATORY '
      + 'first stage, and the flip question only becomes answerable afterward.\n\n'
      + 'A compound inequality a < mx+b < c is two glued statements; ANY operation applied must '
      + 'hit ALL THREE parts (left bound, middle, right bound) at every step, and a negative '
      + 'multiplication or division flips BOTH directions and reorders the bounds.\n\n'
      + 'If the variable terms on both sides are literally identical, collecting cancels the '
      + 'variable entirely, leaving a bare constant-vs-constant comparison that is either '
      + 'UNCONDITIONALLY TRUE (all reals) or UNCONDITIONALLY FALSE (empty set) — a genuinely '
      + 'different kind of answer from an interval, never forced into interval shape.',
    targetedMisconceptions: [`${INEQ1VAR}:MC-1`, `${INEQ1VAR}:MC-2`, `${INEQ1VAR}:MC-3`],
    source: eb(INEQ1VAR, 'Core Understanding — the flip decision requires collection first, compound inequalities move as one unit across three parts, cancelling variables yields always-true/false not an interval'),
  },
  {
    conceptId: RADICALS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A radical expression ⁿ√a is the fractional exponent a^(1/n) — every rule here follows from '
      + 'that identity. Combining like radicals requires BOTH the index AND the radicand to '
      + 'match, exactly like combining like terms requires the variable part to match: 3√2+5√3 '
      + 'cannot be merged, since √2 and √3 are as different as two different variables; √2 and '
      + '³√2 share a radicand but different indices, and are likewise unlike (different '
      + 'numerical values).\n\n'
      + 'Rationalizing a SINGLE radical term multiplies by that same radical over itself. A '
      + 'BINOMIAL denominator containing a radical needs the CONJUGATE instead — multiplying '
      + '(4+√2) by itself does NOT eliminate the radical (it produces 9+6√2+2, still carrying '
      + '√2); only the conjugate (4-√2) triggers the difference-of-squares identity that '
      + 'actually removes it.\n\n'
      + 'Simplifying a radical means extracting the LARGEST perfect n-th-power factor, never just '
      + 'any factor: √72 simplified to 2√18 is technically equivalent but INCOMPLETE, since 18 '
      + 'still hides a perfect-square factor (9); the fully reduced form is 6√2.',
    targetedMisconceptions: [`${RADICALS}:MC-1`, `${RADICALS}:MC-2`, `${RADICALS}:MC-3`],
    source: eb(RADICALS, 'Core Understanding — combining radicals needs both index and radicand to match, a binomial denominator needs the conjugate, extraction must find the largest perfect power'),
  },
]

export const MATHEMATICS_ALGEBRA_INEQUALITY_RADICALS_PROBES: SeedProbe[] = [
  // --- math.alg.inequality-1var --------------------------------------------------
  {
    conceptId: INEQ1VAR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Can the sign-flip rule be applied directly to 3x + 5 < 7x - 11, before collecting the variable terms onto one side?',
    choices: [
      { text: 'No — there is no single isolating coefficient to check yet; variable terms must be collected first, and only then does the flip question become answerable', isCorrect: true },
      { text: 'Yes — the sign of the original coefficients on either side already determines whether a flip is needed', isCorrect: false, misconceptionId: `${INEQ1VAR}:MC-1` },
      { text: 'Yes, since the sign-flip rule applies to any inequality regardless of its form', isCorrect: false, misconceptionId: `${INEQ1VAR}:MC-1` },
    ],
    targetedMisconceptions: [`${INEQ1VAR}:MC-1`],
    source: eb(INEQ1VAR, 'Assessment gate — the sign-flip decision is unanswerable until variable terms are collected onto one side'),
  },
  {
    conceptId: INEQ1VAR, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'When solving a compound inequality like a < mx+b < c, can each "side" be manipulated independently?',
    choices: [
      { text: 'No — every operation must apply to all three parts (left bound, middle, right bound) simultaneously, with a negative multiplication or division flipping both directions', isCorrect: true },
      { text: 'Yes — each bound and the middle expression can be treated as separate, independent problems', isCorrect: false, misconceptionId: `${INEQ1VAR}:MC-2` },
      { text: 'Yes, as long as the final answer looks like a valid interval', isCorrect: false, misconceptionId: `${INEQ1VAR}:MC-2` },
    ],
    targetedMisconceptions: [`${INEQ1VAR}:MC-2`],
    source: eb(INEQ1VAR, 'Misconception register — every operation on a compound inequality must apply to all three parts at once'),
  },
  {
    conceptId: INEQ1VAR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Must every linear inequality\'s solution be some genuine interval of real numbers?',
    choices: [
      { text: 'No — if the variable terms cancel during collection (identical coefficients on both sides), the result is a bare constant comparison that is either always true (all reals) or always false (empty set), never an interval', isCorrect: true },
      { text: 'Yes — every linear inequality produces some range of x values', isCorrect: false, misconceptionId: `${INEQ1VAR}:MC-3` },
      { text: 'Yes, and a cancelled variable always indicates a computational error', isCorrect: false, misconceptionId: `${INEQ1VAR}:MC-3` },
    ],
    targetedMisconceptions: [`${INEQ1VAR}:MC-3`],
    source: eb(INEQ1VAR, 'Transfer probe — cancelling variable terms yields an always-true or always-false statement, a genuinely different outcome from an interval'),
  },

  // --- math.alg.radicals --------------------------------------------------------
  {
    conceptId: RADICALS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Can 3√2 + 5√3 be simplified into a single combined radical term?',
    choices: [
      { text: 'No — √2 and √3 are as different as two different variables x and y; combining like radicals requires both the index and the radicand to match, and here the radicands differ', isCorrect: true },
      { text: 'Yes — any two radical terms can be merged by adding their radicands or coefficients', isCorrect: false, misconceptionId: `${RADICALS}:MC-1` },
      { text: 'Yes, since both terms contain a radical sign', isCorrect: false, misconceptionId: `${RADICALS}:MC-1` },
    ],
    targetedMisconceptions: [`${RADICALS}:MC-1`],
    source: eb(RADICALS, 'Assessment gate — combining radicals requires both index and radicand to match exactly'),
  },
  {
    conceptId: RADICALS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'To rationalize the denominator of 3/(4+√2), should you multiply top and bottom by (4+√2) itself, or by its conjugate (4-√2)?',
    choices: [
      { text: 'The conjugate (4-√2) — multiplying by (4+√2) itself gives 9+6√2+2, which still carries the radical; only the conjugate triggers difference-of-squares and removes it', isCorrect: true },
      { text: '(4+√2) itself, the same technique used for a single radical term', isCorrect: false, misconceptionId: `${RADICALS}:MC-2` },
      { text: 'Either one works equally well to eliminate the radical', isCorrect: false, misconceptionId: `${RADICALS}:MC-2` },
    ],
    targetedMisconceptions: [`${RADICALS}:MC-2`],
    source: eb(RADICALS, 'Misconception register — a binomial radical denominator requires the conjugate, never the same expression'),
  },
  {
    conceptId: RADICALS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is 2√18 a fully simplified form of √72?',
    choices: [
      { text: 'No — 18 still hides a perfect-square factor (9), so further extraction gives 6√2, the fully reduced form; simplification means pulling out the LARGEST perfect-power factor, not stopping after one extraction', isCorrect: true },
      { text: 'Yes — once any perfect-square factor has been extracted, the simplification is complete', isCorrect: false, misconceptionId: `${RADICALS}:MC-3` },
      { text: 'Yes, since 2√18 and 6√2 are not numerically equal, so both cannot be valid', isCorrect: false, misconceptionId: `${RADICALS}:MC-3` },
    ],
    targetedMisconceptions: [`${RADICALS}:MC-3`],
    source: eb(RADICALS, 'Transfer probe — extraction must continue until the largest perfect-power factor is found, never stop after the first'),
  },
]
