# Teaching Blueprint: phys.mech.tension

## 0. Concept Profile

concept_id: phys.mech.tension
name: Tension
domain: Classical Mechanics (Physics)
difficulty: developing (3)
bloom: apply
prerequisites: [phys.mech.free-body-diagram]
mastery_threshold: 0.80
estimated_hours: 3
cross_links: []
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (pulling a string taut and feeling it pull back before introducing T; difficulty 3 → C with accelerated P track)
status: READY

## 1. Learning Objective

[Boundary statement]
A student who achieves mastery demonstrates:
1. States that tension is a **pull** transmitted along a rope or string — it acts on the object attached to the rope end, pointing **away from the object along the rope**; ropes cannot push.
2. For a **massless, inextensible rope over a frictionless pulley**, applies the fact that tension is the **same magnitude throughout** the rope, and uses this to write equations for each body in a connected system separately.
3. Solves a **two-body connected-system** (e.g. Atwood machine or horizontally-linked blocks) by (a) drawing a free-body diagram for each body, (b) writing ΣF = ma for each, and (c) solving the simultaneous equations for T and a.

A student who sets tension equal to the weight of the hanging mass (true only at equilibrium, not when the system accelerates), or who writes a single equation for two objects as if they are one block without checking sign conventions, has **NOT** achieved mastery — both errors collapse in Atwood-machine and multi-body problems at every subsequent level.

## 2. Student State Matrix

| State | Why here | Tell-tale behaviour | Protocol |
|---|---|---|---|
| S0 | No formal model of tension | Cannot describe what a rope "does" to each attached object | Protocol A (Concrete) |
| S1 | "Tension = weight of hanging mass" rule | Sets T = mg for the hanging block in all cases | Protocol B (Counterexample-first) |
| S2-TENSION-EQUALS-WEIGHT | Treats T = mg_hanging as always true | Gives T = m₂g even when the system accelerates | Misconception Engine → Protocol C |
| S2-ROPE-PUSHES | Treats a rope as able to push | Draws a compression arrow from a rope | Misconception Engine → Protocol C |
| S3 | Understands pull; fails to separate bodies | Writes one equation for both objects as a unit; wrong T | Protocol C (Guided Questioning) |
| S6 | Anxiety at simultaneous equations for two bodies | Freezes at writing two separate equations | Protocol F (Low Pressure) |

## 3. Diagnostic Battery

DB-1 (prior-exposure check):
"A rope connects two objects. What does it do to each one, and which way does the tension pull on each?"
  "It pulls each object toward the other — away from the object along the rope" → S3. Enter Protocol C.
  "The tension is equal to the weight of the heavier object / the hanging mass" → S1. Enter Protocol B.
  Cannot describe a tension force → DB-2.

DB-2 (misconception probe):
"Two masses hang on either side of a pulley — 3 kg on the left, 5 kg on the right. The system accelerates. Is the tension in the rope equal to 5g (the heavier mass's weight)?  Why or why not?"
  "No — if T = 5g, the 5 kg mass has net force zero and can't accelerate; T must be between 3g and 5g" → S3. Enter Protocol C.
  "Yes — tension = weight of the heavier mass" → SIGNAL:MISCONCEPTION:MC-TENSION-EQUALS-WEIGHT. Enter Misconception Engine.
  Pause / cannot reason → S0. Enter Protocol A.
  Distress → add S6 flag → confidence question → route (No→S6/F, Yes→S0/A).

DB-3 (confidence calibration):
"How confident are you with tension and connected-system problems — 1 to 5?"
  1–2 → add S6 flag; apply S6 adaptations.
  4–5 + DB-2 wrong → add S7 flag; override to Protocol G (challenge-first).

## 4. Prerequisite Check

PD-1 (for `phys.mech.free-body-diagram`):
"For a hanging mass connected to a rope, draw its free-body diagram and name each force."
  Cannot draw weight down + tension up → flag PREREQ-GAP-FBD.
  In-session minimum repair: one P06 anchor (hanging mass diagram: T up, mg down) — then resume. Deep gap → schedule `phys.mech.free-body-diagram` (S4 route).

## 5. Protocol Library

### Protocol A — Concrete-First (primary)
Serves: S0
CPA entry: C → P → A
Entry condition: cannot describe a tension force (DB-1 = no concept, DB-2 = cannot engage).
Success exit: draws tension arrows correctly for each body AND solves a two-body connected system for T and a (P91 all 5 CORRECT).
Failure exit: on TENSION-EQUALS-WEIGHT / ROPE-PUSHES signal → Misconception Engine, then resume TA-4. On two-equation overload → Protocol F.
Duration: ~50–60 min.

