# math.fnal.hahn-banach

## Identity
- **KG id**: `math.fnal.hahn-banach`
- **Domain**: math.fnal
- **Requires**: `math.fnal.dual-space-functional`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: analyze
- **Mastery threshold**: 0.8
- **Estimated hours**: 5

## Learning Objective
State the extension $\tilde{f}$ preserves the EXACT norm $\|\tilde f\|=\|f\|$ — NEVER weakened to
merely some extension existing; recognize geometric separation of convex sets in infinite
dimensions genuinely REQUIRES Hahn-Banach — NEVER assumed automatic; and recognize the dual
separates every nonzero point — NEVER assume some nonzero element could be invisible to all
bounded functionals.

## Core Understanding
THE EXTENSION PRESERVES THE EXACT NORM — NEVER MERELY "SOME EXTENSION EXISTS": for
$X=C([0,1])$, $M=\mathrm{span}\{1\}$, $f(\alpha\cdot\mathbf1)=\alpha$ with $\|f\|_M=1$: the
concrete extension $\tilde f(g)=g(0)$ satisfies $|\tilde f(g)|=|g(0)|\le\|g\|_\infty$
(so $\|\tilde f\|\le1$) and $\tilde f(\mathbf1)=1=\|\mathbf1\|_\infty$ (achieving the bound), giving
$\|\tilde f\|=1=\|f\|_M$ EXACTLY. Believing the theorem only guarantees SOME extension exists,
without the norm being preserved exactly, is WRONG — the extension's norm EQUALS the original
functional's norm, not merely bounded by it; this exact equality is the theorem's actual strength.

GEOMETRIC SEPARATION OF CONVEX SETS GENUINELY REQUIRES HAHN-BANACH — NEVER AUTOMATIC IN INFINITE
DIMENSIONS: in $\mathbb{R}^2$, the open half-plane $A=\{x<0\}$ and closed half-plane $B=\{x\ge0\}$
are separated by $f(x,y)=x$, with $f(a)<0\le f(b)$. This finite-dimensional case is intuitive, but
in INFINITE dimensions, where geometric intuition fails, the Hahn-Banach geometric form is the
DEEP TOOL that still guarantees such a separator exists. Believing disjoint convex sets can always
be separated by a hyperplane in infinite-dimensional spaces WITHOUT needing Hahn-Banach as the
underlying machinery is WRONG — the geometric form IS the Hahn-Banach theorem, not an independent,
automatically-true fact.

THE DUAL SEPARATES EVERY NONZERO POINT — NEVER ASSUME SOME ELEMENT ESCAPES ALL BOUNDED
FUNCTIONALS: for $X=\ell^\infty$, $x=(1,0,0,\ldots)\neq0$: the projection $f((x_n))=x_1$ is in
$(\ell^\infty)^*$ with $\|f\|=1$ and $f(x)=1\neq0$. The general corollary: applying Hahn-Banach to
the norm-1 functional $\alpha x\mapsto\alpha\|x\|$ on $\mathrm{span}(x)$ extends to a norm-1
functional on ALL of $X$ with $f(x)=\|x\|\neq0$, for ANY nonzero $x$ in ANY normed space. Believing
there could exist a nonzero element that every bounded linear functional maps to $0$ is WRONG —
Hahn-Banach guarantees the dual is RICH ENOUGH to see every nonzero element, making
$\|x\|=\sup_{\|f\|\le1}|f(x)|$ a genuine identity, never merely an inequality.

## Mental Models
- **"Hahn-Banach doesn't just extend a functional — it extends it while preserving the exact
  norm, dimension by dimension, all the way up."**
- **"Hyperplane separation of convex sets in infinite dimensions isn't free geometric intuition —
  it's the Hahn-Banach theorem doing real work."**
- **"The dual is rich enough to see every nonzero point — no element can hide from every bounded
  functional."**

## Why Students Fail

### MC-1: HAHN-BANACH-EXTENSION-WEAKENED-TO-MERE-EXISTENCE
- **Surface form**: believes the theorem only guarantees some extension exists, missing that the
  extension's norm EQUALS the original functional's norm.
