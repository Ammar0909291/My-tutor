# Teaching Blueprint: Equivalence Relation (`math.found.equivalence-relation`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.found.equivalence-relation` |
| name | Equivalence Relation |
| domain | Foundations |
| difficulty | developing |
| bloom | analyze |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 5 |
| requires | `math.found.reflexive-relation`, `math.found.symmetric-relation`, `math.found.transitive-relation` |
| unlocks | `math.found.equivalence-class`, `math.abst.quotient-group`, `math.nt.congruence` |
| cross_links | `math.nt.congruence`, `math.abst.quotient-group` |
| CPA_entry_stage | C (Concrete) — verifying all three properties for a specific relation before the general Partition Theorem |
| description (KG) | A relation that is reflexive, symmetric, and transitive, partitioning a set into disjoint equivalence classes. |

## Component 1 — Learning Objectives

- LO1: Define an **equivalence relation** as one satisfying ALL THREE of `math.found.reflexive-relation`, `math.found.symmetric-relation`, and `math.found.transitive-relation` SIMULTANEOUSLY, and verify a given relation by directly reusing each prerequisite's own established checking procedure in turn.
- LO2: State the **Partition Theorem** in both directions: an equivalence relation on $A$ partitions $A$ into disjoint **equivalence classes** $[a]=\{x\in A : x\sim a\}$ (with any two classes either completely identical or completely disjoint, never partially overlapping); and conversely, any partition of $A$ into disjoint blocks defines a valid equivalence relation by declaring elements related exactly when they lie in the same block.
- LO3: Recognize that missing even ONE of the three required properties breaks the entire equivalence relation — extending each prerequisite's own "for all, no partial credit" finding to the combined three-property case — and that a relation missing a property can produce inconsistent, ill-defined "classes" that fail to genuinely partition the set.

## Component 2 — Prerequisite Check

Assumes mastery of `math.found.reflexive-relation` ($(a,a)\in R$ for EVERY $a\in A$, checked universally not existentially), `math.found.symmetric-relation` ($(a,b)\in R\Rightarrow(b,a)\in R$ for all $a,b$, with a single missing mirror disproving symmetry entirely), and `math.found.transitive-relation` ($(a,b),(b,c)\in R\Rightarrow(a,c)\in R$, vacuously true when no chains exist).

## Component 3 — Core Explanation

**Equivalence relation: all three properties combined, no shortcuts**: a relation $R$ on $A$ is an **equivalence relation** exactly when it is reflexive AND symmetric AND transitive, all at once. Verifying this means running each prerequisite's OWN established procedure in turn — check every element has its self-pair (`math.found.reflexive-relation`), check every pair has its mirror (`math.found.symmetric-relation`), check every chain closes up (`math.found.transitive-relation`) — nothing new is invented for the checking process itself; the only new idea is that ALL THREE must hold together for the same relation.

**The Partition Theorem, in both directions**: given an equivalence relation $\sim$ on $A$, the **equivalence class** of $a$ is $[a]=\{x\in A : x\sim a\}$ — every element $\sim$-related to $a$. A foundational fact (following directly from the three properties together) is that any two equivalence classes $[a]$ and $[b]$ are either **completely identical** (if $a\sim b$) or **completely disjoint** (if not $a\sim b$) — partial overlap is impossible: if some element $z$ were in both $[a]$ and $[b]$, then $z\sim a$ and $z\sim b$, so by symmetry $a\sim z$, and by transitivity $a\sim z\sim b$ forces $a\sim b$, making the classes fully identical after all. Collecting the distinct classes therefore genuinely **partitions** $A$ into disjoint, exhaustive blocks. The CONVERSE also holds: given any partition of $A$ into disjoint blocks (covering all of $A$), declaring $x\sim y$ exactly when $x$ and $y$ lie in the SAME block automatically produces a genuine equivalence relation (reflexive: every element shares a block with itself; symmetric and transitive: both follow immediately from "same block as"). Equivalence relations and partitions are two views of the exact same structure.

**Missing one property breaks everything**: exactly as each prerequisite warned that a single counterexample disproves its own property entirely, a relation satisfying only TWO of the three properties (e.g. reflexive and symmetric, but not transitive) is **not** an equivalence relation at all — not "close" to one, and its "would-be classes" need not behave consistently: an element can appear to belong with two different, non-overlapping-looking groups simultaneously, with no well-defined single class to assign it to, since the disjoint-or-identical guarantee itself relied on all three properties holding together.

## Component 4 — Worked Examples

**Example 1 (LO1 — verifying all three properties)**: Let $A=\{1,2,3,4\}$ and $R=\{(a,b): a,b\text{ have the same parity}\}=\{(1,1),(1,3),(3,1),(3,3),(2,2),(2,4),(4,2),(4,4)\}$. Reflexive: $(1,1),(2,2),(3,3),(4,4)$ all present ✓. Symmetric: $(1,3)\&(3,1)$ ✓, $(2,4)\&(4,2)$ ✓. Transitive: $(1,3),(3,1)\Rightarrow(1,1)$ ✓; $(2,4),(4,2)\Rightarrow(2,2)$ ✓ (checking representative chains). All three properties hold — $R$ is a genuine equivalence relation.

