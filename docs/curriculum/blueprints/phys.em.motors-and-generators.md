# Teaching Blueprint: phys.em.motors-and-generators

## 0. Concept Profile
concept_id: phys.em.motors-and-generators
name: Electric Motor and Generator
domain: Electricity & Magnetism (Physics)
difficulty: developing (2)
bloom: understand
prerequisites: [phys.em.magnetic-force, phys.em.faradays-law]
mastery_threshold: 0.75
estimated_hours: 2
cross_links: []
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (a coil on an axle between magnet poles, driven by a battery and then turned by hand, before any formula; difficulty ≤ 2)
status: READY

## 1. Learning Objective

[Boundary statement]
A student who achieves mastery demonstrates:
1. Explains a DC motor: a current-carrying coil in a magnetic field feels forces that turn it (electrical → kinetic energy), and the split-ring commutator reverses the current every half turn so the coil keeps turning the same way.
2. Explains a generator: turning a coil in a magnetic field changes the magnetic flux through it, which induces an emf (kinetic → electrical energy); slip rings give alternating current (AC generator), a commutator gives a one-direction pulsating output (DC dynamo). The peak emf of a coil of N turns, area A, rotating at angular speed ω in field B is NABω — e.g. 100 turns, 0.01 m², 0.5 T, ω = 100 rad/s: 50 V.
3. Recognises the motor and generator as the same machine run in opposite directions, distinguishing which law applies: the force on a current (motor) versus electromagnetic induction (generator).

A student who says "a generator creates electricity from nothing", or that a motor's coil keeps turning without the commutator, has **NOT** achieved mastery — those break energy conservation and the reason AC and DC machines differ.

## 2. Student State Matrix

| State | Why here | Tell-tale behaviour | Protocol |
|---|---|---|---|
| S0 | Machines as black boxes | Cannot say what is inside a fan motor | Protocol A (Concrete) |
| S1 | Parts named, roles missing | Names commutator and slip rings but cannot say what each does | Protocol B (Counterexample-first) |
| S2-GENERATOR-CREATES-ENERGY | Energy from nothing | "The generator makes electricity; you don't need to push harder" | Misconception Engine → then Protocol C |
| S2-NO-COMMUTATOR-NEEDED | Torque direction ignored | "The coil just keeps spinning once the current is on" | Misconception Engine → then Protocol C |
| S3 | Partial — motor fine, generator not (or reverse) | Explains the motor, not induction | Protocol C (Guided Questioning) |
| S6 | Anxiety on flux and ω | Avoids the emf formula | Protocol F (Low Pressure) |

## 3. Diagnostic Battery

DB-1 (prior-exposure check):
"Have you seen inside a toy motor, or a bicycle dynamo?"
  No → S0. Enter Protocol A (Concrete).
  Yes → DB-2.

DB-2 (representation / misconception test):
"A generator lights a lamp. When the lamp is switched on, does turning the generator get harder, easier, or stay the same? Why?"
  "Harder — the electrical energy must come from the work you do turning it" → S3. Enter Protocol C.
  "Harder" (no reason) → S1. Enter Protocol B.
  "The same — the generator makes the electricity" → SIGNAL:MISCONCEPTION:MC-GENERATOR-CREATES-ENERGY. Enter Misconception Engine.
  Pause → add S6 flag; Protocol F if anxious, otherwise Protocol A.

DB-3 (commutator check — overlays):
"In a DC motor, what would happen after half a turn if the current in the coil never reversed?"
  "The forces would turn it back; it would rock and stop" → no flag.
  "It would keep spinning" → add SIGNAL:MISCONCEPTION:MC-NO-COMMUTATOR-NEEDED (repair at TA-3).
  Confident and wrong on DB-2 → add S7 flag. Override to Protocol G.

## 4. Prerequisite Check

PD-1 (for `phys.em.magnetic-force` and `phys.em.faradays-law`):
"What happens to a current-carrying wire across a magnetic field? And what induces an emf in a coil?"
  Cannot say "a force, F = BIL" and "a changing magnetic flux" → flag PREREQ-GAP-FORCE-INDUCTION.
  In-session minimum repair: one P06 (a wire jumping between magnet poles when a current flows; a magnet pushed into a coil deflecting a meter) + one P34 ("which one turns electricity into motion, which motion into electricity?") then resume. If either is absent, schedule the missing session (S4 route).

## 5. Protocol Library

### Protocol A — Concrete-First (primary)
Serves: S0
CPA entry: C
Entry condition: no picture of the machines.
Success exit: explains motor and generator action, the commutator and slip rings, and computes a peak emf (P91 all 5 probes CORRECT).
Failure exit: on GENERATOR-CREATES-ENERGY → Misconception Engine, resume at TA-4. On flux anxiety → Protocol F.
Duration: ~50–60 min (may span 2 sessions; session_cap 7 TAs).

[TA-1: The Coil Between the Poles]
P01
→ P04[content: "One machine, two jobs: send current in and it turns; turn it and current comes out."]
→ P06[content: a rectangular coil on an axle between N and S poles, connected to a battery through a split ring and brushes]
→ P14[predict: "Current goes up one side of the coil and down the other. Which way do the forces on the two sides push?"] → P55
→ success_path[opposite ways — a turning effect] → P49 → P05[curiosity: "What happens when the coil has turned half way round?"]

