# Teaching Blueprint — math.trig.angle-measure

<!-- COMPONENT 0: METADATA -->
## Component 0: Metadata

```
BLUEPRINT_ID:        math.trig.angle-measure
KG_FIELDS:
  difficulty:        proficient
  bloom:             understand
  mastery_threshold: 0.90
  estimated_hours:   3
  requires:          [math.geom.angle-measurement]
  unlocks:           [math.trig.right-triangle-trig, math.trig.unit-circle]
  cross_links:       []

SESSION_TA_CAP:      7   (estimated_hours = 3 → ≥1h band → cap 7)
CPA_ENTRY_STAGE:     P   (difficulty = proficient; prerequisite math.geom.angle-measurement already
                          covered Concrete protractor work and degree-radian conversion; this
                          blueprint begins at the Pictorial layer — standard-position diagrams —
                          and moves to the Abstract layer for coterminal and arc-length work)
P76_MODE:            Independence
  rationale:         cross_links = [] → self-contained probe.
PASS_CRITERION:      ⌈0.90 × 5⌉ = 5 out of 5
  composition:       4 P77 questions + 1 P76 probe = 5 items
STATUS:              PACKAGE_READY
```

---

<!-- COMPONENT 1: COGNITIVE MAP -->
## Component 1: Cognitive Map

### Target Understanding
An **angle in standard position** has its vertex at the origin and its initial side on the
positive x-axis; the angle is measured by a signed rotation — positive (counterclockwise, CCW)
or negative (clockwise, CW) — from the initial to the terminal side.  Two angles that share the
same terminal side are **coterminal** and differ by a multiple of 360° (or 2π rad).  When an arc
of a circle of radius r subtends an angle θ (in **radians**), the arc length is s = rθ.  The
**reference angle** of a non-quadrantal angle is the acute positive angle between the terminal
side and the nearest part of the x-axis.

### Distinction from math.geom.angle-measurement
`math.geom.angle-measurement` established how to measure angles physically (protractor, two
scales) and how to convert between degrees and radians using θ_rad = θ_deg × π/180.  This
blueprint builds on those conversion skills to introduce the richer structure of angle measure:
directed rotation, coterminal equivalence, the arc-length formula (which requires radians), and
reference angles for locating terminal sides in the coordinate plane.

### Conceptual Layers (P → A)
| Layer | Content |
|-------|---------|
| **Pictorial (P)** | Standard-position diagram (origin, initial side on +x-axis, terminal side after rotation); quadrant placement; reference angle as the acute "shadow" angle on the x-axis |
| **Abstract (A)** | Coterminal angles: θ + 360°k (or θ + 2πk), k ∈ ℤ; arc length s = rθ (θ in radians); reference angle formula by quadrant |

### Prerequisite Knowledge (from KG)
- **math.geom.angle-measurement** — protractor reading; degree-radian conversion; reflex angles (> 180°)

### Key Facts
| Concept | Formula / Statement |
|---------|-------------------|
| Standard position | Vertex at origin; initial side on positive x-axis |
| Positive rotation | Counterclockwise (CCW) |
| Negative rotation | Clockwise (CW) |
| Coterminal angles | θ and θ + 360°k (deg) = θ + 2πk (rad) for any integer k |
| Arc length | s = rθ, θ **must be in radians** |
| Reference angle Q1 | θ itself (0° < θ < 90°) |
| Reference angle Q2 | 180° − θ |
| Reference angle Q3 | θ − 180° |
| Reference angle Q4 | 360° − θ |

---

<!-- COMPONENT 2: MISCONCEPTION REGISTRY -->
## Component 2: Misconception Registry

| ID | Name | Surface Symptom | Root Cause | Severity |
|----|------|----------------|------------|----------|
| MC-1 | COTERMINAL-MEANS-DIFFERENT | Claims 30° and 390° are "different angles" pointing to different terminal positions | Does not understand that a full revolution (360°) brings the terminal side back to the same ray; equates "more rotation" with "different position" | **FOUNDATIONAL** |
| MC-2 | ARC-LENGTH-IN-DEGREES | Computes s = r × 30 (using degree measure) instead of s = r × (π/6) | Memorises s = rθ without internalising that θ must be in radians; no sense of WHY the formula requires radians | Secondary |
| MC-3 | NEGATIVE-ANGLE-MISREAD | Interprets −30° as the supplement (150°) or complement (60°) rather than as 30° clockwise | "Negative" angle triggers "opposite = supplementary" association; doesn't connect sign with rotation direction | Secondary |

