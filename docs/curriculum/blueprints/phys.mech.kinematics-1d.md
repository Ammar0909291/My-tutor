# Teaching Blueprint: phys.mech.kinematics-1d

## 0. Concept Profile

concept_id: phys.mech.kinematics-1d
name: Kinematics in One Dimension
domain: Classical Mechanics (Physics)
difficulty: developing (3)
bloom: apply
prerequisites: [phys.mech.acceleration]
mastery_threshold: 0.80
estimated_hours: 4
cross_links: []
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (timing a ball rolling down a ramp before introducing the equations; difficulty 3 → C with accelerated P track)
status: READY

## 1. Learning Objective

[Boundary statement]
A student who achieves mastery demonstrates:
1. States the **condition for validity**: the four kinematic equations apply only to motion with **uniform (constant) acceleration** in a straight line.
2. For a given problem, identifies the three known kinematic quantities among {s, u, v, a, t} and selects the one equation that contains all three knowns and the unknown, then solves correctly.
3. Handles the **signed-vector** nature of all five quantities — a negative result means the quantity points opposite to the chosen positive direction — and does not default to magnitudes or drop signs.

A student who applies a kinematic equation to non-uniform acceleration (e.g., a car in city traffic), or who picks an equation at random and algebra-forces a result, has **NOT** achieved mastery — blind equation selection with no validity check is the most dangerous failure mode in kinematics and propagates into every projectile, circular, and rotational problem downstream.

## 2. Student State Matrix

| State | Why here | Tell-tale behaviour | Protocol |
|---|---|---|---|
| S0 | No exposure to kinematic equations | Cannot name any of {s, u, v, a, t} in context | Protocol A (Concrete) |
| S1 | Memorises equations without selection logic | Picks any equation; tries algebra until one works | Protocol B (Counterexample-first) |
| S2-APPLIES-ALWAYS | Applies SUVAT to non-uniform acceleration | Uses v = u + at for a car stop-starting in traffic | Misconception Engine → Protocol C |
| S2-DISPLACEMENT-CONFUSION | Treats s as distance, not displacement | Gives positive s for a ball thrown up and caught at the same height | Misconception Engine → Protocol C |
| S3 | Selects and solves correctly; drops signs | Correct magnitude, wrong sign on a or s | Protocol C (Guided Questioning) |
| S6 | Anxiety at simultaneous algebraic manipulation | Freezes when rearranging three-variable equations | Protocol F (Low Pressure) |

## 3. Diagnostic Battery

DB-1 (prior-exposure check):
"What is the condition under which the kinematic equations work? Can you name any of them?"
  States "constant/uniform acceleration" and recalls at least one equation → S3. Enter Protocol C.
  Recalls equations but cannot state the condition → S1. Enter Protocol B.
  Cannot recall equations or condition → DB-2.

DB-2 (application probe):
"A car starts from rest and reaches 20 m/s with a constant acceleration of 4 m/s². How long did it take and how far did it travel?"
  Correctly uses v = u + at → t = 5 s; then s = ut + ½at² → s = 50 m → S3. Enter Protocol C.
  Selects a wrong equation but shows systematic variable-identification attempt → S1. Enter Protocol B.
  "I don't know where to start" → S0. Enter Protocol A.
  Pause / distress → add S6 flag → confidence question → route (No→S6/F, Yes→S0/A).

DB-3 (confidence calibration):
"How confident are you with the kinematic equations — 1 to 5?"
  1–2 → add S6 flag; apply S6 adaptations.
  4–5 + DB-2 errors → add S7 flag; override to Protocol G (challenge-first).

## 4. Prerequisite Check

PD-1 (for `phys.mech.acceleration`):
"State the definition of acceleration and its formula."
  Cannot state a = Δv/Δt → flag PREREQ-GAP-ACCELERATION.
  In-session minimum repair: one P06 anchor (a = Δv/Δt, unit m/s²) — then resume. Deep gap → schedule `phys.mech.acceleration` (S4 route).

## 5. Protocol Library

### Protocol A — Concrete-First (primary)
Serves: S0
CPA entry: C → P → A
Entry condition: no exposure to kinematic equations (DB-1 = cannot name any, DB-2 = cannot start).
Success exit: identifies the five kinematic variables, selects the correct equation, solves, including the correct sign (P91 all 5 CORRECT).
Failure exit: on APPLIES-ALWAYS signal → Misconception Engine, then resume TA-4. On algebraic collapse → Protocol F.
Duration: ~60–80 min (may span 2 sessions).

