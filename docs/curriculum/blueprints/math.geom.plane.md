# Teaching Blueprint: Plane

## Component 0 — Metadata Header

| Field | Value |
|---|---|
| BLUEPRINT_ID | math.geom.plane |
| KG_ID | math.geom.plane |
| KG_VERSION | v1.0.1 |
| STATUS | PACKAGE_READY |
| DOMAIN | Geometry |
| NAME | Plane |
| ALIASES | geometric plane, flat surface |
| DIFFICULTY | foundational |
| BLOOM | remember |
| MASTERY_THRESHOLD | 0.95 |
| ESTIMATED_HOURS | 1 |
| REQUIRES | math.geom.line |
| UNLOCKS | math.geom.polygon, math.geom.coordinate-plane |
| CROSS_LINKS | math.geom.coordinate-plane |
| CPA_ENTRY | C (Concrete) |
| SESSION_TA_CAP | 7 (hours ≥ 1h) |
| PROTOCOL_A_TA_COUNT | 4 (TA-A01 through TA-A04) |
| MASTERY_GATE_TA | TA-A04 (P91, terminal) |
| PASS_CRITERION | 4/4 (⌈0.95 × 4⌉ = 4; threshold = 0.95) |
| MAMR | MC-1 PLANE-HAS-BOUNDARY is FOUNDATIONAL; cleared before MC-2 or MC-3 in all repair routing |
| P76_MODE | Cross-link (cross_links = [math.geom.coordinate-plane]; P76 references the xy-plane) |

---

## Component 1 — Cognitive Map

### Prerequisites Activated
- **math.geom.line**: A line is a one-dimensional geometric object extending infinitely in both directions with no endpoints. A plane is a two-dimensional geometric object — a flat surface that extends infinitely in all directions within that surface, contains infinitely many lines, and has no edges, corners, or thickness.

### Target Understanding
1. A plane is a flat, two-dimensional surface extending infinitely in all directions; it has zero thickness, no edges, and no boundary.
2. Three non-collinear points determine a unique plane — just as two distinct points determine a unique line. Two points (or three collinear points) determine only a line; they do not fix a unique plane.
3. A plane contains infinitely many lines. Any two distinct points in a plane determine a line that lies entirely within that plane.
4. Infinitely many planes can contain a single given line (imagine rotating a plane around the line as an axis — each rotation angle gives a different plane).
5. Two distinct planes are either parallel (no intersection) or intersect in a line.
6. Common physical models (sheets of paper, floors, tables) represent only bounded portions of a geometric plane.

### Cross-Link Activation
- **math.geom.coordinate-plane**: The xy-plane is the canonical example of a geometric plane — the set of all points (x, y, 0) in 3D space, extending infinitely in the x and y directions with no edges. P76 uses this connection directly.

---

## Component 2 — Misconception Registry

### MC-1 [FOUNDATIONAL] — PLANE-HAS-BOUNDARY
- **Trigger**: "A plane is like a sheet of paper — it has edges" or "a plane is a finite flat surface."
- **Root cause**: Every physical model of a plane (paper, table, floor, whiteboard) has visible edges. Learner overgeneralizes from the physical model to the geometric ideal.
- **Error pattern**: Says "the plane stops at the edge"; draws a border around a plane diagram; assigns a finite area to a plane.
- **Repair**: TA-B01.
- **MAMR**: FOUNDATIONAL — addressed in TA-A02 via P41/P64; if triggered later, route to TA-B01 before returning.

### MC-2 — PLANE-FROM-TWO-POINTS
- **Trigger**: "Two points determine a unique plane" (overapplying the two-point line rule).
- **Root cause**: The rule "two distinct points determine a unique line" is correct. Learner extends this by analogy: "two points must also determine a unique plane."
- **Error pattern**: Says "points A and B determine a unique plane"; doesn't recognize that a plane requires a third point not on line AB.
- **Repair**: TA-B02.
- **MAMR**: After MC-1 cleared. FIFO with MC-3.

### MC-3 — ONE-PLANE-PER-LINE
- **Trigger**: "A given line lies in exactly one plane."
- **Root cause**: Learner recalls that three non-collinear points determine a unique plane, and conflates this with "uniqueness" meaning "exclusivity per line."
- **Error pattern**: Claims only one plane can contain a given line; does not visualize rotating the plane around the line.
- **Repair**: TA-B03.
- **MAMR**: After MC-1 cleared. FIFO with MC-2.

