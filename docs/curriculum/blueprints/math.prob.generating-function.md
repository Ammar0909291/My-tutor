# Blueprint: math.prob.generating-function

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.prob.generating-function |
| name | Generating Function |
| Domain | math.prob |
| Difficulty | expert |
| Bloom level | apply |
| Estimated hours | 4 |
| Mastery threshold | 0.75 |
| MAMR | 4/5 |
| Prerequisites | math.prob.pmf |
| Cross-links | — |
| Unlocks | — |

## Component 1 — Learning Objective
The student defines the probability generating function (PGF) G_X(z)=E[z^X]=∑_{k=0}^∞ P(X=k)z^k for non-negative integer-valued X; computes moments from the PGF via G^{(r)}(1)=E[X(X−1)⋯(X−r+1)]; defines the moment generating function (MGF) M_X(t)=E[e^{tX}] for any random variable; recovers moments via M^{(r)}(0)=E[X^r]; applies the key property that independence implies M_{X+Y}(t)=M_X(t)M_Y(t) (PGF: G_{X+Y}(z)=G_X(z)G_Y(z)); and uses PGFs to identify distributions via their generating function.

## Component 2 — CPA Entry Stage
**P — Pictorial** (draw the power series G(z)=P(X=0)+P(X=1)z+P(X=2)z²+⋯ as a "probability encoding machine" where each power of z carries the probability of that outcome; annotate: "z=1 → G(1)=∑P(X=k)=1 (total probability); G'(1)=E[X]; G''(1)=E[X(X−1)]; the coefficient of z^k IS P(X=k)" — the generating function is a compact way to store the entire PMF)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | MGF-IS-JUST-A-TRICK-NOT-A-DISTRIBUTION-TOOL | Student treats the MGF as a computational shortcut but doesn't know it UNIQUELY determines the distribution: two random variables with the same MGF (wherever it exists) have identical distributions | Type 5 — instruction-induced (MGFs are introduced as "moment machines"; the uniqueness theorem is often mentioned briefly or omitted; students don't realise the MGF carries all distributional information, not just moments) |
| MC-2 | G-PRIME-AT-1-GIVES-E[X-SQUARED] | Student differentiates G(z) once and evaluates at z=1 to get E[X²]; actually gets E[X(X−1)]=E[X²]−E[X]; doesn't apply the formula E[X²]=G''(1)+G'(1) to correct this | Type 1 — overgeneralisation (the first derivative evaluated at a CDF function gives a specific quantity; students apply the "derivative at a point gives a moment" heuristic without tracking the falling factorial vs. raw moment distinction) |
| MC-3 | INDEPENDENCE-MEANS-PGFS-ADD | Student writes G_{X+Y}(z)=G_X(z)+G_Y(z) for independent X,Y instead of the correct product rule G_{X+Y}(z)=G_X(z)G_Y(z) | Type 1 — overgeneralisation (convolution of PMFs involves a sum — P_{X+Y}(k)=∑P_X(j)P_Y(k−j) — and students conflate "summing probabilities" with "adding generating functions"; the power-series multiplication is the correct mechanism) |

## Component 4 — Session TA Cap
**Cap = 6** (hrs = 4 → cap 6)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Probability Generating Function (PGF):**

**Definition:** For a non-negative integer-valued random variable X:
G_X(z) = E[z^X] = ∑_{k=0}^∞ P(X=k)·z^k

This is a power series in z; convergent for |z|≤1.

**Recovering probabilities:** P(X=k) = G^{(k)}(0)/k! (coefficient of z^k, found by differentiating k times and evaluating at 0).

