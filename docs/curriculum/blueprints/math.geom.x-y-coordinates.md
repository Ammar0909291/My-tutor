# Teaching Blueprint: Cartesian Coordinates
**ID:** `math.geom.x-y-coordinates`
**Version:** 1.0
**Status:** PACKAGE_READY
**Spec:** Teaching Blueprint Specification v1.0

---

## Component 0 — Metadata

| Field | Value |
|---|---|
| concept_id | `math.geom.x-y-coordinates` |
| concept_name | Cartesian Coordinates |
| domain | geometry |
| difficulty | developing |
| bloom | remember |
| mastery_threshold | 0.95 |
| estimated_hours | 3 |
| requires | `math.geom.coordinate-plane` |
| unlocks | (none) |
| cross_links | (none) |
| blueprint_version | 1.0 |
| authored_date | 2026-07-12 |
| CPA_ENTRY_STAGE | C |

---

## Component 1 — Cognitive Map

### 1.1 Core Insight
The ordered pair (x, y) encodes a unique location in the coordinate plane as two independent signed distances: x is the signed horizontal distance from the y-axis (positive = right, negative = left), and y is the signed vertical distance from the x-axis (positive = up, negative = down). Order is essential — (x, y) ≠ (y, x) in general.

### 1.2 Knowledge Prerequisites (Activated)
- **math.geom.coordinate-plane:** The plane has two perpendicular signed axes (x and y) intersecting at the origin; four quadrants with known sign patterns.

### 1.3 Conceptual Sequence
1. Each coordinate measures a signed distance along one axis from the origin.
2. The x-coordinate comes first (horizontal); y-coordinate comes second (vertical).
3. Plotting: start at origin → move |x| units horizontally (direction = sign of x) → move |y| units vertically (direction = sign of y).
4. Reading: given a plotted point, count signed horizontal offset → x; signed vertical offset → y.
5. Order matters: (3, 5) and (5, 3) are different points.

### 1.4 Transfer Target
Reading and plotting any ordered pair (x, y) including negative and fractional coordinates; understanding (x, y) as a two-component position descriptor applicable to real-world and mathematical settings.

---

## Component 2 — Misconception Registry

| ID | Name | Surface Pattern | Root Cause | Priority |
|---|---|---|---|---|
| MC-1 | COORDINATE-SWAP | Plots (3, 5) at horizontal=5, vertical=3 | Reads or applies coordinates in (y, x) order instead of (x, y) | FOUNDATIONAL |
| MC-2 | SIGN-IGNORED | Treats (−3, 2) as equivalent to (3, 2); ignores negative | Treats coordinates as magnitudes only; doesn't connect sign to direction | SECONDARY |
| MC-3 | ORIGIN-MISSING | Counts from a corner of the visible grid rather than from (0, 0) | Doesn't recognise the origin as the universal reference point | SECONDARY |

**MAMR:** MC-1 FOUNDATIONAL cleared first. MC-2 and MC-3 addressed FIFO thereafter.

---

## Component 3 — Scaffolding Protocol

| Stage | Condition | Entry Action |
|---|---|---|
| C (Concrete) | developing → always | Begin TA-A01 with street-address analogy |
| P (Pictorial) | After C → introduce grid, plot and read points | TA-A02 (graph ↔ coordinates representation shift) |
| A (Abstract) | After P → swap and sign drills | TA-A03 (contrast pair for order and sign) |

---

## Component 4 — Protocol A (Main Teaching Protocol)

### TA-A01 — Concrete Opening: Address Analogy
**Primitives:** P03 (ANALOGY BRIDGE), P49 (ADAPTIVE CHECKPOINT)
**Grammar:** GR-1 ✓ (opens with B-category P03); GR-2 ✓ (P49 present)

