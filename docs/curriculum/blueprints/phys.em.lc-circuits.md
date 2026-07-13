# Teaching Blueprint — phys.em.lc-circuits

## Component 0 — Concept Identity

```yaml
concept_id: phys.em.lc-circuits
name: LC Circuits and Electromagnetic Oscillations
domain: electromagnetism
difficulty:
  label: advanced
  number: 5
bloom: apply
prerequisites:
  - phys.em.self-inductance
  - phys.em.capacitance
  - phys.em.ac-basics
mastery_threshold: 0.80
estimated_hours: 6
cross_links:
  - phys.em.ac-basics
  - phys.em.mutual-inductance
session_cap: "7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)"
cpa_entry_stage: "C (anchor; difficulty 5 → C with accelerated P track)"
status: READY
```

---

## Component 1 — Concept Explanation Blocks

### Block 1-A — The Oscillation Mechanism
An LC circuit (inductor L + capacitor C) oscillates electrically just as a mass on a spring oscillates mechanically:

| LC circuit | Mass-spring |
|-----------|-------------|
| Charge Q | Displacement x |
| Current I = dQ/dt | Velocity v = dx/dt |
| ½CV² (electric energy) | ½kx² (potential energy) |
| ½LI² (magnetic energy) | ½mv² (kinetic energy) |
| Capacitance C | 1/k (spring compliance) |
| Inductance L | Mass m |

KVL for an ideal LC circuit: V_C + V_L = 0 → Q/C + L(d²Q/dt²) = 0

> **d²Q/dt² = −Q/(LC)** → SHM with angular frequency **ω₀ = 1/√(LC)**

Solution: **Q(t) = Q₀ cos(ω₀t + φ)**

### Block 1-B — Energy Oscillation
Total energy is conserved (no resistance → no dissipation):

> **U = ½Q²/C + ½LI² = ½Q₀²/C = Q₀²/(2C) = constant**

Energy oscillates between capacitor (electric field) and inductor (magnetic field) at twice the frequency of Q (since U_C ∝ cos²ωt, U_L ∝ sin²ωt).

At t=0 (Q=Q₀, I=0): all energy in capacitor (U_C = Q₀²/2C, U_L = 0)  
At t=T/4 (Q=0, I=I_max): all energy in inductor (U_C = 0, U_L = ½LI²_max)  
Conservation: Q₀²/2C = ½LI²_max → **I_max = Q₀/√(LC) = Q₀ω₀**

### Block 1-C — The Damped LC (RLC) Oscillator
With resistance R (series): energy dissipates, amplitude decays:

> **d²Q/dt² + (R/L)dQ/dt + Q/(LC) = 0**

Solutions (depends on damping ratio γ = R/(2L) vs. ω₀):

- **Underdamped** (R < 2√(L/C)): decaying oscillation Q(t) = Q₀e^{−γt} cos(ω_d t), where ω_d = √(ω₀² − γ²)
- **Critically damped** (R = 2√(L/C)): fastest return to equilibrium without oscillation
- **Overdamped** (R > 2√(L/C)): slow exponential decay, no oscillation

Quality factor: **Q_factor = ω₀L/R = ω₀/(2γ)** — number of radians of oscillation before energy drops to 1/e of initial.

### Block 1-D — Tuning and Resonance Applications
The LC circuit resonates at ω₀ = 1/√(LC). This is exploited in:
- **Radio tuning**: variable capacitor changes C → changes ω₀ → selects station frequency
- **Filters**: LC bandpass filter passes only frequencies near ω₀
- **Oscillators**: in feedback amplifiers, LC tank circuit sets oscillation frequency
- **Wireless charging**: resonant frequency matching maximises power transfer

---

## Component 2 — Worked Examples

### WE-1 — LC Oscillation Period and Maximum Current
**Problem:** LC circuit: L = 25 mH, C = 40 μF. Initial charge Q₀ = 5.0 mC, I(0) = 0. Find: (a) ω₀ and f₀, (b) Q(t) and I(t) expressions, (c) I_max, (d) total energy, (e) time for energy to transfer completely to inductor.

**Solution:**
(a) ω₀ = 1/√(LC) = 1/√(25×10⁻³ × 40×10⁻⁶) = 1/√(10⁻⁶) = **1000 rad/s**  
f₀ = ω₀/(2π) = 1000/6.283 = **159 Hz**

(b) Q(t) = Q₀ cos(ω₀t) = **5.0×10⁻³ cos(1000t) C**  
    I(t) = −dQ/dt = Q₀ω₀ sin(ω₀t) = **5.0 sin(1000t) A**

