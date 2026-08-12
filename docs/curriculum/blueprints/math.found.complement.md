# Teaching Blueprint: Set Complement (`math.found.complement`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.found.complement` |
| name | Set Complement |
| domain | Foundations |
| difficulty | foundational |
| bloom | apply |
| mastery_threshold | 0.90 → MAMR = ⌈0.90×5⌉ = 5/5 |
| estimated_hours | 1 |
| requires | `math.found.set-operations` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) |
| description (KG) | The complement of A relative to a universal set U is the set of all elements of U not in A. |
| related | `math.found.set-difference` |
| aliases | absolute complement, Aᶜ, A' |

## Component 1 — Learning Objectives

- LO1: Compute $A^c$ (or $A'$) relative to a SPECIFIED universal set $U$, as $U\setminus A$.
- LO2: State and demonstrate that the same set $A$ can have genuinely different complements depending on which universal set $U$ is fixed.
- LO3: Apply De Morgan's laws — $(A\cup B)^c=A^c\cap B^c$ and $(A\cap B)^c=A^c\cup B^c$ — verifying both sides independently for a specific example.

## Component 2 — Prerequisite Check

Assumes mastery of `math.found.set-operations` (complement is the fourth operation named there) and builds directly on `math.found.set-difference`'s equivalence $A\setminus B=A\cap B^c$, now examined from the complement's own perspective.

## Component 3 — Core Explanation

The **complement** of $A$ relative to a fixed universal set $U$, written $A^c$ or $A'$, is $U\setminus A$ — every element of $U$ NOT in $A$. Unlike union, intersection, and difference (each defined from two given sets alone), complement REQUIRES a specified universal set to be well-defined at all — "$A^c$" without a stated $U$ is an incomplete question.

**De Morgan's laws** connect complement to union and intersection: $(A\cup B)^c=A^c\cap B^c$ (the complement of a union is the intersection of complements) and $(A\cap B)^c=A^c\cup B^c$ (the complement of an intersection is the union of complements).

## Component 4 — Worked Examples

**Example 1 (LO1, LO2 — the universal set changes the complement, breaking MC-1)**: Let $A=\{2,4,6\}$. With $U=\{1,2,\ldots,10\}$, $A^c=\{1,3,5,7,8,9,10\}$. With a DIFFERENT $U'=\{2,4,6,8,10\}$ (only even numbers to 10), $A^c=\{8,10\}$ — a completely different, much smaller set, for the exact same $A$, purely because $U$ changed.

**Example 2 (LO3 — De Morgan's law verified directly)**: $U=\{1,2,3,4,5\}$, $A=\{1,2\}$, $B=\{2,3\}$. LHS: $A\cup B=\{1,2,3\}$, so $(A\cup B)^c=\{4,5\}$. RHS: $A^c=\{3,4,5\}$, $B^c=\{1,4,5\}$, so $A^c\cap B^c=\{4,5\}$. Both sides equal $\{4,5\}$ — confirming $(A\cup B)^c=A^c\cap B^c$ for this case.

**Example 3 (LO1 — complement of the whole universal set)**: With $U=\{1,\ldots,10\}$, what is $U^c$? Every element of $U$ is (trivially) in $U$, so nothing is left outside — $U^c=\emptyset$. Similarly, $\emptyset^c=U$ (everything in $U$ is, vacuously, "not in $\emptyset$").

## Component 5 — Teaching Actions

### Teaching Action A01 — Complement Always Needs a Stated Universal Set (Primitive P64: Conceptual Shift)

Ask "what is $A^c$ for $A=\{2,4,6\}$?" WITHOUT specifying $U$, and observe whether the student attempts an answer or asks "relative to what universal set?" Then work Example 1's two different complements side by side.

- **MC-1 hook**: this IS the hook — the opening question itself detects whether the student treats complement as well-defined without a specified $U$ (revealing MC-1: attempting to compute $A^c$ without first fixing a universal set).

### Teaching Action A02 — Verify Both Sides of De Morgan's Law Independently (Primitive P11: Representation Shift)

Work Example 2, computing the LHS ($(A\cup B)^c$) and RHS ($A^c\cap B^c$) as two SEPARATE computations before comparing, rather than assuming the law and skipping verification — reinforcing that a stated law is confirmed by checking both sides genuinely match, not simply invoked as a slogan.

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.90×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Given $A=\{1,3,5,7,9\}$ and $U=\{1,2,\ldots,9\}$, compute $A^c$.
  2. For the same $A$ as item 1, compute $A^c$ if instead $U=\{1,3,5,7,9,11,13\}$, and confirm the answer differs from item 1's.
  3. Verify De Morgan's second law $(A\cap B)^c=A^c\cup B^c$ directly for $A=\{1,2,3\}$, $B=\{2,3,4\}$, $U=\{1,2,3,4,5\}$, computing both sides independently.
  4. State $U^c$ and $\emptyset^c$ for any universal set $U$, and justify both using the definition of complement.
- **P76 (Transfer Probe, mode = independence)**: "A streaming service defines $A$ = 'subscribers who watched a comedy this month,' within the universal set $U$ = 'all current subscribers.' (a) Describe, in words, what $A^c$ represents. (b) The service later expands to a new country, growing $U$ to include many new subscribers who haven't watched anything yet. Using this lesson's universal-set-dependency rule, explain why $A^c$ (computed relative to the new, larger $U$) is now a different, larger set than before, even though the set $A$ itself (comedy-watchers from the original subscriber base) hasn't changed."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | COMPLEMENT-COMPUTED-WITHOUT-UNIVERSAL-SET | Attempting to compute or discuss $A^c$ without first identifying/fixing a specific universal set $U$ | Foundational |
| MC-2 | DE-MORGANS-LAW-INVOKED-WITHOUT-VERIFICATION | Citing De Morgan's laws as a memorized slogan without checking, for a specific case, that both sides genuinely compute to the same set | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Complement Without Universal Set") → P41 (detect: the opening A01 question itself) → P64 (conceptual shift: walk Example 1's two different complements of the same $A$, demonstrating the answer genuinely depends on $U$).
- **B02 (targets MC-2)**: P27 ("De Morgan's Law Invoked Without Verification") → P41 (detect: ask the student to state De Morgan's first law, then separately ask them to compute both sides for a specific example; check whether they skip the independent computation) → P64 (conceptual shift: re-walk Example 2's side-by-side LHS/RHS computation).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.found.set-operations`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.found.set-difference` (its own $A\setminus B=A\cap B^c$ equivalence, established there by forward reference, is confirmed and reused here rather than re-derived).

## Component 8 — Teaching Notes

- estimated_hours = 1, matching this wave's other isolated-operation entries; MC-1 here is deliberately the SAME misconception already registered in `math.found.set-operations`'s own MC-1 — reused verbatim rather than restated with different wording, per the corpus's cross-blueprint reuse convention, since this concept is precisely where that misconception is most naturally exercised in isolation.
- MC-1 remains foundational for the same reason established in `math.found.set-operations`: complement is the one of the four core operations that genuinely requires EXTERNAL context (a universal set) that the other three don't need.
- Example 3 (complement of $U$ and of $\emptyset$) was included as a boundary-case check distinct from the two-universal-sets contrast (Example 1), confirming the definition holds consistently even at its extremes.

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
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO3, Ex3→LO1) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
