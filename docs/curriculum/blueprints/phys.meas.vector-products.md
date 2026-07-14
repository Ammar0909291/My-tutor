# Teaching Blueprint: phys.meas.vector-products

## 0. Concept Profile
concept_id: phys.meas.vector-products
name: Dot and Cross Products
domain: Measurement & Units (Physics)
difficulty: proficient (4)
bloom: apply
prerequisites: [phys.meas.vector-addition]
mastery_threshold: 0.8
estimated_hours: 4
cross_links: []
unlocks: [phys.mech.torque, phys.mech.work]
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: P (difficulty ≥ 4 → perceptual/pictorial bridge entry; concrete optional)
status: READY

## 1. Learning Objective

[Boundary statement]
A student who achieves mastery demonstrates:
1. Computes the **dot product** A·B = |A||B|cos θ, states it is a **scalar**, and interprets it as "how much of one vector lies along the other" (maximal when parallel, zero when perpendicular).
2. Computes the **cross product** magnitude |A×B| = |A||B|sin θ, states it is a **vector perpendicular to both** (direction by the right-hand rule), and interprets its magnitude as the area of the parallelogram they span (zero when parallel, maximal when perpendicular).
3. **Chooses** the right product for a physical quantity: work = F·d (dot, a scalar) because only the aligned part of force does work; torque = r×F (cross, a vector) because turning depends on the perpendicular part.

A student who "multiplies the magnitudes" like scalars, or who cannot say whether a given product yields a scalar or a vector (or when to use which), has **NOT** achieved mastery — the two products encode opposite geometric ideas (alignment vs perpendicularity) and drive every work, torque, flux, and angular-momentum result downstream.

## 2. Student State Matrix

| State | Why here | Tell-tale behaviour | Protocol |
|---|---|---|---|
| S1 | "Multiply vectors like numbers" schema | Multiplies magnitudes; ignores angle and scalar/vector outcome | Protocol B (Counterexample-first) |
| S2-SCALAR-MULTIPLY | Believes vector product = magnitude product | Gives |A||B|, no cos/sin, no direction | Misconception Engine → Protocol C |
| S2-DOT-CROSS-CONFUSION | Confuses which yields scalar vs vector | Uses cos for cross, or calls A×B a scalar | Misconception Engine → Protocol C |
| S4 | Prerequisite gap on vector addition/components | Cannot resolve or add vectors | Protocol D → prereq repair |
| S5 | Wants the formal definitions first | Comfortable abstract; asks for the algebra | Protocol H (Formal-first) |
| S6 | Anxiety at trig + right-hand rule | Freezes at sin/cos and 3-D direction | Protocol F (Low Pressure) |
| S7 | Overconfident; conflates the two products | Fast-wrong on scalar/vector distinction | Protocol G (Challenge-first) |

## 3. Diagnostic Battery

DB-1 (prior-exposure check):
"Have you multiplied two vectors together — and met that there are two different ways to do it, one giving a number and one giving a new vector?"
  No → S5 or S0-equivalent → Enter Protocol A (Perceptual bridge).
  Yes → DB-2.

DB-2 (representation / misconception test):
"You have a 3 N force and a 2 m displacement at 60° to each other. Work done = force · displacement. Compute it, and tell me: is the answer a number or a vector?"
  "3 × 2 × cos60 = 3 J, a scalar — dot product uses cos and gives a number" → S3/S5. Enter Protocol C or H.
  "6" (magnitudes only, no cos) → SIGNAL:MISCONCEPTION:MC-SCALAR-MULTIPLY. Enter Misconception Engine.
  "It's a vector" / uses sin → SIGNAL:MISCONCEPTION:MC-DOT-CROSS-CONFUSION. Enter Misconception Engine.
  Pause / "I don't know" → add S6 flag → confidence question → route (No→S6/F, Yes→Protocol A).

DB-3 (confidence calibration):
"How confident are you with dot and cross products — 1 to 5?"
  1–2 → add S6 flag; apply S6 adaptations.
  4–5 + DB-2 wrong → add S7 flag; override to Protocol G (challenge-first).

## 4. Prerequisite Check

PD-1 (for `phys.meas.vector-addition`):
"Resolve a 10 N force at 30° above the horizontal into its horizontal and vertical parts."
  Cannot resolve into components → flag PREREQ-GAP-VECTOR-ADDITION.
  In-session minimum repair: one P07 (arrow with dropped components) + one P34 re-establishing V cos θ / V sin θ, then resume. Deep gap → schedule `phys.meas.vector-addition` (S4 route, Protocol D).

