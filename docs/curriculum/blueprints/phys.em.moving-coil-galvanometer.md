# Teaching Blueprint: phys.em.moving-coil-galvanometer

## 0. Concept Profile
concept_id: phys.em.moving-coil-galvanometer
name: Galvanometer, Ammeter and Voltmeter Conversion
domain: Electricity & Magnetism (Physics)
difficulty: proficient (3)
bloom: apply
prerequisites: [phys.em.magnetic-force, phys.mech.torque]
mastery_threshold: 0.75
estimated_hours: 2
cross_links: []
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: P (a coil between curved magnet poles, pointer and spring, before τ = NIAB; difficulty 3)
status: READY

## 1. Learning Objective

[Boundary statement]
A student who achieves mastery demonstrates:
1. Explains the moving-coil galvanometer: the current-carrying coil in a RADIAL magnetic field feels a torque τ = NIAB that does not depend on the coil's angle, balanced by a spring torque kφ, so the deflection φ = (NAB/k) I is proportional to the current — a linear scale. Current sensitivity is φ/I = NAB/k.
2. Converts a galvanometer (resistance G, full-scale current I_g) into an ammeter by a small SHUNT resistance in PARALLEL, S = I_g G / (I − I_g) — e.g. G = 50 Ω, I_g = 2 mA, range 1 A: S ≈ 0.1 Ω.
3. Converts it into a voltmeter by a large resistance in SERIES, R = V/I_g − G — e.g. range 10 V: R = 10/0.002 − 50 = 4950 Ω — and explains why an ammeter must have low total resistance (it goes in series and must not change the current) and a voltmeter high resistance (it goes in parallel and must not draw current).

A student who puts the shunt in series, or builds a voltmeter with a small resistance, has **NOT** achieved mastery — those errors mean a meter that either burns out or disturbs the very circuit it measures.

## 2. Student State Matrix

| State | Why here | Tell-tale behaviour | Protocol |
|---|---|---|---|
| S0 | Meters as black boxes | Cannot say what is inside an ammeter | Protocol A (Concrete) |
| S1 | Formulas without the reason | Computes S and R but cannot say why parallel/series | Protocol B (Counterexample-first) |
| S2-SHUNT-IN-SERIES | Shunt placement confused | Puts the shunt in series, or uses a large shunt | Misconception Engine → then Protocol C |
| S2-VOLTMETER-LOW-R | Meter resistance reasoning inverted | "A voltmeter should have low resistance so current flows through it" | Misconception Engine → then Protocol C |
| S3 | Partial — conversions fine, galvanometer principle not | Correct S and R, cannot explain the linear scale | Protocol C (Guided Questioning) |
| S6 | Anxiety on milliamps and ratios | Freezes at I_g = 2 mA | Protocol F (Low Pressure) |

## 3. Diagnostic Battery

DB-1 (prior-exposure check):
"Have you used an ammeter or voltmeter in a circuit — do you know how each is connected?"
  No → S0. Enter Protocol A (Concrete).
  Yes → DB-2.

DB-2 (representation / misconception test):
"A galvanometer reads full scale at 2 mA. To measure currents up to 1 A, how must the extra resistor be connected, and should it be large or small?"
  "A small resistor in parallel, so most of the current bypasses the coil" → S3. Enter Protocol C.
  "Small, in parallel" (no reason) → S1. Enter Protocol B.
  "In series" or "large" → SIGNAL:MISCONCEPTION:MC-SHUNT-IN-SERIES. Enter Misconception Engine.
  Pause → add S6 flag; Protocol F if anxious, otherwise Protocol A.

DB-3 (voltmeter check — overlays):
"Should a voltmeter have a high or a low resistance? Why?"
  "High — it is in parallel and must draw almost no current" → no flag.
  "Low — so current can flow through it" → add SIGNAL:MISCONCEPTION:MC-VOLTMETER-LOW-R (repair at TA-5).
  Confident and wrong on DB-2 → add S7 flag. Override to Protocol G.

## 4. Prerequisite Check

