# Teaching Blueprint: phys.meas.measuring-instruments

## 0. Concept Profile
concept_id: phys.meas.measuring-instruments
name: Vernier Calipers and Screw Gauge
domain: Measurement & Units (Physics)
difficulty: developing (2)
bloom: apply
prerequisites: [phys.meas.errors]
mastery_threshold: 0.75
estimated_hours: 2
cross_links: []
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (a drawn or real scale pair before the reading formula; difficulty ≤ 2)
status: READY

## 1. Learning Objective

[Boundary statement]
A student who achieves mastery demonstrates:
1. Derives the least count of a vernier caliper (1 main-scale division − 1 vernier-scale division; e.g. 10 VSD = 9 MSD gives 1 mm − 0.9 mm = 0.1 mm) and of a screw gauge (pitch ÷ number of circular-scale divisions; e.g. 0.5 mm ÷ 50 = 0.01 mm).
2. Takes a reading as main-scale reading + (coinciding division × least count): e.g. main scale 23 mm, 6th vernier division coincides → 23 + 6 × 0.1 = 23.6 mm.
3. Finds the zero error with the jaws (or faces) closed and corrects every reading: true value = observed reading − zero error, keeping the sign of the zero error.

A student who can recite "MSR + VSR × LC" but adds the vernier division number directly (23 + 6 = 29 mm), or adds a positive zero error instead of subtracting it, has **NOT** achieved mastery — the procedure without the least-count meaning gives readings wrong by whole millimetres, which no error analysis downstream can rescue.

## 2. Student State Matrix

| State | Why here | Tell-tale behaviour | Protocol |
|---|---|---|---|
| S0 | Never used either instrument | Cannot say why a ruler cannot measure 0.1 mm | Protocol A (Concrete) |
| S1 | Formula recited, meaning absent | Writes MSR + VSR × LC but cannot derive LC for a new vernier | Protocol B (Counterexample-first) |
| S2-RAW-DIVISION | Adds the division number | 23 mm + 6 → 29 mm | Misconception Engine → then Protocol C |
| S2-ZERO-SIGN | Zero error added, not subtracted | Reports reading + zero error | Misconception Engine → then Protocol C |
| S3 | Partial — vernier fine, screw gauge not (or the reverse) | Reads one instrument, fails the other | Protocol C (Guided Questioning) |
| S6 | Anxiety on small decimals | Avoids readings below 1 mm | Protocol F (Low Pressure) |

## 3. Diagnostic Battery

DB-1 (prior-exposure check):
"Have you used a vernier caliper or a screw gauge — in a lab, or seen one?"
  No → S0. Enter Protocol A (Concrete).
  Yes → DB-2.

DB-2 (representation / misconception test):
"A vernier has least count 0.1 mm. The main scale reads 23 mm and the 6th vernier division lines up. What is the length?"
  "23.6 mm" + explains "6 × 0.1 mm added to 23 mm" → S3. Enter Protocol C.
  "23.6 mm" (no reason) → S1. Enter Protocol B.
  "29 mm" or "23.06 mm" → SIGNAL:MISCONCEPTION:MC-RAW-DIVISION. Enter Misconception Engine.
  Pause / "I don't know" → add S6 flag. Ask: "Are you comfortable multiplying by 0.1?"
      No → S6. Enter Protocol F.
      Yes → S0. Enter Protocol A.

DB-3 (confidence calibration):
"How confident are you reading these instruments — 1 to 5?"
  1–2 → add S6 flag.
  4–5 + DB-2 wrong → add S7 flag. Override to Protocol G (challenge-first).

## 4. Prerequisite Check

PD-1 (for `phys.meas.errors`):
"What does the smallest division of a ruler tell you about how precisely it can measure?"
  Cannot connect the smallest division to the uncertainty of a reading → flag PREREQ-GAP-ERRORS.
  In-session minimum repair: one P06 (a ruler with 1 mm marks; a pencil end between marks) + one P34 ("can you say whether it is 12.3 or 12.4 mm?") then resume. If the learner has no notion of measurement uncertainty, schedule a `phys.meas.errors` session (S4 route).