[TA-1: Deriving the Equations from What We Know]
P01
→ P04[content: "We know a = Δv/Δt and s = average velocity × time. From those two definitions and algebra alone, we can derive three equations that link s, u (initial velocity), v (final velocity), a, and t. Nothing new — just the definitions, rearranged."]
→ P06[content: ramp-ball experiment — time a ball from rest over a measured distance; record {s, u=0, t}; compute a from a = 2s/t²; write down all five quantities for this one experiment]
→ P13[think-aloud: "v = u + at (definition of a, rearranged). s = ut + ½at² (average-velocity × time, expanded). v² = u² + 2as (combine the first two to eliminate t). Three equations, five variables. Any problem gives us three — we use whichever equation contains all three knowns plus the unknown."]
→ P34[question: "In the ramp experiment, which three quantities did we measure directly?"] → P55
→ success_path → P49 → P05[curiosity: "Why are there only three equations — shouldn't there be more combinations of five variables?"]

[TA-2: Variable Identification — The Selection Step]
P02
→ P07[modality: a SUVAT identification table — two columns: 'known' and 'unknown'; a worked example populating the table before choosing an equation; the equation chosen is the one that avoids the unneeded fifth variable]
→ P13[think-aloud: "Step 1: list all five variables. Step 2: mark known and unknown. Step 3: identify which variable is neither given nor wanted — that's the one to avoid. Step 4: pick the equation that doesn't contain that variable."]
→ P08[notation: "Given u, a, t, find v and s → v = u + at (no s involved for v); then s = ut + ½at² (no v involved for s)."]
// GR-3 satisfied: P06/P07 preceded P08 (V-8 PASS)
→ P34[question: "Problem: u = 5 m/s, a = 2 m/s², t = 3 s, find s. Which variable is unwanted? Which equation?"] → P55
→ success_path → P49
→ failure_path → P50 → P52[narrow: "You don't need v here — it's neither given nor asked. Which equation has no v in it?"] → re-elicit → P55

[TA-3: Signed Values — Direction Matters]
P02
→ P06[content: ball thrown straight up from ground — define upward as positive; u = +20 m/s, a = −9.8 m/s²; find v at t = 3 s and s at t = 3 s]
→ P13[think-aloud: "v = u + at = 20 + (−9.8)(3) = 20 − 29.4 = −9.4 m/s. Negative: the ball is now moving downward. s = ut + ½at² = 60 + ½(−9.8)(9) = 60 − 44.1 = 15.9 m. Positive: still above the starting point. Signs carry the physics — never strip them."]
→ P34[question: "Using the same ball, find s at t = 5 s. Interpret the sign of the answer."] → P55
→ success_path → P49
→ failure_path → P50 → P52[narrow: "s = 20(5) + ½(−9.8)(25) = 100 − 122.5 = −22.5 m. Negative s means the ball is BELOW the launch point — it's already hit the ground and we've gone beyond real time. What does that tell us physically?"] → re-elicit → P55

[TA-4: Misconception Probe — Validity Condition]
P02
→ P54 // the uniform-acceleration condition is the load-bearing constraint; students almost always omit it
→ P41[diagnostic: "A car travels through a city — sometimes braking, sometimes accelerating, sometimes at traffic lights. You're given its position at start and end and the total time. Can you use s = ut + ½at² to find its acceleration?"] → P55
→ [if "no — the equations assume constant acceleration; city driving is not constant acceleration"] → P49 → P36[probe: "What would you need instead?"] → P55
→ [if "yes — just use the equation with the given numbers"] → SIGNAL:MISCONCEPTION:MC-APPLIES-ALWAYS → misconception_repair_chain[MC-APPLIES-ALWAYS]

[TA-5: Formative Assessment]
P02
→ P90_expansion:
    P79[predict: "A ball is thrown upward at 15 m/s and returns to the same height. Before calculating — predict the displacement for the whole trip."] → P55
    → P49 → P51[check: did they identify s = 0 (round trip, same height), or did they try to compute a non-zero value?]
    → P35[open: "Explain the step-by-step variable-identification strategy and the validity condition — as if teaching a friend."] → P55

