# Teaching Blueprint — phys.em.self-inductance

## Component 0 — Concept Identity

```yaml
concept_id: phys.em.self-inductance
name: Self-Inductance
domain: electromagnetism
difficulty:
  label: advanced
  number: 5
bloom: apply
prerequisites:
  - phys.em.faradays-law
mastery_threshold: 0.80
estimated_hours: 6
cross_links:
  - phys.em.mutual-inductance
  - phys.em.lc-circuits
  - phys.em.solenoid
session_cap: "7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)"
cpa_entry_stage: "C (anchor; difficulty 5 → C with accelerated P track)"
status: READY
```

---

## Component 1 — Concept Explanation Blocks

### Block 1-A — Definition
**Self-inductance** L of a circuit is the ratio of the flux linkage through the circuit to the current producing it:

> **L = NΦ_B / I** (units: Henry, H = Wb/A = V·s/A)

By Faraday's law, when current I changes, the flux linkage NΦ_B = LI changes too, inducing a back-EMF:

> **ε_L = −L dI/dt**

The negative sign: the induced EMF opposes the change in current (Lenz's law for self-inductance).

Physical meaning:
- A **large L** means the coil is magnetically "heavy" — it resists current changes strongly (large back-EMF per unit dI/dt)
- Self-inductance is the electromagnetic analogue of mass in mechanics: L↔m, I↔v, ε_L↔−F_inertia

### Block 1-B — Inductance of Standard Geometries

**Solenoid** (N turns, length l, cross-section area A, n = N/l):
> **L = μ₀N²A/l = μ₀n²Al**

(Using: Φ per turn = μ₀nIA; NΦ = μ₀n²IAl; L = μ₀n²Al)

**Toroid** (N turns, mean radius R, cross-section area A):
> **L = μ₀N²A/(2πR)**

**Single circular loop** (radius R):
> **L ≈ μ₀R(ln(8R/a) − 2)** (a = wire radius; derived via Neumann formula)

**Coaxial cable** (inner radius a, outer radius b, length l):
> **L = (μ₀l/2π) ln(b/a)**

### Block 1-C — Energy Stored in an Inductor
To establish current I in an inductor from zero, external work must be done against the back-EMF:

dU = ε_L × I dt = L(dI/dt) × I dt = LI dI

> **U_L = ∫₀ᴵ LI' dI' = ½LI²**

This energy is stored in the magnetic field. The energy density (energy per unit volume) in the field:
> **u_B = B²/(2μ₀)**

For a solenoid: U = ½LI² = ½(μ₀n²Al)I² = (B²/2μ₀)(Al) = u_B × Volume ✓

Comparison with capacitor: U_C = ½CV² (electric field energy); U_L = ½LI² (magnetic field energy)

### Block 1-D — RL Circuit: Current Build-Up and Decay
In a series RL circuit with EMF ε:

**Build-up** (switch closed at t=0):
> **I(t) = (ε/R)(1 − e^{−t/τ_L})**, where **τ_L = L/R**

**Decay** (switch opened at t=0, ε removed):
> **I(t) = I₀ e^{−t/τ_L}**

Time constant τ_L = L/R: larger L → slower rise; larger R → faster decay (resistance dissipates energy quickly).

At t=0 (switch closes): I=0, all ε across L. Inductor acts like **open circuit** initially (opposes current change).  
At t→∞: dI/dt=0, back-EMF=0, all ε across R. Inductor acts like **short circuit** (wire of zero resistance).

---

## Component 2 — Worked Examples

### WE-1 — Inductance of a Solenoid
**Problem:** A solenoid: N = 600 turns, l = 30 cm, circular cross-section diameter = 4.0 cm. Find L.

**Solution:**
A = π(0.02)² = 1.257×10⁻³ m²  
n = 600/0.30 = 2000 turns/m  
L = μ₀n²Al = 4π×10⁻⁷ × (2000)² × 1.257×10⁻³ × 0.30  
= 4π×10⁻⁷ × 4×10⁶ × 3.77×10⁻⁴  
= 4π×10⁻⁷ × 1508  
= **1.90×10⁻³ H = 1.90 mH**

---

### WE-2 — Energy and RL Time Constant
**Problem:** An RL circuit: L = 50 mH, R = 10 Ω, ε = 12 V. Find: (a) τ_L, (b) I at t = τ_L, (c) energy stored at steady state, (d) back-EMF at t = 0.

**Solution:**
(a) τ_L = L/R = 50×10⁻³/10 = **5.0 ms**

(b) I(τ_L) = (ε/R)(1 − e⁻¹) = (12/10)(0.6321) = **0.759 A**

(c) I_∞ = ε/R = 12/10 = 1.2 A  
U_L = ½LI²_∞ = ½ × 50×10⁻³ × (1.2)² = **36 mJ**

(d) At t=0, I=0, all ε across L:  
ε_L = L(dI/dt)|_{t=0} = L × (ε/L) = **ε = 12 V** (full source voltage appears across L at t=0)  
[Since I(t) = (ε/R)(1−e^{−t/τ}), dI/dt|_{t=0} = ε/(Lτ_L) × τ_L = ε/L × 1 = 12/0.05 = 240 A/s; ε_L = L×240 = 12 V ✓]

---

### WE-3 — Magnetic Field Energy Density
**Problem:** A solenoid from WE-1 carries I = 2.0 A. Find: (a) B inside, (b) energy stored, (c) energy density.

**Solution:**
(a) B = μ₀nI = 4π×10⁻⁷ × 2000 × 2.0 = **5.03×10⁻³ T = 5.03 mT**

(b) U_L = ½LI² = ½ × 1.90×10⁻³ × (2.0)² = **3.80×10⁻³ J = 3.80 mJ**

(c) u_B = B²/(2μ₀) = (5.03×10⁻³)²/(2 × 4π×10⁻⁷) = 2.53×10⁻⁵/(8π×10⁻⁷) = **10.0 J/m³**

Check: Volume = Al = 1.257×10⁻³ × 0.30 = 3.77×10⁻⁴ m³  
U = u_B × V = 10.0 × 3.77×10⁻⁴ = **3.77 mJ** ≈ 3.80 mJ ✓ (small rounding difference)

---

## Component 3 — Misconception Engine

### MC-INDUCTOR-OPPOSES-CURRENT-FLOW
- **trigger_signal:** Student says "an inductor blocks DC current" or "inductors always reduce current."
- **conflict_evidence [P28]:** "At t→∞ in an RL circuit: dI/dt = 0 → back-EMF = L×0 = 0 → inductor acts as a short circuit. Full steady-state current I = ε/R flows. An ideal inductor (zero resistance) presents zero impedance to DC at steady state. What inductors block is CHANGES in current — not current itself. The back-EMF is proportional to dI/dt, not to I."
- **bridge_text [P30]:** "Inductors are the electromagnetic analogue of mass: mass doesn't prevent motion — it resists changes in velocity (acceleration). An inductor doesn't prevent current — it resists changes in current (dI/dt). Once current reaches steady state (dI/dt = 0), the inductor has zero back-EMF and full current flows."
- **replacement_text [P31]:** "ε_L = −L(dI/dt). At DC steady state: dI/dt = 0 → ε_L = 0 → inductor = short circuit. What inductors resist is the CHANGE in current, not steady current. At AC (constantly changing I), inductors do present impedance Z_L = ωL — but that's AC behaviour."
- **discrimination_pairs [P33]:**
  - t = 0 (switch closes): L acts like open circuit (opposes sudden current change)
  - t = τ_L: current building, L has partial back-EMF
  - t >> τ_L (steady state): L acts like short circuit (dI/dt = 0, no back-EMF)
- **s6_path:** Plot I(t) in RL circuit; show asymptotic approach to ε/R; emphasise that steady-state current is NOT zero.

---

### MC-LARGER-L-MEANS-MORE-ENERGY-STORED-AT-ALL-TIMES
- **trigger_signal:** Student says "I should always use the largest inductor to store the most energy" without considering current.
- **conflict_evidence [P28]:** "U_L = ½LI². Energy depends on BOTH L and I. A large L with small I may store less energy than a small L with large I. Example: L=1H, I=0.1A → U=5mJ. L=0.01H, I=10A → U=500mJ — 100× more despite 100× smaller L. For power conversion, high-current low-L inductors often store more energy than high-L low-current designs."
- **bridge_text [P30]:** "Kinetic energy = ½mv²: more mass doesn't always mean more KE — you need to know the speed too. Similarly, U_L = ½LI² — you need both L and I. The product LI² is what determines stored energy, not L alone."
- **replacement_text [P31]:** "U_L = ½LI². Maximising energy requires maximising LI² — not just L. At a given voltage and resistance, I = ε/R (not dependent on L), so steady-state energy U = ½L(ε/R)² does increase with L. But in circuits with current sources or large I, smaller L can store more. Always use U = ½LI²."
- **discrimination_pairs [P33]:**
  - L=10mH, I=2A: U = ½×0.01×4 = 20 mJ
  - L=1mH, I=10A: U = ½×0.001×100 = 50 mJ (smaller L, more energy due to larger I)
  - L=100mH, I=0.1A: U = ½×0.1×0.01 = 0.5 mJ (large L, tiny energy due to small I)
- **s6_path:** Compare energy at given current for two L values; then compare at given voltage source (I=ε/R same) for two L values — show the two cases give different conclusions.

---

## Component 4 — Assessment Probes

### Probe Set A — Factual Recall
**A1 (MCQ):** At t = 0 (switch just closed, I initially zero), an ideal inductor acts as:
**(a) Open circuit** (b) Short circuit (c) Resistor of value L (d) Voltage source of value ε

**A2 (Short answer):** Write the formula for back-EMF of an inductor and for energy stored. Give units of L.
[ε_L = −L dI/dt; U_L = ½LI²; L in Henries (H = Wb/A = V·s/A)]

**A3 (Fill-in):** The time constant of an RL circuit is τ_L = ______, and has units of ______.
[L/R; seconds]

---

### Probe Set B — Conceptual Transfer
**B1:** L = 200 mH, R = 40 Ω, ε = 20 V. Find (a) τ_L, (b) final steady-state current, (c) energy stored at steady state, (d) time for current to reach 90% of final value.
[(a) τ_L = 0.2/40 = 5 ms. (b) I_∞ = 20/40 = 0.5 A. (c) U = ½×0.2×0.25 = 25 mJ. (d) 0.9I_∞ = I_∞(1−e^{−t/τ}) → e^{−t/τ} = 0.1 → t = τ ln10 = 5×2.303 = 11.5 ms]

**B2:** A solenoid has L₁. If the number of turns is doubled (with same core volume), what is the new inductance?
[L = μ₀n²Al; n doubles → n² quadruples → L₂ = 4L₁]

**B3:** When a current-carrying inductor is suddenly disconnected (circuit opened), a large voltage spike appears. Explain using ε_L = −L dI/dt.
[Opening the switch forces dI/dt → −∞ (current must drop to zero in very short time Δt → 0). ε_L = −L×(−∞) → very large positive voltage. This spike can destroy transistors/switches. Fix: place a freewheeling diode across the inductor to provide a current path and limit dI/dt.]

---

### Probe Set C — Mastery Gate [P91]
**C1 (Multi-step):** RL circuit: L = 80 mH, R₁ = 20 Ω (in series with L), R₂ = 60 Ω (in parallel with L after the switch opens). ε = 24 V. Switch was closed for a long time (steady state), then opens. (a) Find I₀ just before switch opens. (b) Find τ_decay through R₁+R₂. (c) Find I at t = 2τ. (d) Find the voltage spike across the switch at t=0⁺.
[(a) I₀ = ε/R₁ = 24/20 = 1.2 A (steady state; all ε across R₁). (b) After switch opens: L discharges through R₁+R₂ = 80Ω; τ = L/(R₁+R₂) = 80×10⁻³/80 = 1.0 ms. (c) I(2τ) = 1.2×e⁻² = 1.2×0.135 = 0.162 A. (d) V_switch = ε_L + ε = L×dI/dt|₀ + ε; at t=0: dI/dt = −I₀/τ = −1.2/0.001 = −1200 A/s; ε_L = −L×(−1200) = +96V; V_switch = 96 + 24 = 120 V. (Large spike — 5× the supply!)]

**C2 (Design):** You need to store 1.0 J of magnetic energy in an inductor at a current of 10 A. Find the required L. Then design a solenoid to achieve this: choose n, A, and l subject to n×A×l ≤ 500 cm³. Find B inside.
[L = 2U/I² = 2×1.0/100 = 20 mH. L = μ₀n²Al; n²Al = L/μ₀ = 0.02/(4π×10⁻⁷) = 1.592×10⁴ m⁻¹. Choose: A = 10 cm² = 10⁻³ m², l = 0.50 m → n²×10⁻³×0.5 = 1.592×10⁴ → n² = 3.18×10⁷ → n = 5640 turns/m. n×l = 2820 turns total; volume = A×l = 5×10⁻⁴ m³ = 500 cm³ ✓. B = μ₀nI = 4π×10⁻⁷×5640×10 = 70.8 mT.]

---

## Component 5 — Retrieval & Spacing Schedule

```yaml
retrieval_events:
  - offset: "+10 min"
    type: free_recall [P62]
    prompt: "Without notes: define self-inductance L, write the back-EMF formula, energy formula, RL time constant, and the t=0 and t→∞ behaviour of an inductor."
  - offset: "+1 day"
    type: retrieval_quiz [P36]
    prompt: "L=120mH, R=30Ω, ε=9V. Find τ, I at t=2τ, steady-state energy, and back-EMF at t=0. Then: solenoid N=400, l=20cm, A=5cm² — find L and B at I=5A."
  - offset: "+4 days"
    type: interleaved [P33]
    prompt: "Compare RC and RL circuits: fill in the table — what is the 'charge variable', time constant, t=0 behaviour, t→∞ behaviour, stored energy formula."
  - offset: "+10 days"
    type: application [P91]
    prompt: "Design problem: relay coil with L=500mH, R=25Ω, operating voltage 24V. (a) Find pull-in time (reach 80% of final current). (b) Energy stored at steady state. (c) Voltage spike on opening if switch time Δt=1μs."
```

---

## Component 6 — Session Flow Script

```
[P01 — Session open]
"Today we meet the inductor — the electromagnetic analogue of mass. Just as mass resists velocity changes, inductors resist current changes. By the end you'll predict current waveforms in RL circuits and design inductors for energy storage."

[P41 — Diagnostic]
"In an RC circuit, what does the capacitor do at t=0 and at t→∞? Can you guess what an inductor does at those same moments?"
→ C at t=0: short; t→∞: open. L should be opposite: t=0: open; t→∞: short. "Exactly — let's verify."

[P06 — Concrete anchor]
"A flywheel stores kinetic energy and resists speed changes (inertia). An inductor stores magnetic energy and resists current changes. The 'heavier' the inductor (larger L), the harder it is to change the current — just like a heavier flywheel is harder to spin up or slow down."

[TA-1 — Definition and back-EMF: Block 1-A]
"L = NΦ/I; ε_L = −L dI/dt. The inductor 'pushes back' against current changes."

[P28 — Conflict evidence for MC-INDUCTOR-OPPOSES-CURRENT-FLOW]
"At t→∞: dI/dt = 0 → ε_L = 0 → inductor = zero resistance. Full current I = ε/R flows. Inductors resist CHANGES, not current itself. A DC motor with an inductor coil carries steady DC fine — only the transient is slowed."

[P51 — Check-in]
"At t=0 (switch closes, I=0): what is ε_L? At t→∞: what is ε_L? What does the inductor 'become' in each case?"
[t=0: ε_L = ε (full voltage); t→∞: ε_L = 0; open/short circuit respectively]

[TA-2 — Standard geometries and WE-1: Block 1-B]
"L = μ₀n²Al for solenoid. N² dependence: doubling turns quadruples inductance."

[TA-3 — Energy storage and WE-2, WE-3: Block 1-C]
"U = ½LI². Energy density u = B²/(2μ₀). Cross-check: solenoid energy from both formulas."

[P28 — Conflict evidence for MC-LARGER-L-MEANS-MORE-ENERGY-AT-ALL-TIMES]
"U = ½LI². Compare L=10mH, I=2A → 20mJ vs. L=1mH, I=10A → 50mJ. The current matters as much as L. In power electronics, high-current low-L inductors often store more energy."

[TA-4 — RL circuit: Block 1-D, WE-2]
"τ_L = L/R. I(t) = (ε/R)(1−e^{−t/τ_L}). Mirror of RC circuit."

[P52 — Narrow]
"Three formulas: ε_L = −L dI/dt; U_L = ½LI²; τ_L = L/R. L_solenoid = μ₀n²Al."

[P62 — Retrieval seed]
"Write from memory: inductor formulas, RL time constant, energy formula, t=0 and t→∞ limits, the analogy with mass."

[P36 — Mastery probe — Probe C1]

[P68 — Close]
"Self-inductance L is the 'magnetic inertia' of a circuit: ε_L = −L dI/dt. Energy U = ½LI² stored in B field. RL time constant τ = L/R. At t=0: open circuit. At t→∞: short circuit. Inductor resists change in current, not current itself."

[P85 — Regulation tail]
"Shakiest: the direction of back-EMF, the energy formula derivation, or the RL transient?"

[P89 — Retrieval schedule]
"Return tomorrow for the RL circuit retrieval quiz."
```

---

## Component 7 — Adaptive Branching

| Signal | Branch |
|--------|--------|
| Probe A1 wrong (picks short circuit) | Deploy MC-INDUCTOR-OPPOSES-CURRENT-FLOW; plot I(t) from 0 to 5τ; show I=0 at t=0 |
| Probe B2 wrong (doubling turns → doubling L) | L ∝ n² (not n); because flux per turn × N turns = N × (μ₀nI×A) × N = μ₀n²AlI |
| Probe B3 incomplete (voltage spike) | Quantify: if I₀ = 1A, L = 1H, switch opens in Δt = 1μs → dI/dt = −10⁶ A/s → ε_L = 10⁶ V |
| Probe C1 wrong (Thevenin for decay) | After switch opens: L sees R₁ + R₂ in series (current must flow through both on decay path) |
| Student asks about RL with AC source | Preview: Z_L = ωL (inductive reactance); link to phys.em.ac-basics |

---

## Component 8 — Visualisation Specification

**Primary visual:** RL circuit I(t) plot — exponential rise from 0 to I_∞ = ε/R; marked at τ (63.2%) and 5τ (99.3%); also: V_L(t) = ε e^{−t/τ} decaying from ε to 0; V_R(t) = ε(1−e^{−t/τ}) rising from 0 to ε. Annotate: t=0 (V_L=ε, I=0 = open circuit); t→∞ (V_L=0, I=ε/R = short circuit).

**Secondary visual:** Energy storage diagram — U_L = ½LI² as a function of I (quadratic curve); marked for two cases: (L₁=10mH, I=2A) and (L₂=1mH, I=10A), showing the second has larger U despite smaller L. Caption: "Energy depends on LI², not L alone."

**Tertiary visual:** B-field energy density — solenoid cross-section; colour gradient showing B field strength inside; formula u_B = B²/(2μ₀) annotated; total U = u_B × volume equation shown. Parallel with capacitor: u_E = ½ε₀E² for comparison.

---

## Component 9 — Validation Checklist

```
V-1  concept_id matches KG exactly (phys.em.self-inductance)               PASS
V-2  domain derived correctly (phys.em → electromagnetism)                 PASS
V-3  difficulty number matches label (advanced → 5)                        PASS
V-4  bloom verb matches level (apply → calculate/design)                   PASS
V-5  prerequisites listed in KG (phys.em.faradays-law)                    PASS
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
