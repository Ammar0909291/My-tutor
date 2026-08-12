# Teaching Blueprint: Finite Set (`math.found.finite-set`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.found.finite-set` |
| name | Finite Set |
| domain | Foundations |
| difficulty | foundational |
| bloom | understand |
| mastery_threshold | 0.90 → MAMR = ⌈0.90×5⌉ = 5/5 |
| estimated_hours | 1 |
| requires | `math.found.cardinality` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | A set whose elements can be counted using a finite natural number; equivalently, one that is in bijection with {1, 2, …, n} for some n ∈ ℕ. |
| related | `math.found.countable-set` |
| aliases | bounded set |

## Component 1 — Learning Objectives

- LO1: Define a **finite set** as one whose elements can be counted with a natural number $n$, equivalently one in bijection with $\{1,2,\ldots,n\}$.
- LO2: Determine whether a given set (described explicitly, by a formula, or by a bounding condition) is finite, and if so, state its exact size $n$.
- LO3: Recognize that $\emptyset$ is finite (with $n=0$), and that a finite set's size $n$ is always a well-defined, unique natural number.

## Component 2 — Prerequisite Check

Assumes mastery of `math.found.cardinality` (the general notion of "size" for a set) — finiteness is the property that makes cardinality directly countable by an ordinary natural number.

## Component 3 — Core Explanation

A set $A$ is **finite** if there exists some natural number $n$ (including $n=0$) such that $A$ can be placed in **bijection** with $\{1,2,\ldots,n\}$ — i.e. its elements can be labeled $1$ through $n$ with no repeats and none left out. This $n$ is then called $A$'s cardinality, $|A|=n$, and is uniquely determined (no set is simultaneously in bijection with both $\{1,\ldots,n\}$ and $\{1,\ldots,m\}$ for $n\ne m$).

Any set that is NOT finite is called **infinite** — this concept's direct complement, explored further in `math.found.countable-set` and `math.found.uncountable-set`.

## Component 4 — Worked Examples

**Example 1 (LO1, LO2 — a direct finite set)**: $A=\{$vowels in the English alphabet$\}=\{a,e,i,o,u\}$. This is finite with $|A|=5$, since a bijection to $\{1,2,3,4,5\}$ exists (label each vowel $1$ through $5$ in any fixed order).

**Example 2 (LO3 — the empty set is finite, breaking MC-1)**: Is $\emptyset$ finite? Yes — take $n=0$: $\emptyset$ is (vacuously) in bijection with $\{1,\ldots,0\}$, which is itself the empty list of numbers (there are no numbers from 1 to 0). So $|\emptyset|=0$, and $\emptyset$ is finite, not some special "neither finite nor infinite" exception.

**Example 3 (LO2 — a set defined by a condition, requiring care to determine finiteness)**: Is $\{n\in\mathbb{Z} : n^2<50\}$ finite? Checking: $n^2<50$ holds for $n=-7,-6,\ldots,6,7$ (since $7^2=49<50$ but $8^2=64>50$), giving exactly 15 integers. This set IS finite, with $|A|=15$ — despite being defined by an algebraic CONDITION rather than an explicit list, it is still bounded and countable.

## Component 5 — Teaching Actions

### Teaching Action A01 — Finiteness via Bijection to {1,...,n} (Primitive P64: Conceptual Shift)

Work Example 1, explicitly constructing the labeling bijection (vowel 1 = $a$, vowel 2 = $e$, etc.) to make the abstract "bijection with $\{1,\ldots,n\}$" definition concrete as ordinary counting.

- **MC-1 hook**: ask "is the empty set finite, infinite, or neither?" and observe whether the student hesitates or answers "neither" (revealing MC-1: treating $\emptyset$ as a special exception outside the finite/infinite classification, rather than recognizing it as finite with $n=0$).

### Teaching Action A02 — A Condition-Defined Set Can Still Be Finite (Primitive P06: Contrast Pair)

Contrast Example 1 (an explicitly listed finite set) against Example 3 (a set defined by an algebraic condition, requiring active work to determine both finiteness and exact size) to show that finiteness must sometimes be ESTABLISHED through reasoning, not simply read off an explicit list. State the rule: "when a set is defined by a condition rather than listed directly, check whether the condition actually bounds the possible elements before assuming finiteness either way."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.90×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. State $|A|$ for $A=\{$days of the week$\}$, and describe the bijection to $\{1,\ldots,7\}$.
  2. Determine whether $\{n\in\mathbb{N} : n^2<100\}$ is finite, and if so, state its exact size.
  3. State whether $\{\emptyset\}$ (the set containing the empty set as its one element) is finite, and give its size (distinguishing this from $\emptyset$ itself, per `math.found.empty-set`).
  4. Explain why $\{n\in\mathbb{Z} : n>5\}$ is NOT finite, describing what goes wrong when attempting to bound it with any single $n$.
- **P76 (Transfer Probe, mode = independence)**: "A librarian is cataloging 'all books in the library published before the year 1500.' (a) Explain, using this lesson's definition, why this set is finite even without knowing its exact size in advance — what property of the defining condition (publication before a fixed year, from a physical, bounded collection) guarantees finiteness. (b) Contrast this with 'all possible titles a book published before 1500 COULD have had' — explain why this second set, despite sounding similarly bounded by the same year condition, is not actually finite, connecting your reasoning to what makes a condition genuinely bound a set's size."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | EMPTY-SET-TREATED-AS-NEITHER-FINITE-NOR-INFINITE | Believing $\emptyset$ falls outside the finite/infinite classification rather than recognizing it as finite with size 0 | Foundational |
| MC-2 | CONDITION-DEFINED-SET-ASSUMED-INFINITE-BY-DEFAULT | Assuming any set described by an algebraic condition (rather than an explicit list) must be infinite, without checking whether the condition actually bounds it | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Empty Set Treated as Neither Finite Nor Infinite") → P41 (detect: ask directly whether $\emptyset$ is finite, infinite, or neither) → P64 (conceptual shift: re-walk Example 2, confirming the bijection to $\{1,\ldots,0\}$ — the empty numeric range — genuinely exists).
- **B02 (targets MC-2)**: P27 ("Condition-Defined Set Assumed Infinite by Default") → P41 (detect: present Example 3's condition-defined set and ask whether it's finite before working through it) → P64 (conceptual shift: re-derive the bound explicitly, showing $n^2<50$ genuinely restricts $n$ to a finite range).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.found.cardinality`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.found.countable-set` (the next concept in this domain wave, which builds on the finite/infinite distinction established here), `math.found.empty-set` (P77 item 3 directly reuses its $\emptyset$ vs. $\{\emptyset\}$ distinction).

## Component 8 — Teaching Notes

- estimated_hours = 1 reflects that this concept is primarily classificatory, building directly on the already-mastered general notion of cardinality from `math.found.cardinality`.
- MC-1 was ranked most severe because the empty set recurs as a boundary case across nearly every set-theoretic concept in this domain, and mishandling it here would compound with `math.found.empty-set`'s own registered misconceptions rather than resolving them.
- Example 3's algebraic-condition set was deliberately included specifically to set up `math.found.countable-set`'s harder cases (e.g. $\mathbb{Z}$, defined by a condition yet genuinely infinite), previewing that condition-defined sets require active reasoning about boundedness either way.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.found.cardinality`) |
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
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO3, Ex3→LO2) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