[TA-2: The Motor]
P02
→ P13[think-aloud: "The two sides carry current in opposite directions across the field, so the forces BIL on them point opposite ways and turn the coil. Electrical energy becomes kinetic energy."]
→ P34[question: "Name two ways to make the motor turn faster."] → P55
→ success_path[more current, stronger field, more turns] → P49

[TA-3: Why the Split Ring]
P02
→ P41[diagnostic: "After half a turn, the sides have swapped places. If the current kept the same direction in each side, which way would the forces turn the coil now?"] → P55
→ [if backwards — it would rock and stop] → P49
→ [if "it keeps going"] → SIGNAL:MISCONCEPTION:MC-NO-COMMUTATOR-NEEDED → misconception_repair_chain[MC-NO-COMMUTATOR-NEEDED]
→ P13[think-aloud: "The split ring reverses the current in the coil every half turn, so the side nearest the N pole always carries current the same way, and the torque always turns the coil the same way."]

[TA-4: The Generator]
P02
→ P06[content: the same coil, now turned by hand, connected through slip rings to a meter that swings left and right]
→ P13[think-aloud: "As the coil turns, the magnetic flux through it keeps changing — from maximum to zero to maximum the other way. A changing flux induces an emf (Faraday). Kinetic energy becomes electrical energy."]
→ P08[notation: "peak emf = N A B ω ; slip rings → AC; commutator → one-direction (DC) output"]
// GR-3 satisfied: P06 and P13 preceded P08 (V-8 PASS)
→ P34[question: "100 turns, area 0.01 m², B = 0.5 T, ω = 100 rad/s. Peak emf?"] → P55
→ success_path[50 V] → P49

[TA-5: No Free Energy]
P02
→ P41[diagnostic: "The generator lights a lamp. Is it harder to turn with the lamp on?"] → P55
→ [if harder — energy comes from the turning] → P49
→ [if "no difference"] → SIGNAL:MISCONCEPTION:MC-GENERATOR-CREATES-ENERGY → misconception_repair_chain[MC-GENERATOR-CREATES-ENERGY]
→ P13[think-aloud: "The induced current in the coil feels a force in the field that opposes the turning (Lenz). The bigger the current drawn, the harder you must push. A generator converts energy; it never creates it."]

[TA-6: Formative Assessment]
P02
→ P90_expansion:
    P79[predict: "Double the generator's turning speed. What happens to the peak emf and to the frequency of the AC?"] → P55
    → P49 → P51[check: both double?]
    → P35[open: "Explain why a motor and a generator are 'the same machine run backwards'."] → P55

[TA-7: Mastery Gate]
P02
→ P91_expansion:
    P77[generate: "Design a change that doubles a generator's peak emf without spinning it faster."] → P55 → CORRECT
    → P76[transfer: "An electric car slows down by using its motor as a generator. Where does the car's kinetic energy go?"] → P55 → CORRECT
    → P75[boundary: "A generator turned with no lamp or other load connected. Is it hard to turn?"] → P55 → CORRECT
    → P74[classify: "Slip rings or split ring: which gives AC, which keeps a DC motor turning?"] → P55 → CORRECT
    → P78[explain: "Why does a generator get harder to turn when more current is drawn?"] → P55 → CORRECT
→ P68 → P62[schedule: first retrieval in 1 day]

### Protocol B — Counterexample-First
Serves: S1
CPA entry: P
Entry condition: parts named, roles missing.
Success exit: explains the commutator and the energy flow.
Failure exit: Misconception Engine, then Protocol C.
Key deltas from A: open with P02 → P41["Remove the split ring and connect the coil straight to the battery. What does it do?"] → P54 (novel) → P55; then TA-3 and TA-5.

### Protocol C — Guided Questioning
Serves: S3, S2 (post-repair)
CPA entry: P
Entry condition: one machine understood.
Success exit: both.
Failure exit: escalate to Protocol A TA-2.
Key deltas: enter at TA-3 or TA-4; run the gate.

### Protocol F — Low Pressure (S6)
Serves: S6
CPA entry: C
Entry condition: S6 flag confirmed.
Success exit: motor and generator explained in words, energy flow stated.
Failure exit: shorten, bank one success, reschedule.
Key deltas: NO P28 (V-10 / GR-5); the emf formula only as a ratio ("twice the turns, twice the emf"); P85 regulation_tail on every TA.

### Protocol G — Challenge-First (S7 override)
Serves: S7
CPA entry: P
Entry condition: confident free-energy idea.
Success exit: revises after the energy account.
Failure exit: Misconception Engine.
Key deltas: open with "connect the generator's output to a motor that turns the generator — would it run forever?"; let it sit (P55).

## 6. Misconception Engine