[TA-1: A Rope Pulls — Never Pushes]
P01
→ P04[content: "A rope can transmit a pull — that's tension. It cannot push: if you try to push with a rope, it goes slack. Every tension arrow points away from the object, along the rope toward whatever is holding the other end."]
→ P06[content: hang a weight from a string — the string pulls the weight upward (T acts on weight, pointing up); the weight pulls the string downward — the string pulls the ceiling upward (T acts on ceiling attachment, pointing down); demonstrate slack by reversing: the rope goes slack if you try to push]
→ P34[question: "In which direction does the tension in the rope act on the hanging weight?"] → P55
→ success_path → P49 → P05[curiosity: "What if the rope goes over a pulley to another mass — is the tension the same on both sides?"]

[TA-2: Constant T in a Massless Rope]
P02
→ P07[modality: a diagram of an Atwood machine (two hanging masses, pulley at top) — the rope is drawn in full; both halves of the rope are labelled T; explanation that for a massless rope over a frictionless pulley the magnitude T is the same throughout]
→ P13[think-aloud: "For a massless rope and frictionless pulley, every segment of the rope pulls with the same tension T. The pulley only redirects the pull — it doesn't change its size. So I label BOTH sides T and can treat T as a single unknown."]
→ P08[notation: "T = same throughout massless rope / frictionless pulley. Label both ends T on every diagram."]
// GR-3 satisfied: P06/P07 preceded P08 (V-8 PASS)
→ P34[question: "If the rope has no mass and the pulley has no friction, how does the tension on the left side of the pulley compare to the tension on the right side?"] → P55
→ success_path → P49
→ failure_path → P50 → P52[narrow: "No mass → no weight of its own; no friction → nothing slowing it. So the rope simply redirects the pull without losing any of it — the tension magnitude is the same on both sides."] → re-elicit → P55

[TA-3: Two Bodies, Two Equations]
P02
→ P06[content: Atwood machine — m₁ = 3 kg (left, goes up), m₂ = 5 kg (right, goes down); define downward as positive for m₂, upward as positive for m₁]
→ P13[think-aloud: "Draw separate free-body diagrams. For m₂: m₂g − T = m₂a. For m₁: T − m₁g = m₁a. Both share the same T and the same a (connected by inextensible rope). Add the two equations to eliminate T: (m₂ − m₁)g = (m₁ + m₂)a → a = (m₂ − m₁)g / (m₁ + m₂) = (2)(10)/8 = 2.5 m/s². Then T = m₁(g + a) = 3 × 12.5 = 37.5 N."]
→ P34[question: "Why is T not equal to m₂g = 50 N here?"] → P55
→ success_path → P49
→ failure_path → P50 → P52[narrow: "If T = m₂g, then ΣF on m₂ = 0, so a = 0. But the system clearly accelerates. T must be less than m₂g to give m₂ a downward net force — and greater than m₁g to give m₁ an upward net force."] → re-elicit → P55

[TA-4: Misconception Probe — T ≠ Weight When Accelerating]
P02
→ P54 // T = m_hanging × g is only true at equilibrium; the accelerating case is the load-bearing test
→ P41[diagnostic: "A 4 kg mass hangs from a rope and accelerates upward at 3 m/s² (g = 10). A student says T = 4 × 10 = 40 N. Is that right?"] → P55
→ [if "no — ΣF = T − mg = ma → T = m(g + a) = 4 × 13 = 52 N; accelerating upward needs T > mg"] → P49 → P36[probe: "What would T = mg imply about the acceleration?"] → P55
→ [if "yes, T = 40 N"] → SIGNAL:MISCONCEPTION:MC-TENSION-EQUALS-WEIGHT → misconception_repair_chain[MC-TENSION-EQUALS-WEIGHT]

[TA-5: Formative Assessment]
P02
→ P90_expansion:
    P79[predict: "Two blocks on a frictionless horizontal surface are connected by a string — a 6 kg block pulled right at 12 N, connected to a 4 kg block. Before calculating — predict whether T is greater than, less than, or equal to 12 N."] → P55
    → P49 → P51[check: did they reason T < 12 N (the 6 kg block feels the full applied force but tension only transmits part of it to the 4 kg block)?]
    → P35[open: "Explain the strategy for solving any two-body connected-system problem."] → P55

