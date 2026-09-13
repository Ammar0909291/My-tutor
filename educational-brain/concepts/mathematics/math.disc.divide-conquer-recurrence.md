# math.disc.divide-conquer-recurrence

## Identity
- **KG id**: `math.disc.divide-conquer-recurrence`
- **Domain**: math.disc
- **Requires**: `math.disc.recurrence-relation`, `math.alg.logarithm`
- **Unlocks**: none (per the live KG — see Curriculum Feedback: the Blueprint states
  `math.disc.algorithm-complexity`)
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 4

## Learning Objective
Set up the divide-and-conquer recurrence $T(n)=aT(n/b)+f(n)$ for a given algorithm, identifying
$a$ subproblems of size $n/b$ with combination cost $f(n)$; compute the critical exponent
$c^*=\log_ba$ (drawing on `math.alg.logarithm`) and apply all three cases of the Master Theorem
to obtain closed-form $\Theta$-bounds; and recognize when the theorem does NOT apply (non-uniform
subproblem sizes, non-polynomial $f(n)$), reaching for the recursion-tree method or the
Akra–Bazzi extension instead.

## Core Understanding
A divide-and-conquer algorithm's running time follows the standard form
$T(n)=aT(n/b)+f(n)$, where $a$ counts the recursive subproblems, $b$ is the shrinkage factor per
level, and $f(n)$ is the non-recursive divide-and-combine cost. `math.disc.recurrence-relation`'s
own general recurrence-solving machinery could in principle handle this form directly, but the
Master Theorem offers a much faster shortcut BY comparing $f(n)$ against the CRITICAL EXPONENT
$c^*=\log_ba$ — computed using `math.alg.logarithm`'s own base-change and evaluation rules.

The recursion-tree picture makes the three cases intuitive rather than merely mnemonic: at level
$\ell$ of the recursion, there are $a^\ell$ subproblems each of size $n/b^\ell$, and each level's
TOTAL combination cost is $a^\ell\cdot f(n/b^\ell)$. If $f(n)$ grows SLOWER than $n^{c^*}$ (Case
1), the total cost is dominated by the LEAVES of the recursion tree (there are $n^{c^*}$ of them,
each doing $\Theta(1)$ work), giving $T(n)=\Theta(n^{c^*})$. If $f(n)$ MATCHES $n^{c^*}$ up to a
logarithmic factor (Case 2), every level costs the same amount, and multiplying by the
$\Theta(\log n)$ number of levels gives $T(n)=\Theta(n^{c^*}\log^{k+1}n)$. If $f(n)$ grows FASTER
than $n^{c^*}$ (Case 3, with a regularity condition), the ROOT of the recursion tree dominates,
giving $T(n)=\Theta(f(n))$.

The theorem's applicability conditions are genuinely LIMITS, not fine print: it requires a UNIFORM
split (every subproblem the same size $n/b$) and a POLYNOMIALLY comparable $f(n)$. When either
fails — a non-uniform split like $T(n)=T(n/3)+T(2n/3)+n$, or a non-constant branching factor like
$T(n)=\sqrt n\cdot T(\sqrt n)+n$ — the Master Theorem gives NO answer at all, and either the
recursion-tree method directly, the substitution (guess-and-verify) method, or the Akra–Bazzi
extension ($T(n)=\Theta(n^p(1+\int_1^nf(u)/u^{p+1}\,du))$ for $p$ solving
$\sum_ia_i/b_i^p=1$) must be used instead.

## Mental Models
- **"Compare $f(n)$ against $n^{\log_ba}$: smaller means leaves dominate, matching means every
  level ties, larger means the root dominates."**
- **"The Master Theorem needs a UNIFORM split and a POLYNOMIAL $f(n)$ — outside those, it gives
  nothing, not an inconclusive hint."**
- **"$\log_ba$ and $\log_ab$ are reciprocals — mixing them up is not a small error, it's the wrong
  exponent entirely."**

## Why Students Fail