---

## Component 3 — Scaffolding Protocol

### CPA Entry: Concrete
Open with a table or floor surface (Concrete). Pictorial: draw a parallelogram labeled α with no border markings to suggest edges, plus arrows pointing outward. Abstract: a plane as the set of all points satisfying ax + by + cz = d (a Cartesian equation); the xy-plane is z = 0.

### MAMR Enforcement
MC-1 addressed in TA-A02 (P41/P64). Route → TA-B01 if triggered later. MC-2 and MC-3 FIFO.

---

## Component 4 — Protocol A (Main Teaching Sequence)

### TA-A01 — Plane as an Infinite Flat Surface
**Primitives**: P03 → P11 → P49

**P03 (ANALOGY BRIDGE):**
- **Source**: The floor of a room. Now imagine extending that floor in every horizontal direction — past every wall, past every city, past every ocean, forever. The extended floor has no edges, no corners, no thickness — just a perfectly flat surface covering all of 2D space.
- **Target**: A geometric plane. It shares the flatness and the 2D nature of the floor, but not the finiteness. The plane extends infinitely in every direction within its flat surface and has no boundary.
- **Connection to line**: Just as a line contains infinitely many points, a plane contains infinitely many lines. Every two distinct points in the plane determine a line that lies entirely within the plane.

**P11 (REPRESENTATION SHIFT):**
Three representations of a plane:
| Representation | Form | Key feature |
|---|---|---|
| Diagram | Parallelogram labeled α with outward arrows or dashed edges | Partial view only; the actual plane extends past all drawn edges |
| Symbolic | Plane α; "plane through P, Q, R" | Three non-collinear points needed to name a unique plane |
| Coordinate | z = 0 (the xy-plane in 3D space) | All points at height zero, extending infinitely in x and y |

Dimensional contrast: point (0-D: no extent), line (1-D: infinite in 1 direction), plane (2-D: infinite in 2 directions), space (3-D: infinite in 3 directions).

**P49:** "Does a geometric plane have any edges or boundaries?"
- **CORRECT**: No — a plane extends infinitely in all directions within its flat surface; it has no edges, corners, or boundary. → TA-A02.
- **PARTIAL**: "The diagram shows a portion of the plane. The actual plane continues forever past every drawn edge." → TA-A02.
- **INCORRECT/NO_RESPONSE**: "A table has edges; a geometric plane does not. The table models only a tiny piece of the infinite plane — imagine sliding the table in every direction forever." → TA-A02.

---

### TA-A02 — Misconception Gate: PLANE-HAS-BOUNDARY (FOUNDATIONAL)
**Primitives**: P41 → P64 → P49

**P41 (MISCONCEPTION DETECTOR):**
Probe: "How is a geometric plane different from a sheet of paper?"
- If learner says "the plane has edges just like the paper": proceed to P64.
- If learner correctly says "the plane extends infinitely; paper has edges": validate and advance to P49 on lines in a plane.

**P64 (CONCEPTUAL SHIFT):**
"A sheet of paper is a PHYSICAL MODEL — a tiny, bounded piece of a plane. The GEOMETRIC PLANE is the idealized object: zero thickness, no edges, infinite extent in all directions within the flat surface.
- Sheet of paper: bounded, finite area (~600 cm²), four edges, ~0.1 mm thick.
- Geometric plane: unbounded, infinite area, no edges, zero thickness.

The parallelogram in a geometry diagram is just our viewing window into something that goes on forever. Every time you see a border on a plane diagram, imagine those lines as arrows pointing outward, not as edges stopping the plane."

**P49:** "A plane α contains line ℓ. Can any other lines lie entirely within plane α?"
- **CORRECT**: Yes — a plane contains infinitely many lines. Any two distinct points in α determine a line that lies entirely in α, and there are infinitely many such pairs. → TA-A03.
- **PARTIAL**: "There are infinitely many lines in plane α — pick any two points in the plane, and the line through them lies in α." → TA-A03.
- **INCORRECT/NO_RESPONSE**: → TA-B01, then return.

