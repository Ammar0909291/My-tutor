# Teaching Blueprint: Set Membership (`math.found.set-membership`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.found.set-membership` |
| name | Set Membership |
| domain | Foundations |
| difficulty | foundational |
| bloom | remember |
| mastery_threshold | 0.95 → MAMR = ⌈0.95×5⌉ = 5/5 |
| estimated_hours | 1 |
| requires | `math.found.set` |
| unlocks | `math.found.subset` |
| cross_links | none |
| CPA_entry_stage | C (Concrete) — physical/listed collections before symbol ∈ |
| description (KG) | The fundamental binary relation ∈ asserting that an object x is an element of a set A, written x ∈ A. |

## Component 1 — Learning Objectives

- LO1: Read and write the membership relation x ∈ A ("x is an element of A") and its negation x ∉ A, for a set A given by an explicit list of elements.
- LO2: Correctly evaluate membership: given a concrete set and a candidate object, determine whether the object is a *member* (element) of the set versus merely *related to* or *contained within* it in some other way.

## Component 2 — Prerequisite Check

Assumes mastery of `math.found.set` (a set as a well-defined, unordered collection of distinct objects). This concept introduces the single relation that lets us talk about sets element-by-element.

## Component 3 — Core Explanation

**Set membership** is the basic relation ∈ ("is an element of") linking an object to a set. If A = {2, 4, 6, 8}, we write:
$$4 \in A \quad \text{(read: "4 is an element of } A\text{")}$$
$$5 \notin A \quad \text{(read: "5 is not an element of } A\text{")}$$

∈ is a relation between an **object** and a **set** — never between two sets of the same "kind" in the way ⊆ (subset) is. This distinction matters: an object can be *a member of* a set, or a set can be *a subset of* another set, but these are two different relations (subset is covered in the next concept, `math.found.subset`).

Because sets are unordered and contain no duplicates (per `math.found.set`), membership does not depend on where an element "sits" or how many times it was listed: for A = {1, 2, 3}, both "1 ∈ A" and "3 ∈ A" are equally true regardless of the order elements were written in, and writing A = {1, 1, 2, 3} still describes the exact same set with the exact same membership facts.

A subtlety worth flagging at this level (informally, not requiring formal treatment yet): a set can itself be an element of another set. For example, if $B = \{1, \{2,3\}\}$, then $1 \in B$, and the *set* $\{2,3\}$ is also an element of B — written $\{2,3\} \in B$ — even though neither 2 nor 3 individually is an element of B.

## Component 4 — Worked Examples

**Example 1 (LO1/LO2 — basic evaluation)**: Let $A = \{\text{red, green, blue}\}$. Is "green" ∈ A? Yes — green appears explicitly as a listed element. Is "yellow" ∈ A? No, so "yellow" ∉ A.

**Example 2 (LO2 — element vs. subset, breaking MC-1)**: Let $A = \{1, 2, 3\}$. Is $2 \in A$? Yes — 2 is a single element listed in A. Is $\{2\} \in A$? **No** — $\{2\}$ is a *set containing 2*, not the number 2 itself, and A's elements are the bare numbers 1, 2, 3, not sets. ($\{2\}$ would instead be a *subset* of A, a different relation entirely.)

**Example 3 (LO2 — a set as an element, breaking MC-2)**: Let $B = \{1, \{2, 3\}\}$. Is $\{2,3\} \in B$? Yes — B's second element genuinely is the set $\{2,3\}$ itself, listed as one object among B's two elements. Is $2 \in B$? **No** — 2 is not itself one of B's two listed elements (its two elements are "1" and "the set $\{2,3\}$").

## Component 5 — Teaching Actions

### Teaching Action A01 — Reading and Evaluating ∈ (Primitive P11: Representation Shift)

Show a physical framing first: "Here's a basket containing an apple, a banana, and a pear." Shift to set notation: $A = \{\text{apple, banana, pear}\}$. Ask: "Is the apple ∈ A?" — point at the basket, then write $\text{apple} \in A$. Ask: "Is a grape ∈ A?" — "No, so we write $\text{grape} \notin A$." Repeat with $A = \{2,4,6,8\}$: is $6 \in A$? ($\checkmark$) Is $7 \in A$? (No, $7 \notin A$.)

Emphasize: order and repeated listing never change membership facts — $\{2,4,6,8\}$ and $\{8,6,4,2\}$ have identical membership answers for every possible object.

### Teaching Action A02 — Element vs. Set-as-Element (Primitive P06: Contrast Pair)

