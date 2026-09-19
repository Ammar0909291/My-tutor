# math.real.uniform-continuity

## Identity
- **KG id**: `math.real.uniform-continuity`
- **Domain**: math.real
- **Requires**: `math.real.continuity-rigorous`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 4

## Learning Objective
Recognize the precise SYNTAX difference from pointwise continuity — ordinary continuity allows
$\delta$ to depend on BOTH $x$ and $\varepsilon$; UNIFORM continuity requires a SINGLE
$\delta(\varepsilon)$ working simultaneously for EVERY $x$; exhibit $f(x)=1/x$ on $(0,1)$ as
continuous everywhere yet NOT uniformly continuous, by showing no single $\delta$ works for all
$x$; and state and apply the HEINE-CANTOR theorem (every continuous function on a COMPACT set is
automatically uniformly continuous), correctly explaining why this does NOT contradict the
counterexample.

## Core Understanding
THE QUANTIFIER ORDER IS THE ENTIRE DIFFERENCE: pointwise continuity at $a$ reads
"$\forall\varepsilon,\exists\delta(a,\varepsilon)$" — $\delta$ may depend on WHICH point is being
checked. Uniform continuity reads "$\forall\varepsilon,\exists\delta(\varepsilon),\forall x,y$" —
the SAME $\delta$, depending on $\varepsilon$ ALONE, must work for EVERY pair simultaneously.
Uniform continuity is STRICTLY STRONGER: a uniformly continuous function is automatically
continuous everywhere (fix $y=a$), but the converse can fail.

$1/x$ ON $(0,1)$ IS CONTINUOUS EVERYWHERE YET FAILS UNIFORM CONTINUITY: fix $\varepsilon=1$ and
take $x_n=1/n$, $y_n=1/(n+1)$: $|x_n-y_n|=\frac1{n(n+1)}\to0$ (arbitrarily close together), yet
$|f(x_n)-f(y_n)|=|n-(n+1)|=1=\varepsilon$ EXACTLY, for every $n$ — no candidate $\delta$ can ever
work, since some sufficiently large $n$ gives $|x_n-y_n|<\delta$ while the output gap stays fixed
at 1. Every INDIVIDUAL point is perfectly continuous; the failure is that the required $\delta$
shrinks toward 0 as $x\to0^+$, with no uniform bound possible across the whole interval.

HEINE-CANTOR: COMPACTNESS UPGRADES CONTINUITY TO UNIFORM CONTINUITY FOR FREE, EXPLAINING (NOT
CONTRADICTING) THE COUNTEREXAMPLE: any function continuous on a COMPACT set is AUTOMATICALLY
uniformly continuous there. $(0,1)$ is NOT compact (bounded but not closed, missing the limit
point 0) — so the theorem's hypothesis simply doesn't apply there. On $[0.1,1]$ (closed, bounded,
hence compact, strictly avoiding 0), the SAME function $f(x)=1/x$ IS automatically uniformly
continuous by Heine-Cantor — the theorem's guarantee applies exactly where compactness genuinely
holds, and fails to apply exactly where it doesn't.

## Mental Models
- **"Pointwise continuity lets you pick a fresh δ for every point you check; uniform continuity
  demands one δ that survives every point at once, chosen in advance."**
- **"A function can be perfectly well-behaved at every single point and still have no uniform
  'safety margin' across the whole domain — the margin required can shrink toward zero as you
  approach a missing edge."**

## Why Students Fail

### MC-1: UNIFORM-CONTINUITY-ASSUMED-EQUIVALENT-TO-POINTWISE
- **Surface form**: believes uniform continuity is just a restatement of ordinary pointwise
  continuity.
- **Birth type**: Foundational severity (Blueprint's own declared severity — the definitions look
  superficially similar, obscuring that the quantifier order changes the claim's strength
  dramatically).
- **Repair**: re-walk the symbol-by-symbol quantifier comparison.

### MC-2: POINTWISE-CONTINUITY-ASSUMED-TO-IMPLY-UNIFORM
- **Surface form**: believes continuity at every individual point automatically implies uniform
  continuity on the domain.
