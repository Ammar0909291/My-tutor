# Teaching Blueprint: phys.meas.unit-conversion

## 0. Concept Profile
concept_id: phys.meas.unit-conversion
name: Unit Conversion and Prefixes
domain: Measurement & Units (Physics)
difficulty: foundational (1)
bloom: apply
prerequisites: [phys.meas.units]
mastery_threshold: 0.7
estimated_hours: 1
cross_links: []
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (concrete quantities before factor-label notation; difficulty ≤ 2)
status: READY

## 1. Learning Objective

[Boundary statement]
A student who achieves mastery demonstrates:
1. Converts a quantity between two units of the same dimension (e.g. 3.2 km → 3200 m; 250 mg → 0.25 g) and states, without prompting, that the **physical quantity is unchanged** — only its description changes.
2. Correctly chooses the **direction** of the factor: converting to a *smaller* unit yields a *larger* number, and to a *larger* unit a *smaller* number — and can justify why by reasoning about the size of the unit, not by recalling "move the decimal left/right."
3. Applies SI prefixes (milli, centi, kilo, mega, micro) as multiplicative magnitudes (10⁻³, 10⁻², 10³, 10⁶, 10⁻⁶), including on an unfamiliar prefix when told its power of ten.

A student who can "move the decimal three places" mechanically but produces `5 km = 5 m` or cannot say which way to move the decimal for an unfamiliar prefix has **NOT** achieved mastery — the procedure without the size-of-unit reasoning fails at every non-metric, compound, or unfamiliar-prefix conversion downstream (density, unit-consistency checks, dimensional analysis).

## 2. Student State Matrix

| State | Why here | Tell-tale behaviour | Protocol |
|---|---|---|---|
| S0 | No exposure to prefixes or conversion | Cannot express 1 km in metres in any form | Protocol A (Concrete) |
| S1 | "Move the decimal" schema with no grounding | Converts metric fluently but cannot say *which way* or handle a new prefix | Protocol B (Counterexample-first) |
| S2-INVERSE-DIRECTION | Believes bigger unit → bigger number | Writes 2000 m = 2000 km, or multiplies when should divide | Misconception Engine → then Protocol C |
| S3 | Partial — simple metric OK; fails prefixes/compound | Does cm↔m; fails mg↔kg or km/h→m/s | Protocol C (Guided Questioning) |
| S6 | Anxiety on unit arithmetic | Freezes at "convert…"; disengages on decimals | Protocol F (Low Pressure) |
| S9 | Non-metric (imperial) measurement background | Reasons in miles/pounds; unfamiliar with base-10 prefixes | Protocol A with S9 adaptations |

## 3. Diagnostic Battery

DB-1 (prior-exposure check — routes S0 before content is tested):
"Have you used units like kilometres, grams, or millilitres — and changed a measurement from one unit to another before?"
  No → S0. Enter Protocol A (Concrete).
  Yes → DB-2.

DB-2 (representation / misconception test):
"A road is 3 kilometres long. How many metres is that? Tell me how you worked it out."
  "3000 m" + cites "1 km = 1000 m, and a metre is smaller so I need more of them" → S3. Enter Protocol C.
  "3000 m" (no reason / "just move the decimal") → S1. Enter Protocol B.
  "3 m" or "0.003 m" or multiplies the wrong way → SIGNAL:MISCONCEPTION:MC-INVERSE-DIRECTION. Enter Misconception Engine.
  Pause / "I don't know" → add S6 flag. Ask: "Are you comfortable with maths and decimals generally?"
      No → S6. Enter Protocol F.
      Yes → S0. Enter Protocol A.

DB-3 (confidence calibration — overlays S6/S7):
"How confident are you with converting units — 1 to 5?"
  1–2 → add S6 flag; apply S6 adaptations to the selected protocol.
  4–5 + DB-2 showed INVERSE-DIRECTION → add S7 flag. Override to Protocol G (challenge-first): expose the contradiction before any confirmation.

## 4. Prerequisite Check

PD-1 (for `phys.meas.units`):
"What does it mean to measure something in a unit — say, what is a 'metre'?"
  Cannot express that a unit is an agreed reference quantity you count → flag PREREQ-GAP-UNITS.
  In-session minimum repair: one P06 anchor (a physical metre stick / 1-litre bottle) + one P34 ("how many of these fit in…") to re-establish "measuring = counting agreed units," then resume. If the gap is deep (cannot count agreed units at all), suspend this concept and schedule a `phys.meas.units` session (S4 route).

## 5. Protocol Library

