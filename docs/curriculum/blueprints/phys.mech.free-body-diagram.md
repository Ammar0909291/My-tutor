# Teaching Blueprint: phys.mech.free-body-diagram

## 0. Concept Profile

concept_id: phys.mech.free-body-diagram
name: Free Body Diagrams
domain: Classical Mechanics (Physics)
difficulty: developing (3)
bloom: apply
prerequisites: [phys.mech.newtons-second-law]
mastery_threshold: 0.80
estimated_hours: 3
cross_links: []
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (physically isolating one object and pointing at each force before drawing arrows; difficulty 3 → C with accelerated P track)
status: READY

## 1. Learning Objective

[Boundary statement]
A student who achieves mastery demonstrates:
1. **Isolates** a single body and draws **only the external forces acting ON that body** as labelled arrows from the body — excluding forces the body exerts on other things, and excluding internal forces.
2. Includes every real force (weight always; plus normal, tension, friction, applied, drag as the situation dictates) with correct **direction** and relative length, and no invented forces (no "force of motion," no "force of the push that's already ended").
3. Uses the completed diagram to write the **net force equation** (ΣF = ma) along each axis, correctly resolving the free body into a solvable dynamics statement.

A student who draws a "force of motion" arrow in the direction of travel, or who includes the force the body exerts on the ground (a force on the ground, not on the body), has **NOT** achieved mastery — a wrong free-body diagram guarantees a wrong dynamics answer, and these two errors (phantom motion force, wrong-object force) are the dominant failure modes.

## 2. Student State Matrix

| State | Why here | Tell-tale behaviour | Protocol |
|---|---|---|---|
| S0 | Never drawn a free-body diagram | Cannot begin isolating a body | Protocol A (Concrete) |
| S1 | Draws forces but includes reaction/other-object forces | Adds the force the body exerts on the surface | Protocol B (Counterexample-first) |
| S2-MOTION-FORCE | Draws a force in the direction of motion | Adds "force of movement" for a coasting object | Misconception Engine → Protocol C |
| S2-WRONG-OBJECT | Mixes in forces acting on other objects | Draws the ground's weight, or the body's push on the wall | Misconception Engine → Protocol C |
| S3 | Draws correct forces; mislabels or wrong length | Right set of forces; wrong relative magnitude or axis | Protocol C (Guided Questioning) |
| S6 | Anxiety at multi-arrow diagrams and resolving axes | Freezes when more than two forces act | Protocol F (Low Pressure) |

## 3. Diagnostic Battery

DB-1 (prior-exposure check):
"When solving a forces problem, do you draw a diagram of the forces first? What do you put on it?"
  "A diagram of just that object with every force acting on it as arrows" → S3. Enter Protocol C.
  Draws forces but includes what the object pushes on → S1. Enter Protocol B.
  "No / I don't know what to draw" → DB-2.

DB-2 (misconception probe):
"A block slides across a smooth floor to the right at constant speed, with nothing touching it horizontally. Draw (or describe) the horizontal forces on it."
  "No horizontal force — it coasts; only weight down and normal up act" → S3. Enter Protocol C.
  "A forward force in the direction it's moving" → SIGNAL:MISCONCEPTION:MC-MOTION-FORCE. Enter Misconception Engine.
  "The block's push on the floor" → SIGNAL:MISCONCEPTION:MC-WRONG-OBJECT. Enter Misconception Engine.
  Pause / distress → add S6 flag → confidence question → route (No→S6/F, Yes→S0/A).

DB-3 (confidence calibration):
"How confident are you with drawing free-body diagrams — 1 to 5?"
  1–2 → add S6 flag; apply S6 adaptations.
  4–5 + DB-2 wrong → add S7 flag; override to Protocol G (challenge-first).

## 4. Prerequisite Check

PD-1 (for `phys.mech.newtons-second-law`):
"What is net force, and what does it tell you about an object's acceleration?"
  Cannot connect net force to a = ΣF/m → flag PREREQ-GAP-SECOND-LAW.
  In-session minimum repair: one P06 anchor (ΣF = ma; the diagram exists to find ΣF) — then resume. Deep gap → schedule `phys.mech.newtons-second-law` (S4 route).

## 5. Protocol Library