- **Birth type**: High severity (Blueprint's own declared severity — "true everywhere, point by
  point" naturally feels like it should compose into a single uniform guarantee).
- **Repair**: re-walk the rigorous $1/x$ sequence-pair counterexample.

### MC-3: HEINE-CANTOR-ASSUMED-TO-CONFLICT-WITH-COUNTEREXAMPLES
- **Surface form**: believes the Heine-Cantor theorem's guarantee conflicts with non-compact
  counterexamples like $1/x$ on $(0,1)$.
- **Birth type**: Moderate severity (Blueprint's own declared severity — a theorem and its
  apparent counterexample side by side naturally read as contradictory before the hypothesis
  mismatch is spotted).
- **Repair**: re-walk the compact-subdomain resolution, showing the theorem's hypothesis simply
  doesn't hold on $(0,1)$.

## Misconceptions

### MC-1: UNIFORM-CONTINUITY-ASSUMED-EQUIVALENT-TO-POINTWISE
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

### MC-2: POINTWISE-CONTINUITY-ASSUMED-TO-IMPLY-UNIFORM
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

### MC-3: HEINE-CANTOR-ASSUMED-TO-CONFLICT-WITH-COUNTEREXAMPLES
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

## Analogies
- **"Pointwise continuity is a tailor fitting one customer at a time; uniform continuity is
  cutting one pattern that fits every customer in the shop simultaneously, chosen before anyone
  walks in."**
- **Anti-analogy**: passing a continuity check at every individual point does NOT guarantee a
  single uniform tolerance works across the whole domain — $1/x$ on $(0,1)$ is the standing
  counterexample.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the symbol-by-symbol quantifier comparison between pointwise
  and uniform continuity.
- **Demonstration 2 (targets MC-2)**: the $x_n=1/n$, $y_n=1/(n+1)$ sequence pair, closing
  distance while the output gap stays fixed at 1.
- **Demonstration 3 (targets MC-3)**: the same function $1/x$ failing on $(0,1)$ but succeeding
  automatically (via Heine-Cantor) on the compact $[0.1,1]$.

## Discovery Questions
1. "Is uniform continuity's definition just a restatement of ordinary pointwise continuity?"
2. "If a function is continuous at every single point of its domain, must it be uniformly
   continuous there too?"
3. "Does the Heine-Cantor theorem's guarantee of automatic uniform continuity on compact sets
   conflict with a function that fails to be uniformly continuous on a non-compact set?"

## Teaching Sequence
1. **Representation shift**: the quantifier-order comparison, isolating MC-1.
2. **Conflict evidence**: the $1/x$ sequence-pair counterexample on $(0,1)$, isolating MC-2.
3. **Contrast pair**: the same function's automatic success on the compact $[0.1,1]$ via
   Heine-Cantor, isolating MC-3.
4. **Mastery gate**: require a correct side-by-side statement of both definitions, a correct
   Heine-Cantor-based proof on a compact domain, and a correct sequence-pair counterexample for a
   new function on a non-compact domain, at the Blueprint's own stated MAMR of 5/5 (⌈0.85×5⌉).

## Tutor Actions
- Never accept uniform continuity treated as equivalent to pointwise continuity.
- Never accept pointwise continuity at every point presented as sufficient for uniform
  continuity.
- Never accept the Heine-Cantor theorem and a non-compact counterexample presented as
  contradictory.

## Voice Teaching Notes
- Say "does the δ you found depend only on ε, or also on which point you're checking?" whenever
  uniform continuity is being verified.
- When a counterexample to uniform continuity is discussed alongside Heine-Cantor, ask "is the
  domain here actually compact?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly states both definitions side by side, identifying
  the differing quantifier position.
- **Rung 2 (application)**: learner correctly applies Heine-Cantor to confirm uniform continuity
  on a new compact domain.
- **Rung 3 (transfer)**: learner correctly explains why a numerical sampling algorithm needs
  uniform (not merely pointwise) continuity for a single sampling density to work reliably across
  an entire domain, and identifies the practical failure mode near a missing endpoint.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the quantifier-order comparison.
- If MC-2 recurs, re-walk the $1/x$ sequence-pair counterexample.
- If MC-3 recurs, re-walk the compact-subdomain resolution.

## Memory Hooks
- "Pointwise: a fresh δ per point. Uniform: one δ for the whole domain, chosen first."
- "Continuous everywhere doesn't mean uniformly continuous — 1/x on (0,1) is the standing
  counterexample."
- "Heine-Cantor's guarantee only kicks in on compact domains — a non-compact counterexample
  doesn't contradict it, it just falls outside its hypothesis."

## Transfer Connections
- `math.real.continuity-rigorous` (already authored, this campaign, Batch 130): supplies the
  pointwise $\varepsilon$-$\delta$ definition this concept's uniform version directly contrasts
  against via quantifier order.
- `math.real.compactness` (already authored, this campaign, Batch 126): supplies the compactness
  definition underlying the Heine-Cantor theorem's hypothesis.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.real.uniform-continuity.md`, reused by
  reference for its quantifier-order comparison, its rigorous $1/x$ sequence-pair counterexample,
  its Heine-Cantor compact-subdomain resolution, and its three-misconception registry (severity
  levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe, reasoning about a numerical
  sampling algorithm's reliance on uniform continuity and the practical failure mode near a
  missing domain endpoint.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.real.continuity-rigorous`, unlocks none, cross_links none, expert/apply,
  mastery_threshold 0.85, estimated_hours 4) was directly verified against the live KG and
  matches exactly.

## Version History
- 2026-09-19 (Batch 132): authored. Second entry this batch. Companion batch concept:
  `math.real.differentiability-rigorous`.
