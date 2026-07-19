# Teaching Blueprint: Symmetric Relation (`math.found.symmetric-relation`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.found.symmetric-relation` |
| name | Symmetric Relation |
| domain | Foundations |
| difficulty | developing |
| bloom | remember |
| mastery_threshold | 0.9 → MAMR = ⌈0.9×5⌉ = 5/5 |
| estimated_hours | 1 |
| requires | `math.found.relation` |
| unlocks | `math.found.equivalence-relation` |
| cross_links | none |
| CPA_entry_stage | C (Concrete) — checking a small finite relation's listed pairs for mirror pairs, before the general "for all" definition |
| description (KG) | A relation R on A is symmetric if (a, b) ∈ R implies (b, a) ∈ R for all a, b ∈ A. |

## Component 1 — Learning Objectives

- LO1: Define a **symmetric relation**: $R$ on $A$ is symmetric if $(a,b)\in R \Rightarrow (b,a)\in R$ for **all** $a,b\in A$ — and verify symmetry for a given small finite relation by checking, for EVERY listed pair, that its "mirror" pair is also present.
- LO2: Recognize the **matrix signature** of symmetry — using `math.found.relation`'s own matrix representation $M$, $R$ is symmetric exactly when $M[i][j]=M[j][i]$ for every pair of indices $i,j$ (the matrix is symmetric across its main diagonal) — and correctly check this position-by-position, not by comparing rows and columns as ordered lists.
- LO3: Correctly handle the two edge cases the "for all" definition implies: a relation containing only pairs of the form $(a,a)$ (self-loops) is symmetric (since $(a,a)\Rightarrow(a,a)$ trivially), and the **empty relation** is vacuously symmetric (there are no pairs to violate the condition) — while also recognizing that a single missing mirror pair, anywhere in $R$, is enough to disprove symmetry entirely.

## Component 2 — Prerequisite Check

Assumes mastery of `math.found.relation` (a relation $R$ on $A$ is a subset of ordered pairs $A\times A$; the matrix representation $M[i][j]=1$ iff $(a_i,a_j)\in R$; domain, codomain, and image).

## Component 3 — Core Explanation

**Symmetry as a "for all" mirror-pair condition**: a relation $R$ on $A$ is symmetric exactly when, for EVERY pair $(a,b)$ that belongs to $R$, the reversed pair $(b,a)$ ALSO belongs to $R$. This is a universal ("for all") claim about $R$'s pairs, not a claim about "most" or "some" of them — checking symmetry means examining every single pair currently in $R$ and confirming its mirror is present too, with no exceptions allowed.

**The matrix signature**: using `math.found.relation`'s matrix representation $M$ (where $M[i][j]=1$ exactly when $(a_i,a_j)\in R$), symmetry translates directly into $M[i][j]=M[j][i]$ for every pair of indices $i,j$ — the matrix looks identical if you flip it across its main diagonal. This must be checked ENTRY BY ENTRY (comparing the specific value at position $(i,j)$ to the value at position $(j,i)$), not by comparing the overall list of row-entries to the overall list of column-entries as if they were separate, unordered collections.

**Two edge cases from the definition's own logical structure**: a relation containing ONLY self-loop pairs, like $\{(1,1),(2,2)\}$, is symmetric — each pair $(a,a)$ trivially implies its own mirror $(a,a)$, since they're the same pair. The **empty relation** $\varnothing$ is also (vacuously) symmetric — the condition "for all $(a,b)\in R$, ..." is automatically true when there are no pairs in $R$ at all to check, exactly as any universal statement about an empty collection is vacuously true. On the other side, symmetry is fragile: a single pair anywhere in $R$ that is missing its mirror is enough, by itself, to make the ENTIRE relation not symmetric — there is no "partial credit" for having most pairs mirrored.

## Component 4 — Worked Examples

**Example 1 (LO1 — verifying symmetry, a positive case)**: Let $A=\{1,2,3\}$ and $R=\{(1,2),(2,1),(1,3),(3,1)\}$. Check every pair: $(1,2)\in R$ and its mirror $(2,1)\in R$ ✓; $(1,3)\in R$ and its mirror $(3,1)\in R$ ✓. Every pair in $R$ has its mirror also in $R$, and there are no other pairs to check — $R$ IS symmetric.

