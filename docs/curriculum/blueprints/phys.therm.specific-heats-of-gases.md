# Teaching Blueprint: phys.therm.specific-heats-of-gases

## 0. Concept Profile
concept_id: phys.therm.specific-heats-of-gases
name: Cp, Cv, Mayer's Relation and Gamma
domain: Thermodynamics (Physics)
difficulty: proficient (3)
bloom: apply
prerequisites: [phys.therm.first-law]
mastery_threshold: 0.75
estimated_hours: 2
cross_links: []
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: P (heating a gas in a sealed rigid can and in a cylinder with a free piston, before any equation; difficulty 3)
status: READY

## 1. Learning Objective

[Boundary statement]
A student who achieves mastery demonstrates:
1. Defines the molar heat capacities Cv (heat per mole per kelvin at constant volume) and Cp (at constant pressure) and explains, from the first law Q = ΔU + W, why Cp > Cv: at constant volume no work is done and all the heat raises the internal energy; at constant pressure the gas also expands and does work pΔV = nRΔT, so more heat is needed for the same temperature rise — Mayer's relation, Cp − Cv = R.
2. Uses equipartition — each degree of freedom carries ½RT per mole, so Cv = (f/2)R: monatomic gases (f = 3) have Cv = 1.5R ≈ 12.5 J mol⁻¹ K⁻¹, Cp = 2.5R, γ = Cp/Cv = 5/3; diatomic gases near room temperature (f = 5) have Cv = 2.5R ≈ 20.8, Cp = 3.5R ≈ 29.1, γ = 7/5.
3. Applies it — heating 2 mol of nitrogen by 10 K needs about 416 J at constant volume but 582 J at constant pressure; the 166 J difference, nRΔT, is the work done pushing the piston back.

A student who thinks a gas has one heat capacity whatever the conditions, or that γ is the same for every gas, has **NOT** achieved mastery — those ideas break adiabatic processes, the speed of sound and engine analysis.

## 2. Student State Matrix

| State | Why here | Tell-tale behaviour | Protocol |
|---|---|---|---|
| S0 | Only "specific heat of a substance" known | Cannot say why conditions matter | Protocol A (Concrete) |
| S1 | Cp − Cv = R recited | Cannot say where the R comes from | Protocol B (Counterexample-first) |
| S2-CP-EQUALS-CV | One heat capacity per substance | "Heating a gas takes the same energy either way" | Misconception Engine → then Protocol C |
| S2-GAMMA-SAME-ALL-GASES | γ memorised as 1.4 | "γ is 1.4 for every gas" | Misconception Engine → then Protocol C |
| S3 | Partial — Mayer fine, equipartition not | Cannot predict γ for helium | Protocol C (Guided Questioning) |
| S6 | Anxiety on symbols | Avoids subscripts and fractions | Protocol F (Low Pressure) |

## 3. Diagnostic Battery

DB-1 (prior-exposure check):
"Does it take the same heat to warm a gas by 10 K in a sealed rigid can as in a cylinder with a freely moving piston?"
  "The same" or no idea → S0. Enter Protocol A (Concrete).
  "More with the piston — the gas also does work pushing it" → DB-2.

DB-2 (representation / misconception test):
"For an ideal gas, Cp − Cv = ? and why?"
  "R — at constant pressure the gas also does work pΔV = nRΔT" → S3. Enter Protocol C.
  "R" (no reason) → S1. Enter Protocol B.
  "Zero — a gas has one heat capacity" → SIGNAL:MISCONCEPTION:MC-CP-EQUALS-CV. Enter Misconception Engine.
  Pause → add S6 flag; Protocol F if anxious, otherwise Protocol A.

DB-3 (γ check — overlays):
"Is γ = Cp/Cv the same for helium and for nitrogen?"
  "No — 5/3 for monatomic helium, 7/5 for diatomic nitrogen" → no flag.
  "Yes, 1.4 for all gases" → add SIGNAL:MISCONCEPTION:MC-GAMMA-SAME-ALL-GASES (repair at TA-5).
  Confident and wrong on DB-2 → add S7 flag. Override to Protocol G.

