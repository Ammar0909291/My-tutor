# Blueprint: math.prob.bayes-theorem

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.prob.bayes-theorem |
| name | Bayes' Theorem |
| Domain | math.prob |
| Difficulty | proficient |
| Bloom level | apply |
| Estimated hours | 5 |
| Mastery threshold | 0.90 |
| MAMR | 5/5 |
| Prerequisites | math.prob.total-probability |
| Cross-links | math.stats.bayesian-inference |
| Unlocks | math.prob.bayesian-inference |

## Component 1 — Learning Objective
The student states Bayes' theorem P(B|A)=P(A|B)P(B)/P(A); identifies the roles of prior P(B), likelihood P(A|B), posterior P(B|A), and normalising constant P(A); computes P(A) using the law of total probability when needed; applies Bayes' theorem to update beliefs given evidence in medical testing, spam filtering, and base-rate neglect scenarios; and distinguishes the posterior from the likelihood (avoiding the classic confusion of P(disease|test+) with P(test+|disease)).

## Component 2 — CPA Entry Stage
**P — Pictorial** (draw a 2×2 frequency table with columns Test+ / Test− and rows Disease / No disease, filled with counts for a realistic scenario: e.g. 1000 people, 10 have disease, 9 test positive correctly, 100 false positives; show that P(disease|test+)=9/109≈8.3% even though sensitivity=90%; annotate which cells correspond to prior×likelihood in each quadrant; connect to the formula below the table)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | POSTERIOR-EQUALS-LIKELIHOOD | Student writes P(B|A)=P(A|B) or computes P(disease|test+)=P(test+|disease)=sensitivity; ignores the prior and base rate entirely | Type 5 — instruction-induced (sensitivity is the headline number reported for medical tests; students compute "how likely is a positive test given disease" and reverse it without Bayes) |
| MC-2 | BASE-RATE-NEGLECT | Student focuses only on sensitivity and specificity, ignores P(disease); computes a posterior far too high when the prior is very small (e.g. rare disease scenario) | Type 3 — language contamination ("the test is 95% accurate" implies P(disease|test+)≈0.95 in everyday language, conflating test accuracy with posterior probability) |
| MC-3 | BAYES-ONLY-WORKS-FOR-TWO-HYPOTHESES | Student applies the formula only when B is binary (disease/no disease); doesn't extend to partitions B₁,…,Bₙ with the generalised form P(Bᵢ|A)=P(A|Bᵢ)P(Bᵢ)/∑ⱼP(A|Bⱼ)P(Bⱼ) | Type 5 — instruction-induced (all introductory examples use exactly two hypotheses; the general partition form is rarely shown) |

## Component 4 — Session TA Cap
**Cap = 7** (hrs = 5 → cap 7)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Bayes' theorem — inverting conditional probability:**

**Derivation (trivial):** P(A∩B) = P(B|A)P(A) = P(A|B)P(B). Divide both sides by P(A):

**Bayes' theorem:** P(B|A) = P(A|B)·P(B) / P(A)

**When P(A) is unknown:** Use the law of total probability with partition {B, Bᶜ}:
P(A) = P(A|B)P(B) + P(A|Bᶜ)P(Bᶜ)

So: P(B|A) = P(A|B)·P(B) / [P(A|B)P(B) + P(A|Bᶜ)P(Bᶜ)]

**Four quantities:**
- **Prior** P(B): belief about B before observing A
- **Likelihood** P(A|B): probability of observing A if B is true
- **Posterior** P(B|A): updated belief after observing A
- **Evidence** P(A): normalising constant (ensures posterior sums to 1)

**Classic medical testing example:**
- 1% prevalence: P(D)=0.01, P(Dᶜ)=0.99
- Sensitivity: P(+|D)=0.95
- Specificity: P(−|Dᶜ)=0.90, so P(+|Dᶜ)=0.10
- P(+) = 0.95×0.01 + 0.10×0.99 = 0.0095+0.099 = 0.1085
- **P(D|+) = 0.0095/0.1085 ≈ 8.8%** — not 95%!

The 95% sensitivity is P(+|D), NOT P(D|+). Base-rate neglect: 99% of people don't have the disease, so even a specific test produces many false positives.

