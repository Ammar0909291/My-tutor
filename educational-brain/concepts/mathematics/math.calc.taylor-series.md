# math.calc.taylor-series

## Identity
- **KG id**: `math.calc.taylor-series`
- **Domain**: math.calc
- **Requires**: `math.calc.power-series`, `math.calc.higher-order-derivatives`, `math.calc.linearization`
- **Unlocks**: `math.calc.maclaurin-series` (per the live KG — see Curriculum Feedback: the
  Blueprint states "none listed")
- **Cross-links**: none
- **Difficulty**: advanced
- **Bloom level**: apply
- **Mastery threshold**: 0.75 (per the live KG — see Curriculum Feedback: the Blueprint states
  0.85)
- **Estimated hours**: 12 (per the live KG — see Curriculum Feedback: the Blueprint states 8)

## Learning Objective
Recognize the Taylor series $f(x)=\sum_{n=0}^{\infty}\frac{f^{(n)}(a)}{n!}(x-a)^n$ as
`math.calc.linearization`'s own linear approximation extended with successively higher-derivative
correction terms; compute a Taylor series for a specific function as a specific instance of
`math.calc.power-series`'s general form, with coefficients determined by the function itself; and
recognize (at orientation level) that a Taylor series is only valid within its radius of
convergence, with convergence and equality to $f$ being genuinely distinct questions.

## Core Understanding
`math.calc.linearization` already built the BEST LINEAR (degree-1) approximation to $f$ near $a$:
$L(x)=f(a)+f'(a)(x-a)$, matching $f$'s value and slope at $a$. The Taylor series CONTINUES this
idea directly: adding a quadratic term $\frac{f''(a)}{2!}(x-a)^2$ additionally matches $f$'s
curvature at $a$; adding a cubic term matches the next derivative; and so on indefinitely. Each
additional term, drawn from `math.calc.higher-order-derivatives`'s successively higher
derivatives, refines the approximation further — the Taylor series is not a new, unrelated idea,
but linearization's own natural continuation to arbitrarily many terms.

`math.calc.power-series` studies GENERAL power series $\sum c_n(x-a)^n$ where the coefficients
$c_n$ can be any numbers whatsoever. The Taylor series is the SPECIFIC instance where
$c_n=f^{(n)}(a)/n!$ — computed directly from the function's own derivatives at $a$, not chosen
freely or fit to data. This specific coefficient choice is exactly what makes the partial sums
match $f$'s value, slope, curvature, and successively higher-order behavior at $a$; the
coefficients are FORCED by the function once $a$ is fixed, not a free design choice the way a
general power series's coefficients are.

**Convergence and equality to $f$ are related but genuinely distinct questions (orientation
level)**: `math.calc.power-series`'s radius of convergence $R$ tells you WHERE the series
converges to SOME value — but whether that value actually EQUALS $f(x)$ is a separate question.
Remarkably, some functions can have every derivative well-defined at a point yet have a Taylor
series that fails to equal the function anywhere except at that single point — a genuinely
surprising failure mode whose full derivation is beyond this concept's core scope. The more
common, easily verified illustration: the geometric series $\sum x^n$ (the Taylor series of
$f(x)=1/(1-x)$ at $a=0$) genuinely equals $f(x)$ within $|x|<1$, but at $x=2$ the series diverges
entirely even though $f(2)=-1$ is perfectly well-defined — the series and the function simply
part ways outside the radius of convergence.

## Mental Models
- **"The Taylor series is linearization, continued with more correction terms."**
- **"The coefficients are forced by the function — never freely chosen, unlike a general power
  series."**
- **"Converging to something and converging to $f$ specifically are two different claims."**

## Why Students Fail
- **MC-1 (Type 5, instruction-induced)**: the Taylor series is typically introduced as its own
  named topic with its own formula, and that separate presentation itself suggests a new,
  unrelated concept rather than linearization's own direct continuation.
- **MC-2 (Type 1, overgeneralization)**: `math.calc.power-series`'s own general study of series
  with arbitrary, freely-chosen coefficients is overgeneralized onto the Taylor series, whose
  coefficients are in fact entirely determined by the function's own derivatives at the center.
- **MC-3 (Type 1, overgeneralization)**: the fact that a power series equals a function only
  within its radius of convergence is easy to forget once a Taylor series is specifically tied to
  a familiar function, leading to the overgeneralized belief that the series equals the function
  wherever the function itself is defined.

## Misconceptions

### MC-1: TAYLOR-SERIES-ASSUMED-UNRELATED-TO-LINEARIZATION
- **Surface form**: treating the Taylor series as an unrelated new formula to memorize, rather
  than as the direct continuation of the already-known linear approximation $L(x)$.
- **Frequency band**: Foundational.
- **Root cause (Type 5)**: as described above.
- **Repair**: extend a specific function's linearization directly by adding one more term (the
  quadratic correction), showing the resulting approximation is strictly better and was obtained
  by literally continuing the same procedure.

### MC-2: TAYLOR-COEFFICIENTS-ASSUMED-FREELY-CHOSEN
- **Surface form**: believing Taylor coefficients can be freely chosen or adjusted, the same way
  general power-series coefficients can be.
