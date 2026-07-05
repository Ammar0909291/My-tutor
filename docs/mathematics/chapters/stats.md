# Statistics (math.stats)

**Domain:** Mathematics > Statistics
**Domain ID Prefix:** `math.stats`
**Concept Count:** 40
**Levels:** 3–8

---

## Overview

The mathematical science of collecting, analyzing, interpreting, and presenting data. This chapter covers descriptive statistics, sampling theory, estimation, hypothesis testing, regression, Bayesian inference, and experimental design. Statistics provides the quantitative foundation for scientific reasoning, data science, and evidence-based decision-making across all disciplines.

---

## Concepts Table of Contents

1. [Population and Sample](#math-stats-population-sample) — `math.stats.population-sample`
2. [Descriptive Statistics](#math-stats-descriptive-statistics) — `math.stats.descriptive-statistics`
3. [Measures of Center](#math-stats-measures-of-center) — `math.stats.measures-of-center`
4. [Measures of Spread](#math-stats-measures-of-spread) — `math.stats.measures-of-spread`
5. [Percentile](#math-stats-percentile) — `math.stats.percentile`
6. [Data Visualization](#math-stats-data-visualization) — `math.stats.data-visualization`
7. [Sampling Methods](#math-stats-sampling) — `math.stats.sampling`
8. [Sampling Distribution](#math-stats-sampling-distribution) — `math.stats.sampling-distribution`
9. [Standard Error](#math-stats-standard-error) — `math.stats.standard-error`
10. [Estimator](#math-stats-estimator) — `math.stats.estimator`
11. [Bias-Variance Tradeoff](#math-stats-bias-variance) — `math.stats.bias-variance`
12. [Consistency of Estimators](#math-stats-consistency) — `math.stats.consistency`
13. [Maximum Likelihood Estimation](#math-stats-mle) — `math.stats.mle`
14. [Method of Moments](#math-stats-method-of-moments) — `math.stats.method-of-moments`
15. [Confidence Interval](#math-stats-confidence-interval) — `math.stats.confidence-interval`
16. [Confidence Interval for a Mean](#math-stats-ci-mean) — `math.stats.ci-mean`
17. [Confidence Interval for a Proportion](#math-stats-ci-proportion) — `math.stats.ci-proportion`
18. [Hypothesis Testing](#math-stats-hypothesis-testing) — `math.stats.hypothesis-testing`
19. [Test Statistic](#math-stats-test-statistic) — `math.stats.test-statistic`
20. [p-value](#math-stats-p-value) — `math.stats.p-value`
21. [Type I and Type II Errors](#math-stats-type-errors) — `math.stats.type-errors`
22. [Power of a Test](#math-stats-power) — `math.stats.power`
23. [z-Test](#math-stats-z-test) — `math.stats.z-test`
24. [t-Test](#math-stats-t-test) — `math.stats.t-test`
25. [Chi-Squared Test](#math-stats-chi-squared-test) — `math.stats.chi-squared-test`
26. [Analysis of Variance](#math-stats-anova) — `math.stats.anova`
27. [Two-Way ANOVA](#math-stats-two-way-anova) — `math.stats.two-way-anova`
28. [Sample Correlation](#math-stats-correlation) — `math.stats.correlation`
29. [Simple Linear Regression](#math-stats-linear-regression) — `math.stats.linear-regression`
30. [Multiple Linear Regression](#math-stats-multiple-regression) — `math.stats.multiple-regression`
31. [Covariance Matrix](#math-stats-covariance-matrix) — `math.stats.covariance-matrix`
32. [Normal Distribution (Statistics)](#math-stats-normal-distribution) — `math.stats.normal-distribution`
33. [Normal Approximation](#math-stats-normal-approximation) — `math.stats.normal-approximation`
34. [Nonparametric Tests](#math-stats-nonparametric) — `math.stats.nonparametric`
35. [Bayesian Statistics](#math-stats-bayesian-inference) — `math.stats.bayesian-inference`
36. [Conjugate Prior](#math-stats-conjugate-prior) — `math.stats.conjugate-prior`
37. [Credible Interval](#math-stats-credible-interval) — `math.stats.credible-interval`
38. [Experimental Design](#math-stats-experimental-design) — `math.stats.experimental-design`
39. [Sufficient Statistic](#math-stats-sufficient-statistic) — `math.stats.sufficient-statistic`
40. [Rao-Blackwell Theorem](#math-stats-rao-blackwell) — `math.stats.rao-blackwell`

---

## Population and Sample

**Concept ID:** `math.stats.population-sample`
**Level:** N/A

**Learning Objective:** Students will be able to distinguish a population from a sample, explain why sampling is necessary, identify sources of sampling bias, and use sample statistics to make inferences about population parameters.

**Summary:**

A population is the complete collection of all individuals or observations about which information is sought. A sample is a subset of the population actually observed. Because populations are often too large, expensive, or impractical to observe entirely, statistical inference draws conclusions about the population from the sample. The key distinction is between population parameters (fixed but unknown values — e.g., the true mean μ, true proportion p) and sample statistics (calculated from observed data — e.g., sample mean x̄, sample proportion p̂). A good sample must be representative, unbiased, and of adequate size. Simple random sampling (SRS), where every individual has an equal probability of selection, is the gold standard. Sampling bias — when some groups are systematically over- or under-represented — invalidates inferences.

**Key Ideas:**

- Population = all units of interest (parameter: fixed unknown); sample = observed subset (statistic: computed from data).
- Statistical inference: use sample statistics to estimate or test hypotheses about population parameters.
- Simple random sampling (SRS) ensures every subset of size n has an equal probability of being selected.
- Sampling bias (convenience samples, self-selection, non-response) systematically distorts estimates.
- Sample size n controls precision: larger n → smaller sampling error (by the LLN and CLT).

**Prerequisites:** `math.arith.fractions`

**Unlocks:** `math.stats.descriptive-statistics`, `math.stats.sampling`

**Common Misconceptions:**

- *Misconception:* A larger sample is always representative of the population.
  *Correction:* Size alone does not guarantee representativeness. The famous 1936 Literary Digest poll surveyed 2.4 million people but still predicted the wrong winner because it sampled from telephone directories and car registrations, systematically excluding poorer voters. Sampling method (randomness) matters more than sample size for eliminating bias.
- *Misconception:* The sample mean x̄ IS the population mean μ.
  *Correction:* x̄ is an estimate of μ, not equal to it. Different samples from the same population produce different x̄ values. The sampling distribution of x̄ describes how x̄ varies across repeated samples; only as n→∞ does x̄ → μ almost surely (Law of Large Numbers).
- *Misconception:* Parameters and statistics are the same thing.
  *Correction:* Parameters (μ, σ, p) are fixed, true values of the population — unknown in practice. Statistics (x̄, s, p̂) are calculated from sample data — observable but variable across samples. Statistics estimate parameters; they are not identical to them.

**Real-World Applications:**

- Clinical trials: a sample of patients is enrolled (ethical and practical constraint); trial results are used to infer treatment effects for the whole patient population with a given disease.
- Quality control: manufacturers test a sample of items from each production batch, using sample defect rates to infer the batch (population) defect rate and decide whether to accept or reject the batch.

---

## Descriptive Statistics

**Concept ID:** `math.stats.descriptive-statistics`
**Level:** N/A

**Learning Objective:** Students will be able to organize and summarize data using measures of center, spread, and shape, construct and interpret histograms, boxplots, and frequency distributions, and describe the distribution of a dataset.

**Summary:**

Descriptive statistics summarize and describe a dataset without making inferences beyond the observed data. Core summaries include: (1) Measures of center — mean, median, mode. (2) Measures of spread — range, IQR, variance, standard deviation. (3) Shape — skewness (positive/negative/symmetric) and kurtosis (heaviness of tails). (4) Graphical displays — histograms (shape), boxplots (center, spread, outliers), stem-and-leaf plots, bar charts, scatter plots. A histogram shows the empirical distribution; a boxplot shows Q1, median, Q3, and whiskers at 1.5×IQR. The five-number summary (min, Q1, median, Q3, max) efficiently characterizes a distribution. Descriptive statistics form the essential first step of any data analysis — before modeling, before inference.

**Key Ideas:**

- Center: mean (sensitive to outliers), median (robust), mode (most frequent value).
- Spread: range (max−min), IQR = Q3−Q1 (robust), variance s² = Σ(xᵢ−x̄)²/(n−1), SD = √s².
- Shape: skewness — positive (right tail longer, mean > median), negative (left tail longer, mean < median).
- Five-number summary: {min, Q1, median, Q3, max} → boxplot.
- Outlier rule: a value is a suspected outlier if it falls below Q1−1.5·IQR or above Q3+1.5·IQR.

**Prerequisites:** `math.stats.population-sample`

**Unlocks:** `math.stats.sampling`

**Common Misconceptions:**

- *Misconception:* The mean is always the best measure of center.
  *Correction:* The mean is optimal for symmetric distributions without outliers. For skewed distributions or data with extreme outliers, the median is more representative. For example, household income distributions are strongly right-skewed: the mean income exceeds the median income because a small number of extremely high earners pull the mean upward.
- *Misconception:* A larger standard deviation means the data is 'bad' or wrong.
  *Correction:* Standard deviation measures variability, not quality. High variability is neither good nor bad — it depends on context. A manufacturing process with high SD is problematic; a diverse exam score distribution with high SD might reflect a healthy range of student abilities. SD is a descriptive measure, not a quality judgment.

**Real-World Applications:**

- Sports analytics: team stats (mean points per game, median salary, win-rate distributions) are descriptive summaries that guide coaching decisions and player evaluation.
- Public health: epidemiologists describe disease distributions (incidence rates, age distributions, geographic spread) using histograms and summary statistics before building predictive models.

---

## Measures of Center

**Concept ID:** `math.stats.measures-of-center`
**Level:** N/A

**Learning Objective:** Students will be able to compute the mean, median, and mode of a dataset, choose the appropriate measure of center based on distribution shape and the presence of outliers, and interpret each measure in context.

**Summary:**

Measures of center describe the 'typical' or 'central' value of a distribution. The three standard measures are: (1) Mean (arithmetic average): x̄ = (Σxᵢ)/n. Sensitive to outliers; optimal for symmetric distributions. (2) Median: the middle value when data is sorted; robust to outliers; better for skewed data. For even n: average of the two middle values. (3) Mode: the most frequently occurring value; most relevant for categorical data or clearly multimodal distributions. For the population: μ (mean), M (median), Mo (mode). Key relationships: in symmetric distributions, mean ≈ median ≈ mode. In right-skewed distributions: mode < median < mean. In left-skewed distributions: mean < median < mode. The geometric mean (for positive quantities) and harmonic mean (for rates) are specialized alternatives for particular contexts.

**Key Ideas:**

- Mean x̄ = Σxᵢ/n: balances deviations; minimizes the sum of squared deviations Σ(xᵢ−c)².
- Median: minimizes the sum of absolute deviations Σ|xᵢ−c|; robust to extreme values.
- Mode: most frequent value; not unique (bimodal/multimodal possible); always appropriate for nominal data.
- Shape-center relationship: right-skewed → mean > median; left-skewed → mean < median.
- Geometric mean of n positive values: (x₁·x₂·…·xₙ)^{1/n} — use for growth rates and ratios.

**Prerequisites:** `math.stats.descriptive-statistics`, `math.arith.fractions`

**Common Misconceptions:**

- *Misconception:* The median is always the middle data value.
  *Correction:* The median is the middle value of sorted data. For even n, there is no single middle value — the median is the average of the two middle values. For odd n=11, the median is the 6th sorted value. Students often forget to sort first or use the wrong formula for even n.
- *Misconception:* Every dataset has a unique mode.
  *Correction:* A dataset can have no mode (all values appear equally often), one mode, or multiple modes (bimodal, trimodal). Some statisticians say mode is undefined when no value repeats. Modes are most useful for categorical data or clearly clustered distributions.

**Real-World Applications:**

- Real estate: property markets report median home prices (not mean) because the distribution is right-skewed — a few luxury homes would inflate the mean and misrepresent what a typical buyer pays.
- Academic reporting: standardized test score reports use mean scores for symmetric distributions; if scores are skewed, median better represents a typical student's performance.

---

## Measures of Spread

**Concept ID:** `math.stats.measures-of-spread`
**Level:** N/A

**Learning Objective:** Students will be able to compute the range, IQR, sample variance, and standard deviation of a dataset, explain the conceptual difference between population and sample variance, and choose appropriate spread measures based on distribution shape.

**Summary:**

Measures of spread (dispersion) quantify how much data values vary around the center. Key measures: (1) Range = max − min: simple but highly sensitive to outliers. (2) Interquartile Range (IQR) = Q3 − Q1: the spread of the middle 50% of data; robust to outliers. (3) Sample variance: s² = Σ(xᵢ−x̄)²/(n−1). The division by (n−1) instead of n makes s² an unbiased estimator of σ². (4) Standard deviation: s = √s². Same units as the data; most interpretable spread measure. (5) Population variance σ² = Σ(xᵢ−μ)²/N (when all N population values are known). The Bessel correction (n−1 vs. n) arises because x̄ uses the data, slightly underestimating deviations when divided by n.

**Key Ideas:**

- Range = max − min: simple, not robust. IQR = Q3 − Q1: robust measure of middle-50% spread.
- Sample variance s² = Σ(xᵢ−x̄)²/(n−1): Bessel correction makes it unbiased for σ².
- Standard deviation s = √s²: in the same units as the data; most interpretable.
- Rule of thumb: for bell-shaped distributions, ≈68% of data within x̄±s, ≈95% within x̄±2s (empirical rule).
- Coefficient of variation CV = (s/x̄)×100%: dimensionless relative dispersion — useful for comparing spreads across different units/scales.

**Prerequisites:** `math.stats.descriptive-statistics`

**Cross-links:** `math.prob.variance`

**Common Misconceptions:**

- *Misconception:* Sample variance uses n in the denominator (like population variance).
  *Correction:* Sample variance uses (n−1) in the denominator (Bessel's correction). Using n produces a biased estimate of σ² — it systematically underestimates the true population variance. Dividing by (n−1) corrects this: E[s²] = σ². Intuitively, x̄ is computed from the same data, consuming one degree of freedom.
- *Misconception:* Variance and standard deviation are interchangeable — they measure the same thing on the same scale.
  *Correction:* Variance is in squared units; standard deviation is in the original units. If data is in kg, variance is in kg² (uninterpretable as a raw spread) while SD is in kg (directly comparable to data values). Always report SD for interpretability; variance is primarily used in mathematical derivations and ANOVA.

**Real-World Applications:**

- Finance: portfolio standard deviation measures investment risk — the volatility of returns. Modern portfolio theory (Markowitz) uses variances and covariances to optimize the risk-return tradeoff.
- Manufacturing: process capability indices (Cpk) compare the SD of a manufacturing process to engineering tolerances, quantifying how reliably a process stays within specifications.

---

## Percentile

**Concept ID:** `math.stats.percentile`
**Level:** N/A

**Learning Objective:** Students will be able to define and compute percentiles and quartiles, interpret a value's percentile rank, and construct a boxplot from the five-number summary.

**Summary:**

The p-th percentile of a dataset is the value below which p% of observations fall. Quartiles divide sorted data into four equal parts: Q1 (25th percentile), Q2 (50th percentile = median), Q3 (75th percentile). The IQR = Q3−Q1 spans the middle 50%. The five-number summary {min, Q1, median, Q3, max} is the complete description of a distribution's spread captured by a boxplot. Percentile interpretation: if a student scores at the 90th percentile, 90% of students scored below that score. Percentile computation methods vary (there are at least 9 conventions); the most common for small datasets: L = (p/100)·n; if L is an integer, average the Lth and (L+1)th values; otherwise round up to ⌈L⌉th value.

**Key Ideas:**

- p-th percentile: value below which p% of data falls (or approximately so, with edge-case conventions).
- Quartiles: Q1=P₂₅, Q2=P₅₀ (median), Q3=P₇₅. IQR=Q3−Q1.
- Outlier criterion: < Q1−1.5·IQR or > Q3+1.5·IQR (Tukey fences).
- Five-number summary → boxplot: box from Q1 to Q3 with median line; whiskers to min/max within fences.
- Percentile rank: the percentile rank of value x = (number of values ≤ x)/n × 100.

**Prerequisites:** `math.stats.measures-of-spread`

**Cross-links:** `math.prob.quantile`

**Common Misconceptions:**

- *Misconception:* The 50th percentile is always the average of the two middle values.
  *Correction:* The 50th percentile is the median: the average of the two middle values when n is even; the single middle value when n is odd. More generally, the p-th percentile computation depends on whether L = (p/100)·n is a whole number. Different software (R, Excel, NumPy) uses slightly different interpolation conventions.
- *Misconception:* Being in the 75th percentile means you scored 75% on the test.
  *Correction:* The 75th percentile (Q3) means 75% of test-takers scored below you — it's a relative standing, not an absolute score. A student at the 75th percentile might have scored 82 points out of 100 (or any other raw score), depending on the distribution of scores.

**Real-World Applications:**

- Pediatric growth charts: a child's height/weight at the 95th percentile means they are taller/heavier than 95% of children of the same age — used by doctors to monitor healthy development.
- Standardized testing: SAT, GRE, and IQ scores are reported alongside percentile ranks so test-takers know their relative standing in the test-taking population.

---

## Data Visualization

**Concept ID:** `math.stats.data-visualization`
**Level:** N/A

**Learning Objective:** Students will be able to select, construct, and interpret appropriate statistical graphics for different data types and questions, including histograms, boxplots, scatterplots, bar charts, and QQ-plots.

**Summary:**

Data visualization translates raw data into visual representations that reveal patterns, distributions, relationships, and anomalies that numerical summaries alone cannot capture. Key chart types by purpose: (1) Distribution of one quantitative variable: histogram, density plot, boxplot, stem-and-leaf. (2) Comparison across groups: side-by-side boxplots, bar charts (for counts/means per group). (3) Relationship between two quantitative variables: scatterplot (with or without a regression line). (4) Normality assessment: QQ-plot (quantile-quantile plot) — if data is normal, the QQ-plot shows points near the diagonal reference line. (5) Time series: line graphs. Principles of good visualization: label axes, title clearly, choose scales that don't distort, avoid chart junk, match chart type to data type.

**Key Ideas:**

- Histogram: bins quantitative data into intervals; shows distribution shape, center, spread, and modes.
- Boxplot: shows Q1, median, Q3, and outliers; ideal for comparing distributions across groups.
- Scatterplot: visualizes the relationship between two quantitative variables; reveals correlation and outliers.
- QQ-plot: plots sample quantiles vs. theoretical quantiles; deviations from the line indicate non-normality.
- Bar chart: for categorical data (counts or proportions); NOT a histogram (no continuous axis).

**Prerequisites:** `math.stats.descriptive-statistics`

**Common Misconceptions:**

- *Misconception:* A histogram and a bar chart are the same thing.
  *Correction:* Histograms display distributions of quantitative (continuous) data — bars touch because data is continuous. Bar charts display counts or proportions for categorical (discrete) data — bars are separated. Confusing them can lead to treating categorical data as continuous or vice versa.
- *Misconception:* A taller bar in a histogram means that specific value is more common.
  *Correction:* In a histogram, bar height represents the frequency (or density) of values in that bin (interval), not a specific value. The bar from 60 to 70 captures all values in that range. To find the probability for a specific value in a continuous distribution, you integrate the density, not read a bar height.

**Real-World Applications:**

- Business analytics: dashboards using bar charts, line plots, and scatter plots summarize KPIs for executives, enabling quick pattern recognition without numerical tables.
- Medical research: QQ-plots and histograms of residuals in clinical trial models verify statistical assumptions (normality, homoscedasticity) before reporting results.

---

## Sampling Methods

**Concept ID:** `math.stats.sampling`
**Level:** N/A

**Learning Objective:** Students will be able to describe and distinguish common probability sampling methods (SRS, stratified, cluster, systematic), explain sources of sampling bias, and design a sampling scheme appropriate for a given study.

**Summary:**

Probability sampling methods ensure every unit has a known, positive probability of selection, enabling valid statistical inference. The main methods are: (1) Simple Random Sample (SRS): every unit has equal probability 1/N; gold standard. (2) Stratified random sampling: divide population into homogeneous strata, then apply SRS within each stratum — increases precision when strata differ. (3) Cluster sampling: divide population into clusters (often geographic), randomly select clusters, observe all units in selected clusters — cheaper but less precise than SRS. (4) Systematic sampling: select every k-th unit from a list after a random start — simple and periodic, but can introduce periodicity bias. Non-probability sampling (convenience, voluntary response, snowball) sacrifices representativeness for practicality; results cannot be validly generalized.

**Key Ideas:**

- Probability sampling: every unit has a known positive probability of selection → unbiased inference possible.
- SRS: each unit equally likely; each sample of size n equally likely. Estimate: x̄ estimates μ.
- Stratified: sample within each stratum — minimizes between-strata variance, maximizes within-stratum precision.
- Cluster: sample groups; observe all units in selected groups — cost-effective for geographically spread populations.
- Sampling error: variability due to chance (reducible by increasing n). Nonsampling error: bias due to bad design (not reduced by larger n).

**Prerequisites:** `math.stats.population-sample`, `math.prob.probability-axioms`

**Unlocks:** `math.stats.sampling-distribution`

**Common Misconceptions:**

- *Misconception:* A census (surveying everyone) eliminates all error in estimates.
  *Correction:* A census eliminates sampling error (variability due to chance selection) but not nonsampling error (measurement errors, non-response, data entry mistakes). In practice, large censuses often have more total error than well-designed probability samples because more data amplifies systematic errors.
- *Misconception:* Stratified sampling is just cluster sampling by another name.
  *Correction:* These are opposite approaches. In stratified sampling, you sample from every stratum (divide, then sample within each group). In cluster sampling, you sample some clusters and observe all units within them (divide, then select entire groups). Stratification increases precision; clustering trades precision for cost savings.

**Real-World Applications:**

- National polls: polling organizations use stratified random sampling (by region, age, political affiliation) to ensure demographic representativeness and improve election forecast accuracy.
- Agricultural surveys: cluster sampling (selecting fields at random, then surveying all plots in those fields) provides cost-efficient crop yield estimates for large geographic areas.

---

## Sampling Distribution

**Concept ID:** `math.stats.sampling-distribution`
**Level:** N/A

**Learning Objective:** Students will be able to define the sampling distribution of a statistic, derive the mean and variance of the sampling distribution of x̄, and explain why the sampling distribution is central to statistical inference.

**Summary:**

The sampling distribution of a statistic is the probability distribution of that statistic computed from all possible samples of size n from the population. For the sample mean x̄ from a population with mean μ and variance σ²: E[x̄] = μ (unbiased), Var(x̄) = σ²/n (variance decreases with n), and SD(x̄) = σ/√n (the standard error). By the Central Limit Theorem, x̄ is approximately N(μ, σ²/n) for large n regardless of the population distribution. The sampling distribution is NOT the distribution of the data — it is the distribution of the statistic x̄ itself, imagined over infinitely many repeated samples. This distribution forms the theoretical basis for confidence intervals and hypothesis tests.

**Key Ideas:**

- Sampling distribution: distribution of a statistic (e.g., x̄) over all possible samples of size n.
- For x̄: E[x̄] = μ (unbiased); Var(x̄) = σ²/n; SE(x̄) = σ/√n.
- CLT: x̄ ≈ N(μ, σ²/n) for large n, regardless of population shape.
- If population is normal, x̄ ~ N(μ, σ²/n) exactly for any n.
- Increasing n narrows the sampling distribution (reduces SE) → more precise estimates.

**Prerequisites:** `math.stats.sampling`, `math.prob.random-variable`, `math.prob.clt`

**Unlocks:** `math.stats.standard-error`

**Common Misconceptions:**

- *Misconception:* The sampling distribution describes how individual observations are distributed.
  *Correction:* The sampling distribution describes how the statistic (e.g., x̄) varies across repeated samples of size n — not how individual data points vary. The population distribution describes individual observations; the sampling distribution describes summary statistics computed from samples. These are very different objects.
- *Misconception:* Variance of x̄ is σ² (same as variance of individual observations).
  *Correction:* Var(x̄) = σ²/n, not σ². Averaging n i.i.d. values reduces the variance by a factor of 1/n. This is why larger samples give more precise estimates — the sampling distribution becomes more concentrated around μ as n increases.

**Real-World Applications:**

- Quality assurance: control charts (Shewhart charts) use the sampling distribution of x̄ — a process is 'in control' if x̄ stays within μ ± 3σ/√n; points outside trigger investigation.
- Clinical trials: power analysis determines the required sample size n so that the sampling distribution of the test statistic is sharp enough to detect a clinically meaningful effect.

---

## Standard Error

**Concept ID:** `math.stats.standard-error`
**Level:** N/A

**Learning Objective:** Students will be able to define the standard error of a statistic, compute the SE of the sample mean and sample proportion, distinguish SE from standard deviation, and explain how SE is used to quantify estimation precision.

**Summary:**

The standard error (SE) of a statistic is the standard deviation of its sampling distribution — it measures how much the statistic varies across repeated samples. For the sample mean: SE(x̄) = σ/√n (known σ) or s/√n (estimated from data). For the sample proportion: SE(p̂) = √(p(1−p)/n) (estimated as √(p̂(1−p̂)/n)). Key properties: SE decreases as n increases (larger samples → more precise estimates); SE is not the same as the population SD σ — σ measures variability of individual observations, while SE measures variability of the statistic. The SE is used to construct confidence intervals (x̄ ± z·SE) and compute test statistics (z = (x̄−μ₀)/SE).

**Key Ideas:**

- SE(x̄) = σ/√n: decreases with √n — doubling precision requires 4× the sample size.
- Estimated SE (using s): SE(x̄) = s/√n — used in practice when σ is unknown.
- SE(p̂) = √(p̂(1−p̂)/n): SE of the sample proportion.
- SE ≠ SD: SD measures individual-observation variability; SE measures statistic variability across samples.
- Margin of error = z* × SE (for large n, z*=1.96 for 95% confidence).

**Prerequisites:** `math.stats.sampling-distribution`

**Common Misconceptions:**

- *Misconception:* SE and SD are both measures of data spread and can be used interchangeably.
  *Correction:* SD (standard deviation) measures how spread out individual data values are around the mean — a property of the data. SE measures how much the sample mean varies from sample to sample — a property of the estimator. SE = SD/√n, so SE is always smaller than SD (for n>1). Using SD when SE is required (or vice versa) leads to grossly incorrect confidence intervals and test results.
- *Misconception:* The SE equals zero when n equals the population size N.
  *Correction:* When n=N (a census), there is no sampling variability — every sample gives the same x̄ = μ, so SE should be 0. The formula SE=σ/√n ignores the finite population correction factor (FPC) = √((N−n)/(N−1)). For large populations (N>>n), FPC≈1. For a census (n=N), FPC=0, making SE=0 correctly.

**Real-World Applications:**

- Opinion polling: the margin of error = 1.96·SE(p̂) ≈ 1/√n for proportions near 0.5; for n=1000, ME ≈ ±3.1%, which is reported as 'margin of error ±3 percentage points.'
- Clinical research: the standard error of the treatment effect estimate determines the width of confidence intervals and the power of the trial — SE drives sample size calculations.

---

## Estimator

**Concept ID:** `math.stats.estimator`
**Level:** N/A

**Learning Objective:** Students will be able to define an estimator as a function of sample data, evaluate estimators using properties of unbiasedness, efficiency, and consistency, and explain the mean squared error (MSE) as a unified quality criterion.

**Summary:**

An estimator is a function of sample data used to estimate a population parameter θ. If θ̂ = g(X₁,…,Xₙ) is the estimator, then θ̂ computed from a specific sample is an estimate. Desirable properties: (1) Unbiasedness: E[θ̂] = θ — the estimator hits the parameter on average. (2) Efficiency: among all unbiased estimators, the one with minimum variance (smallest MSE). (3) Consistency: θ̂ converges to θ in probability as n→∞ (asymptotic correctness). (4) Sufficiency: θ̂ uses all information in the sample relevant to θ. The Mean Squared Error (MSE) unifies bias and variance: MSE(θ̂) = Var(θ̂) + [Bias(θ̂)]² = E[(θ̂−θ)²]. The Cramér-Rao lower bound gives the minimum variance any unbiased estimator can achieve: Var(θ̂) ≥ 1/I(θ) where I(θ) is the Fisher information.

**Key Ideas:**

- Estimator: random variable θ̂ = g(X₁,…,Xₙ); estimate: specific numerical value from observed data.
- Unbiasedness: Bias(θ̂) = E[θ̂] − θ = 0. Example: x̄ is unbiased for μ; s² is unbiased for σ².
- MSE(θ̂) = Var(θ̂) + [Bias(θ̂)]² — bias-variance tradeoff at the estimator level.
- Consistency: P(|θ̂ₙ − θ| > ε) → 0 for all ε > 0 as n → ∞.
- Cramér-Rao bound: Var(θ̂) ≥ 1/I(θ) for unbiased estimators — UMVUE achieves this bound.

**Prerequisites:** `math.stats.sampling-distribution`, `math.prob.expected-value`

**Common Misconceptions:**

- *Misconception:* An unbiased estimator is always better than a biased one.
  *Correction:* Unbiasedness alone does not guarantee a good estimator. A biased estimator with low variance can have a smaller MSE than an unbiased estimator with high variance. In practice, regularization methods (ridge regression, LASSO) deliberately introduce bias to reduce variance and achieve better prediction accuracy — the bias-variance tradeoff.
- *Misconception:* s² = Σ(xᵢ−x̄)²/n is an unbiased estimator of σ².
  *Correction:* Dividing by n gives E[s²_biased] = (n−1)/n·σ² ≠ σ². The unbiased sample variance requires dividing by (n−1): E[s²] = σ². The biased version underestimates σ² by a factor of (n−1)/n — the Bessel correction fixes this.

**Real-World Applications:**

- Radar tracking: a radar system estimates an aircraft's position from noisy measurements. Kalman filtering minimizes MSE by optimally trading off bias (systematic model error) and variance (measurement noise).
- A/B testing: treatment effect estimators in randomized experiments are required to be unbiased to ensure that the test conclusion applies to the broader population.

---

## Bias-Variance Tradeoff

**Concept ID:** `math.stats.bias-variance`
**Level:** N/A

**Learning Objective:** Decompose estimator mean squared error into bias squared and variance components, and understand the bias-variance tradeoff in model selection.

**Summary:**

The bias-variance tradeoff is a fundamental principle in statistical estimation and machine learning. Bias measures systematic error—how far the estimator's expected value is from the true parameter. Variance measures how much the estimator fluctuates across different samples. Mean squared error (MSE) = Bias² + Variance. Reducing bias often increases variance and vice versa. Complex models have low bias but high variance (overfitting); simple models have high bias but low variance (underfitting). The optimal model minimizes total MSE, not just one component.

**Key Ideas:**

- MSE decomposes as MSE(θ̂) = [Bias(θ̂)]² + Var(θ̂), so bias and variance both contribute to error.
- An unbiased estimator has zero bias but may have high variance; biased estimators can have lower MSE if variance is sufficiently reduced.
- Regularization (ridge, lasso) introduces bias to reduce variance, often lowering total MSE on new data.
- The optimal estimator minimizes MSE, not variance alone — sometimes accepting bias is statistically rational.

**Prerequisites:** `math.stats.estimator`

**Common Misconceptions:**

- *Misconception:* Unbiased estimators are always better than biased estimators.
  *Correction:* An unbiased estimator with very high variance can have larger MSE than a slightly biased estimator with much lower variance. The James-Stein estimator beats the sample mean in MSE for multivariate normal estimation precisely by introducing bias.
- *Misconception:* Bias only matters for small samples; with large n, bias disappears.
  *Correction:* Fixed bias does not shrink with sample size. If an estimator has constant bias b, its MSE approaches b² as n→∞ even if variance→0. Only consistent estimators eliminate bias asymptotically.

**Real-World Applications:**

- Ridge regression regularization introduces bias to reduce variance, preventing overfitting in high-dimensional genomics or finance data.
- Insurance actuaries use credibility theory (Bühlmann estimator) which blends individual and group estimates—accepting bias for reduced variance in rare-event pricing.

---

## Consistency of Estimators

**Concept ID:** `math.stats.consistency`
**Level:** N/A

**Learning Objective:** Define consistency of an estimator, distinguish weak from strong consistency, and verify consistency using the law of large numbers and continuous mapping theorem.

**Summary:**

An estimator θ̂_n is consistent if it converges in probability to the true parameter θ as sample size n→∞. Formally, for every ε>0, P(|θ̂_n - θ| > ε) → 0 as n→∞. This is 'weak consistency.' Strong consistency means almost sure convergence. A sufficient condition for weak consistency: Bias(θ̂_n)→0 and Var(θ̂_n)→0 as n→∞ (follows from Chebyshev's inequality). Consistency is a minimum requirement for any estimator—inconsistent estimators do not improve with more data. The sample mean, sample variance (both versions), MLE under regularity, and method-of-moments estimators are typically consistent.

**Key Ideas:**

- Consistency means the estimator 'homes in' on the true parameter as n→∞; it is an asymptotic property, not a finite-sample guarantee.
- A sufficient condition via Chebyshev: if E[θ̂_n]→θ (asymptotic unbiasedness) and Var(θ̂_n)→0, then θ̂_n →_p θ.
- The continuous mapping theorem: if θ̂_n →_p θ, then g(θ̂_n) →_p g(θ) for any continuous function g—so plug-in estimators of continuous functions are consistent.
- Consistency does not imply unbiasedness (and vice versa); the biased MLE of variance σ̂²_MLE=S²_n/n is still consistent.

**Prerequisites:** `math.stats.estimator`, `math.prob.convergence-types`

**Common Misconceptions:**

- *Misconception:* A consistent estimator must be unbiased.
  *Correction:* Consistency and unbiasedness are independent properties. The MLE for σ² is biased (uses n in denominator, not n-1) but is consistent—its bias vanishes as n→∞.
- *Misconception:* If an estimator is consistent, it must be good for any sample size.
  *Correction:* Consistency only guarantees good behavior asymptotically. A consistent estimator may perform poorly for small n; finite-sample properties (bias, variance, MSE) must also be evaluated.

**Real-World Applications:**

- Clinical trials grow sample size to ensure consistent estimation of treatment effects—regulatory agencies require asymptotic validity of test statistics.
- Monte Carlo simulation: averaging more replications gives a consistent estimate of the quantity of interest, motivating large simulation runs in financial risk modeling.

---

## Maximum Likelihood Estimation

**Concept ID:** `math.stats.mle`
**Level:** N/A

**Learning Objective:** Derive maximum likelihood estimators by maximizing the likelihood or log-likelihood function, and state the asymptotic properties of MLE including consistency, efficiency, and asymptotic normality.

**Summary:**

Maximum likelihood estimation (MLE) chooses the parameter value that makes the observed data most probable. Given iid data X₁,...,Xₙ from distribution with pdf/pmf f(x;θ), the likelihood is L(θ) = ∏f(Xᵢ;θ) and the MLE is θ̂_MLE = argmax L(θ). In practice, maximize the log-likelihood ℓ(θ) = Σlog f(Xᵢ;θ) (same maximizer, easier calculus). Under regularity conditions, MLE is consistent, asymptotically normal (θ̂_MLE ~ᵃ N(θ, I(θ)⁻¹/n)), and asymptotically efficient (achieves Cramér-Rao lower bound asymptotically). MLE is equivariant: if θ̂ is MLE of θ, then g(θ̂) is MLE of g(θ) for any function g.

**Key Ideas:**

- Maximize log-likelihood ℓ(θ)=Σlog f(Xᵢ;θ)—equivalent to maximizing L(θ) since log is monotone—by setting ℓ'(θ)=0 (score equation).
- MLE is asymptotically efficient: it achieves the Cramér-Rao lower bound I(θ)⁻¹ asymptotically, meaning no other consistent estimator can have lower asymptotic variance.
- MLE is equivariant (invariant under reparameterization): the MLE of g(θ) is g(θ̂_MLE) for any function g, making MLE very practical.
- For exponential family distributions, the score equation reduces to matching sufficient statistics, often yielding closed-form MLEs.

**Prerequisites:** `math.stats.estimator`, `math.calc.derivative-rules`, `math.prob.pdf`

**Common Misconceptions:**

- *Misconception:* MLE always has an analytical closed-form solution.
  *Correction:* Many MLEs require numerical optimization. Mixture models, survival models (Weibull), and logistic regression all require iterative algorithms (EM, Newton-Raphson) because the score equation has no closed-form solution.
- *Misconception:* MLE is the best estimator because it is unbiased.
  *Correction:* MLE is often biased for finite samples. The MLE for normal variance σ² uses n in denominator (not n-1), yielding a biased estimate. MLE is asymptotically unbiased and efficient, not necessarily finite-sample unbiased.

**Real-World Applications:**

- Logistic regression coefficients in medical studies (disease risk factors, drug efficacy) are fit by MLE—the industry standard for binary outcome models.
- Reliability engineering uses MLE to fit Weibull failure-time distributions from censored test data, informing warranty and maintenance schedules.

---

## Method of Moments

**Concept ID:** `math.stats.method-of-moments`
**Level:** N/A

**Learning Objective:** Apply the method of moments to derive estimators by equating population and sample moments, and understand when method of moments and MLE coincide.

**Summary:**

The method of moments (MOM) estimates k parameters by equating the first k population moments (μ'_j = E[X^j]) to the corresponding sample moments (m'_j = (1/n)ΣXᵢ^j) and solving the resulting system. For a single parameter θ: set E[X] = X̄ and solve for θ. MOM estimators are simple, always produce closed-form estimates (for standard distributions), and are consistent. However, they may be inefficient (higher variance than MLE) and occasionally produce out-of-range estimates. MOM and MLE coincide for exponential family distributions when natural sufficient statistics are used. MOM is often used to find good starting values for numerical MLE.

**Key Ideas:**

- MOM equates E[Xʲ] (population moments, functions of θ) to (1/n)ΣXᵢʲ (sample moments) for j=1,...,k parameters.
- MOM is always consistent: sample moments converge to population moments by LLN, and if the map from moments to parameters is continuous, the delta method gives consistency.
- MOM may be inefficient: for the Gamma distribution, MOM estimators have larger asymptotic variance than MLE estimators.
- When MOM and MLE agree (e.g., Normal, Bernoulli, Poisson), the shared estimator is both simple and efficient.

**Prerequisites:** `math.stats.estimator`, `math.prob.moments`

**Common Misconceptions:**

- *Misconception:* Method of moments always gives the same estimator as MLE.
  *Correction:* MOM and MLE coincide only for specific distributions (e.g., Normal, Poisson, Exponential). For Beta, Gamma, and many other distributions, they differ in both form and efficiency.
- *Misconception:* Method of moments can only use the first moment (mean).
  *Correction:* For k parameters, you equate k moments. For Gamma(α,β) with two parameters, you equate both E[X]=αβ and E[X²]=αβ²+α²β², solving for α̂ and β̂.

**Real-World Applications:**

- Beta distribution MOM fitting is used in project management (PERT analysis) to model task duration distributions from expert estimates of minimum, most likely, and maximum times.
- Insurance loss modeling: Gamma and lognormal distributions are fit to loss severity data using method of moments when the log-likelihood is difficult to optimize.

---

## Confidence Interval

**Concept ID:** `math.stats.confidence-interval`
**Level:** N/A

**Learning Objective:** Construct and correctly interpret confidence intervals, distinguish confidence level from probability, and understand the relationship between confidence intervals and hypothesis tests.

**Summary:**

A (1-α)×100% confidence interval (CI) is a random interval (L(X), U(X)) computed from data such that P(L(X) ≤ θ ≤ U(X)) = 1-α before observing data. Once computed from a specific sample, the interval either contains θ or it doesn't—there is no probability statement about a fixed realized interval. The confidence level (1-α) describes the long-run coverage: if we repeated the study many times, (1-α)×100% of the resulting intervals would contain the true parameter. CIs are constructed by inverting hypothesis tests: a 95% CI contains all parameter values not rejected by a 5% level test. CI width reflects precision; the CI for the mean has width proportional to 1/√n.

**Key Ideas:**

- Confidence level is a property of the procedure, not of the realized interval: 95% CI means 95% of such intervals (over repeated samples) would contain θ.
- A CI is constructed by finding a pivot—a function of data and parameter whose distribution is known—and inverting to isolate θ.
- CI width = 2·z_{α/2}·σ/√n (for known σ); to halve the width, quadruple the sample size.
- Duality with hypothesis testing: the 95% CI contains exactly those parameter values not rejected at α=5%—so CI and test give consistent decisions.

**Prerequisites:** `math.stats.sampling-distribution`, `math.prob.normal-distribution`

**Common Misconceptions:**

- *Misconception:* A 95% CI means there is a 95% probability the true parameter is in the computed interval.
  *Correction:* The true parameter is fixed (frequentist view); once the interval is computed, it either contains θ (probability 1) or doesn't (probability 0). The 95% refers to the long-run frequency of the procedure, not the probability for this specific computed interval.
- *Misconception:* A wider confidence interval means better estimation.
  *Correction:* Wider CIs are less informative—they indicate less precision. A wider CI results from smaller sample size, higher variance, or higher confidence level. Lower width = higher precision.

**Real-World Applications:**

- Drug approval trials report 95% CIs for treatment effect—regulators (FDA, EMA) require the lower CI bound to exceed the minimal clinically meaningful effect for approval.
- Survey polling reports margin of error (half the CI width) to convey uncertainty; election polls report ±3% for n=1000 at 95% confidence.

---

## Confidence Interval for a Mean

**Concept ID:** `math.stats.ci-mean`
**Level:** N/A

**Learning Objective:** Construct confidence intervals for a population mean using both the Z-interval (known σ) and the t-interval (unknown σ), and state when each is appropriate.

**Summary:**

When estimating the population mean μ from a sample X₁,...,Xₙ, the choice of CI depends on whether σ is known. If σ is known: use Z-interval X̄ ± z_{α/2}·σ/√n (valid for normal populations or n≥30 by CLT). If σ is unknown (usual case): replace σ with S (sample standard deviation) and use the t-distribution. The pivot (X̄-μ)/(S/√n) follows a t_{n-1} distribution exactly for normal populations. The t-interval is X̄ ± t_{α/2,n-1}·S/√n. The t-distribution has heavier tails than Z (accounts for estimating σ), but converges to Z as n→∞. For n≥30, t and Z give nearly identical results in practice.

**Key Ideas:**

- The t-statistic (X̄-μ)/(S/√n) follows exactly t_{n-1} when the population is normal—no approximation needed.
- t-critical values exceed z-critical values (e.g., t_{0.025,10}=2.228 vs. z_{0.025}=1.96), so t-intervals are wider, reflecting additional uncertainty from estimating σ.
- For non-normal populations, the t-interval is robust (approximately valid) for n≥30 by CLT; for small n with heavy-tailed data, bootstrap CIs may be preferred.
- The degrees of freedom ν=n-1 (not n) because one degree of freedom is consumed estimating the mean when computing S.

**Prerequisites:** `math.stats.confidence-interval`, `math.prob.continuous-distributions`

**Common Misconceptions:**

- *Misconception:* The t-distribution is only needed when n is very small.
  *Correction:* The t-distribution is the correct distribution whenever σ is unknown, regardless of n. For large n (≥30), t and Z give nearly the same critical values, so using Z is a reasonable approximation, but the t is theoretically correct.
- *Misconception:* A t-interval for the mean requires the population to be normally distributed for any sample size.
  *Correction:* For normal populations, the t-interval is exact. For non-normal populations, the CLT ensures the t-interval is approximately valid for n≥30 by the robustness of the t-procedure.

**Real-World Applications:**

- Medical device validation: 95% t-intervals for mean measurement error confirm that instruments meet accuracy specifications before regulatory submission.
- Quality control in manufacturing: process mean CI constructed from small pilot samples determines whether the process is centered on the target specification.

---

## Confidence Interval for a Proportion

**Concept ID:** `math.stats.ci-proportion`
**Level:** N/A

**Learning Objective:** Construct confidence intervals for a population proportion using the Wald, Wilson score, and Clopper-Pearson methods, and determine appropriate sample sizes.

**Summary:**

For estimating a population proportion p from a Binomial(n,p) sample with k successes, the sample proportion p̂=k/n is the natural estimator. The Wald CI is p̂ ± z_{α/2}·√(p̂(1-p̂)/n), simple but has poor coverage for small n or extreme p. The Wilson score CI has better coverage: center = (p̂+z²/2n)/(1+z²/n), half-width = z·√(p̂(1-p̂)/n + z²/(4n²))/(1+z²/n). The Clopper-Pearson CI is exact (guaranteed coverage ≥1-α for all p) but conservative. Rule of thumb for Wald: np̂≥5 and n(1-p̂)≥5. Sample size for margin of error m: n=z²_{α/2}·p̂(1-p̂)/m² (use p̂=0.5 for worst case).

**Key Ideas:**

- Wald CI p̂±z√(p̂(1-p̂)/n) is simple but undercovers when p is near 0 or 1 or n is small; the Wilson score CI has substantially better coverage properties.
- Adding 2 pseudo-successes and 2 pseudo-failures (Agresti-Coull: ñ=n+4, k̃=k+2) produces a simple CI with near-nominal coverage, nearly as good as Wilson.
- Worst-case sample size uses p=0.5 (maximizes p(1-p)): n=z²·0.25/m² (e.g., n=9604 for 95% CI with m=0.01 margin of error).
- Coverage probability for proportion CIs is actually discrete (jumps as p varies), so 'exact' Clopper-Pearson is conservative.

**Prerequisites:** `math.stats.confidence-interval`

**Common Misconceptions:**

- *Misconception:* The standard formula p̂ ± 1.96·√(p̂(1-p̂)/n) always gives valid 95% CIs.
  *Correction:* This Wald CI undercovers when n is small (n<30), p is near 0 or 1, or np̂<5. Actual coverage can be as low as 80-85% even for moderate n. Use Wilson score or Agresti-Coull instead.
- *Misconception:* A larger p̂ (closer to 1) always gives a narrower CI because fewer failures remain.
  *Correction:* Standard error √(p(1-p)/n) is maximized at p=0.5 and decreases toward both 0 and 1. So CIs are narrowest when p is near 0 or 1, not widest.

**Real-World Applications:**

- Election polling: Gallup and Pew use Wilson or exact CIs for subgroup proportions where sample sizes may be small (demographic subgroups).
- Clinical trials: reporting adverse event rates uses Clopper-Pearson or Wilson CIs because adverse events are often rare and Wald CIs may produce negative lower bounds.

---

## Hypothesis Testing

**Concept ID:** `math.stats.hypothesis-testing`
**Level:** N/A

**Learning Objective:** Formulate null and alternative hypotheses, specify significance level and decision rule, and understand the logical structure of hypothesis testing as a proof by contradiction.

**Summary:**

Hypothesis testing is a formal decision framework for evaluating claims about parameters. The null hypothesis H₀ specifies a default or 'no effect' claim; the alternative H₁ specifies what we seek evidence for. The test calculates a test statistic T from data and rejects H₀ if T falls in the rejection region (critical region). The significance level α = P(reject H₀ | H₀ true) controls the Type I error rate (false alarm rate). The logic is: if H₀ is true, the test statistic should rarely fall in the rejection region; if it does, we take this as evidence against H₀. Testing never proves H₀ — failing to reject merely means insufficient evidence against it. The framework is fundamentally asymmetric: H₀ is given benefit of the doubt.

**Key Ideas:**

- The null hypothesis H₀ is the default 'no effect' assumption; the alternative H₁ is what the researcher tries to demonstrate. Rejecting H₀ provides evidence for H₁.
- Significance level α = P(Type I error) = P(reject H₀ | H₀ true) is set before the test — conventionally α=0.05 or 0.01.
- The test is one-sided (H₁: θ>θ₀ or H₁: θ<θ₀) or two-sided (H₁: θ≠θ₀); this determines the rejection region and critical values.
- Failing to reject H₀ is NOT the same as accepting H₀ — it only means insufficient evidence was found to reject it at significance level α.

**Prerequisites:** `math.stats.sampling-distribution`, `math.prob.conditional-probability`

**Common Misconceptions:**

- *Misconception:* Rejecting H₀ proves the alternative hypothesis is true.
  *Correction:* Rejecting H₀ provides statistical evidence against it at level α, not mathematical proof. With α=0.05, we expect to incorrectly reject true null hypotheses 5% of the time. A small p-value is evidence, not proof.
- *Misconception:* Failing to reject H₀ means H₀ is true.
  *Correction:* Failing to reject H₀ only means the data did not provide sufficient evidence to reject it at the chosen α level. H₀ may be false but the test had insufficient power to detect the difference. Absence of evidence ≠ evidence of absence.

**Real-World Applications:**

- FDA drug approval: efficacy trials test H₀ (no effect) vs. H₁ (drug works) at α=0.05 two-sided; two independent phase III trials with p<0.05 each are required.
- A/B testing in tech: companies test H₀ (no difference in click rates) vs. H₁ (variant differs) before rolling out product changes — statistical testing prevents deploying changes based on random variation.

---

## Test Statistic

**Concept ID:** `math.stats.test-statistic`
**Level:** N/A

**Learning Objective:** Compute test statistics for standard tests, identify the appropriate null distribution, and determine critical values and rejection regions.

**Summary:**

A test statistic T is a function of the data designed to discriminate between H₀ and H₁. Under H₀, T follows a known distribution (null distribution) such as Z, t, χ², or F. The test statistic standardizes the observed effect: how many standard errors is X̄ from μ₀? The rejection region is determined by the null distribution and significance level α. Common test statistics: Z = (X̄-μ₀)/(σ/√n) for known σ (standard normal under H₀); t = (X̄-μ₀)/(S/√n) for unknown σ (t_{n-1} under H₀); χ² = (n-1)S²/σ₀² for variance testing (χ²_{n-1} under H₀); F = S₁²/S₂² for comparing variances (F_{n₁-1,n₂-1} under H₀). A good test statistic has high power—it takes large values when H₁ is true.

**Key Ideas:**

- The test statistic standardizes the sample estimate relative to its standard deviation under H₀, making it comparable to tabulated critical values.
- The null distribution of T (assumed H₀ is true) determines the rejection region: reject if |T|>z_{α/2} (two-sided) or T>z_α (one-sided right) or T<-z_α (one-sided left).
- Each type of test (Z, t, χ², F) is optimal for specific parameter types (mean with known σ, mean with unknown σ, variance, variance ratio).
- Observed test statistic far into the tail of the null distribution = strong evidence against H₀; central value = consistent with H₀.

**Prerequisites:** `math.stats.hypothesis-testing`

**Common Misconceptions:**

- *Misconception:* Any large value of the test statistic always leads to rejection.
  *Correction:* For two-sided tests, both large positive and large negative values lead to rejection. For one-sided left tests, only large negative values do. The direction of the rejection region depends on H₁.
- *Misconception:* The test statistic directly measures the effect size or practical importance.
  *Correction:* The test statistic measures statistical significance (standardized distance from H₀), not practical significance. A huge t-statistic from a massive sample may correspond to a trivially small effect size.

**Real-World Applications:**

- Quality control: Z-test statistics computed from process samples trigger automatic stopping when out-of-control signals are detected (control charts are sequential hypothesis tests).
- Genomics: millions of t-statistics are computed (one per gene) in differential expression analysis; multiple testing correction is then applied to control false discovery rate.

---

## p-value

**Concept ID:** `math.stats.p-value`
**Level:** N/A

**Learning Objective:** Compute and correctly interpret p-values, distinguish statistical significance from practical significance, and understand the limitations of p-values in scientific inference.

**Summary:**

The p-value is the probability of observing a test statistic as extreme as or more extreme than the one obtained, assuming H₀ is true. Formally: p = P(T ≥ t_obs | H₀) for right-sided; p = P(|T| ≥ |t_obs| | H₀) for two-sided. The p-value is a measure of evidence against H₀: small p means H₀ is unlikely to have generated the data. Decision rule: reject H₀ iff p < α. Critically, the p-value is NOT the probability that H₀ is true, nor the probability of the alternative, nor the probability the result will replicate. For very large n, nearly all tests produce p<0.05 even for trivially small effects — practical significance (effect size) must always accompany p-value reporting.

**Key Ideas:**

- p-value = P(data as extreme as observed | H₀ true) — it is a probability under H₀, not a probability about H₀ being true.
- Reject H₀ iff p < α; this is equivalent to the rejection-region approach: p < α iff |T_obs| > critical value (for symmetric two-sided tests).
- p < 0.05 means 'statistically significant at 5% level' — it does NOT mean 'important,' 'large,' or 'practically meaningful.' Always report effect size alongside p-value.
- Under H₀, the p-value is uniformly distributed on [0,1]; this is exploited in multiple testing correction (BH procedure, Bonferroni).

**Prerequisites:** `math.stats.test-statistic`

**Common Misconceptions:**

- *Misconception:* The p-value is the probability that H₀ is true.
  *Correction:* The p-value is computed assuming H₀ IS true — it cannot be the probability of that assumption. P(H₀ true | data) requires Bayes' theorem with a prior on H₀; the p-value has no Bayesian interpretation without that prior.
- *Misconception:* A very small p-value (e.g., p=0.0001) means the effect is large or important.
  *Correction:* With very large sample sizes, even trivially small effects yield extremely small p-values. A study of n=100,000 might find p<0.0001 for a difference of 0.001 units — statistically significant but practically negligible. Always pair p-values with effect sizes.

**Real-World Applications:**

- The American Statistical Association's 2016 and 2019 statements on p-values have changed how journals report findings — many now require effect sizes and CIs alongside p-values.
- Bioinformatics: genomics pipelines report adjusted p-values (q-values, FDR) alongside raw p-values because testing millions of hypotheses makes any fixed α threshold misleading without multiple testing correction.

---

## Type I and Type II Errors

**Concept ID:** `math.stats.type-errors`
**Level:** N/A

**Learning Objective:** Define Type I and Type II errors, compute their probabilities, and explain how α, β, sample size, and effect size interrelate.

**Summary:**

Hypothesis testing involves two types of errors. Type I error (false positive): reject H₀ when H₀ is true; probability = α (significance level). Type II error (false negative): fail to reject H₀ when H₁ is true; probability = β. Power = 1-β = probability of correctly rejecting a false H₀. There is a fundamental tradeoff: for fixed n and effect size, decreasing α increases β (harder to reject = more missed detections) and vice versa. To reduce both α and β simultaneously, increase sample size n. The four outcomes of a test: True Positive (power 1-β), False Positive (α), False Negative (β), True Negative (1-α).

**Key Ideas:**

- Type I (α) = P(reject H₀ | H₀ true): controlled by the researcher via significance level choice; convention is α=0.05 but should reflect costs of false alarms.
- Type II (β) = P(fail to reject H₀ | H₁ true): depends on α, n, effect size δ, and σ—not directly controlled unless power is analyzed.
- Power = 1-β = P(reject H₀ | H₁ true): the ability to detect a real effect; target ≥0.80 (80%) in most disciplines.
- Decreasing α always increases β for fixed n: a stricter significance threshold makes it harder to detect real effects.

**Prerequisites:** `math.stats.hypothesis-testing`

**Unlocks:** `math.stats.power`

**Common Misconceptions:**

- *Misconception:* Type I error is always more serious than Type II error.
  *Correction:* The relative seriousness depends on context. In criminal law, a false conviction (Type I) is considered most serious. In medical screening for treatable cancer, a false negative (Type II—missing a real cancer) may be more serious. Both must be weighed against real-world consequences.
- *Misconception:* Setting α=0.001 ensures few errors overall.
  *Correction:* Reducing α reduces Type I errors but inflates Type II errors (β increases) for fixed n. Total error is not simply α or β—it depends on the prior probability of H₀, the effect size, and sample size.

**Real-World Applications:**

- In clinical trials, regulatory agencies (FDA) require Type I error control (α≤0.05) while industry sponsors conduct power analyses to ensure β≤0.20 before committing resources to large studies.
- Spam filters balance Type I (legitimate email flagged as spam) and Type II (spam delivered to inbox) errors — users often prefer conservative filters minimizing Type I errors.

---

## Power of a Test

**Concept ID:** `math.stats.power`
**Level:** N/A

**Learning Objective:** Compute the power of a statistical test, construct a power curve, and determine required sample sizes for target power using power analysis.

**Summary:**

Power = P(reject H₀ | H₁ true) = 1-β. Power depends on four factors: significance level α (higher α → higher power), effect size δ=|μ₁-μ₀|/σ (larger effect → higher power), sample size n (larger n → higher power), and population variance σ² (smaller σ² → higher power). For a one-sided Z-test, power = Φ(z_{α} + δ√n/σ - 0) where Φ is the standard normal CDF. Required sample size for target power 1-β at effect size δ: n = σ²(z_α+z_β)²/δ². Power analysis should be performed before data collection to ensure the study is adequately powered. Underpowered studies are wasteful and can generate misleading null results.

**Key Ideas:**

- Power increases with n: the test statistic's distribution under H₁ shifts further from the null distribution as n grows, increasing overlap into the rejection region.
- Cohen's effect size d=δ/σ standardizes effects to allow power analysis across different scales; conventional benchmarks: small d=0.2, medium d=0.5, large d=0.8.
- A power of 0.80 (β=0.20) is conventional but arbitrary—high-stakes studies (medical, safety) should target power ≥0.90 or 0.95.
- The power function g(θ) = P(reject H₀ | θ) traces power over all possible values of θ; it should be 0 at H₀ values and rise toward 1 as θ departs from H₀.

**Prerequisites:** `math.stats.type-errors`

**Common Misconceptions:**

- *Misconception:* A non-significant result from a low-powered study means there is no effect.
  *Correction:* A non-significant result from a study with 30% power tells us almost nothing — we expected to miss the effect 70% of the time even if it exists. Low-powered non-significant results are uninformative about the absence of effects.
- *Misconception:* Power analysis is only needed for large studies.
  *Correction:* Power analysis is critical for any study: it prevents wasting resources on underpowered studies and prevents over-collecting data when a smaller study would suffice. Many IRB and grant review boards now require power justification.

**Real-World Applications:**

- Pharmaceutical companies conduct power analyses to determine Phase III trial size — underpowered trials waste millions and fail to demonstrate efficacy even when drugs work.
- Psychology's replication crisis was partly caused by underpowered studies (typically 50-60% power); the field now mandates power ≥0.80 and pre-registration.

---

## z-Test

**Concept ID:** `math.stats.z-test`
**Level:** N/A

**Learning Objective:** Perform one-sample and two-sample Z-tests for means and proportions, verify assumptions, compute p-values, and state conclusions.

**Summary:**

The Z-test is used when the test statistic follows a standard normal distribution under H₀. The one-sample Z-test for the mean (known σ): Z=(X̄-μ₀)/(σ/√n)~N(0,1) under H₀. The two-sample Z-test: Z=(X̄₁-X̄₂-δ₀)/√(σ₁²/n₁+σ₂²/n₂)~N(0,1) under H₀. The Z-test for proportions: Z=(p̂-p₀)/√(p₀(1-p₀)/n)~N(0,1) under H₀. Z-tests require either known population σ (rare in practice) or large samples where S≈σ by LLN. The Z-test is the foundation from which t-tests, chi-squared tests, and F-tests extend by relaxing the known-variance assumption.

**Key Ideas:**

- Z-tests are appropriate when σ is known or n is large (≥30-50) so that S estimates σ well—in practice, the t-test is almost always preferred because σ is rarely known.
- For proportions, the Z-test is valid when np₀≥5 and n(1-p₀)≥5 (normal approximation to the binomial).
- The two-sample Z-test for proportions Z=(p̂₁-p̂₂)/SE_pooled is widely used in A/B testing for website conversion rates.
- Z-test equivalence with CI: reject H₀:μ=μ₀ at α iff μ₀ is outside the (1-α)×100% CI for μ.

**Prerequisites:** `math.stats.hypothesis-testing`, `math.prob.standard-normal`

**Common Misconceptions:**

- *Misconception:* Z-tests are better than t-tests because they use the normal distribution directly.
  *Correction:* Z-tests assume σ is known, which is almost never true. Using the t-test (which estimates σ from data) is the correct approach when σ is unknown. For large n, t and Z give virtually identical results, but the t-test is always more honest about uncertainty.
- *Misconception:* The Z-test for proportions always requires np̂≥5.
  *Correction:* The condition should be np₀≥5 (using the null proportion, not the observed), because the test statistic is computed under H₀. Using np̂≥5 mixes up estimation and testing.

**Real-World Applications:**

- Online A/B testing platforms (Google Optimize, Optimizely) use two-sample Z-tests for proportions to evaluate whether changes to user interfaces significantly affect click-through rates.
- Public health surveillance: Z-tests for proportions compare disease prevalence before/after interventions in large epidemiological studies.

---

## t-Test

**Concept ID:** `math.stats.t-test`
**Level:** N/A

**Learning Objective:** Perform one-sample, paired, and two-sample t-tests, select the correct variant, verify assumptions, and interpret results.

**Summary:**

The t-test is the workhorse of statistics for comparing means when σ is unknown. Three variants: (1) One-sample: t=(X̄-μ₀)/(S/√n) with df=n-1, tests H₀:μ=μ₀. (2) Paired: compute differences Dᵢ=X₁ᵢ-X₂ᵢ, then one-sample t-test on Dᵢ; removes between-subject variability. (3) Two-sample (independent): t=(X̄₁-X̄₂)/SE_p with df from Satterthwaite approximation (Welch's t) or df=n₁+n₂-2 (equal variances). The assumption of normality is robust: for n≥30, the CLT ensures valid t-tests even without normality. The paired t-test is more powerful than the two-sample t-test when correlation between pairs is positive.

**Key Ideas:**

- Paired t-test is appropriate when observations are naturally matched (before/after, twins, same subject measured twice); pairing removes between-subject variability and increases power.
- Welch's t-test (unequal variances) is recommended over the pooled t-test (equal variances) as a default because it is robust to unequal variances with minimal power loss when variances are equal.
- The t-distribution with df=n-1 accounts for uncertainty in estimating σ; as df→∞, t→N(0,1).
- Effect size for t-test: Cohen's d = (X̄₁-X̄₂)/S_p; report d alongside p-value for practical significance.

**Prerequisites:** `math.stats.hypothesis-testing`, `math.prob.continuous-distributions`

**Common Misconceptions:**

- *Misconception:* The two-sample t-test requires equal sample sizes.
  *Correction:* The two-sample t-test works with any sample sizes n₁ and n₂. Welch's t-test handles unequal sample sizes and unequal variances — it is the default in most software (R, Python scipy.stats.ttest_ind).
- *Misconception:* The paired t-test is always better than the two-sample t-test.
  *Correction:* The paired t-test is more powerful only when the correlation between paired measurements is positive (ρ>0). If ρ≤0 or the pairing is artificial, it may be less powerful and costs degrees of freedom.

**Real-World Applications:**

- Medical device studies: paired t-tests compare the same patients measured with old vs. new devices, controlling for patient-to-patient variation in physiology.
- Psychology: pre/post intervention studies use paired t-tests to detect attitude or skill changes — common in educational and clinical psychology research.

---

## Chi-Squared Test

**Concept ID:** `math.stats.chi-squared-test`
**Level:** N/A

**Learning Objective:** Apply chi-squared tests for goodness of fit and independence, compute expected frequencies, and interpret test results.

**Summary:**

The chi-squared test comes in two main variants. Goodness-of-fit test: given observed counts O_i in k categories and expected counts E_i under H₀, compute χ² = Σ(Oᵢ-Eᵢ)²/Eᵢ ~ χ²_{k-1} under H₀. Tests if observed frequencies match a specified distribution. Test of independence: given a contingency table of counts for two categorical variables (r rows × c columns), χ² = Σᵢⱼ(Oᵢⱼ-Eᵢⱼ)²/Eᵢⱼ ~ χ²_{(r-1)(c-1)} under H₀ of independence, where Eᵢⱼ = (row_i total)×(col_j total)/n. Large χ² indicates departure from H₀. Assumption: all Eᵢⱼ≥5 (or most ≥5); use Fisher's exact test when this fails.

**Key Ideas:**

- χ² statistic measures total squared standardized discrepancy between observed and expected counts; large values indicate poor fit or association.
- The chi-squared test of independence does NOT measure the strength of association — only whether association exists. Use Cramér's V = √(χ²/(n·min(r-1,c-1))) for effect size.
- Expected counts must be ≥5 in each cell for the chi-squared approximation to be valid; for smaller expected counts, use Fisher's exact test.
- The chi-squared distribution is right-skewed with df degrees of freedom; the test is always one-sided (right tail) because χ² ≥ 0 and large values indicate departure from H₀.

**Prerequisites:** `math.stats.hypothesis-testing`, `math.prob.continuous-distributions`

**Common Misconceptions:**

- *Misconception:* Chi-squared can be applied to percentages or proportions directly.
  *Correction:* Chi-squared requires actual observed counts, not percentages or proportions. If you have proportions, back-calculate counts (multiply by n) before applying the test.
- *Misconception:* A significant chi-squared test of independence means one variable causes the other.
  *Correction:* Chi-squared detects association (statistical dependence), not causation. Confounding variables may explain the association. Causation requires randomized experiments or causal inference methods.

**Real-World Applications:**

- Market research: chi-squared tests determine whether brand preference is independent of age group using survey contingency tables.
- Genetics: chi-squared goodness-of-fit tests compare observed offspring ratios to predicted Mendelian ratios (e.g., 3:1 for dominant traits).

---

## Analysis of Variance

**Concept ID:** `math.stats.anova`
**Level:** N/A

**Learning Objective:** Partition total variability into between-group and within-group components, construct an ANOVA table, perform the F-test, and conduct post-hoc comparisons.

**Summary:**

Analysis of variance (ANOVA) tests whether k≥3 group means are all equal (H₀: μ₁=μ₂=...=μₖ) vs. at least one differs. ANOVA partitions total sum of squares: SST = SSB + SSW where SSB=Σnᵢ(X̄ᵢ-X̄)² (between-group) and SSW=ΣΣ(Xᵢⱼ-X̄ᵢ)² (within-group). Mean squares: MSB=SSB/(k-1), MSW=SSW/(N-k). F-statistic: F=MSB/MSW ~ F_{k-1, N-k} under H₀. Reject H₀ if F>F_{α, k-1, N-k}. If significant, post-hoc tests (Tukey's HSD, Bonferroni, Scheffé) identify which pairs differ. ANOVA assumes normality, equal variances (homoscedasticity), and independence.

**Key Ideas:**

- ANOVA extends the two-sample t-test to k groups while controlling the familywise Type I error rate at α — running k(k-1)/2 separate t-tests inflates Type I error.
- The F-statistic is MSB/MSW: large F means between-group variation greatly exceeds within-group variation, evidence that groups differ.
- Significant F-test tells us SOME groups differ, not WHICH ones — post-hoc tests (Tukey, Bonferroni) are required for pairwise comparisons.
- ANOVA is robust to mild non-normality for balanced designs (equal nᵢ); for severe violations, Kruskal-Wallis non-parametric test is preferred.

**Prerequisites:** `math.stats.hypothesis-testing`, `math.prob.continuous-distributions`

**Unlocks:** `math.stats.two-way-anova`

**Common Misconceptions:**

- *Misconception:* A significant ANOVA F-test tells us which groups differ.
  *Correction:* The F-test is omnibus: it detects whether ANY group means differ, but not which pairs. Post-hoc multiple comparison tests (Tukey's HSD, Bonferroni) are needed to identify specific pairs.
- *Misconception:* ANOVA requires equal sample sizes per group.
  *Correction:* One-way ANOVA works with unequal group sizes (unbalanced design). The formulas are the same; equal sample sizes (balanced design) simply maximize power and robustness.

**Real-World Applications:**

- Agricultural field trials use ANOVA to compare crop yields under different fertilizer treatments, irrigation levels, or varieties across multiple plots.
- Psychology experiments comparing three or more therapy approaches (CBT, DBT, psychodynamic) use ANOVA to detect overall differences before targeted pairwise comparisons.

---

## Two-Way ANOVA

**Concept ID:** `math.stats.two-way-anova`
**Level:** N/A

**Learning Objective:** Partition variability in two-way ANOVA into main effects and interaction, interpret interaction plots, and understand when interactions invalidate main-effect conclusions.

**Summary:**

Two-way ANOVA analyzes the effects of two categorical factors (A with a levels, B with b levels) on a continuous response. The total SS decomposes as SST = SSA + SSB + SSAB + SSError. SSA and SSB capture the main effects; SSAB captures the interaction (whether the effect of A depends on the level of B). F-tests: F_A = MSA/MSError, F_B = MSB/MSError, F_AB = MSAB/MSError. An interaction means the combined effect is not simply additive — it must be examined first. If significant interaction exists, main effects cannot be interpreted independently; report and interpret the interaction instead. Requires at least 2 observations per cell (replication) to estimate SSAB.

**Key Ideas:**

- The interaction term SSAB tests whether the effect of Factor A depends on the level of Factor B — a significant interaction means the factors do not act independently.
- Always test and interpret interaction first: if significant, main effects are not interpretable in isolation; if not significant, interpret main effects separately.
- Interaction plots (cell means plotted as lines, one factor on x-axis, lines for each level of the other factor): parallel lines = no interaction; crossing lines = strong interaction.
- Two-way ANOVA without replication (one observation per cell) cannot estimate the interaction term — the model assumes no interaction.

**Prerequisites:** `math.stats.anova`

**Common Misconceptions:**

- *Misconception:* A significant interaction means the main effects are unimportant.
  *Correction:* A significant interaction means you cannot summarize each factor by a single average effect — the effect depends on the level of the other factor. Main effects may still be meaningful within levels of the other factor (simple main effects).
- *Misconception:* Two-way ANOVA is simply running two one-way ANOVAs.
  *Correction:* Two one-way ANOVAs ignore the interaction between factors and waste information. Two-way ANOVA jointly models both factors, accounts for their interaction, and uses all data simultaneously — it is more powerful and correct.

**Real-World Applications:**

- Drug development: two-way ANOVA tests whether drug effects depend on patient subgroups (e.g., age group × drug type interaction) — a significant interaction changes treatment recommendations by subgroup.
- Agriculture: two-way ANOVA on crop variety × irrigation level detects whether the best variety depends on irrigation — an interaction means no single 'best' variety exists across all conditions.

---

## Sample Correlation

**Concept ID:** `math.stats.correlation`
**Level:** N/A

**Learning Objective:** Compute and interpret Pearson and Spearman correlation coefficients, test for significance, and understand the distinction between correlation and causation.

**Summary:**

Pearson correlation r = Σ(Xᵢ-X̄)(Yᵢ-Ȳ) / [√Σ(Xᵢ-X̄)² · √Σ(Yᵢ-Ȳ)²] measures the linear association between two continuous variables, ranging from -1 (perfect negative linear) to +1 (perfect positive linear), with 0 indicating no linear relationship. Significance test: t = r√(n-2)/√(1-r²) ~ t_{n-2} under H₀:ρ=0. Spearman rank correlation ρ_s replaces values with ranks before computing Pearson r — more robust to outliers and nonlinear monotone associations. r² (coefficient of determination) = proportion of Y-variance explained by X. Correlation does not imply causation: a third variable may drive both.

**Key Ideas:**

- Pearson r measures only linear association; r=0 does not mean independence (only zero linear correlation). For example, if Y=X², r≈0 but X and Y are perfectly dependent.
- r² = proportion of variance in Y explained by X; r=0.5 means only 25% of variance explained — not as strong as it sounds.
- Spearman's ρ_s = Pearson r of ranks; valid for ordinal data and robust to outliers and nonlinear monotone relationships.
- Testing significance: t=r√(n-2)/√(1-r²) ~ t_{n-2}; even weak correlations become significant with large n, so report r alongside p-value.

**Prerequisites:** `math.stats.measures-of-spread`, `math.prob.correlation`

**Unlocks:** `math.stats.linear-regression`

**Cross-links:** `math.prob.correlation`

**Common Misconceptions:**

- *Misconception:* Correlation of r=0.5 means X explains 50% of Y.
  *Correction:* r=0.5 means r²=0.25 — X explains only 25% of the variance in Y. The coefficient of determination is r², not r.
- *Misconception:* A significant correlation means X causes Y.
  *Correction:* Correlation measures association, not causation. Both X and Y might be driven by a common cause (confounder). For example, shoe size and reading ability are correlated in children because both increase with age — age is the confounder, not shoe size causing reading.

**Real-World Applications:**

- Finance: portfolio managers use correlation matrices to measure co-movement among assets — diversification reduces risk by combining low-correlation assets.
- Epidemiology: correlation between environmental exposures (e.g., air pollution index, pm2.5) and health outcomes (hospital admissions) is computed as a first-pass analysis before causal modeling.

---

## Simple Linear Regression

**Concept ID:** `math.stats.linear-regression`
**Level:** N/A

**Learning Objective:** Derive ordinary least squares estimates for simple linear regression, interpret coefficients, assess model fit using R², and verify regression assumptions.

**Summary:**

Simple linear regression models Y = β₀ + β₁X + ε where ε~N(0,σ²) iid. OLS estimates minimize Σ(Yᵢ-β₀-β₁Xᵢ)²: β̂₁ = Σ(Xᵢ-X̄)(Yᵢ-Ȳ) / Σ(Xᵢ-X̄)² = S_XY/S_XX, β̂₀ = Ȳ - β̂₁X̄. β̂₁ is the expected change in Y per one-unit increase in X. R² = SSR/SST = 1-SSE/SST = proportion of Y-variance explained by the regression. Assumptions (LINE): Linearity, Independence, Normality of residuals, Equal variance (homoscedasticity). Verify with residual plots. Connection to correlation: β̂₁ = r·(S_Y/S_X) and R² = r² for simple regression.

**Key Ideas:**

- OLS estimates β̂₀ and β̂₁ are BLUEs (Best Linear Unbiased Estimators) by the Gauss-Markov theorem, given the LINE assumptions (without requiring normality).
- R² = r² for simple linear regression, ranging from 0 (regression explains none of Y's variation) to 1 (regression explains all of Y's variation).
- Residuals eᵢ=Yᵢ-Ŷᵢ should be randomly scattered around 0 with constant variance — a funnel shape indicates heteroscedasticity; a curved pattern indicates non-linearity.
- Prediction interval (for a new individual Y) is wider than the confidence interval for E[Y|X] because it adds σ² for individual variation.

**Prerequisites:** `math.stats.correlation`, `math.linalg.least-squares`

**Unlocks:** `math.stats.multiple-regression`

**Cross-links:** `math.linalg.least-squares`

**Common Misconceptions:**

- *Misconception:* A high R² means the regression model is correct and can be used for prediction.
  *Correction:* High R² means the model fits the observed data well, but it could still violate assumptions, extrapolate poorly, or overfit. Always check residual plots and validate on held-out data.
- *Misconception:* The regression line Y on X can be reversed: if you have β̂₁ for Y on X, the slope for X on Y is 1/β̂₁.
  *Correction:* Regression is asymmetric. The regression of X on Y minimizes Σ(Xᵢ-α₀-α₁Yᵢ)², giving α̂₁=r·S_X/S_Y=r²/β̂₁≠1/β̂₁ in general. The two regression lines coincide only when r=±1.

**Real-World Applications:**

- Real estate valuation: regression of home price on square footage gives a coefficient (price per square foot) that agents use for quick estimates.
- Epidemiology: dose-response analysis uses linear regression to estimate how disease risk increases with each unit increase in exposure (e.g., blood lead level).

---

## Multiple Linear Regression

**Concept ID:** `math.stats.multiple-regression`
**Level:** N/A

**Learning Objective:** Formulate and fit multiple linear regression using matrix notation, interpret partial regression coefficients, and assess multicollinearity and model fit.

**Summary:**

Multiple linear regression models Y = Xβ + ε where Y is n×1, X is n×(p+1) (design matrix with intercept column), β is (p+1)×1 coefficient vector, and ε~N(0,σ²I). OLS estimate: β̂ = (X'X)⁻¹X'Y (requires X'X invertible — fails with perfect multicollinearity). Each β̂ⱼ is the partial coefficient: expected change in Y per unit increase in Xⱼ, holding all other predictors constant. Adjusted R² = 1-(1-R²)(n-1)/(n-p-1) penalizes for additional predictors. F-test for overall significance: F=MSR/MSE ~ F_{p,n-p-1}. Multicollinearity (high correlation among predictors) inflates SE of β̂ — measured by Variance Inflation Factor (VIF); VIF>10 is a common warning threshold.

**Key Ideas:**

- β̂ = (X'X)⁻¹X'Y is the OLS estimator; it requires X to have full column rank (no perfect multicollinearity), connecting to the linear algebra of matrix invertibility.
- Partial coefficients: each β̂ⱼ estimates the effect of Xⱼ after controlling for all other predictors — different from simple regression slope because other predictors are adjusted out.
- Adjusted R² penalizes for model complexity and can decrease when an unhelpful predictor is added; unlike R², it doesn't always increase with more predictors.
- Multicollinearity inflates standard errors: VIFⱼ = 1/(1-Rⱼ²) where Rⱼ² is from regressing Xⱼ on all other predictors; VIF>10 signals problematic multicollinearity.

**Prerequisites:** `math.stats.linear-regression`, `math.linalg.matrix-multiplication`, `math.linalg.matrix-inverse`

**Common Misconceptions:**

- *Misconception:* Adding more predictors to multiple regression always improves the model.
  *Correction:* Adding irrelevant predictors increases R² (always) but decreases adjusted R² and inflates coefficient variance. Overfitting means the model fits noise in training data but performs poorly on new data. Use adjusted R², AIC, or cross-validation to compare models.
- *Misconception:* The partial coefficient β̂ⱼ has the same meaning as the simple regression slope of Y on Xⱼ.
  *Correction:* Simple regression gives the total association of Xⱼ with Y, including any indirect effect through other correlated predictors. The partial coefficient β̂ⱼ in multiple regression is the unique effect of Xⱼ after adjusting for all other included predictors — it answers a different question.

**Real-World Applications:**

- Salary analysis: HR departments use multiple regression to quantify pay gaps (e.g., gender gap after controlling for role, experience, education) using partial coefficients.
- Hedonic pricing models: economists regress house prices on many features (square footage, location, age, bedrooms) to estimate the marginal value of each attribute holding others constant.

---

## Covariance Matrix

**Concept ID:** `math.stats.covariance-matrix`
**Level:** N/A

**Learning Objective:** Construct the covariance matrix for a random vector, state its properties (symmetry, positive semi-definiteness), and use it in multivariate normal distributions and principal component analysis.

**Summary:**

For a random vector X = (X₁,...,Xₚ)', the covariance matrix Σ is the p×p matrix with (i,j) entry Cov(Xᵢ,Xⱼ) = E[(Xᵢ-μᵢ)(Xⱼ-μⱼ)]. The diagonal entries are variances Var(Xᵢ); off-diagonal entries are covariances. Key properties: (1) Σ is symmetric: Σ=Σ', (2) Σ is positive semi-definite (PSD): for any vector a, a'Σa≥0; positive definite (PD) if a'Σa>0 for all a≠0. The multivariate normal distribution is parameterized by mean vector μ and covariance matrix Σ: X~N(μ,Σ). The sample covariance matrix S=(1/(n-1))·X'X̃ where X̃ is mean-centered data matrix. PCA finds the eigenvectors of Σ corresponding to the largest eigenvalues.

**Key Ideas:**

- The covariance matrix Σ is always symmetric and positive semi-definite; it is positive definite iff no linear combination of the variables has zero variance (no perfect collinearity).
- The eigendecomposition Σ=PΛP' (P=eigenvectors, Λ=diagonal eigenvalue matrix) is the mathematical foundation of PCA: eigenvectors are principal component directions, eigenvalues are the variances along each direction.
- Linear transformation: if Y=AX, then Cov(Y)=A·Cov(X)·A'. This is used to derive the multivariate normal under linear maps and to understand portfolio variance in finance.
- The correlation matrix R is the standardized covariance matrix: R_{ij}=Σ_{ij}/√(Σ_{ii}·Σ_{jj}); it has 1s on the diagonal and off-diagonal entries in [-1,1].

**Prerequisites:** `math.prob.covariance`, `math.linalg.matrix`

**Cross-links:** `math.linalg.positive-definite`

**Common Misconceptions:**

- *Misconception:* A zero covariance between two variables means they are independent.
  *Correction:* Zero covariance (Cov(X,Y)=0) means no LINEAR relationship. X and Y can be nonlinearly dependent with zero covariance. For example, if X~U(-1,1) and Y=X², then Cov(X,Y)=0 but Y is completely determined by X.
- *Misconception:* The covariance matrix can have negative eigenvalues.
  *Correction:* A valid covariance matrix is positive semi-definite, so all eigenvalues are ≥0. A sample covariance matrix with n<p (more variables than observations) will have eigenvalues of exactly 0 (rank deficient), but never negative eigenvalues.

**Real-World Applications:**

- Portfolio optimization (Markowitz): the covariance matrix of asset returns determines portfolio variance; minimizing a'Σa subject to target return gives the efficient frontier.
- Dimensionality reduction with PCA: covariance matrix eigendecomposition reduces high-dimensional gene expression data (p=20,000 genes) to a few principal components for visualization and clustering.

---

## Normal Distribution (Statistics)

**Concept ID:** `math.stats.normal-distribution`
**Level:** N/A

**Learning Objective:** Apply properties of the normal distribution to compute probabilities, recognize when the normal model is appropriate, and use the empirical rule and standardization.

**Summary:**

The normal distribution N(μ,σ²) with pdf f(x)=(1/σ√(2π))exp(-(x-μ)²/(2σ²)) is the most important distribution in statistics, arising naturally as the limiting distribution of sample means (CLT), measurement error, biological traits, and many physical processes. Key properties: symmetric about μ, mean=median=mode=μ, σ determines spread. Standardization: Z=(X-μ)/σ ~ N(0,1). Empirical rule: 68% of data within ±1σ, 95% within ±2σ, 99.7% within ±3σ. For multivariate case: X~N(μ,Σ). Normal distribution is closed under linear combinations: if X~N(μ,σ²) then aX+b~N(aμ+b, a²σ²).

**Key Ideas:**

- Standardization Z=(X-μ)/σ converts any normal random variable to N(0,1), enabling probability calculation from a single standard normal table.
- Empirical rule (68-95-99.7): P(|X-μ|≤σ)≈0.683, P(|X-μ|≤2σ)≈0.954, P(|X-μ|≤3σ)≈0.997—fundamental for outlier detection and quality control.
- Sum of independent normals: if X₁~N(μ₁,σ₁²) and X₂~N(μ₂,σ₂²) independent, then X₁+X₂~N(μ₁+μ₂, σ₁²+σ₂²).
- The normal distribution is determined by just two parameters (μ,σ²), making it tractable and fully characterized by mean and variance.

**Prerequisites:** `math.prob.normal-distribution`, `math.stats.descriptive-statistics`

**Cross-links:** `math.prob.normal-distribution`

**Common Misconceptions:**

- *Misconception:* Real-world data is always normally distributed.
  *Correction:* Many real phenomena are not normal: income distributions are right-skewed, counts follow Poisson, proportions follow Binomial. The normal model is appropriate for measurement error, averages of many independent quantities, and residuals in regression. Always verify with QQ-plots and normality tests.
- *Misconception:* The area under the normal curve sums to something other than 1 because the tails extend to infinity.
  *Correction:* The normal pdf is integrable from -∞ to +∞ and integrates to exactly 1 — it is a valid probability density. The tails decay as exp(-x²/2) which is integrable despite being infinite in extent.

**Real-World Applications:**

- Process control: manufacturing tolerances use ±3σ limits (99.7% of output within spec); Six Sigma quality requires ±6σ from process mean to nearest spec limit.
- Psychometrics: IQ scores are constructed to be N(100,225) by design; test standardization ensures normality across populations and score comparability.

---

## Normal Approximation

**Concept ID:** `math.stats.normal-approximation`
**Level:** N/A

**Learning Objective:** Apply the normal approximation to binomial and Poisson distributions, use the continuity correction, and identify conditions for valid approximation.

**Summary:**

The Central Limit Theorem justifies approximating non-normal distributions by the normal when conditions are met. Binomial approximation: if X~Bin(n,p) and np≥5, n(1-p)≥5, then X is approximately N(np, np(1-p)). With continuity correction: P(X≤k) ≈ Φ((k+0.5-np)/√(np(1-p))). Poisson approximation: if X~Poisson(λ) and λ≥10, then X is approximately N(λ,λ). Without continuity correction, normal approximation underestimates discrete probabilities. The Berry-Esseen theorem quantifies the approximation error: |F_n(x)-Φ(x)| ≤ C·E[|X|³]/(σ³√n). For small p (rare events), the Poisson approximation to binomial is more accurate than the normal.

**Key Ideas:**

- Continuity correction P(a≤X≤b) ≈ P(a-0.5 ≤ Y ≤ b+0.5) for Y~N(np,np(1-p)) significantly improves accuracy for discrete distributions, especially for moderate n.
- Normal approximation to Binomial is valid when np≥5 AND n(1-p)≥5; for p near 0 or 1, larger n is needed — the condition ensures the distribution is not too skewed.
- For Poisson(λ) with large λ, normal approximation works well; for small λ, the Poisson distribution itself is exact and preferable.
- The approximation is for computation: with computers, exact binomial/Poisson probabilities are always available — normal approximation is primarily important for theoretical derivations (CLT, hypothesis tests).

**Prerequisites:** `math.prob.clt`, `math.stats.normal-distribution`

**Cross-links:** `math.prob.clt`

**Common Misconceptions:**

- *Misconception:* The continuity correction is optional and rarely matters.
  *Correction:* For moderate n (say n=20-50), omitting the continuity correction can introduce errors of 5-10% in the approximated probability. The correction is important for accurate computation and for understanding that a discrete distribution is being approximated by a continuous one.
- *Misconception:* Normal approximation to Binomial works whenever n is large.
  *Correction:* Large n is necessary but not sufficient. If p is very small (e.g., p=0.001) and n=100, then np=0.1 << 5 — the approximation is invalid (use Poisson instead). The condition np≥5 AND n(1-p)≥5 must both hold.

**Real-World Applications:**

- Quality control: X~Bin(1000, 0.02) defects; normal approximation is used for quick probability calculations in sampling plans when exact binomial tables are not available.
- Epidemiology: disease incidence X~Bin(n, p) with n=10,000 and p=0.001; normal approximation fails here (np=10<5 barely), but Poisson(10) is an excellent approximation.

---

## Nonparametric Tests

**Concept ID:** `math.stats.nonparametric`
**Level:** N/A

**Learning Objective:** Apply rank-based nonparametric tests (Wilcoxon, Mann-Whitney, Kruskal-Wallis) as distribution-free alternatives to t-tests and ANOVA, and state when they are preferred.

**Summary:**

Nonparametric (distribution-free) tests make no assumption about the form of the population distribution (e.g., normality). They are based on ranks rather than raw values. Key tests: Wilcoxon signed-rank test (nonparametric alternative to one-sample or paired t-test); Mann-Whitney U test / Wilcoxon rank-sum test (two-sample alternative to t-test); Kruskal-Wallis test (k-sample alternative to one-way ANOVA); Spearman correlation (rank-based alternative to Pearson). Advantages: robust to outliers, valid for skewed data, applicable to ordinal data. Disadvantages: lower power than parametric tests when normality holds (asymptotic relative efficiency of Wilcoxon vs. t-test is 3/π≈0.955 for normal data, but Wilcoxon can be more powerful for heavy-tailed distributions).

**Key Ideas:**

- Nonparametric tests operate on ranks, discarding magnitude information but gaining robustness to outliers, heavy tails, and skewness.
- Mann-Whitney U statistic: U = number of pairs (Xᵢ,Yⱼ) where Xᵢ>Yⱼ across the two groups — large U indicates Group X tends to exceed Group Y.
- Wilcoxon signed-rank test ranks absolute differences |Dᵢ|, then sums ranks with positive signs — appropriate for paired data that is non-normal.
- The asymptotic relative efficiency (ARE) of Wilcoxon vs. t-test under normality is 3/π≈95.5% — a small power cost for distribution-free validity.

**Prerequisites:** `math.stats.hypothesis-testing`

**Common Misconceptions:**

- *Misconception:* Nonparametric tests have no assumptions at all.
  *Correction:* Nonparametric tests still have assumptions — they require independence of observations, and many (Mann-Whitney) assume the two distributions have the same shape if testing for a location shift. 'Distribution-free' refers to not assuming a parametric family, not to having zero assumptions.
- *Misconception:* Nonparametric tests are always safer to use than parametric tests.
  *Correction:* When normality holds, parametric tests (t-test, ANOVA) have higher power. Using a nonparametric test when data is normal sacrifices power unnecessarily. Use nonparametric tests when normality is clearly violated or for ordinal data.

**Real-World Applications:**

- Clinical trials with ordinal outcomes (patient-reported pain scales 0-10) use Wilcoxon/Mann-Whitney rather than t-tests because ordinal data doesn't have meaningful means.
- Sensory evaluation panels (wine, food quality rated 1-5) use nonparametric tests because ratings are ordinal and distributions are highly non-normal.

---

## Bayesian Statistics

**Concept ID:** `math.stats.bayesian-inference`
**Level:** N/A

**Learning Objective:** Apply Bayes' theorem to update prior beliefs with data, compute posterior distributions, and contrast Bayesian and frequentist inference philosophically and computationally.

**Summary:**

Bayesian inference treats parameters θ as random variables with a prior distribution π(θ) encoding beliefs before seeing data. After observing data X, the posterior is π(θ|X) ∝ L(θ|X)·π(θ) where L(θ|X)=f(X|θ) is the likelihood. The posterior summarizes all information about θ given X. Point estimates: posterior mean E[θ|X] (minimizes expected squared error), posterior median (minimizes expected absolute error), MAP = argmax π(θ|X). Bayesian CIs are credible intervals: P(θ∈(a,b)|X)=0.95 — a direct probability statement. Key contrast with frequentist: Bayesian requires specifying a prior; frequentist treats θ as fixed unknown. Bayesian inference allows direct probability statements about parameters; frequentist does not.

**Key Ideas:**

- Posterior = Likelihood × Prior (unnormalized): π(θ|X) ∝ f(X|θ)·π(θ). This is Bayes' theorem applied to statistical inference.
- The posterior distribution is the complete summary of uncertainty about θ after observing data; it combines prior beliefs and the data's evidence.
- As n→∞, the posterior concentrates around the MLE regardless of the prior (Bernstein-von Mises theorem) — with large data, likelihood dominates the prior.
- Bayesian credible intervals have the direct interpretation: 'there is 95% probability that θ is in this interval' — unlike frequentist CIs, which are long-run frequency statements.

**Prerequisites:** `math.prob.bayes-theorem`, `math.stats.mle`

**Cross-links:** `math.prob.bayesian-inference`

**Common Misconceptions:**

- *Misconception:* Bayesian inference is subjective and therefore unscientific because the prior is arbitrary.
  *Correction:* The prior represents genuine prior knowledge (expert opinion, previous studies, physical constraints). Sensitivity analysis tests how conclusions change with different priors. For large n, the prior is overwhelmed by data; for small n, informative priors can be more honest than ignoring prior information entirely.
- *Misconception:* The posterior mean is always the Bayesian point estimate of choice.
  *Correction:* The optimal Bayesian point estimate depends on the loss function: posterior mean minimizes expected squared error loss, posterior median minimizes expected absolute error loss, and MAP minimizes expected 0-1 loss. The choice depends on the decision context.

**Real-World Applications:**

- Spam filters use Bayesian inference (Naive Bayes classifier) to update P(spam|words in email) — among the first and most successful applications of Bayesian methods in machine learning.
- Clinical biomarker studies: Bayesian adaptive trial designs update posterior probability of drug efficacy as data accumulates, allowing early stopping for futility or efficacy.

---

## Conjugate Prior

**Concept ID:** `math.stats.conjugate-prior`
**Level:** N/A

**Learning Objective:** Identify conjugate prior families for common likelihoods, derive the resulting posterior, and explain why conjugacy provides analytical tractability.

**Summary:**

A prior distribution π(θ) is conjugate to a likelihood f(x|θ) if the posterior π(θ|x) is in the same distributional family as the prior. Conjugate priors lead to analytically tractable posteriors — no numerical integration needed. Key conjugate pairs: Binomial likelihood ↔ Beta prior (posterior: Beta(α+k, β+n-k)); Poisson likelihood ↔ Gamma prior (posterior: Gamma(α+Σxᵢ, β/(nβ+1))); Normal likelihood with known σ² ↔ Normal prior (posterior: Normal); Normal likelihood with unknown σ² ↔ Normal-Inverse-Gamma prior. The hyperparameters of conjugate priors have natural interpretations (pseudo-observations): Beta(α,β) prior ~ α prior successes, β prior failures before seeing data.

**Key Ideas:**

- Conjugate priors guarantee the posterior stays in the same distributional family as the prior — this is mathematically elegant and computationally convenient (no MCMC needed).
- Hyperparameters of conjugate priors have 'pseudo-observation' interpretations: Beta(α,β) encodes α-1 prior successes and β-1 prior failures, so prior information is measured in equivalent data points.
- With conjugate priors, Bayesian updating is sequential: Beta(α,β) → Beta(α+k₁,β+n₁-k₁) → Beta(α+k₁+k₂, β+n₁+n₂-k₁-k₂) — each batch of data updates the hyperparameters.
- Non-conjugate models (most real problems) require MCMC (Markov Chain Monte Carlo) or variational inference to compute the posterior — conjugacy is an exception, not the rule.

**Prerequisites:** `math.stats.bayesian-inference`

**Common Misconceptions:**

- *Misconception:* Conjugate priors are always the right choice because they are mathematically convenient.
  *Correction:* Conjugate priors should be chosen because they reflect genuine prior beliefs, not merely for mathematical convenience. Choosing Beta(1,1) (uniform) when prior data strongly suggests p≈0.3 discards valuable information just to use a conjugate form.
- *Misconception:* The Normal distribution is conjugate to itself for all parameters.
  *Correction:* The Normal prior is conjugate for the Normal mean (known σ²), but not for the Normal variance with the Normal prior. For the variance parameter, the Inverse-Gamma prior is conjugate. Conjugacy depends on which parameter is being estimated.

**Real-World Applications:**

- Online recommendation systems use Beta-Binomial models to estimate click-through rates: each item starts with a Beta(1,1) prior, updated with each user interaction — Thompson sampling for exploration-exploitation.
- Bayesian A/B testing: Beta prior on conversion rates updated with control and treatment outcomes, computing posterior probability that treatment beats control directly.

---

## Credible Interval

**Concept ID:** `math.stats.credible-interval`
**Level:** N/A

**Learning Objective:** Compute and interpret Bayesian credible intervals (equal-tailed and highest posterior density), and contrast them with frequentist confidence intervals.

**Summary:**

A (1-α)×100% Bayesian credible interval (CI) is any interval (a,b) such that P(θ∈(a,b)|X)=1-α — the parameter is in the interval with posterior probability 1-α. Unlike frequentist CIs, this IS a direct probability statement about the parameter. Two common forms: (1) Equal-tailed credible interval (ETI): (α/2 quantile, 1-α/2 quantile) of the posterior — symmetric probability in each tail. (2) Highest posterior density interval (HPDI): shortest interval containing 1-α posterior probability — always contains the MAP estimate and is the most informative interval. For symmetric unimodal posteriors, ETI and HPDI coincide. HPDI is preferred for asymmetric posteriors.

**Key Ideas:**

- Credible interval gives the direct probabilistic statement 'P(θ∈(a,b)|data)=0.95,' which is what people intuitively want but frequentist CIs do not provide.
- HPDI is the shortest interval with the required posterior probability — every point inside has higher posterior density than every point outside.
- For Beta(α+k, β+n-k) posterior, ETI is computed from the Beta quantile function; the posterior mean ± 2SD gives a quick approximation for symmetric posteriors.
- As n→∞ (Bernstein-von Mises), Bayesian credible intervals and frequentist confidence intervals become numerically equivalent — but their interpretations remain philosophically distinct.

**Prerequisites:** `math.stats.bayesian-inference`

**Common Misconceptions:**

- *Misconception:* Credible intervals and confidence intervals are the same thing with different names.
  *Correction:* Their numerical values may be similar for large n, but their meanings differ fundamentally. A 95% CI says: 'This procedure produces intervals that contain θ 95% of the time over repeated experiments.' A 95% credible interval says: 'Given the data, θ is in this interval with 95% posterior probability.' The credible interval is a probability statement about θ; the CI is a frequency statement about the procedure.
- *Misconception:* The HPDI is always preferable to the equal-tailed interval.
  *Correction:* HPDI is shorter (more efficient) for asymmetric posteriors, but equal-tailed intervals are easier to compute, more familiar, and invariant to monotone reparameterization (if (a,b) is a 95% ETI for θ, then (g(a),g(b)) is a 95% ETI for g(θ)). HPDI lacks this invariance.

**Real-World Applications:**

- Bayesian clinical trial reporting: pharmaceutical regulatory submissions increasingly include posterior probabilities and credible intervals to allow direct probability statements about treatment effects.
- Ecology: species abundance estimation from survey data uses Bayesian credible intervals — 'the population is between 5,000 and 15,000 individuals with 95% probability' is more communicable to conservation managers than frequentist CIs.

---

## Experimental Design

**Concept ID:** `math.stats.experimental-design`
**Level:** N/A

**Learning Objective:** Apply core principles of experimental design (randomization, replication, blocking), distinguish experimental from observational studies, and design factorial experiments.

**Summary:**

Experimental design determines how treatments are assigned to experimental units to enable valid causal inference and efficient estimation. The three R's: Randomization (random treatment assignment eliminates confounding, enables causal inference), Replication (multiple units per treatment reduces variance, allows error estimation), Blocking (grouping similar units together before randomization controls known sources of variation, increases power). Key designs: Completely Randomized Design (CRD), Randomized Complete Block Design (RCBD), Latin Square, Factorial (2^k). A factorial 2^k design studies k factors at 2 levels each with 2^k treatment combinations — efficient for detecting main effects and interactions. Contrast with observational studies: confounders cannot be controlled, so causal claims require strong assumptions.

**Key Ideas:**

- Randomization is the gold standard for causal inference: random treatment assignment ensures that on average, treatment and control groups are balanced on all variables (observed and unobserved).
- Blocking controls for known sources of variability (nuisance factors): assign all treatments within each block, then compare within-block differences. Blocking reduces MSError, increasing power.
- Factorial designs are more efficient than one-factor-at-a-time designs: a 2² factorial (4 runs) gives independent estimates of both main effects and their interaction, versus 4 runs for only two separate one-factor experiments.
- The difference between 'designed experiment' and 'observational study' is not just statistical — it is epistemological: randomized experiments support causal claims; observational studies do not without additional assumptions (DAGs, propensity scores, instrumental variables).

**Prerequisites:** `math.stats.sampling`, `math.stats.anova`

**Common Misconceptions:**

- *Misconception:* A large observational study is equivalent to a smaller randomized experiment.
  *Correction:* Size does not compensate for confounding. An observational study with n=10,000 may still have systematic bias if treatment assignment is correlated with outcomes through confounders. Randomization, not large n, enables causal claims.
- *Misconception:* Blocking always increases power.
  *Correction:* Blocking increases power if blocks are homogeneous (large within-block correlation). If blocking variable is unrelated to the outcome, blocking wastes degrees of freedom (removes them from MSError) and reduces power. Only block on variables correlated with the response.

**Real-World Applications:**

- Agricultural field trials use RCBD to control spatial variability (blocking by field location/soil type), allowing valid comparison of crop varieties or fertilizer treatments.
- Clinical trials use stratified randomization (blocking by site, age group, disease severity) to ensure balance on key prognostic factors, improving power and interpretability.

---

## Sufficient Statistic

**Concept ID:** `math.stats.sufficient-statistic`
**Level:** N/A

**Learning Objective:** Define and identify sufficient statistics using the factorization theorem, explain their role in data reduction, and relate them to MLE and exponential family distributions.

**Summary:**

A statistic T(X) is sufficient for θ if the conditional distribution f(X|T(X)=t, θ) does not depend on θ — once T is known, the remaining data contain no additional information about θ. Factorization theorem (Neyman-Fisher): T(X) is sufficient for θ iff the joint density can be factored as f(x;θ) = g(T(x),θ)·h(x) where g depends on x only through T(x) and h does not depend on θ. Sufficient statistics achieve data reduction: n observations can be summarized by T without losing information about θ. For exponential family f(x;θ)=h(x)·exp(η(θ)T(x)-A(θ)), T(X)=ΣT(Xᵢ) is a natural sufficient statistic. MLE is always a function of sufficient statistics.

**Key Ideas:**

- Sufficiency captures 'all the information about θ in the data' — no other statistic computed from the same data can tell us more about θ than T alone.
- The factorization theorem provides a simple criterion: factor the likelihood L(θ;x) = g(T(x),θ)·h(x); if possible, T(x) is sufficient.
- For exponential families, the natural sufficient statistic is Σφ(Xᵢ) for the canonical parameter — e.g., X̄ for Normal, ΣXᵢ for Poisson, k (number of successes) for Binomial.
- MLE is always a function of sufficient statistics: if T is sufficient and T̃ is sufficient, then the MLE is a function of both — efficient estimation uses sufficient statistics.

**Prerequisites:** `math.stats.estimator`, `math.prob.conditional-distribution`

**Unlocks:** `math.stats.rao-blackwell`

**Common Misconceptions:**

- *Misconception:* Every statistic that summarizes the data is a sufficient statistic.
  *Correction:* Sufficiency requires that T contain ALL the information about θ. The sample mean X̄ is sufficient for the Normal mean μ (with known σ). But the sample range (max-min) is not sufficient for μ — it loses information about where the data are centered.
- *Misconception:* A sufficient statistic always reduces the data to a single number.
  *Correction:* A sufficient statistic can be a vector. For Normal(μ,σ²) with both parameters unknown, the sufficient statistic is (X̄, S²) — a 2-dimensional vector. Dimension of the sufficient statistic generally equals the number of unknown parameters for exponential families.

**Real-World Applications:**

- Data compression for inference: in distributed computing, sufficient statistics (like ΣXᵢ and ΣXᵢ²) can be computed at each node and aggregated, avoiding transmission of raw data for statistical models.
- Online learning algorithms maintain only sufficient statistics (running means, counts) rather than all data — enabling efficient updates as new observations arrive.

---

## Rao-Blackwell Theorem

**Concept ID:** `math.stats.rao-blackwell`
**Level:** N/A

**Learning Objective:** State and apply the Rao-Blackwell theorem to improve estimators, define UMVUE, and understand completeness as a tool for establishing optimality.

**Summary:**

The Rao-Blackwell theorem: if θ̂ is an unbiased estimator of θ and T is a sufficient statistic for θ, then θ̃ = E[θ̂|T] is also unbiased and has Var(θ̃) ≤ Var(θ̂) for all θ — conditioning on a sufficient statistic never increases variance. The Rao-Blackwellization procedure: take any unbiased estimator, condition on the sufficient statistic to get a better (uniformly lower variance) one. A Uniformly Minimum Variance Unbiased Estimator (UMVUE) has the lowest variance among all unbiased estimators for every θ. The Lehmann-Scheffé theorem provides a path to UMVUE: if T is a complete sufficient statistic and θ̃=g(T) is unbiased, then θ̃ is the unique UMVUE. A statistic T is complete if E[f(T)]=0 for all θ implies f(T)=0 a.s.

**Key Ideas:**

- Rao-Blackwell: conditioning an unbiased estimator on a sufficient statistic reduces variance — the improvement can be substantial if the original estimator discarded useful information.
- UMVUE achieves the lowest possible variance among all unbiased estimators, making it optimal for squared-error loss among the unbiased class (not necessarily better than biased estimators with lower MSE).
- The Cramér-Rao lower bound provides an alternative lower bound: Var(θ̂) ≥ 1/(nI(θ)) for unbiased estimators, where I(θ) is the Fisher information. An estimator achieving this bound is efficient.
- Completeness ensures uniqueness: there can be at most one unbiased function of a complete sufficient statistic — so Rao-Blackwellization yields the unique UMVUE when the sufficient statistic is complete.

**Prerequisites:** `math.stats.sufficient-statistic`, `math.stats.bias-variance`

**Common Misconceptions:**

- *Misconception:* The UMVUE is always the best estimator to use in practice.
  *Correction:* UMVUE minimizes variance among unbiased estimators, but a biased estimator with lower MSE (Bias²+Variance) can outperform the UMVUE in terms of total error. Ridge regression and shrinkage estimators deliberately introduce bias to reduce variance, often outperforming UMVUE in prediction.
- *Misconception:* Rao-Blackwell improvement always leads to a dramatically better estimator.
  *Correction:* If the original estimator is already a function of the sufficient statistic, Rao-Blackwellization does nothing (E[g(T)|T]=g(T)). The improvement is substantial only when the original estimator uses the data inefficiently, ignoring the sufficient statistic.

**Real-World Applications:**

- Signal processing: the sample mean is the UMVUE for the signal level in additive white Gaussian noise — optimal linear estimation used in communications and radar.
- Reliability engineering: for exponential lifetimes, the UMVUE of P(lifetime>t) = e^{-λt} is (1-t/ΣXᵢ)^{n-1} — computed via Rao-Blackwell; used in warranty analysis and component testing.

---
