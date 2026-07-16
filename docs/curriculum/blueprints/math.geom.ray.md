# Teaching Blueprint: Ray

## Component 0 — Metadata Header

| Field | Value |
|---|---|
| BLUEPRINT_ID | math.geom.ray |
| KG_ID | math.geom.ray |
| KG_VERSION | v1.0.1 |
| STATUS | PACKAGE_READY |
| DOMAIN | Geometry |
| NAME | Ray |
| ALIASES | half-line |
| DIFFICULTY | foundational |
| BLOOM | remember |
| MASTERY_THRESHOLD | 0.95 |
| ESTIMATED_HOURS | 1 |
| REQUIRES | math.geom.line |
| UNLOCKS | math.geom.angle |
| CROSS_LINKS | (none) |
| CPA_ENTRY | C (Concrete) |
| SESSION_TA_CAP | 7 (hours ≥ 1h) |
| PROTOCOL_A_TA_COUNT | 3 (TA-A01 through TA-A03) |
| MASTERY_GATE_TA | TA-A03 (P91, terminal) |
| PASS_CRITERION | 4/4 (⌈0.95 × 4⌉ = 4; threshold = 0.95) |
| MAMR | MC-1 RAY-HAS-TWO-ENDPOINTS is FOUNDATIONAL; cleared before MC-2 or MC-3 in all repair routing |
| P76_MODE | Independence (cross_links = []; self-contained real-world context) |

---

## Component 1 — Cognitive Map

### Prerequisites Activated
- **math.geom.line**: A line extends infinitely in both directions with no endpoints. A ray is a HALF-LINE — the portion of a line that begins at one designated endpoint and extends infinitely in one direction.

### Target Understanding
1. A ray →AB is the set of all points on line ↔AB that start at A and continue through B and beyond, including A itself.
2. One endpoint: A is the sole endpoint (origin) of →AB. The ray starts at A and extends infinitely through B and past it.
3. Infinite extent: A ray has no finite length — it extends without end in one direction from its endpoint.
4. Direction: →AB and →BA are DIFFERENT rays. The first letter names the endpoint; the second names a point that fixes the direction.
5. A ray lies on its parent line ↔AB, specifically the half of ↔AB that begins at A.
6. Two opposite rays from the same endpoint together form a complete geometric line.

### Cross-Link Activation
- No cross-links. P76 uses an independence probe (a lighthouse beam).

---

## Component 2 — Misconception Registry

### MC-1 [FOUNDATIONAL] — RAY-HAS-TWO-ENDPOINTS
- **Trigger**: "A ray has two endpoints — a start at A and an end at B."
- **Root cause**: The visual notation →AB shows two named points, and the diagram looks like a finite object starting and stopping. Learner models the ray as a segment with an arrow.
- **Error pattern**: Calls both A and B "endpoints"; says the ray "ends at B"; draws a tick mark at B.
- **Repair**: TA-B01.
- **MAMR**: FOUNDATIONAL — addressed in TA-A02 via P41/P64; if triggered later, route to TA-B01 before returning.

### MC-2 — RAY-DIRECTION-INDETERMINATE
- **Trigger**: "Ray →AB and ray →BA are the same ray" (confusing with segments).
- **Root cause**: Segments ARE symmetric (─AB = ─BA). Learner applies this symmetry incorrectly to rays, which are directed.
- **Error pattern**: Says "→AB = →BA"; doesn't recognize that swapping letters changes both the endpoint and the direction of extension.
- **Repair**: TA-B02.
- **MAMR**: After MC-1 cleared. FIFO with MC-3.

### MC-3 — RAY-IS-HALF-SEGMENT
- **Trigger**: "A ray is half of a segment" or "a ray has a finite length, just without one endpoint."
- **Root cause**: Learner hears "half-line" but interprets "half" as halving a finite object (the segment) rather than halving an infinite one (the line).
- **Error pattern**: Draws a ray with a tick mark at the far end; assigns a finite length to a ray; says "the ray is 5 cm long."
- **Repair**: TA-B03.
- **MAMR**: After MC-1 cleared. FIFO with MC-2.

---

## Component 3 — Scaffolding Protocol

