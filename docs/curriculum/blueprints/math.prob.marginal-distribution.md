# Blueprint: math.prob.marginal-distribution

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.prob.marginal-distribution |
| name | Marginal Distribution |
| Domain | math.prob |
| Difficulty | proficient |
| Bloom level | apply |
| Estimated hours | 3 |
| Mastery threshold | 0.85 |
| MAMR | 5/5 |
| Prerequisites | math.prob.joint-distribution |
| Cross-links | — |
| Unlocks | — |

## Component 1 — Learning Objective
The student defines the marginal PMF/PDF of X from a joint distribution by summing/integrating out the other variable: p_X(x)=∑_y p_{X,Y}(x,y) or f_X(x)=∫f_{X,Y}(x,y)dy; computes marginal distributions from joint tables and joint densities; recovers the original joint only from marginals when X,Y are independent; and distinguishes marginalisation (recovering individual distributions) from conditioning (computing distributions given information about the other variable).

## Component 2 — CPA Entry Stage
**C — Concrete** (joint PMF table of (X,Y) where X=0,1,2 and Y=0,1; show a 3×2 table with all six probabilities; compute row sums to get p_X(x) (the marginal of X), and column sums to get p_Y(y) (the marginal of Y); label the sums in the "margins" of the table — this is where "marginal" comes from)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | MARGINALS-DETERMINE-THE-JOINT | Student believes knowing p_X and p_Y fully determines p_{X,Y}; doesn't know the joint is only recoverable from marginals when X,Y are independent | Type 1 — overgeneralisation (the factorisation p_{X,Y}=p_X·p_Y holds FOR independent X,Y; students generalise this to all pairs) |
| MC-2 | MARGINAL-IS-THE-CONDITIONAL | Student confuses p_X(x) (the unconditional, marginal distribution of X) with p_{X|Y}(x|y) (the distribution of X given Y=y); writes p_X(x)=p_{X,Y}(x,y)/p_Y(y) for the marginal | Type 3 — language contamination (both involve "the distribution of X in a joint setting"; the difference is whether Y is observed (conditional) or averaged out (marginal)) |
| MC-3 | INTEGRATING-TO-GET-MARGINAL-IS-OPTIONAL | Student computes the marginal of a continuous distribution by evaluating the joint at a specific y value rather than integrating; writes f_X(x)=f_{X,Y}(x,y₀) for some fixed y₀ | Type 5 — instruction-induced (for conditional distributions, you do fix y and normalise; students confuse the procedure with marginalisation, which requires integration, not evaluation) |

## Component 4 — Session TA Cap
**Cap = 5** (hrs = 3 → cap 5)

## Component 5 — Teaching Action Sequence

### A01 — P04 PATTERN INDUCTION
**Marginalisation — summing/integrating out variables:**

**Discrete:** p_X(x) = ∑_y p_{X,Y}(x,y) (row sums in a joint PMF table)
**Continuous:** f_X(x) = ∫_{-∞}^{∞} f_{X,Y}(x,y)dy (integrate out y from the joint PDF)

**Why "marginal":** In a joint PMF table, the row sums are literally written in the margins of the table — hence "marginal distribution."

**Example (discrete):** Joint PMF of (X,Y), X=heads in 2 flips of first coin, Y=heads in 2 flips of second coin.

| | Y=0 | Y=1 | Y=2 | p_X(x) |
|---|---|---|---|---|
| X=0 | 1/16 | 2/16 | 1/16 | 4/16 |
| X=1 | 2/16 | 4/16 | 2/16 | 8/16 |
| X=2 | 1/16 | 2/16 | 1/16 | 4/16 |
| p_Y(y) | 4/16 | 8/16 | 4/16 | 1 |

Marginal of X: p_X(0)=4/16, p_X(1)=8/16, p_X(2)=4/16 → X~Binomial(2,1/2) ✓

**Example (continuous):** f_{X,Y}(x,y) = 6xy² for 0<x<1, 0<y<1.
f_X(x) = ∫₀¹ 6xy²dy = 6x·[y³/3]₀¹ = 6x·(1/3) = 2x for 0<x<1. Verify: ∫₀¹ 2x dx = 1 ✓.

**Independence check:** p_{X,Y}(x,y)=p_X(x)·p_Y(y) for ALL (x,y)? In the table above: p_{X,Y}(0,0)=1/16 = p_X(0)·p_Y(0) = (4/16)(4/16) = 16/256? No! 1/16≠1/16. Wait: (4/16)(4/16)=16/256=1/16. YES — they DO factorise here because X and Y are independent (separate coin flips).

