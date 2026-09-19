# math.prob.continuous-rv

## Identity
- **KG id**: `math.prob.continuous-rv`
- **Domain**: math.prob
- **Requires**: `math.prob.random-variable`, `math.calc.definite-integral`
- **Unlocks**: `math.prob.pdf`, `math.prob.continuous-distributions`
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: understand
- **Mastery threshold**: 0.9
- **Estimated hours**: 4

## Learning Objective
Recognize that for a continuous random variable, probability is computed as AREA under a density
$f(x)$ over an interval, $P(a\le X\le b)=\int_a^bf(x)\,dx$, NEVER as the density value itself; state
the two PDF validity conditions ($f(x)\ge0$ EVERYWHERE, $\int_{-\infty}^\infty f(x)\,dx=1$),
recognizing $f(x)$ CAN exceed 1; and state $F(x)=\int_{-\infty}^xf(t)\,dt$, $f(x)=F'(x)$,
concluding $P(X=c)=0$ for EVERY single value $c$.

## Core Understanding
PROBABILITY IS AREA, NEVER THE DENSITY VALUE ITSELF: for $X$ uniform on $[0,2]$ with
$f(x)=1/2$: $P(X=1)=\int_1^1(1/2)\,dx=0$ (a zero-width integral), NOT $f(1)=1/2$. The density
value at a point tells you how CONCENTRATED probability is nearby — like population density
(people per km²) — never a probability itself. $P(0.5\le X\le1.5)=\int_{0.5}^{1.5}(1/2)\,dx=1/2$
IS positive, since the interval has positive width — the contrast between a single point (always
zero) and an interval (generally positive) is exactly the point/area distinction.

$f(x)$ CAN EXCEED 1 — THE ONLY CONSTRAINTS ARE NON-NEGATIVITY AND TOTAL-INTEGRAL-EQUALS-1: for
$f(x)=3$ on $[0,1/3]$: $\int_0^{1/3}3\,dx=3\cdot\frac13=1$ — a perfectly VALID PDF, despite
$f(x)=3>1$ throughout its support. Just as population density can exceed 1 person per unit area
without contradiction (total population = density $\times$ area, integrated), $f(x)$ is
probability PER UNIT LENGTH, not a probability itself — there is NO constraint $f(x)\le1$.

THE CDF AND PDF ARE RELATED BY INTEGRATION/DIFFERENTIATION, NEVER INTERCHANGEABLE: for
$f(x)=2x$ on $[0,1]$: $F(x)=\int_0^x2t\,dt=x^2$, so $F(1/2)=1/4$ — NOT $f(1/2)=1$. The CDF
$F(x)=P(X\le x)$ is always in $[0,1]$, non-decreasing, $F(0)=0$ or the lower boundary value,
$F(\infty)=1$; the PDF $f(x)$ has none of these constraints except non-negativity and total
integral 1. "$f\to F$: integrate. $F\to f$: differentiate" — and because $P(X=c)=\int_c^cf(x)\,dx
=0$ for EVERY $c$, individual points ALWAYS carry zero probability under a continuous
distribution.

## Mental Models
- **"Probability for a continuous RV is area under the curve — the density value at a single
  point tells you concentration, never a probability by itself."**
- **"A single point is a line with zero width — zero width always means zero area, hence zero
  probability, no matter how tall the density curve is there."**

## Why Students Fail

### MC-1: SINGLE-VALUE-HAS-PROBABILITY
- **Surface form**: assigns positive probability to a single point, believing $P(X=c)=f(c)$ or
  $P(X=c)>0$.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared Foundational severity —
  discrete RVs assign positive probability to individual values, and this intuition carries over
  incorrectly to the continuous case).
- **Repair**: re-derive $P(X=c)=\int_c^cf(x)\,dx=0$ directly — a zero-width integral is always
  zero, regardless of the function's height there.

### MC-2: PDF-IS-PROBABILITY
- **Surface form**: believes $f(x)$ must satisfy $0\le f(x)\le1$, rejecting PDFs where $f(x)>1$.
- **Birth type**: Type 3, language contamination (Blueprint's own declared severity implied
  significant — "probability density function" contains the word "probability," inviting the
  value itself to be read as a probability).
- **Repair**: re-anchor on the population-density analogy — density can exceed 1 per unit length;
  only the TOTAL (the integral) must equal 1.

### MC-3: CDF-PDF-CONFUSION
- **Surface form**: conflates $F(x)$ and $f(x)$, using them interchangeably or applying the wrong
  one.
- **Birth type**: Type 4, notation-induced (Blueprint's own declared severity implied
  significant — both $F$ and $f$ are functions of the same variable $x$, inviting the two to blur
  together).
- **Repair**: re-anchor on the diagnostic constraints — $F(x)\in[0,1]$ always, non-decreasing; $f$
  has neither property except non-negativity and total-integral-1.

## Misconceptions

### MC-1: SINGLE-VALUE-HAS-PROBABILITY
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: PDF-IS-PROBABILITY
- **Surface form**: as described above.
- **Root cause (Type 3)**: as described above.
- **Repair**: as described above.

