# Teaching Blueprint — phys.wave.damped-oscillations

## Component 0 — Concept Identity

```yaml
concept_id: phys.wave.damped-oscillations
name: Damped Oscillations
domain: waves
difficulty:
  label: advanced
  number: 5
bloom: analyze
prerequisites:
  - phys.wave.shm-energy
mastery_threshold: 0.80
estimated_hours: 5
cross_links:
  - phys.wave.forced-oscillations
  - phys.mech.friction
  - phys.therm.heat-transfer
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (anchor; difficulty 5 → C with accelerated P track)
status: READY
```

---

## Component 1 — Narrative Spine

**Hook (S0 novice):** Strike a tuning fork, hold it near a microphone, and watch the amplitude trace on an oscilloscope. It decays — smoothly, exponentially. Push a child on a swing, stop pushing, and watch the arc shrink with every pass. Real oscillators always lose energy to their surroundings. The question is how fast and what mathematical shape that decay takes.

**Conceptual arc:**
1. Revisit SHM: in perfect SHM, total energy E = ½kA² is constant — no energy loss.
2. Introduce damping: a velocity-dependent resistive force F_d = −bv opposes motion, where b [kg/s] is the damping coefficient.
3. Modified equation of motion: mẍ + bẋ + kx = 0. Divide by m: ẍ + 2γẋ + ω₀²x = 0, where γ = b/(2m) is the damping rate, ω₀ = √(k/m) is the natural frequency.
4. Three regimes:
   - **Underdamped** (γ < ω₀): oscillates with decaying amplitude; ω_d = √(ω₀² − γ²).
     x(t) = A₀ e^(−γt) cos(ω_d t + φ).
   - **Critically damped** (γ = ω₀): returns to equilibrium fastest without oscillating.
     x(t) = (A + Bt) e^(−γt).
   - **Overdamped** (γ > ω₀): returns slowly without oscillating; two real exponential decay constants.
5. Energy decay: E(t) = ½kA₀² e^(−2γt) — energy falls at twice the rate of amplitude.
6. Quality factor Q = ω₀/(2γ): number of radians of oscillation per e-folding of energy. High-Q → low damping.
7. Q as a practical indicator: Q = 2π × (energy stored)/(energy dissipated per cycle).
8. Logarithmic decrement δ = γT_d = π/Q: ratio of successive amplitude peaks; measured in experiment.

**Closing synthesis:** Damping is the signature of a real oscillator interacting with its environment. The underdamped, critically damped, and overdamped regimes are not just mathematical cases — they correspond to physical design choices (door closers, car suspensions, seismograph needles) made deliberately because each regime has different practical utility.

---

## Component 2 — Worked Examples

### WE-1 (Concrete — underdamped oscillator)

**Scenario:** A mass m = 0.2 kg on a spring (k = 50 N/m) in air experiences viscous damping b = 0.4 kg/s. Find: (a) natural frequency ω₀, (b) damping rate γ, (c) damped frequency ω_d, (d) time constant τ, (e) Q factor.

**Step 1 — Natural frequency.**
ω₀ = √(k/m) = √(50/0.2) = √250 = 15.81 rad/s.

**Step 2 — Damping rate.**
γ = b/(2m) = 0.4/(2 × 0.2) = 1.0 s⁻¹.

**Step 3 — Check regime.**
γ = 1.0 < ω₀ = 15.81 → underdamped. ✓

**Step 4 — Damped frequency.**
ω_d = √(ω₀² − γ²) = √(250 − 1) = √249 ≈ 15.78 rad/s.
(Only 0.2% lower than ω₀ — light damping barely shifts frequency.)

**Step 5 — Time constant.**
τ = 1/γ = 1.0 s. After 1 s, amplitude = A₀/e ≈ 0.368 A₀.

**Step 6 — Q factor.**
Q = ω₀/(2γ) = 15.81/(2 × 1.0) = 7.9.
After ~7.9 radians (≈ 1.26 oscillations), energy falls by e⁻¹.

**Answer:** ω₀ = 15.8 rad/s; γ = 1.0 s⁻¹; ω_d ≈ 15.8 rad/s; τ = 1.0 s; Q ≈ 7.9 (moderately underdamped).

---

### WE-2 (Bridging — critical damping design)

**Scenario:** A car door closer is to be designed as a critically damped system. The door assembly has effective mass m = 4 kg and is modeled as a spring-damper with spring constant k = 16 N/m. What value of damping coefficient b achieves critical damping?