**P03 — ANALOGY BRIDGE**
> "Imagine a city grid. From City Hall (the origin), every address is given as:
> *(east-west blocks, north-south floors)*
>
> - '3 blocks east, 5 floors up' → address **(3, 5)** — x = 3, y = 5.
> - '2 blocks west, 4 floors up' → **(−2, 4)** — west is negative x.
> - '1 block east, 3 floors down' → **(1, −3)** — down is negative y.
>
> The **x-coordinate** (first number) says *how far east or west*; the **y-coordinate** (second number) says *how far up or down*. Order matters — east-west always comes first."

**P49 — ADAPTIVE CHECKPOINT**
> "Which address puts you 4 blocks east and 2 floors up: (4, 2) or (2, 4)? What does (2, 4) describe instead?"

| Branch | Criterion | Next |
|---|---|---|
| CORRECT | (4, 2) = 4 east + 2 up; (2, 4) = 2 east + 4 up | TA-A02 |
| PARTIAL | Identifies (4, 2) correctly but cannot explain (2, 4) | TA-A02 (monitor MC-1 risk in TA-A03) |
| INCORRECT | Chooses (2, 4) for 4 east + 2 up | TA-B01 (MC-1 repair) → TA-A02 |
| NO_RESPONSE | No answer | "Which number comes first in (4, 2)? What direction does 4 represent?" If stuck → TA-B01 |

---

### TA-A02 — Representation Shift: Graph ↔ Coordinates
**Primitives:** P11 (REPRESENTATION SHIFT), P49 (ADAPTIVE CHECKPOINT)
**Grammar:** GR-1 ✓ (P11 is B-category); GR-2 ✓

**P11 — REPRESENTATION SHIFT**

*Graph → Coordinates:*
> [Describe a plotted point.] Point A is 3 units to the right of the y-axis and 2 units above the x-axis. Its coordinates: x = **3**, y = **2** → **A = (3, 2)**.
>
> Point B is 4 units to the left and 1 unit below the origin. x = **−4**, y = **−1** → **B = (−4, −1)**. (Quadrant III: both negative.)

*Coordinates → Graph:*
> To plot C = (−2, 3): start at origin → move **2 units left** (x = −2) → move **3 units up** (y = 3) → mark the point. (Quadrant II: x negative, y positive.)

**P49 — ADAPTIVE CHECKPOINT**
> "Point D is plotted 5 units to the right and 3 units below the origin. State D's coordinates. Then: plot E = (−1, 4) — which quadrant is E in?"

| Branch | Criterion | Next |
|---|---|---|
| CORRECT | D = (5, −3); E in Quadrant II | TA-A03 |
| PARTIAL | D correct; E quadrant wrong (sign error) | TA-B02 (MC-2 repair) → TA-A03 |
| INCORRECT | D has coordinates swapped: (−3, 5) | TA-B01 (MC-1 repair) → TA-A03 |
| NO_RESPONSE | No answer | Step through D: "How far right? That's x. How far down? That's y." If stuck → TA-B01 |

---

### TA-A03 — Order and Sign: Contrast Pair
**Primitives:** P06 (CONTRAST PAIR), P49 (ADAPTIVE CHECKPOINT)
**Grammar:** GR-1 ✓ (P06 is B-category); GR-2 ✓

**P06 — CONTRAST PAIR**
> | Pair | Difference |
> |---|---|
> | (3, 5) vs (5, 3) | Different points: (3, 5) is 3 right, 5 up; (5, 3) is 5 right, 3 up |
> | (−2, 4) vs (2, 4) | Different points: left of y-axis vs right of y-axis — same distance, opposite side |
> | (0, 6) vs (6, 0) | (0, 6) is on the y-axis; (6, 0) is on the x-axis — neither is the origin |
> | (0, 0) | The origin — the one point where both coordinates are zero |
>
> **Two rules:**
> 1. (x, y): x always comes first (horizontal), y second (vertical).
> 2. Sign encodes direction: positive = right/up; negative = left/down.

**P49 — ADAPTIVE CHECKPOINT**
> "Locate these four points and identify the quadrant (or axis) for each: (a) (−3, −5)   (b) (4, 0)   (c) (0, −2)   (d) (−1, 6)"

