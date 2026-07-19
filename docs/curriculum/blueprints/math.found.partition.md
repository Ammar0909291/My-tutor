# Teaching Blueprint: Partition (`math.found.partition`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.found.partition` |
| name | Partition |
| domain | Foundations |
| difficulty | developing |
| bloom | understand |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 3 |
| requires | `math.found.subset` |
| unlocks | `math.found.equivalence-relation` |
| cross_links | none |
| CPA_entry_stage | C (Concrete) — checking a specific collection of subsets against all three conditions before the general definition | 
| description (KG) | A partition of a set A is a collection of nonempty, pairwise disjoint subsets of A whose union equals A. |

## Component 1 — Learning Objectives

- LO1: Define a **partition** of $A$ as a collection of subsets (using `math.found.subset`'s $\subseteq$ relation) satisfying THREE conditions simultaneously: every subset is NONEMPTY, every pair of DISTINCT subsets is disjoint (shares no elements), and the UNION of all subsets equals $A$ exactly — and verify a given collection by checking all three.
- LO2: Correctly identify a collection that fails EACH condition separately: one containing an empty subset (violates nonemptiness), one whose blocks overlap even though their union still covers $A$ (violates pairwise disjointness), and recognize these are genuinely DIFFERENT failure modes, not interchangeable.
- LO3: Recognize that checking pairwise disjointness means checking EVERY pair of distinct subsets, not merely a convenient few — and connect this concept directly to `math.found.equivalence-relation`'s own Partition Theorem, which uses exactly this three-condition definition for the "partition" side of that theorem's two directions.

## Component 2 — Prerequisite Check

Assumes mastery of `math.found.subset` ($A\subseteq B$ iff every element of $A$ is also in $B$; the empty set is a subset of every set, vacuously).

## Component 3 — Core Explanation

**Three conditions, all required simultaneously**: a **partition** of a set $A$ is a collection of subsets of $A$ — call them "blocks" — satisfying ALL THREE of: (1) every block is NONEMPTY; (2) every two DISTINCT blocks are pairwise DISJOINT (their intersection is empty — no element belongs to two different blocks); (3) the UNION of all the blocks equals $A$ exactly (every element of $A$ belongs to some block). Verifying a partition means checking all three, not assuming one implies the others.

**Covering is not the same as partitioning**: a collection of subsets can have its union equal to $A$ (every element of $A$ is covered by SOME block) while still failing to be a partition, if two of those blocks OVERLAP (share an element). Covering (condition 3) and disjointness (condition 2) are genuinely independent requirements — satisfying one says nothing about the other.

**Checking disjointness means checking EVERY pair**: with $n$ blocks, there are $\binom{n}{2}$ distinct pairs to check for disjointness — checking only some of them (even most of them) and finding no overlap does not establish the collection is pairwise disjoint; a single overlapping pair, anywhere among all the possible pairs, disqualifies the whole collection from being a partition.

## Component 4 — Worked Examples

**Example 1 (LO1 — verifying a genuine partition)**: For $A=\{1,2,3,4,5,6\}$, the collection $\{1,2\},\{3,4\},\{5,6\}$: all three blocks are nonempty ✓; checking ALL $\binom{3}{2}=3$ pairs — $\{1,2\}\cap\{3,4\}=\varnothing$, $\{1,2\}\cap\{5,6\}=\varnothing$, $\{3,4\}\cap\{5,6\}=\varnothing$ — all disjoint ✓; union $\{1,2\}\cup\{3,4\}\cup\{5,6\}=\{1,2,3,4,5,6\}=A$ ✓. All three conditions hold — a genuine partition.

**Example 2 (LO2 — covering A but failing disjointness, breaking MC-1)**: For the same $A$, the collection $\{1,2,3\},\{3,4,5\},\{5,6\}$: the union is $\{1,2,3,4,5,6\}=A$ — every element IS covered. But checking pairs: $\{1,2,3\}\cap\{3,4,5\}=\{3\}\ne\varnothing$ — an OVERLAP. Despite fully covering $A$, this collection is **NOT** a partition, since it fails pairwise disjointness.

**Example 3 (LO2/LO3 — an empty block, and the need to check every pair, breaking MC-2 and MC-3)**: For $A=\{1,2,3,4\}$, the collection $\{1,2\},\{3,4\},\varnothing$: the first two blocks are nonempty and disjoint, and the union (ignoring $\varnothing$, which contributes nothing) is $A$ — but $\varnothing$ itself is NOT a nonempty set, so this collection **fails** the nonemptiness condition outright, regardless of the other two conditions. Separately, for $A=\{1,2,3,4,5,6\}$, the collection $\{1,2\},\{3,4\},\{4,5,6\}$: checking the pair $(\{1,2\},\{3,4\})$ gives disjoint ✓; checking $(\{1,2\},\{4,5,6\})$ gives disjoint ✓ — a student stopping here (having checked 2 of the 3 possible pairs) might wrongly conclude the collection is pairwise disjoint. But the THIRD pair, $(\{3,4\},\{4,5,6\})$, shares the element $4$ — an overlap that was never checked.

## Component 5 — Teaching Actions

### Teaching Action A01 — Three Conditions, Checked Together (Primitive P11: Representation Shift)

State: "a partition needs all three — nonempty blocks, every pair disjoint, and the union equal to the whole set. Verify all three, every time." Work Example 1's full three-condition check.

### Teaching Action A02 — Covering Is Not Partitioning (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: the collection's union genuinely covers all of $A$, yet it fails to be a partition because two blocks overlap. State: "covering every element and being pairwise disjoint are two SEPARATE conditions — satisfying one tells you nothing about the other."

- **MC-1 hook**: ask "if a collection of subsets' union covers all of A, is that enough to call it a partition?" — a "yes" answer reveals MC-1 (conflating covering with partitioning, missing the independent disjointness requirement).

### Teaching Action A03 — An Empty Block Disqualifies, and Every Pair Must Be Checked (Primitive P06: Contrast Pair)

Present Example 3's two sub-cases: the collection with an explicit $\varnothing$ block (fails nonemptiness immediately) and the collection where only 2 of 3 pairs were checked, missing the overlapping third pair. State: "an empty block is never allowed, no matter how the rest of the collection behaves — and 'checked most pairs, found no overlap' is not the same as 'checked every pair.'"

- **MC-2 hook**: ask "could a valid partition include an empty subset as one of its blocks?" — a "yes" answer reveals MC-2 (missing the explicit nonemptiness requirement).
- **MC-3 hook**: ask "if I check a few pairs of blocks and find no overlap, have I confirmed the whole collection is pairwise disjoint?" — a "yes" answer reveals MC-3 (sampling pairs rather than checking every single one).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Verify whether $\{1,3,5\},\{2,4,6\}$ is a partition of $A=\{1,2,3,4,5,6\}$, checking all three conditions.
  2. Determine whether $\{1,2\},\{2,3\},\{4,5,6\}$ is a partition of $A=\{1,2,3,4,5,6\}$, identifying specifically which condition fails, if any.
  3. Determine whether $\{1,2,3\},\varnothing,\{4,5,6\}$ is a partition of $A=\{1,2,3,4,5,6\}$, identifying which condition fails.
  4. For a collection of 4 blocks, state how many distinct pairs must be checked for pairwise disjointness, and explain why checking fewer is insufficient.
- **P76 (Transfer Probe, mode = independence)**: "A university divides its students into course sections, requiring that (i) no section is empty, (ii) no student is enrolled in two sections of the SAME course simultaneously, and (iii) every student in the course is assigned to some section. (a) Explain how these three university requirements correspond exactly to a partition's three conditions. (b) Suppose an administrative error causes one student to accidentally appear on two different sections' rosters for the same course — explain which partition condition this violates, and why the sections no longer form a genuine partition of the enrolled students. (c) Suppose instead a newly transferred student is not yet assigned to any section at all — explain which condition this violates."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | COVERING-CONFLATED-WITH-PARTITIONING | Believing a collection of subsets whose union covers the whole set is automatically a partition, missing the independent pairwise-disjointness requirement | Foundational |
| MC-2 | EMPTY-BLOCK-ASSUMED-ALLOWED-IN-PARTITION | Believing a partition can include an empty subset as one of its blocks, missing the explicit nonemptiness requirement | Foundational |
| MC-3 | PAIRWISE-DISJOINTNESS-CHECKED-BY-SAMPLING-PAIRS | Believing checking a few pairs of blocks for disjointness, without overlap, is sufficient to confirm the whole collection is pairwise disjoint | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Covering Conflated with Partitioning") → P41 (detect: ask a student whether a union-covering collection is automatically a partition, and check for a "yes") → P64 (conceptual shift: re-walk Example 2's overlapping-but-covering collection, re-anchoring on "covering and disjointness are separate conditions — check both, independently").
- **B02 (targets MC-2)**: P27 (name it: "Empty Block Assumed Allowed in Partition") → P41 (detect: ask a student whether a partition could include an empty block, and check for a "yes") → P64 (conceptual shift: re-walk Example 3's explicit $\varnothing$-block case, re-anchoring on "every single block must be nonempty — no exceptions").
- **B03 (targets MC-3)**: P27 (name it: "Pairwise Disjointness Checked by Sampling Pairs") → P41 (detect: ask a student to verify pairwise disjointness for a collection and check whether they stop after checking only some pairs) → P64 (conceptual shift: re-walk Example 3's second sub-case, showing the unchecked third pair conceals an overlap, re-anchoring on "every distinct pair must be checked — stopping early can hide exactly the overlap that matters").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.found.subset` (the $\subseteq$ relation this concept's blocks are built from).
- **Unlocks**: `math.found.equivalence-relation` (already authored — see the production-order note below; that concept's own Partition Theorem uses exactly this three-condition definition on its "partition" side).
- **Cross-link**: KG lists no cross-links for this concept.
- **Production-order note**: `math.found.equivalence-relation` was authored earlier in this corpus (batch 102) than this concept, despite being this concept's own KG `unlocks` target — production order in this corpus follows the ROI-ranked topological schedule (gated only by `requires`, not `unlocks` order), matching the precedent already recorded for `math.alg.system-3var`/`math.linalg.row-reduction`, `math.calc.vector-fields`/`math.calc.line-integrals`, and `math.geom.dot-product`/`math.linalg.inner-product-space`. That concept's own Example 2 already worked through the relation-to-partition and partition-to-relation directions informally; this concept now supplies the precise three-condition checklist those informal arguments assumed.

## Component 8 — Teaching Notes

- estimated_hours = 3 with a developing/understand tag places this at a "3 TAs + gate" tier, appropriately compact given the concept's genuinely small scope — one three-part definition and two common failure modes, no heavy computation.
- Examples 1 and 2 were deliberately built as a near-identical pair (both on $A=\{1,2,3,4,5,6\}$, differing only in whether the blocks overlap) to make MC-1's "covering isn't partitioning" lesson as stark as possible with minimal extra complexity, matching this corpus's established near-identical-pair technique.
- This concept directly supplies the missing three-condition definition that `math.found.equivalence-relation` (already authored, batch 102) informally used when discussing its own Partition Theorem — Component 7 documents this backward-filling connection explicitly, following the same pattern established when `math.top.open-sets` fulfilled `math.real.open-sets`' own anticipated cross-link.

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
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: specific collection checked against all three conditions before the general definition) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO2/LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
