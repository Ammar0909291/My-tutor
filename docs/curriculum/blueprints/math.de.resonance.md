# Blueprint: math.de.resonance

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.de.resonance |
| name | Resonance in ODEs |
| Domain | math.de |
| Difficulty | advanced |
| Bloom level | analyze |
| Estimated hours | 3 |
| Mastery threshold | 0.80 |
| MAMR | 4/5 |
| Prerequisites | math.de.harmonic-oscillator |
| Cross-links | — |
| Unlocks | — |

## Component 1 — Learning Objective
The student explains resonance as the condition where the driving frequency matches the natural frequency, leading to secular growth (t·sin or t·cos terms) in the undamped case; computes the amplitude response curve H(ω) = 1/√((ω₀²−ω²)² + 4γ²ω²) for the damped forced oscillator; identifies the resonant frequency ω_res = √(ω₀²−2γ²) as the peak of H(ω); distinguishes pure resonance (c=0, ω=ω₀), practical resonance (c>0, ω≈ω_res), and beating (two close frequencies, c=0, ω≠ω₀); and analyses the physical consequences of resonance in engineering contexts.

## Component 2 — CPA Entry Stage
**P — Pictorial** (draw the amplitude response H(ω) vs. ω for three values of damping ratio ζ=0.1, 0.3, 0.7; all curves peak near ω₀; low ζ = sharp tall peak (dangerous resonance); high ζ = broad flat curve (safe); annotate: "Resonance peak: ω_res=√(ω₀²−2γ²) ≈ ω₀ for small damping"; below, show the t·sin(ω₀t) time-series for pure resonance — growing envelope)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | RESONANCE-MEANS-INFINITE-AMPLITUDE | Student thinks resonance always produces infinite amplitude; doesn't distinguish pure resonance (c=0, amplitude literally → ∞ with time) from practical resonance (c>0, amplitude is finite but large) | Type 1 — overgeneralisation (pure resonance IS catastrophic; the qualitative fact "resonance is dangerous" is over-applied to the damped case without recognising that c>0 keeps the steady-state amplitude finite) |
| MC-2 | RESONANT-FREQUENCY-EQUALS-NATURAL-FREQUENCY | Student sets ω_res = ω₀ in all cases; doesn't know that for damped oscillators ω_res = √(ω₀²−2γ²) < ω₀ | Type 5 — instruction-induced (ω₀ is taught as "the" resonant frequency for the undamped case; students apply this to all cases without updating for damping) |
| MC-3 | BEATING-IS-THE-SAME-AS-RESONANCE | Student calls the slow oscillation of the envelope in beating (two close but unequal frequencies) a form of resonance | Type 3 — language contamination ("beating" and "resonance" both describe large oscillations that build periodically; students conflate the bounded-envelope beat pattern with the unbounded secular growth of pure resonance) |

## Component 4 — Session TA Cap
**Cap = 5** (hrs = 3 → cap 5)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Pure resonance and secular growth:**

**Setup:** y'' + ω₀²y = F₀cos(ωt). Undamped (c=0).

**Off-resonance (ω≠ω₀):**
yₚ = [F₀/(ω₀²−ω²)] cos(ωt). Bounded amplitude F₀/|ω₀²−ω²|.

**At resonance (ω=ω₀):** Denominator = 0. Modification rule → try yₚ = t(A cos(ω₀t)+B sin(ω₀t)).
After substitution: yₚ = (F₀/2ω₀)t sin(ω₀t).
Amplitude grows linearly with t: |yₚ| ≈ F₀t/(2ω₀) → ∞. This is pure resonance.

**Beating (ω close to but ≠ ω₀):**
y = C₁cos(ω₀t) + yₚ with yₚ = [F₀/(ω₀²−ω²)]cos(ωt).
Superposition with y(0)=0: y = [F₀/(ω₀²−ω²)][cos(ωt)−cos(ω₀t)].
Using sum-to-product: y = [2F₀/(ω₀²−ω²)] sin((ω₀−ω)t/2) sin((ω₀+ω)t/2).
"Slow envelope" × "fast carrier." The envelope oscillates with frequency (ω₀−ω)/2 — audible beating.