**Generalised Bayes (partition B₁,…,Bₙ):**
P(Bᵢ|A) = P(A|Bᵢ)P(Bᵢ) / ∑ⱼP(A|Bⱼ)P(Bⱼ)

**P49 checkpoint:**
- CORRECT → "P(B|A)=P(A|B)P(B)/P(A). Prior×Likelihood/Evidence=Posterior. Medical test: posterior ≠ sensitivity. Generalised form for partitions." → A02
- PARTIAL (MC-1: posterior = likelihood) → "P(+|D)=0.95 is the LIKELIHOOD — probability of testing positive IF you have the disease. P(D|+) is the POSTERIOR — probability of having the disease given you tested positive. They are not equal: P(D|+)=P(+|D)P(D)/P(+)=0.95×0.01/0.1085≈0.088. The prior P(D)=0.01 is what flips the number." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "1% of people have disease D. A test has sensitivity 90% (P(+|D)=0.90) and false positive rate 5% (P(+|Dᶜ)=0.05). A random person tests positive. What is P(D|+)? Step 1: P(+)=0.90×0.01+0.05×0.99=0.009+0.0495=0.0585. Step 2: P(D|+)=0.009/0.0585≈15.4%." → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**Successive updates and sequential Bayes:**

**Key insight:** The posterior from one observation becomes the prior for the next.

**Example (sequential updates):**
- Start: P(fair coin)=P(biased coin)=0.5. Biased coin: P(H|biased)=0.9.
- Observe H. P(fair|H)=P(H|fair)×0.5/P(H)=(0.5×0.5)/(0.5×0.5+0.9×0.5)=0.25/0.70≈0.357.
- Observe another H (using 0.357 as new prior for fair).
- After k consecutive heads: posterior for "fair" shrinks exponentially (ratio 0.5/0.9 per head).

**Odds form (more convenient for updating):**
Posterior odds = Likelihood ratio × Prior odds.
P(B|A)/P(Bᶜ|A) = [P(A|B)/P(A|Bᶜ)] × [P(B)/P(Bᶜ)]

Posterior odds = Bayes factor × prior odds. A Bayes factor >1 supports B; <1 supports Bᶜ.

**P49 checkpoint:**
- CORRECT → "Posterior becomes next prior. Odds form: posterior odds = Bayes factor × prior odds. Sequential Bayes." → Gate (P91)
- PARTIAL → "Each new observation updates the belief. The posterior from observation 1 is the prior for observation 2. Multiply Bayes factors: after k heads, odds(fair)/odds(biased) = (0.5/0.9)^k × prior odds." → TB-R02 → Gate
- INCORRECT → TB-R02 → Gate
- NO_RESPONSE → "Prior odds of fair=1:1. Bayes factor for one H is P(H|fair)/P(H|biased)=0.5/0.9≈0.556. After 2 H: odds of fair = 0.556²×1=0.309:1. So P(fair|HH)=0.309/1.309≈0.236." → TB-R02 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 + MC-2 combined — POSTERIOR-EQUALS-LIKELIHOOD + BASE-RATE-NEGLECT):**
Step 1 — "Draw the 1000-person frequency table: 10 have disease, 990 don't. 9 of the 10 test positive (sensitivity 90%). 99 of the 990 test positive (false positive rate 10%). Of the 108 who test positive: 9 have disease → P(disease|positive)=9/108≈8.3%. NOT 90%."
Step 2 — "The prior (1% prevalence) does the heavy lifting. If prevalence were 50%, P(disease|positive) would be 90/(90+50)≈64%. If prevalence were 0.1%, P(disease|positive) would be ≈0.9%. The base rate drives the posterior."
Step 3 — "Formula: P(D|+)=P(+|D)P(D)/P(+). You CANNOT skip P(D). Sensitivity P(+|D) is only one of three inputs."

