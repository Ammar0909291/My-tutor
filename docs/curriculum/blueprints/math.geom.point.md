# Teaching Blueprint: Point

## Component 0 — Metadata Header

| Field | Value |
|---|---|
| BLUEPRINT_ID | math.geom.point |
| KG_ID | math.geom.point |
| KG_VERSION | v1.0.1 |
| STATUS | PACKAGE_READY |
| DOMAIN | Geometry |
| NAME | Point |
| ALIASES | geometric point |
| DIFFICULTY | foundational |
| BLOOM | remember |
| MASTERY_THRESHOLD | 0.95 |
| ESTIMATED_HOURS | 1 |
| REQUIRES | math.found.mathematical-thinking |
| UNLOCKS | math.geom.line, math.geom.plane |
| CROSS_LINKS | (none) |
| CPA_ENTRY | C (Concrete) |
| SESSION_TA_CAP | 7 (hours = 1h ≥ 1h) |
| PROTOCOL_A_TA_COUNT | 4 (TA-A01 through TA-A04) |
| MASTERY_GATE_TA | TA-A04 (P91, terminal) |
| PASS_CRITERION | 5/5 (⌈0.95 × 5⌉ = 5; threshold = 0.95) |
| MAMR | MC-1 POINT-HAS-SIZE is FOUNDATIONAL; cleared before MC-2 or MC-3 in all repair routing |
| P76_MODE | Independence (cross_links = []; self-contained real-world context) |

---

## Component 1 — Cognitive Map

### Prerequisites Activated
- **math.found.mathematical-thinking**: Learner can engage in abstract thinking; understands that mathematical objects are conceptual (not physical).

### Target Understanding
1. A geometric point is a DIMENSIONLESS location — it has position but no length, width, or depth.
2. Points are PRIMITIVE terms in Euclidean geometry: defined by their properties and relationships, not by construction from simpler objects.
3. A point is not the same as the dot drawn to represent it — the dot is an imperfect physical mark; the point is the abstract concept.
4. Standard notation: capital letters A, B, C, P, Q for points.
5. Coordinate representation: a point in the plane is an ordered pair (x, y); in space, an ordered triple (x, y, z). Coordinates locate a point but do not define it.

### Cross-Link Activation
- None (cross_links = []). P76 uses an independent context.

---

## Component 2 — Misconception Registry

### MC-1 [FOUNDATIONAL] — POINT-HAS-SIZE
- **Trigger**: "A point is a very tiny dot" OR "if I zoom in enough, a point has some width"
- **Root cause**: Physical marks (dots, pixels) that represent points have visible size. Learner conflates the abstract concept with its physical representation.
- **Error pattern**: Drawing conclusions about geometric points based on the size of drawn dots; thinking points "touch" each other if their drawn representations overlap.
- **Repair**: TA-B01.
- **MAMR**: FOUNDATIONAL — addressed in TA-A01; if triggered later, route to TA-B01 before returning.

### MC-2 — POINT-AS-MARK
- **Trigger**: "The point IS the dot I drew" OR "a point is wherever I put my pencil on the paper"
- **Root cause**: Learner identifies the abstract concept with its physical instantiation; doesn't distinguish the model (paper) from the abstract geometry.
- **Error pattern**: Saying a drawn dot "is" a geometric point rather than "represents" one; confusing the precision of physical drawing with geometric exactness.
- **Repair**: TA-B02.
- **MAMR**: After MC-1 cleared. FIFO with MC-3.

### MC-3 — COORDINATE-REQUIRED
- **Trigger**: "A point only exists when it has coordinates" OR "without (x, y), a point isn't defined"
- **Root cause**: Learner encounters points first via coordinates (plotting on a number line or plane) and concludes coordinates are constitutive of points.
- **Error pattern**: Refusing to accept Euclid's purely geometric definition of a point; thinking "no coordinates = no point."
- **Repair**: TA-B03.
- **MAMR**: After MC-1 cleared. FIFO with MC-2.

---

## Component 3 — Scaffolding Protocol

### CPA Entry: Concrete
Open with physical examples (a pin prick on paper, a star in the night sky viewed from Earth) as concrete anchors before introducing the abstract definition. Transition to the abstract via the "limit of shrinking" analogy.

### MAMR Enforcement
MC-1 addressed in TA-A01 via P27. If triggered later, route → TA-B01 → return. MC-2 and MC-3 FIFO after MC-1 cleared.

---

## Component 4 — Protocol A (Main Teaching Sequence)

### TA-A01 — Definition: Dimensionless Location
**Primitives**: P27 → P03 → P49

