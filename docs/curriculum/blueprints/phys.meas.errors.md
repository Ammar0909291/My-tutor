# Teaching Blueprint: phys.meas.errors

## 0. Concept Profile
concept_id: phys.meas.errors
name: Measurement Errors and Uncertainty
domain: Measurement & Units (Physics)
difficulty: developing (3)
bloom: apply
prerequisites: [phys.meas.units]
mastery_threshold: 0.75
estimated_hours: 3
cross_links: []
unlocks: [phys.meas.significant-figures]
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (repeated physical measurements before the notation of uncertainty; difficulty 3 → C with accelerated P track)
status: READY

## 1. Learning Objective

[Boundary statement]
A student who achieves mastery demonstrates:
1. States that **every measurement has uncertainty** and reports a measured value as best-estimate ± uncertainty (e.g. 12.4 ± 0.1 cm), reading the instrument's least count to set the uncertainty.
2. Distinguishes **systematic** error (a consistent offset — same direction every time; fixed by calibration) from **random** error (scatter — varies each trial; reduced by averaging repeats).
3. Reasons about the **consequence**: repeating and averaging reduces random error but NOT systematic error, and a precise (tight-scatter) result can still be inaccurate (wrong true value).

A student who reports a bare number with no uncertainty, or who thinks "taking more readings fixes a miscalibrated instrument," has **NOT** achieved mastery — that conflates precision with accuracy and propagates into every experimental result and significant-figures decision downstream.

## 2. Student State Matrix

| State | Why here | Tell-tale behaviour | Protocol |
|---|---|---|---|
| S0 | Never treated measurements as uncertain | Reports "the answer is 12.4 cm" as exact | Protocol A (Concrete) |
| S1 | "More decimals = more accurate" schema | Copies all display digits; equates digits with correctness | Protocol B (Counterexample-first) |
| S2-PRECISION-IS-ACCURACY | Believes tight, repeatable readings = correct value | Says a consistent reading must be the true value | Misconception Engine → Protocol C |
| S2-AVERAGING-FIXES-ALL | Thinks averaging removes any error | "Just take more readings" for a miscalibrated device | Misconception Engine → Protocol C |
| S3 | Knows measurements vary; can't classify error type | Reports a range; can't say systematic vs random | Protocol C (Guided Questioning) |
| S6 | Anxiety at ± notation and error arithmetic | Freezes at "± " and decimals | Protocol F (Low Pressure) |

## 3. Diagnostic Battery

DB-1 (prior-exposure check):
"When you measure something — say a length with a ruler — is the number you get exactly the true length, or could it be a little off? Have you met the idea of measurement uncertainty?"
  "Exactly true" / never met it → S0. Enter Protocol A (Concrete).
  "Could be a bit off" + has met uncertainty → DB-2.

DB-2 (representation / misconception test):
"Three students measure the same rod and each gets 12.41 cm, every time, very consistently — but the ruler's zero mark is worn away and starts at 2 mm. Is 12.41 cm the true length? Why?"
  "No — the worn zero shifts every reading the same way; consistent but wrong" → S3. Enter Protocol C.
  "Yes — they all agree, so it's right" → SIGNAL:MISCONCEPTION:MC-PRECISION-IS-ACCURACY. Enter Misconception Engine.
  "Just average more readings to fix it" → SIGNAL:MISCONCEPTION:MC-AVERAGING-FIXES-ALL. Enter Misconception Engine.
  Pause / "I don't know" → add S6 flag → confidence question → route (No→S6/F, Yes→S0/A).

DB-3 (confidence calibration):
"How confident are you with measurement error and uncertainty — 1 to 5?"
  1–2 → add S6 flag; apply S6 adaptations.
  4–5 + DB-2 wrong → add S7 flag; override to Protocol G (challenge-first).

## 4. Prerequisite Check

PD-1 (for `phys.meas.units`):
"What's the smallest division on a normal ruler, and what unit is it?"
  Cannot name a unit / least division → flag PREREQ-GAP-UNITS.
  In-session minimum repair: P06 with a real ruler — point to the mm divisions, name the unit — then resume. Deep gap → schedule `phys.meas.units` (S4 route).

