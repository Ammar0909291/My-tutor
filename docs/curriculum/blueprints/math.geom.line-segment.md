# Teaching Blueprint: Line Segment

## Component 0 — Metadata Header

| Field | Value |
|---|---|
| BLUEPRINT_ID | math.geom.line-segment |
| KG_ID | math.geom.line-segment |
| KG_VERSION | v1.0.1 |
| STATUS | PACKAGE_READY |
| DOMAIN | Geometry |
| NAME | Line Segment |
| ALIASES | segment, bounded line |
| DIFFICULTY | foundational |
| BLOOM | remember |
| MASTERY_THRESHOLD | 0.95 |
| ESTIMATED_HOURS | 1 |
| REQUIRES | math.geom.line |
| UNLOCKS | math.geom.length |
| CROSS_LINKS | (none) |
| CPA_ENTRY | C (Concrete) |
| SESSION_TA_CAP | 7 (hours ≥ 1h) |
| PROTOCOL_A_TA_COUNT | 3 (TA-A01 through TA-A03) |
| MASTERY_GATE_TA | TA-A03 (P91, terminal) |
| PASS_CRITERION | 4/4 (⌈0.95 × 4⌉ = 4; threshold = 0.95) |
| MAMR | MC-1 SEGMENT-IS-LINE is FOUNDATIONAL; cleared before MC-2 or MC-3 in all repair routing |
| P76_MODE | Independence (cross_links = []; self-contained real-world context) |

---

## Component 1 — Cognitive Map

### Prerequisites Activated
- **math.geom.line**: A line extends infinitely in both directions with no endpoints. A line segment is a BOUNDED piece of a line — the portion between two designated points on it.

### Target Understanding
1. A line segment ─AB is the set of all points on line ↔AB between A and B, including A and B themselves.
2. Two endpoints: A and B are the endpoints of ─AB. The segment has exactly two endpoints; neither is "first" or "last" in a directed sense.
3. Finite length: |AB| = the distance between A and B. Length is measurable; a segment's length is a positive real number.
4. Symmetry: segment AB = segment BA (same set of points; segments are unordered pairs of endpoints, unlike vectors).
5. A segment lies on a unique line (its parent line ↔AB). Every segment is part of exactly one geometric line.
6. Midpoint M of ─AB: the point with |AM| = |MB| = |AB|/2.

### Cross-Link Activation
- No cross-links. P76 uses an independence probe (a road between two cities).

---

## Component 2 — Misconception Registry

### MC-1 [FOUNDATIONAL] — SEGMENT-IS-LINE
- **Trigger**: Using "line" and "segment" interchangeably, or believing a segment extends beyond its endpoints.
- **Root cause**: Everyday language uses "line" to mean "a mark from here to there" — which is a segment. The geometric line blueprint may not yet have consolidated.
- **Error pattern**: Says "draw a line from A to B" and does not recognize this is a segment; doesn't mark endpoints; believes the object continues past A or B.
- **Repair**: TA-B01.
- **MAMR**: FOUNDATIONAL — addressed in TA-A02 via P41/P64; if triggered later, route to TA-B01 before returning.

### MC-2 — SEGMENT-DIRECTED
- **Trigger**: "Segment AB is different from segment BA" (confusing with vectors).
- **Root cause**: Vectors →AB and →BA are different (opposite directions); learner applies this to segments.
- **Error pattern**: Claims "you must say AB not BA" or draws an arrow on a segment to indicate direction.
- **Repair**: TA-B02.
- **MAMR**: After MC-1 cleared. FIFO with MC-3.

### MC-3 — SEGMENT-NEEDS-MEASUREMENT
- **Trigger**: "A segment is only well-defined once you know its length" or "without coordinates, it's not a real segment."
- **Root cause**: Learner conflates the geometric object (the set of points) with the measurement tool (length computation).
- **Error pattern**: Refuses to name a segment without a ruler; believes length is part of the definition.
- **Repair**: TA-B03.
- **MAMR**: After MC-1 cleared. FIFO with MC-2.

---

## Component 3 — Scaffolding Protocol

