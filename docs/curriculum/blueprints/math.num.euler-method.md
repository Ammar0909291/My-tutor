# Blueprint: math.num.euler-method

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.num.euler-method |
| name | Euler's Method (Numerical ODE) |
| Domain | math.num |
| Difficulty | proficient |
| Bloom level | apply |
| Estimated hours | 3 |
| Mastery threshold | 0.85 |
| MAMR | 5/5 |
| Prerequisites | math.de.euler-method, math.num.error-analysis |
| Cross-links | math.de.euler-method |
| Unlocks | math.num.runge-kutta |

## Component 1 — Learning Objective
Given an initial value problem y'=f(t,y), y(t₀)=y₀, the student applies the explicit Euler method yₙ₊₁=yₙ+h·f(tₙ,yₙ) to step forward in time; derives the local truncation error O(h²) and global error O(h); compares explicit vs. implicit Euler for stability on stiff equations; explains the concept of the stability region (a method is stable for step size h if h·λ lies in the stability region) and recognises the O(h) vs. O(h²) trade-off of implicit Euler's larger stability region.

## Component 2 — CPA Entry Stage
**C — Concrete** (start at (t₀, y₀) on a slope field; draw the tangent line for one step; land at the new approximate point — before any formula)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | GLOBAL-ERROR-IS-O(h²) | Student believes Euler's global error is O(h²) because the local truncation error is O(h²) — confuses local and global error accumulation | Type 3 — language contamination ("truncation error" sounds like the total error; the word "local" is easily forgotten; students apply the per-step error directly as the total error) |
| MC-2 | SMALLER-STEP-ALWAYS-BETTER | Student reduces h without limit to improve accuracy, not recognising that round-off error grows as 1/h as the number of steps increases | Type 5 — instruction-induced (convergence tables always show error decreasing; the optimal step-size trade-off between truncation and round-off error is rarely taught in first courses) |
| MC-3 | EULER-UNSTABLE-MEANS-WRONG | Student dismisses Euler's method entirely when it shows oscillations or blow-up, not recognising that the instability is caused by h being outside the stability region and can be fixed by reducing h or switching to an implicit method | Type 1 — overgeneralization (the unstable output looks like a numerical bug; students conclude the method is unreliable rather than diagnosing the step-size/stability-region relationship) |

## Component 4 — Session TA Cap
**Cap = 5** (hrs = 3 → cap 5)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Four representations of Euler's method:**

| Representation | Content |
|---|---|
| Geometric | Tangent line at (tₙ,yₙ): slope = f(tₙ,yₙ); step h forward → yₙ₊₁=yₙ+h·f(tₙ,yₙ) |
| Algebraic | yₙ₊₁=yₙ+h·f(tₙ,yₙ); tₙ₊₁=tₙ+h |
| Error analysis | Taylor: y(tₙ+h)=y(tₙ)+h·y'(tₙ)+½h²·y''(ξ); local truncation error (LTE) = ½h²y''(ξ); global error ≈ (b−a)/h × LTE = O(h) |
| Code | t,y=t0,y0; while t<T: y+=h*f(t,y); t+=h |

**Error taxonomy:**
- **Local truncation error (LTE):** Error introduced in one step = O(h²)
- **Global error:** Accumulated over (b−a)/h steps ≈ LTE/h × (b−a) = O(h²)/h × (b−a) = O(h)

**Stability region (explicit Euler):** For the test equation y'=λy (λ<0), the method is stable when |1+hλ|<1 ↔ −2/|λ|<h<0. For λ=−10, the step size must satisfy h<0.2 — often much smaller than accuracy requires.

**P49 checkpoint:**
- CORRECT → "Euler: yₙ₊₁=yₙ+hf(tₙ,yₙ). LTE=O(h²) per step, global error O(h) total. Stability requires h<2/|λ| for the test equation." → A02
- PARTIAL (applies the formula but confuses LTE with global error) → "LTE measures the error in ONE step. You take (b−a)/h steps, so global error ≈ (b−a)/h × h² = (b−a)h — that's O(h), one order less than LTE. Halving h halves the global error, not quarters it." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "Apply Euler's method to y'=y, y(0)=1 with h=0.5 from t=0 to t=1. True solution: y(t)=eᵗ. What is y(1) after two Euler steps? What is the error?" → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**Stability gallery:**

**Test equation y'=−10y, y(0)=1 (exact: e^{−10t}):**
| Step h | 0.5 | 0.2 | 0.1 | 0.05 |
|---|---|---|---|---|
| hλ | −5 | −2 | −1 | −0.5 |
| |1+hλ| | 4 | 1 | 0 | 0.5 |
| Stable? | NO (blows up) | Borderline | YES | YES |

h=0.5: yₙ₊₁=(1−10×0.5)yₙ=−4yₙ — multiplies by −4 each step → |y|→∞. Wild oscillations, no resemblance to e^{−10t}.
h=0.1: multiplier=0 — y₁=0 for all n≥1. Damps to zero too fast.
h=0.05: |1+hλ|=0.5 — solution decays, roughly tracking e^{−10t}.

