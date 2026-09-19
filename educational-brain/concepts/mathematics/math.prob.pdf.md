# math.prob.pdf

## Identity
- **KG id**: `math.prob.pdf`
- **Domain**: math.prob
- **Requires**: `math.prob.continuous-rv`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.9
- **Estimated hours**: 3

## Learning Objective
Find the NORMALIZATION constant $k$ by solving $\int k\cdot g(x)\,dx=1$ (an INTEGRAL condition,
never a point evaluation); compute $E[X]=\int xf(x)\,dx$ as the probability-weighted MEAN, never
the mode (peak); and compute $\text{Var}(X)=E[X^2]-(E[X])^2$, distinguishing it sharply from the
always-zero $E[X-\mu]$.

## Core Understanding
NORMALIZATION IS AN INTEGRAL CONDITION, NEVER A POINT EVALUATION: for $f(x)=k\cdot x$ on $[0,2]$,
setting $f(1)=1\Rightarrow k=1$ gives $\int_0^2x\,dx=2\ne1$ — INVALID. The correct approach:
$\int_0^2kx\,dx=k\cdot2=1\Rightarrow k=1/2$; checking $\int_0^2(1/2)x\,dx=1$ ✓. Normalization
means TOTAL PROBABILITY EQUALS 1 — an integral over the whole support, never a single-point
constraint.

$E[X]$ IS THE PROBABILITY-WEIGHTED MEAN, NEVER THE MODE (PEAK): for $f(x)=3x^2$ on $[0,1]$ (which
PEAKS at $x=1$): $E[X]=\int_0^1x\cdot3x^2\,dx=\int_0^13x^3\,dx=\frac34\ne1$. The mode is a LOCAL
property (where density is densest per unit length); $E[X]$ is a GLOBAL property, integrating
$x\cdot f(x)$ over the ENTIRE support. For a skewed distribution, heavy tails pull $E[X]$ away
from the mode — reading off the peak is never a substitute for the integral.

VARIANCE REQUIRES SQUARING THE DEVIATION — $E[X-\mu]$ IS ALWAYS ZERO AND MEASURES NOTHING: for
ANY distribution, $\int(x-\mu)f(x)\,dx=E[X]-\mu=\mu-\mu=0$ — positive and negative deviations
ALWAYS cancel, regardless of spread. Variance requires the SQUARED deviation:
$\text{Var}(X)=E[(X-\mu)^2]=\int(x-\mu)^2f(x)\,dx>0$ whenever $X$ isn't concentrated at a single
point. The computational SHORTCUT $\text{Var}(X)=E[X^2]-(E[X])^2$ (derived by expanding
$(X-\mu)^2=X^2-2\mu X+\mu^2$) is usually faster but computes the IDENTICAL quantity as the
definitional squared-deviation formula.

## Mental Models
- **"Normalization is a whole-support integral question, never a single-point check — f(1)=1
  proves nothing about the total area."**
- **"E[X] is the balance point of the WHOLE density curve — the tallest point (mode) is a
  completely different, local question."**

## Why Students Fail

### MC-1: EXPECTATION-AS-MODE
- **Surface form**: computes $E[X]$ as the $x$-value where $f(x)$ is maximum (the mode) rather
  than evaluating $\int xf(x)\,dx$.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared Foundational severity — for
  symmetric distributions, mode and mean coincide, making the heuristic seem to work until a
  skewed example breaks it).
- **Repair**: re-walk the skewed $f(x)=3x^2$ example directly, showing mode (1) and mean ($3/4$)
  genuinely differ.

### MC-2: VARIANCE-AS-EXPECTED-DEVIATION
- **Surface form**: computes $\text{Var}(X)$ as $E[X-\mu]=\int(x-\mu)f(x)\,dx=0$, concluding
  variance is always zero, or computes $E[|X-\mu|]$ instead of $E[(X-\mu)^2]$.
- **Birth type**: Type 4, notation-induced (Blueprint's own declared severity implied
  significant — the squaring in $(X-\mu)^2$ is easy to drop mentally, especially since
  $E[X-\mu]=0$ always, by definition of $E[X]$).
- **Repair**: re-derive that $E[X-\mu]$ is always zero regardless of spread, then re-anchor on the
  squared-deviation formula.

### MC-3: NORMALIZATION-BY-EVALUATION
- **Surface form**: finds $k$ by evaluating $k\cdot f(c)=1$ at some point $c$, rather than setting
  up and solving $\int k\cdot g(x)\,dx=1$.