### CPA Entry: Concrete
Open with a physical rope between two hands (Concrete). Pictorial: draw ─AB with two tick marks at endpoints. Abstract: set-theoretic definition (all points on ↔AB with A ≤ x ≤ B in 1D).

### MAMR Enforcement
MC-1 addressed in TA-A02 (P41/P64). Route → TA-B01 if triggered later. MC-2 and MC-3 FIFO.

---

## Component 4 — Protocol A (Main Teaching Sequence)

### TA-A01 — Segment as a Bounded Piece of a Line
**Primitives**: P03 → P11 → P49

**P03 (ANALOGY BRIDGE):**
- **Source**: A rope stretched taut between two nails in a wall. The rope has two endpoints (the nails), a definite length, and does not extend past the nails.
- **Target**: A line segment ─AB. The two nails are A and B (endpoints); the rope is the segment — every point between A and B, including A and B.
- **Connection to line**: The NAIL HOLES lie on an imaginary infinite wall (the line ↔AB). The segment is just the bounded piece between the holes.

**P11 (REPRESENTATION SHIFT):**
Three representations of segment AB:
| Representation | Form | Key feature |
|---|---|---|
| Diagram | A ─────── B (tick marks at endpoints) | No arrows — finite, bounded |
| Symbolic | ─AB or AB or [A,B] | Two endpoints named |
| Measurement | \|AB\| = length (a positive real number) | Measurable; finite |

Contrast with line (↔AB, arrows both ends) and ray (→AB, arrow at one end).

**P49:** "How many endpoints does a line segment have? How many does a geometric line have?"
- **CORRECT**: Segment: 2 endpoints. Line: 0 endpoints (extends infinitely). → TA-A02.
- **PARTIAL**: Reinforce: segment is bounded by TWO points; line is bounded by NONE. → TA-A02.
- **INCORRECT/NO_RESPONSE**: Redraw both; count endpoints explicitly. → TA-A02.

---

### TA-A02 — Misconception Gate: SEGMENT-IS-LINE (FOUNDATIONAL)
**Primitives**: P41 → P64 → P49

**P41 (MISCONCEPTION DETECTOR):**
Probe: "Draw a 'line' from point A to point B. Is the result a geometric line?"
- If learner draws a segment (correctly) but calls it a "line": proceed to P64.
- If learner draws with arrows (correct about arrows but wrong term): validate notation, then proceed to P64 on terminology.

**P64 (CONCEPTUAL SHIFT):**
"What you drew is a LINE SEGMENT — ─AB, a finite piece of the geometric line ↔AB. The LINE through A and B extends infinitely past both A and B, with no endpoints. In everyday language, 'draw a line from A to B' means draw a SEGMENT. In geometry, these two terms are distinct:
- Line ↔AB: infinite, no endpoints, ← A ─── B →
- Segment ─AB: finite, two endpoints, A ─────── B

The segment ─AB is a SUBSET of the line ↔AB: ─AB ⊂ ↔AB."

**P49:** "Which of these is a line segment: (A) the x-axis; (B) the edge of a ruler from 0 to 30 cm; (C) a ray from the sun?"
- **CORRECT**: B — finite with two endpoints (0 and 30 cm). A = line (infinite). C = ray (one endpoint, infinite extent). → TA-A03.
- **PARTIAL**: Address wrong item. → TA-A03.
- **INCORRECT/NO_RESPONSE**: → TA-B01, then return.

---

### TA-A03 — P91 Mastery Gate (Terminal)
**Primitive**: P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78

**[GR-3: Terminal TA]** **[GR-6: P91 terminal]** **[GR-7: P76 present]**

**P77 (MULTI-PROBLEM SET):**
Q1: True or False: A line segment has exactly two endpoints.
Q2: Is segment AB the same as segment BA? Explain.
Q3: A line segment ─PQ has length 10 cm. Point M is the midpoint. What is |PM|?

**P55 (SCORE):**
Q1: TRUE — two endpoints, A and B, are what define the segment.
Q2: YES — segment AB = segment BA (same set of points; segments are symmetric, not directed).
Q3: |PM| = 5 cm (midpoint divides segment into two equal halves: 10/2 = 5).

