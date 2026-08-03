# Teaching Blueprint: Coordinates Relative to a Basis (`math.linalg.coordinates`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.linalg.coordinates` |
| name | Coordinates Relative to a Basis |
| domain | Linear Algebra |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 3 |
| requires | `math.linalg.basis` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) — non-standard grid overlays before symbolic coordinate vectors |
| description (KG) | Given an ordered basis β={b₁,…,bₙ}, the coordinate vector [v]_β = (c₁,…,cₙ) where v=∑cᵢbᵢ. Coordinates depend on the choice of basis. Change of basis converts between coordinate representations.

 |

## Component 1 — Learning Objectives

- LO1: Find the coordinate vector $[v]_\beta=(c_1,\ldots,c_n)$ of a vector $v$ relative to an ORDERED basis $\beta=\{b_1,\ldots,b_n\}$, where $v=\sum c_ib_i$.
- LO2: Recognize that a vector's coordinate representation genuinely DEPENDS on the chosen basis — the SAME vector $v$ has DIFFERENT coordinate vectors relative to different bases.
- LO3: Correctly distinguish the STANDARD coordinates of a vector (its usual components, implicitly relative to the standard basis) from its coordinates relative to a DIFFERENT, non-standard basis.

## Component 2 — Prerequisite Check

Assumes mastery of `math.linalg.basis` (a linearly independent spanning set) — coordinates express a vector as a specific combination of a chosen basis's elements.

## Component 3 — Core Explanation

Given an ORDERED basis $\beta=\{b_1,\ldots,b_n\}$ of a vector space, the **coordinate vector** $[v]_\beta=(c_1,\ldots,c_n)$ of a vector $v$ records the UNIQUE coefficients such that $v=c_1b_1+c_2b_2+\cdots+c_nb_n$ — each basis vector's weight in the linear combination expressing $v$.

Crucially, coordinates DEPEND on the CHOICE of basis: the SAME vector $v$ generally has DIFFERENT coordinate representations relative to different bases. The familiar "standard components" of a vector (like $(3,5)$ for a vector in $\mathbb{R}^2$) are technically its coordinates relative to the STANDARD basis $\{e_1,e_2\}$ — a convenient default, but not the only valid choice.

## Component 4 — Worked Examples

**Example 1 (LO1 — finding coordinates relative to a non-standard basis)**: Find $[v]_\beta$ for $v=(5,3)$ relative to $\beta=\{(1,1),(1,-1)\}$. Solve $5=c_1(1)+c_2(1)$ and $3=c_1(1)+c_2(-1)$: adding both equations, $8=2c_1\Rightarrow c_1=4$; substituting back, $c_2=1$. So $[v]_\beta=(4,1)$. Verify: $4(1,1)+1(1,-1)=(4+1,4-1)=(5,3)$ ✓.

**Example 2 (LO2 — the same vector has different coordinates in different bases, breaking MC-1)**: The vector $v=(5,3)$ has coordinate vector $(4,1)$ relative to $\beta=\{(1,1),(1,-1)\}$ (from Example 1), but has coordinate vector $(5,3)$ relative to the STANDARD basis $\{(1,0),(0,1)\}$ — the SAME underlying vector, but genuinely DIFFERENT numerical coordinate representations. A common error assumes a vector's "true" coordinates are always its standard components $(5,3)$, treating other bases' coordinate vectors as somehow less legitimate or "wrong," rather than recognizing both are equally valid, correct representations relative to their respective bases.

**Example 3 (LO3 — the coordinate vector is basis-specific, not automatically standard, breaking MC-2)**: Given the coordinate vector $[v]_\beta=(2,3)$ relative to $\beta=\{(2,0),(0,3)\}$ (a non-standard basis), find $v$ itself: $v=2(2,0)+3(0,3)=(4,0)+(0,9)=(4,9)$ — NOT $(2,3)$. A common error assumes the coordinate vector's numbers ARE the vector's standard components directly, without actually carrying out the linear combination using the SPECIFIC basis vectors — the coordinate vector's meaning is entirely tied to which basis it's relative to.

## Component 5 — Teaching Actions

### Teaching Action A01 — Solve for the Combination Coefficients (Primitive P64: Conceptual Shift)

Work Example 1 in full, setting up and solving the linear system that determines $c_1,c_2$, then verifying the result reconstructs $v$ exactly.

