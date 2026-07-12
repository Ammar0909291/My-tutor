# Teaching Blueprint: Angle

## Component 0 — Metadata Header

| Field | Value |
|---|---|
| BLUEPRINT_ID | math.geom.angle |
| KG_ID | math.geom.angle |
| KG_VERSION | v1.0.1 |
| STATUS | PACKAGE_READY |
| DOMAIN | Geometry |
| NAME | Angle |
| ALIASES | (none) |
| DIFFICULTY | foundational |
| BLOOM | understand |
| MASTERY_THRESHOLD | 0.90 |
| ESTIMATED_HOURS | 5 |
| REQUIRES | math.geom.ray |
| UNLOCKS | math.geom.triangle, math.trig.right-triangle-trig |
| CROSS_LINKS | math.trig.angle-measure |
| CPA_ENTRY | C (Concrete) |
| SESSION_TA_CAP | 7 (hours ≥ 1h) |
| PROTOCOL_A_TA_COUNT | 5 (TA-A01 through TA-A05) |
| MASTERY_GATE_TA | TA-A05 (P91, terminal) |
| PASS_CRITERION | 6/6 (⌈0.90 × 6⌉ = 6; threshold = 0.90) |
| MAMR | MC-1 ANGLE-DEPENDS-ON-RAY-LENGTH is FOUNDATIONAL; cleared before MC-2 or MC-3 in all repair routing |
| P76_MODE | Cross-link (cross_links = [math.trig.angle-measure]; P76 references degree-radian conversion and angle measure) |

---

## Component 1 — Cognitive Map

### Prerequisites Activated
- **math.geom.ray**: A ray is a half-line with one endpoint and infinite extent in one direction. An angle is formed by TWO rays sharing a common endpoint (vertex).

### Target Understanding
1. An angle is the figure formed by two rays (sides) sharing a common endpoint (vertex). Written ∠ABC: vertex at B; sides are →BA and →BC.
2. Angle measure = the amount of rotation between the two sides. It is a positive quantity independent of the length of the rays.
3. Degree measure: full rotation = 360°. Classifications: acute (0° < θ < 90°), right (θ = 90°), obtuse (90° < θ < 180°), straight (θ = 180°), reflex (180° < θ < 360°).
4. Radian measure: full rotation = 2π rad. Conversion: θ_rad = θ_deg × π/180. Right angle = π/2 rad; straight angle = π rad.
5. ∠ABC = ∠CBA — an angle is symmetric in its naming; the vertex letter is always in the middle.
6. Complementary angles sum to 90°; supplementary angles sum to 180°.

### Cross-Link Activation
- **math.trig.angle-measure**: Angle measure in degrees and radians is the foundational input for all trigonometric functions. P76 previews radian-degree conversion and the surveyor-angle context used in trigonometry.

---

## Component 2 — Misconception Registry

### MC-1 [FOUNDATIONAL] — ANGLE-DEPENDS-ON-RAY-LENGTH
- **Trigger**: "A bigger angle has longer sides (rays)" or "angles with shorter drawn rays look smaller."
- **Root cause**: Physical experience with diagrams — wider-looking angles often have longer drawn lines. Learner conflates the visual area between rays with the angular measurement.
- **Error pattern**: Compares two angles by the length of their rays; says ∠ABC > ∠DEF because ray BA is longer than ray ED in the diagram.
- **Repair**: TA-B01.
- **MAMR**: FOUNDATIONAL — addressed in TA-A02 via P41/P64; if triggered later, route to TA-B01 before returning.

### MC-2 — ANGLE-DEGREES-ONLY
- **Trigger**: "Angles can only be measured in degrees; π/2 radians isn't a real angle" or "I don't understand what a radian is."
- **Root cause**: Degrees are introduced first and feel concrete (360° for a full turn is familiar). Radians feel abstract.
- **Error pattern**: Rejects radian notation; cannot convert 90° to π/2; says "π/2 isn't a number, it's just π divided by 2."
- **Repair**: TA-B02.
- **MAMR**: After MC-1 cleared. FIFO with MC-3.

### MC-3 — ANGLE-VERTEX-IS-FIRST-LETTER
- **Trigger**: "In ∠ABC, the vertex is at A" (vertex is always at B — the middle letter).
- **Root cause**: Reading left-to-right, A is the first letter encountered, so learner assumes A is the special point.
- **Error pattern**: Identifies the wrong vertex in ∠PQR (says P instead of Q); draws the angle turn at A when given ∠ABC.
- **Repair**: TA-B03.
- **MAMR**: After MC-1 cleared. FIFO with MC-2.

