# Teaching Blueprint: Rank-Nullity Theorem (`math.linalg.rank-nullity`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.linalg.rank-nullity` |
| name | Rank-Nullity Theorem |
| domain | Linear Algebra |
| difficulty | proficient |
| bloom | understand |
| mastery_threshold | 0.90 → MAMR = ⌈0.90×5⌉ = 5/5 |
| estimated_hours | 3 |
| requires | `math.linalg.rank`, `math.linalg.null-space`, `math.linalg.column-space`, `math.linalg.dimension` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | For a linear map T:V→W (or m×n matrix A): rank(T) + nullity(T) = dim(V) (= n for matrices). Constrains the sizes of image and kernel.

 |

## Component 1 — Learning Objectives

- LO1: State the Rank-Nullity theorem $\text{rank}(T)+\text{nullity}(T)=\dim(V)$, and apply it to find one quantity given the other two.
- LO2: Correctly identify $\dim(V)$ as the dimension of the DOMAIN (for a matrix $A$, this is $n$, the number of COLUMNS — NOT the number of rows).
- LO3: Use the theorem to determine a linear map's injectivity WITHOUT directly computing the kernel — if $\text{rank}(T)=\dim(V)$, then $\text{nullity}(T)=0$, forcing $\ker(T)=\{0\}$ and hence injectivity.

## Component 2 — Prerequisite Check

Assumes mastery of `math.linalg.rank`, `math.linalg.null-space`, `math.linalg.column-space`, and `math.linalg.dimension` — this theorem synthesizes all four into one constraining equation.

## Component 3 — Core Explanation

