# Teaching Blueprint: Vector Addition
**ID:** `math.linalg.vector-addition`
**Version:** 1.0
**Status:** PACKAGE_READY
**Spec:** Teaching Blueprint Specification v1.0

---

## Component 0 — Metadata

| Field | Value |
|---|---|
| concept_id | `math.linalg.vector-addition` |
| concept_name | Vector Addition |
| domain | linear algebra |
| difficulty | developing |
| bloom | apply |
| mastery_threshold | 0.95 |
| estimated_hours | 2 |
| requires | `math.linalg.vector` |
| unlocks | (none) |
| cross_links | `math.abst.group-operation` (not Tier 1) |
| blueprint_version | 1.0 |
| authored_date | 2026-07-12 |
| CPA_ENTRY_STAGE | C |

---

## Component 1 — Cognitive Map

### 1.1 Core Insight
Vector addition is component-wise: (a₁, …, aₙ) + (b₁, …, bₙ) = (a₁+b₁, …, aₙ+bₙ). Geometrically, this is the **tip-to-tail** rule (or equivalently, the parallelogram law). Both vectors must have the same dimension; the sum has the same dimension. Addition satisfies commutativity (**u**+**v** = **v**+**u**), associativity, the zero vector as identity (**v**+**0** = **v**), and every vector has an additive inverse (−**v**), making (ℝⁿ, +) an abelian group.

### 1.2 Knowledge Prerequisites (Activated)
- **math.linalg.vector:** Ordered n-tuples; component-wise structure; zero vector; geometric arrow interpretation.

### 1.3 Conceptual Sequence
1. Definition: (a₁,…,aₙ) + (b₁,…,bₙ) = (a₁+b₁,…,aₙ+bₙ).
2. Geometric interpretation: tip-to-tail — place the tail of **v** at the tip of **u**; the sum **u**+**v** goes from the tail of **u** to the tip of **v**.
3. Dimension requirement: addition is defined only for vectors of equal dimension.
4. Properties: commutativity, associativity, identity **0** = (0,…,0), inverse −**v** = (−v₁,…,−vₙ).
5. Vector subtraction: **a** − **b** = **a** + (−**b**) = **a** + (−1)**b**.

### 1.4 Transfer Target
Computing **u**+**v** and **u**−**v** for any two vectors of the same dimension; verifying that (**u**+**v**)+**w** = **u**+(**v**+**w**) (associativity); recognising dimension mismatch as an error.

---

## Component 2 — Misconception Registry

| ID | Name | Surface Pattern | Root Cause | Priority |
|---|---|---|---|---|
| MC-1 | CROSS-COMPONENT-MIXING | (1,2)+(3,4)=(1+4, 2+3)=(5,5) — mixes components across positions | Doesn't preserve index pairing; adds aᵢ to b_{j≠i} | FOUNDATIONAL |
| MC-2 | DIMENSION-MISMATCH-IGNORED | Attempts to add (1,2)+(3,4,5) without error | Doesn't check that both vectors have the same dimension before adding | SECONDARY |
| MC-3 | ADDITION-COLLAPSES-DIMENSION | Believes (1,2)+(3,4) = 10 (a scalar) or = (1,2,3,4) (concatenated) | Doesn't understand component-wise; conflates vector addition with scalar addition or list concatenation | SECONDARY |

**MAMR:** MC-1 FOUNDATIONAL cleared first. MC-2 and MC-3 addressed FIFO thereafter.

---

## Component 3 — Scaffolding Protocol

| Stage | Condition | Entry Action |
|---|---|---|
| C (Concrete) | developing → always | Begin TA-A01 with tip-to-tail displacement analogy |
| P (Pictorial) | After C → geometric diagram of added arrows | TA-A02 P07 worked examples with component-wise computation |
| A (Abstract) | After P → dimension check; properties | TA-A03 (contrast pair: correct vs cross-component) |

---

## Component 4 — Protocol A (Main Teaching Protocol)

### TA-A01 — Concrete Opening: Tip-to-Tail Displacements
**Primitives:** P03 (ANALOGY BRIDGE), P49 (ADAPTIVE CHECKPOINT)
**Grammar:** GR-1 ✓ (opens with B-category P03); GR-2 ✓ (P49 present)

