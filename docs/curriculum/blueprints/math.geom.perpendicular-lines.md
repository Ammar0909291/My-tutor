# Teaching Blueprint: Perpendicular Lines

## Component 0 — Metadata Header

| Field | Value |
|---|---|
| BLUEPRINT_ID | math.geom.perpendicular-lines |
| KG_ID | math.geom.perpendicular-lines |
| KG_VERSION | v1.0.1 |
| STATUS | PACKAGE_READY |
| DOMAIN | Geometry |
| NAME | Perpendicular Lines |
| ALIASES | (none) |
| DIFFICULTY | foundational |
| BLOOM | understand |
| MASTERY_THRESHOLD | 0.90 |
| ESTIMATED_HOURS | 3 |
| REQUIRES | math.geom.angle |
| UNLOCKS | math.geom.right-triangle |
| CROSS_LINKS | (none) |
| CPA_ENTRY | C (Concrete) |
| SESSION_TA_CAP | 7 (hours ≥ 1h) |
| PROTOCOL_A_TA_COUNT | 4 (TA-A01 through TA-A04) |
| MASTERY_GATE_TA | TA-A04 (P91, terminal) |
| PASS_CRITERION | 5/5 (⌈0.90 × 5⌉ = 5; threshold = 0.90) |
| MAMR | MC-1 PERPENDICULAR-ONLY-H-V is FOUNDATIONAL; cleared before MC-2 or MC-3 in all repair routing |
| P76_MODE | Independence (cross_links = []; self-contained real-world context) |

---

## Component 1 — Cognitive Map

### Prerequisites Activated
- **math.geom.angle**: Two lines are perpendicular iff they form a right angle (90°) at their intersection. The right angle is the precise condition for perpendicularity.

### Target Understanding
1. Two lines ℓ and m are perpendicular (ℓ ⊥ m) iff they intersect at exactly 90°. The right-angle square symbol (□) marks the intersection.
2. When two lines are perpendicular, ALL FOUR angles at the intersection are 90°.
3. Perpendicularity requires intersection: parallel lines cannot be perpendicular. Two lines that intersect are perpendicular only if all four intersection angles equal 90°.
4. Perpendicularity is orientation-independent: lines at 45° and 135° from horizontal are perpendicular. The only condition is the right angle at the intersection.
5. The perpendicular from a point P (not on line ℓ) to ℓ is the unique line through P that meets ℓ at 90°. The foot F is the intersection point.
6. The perpendicular distance from P to ℓ = |PF| is the SHORTEST distance from P to any point on ℓ.

### Cross-Link Activation
- No cross-links. P76 uses an independence probe (city streets and shortest path).

---

## Component 2 — Misconception Registry

### MC-1 [FOUNDATIONAL] — PERPENDICULAR-ONLY-H-V
- **Trigger**: "Lines are perpendicular only if one is horizontal and one is vertical."
- **Root cause**: Most textbook examples show perpendicular lines aligned with coordinate axes. Learner overfits to horizontal+vertical as the defining visual pattern.
- **Error pattern**: Correctly identifies horizontal+vertical as perpendicular but says lines at 45° and 135° "aren't perpendicular because neither is horizontal or vertical."
- **Repair**: TA-B01.
- **MAMR**: FOUNDATIONAL — addressed in TA-A02 via P41/P64; if triggered later, route to TA-B01 before returning.

### MC-2 — INTERSECTING-IS-PERPENDICULAR
- **Trigger**: "Any two lines that cross are perpendicular."
- **Root cause**: Learner conflates "intersecting" with "perpendicular." All perpendicular lines intersect, but not all intersecting lines are perpendicular.
- **Error pattern**: Labels any X-shaped crossing as perpendicular without checking whether the angle is exactly 90°.
- **Repair**: TA-B02.
- **MAMR**: After MC-1 cleared. FIFO with MC-3.

### MC-3 — CLOSEST-NOT-PERPENDICULAR
- **Trigger**: "Any segment from point P to line ℓ can be called the shortest distance."
- **Root cause**: Learner doesn't know that the minimum distance has a specific geometric property (right angle to the line).
- **Error pattern**: Treats an oblique segment from P to ℓ as "equally short" as the perpendicular; doesn't recognize the perpendicular as uniquely minimal.
- **Repair**: TA-B03.
- **MAMR**: After MC-1 cleared. FIFO with MC-2.

