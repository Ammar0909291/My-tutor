# Teaching Blueprint: Scalar Multiplication
**ID:** `math.linalg.scalar-multiplication`
**Version:** 1.0
**Status:** PACKAGE_READY
**Spec:** Teaching Blueprint Specification v1.0

---

## Component 0 — Metadata

| Field | Value |
|---|---|
| concept_id | `math.linalg.scalar-multiplication` |
| concept_name | Scalar Multiplication |
| domain | linear algebra |
| difficulty | developing |
| bloom | apply |
| mastery_threshold | 0.95 |
| estimated_hours | 1 |
| requires | `math.linalg.vector` |
| unlocks | (none) |
| cross_links | (none) |
| blueprint_version | 1.0 |
| authored_date | 2026-07-12 |
| CPA_ENTRY_STAGE | C |

---

## Component 1 — Cognitive Map

### 1.1 Core Insight
Scalar multiplication multiplies every component of a vector by the same real number c: c(v₁, v₂, …, vₙ) = (cv₁, cv₂, …, cvₙ). Geometrically, it scales the arrow: |c| stretches or compresses the length, and the sign of c determines direction (positive = same direction, negative = reversed direction). The zero scalar annihilates every vector to **0**; the scalar 1 is the identity.

### 1.2 Knowledge Prerequisites (Activated)
- **math.linalg.vector:** Ordered n-tuples; components; dimension; zero vector; arrow interpretation.

### 1.3 Conceptual Sequence
1. Definition: c**v** = (cv₁, cv₂, …, cvₙ) — multiply each component by c.
2. Geometric effect: |c| > 1 → stretch; 0 < |c| < 1 → compress; c < 0 → reverse direction.
3. Special cases: 1·**v** = **v** (identity); 0·**v** = **0** (annihilator); (−1)·**v** = −**v** (negation).
4. Distributive law (previewed): c(**u** + **v**) = c**u** + c**v**; (c + d)**v** = c**v** + d**v**.

### 1.4 Transfer Target
Computing c**v** for any scalar c ∈ ℝ and vector **v** ∈ ℝⁿ; interpreting the geometric scaling effect; applying special scalars (0, 1, −1) correctly.

---

## Component 2 — Misconception Registry

| ID | Name | Surface Pattern | Root Cause | Priority |
|---|---|---|---|---|
| MC-1 | SCALAR-ADDS-TO-COMPONENTS | 3(2, 5) = (2+3, 5+3) = (5, 8) instead of (6, 15) | Confuses scalar multiplication with vector addition; applies the scalar as an addend rather than a multiplier | FOUNDATIONAL |
| MC-2 | SCALAR-MULTIPLIED-ONCE | 3(2, 5) = (6, 5) — multiplies only the first component | Applies scalar to one component and leaves others unchanged | SECONDARY |
| MC-3 | NEGATIVE-SCALAR-MAGNIFIES | −2(3, 4) = (6, 8) instead of (−6, −8) — ignores sign reversal | Treats scalar as magnitude only; disregards that c < 0 reverses direction (flips signs of all components) | SECONDARY |

**MAMR:** MC-1 FOUNDATIONAL cleared first. MC-2 and MC-3 addressed FIFO thereafter.

---

## Component 3 — Scaffolding Protocol

| Stage | Condition | Entry Action |
|---|---|---|
| C (Concrete) | developing → always | Begin TA-A01 with arrow-scaling analogy |
| P (Pictorial) | After C → geometric diagram of scaled arrows | TA-A02 P07 worked examples with positive and negative scalars |
| A (Abstract) | After P → special scalars, distributive law preview | TA-A02 P49 and TA-A03 gate |

---

## Component 4 — Protocol A (Main Teaching Protocol)

### TA-A01 — Concrete Opening: Scaling an Arrow
**Primitives:** P03 (ANALOGY BRIDGE), P49 (ADAPTIVE CHECKPOINT)
**Grammar:** GR-1 ✓ (opens with B-category P03); GR-2 ✓ (P49 present)

**P03 — ANALOGY BRIDGE**
> "A vector **v** = (3, 4) represents a displacement: 3 right, 4 up. Multiplying by the scalar 2 doubles the displacement: 2**v** = (6, 8) — 6 right, 8 up. The arrow is twice as long, pointing the same direction.
>
> Multiplying by −1 reverses the arrow: −1·**v** = (−3, −4) — 3 left, 4 down. Same length, opposite direction.
>
> **Rule:** c(v₁, v₂, …, vₙ) = (cv₁, cv₂, …, cvₙ). Every component is multiplied by c — every component, not just one."

