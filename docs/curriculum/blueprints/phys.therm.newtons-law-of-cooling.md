# Teaching Blueprint: phys.therm.newtons-law-of-cooling

## 0. Concept Profile
concept_id: phys.therm.newtons-law-of-cooling
name: Newton's Law of Cooling
domain: Thermal Physics (Physics)
difficulty: proficient (3)
bloom: apply
prerequisites: [phys.therm.heat-transfer]
mastery_threshold: 0.75
estimated_hours: 2
cross_links: []
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: P (a cooling-curve table for a cup of tea before the rate law; difficulty 3)
status: READY

## 1. Learning Objective

[Boundary statement]
A student who achieves mastery demonstrates:
1. States that, for small temperature differences, a body's rate of cooling is proportional to the difference between its temperature and its surroundings': dT/dt = −k(T − T_s) — not to its temperature alone.
2. Predicts the shape of a cooling curve: fast at first, slower and slower, approaching the room temperature without crossing it; equal times give equal FRACTIONS of the excess temperature (T − T_s = (T₀ − T_s)e^(−kt)).
3. Solves the standard problem with the average-rate form, (T₁ − T₂)/t = k[(T₁ + T₂)/2 − T_s] — e.g. a body cooling from 80 °C to 60 °C in 10 min in a 20 °C room needs about 17 min to cool from 60 °C to 40 °C (16.7 min by the average form, 17.1 min exactly).

A student who expects each 20 °C drop to take the same 10 minutes, or who says a 50 °C body cools just as fast in a 40 °C room as in a 0 °C room, has **NOT** achieved mastery — both lose the idea that the temperature DIFFERENCE drives heat flow, which every later heat-transfer and thermodynamics problem depends on.

## 2. Student State Matrix

| State | Why here | Tell-tale behaviour | Protocol |
|---|---|---|---|
| S0 | Has never looked at a cooling curve | Assumes things cool "steadily" | Protocol A (Concrete) |
| S1 | Formula without the curve | Writes dT/dt = −k(T − T_s) but draws a straight line | Protocol B (Counterexample-first) |
| S2-CONSTANT-RATE | Cooling at a fixed rate | "It lost 20 °C in 10 min, so 60 → 40 also takes 10 min" | Misconception Engine → then Protocol C |
| S2-TEMPERATURE-NOT-DIFFERENCE | Rate set by how hot the body is | "A 50 °C cup cools at the same rate in any room" | Misconception Engine → then Protocol C |
| S3 | Partial — curve shape fine, calculation not | Correct sketch, cannot set up the average form | Protocol C (Guided Questioning) |
| S6 | Anxiety on exponentials | Freezes at e^(−kt) | Protocol F (Low Pressure) |

## 3. Diagnostic Battery

DB-1 (prior-exposure check):
"Have you watched how quickly a hot drink cools — fastest at the start, or at the same speed throughout?"
  No idea → S0. Enter Protocol A (Concrete).
  Answers → DB-2.

DB-2 (representation / misconception test):
"Tea cools from 80 °C to 60 °C in 10 minutes in a 20 °C room. Will it take more, less or the same time to cool from 60 °C to 40 °C? Why?"
  "More — it is closer to room temperature, so it loses heat more slowly" → S3. Enter Protocol C.
  "More" (no reason) → S1. Enter Protocol B.
  "The same, 10 minutes" → SIGNAL:MISCONCEPTION:MC-CONSTANT-RATE. Enter Misconception Engine.
  Pause → add S6 flag; Protocol F if anxious, otherwise Protocol A.

DB-3 (surroundings check — overlays):
"Two identical cups at 50 °C, one in a 40 °C room and one in a 0 °C room. Which cools faster at first?"
  "The one in the 0 °C room" → no flag.
  "The same — both are at 50 °C" → add SIGNAL:MISCONCEPTION:MC-TEMPERATURE-NOT-DIFFERENCE (repair at TA-2).
  Confident and wrong on DB-2 → add S7 flag. Override to Protocol G.

