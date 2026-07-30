# Blueprint: math.prob.law-of-unconscious

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.prob.law-of-unconscious |
| name | Law of the Unconscious Statistician |
| Domain | math.prob |
| Difficulty | proficient |
| Bloom level | apply |
| Estimated hours | 2 |
| Mastery threshold | 0.90 |
| MAMR | 5/5 |
| Prerequisites | math.prob.expected-value |
| Cross-links | — |
| Unlocks | — |

## Component 1 — Learning Objective
The student states the Law of the Unconscious Statistician (LOTUS): for a random variable X with PMF/PDF f_X, and any function g, E[g(X)]=∑ₓ g(x)f_X(x) (discrete) or ∫g(x)f_X(x)dx (continuous); applies LOTUS to compute E[X²], E[1/X], E[eˣ], and E[g(X)] for standard distributions without first finding the distribution of g(X); and explains why LOTUS is "unconscious" — it avoids computing the distribution of Y=g(X).

## Component 2 — CPA Entry Stage
**C — Concrete** (X~Uniform{1,2,3,4,5,6} (die). Compute E[X²] two ways: (1) find distribution of Y=X², then E[Y]=∑y·P(Y=y)=(1·1/6+4·1/6+9·1/6+16·1/6+25·1/6+36·1/6)=91/6; (2) LOTUS: E[X²]=∑x²·P(X=x)=same sum=91/6. LOTUS skips Step 1 — no need to find P(Y=y). "Unconscious" = you forget to find the distribution of Y and compute directly from X's distribution.)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | E[g(X)]=g(E[X]) | Student computes E[X²]=(E[X])², E[eˣ]=e^{E[X]}, E[1/X]=1/E[X]; conflates expectation with direct function evaluation | Type 1 — overgeneralisation (E[aX+b]=aE[X]+b IS correct; students extend linearity to nonlinear functions) |
| MC-2 | LOTUS-REQUIRES-KNOWING-DISTRIBUTION-OF-Y | Student thinks they must compute f_Y (the distribution of Y=g(X)) before using LOTUS; doesn't understand that LOTUS avoids this step | Type 5 — instruction-induced (the "proper" derivation of E[Y] for Y=g(X) first finds f_Y using the change-of-variable theorem; students who learn that method first assume it's always required) |
| MC-3 | LOTUS-ONLY-WORKS-FOR-MONOTONE-g | Student thinks LOTUS requires g to be invertible/monotone; confuses LOTUS with the change-of-variable theorem for densities | Type 5 — instruction-induced (the change-of-variable theorem for f_Y DOES require monotonicity (or piecewise monotonicity); LOTUS for E[g(X)] does not — it works for any measurable g) |

## Component 4 — Session TA Cap
**Cap = 4** (hrs = 2 → cap 4)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Two routes to E[g(X)]:**

| Route | Steps | When painful |
|---|---|---|
| Hard route | (1) Find distribution of Y=g(X); (2) Compute E[Y]=∑y·P(Y=y) | When g is not monotone or Y's distribution is messy |
| LOTUS | Directly compute ∑ₓ g(x)P(X=x) using X's distribution | Always works, always easier |

**LOTUS (discrete):** E[g(X)] = ∑_{x in range(X)} g(x) · P(X=x)
**LOTUS (continuous):** E[g(X)] = ∫_{-∞}^{∞} g(x) · f_X(x) dx

**Why "unconscious":** You are "unconscious" of the fact that you should find the distribution of Y — you just use X's distribution directly.

**Key applications:**
- E[X²] = ∑x² P(X=x) — needed for Var(X)=E[X²]−(E[X])²
- E[X(X−1)] = ∑x(x−1)P(X=x) — the "factorial moment", easier for Binomial/Poisson
- E[eᵗˣ] = ∑ eᵗˣ P(X=x) — the moment generating function M_X(t) at parameter t
- E[|X|] = ∑|x|P(X=x) — no need to split by sign of X first

**P49 checkpoint:**
- CORRECT → "E[g(X)]=∑g(x)P(X=x), using X's PMF/PDF directly. No need to find distribution of g(X)." → A02
- PARTIAL → "LOTUS means you compute E[g(X)] directly from the distribution of X. You don't need the distribution of Y=g(X). Example: E[X²] — just weight x² by P(X=x), not by P(X²=y) (which would be the hard route)." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "X~Geometric(p). E[X]=(1−p)/p? Actually E[X]=1/p for standard geometric. Compute E[X(X−1)] directly: E[X(X−1)]=∑_{k=1}^{∞} k(k−1)(1−p)^{k-1}p. This is the 'hard route' for the second moment. LOTUS says: compute ∑_{k=0}^{∞} k(k−1) P(X=k). Can you see this is the same sum?" → TB-R01 → A02

### A02 — P41 MISCONCEPTION DETECTOR
**MC-1 gate:**

**Gate question:** "If X~Exponential(λ): E[X]=1/λ. What is E[X²]? A student answers (1/λ)². Is this right?"

WRONG. LOTUS: E[X²]=∫₀^∞ x²·λe^{−λx}dx. Integrating by parts twice: E[X²]=2/λ². The correct answer is 2/λ², not (1/λ)²=1/λ². The gap is Var(X)=E[X²]−(E[X])²=2/λ²−1/λ²=1/λ².

