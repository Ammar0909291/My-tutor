# Teaching Blueprint: phys.mech.newtons-third-law

## 0. Concept Profile

concept_id: phys.mech.newtons-third-law
name: Newton's Third Law — Action-Reaction
domain: Classical Mechanics (Physics)
difficulty: developing (2)
bloom: understand
prerequisites: [phys.mech.newtons-second-law]
mastery_threshold: 0.75
estimated_hours: 3
cross_links: []
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (pushing off a wall on a skateboard before formalising the pair; difficulty ≤ 2)
status: READY

## 1. Learning Objective

[Boundary statement]
A student who achieves mastery demonstrates:
1. States Newton's Third Law: when object A exerts a force on object B, object B exerts an **equal in magnitude, opposite in direction** force on A — and that the two forces **always act on different objects**.
2. Correctly identifies the reaction partner of a given force by naming both objects ("Earth pulls ball down" ↔ "ball pulls Earth up"), and never pairs two forces that act on the same object.
3. Explains why action-reaction pairs **do not cancel** (they act on different bodies) — distinguishing them from balanced forces on a single body (Second Law / equilibrium).

A student who says "the reaction force is the normal force balancing weight" (both act on the same object — a First-Law balance, not a Third-Law pair), or who thinks the larger object in a collision exerts the larger force, has **NOT** achieved mastery — the same-object pairing error is the single most common Third-Law failure and undermines all force analysis downstream.

## 2. Student State Matrix

| State | Why here | Tell-tale behaviour | Protocol |
|---|---|---|---|
| S0 | No exposure to action-reaction | Cannot state any reciprocal-force idea | Protocol A (Concrete) |
| S1 | "Every action has a reaction" slogan only | Recites the phrase; can't identify a real pair | Protocol B (Counterexample-first) |
| S2-SAME-OBJECT-PAIR | Pairs two forces on the same object | Calls weight-and-normal-force an action-reaction pair | Misconception Engine → Protocol C |
| S2-BIGGER-EXERTS-MORE | Thinks larger/faster object exerts a bigger force | "The truck hits the car harder than the car hits the truck" | Misconception Engine → Protocol C |
| S3 | States the law; falters on the different-objects rule | Correct magnitudes; muddles which object each force acts on | Protocol C (Guided Questioning) |
| S6 | Anxiety at the counterintuitive equal-force claim | Freezes at "the car pushes the truck just as hard" | Protocol F (Low Pressure) |

## 3. Diagnostic Battery

DB-1 (prior-exposure check):
"When you push on a wall, does the wall push back on you? What can you say about the two forces?"
  "Yes — equal and opposite, and they act on different objects (me and the wall)" → S3. Enter Protocol C.
  "Every action has an equal and opposite reaction" (slogan, no object identification) → S1. Enter Protocol B.
  "No / I don't know" → DB-2.

DB-2 (misconception probe):
"A large truck collides head-on with a small car. During the collision, which exerts the greater force on the other — the truck on the car, or the car on the truck?"
  "Equal forces — Newton's Third Law; they act on different vehicles" → S3. Enter Protocol C.
  "The truck exerts more force" → SIGNAL:MISCONCEPTION:MC-BIGGER-EXERTS-MORE. Enter Misconception Engine.
  "A book on a table — its weight and the table's push are the action-reaction pair" (if offered) → SIGNAL:MISCONCEPTION:MC-SAME-OBJECT-PAIR. Enter Misconception Engine.
  Pause / discomfort → add S6 flag → confidence question → route (No→S6/F, Yes→S0/A).

DB-3 (confidence calibration):
"How confident are you with action-reaction pairs — 1 to 5?"
  1–2 → add S6 flag; apply S6 adaptations.
  4–5 + DB-2 wrong → add S7 flag; override to Protocol G (challenge-first).

## 4. Prerequisite Check

PD-1 (for `phys.mech.newtons-second-law`):
"What does net force do to an object, and how is it related to acceleration?"
  Cannot connect net force to a = ΣF/m → flag PREREQ-GAP-SECOND-LAW.
  In-session minimum repair: one P06 anchor (ΣF = ma; net force on one body) — then resume. Deep gap → schedule `phys.mech.newtons-second-law` (S4 route).

## 5. Protocol Library