## 4. Prerequisite Check

PD-1 (for `phys.therm.heat-transfer`):
"Heat flows between two bodies — in which direction, and what makes the flow stop?"
  Cannot say "from hotter to colder, until they reach the same temperature" → flag PREREQ-GAP-HEAT-TRANSFER.
  In-session minimum repair: one P06 (a hot and a cold block in contact, thermometers in each) + one P34 ("when do the readings stop changing?") then resume. If heat flow down a temperature difference is absent, schedule a `phys.therm.heat-transfer` session (S4 route).

## 5. Protocol Library

### Protocol A — Concrete-First (primary)
Serves: S0
CPA entry: P
Entry condition: no cooling-curve picture.
Success exit: sketches and explains the curve, ranks cooling rates by temperature difference, and solves the average-rate problem (P91 all 5 probes CORRECT).
Failure exit: on CONSTANT-RATE → Misconception Engine, resume at TA-3. On exponential anxiety → Protocol F.
Duration: ~55–65 min (may span 2 sessions; session_cap 7 TAs).

[TA-1: The Cooling Curve]
P01
→ P04[content: "A hot drink doesn't cool steadily. Let's read what it actually does."]
→ P06[content: a table for tea in a 20 °C room — 0 min 80 °C, 10 min 60 °C, 20 min 47 °C, 30 min 38 °C, 40 min 32 °C — plotted as temperature against time]
→ P14[predict: "Is the temperature falling by the same amount each 10 minutes?"] → P55
→ success_path[no — 20, 13, 9, 6 °C] → P49 → P05[curiosity: "Why does it slow down?"]

[TA-2: The Difference Drives the Flow]
P02
→ P13[think-aloud: "Heat flows because the tea is hotter than the room. At 80 °C the tea is 60 °C hotter; at 32 °C only 12 °C hotter. Less difference, slower flow."]
→ P08[notation: "rate of cooling ∝ (T − T_s): dT/dt = −k(T − T_s)"]
// GR-3 satisfied: P06 and P13 preceded P08 (V-8 PASS)
→ P41[diagnostic: "Two cups at 50 °C: one in a 40 °C room, one in a 0 °C room. Which cools faster at first, and how many times faster?"] → P55
→ [if 0 °C room, 5 times (50 vs 10 excess)] → P49
→ [if "the same"] → SIGNAL:MISCONCEPTION:MC-TEMPERATURE-NOT-DIFFERENCE → misconception_repair_chain[MC-TEMPERATURE-NOT-DIFFERENCE]

[TA-3: Equal Times, Equal Fractions]
P02
→ P13[think-aloud: "Excess over the room: 60, 40, 27, 18, 12 °C. Each 10 minutes the excess is multiplied by 2/3. That is exponential decay: T − T_s = (T₀ − T_s) e^(−kt)."]
→ P34[question: "Does the tea ever reach exactly 20 °C, or go below it?"] → P55
→ success_path[approaches 20 °C, never crosses it] → P49

[TA-4: The Average-Rate Method]
P02
→ P13[think-aloud: "Over a short interval use the average temperature: (T₁ − T₂)/t = k[(T₁ + T₂)/2 − T_s]. 80 → 60 °C in 10 min: 2 = k(70 − 20), so k = 0.04 per minute."]
→ P34[question: "Now 60 → 40 °C: 20/t = 0.04 × (50 − 20). t?"] → P55
→ success_path[t ≈ 16.7 min] → P49
→ failure_path → P50 → P51[diagnose: used T instead of T − T_s] → P52[narrow: "What is the AVERAGE excess over the room between 60 and 40 °C?"] → re-elicit P34 → P55

[TA-5: Where the Law Holds]
P02
→ P17[contrast: "Newton's law is for small differences and mainly convective cooling. A red-hot iron at 800 °C cools much faster than the law predicts. Why might that be?"] → P55
→ success_path[radiation grows as T⁴ and dominates at high temperature] → P49

