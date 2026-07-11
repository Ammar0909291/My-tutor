# Teaching Blueprint: phys.meas.vector-addition

## 0. Concept Profile
concept_id: phys.meas.vector-addition
name: Vector Addition and Resolution
domain: Measurement & Units (Physics)
difficulty: developing (3)
bloom: apply
prerequisites: [phys.meas.scalars-vectors]
mastery_threshold: 0.8
estimated_hours: 3
cross_links: []
unlocks: [phys.meas.vector-products, phys.mech.kinematics-2d]
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (physical displacements/arrows before component notation; difficulty 3 → C with accelerated P track)
status: READY

## 1. Learning Objective

[Boundary statement]
A student who achieves mastery demonstrates:
1. Adds two vectors by the **head-to-tail / parallelogram** method and states that the resultant depends on both magnitudes AND the angle between them — not on the magnitudes alone.
2. **Resolves** a vector into orthogonal components (Vₓ = V cos θ, Vᵧ = V sin θ) and reconstructs the resultant from components (magnitude √(Vₓ²+Vᵧ²), direction tan⁻¹(Vᵧ/Vₓ)).
3. Reasons about the range of a resultant: for two vectors of magnitudes a and b, the resultant lies between |a−b| (opposed) and a+b (aligned) — so a resultant can be smaller than either vector.

A student who computes 3 + 4 = 7 for two forces regardless of their directions, or who can quote V cos θ but cannot say why the resultant of a 3 N and 4 N force is 5 N at right angles (not 7 N), has **NOT** achieved mastery — the arithmetic without the direction-dependence fails at every 2-D force, velocity, and field problem downstream.

## 2. Student State Matrix

| State | Why here | Tell-tale behaviour | Protocol |
|---|---|---|---|
| S0 | No exposure to combining vectors | Cannot combine two arrows in any way | Protocol A (Concrete) |
| S1 | "Add the numbers" schema from scalars | Adds magnitudes; ignores angle entirely | Protocol B (Counterexample-first) |
| S2-SCALAR-SUM | Believes resultant = sum of magnitudes always | Says 3 N + 4 N = 7 N whatever the angle | Misconception Engine → Protocol C |
| S3 | Can add collinear/parallel; fails angled | OK for same-line vectors; stuck at an angle | Protocol C (Guided Questioning) |
| S4 | Prerequisite gap on scalar/vector distinction | Treats vectors as plain numbers | Protocol D → prereq repair |
| S6 | Anxiety at trig/component notation | Freezes at sin/cos and √ | Protocol F (Low Pressure) |

## 3. Diagnostic Battery

DB-1 (prior-exposure check):
"Have you combined two vectors — like two forces or two displacements — into a single overall one before?"
  No → S0. Enter Protocol A (Concrete).
  Yes → DB-2.

DB-2 (representation / misconception test):
"A box is pulled with a 3 N force pointing east and a 4 N force pointing north, at the same time. What single force do they add up to? How did you get it?"
  "5 N, north-east — because at right angles you use the triangle/√(3²+4²)" → S3. Enter Protocol C.
  "5 N" (no reason) → clarify "How?" → if right-angle reasoning → S3 | if guessed → S1.
  "7 N" → SIGNAL:MISCONCEPTION:MC-SCALAR-SUM. Enter Misconception Engine.
  Pause / "I don't know" → add S6 flag → confidence question → route (No→S6/F, Yes→S0/A).

DB-3 (confidence calibration):
"How confident are you with adding vectors — 1 to 5?"
  1–2 → add S6 flag; apply S6 adaptations.
  4–5 + DB-2 = "7 N" → add S7 flag; override to Protocol G (challenge-first).

## 4. Prerequisite Check

PD-1 (for `phys.meas.scalars-vectors`):
"What's the difference between speed and velocity — or between distance and displacement?"
  Cannot cite that one has direction and the other doesn't → flag PREREQ-GAP-SCALARS-VECTORS.
  In-session minimum repair: P06 arrow anchor (walk 3 steps east — a displacement has size AND direction) + one P34, then resume. Deep gap → schedule `phys.meas.scalars-vectors` (S4 route, Protocol D).