**Recovering moments (falling factorial moments):**
- G'(z) = ∑_{k=1}^∞ k·P(X=k)·z^{k−1} → G'(1) = E[X]
- G''(z) = ∑_{k=2}^∞ k(k−1)·P(X=k)·z^{k−2} → G''(1) = E[X(X−1)] = E[X²] − E[X]
- So E[X²] = G''(1) + G'(1) and Var(X) = G''(1) + G'(1) − [G'(1)]²

**PGF of common distributions:**
- Bernoulli(p): G(z) = 1−p+pz
- Binomial(n,p): G(z) = (1−p+pz)^n (power of Bernoulli PGF — confirms: sum of n independent Bernoullis)
- Geometric(p) (trials until first success): G(z) = pz/(1−(1−p)z) for |z|<1/(1−p)
- Poisson(λ): G(z) = e^{λ(z−1)}

**Product rule for independent variables:** If X⊥Y:
G_{X+Y}(z) = E[z^{X+Y}] = E[z^X]·E[z^Y] = G_X(z)·G_Y(z)

**Proof of Binomial PGF:** Sum of n independent Bernoulli(p): G_{X+…+X_n}(z)=(1−p+pz)^n. ✓ This is how PGFs prove Binomial = n independent Bernoullis.

**P49 checkpoint:**
- CORRECT → "G(z)=∑P(X=k)z^k. G'(1)=E[X]. G''(1)=E[X²]−E[X]. Independent sum: G_{X+Y}=G_X·G_Y." → A02
- PARTIAL (MC-2: G''(1)=E[X²]) → "G'(z)=∑k·P(k)·z^{k−1}. At z=1: G'(1)=∑k·P(k)=E[X]. ✓. G''(z)=∑k(k−1)P(k)z^{k−2}. At z=1: G''(1)=∑k(k−1)P(k)=E[X(X−1)]=E[X²−X]=E[X²]−E[X]. So E[X²]=G''(1)+G'(1), NOT just G''(1)." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "X~Poisson(3). G(z)=e^{3(z−1)}. Compute G'(z)=3e^{3(z−1)}. G'(1)=3=E[X]. ✓. G''(z)=9e^{3(z−1)}. G''(1)=9=E[X(X−1)]=E[X²]−E[X]. E[X²]=9+3=12. Var(X)=12−9=3=λ. ✓" → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**Moment Generating Function (MGF):**

**Definition:** M_X(t) = E[e^{tX}] = ∑_{k=0}^∞ E[X^k]·t^k/k! (when this exists in a neighbourhood of t=0).

**Recovering raw moments:** M^{(r)}(0) = E[X^r].
- M'(0) = E[X], M''(0) = E[X²], M'''(0) = E[X³], …

**MGF of common distributions:**
- Bernoulli(p): M(t) = 1−p+pe^t
- Binomial(n,p): M(t) = (1−p+pe^t)^n
- Normal(μ,σ²): M(t) = e^{μt+σ²t²/2}
- Exponential(λ): M(t) = λ/(λ−t) for t<λ
- Poisson(λ): M(t) = e^{λ(e^t−1)}

**Product rule for independent variables:** M_{X+Y}(t) = M_X(t)·M_Y(t) for X⊥Y.

**Uniqueness theorem:** If M_X(t) = M_Y(t) for all t in a neighbourhood of 0, then X and Y have the same distribution.

**Application — sum of normals:** X~N(μ₁,σ₁²), Y~N(μ₂,σ₂²), independent:
M_{X+Y}(t) = e^{μ₁t+σ₁²t²/2}·e^{μ₂t+σ₂²t²/2} = e^{(μ₁+μ₂)t+(σ₁²+σ₂²)t²/2}

This is the MGF of N(μ₁+μ₂, σ₁²+σ₂²). By uniqueness: X+Y~N(μ₁+μ₂, σ₁²+σ₂²). ✓

**P49 checkpoint:**
- CORRECT → "M(t)=E[e^{tX}]. M^{(r)}(0)=E[X^r]. Independent sum: M_{X+Y}=M_X·M_Y. Uniqueness: MGF determines distribution." → Gate (P91)
- PARTIAL (MC-3: PGFs add instead of multiply) → "For INDEPENDENT X,Y: G_{X+Y}(z)=E[z^{X+Y}]=E[z^X·z^Y]=E[z^X]E[z^Y]=G_X(z)G_Y(z). They MULTIPLY. Intuition: the PGF of a sum is the PRODUCT of PGFs (like Laplace transforms of convolutions). PMF convolution is the coefficient-level operation; PGF multiplication is the transform-level operation." → TB-R02 → Gate
- INCORRECT → TB-R02 → Gate
- NO_RESPONSE → "X~N(0,1). M(t)=e^{t²/2}. Compute M'(t)=te^{t²/2}. M'(0)=0=E[X]. ✓. M''(t)=(1+t²)e^{t²/2}. M''(0)=1=E[X²]. ✓. Var(X)=E[X²]−(E[X])²=1−0=1. ✓" → TB-R02 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-2 G''(1)=E[X²]):**
Step 1 — "Write out G''(z) explicitly: G''(z)=∑_{k=2}^∞ k(k−1)P(X=k)z^{k−2}. At z=1: G''(1)=∑k(k−1)P(k)=E[X²−X]=E[X²]−E[X]. NOT E[X²]."
Step 2 — "Think of it as factorial moments: G^{(r)}(1)=E[X^{(r)}]=E[X(X−1)⋯(X−r+1)] (falling factorial). Raw moments require conversion: E[X²]=E[X^{(2)}]+E[X^{(1)}]=G''(1)+G'(1)."
Step 3 — "Check with Bernoulli(p): G(z)=1−p+pz. G'(z)=p. G'(1)=p=E[X]. ✓. G''(z)=0. G''(1)=0=E[X(X−1)]=E[X²]−E[X]=p−p=0. ✓. So E[X²]=0+p=p. ✓ (for 0/1 valued variable, X²=X)."