- **Frequency band**: High.
- **Root cause (Type 1)**: as described above.
- **Repair**: compute a function's Taylor coefficients directly from its own derivative values
  (e.g. $e^x$'s coefficients, forced to be $1/n!$ by $e^x$ being its own derivative), showing there
  is no freedom of choice once the function and center are fixed.

### MC-3: CONVERGENCE-ASSUMED-TO-GUARANTEE-EQUALITY-EVERYWHERE
- **Surface form**: believing a Taylor series equals the function everywhere the function is
  defined, not merely within the radius of convergence.
- **Frequency band**: Moderate.
- **Root cause (Type 1)**: as described above.
- **Repair**: contrast a point INSIDE the radius of convergence (series genuinely equals $f$)
  against a point OUTSIDE it (series diverges while $f$ remains perfectly well-defined), for the
  identical function.

## Analogies
- **"Adding more terms is like adding more detail to a sketch"**: the linear term captures the
  overall direction; each further term adds finer detail (curvature, then the next level of
  bending, and so on) about the same underlying shape.
- **Anti-analogy**: a Taylor series is NOT a free-form curve-fitting tool with adjustable knobs —
  every coefficient is locked in by the function's own derivative values the moment the function
  and center point are chosen.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: extend $\cos x$'s linearization at $a=0$ (a constant, $1$)
  by adding the quadratic term to get $1-x^2/2$, showing the extension directly continues the
  linear approximation.
- **Demonstration 2 (targets MC-2)**: compute $e^x$'s Taylor coefficients directly from its
  derivatives (every derivative of $e^x$ equals $e^x$ itself, forcing $c_n=1/n!$).
- **Demonstration 3 (targets MC-3)**: verify the geometric series equals $1/(1-x)$ at $x=0.5$
  (inside $R=1$) and diverges at $x=2$ (outside $R=1$) even though $1/(1-2)=-1$ is well-defined.

## Discovery Questions
1. "If linearization gives the best LINEAR approximation, what would the best QUADRATIC
   approximation add? Is this a new idea, or an extension of the same one?"
2. "Once a function $f$ and a center $a$ are fixed, can you choose the Taylor coefficients
   however you like, the way you could for a general power series?"
3. "If a series converges to some value at a point, does that automatically mean it converges to
   the SPECIFIC function it was built from?"

## Teaching Sequence
1. **Anchor**: connect to `math.calc.linearization`'s degree-1 approximation, framing the Taylor
   series as its direct continuation.
2. **Conflict evidence**: derive a function's Taylor coefficients directly from its own
   derivatives, showing they are forced, not chosen.
3. **Contrast pair**: a point inside versus outside the radius of convergence for the same
   function.
4. **Mastery gate**: require extending a linearization to a quadratic Taylor approximation,
   computing Taylor coefficients from derivatives directly, and explaining the convergence-vs-
   equality distinction.

## Tutor Actions
- Never introduce the Taylor series without first connecting it explicitly to the learner's
  already-known linearization.
- When Taylor coefficients are requested, require the learner to compute them from the function's
  own derivatives, never to guess or freely assign them.
- When a series is claimed to equal a function at a point, ask whether that point lies within the
  radius of convergence before accepting the claim.

## Voice Teaching Notes
- Introduce the Taylor series as "one more term than you already know how to add," directly
  invoking the learner's prior linearization work.
- When a learner treats coefficients as adjustable, ask "what forces this particular number here
  — is it a free choice, or does the function itself decide it?"

## Assessment Signals
- **Rung 1 (recognition)**: learner states that the Taylor series's first two terms are exactly
  the linearization.
- **Rung 2 (application)**: learner correctly computes a Taylor series's coefficients from a
  function's own derivatives.
- **Rung 3 (transfer)**: learner correctly distinguishes where a Taylor series converges from
  where it actually equals the function it was built from.

## Tutor Recovery Strategy
- If MC-1 recurs, re-run the linearization-extension demonstration with the learner's own
  function.
- If MC-2 recurs, re-derive the Taylor coefficients directly from the function's derivatives.
- If MC-3 recurs, re-run the inside-versus-outside-the-radius contrast.

## Memory Hooks
- "The Taylor series is linearization, continued."
- "The coefficients are forced by the function — never freely chosen."
- "Converging to something, and converging to THIS function, are different claims."

## Transfer Connections
- `math.calc.power-series` (already authored): supplies the general power-series form and radius
  of convergence this concept specializes.
- `math.calc.higher-order-derivatives` (already authored): supplies the successively higher
  derivatives that determine each Taylor coefficient.
- `math.calc.linearization` (already authored): supplies the degree-1 approximation this concept
  directly extends.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.calc.taylor-series.md`, reused by reference
  for its cosine linearization-extension example, its $e^x$ forced-coefficient derivation, its
  geometric-series inside/outside-radius contrast, and its three-misconception registry
  (independently birth-type-classified above, since the Blueprint carries severity labels but no
  birth-type column).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe (an engineer
  estimating $\ln(1+x)$ near $x=0$ for a control system, contrasting a small-perturbation
  estimate against an unjustified extrapolation far outside the radius of convergence).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Genuine Blueprint/KG metadata discrepancy found, resolved toward the KG**: the Blueprint
  states "Unlocks: none listed in the KG for this concept," but direct KG query confirms
  `unlocks: ['math.calc.maclaurin-series']`. This entry's Identity section uses the KG's value.
- **A second genuine Blueprint/KG metadata discrepancy found, resolved toward the KG**: the
  Blueprint's own metadata table states `mastery_threshold: 0.85`/`estimated_hours: 8`, but direct
  KG query confirms `mastery_threshold: 0.75`/`estimated_hours: 12`. This entry's Identity section
  uses the KG's values.

## Version History
- 2026-09-13 (Batch 65): authored. Unblocked by `math.calc.power-series` (Batch 64),
  `math.calc.higher-order-derivatives` (Batch 40), and `math.calc.linearization` (Batch 39).
  Companion batch concepts: `math.graph.shortest-path`, `math.seq.harmonic-series`,
  `math.disc.stirling-numbers`. `math.calc` moves from **71/76** toward **72/76** this batch.
