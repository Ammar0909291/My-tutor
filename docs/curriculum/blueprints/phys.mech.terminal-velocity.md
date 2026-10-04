# Teaching Blueprint: phys.mech.terminal-velocity

## 0. Concept Profile
concept_id: phys.mech.terminal-velocity
name: Drag and Terminal Velocity
domain: Mechanics (Physics)
difficulty: proficient (3)
bloom: analyze
prerequisites: [phys.mech.viscosity]
mastery_threshold: 0.75
estimated_hours: 2
cross_links: []
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: P (a ball falling through a tall tube of glycerine before the force balance; difficulty 3)
status: READY

## 1. Learning Objective

[Boundary statement]
A student who achieves mastery demonstrates:
1. Explains with free-body diagrams why a body falling through a fluid speeds up less and less and reaches a constant terminal velocity: drag grows with speed until weight = drag + upthrust, the net force is zero and the acceleration is zero.
2. Derives the terminal velocity of a small sphere from Stokes' law (F = 6πηrv): v_t = 2r²(ρ − σ)g / (9η), and uses it — e.g. a steel ball of radius 1 mm (ρ = 7800 kg/m³) in glycerine (σ = 1260 kg/m³, η = 1.5 Pa·s) falls at about 9.5 mm/s; doubling the radius makes v_t four times larger.
3. Interprets a skydiver's velocity–time graph: increasing speed with decreasing slope to a first terminal velocity; on opening the parachute, drag exceeds weight, the skydiver DECELERATES (still moving down) to a new, lower terminal velocity.

A student who says "at terminal velocity no forces act", or "opening the parachute makes the skydiver go up", has **NOT** achieved mastery — both confuse zero net force with zero force and velocity with acceleration, which breaks every later dynamics problem.

## 2. Student State Matrix

| State | Why here | Tell-tale behaviour | Protocol |
|---|---|---|---|
| S0 | Free fall known, drag not | Expects a falling body to speed up forever | Protocol A (Concrete) |
| S1 | Formula without force picture | Computes v_t but cannot draw the forces at terminal velocity | Protocol B (Counterexample-first) |
| S2-NO-FORCE-AT-TERMINAL | Constant speed = no forces | "At terminal velocity gravity stops acting" | Misconception Engine → then Protocol C |
| S2-PARACHUTE-GOES-UP | Acceleration direction = motion direction | "Opening the chute pulls the skydiver upward" | Misconception Engine → then Protocol C |
| S3 | Partial — force balance fine, Stokes or graphs not | Correct diagram, wrong v_t scaling | Protocol C (Guided Questioning) |
| S6 | Anxiety on the formula | Avoids r² and density differences | Protocol F (Low Pressure) |

## 3. Diagnostic Battery

DB-1 (prior-exposure check):
"Have you seen why raindrops don't hit you at hundreds of metres per second?"
  No → S0. Enter Protocol A (Concrete).
  Yes → DB-2.

DB-2 (representation / misconception test):
"A skydiver falls at a steady 55 m/s. Draw the forces on her. What is the net force?"
  "Weight down, air resistance up, equal; net force zero" → S3. Enter Protocol C.
  "Net force zero" (no forces drawn) → S1. Enter Protocol B.
  "No forces act — she is not accelerating" / "only gravity, it's balanced by her speed" → SIGNAL:MISCONCEPTION:MC-NO-FORCE-AT-TERMINAL. Enter Misconception Engine.
  Pause → add S6 flag; Protocol F if anxious, otherwise Protocol A.

DB-3 (parachute check — overlays):
"She opens her parachute. Which way does she move just after, and which way does she accelerate?"
  "Still downward, but accelerating upward (slowing down)" → no flag.
  "She moves upward" → add SIGNAL:MISCONCEPTION:MC-PARACHUTE-GOES-UP (repair at TA-5).
  Confident and wrong → add S7 flag. Override to Protocol G.

## 4. Prerequisite Check

