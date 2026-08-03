# Teaching Blueprint: Stirling Numbers (`math.disc.stirling-numbers`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.disc.stirling-numbers` |
| name | Stirling Numbers |
| domain | Discrete Mathematics |
| difficulty | expert |
| bloom | analyze |
| mastery_threshold | 0.70 → MAMR = ⌈0.70×5⌉ = 4/5 |
| estimated_hours | 5 |
| requires | `math.disc.combinations`, `math.disc.recurrence-relation` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) — hand-partitioned sets and cycle diagrams before symbolic recurrences |
| description (KG) | S(n,k) [second kind]: number of partitions of [n] into k non-empty subsets. s(n,k) [first kind (unsigned)]: number of permutations of [n] with k cycles. Connections to Bell numbers and rising/falling factorials.

 |

## Component 1 — Learning Objectives

- LO1: Compute the Stirling numbers of the SECOND kind $S(n,k)$ (partitions of an $n$-set into $k$ non-empty unordered subsets) for small cases, using the recurrence $S(n,k)=k\cdot S(n-1,k)+S(n-1,k-1)$.
- LO2: Compute the (unsigned) Stirling numbers of the FIRST kind $s(n,k)$ (permutations of $n$ elements with exactly $k$ cycles) for small cases, using the recurrence $s(n,k)=(n-1)\cdot s(n-1,k)+s(n-1,k-1)$.
- LO3: Distinguish the two kinds structurally — second-kind partitions are UNORDERED groupings with NO internal structure within each group, while first-kind cycles have a specific CYCLIC ORDER within each group — and correctly identify which kind a given counting problem calls for.

## Component 2 — Prerequisite Check

Assumes mastery of `math.disc.combinations` (used within the derivation logic) and `math.disc.recurrence-relation` (both kinds of Stirling numbers are naturally defined via recurrences).

## Component 3 — Core Explanation

**Stirling numbers of the second kind**, $S(n,k)$, count the number of ways to partition a set of $n$ labeled elements into exactly $k$ NON-EMPTY, UNORDERED subsets (no subset is distinguished from another by position or order — only by membership). Recurrence: $S(n,k)=k\cdot S(n-1,k)+S(n-1,k-1)$ — the $n$-th element either joins one of the existing $k$ subsets (in $k$ ways, from a $(n-1,k)$-partition) or forms its OWN new subset (from an $(n-1,k-1)$-partition).

**Stirling numbers of the first kind** (unsigned), $s(n,k)$, count the number of PERMUTATIONS of $n$ elements that decompose into exactly $k$ disjoint CYCLES. Recurrence: $s(n,k)=(n-1)\cdot s(n-1,k)+s(n-1,k-1)$ — the $n$-th element either gets INSERTED into one of the existing cycles (in $n-1$ ways, one for each possible position after an existing element) of an $(n-1,k)$-permutation, or forms its OWN new 1-cycle (from an $(n-1,k-1)$-permutation).

The two kinds are connected to the BELL NUMBERS (total partitions of any size, $B_n=\sum_kS(n,k)$) and to rising/falling factorials, though those connections extend beyond this concept's core scope.

## Component 4 — Worked Examples

**Example 1 (LO1 — second-kind computation)**: Compute $S(4,2)$ (partitions of $\{1,2,3,4\}$ into 2 non-empty subsets). By the recurrence: $S(4,2)=2\cdot S(3,2)+S(3,1)$. Using $S(3,2)=3$ (known small value) and $S(3,1)=1$ (only one way to put everything in one subset): $S(4,2)=2\times3+1=7$. Verify by direct enumeration: the 7 partitions are $\{1\},\{2,3,4\}$; $\{2\},\{1,3,4\}$; $\{3\},\{1,2,4\}$; $\{4\},\{1,2,3\}$; $\{1,2\},\{3,4\}$; $\{1,3\},\{2,4\}$; $\{1,4\},\{2,3\}$ — exactly 7.

**Example 2 (LO2, LO3 — first-kind computation, distinguishing from second kind, breaking MC-1)**: Compute $s(3,2)$ (permutations of $\{1,2,3\}$ with exactly 2 cycles). By definition: a permutation with 2 cycles on 3 elements must be one 2-cycle plus one fixed point (1-cycle) — e.g. $(1\,2)(3)$ means swap 1 and 2, fix 3. There are 3 such permutations (choosing which single element is the fixed point: $(1\,2)(3)$, $(1\,3)(2)$, $(2\,3)(1)$), so $s(3,2)=3$. Note this happens to equal $S(3,2)=3$ as well (a coincidence at this small size, NOT a general pattern) — a common error assumes $S(n,k)=s(n,k)$ generally because they can match for small cases, when in fact the two counts diverge for larger $n,k$ (e.g. $S(4,2)=7$ computed in Example 1, while $s(4,2)=11$ — genuinely different, since cycle structure allows more distinct arrangements than plain unordered partitioning).

**Example 3 (LO3 — the structural distinction, why cycles allow more arrangements)**: For a 3-element subset $\{a,b,c\}$ forming ONE group: in the second-kind sense (unordered subset), there is exactly $1$ way — the elements simply belong together, no internal structure. In the first-kind sense (one cycle), there are $2$ distinct cyclic orderings: $(a\,b\,c)$ and $(a\,c\,b)$ (representing "$a\to b\to c\to a$" versus "$a\to c\to b\to a$") — genuinely different permutations, since cyclic ORDER matters for permutations but not for plain set partitions. This is precisely why $s(n,k)\ge S(n,k)$ in general — cycles carry strictly more structural information than bare unordered groupings.

