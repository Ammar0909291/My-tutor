# Teaching Blueprint: Line

## Component 0 — Metadata Header

| Field | Value |
|---|---|
| BLUEPRINT_ID | math.geom.line |
| KG_ID | math.geom.line |
| KG_VERSION | v1.0.1 |
| STATUS | PACKAGE_READY |
| DOMAIN | Geometry |
| NAME | Line |
| ALIASES | straight line, geometric line |
| DIFFICULTY | foundational |
| BLOOM | remember |
| MASTERY_THRESHOLD | 0.95 |
| ESTIMATED_HOURS | 2 |
| REQUIRES | math.geom.point |
| UNLOCKS | math.geom.angle, math.geom.parallel-lines |
| CROSS_LINKS | math.geom.line-equation |
| CPA_ENTRY | C (Concrete) |
| SESSION_TA_CAP | 7 (hours ≥ 1h) |
| PROTOCOL_A_TA_COUNT | 4 (TA-A01 through TA-A04) |
| MASTERY_GATE_TA | TA-A04 (P91, terminal) |
| PASS_CRITERION | 5/5 (⌈0.95 × 5⌉ = 5; threshold = 0.95) |
| MAMR | MC-1 LINE-HAS-ENDPOINTS is FOUNDATIONAL; cleared before MC-2 or MC-3 in all repair routing |
| P76_MODE | Cross-link (cross_links = [math.geom.line-equation]; P76 probe references math.geom.line-equation directly) |

---

## Component 1 — Cognitive Map

### Prerequisites Activated
- **math.geom.point**: A point is a dimensionless location, defined by coordinates or by name. A line is built from the relationships between points — specifically, any two distinct points determine exactly one line.

