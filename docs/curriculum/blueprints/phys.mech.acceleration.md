# Teaching Blueprint: phys.mech.acceleration

## 0. Concept Profile

concept_id: phys.mech.acceleration
name: Acceleration
domain: Classical Mechanics (Physics)
difficulty: developing (2)
bloom: understand
prerequisites: [phys.mech.velocity]
mastery_threshold: 0.75
estimated_hours: 3
cross_links: []
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (observing objects speeding up and slowing down before introducing the rate formula; difficulty ≤ 2)
status: READY

## 1. Learning Objective

[Boundary statement]
A student who achieves mastery demonstrates:
1. Defines **acceleration** as the rate of change of velocity with time: a = Δv / Δt, and states that it is a vector — it can be negative (opposing the direction of motion).
2. Explains that acceleration describes **how velocity changes**, not how fast an object moves — a fast object can have zero acceleration (constant velocity) and a momentarily stationary object can have large acceleration (ball at the top of a throw).
3. Calculates average acceleration from two velocity values and a time interval, including the case where the result is negative (deceleration).

A student who confuses acceleration with speed ("accelerating means going fast"), or who insists that a stationary object must have zero acceleration, has **NOT** achieved mastery — these errors propagate into every kinematics equation and Newton's Second Law application downstream.

## 2. Student State Matrix

| State | Why here | Tell-tale behaviour | Protocol |
|---|---|---|---|
| S0 | No formal definition of acceleration | Uses "acceleration" colloquially for speed or effort | Protocol A (Concrete) |
| S1 | "Speeding up" schema only | Cannot extend to slowing down or direction change | Protocol B (Counterexample-first) |
| S2-ACCELERATION-IS-SPEED | Equates high acceleration with high speed | Says a fast car is "more accelerated" | Misconception Engine → Protocol C |
| S2-ZERO-VELOCITY-ZERO-ACCELERATION | Believes stationary object must have zero acceleration | Says ball at the top of a throw has no acceleration | Misconception Engine → Protocol C |
| S3 | Can compute a = Δv/Δt; fails negative or zero cases | Drops sign; says deceleration is "different from acceleration" | Protocol C (Guided Questioning) |
| S6 | Anxiety at negative acceleration or the rate formula | Freezes at "−9.8 m/s²" or Δv calculation | Protocol F (Low Pressure) |

## 3. Diagnostic Battery

DB-1 (prior-exposure check):
"What does it mean for an object to accelerate? Give an example."
  "Velocity changes — could speed up, slow down, or change direction" → S3. Enter Protocol C.
  "Speed up" only → S1. Enter Protocol B.
  Cannot give a physics definition → DB-2.

DB-2 (misconception probe):
"A ball is thrown straight up. At the very top, its velocity is zero. Does it have an acceleration at that moment? Why?"
  "Yes — still 9.8 m/s² downward; velocity is zero but changing" → S3. Enter Protocol C.
  "No — it's not moving so it can't be accelerating" → SIGNAL:MISCONCEPTION:MC-ZERO-VELOCITY-ZERO-ACCELERATION. Enter Misconception Engine.
  "I don't know what acceleration means mathematically" → S0. Enter Protocol A.
  Pause → add S6 flag → confidence question → route (No→S6/F, Yes→S0/A).

DB-3 (confidence calibration):
"How confident are you with acceleration — 1 to 5?"
  1–2 → add S6 flag; apply S6 adaptations.
  4–5 + DB-2 wrong → add S7 flag; override to Protocol G (challenge-first).

## 4. Prerequisite Check

PD-1 (for `phys.mech.velocity`):
"State the formula for average velocity and the difference between speed and velocity."
  Cannot state v_avg = Δx/Δt, or conflates speed with velocity → flag PREREQ-GAP-VELOCITY.
  In-session minimum repair: one P06 anchor (review Δx/Δt vs. distance/Δt; attach unit m/s + direction) — then resume. Deep gap → schedule `phys.mech.velocity` (S4 route).

## 5. Protocol Library

### Protocol A — Concrete-First (primary)
Serves: S0
CPA entry: C → P → A
Entry condition: no formal rate-of-change definition (DB-1 = colloquial only, DB-2 = cannot define).
Success exit: calculates average acceleration including negative cases AND correctly identifies non-zero acceleration at zero velocity (P91 all 5 CORRECT).
Failure exit: on ACCELERATION-IS-SPEED / ZERO-VELOCITY-ZERO-ACCELERATION signal → Misconception Engine, then resume TA-4. On sign-drop collapse → Protocol F.
Duration: ~50–60 min.