## 5. Protocol Library

### Protocol A — Concrete-First (primary)
Serves: S0
CPA entry: C
Entry condition: no exposure (DB-1 = No).
Success exit: derives LC for an unfamiliar vernier, reads it, and corrects for a zero error (P91 all 5 probes CORRECT).
Failure exit: on RAW-DIVISION → Misconception Engine[MC-RAW-DIVISION], then resume at TA-3. On decimal collapse → Protocol F.
Duration: ~50–60 min (may span 2 sessions; session_cap 7 TAs).

[TA-1: The Limit of a Ruler]
P01
→ P04[content: "A ruler can't tell 12.3 mm from 12.4 mm. Two clever scales can."]
→ P06[content: a ruler with 1 mm marks; a coin edge falling between 12 and 13 mm]
→ P14[predict: "Can this ruler tell you the tenth of a millimetre?"] → P55
→ success_path → P49 → P05[curiosity: "What if a second sliding scale had marks just slightly closer together?"]

[TA-2: How the Vernier Works]
P02
→ P06[content: a main scale in mm and a sliding scale of 10 divisions spanning 9 mm]
→ P13[think-aloud: "Each vernier division is 0.9 mm — 0.1 mm shorter than a main division. Slide the vernier 0.1 mm and the 1st marks line up; slide 0.6 mm and the 6th marks line up."]
→ P08[notation: "least count LC = 1 MSD − 1 VSD = 1 mm − 0.9 mm = 0.1 mm ; reading = MSR + n × LC"]
// GR-3 satisfied: P06 and P13 preceded P08 (V-8 PASS)
→ P34[question: "Main scale 23 mm, 6th vernier mark coincides. Length?"] → P55
→ success_path[23.6 mm] → P49
→ failure_path → P50 → P51[diagnose: added 6 raw (→MC) or arithmetic?] → P52[narrow: "Each vernier step is worth 0.1 mm. What are 6 steps worth?"] → re-elicit P34 → P55

[TA-3: A Different Vernier]
P02
→ P16[compare: "This vernier has 20 divisions spanning 19 mm. What is its least count?"] → P55
→ success_path[1 − 0.95 = 0.05 mm] → P21[generalise: "LC = 1 MSD ÷ number of vernier divisions, for a vernier of N divisions spanning N − 1 main divisions."] → P55 → P49

[TA-4: The Screw Gauge]
P02
→ P06[content: a screw gauge — the spindle advances 0.5 mm per full turn; the thimble has 50 divisions]
→ P13[think-aloud: "One full turn moves 0.5 mm, so one thimble division moves 0.5 ÷ 50 = 0.01 mm."]
→ P08[notation: "LC = pitch ÷ number of circular divisions ; reading = main scale + circular reading × LC"]
→ P34[question: "Main scale shows 4.5 mm, thimble at 28. Diameter?"] → P55
→ success_path[4.78 mm] → P49

[TA-5: Zero Error]
P02
→ P06[content: jaws closed but the vernier zero sits 2 divisions (0.2 mm) to the right of the main zero]
→ P17[contrast: "With nothing in the jaws it already reads +0.2 mm. A rod then reads 23.6 mm. Is the rod longer or shorter than 23.6 mm?"] → P55
→ success_path[shorter: 23.4 mm]
→ P13[think-aloud: "The instrument adds 0.2 mm to every reading, so we take it off: true = observed − zero error."]
→ P41[diagnostic: "Zero error −0.03 mm on a screw gauge; reading 4.78 mm. True diameter?"] → P55
→ [if 4.81 mm] → P49
→ [if 4.75 mm] → SIGNAL:MISCONCEPTION:MC-ZERO-SIGN → misconception_repair_chain[MC-ZERO-SIGN]

[TA-6: Formative Assessment]
P02
→ P90_expansion:
    P79[predict: "Before reading: could this vernier (LC 0.1 mm) report 23.65 mm?"] → P55
    → P49 → P51[check: tied reported digits to the least count?]
    → P35[open: "Explain why the vernier lets you read a tenth of a millimetre."] → P55