### Protocol A — Concrete-First (primary)
Serves: S0
CPA entry: C → P → A
Entry condition: no exposure to reciprocal forces (DB-1 = no idea, DB-2 = cannot engage).
Success exit: names both objects in a reaction pair AND explains why the pair does not cancel (P91 all 5 CORRECT).
Failure exit: on SAME-OBJECT-PAIR / BIGGER-EXERTS-MORE signal → Misconception Engine, then resume TA-4. On equal-force disbelief → Protocol F.
Duration: ~50–60 min.

[TA-1: Push and Be Pushed]
P01
→ P04[content: "Every push is a two-way street. When you push on something, it pushes back on you — always, and always just as hard. You feel this every time you push off a wall."]
→ P06[content: student on a skateboard/office chair pushes off a wall — rolls backward; ask what pushed them, given their hand only pushed the wall forward]
→ P34[question: "Your hand pushed the wall. But YOU rolled backward. What force moved you, and where did it come from?"] → P55
→ success_path → P49 → P05[curiosity: "If the wall pushes you back exactly as hard as you push it — why don't the two pushes just cancel and nothing happens?"]

[TA-2: Naming the Pair — Two Objects, Always]
P02
→ P07[modality: a paired-force table — "A on B" and "B on A" columns; rows: (hand pushes wall / wall pushes hand), (Earth pulls ball / ball pulls Earth), (rocket pushes gas down / gas pushes rocket up); each row names both objects explicitly]
→ P13[think-aloud: "Every force has a partner. If A pushes B, then B pushes A — equal size, opposite direction. The crucial thing: the two forces act on DIFFERENT objects. One acts on B, the other on A. That's why we always name both objects."]
→ P08[notation: "F(A on B) = −F(B on A) — equal magnitude, opposite direction, different objects."]
// GR-3 satisfied: P06/P07 preceded P08 (V-8 PASS)
→ P34[question: "A swimmer pushes water backward. Name the reaction force and say what it acts on."] → P55
→ success_path → P49
→ failure_path → P50 → P52[narrow: "The swimmer pushes the water backward → the water pushes the swimmer forward. Two objects: water and swimmer. Which force moves the swimmer?"] → re-elicit → P55

