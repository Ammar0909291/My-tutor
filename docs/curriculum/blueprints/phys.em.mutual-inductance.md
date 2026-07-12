# Teaching Blueprint — phys.em.mutual-inductance

## Component 0 — Concept Identity

```yaml
concept_id: phys.em.mutual-inductance
name: Mutual Inductance
domain: electromagnetism
difficulty:
  label: advanced
  number: 5
bloom: apply
prerequisites:
  - phys.em.self-inductance
mastery_threshold: 0.80
estimated_hours: 5
cross_links:
  - phys.em.faradays-law
  - phys.em.solenoid
session_cap: "7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)"
cpa_entry_stage: "C (anchor; difficulty 5 → C with accelerated P track)"
status: READY
```

---

## Component 1 — Concept Explanation Blocks

### Block 1-A — Definition
When a changing current in coil 1 induces an EMF in coil 2, the two coils are **mutually coupled**. The **mutual inductance M** is defined by:

> **ε₂ = −M dI₁/dt** and equivalently **ε₁ = −M dI₂/dt**

M is symmetric: the same M describes coupling in either direction (Neumann formula proves M₁₂ = M₂₁).

M in terms of flux linkage:
> **M = N₂Φ₂₁/I₁ = N₁Φ₁₂/I₂**

Where Φ₂₁ is the flux through each turn of coil 2 due to current I₁ in coil 1. Units: Henry (H).

### Block 1-B — Coupling Coefficient and Maximum M
The **coupling coefficient k** (0 ≤ k ≤ 1):
> **k = M/√(L₁L₂)**

- k = 1: perfect coupling (all flux from coil 1 threads coil 2)
- k = 0: no coupling (coils are orthogonal or widely separated)
- **Transformer**: k ≈ 1 (iron core channels all flux)
- **Loosely coupled coils**: k ≈ 0.01–0.3

Maximum possible M: **M_max = √(L₁L₂)** (at k=1)

Total stored energy in two coupled inductors:
> **U = ½L₁I₁² + ½L₂I₂² ± MI₁I₂**

(+ for currents wound in same direction; − for opposite directions)

### Block 1-C — The Ideal Transformer
A transformer has two coils wound on the same iron core (k ≈ 1):

> **V₂/V₁ = N₂/N₁** (voltage ratio)
> **I₁/I₂ = N₂/N₁** (current ratio — from power conservation)
> **P₁ = P₂** (ideal: 100% efficiency)

The transformer is the central application of mutual inductance:
- Step-up transformer: N₂ > N₁ → V₂ > V₁ (used in power transmission: high V, low I, low losses)
- Step-down transformer: N₂ < N₁ → V₂ < V₁ (used at consumer end: 230V→5V for phone chargers)
- Isolation transformer: N₁ = N₂ → V₁ = V₂ but galvanic isolation (safety)

Impedance transformation: load Z_L on secondary appears as Z_primary = (N₁/N₂)² × Z_L (used in impedance matching for maximum power transfer).

### Block 1-D — Coupled Inductors in Circuits
Series connection (series-aiding, dots on same end):
> **L_total = L₁ + L₂ + 2M** (fields reinforce)

Series connection (series-opposing, dots on opposite ends):
> **L_total = L₁ + L₂ − 2M** (fields partially cancel)

In parallel (assuming equal inductors, aiding):
> **1/L_total = 1/(L₁ + M) + 1/(L₂ + M)** (complicated in general)

---

## Component 2 — Worked Examples

### WE-1 — Mutual Inductance and Induced EMF
**Problem:** Two coils: coil 1 (N₁ = 200 turns, self-inductance L₁ = 40 mH), coil 2 (N₂ = 800 turns). Coupling coefficient k = 0.6. Current in coil 1 changes at dI₁/dt = 50 A/s. Find: (a) L₂ (using M = k√(L₁L₂)), (b) M, (c) EMF induced in coil 2.

**Solution:**
From M = k√(L₁L₂) and the relationship N₂/N₁ = √(L₂/L₁) for same core geometry:

