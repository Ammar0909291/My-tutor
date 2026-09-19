# math.real.weierstrass-approximation

## Identity
- **KG id**: `math.real.weierstrass-approximation`
- **Domain**: math.real
- **Requires**: `math.real.uniform-convergence`, `math.real.compactness`
- **Unlocks**: none
- **Cross-links**: `math.fnal.dense-subspace` (NOT yet authored — confirmed via `ls`; independence
  mode used, matching the Blueprint's own correct self-report)
- **Difficulty**: expert
- **Bloom level**: understand (Blueprint stated "analyze" — stale, corrected to the live KG's
  "understand")
- **Mastery threshold**: 0.8 (Blueprint stated 0.6 → MAMR 3/5 — stale, corrected to the live KG's
  0.8 → MAMR ⌈0.8×5⌉=4/5)
- **Estimated hours**: 5 (Blueprint stated 8 — stale, corrected to the live KG's 5)

## Learning Objective
State the theorem (EVERY continuous $f$ on $[a,b]$ can be UNIFORMLY approximated by polynomials),
recognizing "uniformly" as `math.real.uniform-convergence`'s own strong sup-norm sense; recognize
BERNSTEIN POLYNOMIALS $B_n(f,x)=\sum_{k=0}^nf(k/n)\binom nkx^k(1-x)^{n-k}$ as an EXPLICIT
construction achieving this, never a merely abstract existence claim; and recognize (at
orientation level) that Stone-Weierstrass generalizes far beyond $[a,b]$ and polynomials to any
COMPACT Hausdorff space and any point-separating algebra of continuous functions.

## Core Understanding
"UNIFORMLY APPROXIMATED" MEANS THE WORST-CASE ERROR SHRINKS TO ZERO ACROSS THE ENTIRE DOMAIN AT
ONCE: for $f(x)=|x|$ on $[-1,1]$ (continuous but NOT differentiable at 0): the theorem guarantees
polynomials $p_n$ with $\sup_{x\in[-1,1]}||x|-p_n(x)|\to0$ — the worst-case error, including right
at the non-smooth corner $x=0$, shrinks to zero. This is genuinely strong: mere POINTWISE
approximation would leave open the possibility of much slower convergence right at the
problematic point.

BERNSTEIN POLYNOMIALS GIVE AN EXPLICIT, COMPUTABLE FORMULA, NEVER MERELY AN ABSTRACT EXISTENCE
ARGUMENT: for $f(x)=x^2$ on $[0,1]$, the degree-2 Bernstein polynomial:
$B_2(f,x)=0\cdot(1-x)^2+0.25\cdot2x(1-x)+1\cdot x^2=0.5x+0.5x^2$ — an EXPLICIT, computable
polynomial anyone can write down and evaluate (at $x=0.5$: $B_2=0.375$ versus the true $f(0.5)=
0.25$, a rough but genuine approximation at this low degree). Intuitively, $B_n(f,x)$ is a
WEIGHTED AVERAGE of $f$'s values at grid points $k/n$, with binomial weights concentrating
increasingly sharply around $x$ as $n\to\infty$.

COMPACTNESS IS EXACTLY WHAT MAKES STONE-WEIERSTRASS'S VAST GENERALIZATION WORK (ORIENTATION
LEVEL): Stone-Weierstrass generalizes to ANY compact Hausdorff space $X$ and any algebra of
continuous functions that SEPARATES POINTS. Applied to $X=S^1$ (a circle) with trigonometric
polynomials (which separate points, since distinct points have different
$(\cos\theta,\sin\theta)$): every continuous function on $S^1$ can be uniformly approximated by
trigonometric polynomials — a DIFFERENT instance of the SAME theorem, with $S^1$'s compactness
playing the identical structural role $[a,b]$'s compactness played originally.

## Mental Models
- **"Uniform approximation isn't a looser, vaguer promise — it's the strong guarantee that the
  worst point anywhere in the domain still gets squeezed toward zero error."**
- **"Bernstein polynomials are a weighted-average recipe, not a magic existence trick — write down
  the formula, plug in n, and you have an actual approximating polynomial in hand."**

## Why Students Fail

### MC-1: UNIFORM-APPROXIMATION-ASSUMED-SAME-AS-POINTWISE
- **Surface form**: believes "uniformly approximated" means roughly the same as approximated
  pointwise at each $x$ separately.
- **Birth type**: Foundational severity (Blueprint's own declared severity — "approximated" alone
  sounds like a vague, generic claim, obscuring the specific strong sense being invoked).
- **Repair**: re-walk the $|x|$ example's whole-interval, corner-inclusive guarantee.

### MC-2: WEIERSTRASS-PROOF-ASSUMED-PURELY-ABSTRACT
- **Surface form**: believes the theorem's proof only shows approximating polynomials exist
  abstractly.
- **Birth type**: High severity (Blueprint's own declared severity — many existence theorems
  encountered so far genuinely are non-constructive, making this feel like the default).
- **Repair**: re-walk the explicit $B_2(x^2,x)=0.5x+0.5x^2$ computation.

### MC-3: STONE-WEIERSTRASS-ASSUMED-UNCONDITIONAL
- **Surface form**: believes the Stone-Weierstrass generalization applies without any hypothesis
  analogous to compactness or point-separation.
- **Birth type**: Moderate severity (Blueprint's own declared severity — "generalizes far beyond"
  can read as "generalizes unconditionally" without careful attention to the stated hypotheses).
- **Repair**: re-walk the $S^1$/trigonometric-polynomials instance, re-anchoring on compactness and
  point-separation as essential.

## Misconceptions

### MC-1: UNIFORM-APPROXIMATION-ASSUMED-SAME-AS-POINTWISE
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

### MC-2: WEIERSTRASS-PROOF-ASSUMED-PURELY-ABSTRACT
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

### MC-3: STONE-WEIERSTRASS-ASSUMED-UNCONDITIONAL
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

## Analogies
- **"Uniform approximation is like a tailor who guarantees the fit is snug everywhere on the
  garment, not just roughly close at a few sample measurements."**
- **Anti-analogy**: the Weierstrass theorem's proof is NOT "polynomials exist somewhere, trust us"
  — the Bernstein formula is a genuine recipe you can compute by hand at any degree.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: $|x|$'s uniform approximation guarantee holding even at the
  non-smooth corner $x=0$.
- **Demonstration 2 (targets MC-2)**: the explicit degree-2 Bernstein polynomial for $x^2$,
  computed and evaluated concretely.
- **Demonstration 3 (targets MC-3)**: Stone-Weierstrass applied to $S^1$ with trigonometric
  polynomials, relying on the same compactness and point-separation hypotheses.

## Discovery Questions
1. "Does 'uniformly approximated by polynomials' mean roughly the same as approximated pointwise
   at each individual x?"
2. "Does the Weierstrass approximation theorem's proof only show that some approximating
   polynomials exist abstractly, without a way to construct them?"
3. "Does the Stone-Weierstrass generalization apply to any topological space and any collection
   of functions, without any hypothesis like compactness or point-separation?"

## Teaching Sequence
1. **Representation shift**: the $|x|$ whole-interval uniform-approximation guarantee, isolating
   MC-1.
2. **Conflict evidence**: the explicit Bernstein-polynomial computation, isolating MC-2.
3. **Contrast pair**: the $S^1$/trigonometric-polynomials instance of Stone-Weierstrass, isolating
   MC-3.
4. **Mastery gate**: require a correct explanation of uniform approximation citing
   `math.real.uniform-convergence`'s own definition, a correct low-degree Bernstein polynomial
   computation, and a correct statement of Stone-Weierstrass's two key hypotheses, at the
   corrected MAMR of 4/5 (⌈0.8×5⌉).

## Tutor Actions
- Never accept "uniformly approximated" conflated with pointwise approximation.
- Never accept the Weierstrass theorem's proof presented as purely abstract when the Bernstein
  construction is explicit.
- Never accept Stone-Weierstrass invoked without its compactness and point-separation hypotheses.

## Voice Teaching Notes
- Say "is that error shrinking everywhere at once, or just at one point?" whenever uniform
  approximation is discussed.
- When the Weierstrass theorem's proof is cited, ask "can you actually write down the
  approximating polynomial, or are we just trusting it exists?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly explains uniform approximation citing the sup-norm
  definition.
- **Rung 2 (application)**: learner correctly computes a low-degree Bernstein polynomial for a new
  function.
- **Rung 3 (transfer)**: learner correctly explains why a non-smooth signal can still be uniformly
  approximated by polynomials, how to compute such an approximation via Bernstein polynomials, and
  whether an analogous guarantee extends to a compact non-interval domain via Stone-Weierstrass.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the $|x|$ whole-interval guarantee.
- If MC-2 recurs, re-walk the explicit Bernstein-polynomial computation.
- If MC-3 recurs, re-walk the $S^1$ Stone-Weierstrass instance.

## Memory Hooks
- "Uniform approximation means the worst-case error shrinks to zero everywhere at once — not
  just at individual points."
- "Bernstein polynomials are an explicit formula — not an abstract existence claim."
- "Stone-Weierstrass needs compactness and point-separation — it's not unconditional."

## Transfer Connections
- `math.real.uniform-convergence` (already authored, this campaign, Batch 135): supplies the
  sup-norm convergence notion this theorem's "uniformly approximated" claim directly invokes.
- `math.real.compactness` (already authored, this campaign, Batch 126): supplies the Heine-Borel
  criterion whose generalization to compact Hausdorff spaces underlies Stone-Weierstrass.
- `math.fnal.dense-subspace` (not yet authored): the KG's declared cross-link, connecting this
  theorem to the general notion of a dense subspace of continuous functions.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.real.weierstrass-approximation.md`, reused
  by reference for its $|x|$ uniform-approximation demonstration, its explicit Bernstein-
  polynomial computation, its Stone-Weierstrass $S^1$ instance, and its three-misconception
  registry (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe, reasoning about a signal-
  processing engineer's non-smooth signal approximation and a compact non-interval domain's
  Stone-Weierstrass applicability.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Stale Blueprint/KG metadata discrepancy found and corrected**: the Blueprint's own Component 0
  states bloom=analyze, mastery_threshold=0.6 (MAMR 3/5), estimated_hours=8 — the live KG shows
  bloom=understand, mastery_threshold=0.8 (MAMR ⌈0.8×5⌉=4/5), estimated_hours=5. Live KG values
  used as authoritative throughout this entry, per established campaign discipline. All other
  fields (requires `math.real.uniform-convergence`/`math.real.compactness`, unlocks none,
  cross_links `math.fnal.dense-subspace`, expert difficulty) matched exactly. The Blueprint's own
  correctly-declared independence-mode P76 (cross-link target confirmed NOT authored via `ls`)
  required no correction.

## Version History
- 2026-09-19 (Batch 137): authored. First entry this batch. Companion batch concept:
  `math.prob.quantile`.
