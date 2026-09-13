# math.linalg.cramer-rule

## Identity
- **KG id**: `math.linalg.cramer-rule`
- **Domain**: math.linalg
- **Requires**: `math.linalg.determinant`, `math.linalg.matrix-inverse`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.8
- **Estimated hours**: 2

## Learning Objective
State Cramer's Rule: for $Ax=b$ with $\det(A)\ne0$, each solution component is
$x_i=\det(A_i)/\det(A)$, where $A_i$ is $A$ with column $i$ replaced by $b$, reusing
`math.linalg.determinant` and `math.linalg.matrix-inverse`'s own invertibility criterion directly;
correctly identify WHICH column to replace for a given variable; and recognize that Cramer's Rule,
while elegant, is IMPRACTICAL for large systems compared to row reduction, since it requires
computing $n+1$ separate determinants.

## Core Understanding
CRAMER'S RULE gives a direct FORMULA for each solution component of $Ax=b$ when $\det(A)\ne0$
(reusing `math.linalg.matrix-inverse`'s own invertibility criterion directly): define $A_i$ as the
matrix obtained by replacing COLUMN $i$ of $A$ with the vector $b$, leaving every other column of
$A$ unchanged. Then $x_i=\dfrac{\det(A_i)}{\det(A)}$ for each $i=1,\ldots,n$ — each unknown gets its
own determinant ratio, computed via `math.linalg.determinant`'s own methods.

The column replaced must match EXACTLY the variable being solved for: to find $x_1$, replace
column 1 (not column 2 or any other); to find $x_2$, replace column 2. Every other column of $A$
stays exactly as it was in the original coefficient matrix — only the ONE column corresponding to
the target variable is swapped for $b$.

If $\det(A)=0$, Cramer's Rule cannot be applied at all — this is the SAME invertibility failure
`math.linalg.matrix-inverse` already establishes, meaning the system has either no solution or
infinitely many, and the ratio $\det(A_i)/\det(A)$ is undefined (division by zero), not a
legitimate answer of zero or any other value.

Cramer's Rule is mathematically elegant — a direct formula rather than an iterative procedure —
but PRACTICALLY INEFFICIENT for large systems: solving an $n\times n$ system requires computing
$n+1$ separate determinants ($\det(A)$ plus $\det(A_1),\ldots,\det(A_n)$), each of which is itself
expensive for large $n$ (`math.linalg.cofactor-expansion`'s own $O(n!)$ complexity, or row
reduction's $O(n^3)$). Row reduction solves the ENTIRE system in a single $O(n^3)$ pass, making it
the practical method of choice once $n$ grows beyond a small handful of equations.

## Mental Models
- **"$x_i=\det(A_i)/\det(A)$ — replace column $i$ with $b$, nothing else changes."**
- **"$\det(A)=0$ means the ratio is undefined, not zero — the rule simply doesn't apply."**
- **"Elegant for 2 or 3 equations, impractical for large systems — $n+1$ determinants versus row
  reduction's single pass."**

## Why Students Fail

### MC-1: CRAMERS-RULE-WRONG-COLUMN-REPLACED
- **Surface form**: replaces the wrong column of $A$ with $b$ when solving for a specific variable
  — for example, replacing column 2 while trying to find $x_1$.
- **Birth type**: Type 4, notation-induced (Blueprint's own declared FOUNDATIONAL severity). The
  subscript-to-column correspondence ($x_i\leftrightarrow$ column $i$) is a notational convention
  that is easy to misalign without explicitly checking it against the variable being solved for
  each time.
- **Repair**: re-anchor on "solving for $x_i$ means replacing column $i$, and no other column" —
  explicitly matching the subscript to the column index before computing.

### MC-2: ZERO-DETERMINANT-MISINTERPRETED-AS-NO-SOLUTION
- **Surface form**: concludes directly from $\det(A)=0$ that the system has NO solution, without
  recognizing that $\det(A)=0$ actually signals the rule is inapplicable — the system could have
  either no solution or infinitely many, and determining which requires further investigation
  (e.g. via `math.linalg.linear-system`'s own rank comparison).
  own rank comparison).
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared FOUNDATIONAL severity). A
  "zero result" is commonly interpreted as "nothing," and that pattern is overgeneralized to
  $\det(A)=0$, when in fact it indicates the FORMULA breaks down, not that the answer to the
  underlying system is definitively "no solution."
- **Repair**: re-anchor on "$\det(A)=0$ means Cramer's Rule doesn't apply — go back to
  `math.linalg.linear-system`'s rank comparison to determine no-solution versus infinite-solutions."

### MC-3: CRAMERS-RULE-USED-FOR-LARGE-SYSTEMS-WITHOUT-EFFICIENCY-AWARENESS
- **Surface form**: applies Cramer's Rule to a large system (e.g. 6 or more equations) without
  recognizing that row reduction would require substantially less computation.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared Moderate severity). Cramer's
  Rule is often taught as a clean, memorable formula, and without an explicit statement of its
  efficiency cost relative to row reduction, that appeal can be applied indiscriminately regardless
  of system size.
- **Repair**: re-state the efficiency comparison explicitly — $n+1$ determinants at up to $O(n!)$
  each, versus row reduction's single $O(n^3)$ pass — and reserve Cramer's Rule for small systems
  or when a single specific unknown is needed.

## Misconceptions

### MC-1: CRAMERS-RULE-WRONG-COLUMN-REPLACED
- **Surface form**: as described above.
- **Root cause (Type 4)**: as described above.
- **Repair**: as described above.

### MC-2: ZERO-DETERMINANT-MISINTERPRETED-AS-NO-SOLUTION
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-3: CRAMERS-RULE-USED-FOR-LARGE-SYSTEMS-WITHOUT-EFFICIENCY-AWARENESS
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A specialized tool that's perfect for one small job but the wrong choice for a big one: a
  hand screwdriver works fine for one screw, but nobody uses it to assemble a whole building —
  Cramer's Rule is the hand screwdriver, row reduction is the power tool for large systems."**
- **Anti-analogy**: $\det(A)=0$ is NOT "the answer is zero" — it is a signal the FORMULA itself
  cannot be used, requiring a different method (`math.linalg.linear-system`'s rank comparison) to
  find out what actually happens.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: for a $2\times2$ system, construct $A_1$ (replacing column 1)
  and $A_2$ (replacing column 2) side by side, explicitly matching each to its corresponding
  variable.
- **Demonstration 2 (targets MC-2)**: for a system with $\det(A)=0$, show that Cramer's Rule gives
  an undefined ratio, then use `math.linalg.linear-system`'s rank comparison to determine whether
  the system has no solution or infinitely many.
- **Demonstration 3 (targets MC-3)**: compare the number of determinants required for a
  $2\times2$ system (3 total) versus a $6\times6$ system (7 total, each up to $6\times6$ itself),
  contrasting against row reduction's single pass.

## Discovery Questions
1. "To find $x_2$ using Cramer's Rule, which column of $A$ do you replace with $b$?"
2. "If $\det(A)=0$, does that mean the system definitely has no solution?"
3. "For a system with 10 equations, is Cramer's Rule or row reduction the more practical choice?"

## Teaching Sequence
1. **Anchor**: connect to `math.linalg.determinant` and `math.linalg.matrix-inverse`'s own
   invertibility criterion, framing Cramer's Rule as a direct formula built on both.
2. **Conflict evidence**: the $\det(A)=0$-is-not-"no solution" demonstration, breaking MC-2
   directly.
3. **Contrast pair**: the small-system versus large-system determinant-count comparison, isolating
   MC-3.
4. **Mastery gate**: require a correct column-matched solve, a correct interpretation of a
   $\det(A)=0$ case, and an efficiency-aware method choice under transfer, at the Blueprint's own
   stated MAMR of 5/5.

## Tutor Actions
- Never accept a Cramer's Rule solve without the learner explicitly confirming the replaced column
  matches the variable's subscript.
- When $\det(A)=0$ arises, require the learner to state the rule doesn't apply, never that the
  answer is definitively "no solution."

## Voice Teaching Notes
- Say "which variable are you solving for, and which column does that match?" whenever a column
  replacement is made.
- When $\det(A)=0$ appears, ask "does that tell you there's no solution, or something else?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly constructs $A_i$ for a given variable and computes
  $x_i$ via Cramer's Rule.
- **Rung 2 (application)**: learner correctly interprets a $\det(A)=0$ case as rule-inapplicable
  rather than no-solution.
- **Rung 3 (transfer)**: learner correctly justifies, in a novel context, when Cramer's Rule versus
  row reduction is the more efficient choice, based on system size.

## Tutor Recovery Strategy
- If MC-1 recurs, re-match the specific variable's subscript to its column for the case in
  question.
- If MC-2 recurs, re-apply `math.linalg.linear-system`'s rank comparison to the specific system in
  question.
- If MC-3 recurs, re-count the determinants required by each method for the specific system size in
  question.

## Memory Hooks
- "Solving for $x_i$? Replace column $i$ — match the subscript."
- "$\det(A)=0$ means the rule breaks, not that there's no solution."
- "Small system, Cramer's Rule. Large system, row reduction."

## Transfer Connections
- `math.linalg.determinant` (already authored, this campaign): supplies the determinant
  computations this entire rule is built from.
- `math.linalg.matrix-inverse` (already authored, this campaign): supplies the shared
  invertibility criterion $\det(A)\ne0$.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.linalg.cramer-rule.md`, reused by reference
  for its column-replacement demonstration, its zero-determinant interpretation contrast, its
  efficiency-comparison demonstration, and its three-misconception registry (birth types
  independently classified, since this Blueprint states severity but not birth type).
- Transfer probe cited by reference: the Blueprint's own probe (choosing between Cramer's Rule and
  row reduction based on system size, in a novel scenario).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `determinant`/`matrix-inverse`, unlocks none, cross_links none, proficient/apply,
  mastery_threshold 0.8, estimated_hours 2) was directly verified against the live KG and matches
  exactly.

## Version History
- 2026-09-13 (Batch 77): authored. Unblocked by `math.linalg.matrix-inverse` (Batch 76). Companion
  batch concepts: `math.linalg.augmented-matrix`, `math.linalg.cofactor-expansion`,
  `math.linalg.distance`. `math.linalg` moves toward **22/61** this batch.