**Example 2 (LO2 — classes are disjoint-or-identical, and the converse direction, breaking MC-2 and MC-3)**: For $R$ from Example 1: $[1]=\{x : x\sim1\}=\{1,3\}$; $[3]=\{x:x\sim3\}=\{1,3\}$ — IDENTICAL to $[1]$, not partially overlapping. $[2]=\{2,4\}=[4]$. Checking $[1]\cap[2]=\{1,3\}\cap\{2,4\}=\varnothing$ — completely disjoint. $A$ partitions into exactly two blocks: $\{1,3\}$ and $\{2,4\}$. Now the converse: START from this partition $\{\{1,3\},\{2,4\}\}$ and define $R''$ by "same block." Directly: $R''=\{(1,1),(1,3),(3,1),(3,3),(2,2),(2,4),(4,2),(4,4)\}$ — EXACTLY $R$ from Example 1, recovered purely from the partition, with reflexivity/symmetry/transitivity all automatic from "same block as."

**Example 3 (LO1/LO3 — missing transitivity breaks everything, breaking MC-1)**: Let $R'=\{(1,1),(2,2),(3,3),(1,2),(2,1),(2,3),(3,2)\}$ on $A=\{1,2,3\}$. Reflexive ✓ (all self-pairs present); Symmetric ✓ ($(1,2)\&(2,1)$, $(2,3)\&(3,2)$). Transitive: check $(1,2),(2,3)$ — this REQUIRES $(1,3)\in R'$, but $(1,3)\notin R'$ — transitivity **fails**. So $R'$ satisfies 2 of the 3 properties, yet is **NOT** an equivalence relation. Attempting to assign "the class of $1$": it should include $2$ (since $1\sim2$), and $2$'s own relations include $3$ (since $2\sim3$) — but $1$ is NOT directly related to $3$ ($(1,3)\notin R'$), so there is no consistent single class containing $1,2,3$ together the way Example 1's classes behaved — the disjoint-or-identical guarantee has genuinely broken down, exactly because transitivity, one of the three required properties, is missing.

## Component 5 — Teaching Actions

### Teaching Action A01 — Checking All Three Properties, Reusing Established Procedures (Primitive P11: Representation Shift)

State: "an equivalence relation is reflexive AND symmetric AND transitive, all at once — you already know how to check each one individually; here you just run all three checks on the SAME relation." Work Example 1's full three-property verification.

### Teaching Action A02 — Classes Are Identical or Disjoint, Never Partial; The Converse Also Works (Primitive P06: Contrast Pair)

Present Example 2's direct evidence: $[1]$ and $[3]$ turn out completely identical, $[1]$ and $[2]$ turn out completely disjoint — no partial overlap anywhere. Then present the converse construction: starting from the partition $\{\{1,3\},\{2,4\}\}$ and defining "same block," the ORIGINAL relation $R$ is recovered exactly. State: "equivalence classes never partially overlap — they're either the same class or entirely separate ones. And this whole picture runs both ways: any partition you're handed directly defines a valid equivalence relation, no extra work needed."

- **MC-2 hook**: ask "could two equivalence classes share SOME elements but not all of them?" — a "yes" answer reveals MC-2 (missing that shared elements force the classes to be fully identical, via symmetry and transitivity together).
- **MC-3 hook**: ask "if I'm given an equivalence relation, I can build its partition — but if I'm just handed a partition to start with, do I still get a genuine equivalence relation out of it?" — a "no, that direction doesn't automatically work" answer reveals MC-3 (assuming the relation-to-partition correspondence is one-directional).

### Teaching Action A03 — Missing One Property Breaks Everything (Primitive P28: Conflict Evidence)

