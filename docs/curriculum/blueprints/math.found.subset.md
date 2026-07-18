# Teaching Blueprint: Subset (`math.found.subset`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.found.subset` |
| name | Subset |
| domain | Foundations |
| difficulty | foundational |
| bloom | understand |
| mastery_threshold | 0.9 → MAMR = ⌈0.9×5⌉ = 5/5 |
| estimated_hours | 2 |
| requires | `math.found.set-membership` |
| unlocks | `math.found.set-operations`, `math.found.power-set` |
| cross_links | none |
| CPA_entry_stage | C (Concrete) — nested physical collections before symbol ⊆ |
| description (KG) | A set A is a subset of B (A ⊆ B) if every element of A is also an element of B. |

## Component 1 — Learning Objectives

- LO1: Define $A\subseteq B$ ("A is a subset of B") as: **every element of A is also an element of B**, and determine, given two explicit sets, whether one is a subset of the other.
- LO2: Correctly distinguish $A\subseteq B$ (subset — a relation between two sets) from $x\in A$ (membership — a relation between an object and a set), directly building on the distinction already established in `math.found.set-membership`.
- LO3: Recognize two special cases: (i) **every set is a subset of itself** ($A\subseteq A$ always holds), and (ii) **the empty set is a subset of every set** ($\emptyset\subseteq B$ for any $B$, vacuously true since there are no elements of $\emptyset$ to fail the condition).

## Component 2 — Prerequisite Check

Assumes mastery of `math.found.set-membership` (the ∈ relation and, critically, the already-taught distinction between an object being "in" a set versus a set being "contained in" another set — MC-1 from that blueprint, "ELEMENT-SUBSET-CONFUSION," is the exact misconception this concept now formally resolves by giving ⊆ its own precise definition).

## Component 3 — Core Explanation

$A$ is a **subset** of $B$, written $A\subseteq B$, if **every element of $A$ is also an element of $B$** — formally: $\forall x, (x\in A \Rightarrow x\in B)$.

**Subset is a relation between two sets** (unlike membership, ∈, which relates an object to a set). Given $A=\{2,4\}$ and $B=\{1,2,3,4,5\}$: is $A\subseteq B$? Check every element of $A$: is $2\in B$? Yes. Is $4\in B$? Yes. Since *every* element of $A$ passed the check, $A\subseteq B$.

**Two special cases worth memorizing**:
1. **$A\subseteq A$ always** — every element of $A$ is (trivially) an element of $A$ itself.
2. **$\emptyset\subseteq B$ for every set $B$** — this is **vacuously true**: the defining condition "every element of $\emptyset$ is also in $B$" has no elements to check at all (since $\emptyset$ has none), so the condition can never be violated, no matter what $B$ is.

**Subset vs. membership, precisely**: for $A=\{1,2,3\}$, both $2\in A$ (2 is an element of A) and $\{2\}\subseteq A$ (the set containing just 2 is a subset of A) are true statements — but they say *different* things, using *different* relations (∈ relates an object to a set; ⊆ relates a set to a set), even though they can look superficially similar when discussing the same underlying number.

## Component 4 — Worked Examples

**Example 1 (LO1 — checking subset directly)**: Let $A=\{a,c\}$, $B=\{a,b,c,d\}$. Is $A\subseteq B$? Check: $a\in B$? Yes. $c\in B$? Yes. All elements of $A$ checked and pass → $A\subseteq B$.

**Example 2 (LO1 — a non-example)**: Let $C=\{1,5\}$, $D=\{1,2,3,4\}$. Is $C\subseteq D$? Check: $1\in D$? Yes. $5\in D$? **No**. Since not every element of $C$ is in $D$, $C\not\subseteq D$.

