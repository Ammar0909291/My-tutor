/**
 * Batch: completeness-metric, pointwise-convergence, riemann-integrability
 * (math.real).
 *
 * Fresh Phase 0 frontier recompute after the weierstrass-approximation/
 * implicit-function-theorem/inverse-function-theorem batch found 4 ready
 * concepts; this batch closes all of them except series-rigorous, which
 * is deferred to the next batch. completeness-metric closes the
 * metric-space chain's remaining declared unlock; pointwise-convergence
 * requires only convergence-sequences; riemann-integrability closes the
 * riemann-integral chain's own declared unlock. Transcribed from the
 * frozen Educational Brain entries at educational-brain/concepts/
 * mathematics/math.real.{completeness-metric,pointwise-convergence,
 * riemann-integrability}.md.
 *
 * Grade band: all three adopt GradeBand.UNDERGRADUATE, continuing math.real's
 * established domain baseline.
 *
 *   COMPLETENESS-METRIC  A single incompleteness result on a set is NEVER
 *           grounds to conclude the same underlying set must be
 *           incomplete under every metric — completeness depends on the
 *           metric, not just the underlying set; "completing" a space is
 *           NEVER the same as the space simply being complete — completion
 *           builds a genuinely bigger space around the original; and the
 *           Baire Category Theorem's guarantee NEVER holds for an
 *           arbitrary metric space — completeness is an essential,
 *           required hypothesis.
 *   POINTWISE-CONVERGENCE  Pointwise convergence is NEVER a genuinely new
 *           definition — it is the same epsilon-N criterion applied
 *           separately at each fixed point; N is NEVER required to be
 *           independent of x — it genuinely depends on both epsilon and x,
 *           with no single N needing to work everywhere; and a pointwise
 *           limit of continuous functions is NEVER guaranteed to be
 *           continuous — every function in the sequence can be continuous
 *           while the limit itself has a genuine jump.
 *   RIEMANN-INTEGRABILITY  The Lebesgue criterion is NEVER merely another
 *           sufficient condition like continuity — it is the exact
 *           necessary-and-sufficient dividing line; its correct prediction
 *           of the Dirichlet function's non-integrability is NEVER a
 *           coincidental match with an already-known result — it is
 *           independent confirmation via a genuinely different mechanism;
 *           and having infinitely many discontinuities NEVER automatically
 *           rules out integrability — measure, never cardinality,
 *           determines the outcome.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const COMPLETENESS_METRIC = 'math.real.completeness-metric'
const POINTWISE_CONVERGENCE = 'math.real.pointwise-convergence'
const RIEMANN_INTEGRABILITY = 'math.real.riemann-integrability'

export const MATHEMATICS_REAL_COMPLETENESS_METRIC_POINTWISE_CONVERGENCE_RIEMANN_INTEGRABILITY_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: COMPLETENESS_METRIC, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'COMPLETENESS GENERALIZES THE ALREADY-KNOWN Q-VERSUS-R CONTRAST: the decimal-truncation '
      + 'sequence 1.4, 1.41, 1.414, ... is Cauchy in the rationals under the absolute-value '
      + 'metric but converges only to $\\sqrt2$, which is not rational — so the rationals under '
      + 'this metric are NOT complete. The SAME sequence, viewed in the reals under the absolute '
      + 'value metric, DOES converge (to $\\sqrt2$) — so the reals under this metric ARE '
      + 'complete. This is exactly the metric-space completeness criterion, phrased with the '
      + 'metric directly, with no new content beyond restating this already-known fact in '
      + 'general vocabulary.\n\n'
      + 'C([A,B]) WITH THE SUP METRIC IS COMPLETE — A GENUINELY NEW RESULT: if a sequence of '
      + 'functions is Cauchy in the sup metric, then for every $\\varepsilon>0$ there is an $N$ '
      + 'such that beyond it, the sup distance between any two functions in the sequence is less '
      + 'than $\\varepsilon$ — meaning the SAME $N$ works for EVERY input simultaneously (uniform '
      + 'Cauchy-ness). This forces the sequence of values at each fixed input to be Cauchy in R '
      + '(hence convergent, since R is complete), defining a limit function; and the UNIFORMITY '
      + 'of the original condition is exactly what makes that limit function CONTINUOUS (a '
      + 'standard epsilon-over-3 argument). So the limit belongs to the space, and the space is '
      + 'complete.\n\n'
      + 'COMPLETION AND BAIRE CATEGORY (ORIENTATION LEVEL): every metric space, complete or not, '
      + 'can be COMPLETED — embedded densely into a complete space by formally adjoining the '
      + 'missing limits of its own Cauchy sequences. The rationals (incomplete) complete to the '
      + 'reals (complete): every real number is a limit of some Cauchy sequence of rationals. '
      + 'The BAIRE CATEGORY THEOREM (stated without proof, appropriately deferred given this '
      + "concept's scope) is a structural fact holding specifically in COMPLETE metric spaces — a "
      + 'complete metric space cannot be written as a countable union of nowhere-dense sets, a '
      + 'guarantee that FAILS for incomplete spaces.',
    targetedMisconceptions: [`${COMPLETENESS_METRIC}:MC-1`, `${COMPLETENESS_METRIC}:MC-2`, `${COMPLETENESS_METRIC}:MC-3`],
    source: eb(COMPLETENESS_METRIC, 'Core Understanding — completeness generalizing the already-known Q-versus-R contrast, C([a,b]) with the sup metric being complete as a genuinely new result, and completion versus the Baire Category Theorem\'s essential completeness hypothesis'),
  },
  {
    conceptId: POINTWISE_CONVERGENCE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'POINTWISE CONVERGENCE IS THE SAME EPSILON-N DEFINITION, APPLIED ONE POINT AT A TIME: for '
      + '$f_n(x)=x^n$ on [0,1]: fixing $x=1/2$ gives the ordinary number sequence '
      + '$(1/2)^n\\to0$, verified via the standard convergence definition. Fixing $x=1$ gives '
      + '$f_n(1)=1\\to1$ trivially. Checking every $x$ this way gives a limit function equal to '
      + '0 for $x<1$ and 1 at $x=1$ — no NEW convergence machinery is invented; the SAME '
      + 'definition is applied repeatedly, once per point.\n\n'
      + 'N GENUINELY DEPENDS ON X, NOT JUST EPSILON — THE CRUCIAL NEW FEATURE: continuing with '
      + '$\\varepsilon=0.01$: at $x=1/2$, reaching that accuracy needs a moderate $N$; at '
      + '$x=0.9$, the SAME accuracy needs a MUCH larger $N$. As $x$ approaches 1 from below, the '
      + 'needed $N$ grows without bound — no single $N$ works for all $x<1$ simultaneously. '
      + 'Pointwise convergence, by definition, permits this entirely; it makes no requirement '
      + 'that one $N$ serve every point at once.\n\n'
      + 'POINTWISE CONVERGENCE DOES NOT PRESERVE CONTINUITY — EVERY TERM CAN BE CONTINUOUS WHILE '
      + 'THE LIMIT IS NOT: $f_n(x)=x^n$ are each perfectly continuous (polynomials), yet the '
      + 'pointwise limit has a JUMP DISCONTINUITY at $x=1$ — directly proving continuity is NOT '
      + 'automatically transferred. This is possible precisely because continuity of each term '
      + 'says nothing about how the required $N$ behaves as $x$ varies; if it grows unboundedly '
      + "near some point, a genuine jump can appear in the limit. Dini's theorem identifies one "
      + 'special sufficient condition — monotone convergence, PLUS compact domain, PLUS '
      + 'continuous limit — under which this failure provably cannot happen, upgrading pointwise '
      + 'convergence automatically to uniform.',
    targetedMisconceptions: [`${POINTWISE_CONVERGENCE}:MC-1`, `${POINTWISE_CONVERGENCE}:MC-2`, `${POINTWISE_CONVERGENCE}:MC-3`],
    source: eb(POINTWISE_CONVERGENCE, "Core Understanding — pointwise convergence being the same epsilon-N definition applied one point at a time, N genuinely depending on x not just epsilon, and pointwise convergence not preserving continuity since every term can be continuous while the limit is not"),
  },
  {
    conceptId: RIEMANN_INTEGRABILITY, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      "THE LEBESGUE CRITERION RESOLVES BOTH OF THE RIEMANN INTEGRAL'S ONE-DIRECTIONAL GAPS AT "
      + 'ONCE: boundedness is necessary but not sufficient, and continuity is sufficient but not '
      + 'necessary. The Lebesgue criterion gives a genuine IF-AND-ONLY-IF: a function is '
      + 'integrable exactly when it is bounded AND its discontinuity set has MEASURE ZERO. '
      + 'Tabulating: $f_1(x)=x^2$ (continuous, discontinuity set empty, measure zero) — '
      + 'integrable. $f_2(x)=\\lfloor x\\rfloor$ (discontinuous at finitely many points, a '
      + 'measure-zero set) — integrable, even though NOT continuous everywhere, a case '
      + "continuity alone couldn't resolve.\n\n"
      + 'RE-DIAGNOSING THE DIRICHLET FUNCTION: ITS DISCONTINUITY SET HAS POSITIVE MEASURE, '
      + 'CORRECTLY PREDICTING FAILURE: the Dirichlet function is discontinuous at EVERY point in '
      + '[0,1] — its discontinuity set is the ENTIRE interval, with measure 1, POSITIVE not '
      + 'zero. The criterion correctly predicts NON-integrability: boundedness holds, but the '
      + 'measure-zero condition fails — CONFIRMING, via a genuinely different mechanism '
      + '(measuring the discontinuity set) than the direct upper/lower-sum argument, the SAME '
      + 'conclusion. This is independent diagnosis, never coincidental agreement.\n\n'
      + 'A COUNTABLY INFINITE DISCONTINUITY SET STILL HAS MEASURE ZERO — MEASURE, NOT COUNT, '
      + 'DECIDES INTEGRABILITY: for a function discontinuous only at the countably many rational '
      + 'points in [0,1]: by the fact that countable sets have measure zero, this discontinuity '
      + 'set has measure zero — so the function IS Riemann integrable, DESPITE infinitely many '
      + 'discontinuities. Contrast directly against the Dirichlet function (also infinitely '
      + 'discontinuous, but on a set of POSITIVE measure, and NOT integrable): the identical '
      + '"infinitely many discontinuities" description applies to both, yet one is integrable '
      + 'and the other is not — MEASURE, never mere cardinality, is the deciding factor.',
    targetedMisconceptions: [`${RIEMANN_INTEGRABILITY}:MC-1`, `${RIEMANN_INTEGRABILITY}:MC-2`, `${RIEMANN_INTEGRABILITY}:MC-3`],
    source: eb(RIEMANN_INTEGRABILITY, "Core Understanding — the Lebesgue criterion resolving both of the Riemann integral's one-directional gaps at once, re-diagnosing the Dirichlet function via its positive-measure discontinuity set, and a countably infinite discontinuity set still having measure zero since measure not count decides integrability"),
  },
]

export const MATHEMATICS_REAL_COMPLETENESS_METRIC_POINTWISE_CONVERGENCE_RIEMANN_INTEGRABILITY_PROBES: SeedProbe[] = [
  {
    conceptId: COMPLETENESS_METRIC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'If C([0,1]) with one norm is not complete, must it fail to be complete under every metric?',
    choices: [
      { text: 'No — C([a,b]) with the sup metric IS complete (verified via the uniform-Cauchy argument), even though the same set of functions can fail to be complete under a different metric like the L¹ norm; completeness depends on the specific metric, never just the underlying set', isCorrect: true },
      { text: 'Yes — if a set of functions fails to be complete under one metric, it must fail to be complete under every possible metric', isCorrect: false, misconceptionId: `${COMPLETENESS_METRIC}:MC-1` },
      { text: "Yes, since completeness is fundamentally a property of the underlying set of functions, independent of which metric is chosen", isCorrect: false, misconceptionId: `${COMPLETENESS_METRIC}:MC-1` },
    ],
    targetedMisconceptions: [`${COMPLETENESS_METRIC}:MC-1`],
    source: eb(COMPLETENESS_METRIC, 'Discovery Question 1 as a detection probe (verbatim) — whether incompleteness under one metric implies incompleteness under every metric, an answer of "yes" confirming SUP-METRIC-COMPLETENESS-ASSUMED-TO-FAIL-LIKE-L1-NORM'),
  },
  {
    conceptId: COMPLETENESS_METRIC, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is "completing" a metric space the same as the space simply being complete?',
    choices: [
      { text: 'No — the rationals are not complete, yet they HAVE a completion, namely the reals, a genuinely larger space built around them; completing a space constructs something bigger, it does not make the original space itself complete', isCorrect: true },
      { text: 'Yes — "completing" a space and the space simply "being complete" describe the identical situation', isCorrect: false, misconceptionId: `${COMPLETENESS_METRIC}:MC-2` },
      { text: "Yes, since a space's completion is always identical to the original space with no new elements added", isCorrect: false, misconceptionId: `${COMPLETENESS_METRIC}:MC-2` },
    ],
    targetedMisconceptions: [`${COMPLETENESS_METRIC}:MC-2`],
    source: eb(COMPLETENESS_METRIC, 'Discovery Question 2 as a detection probe (verbatim) — whether completing a space is the same as the space being complete, an answer of "yes" confirming COMPLETION-CONFUSED-WITH-COMPLETENESS-ITSELF'),
  },
  {
    conceptId: COMPLETENESS_METRIC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: "Does the Baire Category Theorem's guarantee hold for any metric space, or does it require completeness specifically?",
    choices: [
      { text: 'It requires completeness specifically — the theorem is a structural fact holding in COMPLETE metric spaces, and this guarantee genuinely FAILS for incomplete spaces; completeness is an essential, non-optional hypothesis', isCorrect: true },
      { text: 'It holds for any metric space, regardless of whether that space is complete', isCorrect: false, misconceptionId: `${COMPLETENESS_METRIC}:MC-3` },
      { text: "It holds universally, since the theorem's conclusion is a general fact about countable unions in any topological setting", isCorrect: false, misconceptionId: `${COMPLETENESS_METRIC}:MC-3` },
    ],
    targetedMisconceptions: [`${COMPLETENESS_METRIC}:MC-3`],
    source: eb(COMPLETENESS_METRIC, 'Discovery Question 3 as a detection probe (verbatim) — whether Baire Category holds for any metric space, an answer of "yes, any space" confirming BAIRE-CATEGORY-THEOREM-ASSUMED-TO-HOLD-WITHOUT-COMPLETENESS'),
  },
  {
    conceptId: POINTWISE_CONVERGENCE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does checking pointwise convergence require a genuinely new definition, separate from the ε-N definition for number sequences?',
    choices: [
      { text: 'No — checking pointwise convergence of fₙ(x)=xⁿ at x=1/2 and x=1 separately each uses the ordinary ε-N definition for number sequences applied at that fixed point; no new convergence machinery is invented', isCorrect: true },
      { text: 'Yes — pointwise convergence of function sequences requires an entirely new and separate definition from the ε-N definition for number sequences', isCorrect: false, misconceptionId: `${POINTWISE_CONVERGENCE}:MC-1` },
      { text: "Yes, since sequences of functions are fundamentally different objects requiring their own convergence theory unrelated to number sequences", isCorrect: false, misconceptionId: `${POINTWISE_CONVERGENCE}:MC-1` },
    ],
    targetedMisconceptions: [`${POINTWISE_CONVERGENCE}:MC-1`],
    source: eb(POINTWISE_CONVERGENCE, 'Discovery Question 1 as a detection probe (verbatim) — whether pointwise convergence requires a genuinely new definition, an answer of "yes" confirming POINTWISE-CONVERGENCE-ASSUMED-NEW-DEFINITION'),
  },
  {
    conceptId: POINTWISE_CONVERGENCE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For a fixed ε, must the same N work at every point x in E for pointwise convergence?',
    choices: [
      { text: 'No — for fₙ(x)=xⁿ with ε=0.01, the required N at x=1/2 is much smaller than the required N at x=0.9, and N grows without bound as x approaches 1; pointwise convergence permits N to genuinely depend on x, with no single N required to work everywhere', isCorrect: true },
      { text: 'Yes — pointwise convergence requires a single N (depending only on ε) that works at every point x in E simultaneously', isCorrect: false, misconceptionId: `${POINTWISE_CONVERGENCE}:MC-2` },
      { text: "Yes, since the definition of convergence for any sequence always produces an N independent of any other variable", isCorrect: false, misconceptionId: `${POINTWISE_CONVERGENCE}:MC-2` },
    ],
    targetedMisconceptions: [`${POINTWISE_CONVERGENCE}:MC-2`],
    source: eb(POINTWISE_CONVERGENCE, 'Discovery Question 2 as a detection probe (verbatim) — whether a single N must work at every point for pointwise convergence, an answer of "yes" confirming N-ASSUMED-INDEPENDENT-OF-X'),
  },
  {
    conceptId: POINTWISE_CONVERGENCE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'If every fₙ in a sequence is continuous, must its pointwise limit also be continuous?',
    choices: [
      { text: 'No — fₙ(x)=xⁿ on [0,1] has every term continuous (each is a polynomial), yet the pointwise limit has a jump discontinuity at x=1; continuity of each term says nothing about how the required N behaves as x varies, so a genuine jump can appear', isCorrect: true },
      { text: 'Yes — a pointwise limit of continuous functions must always itself be continuous', isCorrect: false, misconceptionId: `${POINTWISE_CONVERGENCE}:MC-3` },
      { text: "Yes, since continuity is a property preserved automatically by any limiting process applied to a sequence of functions", isCorrect: false, misconceptionId: `${POINTWISE_CONVERGENCE}:MC-3` },
    ],
    targetedMisconceptions: [`${POINTWISE_CONVERGENCE}:MC-3`],
    source: eb(POINTWISE_CONVERGENCE, 'Discovery Question 3 as a detection probe (verbatim) — whether the pointwise limit of continuous functions must be continuous, an answer of "yes" confirming CONTINUITY-ASSUMED-PRESERVED-BY-POINTWISE-LIMIT'),
  },
  {
    conceptId: RIEMANN_INTEGRABILITY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is the Lebesgue criterion just another sufficient condition for integrability, or is it the exact necessary-and-sufficient dividing line?',
    choices: [
      { text: 'It is the exact dividing line — the step function ⌊x⌋ is discontinuous at finitely many points (measure zero) and IS integrable, a case continuity alone could not resolve, showing the criterion is a genuine if-and-only-if, not merely another sufficient condition', isCorrect: true },
      { text: 'It is just another sufficient condition for integrability, similar in strength to continuity', isCorrect: false, misconceptionId: `${RIEMANN_INTEGRABILITY}:MC-1` },
      { text: "It is only a necessary condition, never sufficient on its own to guarantee integrability", isCorrect: false, misconceptionId: `${RIEMANN_INTEGRABILITY}:MC-1` },
    ],
    targetedMisconceptions: [`${RIEMANN_INTEGRABILITY}:MC-1`],
    source: eb(RIEMANN_INTEGRABILITY, 'Discovery Question 1 as a detection probe (verbatim) — whether the Lebesgue criterion is merely sufficient or the exact dividing line, an answer of "merely sufficient" confirming LEBESGUE-CRITERION-ASSUMED-MERELY-SUFFICIENT'),
  },
  {
    conceptId: RIEMANN_INTEGRABILITY, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: "Does the Lebesgue criterion's correct prediction of the Dirichlet function's non-integrability merely coincidentally match the already-known result?",
    choices: [
      { text: 'No — the Dirichlet function\'s discontinuity set is the entire interval, with measure 1 (positive, not zero), computed via a genuinely DIFFERENT mechanism (measuring the discontinuity set) than the original upper/lower-sum argument; this is independent confirmation, never coincidence', isCorrect: true },
      { text: "Yes — the criterion's prediction for the Dirichlet function is merely a coincidental match with the previously known non-integrability result", isCorrect: false, misconceptionId: `${RIEMANN_INTEGRABILITY}:MC-2` },
      { text: "Yes, since the Lebesgue criterion is logically derived from the upper/lower-sum argument, so agreement between them is automatic and uninformative", isCorrect: false, misconceptionId: `${RIEMANN_INTEGRABILITY}:MC-2` },
    ],
    targetedMisconceptions: [`${RIEMANN_INTEGRABILITY}:MC-2`],
    source: eb(RIEMANN_INTEGRABILITY, 'Discovery Question 2 as a detection probe (verbatim) — whether the criterion\'s Dirichlet prediction is coincidental, an answer of "yes, coincidental" confirming LEBESGUE-CRITERION-DIRICHLET-PREDICTION-ASSUMED-COINCIDENTAL'),
  },
  {
    conceptId: RIEMANN_INTEGRABILITY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does having infinitely many discontinuities automatically rule out Riemann integrability?',
    choices: [
      { text: 'No — a function discontinuous only at the countably many rationals in [0,1] has a measure-zero discontinuity set (countable sets have measure zero) and IS integrable, despite infinitely many discontinuities; contrast the Dirichlet function, also infinitely discontinuous but on a POSITIVE-measure set and NOT integrable — measure, never cardinality, decides', isCorrect: true },
      { text: 'Yes — having infinitely many discontinuities always rules out Riemann integrability, regardless of how those discontinuities are distributed', isCorrect: false, misconceptionId: `${RIEMANN_INTEGRABILITY}:MC-3` },
      { text: "Yes, since any infinite discontinuity set necessarily has positive measure", isCorrect: false, misconceptionId: `${RIEMANN_INTEGRABILITY}:MC-3` },
    ],
    targetedMisconceptions: [`${RIEMANN_INTEGRABILITY}:MC-3`],
    source: eb(RIEMANN_INTEGRABILITY, 'Discovery Question 3 as a detection probe (verbatim) — whether infinitely many discontinuities automatically rules out integrability, an answer of "yes" confirming INFINITE-DISCONTINUITIES-ASSUMED-TO-RULE-OUT-INTEGRABILITY'),
  },
]
