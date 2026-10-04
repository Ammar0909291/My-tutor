# Teaching Blueprint: phys.em.lcr-circuits

## 0. Concept Profile
concept_id: phys.em.lcr-circuits
name: Series LCR Circuit: Impedance, Resonance and Q Factor
domain: Electricity & Magnetism (Physics)
difficulty: advanced (4)
bloom: apply
prerequisites: [phys.em.lc-circuits]
mastery_threshold: 0.75
estimated_hours: 3
cross_links: []
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: P (a radio tuning knob picking one station out of many, before any phasor; difficulty 4)
status: READY

## 1. Learning Objective

[Boundary statement]
A student who achieves mastery demonstrates:
1. Explains that in a series AC circuit the same current flows through R, L and C, but the inductor's voltage leads that current by 90°, the capacitor's lags it by 90°, and the resistor's is in phase — so the voltages add as phasors, not as numbers, giving Z = √(R² + (X_L − X_C)²) with X_L = ωL and X_C = 1/(ωC).
2. Computes it — R = 40 Ω, L = 0.2 H, C = 50 μF at ω = 400 rad/s: X_L = 80 Ω, X_C = 50 Ω, Z = 50 Ω; with 200 V rms the current is 4 A and it lags the supply voltage by φ = tan⁻¹(30/40) ≈ 37°.
3. Explains resonance — at ω₀ = 1/√(LC) (here ≈ 316 rad/s) X_L = X_C, they cancel, Z = R is a MINIMUM and the current a MAXIMUM (5 A); the sharpness is the Q factor, Q = ω₀L/R = (1/R)√(L/C), larger for smaller R — the principle of radio tuning.

A student who adds R, X_L and X_C as plain numbers, or thinks the impedance is greatest at resonance, has **NOT** achieved mastery — those ideas misread every tuned circuit.

## 2. Student State Matrix

| State | Why here | Tell-tale behaviour | Protocol |
|---|---|---|---|
| S0 | Only DC resistance known | Cannot say what a capacitor does to AC | Protocol A (Concrete) |
| S1 | Formula recited | Writes Z = √(R² + (X_L − X_C)²) but cannot say why the square root | Protocol B (Counterexample-first) |
| S2-IMPEDANCE-SUM | Ohms add | "Z = R + X_L + X_C" | Misconception Engine → then Protocol C |
| S2-RESONANCE-MAX-IMPEDANCE | Resonance = something big | "At resonance the impedance peaks, so the current is smallest" | Misconception Engine → then Protocol C |
| S3 | Partial — Z fine, resonance not | Cannot find ω₀ or explain Q | Protocol C (Guided Questioning) |
| S6 | Anxiety on phasors | Avoids diagrams with angles | Protocol F (Low Pressure) |

## 3. Diagnostic Battery

DB-1 (prior-exposure check):
"How does a radio pick out one station when all of them reach the aerial at once?"
  No idea → S0. Enter Protocol A (Concrete).
  "A tuned circuit responds strongly at one frequency" → DB-2.

DB-2 (representation / misconception test):
"In a series circuit R = 40 Ω, X_L = 80 Ω and X_C = 50 Ω. What is the impedance?"
  "50 Ω — √(40² + 30²), because the reactive voltages are 90° out of phase with the resistor's" → S3. Enter Protocol C.
  "50 Ω" (no reason) → S1. Enter Protocol B.
  "170 Ω" or "70 Ω" → SIGNAL:MISCONCEPTION:MC-IMPEDANCE-SUM. Enter Misconception Engine.
  Pause → add S6 flag; Protocol F if anxious, otherwise Protocol A.

DB-3 (resonance check — overlays):
"At the resonant frequency of a series LCR circuit, is the current largest or smallest?"
  "Largest — X_L and X_C cancel, so Z = R" → no flag.
  "Smallest — the impedance peaks at resonance" → add SIGNAL:MISCONCEPTION:MC-RESONANCE-MAX-IMPEDANCE (repair at TA-5).
  Confident and wrong on DB-2 → add S7 flag. Override to Protocol G.

