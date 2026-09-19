# math.real.mvt

## Identity
- **KG id**: `math.real.mvt`
- **Domain**: math.real
- **Requires**: `math.real.differentiability-rigorous`
- **Unlocks**: `math.real.taylor-rigorous`
- **Cross-links**: `math.calc.mean-value-theorem` (confirmed genuinely authored via `ls`; genuine
  cross-link probe used, consistent with the Blueprint's own correctly-checked claim)
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.9
- **Estimated hours**: 4

## Learning Objective
State the Mean Value Theorem precisely and PROVE it via Rolle's Theorem — constructing the
auxiliary function $g(x)=f(x)-f(a)-\frac{f(b)-f(a)}{b-a}(x-a)$ (subtracting off the secant line)
and applying Rolle's Theorem to $g$ — recognizing MVT as a direct CONSEQUENCE, never
independently proven; apply $f'=0$ on an interval to conclude $f$ is EXACTLY, provably constant;
and connect the rigorous proof to `math.calc.mean-value-theorem`'s own applied intuition, verifying
both describe the identical fact.

## Core Understanding
THE MVT IS ROLLE'S THEOREM APPLIED TO ONE SPECIFIC AUXILIARY FUNCTION, NEVER A SEPARATE ARGUMENT:
Rolle's Theorem: $f$ continuous on $[a,b]$, differentiable on $(a,b)$, $f(a)=f(b)$ $\Rightarrow$
some $c\in(a,b)$ has $f'(c)=0$. Constructing $g(x)=f(x)-f(a)-\frac{f(b)-f(a)}{b-a}(x-a)$: this
subtracts off the secant line, so $g(a)=0$ and $g(b)=0$ BY CONSTRUCTION. Rolle's Theorem applies
directly to $g$: some $c$ has $g'(c)=0$; since $g'(x)=f'(x)-\frac{f(b)-f(a)}{b-a}$, this means
$f'(c)=\frac{f(b)-f(a)}{b-a}$ — exactly MVT's conclusion, DERIVED, not asserted.

$f'=0$ EVERYWHERE FORCES $f$ TO BE EXACTLY CONSTANT, NEVER JUST APPROXIMATELY FLAT: if $f'(x)=0$
throughout an interval, for ANY two points $x_1<x_2$, MVT gives some $c$ with
$f'(c)=\frac{f(x_2)-f(x_1)}{x_2-x_1}$. Since $f'(c)=0$, this forces $f(x_2)=f(x_1)$ EXACTLY, for
every such pair — $f$ takes the identical value everywhere on the interval, a precise, provable
equality, never an approximation.

THE RIGOROUS AND APPLIED MVT DESCRIBE THE IDENTICAL FACT: `math.calc.mean-value-theorem` already
established MVT informally (tangent parallel to secant; instantaneous rate equals average rate
somewhere), TRUSTING the theorem's existence claim without proving it. For $f(x)=x^2$ on $[1,4]$
(that concept's own example, finding $c=2.5$ by solving $f'(c)=5$): the auxiliary function
$g(x)=x^2-5x+4$ satisfies $g(1)=g(4)=0$; Rolle's Theorem gives $g'(c)=2c-5=0\Rightarrow c=2.5$ —
MATCHING that value exactly, but now DERIVED from Rolle's Theorem rather than simply asserted to
exist.

## Mental Models
- **"The MVT isn't a new theorem to prove from scratch — it's Rolle's Theorem in disguise, applied
  to one function specifically engineered to vanish at both endpoints."**
- **"When a derivative is zero everywhere, the theorem doesn't just suggest the function stays
  put — it forces an exact equality between any two points, no approximation involved."**

## Why Students Fail

### MC-1: MVT-PROVEN-INDEPENDENTLY-OF-ROLLE
- **Surface form**: believes MVT is proven by an argument independent of Rolle's Theorem.
- **Birth type**: Foundational severity (Blueprint's own declared severity — MVT and Rolle's
  Theorem are often taught as two separate named results, obscuring their direct reduction
  relationship).
- **Repair**: re-walk the auxiliary-function construction and Rolle's Theorem application in
  full.

### MC-2: ZERO-DERIVATIVE-ASSUMED-ONLY-APPROXIMATE-CONSTANCY
- **Surface form**: believes $f'=0$ throughout an interval only guarantees $f$ is roughly or
  approximately constant.
- **Birth type**: Foundational severity (Blueprint's own declared severity — "the slope is zero"
  feels like a qualitative, approximate statement rather than a lever for an exact equality).
- **Repair**: re-walk the exact-equality derivation via MVT applied to two arbitrary points.

### MC-3: RIGOROUS-AND-APPLIED-MVT-TREATED-AS-DIFFERENT-FACTS
- **Surface form**: believes the rigorous (Rolle-based) MVT and the applied (informal) MVT prove
  two different facts.
- **Birth type**: Moderate severity (Blueprint's own declared severity — a "rigorous" version of a
  familiar fact often reads as a genuinely new, separate result rather than the same fact finally
  proven).
- **Repair**: re-walk the side-by-side comparison landing on the identical $c=2.5$.

## Misconceptions

### MC-1: MVT-PROVEN-INDEPENDENTLY-OF-ROLLE
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

### MC-2: ZERO-DERIVATIVE-ASSUMED-ONLY-APPROXIMATE-CONSTANCY
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

### MC-3: RIGOROUS-AND-APPLIED-MVT-TREATED-AS-DIFFERENT-FACTS
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

## Analogies
- **"The auxiliary function is like tilting a photograph until the two endpoints line up level —
  once they're level, Rolle's Theorem is just the statement that a level curve has a flat point
  somewhere in between."**
- **Anti-analogy**: a zero derivative throughout an interval is NOT merely suggestive of stability
  — it's a lever forcing exact, provable equality between every pair of points in that interval.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the full auxiliary-function construction and Rolle's Theorem
  application for $f(x)=x^2$ on $[1,4]$.
- **Demonstration 2 (targets MC-2)**: $f'\equiv0$ forcing $f(100)=f(3)$ exactly via a direct MVT
  application.
- **Demonstration 3 (targets MC-3)**: the identical $c=2.5$ found both informally (calculus) and
  rigorously (this concept) for the same function and interval.

## Discovery Questions
1. "Is the Mean Value Theorem proven by an argument independent of Rolle's Theorem?"
2. "Does f′=0 throughout an interval only guarantee f is 'roughly flat,' or something stronger?"
3. "Do the applied and rigorous versions of the Mean Value Theorem prove two genuinely different
   facts?"

## Teaching Sequence
1. **Representation shift**: the auxiliary-function-to-Rolle reduction, working Demonstration 1,
   isolating MC-1.
2. **Conflict evidence**: Demonstration 2's exact-equality derivation, isolating MC-2.
3. **Contrast pair**: Demonstration 3's side-by-side identical-value comparison, isolating MC-3.
4. **Mastery gate**: require a correct auxiliary-function construction and Rolle's Theorem
   application for a new function, a correct exact-constancy argument from a zero derivative, and
   a correct explanation connecting the rigorous proof to the applied MVT, at the Blueprint's own
   stated MAMR of 5/5 (⌈0.9×5⌉).

## Tutor Actions
- Never accept the Mean Value Theorem's proof presented without the auxiliary-function-to-Rolle
  reduction.
- Never accept "approximately constant" as the conclusion from a zero derivative throughout an
  interval.
- Never accept the rigorous and applied MVT treated as describing different facts.

## Voice Teaching Notes
- Say "how does this reduce to Rolle's Theorem?" whenever MVT's proof is discussed.
- When a zero derivative is given, ask "does that make the function exactly constant, or only
  approximately so?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly constructs the auxiliary function and applies
  Rolle's Theorem for a new function and interval.
- **Rung 2 (application)**: learner correctly derives an exact equality from a zero derivative
  using MVT directly.
- **Rung 3 (transfer)**: learner correctly explains, for an applied average-speed scenario, why
  the rigorous auxiliary-function proof adds genuine content beyond informal trust, and why MVT
  alone cannot guarantee a constant instantaneous value throughout the interval.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the auxiliary-function construction and Rolle's Theorem application.
- If MC-2 recurs, re-walk the exact-equality derivation.
- If MC-3 recurs, re-walk the side-by-side identical-value comparison.

## Memory Hooks
- "MVT is Rolle's Theorem applied to one specific auxiliary function — not a separate proof."
- "Zero derivative everywhere means exactly constant — not just roughly flat."
- "The rigorous and applied MVT are the same fact — one trusted, one actually proven."

## Transfer Connections
- `math.real.differentiability-rigorous` (already authored, this campaign, Batch 132): supplies
  the rigorous derivative definition underlying Rolle's Theorem and the auxiliary function's
  differentiability.
- `math.calc.mean-value-theorem` (already authored, certified domain): the KG's declared
  cross-link, whose own informally-trusted example this concept rigorously proves.
- `math.real.taylor-rigorous` (not yet authored): the KG's declared unlock, building on the MVT's
  auxiliary-function proof technique for a further generalization.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.real.mvt.md`, reused by reference for its
  auxiliary-function-to-Rolle construction, its exact-constancy derivation, its rigorous-versus-
  applied side-by-side comparison, and its three-misconception registry (severity levels adopted
  directly as declared).
- Transfer probe: the Blueprint's own genuine cross-link probe against
  `math.calc.mean-value-theorem`, constructing the auxiliary function for a car's position
  function and explaining what the rigorous proof adds beyond informal trust.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.real.differentiability-rigorous`, unlocks `math.real.taylor-rigorous`, cross_links
  `math.calc.mean-value-theorem`, expert/apply, mastery_threshold 0.9, estimated_hours 4) was
  directly verified against the live KG and matches exactly. The Blueprint's own cross-link-probe
  P76 mode was independently re-verified via `ls educational-brain/concepts/mathematics/`
  (`math.calc.mean-value-theorem` genuinely authored) and required no correction.

## Version History
- 2026-09-19 (Batch 133): authored. First entry this batch. Companion batch concept:
  `math.real.lipschitz-continuity`.
