# Teaching Blueprint: Catalan Numbers (`math.disc.catalan-numbers`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.disc.catalan-numbers` |
| name | Catalan Numbers |
| domain | Discrete Mathematics |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 5 |
| requires | `math.disc.combinations`, `math.disc.recurrence-relation` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) — hand-drawn parenthesizations/paths before symbolic formula |
| description (KG) | Cₙ = C(2n,n)/(n+1). Count parenthesizations, triangulations of convex polygon, binary trees, Dyck paths. Recurrence: Cₙ=∑_{k=0}^{n-1}CₖCₙ₋₁₋ₖ. GF: C(x)=(1−√(1−4x))/(2x).

 |

## Component 1 — Learning Objectives

- LO1: Compute the $n$-th Catalan number using the closed-form $C_n=\frac{1}{n+1}\binom{2n}{n}$.
- LO2: Recognize when a counting problem is a CATALAN NUMBER instance by identifying one of its standard combinatorial interpretations (valid parenthesizations, binary trees, polygon triangulations, Dyck paths).
- LO3: Verify the closed-form formula against the recursive definition $C_n=\sum_{k=0}^{n-1}C_kC_{n-1-k}$ for a small case, understanding WHY the recurrence has this specific "split at position $k$" structure.

## Component 2 — Prerequisite Check

