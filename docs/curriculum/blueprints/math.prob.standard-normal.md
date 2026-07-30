# Blueprint: math.prob.standard-normal

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.prob.standard-normal |
| name | Standard Normal Distribution |
| Domain | math.prob |
| Difficulty | proficient |
| Bloom level | apply |
| Estimated hours | 3 |
| Mastery threshold | 0.90 |
| MAMR | 5/5 |
| Prerequisites | math.prob.normal-distribution |
| Cross-links | — |
| Unlocks | — |

## Component 1 — Learning Objective
The student defines the standard normal Z~N(0,1) with PDF φ(z)=(2π)^{-1/2}e^{−z²/2} and CDF Φ(z); converts any normal X~N(μ,σ²) to Z=(X−μ)/σ (standardisation); uses z-tables or the Φ function to compute normal probabilities; applies the 68-95-99.7 rule; and computes normal probabilities involving sums of independent normals using the fact that X+Y~N(μ_X+μ_Y, σ_X²+σ_Y²) when X,Y are independent normals.

## Component 2 — CPA Entry Stage
**P — Pictorial** (draw the bell curve of N(0,1) centred at 0; shade the region between −1 and +1 (68%), between −2 and +2 (95%), between −3 and +3 (99.7%); annotate Φ(1)≈0.841, Φ(−1)=1−Φ(1)≈0.159; the area between −1 and 1 is Φ(1)−Φ(−1)=2Φ(1)−1≈0.683)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | ALL-NORMAL-DISTRIBUTIONS-ARE-STANDARD | Student computes P(X≤10) for X~N(5,4) as Φ(10) instead of Φ((10−5)/2); forgets to standardise | Type 5 — instruction-induced (problems about N(0,1) appear first and feel canonical; students apply the Φ table directly to non-standard normals without converting) |
| MC-2 | SYMMETRY-MEANS-Φ(−z)=Φ(z) | Student states Φ(−z)=Φ(z); doesn't apply the correct symmetry Φ(−z)=1−Φ(z); computes P(Z<−1)=Φ(1)≈0.84 instead of 1−Φ(1)≈0.16 | Type 1 — overgeneralisation (φ(−z)=φ(z) IS true for the PDF; students apply PDF symmetry to the CDF, which is not symmetric but satisfies Φ(−z)=1−Φ(z)) |
| MC-3 | STANDARD-DEVIATION-IS-THE-STANDARDISED-SCORE | Student confuses σ (standard deviation of X) with z=(x−μ)/σ (the standardised score, also called z-score); interprets all z-scores as standard deviations | Type 3 — language contamination ("standard" appears in both "standard deviation" and "standardised score"; z-score is sometimes called "standard deviation units from the mean" which reinforces confusion) |

## Component 4 — Session TA Cap
**Cap = 5** (hrs = 3 → cap 5)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Standardisation — the bridge from any Normal to tables:**

**Step:** X~N(μ,σ²) → Z=(X−μ)/σ ~ N(0,1).

Why? E[Z]=E[(X−μ)/σ]=(μ−μ)/σ=0. Var(Z)=Var(X)/σ²=σ²/σ²=1. Linear transformation of Normal is Normal (closure under linear transformations).

**CDF conversion:** P(X≤x) = P(Z≤(x−μ)/σ) = Φ((x−μ)/σ).

**Symmetry of Φ:** Since Z and −Z have the same distribution: Φ(−z) = P(Z≤−z) = P(Z≥z) = 1−Φ(z).

**68-95-99.7 rule:**
- P(μ−σ≤X≤μ+σ) = P(−1≤Z≤1) = Φ(1)−Φ(−1) = 2Φ(1)−1 ≈ 0.683
- P(μ−2σ≤X≤μ+2σ) ≈ 0.954
- P(μ−3σ≤X≤μ+3σ) ≈ 0.997

**Worked examples** (X~N(70,100), σ=10):
- P(X≤85) = Φ((85−70)/10) = Φ(1.5) ≈ 0.933
- P(X<55) = Φ((55−70)/10) = Φ(−1.5) = 1−Φ(1.5) ≈ 0.067
- P(60≤X≤80) = Φ(1)−Φ(−1) ≈ 0.683

**Sum of independent Normals:** If X~N(μ₁,σ₁²) ⊥ Y~N(μ₂,σ₂²): X+Y~N(μ₁+μ₂,σ₁²+σ₂²). Note: VARIANCES add, not standard deviations.

