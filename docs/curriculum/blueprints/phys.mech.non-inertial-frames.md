# Teaching Blueprint: phys.mech.non-inertial-frames

## 0. Concept Profile
concept_id: phys.mech.non-inertial-frames
name: Non-inertial Frames and Pseudo Forces
domain: Classical Mechanics (Physics)
difficulty: proficient (3)
bloom: apply
prerequisites: [phys.mech.relative-motion, phys.mech.circular-motion]
mastery_threshold: 0.75
estimated_hours: 2
cross_links: []
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (standing on bathroom scales in a lift that starts and stops, before any equation; difficulty 3)
status: READY

## 1. Learning Objective

[Boundary statement]
A student who achieves mastery demonstrates:
1. Distinguishes inertial frames (not accelerating — Newton's laws hold as they are) from non-inertial frames (accelerating or rotating), and explains that in a frame accelerating at a, Newton's second law can still be used if every body of mass m is given an extra pseudo force −ma, opposite to the frame's acceleration — a force with no physical agent and no reaction partner.
2. Applies it — a 60 kg person in a lift accelerating upward at 2 m/s² reads 60 × (9.8 + 2) = 708 N on the scales, 468 N when the lift accelerates downward at 2 m/s², and zero in free fall; a pendulum hanging in a car accelerating at 3 m/s² tilts back by tan⁻¹(3/9.8) ≈ 17°.
3. Explains the centrifugal force — in a car taking a 50 m radius bend at 15 m/s, a 60 kg passenger feels pushed outward by m v²/r = 270 N in the car's frame, while from the ground the passenger simply tends to keep going straight and the seat or door supplies the inward (centripetal) force.

A student who places a real outward centrifugal force on a body viewed from the ground, or who thinks scales always read mg, has **NOT** achieved mastery — those ideas misread every lift, bend and spin dryer.

## 2. Student State Matrix

| State | Why here | Tell-tale behaviour | Protocol |
|---|---|---|---|
| S0 | Frames never considered | Cannot say why passengers lurch in a braking bus | Protocol A (Concrete) |
| S1 | "Pseudo force = −ma" recited | Cannot say in which frame it belongs | Protocol B (Counterexample-first) |
| S2-CENTRIFUGAL-IN-INERTIAL-FRAME | Felt force taken as real | Draws an outward centrifugal force in a ground-frame free-body diagram | Misconception Engine → then Protocol C |
| S2-SCALE-ALWAYS-READS-MG | Weight = reading | "The scales show your weight, mg, whatever the lift does" | Misconception Engine → then Protocol C |
| S3 | Partial — lifts fine, rotation not | Cannot explain a spin dryer both ways | Protocol C (Guided Questioning) |
| S6 | Anxiety on free-body diagrams | Avoids choosing a frame | Protocol F (Low Pressure) |

## 3. Diagnostic Battery

DB-1 (prior-exposure check):
"A bus brakes suddenly and the standing passengers lurch forward. What pushed them?"
  "Something pushed them forward" or no idea → S0. Enter Protocol A (Concrete).
  "Nothing pushed them — the bus slowed and they kept moving" → DB-2.

DB-2 (representation / misconception test):
"A car goes round a bend at steady speed. Seen from the road, which horizontal force acts on a passenger?"
  "An inward force from the seat or door — the centripetal force; the outward push is only felt in the car's frame" → S3. Enter Protocol C.
  "An inward force" (no reason) → S1. Enter Protocol B.
  "An outward centrifugal force throws the passenger outward" → SIGNAL:MISCONCEPTION:MC-CENTRIFUGAL-IN-INERTIAL-FRAME. Enter Misconception Engine.
  Pause → add S6 flag; Protocol F if anxious, otherwise Protocol A.

DB-3 (lift check — overlays):
"A 60 kg person stands on scales in a lift accelerating upward at 2 m/s². What do the scales read?"
  "708 N — more than mg" → no flag.
  "588 N — the scales always show mg" → add SIGNAL:MISCONCEPTION:MC-SCALE-ALWAYS-READS-MG (repair at TA-3).
  Confident and wrong on DB-2 → add S7 flag. Override to Protocol G.

## 4. Prerequisite Check

PD-1 (for `phys.mech.relative-motion` and `phys.mech.circular-motion`):
"A ball is dropped inside a train moving at steady speed — where does it land? And what force keeps a car moving in a circle?"
  Cannot say "straight below" and "an inward (centripetal) force, mv²/r" → flag PREREQ-GAP-FRAMES-CIRCULAR.
  In-session minimum repair: one P06 (the ball in the steady train, seen from both frames) + one P34 ("15 m/s round a 50 m bend: centripetal acceleration?") then resume. If absent, schedule the missing session (S4 route).

## 5. Protocol Library

### Protocol A — Concrete-First (primary)
Serves: S0
CPA entry: C
Entry condition: frames never considered.
Success exit: solves a lift and an accelerating-car problem in both frames and explains the centrifugal force correctly (P91 all 5 probes CORRECT).
Failure exit: on CENTRIFUGAL-IN-INERTIAL-FRAME → Misconception Engine, resume at TA-5. On anxiety → Protocol F.
Duration: ~55–65 min (may span 2 sessions; session_cap 7 TAs).

[TA-1: The Lurching Passenger]
P01
→ P04[content: "When a bus brakes, you lurch forward. When it accelerates, you are pressed back. Nobody pushed you."]
→ P06[content: a braking bus drawn twice — from the roadside (passenger keeps moving) and from inside (passenger 'pushed' forward)]
→ P14[predict: "From the roadside, what force acts on the passenger as the bus brakes?"] → P55
→ success_path → P49 → P05[curiosity: "So why does it FEEL like a push?"]

[TA-2: Inertial and Non-inertial Frames]
P02
→ P13[think-aloud: "Newton's laws work as they stand only in frames that are not accelerating — inertial frames. Inside the braking bus, the passenger accelerates forward relative to the bus with no force acting: Newton's first law fails there. We can rescue the laws inside the bus by adding a pseudo force −ma on every body, opposite to the bus's acceleration."]
→ P08[notation: "In a frame with acceleration a: F_pseudo = −m a  (no agent, no reaction)"]
// GR-3 satisfied: P06 and P13 preceded P08 (V-8 PASS)
→ P34[question: "The bus brakes at 3 m/s². Pseudo force on a 50 kg passenger, in the bus's frame?"] → P55
→ success_path[150 N forward] → P49
→ failure_path → P50 → P51[diagnose: direction] → P52[narrow: "Opposite to the frame's acceleration — the bus accelerates backward"] → re-elicit P34 → P55

[TA-3: The Lift]
P02
→ P41[diagnostic: "60 kg on scales; lift accelerating upward at 2 m/s². Reading?"] → P55
→ [if 708 N] → P49
→ [if 588 N] → SIGNAL:MISCONCEPTION:MC-SCALE-ALWAYS-READS-MG → misconception_repair_chain[MC-SCALE-ALWAYS-READS-MG]
→ P34[question: "Accelerating downward at 2 m/s²? In free fall?"] → P55
→ success_path[468 N; 0 N] → P49

[TA-4: The Tilted Pendulum]
P02
→ P34[question: "A pendulum hangs in a car accelerating at 3 m/s². At what angle does it hang, and which way?"] → P55
→ success_path[tan θ = a/g → ≈ 17°, tilted backward] → P49
→ P13[think-aloud: "From the road: the string's tension tilts forward to give the bob the car's acceleration. From the car: weight, tension and a backward pseudo force balance. Same answer either way."]

[TA-5: Centrifugal Force]
P02
→ P41[diagnostic: "Car on a bend. From the road, which horizontal force acts on the passenger?"] → P55
→ [if inward] → P49
→ [if outward centrifugal] → SIGNAL:MISCONCEPTION:MC-CENTRIFUGAL-IN-INERTIAL-FRAME → misconception_repair_chain[MC-CENTRIFUGAL-IN-INERTIAL-FRAME]
→ P34[question: "50 m bend at 15 m/s, 60 kg passenger. Outward pseudo force in the car's frame?"] → P55
→ success_path[m v²/r = 270 N] → P49

[TA-6: Formative Assessment]
P02
→ P90_expansion:
    P79[predict: "Why do astronauts in an orbiting space station feel weightless?"] → P55
    → P49 → P51[check: station and astronauts are in free fall together; scales read zero]
    → P35[open: "Explain a spin dryer from the drum's frame and from the ground."] → P55

[TA-7: Mastery Gate]
P02
→ P91_expansion:
    P77[generate: "Design a way to measure a car's acceleration using only a hanging mass and a protractor."] → P55 → CORRECT
    → P76[transfer: "Why does water stay in a bucket swung in a vertical circle?"] → P55 → CORRECT
    → P75[boundary: "A lift moving upward at steady speed: what do the scales read?"] → P55 → CORRECT
    → P74[classify: "Inertial or non-inertial: a train at steady speed; a train braking; a merry-go-round?"] → P55 → CORRECT
    → P78[explain: "Why has a pseudo force no reaction partner?"] → P55 → CORRECT
→ P68 → P62[schedule: first retrieval in 1 day]

### Protocol B — Counterexample-First
Serves: S1
CPA entry: C
Entry condition: formula without frames.
Success exit: names the frame for every force drawn.
Failure exit: Misconception Engine, then Protocol C.
Key deltas from A: open with P02 → P41["Name the object that exerts the centrifugal force on a passenger. What is its Newton's-third-law partner?"] → P54 (novel) → P55; then TA-3 and TA-5.

### Protocol C — Guided Questioning
Serves: S3, S2 (post-repair)
CPA entry: P
Entry condition: lifts fine; rotation not.
Success exit: rotating-frame problems solved both ways.
Failure exit: escalate to Protocol A TA-2.
Key deltas: enter at TA-5; run the gate.

### Protocol F — Low Pressure (S6)
Serves: S6
CPA entry: C
Entry condition: S6 flag confirmed.
Success exit: the lift readings explained calmly.
Failure exit: shorten, bank one success, reschedule.
Key deltas: NO P28 (V-10 / GR-5); work only from the ground frame first; P85 regulation_tail on every TA.

### Protocol G — Challenge-First (S7 override)
Serves: S7
CPA entry: C
Entry condition: confident "centrifugal force throws you out".
Success exit: revises after the released-ball contrast.
Failure exit: Misconception Engine.
Key deltas: open with a ball released from a spinning disc — it flies off along the tangent, not radially outward; let it sit (P55).

## 6. Misconception Engine

### MC-CENTRIFUGAL-IN-INERTIAL-FRAME: "A real outward centrifugal force acts on a body moving in a circle"
trigger_signal: student includes an outward centrifugal force in a free-body diagram drawn from an inertial (ground) frame, or says it throws objects outward along the radius.
conflict_evidence [P28]: "If a real outward force acted on a ball whirled on a string, then when the string breaks the ball should fly straight outward along the radius. Which way does it actually go? And which object exerts this outward force?"
bridge_text [P30]: "It flies off along the tangent — the direction it was already moving — because once the string stops pulling inward, no force acts. No object exerts an outward force. From the ground, the only horizontal force is the inward pull (centripetal force) that keeps bending the path. The 'outward push' you feel in a turning car is your body trying to go straight while the car turns under you; in the car's rotating frame we describe that as a pseudo force m v²/r outward."
replacement_text [P31]: "Centrifugal force exists only as a pseudo force in a rotating frame; in an inertial frame only real forces act, and their resultant points inward."
discrimination_pairs [P33]: ["ground frame: inward centripetal force from seat/door, no outward force", "car's frame: outward pseudo force m v²/r balances the inward force"]
s6_path: skip P28; watch a video of mud flying off a bicycle wheel along tangents.

### MC-SCALE-ALWAYS-READS-MG: "Bathroom scales always show your weight mg"
trigger_signal: student predicts the same scale reading in an accelerating lift as at rest, treating the reading as the gravitational force rather than the normal force.
conflict_evidence [P28]: "If the lift cable snapped and you fell with the lift, would your feet still press on the scales? What would they read?"
bridge_text [P30]: "Your feet would not press at all — you and the scales fall together, so the reading is zero, yet gravity still pulls you with mg. The scales measure the normal force, not gravity. Accelerating upward, the floor must push harder than mg to accelerate you: N = m(g + a) = 708 N for 60 kg at 2 m/s². In the lift's frame this is the pseudo force ma adding to your weight."
replacement_text [P31]: "A scale reads the normal force (apparent weight): N = m(g + a) for upward acceleration, m(g − a) for downward, zero in free fall."
discrimination_pairs [P33]: ["lift at rest or steady speed: 588 N", "accelerating up at 2 m/s²: 708 N; down: 468 N; free fall: 0"]
s6_path: skip P28; stand on scales in a real lift and watch the reading as it starts and stops.

## 7. Assessment Battery

| Probe | Item | Expected signal |
|---|---|---|
| P74 (classify) | "Steady train, braking train, merry-go-round" | CORRECT = inertial, non-inertial, non-inertial |
| P74 (classify) | "Ground frame: is there an outward force on the passenger?" | CORRECT = no |
| P75 (boundary) | "Lift moving up at steady speed" | CORRECT = 588 N (a = 0) |
| P76 (transfer) | "Water in a swung bucket" | CORRECT = ground: weight + base push supply mv²/r; bucket frame: outward pseudo force |
| P77 (generate) | "Accelerometer from a hanging mass" | CORRECT = measure tilt θ; a = g tan θ |
| P78 (explain) | "No reaction partner" | CORRECT = no object exerts it; it comes from the frame's acceleration |
| P79 (predict) | "Astronauts weightless" | CORRECT = free fall together; normal force zero |

## 8. Mastery Gate (P91 expansion — canonical order P77→P76→P75→P74→P78)
P77: "Design a way to measure a car's acceleration using only a hanging mass and a protractor." → expected: CORRECT
P76: "Why does water stay in a bucket swung in a vertical circle?" → expected: CORRECT
P75: "A lift moving upward at steady speed: what do the scales read?" → expected: CORRECT
P74: "Inertial or non-inertial: a train at steady speed; a train braking; a merry-go-round?" → expected: CORRECT
P78: "Why has a pseudo force no reaction partner?" → expected: CORRECT

## 9. Retrieval Schedule (P89 expansion)
Interval 1 (1 day): "What is a pseudo force, and which way does it point?"
Interval 2 (3 days): "50 kg in a lift accelerating down at 1.8 m/s²: reading?"
Interval 3 (7 days): "Does a centrifugal force act on a car seen from the road?"
Interval 4 (21 days): "Pendulum in a car accelerating at 2 m/s²: angle?"
Interval 5 (60 days): "Why do astronauts float?"

---
V-check status:
- V-1 all 10 KG fields present ✓ · V-2 objective has NOT-clause ✓ · V-3 DB 2–3 Qs, every branch → a state ✓ · V-4 every plausible state (S0,S1,S2,S3,S6) has a Protocol ✓ · V-5 every Protocol has success AND failure exit ✓ · V-6 every TA opens P01/P02 ✓ · V-7 every elicitation (P34/P35/P41) followed by P55 ✓ · V-8 no P08 without prior P06/P07 (TA-2) ✓ · V-9 Schema Repair entered only via P41 gate (TA-3, TA-5) ✓ · V-10 no P28 in S6 Protocol F ✓ · V-11 P91 terminal; P68 then P62 follow ✓ · V-12 no >3 consecutive C-category without E break ✓ · V-13 P54 before high-difficulty first-attempt (Protocol B TA-open) ✓ · V-14 assessment TA not first (TA-6/7) ✓ · V-15 Named Compounds (P90/P91) expanded ✓ · V-16 IC-1..20 pass ✓ · V-17 AIR invariants pass per TA ✓ · V-18 P90 (TA-6) before P91 (TA-7) ✓ · V-19 P91 has all 5 probes ✓ · V-20 P89 schedule authored with specific intervals ✓
status: READY
PACKAGE_READY