---

### TA-A03 — Three Non-Collinear Points Determine a Plane
**Primitives**: P06 → P49

**P06 (CONTRAST PAIR):**
| | Line | Plane |
|---|---|---|
| Determined by | 2 distinct points | 3 non-collinear points |
| Contains | Infinitely many points | Infinitely many lines and points |
| What goes wrong with fewer? | 1 point → infinitely many lines through it | 2 points → a line; infinitely many planes contain that line |
| How many contain a given line? | — | Infinitely many |

Key insight: If A, B, C all lie on one line (collinear), they do NOT determine a unique plane — infinitely many planes contain that line. A third point OFF the line is what "locks" the plane in place.

**Door-hinge image**: A line ℓ is the hinge of a door. The door (a plane) can swing to any angle — each position is a different plane containing ℓ. Adding a point not on ℓ is like touching a finger to the door and stopping its rotation: one unique plane.

**P49:** "Points A, B, C all lie on line ℓ. Do they determine a unique plane?"
- **CORRECT**: No — three collinear points only determine a line. A unique plane requires three NON-COLLINEAR points. → TA-A04.
- **PARTIAL**: "A, B, C on line ℓ means they're collinear. Infinitely many planes contain ℓ (the hinge), so they cannot pick out a unique plane. A third point not on ℓ is needed." → TA-A04.
- **INCORRECT/NO_RESPONSE**: "Imagine rotating a flat surface (door) around line ℓ (hinge). Every rotation angle is a different plane containing ℓ. Picking a point D not on ℓ stops the rotation and locks in exactly one plane." → TA-A04.

---

### TA-A04 — P91 Mastery Gate (Terminal)
**Primitive**: P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78

**[GR-3: Terminal TA]** **[GR-6: P91 terminal]** **[GR-7: P76 present]**

**P77 (MULTI-PROBLEM SET):**
Q1: True or False: A geometric plane has edges (boundaries).
Q2: How many non-collinear points are needed to determine a unique plane?
Q3: Line ℓ lies in plane α. How many other planes also contain line ℓ?

**P55 (SCORE):**
Q1: FALSE — a geometric plane extends infinitely in all directions and has no boundaries or edges.
Q2: Three non-collinear points. (Two points determine a line; infinitely many planes contain any given line. The third non-collinear point locks a unique plane.)
Q3: Infinitely many — imagine rotating a plane around ℓ as a hinge; each rotation angle yields a different plane. Only a fourth non-collinear point would fix a unique plane through ℓ, but ℓ alone admits infinitely many.

**P76 (TRANSFER PROBE — Cross-link: math.geom.coordinate-plane):**
The xy-plane in coordinate geometry is a geometric plane — the set of all points (x, y, 0) in 3D space.
(a) Does the xy-plane have any edges or boundaries?
(b) Points P = (0, 0, 0), Q = (1, 0, 0), and R = (0, 1, 0) all lie in the xy-plane. Are P, Q, R collinear? Do they determine a unique plane?
(c) The line y = x, z = 0 lies entirely in the xy-plane. How many planes in 3D space contain this line?

**Expected**: (a) No — the xy-plane extends infinitely in both the x and y directions; it has no edges. (b) P, Q, R are NOT collinear (they do not all lie on a single line); they determine the xy-plane as their unique plane. (c) Infinitely many — the line y = x, z = 0 is contained in the xy-plane, the plane z = y − x, and infinitely many other planes rotated around that line.

**P55 (SCORE):** No boundary stated; P, Q, R non-collinear confirmed; infinitely many planes for a line stated.

**P75 (MASTERY ASSESSMENT):** Items: Q1, Q2, Q3, P76 = **4 items**. Pass: **4/4** (⌈0.95×4⌉ = 4).
- PASS → P78.
- FAIL → P74.

**P74 (ROUTING DECISION):**
- PASS → P78.
- Q1 wrong → TA-B01 (PLANE-HAS-BOUNDARY; apply MAMR).
- Q2 wrong → TA-B02 (PLANE-FROM-TWO-POINTS).
- Q3 wrong → TA-B03 (ONE-PLANE-PER-LINE).
- P76 wrong → TA-B01 (boundary error) or TA-B03 (plane-count error) depending on error type.
- Multiple → MAMR: TA-B01 first; FIFO TA-B02, TA-B03; re-gate.