### Protocol A — Concrete-First (primary)
Serves: S0
CPA entry: C → P → A
Entry condition: never drawn a free-body diagram (DB-1 = doesn't draw, DB-2 = doesn't know).
Success exit: draws a correct free-body diagram (all and only the external forces on the isolated body) AND writes ΣF = ma from it (P91 all 5 CORRECT).
Failure exit: on MOTION-FORCE / WRONG-OBJECT signal → Misconception Engine, then resume TA-4. On multi-arrow overload → Protocol F.
Duration: ~50–60 min.

[TA-1: Isolate the Body]
P01
→ P04[content: "The trick to any forces problem is to focus on ONE object and ask: what is pushing or pulling on THIS thing, right now? We draw the object alone and put an arrow for each force acting on it."]
→ P06[content: place a book on the table; physically point — 'gravity pulls it down,' 'the table pushes it up'; nothing else touches it; draw the book as a dot/box with a down arrow (weight) and an up arrow (normal)]
→ P34[question: "For the book, what two forces did we find, and which way does each point?"] → P55
→ success_path → P49 → P05[curiosity: "Now if I push the book sideways — how many arrows does the diagram get?"]

[TA-2: Every Force, Correct Direction]
P02
→ P07[modality: a force-inventory checklist — Weight (always, down); Normal (perpendicular to surface, if in contact); Tension (along a rope, if attached); Friction (along surface, opposing relative motion, if rough); Applied/Push (direction of the push, while contact lasts); Drag (opposing motion, in a fluid)]
→ P13[think-aloud: "Go down the checklist for the situation. Weight — always, pulling down. In contact with a surface? Add normal, perpendicular. A rope? Add tension along it. Rough surface with sliding? Add friction opposing the motion. Draw each as an arrow FROM the body, length roughly showing its size."]
→ P08[notation: "Label each arrow: W (or mg), N, T, f, F_applied. Then per axis: ΣF_x = ma_x, ΣF_y = ma_y."]
// GR-3 satisfied: P06/P07 preceded P08 (V-8 PASS)
→ P34[question: "A crate is pulled right by a rope on a rough floor. List every force and its direction."] → P55
→ success_path → P49
→ failure_path → P50 → P52[narrow: "Weight down, normal up, tension along the rope (right), friction opposing the slide (left). Four forces — did you get all four with the right directions?"] → re-elicit → P55

[TA-3: From Diagram to Equation]
P02
→ P06[content: a 5 kg box pulled right by 20 N tension, 8 N friction left, on a horizontal floor; draw the four-arrow diagram]
→ P13[think-aloud: "Horizontal: ΣF_x = T − f = 20 − 8 = 12 N → a = 12/5 = 2.4 m/s² right. Vertical: N − W = 0 (no vertical acceleration) → N = W = mg = 49 N. The diagram TELLS you which forces go into each axis equation."]
→ P34[question: "For that box, write the vertical equation and find the normal force (g = 9.8)."] → P55
→ success_path → P49
→ failure_path → P50 → P52[narrow: "Vertically the box doesn't accelerate, so ΣF_y = 0 → N = mg. Which forces are vertical?"] → re-elicit → P55

[TA-4: Misconception Probe — No Phantom Motion Force]
P02
→ P54 // the phantom "force of motion" is the load-bearing misconception; Aristotelian residue
→ P41[diagnostic: "A puck slides right across frictionless ice, nothing touching it. A student draws a forward arrow labelled 'force of motion.' Is that arrow correct? What should the horizontal part of the diagram show?"] → P55
→ [if "no forward force — the puck coasts; horizontally the diagram is empty; only weight down and normal up"] → P49 → P36[probe: "What keeps it moving, if not a force?"] → P55
→ [if "the forward arrow is right / it needs a motion force"] → SIGNAL:MISCONCEPTION:MC-MOTION-FORCE → misconception_repair_chain[MC-MOTION-FORCE]

[TA-5: Formative Assessment]
P02
→ P90_expansion:
    P79[predict: "A ball hangs still from a ceiling by a string. Before drawing — how many forces act on the ball, and are they balanced?"] → P55
    → P49 → P51[check: did they get exactly two (weight down, tension up), balanced, with no extras?]
    → P35[open: "Explain the rule for deciding whether a force belongs on a body's free-body diagram."] → P55

