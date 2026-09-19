# math.meas.convergence-theorems

## Identity
- **KG id**: `math.meas.convergence-theorems`
- **Domain**: math.meas
- **Requires**: `math.meas.lebesgue-integral`
- **Unlocks**: none
- **Cross-links**: `math.real.uniform-convergence` (KG-declared and Blueprint-claimed as
  "authored," but NOT actually authored — verified via `ls`; independence mode used instead, see
  Curriculum Feedback)
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 7

## Learning Objective
State the MONOTONE CONVERGENCE THEOREM (MCT) — if $0\le f_n\uparrow f$ a.e., then $\int f_n\,d\mu
\to\int f\,d\mu$ — as a specific sufficient condition for the $\lim$-$\int$ interchange, never
automatic; state FATOU'S LEMMA ($\int\liminf f_n\le\liminf\int f_n$, an INEQUALITY that can be
STRICT) and the DOMINATED CONVERGENCE THEOREM (DCT) — if $|f_n|\le g$ for integrable $g$ and
$f_n\to f$ a.e., then $\int f_n\to\int f$; and recognize MCT, Fatou, and DCT as a logical CHAIN,
never three independent facts.

## Core Understanding
INTERCHANGING $\lim$ AND $\int$ IS NEVER AUTOMATIC — MCT SUPPLIES A SPECIFIC SUFFICIENT
CONDITION: in general $\lim_n\int f_n\,d\mu$ need not equal $\int(\lim_nf_n)\,d\mu$. For
$f_n(x)=\min(x,n)$ on $[0,\infty)$: $0\le f_n\uparrow f(x)=x$ (non-negative, monotone increasing).
MCT GUARANTEES $\int_0^\infty f_n\,d\mu\to\int_0^\infty f\,d\mu$ — here both sides are $+\infty$,
consistently — precisely BECAUSE the monotone-increase hypothesis holds, regardless of whether the
convergence happens to be uniform.

FATOU'S LEMMA GIVES ONLY AN INEQUALITY, WHICH CAN BE GENUINELY STRICT: for $f_n(x)=n\cdot
\mathbb1_{(0,1/n)}(x)$ on $[0,1]$ (a spike of height $n$, width $1/n$, so $\int_0^1f_n\,d\mu=n\cdot
\frac1n=1$ for every $n$): pointwise, $f_n(x)\to0$ for every FIXED $x$ (eventually outside the
shrinking spike), so $\int\liminf f_n=\int0=0$. But $\liminf\int f_n=\liminf(1)=1$. Fatou's
inequality $0\le1$ HOLDS but is STRICT — mass genuinely escapes to a vanishing set. This sequence
FAILS DCT's domination hypothesis (no single integrable $g$ bounds every $f_n$, since the peak
height $n\to\infty$) — confirming domination is exactly the extra condition needed to upgrade
Fatou's inequality to full equality.

MCT, FATOU, AND DCT FORM ONE LOGICAL CHAIN, NEVER THREE INDEPENDENT FACTS (orientation level):
Fatou's Lemma is typically PROVED FROM MCT (defining $g_k=\inf_{n\ge k}f_n$, an increasing
sequence converging to $\liminf f_n$, then applying MCT directly to $g_k$); DCT is then PROVED
FROM Fatou (applying it to both $g+f_n\ge0$ and $g-f_n\ge0$, using domination to ensure
non-negativity). MCT is the genuine foundation; Fatou and DCT are its logical consequences under
progressively different hypotheses.

## Mental Models
- **"Monotone increase is a completely different sufficient condition from uniform convergence —
  MCT works even without uniformity, as long as the functions climb steadily upward."**
- **"Fatou only promises 'at least this much survives' — an inequality, never a guarantee that
  nothing escapes; DCT's domination is what plugs that leak."**

## Why Students Fail

### MC-1: LIM-INT-INTERCHANGE-ASSUMED-AUTOMATIC
- **Surface form**: believes swapping $\lim$ and $\int$ always works automatically for the
  Lebesgue integral.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared Foundational severity —
  once the Lebesgue integral is defined, its "well-behaved" reputation invites assuming limits
  always pass through).
- **Repair**: re-walk the monotone-truncation verification, re-anchoring on monotone increase as a
  specific, necessary sufficient condition.

### MC-2: FATOU-ASSUMED-EQUALITY
- **Surface form**: believes Fatou's Lemma guarantees equality $\int\liminf f_n=\liminf\int f_n$.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared High severity — MCT's
  equality is easy to over-apply to Fatou's weaker, inequality-only statement).
- **Repair**: re-walk the strict-inequality spike-sequence demonstration directly.

### MC-3: THREE-THEOREMS-ASSUMED-INDEPENDENT
- **Surface form**: believes MCT, Fatou's Lemma, and DCT are three independent results each
  needing separate unrelated proofs.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared Moderate severity — each
  theorem is often presented with its own named statement, obscuring the derivation relationship
  between them).
- **Repair**: re-walk the dependency-chain derivation — Fatou from MCT via $g_k$, DCT from Fatou.

## Misconceptions

### MC-1: LIM-INT-INTERCHANGE-ASSUMED-AUTOMATIC
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: FATOU-ASSUMED-EQUALITY
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-3: THREE-THEOREMS-ASSUMED-INDEPENDENT
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

## Analogies
- **"MCT is a one-way escalator — as long as everyone's rising steadily and never negative, the
  total at the top matches the limit of totals along the way."**
