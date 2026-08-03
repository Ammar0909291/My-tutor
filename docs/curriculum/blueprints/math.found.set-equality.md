# Teaching Blueprint: Set Equality (`math.found.set-equality`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.found.set-equality` |
| name | Set Equality |
| domain | Foundations |
| difficulty | foundational |
| bloom | understand |
| mastery_threshold | 0.90 → MAMR = ⌈0.90×5⌉ = 5/5 |
| estimated_hours | 1 |
| requires | `math.found.subset` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | Two sets A and B are equal (A = B) if and only if they have exactly the same elements: A ⊆ B and B ⊆ A. |
| related | `math.found.subset` |
| aliases | equal sets |

## Component 1 — Learning Objectives

- LO1: State the definition of set equality: $A=B$ if and only if $A\subseteq B$ AND $B\subseteq A$ (the "double subset" or antisymmetry argument).
- LO2: Prove two sets are equal by explicitly demonstrating both subset directions, rather than by informal visual comparison.
- LO3: Recognize that set equality is unaffected by the order elements are listed in, or by repeated listing of the same element.

## Component 2 — Prerequisite Check

Assumes mastery of `math.found.subset` ($\subseteq$) — set equality is DEFINED in terms of subset-hood applied in both directions, not as an independent primitive notion.

## Component 3 — Core Explanation

Two sets $A$ and $B$ are **equal**, written $A=B$, exactly when they contain the same elements — formally, $A\subseteq B$ AND $B\subseteq A$. This "double subset" (antisymmetric) definition is the standard PROOF TECHNIQUE for establishing set equality: rather than trying to "see" that two sets match, one proves each containment direction separately, often via two small direct arguments.

A direct consequence: sets are unordered and without multiplicity — $\{1,2,3\}=\{3,2,1\}=\{1,1,2,2,3\}$, since all three describe exactly the same collection of distinct elements, regardless of listing order or repetition.

## Component 4 — Worked Examples

**Example 1 (LO1, LO2 — the double-subset proof technique)**: Prove $\{x : x^2=4\}=\{-2,2\}$. Direction 1 ($\subseteq$): if $x^2=4$, then $x=2$ or $x=-2$ (solving the equation), so $x\in\{-2,2\}$. Direction 2 ($\supseteq$): if $x\in\{-2,2\}$, then $x=2$ (giving $x^2=4$) or $x=-2$ (giving $x^2=4$), so $x^2=4$. Both directions hold, so the sets are equal. $\blacksquare$

