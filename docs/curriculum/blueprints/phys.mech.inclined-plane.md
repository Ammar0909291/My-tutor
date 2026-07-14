# Teaching Blueprint: phys.mech.inclined-plane

## 0. Concept Profile

concept_id: phys.mech.inclined-plane
name: Motion on Inclined Planes
domain: Classical Mechanics (Physics)
difficulty: proficient (4)
bloom: apply
prerequisites: [phys.mech.friction, phys.mech.normal-force]
mastery_threshold: 0.80
estimated_hours: 4
cross_links: []
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (tilting a plank and watching an object slide before resolving forces algebraically; difficulty 4 → C with accelerated P track)
status: READY

## 1. Learning Objective

[Boundary statement]
A student who achieves mastery demonstrates:
1. **Resolves weight** along two incline-aligned axes: mg sinθ (parallel to slope, down the slope) and mg cosθ (perpendicular to slope, into the slope); draws and labels all forces correctly on a rotated-axis free-body diagram.
2. Writes the two **Newton's Second Law equations** — one along the slope, one perpendicular to it — and uses the perpendicular equation to find N = mg cosθ before computing friction f = μN, then solves the parallel equation for the acceleration.
3. Handles the **direction of friction** correctly for each case: friction opposes impending or actual motion (up the slope when the object slides or is on the verge of sliding down; down the slope when pushed up).

A student who resolves forces along horizontal/vertical rather than along/perpendicular to the slope (causing impossible simultaneous-equation tangles), or who uses mg instead of mg cosθ for the normal force and hence mg cosθ × μ as friction, has **NOT** achieved mastery — incorrect axis choice and the resulting wrong friction are the dominant failure modes for all subsequent incline, circular, and banked-road problems.

## 2. Student State Matrix

| State | Why here | Tell-tale behaviour | Protocol |
|---|---|---|---|
| S0 | No strategy for incline force resolution | Draws forces but cannot decompose into components | Protocol A (Concrete) |
| S1 | Resolves along horizontal/vertical axes | Produces correct force magnitudes but wrong equations | Protocol B (Counterexample-first) |
| S2-WRONG-AXIS | Always uses horizontal/vertical instead of slope-aligned axes | Sets up an avoidable simultaneous-equation tangle | Misconception Engine → Protocol C |
| S2-FRICTION-WRONG-N | Uses mg (not mg cosθ) for N in friction formula | Overstates friction; wrong acceleration | Misconception Engine → Protocol C |
| S3 | Correct axes and N; wrong friction direction or sign | Flips friction direction for objects pushed up vs sliding down | Protocol C (Guided Questioning) |
| S6 | Anxiety at rotating axes and trigonometry | Freezes at sinθ/cosθ components | Protocol F (Low Pressure) |

## 3. Diagnostic Battery

DB-1 (prior-exposure check):
"A block rests on a 30° slope. How do you find the component of its weight along the slope?"
  "Weight component along slope = mg sin30°; normal force = mg cos30°" → S3. Enter Protocol C.
  "Resolve horizontally and vertically — then convert" → S1. Enter Protocol B.
  Cannot decompose weight on a slope → DB-2.

DB-2 (misconception probe):
"A 4 kg block slides down a rough 25° incline (μ_k = 0.3, g = 10). What is the friction force? (Write the formula, not the number.)"
  "f = μ_k N = μ_k mg cos25°" → S3. Enter Protocol C.
  "f = μ_k mg" (uses weight not normal force) → SIGNAL:MISCONCEPTION:MC-FRICTION-WRONG-N. Enter Misconception Engine.
  Cannot set up the problem → S0. Enter Protocol A.
  Distress → add S6 flag → confidence question → route (No→S6/F, Yes→S0/A).

DB-3 (confidence calibration):
"How confident are you with inclined-plane problems — 1 to 5?"
  1–2 → add S6 flag; apply S6 adaptations.
  4–5 + DB-2 wrong → add S7 flag; override to Protocol G (challenge-first).

