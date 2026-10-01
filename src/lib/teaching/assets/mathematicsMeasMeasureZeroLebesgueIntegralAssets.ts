/**
 * Batch: measure-zero, lebesgue-integral (math.meas) — 6/13 -> 8/13.
 *
 * Fresh Phase 0 frontier recompute after lebesgue-measure and
 * simple-function were authored: their sole direct dependents became
 * ready simultaneously (measure-zero off lebesgue-measure; lebesgue-
 * integral off simple-function, completing the domain's core
 * integration-building-block chain sigma-algebra -> measure ->
 * measurable-function -> simple-function -> lebesgue-integral), so this
 * batch closes both at once.
 * Transcribed from their frozen Educational Brain entries at educational-
 * brain/concepts/mathematics/math.meas.measure-zero.md and
 * math.meas.lebesgue-integral.md.
 *
 * Grade band: GradeBand.UNDERGRADUATE, matching this domain's established
 * baseline.
 *
 * Both concepts' KG cross-links (math.real.riemann-integrability and
 * math.real.riemann-integral respectively) are NOT authored — both EB
 * entries use independence mode, so their probes stay self-contained.
 *
 * Both EB entries register exactly 3 formal misconceptions each (full
 * contract, no retargeting needed).
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const MEASURE_ZERO = 'math.meas.measure-zero'
const LEBESGUE_INTEGRAL = 'math.meas.lebesgue-integral'

export const MATHEMATICS_MEAS_MEASURE_ZERO_LEBESGUE_INTEGRAL_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: MEASURE_ZERO, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'COUNTABILITY IS SUFFICIENT FOR MEASURE ZERO, BUT NEVER NECESSARY: every countable set (like '
      + 'the rationals in [0,1]) has measure zero via a shrinking-interval cover. The natural next '
      + 'question is whether countability is the ONLY route to measure zero, or whether something '
      + 'genuinely BIGGER can also achieve it.\n\n'
      + 'THE CANTOR SET IS A CONCRETE, DUAL-VERIFIED COUNTEREXAMPLE — UNCOUNTABLE YET MEASURE ZERO: '
      + 'build C by starting with [0,1] and repeatedly removing the open middle third of every '
      + 'remaining interval. At stage n, 2ⁿ intervals of length 3⁻ⁿ remain, total length (2/3)ⁿ→0 — '
      + 'giving μ(C)=0 via a direct LIMITING computation, a fundamentally different technique from '
      + 'the countable-covering argument. Yet C is UNCOUNTABLE: every point corresponds to an '
      + 'infinite ternary expansion using only digits {0,2} (digit-1 positions are exactly what gets '
      + 'removed), and mapping 0↦0, 2↦1 gives a BIJECTION with infinite binary sequences — '
      + 'uncountable by the standard diagonal argument. C is simultaneously uncountable AND measure '
      + 'zero, definitively separating these two notions.\n\n'
      + '"ALMOST EVERYWHERE" IS A PRECISE, WEAKER CLAIM THAN "EVERYWHERE," NEVER AN INFORMAL '
      + 'HAND-WAVE: a property P(x) holds a.e. on E if the set where P(x) fails has measure zero. '
      + 'For f(x)=0 on [0,1] except f(x)=1 on the rationals in [0,1]: "f=0 almost everywhere" is '
      + 'TRUE, since the exception set (the rationals) has measure zero, even though f is NOT '
      + 'identically zero (it equals 1 at every rational). This a.e.-vs-everywhere distinction is '
      + 'genuinely useful — many important analysis theorems are false with "everywhere" but true '
      + 'and powerful with "almost everywhere."',
    targetedMisconceptions: [`${MEASURE_ZERO}:MC-1`, `${MEASURE_ZERO}:MC-2`, `${MEASURE_ZERO}:MC-3`],
    source: eb(MEASURE_ZERO, 'Core Understanding — countability being sufficient for measure zero but never necessary, the Cantor set as a concrete dual-verified counterexample uncountable yet measure zero, and almost everywhere being a precise weaker claim than everywhere never an informal hand-wave'),
  },
  {
    conceptId: LEBESGUE_INTEGRAL, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'THE INTEGRAL IS BUILT AS A SUPREMUM OF ALREADY-KNOWN SIMPLE-FUNCTION INTEGRALS, NEVER A NEW '
      + 'KIND OF COMPUTATION: for f(x)=x² on [0,1], reusing the simple-function approximating '
      + 'sequence φₙ (infimum on each of n equal sub-intervals), the integral of f is the SUPREMUM '
      + 'of the integrals of φₙ as n→∞ — approaching 1/3, matching ordinary calculus. No new '
      + 'integration concept is introduced; only a new way of aggregating the easy, finite-sum '
      + 'simple case.\n\n'
      + 'f=f⁺−f⁻ SPLITS A SIGNED FUNCTION INTO TWO NON-NEGATIVE PIECES, BOTH ALREADY INTEGRABLE VIA '
      + 'THE SUPREMUM CONSTRUCTION: for f(x)=x on [−1,1]: f⁺(x)=max(x,0), f⁻(x)=max(−x,0) — both '
      + 'non-negative by construction. The integral of f⁺ is 1/2; the integral of f⁻ is 1/2 by '
      + 'symmetry; so the integral of f is 1/2−1/2=0, matching the expected symmetric cancellation, '
      + 'computed entirely from two non-negative-function integrals combined by subtraction — never '
      + 'a fresh signed-integration technique.\n\n'
      + 'LEBESGUE INTEGRATION IS A GENUINE EXTENSION OF RIEMANN INTEGRATION, NEVER MERELY A '
      + 'DIFFERENT METHOD FOR THE SAME FUNCTIONS: the Dirichlet function f(x)=1 on rationals, 0 on '
      + 'irrationals in [0,1] is NOT Riemann integrable at all — every upper Darboux sum equals 1 '
      + '(rationals dense), every lower sum equals 0 (irrationals dense), so the infimum of upper '
      + 'sums never equals the supremum of lower sums. But f IS measurable — it is the indicator of '
      + 'the rationals in [0,1], a SIMPLE function — so its Lebesgue integral is 1 times the measure '
      + 'of the rationals in [0,1], which is 1×0=0, computed effortlessly. A function Riemann\'s '
      + 'theory cannot handle AT ALL is integrated trivially by Lebesgue\'s theory, proving genuine '
      + 'extension, never equivalence.',
    targetedMisconceptions: [`${LEBESGUE_INTEGRAL}:MC-1`, `${LEBESGUE_INTEGRAL}:MC-2`, `${LEBESGUE_INTEGRAL}:MC-3`],
    source: eb(LEBESGUE_INTEGRAL, 'Core Understanding — the integral being built as a supremum of already-known simple-function integrals never a new kind of computation, f equals f-plus minus f-minus splitting a signed function into two non-negative pieces, and Lebesgue integration being a genuine extension of Riemann integration via the Dirichlet function'),
  },
]

export const MATHEMATICS_MEAS_MEASURE_ZERO_LEBESGUE_INTEGRAL_PROBES: SeedProbe[] = [
  {
    conceptId: MEASURE_ZERO, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is having measure zero the same as being countable, or could an uncountable set also have measure zero?',
    choices: [
      { text: "An uncountable set can also have measure zero — the Cantor set is a concrete example: it is uncountable (via a ternary-to-binary bijection) yet has measure zero (via a direct limiting length computation), proving countability is sufficient but never necessary for measure zero", isCorrect: true },
      { text: "Having measure zero is exactly equivalent to being countable — every measure-zero set is countable and vice versa", isCorrect: false, misconceptionId: `${MEASURE_ZERO}:MC-1` },
      { text: "Since the only measure-zero examples typically encountered are countable sets, that equivalence should hold generally", isCorrect: false, misconceptionId: `${MEASURE_ZERO}:MC-1` },
    ],
    targetedMisconceptions: [`${MEASURE_ZERO}:MC-1`],
    source: eb(MEASURE_ZERO, 'Discovery Question 1 as a detection probe (verbatim) — whether measure zero is the same as countable, an answer treating them as equivalent confirming MEASURE-ZERO-ASSUMED-EQUIVALENT-TO-COUNTABLE'),
  },
  {
    conceptId: MEASURE_ZERO, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: "Does the Cantor set's uncountability contradict its measure-zero property, or can a set have both simultaneously?",
    choices: [
      { text: "A set can have both simultaneously — the Cantor set is dual-verified: measure zero via its stage-n remaining length (2/3)ⁿ→0, and uncountable via a ternary-expansion bijection with infinite binary sequences, both confirmed independently on the same object", isCorrect: true },
      { text: "Yes, being uncountable contradicts having measure zero — a set that is uncountable ('bigger' in counting sense) must have positive measure", isCorrect: false, misconceptionId: `${MEASURE_ZERO}:MC-2` },
      { text: "Since being uncountable intuitively suggests being bigger, it should also suggest being bigger in the measure sense, ruling out measure zero", isCorrect: false, misconceptionId: `${MEASURE_ZERO}:MC-2` },
    ],
    targetedMisconceptions: [`${MEASURE_ZERO}:MC-2`],
    source: eb(MEASURE_ZERO, 'Discovery Question 2 as a detection probe (verbatim) — whether uncountability contradicts measure zero, an answer of "yes" confirming UNCOUNTABLE-AND-MEASURE-ZERO-ASSUMED-CONTRADICTORY'),
  },
  {
    conceptId: MEASURE_ZERO, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does "holds almost everywhere" mean essentially the same as "holds everywhere, with a few negligible exceptions," or is there a precise distinction?',
    choices: [
      { text: "There is a precise distinction — a property holds a.e. on E if the set where it fails has measure ZERO specifically, a checkable condition; e.g. f=0 a.e. on [0,1] is TRUE when f=1 only on the measure-zero rationals, even though f is not identically zero", isCorrect: true },
      { text: "\"Almost everywhere\" is just an informal way of saying \"basically true everywhere except for some negligible exceptions,\" without a precise mathematical condition", isCorrect: false, misconceptionId: `${MEASURE_ZERO}:MC-3` },
      { text: "Since \"almost\" in ordinary English suggests a loose approximation, \"almost everywhere\" should be read the same informal way in mathematics", isCorrect: false, misconceptionId: `${MEASURE_ZERO}:MC-3` },
    ],
    targetedMisconceptions: [`${MEASURE_ZERO}:MC-3`],
    source: eb(MEASURE_ZERO, 'Discovery Question 3 as a detection probe (verbatim) — whether almost everywhere is a precise condition or an informal hand-wave, an answer treating it as informal confirming ALMOST-EVERYWHERE-TREATED-AS-INFORMAL-HAND-WAVE'),
  },
  {
    conceptId: LEBESGUE_INTEGRAL, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is the Lebesgue integral just a different name or method for computing the exact same integral Riemann integration already handles?',
    choices: [
      { text: "No — the Dirichlet function (1 on rationals, 0 on irrationals in [0,1]) is NOT Riemann integrable at all (upper Darboux sums all equal 1, lower sums all equal 0), yet it IS trivially Lebesgue integrable (as a simple function, its integral is 1 times the measure of the rationals, which is 0) — a genuine extension, not an equivalent method", isCorrect: true },
      { text: "Yes, the Lebesgue integral computes exactly the same integrals as Riemann integration, just using different notation and machinery", isCorrect: false, misconceptionId: `${LEBESGUE_INTEGRAL}:MC-1` },
      { text: "Since both theories agree on the functions typically encountered in calculus, they should be considered equivalent theories overall", isCorrect: false, misconceptionId: `${LEBESGUE_INTEGRAL}:MC-1` },
    ],
    targetedMisconceptions: [`${LEBESGUE_INTEGRAL}:MC-1`],
    source: eb(LEBESGUE_INTEGRAL, 'Discovery Question 1 as a detection probe (verbatim) — whether the Lebesgue integral is just a different method for the same functions as Riemann, an answer of "yes" confirming LEBESGUE-AND-RIEMANN-TREATED-AS-EQUIVALENT-THEORIES'),
  },
  {
    conceptId: LEBESGUE_INTEGRAL, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'When splitting f=f⁺−f⁻, must both f⁺ and f⁻ be non-negative everywhere?',
    choices: [
      { text: "Yes — f⁺=max(f,0) and f⁻=max(−f,0) are BOTH non-negative by construction everywhere, regardless of f's sign; for f(x)=x on [−1,1], both parts integrate to 1/2, and the original integral is recovered as 1/2−1/2=0", isCorrect: true },
      { text: "No, f⁻ can go negative in places since it is defined using a negative sign inside max(−f,0)", isCorrect: false, misconceptionId: `${LEBESGUE_INTEGRAL}:MC-2` },
      { text: "The negative sign inside the f-minus definition suggests that f-minus itself should take on negative values in some regions", isCorrect: false, misconceptionId: `${LEBESGUE_INTEGRAL}:MC-2` },
    ],
    targetedMisconceptions: [`${LEBESGUE_INTEGRAL}:MC-2`],
    source: eb(LEBESGUE_INTEGRAL, 'Discovery Question 2 as a detection probe (verbatim) — whether both f-plus and f-minus must be non-negative everywhere, an answer allowing f-minus to go negative confirming POSITIVE-NEGATIVE-PART-DECOMPOSITION-MISAPPLIED'),
  },
  {
    conceptId: LEBESGUE_INTEGRAL, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: "Does choosing a different approximating sequence of simple functions change the Lebesgue integral's value?",
    choices: [
      { text: "No — the Lebesgue integral is defined as the SUPREMUM over ALL simple functions staying below f, a single fixed number; any valid approximating sequence of simple functions approaches that same supremum, regardless of which specific sequence is used", isCorrect: true },
      { text: "Yes, the Lebesgue integral's value depends on which specific approximating sequence of simple functions is chosen", isCorrect: false, misconceptionId: `${LEBESGUE_INTEGRAL}:MC-3` },
      { text: "Since examples typically show one specific approximating sequence, that particular sequence should be treated as the actual definition of the integral", isCorrect: false, misconceptionId: `${LEBESGUE_INTEGRAL}:MC-3` },
    ],
    targetedMisconceptions: [`${LEBESGUE_INTEGRAL}:MC-3`],
    source: eb(LEBESGUE_INTEGRAL, 'Discovery Question 3 as a detection probe (verbatim) — whether a different approximating sequence changes the integral\'s value, an answer of "yes" confirming SUPREMUM-CONSTRUCTION-CONFUSED-WITH-A-SINGLE-APPROXIMATING-SEQUENCE'),
  },
]
