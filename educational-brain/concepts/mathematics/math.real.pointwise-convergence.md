# math.real.pointwise-convergence

## Identity
- **KG id**: `math.real.pointwise-convergence`
- **Domain**: math.real
- **Requires**: `math.real.convergence-sequences`
- **Unlocks**: `math.real.uniform-convergence`
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 4

## Learning Objective
State $f_n\to f$ pointwise on $E$ iff $\forall x\in E,\forall\varepsilon>0,\exists
N(x,\varepsilon):n>N\Rightarrow|f_n(x)-f(x)|<\varepsilon$ — recognizing this as EXACTLY
`math.real.convergence-sequences`'s own $\varepsilon$-$N$ definition applied SEPARATELY at each
fixed $x$; recognize that $N$ may depend on BOTH $\varepsilon$ AND $x$, with no requirement of a
single $N$ working everywhere; and state that pointwise convergence does NOT preserve continuity,
with Dini's theorem as the one special condition (monotone, compact domain, continuous limit)
upgrading it to uniform.

## Core Understanding
POINTWISE CONVERGENCE IS THE SAME $\varepsilon$-$N$ DEFINITION, APPLIED ONE POINT AT A TIME: for
$f_n(x)=x^n$ on $E=[0,1]$: fixing $x=1/2$ gives the ordinary number sequence $f_n(1/2)=(1/2)^n\to
0$, verified via `math.real.convergence-sequences`'s own definition. Fixing $x=1$ gives
$f_n(1)=1\to1$ trivially. Checking every $x$ this way gives $f(x)=0$ for $x<1$, $f(1)=1$ — no NEW
convergence machinery is invented; the SAME definition is applied repeatedly, once per point.

$N$ GENUINELY DEPENDS ON $x$, NOT JUST $\varepsilon$ — THE CRUCIAL NEW FEATURE: continuing with
$\varepsilon=0.01$: at $x=1/2$, $(1/2)^n<0.01$ needs $n>6.64$, so $N(1/2,0.01)=7$. At $x=0.9$,
$(0.9)^n<0.01$ needs $n>43.7$, so $N(0.9,0.01)=44$ — a MUCH larger $N$ for the SAME $\varepsilon$.
As $x\to1^-$, $N(x,0.01)\to\infty$ — no single $N$ works for all $x<1$ simultaneously. Pointwise
convergence, by definition, permits this entirely; it makes no requirement that one $N$ serve all
of $E$ at once.

POINTWISE CONVERGENCE DOES NOT PRESERVE CONTINUITY — EVERY $f_n$ CAN BE CONTINUOUS WHILE THE
LIMIT IS NOT: $f_n(x)=x^n$ are each perfectly continuous (polynomials), yet the pointwise limit
$f(x)=0$ for $x<1$, $f(1)=1$ has a JUMP DISCONTINUITY at $x=1$ — directly proving continuity is
NOT automatically transferred. This is possible precisely because continuity of each $f_n$ says
nothing about how $N(x,\varepsilon)$ behaves as $x$ varies; if it grows unboundedly near some
point, a genuine jump can appear in the limit. Dini's theorem identifies one special sufficient
condition — monotone convergence, PLUS compact domain, PLUS continuous limit — under which this
failure provably cannot happen, upgrading pointwise convergence automatically to uniform.

## Mental Models
- **"Pointwise convergence is checking the same ε-N test, once per point — never a new
  definition, just the old one applied repeatedly."**
- **"N can blow up as you approach certain points — pointwise convergence never promises a single
  N that works everywhere at once."**

## Why Students Fail

### MC-1: POINTWISE-CONVERGENCE-ASSUMED-NEW-DEFINITION
- **Surface form**: believes pointwise convergence requires a genuinely new definition, separate
  from `math.real.convergence-sequences`'s $\varepsilon$-$N$ definition.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared Foundational severity — the
  shift from sequences of numbers to sequences of functions feels like a conceptual leap requiring
  new machinery).
- **Repair**: re-walk the per-point application of the already-known $\varepsilon$-$N$ definition.

### MC-2: N-ASSUMED-INDEPENDENT-OF-X
- **Surface form**: believes a single $N$ (depending only on $\varepsilon$) must work at every
  point $x\in E$ simultaneously.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared High severity — the
  prerequisite's single-sequence setting never required $N$ to depend on anything but
  $\varepsilon$, and this habit carries over incorrectly).
- **Repair**: re-walk the explicit $N(1/2,0.01)=7$ versus $N(0.9,0.01)=44$ contrast.

### MC-3: CONTINUITY-ASSUMED-PRESERVED-BY-POINTWISE-LIMIT
- **Surface form**: believes a pointwise limit of continuous functions must itself be continuous.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared High severity — continuity
  is a "nice" property that feels like it should survive any reasonable limiting process).
- **Repair**: re-walk the $x^n$ counterexample, re-anchoring on the concrete jump at $x=1$.

## Misconceptions

