# Teaching Blueprint: Vector
**ID:** `math.linalg.vector`
**Version:** 1.0
**Status:** PACKAGE_READY
**Spec:** Teaching Blueprint Specification v1.0

---

## Component 0 — Metadata

| Field | Value |
|---|---|
| concept_id | `math.linalg.vector` |
| concept_name | Vector |
| domain | linear algebra |
| difficulty | developing |
| bloom | understand |
| mastery_threshold | 0.9 |
| estimated_hours | 3 |
| requires | `math.found.real-numbers`, `math.geom.x-y-coordinates` |
| unlocks | `math.linalg.vector-space`, `math.linalg.dot-product` |
| cross_links | `math.geom.vectors-2d` (Tier 1), `math.geom.vectors-3d` (Tier 1) |
| blueprint_version | 1.0 |
| authored_date | 2026-07-12 |
| CPA_ENTRY_STAGE | C |

---

## Component 1 — Cognitive Map

### 1.1 Core Insight
A vector in ℝⁿ is an **ordered n-tuple of real numbers** (v₁, v₂, …, vₙ). Two interpretations coexist: **geometric** (an arrow with magnitude and direction, anchored to no fixed point) and **algebraic** (an element of ℝⁿ — a list of components). The ordered-tuple definition unifies both. Two vectors are equal if and only if all corresponding components are equal. The zero vector **0** = (0, 0, …, 0) is the unique vector with every component zero.

### 1.2 Knowledge Prerequisites (Activated)
- **math.found.real-numbers:** Components are real numbers; the complete ordered field ℝ is the coefficient domain.
- **math.geom.x-y-coordinates:** Ordered pairs (x, y) as signed distances; provides the geometric reading of 2D vectors.

### 1.3 Conceptual Sequence
1. Vector = ordered n-tuple: (v₁, v₂, …, vₙ) where each vᵢ ∈ ℝ.
2. Two geometric interpretations: position vector (arrow from origin to point) vs free vector (displacement — can be placed anywhere).
3. Dimension: the n in ℝⁿ is the number of components; vectors in ℝ² are 2D, ℝ³ are 3D.
4. Equality: **u** = **v** iff uᵢ = vᵢ for all i (component-wise).
5. Zero vector: **0** = (0, 0, …, 0); the unique vector with all components zero.
6. Notation: boldface **v**, arrow ⃗v, column [v₁; v₂; …; vₙ], or row (v₁, v₂, …, vₙ).

### 1.4 Transfer Target
Reading a vector's components, determining dimension, asserting equality/inequality of vectors, and recognising the geometric arrow interpretation in ℝ²; understanding that vectors carry direction as well as magnitude.

---

## Component 2 — Misconception Registry

| ID | Name | Surface Pattern | Root Cause | Priority |
|---|---|---|---|---|
| MC-1 | VECTOR-IS-POINT | Treats vector (3, 4) as identical to the geometric point (3, 4) at a fixed location | Shared notation — ordered pairs used for both coordinates and vectors — leads to conflating displacement with location | FOUNDATIONAL |
| MC-2 | VECTOR-ORDER-FREE | Claims (3, 4) and (4, 3) are the same vector | Confuses vector with set; ignores the "ordered" in ordered tuple | SECONDARY |
| MC-3 | VECTOR-IS-MAGNITUDE | Says "the vector is √5" when asked about **(1, 2)**; conflates the vector with its scalar length | Magnitude is computed frequently, leading student to discard directional information | SECONDARY |

**MAMR:** MC-1 FOUNDATIONAL cleared first. MC-2 and MC-3 addressed FIFO thereafter.

---

## Component 3 — Scaffolding Protocol

| Stage | Condition | Entry Action |
|---|---|---|
| C (Concrete) | developing → always | Begin TA-A01 with displacement-arrow analogy |
| P (Pictorial) | After C → geometric arrow diagrams | TA-A02 (representation shift between arrow, tuple, and coordinate forms) |
| A (Abstract) | After P → equality, ordering, zero vector | TA-A03 (contrast pair: vector vs point, two orderings) |

---

## Component 4 — Protocol A (Main Teaching Protocol)

### TA-A01 — Concrete Opening: Displacement Arrow
**Primitives:** P03 (ANALOGY BRIDGE), P49 (ADAPTIVE CHECKPOINT)
**Grammar:** GR-1 ✓ (opens with B-category P03); GR-2 ✓ (P49 present)

