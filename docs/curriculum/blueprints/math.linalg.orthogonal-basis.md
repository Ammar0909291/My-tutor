# Teaching Blueprint: Orthogonal and Orthonormal Basis (`math.linalg.orthogonal-basis`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.linalg.orthogonal-basis` |
| name | Orthogonal and Orthonormal Basis |
| domain | Linear Algebra |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.9 → MAMR = ⌈0.9×5⌉ = 5/5 |
| estimated_hours | 3 |
| requires | `math.linalg.orthogonality`, `math.linalg.basis` |
| unlocks | `math.linalg.gram-schmidt`, `math.linalg.projection` |
| cross_links | none |
| CPA_entry_stage | P (Pictorial) — perpendicular coordinate axes drawn before the general orthonormal-basis definition |
| description (KG) | A basis where all vectors are mutually orthogonal (orthogonal basis) or additionally unit vectors (orthonormal basis). In an ONB, coordinates of v are simply ⟨v,eᵢ⟩. Key properties: (AB)ᵀ=BᵀAᵀ, (Aᵀ)ᵀ=A. Symmetric matrices satisfy A=Aᵀ. |

## Component 1 — Learning Objectives

- LO1: Verify whether a given basis is **orthogonal** (every pair of distinct basis vectors has dot product zero) and, further, whether it is **orthonormal** (orthogonal AND every vector has unit length) — recognizing orthonormal as the strictly stronger condition.
- LO2: Compute the coordinates of a vector $v$ in an **orthonormal basis** $\{e_1,\dots,e_n\}$ directly via $v = \sum_i \langle v,e_i\rangle e_i$ — i.e. the $i$-th coordinate is simply the inner product $\langle v,e_i\rangle$ — without needing to solve a linear system, directly refuting the misconception that finding coordinates in ANY basis always requires solving simultaneous equations.
- LO3: Explain why this direct-coordinate shortcut ($c_i=\langle v,e_i\rangle$) **fails** for a general (non-orthonormal) basis, and correctly identify that the simplification is a consequence specifically of orthonormality, not a property of all bases.

## Component 2 — Prerequisite Check

Assumes mastery of `math.linalg.orthogonality` (two vectors are orthogonal iff their dot product is zero, and orthogonal vectors are automatically linearly independent) and `math.linalg.basis` (a basis is a linearly independent spanning set, and every vector has a UNIQUE representation as a linear combination of basis vectors).

## Component 3 — Core Explanation

**Orthogonal basis**: a basis $\{v_1,\dots,v_n\}$ of a vector space $V$ is **orthogonal** if every pair of distinct vectors is orthogonal: $v_i\cdot v_j=0$ for $i\ne j$. Since orthogonal vectors are automatically linearly independent (`math.linalg.orthogonality`), any set of $n$ nonzero mutually orthogonal vectors in an $n$-dimensional space automatically forms a basis — the spanning property comes for free once independence and the correct count are established.

**Orthonormal basis (ONB)**: an orthogonal basis where, additionally, every vector has **unit length** ($\|e_i\|=1$ for all $i$). Orthonormal is strictly stronger than orthogonal — any orthogonal basis can be converted to an orthonormal one by simply dividing (normalizing) each vector by its own length, which doesn't change any of the directions or the mutual-orthogonality relationships.

**The direct-coordinate shortcut in an ONB**: for a general basis, finding a vector $v$'s coordinates means solving $v = c_1v_1+\cdots+c_nv_n$ for the unknowns $c_1,\dots,c_n$ — genuinely a system of linear equations in general. But in an **orthonormal** basis specifically, take the inner product of both sides with $e_j$: $\langle v,e_j\rangle = \sum_i c_i\langle e_i,e_j\rangle$. Since $\langle e_i,e_j\rangle=0$ for $i\ne j$ (orthogonality) and $\langle e_j,e_j\rangle=1$ (unit length), every term in the sum vanishes except $i=j$, leaving $\langle v,e_j\rangle = c_j$ directly — **no system-solving required**, just $n$ independent inner-product computations.

**Why this shortcut is specific to orthonormality, not general to all bases**: the derivation above used BOTH orthogonality (to kill the cross terms $i\ne j$) AND unit length (so the surviving term is exactly $c_j$, not $c_j\|e_j\|^2$). Without orthogonality, the cross terms don't vanish, and the equation $\langle v,e_j\rangle=\sum_i c_i\langle e_i,e_j\rangle$ remains a genuine system coupling all the unknowns together — exactly the general-basis situation.

## Component 4 — Worked Examples