**TB-R02 (MC-3 PGFs ADD):**
Step 1 — "For independent X,Y: G_{X+Y}(z)=E[z^{X+Y}]=E[z^X·z^Y]. Independence means we can separate: E[z^X·z^Y]=E[z^X]·E[z^Y]=G_X(z)G_Y(z). PRODUCT, not sum."
Step 2 — "Connection to convolution: if you multiply power series (1-p+pz)(1-p+pz), the coefficient of z^k in the product is ∑_{j=0}^k P(X=j)P(Y=k-j) = P(X+Y=k). Multiplying generating functions is equivalent to convolving PMFs."
Step 3 — "Adding generating functions would give ∑_{k}[P(X=k)+P(Y=k)]z^k — this doesn't even integrate to 1 (it sums to 2). It's not a probability distribution."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (5 items):**
1. X~Geometric(p) with PMF P(X=k)=(1−p)^{k−1}p, k=1,2,…. (a) Compute the PGF G(z). (b) Use G'(1) to find E[X]. (c) Use G''(1) to find Var(X). Verify against the known formula (1−p)/p².
2. X and Y are independent Poisson(λ) random variables. Use MGFs to show X+Y~Poisson(2λ).
3. The PGF of a distribution is G(z)=z³. Identify the distribution. (Hint: expand as a power series — what are the probabilities?)
4. X~Binomial(n,p). (a) Use the PGF to derive E[X] and Var[X]. (b) Confirm Var(X)=np(1−p) via the formula Var(X)=G''(1)+G'(1)−[G'(1)]².
5. X~Exponential(2). The MGF is M(t)=2/(2−t) for t<2. (a) Compute E[X] and E[X²] using derivatives of M at t=0. (b) Verify: E[X]=1/2 (mean of Exp(2)), Var(X)=1/4.

**P55 — Reflect & Consolidate:** "PGF: G(z)=E[z^X], G'(1)=E[X], G''(1)=E[X(X−1)]. MGF: M(t)=E[e^{tX}], M^{(r)}(0)=E[X^r]. Independent sums: generating functions MULTIPLY. Uniqueness: same MGF → same distribution."

**P76 — Transfer Probe (Independence mode):**
(a) Characteristic functions: φ_X(t)=E[e^{itX}] (replacing t by it in the MGF) always exist for any distribution, unlike MGFs. By the Lévy continuity theorem, convergence of characteristic functions implies convergence in distribution. This is the key tool in proving the Central Limit Theorem. (b) Compound Poisson: let S=X₁+⋯+X_N where N~Poisson(λ) and X_i are i.i.d. Show that G_S(z)=G_N(G_X(z))=e^{λ(G_X(z)−1)}. (This is the composition of PGFs, not the product.) (c) The Z-transform in signal processing is G(z)=∑_{k=0}^∞ p_k z^{-k} — the inverse of the PGF convention. How does the Z-transform's convolution theorem correspond to the PGF product rule for independent sums?

**P75 — Mastery Assessment:**
"Let X₁, X₂, X₃ be independent, each Geometric(p) (trials-until-first-success convention). Their sum Y=X₁+X₂+X₃~Negative Binomial(r=3, p). (a) Compute G_Y(z) using the PGF product rule. (b) Use G_Y'(1) to find E[Y]=3/p. (c) Use G_Y''(1)+G_Y'(1)−[G_Y'(1)]² to find Var(Y)=3(1−p)/p². (d) Identify the PGF G_Y(z)=(pz/(1−(1−p)z))³ — verify it matches the known NegBin(3,p) PGF. (e) Evaluate M_Y(t) (the MGF) and use it to derive E[Y] independently."

**P74 — Routing Decision:**
- Score ≥ 5/5 → MASTERED
- Score 4/5 → REVIEW falling factorial moment formula and product rule
- Score ≤ 3/5 → PREREQUISITE GAP in math.prob.pmf; reassign

**P78 — Completion:** Generating Function certified. Student computes PGFs and MGFs; extracts moments; applies the product rule for independent sums; uses uniqueness theorem; connects PGF to characteristic functions.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Characteristic functions; compound PGF; Z-transform connection
Skill tested: Extend generating functions to CLT proof tools and signal processing analogues

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