## Component 5 — Teaching Actions

### Teaching Action A01 — Second-Kind Recurrence: Join Existing or Start New (Primitive P64: Conceptual Shift)

Work Example 1 in full, explicitly narrating the recurrence's two cases (element $n$ joins one of $k$ existing subsets, OR starts a new one) before computing, then verify against direct enumeration for the small case.

### Teaching Action A02 — First Kind vs. Second Kind: Cycles Carry Extra Structure (Primitive P06: Contrast Pair)

Work Example 3's direct comparison — one group of 3 elements has 1 unordered-partition arrangement but 2 distinct cyclic arrangements — grounding WHY the two Stirling-number families genuinely differ, not just superficially. State the rule: "second-kind partitions only care about WHICH elements are grouped together; first-kind cycles additionally care about the ORDER within each cycle — this is why cycle counts are always at least as large as partition counts."

- **MC-1 hook**: present Example 2's small-case coincidence ($S(3,2)=s(3,2)=3$) immediately followed by the larger $S(4,2)=7$ vs. $s(4,2)=11$ divergence, directly testing whether the small-case equality is (incorrectly) generalized.

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.70×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Compute $S(4,3)$ using the second-kind recurrence, given $S(3,3)=1$ and $S(3,2)=3$.
  2. Compute $s(4,3)$ using the first-kind recurrence, given $s(3,3)=1$ and $s(3,2)=3$.
  3. Given a set $\{1,2,3,4\}$ partitioned as $\{1,2\},\{3,4\}$, state whether this represents a second-kind partition, a first-kind cycle structure, or could represent either interpretation depending on context — and explain your reasoning.
  4. Explain, in one sentence, why $s(n,k)\ge S(n,k)$ always holds, using the cycle-vs-partition structural distinction.
- **P76 (Transfer Probe, mode = independence)**: "A scheduling problem asks: 'in how many ways can 5 distinct tasks be assigned to exactly 3 identical (unlabeled) work teams, with every team getting at least one task?' A SEPARATE problem asks: 'in how many ways can 5 distinct tasks be arranged into exactly 3 cyclic processing loops, where each loop processes its assigned tasks in a specific repeating order?' (a) Identify which Stirling-number kind (first or second) applies to EACH of these two problems, justifying your choice using this lesson's structural distinction. (b) Explain why the two problems, despite both involving '5 tasks into 3 groups,' would generally have DIFFERENT numerical answers."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | FIRST-AND-SECOND-KIND-STIRLING-NUMBERS-CONFLATED | Assuming $S(n,k)=s(n,k)$ generally (based on small-case coincidental equality), missing that cycle counts and partition counts genuinely diverge for larger $n,k$ | Foundational |
| MC-2 | RECURRENCE-COEFFICIENT-CONFUSED-BETWEEN-THE-TWO-KINDS | Using the wrong multiplicative coefficient (mixing up $k$ from the second-kind recurrence with $n-1$ from the first-kind recurrence) | Foundational |
| MC-3 | PARTITION-COUNTED-WITH-INTERNAL-ORDER | When computing a second-kind partition count, mistakenly distinguishing internally-ordered arrangements within a subset, effectively over-counting as if computing a first-kind (cycle) count instead | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("First and Second Kind Stirling Numbers Conflated") → P41 (detect: present the $S(4,2)=7$ vs. $s(4,2)=11$ divergence and check whether the student expected them to match) → P64 (conceptual shift: re-walk Example 3's direct structural comparison, showing exactly why cycle order adds genuinely more distinct arrangements).
- **B02 (targets MC-2)**: P27 ("Recurrence Coefficient Confused Between the Two Kinds") → P41 (detect: review a submitted recurrence computation for the wrong coefficient — $k$ vs. $n-1$) → P64 (conceptual shift: re-derive each recurrence's coefficient from its combinatorial meaning — "$k$ existing subsets to join" vs. "$n-1$ possible insertion positions in existing cycles" — rather than treating them as interchangeable numbers).
- **B03 (targets MC-3)**: P27 ("Partition Counted with Internal Order") → P41 (detect: review a submitted second-kind partition enumeration for duplicate-seeming entries that differ only by internal ordering) → P64 (conceptual shift: re-verify against Example 1's direct enumeration, confirming each listed partition is counted exactly once regardless of any internal arrangement).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.disc.combinations`, `math.disc.recurrence-relation`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.disc.catalan-numbers` (a sibling "named combinatorial sequence" concept sharing the same two prerequisites); Bell numbers (mentioned in the KG description as a further connection, not authored as a separate entry in this batch).

## Component 8 — Teaching Notes

- estimated_hours = 5, difficulty = expert, and mastery_threshold = 0.70 (the lowest in this batch alongside `math.disc.egf`) reflect that distinguishing two structurally similar but genuinely distinct number families is a demanding conceptual task appropriately weighted toward understanding over flawless computational speed.
- MC-1 was ranked most severe because the two Stirling-number families' small-case numerical coincidences (as in Example 2) actively mislead students into a false generalization that only breaks down at slightly larger values — a genuinely deceptive pattern requiring explicit, deliberate correction rather than one that self-reveals through ordinary practice.
- The scheduling transfer probe was deliberately designed with two SIDE-BY-SIDE problems differing only in whether groups are "identical unlabeled teams" (second kind) or "cyclic processing loops with internal order" (first kind), directly testing LO3's structural-identification skill on genuinely parallel but distinct scenarios.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.disc.combinations`, `math.disc.recurrence-relation`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.70×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: partitioned sets/cycle diagrams before recurrences) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2/LO3, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