**P49 checkpoint:**
- CORRECT → Gate (P91)
- PARTIAL or INCORRECT → TB-R02 → Gate
- NO_RESPONSE → "Directly compute ∫₀^∞ x²·λe^{−λx}dx. Use integration by parts: let u=x², dv=λe^{−λx}dx. Then du=2x dx, v=−e^{−λx}. Result: [−x²e^{−λx}]₀^∞ + ∫₀^∞ 2x·e^{−λx}dx. The first term is 0; the second is (2/λ)E[X]=(2/λ)(1/λ)=2/λ²." → TB-R02 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-2 LOTUS-REQUIRES-KNOWING-DISTRIBUTION-OF-Y):**
Step 1 — "LOTUS: E[g(X)]=∑g(x)P(X=x). This sum uses ONLY (i) the values x that X can take, (ii) the probabilities P(X=x), and (iii) the function g evaluated at x. It does NOT use P(Y=y) anywhere."
Step 2 — "Verify with die example: X~Uniform{1,…,6}. E[X²]=(1²+2²+3²+4²+5²+6²)/6=(1+4+9+16+25+36)/6=91/6. Done. We never computed P(X²=1)=1/6, P(X²=4)=1/6,…"
Step 3 — "The change-of-variable theorem is needed only when you want f_Y (the density of Y), not when you want E[g(X)]. LOTUS bypasses that theorem entirely."

**TB-R02 (MC-1 E[g(X)]=g(E[X])):**
Step 1 — "This only holds for LINEAR g: E[aX+b]=aE[X]+b. For nonlinear g it fails. Jensen's inequality: if g is convex, E[g(X)]≥g(E[X]). If g is concave, E[g(X)]≤g(E[X])."
Step 2 — "Examples: g(x)=x² (convex): E[X²]≥(E[X])² (the gap is Var(X)). g(x)=√x (concave): E[√X]≤√(E[X]). g(x)=ln(x) (concave): E[ln X]≤ln(E[X])."
Step 3 — "Whenever you see E[f(X)] and you want to compute it: use LOTUS (integrate/sum g(x)f_X(x)). Do NOT just plug in E[X] to g."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (5 items):**
1. X~Poisson(λ). Use LOTUS to compute E[X(X−1)]=λ². (Hint: k(k−1)·e^{−λ}λᵏ/k! = e^{−λ}λᵏ/(k−2)! for k≥2.) Then use E[X(X−1)]=E[X²]−E[X] to find E[X²]=λ²+λ. Hence Var(X)=λ.
2. X~Uniform(0,1). Compute E[X²] and E[1/(1+X)] using LOTUS (continuous form: integrate g(x)·1 dx over [0,1]).
3. X has PMF P(X=k)=1/n for k=1,…,n. Compute E[X²] and E[X(X−1)] using LOTUS. Verify that Var(X)=(n²−1)/12.
4. X~Exponential(λ). Compute the moment generating function M(t)=E[eᵗˣ]=∫₀^∞ eᵗˣ·λe^{−λx}dx for t<λ. Simplify.
5. If E[g(X)]=g(E[X]) for all X, what does that say about g? (Answer: g must be linear, or X is a constant.)

**P55 — Reflect & Consolidate:** "LOTUS: E[g(X)]=∑g(x)P(X=x) or ∫g(x)fX(x)dx. No need to find distribution of g(X). KEY use: E[X²] for variance. E[g(X)]≠g(E[X]) in general — only for linear g."

**P76 — Transfer Probe (Independence mode):**
(a) X~Normal(μ,σ²). The moment generating function is M(t)=E[eᵗˣ]=∫_{-∞}^∞ eᵗˣ · (2πσ²)^{-1/2} exp(−(x−μ)²/(2σ²))dx. By completing the square in the exponent: M(t)=exp(μt+σ²t²/2). Use this to find E[X]=M'(0) and E[X²]=M''(0). Verify E[X²]=μ²+σ². (b) Cumulant generating function: K(t)=ln M(t). Why is K(t)=μt+σ²t²/2 particularly simple for the Normal distribution? (c) The k-th moment of X is E[Xᵏ]=M^{(k)}(0). For a Normal, use M(t)=exp(μt+σ²t²/2) to find E[X³] (third moment) and E[X⁴] (fourth moment) by differentiating.

**P75 — Mastery Assessment:**
"X~Binomial(n,p). (a) Use LOTUS with g(k)=k(k−1): compute E[X(X−1)]=n(n−1)p². (Hint: k(k−1)C(n,k)=(n)(n−1)C(n−2,k−2).) (b) Hence find E[X²] and Var(X)=np(1−p). (c) Verify: for n=1 (Bernoulli), Var(X)=p(1−p). (d) This derivation uses LOTUS and combinatorial identities — not the LOTUS integral. Which random variables are most naturally handled by LOTUS-sum vs LOTUS-integral?"

**P74 — Routing Decision:**
- Score ≥ 5/5 → MASTERED
- Score 4/5 → REVIEW LOTUS integral for continuous variables
- Score ≤ 3/5 → PREREQUISITE GAP in math.prob.expected-value; reassign

**P78 — Completion:** LOTUS certified. Student applies E[g(X)]=∑g(x)P(X=x) directly; uses for E[X²], factorial moments, MGF; distinguishes from E[g(X)]=g(E[X]) error.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Moment generating functions; Normal distribution moments; cumulants
Skill tested: Apply LOTUS-integral to find MGF and moments of continuous distributions

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
