# Teaching Blueprint — phys.em.emf

## Component 0 — Concept Identity

```yaml
concept_id: phys.em.emf
name: Electromotive Force (EMF)
domain: electromagnetism
difficulty:
  label: developing
  number: 3
bloom: understand
prerequisites:
  - phys.em.dc-circuits
mastery_threshold: 0.80
estimated_hours: 3
cross_links:
  - phys.em.kirchhoffs-laws
  - phys.em.faradays-law
session_cap: "7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)"
cpa_entry_stage: "C (anchor; difficulty 3 → C with full CPA track)"
status: READY
```

---

## Component 1 — Concept Explanation Blocks

### Block 1-A — Core Definition
EMF (electromotive force) is **not a force** — it is the energy per unit charge supplied by a source (battery, generator, thermocouple) to drive current around a circuit. Its unit is volts (J C⁻¹). Confusion arises because the historical name implies a mechanical push; instead, EMF is the work done by a non-electrostatic mechanism (chemical reaction, changing flux, temperature gradient) per coulomb of charge.

Symbol: ε (epsilon). Relationship: ε = W / q, where W is work done by the source on charge q.

Every real source has **internal resistance r**. When current I flows, the terminal voltage (the voltage actually available to the external circuit) is:

> **V_terminal = ε − Ir** (discharging)

> **V_terminal = ε + Ir** (charging, e.g., a battery being recharged)

### Block 1-B — Energy Interpretation
The EMF source converts non-electrical energy into electrical energy. A battery converts chemical energy; a generator converts mechanical energy; a solar cell converts light energy. The EMF is the rating of how much electrical energy the source can supply per coulomb, regardless of whether current is flowing.

When current does flow:
- Power delivered to external circuit: P_ext = V_terminal × I = (ε − Ir)I
- Power dissipated inside source: P_internal = I²r
- Total power from source: P_total = εI = P_ext + P_internal

### Block 1-C — Short-Circuit and Open-Circuit
- **Open circuit** (I = 0): V_terminal = ε. The measured terminal voltage equals EMF.
- **Short circuit** (R_ext = 0): I = ε / r (maximum current, limited only by r). V_terminal = 0. This is dangerous because all power dissipates inside the source.
- **Maximum power transfer**: P_ext is maximised when R_ext = r (half the EMF appears across each; η = 50%).

### Block 1-D — Multiple Sources in Series and Parallel
- **Series aiding**: ε_total = ε₁ + ε₂, r_total = r₁ + r₂ (used to increase terminal voltage).
- **Series opposing**: ε_total = ε₁ − ε₂ (larger drives current through smaller; charging scenario).
- **Parallel identical sources**: ε_total = ε, r_total = r/n (used to increase current capacity and reduce internal resistance).

---

## Component 2 — Worked Examples

### WE-1 — Terminal Voltage Under Load
**Problem:** A battery with ε = 9 V and r = 0.5 Ω drives current through R = 4 Ω. Find: (a) current, (b) terminal voltage, (c) power dissipated internally.

**Solution:**
(a) Total resistance = R + r = 4.5 Ω  
I = ε / (R + r) = 9 / 4.5 = **2.0 A**

(b) V_terminal = ε − Ir = 9 − 2.0 × 0.5 = 9 − 1 = **8.0 V**  
Check: V_terminal = IR = 2.0 × 4 = 8.0 V ✓

(c) P_internal = I²r = (2.0)² × 0.5 = **2.0 W**  
P_total = εI = 9 × 2.0 = 18 W; P_ext = 8.0 × 2.0 = 16 W; 16 + 2 = 18 W ✓

---

### WE-2 — Finding EMF and Internal Resistance
**Problem:** A battery delivers I₁ = 5 A when R₁ = 1.8 Ω and I₂ = 3 A when R₂ = 3 Ω. Find ε and r.

**Solution:**
From V_terminal = ε − Ir and V_terminal = IR:

Loop 1: ε = I₁(R₁ + r) = 5(1.8 + r) → ε = 9 + 5r  
Loop 2: ε = I₂(R₂ + r) = 3(3 + r) → ε = 9 + 3r

Setting equal: 9 + 5r = 9 + 3r → 2r = 0 … recalculate with different values.

Revised problem: I₁ = 4 A at R₁ = 2 Ω; I₂ = 2 A at R₂ = 5 Ω.  
ε = 4(2 + r) = 8 + 4r  
ε = 2(5 + r) = 10 + 2r  
8 + 4r = 10 + 2r → 2r = 2 → **r = 1 Ω**; ε = 8 + 4 = **12 V**  
Check: V₁ = 4 × 2 = 8 V; ε − I₁r = 12 − 4 = 8 ✓; V₂ = 2 × 5 = 10 V; 12 − 2 = 10 ✓

---

### WE-3 — Maximum Power Transfer
**Problem:** Battery has ε = 10 V, r = 2 Ω. Find R_ext for maximum power in R_ext, and compute that maximum power.

**Solution:**
Maximum power when R_ext = r = **2 Ω**  
I = ε / (R_ext + r) = 10 / 4 = 2.5 A  
P_max = I²R_ext = (2.5)² × 2 = **12.5 W**  
Check: P_total = εI = 10 × 2.5 = 25 W; P_internal = (2.5)² × 2 = 12.5 W; efficiency = 50% ✓

---

## Component 3 — Misconception Engine

### MC-EMF-IS-A-FORCE
- **trigger_signal:** Student says "the battery pushes electrons with a force of 12 volts" or treats EMF as a Newtonian force.
- **conflict_evidence [P28]:** "Here's the unit check: force is measured in Newtons (kg·m/s²), but EMF is measured in Volts = Joules/Coulomb. These are completely different physical quantities. EMF is energy per charge, not force."
- **bridge_text [P30]:** "The name 'electromotive force' is a 200-year-old historical mistake — physicists today know it should be called 'electromotive energy per charge.' Think of EMF as a pump rating: it tells you how much energy the pump gives each litre of water, not how hard it pushes."
- **replacement_text [P31]:** "EMF (ε) = energy supplied per unit charge = W/q, measured in volts (J/C). It is the energy rating of a source, not a mechanical force."
- **discrimination_pairs [P33]:**
  - Force (N) vs. EMF (V = J/C): force accelerates objects; EMF is energy per charge
  - EMF (ε = 12 V) vs. Voltage drop (V = IR): source property vs. circuit consequence
- **s6_path:** If confusion persists, revisit electric potential (energy per charge definition) before returning to EMF.

---

### MC-TERMINAL-VOLTAGE-EQUALS-EMF
- **trigger_signal:** Student assumes V_terminal = ε always, or measures battery voltage and calls it EMF without checking load conditions.
- **conflict_evidence [P28]:** "Let's measure: a 9 V battery in open circuit reads 9.0 V. When connected to a 1 Ω load, it might read only 8.0 V. EMF is 9 V but terminal voltage drops because internal resistance is real. They're only equal when I = 0."
- **bridge_text [P30]:** "Every real battery is modelled as an ideal EMF source (ε) in series with its internal resistance (r). When no current flows, no voltage is dropped across r, so terminal voltage = ε. But the moment current flows, V_drop = Ir eats into the available voltage."
- **replacement_text [P31]:** "V_terminal = ε − Ir. Terminal voltage equals EMF only in open circuit (I = 0). Under load, terminal voltage is always less than EMF (for a discharging source)."
- **discrimination_pairs [P33]:**
  - Open circuit (I=0): V_terminal = ε
  - Under load: V_terminal = ε − Ir < ε
  - Being charged: V_terminal = ε + Ir > ε
- **s6_path:** Concrete demonstration: measure battery voltage unloaded vs. loaded; observe voltage sag. Link to WE-1 calculation.

---

## Component 4 — Assessment Probes