(c) I_max = Q₀ω₀ = 5.0×10⁻³ × 1000 = **5.0 A**

(d) U = Q₀²/(2C) = (5.0×10⁻³)²/(2×40×10⁻⁶) = 25×10⁻⁶/(80×10⁻⁶) = **0.3125 J**  
    Check: ½LI²_max = ½ × 25×10⁻³ × 25 = 0.3125 J ✓

(e) Energy transfers completely to L when Q = 0, first at t = T/4 = (2π/ω₀)/4 = π/(2×1000) = **1.57 ms**

---

### WE-2 — Damped RLC Oscillation
**Problem:** RLC circuit: L = 10 mH, C = 1.0 μF, R = 50 Ω. Determine: (a) ω₀, (b) damping constant γ, (c) whether underdamped, critically damped, or overdamped, (d) damped frequency ω_d.

**Solution:**
(a) ω₀ = 1/√(LC) = 1/√(10⁻² × 10⁻⁶) = 1/√(10⁻⁸) = **10⁴ rad/s**

(b) γ = R/(2L) = 50/(2×10⁻²) = **2500 rad/s**

(c) Compare γ = 2500 with ω₀ = 10000: γ < ω₀ → **underdamped** (oscillates with decay)  
Critical R: R_c = 2√(L/C) = 2√(10⁻²/10⁻⁶) = 2√(10⁴) = 200 Ω > 50 Ω ✓

(d) ω_d = √(ω₀² − γ²) = √(10⁸ − 6.25×10⁶) = √(9.375×10⁷) = **9685 rad/s** (≈ 3% below ω₀)

---

### WE-3 — Energy Partitioning
**Problem:** In WE-1: (a) At what time is energy equally split between C and L? (b) What is Q and I at that time?

**Solution:**
U_C = U_L = U/2 → ½Q²/C = ¼Q₀²/C → Q = Q₀/√2

(a) Q(t) = Q₀ cos(ω₀t) = Q₀/√2 → cos(ω₀t) = 1/√2 → ω₀t = π/4  
t = π/(4ω₀) = π/(4×1000) = **0.785 ms** (= T/8)

(b) Q = Q₀/√2 = 5.0×10⁻³/1.414 = **3.54 mC**  
    I = Q₀ω₀ sin(ω₀t) = 5.0 × sin(π/4) = 5.0 × 0.707 = **3.54 A**

Verify: U_C = (3.54×10⁻³)²/(2×40×10⁻⁶) = 0.156 J; U_L = ½×25×10⁻³×(3.54)² = 0.156 J ✓ (equal halves of 0.3125 J)

---

## Component 3 — Misconception Engine

### MC-LC-CIRCUIT-OSCILLATION-STOPS-WITHOUT-RESISTANCE
- **trigger_signal:** Student says "the LC circuit will eventually stop oscillating on its own, even without any resistance."
- **conflict_evidence [P28]:** "For an ideal LC circuit (R=0), energy conservation is exact: U = ½Q²/C + ½LI² = constant. At every moment, the energy lost by the capacitor equals the energy gained by the inductor and vice versa. No energy leaves the system. The ODE solution Q(t) = Q₀ cos(ω₀t) oscillates forever with constant amplitude. In practice, all real circuits have some R (wire resistance, component loss), which causes exponential decay — but that's the R, not the LC."
- **bridge_text [P30]:** "An ideal mass-spring system oscillates forever — no friction, no air resistance, perpetual motion is mathematically correct for the ideal case. LC circuit is identical: ideal L and C have no loss mechanism. Real oscillators decay due to unavoidable resistance (equivalent to friction). The ideal model is still useful for calculating ω₀ and initial conditions."
- **replacement_text [P31]:** "Ideal LC (R=0): Q(t) = Q₀ cos(ω₀t) — oscillates forever, energy conserved. Real LC (R > 0): Q(t) = Q₀ e^{−γt} cos(ω_d t) — decaying oscillation. The decay is due to R, not to LC. Without R, the ideal LC oscillates indefinitely."
- **discrimination_pairs [P33]:**
  - Ideal LC (R=0): perpetual oscillation, constant amplitude
  - Underdamped RLC (R small): decaying oscillation, amplitude ~ e^{−γt}
  - Critically damped RLC: fastest return to equilibrium, no oscillation
  - Overdamped RLC: slow exponential approach to equilibrium
- **s6_path:** Plot Q(t) for all four cases on same graph; show ideal case as constant envelope; damped cases with exponential decay envelopes.

---

