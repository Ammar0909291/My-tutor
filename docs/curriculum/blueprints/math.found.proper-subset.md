# Teaching Blueprint: Proper Subset (`math.found.proper-subset`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.found.proper-subset` |
| name | Proper Subset |
| domain | Foundations |
| difficulty | foundational |
| bloom | understand |
| mastery_threshold | 0.90 → MAMR = ⌈0.90×5⌉ = 5/5 |
| estimated_hours | 1 |
| requires | `math.found.subset` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | A set A is a proper subset of B if A ⊆ B and A ≠ B, i.e., B contains at least one element not in A. |
| related | `math.found.subset` |
| aliases | strict subset, ⊂ |

## Component 1 — Learning Objectives

- LO1: Define $A$ as a proper subset of $B$ ($A\subset B$) when $A\subseteq B$ AND $A\ne B$, i.e. $B$ has at least one element not in $A$.
- LO2: Given two sets, correctly determine whether $A\subseteq B$ (subset, possibly equal), $A\subset B$ (proper — strictly smaller), or neither.
- LO3: Recognize that every set is a subset of itself ($A\subseteq A$) but NO set is a proper subset of itself ($A\not\subset A$).

## Component 2 — Prerequisite Check

Assumes mastery of `math.found.subset` ($\subseteq$, which allows equality) — this concept adds the strict, equality-excluding variant.

## Component 3 — Core Explanation

$A$ is a **proper subset** of $B$, written $A\subset B$, if $A\subseteq B$ (every element of $A$ is in $B$) AND $A\ne B$ (they are not the identical set) — equivalently, $B$ contains at least one element NOT in $A$. This is the strict analog of $<$ (as opposed to $\le$) for numbers: $\subseteq$ permits equality, $\subset$ forbids it.

Consequence: $A\subseteq A$ always holds (trivially, every element of $A$ is in $A$), but $A\subset A$ NEVER holds for any set $A$ — a set can never be strictly smaller than itself.

## Component 4 — Worked Examples

**Example 1 (LO1, LO2 — proper vs. non-proper)**: Let $A=\{1,2\}$, $B=\{1,2,3\}$, $C=\{1,2\}$. $A\subseteq B$ and $A\ne B$ (3 is in $B$ but not $A$), so $A\subset B$ — proper. $A\subseteq C$, but $A=C$ (identical sets), so $A\subseteq C$ holds while $A\subset C$ does NOT.

**Example 2 (LO3 — no set is a proper subset of itself, breaking MC-1)**: Is $\{1,2,3\}\subset\{1,2,3\}$ true? Checking the definition: $\{1,2,3\}\subseteq\{1,2,3\}$ holds (every element is trivially in the same set), but $\{1,2,3\}\ne\{1,2,3\}$ is FALSE (they are identical) — so the second required condition fails, and $\{1,2,3\}\subset\{1,2,3\}$ is FALSE. This holds for every set: equality always blocks the "proper" (strict) relation.

**Example 3 (LO2 — the empty set as a proper subset, edge case)**: Is $\emptyset\subset\{1,2\}$? $\emptyset\subseteq\{1,2\}$ holds (vacuously, per `math.found.empty-set`), and $\emptyset\ne\{1,2\}$ (they are clearly different sets), so both conditions hold — YES, $\emptyset$ is a proper subset of any non-empty set.

## Component 5 — Teaching Actions

### Teaching Action A01 — Two Conditions: Subset AND Not-Equal (Primitive P64: Conceptual Shift)

Work Example 1's two comparisons side by side, checking BOTH conditions explicitly each time (subset check, then equality check) rather than jumping to a conclusion from one alone.

- **MC-1 hook**: ask "is $\{1,2,3\}$ a proper subset of itself?" and observe whether the student answers yes because "every element is contained" without checking the equality condition (revealing MC-1: verifying only the $\subseteq$ half of the definition and forgetting the $\ne$ requirement).

### Teaching Action A02 — $\subseteq$ Permits Equality; $\subset$ Forbids It (Primitive P06: Contrast Pair)

