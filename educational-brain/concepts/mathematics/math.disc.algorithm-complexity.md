# math.disc.algorithm-complexity

## Identity
- **KG id**: `math.disc.algorithm-complexity`
- **Domain**: math.disc
- **Requires**: `math.disc.asymptotic-notation`, `math.disc.divide-conquer-recurrence`
- **Unlocks**: `math.disc.complexity-classes`
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 6

## Learning Objective
Determine the asymptotic time complexity of a loop-based algorithm by counting the dominant
operation using `math.disc.asymptotic-notation`'s Big-O machinery, distinguishing multiplicative
(nested) from additive (sequential) loop structure; distinguish worst-case from average-case from
best-case complexity for the SAME algorithm; and analyze a recursive algorithm's complexity via
either the recursion tree or `math.disc.divide-conquer-recurrence`'s own Master Theorem, cross-
checking the two methods against each other.

## Core Understanding
Every algorithm's running time is classified by how its OPERATION COUNT grows with input size
$n$, using `math.disc.asymptotic-notation`'s Big-O/Big-Omega/Big-Theta framework applied to the
algorithm's dominant (most frequently executed) operation rather than every line of code. The
combination rule for loops is structural, not arbitrary: NESTED loops MULTIPLY their iteration
counts (an outer loop of $n$ iterations wrapping an inner loop of $n$ iterations performs $n\cdot
n=n^2$ total inner-loop executions), while SEQUENTIAL loops (one after another, not nested) ADD
their costs (an $O(n)$ loop followed by a separate $O(n)$ loop is still $O(n)$ overall, since
$O(n)+O(n)=O(n)$ under Big-O's own additive-dominance rule).

A single algorithm can have genuinely DIFFERENT complexities depending on which CASE is being
measured. Linear search through an unsorted array of $n$ elements looking for a target: in the
best case (the target is the first element), the algorithm does $O(1)$ work; in the worst case
(the target is last, or absent), it does $O(n)$ work; the average case, averaging over all
possible target positions, is also $\Theta(n)$ (roughly $n/2$ comparisons, and constants are
dropped under Big-Theta). Stating "the" complexity of an algorithm without specifying WHICH case
is being described is an incomplete claim — the three cases can differ by more than a constant
factor, as they do here between best and worst.

Recursive algorithms are analyzed by one of two routes, and `math.disc.divide-conquer-recurrence`
supplies the second directly: EITHER draw out the recursion tree explicitly, summing the work
done at each level of recursion, OR — when the recurrence has the divide-and-conquer shape
$T(n)=aT(n/b)+f(n)$ — apply the Master Theorem's three-case classification directly. Both routes
must agree when both apply, and cross-checking one against the other is a genuine correctness
check, not a redundant repetition: for $T(n)=2T(n/2)+n$ (binary merge sort's own recurrence), the
recursion tree has $\log_2n$ levels each costing $\Theta(n)$ total work, giving $\Theta(n\log n)$
directly — and the Master Theorem's Case 2 ($f(n)=n=n^{\log_22}$, matching the critical exponent)
gives the identical $\Theta(n\log n)$ answer via a completely different computation.

## Mental Models
- **"Nested loops multiply, sequential loops add — the structure of the code (inside vs.
  beside) determines which operation combines the counts."**
- **"'The complexity of this algorithm' is an incomplete sentence until you say which case —
  best, worst, or average — you mean."**
- **"For recursion: draw the tree and sum it, OR match the divide-and-conquer shape and apply
  the Master Theorem — and if both apply, they must agree."**

## Why Students Fail

### MC-1: NESTED-LOOP-COMPLEXITIES-ADDED-INSTEAD-OF-MULTIPLIED
- **Surface form**: computing the complexity of two nested loops (an outer loop of $n$ iterations
  containing an inner loop of $n$ iterations) as $O(n)+O(n)=O(n)$ (additive), rather than
  $O(n)\cdot O(n)=O(n^2)$ (multiplicative).
- **Frequency band**: Foundational (Blueprint's own declared severity — the single most common
  real-world complexity-analysis error).
- **Root cause (Type 1, overgeneralization)**: the correct additive rule for SEQUENTIAL
  (one-after-another) loops is overgeneralized to NESTED loops, where the inner loop's full
  iteration count repeats once for EVERY outer-loop iteration rather than contributing once total.
- **Repair**: work the nested-loop example directly, counting inner-loop executions explicitly
  (the inner loop truly runs $n$ times for EACH of the $n$ outer iterations, totaling $n^2$ runs,
  not $n+n=2n$), then contrast it immediately against a genuinely sequential pair of loops where
  the additive rule correctly applies.

### MC-2: ALGORITHM-COMPLEXITY-REPORTED-WITHOUT-SPECIFYING-CASE
- **Surface form**: stating "the complexity is $O(n)$" (or similar) without specifying whether
  this is the best-case, worst-case, or average-case complexity, when the three genuinely differ.
- **Frequency band**: Foundational (Blueprint's own declared severity).
- **Root cause (Type 1, overgeneralization)**: many introductory algorithms (arithmetic on a
  fixed-size input, a single unconditional loop) genuinely HAVE the same complexity in every case,
  so the habit of omitting the case label goes unpunished until an algorithm with a real
  best/worst split (like search) is encountered.
- **Repair**: use linear search's own best-case-$O(1)$-versus-worst-case-$O(n)$ split as the
  concrete counterexample, requiring the case label to be stated explicitly every time a
  complexity claim is made from then on.

### MC-3: SMALL-INPUT-PERFORMANCE-MISTAKEN-FOR-ASYMPTOTIC-COMPARISON
- **Surface form**: judging which of two algorithms is "faster" by comparing their actual running
  times on a small input, rather than by comparing their asymptotic growth rates as $n\to\infty$.
- **Frequency band**: Moderate (Blueprint's own declared severity).
- **Root cause (Type 2, perceptual intuition)**: on a small enough input, an algorithm with worse
  asymptotic complexity but smaller constant factors (or lower overhead) can genuinely run
  FASTER in wall-clock terms, making the small-$n$ observation perceptually compelling even though
  it says nothing about which algorithm scales better.
- **Repair**: extend the comparison to a large enough $n$ that the asymptotically superior
  algorithm visibly overtakes the other, making the crossover point itself the teaching moment —
  asymptotic comparison is a claim about behavior as $n$ grows large, not about any fixed input.

## Misconceptions

### MC-1: NESTED-LOOP-COMPLEXITIES-ADDED-INSTEAD-OF-MULTIPLIED
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: ALGORITHM-COMPLEXITY-REPORTED-WITHOUT-SPECIFYING-CASE
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-3: SMALL-INPUT-PERFORMANCE-MISTAKEN-FOR-ASYMPTOTIC-COMPARISON
- **Surface form**: as described above.
- **Root cause (Type 2)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Nested loops are a grid you fill in cell by cell ($n$ rows times $n$ columns = $n^2$ cells);
  sequential loops are two separate strips laid end to end ($n$ plus $n$ = $2n$, still $O(n)$)."**
- **Anti-analogy**: complexity is NOT "how long the code looks" — a single line calling a
  sub-routine can hide an entire recursive $O(n\log n)$ computation, while ten lines of simple
  arithmetic can all be $O(1)$.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: count inner-loop executions explicitly for a nested pair of
  $n$-iteration loops (writing out the total as $n$ groups of $n$, i.e. $n^2$), then show a
  genuinely sequential pair of $n$-iteration loops totaling only $2n=O(n)$ operations.
- **Demonstration 2 (targets MC-2)**: trace linear search's best case (target found immediately,
  $O(1)$) and worst case (target absent or last, $O(n)$) on the same array, side by side.
- **Demonstration 3 (targets MC-3)**: compare an $O(n^2)$ algorithm with very low constant
  overhead against an $O(n\log n)$ algorithm with higher constant overhead, showing the $O(n^2)$
  one winning at small $n$ and the $O(n\log n)$ one overtaking it as $n$ grows.

## Discovery Questions
1. "If a loop of $n$ iterations sits INSIDE another loop of $n$ iterations, does the inner loop
   run a total of $n$ times, or $n$ times for EACH pass of the outer loop?"
2. "Could the very same search algorithm take a different number of steps depending on WHERE in
   the array the target happens to be?"
3. "If Algorithm A is faster than Algorithm B on an input of size 10, does that guarantee A is
   still faster on an input of size 10,000?"

## Teaching Sequence
1. **Anchor**: connect to `math.disc.asymptotic-notation`'s Big-O framework, framing this concept
   as APPLYING that framework to real loop and recursion structures rather than introducing new
   notation.
2. **Conflict evidence**: the nested-loop-versus-sequential-loop contrast, showing the additive
   rule genuinely fails for nested structure.
3. **Contrast pair**: linear search's best-case-$O(1)$ versus worst-case-$O(n)$ trace on the
   identical algorithm.
4. **Mastery gate**: require analyzing a loop-based algorithm's complexity (correctly
   distinguishing nested from sequential), stating which case is being described, and analyzing a
   recursive algorithm via recursion tree or Master Theorem with the two methods cross-checked.

## Tutor Actions
- Never accept a stated complexity for an algorithm with genuinely different best/worst/average
  cases without requiring the learner to specify which case is meant.
- When a nested loop structure is analyzed, require the learner to state explicitly whether the
  inner loop's count should be added or multiplied, and why, before accepting the final answer.

## Voice Teaching Notes
- Say "inside or beside?" when a learner is unsure whether two loops combine by multiplication or
  addition — the structural cue (nested vs. sequential) is what decides it.
- When a learner states a complexity without a case label, ask "best, worst, or average — does it
  matter here, and if so, why?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly classifies a given loop structure as nested
  (multiplicative) or sequential (additive) and computes the resulting Big-O bound.
- **Rung 2 (application)**: learner correctly distinguishes best-case from worst-case from
  average-case complexity for a given algorithm with a genuine case split.
- **Rung 3 (transfer)**: learner correctly analyzes a recursive algorithm's complexity via
  recursion tree or Master Theorem and cross-checks the two methods against each other when both
  apply.

## Tutor Recovery Strategy
- If MC-1 recurs, re-run the explicit inner-loop-execution count against the specific nested
  structure in question.
- If MC-2 recurs, re-run the linear-search best-case/worst-case trace.
- If MC-3 recurs, extend the comparison to a large enough $n$ that the crossover becomes visible.

## Memory Hooks
- "Nested multiplies, sequential adds — inside or beside decides it."
- "'The complexity' is not a complete sentence — best, worst, or average?"
- "Small $n$ can lie about which algorithm scales better — asymptotic means as $n$ grows large."

## Transfer Connections
- `math.disc.asymptotic-notation` (already authored): supplies the Big-O/Big-Omega/Big-Theta
  framework this concept applies to concrete loop and recursion structures.
- `math.disc.divide-conquer-recurrence` (already authored): supplies the Master Theorem this
  concept's recursive-algorithm analysis cross-checks against the recursion-tree method.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.disc.algorithm-complexity.md`, reused by
  reference for its common-complexity-classes catalogue, its three worked examples (nested-loop
  count, linear-search best/worst/average, recursion-tree-vs-Master-Theorem cross-check for
  $T(n)=2T(n/2)+n$), and its three-misconception registry (birth types independently classified,
  since this Blueprint states severity but not birth type).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe (comparing a
  nested-loop $O(n^2)$ sum-finding algorithm against a sort-then-two-pointer $O(n\log n)$
  alternative, testing both asymptotic-superiority reasoning and resistance to the
  small-input-performance misconception).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires, unlocks
  `math.disc.complexity-classes`, cross_links none, proficient/apply, mastery_threshold 0.85,
  estimated_hours 6) was directly verified against the live KG and matches exactly.
- **Same-batch discovery**: authoring this concept, alongside this batch's own
  `math.disc.generating-functions`, was itself made possible by Batch 68's authoring of
  `math.disc.divide-conquer-recurrence`, which this concept's own `requires` field names directly.

## Version History
- 2026-09-13 (Batch 69): authored. Unblocked by `math.disc.asymptotic-notation` (Batch 63) and
  `math.disc.divide-conquer-recurrence` (Batch 68). Companion batch concept:
  `math.disc.generating-functions`. `math.disc` moves toward **28/32** this batch.
