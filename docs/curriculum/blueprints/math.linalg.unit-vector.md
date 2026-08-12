# Teaching Blueprint: Unit Vector (`math.linalg.unit-vector`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.linalg.unit-vector` |
| name | Unit Vector |
| domain | Linear Algebra |
| difficulty | developing |
| bloom | apply |
| mastery_threshold | 0.95 → MAMR = ⌈0.95×5⌉ = 5/5 |
| estimated_hours | 1 |
| requires | `math.linalg.norm` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) — arrow diagrams before symbolic normalization |
| description (KG) | A vector of norm 1. Obtained by normalizing: v̂ = v/|v|. Standard basis vectors e₁,…,eₙ are the canonical unit vectors in ℝⁿ.

 |

## Component 1 — Learning Objectives

- LO1: Determine whether a given vector is a unit vector by computing its norm and checking whether it equals 1.
- LO2: NORMALIZE a nonzero vector $v$ into a unit vector $\hat v=\frac{v}{|v|}$ (dividing EVERY component by the vector's norm).
- LO3: Recognize the standard basis vectors $e_1,\ldots,e_n$ as the canonical unit vectors, each having a single component equal to 1 and all others 0.

## Component 2 — Prerequisite Check

Assumes mastery of `math.linalg.norm` (vector length/magnitude) — a unit vector is precisely one whose norm equals 1.

## Component 3 — Core Explanation

A **unit vector** has norm (length) exactly $1$. Any nonzero vector $v$ can be converted into a unit vector pointing in the SAME direction by **normalizing**: $\hat v=\frac{v}{|v|}$ — dividing every component of $v$ by its own norm $|v|$. This preserves the vector's DIRECTION while rescaling its LENGTH to exactly 1.

The **standard basis vectors** $e_1=(1,0,\ldots,0)$, $e_2=(0,1,0,\ldots,0)$, etc., are the canonical unit vectors in $\mathbb{R}^n$ — each has a single component equal to 1 (in a different position) and all others 0, and each has norm exactly 1 by direct computation.

## Component 4 — Worked Examples

**Example 1 (LO1 — checking unit-vector status)**: Is $v=(0.6,0.8)$ a unit vector? Compute the norm: $|v|=\sqrt{0.6^2+0.8^2}=\sqrt{0.36+0.64}=\sqrt1=1$ — YES, this is a unit vector.

**Example 2 (LO2 — normalizing a vector, breaking MC-1)**: Normalize $v=(3,4)$. Compute the norm: $|v|=\sqrt{3^2+4^2}=\sqrt{25}=5$. Normalize: $\hat v=\left(\frac35,\frac45\right)=(0.6,0.8)$. Verify: $|\hat v|=\sqrt{0.6^2+0.8^2}=1$ ✓. A common error divides only ONE component by the norm (or subtracts the norm instead of dividing), rather than dividing EVERY component by the same norm value — normalization must scale the ENTIRE vector uniformly.

**Example 3 (LO3 — standard basis vectors, breaking MC-2)**: In $\mathbb{R}^3$, the standard basis vectors are $e_1=(1,0,0)$, $e_2=(0,1,0)$, $e_3=(0,0,1)$ — each has norm exactly $\sqrt{1^2+0^2+0^2}=1$. A common error assumes ANY vector with a single nonzero entry (regardless of its VALUE) is automatically a standard basis vector — e.g. treating $(5,0,0)$ as if it were $e_1$; but $(5,0,0)$ has norm $5$, not $1$, so it is NOT a unit vector at all, let alone the standard basis vector $e_1$ specifically — only entries of EXACTLY $1$ (and 0 elsewhere) qualify.

## Component 5 — Teaching Actions

### Teaching Action A01 — Check the Norm Equals Exactly 1 (Primitive P64: Conceptual Shift)

Work Example 1, computing the norm explicitly and confirming it equals 1 before declaring the vector a unit vector.

### Teaching Action A02 — Normalize by Dividing Every Component by the Norm (Primitive P06: Contrast Pair)

Work Example 2, contrasting the correct full-vector division against a flawed partial (single-component) division, verifying the correct result's norm equals exactly 1 while the flawed version's would not. State the rule: "normalizing means dividing EVERY component by the SAME norm value — this rescales length uniformly while preserving direction."

- **MC-1 hook**: this directly targets MC-1 (dividing only part of the vector, or using the wrong operation, during normalization).

### Teaching Action A03 — Standard Basis Vectors Need Exactly 1, Not Just "One Nonzero Entry" (Primitive P06: Contrast Pair, second pairing)

Work Example 3, contrasting $e_1=(1,0,0)$ against the flawed $(5,0,0)$ "look-alike," computing both norms explicitly to show only the former qualifies. State the rule: "a standard basis vector needs its single nonzero entry to be EXACTLY 1 — any other value, even with the same zero pattern, is not a unit vector."

- **MC-2 hook**: this directly targets MC-2 (assuming any single-nonzero-entry vector is automatically a standard basis vector, regardless of its value).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.95×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Determine whether $(\frac{1}{\sqrt2},\frac{1}{\sqrt2})$ is a unit vector.
  2. Normalize $v=(6,8)$.
  3. Normalize $v=(1,2,2)$.
  4. Explain, in one sentence, why $(0,7,0)$ is not the standard basis vector $e_2$ despite having zeros in the same positions.
- **P76 (Transfer Probe, mode = independence)**: "A robotics engineer needs a direction vector for a sensor pointing toward $(9,12)$ relative to the robot, but the control system requires all direction inputs to be UNIT vectors (norm exactly 1) for its internal calculations. (a) Normalize $(9,12)$ into a unit vector preserving the same direction. (b) Explain, using this lesson's normalization idea, why the control system's requirement (unit vectors only) doesn't lose any DIRECTIONAL information about where the sensor points, even though the vector's magnitude has been rescaled to 1."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | NORMALIZATION-APPLIED-TO-ONLY-PART-OF-THE-VECTOR | Dividing only some components (or using a different operation entirely) rather than dividing every component by the same norm value | Foundational |
| MC-2 | STANDARD-BASIS-VECTOR-IDENTIFIED-BY-ZERO-PATTERN-ALONE | Assuming any vector with a single nonzero entry qualifies as a standard basis vector, without checking that the nonzero entry equals exactly 1 | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Normalization Applied to Only Part of the Vector") → P41 (detect: present Example 2 and check whether every component is divided by the norm) → P64 (conceptual shift: re-derive by computing the norm first, then explicitly dividing EACH component one at a time, verifying the result's norm equals 1).
- **B02 (targets MC-2)**: P27 ("Standard Basis Vector Identified by Zero Pattern Alone") → P41 (detect: present the $(5,0,0)$ vs. $(1,0,0)$ contrast and check whether both are (incorrectly) treated as $e_1$) → P64 (conceptual shift: compute both vectors' norms explicitly, showing only $(1,0,0)$ has norm exactly 1).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.linalg.norm`.
- **Unlocks**: none recorded in the KG.
- **Related**: none declared.

## Component 8 — Teaching Notes

- estimated_hours = 1 and mastery_threshold = 0.95 reflect that this is a quick, high-precision fact/procedure with broad downstream use (unit vectors appear constantly in direction-encoding, basis construction, and later orthogonality work).
- MC-1 was ranked most severe because it produces a vector that LOOKS normalized (still points in a plausible direction) but fails the actual norm-equals-1 requirement, an error easy to miss without explicit verification.
- The robotics transfer probe was deliberately chosen to give normalization concrete practical meaning (a real engineering requirement for direction-only sensor data), reinforcing that unit vectors specifically preserve DIRECTION while standardizing MAGNITUDE.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.linalg.norm`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.95×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: arrow diagrams before symbols) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
