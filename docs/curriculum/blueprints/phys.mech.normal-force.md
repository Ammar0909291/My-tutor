# Teaching Blueprint: phys.mech.normal-force

## 0. Concept Profile

concept_id: phys.mech.normal-force
name: Normal Force
domain: Classical Mechanics (Physics)
difficulty: developing (3)
bloom: apply
prerequisites: [phys.mech.free-body-diagram]
mastery_threshold: 0.80
estimated_hours: 3
cross_links: []
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (pressing hand on a table to feel the surface push back before introducing N; difficulty 3 → C with accelerated P track)
status: READY

## 1. Learning Objective

[Boundary statement]
A student who achieves mastery demonstrates:
1. Identifies the normal force on a free-body diagram as the **perpendicular-to-surface** contact force exerted by the surface on the object — never parallel, never necessarily vertical.
2. Calculates N by applying the **perpendicular-to-surface equilibrium equation** from the free-body diagram — so N = mg cosθ on an incline, and N ≠ mg when a vertical applied-force component or acceleration is present.
3. Predicts how N changes when weight, acceleration, or an applied-force vertical component changes — including N = 0 as the **lift-off condition** (the object leaves the surface).

A student who automatically sets N = mg for every problem, or who calls the normal force "the reaction to gravity" (conflating Third-Law pairs — the reaction to gravity is the body pulling Earth), has **NOT** achieved mastery — the N = mg default corrupts every incline, elevator, and circular-motion problem downstream.

## 2. Student State Matrix

| State | Why here | Tell-tale behaviour | Protocol |
|---|---|---|---|
| S0 | Never formally identified the normal force | Cannot name what a surface exerts on a resting object | Protocol A (Concrete) |
| S1 | "Normal means straight up" schema | Always draws N upward regardless of surface orientation | Protocol B (Counterexample-first) |
| S2-NORMAL-EQUALS-WEIGHT | Treats N = mg as a universal rule | Sets N = mg on inclines and in elevators | Misconception Engine → Protocol C |
| S2-NORMAL-IS-REACTION | Calls N the Third-Law reaction to weight | Confuses a same-surface balance with an action-reaction pair | Misconception Engine → Protocol C |
| S3 | Correct direction; wrong magnitude in incline or elevator | Draws N perpendicular but miscalculates on a slope | Protocol C (Guided Questioning) |
| S6 | Anxiety at perpendicular-to-incline direction and N < mg | Freezes at N = mg cosθ | Protocol F (Low Pressure) |

## 3. Diagnostic Battery

DB-1 (prior-exposure check):
"A book rests on a slope. What force does the slope exert on the book, and in which direction?"
  "Perpendicular to the slope, away from the surface" → S3. Enter Protocol C.
  "Straight up — the normal force is always upward" → S1. Enter Protocol B.
  "I don't know / I don't know what normal force means" → DB-2.

DB-2 (misconception probe):
"A 5 kg book sits on a flat table. What is the normal force on it? Now put it on a 30° incline — what is N now? (g = 10)"
  "Flat: N = 50 N; incline: N = mg cos30° ≈ 43.3 N (less than weight)" → S3. Enter Protocol C.
  "Both 50 N — it's just the weight both times" → SIGNAL:MISCONCEPTION:MC-NORMAL-EQUALS-WEIGHT. Enter Misconception Engine.
  Pause / cannot compute → S0. Enter Protocol A.
  Distress → add S6 flag → confidence question → route (No→S6/F, Yes→S0/A).

DB-3 (confidence calibration):
"How confident are you with normal force — 1 to 5?"
  1–2 → add S6 flag; apply S6 adaptations.
  4–5 + DB-2 wrong → add S7 flag; override to Protocol G (challenge-first).

## 4. Prerequisite Check

PD-1 (for `phys.mech.free-body-diagram`):
"On a free-body diagram of a box on a flat surface, which forces act on the box and in which directions?"
  Cannot identify weight down + normal up → flag PREREQ-GAP-FBD.
  In-session minimum repair: one P06 anchor (draw box, weight down, N perpendicular to surface) — then resume. Deep gap → schedule `phys.mech.free-body-diagram` (S4 route).

## 5. Protocol Library

### Protocol A — Concrete-First (primary)
Serves: S0
CPA entry: C → P → A
Entry condition: cannot name the normal force or its direction (DB-1 = no concept, DB-2 = cannot engage).
Success exit: identifies N perpendicular to the surface AND calculates N correctly on a flat surface, on an incline, and in an elevator (P91 all 5 CORRECT).
Failure exit: on NORMAL-EQUALS-WEIGHT / NORMAL-IS-REACTION signal → Misconception Engine, then resume TA-4. On incline-direction collapse → Protocol F.
Duration: ~50–60 min.

