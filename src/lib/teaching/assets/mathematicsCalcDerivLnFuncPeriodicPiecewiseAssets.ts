/**
 * Batch: derivative of the natural logarithm (math.calc), periodic
 * functions and piecewise functions (math.func).
 *
 * Continues serving-asset coverage for math.calc (62/76 -> 63/76) and
 * math.func (11/29 -> 13/29). math.calc.derivative-ln became ready the
 * instant math.func.logarithmic-function (prior batch) was served.
 * math.func.periodic-function and math.func.piecewise-function are both
 * foundational math.func concepts, ready off function-concept alone.
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.calc.derivative-ln.md,
 * math.func.periodic-function.md, and math.func.piecewise-function.md.
 *
 *   DERIVLN   derivative-ln — ONLY ln x is the natural-base logarithm
 *             needing no extra factor; every other base a needs the
 *             extra 1/ln(a) factor, never omitted. Only 2 misconceptions
 *             in the EB entry: MC-1 (missing 1/ln(a) factor,
 *             "Foundational") gets FOUNDATIONAL and DEVELOPING, MC-2
 *             (missing chain-rule factor when the argument is a
 *             function, also "Foundational") gets PROFICIENT.
 *   PERIODIC  periodic-function — periodicity is an EXACT algebraic
 *             condition f(x+T)=f(x) for EVERY x, never confirmed by
 *             visual similarity; period and frequency are RECIPROCALS,
 *             never the same measurement; a period is a DISTANCE between
 *             two identical-phase points, never the location of a single
 *             peak.
 *   PIECEWISE piecewise-function — exactly ONE piece's inequality symbol
 *             owns a boundary point, never decided by which formula
 *             "looks closer"; continuity requires the left limit, right
 *             limit, AND function value to ALL agree, never assumed from
 *             the notation alone; exactly one side of a boundary gets the
 *             closed condition, never both.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const DERIVLN = 'math.calc.derivative-ln'
const PERIODIC = 'math.func.periodic-function'
const PIECEWISE = 'math.func.piecewise-function'

export const MATHEMATICS_CALC_DERIV_LN_FUNC_PERIODIC_PIECEWISE_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: DERIVLN, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'The natural logarithm\'s derivative, d/dx[ln x]=1/x (for x>0), extends to a general base as '
      + 'd/dx[log_a x]=1/(x·ln a) — the SAME base-e-exception structure already established for '
      + 'the exponential derivative, where the natural log is the special case where a=e makes '
      + 'ln(a)=1, recovering the simpler 1/x.\n\n'
      + 'When the logarithm\'s ARGUMENT is a function of x rather than bare x, the Chain Rule '
      + 'applies: d/dx[ln(g(x))]=(1/g(x))·g\'(x)=g\'(x)/g(x) — the reciprocal of the inside '
      + 'function, multiplied by the inside function\'s own derivative, never omitted.\n\n'
      + 'LOGARITHMIC DIFFERENTIATION is a distinct technique built on this rule: for an expression '
      + 'too complicated to differentiate directly (a product, quotient, or an expression raised '
      + 'to a VARIABLE power, like x^x), taking ln of BOTH sides first converts products into '
      + 'sums, quotients into differences, and powers into products, making the resulting '
      + 'expression tractable via implicit differentiation.',
    targetedMisconceptions: [`${DERIVLN}:MC-1`, `${DERIVLN}:MC-2`],
    source: eb(DERIVLN, 'Core Understanding — only ln x needs no extra factor, every other base needs 1/ln(a), and a function argument requires the chain-rule factor on top'),
  },
  {
    conceptId: PERIODIC, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'PERIODICITY IS AN EXACT, UNIVERSAL ALGEBRAIC CONDITION: f is periodic with period T>0 iff '
      + 'f(x+T)=f(x) for EVERY x in the domain — not most x, not visually similar x, but every '
      + 'single one, verified algebraically. The FUNDAMENTAL period is the SMALLEST such positive '
      + 'T.\n\n'
      + 'PERIOD AND FREQUENCY ARE RECIPROCALS, WITH DIFFERENT UNITS AND MEANINGS: period T is the '
      + 'distance for ONE complete cycle. Frequency f=1/T is how many complete cycles occur per '
      + 'unit of x. A LONGER period means a LOWER frequency, and vice versa.\n\n'
      + 'PERIOD IS A DISTANCE BETWEEN IDENTICAL-PHASE POINTS, NOT A SINGLE LANDMARK: the period is '
      + 'measured as the horizontal distance from any point on the graph to the NEXT point with '
      + 'the same height AND the same slope direction — commonly measured peak-to-peak, but that '
      + 'is a convenient CHOICE of identical-phase points, not the definition itself.\n\n'
      + 'DAMPING AND IRRATIONAL PERIOD RATIOS DESTROY EXACT PERIODICITY: a function that merely '
      + 'LOOKS like it repeats (such as a damped sinusoid) is NOT periodic, because the exact '
      + 'algebraic condition fails once decay is accounted for.',
    targetedMisconceptions: [`${PERIODIC}:MC-1`, `${PERIODIC}:MC-2`, `${PERIODIC}:MC-3`],
    source: eb(PERIODIC, 'Core Understanding — periodicity is an exact algebraic condition, period and frequency are reciprocals, and a period is a distance never a single landmark'),
  },
  {
    conceptId: PIECEWISE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'BOUNDARY EVALUATION IS DECIDED BY WHICH PIECE\'S INEQUALITY "OWNS" THE POINT: at a boundary '
      + 'value, exactly ONE piece\'s domain condition includes it (via ≤, ≥, or = — a CLOSED '
      + 'condition); the other piece\'s condition EXCLUDES it (via < or > — an OPEN condition). '
      + 'Evaluating at the boundary means substituting into the piece that OWNS it, never the '
      + 'piece that merely approaches it.\n\n'
      + 'CONTINUITY IS A THREE-WAY AGREEMENT, TESTED EXPLICITLY: a piecewise function is '
      + 'continuous at x=a if and only if the left-hand limit, the right-hand limit, AND the '
      + 'function value f(a) all agree. Nothing about the piecewise NOTATION forces a jump — '
      + 'continuity depends entirely on whether the pieces\' values genuinely agree, checked '
      + 'explicitly, never assumed from the notation\'s appearance.\n\n'
      + 'THE DOMAIN PIECES MUST PARTITION THE INPUT SPACE EXACTLY ONCE: every input must belong to '
      + 'EXACTLY one piece\'s domain. Assigning a closed condition to BOTH neighboring pieces at a '
      + 'shared boundary creates a genuine ambiguity — two pieces both claiming the same input — '
      + 'which breaks the function definition itself. Absolute value, |x|, is the canonical '
      + 'piecewise function and is CONTINUOUS at x=0, directly disproving any assumption that '
      + 'piecewise functions must have jumps.',
    targetedMisconceptions: [`${PIECEWISE}:MC-1`, `${PIECEWISE}:MC-2`, `${PIECEWISE}:MC-3`],
    source: eb(PIECEWISE, 'Core Understanding — the closed inequality symbol decides boundary ownership, continuity requires a three-way agreement checked explicitly, and exactly one side of a boundary gets the closed condition'),
  },
]

export const MATHEMATICS_CALC_DERIV_LN_FUNC_PERIODIC_PIECEWISE_PROBES: SeedProbe[] = [
  // --- math.calc.derivative-ln ------------------------------------------
  {
    conceptId: DERIVLN, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'A student computes d/dx[log_5 x] as simply 1/x, with no extra factor. Is this correct?',
    choices: [
      { text: 'No — the correct derivative is 1/(x·ln5); only ln x (base e) needs no extra factor, and every other base genuinely requires dividing by ln(a)', isCorrect: true },
      { text: 'Yes — every logarithm base differentiates to 1/x, regardless of the base', isCorrect: false, misconceptionId: `${DERIVLN}:MC-1` },
      { text: 'Yes, since the extra ln(a) factor is only needed for bases larger than e, not smaller ones like 5 is relative to e', isCorrect: false, misconceptionId: `${DERIVLN}:MC-1` },
    ],
    targetedMisconceptions: [`${DERIVLN}:MC-1`],
    source: eb(DERIVLN, 'Detection probe (Blueprint B01 P41) — present the log_5 x case and check whether ln5 is included'),
  },
  {
    conceptId: DERIVLN, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Why does ln x need no extra factor in its derivative, while log_5 x needs an extra 1/ln(5)?',
    choices: [
      { text: 'Because ln(e)=1, so substituting a=e into the general rule 1/(x·ln a) gives 1/(x·1)=1/x — the factor becomes 1 and vanishes from view, uniquely among all bases', isCorrect: true },
      { text: 'ln x is simply a special exception with no deeper explanation connecting it to the general rule for other bases', isCorrect: false, misconceptionId: `${DERIVLN}:MC-1` },
      { text: 'The general rule 1/(x·ln a) does not actually apply to ln x at all, since ln x follows a completely separate rule', isCorrect: false, misconceptionId: `${DERIVLN}:MC-1` },
    ],
    targetedMisconceptions: [`${DERIVLN}:MC-1`],
    source: eb(DERIVLN, 'Repair Action B01 — re-derive log_a x=ln x/ln a via the change-of-base formula and differentiate that quotient directly'),
  },
  {
    conceptId: DERIVLN, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Will differentiating ln(x²+1) give just 1/(x²+1), or does something extra need to be multiplied in?',
    choices: [
      { text: 'Something extra: d/dx[ln(x²+1)]=2x/(x²+1) — the argument x²+1 is a function of x, so the Chain Rule\'s inner-derivative factor (2x) must be multiplied in, never dropped', isCorrect: true },
      { text: 'Just 1/(x²+1) — the reciprocal factor alone is the complete derivative regardless of what the argument contains', isCorrect: false, misconceptionId: `${DERIVLN}:MC-2` },
      { text: 'Just 1/(x²+1), since the Chain Rule only applies to logarithms with a non-quadratic argument', isCorrect: false, misconceptionId: `${DERIVLN}:MC-2` },
    ],
    targetedMisconceptions: [`${DERIVLN}:MC-2`],
    source: eb(DERIVLN, 'Detection probe (Blueprint B02 P41) — present a composite logarithm and check whether the inner-derivative factor is included'),
  },

  // --- math.func.periodic-function ------------------------------------------
  {
    conceptId: PERIODIC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is f(x)=e^(-x)sin(x) periodic, given that its oscillatory shape appears to repeat?',
    choices: [
      { text: 'No — checking f(1)≈0.309 against f(1+2π)≈0.00061 shows they are NOT equal; the amplitude decay breaks the exact algebraic condition f(x+T)=f(x), despite the visually repeating shape', isCorrect: true },
      { text: 'Yes — the function is periodic because its oscillatory shape visually repeats over successive cycles', isCorrect: false, misconceptionId: `${PERIODIC}:MC-3` },
      { text: 'Yes, since any function built from sin(x) is automatically periodic regardless of what multiplies it', isCorrect: false, misconceptionId: `${PERIODIC}:MC-3` },
    ],
    targetedMisconceptions: [`${PERIODIC}:MC-3`],
    source: eb(PERIODIC, 'Discovery Question 3 — does e^(-x)sin(x) genuinely repeat forever, or does it just look like it does for a little while; test a specific value far from the start'),
  },
  {
    conceptId: PERIODIC, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A signal has period T=0.01 seconds. What is its frequency, and are period and frequency measuring the same thing?',
    choices: [
      { text: 'Frequency=1/T=100 Hz; period and frequency are reciprocals measuring opposite things — period is time-per-cycle, frequency is cycles-per-time, and a shorter period means a HIGHER frequency', isCorrect: true },
      { text: 'The frequency is also 0.01, since period and frequency are simply two names for the identical measurement', isCorrect: false, misconceptionId: `${PERIODIC}:MC-1` },
      { text: 'The frequency is 0.01 Hz, matching the period\'s numerical value directly', isCorrect: false, misconceptionId: `${PERIODIC}:MC-1` },
    ],
    targetedMisconceptions: [`${PERIODIC}:MC-1`],
    source: eb(PERIODIC, 'Discovery Question 2 — a signal has period T=0.01 seconds; what is its frequency; are period and frequency measuring the same thing or opposite things'),
  },
  {
    conceptId: PERIODIC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For sin(x), the first peak occurs at x=π/2. Is π/2 the period?',
    choices: [
      { text: 'No — the period is a DISTANCE between two identical-phase points; the second peak is at x=5π/2, and the distance 5π/2-π/2=2π is the period, not the coordinate π/2 itself', isCorrect: true },
      { text: 'Yes — π/2, the x-coordinate of the first peak, is the period of sin(x)', isCorrect: false, misconceptionId: `${PERIODIC}:MC-2` },
      { text: 'Yes, since the period is always defined as the location of the first maximum on the graph', isCorrect: false, misconceptionId: `${PERIODIC}:MC-2` },
    ],
    targetedMisconceptions: [`${PERIODIC}:MC-2`],
    source: eb(PERIODIC, 'Discovery Question 1 — is π/2, the location of sin(x)\'s first peak, the period of sin(x), or is the period something else entirely'),
  },

  // --- math.func.piecewise-function ------------------------------------------
  {
    conceptId: PIECEWISE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For f(x)={2x+1 if x<3; x² if x≥3}, what is f(3)? Which inequality symbol actually contains x=3?',
    choices: [
      { text: 'f(3)=9 — the condition x≥3 (closed) contains x=3, so the SECOND piece owns the boundary and must be used, never the first piece which merely approaches it', isCorrect: true },
      { text: 'f(3)=7, using the first piece (2(3)+1=7) since it was listed first', isCorrect: false, misconceptionId: `${PIECEWISE}:MC-1` },
      { text: 'f(3) is undefined, since the boundary point cannot belong to either piece', isCorrect: false, misconceptionId: `${PIECEWISE}:MC-1` },
    ],
    targetedMisconceptions: [`${PIECEWISE}:MC-1`],
    source: eb(PIECEWISE, 'Discovery Question 1 — for a boundary at x=3, what is f(3); which inequality symbol actually contains x=3'),
  },
  {
    conceptId: PIECEWISE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is a piecewise function always discontinuous at its boundary points? Test it on |x|={x if x≥0; -x if x<0} at x=0.',
    choices: [
      { text: 'No — at x=0, the left limit is 0, the right limit is 0, and f(0)=0 (all three agree), so |x| is CONTINUOUS at x=0 despite being genuinely piecewise; continuity must be tested explicitly, never assumed from the notation', isCorrect: true },
      { text: 'Yes — every piecewise function must have a jump at each of its boundary points', isCorrect: false, misconceptionId: `${PIECEWISE}:MC-2` },
      { text: 'Yes, since |x| is not actually a genuine piecewise function despite being written with two cases', isCorrect: false, misconceptionId: `${PIECEWISE}:MC-2` },
    ],
    targetedMisconceptions: [`${PIECEWISE}:MC-2`],
    source: eb(PIECEWISE, 'Discovery Question 2 — is a piecewise function always discontinuous at its boundary points; test it directly on the absolute value function at x=0'),
  },
  {
    conceptId: PIECEWISE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'You wrote x≤3 for piece 1 and x≥3 for piece 2 of a piecewise formula. Both conditions claim x=3 — is this a valid piecewise function?',
    choices: [
      { text: 'No — x=3 would belong to BOTH pieces at once, potentially producing two different values at the same input, which breaks the function rule; exactly one side must use a strict inequality instead', isCorrect: true },
      { text: 'Yes — using closed conditions on both sides at a shared boundary is simply thorough coverage of the domain', isCorrect: false, misconceptionId: `${PIECEWISE}:MC-3` },
      { text: 'Yes, since any ambiguity at a single boundary point has no effect on whether the overall definition is a valid function', isCorrect: false, misconceptionId: `${PIECEWISE}:MC-3` },
    ],
    targetedMisconceptions: [`${PIECEWISE}:MC-3`],
    source: eb(PIECEWISE, 'Discovery Question 3 — if you write x≤3 for one piece and x≥3 for the next, is that a valid piecewise function; what happens exactly at x=3'),
  },
]