| Branch | Criterion | Next |
|---|---|---|
| CORRECT | (a) Q III, (b) positive x-axis, (c) negative y-axis, (d) Q II | TA-A04 |
| PARTIAL | (a) and (d) correct; error on axis points (b) or (c) | TA-A04 (minor; axis membership addressed in next session if needed) |
| INCORRECT | Any swap of (x, y) order | TA-B01 (MC-1 repair) → TA-A04 |
| NO_RESPONSE | No answer | "What is x in (−3, −5)? Is it positive or negative? Which direction does that send us?" |

---

### TA-A04 — Mastery Gate
**Primitive:** P91 (P77→P55→P76→P55→P75→P55→P74→P55→P78)
**Grammar:** GR-3 ✓ (terminal); GR-6 ✓; GR-7 ✓ (P76 in gate); GR-9: cross_links = [] → P76 INDEPENDENCE PROBE

**pass_criterion:** ⌈0.95 × 5⌉ = **5 / 5** (4 P77 items + 1 P76 item)

**P77 — MULTI-PROBLEM SET (4 items)**
1. A point is 4 units right of the y-axis and 7 units above the x-axis. Write its coordinates.
2. Point P = (−5, 2). What is P's x-coordinate? What quadrant is P in?
3. True or false: (2, −3) and (−3, 2) refer to the same point.
4. Plot all four points: A = (3, 4), B = (−3, 4), C = (3, −4), D = (−3, −4). Describe the symmetry you observe.

**P55 — SCORE** (tally P77 results)

**P76 — TRANSFER PROBE (INDEPENDENCE)**
> A ladder leans against a wall. The base rests on the floor 3 units away from the base of the wall, and the top touches the wall 4 units above the floor. Using the floor as the x-axis and the wall as the y-axis, with the corner where they meet as the origin:
>
> (a) What are the coordinates of the base of the ladder?
> (b) What are the coordinates of the top of the ladder?
> (c) The midpoint of the ladder is equidistant from both ends. Without computing, what do you expect the coordinates of the midpoint to be? (Estimate; do not compute formally.)

*(Expected: (a) (3, 0); (b) (0, 4); (c) roughly (1.5, 2).)*

**P55 — SCORE** (add P76 result)

**P75 — MASTERY ASSESSMENT**
- pass: 5 / 5 → MASTERY ACHIEVED
- fail: ≤ 4 / 5 → MASTERY NOT ACHIEVED

**P55 — SCORE** (record mastery outcome)

**P74 — ROUTING DECISION**
- MASTERY ACHIEVED → P78
- MASTERY NOT ACHIEVED → P77 item 1 or 3 failed → TA-B01; P77 item 2 failed → TA-B02; re-enter TA-A02

**P55 — SCORE** (record routing)

**P78 — COMPLETION**
> "You can now read and plot any ordered pair (x, y) in all four quadrants, including negative and zero coordinates, and you understand that order matters — (x, y) and (y, x) are generally different points. These coordinates are the language of all of 2D geometry and every function graph you will encounter."

---

## Component 5 — Protocol B (Repair Protocol)

### TA-B01 — Repair: COORDINATE-SWAP (MC-1 FOUNDATIONAL)
**Primitives:** P27 (MISCONCEPTION NAMING), P41 (MISCONCEPTION DETECTOR), P64 (CONCEPTUAL SHIFT), P49 (ADAPTIVE CHECKPOINT)
**Grammar:** GR-4 ✓

**P27 — MISCONCEPTION NAMING**
> "The error **COORDINATE-SWAP** reads (x, y) as (y, x): the second number is applied horizontally and the first vertically. This swaps every point to a reflected position."

**P41 — MISCONCEPTION DETECTOR**
> "In the ordered pair (3, 5): which number comes *first* in the parentheses? Does 'first' correspond to horizontal (left-right) or vertical (up-down)?"

