# Teaching Blueprint: phys.mod.special-diodes

## 0. Concept Profile
concept_id: phys.mod.special-diodes
name: Special-Purpose Diodes: Zener, LED, Photodiode, Solar Cell
domain: Modern Physics (Physics)
difficulty: expert (5)
bloom: apply
prerequisites: [phys.mod.diode-rectification, phys.em.ohms-law]
mastery_threshold: 0.75
estimated_hours: 3
cross_links: []
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: P (a red, a green and a blue LED glowing through clear cases beside a small solar panel driving a fan, before any band diagram; difficulty 5)
status: READY

## 1. Learning Objective

[Boundary statement]
A student who achieves mastery demonstrates:
1. Explains the Zener diode: a heavily doped junction made to break down in reverse at a sharp, fixed voltage V_Z without damage, so that with a series resistor it holds a load at V_Z — and computes the currents: a 12 V supply, 100 Ω series resistor, 6.2 V Zener and 620 Ω load give 58 mA through the resistor, 10 mA through the load and 48 mA through the Zener.
2. Explains the light-emitting diode: forward-biased, electrons drop across the band gap and give out photons of energy close to E_g, so λ ≈ 1240/E_g(eV) nm — 1.9 eV gives about 653 nm (red), 2.7 eV about 459 nm (blue) — the colour set by the semiconductor, not the case; computes a current-limiting resistor (5 V supply, 2.0 V red LED, 20 mA → 150 Ω).
3. Distinguishes the photodiode (reverse-biased; light with photon energy above E_g makes electron–hole pairs and a reverse current proportional to the light; silicon, E_g = 1.12 eV, stops responding beyond about 1107 nm) from the solar cell (no bias; the junction field separates light-made pairs, giving about 0.6 V for silicon and delivering power — 20 % of 1000 W/m² is 200 W/m²).

A student who thinks reverse breakdown always destroys a diode, or that an LED's colour comes from its tinted plastic, has **NOT** achieved mastery — those ideas miss what makes these diodes useful.

## 2. Student State Matrix

| State | Why here | Tell-tale behaviour | Protocol |
|---|---|---|---|
| S0 | Diodes only as one-way valves | Cannot name a use beyond rectification | Protocol A (Concrete) |
| S1 | Names recited | Cannot say what sets V_Z or an LED's colour | Protocol B (Counterexample-first) |
| S2-ZENER-BREAKDOWN-DESTROYS | Rectifier picture | "Reverse breakdown burns out a diode" | Misconception Engine → then Protocol C |
| S2-LED-COLOUR-FROM-CASE | Filter picture | "The plastic makes it red" | Misconception Engine → then Protocol C |
| S3 | Partial — ideas fine | Cannot compute regulator currents or λ | Protocol C (Guided Questioning) |
| S6 | Anxiety on band diagrams | Avoids eV | Protocol F (Low Pressure) |

## 3. Diagnostic Battery

DB-1 (prior-exposure check):
"Apart from turning AC into DC, what else can diodes do?"
  No idea → DB-2 to probe further.
  "Make light, sense light, regulate voltage, make electricity from sunlight" → DB-2.

DB-2 (representation / misconception test):
"Can a diode be used deliberately in reverse breakdown?"
  "Yes — a Zener diode is designed to break down at a fixed voltage, and a series resistor limits the current, so it regulates voltage" → S3. Enter Protocol C.
  "Yes" (no reason) → S1. Enter Protocol B.
  "No — reverse breakdown always destroys a diode" → SIGNAL:MISCONCEPTION:MC-ZENER-BREAKDOWN-DESTROYS. Enter Misconception Engine.
  Pause → add S6 flag; Protocol F if anxious, otherwise Protocol A.

DB-3 (LED check — overlays):
"Take the red plastic case off a red LED. What colour is its light?"
  "Still red — the semiconductor's band gap sets the colour" → no flag.
  "White, the case colours it" → add SIGNAL:MISCONCEPTION:MC-LED-COLOUR-FROM-CASE (repair at TA-4).
  Confident and wrong on DB-2 → add S7 flag. Override to Protocol G.

