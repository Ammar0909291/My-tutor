/**
 * MATHEMATICS — probe DEPTH, batch 12: math.stats (40 (concept, band) pairs, 80 probes).
 *
 * Why depth, and the identity rule every probe here obeys, are stated once in
 * mathematicsDepthArithAssets.ts (batch 1): five gradeable probes per pair so a
 * learner recovers from one or two mistakes on questions they have not seen;
 * every probe extends the pair's existing ladder slot at an unused difficulty
 * rung, so no seeded probe is re-identified.
 *
 * Every number below was worked by hand, e.g. (30 − 25)²/25 = 1, the 3 × 4
 * table has (3 − 1)(4 − 1) = 6 degrees of freedom, 80 ± 1.96 · 10/5, the
 * posterior 0.1/(0.1 + 0.08) = 5/9, Var(X₁ + X₂) = 4 + 9 + 2 · 2 = 17,
 * the intercept 20 − 3 · 5 = 5, and the sample variance of 2, 4, 6 = 8/2.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const { HIGH, UNDERGRADUATE: UG } = GradeBand
const { DEVELOPING: D, ADVANCED: A } = ProbeDifficulty

function q(
  conceptId: string, gradeBand: GradeBand, difficulty: ProbeDifficulty,
  stem: string, correct: string, wrong: string[], what: string,
): SeedProbe {
  return {
    conceptId, subjectSlug: S, probeKind: 'mcq', gradeBand, difficulty, stem,
    choices: [{ text: correct, isCorrect: true }, ...wrong.map((text) => ({ text, isCorrect: false }))],
    correctValue: correct,
    targetedMisconceptions: [],
    source: `educational-brain/concepts/mathematics/${conceptId}.md — probe-depth set 2026-10-02: ${what}`,
  }
}

export const MATHEMATICS_DEPTH_STATISTICS_PROBES: SeedProbe[] = [
  q('math.stats.anova', HIGH, D, 'A one-way ANOVA compares 4 groups with 20 observations in total. What are the degrees of freedom (between, within)?', '(3, 16)', ['(4, 20)', '(3, 19)', '(4, 16)'], 'k − 1 and N − k'),
  q('math.stats.anova', HIGH, A, 'MS_Between = 12 and MS_Within = 3. What is the F statistic?', '4', ['36', '1/4', '9'], 'F = MS_Between/MS_Within'),

  q('math.stats.bayesian-inference', HIGH, D, 'H₁ has prior 0.2 and likelihood 0.5; H₂ has prior 0.8 and likelihood 0.1. What is P(H₁ | data)?', '5/9', ['0.5', '0.2', '0.1'], '0.1/(0.1 + 0.08)'),
  q('math.stats.bayesian-inference', HIGH, A, 'As the sample size grows large, what happens to the prior\'s influence on the posterior?', 'It shrinks, and the data dominate', ['It grows', 'It stays the same', 'The posterior becomes the prior'], 'the likelihood sharpens with n'),

  q('math.stats.bias-variance', HIGH, D, 'An estimator has bias 2 and variance 5. What is its MSE?', '9', ['7', '3', '29'], 'MSE = bias² + variance'),
  q('math.stats.bias-variance', HIGH, A, 'Estimator A has bias 0 and variance 10; estimator B has bias 1 and variance 4. Which has the lower MSE?', 'B, with MSE 5', ['A, because it is unbiased', 'They are equal', 'They cannot be compared'], 'A: 10, B: 1 + 4'),

  q('math.stats.chi-squared-test', HIGH, D, 'One cell has observed count 30 and expected count 25. What does it add to the χ² statistic?', '1', ['5', '0.2', '25'], '(O − E)²/E = 25/25'),
  q('math.stats.chi-squared-test', HIGH, A, 'How many degrees of freedom does a χ² independence test on a 3 × 4 table have?', '6', ['12', '11', '7'], '(3 − 1)(4 − 1)'),

  q('math.stats.ci-mean', HIGH, D, 'x̄ = 80, σ = 10 (known) and n = 25. What is the 95% confidence interval for μ?', '80 ± 3.92', ['80 ± 19.6', '80 ± 0.784', '80 ± 1.96'], '1.96 · 10/√25'),
  q('math.stats.ci-mean', HIGH, A, 'To halve the width of a confidence interval for a mean, how must n change?', 'Multiply it by 4', ['Multiply it by 2', 'Halve it', 'Multiply it by √2'], 'the width scales with 1/√n'),

  q('math.stats.ci-proportion', HIGH, D, 'p̂ = 0.2 and n = 100. What is the standard error of p̂?', '0.04', ['0.16', '0.0016', '0.2'], '√(0.2 · 0.8/100)'),
  q('math.stats.ci-proportion', HIGH, A, 'A survey of 400 people gives p̂ = 0.5. What is the approximate 95% margin of error?', 'About 0.049', ['About 0.025', '0.5', 'About 0.0125'], '1.96 · √(0.25/400) = 1.96 · 0.025'),

  q('math.stats.confidence-interval', HIGH, D, 'Which change makes a confidence interval narrower?', 'A larger sample size', ['A higher confidence level', 'A larger population SD', 'A smaller sample size'], 'the margin is z · σ/√n'),
  q('math.stats.confidence-interval', HIGH, A, 'A 95% confidence interval for μ is (12, 18). What are the point estimate and the margin of error?', '15 and 3', ['15 and 6', '12 and 6', '18 and 3'], 'midpoint and half-width'),

  q('math.stats.conjugate-prior', HIGH, D, 'Prior Beta(1, 1); you observe 7 successes and 3 failures. What is the posterior?', 'Beta(8, 4)', ['Beta(7, 3)', 'Beta(8, 11)', 'Beta(1, 1)'], 'add successes to α, failures to β'),
  q('math.stats.conjugate-prior', HIGH, A, 'The Gamma distribution is the conjugate prior for the rate of which likelihood?', 'Poisson', ['Binomial', 'Uniform', 'Bernoulli'], 'Gamma × Poisson stays Gamma'),

  q('math.stats.consistency', HIGH, D, 'Which estimator of μ is consistent?', 'The sample mean X̄ₙ', ['The first observation X₁ alone', 'X̄ₙ + 1', 'The constant 0'], 'X̄ₙ → μ in probability'),
  q('math.stats.consistency', HIGH, A, 'An estimator has bias 1/n and variance 2/n. Is it consistent?', 'Yes, since bias and variance both tend to 0', ['No, since it is biased', 'No, since its variance is never 0', 'Only for even n'], 'MSE → 0 implies consistency'),

  q('math.stats.correlation', HIGH, D, 'Which correlation shows the strongest linear relationship?', 'r = −0.9', ['r = 0.5', 'r = 0.75', 'r = 0.1'], 'strength is |r|; the sign is direction'),
  q('math.stats.correlation', HIGH, A, 'r = 0.8 between X and Y. What fraction of the variance in Y does a linear fit on X explain?', '0.64', ['0.8', '0.4', '0.2'], 'R² = r²'),

  q('math.stats.covariance-matrix', UG, D, 'Var(X) = 4, Var(Y) = 9 and Cov(X, Y) = 2. What is the covariance matrix of (X, Y)?', '[[4, 2], [2, 9]]', ['[[2, 0], [0, 3]]', '[[4, 0], [0, 9]]', '[[4, 2], [−2, 9]]'], 'variances on the diagonal, covariance off it'),
  q('math.stats.covariance-matrix', UG, A, '(X₁, X₂) has covariance matrix [[4, 2], [2, 9]]. What is Var(X₁ + X₂)?', '17', ['13', '15', '21'], '4 + 9 + 2 · 2'),

  q('math.stats.credible-interval', HIGH, D, 'A 95% credible interval for θ is (0.2, 0.5). What does it say?', 'Given the prior and data, θ lies in (0.2, 0.5) with probability 0.95', ['95% of intervals built this way would contain θ', '95% of the data lie in (0.2, 0.5)', 'θ equals 0.35 with probability 0.95'], 'a direct posterior probability statement'),
  q('math.stats.credible-interval', HIGH, A, 'The posterior for θ is N(10, 4). What is the 95% equal-tailed credible interval?', '(6.08, 13.92)', ['(2.16, 17.84)', '(8.04, 11.96)', '(9.02, 10.98)'], 'σ = 2, so 10 ± 1.96 · 2'),

  q('math.stats.data-visualization', HIGH, D, 'Which plot best shows the relationship between two numeric variables?', 'A scatter plot', ['A pie chart', 'A bar chart', 'A histogram'], 'one point per paired observation'),
  q('math.stats.data-visualization', HIGH, A, 'In a boxplot, what does the box span?', 'From Q1 to Q3', ['From the minimum to the maximum', 'The mean ± one SD', 'From the median to the maximum'], 'the middle 50% of the data'),

  q('math.stats.descriptive-statistics', HIGH, D, 'What is the median of 3, 8, 1, 9, 4?', '4', ['1', '5', '8'], 'sorted: 1, 3, 4, 8, 9'),
  q('math.stats.descriptive-statistics', HIGH, A, 'What is the range of 12, 7, 19, 3, 15?', '16', ['19', '12', '15'], 'maximum − minimum'),

  q('math.stats.estimator', HIGH, D, 'Which statistic is an unbiased estimator of the population mean?', 'The sample mean', ['The sample maximum', 'The largest minus the smallest value', 'The sample mean plus 1'], 'E[X̄] = μ'),
  q('math.stats.estimator', HIGH, A, 'Which divisor makes the sample variance an unbiased estimator of σ²?', 'n − 1', ['n', 'n + 1', '√n'], 'Bessel\'s correction'),

  q('math.stats.experimental-design', HIGH, D, 'Why are subjects randomly assigned to treatments?', 'To balance unknown confounders across the groups', ['To increase the sample size', 'To guarantee a significant result', 'So that subjects can choose their group'], 'randomization supports causal claims'),
  q('math.stats.experimental-design', HIGH, A, 'A study tests 3 doses with 2 diets, using every combination. What design is this?', 'A 3 × 2 factorial design with 6 treatments', ['Two separate one-factor experiments', 'A block design with 5 blocks', 'A design with 5 treatments'], 'all level combinations are crossed'),

  q('math.stats.hypothesis-testing', HIGH, D, 'H₀: μ = 50 against H₁: μ ≠ 50 at α = 0.05 gives p = 0.03. What do you conclude?', 'Reject H₀', ['Fail to reject H₀', 'Accept H₀', 'H₁ is proven true'], 'p < α'),
  q('math.stats.hypothesis-testing', HIGH, A, 'H₀: μ = 100 against H₁: μ > 100 gives z = 1.5 at α = 0.05 (critical value 1.645). What is the decision?', 'Fail to reject H₀', ['Reject H₀', 'Accept H₁', 'H₀ is proven true'], '1.5 does not exceed 1.645'),

  q('math.stats.linear-regression', UG, D, 'The fitted line is ŷ = 3 + 2x. What is the predicted y at x = 4?', '11', ['14', '9', '5'], '3 + 8'),
  q('math.stats.linear-regression', UG, A, 'x̄ = 5, ȳ = 20 and the least-squares slope is 3. What is the intercept?', '5', ['15', '20', '−5'], 'the line passes through (x̄, ȳ): 20 − 15'),

  q('math.stats.measures-of-center', HIGH, D, 'What is the mean of 4, 8, 6, 10, 12?', '8', ['6', '10', '40'], '40/5'),
  q('math.stats.measures-of-center', HIGH, A, 'Five values have mean 10. A sixth value, 40, is added. What is the new mean?', '15', ['25', '10', '18'], '(50 + 40)/6'),

  q('math.stats.measures-of-spread', HIGH, D, 'Q1 = 12 and Q3 = 30. What is the IQR?', '18', ['42', '21', '30'], 'Q3 − Q1'),
  q('math.stats.measures-of-spread', HIGH, A, 'What is the sample variance of 2, 4, 6 (divisor n − 1)?', '4', ['8/3', '2', '8'], 'squared deviations 4 + 0 + 4 over 2'),

  q('math.stats.method-of-moments', HIGH, D, 'An Exponential(λ) sample has x̄ = 4. What is the method-of-moments estimate of λ?', '1/4', ['4', '16', '1/16'], 'set 1/λ = x̄'),
  q('math.stats.method-of-moments', HIGH, A, 'A U(0, θ) sample has mean 6. What is the method-of-moments estimate of θ?', '12', ['6', '3', '36'], 'set θ/2 = x̄'),

  q('math.stats.mle', UG, D, 'In 10 coin tosses you see 7 heads. What is the maximum likelihood estimate of p?', '0.7', ['0.5', '7', '0.3'], 'p̂ = successes/trials'),
  q('math.stats.mle', UG, A, 'A Poisson sample is 2, 4, 3, 7. What is the MLE of λ?', '4', ['16', '3.5', '7'], 'the sample mean'),

  q('math.stats.multiple-regression', UG, D, 'ŷ = 2 + 3x₁ − x₂. What is ŷ at x₁ = 4 and x₂ = 5?', '9', ['19', '15', '7'], '2 + 12 − 5'),
  q('math.stats.multiple-regression', UG, A, 'In ŷ = 2 + 3x₁ − x₂, what does the coefficient 3 mean?', 'ŷ rises by 3 per unit of x₁ with x₂ held fixed', ['x₁ explains 3% of the variance', 'ŷ is 3 when x₁ = 1', 'x₁ is three times as important as x₂'], 'a partial effect'),

  q('math.stats.nonparametric', HIGH, D, 'Which test is a nonparametric alternative to the two-sample t-test?', 'The Mann–Whitney U test', ['The paired t-test', 'The chi-squared goodness-of-fit test', 'The z-test'], 'it compares ranks of two independent samples'),
  q('math.stats.nonparametric', HIGH, A, 'What ranks do the values 5, 9, 2, 100 receive?', '2, 3, 1, 4', ['5, 9, 2, 100', '1, 2, 3, 4', '2, 3, 1, 100'], 'the outlier 100 only gets rank 4'),

  q('math.stats.normal-approximation', HIGH, D, 'X ~ Binomial(100, 0.5). Which normal distribution approximates it?', 'N(50, 25)', ['N(50, 50)', 'N(50, 5)', 'N(100, 0.5)'], 'mean np, variance np(1 − p)'),
  q('math.stats.normal-approximation', HIGH, A, 'With the continuity correction, P(X ≤ 45) for a binomial X becomes which normal probability?', 'P(Y ≤ 45.5)', ['P(Y ≤ 44.5)', 'P(Y ≤ 45)', 'P(Y ≤ 46)'], 'include the whole bar at 45'),

  q('math.stats.normal-distribution', HIGH, D, 'Heights are N(170, 10²). About what percent are taller than 190?', '2.5%', ['5%', '95%', '0.15%'], '190 is 2σ above; half of the 5% outside ±2σ'),
  q('math.stats.normal-distribution', HIGH, A, 'Scores are N(60, 8²). Which score has z = −1.5?', '48', ['72', '58.5', '52'], '60 − 1.5 · 8'),

  q('math.stats.p-value', HIGH, D, 'p = 0.004 and α = 0.01. What do you conclude?', 'Reject H₀', ['Fail to reject H₀', 'H₀ has a 0.4% chance of being true', 'The effect must be large'], 'p < α'),
  q('math.stats.p-value', HIGH, A, 'Two studies of the same H₀ report p = 0.04 and p = 0.001. What does the smaller p-value show?', 'Its data are more surprising if H₀ is true', ['Its effect is larger', 'H₀ is 40 times less likely', 'Its study is more important'], 'a p-value measures surprise under H₀'),

  q('math.stats.percentile', HIGH, D, 'In a class of 200, a student scores higher than 150 others. About what percentile is this?', '75th', ['150th', '25th', '50th'], '150/200'),
  q('math.stats.percentile', HIGH, A, 'A dataset has Q1 = 20 and Q3 = 40. What is its 75th percentile?', '40', ['20', '30', '60'], 'Q3 is the 75th percentile'),

  q('math.stats.population-sample', HIGH, D, 'A poll asks 1,000 of 5 million voters. What is the population?', 'All 5 million voters', ['The 1,000 people polled', 'The poll result', 'The candidates'], 'the whole group the question is about'),
  q('math.stats.population-sample', HIGH, A, 'A sample mean x̄ = 52 is used to estimate μ. Which is the parameter and which is the statistic?', 'μ is the parameter; x̄ is the statistic', ['x̄ is the parameter; μ is the statistic', 'Both are statistics', 'Both are parameters'], 'parameters describe populations'),

  q('math.stats.power', HIGH, D, 'Which change increases a test\'s power?', 'A larger sample size', ['A smaller α', 'A smaller true effect', 'More variable data'], 'less sampling noise'),
  q('math.stats.power', HIGH, A, 'A test has power 0.8 at n = 50. What usually happens to its power at n = 200, everything else fixed?', 'It increases', ['It decreases', 'It stays at 0.8', 'It becomes equal to α'], 'the standard error halves'),

  q('math.stats.rao-blackwell', HIGH, D, 'Conditioning an unbiased estimator on a sufficient statistic gives what?', 'An unbiased estimator with variance no larger', ['A biased estimator with smaller variance', 'Always the same estimator', 'An estimator with larger variance'], 'the Rao–Blackwell theorem'),
  q('math.stats.rao-blackwell', HIGH, A, 'For Bernoulli data, start from X₁ to estimate p and condition on T = ΣXᵢ. What estimator results?', 'T/n, the sample proportion', ['X₁', 'T', 'T/(n − 1)'], 'E[X₁ | T] = T/n by symmetry'),

  q('math.stats.sampling-distribution', HIGH, D, 'The population SD is 12 and n = 36. What is the SD of the sampling distribution of x̄?', '2', ['12', '1/3', '6'], '12/√36'),
  q('math.stats.sampling-distribution', HIGH, A, 'The population mean is 40. What is the mean of the sampling distribution of x̄ for n = 25?', '40', ['8', '1.6', '200'], 'x̄ is unbiased'),

  q('math.stats.sampling', HIGH, D, 'From a list of 800 students, every 20th name is taken after a random start. What method is this?', 'Systematic sampling', ['Simple random sampling', 'Stratified sampling', 'Cluster sampling'], 'a fixed step from a random start'),
  q('math.stats.sampling', HIGH, A, 'A school is split by grade and a random sample is drawn from every grade. What method is this?', 'Stratified sampling', ['Cluster sampling', 'Convenience sampling', 'Systematic sampling'], 'sample within every group'),

  q('math.stats.standard-error', HIGH, D, 's = 15 and n = 25. What is the standard error of the mean?', '3', ['0.6', '15', '5'], '15/√25'),
  q('math.stats.standard-error', HIGH, A, 'To cut the standard error to one third, how must n change?', 'Multiply it by 9', ['Multiply it by 3', 'Divide it by 3', 'Multiply it by 6'], 'SE scales with 1/√n'),

  q('math.stats.sufficient-statistic', HIGH, D, 'For i.i.d. Bernoulli(p) data, which statistic is sufficient for p?', 'The number of successes ΣXᵢ', ['The first observation X₁', 'The largest value', 'The order in which successes occurred'], 'the likelihood depends on the data only through ΣXᵢ'),
  q('math.stats.sufficient-statistic', HIGH, A, 'For i.i.d. U(0, θ) data, which statistic is sufficient for θ?', 'The sample maximum', ['The sample mean', 'The sample minimum', 'The sample median'], 'the likelihood is θ⁻ⁿ when θ ≥ max'),

  q('math.stats.t-test', HIGH, D, 'x̄ = 52, μ₀ = 50, s = 4 and n = 16. What is the t statistic?', '2', ['0.5', '8', '4'], '(52 − 50)/(4/4)'),
  q('math.stats.t-test', HIGH, A, 'A one-sample t-test uses n = 16 observations. How many degrees of freedom does it have?', '15', ['16', '14', '4'], 'n − 1'),

  q('math.stats.test-statistic', HIGH, D, 'x̄ = 105, μ₀ = 100, σ = 20 and n = 64. What is z?', '2', ['0.25', '5', '16'], '5/(20/8)'),
  q('math.stats.test-statistic', HIGH, A, 'Under H₀, which distribution is the test statistic for independence in a contingency table compared with?', 'Chi-squared', ['Normal', 't', 'F'], 'the sum of (O − E)²/E'),

  q('math.stats.two-way-anova', HIGH, D, 'Factor A has 3 levels and factor B has 2. How many degrees of freedom does the A × B interaction have?', '2', ['6', '5', '1'], '(3 − 1)(2 − 1)'),
  q('math.stats.two-way-anova', HIGH, A, 'What does a significant interaction in a two-way ANOVA mean?', 'The effect of one factor depends on the level of the other', ['Both main effects are significant', 'The two factors are correlated', 'The design is unbalanced'], 'non-parallel profiles'),

  q('math.stats.type-errors', HIGH, D, 'A drug that does nothing is declared effective. What kind of error is this?', 'A Type I error', ['A Type II error', 'A sampling error', 'No error'], 'rejecting a true H₀'),
  q('math.stats.type-errors', HIGH, A, 'α = 0.05 and H₀ is true in each of 200 independent tests. About how many false rejections are expected?', '10', ['0', '5', '190'], '200 · 0.05'),

  q('math.stats.z-test', HIGH, D, 'For a two-tailed z-test at α = 0.05, which z values lead to rejection?', '|z| > 1.96', ['z > 1.645', '|z| > 1.645', '|z| > 2.58'], '2.5% in each tail'),
  q('math.stats.z-test', HIGH, A, 'A one-tailed z-test (H₁: μ > μ₀) at α = 0.05 gives z = 1.8. What is the decision?', 'Reject H₀, since 1.8 > 1.645', ['Fail to reject H₀, since 1.8 < 1.96', 'Accept H₀', 'The test is inconclusive'], 'one tail uses 1.645'),
]