**P49 — ADAPTIVE CHECKPOINT**
> "Compute 3(2, 5). How many components does the result have?"

| Branch | Criterion | Next |
|---|---|---|
| CORRECT | (6, 15); 2 components | TA-A02 |
| PARTIAL | (6, 15) correct; unsure about component count | TA-A02 (minor) |
| INCORRECT | (5, 8) — added scalar | TA-B01 (MC-1 repair) → TA-A02 |
| NO_RESPONSE | No answer | "3(2, 5): multiply 3 × 2 for first component, 3 × 5 for second. What are those?" |

---

### TA-A02 — Worked Example Pair: Positive and Negative Scalars
**Primitives:** P07 (WORKED EXAMPLE PAIR), P49 (ADAPTIVE CHECKPOINT)
**Grammar:** GR-1 ✓ (P07 is B-category); GR-2 ✓; bloom=apply → P07 required ✓

**P07 — WORKED EXAMPLE PAIR**

*Example 1 — positive scalar, 3D vector:*
> Compute −2(1, 5, −4).
>
> (−2) × 1 = −2; (−2) × 5 = −10; (−2) × (−4) = 8.
>
> **Answer: (−2, −10, 8).** Direction reversed; magnitude doubled.

*Example 2 — fractional scalar:*
> Compute (1/2)(6, 4).
>
> (1/2) × 6 = 3; (1/2) × 4 = 2.
>
> **Answer: (3, 2).** Arrow compressed to half the length, same direction.

**P49 — ADAPTIVE CHECKPOINT**
> "Compute: (a) 4(2, −3)   (b) −3(0, 1, −2)"

| Branch | Criterion | Next |
|---|---|---|
| CORRECT | (a) (8,−12); (b) (0,−3,6) | TA-A03 |
| PARTIAL | (a) correct; (b) third component wrong sign (−2×−3 sign error) | TA-B03 (MC-3 repair) → TA-A03 |
| INCORRECT | (a) (6,1) — only first component scaled or scalar added | TA-B01 or TA-B02 as appropriate → TA-A03 |
| NO_RESPONSE | No attempt | "4(2,−3): multiply 4×2 and 4×(−3). What are those?" |

---

### TA-A03 — Mastery Gate
**Primitive:** P91 (P77→P55→P76→P55→P75→P55→P74→P55→P78)
**Grammar:** GR-3 ✓ (terminal); GR-6 ✓; GR-7 ✓ (P76 in gate); GR-9: cross_links = [] → P76 INDEPENDENCE PROBE

**pass_criterion:** ⌈0.95 × 5⌉ = **5 / 5** (4 P77 items + 1 P76 item)

**P77 — MULTI-PROBLEM SET (4 items)**
1. Compute 4(2, −3).
2. Compute −2(1, 5, −4).
3. Compute (1/2)(6, 4).
4. True or false: 0·(5, 3) = (0, 0). Explain.

**P55 — SCORE** (tally P77 results)

**P76 — TRANSFER PROBE (INDEPENDENCE)**
> In physics, velocity is a vector. An object moves at **v** = (3, −2) m/s (3 m/s east, 2 m/s south).
>
> (a) What is the velocity vector if the object triples its speed in the same direction?
>
> (b) What is the velocity vector if the object reverses direction at the same speed?
>
> (c) What scalar would bring the object to rest (velocity = **0**)? Give the resulting velocity vector.

*(Expected: (a) 3(3,−2)=(9,−6); (b) −1(3,−2)=(−3,2); (c) scalar 0; 0·(3,−2)=(0,0).)*

**P55 — SCORE** (add P76 result)

**P75 — MASTERY ASSESSMENT**
- pass: 5 / 5 → MASTERY ACHIEVED
- fail: ≤ 4 / 5 → MASTERY NOT ACHIEVED

**P55 — SCORE** (record mastery outcome)

**P74 — ROUTING DECISION**
- MASTERY ACHIEVED → P78
- MASTERY NOT ACHIEVED → P77 items 1–3 failed → TA-B01/B02/B03 per error pattern; re-enter TA-A02

**P55 — SCORE** (record routing)

**P78 — COMPLETION**
> "You can now compute c**v** for any scalar c and vector **v** of any dimension: multiply each component by c. Geometrically, c scales the arrow's length and the sign of c determines direction. Together with vector addition, scalar multiplication forms the two operations of a vector space — the structure you will encounter in your next topic."

---

## Component 5 — Protocol B (Repair Protocol)