**P03 — ANALOGY BRIDGE**
> "Imagine giving walking directions: 'Go 3 blocks east and 4 blocks north.' This instruction encodes a **displacement** — a movement with both distance and direction.
>
> A **vector** captures this: **v** = (3, 4). The first component says 'how far east' and the second says 'how far north.'
>
> Two key distinctions:
> 1. A *point* (3, 4) is a fixed location on the map. A *vector* (3, 4) is a displacement arrow — it can start anywhere. What matters is the direction and length of the arrow, not where it starts.
> 2. The same displacement (3, 4) applied from (0,0) ends at (3,4); applied from (1,2) ends at (4,6). Same vector, different start points.
>
> Formally: a vector **v** = (v₁, v₂) ∈ ℝ² is an ordered pair of real numbers representing a displacement in the plane."

**P49 — ADAPTIVE CHECKPOINT**
> "Vector **u** = (5, −2). Does **u** describe a unique location on the plane? If I place the arrow starting at (1, 3), where does it end? If I start at (0, 0), where does it end?"

| Branch | Criterion | Next |
|---|---|---|
| CORRECT | **u** is not a unique location; ends at (6,1) and (5,−2) respectively | TA-A02 |
| PARTIAL | End points correct; still says "the vector is the point (5,−2)" | TA-B01 (MC-1 repair) → TA-A02 |
| INCORRECT | Says both endpoints are the same (confuses with fixed point) | TA-B01 (MC-1 repair) → TA-A02 |
| NO_RESPONSE | No answer | "Starting at (1,3), move 5 right and 2 down. What coordinates do you land on?" |

---

### TA-A02 — Representation Shift: Arrow ↔ Tuple ↔ Column
**Primitives:** P11 (REPRESENTATION SHIFT), P49 (ADAPTIVE CHECKPOINT)
**Grammar:** GR-1 ✓ (P11 is B-category); GR-2 ✓

**P11 — REPRESENTATION SHIFT**
> The same vector has three equivalent representations:
>
> | Representation | Form | Example |
> |---|---|---|
> | Geometric arrow | Arrow from tail to tip; tail can be anywhere | Arrow pointing 3 right, 4 up |
> | Row vector (tuple) | (v₁, v₂, …, vₙ) | (3, 4) |
> | Column vector | [v₁; v₂; …; vₙ] | [3; 4] (stack vertically) |
>
> *Converting arrow → tuple:* Read the horizontal component (x-change) as v₁ and vertical (y-change) as v₂.
>
> *Converting tuple → arrow:* From any start point, move v₁ horizontally and v₂ vertically to draw the tip.
>
> *3D extension:* **w** = (2, −1, 5) ∈ ℝ³ has three components; the third axis goes depth-wise. Dimension = number of components = 3.

**P49 — ADAPTIVE CHECKPOINT**
> "An arrow starts at (2, 1) and ends at (5, 6). (a) What is the vector represented by this arrow? (b) Write it as a column vector. (c) What is the dimension of this vector?"

| Branch | Criterion | Next |
|---|---|---|
| CORRECT | (a) (3, 5); (b) [3; 5]; (c) 2 | TA-A03 |
| PARTIAL | (a) and (b) correct; (c) says "2D" not "2" | TA-A03 (acceptable terminology) |
| INCORRECT | (a) (5, 6) — used endpoint as vector | TA-B01 (MC-1 repair) → TA-A03 |
| NO_RESPONSE | No answer | "The vector = (end) − (start) for each component: x: 5−2=3; y: 6−1=5." |

---

### TA-A03 — Equality and Order: Contrast Pair
**Primitives:** P06 (CONTRAST PAIR), P49 (ADAPTIVE CHECKPOINT)
**Grammar:** GR-1 ✓ (P06 is B-category); GR-2 ✓

**P06 — CONTRAST PAIR**
> | Pair | Equal? | Reason |
> |---|---|---|
> | (3, 4) and (3, 4) | **Yes** | All components match: 3=3 and 4=4 |
> | (3, 4) and (4, 3) | **No** | Components in different order: 3≠4 in position 1 |
> | (2, 0, −1) and (2, −1, 0) | **No** | Second components differ: 0 ≠ −1 |
> | Vector (3, 4) and point (3, 4) | **Different objects** | Same notation, different meaning: vector = displacement; point = location |
>
> **Equality rule:** **u** = **v** iff uᵢ = vᵢ for every index i. Order of components is part of the definition of the vector.

**P49 — ADAPTIVE CHECKPOINT**
> "(a) Are (1, 2, 3) and (1, 3, 2) equal vectors? (b) Find a vector **w** ≠ (2, 5) that has the same *magnitude* as (2, 5). (Hint: magnitude of (2,5) = √(4+25) = √29.)"