---

## Component 3 — Scaffolding Protocol

### CPA Entry: Concrete
Open with a physical protractor and two pencils or a door opening on a hinge (Concrete). Pictorial: draw two rays from a vertex B with an arc between them. Abstract: the angle as a measure of rotation; conversion formula θ_rad = θ_deg × π/180.

### MAMR Enforcement
MC-1 addressed in TA-A02 (P41/P64). Route → TA-B01 if triggered later. MC-2 and MC-3 FIFO.

---

## Component 4 — Protocol A (Main Teaching Sequence)

### TA-A01 — Angle as a Figure of Two Rays at a Common Vertex
**Primitives**: P03 → P11 → P49

**P03 (ANALOGY BRIDGE):**
- **Source**: The hands of a clock. At any moment, the hour hand and minute hand both start at the center of the clock (the common endpoint) and extend outward. The "spread" between the two hands — the amount of rotation from one to the other — is an angle. Whether the clock is a tiny wristwatch or a giant tower clock, if the hands show the same time, the angle between them is the same. The length of the hands does not change the angle.
- **Target**: Angle ∠ABC. The vertex B is the clock center (shared endpoint). Rays →BA and →BC are the two hands. The measure of ∠ABC = the rotation from one ray to the other, regardless of how far the rays extend.

**P11 (REPRESENTATION SHIFT):**
Three representations of angle ∠ABC:
| Representation | Form | Key feature |
|---|---|---|
| Diagram | Two rays from B with arc between them; label "∠ABC" | Arc marks the interior; tip arrows on rays |
| Symbolic | ∠ABC (or ∠B when unambiguous) | Middle letter = vertex; outer letters = points on each ray |
| Numeric | m∠ABC = 45° or m∠ABC = π/4 rad | Measure is a positive real number; units: degrees or radians |

Contrast: a single ray (one arm); a straight line (two opposite rays, 180°); a right angle (quarter turn, 90° = π/2 rad).

**P49:** "Two clock hands both start at the center. If you shorten the hands by half, does the angle between them change?"
- **CORRECT**: No — the angle is the rotation between the rays. Shorter rays = same rotation = same angle. → TA-A02.
- **PARTIAL**: "The angle measures rotation, not length. Same opening → same angle." → TA-A02.
- **INCORRECT/NO_RESPONSE**: Draw two copies of ∠ABC with different ray lengths but the same arc — show the arc (rotation) is identical. → TA-A02.

---

### TA-A02 — Misconception Gate: ANGLE-DEPENDS-ON-RAY-LENGTH (FOUNDATIONAL)
**Primitives**: P41 → P64 → P49

**P41 (MISCONCEPTION DETECTOR):**
Probe: "∠ABC has rays drawn 3 cm long. ∠DEF has rays drawn 6 cm long. Both show the same opening. Which angle is bigger?"
- If learner says "∠DEF — the rays are longer": proceed to P64.
- If learner correctly says "they are equal (same opening = same angle)": validate and advance.

**P64 (CONCEPTUAL SHIFT):**
"Angle measure = AMOUNT OF ROTATION between the two rays. The arc between the rays captures this rotation — nothing else. Ray length is irrelevant because:
- A protractor measures the arc, not how far the rays extend.
- Drawing longer rays doesn't open up the angle — it just gives more room on the page.

Two angles with identical openings have identical measures even if drawn on different scales. The measure depends only on the SPREAD at the vertex, not the extent of the rays."

**P49:** "A protractor reads ∠PQR = 60°. If the rays of ∠PQR are extended to twice their length, what is the new measure?"
- **CORRECT**: Still 60° — extending the rays doesn't change the angle. → TA-A03.
- **PARTIAL**: "The measure stays 60°. Angle = rotation, not ray length." → TA-A03.
- **INCORRECT/NO_RESPONSE**: → TA-B01, then return.

---

### TA-A03 — Angle Classification
**Primitives**: P04 → P49

**P04 (PATTERN INDUCTION):**
Observe angles rotating from 0° to 360°:
| Type | Range | Example (°) | Radian equiv. | Memory hook |
|---|---|---|---|---|
| Acute | 0° < θ < 90° | 45° | π/4 | "Sharp" — less than a corner |
| Right | θ = 90° | 90° | π/2 | "Square corner" — exactly quarter turn |
| Obtuse | 90° < θ < 180° | 135° | 3π/4 | "Blunt" — past the corner, not yet flat |
| Straight | θ = 180° | 180° | π | "Flat line" — two opposite rays |
| Reflex | 180° < θ < 360° | 270° | 3π/2 | "Bent back" — more than half turn |