[TA-6: Formative Assessment]
P02
→ P90_expansion:
    P79[predict: "Same tea, but the room is now 30 °C. From 80 °C, faster or slower than before?"] → P55
    → P49 → P51[check: reasoned from the smaller excess (50 vs 60)?]
    → P35[open: "Explain why the cooling curve flattens out."] → P55

[TA-7: Mastery Gate]
P02
→ P91_expansion:
    P77[generate: "Sketch the curves for the same cup cooling in a 0 °C room and a 20 °C room on one graph."] → P55 → CORRECT
    → P76[transfer: "A forensic scientist finds a body at 30 °C in a 20 °C room. What principle lets them estimate the time since death?"] → P55 → CORRECT
    → P75[boundary: "An object already at room temperature. Rate of cooling?"] → P55 → CORRECT
    → P74[classify: "Excess falls from 40 °C to 20 °C in 8 min. How long from 20 °C to 10 °C?"] → P55 → CORRECT
    → P78[explain: "Why does the second 20 °C drop take longer than the first?"] → P55 → CORRECT
→ P68 → P62[schedule: first retrieval in 1 day]

### Protocol B — Counterexample-First
Serves: S1
CPA entry: P
Entry condition: formula without the curve.
Success exit: correct curve shape and reason.
Failure exit: Misconception Engine, then Protocol C.
Key deltas from A: open with P02 → P41["If cooling were steady at 2 °C per minute, where would the tea be after an hour?"] → P54 (novel) → P55; the answer (−40 °C) is impossible; then TA-2.

### Protocol C — Guided Questioning
Serves: S3, S2 (post-repair)
CPA entry: P
Entry condition: curve fine; calculation not.
Success exit: average-rate and equal-fractions problems solved.
Failure exit: escalate to Protocol A TA-2.
Key deltas: enter at TA-3 or TA-4; run the gate.

### Protocol F — Low Pressure (S6)
Serves: S6
CPA entry: P
Entry condition: S6 flag confirmed.
Success exit: the curve explained and one average-rate problem solved.
Failure exit: shorten, bank one success, reschedule.
Key deltas: NO P28 (V-10 / GR-5); use the "excess over the room" table and halving/two-thirds steps instead of e^(−kt); P85 regulation_tail on every TA.

### Protocol G — Challenge-First (S7 override)
Serves: S7
CPA entry: P
Entry condition: confident "same 10 minutes".
Success exit: revises after the steady-rate contradiction.
Failure exit: Misconception Engine.
Key deltas: open with Protocol B's −40 °C contradiction; let it sit (P55).

## 6. Misconception Engine

### MC-CONSTANT-RATE: "A hot body cools at a steady rate"
trigger_signal: student predicts equal times for equal temperature drops, or draws a straight-line cooling graph.
conflict_evidence [P28]: "If the tea kept losing 20 °C every 10 minutes, where would it be after 40 minutes? After an hour?"
bridge_text [P30]: "It would end up colder than the room — at 0 °C, then −40 °C — which never happens. Heat flows only because the tea is hotter than the room; as that difference shrinks, the flow slows."
replacement_text [P31]: "Rate of cooling ∝ (T − T_s). Equal times give equal FRACTIONS of the excess temperature, so each degree takes longer than the last, and the body approaches room temperature without crossing it."
discrimination_pairs [P33]: ["80 → 60 °C (excess 60 → 40, fast) vs 60 → 40 °C (excess 40 → 20, slower)", "steady straight-line fall (impossible) vs flattening curve (observed)"]
s6_path: skip P28; read the measured table together and subtract successive readings.