**Example 2 (LO1/LO3 — a single missing mirror disproves symmetry, breaking MC-1)**: Let $A=\{1,2,3\}$ and $R'=\{(1,2),(2,1),(1,3)\}$ — almost identical to Example 1's $R$, but missing $(3,1)$. Checking: $(1,2)$ and $(2,1)$ ✓ mirrored; but $(1,3)\in R'$ while its mirror $(3,1)\notin R'$ — **one** missing mirror pair. Despite $R'$ having MOST of its pairs correctly mirrored (2 out of 3), this single failure is enough: $R'$ is **NOT** symmetric.

**Example 3 (LO2/LO3 — the matrix check and the two edge cases, breaking MC-2 and MC-3)**: For $R=\{(1,2),(2,1),(1,3),(3,1)\}$ from Example 1 on $A=\{1,2,3\}$, the matrix is $M = \begin{pmatrix}0&1&1\\1&0&0\\1&0&0\end{pmatrix}$. Checking entry-by-entry: $M[1][2]=1=M[2][1]$ ✓; $M[1][3]=1=M[3][1]$ ✓; $M[2][3]=0=M[3][2]$ ✓ — every position matches its diagonal mirror, confirming symmetry directly from the matrix. Now consider $R''=\{(1,1),(2,2)\}$ (only self-loops): each pair trivially mirrors itself, so $R''$ IS symmetric. And the empty relation $\varnothing$ on any $A$ is symmetric too — there are no pairs in $\varnothing$ for the "for all $(a,b)\in R$..." condition to fail on, so it holds vacuously.

## Component 5 — Teaching Actions

### Teaching Action A01 — Checking Every Pair for Its Mirror (Primitive P11: Representation Shift)

State: "symmetric means EVERY pair in $R$ has its reverse also in $R$ — not most pairs, all of them." Work Example 1's full pair-by-pair check.

### Teaching Action A02 — One Missing Mirror Is Enough to Break Symmetry (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: $R'$ has 2 of its 3 pairs correctly mirrored, yet is NOT symmetric because of the ONE pair, $(1,3)$, missing its mirror. State: "symmetry is a 'for all' claim — a single counterexample anywhere disproves it completely, exactly like disproving any other universal statement."

- **MC-1 hook**: ask "if most of a relation's pairs have their mirror present, is it 'basically symmetric'?" — a "yes" answer reveals MC-1 (treating symmetry as a matter of degree rather than an all-or-nothing condition).

### Teaching Action A03 — The Matrix Check, and the Empty/Self-Loop Edge Cases (Primitive P11: Representation Shift)

State: "checking $M[i][j]=M[j][i]$ means comparing SPECIFIC positions, one at a time — not eyeballing whether the rows 'look like' the columns overall." Work Example 3's entry-by-entry matrix check, then the self-loop-only and empty-relation edge cases.

- **MC-2 hook**: ask "to check if a matrix is symmetric, can I just compare the list of numbers in each row to the list of numbers in each column?" — a "yes" answer reveals MC-2 (comparing rows and columns as unordered lists rather than checking specific mirrored positions).
- **MC-3 hook**: ask "is a relation containing only pairs like $(1,1)$, or the empty relation, ever symmetric?" — a "no" answer reveals MC-3 (missing that both cases trivially/vacuously satisfy the symmetry condition).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. For $A=\{1,2,3,4\}$ and $R=\{(1,2),(2,1),(3,4),(4,3)\}$, verify whether $R$ is symmetric by checking every pair.
  2. For $A=\{1,2,3\}$ and $R=\{(1,2),(2,1),(2,3)\}$, determine whether $R$ is symmetric, identifying the specific pair (if any) that breaks symmetry.
  3. Write out the matrix $M$ for the relation in problem 1, and verify $M[i][j]=M[j][i]$ for every entry.
  4. Is the relation $R=\{(2,2)\}$ on $A=\{1,2,3\}$ symmetric? Is the empty relation on $A$ symmetric? Explain both using the "for all" definition.