- **Birth type**: overgeneralization (Blueprint's own declared foundational severity — "extension
  exists" is the easier, weaker fact to remember; the exact-norm strength is easily lost).
- **Repair**: re-walk Example 1's explicit norm computation, $\|\tilde f\|=1=\|f\|_M$, not merely
  $\|\tilde f\|\le\text{something}$.

### MC-2: HYPERPLANE-SEPARATION-ASSUMED-FREE-IN-INFINITE-DIMENSIONS
- **Surface form**: believes disjoint convex sets can always be separated by a hyperplane without
  needing the Hahn-Banach theorem as the underlying tool in infinite-dimensional spaces.
- **Birth type**: overgeneralization (Blueprint's own declared moderate severity — the
  finite-dimensional geometric picture is so intuitive it's easy to assume it just "obviously"
  extends).
- **Repair**: re-state that the geometric form IS the Hahn-Banach theorem, requiring the extension
  argument's machinery in infinite dimensions.

### MC-3: DUAL-MIGHT-NOT-SEPARATE-POINTS
- **Surface form**: believes there could be a nonzero element of a Banach space that every bounded
  linear functional maps to 0, missing that Hahn-Banach guarantees the dual is rich enough to
  separate points.
- **Birth type**: overgeneralization (Blueprint's own declared foundational severity — without
  seeing the explicit corollary derivation, it's not obvious the dual is guaranteed this rich).
- **Repair**: re-derive the corollary — apply Hahn-Banach to the norm-1 functional on
  $\mathrm{span}(x)$, getting a norm-1 extension with $f(x)=\|x\|\neq0$.

## Misconceptions

### MC-1: HAHN-BANACH-EXTENSION-WEAKENED-TO-MERE-EXISTENCE
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

### MC-2: HYPERPLANE-SEPARATION-ASSUMED-FREE-IN-INFINITE-DIMENSIONS
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

### MC-3: DUAL-MIGHT-NOT-SEPARATE-POINTS
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Extending a functional via Hahn-Banach is like tiling a floor one tile at a time, never
  letting the pattern's exact scale drift — the norm stays locked at every step."**
- **Anti-analogy**: infinite-dimensional hyperplane separation isn't a free extension of the
  2D picture you can just eyeball — it's a genuinely nontrivial theorem doing the work behind the
  scenes.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the $C([0,1])$-constants-extended-to-evaluation-at-0
  exact-norm-preservation computation.
- **Demonstration 2 (targets MC-2)**: the $\mathbb{R}^2$ half-plane separation as finite-
  dimensional intuition for the infinite-dimensional geometric form.
- **Demonstration 3 (targets MC-3)**: the $\ell^\infty$ dual-separates-points corollary
  verification.

## Discovery Questions
1. "Does the Hahn-Banach theorem only guarantee SOME extension exists, or does it guarantee an
   extension that preserves the exact norm?"
2. "In infinite-dimensional spaces, can two disjoint convex sets always be separated by a
   hyperplane, even without the Hahn-Banach theorem?"
3. "Could there be a nonzero element of a Banach space that every bounded linear functional sends
   to 0?"

## Teaching Sequence
1. **Representation shift**: work Example 1's exact-norm-preserving extension, isolating MC-1.
2. **Contrast pair**: work Example 2's finite-dimensional-to-infinite-dimensional geometric form
   contrast, isolating MC-2.
3. **Classify**: work Example 3's dual-separates-points corollary, isolating MC-3.
4. **Mastery gate**: require a correct extension-theorem statement with the norm-equality
   condition, a correct explicit norm-preserving extension example, a correct proof that
   $f(x)=f(y)$ for all $f\in X^*$ implies $x=y$, and a correct explanation of why Hahn-Banach is
   genuinely needed in infinite dimensions, at the Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept the Hahn-Banach extension theorem stated without the exact-norm-preservation
  condition.
- Never accept infinite-dimensional hyperplane separation treated as automatic without citing
  Hahn-Banach.
- Never accept a claim that some nonzero element could escape every bounded functional.

## Voice Teaching Notes
- Say "does that extension preserve the exact norm, or just some bound?" whenever an extension is
  discussed.
- Ask "is that separation obvious, or is Hahn-Banach doing the actual work here?" whenever
  hyperplane separation is invoked in infinite dimensions.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly states the extension theorem including the
  norm-equality condition.
- **Rung 2 (application)**: learner correctly constructs a norm-preserving extension for a
  concrete functional.
- **Rung 3 (transfer)**: learner correctly connects the dual-separates-points corollary and the
  geometric separation form to convex-optimization subdifferentials and optimality certificates.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the explicit exact-norm computation.
- If MC-2 recurs, re-state that the geometric form IS the theorem, requiring its machinery.
- If MC-3 recurs, re-derive the dual-separates-points corollary.

## Memory Hooks
- "Extension preserves the EXACT norm — not just some bound."
- "Infinite-dimensional hyperplane separation IS Hahn-Banach — never free geometric intuition."
- "No nonzero element hides from every bounded functional — the dual sees everything."

## Transfer Connections
- `math.fnal.dual-space-functional` (prerequisite, already authored, this campaign): supplies the
  bounded linear functionals and dual space $X^*$ this concept extends from subspaces to the
  whole space while preserving norm.

## Cross-Subject Connections
- Convex optimization: subdifferentials and Karush-Kuhn-Tucker optimality conditions rely directly
  on the Hahn-Banach separation theorem to certify optimality via a separating hyperplane.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.fnal.hahn-banach.md`, reused by reference for
  its three worked examples and its three-misconception registry (birth types adopted directly as
  declared).
- Transfer probe: the Blueprint's own independence-mode probe on convex-optimization
  subdifferentials, connecting the dual-separates-points corollary and the geometric separation
  form to optimality certificates.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.fnal.dual-space-functional`, unlocks none, cross_links none, expert/analyze,
  mastery_threshold 0.8, estimated_hours 5) was directly verified against the live KG and matches
  exactly.

## Version History
- 2026-09-19 (Batch 231): authored. Second entry this batch. Companion batch concept:
  `math.fnal.closed-graph-theorem`.