## 4. Prerequisite Check

PD-1 (for `phys.therm.first-law`):
"State the first law. A gas absorbs 500 J and does 200 J of work. ΔU?"
  Cannot say "Q = ΔU + W; ΔU = 300 J" → flag PREREQ-GAP-FIRST-LAW.
  In-session minimum repair: one P06 (energy-flow diagram for a heated piston) + one P34 ("Q = 300 J, W = 100 J: ΔU?") then resume. If absent, schedule the missing session (S4 route).

## 5. Protocol Library

### Protocol A — Concrete-First (primary)
Serves: S0
CPA entry: P
Entry condition: only single heat capacities known.
Success exit: explains Cp > Cv, derives Mayer's relation, predicts γ for monatomic and diatomic gases (P91 all 5 probes CORRECT).
Failure exit: on CP-EQUALS-CV → Misconception Engine, resume at TA-3. On anxiety → Protocol F.
Duration: ~55–65 min (may span 2 sessions; session_cap 7 TAs).

[TA-1: The Can and the Piston]
P01
→ P04[content: "Heat a gas in a sealed can, and heat the same gas in a cylinder whose piston can rise. Same temperature rise each time."]
→ P06[content: two side-by-side diagrams: rigid can (Q → ΔU only) and piston cylinder (Q → ΔU + work)]
→ P14[predict: "Which needs more heat?"] → P55
→ success_path → P49 → P05[curiosity: "How much more, exactly?"]

[TA-2: Cv and Cp]
P02
→ P13[think-aloud: "Cv: heat per mole per kelvin at constant volume. Nothing moves, W = 0, so all the heat raises U: Q = nCvΔT = ΔU. Cp: heat per mole per kelvin at constant pressure. The gas expands, doing W = pΔV = nRΔT. So nCpΔT = nCvΔT + nRΔT."]
→ P08[notation: "Cp − Cv = R  (Mayer);  γ = Cp/Cv"]
// GR-3 satisfied: P06 and P13 preceded P08 (V-8 PASS)
→ P34[question: "Cv = 20.8 J/(mol·K). Cp?"] → P55
→ success_path[≈ 29.1 J/(mol·K)] → P49

[TA-3: One Gas, Two Heat Capacities]
P02
→ P41[diagnostic: "Same heat to warm a gas by 10 K at constant volume and at constant pressure?"] → P55
→ [if more at constant pressure] → P49
→ [if same] → SIGNAL:MISCONCEPTION:MC-CP-EQUALS-CV → misconception_repair_chain[MC-CP-EQUALS-CV]
→ P34[question: "2 mol of N₂ (Cv = 2.5R) warmed by 10 K: heat at constant V? At constant p? Difference?"] → P55
→ success_path[≈ 416 J; ≈ 582 J; ≈ 166 J = nRΔT, the work done] → P49
→ failure_path → P50 → P51[diagnose: which C] → P52[narrow: "Constant V → Cv; constant p → Cp = Cv + R"] → re-elicit P34 → P55

[TA-4: Where Cv Comes From]
P02
→ P13[think-aloud: "Kinetic theory: each degree of freedom of a molecule holds ½kT on average — ½RT per mole. A monatomic atom can only move in 3 directions: U = (3/2)RT, so Cv = 1.5R. A diatomic molecule can also rotate about 2 axes: f = 5, Cv = 2.5R."]
→ P34[question: "Cv, Cp and γ for helium?"] → P55
→ success_path[1.5R, 2.5R, 5/3] → P49

[TA-5: γ Depends on the Gas]
P02
→ P41[diagnostic: "Same γ for helium and nitrogen?"] → P55
→ [if different] → P49
→ [if same] → SIGNAL:MISCONCEPTION:MC-GAMMA-SAME-ALL-GASES → misconception_repair_chain[MC-GAMMA-SAME-ALL-GASES]
→ P13[think-aloud: "γ = 1 + 2/f: more ways to store energy, smaller γ. γ sets how strongly a gas heats when compressed suddenly, and the speed of sound."]