## 4. Prerequisite Check

PD-1 (for `phys.mod.diode-rectification`):
"In which bias does a diode conduct readily, and what happens in reverse bias?"
  Cannot say "forward conducts; reverse blocks until breakdown" → flag PREREQ-GAP-DIODE.
  In-session minimum repair: one P06 (the diode I–V curve) + one P34 ("which bias conducts?") then resume.

PD-2 (for `phys.em.ohms-law`):
"5.8 V across a 100 Ω resistor: current?"
  Cannot say "58 mA" → flag PREREQ-GAP-OHM. Repair: one P34 on I = V/R.

## 5. Protocol Library

### Protocol A — Concrete-First (primary)
Serves: S0
CPA entry: P
Entry condition: diodes only as one-way valves.
Success exit: explains all four devices and computes the regulator and λ (P91 all 5 probes CORRECT).
Failure exit: on ZENER-BREAKDOWN-DESTROYS → Misconception Engine, resume at TA-3. On anxiety → Protocol F.
Duration: ~55–65 min (may span 2 sessions; session_cap 7 TAs).

[TA-1: Four Jobs]
P01
→ P04[content: "Three clear-cased LEDs glow red, green and blue; a small solar panel spins a fan; a phone charger holds its output steady while the mains varies."]
→ P06[content: the diode I–V curve with a forward knee near 0.7 V and a sharp reverse breakdown at −6.2 V]
→ P14[predict: "What could a sharp breakdown be good for?"] → P55
→ success_path → P49 → P05[curiosity: "How does one junction do four jobs?"]

[TA-2: The Zener Regulator]
P02
→ P13[think-aloud: "A Zener is heavily doped, so it breaks down in reverse at a sharp V_Z = 6.2 V. Put it across the load with a 100 Ω resistor from a 12 V supply. The resistor drops 12 − 6.2 = 5.8 V, so 58 mA flows. The 620 Ω load takes 6.2/620 = 10 mA; the Zener takes the other 48 mA. If the supply rises, the Zener simply takes more current — the load stays at 6.2 V."]
→ P08[notation: "I_R = (V_s − V_Z)/R · I_L = V_Z/R_L · I_Z = I_R − I_L"]
// GR-3 satisfied: P06 and P13 preceded P08 (V-8 PASS)
→ P34[question: "Supply 14 V, same parts: Zener current?"] → P55
→ success_path[(14 − 6.2)/100 = 78 mA; 78 − 10 = 68 mA] → P49

[TA-3: Breakdown Need Not Destroy]
P02
→ P41[diagnostic: "Can a diode be used in reverse breakdown?"] → P55
→ [if yes] → P49
→ [if no] → SIGNAL:MISCONCEPTION:MC-ZENER-BREAKDOWN-DESTROYS → misconception_repair_chain[MC-ZENER-BREAKDOWN-DESTROYS]

[TA-4: LEDs and Colour]
P02
→ P41[diagnostic: "Red LED without its red case: colour?"] → P55
→ [if red] → P49
→ [if white] → SIGNAL:MISCONCEPTION:MC-LED-COLOUR-FROM-CASE → misconception_repair_chain[MC-LED-COLOUR-FROM-CASE]
→ P13[think-aloud: "Forward bias pushes electrons and holes together; an electron falling across the gap gives a photon of energy ≈ E_g. λ = 1240/E_g nm: 1.9 eV → 653 nm red, 2.7 eV → 459 nm blue. Silicon's gap is indirect, so it makes heat, not light."]

[TA-5: Light In — Photodiode and Solar Cell]
P02
→ P34[question: "A photodiode in reverse bias: what does light do to the current? A solar cell has no battery: where does its power come from?"] → P55
→ success_path[photons above E_g make pairs → reverse current ∝ light; the junction field separates pairs → ≈ 0.6 V, delivers power] → P49
→ failure_path → P50 → P51[diagnose: which device needs bias] → P52[narrow: "the photodiode is a light meter; the solar cell is a generator"] → re-elicit P34 → P55

