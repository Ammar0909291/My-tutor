# math.seq.root-test

## Identity
- **KG id**: `math.seq.root-test`
- **Domain**: math.seq
- **Requires**: `math.seq.series-convergence`
- **Unlocks**: none (per the live KG — see Curriculum Feedback: the Blueprint names
  `math.seq.absolute-convergence`)
- **Cross-links**: none
- **Difficulty**: advanced
- **Bloom level**: apply
- **Mastery threshold**: 0.7
- **Estimated hours**: 4

## Learning Objective
State Cauchy's Root Test — compute $L=\lim_{n\to\infty}|a_n|^{1/n}$, concluding convergence if
$L<1$, divergence if $L>1$, and inconclusive if $L=1$; recognize $n$th-power series
($a_n=(f(n))^n$) as the test's natural domain, where the $n$th root collapses the exponent
immediately; and correctly apply the key limit $\lim_{n\to\infty}n^{1/n}=1$, recognizing that any
polynomial factor raised to the $1/n$ power vanishes into $1$ in the limit.

## Core Understanding
Like `math.seq.ratio-test`'s companion test, the Root Test is grounded in geometric-series
comparison: if $|a_n|^{1/n}\to L$, then for large $n$, $|a_n|\approx L^n$ — the series behaves
like a geometric series with ratio $L$. When $L<1$, $|a_n|<r^n$ eventually for some $r$ between
$L$ and $1$, giving absolute convergence by comparison with a convergent geometric series; when
$L>1$, $|a_n|^{1/n}>1$ eventually forces $|a_n|>1$, so $a_n\not\to0$ and the series diverges by
the divergence test; when $L=1$, exactly as with the ratio test, no conclusion is available.

The test's natural domain is series ALREADY written as an $n$th power, $a_n=(f(n))^n$: taking the
$n$th root collapses the outer exponent immediately, leaving just $|f(n)|$ to evaluate a limit
on. A CRITICAL prerequisite limit makes this work correctly even when $f(n)$ contains polynomial
factors: $\lim_{n\to\infty}n^{1/n}=1$ (provable via $\ln(n^{1/n})=(\ln n)/n\to0$, so
$n^{1/n}\to e^0=1$). As a direct consequence, ANY fixed power $n^p$ raised to the $1/n$ exponent
also tends to $1$ — $(n^p)^{1/n}=n^{p/n}\to1^p=1$ — meaning polynomial factors inside an $n$th
power are asymptotically INVISIBLE after taking the root: only the exponential "base" factor
survives in the limit.

The Root Test is provably STRICTLY STRONGER than the Ratio Test: whenever the ratio test's limit
$\lim|a_{n+1}/a_n|$ exists and equals some finite $L$, the root test gives the identical value.
But the reverse is not guaranteed — there exist series where the ratio's limit fails to exist
outright while the root test's limit (using $\limsup$ in full generality) still gives a clean,
definitive answer. In PRACTICE, however, the two tests are usually chosen by which form is
EASIER to compute: an $n$th-power series ($a_n=(f(n))^n$) collapses instantly under the root test,
while a factorial or exponential-ratio series ($n!$ or $r^n$, not itself raised to the $n$th
power) simplifies far more readily under the ratio test's successive-term cancellation — applying
the root test to a factorial series requires Stirling's approximation and is genuinely harder,
even though it still eventually works.

## Mental Models
- **"An $n$th-power series ($(f(n))^n$)? Root test — the root collapses the exponent in one
  step."**
- **"$\lim n^{1/n}=1$ — any polynomial factor disappears into $1$ after taking the $n$th root."**
- **"Root test is strictly stronger than ratio test in theory, but in practice each is chosen for
  whichever form is EASIER to compute."**

## Why Students Fail

### MC-1: ROOT-AND-RATIO-ALWAYS-SAME
- **Surface form**: assuming the root test and ratio test always produce identical results,
  unaware the root test is strictly stronger and can succeed where the ratio test's limit fails to
  exist.