## 5. Protocol Library

### Protocol A — Concrete-First (primary)
Serves: S0
CPA entry: C → P → A
Entry condition: no prior exposure (DB-1 = No).
Success exit: resolves a vector into components AND reconstructs a resultant, stating the angle-dependence (P91 all 5 CORRECT).
Failure exit: on SCALAR-SUM signal → Misconception Engine, then resume TA-3. On trig collapse → Protocol F.
Duration: ~55–65 min (may span 2 sessions).

[TA-1: Two Walks, One Displacement]
P01
→ P04[content: "Walk one way, then another — where do you end up, measured straight from the start? That single arrow is the resultant."]
→ P06[content: on the floor, student walks 3 tiles east, then 4 tiles north; a string from start to finish is the resultant]
→ P34[question: "You walked 3 then 4 — but how far are you from where you started, in a straight line?"] → P55
→ success_path → P49 → P05[curiosity: "It's not 7. Why did the two distances not just add up?"]

[TA-2: Head-to-Tail & the Angle Matters]
P02
→ P06[content: two cardboard arrows; join them head-to-tail at different angles — same tail, then perpendicular, then opposed]
→ P14[predict: "Same two arrows (3 and 4). When they point the SAME way, what's the resultant? When OPPOSITE? When at a right angle?"] → P55
→ success_path → P15[observe: measure the closing arrow in each case — 7, then 1, then 5]
→ P17[contrast: "Same two arrows, three different resultants — 7, 1, 5. What decided the difference?"] → P55
→ success_path[the angle]
→ P13[think-aloud: "The resultant is the arrow that closes the head-to-tail chain. Its size depends on the angle. Aligned → a+b. Opposed → |a−b|. In between → somewhere between."]

[TA-3: Resolving into Components — Notation]
P02
→ P07[modality: an arrow on an x–y grid with its shadow (component) dropped onto each axis]
→ P13[think-aloud: "Any arrow can be replaced by two arrows along x and y — its components. If it makes angle θ with the x-axis: Vₓ = V cos θ along x, Vᵧ = V sin θ up y."]
→ P08[notation: "Vₓ = V cos θ ; Vᵧ = V sin θ ; V = √(Vₓ² + Vᵧ²) ; θ = tan⁻¹(Vᵧ/Vₓ)"]
// GR-3 satisfied: P06/P07 preceded P08 (V-8 PASS)
→ P10[example: "Worked: a 10 N force at 30° above horizontal → Vₓ = 10 cos30 ≈ 8.7 N, Vᵧ = 10 sin30 = 5 N."]
→ P34[question: "Resolve a 20 N force at 60° above the horizontal into its x and y components."] → P55
→ success_path → P49
→ failure_path → P50 → P51[diagnose: swapped sin/cos, or arithmetic?] → P52[narrow: "The component ALONG the angle's axis uses cos; the one across uses sin. Which axis is θ measured from?"] → re-elicit → P55

[TA-4: Adding by Components + Misconception Probe]
P02
→ P54 // combining component-wise then recomposing is the load-bearing procedure
→ P13[think-aloud: "To add vectors: add all the x-components, add all the y-components, then rebuild the resultant from those two sums."]
→ P41[diagnostic: "Add a 3 N force east and a 4 N force north by components, and give the resultant's size."] → P55
→ [if √(3²+4²)=5 N] → P49 → P36[probe: "Why isn't it 7 N?"] → P55
→ [if 7 N / adds magnitudes] → SIGNAL:MISCONCEPTION:MC-SCALAR-SUM → misconception_repair_chain[MC-SCALAR-SUM]

[TA-5: Formative Assessment]
P02
→ P90_expansion:
    P79[predict: "Two 5 N forces act at 120° to each other. Before computing — is the resultant bigger or smaller than 5 N?"] → P55
    → P49 → P51[check: did they reason about the angle, or default to 10 N?]
    → P35[open: "Explain why two equal forces can add up to something SMALLER than one of them."] → P55

