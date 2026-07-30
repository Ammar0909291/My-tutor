# Blueprint: math.de.harmonic-oscillator

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.de.harmonic-oscillator |
| name | Harmonic Oscillator ODE |
| Domain | math.de |
| Difficulty | advanced |
| Bloom level | apply |
| Estimated hours | 6 |
| Mastery threshold | 0.85 |
| MAMR | 5/5 |
| Prerequisites | math.de.char-equation, math.de.undetermined-coefficients |
| Cross-links | math.trig.trig-functions |
| Unlocks | — |

## Component 1 — Learning Objective
The student classifies the harmonic oscillator equation my'' + cy' + ky = F(t) by its discriminant Δ = c² − 4mk into underdamped (Δ<0), critically damped (Δ=0), and overdamped (Δ>0) regimes; writes the homogeneous solution in each case; applies the amplitude-phase form y = R cos(ω₀t − φ) for the underdamped free oscillator; identifies the natural frequency ω₀ = √(k/m), damped frequency ω_d = √(ω₀²−γ²) where γ=c/(2m), and the transient/steady-state decomposition of the forced response; and computes the amplitude of the steady-state response as a function of driving frequency.

## Component 2 — CPA Entry Stage
**A — Abstract to Concrete** (draw three phase-plane portraits side by side: underdamped = spiral inward; critically damped = fastest approach to equilibrium without oscillation; overdamped = sluggish exponential decay; below each portrait write the corresponding solution form; label physical examples: spring-mass (all three), car suspension (underdamped → uncomfortable, overdamped → sluggish, critically damped → ideal), RLC circuit)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | CRITICAL-DAMPING-IS-MAXIMUM-DAMPING | Student thinks critical damping (c² = 4mk) means the most damping; doesn't know overdamped (c² > 4mk) has MORE damping and returns MORE slowly to equilibrium | Type 3 — language contamination ("critical" in everyday language suggests extreme or maximum; in physics it means the boundary between two qualitative behaviours — oscillatory vs. non-oscillatory — not the maximum damping coefficient) |
| MC-2 | NATURAL-FREQUENCY-EQUALS-DAMPED-FREQUENCY | Student uses ω₀=√(k/m) as the oscillation frequency even for the damped case, instead of ω_d=√(ω₀²−γ²) < ω₀ | Type 5 — instruction-induced (the undamped case y''+ω₀²y=0 is taught first; students apply ω₀ to all cases without noticing that damping slows the oscillation) |
| MC-3 | FORCING-AT-ANY-FREQUENCY-CAUSES-RESONANCE | Student thinks resonance occurs whenever there is a periodic forcing, rather than only when the driving frequency equals the natural frequency (ω=ω₀ in the undamped case) | Type 1 — overgeneralisation (resonance is presented dramatically; students associate "forced oscillation" with "resonance" rather than the specific frequency-matching condition) |

## Component 4 — Session TA Cap
**Cap = 8** (hrs = 6 → cap 8)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Free oscillator — three damping regimes:**

**Equation:** my'' + cy' + ky = 0. Characteristic equation: mr² + cr + k = 0.
Roots: r = (−c ± √(c²−4mk))/(2m). Discriminant: Δ = c²−4mk.

| Regime | Condition | Roots | Solution |
|--------|-----------|-------|----------|
| Underdamped | Δ<0 | r = −γ±iω_d | y=e^{−γt}(C₁cosω_dt + C₂sinω_dt) |
| Critically damped | Δ=0 | r=−γ (repeated) | y=(C₁+C₂t)e^{−γt} |
| Overdamped | Δ>0 | r=r₁,r₂ (real, neg.) | y=C₁e^{r₁t}+C₂e^{r₂t} |

where γ = c/(2m), ω₀ = √(k/m), ω_d = √(ω₀²−γ²).

**Amplitude-phase form (underdamped):**
y = e^{−γt}·R cos(ω_dt − φ) where R = √(C₁²+C₂²), tan φ = C₂/C₁.
R = initial amplitude; envelope = Re^{−γt} decays exponentially.

**Physical quantities:**
- Natural frequency: ω₀ = √(k/m) [rad/s]
- Damping ratio: ζ = c/(2√(mk)) = γ/ω₀
- Underdamped: ζ<1; critically damped: ζ=1; overdamped: ζ>1.

