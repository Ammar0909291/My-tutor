# Teaching Blueprint — phys.em.wheatstone-bridge

## Component 0 — Concept Identity

```yaml
concept_id: phys.em.wheatstone-bridge
name: Wheatstone Bridge
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
  - phys.em.potentiometer
  - phys.em.dc-circuits
session_cap: "7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)"
cpa_entry_stage: "C (anchor; difficulty 4 → C with accelerated P track)"
status: READY
```

---

## Component 1 — Concept Explanation Blocks

### Block 1-A — Circuit Structure and Balance Condition
A Wheatstone bridge is a diamond-shaped resistor network used to measure an unknown resistance with high precision. Four resistors (P, Q, R, X) are arranged: P and Q on one arm, R and X on the other, with a galvanometer (G) connecting the midpoints (D and B), and an EMF source connecting the opposite corners (A and C).

```
        A
       / \
      P   R
     /     \
    B---G---D
     \     /
      Q   X
       \ /
        C
```

**Balance condition** (galvanometer reads zero, no current through G):

> **P/Q = R/X**   ⟹   **X = QR/P**

At balance: V_B = V_D (the two midpoints are at the same potential). This is derived by applying KVL to both branches:
- Left arm: V_B = V_A × Q/(P+Q)
- Right arm: V_D = V_A × X/(R+X)
- Setting equal: Q/(P+Q) = X/(R+X) → PX = QR → **X = QR/P**

### Block 1-B — Why the Bridge Is Precise
Unlike measuring resistance via Ohm's law (V = IR requires accurate voltmeter and ammeter), the bridge method uses a **null method**: you adjust a known ratio (P:Q) or a known resistance (R) until the galvanometer reads exactly zero. At null, EMF magnitude and galvanometer sensitivity don't matter — the result depends only on resistance ratios, which can be made highly reproducible.

**Sensitivity:** The galvanometer deflects when the bridge is slightly unbalanced. High sensitivity means detecting small changes in X (useful for strain gauges, temperature sensors). Sensitivity ∝ G_sensitivity × (P/Q) × (ΔX/X).

### Block 1-C — Slide-Wire (Metre-Bridge) Form
In a metre bridge (standard lab version): P and Q are replaced by lengths l and (100−l) of resistance wire on a 1-m scale. The sliding contact (jockey) is moved until G reads zero at length l.

> **X = R × l / (100 − l)**

### Block 1-D — Practical Applications
- **Resistance measurement**: unknown X found from balanced ratios
- **Strain gauges**: unbridged bridge detects tiny resistance changes (ΔR/R ~10⁻⁶) from mechanical deformation
- **Temperature sensing (RTD bridge)**: platinum resistance thermometer in one arm; bridge imbalance calibrated to temperature
- **Limitations**: works poorly at very high or very low resistances (lead resistance errors; galvanometer sensitivity); AC bridges extend this to capacitors and inductors

---

## Component 2 — Worked Examples

### WE-1 — Finding Unknown Resistance at Balance
**Problem:** In a Wheatstone bridge: P = 100 Ω, Q = 10 Ω, R = 47 Ω. The galvanometer reads zero. Find X.

**Solution:**
Balance condition: P/Q = R/X → X = QR/P  
X = (10 × 47) / 100 = **4.7 Ω**

Verify: P×X = 100 × 4.7 = 470; Q×R = 10 × 47 = 470 ✓

---

### WE-2 — Metre Bridge Calculation
**Problem:** In a metre bridge, R = 10 Ω. Balance is achieved at l = 60 cm. Find X.

**Solution:**
X = R × l / (100 − l) = 10 × 60 / (100 − 60) = 600 / 40 = **15 Ω**

Verify: P/Q = 60/40 = 1.5; R/X = 10/15 = 0.667 — not equal? Recheck: P ∝ l = 60, Q ∝ (100−l) = 40; P/Q = 60/40 = 1.5; X = QR/P → wait, the formula is X/R = (100−l)/l. Let me re-derive:

Standard metre bridge: the known R is in the right gap. At balance: R_left/R_right = l/(100−l), where R_left = X (unknown) in left gap.
X/R = l/(100−l) → X = R × l/(100−l) = 10 × 60/40 = **15 Ω** ✓

Cross-check: 15/10 = 1.5; 60/40 = 1.5 ✓

---

### WE-3 — Finding Galvanometer Current (Unbalanced Bridge)
**Problem:** Bridge with P=100Ω, Q=100Ω, R=100Ω, X=110Ω, G=50Ω, ε=5V. Is the bridge balanced? Find the direction of galvanometer deflection.

**Solution:**
Check balance: P/Q = 100/100 = 1; R/X = 100/110 = 0.909. Not balanced (P/Q ≠ R/X), so G reads non-zero.

Potential at B (left midpoint): V_B = ε × Q/(P+Q) = 5 × 100/200 = 2.5 V  
Potential at D (right midpoint): V_D = ε × X/(R+X) = 5 × 110/210 = 2.619 V

V_D > V_B → D is at higher potential → current flows D→G→B (from D through galvanometer to B).

This shows X > R×Q/P → bridge imbalanced; X needs to decrease (or R increase) to balance.