Pattern: Classification depends entirely on the measure (rotation amount). Boundary values (90°, 180°) are special names (right, straight); everything else falls in one of the ranges.

**P49:** "Classify: (A) 30°; (B) 90°; (C) 150°; (D) 180°; (E) 210°."
- **CORRECT**: (A) Acute, (B) Right, (C) Obtuse, (D) Straight, (E) Reflex. → TA-A04.
- **PARTIAL**: Address missed classifications. Reinforce boundaries (90° = right, 180° = straight). → TA-A04.
- **INCORRECT/NO_RESPONSE**: Cover each range with the table; re-probe a single angle type. → TA-A04.

---

### TA-A04 — Degrees and Radians
**Primitives**: P06 → P49

**P06 (CONTRAST PAIR):**
| | Degrees | Radians |
|---|---|---|
| Full rotation | 360° | 2π rad |
| Half rotation | 180° | π rad |
| Quarter rotation (right angle) | 90° | π/2 rad |
| To convert → radians | × (π/180) | — |
| To convert → degrees | — | × (180/π) |
| Context | Everyday geometry, navigation, maps | Calculus, trigonometry, physics |

Both systems measure the same rotation — 360° and 2π rad are the same full turn. A right angle is 90° = π/2 rad regardless of which unit system you use.

**P49:** "What is 90° in radians? What is π radians in degrees?"
- **CORRECT**: 90° = π/2 rad; π rad = 180°. → TA-A05.
- **PARTIAL**: Walk through one conversion (90° × π/180 = π/2); prompt the reverse. → TA-A05.
- **INCORRECT/NO_RESPONSE**: "Full rotation: 360° = 2π rad. So 90° = 2π/4 = π/2 rad. And π rad = 180° because π is half of 2π (half rotation)." → TA-A05.

---

### TA-A05 — P91 Mastery Gate (Terminal)
**Primitive**: P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78

**[GR-3: Terminal TA]** **[GR-6: P91 terminal]** **[GR-7: P76 present]**

**P77 (MULTI-PROBLEM SET):**
Q1: In ∠ABC, which point is the vertex?
Q2: ∠PQR and ∠STU both measure 45°. Ray QP = 3 cm; ray TS = 6 cm. Are the angles equal in measure?
Q3: Classify: (a) 75°; (b) 180°; (c) 225°.
Q4: Convert: (a) 60° to radians; (b) π/3 rad to degrees.
Q5: True or False: ∠ABC = ∠CBA.

**P55 (SCORE):**
Q1: B — vertex is always the middle letter in the angle name.
Q2: Yes — ∠PQR = ∠STU = 45°. Angle measure depends on rotation, not ray length.
Q3: (a) Acute (0° < 75° < 90°); (b) Straight (180°); (c) Reflex (180° < 225° < 360°).
Q4: (a) 60° × π/180 = π/3 rad; (b) π/3 × 180/π = 60°.
Q5: TRUE — ∠ABC = ∠CBA. The vertex (B) is always the middle letter; swapping the outer letters names the same angle.

**P76 (TRANSFER PROBE — Cross-link: math.trig.angle-measure):**
A surveyor at station S measures the angle between two sight lines: one toward landmark A, one toward landmark B. The instrument reads 60°.
(a) Express the surveyor's 60° angle in radians.
(b) A colleague asks for the complementary angle (the angle that together with 60° makes a right angle). What is it in degrees and in radians?
(c) The surveyor extends both sight lines by 50 m. Does the angle at S change?

**Expected**: (a) 60° × π/180 = π/3 rad. (b) Complement = 90° − 60° = 30° = π/6 rad. (c) No — extending sight lines (rays) does not change the angle; it depends only on rotation, not on distance.

**P55 (SCORE):** Conversion correct; complementary angle given in both units; ray-length independence confirmed.

**P75 (MASTERY ASSESSMENT):** Items: Q1, Q2, Q3, Q4, Q5, P76 = **6 items**. Pass: **6/6** (⌈0.90×6⌉ = 6).
- PASS → P78.
- FAIL → P74.

**P74 (ROUTING DECISION):**
- PASS → P78.
- Q2 wrong or P76(c) wrong → TA-B01 (ANGLE-DEPENDS-ON-RAY-LENGTH; apply MAMR).
- Q4 or P76(a,b) wrong → TA-B02 (ANGLE-DEGREES-ONLY).
- Q1 or Q5 wrong → TA-B03 (ANGLE-VERTEX-IS-FIRST-LETTER).
- Q3 wrong → re-teach TA-A03 classification table; re-gate.
- Multiple → MAMR: TA-B01 first; FIFO TA-B02, TA-B03; re-gate.