[TA-1: The Surface Pushes Back]
P01
→ P04[content: "Every surface you rest on pushes back on you — perpendicular to itself. It can only push, never pull. That push is the normal force."]
→ P06[content: press a hand flat on the desk — feel the desk push back perpendicular to its surface; now press the hand on a tilted book cover — feel the push now points diagonally, still perpendicular to the cover, not straight up]
→ P34[question: "When your hand presses on the tilted cover, which way does the cover push back on your hand?"] → P55
→ success_path → P49 → P05[curiosity: "So if the surface is tilted, the normal force is tilted too — what happens to its magnitude compared to your weight?"]

[TA-2: Always Perpendicular — Finding N from the Diagram]
P02
→ P07[modality: three diagrams side by side — (a) flat floor: N upward, weight down; (b) 30° incline: N perpendicular to slope, weight down, N = mg cos30°; (c) ceiling contact: N downward (surface pushes object away from ceiling) — each with the perpendicular marked]
→ P13[think-aloud: "Step 1: draw the surface. Step 2: draw N perpendicular to that surface, pointing away from it. Step 3: resolve the equilibrium perpendicular to the surface — whatever balances the weight component in that direction gives N. On a flat floor: N = mg. On a 30° slope: N = mg cos30°."]
→ P08[notation: "N = mg (flat, no other vertical force) ; N = mg cosθ (incline angle θ) ; N = ΣF_perp to surface"]
// GR-3 satisfied: P06/P07 preceded P08 (V-8 PASS)
→ P34[question: "A 4 kg block is on a 40° incline (g = 10). Find the normal force."] → P55
→ success_path → P49
→ failure_path → P50 → P52[narrow: "N = mg cosθ = 40 × cos40° = 40 × 0.766 ≈ 30.6 N. It's less than the weight because the surface only supports the perpendicular component."] → re-elicit → P55

[TA-3: When N Changes — Elevator and Applied Force]
P02
→ P06[content: a person standing in an elevator — three cases: (a) at rest: N = mg; (b) accelerating upward: N = m(g + a) > mg; (c) accelerating downward: N = m(g − a) < mg; feel this in a fast lift]
→ P13[think-aloud: "Apply Newton's Second Law in the vertical direction: N − mg = ma → N = m(g + a). When the lift accelerates upward, you feel heavier because N is larger. When it drops, N decreases — you feel lighter. At a = g the floor pushes nothing, N = 0: free fall."]
→ P34[question: "A 70 kg person stands in an elevator accelerating upward at 2 m/s². Find N. (g = 10)"] → P55
→ success_path → P49
→ failure_path → P50 → P52[narrow: "ΣF_up = N − mg = ma → N = m(g + a) = 70 × 12 = 840 N. Greater than the 700 N weight — that's the 'heavier' feeling."] → re-elicit → P55

[TA-4: Misconception Probe — N ≠ mg on an Incline]
P02
→ P54 // N = mg cosθ < mg on an incline is the load-bearing result students persistently resist
→ P41[diagnostic: "A 3 kg block rests motionless on a 50° incline. A student sets N = mg = 30 N. Is that right? What is N actually?"] → P55
→ [if "no — N = mg cos50° = 30 × 0.643 ≈ 19.3 N; the surface only supports the perpendicular component of weight"] → P49 → P36[probe: "Why is N less than the weight here?"] → P55
→ [if "yes, N = 30 N"] → SIGNAL:MISCONCEPTION:MC-NORMAL-EQUALS-WEIGHT → misconception_repair_chain[MC-NORMAL-EQUALS-WEIGHT]

[TA-5: Formative Assessment]
P02
→ P90_expansion:
    P79[predict: "A 60 kg skier is on a very steep 80° slope (g = 10). Before calculating — is the normal force larger or smaller than 600 N?"] → P55
    → P49 → P51[check: did they recognise N = mg cos80° ≈ 104 N ≪ 600 N, or default to N = mg?]
    → P35[open: "Explain when N = mg is valid, and give two situations where it fails."] → P55

[TA-6: Mastery Gate]
P02
→ P91_expansion:
    P77[generate: "Describe a situation where N > mg — explain why and calculate N."] → P55 → CORRECT
    → P76[transfer: "A 60 kg person in an elevator decelerating at 3 m/s² (was moving upward). Find N. (g = 10)"] → P55 → CORRECT
    → P75[boundary: "What does N = 0 mean physically? Under what condition does it occur?"] → P55 → CORRECT
    → P74[classify: "On a 25° incline, does N point vertically upward or perpendicular to the slope?"] → P55 → CORRECT
    → P78[explain: "In your own words: why is N not always equal to mg, and how do you find it?"] → P55 → CORRECT
