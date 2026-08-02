# Teaching Blueprint: Intersection (`math.found.intersection`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.found.intersection` |
| name | Intersection |
| domain | Foundations |
| difficulty | foundational |
| bloom | apply |
| mastery_threshold | 0.90 → MAMR = ⌈0.90×5⌉ = 5/5 |
| estimated_hours | 1 |
| requires | `math.found.set-operations` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) |
| description (KG) | The intersection A ∩ B is the set of elements belonging to both A and B. |
| related | `math.found.union` |
| aliases | set intersection, A ∩ B |

## Component 1 — Learning Objectives

- LO1: Compute $A\cap B$ for given finite sets, listing only elements present in BOTH $A$ and $B$.
- LO2: Recognize when $A\cap B=\emptyset$ (disjoint sets) and correctly report the empty set rather than treating "no shared elements" as an error or undefined case.
- LO3: State and apply $|A\cap B|\le\min(|A|,|B|)$ — intersection never has more elements than the smaller of the two sets.

## Component 2 — Prerequisite Check

Assumes mastery of `math.found.set-operations`.

## Component 3 — Core Explanation

The **intersection** of $A$ and $B$, written $A\cap B$, is the set of elements belonging to BOTH: $A\cap B=\{x : x\in A \text{ and } x\in B\}$. Since intersection requires membership in both sets simultaneously, it can never contain more elements than either set alone — $|A\cap B|\le\min(|A|,|B|)$, with equality exactly when the smaller set is entirely contained in the larger one.

## Component 4 — Worked Examples

**Example 1 (LO1 — direct computation)**: $A=\{1,2,3,4\}$, $B=\{3,4,5,6\}$. $A\cap B=\{3,4\}$ — only the elements present in both.

**Example 2 (LO2 — disjoint sets yield ∅, breaking MC-1)**: $A=\{1,2,3\}$, $B=\{4,5,6\}$ (no shared elements). $A\cap B=\emptyset$ — a valid, meaningful result (per `math.found.empty-set`), not an error or a sign that the computation "failed."

**Example 3 (LO3 — subset case, intersection equals the smaller set)**: $A=\{2,4\}$, $B=\{1,2,3,4,5\}$ (here $A\subseteq B$). $A\cap B=\{2,4\}=A$ — since every element of $A$ is already in $B$, the intersection equals $A$ exactly, achieving the maximum possible size $\min(|A|,|B|)=|A|=2$.

## Component 5 — Teaching Actions

### Teaching Action A01 — Only Elements in Both Sets Survive (Primitive P64: Conceptual Shift)

Work Example 1, explicitly checking each element of $A$ against $B$ one at a time, keeping only matches.

- **MC-1 hook**: give Example 2's disjoint pair and ask for $A\cap B$; check whether the student says "undefined" or "there is no answer" rather than $\emptyset$ (revealing MC-1: treating an empty intersection result as a failure rather than a valid, ordinary answer).

### Teaching Action A02 — Intersection Size Is Bounded by the Smaller Set (Primitive P06: Contrast Pair)

Contrast Example 3 ($A\subseteq B$, intersection reaches its maximum possible size $|A|$) against Example 2 (disjoint, intersection reaches its minimum possible size 0) to bracket the full range. State the rule: "$0\le|A\cap B|\le\min(|A|,|B|)$ — intersection can never exceed the smaller set's size, and disjoint sets are exactly the case achieving the lower bound of zero."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.90×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Compute $A\cap B$ for $A=\{a,b,c,d\}$, $B=\{c,d,e,f\}$.
  2. Compute $A\cap B$ for two disjoint sets and state the result explicitly as $\emptyset$, not "no answer."
  3. Given $|A|=4$, determine the maximum possible value of $|A\cap B|$ for any set $B$, and describe the condition on $B$ under which this maximum is achieved.
  4. Given $A=\{$multiples of 6 up to 30$\}$ and $B=\{$multiples of 4 up to 30$\}$, compute $A\cap B$ (multiples of 12: $\{12,24\}$).
- **P76 (Transfer Probe, mode = independence)**: "A hospital wants to identify patients who are BOTH over 65 years old AND diagnosed with diabetes, from two separately-maintained lists: 'Patients over 65' (340 people) and 'Patients with diabetes' (210 people). (a) Using this lesson's intersection concept, explain what the target patient group corresponds to mathematically, and state the maximum and minimum number of people it could possibly contain, given the two list sizes. (b) If the hospital's query returns zero matching patients, explain why this is a valid, meaningful result rather than a sign that the query is broken."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | EMPTY-INTERSECTION-TREATED-AS-UNDEFINED | Reporting "no answer" or an error for a disjoint pair instead of the valid result $\emptyset$ | Foundational |
| MC-2 | INTERSECTION-SIZE-ASSUMED-UNBOUNDED-BY-SMALLER-SET | Failing to recognize that $|A\cap B|$ can never exceed $\min(|A|,|B|)$, e.g. proposing an intersection larger than one of the original sets | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Empty Intersection Treated as Undefined") → P41 (detect: present Example 2's disjoint pair and check for "undefined"/"error" responses) → P64 (conceptual shift: reuse `math.found.empty-set`'s "genuine, ordinary result" framing by direct reference).
- **B02 (targets MC-2)**: P27 ("Intersection Size Assumed Unbounded") → P41 (detect: ask for the maximum possible $|A\cap B|$ given $|A|=4$; check for an answer exceeding 4) → P64 (conceptual shift: re-walk Example 3, showing the maximum is achieved exactly when $A\subseteq B$, never exceeding $|A|$).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.found.set-operations`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.found.union` (the paired operation), `math.found.empty-set` (MC-1's repair reuses its result directly).

## Component 8 — Teaching Notes

- estimated_hours = 1, matching `math.found.union`'s allocation — both concepts isolate one operation each from the already-taught `math.found.set-operations` family.
- MC-1 was ranked foundational because it recurs identically to `math.found.empty-set`'s own MC-3 (empty set treated as error) in this specific operational context — reinforcing the same underlying lesson from a second angle strengthens retention per spaced-practice principles.
- Only 2 misconceptions are registered, matching `math.found.union`'s scope-appropriate reduction from the standard 3, since this concept similarly isolates one operation from already-mastered machinery rather than introducing new proof or computation techniques.

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
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