### CPA Entry: Concrete
Open with a flashlight or sunbeam (Concrete). Pictorial: draw →AB with a filled dot and tick mark at A (endpoint) and an arrow extending past B. Abstract: set-theoretic definition (all points on ↔AB at A or beyond A in the direction of B).

### MAMR Enforcement
MC-1 addressed in TA-A02 (P41/P64). Route → TA-B01 if triggered later. MC-2 and MC-3 FIFO.

---

## Component 4 — Protocol A (Main Teaching Sequence)

### TA-A01 — Ray as a Half-Line
**Primitives**: P03 → P11 → P49

**P03 (ANALOGY BRIDGE):**
- **Source**: A flashlight beam in a dark room. The flashlight itself (point A) is the source — the one fixed endpoint. The beam of light shoots outward through a dust particle in the air (point B) and continues past it into the far wall, through the wall, and on to infinity. The flashlight is the start; the beam has no end.
- **Target**: A ray →AB. Point A is the endpoint (the flashlight); point B is merely a named marker on the beam. The ray extends infinitely past B.
- **Connection to line**: If a second flashlight at A shines in the opposite direction (→AC where C is opposite to B), the two beams together illuminate the complete geometric line ↔BC.

**P11 (REPRESENTATION SHIFT):**
Three representations of ray →AB:
| Representation | Form | Key feature |
|---|---|---|
| Diagram | •A ────────→ (dot and tick mark at A; arrow at far end past B) | One endpoint (A); infinite extent |
| Symbolic | →AB | First letter = endpoint; second letter = direction marker |
| Contrast | →AB ≠ ─AB | Segment: tick marks at both ends, finite; Ray: tick mark at A, arrow past B, infinite |

Contrast with line (↔AB, arrows both ends, no endpoints) and segment (─AB, tick marks both ends, two endpoints, finite).

**P49:** "Flashlight A shines a beam through point B and beyond. Does the beam have an endpoint at B?"
- **CORRECT**: No — B is just a point the beam passes through on its way to infinity. Only A (the flashlight) is the endpoint. → TA-A02.
- **PARTIAL**: "B is a direction marker, not an endpoint. The arrow past B signals the ray continues forever." → TA-A02.
- **INCORRECT/NO_RESPONSE**: Redraw →AB with tick mark only at A and a clear arrow extending well past B; "the tick mark at A means 'starts here'; the arrow means 'never stops.'" → TA-A02.

---

### TA-A02 — Misconception Gate: RAY-HAS-TWO-ENDPOINTS (FOUNDATIONAL)
**Primitives**: P41 → P64 → P49

**P41 (MISCONCEPTION DETECTOR):**
Probe: "How many endpoints does ray →AB have? Name them."
- If learner says "two endpoints, A and B": proceed to P64.
- If learner correctly says "one endpoint, A": validate and use P49 to confirm understanding of direction asymmetry.

**P64 (CONCEPTUAL SHIFT):**
"Ray →AB has EXACTLY ONE endpoint: A. Point B is merely the direction label — it sits on the ray, but the ray continues past it without stopping. The arrow notation (→) signals infinite extension in one direction.
- Segment ─AB: A and B are BOTH endpoints (two tick marks). Finite object.
- Ray →AB: ONLY A is the endpoint (one tick mark). B is a direction marker. Infinite in one direction.

Read →AB as: 'Start at A, aim through B, never stop.'"

**P49:** "Which object has exactly one endpoint: (A) line ↔AB; (B) segment ─AB; (C) ray →AB?"
- **CORRECT**: C — ray →AB has exactly one endpoint (A). ↔AB has none; ─AB has two. → TA-A03.
- **PARTIAL**: Address the wrong choice; reinforce the tick-mark count. → TA-A03.
- **INCORRECT/NO_RESPONSE**: → TA-B01, then return.

---

### TA-A03 — P91 Mastery Gate (Terminal)
**Primitive**: P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78

**[GR-3: Terminal TA]** **[GR-6: P91 terminal]** **[GR-7: P76 present]**

**P77 (MULTI-PROBLEM SET):**
Q1: True or False: Ray →AB has two endpoints (A and B).
Q2: Are ray →AB and ray →BA the same ray? Explain.
Q3: Ray →PQ starts at point P, passes through point Q, and extends forever. What is the length of ray →PQ?

