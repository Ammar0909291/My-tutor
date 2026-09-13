# math.seq.ratio-test

## Identity
- **KG id**: `math.seq.ratio-test`
- **Domain**: math.seq
- **Requires**: `math.seq.series-convergence`
- **Unlocks**: none (per the live KG — see Curriculum Feedback: the Blueprint names
  `math.seq.root-test`)
- **Cross-links**: none
- **Difficulty**: advanced
- **Bloom level**: apply
- **Mastery threshold**: 0.75
- **Estimated hours**: 5

## Learning Objective
State and apply D'Alembert's Ratio Test — compute $L=\lim_{n\to\infty}|a_{n+1}/a_n|$, concluding
convergence if $L<1$, divergence if $L>1$, and INCONCLUSIVE if $L=1$; recognize the test's natural
domain — series involving factorials or exponentials, where the ratio collapses cleanly — and its
universal failure ($L=1$ always) on purely polynomial or rational series, which need a different
tool entirely.

## Core Understanding
The Ratio Test formalizes an intuition already familiar from `math.seq.series-convergence`'s own
geometric series: if the ratio of successive terms EVENTUALLY behaves like a fixed constant $L$,
the series inherits geometric-series-like convergence behavior. Formally, if
$L=\lim_{n\to\infty}|a_{n+1}/a_n|$ exists: when $L<1$, choosing any $r$ with $L<r<1$ shows
$|a_n|<Cr^n$ eventually, so $\sum|a_n|$ is bounded by a convergent geometric series — the original
series converges ABSOLUTELY. When $L>1$, the terms eventually GROW ($|a_{n+1}|>|a_n|$), so
$a_n\not\to0$, forcing divergence by the divergence test. When $L=1$, NEITHER argument applies —
the test gives no information whatsoever, since both a convergent series ($\sum1/n^2$) and a
divergent one ($\sum1/n$) yield $L=1$.

The test's genuine POWER shows up precisely where factorial or exponential terms appear: for
$a_n=2^n/n!$, the ratio $a_{n+1}/a_n=2/(n+1)\to0$ collapses almost immediately, since consecutive
factorial and exponential factors cancel cleanly ($(n+1)!/n!=n+1$; $2^{n+1}/2^n=2$). This is
exactly why the ratio test is the natural first choice whenever $n!$ or $r^n$ appears in $a_n$ —
the successive-term ratio simplifies dramatically, where a direct comparison test would require a
separately-justified bound.

The test's LIMITATION is equally structural, not incidental: for ANY $p$-series $a_n=1/n^p$,
$|a_{n+1}/a_n|=(n/(n+1))^p\to1^p=1$ regardless of the value of $p$ — so the ratio test can never
distinguish a convergent $p$-series from a divergent one, always returning the uninformative
$L=1$. This is the precise, provable reason the ratio test is the wrong tool for purely
polynomial or rational series, where comparison-based tests (Direct/Limit Comparison, the $p$-
series test itself, or the integral test) are needed instead.

## Mental Models
- **"$L<1$ converges, $L>1$ diverges, $L=1$ means the test says NOTHING — not divergence, not
  convergence."**
- **"Factorial or exponential in $a_n$? Reach for the ratio test — the successive-term ratio
  collapses cleanly."**
- **"Purely polynomial/rational $a_n$? The ratio test always gives $L=1$ — don't bother; use
  comparison or the $p$-series test instead."**

## Why Students Fail

### MC-1: RATIO-TEST-L=1-MEANS-DIVERGES
- **Surface form**: seeing $L=1$ and concluding the series diverges, rather than recognizing the
  test is genuinely inconclusive at that value.
- **Frequency band**: Foundational (the Blueprint's own declared foundational misconception — the
  most frequent error, occurring AFTER an otherwise-correct computation, at the terminal decision
  step).
- **Root cause (Type 1, overgeneralization)**: the clean, decisive $L<1$/$L>1$ cases are practiced
  far more often, so the boundary case $L=1$ is assimilated into one of those two familiar verdicts
  rather than recognized as its own genuinely distinct, uninformative outcome.
- **Repair**: hold both $\sum1/n$ (diverges) and $\sum1/n^2$ (converges) in mind simultaneously as
  two series that BOTH give $L=1$ — proof by direct counterexample that $L=1$ cannot determine the
  outcome either way.

### MC-2: FACTORIAL-ALGEBRA-ERROR
- **Surface form**: simplifying $(n+1)!/n!$ as $n$ or $1$ instead of the correct $n+1$, or
  mishandling the substitution $n\to n+1$ throughout $a_{n+1}$ when factorials appear.
- **Frequency band**: High.
- **Root cause (Type 4, notation-induced)**: the factorial notation $(n+1)!$ visually resembles a
  simple increment of $n!$, obscuring that it expands to an entirely new product
  $(n+1)\cdot n\cdot(n-1)\cdots1=(n+1)\cdot n!$.
- **Repair**: explicitly expand $(n+1)!=(n+1)\cdot n!$ step by step before cancelling, rather than
  attempting to simplify the ratio in one mental step.

### MC-3: RATIO-TEST-UNIVERSAL
- **Surface form**: applying the ratio test to every convergence problem, including simple
  $p$-series and polynomial/rational series, repeatedly reaching the uninformative $L=1$ and
  getting stuck.
- **Frequency band**: Moderate.
- **Root cause (Type 1, overgeneralization)**: the ratio test's genuine power on
  factorial/exponential series is overgeneralized into treating it as a universal first-choice
  tool for any convergence question.