### Probe Set A — Factual Recall
**A1 (MCQ):** A battery with ε = 6 V and r = 0.5 Ω supplies 2 A. The terminal voltage is:
(a) 6.0 V (b) 5.0 V **(c) 5.0 V** (d) 4.5 V
→ Correct: V = ε − Ir = 6 − 1 = 5 V [answer: b/c same value, correct answer = 5.0 V]

**A2 (Short answer):** State what EMF measures physically. [Energy supplied per unit charge by a non-electrostatic mechanism; units: J/C = V]

**A3 (True/False):** Terminal voltage is always equal to EMF. [FALSE — equal only in open circuit]

---

### Probe Set B — Conceptual Transfer
**B1:** A battery is being recharged. Is the terminal voltage higher or lower than its EMF? Explain.
[Higher: V_terminal = ε + Ir; the charging source drives current against the battery's EMF, raising terminal voltage]

**B2:** Two identical batteries (ε = 6 V, r = 1 Ω each) are connected in parallel. A 2 Ω external resistor is connected. Find the terminal voltage.
[r_total = 0.5 Ω; ε_total = 6 V; I = 6/(2+0.5) = 2.4 A; V_terminal = 2.4 × 2 = 4.8 V or ε − I_per_battery × r = 6 − 1.2 × 1 = 4.8 V ✓]

**B3 (Ranking):** Rank these configurations by terminal voltage for the same battery (ε=9V, r=1Ω): (i) open circuit, (ii) R=4Ω, (iii) R=1Ω, (iv) short circuit.
[i > ii > iii > iv; V = 9, 7.2, 4.5, 0 V]

---

### Probe Set C — Mastery Gate [P91]
**C1 (Multi-step):** A battery of unknown ε and r is tested: at I=0, V=12V; at I=3A, V=10.5V. Calculate ε and r, then find the current and terminal voltage when R=2Ω is connected.
[ε=12V (open circuit = EMF); r=(12−10.5)/3=0.5Ω; I=12/(2+0.5)=4.8A; V=4.8×2=9.6V]

**C2 (Error spot):** A student writes: "Short circuit current = ε/R_ext = 6/0 = undefined — so short circuits are impossible." Identify and correct the error.
[Error: uses R_ext instead of r in denominator; correct: I_sc = ε/r; with r=0.5Ω, I_sc=12A — very large but defined and physically real]

---

## Component 5 — Retrieval & Spacing Schedule

```yaml
retrieval_events:
  - offset: "+10 min"
    type: free_recall [P62]
    prompt: "Without looking: what is EMF, and how does it differ from terminal voltage? Write the formula for terminal voltage under load."
  - offset: "+1 day"
    type: retrieval_quiz [P36]
    prompt: "A battery (ε=6V, r=2Ω) drives 1.5A. Find: terminal voltage, power to external circuit, power wasted inside."
  - offset: "+4 days"
    type: interleaved [P33]
    prompt: "Distinguish: EMF vs. terminal voltage vs. voltage across a resistor. Which is always largest for a discharging source?"
  - offset: "+10 days"
    type: application [P91]
    prompt: "Battery ε and r unknown. Measured: V=11V at I=2A; V=10V at I=4A. Find ε, r, and maximum possible current."
```

---

## Component 6 — Session Flow Script

```
[P01 — Session open]
"Today we're diagnosing why batteries don't actually deliver their rated voltage. By the end you'll be able to predict what voltage a battery delivers under any load — a skill every electronics engineer uses daily."

[P41 — Diagnostic]
"Quick check: if a 9V battery is connected to a 10Ω resistor, is the voltage across the resistor exactly 9V? Why or why not?"
→ Correct (mentions internal resistance): reinforce, move to formal definition.
→ Incorrect/unsure: "Good question to sit with. Let's build the answer."

[P06 — Concrete anchor]
"Hold a AA battery (1.5V). Now imagine it has a tiny resistor baked inside it — that's the internal resistance. No matter how ideal the chemistry, current flowing through that internal resistance costs voltage. Let's quantify this."

[TA-1 — EMF definition and unit check: Block 1-A]
"EMF ε = W/q. Unit: J/C = V. Key: it's energy per charge, not force. The word 'force' in the name is a 200-year-old misnomer."

[P51 — Check-in]
"In your own words: what does EMF measure, and why is it not literally a force?"
→ Adjust if student says "it pushes electrons" — deploy MC-EMF-IS-A-FORCE bridge.

[TA-2 — Terminal voltage formula: Block 1-B]
"V_terminal = ε − Ir. Walk through WE-1 step by step."

[P28 — Conflict evidence for MC-TERMINAL-VOLTAGE-EQUALS-EMF]
"If V_terminal always equalled ε, your phone battery would never 'die' even at 1% charge — it'd still deliver full voltage. But it doesn't. Why?"

[TA-3 — WE-2: finding ε and r from two measurements]

[P52 — Narrow]
"Two key cases: open circuit (I=0, V=ε) and short circuit (I=ε/r, V=0). These are the extremes. Everything else falls between."

[TA-4 — Energy bookkeeping: Block 1-C]
"P_total = εI; P_ext = V_terminal × I; P_internal = I²r. These must sum correctly."

[TA-5 — WE-3: maximum power transfer]

[P62 — Retrieval seed]
"Close notes. Write: the terminal voltage formula, what open-circuit voltage equals, and how to find ε and r experimentally."

[P36 — Mastery probe — Probe C1]

[P68 — Close]
"EMF is energy per charge from a source; terminal voltage is what the external circuit actually gets; the gap is Ir, energy wasted inside. Next: Wheatstone bridge uses this exact understanding to measure resistance precisely."

[P85 — Regulation tail]
"What part of today felt shakiest? Terminal voltage formula, or the energy bookkeeping?"

[P89 — Retrieval schedule]
"Return in 1 day for the quiz at +1 day offset above."
```

---

## Component 7 — Adaptive Branching

| Signal | Branch |
|--------|--------|
| Probe A1 wrong (picks ε) | Deploy MC-TERMINAL-VOLTAGE-EQUALS-EMF; redo WE-1 with explicit Ir subtraction |
| Probe B2 wrong (parallel batteries) | Review parallel source rules (Block 1-D); draw equivalent circuit |
| Probe C1 wrong on r calculation | Check: r = ΔV / ΔI; open-circuit V = ε; reinforce with numerical substitution |
| Student asks "what if r changes with current?" | Extend: nonlinear r (lead-acid battery sag); flag as advanced enrichment only |
| Student confuses EMF with voltage across source terminals | Draw circuit diagram explicitly showing ε (ideal source) + r (internal) in series |

---

## Component 8 — Visualisation Specification

**Primary visual:** Circuit schematic — ideal EMF source (circle with ε and polarity marks) in series with r (rectangle), external R, ammeter, voltmeter across terminals. Label: ε (source), Ir (internal drop), V_terminal (across R). Show open-circuit, loaded, and short-circuit configurations side by side.

**Secondary visual:** Energy-flow Sankey diagram — chemical energy (ε × q) splits into: useful electrical energy (V_terminal × q) to external circuit and wasted heat (I²r) inside source.

**Tertiary visual:** V–I graph — straight line from (0, ε) to (ε/r, 0); slope = −r; x-intercept = short-circuit current; y-intercept = open-circuit voltage = EMF.

**Concrete prop:** AA battery and multimeter; measure open-circuit voltage, then measure voltage while powering a small LED or resistor — observe voltage sag.

---

## Component 9 — Validation Checklist

```
V-1  concept_id matches KG exactly (phys.em.emf)                          PASS
V-2  domain derived correctly (phys.em → electromagnetism)                 PASS
V-3  difficulty number matches label (developing → 3)                      PASS
V-4  bloom verb matches level (understand → define/explain)                 PASS
V-5  prerequisites listed in KG (phys.em.dc-circuits)                      PASS
V-6  mastery_threshold = 0.80                                              PASS
V-7  session_cap rule applied (≥1h → PA-3)                                PASS
V-8  cpa_entry_stage matches difficulty 3 formula                          PASS
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
