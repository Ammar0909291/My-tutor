# Teaching Blueprint: phys.mech.displacement

## 0. Concept Profile

concept_id: phys.mech.displacement
name: Displacement and Distance
domain: Classical Mechanics (Physics)
difficulty: foundational (1)
bloom: remember
prerequisites: [phys.meas.units]
mastery_threshold: 0.70
estimated_hours: 2
cross_links: []
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (walking a measured path before introducing the displacement vector; difficulty ≤ 2)
status: READY

## 1. Learning Objective

[Boundary statement]
A student who achieves mastery demonstrates:
1. States that **displacement** is the vector change in position — from initial point to final point in a straight line — and that it can be zero, positive, or negative regardless of the path taken.
2. Distinguishes displacement from **distance**: distance is the total scalar path length (always ≥ 0, no direction); displacement is the straight-line separation from start to finish with direction.
3. Calculates displacement as Δx = x_final − x_initial (1D) and identifies the direction from context.

A student who reports displacement as the total path length ("I walked 6 m so displacement = 6 m"), or who does not recognise that a round trip has zero displacement, has **NOT** achieved mastery — conflating distance with displacement corrupts every velocity, momentum, and kinematics result downstream.

## 2. Student State Matrix

| State | Why here | Tell-tale behaviour | Protocol |
|---|---|---|---|
| S0 | Never met displacement as a distinct concept | Uses "distance" for everything | Protocol A (Concrete) |
| S1 | Uses displacement as synonym for distance | Can't name what's different | Protocol B (Counterexample-first) |
| S2-DISPLACEMENT-IS-DISTANCE | Believes displacement = total path length | Gives 6 m for a 3 m + 3 m round trip | Misconception Engine → Protocol C |
| S2-DISPLACEMENT-IS-PATH | Believes displacement traces the actual path | Draws a curved arrow along the route | Misconception Engine → Protocol C |
| S3 | Knows they differ; fails signed/vector cases | Gets magnitude but not direction or sign | Protocol C (Guided Questioning) |
| S6 | Anxiety at negative values and vector notation | Freezes at "−3 m" or arrow diagrams | Protocol F (Low Pressure) |

## 3. Diagnostic Battery

DB-1 (prior-exposure check):
"If you walk 3 metres forward and then 3 metres back to where you started, what is the distance you covered? What is the displacement?"
  "Distance = 6 m, displacement = 0" (or equivalent) → S3. Enter Protocol C.
  "Both = 6 m" → SIGNAL:MISCONCEPTION:MC-DISPLACEMENT-IS-DISTANCE. Enter Misconception Engine.
  Pause / "I don't know what displacement is" → S0. Enter Protocol A (Concrete).

DB-2 (representation test):
"What does the word 'displacement' mean to you in physics — how is it different from distance?"
  Correctly links to change of position / straight-line arrow → S3. Enter Protocol C.
  "Same as distance" or "I think they're the same" → S1. Enter Protocol B.
  Pause / no answer → add S6 flag → confidence question → route (No→S6/F, Yes→S0/A).

DB-3 (confidence calibration):
"How confident are you with displacement vs. distance — 1 to 5?"
  1–2 → add S6 flag; apply S6 adaptations.
  4–5 + DB-1 wrong → add S7 flag; override to Protocol G (challenge-first).

## 4. Prerequisite Check

PD-1 (for `phys.meas.units`):
"What unit would you use to report a length or distance measurement?"
  Cannot name a unit of length → flag PREREQ-GAP-UNITS.
  In-session minimum repair: one P06 anchor (ruler, metre marks, name the unit) — then resume. Deep gap → schedule `phys.meas.units` (S4 route).

## 5. Protocol Library