## 4. Prerequisite Check

PD-1 (for `phys.mech.normal-force`):
"On an incline at angle θ, what is the normal force on the object in terms of m, g, θ?"
  Cannot state N = mg cosθ → flag PREREQ-GAP-NORMAL-FORCE.
  In-session minimum repair: one P06 anchor (tilted surface diagram, perpendicular projection) — then resume. Deep gap → schedule `phys.mech.normal-force` (S4 route).

PD-2 (for `phys.mech.friction`):
"What formula gives kinetic friction, and which force goes in the formula?"
  Cannot state f_k = μ_k N (normal force) → flag PREREQ-GAP-FRICTION.
  In-session minimum repair: one P06 anchor recalling f = μN — then resume. Deep gap → schedule `phys.mech.friction` (S4 route).

## 5. Protocol Library

### Protocol A — Concrete-First (primary)
Serves: S0
CPA entry: C → P → A
Entry condition: cannot decompose weight on a slope (DB-1 = cannot decompose, DB-2 = cannot set up).
Success exit: resolves weight correctly along slope-aligned axes, finds N, computes friction, and solves for a in both sliding-down and pushed-up cases (P91 all 5 CORRECT).
Failure exit: on WRONG-AXIS / FRICTION-WRONG-N signal → Misconception Engine, then resume TA-4. On trig collapse → Protocol F.
Duration: ~60–80 min (may span 2 sessions).

[TA-1: Tilt the Axes, Not the Physics]
P01
→ P04[content: "When a surface is tilted, we tilt our axis system to match it. Instead of horizontal and vertical, we use 'along the slope' and 'perpendicular to the slope.' That makes every force except weight lie on one axis — and dramatically simplifies the equations."]
→ P06[content: draw a slope at 30°; place a block on it; show the standard x-y axes vs. the slope-aligned axes; note that N already lies on the perpendicular axis with the slope-aligned choice — no decomposition needed for N]
→ P34[question: "With slope-aligned axes, which forces need to be decomposed into components? Which forces lie along one axis already?"] → P55
→ success_path → P49 → P05[curiosity: "If N lies perfectly on one axis and weight is the only one to split — what are the two components of weight?"]

[TA-2: Decomposing Weight — mg sinθ and mg cosθ]
P02
→ P07[modality: a clear diagram — the block on the slope; weight mg straight down; the right-triangle resolution: component along slope = mg sinθ (pointing down the slope); component perpendicular to slope = mg cosθ (pointing into the slope); angle θ marked at both the slope base and the weight triangle]
→ P13[think-aloud: "Weight mg points straight down. The angle between the slope's perpendicular and the vertical is also θ (geometry of parallel lines). So: perpendicular component = mg cosθ (into the slope) and parallel component = mg sinθ (down the slope). Larger θ → bigger downslope pull, smaller normal squeeze."]
→ P08[notation: "W_∥ = mg sinθ (down slope) ; W_⊥ = mg cosθ (into slope) ; N = mg cosθ (from ⊥ equation, a_⊥ = 0)"]
// GR-3 satisfied: P06/P07 preceded P08 (V-8 PASS)
→ P34[question: "For a 5 kg block on a 37° slope (g = 10), find mg sinθ and mg cosθ."] → P55
→ success_path → P49
→ failure_path → P50 → P52[narrow: "sin37° ≈ 0.60, cos37° ≈ 0.80. mg sin37° = 50 × 0.60 = 30 N (down slope). mg cos37° = 50 × 0.80 = 40 N (into slope) = N."] → re-elicit → P55