---

## Component 3 — Scaffolding Protocol

### CPA Entry: Concrete
Open with a carpenter's T-square held against a straight edge (Concrete). Pictorial: two intersecting lines with □ at the intersection. Abstract: formal condition ℓ ⊥ m ↔ intersection angle = 90°; perpendicular distance definition.

### MAMR Enforcement
MC-1 addressed in TA-A02 (P41/P64). Route → TA-B01 if triggered later. MC-2 and MC-3 FIFO.

---

## Component 4 — Protocol A (Main Teaching Sequence)

### TA-A01 — Perpendicular Lines: The 90° Condition
**Primitives**: P03 → P11 → P49

**P03 (ANALOGY BRIDGE):**
- **Source**: A carpenter's T-square. One arm lies flat on the workpiece; the perpendicular arm meets it at exactly 90°. No matter how the carpenter tilts the board, the T-square always marks a right angle. The perpendicularity is in the RIGHT ANGLE ITSELF, not in "one arm is vertical."
- **Target**: Two perpendicular lines ℓ ⊥ m. The defining property is the 90° angle at the intersection — not the orientation of the lines in space.

**P11 (REPRESENTATION SHIFT):**
Three representations:
| Representation | Form | Key feature |
|---|---|---|
| Diagram | Two lines with □ at intersection | □ means all four angles = 90° |
| Symbolic | ℓ ⊥ m | "ℓ is perpendicular to m" |
| Condition | Intersection angle = 90° | The ONLY defining property |

Contrast: parallel lines (∥, no intersection) vs. perpendicular lines (⊥, intersect at 90°) vs. oblique intersecting lines (intersect but angle ≠ 90°).

**P49:** "Two lines form an X. The angle at the intersection is 70°. Are they perpendicular?"
- **CORRECT**: No — 70° ≠ 90°. They intersect obliquely. → TA-A02.
- **PARTIAL**: "Perpendicular requires exactly 90°. 70° gives oblique intersection." → TA-A02.
- **INCORRECT/NO_RESPONSE**: Contrast the 70° intersection diagram with a 90° one; show the □ only appears when the angle is exactly 90°. → TA-A02.

---

### TA-A02 — Misconception Gate: PERPENDICULAR-ONLY-H-V (FOUNDATIONAL)
**Primitives**: P41 → P64 → P49

**P41 (MISCONCEPTION DETECTOR):**
Probe: "A line runs diagonally at 45°. A second line runs at 135°. They intersect. Are they perpendicular?"
- If learner says "no — neither is horizontal or vertical": proceed to P64.
- If learner correctly says yes (90° difference): validate and advance.

**P64 (CONCEPTUAL SHIFT):**
"Perpendicularity is about the ANGLE AT INTERSECTION, not about orientation. The difference between the two line angles tells you the intersection angle:
- 135° − 45° = 90° → perpendicular ✓
- Horizontal (0°) + vertical (90°): 90° − 0° = 90° → perpendicular ✓
- 30° + 90°: 90° − 30° = 60° → NOT perpendicular ✗

TEST: Difference in line angles = 90° (mod 180°) → perpendicular. Orientation is irrelevant."

**P49:** "A line at 20° and a line at 110°. Are they perpendicular?"
- **CORRECT**: Yes — 110° − 20° = 90°. → TA-A03.
- **PARTIAL**: "Difference = 90° → the intersection angle is 90° → perpendicular." → TA-A03.
- **INCORRECT/NO_RESPONSE**: → TA-B01, then return.

---

### TA-A03 — Perpendicular Distance: The Shortest Path
**Primitives**: P06 → P49

**P06 (CONTRAST PAIR):**
| | Oblique segment PQ (Q on ℓ) | Perpendicular segment PF (F = foot) |
|---|---|---|
| Angle with ℓ | ≠ 90° | Exactly 90° |
| Length | > perpendicular distance | SHORTEST distance from P to ℓ |
| How many from P to ℓ? | Infinitely many (one per choice of Q) | Exactly one (unique) |
| Symbol | PQ (oblique) | PF; F = foot of perpendicular |