[TA-1: Velocity Changing — Watching It Happen]
P01
→ P04[content: "We already know velocity — how fast and in which direction. Acceleration is about how velocity changes. It's not about how fast you're going; it's about how fast your speed or direction is changing."]
→ P06[content: roll a ball down a ramp; mark its position every 0.5 s; show the gaps getting larger → velocity is increasing → acceleration is present; compare to a ball rolling on a flat surface with equal gaps → constant velocity → no acceleration]
→ P34[question: "On the flat surface, the ball moves at constant velocity. Is it accelerating?"] → P55
→ success_path → P49 → P05[curiosity: "If you can accelerate by speeding up, can you also 'accelerate' by slowing down?"]

[TA-2: The Rate Formula]
P02
→ P07[modality: a velocity-time table — t = 0: v = 0 m/s; t = 1 s: v = 3 m/s; t = 2 s: v = 6 m/s; t = 3 s: v = 9 m/s — annotate that velocity increases by 3 m/s every second]
→ P13[think-aloud: "Acceleration = change in velocity ÷ time taken = Δv ÷ Δt. Here: (9−0) / (3−0) = 3 m/s². That means every second the velocity grows by 3 m/s. The unit m/s² means metres per second per second — velocity changing per unit time."]
→ P08[notation: "a = Δv / Δt = (v_final − v_initial) / t ; unit: m/s²"]
// GR-3 satisfied: P06/P07 preceded P08 (V-8 PASS)
→ P34[question: "A car's velocity changes from 10 m/s to 25 m/s in 5 s. What is its average acceleration?"] → P55
→ success_path → P49
→ failure_path → P50 → P52[narrow: "Δv = final − initial = 25 − 10 = 15 m/s. Divide by time: 15 / 5 = ?"] → re-elicit → P55

[TA-3: Negative Acceleration — Deceleration is Not Special]
P02
→ P06[content: car braking — velocity changes from 20 m/s to 0 m/s in 4 s; compute a = (0 − 20)/4 = −5 m/s²]
→ P13[think-aloud: "The negative sign means acceleration opposes the direction of motion — the car is slowing down. This is what we call deceleration. But it's not a separate concept: it's just acceleration with a negative value. Same formula, same unit."]
→ P34[question: "A cyclist decelerates from 12 m/s to 4 m/s in 2 s. Calculate the acceleration and explain the sign."] → P55
→ success_path → P49
→ failure_path → P50 → P52[narrow: "Δv = final − initial = 4 − 12 = −8 m/s. Divide by time. The negative result means the velocity decreased — that's all."] → re-elicit → P55

[TA-4: Misconception Probe — Zero Velocity Does Not Mean Zero Acceleration]
P02
→ P54 // the ball-at-the-top-of-its-path case is the canonical load-bearing counterexample
→ P41[diagnostic: "A ball is thrown straight up. At the very top its velocity is exactly 0 m/s. Is its acceleration zero at that moment?"] → P55
→ [if "no — it still has 9.8 m/s² downward; velocity is zero but it's changing, so acceleration is non-zero"] → P49 → P36[probe: "What would happen if acceleration really were zero at the top?"] → P55
→ [if "yes — it's not moving, so no acceleration"] → SIGNAL:MISCONCEPTION:MC-ZERO-VELOCITY-ZERO-ACCELERATION → misconception_repair_chain[MC-ZERO-VELOCITY-ZERO-ACCELERATION]

[TA-5: Formative Assessment]
P02
→ P90_expansion:
    P79[predict: "A car travels at a constant 80 km/h on a straight motorway. Before calculating — is its acceleration positive, negative, or zero?"] → P55
    → P49 → P51[check: did they link constant velocity → Δv = 0 → a = 0, or confuse high speed with high acceleration?]
    → P35[open: "Explain in your own words: can an object be moving fast with zero acceleration? Can it be stationary with non-zero acceleration?"] → P55

[TA-6: Mastery Gate]
P02
→ P91_expansion:
    P77[generate: "Describe a real-world scenario where an object has (a) high speed and zero acceleration and (b) zero speed and non-zero acceleration."] → P55 → CORRECT
    → P76[transfer: "A motorcycle speeds up from 5 m/s to 35 m/s in 6 s, then brakes to rest in 3.5 s. Find the acceleration in each phase."] → P55 → CORRECT
    → P75[boundary: "Is deceleration a separate physical quantity from acceleration? Explain using the formula."] → P55 → CORRECT
    → P74[classify: "State whether acceleration is positive, negative, or zero: (a) constant velocity (b) slowing down (c) speeding up in the forward direction"] → P55 → CORRECT
    → P78[explain: "In your own words: what does acceleration measure, and why can an object at rest still be accelerating?"] → P55 → CORRECT