The **Rank-Nullity theorem** states: for a linear map $T:V\to W$ (or, equivalently, an $m\times n$ matrix $A$), $\text{rank}(T)+\text{nullity}(T)=\dim(V)$ — where $\text{rank}(T)=\dim(\text{im}(T))$ (the image's dimension) and $\text{nullity}(T)=\dim(\ker(T))$ (the kernel's dimension). For a matrix $A$, $\dim(V)=n$ (the number of COLUMNS, i.e. the domain's dimension).

This is a powerful CONSTRAINT: knowing any two of the three quantities (rank, nullity, $\dim(V)$) determines the third exactly. It also gives an indirect way to reason about injectivity: since $T$ is injective iff $\ker(T)=\{0\}$ iff $\text{nullity}(T)=0$, and the theorem forces $\text{nullity}(T)=\dim(V)-\text{rank}(T)$, checking whether $\text{rank}(T)=\dim(V)$ directly answers the injectivity question.

## Component 4 — Worked Examples

**Example 1 (LO1, LO2 — basic application, breaking MC-1)**: For a $3\times5$ matrix $A$ (3 rows, 5 columns) with $\text{rank}(A)=2$, find the nullity. $\dim(V)=n=5$ (the number of COLUMNS, since $V=\mathbb{R}^5$ is the domain). $\text{nullity}(A)=5-2=3$. A common error uses the number of ROWS (3) instead of columns (5) for $\dim(V)$, producing $3-2=1$ instead of the correct $3$ — $\dim(V)$ is always the DOMAIN's dimension (columns for a matrix acting as $A:\mathbb{R}^n\to\mathbb{R}^m$), never the codomain's.

**Example 2 (LO3 — using the theorem to check injectivity indirectly, breaking MC-2)**: For a $4\times4$ matrix $A$ with $\text{rank}(A)=4$ (full rank), determine injectivity without computing the kernel directly. Since $\dim(V)=4$ and $\text{rank}(A)=4$, the theorem gives $\text{nullity}(A)=4-4=0$ — so $\ker(A)=\{0\}$, and $A$ IS injective. Contrast: if instead $\text{rank}(A)=3$ for the same $4\times4$ matrix, $\text{nullity}(A)=4-3=1\ne0$, so $A$ is NOT injective (some nonzero vector maps to zero). A common error checks only whether rank is "large" or "reasonably high" without the EXACT comparison against $\dim(V)$ specifically — injectivity requires rank to EQUAL $\dim(V)$ exactly, not merely be close to it or "most of it."

**Example 3 (LO1 — a square matrix case)**: For a $6\times6$ matrix $A$ with nullity $2$ (a 2-dimensional kernel), find the rank. $\dim(V)=6$. $\text{rank}(A)=6-2=4$.

## Component 5 — Teaching Actions

### Teaching Action A01 — Rank + Nullity = dim(V), Using COLUMNS for Matrices (Primitive P64: Conceptual Shift)

Work Example 1, explicitly identifying $\dim(V)$ as the number of columns (the domain), before applying the formula.

- **MC-1 hook**: check whether columns (not rows) are correctly used for $\dim(V)$.

### Teaching Action A02 — Full Rank Exactly Equal to dim(V) Means Injective (Primitive P06: Contrast Pair)

Work Example 2's two cases (rank 4 vs. rank 3, both against $\dim(V)=4$) side by side, showing the EXACT equality (not approximate closeness) determines injectivity. State the rule: "injectivity requires $\text{rank}(T)=\dim(V)$ EXACTLY — even one less means a nonzero nullity, and hence a nontrivial kernel, breaking injectivity."

- **MC-2 hook**: this directly targets MC-2 (checking for "high" rank rather than exact equality to $\dim(V)$).

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.90×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. For a $2\times7$ matrix with rank 2, find the nullity.
  2. For a $5\times5$ matrix with nullity 0, determine injectivity and justify using the theorem.
  3. For a linear map $T:\mathbb{R}^6\to\mathbb{R}^4$ with $\text{rank}(T)=4$, find $\text{nullity}(T)$.
  4. Explain, in one sentence, why $\dim(V)$ in the Rank-Nullity theorem refers to the domain's dimension, not the codomain's.
- **P76 (Transfer Probe, mode = independence)**: "A data-encoding scheme uses a linear map $T:\mathbb{R}^{10}\to\mathbb{R}^6$ (encoding 10 raw values into a 6-value compressed representation) with $\text{rank}(T)=6$ (the encoding uses the full output space). (a) Use the Rank-Nullity theorem to find $\text{nullity}(T)$, and explain what this tells you about whether the encoding is REVERSIBLE (injective) — i.e., whether the original 10 values can always be uniquely recovered from the 6-value encoding. (b) Explain, in practical terms, what a NONZERO nullity means for this encoding scheme — specifically, that multiple different original inputs could produce the IDENTICAL encoded output, a genuine information-loss concern."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | DIM-V-COMPUTED-FROM-ROWS-INSTEAD-OF-COLUMNS | Using a matrix's row count instead of its column count for $\dim(V)$ in the Rank-Nullity theorem | Foundational |
| MC-2 | INJECTIVITY-CHECKED-VIA-HIGH-RANK-RATHER-THAN-EXACT-EQUALITY | Assuming a "high" or "mostly full" rank is sufficient for injectivity, rather than requiring EXACT equality between rank and $\dim(V)$ | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("dim(V) Computed from Rows Instead of Columns") → P41 (detect: present Example 1 and check whether 3 (rows) or 5 (columns) is used for $\dim(V)$) → P64 (conceptual shift: re-state that $V$ is the DOMAIN, and for a matrix acting as $A:\mathbb{R}^n\to\mathbb{R}^m$, $n$ (columns) is always the domain dimension).
- **B02 (targets MC-2)**: P27 ("Injectivity Checked via High Rank Rather Than Exact Equality") → P41 (detect: present Example 2's rank-3-of-4 case and check whether injectivity is (incorrectly) assumed since rank is "close to full") → P64 (conceptual shift: re-compute the exact nullity (1, not 0) from the theorem, confirming a nontrivial kernel exists).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.linalg.rank`, `math.linalg.null-space`, `math.linalg.column-space`, `math.linalg.dimension`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.linalg.kernel-image` (the general linear-map version of rank and nullity this theorem constrains).

## Component 8 — Teaching Notes

- estimated_hours = 3 and bloom = understand reflect that this concept synthesizes FOUR distinct prerequisites into one powerful constraining equation, with genuine conceptual weight in correctly identifying which dimension plays which role.
- MC-1 was ranked most severe because it is an easy, common confusion (rows vs. columns) that silently produces a wrong nullity value while looking like a reasonable computation.
- The data-encoding transfer probe was deliberately chosen because reversibility (injectivity) of compression/encoding schemes is a genuine, high-stakes practical concern, giving the abstract rank-nullity relationship concrete significance for real information-preservation questions.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.linalg.rank`, `math.linalg.null-space`, `math.linalg.column-space`, `math.linalg.dimension`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.90×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO3, Ex3→LO1) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