## 5. Protocol Library

### Protocol A — Perceptual-Bridge (primary)
Serves: S0-equivalent, entry from DB-1 = No
CPA entry: P → A
Entry condition: no prior exposure to vector products.
Success exit: computes both products, states scalar-vs-vector for each, and picks the right one for work vs torque (P91 all 5 CORRECT).
Failure exit: on SCALAR-MULTIPLY / DOT-CROSS-CONFUSION → Misconception Engine, then resume TA-3. On trig/right-hand-rule collapse → Protocol F.
Duration: ~60–70 min (spans 2 sessions).

[TA-1: Two Ways to Combine — Alignment vs Turning]
P01
→ P04[content: "There are two useful ways to multiply vectors. One measures how much they line up; the other measures how much they're at right angles — how much one turns about the other."]
→ P07[modality: two arrows at an angle θ; shade the projection of B onto A (alignment) and the parallelogram they span (area)]
→ P14[predict: "If the two arrows point the SAME way, which quantity is biggest — the 'lining-up' one or the 'right-angle area' one? What if they're perpendicular?"] → P55
→ success_path → P49 → P05[curiosity: "So one is biggest when aligned, the other biggest when perpendicular — opposite behaviours."]

[TA-2: The Dot Product — Alignment → Scalar]
P02
→ P07[modality: B's shadow (projection) on A, length |B|cos θ]
→ P13[think-aloud: "The dot product multiplies A by the part of B that lies ALONG A: A·B = |A||B|cos θ. It's a single number — a scalar. Maximal when aligned (cos0 = 1), zero when perpendicular (cos90 = 0)."]
→ P08[notation: "A·B = |A||B|cos θ  (scalar). Component form: AₓBₓ + AᵧBᵧ."]
// GR-3 satisfied: P07 preceded P08 (V-8 PASS)
→ P10[example: "Worked: forces/displacement — 4 N and 3 m at 0° → 4·3·cos0 = 12 J; at 90° → 0 J (no work)."]
→ P34[question: "Compute A·B for |A|=5, |B|=2, θ=60°. Number or vector?"] → P55
→ success_path → P49

[TA-3: The Cross Product — Perpendicularity → Vector]
P02
→ P07[modality: the parallelogram spanned by A and B; its area |A||B|sin θ; a normal arrow popping out of the plane]
→ P13[think-aloud: "The cross product's SIZE is |A||B|sin θ — the parallelogram's area. And it points PERPENDICULAR to both, by the right-hand rule. It's a vector. Zero when parallel (sin0 = 0), maximal when perpendicular."]
→ P08[notation: "|A×B| = |A||B|sin θ  (vector, ⟂ to both; right-hand rule for direction)."]
→ P16[compare: "Side by side: dot uses cos and gives a scalar, biggest when aligned; cross uses sin and gives a perpendicular vector, biggest when perpendicular."]
→ P34[question: "For the same |A|=5,|B|=2,θ=60°, compute |A×B|. Scalar or vector?"] → P55
→ success_path → P49

[TA-4: Choosing the Right Product + Misconception Probe]
P02
→ P54 // choosing dot vs cross by the physics is the load-bearing skill
→ P41[diagnostic: "Work = force · displacement, and only the part of the force along the motion does work. Which product is that — and is work a scalar or a vector?"] → P55
→ [if "dot; work is a scalar — the aligned part, cos"] → P49 → P36[probe: "Why would the cross product be wrong for work?"] → P55
→ [if multiplies magnitudes / picks cross] → SIGNAL:MISCONCEPTION → misconception_repair_chain[MC-SCALAR-MULTIPLY or MC-DOT-CROSS-CONFUSION per signal]

[TA-5: Formative Assessment]
P02
→ P90_expansion:
    P79[predict: "Torque = r × F, and turning is strongest when you push perpendicular to the spanner. Before we formalise — should torque use the product that's biggest at 90°? Which one?"] → P55
    → P49 → P51[check: did they link perpendicular→sin→cross, or guess?]
    → P35[open: "Explain, in terms of alignment vs perpendicularity, why work is a dot product but torque is a cross product."] → P55

[TA-6: Mastery Gate]
P02
→ P91_expansion:
    P77[generate: "Invent two non-zero vectors whose DOT product is zero, and say what that means geometrically."] → P55 → CORRECT
    → P76[transfer: "You push a lawnmower with a 40 N force along the handle, which is 30° above the ground, moving it 5 m forward. How much work is done? Which product, and why?"] → P55 → CORRECT
    → P75[boundary: "What is A×B when A and B are parallel? What is A·B when they are perpendicular?"] → P55 → CORRECT
    → P74[classify: "The result of a CROSS product is a scalar or a vector?"] → P55 → CORRECT (vector)
    → P78[explain: "In your own words: how do the dot and cross products differ in what they measure, what they output, and when each is largest?"] → P55 → CORRECT
→ P68 → P62[schedule: first retrieval in 2 days]

### Protocol B — Counterexample-First
Serves: S1 ("multiply vectors like numbers")
CPA entry: P
Entry condition: multiplies magnitudes, ignores angle/output type.
Success exit: computes both products with angle and correct scalar/vector output, rejecting bare magnitude-multiplication.
Failure exit: if triggers a named MC → Misconception Engine → Protocol C.
Key deltas: open P02 → P41["you say 'multiply the vectors' = 5 × 2 = 10. Push a wall hard sideways — you do lots of 'force × distance' but zero work. Why?"] → P54 → P55; on the stall run P17 (aligned vs perpendicular) and P21; converge on TA-2 onward.

### Protocol C — Guided Questioning
Serves: S3 (partial), S2 (post-repair)
CPA entry: P
Entry condition: knows one product; confuses outputs or the cos/sin roles.
Success exit: correctly distinguishes and computes both, chooses per physics.
Failure exit: escalate to Protocol A TA-2/TA-3 (rebuild each geometrically).
Key deltas: enter at TA-2/3; heavy P16/P36 to separate the two; run P90/P91.

### Protocol D — Prerequisite Repair (S4)
Serves: S4; entry PREREQ-GAP-VECTOR-ADDITION; success = component resolution re-established → return to Protocol A TA-1; failure = schedule `phys.meas.vector-addition`, suspend.

### Protocol H — Formal-First (S5)
Serves: S5 (wants definitions first)
CPA entry: A
Entry condition: comfortable abstract; asks for algebra.
Success exit: derives geometric meaning FROM the formal definitions and applies to work/torque.
Failure exit: drop to Protocol A TA-2 if the abstract entry leaves geometric meaning hollow.
Key deltas: open P02 → P08[both definitions and component forms] → P36["what does cos θ = 0 do to the dot product, and what does that mean?"] → P55 → P21[extract the alignment/perpendicularity meaning] → run TA-4 onward; still requires the P91 gate including the geometric-explanation probe (P78).

### Protocol F — Low Pressure (S6)
Serves: S6
CPA entry: P
Success exit: one dot and one cross computed calmly, outputs correctly named.
Failure exit: shorten, bank a win, reschedule.
Key deltas: NO P28 (V-10/GR-5); conflict replaced by P30 bridge; keep the two-arrow picture + formula card (P07) visible; defer the right-hand-rule DIRECTION (teach magnitude first); P85 regulation_tail per TA.

### Protocol G — Challenge-First (S7 override)
Serves: S7; entry DB-3 4–5 with a wrong DB-2; success = student revises the scalar/vector conflation after the contradiction; failure = Misconception Engine[MC-DOT-CROSS-CONFUSION].
Key deltas: open with a P41 case their conflated rule gets wrong (e.g. "is torque a number?"); let it sit (P55); P17 contrast; no premature confirmation.

## 6. Misconception Engine

### MC-SCALAR-MULTIPLY: "Multiplying two vectors just multiplies their magnitudes"
trigger_signal: student gives |A||B| with no cos/sin, no angle, no scalar-vs-vector distinction.
conflict_evidence [P28]: "Push hard against a wall that doesn't move — big force, big 'distance' you lean across, yet you do NO work. If work were just force × distance, you'd have done plenty. What's missing from a plain magnitude-multiply?"
bridge_text [P30]: "Vectors carry direction, so their product depends on the angle. The dot product keeps only the ALIGNED part (× cos θ) and gives a scalar; the cross product keeps the PERPENDICULAR part (× sin θ) and gives a vector. Bare |A||B| is neither."
replacement_text [P31]: "To multiply vectors, decide alignment (dot, cos, scalar) or perpendicularity (cross, sin, vector) — never just multiply magnitudes."
discrimination_pairs [P33]: ["aligned: A·B = |A||B|, A×B = 0", "perpendicular: A·B = 0, |A×B| = |A||B|", "60°: A·B = |A||B|(0.5), |A×B| = |A||B|(0.87)"]
s6_path: skip P28; use the push-the-wall image as a shared puzzle, then P30.

### MC-DOT-CROSS-CONFUSION: "The dot and cross products are interchangeable / both give the same kind of thing"
trigger_signal: student uses cos for cross (or sin for dot), or calls A×B a scalar / A·B a vector, or picks the wrong one for a physical quantity.
conflict_evidence [P28]: "Torque turns things — it has a direction (which way it spins). Work is just an amount of energy — no direction. If both products were the same, why would one physics quantity have a direction and the other not?"
bridge_text [P30]: "Dot → cos → SCALAR, measures alignment, biggest when parallel. Cross → sin → VECTOR (perpendicular, right-hand rule), measures perpendicularity/area, biggest at 90°. They are opposites, and their OUTPUTS differ."
replacement_text [P31]: "Match the product to the quantity: a scalar quantity (work, power) uses the dot; a directional/turning quantity (torque, angular momentum) uses the cross."
discrimination_pairs [P33]: ["work = F·d (scalar, dot)", "torque = r×F (vector, cross)", "dot max at 0°, cross max at 90°"]
s6_path: skip P28; place the dot/cross comparison card (P07) side by side and go straight to bridge_text (P30).

## 7. Assessment Battery

| Probe | Item | Expected signal |
|---|---|---|
| P74 (classify) | "Result of a cross product: scalar or vector?" | CORRECT = vector |
| P74 (classify) | "Which product uses cos θ?" | CORRECT = dot |
| P75 (boundary) | "A×B when A ∥ B? A·B when A ⟂ B?" | CORRECT = 0 and 0 |
| P76 (transfer) | "40 N along a handle 30° above ground, moved 5 m forward — work done? Which product?" | CORRECT = 40·5·cos30 ≈ 173 J, dot |
| P77 (generate) | "Two non-zero vectors with zero dot product — what does it mean?" | CORRECT = perpendicular |
| P78 (explain) | "How do dot and cross differ in meaning, output, and when each is largest?" | CORRECT = full distinction |
| P79 (predict) | "Torque is strongest pushing perpendicular — which product, dot or cross?" | CORRECT = cross |

## 8. Mastery Gate (P91 expansion — canonical order P77→P76→P75→P74→P78)
P77: "Invent two non-zero vectors whose dot product is zero, and say what that means." → expected: CORRECT
P76: "40 N force along a handle 30° above the ground, mower moved 5 m — work done, which product, why?" → expected: CORRECT
P75: "A×B when A and B are parallel? A·B when perpendicular?" → expected: CORRECT
P74: "The result of a cross product — scalar or vector?" → expected: CORRECT (vector)
P78: "In your own words: how dot and cross differ in what they measure, output, and when each is largest." → expected: CORRECT

## 9. Retrieval Schedule (P89 expansion)
Interval 1 (2 days): "Compute A·B and |A×B| for |A|=6, |B|=3, θ=30°; name each output type."
Interval 2 (5 days): "Why is work a dot product and torque a cross product?"
Interval 3 (10 days): "Two vectors have A·B = 0. What is the angle between them?"
Interval 4 (21 days): "A 20 N force at 90° to a 0.3 m spanner — find the torque magnitude and say its product type."
Interval 5 (60 days): "Explain to a classmate the opposite behaviours of dot and cross products with angle."

---
V-check status:
- V-1 all 10 KG fields ✓ · V-2 NOT-clause ✓ · V-3 DB 2–3 Qs, every branch → state ✓ · V-4 every plausible state (S1,S2,S4,S5,S6,S7) has a Protocol ✓ · V-5 every Protocol success+failure exit ✓ · V-6 every TA opens P01/P02 ✓ · V-7 elicitations followed by P55 ✓ · V-8 no P08 without prior P07 (TA-2/3) ✓ · V-9 Schema Repair via P41 gate (TA-4) ✓ · V-10 no P28 in S6 Protocol F ✓ · V-11 P91 terminal; P68→P62 ✓ · V-12 no >3 consecutive C without E break ✓ · V-13 P54 before high-difficulty first-attempt (TA-4, Protocol B) ✓ · V-14 assessment not first (TA-5/6) ✓ · V-15 Named Compounds expanded ✓ · V-16 IC-1..20 ✓ · V-17 AIR invariants per TA ✓ · V-18 P90 (TA-5) before P91 (TA-6) ✓ · V-19 P91 5 probes ✓ · V-20 P89 intervals authored ✓
status: READY
PACKAGE_READY
