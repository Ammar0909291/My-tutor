/**
 * math.func domain-opening asset batch — the natural exponential function,
 * injectivity, and surjectivity.
 *
 * Opens serving-asset coverage for math.func (0/N -> 3 concepts authored).
 * Authored specifically to unblock the math.calc asset-contract campaign's
 * frontier: math.func.exponential-function directly unblocks
 * math.calc.derivative-exponential (once math.calc.chain-rule, already
 * served, is its only other prerequisite). math.func.injectivity and
 * math.func.surjectivity are both immediately ready (their sole
 * prerequisite, math.func.function-concept, is already served) and are
 * themselves prerequisites of math.func.bijection -> math.func.inverse-
 * functions -> math.func.logarithmic-function / math.trig.inverse-trig,
 * the next tier toward unblocking math.calc.derivative-ln and
 * math.calc.derivative-inverse-trig. Mirrors the established precedent of
 * authoring a minimal adjacent-domain prerequisite set to unblock the
 * active math.calc frontier (per math.calc.change-of-variables' own EB
 * entry, unblocked by authoring math.linalg.determinant).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.func.exponential-function.md,
 * math.func.injectivity.md, and math.func.surjectivity.md.
 *
 *   EXPFUNC   exponential-function — e is a genuine LIMIT of a real
 *             compounding process, never an arbitrary constant; growth/
 *             decay is MULTIPLICATIVE (proportional to current size),
 *             never additive; e^x's self-derivative property is the
 *             SPECIFIC, non-coincidental reason e is called "natural,"
 *             never a coincidence any base could share.
 *   INJECTIVE injectivity — injectivity is a universal "for all" claim
 *             proven by a GENERAL argument or refuted by a genuine
 *             counterexample, never confirmed by sampling; the defining
 *             direction (f(a)=f(b)⟹a=b) is NOT automatic, unlike the
 *             trivial converse every function already satisfies; the
 *             horizontal line test is all-or-nothing — one failing line
 *             disqualifies everything, never a matter of degree.
 *   SURJECTIVE surjectivity — every codomain element must be hit, never
 *             just every domain element mapped somewhere (which every
 *             function already does automatically); surjectivity and
 *             injectivity are completely INDEPENDENT properties, never
 *             implying each other; disproving surjectivity needs only
 *             ONE unreached codomain element, never exhaustive checking.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const EXPFUNC = 'math.func.exponential-function'
const INJECTIVE = 'math.func.injectivity'
const SURJECTIVE = 'math.func.surjectivity'

export const MATHEMATICS_FUNCTIONS_EXPONENTIAL_INJECTIVITY_SURJECTIVITY_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: EXPFUNC, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'e IS A GENUINE LIMIT, NOT AN ARBITRARY CHOICE: e is defined as the limit of (1+1/n)^n as '
      + 'n→∞, approximately 2.71828. This expression arises DIRECTLY from compounding interest n '
      + 'times per year at a 100% annual rate — as compounding becomes more frequent, the result '
      + 'converges to this specific number. It is not a mathematician\'s arbitrary preference; it '
      + 'is the actual limiting value of a real, motivated process.\n\n'
      + 'GROWTH AND DECAY ARE MULTIPLICATIVE, NOT ADDITIVE: the model N(t)=N₀e^(kt) describes a '
      + 'quantity whose rate of change at every instant is PROPORTIONAL TO ITS CURRENT SIZE, not a '
      + 'fixed constant amount per unit time. This is fundamentally different from a linear ("add '
      + 'the same fixed amount every period") model, and the two produce genuinely different '
      + 'numerical predictions that diverge further as time passes.\n\n'
      + 'e^x IS ITS OWN DERIVATIVE — THE SPECIFIC REASON e IS "NATURAL": d/dx[e^x]=e^x, a property '
      + 'no other base a achieves without an extra constant factor (e.g. d/dx[2^x]=2^x·ln2, '
      + 'carrying an extra ln2). This is the deeper, calculus-motivated reason e is singled out.',
    targetedMisconceptions: [`${EXPFUNC}:MC-1`, `${EXPFUNC}:MC-2`, `${EXPFUNC}:MC-3`],
    source: eb(EXPFUNC, 'Core Understanding — e is a genuine limit of compounding, growth/decay is multiplicative not additive, and e^x\'s self-derivative property is the specific reason e is natural'),
  },
  {
    conceptId: INJECTIVE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'INJECTIVITY IS A UNIVERSAL "FOR ALL" CLAIM, PROVEN GENERALLY: f is injective if '
      + 'f(a)=f(b)⟹a=b for EVERY pair a,b in the domain. Proving this requires a GENERAL argument '
      + 'valid for arbitrary symbols a,b. Checking that a few SPECIFIC sample pairs happen to give '
      + 'different outputs is never a proof — injectivity claims this holds for EVERY pair, '
      + 'including ones never checked.\n\n'
      + 'THE DIRECTION THAT MATTERS IS NOT AUTOMATIC — THE OTHER DIRECTION ALREADY IS: every '
      + 'function already guarantees a=b⟹f(a)=f(b) trivially — plugging in the identical input '
      + 'twice obviously gives the identical output twice. Injectivity is specifically about the '
      + 'OPPOSITE, genuinely non-automatic direction: f(a)=f(b)⟹a=b.\n\n'
      + 'THE HORIZONTAL LINE TEST: ONE FAILURE DISQUALIFIES EVERYTHING: a function is injective '
      + 'exactly when EVERY horizontal line crosses its graph AT MOST once. A SINGLE horizontal '
      + 'line crossing twice is entirely sufficient to disqualify the whole function — there is no '
      + 'partial credit for "most lines only cross once."',
    targetedMisconceptions: [`${INJECTIVE}:MC-1`, `${INJECTIVE}:MC-2`, `${INJECTIVE}:MC-3`],
    source: eb(INJECTIVE, 'Core Understanding — injectivity requires a general proof never sampling, the defining direction is not automatic, and the horizontal line test is all-or-nothing'),
  },
  {
    conceptId: SURJECTIVE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'SURJECTIVITY: EVERY CODOMAIN ELEMENT IS HIT: f:A→B is surjective (or onto) if every element '
      + 'b∈B has AT LEAST ONE a∈A with f(a)=b. Multiple domain elements are permitted to map to '
      + 'the SAME codomain element — the only requirement is that NOTHING in the codomain is left '
      + 'completely unreached. f is surjective EXACTLY when its range equals the entire codomain; '
      + 'to DISQUALIFY surjectivity, finding just ONE codomain element with no preimage is '
      + 'sufficient.\n\n'
      + 'SURJECTIVITY IS COMPLETELY INDEPENDENT OF INJECTIVITY: surjectivity asks whether every '
      + 'OUTPUT gets covered; injectivity asks whether DIFFERENT inputs always give different '
      + 'outputs. These are two independent yes/no questions — a function can be surjective and '
      + 'non-injective, injective and non-surjective, both, or neither, and checking one property '
      + 'provides no information about the other.\n\n'
      + 'Note also that every function already sends every domain element somewhere in the '
      + 'codomain automatically — this trivial fact says nothing about whether the codomain is '
      + 'fully COVERED from the domain side, which is the genuinely separate surjectivity claim.',
    targetedMisconceptions: [`${SURJECTIVE}:MC-1`, `${SURJECTIVE}:MC-2`, `${SURJECTIVE}:MC-3`],
    source: eb(SURJECTIVE, 'Core Understanding — surjectivity requires every codomain element to be hit, is independent of injectivity, and a single unreached element disqualifies it'),
  },
]

export const MATHEMATICS_FUNCTIONS_EXPONENTIAL_INJECTIVITY_SURJECTIVITY_PROBES: SeedProbe[] = [
  // --- math.func.exponential-function ------------------------------------------
  {
    conceptId: EXPFUNC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is e an arbitrary constant chosen by mathematicians for convenience, with no deeper mathematical origin?',
    choices: [
      { text: 'No — e is the genuine limit of (1+1/n)^n as n→∞, arising directly from compounding interest more and more frequently; computing terms for n=1,10,100,1000 visibly converges toward e≈2.71828', isCorrect: true },
      { text: 'Yes — e is an arbitrary constant chosen by mathematicians for convenience', isCorrect: false, misconceptionId: `${EXPFUNC}:MC-1` },
      { text: 'Yes, since e has no computable origin and must simply be memorized as a symbol', isCorrect: false, misconceptionId: `${EXPFUNC}:MC-1` },
    ],
    targetedMisconceptions: [`${EXPFUNC}:MC-1`],
    source: eb(EXPFUNC, 'Detection probe — is e an arbitrary constant chosen by mathematicians for convenience, with no deeper mathematical origin'),
  },
  {
    conceptId: EXPFUNC, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A bacteria culture grows at rate k=0.3 per hour starting from 500. Can the population after 2 hours be estimated by adding 0.3×500=150 per hour, giving 500+150×2=800?',
    choices: [
      { text: 'No — the true model N(t)=500e^(0.3t) gives N(2)=500e^0.6≈911, meaningfully different from the linear estimate; exponential change is proportional to the CURRENT amount, never a fixed increment per period', isCorrect: true },
      { text: 'Yes — exponential growth can be reasoned about using the same linear "add a fixed amount per period" intuition as ordinary linear growth', isCorrect: false, misconceptionId: `${EXPFUNC}:MC-2` },
      { text: 'Yes, since the linear estimate and the true exponential value always agree exactly regardless of elapsed time', isCorrect: false, misconceptionId: `${EXPFUNC}:MC-2` },
    ],
    targetedMisconceptions: [`${EXPFUNC}:MC-2`],
    source: eb(EXPFUNC, 'Detection probe — a bacteria culture grows at rate k=0.3 per hour starting from 500; can you estimate the population after 2 hours by adding a fixed amount per hour'),
  },
  {
    conceptId: EXPFUNC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Would any positive base a have equally simple calculus properties to e, given the right circumstances?',
    choices: [
      { text: 'No — d/dx[e^x]=e^x with no extra factor, while d/dx[2^x]=2^x·ln2 carries an extra ln2 factor; this clean self-derivative property is the SPECIFIC, non-coincidental reason e is singled out as "natural," not a feature any base could share', isCorrect: true },
      { text: 'Yes — any positive base would have equally simple calculus properties to e under the right circumstances', isCorrect: false, misconceptionId: `${EXPFUNC}:MC-3` },
      { text: 'Yes, since the self-derivative property is a coincidental feature of e with no deeper explanation', isCorrect: false, misconceptionId: `${EXPFUNC}:MC-3` },
    ],
    targetedMisconceptions: [`${EXPFUNC}:MC-3`],
    source: eb(EXPFUNC, 'Detection probe — would any positive base have equally simple calculus properties to e, given the right circumstances'),
  },

  // --- math.func.injectivity ------------------------------------------
  {
    conceptId: INJECTIVE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Checking that f(1)≠f(2), f(2)≠f(3), and f(0)≠f(5), all giving different outputs — has this proven f is injective?',
    choices: [
      { text: 'No — injectivity is a universal "for all" claim over every pair in the domain; a general symbolic argument (or an actual counterexample) is required, since a failure could exist among any untested pair', isCorrect: true },
      { text: 'Yes — checking several sample pairs and finding different outputs each time proves injectivity', isCorrect: false, misconceptionId: `${INJECTIVE}:MC-1` },
      { text: 'Yes, since injectivity only needs to hold for a representative handful of pairs, not literally every pair', isCorrect: false, misconceptionId: `${INJECTIVE}:MC-1` },
    ],
    targetedMisconceptions: [`${INJECTIVE}:MC-1`],
    source: eb(INJECTIVE, 'Detection probe — I checked that f(1)≠f(2), f(2)≠f(3), and f(0)≠f(5); have I proven f is injective'),
  },
  {
    conceptId: INJECTIVE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is "if a=b then f(a)=f(b)" the same statement as injectivity?',
    choices: [
      { text: 'No — that direction is automatically true for every function (plugging in the same input twice trivially gives the same output); injectivity is specifically about the OPPOSITE, non-automatic direction: f(a)=f(b)⟹a=b', isCorrect: true },
      { text: 'Yes — restating that same-input gives same-output establishes injectivity', isCorrect: false, misconceptionId: `${INJECTIVE}:MC-2` },
      { text: 'Yes, since both directions of the implication are equivalent for every function', isCorrect: false, misconceptionId: `${INJECTIVE}:MC-2` },
    ],
    targetedMisconceptions: [`${INJECTIVE}:MC-2`],
    source: eb(INJECTIVE, 'Detection probe — is "if a=b then f(a)=f(b)" the same statement as injectivity; what direction does injectivity actually claim'),
  },
  {
    conceptId: INJECTIVE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'If only one horizontal line crosses a graph twice, but every other horizontal line crosses at most once, is the function still injective?',
    choices: [
      { text: 'No — injectivity is all-or-nothing; the single failing line is entirely sufficient to disqualify the whole function, with no partial credit for otherwise well-behaved lines', isCorrect: true },
      { text: 'Yes — the function is still "mostly injective" since only one line fails the test', isCorrect: false, misconceptionId: `${INJECTIVE}:MC-3` },
      { text: 'Yes, since injectivity is a matter of degree measured by the proportion of lines that cross exactly once', isCorrect: false, misconceptionId: `${INJECTIVE}:MC-3` },
    ],
    targetedMisconceptions: [`${INJECTIVE}:MC-3`],
    source: eb(INJECTIVE, 'Detection probe — if only one horizontal line crosses a graph twice, but every other line crosses at most once, is the function still injective'),
  },

  // --- math.func.surjectivity ------------------------------------------
  {
    conceptId: SURJECTIVE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'You\'ve shown that every non-negative number can be written as x² for some real x (h(x)=x² is surjective onto [0,∞)). Does this also mean different values of x always give different values of x²?',
    choices: [
      { text: 'No — h(2)=h(-2)=4 shows two different inputs sharing an output, so h is NOT injective, even though it is surjective; surjectivity and injectivity are completely independent properties', isCorrect: true },
      { text: 'Yes — every surjective function must also be injective', isCorrect: false, misconceptionId: `${SURJECTIVE}:MC-1` },
      { text: 'Yes, since surjective and injective are two names for the same underlying property', isCorrect: false, misconceptionId: `${SURJECTIVE}:MC-1` },
    ],
    targetedMisconceptions: [`${SURJECTIVE}:MC-1`],
    source: eb(SURJECTIVE, 'Detection probe — you\'ve shown every non-negative number can be written as x² for some real x; does this also mean different x always give different x²'),
  },
  {
    conceptId: SURJECTIVE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Every element of a function\'s domain maps to something in the codomain — that\'s just how functions work. Does this fact, by itself, tell you the function is surjective?',
    choices: [
      { text: 'No — that fact is automatic for every function and says nothing about surjectivity, which is the OPPOSITE-direction question: whether every codomain element is reached FROM somewhere', isCorrect: true },
      { text: 'Yes — since every domain element maps to something, the function must automatically be surjective', isCorrect: false, misconceptionId: `${SURJECTIVE}:MC-2` },
      { text: 'Yes, since surjectivity is defined entirely in terms of what happens to domain elements, not codomain elements', isCorrect: false, misconceptionId: `${SURJECTIVE}:MC-2` },
    ],
    targetedMisconceptions: [`${SURJECTIVE}:MC-2`],
    source: eb(SURJECTIVE, 'Detection probe — every element of a function\'s domain maps to something in the codomain; does this fact by itself tell you the function is surjective'),
  },
  {
    conceptId: SURJECTIVE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'How many codomain elements must be checked to prove a function is NOT surjective?',
    choices: [
      { text: 'Just one — finding a single unreached codomain element is entirely sufficient to disqualify surjectivity, an existential counterexample, unlike the heavier confirmation case which requires checking every codomain element', isCorrect: true },
      { text: 'Most or all of the codomain elements must be checked before non-surjectivity can be concluded', isCorrect: false, misconceptionId: `${SURJECTIVE}:MC-3` },
      { text: 'Exactly half of the codomain elements, since that establishes a clear majority failing to be reached', isCorrect: false, misconceptionId: `${SURJECTIVE}:MC-3` },
    ],
    targetedMisconceptions: [`${SURJECTIVE}:MC-3`],
    source: eb(SURJECTIVE, 'Detection probe — how many codomain elements do you need to check to prove a function is NOT surjective'),
  },
]