[TA-6: Mastery Gate]
P02
→ P91_expansion:
    P77[generate: "Set up (don't solve) the two-equation system for an Atwood machine with m₁ = 2 kg and m₂ = 7 kg — label clearly."] → P55 → CORRECT
    → P76[transfer: "Two blocks on a frictionless surface: 6 kg pulled by 12 N, connected to 4 kg trailing behind. Find the acceleration of the system and the tension in the connecting rope."] → P55 → CORRECT
    → P75[boundary: "At what condition does T = mg for a hanging mass? When is T ≠ mg?"] → P55 → CORRECT
    → P74[classify: "A rope connects mass A to mass B. On mass A's diagram, does tension point toward B or away from B?"] → P55 → CORRECT
    → P78[explain: "In your own words: why must you draw separate free-body diagrams for each body, and why is T ≠ weight in an accelerating system?"] → P55 → CORRECT
→ P68 → P62[schedule: first retrieval in 2 days]

### Protocol B — Counterexample-First
Serves: S1 ("tension = weight of hanging mass" rule)
CPA entry: P
Entry condition: defaults to T = mg_hanging without considering acceleration.
Success exit: uses ΣF = ma for each body separately to find T and shows T ≠ mg_hanging when the system accelerates.
Failure exit: if triggers TENSION-EQUALS-WEIGHT → Misconception Engine → Protocol C.
Key deltas: open P02 → P41["If T = weight of the hanging mass (5g = 50 N), what is the net force on that mass? Zero. So how can it accelerate?"] → P54 → P55; on stall run P17 (equilibrium T vs. accelerating T) and P21; converge on TA-3 onward.

### Protocol C — Guided Questioning
Serves: S3 (partial), S2 (post-repair)
CPA entry: P
Entry condition: understands tension as a pull; writes one combined equation instead of two separate ones.
Success exit: draws separate diagrams for each body, writes separate equations, solves correctly for T and a.
Failure exit: escalate to Protocol A TA-3 (rebuild two-body separation with the Atwood diagram and worked example).
Key deltas: enter at TA-3; P36/P51 probes on "did you write one equation per body?"; run P90/P91.

### Protocol D — Prerequisite Repair (S4)
Serves: S4; entry PREREQ-GAP-FBD; success = free-body force identification re-established → return to Protocol A TA-1; failure = schedule `phys.mech.free-body-diagram`, suspend.

### Protocol F — Low Pressure (S6)
Serves: S6
CPA entry: C
Success exit: correctly identifies T on one hanging-mass diagram and writes T − mg = ma for it, calmly.
Failure exit: shorten, bank a win, reschedule.
Key deltas: NO P28 (V-10/GR-5); conflict replaced by P30 bridge; keep the Atwood diagram (P07) visible; P85 regulation_tail per TA; defer the two-equation system until the student is settled on single-body tension.

### Protocol G — Challenge-First (S7 override)
Serves: S7; entry DB-3 4–5 with wrong DB-2; success = student revises T = weight claim after the acceleration contradiction; failure = Misconception Engine[MC-TENSION-EQUALS-WEIGHT].
Key deltas: open with DB-2 Atwood scenario directly; let the equal-weight claim sit (P55); P17 contrast; no premature confirmation.

## 6. Misconception Engine

### MC-TENSION-EQUALS-WEIGHT: "Tension equals the weight of the hanging mass"
trigger_signal: student sets T = m_hanging × g in a system that is clearly accelerating.
conflict_evidence [P28]: "You said T = m₂g = 50 N for the 5 kg mass. Apply ΣF to that mass: m₂g − T = m₂a → 50 − 50 = 5a → a = 0. The system has zero acceleration. But the 5 kg is heavier — it should accelerate downward. If T = m₂g, the system can't move. We see it does move, so T < m₂g."
bridge_text [P30]: "T = mg is only true when the system is in equilibrium (a = 0) — e.g. a hanging mass at rest. When the system accelerates, the net force on the mass drives that acceleration: ΣF = ma. Rearrange to find T: T = m(g ± a), which is different from mg unless a = 0."
replacement_text [P31]: "Write ΣF = ma for each body separately. Solve for T from the equations — never assume T = mg when the system moves."
discrimination_pairs [P33]: ["hanging mass at rest: T = mg ✓ (a = 0)", "hanging mass accelerating up: T = m(g + a) > mg ✓", "Atwood machine accelerating: T between m₁g and m₂g ✓", "setting T = m₂g in Atwood: ✗ forces a = 0"]
s6_path: skip P28; use "if T = mg, does the mass speed up or stay still?" as a gentle shared question to surface the contradiction, then P30.