**Example 2 (LO3 — order and repetition don't matter, breaking MC-1)**: Are $\{a,b,c\}$ and $\{c,a,b,b\}$ equal? Checking elements: the first has elements $a,b,c$; the second, despite listing $b$ twice and in a different order, ALSO has exactly the elements $a,b,c$ (repetition doesn't create a "second" $b$; a set either contains an element or doesn't, with no notion of count). So yes, $\{a,b,c\}=\{c,a,b,b\}$.

**Example 3 (LO2 — a case where only one direction initially seems obvious, breaking MC-2)**: A student claims "$\{n : n \text{ is a multiple of } 6\} = \{n : n \text{ is a multiple of both } 2 \text{ and } 3\}$" by checking only that every multiple of 6 is a multiple of 2 and 3 (one direction). The PROOF is incomplete without also verifying the reverse: every number that is a multiple of BOTH 2 and 3 is in fact a multiple of 6 (true here, but this requires its own argument — e.g. via the least common multiple — not automatic from the first direction alone).

## Component 5 — Teaching Actions

### Teaching Action A01 — Prove Both Subset Directions Separately (Primitive P64: Conceptual Shift)

Work Example 1 in full, explicitly labeling "Direction 1" and "Direction 2" as two separate sub-arguments, each a small direct proof in its own right, concluding only once BOTH are established.

- **MC-1 hook**: present Example 3's one-directional argument and ask whether the equality claim is fully proved (revealing MC-1: treating a demonstrated single subset direction as sufficient evidence of full set equality).

### Teaching Action A02 — Order and Repetition Are Irrelevant to Set Content (Primitive P06: Contrast Pair)

Work Example 2, contrasting the LISTED representations (different order, one repeated element) against the actual SET CONTENT (identical: $\{a,b,c\}$ either way). State the rule: "a set is defined entirely by WHICH elements it contains, never by how many times or in what order they are written down."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.90×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Prove $\{x : x \text{ is even and } x \text{ is between } 1 \text{ and } 9\}=\{2,4,6,8\}$ using the double-subset technique.
  2. Determine whether $\{1,2,2,3\}=\{1,2,3\}$, justifying via the "no multiplicity" property of sets.
  3. Given only the claim "every multiple of 4 is a multiple of 2" (one direction only), state whether this alone proves "$\{$multiples of 4$\}=\{$multiples of 2$\}$," and if not, provide a specific counterexample showing the sets are actually different (e.g. $6$ is a multiple of 2 but not 4).
  4. Determine whether $\{\{1,2\}\}=\{1,2\}$ (a set containing one element, itself a 2-element set, vs. a 2-element set of numbers), explaining the type distinction.
- **P76 (Transfer Probe, mode = independence)**: "A school registrar defines Set $R$ = 'students enrolled in both Chemistry and Physics' and Set $S$ = 'students enrolled in the combined Science-Honors track.' A colleague claims $R=S$ after checking that every Science-Honors student takes both Chemistry and Physics. (a) Explain, using the double-subset technique from this lesson, what ADDITIONAL check is still needed before the equality claim $R=S$ is fully justified. (b) Describe what specific evidence (in terms of a hypothetical student) would show the claim is FALSE if the missing direction does not hold."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | ONE-DIRECTION-TREATED-AS-SUFFICIENT-FOR-EQUALITY | Proving only $A\subseteq B$ (or only $B\subseteq A$) and concluding full set equality without establishing the reverse containment | Foundational |
| MC-2 | REPEATED-ELEMENT-COUNTED-AS-MULTIPLE-ENTRIES | Treating $\{a,b,b\}$ as somehow "larger" or different from $\{a,b\}$ due to the repeated listing | Foundational |
| MC-3 | NESTED-SET-CONFUSED-WITH-ITS-CONTENTS | Confusing a set containing one set as its element (e.g. $\{\{1,2\}\}$) with the contents of that inner set directly (e.g. $\{1,2\}$) | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("One Direction Treated as Sufficient") → P41 (detect: present Example 3's incomplete argument and ask if the equality is fully proved) → P64 (conceptual shift: require the student to explicitly construct or attempt the missing reverse-direction argument before accepting the claim).
- **B02 (targets MC-2)**: P27 ("Repeated Element Counted as Multiple Entries") → P41 (detect: present $\{1,2,2,3\}$ vs. $\{1,2,3\}$ and check for a claimed inequality) → P64 (conceptual shift: re-walk Example 2, restating that set membership is binary — an element either is or isn't in the set, with no notion of "how many times").
- **B03 (targets MC-3)**: P27 ("Nested Set Confused with Its Contents") → P41 (detect: ask for the number of elements in $\{\{1,2\}\}$; check for the answer "2" instead of "1") → P64 (conceptual shift: reuse `math.found.empty-set`'s $\emptyset$ vs. $\{\emptyset\}$ contrast by direct analogy — count only the outermost braces' contents).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.found.subset`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.found.subset` (equality is literally defined as mutual subset-hood), `math.found.empty-set` (its nested-set contrast is reused by reference in B03).

## Component 8 — Teaching Notes

- estimated_hours = 1 matches the other small set-theory refinements in this domain wave (`math.found.empty-set`, `math.found.proper-subset`); the concept's genuine difficulty lies entirely in LO1/LO2's proof TECHNIQUE, not in any computational complexity.
- MC-1 was ranked most severe because the double-subset technique is the single most commonly reused proof PATTERN across the rest of this domain (and much of later set-theoretic mathematics) — a student who accepts one-directional evidence as sufficient will systematically under-prove equality claims throughout the curriculum.
- The multiples-of-4-vs-2 example (P77 item 3) was deliberately chosen as a case where the ONE proved direction is TRUE but the claim overall is FALSE, specifically to make MC-1's danger concrete: partial evidence can support a false conclusion just as easily as a true one.

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