| Branch | Criterion | Next |
|---|---|---|
| CORRECT | (a) No (different components); (b) e.g., (5, 2) or (−2, 5) or any (a,b) with a²+b²=29 | TA-A04 |
| PARTIAL | (a) correct; (b) cannot find another vector (MC-3 confusion) | TA-B03 (MC-3 repair) → TA-A04 |
| INCORRECT | (a) says yes (ignores order) | TA-B02 (MC-2 repair) → TA-A04 |
| NO_RESPONSE | No answer | "(a) List the components in each position. Are position-1 values equal? Position-2? Position-3?" |

---

### TA-A04 — Mastery Gate
**Primitive:** P91 (P77→P55→P76→P55→P75→P55→P74→P55→P78)
**Grammar:** GR-3 ✓ (terminal); GR-6 ✓; GR-7 ✓ (P76 in gate); GR-9: `math.geom.vectors-2d` is Tier 1 → P76 CROSS-LINK PROBE

**pass_criterion:** ⌈0.90 × 5⌉ = **5 / 5** (4 P77 items + 1 P76 item)

**P77 — MULTI-PROBLEM SET (4 items)**
1. Write the vector from point A = (1, 2) to point B = (4, 6) as an ordered pair.
2. Are vectors (2, 5) and (5, 2) equal? Explain.
3. Vector **v** = (−3, 0, 4) is in ℝ³. State: (a) its first component, (b) its dimension, (c) its zero vector **0** in the same space.
4. Give two distinct vectors in ℝ² with the same magnitude √5. (Any valid pair accepted.)

**P55 — SCORE** (tally P77 results)

**P76 — TRANSFER PROBE (CROSS-LINK: `math.geom.vectors-2d`)**
> In 2D geometry, vectors are visualised as arrows from the origin. For **u** = (−2, 3):
>
> (a) Describe the arrow for **u**: which quadrant does its tip land in?
>
> (b) Compute the **magnitude** ‖**u**‖ = √(u₁² + u₂²). Leave in exact form.
>
> (c) **u** + **v** (vector addition, which you will study next) is computed component-wise: if **v** = (5, 1), compute **u** + **v**. Does the tip-to-tail picture make sense — arrow for **u** then arrow for **v** placed at **u**'s tip?

*(Expected: (a) tip at (−2,3), Quadrant II; (b) √(4+9)=√13; (c) (3,4); yes — final tip at (3,4).)*

**P55 — SCORE** (add P76 result)

**P75 — MASTERY ASSESSMENT**
- pass: 5 / 5 → MASTERY ACHIEVED
- fail: ≤ 4 / 5 → MASTERY NOT ACHIEVED

**P55 — SCORE** (record mastery outcome)

**P74 — ROUTING DECISION**
- MASTERY ACHIEVED → P78
- MASTERY NOT ACHIEVED → P77 item 1 or P76 (a) failed → TA-B01; P77 item 2 failed → TA-B02; P77 item 4 failed → TA-B03; re-enter TA-A02

**P55 — SCORE** (record routing)

**P78 — COMPLETION**
> "You can now read, write, and interpret vectors as ordered n-tuples; distinguish vectors from points; assert equality by components; and understand that magnitude is a property of a vector, not the vector itself. The transfer probe previewed 2D geometric vector operations — you are ready for vector addition, scalar multiplication, and eventually the full structure of a vector space."

---

## Component 5 — Protocol B (Repair Protocol)

### TA-B01 — Repair: VECTOR-IS-POINT (MC-1 FOUNDATIONAL)
**Primitives:** P27 (MISCONCEPTION NAMING), P41 (MISCONCEPTION DETECTOR), P64 (CONCEPTUAL SHIFT), P49 (ADAPTIVE CHECKPOINT)
**Grammar:** GR-4 ✓

**P27 — MISCONCEPTION NAMING**
> "The error **VECTOR-IS-POINT** treats the vector (3, 4) as the fixed geometric point (3, 4) — a location anchored to the origin. A vector is a *displacement*, not a location. The same notation serves two different objects."

**P41 — MISCONCEPTION DETECTOR**
> "If (3, 4) is a fixed point: can it start anywhere other than 'distance 3 right, 4 up from origin'? If (3, 4) is a displacement vector: where does it end if it starts at (2, 5)?"

**P64 — CONCEPTUAL SHIFT**
> "A **point** (3, 4) names a unique location — there is exactly one such point in the plane. A **vector** (3, 4) names a displacement — move 3 right, 4 up — that can be applied starting from any location. The vector has no fixed home; its geometric representation is an arrow of fixed length and direction that can be placed anywhere. The notation is identical but the objects are distinct."

