# Teaching Blueprint: phys.mech.variation-of-g

## 0. Concept Profile
concept_id: phys.mech.variation-of-g
name: Variation of g and Weightlessness
domain: Mechanics (Physics)
difficulty: proficient (3)
bloom: apply
prerequisites: [phys.mech.gravitational-field]
mastery_threshold: 0.75
estimated_hours: 2
cross_links: []
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: P (g = GM/r² evaluated at three radii before any approximation; difficulty 3)
status: READY

## 1. Learning Objective

[Boundary statement]
A student who achieves mastery demonstrates:
1. Computes g above the surface from g_h = GM/(R + h)² = g (R/(R + h))², and uses g_h ≈ g(1 − 2h/R) for h ≪ R — e.g. at the space station's height, about 400 km, g is about 8.7 m/s², roughly 89 % of its surface value.
2. Explains why, for a uniform Earth, g falls linearly with depth, g_d = g(1 − d/R), reaching zero at the centre — only the mass inside the radius r pulls, and it grows as r³ while the distance factor goes as 1/r².
3. Explains apparent weightlessness as free fall: in an orbiting station, gravity still acts with about 89 % of its surface strength, but the station and everything in it fall together, so nothing presses on anything and a scale reads zero. Applies the same idea to a lift: apparent weight N = m(g + a) with a upward positive.

A student who says "there is no gravity in orbit" or "g gets stronger as you go deeper, because you are closer to the centre" has **NOT** achieved mastery — both block orbital motion, tides and the meaning of g as a field.

## 2. Student State Matrix

| State | Why here | Tell-tale behaviour | Protocol |
|---|---|---|---|
| S0 | g treated as a constant | Has never asked whether g changes | Protocol A (Concrete) |
| S1 | Formula without consequences | Writes GM/r² but cannot say what happens down a mine | Protocol B (Counterexample-first) |
| S2-NO-GRAVITY-IN-ORBIT | Weightless = gravity-free | "Astronauts float because there's no gravity up there" | Misconception Engine → then Protocol C |
| S2-G-RISES-WITH-DEPTH | Closer = stronger, everywhere | "g is largest at the Earth's centre" | Misconception Engine → then Protocol C |
| S3 | Partial — height fine, depth or lifts not | Correct g_h, wrong g_d | Protocol C (Guided Questioning) |
| S6 | Anxiety on powers and ratios | Avoids (R/(R + h))² | Protocol F (Low Pressure) |

## 3. Diagnostic Battery

DB-1 (prior-exposure check):
"Is g exactly 9.8 m/s² everywhere on and around the Earth?"
  "Yes" / no idea → S0. Enter Protocol A (Concrete).
  "No, it changes with height" → DB-2.

DB-2 (representation / misconception test):
"The space station orbits about 400 km up. Roughly how strong is gravity there compared with the surface, and why do astronauts float?"
  "About 90 % — they float because they and the station are falling together" → S3. Enter Protocol C.
  "A bit less" (no reason for floating) → S1. Enter Protocol B.
  "Zero / almost no gravity" → SIGNAL:MISCONCEPTION:MC-NO-GRAVITY-IN-ORBIT. Enter Misconception Engine.
  Pause → add S6 flag; Protocol F if anxious, otherwise Protocol A.

DB-3 (depth check — overlays):
"Going down a deep mine, does g increase, decrease or stay the same?"
  "Decrease (for a uniform Earth)" → no flag.
  "Increase — closer to the centre" → add SIGNAL:MISCONCEPTION:MC-G-RISES-WITH-DEPTH (repair at TA-4).
  Confident and wrong on DB-2 → add S7 flag. Override to Protocol G.

## 4. Prerequisite Check

PD-1 (for `phys.mech.gravitational-field`):
"What is the gravitational field strength at distance r from the centre of a planet of mass M?"
  Cannot give g = GM/r² → flag PREREQ-GAP-FIELD.
  In-session minimum repair: one P07 (field lines thinning with distance) + one P34 ("double r — what happens to g?") then resume. If the inverse-square field is absent, schedule a `phys.mech.gravitational-field` session (S4 route).