**MAMR Order:** MC-1 (FOUNDATIONAL) cleared at TA-A02 gate; MC-2 and MC-3 addressed in TA-A03
and P91.

---

<!-- COMPONENT 3: SCAFFOLDING PROTOCOL -->
## Component 3: Scaffolding Protocol

```
Entry → TA-A01 (P03 analogy: turntable rotation; P11 standard-position diagram; P49)
      → TA-A02 (P41/P64 MC-1 gate: coterminal angles; P49)
      → TA-A03 (P06 contrast: arc-length in degrees vs radians; CW vs supplement; P49)
      → TA-A04 (P91 terminal mastery gate)

Repair (Protocol B):
  MC-1 → TB-R01 (full-revolution anchor for coterminal angles)
  MC-2 → TB-R02 (why arc length requires radians; unit derivation)
  MC-3 → TB-R03 (clockwise rotation diagram; −θ ≠ supplement)
```

---

<!-- COMPONENT 4: PROTOCOL A (MAIN) -->
## Component 4: Protocol A — Main Teaching Sequence

---

### TA-A01 · Entry: Standard Position and Directed Rotation (P03 + P11 + P49)

**[P03 — ANALOGY BRIDGE]**

Imagine you are standing on a turntable at an amusement park, facing **east** (along the positive
x-axis).  The turntable's centre is at the origin.

- Turning **counterclockwise (CCW)** = **positive** rotation.
  - A quarter turn CCW = +90°.  You now face north (positive y-axis).
  - A half turn CCW = +180°.  You now face west (negative x-axis).
- Turning **clockwise (CW)** = **negative** rotation.
  - A quarter turn CW = −90°.  You now face south (negative y-axis).

This is **standard position**: start facing east; every angle tells you how much to rotate and in
which direction.

**[P11 — REPRESENTATION SHIFT]**

Three representations of the angle 120°:

| Representation | Description |
|----------------|-------------|
| **Verbal** | "120° counterclockwise from the positive x-axis" |
| **Diagram** | Vertex at O; initial side along +x; terminal side in quadrant II at 120° from +x-axis |
| **Coterminal family** | 120°, 480°, −240°, … (all share the same terminal side) |

For the diagram: measure 120° CCW from the positive x-axis.  The terminal side lands in
**quadrant II** (between the positive y-axis and negative x-axis), at 60° from the negative
x-axis (this 60° is the reference angle — more in TA-A03).

**[P49 — ADAPTIVE CHECKPOINT]**

> In which quadrant does the terminal side of 250° (in standard position) lie?
> Describe the rotation direction.

- **CORRECT** (quadrant III — 250° is between 180° and 270°, so the terminal side is in Q III;
  rotation is CCW since 250° > 0): ✓ Advance to TA-A02.
- **PARTIAL** (correct quadrant but says "clockwise"): Clarify that positive angles are always
  CCW; negative angles are CW. Advance with MC-3 flagged.
- **INCORRECT** (wrong quadrant): Route to TB-R03 brief (draw the four quadrant boundaries at
  90°, 180°, 270° and locate 250°). Return.
- **NO_RESPONSE**: Scaffold "90° takes you to the positive y-axis; 180° to the negative x-axis.
  Where does 250° put you?"

---

### TA-A02 · MC-1 Gate: Coterminal Angles (P41 + P64 + P49)

**[P41 — MISCONCEPTION DETECTOR]**

> A student is asked to draw 30° and 390° in standard position.  She draws TWO DIFFERENT terminal
> sides.  Is she correct?

*(Pause for response.)*

**[P64 — CONCEPTUAL SHIFT]**

The student is **wrong**.

30° and 390° have the **same terminal side**.

