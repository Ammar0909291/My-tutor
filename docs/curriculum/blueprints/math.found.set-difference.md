# Teaching Blueprint: Set Difference (`math.found.set-difference`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.found.set-difference` |
| name | Set Difference |
| domain | Foundations |
| difficulty | foundational |
| bloom | apply |
| mastery_threshold | 0.90 → MAMR = ⌈0.90×5⌉ = 5/5 |
| estimated_hours | 1 |
| requires | `math.found.set-operations` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) |
| description (KG) | The set difference A \ B consists of all elements in A that are not in B. |
| related | `math.found.complement` |
| aliases | relative complement, A \ B, A - B |

## Component 1 — Learning Objectives

- LO1: Compute $A\setminus B$ for given finite sets, keeping only elements of $A$ that are NOT in $B$.
- LO2: Prove, by counterexample, that set difference is NOT symmetric: $A\setminus B\ne B\setminus A$ in general.
- LO3: State $A\setminus B=A\cap B^c$ (difference expressed via intersection with a complement), connecting this concept to `math.found.complement`.

## Component 2 — Prerequisite Check

Assumes mastery of `math.found.set-operations` (this is the third of the four operations named there, isolated here for focused practice).

## Component 3 — Core Explanation

The **set difference** $A\setminus B$ (also written $A-B$) is the set of elements in $A$ that are NOT in $B$: $A\setminus B=\{x : x\in A \text{ and } x\notin B\}$. Unlike union and intersection (both symmetric: $A\cup B=B\cup A$, $A\cap B=B\cap A$), **set difference is NOT symmetric** — $A\setminus B$ and $B\setminus A$ generally describe entirely different sets, since removing $B$'s elements from $A$ is a different operation than removing $A$'s elements from $B$.

Set difference can equivalently be written $A\setminus B=A\cap B^c$ (the elements of $A$ that survive after intersecting with $B$'s complement), directly linking this concept to `math.found.complement`.

## Component 4 — Worked Examples

**Example 1 (LO1 — direct computation)**: $A=\{1,2,3,4,5\}$, $B=\{3,4,5,6,7\}$. $A\setminus B=\{1,2\}$ — the elements of $A$ (namely 1 and 2) that are not also in $B$.

**Example 2 (LO2 — asymmetry, breaking MC-1)**: Using the same $A,B$ as Example 1: $B\setminus A=\{6,7\}$ — genuinely different from $A\setminus B=\{1,2\}$. This confirms $A\setminus B\ne B\setminus A$: removing $B$'s elements from $A$ leaves what's uniquely in $A$; removing $A$'s elements from $B$ leaves what's uniquely in $B$ — two different questions with two different answers.

**Example 3 (LO3 — difference via complement)**: With $A=\{1,2,3,4,5\}$ and universal set $U=\{1,\ldots,10\}$, take $B=\{3,4,5,6,7\}$ as before. $B^c$ (relative to $U$) $=\{1,2,8,9,10\}$. Then $A\cap B^c=\{1,2,3,4,5\}\cap\{1,2,8,9,10\}=\{1,2\}$ — matching $A\setminus B$ from Example 1 exactly, confirming $A\setminus B=A\cap B^c$.

## Component 5 — Teaching Actions

### Teaching Action A01 — Keep Only What's in A but Not in B (Primitive P64: Conceptual Shift)

Work Example 1, explicitly checking each element of $A$ against membership in $B$, discarding any that also appear in $B$.

- **MC-1 hook**: give Example 1's sets, compute $A\setminus B$ together, then ask the student to predict $B\setminus A$ before computing; check whether they assume it will be the same set (revealing MC-1: assuming set difference is symmetric like union and intersection).

### Teaching Action A02 — Difference as Intersection with a Complement (Primitive P11: Representation Shift)

Work Example 3, showing the same result reached two ways ($A\setminus B$ directly, and $A\cap B^c$), explicitly stating the equivalence $A\setminus B=A\cap B^c$ as a bridge to `math.found.complement`.

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.90×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Compute $A\setminus B$ for $A=\{a,b,c,d,e\}$, $B=\{b,d,f\}$.
  2. For the same $A,B$ as item 1, compute $B\setminus A$ and confirm it differs from $A\setminus B$.
  3. Given $A=\{2,4,6,8,10\}$, $B=\{4,8\}$ (here $B\subseteq A$), compute $A\setminus B$ and describe, in general, what $A\setminus B$ equals whenever $B\subseteq A$.
  4. Compute $B\setminus A$ for the same $A,B$ as item 3, and explain why the result is $\emptyset$.
- **P76 (Transfer Probe, mode = independence)**: "A company's full employee list is $E$; the list of employees who completed mandatory training is $T$ (with $T\subseteq E$). (a) Using set difference, express the set of employees who have NOT completed training, and explain in context what $T\setminus E$ would represent instead (and why it should be empty, given $T\subseteq E$). (b) A manager asks for 'the employees in $T$ but not $E$' and separately 'the employees in $E$ but not $T$,' insisting these describe the same group. Explain, using the asymmetry of set difference, why the manager is mistaken and what each phrase actually describes."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | SET-DIFFERENCE-ASSUMED-SYMMETRIC | Believing $A\setminus B=B\setminus A$, over-generalizing from union/intersection's genuine symmetry | Foundational |
| MC-2 | DIFFERENCE-COMPLEMENT-EQUIVALENCE-NOT-RECOGNIZED | Failing to connect $A\setminus B$ with $A\cap B^c$, treating the two as unrelated computations rather than the same operation expressed differently | Minor |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Set Difference Assumed Symmetric") → P41 (detect: ask the student to predict $B\setminus A$ immediately after computing $A\setminus B$; check for an assumed-equal answer) → P64 (conceptual shift: re-derive both directions explicitly from Example 2, confirming the two results genuinely differ).
- **B02 (targets MC-2)**: P27 ("Difference/Complement Equivalence Not Recognized") → P41 (detect: ask the student to compute $A\setminus B$ using the complement route and check for hesitation or an unrelated approach) → P64 (conceptual shift: re-walk Example 3's two parallel computations side by side, confirming they match).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.found.set-operations`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.found.complement` (this concept's Example 3 anticipates and directly connects to that concept's own material — cited by reference, not duplicated).

## Component 8 — Teaching Notes

- estimated_hours = 1, matching the other isolated-operation entries in this wave (`math.found.union`, `math.found.intersection`).
- MC-1 was ranked foundational because it is a direct instance of over-generalizing a property (symmetry) from two operations to a third that genuinely lacks it — the same over-generalization pattern documented in `math.found.set-operations`'s own MC-2 (mixed-operation grouping), now applied to a different property.
- Example 3's difference-via-complement bridge was deliberately included even though `math.found.complement` is authored as a separate, later concept in this domain wave — establishing the connection here (forward-referencing) lets that later concept simply confirm and extend it rather than introducing it cold.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.found.set-operations`) |
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
| V-15 | CPA_entry_stage justified | PASS (Pictorial) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