**P49 checkpoint:**
- CORRECT → "Underdamped: complex roots → decaying oscillation e^{−γt}cos(ω_dt−φ). Critical: repeated root → (C₁+C₂t)e^{−γt}. Overdamped: two real roots → sum of decaying exponentials." → A02
- PARTIAL (MC-2: uses ω₀ for damped oscillations) → "The damped oscillation frequency is ω_d=√(ω₀²−γ²), NOT ω₀. Damping slows the oscillation: ω_d<ω₀. The solution is y=e^{−γt}(C₁cosω_dt+C₂sinω_dt). Only when c=0 (no damping) does ω_d=ω₀." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "Spring-mass: m=1, c=2, k=5. Δ=4−20=−16<0. Underdamped. γ=c/(2m)=1. ω_d=√(5−1)=2. Solution: y=e^{−t}(C₁cos2t+C₂sin2t). With y(0)=1, y'(0)=0: C₁=1; y'=−e^{−t}(C₁cos2t+C₂sin2t)+e^{−t}(−2C₁sin2t+2C₂cos2t)=0 at t=0: −1+2C₂=0 → C₂=1/2. y=e^{−t}(cos2t+sin2t/2)." → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**Forced oscillator and steady-state response:**

**Equation:** my'' + cy' + ky = F₀cos(ωt). (Driving frequency ω, natural frequency ω₀.)

**General solution:** y = yₕ (transient) + yₚ (steady state).
yₕ → 0 as t→∞ (all three regimes have decaying yₕ for c>0).
yₚ is the long-run behaviour — oscillates at the DRIVING frequency ω.

**Steady-state amplitude (from undetermined coefficients):**
yₚ = A cos(ωt) + B sin(ωt).
Amplitude of steady-state response:
|yₚ| = F₀/√((k−mω²)² + c²ω²).

**Resonance in damped system:** Amplitude is maximised when ω = ω_res = √(ω₀²−2γ²) (slightly below ω₀).

**Undamped resonance (c=0):** At ω=ω₀, the formula gives division by zero; apply modification rule → yₚ = (F₀/2mω₀)t sin(ω₀t). Amplitude grows without bound.

**P49 checkpoint:**
- CORRECT → "Forced: y=yₕ(transient)+yₚ(steady-state). Steady-state amplitude =F₀/√((k−mω²)²+c²ω²). Resonance (undamped): ω=ω₀ → modification rule → amplitude grows as t." → Gate (P91)
- PARTIAL (MC-3: all forcing causes resonance) → "Resonance requires the driving frequency to MATCH the system's natural frequency: ω=ω₀ (for undamped), or ω≈ω_res (for damped). At other frequencies, yₚ oscillates at amplitude F₀/√(...), which can be small or large but is FINITE for c>0. Only at the resonant frequency does the amplitude peak (or blow up for c=0)." → TB-R02 → Gate
- INCORRECT → TB-R02 → Gate
- NO_RESPONSE → "y''+4y=cos3t. ω₀=2, ω=3. Steady-state: yₚ=Acos3t+Bsin3t. yₚ''=−9Acos3t−9Bsin3t. (−9A+4A)cos3t+(−9B+4B)sin3t=cos3t → −5A=1→A=−1/5; −5B=0→B=0. yₚ=−cos3t/5. At ω=2: denominator=4−4·4=−12 → |yₚ|=1/12... wait: (k−mω²)=(4−4)=0; undamped resonance → use modification rule → yₚ=(t/4)sin2t." → TB-R02 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 + MC-2 combined):**
Step 1 — "Three regimes: underdamped (oscillates and decays), critically damped (fastest non-oscillatory return), overdamped (slow exponential, NO oscillation). Increasing c past 2√(mk) moves from underdamped → critically damped → overdamped — MORE damping, SLOWER return."
Step 2 — "Damped frequency: ω_d=√(ω₀²−γ²) where γ=c/(2m). With c=0: ω_d=ω₀ (undamped). As c increases (γ increases), ω_d decreases. At critical damping: ω_d=0 (no oscillation)."
Step 3 — "Memory aid: 'underdamped' = damping is UNDER the critical value; oscillations survive. 'Overdamped' = damping is OVER the critical value; energy is dissipated so fast oscillations can't form."

