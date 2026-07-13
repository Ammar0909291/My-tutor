# Teaching Blueprint: phys.mech.friction

## 0. Concept Profile

concept_id: phys.mech.friction
name: Friction
domain: Classical Mechanics (Physics)
difficulty: developing (3)
bloom: apply
prerequisites: [phys.mech.free-body-diagram]
mastery_threshold: 0.80
estimated_hours: 4
cross_links: []
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (feeling a block resist sliding before quantifying with μ; difficulty 3 → C with accelerated P track)
status: READY

## 1. Learning Objective

[Boundary statement]
A student who achieves mastery demonstrates:
1. Distinguishes **static friction** (adjusts up to a maximum f_s ≤ μ_s N to prevent sliding) from **kinetic friction** (constant f_k = μ_k N once sliding), and knows μ_s ≥ μ_k.
2. Computes the friction force using f = μN with the **normal force N** (not the weight, when these differ — e.g. on an incline or with a vertical applied-force component), and directs it **opposing relative motion or its tendency**.
3. Reasons that static friction is **not fixed**: it equals only what is needed to prevent motion, up to its maximum — so a stationary pushed object has friction equal to the push, not μ_s N.

A student who always sets friction to μ times the weight (ignoring that N ≠ mg on an incline), or who treats static friction as a fixed value μ_s N even when the object isn't on the verge of slipping, has **NOT** achieved mastery — the "friction = μ × weight, always maxed" error corrupts every incline, equilibrium, and dynamics problem downstream.

## 2. Student State Matrix

| State | Why here | Tell-tale behaviour | Protocol |
|---|---|---|---|
| S0 | No formal friction model | Knows friction "slows things" but no f = μN | Protocol A (Concrete) |
| S1 | "Friction = μ × weight" fixed rule | Uses mg for N even on inclines; ignores static/kinetic split | Protocol B (Counterexample-first) |
| S2-FRICTION-USES-WEIGHT | Uses weight instead of normal force | Sets f = μmg on an incline where N < mg | Misconception Engine → Protocol C |
| S2-STATIC-ALWAYS-MAX | Treats static friction as always μ_s N | Says a lightly-pushed stationary box has friction μ_s N | Misconception Engine → Protocol C |
| S3 | Uses f = μN; slips on which μ or which N | Correct method; wrong coefficient or normal in incline case | Protocol C (Guided Questioning) |
| S6 | Anxiety at the μ_s/μ_k split and incline normals | Freezes at two coefficients and resolved normals | Protocol F (Low Pressure) |

## 3. Diagnostic Battery

DB-1 (prior-exposure check):
"What is friction, and do you know a formula for how big it is?"
  States f = μN and mentions static vs kinetic → S3. Enter Protocol C.
  "Friction = μ times the weight" (fixed, no static/kinetic, weight not normal) → S1. Enter Protocol B.
  "It just slows things down" / no formula → DB-2.

DB-2 (misconception probe):
"A 10 kg box sits on a rough floor (μ_s = 0.4). You push it horizontally with 20 N and it does NOT move. What is the friction force on it right now? (g = 10)"
  "20 N — static friction matches the push to keep it still; the max is μ_s N = 40 N, so 20 N is below the limit" → S3. Enter Protocol C.
  "40 N — friction = μ_s × N = 0.4 × 100" → SIGNAL:MISCONCEPTION:MC-STATIC-ALWAYS-MAX. Enter Misconception Engine.
  "I don't know how to find it" → S0. Enter Protocol A.
  Pause / distress → add S6 flag → confidence question → route (No→S6/F, Yes→S0/A).

DB-3 (confidence calibration):
"How confident are you with friction problems — 1 to 5?"
  1–2 → add S6 flag; apply S6 adaptations.
  4–5 + DB-2 wrong → add S7 flag; override to Protocol G (challenge-first).

## 4. Prerequisite Check

PD-1 (for `phys.mech.free-body-diagram`):
"On a free-body diagram of a box on the ground, which force is the normal force, and which way does it point?"
  Cannot identify the normal force perpendicular to the surface → flag PREREQ-GAP-FBD.
  In-session minimum repair: one P06 anchor (draw a box, mark N perpendicular to the surface) — then resume. Deep gap → schedule `phys.mech.free-body-diagram` (S4 route).

## 5. Protocol Library

### Protocol A — Concrete-First (primary)
Serves: S0
CPA entry: C → P → A
Entry condition: no formal friction model (DB-1 = no formula, DB-2 = cannot find it).
Success exit: computes kinetic friction f = μ_k N and reasons about static friction as adjustable up to μ_s N (P91 all 5 CORRECT).
Failure exit: on FRICTION-USES-WEIGHT / STATIC-ALWAYS-MAX signal → Misconception Engine, then resume TA-4. On μ_s/μ_k overload → Protocol F.
Duration: ~60–80 min (may span 2 sessions).