Here is why: after rotating 30° CCW, the terminal side is at a fixed position in quadrant I.
Rotating an additional full 360° brings the terminal side all the way around and back to
**exactly the same position**.  30° + 360° = 390°.  Same ray.

**Definition (coterminal angles):** Two angles are **coterminal** if they share the same terminal
side in standard position.  The general form is:

> α = θ + 360°k  (degrees) = θ + 2πk  (radians), for any integer k

**Examples:**
| Base angle | + 360° | − 360° | + 720° |
|:----------:|:------:|:------:|:------:|
| 45° | 405° | −315° | 765° |
| −60° | 300° | −420° | 660° |
| π/3 | π/3 + 2π = 7π/3 | π/3 − 2π = −5π/3 | π/3 + 4π = 13π/3 |

All angles in any row are coterminal — they point to the same terminal side.

MC-1 is now resolved.  Do not revisit.

**[P49 — ADAPTIVE CHECKPOINT]**

> (i) Find one positive and one negative coterminal angle for 110°.
> (ii) Are 5π/6 and −7π/6 coterminal?  Show your reasoning.

Expected:
*(i) Positive: 110° + 360° = 470°.  Negative: 110° − 360° = −250°.*
*(ii) 5π/6 + 2πk: check k = −1: 5π/6 − 2π = 5π/6 − 12π/6 = −7π/6.  Yes, coterminal.*

- **CORRECT** (both parts right): ✓ MC-1 cleared. Advance to TA-A03.
- **PARTIAL** (part i correct, part ii fails): Remind "two angles are coterminal if they differ
  by 2πk; check 5π/6 − (−7π/6) = 12π/6 = 2π. Yes." Advance.
- **INCORRECT** (adds 360° and gets wrong sign, or says not coterminal without checking):
  Route to TB-R01. Return.
- **NO_RESPONSE**: Scaffold "What is 110° + 360°?"

---

### TA-A03 · Arc Length and Reference Angles (P06 + P49)

**[P06 — CONTRAST PAIR]**

**Contrast A — Arc length: radians vs degrees.**

A wheel of radius 10 cm rotates through angle θ.

| θ | Formula with θ | Correct? | s |
|---|----------------|:--------:|---|
| 30° | s = 10 × 30 = 300 | ✗ | Meaningless (mixes units) |
| π/6 rad | s = 10 × π/6 = 5π/3 ≈ 5.24 cm | ✓ | 5π/3 cm |
| 0.5 rad | s = 10 × 0.5 = 5 cm | ✓ | 5 cm |
| 180° | s = 10 × 180 = 1800 | ✗ | — |
| π rad | s = 10 × π ≈ 31.4 cm | ✓ | πr = 31.4 cm (half circumference ✓) |

> **Rule:** In the formula s = rθ, θ MUST be in radians.  If given degrees, convert first:
> θ_rad = θ_deg × π/180.

> **Why radians?**  One radian is the angle subtended when the arc length equals the radius.
> So s = rθ with θ in radians directly gives s in the same units as r.  Degrees have no such
> geometric meaning and produce numerically wrong results.

---

**Contrast B — Negative angles vs supplements.**

| Angle | Meaning | Terminal side |
|-------|---------|---------------|
| −60° | 60° clockwise from positive x-axis | Quadrant IV |
| 180° − 60° = 120° | supplement of 60° | Quadrant II |

These are **different**:
- −60° rotates **down** (CW) from the positive x-axis — terminal side in Q IV.
- 120° is the supplement of 60° — it is 120° CCW, terminal side in Q II.

A negative sign means CW rotation, **not** a change of direction to the supplement.

---

**Reference Angles (new concept):**

The **reference angle** for θ is the acute angle (between 0° and 90°) formed between the
terminal side and the **nearest x-axis**.

| Quadrant of θ | Reference angle formula | Example: θ = 250° |
|:-------------:|------------------------|:-----------------:|
| Q I (0°–90°) | θ | — |
| Q II (90°–180°) | 180° − θ | — |
| Q III (180°–270°) | θ − 180° | 250° − 180° = 70° |
| Q IV (270°–360°) | 360° − θ | — |

