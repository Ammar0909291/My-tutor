# Teaching Blueprint: phys.meas.significant-figures

## 0. Concept Profile
concept_id: phys.meas.significant-figures
name: Significant Figures and Precision
domain: Measurement & Units (Physics)
difficulty: developing (3)
bloom: apply
prerequisites: [phys.meas.errors]
mastery_threshold: 0.75
estimated_hours: 2
cross_links: []
unlocks: []
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (read real instruments to see which digits are known before counting sig figs; difficulty 3 → C with accelerated P track)
status: READY

## 1. Learning Objective

[Boundary statement]
A student who achieves mastery demonstrates:
1. Counts the significant figures in a measured value correctly, applying the rules for leading zeros (not significant), captive zeros (significant), and trailing zeros after a decimal (significant) — e.g. 0.00420 has 3 sig figs.
2. Reports a **calculated** result to no more precision than its **least precise input** (multiplication/division: fewest sig figs; addition/subtraction: fewest decimal places) — and rounds only at the end.
3. Explains that sig figs communicate the **precision** of a measurement, so writing extra digits from a calculator is **false precision**, not greater accuracy.

A student who copies "12.41666667" from a calculator as the answer to a mm-ruler measurement, or who counts the leading zeros in 0.0042 as significant, has **NOT** achieved mastery — false precision misrepresents what was actually measured and corrupts every reported experimental result.

## 2. Student State Matrix

| State | Why here | Tell-tale behaviour | Protocol |
|---|---|---|---|
| S0 | Never met sig figs | Reports whatever digits appear | Protocol A (Concrete) |
| S1 | "Round to 2 decimals" rote rule | Applies a fixed decimal count regardless of the data's precision | Protocol B (Counterexample-first) |
| S2-MORE-DIGITS-BETTER | Believes more digits = more accurate | Writes all calculator digits as "the exact answer" | Misconception Engine → Protocol C |
| S2-RESULT-EXCEEDS-INPUTS | Thinks a result can be more precise than its data | Reports 5 sig figs from 2-sig-fig measurements | Misconception Engine → Protocol C |
| S3 | Counts sig figs; mishandles zeros or propagation | OK on simple counts; fails 0.00420 or a division result | Protocol C (Guided Questioning) |
| S6 | Anxiety at the zero rules | Freezes at which zeros "count" | Protocol F (Low Pressure) |

## 3. Diagnostic Battery

DB-1 (prior-exposure check):
"When you write down a measured number, have you learned rules about which digits actually 'count' — significant figures?"
  No → S0. Enter Protocol A (Concrete).
  Yes → DB-2.

DB-2 (representation / misconception test):
"You measure a length with a ruler as 2.5 cm and multiply by 3.14159. The calculator shows 7.853975. How many digits should you keep in your answer, and why?"
  "About 2 sig figs — 7.9 — because the 2.5 cm was only known to 2 sig figs" → S3. Enter Protocol C.
  "All of them — 7.853975 is exact" → SIGNAL:MISCONCEPTION:MC-MORE-DIGITS-BETTER. Enter Misconception Engine.
  "Round to 2 decimal places: 7.85" (fixed decimal rule, no sig-fig reasoning) → S1. Enter Protocol B.
  Pause / "I don't know" → add S6 flag → confidence question → route (No→S6/F, Yes→S0/A).

DB-3 (confidence calibration):
"How confident are you with significant figures — 1 to 5?"
  1–2 → add S6 flag; apply S6 adaptations.
  4–5 + DB-2 = "all of them" → add S7 flag; override to Protocol G (challenge-first).

## 4. Prerequisite Check

PD-1 (for `phys.meas.errors`):
"What does the uncertainty ±0.1 cm on a measurement tell you?"
  Cannot connect uncertainty to which digits are trustworthy → flag PREREQ-GAP-ERRORS.
  In-session minimum repair: one P06 (read a ruler; the last digit is the uncertain one) linking uncertainty → the last significant digit, then resume. Deep gap → schedule `phys.meas.errors` (S4 route).

## 5. Protocol Library

