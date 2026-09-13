# math.disc.ogf

## Identity
- **KG id**: `math.disc.ogf`
- **Domain**: math.disc
- **Requires**: `math.disc.generating-functions`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.75
- **Estimated hours**: 5

## Learning Objective
Write the ordinary generating function (OGF) $A(x)=\sum_{n\ge0}a_nx^n$ for a given sequence and
recover sequence terms as coefficients from a given OGF; compute the product of two OGFs and
interpret the result as the CONVOLUTION of the two original sequences, never as term-by-term
multiplication; and use partial fraction decomposition of a rational OGF to extract a closed-form
formula for its sequence's general term, connecting back to `math.disc.linear-recurrence`'s
characteristic-root solutions.

## Core Understanding
An ordinary generating function encodes a sequence $a_0,a_1,a_2,\ldots$ as the formal power series
$A(x)=\sum_{n\ge0}a_nx^n$ — reusing `math.disc.generating-functions`'s own coefficient-carries-the-
meaning framing, specialized here for UNLABELED combinatorial structures (identical-looking
arrangements are not distinguished by internal labels). Nothing new is added to that foundational
idea beyond the "unlabeled" specialization; this concept's real content is what happens when OGFs
are COMBINED and DECOMPOSED.

If $A(x)=\sum a_nx^n$ and $B(x)=\sum b_nx^n$, their product $A(x)B(x)=\sum c_nx^n$ has coefficients
$c_n=\sum_{k=0}^na_kb_{n-k}$ — the CONVOLUTION of the two sequences, summing over every way to
split the index $n$ between the two factors. This is emphatically NOT the same operation as
multiplying corresponding terms ($a_n\cdot b_n$); the two produce genuinely different sequences
whenever either original sequence is non-constant. Combinatorially, the product corresponds to
combining a structure counted by $A$ with an independent structure counted by $B$.

A rational OGF like $\frac1{(1-2x)(1-3x)}$ can be decomposed via partial fractions into
$\frac A{1-2x}+\frac B{1-3x}$, each term expandable as a geometric series
($\frac1{1-rx}=\sum r^nx^n$), directly yielding a closed-form sequence formula — recovering
EXACTLY the kind of solution `math.disc.linear-recurrence` produces via characteristic roots, via
a completely different algebraic route (algebraic decomposition of a closed form, rather than
solving a characteristic polynomial from a recurrence).

## Mental Models
- **"Multiplying two generating functions convolves the sequences — sum over every way to split
  the index $n$ between the two factors — never a term-by-term product."**
- **"Partial fractions turn a rational OGF into a sum of geometric series, and each geometric
  series' ratio IS a characteristic root — the same answer `linear-recurrence` gives, reached by
  algebra on the closed form instead of solving a recurrence."**
- **"The coefficient of $x^n$ is $a_n$ — but watch the EXPONENT carefully when the series is
  shifted or scaled (like $x^5$ instead of $x$), since not every power of $x$ then carries a
  nonzero coefficient."**

## Why Students Fail

### MC-1: OGF-PRODUCT-TREATED-AS-POINTWISE-MULTIPLICATION
- **Surface form**: believing the product of two generating functions corresponds to term-by-term
  multiplication of the underlying sequences, rather than convolution.