Reference angles allow us to "reduce" any angle to its acute equivalent for trigonometric
calculations — the trig functions repeat with reference angles (covered in math.trig.right-triangle-trig).

**[P49 — ADAPTIVE CHECKPOINT]**

> A wheel of radius 4 cm rotates through an angle of 3π/4 radians CCW.
> (i) Find the arc length swept.
> (ii) Find the reference angle (in degrees).

Expected:
*(i) s = 4 × 3π/4 = 3π cm ≈ 9.42 cm.*
*(ii) 3π/4 rad = 135°.  This is in Q II.  Reference angle = 180° − 135° = 45°.*

- **CORRECT** (s = 3π, reference angle = 45°): ✓ Advance to TA-A04.
- **PARTIAL — arc wrong** (e.g. s = 4 × 135 = 540): MC-2 active. Route to TB-R02. Return.
- **PARTIAL — reference wrong** (e.g. says 135° itself): Re-read the Q II formula
  (180° − θ) and retry. If still wrong, route to TB-R03 (diagram).
- **INCORRECT** (both wrong): TB-R02 then TB-R03. Return.
- **NO_RESPONSE**: Scaffold "(i) s = r × θ where θ is in radians: s = 4 × 3π/4 = ?"

---

### TA-A04 · Terminal Mastery Gate (P91)

```
P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78
```

**[P77 — MULTI-PROBLEM SET]**  (4 questions)

**Q1.** Find a positive coterminal angle and a negative coterminal angle for −150°.

*(Target: Positive: −150° + 360° = 210°.  Negative: −150° − 360° = −510°.)*

**Q2.** A circle has radius 5 cm.  A central angle of 4π/3 radians is subtended.  Find the
arc length.

*(Target: s = 5 × 4π/3 = 20π/3 cm ≈ 20.9 cm.)*

**Q3.** The terminal side of an angle θ in standard position lies in quadrant III at 215°.
(i) Find the reference angle.  (ii) Is −145° coterminal with 215°?

*(Target: (i) 215° − 180° = 35°.  (ii) −145° + 360° = 215°. Yes, they are coterminal.)*

**Q4.** TRUE or FALSE: "The terminal side of −70° is in the same position as the terminal side of
110° (the supplement of 70°)."  Explain.

*(Target: FALSE.  −70° is 70° CW from the positive x-axis → terminal side in Q IV.  110° is
110° CCW → terminal side in Q II.  These are different positions.  The negative sign means CW,
not supplementary.)*

**[P55 — SCORE]**  Tally Q1–Q4.

---

**[P76 — TRANSFER PROBE]**  (P76_MODE = Independence)

*Independence probe — self-contained.*

> A wheel of radius 6 cm rotates counterclockwise by **5π/4 radians** from standard position.
>
> (a) Convert 5π/4 radians to degrees.
> (b) Find the arc length swept by a point on the rim.
> (c) Find the reference angle (in degrees).
> (d) Find a negative coterminal angle (in radians) in the interval (−2π, 0).

*Expected answers:*
*(a) 5π/4 × (180°/π) = 225°.*
*(b) s = 6 × 5π/4 = 15π/2 cm ≈ 23.6 cm.*
*(c) 225° is in Q III.  Reference angle = 225° − 180° = 45°.*
*(d) 5π/4 − 2π = 5π/4 − 8π/4 = −3π/4.  This is in (−2π, 0) ✓.*

**[P55 — SCORE]**  Award 1 point for P76 if all four parts correct; 0 otherwise.

---

**[P75 — MASTERY ASSESSMENT]**

```
PASS_CRITERION: 5 out of 5 items (4 P77 + 1 P76)
THRESHOLD:      0.90  →  ⌈0.90 × 5⌉ = 5
```

**[P55 — SCORE]**  Combine P77 tally + P76 score → total out of 5.

**[P74 — ROUTING DECISION]**

