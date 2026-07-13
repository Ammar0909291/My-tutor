# Teaching Blueprint: phys.meas.dimensions

## 0. Concept Profile
concept_id: phys.meas.dimensions
name: Dimensional Analysis
domain: Measurement & Units (Physics)
difficulty: developing (3)
bloom: apply
prerequisites: [phys.meas.units]
mastery_threshold: 0.75
estimated_hours: 3
cross_links: []
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (physical quantities you can point at → their dimension type; difficulty 3 → C with accelerated P track)
status: READY

## 1. Learning Objective

[Boundary statement]
A student who achieves mastery demonstrates:
1. Assigns the dimensional formula ([M], [L], [T] and combinations) to a physical quantity from its definition — e.g. speed = length/time → [L][T]⁻¹; force = mass×acceleration → [M][L][T]⁻² — not by recalling a memorised list.
2. Uses the **principle of homogeneity** to check an equation: every additive term and both sides must share the same dimensions; declares an equation dimensionally inconsistent when they do not.
3. Distinguishes a **dimension** (the *type* of quantity — length) from a **unit** (the *scale* used to measure it — m, cm, ft), and states that changing units never changes dimensions.

A student who can recite "[force] = MLT⁻²" but cannot check whether `s = ut + ½at²` is dimensionally consistent, or who says metres and feet are "different dimensions," has **NOT** achieved mastery — the memorised formula without the homogeneity reasoning and the dimension/unit distinction fails at every equation-checking and derived-quantity task downstream.

## 2. Student State Matrix

| State | Why here | Tell-tale behaviour | Protocol |
|---|---|---|---|
| S0 | Never met "dimensions" as distinct from units | Cannot say what "type" of quantity speed is | Protocol A (Concrete) |
| S1 | "Just check the units match" schema | Checks unit strings; fails when units differ but dimensions agree (km/h vs m/s) | Protocol B (Counterexample-first) |
| S2-UNITS-ARE-DIMENSIONS | Conflates unit with dimension | Says m and ft are different dimensions; thinks converting units changes dimensional formula | Misconception Engine → Protocol C |
| S3 | Finds dimensions of base quantities; fails derived | OK on length/time; stuck on force, energy, pressure | Protocol C (Guided Questioning) |
| S4 | Prerequisite gap on units | Cannot express what a unit is | Protocol D → prereq repair |
| S6 | Anxiety at the symbolic [M][L][T] notation | Freezes at the bracket notation | Protocol F (Low Pressure) |

## 3. Diagnostic Battery

DB-1 (prior-exposure check):
"Have you come across the idea that quantities like length, time and mass are different *kinds* of thing — and that we write them as dimensions?"
  No → S0. Enter Protocol A (Concrete).
  Yes → DB-2.

DB-2 (representation / misconception test):
"Speed can be measured in metres per second, or in kilometres per hour. Are those two the same *kind* of quantity, or different kinds? Why?"
  "Same kind — both are length over time" → S3. Enter Protocol C.
  "Same, both speed" (no reason) → S1. Enter Protocol B.
  "Different — different units / different dimensions" → SIGNAL:MISCONCEPTION:MC-UNITS-ARE-DIMENSIONS. Enter Misconception Engine.
  Pause / "I don't know" → add S6 flag → confidence question → route (No→S6/Protocol F, Yes→S0/Protocol A).

DB-3 (confidence calibration):
"How confident are you with dimensional analysis — 1 to 5?"
  1–2 → add S6 flag; apply S6 adaptations.
  4–5 + DB-2 wrong → add S7 flag; override to Protocol G (challenge-first).

## 4. Prerequisite Check

PD-1 (for `phys.meas.units`):
"Give me an example of a physical quantity and a unit we measure it in."
  Cannot produce a quantity+unit pair → flag PREREQ-GAP-UNITS.
  In-session minimum repair: one P06 anchor (metre stick, stopwatch, mass) naming quantity↔unit, then resume. If the gap is that units themselves are unclear, suspend and schedule a `phys.meas.units` session (S4 route, Protocol D).

## 5. Protocol Library