**P03 — ANALOGY BRIDGE**
> "Walk 3 blocks east and 2 blocks north: displacement **u** = (3, 2). Then walk 1 block west and 4 blocks north: displacement **v** = (−1, 4).
>
> Total displacement: east-west = 3 + (−1) = **2**; north-south = 2 + 4 = **6**.
>
> So **u** + **v** = (3 + (−1), 2 + 4) = **(2, 6)**.
>
> **Rule:** Add corresponding components. The sum of two 2D displacements is a 2D displacement; the sum of two nD vectors is an nD vector.
>
> Geometric picture: place the tail of **v** at the tip of **u**. The result arrow goes from the tail of **u** to the tip of **v**. (The parallelogram law gives the same answer.)"

**P49 — ADAPTIVE CHECKPOINT**
> "Compute (4, −1) + (−2, 3). What dimension is the result?"

| Branch | Criterion | Next |
|---|---|---|
| CORRECT | (2, 2); dimension 2 | TA-A02 |
| PARTIAL | (2, 2) correct; unsure about dimension | TA-A02 (minor) |
| INCORRECT | (4−1, −1+3) = (3,2) or (−2+4, 3−1)=(2,2) — same answer here but wrong process if cross-mixing | Try (5, 2)+(−3, 4) — if answer is (2,6) check whether process is cross-component; if so → TA-B01 |
| NO_RESPONSE | No answer | "Add first components: 4+(−2)=? Add second components: −1+3=?" |

---

### TA-A02 — Worked Example Pair: 2D and 3D Addition
**Primitives:** P07 (WORKED EXAMPLE PAIR), P49 (ADAPTIVE CHECKPOINT)
**Grammar:** GR-1 ✓ (P07 is B-category); GR-2 ✓; bloom=apply → P07 required ✓

**P07 — WORKED EXAMPLE PAIR**

*Example 1 — 2D vectors:*
> Compute **u** + **v** where **u** = (5, −3) and **v** = (−2, 7).
>
> First components: 5 + (−2) = **3**.
> Second components: (−3) + 7 = **4**.
>
> **u** + **v** = **(3, 4).**

*Example 2 — 3D vectors and properties:*
> Compute **a** + **b** and **b** + **a** where **a** = (1, −2, 5) and **b** = (3, 0, −1).
>
> **a** + **b** = (1+3, −2+0, 5+(−1)) = **(4, −2, 4)**.
>
> **b** + **a** = (3+1, 0+(−2), −1+5) = **(4, −2, 4)**.
>
> **a** + **b** = **b** + **a** — vector addition is **commutative**.

**P49 — ADAPTIVE CHECKPOINT**
> "Compute (2, −4, 1) + (−3, 6, 2). Then verify commutativity."

| Branch | Criterion | Next |
|---|---|---|
| CORRECT | (−1, 2, 3); and reversed order gives same result | TA-A03 |
| PARTIAL | (−1, 2, 3) correct; skips commutativity check | TA-A03 (acceptable; commutativity noted) |
| INCORRECT | (−1, 2, 3) wrong (cross-component) | TA-B01 (MC-1 repair) → TA-A03 |
| NO_RESPONSE | No attempt | "Three components → three additions: 2+(−3), −4+6, 1+2." |

---

### TA-A03 — Component Pairing: Contrast Pair
**Primitives:** P06 (CONTRAST PAIR), P49 (ADAPTIVE CHECKPOINT)
**Grammar:** GR-1 ✓ (P06 is B-category); GR-2 ✓

**P06 — CONTRAST PAIR**
> | Case | Correct | Common Error |
> |---|---|---|
> | (1,2)+(3,4) | (1+3, 2+4) = **(4, 6)** | (1+4, 2+3) = (5,5) — cross-components |
> | (1,2)+(3,4,5) | **UNDEFINED** — dimension mismatch | (4,6,5) — ignores mismatch |
> | (1,2)+(3,4) result | **(4,6)** — 2D vector | 10 — collapsed to scalar; (1,2,3,4) — concatenated |
>
> **Rules:**
> 1. Add component i of **u** to component i of **v** — never mix positions.
> 2. Both vectors must have the same dimension. If dimensions differ, addition is undefined.
> 3. The result has the same dimension as the inputs.