**P49 — ADAPTIVE CHECKPOINT**
> "Displacement **v** = (2, −1). (a) Starting at (5, 3), where do you end? (b) Starting at (−1, 7), where do you end? (c) Is (2, −1) a location?"

| Branch | Criterion | Next |
|---|---|---|
| CORRECT | (a) (7,2), (b) (1,6), (c) No — it's a displacement | Return to TA-A02 CORRECT branch |
| INCORRECT | Same endpoint both times | Trace physically: (5,3) + (2,−1) = (5+2, 3−1) = (7,2); (−1,7) + (2,−1) = (1,6) |

---

### TA-B02 — Repair: VECTOR-ORDER-FREE (MC-2)
**Primitives:** P27 (MISCONCEPTION NAMING), P64 (CONCEPTUAL SHIFT), P49 (ADAPTIVE CHECKPOINT)

**P27 — MISCONCEPTION NAMING**
> "The error **VECTOR-ORDER-FREE** says (3, 4) and (4, 3) are the same vector — treating the components as an unordered set. But vectors are *ordered* tuples: the position of each component determines its meaning (first = x-direction, second = y-direction)."

**P64 — CONCEPTUAL SHIFT**
> "(3, 4) means 'move 3 right and 4 up.' (4, 3) means 'move 4 right and 3 up.' These arrows point in different directions and end at different locations. The ordering tells you *which axis each number measures*. Changing the order changes the direction."

**P49 — ADAPTIVE CHECKPOINT**
> "Starting at (0,0): where does (3,4) take you? Where does (4,3) take you? Are those the same destination?"

| Branch | Criterion | Next |
|---|---|---|
| CORRECT | (3,4) → (3,4); (4,3) → (4,3); different destinations | Return to TA-A03 CORRECT branch |
| INCORRECT | Same destination | Plot both arrows on a grid; mark both endpoints |

---

### TA-B03 — Repair: VECTOR-IS-MAGNITUDE (MC-3)
**Primitives:** P27 (MISCONCEPTION NAMING), P06 (CONTRAST PAIR), P64 (CONCEPTUAL SHIFT), P49 (ADAPTIVE CHECKPOINT)

**P27 — MISCONCEPTION NAMING**
> "The error **VECTOR-IS-MAGNITUDE** says 'the vector (1,2) is √5' — reducing a vector (a directional quantity) to its scalar magnitude (a number). The magnitude is a *property* of the vector, not the vector itself."

**P06 — CONTRAST PAIR**
> | Object | Type | Contains |
> |---|---|---|
> | **v** = (1, 2) | Vector | Direction (northeast-ish) + Magnitude √5 |
> | ‖**v**‖ = √5 | Scalar (real number) | Magnitude only — direction lost |
> | **w** = (−1, −2) | Vector | Different direction (southwest) + same magnitude √5 |
>
> **v** and **w** have the same magnitude but are different vectors — opposite directions. The magnitude alone cannot distinguish them.

**P64 — CONCEPTUAL SHIFT**
> "The magnitude ‖**v**‖ is a number derived from the vector; it is not the vector. A vector carries two pieces of information: how far (magnitude) and which way (direction). Discarding direction discards half the information. The full vector (1, 2) is needed to recover direction."

**P49 — ADAPTIVE CHECKPOINT**
> "Give two distinct vectors in ℝ² that both have magnitude 5. (Hint: which pairs (a,b) satisfy a²+b²=25?)"

| Branch | Criterion | Next |
|---|---|---|
| CORRECT | e.g., (3,4) and (4,3), or (5,0) and (0,5), or (3,−4) and (−3,4) | Return to TA-A03 CORRECT branch |
| INCORRECT | Says "they all equal 5" — cannot give two distinct vectors | "Is (3,4) the same vector as (4,3)? Both have magnitude 5 — are they pointing the same way?" |

---

## Component 6 — P89 Spaced Repetition

**P89 — SPACED REPETITION SCHEDULE**

| Interval | Probe Type | Content |
|---|---|---|
| Day 1 (consolidation) | Read and write | From arrow A=(0,0)→B=(−3,5): write as tuple, as column vector, state dimension |
| Day 3 | Equality check | Which pairs are equal: (2,3) vs (3,2); (4,−1,0) vs (4,−1,0); (1,1) vs (1,1,0) |
| Day 7 | Vector vs magnitude | **v**=(−4,3): state the vector, compute ‖**v**‖, name two other vectors with same magnitude |
| Day 30 | Transfer | Given a 3D vector **w**=(2,−1,3): state its geometric interpretation; which plane contains it if v₃=0? |