**TB-R02 (MC-3 FORCING-CAUSES-RESONANCE):**
Step 1 — "Resonance is a frequency-matching phenomenon. The denominator (k−mω²)²+c²ω² tells the whole story: maximum amplitude when (k−mω²)²+c²ω² is MINIMUM."
Step 2 — "For c>0: denominator is always positive → amplitude is always finite. No matter what ω is, you get a finite response. 'Large response' near resonance ≠ 'resonance'; true resonance is the maximum of the amplitude function."
Step 3 — "For c=0, ω=ω₀: denominator=0 → undetermined coefficients gives division by zero → modification rule applies → yₚ contains t·sin(ω₀t) → unbounded growth. This is true resonance."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (5 items):**
1. Classify the oscillator with m=1, c=6, k=9 (find Δ, γ, ω_d if applicable). Solve y(0)=1, y'(0)=0.
2. For m=1, c=0, k=4: find the solution y(0)=0, y'(0)=2. Write in amplitude-phase form R cos(ω₀t−φ).
3. Forced underdamped oscillator: y'' + 2y' + 5y = 3cos t. Find the transient and steady-state parts. What is the long-run behaviour?
4. For the undamped forced oscillator y'' + ω₀²y = cos(ωt) (ω≠ω₀): find the steady-state amplitude. Plot amplitude vs. ω and identify the resonant peak. What happens as c→0?
5. RLC circuit: L d²q/dt² + R dq/dt + q/C = E₀cos(ωt). Identify the analogues of m, c, k, F₀. Find the steady-state current I=dq/dt amplitude as a function of ω.

**P55 — Reflect & Consolidate:** "my''+cy'+ky=F. Δ=c²−4mk: Δ<0 underdamped (oscillates, decays), Δ=0 critically damped, Δ>0 overdamped. ω₀=√(k/m), γ=c/(2m), ω_d=√(ω₀²−γ²). Forced: y=yₕ+yₚ. yₚ amplitude =F₀/√((k−mω²)²+c²ω²). Resonance: ω=ω₀ with c=0."

**P76 — Transfer Probe (Cross-link mode: math.trig.trig-functions):**
(a) The RLC circuit and the spring-mass system obey the SAME second-order ODE — the same mathematical structure produces electromagnetic oscillations and mechanical vibrations. Identify the exact analogy: charge q ↔ position x, inductance L ↔ mass m, resistance R ↔ damping c, 1/C ↔ spring constant k. Use this analogy to predict the frequency of a lossless LC oscillator (R=0) and its resonance. (b) The amplitude-phase form y=Re^{−γt}cos(ω_dt−φ) uses both exponential and trigonometric functions. Derive R and φ in terms of the initial conditions y(0)=y₀, y'(0)=v₀. Show that R²=y₀²+(v₀+γy₀)²/ω_d². (c) In quantum mechanics, the harmonic oscillator Hamiltonian is H=p²/(2m)+mω₀²x²/2. The classical correspondence: the expectation value ⟨x⟩(t) satisfies the classical equation m⟨x⟩''=−mω₀²⟨x⟩. How does damping fit into the quantum picture?

**P75 — Mastery Assessment:**
"(a) A mass-spring-damper system has m=2 kg, k=50 N/m, c=20 N·s/m. Is it underdamped, critically damped, or overdamped? Find the general solution. (b) The system in (a) is given initial conditions x(0)=0.1 m, x'(0)=0. Find the particular solution and the time at which the mass first returns to x=0. (c) A forcing F(t)=5cos(ωt) is applied to an undamped oscillator (m=1, k=4, c=0). For ω=1,2,3: compute the steady-state amplitude. Which ω is closest to resonance? (d) For the forced undamped oscillator y''+4y=cos2t (resonance): apply the modification rule to find yₚ=(t/4)sin2t. Interpret this physically: why does energy accumulate without bound?"

**P74 — Routing Decision:**
- Score ≥ 5/5 → MASTERED
- Score 4/5 → REVIEW the damped frequency formula and the steady-state amplitude expression
- Score ≤ 3/5 → PREREQUISITE GAP in math.de.char-equation or math.de.undetermined-coefficients; reassign

**P78 — Completion:** Harmonic Oscillator ODE certified. Student classifies damping regimes from the discriminant; writes correct solution form in each case; distinguishes ω₀ from ω_d; computes steady-state amplitude; identifies resonance condition.

## Component 8 — P76 Transfer Probe Detail
**Mode: Cross-link** (cross_links = [math.trig.trig-functions])
Target: RLC circuit analogy; amplitude-phase derivation; quantum harmonic oscillator classical limit
Skill tested: Apply the harmonic oscillator ODE across physics domains and connect trig functions to the amplitude-phase representation

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