**P49 — ADAPTIVE CHECKPOINT**
> "(a) Compute (3, 7) + (−1, 2). (b) Can you add (3, 7) + (1, 4, 2)? Why or why not?"

| Branch | Criterion | Next |
|---|---|---|
| CORRECT | (a) (2,9); (b) no — dimension mismatch (2D + 3D undefined) | TA-A04 |
| PARTIAL | (a) correct; (b) attempts addition | TA-B02 (MC-2 repair) → TA-A04 |
| INCORRECT | (a) wrong (cross-components) | TA-B01 (MC-1 repair) → TA-A04 |
| NO_RESPONSE | No answer | "(a) 3+(−1)=? and 7+2=?; (b) Count components of each vector." |

---

### TA-A04 — Mastery Gate
**Primitive:** P91 (P77→P55→P76→P55→P75→P55→P74→P55→P78)
**Grammar:** GR-3 ✓ (terminal); GR-6 ✓; GR-7 ✓ (P76 in gate); GR-9: `math.abst.group-operation` is NOT Tier 1 → P76 INDEPENDENCE PROBE

**pass_criterion:** ⌈0.95 × 5⌉ = **5 / 5** (4 P77 items + 1 P76 item)

**P77 — MULTI-PROBLEM SET (4 items)**
1. Compute (5, −3) + (−2, 7).
2. Compute (1, −2, 5) + (3, 0, −1).
3. True or false: (1, 2) + (3, 4, 5) is a valid vector addition.
4. Compute **u** + **0** where **u** = (4, −1, 3) and **0** = (0, 0, 0). Name the property this illustrates.

**P55 — SCORE** (tally P77 results)

**P76 — TRANSFER PROBE (INDEPENDENCE)**
> Vector subtraction is defined as **a** − **b** = **a** + (−1)**b**.
>
> (a) Compute (5, 3) − (2, 7).
>
> (b) Compute (2, −1, 4) − (−1, 3, 1) in ℝ³.
>
> (c) Verify for (a): does (**a** − **b**) + **b** = **a**?

*(Expected: (a) (3,−4); (b) (3,−4,3); (c) (3,−4)+(2,7)=(5,3)=**a** ✓.)*

**P55 — SCORE** (add P76 result)

**P75 — MASTERY ASSESSMENT**
- pass: 5 / 5 → MASTERY ACHIEVED
- fail: ≤ 4 / 5 → MASTERY NOT ACHIEVED

**P55 — SCORE** (record mastery outcome)

**P74 — ROUTING DECISION**
- MASTERY ACHIEVED → P78
- MASTERY NOT ACHIEVED → P77 items 1–2 wrong → TA-B01; P77 item 3 wrong → TA-B02; re-enter TA-A02

**P55 — SCORE** (record routing)

**P78 — COMPLETION**
> "You can now compute vector addition and subtraction component-wise, verify commutativity, identify dimension mismatches, and use the zero vector as the additive identity. Together with scalar multiplication, vector addition makes ℝⁿ a vector space — and these same two operations, abstracted, define every vector space in linear algebra."

---

## Component 5 — Protocol B (Repair Protocol)

### TA-B01 — Repair: CROSS-COMPONENT-MIXING (MC-1 FOUNDATIONAL)
**Primitives:** P27 (MISCONCEPTION NAMING), P41 (MISCONCEPTION DETECTOR), P64 (CONCEPTUAL SHIFT), P49 (ADAPTIVE CHECKPOINT)
**Grammar:** GR-4 ✓

**P27 — MISCONCEPTION NAMING**
> "The error **CROSS-COMPONENT-MIXING** adds component 1 of one vector to component 2 of the other, or any other cross-pairing: (1,2)+(3,4) = (1+4, 2+3) = (5,5). Components must be paired by their index position, not mixed."

**P41 — MISCONCEPTION DETECTOR**
> "In (1,2)+(3,4): which component of (1,2) should be added to the component 1 of (3,4)? List the index-1 elements and the index-2 elements separately."

**P64 — CONCEPTUAL SHIFT**
> "Think of components as separate, independent quantities: index 1 measures x-displacement, index 2 measures y-displacement. Adding x-displacements to x-displacements and y-displacements to y-displacements is the only physically meaningful operation. Mixing x with y would combine incompatible quantities (east-west with north-south)."