## 5. Protocol Library

### Protocol A — Concrete-First (primary)
Serves: S0
CPA entry: P
Entry condition: g treated as constant.
Success exit: computes g at a height and a depth and explains orbital weightlessness (P91 all 5 probes CORRECT).
Failure exit: on NO-GRAVITY-IN-ORBIT → Misconception Engine, resume at TA-5. On ratio anxiety → Protocol F.
Duration: ~55–65 min (may span 2 sessions; session_cap 7 TAs).

[TA-1: g Is a Field Value, Not a Constant]
P01
→ P04[content: "9.8 m/s² is the value at the surface. Move away from the surface and it changes — in a way you can predict."]
→ P07[modality: Earth with points at r = R, 1.06R (station), 2R]
→ P14[predict: "At twice the Earth's radius from the centre, what fraction of 9.8 is g?"] → P55
→ success_path[a quarter] → P49 → P05[curiosity: "What about the space station, only 400 km up?"]

[TA-2: Height]
P02
→ P13[think-aloud: "g_h = GM/(R + h)² = g × (R/(R + h))². With R = 6371 km and h = 400 km: (6371/6771)² ≈ 0.885, so g ≈ 8.7 m/s²."]
→ P08[notation: "g_h = g (R/(R + h))² ≈ g(1 − 2h/R) for h ≪ R"]
// GR-3 satisfied: P07 and P13 preceded P08 (V-8 PASS)
→ P34[question: "Using the approximation, at what height is g 1 % less than at the surface?"] → P55
→ success_path[2h/R = 0.01 → h ≈ 32 km] → P49
→ failure_path → P50 → P51[diagnose: dropped the factor 2] → P52[narrow: "(R + h)² — what does the square do to a small fraction?"] → re-elicit P34 → P55

[TA-3: Latitude and Rotation]
P02
→ P13[think-aloud: "The Earth spins. At the equator part of gravity's pull supplies the circular motion, and the equator is also further from the centre. Measured g is about 9.78 m/s² at the equator and 9.83 m/s² at the poles."]
→ P34[question: "Where would you weigh slightly less on a spring balance — the equator or a pole?"] → P55
→ success_path[equator] → P49

[TA-4: Depth]
P02
→ P17[contrast: "Halfway to the centre you are closer — but half the Earth's radius worth of rock is now ABOVE you, pulling outward. Which wins?"] → P55
→ P13[think-aloud: "For a uniform Earth, only the mass inside radius r pulls. That mass grows as r³; the distance factor goes as 1/r². Net: g ∝ r — g_d = g(1 − d/R), zero at the centre."]
→ P41[diagnostic: "At the Earth's centre, what is g?"] → P55
→ [if zero] → P49
→ [if maximum] → SIGNAL:MISCONCEPTION:MC-G-RISES-WITH-DEPTH → misconception_repair_chain[MC-G-RISES-WITH-DEPTH]

[TA-5: Weightless, Not Gravity-Free]
P02
→ P41[diagnostic: "At the station's height g is 8.7 m/s². Why does a scale inside read zero?"] → P55
→ [if free fall — station and astronaut accelerate together] → P49
→ [if "no gravity"] → SIGNAL:MISCONCEPTION:MC-NO-GRAVITY-IN-ORBIT → misconception_repair_chain[MC-NO-GRAVITY-IN-ORBIT]
→ P13[think-aloud: "A scale reads the normal force. In a lift accelerating upward, N = m(g + a); downward, N = m(g − a). In free fall a = g downward, so N = 0."]
→ P34[question: "A 60 kg person in a lift accelerating upward at 2 m/s². Scale reading?"] → P55
→ success_path[60 × 11.8 = 708 N] → P49

[TA-6: Formative Assessment]
P02
→ P90_expansion:
    P79[predict: "A lift cable snaps. What does the scale under the passenger read during the fall?"] → P55
    → P49 → P51[check: free-fall reasoning N = 0?]
    → P35[open: "Explain why astronauts float although gravity at their height is almost 90 % of yours."] → P55

