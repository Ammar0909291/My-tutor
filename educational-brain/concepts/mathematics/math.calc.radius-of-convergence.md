# math.calc.radius-of-convergence

## Identity
- **KG id**: `math.calc.radius-of-convergence`
- **Domain**: math.calc
- **Requires**: `math.calc.power-series`, `math.seq.ratio-test`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: advanced
- **Bloom level**: apply
- **Mastery threshold**: 0.75
- **Estimated hours**: 5

## Learning Objective
Find the radius of convergence $R$ of a power series $\sum c_n(x-a)^n$ by applying
`math.seq.ratio-test`'s ratio test to the series' general term; state that the series converges
absolutely for $|x-a|<R$ and diverges for $|x-a|>R$, while recognizing the two endpoints
$x=a\pm R$ require SEPARATE checking since the ratio test is inconclusive exactly there; and
correctly report the full interval of convergence by testing each endpoint independently.

## Core Understanding
`math.calc.power-series` studies series of the form $\sum c_n(x-a)^n$ in general, and
`math.seq.ratio-test` provides the tool: computing
$L=\lim_{n\to\infty}\left|\frac{c_{n+1}(x-a)^{n+1}}{c_n(x-a)^n}\right|$ and solving $L<1$ for $x$
directly determines the RADIUS of convergence $R$ — the series converges absolutely for
$|x-a|<R$ and diverges for $|x-a|>R$. A special case deserves explicit attention: if the ratio
test's limit is $0$ REGARDLESS of $x$ (as happens whenever a factorial or similarly
fast-growing denominator dominates), the inequality $L<1$ holds for EVERY value of $x$, meaning
$R=\infty$ — the series converges everywhere, not nowhere.

The ratio test is, by its own nature, INCONCLUSIVE exactly where $L=1$ — and this happens
precisely AT the two endpoints $x=a-R$ and $x=a+R$. The radius-of-convergence computation itself
says nothing whatsoever about behavior at these two specific points; each endpoint must be
substituted into the ORIGINAL series and tested SEPARATELY, typically with a different tool
entirely (the alternating series test, a comparison test, or the divergence test) — not the ratio
test that found $R$ in the first place.

Critically, the two endpoints are two GENUINELY DIFFERENT series once substituted — there is no
structural reason they must behave the same way, and in fact they routinely don't. Substituting
$x=a+R$ into $\sum c_n(x-a)^n$ typically produces an all-positive (or otherwise non-alternating)
series, while substituting $x=a-R$ typically introduces an alternating sign pattern $(-1)^n$ —
two series with entirely different convergence behavior despite being "the same distance" from
the center. The full INTERVAL of convergence — $(a-R,a+R)$, $[a-R,a+R)$, $(a-R,a+R]$, or
$[a-R,a+R]$ — is only complete once both endpoints have been checked individually and their
inclusion or exclusion stated explicitly.

## Mental Models
- **"$L=0$ for every $x$ means $R=\infty$ — universal convergence, the OPPOSITE of $R=0$."**
- **"The ratio test is silent exactly at the two endpoints — that silence is not an answer, it's a
  demand for a separate check."**
- **"Each endpoint substitutes into a genuinely different series — never assume they match."**

## Why Students Fail

### MC-1: RATIO-TEST-LIMIT-OF-ZERO-MISINTERPRETED-AS-RADIUS-ZERO
- **Surface form**: misinterpreting a ratio-test limit of $0$ (true for every $x$) as meaning the
  radius of convergence is $0$, rather than infinite.
- **Frequency band**: Foundational.
- **Root cause (Type 1, overgeneralization)**: the number "$0$" is visually and intuitively
  associated with "nothing," so a limit value of $0$ is misread as signaling a vanishing radius
  rather than correctly recognizing that $0<1$ is satisfied unconditionally.
- **Repair**: re-state the ratio test's actual logic explicitly — the criterion is $L<1$, and $0$
  is always less than $1$ regardless of $x$'s value, so every $x$ satisfies the convergence
  condition.

### MC-2: ENDPOINTS-ASSUMED-TO-BEHAVE-IDENTICALLY-WITHOUT-SEPARATE-CHECKING
- **Surface form**: assuming both endpoints of the interval of convergence must behave the same
  way (either both included or both excluded), without checking each one as an independent
  series.
- **Frequency band**: Foundational.
- **Root cause (Type 1, overgeneralization)**: the two endpoints are symmetric in DISTANCE from
  the center, and this geometric symmetry is incorrectly overgeneralized into an assumption of
  symmetric CONVERGENCE BEHAVIOR, which the substituted series need not share.
- **Repair**: substitute each endpoint into the original series separately, showing the two
  resulting series are structurally different (e.g. one alternating, one not) and must be judged
  independently.

## Misconceptions

