# Teaching Blueprint: phys.mech.mass-and-weight

## 0. Concept Profile
concept_id: phys.mech.mass-and-weight
name: Mass, Weight and Free Fall
domain: Mechanics (Physics)
difficulty: foundational (1)
bloom: understand
prerequisites: [phys.mech.force]
mastery_threshold: 0.7
estimated_hours: 2
cross_links: []
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (the same bag weighed on a spring balance on Earth and on the Moon before W = mg; difficulty ≤ 2)
status: READY

## 1. Learning Objective

[Boundary statement]
A student who achieves mastery demonstrates:
1. Distinguishes mass (amount of matter, in kg, the same everywhere) from weight (the gravitational force on a body, in newtons, which depends on where it is).
2. Computes weight with W = mg, where g is the gravitational field strength (about 9.8 N/kg on Earth, about 1.6 N/kg on the Moon): a 60 kg person weighs about 590 N on Earth and about 97 N on the Moon, and still has a mass of 60 kg on both.
3. States and explains that, without air resistance, all bodies fall with the same acceleration g (9.8 m/s² near Earth) whatever their mass — and that air resistance, not mass, is why a feather falls slowly in air.

A student who can compute W = mg but says "a 10 kg stone falls faster than a 1 kg stone in a vacuum", or "on the Moon your mass is less", has **NOT** achieved mastery — mass/weight confusion and heavier-falls-faster both break Newton's second law, projectile motion and gravitation downstream.

## 2. Student State Matrix

| State | Why here | Tell-tale behaviour | Protocol |
|---|---|---|---|
| S0 | No distinction made | Uses "weight" for kilograms; has never met newtons as weight | Protocol A (Concrete) |
| S1 | Formula without meaning | Computes mg but cannot say what changes on the Moon | Protocol B (Counterexample-first) |
| S2-HEAVIER-FALLS-FASTER | Aristotelian fall | Says the heavier ball lands first with no air | Misconception Engine → then Protocol C |
| S2-MASS-IS-WEIGHT | Mass and weight the same | "Your mass is less on the Moon"; weight in kg | Misconception Engine → then Protocol C |
| S3 | Partial — mass/weight fine, free fall not (or reverse) | Correct W = mg, wrong on falling | Protocol C (Guided Questioning) |
| S6 | Anxiety | Freezes on "newtons" | Protocol F (Low Pressure) |

## 3. Diagnostic Battery

DB-1 (prior-exposure check):
"Have you heard that mass and weight are different things in physics?"
  No → S0. Enter Protocol A (Concrete).
  Yes → DB-2.

DB-2 (representation / misconception test):
"An astronaut has a mass of 60 kg on Earth. What is her mass on the Moon, and is her weight the same there?"
  "60 kg; weight is less because the Moon's gravity is weaker" → S3. Enter Protocol C.
  "60 kg" (no reason about weight) → S1. Enter Protocol B.
  "Less than 60 kg" / "about 10 kg" → SIGNAL:MISCONCEPTION:MC-MASS-IS-WEIGHT. Enter Misconception Engine.
  Pause / "I don't know" → add S6 flag. Ask: "Is it OK if we start with a bag of rice and a scale?"
      → S6 (if anxious) Protocol F; otherwise S0 Protocol A.

DB-3 (free-fall check — overlays):
"A 10 kg ball and a 1 kg ball are dropped together where there is no air. Which lands first?"
  "Together" → no flag.
  "The 10 kg ball" → add SIGNAL:MISCONCEPTION:MC-HEAVIER-FALLS-FASTER (run its repair at TA-5).
  Confidence 4–5 with a wrong answer → add S7 flag. Override to Protocol G (challenge-first).

## 4. Prerequisite Check

PD-1 (for `phys.mech.force`):
"What is a force, and what unit is it measured in?"
  Cannot say "a push or pull, in newtons" → flag PREREQ-GAP-FORCE.
  In-session minimum repair: one P06 (push a trolley, pull a spring balance) + one P34 ("is the pull of the Earth on you a force?") then resume. If the learner has no notion of force as an interaction, schedule a `phys.mech.force` session (S4 route).