## 4. Prerequisite Check

PD-1 (for `phys.em.lc-circuits`):
"What is the natural frequency of an LC circuit, and what happens to the energy as it oscillates?"
  Cannot say "f = 1/(2π√LC), energy passes between the capacitor's field and the inductor's field" → flag PREREQ-GAP-LC.
  In-session minimum repair: one P06 (the LC energy swing) + one P34 ("L = 0.2 H, C = 50 μF: ω₀?") then resume. If absent, schedule the missing session (S4 route).

## 5. Protocol Library

### Protocol A — Concrete-First (primary)
Serves: S0
CPA entry: P
Entry condition: only DC known.
Success exit: computes Z, current and phase, finds ω₀ and explains Q (P91 all 5 probes CORRECT).
Failure exit: on IMPEDANCE-SUM → Misconception Engine, resume at TA-4. On anxiety → Protocol F.
Duration: ~70–80 min (spans 2 sessions; session_cap 7 TAs).

[TA-1: Tuning a Radio]
P01
→ P04[content: "Turning a radio's tuning knob changes a capacitor. One station comes in loud; the rest stay quiet."]
→ P06[content: a graph of current against frequency with a sharp peak]
→ P14[predict: "What makes the circuit respond so strongly at just one frequency?"] → P55
→ success_path → P49 → P05[curiosity: "What happens to R, L and C at that frequency?"]

[TA-2: Reactance]
P02
→ P13[think-aloud: "A capacitor charges and discharges every cycle. The faster the AC, the less it can charge, so it passes AC more easily: X_C = 1/(ωC). An inductor opposes changes in current, more so the faster they come: X_L = ωL. Both are measured in ohms."]
→ P08[notation: "X_L = ωL, X_C = 1/(ωC)"]
// GR-3 satisfied: P06 and P13 preceded P08 (V-8 PASS)
→ P34[question: "L = 0.2 H, C = 50 μF, ω = 400 rad/s. X_L and X_C?"] → P55
→ success_path[80 Ω, 50 Ω] → P49
→ failure_path → P50 → P51[diagnose: μF] → P52[narrow: "50 μF = 5 × 10⁻⁵ F"] → re-elicit P34 → P55

[TA-3: Phase]
P02
→ P13[think-aloud: "The same current flows through all three. The resistor's voltage rises and falls with it. The inductor's voltage peaks a quarter cycle EARLY (leads by 90°); the capacitor's a quarter cycle LATE (lags by 90°). V_L and V_C point opposite ways; both are at right angles to V_R."]
→ P06[content: a phasor diagram: V_R along the current, V_L up, V_C down, resultant V]
→ P34[question: "V_R = 160 V, V_L = 320 V, V_C = 200 V. Supply voltage?"] → P55
→ success_path[√(160² + 120²) = 200 V] → P49

[TA-4: Impedance]
P02
→ P41[diagnostic: "R = 40 Ω, X_L = 80 Ω, X_C = 50 Ω. Impedance?"] → P55
→ [if 50 Ω] → P49
→ [if 170 Ω or 70 Ω] → SIGNAL:MISCONCEPTION:MC-IMPEDANCE-SUM → misconception_repair_chain[MC-IMPEDANCE-SUM]
→ P34[question: "200 V rms across it. Current and phase angle?"] → P55
→ success_path[4 A; tan φ = 30/40, φ ≈ 37°, current lags because X_L > X_C] → P49

[TA-5: Resonance and Q]
P02
→ P41[diagnostic: "At resonance, is the current largest or smallest?"] → P55
→ [if largest] → P49
→ [if smallest] → SIGNAL:MISCONCEPTION:MC-RESONANCE-MAX-IMPEDANCE → misconception_repair_chain[MC-RESONANCE-MAX-IMPEDANCE]
→ P34[question: "ω₀ for L = 0.2 H, C = 50 μF? Current at resonance with 200 V and R = 40 Ω? Q?"] → P55
→ success_path[≈ 316 rad/s; 5 A; Q = 316 × 0.2 / 40 ≈ 1.6] → P49
→ P13[think-aloud: "Cut R to 10 Ω and Q rises to 6.3: the peak becomes four times taller and much narrower — a more selective tuner."]