**Critical damping condition:** γ = ω₀.
ω₀ = √(k/m) = √(16/4) = √4 = 2.0 rad/s.
γ = b/(2m) → b = 2mγ = 2 × 4 × 2.0 = 16 kg/s.

**Why critical?** Underdamped: door bounces and oscillates (annoying, stress on frame). Overdamped: door closes too slowly (inconvenient, wastes energy). Critically damped: fastest return without overshoot — optimal design.

**Answer:** b = 16 kg/s. Critical damping gives b_c = 2√(km) = 2√(16×4) = 2×8 = 16 kg/s. ✓

---

### WE-3 (Abstract — Q factor from energy ratio)

**Derive and apply:** A pendulum clock loses 1% of its energy per swing. Find Q.

**Definition:** Q = 2π × (energy stored)/(energy lost per cycle) = 2πE/|ΔE per cycle|.

**Given:** |ΔE|/E = 0.01 per cycle.
Q = 2π / 0.01 = 628.

**Interpretation:** A Q of 628 means the pendulum oscillates for ~628/(2π) ≈ 100 e-folding cycles before amplitude falls to A₀/e. In practice, a pendulum clock with this Q runs accurately for many days before requiring re-winding.

**Time to half-amplitude:**
From x(t) = A₀ e^(−γt) and Q = ω₀/(2γ) → γ = ω₀/(2Q).
τ = 1/γ = 2Q/ω₀ = QT/π, where T ≈ 1 s for a clock pendulum.
τ = 628/(π) ≈ 200 s ≈ 3.3 min per e-folding of amplitude; ½-amplitude after τ ln2 ≈ 139 s ≈ 2.3 min.

**Answer:** Q ≈ 628.

---

## Component 3 — Misconception Engine

### MC-DAMPING-CHANGES-FREQUENCY

**Trigger signal:** Student states "damping slows the oscillation down — it reduces the frequency."

**Conflict evidence [P28]:** "Let me put a number to it. For the WE-1 system: ω₀ = 15.81 rad/s and ω_d = 15.78 rad/s — a difference of 0.2%. Would you measure that difference in a normal lab? What does this tell you about frequency shift from light damping?"

**Bridge text [P30]:** "Damping does shift the frequency: ω_d = √(ω₀² − γ²). But in underdamped systems (which are the ones we observe oscillating), γ ≪ ω₀, so ω_d ≈ ω₀ — essentially unchanged. It's only for very heavy damping (γ approaching ω₀) that the frequency shift becomes appreciable, and near critical damping the system barely oscillates at all."

**Replacement text [P31]:** "Damping's main effect is amplitude decay — the oscillation shrinks exponentially. The frequency shifts very little for underdamped systems (the physically common case). The 'slowing down' you perceive when watching a dying oscillator is the amplitude shrinking, not the period lengthening."

**Discrimination pairs [P33]:**
- "Q = 100 oscillator: how much does damping shift frequency relative to ω₀?" → ω_d/ω₀ = √(1 − 1/(4Q²)) ≈ 1 − 1/(8×10⁴) — completely negligible.
- "Q = 0.7 oscillator (overdamped): does it oscillate at all?" → No — it creeps back to equilibrium without oscillating. Frequency concept doesn't apply.

**s6_path:** "Think of damping as an amplitude eraser, not a frequency reducer. The shape of each oscillation is nearly unchanged; it's just getting smaller."

---

### MC-ENERGY-DECAYS-SAME-RATE-AS-AMPLITUDE

**Trigger signal:** Student says "if amplitude halves after time t₁, then energy also halves after t₁."

**Conflict evidence [P28]:** "Energy is E = ½kA². If amplitude = A₀/2, what is E? Compare to E₀ = ½kA₀²." 

*Lead them: E = ½k(A₀/2)² = ¼ × ½kA₀² = E₀/4 — energy is one-quarter, not half.*

**Bridge text [P30]:** "Amplitude decays as e^(−γt) but energy decays as amplitude squared: e^(−2γt). Energy decays twice as fast as amplitude — in the same time that amplitude falls to A₀/e, energy falls to E₀/e². The two e-folding timescales differ by factor 2."

**Replacement text [P31]:** "Amplitude time constant τ_A = 1/γ. Energy time constant τ_E = 1/(2γ) = τ_A/2. Energy drains away at twice the rate of amplitude. Q is defined in terms of energy (Q = 2π × energy stored / energy lost per cycle), not amplitude."

