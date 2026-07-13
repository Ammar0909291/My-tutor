# Teaching Blueprint — phys.em.potentiometer

## Component 0 — Concept Identity

```yaml
concept_id: phys.em.potentiometer
name: Potentiometer
domain: electromagnetism
difficulty:
  label: proficient
  number: 4
bloom: apply
prerequisites:
  - phys.em.kirchhoffs-laws
mastery_threshold: 0.80
estimated_hours: 4
cross_links:
  - phys.em.wheatstone-bridge
  - phys.em.emf
session_cap: "7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)"
cpa_entry_stage: "C (anchor; difficulty 4 → C with accelerated P track)"
status: READY
```

---

## Component 1 — Concept Explanation Blocks

### Block 1-A — What a Potentiometer Does
A potentiometer is a **null instrument** for measuring EMF and potential difference without drawing current from the source under test. A long uniform resistance wire (or a calibrated resistance box) carries a **driver current** I from a driver battery. The potential gradient (voltage per unit length) along the wire is:

> **k = V_wire / L = ε_driver / L** (if wire resistance >> external resistance, and driver current is steady)

A source of unknown EMF (ε_x) is connected in opposition through a galvanometer. The jockey (sliding contact) is moved along the wire until the galvanometer reads zero at length l:

> **ε_x = k × l = (ε_driver / L) × l**

At null, no current flows from ε_x → EMF is measured exactly (no terminal voltage correction needed).

### Block 1-B — Comparison with Voltmeter
A voltmeter draws a small current from the source being measured, creating a voltage drop across internal resistance r. A potentiometer at null draws zero current → measures true EMF (not terminal voltage). This is the fundamental advantage: **zero current at balance → no loading error**.

If a standard cell (ε_s, known) balances at l_s and unknown cell balances at l_x:

> **ε_x / ε_s = l_x / l_s**   ⟹   **ε_x = ε_s × (l_x / l_s)**

This ratio method eliminates the potential gradient k entirely, removing the need for wire calibration.

### Block 1-C — Measuring Internal Resistance
1. Balance unknown cell with switch S open → balance length l₁ → measures ε_x (open circuit, no current from cell).
2. Connect known resistance R_ext across cell, close S. Now cell drives I = ε_x / (r + R_ext). Terminal voltage V = ε_x × R_ext / (r + R_ext) balances at l₂.
3. Since ε_x / V = l₁ / l₂:  
   **r = R_ext × (l₁ − l₂) / l₂**

### Block 1-D — Calibration and Practical Factors
- **Driver current must be constant**: connect a rheostat in the driver circuit to adjust current; standardise against a known (Weston) cell.
- **Wire uniformity**: non-uniform cross-section causes non-linear potential gradient → errors.
- **Sensitivity**: longer wire L → smaller k → finer resolution of l.
- **Range extension**: for ε_x > ε_driver (impossible to balance), use a resistor in series with ε_x to reduce effective EMF; alternatively use a high-ratio potential divider on the driver side.

---

## Component 2 — Worked Examples

### WE-1 — Direct EMF Measurement
**Problem:** A potentiometer wire of length L = 1.0 m has driver EMF ε_driver = 2.0 V (internal resistance negligible). An unknown cell balances at l = 65.0 cm. Find ε_x.

**Solution:**
k = ε_driver / L = 2.0 / 1.0 = 2.0 V/m  
ε_x = k × l = 2.0 × 0.650 = **1.30 V**

---

### WE-2 — Ratio Method with Standard Cell
**Problem:** Standard cell ε_s = 1.018 V balances at l_s = 50.9 cm. Unknown cell balances at l_x = 64.3 cm. Find ε_x.

**Solution:**
ε_x = ε_s × (l_x / l_s) = 1.018 × (64.3 / 50.9) = 1.018 × 1.2632 = **1.286 V**

Note: k and driver current cancelled — result depends only on the length ratio and ε_s.

---