---

## Component 3 — Misconception Engine

### MC-WHEATSTONE-BRIDGE-MEASURES-EMF
- **trigger_signal:** Student thinks the bridge measures the battery voltage, or believes the EMF value matters for the result.
- **conflict_evidence [P28]:** "At balance, the galvanometer reads zero — no current flows through it. Look at the balance equation X = QR/P: EMF doesn't appear anywhere. Even if you doubled the battery voltage, the balance point doesn't change. The result is purely about resistance ratios."
- **bridge_text [P30]:** "The Wheatstone bridge is a null measurement — like balancing a scale. You don't need to know how hard gravity pulls; you just adjust until the two sides are equal. Similarly, you don't need to know ε; you just adjust until the galvanometer reads zero."
- **replacement_text [P31]:** "The balance condition X = QR/P depends only on resistance ratios, not on EMF or galvanometer resistance. The battery drives current; the null condition is independent of how much."
- **discrimination_pairs [P33]:**
  - Ohm's law method (V=IR): needs accurate V and I measurements → depends on meter accuracy
  - Wheatstone bridge: null method → depends only on resistance ratios → much more precise
- **s6_path:** Return to balance condition derivation (Block 1-A); show algebraically that ε cancels.

---

### MC-BRIDGE-BALANCE-REQUIRES-EQUAL-RESISTORS
- **trigger_signal:** Student says "the bridge balances when P=Q=R=X" or thinks all four resistors must be equal.
- **conflict_evidence [P28]:** "WE-1: P=100Ω, Q=10Ω, R=47Ω, X=4.7Ω — four different values, yet balance condition P/Q=R/X gives 100/10=47/4.7=10. Balance is about ratios, not equality."
- **bridge_text [P30]:** "Think of it as a proportion: P:Q must equal R:X. That could be 1:1, 10:1, or 100:1 — as long as both arms have the same ratio, the midpoints sit at equal potentials and G reads zero."
- **replacement_text [P31]:** "Balance condition: P×X = Q×R (cross-multiply of P/Q = R/X). Equal resistors satisfy this (P=Q=R=X → P×X=P²=Q×R=P²), but so do countless other combinations."
- **discrimination_pairs [P33]:**
  - P=Q=R=X=100Ω: balanced (trivial case)
  - P=100, Q=10, R=47, X=4.7: balanced (non-trivial; same ratio 10:1)
  - P=100, Q=10, R=47, X=5: NOT balanced (P/Q=10; R/X=9.4)
- **s6_path:** Metre bridge demonstration: move jockey to show balance at various positions; calculate P/Q from l/(100−l) each time.

---

## Component 4 — Assessment Probes

### Probe Set A — Factual Recall
**A1 (MCQ):** In a balanced Wheatstone bridge, the galvanometer current is:
(a) Maximum (b) Minimum but non-zero **(c) Zero** (d) Equal to the battery current

**A2 (Fill-in):** The balance condition for a Wheatstone bridge (P, Q, R, X in standard arrangement) is: ______
[P/Q = R/X, or equivalently PX = QR]

**A3 (Short answer):** Why is the Wheatstone bridge more accurate than directly applying Ohm's law to measure resistance?
[Null method — result depends on resistance ratios only, not meter readings; EMF and galvanometer sensitivity irrelevant at balance]

---

### Probe Set B — Conceptual Transfer
**B1:** In a metre bridge, if the jockey balances at 40 cm with R = 15 Ω, find X.
[X = R × l/(100−l) = 15 × 40/60 = 10 Ω]

**B2:** The battery in a balanced Wheatstone bridge is replaced with one of twice the voltage. Does the balance condition change?
[No — balance condition is independent of EMF; X = QR/P unchanged]

**B3:** A Wheatstone bridge has P=200Ω, Q=100Ω, R=80Ω. Find X for balance. If X increases by 10%, which midpoint (B or D) rises in potential?
[X = QR/P = 100×80/200 = 40Ω. If X increases to 44Ω: V_D = ε×44/124 increases; V_B = ε×100/300 = ε/3 unchanged. D rises above B.]

---

### Probe Set C — Mastery Gate [P91]
**C1 (Multi-step):** A Wheatstone bridge: P=500Ω, Q=100Ω. A decade resistance box for R is adjusted; balance achieved at R=62Ω. (a) Find X. (b) If R has a ±0.5Ω uncertainty, what is the uncertainty in X?
[(a) X=QR/P=100×62/500=12.4Ω. (b) ΔX=Q×ΔR/P=100×0.5/500=0.1Ω; X=12.4±0.1Ω]

**C2 (Design):** You want to measure X ≈ 5000 Ω using a bridge. Available fixed resistors: 100Ω, 1kΩ, 10kΩ. Choose P, Q, R to maximise precision. Justify.
[Set P=10kΩ, Q=1kΩ (ratio 10:1), R=500Ω → X=QR/P=1000×500/10000=50Ω — too low. Try P=1kΩ, Q=10kΩ, R=500Ω → X=10000×500/1000=5000Ω ✓. Use adjustable R near 500Ω for fine null. High sensitivity: balance near midpoint of meter bridge preferred.]