[TA-1: The Force That Fights Sliding]
P01
→ P04[content: "Friction is a contact force that resists sliding. Two rough surfaces grip each other. It always points along the surface, opposing the way the object is sliding — or trying to slide."]
→ P06[content: push a book on the desk gently — it doesn't move (something resists exactly your push); push harder until it suddenly slides; note the resistance was adjustable, then dropped once it moved]
→ P34[question: "Before the book moved, what was cancelling your push? When it started sliding, did the resistance feel bigger or smaller?"] → P55
→ success_path → P49 → P05[curiosity: "So friction can change its own size to hold something still — up to a point. What sets that limit?"]

[TA-2: f = μN — Normal Force, Not Weight]
P02
→ P07[modality: a table — surface pairs with μ values; two worked normals: box on flat ground (N = mg) vs box on a 30° incline (N = mg cos30° < mg) — showing N is NOT always mg]
→ P13[think-aloud: "Kinetic friction f_k = μ_k N. The N is the NORMAL force — how hard the surfaces press together, perpendicular to the surface. On flat ground with no vertical push, N = mg. But on an incline, N = mg cosθ, which is less. Always use the normal force from the free-body diagram, never automatically the weight."]
→ P08[notation: "f_k = μ_k N (kinetic, sliding) ; f_s ≤ μ_s N (static, up to a max) ; μ_s ≥ μ_k"]
// GR-3 satisfied: P06/P07 preceded P08 (V-8 PASS)
→ P34[question: "A 5 kg box slides on flat ground, μ_k = 0.3, g = 10. Find the kinetic friction force."] → P55
→ success_path → P49
→ failure_path → P50 → P52[narrow: "On flat ground N = mg = 50 N. f_k = μ_k N = 0.3 × 50 = ? — and it points opposite to the sliding."] → re-elicit → P55

[TA-3: Static Friction Adjusts]
P02
→ P06[content: a 10 kg box, μ_s = 0.5, g = 10 → max static friction = μ_s N = 50 N; push with 20 N (box still) → friction = 20 N; push with 45 N (still) → friction = 45 N; push with 55 N > 50 N → box slides, friction drops to kinetic]
→ P13[think-aloud: "Static friction is whatever is needed to keep the object still — it MATCHES the push, up to its maximum μ_s N. Push 20 N → friction is 20 N, not 50. Only when the push exceeds the maximum (50 N here) does the object break free and slide. Then kinetic friction (constant, μ_k N) takes over."]
→ P34[question: "Same box (max static 50 N). You push with 30 N and it stays still. What is the friction force?"] → P55
→ success_path → P49
→ failure_path → P50 → P52[narrow: "It's not moving, so friction must exactly cancel your 30 N push. Is 30 N below the 50 N limit? Then friction = 30 N."] → re-elicit → P55

[TA-4: Misconception Probe — Which Normal Force?]
P02
→ P54 // N ≠ mg on an incline is the load-bearing subtlety that breaks the "friction = μ × weight" habit
→ P41[diagnostic: "A 4 kg block slides down a 30° rough incline (μ_k = 0.25, g = 10). A student computes friction as μ_k × mg = 0.25 × 40 = 10 N. Is that right? What normal force should they use?"] → P55
→ [if "no — on the incline N = mg cos30° = 40 × 0.866 ≈ 34.6 N, so f = μ_k N ≈ 8.7 N, not 10 N"] → P49 → P36[probe: "Why is the normal force smaller than the weight on an incline?"] → P55
→ [if "yes, use the weight" / f = μmg] → SIGNAL:MISCONCEPTION:MC-FRICTION-USES-WEIGHT → misconception_repair_chain[MC-FRICTION-USES-WEIGHT]

[TA-5: Formative Assessment]
P02
→ P90_expansion:
    P79[predict: "A heavy crate won't budge no matter how you push — until suddenly it slides and then feels easier to keep moving. Before we discuss — which is larger, μ_s or μ_k?"] → P55
    → P49 → P51[check: did they link the 'suddenly easier' to μ_k < μ_s?]
    → P35[open: "Explain why static friction is not a single fixed number, and what sets its upper limit."] → P55

[TA-6: Mastery Gate]
P02
→ P91_expansion:
    P77[generate: "Invent a scenario where static friction is NOT at its maximum, and give its value."] → P55 → CORRECT
    → P76[transfer: "A 6 kg block is pushed up a 20° incline (μ_k = 0.3, g = 10) and slides up. Find the kinetic friction force and its direction."] → P55 → CORRECT
    → P75[boundary: "Is friction always equal to μ times the normal force? When is it less?"] → P55 → CORRECT
    → P74[classify: "On a flat floor with a horizontal push, is the normal force equal to the weight? On a 30° incline?"] → P55 → CORRECT
    → P78[explain: "In your own words: how do static and kinetic friction differ, and why use the normal force rather than the weight?"] → P55 → CORRECT
→ P68 → P62[schedule: first retrieval in 2 days]

### Protocol B — Counterexample-First
Serves: S1 ("friction = μ × weight" fixed rule)
CPA entry: P
Entry condition: uses mg for N and treats friction as a single fixed value.
Success exit: uses the normal force from the diagram and distinguishes static (adjustable) from kinetic.
Failure exit: if triggers FRICTION-USES-WEIGHT → Misconception Engine → Protocol C.
Key deltas: open P02 → P41["Your rule says f = μ × weight. On a steep incline the weight is unchanged — so your friction is unchanged. But the block presses the slope LESS as it steepens. Does the friction really stay the same?"] → P54 → P55; on stall run P17 (weight vs. normal force) and P21; converge on TA-3 onward.

### Protocol C — Guided Questioning
Serves: S3 (partial), S2 (post-repair)
CPA entry: P
Entry condition: uses f = μN; slips on which coefficient or which normal (incline).
Success exit: selects μ_s vs μ_k correctly and computes N on an incline.
Failure exit: escalate to Protocol A TA-2/TA-3 (rebuild normal-force and static-adjust ideas concretely).
Key deltas: enter at TA-3; P36/P51 probes on "is it sliding yet? which N?"; run P90/P91.

### Protocol D — Prerequisite Repair (S4)
Serves: S4; entry PREREQ-GAP-FBD; success = normal force on the diagram re-established → return to Protocol A TA-1; failure = schedule `phys.mech.free-body-diagram`, suspend.

### Protocol F — Low Pressure (S6)
Serves: S6
CPA entry: C
Success exit: computes one kinetic friction force on flat ground cleanly.
Failure exit: shorten, bank a win, reschedule.
Key deltas: NO P28 (V-10/GR-5); conflict replaced by P30 bridge; keep the f = μN reference (P07) visible; P85 regulation_tail per TA; defer incline normals and the static/kinetic split until the student is settled.

### Protocol G — Challenge-First (S7 override)
Serves: S7; entry DB-3 4–5 with wrong DB-2; success = student revises static-always-max or friction-uses-weight claim after the contradiction; failure = Misconception Engine[MC-STATIC-ALWAYS-MAX or MC-FRICTION-USES-WEIGHT].
Key deltas: open with the below-maximum static case, or the incline normal case, that their rule mishandles; let it sit (P55); P17 contrast; no premature confirmation.

## 6. Misconception Engine

### MC-FRICTION-USES-WEIGHT: "Friction is always μ times the weight"
trigger_signal: student computes f = μmg on an incline or when a vertical applied-force component changes the normal force.
conflict_evidence [P28]: "You used the weight for N. But on a 30° incline the block doesn't press the slope with its full weight — only the component perpendicular to the slope, mg cosθ, pushes into the surface. The steeper the slope, the LESS it presses, the LESS the friction. If friction stayed at μmg regardless of angle, a block on a near-vertical wall would still have huge friction — but it barely touches the wall."
bridge_text [P30]: "Friction depends on the NORMAL force — how hard the surfaces press together — not the weight. Read N off the free-body diagram every time. On flat ground with no vertical push, N happens to equal mg; on an incline N = mg cosθ; if you push down at an angle, N > mg. Use the actual N."
replacement_text [P31]: "f = μN, where N is the normal force from the diagram. Only substitute mg for N after confirming the surface is horizontal with no vertical force component."
discrimination_pairs [P33]: ["box on flat floor, horizontal push: N = mg, f = μmg ✓", "box on 30° incline: N = mg cos30°, f = μmg cos30° ✓", "box on incline using f = μmg: ✗ overestimates N"]
s6_path: skip P28; tilt a book slowly and ask "does it press the surface as hard when steeper?" as a shared felt observation, then P30.

### MC-STATIC-ALWAYS-MAX: "Static friction is always μ_s N"
trigger_signal: student sets a stationary object's friction to μ_s N even when the applied force is below the slipping threshold.
conflict_evidence [P28]: "You pushed the box with 20 N and it stayed still. You said friction = μ_s N = 40 N. But if friction really were 40 N against your 20 N push, the net force would be 20 N backward — the box would accelerate BACKWARD, into your hand. It doesn't move at all. So friction must be exactly 20 N here, matching your push. μ_s N = 40 N is only the MAXIMUM it could reach."
bridge_text [P30]: "Static friction is a responsive force: it provides exactly enough to prevent sliding, no more. It grows to match the applied force, up to a ceiling of μ_s N. Below that ceiling, friction = the applied force. Only at the instant of slipping does it reach μ_s N."
replacement_text [P31]: "For a stationary object, static friction = whatever balances the other forces (≤ μ_s N). Compute the applied force first; friction matches it until the μ_s N limit is exceeded."
discrimination_pairs [P33]: ["push 20 N, max static 40 N, box still: f_s = 20 N ✓", "push 45 N, max static 40 N: exceeds limit → slides, f drops to kinetic ✓", "push 20 N, claiming f_s = 40 N: ✗ would push the box backward"]
s6_path: skip P28; walk "the box is still, so what must friction equal?" as a gentle shared balance, then P30.

## 7. Assessment Battery

| Probe | Item | Expected signal |
|---|---|---|
| P74 (classify) | "Flat floor, horizontal push: N = weight? 30° incline: N = weight?" | CORRECT = yes flat; no incline (N = mg cosθ) |
| P74 (classify) | "Is μ_s greater than, less than, or equal to μ_k?" | CORRECT = greater (μ_s ≥ μ_k) |
| P75 (boundary) | "Is friction always μN? When is it less?" | CORRECT = static friction is ≤ μ_s N, often less |
| P76 (transfer) | "6 kg block up 20° incline, μ_k = 0.3, g = 10, sliding up — friction magnitude and direction?" | CORRECT ≈ 16.9 N, down the slope |
| P77 (generate) | "Scenario where static friction is NOT at maximum — give its value." | CORRECT = below-threshold push, f = push |
| P78 (explain) | "How do static and kinetic friction differ; why use N not weight?" | CORRECT = static adjustable ≤ μ_s N; kinetic constant μ_k N; N is contact press |
| P79 (predict) | "Crate won't budge, then slides and feels easier — μ_s vs μ_k?" | CORRECT = μ_s > μ_k |

## 8. Mastery Gate (P91 expansion — canonical order P77→P76→P75→P74→P78)
P77: "Invent a scenario where static friction is NOT at its maximum, and give its value." → expected: CORRECT
P76: "A 6 kg block is pushed up a 20° incline (μ_k = 0.3, g = 10) and slides up — find the kinetic friction force and its direction." → expected: CORRECT
P75: "Is friction always equal to μ times the normal force? When is it less?" → expected: CORRECT
P74: "On a flat floor with a horizontal push, is the normal force equal to the weight? On a 30° incline?" → expected: CORRECT
P78: "In your own words: how do static and kinetic friction differ, and why use the normal force rather than the weight?" → expected: CORRECT

## 9. Retrieval Schedule (P89 expansion)
Interval 1 (2 days): "A 5 kg box slides on flat ground, μ_k = 0.2, g = 10 — find the kinetic friction force."
Interval 2 (5 days): "A box (max static friction 30 N) is pushed with 18 N and stays still — what is the friction force?"
Interval 3 (10 days): "A 3 kg block rests on a 25° incline. Find the normal force and the maximum static friction (μ_s = 0.6, g = 10)."
Interval 4 (21 days): "Explain why walking is impossible on perfectly frictionless ice, using the static/kinetic distinction."
Interval 5 (60 days): "Explain to a classmate why anti-lock brakes (keeping wheels rolling, not skidding) stop a car in a shorter distance, using μ_s vs μ_k."

---
V-check status:
- V-1 all 10 KG fields ✓ · V-2 NOT-clause ✓ · V-3 DB 2–3 Qs, every branch → state ✓ · V-4 every plausible state (S0,S1,S2,S3,S6[,S4 via PD-1]) has a Protocol ✓ · V-5 every Protocol success+failure exit ✓ · V-6 every TA opens P01/P02 ✓ · V-7 elicitations followed by P55 ✓ · V-8 no P08 without prior P06/P07 (TA-2) ✓ · V-9 Schema Repair via P41 gate (TA-4) ✓ · V-10 no P28 in S6 Protocol F ✓ · V-11 P91 terminal; P68→P62 ✓ · V-12 no >3 consecutive C without E break ✓ · V-13 P54 before high-difficulty first-attempt (TA-4, Protocol B) ✓ · V-14 assessment not first (TA-5/6) ✓ · V-15 Named Compounds expanded ✓ · V-16 IC-1..20 ✓ · V-17 AIR invariants per TA ✓ · V-18 P90 (TA-5) before P91 (TA-6) ✓ · V-19 P91 5 probes ✓ · V-20 P89 intervals authored ✓
status: READY
PACKAGE_READY