**P27 (MISCONCEPTION NAMING):** Name MC-1 POINT-HAS-SIZE: "The most common confusion: a point looks like a dot, and dots have size. But in geometry, a POINT has NO size — no width, no height, no depth. Zero dimensions. The dot you draw on paper is a physical approximation of a geometric point, not the point itself. Geometric points are mathematical abstractions."

Formal: A point is a PRIMITIVE term in Euclidean geometry — it is not defined in terms of simpler objects; instead, it is characterized by its properties: it has position but no extent in any dimension.

**P03 (ANALOGY BRIDGE):** "Imagine zooming into a physical dot endlessly — it gets smaller and smaller as you zoom. A geometric point is the LIMIT of this process: what you'd get if you could zoom forever. It has no size at all — just a location. A city on a map may be marked with a dot, but at maximum precision, the location of the city hall is a geometric point."

**P49:** Prompt: "What are the dimensions of a geometric point? Can two geometric points overlap without being the same point?"
- **CORRECT**: Zero dimensions (no length, width, or height). No — if two points are at the same location, they are the SAME point. A point IS its location → TA-A02.
- **PARTIAL**: Confirm zero dimensions; clarify that same-location means same-point → TA-A02.
- **INCORRECT**: → TA-B01.
- **NO_RESPONSE**: → TA-B01.

---

### TA-A02 — Notation and Physical Representation
**Primitives**: P06 → P04 → P49

**P06 (CONTRAST PAIR PROMPT):**
| What you see | What it is |
|---|---|
| A dot drawn on paper with a pencil | A physical mark — has size; imperfect representation |
| Point A (label: capital letter A) | The geometric abstraction — dimensionless location |
| A pixel on a screen | Physical representation — has size (pixels per inch) |
| The intersection of two ruler lines | Geometric representation — approaches a point as lines get thinner |

**P04 (PATTERN INDUCTION):**
- Standard notation: a single capital letter. Examples: A, B, C, P, Q, R, X, Y.
- Convention: the label goes beside the dot that represents the point — the dot is the mark, the letter is the name.
- Pattern: "Let A and B be distinct points." — this statement introduces two distinct locations with zero dimension.
- Two points are equal (A = B) iff they name the same location.

**P49:** Prompt: "Label three distinct points on a number line: one at position 0, one at position 1, one at position −1. Use capital letters. Are the labels part of the points, or just names?"
- **CORRECT**: E.g., O at 0, P at 1, Q at −1. The labels are NAMES (not part of the points); the same location can have different labels → TA-A03.
- **PARTIAL**: Confirm naming; note labels are arbitrary identifiers → TA-A03.
- **INCORRECT**: → TA-B02.
- **NO_RESPONSE**: → TA-B02.

---

### TA-A03 — Coordinate Representation and Primitive Status
**Primitives**: P11 → P49

**P11 (REPRESENTATION SHIFT):**
Three representations of a geometric point:

| Representation | Example | What it captures |
|---|---|---|
| Abstract (label only) | Point A | Pure location in abstract space |
| Coordinate (number line, 1D) | A = 3 (on number line) | Position on a scaled axis |
| Coordinate (plane, 2D) | A = (2, −1) in ℝ² | Position in a coordinate system |
| Coordinate (space, 3D) | A = (1, 0, −2) in ℝ³ | Position in 3D space |

Shift: abstract label → 1D coordinate → 2D coordinate → 3D coordinate. The point EXISTS independently of coordinates; coordinates are a TOOL for LOCATING it in a reference system.

Key: Euclid's geometry works without any coordinates. Points exist in abstract space. Coordinates were introduced by Descartes ~2000 years after Euclid. A point is NOT defined by its coordinates — coordinates describe where it is in a chosen reference frame.

**P49:** Prompt: "If I change the coordinate system (e.g., shift the origin), does a geometric point change? Does its coordinate change?"
- **CORRECT**: The geometric POINT does not change — it's the same location. Its COORDINATE changes because coordinates depend on the reference frame → TA-A04.
- **PARTIAL**: Confirm point is invariant; note coordinates are reference-frame-dependent → TA-A04.
- **INCORRECT**: → TA-B03.
- **NO_RESPONSE**: → TA-B03.

---

### TA-A04 — P91 Mastery Gate (Terminal)
**Primitive**: P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78

**[GR-3: Terminal TA]** **[GR-6: P91 terminal]** **[GR-7: P76 present]**

**P77 (MULTI-PROBLEM SET):**
Q1: "How many dimensions does a geometric point have? What does 'dimensionless' mean?"
Q2: "True or False: 'The dot drawn to represent point A is the same as point A.'"
Q3: "Point P has coordinates (3, −2) in one coordinate system. If I shift the origin 1 unit to the right, what are P's new coordinates? Has the geometric point P changed?"
Q4: "Two students are discussing a geometric point. Student 1 says: 'A point is defined by its (x,y) coordinates.' Student 2 says: 'A point is a location; coordinates just describe where it is.' Who is right? Why?"