### Protocol A — Concrete-First (primary)
Serves: S0
CPA entry: C → P → A
Entry condition: no prior exposure (DB-1 = No).
Success exit: counts sig figs correctly (incl. zeros) AND reports a calculation to the correct precision (P91 all 5 CORRECT).
Failure exit: on MORE-DIGITS-BETTER / RESULT-EXCEEDS-INPUTS signal → Misconception Engine, then resume TA-4. On zero-rule collapse → Protocol F.
Duration: ~40–50 min.

[TA-1: The Last Digit Is a Guess]
P01
→ P04[content: "The digits you write should say how sure you are. The last one is always a bit of a guess — and you can't invent more."]
→ P06[content: read a pencil on a mm ruler; end falls between 124 and 125 mm — you can estimate 124.5, but the '.5' is the uncertain digit; you cannot claim 124.53]
→ P34[question: "The ruler has millimetre marks. Can you honestly report the length to a hundredth of a millimetre?"] → P55
→ success_path → P49 → P05[curiosity: "So where do all those calculator decimals come from, if the ruler can't measure them?"]

[TA-2: Counting Significant Figures]
P02
→ P07[modality: a table of examples — 42 (2), 4.20 (3), 0.0042 (2), 0.00420 (3), 4002 (4) — with each digit annotated known/placeholder]
→ P13[think-aloud: "Non-zero digits always count. Zeros BETWEEN non-zeros count. Leading zeros are just placeholders — they don't count. Trailing zeros AFTER a decimal point count, because you chose to write them."]
→ P08[notation: "0.00420 → the 4, 2, 0 are significant → 3 sig figs"]
// GR-3 satisfied: P06/P07 preceded P08 (V-8 PASS)
→ P34[question: "How many sig figs in 0.0308? In 5.600?"] → P55
→ success_path → P49
→ failure_path → P50 → P52[narrow: "Leading zeros hold the decimal place — do they tell you anything you measured? Trailing zeros after a decimal — why write them unless you mean them?"] → re-elicit → P55

[TA-3: Precision of a Calculation]
P02
→ P06[content: measure a rectangle: 2.5 cm × 3.1 cm on a mm ruler — both known to 2 sig figs]
→ P13[think-aloud: "Area = 2.5 × 3.1 = 7.75 cm². But each side was only known to 2 sig figs, so the answer can only be trusted to 2 sig figs: 7.8 cm². A result can't be more precise than the data it came from."]
→ P08[notation: "× and ÷ → keep the FEWEST sig figs of the inputs ; + and − → keep the fewest DECIMAL PLACES"]
→ P10[example: "12.11 + 0.3 = 12.4 (one decimal place, from 0.3) ; 4.0 × 2.5124 = 10 (2 sig figs, from 4.0)"]
→ P34[question: "6.0 cm × 4.25 cm — to how many sig figs, and what value?"] → P55
→ success_path → P49

[TA-4: Misconception Probe]
P02
→ P54 // 'result no more precise than inputs' is the load-bearing, counterintuitive rule
→ P41[diagnostic: "You divide 2.5 cm by 3 (a counted exact number) and the calculator shows 0.8333333. What do you report?"] → P55
→ [if "0.83, two sig figs — the 2.5 was 2 sig figs; the '3' is exact and doesn't limit it"] → P49 → P36[probe: "Why not 0.8333333?"] → P55
→ [if "0.8333333" / adds precision] → SIGNAL:MISCONCEPTION:MC-MORE-DIGITS-BETTER → misconception_repair_chain[MC-MORE-DIGITS-BETTER]

