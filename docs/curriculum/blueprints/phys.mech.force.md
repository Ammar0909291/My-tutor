# Teaching Blueprint: phys.mech.force

## 0. Concept Profile

concept_id: phys.mech.force
name: Force and Interaction
domain: Classical Mechanics (Physics)
difficulty: foundational (1)
bloom: understand
prerequisites: [phys.meas.scalars-vectors]
mastery_threshold: 0.70
estimated_hours: 2
cross_links: []
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (pushing and pulling real objects before introducing vector notation; difficulty ≤ 2)
status: READY

## 1. Learning Objective

[Boundary statement]
A student who achieves mastery demonstrates:
1. Defines a **force** as a vector quantity arising from an interaction between two objects, whose effect is to change — or tend to change — the state of motion of an object.
2. Classifies forces as **contact** (friction, tension, normal force, applied force) or **non-contact** (gravity, magnetic, electric) and names both objects in the interaction for any given force.
3. States that the **net force** is the vector sum of all forces acting on an object, and that a net force of zero does not mean no forces are present.

A student who says "the moving ball has force in it" (impetus theory), or who cannot name both objects in a force interaction, has **NOT** achieved mastery — these Aristotelian holdovers directly contradict Newton's Laws and corrupt every subsequent mechanics result.

## 2. Student State Matrix

| State | Why here | Tell-tale behaviour | Protocol |
|---|---|---|---|
| S0 | No formal definition of force | Uses "force" loosely as effort or energy | Protocol A (Concrete) |
| S1 | "Push or pull" schema only | Cannot name both objects; can't distinguish contact/non-contact | Protocol B (Counterexample-first) |
| S2-FORCE-IS-IMPETUS | Believes objects contain or store force | "The ball has force because it was kicked" | Misconception Engine → Protocol C |
| S2-FORCE-CAUSES-MOTION | Believes net force is needed to sustain motion | "Something must be pushing the coasting car" | Misconception Engine → Protocol C |
| S3 | Can define force; fails vector sum or interaction pair | Omits direction on net force; names only one object | Protocol C (Guided Questioning) |
| S6 | Anxiety at vector arrows and "net force" language | Freezes at ΣF notation or arrow addition | Protocol F (Low Pressure) |

## 3. Diagnostic Battery

DB-1 (prior-exposure check):
"What is a force? Give an example — and name both objects involved in that force."
  Gives interaction pair + direction (e.g. "earth pulls the ball downward; ball pulls earth upward") → S3. Enter Protocol C.
  "A push or pull" without both objects → S1. Enter Protocol B.
  "Energy the object has" / "the ball has force from being kicked" → SIGNAL:MISCONCEPTION:MC-FORCE-IS-IMPETUS. Enter Misconception Engine.
  Pause / cannot define → DB-2.

DB-2 (representation test):
"A book sits still on a table. Is there a force on it? If so, where does it come from?"
  "Gravity from Earth pulls it down; table pushes it up — they balance" → S3. Enter Protocol C.
  "No force — it's not moving" → SIGNAL:MISCONCEPTION:MC-FORCE-CAUSES-MOTION. Enter Misconception Engine.
  Pause / "I don't know" → add S6 flag → confidence question → route (No→S6/F, Yes→S0/A).

DB-3 (confidence calibration):
"How confident are you with the concept of force — 1 to 5?"
  1–2 → add S6 flag; apply S6 adaptations.
  4–5 + DB-1/DB-2 wrong → add S7 flag; override to Protocol G (challenge-first).

## 4. Prerequisite Check

PD-1 (for `phys.meas.scalars-vectors`):
"What is the difference between a scalar quantity and a vector quantity? Give one example of each."
  Cannot distinguish scalar from vector → flag PREREQ-GAP-SCALARS-VECTORS.
  In-session minimum repair: one P06 anchor (arrow on paper — magnitude AND direction vs. a single number) — then resume. Deep gap → schedule `phys.meas.scalars-vectors` (S4 route).

## 5. Protocol Library

