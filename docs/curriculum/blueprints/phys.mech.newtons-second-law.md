# Teaching Blueprint: phys.mech.newtons-second-law

## 0. Concept Profile

concept_id: phys.mech.newtons-second-law
name: Newton's Second Law — F=ma
domain: Classical Mechanics (Physics)
difficulty: developing (3)
bloom: apply
prerequisites: [phys.mech.kinematics-1d, phys.mech.force]
mastery_threshold: 0.85
estimated_hours: 4
cross_links: []
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (pushing carts of different mass before introducing F=ma; difficulty 3 → C with accelerated P track)
status: READY

## 1. Learning Objective

[Boundary statement]
A student who achieves mastery demonstrates:
1. States Newton's Second Law as **net force = mass × acceleration** (ΣF = ma), and that acceleration is proportional to net force and inversely proportional to mass — both are simultaneous, not sequential.
2. Applies the law to solve for any one of {ΣF, m, a} given the other two, using the **net** (resultant) force — not any single force — and keeping the vector direction of a aligned with ΣF.
3. Distinguishes **mass** (the measure of inertia, kg, unchanging) from **weight** (the gravitational force on the mass, W = mg, newtons, location-dependent).

A student who plugs a single force into F = ma while ignoring other forces present, or who uses weight in newtons where mass in kg is required (or treats the two as interchangeable), has **NOT** achieved mastery — the "net force" omission and the mass/weight conflation are the two errors that corrupt every dynamics problem downstream.

## 2. Student State Matrix

| State | Why here | Tell-tale behaviour | Protocol |
|---|---|---|---|
| S0 | No formal F=ma relationship | Cannot relate force, mass, and acceleration | Protocol A (Concrete) |
| S1 | Memorised "F = ma" as a plug-in formula | Uses any single force; never sums forces | Protocol B (Counterexample-first) |
| S2-SINGLE-FORCE | Uses one applied force, ignores others | Forgets friction/weight; uses F_applied for ΣF | Misconception Engine → Protocol C |
| S2-MASS-IS-WEIGHT | Conflates mass and weight | Uses weight in newtons as "m" in F = ma | Misconception Engine → Protocol C |
| S3 | Applies F=ma; drops direction or a single force | Correct magnitude; wrong sign or missing force term | Protocol C (Guided Questioning) |
| S6 | Anxiety at multi-force problems and rearrangement | Freezes when more than one force acts | Protocol F (Low Pressure) |

## 3. Diagnostic Battery

DB-1 (prior-exposure check):
"How are force, mass, and acceleration related? Write the relationship if you can."
  States ΣF = ma and mentions net/resultant force → S3. Enter Protocol C.
  "F = ma" but treats F as any single force → S1. Enter Protocol B.
  Cannot relate the three → DB-2.

DB-2 (misconception probe):
"A 2 kg box is pushed with 10 N to the right, while 4 N of friction acts to the left. What is its acceleration?"
  "Net force = 10 − 4 = 6 N; a = 6/2 = 3 m/s² right" → S3. Enter Protocol C.
  "a = 10/2 = 5 m/s²" (uses only the applied force) → SIGNAL:MISCONCEPTION:MC-SINGLE-FORCE. Enter Misconception Engine.
  "I don't know how to combine the forces" → S0. Enter Protocol A.
  Pause / distress → add S6 flag → confidence question → route (No→S6/F, Yes→S0/A).

DB-3 (confidence calibration):
"How confident are you with F = ma problems — 1 to 5?"
  1–2 → add S6 flag; apply S6 adaptations.
  4–5 + DB-2 wrong → add S7 flag; override to Protocol G (challenge-first).

## 4. Prerequisite Check

PD-1 (for `phys.mech.force`):
"What is net force, and how do you find it when several forces act on an object?"
  Cannot define net force as the vector sum → flag PREREQ-GAP-FORCE.
  In-session minimum repair: one P06 anchor (two arrows, opposite directions, subtract to get resultant) — then resume. Deep gap → schedule `phys.mech.force` (S4 route).

PD-2 (for `phys.mech.kinematics-1d`):
"If you know an object's acceleration and starting velocity, can you find its velocity later?"
  Cannot connect a to motion via v = u + at → flag PREREQ-GAP-KINEMATICS.
  In-session minimum repair: one P06 anchor recalling v = u + at; then resume. Deep gap → schedule `phys.mech.kinematics-1d` (S4 route).

## 5. Protocol Library