[TA-6: Mastery Gate]
P02
→ P91_expansion:
    P77[generate: "Invent two vectors whose resultant is smaller than either one, and say why."] → P55 → CORRECT
    → P76[transfer: "A swimmer heads straight across a river at 2 m/s; the current carries them downstream at 1.5 m/s. What is their actual speed and roughly which way?"] → P55 → CORRECT
    → P75[boundary: "For a 6 N and an 8 N force, what is the largest and smallest possible resultant?"] → P55 → CORRECT
    → P74[classify: "Two forces at right angles, 3 N and 4 N: is the resultant 7 N or 5 N?"] → P55 → CORRECT
    → P78[explain: "In your own words: how do you add two vectors, and why does the angle between them matter?"] → P55 → CORRECT
→ P68 → P62[schedule: first retrieval in 2 days]

### Protocol B — Counterexample-First
Serves: S1 ("add the numbers")
CPA entry: P
Entry condition: adds magnitudes; ignores angle.
Success exit: computes an angled resultant by components and rejects the arithmetic sum, citing the angle.
Failure exit: if triggers SCALAR-SUM → Misconception Engine → Protocol C.
Key deltas: open P02 → P41["you say 3 N east + 4 N north = 7 N. Walk it: 3 east then 4 north — are you 7 tiles from start?"] → P54 → P55; on the stall run P17 (the three-angle demo) and P21 to extract angle-dependence; converge on TA-3 onward.

### Protocol C — Guided Questioning
Serves: S3 (partial), S2 (post-repair)
CPA entry: P
Entry condition: adds collinear vectors; stuck at an angle.
Success exit: resolves + recomposes an angled case.
Failure exit: escalate to Protocol A TA-2 (rebuild head-to-tail concretely).
Key deltas: enter at TA-3; P36/P51 probes to surface the partial rule; run P90/P91.

### Protocol D — Prerequisite Repair (S4)
Serves: S4; entry PREREQ-GAP-SCALARS-VECTORS; success = scalar/vector distinction re-established → return to Protocol A TA-1; failure = schedule `phys.meas.scalars-vectors`, suspend.

### Protocol F — Low Pressure (S6)
Serves: S6
CPA entry: C
Success exit: one head-to-tail resultant found calmly (components deferred).
Failure exit: shorten, bank a win, reschedule.
Key deltas: NO P28 (V-10/GR-5); conflict replaced by P30 bridge; stay in the concrete/graphical (P06/P07) — defer P08 trig; keep a component formula card visible; P85 regulation_tail per TA.

### Protocol G — Challenge-First (S7 override)
Serves: S7; entry DB-3 4–5 with DB-2 = "7 N"; success = student revises the arithmetic-sum claim after walking it out; failure = Misconception Engine[MC-SCALAR-SUM].
Key deltas: open with the P41 walk-it-out contradiction; let it sit (P55); P17 contrast; no premature confirmation.

## 6. Misconception Engine

### MC-SCALAR-SUM: "The resultant is just the magnitudes added"
trigger_signal: student adds vector magnitudes arithmetically regardless of direction (3 N + 4 N = 7 N at any angle).
conflict_evidence [P28]: "Walk it with me: 3 tiles east, then 4 tiles north. If they simply added to 7, you'd be 7 tiles away in a straight line. Measure the straight-line distance from start to finish — it's 5, not 7. Where did the other 2 go?"
bridge_text [P30]: "Vectors carry direction. Only when they point the SAME way do their sizes add straight (7). At a right angle you close a triangle: √(3²+4²) = 5. The angle between them changes the resultant."
replacement_text [P31]: "Add vectors head-to-tail (or by components), not by adding magnitudes. The resultant depends on both sizes and the angle between them."
discrimination_pairs [P33]: ["3 & 4 aligned → 7 (add straight)", "3 & 4 opposed → 1 (subtract)", "3 & 4 at 90° → 5 (Pythagoras)"]
s6_path: skip P28; walk the 3-then-4 path together as a shared observation and go straight to bridge_text (P30).