PD-1 (for `phys.mech.viscosity`, and through it Newton's second law):
"What is Stokes' law for the drag on a small sphere, and how does the drag depend on speed?"
  Cannot give F = 6πηrv or that drag rises with speed → flag PREREQ-GAP-VISCOSITY.
  In-session minimum repair: one P06 (a spoon pulled slowly and quickly through honey) + one P34 ("faster — more or less resistance?") then resume. If viscosity is absent, schedule a `phys.mech.viscosity` session (S4 route).

## 5. Protocol Library

### Protocol A — Concrete-First (primary)
Serves: S0
CPA entry: P
Entry condition: no drag picture.
Success exit: explains terminal velocity with forces, computes v_t, and reads a skydiver graph (P91 all 5 probes CORRECT).
Failure exit: on NO-FORCE-AT-TERMINAL → Misconception Engine, resume at TA-3. On formula anxiety → Protocol F.
Duration: ~55–65 min (may span 2 sessions; session_cap 7 TAs).

[TA-1: The Ball in Glycerine]
P01
→ P04[content: "In air, a dropped ball speeds up the whole way down. In a thick liquid, something different happens."]
→ P06[content: a steel ball dropped into a tall tube of glycerine, with marks every 10 cm and a stopwatch — after the first few centimetres, every 10 cm takes the same time]
→ P14[predict: "Why does it stop speeding up?"] → P55
→ success_path → P49 → P05[curiosity: "Gravity is still pulling. So what is pulling back just as hard?"]

[TA-2: Drag Grows with Speed]
P02
→ P07[modality: three free-body diagrams at increasing speed — weight W and upthrust U constant, drag F growing]
→ P13[think-aloud: "At release, drag is zero: a = (W − U)/m. As speed grows, drag grows, the net force shrinks, the acceleration shrinks. When W = U + F, net force zero: constant speed. That speed is terminal velocity."]
→ P34[question: "At terminal velocity, how many forces act, and what is the acceleration?"] → P55
→ success_path[three forces, a = 0] → P49
→ failure_path → P50 → P51[diagnose: no forces (→MC) or two forces only] → P52[narrow: "Is gravity still pulling at terminal velocity?"] → re-elicit P34 → P55

[TA-3: Stokes' Terminal Velocity]
P02
→ P13[think-aloud: "Weight (4/3)πr³ρg = upthrust (4/3)πr³σg + 6πηrv_t. Solve: v_t = 2r²(ρ − σ)g / (9η)."]
→ P08[notation: "v_t = 2 r² (ρ − σ) g / (9 η)"]
// GR-3 satisfied: P06/P07 and P13 preceded P08 (V-8 PASS)
→ P34[question: "Steel ball, r = 1 mm, ρ = 7800, glycerine σ = 1260 kg/m³, η = 1.5 Pa·s. v_t?"] → P55
→ success_path[≈ 9.5 mm/s] → P49
→ P41[diagnostic: "Double the radius. What happens to v_t?"] → P55
→ [if ×4] → P49
→ [if ×2 or "heavier falls faster, ×8"] → P52[narrow: "Weight goes as r³, drag as r — so v_t goes as?"] → re-elicit → P55

[TA-4: The Skydiver]
P02
→ P07[modality: velocity–time graph — rises with decreasing slope to ~55 m/s; a sharp fall when the parachute opens; levels at ~5 m/s]
→ P16[compare: "Where on the graph is the acceleration largest? Where is it zero?"] → P55
→ success_path[largest at the start (≈ g); zero on both flat parts] → P49

[TA-5: Opening the Parachute]
P02
→ P41[diagnostic: "Just after the chute opens, drag is much larger than weight. Which way does she move?"] → P55
→ [if still downward, slowing] → P49
→ [if upward] → SIGNAL:MISCONCEPTION:MC-PARACHUTE-GOES-UP → misconception_repair_chain[MC-PARACHUTE-GOES-UP]
→ P13[think-aloud: "The net force is upward, so the ACCELERATION is upward — she slows down. She is still moving down. As she slows, drag falls, until drag again equals weight at a lower terminal velocity."]

[TA-6: Formative Assessment]
P02
→ P90_expansion:
    P79[predict: "Two balls of the same steel, radii 1 mm and 2 mm, in the same oil. Ratio of terminal speeds?"] → P55
    → P49 → P51[check: r² scaling stated?]
    → P35[open: "Explain why raindrops fall at a few metres per second rather than hundreds."] → P55

[TA-7: Mastery Gate]
P02
→ P91_expansion:
    P77[generate: "Sketch the v–t graph for a ball dropped into a tall tube of oil and label where a = g, a decreasing, a = 0."] → P55 → CORRECT
    → P76[transfer: "An air bubble rises through water. Which way does drag act, and why does it reach a terminal velocity?"] → P55 → CORRECT
    → P75[boundary: "A ball whose density equals the liquid's. Terminal velocity?"] → P55 → CORRECT
    → P74[classify: "At terminal velocity: net force zero, or no forces?"] → P55 → CORRECT
    → P78[explain: "Why does a skydiver slow down, not go up, when the parachute opens?"] → P55 → CORRECT
→ P68 → P62[schedule: first retrieval in 1 day]

### Protocol B — Counterexample-First
Serves: S1
CPA entry: P
Entry condition: formula without forces.
Success exit: correct free-body diagram at terminal velocity.
Failure exit: Misconception Engine, then Protocol C.
Key deltas from A: open with P02 → P41["At terminal velocity, is the steel ball's weight still 0.32 mN? Then where does it go?"] → P54 (novel) → P55; then TA-2.

### Protocol C — Guided Questioning
Serves: S3, S2 (post-repair)
CPA entry: P
Entry condition: force balance correct; Stokes or graphs not.
Success exit: v_t computed and the skydiver graph read.
Failure exit: escalate to Protocol A TA-2.
Key deltas: enter at TA-3 or TA-4; run the gate.

### Protocol F — Low Pressure (S6)
Serves: S6
CPA entry: P
Entry condition: S6 flag confirmed.
Success exit: the force picture and one v_t ratio done calmly.
Failure exit: shorten, bank one success, reschedule.
Key deltas: NO P28 (V-10 / GR-5); ratios (×4 for double radius) before full numbers; P85 regulation_tail on every TA.

### Protocol G — Challenge-First (S7 override)
Serves: S7
CPA entry: P
Entry condition: confident "no forces" or "parachute goes up".
Success exit: revises after the contradiction.
Failure exit: Misconception Engine.
Key deltas: open with "is she weightless at 55 m/s?" or with the parachute question; let the mismatch sit (P55).

## 6. Misconception Engine

### MC-NO-FORCE-AT-TERMINAL: "At terminal velocity no forces act on the body"
trigger_signal: student says forces vanish, or gravity "stops", once the speed is constant.
conflict_evidence [P28]: "At 55 m/s, does the skydiver have any less mass? Is the Earth any less able to pull on her? Then is her weight still there?"
bridge_text [P30]: "Her weight is still there, and so is the air pushing up on her. Constant velocity does not mean no forces — it means the forces BALANCE, so the net force, and the acceleration, are zero."
replacement_text [P31]: "Terminal velocity: weight = drag + upthrust; net force zero; acceleration zero; speed constant."
discrimination_pairs [P33]: ["terminal velocity (three forces, net zero) vs a body far out in deep space (no forces)", "accelerating at the start (net force down) vs terminal velocity (net force zero)"]
s6_path: skip P28; draw the arrows together at three speeds and watch the up-arrow grow to match the down-arrow.

### MC-PARACHUTE-GOES-UP: "Opening the parachute makes the skydiver move upward"
trigger_signal: student infers the direction of motion from the direction of the net force; often supported by films shot from a camera that keeps falling.
conflict_evidence [P28]: "She was falling at 55 m/s. Could any force reverse that instantly? What does an upward net force do to a downward velocity?"
bridge_text [P30]: "An upward net force gives an upward acceleration — it slows the downward motion. She keeps moving down, more and more slowly, until drag falls back to equal her weight. In the films, the camera operator is still falling fast, so she seems to shoot up past the camera."
replacement_text [P31]: "Net force decides the acceleration, not the direction of motion. After the parachute opens: still moving down, accelerating up, until a new, lower terminal velocity."
discrimination_pairs [P33]: ["braking a car (moving forward, accelerating backward) vs reversing (moving backward)", "parachute just open (down, slowing) vs at the new terminal velocity (down, steady)"]
s6_path: skip P28; use the car-braking case first as a shared, everyday example.

## 7. Assessment Battery

| Probe | Item | Expected signal |
|---|---|---|
| P74 (classify) | "At terminal velocity: net force zero or no forces?" | CORRECT = net force zero; forces balanced |
| P74 (classify) | "Where on the skydiver's v–t graph is a = g?" | CORRECT = at the start (drag zero) |
| P75 (boundary) | "Ball density equals the liquid's — v_t?" | CORRECT = zero; it stays where it is |
| P76 (transfer) | "Rising bubble — drag direction?" | CORRECT = downward; it rises to a terminal velocity |
| P77 (generate) | "Sketch v–t for a ball in oil" | CORRECT = rising curve flattening to v_t |
| P78 (explain) | "Why down and slowing after the chute opens?" | CORRECT = upward net force, upward acceleration |
| P79 (predict) | "Radii 1 and 2 mm — ratio of v_t?" | CORRECT = 1 : 4 |

## 8. Mastery Gate (P91 expansion — canonical order P77→P76→P75→P74→P78)
P77: "Sketch the v–t graph for a ball dropped into a tall tube of oil and label where a = g, a decreasing, a = 0." → expected: CORRECT
P76: "An air bubble rises through water. Which way does drag act, and why does it reach a terminal velocity?" → expected: CORRECT
P75: "A ball whose density equals the liquid's. Terminal velocity?" → expected: CORRECT
P74: "At terminal velocity: net force zero, or no forces?" → expected: CORRECT
P78: "Why does a skydiver slow down, not go up, when the parachute opens?" → expected: CORRECT

## 9. Retrieval Schedule (P89 expansion)
Interval 1 (1 day): "Draw the forces on a ball at terminal velocity in oil."
Interval 2 (3 days): "Double the radius of a sphere in Stokes flow — v_t?"
Interval 3 (7 days): "Sketch a skydiver's v–t graph from jump to landing."
Interval 4 (21 days): "Why do fine dust particles stay suspended in air for hours?"
Interval 5 (60 days): "How could you measure a liquid's viscosity with steel balls and a stopwatch?"

---
V-check status:
- V-1 all 10 KG fields present ✓ · V-2 objective has NOT-clause ✓ · V-3 DB 2–3 Qs, every branch → a state ✓ · V-4 every plausible state (S0,S1,S2,S3,S6) has a Protocol ✓ · V-5 every Protocol has success AND failure exit ✓ · V-6 every TA opens P01/P02 ✓ · V-7 every elicitation (P34/P35/P41) followed by P55 ✓ · V-8 no P08 without prior P06/P07 (TA-3) ✓ · V-9 Schema Repair entered only via P41 gate (TA-5) ✓ · V-10 no P28 in S6 Protocol F ✓ · V-11 P91 terminal; P68 then P62 follow ✓ · V-12 no >3 consecutive C-category without E break ✓ · V-13 P54 before high-difficulty first-attempt (Protocol B TA-open) ✓ · V-14 assessment TA not first (TA-6/7) ✓ · V-15 Named Compounds (P90/P91) expanded ✓ · V-16 IC-1..20 pass ✓ · V-17 AIR invariants pass per TA ✓ · V-18 P90 (TA-6) before P91 (TA-7) ✓ · V-19 P91 has all 5 probes ✓ · V-20 P89 schedule authored with specific intervals ✓
status: READY
PACKAGE_READY