**P64 — CONCEPTUAL SHIFT**
> "The notation (x, y) is a fixed contract: x is *always* first and *always* horizontal; y is *always* second and *always* vertical. A helpful mnemonic: **x comes before y in the alphabet — and horizontal (left-right) comes before vertical (up-down) in the address.** The pair (3, 5) says '3 horizontal, 5 vertical' — never the reverse."

**P49 — ADAPTIVE CHECKPOINT**
> "Plot the point (2, 7): start at origin, move horizontally first, then vertically. State the coordinates of a point that is 7 right and 2 up — is it the same point?"

| Branch | Criterion | Next |
|---|---|---|
| CORRECT | (2, 7) plotted correctly; (7, 2) is different | Return to TA-A02 CORRECT branch |
| INCORRECT | Still swaps | Physically mark x-axis as 'horizontal first'; repeat with student tracing the motion |

---

### TA-B02 — Repair: SIGN-IGNORED (MC-2)
**Primitives:** P27 (MISCONCEPTION NAMING), P64 (CONCEPTUAL SHIFT), P49 (ADAPTIVE CHECKPOINT)

**P27 — MISCONCEPTION NAMING**
> "The error **SIGN-IGNORED** treats x = −3 and x = 3 as the same distance from the y-axis, ignoring that the sign encodes which *side*. Negative x is left; positive x is right — these are different locations."

**P64 — CONCEPTUAL SHIFT**
> "The coordinate's sign is not optional extra information — it is the direction. (−3, 2) and (3, 2) are mirror images of each other across the y-axis, both 3 units away from it but on opposite sides. Dropping the sign collapses two distinct points into one."

**P49 — ADAPTIVE CHECKPOINT**
> "Plot both (−4, 1) and (4, 1). Are they the same point? Which is in Quadrant II and which in Quadrant I?"

| Branch | Criterion | Next |
|---|---|---|
| CORRECT | Two distinct points; (−4,1) in Q II, (4,1) in Q I | Return to TA-A02 PARTIAL branch |
| INCORRECT | Plots both at same location | Show physically: start at origin, move 4 right vs 4 left — end at different spots |

---

### TA-B03 — Repair: ORIGIN-MISSING (MC-3)
**Primitives:** P27 (MISCONCEPTION NAMING), P64 (CONCEPTUAL SHIFT), P49 (ADAPTIVE CHECKPOINT)

**P27 — MISCONCEPTION NAMING**
> "The error **ORIGIN-MISSING** counts coordinates from a corner or edge of the visible grid rather than from the origin (0, 0). This produces a shifted answer — every point is off by the distance from the real origin to the false starting point."

**P64 — CONCEPTUAL SHIFT**
> "Every coordinate is a signed distance from the **origin (0, 0)** — not from the edge of the paper or the corner of the grid. The origin is where the two axes cross. No matter how large the grid is drawn, (0, 0) is always the crossing point. Mark it explicitly before plotting any point."

**P49 — ADAPTIVE CHECKPOINT**
> "On a coordinate plane where the origin is marked with a dot, plot (3, −2). Confirm: did you start at the origin dot, or at a corner?"

| Branch | Criterion | Next |
|---|---|---|
| CORRECT | Point at correct location from origin | Return to TA-A02 CORRECT branch |
| INCORRECT | Point offset from origin | Physically draw an arrow from origin to the point; verify starting reference |

---

## Component 6 — P89 Spaced Repetition

**P89 — SPACED REPETITION SCHEDULE**

| Interval | Probe Type | Content |
|---|---|---|
| Day 1 (consolidation) | Plot and read | Plot 4 points (one per quadrant); read coordinates of 2 plotted points |
| Day 3 | Order check | Given (a, b) and (b, a) for a ≠ b, locate both; confirm they are different |
| Day 7 | Mixed application | Match 5 descriptions (e.g., "3 left, 4 down") to their ordered pairs |
| Day 30 | Transfer | Given a function table y = 2x, list 5 (x, y) pairs; plot them; describe the pattern |

---

## Component 7 — Cross-Blueprint Dependencies

**GR-8 ✓:** All cross_links documented.