### Protocol A — Concrete-First (primary)
Serves: S0
CPA entry: C → P → A
Entry condition: no prior exposure (DB-1 = no knowledge of displacement).
Success exit: states zero displacement for a round trip AND calculates Δx = x_f − x_i with correct sign (P91 all 5 CORRECT).
Failure exit: on DISPLACEMENT-IS-DISTANCE / DISPLACEMENT-IS-PATH signal → Misconception Engine, then resume TA-4. On negative-value collapse → Protocol F.
Duration: ~40–50 min.

[TA-1: Walk the Difference]
P01
→ P04[content: "We're going to measure two things about the same walk — and they'll give different numbers. That's not a trick; they genuinely measure different things."]
→ P06[content: student walks 5 steps forward along a taped line, then 3 steps back; mark start and finish with tape; count total steps walked and measure the straight-line gap from start to finish]
→ P34[question: "You walked 8 steps total. But where did you end up relative to where you started?"] → P55
→ success_path → P49 → P05[curiosity: "So which number — 8 or 2 — tells you where you actually ended up?"]

[TA-2: Naming the Two Quantities]
P02
→ P07[modality: a number line diagram — start at 0, walk to +5, back to +2; annotate path length (8 steps) and a single straight arrow from 0 to +2 labelled "displacement"]
→ P13[think-aloud: "Total steps walked = distance: 8 steps. It's always positive and measures path length. The arrow from start to finish = displacement: +2 steps. It tells you the change in position — how far and in which direction from where you began."]
→ P08[notation: "Δx = x_final − x_initial = 2 − 0 = +2 steps. Distance = 8 steps. Same walk; two different measurements."]
// GR-3 satisfied: P06/P07 preceded P08 (V-8 PASS)
→ P34[question: "From the diagram: what is the displacement? What is the distance?"] → P55
→ success_path → P49
→ failure_path → P50 → P52[narrow: "Distance follows every step — count them all. Displacement draws ONE straight arrow from start to finish — how long is that arrow?"] → re-elicit → P55

[TA-3: Sign and Direction]
P02
→ P06[content: number line; position moves from x = 4 m to x = 1 m]
→ P13[think-aloud: "Δx = 1 − 4 = −3 m. The minus sign means motion was in the negative direction (leftward). Displacement is a vector — magnitude AND direction. Distance is 3 m (always positive)."]
→ P34[question: "A car moves from x = 10 m to x = 6 m. What is the displacement? What is the distance?"] → P55
→ success_path → P49
→ failure_path → P50 → P52[narrow: "Δx = final position minus initial position. Is the final larger or smaller than the initial?"] → re-elicit → P55

[TA-4: Misconception Probe — Round Trip]
P02
→ P54 // zero-displacement round trip is the load-bearing counterintuitive result
→ P41[diagnostic: "You run 400 m around a track and return exactly to the start. What is the distance? What is the displacement?"] → P55
→ [if "distance = 400 m, displacement = 0 m — back where I started"] → P49 → P36[probe: "Why is displacement zero even though you clearly ran a long way?"] → P55
→ [if "displacement = 400 m" / same as distance] → SIGNAL:MISCONCEPTION:MC-DISPLACEMENT-IS-DISTANCE → misconception_repair_chain[MC-DISPLACEMENT-IS-DISTANCE]

[TA-5: Formative Assessment]
P02
→ P90_expansion:
    P79[predict: "A swimmer goes 50 m to the far wall and back 50 m to the start. Before computing — predict the displacement."] → P55
    → P49 → P51[check: did they identify zero, or add magnitudes?]
    → P35[open: "Explain in your own words why displacement and distance can be different, and when they are equal."] → P55

[TA-6: Mastery Gate]
P02
→ P91_expansion:
    P77[generate: "Draw a number-line path where distance = 10 m but displacement = +2 m."] → P55 → CORRECT
    → P76[transfer: "A train goes 120 km east then 80 km west. Find the displacement and the distance."] → P55 → CORRECT
    → P75[boundary: "Can displacement be zero while distance is non-zero? Give a concrete example."] → P55 → CORRECT
    → P74[classify: "Label each: (a) 5 m north (b) total km run in a race (c) change in position −3 m"] → P55 → CORRECT
    → P78[explain: "In your own words: why is displacement a vector but distance a scalar?"] → P55 → CORRECT