[TA-6: Mastery Gate]
P02
→ P91_expansion:
    P77[generate: "Invent a situation with exactly three forces on a body, draw its free-body diagram, and name each force."] → P55 → CORRECT
    → P76[transfer: "A 2 kg lamp hangs from two strings at equal angles. Draw the free-body diagram and write the vertical equilibrium equation."] → P55 → CORRECT
    → P75[boundary: "Should the force a body exerts on the floor appear on the BODY's free-body diagram? Why or why not?"] → P55 → CORRECT
    → P74[classify: "For a coasting puck on frictionless ice, which forces are on its diagram: (a) weight (b) normal (c) forward motion force?"] → P55 → CORRECT
    → P78[explain: "In your own words: what goes on a free-body diagram, what must be left off, and how does it lead to ΣF = ma?"] → P55 → CORRECT
→ P68 → P62[schedule: first retrieval in 2 days]

### Protocol B — Counterexample-First
Serves: S1 (includes reaction/other-object forces)
CPA entry: P
Entry condition: draws forces but mixes in forces the body exerts on others.
Success exit: draws only the forces acting ON the isolated body, excluding its pushes on other objects.
Failure exit: if triggers WRONG-OBJECT → Misconception Engine → Protocol C.
Key deltas: open P02 → P41["You drew the block's push on the floor on the block's own diagram. That force acts on the FLOOR — does it belong on the BLOCK's diagram?"] → P54 → P55; on stall run P17 (forces ON the body vs. forces BY the body) and P21; converge on TA-3 onward.

### Protocol C — Guided Questioning
Serves: S3 (partial), S2 (post-repair)
CPA entry: P
Entry condition: draws the correct set of forces; mislabels, wrong length, or wrong axis.
Success exit: correct labels, directions, and per-axis resolution.
Failure exit: escalate to Protocol A TA-2 (rebuild with the force-inventory checklist).
Key deltas: enter at TA-3; P36/P51 probes on "which axis does each force act along?"; run P90/P91.

### Protocol D — Prerequisite Repair (S4)
Serves: S4; entry PREREQ-GAP-SECOND-LAW; success = ΣF = ma re-established → return to Protocol A TA-1; failure = schedule `phys.mech.newtons-second-law`, suspend.

### Protocol F — Low Pressure (S6)
Serves: S6
CPA entry: C
Success exit: draws one correct two-force diagram (e.g. hanging or resting object), calmly.
Failure exit: shorten, bank a win, reschedule.
Key deltas: NO P28 (V-10/GR-5); conflict replaced by P30 bridge; keep the force-inventory checklist (P07) visible; P85 regulation_tail per TA; build up from two-force cases before adding friction/tension.

### Protocol G — Challenge-First (S7 override)
Serves: S7; entry DB-3 4–5 with wrong DB-2; success = student removes the phantom motion force after the frictionless-puck contradiction; failure = Misconception Engine[MC-MOTION-FORCE].
Key deltas: open with the frictionless-puck case their "motion force" mishandles; let it sit (P55); P17 contrast; no premature confirmation.

## 6. Misconception Engine

### MC-MOTION-FORCE: "A moving object has a force pushing it in its direction of motion"
trigger_signal: student draws a forward-pointing arrow ("force of motion," "force of the push") on a coasting or already-released object.
conflict_evidence [P28]: "You drew a forward force on the puck sliding on frictionless ice. But nothing is touching it — no hand, no rope, no engine. A force needs a source: what object is exerting that forward force? Point to it. If you can't name the second object, the force isn't real — the puck coasts by inertia (Newton's First Law), with NO horizontal force at all."
bridge_text [P30]: "Motion doesn't require a force to continue — only to change. A free-body diagram shows forces, not motion. A coasting object has an empty horizontal diagram: no 'motion force' exists. Only draw a horizontal force if something is actively pushing or rubbing right now."
replacement_text [P31]: "For every arrow, name the object exerting it. No source object → no force → no arrow. A coasting body has no force in its direction of travel."
discrimination_pairs [P33]: ["puck coasting on frictionless ice: horizontal diagram empty ✓", "puck being pushed by a hand: forward applied force while contact lasts ✓", "puck coasting with a drawn 'motion force': ✗ no source object"]
s6_path: skip P28; use "who is pushing it forward right now?" as a gentle shared question — if no answer, no arrow — then P30.