- **Score = 5/5 → MASTERY ACHIEVED.** Proceed to P78.
- **Score ≤ 4/5 → Identify which items failed:**
  - Q1 wrong → MC-1 residual → TB-R01 (abbreviated, one more coterminal pair example).
  - Q2 wrong → MC-2 → TB-R02.
  - Q3(i) wrong → reference angle formula error → re-read the Q III row of the formula table.
  - Q3(ii) wrong → MC-1 residual → TB-R01 (check by adding 360°).
  - Q4 wrong → MC-3 → TB-R03.
  - P76 wrong → map to part:
    (a) conversion error → review θ_rad × (180°/π);
    (b) MC-2 → TB-R02;
    (c) reference angle formula error → re-read formula;
    (d) MC-1 residual → TB-R01.
  - After repair, re-administer only the failed item.

**[P55 — SCORE]**  Record repair outcome.

**[P78 — COMPLETION]**

```
BLUEPRINT_ID:    math.trig.angle-measure
MASTERY_REACHED: true
UNLOCKS:         math.trig.right-triangle-trig, math.trig.unit-circle
NEXT_CONCEPT:    math.trig.unit-circle  (or math.trig.right-triangle-trig)
SESSION_CLOSE:   "You can now place any angle in standard position, find its coterminal
                  equivalents, compute arc lengths using s = rθ (θ in radians), and
                  reduce any angle to its reference angle. These skills are the direct
                  input to the unit circle and right-triangle trigonometry."
```

---

<!-- COMPONENT 5: PROTOCOL B (REPAIR) -->
## Component 5: Protocol B — Repair Chains

---

### TB-R01 · Repair: COTERMINAL-MEANS-DIFFERENT (MC-1)

**Trigger:** Student treats angles differing by 360° (or 2π) as having different terminal sides.

**Step 1 — Anchor: full revolution returns to start.**
> Starting from the positive x-axis, rotate CCW by 360°.  Where do you end up?
> Back at the positive x-axis.  You are in the exact same position.

**Step 2 — Apply to any angle.**
> If 30° puts the terminal side at a specific ray in Q I, then 30° + 360° = 390° performs that
> same rotation PLUS one full circle — ending at the same ray.
> Any multiple of 360° is "invisible" to the terminal side.

**Step 3 — Formula restatement.**
> Coterminal to θ: all angles of the form θ + 360°k (or θ + 2πk), k ∈ ℤ.

**Exit:** Return to TA-A02 P49 checkpoint.

---

### TB-R02 · Repair: ARC-LENGTH-IN-DEGREES (MC-2)

**Trigger:** Student uses s = rθ with θ in degrees.

**Step 1 — Show the formula's origin.**
> By definition, 1 radian is the angle where the arc length equals the radius.
> So when θ = 1 rad, s = r × 1 = r.  This is literally the definition of radian measure.
> s = rθ (radians) works because 1 radian was constructed to make arc = radius × angle.

**Step 2 — Show degrees give wrong units.**
> If θ = 30° and you write s = r × 30, the "30" is just a count of degree-units.
> Arc length must be in length units (cm, m), not degree-units.
> Only radian measure is dimensionless (radians = arc/radius = length/length), so θ in radians
> can multiply r (in cm) to give s in cm.

**Step 3 — Procedure.**
> If given θ in degrees: FIRST convert to radians, THEN apply s = rθ.
> Example: θ = 60°, r = 3 cm → θ_rad = 60 × π/180 = π/3 → s = 3 × π/3 = π ≈ 3.14 cm.

**Exit:** Return to TA-A03 P49 checkpoint, part (i).

---

### TB-R03 · Repair: NEGATIVE-ANGLE-MISREAD (MC-3)

**Trigger:** Student interprets −θ as the supplement (180°−θ) rather than a CW rotation by θ.

**Step 1 — Draw the standard-position diagram.**
> Draw a coordinate plane.  Mark 60° CCW from +x-axis — terminal side in Q I.
> Now draw −60°: start at +x-axis and rotate CW by 60° — terminal side in Q IV.

**Step 2 — Contrast with supplement.**
> Supplement of 60° = 180° − 60° = 120°.  Draw 120° CCW — terminal side in Q II.
> −60° (Q IV) ≠ 120° (Q II).  Completely different terminal sides.

**Step 3 — State the rule.**
> Negative sign = CLOCKWISE rotation by |θ|.
> Supplement = 180° − θ (no sign involved; always CCW; for angles less than 180°).
> These are unrelated concepts.  Never confuse them.