PD-1 (for `phys.em.magnetic-force` and `phys.mech.torque`):
"What force acts on a wire of length L carrying current I across a field B? And what is the torque of a force F at perpendicular distance d from an axis?"
  Cannot give F = BIL and τ = F d → flag PREREQ-GAP-FORCE-TORQUE.
  In-session minimum repair: one P07 (a rectangular coil in a field, forces on its two sides drawn as a couple) + one P34 ("two equal opposite forces, separation b — torque?") then resume. If either is absent, schedule the missing session (S4 route).

## 5. Protocol Library

### Protocol A — Concrete-First (primary)
Serves: S0
CPA entry: P
Entry condition: no picture of a meter's insides.
Success exit: explains the linear scale, and converts a galvanometer into both meters with correct placement and values (P91 all 5 probes CORRECT).
Failure exit: on SHUNT-IN-SERIES → Misconception Engine, resume at TA-4. On ratio anxiety → Protocol F.
Duration: ~55–65 min (may span 2 sessions; session_cap 7 TAs).

[TA-1: Inside a Galvanometer]
P01
→ P04[content: "Every analogue ammeter and voltmeter is the same small instrument inside — a coil, a magnet and a spring."]
→ P07[modality: a rectangular coil on a pivot between concave magnet poles around a soft-iron core; a pointer and a spiral spring]
→ P14[predict: "Current flows round the coil. What do the magnet's forces on the two long sides do to it?"] → P55
→ success_path[a couple — the coil turns] → P49 → P05[curiosity: "Why doesn't it spin all the way round?"]

[TA-2: Torque and the Radial Field]
P02
→ P13[think-aloud: "Each long side, length l, feels F = NBIl; the two forces are a distance b apart, so τ = NBIl·b = NIAB. The curved poles and iron core make the field RADIAL — the coil's plane always lies along the field — so the torque stays NIAB at every angle. The spring twists back with torque kφ."]
→ P08[notation: "NIAB = kφ  ⇒  φ = (NAB/k) I ; current sensitivity φ/I = NAB/k"]
// GR-3 satisfied: P07 and P13 preceded P08 (V-8 PASS)
→ P34[question: "Why is the scale of a moving-coil meter evenly spaced?"] → P55
→ success_path[φ ∝ I because the radial field keeps the torque NIAB] → P49

[TA-3: A Galvanometer Alone Is Delicate]
P02
→ P34[question: "Our galvanometer: G = 50 Ω, full scale at 2 mA. What is the largest voltage across it at full scale?"] → P55
→ success_path[0.1 V] → P49
→ P05[curiosity: "So how can it measure 1 A, or 10 V?"]

[TA-4: Making an Ammeter]
P02
→ P41[diagnostic: "To measure up to 1 A, where must the extra resistor go, and large or small?"] → P55
→ [if small, in parallel] → P49
→ [if series or large] → SIGNAL:MISCONCEPTION:MC-SHUNT-IN-SERIES → misconception_repair_chain[MC-SHUNT-IN-SERIES]
→ P13[think-aloud: "At full scale, 2 mA goes through the coil and 0.998 A through the shunt. They share the same voltage: I_g G = (I − I_g) S, so S = 0.002 × 50 / 0.998 ≈ 0.1 Ω."]

[TA-5: Making a Voltmeter]
P02
→ P41[diagnostic: "A voltmeter goes in parallel with the component it measures. Should its resistance be high or low?"] → P55
→ [if high] → P49
→ [if low] → SIGNAL:MISCONCEPTION:MC-VOLTMETER-LOW-R → misconception_repair_chain[MC-VOLTMETER-LOW-R]
→ P34[question: "Convert our galvanometer to read 0–10 V. Series resistance?"] → P55
→ success_path[R = 10/0.002 − 50 = 4950 Ω] → P49

[TA-6: Formative Assessment]
P02
→ P90_expansion:
    P79[predict: "An ammeter is mistakenly connected in parallel with a lamp. What happens?"] → P55
    → P49 → P51[check: tiny resistance shorts the supply — large current, meter may burn out]
    → P35[open: "Explain why an ideal ammeter has zero resistance and an ideal voltmeter infinite resistance."] → P55