### MC-WRONG-OBJECT: "Forces the body exerts on other things belong on its own diagram"
trigger_signal: student adds the body's push on the ground/wall, or another object's weight, to the body's free-body diagram.
conflict_evidence [P28]: "You drew the block pushing DOWN on the table on the block's own diagram. But that force acts on the TABLE, not the block. A free-body diagram only shows forces acting ON the chosen body. The block's push on the table pushes the table — put it on the table's diagram, not the block's."
bridge_text [P30]: "Isolate ONE body. Only forces exerted ON it by other objects go on its diagram. Forces it exerts on others live on those others' diagrams. 'ON the body' — every single arrow must satisfy that test."
replacement_text [P31]: "For each candidate force ask: does this act ON my chosen body? If it acts on something else, it does not belong on this diagram."
discrimination_pairs [P33]: ["table pushes block up (normal): ON the block ✓", "block pushes table down: on the TABLE, not the block ✗", "Earth pulls block down (weight): ON the block ✓"]
s6_path: skip P28; sort candidate forces into "on the block" vs "on something else" as a gentle two-pile activity, then P30.

## 7. Assessment Battery

| Probe | Item | Expected signal |
|---|---|---|
| P74 (classify) | "Coasting puck on frictionless ice — is a forward motion force on its diagram?" | CORRECT = no; only weight and normal |
| P74 (classify) | "Does the block's push on the floor go on the block's diagram?" | CORRECT = no; it acts on the floor |
| P75 (boundary) | "Why exclude forces the body exerts on other objects?" | CORRECT = diagram shows only forces ON the body |
| P76 (transfer) | "2 kg lamp on two equal-angle strings — diagram + vertical equilibrium equation." | CORRECT = weight down, two tensions; 2T cosθ-terms balance mg |
| P77 (generate) | "Invent a three-force situation, draw the diagram, name each force." | CORRECT = valid three-force diagram |
| P78 (explain) | "What belongs on a free-body diagram and what must be left off?" | CORRECT = all external forces ON the body; nothing the body exerts, no phantom forces |
| P79 (predict) | "Ball hanging still from a string — how many forces, balanced?" | CORRECT = two (weight, tension), balanced |

## 8. Mastery Gate (P91 expansion — canonical order P77→P76→P75→P74→P78)
P77: "Invent a situation with exactly three forces on a body, draw its free-body diagram, and name each force." → expected: CORRECT
P76: "A 2 kg lamp hangs from two strings at equal angles — draw the free-body diagram and write the vertical equilibrium equation." → expected: CORRECT
P75: "Should the force a body exerts on the floor appear on the body's own free-body diagram? Why or why not?" → expected: CORRECT
P74: "For a coasting puck on frictionless ice, which forces are on its diagram: (a) weight (b) normal (c) forward motion force?" → expected: CORRECT
P78: "In your own words: what goes on a free-body diagram, what must be left off, and how does it lead to ΣF = ma?" → expected: CORRECT

## 9. Retrieval Schedule (P89 expansion)
Interval 1 (2 days): "Draw the free-body diagram of a book resting on a table. Name each force."
Interval 2 (5 days): "Draw the free-body diagram of a crate being pulled right along a rough floor by a rope."
Interval 3 (10 days): "A skydiver falls at terminal velocity. Draw the free-body diagram and state the net force."
Interval 4 (21 days): "A block sits on a frictionless incline. Draw its free-body diagram and write ΣF along the slope."
Interval 5 (60 days): "Explain to a classmate the two most common mistakes in free-body diagrams and how to avoid each."

---
V-check status:
- V-1 all 10 KG fields ✓ · V-2 NOT-clause ✓ · V-3 DB 2–3 Qs, every branch → state ✓ · V-4 every plausible state (S0,S1,S2,S3,S6[,S4 via PD-1]) has a Protocol ✓ · V-5 every Protocol success+failure exit ✓ · V-6 every TA opens P01/P02 ✓ · V-7 elicitations followed by P55 ✓ · V-8 no P08 without prior P06/P07 (TA-2) ✓ · V-9 Schema Repair via P41 gate (TA-4) ✓ · V-10 no P28 in S6 Protocol F ✓ · V-11 P91 terminal; P68→P62 ✓ · V-12 no >3 consecutive C without E break ✓ · V-13 P54 before high-difficulty first-attempt (TA-4, Protocol B) ✓ · V-14 assessment not first (TA-5/6) ✓ · V-15 Named Compounds expanded ✓ · V-16 IC-1..20 ✓ · V-17 AIR invariants per TA ✓ · V-18 P90 (TA-5) before P91 (TA-6) ✓ · V-19 P91 5 probes ✓ · V-20 P89 intervals authored ✓
status: READY
PACKAGE_READY
