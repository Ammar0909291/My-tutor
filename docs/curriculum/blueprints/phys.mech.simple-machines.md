# Teaching Blueprint: phys.mech.simple-machines

## 0. Concept Profile
concept_id: phys.mech.simple-machines
name: Simple Machines and Mechanical Advantage
domain: Mechanics (Physics)
difficulty: developing (2)
bloom: apply
prerequisites: [phys.mech.work]
mastery_threshold: 0.75
estimated_hours: 2
cross_links: []
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (a crowbar and a rock before MA = load/effort; difficulty ≤ 2)
status: READY

## 1. Learning Objective

[Boundary statement]
A student who achieves mastery demonstrates:
1. Computes mechanical advantage (MA = load ÷ effort), velocity ratio (VR = distance moved by the effort ÷ distance moved by the load) and efficiency (= MA ÷ VR = useful work out ÷ work in) for a lever, a pulley system and an inclined plane — e.g. a 4-strand block and tackle lifting 800 N with a 250 N effort has VR 4, MA 3.2, efficiency 80 %.
2. Explains from work in = work out that a machine trades force for distance: an ideal lever with effort arm 1.2 m and load arm 0.2 m lifts a 600 N rock with a 100 N effort, but the effort end moves six times as far.
3. Classifies levers by the position of fulcrum, load and effort, and explains why a class-3 lever (MA < 1, such as tongs or the forearm) is still useful.

A student who says a machine "reduces the work needed" or "creates extra energy", or that a machine with MA less than 1 is useless, has **NOT** achieved mastery — a machine never saves work, and that idea is the foundation for energy conservation and efficiency in every later topic.

## 2. Student State Matrix

| State | Why here | Tell-tale behaviour | Protocol |
|---|---|---|---|
| S0 | No exposure | Knows a crowbar "makes it easier" with no quantity attached | Protocol A (Concrete) |
| S1 | Formulas without the trade-off | Computes MA but cannot say what is given up | Protocol B (Counterexample-first) |
| S2-MACHINE-SAVES-WORK | Machines save work or energy | "The lever means you do less work" | Misconception Engine → then Protocol C |
| S2-MA-ALWAYS-GAIN | MA must exceed 1 to be useful | Calls tongs or the forearm "bad levers" | Misconception Engine → then Protocol C |
| S3 | Partial — levers fine, pulleys/efficiency not | Correct MA for a lever, wrong VR for a pulley | Protocol C (Guided Questioning) |
| S6 | Anxiety | Freezes on ratios | Protocol F (Low Pressure) |

## 3. Diagnostic Battery

DB-1 (prior-exposure check):
"Have you used a crowbar, a bottle opener or a pulley to make a job easier?"
  No → S0. Enter Protocol A (Concrete).
  Yes → DB-2.

DB-2 (representation / misconception test):
"With a crowbar you lift a 600 N rock by pushing with only 100 N. Did you do less work than lifting the rock directly?"
  "No — I pushed with less force but through a longer distance; the work is the same (or more, with friction)" → S3. Enter Protocol C.
  "No" (no reason) → S1. Enter Protocol B.
  "Yes — that's the point of a machine" → SIGNAL:MISCONCEPTION:MC-MACHINE-SAVES-WORK. Enter Misconception Engine.
  Pause / "I don't know" → add S6 flag; Protocol F if anxious, otherwise Protocol A.

DB-3 (confidence calibration):
"How confident are you with machines — 1 to 5?"
  1–2 → add S6 flag.
  4–5 + DB-2 wrong → add S7 flag. Override to Protocol G (challenge-first).

## 4. Prerequisite Check

PD-1 (for `phys.mech.work`):
"How much work is done lifting a 600 N rock through 0.1 m?"
  Cannot compute W = F × d = 60 J → flag PREREQ-GAP-WORK.
  In-session minimum repair: one P06 (lifting a bag through a measured height) + one P34 ("force times distance moved in its direction") then resume. If work as force × distance is absent, schedule a `phys.mech.work` session (S4 route).