**Discrimination pairs [P33]:**
- "Amplitude falls to 50% in 2 s. At t = 2 s, what fraction of initial energy remains?" → A = A₀/2 → E = E₀/4 = 25%, not 50%.
- "At what time does energy fall to 10% of E₀ if τ_A = 5 s?" → E = E₀ e^(−t/2.5) = 0.1 E₀ → t = 2.5 ln(10) ≈ 5.76 s.

**s6_path:** "Keep in mind: amplitude is the visible thing, energy is the physics thing — they decay at different rates."

---

## Component 4 — Diagnostic Probe Set

**P4-a (prereq: SHM energy):** In SHM, when is kinetic energy maximum?
*When x = 0 (equilibrium) — all energy kinetic.*

**P4-b (regime identification):** γ = 5 s⁻¹, ω₀ = 3 rad/s. Which regime?
*γ > ω₀ → overdamped.*

**P4-c (amplitude decay):** An oscillator has γ = 0.2 s⁻¹ and A₀ = 10 cm. What is the amplitude after 5 s?
*A = 10 × e^(−0.2×5) = 10 × e^(−1) = 10/e ≈ 3.68 cm.*

**P4-d (energy decay):** For the system in P4-c, what fraction of initial energy remains after 5 s?
*E/E₀ = e^(−2×0.2×5) = e^(−2) ≈ 0.135 = 13.5%.*

**P4-e (Q factor):** A tuning fork has Q = 1000. It oscillates at f = 440 Hz. Estimate how long before amplitude falls to 1/e of initial.
*τ_A = Q/(πf) = 1000/(π × 440) ≈ 0.72 s.*
*(Derivation: γ = ω₀/(2Q); τ_A = 1/γ = 2Q/ω₀ = 2Q/(2πf) = Q/(πf).)*

---

## Component 5 — Socratic Thread

**Turn 1 [P41 diagnostic]:** "You push a pendulum and let go. Describe what happens to amplitude and period over time — do both change?"

*Expected: amplitude decreases, period roughly constant. If "both decrease," challenge with the timing evidence.*

**Turn 2 [P06 concrete anchor]:** "Think of a car driving over a speed bump. Without shock absorbers, what happens? With good shock absorbers? Which regime is each?"

*No dampers → underdamped (car bounces). Good dampers → critically damped (returns smoothly, no bounce).*

**Turn 3 [P28 conflict — MC-DAMPING-CHANGES-FREQUENCY]:** "Guess: if I add a small damping force to a spring-mass oscillator, by what percentage does the frequency change? Compute ω_d for ω₀ = 10 and γ = 0.1 — then tell me."

*ω_d = √(100 − 0.01) = √99.99 ≈ 9.9995 — 0.005% shift. Minimal.*

**Turn 4 [P30 bridge]:** "Damping is primarily an amplitude eraser, not a frequency reducer. The amplitude decays as e^(−γt). If amplitude is A, what is the energy? How fast does energy decay?"

*E ∝ A² → e^(−2γt). Energy decays at rate 2γ.*

**Turn 5 [P28 conflict — MC-ENERGY-DECAYS-SAME-RATE]:** "If amplitude halves in 3 seconds, has energy halved after 3 seconds? Calculate E/E₀ when A = A₀/2."

*E/E₀ = (½)² = ¼. Energy is now 25%, not 50%.*

**Turn 6 [P51 check-in]:** "So: amplitude ~ e^(−γt), energy ~ e^(−2γt). What does Q measure physically?"

*Target: number of radians before energy falls to 1/e — a measure of oscillator quality.*

**Turn 7 [P52 narrow]:** "Three engineers are designing: (A) a suspension bridge, (B) an atomic clock oscillator, (C) a door closer. Which Q do they want — high, medium, or low? Why?"

*A: moderate Q (some damping for wind, but not over-damped); B: highest possible Q (minimal energy loss → stable oscillation); C: Q ≈ ½ (critically damped → fastest return without bounce).*

**Turn 8 [P62 retrieval seed]:** "Write the equation of motion for a damped oscillator and identify every coefficient. What is the physical meaning of b?"

*mẍ + bẋ + kx = 0. b = viscous damping coefficient [kg/s]; b = 0 is perfect SHM.*

**Turn 9 [P36 mastery probe]:** "A 0.5 kg mass on a spring (k = 8 N/m) has b = 2 kg/s. Find ω₀, γ, determine the regime, compute ω_d, and estimate Q."

