/**
 * Batch: pca (math.opt), descriptive-statistics + sampling (math.stats) —
 * closes math.opt to 16/16 (DOMAIN COMPLETE, the 19th) and advances
 * math.stats to 4/40.
 *
 * Fresh Phase 0 frontier recompute after math.stats.covariance-matrix was
 * authored last batch: math.opt.pca (requires math.linalg.svd +
 * math.stats.covariance-matrix, both now authored) became the domain's
 * final concept. Simultaneously, math.stats.descriptive-statistics and
 * math.stats.sampling (both requiring only math.stats.population-sample,
 * plus probability-axioms for sampling) became ready. Transcribed from
 * their frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.opt.pca.md,
 * math.stats.descriptive-statistics.md, and math.stats.sampling.md.
 *
 * Grade band: pca uses GradeBand.UNDERGRADUATE, matching math.opt's own
 * domain baseline (established across all of math.opt's prior batches) and
 * both its prerequisites' UNDERGRADUATE band. descriptive-statistics and
 * sampling use GradeBand.HIGH, matching population-sample's own band from
 * the prior batch (genuinely high-school-level statistics content).
 *
 * With pca, math.opt reaches 16/16 — DOMAIN COMPLETE (the 19th domain this
 * campaign). math.stats reaches 4/40.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const PCA = 'math.opt.pca'
const DESCRIPTIVE_STATISTICS = 'math.stats.descriptive-statistics'
const SAMPLING = 'math.stats.sampling'

export const MATHEMATICS_OPT_PCA_DESCRIPTIVE_STATISTICS_SAMPLING_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: PCA, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'CENTERING IS REQUIRED — NEVER A MINOR PREPROCESSING DETAIL: for '
      + '$(X_{\\text{raw}}=\\{(2,3),(4,7),(6,5),(8,9)\\})$ with mean $(\\mu=(5,6))$: the CENTERED '
      + 'covariance $(\\Sigma=\\frac14X_c^TX_c=[[5,3],[3,5]])$ gives eigenvalues '
      + '$(\\lambda_1=8,\\lambda_2=2)$ and $(\\text{PC}_1=(1/\\sqrt2)[1,1])$. Using the UNCENTERED '
      + 'data instead: $(\\Sigma_{\\text{uncentered}}=\\frac14X_{\\text{raw}}^TX_{\\text{raw}}\\approx'
      + '[[30,41],[41,60]])$, giving a leading eigenvector $(\\approx(0.58,0.82))$ — a completely '
      + 'different direction, biased by the mean itself. Applying PCA to uncentered data is WRONG — '
      + 'variance measures spread around the MEAN, never around the origin; centering is required, '
      + 'never a minor detail that can be skipped.\n\n'
      + 'PRINCIPAL COMPONENTS ARE LINEAR COMBINATIONS OF ALL FEATURES — NEVER SELECTED ORIGINAL '
      + 'FEATURES: for a dataset with height, weight, and BMI: PC1 is NEVER simply "the feature with '
      + 'highest variance" (e.g. BMI) — BMI is itself a nonlinear function of height and weight, and '
      + 'PCA finds LINEAR combinations; PC1\'s actual loadings on all three features are determined '
      + 'by the full covariance structure, never by picking out one column. In the worked example, '
      + '$(\\text{PC}_1=(1/\\sqrt2)[1,1])$ is not column $(x_1)$ or $(x_2)$ — it is the direction 45° '
      + 'between them; the projected score for sample $((-3,-3))$ is $(-3\\sqrt2\\approx-4.24)$, '
      + 'using both features, never equal to either raw feature value.\n\n'
      + 'EXPLAINED VARIANCE RATIO DIVIDES BY THE SUM, NEVER THE MAXIMUM EIGENVALUE: for '
      + '$(\\lambda_1=8)$, $(\\lambda_2=2)$: the total variance is '
      + '$(\\text{trace}(\\Sigma)=\\lambda_1+\\lambda_2=10)$ (the trace is preserved across '
      + 'eigendecomposition). The CORRECT explained variance ratio for PC1 is $(8/10=80\\%)$. '
      + 'Computing $(\\lambda_1/\\lambda_{\\max}=8/8=100\\%)$ instead is WRONG — that formula would '
      + 'absurdly claim the first component ALWAYS explains 100% of variance, meaning no additional '
      + 'components would ever be needed; the denominator must be the sum of ALL eigenvalues, never '
      + 'just the largest one.',
    targetedMisconceptions: [`${PCA}:MC-1`, `${PCA}:MC-2`, `${PCA}:MC-3`],
    source: eb(PCA, 'Core Understanding — centering being required never a minor preprocessing detail, principal components being linear combinations of all features never selected original features, and explained variance ratio dividing by the sum never the maximum eigenvalue'),
  },
  {
    conceptId: DESCRIPTIVE_STATISTICS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'THE MEAN IS PULLED TOWARD OUTLIERS; THE MEDIAN RESISTS THEM: for salaries 40, 42, 45, 48, '
      + '200 (thousands), the mean is 375/5=75 — dramatically pulled up by the single 200 outlier — '
      + 'while the median (sorted middle value) is 45, unaffected by the outlier\'s magnitude since '
      + 'it depends only on rank order. For roughly symmetric data without extreme values, the mean '
      + 'uses all the numerical information and is typically preferred; for skewed or outlier-laden '
      + 'data, the median more accurately reflects where "most" of the data actually sits.\n\n'
      + 'EACH GRAPHICAL DISPLAY IS BUILT FOR A SPECIFIC QUESTION, NEVER INTERCHANGEABLE: a '
      + 'HISTOGRAM shows the distribution SHAPE of a single variable (symmetry, skew, modality); a '
      + 'BOXPLOT displays the five-number summary (min, Q1, median, Q3, max), ideal for comparing '
      + 'spread and center across groups and flagging outliers; a SCATTERPLOT shows the '
      + 'RELATIONSHIP between two variables (one point per observation) — a histogram or boxplot '
      + 'could never reveal a two-variable correlation a scatterplot is specifically designed to '
      + 'show.\n\n'
      + 'DESCRIPTIVE STATISTICS MAKE NO CLAIM BEYOND THE DATA ACTUALLY COLLECTED: reusing the '
      + 'population/sample distinction directly, a survey finding 60% of 50 sampled voters support '
      + 'a proposal is a DESCRIPTIVE fact about THAT sample only. Concluding "60% of ALL city voters '
      + 'support the proposal" is an INFERENTIAL leap — a genuinely different, additional claim '
      + 'requiring inferential machinery (margin of error, confidence intervals) that descriptive '
      + 'statistics alone never establish.',
    targetedMisconceptions: [`${DESCRIPTIVE_STATISTICS}:MC-1`, `${DESCRIPTIVE_STATISTICS}:MC-2`, `${DESCRIPTIVE_STATISTICS}:MC-3`],
    source: eb(DESCRIPTIVE_STATISTICS, 'Core Understanding — the mean being pulled toward outliers while the median resists them, each graphical display being built for a specific question never interchangeable, and descriptive statistics making no claim beyond the data actually collected'),
  },
  {
    conceptId: SAMPLING, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'STRATIFIED SAMPLES WITHIN EVERY GROUP; CLUSTER SAMPLES WHOLE GROUPS: for a population '
      + 'divided into groups, STRATIFIED sampling draws an independent simple random sample WITHIN '
      + 'each stratum — every stratum contributes SOME units, guaranteeing representation across '
      + 'all groups. CLUSTER sampling instead randomly selects WHOLE clusters and includes EVERY '
      + 'unit inside them — only a FEW clusters contribute, but those contribute completely. Both '
      + 'start with "divide into groups," but what happens NEXT is opposite: sample within groups '
      + '(stratified) versus sample between groups (cluster) — a hospital drawing 3 patients from '
      + 'EACH of 8 wards is stratified; randomly selecting 2 of the 8 wards and surveying EVERY '
      + 'patient in them is cluster.\n\n'
      + 'SAMPLE SIZE CONTROLS PRECISION; SAMPLING METHOD CONTROLS WHETHER THE ESTIMATE IS CENTERED '
      + 'CORRECTLY: in 1936, Literary Digest mailed 10 million postcards (drawn from telephone '
      + 'directories and car registrations — systematically excluding poorer voters) and received '
      + '2.4 MILLION responses, predicting the WRONG president; Gallup\'s much smaller (~50,000) '
      + 'genuinely random sample got it right. Every additional biased response is drawn from the '
      + 'SAME flawed frame — a larger biased sample makes the WRONG estimate more PRECISELY wrong, '
      + 'never more correct. Size reduces spread AROUND whatever the method is already centered on; '
      + 'it never corrects a systematically biased center.\n\n'
      + '"RANDOM" IS A CONTROLLED PROCEDURE WITH KNOWN PROBABILITIES, NEVER A SYNONYM FOR '
      + 'HAPHAZARD: directly reusing the probability axioms\' own machinery, "random" means every '
      + 'unit has a KNOWN, pre-specified (typically equal) probability of selection — a controlled '
      + 'procedure, decided BEFORE data collection. "I randomly asked shoppers in the mall parking '
      + 'lot" is NOT a random sample statistically — every uncontrolled feature of who happens to be '
      + 'there creates systematic selection (a CONVENIENCE sample); genuine randomization requires '
      + 'assigning every unit a number and using a controlled draw with known, equal selection '
      + 'probabilities.',
    targetedMisconceptions: [`${SAMPLING}:MC-1`, `${SAMPLING}:MC-2`, `${SAMPLING}:MC-3`],
    source: eb(SAMPLING, 'Core Understanding — stratified sampling within every group versus cluster sampling of whole groups, sample size controlling precision while sampling method controls correct centering, and "random" being a controlled procedure with known probabilities never a synonym for haphazard'),
  },
]

export const MATHEMATICS_OPT_PCA_DESCRIPTIVE_STATISTICS_SAMPLING_PROBES: SeedProbe[] = [
  {
    conceptId: PCA, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does it matter whether you center the data before computing the covariance matrix for PCA?',
    choices: [
      { text: "Yes — for X_raw={(2,3),(4,7),(6,5),(8,9)} with mean (5,6), the CENTERED covariance gives PC1=(1/√2)[1,1], but the UNCENTERED covariance gives a completely different leading eigenvector ≈(0.58,0.82) biased by the mean itself; variance measures spread around the mean, so centering is required, never a minor detail", isCorrect: true },
      { text: "No, it doesn't matter whether the data is centered before computing the covariance matrix for PCA", isCorrect: false, misconceptionId: `${PCA}:MC-2` },
      { text: "Since covariance already accounts for how the data is spread out, centering beforehand is a redundant extra step", isCorrect: false, misconceptionId: `${PCA}:MC-2` },
    ],
    targetedMisconceptions: [`${PCA}:MC-2`],
    source: eb(PCA, 'Discovery Question 1 as a detection probe (verbatim) — whether centering matters before computing the covariance matrix for PCA, an answer of "no" confirming FORGET-CENTRING'),
  },
  {
    conceptId: PCA, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is a principal component the same as one of the original features?',
    choices: [
      { text: "No — for a dataset with height, weight, and BMI, PC1 is never simply \"the feature with highest variance\"; PC1's loadings on all features are determined by the full covariance structure, e.g. PC1=(1/√2)[1,1] is the direction 45° between two features, not either raw column, and the projected score for (-3,-3) is -3√2, using both features", isCorrect: true },
      { text: "Yes, a principal component is simply one of the original features, typically the one with the highest variance", isCorrect: false, misconceptionId: `${PCA}:MC-1` },
      { text: "Since PCA is a dimensionality-reduction technique, it must work by selecting the most informative original column to keep", isCorrect: false, misconceptionId: `${PCA}:MC-1` },
    ],
    targetedMisconceptions: [`${PCA}:MC-1`],
    source: eb(PCA, 'Discovery Question 2 as a detection probe (verbatim) — whether a principal component is the same as one of the original features, an answer of "yes" confirming PCA-SELECTS-FEATURES'),
  },
  {
    conceptId: PCA, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Should you divide an eigenvalue by the largest eigenvalue, or by the sum of all eigenvalues, to get the explained variance ratio?',
    choices: [
      { text: "By the sum of all eigenvalues — for λ1=8, λ2=2, the total variance is trace(Σ)=λ1+λ2=10, so PC1's correct explained variance ratio is 8/10=80%; dividing by the maximum instead (8/8=100%) would absurdly claim the first component always explains all the variance", isCorrect: true },
      { text: "By the largest eigenvalue, since that represents the maximum possible variance any component could explain", isCorrect: false, misconceptionId: `${PCA}:MC-3` },
      { text: "Since the largest eigenvalue corresponds to the most important direction, it makes sense to use it as the normalizing reference for every component's ratio", isCorrect: false, misconceptionId: `${PCA}:MC-3` },
    ],
    targetedMisconceptions: [`${PCA}:MC-3`],
    source: eb(PCA, 'Discovery Question 3 as a detection probe (verbatim) — whether explained variance ratio divides by the largest eigenvalue or the sum of all eigenvalues, an answer of "largest eigenvalue" confirming EIGENVALUE-IS-VARIANCE-TOTAL'),
  },
  {
    conceptId: DESCRIPTIVE_STATISTICS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: "If a dataset has one extreme outlier, is the mean still the best measure of 'typical'?",
    choices: [
      { text: "No — for salaries 40, 42, 45, 48, 200 (thousands), the mean is 375/5=75, dramatically pulled up by the single 200 outlier, while the median (sorted middle value) is 45, unaffected since it depends only on rank order; for outlier-laden data the median more accurately reflects where most of the data sits", isCorrect: true },
      { text: "Yes, the mean is always the best measure of typical value regardless of outliers", isCorrect: false, misconceptionId: `${DESCRIPTIVE_STATISTICS}:MC-1` },
      { text: "Since the mean uses every data point, it should automatically be the more thorough and therefore preferred choice", isCorrect: false, misconceptionId: `${DESCRIPTIVE_STATISTICS}:MC-1` },
    ],
    targetedMisconceptions: [`${DESCRIPTIVE_STATISTICS}:MC-1`],
    source: eb(DESCRIPTIVE_STATISTICS, 'Discovery Question 1 as a detection probe (verbatim) — whether the mean is still the best measure of typical with an extreme outlier present, an answer of "yes" confirming MEAN-DEFAULTED-TO-WITHOUT-CHECKING-OUTLIERS'),
  },
  {
    conceptId: DESCRIPTIVE_STATISTICS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Could a histogram show you whether two variables are related to each other?',
    choices: [
      { text: "No — a histogram shows the distribution SHAPE of a single variable (symmetry, skew, modality); a scatterplot shows the RELATIONSHIP between two variables, one point per observation, which a histogram or boxplot could never reveal", isCorrect: true },
      { text: "Yes, a histogram can show whether two variables are related to each other", isCorrect: false, misconceptionId: `${DESCRIPTIVE_STATISTICS}:MC-3` },
      { text: "Since a histogram displays how data is distributed, it should also reveal any relationship between two different variables in that data", isCorrect: false, misconceptionId: `${DESCRIPTIVE_STATISTICS}:MC-3` },
    ],
    targetedMisconceptions: [`${DESCRIPTIVE_STATISTICS}:MC-3`],
    source: eb(DESCRIPTIVE_STATISTICS, 'Discovery Question 2 as a detection probe (verbatim) — whether a histogram could show a relationship between two variables, an answer of "yes" confirming GRAPHICAL-DISPLAY-TYPE-MISMATCHED-TO-QUESTION'),
  },
  {
    conceptId: DESCRIPTIVE_STATISTICS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'If 60% of your sample supports something, does that automatically mean 60% of the whole population does?',
    choices: [
      { text: "No — a survey finding 60% of 50 sampled voters support a proposal is a DESCRIPTIVE fact about that sample only; concluding \"60% of ALL city voters support it\" is an INFERENTIAL leap requiring additional machinery (margin of error, confidence intervals) descriptive statistics alone never establish", isCorrect: true },
      { text: "Yes, a sample percentage automatically means the whole population shares that exact percentage", isCorrect: false, misconceptionId: `${DESCRIPTIVE_STATISTICS}:MC-2` },
      { text: "Since the sample was measured accurately from real respondents, its result should transfer directly to the full population without qualification", isCorrect: false, misconceptionId: `${DESCRIPTIVE_STATISTICS}:MC-2` },
    ],
    targetedMisconceptions: [`${DESCRIPTIVE_STATISTICS}:MC-2`],
    source: eb(DESCRIPTIVE_STATISTICS, 'Discovery Question 3 as a detection probe (verbatim) — whether a sample percentage automatically means the same percentage holds for the population, an answer of "yes" confirming DESCRIPTIVE-SAMPLE-STATISTIC-GENERALIZED-TO-POPULATION'),
  },
  {
    conceptId: SAMPLING, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does surveying 100,000 self-selected online respondents beat a random sample of 1,000?',
    choices: [
      { text: "No — in 1936, Literary Digest's 2.4 million biased responses (drawn from telephone directories and car registrations) predicted the wrong president, while Gallup's much smaller ~50,000 genuinely random sample got it right; a larger biased sample makes the wrong estimate more precisely wrong, never more correct", isCorrect: true },
      { text: "Yes, a much larger self-selected sample always beats a smaller genuinely random one", isCorrect: false, misconceptionId: `${SAMPLING}:MC-1` },
      { text: "Since 100,000 respondents is a hundred times more data than 1,000, the larger self-selected sample should be considered more reliable", isCorrect: false, misconceptionId: `${SAMPLING}:MC-1` },
    ],
    targetedMisconceptions: [`${SAMPLING}:MC-1`],
    source: eb(SAMPLING, 'Discovery Question 1 as a detection probe (verbatim) — whether a much larger self-selected online sample beats a smaller random one, an answer of "yes" confirming LARGER-SAMPLE-FIXES-BIAS'),
  },
  {
    conceptId: SAMPLING, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'If a population is divided into groups and only some groups are surveyed completely, is that stratified or cluster sampling?',
    choices: [
      { text: "That's cluster sampling — it randomly selects WHOLE clusters and includes EVERY unit inside them, so only a few clusters contribute but completely; stratified sampling instead draws an SRS WITHIN every stratum so every group contributes some units", isCorrect: true },
      { text: "That's stratified sampling — selecting only some groups completely while skipping the rest", isCorrect: false, misconceptionId: `${SAMPLING}:MC-2` },
      { text: "Since both methods start by dividing the population into groups, surveying only some groups completely fits equally well under either label", isCorrect: false, misconceptionId: `${SAMPLING}:MC-2` },
    ],
    targetedMisconceptions: [`${SAMPLING}:MC-2`],
    source: eb(SAMPLING, 'Discovery Question 2 as a detection probe (verbatim) — whether surveying only some groups completely is stratified or cluster sampling, an answer of "stratified" confirming STRATIFIED-CLUSTER-CONFUSION'),
  },
  {
    conceptId: SAMPLING, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is asking whoever happens to be nearby the same as a random sample?',
    choices: [
      { text: "No — \"random\" means every unit has a KNOWN, pre-specified probability of selection, a controlled procedure decided before data collection; \"I randomly asked shoppers in the parking lot\" is a CONVENIENCE sample since who happens to be there creates uncontrolled, unknown selection probabilities", isCorrect: true },
      { text: "Yes, asking whoever happens to be nearby counts as a random sample", isCorrect: false, misconceptionId: `${SAMPLING}:MC-3` },
      { text: "Since the surveyor didn't deliberately choose specific individuals, asking whoever is nearby should qualify as unbiased random selection", isCorrect: false, misconceptionId: `${SAMPLING}:MC-3` },
    ],
    targetedMisconceptions: [`${SAMPLING}:MC-3`],
    source: eb(SAMPLING, 'Discovery Question 3 as a detection probe (verbatim) — whether asking whoever happens to be nearby is the same as a random sample, an answer of "yes" confirming RANDOM-MEANS-HAPHAZARD'),
  },
]
