# Teaching Blueprint: Well-Ordering Principle (`math.found.well-ordering-principle`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.found.well-ordering-principle` |
| name | Well-Ordering Principle |
| domain | Foundations |
| difficulty | developing |
| bloom | understand |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 3 |
| requires | `math.found.natural-numbers` |
| unlocks | `math.nt.division-algorithm` |
| cross_links | `math.nt.division-algorithm` (**not yet authored** — verified via `ls`; P76_mode = independence, see Component 7) |
| CPA_entry_stage | C (Concrete) — a physical collection of objects before the formal statement |
| description (KG) | The principle that every nonempty subset of the natural numbers has a least element, equivalent to mathematical induction over ℕ. |

## Component 1 — Learning Objectives

- LO1: State the **Well-Ordering Principle**: every **nonempty** subset of the natural numbers $\mathbb{N}$ has a **least element**, and apply it to identify the least element of a given subset.
- LO2: Recognize the principle's **nonempty** requirement as essential — the empty set trivially has NO least element (there's nothing to be least), so the principle explicitly excludes this vacuous case — and correctly identify when a "subset" under discussion might actually be empty.
- LO3: State that the Well-Ordering Principle is **logically equivalent to mathematical induction over $\mathbb{N}$** (each can be used to prove the other), and use the Well-Ordering Principle to construct a proof by **minimal counterexample** — an alternative proof technique especially natural for existence/uniqueness statements.

## Component 2 — Prerequisite Check

Assumes mastery of `math.found.natural-numbers` (the set $\mathbb{N}$, its canonical order, and the Peano axioms).

## Component 3 — Core Explanation

The **Well-Ordering Principle**: every **nonempty** subset $S\subseteq\mathbb{N}$ has a **least element** — some $m\in S$ with $m\leq s$ for every $s\in S$.