### Teaching Action A02 — The Same Vector, Different Coordinates in Different Bases (Primitive P06: Contrast Pair)

Work Example 2, computing the SAME vector's coordinates relative to TWO different bases side by side, showing both are valid but different. State the rule: "coordinates are always relative to a SPECIFIC basis — the same vector genuinely has different coordinate representations in different bases, and neither is more 'correct' than the other."

- **MC-1 hook**: this directly targets MC-1 (treating standard coordinates as the vector's only "true" representation).

### Teaching Action A03 — Coordinate Vector Numbers Aren't Automatically Standard Components (Primitive P06: Contrast Pair, second pairing)

Work Example 3, showing the coordinate vector $(2,3)$ reconstructs to the DIFFERENT standard vector $(4,9)$ once the actual basis vectors are used. State the rule: "to recover the actual vector from its coordinates, you MUST use the specific basis vectors in the linear combination — the coordinate numbers alone, read as if they were standard components, give a different (wrong) answer."

- **MC-2 hook**: this directly targets MC-2 (misreading a non-standard coordinate vector as if it were standard components directly).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.85×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Find $[v]_\beta$ for $v=(7,2)$ relative to $\beta=\{(1,0),(1,1)\}$.
  2. Given $[v]_\beta=(3,-1)$ relative to $\beta=\{(2,1),(0,3)\}$, find $v$ (its standard components).
  3. Find $[v]_\beta$ for $v=(4,4,4)$ relative to $\beta=\{(1,0,0),(1,1,0),(1,1,1)\}$ in $\mathbb{R}^3$.
  4. Explain, in one sentence, why the same vector can have different coordinate vectors relative to different bases.
- **P76 (Transfer Probe, mode = independence)**: "A computer graphics program represents a 3D model's vertex $v=(6,4,2)$ using standard $(x,y,z)$ coordinates, but a rendering engine internally uses a DIFFERENT basis $\beta=\{(2,0,0),(0,2,0),(0,0,2)\}$ (a scaled coordinate system) for efficiency. (a) Find $[v]_\beta$, the vertex's coordinates in the rendering engine's basis. (b) Explain, using this lesson's distinction, why the rendering engine's internal coordinate numbers $(3,2,1)$ (if that's what you computed) do NOT directly represent the vertex's position in ordinary 3D space, and what conversion step would be needed to recover the standard $(6,4,2)$ representation."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | STANDARD-COORDINATES-TREATED-AS-THE-ONLY-TRUE-REPRESENTATION | Treating a vector's standard-basis coordinates as its only legitimate representation, viewing other bases' coordinate vectors as less valid | Moderate |
| MC-2 | NON-STANDARD-COORDINATE-VECTOR-MISREAD-AS-STANDARD-COMPONENTS | Reading a coordinate vector relative to a non-standard basis as if its numbers were directly the vector's standard components | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Standard Coordinates Treated as Only True Representation") → P41 (detect: present Example 2's dual-basis computation and check whether the non-standard result is dismissed as somehow less correct) → P64 (conceptual shift: re-verify BOTH coordinate vectors reconstruct the exact same vector $v$ via their respective linear combinations, confirming both are equally valid).
- **B02 (targets MC-2)**: P27 ("Non-Standard Coordinate Vector Misread as Standard Components") → P41 (detect: present Example 3 and check whether $(2,3)$ is treated as the vector itself rather than computing the linear combination) → P64 (conceptual shift: re-derive $v$ explicitly by substituting into $v=c_1b_1+c_2b_2$ using the ACTUAL basis vectors, showing the result differs from the coordinate numbers themselves).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.linalg.basis`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.linalg.change-of-basis` (the technique for converting between different bases' coordinate representations of the same vector).

## Component 8 — Teaching Notes

- estimated_hours = 3 reflects that coordinate-finding is a direct linear-system-solving application, with the genuine conceptual weight in correctly interpreting what coordinates mean relative to a chosen basis.
- MC-2 was ranked more severe than MC-1 because it produces an outright WRONG vector (a computational error), while MC-1 is more of a conceptual bias that doesn't necessarily corrupt a specific computation, just the interpretation of its significance.
- The computer-graphics transfer probe was deliberately chosen because non-standard coordinate systems are a genuine, common practice in graphics/rendering pipelines, giving this abstract distinction concrete technical relevance beyond a pure mathematics exercise.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.linalg.basis`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: non-standard grid overlays before symbols) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
