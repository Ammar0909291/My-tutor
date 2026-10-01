/**
 * Fourteenth math.calc asset batch — the multivariable chain rule, implicit
 * differentiation, and multiple (double) integrals.
 *
 * Continues serving-asset coverage for math.calc (43/76 -> 46/76).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.calc.chain-rule-multivariable.md,
 * math.calc.implicit-differentiation.md, and math.calc.multiple-integrals.md.
 *
 *   CHAINMULTIVAR chain-rule-multivariable — every branch of the dependency
 *                 tree contributes a term to the sum, never just the first
 *                 one noticed; partial-derivative notation is required
 *                 throughout once more than one final variable is in play.
 *                 Only 2 misconceptions in the EB entry: MC-1 (dependency-
 *                 tree branch omitted) is reused across FOUNDATIONAL and
 *                 DEVELOPING probes (it is the dominant, explicitly-named
 *                 failure), MC-2 (notation mixed in) gets PROFICIENT.
 *   IMPLICITDIFF  implicit-differentiation — every y-term differentiated
 *                 with respect to x needs the chain-rule factor dy/dx;
 *                 differentiating both sides is only half the task, the
 *                 scattered dy/dx terms must still be collected and
 *                 isolated; the technique is often the more EFFICIENT
 *                 choice, never merely a last resort for equations that
 *                 resist explicit solving.
 *   MULTIPLEINT   multiple-integrals — a non-rectangular region's inner
 *                 bounds must be functions of the outer variable, never
 *                 assumed constant; Fubini's Theorem guarantees either
 *                 integration order gives the same value for continuous
 *                 integrands, once the bounds are correctly set up for
 *                 that order; two boundary curves must be checked at a
 *                 specific value, never judged by overall shape alone.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const CHAINMULTIVAR = 'math.calc.chain-rule-multivariable'
const IMPLICITDIFF = 'math.calc.implicit-differentiation'
const MULTIPLEINT = 'math.calc.multiple-integrals'

export const MATHEMATICS_CALCULUS_CHAIN_RULE_MULTIVAR_IMPLICIT_DIFF_MULTIPLE_INTEGRALS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CHAINMULTIVAR, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'If z=f(x,y) where x=x(t) and y=y(t) (both functions of a single variable t), then '
      + 'dz/dt = (∂z/∂x)(dx/dt) + (∂z/∂y)(dy/dt) — the total rate of change of z SUMS the '
      + 'contribution flowing through EACH intermediate variable separately, since z can change '
      + 'either because x changes, OR because y changes, or both. A DEPENDENCY TREE — z at the '
      + 'top, branching down to x and y, each branching further down to t — makes this path '
      + 'structure explicit: EVERY path from z down to the final variable contributes exactly ONE '
      + 'term, and the total derivative is the SUM of every such path\'s contribution.\n\n'
      + 'When x,y instead depend on TWO variables s,t (x=x(s,t), y=y(s,t)), the analogous rule '
      + 'applies separately for each: ∂z/∂s = (∂z/∂x)(∂x/∂s) + (∂z/∂y)(∂y/∂s) — using PARTIAL '
      + 'derivatives THROUGHOUT this time, since x and y each now genuinely depend on more than '
      + 'one variable, and a total derivative d/ds would be meaningless when x is also affected '
      + 'by a completely separate variable t.',
    targetedMisconceptions: [`${CHAINMULTIVAR}:MC-1`, `${CHAINMULTIVAR}:MC-2`],
    source: eb(CHAINMULTIVAR, 'Core Understanding — every dependency-tree branch contributes a summed term, and partial-derivative notation is required once more than one final variable is genuinely in play'),
  },
  {
    conceptId: IMPLICITDIFF, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'When an equation mixes x and y, with y understood as SOME function of x, differentiating a '
      + 'y-term like y^n with respect to x is exactly a Chain Rule application: d/dx[y^n] = '
      + 'n·y^(n-1)·(dy/dx), with y(x) playing the role of the Chain Rule\'s inner function. This '
      + 'factor dy/dx is NOT optional — it is required every single time a y-term is '
      + 'differentiated, in sharp contrast to an x-term like x^n, which needs no such extra '
      + 'factor.\n\n'
      + 'Implicit differentiation is genuinely NECESSARY for equations like x³+y³=6xy that cannot '
      + 'be algebraically rearranged into an explicit formula y=f(x) at all — differentiating both '
      + 'sides directly and then solving algebraically for dy/dx obtains the derivative WITHOUT '
      + 'ever needing an explicit formula. Even when explicit solving IS possible (a circle, '
      + 'x²+y²=25, giving two branches y=±√(25-x²)), implicit differentiation is often PREFERRED: '
      + 'it handles both branches simultaneously in one pass, never requiring two separate '
      + 'branch-by-branch computations.',
    targetedMisconceptions: [`${IMPLICITDIFF}:MC-1`, `${IMPLICITDIFF}:MC-2`, `${IMPLICITDIFF}:MC-3`],
    source: eb(IMPLICITDIFF, 'Core Understanding — every y-term needs the chain-rule factor dy/dx, differentiating is only half the task, and the technique is often preferred even when explicit solving is available'),
  },
  {
    conceptId: MULTIPLEINT, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'The double integral ∬_R f(x,y) dA over a region R extends "area under a curve" to "signed '
      + 'VOLUME between the surface z=f(x,y) and the xy-plane." Over a rectangular region '
      + 'R=[a,b]×[c,d], computation proceeds by ITERATED INTEGRATION: integrate with respect to '
      + 'one variable first (holding the other fixed), producing a function of the remaining '
      + 'variable, then integrate that result. FUBINI\'S THEOREM guarantees that, for f continuous '
      + 'on the rectangle, either order of integration yields the identical final value.\n\n'
      + 'For a NON-RECTANGULAR region bounded above by one curve and below by another, the INNER '
      + 'integral\'s bounds must be expressed as FUNCTIONS of the outer variable, never constants. '
      + 'For the region between y=x² and y=x over 0≤x≤1, the correct setup is '
      + '∫₀¹∫_{x²}^{x} f(x,y) dy dx — the bounds x² and x genuinely change depending on which '
      + 'x-slice is examined. When two boundary curves cross or look visually similar, which curve '
      + 'sits higher must be checked by plugging in a SPECIFIC value of the outer variable, never '
      + 'guessed from overall shape.',
    targetedMisconceptions: [`${MULTIPLEINT}:MC-1`, `${MULTIPLEINT}:MC-2`, `${MULTIPLEINT}:MC-3`],
    source: eb(MULTIPLEINT, 'Core Understanding — non-rectangular inner bounds must be functions of the outer variable, Fubini guarantees order-independence once bounds are correctly set up, and boundary curves are compared at a specific value, never by overall shape'),
  },
]

export const MATHEMATICS_CALCULUS_CHAIN_RULE_MULTIVAR_IMPLICIT_DIFF_MULTIPLE_INTEGRALS_PROBES: SeedProbe[] = [
  // --- math.calc.chain-rule-multivariable ------------------------------------------
  {
    conceptId: CHAINMULTIVAR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For z=x²y, x=t², y=t³, a student computes dz/dt using only the x-path term (∂z/∂x)(dx/dt) and calls it complete. Is this the full derivative?',
    choices: [
      { text: 'No — the y-path term (∂z/∂y)(dy/dt) is also a genuine contribution, since y also changes as t changes; the full derivative sums BOTH terms', isCorrect: true },
      { text: 'Yes — the x-path term alone is always the complete derivative', isCorrect: false, misconceptionId: `${CHAINMULTIVAR}:MC-1` },
      { text: 'Yes, since only one intermediate variable needs to be tracked at a time', isCorrect: false, misconceptionId: `${CHAINMULTIVAR}:MC-1` },
    ],
    targetedMisconceptions: [`${CHAINMULTIVAR}:MC-1`],
    source: eb(CHAINMULTIVAR, 'Detection probe (Blueprint A01 hook) — check whether every path in the dependency tree is included in the sum'),
  },
  {
    conceptId: CHAINMULTIVAR, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Before writing the multivariable chain-rule formula for z=f(x,y) with x,y both depending on t, what should be done first to avoid missing a contributing term?',
    choices: [
      { text: 'Draw the dependency tree explicitly, confirming every branch from z down to t is represented as a term in the sum', isCorrect: true },
      { text: 'Nothing extra is needed — the formula can be written directly from the symbols that appear', isCorrect: false, misconceptionId: `${CHAINMULTIVAR}:MC-1` },
      { text: 'Only the branch through the variable that changes fastest needs to be included', isCorrect: false, misconceptionId: `${CHAINMULTIVAR}:MC-1` },
    ],
    targetedMisconceptions: [`${CHAINMULTIVAR}:MC-1`],
    source: eb(CHAINMULTIVAR, 'Repair Action B01 — re-draw the dependency tree explicitly, confirming every branch is represented as a term'),
  },
  {
    conceptId: CHAINMULTIVAR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For z=x²+y², x=s+t, y=s-t (so x and y each depend on BOTH s and t), should ∂z/∂s be written using total-derivative (d/ds) or partial-derivative (∂/∂s) notation?',
    choices: [
      { text: 'Partial-derivative notation — x and y each depend on more than one final variable (s and t), so holding the other final variable fixed is a meaningful, necessary operation', isCorrect: true },
      { text: 'Total-derivative notation — since s is the variable being differentiated with respect to', isCorrect: false, misconceptionId: `${CHAINMULTIVAR}:MC-2` },
      { text: 'Either notation is equally valid regardless of how many final variables x and y depend on', isCorrect: false, misconceptionId: `${CHAINMULTIVAR}:MC-2` },
    ],
    targetedMisconceptions: [`${CHAINMULTIVAR}:MC-2`],
    source: eb(CHAINMULTIVAR, 'Detection probe (Blueprint A03 hook) — this directly targets mixing total-derivative notation into a genuinely multi-variable-input scenario'),
  },

  // --- math.calc.implicit-differentiation ------------------------------------------
  {
    conceptId: IMPLICITDIFF, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Differentiating x²+y²=25 with respect to x, is d/dx[y²]=2y correct, treating y² exactly like x²?',
    choices: [
      { text: 'No — since y is a function of x, d/dx[y²]=2y·(dy/dx) by the Chain Rule; the dy/dx factor is required and cannot be omitted', isCorrect: true },
      { text: 'Yes — y-terms and x-terms differentiate identically since both are just variables', isCorrect: false, misconceptionId: `${IMPLICITDIFF}:MC-1` },
      { text: 'Yes, since the power rule alone applies to any variable raised to a power', isCorrect: false, misconceptionId: `${IMPLICITDIFF}:MC-1` },
    ],
    targetedMisconceptions: [`${IMPLICITDIFF}:MC-1`],
    source: eb(IMPLICITDIFF, 'Detection probe (Blueprint B01 P41) — ask a student to differentiate a y-term and check whether they omit the dy/dx factor'),
  },
  {
    conceptId: IMPLICITDIFF, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'After differentiating both sides of x²+y²=25 to get 2x+2y(dy/dx)=0, is this equation already the final formula for dy/dx?',
    choices: [
      { text: 'No — differentiating both sides is only half the task; the scattered dy/dx term must still be collected and isolated, giving dy/dx=-x/y', isCorrect: true },
      { text: 'Yes — once both sides are differentiated, the task is complete', isCorrect: false, misconceptionId: `${IMPLICITDIFF}:MC-2` },
      { text: 'Yes, since dy/dx already appears explicitly in the equation', isCorrect: false, misconceptionId: `${IMPLICITDIFF}:MC-2` },
    ],
    targetedMisconceptions: [`${IMPLICITDIFF}:MC-2`],
    source: eb(IMPLICITDIFF, 'Detection probe (Blueprint B02 P41) — ask a student to finish solving for dy/dx after differentiating both sides, and check whether they stop before collecting scattered terms'),
  },
  {
    conceptId: IMPLICITDIFF, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For x²+y²=25, which COULD be solved explicitly for y (as y=±√(25-x²)), should implicit differentiation still be considered, or only used when explicit solving is impossible?',
    choices: [
      { text: 'It should still be considered — it handles both branches simultaneously in one pass, often more efficient than two separate branch-by-branch computations', isCorrect: true },
      { text: 'Only when explicit solving is genuinely impossible — otherwise explicit solving should always be preferred', isCorrect: false, misconceptionId: `${IMPLICITDIFF}:MC-3` },
      { text: 'Implicit differentiation is a fallback method with no efficiency advantage over explicit solving', isCorrect: false, misconceptionId: `${IMPLICITDIFF}:MC-3` },
    ],
    targetedMisconceptions: [`${IMPLICITDIFF}:MC-3`],
    source: eb(IMPLICITDIFF, 'Detection probe (Blueprint A03 hook) — "should I only use implicit differentiation when an equation genuinely can\'t be solved explicitly for y?" reveals this misconception'),
  },

  // --- math.calc.multiple-integrals ------------------------------------------
  {
    conceptId: MULTIPLEINT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For the region between y=x² and y=x over 0≤x≤1, is ∫₀¹∫₀¹(x+y) dy dx the correct setup?',
    choices: [
      { text: 'No — the inner bounds must be the functions x² and x, giving ∫₀¹∫_{x²}^{x}(x+y) dy dx; constant bounds integrate over the wrong region entirely', isCorrect: true },
      { text: 'Yes — the inner integral\'s bounds are always fixed numbers regardless of the region\'s shape', isCorrect: false, misconceptionId: `${MULTIPLEINT}:MC-1` },
      { text: 'Yes, since 0 and 1 are the overall smallest and largest y-values across the whole region', isCorrect: false, misconceptionId: `${MULTIPLEINT}:MC-1` },
    ],
    targetedMisconceptions: [`${MULTIPLEINT}:MC-1`],
    source: eb(MULTIPLEINT, 'Demonstration — the correct variable-bounds setup contrasted directly against the same region set up incorrectly with constant bounds'),
  },
  {
    conceptId: MULTIPLEINT, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Computing ∬_R xy dA over R=[0,2]×[0,3] by integrating x first gives 9. Should integrating y first over the SAME rectangle give a different answer?',
    choices: [
      { text: 'No — Fubini\'s Theorem guarantees either order gives the identical value (9) for a continuous integrand over a rectangle', isCorrect: true },
      { text: 'Yes — swapping the order of integration always changes the result', isCorrect: false, misconceptionId: `${MULTIPLEINT}:MC-2` },
      { text: 'It cannot be determined without redoing the entire computation from scratch each time', isCorrect: false, misconceptionId: `${MULTIPLEINT}:MC-2` },
    ],
    targetedMisconceptions: [`${MULTIPLEINT}:MC-2`],
    source: eb(MULTIPLEINT, 'Demonstration — integrating x first and y first over the same rectangle both give 9, confirming Fubini\'s Theorem\'s guarantee'),
  },
  {
    conceptId: MULTIPLEINT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For the region between y=√x and y=x² over [0,1], which curve should be treated as the upper bound?',
    choices: [
      { text: 'Check a specific value, e.g. x=0.25: √0.25=0.5 and 0.25²=0.0625, so y=√x is higher — it is the upper bound throughout [0,1], not decided by overall shape alone', isCorrect: true },
      { text: 'y=x² is always the upper bound, since squaring generally produces larger values', isCorrect: false, misconceptionId: `${MULTIPLEINT}:MC-3` },
      { text: 'Whichever curve looks visually "larger" at a glance can be trusted as the upper bound', isCorrect: false, misconceptionId: `${MULTIPLEINT}:MC-3` },
    ],
    targetedMisconceptions: [`${MULTIPLEINT}:MC-3`],
    source: eb(MULTIPLEINT, 'Tutor Recovery Strategy — substitute one specific numeric value of the outer variable into both boundary curves and compare the resulting heights'),
  },
]