**P55 (SCORE):** Q1: zero dimensions; dimensionless means no extent in any direction. Q2: FALSE — the dot is a physical representation, not the point itself. Q3: New coordinates: (2, −2); the point P has NOT changed — only the coordinate label changed. Q4: Student 2 is correct; a point has independent geometric existence; coordinates are a descriptive tool.

**P76 (TRANSFER PROBE — Independence, real-world context):**
"A GPS system reports a meeting location as (40.7128°N, 74.0060°W). A city planner marks the same location on two different maps: one at 1:10,000 scale (a large dot visible from across the room) and one at 1:1,000,000 scale (a barely visible pinprick). (a) Has the physical meeting location changed between the two maps? (b) Has the geometric point representing that location changed? (c) What does this illustrate about the relationship between a geometric point and its physical representation?"

Expected: (a) No — same physical location. (b) No — same geometric point (same location). (c) The geometric point is the abstract location; its representation varies with scale and medium, but the point itself is invariant. The dot on the large-scale map is larger but represents the same dimensionless point.

**P55 (SCORE):** Correct on (a)/(b) invariance; correct explanation (c) of representation vs. concept.

**P75 (MASTERY ASSESSMENT):** Items: Q1, Q2, Q3, Q4, P76 = **5 items**.
Pass criterion: **5/5** (⌈0.95 × 5⌉ = 5; threshold = 0.95).
- **PASS** → P78.
- **FAIL** → P74 repair routing.

**P74 (ROUTING DECISION):**
- PASS → P78.
- Q1 wrong or Q4 wrong → TA-B01 (POINT-HAS-SIZE); MAMR first.
- Q2 wrong or P76 wrong → TA-B02 (POINT-AS-MARK).
- Q3 wrong → TA-B03 (COORDINATE-REQUIRED).
- Multiple wrongs → MAMR: TA-B01 first; then FIFO TA-B02, TA-B03; re-gate.

**P78 (COMPLETION):** Mastery confirmed. Schedule P89. Activate: math.geom.line, math.geom.plane.

---

## Component 5 — Protocol B (Repair Chains)

### TA-B01 — Repair MC-1 POINT-HAS-SIZE
**Primitives**: P41 → P06 → P64 → P49

**P41**: "If I asked you to draw a point on paper, what would you draw? Now: is what you drew the geometric point, or a representation of it?"

**P06 (CONTRAST):**
| Concept | Has size? | Is a geometric point? |
|---|---|---|
| A pencil dot | YES (0.1mm wide) | ✗ NO — physical representation |
| A pixel on screen | YES (fraction of mm) | ✗ NO — physical representation |
| The intersection of two laser beams | Approaches zero | Approaches the concept |
| A geometric point | ZERO (none) | ✓ YES — abstract concept |

**P64**: "A geometric point is an IDEALIZATION — the limit of making a dot smaller and smaller, but never reachable by physical means. In mathematics, we reason about this ideal object directly, not about any physical approximation."

**P49**: "Can you physically draw an exact geometric point?"
- **CORRECT**: No — any physical mark has positive size; we can only draw representations → return.
- **PARTIAL/INCORRECT/NO_RESPONSE**: Emphasize physical impossibility of drawing exact points; geometry works with ideal abstractions → return.

### TA-B02 — Repair MC-2 POINT-AS-MARK
**Primitives**: P03 → P06 → P49

**P03**: "The dot is to the point as the word 'cat' is to a cat. The word isn't the animal — it's a symbol that represents the animal. Similarly, a drawn dot is a symbol that represents a geometric point. The symbol and the thing it represents are not the same."

**P06 (CONTRAST):** A point at location (3, 2) is still at (3, 2) even if you erase the dot. The location doesn't disappear when you erase the mark — the mark was just pointing to it.

**P49**: "If you erase the dot representing point A, does point A still exist geometrically?"
- **CORRECT**: YES — the geometric point (the location) still exists; only the physical representation was erased → return.
- **PARTIAL/INCORRECT/NO_RESPONSE**: Reinforce: the mark is a pointer; erasing the pointer doesn't destroy what it pointed to → return.

### TA-B03 — Repair MC-3 COORDINATE-REQUIRED
**Primitives**: P27 → P06 → P49

**P27**: "MC-3 COORDINATE-REQUIRED: 'A point needs coordinates to exist.' This confuses the geometric concept with its analytic representation. Euclid defined points and proved theorems about them ~300 BCE — coordinates weren't invented until Descartes in 1637. Points existed (conceptually) for 2000 years without coordinates."