**Exit:** Return to TA-A03 P49 checkpoint, part (ii) — review the contrast table.

---

<!-- COMPONENT 6: P89 SPACED REPETITION -->
## Component 6: P89 Spaced Repetition

```
P89 SCHEDULE:
  Interval-1 (next session):
    Probe: "Find a positive coterminal angle for −200°. In which quadrant does the
            terminal side lie?"
    Target: −200° + 360° = 160°. Q II. PASS if both correct.

  Interval-2 (+3 days):
    Probe: "A circle has radius 3 cm. A central angle of π/2 radians subtends an arc.
            Find the arc length."
    Target: s = 3 × π/2 = 3π/2 cm. PASS if correct and θ was used in radians.

  Interval-3 (+1 week):
    Probe: "Find the reference angle for 7π/6."
    Target: 7π/6 rad = 210°. Q III. Reference angle = 210° − 180° = 30°. PASS if correct.

REACTIVATION_TRIGGER: Any probe fails → requeue TA-A02 (coterminal) or TA-A03 (arc/reference) as appropriate.
```

---

<!-- COMPONENT 7: CROSS-BLUEPRINT DEPENDENCIES -->
## Component 7: Cross-Blueprint Dependencies

```
PREREQUISITES_CONSUMED:
  math.geom.angle-measurement:
    Used in:   TA-A01 (degree-radian conversion assumed known; P11 uses 120° = 2π/3),
               TA-A02 (coterminal examples in both degrees and radians; conversion fluency needed),
               TA-A03 (P06: convert 3π/4 to 135° for reference angle; arc-length requires radian
                       conversion as a prerequisite skill),
               TA-A04 (Q1 uses −150° in degrees; Q2 arc length in radians; P76 converts 5π/4→225°).
    Assumed:   Student can convert between degrees and radians using θ_rad = θ_deg × π/180;
               knows acute/right/obtuse/reflex classification.

UNLOCKS_ENABLED:
  math.trig.right-triangle-trig:
    Dependency: Right-triangle definitions of sin/cos/tan use reference angles to extend to all
                quadrants; coterminal angles are needed to handle angles outside [0°, 90°].
  math.trig.unit-circle:
    Dependency: Unit circle coordinates are defined for angles in standard position; arc length
                formula s = rθ with r=1 gives s = θ directly; coterminal angles explain why trig
                functions are periodic with period 2π.

CROSS_LINKS_NOTED:
  (none)
```

---

<!-- COMPONENT 8: TEACHING NOTES -->
## Component 8: Teaching Notes

**1. The CPA entry at P is deliberate.**
Students who completed `math.geom.angle-measurement` have already done the Concrete layer (draw
the angle, measure with protractor, use the conversion formula).  Re-doing concrete work would
feel like revision and slow progress.  The standard-position diagram (TA-A01 P11) is the right
first Pictorial representation — it sets up everything that follows.

**2. MC-1 (coterminal = different) is the most consequential error for future trigonometry.**
If a student doesn't understand that 30° and 390° are coterminal, they will misinterpret the
periodicity of trig functions entirely.  TA-A02 must lock this in with the full-circle argument
before TA-A03's more complex content.

**3. The arc-length formula demands radian discipline.**
The most effective repair for MC-2 is TB-R02 Step 1 — the radian is literally defined so that
arc = radius × angle.  Once a student sees that the formula's derivation presupposes radians,
they understand why substituting degrees produces a dimensionally wrong answer.

**4. Reference angles bridge to trigonometry, but don't preview trig values here.**
TA-A03 introduces reference angles as the acute "shadow" angle to the x-axis.  This is
sufficient for this blueprint — the payoff (reference angle determines trig function magnitude)
belongs in math.trig.right-triangle-trig and math.trig.unit-circle.  Don't pre-empt those.

**5. Negative angles and supplements are a classic trap.**
The contrast table in TA-A03 Contrast B is the most direct pre-emption for MC-3.  If a student
is confused, TB-R03 uses a side-by-side diagram: −60° lands in Q IV; 120° (supplement of 60°)
lands in Q II.  The visual separation is more convincing than any algebraic argument.

