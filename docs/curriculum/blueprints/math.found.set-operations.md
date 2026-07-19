# Teaching Blueprint: Set Operations (`math.found.set-operations`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.found.set-operations` |
| name | Set Operations |
| domain | Foundations |
| difficulty | foundational |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 5 |
| requires | `math.found.subset` |
| unlocks | `math.found.venn-diagram`, `math.disc.boolean-circuits` |
| cross_links | `math.disc.boolean-circuits` (**not yet authored** — verified via `ls`; P76_mode = independence, see Component 7) |
| CPA_entry_stage | P (Pictorial) — overlapping circles before symbolic operations |
| description (KG) | The standard operations on sets — union (∪), intersection (∩), difference (\), and complement (Aᶜ) — forming a Boolean algebra. |

## Component 1 — Learning Objectives

- LO1: Compute the **union** ($A\cup B$ = elements in $A$ OR $B$, or both), **intersection** ($A\cap B$ = elements in BOTH $A$ AND $B$), and **difference** ($A\setminus B$ = elements in $A$ but NOT in $B$) of two given sets.
- LO2: Compute the **complement** $A^c$ (elements of a universal set $U$ NOT in $A$) relative to a specified universal set, and correctly recognize that the complement is only well-defined once a universal set $U$ is fixed.
- LO3: Apply combinations of these operations in a specified order (e.g. $(A\cup B)\cap C$ vs. $A\cup(B\cap C)$), and correctly distinguish operations that give the SAME result regardless of grouping from those that genuinely depend on the order/grouping applied.

## Component 2 — Prerequisite Check

