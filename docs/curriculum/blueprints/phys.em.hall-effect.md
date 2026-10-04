# Teaching Blueprint: phys.em.hall-effect

## 0. Concept Profile
concept_id: phys.em.hall-effect
name: The Hall Effect
domain: Electricity & Magnetism (Physics)
difficulty: advanced (4)
bloom: apply
prerequisites: [phys.em.magnetic-force]
mastery_threshold: 0.75
estimated_hours: 2
cross_links: []
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: P (a phone's compass and a car's wheel-speed sensor, both Hall sensors, before any formula; difficulty 4)
status: READY

## 1. Learning Objective

[Boundary statement]
A student who achieves mastery demonstrates:
1. Explains the Hall effect: in a flat conductor carrying current across a perpendicular magnetic field, the magnetic force qv × B pushes the moving carriers towards one edge; charge piles up there and on the opposite edge until the resulting transverse electric field balances the magnetic force (qE = qv_dB), leaving a steady Hall voltage across the strip.
2. Derives and applies V_H = IB/(nqt), where n is the carrier density and t the strip's thickness: a copper strip (n = 8.5 × 10²⁸ m⁻³) 0.1 mm thick carrying 5 A in 1.0 T gives only about 3.7 μV, while a semiconductor (n ≈ 10²² m⁻³) carrying 10 mA in 0.5 T gives about 31 mV — FEWER carriers give a LARGER Hall voltage, because each must drift faster to carry the same current.
3. Explains what the Hall voltage reveals and how it is used: its SIGN shows the sign of the charge carriers (electrons in n-type material and most metals, positive holes in p-type material), its size gives the carrier density, and Hall probes measure magnetic fields (V_H ∝ B) in phones, wheel-speed sensors and laboratory magnetometers.

A student who thinks the Hall voltage's sign is the same whatever the carriers, or that conductors with more carriers give larger Hall voltages, has **NOT** achieved mastery — those ideas defeat the effect's main uses.

## 2. Student State Matrix

| State | Why here | Tell-tale behaviour | Protocol |
|---|---|---|---|
| S0 | Force on charges known only for free particles | Cannot say what happens to carriers in a wire in a field | Protocol A (Concrete) |
| S1 | Formula recited | Writes V_H = IB/(nqt) but cannot predict trends | Protocol B (Counterexample-first) |
| S2-HALL-SIGN-INDEPENDENT-OF-CARRIER | Current direction only | "The Hall voltage has the same sign for any material" | Misconception Engine → then Protocol C |
| S2-MORE-CARRIERS-BIGGER-HALL | More charge, more effect | "Copper gives a bigger Hall voltage — it has more electrons" | Misconception Engine → then Protocol C |
| S3 | Partial — mechanism fine | Cannot use the sign to identify carriers | Protocol C (Guided Questioning) |
| S6 | Anxiety on vector cross products | Avoids direction rules | Protocol F (Low Pressure) |

## 3. Diagnostic Battery

DB-1 (prior-exposure check):
"A current flows along a flat strip in a magnetic field perpendicular to the strip. What does the magnetic force do to the moving charges?"
  No idea → S0. Enter Protocol A (Concrete).
  "Pushes them to one side of the strip" → DB-2.

DB-2 (representation / misconception test):
"The same current and field are applied to a copper strip and to an equally thick semiconductor strip. Which shows the larger Hall voltage?"
  "The semiconductor — fewer carriers must drift faster, so the force and the voltage are bigger" → S3. Enter Protocol C.
  "The semiconductor" (no reason) → S1. Enter Protocol B.
  "Copper — more carriers, more charge piles up" → SIGNAL:MISCONCEPTION:MC-MORE-CARRIERS-BIGGER-HALL. Enter Misconception Engine.
  Pause → add S6 flag; Protocol F if anxious, otherwise Protocol A.

