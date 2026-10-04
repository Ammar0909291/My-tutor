# Teaching Blueprint: phys.rel.general-relativity-intro

## 0. Concept Profile
concept_id: phys.rel.general-relativity-intro
name: Equivalence Principle and Curved Spacetime
domain: Relativity (Physics)
difficulty: expert (5)
bloom: understand
prerequisites: [phys.rel.spacetime, phys.mech.universal-gravitation, phys.mech.non-inertial-frames]
mastery_threshold: 0.75
estimated_hours: 3
cross_links: []
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: P (Einstein's windowless lift — on the ground or accelerating in space — before any equation; difficulty 5)
status: READY

## 1. Learning Objective

[Boundary statement]
A student who achieves mastery demonstrates:
1. States the equivalence principle — no experiment inside a small, closed laboratory can distinguish being at rest in a uniform gravitational field from accelerating at the same rate in empty space; and, equivalently, a freely falling laboratory is locally indistinguishable from one floating in deep space — and uses it to predict new effects.
2. Derives two consequences qualitatively and uses their sizes: light must bend in a gravitational field (a beam crossing an accelerating lift curves, so it must curve near Earth too) — starlight grazing the Sun is deflected by 1.75″, confirmed in 1919; and clocks lower in a gravitational field run slower, by a fractional amount gh/c² near Earth's surface (2.5 × 10⁻¹⁵ over the 22.5 m Pound–Rebka tower). GPS satellite clocks gain about 45.7 μs per day from weaker gravity and lose about 7.2 μs per day from their speed (special relativity) — a net +38.5 μs per day that must be corrected or positions drift by about 11 km a day.
3. Describes general relativity's picture: mass and energy curve spacetime, and freely falling objects (and light) follow the straightest possible paths through it — "matter tells spacetime how to curve; spacetime tells matter how to move" — so gravity is not a force in the usual sense; extreme curvature gives black holes, whose horizon has the Schwarzschild radius r_s = 2GM/c² (2.95 km for the Sun's mass, 8.9 mm for Earth's).

A student who thinks a sealed-lab experiment could tell gravity from acceleration, or that light cannot be affected by gravity because it has no mass, has **NOT** achieved mastery — those ideas block every result of general relativity.

## 2. Student State Matrix

| State | Why here | Tell-tale behaviour | Protocol |
|---|---|---|---|
| S0 | Gravity only as Newton's force | Cannot say what the equivalence principle claims | Protocol A (Concrete) |
| S1 | "Spacetime is curved" recited | Cannot derive light bending or clock rates | Protocol B (Counterexample-first) |
| S2-BOX-CAN-TELL-GRAVITY | Hidden difference | "Drop a ball in the lift — that would show which it is" | Misconception Engine → then Protocol C |
| S2-LIGHT-UNBENT-BY-GRAVITY | Massless = immune | "Light has no mass, so gravity can't bend it" | Misconception Engine → then Protocol C |
| S3 | Partial — principle fine | Cannot compute gh/c² or explain GPS | Protocol C (Guided Questioning) |
| S6 | Anxiety on relativity | Treats the topic as incomprehensible | Protocol F (Low Pressure) |

## 3. Diagnostic Battery

DB-1 (prior-exposure check):
"You wake up in a windowless room and feel your normal weight. Could you be in a rocket accelerating at 9.8 m/s² in deep space instead of on Earth?"
  "Yes — there'd be no way to tell" → DB-2.
  "No — I could do an experiment to check" → SIGNAL:MISCONCEPTION:MC-BOX-CAN-TELL-GRAVITY. Enter Misconception Engine.
  No idea → S0. Enter Protocol A (Concrete).

DB-2 (representation / misconception test):
"Can gravity bend a beam of light, given that light has no mass?"
  "Yes — an accelerating lift bends light, so by equivalence gravity must; in GR light follows curved spacetime" → S3. Enter Protocol C.
  "Yes" (no reason) → S1. Enter Protocol B.
  "No — gravity only acts on mass" → SIGNAL:MISCONCEPTION:MC-LIGHT-UNBENT-BY-GRAVITY. Enter Misconception Engine.
  Pause → add S6 flag; Protocol F if anxious, otherwise Protocol A.

DB-3 (clock check — overlays):
"Do clocks on a mountaintop and at sea level tick at exactly the same rate?"
  "No — the higher clock runs slightly faster" → no flag.
  "Yes — time is the same everywhere" → note; repair at TA-4.
  Confident and wrong on DB-1 → add S7 flag. Override to Protocol G.

## 4. Prerequisite Check

PD-1 (for `phys.rel.spacetime`, `phys.mech.universal-gravitation`, `phys.mech.non-inertial-frames`):
"What is a spacetime diagram? How does gravity depend on mass and distance? What pseudo force acts in an accelerating lift?"
  Cannot say "events plotted in space and time, worldlines; F = GMm/r²; −ma, opposite to the acceleration" → flag PREREQ-GAP-GR.
  In-session minimum repair: one P06 (a lift accelerating upward with a pseudo force drawn) + one P34 ("scale reading in a lift accelerating up at g?") then resume. If absent, schedule the missing session (S4 route).

## 5. Protocol Library

### Protocol A — Concrete-First (primary)
Serves: S0
CPA entry: P
Entry condition: gravity only as a force.
Success exit: states the principle, derives light bending and clock rates, explains curved spacetime (P91 all 5 probes CORRECT).
Failure exit: on BOX-CAN-TELL-GRAVITY → Misconception Engine, resume at TA-3. On anxiety → Protocol F.
Duration: ~70–80 min (spans 2 sessions; session_cap 7 TAs).

[TA-1: Einstein's Lift]
P01
→ P04[content: "Einstein called it the happiest thought of his life: a person falling freely feels no weight. A closed lift on Earth and one accelerating in space feel exactly the same inside."]
→ P06[content: two windowless lifts side by side — one resting on Earth, one accelerating upward at 9.8 m/s² in space — a dropped ball falling identically in both]
→ P14[predict: "Is there any experiment inside that could tell them apart?"] → P55
→ success_path → P49 → P05[curiosity: "If they're truly equivalent, what does that predict?"]

[TA-2: The Equivalence Principle]
P02
→ P13[think-aloud: "In the accelerating lift, a dropped ball 'falls' because the floor rushes up at it — every object, whatever its mass, at the same rate. On Earth every object also falls at the same rate. Einstein turned this coincidence into a principle: locally, no experiment can tell uniform gravity from acceleration."]
→ P08[notation: "equivalence: uniform gravity g ⟺ acceleration a = g (locally)"]
// GR-3 satisfied: P06 and P13 preceded P08 (V-8 PASS)

[TA-3: No Experiment Can Tell]
P02
→ P41[diagnostic: "Could dropping balls of different masses tell you which lift you're in?"] → P55
→ [if no] → P49
→ [if yes] → SIGNAL:MISCONCEPTION:MC-BOX-CAN-TELL-GRAVITY → misconception_repair_chain[MC-BOX-CAN-TELL-GRAVITY]

[TA-4: Light Bends, Clocks Slow]
P02
→ P41[diagnostic: "Can gravity bend light, which has no mass?"] → P55
→ [if yes] → P49
→ [if no] → SIGNAL:MISCONCEPTION:MC-LIGHT-UNBENT-BY-GRAVITY → misconception_repair_chain[MC-LIGHT-UNBENT-BY-GRAVITY]
→ P13[think-aloud: "In the accelerating lift, light sent from the floor to the ceiling arrives slightly redshifted, because the ceiling has sped away during the trip. By equivalence, light climbing out of gravity is redshifted too — so a clock low down runs slow compared with one higher up, by gh/c²."]
→ P34[question: "Fractional clock-rate difference across a 22.5 m tower?"] → P55
→ success_path[gh/c² = 9.81 × 22.5 / (3.0 × 10⁸)² ≈ 2.5 × 10⁻¹⁵] → P49
→ failure_path → P50 → P51[diagnose: c²] → P52[narrow: "c² = 9 × 10¹⁶ m²/s²"] → re-elicit P34 → P55

[TA-5: GPS and Curved Spacetime]
P02
→ P34[question: "GPS clocks gain 45.7 μs/day from weaker gravity and lose 7.2 μs/day from their speed. Net? Why does it matter?"] → P55
→ success_path[+38.5 μs/day; light travels ~11.5 km in that time, so positions would drift ~11 km a day] → P49
→ P13[think-aloud: "General relativity says mass-energy curves spacetime and free objects follow the straightest paths in it. The Moon isn't pulled by a force; it follows a straight-as-possible path through curved spacetime. Squeeze a mass inside r_s = 2GM/c² and not even light escapes — a black hole."]

[TA-6: Formative Assessment]
P02
→ P90_expansion:
    P79[predict: "An astronaut in an orbiting station feels weightless. By the equivalence principle, what does that tell us?"] → P55
    → P49 → P51[check: free fall is locally the same as no gravity]
    → P35[open: "Explain why light must bend near the Sun, using the lift."] → P55

[TA-7: Mastery Gate]
P02
→ P91_expansion:
    P77[generate: "Design an experiment that tests gravitational time dilation on Earth."] → P55 → CORRECT
    → P76[transfer: "Why must GPS satellites' clocks be adjusted before launch?"] → P55 → CORRECT
    → P75[boundary: "Is a very large laboratory (spanning Earth) still unable to tell gravity from acceleration?"] → P55 → CORRECT
    → P74[classify: "Light bending, clock slowing, black holes — which follow from the equivalence principle alone?"] → P55 → CORRECT
    → P78[explain: "In general relativity, why does the Moon orbit Earth?"] → P55 → CORRECT
→ P68 → P62[schedule: first retrieval in 1 day]

### Protocol B — Counterexample-First
Serves: S1
CPA entry: P
Entry condition: slogan without derivation.
Success exit: derives light bending and the clock shift from the lift.
Failure exit: Misconception Engine, then Protocol C.
Key deltas from A: open with P02 → P41["A light beam crosses an upward-accelerating lift. Seen inside, is its path straight or curved?"] → P54 (novel) → P55; then TA-4 and TA-5.

### Protocol C — Guided Questioning
Serves: S3, S2 (post-repair)
CPA entry: P
Entry condition: principle fine; numbers not.
Success exit: gh/c² and GPS computed.
Failure exit: escalate to Protocol A TA-2.
Key deltas: enter at TA-4; run TA-5 and the gate.

### Protocol F — Low Pressure (S6)
Serves: S6
CPA entry: P
Entry condition: S6 flag confirmed.
Success exit: the lift argument and GPS correction stated calmly.
Failure exit: shorten, bank one success, reschedule.
Key deltas: NO P28 (V-10 / GR-5); thought experiments only, numbers given; P85 regulation_tail on every TA.

### Protocol G — Challenge-First (S7 override)
Serves: S7
CPA entry: P
Entry condition: confident "I could tell the difference".
Success exit: revises after each proposed test fails.
Failure exit: Misconception Engine.
Key deltas: open by inviting any experiment and running it in both lifts; let it sit (P55).

## 6. Misconception Engine

### MC-BOX-CAN-TELL-GRAVITY: "Some experiment inside a closed lab could tell gravity from acceleration"
trigger_signal: student proposes that dropping objects, pendulums, scales or similar local experiments would reveal whether a sealed laboratory is in a gravitational field or accelerating.
conflict_evidence [P28]: "Name your experiment. Drop a heavy ball and a light one: in the accelerating rocket, the floor rushes up to meet both together. On Earth, both fall together too. Weigh yourself: the floor pushes with mg in both. Swing a pendulum: the same period in both. Which result differs?"
bridge_text [P30]: "None does. Every mechanical experiment gives the same result because all objects fall at the same rate in gravity, exactly as they appear to in an accelerating frame. Einstein raised this to a principle covering ALL physics, including light and clocks — and then followed its consequences. (Only over large regions do tidal differences reveal real gravity; locally, equivalence is exact.)"
replacement_text [P31]: "Locally, uniform gravity and acceleration are physically indistinguishable — the equivalence principle."
discrimination_pairs [P33]: ["small sealed lab: gravity and acceleration indistinguishable", "lab spanning a planet: tidal stretching reveals true gravity"]
s6_path: skip P28; run the two lifts side by side in a simulation.

### MC-LIGHT-UNBENT-BY-GRAVITY: "Light cannot be bent by gravity because it has no mass"
trigger_signal: student denies gravitational bending of light (or gravitational effects on light) on the grounds that photons are massless.
conflict_evidence [P28]: "Shine a beam straight across a lift that is accelerating upward. While the light crosses, the lift moves up. Where does the beam hit the far wall — level with where it started, or lower? So what does the path look like inside?"
bridge_text [P30]: "Lower — inside the lift the beam curves downward. By the equivalence principle, the same must happen in a gravitational field, so gravity bends light even though light has no mass. General relativity explains why: gravity is curved spacetime, and light follows it. Eddington measured starlight bending by 1.75″ at the Sun's edge in 1919, and gravitational lenses now bend whole galaxies' light."
replacement_text [P31]: "Gravity affects everything that moves through spacetime, light included; starlight grazing the Sun bends by 1.75″."
discrimination_pairs [P33]: ["Newton with massless light: no bending", "general relativity and observation: 1.75″ at the solar limb"]
s6_path: skip P28; show a gravitational-lensing image (an Einstein ring).

## 7. Assessment Battery

| Probe | Item | Expected signal |
|---|---|---|
| P74 (classify) | "From equivalence alone" | CORRECT = light bending and clock slowing (qualitatively); black holes need full GR |
| P74 (classify) | "Higher or lower clock faster?" | CORRECT = higher |
| P75 (boundary) | "Planet-sized lab" | CORRECT = tidal effects reveal gravity; equivalence is local |
| P76 (transfer) | "GPS clock adjustment" | CORRECT = net +38 μs/day from GR and SR |
| P77 (generate) | "Test time dilation" | CORRECT = compare precise clocks at different heights (or Pound–Rebka) |
| P78 (explain) | "Why the Moon orbits" | CORRECT = it follows the straightest path in spacetime curved by Earth |
| P79 (predict) | "Orbiting astronaut" | CORRECT = free fall is locally like no gravity |

## 8. Mastery Gate (P91 expansion — canonical order P77→P76→P75→P74→P78)
P77: "Design an experiment that tests gravitational time dilation on Earth." → expected: CORRECT
P76: "Why must GPS satellites' clocks be adjusted before launch?" → expected: CORRECT
P75: "Is a very large laboratory (spanning Earth) still unable to tell gravity from acceleration?" → expected: CORRECT
P74: "Light bending, clock slowing, black holes — which follow from the equivalence principle alone?" → expected: CORRECT
P78: "In general relativity, why does the Moon orbit Earth?" → expected: CORRECT

## 9. Retrieval Schedule (P89 expansion)
Interval 1 (1 day): "State the equivalence principle."
Interval 2 (3 days): "gh/c² for a 100 m tower?"
Interval 3 (7 days): "Why does light bend near the Sun?"
Interval 4 (21 days): "Net GPS clock drift per day?"
Interval 5 (60 days): "Schwarzschild radius of a 10-solar-mass black hole?"

---
V-check status:
- V-1 all 10 KG fields present ✓ · V-2 objective has NOT-clause ✓ · V-3 DB 2–3 Qs, every branch → a state ✓ · V-4 every plausible state (S0,S1,S2,S3,S6) has a Protocol ✓ · V-5 every Protocol has success AND failure exit ✓ · V-6 every TA opens P01/P02 ✓ · V-7 every elicitation (P34/P35/P41) followed by P55 ✓ · V-8 no P08 without prior P06/P07 (TA-2) ✓ · V-9 Schema Repair entered only via P41 gate (TA-3, TA-4) ✓ · V-10 no P28 in S6 Protocol F ✓ · V-11 P91 terminal; P68 then P62 follow ✓ · V-12 no >3 consecutive C-category without E break ✓ · V-13 P54 before high-difficulty first-attempt (Protocol B TA-open) ✓ · V-14 assessment TA not first (TA-6/7) ✓ · V-15 Named Compounds (P90/P91) expanded ✓ · V-16 IC-1..20 pass ✓ · V-17 AIR invariants pass per TA ✓ · V-18 P90 (TA-6) before P91 (TA-7) ✓ · V-19 P91 has all 5 probes ✓ · V-20 P89 schedule authored with specific intervals ✓
status: READY
PACKAGE_READY