**P06 (CONTRAST):**
| Geometry type | Uses coordinates? | Points valid? |
|---|---|---|
| Euclidean (Euclid, 300 BCE) | NO | ✓ YES |
| Analytic/Cartesian (Descartes, 1637) | YES | ✓ YES |
| Projective geometry | NO (or homogeneous) | ✓ YES |

**P49**: "In Euclid's Elements, two points determine a unique line. No coordinate system is mentioned. Is this geometrically valid?"
- **CORRECT**: YES — fully valid; the geometric relationship between points doesn't require coordinates → return.
- **PARTIAL/INCORRECT/NO_RESPONSE**: Emphasize geometry can be done without coordinates; coordinates are one useful representation, not the definition → return.

---

## Component 6 — P89 Spaced Repetition Schedule

| Interval | Review Content | Pass Criterion |
|---|---|---|
| Day 1 | Q1 (dimensionless) + Q2 (dot vs. point) | 2/2 |
| Day 3 | Q3 (coordinate shift) + P76 (GPS) | 2/2 |
| Day 7 | Q4 + Q1 + Q2 (3 items) | 3/3 |
| Day 21 | All 4 Q items | 4/4 |
| Day 60 | Full 5-item mastery gate | 5/5 |

**Decay**: Failure → reset to Day 1 + TA-B routing by error type.

---

## Component 7 — Cross-Blueprint Dependencies

### Input Dependencies
| Blueprint | KG ID | What it supplies |
|---|---|---|
| Mathematical Thinking | math.found.mathematical-thinking | Ability to engage with abstract concepts |

### Output Unlocks
| Blueprint | KG ID | What this blueprint enables |
|---|---|---|
| Line | math.geom.line | A line is defined by two distinct points |
| Plane | math.geom.plane | A plane is defined by three non-collinear points |

### Cross-Links
- None. P76 uses independent real-world context (GPS coordinates).

---

## Component 8 — Teaching Notes

1. **Primitive status**: Stress that "point" is an undefined term in Euclidean geometry — it is characterized by axioms (Euclid's postulates), not defined. This is philosophically important but shouldn't distract from the practical concept.
2. **bloom=remember**: Objectives are recall/identification. TAs do not require application or analysis — just reliable recognition of what a point is (and isn't).
3. **Threshold=0.95**: The highest allowable error rate here is 1 in 20 items. This is high precision for a simple concept — justified by it being the foundation for all geometry.
4. **Forward link**: Two points determine a unique line (Euclid Postulate 1). Mention this connection in P78 completion to motivate the line blueprint.

---

## Component 10 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | Blueprint ID matches KG node ID | ✓ math.geom.point |
| V-2 | KG node ID exists in graph.json v1.0.1 | ✓ Verified |
| V-3 | All Component 0 fields populated | ✓ |
| V-4 | DIFFICULTY matches KG (foundational) | ✓ |
| V-5 | BLOOM matches KG (remember) | ✓ |
| V-6 | MASTERY_THRESHOLD matches KG (0.95) | ✓ |
| V-7 | ESTIMATED_HOURS matches KG (1) | ✓ |
| V-8 | REQUIRES listed; blueprint exists | ✓ math.found.mathematical-thinking ✓ |
| V-9 | CPA_ENTRY correct (foundational → C) | ✓ C |
| V-10 | SESSION_TA_CAP correct (hours=1 → max 7; used 4) | ✓ 4 ≤ 7 |
| V-11 | GR-1: non-repair TAs open with B-category primitive | ✓ A01:P27, A02:P06, A03:P11 |
| V-12 | GR-2: every non-gate TA has P49 | ✓ TA-A01 through TA-A03 |
| V-13 | GR-3: mastery gate TA terminal | ✓ TA-A04 uses P91 |
| V-14 | GR-4: P41/P64 gates repair in TA-B01 | ✓ P41 detects MC-1; P64 shifts concept |
| V-15 | GR-6: P91 terminal in TA-A04 | ✓ |
| V-16 | GR-7: P76 in mastery gate | ✓ P76 independence in TA-A04 |
| V-17 | GR-8: cross_links documented | ✓ cross_links = [] documented |
| V-18 | GR-9: P76 independence correct | ✓ P76 uses GPS context — no KG concept references |
| V-19 | GR-10: MAMR stated and enforced | ✓ MC-1 FOUNDATIONAL; Component 0 and 3; P74 routing |
| V-20 | Protocol B TAs open with B-category primitive | ✓ B01:P41, B02:P03, B03:P27 |
| AIR | All content fully specified; human tutor can execute | ✓ |

**PACKAGE_READY**: V-1 through V-20 PASS. AIR PASS.