DB-3 (sign check — overlays):
"An n-type and a p-type sample carry current in the same direction in the same field. Do their Hall voltages have the same sign?"
  "No — opposite, because the carriers have opposite charge" → no flag.
  "Yes — same current, same field" → add SIGNAL:MISCONCEPTION:MC-HALL-SIGN-INDEPENDENT-OF-CARRIER (repair at TA-4).
  Confident and wrong on DB-2 → add S7 flag. Override to Protocol G.

## 4. Prerequisite Check

PD-1 (for `phys.em.magnetic-force`):
"Write the magnetic force on a charge q moving at v through B. Which way does it act?"
  Cannot say "F = qv × B, perpendicular to both v and B" → flag PREREQ-GAP-LORENTZ.
  In-session minimum repair: one P06 (a positive charge moving across a field with the force arrow) + one P34 ("reverse the charge's sign: force?") then resume. If absent, schedule the missing session (S4 route).

## 5. Protocol Library

### Protocol A — Concrete-First (primary)
Serves: S0
CPA entry: P
Entry condition: no picture of carriers in a field.
Success exit: explains the balance, applies V_H = IB/(nqt), uses the sign to identify carriers (P91 all 5 probes CORRECT).
Failure exit: on MORE-CARRIERS-BIGGER-HALL → Misconception Engine, resume at TA-4. On anxiety → Protocol F.
Duration: ~55–65 min (may span 2 sessions; session_cap 7 TAs).

[TA-1: Sensors Everywhere]
P01
→ P04[content: "Your phone's compass and a car's wheel-speed sensor measure magnetic fields with a slab of semiconductor and a voltmeter. The effect is the Hall effect."]
→ P06[content: a flat strip, current along it, B through it, carriers drifting and being pushed to one edge]
→ P14[predict: "What happens to the edge where the carriers pile up?"] → P55
→ success_path → P49 → P05[curiosity: "Why doesn't the pile-up keep growing?"]

[TA-2: Balance]
P02
→ P13[think-aloud: "Carriers drifting at v_d feel qv_dB sideways. They gather on one edge, leaving the other edge with the opposite charge. That builds a transverse electric field E. Soon qE = qv_dB and the carriers go straight again. The voltage across the strip's width w is V_H = Ew = v_dBw."]
→ P13[think-aloud: "The current is I = nqv_dA with A = wt, so v_d = I/(nqwt). Then V_H = IB/(nqt)."]
→ P08[notation: "V_H = I B / (n q t)"]
// GR-3 satisfied: P06 and P13 preceded P08 (V-8 PASS)
→ P34[question: "Copper, n = 8.5 × 10²⁸ m⁻³, t = 0.1 mm, I = 5 A, B = 1 T. V_H?"] → P55
→ success_path[≈ 3.7 × 10⁻⁶ V] → P49
→ failure_path → P50 → P51[diagnose: units of t] → P52[narrow: "0.1 mm = 10⁻⁴ m"] → re-elicit P34 → P55

[TA-3: Fewer Carriers, Bigger Voltage]
P02
→ P41[diagnostic: "Copper or semiconductor: bigger Hall voltage for the same I, B, t?"] → P55
→ [if semiconductor] → P49
→ [if copper] → SIGNAL:MISCONCEPTION:MC-MORE-CARRIERS-BIGGER-HALL → misconception_repair_chain[MC-MORE-CARRIERS-BIGGER-HALL]
→ P34[question: "Semiconductor, n = 10²² m⁻³, t = 0.1 mm, I = 10 mA, B = 0.5 T. V_H?"] → P55
→ success_path[≈ 31 mV] → P49

[TA-4: The Sign of the Carriers]
P02
→ P41[diagnostic: "n-type and p-type, same current and field: same Hall sign?"] → P55
→ [if opposite] → P49
→ [if same] → SIGNAL:MISCONCEPTION:MC-HALL-SIGN-INDEPENDENT-OF-CARRIER → misconception_repair_chain[MC-HALL-SIGN-INDEPENDENT-OF-CARRIER]