*ω₀ = 4 rad/s; γ = 2 s⁻¹; γ = ω₀ = 2 ← wait, γ = b/(2m) = 2/(2×0.5) = 2 s⁻¹; ω₀ = 4 rad/s. γ < ω₀ → underdamped. ω_d = √(16−4) = √12 = 3.46 rad/s. Q = 4/(2×2) = 1.0 — low Q, heavily damped but still underdamped.*

---

## Component 6 — Session Flow

```
[P01 open] → [P41 diagnostic: amplitude vs period behaviour] → [P06 anchor: car shock absorbers]
→ [MC-DAMPING-CHANGES-FREQUENCY: P28 conflict → P30 bridge → P31 replacement → P33 pairs]
→ [WE-1: underdamped oscillator full parameter set]
→ [P51 check-in]
→ [MC-ENERGY-DECAYS-SAME-RATE-AS-AMPLITUDE: P28 → P30 → P31 → P33]
→ [WE-2: critical damping design]
→ [P52 narrow: regime identification + Q factor]
→ [WE-3: Q from energy loss per cycle]
→ [P62 retrieval seed: equation of motion reconstruction]
→ [P36 mastery probe: full parameter computation for new system]
→ [P89 retrieval schedule: Day 1, Day 4, Day 14]
→ [P91 mastery gate: 80% on P4-a through P4-e]
→ [P85 regulation tail]
→ [P68 close]
```

---

## Component 7 — Differentiation Variants

**S0 (novice):** Start with a real demo video — oscilloscope trace of a tuning fork decay. Identify: amplitude drops, frequency stays constant. Introduce only underdamped case first. Defer critical and overdamped to a second session. Skip WE-3 derivation; emphasize WE-1 numerical.

**S1 (knows formula, no physical intuition):** Ask them to predict: "What happens if you double b? Does the system stop oscillating sooner? Calculate." Force quantitative prediction before computing. Prevents formula-substitution without physical model.

**S4 (prereq gap — SHM energy weak):** Return to phys.wave.shm-energy. Ensure E = ½kA² and the energy-amplitude relationship are secure before introducing decay. P4-a probe reveals this gap.

**S6 (math anxiety):** Focus on the physical picture — exponential decay curve, three regimes by analogy (bouncing vs. settling vs. crawling). Provide γ table for WE-1 style problems. Calculator for all numerical probes.

**S7 (overconfident):** Challenge immediately with P4-d (energy fraction when amplitude halves). Most S7 students say ½ — the answer ¼ surprises them. Then demand derivation of Q from definition (WE-3 level).

---

## Component 8 — Retrieval Schedule

```yaml
retrieval_events:
  - offset_days: 1
    format: P4-b (regime identification) + P4-c (amplitude decay)
  - offset_days: 4
    format: P4-d (energy fraction) — specifically tests the A² vs A decay rate distinction
  - offset_days: 14
    format: P4-e (Q factor for tuning fork) + "design a critically damped door closer: given m and k, find b"
```

---

## Component 9 — Validation Checklist

```
V-1  concept_id matches KG exactly: phys.wave.damped-oscillations ✓
V-2  prerequisites listed in KG: phys.wave.shm-energy ✓
V-3  bloom verb matches level (analyze): "analyze … derive … compare regimes" ✓
V-4  mastery_threshold = 0.80 ✓
V-5  session_cap present: 7 TAs ✓
V-6  cpa_entry_stage correct for difficulty 5: "C (anchor; difficulty 5 → C with accelerated P track)" ✓
V-7  Narrative Spine covers hook → arc → synthesis ✓
V-8  3 worked examples (Concrete / Bridging / Abstract) ✓
V-9  Misconception Engine: 2 MCs, each with all 6 fields ✓
V-10 Diagnostic Probe Set: 5 probes (P4-a to P4-e) ✓
V-11 Socratic Thread: 9 turns, correct Primitive codes ✓
V-12 Session Flow: linear sequence with all required Primitives ✓
V-13 Differentiation Variants: S0/S1/S4/S6/S7 covered ✓
V-14 Retrieval Schedule: 3 events at Day 1/4/14 ✓
V-15 All Primitive codes valid (P01 P06 P28 P30 P31 P33 P36 P41 P51 P52 P62 P68 P85 P89 P91) ✓
V-16 cross_links pedagogically justified: forced-oscillations, friction, heat-transfer ✓
V-17 difficulty number 5 consistent with bloom=analyze and estimated_hours=5 ✓
V-18 domain "waves" matches concept_id prefix phys.wave ✓
V-19 No framework/runtime/route/schema modifications ✓
V-20 Status READY ✓
```