Intuition: Think of a leaning ladder from point P to a wall ℓ. A vertical (perpendicular) ladder is shorter than any tilted ladder reaching the same height — the tilt always adds length. The perpendicular segment is the "straightest" path to the line.

**P49:** "Point P is 6 cm from line ℓ (perpendicular distance). A segment from P to a point Q on ℓ makes a 70° angle with ℓ. Is PQ shorter than, equal to, or longer than 6 cm?"
- **CORRECT**: Longer — any non-perpendicular segment from P to ℓ is longer than the perpendicular distance. → TA-A04.
- **PARTIAL**: "The 6 cm perpendicular is the shortest. Any other segment, including the 70° one, is longer." → TA-A04.
- **INCORRECT/NO_RESPONSE**: "In the right triangle PFQ, PF = 6 cm is a leg and PQ is the hypotenuse. Hypotenuse > leg, so PQ > 6 cm." → TA-A04.

---

### TA-A04 — P91 Mastery Gate (Terminal)
**Primitive**: P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78

**[GR-3: Terminal TA]** **[GR-6: P91 terminal]** **[GR-7: P76 present]**

**P77 (MULTI-PROBLEM SET):**
Q1: Two lines intersect at 90°. Are they perpendicular? How many of the four angles at the intersection equal 90°?
Q2: Line ℓ and line m intersect at 55°. Are ℓ and m perpendicular?
Q3: A line runs at 30° from horizontal. At what angle from horizontal must a perpendicular line run?
Q4: True or False: In a plane, if ℓ ⊥ m and ℓ ⊥ n, then m ∥ n.

**P55 (SCORE):**
Q1: Yes — perpendicular. All FOUR angles = 90° (if one is 90°, the vertical angle is also 90°, and the supplementary angle is 180°−90°=90°, so all four are 90°).
Q2: No — 55° ≠ 90°. The lines intersect obliquely.
Q3: 30° + 90° = 120° from horizontal (or 30° − 90° = −60°, i.e., 60° below horizontal). The perpendicular line differs from the 30° line by exactly 90°.
Q4: TRUE — in a plane, two lines both perpendicular to the same line are parallel to each other. (Both make 90° with ℓ, so they make 0° with each other — parallel.)

**P76 (TRANSFER PROBE — Independence):**
A city planner designs two streets. Street A runs diagonally at 40° from East. Street B must be perpendicular to Street A.
(a) At what angle from East must Street B run?
(b) A pedestrian at point P is 100 m from Street A (measured along the perpendicular). The pedestrian can also walk at a 75° angle to Street A to reach it. Is that 75° path shorter than 100 m?
(c) How many perpendicular routes from P reach Street A?

**Expected**: (a) 40° + 90° = 130° from East (or 40° − 90° = −50°, both perpendicular directions). (b) No — the perpendicular distance (100 m) is the shortest path; any non-perpendicular path is longer. (c) Exactly one — only one perpendicular from an external point to a line.

**P55 (SCORE):** Street B angle correct; 75° path identified as longer than 100 m; uniqueness of perpendicular confirmed.

**P75 (MASTERY ASSESSMENT):** Items: Q1, Q2, Q3, Q4, P76 = **5 items**. Pass: **5/5** (⌈0.90×5⌉ = 5).
- PASS → P78.
- FAIL → P74.

**P74 (ROUTING DECISION):**
- PASS → P78.
- Q3 wrong due to orientation error → TA-B01 (PERPENDICULAR-ONLY-H-V; apply MAMR).
- Q2 wrong → TA-B02 (INTERSECTING-IS-PERPENDICULAR).
- P76(b) or Q4(implicit) wrong → TA-B03 (CLOSEST-NOT-PERPENDICULAR).
- Q1 wrong → re-teach TA-A01 four-angle property; re-gate.
- Multiple → MAMR: TA-B01 first; FIFO TA-B02, TA-B03; re-gate.

**P78 (COMPLETION):** Mastery confirmed. Schedule P89. Activate: math.geom.right-triangle.