### MC-1: MASTER-THEOREM-ALWAYS-APPLIES
- **Surface form**: applying the Master Theorem to recurrences outside its domain — non-polynomial
  $f(n)$, unequal subproblem sizes, or non-constant $a$ or $b$.
- **Frequency band**: not stated in the Blueprint (adopted as given).
- **Root cause (Type 5, instruction-induced)**: the theorem is often presented as the universal
  divide-and-conquer solver, and its applicability conditions, while stated, are rarely drilled as
  hard preconditions to CHECK before reaching for the formula.
- **Repair**: present the three genuine disqualifiers explicitly (non-uniform split, variable
  branching, exponential $f(n)$ gap) and require the learner to verify all preconditions before
  applying the theorem.

### MC-2: WRONG-CRITICAL-EXPONENT
- **Surface form**: computing $\log_ba$ incorrectly — confusing $a$ and $b$ (using $\log_ab$
  instead) or otherwise substituting the wrong operation ($a/b$ or $a-b$).
- **Frequency band**: not stated in the Blueprint (adopted as given).
- **Root cause (Type 4, notation-induced)**: $a$ and $b$ appear symmetrically to the eye in
  $T(n)=aT(n/b)+f(n)$, obscuring the genuinely asymmetric roles they play in the critical exponent
  formula.
- **Repair**: compute a concrete numeric example ($a=8,b=2$) showing $\log_28=3$ genuinely differs
  from $\log_82=1/3$ by a factor of $9$, making the asymmetry unmistakable.

### MC-3: CASE-BOUNDARY-CONFUSION
- **Surface form**: confusing Case 1 (where $f(n)$ is polynomially SMALLER, and the answer is
  $n^{c^*}$) with Case 3 (where $f(n)$ is polynomially LARGER, and the answer is $f(n)$) — the two
  opposite directions of the same comparison.
- **Frequency band**: not stated in the Blueprint (adopted as given).
- **Root cause (Type 4, notation-induced)**: both cases share the identical "polynomial gap"
  structure, differing only in direction, so the formula's surface form is memorized without
  anchoring which direction applies when.
- **Repair**: use the weighing-scale image — leaves (the $n^{c^*}$ side) versus the root (the
  $f(n)$ side) — to make the "which side is heavier" question concrete rather than a symbol-matching
  exercise.

## Misconceptions

### MC-1: MASTER-THEOREM-ALWAYS-APPLIES
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-2: WRONG-CRITICAL-EXPONENT
- **Surface form**: as described above.
- **Root cause (Type 4)**: as described above.
- **Repair**: as described above.

### MC-3: CASE-BOUNDARY-CONFUSION
- **Surface form**: as described above.
- **Root cause (Type 4)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A weighing scale: the leaves (recursion tree total) on one pan, the combine cost repeated
  down every level on the other — whichever pan is heavier wins the asymptotic bound."**
- **Anti-analogy**: the Master Theorem is NOT a universal recurrence-solver — it is a shortcut
  valid only within specific structural conditions (uniform split, polynomially comparable
  $f(n)$), and outside those conditions it answers nothing at all.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: apply the theorem correctly to merge sort
  ($T(n)=2T(n/2)+n$, Case 2, $\Theta(n\log n)$), then show it CANNOT be applied to
  $T(n)=T(n/3)+T(2n/3)+n$ (non-uniform split), requiring the recursion-tree method instead.
- **Demonstration 2 (targets MC-2)**: compute $\log_28=3$ and $\log_82=1/3$ side by side for the
  identical $a=8,b=2$, showing the two values genuinely differ.
- **Demonstration 3 (targets MC-3)**: apply the weighing-scale framing to $T(n)=8T(n/2)+n^2$
  ($c^*=3$, $f(n)=n^2$ smaller, Case 1, leaves dominate, $\Theta(n^3)$) versus a case where
  $f(n)$ is larger and the root dominates instead.

## Discovery Questions
1. "If a recurrence divides a problem into pieces of two DIFFERENT sizes, can the Master Theorem
   still be applied directly?"