**6. P76 probe is fully calibrated to the four skills.**
Parts (a) = conversion, (b) = arc length, (c) = reference angle, (d) = coterminal negative.
A student who answers all four has demonstrated mastery of every new concept in this blueprint,
independent of prerequisite content.

---

<!-- COMPONENT 10: VALIDATION CHECKLIST -->
## Component 10: Validation Checklist

```
VALIDATION CHECKLIST — math.trig.angle-measure
================================================

STRUCTURAL
[PASS] V-1   Blueprint has all 10 required components (0–8, 10).
[PASS] V-2   Metadata block complete: all 9 fields present and consistent with KG.
[PASS] V-3   SESSION_TA_CAP = 7; 4 TAs used ≤ 7.
[PASS] V-4   CPA_ENTRY_STAGE = P (proficient difficulty; Concrete already covered by prerequisite).
[PASS] V-5   P76_MODE = Independence with explicit rationale (cross_links = []).

MISCONCEPTION COVERAGE
[PASS] V-6   MC-1 FOUNDATIONAL identified; cleared at TA-A02 gate before TA-A03 (MAMR).
[PASS] V-7   MC-1 has dedicated gate TA (TA-A02, P41 + P64 — coterminal definition).
[PASS] V-8   MC-2 and MC-3 addressed after MC-1 (TA-A03 P06, TB-R02, TB-R03).
[PASS] V-9   All three MCs have repair chains in Protocol B.

GRAMMAR RULES
[PASS] V-10  GR-1: Every non-repair TA opens with B-category primitive.
               TA-A01→P03 ✓  TA-A02→P41 ✓  TA-A03→P06 ✓  TA-A04→P91(P77) ✓
[PASS] V-11  GR-2: Every non-gate TA has P49.
               TA-A01→P49 ✓  TA-A03→P49 ✓  (TA-A02 is a gate TA)
[PASS] V-12  GR-3: Terminal TA (TA-A04) is a mastery gate containing P91; structure terminal.
[PASS] V-13  GR-4: P41/P64 gate structure present in TA-A02 for MC-1.
[PASS] V-14  GR-6: P91 terminal in TA-A04 with correct compound
               P77→P55→P76→P55→P75→P55→P74→P55→P78. ✓
[PASS] V-15  GR-7: P76 included inside P91 in the mastery gate.
[PASS] V-16  GR-8: No cross_links to document (cross_links = []).
[PASS] V-17  GR-9: P76 uses Independence mode (cross_links = []); probe is self-contained
               (wheel of radius 6 cm, angle 5π/4 rad — no external Tier 1 concept required;
               conversion, arc length, reference angle, and coterminal computation all use only
               prerequisite math.geom.angle-measurement skills plus content from this blueprint).
[PASS] V-18  GR-10: MAMR stated in Component 3; enforced — MC-1 cleared at TA-A02 before TA-A03.

PASS CRITERION
[PASS] V-19  PASS_CRITERION = ⌈0.90 × 5⌉ = 5/5; composition = 4 P77 + 1 P76 = 5 items ✓.
[PASS] V-20  P74 routing covers all score outcomes (5/5 → pass; ≤4/5 → item-specific repair).

CONTENT
[PASS] AIR   Standard position defined (vertex at origin, initial side on +x).
             Positive = CCW, negative = CW established with P03 turntable analogy.
             Coterminal angles defined (θ + 360°k) with examples; P41/P64 gate in TA-A02.
             Arc length s = rθ (θ in radians) taught with contrast table and WHY explanation.
             Reference angles by quadrant (four formulae); introduced in TA-A03 and tested in Q3 + P76.
             MC-1 (coterminal = different) addressed by full-revolution anchor.
             MC-2 (arc length in degrees) addressed by radian definition in TB-R02.
             MC-3 (negative = supplement) addressed by side-by-side contrast in TA-A03 and TB-R03.
             P76 probe exercises all four new skills (conversion, arc length, reference,
             coterminal) in a single self-contained scenario.
             Prerequisite degree-radian conversion from math.geom.angle-measurement is used
             but not re-taught.

VERDICT: PACKAGE_READY
```