## 5. Protocol Library

### Protocol A — Concrete-First (primary)
Serves: S0
CPA entry: C
Entry condition: no exposure (DB-1 = No).
Success exit: computes MA, VR and efficiency for a new machine and explains the force–distance trade (P91 all 5 probes CORRECT).
Failure exit: on MACHINE-SAVES-WORK → Misconception Engine, resume at TA-3. On ratio anxiety → Protocol F.
Duration: ~50–60 min (may span 2 sessions; session_cap 7 TAs).

[TA-1: The Crowbar]
P01
→ P04[content: "A machine lets a small force do a big job. We'll find out what it costs."]
→ P06[content: a crowbar over a small block — effort arm 1.2 m, load arm 0.2 m, a 600 N rock]
→ P14[predict: "How hard must you push down to lift the rock?"] → P55
→ success_path → P49 → P05[curiosity: "If you push with only 100 N, what are you giving up?"]

[TA-2: Force Traded for Distance]
P02
→ P06[content: lift the rock 0.1 m; the effort end moves 0.6 m]
→ P13[think-aloud: "Work in: 100 N × 0.6 m = 60 J. Work out: 600 N × 0.1 m = 60 J. Six times less force, six times more distance. The work is the same."]
→ P08[notation: "MA = load / effort = 6 ; VR = effort distance / load distance = 6 ; ideal machine: MA = VR"]
// GR-3 satisfied: P06 and P13 preceded P08 (V-8 PASS)
→ P34[question: "For a lever, why does VR equal effort arm ÷ load arm?"] → P55
→ success_path[the ends move along arcs in proportion to their distances from the fulcrum] → P49

[TA-3: Efficiency]
P02
→ P06[content: a 4-strand block and tackle — 800 N load, 250 N effort; effort pulls 4 m of rope to lift the load 1 m]
→ P34[question: "MA? VR? Efficiency?"] → P55
→ success_path[MA 3.2, VR 4, efficiency 3.2/4 = 80 %] → P49
→ P13[think-aloud: "Work in 250 × 4 = 1000 J; work out 800 × 1 = 800 J. The missing 200 J went to friction and lifting the lower pulley. Real machines: MA < VR; efficiency < 100 %."]
→ P41[diagnostic: "Could a machine have efficiency above 100 %?"] → P55
→ [if no — work out can never exceed work in] → P49
→ [if yes] → SIGNAL:MISCONCEPTION:MC-MACHINE-SAVES-WORK → misconception_repair_chain[MC-MACHINE-SAVES-WORK]

[TA-4: Three Classes of Lever]
P02
→ P07[modality: three lever diagrams — class 1 (fulcrum between: seesaw, scissors), class 2 (load between: wheelbarrow, nutcracker), class 3 (effort between: tongs, the forearm)]
→ P16[compare: "Which class always has MA greater than 1? Which always less than 1?"] → P55
→ success_path[class 2 > 1; class 3 < 1] → P49
→ P17[contrast: "Your forearm is a class-3 lever with MA about 1/8. Why would the body use such a 'bad' lever?"] → P55
→ success_path[the hand moves 8 times as far and as fast as the muscle — speed and reach are gained] → P49

[TA-5: Pulleys and Ramps]
P02
→ P16[compare: "A single fixed pulley: MA? A single movable pulley: MA? (ideal)"] → P55
→ success_path[1 — only changes direction; 2 — two strands share the load] → P49
→ P34[question: "A ramp 5 m long rises 1 m. VR? If you push a 800 N box up it with 200 N, efficiency?"] → P55
→ success_path[VR 5, MA 4, efficiency 80 %] → P49

[TA-6: Formative Assessment]
P02
→ P90_expansion:
    P79[predict: "Add more strands to a block and tackle: what happens to the effort, and to the length of rope you pull?"] → P55
    → P49 → P51[check: effort down, rope length up in proportion?]
    → P35[open: "Explain in terms of work why no machine can lift a load with less work."] → P55