Directly contrast the numeric analogy: "$\le$ is to $<$ as $\subseteq$ is to $\subset$." Walk Example 1's $A\subseteq C$ (true, since $A=C$) vs. $A\subset C$ (false, for the same pair) side by side. State the rule: "whenever the two sets could be identical, always check equality explicitly before claiming the PROPER (strict) relation."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.90×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. For $A=\{a,b,c\}$, $B=\{a,b,c,d\}$, determine whether $A\subset B$, justifying via both conditions.
  2. Determine whether $\{1,2\}\subset\{2,1\}$ (same elements, different listed order) is true, and explain using set equality (order doesn't matter for sets).
  3. State whether $\emptyset\subset\emptyset$ is true, and justify.
  4. Given a set $A$ with 5 elements, state how many DISTINCT proper subsets $A$ has, contrasted with how many subsets (including $A$ itself) it has — connect to $2^5$ if the student has this tool, otherwise simply confirm "one fewer than the total subset count, since $A$ itself is excluded."
- **P76 (Transfer Probe, mode = independence)**: "A company's 'Premium' membership tier grants every benefit that the 'Basic' tier grants, plus at least one additional benefit Basic does not have. (a) Using this lesson's proper-subset concept, express the relationship between Basic's benefit set and Premium's benefit set using $\subset$ notation, and explain why $\subseteq$ alone would not capture the intended relationship. (b) If a future 'Elite' tier is introduced with EXACTLY the same benefits as Premium (no more, no fewer), explain why Premium's benefit set would then be a subset, but NOT a proper subset, of Elite's."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | EQUALITY-CONDITION-OMITTED-FROM-PROPER-SUBSET-CHECK | Verifying only the $\subseteq$ condition and concluding "proper subset" without separately checking $A\ne B$ | Foundational |
| MC-2 | SET-ORDER-MISTAKEN-FOR-INEQUALITY | Believing two sets listed in different orders (e.g. $\{1,2\}$ vs. $\{2,1\}$) are unequal, leading to an incorrect "proper subset" classification | Moderate |
| MC-3 | PROPER-SUBSET-COUNT-CONFUSED-WITH-SUBSET-COUNT | Failing to subtract the one case ($A$ itself) when counting proper subsets versus all subsets of a given set | Minor |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Equality Condition Omitted") → P41 (detect: present Example 2's self-comparison and check whether the student verifies equality separately from subset-hood) → P64 (conceptual shift: re-walk Example 2, explicitly marking the equality check as a required second step, not optional).
- **B02 (targets MC-2)**: P27 ("Set Order Mistaken for Inequality") → P41 (detect: present $\{1,2\}$ vs. $\{2,1\}$ and ask if they're equal) → P64 (conceptual shift: reiterate set equality's definition — same elements, order irrelevant — from `math.found.set-equality`, if authored, or restate directly here).
- **B03 (targets MC-3)**: P27 ("Proper Subset Count Confused with Subset Count") → P41 (detect: ask for the proper-subset count of a 3-element set and check whether the answer matches the total subset count instead of one less) → P64 (conceptual shift: enumerate all subsets of a small set explicitly, marking the one identical to the original set as excluded from the proper-subset list).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.found.subset`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.found.subset` (the non-strict relation this concept sharpens), `math.found.empty-set` (Example 3 reuses its vacuous-subset result by reference).

## Component 8 — Teaching Notes

- estimated_hours = 1 mirrors `math.found.empty-set`'s allocation — both are small, sharply-defined refinements of an already-mastered parent concept (`math.found.subset`, `math.found.set`, respectively).
- MC-1 was ranked most severe because it represents an incomplete application of a two-part definition — a pattern that recurs throughout mathematics (any "AND"-joined definition invites checking only the more salient half) and is worth correcting explicitly and early.
- Example 3 (the empty set as a proper subset of any non-empty set) was included specifically to reuse `math.found.empty-set`'s vacuous-truth result by direct reference, rather than re-deriving it, per the corpus's cross-blueprint reuse convention.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.found.subset`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.90×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO3, Ex3→LO2) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
