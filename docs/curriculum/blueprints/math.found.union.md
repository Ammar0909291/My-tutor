# Teaching Blueprint: Union (`math.found.union`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.found.union` |
| name | Union |
| domain | Foundations |
| difficulty | foundational |
| bloom | apply |
| mastery_threshold | 0.90 → MAMR = ⌈0.90×5⌉ = 5/5 |
| estimated_hours | 1 |
| requires | `math.found.set-operations` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) — the shaded-region view from `math.found.set-operations`'s A01 is reused directly |
| description (KG) | The union A ∪ B is the set of all elements belonging to A, to B, or to both. |
| related | `math.found.intersection` |
| aliases | set union, A ∪ B |

## Component 1 — Learning Objectives

- LO1: Compute $A\cup B$ for given finite sets, listing each element that appears in $A$, in $B$, or in both, exactly once.
- LO2: State and apply the property that $A\cup B$ always contains at least as many elements as $A$ alone (or $B$ alone), never fewer.
- LO3: Recognize $A\cup B=A\cup B$ regardless of whether $A,B$ overlap, share no elements, or one is a subset of the other — computing correctly across all three configurations.

## Component 2 — Prerequisite Check

Assumes mastery of `math.found.set-operations` (the four-operation family this concept isolates union from) — this entry deepens practice specifically on union in isolation.

## Component 3 — Core Explanation

The **union** of sets $A$ and $B$, written $A\cup B$, is the set of all elements in $A$, in $B$, or in both: $A\cup B=\{x : x\in A \text{ or } x\in B\}$. Crucially, an element belonging to BOTH $A$ and $B$ is listed only ONCE in the union (sets have no notion of multiplicity, per `math.found.set-equality`) — union does not "double count" shared elements.

## Component 4 — Worked Examples

**Example 1 (LO1 — overlapping sets)**: $A=\{1,2,3\}$, $B=\{3,4,5\}$. $A\cup B=\{1,2,3,4,5\}$ — the shared element 3 appears only once, not twice.

**Example 2 (LO3 — disjoint sets, breaking MC-1)**: $A=\{1,2\}$, $B=\{5,6\}$ (no shared elements). $A\cup B=\{1,2,5,6\}$, with exactly $|A|+|B|=4$ elements — this is the ONE special case where union's size is a simple sum; it does not generalize to overlapping sets (Example 1's union has $5$ elements, not $3+3=6$, because the shared element 3 isn't double-counted).

**Example 3 (LO3 — one set a subset of the other)**: $A=\{1,2\}$, $B=\{1,2,3,4\}$ (here $A\subseteq B$). $A\cup B=\{1,2,3,4\}=B$ — the union equals the LARGER set exactly, since $A$ contributes nothing new.

## Component 5 — Teaching Actions

### Teaching Action A01 — List Each Element Once, From Either Set (Primitive P64: Conceptual Shift)

Work Example 1, explicitly narrating the "no double-counting" rule while combining the lists: "write down every element from $A$; then add any elements from $B$ not already written."

- **MC-1 hook**: give Example 1's sets and ask the student to predict $|A\cup B|$ before computing; check whether they answer $|A|+|B|=6$ (revealing MC-1: assuming union size is always the sum of the two set sizes, ignoring shared elements).

### Teaching Action A02 — Disjoint vs. Overlapping vs. Subset Configurations (Primitive P06: Contrast Pair)

Work Examples 2 and 3 side by side against Example 1: disjoint sets (union size = sum), a subset relationship (union = the larger set), and general overlap (union size = sum minus the overlap count). State the rule: "$|A\cup B|=|A|+|B|-|A\cap B|$ always — the overlap-sum shortcut (Example 2) is just the special case where $|A\cap B|=0$."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.90×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Compute $A\cup B$ for $A=\{2,4,6,8\}$, $B=\{4,8,12\}$.
  2. Compute $|A\cup B|$ for two disjoint sets of sizes 5 and 7, without listing elements.
  3. Given $A\subseteq B$, state $A\cup B$ in terms of $B$ alone, and justify.
  4. Given $|A|=6$, $|B|=8$, $|A\cap B|=3$, compute $|A\cup B|$ using the general formula.
- **P76 (Transfer Probe, mode = independence)**: "Two mailing lists, one for 'Newsletter subscribers' (1{,}200 people) and one for 'Event RSVPs' (800 people), have 250 people in common. (a) Using this lesson's union concept, compute the total number of DISTINCT people across both lists combined. (b) Explain why simply adding $1{,}200+800=2{,}000$ would overcount the true total, connecting your answer to the overlap-subtraction rule from this lesson."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | UNION-SIZE-ASSUMED-EQUAL-TO-SUM-OF-SIZES | Computing $|A\cup B|$ as $|A|+|B|$ unconditionally, ignoring that shared elements are counted only once | Foundational |
| MC-2 | SHARED-ELEMENT-LISTED-TWICE-IN-UNION | When explicitly listing $A\cup B$'s elements, writing a shared element down twice instead of once | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Union Size Assumed Equal to Sum") → P41 (detect: ask the student to predict $|A\cup B|$ before computing for an overlapping pair; check for a simple-sum answer) → P64 (conceptual shift: re-walk Example 1, counting the union's actual elements and comparing against the naive sum).
- **B02 (targets MC-2)**: P27 ("Shared Element Listed Twice") → P41 (detect: review a submitted union listing for a repeated entry) → P64 (conceptual shift: reuse `math.found.set-equality`'s "no multiplicity" rule by direct reference, re-listing the union with each element appearing once).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.found.set-operations`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.found.intersection` (the paired operation this concept's overlap-subtraction formula directly involves).

## Component 8 — Teaching Notes

- estimated_hours = 1 reflects that this concept isolates and deepens ONE of the four operations already introduced in `math.found.set-operations`, rather than presenting new machinery.
- MC-1 was ranked foundational because the union-size formula $|A\cup B|=|A|+|B|-|A\cap B|$ (the inclusion-exclusion principle's simplest case) recurs throughout combinatorics; an unchecked naive-sum habit here propagates directly into later miscounting errors.
- Only 2 misconceptions are registered (fewer than most entries in this batch) because this concept's scope — isolating union from the already-taught operations family — is narrower than concepts introducing genuinely new machinery.

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
| V-15 | CPA_entry_stage justified | PASS (Pictorial, reused from set-operations) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO3, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