**P49 checkpoint:**
- CORRECT → "Z=(X−μ)/σ~N(0,1). Φ(−z)=1−Φ(z). P(X≤x)=Φ((x−μ)/σ). Independent sum: variances add." → Gate (P91)
- PARTIAL (MC-2 symmetry error) → "φ(−z)=φ(z) (the DENSITY is symmetric). But Φ(−z)=1−Φ(z) (the CDF satisfies this, not Φ(−z)=Φ(z)). Draw the bell curve: P(Z<−1)=the LEFT tail probability = 1−P(Z<1)=1−Φ(1)≈0.159, not 0.841." → TB-R01 → Gate
- INCORRECT → TB-R01 → Gate
- NO_RESPONSE → "X~N(100,25). Compute P(X>110). Step 1: z=(110−100)/5=2. Step 2: P(X>110)=P(Z>2)=1−Φ(2)≈1−0.977=0.023." → TB-R01 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 + MC-2 combined):**
Step 1 — "Standardise FIRST: z=(x−μ)/σ. Then look up Φ(z). Never look up Φ(x) for a non-standard normal."
Step 2 — "Symmetry: Φ(−z)=1−Φ(z). Proof: P(Z≤−z)=P(−Z≥z)=P(Z≥z)=1−P(Z≤z)=1−Φ(z). (Used Z and −Z have the same distribution because φ(x)=φ(−x).)"
Step 3 — "Interval: P(a≤X≤b)=Φ((b−μ)/σ)−Φ((a−μ)/σ). Always upper minus lower. Always standardise both endpoints."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (5 items):**
1. X~N(50,16). Compute: (a) P(X≤54); (b) P(X>46); (c) P(44≤X≤56). [Φ(1)≈0.841, Φ(−1)≈0.159.]
2. Heights of adults are N(170,100) cm. What percentage are (a) taller than 180 cm; (b) between 160 and 180 cm?
3. X~N(0,1), Y~N(0,1) independent. What is the distribution of X+Y? Of X−Y? Of 2X? Of X+2Y?
4. Φ(1.96)≈0.975. What is P(|Z|≤1.96)? What is P(|Z|>1.96)? (These are the 95% confidence interval bounds for the Normal.)
5. If P(X>c)=0.05 and X~N(100,25), find c. (Hint: P(X>c)=0.05 means P(X≤c)=0.95, so Φ((c−100)/5)=0.95. Use Φ(1.645)≈0.95.)

**P55 — Reflect & Consolidate:** "Z=(X−μ)/σ. Φ(z)=P(Z≤z). Φ(−z)=1−Φ(z). 68-95-99.7. Independent normals: sum is normal, variances add."

**P76 — Transfer Probe (Independence mode):**
(a) Central Limit Theorem (preview): X₁,…,Xₙ i.i.d. with mean μ and variance σ². Then (X̄−μ)/(σ/√n) → N(0,1) as n→∞. This explains why the Normal is so central: it's the limiting distribution of averages. (b) If X₁,…,X₁₆ i.i.d. with E[Xᵢ]=3, Var(Xᵢ)=4: approximate P(X̄>3.5) using the CLT. (c) The Normal approximation to the Binomial: B(n,p) ≈ N(np,np(1−p)) for large n. Approximate P(B(100,0.5)≤55). (Apply continuity correction: P(B≤55)≈P(Normal≤55.5).)

**P75 — Mastery Assessment:**
"IQ scores are N(100,225). (a) What IQ corresponds to the 95th percentile? (b) What fraction of people have IQ between 85 and 115? (c) If you test 4 people independently, what is the distribution of their average IQ? (d) What is P(average IQ > 105)?"

**P74 — Routing Decision:**
- Score ≥ 5/5 → MASTERED
- Score 4/5 → REVIEW Φ(−z)=1−Φ(z) and standardisation
- Score ≤ 3/5 → PREREQUISITE GAP in math.prob.normal-distribution; reassign

**P78 — Completion:** Standard Normal certified. Student standardises any Normal; uses Φ and its symmetry; applies 68-95-99.7; sums independent Normals.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: CLT; Normal approximation to Binomial; average of Normal samples
Skill tested: Apply standardisation to CLT and approximation contexts

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