### Protocol A — Concrete-First (primary)
Serves: S0, S9
CPA entry: C
Entry condition: no prior conversion exposure (DB-1 = No), or S9 non-metric background.
Success exit: student converts a novel same-dimension pair correctly AND states the quantity is unchanged (P91 all 5 probes CORRECT).
Failure exit: on repeated INVERSE-DIRECTION signal → enter Misconception Engine[MC-INVERSE-DIRECTION], then resume at TA-3. On decimal-arithmetic collapse → escalate to Protocol F.
Duration: ~45–55 min (may span 2 sessions; session_cap 7 TAs).

[TA-1: Concrete Quantity Anchor]
P01
→ P04[content: "We're going to measure the same thing two ways — and notice the measurement never actually changes, only the words do."]
→ P06[content: a 1-metre stick marked in cm and mm; student counts: 1 stick = 100 cm = 1000 mm]
→ P14[predict: "If I measure this desk and it's 2 sticks long, how many centimetres is that?"] → P55
→ success_path → P49 → P05[curiosity: "The desk didn't grow when we said '200 cm' instead of '2 m'. So what actually changed?"]

[TA-2: The Size-of-Unit Insight]
P02
→ P06[content: fill a 1-litre bottle from a 100-millilitre cup — student counts 10 cups = 1 litre]
→ P17[contrast: "It took 10 of the small cups to make 1 litre. The cup is smaller than the litre — so did we need MORE of them or FEWER?"] → P55
→ success_path[MORE]
→ P13[think-aloud: "Here's the whole idea: the amount of water is fixed. A smaller unit is a smaller measuring scoop, so you need MORE scoops to describe the same amount. Bigger unit → fewer; smaller unit → more."]
→ P34[question: "So changing to a smaller unit makes the number bigger or smaller?"] → P55
→ success_path → P49

[TA-3: Naming the Factor — Notation]
P02
→ P06[content: metre stick again, focus on the 1 m = 1000 mm relationship]
→ P13[think-aloud: "To go from metres to millimetres, each metre is 1000 millimetres — so I multiply by 1000. Metres → millimetres: smaller unit, bigger number, ×1000."]
→ P08[notation: "3 m = 3 × 1000 mm = 3000 mm ; 3000 mm = 3000 ÷ 1000 m = 3 m"]
// GR-3 satisfied: P06 (concrete) and P13 preceded P08 (V-8 PASS)
→ P10[example: "Worked: convert 2.5 km to m. 1 km = 1000 m (smaller unit → more) → 2.5 × 1000 = 2500 m."]
→ P34[question: "Now convert 4 km to metres, and tell me: bigger number or smaller?"] → P55
→ success_path → P49
→ failure_path → P50 → P51[diagnose: did they pick the wrong direction (→MC) or mis-arithmetic?] → P52[narrow: "Is a metre bigger or smaller than a kilometre? So do you need more metres or fewer?"] → re-elicit P34 → P55

[TA-4: SI Prefixes as Magnitudes]
P02
→ P07[modality: prefix ladder table — micro(10⁻⁶) milli(10⁻³) centi(10⁻²) [base 10⁰] kilo(10³) mega(10⁶)]
→ P16[compare: "Milli is 10⁻³, kilo is 10³. Which describes a smaller unit? Which will give a bigger number when you convert INTO it?"] → P55
→ success_path → P21[generalise: "A prefix is just a power of ten telling you how big the unit is. Tell me the rule for which way the number moves."] → P55
→ success_path → P49
→ P41[diagnostic: "Convert 250 mg to grams."] → P55
→ [if divides correctly, 0.25 g] → P49 → P36[probe: "Why did the number get smaller this time?"] → P55
→ [if 250000 g or 250 g] → SIGNAL:MISCONCEPTION:MC-INVERSE-DIRECTION → misconception_repair_chain[MC-INVERSE-DIRECTION]

[TA-5: Formative Assessment]
P02
→ P90_expansion:
    P79[predict: "I'm about to convert 5 kilometres into centimetres. Before we compute — will the number be much bigger or much smaller than 5?"] → P55
    → P49 → P51[check: did they reason 'centimetre is far smaller → far bigger number', or guess?]
    → P35[open: "Explain, without the words 'move the decimal', how you know which way the number changes when you convert."] → P55

[TA-6: Mastery Gate]
P02
→ P91_expansion:
    P77[generate: "Invent a conversion where the NUMBER gets smaller. Give the two units and why."] → P55 → CORRECT
    → P76[transfer: "A recipe needs 0.5 kg of flour. The scale reads in grams. What number are you aiming for, and how do you know?"] → P55 → CORRECT
    → P75[boundary: "I invent a new unit, the 'blip', where 1 blip = 1000 metres. Convert 3 km to blips — and is 3 km a bigger or smaller number in blips?"] → P55 → CORRECT
    → P74[classify: "Converting 4000 mm to metres — do you multiply or divide by 1000?"] → P55 → CORRECT
    → P78[explain: "In your own words: when you convert a measurement to a different unit, why does the physical quantity stay the same while the number changes?"] → P55 → CORRECT
