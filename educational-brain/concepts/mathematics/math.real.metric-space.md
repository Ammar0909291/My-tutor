# math.real.metric-space

## Identity
- **KG id**: `math.real.metric-space`
- **Domain**: math.real
- **Requires**: `math.found.set-theory`, `math.found.real-numbers`
- **Unlocks**: `math.real.open-sets`, `math.real.completeness-metric`, `math.real.compactness`
- **Cross-links**: `math.top.topological-space`, `math.fnal.normed-space` (KG-declared and
  Blueprint-claimed as "authored," but NEITHER is actually authored — verified via `ls`;
  independence mode used instead, see Curriculum Feedback)
- **Difficulty**: expert
- **Bloom level**: understand
- **Mastery threshold**: 0.85
- **Estimated hours**: 5

## Learning Objective
State the three METRIC AXIOMS (identity of indiscernibles, symmetry, triangle inequality) and
derive NON-NEGATIVITY as a THEOREM, never a fourth independent axiom; recognize that "metric"
means ANY function satisfying these axioms — never restricted to the Euclidean formula — verified
across Euclidean, taxicab, max, discrete, and sup metrics; and define open balls
$B(x,r)=\{y:d(x,y)<r\}$, recognizing their SHAPE genuinely depends on the chosen metric.

## Core Understanding
A METRIC IS ANY FUNCTION SATISFYING THE THREE AXIOMS — NEVER RESTRICTED TO THE EUCLIDEAN FORMULA:
measuring $(0,0)$ to $(3,4)$ three ways: Euclidean $d_2=\sqrt{3^2+4^2}=5$; taxicab
$d_1=|3|+|4|=7$; max $d_\infty=\max(3,4)=4$ — three DIFFERENT numbers, yet each satisfies
$d(x,y)=0\Leftrightarrow x=y$, symmetry, and the triangle inequality. The DISCRETE metric
($d(x,y)=0$ if $x=y$, else 1) works on ANY set, even with no geometric structure whatsoever — the
axioms, not any particular formula, define what "distance" means.

NON-NEGATIVITY IS A THEOREM DERIVED FROM THE THREE AXIOMS, NEVER A FOURTH INDEPENDENT ASSUMPTION:
by the triangle inequality with $z=x$: $d(x,x)\le d(x,y)+d(y,x)$. By identity of indiscernibles,
$d(x,x)=0$; by symmetry, $d(y,x)=d(x,y)$. So $0\le2d(x,y)$, giving $d(x,y)\ge0$ — derived from
exactly the three stated axioms, using all three, showing the definition is economical: nothing
redundant is assumed.

THE TRIANGLE INEQUALITY BOUNDS THE DIRECT DISTANCE ABOVE BY THE DETOUR, NEVER THE REVERSE: for
$x=0,y=5,z=1$ in $\mathbb R$: direct $d(0,1)=1$; detour $d(0,5)+d(5,1)=5+4=9$; indeed $1\le9$ —
"going home to school directly is never longer than a detour through the store." Writing
$d(x,z)\ge d(x,y)+d(y,z)$ reverses this and produces absurd conclusions (a direct route being
LONGER than a detour). Ball SHAPE depends on the metric: $B((0,0),1)$ is a circle under $d_2$, a
diamond under $d_1$, a square under $d_\infty$ — the same center and radius, three genuinely
different sets.

## Mental Models
- **"A metric is whatever satisfies the three axioms — there's no external 'real distance' to
  compare against; the axioms ARE the definition."**
- **"Detours never save distance — the triangle inequality's direction is direct ≤ detour, always,
  never the reverse."**

## Why Students Fail

### MC-1: METRIC-IS-EUCLIDEAN
- **Surface form**: equates "metric" with the Euclidean distance formula, rejecting the discrete
  or taxicab metrics as "not real distances."
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared Foundational severity —
  Euclidean distance is the only distance encountered before this concept, making it feel like
  THE definition rather than one instance).
- **Repair**: re-verify the discrete metric's three axioms directly, re-anchoring on the axioms
  themselves as the full definition.

### MC-2: NONNEGATIVITY-AS-AXIOM
- **Surface form**: lists $d\ge0$ as an independent fourth axiom, unable to derive it.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared severity — rote
  memorization of "the axioms of a metric" often includes non-negativity as a listed property
  without the derivation being shown).
- **Repair**: re-derive non-negativity from the triangle inequality with $z=x$, using all three
  axioms explicitly.

### MC-3: TRIANGLE-DIRECTION-REVERSED
- **Surface form**: writes the triangle inequality as $d(x,z)\ge d(x,y)+d(y,z)$, or misapplies it
  with the wrong intermediate point.