→ P68 → P62[schedule: first retrieval in 2 days]

### Protocol B — Counterexample-First
Serves: S1 ("speeding up" schema only)
CPA entry: P
Entry condition: equates acceleration with speeding up; cannot extend to slowing down or direction change.
Success exit: correctly identifies negative acceleration on braking, and zero acceleration at constant speed.
Failure exit: if triggers ACCELERATION-IS-SPEED → Misconception Engine → Protocol C.
Key deltas: open P02 → P41["A car brakes smoothly from 20 m/s to 0 m/s in 4 s. Is it accelerating?"] → P54 → P55; on stall run P17 (speed vs. rate of change of velocity) and P21; converge on TA-3 onward.

### Protocol C — Guided Questioning
Serves: S3 (partial), S2 (post-repair)
CPA entry: P
Entry condition: can compute a = Δv/Δt; fails sign, direction, or the zero-velocity case.
Success exit: handles negative acceleration and identifies non-zero acceleration at zero velocity.
Failure exit: escalate to Protocol A TA-2/TA-3 (rebuild with velocity-time table and braking example).
Key deltas: enter at TA-3; P36/P51 probes on "what does the sign mean?"; run P90/P91.

### Protocol D — Prerequisite Repair (S4)
Serves: S4; entry PREREQ-GAP-VELOCITY; success = velocity formula re-established → return to Protocol A TA-1; failure = schedule `phys.mech.velocity`, suspend.

### Protocol F — Low Pressure (S6)
Serves: S6
CPA entry: C
Success exit: computes one positive acceleration from two velocities and a time, calmly.
Failure exit: shorten, bank a win, reschedule.
Key deltas: NO P28 (V-10/GR-5); conflict replaced by P30 bridge; keep the Δv/Δt formula (P07) visible; P85 regulation_tail per TA; defer negative-acceleration and zero-velocity cases until the student is settled.

### Protocol G — Challenge-First (S7 override)
Serves: S7; entry DB-3 4–5 with wrong DB-2; success = student revises zero-velocity → zero-acceleration claim after the ball-at-the-top contradiction; failure = Misconception Engine[MC-ZERO-VELOCITY-ZERO-ACCELERATION].
Key deltas: open with P41 ball-at-top scenario; let the conflicting prediction sit (P55); P17 contrast; no premature confirmation.

## 6. Misconception Engine

### MC-ACCELERATION-IS-SPEED: "A faster object has more acceleration"
trigger_signal: student reports that a car travelling at 100 km/h "has more acceleration" than one at 30 km/h, ignoring whether either velocity is changing.
conflict_evidence [P28]: "A racing car cruises at 200 km/h on a straight — no gas, no braking, constant speed. A bicycle starts from rest and reaches 10 km/h in 2 s. Which is accelerating more? Acceleration is Δv/Δt. The car: Δv = 0 → a = 0. The bicycle: Δv = 10 km/h in 2 s → a > 0. The slower object is accelerating; the faster one is not."
bridge_text [P30]: "Acceleration measures how quickly velocity changes, not how large velocity is. A large velocity with zero change gives zero acceleration. A small velocity changing rapidly gives large acceleration. They are different things."
replacement_text [P31]: "a = Δv / Δt. Calculate it. Don't read off the speed and call it acceleration."
discrimination_pairs [P33]: ["car at constant 100 km/h: a = 0 ✓", "car accelerating from 0 to 100 km/h in 10 s: a = 2.78 m/s² ✓", "reporting a = 100 km/h: ✗ — wrong units and wrong concept"]
s6_path: skip P28; use the bicycle-vs-racing-car scenario as a shared gentle puzzle — "which is changing more?" — then P30.