[TA-6: Formative Assessment]
P02
→ P90_expansion:
    P79[predict: "Above resonance, which reactance is larger, and does the current lead or lag?"] → P55
    → P49 → P51[check: X_L > X_C; current lags]
    → P35[open: "Explain why the voltages across R, L and C can add to more than the supply voltage."] → P55

[TA-7: Mastery Gate]
P02
→ P91_expansion:
    P77[generate: "Choose C so that a 0.2 H inductor resonates at 500 rad/s."] → P55 → CORRECT
    → P76[transfer: "Why does a radio with a lower-resistance tuning circuit separate stations better?"] → P55 → CORRECT
    → P75[boundary: "At exactly ω₀, what is the phase angle between current and supply voltage?"] → P55 → CORRECT
    → P74[classify: "Below resonance: inductive or capacitive?"] → P55 → CORRECT
    → P78[explain: "Why is Z = √(R² + (X_L − X_C)²) and not R + X_L + X_C?"] → P55 → CORRECT
→ P68 → P62[schedule: first retrieval in 1 day]

### Protocol B — Counterexample-First
Serves: S1
CPA entry: P
Entry condition: formula without reasons.
Success exit: explains the square root with the phasor diagram.
Failure exit: Misconception Engine, then Protocol C.
Key deltas from A: open with P02 → P41["V_R = 160 V, V_L = 320 V, V_C = 200 V — they add to 680 V, but the supply is 200 V. How?"] → P54 (novel) → P55; then TA-3 and TA-5.

### Protocol C — Guided Questioning
Serves: S3, S2 (post-repair)
CPA entry: P
Entry condition: Z fine; resonance not.
Success exit: ω₀, peak current and Q.
Failure exit: escalate to Protocol A TA-3.
Key deltas: enter at TA-5; run the gate.

### Protocol F — Low Pressure (S6)
Serves: S6
CPA entry: P
Entry condition: S6 flag confirmed.
Success exit: reactances and one impedance computed calmly.
Failure exit: shorten, bank one success, reschedule.
Key deltas: NO P28 (V-10 / GR-5); use the right-angled triangle (R, X_L − X_C, Z) instead of rotating phasors; P85 regulation_tail on every TA.

### Protocol G — Challenge-First (S7 override)
Serves: S7
CPA entry: P
Entry condition: confident "add the ohms".
Success exit: revises after the 680 V vs 200 V contradiction.
Failure exit: Misconception Engine.
Key deltas: open with measured voltages adding to more than the supply; let it sit (P55).

## 6. Misconception Engine

### MC-IMPEDANCE-SUM: "Resistance and reactances add like resistors in series"
trigger_signal: student computes the impedance of a series LCR circuit as R + X_L + X_C (or R + X_L − X_C) by plain addition.
conflict_evidence [P28]: "Meters across R, L and C read 160 V, 320 V and 200 V, but the supply reads 200 V. If the voltages simply added, the supply would have to be 680 V. What is going on?"
bridge_text [P30]: "The three voltages do not peak at the same moment. V_L leads the current by 90°, V_C lags by 90°, V_R is in step. V_L and V_C partly cancel (320 − 200 = 120 V) and what is left is at right angles to V_R, so the supply is √(160² + 120²) = 200 V. Dividing by the current gives the same right triangle in ohms."
replacement_text [P31]: "Z = √(R² + (X_L − X_C)²); reactances subtract from each other and combine with R at right angles."
discrimination_pairs [P33]: ["resistors in series: R₁ + R₂", "series LCR: √(R² + (X_L − X_C)²) — 40, 80 and 50 Ω give 50 Ω, not 170 Ω"]
s6_path: skip P28; draw the right triangle with sides 40 and 30 and measure the hypotenuse.

