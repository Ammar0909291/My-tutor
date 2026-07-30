# Blueprint: math.prob.discrete-distributions

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.prob.discrete-distributions |
| name | Discrete Distributions |
| Domain | math.prob |
| Difficulty | proficient |
| Bloom level | apply |
| Estimated hours | 8 |
| Mastery threshold | 0.90 |
| MAMR | 5/5 |
| Prerequisites | math.prob.pmf |
| Cross-links | — |
| Unlocks | — |

## Component 1 — Learning Objective
The student states the PMF, mean, and variance of the Bernoulli(p), Binomial(n,p), Geometric(p), Negative Binomial(r,p), Poisson(λ), and Hypergeometric(N,K,n) distributions; identifies the real-world processes that generate each distribution; recognises the relationships between families (Geometric as special case of Negative Binomial; Poisson as limit of Binomial; Binomial sum of Bernoullis); and selects the correct distribution for a given scenario (sampling with vs. without replacement; bounded vs. unbounded counts; fixed vs. random number of trials).

## Component 2 — CPA Entry Stage
**C — Concrete** (present a table of five scenarios: (1) single fair coin flip; (2) 10 fair coin flips; (3) flipping until first head; (4) number of website visitors per minute; (5) drawing 3 cards from a 52-card deck without replacement and counting aces — for each scenario, ask the student which distribution applies, then complete the table together revealing: Bernoulli, Binomial, Geometric, Poisson, Hypergeometric)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | GEOMETRIC-COUNTS-FAILURES-OR-TRIALS | Student confuses two versions: X = number of failures before the first success (support {0,1,2,…}) vs. X = number of trials until first success (support {1,2,3,…}); applies the wrong PMF and gets mean p vs. 1/p confused | Type 5 — instruction-induced (different textbooks use different conventions; both are called "Geometric"; students switching sources see both and conflate them) |
| MC-2 | POISSON-REQUIRES-LARGE-N-SMALL-P | Student believes the Poisson distribution only applies as a Binomial approximation (n large, p small); doesn't know Poisson is a primary distribution for count data (customer arrivals, mutations, radioactive decay) in its own right | Type 5 — instruction-induced (Poisson is often first derived as a Binomial limit in introductory courses, so students associate it exclusively with the approximation context) |
| MC-3 | HYPERGEOMETRIC-IS-BINOMIAL-WITHOUT-REPLACEMENT | Student treats Hypergeometric as simply "Binomial but without replacement," correctly noting the sampling difference but failing to account for the changing probability at each draw; uses Binomial PMF with fixed p when n/N is not negligible | Type 1 — overgeneralisation (the without-replacement intuition is correct; the error is keeping p fixed at K/N instead of updating the probability at each draw, which changes the variance formula) |

## Component 4 — Session TA Cap
**Cap = 10** (hrs = 8 → cap 10)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**The six discrete distributions — a unified view:**

| Distribution | Setting | PMF P(X=k) | Mean | Variance |
|---|---|---|---|---|
| Bernoulli(p) | One trial: success or failure | p^k(1−p)^{1−k}, k∈{0,1} | p | p(1−p) |
| Binomial(n,p) | n independent trials, count successes | C(n,k)p^k(1−p)^{n−k}, k=0,…,n | np | np(1−p) |
| Geometric(p) | Trials until first success | (1−p)^{k−1}p, k=1,2,… | 1/p | (1−p)/p² |
| Neg.Binomial(r,p) | Trials until r-th success | C(k−1,r−1)p^r(1−p)^{k−r}, k=r,r+1,… | r/p | r(1−p)/p² |
| Poisson(λ) | Count of events in time/space | e^{−λ}λ^k/k!, k=0,1,2,… | λ | λ |
| Hypergeometric(N,K,n) | Sampling without replacement | C(K,k)C(N−K,n−k)/C(N,n) | nK/N | nK(N−K)(N−n)/[N²(N−1)] |

**Key relationships:**
- Binomial(n,p) = sum of n independent Bernoulli(p) random variables.
- Geometric(p) = Neg.Binomial(1,p).
- Poisson(λ) = limit of Binomial(n,p) as n→∞, p→0, np=λ fixed.
- Hypergeometric → Binomial as N→∞ with K/N=p fixed (sampling fraction n/N negligible).