- **Birth type**: Type 3, language contamination (Blueprint's own declared severity implied
  significant — "the PDF must equal 1 somewhere" is a natural but incorrect reading of "the total
  probability is 1").
- **Repair**: re-derive $k$ from the integral condition directly, verifying by re-checking the
  full integral.

## Misconceptions

### MC-1: EXPECTATION-AS-MODE
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: VARIANCE-AS-EXPECTED-DEVIATION
- **Surface form**: as described above.
- **Root cause (Type 4)**: as described above.
- **Repair**: as described above.

### MC-3: NORMALIZATION-BY-EVALUATION
- **Surface form**: as described above.
- **Root cause (Type 3)**: as described above.
- **Repair**: as described above.

## Analogies
- **"E[X] is a see-saw's balance point — the density's tallest peak might sit far from where the
  whole curve actually balances."**
- **Anti-analogy**: $E[X-\mu]=0$ is NOT variance — it's a trivial algebraic consequence of how
  $\mu$ itself is defined, carrying zero information about spread.

## Demonstrations
- **Demonstration 1 (targets MC-3)**: $f(x)=kx$ on $[0,2]$: $f(1)=1\Rightarrow k=1$ fails
  ($\int_0^2x\,dx=2\ne1$); solving the integral gives $k=1/2$ correctly.
- **Demonstration 2 (targets MC-1)**: $f(x)=3x^2$ on $[0,1]$: mode at $x=1$, but
  $E[X]=\int_0^13x^3\,dx=3/4\ne1$.
- **Demonstration 3 (targets MC-2)**: $\int(x-\mu)f(x)\,dx=0$ always; $\text{Var}(X)=
  \int(x-\mu)^2f(x)\,dx>0$ genuinely measures spread.

## Discovery Questions
1. "Does finding $k$ so that $f(c)=1$ at some specific point $c$ correctly normalize a PDF?"
2. "Is $E[X]$ always located at the peak of the density curve?"
3. "Does $\int(x-\mu)f(x)\,dx$ measure the variance of $X$?"

## Teaching Sequence
1. **Analogy bridge**: the discrete-to-continuous expectation bridge, working Demonstration 1's
   normalization contrast, isolating MC-3.
2. **Worked example pair**: normalize a new PDF and compute its expectation and variance in full,
   reinforcing the three-formula sequence.
3. **Conceptual shift**: Demonstration 2's mode-versus-mean contrast, isolating MC-1; Demonstration
   3's always-zero-deviation trap, isolating MC-2.
4. **Mastery gate**: require a correct normalization constant via the integral condition, a
   correct expectation computed by integration (not mode-reading) for a skewed PDF, and a correct
   variance via the shortcut formula, at the Blueprint's own stated MAMR of 5/5 (⌈0.9×5⌉).

## Tutor Actions
- Never accept a normalization constant found by evaluating the PDF at a single point.
- Never accept $E[X]$ read off as the density's peak without the integral computed.
- Never accept $E[X-\mu]$ presented as variance.

## Voice Teaching Notes
- Say "did you solve an integral, or just plug in one point?" whenever a normalization constant
  is found.
- When expectation is computed, ask "is that the peak, or did you actually integrate x times
  f(x)?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly solves for a normalization constant via the integral
  condition.
- **Rung 2 (application)**: learner correctly computes $E[X]$ and $E[X^2]$ for a new PDF via
  integration.
- **Rung 3 (transfer)**: learner correctly computes $\text{Var}(X)$ via the shortcut formula for a
  new distribution, and derives the shortcut formula itself by expanding $(X-\mu)^2$.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the skewed mode-versus-mean example.
- If MC-2 recurs, re-derive $E[X-\mu]=0$ always, then re-anchor on the squared-deviation formula.
- If MC-3 recurs, re-derive $k$ from the integral condition directly.

## Memory Hooks
- "Normalization is a whole-integral question, never a single point."
- "E[X] is the balance point of the whole curve — not the tallest point."
- "Squaring the deviation is what makes variance meaningful — E[X-mu] is always zero."

## Transfer Connections
- `math.prob.continuous-rv` (already authored, this campaign, Batch 118): supplies the PDF
  definition, validity conditions, and interval-probability machinery this concept extends with
  normalization-constant solving, expectation, and variance.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.prob.pdf.md`, reused by reference for its
  discrete-to-continuous expectation analogy, its normalization-by-integral procedure, its
  mode-versus-mean contrast, its variance-shortcut derivation, and its three-misconception
  registry (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe, verifying $f(x)=3x^2$ is a valid
  PDF and computing $E[X]$, $E[X^2]$, and $\text{Var}(X)$.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Blueprint/unlocks discrepancy found (distinct from a P76/cross-link issue)**: the Blueprint's
  own Component 7 lists `math.prob.continuous-distributions` as an "unlocked blueprint," but the
  live KG's `unlocks` field for this concept is empty (`[]`). Used the live KG's authoritative
  empty list. All other fields (requires `math.prob.continuous-rv`, cross_links none,
  proficient/apply, mastery_threshold 0.9, estimated_hours 3) matched exactly.

## Version History
- 2026-09-19 (Batch 119): authored. Second entry this batch. Companion batch concept:
  `math.meas.l2-space`.