### MC-RESONANCE-MAX-IMPEDANCE: "At resonance the impedance is largest and the current smallest"
trigger_signal: student expects the impedance of a series LCR circuit to peak at resonance (or the current to dip), associating "resonance" with "something becomes maximal" without asking which quantity.
conflict_evidence [P28]: "At resonance X_L = X_C. What is X_L − X_C then, and what does that leave in Z = √(R² + (X_L − X_C)²)?"
bridge_text [P30]: "X_L − X_C = 0, so Z = R — the SMALLEST it can ever be. The current, V/Z, is therefore the LARGEST. What is maximal at resonance is the current (and the energy swinging between L and C), which is why a radio picks out the station whose frequency matches."
replacement_text [P31]: "In a series LCR circuit at ω₀ = 1/√(LC): Z = R (minimum), I = V/R (maximum), current in phase with the supply."
discrimination_pairs [P33]: ["series LCR at resonance: Z minimum, I maximum", "off resonance either way: Z larger, I smaller"]
s6_path: skip P28; read the peak off the current–frequency graph.

## 7. Assessment Battery

| Probe | Item | Expected signal |
|---|---|---|
| P74 (classify) | "Below resonance: inductive or capacitive?" | CORRECT = capacitive (X_C > X_L; current leads) |
| P74 (classify) | "Series LCR at resonance: Z max or min?" | CORRECT = minimum, Z = R |
| P75 (boundary) | "Phase angle at ω₀" | CORRECT = zero |
| P76 (transfer) | "Lower-resistance tuner" | CORRECT = higher Q, narrower peak, better selectivity |
| P77 (generate) | "C for 0.2 H at 500 rad/s" | CORRECT = C = 1/(ω²L) = 20 μF |
| P78 (explain) | "Why not R + X_L + X_C" | CORRECT = phasors at 90°; V_L and V_C opposite |
| P79 (predict) | "Above resonance" | CORRECT = X_L > X_C; current lags |

## 8. Mastery Gate (P91 expansion — canonical order P77→P76→P75→P74→P78)
P77: "Choose C so that a 0.2 H inductor resonates at 500 rad/s." → expected: CORRECT
P76: "Why does a radio with a lower-resistance tuning circuit separate stations better?" → expected: CORRECT
P75: "At exactly ω₀, what is the phase angle between current and supply voltage?" → expected: CORRECT
P74: "Below resonance: inductive or capacitive?" → expected: CORRECT
P78: "Why is Z = √(R² + (X_L − X_C)²) and not R + X_L + X_C?" → expected: CORRECT

## 9. Retrieval Schedule (P89 expansion)
Interval 1 (1 day): "Write X_L, X_C and Z."
Interval 2 (3 days): "R = 30, X_L = 70, X_C = 30 Ω. Z?"
Interval 3 (7 days): "What is maximal at series resonance?"
Interval 4 (21 days): "How does R affect Q?"
Interval 5 (60 days): "How does a radio tune to one station?"

---
V-check status:
- V-1 all 10 KG fields present ✓ · V-2 objective has NOT-clause ✓ · V-3 DB 2–3 Qs, every branch → a state ✓ · V-4 every plausible state (S0,S1,S2,S3,S6) has a Protocol ✓ · V-5 every Protocol has success AND failure exit ✓ · V-6 every TA opens P01/P02 ✓ · V-7 every elicitation (P34/P35/P41) followed by P55 ✓ · V-8 no P08 without prior P06/P07 (TA-2) ✓ · V-9 Schema Repair entered only via P41 gate (TA-4, TA-5) ✓ · V-10 no P28 in S6 Protocol F ✓ · V-11 P91 terminal; P68 then P62 follow ✓ · V-12 no >3 consecutive C-category without E break ✓ · V-13 P54 before high-difficulty first-attempt (Protocol B TA-open) ✓ · V-14 assessment TA not first (TA-6/7) ✓ · V-15 Named Compounds (P90/P91) expanded ✓ · V-16 IC-1..20 pass ✓ · V-17 AIR invariants pass per TA ✓ · V-18 P90 (TA-6) before P91 (TA-7) ✓ · V-19 P91 has all 5 probes ✓ · V-20 P89 schedule authored with specific intervals ✓
status: READY
PACKAGE_READY