[TA-6: Formative Assessment]
P02
→ P90_expansion:
    P79[predict: "A gas has γ = 1.67. Monatomic or diatomic?"] → P55
    → P49 → P51[check: monatomic, f = 3]
    → P35[open: "Explain why Cp is larger than Cv using the first law."] → P55

[TA-7: Mastery Gate]
P02
→ P91_expansion:
    P77[generate: "Design a measurement that would show a gas's Cp and Cv are different."] → P55 → CORRECT
    → P76[transfer: "Why does sound travel faster in helium than in nitrogen at the same temperature, partly?"] → P55 → CORRECT
    → P75[boundary: "For a solid or liquid, why is Cp ≈ Cv?"] → P55 → CORRECT
    → P74[classify: "γ = 1.4: monatomic or diatomic?"] → P55 → CORRECT
    → P78[explain: "Where does the R in Cp − Cv = R come from?"] → P55 → CORRECT
→ P68 → P62[schedule: first retrieval in 1 day]

### Protocol B — Counterexample-First
Serves: S1
CPA entry: P
Entry condition: Mayer recited without reason.
Success exit: derives R from pΔV = nRΔT.
Failure exit: Misconception Engine, then Protocol C.
Key deltas from A: open with P02 → P41["At constant pressure the gas pushes the piston up. Who paid for that work?"] → P54 (novel) → P55; then TA-3 and TA-4.

### Protocol C — Guided Questioning
Serves: S3, S2 (post-repair)
CPA entry: P
Entry condition: Mayer fine; equipartition not.
Success exit: predicts γ from f.
Failure exit: escalate to Protocol A TA-2.
Key deltas: enter at TA-4; run TA-5 and the gate.

### Protocol F — Low Pressure (S6)
Serves: S6
CPA entry: P
Entry condition: S6 flag confirmed.
Success exit: can-vs-piston explanation stated calmly.
Failure exit: shorten, bank one success, reschedule.
Key deltas: NO P28 (V-10 / GR-5); energy-flow diagrams before symbols; P85 regulation_tail on every TA.

### Protocol G — Challenge-First (S7 override)
Serves: S7
CPA entry: P
Entry condition: confident "one heat capacity".
Success exit: revises after the piston-work contrast.
Failure exit: Misconception Engine.
Key deltas: open with the piston rising and lifting a weight — the work has to come from somewhere; let it sit (P55).

## 6. Misconception Engine

### MC-CP-EQUALS-CV: "A gas has a single heat capacity whatever the conditions"
trigger_signal: student treats the heat needed to warm a gas as independent of whether volume or pressure is held fixed, carrying over the single 'specific heat' of solids and liquids.
conflict_evidence [P28]: "Heated at constant pressure, the gas pushes a piston up and lifts a weight. That takes energy. Heated in a sealed can, nothing moves. If both get the same heat, where does the energy to lift the weight come from?"
bridge_text [P30]: "It must come from the heat, so at constant pressure more heat is needed for the same temperature rise: the internal energy still rises by nCvΔT (it depends only on temperature), and on top of that the gas does work pΔV = nRΔT. Hence Cp = Cv + R. For solids and liquids the expansion is tiny, so the two are nearly equal — which is why the difference is easy to overlook."
replacement_text [P31]: "Gases have two molar heat capacities: Cv (no work) and Cp = Cv + R (with expansion work)."
discrimination_pairs [P33]: ["2 mol N₂, +10 K at constant V: ≈ 416 J", "the same at constant p: ≈ 582 J — the extra 166 J is work"]
s6_path: skip P28; show the two energy-flow diagrams side by side.

