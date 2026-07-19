# Teaching Blueprint: Reference Angles (`math.trig.reference-angles`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.trig.reference-angles` |
| name | Reference Angles |
| domain | Trigonometry |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 3 |
| requires | `math.trig.unit-circle` |
| unlocks | `math.trig.trig-functions` |
| cross_links | (none) |
| CPA_entry_stage | C (Concrete) — begins with three angles sharing the same reference angle before the general quadrant rule |
| description (KG) | The acute angle between the terminal side of an angle and the x-axis; enables computation of trig values in all four quadrants. |

## Component 1 — Learning Objectives

- LO1: Define the reference angle (the ACUTE angle between an angle's terminal side and the $x$-axis) and compute it using the correct QUADRANT-SPECIFIC formula (Q1: $\theta$ itself; Q2: $180°-\theta$; Q3: $\theta-180°$; Q4: $360°-\theta$) — recognizing the formula genuinely depends on which quadrant the angle lies in.
- LO2: Apply reference angles to compute exact trig values for angles beyond the first quadrant, using the ASTC sign rule (All/Sine/Tangent/Cosine positive in quadrants I/II/III/IV respectively) — correctly adjusting the SIGN, not just reusing the reference angle's trig value unchanged.
- LO3: Recognize the reference angle is ALWAYS acute (strictly between $0°$ and $90°$), regardless of how large or how "far into" a quadrant the original angle is.

## Component 2 — Prerequisite Check

Assumes mastery of `math.trig.unit-circle` (angle placement on the unit circle, quadrant identification, coordinates as $(\cos\theta,\sin\theta)$).

## Component 3 — Core Explanation

**The reference angle formula depends on the quadrant — one formula per quadrant, not one universal rule**: for an angle $\theta$ (measured in standard position, $0°\le\theta<360°$), the reference angle is computed differently depending on which quadrant $\theta$ falls in: Q1 ($0°$ to $90°$): the reference angle IS $\theta$ itself. Q2 ($90°$ to $180°$): $180°-\theta$. Q3 ($180°$ to $270°$): $\theta-180°$. Q4 ($270°$ to $360°$): $360°-\theta$. Each formula measures the acute angle back to the NEAREST part of the $x$-axis, but the specific arithmetic genuinely differs by quadrant.

**Trig values equal ± the reference angle's trig value, with sign from ASTC**: once the reference angle is found, the trig function VALUE of the original angle equals the SAME trig function applied to the reference angle, but with a SIGN determined by the quadrant: "All Students Take Calculus" (ASTC) — Q1: all three (sin, cos, tan) positive; Q2: only sine positive; Q3: only tangent positive; Q4: only cosine positive. Simply reusing the reference angle's value without adjusting the sign gives a wrong answer whenever the original angle isn't in Q1.

**Reference angles are always acute, no matter the original angle's size**: by definition, a reference angle always lies strictly between $0°$ and $90°$ — even for an angle like $300°$ (deep into Q4) or $\theta$ close to $360°$, the reference angle remains a small, acute angle measuring the distance back to the nearest $x$-axis direction.

## Component 4 — Worked Examples

**Example 1 (LO1 — three different quadrant formulas, all giving the same reference angle, breaking MC-1)**: For $150°$ (Q2): reference angle $=180°-150°=30°$. For $210°$ (Q3): reference angle $=210°-180°=30°$. For $330°$ (Q4): reference angle $=360°-330°=30°$. Three DIFFERENT quadrant-specific formulas, applied to three genuinely different angles, all happening to share the SAME reference angle ($30°$) — confirming the formula used must match the actual quadrant, not one universal subtraction rule.

**Example 2 (LO2 — sign adjustment via ASTC, breaking MC-2)**: Compute $\sin(150°)$: reference angle $30°$ (Example 1), $\sin(30°)=\frac12$. Q2 is where SINE is positive (per ASTC) — so $\sin(150°)=+\frac12$. Compute $\cos(150°)$: same reference angle $30°$, but Q2 is NOT where cosine is positive — so $\cos(150°)=-\cos(30°)=-\frac{\sqrt3}2$. Naively assuming both sin and cos in Q2 equal their reference-angle values unchanged would incorrectly give $\cos(150°)=+\frac{\sqrt3}2$ — the sign must be checked via ASTC for each specific function.

**Example 3 (LO3 — reference angles stay acute regardless of the original angle's size, breaking MC-3)**: For $300°$ (Q4): reference angle $=360°-300°=60°$ — genuinely acute, between $0°$ and $90°$, even though $300°$ itself is a large angle deep into the fourth quadrant. A learner might expect a "large" angle like $300°$ to have a correspondingly "large" reference angle, but by definition the reference angle always measures back to the NEAREST $x$-axis direction, remaining acute regardless of the original angle's magnitude.

## Component 5 — Teaching Actions

### Teaching Action A01 — Different Quadrants, Different Formulas, Same Reference Angle (Primitive P06: Contrast Pair)

Contrast Example 1's three angles ($150°,210°,330°$) — different quadrants, different formulas — all converging on reference angle $30°$. State: "the reference angle formula genuinely depends on which quadrant you're in — there's no single universal subtraction that works everywhere."

- **MC-1 hook**: ask "does the same reference-angle formula (like $180°-\theta$) apply regardless of which quadrant the angle is in?" — a "yes" answer reveals MC-1 (using one formula universally rather than the correct quadrant-specific one).

### Teaching Action A02 — The Sign Must Be Checked via ASTC, Not Assumed (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: $\sin(150°)=+\frac12$ (matches reference angle unchanged) but $\cos(150°)=-\frac{\sqrt3}2$ (sign flipped) — same reference angle, same quadrant, DIFFERENT sign behavior for different functions. State: "you can't just copy the reference angle's trig value — you must check ASTC for the SPECIFIC function you're computing."

- **MC-2 hook**: ask "does a trig function's value at any angle equal its value at the reference angle, unchanged in sign?" — a "yes" answer reveals MC-2 (missing the ASTC sign adjustment).

### Teaching Action A03 — Reference Angles Are Always Acute (Primitive P11: Representation Shift)

State: "no matter how large the original angle is, the reference angle is always the SMALL, acute distance back to the nearest x-axis direction — never obtuse, never reflex." Work Example 3's $300°$ case.

- **MC-3 hook**: ask "could a reference angle be obtuse or reflex if the original angle is large enough?" — a "yes" answer reveals MC-3 (missing that reference angles are, by definition, always acute).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Compute the reference angle for $240°$, identifying the quadrant and formula used.
  2. Compute $\tan(240°)$ using the reference angle and ASTC.
  3. Compute $\cos(315°)$ using the reference angle and ASTC.
  4. Explain why a reference angle can never be $95°$, regardless of the original angle.
- **P76 (Transfer Probe, mode = independence)**: "A navigation system computes a ship's bearing angle as $255°$ and needs the exact sine value for a course calculation. (a) Determine the reference angle for $255°$, identifying the correct quadrant formula. (b) Using ASTC, determine the correct sign for $\sin(255°)$ and compute its exact value. (c) A junior engineer argues 'since $255°$ is a fairly large angle, its reference angle should also be relatively large, maybe around $75°$ or more.' Using this lesson's acute-angle guarantee, explain specifically why this reasoning is incorrect, and state the actual reference angle."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | REFERENCE-ANGLE-FORMULA-ASSUMED-UNIVERSAL | Believing one reference-angle formula applies regardless of quadrant, missing that the formula genuinely depends on which quadrant the angle is in | Foundational |
| MC-2 | TRIG-VALUE-COPIED-WITHOUT-SIGN-ADJUSTMENT | Believing a trig function's value at any angle equals its reference-angle value unchanged in sign, missing the required ASTC sign adjustment | Foundational |
| MC-3 | REFERENCE-ANGLE-ASSUMED-NON-ACUTE-FOR-LARGE-ANGLES | Believing a reference angle could be obtuse or reflex for a sufficiently large original angle, missing that reference angles are always acute by definition | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Reference Angle Formula Assumed Universal") → P41 (detect: ask a student to compute the reference angle for an angle in each of two different quadrants using the same formula, checking whether they apply it unchanged) → P64 (conceptual shift: re-walk Example 1's three different quadrant formulas, re-anchoring on "the formula depends on the quadrant").
- **B02 (targets MC-2)**: P27 (name it: "Trig Value Copied Without Sign Adjustment") → P41 (detect: ask a student to compute cos(150°) and check whether they give the unsigned reference-angle value) → P64 (conceptual shift: re-walk Example 2's sin/cos sign contrast, re-anchoring on "check ASTC for the specific function being computed").
- **B03 (targets MC-3)**: P27 (name it: "Reference Angle Assumed Non-Acute for Large Angles") → P41 (detect: ask a student whether a reference angle could be obtuse for a large original angle, checking for "yes") → P64 (conceptual shift: re-walk Example 3's 300° case, re-anchoring on "reference angles are always acute, by definition").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.trig.unit-circle` (angle placement and quadrant identification this concept's formulas directly build on).
- **Unlocks**: `math.trig.trig-functions` (uses reference angles as the standard technique for evaluating trig functions at any angle).
- **Cross-link**: KG lists no cross_links for this concept (checked via `ls docs/curriculum/blueprints/` before setting P76_mode — none to check). $P76_{mode}=$ **independence**.

## Component 8 — Teaching Notes

- estimated_hours = 3 with a proficient/apply tag places this at a compact "3 TAs + gate" tier, appropriately terse given the concept directly reuses `math.trig.unit-circle`'s already-mastered quadrant framework, adding only the reference-angle formulas and the ASTC sign rule.
- **Division of labor**: `math.trig.unit-circle` owns angle placement and quadrant identification. This concept, `math.trig.reference-angles`, deliberately does not re-teach that; it owns the specific quadrant-dependent reference-angle formulas and the ASTC sign-adjustment rule needed to extend trig value computation beyond Q1.
- Example 1's three angles were deliberately chosen to all share the identical reference angle ($30°$) despite using three different formulas, specifically to isolate that the FORMULA (not the resulting reference angle itself) is what varies by quadrant — a cleaner demonstration than three angles with three different reference angles, which might obscure the point.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (no cross_links listed → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: three angles sharing the same reference angle before the general quadrant rule) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
