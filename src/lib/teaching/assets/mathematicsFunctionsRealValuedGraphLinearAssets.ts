/**
 * Batch: real-valued functions (domain/range/natural domain), graphs of
 * functions (vertical line test), and linear functions (all math.func).
 *
 * math.func.real-valued-function becomes ready off already-authored
 * math.func.function-concept and math.found.real-numbers, and directly
 * unblocks math.calc.limits next — REOPENING math.calc, which was fully
 * blocked at the end of the prior batch on the unstarted math.seq domain.
 * math.func.graph-of-function becomes ready off already-authored
 * math.func.function-concept and math.geom.coordinate-plane, and directly
 * unblocks math.func.zero-of-function, math.func.even-odd-functions, and
 * math.func.transformations-functions next. math.func.linear-function
 * becomes ready off already-authored math.func.function-concept and
 * math.geom.slope, and directly unblocks math.func.quadratic-function next.
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.func.real-valued-function.md,
 * math.func.graph-of-function.md, and math.func.linear-function.md.
 *
 *   REALVALUED real-valued-function — domain (inputs) and range (outputs)
 *             are DIFFERENT sets, never interchangeable; the natural
 *             domain EXCLUDES wherever a formula's operations fail
 *             (division by zero, even roots of negatives, logs of
 *             non-positives), never assumed to be all of R by default;
 *             the single-output rule is a genuine structural requirement
 *             — a rule like ±√x giving two outputs for one input is NOT
 *             a function, never a mere stylistic choice to avoid.
 *   GRAPHOFFUNC graph-of-function — the graph IS the set of (x,f(x))
 *             pairs itself, never a separate object that merely
 *             resembles the function; the vertical line test is a DIRECT
 *             consequence of "one output per input," never an arbitrary
 *             geometric convention; a curve failing the test genuinely
 *             is NOT one function's graph, but it may SPLIT into several
 *             pieces that each individually pass, never dismissed as one
 *             flawed function.
 *   LINEARFUNC linear-function — f(x)=mx+b is FIRST a function to
 *             evaluate, never merely an equation to graph; the slope m
 *             is the constant rate of change EVERYWHERE in the domain,
 *             never varying between nearby versus far-apart input pairs;
 *             evaluating f(3) (input known, find output) and solving
 *             f(x)=3 (output known, find input) run in OPPOSITE
 *             directions, never interchangeable despite the similar
 *             notation.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const REALVALUED = 'math.func.real-valued-function'
const GRAPHOFFUNC = 'math.func.graph-of-function'
const LINEARFUNC = 'math.func.linear-function'

export const MATHEMATICS_FUNCTIONS_REAL_VALUED_GRAPH_LINEAR_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: REALVALUED, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A real-valued function f:D→R has domain D⊆R, so both inputs and outputs are real numbers. Domain '
      + 'and range are DIFFERENT sets, in different roles: the domain is the set of valid INPUTS; the '
      + 'range is the set of actual OUTPUTS. For f(x)=x² with domain R, any real number is a valid input '
      + '(domain=R), but the outputs are never negative (range=[0,∞)) — genuinely different sets, and '
      + 'confusing which is which reverses every subsequent statement about the function.\n\n'
      + 'The NATURAL DOMAIN excludes wherever a formula fails — never assumed to be all of R by default. '
      + 'Three operations can fail: a denominator equal to zero, an even root of a negative number, and '
      + 'a logarithm of a non-positive number. For f(x)=1/(x-2), the denominator is zero at x=2, so the '
      + 'natural domain is R\\{2}; for g(x)=√(x-3), the radicand must be non-negative, giving domain '
      + '[3,∞). The domain is all of R only when NO operation in the formula can ever fail.\n\n'
      + 'The SINGLE-OUTPUT RULE is a genuine structural requirement, never a stylistic convention: for '
      + 'every x in the domain there is EXACTLY ONE f(x). The correspondence ±√x (giving both +√x and '
      + '-√x for any x>0) is NOT a function, since it assigns two outputs to one input — testing at x=4 '
      + 'gives both +2 and -2, directly violating the rule regardless of how naturally both values arise '
      + 'from the same formula. The single-valued principal square root √x IS a function.',
    targetedMisconceptions: [`${REALVALUED}:MC-1`, `${REALVALUED}:MC-2`, `${REALVALUED}:MC-3`],
    source: eb(REALVALUED, 'Core Understanding — domain and range are genuinely different sets of inputs versus outputs, the natural domain excludes wherever the formula\'s own operations fail, and the single-output rule is a genuine structural requirement that rules out multi-valued correspondences like plus-or-minus square root'),
  },
  {
    conceptId: GRAPHOFFUNC, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'The graph of f is precisely the set {(x,f(x)) : x in domain(f)} — every input paired with its '
      + 'unique output, plotted as a point. It is NOT a curve drawn "to represent" the function that '
      + 'could in principle differ from it; the graph literally IS the function\'s own rule, geometrized, '
      + 'never a separate object that merely resembles the function\'s values.\n\n'
      + 'The vertical line test directly ENCODES "one output per input": since f assigns exactly one '
      + 'output to each input, the graph contains at most one point with any given x-coordinate, so a '
      + 'vertical line at x=a can intersect the graph at most once. Two intersections would mean x=a has '
      + 'two different outputs, directly violating the function definition — the test is not an '
      + 'independent geometric rule, it is the function definition, viewed vertically.\n\n'
      + 'Failing the test means genuinely NOT one function\'s graph — but it may split into SEVERAL: the '
      + 'full circle x²+y²=r² fails the vertical line test and therefore cannot be the graph of any '
      + 'single function — not "an unusual graph," but genuinely not a function\'s graph at all. It CAN, '
      + 'however, split into the upper semicircle y=√(r²-x²) and lower semicircle y=-√(r²-x²), each '
      + 'individually passing the test and each a genuine function\'s graph — never dismissed as one '
      + 'flawed function.',
    targetedMisconceptions: [`${GRAPHOFFUNC}:MC-1`, `${GRAPHOFFUNC}:MC-2`, `${GRAPHOFFUNC}:MC-3`],
    source: eb(GRAPHOFFUNC, 'Core Understanding — the graph is precisely the set of input-output pairs rather than a separate object, the vertical line test is a direct visual consequence of one output per input, and a curve failing the test genuinely is not a function but may split into several that are'),
  },
  {
    conceptId: LINEARFUNC, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A linear function f(x)=mx+b is FIRST a function, evaluated like any other: a rule taking any '
      + 'input x and producing exactly one output f(x) — a genuinely different framing from treating '
      + 'y=mx+b as merely "the equation of a geometric line" to graph. Both describe the identical '
      + 'object, but the function view emphasizes EVALUATION (plug in x, get an output), never just '
      + 'position and shape in the plane.\n\n'
      + 'The slope m is a constant rate of change EVERYWHERE, never varying across the domain: for ANY '
      + 'two inputs x₁,x₂, (f(x₂)-f(x₁))/(x₂-x₁)=m(x₂-x₁)/(x₂-x₁)=m — the SAME value regardless of which '
      + 'pair is chosen. For f(x)=2x+3, between x=1 and x=4 the rate is (11-5)/3=2; between x=10 and '
      + 'x=100 (very different inputs) the rate is (203-23)/90=2 — identical, not a coincidence of the '
      + 'chosen pairs, but a direct algebraic consequence of linearity itself.\n\n'
      + 'Function notation and geometric forms are the IDENTICAL object: converting from any geometric '
      + 'form (slope-intercept, point-slope, standard) to function notation is simply solving for y and '
      + 'renaming it f(x) — the identical algebra already mastered, never a new technique. Evaluating '
      + 'f(3) (input known, find the output) and solving f(x)=3 (output known, find the input) run in '
      + 'OPPOSITE directions through the identical rule, never interchangeable despite the similar '
      + 'notation.',
    targetedMisconceptions: [`${LINEARFUNC}:MC-1`, `${LINEARFUNC}:MC-2`, `${LINEARFUNC}:MC-3`],
    source: eb(LINEARFUNC, 'Core Understanding — a linear function is first a function to evaluate rather than merely a line to graph, the slope is a constant rate of change everywhere in the domain, and evaluating at a known input versus solving for an unknown input run in opposite directions'),
  },
]

export const MATHEMATICS_FUNCTIONS_REAL_VALUED_GRAPH_LINEAR_PROBES: SeedProbe[] = [
  // --- math.func.real-valued-function ------------------------------------------
  {
    conceptId: REALVALUED, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For f(x)=x²: is -3 in the domain? Is -9 in the range? What does this tell you about whether domain and range are always the same set?',
    choices: [
      { text: 'Yes, -3 is in the domain (any real number is a valid input), but -9 is NOT in the range (x² is never negative, so the range is [0,∞)); domain and range are genuinely different sets here, never interchangeable', isCorrect: true },
      { text: 'Yes to both — since domain and range are always the same set for any function, whatever is in one must be in the other', isCorrect: false, misconceptionId: `${REALVALUED}:MC-1` },
      { text: 'No to both — -3 is in the range (since it is a valid output somewhere) and -9 is in the domain (since it is a valid input somewhere)', isCorrect: false, misconceptionId: `${REALVALUED}:MC-1` },
    ],
    targetedMisconceptions: [`${REALVALUED}:MC-1`],
    source: eb(REALVALUED, 'Discovery Question 1 — for f(x)=x^2, is -3 in the domain, is -9 in the range, what does this tell you about whether domain and range are always the same set'),
  },
  {
    conceptId: REALVALUED, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is the rule "x maps to ±√x" a real-valued function? Test it directly on a specific input to find out.',
    choices: [
      { text: 'No — testing at x=4 gives BOTH +2 and -2, two outputs for one input, directly violating the single-output rule; this is a genuine structural violation, never a mere stylistic choice, regardless of how naturally both values arise from the same formula', isCorrect: true },
      { text: 'Yes — since both +√x and -√x come from the same formula x, "x maps to ±√x" is a perfectly legitimate function', isCorrect: false, misconceptionId: `${REALVALUED}:MC-3` },
      { text: 'Yes, as long as the domain is restricted to positive numbers only, since that eliminates any ambiguity in the outputs', isCorrect: false, misconceptionId: `${REALVALUED}:MC-3` },
    ],
    targetedMisconceptions: [`${REALVALUED}:MC-3`],
    source: eb(REALVALUED, 'Discovery Question 3 — is the rule x maps to plus-or-minus square root of x a real-valued function; test it directly on a specific input to find out'),
  },
  {
    conceptId: REALVALUED, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'What is the natural domain of f(x)=1/(x-2)?',
    choices: [
      { text: 'R\\{2} — the denominator x-2 is zero exactly when x=2, so x=2 must be excluded; the domain is NOT automatically all of R, since division is one of the operations that can genuinely fail on specific inputs', isCorrect: true },
      { text: 'R (all real numbers) — since f(x)=1/(x-2) is defined by a simple algebraic formula, its domain is automatically everything', isCorrect: false, misconceptionId: `${REALVALUED}:MC-2` },
      { text: 'Only positive real numbers, since division always requires a positive denominator to produce a valid output', isCorrect: false, misconceptionId: `${REALVALUED}:MC-2` },
    ],
    targetedMisconceptions: [`${REALVALUED}:MC-2`],
    source: eb(REALVALUED, 'Discovery Question 2 — what is the natural domain of f(x)=1/(x-2); what specific value must be excluded, and why'),
  },

  // --- math.func.graph-of-function ------------------------------------------
  {
    conceptId: GRAPHOFFUNC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is the graph of a function a separate geometric object, distinct from the set of input-output pairs the function itself defines?',
    choices: [
      { text: 'No — the graph IS precisely the set {(x,f(x))}, nothing added, nothing separate; for f(x)=x²-1, listing the pairs (-2,3),(-1,0),(0,-1),(1,0),(2,3) IS the graph, and connecting them into a smooth curve is only a drawing convenience', isCorrect: true },
      { text: 'Yes — the graph is a distinct geometric object that happens to visually match the function\'s values, but exists independently of the pairs themselves', isCorrect: false, misconceptionId: `${GRAPHOFFUNC}:MC-1` },
      { text: 'Yes, since a graph requires connecting the plotted points into a smooth curve, which is a genuinely new geometric construction beyond the pairs', isCorrect: false, misconceptionId: `${GRAPHOFFUNC}:MC-1` },
    ],
    targetedMisconceptions: [`${GRAPHOFFUNC}:MC-1`],
    source: eb(GRAPHOFFUNC, 'Discovery Question 1 — is the graph of a function a separate geometric object, distinct from the set of input-output pairs the function itself defines; what would it mean if it weren\'t'),
  },
  {
    conceptId: GRAPHOFFUNC, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does a curve like a full circle, which fails the vertical line test, represent one flawed function — or could it be genuinely two separate, valid functions instead?',
    choices: [
      { text: 'It genuinely is NOT one function\'s graph at all — but it splits into two separate, individually valid functions: the upper semicircle y=√(r²-x²) and the lower semicircle y=-√(r²-x²), each passing the test on its own; splitting, not discarding, is the fix', isCorrect: true },
      { text: 'It represents one single function with a minor technical flaw that does not affect its validity as a function\'s graph', isCorrect: false, misconceptionId: `${GRAPHOFFUNC}:MC-3` },
      { text: 'It cannot be a function\'s graph in any form, and no valid split into function pieces is possible for a circle', isCorrect: false, misconceptionId: `${GRAPHOFFUNC}:MC-3` },
    ],
    targetedMisconceptions: [`${GRAPHOFFUNC}:MC-3`],
    source: eb(GRAPHOFFUNC, 'Discovery Question 3 — does a curve like a full circle, which fails the vertical line test, represent one flawed function, or could it be genuinely two separate, valid functions instead'),
  },
  {
    conceptId: GRAPHOFFUNC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Why does a vertical line crossing a curve twice mean the curve cannot be a function\'s graph? What would that double crossing actually say about the input?',
    choices: [
      { text: 'Two intersections at the same x-coordinate mean that single input x=a has TWO different outputs — directly violating "exactly one output per input"; the test is not an independent geometric rule, it is the function definition read vertically', isCorrect: true },
      { text: 'The double crossing is simply an arbitrary geometric pattern with no connection to whether the underlying rule is a function', isCorrect: false, misconceptionId: `${GRAPHOFFUNC}:MC-2` },
      { text: 'A double crossing only matters for circles specifically, and has no general meaning for other types of curves', isCorrect: false, misconceptionId: `${GRAPHOFFUNC}:MC-2` },
    ],
    targetedMisconceptions: [`${GRAPHOFFUNC}:MC-2`],
    source: eb(GRAPHOFFUNC, 'Discovery Question 2 — why does a vertical line crossing a curve twice mean the curve cannot be a function\'s graph; what would that double crossing actually say about the input'),
  },

  // --- math.func.linear-function ------------------------------------------
  {
    conceptId: LINEARFUNC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Are "the equation of a line" and "a linear function" two genuinely different mathematical topics requiring separate techniques?',
    choices: [
      { text: 'No — they are the same object viewed two ways; solving a line\'s point-slope form y-5=3(x-1) for y gives y=3x+2, which in function notation is simply f(x)=3x+2 — the identical algebra, renamed, never a separate technique', isCorrect: true },
      { text: 'Yes — line equations belong to geometry and linear functions belong to a completely different branch of mathematics with unrelated methods', isCorrect: false, misconceptionId: `${LINEARFUNC}:MC-1` },
      { text: 'Yes, since evaluating a function requires calculus-level techniques that graphing a line equation does not require', isCorrect: false, misconceptionId: `${LINEARFUNC}:MC-1` },
    ],
    targetedMisconceptions: [`${LINEARFUNC}:MC-1`],
    source: eb(LINEARFUNC, 'Discovery Question 1 — are the equation of a line and a linear function two genuinely different mathematical topics requiring separate techniques'),
  },
  {
    conceptId: LINEARFUNC, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Could the rate of change of f(x)=2x+3 be different between x=1,x=4 than between x=10,x=100?',
    choices: [
      { text: 'No — between x=1 and x=4 the rate is (11-5)/3=2, and between x=10 and x=100 the rate is (203-23)/90=2, the IDENTICAL value; this follows algebraically for ANY x₁,x₂, since (f(x₂)-f(x₁))/(x₂-x₁)=m always, matching the slope exactly', isCorrect: true },
      { text: 'Yes — the rate of change could genuinely differ between a nearby pair and a far-apart pair, the way it does for non-linear functions like a parabola', isCorrect: false, misconceptionId: `${LINEARFUNC}:MC-2` },
      { text: 'Yes, since the rate of change only stays constant for very small changes in x near a single fixed point', isCorrect: false, misconceptionId: `${LINEARFUNC}:MC-2` },
    ],
    targetedMisconceptions: [`${LINEARFUNC}:MC-2`],
    source: eb(LINEARFUNC, 'Discovery Question 2 — could the rate of change of a linear function be different between two nearby inputs than between two far-apart inputs; test it directly with two very different pairs'),
  },
  {
    conceptId: LINEARFUNC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'To find f(3) for f(x)=2x+1, do you set 2x+1=3 and solve for x?',
    choices: [
      { text: 'No — evaluating f(3) means the INPUT is 3, so substitute directly: f(3)=2(3)+1=7; setting 2x+1=3 and solving for x instead answers the DIFFERENT question "solve f(x)=3," which runs in the opposite direction through the rule', isCorrect: true },
      { text: 'Yes — finding f(3) always means setting the function\'s formula equal to 3 and solving for x, since "3" and "f(3)" refer to the same quantity', isCorrect: false, misconceptionId: `${LINEARFUNC}:MC-3` },
      { text: 'Yes, since evaluation and solving are simply two different names for the identical algebraic procedure applied to any function', isCorrect: false, misconceptionId: `${LINEARFUNC}:MC-3` },
    ],
    targetedMisconceptions: [`${LINEARFUNC}:MC-3`],
    source: eb(LINEARFUNC, 'Discovery Question implied by MC-3 — to find f(3) for f(x)=2x+1, do you set 2x+1=3 and solve for x, or substitute 3 directly into the formula'),
  },
]