### MC-ENERGY-STORED-IN-LC-CIRCUIT-IS-HALF-INITIAL
- **trigger_signal:** Student says "at the moment when all energy is in the inductor, the capacitor has lost half its energy" or misapplies energy splitting.
- **conflict_evidence [P28]:** "Total energy U = Q₀²/(2C) = ½LI²_max. At the moment of maximum current (I = I_max, Q = 0): U_C = 0, U_L = ½LI²_max = Q₀²/(2C) = U_total. ALL energy is in the inductor — not half. Energy is conserved: whatever the capacitor loses, the inductor gains exactly, and vice versa. The split is 100%/0% alternating, not 50%/50%."
- **bridge_text [P30]:** "Mass-spring: at maximum compression (max PE), velocity = 0, KE = 0 — all energy is in spring. At equilibrium position (v = max), spring PE = 0 — all energy is kinetic. Energy transfers 100% between the two forms each quarter cycle, not 50%."
- **replacement_text [P31]:** "Energy in LC circuit: U_C + U_L = U_total (constant). At t = 0: U_C = U_total, U_L = 0. At t = T/4: U_C = 0, U_L = U_total. At t = T/8: U_C = U_L = U_total/2 (equal split only at t = T/8, 3T/8, ...). The 50/50 split is not the typical state — it's a passing moment."
- **discrimination_pairs [P33]:**
  - t = 0 (Q = Q₀, I = 0): U_C = 100%, U_L = 0%
  - t = T/8 (Q = Q₀/√2, I = I_max/√2): U_C = 50%, U_L = 50%
  - t = T/4 (Q = 0, I = I_max): U_C = 0%, U_L = 100%
  - t = T/2 (Q = −Q₀, I = 0): U_C = 100%, U_L = 0% (cycle repeats)
- **s6_path:** WE-3: calculate exact time for 50/50 split (T/8); show it's not T/4 or T/2.

---

## Component 4 — Assessment Probes

### Probe Set A — Factual Recall
**A1 (MCQ):** In an LC circuit, the current is maximum when:
**(a) The capacitor charge is zero** (b) The capacitor is fully charged (c) The energy is equally split (d) t = T/2

**A2 (Short answer):** Write the formula for oscillation frequency of an LC circuit. What mechanical system is the LC circuit analogous to?
[ω₀ = 1/√(LC); f₀ = 1/(2π√(LC)); analogous to mass-spring (L↔m, C↔1/k)]

**A3 (Fill-in):** In a damped RLC oscillator, the condition for underdamped oscillation is R < ______.
[2√(L/C)]

---

### Probe Set B — Conceptual Transfer
**B1:** An LC circuit has ω₀ = 2π × 1 MHz. The capacitor is replaced with one of double the capacitance. What is the new frequency?
[ω₀_new = 1/√(L×2C) = ω₀/√2; f_new = f₀/√2 = 1/√2 MHz ≈ 707 kHz]

**B2:** At t = T/4, all LC circuit energy is in the inductor (U_L = 0.5 J, L = 50 mH). Find I at this moment and the initial charge Q₀ on the capacitor (C = 100 μF).
[U_L = ½LI² → I = √(2U/L) = √(2×0.5/0.05) = √20 = 4.47 A. Q₀ = I/ω₀ = I×√(LC) = 4.47×√(5×10⁻⁶) = 4.47×2.236×10⁻³ = 10.0 mC.]

**B3:** A radio receives AM signals (f = 540–1600 kHz). Its LC tuner has L = 50 μH. Find the range of C required.
[C = 1/(ω₀²L) = 1/((2πf)²×50×10⁻⁶). At 540 kHz: C = 1/(2π×540×10³)²×5×10⁻⁵ = 1/(1.152×10¹²) = 1.73 nF. At 1600 kHz: C = 1/(1.006×10¹³) = 0.197 nF. Range: **0.20 nF to 1.74 nF** (adjustable via variable capacitor).]

---