[TA-7: Mastery Gate]
P02
→ P91_expansion:
    P77[generate: "Design a meter from a G = 100 Ω, 1 mA galvanometer that reads 0–5 A, and another that reads 0–20 V."] → P55 → CORRECT
    → P76[transfer: "Why does a voltmeter of resistance 1 kΩ give a wrong reading across a 10 kΩ resistor?"] → P55 → CORRECT
    → P75[boundary: "What happens to a galvanometer's deflection if the magnetic field is doubled?"] → P55 → CORRECT
    → P74[classify: "Shunt: series or parallel? Multiplier for a voltmeter: series or parallel?"] → P55 → CORRECT
    → P78[explain: "Why does the radial field give a linear scale?"] → P55 → CORRECT
→ P68 → P62[schedule: first retrieval in 1 day]

### Protocol B — Counterexample-First
Serves: S1
CPA entry: P
Entry condition: formulas without reasons.
Success exit: explains placement and size of S and R.
Failure exit: Misconception Engine, then Protocol C.
Key deltas from A: open with P02 → P41["Put a 0.1 Ω resistor in SERIES with the galvanometer and send 1 A. What current passes through the coil?"] → P54 (novel) → P55; then TA-4.

### Protocol C — Guided Questioning
Serves: S3, S2 (post-repair)
CPA entry: P
Entry condition: conversions fine, principle not (or reverse).
Success exit: both.
Failure exit: escalate to Protocol A TA-2.
Key deltas: enter at TA-2 or TA-4; run the gate.

### Protocol F — Low Pressure (S6)
Serves: S6
CPA entry: P
Entry condition: S6 flag confirmed.
Success exit: placement of shunt and multiplier stated with reasons, one value computed.
Failure exit: shorten, bank one success, reschedule.
Key deltas: NO P28 (V-10 / GR-5); use I_g = 1 mA and G = 100 Ω first for round numbers; P85 regulation_tail on every TA.

### Protocol G — Challenge-First (S7 override)
Serves: S7
CPA entry: P
Entry condition: confident wrong placement.
Success exit: revises after the series-shunt computation.
Failure exit: Misconception Engine.
Key deltas: open with Protocol B's series computation (1 A through the coil, 500 times full scale); let it sit (P55).

## 6. Misconception Engine

### MC-SHUNT-IN-SERIES: "The ammeter's extra resistor goes in series (or should be large)"
trigger_signal: student places the shunt in series with the coil, or chooses a large shunt resistance.
conflict_evidence [P28]: "In series, every bit of the 1 A would have to pass through the coil — and the coil reaches full scale at 2 mA. What happens to it?"
bridge_text [P30]: "It burns out. The shunt's job is to carry most of the current AROUND the coil, so it must be in parallel with it — and small, so that almost all the current prefers it. With S ≈ 0.1 Ω beside the 50 Ω coil, 0.998 A takes the shunt and only 2 mA goes through the coil."
replacement_text [P31]: "Ammeter = galvanometer + small shunt in parallel: S = I_g G / (I − I_g). The whole ammeter then has a very low resistance, as an ammeter in series must."
discrimination_pairs [P33]: ["ammeter: small resistor in parallel (bypass)", "voltmeter: large resistor in series (limit current)"]
s6_path: skip P28; draw the junction where 1 A splits into 2 mA and 0.998 A, and ask which path should be the easy one.