[TA-5: Hall Probes]
P02
→ P34[question: "A Hall probe reads 12 mV in a 0.4 T field. What field gives 30 mV?"] → P55
→ success_path[V_H ∝ B → 1.0 T] → P49
→ P13[think-aloud: "Semiconductors are used for probes precisely because their small n gives a usefully large voltage."]

[TA-6: Formative Assessment]
P02
→ P90_expansion:
    P79[predict: "Halve the strip's thickness, same I and B. Hall voltage?"] → P55
    → P49 → P51[check: doubles]
    → P35[open: "Explain why the carriers stop being deflected once the Hall voltage builds up."] → P55

[TA-7: Mastery Gate]
P02
→ P91_expansion:
    P77[generate: "Design a measurement that tells whether an unknown semiconductor is n-type or p-type."] → P55 → CORRECT
    → P76[transfer: "Why do metals make poor Hall probes?"] → P55 → CORRECT
    → P75[boundary: "B parallel to the current: Hall voltage?"] → P55 → CORRECT
    → P74[classify: "Which raises V_H: more current, more carriers, thicker strip, stronger field?"] → P55 → CORRECT
    → P78[explain: "Why does V_H = IB/(nqt) contain n in the denominator?"] → P55 → CORRECT
→ P68 → P62[schedule: first retrieval in 1 day]

### Protocol B — Counterexample-First
Serves: S1
CPA entry: P
Entry condition: formula without trends.
Success exit: predicts trends with n, t, I, B and sign.
Failure exit: Misconception Engine, then Protocol C.
Key deltas from A: open with P02 → P41["Copper gives 3.7 μV; a semiconductor 31 mV at a smaller current. How can fewer carriers give more voltage?"] → P54 (novel) → P55; then TA-4 and TA-5.

### Protocol C — Guided Questioning
Serves: S3, S2 (post-repair)
CPA entry: P
Entry condition: mechanism fine; sign not.
Success exit: carrier sign identified from V_H.
Failure exit: escalate to Protocol A TA-2.
Key deltas: enter at TA-4; run the gate.

### Protocol F — Low Pressure (S6)
Serves: S6
CPA entry: P
Entry condition: S6 flag confirmed.
Success exit: the pile-up and balance explained calmly.
Failure exit: shorten, bank one success, reschedule.
Key deltas: NO P28 (V-10 / GR-5); give the force direction rather than asking for it; P85 regulation_tail on every TA.

### Protocol G — Challenge-First (S7 override)
Serves: S7
CPA entry: P
Entry condition: confident "more carriers, more voltage".
Success exit: revises after the 3.7 μV vs 31 mV contrast.
Failure exit: Misconception Engine.
Key deltas: open with the two measured voltages; let it sit (P55).

## 6. Misconception Engine

### MC-HALL-SIGN-INDEPENDENT-OF-CARRIER: "The Hall voltage has the same sign whatever the carriers"
trigger_signal: student predicts the same Hall polarity for n-type and p-type samples carrying the same current in the same field.
conflict_evidence [P28]: "For the same conventional current, electrons drift one way and positive holes drift the opposite way. Work out the magnetic force on each, qv × B: which edge does each kind of carrier pile up on?"
bridge_text [P30]: "Both pile up on the SAME edge — reversing both q and v leaves qv × B unchanged. But the pile is negative for electrons and positive for holes, so the edge's polarity, and the Hall voltage's sign, are opposite. That is how the Hall effect first showed that some materials conduct by positive carriers."
replacement_text [P31]: "The Hall voltage's sign reveals the sign of the charge carriers: opposite for n-type (electrons) and p-type (holes)."
discrimination_pairs [P33]: ["n-type: negative carriers gather on the deflected edge", "p-type: positive carriers gather on the same edge — opposite polarity"]
s6_path: skip P28; show the two strips side by side with their edge charges marked.

