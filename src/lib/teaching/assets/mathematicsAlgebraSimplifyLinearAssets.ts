/**
 * First math.alg asset batch — simplification and linear-equation-2var.
 *
 * Opens serving-asset coverage for math.alg (0/45 -> 2/45). Transcribed
 * from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.alg.simplification.md and
 * math.alg.linear-equation-2var.md.
 *
 *   SIMPLIFY   simplification — every term inside a bracket must be
 *              multiplied, none skipped; a negative outside factor is
 *              ordinary distribution by -1, never a separate sign-flip
 *              rule; expand-then-collect is fixed order, and freshly
 *              expanded unlike terms must not be over-merged.
 *   LINEAR2VAR linear-equation-2var — a two-variable equation has
 *              infinitely many ordered-pair solutions, never a single
 *              number; a reported solution must always be a full pair;
 *              "infinitely many" describes the set's size, never that
 *              any pair whatsoever qualifies.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const SIMPLIFY = 'math.alg.simplification'
const LINEAR2VAR = 'math.alg.linear-equation-2var'

export const MATHEMATICS_ALGEBRA_SIMPLIFY_LINEAR_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: SIMPLIFY, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'Simplifying a bracketed expression is two already-known operations run in a fixed order: '
      + 'distribute, then collect like terms. Distribution means EVERY term inside the brackets '
      + 'gets multiplied by the outside factor, none skipped: 3(x+5) is 3x+15, never 3x+5 (the '
      + '+5 carried across unmultiplied). A negative outside factor is NOT a separate rule — it '
      + 'is ordinary distribution where the factor happens to be -1: -(x-3)=(-1)(x)+(-1)(-3)=-x+3, '
      + 'every sign following from multiplying by -1, never a memorized "flip the sign" ritual '
      + 'applied only to the nearest term.\n\n'
      + 'The order is fixed because collecting like terms needs to know how many terms there '
      + 'really are, and the bracket hides that count until expanded. After correctly expanding, '
      + 'only genuinely LIKE terms may be merged — freshly expanded terms that look unfamiliar '
      + 'must still be checked by the same same-variable-part test, never merged just because '
      + 'they appear together in a sum.',
    targetedMisconceptions: [`${SIMPLIFY}:MC-1`, `${SIMPLIFY}:MC-2`, `${SIMPLIFY}:MC-3`],
    source: eb(SIMPLIFY, 'Core Understanding — every bracketed term must be multiplied, negative factors are ordinary distribution by -1, only genuinely like terms may be merged after expansion'),
  },
  {
    conceptId: LINEAR2VAR, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'A linear equation in two variables, ax+by=c, is a CONSTRAINT, not a calculation with a '
      + 'single numerical answer. Because two unknowns and only one equation leave one degree of '
      + 'freedom, choosing any value for x still leaves a solvable one-variable equation in y — '
      + 'and since x can be chosen from infinitely many reals, the equation has INFINITELY MANY '
      + 'solutions, one ordered pair per choice. Reporting only "x=6" (having set y=0 to find it) '
      + 'is incomplete: a solution to a two-variable equation is always a PAIR, both coordinates '
      + 'together.\n\n'
      + '"Infinitely many solutions" describes the SIZE of the solution set, never its membership '
      + 'rule: it does NOT mean any pair whatsoever satisfies the equation. For 2x+3y=12, the '
      + 'pair (1,1) gives 2+3=5≠12 and is genuinely NOT a solution, despite infinitely many other '
      + 'pairs being valid. Verifying whether a candidate pair is a solution always requires '
      + 'substituting BOTH coordinates simultaneously and checking the result is true.',
    targetedMisconceptions: [`${LINEAR2VAR}:MC-1`, `${LINEAR2VAR}:MC-2`, `${LINEAR2VAR}:MC-3`],
    source: eb(LINEAR2VAR, 'Core Understanding — a two-variable equation has infinitely many pair solutions, a solution is always a full pair, infinitely many does not mean any pair qualifies'),
  },
]

export const MATHEMATICS_ALGEBRA_SIMPLIFY_LINEAR_PROBES: SeedProbe[] = [
  // --- math.alg.simplification ---------------------------------------------------
  {
    conceptId: SIMPLIFY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Expand 4(3x - 2).',
    choices: [
      { text: '12x - 8 — the outside factor 4 must multiply BOTH terms inside the bracket, not just the first', isCorrect: true },
      { text: '12x - 2 — multiplying only the first term, leaving the second unchanged', isCorrect: false, misconceptionId: `${SIMPLIFY}:MC-1` },
      { text: '4x - 2 — treating the bracket as a single term to add 4 to', isCorrect: false, misconceptionId: `${SIMPLIFY}:MC-1` },
    ],
    targetedMisconceptions: [`${SIMPLIFY}:MC-1`],
    source: eb(SIMPLIFY, 'Assessment gate (Blueprint P49) — every term inside the bracket must be multiplied, none skipped'),
  },
  {
    conceptId: SIMPLIFY, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Expand -(x - 3).',
    choices: [
      { text: '-x + 3 — the whole bracket is multiplied by -1, so the interior minus sign is also negated: (-1)(x)+(-1)(-3)=-x+3', isCorrect: true },
      { text: '-x - 3 — the minus sign only attaches to the first term, leaving the -3 as is', isCorrect: false, misconceptionId: `${SIMPLIFY}:MC-2` },
      { text: 'x - 3 — the leading minus sign has no effect on the bracket at all', isCorrect: false, misconceptionId: `${SIMPLIFY}:MC-2` },
    ],
    targetedMisconceptions: [`${SIMPLIFY}:MC-2`],
    source: eb(SIMPLIFY, 'Misconception register (Blueprint P41) — a negative outside factor negates every enclosed term, never just the nearest one'),
  },
  {
    conceptId: SIMPLIFY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Simplify 3(x + 2) - 2x.',
    choices: [
      { text: 'x + 6 — expand first to get 3x+6-2x, then collect only the genuinely like terms (3x and -2x), leaving 6 unmerged', isCorrect: true },
      { text: 'x + 2 — merging 3x, 6, and -2x all together into one combined term', isCorrect: false, misconceptionId: `${SIMPLIFY}:MC-3` },
      { text: '6 - x — merging the constant 6 with the x-terms incorrectly', isCorrect: false, misconceptionId: `${SIMPLIFY}:MC-3` },
    ],
    targetedMisconceptions: [`${SIMPLIFY}:MC-3`],
    source: eb(SIMPLIFY, 'Transfer probe (Blueprint P41) — only genuinely like terms may be merged after expansion, never all resulting terms indiscriminately'),
  },

  // --- math.alg.linear-equation-2var -----------------------------------------------
  {
    conceptId: LINEAR2VAR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'The equation 4x + 2y = 20 has how many solutions?',
    choices: [
      { text: 'Infinitely many — choosing any value for x and solving for y gives a valid ordered-pair solution, e.g. (0,10) and (5,0) are both solutions', isCorrect: true },
      { text: 'Exactly one solution, found by solving for x', isCorrect: false, misconceptionId: `${LINEAR2VAR}:MC-1` },
      { text: 'It cannot be solved without a second equation', isCorrect: false, misconceptionId: `${LINEAR2VAR}:MC-1` },
    ],
    targetedMisconceptions: [`${LINEAR2VAR}:MC-1`],
    source: eb(LINEAR2VAR, 'Assessment gate (Blueprint P49) — a two-variable linear equation has infinitely many solutions, never a single unique answer'),
  },
  {
    conceptId: LINEAR2VAR, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Find TWO different solutions to 3x + y = 9.',
    choices: [
      { text: '(0,9) and (2,3) — both written as full ordered pairs, each satisfying the equation', isCorrect: true },
      { text: 'x=0 and x=2 — reporting only the x-values without their paired y-values', isCorrect: false, misconceptionId: `${LINEAR2VAR}:MC-2` },
      { text: '"3" and "9" — reporting the coefficients rather than solution pairs', isCorrect: false, misconceptionId: `${LINEAR2VAR}:MC-2` },
    ],
    targetedMisconceptions: [`${LINEAR2VAR}:MC-2`],
    source: eb(LINEAR2VAR, 'Misconception register (Blueprint P49) — a solution is always a complete ordered pair, never a bare number'),
  },
  {
    conceptId: LINEAR2VAR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is (1, 1) a solution to 2x + 3y = 12?',
    choices: [
      { text: 'No — substituting gives 2(1)+3(1)=5≠12; "infinitely many solutions" describes the set\'s size, not that every pair qualifies, so each candidate must still be verified by substitution', isCorrect: true },
      { text: 'Yes — since the equation has infinitely many solutions, any pair works', isCorrect: false, misconceptionId: `${LINEAR2VAR}:MC-3` },
      { text: 'Yes, without needing to substitute, since x and y can be anything', isCorrect: false, misconceptionId: `${LINEAR2VAR}:MC-3` },
    ],
    targetedMisconceptions: [`${LINEAR2VAR}:MC-3`],
    source: eb(LINEAR2VAR, 'Transfer probe (Blueprint P49) — infinitely many solutions never means any candidate pair qualifies, verification by substitution is always required'),
  },
]