**P78 (COMPLETION):** Mastery confirmed. Schedule P89. Activate: math.geom.polygon, math.geom.coordinate-plane.

---

## Component 5 — Protocol B (Repair Chains)

### TA-B01 — Repair MC-1 PLANE-HAS-BOUNDARY
**Primitives**: P41 → P06 → P64 → P49

**P41**: "You said the plane has edges — where do those edges come from in the geometric definition? Is there anything in the definition that says 'stop here'?"

**P06 (CONTRAST):**
| | Sheet of Paper | Geometric Plane |
|---|---|---|
| Edges | Yes — four edges | None |
| Area | Finite (e.g., 620 cm²) | Infinite |
| Thickness | ~0.1 mm | Zero |
| Model relationship | Physical model of a portion | The idealized infinite object |

**P64**: "A PLANE is an idealized geometric object — infinite, no edges, zero thickness. A sheet of paper, table, or floor is a PHYSICAL MODEL showing only a PORTION of the plane. Every geometry diagram of a plane shows a tiny viewing window into something that continues forever in all directions within the flat surface."

**P49**: "Name one way a geometric plane differs from a rectangular piece of paper."
- **CORRECT**: The plane is infinite with no edges; the paper is finite with four edges. → return.
- **PARTIAL/INCORRECT/NO_RESPONSE**: "The plane extends forever — no edges. The paper has four edges and finite area. They share only the flat, 2D shape property." → return.

---

### TA-B02 — Repair MC-2 PLANE-FROM-TWO-POINTS
**Primitives**: P06 → P27 → P49

**P27**: "MC-2 PLANE-FROM-TWO-POINTS: 'Two points determine a unique plane.' Wrong. Two points determine a unique LINE. But infinitely many planes contain that line — imagine a book opening along its spine: every page (a different plane) contains the spine (the line through the two points). THREE NON-COLLINEAR points are needed to determine a unique plane."

**P06 (CONTRAST):**
| | Line | Plane |
|---|---|---|
| Determined by | 2 distinct points (unique) | 3 non-collinear points (unique) |
| 2 points give you | Exactly 1 line | Infinitely many planes (all containing that line) |

**P49**: "Points M and N are two distinct points. How many planes contain both M and N?"
- **CORRECT**: Infinitely many — M and N determine line MN, and infinitely many planes contain line MN (each at a different tilt around MN). → return.
- **PARTIAL/INCORRECT/NO_RESPONSE**: "M and N determine line MN. Think of rotating a door (plane) on its hinge (line MN) — every rotation position is a different plane containing MN. Infinitely many." → return.

---

### TA-B03 — Repair MC-3 ONE-PLANE-PER-LINE
**Primitives**: P27 → P06 → P49

**P27**: "MC-3 ONE-PLANE-PER-LINE: 'A given line lies in exactly one plane.' Wrong. Infinitely many planes contain any given line. The line acts as a hinge: the plane can rotate around it to any angle. Each angle is a different plane — and there are infinitely many angles (one for each real number in [0°, 180°))."

**P06 (CONTRAST):**
| | 3 non-collinear points → unique plane | 1 line → planes containing it |
|---|---|---|
| Result | Exactly 1 plane | Infinitely many planes |
| Why? | The off-line point stops rotation | Nothing stops the rotation around the line |

**P49**: "How many planes contain the x-axis (the line y = 0, z = 0) in 3D space?"
- **CORRECT**: Infinitely many — the x-axis lies in the xy-plane (z = 0), the xz-plane (y = 0), and infinitely many other planes of the form ay + bz = 0 rotated around the x-axis. → return.
- **PARTIAL/INCORRECT/NO_RESPONSE**: "The x-axis lies in the xy-plane, the xz-plane, and every plane of the form y·cos θ + z·sin θ = 0 for any angle θ. All of these planes contain the x-axis. There are infinitely many." → return.

---

## Component 6 — P89 Spaced Repetition Schedule

