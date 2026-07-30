# Blueprint: math.de.laplace-ode

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.de.laplace-ode |
| name | Solving ODEs with Laplace Transforms |
| Domain | math.de |
| Difficulty | expert |
| Bloom level | apply |
| Estimated hours | 6 |
| Mastery threshold | 0.85 |
| MAMR | 5/5 |
| Prerequisites | math.de.inverse-laplace, math.de.ivp |
| Cross-links | — |
| Unlocks | — |

## Component 1 — Learning Objective
The student applies the Laplace transform method to solve initial value problems: takes the Laplace transform of both sides of an ODE (converting the IVP into an algebraic equation in s), solves for Y(s) by incorporating the given initial conditions through the transform of derivatives (ℒ{y'}=sY−y(0), ℒ{y''}=s²Y−sy(0)−y'(0)), decomposes Y(s) using partial fractions, and recovers y(t) by inverse Laplace transform; and recognises the advantage of this method for piecewise or impulsive forcing functions via the convolution theorem and the step/delta function transforms.

## Component 2 — CPA Entry Stage
**A — Abstract to Concrete** (draw the three-step pipeline as a diagram: ODE with IC → [ℒ-transform] → algebraic equation in Y(s) → [algebra/partial fractions] → Y(s) → [ℒ⁻¹] → y(t); annotate: "The transform lifts the differentiation to multiplication by s — so the derivative disappears and the IC appears automatically"; below, show in a small table: ℒ{eᵃᵗ}=1/(s−a), ℒ{sin(bt)}=b/(s²+b²), ℒ{cos(bt)}=s/(s²+b²), ℒ{tⁿ}=n!/s^{n+1}; annotate: "Inverse: partial fractions + table lookup")

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | INITIAL-CONDITIONS-IGNORED-UNTIL-END | Student takes ℒ{y''}=s²Y(s) (forgetting the initial condition terms −sy(0)−y'(0)); then applies IC only at the end to C₁, C₂ — which doesn't work because there are no free constants; the ICs are already encoded in Y(s) | Type 5 — instruction-induced (students learn the ODE general solution approach where ICs come last; they apply the same pattern here, not realising that the Laplace method encodes ICs algebraically at the transform step itself) |
| MC-2 | PARTIAL-FRACTIONS-DEGREE-ERROR | Student writes partial-fraction decomposition for Y(s) without first checking that the numerator degree is less than the denominator degree; writes wrong form for repeated or complex roots | Type 5 — instruction-induced (partial fractions as taught in calculus assume proper fractions; in Laplace problems, polynomial division may be needed first; repeated real and complex-conjugate pairs require distinct term forms not covered in basic calculus courses) |
| MC-3 | CONVOLUTION-CONFUSED-WITH-PRODUCT | Student thinks ℒ⁻¹{F(s)G(s)} = f(t)g(t) (pointwise product); doesn't know the correct inverse is the convolution (f*g)(t) = ∫₀ᵗ f(τ)g(t−τ)dτ | Type 1 — overgeneralisation (ℒ{f+g}=F+G and ℒ{af}=aF follow linearity; students assume ℒ{fg}=FG symmetrically; the convolution theorem — that multiplication in s-domain corresponds to convolution in t-domain — has no elementary-algebra analogue and is genuinely counter-intuitive) |

## Component 4 — Session TA Cap
**Cap = 8** (hrs = 6 → cap 8)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**The Laplace transform pipeline:**

**Transform of derivatives:**
ℒ{y'} = sY(s) − y(0)
ℒ{y''} = s²Y(s) − sy(0) − y'(0)

**Worked example — constant coefficients with ICs:**
y'' + 3y' + 2y = e^{−t}, y(0)=0, y'(0)=1.
Transform: [s²Y − 0·s − 1] + 3[sY − 0] + 2Y = 1/(s+1).
(s² + 3s + 2)Y − 1 = 1/(s+1).
Y(s) = 1/[(s+1)(s+1)(s+2)] + 1/[(s+1)(s+2)]

Simplify: (s+1)(s+2) = s²+3s+2.
Y = [1/(s+1) + 1] / [(s+1)(s+2)]
= 1/[(s+1)²(s+2)] + 1/[(s+1)(s+2)].

Partial fractions for 1/[(s+1)²(s+2)] = A/(s+1) + B/(s+1)² + C/(s+2):
C = 1/(−2+1)² = 1; B = 1/(−1+2) = 1; A = −1.
For 1/[(s+1)(s+2)] = −1/(s+1) + 1/(s+2).
Sum: Y = −2/(s+1) + 1/(s+1)² + 2/(s+2).
y(t) = −2e^{−t} + te^{−t} + 2e^{−2t}.

**P49 checkpoint:**
- CORRECT → "ℒ{y''}=s²Y−sy(0)−y'(0). Encode ICs in Y(s) at transform step. Partial fractions → ℒ⁻¹ via table." → A02
- PARTIAL (MC-1: forgot IC terms) → "The Laplace transform formula for y'' is: ℒ{y''} = s²Y(s) − s·y(0) − y'(0). The initial conditions appear IMMEDIATELY when you transform — they are NOT free constants to be applied later. There is no C₁, C₂ in this method. The ICs are baked into Y(s) algebraically." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "y'' + 4y = 0, y(0)=2, y'(0)=0. Transform: s²Y − 2s + 4Y = 0. (s²+4)Y = 2s. Y = 2s/(s²+4). ℒ⁻¹: y=2cos(2t). Check: y'=−4sin2t, y''=−8cos2t; y''+4y=−8cos2t+8cos2t=0 ✓; y(0)=2 ✓; y'(0)=0 ✓." → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**Piecewise forcing and step functions:**

**Heaviside step function:** 𝒰(t−a) = 0 for t<a; 1 for t≥a.
ℒ{𝒰(t−a)} = e^{−as}/s.
**Second shifting theorem:** ℒ{f(t−a)𝒰(t−a)} = e^{−as}F(s).

**Dirac delta (impulse):** δ(t−a) represents an instantaneous unit impulse at t=a.
ℒ{δ(t−a)} = e^{−as}.
**Sifting property:** ∫₋∞^∞ f(t)δ(t−a)dt = f(a).

**Convolution theorem:**
ℒ{(f*g)(t)} = F(s)·G(s) where (f*g)(t) = ∫₀ᵗ f(τ)g(t−τ)dτ.
**Use:** ℒ⁻¹{F(s)G(s)} = (f*g)(t) — NOT f(t)·g(t).

**When Laplace transforms excel:**
- Forcing functions with jumps: f(t) = t (0≤t<π), sin t (t≥π) — encode with 𝒰
- Impulsive forcing: F(t) = δ(t−a) — hammer blow, lightning strike
- Repeated roots in s: partial fractions handle them as cleanly as distinct roots

**P49 checkpoint:**
- CORRECT → "𝒰(t−a): ℒ=e^{−as}/s; second-shifting for f(t−a)𝒰(t−a). δ(t−a): ℒ=e^{−as}. Convolution: ℒ⁻¹{FG}=f*g, not f·g." → Gate (P91)
- PARTIAL (MC-3: product vs. convolution) → "WRONG: ℒ⁻¹{F(s)G(s)} ≠ f(t)·g(t). CORRECT: ℒ⁻¹{F(s)G(s)} = ∫₀ᵗ f(τ)g(t−τ)dτ (convolution). Example: ℒ⁻¹{1/(s(s+1))} = ∫₀ᵗ 1·e^{−(t−τ)}dτ = 1−e^{−t}. Check: pointwise product would give 1·e^{−t}=e^{−t}, which is wrong." → TB-R02 → Gate
- INCORRECT → TB-R02 → Gate
- NO_RESPONSE → "y'' + y = δ(t−π), y(0)=0, y'(0)=0. ℒ: (s²+1)Y=e^{−πs}. Y=e^{−πs}/(s²+1). ℒ⁻¹: sin(t−π)𝒰(t−π) = −sin(t)𝒰(t−π). So y(t)=0 for t<π; y(t)=−sin(t) for t≥π. Physically: zero until the impulse at t=π, then pure oscillation." → TB-R02 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 + MC-2 combined):**
Step 1 — "Derivative transform formula (MEMORISE): ℒ{y'} = sY − y(0). ℒ{y''} = s²Y − sy(0) − y'(0). Each differentiation in t becomes multiplication by s in s, minus the initial condition contribution. This is why we set up the IVP in advance — the IC values plug directly into the transform equation."
Step 2 — "After transforming, Y(s) is a ratio of polynomials. If the numerator degree ≥ denominator degree, perform polynomial long division first to get a proper fraction + polynomial. Then decompose the proper fraction by partial fractions."
Step 3 — "Partial fraction forms: (1) distinct real roots: A/(s−r). (2) repeated root rᵏ: A₁/(s−r) + A₂/(s−r)² + ⋯ + Aₖ/(s−r)ᵏ. (3) irreducible quadratic s²+bs+c: (As+B)/(s²+bs+c). Cover-up rule works only for distinct real linear factors."

**TB-R02 (MC-3 CONVOLUTION):**
Step 1 — "ℒ is a LINEAR operator: ℒ{f+g}=F+G, ℒ{cf}=cF. But ℒ is NOT multiplicative: ℒ{fg} ≠ FG in general."
Step 2 — "The actual multiplication-in-s rule: F(s)·G(s) = ℒ{(f*g)(t)} where (f*g)(t) = ∫₀ᵗ f(τ)g(t−τ)dτ. This is convolution, a running weighted average — not pointwise product."
Step 3 — "In practice: factor Y(s) = H(s)·R(s) where H is the transfer function (1/characteristic polynomial) and R is the forcing transform. Then y(t) = (h*r)(t) = ∫₀ᵗ h(τ)r(t−τ)dτ. Alternatively, use partial fractions on Y(s) entirely."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (5 items):**
1. Solve the IVP using Laplace transforms: y'' − 2y' + y = eᵗ, y(0)=1, y'(0)=0.
2. Solve: y'' + 4y' + 4y = δ(t−2), y(0)=0, y'(0)=0. (Heaviside step required after δ transform.)
3. Solve: y'' + y = 𝒰(t−π), y(0)=0, y'(0)=0. (Apply second shifting theorem; simplify using sin(t−π)=−sin t.)
4. Use the convolution theorem to find y(t) if Y(s) = 1/[(s²+1)²]. Express as an integral, then evaluate.
5. A spring-mass system: y'' + 4y = f(t), y(0)=0, y'(0)=0, where f(t) = 1 for 0≤t<2, f(t)=0 for t≥2. Write f(t) using Heaviside step functions, transform, solve for Y(s), and invert using the second shifting theorem.

**P55 — Reflect & Consolidate:** "Laplace ODE method: ℒ → algebra in Y(s) (ICs embedded via ℒ{y''}=s²Y−sy(0)−y'(0)) → partial fractions → ℒ⁻¹. Advantage: handles piecewise/impulsive forcing cleanly via 𝒰(t−a) and δ(t−a). Convolution theorem: ℒ⁻¹{FG}=f*g."

**P76 — Transfer Probe (Independence mode):**
(a) Transfer function: for ay''+by'+cy=r(t) with zero ICs, Y(s)=R(s)/P(s) where P(s)=as²+bs+c is the characteristic polynomial. Define the transfer function H(s)=1/P(s). Show that y(t)=(h*r)(t) where h(t)=ℒ⁻¹{H(s)} is the impulse response. Connect to the engineering meaning: H(s) is the system's "gain" as a function of complex frequency s. (b) Z-transform analogy: the discrete-time analogue of the Laplace transform is the Z-transform Z{xₙ}=∑xₙz^{−n}. The shift operator Zˉ¹ corresponds to s in the Laplace world — Z{xₙ₋₁}=z^{−1}X(z). Use this to write the Z-transform of a second-order linear recurrence aₙ₊₂+pₙ₊₁+qaₙ=f(n) and compare structurally with the Laplace-transformed ODE. (c) Paley-Wiener theorem: a function y(t) is the Laplace transform of a causal L² function (supported on t≥0) if and only if its Laplace transform Y(s) is square-integrable on every vertical line Re(s)=c>0. Explain qualitatively why the region of convergence Re(s)>c encodes the exponential growth rate of y(t).

**P75 — Mastery Assessment:**
"(a) Solve y'' + 2y' + 5y = e^{−t}cos(2t), y(0)=0, y'(0)=0 using Laplace transforms. (Hint: ℒ{e^{−t}cos2t}=(s+1)/((s+1)²+4). The characteristic polynomial is s²+2s+5=(s+1)²+4.) (b) A beam vibration model: ÿ + 4y = F₀[𝒰(t) − 𝒰(t−T)] (force applied from 0 to T, then removed). Find y(t) for t>T with y(0)=ẏ(0)=0. (c) Use the convolution theorem to show that for y'' + ω₀²y = f(t) with zero ICs, the solution is y(t) = (1/ω₀)∫₀ᵗ sin(ω₀(t−τ))f(τ)dτ. This is Duhamel's principle — the response is the superposition of impulse responses to each infinitesimal piece of f. (d) For the Laplace-transformed ODE P(s)Y(s) = Q(s) + R(s) where Q(s) comes from initial conditions, explain why the initial-condition contribution Q(s)/P(s) gives the transient response and R(s)/P(s) gives the forced response. When does the forced response equal the convolution h*r?"

**P74 — Routing Decision:**
- Score ≥ 5/5 → MASTERED
- Score 4/5 → REVIEW encoding of initial conditions and the convolution theorem
- Score ≤ 3/5 → PREREQUISITE GAP in math.de.inverse-laplace or math.de.ivp; reassign

**P78 — Completion:** Laplace ODE method certified. Student encodes ICs via the derivative-transform formula, computes Y(s) algebraically, inverts via partial fractions and table lookup, handles piecewise/impulsive forcing with step/delta functions, and applies the convolution theorem correctly.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Transfer function and impulse response; Z-transform discrete analogy; Paley-Wiener region of convergence
Skill tested: Place the Laplace method within the broader transform theory and engineering systems framework

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