**P49 checkpoint:**
- CORRECT → "Pure resonance: ω=ω₀, c=0 → yₚ=t·sin(ω₀t) — grows without bound. Beating: ω≈ω₀, c=0 → bounded but amplitude oscillates. Both distinct from practical resonance (c>0, finite peak)." → A02
- PARTIAL (MC-3: beating = resonance) → "Beating: two close frequencies produce a BOUNDED envelope that pulses — the maximum amplitude is 2F₀/|ω₀²−ω²|, fixed. Pure resonance: ω=ω₀ exactly → the modification rule gives t·sin(ω₀t) — the amplitude grows WITHOUT BOUND. Beating is an interference pattern; resonance is secular growth. Both involve frequency proximity, but only pure resonance is catastrophic." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "y''+4y=3cos2t. ω₀=2, ω=2 → resonance. yₚ=t(Acos2t+Bsin2t). yₚ''=−4t(Acos2t+Bsin2t)+2(−2Asin2t+2Bcos2t). yₚ''+4yₚ=4Bcos2t−4Asin2t=3cos2t → B=3/4, A=0. yₚ=(3t/4)sin2t. Amplitude grows: at t=10π, |yₚ|≈3·10π/4≈23.6." → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**Damped resonance and the amplitude response curve:**

**Damped forced oscillator:** y'' + 2γy' + ω₀²y = (F₀/m)cos(ωt).
Steady-state: yₚ = H(ω)·F₀ cos(ωt − δ) where:
H(ω) = 1/√((ω₀²−ω²)² + 4γ²ω²) [amplitude response function]
tan δ = 2γω/(ω₀²−ω²) [phase lag]

**Resonant frequency (damped):** dH/dω = 0 gives ω_res = √(ω₀²−2γ²).
Only exists when ω₀²−2γ²>0 (i.e., ζ<1/√2 ≈ 0.707).
Peak amplitude: H(ω_res) = 1/(2γ√(ω₀²−γ²)).

**Quality factor:** Q = ω₀/(2γ). High Q = narrow sharp resonance peak.
Half-power bandwidth: Δω = 2γ = ω₀/Q.

**Engineering consequences:**
- Tacoma Narrows Bridge (1940): aerodynamic forcing near resonance → catastrophic failure.
- MRI: resonance of nuclear spins at the Larmor frequency.
- Musical instruments: resonating air columns, strings tuned to natural frequencies.

**P49 checkpoint:**
- CORRECT → "H(ω)=1/√((ω₀²−ω²)²+4γ²ω²). Peak at ω_res=√(ω₀²−2γ²)<ω₀. Q=ω₀/(2γ) = sharpness. High Q → sharp dangerous resonance." → Gate (P91)
- PARTIAL (MC-2: ω_res=ω₀) → "For c>0 (γ>0), the amplitude peak is at ω_res=√(ω₀²−2γ²) — slightly BELOW ω₀. At exactly ω=ω₀: H(ω₀)=1/(2γω₀), which is the peak only when γ=0. The difference ω₀−ω_res=ω₀−√(ω₀²−2γ²)≈γ²/ω₀ is small for lightly damped systems (γ≪ω₀), so engineering approximations often say ω_res≈ω₀, but the precise formula differs." → TB-R02 → Gate
- INCORRECT → TB-R02 → Gate
- NO_RESPONSE → "y''+0.4y'+4y=2cosωt. ω₀=2, γ=0.2. ω_res=√(4−0.08)=√3.92≈1.98. Peak amplitude=1/(2·0.2·√(4−0.04))=1/(0.4·√3.96)≈1/(0.4·1.99)≈1.26. At ω=ω₀=2: H(2)=1/√(0+4·0.04·4)=1/√0.64=1.25. Close but ω_res≠ω₀." → TB-R02 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 + MC-3 combined):**
Step 1 — "Pure resonance (c=0, ω=ω₀): amplitude = (F₀/2ω₀)·t → ∞. This is UNBOUNDED secular growth — catastrophic."
Step 2 — "Beating (c=0, ω≈ω₀ but ≠ω₀): amplitude oscillates between 0 and 2F₀/|ω₀²−ω²|. BOUNDED — not resonance. The envelope pulses but never grows beyond its initial maximum."
Step 3 — "Practical resonance (c>0, ω≈ω_res): amplitude peaked but FINITE: H(ω_res)=1/(2γ√(ω₀²−γ²)). For small γ this can be very large, but it's still finite. The system doesn't blow up — it settles into a large-amplitude steady oscillation."