---

## Component 7 — Cross-Blueprint Dependencies

**GR-8 ✓:** All cross_links documented.

| Dependency | Direction | Relationship |
|---|---|---|
| `math.found.real-numbers` | REQUIRES | Components vᵢ ∈ ℝ; ℝⁿ is the ambient space |
| `math.geom.x-y-coordinates` | REQUIRES | Ordered pair notation; signed axis directions for 2D interpretation |
| `math.linalg.vector-space` | UNLOCKS | Vector spaces generalise ℝⁿ; vectors become abstract elements |
| `math.linalg.dot-product` | UNLOCKS | Dot product requires component-wise multiplication of two vectors |
| `math.geom.vectors-2d` | CROSS-LINK (Tier 1) | Geometric arrow interpretation in ℝ²; magnitude and direction; tip-to-tail addition |
| `math.geom.vectors-3d` | CROSS-LINK (Tier 1) | Extension to ℝ³; third component (depth/z-axis) |

---

## Component 8 — Teaching Notes

- **CPA enforcement:** Begin with a physical displacement model (the analogy of walking directions), then introduce the coordinate diagram (P stage), before working with abstract tuples in higher dimensions (A stage).
- **Point vs vector — the most critical distinction:** MC-1 (VECTOR-IS-POINT) is FOUNDATIONAL. The shared notation (3, 4) for both a point and a vector is a genuine source of confusion in linear algebra. Make the distinction explicit and early. The key test: "Can you place this arrow somewhere other than at the origin?" For a vector, yes; for a point, no.
- **Notation flexibility:** Students will encounter boldface **v**, arrow notation ⃗v, column matrices [v₁;v₂], and row tuples (v₁,v₂). All are equivalent representations. TA-A02 addresses all three; reinforce consistency.
- **bloom=understand:** This blueprint targets understanding, not application. P77 and the P76 probe involve reading, writing, and checking equality — not computing addition or scalar multiplication, which come in `math.linalg.vector-addition` and `math.linalg.scalar-multiplication`.
- **P76 cross-link note:** The P76 probe previews vector addition (u+v) but does not require formal teaching of that operation. The component-wise rule is given inline. Credit P76 correct if (a), (b), and (c) are all answered correctly (c) is accepted if the tip-to-tail description is geometrically plausible.

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
| V-7 | GR-4: repair TAs contain P41/P64 | PASS (B01:P27+P41+P64; B02:P27+P64; B03:P27+P06+P64) |
| V-8 | GR-6: P91 terminal in TA-A04 | PASS (ends with P78) |
| V-9 | GR-7: P76 present in mastery gate | PASS (TA-A04) |
| V-10 | GR-8: all cross_links documented in Component 7 | PASS |
| V-11 | GR-9: P76 mode — cross_link to Tier 1 `math.geom.vectors-2d` → CROSS-LINK PROBE | PASS |
| V-12 | GR-10: MAMR stated and enforced | PASS (MC-1 FOUNDATIONAL first; B01 before B02/B03) |
| V-13 | P91 sequence: P77→P55→P76→P55→P75→P55→P74→P55→P78 | PASS |
| V-14 | pass_criterion: ⌈0.90 × 5⌉ = 5/5 | PASS |
| V-15 | bloom=understand — P07 not required | PASS (no P07; not bloom=apply) |
| V-16 | P49 in every non-gate TA has all 4 branches | PASS |
| V-17 | Session TA cap (h=3 ≥ 1h → max 7): 4 main + 3 repair = 7 total; happy path 4 TAs | PASS |
| V-18 | P89 spaced repetition schedule present (≥ 4 intervals) | PASS |
| V-19 | Component 7 documents all requires/unlocks/cross_links | PASS |
| V-20 | Misconception registry: ≥ 3 MCs, one FOUNDATIONAL | PASS |

### AIR

| Dimension | Check | Status |
|---|---|---|
| Accuracy | Arrow (1,2)→(4,6): vector=(3,4) ✓; (−2,3) in Q II ✓; ‖(−2,3)‖=√13 ✓; (−2,3)+(5,1)=(3,4) ✓; ‖(1,2)‖=√5 ✓; (3,4) and (4,3) magnitude both=5 ✓ | PASS |
| Integrity | No component contradicts another; MAMR chain consistent | PASS |
| Relevance | Every TA addresses vector concept; P76 legitimately previews 2D geometric vector in cross-linked concept | PASS |

**PACKAGE_READY: YES**