[TA-6: Formative Assessment]
P02
→ P90_expansion:
    P79[predict: "Silicon photodiode (E_g = 1.12 eV): does it respond to 1300 nm light?"] → P55
    → P49 → P51[check: 1240/1.12 ≈ 1107 nm cutoff — 1300 nm photons have too little energy]
    → P35[open: "Explain how a Zener regulator keeps the load voltage steady."] → P55

[TA-7: Mastery Gate]
P02
→ P91_expansion:
    P77[generate: "Design a regulator giving 6.2 V to a 10 mA load from 12 V."] → P55 → CORRECT
    → P76[transfer: "Which band gap gives green light at about 540 nm?"] → P55 → CORRECT
    → P75[boundary: "Supply drops to 6.0 V with a 6.2 V Zener: regulation?"] → P55 → CORRECT
    → P74[classify: "LED, photodiode, solar cell, Zener — which bias does each use?"] → P55 → CORRECT
    → P78[explain: "Why does a solar cell need no battery?"] → P55 → CORRECT
→ P68 → P62[schedule: first retrieval in 1 day]

### Protocol B — Counterexample-First
Serves: S1
CPA entry: P
Entry condition: names without mechanism.
Success exit: explains what sets V_Z and the LED colour.
Failure exit: Misconception Engine, then Protocol C.
Key deltas from A: open with P02 → P41["A rectifier diode dies in reverse breakdown. Why does a Zener survive it, and what limits its current?"] → P54 (novel) → P55; then TA-2 and TA-4.

### Protocol C — Guided Questioning
Serves: S3, S2 (post-repair)
CPA entry: P
Entry condition: ideas fine; calculations not.
Success exit: regulator currents and λ computed.
Failure exit: escalate to Protocol A TA-2.
Key deltas: enter at TA-2's calculation; run TA-5 and the gate.

### Protocol F — Low Pressure (S6)
Serves: S6
CPA entry: P
Entry condition: S6 flag confirmed.
Success exit: four devices matched to their jobs calmly.
Failure exit: shorten, bank one success, reschedule.
Key deltas: NO P28 (V-10 / GR-5); the devices as "light out, light in, voltage holder" before bands; P85 regulation_tail on every TA.

### Protocol G — Challenge-First (S7 override)
Serves: S7
CPA entry: P
Entry condition: confident "breakdown always destroys".
Success exit: revises after the regulator calculation.
Failure exit: Misconception Engine.
Key deltas: open with a phone charger's steady output and the Zener in it; let it sit (P55).

## 6. Misconception Engine

### MC-ZENER-BREAKDOWN-DESTROYS: "Reverse breakdown always destroys a diode, so no diode can work there"
trigger_signal: student says a diode in reverse breakdown is always damaged, or cannot explain how a Zener operates in reverse.
conflict_evidence [P28]: "Voltage regulators in chargers run Zener diodes in reverse breakdown for years. If breakdown always destroyed a diode, how could they?"
bridge_text [P30]: "What destroys a diode is not breakdown itself but too much current and heat. A Zener is heavily doped so that it breaks down sharply at a fixed V_Z, and a series resistor limits the current — 48 mA in the 12 V example, well within its rating. In breakdown the voltage hardly changes however much the current changes, which is exactly what a regulator needs."
replacement_text [P31]: "A Zener diode is designed to work in reverse breakdown at a fixed voltage; a series resistor limits its current so it is not damaged."
discrimination_pairs [P33]: ["rectifier diode: breakdown avoided — current unlimited, overheats", "Zener: breakdown used — current limited by a resistor, voltage held at V_Z"]
s6_path: skip P28; show the regulator holding 6.2 V as the supply moves from 10 V to 14 V.