### MC-3: CDF-PDF-CONFUSION
- **Surface form**: as described above.
- **Root cause (Type 4)**: as described above.
- **Repair**: as described above.

## Analogies
- **"f(x) is a population-density map — people per square mile — never the total population
  itself; you only get an actual count (probability) by integrating density over a region."**
- **Anti-analogy**: $f(x)>1$ is NOT invalid — unlike a probability, a density is unbounded above
  as long as the total area underneath integrates to exactly 1.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: for uniform$[0,2]$, $P(X=1)=\int_1^1(1/2)\,dx=0$; $P(0.5\le
  X\le1.5)=1/2$ — positive only because the interval has width.
- **Demonstration 2 (targets MC-2)**: $f(x)=3$ on $[0,1/3]$: $\int_0^{1/3}3\,dx=1$ — a valid PDF
  despite $f(x)=3>1$.
- **Demonstration 3 (targets MC-3)**: $f(x)=2x$ on $[0,1]$: $F(1/2)=\int_0^{1/2}2t\,dt=1/4\ne
  f(1/2)=1$ — genuinely different values.

## Discovery Questions
1. "If $f(2)=0.5$, does that mean the probability of getting exactly 2 is 0.5?"
2. "Can $f(x)=3$ on $[0,1/3]$ still be a valid PDF, even though $3>1$?"
3. "Is $F(x)$ the same thing as $f(x)$?"

## Teaching Sequence
1. **Representation shift**: the discrete-to-continuous transition, working Demonstration 1's
   zero-width-integral verification, isolating MC-1.
2. **Contrast pair**: Demonstration 2's density-exceeding-1 validity check, isolating MC-2 via the
   population-density analogy.
3. **Contrast pair**: Demonstration 3's PDF-versus-CDF numeric contrast, isolating MC-3 by
   requiring the integrate/differentiate relationship stated correctly.
4. **Mastery gate**: require a correct point-probability computation (always 0) for a new
   continuous RV, a correct PDF validity check for a function exceeding 1, and a correct CDF
   computation via integration distinguished from the PDF value, at the Blueprint's own stated
   MAMR of 5/5 (⌈0.9×5⌉).

## Tutor Actions
- Never accept $P(X=c)$ computed as $f(c)$ for any continuous random variable.
- Never accept a PDF rejected as invalid solely because $f(x)>1$ somewhere.
- Never accept $F(x)$ and $f(x)$ used interchangeably.

## Voice Teaching Notes
- Say "is that a zero-width interval? What does that make the integral?" whenever a single-point
  probability is requested.
- When a PDF's validity is questioned, ask "is the concern about $f(x)$'s height, or about the
  total integral?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes $P(X=c)=0$ for a new continuous random
  variable.
- **Rung 2 (application)**: learner correctly verifies PDF validity for a function whose values
  exceed 1, and computes an interval probability via integration.
- **Rung 3 (transfer)**: learner correctly derives $f(x)$ from a given $F(x)$ via differentiation,
  and vice versa, for a new distribution.

## Tutor Recovery Strategy
- If MC-1 recurs, re-derive the zero-width integral directly.
- If MC-2 recurs, re-anchor on the population-density analogy.
- If MC-3 recurs, re-anchor on the diagnostic constraints ($F\in[0,1]$, non-decreasing; $f$ has
  neither).

## Memory Hooks
- "Probability is area, never height — a single point has zero width, hence zero area."
- "Density can exceed 1 — only the total area must equal exactly 1."
- "f to F: integrate. F to f: differentiate. Never confuse the two directions."

## Transfer Connections
- `math.prob.random-variable` (already authored, this campaign, Batch 113): supplies the
  function-based random-variable framework this concept extends to the continuous, density-based
  case.
- `math.calc.definite-integral` (already authored, certified domain): supplies the area-as-
  integral machinery every probability computation in this concept directly reuses.
- `math.prob.cdf` (already authored, this campaign, Batch 116): supplies the general CDF
  properties (non-decreasing, right-continuous, boundary limits) this concept specializes via
  differentiation for the continuous case.
- `math.prob.pdf` (not yet authored): the KG's declared unlock, developing formal PDF properties,
  expectation, and variance.
- `math.prob.continuous-distributions` (not yet authored): the KG's declared unlock, studying
  named continuous families (Normal, Exponential, Uniform) as special cases of this framework.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.prob.continuous-rv.md`, reused by reference
  for its discrete-to-continuous transition, its zero-width-integral point-probability argument,
  its population-density analogy for PDF values exceeding 1, its PDF-versus-CDF contrast, and its
  three-misconception registry (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe, verifying $f(x)=2x$ is a valid PDF,
  computing an interval probability, confirming $P(X=1/2)=0$, and deriving the CDF $F(x)=x^2$.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `math.prob.random-
  variable`/`math.calc.definite-integral`, unlocks `math.prob.pdf`/`math.prob.continuous-
  distributions`, cross_links none, proficient/understand, mastery_threshold 0.9, estimated_hours
  4) was directly verified against the live KG and matches exactly.

## Version History
- 2026-09-19 (Batch 118): authored. Second entry this batch. Companion batch concept:
  `math.meas.product-measure`.