### WE-3 — Internal Resistance via Potentiometer
**Problem:** Unknown cell balances at l₁ = 75.0 cm (open circuit). When R_ext = 5.0 Ω is connected, balance shifts to l₂ = 60.0 cm. Find internal resistance r.

**Solution:**
r = R_ext × (l₁ − l₂) / l₂ = 5.0 × (75.0 − 60.0) / 60.0 = 5.0 × 15.0 / 60.0 = **1.25 Ω**

Verify: ratio ε_x/V = l₁/l₂ = 75/60 = 1.25; so V = ε_x/1.25; r = (ε_x − V)/I = (ε_x/1.25)(0.25 × R_ext × 1.25/(ε_x)) ... simpler via formula: r = R_ext(l₁−l₂)/l₂ = 5×15/60 = 1.25Ω ✓

---

## Component 3 — Misconception Engine

### MC-POTENTIOMETER-IS-JUST-A-VARIABLE-RESISTOR
- **trigger_signal:** Student confuses the precision measurement instrument with a common 3-terminal variable resistor (also called a "pot" in electronics).
- **conflict_evidence [P28]:** "A variable resistor (rheostat) changes resistance and is used to control current. A potentiometer as a measurement instrument uses a uniform wire to create a known potential gradient; the key feature is the null condition where galvanometer current = 0. Completely different purpose and operation."
- **bridge_text [P30]:** "In everyday electronics, 'potentiometer' does mean a variable resistor (like a volume knob). In physics, it refers to a precision null-balance circuit. Same name, different meaning — context tells you which. In this topic, we always mean the physics measurement device."
- **replacement_text [P31]:** "In this context, a potentiometer is a null-balance instrument: uniform wire + driver current + galvanometer. At balance (G=0), ε_x = kl. It measures true EMF by drawing zero current from the source under test."
- **discrimination_pairs [P33]:**
  - Variable resistor (electronics): 3 terminals, divides voltage, always draws current
  - Potentiometer (physics instrument): wire/driver circuit, galvanometer, null at balance, zero current from source
- **s6_path:** If still confused, draw both circuits side by side; label functions explicitly.

---

### MC-POTENTIOMETER-MEASURES-TERMINAL-VOLTAGE
- **trigger_signal:** Student says "the potentiometer measures the voltage the battery delivers" or confuses null-balance EMF with terminal voltage.
- **conflict_evidence [P28]:** "At the null point, the galvanometer reads zero. Zero current means zero current flowing FROM the cell under test. If no current flows, V_terminal = ε − I×r = ε − 0 = ε. The potentiometer always measures the open-circuit EMF, not the terminal voltage under load."
- **bridge_text [P30]:** "A voltmeter measures terminal voltage because it draws current from the source (even a 'good' voltmeter draws some). The potentiometer opposes the source's voltage exactly at null — like pushing two carts head-on until neither moves. At standstill, no force (no current) is transmitted. That's why we measure true EMF."
- **replacement_text [P31]:** "Potentiometer at null: I_from_source = 0 → V_terminal = ε (open circuit). Therefore the potentiometer measures true EMF, not terminal voltage. This is its critical advantage over a voltmeter."
- **discrimination_pairs [P33]:**
  - Voltmeter measurement: reads V_terminal = ε − Ir (slightly less than ε)
  - Potentiometer at null: reads ε (true EMF, because I=0 from source)
- **s6_path:** Link to EMF blueprint (Block 1-C, open-circuit measurement); reinforce that null = no current = terminal voltage equals EMF.

---

## Component 4 — Assessment Probes

### Probe Set A — Factual Recall
**A1 (MCQ):** At the null point of a potentiometer, the current through the galvanometer is:
(a) Maximum **(b) Zero** (c) Equal to driver current (d) Inversely proportional to EMF

**A2 (Short answer):** Why does a potentiometer measure true EMF while a voltmeter only measures terminal voltage?
[At null, no current flows from the source under test; hence no Ir drop; V_terminal = ε − 0 = ε]

**A3 (Fill-in):** In the ratio method: ε_x = ε_s × ______.
[l_x / l_s]