→ P68 → P62[schedule: first retrieval in 2 days]

### Protocol B — Counterexample-First
Serves: S1 (uses displacement as synonym for distance)
CPA entry: P
Entry condition: cannot distinguish the two concepts.
Success exit: correctly names zero displacement for a round trip and non-zero distance, citing direction/start-to-end logic.
Failure exit: if triggers DISPLACEMENT-IS-DISTANCE → Misconception Engine → Protocol C.
Key deltas: open P02 → P41["A runner completes a full lap and returns to the starting blocks. Has she displaced herself from the start?"] → P54 → P55; on stall run P17 (path vs. net change) and P21; converge on TA-3 onward.

### Protocol C — Guided Questioning
Serves: S3 (partial), S2 (post-repair)
CPA entry: P
Entry condition: knows displacement ≠ distance; fails sign conventions or vector direction.
Success exit: correctly assigns sign and identifies vector nature for a 1D problem.
Failure exit: escalate to Protocol A TA-2 (rebuild with annotated number-line diagram).
Key deltas: enter at TA-3; P36/P51 probes; run P90/P91.

### Protocol D — Prerequisite Repair (S4)
Serves: S4; entry PREREQ-GAP-UNITS; success = units re-established → return to Protocol A TA-1; failure = schedule `phys.meas.units`, suspend.

### Protocol F — Low Pressure (S6)
Serves: S6
CPA entry: C
Success exit: correctly names displacement for one simple example, calmly.
Failure exit: shorten, bank a win, reschedule.
Key deltas: NO P28 (V-10/GR-5); conflict replaced by P30 bridge; keep annotated number-line diagram (P07) visible as reference; P85 regulation_tail per TA.

### Protocol G — Challenge-First (S7 override)
Serves: S7; entry DB-3 4–5 with wrong DB-1; success = student revises displacement=distance claim after the round-trip contradiction; failure = Misconception Engine[MC-DISPLACEMENT-IS-DISTANCE].
Key deltas: open with the P41 round-trip case; let it sit (P55); P17 contrast; no premature confirmation.

## 6. Misconception Engine

### MC-DISPLACEMENT-IS-DISTANCE: "Displacement equals the total path length"
trigger_signal: student sets displacement = total distance travelled, especially on round trips.
conflict_evidence [P28]: "You walked 3 m forward and 3 m back. You're at the same spot you started. Displacement asks: where did you end up relative to where you began? The answer is zero. But you walked 6 m — that's the distance. They cannot both be 6 m if one is zero."
bridge_text [P30]: "Displacement asks one question: where did you end up relative to where you started? Draw one straight arrow from start to finish. Distance asks: how much ground did you cover in total? They measure different things about the same journey."
replacement_text [P31]: "Displacement = x_final − x_initial. It is zero whenever you return to the start, regardless of how far you travelled along the way."
discrimination_pairs [P33]: ["round trip 3 m + 3 m: distance = 6 m, displacement = 0 ✓", "walk 5 m east only: distance = 5 m, displacement = +5 m east (equal for straight single-direction trips) ✓", "walk 5 m east, 2 m west: distance = 7 m, displacement = +3 m east ✗ if set equal to 7 m"]
s6_path: skip P28; use the return-to-start walk as a shared concrete observation — point to start and finish tape marks on the same spot — then P30.