---

## Component 5 — Protocol B (Repair Chains)

### TA-B01 — Repair MC-1 PERPENDICULAR-ONLY-H-V
**Primitives**: P41 → P06 → P64 → P49

**P41**: "You said perpendicular lines must be horizontal and vertical — what is the DEFINING property of perpendicularity?"

**P06 (CONTRAST):**
| | Horizontal + vertical | 45° + 135° | 20° + 110° |
|---|---|---|---|
| Angle difference | 90° − 0° = 90° | 135° − 45° = 90° | 110° − 20° = 90° |
| Perpendicular? | ✓ Yes | ✓ Yes | ✓ Yes |
| Why? | Intersection = 90° | Intersection = 90° | Intersection = 90° |

**P64**: "PERPENDICULAR = right angle at intersection. The orientation of the lines (horizontal, vertical, diagonal) is irrelevant. A line at 45° and a line at 135° differ by 90° and are perpendicular. The □ symbol appears whenever the intersection angle is exactly 90°, regardless of which direction the lines run."

**P49**: "A line at 70° and a line at 160°. Are they perpendicular?"
- **CORRECT**: Yes — 160° − 70° = 90°. → return.
- **PARTIAL/INCORRECT/NO_RESPONSE**: "160° − 70° = 90°. The intersection angle = 90° → perpendicular. Orientation doesn't matter." → return.

---

### TA-B02 — Repair MC-2 INTERSECTING-IS-PERPENDICULAR
**Primitives**: P06 → P27 → P49

**P27**: "MC-2 INTERSECTING-IS-PERPENDICULAR: 'Any crossing lines are perpendicular.' Wrong. Perpendicular = intersection AT EXACTLY 90°. Two lines can intersect at any angle from just above 0° to just below 180°. Only the special case of 90° is called perpendicular. Every perpendicular pair intersects, but most intersecting pairs are NOT perpendicular."

**P06 (CONTRAST):**
| | Intersecting (general) | Perpendicular (special case) |
|---|---|---|
| Do they meet? | Yes | Yes |
| Intersection angle | Any θ ≠ 0° | Exactly 90° |
| Symbol | No special symbol | ⊥ symbol; □ at intersection |
| Example | 50° intersection | 90° intersection |

**P49**: "Three pairs of intersecting lines make angles 45°, 90°, and 120° at their intersections. Which pair is perpendicular?"
- **CORRECT**: The 90° pair only. → return.
- **PARTIAL/INCORRECT/NO_RESPONSE**: "Only 90° = perpendicular. 45° and 120° are oblique intersections." → return.

---

### TA-B03 — Repair MC-3 CLOSEST-NOT-PERPENDICULAR
**Primitives**: P27 → P06 → P49

**P27**: "MC-3 CLOSEST-NOT-PERPENDICULAR: 'Any segment from P to ℓ can be the shortest.' Wrong. There is EXACTLY ONE shortest path from an external point P to a line ℓ — the PERPENDICULAR segment PF. Every other segment from P to any other point on ℓ is strictly longer. This is a geometric theorem: in a right triangle, the legs are shorter than the hypotenuse."

**P06 (CONTRAST):**
| | Oblique segment PQ | Perpendicular segment PF |
|---|---|---|
| Length vs. |PF| | > |PF| (longer) | |PF| (minimum) |
| Role in right triangle | Hypotenuse | Leg |
| How many such segments? | Infinitely many | Exactly 1 |
| Is it the shortest? | No | Yes — uniquely shortest |

**P49**: "P is 8 cm from line ℓ (perpendicular distance). Is there any segment from P to ℓ shorter than 8 cm?"
- **CORRECT**: No — 8 cm is the perpendicular distance, the minimum. Every other segment from P to ℓ is longer. → return.
- **PARTIAL/INCORRECT/NO_RESPONSE**: "The perpendicular distance is the SHORTEST possible. No other segment from P to ℓ can be shorter than 8 cm." → return.

---

## Component 6 — P89 Spaced Repetition Schedule

