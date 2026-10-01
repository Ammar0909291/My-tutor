/**
 * Batch: linear-regression, normal-approximation, sampling-distribution
 * (math.stats) — advances the domain from 10/40 to 13/40.
 *
 * Fresh Phase 0 frontier recompute after last batch's correlation and
 * normal-distribution: linear-regression requires correlation (just
 * authored) + math.linalg.least-squares (already authored);
 * normal-approximation requires math.prob.clt + normal-distribution (just
 * authored); sampling-distribution requires math.stats.sampling +
 * math.prob.random-variable + math.prob.clt, all already authored.
 * Transcribed from their frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.stats.linear-regression.md,
 * math.stats.normal-approximation.md, and math.stats.sampling-distribution.md.
 *
 * Grade band: linear-regression uses GradeBand.UNDERGRADUATE, matching its
 * math.linalg.least-squares prerequisite's own band (OLS is inseparable
 * from the undergraduate least-squares minimization framework). normal-
 * approximation and sampling-distribution use GradeBand.HIGH, matching
 * math.prob.clt's own band and math.stats' established baseline.
 *
 * linear-regression and normal-approximation each register only 2 formal
 * misconceptions; per this campaign's established convention, each
 * concept's 3rd PROFICIENT probe re-targets one of the two existing
 * misconceptions via a fresh worked example rather than inventing a fake
 * third misconception. sampling-distribution has 3 formal misconceptions,
 * so no retargeting is needed there.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const LINEAR_REGRESSION = 'math.stats.linear-regression'
const NORMAL_APPROXIMATION = 'math.stats.normal-approximation'
const SAMPLING_DISTRIBUTION = 'math.stats.sampling-distribution'

export const MATHEMATICS_STATS_LINEAR_REGRESSION_NORMAL_APPROXIMATION_SAMPLING_DISTRIBUTION_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: LINEAR_REGRESSION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'THE SLOPE MUST BE COMPUTED BEFORE THE INTERCEPT — NEVER THE REVERSE OR INDEPENDENTLY: for '
      + '$(S_{xy}=40)$, $(S_{xx}=20)$, $(\\bar x=5)$, $(\\bar y=12)$: '
      + '$(\\hat\\beta_1=40/20=2)$, THEN $(\\hat\\beta_0=12-2(5)=12-10=2)$. Computing '
      + '$(\\hat\\beta_0)$ WITHOUT first finding $(\\hat\\beta_1)$ (e.g. using $(\\bar y)$ alone as '
      + 'the intercept, or applying the formulas out of order) is WRONG — the intercept formula '
      + 'genuinely DEPENDS on the already-computed slope; the two must be found in the correct '
      + 'SEQUENTIAL order, slope first, then intercept.\n\n'
      + 'A NON-SIGNIFICANT SLOPE TEST NEVER MEANS "NO RELATIONSHIP AT ALL" — ONLY "NO SIGNIFICANT '
      + 'LINEAR RELATIONSHIP DETECTED": for data following a perfect $(Y=X^2)$ relationship '
      + '(symmetric range): $(\\hat\\beta_1\\approx0)$ and the slope test FAILS to reject '
      + '$(H_0:\\beta_1=0)$. This does NOT mean X and Y are unrelated — since $(Y=X^2)$ is a '
      + 'perfectly deterministic but NON-LINEAR relationship, the LINEAR model genuinely can\'t '
      + 'detect it (the same cancellation effect as correlation\'s symmetric-range example). '
      + 'Checking a scatterplot remains essential before concluding "no relationship."\n\n'
      + 'A HIGH R² NEVER VALIDATES THE MODEL\'S ASSUMPTIONS — RESIDUAL DIAGNOSTICS MUST BE CHECKED '
      + 'SEPARATELY: a regression achieves $(R^2=0.95)$ (seemingly excellent), but a residual plot '
      + 'shows a clear FUNNEL SHAPE (residuals fanning out as X increases — evidence of '
      + 'non-constant variance, violating homoscedasticity). $(R^2)$ measures how much variance is '
      + '"explained" OVERALL, but says NOTHING about whether the model\'s underlying ASSUMPTIONS '
      + '(constant variance, normality, linearity) actually hold — $(R^2)$ and assumption validity '
      + 'are SEPARATE things that must BOTH be checked.',
    targetedMisconceptions: [`${LINEAR_REGRESSION}:MC-1`, `${LINEAR_REGRESSION}:MC-2`],
    source: eb(LINEAR_REGRESSION, 'Core Understanding — the slope needing to be computed before the intercept never the reverse or independently, a non-significant slope test never meaning no relationship at all only no significant linear relationship detected, and a high R-squared never validating the model\'s assumptions since residual diagnostics must be checked separately'),
  },
  {
    conceptId: NORMAL_APPROXIMATION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'THE APPROXIMATING NORMAL\'S PARAMETERS ARE THE FULL np AND np(1-p) — NEVER SIMPLIFIED '
      + 'VERSIONS: for Bin(100,0.5): mean=np=100(0.5)=50, variance=np(1-p)=100(0.5)(0.5)=25 (SD 5). '
      + 'A common error uses p or n ALONE as the mean or variance (e.g. mistakenly using just '
      + 'p=0.5 as the mean) — the approximating normal\'s parameters are SPECIFICALLY np and '
      + 'np(1-p), EXACTLY reproducing the binomial\'s own mean and variance, never a simplified or '
      + 'partial substitute.\n\n'
      + 'THE POISSON APPROXIMATION USES THE SAME VALUE λ FOR BOTH PARAMETERS — A GENUINE, NOT '
      + 'COINCIDENTAL, PROPERTY: for Poisson(50): mean=50, variance=50 (SD≈7.07) — using the SAME '
      + 'value for BOTH parameters, because the Poisson distribution has the CHARACTERISTIC '
      + 'property that its mean ALWAYS equals its variance. This is never an accident of the '
      + 'approximation; it directly reflects the Poisson\'s own defining structure.\n\n'
      + 'THE CONTINUITY CORRECTION GENUINELY IMPROVES ACCURACY — NEVER SAFELY OMITTED: for '
      + 'P(X≤30) with X~Bin(100,0.3) (mean 30, variance 21, SD≈4.58): WITH the continuity '
      + 'correction, P(X≤30)≈P(Y≤30.5) gives z=(30.5-30)/4.58≈0.109, so P(Z≤0.109)≈0.543. OMITTING '
      + 'the correction (computing P(Y≤30) directly, z=0) gives P(Z≤0)=0.5 — a NOTICEABLY '
      + 'DIFFERENT, LESS ACCURATE result. The +0.5 adjustment "covers" the discrete probability '
      + 'mass at exactly k using the continuous distribution — genuinely improving the '
      + 'approximation, never a dispensable technicality.',
    targetedMisconceptions: [`${NORMAL_APPROXIMATION}:MC-1`, `${NORMAL_APPROXIMATION}:MC-2`],
    source: eb(NORMAL_APPROXIMATION, 'Core Understanding — the approximating normal\'s parameters being the full np and np(1-p) never simplified versions, the Poisson approximation using the same value lambda for both parameters as a genuine not coincidental property, and the continuity correction genuinely improving accuracy never safely omitted'),
  },
  {
    conceptId: SAMPLING_DISTRIBUTION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'THREE GENUINELY DIFFERENT OBJECTS SHARE THE SAME MEAN — NEVER CONFLATED: for population '
      + '{2,4,6,8} (μ=5, σ=√5≈2.236) and all C(4,2)=6 samples of size 2: the sample means are '
      + '{3,4,5,5,6,7} — this LIST of 6 means IS the sampling distribution of X̄, a genuinely '
      + 'DIFFERENT object from the 4-element population AND from any single 2-element sample\'s '
      + 'own raw data (e.g. {2,8}). ALL THREE happen to share mean 5 — but they have DIFFERENT '
      + 'spreads: the population ranges 2 to 8, the sampling distribution\'s means range only 3 to '
      + '7 (NARROWER, since averaging smooths out extremes), and a single sample\'s raw data is '
      + 'just its own two numbers.\n\n'
      + 'STANDARD ERROR SCALES AS σ/√n — NEVER σ/n: for σ=12, n=9: the CORRECT SD(X̄)=12/√9=12/3=4. '
      + 'The INCORRECT σ/n=12/9≈1.33 is considerably SMALLER and WRONG — dividing by raw n instead '
      + 'of √n drastically OVERSTATES how tightly the sampling distribution concentrates, '
      + 'understating its true variability. The square root is NEVER optional.\n\n'
      + 'HALVING THE STANDARD ERROR REQUIRES QUADRUPLING n — NEVER MERELY DOUBLING IT: starting at '
      + 'n=25 with SE=4 (σ=20): DOUBLING to n=50 gives SE=20/√50≈2.83 — a reduction, but NOT to '
      + 'half (which would be 2); 2.83 is only about 71% of the original. QUADRUPLING to n=100 '
      + 'gives SE=20/√100=2 — EXACTLY half. To halve SE, the denominator √n must DOUBLE, which '
      + 'requires n itself to become 4 TIMES as large (since √(4n)=2√n) — doubling n only shrinks '
      + 'SE by a factor of 1/√2≈0.707, NEVER by half.',
    targetedMisconceptions: [`${SAMPLING_DISTRIBUTION}:MC-1`, `${SAMPLING_DISTRIBUTION}:MC-2`, `${SAMPLING_DISTRIBUTION}:MC-3`],
    source: eb(SAMPLING_DISTRIBUTION, 'Core Understanding — three genuinely different objects (population, sample data, sampling distribution) sharing the same mean never conflated, standard error scaling as sigma over root n never sigma over n, and halving the standard error requiring quadrupling n never merely doubling it'),
  },
]

export const MATHEMATICS_STATS_LINEAR_REGRESSION_NORMAL_APPROXIMATION_SAMPLING_DISTRIBUTION_PROBES: SeedProbe[] = [
  {
    conceptId: LINEAR_REGRESSION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Can you compute the intercept before you\'ve computed the slope?',
    choices: [
      { text: "No — for Sxy=40, Sxx=20, x̄=5, ȳ=12: β̂1=40/20=2 must be found FIRST, THEN β̂0=12-2(5)=2; the intercept formula genuinely depends on the already-computed slope, so the two must be found in strict sequential order", isCorrect: true },
      { text: "Yes, the intercept can be computed independently of the slope, in either order", isCorrect: false, misconceptionId: `${LINEAR_REGRESSION}:MC-1` },
      { text: "Since the intercept and slope are both just numbers describing the line, the order in which they're computed shouldn't matter", isCorrect: false, misconceptionId: `${LINEAR_REGRESSION}:MC-1` },
    ],
    targetedMisconceptions: [`${LINEAR_REGRESSION}:MC-1`],
    source: eb(LINEAR_REGRESSION, 'Discovery Question 1 as a detection probe (verbatim) — whether the intercept can be computed before the slope, an answer of "yes" confirming INTERCEPT-COMPUTED-WITHOUT-FIRST-FINDING-THE-SLOPE-IN-CORRECT-ORDER'),
  },
  {
    conceptId: LINEAR_REGRESSION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'If the slope test isn\'t significant, does that mean X and Y have no relationship at all?',
    choices: [
      { text: "No — for data following a perfect Y=X² relationship (symmetric range), β̂1≈0 and the slope test fails to reject H0:β1=0, yet X and Y are perfectly (non-linearly) related; the linear model genuinely can't detect it, so a scatterplot check remains essential", isCorrect: true },
      { text: "Yes, a non-significant slope test proves X and Y have no relationship of any kind", isCorrect: false, misconceptionId: `${LINEAR_REGRESSION}:MC-2` },
      { text: "Since the slope test specifically checks whether X and Y are related, a non-significant result should settle the question of any relationship existing", isCorrect: false, misconceptionId: `${LINEAR_REGRESSION}:MC-2` },
    ],
    targetedMisconceptions: [`${LINEAR_REGRESSION}:MC-2`],
    source: eb(LINEAR_REGRESSION, 'Discovery Question 2 as a detection probe (verbatim) — whether a non-significant slope test means no relationship at all, an answer of "yes" confirming NON-SIGNIFICANT-SLOPE-TEST-CONCLUDED-AS-NO-RELATIONSHIP-AT-ALL'),
  },
  {
    conceptId: LINEAR_REGRESSION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: "Does a high R² by itself tell you the model's assumptions are satisfied?",
    choices: [
      { text: "No — a regression can achieve R²=0.95 (seemingly excellent) while a residual plot shows a clear funnel shape (non-constant variance, violating homoscedasticity); R² measures variance explained, but says nothing about whether assumptions like constant variance, normality, or linearity actually hold — residual diagnostics must be checked separately", isCorrect: true },
      { text: "Yes, a high R² is sufficient evidence that the model's underlying assumptions are satisfied", isCorrect: false, misconceptionId: `${LINEAR_REGRESSION}:MC-2` },
      { text: "Since R² already measures how well the model fits the data, a high value should account for whether its assumptions hold too", isCorrect: false, misconceptionId: `${LINEAR_REGRESSION}:MC-2` },
    ],
    targetedMisconceptions: [`${LINEAR_REGRESSION}:MC-2`],
    source: eb(LINEAR_REGRESSION, 'Discovery Question 3 as a detection probe (verbatim) — whether a high R-squared by itself means the model\'s assumptions are satisfied, an answer of "yes" re-targeting NON-SIGNIFICANT-SLOPE-TEST-CONCLUDED-AS-NO-RELATIONSHIP-AT-ALL\'s underlying "one good signal proves everything" pattern via a fresh worked example, since this EB entry registers only 2 formal misconceptions'),
  },
  {
    conceptId: NORMAL_APPROXIMATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: "Are the approximating normal's mean and variance the full np and np(1-p), or a simplified version?",
    choices: [
      { text: "The full formulas — for Bin(100,0.5): mean=np=100(0.5)=50, variance=np(1-p)=100(0.5)(0.5)=25; using just p or n alone as the mean or variance is a common error, since the parameters must exactly reproduce the binomial's own mean and variance", isCorrect: true },
      { text: "A simplified version, such as using p alone as the mean of the approximating normal", isCorrect: false, misconceptionId: `${NORMAL_APPROXIMATION}:MC-1` },
      { text: "Since the binomial has a relatively simple structure, a simplified formula should give a close enough approximation for the normal's parameters", isCorrect: false, misconceptionId: `${NORMAL_APPROXIMATION}:MC-1` },
    ],
    targetedMisconceptions: [`${NORMAL_APPROXIMATION}:MC-1`],
    source: eb(NORMAL_APPROXIMATION, 'Discovery Question 1 as a detection probe (verbatim) — whether the approximating normal\'s parameters are the full np/np(1-p) or a simplified version, an answer favoring a simplified version confirming APPROXIMATING-NORMAL-PARAMETERS-SIMPLIFIED-OR-PARTIALLY-COMPUTED'),
  },
  {
    conceptId: NORMAL_APPROXIMATION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does omitting the continuity correction still give an accurate approximation?',
    choices: [
      { text: "No, not as accurate — for P(X≤30) with X~Bin(100,0.3) (SD≈4.58): WITH correction, P(X≤30)≈P(Y≤30.5) gives z≈0.109 and P(Z≤0.109)≈0.543; OMITTING it gives z=0 and P(Z≤0)=0.5, a noticeably different, less accurate result — the +0.5 adjustment genuinely improves accuracy", isCorrect: true },
      { text: "Yes, omitting the continuity correction still gives an equally accurate approximation", isCorrect: false, misconceptionId: `${NORMAL_APPROXIMATION}:MC-2` },
      { text: "Since the continuity correction only adjusts by half a unit, its effect on the final probability should be negligible enough to skip safely", isCorrect: false, misconceptionId: `${NORMAL_APPROXIMATION}:MC-2` },
    ],
    targetedMisconceptions: [`${NORMAL_APPROXIMATION}:MC-2`],
    source: eb(NORMAL_APPROXIMATION, 'Discovery Question 3 as a detection probe (verbatim) — whether omitting the continuity correction still gives an accurate approximation, an answer of "yes" confirming CONTINUITY-CORRECTION-OMITTED-OR-APPLIED-IN-THE-WRONG-DIRECTION'),
  },
  {
    conceptId: NORMAL_APPROXIMATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Why does the Poisson normal approximation use the same value for both mean and variance?',
    choices: [
      { text: "Because the Poisson distribution has the characteristic property that its mean ALWAYS equals its variance — for Poisson(50): mean=50, variance=50 (SD≈7.07), using the same λ for both is a genuine, not coincidental, reflection of the Poisson's own defining structure", isCorrect: true },
      { text: "It's a simplification made purely for computational convenience, not a real property of the Poisson distribution", isCorrect: false, misconceptionId: `${NORMAL_APPROXIMATION}:MC-1` },
      { text: "Since both the mean and variance are unknown before sampling, using the same placeholder value for both is a reasonable default approximation", isCorrect: false, misconceptionId: `${NORMAL_APPROXIMATION}:MC-1` },
    ],
    targetedMisconceptions: [`${NORMAL_APPROXIMATION}:MC-1`],
    source: eb(NORMAL_APPROXIMATION, 'Discovery Question 2 as a detection probe (verbatim) — why the Poisson normal approximation uses the same value for mean and variance, an answer treating it as coincidental or a mere convenience re-targeting APPROXIMATING-NORMAL-PARAMETERS-SIMPLIFIED-OR-PARTIALLY-COMPUTED via a fresh framing, since this EB entry registers only 2 formal misconceptions'),
  },
  {
    conceptId: SAMPLING_DISTRIBUTION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: "Is the 'sampling distribution' the same thing as the distribution of data within one sample?",
    choices: [
      { text: "No — for population {2,4,6,8} and all 6 samples of size 2, the sample means {3,4,5,5,6,7} form the sampling distribution of X̄, a genuinely different object from the population AND from any single sample's own raw data (e.g. {2,8}); all three share mean 5 but have different spreads", isCorrect: true },
      { text: "Yes, the sampling distribution is the same thing as the distribution of data within one sample", isCorrect: false, misconceptionId: `${SAMPLING_DISTRIBUTION}:MC-1` },
      { text: "Since both terms involve the word \"distribution\" applied to sample data, they should refer to the same underlying object", isCorrect: false, misconceptionId: `${SAMPLING_DISTRIBUTION}:MC-1` },
    ],
    targetedMisconceptions: [`${SAMPLING_DISTRIBUTION}:MC-1`],
    source: eb(SAMPLING_DISTRIBUTION, 'Discovery Question 1 as a detection probe (verbatim) — whether the sampling distribution is the same as the distribution of data within one sample, an answer of "yes" confirming SAMPLING-DISTRIBUTION-IS-THE-DATA'),
  },
  {
    conceptId: SAMPLING_DISTRIBUTION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is the standard error computed as σ/n or σ/√n?',
    choices: [
      { text: "σ/√n — for σ=12, n=9: the correct SD(X̄)=12/√9=12/3=4; the incorrect σ/n=12/9≈1.33 is considerably smaller and wrong, since dividing by raw n instead of √n drastically overstates how tightly the sampling distribution concentrates", isCorrect: true },
      { text: "σ/n — the standard error is computed by dividing sigma directly by n", isCorrect: false, misconceptionId: `${SAMPLING_DISTRIBUTION}:MC-2` },
      { text: "Since standard deviation and standard error are closely related, both should use the same simple sigma-divided-by-n formula", isCorrect: false, misconceptionId: `${SAMPLING_DISTRIBUTION}:MC-2` },
    ],
    targetedMisconceptions: [`${SAMPLING_DISTRIBUTION}:MC-2`],
    source: eb(SAMPLING_DISTRIBUTION, 'Discovery Question 2 as a detection probe (verbatim) — whether the standard error is sigma/n or sigma/root-n, an answer of "sigma/n" confirming STANDARD-ERROR-IS-SIGMA-OVER-N'),
  },
  {
    conceptId: SAMPLING_DISTRIBUTION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does doubling the sample size cut the standard error in half?',
    choices: [
      { text: "No — starting at n=25 with SE=4 (σ=20), doubling to n=50 gives SE=20/√50≈2.83 (only about 71% of the original, not half); quadrupling to n=100 gives SE=20/√100=2, exactly half — halving SE requires n to become 4 times as large, since √(4n)=2√n", isCorrect: true },
      { text: "Yes, doubling the sample size always cuts the standard error exactly in half", isCorrect: false, misconceptionId: `${SAMPLING_DISTRIBUTION}:MC-3` },
      { text: "Since standard error decreases as sample size increases, doubling the input should proportionally halve the output", isCorrect: false, misconceptionId: `${SAMPLING_DISTRIBUTION}:MC-3` },
    ],
    targetedMisconceptions: [`${SAMPLING_DISTRIBUTION}:MC-3`],
    source: eb(SAMPLING_DISTRIBUTION, 'Discovery Question 3 as a detection probe (verbatim) — whether doubling the sample size cuts the standard error in half, an answer of "yes" confirming DOUBLE-N-HALVES-SE'),
  },
]
