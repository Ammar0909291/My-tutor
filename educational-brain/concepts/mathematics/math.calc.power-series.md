# math.calc.power-series

## Identity
- **KG id**: `math.calc.power-series`
- **Domain**: math.calc
- **Requires**: `math.seq.series-convergence`
- **Unlocks**: `math.calc.taylor-series`, `math.calc.maclaurin-series`
- **Cross-links**: none
- **Difficulty**: advanced
- **Bloom level**: analyze
- **Mastery threshold**: 0.75
- **Estimated hours**: 10

## Learning Objective
Define a power series $\sum c_n(x-a)^n$ and find its radius of convergence $R$ via the ratio
test; determine the FULL interval of convergence by separately testing BOTH endpoints (since the
ratio test is inconclusive exactly there); distinguish the series' own convergence domain from
the domain of the function it may equal; and state that term-by-term differentiation and
integration preserve the radius but can change endpoint behavior.

## Core Understanding
A **power series** $\sum_{n=0}^{\infty} c_n(x-a)^n$ generalizes the already-familiar geometric
series to an arbitrary sequence of coefficients $c_n$. Its **radius of convergence** $R$ is found
via the ratio test applied to the terms $c_n(x-a)^n$: solving
$\lim_{n\to\infty}|c_{n+1}(x-a)^{n+1}/c_n(x-a)^n|<1$ for $|x-a|$ gives $|x-a|<R$. The geometric
series itself is the canonical motivating example: $\sum x^n$ has $R=1$ via the ratio test
$|x|<1$, and where it converges, it equals $1/(1-x)$.

Crucially, the ratio test is INCONCLUSIVE exactly at the two boundary points $x=a-R$ and
$x=a+R$ — its limit equals exactly 1 there by construction. The candidate interval
$(a-R,a+R)$ is therefore only a LOWER bound on what is known; each endpoint must be substituted
in individually and tested with a DIFFERENT method (comparison test, alternating series test,
p-series comparison, etc.). The true interval of convergence can be open at both ends, closed at
both ends, or half-open — there is no way to predict which without checking each endpoint
directly, and the two endpoints can give genuinely OPPOSITE verdicts.

A power series' convergence domain is a genuinely different question from the domain of the
FUNCTION it may equal when it converges. The geometric series $\sum x^n$ equals $1/(1-x)$ only
for $|x|<1$ — the function $1/(1-x)$ is perfectly well-defined for every real $x\ne1$ (e.g.
$f(2)=-1$), but the SERIES at $x=2$ is $1+2+4+8+\cdots$, which diverges and represents nothing
there. Outside the interval of convergence, the series and the function it equals inside that
interval simply part ways.

Term-by-term differentiation and integration of a power series are guaranteed to PRESERVE the
radius of convergence $R$, but endpoint behavior is NOT guaranteed to stay the same —
differentiation tends to hurt endpoint convergence (an extra effective factor of $n$ appears),
while integration tends to help it (an extra factor of $1/(n+1)$ appears). Each endpoint must be
re-tested on the new series after any term-by-term operation.

## Mental Models
- **"R is only a lower bound on what's known — the endpoints are always a separate check."**
- **"The series and the function it equals inside the interval are not the same object outside
  it."**
- **"The radius survives differentiation and integration; the endpoints do not automatically."**

## Why Students Fail
- **MC-1 (Type 1, overgeneralization)**: the ratio test's clean "$<1$ converges, $>1$ diverges"
  rule is overgeneralized to include the exact boundary $|x-a|=R$, where the test's own limit
  equals exactly 1 — its own inconclusive case — and is silently treated as settled anyway.
- **MC-2 (Type 1, overgeneralization)**: a closed-form function's broader domain (defined
  wherever the algebraic expression makes sense) is overgeneralized onto the series that equals
  it only within a smaller interval, conflating "the function is defined here" with "the series
  converges here."
- **MC-3 (Type 1, overgeneralization)**: the genuinely-true fact that the RADIUS is preserved
  under term-by-term differentiation/integration is overgeneralized into believing ENDPOINT
  behavior is preserved too, when only the radius carries that guarantee.

## Misconceptions

### MC-1: ENDPOINTS-AUTOMATICALLY-INCLUDED
- **Surface form**: stating the interval of convergence as $(a-R,a+R)$ or $[a-R,a+R]$
  immediately after finding $R$, without separately testing each endpoint.
- **Frequency band**: Foundational — the Blueprint's own note identifies this as the single most
  common computational error, since an otherwise entirely correct ratio-test computation still
  yields a wrong final answer if the endpoints aren't checked.
- **Root cause (Type 1)**: as described above.
- **Repair**: substitute each specific endpoint value into the ORIGINAL series and apply a
  genuinely different test — there is no shortcut that reads endpoint behavior off $R$ alone, and
  the two endpoints can behave completely differently from each other.

### MC-2: SERIES-EQUALS-FUNCTION-EVERYWHERE
- **Surface form**: believing $\sum x^n=1/(1-x)$ is valid at $x=2$, since the right-hand side is
  a perfectly well-defined number there.
- **Frequency band**: High.
- **Root cause (Type 1)**: as described above.
- **Repair**: check directly that at $x=2$ the series $1+2+4+8+\cdots$ diverges (terms grow
  without bound) — the series represents NOTHING there, regardless of the function's own broader
  domain.

### MC-3: TERM-BY-TERM-PRESERVES-ENDPOINTS
- **Surface form**: assuming that after differentiating or integrating a power series term by
  term, its interval of convergence stays exactly the same, since "the radius stayed the same."