### MC-TEMPERATURE-NOT-DIFFERENCE: "The cooling rate depends only on how hot the body is"
trigger_signal: student says a body at a given temperature cools equally fast in any surroundings.
conflict_evidence [P28]: "A cup at 50 °C in a room at 50 °C. Does it cool at all?"
bridge_text [P30]: "No — with no temperature difference, no heat flows. So the room temperature must matter: what drives cooling is how much hotter the cup is than its surroundings."
replacement_text [P31]: "Compare cooling rates by T − T_s: a 50 °C cup cools five times faster at first in a 0 °C room (excess 50) than in a 40 °C room (excess 10)."
discrimination_pairs [P33]: ["50 °C in a 0 °C room (excess 50) vs 50 °C in a 40 °C room (excess 10)", "a 90 °C cup in a 70 °C room vs a 40 °C cup in a 20 °C room: the same initial rate (same excess)"]
s6_path: skip P28; two thermometers, one in ice water and one in warm water, both starting from a hand-warm 35 °C.

## 7. Assessment Battery

| Probe | Item | Expected signal |
|---|---|---|
| P74 (classify) | "Excess 40 → 20 °C in 8 min; 20 → 10 °C?" | CORRECT = 8 min (equal fractions) |
| P74 (classify) | "50 °C cup, 0 °C vs 40 °C room — initial rate ratio?" | CORRECT = 5 : 1 |
| P75 (boundary) | "Object at room temperature — rate?" | CORRECT = zero |
| P76 (transfer) | "Forensic estimate of time since death" | CORRECT = the known cooling curve of a body toward room temperature |
| P77 (generate) | "Curves in 0 °C and 20 °C rooms" | CORRECT = both flatten, toward 0 and 20 °C; the 0 °C curve falls faster |
| P78 (explain) | "Why does the second drop take longer?" | CORRECT = smaller excess, slower heat flow |
| P79 (predict) | "Room at 30 °C — faster or slower from 80 °C?" | CORRECT = slower (excess 50 instead of 60) |

## 8. Mastery Gate (P91 expansion — canonical order P77→P76→P75→P74→P78)
P77: "Sketch the curves for the same cup cooling in a 0 °C room and a 20 °C room on one graph." → expected: CORRECT
P76: "A forensic scientist finds a body at 30 °C in a 20 °C room. What principle lets them estimate the time since death?" → expected: CORRECT
P75: "An object already at room temperature. Rate of cooling?" → expected: CORRECT
P74: "Excess falls from 40 °C to 20 °C in 8 min. How long from 20 °C to 10 °C?" → expected: CORRECT
P78: "Why does the second 20 °C drop take longer than the first?" → expected: CORRECT

## 9. Retrieval Schedule (P89 expansion)
Interval 1 (1 day): "State Newton's law of cooling in words."
Interval 2 (3 days): "80 → 60 °C in 10 min in a 20 °C room — time from 60 to 40 °C by the average form?"
Interval 3 (7 days): "Why does the cooling curve never cross room temperature?"
Interval 4 (21 days): "Why do you blow on hot soup?"
Interval 5 (60 days): "Why does Newton's law fail for a red-hot iron bar?"

---
V-check status:
- V-1 all 10 KG fields present ✓ · V-2 objective has NOT-clause ✓ · V-3 DB 2–3 Qs, every branch → a state ✓ · V-4 every plausible state (S0,S1,S2,S3,S6) has a Protocol ✓ · V-5 every Protocol has success AND failure exit ✓ · V-6 every TA opens P01/P02 ✓ · V-7 every elicitation (P34/P35/P41) followed by P55 ✓ · V-8 no P08 without prior P06/P07 (TA-2) ✓ · V-9 Schema Repair entered only via P41 gate (TA-2) ✓ · V-10 no P28 in S6 Protocol F ✓ · V-11 P91 terminal; P68 then P62 follow ✓ · V-12 no >3 consecutive C-category without E break ✓ · V-13 P54 before high-difficulty first-attempt (Protocol B TA-open) ✓ · V-14 assessment TA not first (TA-6/7) ✓ · V-15 Named Compounds (P90/P91) expanded ✓ · V-16 IC-1..20 pass ✓ · V-17 AIR invariants pass per TA ✓ · V-18 P90 (TA-6) before P91 (TA-7) ✓ · V-19 P91 has all 5 probes ✓ · V-20 P89 schedule authored with specific intervals ✓
status: READY
PACKAGE_READY