[TA-7: Mastery Gate]
P02
→ P91_expansion:
    P77[generate: "Find the height above the surface where g is a quarter of 9.8 m/s²."] → P55 → CORRECT
    → P76[transfer: "A mine 64 km deep (uniform Earth, R = 6400 km). g at the bottom?"] → P55 → CORRECT
    → P75[boundary: "A lift moving DOWN at constant speed. Scale reading for 60 kg?"] → P55 → CORRECT
    → P74[classify: "g at the station's height: about 0, about 4.9, or about 8.7 m/s²?"] → P55 → CORRECT
    → P78[explain: "Why does g fall with depth even though you get closer to the centre?"] → P55 → CORRECT
→ P68 → P62[schedule: first retrieval in 1 day]

### Protocol B — Counterexample-First
Serves: S1
CPA entry: P
Entry condition: formula written, consequences absent.
Success exit: correct g at height and depth with reasons.
Failure exit: Misconception Engine, then Protocol C.
Key deltas from A: open with P02 → P41["Compute g at the station's height. Then explain why the astronauts float."] → P54 (novel) → P55; then TA-4 and TA-5.

### Protocol C — Guided Questioning
Serves: S3, S2 (post-repair)
CPA entry: P
Entry condition: height correct; depth or lifts not.
Success exit: all three situations.
Failure exit: escalate to Protocol A TA-2.
Key deltas: enter at TA-4 or TA-5; run the gate.

### Protocol F — Low Pressure (S6)
Serves: S6
CPA entry: P
Entry condition: S6 flag confirmed.
Success exit: one height ratio and the lift reading done calmly.
Failure exit: shorten, bank one success, reschedule.
Key deltas: NO P28 (V-10 / GR-5); use r = 2R and r = 3R first (quarters and ninths) before 400 km; P85 regulation_tail on every TA.

### Protocol G — Challenge-First (S7 override)
Serves: S7
CPA entry: P
Entry condition: confident "no gravity in orbit".
Success exit: revises after computing g at 400 km.
Failure exit: Misconception Engine.
Key deltas: open by computing g at 400 km (8.7 m/s²), then ask why the Moon, much further away, still orbits; let the mismatch sit (P55).

## 6. Misconception Engine

### MC-NO-GRAVITY-IN-ORBIT: "There is no gravity in orbit — that is why astronauts float"
trigger_signal: student explains floating astronauts by an absence or near-absence of gravity at orbital height.
conflict_evidence [P28]: "At 400 km up, g = 9.8 × (6371/6771)² ≈ 8.7 m/s² — almost 90 % of its surface value. And the Moon, about sixty times further from the Earth's centre than the station, is held in orbit by Earth's gravity. If there were no gravity at 400 km, what would the station do?"
bridge_text [P30]: "It would fly off in a straight line. Gravity is what keeps bending its path into a circle: the station is falling toward the Earth all the time, and so is everything inside it. Falling together, nothing presses on anything — a scale between your feet and the floor reads zero."
replacement_text [P31]: "Weightlessness in orbit is free fall, not the absence of gravity. Apparent weight is the normal force, N = m(g − a_down); in free fall a_down = g, so N = 0."
discrimination_pairs [P33]: ["astronaut in the station (gravity 8.7 m/s², apparent weight zero) vs astronaut in deep space far from any body (gravity ≈ 0)", "a lift in free fall (N = 0) vs a lift moving at constant speed (N = mg)"]
s6_path: skip P28; drop a plastic bottle with holes full of water — while it falls, the water stops pouring out.