### MC-RESULTANT-ALWAYS-LARGER: "Combining two vectors always makes a bigger one"
trigger_signal: student assumes the resultant must exceed both inputs; surprised a resultant can be smaller.
conflict_evidence [P28]: "Two people push a box with equal force — one from the left, one from the right. Two forces, both real. What is the net push on the box?"
bridge_text [P30]: "Because vectors have direction, they can partly or fully cancel. Two equal opposed vectors give zero; two at a wide angle give a resultant smaller than either. Bigger is only guaranteed when they're aligned."
replacement_text [P31]: "The resultant of magnitudes a and b lies between |a−b| and a+b — so it can be smaller than either, equal to their difference, or as large as their sum."
discrimination_pairs [P33]: ["equal, aligned → doubled", "equal, opposed → zero", "equal, 120° apart → smaller than one"]
s6_path: skip P28; use the two-people-pushing image as a gentle shared puzzle, then P30.

## 7. Assessment Battery

| Probe | Item | Expected signal |
|---|---|---|
| P74 (classify) | "3 N and 4 N at right angles: resultant 7 N or 5 N?" | CORRECT = 5 N |
| P74 (classify) | "Component of V at angle θ ALONG the x-axis: V cos θ or V sin θ?" | CORRECT = V cos θ |
| P75 (boundary) | "Largest and smallest possible resultant of 6 N and 8 N?" | CORRECT = 14 N and 2 N |
| P76 (transfer) | "Swimmer 2 m/s across, current 1.5 m/s down — actual speed?" | CORRECT = 2.5 m/s (√(2²+1.5²)) |
| P77 (generate) | "Two vectors whose resultant is smaller than either — give them." | CORRECT = valid (e.g. wide angle) |
| P78 (explain) | "How do you add vectors, and why does the angle matter?" | CORRECT = head-to-tail/components + angle-dependence |
| P79 (predict) | "Two 5 N forces at 120°: resultant bigger or smaller than 5 N?" | CORRECT = smaller (= 5 N exactly, but reasons 'not doubled') |

## 8. Mastery Gate (P91 expansion — canonical order P77→P76→P75→P74→P78)
P77: "Invent two vectors whose resultant is smaller than either, and say why." → expected: CORRECT
P76: "Swimmer heads across a river at 2 m/s; current 1.5 m/s downstream. Actual speed and rough direction?" → expected: CORRECT
P75: "For a 6 N and 8 N force, largest and smallest possible resultant?" → expected: CORRECT
P74: "Two forces at right angles, 3 N and 4 N: resultant 7 N or 5 N?" → expected: CORRECT
P78: "In your own words: how to add two vectors and why the angle matters." → expected: CORRECT

## 9. Retrieval Schedule (P89 expansion)
Interval 1 (2 days): "Add a 3 N east and 4 N north force; give size and direction."
Interval 2 (5 days): "Resolve a 12 N force at 40° above horizontal into components."
Interval 3 (10 days): "Two 5 N forces act at 90°. Find the resultant."
Interval 4 (21 days): "A plane flies 200 km/h north; a 50 km/h wind blows east. Find the ground velocity."
Interval 5 (60 days): "Explain why two forces can add to a resultant smaller than either, with an example."

---
V-check status:
- V-1 all 10 KG fields ✓ · V-2 NOT-clause ✓ · V-3 DB 2–3 Qs, every branch → state ✓ · V-4 every plausible state (S0,S1,S2,S3,S4,S6) has a Protocol ✓ · V-5 every Protocol success+failure exit ✓ · V-6 every TA opens P01/P02 ✓ · V-7 elicitations followed by P55 ✓ · V-8 no P08 without prior P06/P07 (TA-3) ✓ · V-9 Schema Repair via P41 gate (TA-4) ✓ · V-10 no P28 in S6 Protocol F ✓ · V-11 P91 terminal; P68→P62 ✓ · V-12 no >3 consecutive C without E break ✓ · V-13 P54 before high-difficulty first-attempt (TA-4, Protocol B) ✓ · V-14 assessment not first (TA-5/6) ✓ · V-15 Named Compounds expanded ✓ · V-16 IC-1..20 ✓ · V-17 AIR invariants per TA ✓ · V-18 P90 (TA-5) before P91 (TA-6) ✓ · V-19 P91 5 probes ✓ · V-20 P89 intervals authored ✓
status: READY
PACKAGE_READY