### MC-ZERO-VELOCITY-ZERO-ACCELERATION: "If an object is momentarily at rest, it has no acceleration"
trigger_signal: student says the ball at the top of its throw has a = 0 because v = 0, or that a stationary object always has zero acceleration.
conflict_evidence [P28]: "At the very top, the ball's velocity is 0. One instant later it is moving downward. One instant before it was moving upward. Velocity went from upward → zero → downward. It changed. If velocity changed, what must be non-zero? Acceleration = Δv/Δt. The Δv is happening — gravity is pulling the ball downward whether the ball is moving or not."
bridge_text [P30]: "Acceleration depends on whether velocity is changing, not on whether velocity is zero. Gravity doesn't take a break when the ball pauses at the top. The ball at the top has velocity = 0 and acceleration = 9.8 m/s² downward simultaneously."
replacement_text [P31]: "Zero velocity and zero acceleration are independent. Check each with its own question: 'is the object moving?' (velocity) and 'is velocity changing?' (acceleration)."
discrimination_pairs [P33]: ["ball at top of throw: v = 0, a = 9.8 m/s² down ✓", "car at constant speed: v ≠ 0, a = 0 ✓", "ball just released from rest: v = 0, a = 9.8 m/s² down ✓ (same situation as the top)"]
s6_path: skip P28; use a short slow-motion thought experiment — "what does the ball do the instant after the top?" — then P30.

## 7. Assessment Battery

| Probe | Item | Expected signal |
|---|---|---|
| P74 (classify) | "Acceleration positive, negative, or zero: constant velocity" | CORRECT = zero |
| P74 (classify) | "Acceleration positive, negative, or zero: braking from 20 m/s to rest" | CORRECT = negative |
| P75 (boundary) | "Is deceleration a separate quantity or just negative acceleration?" | CORRECT = just negative acceleration — same formula |
| P76 (transfer) | "Motorcycle: 5 → 35 m/s in 6 s, then 35 → 0 m/s in 3.5 s — acceleration each phase?" | CORRECT = +5 m/s²; −10 m/s² |
| P77 (generate) | "Give (a) high speed, zero acceleration and (b) zero speed, non-zero acceleration." | CORRECT = valid real examples |
| P78 (explain) | "Why can an object at rest still have a non-zero acceleration?" | CORRECT = velocity is changing even if momentarily zero |
| P79 (predict) | "Car on motorway at constant 80 km/h — predict acceleration before calculating." | CORRECT = zero |

## 8. Mastery Gate (P91 expansion — canonical order P77→P76→P75→P74→P78)
P77: "Describe a real scenario where an object has (a) high speed and zero acceleration and (b) zero speed and non-zero acceleration." → expected: CORRECT
P76: "Motorcycle 5 → 35 m/s in 6 s, then 35 → 0 m/s in 3.5 s — find the acceleration in each phase." → expected: CORRECT
P75: "Is deceleration a separate physical quantity from acceleration? Explain using a = Δv/Δt." → expected: CORRECT
P74: "State whether acceleration is positive, negative, or zero: (a) constant velocity (b) slowing down (c) speeding up forward." → expected: CORRECT
P78: "In your own words: what does acceleration measure, and why can an object at rest still have a non-zero acceleration?" → expected: CORRECT

## 9. Retrieval Schedule (P89 expansion)
Interval 1 (2 days): "A bus goes from 0 to 18 m/s in 6 s — compute the average acceleration."
Interval 2 (5 days): "A ball is thrown upward. Describe its acceleration at the top. Why isn't it zero?"
Interval 3 (10 days): "A cyclist speeds up at 2 m/s² for 4 s from rest, then brakes at −3 m/s² until stopped. Find the velocity at the end of the first phase and the braking time."
Interval 4 (21 days): "Distinguish: acceleration and velocity — can they point in opposite directions? Give an example."
Interval 5 (60 days): "Explain to a classmate why a car cruising at 120 km/h on a straight has zero acceleration."

---
V-check status:
- V-1 all 10 KG fields ✓ · V-2 NOT-clause ✓ · V-3 DB 2–3 Qs, every branch → state ✓ · V-4 every plausible state (S0,S1,S2,S3,S6[,S4 via PD-1]) has a Protocol ✓ · V-5 every Protocol success+failure exit ✓ · V-6 every TA opens P01/P02 ✓ · V-7 elicitations followed by P55 ✓ · V-8 no P08 without prior P06/P07 (TA-2) ✓ · V-9 Schema Repair via P41 gate (TA-4) ✓ · V-10 no P28 in S6 Protocol F ✓ · V-11 P91 terminal; P68→P62 ✓ · V-12 no >3 consecutive C without E break ✓ · V-13 P54 before high-difficulty first-attempt (TA-4, Protocol B) ✓ · V-14 assessment not first (TA-5/6) ✓ · V-15 Named Compounds expanded ✓ · V-16 IC-1..20 ✓ · V-17 AIR invariants per TA ✓ · V-18 P90 (TA-5) before P91 (TA-6) ✓ · V-19 P91 5 probes ✓ · V-20 P89 intervals authored ✓
status: READY
PACKAGE_READY