**TB-R02 (MC-3 BAYES-ONLY-WORKS-FOR-TWO-HYPOTHESES):**
Step 1 — "For any partition {B₁,…,Bₙ}: P(Bᵢ|A)=P(A|Bᵢ)P(Bᵢ)/∑ⱼP(A|Bⱼ)P(Bⱼ). The denominator sums over ALL hypotheses."
Step 2 — "Example: three machines produce defective items at rates 2%, 5%, 8% with proportions 50%, 30%, 20%. A defective is found. P(machine A|defective)=(0.02×0.50)/(0.02×0.50+0.05×0.30+0.08×0.20)=0.010/(0.010+0.015+0.016)=0.010/0.041≈24%."
Step 3 — "The two-hypothesis form is the special case n=2 with B₂=Bᶜ. For n hypotheses, add n terms in the denominator — structure is identical."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (5 items):**
1. A disease affects 0.5% of the population. A test has sensitivity 98% and specificity 95%. (a) Compute P(+). (b) Compute P(disease|+). (c) Compute P(disease|−). (Why is P(disease|−) so small — what does a negative test tell you here?)
2. A spam filter: 30% of emails are spam. P(word "prize"|spam)=0.40, P("prize"|not spam)=0.01. A new email contains "prize". What is P(spam|"prize")?
3. Three urns: Urn A has 2 red/1 blue, Urn B has 1 red/2 blue, Urn C has 3 red/0 blue. An urn is chosen uniformly at random and one ball is drawn; it is red. Find P(Urn C | red).
4. A person tests positive for a rare condition (prevalence 1 in 10,000). The test has 99% sensitivity and 99% specificity. What is P(condition|positive)? Explain why this is surprising.
5. A coin is either fair (P=0.5) or biased (P=0.7), each equally likely. After 5 flips: HHHTH. Compute the posterior probability that the coin is biased.

**P55 — Reflect & Consolidate:** "Bayes: Posterior=Prior×Likelihood/Evidence. P(B|A)=P(A|B)P(B)/P(A). Posterior≠likelihood (the classic inversion error). Low prevalence → low posterior even with high sensitivity. Sequential: posterior becomes new prior."

**P76 — Transfer Probe (Cross-link mode: math.stats.bayesian-inference):**
(a) In Bayesian statistics, the prior distribution P(θ) represents beliefs about a parameter θ before seeing data. The likelihood L(θ)=P(data|θ) represents how probable the data is for each θ. The posterior P(θ|data)∝P(data|θ)P(θ) is proportional to likelihood×prior — the normalising constant P(data)=∫P(data|θ)P(θ)dθ is the marginal likelihood. This is Bayes' theorem in continuous form. (b) Conjugate priors: if X|θ~Binomial(n,θ) and θ~Beta(a,b), then θ|X=k~Beta(a+k, b+n−k). Why is this convenient? (c) Credible interval vs. confidence interval: a 95% Bayesian credible interval [L,U] means P(θ∈[L,U]|data)=0.95. A 95% frequentist confidence interval does NOT mean this — it means that 95% of intervals constructed by this procedure contain the true θ. Which interpretation do most practitioners actually want?

**P75 — Mastery Assessment:**
"An airport security scanner has sensitivity 99% (P(alarm|weapon)=0.99) and false alarm rate 0.1% (P(alarm|no weapon)=0.001). Suppose 1 in 1,000,000 passengers carries a weapon. (a) What fraction of passengers trigger an alarm? (b) Given a passenger triggers an alarm, what is the probability they carry a weapon? (c) The airport adds a second independent scanner. If the first scanner alarmed, what is P(weapon|both alarm)? (Use the posterior from (b) as the new prior.) (d) Comment on the design implication: is it better to have one very sensitive scanner or two moderately sensitive ones?"

**P74 — Routing Decision:**
- Score ≥ 5/5 → MASTERED
- Score 4/5 → REVIEW base-rate neglect and the prior's role
- Score ≤ 3/5 → PREREQUISITE GAP in math.prob.total-probability; reassign

**P78 — Completion:** Bayes' Theorem certified. Student derives and applies Bayes' formula; distinguishes posterior from likelihood; correctly uses the prior; extends to partitions; connects to Bayesian statistics.

## Component 8 — P76 Transfer Probe Detail
**Mode: Cross-link** (cross_links = [math.stats.bayesian-inference])
Target: Continuous Bayes; conjugate priors; credible vs. confidence intervals
Skill tested: Connect discrete Bayes' theorem to Bayesian statistical inference

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
