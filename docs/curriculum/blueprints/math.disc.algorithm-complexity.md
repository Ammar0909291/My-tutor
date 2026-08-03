# Teaching Blueprint: Algorithm Complexity (`math.disc.algorithm-complexity`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.disc.algorithm-complexity` |
| name | Algorithm Complexity |
| domain | Discrete Mathematics |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 6 |
| requires | `math.disc.asymptotic-notation`, `math.disc.divide-conquer-recurrence` |
| unlocks | `math.disc.complexity-classes` |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | Worst/average/best case time and space complexity of algorithms. Common complexities: O(1), O(log n), O(n), O(n log n), O(n²), O(2ⁿ). Loop analysis, recursion tree method.

 |

## Component 1 — Learning Objectives

- LO1: Analyze the time complexity of a LOOP-based algorithm by counting how many times its dominant operation executes as a function of input size $n$, expressing the result in Big-O notation.
- LO2: Distinguish WORST-case, AVERAGE-case, and BEST-case complexity for a given algorithm, recognizing they can genuinely differ.
- LO3: Analyze a RECURSIVE algorithm's complexity using either the recursion tree method or the Master Theorem (per `math.disc.divide-conquer-recurrence`), correctly identifying which technique fits a given recurrence.

## Component 2 — Prerequisite Check

Assumes mastery of `math.disc.asymptotic-notation` (Big-O and related notation) and `math.disc.divide-conquer-recurrence` (the Master Theorem this concept applies to recursive algorithms).

## Component 3 — Core Explanation

**Algorithm complexity** measures how an algorithm's resource use (time or space) SCALES with input size $n$, expressed in asymptotic (Big-O) notation. Common complexity classes, from fastest to slowest growth: $O(1)$ (constant), $O(\log n)$ (logarithmic), $O(n)$ (linear), $O(n\log n)$ (linearithmic), $O(n^2)$ (quadratic), $O(2^n)$ (exponential).

**Loop analysis**: for a simple loop running $n$ times with constant work per iteration, the complexity is $O(n)$; NESTED loops (a loop inside a loop, both scaling with $n$) typically give $O(n^2)$ or higher, since the inner loop's work is repeated for each outer iteration.

**Worst/average/best case**: the same algorithm can have DIFFERENT complexities depending on which INPUT is considered — e.g. a linear search's worst case (item not found, or found last) is $O(n)$, but its best case (item found first) is $O(1)$; average case requires assumptions about the input distribution.

**Recursive algorithms** are analyzed via the RECURSION TREE method (summing work across all levels of recursive calls) or, when the recurrence fits the form $T(n)=aT(n/b)+f(n)$, via the Master Theorem directly.

## Component 4 — Worked Examples

**Example 1 (LO1 — nested loop analysis, breaking MC-1)**: Analyze the complexity of a nested loop where the OUTER loop runs $n$ times and the INNER loop runs $n$ times for EACH outer iteration, with constant work inside: total operations $=n\times n=n^2$, so $O(n^2)$. A common error analyzes each loop's complexity SEPARATELY and simply ADDS them ($O(n)+O(n)=O(n)$), missing that NESTED loops MULTIPLY their iteration counts rather than adding — the inner loop's full $n$ iterations happen ONCE PER outer iteration, not once total.

**Example 2 (LO2 — worst vs. best case, breaking MC-2)**: Linear search for a target value in an unsorted array of $n$ elements: BEST case (target is the first element checked) is $O(1)$; WORST case (target is the last element, or absent entirely) is $O(n)$. A common error reports a single "the complexity" for the algorithm without specifying WHICH case, or assumes the best case represents the algorithm's typical/reliable performance — worst-case analysis is usually the more meaningful guarantee for algorithm comparison, since it bounds performance regardless of input.

**Example 3 (LO3 — recursion tree method)**: Analyze $T(n)=2T(n/2)+n$ via the recursion tree: at the TOP level, work $=n$; at the next level, 2 subproblems of size $n/2$, each doing $n/2$ work, totaling $2\times(n/2)=n$ work at that level too; this PATTERN repeats — every level does $\Theta(n)$ total work, and there are $\log_2n$ levels (until subproblems reach size 1), giving total work $\Theta(n\log n)$ — matching exactly what the Master Theorem (Case 2, per `math.disc.divide-conquer-recurrence`) would also produce, confirming the two methods agree.

## Component 5 — Teaching Actions

### Teaching Action A01 — Nested Loops Multiply, Sequential Loops Add (Primitive P06: Contrast Pair)

Work Example 1's correct multiplicative analysis against the flawed additive guess, tracing through a small concrete case (e.g. $n=3$) by actually counting total inner-loop executions to make the multiplication concrete. State the rule: "loops NESTED inside each other multiply their complexities; loops that run one AFTER another (sequentially, not nested) add their complexities instead."

- **MC-1 hook**: this directly targets MC-1 (adding nested loop complexities instead of multiplying).

### Teaching Action A02 — Worst, Average, Best Case Are Genuinely Different Questions (Primitive P06: Contrast Pair, second pairing)