**Contrast 1 (targets MC-1, element vs. subset confusion)**: Given $A=\{1,2,3\}$, ask "Is $2 \in A$?" (yes) then immediately "Is $\{2\} \in A$?" (no — $\{2\}$ is a *set*, a different kind of object than the bare number 2, and A's elements are bare numbers). State clearly: "$x \in A$ asks whether $x$ itself is one of A's listed elements — wrapping $x$ in curly braces makes a different object, so the question changes."

**Contrast 2 (targets MC-2, disbelief that a set can be an element of another set)**: Given $B = \{1, \{2,3\}\}$, ask "How many elements does B have?" (Two: the number 1, and the set $\{2,3\}$ — not three.) Then ask "Is $\{2,3\} \in B$?" (Yes — genuinely, one of B's two elements *is* the set $\{2,3\}$.) This directly breaks the assumption that "elements of a set must be simple/atomic objects, never sets themselves."

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | ELEMENT-SUBSET-CONFUSION | Confusing $x \in A$ with $\{x\} \subseteq A$ (or writing $\{2\} \in A$ when $2 \in A$ is meant) | Foundational |
| MC-2 | SETS-CANNOT-BE-ELEMENTS | Disbelieving that a set can itself be an element of another set | Moderate |
| MC-3 | MEMBERSHIP-IS-ORDER-SENSITIVE | Treating membership as dependent on listed order or repeated listing (e.g. believing {1,1,2} "has 1 twice" as a fact about membership) | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Element/Subset Mixup") → P41 (detect: ask "is $\{2\} \in \{1,2,3\}$?" — an incorrect "yes" reveals MC-1) → P64 (conceptual shift: re-anchor on "∈ asks about a bare object being listed; wrapping in braces creates a different, new object").
- **B02 (targets MC-2)**: P27 (name it: "Sets-as-Elements Disbelief") → P41 (detect: ask how many elements $\{1, \{2,3\}\}$ has — an answer of 3 instead of 2 reveals MC-2) → P64 (conceptual shift: "a set is just an object like any other — it can be listed as one item inside another set").
- **B03 (targets MC-3)**: P27 (name it: "Order/Repetition Sensitivity") → P41 (detect: ask whether $\{1,2,3\}$ and $\{3,2,1,1\}$ have the same elements — a "no" reveals MC-3) → P64 (conceptual shift: re-derive from `math.found.set`'s own unordered/no-duplicates definition — membership facts don't change no matter how a set is written down).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.found.set` (the definition of a set as an unordered, duplicate-free collection is what makes membership well-defined and order/repetition-independent).
- **Unlocks**: `math.found.subset` (the very next concept, which builds the ⊆ relation directly on top of ∈: A⊆B is defined as "every element of A is also an element of B" — i.e., ∀x, x∈A ⟹ x∈B).
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 1 with a foundational/remember tag is the smallest sizing tier seen in this authoring pass: 2 main TAs (A01, A02) with **no separate composite/gate-adjacent TA** beyond the standard P91 mastery gate itself — the concept is a single relation with two teachable subtleties (basic evaluation, element-vs-set-as-element), not enough independent content to warrant a third main TA.
- MC-3 (order/repetition sensitivity) was deliberately not given its own teaching action, unlike MC-1/MC-2 — it is fully addressed by restating `math.found.set`'s already-taught unordered/duplicate-free definition (Component 3), so a dedicated new TA would duplicate prerequisite content rather than teach anything new; it is still tracked as a registry entry with its own repair action (B03) in case diagnostic evidence surfaces it at assessment time.
- The transfer probe route was scoped to plain independence given cross_links is empty in the KG — no fabricated cross-reference was introduced.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Mastery Gate and Validation

### P91 Mastery Gate (P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78)

- **P77 (4-problem set)**:
  1. Let $A = \{a, e, i, o, u\}$. Is $e \in A$? Is $b \in A$?
  2. Let $A = \{5, 10, 15\}$. Is $\{5\} \in A$? Is $5 \in A$?
  3. Let $B = \{7, \{8,9\}\}$. How many elements does B have, and is $8 \in B$?
  4. Explain why $\{1,2,3\}$ and $\{3,1,2,2\}$ have exactly the same membership facts for every object.
- **P76 (Transfer Probe, mode = independence)**: "A school's clubs list is $C = \{\text{Chess Club}, \{\text{Art Club, Music Club}\}\}$ — the second entry is itself a two-club sub-group treated as one bundled item. Is "Chess Club" ∈ C? Is the bundle {Art Club, Music Club} ∈ C? Is "Art Club" (alone) ∈ C? Explain each answer using the element/set-as-element distinction from this lesson."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action (B01/B02/B03) before re-attempting P77.

### Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 2 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.found.set`) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01, A02) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.95×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: basket/list examples before symbol) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO2, Ex3→LO2) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
