# Teaching Blueprint: phys.em.radiation-and-antennas

## 0. Concept Profile
concept_id: phys.em.radiation-and-antennas
name: Radiation from Accelerating Charges and Radiation Pressure
domain: Electricity & Magnetism (Physics)
difficulty: expert (5)
bloom: apply
prerequisites: [phys.em.electromagnetic-waves, phys.mech.momentum]
mastery_threshold: 0.75
estimated_hours: 2
cross_links: []
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: P (a car's whip antenna and a solar-sail spacecraft, before any field line; difficulty 5)
status: READY

## 1. Learning Objective

[Boundary statement]
A student who achieves mastery demonstrates:
1. States that electromagnetic waves are produced only by ACCELERATING charges: a charge at rest has a static field, a charge moving at constant velocity carries its field along, but when a charge accelerates, a kink in its field travels outward at c — radiation. A steady direct current in a straight wire does not radiate; an alternating current, whose charges oscillate, does.
2. Applies this to the dipole antenna: charges surging up and down a rod radiate most strongly broadside (perpendicular to the rod) and not at all along its axis, with the electric field of the wave parallel to the rod (vertical rod → vertically polarised wave); a half-wave dipole for 100 MHz is λ/2 = 1.5 m long, and a receiving antenna works best aligned with the wave's electric field.
3. Uses the momentum of light, p = E/c: a beam of intensity I exerts a radiation pressure I/c on a surface that absorbs it and 2I/c on one that reflects it. Sunlight at Earth (1361 W/m²) gives 4.5 μPa absorbed, 9.1 μPa reflected; a 100 m × 100 m reflecting solar sail feels about 0.09 N — tiny, but unceasing and fuel-free.

A student who thinks any moving charge (including a steady current) radiates, or that light cannot push anything because it has no mass, has **NOT** achieved mastery — those ideas misread antennas and radiation pressure alike.

## 2. Student State Matrix

| State | Why here | Tell-tale behaviour | Protocol |
|---|---|---|---|
| S0 | EM waves "just exist" | Cannot say what makes an antenna radiate | Protocol A (Concrete) |
| S1 | "Accelerating charges radiate" recited | Cannot apply it to DC vs AC | Protocol B (Counterexample-first) |
| S2-STEADY-CURRENT-RADIATES | Motion = radiation | "A battery-powered wire sends out radio waves" | Misconception Engine → then Protocol C |
| S2-LIGHT-NO-MOMENTUM | Massless = no push | "Light has no mass, so it can't exert a force" | Misconception Engine → then Protocol C |
| S3 | Partial — radiation fine | Cannot compute radiation pressure or the antenna pattern | Protocol C (Guided Questioning) |
| S6 | Anxiety on field pictures | Avoids field-line diagrams | Protocol F (Low Pressure) |

## 3. Diagnostic Battery

DB-1 (prior-exposure check):
"What has to happen to electric charges for them to send out radio waves?"
  No idea → S0. Enter Protocol A (Concrete).
  "They must accelerate — oscillate" → DB-2.
  "They just have to move" → SIGNAL:MISCONCEPTION:MC-STEADY-CURRENT-RADIATES. Enter Misconception Engine.

DB-2 (representation / misconception test):
"Can sunlight push a spacecraft's sail even though photons have no mass?"
  "Yes — light carries momentum p = E/c, giving radiation pressure (2I/c for a mirror)" → S3. Enter Protocol C.
  "Yes" (no reason) → S1. Enter Protocol B.
  "No — no mass, no push" → SIGNAL:MISCONCEPTION:MC-LIGHT-NO-MOMENTUM. Enter Misconception Engine.
  Pause → add S6 flag; Protocol F if anxious, otherwise Protocol A.

DB-3 (pattern check — overlays):
"A vertical dipole antenna: in which direction does it radiate least?"
  "Straight up and down, along its axis" → no flag.
  "Equally in all directions" → note; repair at TA-4.
  Confident and wrong on DB-2 → add S7 flag. Override to Protocol G.

## 4. Prerequisite Check

PD-1 (for `phys.em.electromagnetic-waves` and `phys.mech.momentum`):
"What is an EM wave made of, and what is momentum?"
  Cannot say "linked oscillating E and B fields travelling at c; p = mv, and force = rate of change of momentum" → flag PREREQ-GAP-EMW-MOMENTUM.
  In-session minimum repair: one P06 (E and B oscillating at right angles) + one P34 ("a ball bounces back elastically: momentum change?") then resume. If absent, schedule the missing session (S4 route).

## 5. Protocol Library

### Protocol A — Concrete-First (primary)
Serves: S0
CPA entry: P
Entry condition: EM waves "just exist".
Success exit: explains radiation by acceleration, the dipole pattern and radiation pressure (P91 all 5 probes CORRECT).
Failure exit: on STEADY-CURRENT-RADIATES → Misconception Engine, resume at TA-3. On anxiety → Protocol F.
Duration: ~55–65 min (may span 2 sessions; session_cap 7 TAs).

[TA-1: The Whip and the Sail]
P01
→ P04[content: "A car's whip antenna sends and receives radio waves; a solar sail in space is pushed by sunlight. Both are about charges and fields carrying energy and momentum."]
→ P06[content: a dipole antenna with its doughnut-shaped radiation pattern; a solar sail with sunlight reflecting off it]
→ P14[predict: "Which way does the antenna send most of its signal?"] → P55
→ success_path → P49 → P05[curiosity: "Why does an oscillating current radiate at all?"]

[TA-2: Only Acceleration Radiates]
P02
→ P13[think-aloud: "A charge at rest: a steady field. Moving at constant velocity: the field moves with it, no wave. Accelerate it and a kink forms in its field lines — that kink travels outward at c. That travelling disturbance is an EM wave."]
→ P08[notation: "accelerating charge → radiation; static or uniformly moving charge → no radiation"]
// GR-3 satisfied: P06 and P13 preceded P08 (V-8 PASS)

[TA-3: DC vs AC]
P02
→ P41[diagnostic: "A wire carrying a steady 2 A from a battery: does it radiate radio waves?"] → P55
→ [if no] → P49
→ [if yes] → SIGNAL:MISCONCEPTION:MC-STEADY-CURRENT-RADIATES → misconception_repair_chain[MC-STEADY-CURRENT-RADIATES]

[TA-4: The Dipole Antenna]
P02
→ P13[think-aloud: "In a dipole, charges surge up and down at the signal frequency. Viewed from the side, you see the full up-and-down acceleration: strong radiation. Viewed from the end of the rod, you see no sideways motion at all: zero radiation along the axis. The wave's E field is parallel to the rod."]
→ P34[question: "Half-wave dipole for 100 MHz: length? For a vertical rod, how is the wave polarised?"] → P55
→ success_path[1.5 m; vertically] → P49

[TA-5: Radiation Pressure]
P02
→ P41[diagnostic: "Can sunlight push a sail though photons are massless?"] → P55
→ [if yes] → P49
→ [if no] → SIGNAL:MISCONCEPTION:MC-LIGHT-NO-MOMENTUM → misconception_repair_chain[MC-LIGHT-NO-MOMENTUM]
→ P34[question: "Sunlight 1361 W/m². Pressure on an absorbing surface? A mirror? Force on a 100 m × 100 m mirror sail?"] → P55
→ success_path[4.5 μPa; 9.1 μPa; ≈ 0.09 N] → P49
→ failure_path → P50 → P51[diagnose: factor 2] → P52[narrow: "Reflection reverses the momentum — like a ball bouncing back"] → re-elicit P34 → P55

[TA-6: Formative Assessment]
P02
→ P90_expansion:
    P79[predict: "Black sail or mirror sail: which gets the bigger push?"] → P55
    → P49 → P51[check: mirror, twice as much]
    → P35[open: "Explain why a vertical antenna receives a horizontally polarised signal poorly."] → P55

[TA-7: Mastery Gate]
P02
→ P91_expansion:
    P77[generate: "Design a receiving antenna for a 50 MHz vertically polarised signal."] → P55 → CORRECT
    → P76[transfer: "Why do X-rays come out of an X-ray tube when electrons hit the target?"] → P55 → CORRECT
    → P75[boundary: "A charge moving in a circle at constant speed: does it radiate?"] → P55 → CORRECT
    → P74[classify: "DC wire, AC antenna, electron at rest, electron braking — which radiate?"] → P55 → CORRECT
    → P78[explain: "Why is radiation pressure on a mirror twice that on a black surface?"] → P55 → CORRECT
→ P68 → P62[schedule: first retrieval in 1 day]

### Protocol B — Counterexample-First
Serves: S1
CPA entry: P
Entry condition: rule without application.
Success exit: applies the rule to DC, AC, circular motion and braking.
Failure exit: Misconception Engine, then Protocol C.
Key deltas from A: open with P02 → P41["Your torch's wires carry current all evening. Does your radio pick them up?"] → P54 (novel) → P55; then TA-4 and TA-5.

### Protocol C — Guided Questioning
Serves: S3, S2 (post-repair)
CPA entry: P
Entry condition: radiation fine; pattern and pressure not.
Success exit: dipole pattern and radiation pressure computed.
Failure exit: escalate to Protocol A TA-2.
Key deltas: enter at TA-4; run the gate.

### Protocol F — Low Pressure (S6)
Serves: S6
CPA entry: P
Entry condition: S6 flag confirmed.
Success exit: acceleration rule and the mirror's factor of 2 stated calmly.
Failure exit: shorten, bank one success, reschedule.
Key deltas: NO P28 (V-10 / GR-5); a rope shaken at one end for the "kink" before field lines; P85 regulation_tail on every TA.

### Protocol G — Challenge-First (S7 override)
Serves: S7
CPA entry: P
Entry condition: confident "light can't push".
Success exit: revises after the comet-tail evidence.
Failure exit: Misconception Engine.
Key deltas: open with comet tails always pointing away from the Sun; let it sit (P55).

## 6. Misconception Engine

### MC-STEADY-CURRENT-RADIATES: "Any moving charge, including a steady current, radiates"
trigger_signal: student expects a steady direct current, or a charge moving at constant velocity, to emit electromagnetic waves.
conflict_evidence [P28]: "A torch's wires carry a steady current for hours. Does a radio next to them pick up a signal? Does the torch lose energy as radio waves?"
bridge_text [P30]: "No. A charge moving at constant velocity carries its field along unchanged — nothing ripples outward. Radiation needs a change in motion: when a charge accelerates, a kink forms in its field and travels away at c. That is why antennas use alternating currents, whose charges keep accelerating back and forth, and why braking electrons in an X-ray tube emit X-rays."
replacement_text [P31]: "Only accelerating charges radiate: oscillating, braking, or moving in a curve — not steady motion."
discrimination_pairs [P33]: ["steady DC in a straight wire: no radiation", "100 MHz alternating current in a dipole: strong radiation broadside"]
s6_path: skip P28; shake a rope — a steady pull sends no wave; a jerk sends one.

### MC-LIGHT-NO-MOMENTUM: "Light can't push anything because it has no mass"
trigger_signal: student denies radiation pressure on the grounds that photons are massless, equating momentum strictly with mv.
conflict_evidence [P28]: "Comet tails always point away from the Sun, whichever way the comet is moving. Something from the Sun is pushing the dust. And the Japanese probe IKAROS sailed using sunlight alone. How?"
bridge_text [P30]: "Light carries momentum p = E/c even though it has no mass — p = mv is the special case for slow massive things. When light is absorbed its momentum is transferred: pressure I/c. When it is reflected, its momentum reverses, so the surface receives twice as much: 2I/c. For sunlight that is only about 9 μPa on a mirror, but over a huge sail and months of travel it adds up."
replacement_text [P31]: "Electromagnetic radiation carries momentum p = E/c; radiation pressure is I/c (absorbed) or 2I/c (reflected)."
discrimination_pairs [P33]: ["black surface: 1361/c ≈ 4.5 μPa", "mirror: 2 × 1361/c ≈ 9.1 μPa"]
s6_path: skip P28; show comet-tail photographs.

## 7. Assessment Battery

| Probe | Item | Expected signal |
|---|---|---|
| P74 (classify) | "Which radiate?" | CORRECT = AC antenna and braking electron; not DC wire or charge at rest |
| P74 (classify) | "Mirror vs black sail" | CORRECT = mirror, ×2 |
| P75 (boundary) | "Circular motion at constant speed" | CORRECT = radiates (centripetal acceleration) |
| P76 (transfer) | "X-ray tube" | CORRECT = electrons decelerate sharply in the target (bremsstrahlung) |
| P77 (generate) | "50 MHz receiving antenna" | CORRECT = vertical half-wave dipole, 3 m long |
| P78 (explain) | "Factor 2 for a mirror" | CORRECT = reflected light's momentum reverses, doubling the change |
| P79 (predict) | "Black vs mirror sail" | CORRECT = mirror |

## 8. Mastery Gate (P91 expansion — canonical order P77→P76→P75→P74→P78)
P77: "Design a receiving antenna for a 50 MHz vertically polarised signal." → expected: CORRECT
P76: "Why do X-rays come out of an X-ray tube when electrons hit the target?" → expected: CORRECT
P75: "A charge moving in a circle at constant speed: does it radiate?" → expected: CORRECT
P74: "DC wire, AC antenna, electron at rest, electron braking — which radiate?" → expected: CORRECT
P78: "Why is radiation pressure on a mirror twice that on a black surface?" → expected: CORRECT

## 9. Retrieval Schedule (P89 expansion)
Interval 1 (1 day): "What makes charges radiate?"
Interval 2 (3 days): "Half-wave dipole for 300 MHz?"
Interval 3 (7 days): "Radiation pressure of 1000 W/m² on a mirror?"
Interval 4 (21 days): "Where does a dipole radiate least?"
Interval 5 (60 days): "Why do comet tails point away from the Sun?"

---
V-check status:
- V-1 all 10 KG fields present ✓ · V-2 objective has NOT-clause ✓ · V-3 DB 2–3 Qs, every branch → a state ✓ · V-4 every plausible state (S0,S1,S2,S3,S6) has a Protocol ✓ · V-5 every Protocol has success AND failure exit ✓ · V-6 every TA opens P01/P02 ✓ · V-7 every elicitation (P34/P35/P41) followed by P55 ✓ · V-8 no P08 without prior P06/P07 (TA-2) ✓ · V-9 Schema Repair entered only via P41 gate (TA-3, TA-5) ✓ · V-10 no P28 in S6 Protocol F ✓ · V-11 P91 terminal; P68 then P62 follow ✓ · V-12 no >3 consecutive C-category without E break ✓ · V-13 P54 before high-difficulty first-attempt (Protocol B TA-open) ✓ · V-14 assessment TA not first (TA-6/7) ✓ · V-15 Named Compounds (P90/P91) expanded ✓ · V-16 IC-1..20 pass ✓ · V-17 AIR invariants pass per TA ✓ · V-18 P90 (TA-6) before P91 (TA-7) ✓ · V-19 P91 has all 5 probes ✓ · V-20 P89 schedule authored with specific intervals ✓
status: READY
PACKAGE_READY