**P76 (TRANSFER PROBE — Independence):**
A city map shows a straight road from downtown (point D) to the airport (point A).
(a) Is this road best modeled as a geometric line, line segment, or ray?
(b) How many endpoints does it have?
(c) Is "road from D to A" the same road as "road from A to D"?

**Expected**: (a) Line segment — finite road with two termini. (b) Two (D and A). (c) Yes — segment DA = segment AD (same physical road; no direction).

**P55 (SCORE):** Segment identified; two endpoints; symmetry stated.

**P75 (MASTERY ASSESSMENT):** Items: Q1, Q2, Q3, P76 = **4 items**. Pass: **4/4** (⌈0.95×4⌉ = 4).
- PASS → P78.
- FAIL → P74.

**P74 (ROUTING DECISION):**
- PASS → P78.
- Q1 wrong or Q3 wrong → TA-B01 (SEGMENT-IS-LINE; apply MAMR).
- Q2 wrong → TA-B02 (SEGMENT-DIRECTED).
- P76 wrong → TA-B01 or TA-B02 depending on error type.
- Multiple → MAMR: TA-B01 first; FIFO TA-B02, TA-B03; re-gate.

**P78 (COMPLETION):** Mastery confirmed. Schedule P89. Activate: math.geom.length.

---

## Component 5 — Protocol B (Repair Chains)

### TA-B01 — Repair MC-1 SEGMENT-IS-LINE
**Primitives**: P41 → P06 → P64 → P49

**P41**: "You said 'line' — does your object have endpoints? Does it extend past them?"

**P06 (CONTRAST):**
| | Geometric Line ↔AB | Line Segment ─AB |
|---|---|---|
| Endpoints | None | Two (A and B) |
| Length | Undefined (infinite) | Finite: \|AB\| |
| Diagram | ← A ─── B → | A ─────── B |

**P64**: "In geometry: LINE = infinite, no endpoints. SEGMENT = finite piece of a line, two endpoints. The segment ─AB is the part of the line ↔AB strictly between (and including) A and B."

**P49**: "Name each: (A) ← P ─ Q →; (B) P ─────── Q"
- **CORRECT**: A = line; B = segment. → return.
- **PARTIAL/INCORRECT/NO_RESPONSE**: "Arrows = infinite = line. Tick marks / no arrows = finite = segment." → return.

---

### TA-B02 — Repair MC-2 SEGMENT-DIRECTED
**Primitives**: P06 → P27 → P49

**P27**: "MC-2 SEGMENT-DIRECTED: 'segment AB ≠ segment BA.' This is false for SEGMENTS. Segments have no direction — they are an unordered pair of endpoints. Vectors (→AB) DO have direction; →AB ≠ →BA. But segment ─AB is just the set of points between A and B, which is symmetric."

**P06 (CONTRAST):**
| | Segment ─AB | Vector →AB |
|---|---|---|
| Directed? | No | Yes |
| AB = BA? | ✓ Yes | ✗ No (opposite directions) |
| Notation difference | ─AB = ─BA | →AB ≠ →BA |

**P49**: "Are segment PQ and segment QP the same object?"
- **CORRECT**: Yes — same set of points, same length. → return.
- **PARTIAL/INCORRECT/NO_RESPONSE**: "Both are the set of all points between P and Q. They are identical." → return.

---

### TA-B03 — Repair MC-3 SEGMENT-NEEDS-MEASUREMENT
**Primitives**: P27 → P06 → P49

**P27**: "MC-3 SEGMENT-NEEDS-MEASUREMENT: 'a segment isn't well-defined without knowing its length.' Wrong. A segment is defined as a SET OF POINTS — the portion of a line between two endpoints. It exists as a geometric object regardless of whether you measure it. Length is a PROPERTY you can measure, not a defining requirement."

**P06 (CONTRAST):**
| | Segment (geometric object) | Length (measurement) |
|---|---|---|
| Exists without...? | Two points on a line | Yes, always exists |
| Requires coordinates? | No | Depends on the system |
| Defined by | Two endpoints | \|AB\| = distance(A,B) |