**P49 — ADAPTIVE CHECKPOINT**
> "Compute (2, 5) + (−3, 1). Label each component addition: '(2) + (−3) = ? is component 1; (5) + (1) = ? is component 2.'"

| Branch | Criterion | Next |
|---|---|---|
| CORRECT | (−1, 6) | Return to TA-A02 CORRECT branch |
| INCORRECT | Still mixes | Write components in a vertical table: u₁=2, v₁=−3 → sum row 1; u₂=5, v₂=1 → sum row 2 |

---

### TA-B02 — Repair: DIMENSION-MISMATCH-IGNORED (MC-2)
**Primitives:** P27 (MISCONCEPTION NAMING), P64 (CONCEPTUAL SHIFT), P49 (ADAPTIVE CHECKPOINT)

**P27 — MISCONCEPTION NAMING**
> "The error **DIMENSION-MISMATCH-IGNORED** attempts to add (1,2) and (3,4,5) — vectors of dimension 2 and 3 — without raising an error. Addition pairs components by index; if one vector has no component at index 3, there is nothing to pair with (3,4,5)'s third component."

**P64 — CONCEPTUAL SHIFT**
> "Dimension tells you how many independent quantities are being tracked. Adding (1,2) (tracks x and y) to (3,4,5) (tracks x, y, and z) is like adding '3 east, 2 north' to '3 east, 4 north, 5 up' — the z-component of the second displacement has no partner in the first. The addition is undefined — not just incomplete, but a type error."

**P49 — ADAPTIVE CHECKPOINT**
> "Can you add (4,−1,2) to (5,3)? What would you do with the third component of (4,−1,2)?"

| Branch | Criterion | Next |
|---|---|---|
| CORRECT | No — undefined; third component has no partner | Return to TA-A03 CORRECT branch |
| INCORRECT | Attempts to add, ignores third component | "What is the third component of (5,3)? There is none — so there is nothing to add to the 2 in (4,−1,2)." |

---

### TA-B03 — Repair: ADDITION-COLLAPSES-DIMENSION (MC-3)
**Primitives:** P27 (MISCONCEPTION NAMING), P64 (CONCEPTUAL SHIFT), P49 (ADAPTIVE CHECKPOINT)

**P27 — MISCONCEPTION NAMING**
> "The error **ADDITION-COLLAPSES-DIMENSION** produces a scalar (e.g., 10) or concatenated list (e.g., (1,2,3,4)) from (1,2)+(3,4). Neither is correct: the sum is a 2D vector (4,6)."

**P64 — CONCEPTUAL SHIFT**
> "Adding two n-dimensional vectors gives an n-dimensional vector — not a scalar and not a longer list. Each component addition is independent. The results form a new vector with the same number of components. The dimension is preserved: two 2D vectors add to give a 2D vector."

**P49 — ADAPTIVE CHECKPOINT**
> "Compute (1,2)+(3,4). The result is: (a) a number, (b) a 2D vector, or (c) a 4D list?"

| Branch | Criterion | Next |
|---|---|---|
| CORRECT | (b) 2D vector = (4,6) | Return to TA-A02 CORRECT branch |
| INCORRECT | Picks (a) or (c) | "Count the component additions: 1+3=? and 2+4=? — that gives two numbers → one 2D vector." |

---

## Component 6 — P89 Spaced Repetition

**P89 — SPACED REPETITION SCHEDULE**

| Interval | Probe Type | Content |
|---|---|---|
| Day 1 (consolidation) | Computation | (−3,5,2)+(4,−1,7); verify commutativity |
| Day 3 | Subtraction | (7,3)−(2,5); verify: answer+(2,5)=(7,3) |
| Day 7 | Properties | Compute **v**+**0** and **v**+(−**v**) for **v**=(2,−1,4) |
| Day 30 | Transfer | Given two displacement vectors in 3D, compute total displacement and return path (negative of total) |

---

## Component 7 — Cross-Blueprint Dependencies

**GR-8 ✓:** All cross_links documented.

| Dependency | Direction | Relationship |
|---|---|---|
| `math.linalg.vector` | REQUIRES | Components, dimension, zero vector, arrow interpretation |
| (no Tier 1 unlocks) | UNLOCKS | — |
| `math.abst.group-operation` | CROSS-LINK (not Tier 1) | (ℝⁿ, +) is an abelian group; vector addition satisfies all group axioms |