### MC-ROPE-PUSHES: "A rope can exert a pushing (compressive) force"
trigger_signal: student draws a tension arrow pointing toward the object (pushing it) rather than away from it along the rope.
conflict_evidence [P28]: "Lay the rope on a table and try to push a block with it. The rope immediately goes slack — it can't transmit a push, only a pull. A rope under compression has zero tension; it just buckles. All rope forces are pulls: they act away from the object, along the rope, toward the attachment point."
bridge_text [P30]: "Tension is always a pull. Every tension arrow must point away from the object, along the rope. If you ever draw a tension arrow pointing toward the object, you are drawing a push — impossible for a rope. A rod can push; a rope cannot."
replacement_text [P31]: "Tension arrows point away from the object. No exceptions for ropes. If the problem needs a push, there is a rod or rigid contact, not a rope."
discrimination_pairs [P33]: ["hanging weight: T arrow points up (away from weight, along rope) ✓", "block pulled by rope: T arrow points toward the rope/anchor end ✓", "tension arrow pointing toward the object: ✗ that's a push, impossible for a rope"]
s6_path: skip P28; physically demonstrate a limp rope going slack when pushed, then P30.

## 7. Assessment Battery

| Probe | Item | Expected signal |
|---|---|---|
| P74 (classify) | "On mass A's diagram (connected to B by rope), tension points: toward B or away from B?" | CORRECT = away from A, toward B (a pull) |
| P74 (classify) | "Can a rope exert a compression force on a block?" | CORRECT = no; only tension (pull) |
| P75 (boundary) | "When is T = mg for a hanging mass? When is T ≠ mg?" | CORRECT = equilibrium (a=0); T ≠ mg when accelerating |
| P76 (transfer) | "6 kg + 4 kg linked on frictionless surface, pulled by 12 N — find a and T." | CORRECT = a = 1.2 m/s²; T = 4.8 N |
| P77 (generate) | "Set up the two-equation system for Atwood m₁=2, m₂=7 kg." | CORRECT = m₂g−T=m₂a; T−m₁g=m₁a labelled |
| P78 (explain) | "Why draw separate diagrams? Why is T ≠ weight in an accelerating system?" | CORRECT = each body has its own equation; T ≠ mg unless a=0 |
| P79 (predict) | "Two linked blocks, 6+4 kg, 12 N pull — is T greater or less than 12 N?" | CORRECT = less; T = 4.8 N |

## 8. Mastery Gate (P91 expansion — canonical order P77→P76→P75→P74→P78)
P77: "Set up (do not solve) the two-equation system for an Atwood machine with m₁ = 2 kg and m₂ = 7 kg, clearly labelled." → expected: CORRECT
P76: "Two blocks on a frictionless surface: 6 kg pulled by 12 N, connected to 4 kg. Find the acceleration and the tension in the connecting rope." → expected: CORRECT
P75: "At what condition is T = mg for a hanging mass? When is it not?" → expected: CORRECT
P74: "A rope connects mass A to mass B. On mass A's free-body diagram, does the tension arrow point toward B or away from B?" → expected: CORRECT
P78: "In your own words: why must you draw separate free-body diagrams for each body, and why is tension not equal to the weight of the hanging mass when the system accelerates?" → expected: CORRECT

## 9. Retrieval Schedule (P89 expansion)
Interval 1 (2 days): "A 3 kg mass hangs at rest from a rope — find the tension."
Interval 2 (5 days): "A 3 kg mass accelerates upward at 4 m/s² from a rope (g = 10) — find T."
Interval 3 (10 days): "Atwood machine: 4 kg and 6 kg. Find a and T (g = 10)."
Interval 4 (21 days): "Two blocks on a frictionless table: 5 kg and 3 kg connected by string, pulled by 16 N total. Find a and the tension between them."
Interval 5 (60 days): "Explain to a classmate why a rope in an Atwood machine has tension between the two hanging weights, not equal to either weight."

---
V-check status:
- V-1 all 10 KG fields ✓ · V-2 NOT-clause ✓ · V-3 DB 2–3 Qs, every branch → state ✓ · V-4 every plausible state (S0,S1,S2,S3,S6[,S4 via PD-1]) has a Protocol ✓ · V-5 every Protocol success+failure exit ✓ · V-6 every TA opens P01/P02 ✓ · V-7 elicitations followed by P55 ✓ · V-8 no P08 without prior P06/P07 (TA-2) ✓ · V-9 Schema Repair via P41 gate (TA-4) ✓ · V-10 no P28 in S6 Protocol F ✓ · V-11 P91 terminal; P68→P62 ✓ · V-12 no >3 consecutive C without E break ✓ · V-13 P54 before high-difficulty first-attempt (TA-4, Protocol B) ✓ · V-14 assessment not first (TA-5/6) ✓ · V-15 Named Compounds expanded ✓ · V-16 IC-1..20 ✓ · V-17 AIR invariants per TA ✓ · V-18 P90 (TA-5) before P91 (TA-6) ✓ · V-19 P91 5 probes ✓ · V-20 P89 intervals authored ✓
status: READY
PACKAGE_READY