[TA-6: Mastery Gate]
P02
→ P91_expansion:
    P77[generate: "Write a problem where v² = u² + 2as is the correct equation to use, and solve it."] → P55 → CORRECT
    → P76[transfer: "A train brakes from 30 m/s to rest. It decelerates uniformly at 1.5 m/s². Find the braking distance and time."] → P55 → CORRECT
    → P75[boundary: "Why do kinematic equations give wrong answers for a car in city traffic?"] → P55 → CORRECT
    → P74[classify: "Given: u = 0, a = 5 m/s², v = 20 m/s. Which equation gives s directly? Solve it."] → P55 → CORRECT
    → P78[explain: "In your own words: how do you select the right kinematic equation, and what condition must hold for any of them to be valid?"] → P55 → CORRECT
→ P68 → P62[schedule: first retrieval in 2 days]

### Protocol B — Counterexample-First
Serves: S1 (equation memoriser without selection logic)
CPA entry: P
Entry condition: recalls equations but picks randomly without variable identification.
Success exit: correctly identifies unknowns and selects the equation that avoids the unwanted variable.
Failure exit: if triggers APPLIES-ALWAYS → Misconception Engine → Protocol C.
Key deltas: open P02 → P41["Three equations, five variables. If I give you u, v, and a and ask for s — which equation has no t in it? How do you know?"] → P54 → P55; on stall run P17 (selection table vs. trial-and-error) and P21; converge on TA-3 onward.

### Protocol C — Guided Questioning
Serves: S3 (partial), S2 (post-repair)
CPA entry: P
Entry condition: selects and solves correctly; drops signs or misidentifies s as distance.
Success exit: correct sign on all five quantities and correct zero-displacement for a round trip.
Failure exit: escalate to Protocol A TA-3 (rebuild signed-value examples with defined positive direction).
Key deltas: enter at TA-3; P36/P51 probes on "what does the sign mean?"; run P90/P91.

### Protocol D — Prerequisite Repair (S4)
Serves: S4; entry PREREQ-GAP-ACCELERATION; success = a = Δv/Δt re-established → return to Protocol A TA-1; failure = schedule `phys.mech.acceleration`, suspend.

### Protocol F — Low Pressure (S6)
Serves: S6
CPA entry: C
Success exit: correctly solves one kinematic equation problem with all knowns substituted cleanly.
Failure exit: shorten, bank a win, reschedule.
Key deltas: NO P28 (V-10/GR-5); conflict replaced by P30 bridge; keep SUVAT identification table (P07) visible as reference; P85 regulation_tail per TA; restrict TA-3 signed cases until the student is settled.

### Protocol G — Challenge-First (S7 override)
Serves: S7; entry DB-3 4–5 with errors in DB-2; success = student revises random-selection habit after the variable-identification framework; failure = Misconception Engine[MC-APPLIES-ALWAYS].
Key deltas: open with a problem where the wrong equation gives a tempting-looking numerical answer but is invalid (undefined variable used) — let the tension sit (P55); introduce the selection table; no premature confirmation.

## 6. Misconception Engine

### MC-APPLIES-ALWAYS: "Kinematic equations work for any motion, not just uniform acceleration"
trigger_signal: student applies SUVAT equations to a described non-uniform scenario (city traffic, variable engine force, real car journey).
conflict_evidence [P28]: "A car at a traffic light accelerates, then brakes, then idles. For which phase is 'a' constant? None of them as a whole. The equation v = u + at requires that 'a' stays the same for the entire duration. If it changes halfway through, you get a different answer from what actually happened — and you have no way to know how wrong it is."
bridge_text [P30]: "Kinematic equations are derived assuming 'a' is a constant — the same value at every instant. If acceleration varies, these equations do not apply. You need numerical methods or the area under a velocity-time graph instead."
replacement_text [P31]: "Before using any kinematic equation, confirm the acceleration is constant throughout the interval. If in doubt, state the assumption explicitly."
discrimination_pairs [P33]: ["stone dropped from rest: a = g = constant → SUVAT valid ✓", "car accelerating under constant engine force on flat road (no wind): a ≈ constant → SUVAT approximately valid ✓", "car braking with increasing brake pressure: a changes → SUVAT invalid ✗"]
s6_path: skip P28; use the traffic-light scenario as a gentle shared question — "is the acceleration the same at every moment of the whole journey?" — then P30.