- **Frequency band**: Moderate.
- **Root cause (Type 1, overgeneralization)**: on the vast majority of practiced examples, the two
  tests genuinely agree (whenever the ratio's limit exists, the root's limit equals it), so this
  frequent agreement is generalized into an assumed universal equivalence.
- **Repair**: present a case where the root test resolves a series cleanly in one line while the
  ratio test would require extracting a nontrivial exponential limit, showing the two tests are
  distinct computations that happen to often (not always) agree.

### MC-2: NTH-ROOT-OF-N-IS-N
- **Surface form**: computing $(n^p)^{1/n}$ as $n^p$ itself, omitting the effect of the $1/n$
  exponent, rather than correctly obtaining $n^{p/n}\to1$.
- **Frequency band**: Foundational (the Blueprint's own declared foundational misconception — once
  $\lim n^{1/n}=1$ is forgotten, errors cascade through every problem involving polynomial
  factors).
- **Root cause (Type 4, notation-induced)**: the exponent $1/n$ applied to an already-exponentiated
  base $n^p$ is easy to overlook visually, since the notation $(n^p)^{1/n}$ superficially
  resembles a simplification that should just leave $n^p$ unless carefully expanded.
- **Repair**: explicitly derive $\lim n^{1/n}=1$ via the logarithm argument
  ($\ln(n^{1/n})=(\ln n)/n\to0$) before applying it, rather than treating it as a fact to recall
  from memory alone.

### MC-3: ROOT-TEST-ON-FACTORIAL-SERIES
- **Surface form**: applying the root test to a series containing $n!$, where the $n$th root does
  not simplify cleanly, when the ratio test is uniformly easier for that series shape.
- **Frequency band**: Moderate.
- **Root cause (Type 6, analogy overextension)**: the root test's genuine cleanliness on $n$th-power
  series is over-extended to any series at all, without recognizing that a series NOT already
  written as an $n$th power (like one containing $n!$) doesn't benefit from the same collapse.
- **Repair**: compute the SAME factorial series with both tests side by side, showing the ratio
  test's one-line factorial cancellation against the root test's Stirling-approximation-dependent
  computation reaching the identical answer with more effort.

## Misconceptions

### MC-1: ROOT-AND-RATIO-ALWAYS-SAME
- **Surface form**: as described above.
- **Frequency band**: Moderate.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: NTH-ROOT-OF-N-IS-N
- **Surface form**: as described above.
- **Frequency band**: Foundational.
- **Root cause (Type 4)**: as described above.
- **Repair**: as described above.

### MC-3: ROOT-TEST-ON-FACTORIAL-SERIES
- **Surface form**: as described above.
- **Frequency band**: Moderate.
- **Root cause (Type 6)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Taking the $n$th root of an $n$th-power series is like peeling a label off its own box — the
  outer exponent simply vanishes, revealing what's inside."**
- **Anti-analogy**: the root test is NOT merely "the ratio test in disguise" — it is a genuinely
  different computation (an $n$th root of the WHOLE term, not a ratio of successive terms) that
  happens to usually, but not universally, agree with it.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: apply both tests to $\sum(3n/(2n+1))^n$ — root test
  resolves it in one line ($L=3/2$), while the ratio test requires extracting a nontrivial
  $(1+1/n)^n\to e$-type limit.
- **Demonstration 2 (targets MC-2)**: derive $\lim n^{1/n}=1$ via
  $\ln(n^{1/n})=(\ln n)/n\to0$, then apply it to compute $\lim(n^2\cdot(1/3)^n)^{1/n}=1/3$
  correctly.
- **Demonstration 3 (targets MC-3)**: compute $\sum2^n/n!$'s convergence via the ratio test (one
  line: $L=0$) versus the root test (requiring Stirling's approximation
  $(n!)^{1/n}\sim n/e$), showing both reach $L=0$ but the ratio test is far simpler.