→ P68 → P62[schedule: first retrieval in 2 days]

### Protocol B — Counterexample-First
Serves: S1 ("normal means straight up")
CPA entry: P
Entry condition: always draws N upward regardless of surface orientation.
Success exit: correctly draws N perpendicular to an inclined surface and calculates N = mg cosθ.
Failure exit: if triggers NORMAL-EQUALS-WEIGHT → Misconception Engine → Protocol C.
Key deltas: open P02 → P41["A book rests on a 45° slope. Draw the normal force. Does it point straight up, or perpendicular to the slope?"] → P54 → P55; on stall run P17 (vertical vs. perpendicular to surface) and P21; converge on TA-3 onward.

### Protocol C — Guided Questioning
Serves: S3 (partial), S2 (post-repair)
CPA entry: P
Entry condition: draws N in the right direction; gets magnitude wrong on a slope or in an elevator.
Success exit: correctly computes N = mg cosθ on an incline and N = m(g ± a) in an elevator.
Failure exit: escalate to Protocol A TA-2 (rebuild with the three-diagram perpendicular display).
Key deltas: enter at TA-3; P36/P51 probes on "which axis equation gives N?"; run P90/P91.

### Protocol D — Prerequisite Repair (S4)
Serves: S4; entry PREREQ-GAP-FBD; success = free-body force identification re-established → return to Protocol A TA-1; failure = schedule `phys.mech.free-body-diagram`, suspend.

### Protocol F — Low Pressure (S6)
Serves: S6
CPA entry: C
Success exit: correctly computes N on a flat surface using ΣF = 0, calmly.
Failure exit: shorten, bank a win, reschedule.
Key deltas: NO P28 (V-10/GR-5); conflict replaced by P30 bridge; keep the three-diagram display (P07) visible; P85 regulation_tail per TA; defer incline and elevator until the student is settled.

### Protocol G — Challenge-First (S7 override)
Serves: S7; entry DB-3 4–5 with wrong DB-2; success = student revises N = mg default after the incline contradiction; failure = Misconception Engine[MC-NORMAL-EQUALS-WEIGHT].
Key deltas: open with the incline case that their rule mishandles; let it sit (P55); P17 contrast; no premature confirmation.

## 6. Misconception Engine

### MC-NORMAL-EQUALS-WEIGHT: "The normal force always equals the weight"
trigger_signal: student sets N = mg on an incline, or ignores the effect of vertical acceleration or applied forces.
conflict_evidence [P28]: "On a 50° incline the block is stationary. You said N = mg. But apply Newton's Second Law perpendicular to the slope: N − mg cos50° = 0, so N = mg cos50° = 0.643 mg — noticeably less than mg. If N really equalled mg, there would be a large net force driving the block INTO the slope with nothing to stop it. The block would accelerate into the slope — which doesn't happen."
bridge_text [P30]: "N equals mg only on a flat horizontal surface with no other vertical forces. In every other case, find N by resolving forces perpendicular to the surface and setting that sum to match the perpendicular acceleration (zero if not accelerating in that direction)."
replacement_text [P31]: "N = ΣF_perp / resolve from the diagram. Never assume N = mg; derive it each time."
discrimination_pairs [P33]: ["flat floor, no extras: N = mg ✓", "30° incline: N = mg cos30° < mg ✓", "elevator accelerating up: N = m(g+a) > mg ✓", "incline, setting N = mg: ✗"]
s6_path: skip P28; tilt a book at 45° with a small toy on it and ask "is the toy pressing the book as hard as it presses a flat desk?" as a shared felt observation, then P30.