**P55 (SCORE):**
Q1: FALSE — →AB has exactly one endpoint, A. Point B is the direction marker; the ray passes through B and continues infinitely.
Q2: NO — →AB starts at A and extends through B (and beyond). →BA starts at B and extends through A (and beyond). Different endpoints, opposite directions: they are distinct rays.
Q3: The ray has no finite length — it extends infinitely. Length is undefined (infinite) for a ray.

**P76 (TRANSFER PROBE — Independence):**
A lighthouse at point L sends a beam of light toward a ship at point S, then continues past the ship out into the open ocean indefinitely.
(a) Is this beam best modeled as a geometric line, line segment, or ray?
(b) How many endpoints does the model have, and where is the endpoint located?
(c) A sailor says "the beam from L through S is the same as the beam from S through L." Is this correct?

**Expected**: (a) Ray — starts at L, passes through S, extends to infinity; one endpoint. (b) One endpoint: L (the lighthouse). (c) No — →LS starts at L; →SL starts at S. They travel in opposite directions and have different endpoints.

**P55 (SCORE):** Ray identified; one endpoint at L stated; asymmetry of →LS and →SL correctly explained.

**P75 (MASTERY ASSESSMENT):** Items: Q1, Q2, Q3, P76 = **4 items**. Pass: **4/4** (⌈0.95×4⌉ = 4).
- PASS → P78.
- FAIL → P74.

**P74 (ROUTING DECISION):**
- PASS → P78.
- Q1 wrong → TA-B01 (RAY-HAS-TWO-ENDPOINTS; apply MAMR).
- Q2 wrong → TA-B02 (RAY-DIRECTION-INDETERMINATE).
- Q3 wrong → TA-B03 (RAY-IS-HALF-SEGMENT).
- P76 wrong → TA-B01 or TA-B02 depending on error type (endpoint confusion → B01; direction symmetry error → B02).
- Multiple → MAMR: TA-B01 first; FIFO TA-B02, TA-B03; re-gate.

**P78 (COMPLETION):** Mastery confirmed. Schedule P89. Activate: math.geom.angle.

---

## Component 5 — Protocol B (Repair Chains)

### TA-B01 — Repair MC-1 RAY-HAS-TWO-ENDPOINTS
**Primitives**: P41 → P06 → P64 → P49

**P41**: "You said two endpoints — does the ray ever stop at B? What does the arrow past B mean in the diagram?"

**P06 (CONTRAST):**
| | Segment ─AB | Ray →AB |
|---|---|---|
| Endpoints | Two (A and B) | One (A only) |
| Length | Finite: \|AB\| | Undefined (infinite) |
| Diagram | Tick marks at BOTH ends | Tick mark at A; arrow past B |

**P64**: "In geometry: SEGMENT = finite, two endpoints. RAY = half-line, ONE endpoint (A), infinite extension past B. Point B in →AB marks direction; it is not an endpoint. The arrow past B means the ray continues forever."

**P49**: "Name the endpoint(s) of ray →PQ."
- **CORRECT**: P only — P is the endpoint; Q is the direction marker on the infinite ray. → return.
- **PARTIAL/INCORRECT/NO_RESPONSE**: "The tick mark is at P only. P is where the ray starts. Q is just a point the ray passes through on its way to infinity." → return.

---

### TA-B02 — Repair MC-2 RAY-DIRECTION-INDETERMINATE
**Primitives**: P06 → P27 → P49

**P27**: "MC-2 RAY-DIRECTION-INDETERMINATE: '→AB = →BA.' This is false for RAYS. Unlike segments (where ─AB = ─BA), rays ARE directed. →AB starts at A and points through B. →BA starts at B and points through A. They have different endpoints and travel in opposite directions."

**P06 (CONTRAST):**
| | Segment ─AB | Ray →AB | Ray →BA |
|---|---|---|---|
| Symmetric? | Yes: ─AB = ─BA | No | No |
| Endpoint | A and B | A only | B only |
| Direction | none | A → B → ∞ | B → A → ∞ |

**P49**: "What is the endpoint of ray →RS?"
- **CORRECT**: R — the first letter is always the endpoint. → return.
- **PARTIAL/INCORRECT/NO_RESPONSE**: "First letter = endpoint. →RS: endpoint is R. The ray fires from R, passes through S, and extends past S forever." → return.