- **P76 (Transfer Probe, mode = independence)**: "A social network models 'is friends with' as a relation $R$ on the set of users, where $(a,b)\in R$ means 'user $a$ lists user $b$ as a friend.' (a) In a network where friendship must always be mutual (if $a$ friends $b$, then $b$ automatically friends $a$ too), explain why this relation is symmetric. (b) A different app allows one-way 'follows' relationships (like $a$ follows $b$ without $b$ following $a$ back). If even a SINGLE user follows someone who doesn't follow them back, explain why the entire 'follows' relation for that app fails to be symmetric, even if most users do follow each other back. (c) Explain what it would mean, in this social-network context, for the 'follows' relation to be the empty relation, and why that case would still count as symmetric."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | SINGLE-COUNTEREXAMPLE-SUFFICIENT-OVERLOOKED | Believing a relation is "basically symmetric" if most pairs have their mirror present, missing that even one (a,b)∈R without (b,a)∈R disproves symmetry entirely | Foundational |
| MC-2 | SYMMETRIC-MATRIX-CHECK-MISAPPLIED | Attempting to verify matrix symmetry by comparing rows to columns as overall lists, rather than checking specific entries M[i][j] vs M[j][i] position-by-position | Moderate |
| MC-3 | VACUOUS-OR-SELF-LOOP-SYMMETRY-DENIED | Believing a relation containing only self-loop pairs (a,a), or the empty relation, fails to be symmetric, missing that both trivially/vacuously satisfy the condition | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Single Counterexample Sufficient Overlooked") → P41 (detect: ask a student to judge a relation missing exactly one mirror pair and check whether they call it "symmetric enough") → P64 (conceptual shift: re-walk Example 2's direct evidence, re-anchoring on "symmetry is 'for all' — one missing mirror anywhere is a complete disproof, no partial credit").
- **B02 (targets MC-2)**: P27 (name it: "Symmetric Matrix Check Misapplied") → P41 (detect: ask a student to verify a matrix's symmetry and check whether they compare row-lists to column-lists overall rather than specific positions) → P64 (conceptual shift: re-walk Example 3's entry-by-entry check, re-anchoring on "compare $M[i][j]$ to $M[j][i]$ at each specific position — never compare whole rows to whole columns as unordered lists").
- **B03 (targets MC-3)**: P27 (name it: "Vacuous or Self-Loop Symmetry Denied") → P41 (detect: ask a student whether the empty relation or a self-loops-only relation is symmetric, and check for a "no" answer) → P64 (conceptual shift: re-walk Example 3's edge cases, re-anchoring on "$(a,a)\Rightarrow(a,a)$ trivially holds, and 'for all pairs in an empty set' is vacuously true — both are genuinely symmetric, not exceptions to worry about").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.found.relation` (the definition of a relation as a set of ordered pairs, and its matrix representation this concept's LO2 directly reuses).
- **Unlocks**: `math.found.equivalence-relation` (reflexive + symmetric + transitive combined — this concept supplies the symmetric component).
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 1 with a developing/remember tag places this among the corpus's smallest concepts — 3 Teaching Actions plus the gate is still used, per established corpus convention, but each action and example is deliberately compact, matching the concept's genuinely small scope (one definition, one representational check, two edge cases) rather than padding with unnecessary depth.
- Examples 1 and 2 were deliberately built as a near-identical pair (differing by exactly one missing pair) to make the "for all, no partial credit" lesson of MC-1 as stark as possible with minimal extra complexity.
- This is the first concept in the corpus explicitly built as a component of a future `math.found.equivalence-relation` — Component 7 flags this directly so that future concept's own blueprint can cite this one's symmetric-relation treatment by name, matching the corpus's established prerequisite-citation convention.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS |
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
| V-15 | CPA_entry_stage justified | PASS (Concrete: checking a small finite relation's pairs before the general definition) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO1/LO3, Ex3→LO2/LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