### MC-MORE-CARRIERS-BIGGER-HALL: "More charge carriers give a larger Hall voltage"
trigger_signal: student expects metals, with their huge carrier densities, to show larger Hall voltages than semiconductors.
conflict_evidence [P28]: "To carry the same current, do carriers in copper (n ≈ 10²⁹ m⁻³) drift faster or slower than in a semiconductor (n ≈ 10²² m⁻³)?"
bridge_text [P30]: "Far slower — I = nqv_dA, so with ten million times more carriers each needs only a ten-millionth of the speed. The magnetic force qv_dB is proportional to that drift speed, so the balancing field and the Hall voltage are tiny in copper: V_H = IB/(nqt), with n in the denominator. That is why Hall probes are made from semiconductors."
replacement_text [P31]: "V_H ∝ 1/n: fewer carriers, faster drift, larger Hall voltage."
discrimination_pairs [P33]: ["copper, 5 A, 1 T, 0.1 mm: ≈ 3.7 μV", "semiconductor, 10 mA, 0.5 T, 0.1 mm: ≈ 31 mV"]
s6_path: skip P28; compare traffic: a few fast cars vs many slow ones carrying the same number of people per hour.

## 7. Assessment Battery

| Probe | Item | Expected signal |
|---|---|---|
| P74 (classify) | "What raises V_H?" | CORRECT = more I, stronger B; fewer carriers; thinner strip |
| P74 (classify) | "n-type vs p-type sign" | CORRECT = opposite |
| P75 (boundary) | "B parallel to current" | CORRECT = zero (v × B = 0) |
| P76 (transfer) | "Metals as probes" | CORRECT = huge n gives tiny V_H |
| P77 (generate) | "n or p?" | CORRECT = measure the Hall polarity for known I and B directions |
| P78 (explain) | "n in the denominator" | CORRECT = fewer carriers drift faster for the same I |
| P79 (predict) | "Half the thickness" | CORRECT = V_H doubles |

## 8. Mastery Gate (P91 expansion — canonical order P77→P76→P75→P74→P78)
P77: "Design a measurement that tells whether an unknown semiconductor is n-type or p-type." → expected: CORRECT
P76: "Why do metals make poor Hall probes?" → expected: CORRECT
P75: "B parallel to the current: Hall voltage?" → expected: CORRECT
P74: "Which raises V_H: more current, more carriers, thicker strip, stronger field?" → expected: CORRECT
P78: "Why does V_H = IB/(nqt) contain n in the denominator?" → expected: CORRECT

## 9. Retrieval Schedule (P89 expansion)
Interval 1 (1 day): "Write V_H = ?"
Interval 2 (3 days): "Copper vs semiconductor Hall voltage?"
Interval 3 (7 days): "What does the Hall sign tell you?"
Interval 4 (21 days): "Hall probe: 10 mV at 0.2 T; field for 25 mV?"
Interval 5 (60 days): "Why does the deflection stop?"

---
V-check status:
- V-1 all 10 KG fields present ✓ · V-2 objective has NOT-clause ✓ · V-3 DB 2–3 Qs, every branch → a state ✓ · V-4 every plausible state (S0,S1,S2,S3,S6) has a Protocol ✓ · V-5 every Protocol has success AND failure exit ✓ · V-6 every TA opens P01/P02 ✓ · V-7 every elicitation (P34/P35/P41) followed by P55 ✓ · V-8 no P08 without prior P06/P07 (TA-2) ✓ · V-9 Schema Repair entered only via P41 gate (TA-3, TA-4) ✓ · V-10 no P28 in S6 Protocol F ✓ · V-11 P91 terminal; P68 then P62 follow ✓ · V-12 no >3 consecutive C-category without E break ✓ · V-13 P54 before high-difficulty first-attempt (Protocol B TA-open) ✓ · V-14 assessment TA not first (TA-6/7) ✓ · V-15 Named Compounds (P90/P91) expanded ✓ · V-16 IC-1..20 pass ✓ · V-17 AIR invariants pass per TA ✓ · V-18 P90 (TA-6) before P91 (TA-7) ✓ · V-19 P91 has all 5 probes ✓ · V-20 P89 schedule authored with specific intervals ✓
status: READY
PACKAGE_READY