## Discovery Questions
1. "If the root test can succeed even when the ratio test's limit doesn't exist, does that mean
   the two tests are the same computation?"
2. "What happens to $n^{1/n}$ as $n$ grows very large — does it grow, shrink, or settle toward a
   fixed number?"
3. "If a series contains $n!$ rather than being written as an $n$th power, is the root test still
   the easiest tool?"

## Teaching Sequence
1. **Anchor**: connect to `math.seq.series-convergence`'s geometric series, framing the root test
   as detecting geometric-series-like behavior via the $n$th root of the whole term.
2. **Conflict evidence**: an $n$th-power series where the root test is dramatically simpler than
   the ratio test, refuting the "they're always the same effort" assumption.
3. **Contrast pair**: the root test applied to its natural domain ($n$th-power series) versus a
   factorial series (root test technically works but is harder than the ratio test).
4. **Mastery gate**: require correctly computing $L$ for an $n$th-power series (including correct
   handling of polynomial factors via $\lim n^{1/n}=1$), and correctly choosing between the root
   and ratio tests for a given series shape.

## Tutor Actions
- Never accept $(n^p)^{1/n}=n^p$ as a valid simplification — require the learner to apply
  $\lim n^{1/n}=1$ explicitly.
- When a learner reaches for the root test on a factorial series, ask whether the ratio test might
  be simpler before allowing the (harder, Stirling-dependent) computation to proceed.

## Voice Teaching Notes
- Say "the $n$th root of $n$th power collapses instantly — that's the whole point" whenever
  introducing the test's natural domain.
- When a learner keeps a polynomial factor unchanged after taking the root, ask "what does
  $n^{1/n}$ actually approach as $n$ grows?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly states the three-case decision rule for the root
  test.
- **Rung 2 (application)**: learner correctly computes $L$ for an $n$th-power series, including
  correctly applying $\lim n^{1/n}=1$ to any polynomial factor present.
- **Rung 3 (transfer)**: learner correctly chooses between the root test and the ratio test based
  on a given series' shape, justifying the choice by relative computational ease.

## Tutor Recovery Strategy
- If MC-1 recurs, re-run the root-versus-ratio effort contrast on a series where they differ in
  difficulty.
- If MC-2 recurs, re-derive $\lim n^{1/n}=1$ from the logarithm argument.
- If MC-3 recurs, re-run the factorial-series side-by-side comparison.

## Memory Hooks
- "$n$th-power series? Root test collapses it in one step."
- "$\lim n^{1/n}=1$ — polynomial factors vanish after the root."
- "Root test is stronger in theory, but pick whichever test is EASIER for the series in front of
  you."

## Transfer Connections
- `math.seq.series-convergence` (already authored): supplies the geometric series comparison
  argument this test's convergence proof directly extends.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.seq.root-test.md`, reused by reference for
  its geometric-series-comparison derivation, its $\lim n^{1/n}=1$ proof, its root-versus-ratio
  effort contrasts, and its three-misconception registry (independently birth-type-classified
  above from the Blueprint's own trigger/description language).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe (classifying
  $\sum(3n/(2n+1))^n$ via the root test).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Genuine Blueprint/KG metadata discrepancy found, resolved toward the KG**: the Blueprint's own
  Component 7 states `Unlocks: math.seq.absolute-convergence`, but direct KG query confirms
  `unlocks: []` for this concept in the live KG. This entry's Identity section uses the KG's
  value (this batch's third such `math.seq.*` `unlocks`-field discrepancy against the same
  sibling-relationship pattern already seen for `absolute-convergence`, `integral-test`, and
  `ratio-test`).

## Version History
- 2026-09-13 (Batch 67): authored. Unblocked by `math.seq.series-convergence` (Batch 63).
  Companion batch concepts: `math.seq.absolute-convergence`, `math.seq.integral-test`,
  `math.seq.ratio-test`. `math.seq` reaches **21/21 — DOMAIN CERTIFIED** this batch (all 4
  concepts authored, closing the domain entirely).
