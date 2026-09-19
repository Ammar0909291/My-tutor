# math.fnal.dense-subspace

## Identity
- **KG id**: `math.fnal.dense-subspace`
- **Domain**: math.fnal
- **Requires**: `math.fnal.banach-space`
- **Unlocks**: none
- **Cross-links**: `math.real.weierstrass-approximation`
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.8
- **Estimated hours**: 4

## Learning Objective
State density as ONE unified definition, $\mathrm{cl}(S)=X$, applying in ANY Banach space —
NEVER a separate ad hoc notion per approximation theorem; recognize Weierstrass's theorem as
LITERALLY the density statement "polynomials are dense in $C([a,b])$" — NEVER merely analogous to
density; and recognize Weierstrass, $C^\infty$-in-$L^p$, and trigonometric-in-$L^2$ as INSTANCES
of the SAME pattern — NEVER three unrelated facts to memorize separately.

## Core Understanding
DENSITY IS ONE DEFINITION, STATED ONCE, APPLYING UNIFORMLY IN EVERY BANACH SPACE — NEVER
REDEFINED PER EXAMPLE: in $X=\mathbb{R}$, $S=\mathbb{Q}$: for ANY $x\in\mathbb{R}$ and any
$\varepsilon>0$, a rational $s$ within $\varepsilon$ of $x$ always exists (a sufficiently long
decimal truncation) — confirming $\mathrm{cl}(\mathbb{Q})=\mathbb{R}$, using EXACTLY the general
$\varepsilon$-approximation condition $\|x-s\|<\varepsilon$, with no special machinery beyond the
definition itself. Believing the density definition must be adapted separately for each specific
Banach space is WRONG — `math.fnal.banach-space`'s own norm gives the identical condition whether
$X$ is $\mathbb{R}$, $C([a,b])$, or $L^p$.

WEIERSTRASS'S THEOREM IS LITERALLY A DENSITY STATEMENT, WITH AN EXPLICIT WITNESS ALREADY IN HAND
— NEVER MERELY ANALOGOUS: `math.real.weierstrass-approximation`'s Bernstein construction
$B_2(f,x)=0.5x+0.5x^2$ for $f(x)=x^2$ is DIRECTLY the density witness this concept's definition
requires: taking $X=C([0,1])$, $S=$ polynomials, $B_n(f,\cdot)$ for increasing $n$ gives an
EXPLICIT sequence in $S$ with $\|f-B_n(f,\cdot)\|_\infty\to0$, directly witnessing
$f\in\mathrm{cl}(S)$. Believing Weierstrass's theorem is merely SIMILAR to a density claim, rather
than a literal instance of this concept's definition, is WRONG — it is EXACTLY the statement
$\mathrm{cl}(\text{polynomials})=C([a,b])$, with an already-computable witness, never a new
existence argument.

WEIERSTRASS, $C^\infty$-IN-$L^p$, AND TRIGONOMETRIC-IN-$L^2$ ARE THE SAME PATTERN IN DIFFERENT
SPACES — NEVER THREE UNRELATED FACTS: tabulated in this concept's uniform language: (1)
Weierstrass: $X=C([a,b])$, $S=$ polynomials — dense via the Bernstein witness. (2) Smoothing:
$X=L^p(\mu)$, $S=C^\infty$ — dense via mollification. (3) Fourier: $X=L^2$, $S=$ trigonometric
polynomials — dense via Fourier partial sums. Despite entirely different specific spaces and
approximating families, each is checked against the IDENTICAL $\mathrm{cl}(S)=X$ criterion.
Believing these are three unrelated named theorems to memorize separately is WRONG — they are one
recurring density pattern, instantiated three times.

## Mental Models
- **"Density is one definition, stated once via Banach-space's own norm — never redefined per
  space; the ε-approximation condition looks identical everywhere."**
- **"Weierstrass's theorem isn't 'like' a density claim — it IS one, and its Bernstein
  construction is literally the explicit witness the density definition asks for."**
- **"Weierstrass, smoothing-in-Lp, and Fourier-in-L2 are the same idea in three costumes — not
  three separate facts to memorize."**

## Why Students Fail

### MC-1: DENSITY-DEFINITION-ASSUMED-SPACE-SPECIFIC
- **Surface form**: believes the definition of a dense subspace must be adapted separately for
  each specific Banach space, missing that `math.fnal.banach-space`'s own norm gives one uniform
  definition.
- **Birth type**: instruction-induced (Blueprint's own declared foundational severity — each named
  approximation theorem is often taught as its own standalone result without stating the shared
  underlying definition first).
- **Repair**: re-walk Example 1's direct $\mathbb{Q}$-in-$\mathbb{R}$ verification using the one
  general definition.

### MC-2: WEIERSTRASS-TREATED-AS-MERELY-ANALOGOUS-TO-DENSITY
- **Surface form**: believes `math.real.weierstrass-approximation`'s theorem is merely similar to
  a density claim rather than literally an instance of this concept's definition, with the
  Bernstein construction already serving as the explicit witness.
- **Birth type**: instruction-induced (Blueprint's own declared high severity — Weierstrass's
  theorem is typically taught in isolation, before or without the general density framework).
- **Repair**: re-walk Example 2's direct restatement using the already-computed $B_2(f,x)$ as the
  witness.

### MC-3: NAMED-DENSITY-THEOREMS-TREATED-AS-UNRELATED
- **Surface form**: believes Weierstrass, $C^\infty$-in-$L^p$, and trigonometric-in-$L^2$ density
  results are three unrelated facts to memorize separately, missing their shared underlying
  pattern.