### MC-GAMMA-SAME-ALL-GASES: "γ is the same (1.4) for every gas"
trigger_signal: student uses γ = 1.4 for any gas, including monatomic gases, having memorised the value for air.
conflict_evidence [P28]: "Helium atoms can't rotate in any way that stores energy; nitrogen molecules can tumble about two axes. Which gas needs more heat per kelvin at constant volume? So can their Cp/Cv be equal?"
bridge_text [P30]: "Nitrogen stores extra energy in rotation, so its Cv is larger: 2.5R against helium's 1.5R. Both Cp values are Cv + R, so γ = (Cv + R)/Cv = 1 + R/Cv differs: 5/3 ≈ 1.67 for helium, 7/5 = 1.4 for nitrogen and air. 1.4 is the value for diatomic gases, not a universal constant."
replacement_text [P31]: "γ = 1 + 2/f: 5/3 for monatomic gases (f = 3), 7/5 for diatomic gases near room temperature (f = 5)."
discrimination_pairs [P33]: ["helium, argon: γ = 1.67", "nitrogen, oxygen, air: γ = 1.40"]
s6_path: skip P28; a two-row table of f, Cv, Cp, γ.

## 7. Assessment Battery

| Probe | Item | Expected signal |
|---|---|---|
| P74 (classify) | "γ = 1.4" | CORRECT = diatomic |
| P74 (classify) | "Which needs more heat for +10 K: constant p or constant V?" | CORRECT = constant p |
| P75 (boundary) | "Cp ≈ Cv for solids" | CORRECT = expansion work is negligible |
| P76 (transfer) | "Sound in helium" | CORRECT = v ∝ √(γRT/M); larger γ (and much smaller M) |
| P77 (generate) | "Show Cp ≠ Cv" | CORRECT = heat equal amounts of gas in a sealed can and a free-piston cylinder; compare temperature rises |
| P78 (explain) | "Origin of R" | CORRECT = work pΔV = nRΔT at constant pressure |
| P79 (predict) | "γ = 1.67" | CORRECT = monatomic |

## 8. Mastery Gate (P91 expansion — canonical order P77→P76→P75→P74→P78)
P77: "Design a measurement that would show a gas's Cp and Cv are different." → expected: CORRECT
P76: "Why does sound travel faster in helium than in nitrogen at the same temperature, partly?" → expected: CORRECT
P75: "For a solid or liquid, why is Cp ≈ Cv?" → expected: CORRECT
P74: "γ = 1.4: monatomic or diatomic?" → expected: CORRECT
P78: "Where does the R in Cp − Cv = R come from?" → expected: CORRECT

## 9. Retrieval Schedule (P89 expansion)
Interval 1 (1 day): "State Mayer's relation."
Interval 2 (3 days): "Cv, Cp, γ for argon?"
Interval 3 (7 days): "Heat to warm 1 mol O₂ by 20 K at constant p?"
Interval 4 (21 days): "Why is Cp > Cv?"
Interval 5 (60 days): "What is γ for air, and why?"

---
V-check status:
- V-1 all 10 KG fields present ✓ · V-2 objective has NOT-clause ✓ · V-3 DB 2–3 Qs, every branch → a state ✓ · V-4 every plausible state (S0,S1,S2,S3,S6) has a Protocol ✓ · V-5 every Protocol has success AND failure exit ✓ · V-6 every TA opens P01/P02 ✓ · V-7 every elicitation (P34/P35/P41) followed by P55 ✓ · V-8 no P08 without prior P06/P07 (TA-2) ✓ · V-9 Schema Repair entered only via P41 gate (TA-3, TA-5) ✓ · V-10 no P28 in S6 Protocol F ✓ · V-11 P91 terminal; P68 then P62 follow ✓ · V-12 no >3 consecutive C-category without E break ✓ · V-13 P54 before high-difficulty first-attempt (Protocol B TA-open) ✓ · V-14 assessment TA not first (TA-6/7) ✓ · V-15 Named Compounds (P90/P91) expanded ✓ · V-16 IC-1..20 pass ✓ · V-17 AIR invariants pass per TA ✓ · V-18 P90 (TA-6) before P91 (TA-7) ✓ · V-19 P91 has all 5 probes ✓ · V-20 P89 schedule authored with specific intervals ✓
status: READY
PACKAGE_READY