## 5. Protocol Library

### Protocol A — Concrete-First (primary)
Serves: S0
CPA entry: C
Entry condition: no distinction made (DB-1 = No).
Success exit: separates mass and weight, computes W = mg on two worlds, and predicts free fall correctly (P91 all 5 probes CORRECT).
Failure exit: on MASS-IS-WEIGHT → Misconception Engine[MC-MASS-IS-WEIGHT], resume at TA-3. On anxiety → Protocol F.
Duration: ~50–60 min (may span 2 sessions; session_cap 7 TAs).

[TA-1: The Bag on Two Worlds]
P01
→ P04[content: "You can be lighter on the Moon without losing any of yourself. Let's see how."]
→ P06[content: a 5 kg bag of rice hung on a spring balance on Earth — the spring stretches a lot; on the Moon the same bag stretches it far less]
→ P14[predict: "On the Moon, is there less rice in the bag?"] → P55
→ success_path[no] → P49 → P05[curiosity: "So what did the spring measure, if not the amount of rice?"]

[TA-2: Mass and Weight]
P02
→ P13[think-aloud: "The amount of rice — its mass — is 5 kg everywhere. What changed is how hard gravity pulls on it. That pull is its weight, a force, in newtons."]
→ P06[content: a beam balance comparing the bag with 5 kg of standard masses — it balances on Earth and on the Moon]
→ P16[compare: "The spring balance changed on the Moon; the beam balance did not. Which one measures mass?"] → P55
→ success_path → P49

[TA-3: W = mg]
P02
→ P13[think-aloud: "On Earth, gravity pulls about 9.8 newtons on every kilogram. That number is the gravitational field strength, g = 9.8 N/kg."]
→ P08[notation: "weight W = m g ; W in N, m in kg, g in N/kg (Earth 9.8, Moon 1.6)"]
// GR-3 satisfied: P06 and P13 preceded P08 (V-8 PASS)
→ P34[question: "A 60 kg person: weight on Earth? On the Moon? Mass on each?"] → P55
→ success_path[≈590 N, ≈97 N, 60 kg both] → P49
→ failure_path → P50 → P51[diagnose: changed the mass (→MC) or arithmetic?] → P52[narrow: "Did any of the person go missing on the Moon?"] → re-elicit P34 → P55

[TA-4: Weightless, Not Massless]
P02
→ P41[diagnostic: "Far out in deep space, a 60 kg astronaut feels no weight. Is she still hard to push into motion?"] → P55
→ [if yes — mass still resists changes in motion] → P49
→ [if no / "she has no mass"] → SIGNAL:MISCONCEPTION:MC-MASS-IS-WEIGHT → misconception_repair_chain[MC-MASS-IS-WEIGHT]

[TA-5: Free Fall]
P02
→ P14[predict: "Drop a hammer and a feather on the Moon, where there is no air. Which lands first?"] → P55
→ P06[content: the hammer-and-feather drop filmed on the Moon — they land together]
→ P13[think-aloud: "The heavier hammer is pulled harder, but it is also harder to speed up by exactly the same factor. The two effects cancel: every body falls with the same acceleration, g = 9.8 m/s² near Earth."]
→ P17[contrast: "Then why does a feather float down slowly here on Earth?"] → P55
→ success_path[air resistance] → P49

[TA-6: Formative Assessment]
P02
→ P90_expansion:
    P79[predict: "A bowling ball and a tennis ball dropped from 2 m — which lands first in a room? In a vacuum?"] → P55
    → P49 → P51[check: separated the vacuum answer (together) from the air answer (almost together)?]
    → P35[open: "Explain why g appears with two units: N/kg and m/s²."] → P55