---

### TA-B03 — Repair MC-3 RAY-IS-HALF-SEGMENT
**Primitives**: P27 → P06 → P49

**P27**: "MC-3 RAY-IS-HALF-SEGMENT: 'A ray is half of a segment.' Wrong. A ray is half of a LINE, not half of a segment. A segment is finite with two endpoints. A ray is infinite — it starts at one endpoint and extends forever. 'Half-line' is another correct name for a ray. There is no such thing as a 'half-segment' in geometry."

**P06 (CONTRAST):**
| | Segment ─AB | Ray →AB |
|---|---|---|
| Length | Finite: \|AB\| | Infinite (undefined) |
| Endpoints | 2 | 1 |
| "Half of…" | Not applicable | Half of line ↔AB |

**P49**: "Is a ray finite or infinite in length?"
- **CORRECT**: Infinite — a ray extends without end in one direction; it has no finite length. → return.
- **PARTIAL/INCORRECT/NO_RESPONSE**: "A ray is infinite. It extends forever in one direction from its endpoint. Only segments have finite, measurable length." → return.

---

## Component 6 — P89 Spaced Repetition Schedule

| Interval | Review Content | Pass Criterion |
|---|---|---|
| Day 1 | Q1 (endpoints) + Q2 (→AB vs →BA) | 2/2 |
| Day 3 | Q3 (length of ray) + P76 (a, b) | 2/2 |
| Day 7 | Mixed 2-item: classify line/ray/segment; name the endpoint of a given ray | 2/2 |
| Day 21 | Q1, Q2, Q3 (3 items) | 3/3 |
| Day 60 | Full 4-item mastery gate | 4/4 |

**Decay**: Failure → reset to Day 1 + TA-B routing.

---

## Component 7 — Cross-Blueprint Dependencies

### Input Dependencies
| Blueprint | KG ID | What it supplies |
|---|---|---|
| Line | math.geom.line | The parent line ↔AB on which the ray lies; the concept of infinite extension in both directions |

### Output Unlocks
| Blueprint | KG ID | What this blueprint enables |
|---|---|---|
| Angle | math.geom.angle | An angle is formed by two rays sharing a common endpoint (the vertex) |

### Cross-Links
- None.

---

## Component 8 — Teaching Notes

1. **Ray vs. vector**: Both rays and vectors are directed. A vector also has a defined magnitude (length); a ray is purely geometric and infinite. Do not introduce vectors here — they are not a foundational prerequisite and the distinction belongs in a later blueprint.
2. **Notation**: →AB in this blueprint denotes a ray starting at A through B. Some textbooks write with a ray-arrow over "AB"; both mean the same thing. Accept either notation.
3. **Two opposite rays = a line**: Two rays →AB and →AC where C is on the opposite side of A from B share endpoint A and together form line ↔BC. This is a natural segue to math.geom.angle (supplementary angles, linear pairs); introduce only if it arises naturally.
4. **Bloom level**: REMEMBER — classify, name, identify endpoint vs. direction marker, recognize infinite extent. No proofs, no formula derivations.

---

## Component 10 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | Blueprint ID matches KG node ID | ✓ math.geom.ray |
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
| V-14 | GR-4: P41/P64 gates repair chain in TA-A02 | ✓ P41 detects MC-1; P64 shifts two-endpoint→one-endpoint |
| V-15 | GR-6: P91 terminal in TA-A03 | ✓ |
| V-16 | GR-7: P76 in mastery gate | ✓ P76 independence probe (lighthouse beam) |
| V-17 | GR-8: cross_links documented | ✓ (none) — stated in Component 0 and Component 7 |
| V-18 | GR-9: P76 mode correct (cross_links=[] → independence probe) | ✓ |
| V-19 | GR-10: MAMR stated and enforced | ✓ MC-1 FOUNDATIONAL; P74 routing |
| V-20 | Protocol B TAs open with B-category primitive | ✓ B01:P41, B02:P06, B03:P27 |
| AIR | All content fully specified; human tutor can execute without AI | ✓ |

**PACKAGE_READY**: V-1 through V-20 PASS. AIR PASS.
