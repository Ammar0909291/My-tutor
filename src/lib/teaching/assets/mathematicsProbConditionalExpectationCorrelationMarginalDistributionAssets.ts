/**
 * Batch: conditional-expectation, correlation, marginal-distribution
 * (math.prob).
 *
 * Continuing math.prob (35/49 -> 38/49). Fresh frontier recompute after
 * conditional-distribution/covariance/ergodicity's authoring found 6
 * ready concepts, all terminal (no further unlocks). Selected
 * conditional-expectation (closes conditional-distribution's own unlock),
 * correlation (closes covariance's own unlock), and marginal-distribution
 * (closes joint-distribution's remaining unlock) — leaving continuous-
 * distributions, discrete-distributions, and generating-function for a
 * following batch. Transcribed from the frozen Educational Brain entries
 * at educational-brain/concepts/mathematics/math.prob.{conditional-
 * expectation,correlation,marginal-distribution}.md.
 *
 *   CONDITIONAL-EXPECTATION  E[X|Y] is a RANDOM VARIABLE, a function of Y,
 *           never a single number; the tower property E[X]=E[E[X|Y]] is
 *           an EXACT identity, never an approximation; the law of total
 *           variance decomposes Var(X) into within-group and between-
 *           group parts, never merely a value-check.
 *   CORRELATION  normalizing by SD(X)·SD(Y) makes ρ scale-invariant, never
 *           just covariance rescaled by an arbitrary constant; ρ=0 means
 *           UNCORRELATED, never independent — a strong nonlinear
 *           relationship can produce ρ=0; Var(X+Y) requires the covariance
 *           cross-term, never just adding the variances.
 *   MARGINAL-DISTRIBUTION  the joint is recoverable from marginals ONLY
 *           under independence, never in general; marginalization for a
 *           continuous joint requires INTEGRATING over all y, never
 *           evaluating at a single fixed value; marginal and conditional
 *           are DIFFERENT procedures, never the same computation.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const CONDITIONAL_EXPECTATION = 'math.prob.conditional-expectation'
const CORRELATION = 'math.prob.correlation'
const MARGINAL_DISTRIBUTION = 'math.prob.marginal-distribution'

export const MATHEMATICS_PROB_CONDITIONAL_EXPECTATION_CORRELATION_MARGINAL_DISTRIBUTION_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CONDITIONAL_EXPECTATION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'E[X|Y] IS A RANDOM VARIABLE, A FUNCTION OF Y — NEVER A SINGLE NUMBER: for the joint PMF '
      + 'f(1,1)=0.1,f(1,2)=0.2,f(2,1)=0.3,f(2,2)=0.4: E[X|Y=1]=1.75 and E[X|Y=2]≈1.67. E[X|Y] '
      + '(without fixing y) is the FUNCTION g with g(1)=1.75 and g(2)≈1.67 — a genuinely different '
      + 'object from either single number, since it packages BOTH conditional expectations as one '
      + 'function of Y. Believing E[X|Y] (unconditioned on a specific value) is just another way '
      + 'of writing a single number misses that it is a random variable — taking a different '
      + 'value depending on which value Y happens to take.\n\n'
      + 'THE TOWER PROPERTY IS AN EXACT IDENTITY — NEVER AN APPROXIMATION: continuing the example, '
      + 'with f_Y(1)=0.4, f_Y(2)=0.6: E[E[X|Y]]=1.75(0.4)+(5/3)(0.6)=0.7+1=1.7 — matching EXACTLY '
      + 'the directly-computed marginal expectation E[X]=1.7. Believing the tower property gives '
      + 'only an APPROXIMATE estimate of E[X] misses that conditioning on Y and then averaging '
      + 'over Y’s own distribution is mathematically GUARANTEED to reproduce E[X] exactly, every '
      + 'time — never merely approximately or by coincidence.\n\n'
      + 'THE LAW OF TOTAL VARIANCE REVEALS WHERE VARIANCE COMES FROM — NEVER JUST A VALUE-CHECK: '
      + 'for a factory with two production lines with EQUAL within-line variability '
      + '(E[Var(X|Y)]=0.5) but very different average defect counts (E[X|Y=1]=0.5 vs. E[X|Y=2]=5, '
      + 'giving a LARGE Var(E[X|Y])): MOST of X’s total variance comes from the BETWEEN-line '
      + 'difference in averages, not from within-line randomness. Believing the law of total '
      + 'variance mainly serves to double-check Var(X)’s numeric value, without revealing '
      + 'anything about WHERE that variance comes from, misses that its real value is decomposing '
      + 'total variance into interpretable within-group and between-group sources.',
    targetedMisconceptions: [`${CONDITIONAL_EXPECTATION}:MC-1`, `${CONDITIONAL_EXPECTATION}:MC-2`, `${CONDITIONAL_EXPECTATION}:MC-3`],
    source: eb(CONDITIONAL_EXPECTATION, 'Core Understanding — E[X|Y] as a random variable (function of Y) never a single number, the tower property as an exact identity never an approximation, and the law of total variance decomposing variance into within-group and between-group sources'),
  },
  {
    conceptId: CORRELATION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'NORMALIZING BY SD(X)·SD(Y) MAKES ρ SCALE-INVARIANT — NEVER JUST A RESCALED COVARIANCE: '
      + 'Cov(X,Y) has UNITS (units of X times units of Y) and its magnitude depends on the scales '
      + 'chosen — Cov(height in cm, weight in kg)≠Cov(height in m, weight in g) for the SAME '
      + 'data. Dividing by SD(X)·SD(Y) removes this scale-dependence entirely: '
      + 'ρ(aX+b,cY+d)=sign(ac)·ρ(X,Y) for a,c≠0 — changing units does NOT change ρ. Treating ρ '
      + 'as "just Cov scaled by a constant" misses that the normalizing constant ITSELF depends '
      + 'on X and Y’s own scales, making ρ scale-invariant while Cov is not — never '
      + 'interchangeable up to a fixed constant.\n\n'
      + 'ρ=0 MEANS UNCORRELATED — NEVER INDEPENDENT: independence DOES imply ρ=0 '
      + '(Cov(X,Y)=E[XY]-E[X]E[Y]=E[X]E[Y]-E[X]E[Y]=0 when X⊥Y), but the REVERSE is FALSE. '
      + 'Counter-example: X~Uniform(-1,1), Y=X²: Cov(X,Y)=E[X³]-0=0 (since X³ is an odd function '
      + 'of X on a symmetric interval), so ρ=0. But Y is a DETERMINISTIC function of X — knowing '
      + 'X tells you Y EXACTLY, completely dependent. ρ only measures LINEAR association; a '
      + 'strong NONLINEAR relationship (like this quadratic one) can produce ρ=0 while genuine '
      + 'dependence remains — never assume ρ=0 rules out dependence.\n\n'
      + 'VARIANCE OF A SUM REQUIRES THE COVARIANCE CROSS-TERM — NEVER JUST ADDING THE VARIANCES: '
      + 'Var(X+Y)=Var(X)+2Cov(X,Y)+Var(Y)=Var(X)+2ρ·SD(X)·SD(Y)+Var(Y). If ρ=0: '
      + 'Var(X+Y)=Var(X)+Var(Y) (a Pythagorean-like addition). If ρ=1: Var(X+Y)=(SD(X)+SD(Y))² — '
      + 'the MAXIMUM possible variance. If ρ=-1: Var(X+Y)=(SD(X)-SD(Y))², which can be ZERO if '
      + 'SD(X)=SD(Y) — omitting the 2Cov(X,Y) cross-term (assuming variances simply add regardless '
      + 'of correlation) is WRONG whenever X and Y are correlated.',
    targetedMisconceptions: [`${CORRELATION}:MC-1`, `${CORRELATION}:MC-2`, `${CORRELATION}:MC-3`],
    source: eb(CORRELATION, 'Core Understanding — normalizing by SD(X)·SD(Y) making ρ scale-invariant never a rescaled covariance, ρ=0 meaning uncorrelated never independent, and the variance of a sum requiring the covariance cross-term'),
  },
  {
    conceptId: MARGINAL_DISTRIBUTION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'THE JOINT IS RECOVERABLE FROM MARGINALS ONLY UNDER INDEPENDENCE — NEVER IN GENERAL: two '
      + 'joint distributions can share the SAME marginals while being entirely different. Let '
      + 'X,Y∈{0,1}: Joint A: p(0,0)=p(1,1)=1/2, p(0,1)=p(1,0)=0 (X and Y ALWAYS equal — perfectly '
      + 'correlated). Joint B: p(0,0)=p(0,1)=p(1,0)=p(1,1)=1/4 (X and Y INDEPENDENT). BOTH have '
      + 'p_X(0)=p_X(1)=1/2 and p_Y(0)=p_Y(1)=1/2 — IDENTICAL marginals, yet radically DIFFERENT '
      + 'joint behavior. Believing knowing p_X and p_Y fully determines p_{X,Y} is WRONG — '
      + 'marginals describe INDIVIDUAL behavior; the joint describes how X and Y move TOGETHER; '
      + 'the recovery rule p_{X,Y}=p_X·p_Y holds ONLY when X⊥Y (independence), never '
      + 'automatically.\n\n'
      + 'MARGINALIZATION FOR A CONTINUOUS JOINT REQUIRES INTEGRATING OVER ALL y — NEVER '
      + 'EVALUATING AT A SINGLE FIXED VALUE: for f_{X,Y}(x,y)=6xy² on 0<x<1,0<y<1: '
      + 'f_X(x)=∫₀¹6xy² dy=6x[y³/3]₀¹=6x(1/3)=2x for 0<x<1 (verified: ∫₀¹2x dx=1 ✓). Computing '
      + 'the marginal by evaluating the joint at a SPECIFIC y₀ (writing f_X(x)=f_{X,Y}(x,y₀) for '
      + 'some fixed y₀) is WRONG — that procedure describes something else entirely (a slice of '
      + 'the joint, related to but distinct from conditioning); marginalization genuinely '
      + 'requires INTEGRATING over ALL values of y, never evaluating at just one.\n\n'
      + 'MARGINAL AND CONDITIONAL ARE DIFFERENT PROCEDURES — NEVER THE SAME COMPUTATION: the '
      + 'MARGINAL p_X(x)=Σ_y p_{X,Y}(x,y) sums OVER ALL values of y — it AVERAGES Y out entirely, '
      + 'giving the UNCONDITIONAL distribution of X. The CONDITIONAL '
      + 'p_{X|Y}(x|y₀)=p_{X,Y}(x,y₀)/p_Y(y₀) FIXES Y=y₀ at one specific value and NORMALIZES by '
      + 'p_Y(y₀) — it describes X’s distribution GIVEN a specific observed Y. Writing '
      + 'p_X(x)=p_{X,Y}(x,y)/p_Y(y) for the marginal (confusing it with the conditional formula) '
      + 'is WRONG — the marginal involves NO fixing of y and NO division by p_Y; it is a '
      + 'genuinely different quantity from the conditional.',
    targetedMisconceptions: [`${MARGINAL_DISTRIBUTION}:MC-1`, `${MARGINAL_DISTRIBUTION}:MC-2`, `${MARGINAL_DISTRIBUTION}:MC-3`],
    source: eb(MARGINAL_DISTRIBUTION, 'Core Understanding — the joint recoverable from marginals only under independence never in general, marginalization requiring integration over all y never a single-value evaluation, and marginal versus conditional as genuinely different procedures'),
  },
]

export const MATHEMATICS_PROB_CONDITIONAL_EXPECTATION_CORRELATION_MARGINAL_DISTRIBUTION_PROBES: SeedProbe[] = [
  {
    conceptId: CONDITIONAL_EXPECTATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For E[X|Y=1]=1.75 and E[X|Y=2]≈1.67, is E[X|Y] (without fixing Y to a specific value) a single number?',
    choices: [
      { text: 'No — E[X|Y] is the FUNCTION g with g(1)=1.75 and g(2)≈1.67, a genuinely different object from either single number, since it packages both conditional expectations as one function of Y', isCorrect: true },
      { text: 'Yes — E[X|Y] without fixing Y is just another way of writing a single fixed number that summarizes both conditional expectations', isCorrect: false, misconceptionId: `${CONDITIONAL_EXPECTATION}:MC-1` },
      { text: "Yes, since E[X|Y] should always be reduced to one representative number regardless of how many values Y can take", isCorrect: false, misconceptionId: `${CONDITIONAL_EXPECTATION}:MC-1` },
    ],
    targetedMisconceptions: [`${CONDITIONAL_EXPECTATION}:MC-1`],
    source: eb(CONDITIONAL_EXPECTATION, 'Demonstration 1 — the g(1)=1.75, g(2)≈1.67 function-packaging construction, directly breaking E-X-GIVEN-Y-ASSUMED-SINGLE-NUMBER'),
  },
  {
    conceptId: CONDITIONAL_EXPECTATION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Computing E[E[X|Y]]=1.75(0.4)+(5/3)(0.6)=1.7, which exactly matches the directly-computed E[X]=1.7. Is this exact match a coincidence, or does the tower property only give an approximate estimate in general?',
    choices: [
      { text: 'Neither — the tower property E[X]=E[E[X|Y]] is an EXACT identity, never an approximation; conditioning on Y and then averaging over Y’s own distribution is mathematically GUARANTEED to reproduce E[X] exactly, every time', isCorrect: true },
      { text: 'It is a coincidence in this specific example — in general, the tower property only gives an approximate estimate of E[X]', isCorrect: false, misconceptionId: `${CONDITIONAL_EXPECTATION}:MC-2` },
      { text: "The tower property is a rough shortcut technique that happens to work well for simple examples but isn't mathematically exact", isCorrect: false, misconceptionId: `${CONDITIONAL_EXPECTATION}:MC-2` },
    ],
    targetedMisconceptions: [`${CONDITIONAL_EXPECTATION}:MC-2`],
    source: eb(CONDITIONAL_EXPECTATION, 'Demonstration 2 — the exact E[E[X|Y]]=1.7-matches-E[X]=1.7 verification, directly breaking TOWER-PROPERTY-ASSUMED-APPROXIMATE'),
  },
  {
    conceptId: CONDITIONAL_EXPECTATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For a factory with two production lines with EQUAL within-line variability but very different average defect counts across lines, does the law of total variance mainly serve to double-check Var(X)’s numeric value?',
    choices: [
      { text: 'No — its real value is decomposing total variance into interpretable within-group and between-group sources; here, MOST of the total variance comes from the BETWEEN-line difference in averages, not from within-line randomness', isCorrect: true },
      { text: 'Yes — the law of total variance is primarily a computational tool for verifying that Var(X) has been calculated correctly', isCorrect: false, misconceptionId: `${CONDITIONAL_EXPECTATION}:MC-3` },
      { text: "Yes, since decomposing variance into parts doesn't provide any additional interpretive information beyond the total value itself", isCorrect: false, misconceptionId: `${CONDITIONAL_EXPECTATION}:MC-3` },
    ],
    targetedMisconceptions: [`${CONDITIONAL_EXPECTATION}:MC-3`],
    source: eb(CONDITIONAL_EXPECTATION, 'Demonstration 3 — the two-production-line within-versus-between variance decomposition, directly breaking TOTAL-VARIANCE-ASSUMED-UNDIFFERENTIATED'),
  },
  {
    conceptId: CORRELATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'If height and weight are measured in cm/kg versus in m/g for the SAME data, does ρ(X,Y) change the way Cov(X,Y) does?',
    choices: [
      { text: 'No — ρ(aX+b,cY+d)=sign(ac)·ρ(X,Y) for a,c≠0, so changing units does NOT change ρ; Cov, by contrast, has units and its magnitude genuinely depends on the scales chosen', isCorrect: true },
      { text: 'Yes — ρ is just Cov scaled by a fixed constant, so it changes with unit changes exactly the way Cov does', isCorrect: false, misconceptionId: `${CORRELATION}:MC-3` },
      { text: "Yes, since both ρ and Cov are direct measures of the raw relationship between X and Y and must respond identically to any rescaling", isCorrect: false, misconceptionId: `${CORRELATION}:MC-3` },
    ],
    targetedMisconceptions: [`${CORRELATION}:MC-3`],
    source: eb(CORRELATION, 'Demonstration 1 — the unit-change scale-invariance computation for ρ versus Cov, directly breaking CORRELATION-AND-COVARIANCE-ARE-PROPORTIONAL'),
  },
  {
    conceptId: CORRELATION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For X~Uniform(-1,1) and Y=X² (Y completely determined by X), ρ(X,Y)=0. Does this mean X and Y are independent?',
    choices: [
      { text: 'No — Y is a DETERMINISTIC function of X (knowing X tells you Y exactly); ρ only measures LINEAR association, and this strong NONLINEAR (quadratic) relationship produces ρ=0 while genuine dependence remains', isCorrect: true },
      { text: 'Yes — ρ(X,Y)=0 always means X and Y are independent random variables', isCorrect: false, misconceptionId: `${CORRELATION}:MC-1` },
      { text: "Yes, since a correlation of zero certifies that there is no relationship of any kind between X and Y", isCorrect: false, misconceptionId: `${CORRELATION}:MC-2` },
    ],
    targetedMisconceptions: [`${CORRELATION}:MC-1`],
    source: eb(CORRELATION, 'Demonstration 2 — the X~Uniform(-1,1), Y=X² zero-correlation-but-complete-dependence counter-example, directly breaking CORRELATION-ZERO-MEANS-INDEPENDENT'),
  },
  {
    conceptId: CORRELATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'If X and Y have correlation ρ=-1 with SD(X)=SD(Y), does Var(X+Y) equal Var(X)+Var(Y)?',
    choices: [
      { text: 'No — Var(X+Y)=Var(X)+2Cov(X,Y)+Var(Y)=(SD(X)-SD(Y))² when ρ=-1, which is ZERO here since SD(X)=SD(Y); omitting the 2Cov(X,Y) cross-term and just adding variances is WRONG whenever X and Y are correlated', isCorrect: true },
      { text: 'Yes — Var(X+Y) always equals Var(X)+Var(Y) regardless of the correlation between X and Y', isCorrect: false, misconceptionId: `${CORRELATION}:MC-2` },
      { text: "Yes, since the variance of a sum is always the sum of the individual variances by definition", isCorrect: false, misconceptionId: `${CORRELATION}:MC-2` },
    ],
    targetedMisconceptions: [`${CORRELATION}:MC-2`],
    source: eb(CORRELATION, 'Demonstration 3 — the Var(X+Y) decomposition across ρ=0,1,-1 cases, directly breaking CORRELATION-MEASURES-ALL-DEPENDENCE (via the omitted-cross-term consequence)'),
  },
  {
    conceptId: MARGINAL_DISTRIBUTION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Joint A (X,Y always equal) and Joint B (X,Y independent) both have identical marginals p_X(0)=p_X(1)=p_Y(0)=p_Y(1)=1/2. Does knowing both marginals fully determine the joint distribution?',
    choices: [
      { text: 'No — Joint A and Joint B share IDENTICAL marginals yet have radically DIFFERENT joint behavior; the recovery rule p_{X,Y}=p_X·p_Y holds ONLY when X and Y are independent, never automatically', isCorrect: true },
      { text: 'Yes — knowing the marginal distributions p_X and p_Y always fully determines the joint distribution p_{X,Y}', isCorrect: false, misconceptionId: `${MARGINAL_DISTRIBUTION}:MC-1` },
      { text: "Yes, since the joint distribution is simply the product of the two marginals in every case", isCorrect: false, misconceptionId: `${MARGINAL_DISTRIBUTION}:MC-1` },
    ],
    targetedMisconceptions: [`${MARGINAL_DISTRIBUTION}:MC-1`],
    source: eb(MARGINAL_DISTRIBUTION, 'Demonstration 1 — the Joint-A (perfectly correlated) versus Joint-B (independent) identical-marginals counter-example, directly breaking MARGINALS-DETERMINE-THE-JOINT'),
  },
  {
    conceptId: MARGINAL_DISTRIBUTION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For the continuous joint f_{X,Y}(x,y)=6xy² on 0<x<1, 0<y<1, should the marginal f_X(x) be found by evaluating f_{X,Y}(x,y₀) at some fixed y₀, or by integrating over all y?',
    choices: [
      { text: 'By integrating over all y — f_X(x)=∫₀¹6xy² dy=2x for 0<x<1 (verified: ∫₀¹2x dx=1); evaluating at a single fixed y₀ describes a different quantity entirely, never the marginal', isCorrect: true },
      { text: 'By evaluating at a single fixed y₀ — since the joint already contains all the information needed, plugging in one value of y gives the marginal directly', isCorrect: false, misconceptionId: `${MARGINAL_DISTRIBUTION}:MC-3` },
      { text: "Either approach works equally well, since integrating and evaluating at a point give the same function up to a constant factor", isCorrect: false, misconceptionId: `${MARGINAL_DISTRIBUTION}:MC-3` },
    ],
    targetedMisconceptions: [`${MARGINAL_DISTRIBUTION}:MC-3`],
    source: eb(MARGINAL_DISTRIBUTION, 'Demonstration 2 — the f_{X,Y}(x,y)=6xy² full-integration marginal derivation, directly breaking INTEGRATING-TO-GET-MARGINAL-IS-OPTIONAL'),
  },
  {
    conceptId: MARGINAL_DISTRIBUTION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is the marginal distribution p_X(x)=Σ_y p_{X,Y}(x,y) the same computation as the conditional distribution p_{X|Y}(x|y₀)=p_{X,Y}(x,y₀)/p_Y(y₀)?',
    choices: [
      { text: 'No — the marginal sums OVER ALL values of y, averaging Y out entirely to give the unconditional distribution of X, while the conditional FIXES Y=y₀ at one specific value and NORMALIZES by p_Y(y₀); these are genuinely different procedures', isCorrect: true },
      { text: 'Yes — the marginal formula p_X(x)=p_{X,Y}(x,y)/p_Y(y) is exactly the same computation as the conditional formula, just under a different name', isCorrect: false, misconceptionId: `${MARGINAL_DISTRIBUTION}:MC-2` },
      { text: "Yes, since both formulas describe X's distribution 'in the context of' Y in essentially the same way", isCorrect: false, misconceptionId: `${MARGINAL_DISTRIBUTION}:MC-2` },
    ],
    targetedMisconceptions: [`${MARGINAL_DISTRIBUTION}:MC-2`],
    source: eb(MARGINAL_DISTRIBUTION, 'Demonstration 3 — the sum-over-all-y marginal versus fix-y-and-normalize conditional formula contrast, directly breaking MARGINAL-IS-THE-CONDITIONAL'),
  },
]