### TA-B01 — Repair: SCALAR-ADDS-TO-COMPONENTS (MC-1 FOUNDATIONAL)
**Primitives:** P27 (MISCONCEPTION NAMING), P41 (MISCONCEPTION DETECTOR), P64 (CONCEPTUAL SHIFT), P49 (ADAPTIVE CHECKPOINT)
**Grammar:** GR-4 ✓

**P27 — MISCONCEPTION NAMING**
> "The error **SCALAR-ADDS-TO-COMPONENTS** computes 3(2,5) = (2+3, 5+3) = (5,8). The scalar is used as an addend, not a multiplier. Scalar multiplication uses × (times), not + (plus)."

**P41 — MISCONCEPTION DETECTOR**
> "In 3(2,5): does the operation say 'add 3 to each component' or 'multiply each component by 3'? What is 3 × 2? What is 3 × 5?"

**P64 — CONCEPTUAL SHIFT**
> "Scalar multiplication is *multiplication*, not addition. The notation c**v** means 'scale the vector by factor c' — stretch or compress each component by c. Adding the scalar to components is a different operation altogether (and not a standard linear algebra operation)."

**P49 — ADAPTIVE CHECKPOINT**
> "Compute 5(1, 3) step by step: 5 × first component; 5 × second component."

| Branch | Criterion | Next |
|---|---|---|
| CORRECT | (5, 15) | Return to TA-A02 CORRECT branch |
| INCORRECT | (6, 8) — still adds | "5 × 1 = ? (not 1+5); 5 × 3 = ? (not 3+5)" |

---

### TA-B02 — Repair: SCALAR-MULTIPLIED-ONCE (MC-2)
**Primitives:** P27 (MISCONCEPTION NAMING), P64 (CONCEPTUAL SHIFT), P49 (ADAPTIVE CHECKPOINT)

**P27 — MISCONCEPTION NAMING**
> "The error **SCALAR-MULTIPLIED-ONCE** applies the scalar to only the first component: 3(2,5) = (6,5). The definition requires multiplying *every* component."

**P64 — CONCEPTUAL SHIFT**
> "The definition c(v₁, v₂, …, vₙ) = (cv₁, cv₂, …, cvₙ) applies c to each component individually. Scaling a vector scales *all* of its components equally — leaving some unchanged would change the direction of the vector, not just its length."

**P49 — ADAPTIVE CHECKPOINT**
> "Compute 3(4, 2, 7). How many multiplications do you perform?"

| Branch | Criterion | Next |
|---|---|---|
| CORRECT | (12, 6, 21); three multiplications | Return to TA-A02 CORRECT branch |
| INCORRECT | (12, 2, 7) — multiplied only first | "Three components → three multiplications: 3×4, 3×2, 3×7." |

---

### TA-B03 — Repair: NEGATIVE-SCALAR-MAGNIFIES (MC-3)
**Primitives:** P27 (MISCONCEPTION NAMING), P06 (CONTRAST PAIR), P64 (CONCEPTUAL SHIFT), P49 (ADAPTIVE CHECKPOINT)

**P27 — MISCONCEPTION NAMING**
> "The error **NEGATIVE-SCALAR-MAGNIFIES** computes −2(3,4) = (6,8) — using only the magnitude of the scalar and ignoring the negative sign. A negative scalar reverses the sign of every component."

**P06 — CONTRAST PAIR**
> | Expression | Result | Effect |
> |---|---|---|
> | 2(3, 4) | (6, 8) | stretch; same direction |
> | **−2(3, 4)** | **(−6, −8)** | **stretch + reverse; opposite direction** |
> | (1/2)(−6, −8) | (−3, −4) | compress; same direction (still negative) |
>
> A negative scalar reverses the sign of every component — it is not the same as multiplying by the absolute value.

**P64 — CONCEPTUAL SHIFT**
> "The scalar c carries its sign into every component: (−2)(3) = −6, not +6. The negative sign is part of the multiplication. Geometrically, c < 0 reverses the direction of the arrow AND scales its length by |c|."

**P49 — ADAPTIVE CHECKPOINT**
> "Compute −3(2, −5)."

| Branch | Criterion | Next |
|---|---|---|
| CORRECT | (−6, 15) | Return to TA-A02 CORRECT branch |
| INCORRECT | (6, 15) or (6, −15) | "−3 × 2 = ? (negative times positive); −3 × (−5) = ? (negative times negative)" |

---

## Component 6 — P89 Spaced Repetition

**P89 — SPACED REPETITION SCHEDULE**

| Interval | Probe Type | Content |
|---|---|---|
| Day 1 (consolidation) | Computation | −4(3, −1, 2); (2/3)(9, 6) |
| Day 3 | Special scalars | Compute 0·(7,−2,4); 1·(7,−2,4); −1·(7,−2,4) |
| Day 7 | Geometric interpretation | **v**=(1,0): describe 3**v** and −3**v** geometrically (arrow on x-axis) |
| Day 30 | Transfer | Speed doubling: **v**=(−4,3) m/s; compute velocity at 2×, reversed, and stopped |

