# math.meas.simple-function

## Identity
- **KG id**: `math.meas.simple-function`
- **Domain**: math.meas
- **Requires**: `math.meas.measurable-function`
- **Unlocks**: `math.meas.lebesgue-integral`
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 3

## Learning Objective
Define a SIMPLE FUNCTION $\varphi=\sum_{i=1}^na_i\mathbb 1_{E_i}$ (a FINITE linear combination of
indicator functions of measurable sets); compute its integral DIRECTLY as the finite sum
$\int\varphi\,d\mu=\sum_ia_i\mu(E_i)$, with NO limiting process required; and state the MONOTONE
APPROXIMATION theorem (every non-negative measurable function is the limit of an increasing
sequence of simple functions), constructing a specific approximating sequence for a given
function.

## Core Understanding
A SIMPLE FUNCTION TAKES ONLY FINITELY MANY VALUES, EACH ON A MEASURABLE LEVEL SET: for
$\varphi(x)=2$ on $[0,1)$, $\varphi(x)=5$ on $[1,3)$, $\varphi(x)=0$ on $[3,4]$, this IS simple —
exactly 3 distinct values, each attained on a measurable set, writing
$\varphi=2\cdot\mathbb1_{[0,1)}+5\cdot\mathbb1_{[1,3)}+0\cdot\mathbb1_{[3,4]}$ matches the
indicator-sum definition exactly, reusing `math.meas.measurable-function`'s own measurability
condition for each level set $E_i$.

INTEGRATING A SIMPLE FUNCTION IS A FINITE SUM, NEVER A LIMITING PROCESS: because $\varphi$ takes
only finitely many values, $\int\varphi\,d\mu=\sum_ia_i\mu(E_i)$ is EXACT and IMMEDIATE — for the
example above, $\int\varphi\,d\mu=2\cdot\mu([0,1))+5\cdot\mu([1,3))+0\cdot\mu([3,4])=2(1)+5(2)+0(1)
=12$, a direct finite computation matching the "area under a step function" intuition, in sharp
contrast to the general Lebesgue integral (which IS built as a limit, but of exactly these
simple-function integrals).

MONOTONE APPROXIMATION IS A CONSTRUCTIVE FACT, NEVER MERELY AN ABSTRACT EXISTENCE CLAIM: every
non-negative measurable $f$ equals the limit of an increasing sequence $\varphi_1\le\varphi_2\le
\cdots\to f$ of simple functions. For $f(x)=x^2$ on $[0,1]$: partitioning into $n$ equal pieces
and setting $\varphi_n$ to the INFIMUM of $f$ on each piece gives, for $n=2$, $\varphi_2(x)=0$ on
$[0,0.5)$ and $\varphi_2(x)=0.25$ on $[0.5,1]$ — a concrete, computable sequence with
$\varphi_n\le\varphi_{n+1}\le f$, refining as $n$ grows. This is the exact bridge: $\int f\,d\mu$
is DEFINED as the limit of the already-known, easy simple-function integrals $\int\varphi_n\,d\mu$.

## Mental Models
- **"A simple function is a staircase — finitely many flat steps, each with a measurable
  footprint; the integral is just height times footprint-size, added up."**
- **"Monotone approximation isn't a promise you take on faith — you can build the approximating
  staircase yourself, by partitioning finer and taking the smallest value on each piece."**

## Why Students Fail

### MC-1: SIMPLE-FUNCTION-INTEGRAL-ASSUMED-TO-NEED-A-LIMIT
- **Surface form**: believes integrating a simple function requires a limiting process like the
  general Lebesgue integral.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared Foundational severity —
  the general Lebesgue integral's limit-based machinery is easy to over-apply to the simple case
  that doesn't need it).
- **Repair**: re-walk the direct, one-step finite-sum computation, re-anchoring on simple
  functions being easy precisely because they need no limit.

### MC-2: SIMPLE-FUNCTION-VALUES-OR-LEVEL-SETS-MISIDENTIFIED
- **Surface form**: incorrectly identifies the distinct values a simple function takes, or
  misidentifies the measurable set where each value is attained.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared Foundational severity —
  reading interval boundaries precisely from a step-function graph is error-prone without careful
  value-by-value verification).
- **Repair**: re-walk the explicit value-by-value, interval-by-interval identification directly
  from the function's graph.

### MC-3: MONOTONE-APPROXIMATION-TREATED-AS-PURELY-ABSTRACT
- **Surface form**: accepts the monotone approximation theorem as an abstract existence claim
  without constructing or reasoning about a specific approximating sequence.
- **Birth type**: Type 2, perceptual intuition (Blueprint's own declared Moderate severity — an
  existence theorem for "some sequence" invites treating it as unconstructed).
- **Repair**: re-walk the explicit partition-and-infimum construction, showing the sequence can be
  built directly, not merely asserted.

## Misconceptions