→ P68 → P62[schedule: first retrieval in 1 day]

### Protocol B — Counterexample-First
Serves: S1 (procedure without grounding)
CPA entry: P (they have the procedure; expose its limit)
Entry condition: fluent metric conversion, no size-of-unit reasoning, cannot handle unfamiliar prefix.
Success exit: correctly converts using a NAMED unfamiliar prefix (given its power of ten) and justifies direction by unit size.
Failure exit: if the counterexample triggers INVERSE-DIRECTION → Misconception Engine, then Protocol C.
Key deltas from A: skip TA-1/TA-2 concrete anchors; open with P02 → P41["Convert 4 megametres to metres" — an unfamiliar prefix their decimal-rule can't place] → P54 (novel) → P55; on the inevitable stall, run P17 contrasting a known prefix, then P21 to extract the size-of-unit rule; converge on TA-4 onward.

### Protocol C — Guided Questioning
Serves: S3 (partial schema), S2 (post-repair)
CPA entry: P
Entry condition: simple metric correct; fails prefixes or compound units.
Success exit: converts a compound/multi-prefix case (e.g. mg → kg) correctly with stated direction.
Failure exit: escalate to Protocol A TA-2 (rebuild the size-of-unit insight concretely).
Key deltas: enter at TA-4 (prefix ladder); use P35/P36 probes to surface the partial rule, extend via P21; run the P90/P91 gate.

### Protocol F — Low Pressure (S6)
Serves: S6 (anxiety)
CPA entry: C
Entry condition: S6 flag confirmed.
Success exit: one correct novel conversion produced calmly.
Failure exit: shorten session, bank one success, reschedule.
Key deltas: NO P28 anywhere (V-10 / GR-5); replace any conflict step with P30 bridge directly; success density ~90%; P85 regulation_tail on every TA; framing "there's nothing to get wrong — we're just re-describing the same amount."

### Protocol G — Challenge-First (S7 override)
Serves: S7 (overconfident + INVERSE-DIRECTION in DB-2)
CPA entry: P
Entry condition: DB-3 confidence 4–5 with a wrong DB-2.
Success exit: student revises their own rule after the contradiction and converts correctly.
Failure exit: Misconception Engine[MC-INVERSE-DIRECTION].
Key deltas: open with P41 boundary case that their rule gets wrong, let the mismatch sit (P55, wait), then P17 contrast; no premature confirmation.

**S9 adaptations (applied within Protocol A):** at TA-1/TA-2 use an object the S9 learner already measures in imperial (a 12-inch ruler alongside the 30 cm marks) for the P06 anchor; name the base-10 regularity explicitly as the *advantage* over their prior system ("no 12s or 16s here — every step is ×10"); defer P08 one TA later; add P13 narration on every notation step.

## 6. Misconception Engine

### MC-INVERSE-DIRECTION: "A bigger unit gives a bigger number"
trigger_signal: student scales the wrong way — e.g. `2000 m = 2000 km`, or multiplies when converting to a larger unit / divides when converting to a smaller one.
conflict_evidence [P28]: "Here's a 1-metre stick and here are 100 centimetre-marks on it. The stick is ONE metre. Count the centimetres — that's a hundred. So the SAME stick is '1' in metres but '100' in centimetres. Did the stick get longer when the number jumped from 1 to 100?"
bridge_text [P30]: "The quantity never changed — only the size of the measuring unit did. A centimetre is a smaller scoop than a metre, so you need MORE of them for the same length. Smaller unit → bigger number; bigger unit → smaller number."
replacement_text [P31]: "To convert, ask 'is the new unit smaller or bigger?' Smaller new unit → the number goes up (multiply). Bigger new unit → the number goes down (divide)."
discrimination_pairs [P33]: ["3 km → m (bigger→smaller unit, number goes UP ×1000) vs 3 mm → m (smaller→bigger unit, number goes DOWN ÷1000)", "250 mg → g (÷1000, smaller number) vs 250 g → mg (×1000, bigger number)"]
s6_path: skip P28; go directly to bridge_text via P30, using the same metre-stick object but framed as a shared observation, not a challenge.

### MC-PREFIX-BLIND: "Prefixes are memorised decimal shifts with no size meaning"
trigger_signal: student converts familiar prefixes by rote ("kilo = add three zeros") but cannot place an unfamiliar prefix (mega, micro) or picks the wrong power of ten.
conflict_evidence [P28]: "You said 'kilo means add three zeros.' Convert 4 MEGAmetres to metres. If mega is bigger than kilo, is 'add three zeros' enough?"
bridge_text [P30]: "Each prefix is a power of ten that tells you how big the unit is: milli 10⁻³, centi 10⁻², kilo 10³, mega 10⁶, micro 10⁻⁶. Once you know the power, the direction rule (smaller unit → bigger number) tells you which way to move."
replacement_text [P31]: "Read the prefix as its power of ten, decide if the new unit is smaller or bigger, then multiply or divide accordingly."
discrimination_pairs [P33]: ["mega (10⁶) vs milli (10⁻³): opposite sides of the base unit", "milli (10⁻³) vs micro (10⁻⁶): both small, differ by 10³"]
s6_path: skip P28; introduce the prefix ladder (P07) as a reference chart the student keeps, removing recall pressure.

## 7. Assessment Battery

| Probe | Item | Expected signal |
|---|---|---|
| P74 (classify) | "To convert 4000 mm to metres, do you multiply or divide by 1000?" | CORRECT = divide (bigger unit → smaller number) |
| P74 (classify) | "Milli and kilo — which one makes a SMALLER unit?" | CORRECT = milli |
| P75 (boundary) | "1 'flim' = 1,000,000 metres. Is 5,000,000 m a big or small number of flims?" | CORRECT = small (5 flims); bigger unit → smaller number |
| P76 (transfer) | "A car's speed is 72 km/h. Roughly how many metres does it cover in one second? Reason it out." | CORRECT = uses km→m and h→s directions (20 m/s) |
| P77 (generate) | "Give me a conversion where the number gets bigger, and one where it gets smaller." | CORRECT = both, with correct direction |
| P78 (explain) | "Why does the number change when you convert, even though the thing you measured doesn't?" | CORRECT = cites size of unit / same quantity |
| P79 (predict) | "Before computing: convert 3 kg to milligrams — will the number be much bigger or much smaller than 3?" | CORRECT = much bigger (mg far smaller unit) |

## 8. Mastery Gate (P91 expansion — canonical order P77→P76→P75→P74→P78)
P77: "Invent a conversion where the NUMBER gets smaller — give the two units and why." → expected: CORRECT
P76: "A recipe needs 0.5 kg of flour; the scale reads grams. What number are you aiming for, and how do you know?" → expected: CORRECT
P75: "1 blip = 1000 metres. Convert 3 km to blips — and is that a bigger or smaller number than 3?" → expected: CORRECT
P74: "Converting 4000 mm to metres — multiply or divide by 1000?" → expected: CORRECT
P78: "In your own words: when you convert a measurement, why does the physical quantity stay the same while the number changes?" → expected: CORRECT

## 9. Retrieval Schedule (P89 expansion)
Interval 1 (1 day): "Convert 2.5 km to metres — and tell me which way the number moved and why."
Interval 2 (3 days): "Convert 750 mg to grams; then 0.4 kg to grams."
Interval 3 (7 days): "Order these lengths smallest to largest: 500 mm, 2 cm, 0.001 km."
Interval 4 (21 days): "A wire is 1500 micrometres thick. Express it in millimetres and in metres."
Interval 5 (60 days): "A tap runs at 6 litres per minute. How many millilitres per second? Reason out both conversions."

---
V-check status:
- V-1 all 10 KG fields present ✓ · V-2 objective has NOT-clause ✓ · V-3 DB 2–3 Qs, every branch → a state ✓ · V-4 every plausible state (S0,S1,S2,S3,S6,S9) has a Protocol ✓ · V-5 every Protocol has success AND failure exit ✓ · V-6 every TA opens P01/P02 ✓ · V-7 every elicitation (P34/P35/P41) followed by P55 ✓ · V-8 no P08 without prior P06/P07 (TA-3) ✓ · V-9 Schema Repair entered only via P41 gate (TA-4) ✓ · V-10 no P28 in S6 Protocol F ✓ · V-11 P91 terminal; P68 then P62 follow ✓ · V-12 no >3 consecutive C-category without E break ✓ · V-13 P54 before high-difficulty first-attempt (Protocol B TA-open) ✓ · V-14 assessment TA not first (TA-5/6) ✓ · V-15 Named Compounds (P90/P91) expanded ✓ · V-16 IC-1..20 pass ✓ · V-17 AIR invariants pass per TA ✓ · V-18 P90 (TA-5) before P91 (TA-6) ✓ · V-19 P91 has all 5 probes ✓ · V-20 P89 schedule authored with specific intervals ✓
status: READY
PACKAGE_READY
