/**
 * Batch: end behavior of polynomials, rational functions (domain, holes
 * vs. asymptotes, degree-comparison end behavior), and step functions
 * (floor/ceiling) — all math.func.
 *
 * math.func.end-behavior and math.func.rational-function both become
 * ready off already-authored math.func.polynomial-function (prior
 * batch); rational-function directly unblocks math.func.vertical-
 * asymptote and math.func.horizontal-asymptote next. math.func.step-
 * function becomes ready off already-authored math.func.piecewise-
 * function (an earlier authoring layer).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.func.end-behavior.md,
 * math.func.rational-function.md, and math.func.step-function.md.
 *
 *   ENDBEHAVIOR end-behavior — end behavior is a claim about x→±∞, never
 *             answered by evaluating at any specific finite value like
 *             f(0) or f(1); an ODD-degree polynomial's two tails point
 *             in OPPOSITE directions, never the same direction the way
 *             even-degree tails do; the x→+∞ and x→-∞ directions must be
 *             computed as two SEPARATE steps for odd degree, never
 *             inferred from each other.
 *   RATIONALFUNC rational-function — a rational function's domain
 *             exclusion is the SAME "no division by zero" fact already
 *             known, never a special new rule invented for rational
 *             functions; a zero of the denominator is a HOLE if it
 *             cancels against a matching numerator factor and a VERTICAL
 *             ASYMPTOTE if it does not — never automatically an asymptote
 *             just because the denominator vanishes there; end behavior
 *             depends on COMPARING the degrees of numerator and
 *             denominator, never merely on both being polynomials.
 *   STEPFUNC  step-function — floor rounds toward -∞ and ceiling rounds
 *             toward +∞, and for NEGATIVE inputs "drop the decimal" gives
 *             the WRONG answer — floor(-2.3)=-3, never -2; the step
 *             function has a genuine jump discontinuity at every integer,
 *             never a smooth connection between steps; each step has
 *             exactly one closed end and one open end determined by the
 *             DEFINITION, never an arbitrary or interchangeable choice.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const ENDBEHAVIOR = 'math.func.end-behavior'
const RATIONALFUNC = 'math.func.rational-function'
const STEPFUNC = 'math.func.step-function'

export const MATHEMATICS_FUNCTIONS_END_BEHAVIOR_RATIONAL_STEP_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: ENDBEHAVIOR, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'As x→±∞, a polynomial behaves like its LEADING TERM alone: dividing f(x)=aₙxⁿ+...+a₀ by xⁿ gives '
      + 'aₙ+aₙ₋₁/x+...+a₀/xⁿ, and every term after aₙ vanishes as x→±∞. End behavior is a claim about '
      + 'this LIMIT, never answered by evaluating at any specific finite value like f(0) or f(1) — for '
      + 'f(x)=x²-100x+2499, f(0)=2499 (large, positive) and f(50)=-1 (small, negative) are wildly '
      + 'different at "ordinary" inputs, but f(10⁶)≈10¹² matches the leading term\'s prediction '
      + 'regardless.\n\n'
      + 'DEGREE PARITY determines same-vs-opposite tails; the LEADING-COEFFICIENT SIGN determines the '
      + 'direction. For f(x)=xⁿ with n EVEN, (-x)ⁿ=xⁿ — no sign change, so both tails go the SAME '
      + 'direction. With n ODD, (-x)ⁿ=-xⁿ — the sign FLIPS, so the tails go in OPPOSITE directions, '
      + 'never the same direction the way even-degree tails do. For an odd-degree polynomial, the '
      + 'x→+∞ and x→-∞ directions must be computed as TWO SEPARATE steps — never inferred from each '
      + 'other by assuming they match.\n\n'
      + 'End behavior and local behavior (zeros, turning points, dips and bumps) are INDEPENDENT axes: '
      + 'the tails are locked in place by the leading term alone, while the middle can wiggle however '
      + 'the coefficients dictate — a correct end-behavior answer says nothing about the interior.',
    targetedMisconceptions: [`${ENDBEHAVIOR}:MC-1`, `${ENDBEHAVIOR}:MC-2`, `${ENDBEHAVIOR}:MC-3`],
    source: eb(ENDBEHAVIOR, 'Core Understanding — end behavior is a limit claim about x approaching infinity never answered by a finite evaluation, degree parity determines whether the tails match or oppose, and odd-degree tails must be computed separately for each direction'),
  },
  {
    conceptId: RATIONALFUNC, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A rational function f(x)=p(x)/q(x)\'s domain excludes wherever q(x)=0 — this is the SAME "no '
      + 'division by zero" fact already known, never a special new rule invented for rational functions '
      + 'specifically. For f(x)=(x+1)/(x²-4), the denominator\'s zeros at x=±2 are excluded, with no '
      + 'separate rule beyond finding where q(x) vanishes.\n\n'
      + 'A zero of the denominator is NOT automatically a vertical asymptote — it depends entirely on '
      + 'whether it CANCELS against a matching numerator factor. For f(x)=(x-2)(x+1)/((x-2)(x-3)): at '
      + 'x=2, the factor (x-2) cancels, leaving a finite value — a HOLE, the function is well-defined '
      + 'and continuous immediately around that point, only the exact input is excluded. At x=3, no '
      + 'matching numerator factor exists, so f genuinely blows up there — a VERTICAL ASYMPTOTE. Both '
      + 'start as "a zero of the denominator," but the presence or absence of a cancelling factor '
      + 'determines which of these two genuinely different behaviors occurs — never a blanket rule '
      + 'applied to every denominator zero at once.\n\n'
      + 'End behavior comes from COMPARING THE DEGREES of p and q, never merely from both being '
      + 'polynomials: if deg(p)<deg(q), f(x)→0; if deg(p)=deg(q), f(x)→the ratio of leading '
      + 'coefficients; if deg(p)=deg(q)+1, there is a slant asymptote. Two rational functions sharing '
      + 'the identical denominator can have entirely DIFFERENT end behaviors if their numerator degrees '
      + 'differ.',
    targetedMisconceptions: [`${RATIONALFUNC}:MC-1`, `${RATIONALFUNC}:MC-2`, `${RATIONALFUNC}:MC-3`],
    source: eb(RATIONALFUNC, 'Core Understanding — a rational function\'s domain exclusion is the same division-by-zero fact already known, a denominator zero is a hole only if it cancels and otherwise a vertical asymptote, and end behavior depends on comparing the numerator and denominator degrees'),
  },
  {
    conceptId: STEPFUNC, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'Floor ⌊x⌋ is the greatest integer ≤x; ceiling ⌈x⌉ is the least integer ≥x — "down" and "up" mean '
      + 'toward -∞ and +∞, never toward zero. For positive numbers, "drop the decimal" matches floor: '
      + '⌊3.7⌋=3. But for NEGATIVE numbers, dropping the decimal is WRONG: ⌊-2.3⌋=-3, never -2, because '
      + '-3 is the greatest integer still ≤-2.3 (since -2 is GREATER than -2.3, it fails the "less than '
      + 'or equal" requirement). This negative-number case is the single most important verification '
      + 'point for genuine floor understanding.\n\n'
      + 'The step function has a genuine JUMP discontinuity at every integer, never a smooth connection '
      + 'between steps — unlike every smooth curve seen in earlier function concepts, floor and ceiling '
      + 'are the first functions whose entire graph is built from a deliberate, permanent pattern of '
      + 'breaks.\n\n'
      + 'Each step has exactly one closed end and one open end determined by the DEFINITION, never an '
      + 'arbitrary or interchangeable choice: since ⌊2⌋=2 exactly, the integer 2 belongs to the step '
      + 'STARTING there — for ⌊x⌋, each segment includes its LEFT endpoint (closed) and excludes its '
      + 'RIGHT endpoint (open); for ⌈x⌉, the convention mirrors this, open on the left and closed on the '
      + 'right.',
    targetedMisconceptions: [`${STEPFUNC}:MC-1`, `${STEPFUNC}:MC-2`, `${STEPFUNC}:MC-3`],
    source: eb(STEPFUNC, 'Core Understanding — floor and ceiling round toward negative and positive infinity respectively with the drop-the-decimal shortcut failing for negative inputs, the step function has a genuine jump discontinuity at every integer, and each step\'s open and closed ends are determined by the definition itself'),
  },
]

export const MATHEMATICS_FUNCTIONS_END_BEHAVIOR_RATIONAL_STEP_PROBES: SeedProbe[] = [
  // --- math.func.end-behavior ------------------------------------------
  {
    conceptId: ENDBEHAVIOR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What is the end behavior of f(x)=x²-100x+2499? Is f(0) a good guide to what f does when x is a million?',
    choices: [
      { text: 'No — f(0)=2499 tells you nothing about the tails; end behavior requires reasoning about x→±∞ directly from the leading term x², so f(x)→+∞ in both directions, matching f(10⁶)≈10¹² regardless of what happens at small x', isCorrect: true },
      { text: 'Yes — f(0)=2499 being large and positive directly tells you the function is large and positive at the ends too', isCorrect: false, misconceptionId: `${ENDBEHAVIOR}:MC-1` },
      { text: 'Yes, since evaluating at any convenient input like 0 or 1 is exactly what "end behavior" means for any polynomial', isCorrect: false, misconceptionId: `${ENDBEHAVIOR}:MC-1` },
    ],
    targetedMisconceptions: [`${ENDBEHAVIOR}:MC-1`],
    source: eb(ENDBEHAVIOR, 'Discovery Question 1 — if f(x)=x^2-100x+2499, is f(0) a good guide to what f does when x is a million; why or why not'),
  },
  {
    conceptId: ENDBEHAVIOR, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'f(x)=x³-x. Describe both tails.',
    choices: [
      { text: 'The tails go in OPPOSITE directions: right tail up (x→+∞ gives f→+∞) and left tail down (x→-∞ gives f→-∞) — since the degree is ODD, (-x)³=-x³ flips the sign, genuinely different from even-degree behavior where both tails match', isCorrect: true },
      { text: 'Both tails go up, matching the positive leading coefficient in both directions', isCorrect: false, misconceptionId: `${ENDBEHAVIOR}:MC-2` },
      { text: 'Both tails go down, since a degree-3 polynomial always decreases at both extremes', isCorrect: false, misconceptionId: `${ENDBEHAVIOR}:MC-2` },
    ],
    targetedMisconceptions: [`${ENDBEHAVIOR}:MC-2`],
    source: eb(ENDBEHAVIOR, 'Detection probe for MC-2 — f(x)=x^3-x, describe both tails'),
  },
  {
    conceptId: ENDBEHAVIOR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'f(x)=3x⁵. What happens as x→-∞?',
    choices: [
      { text: 'f(x)→-∞ — substituting a large negative number, (-large)⁵ is negative (odd power of a negative), so 3×(negative)=negative; this must be computed as a SEPARATE step from x→+∞, never assumed to match just because the leading coefficient is positive', isCorrect: true },
      { text: 'f(x)→+∞, matching the same direction as x→+∞, since the leading coefficient 3 is positive in both cases', isCorrect: false, misconceptionId: `${ENDBEHAVIOR}:MC-3` },
      { text: 'f(x) approaches 0, since odd-degree polynomials always settle to a finite value as x becomes very negative', isCorrect: false, misconceptionId: `${ENDBEHAVIOR}:MC-3` },
    ],
    targetedMisconceptions: [`${ENDBEHAVIOR}:MC-3`],
    source: eb(ENDBEHAVIOR, 'Detection probe for MC-3 — f(x)=3x^5, what happens as x approaches negative infinity'),
  },

  // --- math.func.rational-function ------------------------------------------
  {
    conceptId: RATIONALFUNC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is finding a rational function\'s domain really a brand-new rule, or is it the same "no dividing by zero" fact you already know, just applied by factoring the denominator?',
    choices: [
      { text: 'It is the same familiar fact — for f(x)=(x+1)/(x²-4), the denominator (x-2)(x+2) has zeros at x=2,-2, so those points are excluded; no new rule was needed beyond "division by zero is undefined," applied by finding where q(x) vanishes', isCorrect: true },
      { text: 'It is a genuinely new, special procedure that only applies to rational functions and has no connection to ordinary division', isCorrect: false, misconceptionId: `${RATIONALFUNC}:MC-1` },
      { text: 'It is a new rule, since rational functions require checking both the numerator and denominator for zeros to determine the domain', isCorrect: false, misconceptionId: `${RATIONALFUNC}:MC-1` },
    ],
    targetedMisconceptions: [`${RATIONALFUNC}:MC-1`],
    source: eb(RATIONALFUNC, 'Discovery Question 1 — is finding a rational function\'s domain really a brand-new rule, or is it the same no dividing by zero fact you already know, just applied by factoring the denominator'),
  },
  {
    conceptId: RATIONALFUNC, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For f(x)=(x-2)(x+1)/((x-2)(x-3)), is x=2 a vertical asymptote?',
    choices: [
      { text: 'No — the factor (x-2) appears in BOTH numerator and denominator and cancels, simplifying to (x+1)/(x-3) near x=2, which approaches a finite value -3; this makes x=2 a HOLE, never an asymptote, since a cancelling factor is present', isCorrect: true },
      { text: 'Yes — every zero of the denominator automatically produces a vertical asymptote, regardless of what the numerator contains', isCorrect: false, misconceptionId: `${RATIONALFUNC}:MC-2` },
      { text: 'Yes, since x=2 makes the original expression undefined, and any point of undefinedness in a rational function must be a vertical asymptote', isCorrect: false, misconceptionId: `${RATIONALFUNC}:MC-2` },
    ],
    targetedMisconceptions: [`${RATIONALFUNC}:MC-2`],
    source: eb(RATIONALFUNC, 'Detection probe for MC-2 — for f(x)=(x-2)(x+1)/((x-2)(x-3)), is x=2 a vertical asymptote'),
  },
  {
    conceptId: RATIONALFUNC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'f(x)=1/(x²-4) and g(x)=(x³+1)/(x²-4) share the same denominator. Do they have the same end behavior?',
    choices: [
      { text: 'No — f has deg(p)=0<deg(q)=2, so f(x)→0, while g has deg(p)=3=deg(q)+1, giving a slant asymptote; the DEGREE COMPARISON, not merely both being polynomial-over-polynomial, determines end behavior, and these functions genuinely differ', isCorrect: true },
      { text: 'Yes — since both are rational functions (polynomial over polynomial) sharing the identical denominator, they must have identical end behavior', isCorrect: false, misconceptionId: `${RATIONALFUNC}:MC-3` },
      { text: 'Yes, since end behavior for a rational function depends only on the denominator, never on the numerator at all', isCorrect: false, misconceptionId: `${RATIONALFUNC}:MC-3` },
    ],
    targetedMisconceptions: [`${RATIONALFUNC}:MC-3`],
    source: eb(RATIONALFUNC, 'Detection probe for MC-3 — f(x)=1/(x^2-4) and g(x)=(x^3+1)/(x^2-4) share the same denominator, do they have the same end behavior'),
  },

  // --- math.func.step-function ------------------------------------------
  {
    conceptId: STEPFUNC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For positive numbers, floor feels like "just drop the decimal point." Try that shortcut on ⌊-2.3⌋. Does it still give the right answer?',
    choices: [
      { text: 'No — dropping the decimal on -2.3 gives -2, but the correct answer is -3, since -3 is the GREATEST integer still ≤-2.3 (-2 is greater than -2.3, failing the requirement); the "drop the decimal" shortcut works only for positive numbers, never negative ones', isCorrect: true },
      { text: 'Yes — dropping the decimal always gives the correct floor value regardless of whether the input is positive or negative', isCorrect: false, misconceptionId: `${STEPFUNC}:MC-1` },
      { text: 'Yes, and specifically ⌊-2.3⌋=-2 is the correct answer by the drop-the-decimal shortcut applied to any real number', isCorrect: false, misconceptionId: `${STEPFUNC}:MC-1` },
    ],
    targetedMisconceptions: [`${STEPFUNC}:MC-1`],
    source: eb(STEPFUNC, 'Discovery Question 1 — for positive numbers, floor feels like just drop the decimal point; try that shortcut on floor(-2.3); does it still give the right answer; why might negative numbers break it'),
  },
  {
    conceptId: STEPFUNC, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is ⌊x⌋ continuous at x=2?',
    choices: [
      { text: 'No — tracing the graph from just below 2 to just above 2 requires physically lifting off the flat segment and jumping to a new height; every integer is a genuine JUMP discontinuity for the floor function, never smoothly connected', isCorrect: true },
      { text: 'Yes — the floor function is basically continuous except for a few special points that don\'t really count as genuine discontinuities', isCorrect: false, misconceptionId: `${STEPFUNC}:MC-2` },
      { text: 'Yes, since every function encountered in this course connects smoothly at its boundaries when values are chosen sensibly', isCorrect: false, misconceptionId: `${STEPFUNC}:MC-2` },
    ],
    targetedMisconceptions: [`${STEPFUNC}:MC-2`],
    source: eb(STEPFUNC, 'Detection probe for MC-2 — is floor(x) continuous at x=2'),
  },
  {
    conceptId: STEPFUNC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'If ⌊2⌋=2 exactly, which step does the value 2 belong to — the step ending at 2, or the step starting at 2? What does that tell you about which end of each step should be the closed dot?',
    choices: [
      { text: 'The value 2 belongs to the step STARTING there (the segment at y=2 running from x=2 up to but not including x=3), so the closed dot for that segment sits at its LEFT end (x=2), with the right end (approaching x=3) open — derived directly from the definition, never an arbitrary choice', isCorrect: true },
      { text: 'The value 2 belongs to the step ending at 2, so the closed dot should be placed at the RIGHT end of the segment approaching x=2 from below', isCorrect: false, misconceptionId: `${STEPFUNC}:MC-3` },
      { text: 'It does not matter which end is closed, since both conventions produce an equally valid graph of the floor function', isCorrect: false, misconceptionId: `${STEPFUNC}:MC-3` },
    ],
    targetedMisconceptions: [`${STEPFUNC}:MC-3`],
    source: eb(STEPFUNC, 'Discovery Question 2 — if floor(2)=2 exactly, which step does the value 2 belong to, the step ending at 2, or the step starting at 2; what does that tell you about which end of each step should be the closed dot'),
  },
]