### MC-VOLTMETER-LOW-R: "A voltmeter should have low resistance so current can flow through it"
trigger_signal: student wants a small series resistance for a voltmeter, or says a voltmeter "needs current to read".
conflict_evidence [P28]: "A voltmeter is connected in parallel across a 10 kΩ resistor. If the voltmeter itself were only 100 Ω, which path would the current mostly take?"
bridge_text [P30]: "The voltmeter — it would short out the resistor and change the very voltage it was meant to measure. A voltmeter must draw as little current as possible, so it needs a HIGH resistance: the galvanometer plus a large series multiplier."
replacement_text [P31]: "Voltmeter = galvanometer + large resistance in series: R = V/I_g − G. Ideal voltmeter: infinite resistance; ideal ammeter: zero resistance."
discrimination_pairs [P33]: ["voltmeter in parallel, high R: barely disturbs the circuit", "ammeter in series, low R: barely disturbs the current"]
s6_path: skip P28; compare two parallel paths, 10 kΩ and 100 Ω, and ask where most current goes.

## 7. Assessment Battery

| Probe | Item | Expected signal |
|---|---|---|
| P74 (classify) | "Shunt: series or parallel? Multiplier: series or parallel?" | CORRECT = shunt parallel; multiplier series |
| P74 (classify) | "Ideal ammeter / voltmeter resistance?" | CORRECT = zero / infinite |
| P75 (boundary) | "Double B — deflection?" | CORRECT = doubles (φ ∝ NAB) |
| P76 (transfer) | "1 kΩ voltmeter across 10 kΩ" | CORRECT = it draws significant current and lowers the reading (loading) |
| P77 (generate) | "0–5 A and 0–20 V from 100 Ω, 1 mA" | CORRECT = S ≈ 0.02 Ω parallel; R = 19,900 Ω series |
| P78 (explain) | "Why a linear scale?" | CORRECT = radial field keeps τ = NIAB at all angles; balanced by kφ |
| P79 (predict) | "Ammeter in parallel with a lamp" | CORRECT = near short circuit; large current |

## 8. Mastery Gate (P91 expansion — canonical order P77→P76→P75→P74→P78)
P77: "Design a meter from a G = 100 Ω, 1 mA galvanometer that reads 0–5 A, and another that reads 0–20 V." → expected: CORRECT
P76: "Why does a voltmeter of resistance 1 kΩ give a wrong reading across a 10 kΩ resistor?" → expected: CORRECT
P75: "What happens to a galvanometer's deflection if the magnetic field is doubled?" → expected: CORRECT
P74: "Shunt: series or parallel? Multiplier for a voltmeter: series or parallel?" → expected: CORRECT
P78: "Why does the radial field give a linear scale?" → expected: CORRECT

## 9. Retrieval Schedule (P89 expansion)
Interval 1 (1 day): "Shunt for a 50 Ω, 2 mA galvanometer to read 0–1 A?"
Interval 2 (3 days): "Multiplier to read 0–10 V?"
Interval 3 (7 days): "Why is a galvanometer's scale linear?"
Interval 4 (21 days): "Why must a voltmeter have a high resistance?"
Interval 5 (60 days): "How would you increase a galvanometer's current sensitivity?"

---
V-check status:
- V-1 all 10 KG fields present ✓ · V-2 objective has NOT-clause ✓ · V-3 DB 2–3 Qs, every branch → a state ✓ · V-4 every plausible state (S0,S1,S2,S3,S6) has a Protocol ✓ · V-5 every Protocol has success AND failure exit ✓ · V-6 every TA opens P01/P02 ✓ · V-7 every elicitation (P34/P35/P41) followed by P55 ✓ · V-8 no P08 without prior P06/P07 (TA-2) ✓ · V-9 Schema Repair entered only via P41 gate (TA-4, TA-5) ✓ · V-10 no P28 in S6 Protocol F ✓ · V-11 P91 terminal; P68 then P62 follow ✓ · V-12 no >3 consecutive C-category without E break ✓ · V-13 P54 before high-difficulty first-attempt (Protocol B TA-open) ✓ · V-14 assessment TA not first (TA-6/7) ✓ · V-15 Named Compounds (P90/P91) expanded ✓ · V-16 IC-1..20 pass ✓ · V-17 AIR invariants pass per TA ✓ · V-18 P90 (TA-6) before P91 (TA-7) ✓ · V-19 P91 has all 5 probes ✓ · V-20 P89 schedule authored with specific intervals ✓
status: READY
PACKAGE_READY