## 5. Protocol Library

### Protocol A — Concrete-First (primary)
Serves: S0
CPA entry: C → P → A
Entry condition: no prior exposure (DB-1 = No).
Success exit: reports a measurement as best ± uncertainty AND correctly classifies a described error as systematic or random (P91 all 5 CORRECT).
Failure exit: on PRECISION-IS-ACCURACY / AVERAGING-FIXES-ALL signal → Misconception Engine, then resume TA-4. On ± arithmetic collapse → Protocol F.
Duration: ~50–60 min (may span 2 sessions).

[TA-1: Everyone Gets a Different Number]
P01
→ P04[content: "We're all going to measure the same thing — and we won't all get the same number. That's not a mistake; it's how measurement works."]
→ P06[content: each student measures the same pencil with a mm ruler; collect the readings — they scatter by a millimetre or two]
→ P34[question: "We measured ONE pencil. Why did we get slightly different numbers?"] → P55
→ success_path → P49 → P05[curiosity: "So what's the 'real' length — and how sure can we be?"]

[TA-2: Best Estimate ± Uncertainty]
P02
→ P06[content: read the pencil against the ruler; show that the end falls between two mm marks]
→ P13[think-aloud: "The end is between 124 and 125 mm — closest to 124. I can't be surer than the smallest division, so I write 124 mm give-or-take 1 mm: 124 ± 1 mm. Every measurement is a best estimate plus an uncertainty."]
→ P07[modality: a labelled reading — best estimate, ± half/one least-count, unit]
→ P08[notation: "12.4 ± 0.1 cm"]
// GR-3 satisfied: P06/P07 preceded P08 (V-8 PASS)
→ P34[question: "Read this scale and report the value as best ± uncertainty."] → P55
→ success_path → P49
→ failure_path → P50 → P52[narrow: "What's the smallest division? You can't be surer than that."] → re-elicit → P55

[TA-3: Two Kinds of Error — Scatter vs Offset]
P02
→ P07[modality: two dartboard pictures — (a) tight cluster far from bullseye; (b) loose spread centred on bullseye]
→ P16[compare: "Board A: tight but off-centre. Board B: spread but centred. Which shows a consistent offset? Which shows random scatter?"] → P55
→ success_path
→ P13[think-aloud: "A: systematic error — same offset every time, like a worn ruler zero. B: random error — scatter around the true value, like reaction-time jitter. Systematic = accuracy problem; random = precision problem."]
→ P34[question: "A stopwatch always started 0.3 s late. Systematic or random?"] → P55
→ success_path → P49

[TA-4: Consequence — What Fixes What]
P02
→ P54 // the precision≠accuracy consequence is the load-bearing, counterintuitive idea
→ P14[predict: "If an error is random, will taking more readings and averaging help? What if it's systematic?"] → P55
→ success_path → P15[observe: "Average the class's scattered pencil readings — the average sits near the middle, random error shrinks. But if every ruler had the same worn zero, the average is still 2 mm off."]
→ P21[generalise: "So what does averaging fix, and what does it never fix?"] → P55
→ success_path[averaging fixes random, not systematic]
→ P41[diagnostic: "A thermometer reads 2°C too high on every reading. You take 100 readings and average. Is the result now accurate?"] → P55
→ [if "no — still 2°C high; averaging can't fix a fixed offset"] → P49 → P36[probe: "What WOULD fix it?"] → P55
→ [if "yes, averaging fixes it"] → SIGNAL:MISCONCEPTION:MC-AVERAGING-FIXES-ALL → misconception_repair_chain[MC-AVERAGING-FIXES-ALL]

[TA-5: Formative Assessment]
P02
→ P90_expansion:
    P79[predict: "A digital balance shows 5.0000 g and is very repeatable, but was never zeroed and reads 0.3 g high. Before we discuss — is it precise? Is it accurate?"] → P55
    → P49 → P51[check: did they separate precision from accuracy, or fuse them?]
    → P35[open: "Explain how a result can be very precise and still very wrong."] → P55