- **Repair**: explicitly derive that EVERY $p$-series yields $L=1$ under the ratio test (a single
  general computation, not case-by-case), establishing structurally why the test cannot help
  there.

## Misconceptions

### MC-1: RATIO-TEST-L=1-MEANS-DIVERGES
- **Surface form**: as described above.
- **Frequency band**: Foundational.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: FACTORIAL-ALGEBRA-ERROR
- **Surface form**: as described above.
- **Frequency band**: High.
- **Root cause (Type 4)**: as described above.
- **Repair**: as described above.

### MC-3: RATIO-TEST-UNIVERSAL
- **Surface form**: as described above.
- **Frequency band**: Moderate.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

## Analogies
- **"The ratio test asks: does each new term shrink by roughly a fixed fraction of the last one? —
  exactly the geometric-series question, transplanted."**
- **Anti-analogy**: $L=1$ is NOT a verdict of any kind — it is the absence of a verdict, structurally
  different from both $L<1$ and $L>1$, which genuinely do decide the outcome.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: compute the ratio test on both $\sum1/n$ (diverges) and
  $\sum1/n^2$ (converges), showing both give $L=1$ — proof the value alone cannot distinguish
  them.
- **Demonstration 2 (targets MC-2)**: for $a_n=n!/3^n$, expand $(n+1)!=(n+1)\cdot n!$ explicitly
  before simplifying $a_{n+1}/a_n=(n+1)/3\to\infty$.
- **Demonstration 3 (targets MC-3)**: derive, generally, that $a_n=1/n^p$ gives
  $|a_{n+1}/a_n|=(n/(n+1))^p\to1$ for every value of $p$, showing the ratio test's universal
  failure on this entire family in one computation.

## Discovery Questions
1. "If both a convergent and a divergent series can give $L=1$ under the ratio test, what can you
   actually conclude when you compute $L=1$?"
2. "What does $(n+1)!$ actually expand to, in terms of $n!$?"
3. "Does the ratio $a_{n+1}/a_n$ ever depend on $p$ in the limit, for $a_n=1/n^p$?"

## Teaching Sequence
1. **Anchor**: connect to `math.seq.series-convergence`'s geometric series, framing the ratio test
   as detecting geometric-series-like behavior in the successive-term ratio.
2. **Conflict evidence**: two series ($\sum1/n$, $\sum1/n^2$) both giving $L=1$ despite opposite
   fates.
3. **Contrast pair**: a factorial/exponential series (ratio test collapses cleanly) versus a
   polynomial series (ratio test always gives $L=1$).
4. **Mastery gate**: require computing $L$ correctly for a factorial series, correctly identifying
   $L=1$ as inconclusive (not divergence), and naming an appropriate alternative test when it
   occurs.

## Tutor Actions
- Never accept "$L=1$, so it diverges" as a valid conclusion — always require the learner to name
  a different test when $L=1$ is reached.
- When a factorial ratio is simplified, require the learner to expand $(n+1)!=(n+1)\cdot n!$
  explicitly before accepting the cancellation.

## Voice Teaching Notes
- Say "$L=1$ means the test is silent, not that the series diverges" whenever that boundary value
  arises.
- When a learner reaches for the ratio test on a purely polynomial series, ask "does this series
  have a factorial or an exponential in it?" before allowing the attempt to proceed.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly states the three-case decision rule, including that
  $L=1$ is inconclusive.
- **Rung 2 (application)**: learner correctly computes $L$ for a factorial or exponential series,
  including correct factorial-ratio simplification.
- **Rung 3 (transfer)**: learner correctly recognizes when the ratio test is the WRONG tool
  (polynomial/rational series) and names an appropriate alternative.

## Tutor Recovery Strategy
- If MC-1 recurs, re-run the $\sum1/n$-versus-$\sum1/n^2$ counterexample.
- If MC-2 recurs, re-run the explicit factorial-expansion demonstration.
- If MC-3 recurs, re-derive the general $p$-series $L=1$ result.

## Memory Hooks
- "$L<1$ converges, $L>1$ diverges, $L=1$ says NOTHING."
- "$(n+1)!=(n+1)\cdot n!$ — expand before you cancel."
- "Factorial or exponential? Ratio test. Polynomial only? Skip it — always $L=1$."

## Transfer Connections
- `math.seq.series-convergence` (already authored): supplies the geometric series comparison
  argument this test's convergence proof directly extends.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.seq.ratio-test.md`, reused by reference for
  its geometric-series-comparison derivation, its factorial/exponential worked examples, its
  general $p$-series $L=1$ derivation, and its three-misconception registry (independently
  birth-type-classified above from the Blueprint's own trigger/description language).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe (classifying
  $\sum n^2/3^n$ via the ratio test).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Genuine Blueprint/KG metadata discrepancy found, resolved toward the KG**: the Blueprint's own
  Component 7 states `Unlocks: math.seq.root-test`, but direct KG query confirms `unlocks: []`
  for this concept in the live KG. This entry's Identity section uses the KG's value (the two
  concepts do share the sibling prerequisite `math.seq.series-convergence`, but that relationship
  is not mirrored onto this concept's own `unlocks` field).

## Version History
- 2026-09-13 (Batch 67): authored. Unblocked by `math.seq.series-convergence` (Batch 63).
  Companion batch concepts: `math.seq.absolute-convergence`, `math.seq.integral-test`,
  `math.seq.root-test`. `math.seq` moves toward **20/21** this batch.