Work Example 2's three cases side by side for linear search, emphasizing that "the complexity of an algorithm" is an incomplete question until the CASE is specified. State the rule: "always specify which case (worst/average/best) you're analyzing — they can give genuinely different Big-O results for the same algorithm, and worst-case is usually the standard default for comparing algorithms."

- **MC-2 hook**: this directly targets MC-2 (reporting a single unqualified complexity, or over-relying on best-case performance).

### Teaching Action A03 — Recursion Tree: Sum Work Across All Levels (Primitive P11: Representation Shift)

Work Example 3's recursion tree explicitly, drawing each level, computing the per-level total work, and summing across the $\log_2n$ levels — connecting this method directly back to the Master Theorem result from `math.disc.divide-conquer-recurrence` as a cross-check.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.85×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Analyze the complexity of a triple-nested loop, each running $n$ times, with constant work in the innermost loop.
  2. For binary search on a sorted array, state its worst-case complexity and explain why (connecting to `math.disc.divide-conquer-recurrence`'s binary-search example).
  3. Analyze $T(n)=4T(n/2)+n$ using the recursion tree method, computing the total work across all levels.
  4. Explain, in one sentence, why two sequential (non-nested) loops each running $n$ times give $O(n)$ overall, not $O(n^2)$.
- **P76 (Transfer Probe, mode = independence)**: "A programmer writes two candidate algorithms to check whether any two elements in a list of $n$ numbers sum to a target value: Algorithm A uses a nested loop comparing every pair directly ($O(n^2)$); Algorithm B first sorts the list ($O(n\log n)$) then uses a two-pointer scan ($O(n)$), for a total of $O(n\log n)$. (a) For a list of 1 million elements, explain in general terms why Algorithm B would be dramatically faster than Algorithm A in the worst case, using the growth-rate comparison from this lesson. (b) A colleague argues Algorithm A is 'simpler and just as good' because for VERY SMALL lists (say, 5 elements), the two algorithms run in essentially the same (negligible) time — explain why this small-input observation does not contradict Algorithm B's asymptotic superiority for large $n$."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | NESTED-LOOP-COMPLEXITIES-ADDED-INSTEAD-OF-MULTIPLIED | Computing nested loops' combined complexity by adding their individual complexities rather than multiplying | Foundational |
| MC-2 | ALGORITHM-COMPLEXITY-REPORTED-WITHOUT-SPECIFYING-CASE | Stating "the" complexity of an algorithm without clarifying whether it refers to worst, average, or best case | Foundational |
| MC-3 | SMALL-INPUT-PERFORMANCE-MISTAKEN-FOR-ASYMPTOTIC-COMPARISON | Judging two algorithms' relative efficiency based on performance for small input sizes, rather than their asymptotic (large-$n$) growth rates | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Nested Loop Complexities Added Instead of Multiplied") → P41 (detect: present Example 1 and check whether $O(n)$ or $O(n^2)$ is reported) → P64 (conceptual shift: re-count total operations for a small concrete $n$ directly, showing the multiplicative pattern explicitly).
- **B02 (targets MC-2)**: P27 ("Complexity Reported Without Specifying Case") → P41 (detect: ask for "the complexity" of linear search and check whether a case is specified) → P64 (conceptual shift: re-walk Example 2's three distinct cases, requiring explicit case-labeling before any Big-O answer is accepted).
- **B03 (targets MC-3)**: P27 ("Small-Input Performance Mistaken for Asymptotic Comparison") → P41 (detect: present the transfer probe's part (b) scenario and check whether small-$n$ similarity is treated as evidence against Algorithm B's superiority) → P64 (conceptual shift: re-derive the growth-rate comparison explicitly for large $n$ (e.g. $n=1{,}000{,}000$), showing the dramatic gap that only emerges at scale).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.disc.asymptotic-notation`, `math.disc.divide-conquer-recurrence`.
- **Unlocks**: `math.disc.complexity-classes` (the P/NP classification this concept's per-algorithm analysis feeds into).
- **Related**: none declared.

## Component 8 — Teaching Notes

- estimated_hours = 6 (the highest in this domain batch) reflects that this concept synthesizes loop analysis, case distinctions, AND recursive analysis (via two different techniques) into one comprehensive algorithmic-thinking toolkit.
- MC-1 was ranked most severe because nested-loop analysis is the single most common complexity-analysis task encountered in practice, and the additive-instead-of-multiplicative error silently produces a complexity class that is often dramatically too optimistic (e.g. reporting $O(n)$ for a genuinely $O(n^2)$ algorithm).
- The two-algorithm transfer probe was deliberately designed with a realistic engineering tradeoff and a specific counter-argument (part (b)'s "simpler and just as good for small inputs" claim) to test whether the asymptotic-vs-small-input distinction (MC-3) is genuinely internalized as a reasoning principle, not just a formula-application skill.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.disc.asymptotic-notation`, `math.disc.divide-conquer-recurrence`) |
| V-4 | unlocks concepts named accurately from KG | PASS (`math.disc.complexity-classes`) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