[TA-3: Why the Pair Doesn't Cancel]
P02
→ P06[content: two students on skateboards push each other apart — both roll away; contrast with a book on a table where weight (Earth on book) and normal force (table on book) both act on the book and it stays still]
→ P13[think-aloud: "Action-reaction forces act on DIFFERENT objects, so they can never cancel — each pushes its own object. But weight and normal force on a book BOTH act on the book — those are balanced forces (First/Second Law), a completely different situation. Don't confuse a same-object balance with a two-object reaction pair."]
→ P34[question: "For a book resting on a table, is the normal force the Third-Law reaction to the book's weight? Explain why or why not."] → P55
→ success_path → P49
→ failure_path → P50 → P52[narrow: "Both weight and normal force act on the book — same object. A reaction pair must act on two different objects. The reaction to Earth-pulls-book is book-pulls-Earth, not the table's push."] → re-elicit → P55

[TA-4: Misconception Probe — Same-Object Pairing]
P02
→ P54 // the same-object vs different-object distinction is the load-bearing, most-failed idea
→ P41[diagnostic: "A book lies on a table. A student claims: 'The book's weight (down) and the table's normal force (up) are an action-reaction pair.' Is the student right? If not, what IS the reaction to the book's weight?"] → P55
→ [if "no — both act on the book, so they're balanced forces, not a pair; the reaction to Earth pulling the book down is the book pulling the Earth up"] → P49 → P36[probe: "How can you always tell a true reaction pair?"] → P55
→ [if "yes, they're an action-reaction pair"] → SIGNAL:MISCONCEPTION:MC-SAME-OBJECT-PAIR → misconception_repair_chain[MC-SAME-OBJECT-PAIR]

[TA-5: Formative Assessment]
P02
→ P90_expansion:
    P79[predict: "A mosquito splatters on a fast lorry's windscreen. Before we discuss — during impact, does the lorry push the mosquito harder, or does the mosquito push the lorry equally hard?"] → P55
    → P49 → P51[check: did they assert equal forces (Third Law), even though the effects differ wildly?]
    → P35[open: "Explain how the forces can be equal yet the mosquito is destroyed and the lorry is unharmed."] → P55

[TA-6: Mastery Gate]
P02
→ P91_expansion:
    P77[generate: "Describe an everyday action-reaction pair and name both objects and both force directions."] → P55 → CORRECT
    → P76[transfer: "A rocket expels gas downward. Explain how Newton's Third Law makes the rocket go up, naming the pair."] → P55 → CORRECT
    → P75[boundary: "Why don't the two forces in an action-reaction pair cancel each other out?"] → P55 → CORRECT
    → P74[classify: "Book on table: is the table's normal force the Third-Law reaction to the book's weight? Yes or no, and why?"] → P55 → CORRECT
    → P78[explain: "In your own words: state Newton's Third Law and explain the different-objects rule."] → P55 → CORRECT
→ P68 → P62[schedule: first retrieval in 2 days]

### Protocol B — Counterexample-First
Serves: S1 (slogan without identification)
CPA entry: P
Entry condition: recites "every action has a reaction" but cannot name a real pair or its objects.
Success exit: identifies both objects and directions for a concrete reaction pair.
Failure exit: if triggers SAME-OBJECT-PAIR → Misconception Engine → Protocol C.
Key deltas: open P02 → P41["You said 'every action has a reaction.' A book sits on a table. Name the reaction to its weight — and say what object that reaction acts on."] → P54 → P55; on stall run P17 (same-object balance vs. two-object pair) and P21; converge on TA-3 onward.

### Protocol C — Guided Questioning
Serves: S3 (partial), S2 (post-repair)
CPA entry: P
Entry condition: states the law; muddles which object each force acts on.
Success exit: consistently assigns each force of a pair to its correct (different) object.
Failure exit: escalate to Protocol A TA-2/TA-3 (rebuild with the paired-force table and same-object contrast).
Key deltas: enter at TA-3; P36/P51 probes on "which object does each force act on?"; run P90/P91.

### Protocol D — Prerequisite Repair (S4)
Serves: S4; entry PREREQ-GAP-SECOND-LAW; success = net-force/ΣF=ma re-established → return to Protocol A TA-1; failure = schedule `phys.mech.newtons-second-law`, suspend.

### Protocol F — Low Pressure (S6)
Serves: S6
CPA entry: C
Success exit: names one reaction pair with both objects, calmly.
Failure exit: shorten, bank a win, reschedule.
Key deltas: NO P28 (V-10/GR-5); conflict replaced by P30 bridge; keep the paired-force table (P07) visible; P85 regulation_tail per TA; frame the equal-force claim through the felt skateboard push rather than argument.

### Protocol G — Challenge-First (S7 override)
Serves: S7; entry DB-3 4–5 with wrong DB-2; success = student revises bigger-exerts-more or same-object claim after the contradiction; failure = Misconception Engine[MC-BIGGER-EXERTS-MORE or MC-SAME-OBJECT-PAIR].
Key deltas: open with the truck-car equal-force case or the book same-object case their claim mishandles; let it sit (P55); P17 contrast; no premature confirmation.

## 6. Misconception Engine

### MC-SAME-OBJECT-PAIR: "Two forces on the same object form an action-reaction pair"
trigger_signal: student calls weight-and-normal-force (both on a resting book) a Third-Law pair, or pairs any two forces acting on one body.
conflict_evidence [P28]: "You paired the book's weight with the table's push. But BOTH of those act on the BOOK. A Third-Law pair has one force on each of TWO objects. Test it: remove the table. The book's weight is still there — but the 'partner' vanished. A real reaction partner is tied to its force forever. The true partner of 'Earth pulls book down' is 'book pulls Earth up' — that one acts on the Earth, and it never disappears."
bridge_text [P30]: "The reaction to a force always acts on the OTHER object in the interaction. Weight = Earth pulling book (acts on book); its reaction = book pulling Earth (acts on Earth). The table's normal force is a separate interaction (table–book), and it balances the weight on the book — that's the First Law, not the Third."
replacement_text [P31]: "To find a reaction partner, swap the two objects: 'A on B' → 'B on A.' If your two forces act on the same object, they are NOT a Third-Law pair — they are balanced (or unbalanced) forces on one body."
discrimination_pairs [P33]: ["Earth pulls book down ↔ book pulls Earth up: TRUE pair (two objects) ✓", "book's weight + table's normal force: both on book → NOT a pair (same object) ✗", "table pushes book up ↔ book pushes table down: TRUE pair (two objects) ✓"]
s6_path: skip P28; use "which object does each force push on?" as a gentle shared sorting task with the paired-force table, then P30.

### MC-BIGGER-EXERTS-MORE: "A bigger or faster object exerts a larger force in a collision"
trigger_signal: student claims the truck hits the car harder than the car hits the truck, or the fast object exerts more force.
conflict_evidence [P28]: "The truck and car push on each other during the crash. Newton's Third Law says those two forces are equal in size — always, no exceptions, regardless of mass or speed. What differs is the EFFECT: the same force gives the light car a huge acceleration (a = F/m, small m) and the heavy truck a tiny one (large m). Equal forces, wildly unequal accelerations. The damage difference is about mass, not about force."
bridge_text [P30]: "In every interaction the two forces are equal and opposite — that's the Third Law, no exceptions. Different outcomes come from the Second Law: the same force produces a larger acceleration on a smaller mass. Force equal; acceleration unequal."
replacement_text [P31]: "Collision forces are always equal (Third Law). The damage/motion difference is explained by a = F/m (Second Law), not by unequal forces."
discrimination_pairs [P33]: ["truck–car crash: forces equal ✓, accelerations unequal (car's larger) ✓", "mosquito–lorry: forces equal ✓, mosquito's acceleration enormous ✓", "'truck exerts more force': ✗ violates the Third Law"]
s6_path: skip P28; walk the "same force, but a = F/m — which one gets flung?" reasoning gently as a shared calculation, then P30.

## 7. Assessment Battery

| Probe | Item | Expected signal |
|---|---|---|
| P74 (classify) | "Book on table: is normal force the reaction to weight?" | CORRECT = no; both act on the book (balanced, not a pair) |
| P74 (classify) | "Swimmer pushes water back — what is the reaction and on what?" | CORRECT = water pushes swimmer forward (on the swimmer) |
| P75 (boundary) | "Why don't action-reaction forces cancel?" | CORRECT = they act on different objects |
| P76 (transfer) | "Rocket expels gas down — explain the upward thrust via the pair." | CORRECT = rocket pushes gas down ↔ gas pushes rocket up |
| P77 (generate) | "Give an everyday reaction pair, naming both objects and directions." | CORRECT = valid two-object pair |
| P78 (explain) | "State the Third Law and the different-objects rule." | CORRECT = equal, opposite, on two different bodies |
| P79 (predict) | "Truck hits car — which exerts the greater force?" | CORRECT = equal forces |

## 8. Mastery Gate (P91 expansion — canonical order P77→P76→P75→P74→P78)
P77: "Describe an everyday action-reaction pair — name both objects and both force directions." → expected: CORRECT
P76: "A rocket expels gas downward. Explain how Newton's Third Law makes it rise, naming the pair." → expected: CORRECT
P75: "Why don't the two forces in an action-reaction pair cancel each other out?" → expected: CORRECT
P74: "Book on a table: is the table's normal force the Third-Law reaction to the book's weight? Yes or no, and why?" → expected: CORRECT
P78: "In your own words: state Newton's Third Law and explain the different-objects rule." → expected: CORRECT

## 9. Retrieval Schedule (P89 expansion)
Interval 1 (2 days): "You jump off a small boat onto a dock. Name the action-reaction pair and what happens to the boat."
Interval 2 (5 days): "For a walking person, what force pushes them forward, and what is its reaction partner?"
Interval 3 (10 days): "A book rests on a table. List all forces on the book and, separately, name the true Third-Law partner of each."
Interval 4 (21 days): "A 40-tonne lorry and a 1-tonne car collide. Compare the forces and the accelerations, explaining each with the correct law."
Interval 5 (60 days): "Explain to a classmate why a rocket works in the vacuum of space, with nothing to push against."

---
V-check status:
- V-1 all 10 KG fields ✓ · V-2 NOT-clause ✓ · V-3 DB 2–3 Qs, every branch → state ✓ · V-4 every plausible state (S0,S1,S2,S3,S6[,S4 via PD-1]) has a Protocol ✓ · V-5 every Protocol success+failure exit ✓ · V-6 every TA opens P01/P02 ✓ · V-7 elicitations followed by P55 ✓ · V-8 no P08 without prior P06/P07 (TA-2) ✓ · V-9 Schema Repair via P41 gate (TA-4) ✓ · V-10 no P28 in S6 Protocol F ✓ · V-11 P91 terminal; P68→P62 ✓ · V-12 no >3 consecutive C without E break ✓ · V-13 P54 before high-difficulty first-attempt (TA-4, Protocol B) ✓ · V-14 assessment not first (TA-5/6) ✓ · V-15 Named Compounds expanded ✓ · V-16 IC-1..20 ✓ · V-17 AIR invariants per TA ✓ · V-18 P90 (TA-5) before P91 (TA-6) ✓ · V-19 P91 5 probes ✓ · V-20 P89 intervals authored ✓
status: READY
PACKAGE_READY