[TA-7: Mastery Gate]
P02
→ P91_expansion:
    P77[generate: "Invent a planet where a 50 kg student weighs 250 N. What is g there?"] → P55 → CORRECT
    → P76[transfer: "On Mars g ≈ 3.7 N/kg. A rover has mass 900 kg. Its weight on Mars? Its mass?"] → P55 → CORRECT
    → P75[boundary: "A feather and a coin in a vacuum tube on Earth. Which lands first?"] → P55 → CORRECT
    → P74[classify: "Bathroom scale reading, '60 kg' — is it measuring mass or weight, strictly?"] → P55 → CORRECT
    → P78[explain: "Why does a heavier object not fall faster when there is no air?"] → P55 → CORRECT
→ P68 → P62[schedule: first retrieval in 1 day]

### Protocol B — Counterexample-First
Serves: S1
CPA entry: P
Entry condition: computes mg, cannot say what changes on the Moon.
Success exit: states mass unchanged, weight changed, with numbers.
Failure exit: MASS-IS-WEIGHT → Misconception Engine, then Protocol C.
Key deltas from A: open with P02 → P41["A 60 kg astronaut on the Moon steps on a scale that reads in newtons. What does it read, and what is her mass?"] → P54 (novel) → P55; then TA-2 onward.

### Protocol C — Guided Questioning
Serves: S3, S2 (post-repair)
CPA entry: P
Entry condition: one part correct (mass/weight or free fall).
Success exit: both parts correct.
Failure exit: escalate to Protocol A TA-2.
Key deltas: enter at the missing part (TA-3 or TA-5), then the P90/P91 gate.

### Protocol F — Low Pressure (S6)
Serves: S6
CPA entry: C
Entry condition: S6 flag confirmed.
Success exit: one weight computed calmly and the free-fall prediction made.
Failure exit: shorten, bank one success, reschedule.
Key deltas: NO P28 (V-10 / GR-5); use g = 10 N/kg for arithmetic first; P85 regulation_tail on every TA.

### Protocol G — Challenge-First (S7 override)
Serves: S7 (overconfident + HEAVIER-FALLS-FASTER)
CPA entry: P
Entry condition: DB-3 confident and wrong.
Success exit: revises the prediction after the hammer-and-feather evidence.
Failure exit: Misconception Engine[MC-HEAVIER-FALLS-FASTER].
Key deltas: open with TA-5's prediction, show the Moon drop, let the mismatch sit (P55).

## 6. Misconception Engine

### MC-MASS-IS-WEIGHT: "Mass and weight are the same thing"
trigger_signal: student says mass changes on the Moon, gives weight in kilograms as the physics answer, or says an astronaut in orbit "has no mass".
conflict_evidence [P28]: "On the Moon, the 5 kg bag still balances 5 kg of standard masses on a beam balance. If its mass had dropped, the beam would tip. What does that tell you?"
bridge_text [P30]: "Mass is the amount of matter — it does not depend on where you are. Weight is how hard gravity pulls on that matter, so it depends on g."
replacement_text [P31]: "Mass in kg, the same everywhere. Weight W = mg in newtons, different on different worlds."
discrimination_pairs [P33]: ["60 kg on Earth and 60 kg on the Moon (mass) vs 590 N and 97 N (weight)", "beam balance (compares masses, same reading on the Moon) vs spring balance (measures the pull, less on the Moon)"]
s6_path: skip P28; show both balances side by side on the two worlds as a shared observation.

### MC-HEAVIER-FALLS-FASTER: "Heavier objects fall faster"
trigger_signal: student predicts the heavier object lands first when there is no air, or says g is bigger for heavier bodies.
conflict_evidence [P28]: "On the Moon there is no air. A hammer and a feather were dropped together there. If heavier fell faster, the hammer would land first. They landed together. What does that tell you?"
bridge_text [P30]: "The heavier body is pulled harder, but it is harder to speed up by exactly the same factor. Ten times the mass means ten times the pull and ten times the resistance to speeding up — the same acceleration."
replacement_text [P31]: "Without air resistance, every body falls with the same acceleration g, about 9.8 m/s² near Earth. In air, a light spread-out object like a feather falls slower because air resistance matters more for it."
discrimination_pairs [P33]: ["hammer and feather in a vacuum (land together) vs in air (feather drifts)", "a crumpled sheet of paper vs a flat sheet (same mass, different air resistance)"]
s6_path: skip P28; drop a book with a sheet of paper resting on top of it — they fall together, a home demonstration with no confrontation.