### MC-LED-COLOUR-FROM-CASE: "An LED's colour comes from its coloured plastic case"
trigger_signal: student attributes LED colour to the case or a filter, or expects any LED to give white light without it.
conflict_evidence [P28]: "Clear-cased LEDs glow red, green or blue. If the case made the colour, what colour would a clear one be?"
bridge_text [P30]: "The colour comes from the semiconductor. An electron crossing the band gap gives a photon of energy about E_g, so λ = 1240/E_g nm: 1.9 eV gives about 653 nm, red; 2.7 eV gives about 459 nm, blue. A tinted case only helps you see which LED it is; changing the material changes the colour."
replacement_text [P31]: "An LED's colour is set by its band gap (λ ≈ 1240/E_g nm), not by its case."
discrimination_pairs [P33]: ["band gap 1.9 eV: red, about 653 nm", "band gap 2.7 eV: blue, about 459 nm"]
s6_path: skip P28; line up three clear LEDs and name each colour.

## 7. Assessment Battery

| Probe | Item | Expected signal |
|---|---|---|
| P74 (classify) | "Bias of each device" | CORRECT = Zener reverse, LED forward, photodiode reverse, solar cell none |
| P74 (classify) | "Zener current at 12 V" | CORRECT = 48 mA |
| P75 (boundary) | "Supply below V_Z" | CORRECT = no regulation; Zener off |
| P76 (transfer) | "Green at 540 nm" | CORRECT = about 2.3 eV |
| P77 (generate) | "Design a regulator" | CORRECT = Zener 6.2 V across load, series resistor ~100 Ω |
| P78 (explain) | "Solar cell, no battery" | CORRECT = junction field separates light-made pairs |
| P79 (predict) | "Si photodiode at 1300 nm" | CORRECT = no — beyond the 1107 nm cutoff |

## 8. Mastery Gate (P91 expansion — canonical order P77→P76→P75→P74→P78)
P77: "Design a regulator giving 6.2 V to a 10 mA load from 12 V." → expected: CORRECT
P76: "Which band gap gives green light at about 540 nm?" → expected: CORRECT
P75: "Supply drops to 6.0 V with a 6.2 V Zener: regulation?" → expected: CORRECT
P74: "LED, photodiode, solar cell, Zener — which bias does each use?" → expected: CORRECT
P78: "Why does a solar cell need no battery?" → expected: CORRECT

## 9. Retrieval Schedule (P89 expansion)
Interval 1 (1 day): "What sets an LED's colour?"
Interval 2 (3 days): "Zener current: 12 V, 100 Ω, 6.2 V, 10 mA load?"
Interval 3 (7 days): "Photodiode vs solar cell?"
Interval 4 (21 days): "Silicon's cutoff wavelength?"
Interval 5 (60 days): "Why doesn't breakdown destroy a Zener?"

---
V-check status:
- V-1 all 10 KG fields present ✓ · V-2 objective has NOT-clause ✓ · V-3 DB 2–3 Qs, every branch → a state ✓ · V-4 every plausible state (S0,S1,S2,S3,S6) has a Protocol ✓ · V-5 every Protocol has success AND failure exit ✓ · V-6 every TA opens P01/P02 ✓ · V-7 every elicitation (P34/P35/P41) followed by P55 ✓ · V-8 no P08 without prior P06/P07 (TA-2) ✓ · V-9 Schema Repair entered only via P41 gate (TA-3, TA-4) ✓ · V-10 no P28 in S6 Protocol F ✓ · V-11 P91 terminal; P68 then P62 follow ✓ · V-12 no >3 consecutive C-category without E break ✓ · V-13 P54 before high-difficulty first-attempt (Protocol B TA-open) ✓ · V-14 assessment TA not first (TA-6/7) ✓ · V-15 Named Compounds (P90/P91) expanded ✓ · V-16 IC-1..20 pass ✓ · V-17 AIR invariants pass per TA ✓ · V-18 P90 (TA-6) before P91 (TA-7) ✓ · V-19 P91 has all 5 probes ✓ · V-20 P89 schedule authored with specific intervals ✓
status: READY
PACKAGE_READY