[TA-6: Mastery Gate]
P02
→ P91_expansion:
    P77[generate: "Describe one systematic-error situation and one random-error situation from everyday measuring."] → P55 → CORRECT
    → P76[transfer: "In a timing experiment you press the stopwatch a bit late each time by different amounts. Which error type, and how would you reduce it?"] → P55 → CORRECT
    → P75[boundary: "Can a measurement be precise but not accurate? Give an example."] → P55 → CORRECT
    → P74[classify: "A ruler with a worn-off zero end gives errors that are systematic or random?"] → P55 → CORRECT
    → P78[explain: "In your own words: what does an uncertainty like ±0.1 cm mean, and why does averaging help random but not systematic error?"] → P55 → CORRECT
→ P68 → P62[schedule: first retrieval in 2 days]

### Protocol B — Counterexample-First
Serves: S1 ("more decimals = more accurate")
CPA entry: P
Entry condition: copies all display digits; equates digit count with correctness.
Success exit: reports an appropriately-uncertain value and rejects spurious digits, citing the instrument's least count.
Failure exit: if triggers PRECISION-IS-ACCURACY → Misconception Engine → Protocol C.
Key deltas: open P02 → P41["a calculator gives 12.416667 cm from a mm ruler — is the result really known to six decimals?"] → P54 → P55; on the stall run P17 (display digits vs instrument resolution) and P21 to extract "uncertainty is set by the instrument, not the display"; converge on TA-3 onward.

### Protocol C — Guided Questioning
Serves: S3 (partial), S2 (post-repair)
CPA entry: P
Entry condition: knows measurements vary; can't classify error type or its consequence.
Success exit: classifies systematic vs random and states what averaging fixes.
Failure exit: escalate to Protocol A TA-3 (rebuild with the dartboard contrast).
Key deltas: enter at TA-3; P36/P51 probes to surface partial ideas; run P90/P91.

### Protocol D — Prerequisite Repair (S4)
Serves: S4; entry PREREQ-GAP-UNITS; success = units/least-count re-established → return to Protocol A TA-1; failure = schedule `phys.meas.units`, suspend.

### Protocol F — Low Pressure (S6)
Serves: S6
CPA entry: C
Success exit: one measurement reported as best ± uncertainty, calmly.
Failure exit: shorten, bank a win, reschedule.
Key deltas: NO P28 (V-10/GR-5); conflict replaced by P30 bridge; keep the ± reading template (P07) visible; P85 regulation_tail per TA; framing "there's no exact answer to get wrong — every scientist reports a range."

### Protocol G — Challenge-First (S7 override)
Serves: S7; entry DB-3 4–5 with wrong DB-2; success = student revises the precision=accuracy claim after the worn-zero contradiction; failure = Misconception Engine[MC-PRECISION-IS-ACCURACY].
Key deltas: open with the P41 worn-zero case their claim mishandles; let it sit (P55); P17 contrast; no premature confirmation.

## 6. Misconception Engine

### MC-PRECISION-IS-ACCURACY: "Consistent, repeatable readings must be the true value"
trigger_signal: student treats low scatter / high repeatability as proof the value is correct.
conflict_evidence [P28]: "Three rulers all worn the same way give 12.41 cm every time — beautifully consistent. But they all start 2 mm past the true zero. Consistency here means they're consistently WRONG. Does agreeing with each other make it true?"
bridge_text [P30]: "Precision is how tightly readings cluster. Accuracy is how close they are to the true value. A systematic offset makes readings precise AND wrong at the same time."
replacement_text [P31]: "Judge precision by scatter, accuracy by closeness to the true value — they are independent. Check for offsets (calibration) separately from scatter (repeats)."
discrimination_pairs [P33]: ["tight cluster off-centre = precise, inaccurate", "wide spread centred = imprecise, accurate on average", "tight cluster on centre = precise AND accurate"]
s6_path: skip P28; present the dartboards (P07) as a shared observation and go straight to bridge_text (P30).