2. "Is $\log_28$ the same number as $\log_82$, or are they related in some other way?"
3. "In the recursion tree, does the total cost come mostly from the leaves, mostly from the root,
   or evenly from every level — and what determines which?"

## Teaching Sequence
1. **Anchor**: connect to `math.disc.recurrence-relation`'s general case-split derivation
   technique, framing the Master Theorem as a specialized shortcut for this particular recurrence
   SHAPE.
2. **Conflict evidence**: a non-uniform-split recurrence where the Master Theorem genuinely cannot
   be applied, requiring an alternative method.
3. **Contrast pair**: $\log_ba$ versus $\log_ab$ computed for the same numeric example, showing
   the genuine asymmetry.
4. **Mastery gate**: require setting up $T(n)=aT(n/b)+f(n)$ from an algorithm description,
   computing $c^*$ correctly, applying the correct case, and recognizing when the theorem does not
   apply.

## Tutor Actions
- Never accept a Master Theorem application without the learner first verifying the split is
  uniform and $f(n)$ is polynomially comparable to $n^{c^*}$.
- When $\log_ba$ is computed, require the learner to state which of $a$ and $b$ is the base and
  which is the argument.

## Voice Teaching Notes
- Say "check the preconditions first" whenever a divide-and-conquer recurrence is presented, to
  keep the applicability check audible as a required step.
- When a learner confuses Cases 1 and 3, ask "which pan of the scale is heavier — the leaves or
  the root?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly sets up $T(n)=aT(n/b)+f(n)$ from an algorithm
  description and identifies $a$, $b$, $f(n)$.
- **Rung 2 (application)**: learner correctly computes $c^*=\log_ba$ and applies the correct
  Master Theorem case.
- **Rung 3 (transfer)**: learner correctly recognizes when the Master Theorem does not apply and
  selects an appropriate alternative (recursion tree, substitution, or Akra–Bazzi).

## Tutor Recovery Strategy
- If MC-1 recurs, re-run the applicability-disqualifier checklist against the specific recurrence.
- If MC-2 recurs, re-run the $\log_28$-versus-$\log_82$ numeric contrast.
- If MC-3 recurs, re-run the weighing-scale framing for the specific case in question.

## Memory Hooks
- "Uniform split, polynomial $f(n)$ — or the Master Theorem gives you nothing."
- "$\log_ba$, not $\log_ab$ — the base and the argument are not interchangeable."
- "Leaves dominate (Case 1), levels tie (Case 2), root dominates (Case 3) — a weighing scale, not
  a formula to memorize blindly."

## Transfer Connections
- `math.disc.recurrence-relation` (already authored): supplies the case-split derivation
  technique this concept's Master Theorem specializes for the divide-and-conquer shape.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.disc.divide-conquer-recurrence.md`, reused
  by reference for its recursion-tree derivation, its canonical-examples table (merge sort,
  binary search, Karatsuba, Strassen), its Akra–Bazzi extension, and its three-misconception
  registry (birth types adopted directly from the Blueprint's own explicit classification).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe (Akra–Bazzi
  reducing to the three Master Theorem cases; the comparison-sort lower bound matching merge
  sort's upper bound; FFT-based integer multiplication as a departure from the divide-and-conquer
  paradigm).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Genuine Blueprint/KG metadata discrepancy found, resolved toward the KG**: the Blueprint's
  own Component 7 states `Unlocks: math.disc.algorithm-complexity`, but direct KG query confirms
  `unlocks: []` for this concept in the live KG. This entry's Identity section uses the KG's
  value.

## Version History
- 2026-09-13 (Batch 68): authored. Unblocked by `math.disc.recurrence-relation` (Batch 63) and
  `math.alg.logarithm` (already authored). Companion batch concepts:
  `math.calc.radius-of-convergence`, `math.disc.catalan-numbers`, `math.disc.linear-recurrence`.
  `math.disc` moves toward **25/32** this batch.