### Protocol A — Concrete-First (primary)
Serves: S0
CPA entry: C → P → A
Entry condition: no formal F=ma relationship (DB-1 = cannot relate, DB-2 = cannot combine forces).
Success exit: computes a from net force including opposing forces, and distinguishes mass from weight (P91 all 5 CORRECT).
Failure exit: on SINGLE-FORCE / MASS-IS-WEIGHT signal → Misconception Engine, then resume TA-4. On multi-force collapse → Protocol F.
Duration: ~60–80 min (may span 2 sessions).

[TA-1: More Push, More Acceleration — Heavier, Less]
P01
→ P04[content: "Push something hard, it speeds up quickly. Push the same thing gently, it speeds up slowly. Push a heavy thing and a light thing with the same force — the light one speeds up more. Newton captured both in one relationship."]
→ P06[content: push a cart with a small force, then a large force — observe the larger acceleration; then load the cart with mass and push with the same large force — observe the smaller acceleration]
→ P34[question: "Same push, twice the mass — what happens to the acceleration?"] → P55
→ success_path → P49 → P05[curiosity: "Is there a single equation that captures BOTH — more force AND more mass — at the same time?"]

[TA-2: The Relationship — ΣF = ma]
P02
→ P07[modality: a proportionality table — fixed m = 2 kg: F = 2 N → a = 1 m/s²; F = 4 N → a = 2 m/s²; F = 6 N → a = 3 m/s² (a ∝ F); then fixed F = 12 N: m = 2 → a = 6; m = 4 → a = 3; m = 6 → a = 2 (a ∝ 1/m)]
→ P13[think-aloud: "Acceleration is proportional to the net force and inversely proportional to the mass. Put together: a = ΣF / m, or rearranged, ΣF = ma. The F must be the NET force — the vector sum of everything acting on the object."]
→ P08[notation: "ΣF = ma ; a = ΣF / m ; unit check: N = kg · m/s²"]
// GR-3 satisfied: P06/P07 preceded P08 (V-8 PASS)
→ P34[question: "A 3 kg object has a net force of 12 N on it. What is its acceleration?"] → P55
→ success_path → P49
→ failure_path → P50 → P52[narrow: "a = ΣF / m = 12 / 3 = ? — and the direction is the same as the net force."] → re-elicit → P55

[TA-3: Net Force in Practice — Multiple Forces]
P02
→ P06[content: a 5 kg box, 20 N applied right, 8 N friction left; draw both force arrows; net force = 20 − 8 = 12 N right; a = 12/5 = 2.4 m/s² right]
→ P13[think-aloud: "First find the net force — add the forces as vectors, respecting direction. Right is positive: 20 + (−8) = 12 N. Then apply the law: a = ΣF/m = 12/5 = 2.4 m/s². The single applied force alone (20 N) would give the wrong answer."]
→ P34[question: "A 4 kg trolley: 30 N forward, 10 N friction backward. Find the acceleration."] → P55
→ success_path → P49
→ failure_path → P50 → P52[narrow: "Net force first: 30 − 10 = 20 N. Then a = 20/4. Don't use 30 alone — friction is real and opposes the motion."] → re-elicit → P55

[TA-4: Misconception Probe — Net Force, Not Single Force]
P02
→ P54 // the "use net force, not applied force" step is the load-bearing dynamics discipline
→ P41[diagnostic: "A 2 kg book is pushed across a table with 10 N. Friction of 4 N opposes it. A student writes a = 10/2 = 5 m/s². Is that right? If not, what's wrong?"] → P55
→ [if "no — must use net force 10 − 4 = 6 N; a = 6/2 = 3 m/s²"] → P49 → P36[probe: "Why can't we ignore the friction?"] → P55
→ [if "yes, 5 m/s²" / uses applied force only] → SIGNAL:MISCONCEPTION:MC-SINGLE-FORCE → misconception_repair_chain[MC-SINGLE-FORCE]

[TA-5: Formative Assessment]
P02
→ P90_expansion:
    P79[predict: "The same 6 kg suitcase is weighed on Earth and on the Moon. Before we discuss — does its MASS change? Does its WEIGHT change?"] → P55
    → P49 → P51[check: did they hold mass constant and let weight vary, or conflate the two?]
    → P35[open: "Explain the difference between mass and weight, and why you must use mass (kg) in F = ma, not weight (N)."] → P55