---

## Component 5 — Retrieval & Spacing Schedule

```yaml
retrieval_events:
  - offset: "+10 min"
    type: free_recall [P62]
    prompt: "Without notes: state the Wheatstone bridge balance condition and explain why EMF doesn't appear in the result."
  - offset: "+1 day"
    type: retrieval_quiz [P36]
    prompt: "Metre bridge: R=20Ω, balance at l=35cm. Find X. Then find new balance length if X is replaced by 2X."
  - offset: "+4 days"
    type: interleaved [P33]
    prompt: "Compare: Wheatstone bridge vs. direct Ohm's law measurement. When would you use each? What is the key advantage of the null method?"
  - offset: "+10 days"
    type: application [P91]
    prompt: "Bridge: P=1kΩ, Q=100Ω, balance R=240Ω. Find X with uncertainty if R has ±2Ω tolerance."
```

---

## Component 6 — Session Flow Script

```
[P01 — Session open]
"Today we'll learn the most precise method ever devised for measuring resistance — a technique so reliable it's still used in modern sensor systems 180 years after Wheatstone published it."

[P41 — Diagnostic]
"You know Ohm's law R=V/I. What limits the accuracy of measuring resistance this way?"
→ Correct (meter accuracy, voltmeter loading): good — bridge solves exactly this.
→ Partial: "Think about how accurate your voltmeter and ammeter need to be."

[P06 — Concrete anchor]
"A balance scale: you don't need to know gravity's exact value — you just add weights until it levels. Wheatstone bridge is a resistance balance scale. You adjust known resistors until a galvanometer reads zero. At zero, no calibration of the galvanometer or knowledge of battery voltage is needed."

[TA-1 — Circuit structure and balance condition: Block 1-A]
"Draw the diamond circuit. Derive X = QR/P from V_B = V_D at balance."

[P28 — Conflict evidence for MC-BRIDGE-BALANCE-REQUIRES-EQUAL-RESISTORS]
"WE-1: P=100, Q=10, R=47, X=4.7. All four are different, yet balance is perfect. The bridge is about ratio, not equality."

[P51 — Check-in]
"What ratio must hold for balance? Can you express it two ways (fraction and cross-multiply form)?"

[TA-2 — Why null method is superior: Block 1-B]
"The formula X = QR/P has no ε, no galvanometer resistance. Let that sink in — we've eliminated two sources of systematic error."

[TA-3 — WE-2: metre bridge]

[P52 — Narrow]
"Two key formulas only: X = QR/P (general bridge) and X = R×l/(100−l) (metre bridge). Everything else is derived."

[TA-4 — WE-3: unbalanced bridge, finding direction of deflection]

[P62 — Retrieval seed]
"Write from memory: balance condition, metre bridge formula, why EMF cancels."

[P36 — Mastery probe — Probe C1]

[P68 — Close]
"Wheatstone bridge: null method, resistance ratios only, EMF irrelevant at balance. X = QR/P. This principle extends to AC bridges for capacitors and inductors."

[P85 — Regulation tail]
"Shakiest part: deriving the balance condition, or the metre bridge formula?"

[P89 — Retrieval schedule]
"Return tomorrow for the +1 day retrieval quiz."
```

---

## Component 7 — Adaptive Branching

| Signal | Branch |
|--------|--------|
| Student can't derive balance condition | Return to KVL; show V_B and V_D explicitly; set equal |
| Probe B2 wrong (thinks EMF matters) | Deploy MC-WHEATSTONE-BRIDGE-MEASURES-EMF; show ε cancels algebraically |
| Probe B3 wrong (direction of deflection) | Calculate V_B and V_D numerically; compare |
| Probe C2 wrong (R choice) | Discuss sensitivity: balance near mid-range of R is most precise; avoid ratio extremes |
| Asks about AC Wheatstone bridge | Flag as enrichment (Maxwell, Owen bridges for L and C); defer if time-limited |

---

## Component 8 — Visualisation Specification

**Primary visual:** Labelled diamond circuit diagram — A (top), C (bottom), B (left), D (right); P and Q on left arm (A-B-C), R and X on right arm (A-D-C); galvanometer G connecting B to D horizontally; battery ε connecting A to C; voltage labels V_B and V_D shown at midpoints. At balance condition, highlight V_B = V_D in green.

**Secondary visual:** Metre bridge diagram — 1-metre nichrome wire with jockey (sliding contact); left gap: unknown X; right gap: known R; galvanometer and battery connections; balance length l marked on wire; formula X = Rl/(100−l) displayed.

**Tertiary visual:** Sensitivity chart — galvanometer deflection vs. % imbalance (ΔX/X); shows null at centre, linear region near balance; illustrates why high-sensitivity galvanometer improves precision.

---

## Component 9 — Validation Checklist

```
V-1  concept_id matches KG exactly (phys.em.wheatstone-bridge)            PASS
V-2  domain derived correctly (phys.em → electromagnetism)                 PASS
V-3  difficulty number matches label (proficient → 4)                      PASS
V-4  bloom verb matches level (apply → calculate/use)                      PASS
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