### MC-NORMAL-IS-REACTION: "The normal force is the Third-Law reaction to the weight"
trigger_signal: student says N is the reaction to gravity / the reaction to the body's weight.
conflict_evidence [P28]: "If N were the reaction to the weight (Earth pulling body down), they'd always be equal and opposite — but we just showed N ≠ mg on a slope. The Third-Law reaction to 'Earth pulls body down' is 'body pulls Earth up' — that acts on the EARTH. The normal force acts on the BODY and comes from the SURFACE. It's a different interaction entirely."
bridge_text [P30]: "N is the contact force from the surface on the body — part of the surface-body interaction. Its Third-Law partner is the body's push on the surface. Weight is the gravity interaction between Earth and body — a completely separate interaction. They happen to balance on a flat floor (Second Law / equilibrium), but they are not a Third-Law pair."
replacement_text [P31]: "Normal force ↔ body's push on surface (Third-Law pair, surface-body interaction). Weight ↔ body pulls Earth upward (Third-Law pair, gravitational interaction). Four forces, two interactions, none of them a pair with each other."
discrimination_pairs [P33]: ["N on body (up) ↔ body presses surface (down): TRUE Third-Law pair ✓", "Weight on body (down) ↔ body pulls Earth (up): TRUE Third-Law pair ✓", "Weight (down) and N (up) both on body: same-object balance, NOT a pair ✗"]
s6_path: skip P28; sort the four forces into two separate interactions as a gentle two-pile activity, then P30.

## 7. Assessment Battery

| Probe | Item | Expected signal |
|---|---|---|
| P74 (classify) | "On a 25° incline, N points: (a) straight up or (b) perpendicular to the slope?" | CORRECT = perpendicular to slope |
| P74 (classify) | "Is N the Third-Law reaction to the weight?" | CORRECT = no; N pairs with the body's push on the surface |
| P75 (boundary) | "What does N = 0 mean physically, and when does it happen?" | CORRECT = object lifts off / loses contact; when support is removed or a = g downward |
| P76 (transfer) | "60 kg person in elevator decelerating at 3 m/s² (was moving up). Find N. (g = 10)" | CORRECT = N = m(g − a) = 420 N |
| P77 (generate) | "Describe a situation where N > mg — explain and calculate." | CORRECT = elevator accelerating upward or push downward at angle |
| P78 (explain) | "Why is N not always equal to mg? How do you find it correctly?" | CORRECT = resolve forces perpendicular to surface; N = mg only on flat floor with no extras |
| P79 (predict) | "60 kg skier on 80° slope (g = 10) — is N larger or smaller than 600 N?" | CORRECT = smaller; N = mg cos80° ≈ 104 N |

## 8. Mastery Gate (P91 expansion — canonical order P77→P76→P75→P74→P78)
P77: "Describe a situation where N > mg — explain why and calculate N." → expected: CORRECT
P76: "A 60 kg person in an elevator decelerating at 3 m/s² (was moving upward). Find N. (g = 10)" → expected: CORRECT
P75: "What does N = 0 mean physically, and under what condition does it occur?" → expected: CORRECT
P74: "On a 25° incline, does N point vertically upward or perpendicular to the slope?" → expected: CORRECT
P78: "In your own words: why is N not always equal to mg, and how do you find it?" → expected: CORRECT

## 9. Retrieval Schedule (P89 expansion)
Interval 1 (2 days): "A 6 kg box sits on a 35° incline (g = 10). Find the normal force."
Interval 2 (5 days): "An 80 kg person stands in an elevator accelerating downward at 4 m/s² (g = 10). Find N. Is it more or less than the person's weight?"
Interval 3 (10 days): "A 2 kg block is on a flat table. You push down on it with an extra 5 N. Find the new normal force (g = 10)."
Interval 4 (21 days): "Explain: why does a car feel heavier going over a dip in the road and lighter going over a hill?"
Interval 5 (60 days): "Explain to a classmate why astronauts are 'weightless' in orbit, and what N = 0 actually means."

---
V-check status:
- V-1 all 10 KG fields ✓ · V-2 NOT-clause ✓ · V-3 DB 2–3 Qs, every branch → state ✓ · V-4 every plausible state (S0,S1,S2,S3,S6[,S4 via PD-1]) has a Protocol ✓ · V-5 every Protocol success+failure exit ✓ · V-6 every TA opens P01/P02 ✓ · V-7 elicitations followed by P55 ✓ · V-8 no P08 without prior P06/P07 (TA-2) ✓ · V-9 Schema Repair via P41 gate (TA-4) ✓ · V-10 no P28 in S6 Protocol F ✓ · V-11 P91 terminal; P68→P62 ✓ · V-12 no >3 consecutive C without E break ✓ · V-13 P54 before high-difficulty first-attempt (TA-4, Protocol B) ✓ · V-14 assessment not first (TA-5/6) ✓ · V-15 Named Compounds expanded ✓ · V-16 IC-1..20 ✓ · V-17 AIR invariants per TA ✓ · V-18 P90 (TA-5) before P91 (TA-6) ✓ · V-19 P91 5 probes ✓ · V-20 P89 intervals authored ✓
status: READY
PACKAGE_READY