[TA-7: Mastery Gate]
P02
→ P91_expansion:
    P77[generate: "Design a lever to lift 900 N with 150 N (ideal). Give the arm lengths."] → P55 → CORRECT
    → P76[transfer: "A car jack: you move the handle 30 cm for each 1 cm the car rises; you push with 200 N to lift 4000 N. Efficiency?"] → P55 → CORRECT
    → P75[boundary: "A single fixed pulley lifts 500 N with a 550 N pull. What is it good for?"] → P55 → CORRECT
    → P74[classify: "Wheelbarrow, tongs, scissors — which class each?"] → P55 → CORRECT
    → P78[explain: "Why is efficiency always below 100 % for a real machine?"] → P55 → CORRECT
→ P68 → P62[schedule: first retrieval in 1 day]

### Protocol B — Counterexample-First
Serves: S1
CPA entry: P
Entry condition: computes MA, cannot name the cost.
Success exit: explains the trade-off with numbers.
Failure exit: Misconception Engine, then Protocol C.
Key deltas from A: open with P02 → P41["MA 6 crowbar: how far must your hand move to lift the rock 10 cm?"] → P54 (novel) → P55; then TA-2's work computation.

### Protocol C — Guided Questioning
Serves: S3, S2 (post-repair)
CPA entry: P
Entry condition: one machine type correct.
Success exit: all three machine types and efficiency.
Failure exit: escalate to Protocol A TA-2.
Key deltas: enter at TA-3 or TA-5; run the gate.

### Protocol F — Low Pressure (S6)
Serves: S6
CPA entry: C
Entry condition: S6 flag confirmed.
Success exit: one MA and one efficiency computed calmly.
Failure exit: shorten, bank one success, reschedule.
Key deltas: NO P28 (V-10 / GR-5); whole-number ratios only; P85 regulation_tail on every TA.

### Protocol G — Challenge-First (S7 override)
Serves: S7
CPA entry: P
Entry condition: DB-3 confident with MACHINE-SAVES-WORK.
Success exit: revises after computing work in and out.
Failure exit: Misconception Engine.
Key deltas: open by computing work in and work out for the crowbar; let the equality sit (P55).

## 6. Misconception Engine

### MC-MACHINE-SAVES-WORK: "A machine reduces the work you have to do"
trigger_signal: student says a lever, pulley or ramp "saves work" or "saves energy", or allows efficiency above 100 %.
conflict_evidence [P28]: "With the crowbar you pushed 100 N through 0.6 m. Lifting the rock directly is 600 N through 0.1 m. Work out both."
bridge_text [P30]: "Both are 60 J. The machine let you use a smaller force, but you had to move it further — by exactly the same factor. Force is traded for distance; the work cannot shrink."
replacement_text [P31]: "Work in ≥ useful work out. An ideal machine has MA = VR; a real one loses some work to friction, so MA < VR and efficiency = MA/VR < 100 %."
discrimination_pairs [P33]: ["ideal crowbar: 100 N × 0.6 m = 600 N × 0.1 m vs real block and tackle: 1000 J in, 800 J out", "a machine that reduces force (yes) vs a machine that reduces work (never)"]
s6_path: skip P28; measure the two distances on a real lever together and multiply.

### MC-MA-ALWAYS-GAIN: "A useful machine must have MA greater than 1"
trigger_signal: student calls tongs, the forearm or a fishing rod "bad" or "pointless" levers because they need more effort than load.
conflict_evidence [P28]: "Your biceps pulls with about eight times the force your hand holds. If MA greater than 1 were the only point, why would the body be built like this?"
bridge_text [P30]: "A machine can trade either way. With MA below 1 the effort moves a short distance and the load moves a long one — the hand moves eight times as far and as fast as the muscle."
replacement_text [P31]: "MA > 1 gains force; MA < 1 gains distance and speed; MA = 1 can still change direction (a fixed pulley). Usefulness depends on the job."
discrimination_pairs [P33]: ["nutcracker, class 2, MA > 1 (force) vs tongs, class 3, MA < 1 (reach and control)", "fixed pulley MA 1 (direction) vs movable pulley MA 2 (force)"]
s6_path: skip P28; hold a book at arm's length and notice how fast the hand can sweep compared with the elbow muscle's small movement.

