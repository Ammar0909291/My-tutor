# Teaching Blueprint: phys.mech.constraint-motion

## 0. Concept Profile
concept_id: phys.mech.constraint-motion
name: Connected Bodies, Pulleys and Constraint Relations
domain: Mechanics (Physics)
difficulty: proficient (3)
bloom: apply
prerequisites: [phys.mech.tension]
mastery_threshold: 0.75
estimated_hours: 3
cross_links: []
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: P (two hanging masses over a pulley, released, before writing any equation; difficulty 3)
status: READY

## 1. Learning Objective

[Boundary statement]
A student who achieves mastery demonstrates:
1. Solves connected-body problems by drawing a free-body diagram for EACH body, writing Newton's second law for each, and adding the constraint that an inextensible string makes the connected bodies move with the same magnitude of acceleration — e.g. an Atwood machine with 3 kg and 2 kg: a = (m₁ − m₂)g / (m₁ + m₂) = 9.8/5 = 1.96 m/s², T = 2m₁m₂g / (m₁ + m₂) = 23.52 N.
2. Explains why the tension lies BETWEEN the two weights (19.6 N < 23.52 N < 29.4 N): it is less than the heavier weight (that mass accelerates down) and more than the lighter weight (that mass accelerates up).
3. Writes constraint relations for movable pulleys from string length — a block hanging from a movable pulley moves half as far, and has half the acceleration, of the free end of the string: x_block = x_end / 2, a_block = a_end / 2.

A student who sets the tension equal to one of the weights, or gives the block on a movable pulley the same acceleration as the rope's end, has **NOT** achieved mastery — those two errors account for most wrong answers in pulley and connected-body problems.

## 2. Student State Matrix

| State | Why here | Tell-tale behaviour | Protocol |
|---|---|---|---|
| S0 | Single bodies only | Cannot set up two bodies at once | Protocol A (Concrete) |
| S1 | Formula recited | Quotes the Atwood formula but cannot derive or adapt it | Protocol B (Counterexample-first) |
| S2-TENSION-EQUALS-WEIGHT | Tension taken as a weight | "T = m₁g" (or m₂g) in an accelerating system | Misconception Engine → then Protocol C |
| S2-MOVABLE-PULLEY-SAME-A | Constraint ignored | Block on a movable pulley given the rope end's acceleration | Misconception Engine → then Protocol C |
| S3 | Partial — fixed pulleys fine, movable pulleys not | Correct Atwood, wrong movable-pulley relation | Protocol C (Guided Questioning) |
| S6 | Anxiety on simultaneous equations | Freezes with two unknowns | Protocol F (Low Pressure) |

## 3. Diagnostic Battery

DB-1 (prior-exposure check):
"Have you solved a problem with two blocks joined by a string?"
  No → S0. Enter Protocol A (Concrete).
  Yes → DB-2.

DB-2 (representation / misconception test):
"A 3 kg and a 2 kg mass hang over a frictionless pulley and are released. Is the tension in the string 29.4 N, 19.6 N, or something in between? Why?"
  "In between — the heavier mass accelerates down so T < 29.4 N; the lighter accelerates up so T > 19.6 N" → S3. Enter Protocol C.
  "In between" (no reason) → S1. Enter Protocol B.
  "29.4 N" or "19.6 N" → SIGNAL:MISCONCEPTION:MC-TENSION-EQUALS-WEIGHT. Enter Misconception Engine.
  Pause → add S6 flag; Protocol F if anxious, otherwise Protocol A.

DB-3 (movable-pulley check — overlays):
"A block hangs from a movable pulley; one end of the string is fixed to the ceiling and you pull the other end up 2 m. How far does the block rise?"
  "1 m — both strand lengths share the change" → no flag.
  "2 m" → add SIGNAL:MISCONCEPTION:MC-MOVABLE-PULLEY-SAME-A (repair at TA-5).
  Confident and wrong on DB-2 → add S7 flag. Override to Protocol G.

## 4. Prerequisite Check