| Interval | Review Content | Pass Criterion |
|---|---|---|
| Day 1 | Q1 (four angles) + Q2 (55° intersection) | 2/2 |
| Day 3 | Q3 (perpendicular line angle) + P76 (a, c) | 2/2 |
| Day 7 | Mixed 2-item: identify perpendicular vs. oblique; state why perpendicular distance is shortest | 2/2 |
| Day 21 | Q1, Q2, Q3, Q4 (4 items) | 4/4 |
| Day 60 | Full 5-item mastery gate | 5/5 |

**Decay**: Failure → reset to Day 1 + TA-B routing.

---

## Component 7 — Cross-Blueprint Dependencies

### Input Dependencies
| Blueprint | KG ID | What it supplies |
|---|---|---|
| Angle | math.geom.angle | The right angle (90°) is the defining condition for perpendicularity |

### Output Unlocks
| Blueprint | KG ID | What this blueprint enables |
|---|---|---|
| Right Triangle | math.geom.right-triangle | A right triangle contains exactly one 90° angle — the angle formed by two perpendicular sides |

### Cross-Links
- None.

---

## Component 8 — Teaching Notes

1. **Four angles at intersection**: When two lines intersect, they always create two pairs of vertical angles. If one angle is 90°, then its vertical angle is also 90°, and the adjacent supplementary angles (180°−90°=90°) are also 90°. All four angles are right angles — this is what the □ symbol asserts.
2. **Uniqueness of perpendicular from a point**: Exactly one perpendicular line can be drawn from an external point P to a given line ℓ. This uniqueness is crucial for the distance definition to be well-posed.
3. **Perpendicularity vs. orthogonality**: "Orthogonal" is the generalization of perpendicular to higher dimensions and abstract vector spaces. Do not introduce this term here — it belongs to linear algebra.
4. **Bloom=understand**: Learners must explain WHY orientation doesn't determine perpendicularity (MC-1 fix) and WHY the perpendicular gives the shortest distance (MC-3 fix). These explanations, not just correct answers, are the "understand" deliverable.

---

## Component 10 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | Blueprint ID matches KG node ID | ✓ math.geom.perpendicular-lines |
| V-2 | KG node ID exists in graph.json v1.0.1 | ✓ Verified |
| V-3 | All Component 0 fields populated | ✓ |
| V-4 | DIFFICULTY matches KG (foundational) | ✓ |
| V-5 | BLOOM matches KG (understand) | ✓ |
| V-6 | MASTERY_THRESHOLD matches KG (0.90) | ✓ |
| V-7 | ESTIMATED_HOURS matches KG (3) | ✓ |
| V-8 | REQUIRES listed; blueprint exists | ✓ math.geom.angle ✓ |
| V-9 | CPA_ENTRY correct (foundational → C) | ✓ C |
| V-10 | SESSION_TA_CAP correct (hours=3 ≥ 1h → max 7; used 4) | ✓ 4 ≤ 7 |
| V-11 | GR-1: non-repair TAs open with B-category primitive | ✓ A01:P03, A02:P41, A03:P06 |
| V-12 | GR-2: every non-gate TA has P49 | ✓ TA-A01, TA-A02, TA-A03 |
| V-13 | GR-3: mastery gate TA is terminal | ✓ TA-A04 uses P91 |
| V-14 | GR-4: P41/P64 gates repair chain in TA-A02 | ✓ P41 detects MC-1; P64 shifts H-V→angle-difference rule |
| V-15 | GR-6: P91 terminal in TA-A04 | ✓ |
| V-16 | GR-7: P76 in mastery gate | ✓ P76 independence probe (city streets, shortest path) |
| V-17 | GR-8: cross_links documented | ✓ (none) — stated in Component 0 and Component 7 |
| V-18 | GR-9: P76 mode correct (cross_links=[] → independence probe) | ✓ |
| V-19 | GR-10: MAMR stated and enforced | ✓ MC-1 FOUNDATIONAL; P74 routing |
| V-20 | Protocol B TAs open with B-category primitive | ✓ B01:P41, B02:P06, B03:P27 |
| AIR | All content fully specified; human tutor can execute without AI | ✓ |

**PACKAGE_READY**: V-1 through V-20 PASS. AIR PASS.