### Protocol A — Concrete-First (primary)
Serves: S0
CPA entry: C → P → A
Entry condition: no prior exposure (DB-1 = No).
Success exit: assigns the dimensional formula to a derived quantity AND checks a simple equation for homogeneity (P91 all 5 CORRECT).
Failure exit: on UNITS-ARE-DIMENSIONS signal → Misconception Engine, then resume TA-3. On symbolic collapse → Protocol F.
Duration: ~50–60 min (may span 2 sessions).

[TA-1: Three Kinds of Thing]
P01
→ P04[content: "Some measurements are lengths, some are times, some are masses. Different KINDS. Today we name the kinds."]
→ P06[content: on the table — a ruler (length), a stopwatch (time), a mass on a scale (mass); student sorts three more cards (a run distance, a lap time, a bag of flour) into the three kinds]
→ P34[question: "What KIND of quantity is 'how long the race track is'? What kind is 'how long the race took'?"] → P55
→ success_path → P49 → P05[curiosity: "Could you ever add a length to a time and get something sensible?"]

[TA-2: Dimension vs Unit]
P02
→ P06[content: the same length shown on a metre stick (metres) and a 12-inch ruler (inches/feet)]
→ P17[contrast: "Same edge of the desk, measured in metres and in feet. Different numbers, different units — but is it a different KIND of quantity?"] → P55
→ success_path[same kind]
→ P13[think-aloud: "The KIND is 'length' — we call that its dimension, written [L]. The metre or the foot is just the SCALE — the unit. Same dimension, different units. Changing units never changes the dimension."]
→ P34[question: "So do metres and feet have the same dimension or different?"] → P55
→ success_path → P49

[TA-3: Naming Dimensions — Notation]
P02
→ P07[modality: a small table — length [L], time [T], mass [M] with an everyday example each]
→ P13[think-aloud: "Speed is length divided by time. Its dimension is [L] divided by [T], written [L][T]⁻¹. We build every quantity's dimension from [M], [L], [T]."]
→ P08[notation: "speed = [L][T]⁻¹ ; acceleration = [L][T]⁻² ; force = mass × acceleration = [M][L][T]⁻²"]
// GR-3 satisfied: P06/P07 preceded P08 (V-8 PASS)
→ P10[example: "Worked: dimension of area = length × length = [L]². Dimension of density = mass/volume = [M][L]⁻³."]
→ P34[question: "Work out the dimension of *volume*."] → P55
→ success_path → P49
→ failure_path → P50 → P51[diagnose: unit/dimension confusion or build error?] → P52[narrow: "Volume is length × length × length — so [L] times [L] times [L] is…?"] → re-elicit → P55

[TA-4: The Homogeneity Principle]
P02
→ P54 // homogeneity is the novel, load-bearing idea; productive struggle expected
→ P14[predict: "Here's an equation: distance = speed × time. Do you think the two sides have the same dimension? Predict before we check."] → P55
→ success_path → P15[observe: "Left: [L]. Right: [L][T]⁻¹ × [T] = [L]. They match."]
→ P21[generalise: "What must be true about every valid physics equation, dimension-wise?"] → P55
→ success_path[both sides / all added terms same dimension]
→ P41[diagnostic: "Is s = ut + ½at² dimensionally consistent? Check each term."] → P55
→ [if checks each term = [L]] → P49 → P36[probe: "What would it mean if one term had a different dimension?"] → P55
→ [if adds unlike dimensions / says 'the ½ matters'] → SIGNAL:MISCONCEPTION:MC-ADD-ACROSS-DIMENSIONS → misconception_repair_chain[MC-ADD-ACROSS-DIMENSIONS]

[TA-5: Formative Assessment]
P02
→ P90_expansion:
    P79[predict: "I'll give you 'pressure = force / area'. Before computing — will its dimension contain [M]? Why?"] → P55
    → P49 → P51[check: did they build from force and area, or guess?]
    → P35[open: "Explain how dimensional analysis can catch a mistake in an equation without you knowing any physics of that equation."] → P55

