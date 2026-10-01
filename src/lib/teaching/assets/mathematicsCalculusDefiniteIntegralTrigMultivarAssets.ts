/**
 * Ninth math.calc asset batch — the definite integral, trigonometric
 * derivatives, and an introduction to multivariable functions.
 *
 * Continues serving-asset coverage for math.calc (28/76 -> 31/76).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.calc.definite-integral.md,
 * math.calc.derivative-trig.md, and math.calc.multivariable-intro.md.
 *
 *   DEFINTEGRAL  definite-integral — the integral is SIGNED area, never
 *                total (unsigned) area — regions below the x-axis
 *                genuinely subtract; a geometrically-recognizable shape
 *                can be evaluated directly from its area formula, NEVER
 *                requiring an antiderivative first; reversing the limits
 *                of integration REVERSES the sign, never leaves the
 *                value unchanged, since integration order encodes a
 *                genuine direction.
 *   DERIVTRIG    derivative-trig — cosine's derivative FLIPS SIGN
 *                (-sin x), never preserving sine's sign-keeping pattern;
 *                whenever a trig function's argument is anything other
 *                than plain x, the chain-rule factor (the inner
 *                function's own derivative) is MANDATORY, never optional
 *                or omittable.
 *   MULTIVARINTRO multivariable-intro — a two-variable limit requires
 *                agreement along EVERY possible path, never just one or
 *                two convenient ones — agreeing paths NEVER prove
 *                existence, only a disagreeing pair proves non-existence;
 *                not every equation in x,y,z defines z as a function of
 *                (x,y) — the vertical-line-test analogue must be checked;
 *                a two-variable function's domain is a REGION in ℝ²,
 *                never a constraint on x alone.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const DEFINTEGRAL = 'math.calc.definite-integral'
const DERIVTRIG = 'math.calc.derivative-trig'
const MULTIVARINTRO = 'math.calc.multivariable-intro'

export const MATHEMATICS_CALCULUS_DEFINITE_INTEGRAL_TRIG_MULTIVAR_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: DEFINTEGRAL, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      '∫ₐᵇf(x)dx is a single number, the SIGNED area between f and the x-axis from a to b — regions '
      + 'where f>0 contribute positively, regions where f<0 contribute NEGATIVELY, and they genuinely '
      + 'CANCEL. The integral of an odd function over a symmetric interval is EXACTLY ZERO, never "the '
      + 'total area of two triangles" added together — ∫₋₁¹x dx=0, not 1.\n\n'
      + 'BECAUSE THE INTEGRAL IS DEFINED AS A LIMIT, NOT AS "WHATEVER THE ANTIDERIVATIVE GIVES," a '
      + 'definite integral over a recognizable geometric shape (a triangle, rectangle, semicircle) can '
      + 'be evaluated DIRECTLY from that shape\'s area formula, with NO antiderivative needed at all — '
      + '∫₀³√(9-x²)dx is a quarter-circle, evaluated as 9π/4 directly, never declared unsolvable for '
      + 'lacking a known antiderivative.\n\n'
      + 'REVERSING THE LIMITS OF INTEGRATION REVERSES THE SIGN: ∫ₐᵇf=-∫ᵦᵃf, never leaving the value '
      + 'unchanged. This follows directly from Δx=(b-a)/n flipping sign when a>b — integration order '
      + 'genuinely encodes a direction, unlike the order-independence of an ordinary sum\'s terms.',
    targetedMisconceptions: [`${DEFINTEGRAL}:MC-1`, `${DEFINTEGRAL}:MC-2`, `${DEFINTEGRAL}:MC-3`],
    source: eb(DEFINTEGRAL, 'Core Understanding — the integral is signed area never total area, a recognizable geometric shape needs no antiderivative, and reversing the limits of integration reverses the sign'),
  },
  {
    conceptId: DERIVTRIG, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'The six trigonometric derivatives are not six independent facts. The FOUNDATIONAL PAIR — sin '
      + 'and cos\'s derivatives — come from the derivative\'s limit definition combined with the '
      + 'squeeze-theorem result lim_{h→0}(sin h)/h=1: d/dx(sin x)=cos x, d/dx(cos x)=-sin x. COSINE\'S '
      + 'DERIVATIVE FLIPS SIGN, never preserving sine\'s sign-keeping pattern — sin and cos are NOT '
      + 'interchangeable under differentiation despite being cofunctions of each other; a graphical '
      + 'check confirms this: cos x is decreasing on (0,π/2), so its derivative there must be '
      + 'negative, which only -sin x (never the unsigned sin x) correctly predicts.\n\n'
      + 'The remaining four (tan, cot, sec, csc) are DERIVED, not independently memorized, by applying '
      + 'the quotient rule to tan x=sin x/cos x and its siblings, building directly on the sin/cos '
      + 'derivatives.\n\n'
      + 'WHENEVER THE TRIG FUNCTION\'S ARGUMENT IS ANYTHING OTHER THAN PLAIN x, THE CHAIN-RULE FACTOR '
      + 'IS MANDATORY: d/dx[sin(g(x))]=cos(g(x))·g\'(x), never cos(g(x)) alone. Checking whether the '
      + 'argument is "plain x, or a function of x" is a required first step before differentiating, '
      + 'never an optional afterthought.',
    targetedMisconceptions: [`${DERIVTRIG}:MC-1`, `${DERIVTRIG}:MC-2`],
    source: eb(DERIVTRIG, 'Core Understanding — cosine\'s derivative flips sign unlike sine\'s, and the chain-rule factor is mandatory whenever a trig function\'s argument is anything other than plain x'),
  },
  {
    conceptId: MULTIVARINTRO, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A two-variable function f(x,y) has a domain that is a REGION in ℝ² (a disk, a half-plane), '
      + 'never a bare interval in x alone — the domain of f(x,y)=√(4-x²-y²) is the disk x²+y²≤4, not '
      + '"x≥0." Its graph is a SURFACE in ℝ³, and slicing at height c gives a LEVEL CURVE f(x,y)=c.\n\n'
      + 'NOT EVERY EQUATION IN x,y,z DEFINES z AS A FUNCTION OF (x,y). The test is the vertical-line-'
      + 'test analogue: a vertical line through each domain point must meet the surface exactly once. '
      + 'A full sphere x²+y²+z²=1 FAILS this at every interior point (both z=+1 and z=-1 satisfy it at '
      + '(0,0)) — this must be checked explicitly, never assumed from an equation merely involving all '
      + 'three variables.\n\n'
      + 'A 2-VARIABLE LIMIT REQUIRES AGREEMENT ALONG EVERY POSSIBLE PATH — infinitely many lines, '
      + 'parabolas, spirals — never just the two coordinate axes or one or two convenient paths. This '
      + 'creates a genuine ASYMMETRY: exhibiting ONE pair of disagreeing paths is decisive PROOF a '
      + 'limit does NOT exist, but no finite number of AGREEING paths can ever prove a limit DOES '
      + 'exist — there is always another untried path; existence requires an analytic bound instead.',
    targetedMisconceptions: [`${MULTIVARINTRO}:MC-1`, `${MULTIVARINTRO}:MC-2`, `${MULTIVARINTRO}:MC-3`],
    source: eb(MULTIVARINTRO, 'Core Understanding — a two-variable domain is a 2D region never a 1D interval, not every implicit equation defines a function, and a 2D limit requires agreement along every path with a genuine proof/disproof asymmetry'),
  },
]

export const MATHEMATICS_CALCULUS_DEFINITE_INTEGRAL_TRIG_MULTIVAR_PROBES: SeedProbe[] = [
  // --- math.calc.definite-integral -----------------------------------------------------
  {
    conceptId: DEFINTEGRAL, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Evaluate ∫₋₁¹x dx, given that x is negative on [-1,0] and positive on [0,1], each triangle having area 1/2.',
    choices: [
      { text: '0 — the signed areas cancel exactly: -1/2 (below the axis) + 1/2 (above the axis) = 0', isCorrect: true },
      { text: '1 — adding both triangles\' (positive) areas together, since area is always a positive quantity', isCorrect: false, misconceptionId: `${DEFINTEGRAL}:MC-1` },
      { text: '1/2 — taking only the larger visible region\'s area', isCorrect: false, misconceptionId: `${DEFINTEGRAL}:MC-1` },
    ],
    targetedMisconceptions: [`${DEFINTEGRAL}:MC-1`],
    source: eb(DEFINTEGRAL, 'Detection probe (Blueprint B01) — the integral is signed area; a region below the x-axis contributes negatively and genuinely cancels against a region above it, never simply added as positive area'),
  },
  {
    conceptId: DEFINTEGRAL, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Can ∫₀³√(9-x²)dx be evaluated if no antiderivative of √(9-x²) is known?',
    choices: [
      { text: 'Yes — this is a quarter-circle of radius 3, evaluated directly from the area formula as 9π/4, with no antiderivative needed at all', isCorrect: true },
      { text: 'No — a definite integral cannot be evaluated without first finding an antiderivative of the integrand', isCorrect: false, misconceptionId: `${DEFINTEGRAL}:MC-2` },
      { text: 'No, since the Fundamental Theorem of Calculus is the only valid method for evaluating any definite integral', isCorrect: false, misconceptionId: `${DEFINTEGRAL}:MC-2` },
    ],
    targetedMisconceptions: [`${DEFINTEGRAL}:MC-2`],
    source: eb(DEFINTEGRAL, 'Detection probe (Blueprint B02) — a geometrically-recognizable shape can be evaluated directly from its area formula, never requiring an antiderivative; the integral\'s definition is a limit, not an antiderivative-based computation method'),
  },
  {
    conceptId: DEFINTEGRAL, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Given ∫₁³x dx=4, what is ∫₃¹x dx?',
    choices: [
      { text: '-4 — reversing the limits of integration reverses the sign, since Δx=(b-a)/n flips sign when a>b', isCorrect: true },
      { text: '4 — reversing the limits of integration does not change the value, the same way reordering the terms of an ordinary sum does not change its total', isCorrect: false, misconceptionId: `${DEFINTEGRAL}:MC-3` },
      { text: '0, since reversing the limits always produces a net-zero result', isCorrect: false, misconceptionId: `${DEFINTEGRAL}:MC-3` },
    ],
    targetedMisconceptions: [`${DEFINTEGRAL}:MC-3`],
    source: eb(DEFINTEGRAL, 'Detection probe (Blueprint B03) — reversing the limits of integration reverses the sign of the integral, since integration order encodes a genuine direction, unlike the order-independence of an ordinary sum'),
  },

  // --- math.calc.derivative-trig ---------------------------------------------------------
  {
    conceptId: DERIVTRIG, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What is d/dx(cos x)?',
    choices: [
      { text: '-sin x — cosine\'s derivative flips sign; on (0,π/2) where cos x is decreasing, only the negative -sin x correctly predicts a negative derivative', isCorrect: true },
      { text: 'sin x — the same sign-preserving pattern as sine\'s own derivative', isCorrect: false, misconceptionId: `${DERIVTRIG}:MC-1` },
      { text: 'cos x — differentiating a trig function simply reproduces the same function', isCorrect: false, misconceptionId: `${DERIVTRIG}:MC-1` },
    ],
    targetedMisconceptions: [`${DERIVTRIG}:MC-1`],
    source: eb(DERIVTRIG, 'Detection probe — cosine\'s derivative genuinely flips sign to -sin x, never preserving sine\'s sign-keeping derivative pattern; a monotonicity check on (0,π/2) confirms this'),
  },
  {
    conceptId: DERIVTRIG, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Differentiate h(x)=sin(3x²).',
    choices: [
      { text: '6x·cos(3x²) — the chain rule requires multiplying by the inner function\'s own derivative (6x), since the argument 3x² is not plain x', isCorrect: true },
      { text: 'cos(3x²) — applying the basic trig derivative rule to the argument directly', isCorrect: false, misconceptionId: `${DERIVTRIG}:MC-2` },
      { text: 'cos(6x) — differentiating only the inside expression and substituting it into the cosine', isCorrect: false, misconceptionId: `${DERIVTRIG}:MC-2` },
    ],
    targetedMisconceptions: [`${DERIVTRIG}:MC-2`],
    source: eb(DERIVTRIG, 'Detection probe — whenever a trig function\'s argument is anything other than plain x, the chain-rule factor (the inner function\'s own derivative) is mandatory, never optional'),
  },
  {
    conceptId: DERIVTRIG, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Derive d/dx(tan x) using the quotient rule on tan x=sin x/cos x, given d/dx(sin x)=cos x and d/dx(cos x)=-sin x.',
    choices: [
      { text: 'sec²x — applying the quotient rule gives [cos x·cos x − sin x·(−sin x)]/cos²x = (cos²x+sin²x)/cos²x = 1/cos²x = sec²x', isCorrect: true },
      { text: 'tan x itself, since the derivative of a ratio of two functions each with known derivatives just reproduces the original ratio', isCorrect: false, misconceptionId: `${DERIVTRIG}:MC-1` },
      { text: 'cos²x, from directly multiplying the two individual derivatives cos x and -sin x together and simplifying', isCorrect: false, misconceptionId: `${DERIVTRIG}:MC-1` },
    ],
    targetedMisconceptions: [`${DERIVTRIG}:MC-1`],
    source: eb(DERIVTRIG, 'Detection probe — tan, cot, sec, and csc\'s derivatives are derived from the sin/cos foundational pair via the quotient rule, never independently re-established or memorized as unrelated facts'),
  },

  // --- math.calc.multivariable-intro -----------------------------------------------------
  {
    conceptId: MULTIVARINTRO, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Testing lim_{(x,y)→(0,0)} xy/(x²+y²) along y=0 gives 0, and along x=0 also gives 0. Does the limit exist?',
    choices: [
      { text: 'Not yet determined — agreement along two paths never proves existence; testing along y=x gives a different value (1/2), proving this limit does NOT exist', isCorrect: true },
      { text: 'Yes — since both coordinate-axis paths give the same value, the limit exists and equals 0', isCorrect: false, misconceptionId: `${MULTIVARINTRO}:MC-1` },
      { text: 'Yes, since checking the two axes is sufficient in any number of dimensions, just as checking left and right suffices in 1D', isCorrect: false, misconceptionId: `${MULTIVARINTRO}:MC-1` },
    ],
    targetedMisconceptions: [`${MULTIVARINTRO}:MC-1`],
    source: eb(MULTIVARINTRO, 'Detection probe (Blueprint A02) — a 2D limit requires agreement along every possible path; agreeing paths never prove existence, only a disagreeing pair proves non-existence'),
  },
  {
    conceptId: MULTIVARINTRO, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does the equation x²+y²+z²=1 (a full sphere) define z as a function of (x,y)?',
    choices: [
      { text: 'No — at (x,y)=(0,0), both z=+1 and z=−1 satisfy the equation, so a vertical line through that point meets the surface twice, failing the vertical-line-test analogue', isCorrect: true },
      { text: 'Yes — any equation relating x, y, and z automatically defines z as a function of the other two variables', isCorrect: false, misconceptionId: `${MULTIVARINTRO}:MC-2` },
      { text: 'Yes, since the equation can always be solved for z in terms of x and y', isCorrect: false, misconceptionId: `${MULTIVARINTRO}:MC-2` },
    ],
    targetedMisconceptions: [`${MULTIVARINTRO}:MC-2`],
    source: eb(MULTIVARINTRO, 'Detection probe (Blueprint B-MC2) — not every equation in x,y,z defines z as a function of (x,y); the vertical-line-test analogue (a unique z for each (x,y)) must be checked explicitly, as a full sphere fails it'),
  },
  {
    conceptId: MULTIVARINTRO, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'What is the domain of f(x,y)=√(4-x²-y²)?',
    choices: [
      { text: '{(x,y): x²+y²≤4} — a disk of radius 2 in the plane, since both x and y jointly constrain where the expression under the square root is non-negative', isCorrect: true },
      { text: 'x≥0 — a constraint on x alone, matching how a one-variable function\'s domain would be written', isCorrect: false, misconceptionId: `${MULTIVARINTRO}:MC-3` },
      { text: '-2≤x≤2, an interval in x with no reference to y at all', isCorrect: false, misconceptionId: `${MULTIVARINTRO}:MC-3` },
    ],
    targetedMisconceptions: [`${MULTIVARINTRO}:MC-3`],
    source: eb(MULTIVARINTRO, 'Detection probe (Blueprint B-MC3) — a two-variable function\'s domain is a REGION in ℝ², described by a condition on the pair (x,y), never a constraint on x alone the way a one-variable domain would be written'),
  },
]