| Interval | Review Content | Pass Criterion |
|---|---|---|
| Day 1 | Q1 (boundary) + Q2 (how many points needed) | 2/2 |
| Day 3 | Q3 (planes through a line) + P76 (a, b) | 2/2 |
| Day 7 | Mixed 2-item: classify point/line/plane; determine whether 3 points are collinear and whether they fix a unique plane | 2/2 |
| Day 21 | Q1, Q2, Q3 (3 items) | 3/3 |
| Day 60 | Full 4-item mastery gate | 4/4 |

**Decay**: Failure → reset to Day 1 + TA-B routing.

---

## Component 7 — Cross-Blueprint Dependencies

### Input Dependencies
| Blueprint | KG ID | What it supplies |
|---|---|---|
| Line | math.geom.line | Lines are contained in planes; collinearity (all points on one line) is the key condition for whether three points determine a unique plane |

### Output Unlocks
| Blueprint | KG ID | What this blueprint enables |
|---|---|---|
| Polygon | math.geom.polygon | Polygons are plane figures — all vertices and edges lie in a single plane |
| Coordinate Plane | math.geom.coordinate-plane | The xy-plane is the canonical coordinate-geometry realization of a geometric plane |

### Cross-Links
- **math.geom.coordinate-plane**: The xy-plane (z = 0) is the archetypal example of a geometric plane used in P76.

---

## Component 8 — Teaching Notes

1. **"Plane" vs. "flat"**: In everyday language, "flat" is used loosely. In geometry, a plane is the strict idealization — zero thickness, infinite extent. Reinforce the distinction at the Concrete stage using the extended-floor analogy.
2. **Three non-collinear points**: This is the minimal determining set. Two points fix a line (not a plane); adding a third non-collinear point fixes the unique plane. A fourth coplanar point is redundant (already determined).
3. **Planes intersecting in a line**: Two distinct non-parallel planes always meet in a line. This is content for follow-on topics; introduce it only if the learner raises the question, and defer full treatment.
4. **Bloom level**: REMEMBER — identify properties (no boundary, infinite), count determining points (3 non-collinear), recognize the multiplicity of planes through a line. No proofs, no formula derivations.

---

## Component 10 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | Blueprint ID matches KG node ID | ✓ math.geom.plane |
| V-2 | KG node ID exists in graph.json v1.0.1 | ✓ Verified |
| V-3 | All Component 0 fields populated | ✓ |
| V-4 | DIFFICULTY matches KG (foundational) | ✓ |
| V-5 | BLOOM matches KG (remember) | ✓ |
| V-6 | MASTERY_THRESHOLD matches KG (0.95) | ✓ |
| V-7 | ESTIMATED_HOURS matches KG (1) | ✓ |
| V-8 | REQUIRES listed; blueprint exists | ✓ math.geom.line ✓ |
| V-9 | CPA_ENTRY correct (foundational → C) | ✓ C |
| V-10 | SESSION_TA_CAP correct (hours=1 ≥ 1h → max 7; used 4) | ✓ 4 ≤ 7 |
| V-11 | GR-1: non-repair TAs open with B-category primitive | ✓ A01:P03, A02:P41, A03:P06 |
| V-12 | GR-2: every non-gate TA has P49 | ✓ TA-A01, TA-A02, TA-A03 |
| V-13 | GR-3: mastery gate TA is terminal | ✓ TA-A04 uses P91 |
| V-14 | GR-4: P41/P64 gates repair chain in TA-A02 | ✓ P41 detects MC-1; P64 shifts boundary→infinite |
| V-15 | GR-6: P91 terminal in TA-A04 | ✓ |
| V-16 | GR-7: P76 in mastery gate | ✓ P76 cross-link probe (xy-plane) |
| V-17 | GR-8: cross_links documented | ✓ math.geom.coordinate-plane — stated in Component 0 and Component 7 |
| V-18 | GR-9: P76 mode correct (cross_links=[math.geom.coordinate-plane] → cross-link probe) | ✓ |
| V-19 | GR-10: MAMR stated and enforced | ✓ MC-1 FOUNDATIONAL; P74 routing |
| V-20 | Protocol B TAs open with B-category primitive | ✓ B01:P41, B02:P06, B03:P27 |
| AIR | All content fully specified; human tutor can execute without AI | ✓ |

**PACKAGE_READY**: V-1 through V-20 PASS. AIR PASS.