### MC-DISPLACEMENT-CONFUSION: "s in the kinematic equations is total distance, not displacement"
trigger_signal: student gets a non-zero s for a ball thrown up and caught at the same height, or gives only positive values for s when a negative result is physically meaningful.
conflict_evidence [P28]: "The ball goes up 20 m and comes back down 20 m. You said s = 40 m. But the equation gives s = 0 for the full trip. Which do you trust? s is displacement — final position minus initial position. The ball returned to the same height, so s = 0. Distance = 40 m is a different quantity."
bridge_text [P30]: "In all kinematic equations, s stands for displacement — the change in position, with sign. It is NOT the total distance. For a round trip, s = 0. For motion that goes below the starting point, s is negative."
replacement_text [P31]: "Always substitute displacement (Δx = x_final − x_initial) for s, not total path length. Choose a positive direction and assign signs consistently."
discrimination_pairs [P33]: ["ball up 20 m, caught at start: s = 0 ✓, distance = 40 m ✓ (different things)", "ball up, not caught (still in air at t): s = positive (above start) ✓", "ball lands below launch point: s = negative ✓"]
s6_path: skip P28; use the up-and-back ball on paper with a marked start and finish at the same point — "where did it end up?" — then P30.

## 7. Assessment Battery

| Probe | Item | Expected signal |
|---|---|---|
| P74 (classify) | "Given u, v, a — which equation gives s without needing t?" | CORRECT = v² = u² + 2as |
| P74 (classify) | "City traffic: constant a assumed — valid or not?" | CORRECT = not valid; acceleration varies |
| P75 (boundary) | "Why do kinematic equations fail for non-uniform acceleration?" | CORRECT = derived assuming constant a |
| P76 (transfer) | "Train brakes from 30 m/s to rest at 1.5 m/s² — braking distance and time?" | CORRECT = s = 300 m; t = 20 s |
| P77 (generate) | "Write a problem where v² = u² + 2as is the right choice — solve it." | CORRECT = valid problem, correct selection |
| P78 (explain) | "How do you choose which kinematic equation to use?" | CORRECT = identify 3 knowns, find equation without the unwanted 5th variable |
| P79 (predict) | "Ball thrown up at 15 m/s, caught at same height — predict displacement." | CORRECT = 0 m |

## 8. Mastery Gate (P91 expansion — canonical order P77→P76→P75→P74→P78)
P77: "Write a problem where v² = u² + 2as is the correct equation — solve it." → expected: CORRECT
P76: "Train brakes from 30 m/s to rest at 1.5 m/s² — find braking distance and time." → expected: CORRECT
P75: "Why do kinematic equations give wrong answers for a car in city traffic?" → expected: CORRECT
P74: "Given u, v, a — which equation gives s directly? Solve for u = 0, v = 20 m/s, a = 5 m/s²." → expected: CORRECT
P78: "In your own words: how do you select the right kinematic equation, and what condition must hold?" → expected: CORRECT

## 9. Retrieval Schedule (P89 expansion)
Interval 1 (2 days): "A ball rolls from rest with a = 3 m/s². Find v and s after 4 s."
Interval 2 (5 days): "A car decelerates from 25 m/s to rest at 2.5 m/s² — find stopping distance. Which equation?"
Interval 3 (10 days): "A stone is dropped from a 45 m cliff (g = 10 m/s², downward positive). Find v just before impact and time to fall."
Interval 4 (21 days): "A ball is thrown upward at 30 m/s (upward positive, a = −10 m/s²). Find the height at t = 2 s and t = 5 s. Explain the sign of each."
Interval 5 (60 days): "Explain to a classmate: why must you check for constant acceleration before using SUVAT, and give one example where the check fails."

---
V-check status:
- V-1 all 10 KG fields ✓ · V-2 NOT-clause ✓ · V-3 DB 2–3 Qs, every branch → state ✓ · V-4 every plausible state (S0,S1,S2,S3,S6[,S4 via PD-1]) has a Protocol ✓ · V-5 every Protocol success+failure exit ✓ · V-6 every TA opens P01/P02 ✓ · V-7 elicitations followed by P55 ✓ · V-8 no P08 without prior P06/P07 (TA-2) ✓ · V-9 Schema Repair via P41 gate (TA-4) ✓ · V-10 no P28 in S6 Protocol F ✓ · V-11 P91 terminal; P68→P62 ✓ · V-12 no >3 consecutive C without E break ✓ · V-13 P54 before high-difficulty first-attempt (TA-4, Protocol B) ✓ · V-14 assessment not first (TA-5/6) ✓ · V-15 Named Compounds expanded ✓ · V-16 IC-1..20 ✓ · V-17 AIR invariants per TA ✓ · V-18 P90 (TA-5) before P91 (TA-6) ✓ · V-19 P91 5 probes ✓ · V-20 P89 intervals authored ✓
status: READY
PACKAGE_READY
