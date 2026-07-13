# Teaching Blueprint: phys.mech.velocity

## 0. Concept Profile

concept_id: phys.mech.velocity
name: Speed and Velocity
domain: Classical Mechanics (Physics)
difficulty: foundational (1)
bloom: understand
prerequisites: [phys.mech.displacement]
mastery_threshold: 0.70
estimated_hours: 2
cross_links: []
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (timing a rolling object before introducing the rate formula; difficulty ≤ 2)
status: READY

## 1. Learning Objective

[Boundary statement]
A student who achieves mastery demonstrates:
1. Defines **average speed** as total distance ÷ total time (scalar, always ≥ 0) and **average velocity** as total displacement ÷ total time (vector, can be zero or negative).
2. Distinguishes the two: when motion is not straight or not single-direction, speed and velocity give different results — most sharply on a round trip, where velocity is zero while speed is not.
3. Calculates average speed and average velocity correctly for simple 1D journeys, using the right formula and correct units.

A student who computes velocity using distance instead of displacement, or who reports a positive velocity for a round trip, has **NOT** achieved mastery — the speed/velocity conflation propagates into every subsequent kinematics, momentum, and energy calculation.

## 2. Student State Matrix

| State | Why here | Tell-tale behaviour | Protocol |
|---|---|---|---|
| S0 | No formal rate formula for motion | Cannot express speed or velocity mathematically | Protocol A (Concrete) |
| S1 | Uses speed and velocity interchangeably | Cannot state what changes between them | Protocol B (Counterexample-first) |
| S2-SPEED-IS-VELOCITY | Actively treats the two as identical | Computes both from distance/time; gives the same answer for both on a round trip | Misconception Engine → Protocol C |
| S3 | Knows they differ; uses wrong numerator | Calculates velocity using distance rather than displacement | Protocol C (Guided Questioning) |
| S6 | Anxiety at zero-velocity result or negative velocity | Freezes when velocity = 0 or gives a negative value | Protocol F (Low Pressure) |

## 3. Diagnostic Battery

DB-1 (prior-exposure check):
"What is the difference between speed and velocity?"
  Gives direction/vector distinction (e.g. "velocity has direction") → S3. Enter Protocol C.
  "Same thing" / "velocity is faster" → S1. Enter Protocol B.
  Cannot formulate a meaningful distinction → DB-2.

DB-2 (rate formula check):
"You walk 6 m north and then 6 m south in 12 s. What is your average speed? What is your average velocity?"
  "Speed = 1 m/s; velocity = 0" (or 0 m/s) → S3. Enter Protocol C.
  "Both = 1 m/s" → SIGNAL:MISCONCEPTION:MC-SPEED-IS-VELOCITY. Enter Misconception Engine.
  "I don't know the formula" → S0. Enter Protocol A.
  Pause / discomfort → add S6 flag → confidence question → route (No→S6/F, Yes→S0/A).

DB-3 (confidence calibration):
"How confident are you with speed and velocity — 1 to 5?"
  1–2 → add S6 flag; apply S6 adaptations.
  4–5 + DB-2 wrong → add S7 flag; override to Protocol G (challenge-first).

## 4. Prerequisite Check

PD-1 (for `phys.mech.displacement`):
"What is the difference between distance and displacement? What is displacement for a round trip?"
  Cannot state zero displacement for round trip → flag PREREQ-GAP-DISPLACEMENT.
  In-session minimum repair: one P06 anchor (number line, start = finish → Δx = 0) — then resume. Deep gap → schedule `phys.mech.displacement` (S4 route).

## 5. Protocol Library