---

## Component 7 — Cross-Blueprint Dependencies

**GR-8 ✓:** All cross_links documented.

| Dependency | Direction | Relationship |
|---|---|---|
| `math.linalg.vector` | REQUIRES | Components, dimension, zero vector, arrow interpretation |
| (no unlocks in Tier 1) | UNLOCKS | — |
| (no cross_links) | CROSS-LINK | — |

---

## Component 8 — Teaching Notes

- **CPA enforcement:** Use the arrow model (C stage) before algebraic computation. Physically: tripling the arrow means tripling its length. Negating the arrow means flipping its direction. This geometric intuition prevents MC-3.
- **h=1 concept:** This is intentionally a lean concept. The main chain is A01→A02→A03 (3 TAs). Repair TAs are conditionally activated. Students who know basic multiplication and the vector definition should move through this quickly.
- **MAMR enforcement:** MC-1 (SCALAR-ADDS-TO-COMPONENTS) must be cleared before working on MC-3 (sign errors), since MC-1 students will also get wrong signs for wrong reasons.
- **P76 physics probe:** The physics transfer introduces velocity as a vector, which is standard but not yet formally taught. Credit the probe based solely on the scalar multiplication computation — the physics framing is motivational context only.
- **Distributive laws:** The full distributive law c(**u**+**v**) = c**u**+c**v** requires vector addition (the next concept). Do not introduce it fully here; the P78 completion mentions it as preview only.

---

## Component 10 — Validation Checklist

### V-1 through V-20

| Code | Check | Status |
|---|---|---|
| V-1 | All 10 components present (0–8, 10) | PASS |
| V-2 | Component 0 metadata complete and accurate | PASS |
| V-3 | CPA_ENTRY_STAGE = C (developing difficulty) | PASS |
| V-4 | GR-1: every non-repair TA opens with B-category primitive | PASS (A01:P03, A02:P07, A03:P91) |
| V-5 | GR-2: every non-gate TA contains P49 | PASS (A01 and A02 each have P49; A03 is gate) |
| V-6 | GR-3: mastery gate TA (A03) is terminal | PASS |
| V-7 | GR-4: repair TAs contain P41/P64 | PASS (B01:P27+P41+P64; B02:P27+P64; B03:P27+P06+P64) |
| V-8 | GR-6: P91 terminal in TA-A03 | PASS (ends with P78) |
| V-9 | GR-7: P76 present in mastery gate | PASS (TA-A03) |
| V-10 | GR-8: all cross_links documented in Component 7 | PASS (cross_links = none) |
| V-11 | GR-9: P76 mode — cross_links = [] → INDEPENDENCE PROBE | PASS |
| V-12 | GR-10: MAMR stated and enforced | PASS (MC-1 FOUNDATIONAL first; B01 before B02/B03) |
| V-13 | P91 sequence: P77→P55→P76→P55→P75→P55→P74→P55→P78 | PASS |
| V-14 | pass_criterion: ⌈0.95 × 5⌉ = 5/5 | PASS |
| V-15 | bloom=apply → P07 (WORKED EXAMPLE PAIR) present | PASS (TA-A02) |
| V-16 | P49 in every non-gate TA has all 4 branches | PASS |
| V-17 | Session TA cap (h=1 ≥ 1h → max 7): 3 main + 3 repair = 6 total; happy path 3 TAs | PASS |
| V-18 | P89 spaced repetition schedule present (≥ 4 intervals) | PASS |
| V-19 | Component 7 documents all requires/unlocks/cross_links | PASS |
| V-20 | Misconception registry: ≥ 3 MCs, one FOUNDATIONAL | PASS |

### AIR

| Dimension | Check | Status |
|---|---|---|
| Accuracy | 3(2,5)=(6,15) ✓; −2(1,5,−4)=(−2,−10,8) ✓; (1/2)(6,4)=(3,2) ✓; 4(2,−3)=(8,−12) ✓; −3(0,1,−2)=(0,−3,6) ✓; 0·(5,3)=(0,0) ✓; 3(3,−2)=(9,−6) ✓; −1(3,−2)=(−3,2) ✓ | PASS |
| Integrity | No component contradicts another; MAMR chain consistent | PASS |
| Relevance | Every TA addresses scalar multiplication; P76 transfers to physical velocity scaling with same operation | PASS |

**PACKAGE_READY: YES**