Assumes mastery of `math.disc.combinations` (the binomial coefficient this closed form uses) and `math.disc.recurrence-relation` (the recursive definition this concept's alternate characterization relies on).

## Component 3 — Core Explanation

The **Catalan numbers** $C_n=\frac{1}{n+1}\binom{2n}{n}$ (equivalently $\binom{2n}{n}-\binom{2n}{n+1}$) count an unusually large and diverse family of combinatorial structures, including: the number of valid ways to fully PARENTHESIZE a product of $n+1$ factors; the number of BINARY TREES with $n$ internal nodes; the number of ways to TRIANGULATE a convex $(n+2)$-gon using non-crossing diagonals; and the number of DYCK PATHS (lattice paths from $(0,0)$ to $(2n,0)$ using up-steps and down-steps that never go below the x-axis).

The sequence also satisfies the RECURRENCE $C_n=\sum_{k=0}^{n-1}C_kC_{n-1-k}$ (with $C_0=1$): this arises because many Catalan structures decompose naturally at a "split point" $k$ — e.g. a binary tree's root has a left subtree (some size $k$) and right subtree (the remaining size $n-1-k$), each independently ANY valid smaller structure, giving the convolution-style sum.

## Component 4 — Worked Examples

**Example 1 (LO1 — direct computation)**: Compute $C_4=\frac{1}{5}\binom{8}{4}=\frac{1}{5}\times70=14$.

**Example 2 (LO2 — recognizing a Catalan interpretation, breaking MC-1)**: "How many ways can a convex hexagon (6 sides) be divided into triangles using non-crossing diagonals?" A hexagon has $n+2=6\Rightarrow n=4$ sides for the TRIANGULATION formula, so the answer is $C_4=14$. A common error uses the wrong index relationship — e.g. plugging $n=6$ directly (using the side count as $n$ itself) rather than correctly solving $n+2=6\Rightarrow n=4$ first — each Catalan interpretation has its OWN specific index-to-$n$ correspondence that must be identified correctly before applying the formula.

**Example 3 (LO3 — verifying the recurrence for a small case)**: Verify $C_3$ via the recurrence: $C_3=\sum_{k=0}^{2}C_kC_{2-k}=C_0C_2+C_1C_1+C_2C_0$. Using $C_0=1,C_1=1,C_2=2$: $=1\times2+1\times1+2\times1=2+1+2=5$. Check against the closed form: $C_3=\frac{1}{4}\binom{6}{3}=\frac{1}{4}\times20=5$ ✓ — both methods agree, confirming the recurrence and closed form describe the same sequence.

## Component 5 — Teaching Actions

### Teaching Action A01 — Compute Catalan Numbers from the Closed Form (Primitive P64: Conceptual Shift)

Work Example 1, computing $\binom{2n}{n}$ first (reusing `math.disc.combinations`'s formula) and then dividing by $n+1$, building a small reference table of $C_0$ through $C_5$ for later use.

### Teaching Action A02 — Each Interpretation Has Its Own Index Correspondence (Primitive P06: Contrast Pair)

Work Example 2's hexagon-triangulation case, contrasting the CORRECT index derivation ($n+2=6\Rightarrow n=4$) against the flawed direct-substitution guess ($n=6$). State the rule: "before applying $C_n$ to a specific combinatorial scenario, first solve for what $n$ actually corresponds to in THAT interpretation — the correspondence differs across parenthesizations, trees, triangulations, and Dyck paths."

- **MC-1 hook**: this contrast directly targets MC-1 (misapplying a problem's raw size parameter as $n$ without deriving the correct correspondence).

### Teaching Action A03 — The Recurrence's Split-Point Structure (Primitive P11: Representation Shift)

Work Example 3's verification, explicitly drawing a small binary tree and identifying its root's left/right subtree split to ground WHY the recurrence sums over all possible split positions $k$, connecting the abstract sum to a concrete structural decomposition.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.75×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Compute $C_5$ using the closed-form formula.
  2. How many distinct binary trees with 5 internal nodes exist? Identify the correct Catalan number to use.
  3. How many ways can a product of 6 factors ($a_1\times a_2\times\cdots\times a_6$) be fully parenthesized? (Hint: relates to $C_n$ for $n+1=6$ factors.)
  4. Verify $C_2$ via the recurrence formula, showing each term of the sum.
- **P76 (Transfer Probe, mode = independence)**: "A stack-based computer program processes a sequence of 5 'push' and 5 'push' operations... actually, consider a sequence of $n=5$ balanced parentheses '((()))' style strings (5 open, 5 close, never more closes than opens at any prefix) — this is a classic Dyck-path scenario. (a) Determine the number of such valid balanced-parenthesis strings of length 10 (5 opens, 5 closes), identifying which Catalan number applies and correctly deriving the index correspondence for the Dyck-path interpretation. (b) Explain, in general terms, why this balanced-parentheses counting problem and the polygon-triangulation problem from Example 2 — seemingly unrelated on the surface — are both governed by the exact same sequence of numbers."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | INDEX-CORRESPONDENCE-MISAPPLIED-PER-INTERPRETATION | Using a problem's raw size parameter directly as $n$ in the Catalan formula without deriving the correct interpretation-specific correspondence (e.g. polygon sides vs. triangulation's $n$) | Foundational |
| MC-2 | CATALAN-RECURRENCE-INDICES-MISALIGNED | Miscomputing the recurrence sum's term indices (e.g. using $C_kC_{n-k}$ instead of the correct $C_kC_{n-1-k}$), producing a wrong intermediate or final value | Foundational |
| MC-3 | CLOSED-FORM-BINOMIAL-COEFFICIENT-MISCOMPUTED | Computing $\binom{2n}{n}$ incorrectly, an error in the underlying combinations computation rather than the Catalan-specific structure | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Index Correspondence Misapplied per Interpretation") → P41 (detect: present Example 2's hexagon case and check whether $n=6$ or the correctly-derived $n=4$ is used) → P64 (conceptual shift: re-derive the correspondence explicitly for the specific interpretation at hand — "a convex $(n+2)$-gon has $n$ solving from the given side count" — before applying the formula).
- **B02 (targets MC-2)**: P27 ("Catalan Recurrence Indices Misaligned") → P41 (detect: review a submitted recurrence computation for mismatched subscripts) → P64 (conceptual shift: re-derive $C_n=\sum_{k=0}^{n-1}C_kC_{n-1-k}$ term by term for a small $n$, explicitly verifying each pair of subscripts sums to $n-1$).
- **B03 (targets MC-3)**: P27 ("Closed-Form Binomial Coefficient Miscomputed") → P41 (detect: review a submitted $\binom{2n}{n}$ computation for an arithmetic error) → P64 (conceptual shift: re-derive via `math.disc.combinations`'s factorial formula directly).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.disc.combinations`, `math.disc.recurrence-relation`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.disc.stirling-numbers` (a sibling "named combinatorial sequence" concept sharing the same two prerequisites).

## Component 8 — Teaching Notes

- estimated_hours = 5 and difficulty = expert reflect that this concept's genuine challenge is not the formula itself (a direct binomial-coefficient computation) but recognizing and correctly indexing its many, structurally diverse combinatorial interpretations.
- MC-1 was ranked most severe because the SAME numerical sequence applies across dramatically different-looking problems, each requiring its own careful index derivation — a student who memorizes only "hexagon → $C_6$" style shortcuts without understanding the underlying correspondence will fail on any interpretation not explicitly drilled.
- The Dyck-path transfer probe was deliberately chosen as the FOURTH distinct interpretation (after parenthesization, binary trees, and triangulation already covered in the worked examples), specifically to test whether LO2's index-correspondence skill transfers to a genuinely novel structural framing, not just the three already-modeled cases.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.disc.combinations`, `math.disc.recurrence-relation`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.75×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: drawn parenthesizations/paths before formula) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