---

### Probe Set B — Conceptual Transfer
**B1:** Standard cell (1.080 V) balances at 54.0 cm. Unknown cell balances at 72.0 cm. Find ε_x.
[ε_x = 1.080 × 72.0/54.0 = 1.080 × 1.333 = 1.44 V]

**B2:** A cell balances at l₁ = 80 cm (open circuit). With R = 8 Ω connected, balance shifts to l₂ = 64 cm. Find r.
[r = 8 × (80−64)/64 = 8 × 16/64 = 2.0 Ω]

**B3:** If the driver battery voltage decreases by 10% (all else unchanged), what happens to the balance length for ε_x?
[k decreases by 10%; l must increase by ~11% (same ε_x = k×l; if k drops, l must rise). Specifically: l_new = l_old × (1/0.9) = 1.111 × l_old. This is why a stable driver current is essential.]

---

### Probe Set C — Mastery Gate [P91]
**C1 (Multi-step):** A potentiometer wire 2.0 m long. Driver: ε=4.0V, internal resistance=1Ω, series rheostat=3Ω. A standard cell (ε_s=1.02V) balances at l_s=51.0cm. Unknown cell balances at l_x=73.5cm. (a) Find k. (b) Verify ε_s using k. (c) Find ε_x using ratio method.
[(a) k = ε_s/l_s = 1.02/0.510 = 2.0 V/m; (b) ε_s = k × l_s = 2.0 × 0.510 = 1.02 V ✓; (c) ε_x = ε_s × l_x/l_s = 1.02 × 73.5/51.0 = 1.47 V]

**C2 (Error analysis):** The driver battery internal resistance increases from 0 to 2Ω during a measurement. How does this affect the balance length for ε_x? What systematic error results?
[Driver current I = ε_driver/(r_driver + R_rheostat + R_wire). If r increases, I decreases; k = I × ρ/A (resistance per unit length) decreases; so balance length increases. If calibrated at r=0 but measured at r=2Ω, the balance length found corresponds to a lower k than assumed → ε_x calculated = k_assumed × l_measured > actual ε_x → systematic overestimate. Fix: re-standardise against known cell after any driver change.]

---

## Component 5 — Retrieval & Spacing Schedule

```yaml
retrieval_events:
  - offset: "+10 min"
    type: free_recall [P62]
    prompt: "Without notes: what is the null condition, what does the potentiometer measure at null, and why is this better than a voltmeter?"
  - offset: "+1 day"
    type: retrieval_quiz [P36]
    prompt: "Standard cell (1.018V) balances at 48.5cm. Unknown balances at 61.2cm. Find ε_x. Then: open-circuit balance at 70cm, with R=4Ω balance at 56cm — find r."
  - offset: "+4 days"
    type: interleaved [P33]
    prompt: "Compare potentiometer vs. Wheatstone bridge: what does each measure, and what is the null condition in each?"
  - offset: "+10 days"
    type: application [P91]
    prompt: "A cell has unknown ε and r. Design a potentiometer experiment to find both. State what measurements to take and write the formulas."
```

---

## Component 6 — Session Flow Script