Actually use: for solenoids sharing a core, L ∝ N², so L₂/L₁ = (N₂/N₁)² = (800/200)² = 16.  
(a) L₂ = 16 × L₁ = 16 × 40 = **640 mH**

(b) M = k√(L₁L₂) = 0.6 × √(40×10⁻³ × 640×10⁻³) = 0.6 × √(25.6×10⁻³) = 0.6 × 0.160 = **96 mH**

(c) ε₂ = M × |dI₁/dt| = 96×10⁻³ × 50 = **4.8 V**

---

### WE-2 — Ideal Transformer
**Problem:** An ideal transformer: N₁ = 500 turns, N₂ = 50 turns. Primary: V₁ = 230 V, I₁ = 0.2 A. Find: (a) V₂, (b) I₂, (c) power. Then a 10 Ω load is connected to secondary — find I₂ and I₁.

**Solution:**
(a) V₂ = V₁ × N₂/N₁ = 230 × 50/500 = **23 V**

(b) I₂ = I₁ × N₁/N₂ = 0.2 × 500/50 = **2.0 A**

(c) P₁ = V₁I₁ = 230 × 0.2 = 46 W; P₂ = V₂I₂ = 23 × 2.0 = **46 W** ✓ (ideal: no losses)

With R_L = 10 Ω on secondary:  
I₂ = V₂/R_L = 23/10 = 2.3 A  
I₁ = I₂ × N₂/N₁ = 2.3 × 50/500 = **0.23 A**

---

### WE-3 — Impedance Transformation
**Problem:** An audio amplifier (output impedance Z_s = 5000 Ω) is connected to a speaker (Z_L = 8 Ω). Find the transformer turns ratio N₁/N₂ for maximum power transfer (impedance matching). Find the transformed impedance seen by the amplifier.

**Solution:**
Maximum power transfer when source impedance = load impedance as seen from primary:

Z_primary = (N₁/N₂)² × Z_L  
Set Z_primary = Z_s: (N₁/N₂)² = Z_s/Z_L = 5000/8 = 625  
**N₁/N₂ = 25** (step-down transformer, 25:1)

Verify: Z_primary = (25)² × 8 = 625 × 8 = **5000 Ω** ✓ — amplifier "sees" a 5000 Ω load, matching its output impedance.

---

## Component 3 — Misconception Engine

### MC-MUTUAL-INDUCTANCE-IS-NOT-SYMMETRIC
- **trigger_signal:** Student says "M₁₂ ≠ M₂₁ because coil 2 is larger/has more turns than coil 1."
- **conflict_evidence [P28]:** "The Neumann formula M₁₂ = (μ₀/4π)∮∮(dl₁·dl₂/r₁₂) is symmetric in the two circuits — swapping 1↔2 gives the same result. This is a mathematical theorem: M₁₂ = M₂₁ exactly, regardless of size, shape, or number of turns. Experimentally: measure EMF₂ from dI₁/dt → M. Then measure EMF₁ from dI₂/dt → same M. The Neumann formula also gives M = k√(L₁L₂) = k√(L₂L₁) — symmetric."
- **bridge_text [P30]:** "The symmetry feels counterintuitive because coil 2 (with more turns) collects more flux from coil 1 than vice versa. But coil 1 (with fewer turns) also has a lower self-inductance. When you drive coil 1 with dI/dt and get EMF in coil 2, the effect balances exactly against driving coil 2 and getting EMF in coil 1. The ratio M/√(L₁L₂) = k is the same in both directions."
- **replacement_text [P31]:** "M₁₂ = M₂₁ = M (symmetric). M = k√(L₁L₂) = k√(L₂L₁). ε₂ = −M dI₁/dt and ε₁ = −M dI₂/dt use the same M. This symmetry is exact — it follows from Maxwell's equations."
- **discrimination_pairs [P33]:**
  - More turns in coil 2: N₂ > N₁ → L₂ > L₁ → but M = k√(L₁L₂) is symmetric
  - Driving coil 1: ε₂ = M dI₁/dt — uses same M
  - Driving coil 2: ε₁ = M dI₂/dt — uses same M