### MC-1: RATIO-TEST-LIMIT-OF-ZERO-MISINTERPRETED-AS-RADIUS-ZERO
- **Surface form**: as described above.
- **Frequency band**: Foundational.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: ENDPOINTS-ASSUMED-TO-BEHAVE-IDENTICALLY-WITHOUT-SEPARATE-CHECKING
- **Surface form**: as described above.
- **Frequency band**: Foundational.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

## Analogies
- **"The radius tells you the safe zone; the two boundary fence-posts each need their own
  inspection."**
- **Anti-analogy**: the radius of convergence is NOT a single number that fully answers the
  convergence question — it leaves exactly two points genuinely open, each requiring its own
  separate resolution.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: for $\sum\frac{(x-2)^n}{n!}$, compute the ratio test limit
  $\lim\left|\frac{x-2}{n+1}\right|=0$ for every $x$, concluding $R=\infty$ rather than $R=0$.
- **Demonstration 2 (targets MC-2)**: for $\sum_{n=1}^\infty\frac{(x-1)^n}{n}$ ($R=1$), show
  $x=2$ gives the divergent harmonic series while $x=0$ gives the convergent alternating harmonic
  series — the interval is $[0,2)$, not symmetric.
- **Demonstration 3**: for $\sum n\cdot x^n$, compute $L=\lim\frac{n+1}{n}|x|=|x|$, giving $R=1$
  as a standard clean application before any endpoint analysis.

## Discovery Questions
1. "If the ratio-test limit is $0$ no matter what $x$ is, does that mean the series converges
   nowhere, or everywhere?"
2. "Once you find $R$, does the radius formula tell you anything about what happens exactly at
   $x=a+R$ or $x=a-R$?"
3. "If you substitute the two endpoints into the original series, do you get the SAME series
   twice, or two different ones?"

## Teaching Sequence
1. **Anchor**: connect to `math.calc.power-series`'s general series form and `math.seq.ratio-test`'s
   three-case decision rule, framing this concept as their direct combination.
2. **Conflict evidence**: a ratio-test limit of $0$ (for all $x$) correctly interpreted as
   $R=\infty$, not $R=0$.
3. **Contrast pair**: the two endpoints of a specific series, substituted separately, showing
   genuinely different convergence behavior.
4. **Mastery gate**: require finding $R$ via the ratio test, correctly interpreting an
   edge-case limit, and reporting the full interval of convergence with both endpoints checked.

## Tutor Actions
- Never accept a stated radius of convergence without the learner explaining what the ratio
  test's limit value actually signifies.
- Never accept a full interval of convergence until BOTH endpoints have been substituted into the
  original series and tested individually.

## Voice Teaching Notes
- Say "the radius doesn't answer the endpoints — that's a separate question" whenever the radius
  itself is found.
- When a learner claims $L=0$ means $R=0$, ask "is $0$ less than $1$?" to redirect to the actual
  criterion.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly finds the radius of convergence via the ratio test,
  including correctly interpreting $L=0$ as $R=\infty$.
- **Rung 2 (application)**: learner correctly substitutes both endpoints into the original series
  and determines each one's convergence independently.
- **Rung 3 (transfer)**: learner correctly reports the full interval of convergence with the
  correct inclusion/exclusion at each endpoint.

## Tutor Recovery Strategy
- If MC-1 recurs, re-run the $L=0$-for-all-$x$ reinterpretation.
- If MC-2 recurs, re-run the two-endpoints-substituted-separately demonstration.

## Memory Hooks
- "$L=0$ for every $x$ means $R=\infty$ — the opposite of what it might look like."
- "The radius formula is silent at the endpoints — silence means 'go check it yourself.'"
- "Each endpoint is its own series — never assume matching fates."

## Transfer Connections
- `math.calc.power-series` (already authored): supplies the general power-series form this
  concept's radius describes.
- `math.seq.ratio-test` (already authored): supplies the primary computational tool for finding
  $R$.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.calc.radius-of-convergence.md`, reused by
  reference for its $R=\infty$ factorial example, its asymmetric-endpoint example
  ($[0,2)$), and its two-misconception registry (independently birth-type-classified above,
  since the Blueprint carries severity labels but no birth-type column).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe (an engineer
  determining a nonlinear circuit's safe voltage range via a power-series approximation's radius
  of convergence).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- No genuine Blueprint/KG metadata discrepancy found: requires, unlocks, cross_links, difficulty,
  bloom, mastery_threshold, and estimated_hours all match the live KG exactly.

## Version History
- 2026-09-13 (Batch 68): authored. Unblocked by `math.calc.power-series` (Batch 64) and
  `math.seq.ratio-test` (Batch 67). Companion batch concepts: `math.disc.catalan-numbers`,
  `math.disc.divide-conquer-recurrence`, `math.disc.linear-recurrence`. `math.calc` moves from
  **74/76** toward **75/76** this batch — only `change-of-variables` remains (blocked on
  unauthored `math.linalg.determinant`).
