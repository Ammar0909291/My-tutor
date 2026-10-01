/**
 * Fifth math.alg asset batch — system-linear-equations and logarithm.
 *
 * Continues serving-asset coverage for math.alg (22/59 -> 24/59).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.alg.system-linear-equations.md
 * and math.alg.logarithm.md.
 *
 *   SYSTEMLINEAR system-linear-equations — substitution must use the OTHER
 *                equation, never the one the expression was derived from;
 *                elimination needs opposite-signed coefficients, never
 *                just any combination; 0=0 means infinitely many
 *                solutions, never no solution.
 *   LOGARITHM    logarithm — a logarithm of a non-positive number is
 *                undefined, never computable as some numeric answer; the
 *                inverse-composition identities are one idea applied in
 *                two directions, never two separate memorized facts; the
 *                base's position must be tracked precisely across
 *                notations.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const SYSTEMLINEAR = 'math.alg.system-linear-equations'
const LOGARITHM = 'math.alg.logarithm'

export const MATHEMATICS_ALGEBRA_SYSTEMS_LOGARITHM_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: SYSTEMLINEAR, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'Solving {x+y=5, x=3-y} by substitution: the isolated expression x=3-y must be substituted '
      + 'into the OTHER equation (x+y=5), NEVER the equation it came from — substituting back into '
      + 'the same equation just reconstructs an identity, revealing nothing about y.\n\n'
      + 'Elimination requires the target variable\'s coefficients to be additive inverses BEFORE '
      + 'adding: for {3x+2y=13, 3x-y=7}, both have +3x (same sign), so the equations must be '
      + 'SUBTRACTED (or one negated first), never added directly — adding same-signed coefficients '
      + 'produces a valid equation where the target variable has NOT actually been eliminated.\n\n'
      + 'After elimination, reaching 0=0 means the two equations describe the IDENTICAL line — '
      + 'INFINITELY MANY solutions, never "no solution." Reaching a false statement like 0=5 means '
      + 'the lines are parallel — genuinely NO solution. "Nothing is left" (0=0) means every value '
      + 'works, the opposite of "nothing works."',
    targetedMisconceptions: [`${SYSTEMLINEAR}:MC-1`, `${SYSTEMLINEAR}:MC-2`, `${SYSTEMLINEAR}:MC-3`],
    source: eb(SYSTEMLINEAR, 'Core Understanding — substitution must target the other equation, elimination needs opposite-signed coefficients, 0=0 means infinitely many solutions'),
  },
  {
    conceptId: LOGARITHM, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'log_a(x) is THE EXPONENT to which a must be raised to produce x: log_a(x)=y iff a^y=x — the '
      + 'inverse of the exponential function. The domain restriction x>0 is FORCED, never '
      + 'arbitrary: since a^y>0 for EVERY real y, there is NO exponent that could ever satisfy '
      + 'a^y=x for x≤0, so log_2(-8) and log_5(0) are genuinely UNDEFINED — never computable as '
      + 'some numeric answer.\n\n'
      + 'log_a(a^n)=n and a^(log_a(n))=n are NOT two separate facts to memorize — they are ONE '
      + 'inverse-function idea (f^-1(f(x))=x and f(f^-1(x))=x) applied in two directions, exactly '
      + 'like any function composed with its own inverse.\n\n'
      + 'Converting between log_a(x)=y and a^y=x requires tracking three roles (base, exponent, '
      + 'argument) whose visual position SHIFTS between forms (the base is a subscript in log '
      + 'form, the main term in exponential form) — this shift must be tracked precisely, never '
      + 'assumed to carry over by position alone.',
    targetedMisconceptions: [`${LOGARITHM}:MC-1`, `${LOGARITHM}:MC-2`, `${LOGARITHM}:MC-3`],
    source: eb(LOGARITHM, 'Core Understanding — logarithms of non-positive numbers are undefined, the inverse identities are one idea in two directions, the base\'s position shifts between notations'),
  },
]

export const MATHEMATICS_ALGEBRA_SYSTEMS_LOGARITHM_PROBES: SeedProbe[] = [
  // --- math.alg.system-linear-equations ------------------------------------------
  {
    conceptId: SYSTEMLINEAR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Given {x+y=5, x=3}, where should x=3 be substituted?',
    choices: [
      { text: 'Into x+y=5 (the OTHER equation) — substituting back into the equation x was found from just reconstructs an identity, revealing nothing new', isCorrect: true },
      { text: 'Back into the equation x=3 was derived from', isCorrect: false, misconceptionId: `${SYSTEMLINEAR}:MC-1` },
      { text: 'It does not matter which equation, since both contain x', isCorrect: false, misconceptionId: `${SYSTEMLINEAR}:MC-1` },
    ],
    targetedMisconceptions: [`${SYSTEMLINEAR}:MC-1`],
    source: eb(SYSTEMLINEAR, 'Assessment gate (Blueprint P41) — substitution must target the equation not yet used, never the one the expression was derived from'),
  },
  {
    conceptId: SYSTEMLINEAR, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For {3x+2y=13, 3x-y=7}, does adding or subtracting the equations eliminate x?',
    choices: [
      { text: 'Subtracting — both equations have +3x (same sign), so adding would give 6x+y=20, where x is NOT eliminated; subtracting cancels the matching x terms', isCorrect: true },
      { text: 'Adding — combining the two equations directly always eliminates the target variable', isCorrect: false, misconceptionId: `${SYSTEMLINEAR}:MC-2` },
      { text: 'Either operation eliminates x equally well', isCorrect: false, misconceptionId: `${SYSTEMLINEAR}:MC-2` },
    ],
    targetedMisconceptions: [`${SYSTEMLINEAR}:MC-2`],
    source: eb(SYSTEMLINEAR, 'Misconception register (Blueprint P41) — elimination requires opposite-signed coefficients, checked before adding or subtracting'),
  },
  {
    conceptId: SYSTEMLINEAR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'After eliminating a variable, you reach the statement 0 = 0. What does this mean?',
    choices: [
      { text: 'Infinitely many solutions — the statement holds for every value, meaning the two original equations describe the identical line', isCorrect: true },
      { text: 'No solution — since nothing is left of the variable, nothing works', isCorrect: false, misconceptionId: `${SYSTEMLINEAR}:MC-3` },
      { text: 'A computational error must have occurred', isCorrect: false, misconceptionId: `${SYSTEMLINEAR}:MC-3` },
    ],
    targetedMisconceptions: [`${SYSTEMLINEAR}:MC-3`],
    source: eb(SYSTEMLINEAR, 'Transfer probe (Blueprint P41) — 0=0 means infinitely many solutions, the opposite of no solution'),
  },

  // --- math.alg.logarithm --------------------------------------------------------
  {
    conceptId: LOGARITHM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Evaluate log_2(-8).',
    choices: [
      { text: 'Undefined — since a^y>0 for every real y, no exponent y could ever satisfy 2^y=-8', isCorrect: true },
      { text: 'A specific negative number, computed directly', isCorrect: false, misconceptionId: `${LOGARITHM}:MC-1` },
      { text: '-3, by analogy with log_2(8)=3', isCorrect: false, misconceptionId: `${LOGARITHM}:MC-1` },
    ],
    targetedMisconceptions: [`${LOGARITHM}:MC-1`],
    source: eb(LOGARITHM, 'Assessment gate (Blueprint) — the logarithm of a non-positive number is genuinely undefined, forced by the exponential function\'s always-positive range'),
  },
  {
    conceptId: LOGARITHM, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Why does log_a(a^n) = n?',
    choices: [
      { text: 'Because log_a and a^(·) are genuine inverse functions, and f^-1(f(x))=x for any function and its inverse — this is the general inverse-function principle, not a separate memorized fact', isCorrect: true },
      { text: 'It is a special pattern unique to logarithms with no connection to inverse functions generally', isCorrect: false, misconceptionId: `${LOGARITHM}:MC-2` },
      { text: 'It only works for specific bases a, not as a general rule', isCorrect: false, misconceptionId: `${LOGARITHM}:MC-2` },
    ],
    targetedMisconceptions: [`${LOGARITHM}:MC-2`],
    source: eb(LOGARITHM, 'Misconception register (Blueprint) — the inverse-composition identities are one general principle applied in two directions, never two separate facts'),
  },
  {
    conceptId: LOGARITHM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Converting log_a(x)=y to exponential form, where does the base a go?',
    choices: [
      { text: 'a becomes the main base of the exponential: a^y=x — the base\'s visual position shifts from a subscript in log form to the main term in exponential form', isCorrect: true },
      { text: 'a stays in the same visual position in both forms, since the conversion is a direct rewrite', isCorrect: false, misconceptionId: `${LOGARITHM}:MC-3` },
      { text: 'a becomes the exponent in the exponential form', isCorrect: false, misconceptionId: `${LOGARITHM}:MC-3` },
    ],
    targetedMisconceptions: [`${LOGARITHM}:MC-3`],
    source: eb(LOGARITHM, 'Transfer probe (Blueprint) — the base\'s position shifts between logarithmic and exponential notation, requiring careful tracking'),
  },
]