[TA-3: Two Equations — Perpendicular Then Parallel]
P02
→ P06[content: 5 kg block sliding down 37° slope, μ_k = 0.2, g = 10; set up both axis equations; perpendicular: N − mg cosθ = 0 → N = 40 N; friction: f = μ_k N = 0.2 × 40 = 8 N (up the slope, opposing sliding down); parallel: mg sinθ − f = ma → 30 − 8 = 5a → a = 4.4 m/s² down slope]
→ P13[think-aloud: "Step 1 — perpendicular equation gives N. Step 2 — use N to get friction; direction opposes the slide (up the slope). Step 3 — parallel equation gives a. This two-step sequence is the template for every incline problem."]
→ P34[question: "Why do we solve the perpendicular equation first, before the parallel one?"] → P55
→ success_path → P49
→ failure_path → P50 → P52[narrow: "Friction = μN — we need N first. N comes from the perpendicular equation. Only after we have N can we compute friction and put it into the parallel equation."] → re-elicit → P55

[TA-4: Misconception Probe — Friction Direction Changes]
P02
→ P54 // friction direction depends on the direction of motion/tendency; students often leave it fixed
→ P41[diagnostic: "The same block (5 kg, 37° slope, μ_k = 0.2) is now PUSHED UP the slope and slides upward. What direction does friction act now, and what is the acceleration?"] → P55
→ [if "friction now acts DOWN the slope (opposing the upward slide); parallel: −mg sinθ − f = ma → −30 − 8 = 5a → a = −7.6 m/s² (decelerating upward)"] → P49 → P36[probe: "Why did friction flip direction from the previous case?"] → P55
→ [if "friction still acts up the slope" / same direction as sliding-down case] → SIGNAL:MISCONCEPTION:MC-FRICTION-DIRECTION → misconception_repair_chain[MC-FRICTION-DIRECTION]

[TA-5: Formative Assessment]
P02
→ P90_expansion:
    P79[predict: "A block is placed on a rough slope and gently released. Before calculating — if the slope angle just barely allows sliding to start, which component of weight overcomes which friction limit?"] → P55
    → P49 → P51[check: did they connect mg sinθ > μ_s mg cosθ → tanθ > μ_s as the slip condition?]
    → P35[open: "Describe the two-step solve sequence for any incline problem, and explain why axis choice matters."] → P55

[TA-6: Mastery Gate]
P02
→ P91_expansion:
    P77[generate: "Set up (do not solve) the full two-equation system for a 3 kg block sliding down a 40° rough incline with μ_k = 0.35."] → P55 → CORRECT
    → P76[transfer: "A 6 kg block is pushed up a 20° incline at constant velocity by a force parallel to the slope (μ_k = 0.25, g = 10). Find the applied force."] → P55 → CORRECT
    → P75[boundary: "At what minimum angle does a block start to slide on a surface with μ_s = 0.5? (Derive the condition.)"] → P55 → CORRECT
    → P74[classify: "For a block sliding down a slope: friction acts (a) down the slope or (b) up the slope?"] → P55 → CORRECT
    → P78[explain: "In your own words: why use slope-aligned axes, and what is the two-step sequence for incline problems?"] → P55 → CORRECT
→ P68 → P62[schedule: first retrieval in 2 days]