### MC-DISPLACEMENT-IS-PATH: "Displacement traces the actual route taken"
trigger_signal: student draws a curved or zigzag arrow to represent displacement instead of a straight line from start to finish.
conflict_evidence [P28]: "You drew an arrow following the road. But displacement is just an arrow from where you started to where you finished — a straight line, ignoring the road entirely. If you teleported from the start to the finish, would you follow the road?"
bridge_text [P30]: "Displacement doesn't care about the route. Only: start position → finish position. Draw one straight arrow. The path in between is irrelevant to displacement."
replacement_text [P31]: "Displacement = one straight arrow from first position to last position, regardless of how the journey happened."
discrimination_pairs [P33]: ["curved road from A to B: displacement = straight arrow A→B, distance = road length ✓", "zigzag path: displacement = straight line from first to last position ✓"]
s6_path: skip P28; place two dots (A and B) on paper and ask the student to draw the displacement arrow as a shared activity before raising the path-vs-straight-line contrast.

## 7. Assessment Battery

| Probe | Item | Expected signal |
|---|---|---|
| P74 (classify) | "Label: (a) 5 km north (b) total km run in a marathon" | CORRECT = (a) displacement (b) distance |
| P74 (classify) | "Δx = x_f − x_i = −8 m. What type of quantity?" | CORRECT = displacement (vector; negative = leftward) |
| P75 (boundary) | "Can displacement be zero while distance > 0?" | CORRECT = yes; any complete round trip |
| P76 (transfer) | "Train: 120 km east, 80 km west — displacement and distance?" | CORRECT = +40 km east; 200 km |
| P77 (generate) | "Draw a path with distance = 10 m but displacement = +2 m." | CORRECT = valid number-line diagram |
| P78 (explain) | "Why is displacement a vector but distance a scalar?" | CORRECT = displacement has direction; distance does not |
| P79 (predict) | "Swimmer 50 m out and 50 m back — predict displacement before computing." | CORRECT = 0 m |

## 8. Mastery Gate (P91 expansion — canonical order P77→P76→P75→P74→P78)
P77: "Draw a number-line path where distance = 10 m but displacement = +2 m." → expected: CORRECT
P76: "Train 120 km east then 80 km west — find displacement and distance." → expected: CORRECT
P75: "Can displacement be zero while distance is non-zero? Give a concrete example." → expected: CORRECT
P74: "Label each as displacement or distance: (a) 5 m north, (b) total km run in a race, (c) change in position −3 m." → expected: CORRECT
P78: "In your own words: why is displacement a vector but distance a scalar?" → expected: CORRECT

## 9. Retrieval Schedule (P89 expansion)
Interval 1 (2 days): "A ball rolls 4 m right and 4 m left. Give displacement and distance."
Interval 2 (5 days): "From x = −3 m to x = +5 m — compute displacement and give its direction."
Interval 3 (10 days): "A cyclist rides 10 km north, 6 km south, 2 km north. Find displacement and distance."
Interval 4 (21 days): "Explain to a classmate why a marathon runner's displacement is near zero despite running 42 km."
Interval 5 (60 days): "Design two different journeys with the same displacement but different distances."

---
V-check status:
- V-1 all 10 KG fields ✓ · V-2 NOT-clause ✓ · V-3 DB 2–3 Qs, every branch → state ✓ · V-4 every plausible state (S0,S1,S2,S3,S6[,S4 via PD-1]) has a Protocol ✓ · V-5 every Protocol success+failure exit ✓ · V-6 every TA opens P01/P02 ✓ · V-7 elicitations followed by P55 ✓ · V-8 no P08 without prior P06/P07 (TA-2) ✓ · V-9 Schema Repair via P41 gate (TA-4) ✓ · V-10 no P28 in S6 Protocol F ✓ · V-11 P91 terminal; P68→P62 ✓ · V-12 no >3 consecutive C without E break ✓ · V-13 P54 before high-difficulty first-attempt (TA-4, Protocol B) ✓ · V-14 assessment not first (TA-5/6) ✓ · V-15 Named Compounds expanded ✓ · V-16 IC-1..20 ✓ · V-17 AIR invariants per TA ✓ · V-18 P90 (TA-5) before P91 (TA-6) ✓ · V-19 P91 5 probes ✓ · V-20 P89 intervals authored ✓
status: READY
PACKAGE_READY
