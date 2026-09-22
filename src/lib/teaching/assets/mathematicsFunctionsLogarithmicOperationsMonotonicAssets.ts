/**
 * math.func batch — logarithmic function, operations on functions,
 * monotonic function.
 *
 * Continues serving-asset coverage for math.func (8/29 -> 11/29).
 * math.func.logarithmic-function became ready the instant math.func.
 * inverse-functions (prior batch) was served, and directly unblocks
 * math.calc.derivative-ln next. math.func.function-operations and
 * math.func.monotonic-function are both foundational math.func concepts,
 * ready off math.func.function-concept alone.
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.func.logarithmic-function.md,
 * math.func.function-operations.md, and math.func.monotonic-function.md.
 *
 *   LOGFUNC   logarithmic-function — the domain restriction (0,∞) is a
 *             direct CONSEQUENCE of the exponential's range, never an
 *             arbitrary rule; the log graph's features are derived by
 *             REFLECTING the exponential graph across y=x, never
 *             separately memorized; ln x is singled out because it is
 *             the inverse of the self-derivative e^x, never an arbitrary
 *             naming choice.
 *   FUNCOPS   function-operations — a combined function's domain is the
 *             INTERSECTION of both original domains, never just one; the
 *             pointwise product (fg)(x) is genuinely different from
 *             composition f(g(x)), never conflated; composition is NOT
 *             commutative, unlike pointwise addition/multiplication which
 *             genuinely are.
 *   MONOTONIC monotonic-function — strict and weak monotonicity are
 *             genuinely different conditions, never interchangeable; a
 *             trend at sampled points is a clue, NEVER proof, of whole-
 *             interval monotonicity; strict monotonicity implies
 *             injectivity, but injectivity never implies monotonicity in
 *             return.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const LOGFUNC = 'math.func.logarithmic-function'
const FUNCOPS = 'math.func.function-operations'
const MONOTONIC = 'math.func.monotonic-function'

export const MATHEMATICS_FUNCTIONS_LOGARITHMIC_OPERATIONS_MONOTONIC_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: LOGFUNC, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'THE DOMAIN RESTRICTION IS A CONSEQUENCE, NOT AN ARBITRARY RULE: log_a(x) is the inverse of '
      + 'f(x)=a^x. By the inverse domain/range-swap principle, the inverse\'s DOMAIN equals the '
      + 'original\'s RANGE — since a^x\'s range is (0,∞), log_a(x)\'s domain must be exactly (0,∞). '
      + 'This directly explains why log_a of a nonpositive number is undefined: there is simply no '
      + 'exponent x for which a^x ever produces such a value.\n\n'
      + 'GRAPHING BY REFLECTION, NOT MEMORIZATION: since log_a(x) is the inverse of a^x, its graph '
      + 'is obtained by reflecting a^x\'s graph across y=x. The exponential\'s y-intercept (0,1) '
      + 'reflects to log_a(x)\'s x-intercept (1,0); the exponential\'s horizontal asymptote y=0 '
      + 'reflects to log_a(x)\'s VERTICAL asymptote x=0. Every key feature of the log graph is a '
      + 'direct, derivable consequence of the already-known exponential graph.\n\n'
      + 'THE NATURAL LOGARITHM INHERITS e^x\'s SPECIAL STATUS: ln x is specifically log_e(x) — the '
      + 'inverse of the natural exponential e^x. Since e^x is its own derivative, the derivative of '
      + 'its inverse ln x turns out to be exactly 1/x — a remarkably clean result, not an arbitrary '
      + 'naming convenience.',
    targetedMisconceptions: [`${LOGFUNC}:MC-1`, `${LOGFUNC}:MC-2`, `${LOGFUNC}:MC-3`],
    source: eb(LOGFUNC, 'Core Understanding — the log domain is a consequence of the exponential\'s range, the graph is derived by reflection, and ln x is special because e^x is special'),
  },
  {
    conceptId: FUNCOPS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'POINTWISE OPERATIONS COMBINE OUTPUT VALUES, AND THE DOMAIN IS THE INTERSECTION: '
      + '(f+g)(x)=f(x)+g(x), (f-g)(x)=f(x)-g(x), and (fg)(x)=f(x)g(x) each combine the two '
      + 'functions\' OUTPUTS at each shared input — this only makes sense where BOTH f(x) and g(x) '
      + 'are defined, so the combined function\'s domain is the INTERSECTION of f\'s domain and '
      + 'g\'s domain. For (f/g)(x)=f(x)/g(x), an ADDITIONAL restriction applies: any x where '
      + 'g(x)=0 must be excluded too.\n\n'
      + 'THE COMBINED DOMAIN CAN EXCLUDE POINTS EITHER FUNCTION ALONE WOULD PERMIT: a point '
      + 'excluded from EITHER original function cannot appear in the combination, even if the '
      + 'other function would happily accept it.\n\n'
      + '(fg)(x) IS THE POINTWISE PRODUCT, GENUINELY DIFFERENT FROM COMPOSITION, WHICH IS NOT '
      + 'COMMUTATIVE: (fg)(x)=f(x)·g(x) multiplies two OUTPUT values at the same shared input. '
      + 'Composition (f∘g)(x)=f(g(x)) instead feeds g\'s output into f as an entirely NEW input — '
      + 'a structurally different operation. Pointwise addition and multiplication are commutative '
      + '(inherited from ordinary arithmetic), but composition is genuinely NOT commutative.',
    targetedMisconceptions: [`${FUNCOPS}:MC-1`, `${FUNCOPS}:MC-2`, `${FUNCOPS}:MC-3`],
    source: eb(FUNCOPS, 'Core Understanding — a combined function\'s domain is the intersection of both, the pointwise product differs from composition, and composition is not commutative'),
  },
  {
    conceptId: MONOTONIC, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'MONOTONIC MEANS THE SAME TREND EVERYWHERE, AND STRICT VERSUS WEAK ARE GENUINELY DIFFERENT: '
      + 'a function is monotonic increasing if f(a)<f(b) (strict) or f(a)≤f(b) (weak) whenever '
      + 'a<b, for EVERY pair a,b in the domain — a single exception anywhere disqualifies the '
      + 'whole function. A constant function is weakly BOTH increasing and decreasing '
      + 'simultaneously, yet strictly NEITHER.\n\n'
      + 'MONOTONICITY REQUIRES CHECKING THE FULL INTERVAL, NEVER JUST A SAMPLE: because '
      + 'monotonicity is a universal claim about EVERY pair of points, observing an increasing '
      + 'trend at a handful of sample points can never establish it — the function could reverse '
      + 'direction between or beyond the sampled points, invisibly to a partial check.\n\n'
      + 'STRICT MONOTONICITY IMPLIES INJECTIVITY, BUT THE CONVERSE FAILS: if f is strictly '
      + 'monotonic and a≠b, then f(a)≠f(b) — proving injectivity. But a function can be injective '
      + '(never repeating a value) while still REVERSING direction somewhere in its domain, as '
      + 'long as that reversal never causes two values to actually coincide.',
    targetedMisconceptions: [`${MONOTONIC}:MC-1`, `${MONOTONIC}:MC-2`, `${MONOTONIC}:MC-3`],
    source: eb(MONOTONIC, 'Core Understanding — strict and weak monotonicity are genuinely different, sampling never proves whole-interval monotonicity, and strict monotonicity implies injectivity but not conversely'),
  },
]

export const MATHEMATICS_FUNCTIONS_LOGARITHMIC_OPERATIONS_MONOTONIC_PROBES: SeedProbe[] = [
  // --- math.func.logarithmic-function ------------------------------------------
  {
    conceptId: LOGFUNC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is the restriction that log_a(x) is only defined for x>0 an arbitrary convention to memorize?',
    choices: [
      { text: 'No — since a^x has range (0,∞) (never zero or negative), its inverse log_a(x) must have DOMAIN (0,∞), directly by the inverse-function domain/range-swap rule', isCorrect: true },
      { text: 'Yes — the domain restriction x>0 is an arbitrary rule imposed by convention', isCorrect: false, misconceptionId: `${LOGFUNC}:MC-1` },
      { text: 'Yes, since logarithms could in principle be defined for negative inputs if mathematicians had chosen differently', isCorrect: false, misconceptionId: `${LOGFUNC}:MC-1` },
    ],
    targetedMisconceptions: [`${LOGFUNC}:MC-1`],
    source: eb(LOGFUNC, 'Detection probe — is the restriction that log_a(x) is only defined for x>0 an arbitrary convention to memorize'),
  },
  {
    conceptId: LOGFUNC, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Do you need to separately memorize the log function\'s graph\'s key features (asymptote, intercept), or can they be derived?',
    choices: [
      { text: 'They can be derived — reflecting the exponential\'s graph across y=x gives every feature directly: the exponential\'s (0,1) intercept becomes the log\'s (1,0) intercept, and its horizontal asymptote becomes the log\'s vertical asymptote', isCorrect: true },
      { text: 'The log function\'s graph must be separately memorized as its own independent set of facts', isCorrect: false, misconceptionId: `${LOGFUNC}:MC-2` },
      { text: 'The log graph and the exponential graph share no structural relationship at all', isCorrect: false, misconceptionId: `${LOGFUNC}:MC-2` },
    ],
    targetedMisconceptions: [`${LOGFUNC}:MC-2`],
    source: eb(LOGFUNC, 'Detection probe — do you need to separately memorize the log function\'s graph\'s key features, or can they be derived from the exponential'),
  },
  {
    conceptId: LOGFUNC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is ln x just an arbitrarily named logarithm with no special calculus significance beyond convenience?',
    choices: [
      { text: 'No — ln x=log_e(x) is specifically the inverse of e^x, and because e^x is its own derivative, ln x inherits the uniquely clean derivative 1/x, a direct consequence of e\'s own special status', isCorrect: true },
      { text: 'Yes — ln x is just an arbitrarily named logarithm chosen purely for convenience', isCorrect: false, misconceptionId: `${LOGFUNC}:MC-3` },
      { text: 'Yes, since any base could equally well serve as the "natural" logarithm with no meaningful difference', isCorrect: false, misconceptionId: `${LOGFUNC}:MC-3` },
    ],
    targetedMisconceptions: [`${LOGFUNC}:MC-3`],
    source: eb(LOGFUNC, 'Detection probe — is ln x just an arbitrarily named logarithm with no special calculus significance beyond convenience'),
  },

  // --- math.func.function-operations ------------------------------------------
  {
    conceptId: FUNCOPS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For f(x)=√x (domain x≥0) and g(x)=1/(x-3) (domain x≠3), what is the domain of (f+g)(x)?',
    choices: [
      { text: '[0,3)∪(3,∞) — the combined domain is the INTERSECTION of both original domains; x=3 must be excluded even though f alone would permit it, because g is undefined there', isCorrect: true },
      { text: 'x≥0 — the domain of (f+g)(x) is simply f\'s own domain', isCorrect: false, misconceptionId: `${FUNCOPS}:MC-1` },
      { text: 'x≠3 — the domain of (f+g)(x) is simply g\'s own domain', isCorrect: false, misconceptionId: `${FUNCOPS}:MC-1` },
    ],
    targetedMisconceptions: [`${FUNCOPS}:MC-1`],
    source: eb(FUNCOPS, 'Detection probe — for f(x)=√x and g(x)=1/(x-3), what is the domain of (f+g)(x)'),
  },
  {
    conceptId: FUNCOPS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For f(x)=x+1 and g(x)=x², is (fg)(x) the same as f(g(x))?',
    choices: [
      { text: 'No — (fg)(x)=f(x)·g(x)=(x+1)(x²)=x³+x² (the pointwise product) while f(g(x))=f(x²)=x²+1 (composition) — genuinely different expressions from the identical pair of functions', isCorrect: true },
      { text: 'Yes — (fg)(x) and f(g(x)) both mean the identical operation, just written differently', isCorrect: false, misconceptionId: `${FUNCOPS}:MC-2` },
      { text: 'Yes, since placing two function names in close proximity always represents composition regardless of notation', isCorrect: false, misconceptionId: `${FUNCOPS}:MC-2` },
    ],
    targetedMisconceptions: [`${FUNCOPS}:MC-2`],
    source: eb(FUNCOPS, 'Detection probe — for f(x)=x+1 and g(x)=x², is (fg)(x) the same as f(g(x))'),
  },
  {
    conceptId: FUNCOPS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Addition and multiplication of functions are commutative, just like ordinary arithmetic. Is composition also commutative?',
    choices: [
      { text: 'No — for f(x)=x+1, g(x)=x², (f∘g)(x)=x²+1 while (g∘f)(x)=(x+1)²=x²+2x+1, genuinely different; composition is a structurally different operation (feeding output into input) that does not inherit commutativity from arithmetic', isCorrect: true },
      { text: 'Yes — function composition is commutative, exactly like pointwise addition and multiplication', isCorrect: false, misconceptionId: `${FUNCOPS}:MC-3` },
      { text: 'Yes, since composition and pointwise multiplication are ultimately the same underlying operation', isCorrect: false, misconceptionId: `${FUNCOPS}:MC-3` },
    ],
    targetedMisconceptions: [`${FUNCOPS}:MC-3`],
    source: eb(FUNCOPS, 'Detection probe — is function composition commutative, the same way addition and multiplication of functions are'),
  },

  // --- math.func.monotonic-function ------------------------------------------
  {
    conceptId: MONOTONIC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does the constant function f(x)=3 count as strictly increasing?',
    choices: [
      { text: 'No — f(a)≤f(b) holds always (since 3≤3), making it weakly both increasing and decreasing, but f(a)<f(b) never holds, so it is strictly NEITHER; strict and weak are genuinely different conditions', isCorrect: true },
      { text: 'Yes — a constant function counts as strictly increasing since it never decreases', isCorrect: false, misconceptionId: `${MONOTONIC}:MC-1` },
      { text: 'Yes, since "increasing" and "strictly increasing" are interchangeable terms for the same condition', isCorrect: false, misconceptionId: `${MONOTONIC}:MC-1` },
    ],
    targetedMisconceptions: [`${MONOTONIC}:MC-1`],
    source: eb(MONOTONIC, 'Detection probe — does the constant function f(x)=3 count as strictly increasing'),
  },
  {
    conceptId: MONOTONIC, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'f(1)=5, f(2)=8, f(3)=11 — all increasing. Is f monotonic increasing on all of ℝ?',
    choices: [
      { text: 'Not necessarily — a sampled increasing trend never proves whole-interval monotonicity; a reversal could be hiding between or beyond the sampled points, invisible to a partial check', isCorrect: true },
      { text: 'Yes — three consecutive increasing sample points is sufficient evidence to conclude monotonicity across the entire real line', isCorrect: false, misconceptionId: `${MONOTONIC}:MC-2` },
      { text: 'Yes, since any function increasing at three consecutive integers must be increasing everywhere', isCorrect: false, misconceptionId: `${MONOTONIC}:MC-2` },
    ],
    targetedMisconceptions: [`${MONOTONIC}:MC-2`],
    source: eb(MONOTONIC, 'Detection probe — f(1)=5, f(2)=8, f(3)=11, all increasing; is f monotonic increasing on all of ℝ'),
  },
  {
    conceptId: MONOTONIC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'If a function is injective (never repeats a value), must it also be monotonic?',
    choices: [
      { text: 'No — h(x)=1/x on ℝ\\{0} is injective, yet comparing -1<-0.5 shows a decrease while comparing -0.5<0.5 shows an increase; the same function reverses direction without ever causing two values to coincide', isCorrect: true },
      { text: 'Yes — every injective function must also be monotonic', isCorrect: false, misconceptionId: `${MONOTONIC}:MC-3` },
      { text: 'Yes, since strict monotonicity implies injectivity, the reverse implication must also hold', isCorrect: false, misconceptionId: `${MONOTONIC}:MC-3` },
    ],
    targetedMisconceptions: [`${MONOTONIC}:MC-3`],
    source: eb(MONOTONIC, 'Detection probe — if a function is injective, must it also be monotonic'),
  },
]