## 7. Assessment Battery

| Probe | Item | Expected signal |
|---|---|---|
| P74 (classify) | "Wheelbarrow, tongs, scissors — classes?" | CORRECT = 2, 3, 1 |
| P74 (classify) | "Single fixed pulley MA (ideal)?" | CORRECT = 1; changes direction only |
| P75 (boundary) | "Fixed pulley lifts 500 N with 550 N — use?" | CORRECT = changes the direction of the pull; efficiency ≈ 91 % |
| P76 (transfer) | "Car jack: 30 cm per 1 cm, 200 N lifts 4000 N — efficiency?" | CORRECT = MA 20, VR 30, 67 % |
| P77 (generate) | "Ideal lever: 900 N with 150 N — arm lengths?" | CORRECT = effort arm 6 × load arm |
| P78 (explain) | "Why efficiency < 100 %?" | CORRECT = friction (and moving parts) take some work in |
| P79 (predict) | "More strands: effort and rope length?" | CORRECT = effort down, rope length up |

## 8. Mastery Gate (P91 expansion — canonical order P77→P76→P75→P74→P78)
P77: "Design a lever to lift 900 N with 150 N (ideal). Give the arm lengths." → expected: CORRECT
P76: "A car jack: you move the handle 30 cm for each 1 cm the car rises; you push with 200 N to lift 4000 N. Efficiency?" → expected: CORRECT
P75: "A single fixed pulley lifts 500 N with a 550 N pull. What is it good for?" → expected: CORRECT
P74: "Wheelbarrow, tongs, scissors — which class each?" → expected: CORRECT
P78: "Why is efficiency always below 100 % for a real machine?" → expected: CORRECT

## 9. Retrieval Schedule (P89 expansion)
Interval 1 (1 day): "A lever with arms 1.5 m and 0.3 m — ideal MA?"
Interval 2 (3 days): "A 3-strand pulley lifts 600 N with 250 N. MA, VR, efficiency?"
Interval 3 (7 days): "Why doesn't a ramp reduce the work needed to raise a box?"
Interval 4 (21 days): "Name a class-3 lever in your body and say what it gains."
Interval 5 (60 days): "A bicycle in low gear: what is traded for what?"

---
V-check status:
- V-1 all 10 KG fields present ✓ · V-2 objective has NOT-clause ✓ · V-3 DB 2–3 Qs, every branch → a state ✓ · V-4 every plausible state (S0,S1,S2,S3,S6) has a Protocol ✓ · V-5 every Protocol has success AND failure exit ✓ · V-6 every TA opens P01/P02 ✓ · V-7 every elicitation (P34/P35/P41) followed by P55 ✓ · V-8 no P08 without prior P06/P07 (TA-2) ✓ · V-9 Schema Repair entered only via P41 gate (TA-3) ✓ · V-10 no P28 in S6 Protocol F ✓ · V-11 P91 terminal; P68 then P62 follow ✓ · V-12 no >3 consecutive C-category without E break ✓ · V-13 P54 before high-difficulty first-attempt (Protocol B TA-open) ✓ · V-14 assessment TA not first (TA-6/7) ✓ · V-15 Named Compounds (P90/P91) expanded ✓ · V-16 IC-1..20 pass ✓ · V-17 AIR invariants pass per TA ✓ · V-18 P90 (TA-6) before P91 (TA-7) ✓ · V-19 P91 has all 5 probes ✓ · V-20 P89 schedule authored with specific intervals ✓
status: READY
PACKAGE_READY