[TA-6: Mastery Gate]
P02
→ P91_expansion:
    P77[generate: "Invent a two-force problem (one driving, one opposing) and solve for the acceleration."] → P55 → CORRECT
    → P76[transfer: "A 1200 kg car experiences 3000 N driving force and 600 N total resistance. Find its acceleration, then the time to reach 20 m/s from rest."] → P55 → CORRECT
    → P75[boundary: "If the net force on an object is zero but two large forces act on it, what is its acceleration?"] → P55 → CORRECT
    → P74[classify: "Which belongs in F = ma as 'm': (a) 60 kg (b) 600 N weight? Which is mass, which is weight?"] → P55 → CORRECT
    → P78[explain: "In your own words: why must F in F = ma be the NET force, and how do mass and weight differ?"] → P55 → CORRECT
→ P68 → P62[schedule: first retrieval in 2 days]

### Protocol B — Counterexample-First
Serves: S1 (plug-in memoriser, single-force habit)
CPA entry: P
Entry condition: recalls F = ma but treats F as any single force.
Success exit: correctly uses net force in a two-force problem, citing the vector sum.
Failure exit: if triggers SINGLE-FORCE → Misconception Engine → Protocol C.
Key deltas: open P02 → P41["You push a crate with 50 N but it won't move. F = ma says a = 50/m > 0 — so why is it stationary?"] (static friction balances) → P54 → P55; on stall run P17 (applied force vs. net force) and P21; converge on TA-3 onward.

### Protocol C — Guided Questioning
Serves: S3 (partial), S2 (post-repair)
CPA entry: P
Entry condition: applies F=ma; drops direction or omits a force term.
Success exit: correct sign and complete force accounting in a multi-force problem.
Failure exit: escalate to Protocol A TA-3 (rebuild net-force accounting with drawn arrows).
Key deltas: enter at TA-3; P36/P51 probes on "did you include every force?"; run P90/P91.

### Protocol D — Prerequisite Repair (S4)
Serves: S4; entry PREREQ-GAP-FORCE or PREREQ-GAP-KINEMATICS; success = missing prerequisite re-established → return to Protocol A TA-1; failure = schedule the relevant prerequisite concept, suspend.

### Protocol F — Low Pressure (S6)
Serves: S6
CPA entry: C
Success exit: solves one single-force F=ma problem cleanly.
Failure exit: shorten, bank a win, reschedule.
Key deltas: NO P28 (V-10/GR-5); conflict replaced by P30 bridge; keep the proportionality table (P07) visible; P85 regulation_tail per TA; defer multi-force problems until the student is settled.

### Protocol G — Challenge-First (S7 override)
Serves: S7; entry DB-3 4–5 with wrong DB-2; success = student revises single-force habit after the friction-included contradiction; failure = Misconception Engine[MC-SINGLE-FORCE].
Key deltas: open with the P41 friction case where ignoring friction gives an obviously wrong prediction; let it sit (P55); P17 contrast; no premature confirmation.

## 6. Misconception Engine

### MC-SINGLE-FORCE: "F in F = ma is the applied force, not the net force"
trigger_signal: student divides a single named force by mass, ignoring friction, weight, or other forces present.
conflict_evidence [P28]: "You pushed the box with 10 N and got a = 5 m/s². But friction of 4 N is pulling backward the whole time. If the box really accelerated at 5 m/s², friction would be doing nothing — yet you can feel it resisting. The box only 'feels' the DIFFERENCE between your push and the friction: 6 N, not 10 N."
bridge_text [P30]: "F = ma always uses the NET force — the vector sum of every force acting on the object. Find the resultant first (add with direction), THEN divide by mass. A single force alone is only the whole story when it's the only force acting."
replacement_text [P31]: "Step 1: list all forces with direction. Step 2: sum them (net force). Step 3: a = ΣF / m. Never skip step 2."
discrimination_pairs [P33]: ["push 10 N, friction 4 N: ΣF = 6 N, a = 6/m ✓", "push 10 N, frictionless: ΣF = 10 N, a = 10/m ✓ (single force only because nothing else acts)", "push 10 N, friction 4 N, using a = 10/m: ✗ ignores friction"]
s6_path: skip P28; draw the two arrows (push and friction) and ask gently "which one does the box feel — the big one, or the leftover?" — then P30.