- **Frequency band**: Moderate to High.
- **Root cause (Type 1)**: as described above — this is really MC-1's error recurring after an
  extra operation is applied, since a learner who never built the endpoint-checking habit has no
  foothold when asked about a derivative's endpoints.
- **Repair**: differentiate a series with known endpoint behavior, re-derive the new series'
  endpoint behavior FRESH by direct substitution, and show it can genuinely differ from the
  original (even though the radius is unchanged).

## Analogies
- **"A map's legend only covers marked territory"**: the ratio test's verdict covers everything
  strictly inside the radius and everything strictly outside — the two boundary points are simply
  off the map and need their own separate survey.
- **Anti-analogy**: a power series is NOT "the same thing" as the function it converges to inside
  its interval — outside that interval the function can persist perfectly well while the series
  itself simply stops representing anything.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: fully resolve $\sum x^n/n$, showing $x=1$ diverges
  (harmonic series) while $x=-1$ converges (alternating harmonic series) — genuinely OPPOSITE
  verdicts at the two endpoints of the same series.
- **Demonstration 2 (targets MC-2)**: substitute $x=2$ into $\sum x^n$ directly, showing the
  series' own partial sums grow without bound even though $1/(1-2)=-1$ is a well-defined number.
- **Demonstration 3 (targets MC-3)**: differentiate $\sum x^n/n$ term by term to get the
  geometric series, re-derive its endpoint behavior fresh, and show the endpoint at $x=-1$
  (which converged for the original series) no longer converges after differentiating.

## Discovery Questions
1. "The ratio test tells you $|x-a|<R$ converges. What does it tell you about exactly
   $|x-a|=R$?"
2. "If a series equals a function wherever it converges, does that mean the series converges
   everywhere the function is defined?"
3. "If differentiating a power series is guaranteed to preserve its radius, is it also guaranteed
   to preserve which endpoints converge?"

## Teaching Sequence
1. **Anchor**: connect to `math.seq.series-convergence`'s ratio test, working the geometric
   series fully (including both endpoints) as the motivating canonical example.
2. **Contrast pair**: a series with genuinely different endpoint behavior at each end; the
   series-vs-function domain gap via the geometric series revisited; a term-by-term
   differentiation losing an endpoint.
3. **Conflict evidence**: a composite problem requiring radius computation, both-endpoint
   testing, and a term-by-term consequence together.
4. **Mastery gate**: require a full radius-and-interval computation on a novel series, a
   true/false judgment on series-vs-function equality outside the interval, and an explanation
   of what a term-by-term operation does and does not preserve.

## Tutor Actions
- Never accept an interval of convergence stated immediately after $R$ is found — always prompt
  for the two endpoint checks separately.
- When a series has a known closed-form function, ask whether the equality holds OUTSIDE the
  interval of convergence before accepting an answer.
- After any term-by-term operation, ask the learner to re-test each endpoint on the new series
  rather than assuming the old endpoint behavior transfers.

## Voice Teaching Notes
- Introduce the endpoint-checking step as a mandatory, separate stage every time — never let $R$
  alone be treated as "the answer."
- When a learner reports a closed interval without endpoint work shown, ask "what happens if you
  substitute this exact value into the ORIGINAL series?"

## Assessment Signals
- **Rung 1 (recognition)**: learner states that the ratio test is inconclusive exactly at the
  two endpoints.
- **Rung 2 (application)**: learner correctly finds the radius of convergence and tests both
  endpoints independently for a specific power series.
- **Rung 3 (transfer)**: learner correctly explains why a power series can fail to equal its
  closed-form function outside its interval of convergence, and correctly predicts that a
  term-by-term operation preserves the radius but requires re-testing endpoint convergence.

## Tutor Recovery Strategy
- If MC-1 recurs, re-run the opposite-endpoint-verdicts demonstration on the learner's own series.
- If MC-2 recurs, re-run the direct substitution outside the interval with the learner.
- If MC-3 recurs, re-derive the new series' endpoint behavior together after a term-by-term
  operation.

## Memory Hooks
- "R is only a lower bound — the endpoints are always their own check."
- "Outside the interval, the series and the function part ways."
- "The radius survives; the endpoints don't, automatically."

## Transfer Connections
- `math.seq.series-convergence` (already authored): supplies the ratio test and the partial-sum
  convergence definition this entire concept's radius-of-convergence machinery is built on.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.calc.power-series.md`, reused by reference
  for its geometric-series worked example, its opposite-endpoint contrast, its series-vs-function
  domain contrast, and its three-misconception registry (independently birth-type-classified
  above, since the Blueprint carries severity labels but no birth-type column).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe (a series
  centered at a nonzero point, $\sum (x-2)^n/(n\cdot4^n)$, paired with a "shift doesn't change
  anything" student claim to be evaluated via direct verification rather than assumed).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy.** `requires`, `unlocks`, `cross_links`, `difficulty`,
  `bloom`, `mastery_threshold`, and `estimated_hours` all match exactly between the Blueprint and
  the live KG.

## Version History
- 2026-09-13 (Batch 64): authored. Unblocked by `math.seq.series-convergence` (Batch 63),
  reopening `math.calc` for a fourth time this campaign. Companion batch concepts:
  `math.trig.de-moivres-theorem`, `math.trig.eulers-formula`, `math.seq.divergence-test`. This
  entry's own `unlocks` field (`math.calc.taylor-series`, `math.calc.maclaurin-series`) is a
  real forward relationship, both confirmed against the live KG. `math.calc` moves from
  **70/76** unchanged toward **71/76** this batch.