### MC-1: POINTWISE-CONVERGENCE-ASSUMED-NEW-DEFINITION
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: N-ASSUMED-INDEPENDENT-OF-X
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-3: CONTINUITY-ASSUMED-PRESERVED-BY-POINTWISE-LIMIT
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Pointwise convergence is checking each guest into a hotel one at a time — every guest
  eventually gets a room (converges), but the check-in time (N) can differ wildly from guest to
  guest, with no shared deadline for everyone."**
- **Anti-analogy**: pointwise convergence of continuous functions does NOT guarantee a continuous
  limit — $x^n$ on $[0,1]$ is the standard, fully verified counterexample.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: $f_n(x)=x^n$ on $[0,1]$: fixing $x=1/2$ and $x=1$
  separately, each checked via the ordinary $\varepsilon$-$N$ definition.
- **Demonstration 2 (targets MC-2)**: $N(1/2,0.01)=7$ versus $N(0.9,0.01)=44$ for the same
  $\varepsilon=0.01$ — genuinely different, growing without bound as $x\to1^-$.
- **Demonstration 3 (targets MC-3)**: $x^n$'s pointwise limit has a jump discontinuity at $x=1$,
  despite every $f_n$ being continuous.

## Discovery Questions
1. "Does checking pointwise convergence require a genuinely new definition, separate from the
   ε-N definition for number sequences?"
2. "For a fixed ε, must the same N work at every point x in E for pointwise convergence?"
3. "If every $f_n$ in a sequence is continuous, must its pointwise limit also be continuous?"

## Teaching Sequence
1. **Representation shift**: state the per-point application directly, working Demonstration 1's
   point-by-point check, isolating MC-1.
2. **Conflict evidence**: Demonstration 2's explicit $N(x,\varepsilon)$ computation, isolating MC-2
   by requiring the $x$-dependence acknowledged concretely.
3. **Contrast pair**: Demonstration 3's continuity-failure counterexample, isolating MC-3 by
   requiring the jump discontinuity confirmed despite every $f_n$'s continuity.
4. **Mastery gate**: require a correct pointwise limit computed for a new function sequence, a
   correct $N(x,\varepsilon)$ computation (or explanation of why one formula suffices), a correct
   continuity-failure example, and a correct identification of which Dini hypothesis fails when
   applicable, at the Blueprint's own stated MAMR of 5/5 (⌈0.85×5⌉).

## Tutor Actions
- Never accept pointwise convergence checked via anything other than the ordinary $\varepsilon$-
  $N$ definition applied per point.
- Never accept a single $N$ assumed to work across all of $E$ without verification.
- Never accept "continuous functions converge to a continuous limit" stated without the $x^n$
  counterexample addressed.

## Voice Teaching Notes
- Say "does that N work at every point, or just the one you checked?" whenever pointwise
  convergence is verified.
- When continuity of a limit is assumed, ask "is that guaranteed, or could this be like $x^n$?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes the pointwise limit of a new function
  sequence via the per-point $\varepsilon$-$N$ check.
- **Rung 2 (application)**: learner correctly computes $N(x,\varepsilon)$ for a new sequence,
  demonstrating the $x$-dependence.
- **Rung 3 (transfer)**: learner correctly explains why a signal-processing engineer cannot assume
  a single approximation-term count achieves uniform accuracy, and identifies which Dini
  hypothesis would need to hold to guarantee uniform convergence instead.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the per-point application of the ε-N definition.
- If MC-2 recurs, re-walk the explicit $N(1/2,0.01)$ vs $N(0.9,0.01)$ contrast.
- If MC-3 recurs, re-walk the $x^n$ counterexample.

## Memory Hooks
- "Pointwise convergence is the same old ε-N test, just applied one point at a time."
- "N can blow up near certain points — pointwise convergence never promises otherwise."
- "Continuous functions can converge to a discontinuous limit — x^n on [0,1] proves it."

## Transfer Connections
- `math.real.convergence-sequences` (already authored, this campaign, Batch 112): supplies the
  rigorous $\varepsilon$-$N$ definition this concept applies point-by-point to sequences of
  functions.
- `math.real.uniform-convergence` (not yet authored): the KG's declared unlock, developing the
  strictly stronger notion (a single $N$ working uniformly across $E$) motivated directly by this
  concept's demonstrated continuity-preservation failure.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.real.pointwise-convergence.md`, reused by
  reference for its per-point ε-N application, its explicit $N(x,\varepsilon)$ computation, its
  $x^n$ continuity-failure counterexample, and its three-misconception registry (severity levels
  adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe, examining a signal-processing
  approximation scenario and identifying Dini's theorem as the condition that would guarantee
  uniform convergence.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `math.real.
  convergence-sequences`, unlocks `math.real.uniform-convergence`, cross_links none,
  expert/apply, mastery_threshold 0.85, estimated_hours 4) was directly verified against the live
  KG and matches exactly.

## Version History
- 2026-09-19 (Batch 121): authored. Second entry this batch. Companion batch concept:
  `math.prob.continuous-distributions`.