- **Birth type**: Type 4, notation-induced (Blueprint's own declared severity — the three-term
  inequality's direction is easy to flip when manipulated algebraically under pressure).
- **Repair**: re-anchor on the physical "detours never save distance" interpretation, sanity-
  checked against a concrete numeric example.

## Misconceptions

### MC-1: METRIC-IS-EUCLIDEAN
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: NONNEGATIVITY-AS-AXIOM
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-3: TRIANGLE-DIRECTION-REVERSED
- **Surface form**: as described above.
- **Root cause (Type 4)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A metric space is a rulebook for 'distance,' not a specific ruler — Euclidean, taxicab, and
  discrete distance are three different rulers that all follow the same three rules."**
- **Anti-analogy**: the discrete metric is NOT a lesser or fake metric — it satisfies all three
  axioms exactly, on ANY set, even one with no geometric structure at all.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: $(0,0)$ to $(3,4)$: $d_2=5$, $d_1=7$, $d_\infty=4$ — three
  valid metrics, three different numbers.
- **Demonstration 2 (targets MC-2)**: the non-negativity derivation via $d(x,x)\le d(x,y)+d(y,x)$,
  using all three axioms.
- **Demonstration 3 (targets MC-3)**: $d(0,1)=1\le d(0,5)+d(5,1)=9$ in $\mathbb R$ — direct never
  exceeds detour.

## Discovery Questions
1. "Is the discrete metric a legitimate metric, or is it 'not a real distance'?"
2. "How many independent axioms define a metric — three, or four?"
3. "Does the triangle inequality say the direct distance can exceed the detour, or the reverse?"

## Teaching Sequence
1. **Representation shift**: three concrete distance computations on the same pair of points,
   working Demonstration 1, isolating MC-1 before the word "axiom" is even introduced.
2. **Contrast pair**: valid metrics versus axiom-failures (e.g. $(x-y)^2$ failing the triangle
   inequality), working Demonstration 2's non-negativity derivation, isolating MC-2.
3. **Analogy bridge**: open balls generalizing the interval, working Demonstration 3's direction
   check, isolating MC-3.
4. **Mastery gate**: require a correct three-axiom verification for a new candidate metric, a
   correct non-negativity derivation from memory, and a correct open-ball description under a new
   metric, at the Blueprint's own stated MAMR of 5/5 (⌈0.85×5⌉).

## Tutor Actions
- Never accept "metric" restricted to the Euclidean formula.
- Never accept non-negativity listed as an independent axiom rather than derived.
- Never accept the triangle inequality stated with the direction reversed.

## Voice Teaching Notes
- Say "does this satisfy the three axioms, or are you rejecting it because it doesn't look
  Euclidean?" whenever a candidate metric is evaluated.
- When the triangle inequality is applied, ask "is the direct distance bounded above by the
  detour, or did that get reversed?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly verifies whether a candidate function is a metric
  by checking all three axioms.
- **Rung 2 (application)**: learner correctly derives non-negativity from the three axioms.
- **Rung 3 (transfer)**: learner correctly describes an open ball's shape under a new metric and
  explains why convergence under the discrete metric is far more restrictive than Euclidean
  intuition suggests.

## Tutor Recovery Strategy
- If MC-1 recurs, re-verify the discrete metric's three axioms directly.
- If MC-2 recurs, re-derive non-negativity from the triangle inequality with $z=x$.
- If MC-3 recurs, re-anchor on the "detours never save distance" interpretation.

## Memory Hooks
- "A metric is whatever satisfies the three axioms — no external 'real distance' required."
- "Non-negativity is a theorem, not a fourth axiom — derive it, don't memorize it."
- "Direct never exceeds detour — the triangle inequality's direction, always."

## Transfer Connections
- `math.found.set-theory` (already authored, certified domain): supplies the set and Cartesian-
  product vocabulary $d:X\times X\to\mathbb R$ this concept's definition is built on.
- `math.found.real-numbers` (already authored, certified domain): supplies the absolute value
  $|x-y|$ as the prototype metric and the real triangle inequality underlying most verifications.
- `math.real.open-sets` (not yet authored): the KG's declared unlock, defining open/closed sets
  and interior/closure via this concept's open balls.
- `math.real.completeness-metric` (not yet authored): the KG's declared unlock, extending Cauchy
  sequences and completeness to general metric spaces.
- `math.real.compactness` (not yet authored): the KG's declared unlock, developing sequential
  compactness and total boundedness in metric spaces.
- `math.top.topological-space` (not yet authored): the KG's declared cross-link target, where this
  concept's open-ball-generates-open-sets insight is formalized without reference to any
  particular metric.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.real.metric-space.md`, reused by reference
  for its three-distances-one-structure representation shift, its valid-metric-versus-axiom-
  failure contrast, its open-ball analogy bridge, and its three-misconception registry (severity
  levels adopted directly as declared).
- Transfer probe: the Blueprint's own probe, proving open balls are open sets and that $d_2$ and
  $d_\infty$ generate the same open sets on $\mathbb R^2$ — used here in INDEPENDENCE mode (see
  Curriculum Feedback).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Blueprint/P76-mode discrepancy found and corrected (TWELFTH occurrence this campaign)**: the
  Blueprint's own Component 7 lists `math.top.topological-space` as an authored Tier-1 cross-link,
  setting P76_mode to cross-link probe, with `math.fnal.normed-space` separately noted as
  "documented for future linkage, not probed." Verified via `ls
  educational-brain/concepts/mathematics/` that NEITHER `math.top.topological-space` nor
  `math.fnal.normed-space` has an authored Educational Brain entry — the same wrong-corpus
  pattern noted repeatedly this campaign. This entry uses INDEPENDENCE mode instead, treating the
  Blueprint's own open-ball/metric-equivalence transfer probe as self-contained. All other fields
  (requires `math.found.set-theory`/`math.found.real-numbers`, unlocks `math.real.open-sets`/
  `math.real.completeness-metric`/`math.real.compactness`, cross_links `math.top.topological-
  space`/`math.fnal.normed-space`, expert/understand, mastery_threshold 0.85, estimated_hours 5)
  matched exactly.

## Version History
- 2026-09-19 (Batch 124): authored. Second entry this batch, opening the `math.real` domain's
  entry point independent of the convergence-sequences chain. Companion batch concept:
  `math.prob.linearity-expectation`.