PD-1 (for `phys.mech.tension`, and through it free-body diagrams and F = ma):
"A 2 kg mass hangs from a string and is pulled up with an acceleration of 1 m/s². What is the tension?"
  Cannot write T − mg = ma → T = 21.6 N → flag PREREQ-GAP-TENSION.
  In-session minimum repair: one P07 (free-body diagram of the hanging mass) + one P34 ("net force up = ?") then resume. If tension or F = ma for one body is absent, schedule a `phys.mech.tension` session (S4 route).

## 5. Protocol Library

### Protocol A — Concrete-First (primary)
Serves: S0
CPA entry: P
Entry condition: single bodies only.
Success exit: solves an Atwood machine, explains where T lies, and applies a movable-pulley constraint (P91 all 5 probes CORRECT).
Failure exit: on TENSION-EQUALS-WEIGHT → Misconception Engine, resume at TA-3. On equation anxiety → Protocol F.
Duration: ~65–75 min (spans 2 sessions; session_cap 7 TAs).

[TA-1: Two Masses, One String]
P01
→ P04[content: "When bodies are tied together, each one obeys F = ma, and the string ties their motions together."]
→ P06[content: an Atwood machine — 3 kg and 2 kg over a light, frictionless pulley — released from rest]
→ P14[predict: "Which way does each mass move, and do they have the same speed at every instant?"] → P55
→ success_path[3 kg down, 2 kg up; same speed — the string doesn't stretch] → P49 → P05[curiosity: "So what is the tension?"]

[TA-2: One Diagram per Body]
P02
→ P07[modality: free-body diagrams — 3 kg: T up, 29.4 N down; 2 kg: T up, 19.6 N down]
→ P13[think-aloud: "Same string, same T on both. Same acceleration a, but down for the 3 kg and up for the 2 kg. 3 kg: 29.4 − T = 3a. 2 kg: T − 19.6 = 2a."]
→ P08[notation: "add: 9.8 = 5a → a = 1.96 m/s²; T = 19.6 + 2a = 23.52 N ; generally a = (m₁ − m₂)g/(m₁ + m₂), T = 2m₁m₂g/(m₁ + m₂)"]
// GR-3 satisfied: P06/P07 and P13 preceded P08 (V-8 PASS)
→ P34[question: "5 kg and 3 kg over a pulley. a and T?"] → P55
→ success_path[a = 2.45 m/s², T = 36.75 N] → P49
→ failure_path → P50 → P51[diagnose: one equation only, or sign error] → P52[narrow: "Write F = ma for the lighter mass alone, with up as positive."] → re-elicit P34 → P55

[TA-3: Where the Tension Lies]
P02
→ P41[diagnostic: "Is T in our Atwood machine equal to 29.4 N, 19.6 N, or in between?"] → P55
→ [if in between, with reasons] → P49
→ [if equal to a weight] → SIGNAL:MISCONCEPTION:MC-TENSION-EQUALS-WEIGHT → misconception_repair_chain[MC-TENSION-EQUALS-WEIGHT]

[TA-4: A Block on a Table]
P02
→ P07[modality: a 4 kg block on a smooth table joined by a string over a pulley at the edge to a hanging 1 kg mass]
→ P34[question: "Acceleration and tension?"] → P55
→ success_path[a = 9.8/5 = 1.96 m/s², T = 4 × 1.96 = 7.84 N (< 9.8 N)] → P49

[TA-5: The Movable Pulley Constraint]
P02
→ P07[modality: a block hanging from a movable pulley; one string end fixed to the ceiling, the other pulled up]
→ P41[diagnostic: "Pull the free end up 2 m. How far does the block rise?"] → P55
→ [if 1 m] → P49
→ [if 2 m] → SIGNAL:MISCONCEPTION:MC-MOVABLE-PULLEY-SAME-A → misconception_repair_chain[MC-MOVABLE-PULLEY-SAME-A]
→ P13[think-aloud: "Two strands support the pulley. Pulling 2 m of string out shortens the two strands by 2 m in total — 1 m each — so the block rises 1 m. Differentiate twice: a_block = a_end / 2."]

[TA-6: Formative Assessment]
P02
→ P90_expansion:
    P79[predict: "Make the two masses in the Atwood machine almost equal. Before computing — what happens to a and to T?"] → P55
    → P49 → P51[check: a → 0; T → mg?]
    → P35[open: "Explain why the tension is less than the heavier weight."] → P55

[TA-7: Mastery Gate]
P02
→ P91_expansion:
    P77[generate: "Choose two masses for an Atwood machine whose acceleration is g/3."] → P55 → CORRECT
    → P76[transfer: "A lift of mass 800 kg is balanced by a 600 kg counterweight over a pulley. Ignoring friction, what is the acceleration if the brake is released?"] → P55 → CORRECT
    → P75[boundary: "Equal masses in an Atwood machine, set moving at 1 m/s. What happens next?"] → P55 → CORRECT
    → P74[classify: "Block on a movable pulley: same acceleration as the rope end, half, or double?"] → P55 → CORRECT
    → P78[explain: "Why must you write a separate equation for each body?"] → P55 → CORRECT
→ P68 → P62[schedule: first retrieval in 1 day]

### Protocol B — Counterexample-First
Serves: S1
CPA entry: P
Entry condition: formula recited.
Success exit: derives the result from two free-body diagrams.
Failure exit: Misconception Engine, then Protocol C.
Key deltas from A: open with P02 → P41["Your formula gives T for two hanging masses. What is T for a block on a table pulled by a hanging mass?"] → P54 (novel) → P55; then TA-2 and TA-4.

### Protocol C — Guided Questioning
Serves: S3, S2 (post-repair)
CPA entry: P
Entry condition: fixed pulleys fine; movable pulleys not.
Success exit: constraint relations applied.
Failure exit: escalate to Protocol A TA-2.
Key deltas: enter at TA-5; run the gate.

### Protocol F — Low Pressure (S6)
Serves: S6
CPA entry: P
Entry condition: S6 flag confirmed.
Success exit: one Atwood machine solved calmly.
Failure exit: shorten, bank one success, reschedule.
Key deltas: NO P28 (V-10 / GR-5); take g = 10 m/s² first; solve by adding the two equations (no substitution); P85 regulation_tail on every TA.

### Protocol G — Challenge-First (S7 override)
Serves: S7
CPA entry: P
Entry condition: confident T = weight.
Success exit: revises after the contradiction.
Failure exit: Misconception Engine.
Key deltas: open by assuming T = 29.4 N and asking what the net force on the 3 kg mass then is (zero — so it wouldn't accelerate); let it sit (P55).

## 6. Misconception Engine

### MC-TENSION-EQUALS-WEIGHT: "The string tension equals the weight of one of the masses"
trigger_signal: student sets T = m₁g or m₂g in a system that is accelerating.
conflict_evidence [P28]: "Suppose T = 29.4 N, the 3 kg mass's weight. What is the net force on the 3 kg mass then? And on the 2 kg mass?"
bridge_text [P30]: "On the 3 kg mass the net force would be zero — it couldn't accelerate down — while the 2 kg mass would have a 9.8 N net upward force. That can't be: they are tied together. The tension must be less than 29.4 N (so the 3 kg accelerates down) and more than 19.6 N (so the 2 kg accelerates up)."
replacement_text [P31]: "Write F = ma for each body separately with the same T and the same magnitude of a; solve together. Tension equals a weight only when that body is not accelerating."
discrimination_pairs [P33]: ["masses held still (T = weight) vs released Atwood machine (19.6 N < T < 29.4 N)", "equal masses moving at constant speed (T = mg) vs unequal masses (T between the weights)"]
s6_path: skip P28; draw both free-body diagrams with arrow lengths, and compare the up-arrow with each down-arrow.

### MC-MOVABLE-PULLEY-SAME-A: "A block on a movable pulley moves as far, and as fast, as the rope's end"
trigger_signal: student uses the same displacement or acceleration for the block and the free end of the string.
conflict_evidence [P28]: "Two strands hold the movable pulley. Pull 2 m of string out at the top. If the block also rose 2 m, both strands would be 2 m shorter — 4 m of string removed. Where would the extra 2 m come from?"
bridge_text [P30]: "Nowhere — the string's length is fixed. Pulling out 2 m shortens the two strands by 2 m in total, 1 m each, so the block rises 1 m. Positions, velocities and accelerations are all related the same way: the block's is half the free end's."
replacement_text [P31]: "Constraint relations come from constant string length: write the total length in terms of positions, then differentiate. Movable pulley: x_block = x_end/2, a_block = a_end/2."
discrimination_pairs [P33]: ["fixed pulley: both ends move the same distance", "movable pulley with two supporting strands: block moves half the distance of the free end"]
s6_path: skip P28; use a real string and a movable pulley (or a loop of string round a pencil) and measure.

## 7. Assessment Battery

| Probe | Item | Expected signal |
|---|---|---|
| P74 (classify) | "Movable pulley: same, half or double acceleration?" | CORRECT = half |
| P74 (classify) | "Atwood T: equal to a weight or between?" | CORRECT = between |
| P75 (boundary) | "Equal masses moving at 1 m/s" | CORRECT = continue at constant speed (a = 0) |
| P76 (transfer) | "800 kg lift, 600 kg counterweight" | CORRECT = a = 200 × 9.8/1400 = 1.4 m/s² |
| P77 (generate) | "Atwood with a = g/3" | CORRECT = m₁ = 2m₂ (e.g. 2 kg and 1 kg) |
| P78 (explain) | "Why one equation per body?" | CORRECT = each body has its own net force; the string links them |
| P79 (predict) | "Nearly equal masses" | CORRECT = a → 0, T → mg |

## 8. Mastery Gate (P91 expansion — canonical order P77→P76→P75→P74→P78)
P77: "Choose two masses for an Atwood machine whose acceleration is g/3." → expected: CORRECT
P76: "A lift of mass 800 kg is balanced by a 600 kg counterweight over a pulley. Ignoring friction, what is the acceleration if the brake is released?" → expected: CORRECT
P75: "Equal masses in an Atwood machine, set moving at 1 m/s. What happens next?" → expected: CORRECT
P74: "Block on a movable pulley: same acceleration as the rope end, half, or double?" → expected: CORRECT
P78: "Why must you write a separate equation for each body?" → expected: CORRECT

## 9. Retrieval Schedule (P89 expansion)
Interval 1 (1 day): "4 kg and 1 kg Atwood machine: a and T?"
Interval 2 (3 days): "Block on a smooth table pulled by a hanging mass — set up both equations."
Interval 3 (7 days): "Why is the tension between the two weights?"
Interval 4 (21 days): "Movable pulley: if the free end accelerates at 2 m/s², the block's acceleration?"
Interval 5 (60 days): "How does a counterweight reduce the motor power a lift needs?"

---
V-check status:
- V-1 all 10 KG fields present ✓ · V-2 objective has NOT-clause ✓ · V-3 DB 2–3 Qs, every branch → a state ✓ · V-4 every plausible state (S0,S1,S2,S3,S6) has a Protocol ✓ · V-5 every Protocol has success AND failure exit ✓ · V-6 every TA opens P01/P02 ✓ · V-7 every elicitation (P34/P35/P41) followed by P55 ✓ · V-8 no P08 without prior P06/P07 (TA-2) ✓ · V-9 Schema Repair entered only via P41 gate (TA-3, TA-5) ✓ · V-10 no P28 in S6 Protocol F ✓ · V-11 P91 terminal; P68 then P62 follow ✓ · V-12 no >3 consecutive C-category without E break ✓ · V-13 P54 before high-difficulty first-attempt (Protocol B TA-open) ✓ · V-14 assessment TA not first (TA-6/7) ✓ · V-15 Named Compounds (P90/P91) expanded ✓ · V-16 IC-1..20 pass ✓ · V-17 AIR invariants pass per TA ✓ · V-18 P90 (TA-6) before P91 (TA-7) ✓ · V-19 P91 has all 5 probes ✓ · V-20 P89 schedule authored with specific intervals ✓
status: READY
PACKAGE_READY