**Example 1 (LO1 — verifying orthogonal vs. orthonormal)**: In $\mathbb{R}^2$, consider $v_1=(3,4)$, $v_2=(4,-3)$. Check orthogonality: $v_1\cdot v_2 = 3(4)+4(-3)=12-12=0$ ✓ — this IS an orthogonal basis (2 nonzero orthogonal vectors in a 2D space). Check unit length: $\|v_1\|=\sqrt{9+16}=5\ne1$ — NOT orthonormal. Normalizing: $e_1=(3/5,4/5)$, $e_2=(4/5,-3/5)$ — now $\|e_1\|=\|e_2\|=1$ (verify: $\sqrt{9/25+16/25}=\sqrt{25/25}=1$ ✓), giving a genuine orthonormal basis.

**Example 2 (LO2 — the direct-coordinate shortcut in an ONB)**: Using the orthonormal basis $e_1=(3/5,4/5)$, $e_2=(4/5,-3/5)$ from Example 1, find the coordinates of $v=(1,7)$. Directly: $c_1=\langle v,e_1\rangle = 1(3/5)+7(4/5) = 3/5+28/5=31/5$. $c_2=\langle v,e_2\rangle=1(4/5)+7(-3/5)=4/5-21/5=-17/5$. Verify: $c_1e_1+c_2e_2 = \frac{31}{5}(3/5,4/5)+\frac{-17}{5}(4/5,-3/5) = (93/25,124/25)+(-68/25,51/25) = (25/25,175/25)=(1,7)$ ✓ — matches $v$ exactly, with no system of equations ever solved.

**Example 3 (LO3 — the shortcut fails for a non-orthonormal basis, breaking MC-1)**: Consider the NON-orthogonal basis $u_1=(1,0)$, $u_2=(1,1)$ (check: $u_1\cdot u_2=1\ne0$, not orthogonal). For $v=(1,7)$, try the shortcut anyway: $\langle v,u_1\rangle = 1(1)+7(0)=1$, $\langle v,u_2\rangle=1(1)+7(1)=8$. But checking $1\cdot u_1+8\cdot u_2 = (1,0)+(8,8)=(9,8)\ne(1,7)$ — the shortcut gives the WRONG answer. Solving the actual system $v=c_1u_1+c_2u_2$: $(1,7)=c_1(1,0)+c_2(1,1)$ gives $c_2=7$ (from the second coordinate) and $c_1+7=1\Rightarrow c_1=-6$ (from the first) — genuinely requiring the system-solving the ONB shortcut was designed to avoid. This proves the direct-coordinate formula is not a general basis property but a specific consequence of orthonormality.

## Component 5 — Teaching Actions

### Teaching Action A01 — Orthogonal vs. Orthonormal, and Normalizing (Primitive P06: Contrast Pair)

Draw two perpendicular but unequal-length axes, then rescale them to length 1. State: "orthogonal means the directions are perpendicular; orthonormal additionally requires each direction to be exactly length 1 — always achievable by dividing each vector by its own length, without changing any angle." Work Example 1's verification and normalization directly.

### Teaching Action A02 — Coordinates for Free: the ONB Shortcut (Primitive P11: Representation Shift)

State the payoff directly: "in a general basis, finding coordinates means solving equations. In an ORTHONORMAL basis, you get each coordinate directly — just take one inner product per coordinate, no system required." Derive the shortcut symbolically (killing cross terms via orthogonality, then unit length simplifying the surviving term), then work Example 2's full numeric verification.

### Teaching Action A03 — The Shortcut Requires Orthonormality Specifically (Primitive P28: Conflict Evidence)

Present Example 3's direct conflict: applying the ONB shortcut formula to the non-orthogonal basis $\{u_1,u_2\}$ gives a result ($c_1=1,c_2=8$) that provably does NOT reconstruct $v$, while the actual system-solving does. State: "the shortcut isn't a universal basis trick — it specifically depends on the cross terms vanishing, which only happens when the basis vectors are orthogonal (and normalized to length 1). Try it on a basis that isn't orthonormal, and it silently gives the wrong answer."

- **MC-1 hook**: ask "does the formula $c_i=\langle v,e_i\rangle$ work for finding coordinates in ANY basis, or only special ones?" — a "yes, any basis" answer reveals MC-1 (over-generalizing the ONB coordinate shortcut to bases lacking the orthonormality that makes it valid).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Verify whether $\{(1,1,0),(1,-1,0),(0,0,1)\}$ is an orthogonal basis of $\mathbb{R}^3$, and if so, normalize it into an orthonormal basis.
  2. Using the orthonormal basis you found in problem 1, find the coordinates of $v=(2,4,3)$ via the direct inner-product shortcut, and verify your answer reconstructs $v$.
  3. Explain, without doing any further computation, why applying the shortcut formula $c_i=\langle v,e_i\rangle$ to the STANDARD basis $\{(1,0,0),(0,1,0),(0,0,1)\}$ happens to give correct coordinates too — is the standard basis orthonormal?
  4. A student uses the coordinate shortcut on the basis $\{(2,0),(1,1)\}$ (which is NOT orthogonal — verify this first) and gets an answer that seems too good to be true. Explain, referencing Example 3, why this shortcut result cannot be trusted here.