### Protocol A — Concrete-First (primary)
Serves: S0
CPA entry: C → P → A
Entry condition: no formal definition of force (DB-1 = cannot define).
Success exit: names both objects in a force interaction, classifies contact/non-contact, and describes net force as vector sum (P91 all 5 CORRECT).
Failure exit: on FORCE-IS-IMPETUS / FORCE-CAUSES-MOTION signal → Misconception Engine, then resume TA-4. On vector-arrow collapse → Protocol F.
Duration: ~40–50 min.

[TA-1: Interactions, Not Things]
P01
→ P04[content: "When something happens to an object — it speeds up, slows down, or changes direction — a force is involved. But a force isn't inside the object; it's a relationship between two objects."]
→ P06[content: push a book across the desk — ask: what are the two objects involved? (hand and book); drop an eraser — what are the two objects? (Earth and eraser)]
→ P34[question: "You kick a ball. Name both objects in that force interaction."] → P55
→ success_path → P49 → P05[curiosity: "Once the ball is in the air and your foot isn't touching it — is your kick still exerting a force on it?"]

[TA-2: Contact vs Non-Contact]
P02
→ P07[modality: two-column table — Contact forces (friction, tension, normal, applied) with everyday examples; Non-contact forces (gravity, magnetic, electric) with examples]
→ P13[think-aloud: "Contact forces require physical touching — a rope pulling, a surface pushing. Non-contact forces act across a gap — gravity pulls you toward Earth without touching it; a magnet attracts iron without contact."]
→ P34[question: "Classify each: (a) a rope holding a chandelier (b) Earth pulling a satellite (c) a foot kicking a ball"] → P55
→ success_path → P49
→ failure_path → P50 → P52[narrow: "Is anything physically touching? If yes: contact. If no: non-contact. Gravity, electric, magnetic forces — no touching needed."] → re-elicit → P55

[TA-3: Force as a Vector — Net Force]
P02
→ P06[content: two students push a box from opposite sides — one harder than the other; result is motion in the direction of the stronger push]
→ P13[think-aloud: "Force is a vector — it has magnitude (how hard) and direction (which way). When multiple forces act on one object, they add as vectors. 10 N right + 4 N left = 6 N right. That total is the NET force."]
→ P08[notation: "Net force = ΣF (vector sum). If ΣF = 0, the forces balance — even if individual forces are present."]
// GR-3 satisfied: P06/P07 preceded P08 (V-8 PASS — P07 in TA-2 precedes this P08)
→ P34[question: "A 20 N force acts right and a 20 N force acts left on a box. What is the net force?"] → P55
→ success_path → P49
→ failure_path → P50 → P52[narrow: "They're equal and opposite — their vector sum is zero. Zero net force, not zero forces."] → re-elicit → P55

[TA-4: Misconception Probe — Impetus]
P02
→ P54 // impetus (stored force) is the dominant Aristotelian holdover; directly contradicts Newton's Laws
→ P41[diagnostic: "A ball is rolling across a frictionless surface with no air resistance and nothing touching it. What force is acting horizontally on it?"] → P55
→ [if "no horizontal force — nothing is touching it; it keeps rolling without force"] → P49 → P36[probe: "So what would stop it eventually if friction and air resistance existed?"] → P55
→ [if "the kick gave it force" / "it has forward force"] → SIGNAL:MISCONCEPTION:MC-FORCE-IS-IMPETUS → misconception_repair_chain[MC-FORCE-IS-IMPETUS]

[TA-5: Formative Assessment]
P02
→ P90_expansion:
    P79[predict: "A book rests on a table. Before listing forces — predict: is the net force on the book zero or non-zero?"] → P55
    → P49 → P51[check: did they name both gravity and normal force, and conclude ΣF = 0?]
    → P35[open: "Explain why zero net force does NOT mean no forces are present."] → P55

[TA-6: Mastery Gate]
P02
→ P91_expansion:
    P77[generate: "Describe a situation with two forces acting on an object where the net force is zero — name both forces and both object pairs."] → P55 → CORRECT
    → P76[transfer: "A tug-of-war rope: Team A pulls with 500 N left, Team B pulls with 500 N right. What is the net force on the rope? Is there a force?"] → P55 → CORRECT
    → P75[boundary: "Can a force exist without an interaction between two objects?"] → P55 → CORRECT
    → P74[classify: "Contact or non-contact: (a) gravity on a falling apple (b) friction on sliding shoes (c) magnetic attraction"] → P55 → CORRECT
    → P78[explain: "In your own words: what is a force, why is it a vector, and what makes the net force different from the individual forces?"] → P55 → CORRECT