[TA-6: Mastery Gate]
P02
→ P91_expansion:
    P77[generate: "Invent a dimensionally INCONSISTENT equation and say which term breaks it."] → P55 → CORRECT
    → P76[transfer: "Kinetic energy is ½mv². Show its dimension, and check it matches work = force × distance."] → P55 → CORRECT
    → P75[boundary: "Can dimensional analysis prove an equation is fully correct, or only catch some errors? Explain."] → P55 → CORRECT
    → P74[classify: "Do 'metres' and 'feet' have the same dimension or different dimensions?"] → P55 → CORRECT
    → P78[explain: "In your own words: what is the difference between a dimension and a unit, and what does homogeneity require?"] → P55 → CORRECT
→ P68 → P62[schedule: first retrieval in 2 days]

### Protocol B — Counterexample-First
Serves: S1 ("units match" procedure)
CPA entry: P
Entry condition: checks unit strings, not dimension types.
Success exit: correctly judges consistency of an equation whose terms use *different units of the same dimension* (km vs m), citing dimensions not unit strings.
Failure exit: if triggers UNITS-ARE-DIMENSIONS → Misconception Engine → Protocol C.
Key deltas: open P02 → P41["Is `distance(km) = speed(m/s) × time(s)` consistent? Their unit strings don't match — is the equation wrong?"] → P54 → P55; on the stall, run P17 (unit vs dimension) and P21 to extract homogeneity; converge on TA-4 onward.

### Protocol C — Guided Questioning
Serves: S3 (partial), S2 (post-repair)
CPA entry: P
Entry condition: base-quantity dimensions OK; fails derived/compound.
Success exit: builds the dimension of a derived quantity (force/energy/pressure) and homogeneity-checks an equation.
Failure exit: escalate to Protocol A TA-2/TA-3 to rebuild dimension-from-definition concretely.
Key deltas: enter at TA-3; heavy P36/P51 to surface the build rule; run P90/P91.

### Protocol D — Prerequisite Repair (S4)
Serves: S4
Entry condition: PREREQ-GAP-UNITS confirmed.
Success exit: units re-established; return to Protocol A TA-1.
Failure exit: schedule dedicated `phys.meas.units` session; suspend this concept.

### Protocol F — Low Pressure (S6)
Serves: S6
CPA entry: C
Success exit: one correct dimension assigned calmly.
Failure exit: shorten, bank a win, reschedule.
Key deltas: NO P28 (V-10/GR-5); conflict replaced by P30 bridge; keep the [M][L][T] table (P07) visible as a reference chart to remove recall load; P85 regulation_tail per TA.

### Protocol G — Challenge-First (S7 override)
Serves: S7
Entry condition: DB-3 confidence 4–5 with a wrong DB-2.
Success exit: student revises their unit=dimension claim after the contradiction.
Failure exit: Misconception Engine[MC-UNITS-ARE-DIMENSIONS].
Key deltas: open with P41 (same-dimension different-unit case) that their claim mishandles; let the mismatch sit (P55); P17 contrast; no premature confirmation.

## 6. Misconception Engine

### MC-UNITS-ARE-DIMENSIONS: "Different units mean different dimensions"
trigger_signal: student claims m and ft (or m/s and km/h) are different dimensions, or that converting units changes the dimensional formula.
conflict_evidence [P28]: "This desk edge is 1.5 metres — and also about 5 feet. Same edge. If metres and feet were different *kinds* of quantity, the desk would have to be two different kinds of thing at once. Is it?"
bridge_text [P30]: "The KIND of quantity — length — is the dimension, [L]. The metre and the foot are just two scales for measuring that same kind. Dimension is the type; unit is the scale."
replacement_text [P31]: "Changing units never changes dimensions. Convert freely between units; the dimension stays [L] (or whatever the quantity's type is)."
discrimination_pairs [P33]: ["metres vs feet: same dimension [L], different unit", "m/s vs km/h: same dimension [L][T]⁻¹, different unit", "seconds vs metres: DIFFERENT dimension ([T] vs [L])"]
s6_path: skip P28; present the desk-in-two-units as a shared observation and go straight to bridge_text (P30).