### MC-GENERATOR-CREATES-ENERGY: "A generator creates electrical energy"
trigger_signal: student says a generator "makes" electricity with no extra effort, or that turning it is equally easy whatever it powers.
conflict_evidence [P28]: "Connect the generator's output to a motor that turns the generator's own shaft. If generators created energy, it would run forever and light a lamp too. Does that ever work?"
bridge_text [P30]: "Never. The current induced in the coil feels a force in the magnetic field that opposes the turning — Lenz's law. The more current you draw, the harder you must push. All the electrical energy comes from the work done turning the shaft, minus losses."
replacement_text [P31]: "A generator converts kinetic energy to electrical energy; a motor converts electrical energy to kinetic energy. Neither creates energy, and both lose some as heat."
discrimination_pairs [P33]: ["generator with no load (easy to turn, no current) vs lighting a lamp (harder to turn)", "dynamo on a bicycle: pedalling is harder with the light on"]
s6_path: skip P28; turn a hand-cranked generator with the lamp disconnected and then connected, and feel the difference.

### MC-NO-COMMUTATOR-NEEDED: "Once current flows, the motor coil just keeps turning"
trigger_signal: student ignores the reversal of torque after half a turn, or cannot say what the split ring does.
conflict_evidence [P28]: "After half a turn, the side of the coil that was near the N pole is near the S pole. If its current had not reversed, which way would the force on it push now?"
bridge_text [P30]: "Backwards — the torque would reverse and the coil would rock back and settle. The split-ring commutator swaps the connections every half turn, so the current in the coil reverses exactly when needed and the torque keeps turning it the same way."
replacement_text [P31]: "DC motor: split-ring commutator reverses the coil current every half turn. AC generator: slip rings keep each end connected to the same output terminal, giving alternating current."
discrimination_pairs [P33]: ["split ring (motor keeps turning; dynamo gives one-direction output) vs slip rings (AC output)", "coil without commutator: rocks to rest vs with commutator: continuous rotation"]
s6_path: skip P28; turn a paper model coil by hand through half a turn and redraw the force arrows with and without swapping the current.

## 7. Assessment Battery

| Probe | Item | Expected signal |
|---|---|---|
| P74 (classify) | "Slip rings vs split ring" | CORRECT = slip rings → AC; split ring keeps a DC motor turning |
| P74 (classify) | "Motor: which law? Generator: which law?" | CORRECT = force on a current; electromagnetic induction |
| P75 (boundary) | "Generator with no load — hard to turn?" | CORRECT = easy; no current, no opposing force (only friction) |
| P76 (transfer) | "Regenerative braking" | CORRECT = kinetic energy → electrical energy stored in the battery |
| P77 (generate) | "Double peak emf without spinning faster" | CORRECT = double N, A or B |
| P78 (explain) | "Why harder to turn with more current?" | CORRECT = induced current feels an opposing force (Lenz) |
| P79 (predict) | "Double turning speed" | CORRECT = peak emf and frequency both double |

## 8. Mastery Gate (P91 expansion — canonical order P77→P76→P75→P74→P78)
P77: "Design a change that doubles a generator's peak emf without spinning it faster." → expected: CORRECT
P76: "An electric car slows down by using its motor as a generator. Where does the car's kinetic energy go?" → expected: CORRECT
P75: "A generator turned with no lamp or other load connected. Is it hard to turn?" → expected: CORRECT
P74: "Slip rings or split ring: which gives AC, which keeps a DC motor turning?" → expected: CORRECT
P78: "Why does a generator get harder to turn when more current is drawn?" → expected: CORRECT

## 9. Retrieval Schedule (P89 expansion)
Interval 1 (1 day): "What does the split ring do in a DC motor?"
Interval 2 (3 days): "Peak emf of 200 turns, 0.02 m², 0.2 T, ω = 50 rad/s?"
Interval 3 (7 days): "Why is pedalling harder with a dynamo light on?"
Interval 4 (21 days): "Motor or generator: a hydroelectric turbine? A ceiling fan?"
Interval 5 (60 days): "Why can't a motor and a generator be connected to run each other forever?"

---
V-check status:
- V-1 all 10 KG fields present ✓ · V-2 objective has NOT-clause ✓ · V-3 DB 2–3 Qs, every branch → a state ✓ · V-4 every plausible state (S0,S1,S2,S3,S6) has a Protocol ✓ · V-5 every Protocol has success AND failure exit ✓ · V-6 every TA opens P01/P02 ✓ · V-7 every elicitation (P34/P35/P41) followed by P55 ✓ · V-8 no P08 without prior P06/P07 (TA-4) ✓ · V-9 Schema Repair entered only via P41 gate (TA-3, TA-5) ✓ · V-10 no P28 in S6 Protocol F ✓ · V-11 P91 terminal; P68 then P62 follow ✓ · V-12 no >3 consecutive C-category without E break ✓ · V-13 P54 before high-difficulty first-attempt (Protocol B TA-open) ✓ · V-14 assessment TA not first (TA-6/7) ✓ · V-15 Named Compounds (P90/P91) expanded ✓ · V-16 IC-1..20 pass ✓ · V-17 AIR invariants pass per TA ✓ · V-18 P90 (TA-6) before P91 (TA-7) ✓ · V-19 P91 has all 5 probes ✓ · V-20 P89 schedule authored with specific intervals ✓
status: READY
PACKAGE_READY