**When to use which:**
- Fixed n trials, count successes → **Binomial**
- Count until first success (unlimited trials) → **Geometric**
- Count until r-th success → **Negative Binomial**
- Count events per unit time/space, unlimited support → **Poisson**
- Drawing from a finite population without replacement → **Hypergeometric**

**P49 checkpoint:**
- CORRECT → "Six distributions memorised: PMF, mean, variance, and when to use each. Relationships: Binomial=sum of Bernoulli; Geometric=NegBin(1,p); Poisson=Binomial limit." → A02
- PARTIAL (MC-1: Geometric confusion) → "Two conventions exist — always check which you're using. CONVENTION 1: X=trials until first success, P(X=k)=(1−p)^{k−1}p, k=1,2,…, E[X]=1/p. CONVENTION 2: X=failures before first success, P(X=k)=(1−p)^k p, k=0,1,…, E[X]=(1−p)/p. They differ by 1. This course uses Convention 1." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "5% of widgets are defective. A batch of 20 is tested. How many defective widgets do we expect? [Binomial(20, 0.05); mean=np=1.] What is P(exactly 2 defective)? [C(20,2)(0.05)²(0.95)^{18}≈0.189.] What if we test until we find the first defective — how many tests do we expect? [Geometric(0.05); mean=1/0.05=20.]" → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**The Poisson distribution in depth:**

**Three derivations of Poisson:**
1. **Limit of Binomial:** X~Binomial(n,p), np=λ fixed, n→∞. Then P(X=k)→e^{−λ}λ^k/k!.
2. **Poisson process axioms:** events occur at constant rate λ per unit time, independently, one at a time. Number of events in time t: Poisson(λt).
3. **Rare events:** if each of many trials independently has a tiny probability, the total count is approximately Poisson.

**Key property — additivity:** If X~Poisson(λ₁) and Y~Poisson(λ₂) are independent: X+Y~Poisson(λ₁+λ₂).

**Overdispersion:** If Var(X) > E[X] in count data, a Poisson model may be inadequate (Poisson has Var=Mean). Negative Binomial is a common alternative (allows overdispersion).

**Computing Poisson probabilities:**
P(X≤k) computed cumulatively; P(X≥k)=1−P(X≤k−1). Use recurrence: P(X=k+1)=λ/(k+1)·P(X=k) for efficient computation.

**P49 checkpoint:**
- CORRECT → "Poisson: mean=variance=λ. Primary model for arrivals/counts, not only Binomial limit. Additivity. Overdispersion → Negative Binomial." → Gate (P91)
- PARTIAL → "Poisson applies directly when events arrive at a constant rate. The Binomial derivation shows WHY Poisson works for rare events, but Poisson is a distribution in its own right — customer arrivals at a store (~120/hour) are NOT a Binomial limit, they're naturally Poisson." → TB-R02 → Gate
- INCORRECT → TB-R02 → Gate
- NO_RESPONSE → "Website gets 300 visitors/hour on average. (a) What is P(exactly 5 visitors in 1 minute)? [λ=300/60=5 per minute. P(X=5)=e^{-5}5^5/120≈0.175.] (b) P(at least 1 visitor in 1 minute)? [1−P(X=0)=1−e^{-5}≈0.993.]" → TB-R02 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 GEOMETRIC-COUNTS-FAILURES-OR-TRIALS):**
Step 1 — "The two versions: (A) X=trials until first success, P(X=k)=(1−p)^{k−1}p, k=1,2,…, E[X]=1/p, Var[X]=(1−p)/p². (B) X=failures before first success, P(X=k)=(1−p)^k p, k=0,1,…, E[X]=(1−p)/p."
Step 2 — "They are related: if X_A is Version A and X_B is Version B, then X_A=X_B+1. So E[X_A]=E[X_B]+1=1/p."
Step 3 — "Always identify which version before computing: 'How many flips to get the first head?' → trials-based (A), support starts at 1. 'How many tails before the first head?' → failures-based (B), support starts at 0."