### Protocol A — Concrete-First (primary)
Serves: S0
CPA entry: C → P → A
Entry condition: no formal rate formula (DB-1 = cannot formulate, DB-2 = doesn't know formula).
Success exit: computes average speed and average velocity correctly with correct zero for a round trip (P91 all 5 CORRECT).
Failure exit: on SPEED-IS-VELOCITY signal → Misconception Engine, then resume TA-4. On zero-velocity freeze → Protocol F.
Duration: ~40–50 min.

[TA-1: Measuring How Fast]
P01
→ P04[content: "We measure how far something went and how long it took. From those two numbers we can calculate how fast it moved — on average. But 'how fast' turns out to mean two slightly different things."]
→ P06[content: roll a ball 2 m across a table; measure time; compute distance/time and write the result with a unit and no direction — that's the speed]
→ P34[question: "What information do you need to calculate how fast something moved?"] → P55
→ success_path → P49 → P05[curiosity: "What if the ball had gone right and then come back — would the speed be the same? Would it tell you where the ball ended up?"]

[TA-2: Direction Changes the Story]
P02
→ P07[modality: number line — object moves +4 m right, then +2 m right; separately, object moves +4 m right, then 2 m left; same distances, different displacements; show how the result in the second case is different]
→ P13[think-aloud: "Average speed = total distance / total time. It doesn't care about direction. Average velocity = total displacement / total time. It does care — so it uses Δx, not the total path. Same journey, two different calculations."]
→ P08[notation: "v_avg = Δx / Δt (vector) ; speed_avg = total distance / total time (scalar)"]
// GR-3 satisfied: P06/P07 preceded P08 (V-8 PASS)
→ P34[question: "A car goes 30 m east in 10 s. What is its average speed? Average velocity?"] → P55
→ success_path → P49
→ failure_path → P50 → P52[narrow: "For speed: total distance ÷ time. For velocity: displacement ÷ time. Here the car only goes one way, so distance = displacement = 30 m. Both give 3 m/s east — but only because there's no backtracking."] → re-elicit → P55

[TA-3: The Round Trip Reveals the Difference]
P02
→ P06[content: walk 6 m north, then 6 m south, timed at 12 s; mark start and finish at the same spot]
→ P13[think-aloud: "Total distance = 12 m, total time = 12 s → average speed = 1 m/s. But Δx = final − initial = 0 m, because I returned to the start. Average velocity = 0 / 12 = 0 m/s. Zero. I moved — but I ended where I started."]
→ P34[question: "A swimmer goes 50 m to the wall and 50 m back in 100 s. Calculate average speed and average velocity."] → P55
→ success_path → P49
→ failure_path → P50 → P52[narrow: "Average velocity needs displacement — did the swimmer end up where they started? If yes, what is Δx?"] → re-elicit → P55

[TA-4: Misconception Probe — Wrong Numerator]
P02
→ P54 // using distance instead of displacement in the velocity formula is the most common error
→ P41[diagnostic: "A cyclist rides 12 km north, then 4 km south, in 2 hours. What is the average velocity?"] → P55
→ [if "Δx = 8 km north; v_avg = 4 km/h north" → uses displacement] → P49 → P36[probe: "What would the average speed be? Why does it differ?"] → P55
→ [if "v = 16/2 = 8 km/h" → uses total distance] → SIGNAL:MISCONCEPTION:MC-SPEED-IS-VELOCITY → misconception_repair_chain[MC-SPEED-IS-VELOCITY]

[TA-5: Formative Assessment]
P02
→ P90_expansion:
    P79[predict: "A runner does a 400 m lap in 50 s — before calculating, predict whether average velocity is greater than, less than, or equal to average speed."] → P55
    → P49 → P51[check: did they link velocity to displacement (= 0 for a lap) vs. distance for speed?]
    → P35[open: "Explain in your own words when speed and velocity give the same answer, and when they don't."] → P55

[TA-6: Mastery Gate]
P02
→ P91_expansion:
    P77[generate: "Construct a journey where average speed = 5 m/s and average velocity = 1 m/s. Show the numbers."] → P55 → CORRECT
    → P76[transfer: "A train goes 80 km east then 30 km west in 2 h. Find average speed and average velocity with direction."] → P55 → CORRECT
    → P75[boundary: "Can average speed ever be zero? Can average velocity ever be zero while speed is not? Explain."] → P55 → CORRECT
    → P74[classify: "For each quantity name it as speed or velocity: (a) 60 km/h (b) 60 km/h northbound (c) −5 m/s"] → P55 → CORRECT
    → P78[explain: "In your own words: what formula gives velocity and why is displacement in the numerator, not distance?"] → P55 → CORRECT
→ P68 → P62[schedule: first retrieval in 2 days]

### Protocol B — Counterexample-First
Serves: S1 (uses speed/velocity interchangeably)
CPA entry: P
Entry condition: no meaningful distinction between the two terms.
Success exit: correctly computes zero velocity for a round trip while naming non-zero speed, citing displacement vs. distance.
Failure exit: if triggers SPEED-IS-VELOCITY → Misconception Engine → Protocol C.
Key deltas: open P02 → P41["You walk 100 m to the shop and 100 m back in 5 min. Your average speed? Your average velocity?"] → P54 → P55; on stall run P17 (speed formula vs. velocity formula, scalar vs. vector) and P21; converge on TA-3 onward.

### Protocol C — Guided Questioning
Serves: S3 (partial), S2 (post-repair)
CPA entry: P
Entry condition: knows speed ≠ velocity; uses wrong numerator or omits direction.
Success exit: correctly uses Δx in the velocity formula and attaches direction.
Failure exit: escalate to Protocol A TA-2 (rebuild with number-line diagram contrasting distance and displacement).
Key deltas: enter at TA-3; heavy P36/P51 on "which numerator?"; run P90/P91.

### Protocol D — Prerequisite Repair (S4)
Serves: S4; entry PREREQ-GAP-DISPLACEMENT; success = displacement re-established → return to Protocol A TA-1; failure = schedule `phys.mech.displacement`, suspend.

### Protocol F — Low Pressure (S6)
Serves: S6
CPA entry: C
Success exit: computes one correct velocity (magnitude and direction) calmly.
Failure exit: shorten, bank a win, reschedule.
Key deltas: NO P28 (V-10/GR-5); conflict replaced by P30 bridge; keep the speed/velocity formula comparison (P07) visible as reference; P85 regulation_tail per TA; frame zero-velocity as a correct and interesting result, not an error.

### Protocol G — Challenge-First (S7 override)
Serves: S7; entry DB-3 4–5 with wrong DB-2; success = student revises the speed=velocity claim after the round-trip contradiction; failure = Misconception Engine[MC-SPEED-IS-VELOCITY].
Key deltas: open with P41 round-trip; let result sit (P55); P17 contrast; no premature confirmation.

## 6. Misconception Engine

### MC-SPEED-IS-VELOCITY: "Speed and velocity are the same calculation"
trigger_signal: student uses the same formula (distance/time) for both, or gives the same non-zero answer for both on a round trip.
conflict_evidence [P28]: "You walked 6 m north and 6 m south — total distance 12 m, total time 12 s → speed = 1 m/s. Now, where did you end up? At the start — displacement = 0. If velocity = displacement/time = 0/12 = 0 m/s, how can that be the same as speed = 1 m/s?"
bridge_text [P30]: "Speed and velocity use different numerators. Speed asks 'how much ground did you cover?' — uses distance. Velocity asks 'where did you end up from where you started?' — uses displacement. Same journey, different questions, different answers whenever you don't go in a straight line."
replacement_text [P31]: "Average velocity = Δx / Δt; average speed = total distance / Δt. Substitute the correct numerator for the question being asked."
discrimination_pairs [P33]: ["straight 10 m run in 5 s: speed = 2 m/s, velocity = 2 m/s east (equal because no backtracking) ✓", "round trip 10 m + 10 m in 10 s: speed = 2 m/s, velocity = 0 (different because Δx = 0) ✓", "velocity given as 'distance / time': ✗ — wrong numerator"]
s6_path: skip P28; use the shared walk-to-the-wall-and-back activity as a concrete observation — mark the start and end with tape at the same spot — then gently ask "so where did you finish?", then P30.

## 7. Assessment Battery

| Probe | Item | Expected signal |
|---|---|---|
| P74 (classify) | "Is average speed a scalar or a vector? Is average velocity a scalar or a vector?" | CORRECT = scalar; vector |
| P74 (classify) | "60 km/h vs 60 km/h northbound — which is a speed and which a velocity?" | CORRECT = first is speed; second is velocity |
| P75 (boundary) | "Can average speed be zero? Can average velocity be zero while speed is not?" | CORRECT = speed cannot be zero if moved; velocity can be zero (round trip) |
| P76 (transfer) | "Train: 80 km east, 30 km west, 2 h — average speed and average velocity?" | CORRECT = 55 km/h; 25 km/h east |
| P77 (generate) | "Construct a journey where average speed = 5 m/s and average velocity = 1 m/s." | CORRECT = valid numbers showing unequal distances in each direction |
| P78 (explain) | "Why does the velocity formula use displacement instead of distance?" | CORRECT = velocity is a vector; displacement captures direction and net change |
| P79 (predict) | "400 m lap in 50 s — predict whether velocity > speed, = speed, or < speed." | CORRECT = velocity < speed (velocity = 0 for a full lap; speed > 0) |

## 8. Mastery Gate (P91 expansion — canonical order P77→P76→P75→P74→P78)
P77: "Construct a journey where average speed = 5 m/s and average velocity = 1 m/s — show the numbers." → expected: CORRECT
P76: "Train 80 km east, 30 km west, 2 h — find average speed and average velocity with direction." → expected: CORRECT
P75: "Can average speed ever be zero? Can average velocity be zero while average speed is not? Explain both." → expected: CORRECT
P74: "For each quantity, state whether it is speed or velocity: (a) 60 km/h, (b) 60 km/h northbound, (c) −5 m/s." → expected: CORRECT
P78: "In your own words: what formula gives velocity and why is displacement in the numerator, not distance?" → expected: CORRECT

## 9. Retrieval Schedule (P89 expansion)
Interval 1 (2 days): "A dog runs 8 m east and 2 m west in 5 s — compute average speed and average velocity."
Interval 2 (5 days): "Distinguish: a car travels at 90 km/h vs a car travels at 90 km/h south. Which is speed, which is velocity?"
Interval 3 (10 days): "A ball rolls 12 m in 4 s, then returns 4 m in 2 s — average speed and average velocity for the whole trip."
Interval 4 (21 days): "Explain to a classmate why a swimmer who completes a full length out and back has zero average velocity despite swimming hard."
Interval 5 (60 days): "Give a real scenario where knowing speed is more useful than knowing velocity, and another where velocity is essential."

---
V-check status:
- V-1 all 10 KG fields ✓ · V-2 NOT-clause ✓ · V-3 DB 2–3 Qs, every branch → state ✓ · V-4 every plausible state (S0,S1,S2,S3,S6[,S4 via PD-1]) has a Protocol ✓ · V-5 every Protocol success+failure exit ✓ · V-6 every TA opens P01/P02 ✓ · V-7 elicitations followed by P55 ✓ · V-8 no P08 without prior P06/P07 (TA-2) ✓ · V-9 Schema Repair via P41 gate (TA-4) ✓ · V-10 no P28 in S6 Protocol F ✓ · V-11 P91 terminal; P68→P62 ✓ · V-12 no >3 consecutive C without E break ✓ · V-13 P54 before high-difficulty first-attempt (TA-4, Protocol B) ✓ · V-14 assessment not first (TA-5/6) ✓ · V-15 Named Compounds expanded ✓ · V-16 IC-1..20 ✓ · V-17 AIR invariants per TA ✓ · V-18 P90 (TA-5) before P91 (TA-6) ✓ · V-19 P91 5 probes ✓ · V-20 P89 intervals authored ✓
status: READY
PACKAGE_READY