### MC-AVERAGING-FIXES-ALL: "Taking more readings and averaging removes any error"
trigger_signal: student proposes averaging as the fix for a described systematic (fixed-offset) error.
conflict_evidence [P28]: "A thermometer reads 2°C high on every single reading. You average 100 of them. Each one is 2°C high — so what is the average? Still 2°C high. Where did the averaging help?"
bridge_text [P30]: "Averaging cancels error that scatters both ways (random). A systematic error pushes every reading the SAME way, so it survives the average untouched. It needs calibration, not repetition."
replacement_text [P31]: "Reduce random error by repeating and averaging; remove systematic error by calibrating or correcting the instrument."
discrimination_pairs [P33]: ["reaction-time jitter (random → averaging helps)", "un-zeroed balance (systematic → averaging useless)", "worn ruler zero (systematic → subtract the offset)"]
s6_path: skip P28; walk the "each reading 2° high → average still 2° high" as a gentle shared calculation, then P30.

## 7. Assessment Battery

| Probe | Item | Expected signal |
|---|---|---|
| P74 (classify) | "A stopwatch always starts 0.3 s late: systematic or random?" | CORRECT = systematic |
| P74 (classify) | "Scatter from pressing a timer at slightly different moments: systematic or random?" | CORRECT = random |
| P75 (boundary) | "Can a result be precise but inaccurate? Example?" | CORRECT = yes; offset case |
| P76 (transfer) | "You weigh a sample 5 times on an un-zeroed balance and average. Accurate now? Why?" | CORRECT = no; systematic survives averaging |
| P77 (generate) | "Give one systematic and one random error from everyday measuring." | CORRECT = valid pair |
| P78 (explain) | "What does ±0.1 cm mean, and why report it?" | CORRECT = range set by least count |
| P79 (predict) | "Very repeatable balance never zeroed, reads 0.3 g high — precise? accurate?" | CORRECT = precise, not accurate |

## 8. Mastery Gate (P91 expansion — canonical order P77→P76→P75→P74→P78)
P77: "Describe one systematic-error and one random-error everyday situation." → expected: CORRECT
P76: "You press a stopwatch late by varying amounts each trial — error type, and how to reduce it?" → expected: CORRECT
P75: "Can a measurement be precise but not accurate? Give an example." → expected: CORRECT
P74: "A ruler with a worn-off zero: systematic or random error?" → expected: CORRECT
P78: "In your own words: what ±0.1 cm means, and why averaging fixes random but not systematic error." → expected: CORRECT

## 9. Retrieval Schedule (P89 expansion)
Interval 1 (2 days): "Read a scale and report the value as best estimate ± uncertainty."
Interval 2 (5 days): "Classify three described errors as systematic or random."
Interval 3 (10 days): "A balance reads 0.5 g high on everything. You average 50 readings — accurate? Explain."
Interval 4 (21 days): "Sketch two dartboards showing (i) precise-but-inaccurate and (ii) imprecise-but-accurate."
Interval 5 (60 days): "Design a quick check to decide whether an instrument has a systematic error, and say how you'd correct it."

---
V-check status:
- V-1 all 10 KG fields ✓ · V-2 NOT-clause ✓ · V-3 DB 2–3 Qs, every branch → state ✓ · V-4 every plausible state (S0,S1,S2,S3,S6[,S4 via PD-1]) has a Protocol ✓ · V-5 every Protocol success+failure exit ✓ · V-6 every TA opens P01/P02 ✓ · V-7 elicitations followed by P55 ✓ · V-8 no P08 without prior P06/P07 (TA-2) ✓ · V-9 Schema Repair via P41 gate (TA-4) ✓ · V-10 no P28 in S6 Protocol F ✓ · V-11 P91 terminal; P68→P62 ✓ · V-12 no >3 consecutive C without E break ✓ · V-13 P54 before high-difficulty first-attempt (TA-4, Protocol B) ✓ · V-14 assessment not first (TA-5/6) ✓ · V-15 Named Compounds expanded ✓ · V-16 IC-1..20 ✓ · V-17 AIR invariants per TA ✓ · V-18 P90 (TA-5) before P91 (TA-6) ✓ · V-19 P91 5 probes ✓ · V-20 P89 intervals authored ✓
status: READY
PACKAGE_READY