**P78 (COMPLETION):** Mastery confirmed. Schedule P89. Activate: math.geom.triangle, math.trig.right-triangle-trig.

---

## Component 5 — Protocol B (Repair Chains)

### TA-B01 — Repair MC-1 ANGLE-DEPENDS-ON-RAY-LENGTH
**Primitives**: P41 → P06 → P64 → P49

**P41**: "You compared ray lengths — what does the arc between the rays measure? Is that arc length changed by extending the rays?"

**P06 (CONTRAST):**
| | What changes when rays are lengthened | What does NOT change |
|---|---|---|
| Ray length | Yes — rays get longer | — |
| Area of region between rays | Yes — region enlarges | — |
| Angle measure (rotation) | — | ✓ Stays exactly the same |

**P64**: "An ANGLE measures ROTATION — the spread between the two rays at the vertex. Extending the rays adds more of the same rays; it does not open or close the angle. A protractor placed at the vertex always gives the same reading, regardless of how long the rays are drawn."

**P49**: "Large clock (30 cm hands) and small clock (5 cm hands) both show 3:00. Are the angles between the hands the same?"
- **CORRECT**: Yes — both show 90° (the quarter-turn from 12 to 3). Clock size doesn't change the angle. → return.
- **PARTIAL/INCORRECT/NO_RESPONSE**: "3:00 means the minute hand at 12, hour hand at 3 — always 90° regardless of clock size. The rotation from 12 to 3 is always one quarter turn." → return.

---

### TA-B02 — Repair MC-2 ANGLE-DEGREES-ONLY
**Primitives**: P06 → P27 → P49

**P27**: "MC-2 ANGLE-DEGREES-ONLY: 'Radians aren't real.' Wrong. RADIANS are the natural mathematical unit for angles. Definition: 1 radian is the angle that subtends an arc equal in length to the radius. For a unit circle (radius 1), the full circumference is 2π — so a full rotation = 2π radians. This is why calculus and physics use radians: derivatives of trig functions are simplest in radians."

**P06 (CONTRAST):**
| | Degrees | Radians |
|---|---|---|
| Origin | Babylonian (360 divisible by 2,3,4,5,6…) | Mathematical (arc/radius; unit circle circumference) |
| Full rotation | 360° | 2π ≈ 6.2832 rad |
| Right angle | 90° | π/2 ≈ 1.5708 rad |
| Natural for | Everyday geometry, navigation | Calculus, physics, trig functions |

**P49**: "Express a right angle in radians."
- **CORRECT**: π/2 rad. (90° × π/180 = π/2.) → return.
- **PARTIAL/INCORRECT/NO_RESPONSE**: "Full circle = 360° = 2π rad. Half = 180° = π rad. Quarter = 90° = π/2 rad. A right angle = π/2 radians." → return.

---

### TA-B03 — Repair MC-3 ANGLE-VERTEX-IS-FIRST-LETTER
**Primitives**: P27 → P06 → P49

**P27**: "MC-3 ANGLE-VERTEX-IS-FIRST-LETTER: 'In ∠ABC, vertex is A.' Wrong. THE MIDDLE LETTER IS ALWAYS THE VERTEX. In ∠ABC, vertex = B. The rays are →BA (from B toward A) and →BC (from B toward C). A and C are points on the rays, not the vertex. The angle 'lives' at B — B is the shared endpoint of both rays."

**P06 (CONTRAST):**
| Angle name | Vertex | Ray 1 | Ray 2 | Common error |
|---|---|---|---|---|
| ∠ABC | B (middle) | →BA | →BC | "Vertex is A" ✗ |
| ∠PQR | Q (middle) | →QP | →QR | "Vertex is P" ✗ |
| ∠XYZ | Y (middle) | →YX | →YZ | "Vertex is X" ✗ |

**∠ABC = ∠CBA**: same vertex (B), same two rays (→BA and →BC) — just listed in different order.

**P49**: "Name the vertex and both rays of ∠PQR."
- **CORRECT**: Vertex = Q; rays = →QP and →QR. → return.
- **PARTIAL/INCORRECT/NO_RESPONSE**: "P-Q-R: middle letter = Q = vertex. From Q: one ray goes toward P (→QP), the other toward R (→QR)." → return.

---

## Component 6 — P89 Spaced Repetition Schedule