→ P68 → P62[schedule: first retrieval in 2 days]

### Protocol B — Counterexample-First
Serves: S1 ("push or pull" only, both-objects gap)
CPA entry: P
Entry condition: gives a valid everyday example but cannot name both objects or cannot distinguish contact/non-contact.
Success exit: names both objects in an interaction, classifies contact/non-contact, and computes a simple net force.
Failure exit: if triggers FORCE-IS-IMPETUS → Misconception Engine → Protocol C.
Key deltas: open P02 → P41["A magnet pulls a paperclip from 5 cm away. Name both objects. Are they touching? Is there a force?"] → P54 → P55; on stall run P17 (contact vs. non-contact, both-objects rule) and P21; converge on TA-3 onward.

### Protocol C — Guided Questioning
Serves: S3 (partial), S2 (post-repair)
CPA entry: P
Entry condition: can define force; fails vector sum or cannot identify both interaction objects.
Success exit: correctly computes net force (including zero) and names both objects for any example.
Failure exit: escalate to Protocol A TA-2/TA-3 to rebuild with the classification table and the box-push demo.
Key deltas: enter at TA-3; P36/P51 probes; run P90/P91.

### Protocol D — Prerequisite Repair (S4)
Serves: S4; entry PREREQ-GAP-SCALARS-VECTORS; success = scalar/vector distinction re-established → return to Protocol A TA-1; failure = schedule `phys.meas.scalars-vectors`, suspend.

### Protocol F — Low Pressure (S6)
Serves: S6
CPA entry: C
Success exit: correctly names both objects in one force example and classifies it, calmly.
Failure exit: shorten, bank a win, reschedule.
Key deltas: NO P28 (V-10/GR-5); conflict replaced by P30 bridge; keep force-type table (P07) visible as reference; P85 regulation_tail per TA.

### Protocol G — Challenge-First (S7 override)
Serves: S7; entry DB-3 4–5 with wrong DB-1/DB-2; success = student revises impetus or force-causes-motion claim after the frictionless-surface contradiction; failure = Misconception Engine[MC-FORCE-IS-IMPETUS].
Key deltas: open with P41 frictionless-ball case; let it sit (P55); P17 contrast; no premature confirmation.

## 6. Misconception Engine

### MC-FORCE-IS-IMPETUS: "Objects contain or carry force after being pushed"
trigger_signal: student says "the ball has force in it from the kick" or "force travels with the moving object."
conflict_evidence [P28]: "Right after you kick the ball and your foot leaves it, is your foot touching the ball? No. Can a force exist between two objects that aren't touching and aren't magnets or gravity? For your kick to still be in the ball, it would have to act across empty space with no physical contact and no field. Where is that force coming from after the foot leaves?"
bridge_text [P30]: "Forces require an ongoing interaction. Once the foot leaves the ball, the kick is over — it's not stored. What keeps the ball moving is not a force but the absence of a force to stop it (Newton's First Law, coming soon). The only horizontal force on a freely rolling ball is zero."
replacement_text [P31]: "Force = interaction between two objects, right now. When the interaction ends, the force ends. Objects don't store forces."
discrimination_pairs [P33]: ["foot touching ball: force exists (contact) ✓", "ball in air, nothing touching it horizontally: no horizontal force ✓", "ball slowing on ground: friction from ground acts on ball ✓ (two objects still interacting)"]
s6_path: skip P28; use the foot-leaves-ball moment as a shared gentle question — "Can the foot push from 1 m away?" — then P30.