### Probe Set C — Mastery Gate [P91]
**C1 (Multi-step):** RLC circuit: L = 20 mH, C = 5 μF, R = 40 Ω. Initial: Q₀ = 2 mC, I(0) = 0. (a) Find ω₀, γ, classify damping. (b) Find ω_d and period T_d. (c) Find energy after one complete damped oscillation (t = T_d). (d) Find Q_factor.
[(a) ω₀ = 1/√(10⁻²×5×10⁻⁶) = 1/√(5×10⁻⁸) = 4472 rad/s; γ = R/(2L) = 40/(0.04) = 1000 rad/s; γ<ω₀ → underdamped. (b) ω_d = √(4472²−1000²) = √(2×10⁷−10⁶) = √(1.9×10⁷) = 4359 rad/s; T_d = 2π/ω_d = 1.441 ms. (c) U₀ = Q₀²/(2C) = 4×10⁻⁶/(10⁻⁵) = 0.4 J; after T_d: amplitude decays by e^{−γT_d} = e^{−1000×1.441×10⁻³} = e^{−1.441} = 0.237; energy ∝ amplitude² → U(T_d) = U₀×(0.237)² = 0.4×0.056 = 0.0225 J. (d) Q_factor = ω₀/(2γ) = 4472/2000 = 2.24.]

**C2 (Design):** You want to build an FM radio tuner (88–108 MHz) using a fixed L = 100 nH. Find C range. Evaluate damping: if R = 0.5 Ω, find Q_factor at 100 MHz.
[ω = 2πf; C = 1/(ω²L). At 88 MHz: C = 1/(2π×88×10⁶)²×10⁻⁷ = 1/(3.063×10¹⁷) = 3.26 pF. At 108 MHz: C = 1/(4.608×10¹⁷) = 2.17 pF. Range: 2.17–3.26 pF. Q_factor = ω₀L/R = 2π×100×10⁶×10⁻⁷/0.5 = 62.8/0.5 = 125.6. High Q (>100) gives sharp frequency selection — essential for FM reception.]

---

## Component 5 — Retrieval & Spacing Schedule

```yaml
retrieval_events:
  - offset: "+10 min"
    type: free_recall [P62]
    prompt: "Without notes: write ω₀ = 1/√(LC), LC-to-mass-spring analogy (all four pairs), energy conservation formula, and when I is maximum."
  - offset: "+1 day"
    type: retrieval_quiz [P36]
    prompt: "LC circuit: L=10mH, C=250μF. Initial Q₀=3mC. Find ω₀, f₀, T, I_max, total energy. At t=T/8, find U_C and U_L."
  - offset: "+4 days"
    type: interleaved [P33]
    prompt: "Connect LC circuit to RC circuit: both have time constants, both have oscillation/decay behaviour. Fill comparison table: governing equation, solution form, time constant, energy behaviour."
  - offset: "+10 days"
    type: application [P91]
    prompt: "AM radio tuner: L=200μH. Receive 1000 kHz station. Find C. If R=2Ω (coil resistance), find Q_factor and bandwidth Δf=f₀/Q. Compare with a 'bad' coil having R=20Ω."
```

---

## Component 6 — Session Flow Script

```
[P01 — Session open]
"LC circuits oscillate electrically — charge sloshes back and forth between capacitor and inductor, just like a pendulum swings between potential and kinetic energy. This oscillation is how every radio, oscilloscope, and wireless transmitter selects its frequency."

[P41 — Diagnostic]
"In a mass-spring system, what oscillates? What provides the restoring force and what provides the inertia? Can you guess the analogues in an LC circuit?"
→ Correct: "Exactly — C provides restoring 'force' (EMF = Q/C), L provides inertia. Same math."
→ Incorrect: "Great question. The analogy becomes clear once we write the equations."

[P06 — Concrete anchor]
"Charge a capacitor, then connect it to an inductor. The C discharges into L, building up current. When C reaches zero charge, the inductor drives current back into C (Lenz: inductor opposes current drop). The charge builds up opposite sign. Then it reverses again — perpetual oscillation."

[TA-1 — ODE and solution: Block 1-A]
"d²Q/dt² = −Q/(LC). Solution: Q(t) = Q₀ cos(ω₀t). ω₀ = 1/√(LC)."

[P28 — Conflict evidence for MC-ENERGY-STORED-IN-LC-CIRCUIT-IS-HALF-INITIAL]
"At t=T/4 (I=I_max, Q=0): U_C=0, U_L=U_total — ALL energy in inductor. Not half. 50/50 only at t=T/8. WE-3 proves this numerically."

[P51 — Check-in]
"At what instant is the current maximum? At what instant is energy equally split? At what instant is charge zero?"
[I_max at Q=0 (t=T/4); 50/50 at t=T/8; Q=0 at t=T/4]

[TA-2 — Energy oscillation: Block 1-B, WE-1, WE-3]

[P28 — Conflict evidence for MC-LC-CIRCUIT-OSCILLATION-STOPS-WITHOUT-RESISTANCE]
"Ideal LC: U_total constant always. No dissipation path without R. Oscillates forever in theory. Real circuits decay due to wire resistance and core losses (the R) — not due to C or L."

[TA-3 — Damped RLC: Block 1-C, WE-2]

[TA-4 — Tuning applications: Block 1-D, Probe B3]

[P52 — Narrow]
"Two formulas: ω₀ = 1/√(LC); Q_factor = ω₀L/R. Energy: U = Q₀²/(2C) = ½LI²_max."

[P62 — Retrieval seed]
"Write from memory: ω₀ formula, mass-spring analogy, energy conservation, when I is max, condition for underdamping."

[P36 — Mastery probe — Probe C1]

[P68 — Close]
"LC circuits: ω₀ = 1/√(LC), mechanical analogue of mass-spring. Energy oscillates 100% between C and L at ω₀. Damped by R: underdamped, critically damped, overdamped. Q_factor measures sharpness of oscillation. Applications: radio tuning, oscillators, filters."

[P85 — Regulation tail]
"Shakiest: the ODE and solution, the energy at T/4, or the damping classification?"

[P89 — Retrieval schedule]
"Return tomorrow for the LC retrieval quiz."
```