[TA-7: Mastery Gate]
P02
→ P91_expansion:
    P77[generate: "Design a vernier with least count 0.02 mm — how many divisions, spanning what?"] → P55 → CORRECT
    → P76[transfer: "Screw gauge: pitch 1 mm, 100 divisions. Main scale 2 mm, thimble 47. Reading?"] → P55 → CORRECT
    → P75[boundary: "Zero error +0.1 mm, observed 15.3 mm. True length?"] → P55 → CORRECT
    → P74[classify: "A reading of 2.367 cm from a vernier of LC 0.01 cm — acceptable or not?"] → P55 → CORRECT
    → P78[explain: "Why is the least count 1 MSD − 1 VSD?"] → P55 → CORRECT
→ P68 → P62[schedule: first retrieval in 1 day]

### Protocol B — Counterexample-First
Serves: S1
CPA entry: P
Entry condition: formula recited, LC not derivable.
Success exit: derives LC for an unfamiliar vernier and reads it.
Failure exit: RAW-DIVISION → Misconception Engine, then Protocol C.
Key deltas from A: open with P02 → P41["20 vernier divisions span 19 mm. Least count?"] → P54 (novel) → P55; on the stall run TA-2's think-aloud, then TA-3 onward.

### Protocol C — Guided Questioning
Serves: S3, S2 (post-repair)
CPA entry: P
Entry condition: one instrument read correctly, the other not.
Success exit: reads both instruments and corrects zero error.
Failure exit: escalate to Protocol A TA-2.
Key deltas: enter at the missing instrument (TA-2 or TA-4), then TA-5 and the gate.

### Protocol F — Low Pressure (S6)
Serves: S6
CPA entry: C
Entry condition: S6 flag confirmed.
Success exit: one reading taken calmly.
Failure exit: shorten, bank one success, reschedule.
Key deltas: NO P28 (V-10 / GR-5); use the 10-division vernier only; express every step in tenths of a millimetre before decimals; P85 regulation_tail on every TA.

### Protocol G — Challenge-First (S7 override)
Serves: S7
CPA entry: P
Entry condition: DB-3 confidence 4–5 with a wrong DB-2.
Success exit: student finds their own error after the contradiction.
Failure exit: Misconception Engine[MC-RAW-DIVISION].
Key deltas: open with a reading where adding the raw division gives a length longer than the next main-scale mark (23 + 6 = 29 mm while the vernier zero is visibly between 23 and 24 mm); let the mismatch sit (P55).

## 6. Misconception Engine

### MC-RAW-DIVISION: "Add the coinciding vernier division number directly"
trigger_signal: student adds the division number to the main-scale reading without multiplying by the least count (23 mm + 6 = 29 mm), or appends it as a digit in the wrong place (23.06 mm with LC 0.1 mm).
conflict_evidence [P28]: "The vernier zero sits between the 23 mm and 24 mm marks. Your answer, 29 mm, is past the 24 mm mark. Can the jaws be open wider than where the zero is?"
bridge_text [P30]: "The vernier only measures the gap between the 23 mm mark and its own zero — a gap smaller than 1 mm. Each vernier division is worth one least count, 0.1 mm, so the 6th division means 0.6 mm."
replacement_text [P31]: "Reading = main-scale reading + (coinciding division × least count)."
discrimination_pairs [P33]: ["6th division on LC 0.1 mm → +0.6 mm vs 6th division on LC 0.05 mm → +0.30 mm", "main scale 23 mm + 0.6 mm = 23.6 mm vs main scale 23 mm + 6 mm = 29 mm (impossible, past the 24 mm mark)"]
s6_path: skip P28; count the vernier steps aloud in tenths: "one tenth, two tenths … six tenths of a millimetre".