**P49 checkpoint:**
- CORRECT → "Marginal: sum/integrate out the other variable. Table row sums. Continuous: integrate out y. Independence iff p_{X,Y}=p_X·p_Y for all (x,y)." → Gate (P91)
- PARTIAL (confuses marginal with conditional) → "Marginal p_X(x)=∑_y p_{X,Y}(x,y): you sum OVER ALL values of y. Conditional p_{X|Y}(x|y₀)=p_{X,Y}(x,y₀)/p_Y(y₀): you FIX y=y₀ and normalise. Marginal averages out Y; conditional conditions on a specific Y value." → TB-R01 → Gate
- INCORRECT → TB-R01 → Gate
- NO_RESPONSE → "Joint PMF: p(0,0)=0.1, p(0,1)=0.3, p(1,0)=0.2, p(1,1)=0.4. Find p_X(0) and p_X(1) by summing each row." → TB-R01 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 MARGINALS-DETERMINE-THE-JOINT):**
Step 1 — "Counter-example: two joint distributions with the SAME marginals but different joints. Let X,Y∈{0,1}. Joint A: p(0,0)=p(1,1)=1/2, p(0,1)=p(1,0)=0. Joint B: p(0,0)=p(0,1)=p(1,0)=p(1,1)=1/4. Both have p_X(0)=p_X(1)=1/2 and p_Y(0)=p_Y(1)=1/2. But A has X=Y always (perfectly positively correlated); B has X⊥Y (independent)."
Step 2 — "Marginals describe individual behaviour; the joint describes how X and Y move together. The joint contains the dependence information; marginals discard it."
Step 3 — "Recovery rule: p_{X,Y}=p_X·p_Y ↔ X⊥Y (independence). ONLY when independent can you recover the joint from marginals."

**TB-R02 (MC-3 INTEGRATING-TO-GET-MARGINAL-IS-OPTIONAL):**
Step 1 — "f_X(x)=∫f_{X,Y}(x,y)dy — you must integrate over ALL values of y. You cannot just evaluate at one y value."
Step 2 — "Analogy with discrete: p_X(x)=∑_y p_{X,Y}(x,y). You sum over ALL y. Evaluating just p_{X,Y}(x,y₀) for one y₀ gives you just one term of that sum — not the marginal."
Step 3 — "Check: after computing f_X(x), verify ∫f_X(x)dx=1. This fails if you forgot to integrate out y."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (5 items):**
1. Joint PMF table: P(X=1,Y=1)=0.1, P(X=1,Y=2)=0.2, P(X=2,Y=1)=0.3, P(X=2,Y=2)=0.4. Find p_X and p_Y. Are X and Y independent?
2. Joint PDF f(x,y)=2 for 0<x<y<1. Find f_X(x) and f_Y(y). (Careful with integration limits — they depend on x and y respectively.)
3. Joint PDF f(x,y)=e^{-x-y} for x>0,y>0. Find marginals. Are X and Y independent? What are their distributions?
4. (X,Y) is uniformly distributed on the unit disk {(x,y): x²+y²≤1}. Find f_X(x). (Hint: for a given x, y ranges over −√(1−x²) to √(1−x²).) What is the distribution of X?
5. Give an example of two random variables with the same marginal distributions as in Question 3 but that are NOT independent.

**P55 — Reflect & Consolidate:** "Marginal=sum/integrate out the other variable. Table row/column sums. Marginals ≠ joint (dependence lost). Independence: p_{X,Y}=p_X·p_Y. Marginal ≠ conditional (no normalisation in marginal)."

**P76 — Transfer Probe (Independence mode):**
(a) Copulas: a copula C(u,v) is a joint CDF of (U,V)~Uniform(0,1) that captures ONLY the dependence structure between U and V, stripped of marginal information. The Sklar's theorem says any joint CDF F(x,y)=C(F_X(x),F_Y(y)) for some copula C. The independence copula is C(u,v)=uv; the perfect positive dependence copula is C(u,v)=min(u,v). Why does the copula framework separate the marginals from the dependence? (b) In machine learning: the naïve Bayes classifier assumes P(features|label) = ∏P(feature_i|label) (conditional independence). Why does this assumption simplify computation? What does it mean about the joint vs marginal structure of the features? (c) Marginalisation in Bayesian inference: P(θ|data) ∝ P(data|θ)P(θ). The marginal likelihood P(data)=∫P(data|θ)P(θ)dθ normalises the posterior. Why is computing this integral often computationally expensive?

**P75 — Mastery Assessment:**
"Joint PDF f(x,y)=kxy for 0<x<2, 0<y<3. (a) Find k (so that f integrates to 1). (b) Find the marginals f_X(x) and f_Y(y). (c) Are X and Y independent? (Check if f=f_X·f_Y.) (d) Compute E[XY] directly from the joint. Verify E[XY]=E[X]E[Y] (consistent with independence)."

**P74 — Routing Decision:**
- Score ≥ 5/5 → MASTERED
- Score 4/5 → REVIEW integration limits for marginals of continuous joints
- Score ≤ 3/5 → PREREQUISITE GAP in math.prob.joint-distribution; reassign

**P78 — Completion:** Marginal Distribution certified. Student computes marginals from joints by summing/integrating; checks independence; distinguishes marginal from conditional; understands copulas as the dependence structure.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Copulas; naïve Bayes; Bayesian marginal likelihood
Skill tested: Apply marginalisation to modern statistical and ML contexts

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