- **s6_path:** Prove M₁₂ = M₂₁ for two concentric circular loops using Neumann formula (qualitative sketch); measure experimentally both ways.

---

### MC-TRANSFORMER-CAN-AMPLIFY-POWER
- **trigger_signal:** Student says "step-up transformers amplify power because they increase voltage."
- **conflict_evidence [P28]:** "Energy conservation: for an ideal transformer, P₁ = V₁I₁ = P₂ = V₂I₂. WE-2: P₁ = 46 W; P₂ = 46 W. If voltage increases by N₂/N₁ = 10, current decreases by the same factor 10. Power = V×I remains constant. No machine can output more energy than it receives — this is the first law of thermodynamics. Real transformers have efficiency 95–99.5%, so P₂ < P₁ (never more)."
- **bridge_text [P30]:** "A step-up transformer trades current for voltage, like a mechanical lever trades distance for force. A lever can lift a heavy weight with a small force by moving through a large distance — but the work done (force × distance) is the same on both sides. Similarly, a transformer increases V but decreases I by the same factor — power = V×I is conserved."
- **replacement_text [P31]:** "Transformers redistribute voltage and current while conserving power: V₂/V₁ = N₂/N₁; I₂/I₁ = N₁/N₂; P₁ = P₂ (ideal). A step-up transformer increases V and decreases I. No power amplification — transformation only."
- **discrimination_pairs [P33]:**
  - Electronic amplifier: takes small signal + DC power → large signal; real power gain; needs power supply
  - Ideal transformer: V up, I down; power conserved; no power supply needed; cannot amplify power
  - Real transformer efficiency: η = P₂/P₁ ≈ 95–99.5% (losses in core and windings)
- **s6_path:** Calculate primary and secondary power for any transformer example; always verify P₁ ≈ P₂ (or P₂ < P₁ for real devices).

---

## Component 4 — Assessment Probes

### Probe Set A — Factual Recall
**A1 (MCQ):** For an ideal transformer with N₁ = 100 and N₂ = 400:
**(a) V₂ = 4V₁** (b) V₂ = V₁/4 (c) I₂ = 4I₁ (d) P₂ = 4P₁

**A2 (Short answer):** State the relationship between M, L₁, L₂, and coupling coefficient k.
[M = k√(L₁L₂); 0 ≤ k ≤ 1]

**A3 (True/False):** M₁₂ ≠ M₂₁ when the two coils have different numbers of turns.
[FALSE — M₁₂ = M₂₁ = M always (Neumann formula)]

---

### Probe Set B — Conceptual Transfer
**B1:** A transformer has 240V primary, 12V secondary. A 6Ω load is connected to the secondary. Find: (a) turns ratio, (b) I₂, (c) I₁, (d) power in load.
[(a) N₁/N₂ = 240/12 = 20. (b) I₂ = 12/6 = 2.0A. (c) I₁ = I₂×N₂/N₁ = 2.0/20 = 0.1A. (d) P = 12×2 = 24W. Check: P₁ = 240×0.1 = 24W ✓]

**B2:** Two coils: L₁ = 10 mH, L₂ = 40 mH, k = 0.8. Find M, and the total inductance when connected in series-aiding and series-opposing.
[M = 0.8√(10×40)×10⁻³ = 0.8×20×10⁻³ = 16 mH. Series-aiding: L = 10+40+2×16 = 82 mH. Series-opposing: L = 10+40−2×16 = 18 mH.]

**B3:** Why are power transmission lines operated at high voltage (400 kV) rather than the 230 V used at homes?
[P_loss = I²R; to transmit P watts at V volts, I = P/V; lower I → lower losses I²R. At 400kV, I is 400000/230 ≈ 1739× smaller than at 230V; losses are (1739)² ≈ 3M× smaller. Transformers (mutual inductance) step up to 400kV at the generating station and step back down to 230V at the substation.]

---