| Dependency | Direction | Relationship |
|---|---|---|
| `math.geom.coordinate-plane` | REQUIRES | Provides the axis system; sign conventions; quadrant definitions |
| (no Tier 1 unlocks) | UNLOCKS | — |
| (no cross_links) | CROSS-LINK | — |

---

## Component 8 — Teaching Notes

- **CPA enforcement:** Develop with a physical grid (graph paper or floor grid) before moving to abstract plotted diagrams. The C stage here is a tactile "walk to the point" activity — student physically steps from origin.
- **Order mnemonic:** "Alphabetical and directional: x before y, horizontal before vertical." Reinforce this consistently; do not introduce alternative mnemonics that conflict.
- **Axis-special points:** Points on the axes (x=0 or y=0) confuse some students. Address in TA-A03's P49 branch but don't overload early — axis points become more important in function graphing.
- **bloom=remember:** This blueprint is recall/recognition level. Probes test whether students can state, read, and plot coordinates — not whether they can derive or prove properties. P49 branches are simpler than for higher-bloom concepts.
- **P76 independence probe:** The ladder transfer probe introduces coordinates as position descriptors in a physical context. Credit P76 if (a) and (b) are correct; (c) is estimation and is graded generously (±0.5 unit for each coordinate is acceptable).

---

## Component 10 — Validation Checklist

### V-1 through V-20

| Code | Check | Status |
|---|---|---|
| V-1 | All 10 components present (0–8, 10) | PASS |
| V-2 | Component 0 metadata complete and accurate | PASS |
| V-3 | CPA_ENTRY_STAGE = C (developing difficulty) | PASS |
| V-4 | GR-1: every non-repair TA opens with B-category primitive | PASS (A01:P03, A02:P11, A03:P06, A04:P91) |
| V-5 | GR-2: every non-gate TA contains P49 | PASS (A01–A03 each have P49; A04 is gate) |
| V-6 | GR-3: mastery gate TA (A04) is terminal | PASS |
| V-7 | GR-4: repair TAs contain P41/P64 | PASS (B01:P27+P41+P64; B02:P27+P64; B03:P27+P64) |
| V-8 | GR-6: P91 terminal in TA-A04 | PASS (ends with P78) |
| V-9 | GR-7: P76 present in mastery gate | PASS (TA-A04) |
| V-10 | GR-8: all cross_links documented in Component 7 | PASS (cross_links = none) |
| V-11 | GR-9: P76 mode — cross_links = [] → INDEPENDENCE PROBE | PASS |
| V-12 | GR-10: MAMR stated and enforced | PASS (MC-1 FOUNDATIONAL first; B01 before B02/B03) |
| V-13 | P91 sequence: P77→P55→P76→P55→P75→P55→P74→P55→P78 | PASS |
| V-14 | pass_criterion: ⌈0.95 × 5⌉ = 5/5 | PASS |
| V-15 | bloom=remember — P07 not required | PASS (no P07; not a bloom=apply concept) |
| V-16 | P49 in every non-gate TA has all 4 branches | PASS |
| V-17 | Session TA cap (h=3 ≥ 1h → max 7): 4 main + 3 repair = 7 total; happy path 4 TAs | PASS |
| V-18 | P89 spaced repetition schedule present (≥ 4 intervals) | PASS |
| V-19 | Component 7 documents all requires/unlocks/cross_links | PASS |
| V-20 | Misconception registry: ≥ 3 MCs, one FOUNDATIONAL | PASS |

### AIR

| Dimension | Check | Status |
|---|---|---|
| Accuracy | (−4,1) Q II ✓; (4,1) Q I ✓; (0,6) on y-axis ✓; (6,0) on x-axis ✓; ladder (3,0) and (0,4) ✓ | PASS |
| Integrity | No component contradicts another; MAMR chain consistent | PASS |
| Relevance | Every TA addresses coordinate reading/plotting; P76 transfers to physical coordinate interpretation | PASS |

**PACKAGE_READY: YES**
