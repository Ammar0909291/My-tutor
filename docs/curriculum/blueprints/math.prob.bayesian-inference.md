# Blueprint: math.prob.bayesian-inference

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.prob.bayesian-inference |
| name | Bayesian Inference |
| Domain | math.prob |
| Difficulty | expert |
| Bloom level | apply |
| Estimated hours | 8 |
| Mastery threshold | 0.75 |
| MAMR | 4/5 |
| Prerequisites | math.prob.bayes-theorem |
| Cross-links | math.stats.bayesian-inference |
| Unlocks | — |

## Component 1 — Learning Objective
The student frames inference as a prior-to-posterior update via Bayes' theorem P(θ|data)∝P(data|θ)P(θ); identifies conjugate prior families (Beta-Binomial, Normal-Normal, Gamma-Poisson) and explains why conjugacy yields closed-form posteriors; computes posterior mean, variance, and credible intervals for these conjugate models; distinguishes credible intervals from frequentist confidence intervals; and applies posterior predictive distributions to predict future observations.

## Component 2 — CPA Entry Stage
**P — Pictorial** (plot three Beta distributions: Beta(1,1)=Uniform prior; Beta(4,2)=posterior after 3 heads, 1 tail from n=4 flips; Beta(11,5)=posterior after 10 heads, 4 tails; show how the distribution concentrates around the true probability as more data arrives; label: "Prior → Posterior after 4 flips → Posterior after 14 flips"; annotate that the Beta distribution's two parameters count successes+1 and failures+1)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | PRIOR-IS-ARBITRARY-SO-BAYES-IS-SUBJECTIVE | Student dismisses Bayesian inference as "subjective" because different priors give different posteriors; doesn't know that (a) priors can be non-informative/objective, (b) posteriors converge with sufficient data, and (c) all inference requires assumptions | Type 3 — language contamination ("subjective" in everyday language means unreliable or biased; in Bayesian inference it refers to incorporating prior information, not arbitrary opinion) |
| MC-2 | CONJUGATE-PRIOR-IS-THE-ONLY-VALID-PRIOR | Student uses only conjugate priors because they give closed-form solutions; doesn't know conjugacy is a computational convenience, not a requirement — non-conjugate priors require MCMC/approximate methods | Type 5 — instruction-induced (introductory courses show only conjugate examples; students conclude the closed-form result is necessary) |
| MC-3 | CREDIBLE-INTERVAL-EQUALS-CONFIDENCE-INTERVAL | Student equates a 95% Bayesian credible interval with a 95% frequentist confidence interval; states "there's a 95% chance θ is in [L,U]" for a frequentist confidence interval | Type 3 — language contamination (both are called "95% intervals"; the frequentist interval is about repeated sampling, not θ's probability; the Bayesian interval directly gives P(θ∈[L,U]|data)=0.95) |

## Component 4 — Session TA Cap
**Cap = 10** (hrs = 8 → cap 10)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**The Beta-Binomial conjugate model:**

**Setup:** Observe k heads in n flips; want to infer θ=P(head).

**Prior:** θ~Beta(α,β). Density: p(θ)∝θ^{α−1}(1−θ)^{β−1} for θ∈[0,1].
- Beta(1,1) = Uniform (no prior information)
- α>1: prior mass concentrated away from 0; β>1: away from 1
- Prior mean: α/(α+β). Prior effective sample size: α+β.

**Likelihood:** P(k heads|θ,n)=C(n,k)θ^k(1−θ)^{n−k}.

**Posterior:** θ|k,n ~ Beta(α+k, β+n−k).
- Posterior mean: (α+k)/(α+β+n). A weighted average of prior mean α/(α+β) and MLE k/n.
- As n→∞: posterior mean → k/n (data overwhelm the prior).

**Interpretation:** α counts pseudo-successes, β counts pseudo-failures from the prior. Each real observation updates the count: k real successes → α+k, n−k real failures → β+n−k.

**Credible interval:** The 95% highest-density region (HDR) of Beta(α+k, β+n−k) contains the parameter with 95% posterior probability. This IS a probability statement about θ.

**Posterior predictive:** P(next flip = head | k, n) = E[θ|k,n] = (α+k)/(α+β+n).

**P49 checkpoint:**
- CORRECT → "Beta(α,β) prior + Binomial likelihood → Beta(α+k, β+n−k) posterior. Posterior mean = weighted average of prior mean and MLE. Credible interval: P(θ∈[L,U]|data)=95%." → A02
- PARTIAL (MC-3: credible=confidence) → "A Bayesian credible interval [L,U] DIRECTLY states P(θ∈[L,U]|data)=0.95 — θ has 95% posterior probability of being in [L,U]. A frequentist confidence interval says: if you repeated this experiment many times and computed the interval each time, 95% of such intervals would contain the true θ. The frequentist θ is fixed (not a random variable) — so 'probability that θ is in [L,U]' is 0 or 1 for a frequentist, not 0.95." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "Fair coin prior: Beta(2,2) (biased slightly toward 0.5). You flip 10 times and get 7 heads. Posterior: Beta(2+7, 2+3)=Beta(9,5). Posterior mean: 9/14≈0.643. MLE: 7/10=0.70. Prior mean: 0.5. The posterior is between prior and MLE — the prior pulled it slightly downward from 0.70." → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**Other conjugate families:**

**Normal-Normal (known variance σ²):** X₁,…,Xₙ|μ~N(μ,σ²), prior μ~N(μ₀,τ²).
Posterior: μ|data~N(μₙ,τₙ²) where:
- 1/τₙ² = 1/τ² + n/σ² (precisions add)
- μₙ = (μ₀/τ² + nX̄/σ²)·τₙ² (precision-weighted average of prior mean and MLE)
- As n→∞: μₙ → X̄, τₙ² → 0 (posterior concentrates on MLE).

**Gamma-Poisson:** X₁,…,Xₙ|λ~Poisson(λ), prior λ~Gamma(α,β).
Posterior: λ|data~Gamma(α+∑xᵢ, β+n).
- Posterior mean: (α+∑xᵢ)/(β+n).

**Dirichlet-Multinomial:** categorical data; prior is Dirichlet, posterior is Dirichlet. Each category count increments the corresponding Dirichlet parameter.

**When conjugacy fails:** Most real models (logistic regression, neural networks) don't have conjugate priors. Solution: MCMC (Markov Chain Monte Carlo) samples from the posterior; variational inference approximates it by a tractable distribution. Conceptual structure (prior × likelihood → posterior) is identical.

**P49 checkpoint:**
- CORRECT → "Conjugate families: Beta-Binomial, Normal-Normal, Gamma-Poisson, Dirichlet-Multinomial. All share: posterior in same family as prior, parameters updated by sufficient statistics. MCMC for non-conjugate." → Gate (P91)
- PARTIAL → "Conjugacy: the posterior belongs to the same parametric family as the prior. The benefit is a closed-form update. For Normal-Normal: precisions (1/variance) add — the posterior precision is prior precision plus n times data precision." → TB-R02 → Gate
- INCORRECT → TB-R02 → Gate
- NO_RESPONSE → "Poisson model: you observe counts 3,1,4,1,5. n=5 flips, ∑xᵢ=14. Prior λ~Gamma(2,1) (prior mean 2). Posterior: Gamma(2+14, 1+5)=Gamma(16,6). Posterior mean: 16/6≈2.67. MLE: 14/5=2.8. The prior pulled it slightly down." → TB-R02 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 + MC-3 combined):**
Step 1 — "The prior encodes existing knowledge. A non-informative prior (Beta(1,1)=Uniform) gives equal weight to every θ∈[0,1] — no specific bias. With enough data, any reasonable prior is overwhelmed: Beta(α,β) posterior mean=(α+k)/(α+β+n) → k/n as n→∞."
Step 2 — "Credible interval P(θ∈[L,U]|data)=0.95 is a direct probability statement about θ. This is what practitioners want but can't say frequentistically. The frequentist CI is a property of the PROCEDURE, not of the specific interval computed."
Step 3 — "Both frameworks give useful results; they answer different questions. Bayesian: what do I believe about θ after seeing data? Frequentist: what would happen if I repeated this experiment many times?"

**TB-R02 (MC-2 CONJUGATE-PRIOR-IS-THE-ONLY-VALID-PRIOR):**
Step 1 — "Conjugacy is a computational shortcut, not a philosophical requirement. The posterior exists for any prior; we just may not have a closed-form expression for it."
Step 2 — "MCMC methods (e.g., Metropolis-Hastings, Hamiltonian Monte Carlo) generate samples from the posterior without a closed form. Stan and PyMC are popular libraries."
Step 3 — "Real Bayesian inference uses non-conjugate priors constantly — logistic regression with a Normal prior on the log-odds has no conjugate form, yet is routinely estimated via MCMC."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (5 items):**
1. A coin is flipped 20 times, yielding 14 heads. (a) Start with a Uniform prior (Beta(1,1)). Compute the posterior. (b) Start with Beta(5,5) (biased toward fairness). Compute the posterior. (c) Compare the two posterior means. For what n would the two posteriors have means differing by less than 0.01?
2. Normal-Normal model: X₁,…,X₁₀ are measurements with known σ²=4. Observed X̄=7.2. Prior: μ~N(5,9). Compute the posterior distribution of μ. What is the posterior mean and variance?
3. A hospital observes 3 infections per 100 patient-days over 100 days (∑xᵢ=300, n=100). Prior on infection rate λ: Gamma(1,1). Compute the posterior mean, variance, and a 95% credible interval (approximate as posterior mean ± 2 posterior SD).
4. Posterior predictive: in the Beta-Binomial model with prior Beta(α,β) and observed k heads in n flips, show that P(next flip = head | data) = (α+k)/(α+β+n) by computing E[θ|data].
5. Two coins are in a bag: coin A is fair (P(H)=0.5), coin B is biased (P(H)=0.8). A coin is picked at random. After 5 flips yielding 4 heads, compute the posterior probability that the coin is B. (Treat this as a discrete-prior Bayesian inference problem.)

**P55 — Reflect & Consolidate:** "Bayesian: posterior ∝ likelihood × prior. Beta-Binomial: Beta(α+k, β+n−k). Normal-Normal: precisions add, means precision-weighted. Conjugacy = closed-form convenience. Credible interval ≠ confidence interval — it IS a probability statement about θ."

**P76 — Transfer Probe (Cross-link mode: math.stats.bayesian-inference):**
(a) Posterior concentration: by Bernstein-von Mises theorem, under mild conditions the posterior distribution concentrates around the true parameter value at rate 1/√n and becomes approximately Normal. This means Bayesian and frequentist inference agree asymptotically. Under what circumstances would they disagree significantly in finite samples? (b) Model selection via Bayes factors: BF₁₂ = P(data|model 1)/P(data|model 2) = ∫P(data|θ,M₁)P(θ|M₁)dθ / ∫P(data|θ,M₂)P(θ|M₂)dθ. A Bayes factor >10 is "strong evidence" for model 1 (Jeffreys scale). How is this different from a frequentist p-value? (c) Empirical Bayes: instead of specifying the prior P(θ|α) from domain knowledge, estimate the hyperparameter α from the data (maximize the marginal likelihood P(data|α)=∫P(data|θ)P(θ|α)dθ). Explain how this compromises the Bayesian interpretation but is computationally attractive for hierarchical models.

**P75 — Mastery Assessment:**
"A pharmaceutical company tests a new drug in a clinical trial. Let θ be the drug's true response rate. Prior (from previous trials): θ~Beta(10,10). The trial enrolls 50 patients; 32 respond. (a) Compute the posterior distribution of θ. (b) Compute the posterior mean and a 95% credible interval. (c) The company wants to claim the drug 'works' if P(θ>0.5|data)>0.90. Does the data support this claim? (Compute this posterior probability approximately: the posterior is Beta(42,28); Beta(42,28) has mean 42/70≈0.60 and most of its mass above 0.50.) (d) A competitor drug has θ₀=0.55. What is the posterior probability that the new drug is better: P(θ>0.55|data)?"

**P74 — Routing Decision:**
- Score ≥ 5/5 → MASTERED
- Score 4/5 → REVIEW conjugate update formulas and credible interval interpretation
- Score ≤ 3/5 → PREREQUISITE GAP in math.prob.bayes-theorem; reassign

**P78 — Completion:** Bayesian Inference certified. Student applies the Beta-Binomial, Normal-Normal, and Gamma-Poisson conjugate models; computes posterior summaries; constructs credible intervals; interprets the posterior predictive; connects to Bayesian statistics.

## Component 8 — P76 Transfer Probe Detail
**Mode: Cross-link** (cross_links = [math.stats.bayesian-inference])
Target: Bernstein-von Mises; Bayes factors vs. p-values; empirical Bayes
Skill tested: Connect probabilistic Bayesian updating to statistical inference and model comparison

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