```
[P01 — Session open]
"Today we'll learn how to measure a battery's true EMF — not the reading under load, but the actual stored chemical energy per coulomb. This requires an instrument that takes the measurement without disturbing what it's measuring."

[P41 — Diagnostic]
"What's the difference between a battery's EMF and its terminal voltage? How would you measure each?"
→ Correct (terminal voltage = ε−Ir; voltmeter measures terminal V): excellent — potentiometer fixes this.
→ Incorrect: revisit phys.em.emf briefly.

[P06 — Concrete anchor]
"Imagine pushing two magnets face-to-face: when the repulsion exactly balances the push, neither moves — no force transfers. The potentiometer does the electrical equivalent: it sets up an opposing voltage that exactly balances ε_x, so no current flows from the source. At that exact balance, we read the length — and that length encodes the EMF."

[TA-1 — Instrument description and null condition: Block 1-A]
"Uniform wire, driver current I, potential gradient k = ε_driver/L. At null: ε_x = kl."

[P28 — Conflict evidence for MC-POTENTIOMETER-MEASURES-TERMINAL-VOLTAGE]
"At null, galvanometer current = 0. Zero current from the cell. So V_terminal = ε − I×r = ε − 0×r = ε. The potentiometer can only be seeing the true EMF."

[P51 — Check-in]
"Say it in one sentence: what does the potentiometer measure and why?"

[TA-2 — Ratio method: Block 1-B, WE-2]
"With standard cell as reference: ε_x/ε_s = l_x/l_s. No calibration of k needed. Walk through WE-2."

[TA-3 — Internal resistance measurement: Block 1-C, WE-3]
"Open circuit → l₁ = ε_x. Under load → l₂ = terminal voltage. Ratio gives r."

[P52 — Narrow]
"Three formulas only: ε_x=kl; ε_x=ε_s(l_x/l_s); r=R_ext(l₁−l₂)/l₂. Everything else is a special case."

[TA-4 — Practical considerations: Block 1-D]

[P62 — Retrieval seed]
"Write from memory: what is null, what is measured at null, the ratio formula, and the r formula."

[P36 — Mastery probe — Probe C1]

[P68 — Close]
"Potentiometer: null instrument, measures true EMF (not terminal voltage), ratio method eliminates calibration. Also measures r via two-step null procedure."

[P85 — Regulation tail]
"Clearest point? Shakiest point?"

[P89 — Retrieval schedule]
"Return tomorrow for the +1 day retrieval practice."
```

---

## Component 7 — Adaptive Branching

| Signal | Branch |
|--------|--------|
| Probe A2 wrong (says "voltmeter and potentiometer are same") | Deploy MC-POTENTIOMETER-MEASURES-TERMINAL-VOLTAGE; draw both circuits |
| Probe B1 arithmetic error | Check ratio l_x/l_s; ensure lengths in same unit |
| Probe B3 wrong (says balance length unchanged) | Derive k = I×r_wire/L; show k depends on driver current; re-derive |
| Probe C2 wrong | Trace driver current through circuit; show how r increase reduces I reduces k |
| Asks why not just use a digital voltmeter | Explain that even high-impedance DMM (10MΩ) draws 0.1μA; potentiometer draws truly zero; for primary standards, null matters |

---

## Component 8 — Visualisation Specification

**Primary visual:** Full potentiometer circuit diagram — driver battery (ε_d) + rheostat in series, connected to uniform wire AB (length L). Jockey (J) slides along AB. From J, galvanometer G connects to unknown cell ε_x (negative terminal connected to A). Labels: potential gradient k, balance length l, null condition G=0. Dashed annotation: "no current from ε_x at null."

**Secondary visual:** Comparison table-diagram: Potentiometer vs. Voltmeter — row 1: "Current drawn from source" (Potentiometer: 0 at null; Voltmeter: V/R_V > 0); row 2: "Quantity measured" (True EMF; Terminal voltage); row 3: "Accuracy" (High; Lower). Highlight the zero-current row in green.

**Tertiary visual:** Internal resistance measurement — two diagrams side by side: (left) open circuit, balance length l₁; (right) R_ext connected, balance length l₂ < l₁. Formula r = R_ext(l₁−l₂)/l₂ annotated.

---

## Component 9 — Validation Checklist

```
V-1  concept_id matches KG exactly (phys.em.potentiometer)                 PASS
V-2  domain derived correctly (phys.em → electromagnetism)                 PASS
V-3  difficulty number matches label (proficient → 4)                      PASS
V-4  bloom verb matches level (apply → calculate/use/design)               PASS
V-5  prerequisites listed in KG (phys.em.kirchhoffs-laws)                  PASS
V-6  mastery_threshold = 0.80                                              PASS
V-7  session_cap rule applied (≥1h → PA-3)                                PASS
V-8  cpa_entry_stage matches difficulty 4 formula                          PASS
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
