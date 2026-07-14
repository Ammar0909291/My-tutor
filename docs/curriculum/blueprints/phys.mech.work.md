# Teaching Blueprint: phys.mech.work

## 0. Concept Profile

concept_id: phys.mech.work
name: Work
domain: Classical Mechanics (Physics)
difficulty: proficient (4)
bloom: apply
prerequisites: [phys.mech.newtons-second-law, phys.meas.vector-products]
mastery_threshold: 0.80
estimated_hours: 4
cross_links: []
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (pushing a box and feeling the effort vs. pushing a wall and going nowhere before introducing W = Fd cosθ; difficulty 4 → C with accelerated P track)
status: READY

## 1. Learning Objective

[Boundary statement]
A student who achieves mastery demonstrates:
1. Calculates work as W = F d cosθ, where θ is the angle between the force vector and the displacement vector — recognising that **only the component of force along the displacement** transfers energy.
2. Determines the **sign of work**: positive when the force component aids the displacement (0° ≤ θ < 90°), negative when it opposes it (90° < θ ≤ 180°), and zero when force is perpendicular to displacement (θ = 90°).
3. Computes the **total work** done on an object by summing the work done by each individual force — and uses the joule (J = N·m) as the unit.

A student who uses the full force magnitude without cosθ when force is at an angle, or who believes work is always positive, has **NOT** achieved mastery — both errors collapse in every subsequent energy-conservation, work-energy-theorem, and power problem downstream.

## 2. Student State Matrix

| State | Why here | Tell-tale behaviour | Protocol |
|---|---|---|---|
| S0 | No formal physics definition of work | Conflates everyday "effort" with physics work | Protocol A (Concrete) |
| S1 | "Work = force × distance" without cosθ | Correct for parallel cases; fails angled force | Protocol B (Counterexample-first) |
| S2-FULL-FORCE | Uses full force instead of F cosθ component | Computes W = Fd with no angle factor | Misconception Engine → Protocol C |
| S2-WORK-ALWAYS-POSITIVE | Treats work as always positive or zero | Ignores friction doing negative work | Misconception Engine → Protocol C |
| S3 | Correct formula; fails zero-work or total-work cases | Gets W for one force; misses that normal force does zero work | Protocol C (Guided Questioning) |
| S6 | Anxiety at cosθ with dot-product notation | Freezes at W = F⃗ · d⃗ notation | Protocol F (Low Pressure) |

## 3. Diagnostic Battery

DB-1 (prior-exposure check):
"What is work in physics — how do you calculate it?"
  States W = Fd cosθ or W = F·d (dot product, needs force component along displacement) → S3. Enter Protocol C.
  "Work = force × distance" (no angle) → S1. Enter Protocol B.
  "Effort / how hard you try" → S0. Enter Protocol A.
  Pause → DB-2.

DB-2 (misconception probe):
"You pull a suitcase at 30° above horizontal with 20 N over 10 m. How much work do you do on it?"
  "W = 20 × 10 × cos30° ≈ 173 J" → S3. Enter Protocol C.
  "W = 20 × 10 = 200 J" (omits cosθ) → SIGNAL:MISCONCEPTION:MC-FULL-FORCE. Enter Misconception Engine.
  "Gravity does negative work going up" or confusion over sign → partial S3, enter Protocol C with sign focus.
  Pause / cannot engage → add S6 flag → confidence question → route (No→S6/F, Yes→S0/A).

DB-3 (confidence calibration):
"How confident are you with work in physics — 1 to 5?"
  1–2 → add S6 flag; apply S6 adaptations.
  4–5 + DB-2 wrong → add S7 flag; override to Protocol G (challenge-first).

## 4. Prerequisite Check

PD-1 (for `phys.meas.vector-products`):
"What is the dot product of two vectors? What does the cosθ factor represent?"
  Cannot explain the dot product or angle factor → flag PREREQ-GAP-VECTOR-PRODUCTS.
  In-session minimum repair: one P06 anchor (A·B = |A||B|cosθ; the projection of one onto the other) — then resume. Deep gap → schedule `phys.meas.vector-products` (S4 route).

PD-2 (for `phys.mech.newtons-second-law`):
"What is a net force, and what is its unit?"
  Cannot identify newtons or net force concept → flag PREREQ-GAP-SECOND-LAW.
  In-session minimum repair: one P06 anchor — then resume. Deep gap → schedule `phys.mech.newtons-second-law` (S4 route).

## 5. Protocol Library