**TB-R02 (MC-2 RESONANT-FREQUENCY-EQUALS-NATURAL-FREQUENCY):**
Step 1 — "H(ω) peaks at dH/dω=0. Setting the derivative to zero: ω_res=√(ω₀²−2γ²). This is LESS than ω₀ for any γ>0."
Step 2 — "Physical reason: damping 'shifts' the resonance peak to lower frequencies. The system has to fight against damping, which is more costly at higher frequencies."
Step 3 — "Practical rule: for ζ<0.1 (lightly damped), ω_res≈ω₀ within 1% error. For ζ>0.5, the shift matters significantly. Always use the exact formula ω_res=√(ω₀²−2γ²) unless told damping is negligible."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (5 items):**
1. For y'' + 4y = 3cos(ωt) (undamped): (a) find yₚ for ω=1 and ω=3; (b) apply the modification rule for ω=2; (c) show the beating pattern when ω=1.9 (use the sum-to-product identity).
2. For y'' + 0.6y' + 9y = 2cos(ωt): (a) find ω₀, γ, ζ; (b) find ω_res; (c) compute H(ω_res); (d) compute H at ω=ω₀. Are they equal?
3. Compute the quality factor Q for a system with ω₀=10 rad/s, γ=0.25 rad/s. What is the half-power bandwidth Δω?
4. A bridge has natural frequency 1.2 Hz. Wind gusts have a spectral peak at 1.15 Hz. (a) Are these close enough to worry about resonance? (b) If γ=0.05 rad/s, compute ω_res and H(ω_res). (c) By what factor would increasing the damping from γ=0.05 to γ=0.2 reduce the peak amplitude?
5. Show algebraically that as γ→0⁺, ω_res→ω₀ and H(ω_res)→∞ like 1/(2γω₀). Compare with the pure resonance formula yₚ=(F₀/2ω₀)t sin(ω₀t): in what sense does 1/(2γω₀)→∞ correspond to the secular growth?

**P55 — Reflect & Consolidate:** "Pure resonance (c=0, ω=ω₀): yₚ grows as t·sin(ω₀t). Beating (c=0, ω≈ω₀): bounded envelope oscillates. Damped resonance: H(ω)=1/√((ω₀²−ω²)²+4γ²ω²), peak at ω_res=√(ω₀²−2γ²)<ω₀. Q=ω₀/(2γ): sharpness. All physical resonances are damped; pure resonance is the c→0 limiting case."

**P76 — Transfer Probe (Independence mode):**
(a) Stochastic resonance: in nonlinear systems, adding noise can ENHANCE a weak signal near resonance — the opposite of what classical resonance theory predicts. Explain qualitatively why noise might help a subthreshold signal "jump" past a potential barrier in a bistable system, and why this only works near a characteristic frequency. (b) Cavity resonators in optics: a Fabry-Pérot cavity selects wavelengths λₙ such that the cavity length is nλₙ/2. This is analogous to standing-wave resonance. Write the resonance condition in terms of frequency and show how the cavity Q-factor relates to the mirror reflectivity R via Q = (2πν₀L/c)·R^{1/2}/(1−R). (c) Resonance in Hamiltonian systems: the KAM (Kolmogorov-Arnold-Moser) theorem states that most invariant tori of a nearly integrable system survive small perturbations, but those at rational frequency ratios (resonant tori) are destroyed. Why are resonant tori structurally unstable while non-resonant ones are stable?

**P75 — Mastery Assessment:**
"(a) The Tacoma Narrows Bridge failure (1940): the bridge's torsional natural frequency was approximately 0.2 Hz. Wind-induced forcing at 0.2 Hz caused resonance. Model the bridge as a damped oscillator with ω₀=2π·0.2, γ=0.01ω₀. Compute H(ω_res) and the ratio H(ω_res)/H(0) (dynamic amplification factor). (b) A radio receiver tunes to station 101.5 MHz by adjusting its LC circuit's natural frequency ω₀=2π·101.5×10⁶. The Q-factor is 1000. What is the 3-dB bandwidth Δf in Hz? Is it wide enough to capture the 200 kHz stereo FM signal? (c) For the equation y'' + 2γy' + ω₀²y = F₀δ(t) (impulse forcing), the solution is the impulse response h(t) = (F₀/ω_d)e^{−γt}sin(ω_dt)·𝟙{t≥0}. Show that the Fourier transform Ĥ(ω) of h(t) equals the amplitude response H(ω) (up to a phase factor). This is the connection between resonance in time domain and frequency domain."

**P74 — Routing Decision:**
- Score ≥ 5/5 → MASTERED
- Score 4/5 → REVIEW the distinction between pure resonance, beating, and practical resonance
- Score ≤ 3/5 → PREREQUISITE GAP in math.de.harmonic-oscillator; reassign

**P78 — Completion:** Resonance certified. Student distinguishes pure resonance (secular growth), beating (bounded envelope), and practical resonance (finite peak). Computes ω_res, H(ω_res), Q-factor. Explains physical consequences and engineering implications.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Stochastic resonance; optical cavity Q-factor; KAM theorem and resonant tori
Skill tested: Analyse resonance across noise-driven, wave-optics, and Hamiltonian dynamical contexts

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