### MC-1: SIMPLE-FUNCTION-INTEGRAL-ASSUMED-TO-NEED-A-LIMIT
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: SIMPLE-FUNCTION-VALUES-OR-LEVEL-SETS-MISIDENTIFIED
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-3: MONOTONE-APPROXIMATION-TREATED-AS-PURELY-ABSTRACT
- **Surface form**: as described above.
- **Root cause (Type 2)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A simple function's integral is literally 'height times width, summed' — the same
  step-function-area idea from elementary math, now stated with measures instead of lengths."**
- **Anti-analogy**: integrating a simple function is NOT a scaled-down version of the general
  limit-based Lebesgue integral — it is a genuinely finite, exact computation requiring no limit
  at all.

## Demonstrations
- **Demonstration 1 (targets MC-2)**: $\varphi(x)=2,5,0$ on $[0,1),[1,3),[3,4]$ respectively,
  written explicitly as $2\cdot\mathbb1_{[0,1)}+5\cdot\mathbb1_{[1,3)}+0\cdot\mathbb1_{[3,4]}$.
- **Demonstration 2 (targets MC-1)**: $\int\varphi\,d\mu=2(1)+5(2)+0(1)=12$, a direct finite sum,
  no limiting process.
- **Demonstration 3 (targets MC-3)**: $f(x)=x^2$ on $[0,1]$ approximated by $\varphi_n$ via
  infimum-on-each-piece; for $n=2$, $\varphi_2=0$ on $[0,0.5)$, $\varphi_2=0.25$ on $[0.5,1]$,
  concretely refining toward $f$.

## Discovery Questions
1. "Does integrating even a simple function require a limiting process, like the general Lebesgue
   integral does?"
2. "Can you correctly identify every distinct value a step function takes, and the exact interval
   where each is attained?"
3. "Can monotone approximation's guaranteed sequence actually be constructed, or is it purely an
   abstract existence claim?"

## Teaching Sequence
1. **Representation shift**: state the indicator-sum definition, working Demonstration 1's direct
   verification, isolating MC-2 by requiring exact value-by-value identification.
2. **Representation shift**: Demonstration 2's direct finite-sum integral computation, isolating
   MC-1 by requiring the "no limit needed" property stated explicitly.
3. **Representation shift**: Demonstration 3's explicit partition-and-infimum construction,
   isolating MC-3 by requiring a concrete approximating sequence built, not merely cited.
4. **Mastery gate**: require a correct simple-function verification and indicator-sum rewrite for
   a new step function, a correct finite-sum integral computation, and a correct construction of
   an approximating simple function for a new non-negative function, at the Blueprint's own stated
   MAMR of 5/5 (⌈0.85×5⌉).

## Tutor Actions
- Never accept a simple function's integral computed via any limiting process.
- Never accept a simple function's value-to-interval correspondence stated without exact boundary
  verification.

## Voice Teaching Notes
- Say "does this integral need a limit, or is it just a finite sum?" whenever a simple function's
  integral is computed.
- When monotone approximation is invoked, ask "can you actually build that approximating
  sequence, or are you just citing the theorem?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly verifies a new function is simple and rewrites it in
  indicator-sum form.
- **Rung 2 (application)**: learner correctly computes a simple function's integral as a direct
  finite sum.
- **Rung 3 (transfer)**: learner correctly constructs a specific increasing simple-function
  sequence approximating a new non-negative measurable function.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the direct one-step finite-sum computation.
- If MC-2 recurs, re-walk the value-by-value, interval-by-interval identification.
- If MC-3 recurs, re-walk the explicit partition-and-infimum construction.

## Memory Hooks
- "Simple functions are easy precisely because they need no limit — height times footprint,
  summed."
- "Read the graph carefully — each flat segment is one term."
- "Monotone approximation is buildable, not just assertable — partition finer, take the minimum."

## Transfer Connections
- `math.meas.measurable-function` (already authored, this campaign, Batch 111): supplies the
  measurability condition each level set $E_i$ in a simple function's definition must satisfy.
- `math.meas.lebesgue-measure` (already authored, this campaign, Batch 110): supplies the
  $\mu(E_i)$ values this concept's integral formula directly multiplies against.
- `math.meas.lebesgue-integral` (not yet authored): the KG's declared unlock, defined directly via
  this concept's monotone approximation of a general measurable function by simple functions.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.meas.simple-function.md`, reused by
  reference for its indicator-sum definition, its direct finite-sum integral computation, its
  explicit monotone-approximation construction, and its three-misconception registry (severity
  levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe, examining a histogram (a step
  function of bucket heights) as a concrete real-world simple function, computing its total area
  via the finite-sum formula, and extending to smooth data via monotone approximation.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `math.meas.
  measurable-function`, unlocks `math.meas.lebesgue-integral`, cross_links none,
  expert/apply, mastery_threshold 0.85, estimated_hours 3) was directly verified against the live
  KG and matches exactly.

## Version History
- 2026-09-19 (Batch 114): authored. First entry this batch. Companion batch concept:
  `math.real.cauchy-sequence`.