### Protocol A — Concrete-First (primary)
Serves: S0
CPA entry: C → P → A
Entry condition: no formal physics definition (DB-1 = colloquial effort only).
Success exit: computes W = Fd cosθ with correct sign for a pulling, opposing, and perpendicular force (P91 all 5 CORRECT).
Failure exit: on FULL-FORCE / WORK-ALWAYS-POSITIVE signal → Misconception Engine, then resume TA-4. On cosθ collapse → Protocol F.
Duration: ~60–80 min.

[TA-1: When Does Pushing Actually Transfer Energy?]
P01
→ P04[content: "In physics, work has a precise meaning: energy transferred to an object by a force through a displacement. Push a wall all day — you do no work on the wall, because it doesn't move. Push a box across the floor — you do work."]
→ P06[content: push a book across the table — it moves, work is done; push a wall — no movement, no work; carry a book horizontally at arm's length — the upward holding force is perpendicular to the horizontal walk, no work done by the holding force]
→ P34[question: "You carry a heavy backpack horizontally. Is the upward force from your back doing work on the backpack? Why?"] → P55
→ success_path → P49 → P05[curiosity: "What if the force is at an angle to the motion — does all of it count?"]

[TA-2: W = Fd cosθ — Only the Along-Displacement Component]
P02
→ P07[modality: three diagrams — (a) F parallel to d (θ = 0°): W = Fd; (b) F at 30° to d: W = Fd cos30°; (c) F perpendicular (θ = 90°): W = 0 — the component along d is zero]
→ P13[think-aloud: "Work = F⃗ · d⃗ = Fd cosθ. Only the component of force in the direction of motion transfers energy. If θ = 90° (force perpendicular to motion) no energy is transferred — the force steers but doesn't speed up or slow down."]
→ P08[notation: "W = Fd cosθ ; unit: J (joule) = N·m ; θ is the angle between F⃗ and d⃗"]
// GR-3 satisfied: P06/P07 preceded P08 (V-8 PASS)
→ P34[question: "A 30 N force acts at 60° to a 5 m displacement. Calculate the work done."] → P55
→ success_path → P49
→ failure_path → P50 → P52[narrow: "W = 30 × 5 × cos60° = 150 × 0.5 = 75 J. Only the cos60° = 0.5 fraction of the force acts along the displacement."] → re-elicit → P55

[TA-3: Sign of Work — Positive, Negative, Zero]
P02
→ P06[content: a block sliding right — applied force right (θ = 0°, W > 0); friction left (θ = 180°, cos180° = −1, W < 0); normal force up (θ = 90°, W = 0); gravity down (θ = 90° to horizontal displacement, W = 0)]
→ P13[think-aloud: "0° ≤ θ < 90°: cosθ > 0 → positive work (force aids motion, energy added). 90° < θ ≤ 180°: cosθ < 0 → negative work (force opposes motion, energy removed). θ = 90°: W = 0 (no energy transfer). Friction always does negative work on a sliding object."]
→ P34[question: "For the sliding block, does the normal force do positive, negative, or zero work on it?"] → P55
→ success_path → P49
→ failure_path → P50 → P52[narrow: "Normal force is perpendicular to the horizontal displacement — θ = 90°, cos90° = 0, so W_N = 0."] → re-elicit → P55

[TA-4: Misconception Probe — The Angle Matters]
P02
→ P54 // omitting cosθ for angled forces is the dominant calculation error
→ P41[diagnostic: "A rope pulls a sledge 12 m at 25° above the horizontal with 50 N. A student writes W = 50 × 12 = 600 J. What did they do wrong, and what is the correct answer?"] → P55
→ [if "they omitted cosθ; correct: W = 50 × 12 × cos25° = 600 × 0.906 ≈ 544 J"] → P49 → P36[probe: "Why does the upward component of the pull not contribute to the work?"] → P55
→ [if "600 J is correct — they used full force"] → SIGNAL:MISCONCEPTION:MC-FULL-FORCE → misconception_repair_chain[MC-FULL-FORCE]

[TA-5: Formative Assessment]
P02
→ P90_expansion:
    P79[predict: "A ball moves in a horizontal circle on a frictionless surface, kept in orbit by a string pulling inward. Does the tension in the string do any work? Predict before computing."] → P55
    → P49 → P51[check: did they identify T perpendicular to the circular path (velocity direction) → W = 0?]
    → P35[open: "Explain why friction always does negative work on a sliding object, using the W = Fd cosθ formula."] → P55

[TA-6: Mastery Gate]
P02
→ P91_expansion:
    P77[generate: "Construct a scenario with three forces acting on a moving object where the total work is zero."] → P55 → CORRECT
    → P76[transfer: "A 5 kg block is dragged 8 m along a rough horizontal floor. Applied force = 40 N at 20° below horizontal, μ_k = 0.3, g = 10. Find the work done by each force, then the total work."] → P55 → CORRECT
    → P75[boundary: "Can the normal force ever do work? Under what circumstances?"] → P55 → CORRECT
    → P74[classify: "For each force on a horizontally sliding block — applied force (forward), friction (backward), normal (up), weight (down) — state whether work is positive, negative, or zero."] → P55 → CORRECT
    → P78[explain: "In your own words: what is the W = Fd cosθ formula, and what does the cosθ factor physically mean?"] → P55 → CORRECT
→ P68 → P62[schedule: first retrieval in 2 days]

### Protocol B — Counterexample-First
Serves: S1 ("work = force × distance" without angle)
CPA entry: P
Entry condition: gives correct result only for parallel cases; omits cosθ for angled forces.
Success exit: correctly applies cosθ for an angled force and identifies zero work for perpendicular force.
Failure exit: if triggers FULL-FORCE → Misconception Engine → Protocol C.
Key deltas: open P02 → P41["If W = Fd with no angle factor, a force perpendicular to motion would do the same work as one along the motion. But carrying a book horizontally does no work on it — does your formula agree?"] → P54 → P55; on stall run P17 (component along displacement vs. full magnitude) and P21; converge on TA-3 onward.

### Protocol C — Guided Questioning
Serves: S3 (partial), S2 (post-repair)
CPA entry: P
Entry condition: correct formula; fails sign, zero-work, or total-work cases.
Success exit: correctly assigns positive/negative/zero work to each force and computes total work.
Failure exit: escalate to Protocol A TA-3 (rebuild with the three-force-sign diagram).
Key deltas: enter at TA-3; P36/P51 probes on "which way is this force relative to the displacement?"; run P90/P91.

### Protocol D — Prerequisite Repair (S4)
Serves: S4; entry PREREQ-GAP-VECTOR-PRODUCTS or PREREQ-GAP-SECOND-LAW; success = missing concept re-established → return to Protocol A TA-1; failure = schedule the relevant prerequisite, suspend.

### Protocol F — Low Pressure (S6)
Serves: S6
CPA entry: C
Success exit: computes W = Fd for a parallel force cleanly, then extends to one angled case.
Failure exit: shorten, bank a win, reschedule.
Key deltas: NO P28 (V-10/GR-5); conflict replaced by P30 bridge; keep the three-case diagram (P07) visible; P85 regulation_tail per TA; defer total-work and sign cases until the basic formula is solid.

### Protocol G — Challenge-First (S7 override)
Serves: S7; entry DB-3 4–5 with wrong DB-2; success = student revises full-force habit after the angled-pull contradiction; failure = Misconception Engine[MC-FULL-FORCE].
Key deltas: open with the angled-pull case DB-2; let it sit (P55); P17 contrast; no premature confirmation.

## 6. Misconception Engine

### MC-FULL-FORCE: "Work = full force × distance, regardless of angle"
trigger_signal: student computes W = Fd with no cosθ factor for a force at an angle to the displacement.
conflict_evidence [P28]: "You pulled the sledge at 25° above horizontal with 50 N and wrote W = 600 J. But 25° of that pull went upward — it didn't move the sledge forward at all, it slightly lifted it. Only the horizontal component, 50 cos25° ≈ 45.3 N, pushed the sledge along its path. W = 45.3 × 12 ≈ 544 J. You overcounted by including energy that went into the vertical direction, where the sledge didn't move."
bridge_text [P30]: "Work measures energy transferred in the direction of motion. Only the force component along the displacement does that. W = Fd cosθ extracts that component automatically — cosθ scales down the full force to its effective along-displacement fraction."
replacement_text [P31]: "W = Fd cosθ always. If the force is parallel (θ = 0°), cosθ = 1 and W = Fd. Otherwise, cosθ < 1 and W < Fd. Never omit cosθ for an angled force."
discrimination_pairs [P33]: ["F parallel to d: W = Fd (cos0°=1) ✓", "F at 30°: W = Fd cos30° = 0.866 Fd ✓", "F perpendicular: W = 0 (cos90°=0) ✓", "angled force W = Fd (no cosθ): ✗ overcounts"]
s6_path: skip P28; use the "how much of the pull actually pushes forward?" framing with a shared diagram showing the horizontal projection, then P30.

### MC-WORK-ALWAYS-POSITIVE: "Work is always a positive quantity"
trigger_signal: student gives a positive work value for friction, gravity on an upward throw, or any force opposing the motion.
conflict_evidence [P28]: "Friction acts backward (θ = 180°) on a sliding box. W = Fd cos180° = −Fd. Negative. That negative sign has physical meaning: friction is removing energy from the box, slowing it down. If friction's work were positive, it would be adding energy and speeding the box up — the opposite of what we observe."
bridge_text [P30]: "Work can be negative. When a force opposes the displacement (θ between 90° and 180°), cosθ is negative, so W is negative. Negative work means the force takes energy away from the object. Friction always does negative work on sliding objects; gravity does negative work when you lift an object upward."
replacement_text [P31]: "Check the angle. 0° ≤ θ < 90° → W positive (aids motion). 90° < θ ≤ 180° → W negative (opposes motion). θ = 90° → W = 0."
discrimination_pairs [P33]: ["applied force forward: W > 0 ✓", "friction backward (θ=180°): W < 0 ✓", "gravity on upward throw (θ=180°): W < 0 ✓", "friction: W positive: ✗"]
s6_path: skip P28; use "does friction speed the box up or slow it down?" and connect sign to energy-removed vs energy-added gently, then P30.

## 7. Assessment Battery

| Probe | Item | Expected signal |
|---|---|---|
| P74 (classify) | "Applied force forward, friction backward, normal up — sign of work for each?" | CORRECT = +, −, 0 |
| P74 (classify) | "Ball in horizontal circle on string — work done by tension?" | CORRECT = 0 (perpendicular to velocity) |
| P75 (boundary) | "Can the normal force ever do work? When?" | CORRECT = yes, when surface is not perpendicular to motion (e.g. pushing down on a ramp) |
| P76 (transfer) | "5 kg block, 8 m, applied 40 N at 20° below horizontal, μ_k = 0.3 — work by each force, total work." | CORRECT = W_applied, W_friction, W_N = 0, W_gravity = 0; net = sum |
| P77 (generate) | "Three forces on a moving object where total work = 0." | CORRECT = valid scenario (e.g. constant velocity: applied + friction balance) |
| P78 (explain) | "What does the cosθ factor physically mean in W = Fd cosθ?" | CORRECT = extracts the force component along displacement |
| P79 (predict) | "Ball in horizontal circle — does tension do work?" | CORRECT = no; perpendicular to velocity |

## 8. Mastery Gate (P91 expansion — canonical order P77→P76→P75→P74→P78)
P77: "Construct a scenario with three forces on a moving object where the total work is zero." → expected: CORRECT
P76: "5 kg block dragged 8 m: applied force 40 N at 20° below horizontal, μ_k = 0.3, g = 10. Find work by each force and total work." → expected: CORRECT
P75: "Can the normal force ever do work? Under what circumstances?" → expected: CORRECT
P74: "For applied force (forward), friction (backward), normal (up) on a horizontally sliding block — state the sign of work for each." → expected: CORRECT
P78: "In your own words: what is the W = Fd cosθ formula, and what does the cosθ factor physically mean?" → expected: CORRECT

## 9. Retrieval Schedule (P89 expansion)
Interval 1 (2 days): "A 15 N force moves a box 6 m in the same direction. Calculate the work."
Interval 2 (5 days): "A 40 N force acts at 50° to a 5 m displacement. Find the work done."
Interval 3 (10 days): "A block slides 10 m on rough ground (friction = 12 N). Calculate the work done by friction and explain its sign."
Interval 4 (21 days): "A crate is dragged 4 m by a rope at 35° above horizontal (tension 60 N). Simultaneously friction (20 N) opposes motion. Find the work done by each force and the total work."
Interval 5 (60 days): "Explain to a classmate why the normal force on a horizontally sliding block does zero work, and construct a case where a normal force does non-zero work."

---
V-check status:
- V-1 all 10 KG fields ✓ · V-2 NOT-clause ✓ · V-3 DB 2–3 Qs, every branch → state ✓ · V-4 every plausible state (S0,S1,S2,S3,S6[,S4 via PD-1/PD-2]) has a Protocol ✓ · V-5 every Protocol success+failure exit ✓ · V-6 every TA opens P01/P02 ✓ · V-7 elicitations followed by P55 ✓ · V-8 no P08 without prior P06/P07 (TA-2) ✓ · V-9 Schema Repair via P41 gate (TA-4) ✓ · V-10 no P28 in S6 Protocol F ✓ · V-11 P91 terminal; P68→P62 ✓ · V-12 no >3 consecutive C without E break ✓ · V-13 P54 before high-difficulty first-attempt (TA-4, Protocol B) ✓ · V-14 assessment not first (TA-5/6) ✓ · V-15 Named Compounds expanded ✓ · V-16 IC-1..20 ✓ · V-17 AIR invariants per TA ✓ · V-18 P90 (TA-5) before P91 (TA-6) ✓ · V-19 P91 5 probes ✓ · V-20 P89 intervals authored ✓
status: READY
PACKAGE_READY