- **Birth type**: overgeneralization (Blueprint's own declared birth type — different course units
  or textbook chapters present these results with no explicit unifying framework).
- **Repair**: re-walk Example 3's tabulation against the identical $\mathrm{cl}(S)=X$ criterion.

## Misconceptions

### MC-1: DENSITY-DEFINITION-ASSUMED-SPACE-SPECIFIC
- **Surface form**: as described above.
- **Root cause (instruction-induced)**: as described above.
- **Repair**: as described above.

### MC-2: WEIERSTRASS-TREATED-AS-MERELY-ANALOGOUS-TO-DENSITY
- **Surface form**: as described above.
- **Root cause (instruction-induced)**: as described above.
- **Repair**: as described above.

### MC-3: NAMED-DENSITY-THEOREMS-TREATED-AS-UNRELATED
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A dense subspace is like a fine enough mesh of sampling points — you never land exactly on
  every point of the space, but you can always get as close as you like."**
- **Anti-analogy**: Weierstrass's theorem isn't a cousin of density that happens to look similar —
  it's the exact same statement, $\mathrm{cl}(\text{polynomials})=C([a,b])$, wearing a specific
  name.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the $\mathbb{Q}$-dense-in-$\mathbb{R}$ direct
  $\varepsilon$-approximation verification.
- **Demonstration 2 (targets MC-2)**: the Weierstrass-as-density restatement using the
  already-computed Bernstein witness.
- **Demonstration 3 (targets MC-3)**: the three-density-result tabulation against the identical
  $\mathrm{cl}(S)=X$ criterion.

## Discovery Questions
1. "Does the definition of 'dense subspace' need to be adapted separately for each specific Banach
   space it's applied to?"
2. "Is Weierstrass's theorem a separate result merely similar to a density claim, or literally an
   instance of this concept's density definition?"
3. "Are Weierstrass, the C∞-in-Lp result, and the Fourier trigonometric-density-in-L² result three
   unrelated facts, or instances of the same pattern?"

## Teaching Sequence
1. **Representation shift**: work Example 1's direct $\mathbb{Q}$-in-$\mathbb{R}$ verification,
   isolating MC-1.
2. **Conflict evidence**: work Example 2's Weierstrass-as-density restatement, isolating MC-2.
3. **Contrast pair**: work Example 3's three-density-result tabulation, isolating MC-3.
4. **Mastery gate**: require a correct general density definition, a correct restatement of
   Weierstrass's theorem in $(X,S)$ density language, and a correct explanation of why the
   $C^\infty$-in-$L^p$ result and Weierstrass are instances of the same pattern, at the
   Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept the density definition presented as needing per-space adaptation.
- Never accept Weierstrass's theorem described as merely analogous to, rather than an instance of,
  density.
- Never accept named density theorems treated as unrelated facts to memorize separately.

## Voice Teaching Notes
- Say "what's X and what's S here?" whenever a density claim or approximation theorem is
  discussed, to surface the underlying $(X,S)$ pattern.
- Ask "is that theorem giving you an actual witness, or just an abstract existence claim?"
  whenever a density result is invoked.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly states the general density definition in terms of
  Banach-space's own norm.
- **Rung 2 (application)**: learner correctly restates Weierstrass's theorem in $(X,S)$ density
  language, naming $X$ and $S$.
- **Rung 3 (transfer)**: learner correctly explains why Bernstein polynomials guarantee any
  desired approximation accuracy for a continuous function, and identifies which specific density
  result justifies approximating an $L^2$ function by trigonometric polynomials.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the $\mathbb{Q}$-in-$\mathbb{R}$ verification using the one general
  definition.
- If MC-2 recurs, re-walk the Weierstrass-as-density restatement using the Bernstein witness.
- If MC-3 recurs, re-walk the three-density-result tabulation.

## Memory Hooks
- "Density is one definition via Banach-space's norm — never redefined per space."
- "Weierstrass IS a density statement — its Bernstein polynomials ARE the witness."
- "Weierstrass, smoothing, and Fourier density are one pattern, three costumes."

## Transfer Connections
- `math.fnal.banach-space` (prerequisite, already authored, this campaign): supplies the norm and
  completeness structure this concept's density definition is built on directly.
- `math.real.weierstrass-approximation` (already authored, cross-link): supplies the explicit
  Bernstein-polynomial construction this concept identifies as a direct density witness.

## Cross-Subject Connections
- Numerical analysis: approximating an arbitrary continuous function by polynomials or splines for
  computer evaluation is a direct, practical application of this concept's density framework.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.fnal.dense-subspace.md`, reused by reference
  for its three worked examples (directly reusing `math.real.weierstrass-approximation`'s own
  computed Bernstein example) and its three-misconception registry (birth types adopted directly
  as declared).
- Transfer probe: the Blueprint's own cross-link probe engaging `math.real.weierstrass-
  approximation`, contrasting the Bernstein-polynomial scheme against trigonometric-polynomial
  approximation in $L^2$, and generalizing to checking density for an unfamiliar family.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.fnal.banach-space`, unlocks none, cross_links `math.real.weierstrass-approximation`,
  expert/apply, mastery_threshold 0.8, estimated_hours 4) was directly verified against the live
  KG and matches exactly. The cross-link target is confirmed authored, matching the Blueprint's
  own cross-link-mode determination.

## Version History
- 2026-09-19 (Batch 228): authored. Second entry this batch. Companion batch concept:
  `math.fnal.hilbert-space`.