[TA-5: Formative Assessment]
P02
→ P90_expansion:
    P79[predict: "You'll multiply 3.14159 by a length measured as 2.0 cm. Before computing — how many sig figs can the answer honestly have?"] → P55
    → P49 → P51[check: did they limit to the 2-sig-fig measurement, or keep π's digits?]
    → P35[open: "Explain why writing more decimal places does NOT make a measurement more accurate."] → P55

[TA-6: Mastery Gate]
P02
→ P91_expansion:
    P77[generate: "Write a number with exactly 3 significant figures that includes a zero that DOES count and a zero that does NOT."] → P55 → CORRECT
    → P76[transfer: "A runner covers 100.0 m (measured) in 12.1 s (measured). Report the average speed to the correct precision."] → P55 → CORRECT
    → P75[boundary: "How many sig figs in a COUNTED quantity, like '3 trials'? Does it limit a calculation's precision?"] → P55 → CORRECT
    → P74[classify: "How many significant figures in 0.00420?"] → P55 → CORRECT (3)
    → P78[explain: "In your own words: what do significant figures tell you, and why can't a result be more precise than its measurements?"] → P55 → CORRECT
→ P68 → P62[schedule: first retrieval in 2 days]

### Protocol B — Counterexample-First
Serves: S1 ("fixed decimal-places" rote rule)
CPA entry: P
Entry condition: applies a fixed decimal count regardless of data precision.
Success exit: reports a calculation by sig-fig rules, overriding the fixed-decimal habit, citing the least-precise input.
Failure exit: if triggers MORE-DIGITS-BETTER → Misconception Engine → Protocol C.
Key deltas: open P02 → P41["your rule says '2 decimal places'. A value measured to the nearest metre is 5 m — write it to 2 decimals: 5.00 m. Does the ruler really know it to the centimetre?"] → P54 → P55; on the stall run P17 (decimal-places vs significant-figures) and P21; converge on TA-3 onward.

### Protocol C — Guided Questioning
Serves: S3 (partial), S2 (post-repair)
CPA entry: P
Entry condition: counts simple sig figs; mishandles zeros or propagation.
Success exit: handles a zero-ambiguous count and a division result correctly.
Failure exit: escalate to Protocol A TA-2 (rebuild zero rules with the annotated table).
Key deltas: enter at TA-2/3; P36/P51 probes; run P90/P91.

### Protocol D — Prerequisite Repair (S4)
Serves: S4; entry PREREQ-GAP-ERRORS; success = uncertainty↔last-digit link re-established → return to Protocol A TA-1; failure = schedule `phys.meas.errors`, suspend.

### Protocol F — Low Pressure (S6)
Serves: S6
CPA entry: C
Success exit: counts sig figs in two values calmly.
Failure exit: shorten, bank a win, reschedule.
Key deltas: NO P28 (V-10/GR-5); conflict replaced by P30 bridge; keep the annotated zero-rules table (P07) visible as a reference; P85 regulation_tail per TA.

### Protocol G — Challenge-First (S7 override)
Serves: S7; entry DB-3 4–5 with DB-2 = "all digits"; success = student revises the more-digits-better claim after the ruler contradiction; failure = Misconception Engine[MC-MORE-DIGITS-BETTER].
Key deltas: open with the P41 calculator-vs-ruler contradiction; let it sit (P55); P17 contrast; no premature confirmation.

## 6. Misconception Engine

### MC-MORE-DIGITS-BETTER: "More digits means a more accurate answer"
trigger_signal: student reports all calculator digits, or keeps more sig figs than the measurements support.
conflict_evidence [P28]: "Your ruler measures to the nearest millimetre. Your calculator says the area is 7.853975 cm². Which of those digits did the ruler actually measure? If it can't see past the millimetre, where did '.853975' come from?"
bridge_text [P30]: "Extra digits from a calculator are not measured — they're arithmetic noise. Significant figures show how precisely you actually measured. Writing more digits claims a precision your instrument never had."
replacement_text [P31]: "Report only the digits your measurement supports. A calculation's precision is limited by its least precise input."
discrimination_pairs [P33]: ["2.5 cm (2 sf) × 3.14159 → 7.9 cm² (2 sf), NOT 7.853975", "2.50 cm (3 sf) × 3.14159 → 7.85 cm² (3 sf)"]
s6_path: skip P28; compare the ruler and the calculator display side by side as a shared observation, then P30.

### MC-RESULT-EXCEEDS-INPUTS: "A calculated result can be more precise than the data"
trigger_signal: student reports a result with more sig figs / decimal places than any input measurement.
conflict_evidence [P28]: "Both sides of the rectangle were measured to 2 sig figs. If neither measurement is trustworthy past the second figure, how can their product suddenly be trustworthy to five figures?"
bridge_text [P30]: "Precision cannot be created by arithmetic. Multiplying or dividing keeps the fewest sig figs of the inputs; adding or subtracting keeps the fewest decimal places. Round once, at the end."
replacement_text [P31]: "A result is only as precise as its least precise measurement — never more."
discrimination_pairs [P33]: ["4.0 × 2.5124 → 10 (2 sf) ✓", "reporting 10.0496 ✗", "12.11 + 0.3 → 12.4 (1 dp), not 12.41"]
s6_path: skip P28; walk the 2-sf × 2-sf → 2-sf rule as a gentle shared rule, then P30.

## 7. Assessment Battery

| Probe | Item | Expected signal |
|---|---|---|
| P74 (classify) | "Sig figs in 0.00420?" | CORRECT = 3 |
| P74 (classify) | "Sig figs in 4002?" | CORRECT = 4 |
| P75 (boundary) | "Sig figs in a counted '3 trials' — and does it limit precision?" | CORRECT = exact/infinite; doesn't limit |
| P76 (transfer) | "100.0 m in 12.1 s — average speed to correct precision?" | CORRECT = 8.26 m/s (3 sf) |
| P77 (generate) | "3-sig-fig number with a zero that counts and one that doesn't." | CORRECT = e.g. 0.0205 |
| P78 (explain) | "What do sig figs tell you; why can't a result beat its inputs?" | CORRECT = precision statement |
| P79 (predict) | "3.14159 × (2.0 cm) — max sig figs the answer can honestly have?" | CORRECT = 2 |

## 8. Mastery Gate (P91 expansion — canonical order P77→P76→P75→P74→P78)
P77: "Write a 3-sig-fig number with a zero that counts and a zero that doesn't." → expected: CORRECT
P76: "100.0 m (measured) in 12.1 s (measured) — average speed to the correct precision." → expected: CORRECT
P75: "Sig figs in a counted quantity like '3 trials' — does it limit a calculation?" → expected: CORRECT
P74: "How many significant figures in 0.00420?" → expected: CORRECT (3)
P78: "In your own words: what sig figs tell you, and why a result can't be more precise than its measurements." → expected: CORRECT

## 9. Retrieval Schedule (P89 expansion)
Interval 1 (2 days): "State the sig figs in 0.0308, 5.600, and 4002."
Interval 2 (5 days): "6.0 cm × 4.25 cm — value to correct sig figs."
Interval 3 (10 days): "12.11 g + 0.3 g — value to correct precision, and why."
Interval 4 (21 days): "A density is mass 24.0 g / volume 3.1 cm³ — report it correctly."
Interval 5 (60 days): "Explain to a classmate why '7.853975 cm²' from a mm ruler is wrong to report."

---
V-check status:
- V-1 all 10 KG fields ✓ · V-2 NOT-clause ✓ · V-3 DB 2–3 Qs, every branch → state ✓ · V-4 every plausible state (S0,S1,S2,S3,S6[,S4 via PD-1]) has a Protocol ✓ · V-5 every Protocol success+failure exit ✓ · V-6 every TA opens P01/P02 ✓ · V-7 elicitations followed by P55 ✓ · V-8 no P08 without prior P06/P07 (TA-2) ✓ · V-9 Schema Repair via P41 gate (TA-4) ✓ · V-10 no P28 in S6 Protocol F ✓ · V-11 P91 terminal; P68→P62 ✓ · V-12 no >3 consecutive C without E break ✓ · V-13 P54 before high-difficulty first-attempt (TA-4, Protocol B) ✓ · V-14 assessment not first (TA-5/6) ✓ · V-15 Named Compounds expanded ✓ · V-16 IC-1..20 ✓ · V-17 AIR invariants per TA ✓ · V-18 P90 (TA-5) before P91 (TA-6) ✓ · V-19 P91 5 probes ✓ · V-20 P89 intervals authored ✓
status: READY
PACKAGE_READY