**TB-R02 (MC-2 + MC-3 combined):**
Step 1 — "Poisson is a primary distribution, not a derived one. Radioactive decay, mutation rates, phone call arrivals — all Poisson because of the Poisson process axioms, not because n is large and p is small."
Step 2 — "Hypergeometric vs Binomial: drawing WITHOUT replacement changes the probability at each step. Hypergeometric accounts for this exactly. Binomial with p=K/N approximates it when n/N is small (large population). If n/N>10%, use Hypergeometric."
Step 3 — "Hypergeometric variance: nK(N−K)(N−n)/[N²(N−1)]. Note the factor (N−n)/(N−1) < 1, called the finite population correction factor. It makes the variance smaller than Binomial's np(1−p) — without replacement reduces variability."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (5 items):**
1. X~Binomial(15, 0.3). Compute (a) E[X] and Var[X]; (b) P(X=4); (c) P(X≥2) using P(X≥2)=1−P(X=0)−P(X=1).
2. A fair die is rolled until a 6 appears. Let X be the number of rolls needed. (a) Identify the distribution of X and its parameters. (b) Compute E[X], Var[X], and P(X>10). (c) What is the probability of needing more than 12 rolls, given you've already needed more than 6? (Apply the memoryless property.)
3. A call centre receives 8 calls per hour on average. Using the Poisson model: (a) P(exactly 10 calls in the next hour); (b) P(at least 1 call in the next 15 minutes); (c) E[number of calls in the next 3 hours].
4. A production line has 5% defective items. An inspector draws 10 items from a batch of 100 without replacement. Let X = number of defective items drawn. (a) Identify the exact distribution and compute E[X] and Var[X]. (b) Compare with the Binomial approximation. How large would the batch need to be for the Binomial approximation to have relative error less than 10% on the variance?
5. A Negative Binomial: a basketball player makes each free throw independently with probability 0.80. What is the probability of needing more than 5 attempts to make 3 shots? (Compute P(X>5) where X~NegBinomial(r=3, p=0.8) using the trials-until-r-th-success convention.)

**P55 — Reflect & Consolidate:** "Six distributions: Bernoulli (one trial) → Binomial (fixed n) → Geometric (until first success) → Neg.Binomial (until r-th success) → Poisson (count in time/space) → Hypergeometric (without replacement). Relationships: sum/limit/special-case chains. Selection: identify fixed n, unlimited trials, rate-based, or finite population."

**P76 — Transfer Probe (Independence mode):**
(a) Compound distributions: if N~Poisson(λ) and X₁,X₂,… are i.i.d. with mean μ and variance σ², and S=X₁+⋯+X_N is a random sum, show E[S]=λμ and Var(S)=λ(σ²+μ²)=λE[X²]. (Use the law of total expectation and total variance.) (b) The Conway-Maxwell-Poisson (CMP) distribution generalises Poisson to handle both underdispersion (Var<Mean, as in queuing systems) and overdispersion (Var>Mean, as in count data with clustering). For what real-world applications would each regime arise? (c) Zero-inflated Poisson: in count data with excess zeros (e.g., number of doctor visits, where many people visit zero times regardless of their health), a mixture of a point mass at 0 and a Poisson(λ) is often used. Write the PMF and identify when standard Poisson would underfit.

**P75 — Mastery Assessment:**
"A blood bank needs to classify donors by blood type. 45% are Type O, 40% Type A, 11% Type B, 4% Type AB. 20 donors arrive. (a) Let X = number of Type O donors. What is the distribution of X? Compute E[X] and P(X≥10). (b) The blood bank needs to collect Type O until it has 8 Type O donors. Let Y = total donors processed. What is the distribution of Y? Compute E[Y]. (c) If the blood bank has a capacity of 25 donors per day and follows a Poisson process with λ=20 donors per day, what is the probability that the bank is overwhelmed (more than 25 donors arrive)? (d) Compare parts (a) and (c): one is Binomial and one is Poisson. Why is each model appropriate for its setting?"

**P74 — Routing Decision:**
- Score ≥ 5/5 → MASTERED
- Score 4/5 → REVIEW Poisson and Hypergeometric PMF formulas
- Score ≤ 3/5 → PREREQUISITE GAP in math.prob.pmf; reassign

**P78 — Completion:** Discrete Distributions certified. Student identifies and applies all six families; computes PMF, mean, and variance; recognises when each applies; connects the distribution families via sum/limit relationships.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Compound Poisson; Conway-Maxwell-Poisson; zero-inflated Poisson
Skill tested: Extend the six classical families to modern count-data models

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