**Implicit Euler (backward Euler):** yₙ₊₁=yₙ+h·f(tₙ₊₁,yₙ₊₁). For test equation: yₙ₊₁=yₙ+hλyₙ₊₁ → yₙ₊₁=yₙ/(1−hλ). Stability: |1/(1−hλ)|<1 for ALL h>0 when λ<0 — A-stable (the entire left half-plane is stable). But it requires solving an equation for yₙ₊₁ at each step.

**Pattern:** Explicit Euler is cheap (one f evaluation) but has a stability constraint on h. Implicit Euler is always stable for dissipative problems but requires solving a (possibly nonlinear) equation each step.

**P49 checkpoint:**
- CORRECT → "Explicit Euler: cheap, O(h) convergence, stability requires h<2/|λ|. Implicit Euler: always stable for λ<0 (A-stable), same O(h) convergence, but requires solving an implicit equation per step." → A03
- PARTIAL (understands stability but cannot compute the stability region) → "For y'=λy, explicit Euler gives yₙ₊₁=(1+hλ)yₙ. For stability, |1+hλ|<1. Draw the complex plane: this is a circle of radius 1 centered at −1. For real negative λ, the constraint is h<2/|λ|." → TB-R02 → A03
- INCORRECT → TB-R02 → A03
- NO_RESPONSE → "Apply explicit Euler to y'=−10y with h=0.5. Show three steps. Does the solution grow or decay? Does that match the true behaviour?" → TB-R02 → A03

### A03 — P41 MISCONCEPTION DETECTOR + P64 MC-3 gate
**Instability diagnosis gate:**

**Gate question (MC-3):** "A student applies explicit Euler to y'=−100y, y(0)=1 with h=0.1. The output oscillates wildly between large positive and negative values. The student says 'Euler's method is wrong.' What is the actual problem?"

hλ = 0.1×(−100) = −10. |1+hλ| = |1−10| = 9 > 1 — unstable. The problem is h=0.1 is too large for this stiff ODE. Required: h<2/100=0.02. With h=0.01: hλ=−1, |1−1|=0 — stable and accurate.

**Recovery strategies:**
1. Reduce h below 2/|λ|=0.02 to enter the stability region.
2. Switch to implicit Euler (A-stable, works for any h, but costs a linear solve per step).
3. Use a stiff solver (implicit Runge–Kutta, BDF methods).

**P49 checkpoint:**
- CORRECT → "Wild oscillations in explicit Euler signal instability: hλ is outside the stability region. Fix by reducing h below 2/|λ|, or switch to an implicit (A-stable) method." → Gate (P91)
- PARTIAL (identifies the problem but not the fix) → "For stiff ODEs (large |λ|), the stability constraint h<2/|λ| forces h to be tiny even when accuracy only needs a coarse h. The cost then comes from stability, not accuracy — that is the hallmark of a stiff ODE. Implicit methods decouple stability from step size." → TB-R03 → Gate
- INCORRECT → TB-R03 → Gate
- NO_RESPONSE → "For y'=−100y, what is the maximum step size that keeps explicit Euler stable? What happens if you use h=0.1?" → TB-R03 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 GLOBAL-ERROR-IS-O(h²)):**
Step 1 — "Local Truncation Error (LTE) is the error made IN ONE STEP assuming all previous values are exact. Global error accumulates these step errors over the entire integration interval. If LTE=Ch² and you take N=T/h steps, the global error is at most N × LTE = (T/h) × Ch² = CT·h — that's O(h), one order below the LTE." Step 2 — Analogy: Each step introduces a tiny lean; over N steps you've gone N×(lean distance) off course. Halving h halves each lean but doubles the number of steps — net effect: half the total drift. Step 3 — "Method order p: if LTE=O(h^{p+1}), global error = O(hᵖ). Euler LTE is O(h²), so p=1 (first-order method). Trapezoidal rule LTE is O(h³), so p=2 (second-order). The terminology: 'order p method' always refers to the global error rate."

**TB-R02 (MC-2 SMALLER-STEP-ALWAYS-BETTER):**
Step 1 — "The total error has two components: truncation error (decreases as hᵖ) and round-off error (each f evaluation has floating-point error ~u; over N=T/h steps, total round-off accumulates as N×u=Tu/h, which GROWS as h→0). Total error ≈ Chᵖ + Tu/h. This is minimised at h_opt=(Tup/C)^{1/(p+1)}." Step 2 — For Euler (p=1): h_opt=(Tu/C)^{1/2}≈(10⁻¹⁶/C)^{1/2}≈10⁻⁸ for typical problems. Reducing h below ~10⁻⁸ makes the accumulated round-off worse. Step 3 — "In practice, use an ODE solver that monitors local error and adaptively adjusts h — it balances truncation against round-off automatically. Never manually drive h to machine epsilon."