### Probe Set C — Mastery Gate [P91]
**C1 (Multi-step):** Two solenoids share a core: L₁ = 100 mH, L₂ = 400 mH, k = 0.9. (a) Find M. (b) Current I₁ = 2A is switched off in 5 ms. Find |ε₂|. (c) At steady state with I₁ = 2A and I₂ = 0.5A (aiding), find total energy stored.
[(a) M = 0.9√(0.1×0.4) = 0.9×0.2 = 180 mH. (b) |ε₂| = M×|dI₁/dt| = 0.18×(2/0.005) = 0.18×400 = 72V. (c) U = ½L₁I₁² + ½L₂I₂² + MI₁I₂ = ½×0.1×4 + ½×0.4×0.25 + 0.18×2×0.5 = 0.2 + 0.05 + 0.18 = 0.43 J.]

**C2 (Synthesis):** A power company transmits 10 MW over 100 km of cable (resistance 0.1 Ω/km total = 10 Ω). Calculate I²R losses and efficiency when transmitted at (a) 11 kV, (b) 400 kV. Find the transformer turns ratio needed to step from 11 kV to 400 kV.
[(a) I = P/V = 10⁷/11000 = 909 A; P_loss = 909²×10 = 8.26 MW; efficiency = (10−8.26)/10 = 17.4% — terrible! (b) I = 10⁷/400000 = 25 A; P_loss = 25²×10 = 6250 W = 0.006 MW; efficiency = (10−0.006)/10 = 99.94% ✓. Turns ratio: N₁/N₂ = 11000/400000 = 1/36.4 (step-up transformer, N₂/N₁ = 36.4).]

---

## Component 5 — Retrieval & Spacing Schedule

```yaml
retrieval_events:
  - offset: "+10 min"
    type: free_recall [P62]
    prompt: "Without notes: define M, write ε₂ = −M dI₁/dt, state M = k√(L₁L₂), give transformer V and I ratios, explain why transformers cannot amplify power."
  - offset: "+1 day"
    type: retrieval_quiz [P36]
    prompt: "L₁=50mH, L₂=200mH, k=0.7. Find M. dI₁/dt=100A/s. Find |ε₂|. Series-aiding total L?"
  - offset: "+4 days"
    type: interleaved [P33]
    prompt: "Transformer: 230V primary, 12V secondary, 50W load. Find: turns ratio, I₁, I₂, primary Z as seen from source, impedance transformation."
  - offset: "+10 days"
    type: application [P91]
    prompt: "A wireless charging pad (k=0.5, L₁=10μH) charges a phone coil (L₂=5μH) at f=6.78MHz. Find M, X_M=ωM, and maximum power transfer conditions. Why is k<1 acceptable here?"
```

---

## Component 6 — Session Flow Script

```
[P01 — Session open]
"Mutual inductance is what allows energy to jump between circuits without electrical contact. It's the principle behind every transformer, wireless charger, and induction cooktop. Today we'll quantify it and design a transformer."

[P41 — Diagnostic]
"A battery charger converts 230V AC to 5V DC. How does it reduce the voltage without large resistors wasting energy as heat?"
→ Correct (transformer): "Exactly — and transformers work by mutual inductance."
→ Incorrect: "The answer reveals one of the most important inventions of the 19th century."

[P06 — Concrete anchor]
"Two coils near each other, like a transmitter and receiver. Current changing in coil 1 creates a changing B field, which creates changing flux through coil 2, which induces EMF in coil 2 — even with no electrical connection. This is mutual induction."

[TA-1 — Definition and formula: Block 1-A]
"ε₂ = −M dI₁/dt; M = k√(L₁L₂). M₁₂ = M₂₁ = M (symmetric)."

[P28 — Conflict evidence for MC-MUTUAL-INDUCTANCE-IS-NOT-SYMMETRIC]
"M₁₂ = M₂₁ always — Neumann formula proves it. More turns in coil 2 → more flux collected per turn → BUT lower self-inductance in coil 1 → the effects exactly balance. M = k√(L₁L₂) = k√(L₂L₁) — manifestly symmetric."

[P51 — Check-in]
"If I drive coil 1 and measure ε₂, I get M = ε₂/(dI₁/dt) = 50 mH. If I drive coil 2 instead, what M would I measure?"
[50 mH — same, by symmetry]

[TA-2 — Coupling coefficient and transformer: Block 1-B, WE-1, WE-2]

[P28 — Conflict evidence for MC-TRANSFORMER-CAN-AMPLIFY-POWER]
"P₂ = V₂I₂ = (N₂V₁/N₁)(N₁I₁/N₂) = V₁I₁ = P₁. Voltage up by ratio, current down by same ratio. Power = product, conserved. First law of thermodynamics: no transformer can output more than it inputs."

[TA-3 — WE-3: impedance matching for audio]

[P52 — Narrow]
"Three formulas: ε₂ = −M dI₁/dt; M = k√(L₁L₂); V₂/V₁ = N₂/N₁ and I₁/I₂ = N₂/N₁ (transformer)."

[P62 — Retrieval seed]
"Write from memory: mutual inductance definition, symmetry, transformer V and I ratios, power conservation, coupling coefficient."

[P36 — Mastery probe — Probe C1]

[P68 — Close]
"Mutual inductance M: the coupling between two coils. M = k√(L₁L₂); ε₂ = −M dI₁/dt. Transformer: V₂/V₁ = N₂/N₁ (voltage ratio); I₁/I₂ = N₂/N₁ (current ratio); P conserved. Transformers enable long-distance power transmission at high voltage, low current, low loss."

[P85 — Regulation tail]
"Shakiest: M symmetry, the transformer ratios, or the impedance matching?"

[P89 — Retrieval schedule]
"Return tomorrow for the M and EMF retrieval quiz."
```