**P49**: "Does the line segment drawn between the two corners of a room exist as a geometric object, even if you don't measure it?"
- **CORRECT**: Yes — two distinct points (the corners) are on a line; the segment between them exists and is well-defined. Measurement is optional. → return.
- **PARTIAL/INCORRECT/NO_RESPONSE**: "The segment exists as a set of points. You may CHOOSE to measure its length, but the object exists independently of measurement." → return.

---

## Component 6 — P89 Spaced Repetition Schedule

| Interval | Review Content | Pass Criterion |
|---|---|---|
| Day 1 | Q1 (endpoints) + Q2 (AB = BA?) | 2/2 |
| Day 3 | Q3 (midpoint) + P76 (a,c) | 2/2 |
| Day 7 | Mixed 2-item: classify line/segment/ray; name endpoints | 2/2 |
| Day 21 | Q1, Q2, Q3 (3 items) | 3/3 |
| Day 60 | Full 4-item mastery gate | 4/4 |

**Decay**: Failure → reset to Day 1 + TA-B routing.

---

## Component 7 — Cross-Blueprint Dependencies

### Input Dependencies
| Blueprint | KG ID | What it supplies |
|---|---|---|
| Line | math.geom.line | The parent line ↔AB on which the segment lies |

### Output Unlocks
| Blueprint | KG ID | What this blueprint enables |
|---|---|---|
| Length | math.geom.length | The measurable property of a segment; length = \|AB\| |

### Cross-Links
- None.

---

## Component 8 — Teaching Notes

1. **Segment vs. vector**: At the foundational level (bloom=remember), vectors are not yet taught. Note that segment AB = BA for SEGMENTS; contrast only if learner brings up vectors.
2. **Endpoints are included**: A line segment ─AB includes the endpoints A and B (it is a CLOSED interval [A,B] on the line, not an open interval).
3. **Midpoint formula**: For learners with coordinates, midpoint M = ((x_A+x_B)/2, (y_A+y_B)/2). This is content for math.geom.length; introduce briefly here only if natural.
4. **Bloom level**: REMEMBER — classify, name, identify endpoints. No proofs, no formula derivations.

---

## Component 10 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | Blueprint ID matches KG node ID | ✓ math.geom.line-segment |
| V-2 | KG node ID exists in graph.json v1.0.1 | ✓ Verified |
| V-3 | All Component 0 fields populated | ✓ |
| V-4 | DIFFICULTY matches KG (foundational) | ✓ |
| V-5 | BLOOM matches KG (remember) | ✓ |
| V-6 | MASTERY_THRESHOLD matches KG (0.95) | ✓ |
| V-7 | ESTIMATED_HOURS matches KG (1) | ✓ |
| V-8 | REQUIRES listed; blueprint exists | ✓ math.geom.line ✓ |
| V-9 | CPA_ENTRY correct (foundational → C) | ✓ C |
| V-10 | SESSION_TA_CAP correct (hours=1 ≥ 1h → max 7; used 3) | ✓ 3 ≤ 7 |
| V-11 | GR-1: non-repair TAs open with B-category primitive | ✓ A01:P03, A02:P41 |
| V-12 | GR-2: every non-gate TA has P49 | ✓ TA-A01, TA-A02 |
| V-13 | GR-3: mastery gate TA is terminal | ✓ TA-A03 uses P91 |
| V-14 | GR-4: P41/P64 gates repair chain in TA-A02 | ✓ P41 detects MC-1; P64 shifts line→segment distinction |
| V-15 | GR-6: P91 terminal in TA-A03 | ✓ |
| V-16 | GR-7: P76 in mastery gate | ✓ P76 independence probe (road segment) |
| V-17 | GR-8: cross_links documented | ✓ (none) — stated in Component 0 and Component 7 |
| V-18 | GR-9: P76 mode correct (cross_links=[] → independence probe) | ✓ |
| V-19 | GR-10: MAMR stated and enforced | ✓ MC-1 FOUNDATIONAL; P74 routing |
| V-20 | Protocol B TAs open with B-category primitive | ✓ B01:P41, B02:P06, B03:P27 |
| AIR | All content fully specified; human tutor can execute without AI | ✓ |

**PACKAGE_READY**: V-1 through V-20 PASS. AIR PASS.