### MC-MASS-IS-WEIGHT: "Mass and weight are the same thing"
trigger_signal: student uses weight in newtons where mass in kg is required, or claims mass changes with location.
conflict_evidence [P28]: "You said the astronaut 'weighs less on the Moon, so has less mass there.' But she's made of exactly the same atoms on the Moon as on Earth — nothing was removed. Her MASS (amount of matter, her inertia) is identical. What changed is the Moon's weaker gravity pulling on that same mass — that's her WEIGHT. Weight = mg; mass is just m."
bridge_text [P30]: "Mass is the amount of matter / inertia — measured in kg, the same everywhere. Weight is the gravitational force on that mass — measured in newtons, W = mg, and it changes where gravity changes. In F = ma, 'm' is always mass in kg, never weight."
replacement_text [P31]: "Mass (kg) = inertia, unchanging. Weight (N) = mg, location-dependent. Use mass in F = ma; if given weight, first divide by g to recover mass."
discrimination_pairs [P33]: ["60 kg on Earth and Moon: mass = 60 kg both ✓", "weight on Earth = 588 N, on Moon ≈ 96 N ✓ (mg with different g)", "using 588 as 'm' in F = ma: ✗ — that's weight in N, not mass in kg"]
s6_path: skip P28; use "same atoms, same matter — did any leave on the way to the Moon?" as a gentle shared question, then P30.

## 7. Assessment Battery

| Probe | Item | Expected signal |
|---|---|---|
| P74 (classify) | "Which is 'm' in F = ma: 60 kg or 600 N?" | CORRECT = 60 kg (mass); 600 N is weight |
| P74 (classify) | "Push 12 N, friction 3 N — what force goes into F = ma?" | CORRECT = net force, 9 N |
| P75 (boundary) | "Net force zero but two large forces act — what is a?" | CORRECT = zero (forces balance) |
| P76 (transfer) | "1200 kg car, 3000 N drive, 600 N resistance — a, then t to reach 20 m/s?" | CORRECT = 2 m/s²; 10 s |
| P77 (generate) | "Invent a two-force problem (driving + opposing) and solve for a." | CORRECT = valid net-force computation |
| P78 (explain) | "Why must F be the net force, and how do mass and weight differ?" | CORRECT = vector sum; mass = inertia (kg), weight = mg (N) |
| P79 (predict) | "6 kg suitcase on Earth vs Moon — does mass change? does weight change?" | CORRECT = mass no; weight yes |

## 8. Mastery Gate (P91 expansion — canonical order P77→P76→P75→P74→P78)
P77: "Invent a two-force problem (one driving, one opposing) and solve for the acceleration." → expected: CORRECT
P76: "1200 kg car, 3000 N drive, 600 N resistance — find a, then the time to reach 20 m/s from rest." → expected: CORRECT
P75: "If the net force on an object is zero but two large forces act, what is its acceleration?" → expected: CORRECT
P74: "Which belongs in F = ma as 'm': 60 kg or 600 N weight? Which is mass, which is weight?" → expected: CORRECT
P78: "In your own words: why must F in F = ma be the NET force, and how do mass and weight differ?" → expected: CORRECT

## 9. Retrieval Schedule (P89 expansion)
Interval 1 (2 days): "A 4 kg object has a net force of 20 N — find its acceleration and direction."
Interval 2 (5 days): "A 3 kg box: 18 N push, 6 N friction — find the acceleration."
Interval 3 (10 days): "A 1000 kg car accelerates at 2 m/s² against 500 N resistance — what driving force is needed?"
Interval 4 (21 days): "Distinguish mass and weight for a 10 kg object on Earth (g = 9.8) and on Mars (g = 3.7): give both masses and both weights."
Interval 5 (60 days): "Explain to a classmate why a heavier object needs a larger force to reach the same acceleration, using F = ma."

---
V-check status:
- V-1 all 10 KG fields ✓ · V-2 NOT-clause ✓ · V-3 DB 2–3 Qs, every branch → state ✓ · V-4 every plausible state (S0,S1,S2,S3,S6[,S4 via PD-1/PD-2]) has a Protocol ✓ · V-5 every Protocol success+failure exit ✓ · V-6 every TA opens P01/P02 ✓ · V-7 elicitations followed by P55 ✓ · V-8 no P08 without prior P06/P07 (TA-2) ✓ · V-9 Schema Repair via P41 gate (TA-4) ✓ · V-10 no P28 in S6 Protocol F ✓ · V-11 P91 terminal; P68→P62 ✓ · V-12 no >3 consecutive C without E break ✓ · V-13 P54 before high-difficulty first-attempt (TA-4, Protocol B) ✓ · V-14 assessment not first (TA-5/6) ✓ · V-15 Named Compounds expanded ✓ · V-16 IC-1..20 ✓ · V-17 AIR invariants per TA ✓ · V-18 P90 (TA-5) before P91 (TA-6) ✓ · V-19 P91 5 probes ✓ · V-20 P89 intervals authored ✓
status: READY
PACKAGE_READY