### MC-FORCE-CAUSES-MOTION: "A net force is needed to keep an object in motion"
trigger_signal: student proposes a mystery "forward force" or "motion force" to explain why a coasting object keeps moving.
conflict_evidence [P28]: "A hockey puck slides across ice with almost no friction. Nothing is touching it horizontally. You just said there must be a forward force — but what two objects does it act between? Point to the second object."
bridge_text [P30]: "Motion doesn't need force to continue — it only needs force to change (Newton's First Law). A net force of zero means the object continues moving at constant velocity. Needing a force to keep moving is the Aristotelian idea; Newton replaced it."
replacement_text [P31]: "Net force changes motion. No net force → motion continues unchanged. Force is never needed just to maintain constant velocity."
discrimination_pairs [P33]: ["coasting puck, no friction: ΣF = 0, constant velocity ✓", "car slowing without engine: friction and air resistance decelerate it — those are the forces, not absence of a 'forward force' ✓"]
s6_path: skip P28; use "what two objects?" as a gentle shared puzzle to surface the gap, then P30.

## 7. Assessment Battery

| Probe | Item | Expected signal |
|---|---|---|
| P74 (classify) | "Contact or non-contact: gravity on the Moon's surface" | CORRECT = non-contact |
| P74 (classify) | "A rope tied to a wall holds a swinging lamp — what force, and which two objects?" | CORRECT = tension; rope and lamp |
| P75 (boundary) | "Can a force exist without two objects involved? Explain." | CORRECT = no; force is always an interaction |
| P76 (transfer) | "30 N right and 10 N left on a crate — net force?" | CORRECT = 20 N right |
| P77 (generate) | "Describe a situation with ΣF = 0 — name both force pairs." | CORRECT = valid balanced-forces example |
| P78 (explain) | "What makes net force different from a single force?" | CORRECT = net force = vector sum; individual forces can be large yet cancel |
| P79 (predict) | "Book on a table — predict net force before listing forces." | CORRECT = zero (gravity balanced by normal force) |

## 8. Mastery Gate (P91 expansion — canonical order P77→P76→P75→P74→P78)
P77: "Describe a situation with two forces on one object where ΣF = 0 — name both forces and both object pairs." → expected: CORRECT
P76: "Tug-of-war: Team A pulls 500 N left, Team B pulls 500 N right — net force on the rope?" → expected: CORRECT (0 N; forces present but balanced)
P75: "Can a force exist without an interaction between two objects?" → expected: CORRECT (no)
P74: "Classify as contact or non-contact: (a) gravity on a falling apple (b) friction on sliding shoes (c) magnetic attraction." → expected: CORRECT
P78: "In your own words: what is a force, why is it a vector, and how does net force differ from individual forces?" → expected: CORRECT

## 9. Retrieval Schedule (P89 expansion)
Interval 1 (2 days): "Name the two objects in each interaction: (a) gravity on a book (b) friction on a tyre (c) a hand pushing a door."
Interval 2 (5 days): "Classify each force as contact or non-contact and give its direction: tension, gravity, normal force, magnetic force."
Interval 3 (10 days): "Three forces act on a box: 15 N right, 8 N left, 3 N left. Find the net force."
Interval 4 (21 days): "A ball rolls across a smooth floor. List all forces on it and find the net force. What happens to its speed?"
Interval 5 (60 days): "Explain to a classmate why a coasting skateboard does not need a forward force to keep moving."

---
V-check status:
- V-1 all 10 KG fields ✓ · V-2 NOT-clause ✓ · V-3 DB 2–3 Qs, every branch → state ✓ · V-4 every plausible state (S0,S1,S2,S3,S6[,S4 via PD-1]) has a Protocol ✓ · V-5 every Protocol success+failure exit ✓ · V-6 every TA opens P01/P02 ✓ · V-7 elicitations followed by P55 ✓ · V-8 no P08 without prior P06/P07 (TA-3) ✓ · V-9 Schema Repair via P41 gate (TA-4) ✓ · V-10 no P28 in S6 Protocol F ✓ · V-11 P91 terminal; P68→P62 ✓ · V-12 no >3 consecutive C without E break ✓ · V-13 P54 before high-difficulty first-attempt (TA-4, Protocol B) ✓ · V-14 assessment not first (TA-5/6) ✓ · V-15 Named Compounds expanded ✓ · V-16 IC-1..20 ✓ · V-17 AIR invariants per TA ✓ · V-18 P90 (TA-5) before P91 (TA-6) ✓ · V-19 P91 5 probes ✓ · V-20 P89 intervals authored ✓
status: READY
PACKAGE_READY