## 7. Assessment Battery

| Probe | Item | Expected signal |
|---|---|---|
| P74 (classify) | "A bathroom scale reads '60 kg' — strictly, mass or weight?" | CORRECT = it measures the force (weight) and divides by Earth's g to display kg |
| P74 (classify) | "Unit of weight?" | CORRECT = newton |
| P75 (boundary) | "Feather and coin in a vacuum tube?" | CORRECT = land together |
| P76 (transfer) | "900 kg rover on Mars, g ≈ 3.7 N/kg?" | CORRECT = ≈3330 N; mass 900 kg |
| P77 (generate) | "Planet where 50 kg weighs 250 N — g?" | CORRECT = 5 N/kg |
| P78 (explain) | "Why does a heavier object not fall faster without air?" | CORRECT = bigger pull, but proportionally harder to accelerate |
| P79 (predict) | "Bowling ball and tennis ball from 2 m in a room?" | CORRECT = almost together; in a vacuum exactly together |

## 8. Mastery Gate (P91 expansion — canonical order P77→P76→P75→P74→P78)
P77: "Invent a planet where a 50 kg student weighs 250 N. What is g there?" → expected: CORRECT
P76: "On Mars g ≈ 3.7 N/kg. A rover has mass 900 kg. Its weight on Mars? Its mass?" → expected: CORRECT
P75: "A feather and a coin in a vacuum tube on Earth. Which lands first?" → expected: CORRECT
P74: "Bathroom scale reading '60 kg' — is it measuring mass or weight, strictly?" → expected: CORRECT
P78: "Why does a heavier object not fall faster when there is no air?" → expected: CORRECT

## 9. Retrieval Schedule (P89 expansion)
Interval 1 (1 day): "Weight of a 2 kg bag on Earth? On the Moon?"
Interval 2 (3 days): "Which balance would read the same on the Moon — beam or spring?"
Interval 3 (7 days): "Why does a parachutist fall slower than a stone, if g is the same for both?"
Interval 4 (21 days): "An astronaut floating in the space station — weightless, or massless? Explain."
Interval 5 (60 days): "On a planet with g = 20 N/kg, what would a 45 kg student weigh, and would she fall faster than on Earth?"

---
V-check status:
- V-1 all 10 KG fields present ✓ · V-2 objective has NOT-clause ✓ · V-3 DB 2–3 Qs, every branch → a state ✓ · V-4 every plausible state (S0,S1,S2,S3,S6) has a Protocol ✓ · V-5 every Protocol has success AND failure exit ✓ · V-6 every TA opens P01/P02 ✓ · V-7 every elicitation (P34/P35/P41) followed by P55 ✓ · V-8 no P08 without prior P06/P07 (TA-3) ✓ · V-9 Schema Repair entered only via P41 gate (TA-4) ✓ · V-10 no P28 in S6 Protocol F ✓ · V-11 P91 terminal; P68 then P62 follow ✓ · V-12 no >3 consecutive C-category without E break ✓ · V-13 P54 before high-difficulty first-attempt (Protocol B TA-open) ✓ · V-14 assessment TA not first (TA-6/7) ✓ · V-15 Named Compounds (P90/P91) expanded ✓ · V-16 IC-1..20 pass ✓ · V-17 AIR invariants pass per TA ✓ · V-18 P90 (TA-6) before P91 (TA-7) ✓ · V-19 P91 has all 5 probes ✓ · V-20 P89 schedule authored with specific intervals ✓
status: READY
PACKAGE_READY