**TB-R03 (MC-3 EULER-UNSTABLE-MEANS-WRONG):**
Step 1 — "Euler's method is mathematically correct — it converges to the exact solution as h→0 for smooth ODE problems. The oscillations you see are not a bug in the formula; they are instability due to step size h being outside the method's stability region. The stability region is the set of complex numbers hλ for which the method produces a bounded sequence." Step 2 — Fix steps in order: (1) Compute |λ| (the ODE's stiffness). (2) Check h<2/|λ| for explicit Euler. (3) If meeting this constraint makes h too small, switch to implicit Euler or a stiff solver (BDF, implicit Runge–Kutta). Step 3 — "The moral: every numerical ODE method has a stability region. A method is not universally better or worse — its suitability depends on where hλ falls relative to its stability region. Implicit methods have larger stability regions and dominate for stiff ODEs."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (4 items):**
1. Apply explicit Euler to y'=−y, y(0)=1 with h=0.5 from t=0 to t=2. Compute 4 steps by hand, compare with e^{−t}, and report the global error at t=2. Then halve h to h=0.25 and repeat (8 steps). Confirm the global error roughly halves.
2. For y'=−10y, determine the stability boundary for explicit Euler. Show that h=0.21 is unstable and h=0.19 is stable by computing 10 steps of each and observing whether the solution grows or decays.
3. Apply implicit Euler to y'=−10y, y(0)=1 with h=0.5 (3 steps). Show that even this large h produces a decaying solution (though not accurate). Derive the implicit update formula and confirm A-stability.
4. For y'=f(t,y)=t+y, y(0)=1, apply Euler's method with h=0.1 from t=0 to t=1. True solution: y(t)=2eᵗ−t−1. Report the error at t=1 and verify the O(h) convergence by repeating with h=0.05.

**P55 — Reflect & Consolidate:** "Euler: yₙ₊₁=yₙ+hf(tₙ,yₙ). LTE=O(h²), global error=O(h). Stability region for explicit: |1+hλ|<1. Implicit Euler: A-stable (no step-size constraint for λ<0) but requires solving an implicit equation. Stiff problems need implicit methods."

**P76 — Transfer Probe (Cross-link: math.de.euler-method):**
The Euler method applied to a system y'=Ay (A is an m×m matrix) extends the scalar analysis. (a) Derive the stability condition for the explicit Euler step y_{n+1}=(I+hA)yₙ in terms of the eigenvalues of A. (b) For A=[[−1,1000],[0,−1000]] (a stiff system with eigenvalues −1 and −1000), compute the maximum stable h for explicit Euler. (c) Show that implicit Euler applied to this system produces yₙ₊₁=(I−hA)⁻¹yₙ and is stable for all h>0. (d) Connect the stability analysis of Euler's method to the eigenvalue spectrum of the Jacobian ∂f/∂y in general nonlinear ODE solvers.

**P55 — Reflect & Consolidate:** "For systems, stability is determined by the eigenvalues of the Jacobian. Stiffness is the presence of widely separated eigenvalues — the fast modes force explicit methods to use tiny h even when the slow (physical) modes are all that matters. Implicit methods decouple stability from the fast modes."

**P75 — Mastery Assessment:**
"A population model is described by dy/dt=y(1−y)−0.1y² (logistic + harvesting). (a) At the fixed points of this ODE, what is λ=∂f/∂y? (b) Near the stable equilibrium, what is the maximum explicit Euler step size for stability? (c) Apply explicit Euler with h=0.1 from y(0)=0.5 for 20 steps. Does the solution converge to the equilibrium? (d) Compare with implicit Euler (solve the nonlinear update by Newton's method for each step). Which is more accurate per step? (e) If you needed 10⁻⁴ accuracy at t=10, how many steps does each method require?"

**P55 — Reflect & Consolidate:** "Stiffness is intrinsic to the ODE (the eigenvalues of the Jacobian), not to the method. The explicit/implicit Euler trade-off — cheap steps vs. unconditional stability — determines which is efficient. Nonlinear ODEs need an inner Newton solve at each implicit step, but the stability advantage still dominates for stiff systems."

**P74 — Routing Decision:**
- Score ≥ 4/5 → MASTERED; math.num.euler-method complete
- Score 3/5 → REVIEW local vs. global error and stability region; replay A01–A02
- Score ≤ 2/5 → PREREQUISITE GAP in math.de.euler-method or math.num.error-analysis; reassign

**P78 — Completion:** Euler's method (numerical ODE) certified. Student applies explicit/implicit Euler, derives LTE and global error, identifies the stability region, diagnoses instability, and explains stiffness and the implicit/explicit trade-off.

## Component 8 — P76 Transfer Probe Detail
**Mode: Cross-link** (cross_links = [math.de.euler-method])
Target: Stability analysis for systems; stiffness via Jacobian eigenvalues
Skill tested: Derive system stability condition; compute stiffness; compare explicit vs. implicit for stiff system; connect to general nonlinear ODE Jacobian

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