---

## Component 7 — Adaptive Branching

| Signal | Branch |
|--------|--------|
| Probe A1 wrong (picks current ratio) | Clarify: V₂/V₁ = N₂/N₁; I₁/I₂ = N₂/N₁ (inverse); current ratio is inverted from voltage ratio |
| Probe A3 wrong (says asymmetric) | Deploy MC-MUTUAL-INDUCTANCE-IS-NOT-SYMMETRIC; Neumann formula; verify with WE-1 |
| Probe B3 incomplete | Quantify: calculate P_loss at both voltages; the 10⁶× reduction in losses is the key point |
| Probe C1(c) wrong (energy sign) | For aiding currents: +MI₁I₂; for opposing: −MI₁I₂; total energy must be ≥ 0 always |
| Student asks about wireless charging | Explain: k≈0.3−0.7 for separated coils; compensate with resonance at same frequency; efficiency drops with k but acceptable for convenience |

---

## Component 8 — Visualisation Specification

**Primary visual:** Two-coil mutual inductance diagram — coil 1 on left (N₁ turns, current I₁ shown with arrow), coil 2 on right (N₂ turns); magnetic field lines from coil 1 curving through both coils; fraction k of field lines threading coil 2 highlighted; ε₂ induced in coil 2 shown. Label: M = N₂Φ₂₁/I₁.

**Secondary visual:** Ideal transformer circuit diagram — primary (N₁, V₁, I₁) and secondary (N₂, V₂, I₂) on shared iron core; arrows showing flux in core; V₂/V₁ = N₂/N₁ and I₁/I₂ = N₂/N₁ equations annotated; load Z_L on secondary; Z_primary = (N₁/N₂)²Z_L shown. Energy flow arrows: P₁ in = P₂ out.

**Tertiary visual:** Power transmission comparison — two side-by-side scenarios: (a) 11 kV transmission (thick current arrows, large I²R heat symbol, low efficiency); (b) 400 kV transmission (thin current arrows, tiny heat symbol, high efficiency). Transformer step-up/step-down shown at each end. Caption: "same power, 1739× lower current → 3M× lower losses."

---

## Component 9 — Validation Checklist

```
V-1  concept_id matches KG exactly (phys.em.mutual-inductance)             PASS
V-2  domain derived correctly (phys.em → electromagnetism)                 PASS
V-3  difficulty number matches label (advanced → 5)                        PASS
V-4  bloom verb matches level (apply → calculate/design)                   PASS
V-5  prerequisites listed in KG (phys.em.self-inductance)                  PASS
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