### MC-G-RISES-WITH-DEPTH: "g increases as you go deeper, because you are closer to the centre"
trigger_signal: student applies GM/r² with the full Earth mass inside the Earth, predicting g largest at the centre.
conflict_evidence [P28]: "At the very centre, the whole Earth surrounds you equally in every direction. Which way would you be pulled?"
bridge_text [P30]: "Nowhere — the pulls cancel, so g = 0 at the centre. Inside a uniform Earth, the shell of rock above you pulls equally all round and cancels out; only the ball of mass below radius r pulls, and that shrinks as r³ while 1/r² grows. Net: g ∝ r."
replacement_text [P31]: "Above the surface g = GM/r² (falls as 1/r²). Inside a uniform Earth g = g_surface × r/R = g(1 − d/R) (falls linearly to zero). g is largest at the surface."
discrimination_pairs [P33]: ["g at height h (≈ g(1 − 2h/R)) vs g at depth d (g(1 − d/R)): a 32 km climb and a 64 km descent both lower g by 1 %", "outside the Earth: all the mass pulls vs inside: only the mass below you pulls"]
s6_path: skip P28; a graph of g against r — rising straight line inside, falling curve outside — drawn together.

## 7. Assessment Battery

| Probe | Item | Expected signal |
|---|---|---|
| P74 (classify) | "g at 400 km: ~0, ~4.9 or ~8.7 m/s²?" | CORRECT = ~8.7 m/s² |
| P74 (classify) | "Lift at constant speed, 60 kg: scale?" | CORRECT = 588 N (no acceleration) |
| P75 (boundary) | "g at the Earth's centre?" | CORRECT = 0 |
| P76 (transfer) | "64 km deep, R = 6400 km: g?" | CORRECT = 9.8 × 0.99 ≈ 9.70 m/s² |
| P77 (generate) | "Height where g is a quarter of surface g?" | CORRECT = h = R (r = 2R) |
| P78 (explain) | "Why does g fall with depth?" | CORRECT = only the mass below pulls; it shrinks as r³ |
| P79 (predict) | "Cable snaps: scale reading?" | CORRECT = zero (free fall) |

## 8. Mastery Gate (P91 expansion — canonical order P77→P76→P75→P74→P78)
P77: "Find the height above the surface where g is a quarter of 9.8 m/s²." → expected: CORRECT
P76: "A mine 64 km deep (uniform Earth, R = 6400 km). g at the bottom?" → expected: CORRECT
P75: "A lift moving DOWN at constant speed. Scale reading for 60 kg?" → expected: CORRECT
P74: "g at the station's height: about 0, about 4.9, or about 8.7 m/s²?" → expected: CORRECT
P78: "Why does g fall with depth even though you get closer to the centre?" → expected: CORRECT

## 9. Retrieval Schedule (P89 expansion)
Interval 1 (1 day): "g at r = 3R?"
Interval 2 (3 days): "Why do astronauts float?"
Interval 3 (7 days): "Scale reading for 50 kg in a lift accelerating downward at 1.8 m/s²?"
Interval 4 (21 days): "Sketch g against distance from the Earth's centre, inside and outside."
Interval 5 (60 days): "Why does a spring balance read slightly less at the equator than at the poles?"

---
V-check status:
- V-1 all 10 KG fields present ✓ · V-2 objective has NOT-clause ✓ · V-3 DB 2–3 Qs, every branch → a state ✓ · V-4 every plausible state (S0,S1,S2,S3,S6) has a Protocol ✓ · V-5 every Protocol has success AND failure exit ✓ · V-6 every TA opens P01/P02 ✓ · V-7 every elicitation (P34/P35/P41) followed by P55 ✓ · V-8 no P08 without prior P06/P07 (TA-2) ✓ · V-9 Schema Repair entered only via P41 gate (TA-4, TA-5) ✓ · V-10 no P28 in S6 Protocol F ✓ · V-11 P91 terminal; P68 then P62 follow ✓ · V-12 no >3 consecutive C-category without E break ✓ · V-13 P54 before high-difficulty first-attempt (Protocol B TA-open) ✓ · V-14 assessment TA not first (TA-6/7) ✓ · V-15 Named Compounds (P90/P91) expanded ✓ · V-16 IC-1..20 pass ✓ · V-17 AIR invariants pass per TA ✓ · V-18 P90 (TA-6) before P91 (TA-7) ✓ · V-19 P91 has all 5 probes ✓ · V-20 P89 schedule authored with specific intervals ✓
status: READY
PACKAGE_READY