Assumes mastery of `math.found.subset` (⊆, and by extension the general facility with set membership this concept's operations directly build on).

## Component 3 — Core Explanation

Given sets $A,B$ (both subsets of some universal set $U$):

- **Union** $A\cup B = \{x : x\in A \text{ or } x\in B\}$ — everything in EITHER set (including things in both).
- **Intersection** $A\cap B = \{x: x\in A \text{ and } x\in B\}$ — only things in BOTH sets simultaneously.
- **Difference** $A\setminus B = \{x : x\in A \text{ and } x\notin B\}$ — things in $A$ with $B$'s elements specifically removed.
- **Complement** $A^c = \{x\in U : x\notin A\}$ — everything in the universal set $U$ that's NOT in $A$. **Crucially, the complement depends on which universal set $U$ is being used** — the same set $A$ can have a completely different complement depending on what $U$ is taken to be.

Together with these four operations, sets form a **Boolean algebra** — an algebraic structure obeying specific laws (e.g. De Morgan's laws: $(A\cup B)^c = A^c\cap B^c$, and $(A\cap B)^c=A^c\cup B^c$), which parallel the logical operations OR/AND/NOT directly (reflecting sets-as-conditions and elements-as-things-satisfying-conditions).

**Order and grouping**: union and intersection are each individually associative ($(A\cup B)\cup C = A\cup(B\cup C)$, similarly for $\cap$) — so grouping among the SAME operation doesn't matter. But MIXING operations, the grouping generally DOES matter: $(A\cup B)\cap C$ is generally different from $A\cup(B\cap C)$ — parentheses genuinely change the result when different operations are combined, exactly as with arithmetic's own order-of-operations concerns.

## Component 4 — Worked Examples

**Example 1 (LO1 — union, intersection, difference)**: $A=\{1,2,3,4\}$, $B=\{3,4,5,6\}$. $A\cup B=\{1,2,3,4,5,6\}$. $A\cap B=\{3,4\}$. $A\setminus B=\{1,2\}$ (elements of $A$ not in $B$). Note: $B\setminus A=\{5,6\}$ — genuinely different from $A\setminus B$, confirming difference is NOT symmetric.

**Example 2 (LO2 — complement depends on the universal set, breaking MC-1)**: Let $A=\{2,4,6\}$. If $U=\{1,2,\ldots,10\}$, then $A^c=\{1,3,5,7,8,9,10\}$. But if instead $U=\{2,4,6,8,10\}$ (just the even numbers up to 10), then $A^c=\{8,10\}$ — a COMPLETELY different (and much smaller) complement, using the exact same set $A$, purely because the universal set changed.

**Example 3 (LO3 — grouping matters when mixing operations, breaking MC-2)**: Let $A=\{1,2\}$, $B=\{2,3\}$, $C=\{3,4\}$. Compute $(A\cup B)\cap C$: $A\cup B=\{1,2,3\}$, then $\cap C=\{1,2,3\}\cap\{3,4\}=\{3\}$. Now compute $A\cup(B\cap C)$: $B\cap C=\{3\}$, then $A\cup\{3\}=\{1,2,3\}$. The two results — $\{3\}$ versus $\{1,2,3\}$ — are genuinely DIFFERENT, confirming that mixing $\cup$ and $\cap$ makes grouping matter, unlike using either operation alone repeatedly.

## Component 5 — Teaching Actions

### Teaching Action A01 — Union, Intersection, Difference via Overlapping Circles (Primitive P11: Representation Shift)

Draw two overlapping circles (a basic Venn-diagram sketch, without yet naming it formally — that's the next concept). Shade the ENTIRE combined region for union, the OVERLAP only for intersection, and one circle MINUS the overlap for difference (doing this for both directions, $A\setminus B$ and $B\setminus A$, to show they differ). State the plain-language rule for each: "union: everything in either. Intersection: only the shared part. Difference: what's left in one after removing anything shared with the other."

Shift to symbolic set-builder notation and work Example 1's numeric computation directly.

- **MC-1 hook**: ask "what is $A^c$ for $A=\{2,4,6\}$?" without specifying a universal set — watch whether the student attempts to answer without asking "complement relative to WHAT universal set?", revealing MC-1 (treating complement as well-defined without reference to a specified universal set).

### Teaching Action A02 — Complement Requires a Universal Set, and Grouping with Mixed Operations (Primitive P06: Contrast Pair)

**Contrast 1 (targets MC-1)**: Work Example 2's two different complements of the SAME set $A=\{2,4,6\}$, one relative to $U=\{1,\ldots,10\}$, one relative to $U=\{2,4,6,8,10\}$ — landing on genuinely different answers. State the rule: "complement is ALWAYS relative to a specific universal set — always ask 'complement of what, within what?' before computing."

**Contrast 2 (targets MC-2)**: Work Example 3's two groupings of $\cup$ and $\cap$ mixed together, landing on $\{3\}$ vs. $\{1,2,3\}$ — genuinely different results. State the rule explicitly: "using the SAME operation repeatedly (just unions, or just intersections), grouping never changes the answer — that's associativity. But mixing DIFFERENT operations, exactly like mixing addition and multiplication in arithmetic, means the parentheses/order genuinely change the result — always respect the given grouping."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. $A=\{a,b,c,d\}$, $B=\{c,d,e,f\}$. Find $A\cup B$, $A\cap B$, $A\setminus B$, and $B\setminus A$.
  2. Given $A=\{1,3,5,7,9\}$ and $U=\{1,2,\ldots,9\}$, find $A^c$. Separately, find $A^c$ if instead $U=\{1,3,5,7,9,11,13\}$ (a different universal set).
  3. Let $A=\{1,2,3\}$, $B=\{2,3,4\}$, $C=\{4,5\}$. Compute $A\cap(B\cup C)$ and $(A\cap B)\cup C$, and confirm whether the two groupings give the same or different results.
  4. Verify De Morgan's law $(A\cup B)^c=A^c\cap B^c$ directly for $A=\{1,2\}$, $B=\{2,3\}$, $U=\{1,2,3,4\}$, by computing both sides independently and comparing.
- **P76 (Transfer Probe, mode = independence)**: "A hospital's patient database tags patients with conditions using sets: $D=\{$patients with diabetes$\}$, $H=\{$patients with hypertension$\}$, all within the universal set $U=\{$all currently admitted patients$\}$. (a) Describe, in words, what $D\cap H$, $D\cup H$, and $D\setminus H$ each represent about the patient population. (b) The hospital later opens a new wing, changing the relevant universal set $U$ to include newly admitted patients not previously tracked — explain, using this lesson's complement rule, why the complement $D^c$ (patients WITHOUT diabetes) must be recomputed relative to the new $U$, even though the set $D$ itself hasn't changed at all." *Component 7 note: this scenario was chosen independently rather than cross-linking to `math.disc.boolean-circuits`, since that blueprint does not yet exist.*
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | COMPLEMENT-COMPUTED-WITHOUT-UNIVERSAL-SET | Attempting to compute or discuss $A^c$ without first identifying/fixing a specific universal set $U$ | Foundational |
| MC-2 | MIXED-OPERATION-GROUPING-ASSUMED-IRRELEVANT | Believing parentheses/grouping never matter when combining set operations, over-generalizing from the (correct) associativity of a single repeated operation to mixed operations | Foundational |
| MC-3 | DIFFERENCE-ASSUMED-SYMMETRIC | Believing $A\setminus B = B\setminus A$ in general, not recognizing set difference as order-dependent (asymmetric) | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Complement Without Universal Set") → P41 (detect: ask for $A^c$ without a stated $U$, checking whether the student asks for clarification or proceeds anyway) → P64 (conceptual shift: work through Example 2's two different complements of the same $A$, demonstrating concretely that the answer genuinely depends on $U$).
- **B02 (targets MC-2)**: P27 (name it: "Mixed-Operation Grouping Overgeneralization") → P41 (detect: present $(A\cup B)\cap C$ and $A\cup(B\cap C)$ for specific sets and ask if they're equal) → P64 (conceptual shift: work through Example 3's explicit computation, showing the two groupings genuinely diverge — directly analogous to how $(2+3)\times4\neq2+(3\times4)$ in arithmetic).
- **B03 (targets MC-3)**: P27 (name it: "Difference Symmetry Assumption") → P41 (detect: ask whether $A\setminus B$ and $B\setminus A$ are the same set, for specific $A,B$ with elements not shared) → P64 (conceptual shift: re-derive both directly from Example 1's numbers, showing $A\setminus B=\{1,2\}$ but $B\setminus A=\{5,6\}$ — genuinely different sets).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.found.subset` (the ⊆ relation, and the general set-comparison facility this concept's four operations build directly on).
- **Unlocks**: `math.found.venn-diagram` (Venn diagrams are the standard pictorial representation of exactly these four operations, formalizing the informal circle-sketches used in this concept's own A01), `math.disc.boolean-circuits` (Boolean circuits directly implement AND/OR/NOT gates, the logical parallel of intersection/union/complement introduced here).
- **Cross-link**: KG lists `math.disc.boolean-circuits` as a cross-link. Verified via directory listing that no blueprint yet exists at `docs/curriculum/blueprints/math.disc.boolean-circuits.md`. Per the established P76_mode rule, this blueprint uses **independence** mode. A future revision, once that concept is authored, may add a genuine cross-link probe connecting this concept's union/intersection/complement operations directly to OR/AND/NOT logic gates, and De Morgan's laws directly to standard circuit-simplification identities.

## Component 8 — Teaching Notes

- estimated_hours = 5 with a foundational/apply tag places this at the "2 main TAs + gate" tier — A01 (union/intersection/difference via overlapping circles) and A02 (the complement/universal-set contrast plus the mixed-operation-grouping contrast) jointly cover all three LOs.
- MC-1 (complement without a universal set) was given the most weight because it is the one operation, among the four introduced here, that behaves fundamentally differently from the other three — union, intersection, and difference are well-defined given just the two sets involved, while complement REQUIRES external context (the universal set) that the other three operations don't need, making it a natural point of oversight.
- The hospital patient-database transfer probe's part (b) — a changing universal set retroactively changing the complement of an unchanged set $D$ — was deliberately designed to test this exact universal-set dependency in a stakes-realistic setting, directly extending MC-1's correction into a scenario where getting it wrong (assuming $D^c$ is fixed once computed) would have genuine practical consequences.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.found.subset`) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.disc.boolean-circuits` confirmed absent → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: overlapping circles before symbolic operations) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