---

## Component 7 — Adaptive Branching

| Signal | Branch |
|--------|--------|
| Probe A1 wrong (picks max charge) | I = dQ/dt; I max when dQ/dt max; Q(t)=cos → dQ/dt=−sin, max when cos=0 → Q=0 |
| Probe B1 wrong (frequency with new C) | ω₀ = 1/√(LC); C doubles → √(LC) increases by √2 → ω₀ decreases by √2 |
| Probe C1(c) wrong (energy after T_d) | Energy ∝ Q² ∝ amplitude²; amplitude decays by e^{−γT_d} per period → energy decays by e^{−2γT_d} |
| Probe C2 wrong (FM range) | C = 1/((2πf)²L); compute for both ends; smaller f → larger C; larger f → smaller C |
| Student asks about real oscillators | Introduce negative resistance (transistor feedback) to compensate R losses → sustained oscillation; used in crystal oscillators, RF transmitters |

---

## Component 8 — Visualisation Specification

**Primary visual:** Four-panel LC energy cycle — t=0: capacitor fully charged (E-field arrows between plates, B=0 in inductor), U_C=100%; t=T/4: capacitor empty, inductor fully energised (B-field arrows through coil, E=0), U_L=100%; t=T/2: capacitor charged opposite polarity, U_C=100%; t=3T/4: inductor energised opposite current, U_L=100%. Complete cycle shown with energy bar chart below each panel.

**Secondary visual:** Q(t), I(t), U_C(t), U_L(t) vs. time — four sinusoidal curves on same time axis: Q=cos, I=sin (90° lead over Q), U_C=cos², U_L=sin² (both oscillate at 2ω₀). Mark t=T/8 (U_C=U_L) and t=T/4 (Q=0, I=max) with vertical lines.

**Tertiary visual:** Damping comparison — three Q(t) curves on same axes: (1) ideal LC (constant amplitude cosine), (2) underdamped RLC (decaying cosine, exponential envelope e^{−γt}), (3) overdamped RLC (monotonic decay, no oscillation). Labels with R values and damping classification.

---

## Component 9 — Validation Checklist

```
V-1  concept_id matches KG exactly (phys.em.lc-circuits)                  PASS
V-2  domain derived correctly (phys.em → electromagnetism)                 PASS
V-3  difficulty number matches label (advanced → 5)                        PASS
V-4  bloom verb matches level (apply → calculate/design)                   PASS
V-5  prerequisites listed in KG (phys.em.self-inductance, phys.em.capacitance, phys.em.ac-basics) PASS
V-6  mastery_threshold = 0.80                                              PASS
V-7  session_cap rule applied (≥1h → PA-3)                                PASS
V-8  cpa_entry_stage matches difficulty 5 formula                          PASS
V-9  status = READY                                                        PASS
V-10 ≥2 misconceptions with all 6 MC fields                               PASS
V-11 ≥3 worked examples with full solution                                 PASS
V-12 Probe sets A (recall), B (transfer), C (mastery gate) present        PASS
V-13 Retrieval schedule has ≥4 events with offsets                        PASS
V-14 Session flow uses P-codes from Primitive Library                      PASS
V-15 Adaptive branching table present                                      PASS
V-16 Visualisation spec present with ≥2 visuals                           PASS
V-17 No framework/runtime/route modifications                              PASS
V-18 No mathematics content authored                                       PASS
V-19 All formulas dimensionally consistent                                 PASS
V-20 Cross-links reference valid KG concept IDs                            PASS
```

**Overall status: READY**