- **Anti-analogy**: Fatou's Lemma is NOT a promise that nothing is lost in the limit — the spike
  sequence shows real "mass" (integral value) can vanish from the limit function while the
  integrals themselves stay constant.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: $f_n(x)=\min(x,n)$ on $[0,\infty)$: $0\le f_n\uparrow x$,
  MCT gives $\int f_n\to\int f=\infty=\infty$, consistent.
- **Demonstration 2 (targets MC-2)**: $f_n=n\cdot\mathbb1_{(0,1/n)}$: $\int\liminf f_n=0$ but
  $\liminf\int f_n=1$ — Fatou's inequality strict; DCT's domination fails (no bounding $g$).
- **Demonstration 3 (targets MC-3)**: Fatou proved from MCT via $g_k=\inf_{n\ge k}f_n$; DCT proved
  from Fatou via $g+f_n$ and $g-f_n$.

## Discovery Questions
1. "Does swapping $\lim$ and $\int$ always work automatically for the Lebesgue integral, without
   any special hypothesis?"
2. "Does Fatou's Lemma guarantee equality, the same way MCT does?"
3. "Are MCT, Fatou's Lemma, and DCT three independent results, each requiring its own separate,
   unrelated proof?"

## Teaching Sequence
1. **Representation shift**: state MCT directly, contrasting with mere pointwise convergence's
   general unreliability, working Demonstration 1, isolating MC-1.
2. **Conflict evidence**: Demonstration 2's strict-inequality spike sequence, isolating MC-2 by
   requiring the strictness and domination-failure both acknowledged.
3. **Contrast pair**: Demonstration 3's dependency-chain derivation, isolating MC-3 by requiring
   the logical relationship stated precisely.
4. **Mastery gate**: require MCT correctly stated with its hypothesis identified, a correct
   strict-Fatou-inequality construction with domination-failure explained, and a correct one-
   or-two-sentence statement of the MCT→Fatou→DCT dependency, at the Blueprint's own KG-sourced
   MAMR of 5/5 (⌈0.85×5⌉).

## Tutor Actions
- Never accept "$\lim$ and $\int$ always interchange" stated without a specific hypothesis (like
  monotone increase or domination) identified.
- Never accept "Fatou's Lemma gives equality" without the strict-inequality counterexample
  addressed.

## Voice Teaching Notes
- Say "what specific hypothesis makes that limit-integral swap valid here?" whenever an
  interchange is claimed.
- When Fatou is invoked, ask "is that an equality or just an inequality — can it be strict?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly identifies whether a given sequence satisfies MCT's
  hypotheses.
- **Rung 2 (application)**: learner correctly constructs a sequence with a strict Fatou inequality
  and explains why DCT's domination fails for it.
- **Rung 3 (transfer)**: learner correctly contrasts a uniform-convergence scenario (where the
  limit-integral interchange needs no Lebesgue-specific theorem) against a monotone
  pointwise-only scenario (where MCT specifically is needed).

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the monotone-truncation verification.
- If MC-2 recurs, re-walk the strict-inequality spike-sequence demonstration.
- If MC-3 recurs, re-walk the dependency-chain derivation.

## Memory Hooks
- "Monotone increase is MCT's own ticket to equality — a completely different route from uniform
  convergence."
- "Fatou promises at-least, never exactly — mass can escape."
- "MCT is the foundation; Fatou and DCT are built from it, not separate facts."

## Transfer Connections
- `math.meas.lebesgue-integral` (already authored, this campaign, Batch 115): supplies the
  integral $\int f\,d\mu$ this concept's three theorems govern the limiting behavior of.
- `math.real.uniform-convergence` (not yet authored): the KG's declared cross-link target, where
  this concept's contrast against uniform-convergence-based interchange will connect directly.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.meas.convergence-theorems.md`, reused by
  reference for its MCT monotone-truncation example, its Fatou strict-inequality spike sequence,
  its MCT→Fatou→DCT dependency-chain derivation, and its three-misconception registry (severity
  levels adopted directly as declared).
- Transfer probe: the Blueprint's own probe, contrasting a uniformly-convergent Riemann-integrable
  case (needing no Lebesgue-specific theorem) against a monotone-but-not-uniform case (needing
  MCT specifically) — used here in INDEPENDENCE mode (see Curriculum Feedback).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Blueprint/P76-mode discrepancy found and corrected (NINTH occurrence this campaign)**: the
  Blueprint's own Component 7 states `math.real.uniform-convergence` was "checked via `ls
  docs/curriculum/blueprints/` and confirmed ALREADY authored," setting cross-link-probe mode.
  Verified via `ls educational-brain/concepts/mathematics/` that `math.real.uniform-convergence`
  has NO authored Educational Brain entry — the same wrong-corpus pattern noted in Batches 107,
  111, and 115. This entry uses INDEPENDENCE mode instead, treating the Blueprint's own
  uniform-vs-monotone-convergence transfer probe as self-contained.
- **Separate Blueprint/KG metadata discrepancy found (stale metadata, distinct from the P76
  issue)**: the Blueprint's own Component 0 states `mastery_threshold = 0.6` (MAMR 3/5) and
  `estimated_hours = 8`, but the live KG states `mastery_threshold = 0.85` (MAMR
  ⌈0.85×5⌉=5/5) and `estimated_hours = 7`. This entry uses the live KG's values throughout (as
  the canonical, current authority) rather than the Blueprint's stated figures. All other fields
  (requires `math.meas.lebesgue-integral`, unlocks none, cross_links `math.real.uniform-
  convergence`, expert/apply) matched exactly.

## Version History
- 2026-09-19 (Batch 116): authored. First entry this batch. Companion batch concept:
  `math.prob.cdf`.