- **Frequency band**: Foundational (Blueprint's own declared severity).
- **Root cause (Type 1, overgeneralization)**: ordinary algebraic multiplication of two sums
  distributes term-by-term when the terms are aligned by a shared index (as in a dot product), and
  that pattern is overgeneralized to generating-function multiplication, missing that multiplying
  two POWER SERIES combines terms whose exponents ADD, not whose indices match.
- **Repair**: re-derive the convolution sum explicitly, $c_n=\sum_{k=0}^na_kb_{n-k}$, for a
  specific small $n$ (e.g. $n=2$ for two copies of the constant-1 sequence), verifying
  $c_2=a_0b_2+a_1b_1+a_2b_0=1+1+1=3$ matches the correct expansion of $\frac1{(1-x)^2}$.

### MC-2: PARTIAL-FRACTION-CONSTANTS-MISCOMPUTED
- **Surface form**: making an algebraic error solving for the partial-fraction decomposition's
  constants, propagating an incorrect closed-form sequence formula.
- **Frequency band**: Moderate (Blueprint's own declared severity).
- **Root cause (Type 1, overgeneralization)**: the clearing-denominators technique is executed
  correctly in simpler algebra contexts but the extra bookkeeping of two distinct linear factors,
  each demanding its own substitution value, is overgeneralized as "the same one-step process"
  rather than two separate substitutions.
- **Repair**: re-derive the constants via the standard clearing-denominators method, verifying by
  substituting back the specific values of $x$ that isolate each constant in turn.

### MC-3: OGF-COEFFICIENT-EXTRACTION-INDEX-CONFUSED
- **Surface form**: confusing which power of $x$ corresponds to which sequence index when reading
  a coefficient off an OGF, especially for series with shifted or scaled exponents.
- **Frequency band**: Moderate (Blueprint's own declared severity).
- **Root cause (Type 4, notation-induced)**: the plain case $A(x)=\sum a_nx^n$ trains a reflex of
  "the exponent IS the index," and that reflex misfires the moment the series is written with a
  scaled exponent like $\frac1{1-x^5}=\sum x^{5n}$, where most powers of $x$ carry a coefficient of
  zero and only every fifth one is nonzero.
- **Repair**: re-expand the series explicitly term by term for a shifted/scaled case, showing
  which power of $x$ genuinely appears and which are structurally absent.

## Misconceptions

### MC-1: OGF-PRODUCT-TREATED-AS-POINTWISE-MULTIPLICATION
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: PARTIAL-FRACTION-CONSTANTS-MISCOMPUTED
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-3: OGF-COEFFICIENT-EXTRACTION-INDEX-CONFUSED
- **Surface form**: as described above.
- **Root cause (Type 4)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Convolution is a sliding-window handshake: for each total $n$, every way of splitting it
  between the two sequences' indices contributes its own term to the sum."**
- **Anti-analogy**: the product of two generating functions is NOT a "vector dot product" or an
  "elementwise array multiply" — those operations align matching indices; convolution instead
  slides one sequence past the other and sums every alignment.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: multiply $A(x)=\frac1{1-x}$ by itself and show the result is
  $\frac1{(1-x)^2}=\sum(n+1)x^n$ — sequence $1,2,3,4,\ldots$ — genuinely different from the
  pointwise guess $1,1,1,\ldots$.
- **Demonstration 2 (targets MC-2)**: decompose $\frac1{(1-2x)(1-3x)}$ into
  $\frac{-2}{1-2x}+\frac3{1-3x}$, expand each geometric series, and combine to get
  $a_n=-2^{n+1}+3^{n+1}$ — matching the closed form `math.disc.linear-recurrence` would produce
  for $a_n=5a_{n-1}-6a_{n-2}$, whose characteristic roots are 2 and 3.
- **Demonstration 3 (targets MC-3)**: expand $\frac1{1-x^5}$ term by term, showing coefficients
  of $1$ at $x^0,x^5,x^{10},\ldots$ and $0$ everywhere else, so "the coefficient of $x^7$" is
  correctly read as $0$, not confused with a 7th sequence term.

## Discovery Questions
1. "If you multiply the series for $1,1,1,\ldots$ by itself, is every coefficient of the product
   still $1$, or does something else happen?"
2. "When you decompose a fraction like $\frac1{(1-2x)(1-3x)}$ into two simpler fractions, are the
   two constants you solve for found the same way, or does each need its own substitution?"
3. "In the series $\frac1{1-x^5}$, does EVERY power of $x$ have a nonzero coefficient, or only
   some of them?"

## Teaching Sequence
1. **Anchor**: connect to `math.disc.generating-functions`'s own coefficient-extraction framing,
   presenting the OGF as the same idea specialized for unlabeled structures.
2. **Conflict evidence**: the pointwise-multiplication guess versus the correct convolution
   computation for $\frac1{(1-x)^2}$.
3. **Contrast pair**: the two-constant partial-fraction decomposition versus a naive single-step
   guess, and the shifted-exponent series versus the plain case.
4. **Mastery gate**: require writing/reading an OGF, computing a convolution coefficient, and
   decomposing a rational OGF into closed form, at MAMR 4/5.

## Tutor Actions
- Never accept a stated product of two OGFs without requiring the learner to compute at least one
  coefficient via the explicit convolution sum.
- When a rational OGF decomposition is presented, require the learner to state which substitution
  value isolates each constant before accepting the final answer.

## Voice Teaching Notes
- Say "slide and sum, not match and multiply" whenever a learner starts multiplying corresponding
  terms of two sequences instead of convolving.
- When a learner misreads a shifted-exponent series, ask "does every power of $x$ actually show up
  in this series, or only some of them?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly writes the OGF for a given sequence and reads a
  sequence term off a given OGF.
- **Rung 2 (application)**: learner correctly computes a convolution coefficient from the product
  of two OGFs.
- **Rung 3 (transfer)**: learner correctly decomposes a rational OGF via partial fractions into a
  closed-form sequence formula and connects it to the corresponding characteristic-root solution.

## Tutor Recovery Strategy
- If MC-1 recurs, re-run the explicit convolution-sum derivation for a specific small $n$.
- If MC-2 recurs, re-run the clearing-denominators method with explicit substitution values.
- If MC-3 recurs, re-expand the shifted/scaled series term by term.

## Memory Hooks
- "Convolution: sum over every way to split $n$ between the two sequences — never a term-by-term
  match."
- "Two constants, two substitutions — partial fractions need one value per factor."
- "Shifted exponents skip coefficients — check which powers of $x$ actually appear."

## Transfer Connections
- `math.disc.generating-functions` (already authored): supplies the general encoding-as-a-formal-
  power-series idea this concept specializes for unlabeled structures.
- `math.disc.linear-recurrence` (already authored): its characteristic-root closed-form solutions
  are exactly what this concept's partial-fraction decomposition recovers via a different route.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.disc.ogf.md`, reused by reference for its
  three worked examples (writing/reading an OGF, convolution-as-product, partial-fraction closed
  form) and its three-misconception registry (birth types independently classified, since this
  Blueprint states severity but not birth type).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe (the coin-change
  vending-machine problem, explaining why the combined-coin-type OGF is a PRODUCT of the two
  single-coin-type OGFs via the product-as-convolution idea, and previewing the expected shape of
  its partial-fraction decomposition).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires, unlocks none,
  cross_links none, expert/apply, mastery_threshold 0.75, estimated_hours 5) was directly verified
  against the live KG and matches exactly.

## Version History
- 2026-09-13 (Batch 70): authored. Unblocked by `math.disc.generating-functions` (Batch 69).
  Companion batch concepts: `math.disc.egf`, `math.disc.complexity-classes`. `math.disc` moves
  toward **31/32** this batch — only `graph-representation` remains, blocked on unauthored
  `math.linalg.matrix`.