| Interval | Review Content | Pass Criterion |
|---|---|---|
| Day 1 | Q1 (vertex) + Q2 (ray-length independence) | 2/2 |
| Day 3 | Q3 (classify 3 angles) + Q4 (convert 1 angle) | 2/2 |
| Day 7 | Mixed 3-item: name vertex, classify, convert 45° to radians | 3/3 |
| Day 21 | Q1, Q2, Q3, Q4, Q5 (5 items) | 5/5 |
| Day 60 | Full 6-item mastery gate | 6/6 |

**Decay**: Failure → reset to Day 1 + TA-B routing.

---

## Component 7 — Cross-Blueprint Dependencies

### Input Dependencies
| Blueprint | KG ID | What it supplies |
|---|---|---|
| Ray | math.geom.ray | An angle is formed by two rays sharing a common endpoint (the vertex); ray direction and endpoint concepts are prerequisite |

### Output Unlocks
| Blueprint | KG ID | What this blueprint enables |
|---|---|---|
| Triangle | math.geom.triangle | Triangles have three interior angles; angle classification is prerequisite for triangle types |
| Right Triangle Trig | math.trig.right-triangle-trig | Trig ratios (sin, cos, tan) are defined for angles in right triangles |

### Cross-Links
- **math.trig.angle-measure**: Degree-radian conversion and the unit-circle radian definition; P76 previews this connection through the surveyor scenario.

---

## Component 8 — Teaching Notes

1. **Bloom=understand at foundational difficulty**: Learners must explain (not just recall) why angle measure is independent of ray length, and correctly apply the degree-radian conversion. The understand level is satisfied by correct explanation in Q2 and correct application in Q4/P76.
2. **Sign convention**: At this level, angles are positive and at most 360°. Directed/signed angles (negative for clockwise, angles > 360°) belong to trigonometry; do not introduce here.
3. **Interior vs. reflex**: An angle ∠ABC naturally refers to the smaller angle (≤ 180°) unless "reflex" is explicitly specified. Mention this convention if the learner asks about angles greater than 180°.
4. **Complementary/supplementary**: Briefly defined in Target Understanding; not deeply assessed here. Full treatment comes with angle-pair relationships in math.geom.triangle.
5. **CPA concrete**: Use a physical door hinge (Concrete), drawn rays with arc (Pictorial), then the rotation formula (Abstract). The clock-hands analogy bridges Concrete to Pictorial.

---

## Component 10 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | Blueprint ID matches KG node ID | ✓ math.geom.angle |
| V-2 | KG node ID exists in graph.json v1.0.1 | ✓ Verified |
| V-3 | All Component 0 fields populated | ✓ |
| V-4 | DIFFICULTY matches KG (foundational) | ✓ |
| V-5 | BLOOM matches KG (understand) | ✓ |
| V-6 | MASTERY_THRESHOLD matches KG (0.90) | ✓ |
| V-7 | ESTIMATED_HOURS matches KG (5) | ✓ |
| V-8 | REQUIRES listed; blueprint exists | ✓ math.geom.ray ✓ |
| V-9 | CPA_ENTRY correct (foundational → C) | ✓ C |
| V-10 | SESSION_TA_CAP correct (hours=5 ≥ 1h → max 7; used 5) | ✓ 5 ≤ 7 |
| V-11 | GR-1: non-repair TAs open with B-category primitive | ✓ A01:P03, A02:P41, A03:P04, A04:P06 |
| V-12 | GR-2: every non-gate TA has P49 | ✓ TA-A01, TA-A02, TA-A03, TA-A04 |
| V-13 | GR-3: mastery gate TA is terminal | ✓ TA-A05 uses P91 |
| V-14 | GR-4: P41/P64 gates repair chain in TA-A02 | ✓ P41 detects MC-1; P64 shifts ray-length→rotation |
| V-15 | GR-6: P91 terminal in TA-A05 | ✓ |
| V-16 | GR-7: P76 in mastery gate | ✓ P76 cross-link probe (surveyor angle, degree-radian) |
| V-17 | GR-8: cross_links documented | ✓ math.trig.angle-measure — stated in Component 0 and Component 7 |
| V-18 | GR-9: P76 mode correct (cross_links=[math.trig.angle-measure] → cross-link probe) | ✓ |
| V-19 | GR-10: MAMR stated and enforced | ✓ MC-1 FOUNDATIONAL; P74 routing |
| V-20 | Protocol B TAs open with B-category primitive | ✓ B01:P41, B02:P06, B03:P27 |
| AIR | All content fully specified; human tutor can execute without AI | ✓ |

**PACKAGE_READY**: V-1 through V-20 PASS. AIR PASS.