---

## Component 8 — Teaching Notes

- **CPA enforcement:** Use the displacement story (C stage) or draw arrows on a grid (P stage) before moving to pure component-wise computation. The tip-to-tail picture motivates why components add independently.
- **Dimension prerequisite:** Always check that both vectors have the same dimension before attempting addition. Build this as a habit, not an afterthought. It prevents MC-2 and reflects correct mathematical practice.
- **Commutativity:** The worked example pair explicitly demonstrates **a**+**b** = **b**+**a**. This follows immediately from commutativity of real-number addition component-wise. Contrast with subtraction (non-commutative) to help students remember which operations commute.
- **P76 subtraction transfer:** The transfer probe uses the formula **a**−**b** = **a**+(−1)**b**. This requires scalar multiplication, which students have just learned. Credit the probe based on correct application of the component-wise rule; the connection to scalar multiplication is motivational context.
- **Group structure preview:** The P78 completion mentions that (ℝⁿ, +) is a group (abelian group). This is the cross-link to math.abst.group-operation; do not require students to know group theory — it is a forward pointer only.

---

## Component 10 — Validation Checklist

### V-1 through V-20

| Code | Check | Status |
|---|---|---|
| V-1 | All 10 components present (0–8, 10) | PASS |
| V-2 | Component 0 metadata complete and accurate | PASS |
| V-3 | CPA_ENTRY_STAGE = C (developing difficulty) | PASS |
| V-4 | GR-1: every non-repair TA opens with B-category primitive | PASS (A01:P03, A02:P07, A03:P06, A04:P91) |
| V-5 | GR-2: every non-gate TA contains P49 | PASS (A01–A03 each have P49; A04 is gate) |
| V-6 | GR-3: mastery gate TA (A04) is terminal | PASS |
| V-7 | GR-4: repair TAs contain P41/P64 | PASS (B01:P27+P41+P64; B02:P27+P64; B03:P27+P64) |
| V-8 | GR-6: P91 terminal in TA-A04 | PASS (ends with P78) |
| V-9 | GR-7: P76 present in mastery gate | PASS (TA-A04) |
| V-10 | GR-8: all cross_links documented in Component 7 | PASS |
| V-11 | GR-9: P76 mode — `math.abst.group-operation` NOT Tier 1 → INDEPENDENCE PROBE | PASS |
| V-12 | GR-10: MAMR stated and enforced | PASS (MC-1 FOUNDATIONAL first; B01 before B02/B03) |
| V-13 | P91 sequence: P77→P55→P76→P55→P75→P55→P74→P55→P78 | PASS |
| V-14 | pass_criterion: ⌈0.95 × 5⌉ = 5/5 | PASS |
| V-15 | bloom=apply → P07 (WORKED EXAMPLE PAIR) present | PASS (TA-A02) |
| V-16 | P49 in every non-gate TA has all 4 branches | PASS |
| V-17 | Session TA cap (h=2 ≥ 1h → max 7): 4 main + 3 repair = 7; happy path 4 TAs | PASS |
| V-18 | P89 spaced repetition schedule present (≥ 4 intervals) | PASS |
| V-19 | Component 7 documents all requires/unlocks/cross_links | PASS |
| V-20 | Misconception registry: ≥ 3 MCs, one FOUNDATIONAL | PASS |

### AIR

| Dimension | Check | Status |
|---|---|---|
| Accuracy | (4,−1)+(−2,3)=(2,2) ✓; (5,−3)+(−2,7)=(3,4) ✓; (1,−2,5)+(3,0,−1)=(4,−2,4) ✓; (2,−4,1)+(−3,6,2)=(−1,2,3) ✓; (4,−1,3)+(0,0,0)=(4,−1,3) ✓; (5,3)−(2,7)=(3,−4) ✓; (3,−4)+(2,7)=(5,3) ✓; (2,−1,4)−(−1,3,1)=(3,−4,3) ✓ | PASS |
| Integrity | No component contradicts another; MAMR chain consistent | PASS |
| Relevance | Every TA addresses vector addition; P76 naturally extends to vector subtraction using same component-wise rule | PASS |

**PACKAGE_READY: YES**