### MC-ADD-ACROSS-DIMENSIONS: "Terms with different dimensions can be added if the numbers work"
trigger_signal: student equates or adds quantities of different dimensions (a length + a time), or thinks a numerical coefficient (½) affects dimensional consistency.
conflict_evidence [P28]: "You added a length and a time. What would '3 metres + 5 seconds' physically be — a length? a time? Point to what the answer measures."
bridge_text [P30]: "Only quantities of the SAME dimension can be added or set equal — like only adding lengths to lengths. A pure number like ½ has no dimension, so it never changes a term's dimension."
replacement_text [P31]: "Check homogeneity term by term: every added term and both sides must reduce to the identical [M][L][T] combination; ignore pure numbers."
discrimination_pairs [P33]: ["ut ([L]) + ½at² ([L]): addable, both [L] ✓", "x ([L]) + t ([T]): NOT addable ✗", "½ (dimensionless) vs a (has dimension): only a counts"]
s6_path: skip P28; use the "what does the answer measure?" framing gently as a shared puzzle, then P30.

## 7. Assessment Battery

| Probe | Item | Expected signal |
|---|---|---|
| P74 (classify) | "Do m/s and km/h have the same dimension?" | CORRECT = yes ([L][T]⁻¹) |
| P74 (classify) | "Is ½ dimensionless?" | CORRECT = yes |
| P75 (boundary) | "Can dimensional analysis prove an equation is completely correct?" | CORRECT = no; only catches dimensional errors |
| P76 (transfer) | "Check work = force × distance against energy = ½mv² dimensionally." | CORRECT = both [M][L]²[T]⁻² |
| P77 (generate) | "Invent a dimensionally inconsistent equation and name the bad term." | CORRECT = valid counterexample |
| P78 (explain) | "What does homogeneity require, and why does it work without physics?" | CORRECT = same dimensions per term/side |
| P79 (predict) | "Will the dimension of pressure (force/area) contain [M]?" | CORRECT = yes ([M][L]⁻¹[T]⁻²) |

## 8. Mastery Gate (P91 expansion — canonical order P77→P76→P75→P74→P78)
P77: "Invent a dimensionally INCONSISTENT equation and say which term breaks it." → expected: CORRECT
P76: "Kinetic energy is ½mv². Show its dimension and check it equals work = force × distance." → expected: CORRECT
P75: "Can dimensional analysis prove an equation fully correct, or only catch some errors? Explain." → expected: CORRECT
P74: "Do 'metres' and 'feet' have the same dimension or different?" → expected: CORRECT
P78: "In your own words: dimension vs unit, and what homogeneity requires." → expected: CORRECT

## 9. Retrieval Schedule (P89 expansion)
Interval 1 (2 days): "Give the dimensional formula of speed, acceleration and force."
Interval 2 (5 days): "Is v² = u² + 2as dimensionally consistent? Check each term."
Interval 3 (10 days): "Find the dimension of pressure and of energy from their definitions."
Interval 4 (21 days): "Someone writes E = mc. Is it dimensionally consistent with E = mc²? Which is right and why?"
Interval 5 (60 days): "Explain to a classmate how you'd catch a mistake in an unfamiliar equation using only dimensions."

---
V-check status:
- V-1 all 10 KG fields ✓ · V-2 NOT-clause ✓ · V-3 DB 2–3 Qs, every branch → state ✓ · V-4 every plausible state (S0,S1,S2,S3,S4,S6) has a Protocol ✓ · V-5 every Protocol success+failure exit ✓ · V-6 every TA opens P01/P02 ✓ · V-7 elicitations followed by P55 ✓ · V-8 no P08 without prior P06/P07 (TA-3) ✓ · V-9 Schema Repair via P41 gate (TA-4) ✓ · V-10 no P28 in S6 Protocol F ✓ · V-11 P91 terminal; P68→P62 ✓ · V-12 no >3 consecutive C without E break ✓ · V-13 P54 before high-difficulty first-attempt (TA-4, Protocol B) ✓ · V-14 assessment not first (TA-5/6) ✓ · V-15 Named Compounds expanded ✓ · V-16 IC-1..20 ✓ · V-17 AIR invariants per TA ✓ · V-18 P90 (TA-5) before P91 (TA-6) ✓ · V-19 P91 5 probes ✓ · V-20 P89 intervals authored ✓
status: READY
PACKAGE_READY