- **P76 (Transfer Probe, mode = independence)**: "A signal-processing engineer represents audio signals as vectors in a high-dimensional space, and uses an orthonormal basis of 'basis waveforms' (analogous to $e_1,\dots,e_n$ here) to decompose any incoming signal $v$. (a) Explain why the engineer can compute each coordinate (how much of each basis waveform is present in the signal) using a simple inner-product computation, rather than solving a large system of equations, directly citing the property that makes this possible. (b) If the engineer instead used a basis of waveforms that were NOT mutually orthogonal, explain what specifically would go wrong if they still tried to use the simple inner-product shortcut. (c) Explain why, for a system processing thousands of signals per second, the availability of this shortcut (rather than needing to solve a system for every single signal) is not just a convenience but essential."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | ONB-COORDINATE-SHORTCUT-OVERGENERALIZED | Applying the direct inner-product coordinate formula $c_i=\langle v,e_i\rangle$ to a basis that is not orthonormal, believing it works for any basis | Foundational |
| MC-2 | ORTHOGONAL-CONFLATED-WITH-ORTHONORMAL | Treating "orthogonal basis" and "orthonormal basis" as synonymous, missing that orthonormal additionally requires unit length | Foundational |
| MC-3 | ORTHOGONAL-VECTORS-ASSUMED-AUTOMATICALLY-SPANNING | Assuming any set of mutually orthogonal nonzero vectors automatically forms a basis of the full space, without checking the count matches the space's dimension | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "ONB Shortcut Overgeneralization") → P41 (detect: give a non-orthogonal basis and ask the student to find coordinates using the direct inner-product shortcut) → P64 (conceptual shift: re-walk Example 3's direct disproof, showing the shortcut's result fails to reconstruct $v$, then re-derive symbolically why orthogonality is required to kill the cross terms).
- **B02 (targets MC-2)**: P27 (name it: "Orthogonal-Orthonormal Conflation") → P41 (detect: ask whether $\{(3,4),(4,-3)\}$ from Example 1 is already an orthonormal basis, before normalizing) → P64 (conceptual shift: re-check both conditions separately — orthogonality (dot product zero, holds) and unit length ($\|v_1\|=5\ne1$, fails) — re-anchoring on orthonormal as the strictly stronger, two-part condition).
- **B03 (targets MC-3)**: P27 (name it: "Orthogonal-Implies-Spanning Assumption") → P41 (detect: give 2 mutually orthogonal nonzero vectors in $\mathbb{R}^3$ and ask if they form a basis of $\mathbb{R}^3$) → P64 (conceptual shift: re-anchor on "orthogonality guarantees independence for free, but you still need exactly $n$ vectors to span an $n$-dimensional space — 2 orthogonal vectors in 3D span only a plane, not all of $\mathbb{R}^3$").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.linalg.orthogonality` (the dot-product-zero definition and the automatic-independence property this concept's basis structure relies on), `math.linalg.basis` (the independent-and-spanning definition and uniqueness-of-coordinates property this concept specializes).
- **Unlocks**: `math.linalg.gram-schmidt` (the algorithmic process for CONSTRUCTING an orthonormal basis from an arbitrary one), `math.linalg.projection` (projections onto subspaces are computed directly using an orthonormal/orthogonal basis's coordinate structure).
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 3 with a proficient/apply tag places this at a "3 TAs + gate" tier — A01 (orthogonal vs. orthonormal), A02 (the coordinate shortcut), and A03 (why the shortcut needs orthonormality specifically) each target a distinct LO, appropriate for a compact concept whose entire value proposition is the one computational shortcut and its precise scope of validity.
- Example 3 was deliberately constructed to make the shortcut's failure mode as vivid as possible: applying the WRONG formula produces a specific, checkable wrong numeric answer (rather than an error or undefined result), which is the strongest possible demonstration that a student cannot rely on "the formula ran without complaint" as evidence of correctness — the formula's validity must be checked via the basis's orthonormality BEFORE applying it, not verified after the fact by whether it happened to run.
- The metadata table's raw KG description field includes matrix-transpose-identity text ("(AB)ᵀ=BᵀAᵀ...") that appears to be a copy-paste artifact from an adjacent linear-algebra KG entry rather than content genuinely describing orthogonal/orthonormal bases; this blueprint's Components 1-6 are authored strictly from the concept's own name, requires/unlocks/cross_links structure, and the portion of the description field that IS topically relevant (orthogonal/orthonormal basis definitions and the ONB coordinate formula), consistent with this corpus's practice of teaching the concept as named rather than reproducing an evidently mismatched description verbatim.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (both) |
| V-4 | unlocks concepts named accurately from KG | PASS (both) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.9×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: perpendicular axes before the general definition) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS (topically-relevant portion used; noted description-field anomaly explicitly in Component 8) |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