**Example 3 (LO2/LO3 — membership vs. subset, and the two special cases, breaking MC-1)**: Let $A=\{1,2,3\}$. Is $2\in A$? Yes (2 is an element). Is $\{2\}\subseteq A$? Yes (every element of $\{2\}$, namely just 2, is in $A$) — this is a *different* true statement using a different relation. Is $A\subseteq A$? Yes (trivially, every element of A is in A). Is $\emptyset\subseteq A$? Yes (vacuously — there's nothing in $\emptyset$ to fail the check).

## Component 5 — Teaching Actions

### Teaching Action A01 — Checking Subset Element-by-Element (Primitive P11: Representation Shift)

Start concrete: "Box A has a pencil and an eraser. Box B has a pencil, an eraser, a ruler, and a marker. Is everything in Box A also somewhere in Box B?" — check each item in Box A against Box B's contents, confirming yes for both. State: "this is exactly what $A\subseteq B$ means — check every element of A, one at a time, against B."

Shift to set notation: work Example 1 ($A=\{a,c\}\subseteq B=\{a,b,c,d\}$) and Example 2 (a non-example, $C\not\subseteq D$ because of one failing element) side by side, emphasizing that a SINGLE failing element is enough to make the subset claim false.

- **MC-1 hook**: ask "is $2 \in \{1,2,3\}$ the same statement as $\{2\}\subseteq\{1,2,3\}$?" — an answer of "yes, they're the same thing" reveals MC-1 (continuing to conflate membership and subset even after the prerequisite concept flagged this distinction, now with the formal ⊆ symbol in play).

### Teaching Action A02 — The Two Special Cases (Primitive P06: Contrast Pair)

**Contrast 1 (targets MC-2, self-subset)**: Ask "is $A\subseteq A$ true, for any set A?" before revealing the answer — walk through the definition directly: "every element of A — is it in A? Yes, trivially." State clearly: "every set is always a subset of itself; this isn't a special exception, it falls straight out of the definition."

**Contrast 2 (targets MC-3, vacuous truth for the empty set)**: Ask "is $\emptyset\subseteq\{1,2,3\}$ true or false?" — a common instinct is to hesitate because "there's nothing to check." State the resolution explicitly: "the definition asks 'does every element of $\emptyset$ appear in $\{1,2,3\}$?' — since $\emptyset$ has ZERO elements, there is nothing that could possibly fail this check, so the statement is TRUE by default (vacuously). This is a genuine, standard convention in mathematics — not a trick or an exception, but a direct consequence of how 'for every element of A...' works when A is empty."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Let $A=\{3,6,9\}$, $B=\{1,3,5,6,7,9\}$. Is $A\subseteq B$? Justify by checking each element.
  2. Let $C=\{2,4,6\}$, $D=\{2,4,8\}$. Is $C\subseteq D$? If not, identify which element fails.
  3. Is $\{5\}\subseteq\{5,10,15\}$ true? Separately, is $5\in\{5,10,15\}$ true? Explain why both can be true statements despite using different relations.
  4. Explain, using the definition of ⊆ directly (not just as a memorized fact), why $\emptyset\subseteq A$ for every set A, no matter what A contains.
- **P76 (Transfer Probe, mode = independence)**: "A school's 'Honor Roll' list is a subset of the full 'Enrolled Students' list — every honor roll student must also be an enrolled student (though not every enrolled student is on the honor roll). (a) If the Honor Roll list is $H=\{\text{Ana, Ben, Cid}\}$ and the Enrolled Students list is $E=\{\text{Ana, Ben, Cid, Dee, Eli}\}$, verify directly (element by element) that $H\subseteq E$. (b) A new student club opens with literally zero members yet (an empty set). Using this lesson's vacuous-truth reasoning, explain why this empty club's membership set is automatically a subset of the Enrolled Students list, even before anyone joins."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | MEMBERSHIP-SUBSET-STILL-CONFLATED | Continuing to treat $x\in A$ and $\{x\}\subseteq A$ as the identical statement even after the formal ⊆ definition is introduced (a persistence of the prerequisite concept's own MC-1) | Foundational |
| MC-2 | SELF-SUBSET-DISBELIEVED | Believing a set cannot be a subset of itself, or treating $A\subseteq A$ as a special/exceptional case rather than a direct consequence of the definition | Moderate |
| MC-3 | EMPTY-SET-SUBSET-DISBELIEVED | Believing $\emptyset\subseteq B$ is false, or uncertain/undefined, rather than recognizing it as vacuously true by the definition | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Persistent Membership/Subset Conflation") → P41 (detect: ask whether $3\in\{1,2,3\}$ and $\{3\}\subseteq\{1,2,3\}$ are "the same statement" — a "yes" reveals MC-1) → P64 (conceptual shift: re-anchor on "∈ relates an OBJECT to a set; ⊆ relates a SET to a set — wrapping the object in braces creates a genuinely different kind of thing, a one-element set, which is what ⊆ then compares").
- **B02 (targets MC-2)**: P27 (name it: "Self-Subset Disbelief") → P41 (detect: ask directly whether $A\subseteq A$ for a specific set A) → P64 (conceptual shift: walk through the definition mechanically — every element of A is trivially an element of A, so the condition is automatically satisfied).
- **B03 (targets MC-3)**: P27 (name it: "Empty-Set Subset Disbelief") → P41 (detect: ask whether $\emptyset\subseteq\{1,2,3\}$, watching for hesitation or an incorrect "false"/"undefined" answer) → P64 (conceptual shift: re-derive via vacuous truth — the condition "every element of $\emptyset$ is in the other set" has no elements to check, so it cannot be violated, making the statement true by the definition's own logic, not by special exception).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.found.set-membership` (the ∈ relation this concept's ⊆ definition is built directly on top of, and whose own MC-1 — element/subset conflation — this concept is specifically designed to finally resolve with a precise ⊆ definition).
- **Unlocks**: `math.found.set-operations` (union, intersection, and complement are defined and reasoned about using subset relationships), `math.found.power-set` (the power set of A is literally the set of all subsets of A — this concept's definition is the power set's entire content).
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 2 with a foundational/understand tag places this at the corpus's smallest sizing tier, matching its own prerequisite `math.found.set-membership`'s sizing — 2 main TAs (A01, A02) with no separate composite TA, since the concept is a single relation (⊆) plus two special-case facts that follow directly from its definition, not independent additional content.
- MC-1 in this blueprint's registry is explicitly the SAME underlying confusion as MC-1 in `math.found.set-membership`'s own registry, deliberately kept as a separate tracked entry here (not merged or assumed resolved) — because introducing the formal ⊆ symbol is exactly the moment this specific confusion tends to resurface with new notation, even for learners who handled the prerequisite concept's informal element-vs-subset distinction correctly.
- Both special cases (self-subset, empty-set-subset) were given Contrast-Pair treatment in the SAME teaching action (A02) rather than split into two TAs, since both are best taught as "surprising-sounding claims resolved by careful direct application of the definition" — the same pedagogical move applied twice, not two independently different ideas.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.found.set-membership`) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.9×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: nested box example before symbol) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO1, Ex3→LO2/LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