Present Example 3's direct evidence: $R'$ satisfies reflexivity and symmetry (2 of 3 properties) yet is not an equivalence relation at all, and its attempted "classes" become inconsistent (element $1$ can't be cleanly grouped with both $2$ and $3$). State: "two out of three properties is not 'almost an equivalence relation' — it's simply not one, and the clean disjoint-or-identical class structure you rely on stops being guaranteed the moment even one property is missing."

- **MC-1 hook**: ask "if a relation is reflexive and symmetric but not quite transitive, is it still basically an equivalence relation?" — a "yes" answer reveals MC-1 (treating the three-property requirement as a matter of degree rather than an all-or-nothing combination).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. For $A=\{1,2,3,4,5,6\}$ and $R=\{(a,b):a\equiv b\pmod3\}$, verify all three properties and identify $R$'s equivalence classes.
  2. Confirm that the equivalence classes from problem 1 are pairwise disjoint and that their union is all of $A$.
  3. Given the partition $\{\{1,4\},\{2,5\},\{3,6\}\}$ of $A=\{1,2,3,4,5,6\}$, construct the equivalence relation it defines via "same block," and verify it matches problem 1's relation.
  4. A relation $R$ on $\{1,2,3\}$ is reflexive and transitive but NOT symmetric. Explain why $R$ is not an equivalence relation, and why its "classes" (if you tried to define them the same way) would not behave like genuine equivalence classes.
- **P76 (Transfer Probe, mode = independence)**: "A university groups students into study sections by declaring two students 'equivalent' if they are enrolled in the exact same set of courses this semester. (a) Verify, in general terms, why this 'same course set' relation is reflexive, symmetric, and transitive. (b) Explain what the resulting equivalence classes represent in this context, and why two different students' classes could never partially overlap (share some but not all members). (c) Suppose instead the university starts from an existing set of disjoint sections (a partition of the student body) and DEFINES 'equivalent' as 'assigned to the same section.' Explain why this automatically produces a valid equivalence relation, without needing to independently re-verify reflexivity, symmetry, and transitivity from scratch."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | PARTIAL-PROPERTY-SET-ASSUMED-SUFFICIENT | Believing a relation satisfying only 1 or 2 of the 3 required properties (reflexive, symmetric, transitive) is "basically" an equivalence relation, missing that all three are simultaneously required | Foundational |
| MC-2 | EQUIVALENCE-CLASSES-ASSUMED-CAN-PARTIALLY-OVERLAP | Believing two equivalence classes could share some but not all elements, rather than recognizing they must be either fully identical or fully disjoint | Foundational |
| MC-3 | PARTITION-CORRESPONDENCE-ASSUMED-ONE-DIRECTIONAL | Believing only the relation-to-partition direction holds, missing that any given partition also automatically defines a valid equivalence relation | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Partial Property Set Assumed Sufficient") → P41 (detect: ask a student to judge a relation missing exactly one of the three properties and check whether they call it "basically an equivalence relation") → P64 (conceptual shift: re-walk Example 3's direct breakdown — reflexive and symmetric hold, yet the classes become inconsistent without transitivity — re-anchoring on "all three, together, or it isn't an equivalence relation at all").
- **B02 (targets MC-2)**: P27 (name it: "Equivalence Classes Assumed Can Partially Overlap") → P41 (detect: ask a student whether two equivalence classes could share only some elements, and check for a "yes") → P64 (conceptual shift: re-walk the symmetry-plus-transitivity argument showing a shared element forces full identity of the classes, re-anchoring on "identical or disjoint — never partial, and here's exactly why the three properties force that").
- **B03 (targets MC-3)**: P27 (name it: "Partition Correspondence Assumed One-Directional") → P41 (detect: ask a student whether a given partition automatically yields a valid equivalence relation, and check for a "no") → P64 (conceptual shift: re-walk Example 2's converse construction — the "same block" relation recovered from the partition, verified reflexive/symmetric/transitive automatically — re-anchoring on "relations and partitions are two views of the same structure, and the correspondence runs both ways").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.found.reflexive-relation`, `math.found.symmetric-relation`, `math.found.transitive-relation` (the three individual properties this concept combines, each contributing its own established checking procedure directly reused here).
- **Unlocks**: `math.found.equivalence-class` (a dedicated deeper treatment of the class construction previewed in LO2), `math.abst.quotient-group` (uses an equivalence relation to build quotient structures in group theory), `math.nt.congruence` (congruence mod $n$ is the canonical number-theoretic example of an equivalence relation, previewed via Example 1's "same parity" instance).
- **Cross-links**: KG lists `math.nt.congruence` and `math.abst.quotient-group` as cross-links — **neither is yet authored** (checked via `ls docs/curriculum/blueprints/` before setting P76_mode). $P76_{mode}=$ **independence**; a future revision may add a genuine cross-link transfer probe into congruence arithmetic or quotient-group construction once either entry exists.

## Component 8 — Teaching Notes

- estimated_hours = 5 with a developing/analyze tag places this at a "3 TAs + gate" tier — A01 (combined three-property verification), A02 (the class-structure theorem in both directions), and A03 (the missing-property breakdown) each target a distinct LO, appropriate for a concept that directly synthesizes three already-mastered prerequisites into one new combined structure plus one genuinely new theorem (the class/partition correspondence).
- Example 1's "same parity" relation was deliberately chosen (over an arbitrary invented relation) because it previews `math.nt.congruence`'s own "same remainder" idea in miniature, giving learners a concrete bridge to that future concept even though it is not yet authored and this concept's own cross-link to it must remain in independence mode for now.
- Examples 1 and 3 were deliberately built as a near-matched pair (Example 3's $R'$ shares two of Example 1's three properties, reflexive and symmetric, differing only in transitivity) to make MC-1's "partial credit" lesson as stark as possible with minimal extra complexity, mirroring this corpus's established near-identical-pair technique (e.g. `math.found.symmetric-relation`'s own Examples 1-2).

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (all three) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (both unauthored → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: specific relation verified before the general Partition Theorem) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO1/LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
