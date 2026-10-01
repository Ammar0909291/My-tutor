/**
 * Batch: lebesgue-measure, simple-function, abstract-measure-spaces (math.meas) — 3/13 -> 6/13.
 *
 * Fresh Phase 0 frontier recompute after measure and measurable-function
 * were authored: all 3 of their direct dependents became ready
 * simultaneously (lebesgue-measure and abstract-measure-spaces both off
 * measure; simple-function off measurable-function), so this batch closes
 * all 3 at once.
 * Transcribed from their frozen Educational Brain entries at educational-
 * brain/concepts/mathematics/math.meas.lebesgue-measure.md,
 * math.meas.simple-function.md, and math.meas.abstract-measure-spaces.md.
 *
 * Grade band: GradeBand.UNDERGRADUATE, matching this domain's established
 * baseline.
 *
 * lebesgue-measure's KG cross-link (math.real.riemann-integral) is NOT
 * authored — its own EB entry uses independence mode, so its probes stay
 * self-contained. simple-function and abstract-measure-spaces have no
 * cross-links.
 *
 * All 3 EB entries register exactly 3 formal misconceptions each (full
 * contract, no retargeting needed).
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const LEBESGUE_MEASURE = 'math.meas.lebesgue-measure'
const SIMPLE_FUNCTION = 'math.meas.simple-function'
const ABSTRACT_MEASURE_SPACES = 'math.meas.abstract-measure-spaces'

export const MATHEMATICS_MEAS_LEBESGUE_MEASURE_SIMPLE_FUNCTION_ABSTRACT_SPACES_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: LEBESGUE_MEASURE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'OUTER MEASURE GENERALIZES LENGTH VIA THE BEST POSSIBLE COVER: m*(E) covers E with countably '
      + 'many open intervals and takes the INFIMUM of total cover length over every possible such '
      + 'cover. For [0,3], covering with (−ε,3+ε) gives total length 3+2ε; taking the infimum as '
      + 'ε→0 gives exactly m*([0,3])=3 — recovering ordinary length exactly, as a measure\'s own '
      + 'axioms require a measure to behave.\n\n'
      + 'A COUNTABLE SET CAN BE DENSE YET STILL HAVE MEASURE ZERO — DENSITY NEVER IMPLIES POSITIVE '
      + 'SIZE: the rationals in [0,1] are countably infinite and DENSE (packed arbitrarily close to '
      + 'every point of [0,1]), yet covering each rational qₙ with an interval of length ε/2ⁿ gives '
      + 'total cover length Σε/2ⁿ=ε — arbitrarily small. So m*(rationals in [0,1])=0, directly '
      + 'refuting the intuition that "densely packed" must mean "substantial size": ANY countable '
      + 'set, however densely arranged, can always be covered by arbitrarily small total length, one '
      + 'shrinking interval per point.\n\n'
      + 'THE VITALI SET PROVES THE CARATHÉODORY RESTRICTION IS A GENUINE NECESSITY, NEVER AN '
      + 'ARBITRARY CHOICE: m* is defined on EVERY subset of R, but is provably NOT countably '
      + 'additive on all of them. Carathéodory\'s criterion — E is measurable if it "splits" every '
      + 'test set A additively, m*(A)=m*(A∩E)+m*(A\\E) — restricts attention to a large collection '
      + '(essentially every set naturally encountered) where m* restricted IS a genuine measure '
      + 'satisfying countable additivity exactly. The Vitali set V⊆[0,1] (built via the Axiom of '
      + 'Choice) is a CONCRETE, constructible counterexample where this criterion provably fails — '
      + 'not a hypothetical worry, but direct proof that some restriction is genuinely required. '
      + 'Lebesgue measure is also TRANSLATION INVARIANT: shifting [2,5] by 10 gives [12,15], and '
      + 'both have measure 3, unchanged.',
    targetedMisconceptions: [`${LEBESGUE_MEASURE}:MC-1`, `${LEBESGUE_MEASURE}:MC-2`, `${LEBESGUE_MEASURE}:MC-3`],
    source: eb(LEBESGUE_MEASURE, 'Core Understanding — outer measure generalizing length via the best possible cover, a countable set being dense yet still having measure zero, and the Vitali set proving the Caratheodory restriction is a genuine necessity'),
  },
  {
    conceptId: SIMPLE_FUNCTION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A SIMPLE FUNCTION TAKES ONLY FINITELY MANY VALUES, EACH ON A MEASURABLE LEVEL SET: for a '
      + 'function φ(x)=2 on [0,1), φ(x)=5 on [1,3), φ(x)=0 on [3,4], this IS simple — exactly 3 '
      + 'distinct values, each attained on a measurable set, writing φ as a sum of value times '
      + 'indicator of each interval matches the indicator-sum definition exactly, reusing the '
      + 'measurability condition for each level set.\n\n'
      + 'INTEGRATING A SIMPLE FUNCTION IS A FINITE SUM, NEVER A LIMITING PROCESS: because φ takes '
      + 'only finitely many values, its integral is EXACT and IMMEDIATE, computed as the sum of each '
      + 'value times the measure of its level set — for the example above,'
      + ' 2·μ([0,1))+5·μ([1,3))+0·μ([3,4])=2(1)+5(2)+0(1)=12, a direct finite computation matching '
      + 'the "area under a step function" intuition, in sharp contrast to the general Lebesgue '
      + 'integral (which IS built as a limit, but of exactly these simple-function integrals).\n\n'
      + 'MONOTONE APPROXIMATION IS A CONSTRUCTIVE FACT, NEVER MERELY AN ABSTRACT EXISTENCE CLAIM: '
      + 'every non-negative measurable f equals the limit of an increasing sequence of simple '
      + 'functions φ₁≤φ₂≤...→f. For f(x)=x² on [0,1]: partitioning into n equal pieces and setting '
      + 'φₙ to the INFIMUM of f on each piece gives, for n=2, φ₂(x)=0 on [0,0.5) and φ₂(x)=0.25 on '
      + '[0.5,1] — a concrete, computable sequence with φₙ≤φₙ₊₁≤f, refining as n grows. This is the '
      + 'exact bridge: the integral of f is DEFINED as the limit of the already-known, easy '
      + 'simple-function integrals.',
    targetedMisconceptions: [`${SIMPLE_FUNCTION}:MC-1`, `${SIMPLE_FUNCTION}:MC-2`, `${SIMPLE_FUNCTION}:MC-3`],
    source: eb(SIMPLE_FUNCTION, 'Core Understanding — a simple function taking only finitely many values on measurable level sets, integrating a simple function being a finite sum never a limiting process, and monotone approximation being a constructive fact never merely an abstract existence claim'),
  },
  {
    conceptId: ABSTRACT_MEASURE_SPACES, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'SIGMA-FINITE MEANS COVERED BY COUNTABLY MANY FINITE-MEASURE PIECES, NEVER THAT THE TOTAL '
      + 'ITSELF IS FINITE: Lebesgue measure on R is σ-finite via R = the union of all [−n,n] for '
      + 'n=1,2,3,... — each piece has finite length 2n, even though the measure of all of R is '
      + 'infinite overall. Counting measure on an UNCOUNTABLE set is genuinely NOT σ-finite: every '
      + 'finite-counting-measure set is finite, so no countable union of them can ever cover an '
      + 'uncountable X. Sigma-finiteness is about the STRUCTURE of the cover, never the size of the '
      + 'total.\n\n'
      + 'COMPLETENESS IS A GENUINE, CONSTRUCTED PROPERTY — NEVER AUTOMATIC FOR EVERY MEASURE SPACE: '
      + 'a measure is complete if every subset B of a μ-null set A (with μ(A)=0) is automatically '
      + 'measurable (forcing μ(B)=0). The Cantor set C⊂[0,1] has μ(C)=0, but the RAW Borel σ-algebra '
      + 'provably contains non-Borel-measurable subsets of C — the raw Borel measure space is NOT '
      + 'complete. The completed LEBESGUE σ-algebra explicitly repairs this by construction, adding '
      + 'every subset of every null set — the same subset B IS Lebesgue measurable. The same set '
      + 'behaves differently depending on which σ-algebra is chosen, proving completeness is '
      + 'genuinely constructed, not automatic.\n\n'
      + 'CARATHÉODORY EXTENSION IS HOW LEBESGUE MEASURE IS RIGOROUSLY BUILT FROM ELEMENTARY LENGTH: '
      + 'a PREMEASURE μ₀ (satisfying the measure axioms, but defined only on a smaller RING of sets, '
      + 'closed under finite unions/intersections/differences) extends UNIQUELY to a genuine measure '
      + 'on the full σ-algebra it generates — the theorem\'s guarantee, not merely an assertion. '
      + 'Starting from μ₀([a,b])=b−a (length), defined only on finite unions of intervals — which '
      + 'does NOT yet include the Cantor set or general Borel sets — Carathéodory extends this '
      + 'uniquely to the entire Lebesgue σ-algebra, turning the elementary notion of interval length '
      + 'into a fully rigorous, countably-additive measure on a vastly larger collection.',
    targetedMisconceptions: [`${ABSTRACT_MEASURE_SPACES}:MC-1`, `${ABSTRACT_MEASURE_SPACES}:MC-2`, `${ABSTRACT_MEASURE_SPACES}:MC-3`],
    source: eb(ABSTRACT_MEASURE_SPACES, 'Core Understanding — sigma-finite meaning covered by countably many finite-measure pieces never that the total itself is finite, completeness being a genuine constructed property never automatic, and Caratheodory extension being how Lebesgue measure is rigorously built from elementary length'),
  },
]

export const MATHEMATICS_MEAS_LEBESGUE_MEASURE_SIMPLE_FUNCTION_ABSTRACT_SPACES_PROBES: SeedProbe[] = [
  {
    conceptId: LEBESGUE_MEASURE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Since the rationals are dense in [0,1], must their outer measure be a substantial positive number, maybe even close to 1?',
    choices: [
      { text: "No — covering each rational with an exponentially shrinking interval gives total cover length that can be made arbitrarily small, so the outer measure of the rationals in [0,1] is exactly 0, despite being dense; ANY countable set can be covered by arbitrarily small total length", isCorrect: true },
      { text: "Yes, since the rationals are packed densely throughout [0,1], their outer measure should be a substantial positive number", isCorrect: false, misconceptionId: `${LEBESGUE_MEASURE}:MC-1` },
      { text: "Because \"densely packed\" intuitively suggests occupying substantial space, a dense countable set should have positive outer measure", isCorrect: false, misconceptionId: `${LEBESGUE_MEASURE}:MC-1` },
    ],
    targetedMisconceptions: [`${LEBESGUE_MEASURE}:MC-1`],
    source: eb(LEBESGUE_MEASURE, 'Discovery Question 1 as a detection probe (verbatim) — whether the dense rationals must have substantial outer measure, an answer of "yes" confirming DENSITY-CONFLATED-WITH-POSITIVE-MEASURE'),
  },
  {
    conceptId: LEBESGUE_MEASURE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is the Vitali set just a theoretical curiosity, or does it have real mathematical consequences?',
    choices: [
      { text: "It has real consequences — the Vitali set is a CONCRETE, constructible counterexample (built via the Axiom of Choice) proving that outer measure genuinely fails Caratheodory's additivity criterion on some subsets, so the measurability restriction is a real necessity, not excessive caution", isCorrect: true },
      { text: "The Vitali set is a purely theoretical worry with no genuine mathematical force behind it", isCorrect: false, misconceptionId: `${LEBESGUE_MEASURE}:MC-2` },
      { text: "Since the Vitali set's construction relies on the exotic Axiom of Choice, it should be considered abstract enough to dismiss as irrelevant", isCorrect: false, misconceptionId: `${LEBESGUE_MEASURE}:MC-2` },
    ],
    targetedMisconceptions: [`${LEBESGUE_MEASURE}:MC-2`],
    source: eb(LEBESGUE_MEASURE, 'Discovery Question 2 as a detection probe (verbatim) — whether the Vitali set is purely theoretical, an answer dismissing it as such confirming NON-MEASURABLE-SETS-DISMISSED-AS-HYPOTHETICAL'),
  },
  {
    conceptId: LEBESGUE_MEASURE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is outer measure m* itself, before any restriction, already countably additive on every subset of R?',
    choices: [
      { text: "No — m* is defined on every subset of R but is provably NOT countably additive on all of them; the Caratheodory restriction to measurable sets exists precisely because m* alone fails additivity on pathological sets like the Vitali set", isCorrect: true },
      { text: "Yes, outer measure m* is already countably additive on every subset of R before any restriction is applied", isCorrect: false, misconceptionId: `${LEBESGUE_MEASURE}:MC-3` },
      { text: "Since m* is defined on every subset, it should behave like a full measure everywhere, including satisfying countable additivity universally", isCorrect: false, misconceptionId: `${LEBESGUE_MEASURE}:MC-3` },
    ],
    targetedMisconceptions: [`${LEBESGUE_MEASURE}:MC-3`],
    source: eb(LEBESGUE_MEASURE, 'Discovery Question 3 as a detection probe (verbatim) — whether outer measure is already countably additive on every subset before restriction, an answer of "yes" confirming OUTER-MEASURE-ASSUMED-COUNTABLY-ADDITIVE-ON-ALL-SETS'),
  },
  {
    conceptId: SIMPLE_FUNCTION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does integrating even a simple function require a limiting process, like the general Lebesgue integral does?',
    choices: [
      { text: "No — because a simple function takes only finitely many values, its integral is an EXACT, IMMEDIATE finite sum (value times measure of level set, added up); no limiting process is needed, unlike the general Lebesgue integral which IS built as a limit of exactly these simple-function integrals", isCorrect: true },
      { text: "Yes, integrating a simple function requires the same kind of limiting process as the general Lebesgue integral", isCorrect: false, misconceptionId: `${SIMPLE_FUNCTION}:MC-1` },
      { text: "Since the general Lebesgue integral is built using limits, that same limit-based machinery should apply to the simple-function case too", isCorrect: false, misconceptionId: `${SIMPLE_FUNCTION}:MC-1` },
    ],
    targetedMisconceptions: [`${SIMPLE_FUNCTION}:MC-1`],
    source: eb(SIMPLE_FUNCTION, 'Discovery Question 1 as a detection probe (verbatim) — whether integrating a simple function requires a limiting process, an answer of "yes" confirming SIMPLE-FUNCTION-INTEGRAL-ASSUMED-TO-NEED-A-LIMIT'),
  },
  {
    conceptId: SIMPLE_FUNCTION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For φ(x)=2 on [0,1), φ(x)=5 on [1,3), φ(x)=0 on [3,4], what are the correct distinct values and their exact level sets?',
    choices: [
      { text: "Exactly 3 distinct values: 2 on [0,1), 5 on [1,3), and 0 on [3,4] — each value attained on its own measurable interval, read carefully boundary by boundary directly from the function's definition", isCorrect: true },
      { text: "The values and intervals can be read approximately from the graph without checking the exact boundary points of each interval", isCorrect: false, misconceptionId: `${SIMPLE_FUNCTION}:MC-2` },
      { text: "Since step functions are visually simple, the precise interval boundaries are not important for identifying a simple function's values", isCorrect: false, misconceptionId: `${SIMPLE_FUNCTION}:MC-2` },
    ],
    targetedMisconceptions: [`${SIMPLE_FUNCTION}:MC-2`],
    source: eb(SIMPLE_FUNCTION, 'Discovery Question 2 as a detection probe (verbatim) — whether every distinct value and exact interval of a step function can be correctly identified, an answer treating boundaries as unimportant confirming SIMPLE-FUNCTION-VALUES-OR-LEVEL-SETS-MISIDENTIFIED'),
  },
  {
    conceptId: SIMPLE_FUNCTION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: "Can monotone approximation's guaranteed sequence actually be constructed, or is it purely an abstract existence claim?",
    choices: [
      { text: "It can actually be constructed — for f(x)=x² on [0,1], partitioning into n pieces and taking the infimum of f on each piece gives a concrete, computable increasing sequence of simple functions (e.g. for n=2: 0 on [0,0.5), 0.25 on [0.5,1]) that refines toward f as n grows", isCorrect: true },
      { text: "Monotone approximation is purely an abstract existence claim — the theorem guarantees some sequence exists but it cannot actually be built or reasoned about concretely", isCorrect: false, misconceptionId: `${SIMPLE_FUNCTION}:MC-3` },
      { text: "Since the theorem states existence of \"some sequence,\" it should be treated as an unconstructed, purely theoretical guarantee", isCorrect: false, misconceptionId: `${SIMPLE_FUNCTION}:MC-3` },
    ],
    targetedMisconceptions: [`${SIMPLE_FUNCTION}:MC-3`],
    source: eb(SIMPLE_FUNCTION, 'Discovery Question 3 as a detection probe (verbatim) — whether the monotone approximation sequence can actually be constructed, an answer treating it as purely abstract confirming MONOTONE-APPROXIMATION-TREATED-AS-PURELY-ABSTRACT'),
  },
  {
    conceptId: ABSTRACT_MEASURE_SPACES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'If μ(X)=∞, can (X,M,μ) still be σ-finite?',
    choices: [
      { text: "Yes — sigma-finiteness only requires X to be covered by countably many pieces each of FINITE measure, not that the total itself be finite; Lebesgue measure on R is sigma-finite via the union of all [−n,n], each piece finite length, even though the total measure of R is infinite", isCorrect: true },
      { text: "No, σ-finiteness requires the total measure μ(X) itself to be finite, so an infinite total rules it out", isCorrect: false, misconceptionId: `${ABSTRACT_MEASURE_SPACES}:MC-1` },
      { text: "Since \"finite\" appears in the term \"σ-finite,\" it should describe the total measure of the whole space, not just each individual piece", isCorrect: false, misconceptionId: `${ABSTRACT_MEASURE_SPACES}:MC-1` },
    ],
    targetedMisconceptions: [`${ABSTRACT_MEASURE_SPACES}:MC-1`],
    source: eb(ABSTRACT_MEASURE_SPACES, 'Discovery Question 1 as a detection probe (verbatim) — whether a measure space with infinite total measure can still be sigma-finite, an answer of "no" confirming SIGMA-FINITE-CONFLATED-WITH-FINITE-TOTAL-MEASURE'),
  },
  {
    conceptId: ABSTRACT_MEASURE_SPACES, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is every subset of a Borel null set automatically Borel measurable?',
    choices: [
      { text: "No — the Cantor set has measure zero, but the RAW Borel sigma-algebra provably contains non-Borel-measurable subsets of it; completeness (every subset of a null set being measurable) is a genuine, CONSTRUCTED property, repaired explicitly by the completed Lebesgue sigma-algebra, never automatic", isCorrect: true },
      { text: "Yes, every measure space is automatically complete, so every subset of a null set is automatically measurable", isCorrect: false, misconceptionId: `${ABSTRACT_MEASURE_SPACES}:MC-2` },
      { text: "Since the measure axioms don't obviously fail for a reasonable sigma-algebra, incompleteness should be unlikely for most measure spaces", isCorrect: false, misconceptionId: `${ABSTRACT_MEASURE_SPACES}:MC-2` },
    ],
    targetedMisconceptions: [`${ABSTRACT_MEASURE_SPACES}:MC-2`],
    source: eb(ABSTRACT_MEASURE_SPACES, 'Discovery Question 2 as a detection probe (verbatim) — whether every subset of a Borel null set is automatically Borel measurable, an answer of "yes" confirming COMPLETENESS-ASSUMED-AUTOMATIC'),
  },
  {
    conceptId: ABSTRACT_MEASURE_SPACES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: "Does the premeasure's original domain already include sets like the Cantor set?",
    choices: [
      { text: "No — a premeasure lives on a smaller RING of sets (e.g. finite unions of intervals), which does NOT yet include the Cantor set or general Borel sets; Caratheodory extension is precisely the mechanism that uniquely extends it to the larger sigma-algebra where such sets ARE measurable", isCorrect: true },
      { text: "Yes, the premeasure is already defined on the full target sigma-algebra, including sets like the Cantor set", isCorrect: false, misconceptionId: `${ABSTRACT_MEASURE_SPACES}:MC-3` },
      { text: "Since the extension theorem's end result is a measure on the full sigma-algebra, the premeasure's starting domain should already match that full sigma-algebra", isCorrect: false, misconceptionId: `${ABSTRACT_MEASURE_SPACES}:MC-3` },
    ],
    targetedMisconceptions: [`${ABSTRACT_MEASURE_SPACES}:MC-3`],
    source: eb(ABSTRACT_MEASURE_SPACES, 'Discovery Question 3 as a detection probe (verbatim) — whether the premeasure\'s original domain already includes sets like the Cantor set, an answer of "yes" confirming PREMEASURE-DOMAIN-CONFUSED-WITH-EXTENDED-SIGMA-ALGEBRA'),
  },
]