### Target Understanding
1. A geometric line is a one-dimensional figure that extends infinitely in both directions, has no endpoints, no thickness, and no width.
2. Two distinct points determine exactly one line (Euclid's first postulate in modern form). Equivalently, two distinct points lie on a unique line.
3. A line is a primitive (undefined) term in Euclidean geometry — like a point, it is not defined in terms of simpler geometric objects; its properties are given by axioms.
4. Notation: the line through points P and Q is written ↔PQ (with arrows on both ends) or with a lowercase letter (l, m, n). A line is not a segment.
5. Three related objects share the "line" family but differ by extent: line (infinite, both directions), ray (starts at a point, extends infinitely in one direction: →PQ), line segment (finite, two endpoints: ─PQ).

### Cross-Link Activation
- **math.geom.line-equation**: The algebraic equation y = mx + b is the coordinate representation of a line in the plane. The geometric concept (two points determine one line) corresponds to the algebraic fact that two points determine m and b uniquely. P76 bridges these.

---

## Component 2 — Misconception Registry

### MC-1 [FOUNDATIONAL] — LINE-HAS-ENDPOINTS
- **Trigger**: "A line connects two points" or treating "line" and "line segment" as interchangeable.
- **Root cause**: In everyday speech, "draw a line between A and B" means draw a segment; early classroom diagrams show lines with two tick-marks (endpoints) on a whiteboard; the word "line" colloquially means "a short mark."
- **Error pattern**: Learner defines a line as having two endpoints; does not recognize the infinite extension; cannot distinguish line, ray, and segment.
- **Repair**: TA-B01.
- **MAMR**: FOUNDATIONAL — addressed in TA-A02 via P41/P64; if triggered later, route to TA-B01 before returning.

### MC-2 — LINE-HAS-THICKNESS
- **Trigger**: "A line is the thinnest possible mark" or measuring width of a drawn line.
- **Root cause**: Physical representations of lines (pencil marks, laser beams) have measurable width; learner confuses the representation with the mathematical object.
- **Error pattern**: Claims a line has width; believes two parallel "lines" could be close enough to touch; cannot distinguish the drawn model from the abstract concept.
- **Repair**: TA-B02.
- **MAMR**: After MC-1 cleared. FIFO with MC-3.

### MC-3 — LINE-NEEDS-EQUATION
- **Trigger**: "Without an equation, a line is not well-defined" or "a line is only a line if you can write y = mx + b for it."
- **Root cause**: Algebraic representations of lines (y = mx + b) come early in school; learner conflates the algebraic tool for describing a line with the geometric object itself.
- **Error pattern**: Believes vertical lines (x = k) are "not real lines" because they can't be written as y = mx + b; doesn't accept the geometric definition from two points.
- **Repair**: TA-B03.
- **MAMR**: After MC-1 cleared. FIFO with MC-2.

---

## Component 3 — Scaffolding Protocol

### CPA Entry: Concrete
Open with a physical analogy (Concrete): a laser beam that extends infinitely. Move to Pictorial (diagram with arrows, notation ↔PQ, contrast with ray and segment) in TA-A01 and TA-A03. Reach Abstract (Euclid's axiom, primitive-term definition) by TA-A03.

### MAMR Enforcement
MC-1 addressed in TA-A02 (P41/P64). If triggered in later TAs, route → TA-B01 → return. MC-2 and MC-3 FIFO after MC-1 cleared.

---

## Component 4 — Protocol A (Main Teaching Sequence)

### TA-A01 — What a Line Is: Analogy and Representations
**Primitives**: P03 → P11 → P49

**P03 (ANALOGY BRIDGE):**
- **Source domain**: A laser beam in a completely transparent, infinite medium — not the physical beam (which has a finite width and ends where the light runs out), but the idealized mathematical PATH it traces.
- **Target domain**: A geometric line. Extend the laser beam infinitely in BOTH directions — through the laser source, out the back, and out the front, forever. That infinite, zero-width path is a geometric line.
- **Limitation**: A real laser beam has measurable width. The mathematical line has NO width — it is an abstraction of pure direction and extent.

**P11 (REPRESENTATION SHIFT):**
Three representations of the line through points P and Q:

| Representation | Form | Interpretation |
|---|---|---|
| Verbal | "The line through P and Q" | Unique 1D figure through two distinct points |
| Diagram | ←───P───────Q───→ (arrows on both ends) | Both ends extend infinitely |
| Symbolic | ↔PQ or line l | Standard notation; l is a named label |

Key properties stated:
- One dimension (length only; no width)
- No endpoints
- Infinite extent in both directions
- Unique: exactly one line through any two distinct points (Euclid's Postulate 1)
- Primitive term: not defined using simpler geometric objects

**P49:** "How many lines can pass through a single point? Through two distinct points?"
- **CORRECT**: Infinitely many lines pass through one point (any direction). Exactly one line passes through two distinct points. → TA-A02.
- **PARTIAL**: One point: infinitely many (pick any direction). Two distinct points: exactly one — the uniqueness part of Euclid's first postulate. → TA-A02.
- **INCORRECT**: Draw two points; show there is exactly one straight path between them extending infinitely in both directions. → TA-A02.
- **NO_RESPONSE**: State both facts and confirm. → TA-A02.

---

### TA-A02 — Misconception Gate: LINE-HAS-ENDPOINTS (FOUNDATIONAL)
**Primitives**: P41 → P64 → P49

**P41 (MISCONCEPTION DETECTOR):**
Probe: "A student draws a straight mark from point A to point B on paper and says 'I have drawn a geometric line from A to B.' Is this statement correct?"
- If learner says **Correct**: proceed to P64.
- If learner says **Incorrect** (correctly): validate — "Right. That's a line segment, not a line." — then proceed to P64 for the formal distinction.

**P64 (CONCEPTUAL SHIFT):**
"The student drew a LINE SEGMENT: a finite piece of a line, with two endpoints A and B. A geometric LINE is different: it extends infinitely in BOTH directions, with no endpoints at all. When you draw ← A ─── B →, with arrows on both ends, you're representing the line through A and B — the segment AB is just the visible part.

Everyday language misleads: 'draw a line' in daily speech means draw a mark from here to there — that's always a segment, not a geometric line. In geometry, 'line' has a precise meaning: infinite, no endpoints."

Classification table:
| Object | Endpoints? | Extends infinitely? | Notation |
|---|---|---|---|
| Line | None | Both directions | ↔PQ or l |
| Ray | One (starting point) | One direction | →PQ |
| Line segment | Two | Neither | ─PQ or |PQ| |

**P49:** "Point to the LINE in this diagram: (A) ←───P───Q───→; (B) ←───P───Q─; (C) ───P───Q───. (Arrows indicate infinite extension.)"
- **CORRECT**: A (arrows on both ends = line; B = ray starting at Q; C = segment). → TA-A03.
- **PARTIAL**: Clarify which arrows mean infinite extension in which direction. → TA-A03.
- **INCORRECT/NO_RESPONSE**: → TA-B01, then return.

---

### TA-A03 — Contrast Pair: Line vs. Ray vs. Line Segment
**Primitives**: P06 → P49

**P06 (CONTRAST PAIR PROMPT):**

Contrast A — Line vs. Segment:
| | Geometric Line | Line Segment |
|---|---|---|
| Endpoints | None | Two (A and B) |
| Length | Undefined (infinite) | Finite: |AB| |
| Notation | ↔AB | ─AB or |AB| |
| Example | The x-axis in the coordinate plane | The side of a triangle |

Contrast B — Line vs. Ray:
| | Geometric Line | Ray |
|---|---|---|
| Starting point | None | Yes — one endpoint |
| Extension | Both directions, infinite | One direction, infinite |
| Notation | ↔AB | →AB (from A through B) |
| Example | An infinite road in both directions | A sunbeam from the sun outward |

Connection to children (unlocked concepts):
- **math.geom.line-segment**: ─AB is the piece of line ↔AB between A and B. Every line segment lies on a unique line.
- **math.geom.ray**: →AB is the piece of line ↔AB starting at A and going through B onward.

Euclid's primitive-term note: "Line" is one of Euclid's three undefined (primitive) terms, along with point and plane. Its properties come entirely from the axioms — there is no more basic definition.

**P49:** "A ray →PQ and the line ↔PQ both pass through points P and Q. What is different about them?"
- **CORRECT**: The line extends infinitely in BOTH directions (no starting point). The ray starts at P and extends only through Q and beyond in one direction. The ray is a half-line; the line has no half. → TA-A04.
- **PARTIAL**: Address whichever direction was unclear. → TA-A04.
- **INCORRECT/NO_RESPONSE**: Redraw the diagram with explicit arrows; trace each object. → TA-A04.

---

### TA-A04 — P91 Mastery Gate (Terminal)
**Primitive**: P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78

**[GR-3: Terminal TA]** **[GR-6: P91 terminal in this TA]** **[GR-7: P76 present]**

**P77 (MULTI-PROBLEM SET):**

Q1: True or False: A geometric line has two endpoints.
Q2: How many geometric lines can pass through two distinct points? Through one point?
Q3: Classify each object: (A) The x-axis in the coordinate plane; (B) The edge of a ruler from 0 cm to 30 cm; (C) A sunray from the sun toward Earth. Is each a line, a ray, or a segment?
Q4: A student says "a geometric line has infinite length." Is this a correct statement about a geometric line?

**P55 (SCORE):**
Q1: FALSE — a geometric line has NO endpoints; it extends infinitely in both directions.
Q2: Exactly one line through two distinct points. Infinitely many lines through one point.
Q3: A → Line (x-axis extends infinitely in both directions). B → Line segment (finite, two endpoints at 0 and 30 cm). C → Ray (starts at the sun, extends outward in one direction).
Q4: Technically, saying "infinite length" is imprecise — a line does not have a finite length; its extent is unbounded. The preferred phrasing: "a line extends infinitely" or "a line is unbounded." Accept "TRUE" if learner correctly interprets it as "extends without bound."

**P76 (TRANSFER PROBE — Cross-link: math.geom.line-equation):**

**Context**: A coordinate plane has the equation y = 3x − 2 plotted on it.

**(a)** How many points lie on the line y = 3x − 2?
**(b)** A student knows two points lie on y = 3x − 2: A = (1, 1) and B = (2, 4). Can these two points determine the line y = 3x − 2 uniquely, or could another line also pass through both A and B?
**(c)** Is the set of all points satisfying y = 3x − 2 a line, a ray, or a segment? Justify.

**Expected answers**:
(a) Infinitely many — one for each x-value (every real number x gives a point (x, 3x−2) on the line).
(b) Uniquely — two distinct points determine exactly one line. A = (1,1) and B = (2,4) lie on exactly one line; that line is y = 3x − 2.
(c) A line — the equation is satisfied for all real x (no restriction), so the set extends infinitely in both directions (no endpoints). A segment would require restricting x to an interval; a ray would restrict x to a half-line.
Cross-link: math.geom.line-equation — the geometric uniqueness property (two points → one line) corresponds algebraically to the fact that two data points determine both slope m and intercept b in y = mx + b.

**P55 (SCORE):** Infinite points confirmed; uniqueness stated; line (not segment or ray) identified with justification.

**P75 (MASTERY ASSESSMENT):** Items: Q1, Q2, Q3, Q4, P76 = **5 items**.
Pass criterion: **5/5** (⌈0.95 × 5⌉ = 5; threshold = 0.95).
- **PASS (5/5)** → P78.
- **FAIL (< 5/5)** → P74 repair routing.

**P74 (ROUTING DECISION):**
- PASS → P78.
- Q1 wrong or Q2 wrong → TA-B01 (LINE-HAS-ENDPOINTS; apply MAMR).
- Q3 wrong → TA-B01 (segment/ray/line confusion) or TA-B02 (LINE-HAS-THICKNESS if reasoning involves width); apply MAMR.
- Q4 wrong → TA-B02 (conceptual confusion about infinite extent).
- P76 wrong → TA-B03 (LINE-NEEDS-EQUATION — if learner confuses the equation with the geometric object).
- Multiple wrongs → MAMR: TA-B01 first; then FIFO TA-B02, TA-B03; re-gate.

**P78 (COMPLETION):** Mastery confirmed. Schedule P89. Activate: math.geom.angle, math.geom.parallel-lines. Children unlocked: math.geom.line-segment, math.geom.ray.

---

## Component 5 — Protocol B (Repair Chains)

### TA-B01 — Repair MC-1 LINE-HAS-ENDPOINTS
**Primitives**: P41 → P06 → P64 → P49

**P41**: "Draw the object that has two endpoints A and B. Now draw a line through A and B. Are these the same drawing?"

**P06 (CONTRAST PAIR PROMPT):**
| | "Line from A to B" (everyday speech) | Geometric Line through A and B |
|---|---|---|
| Endpoints | A and B | None |
| Extent | Finite | Infinite (both directions) |
| Correct term | Line segment ─AB | Line ↔AB |
| Notation | ─AB | ↔AB |

**P64**: "In everyday language, 'draw a line from A to B' means draw a finite mark — a LINE SEGMENT. In geometry, 'line' means the infinite figure extending in BOTH directions through A and through B and beyond. The segment AB is just the part of the line between A and B."

**P49**: "Name the geometric object: (A) finite mark with endpoints at 0 and 5 on a number line; (B) the number line itself."
- **CORRECT**: A = line segment; B = line. → return.
- **PARTIAL/INCORRECT/NO_RESPONSE**: A is finite with endpoints → segment; B extends to −∞ and +∞ → line. → return.

---

### TA-B02 — Repair MC-2 LINE-HAS-THICKNESS
**Primitives**: P06 → P27 → P49

**P27**: "MC-2 LINE-HAS-THICKNESS: thinking a geometric line has measurable width. A drawn line has width (the pencil or pixel has a physical size), but the mathematical line it REPRESENTS has zero width. The drawn mark is a model — an imperfect physical stand-in for a perfect abstract object."

**P06 (CONTRAST):**
| | Physical drawn mark | Geometric line (abstract) |
|---|---|---|
| Width | Measurable (e.g., 0.5 mm pencil) | Zero — no width |
| What it is | A representation | The mathematical object |
| Can two parallel lines touch? | "Almost" at small scales | Never — zero width, parallel means no intersection |

**P49**: "Two parallel lines are 0.001 mm apart. Can they touch?"
- **CORRECT**: No — geometric parallel lines have zero width and parallel means they never intersect, regardless of distance. → return.
- **PARTIAL/INCORRECT/NO_RESPONSE**: "With zero width, no amount of closeness causes touching. 'Parallel' means they will never share a point." → return.

---

### TA-B03 — Repair MC-3 LINE-NEEDS-EQUATION
**Primitives**: P27 → P06 → P49

**P27**: "MC-3 LINE-NEEDS-EQUATION: believing a line is only well-defined if you can write y = mx + b. In fact, the GEOMETRIC definition of a line requires only two distinct points — no coordinates, no equation. The equation is an algebraic REPRESENTATION of a line in a coordinate system, not what makes it a line."

**P06 (CONTRAST):**
| | Geometric line | Algebraic representation |
|---|---|---|
| What defines it | Two distinct points | Equation y = mx + b (or x = k for vertical) |
| Requires coordinates? | No | Yes — needs a coordinate system |
| Example without equation | The line through London and Paris on a globe | y = 2x + 1 in the xy-plane |
| Vertical line | Perfectly valid geometric line | Cannot be written as y = mx + b (use x = k) |

**P49**: "Is the line through the top and bottom vertices of a triangle a valid geometric line? Does it need an equation to be well-defined?"
- **CORRECT**: Yes — the triangle has two distinct points (top and bottom vertices); one unique line passes through them. No equation needed; the geometric definition is complete. → return.
- **PARTIAL/INCORRECT/NO_RESPONSE**: "Two points define the line. Coordinates and equations are tools for computing with lines, not requirements for the line to exist." → return.

---

## Component 6 — P89 Spaced Repetition Schedule

| Interval | Review Content | Pass Criterion |
|---|---|---|
| Day 1 | Q1 (endpoints?) + Q3 (classify line/ray/segment) | 2/2 |
| Day 3 | Q2 (uniqueness) + P76 probe (b) | 2/2 |
| Day 7 | Mixed 3-item: define line, classify 2 objects | 2/3 |
| Day 21 | Q1, Q2, Q3, Q4 (4 items) | 4/4 |
| Day 60 | Full 5-item mastery gate | 5/5 |

**Decay**: Failure → reset to Day 1 + TA-B routing by error type.

---

## Component 7 — Cross-Blueprint Dependencies

### Input Dependencies
| Blueprint | KG ID | What it supplies |
|---|---|---|
| Point | math.geom.point | A point is a dimensionless location; a line is determined by any two distinct points |

### Output Unlocks
| Blueprint | KG ID | What this blueprint enables |
|---|---|---|
| Angle | math.geom.angle | Two rays sharing an endpoint form an angle; rays are sub-objects of lines |
| Parallel Lines | math.geom.parallel-lines | Two lines in the same plane that never intersect (requires line definition) |

### Output Children (sub-objects)
| Blueprint | KG ID | Relationship |
|---|---|---|
| Line Segment | math.geom.line-segment | A finite piece of a line bounded by two endpoints |
| Ray | math.geom.ray | Half of a line starting at one endpoint and extending infinitely in one direction |

### Cross-Links
- **math.geom.line-equation**: A line in the coordinate plane is represented by y = mx + b (or x = k for vertical). The geometric uniqueness property (two points determine one line) corresponds to the algebraic determination of m and b from two data points.

---

## Component 8 — Teaching Notes

1. **Primitive term**: Emphasize that "line" is undefined in Euclidean geometry — it has properties (given by axioms) but no definition from simpler terms. This is cognitively unusual; learners expect all terms to be defined. Acknowledge this briefly without derailing.
2. **Arrows in diagrams**: Always draw lines with arrows on BOTH ends. Rays get one arrow. Segments get no arrows (or two tick marks). Consistent notation prevents MC-1.
3. **Everyday language conflict**: "Line up in a line," "draw a line," "a line of text" — none mean a geometric line. Explicitly flag this conflict the first time it appears.
4. **Vertical lines and equations**: MC-3 is reinforced by the fact that y = mx + b fails for vertical lines. Pre-empt this by noting that y = mx + b is one algebraic form, and x = k is another — both represent lines.
5. **Bloom level**: REMEMBER — learner must recall and recognize the definition, notation, and basic properties. Classification tasks (line/ray/segment) confirm remembering. Proofs are not required at this level.

---

## Component 10 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | Blueprint ID matches KG node ID | ✓ math.geom.line |
| V-2 | KG node ID exists in graph.json v1.0.1 | ✓ Verified |
| V-3 | All Component 0 fields populated | ✓ |
| V-4 | DIFFICULTY matches KG (foundational) | ✓ |
| V-5 | BLOOM matches KG (remember) | ✓ |
| V-6 | MASTERY_THRESHOLD matches KG (0.95) | ✓ |
| V-7 | ESTIMATED_HOURS matches KG (2) | ✓ |
| V-8 | REQUIRES listed; blueprint exists | ✓ math.geom.point ✓ |
| V-9 | CPA_ENTRY correct (foundational → C) | ✓ C |
| V-10 | SESSION_TA_CAP correct (hours=2 ≥ 1h → max 7; used 4) | ✓ 4 ≤ 7 |
| V-11 | GR-1: non-repair TAs open with B-category primitive | ✓ A01:P03, A02:P41, A03:P06 |
| V-12 | GR-2: every non-gate TA has P49 | ✓ TA-A01 through TA-A03 |
| V-13 | GR-3: mastery gate TA is terminal | ✓ TA-A04 uses P91 |
| V-14 | GR-4: P41/P64 gates repair chain in TA-A02 | ✓ P41 detects MC-1 LINE-HAS-ENDPOINTS; P64 provides segment/line shift |
| V-15 | GR-6: P91 terminal in TA-A04 | ✓ |
| V-16 | GR-7: P76 in mastery gate | ✓ P76 cross-link to math.geom.line-equation |
| V-17 | GR-8: cross_links documented | ✓ math.geom.line-equation in Component 0 and Component 7 |
| V-18 | GR-9: P76 mode correct (cross_links≠[] → cross-link probe) | ✓ P76 references math.geom.line-equation (coordinate plane) |
| V-19 | GR-10: MAMR stated and enforced | ✓ MC-1 FOUNDATIONAL; Component 0 and 2; P74 routing |
| V-20 | Protocol B TAs open with B-category primitive | ✓ B01:P41, B02:P06, B03:P27 |
| AIR | All content fully specified; human tutor can execute without AI | ✓ |

**PACKAGE_READY**: V-1 through V-20 PASS. AIR PASS.