### Protocol B — Counterexample-First
Serves: S1 (horizontal/vertical axis habit)
CPA entry: P
Entry condition: resolves along horizontal and vertical, getting correct magnitudes but cumbersome equations.
Success exit: adopts slope-aligned axes and solves the simpler single-equation-per-axis form.
Failure exit: if triggers WRONG-AXIS → Misconception Engine → Protocol C.
Key deltas: open P02 → P41["Using horizontal/vertical axes, how many forces must be decomposed into components? Using slope-aligned axes — how many?"] → P54 → P55; on stall run P17 (comparing both axis sets' equation complexity) and P21; converge on TA-2 onward.

### Protocol C — Guided Questioning
Serves: S3 (partial), S2 (post-repair)
CPA entry: P
Entry condition: correct axes and N; wrong friction direction or sign error in the parallel equation.
Success exit: correctly identifies friction direction for both sliding-down and pushed-up cases.
Failure exit: escalate to Protocol A TA-3/TA-4 (rebuild the two-step sequence with direction check).
Key deltas: enter at TA-4; P36/P51 probes on "which way is the object moving — which way must friction oppose?"; run P90/P91.

### Protocol D — Prerequisite Repair (S4)
Serves: S4; entries PREREQ-GAP-NORMAL-FORCE or PREREQ-GAP-FRICTION; success = missing concept re-established → return to Protocol A TA-1; failure = schedule the relevant prerequisite, suspend.

### Protocol F — Low Pressure (S6)
Serves: S6
CPA entry: C
Success exit: correctly decomposes weight on one slope and finds N, calmly.
Failure exit: shorten, bank a win, reschedule.
Key deltas: NO P28 (V-10/GR-5); conflict replaced by P30 bridge; keep the component diagram (P07) visible; P85 regulation_tail per TA; defer friction cases until weight decomposition is solid.

### Protocol G — Challenge-First (S7 override)
Serves: S7; entry DB-3 4–5 with wrong DB-2; success = student revises friction-uses-weight or wrong-axis habit after the contradiction; failure = Misconception Engine[MC-FRICTION-WRONG-N].
Key deltas: open with the incline case where their formula misstates friction; let it sit (P55); P17 contrast; no premature confirmation.

## 6. Misconception Engine

### MC-FRICTION-WRONG-N: "Friction on an incline = μ × weight (not μ × normal force)"
trigger_signal: student writes f = μmg on an incline instead of f = μ mg cosθ.
conflict_evidence [P28]: "You used the full weight in the friction formula. But friction depends on how hard the surfaces press together — that's the NORMAL force, perpendicular to the slope. On a 30° slope N = mg cos30° = 0.866 mg, noticeably less than mg. At 90° (a vertical wall) N = mg cos90° = 0 — no friction at all, yet your formula would give f = μmg, a large nonzero value. A block on a vertical wall with no other force would not be held by friction — the formula breaks down."
bridge_text [P30]: "Friction = μN always. On an incline, find N from the perpendicular equation: N = mg cosθ. Substitute that into f = μN. Using mg directly skips the cosθ and overstates friction for any slope angle."
replacement_text [P31]: "Step 1: N = mg cosθ from the perpendicular equation. Step 2: f = μN = μ mg cosθ. Never plug mg directly into the friction formula on an incline."
discrimination_pairs [P33]: ["flat floor: N = mg → f = μmg ✓ (cosθ = 1)", "30° incline: N = mg cos30°, f = μ mg cos30° ✓", "30° incline, using f = μmg: ✗ overestimates N"]
s6_path: skip P28; demonstrate with the 90° vertical-wall limiting case as a shared thought experiment (no friction possible), then P30.

### MC-FRICTION-DIRECTION: "Friction always acts up the slope regardless of direction of motion"
trigger_signal: student draws friction up the slope even when the block is being pushed upward.
conflict_evidence [P28]: "The block is sliding UP the slope — you drew friction upward, in the SAME direction as the motion. But friction always OPPOSES relative motion. If the block slides up, friction opposes the upward slide and acts DOWN the slope. When it slides down, friction acts up. The direction flips with the motion — it is never fixed."
bridge_text [P30]: "Ask: which way is the block moving (or tending to move) relative to the surface? Friction always points in the OPPOSITE direction. For sliding down → friction up. For sliding up → friction down. For impending slide down → friction up (up to μ_s N)."
replacement_text [P31]: "Before drawing the friction arrow, state the direction of actual or impending relative motion. Draw friction opposing that direction."
discrimination_pairs [P33]: ["sliding down: friction up the slope ✓", "sliding up: friction down the slope ✓", "stationary, tending to slide down: friction up (static) ✓", "sliding up, friction drawn up: ✗ adds to motion rather than opposing it"]
s6_path: skip P28; use the "rub your hand along the table — does friction push your hand forward or backward?" analogy as a shared felt observation, then P30.

## 7. Assessment Battery

| Probe | Item | Expected signal |
|---|---|---|
| P74 (classify) | "Block sliding down slope: friction acts up or down the slope?" | CORRECT = up (opposes downward slide) |
| P74 (classify) | "On a 40° incline, N = mg or N = mg cos40°?" | CORRECT = mg cos40° |
| P75 (boundary) | "At what angle does a block just begin to slide? Derive the condition." | CORRECT = tanθ = μ_s |
| P76 (transfer) | "6 kg block pushed up 20° slope at constant velocity, μ_k = 0.25, g = 10 — applied force?" | CORRECT = mg sin20° + μ_k mg cos20° ≈ 34.6 N |
| P77 (generate) | "Set up (no solve) the two-equation system for 3 kg block sliding down 40° slope, μ_k = 0.35." | CORRECT = N = mg cos40° ; mg sin40° − μ_k N = ma |
| P78 (explain) | "Why slope-aligned axes; what is the two-step solve sequence?" | CORRECT = N first from ⊥ eq; friction from N; a from ∥ eq |
| P79 (predict) | "Block gently released on rough slope — which weight component must exceed which friction limit to start sliding?" | CORRECT = mg sinθ > μ_s mg cosθ → tanθ > μ_s |

## 8. Mastery Gate (P91 expansion — canonical order P77→P76→P75→P74→P78)
P77: "Set up (do not solve) the full two-equation system for a 3 kg block sliding down a 40° rough incline with μ_k = 0.35." → expected: CORRECT
P76: "A 6 kg block is pushed up a 20° incline at constant velocity by a force parallel to the slope (μ_k = 0.25, g = 10). Find the applied force." → expected: CORRECT
P75: "At what minimum angle does a block start to slide on a surface with μ_s = 0.5? Derive the condition." → expected: CORRECT
P74: "For a block sliding down a slope, does friction act (a) down the slope or (b) up the slope?" → expected: CORRECT
P78: "In your own words: why use slope-aligned axes, and what is the two-step sequence for incline problems?" → expected: CORRECT

## 9. Retrieval Schedule (P89 expansion)
Interval 1 (2 days): "A 4 kg block slides down a 30° frictionless incline (g = 10). Find the acceleration."
Interval 2 (5 days): "Same block on a rough 30° incline (μ_k = 0.2). Find N, friction, and the acceleration."
Interval 3 (10 days): "A 5 kg block is pushed up a 25° rough slope (μ_k = 0.3, g = 10) by a 40 N force parallel to the slope. Find the acceleration."
Interval 4 (21 days): "Derive the angle at which a block on a rough surface (μ_s = 0.6) is just on the verge of sliding."
Interval 5 (60 days): "Explain to a classmate why the friction force on an incline uses mg cosθ instead of mg, and why friction direction depends on the direction of motion."

---
V-check status:
- V-1 all 10 KG fields ✓ · V-2 NOT-clause ✓ · V-3 DB 2–3 Qs, every branch → state ✓ · V-4 every plausible state (S0,S1,S2,S3,S6[,S4 via PD-1/PD-2]) has a Protocol ✓ · V-5 every Protocol success+failure exit ✓ · V-6 every TA opens P01/P02 ✓ · V-7 elicitations followed by P55 ✓ · V-8 no P08 without prior P06/P07 (TA-2) ✓ · V-9 Schema Repair via P41 gate (TA-4) ✓ · V-10 no P28 in S6 Protocol F ✓ · V-11 P91 terminal; P68→P62 ✓ · V-12 no >3 consecutive C without E break ✓ · V-13 P54 before high-difficulty first-attempt (TA-4, Protocol B) ✓ · V-14 assessment not first (TA-5/6) ✓ · V-15 Named Compounds expanded ✓ · V-16 IC-1..20 ✓ · V-17 AIR invariants per TA ✓ · V-18 P90 (TA-5) before P91 (TA-6) ✓ · V-19 P91 5 probes ✓ · V-20 P89 intervals authored ✓
status: READY
PACKAGE_READY