**Why "nonempty" is essential**: the empty set $\emptyset\subseteq\mathbb{N}$ is technically a subset of $\mathbb{N}$, but it has NO least element (there's nothing in it to compare) — the principle explicitly restricts its guarantee to nonempty subsets, since the empty case is a genuine, unavoidable exception, not covered by any "least element" claim.

**Equivalence to induction**: the Well-Ordering Principle and mathematical induction over $\mathbb{N}$ are **logically equivalent** — each can be derived from the other. (Sketch: given Well-Ordering, to prove induction's conclusion "$P(n)$ for all $n$," suppose instead the set of COUNTEREXAMPLES $\{n : P(n)\text{ false}\}$ is nonempty — by Well-Ordering it has a least element $m$; then $P(m-1)$ must hold (since $m$ was the LEAST counterexample), and the inductive step $P(m-1)\Rightarrow P(m)$ forces $P(m)$ true — contradicting $m$ being a counterexample, so no counterexamples exist.)

**Proof by minimal counterexample**: this is exactly the technique sketched above, usable as an alternative to standard induction — assume, for contradiction, that some statement FAILS for at least one natural number; by Well-Ordering, there's a SMALLEST such failure; derive a contradiction by showing this smallest failure would force an even smaller failure (or otherwise cannot actually be minimal) — concluding no failure exists at all.

## Component 4 — Worked Examples

**Example 1 (LO1 — finding the least element directly)**: Let $S=\{n\in\mathbb{N} : n^2>50\}=\{8,9,10,\ldots\}$ (since $7^2=49\leq50$ but $8^2=64>50$). The least element of $S$ is 8 — directly confirmed by checking $7\notin S$ but $8\in S$.

**Example 2 (LO2 — the nonempty requirement, breaking MC-1)**: Let $T=\{n\in\mathbb{N} : n^2<0\}$. Since no natural number squared is ever negative, $T=\emptyset$. Does $T$ have a least element? NO — $T$ is empty, so the Well-Ordering Principle's guarantee simply doesn't apply here; there is nothing in $T$ to BE a least element. This is not a failure of the principle, but a direct consequence of its explicit "nonempty" qualifier.

**Example 3 (LO3 — proof by minimal counterexample)**: Prove every natural number $n\geq2$ has a prime factor. Suppose (for contradiction) the set $S$ of counterexamples (natural numbers $\geq2$ with NO prime factor) is nonempty. By Well-Ordering, $S$ has a least element $m$. Since $m$ has no prime factor, $m$ itself isn't prime (a prime number IS its own prime factor) — so $m$ is composite, meaning $m=ab$ for some $1<a,b<m$. Since $a<m$ and $m$ was the LEAST counterexample, $a\notin S$ — meaning $a$ DOES have a prime factor $p$. But then $p$ also divides $m=ab$ (since $p|a$), so $m$ itself has a prime factor after all — contradicting $m\in S$. So $S$ must be empty; every $n\geq2$ has a prime factor.

## Component 5 — Teaching Actions

### Teaching Action A01 — Finding Least Elements, and the Nonempty Requirement (Primitive P11: Representation Shift)

Start concrete: present a jar of numbered balls (e.g. labeled 8,15,23,4,11) and ask "which ball has the smallest number?" — directly finding it by inspection (4). State: "the Well-Ordering Principle just formalizes this obvious-seeming fact for the natural numbers: ANY nonempty collection of them has a smallest member." Work Example 1's algebraic version, finding the least element of a described (not listed) set.

Shift to the nonempty requirement: work Example 2's empty-set case, explicitly showing WHY no least element can exist there.

- **MC-1 hook**: ask "does EVERY subset of $\mathbb{N}$, without exception, have a least element?" — a "yes, without exception" answer reveals MC-1 (overlooking the empty set as a genuine, unavoidable exception the principle explicitly excludes).

### Teaching Action A02 — Proof by Minimal Counterexample, and Equivalence to Induction (Primitive P06: Contrast Pair)

**Contrast 1 (targets MC-1)**: Place a nonempty set (Example 1, has a least element) directly beside the empty set (Example 2, has none) — state precisely: "the Well-Ordering Principle's guarantee has exactly one built-in exception, the empty set — always check nonemptiness first before invoking the principle."

**Contrast 2**: Work Example 3's full minimal-counterexample proof, explicitly labeling each step (assume a nonempty counterexample set exists; invoke Well-Ordering for a LEAST counterexample; derive that something even smaller must ALSO be a counterexample or otherwise reach a contradiction; conclude no counterexamples exist). Connect this explicitly to the equivalence with induction: "this proof technique and standard induction are two sides of the same underlying fact about $\mathbb{N}$'s order — sometimes one style of argument feels more natural than the other for a given problem, but they're provably interchangeable tools."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Find the least element of $S=\{n\in\mathbb{N} : 3n>100\}$.
  2. Determine whether $T=\{n\in\mathbb{N} : n \text{ is both even and odd}\}$ is empty, and if so, explain why the Well-Ordering Principle does not guarantee it a least element.
  3. Using proof by minimal counterexample, prove that every natural number $n\geq1$ can be written as a sum of distinct powers of 2 (you may assume this is true for smaller numbers as your inductive-style step, analogous to Example 3's structure).
  4. Explain, in your own words, why the Well-Ordering Principle and mathematical induction are described as "logically equivalent," referencing the specific derivation sketch from this lesson.
- **P76 (Transfer Probe, mode = independence)**: "A software verification team wants to prove that a certain recursive algorithm always terminates after a finite number of steps for every non-negative integer input. (a) Using the proof-by-minimal-counterexample technique, describe the general shape of an argument: assume (for contradiction) that some input causes non-termination, use the Well-Ordering Principle to select the SMALLEST such non-terminating input, and explain what kind of contradiction the team would need to derive (in terms of an even smaller non-terminating input) to complete the proof. (b) Explain briefly why this Well-Ordering-based argument style could be used interchangeably with a standard induction-based termination proof, given this lesson's equivalence claim." *Component 7 note: this scenario was chosen independently rather than cross-linking to `math.nt.division-algorithm`, since that blueprint does not yet exist.*
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | EMPTY-SET-EXCEPTION-OVERLOOKED | Believing the Well-Ordering Principle guarantees a least element for EVERY subset of $\mathbb{N}$ without exception, overlooking the empty set as an explicitly excluded case | Foundational |
| MC-2 | MINIMAL-COUNTEREXAMPLE-STRUCTURE-NOT-RECOGNIZED | Not recognizing the specific logical structure of a minimal-counterexample proof (assume nonempty failure set, invoke Well-Ordering, derive contradiction via an even-smaller failure), instead treating it as an unstructured proof-by-contradiction | Moderate |
| MC-3 | WELL-ORDERING-ASSUMED-TO-APPLY-BEYOND-NATURAL-NUMBERS | Believing the Well-Ordering Principle (as stated) applies to other ordered sets like the integers or rationals without modification, not recognizing it is specifically a property of $\mathbb{N}$'s particular order | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Empty-Set Exception Overlooked") → P41 (detect: ask whether EVERY subset of $\mathbb{N}$, without exception, has a least element) → P64 (conceptual shift: present Example 2's empty set explicitly, showing the principle's own "nonempty" qualifier is not decorative but load-bearing).
- **B02 (targets MC-2)**: P27 (name it: "Minimal-Counterexample Structure Not Recognized") → P41 (detect: ask a student to outline the STRUCTURE of a minimal-counterexample proof before filling in specifics, checking whether they can name each step) → P64 (conceptual shift: re-walk Example 3's proof, explicitly labeling each of the four structural steps).
- **B03 (targets MC-3)**: P27 (name it: "Well-Ordering Overextended Beyond Natural Numbers") → P41 (detect: ask whether the SET of all integers $\mathbb{Z}$, or the set of positive rationals, is well-ordered in the same sense) → P64 (conceptual shift: point out that $\mathbb{Z}$ has no least element at all (extends infinitely in the negative direction), and the positive rationals have no least element either (given any positive rational, a smaller one always exists) — the Well-Ordering Principle is a genuinely special property of $\mathbb{N}$'s particular structure, not a universal fact about ordered sets).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.found.natural-numbers` (the set $\mathbb{N}$ and its canonical order, this principle's exact subject).
- **Unlocks**: `math.nt.division-algorithm` (the division algorithm's existence proof is a standard, direct application of the Well-Ordering Principle, selecting the least nonnegative remainder).
- **Cross-link**: KG lists `math.nt.division-algorithm` as a cross-link. Verified via directory listing that no blueprint yet exists at `docs/curriculum/blueprints/math.nt.division-algorithm.md`. Per the established P76_mode rule, this blueprint uses **independence** mode. A future revision, once that concept is authored, may add a genuine cross-link probe connecting this concept's minimal-counterexample/least-element machinery directly to that concept's proof that the remainder in $a=bq+r$ can always be chosen as the LEAST nonnegative value satisfying the equation.

## Component 8 — Teaching Notes

- estimated_hours = 3 with a developing/understand tag places this at the "2 main TAs + gate" tier — A01 (finding least elements and the nonempty requirement) and A02 (minimal-counterexample proof technique plus the induction equivalence) jointly cover all three LOs.
- MC-1 (empty-set exception overlooked) was placed first because it represents the single most common oversight when a principle's precise statement includes a qualifier ("nonempty") that can easily be treated as boilerplate rather than load-bearing — Example 2 was deliberately chosen with an algebraically-obvious-once-noticed empty set (no natural number squared is negative) to make the exception's genuine necessity concrete rather than abstract.
- The software-termination transfer probe was chosen because proof-by-minimal-counterexample (here, "smallest non-terminating input") is a genuinely standard technique in computer science termination arguments, giving this foundational logic tool immediate, recognizable applied value beyond pure mathematics.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.found.natural-numbers`) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.nt.division-algorithm` confirmed absent → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: jar of numbered balls before formal statement) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