### MC-ZERO-SIGN: "Add the zero error to the reading"
trigger_signal: student corrects a positive zero error by adding it (23.6 + 0.2 = 23.8 mm), or ignores the sign of a negative zero error.
conflict_evidence [P28]: "With the jaws closed — nothing between them — the instrument reads +0.2 mm. Is it reading too much or too little?"
bridge_text [P30]: "It reads 0.2 mm too much even for zero length, so it reads 0.2 mm too much for every object. We take that extra off."
replacement_text [P31]: "True reading = observed reading − zero error, with the zero error's own sign: subtract a positive error, and subtracting a negative error adds it."
discrimination_pairs [P33]: ["zero error +0.2 mm, reading 23.6 → 23.4 mm", "zero error −0.03 mm, reading 4.78 → 4.81 mm"]
s6_path: skip P28; "the instrument starts at 0.2 instead of 0, so we take 0.2 away from every reading."

## 7. Assessment Battery

| Probe | Item | Expected signal |
|---|---|---|
| P74 (classify) | "LC 0.01 cm; reported 2.367 cm — acceptable?" | CORRECT = no; digits beyond the least count are not measured |
| P74 (classify) | "Which instrument for a wire's diameter: vernier or screw gauge?" | CORRECT = screw gauge (finer least count) |
| P75 (boundary) | "Zero error +0.1 mm, observed 15.3 mm. True?" | CORRECT = 15.2 mm |
| P76 (transfer) | "Pitch 1 mm, 100 divisions, main 2 mm, thimble 47?" | CORRECT = 2.47 mm |
| P77 (generate) | "Design a vernier with LC 0.02 mm." | CORRECT = 50 divisions spanning 49 mm |
| P78 (explain) | "Why is LC = 1 MSD − 1 VSD?" | CORRECT = each step of coincidence corresponds to that difference |
| P79 (predict) | "Can a 0.1 mm vernier report 23.65 mm?" | CORRECT = no |

## 8. Mastery Gate (P91 expansion — canonical order P77→P76→P75→P74→P78)
P77: "Design a vernier with least count 0.02 mm — how many divisions, spanning what?" → expected: CORRECT
P76: "Screw gauge: pitch 1 mm, 100 divisions. Main scale 2 mm, thimble 47. Reading?" → expected: CORRECT
P75: "Zero error +0.1 mm, observed 15.3 mm. True length?" → expected: CORRECT
P74: "A reading of 2.367 cm from a vernier of LC 0.01 cm — acceptable or not?" → expected: CORRECT
P78: "Why is the least count 1 MSD − 1 VSD?" → expected: CORRECT

## 9. Retrieval Schedule (P89 expansion)
Interval 1 (1 day): "Vernier LC 0.1 mm: main 41 mm, 3rd division coincides. Reading?"
Interval 2 (3 days): "Screw gauge pitch 0.5 mm, 50 divisions. Least count?"
Interval 3 (7 days): "Zero error −0.2 mm, observed 12.4 mm. True length?"
Interval 4 (21 days): "Why does a screw gauge suit a wire and a vernier suit a test tube's diameter?"
Interval 5 (60 days): "Measure a sheet of paper's thickness with a screw gauge — what would you do, and why stack many sheets?"

---
V-check status:
- V-1 all 10 KG fields present ✓ · V-2 objective has NOT-clause ✓ · V-3 DB 2–3 Qs, every branch → a state ✓ · V-4 every plausible state (S0,S1,S2,S3,S6) has a Protocol ✓ · V-5 every Protocol has success AND failure exit ✓ · V-6 every TA opens P01/P02 ✓ · V-7 every elicitation (P34/P35/P41) followed by P55 ✓ · V-8 no P08 without prior P06/P07 (TA-2, TA-4) ✓ · V-9 Schema Repair entered only via P41 gate (TA-5) ✓ · V-10 no P28 in S6 Protocol F ✓ · V-11 P91 terminal; P68 then P62 follow ✓ · V-12 no >3 consecutive C-category without E break ✓ · V-13 P54 before high-difficulty first-attempt (Protocol B TA-open) ✓ · V-14 assessment TA not first (TA-6/7) ✓ · V-15 Named Compounds (P90/P91) expanded ✓ · V-16 IC-1..20 pass ✓ · V-17 AIR invariants pass per TA ✓ · V-18 P90 (TA-6) before P91 (TA-7) ✓ · V-19 P91 has all 5 probes ✓ · V-20 P89 schedule authored with specific intervals ✓
status: READY
PACKAGE_READY
