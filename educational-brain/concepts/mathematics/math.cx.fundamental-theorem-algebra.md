# math.cx.fundamental-theorem-algebra

## Identity
- **KG id**: `math.cx.fundamental-theorem-algebra`
- **Domain**: math.cx
- **Requires**: `math.cx.liouville-theorem`
- **Unlocks**: none
- **Cross-links**: `math.alg.fundamental-theorem-algebra`
- **Difficulty**: expert
- **Bloom level**: understand
- **Mastery threshold**: 0.85
- **Estimated hours**: 3

## Learning Objective
State FTA as an EXISTENCE theorem (at least one root) whose EXACT-$n$-roots form requires
ITERATING — NEVER a direct assertion of $n$ roots; execute the Liouville-based proof's two-step
structure ($1/p$ entire and bounded, then Liouville forces constant) — NEVER skipping the growth
argument; and recognize the Liouville proof and the winding-number proof as GENUINELY DIFFERENT
mathematical routes to the same conclusion — NEVER the same argument under different names.

## Core Understanding
FTA ASSERTS AT LEAST ONE ROOT — NEVER DIRECTLY EXACTLY $n$ ROOTS WITHOUT ITERATION: for
$p(z)=z^4-1$: FTA directly guarantees only ONE root exists. Getting all four requires ITERATING —
factor out that root, $p(z)=(z-z_1)q(z)$ with $\deg q=3$, apply FTA again to $q$, repeat. The
concrete factorization $p(z)=(z-1)(z+1)(z-i)(z+i)$ confirms all four roots $\{1,-1,i,-i\}$ emerge
only after repeated application. Believing FTA directly asserts $n$ roots without needing this
iteration is WRONG — the theorem itself proves existence of ONE root; the full count of $n$ comes
from a separate factor-and-reapply argument, not from the theorem's statement alone.

THE LIOUVILLE PROOF NEEDS BOTH THE GROWTH ARGUMENT AND LIOUVILLE — NEVER LIOUVILLE ALONE: for
$p(z)=z^2+1$, assuming no root exists: $f(z)=1/(z^2+1)$ is entire (denominator never vanishes).
The GROWTH argument is essential: for $|z|\ge\sqrt2$, $|z^2+1|\ge|z|^2/2$, so $|f(z)|\le2/|z|^2\to0$
— giving boundedness OUTSIDE a disk; INSIDE the compact disk $|z|\le\sqrt2$, continuity gives
boundedness there too. ONLY with both pieces is $f$ bounded entire, and Liouville then forces $f$
constant — contradicting $\deg p=2\ge1$. Believing the Liouville proof works over $\mathbb{R}$ to
show every real polynomial has a real root is WRONG — $\sin x$ is a bounded, $C^\infty$,
non-constant REAL function, so the "bounded entire $\Rightarrow$ constant" step, valid only in
$\mathbb{C}$, has NO real-variable analog; the proof breaks precisely at the Liouville step.

THE LIOUVILLE PROOF AND THE WINDING-NUMBER PROOF ARE GENUINELY DIFFERENT ROUTES — NEVER THE SAME
ARGUMENT RENAMED: the Liouville proof uses ANALYTIC rigidity (bounded entire $\Rightarrow$
constant); the winding-number proof (`math.alg.fundamental-theorem-algebra`) uses TOPOLOGICAL
degree theory (as $z$ traces a large circle, $p(z)/|p(z)|$ winds around the origin exactly $n$
times, forcing a zero inside). Both reach the SAME conclusion via COMPLETELY independent
foundational tools — one from complex analysis, one from algebraic topology. Believing the
complex-analysis proof is secretly circular, using the same topological facts under a different
name, is WRONG — the Liouville proof depends ONLY on Liouville's theorem, whose own proof rests on
Cauchy's inequality, nothing topological at all.

## Mental Models
- **"FTA proves one root exists; getting all n roots is a separate iterate-and-factor argument
  layered on top, never something the theorem states directly."**
- **"The Liouville proof needs the growth argument (boundedness) AND Liouville (bounded entire ⇒
  constant) — drop either piece and the proof collapses, especially over ℝ where Liouville fails."**
- **"Liouville's route (analytic rigidity) and winding-number's route (topological degree) are two
  genuinely independent proofs of the same fact — not the same argument in different clothing."**

## Why Students Fail

### MC-1: FTA-GIVES-EXACTLY-N-ROOTS-DIRECTLY
- **Surface form**: believes FTA directly asserts $n$ roots without needing iteration, missing
  that the theorem proves existence of at least one root and the count of $n$ requires a separate
  factoring-and-reapplying argument.
- **Birth type**: overgeneralization (Blueprint's own declared moderate severity — "Fundamental
  Theorem of Algebra" is popularly summarized as "n roots," obscuring the existence-then-iterate
  structure).
- **Repair**: re-walk the $z^4-1$ factor-and-reapply iteration.

### MC-2: LIOUVILLE-PROOF-WORKS-OVER-REALS
- **Surface form**: believes the Liouville-based proof could work over $\mathbb{R}$ to show every
  real polynomial has a real root, missing that bounded $C^\infty$ real functions need not be
  constant.
- **Birth type**: instruction-induced (Blueprint's own declared foundational severity — the
  growth-argument half of the proof looks fully real-analysis-compatible, hiding that only the
  Liouville step is complex-specific).
- **Repair**: re-walk why $\sin x$ breaks the real-variable analog at the Liouville step.

### MC-3: FTA-COMPLEX-AND-ALGEBRAIC-PROOFS-SAME
- **Surface form**: believes the complex-analysis (Liouville) proof and the algebraic/topological
  (winding-number) proof use the same core argument under different names, missing that they are
  genuinely different proofs.
- **Birth type**: overgeneralization (Blueprint's own declared moderate severity — both proofs
  conclude "FTA is true," making the underlying-tool distinction easy to blur).
- **Repair**: re-walk the analytic-rigidity-versus-degree-theory contrast explicitly.

## Misconceptions

### MC-1: FTA-GIVES-EXACTLY-N-ROOTS-DIRECTLY
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

### MC-2: LIOUVILLE-PROOF-WORKS-OVER-REALS
- **Surface form**: as described above.
- **Root cause (instruction-induced)**: as described above.
- **Repair**: as described above.

### MC-3: FTA-COMPLEX-AND-ALGEBRAIC-PROOFS-SAME
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

## Analogies
- **"FTA guaranteeing one root is like a locksmith guaranteeing at least one key opens a lock —
  finding all n keys means repeating the search after removing each one found, not a single
  all-at-once guarantee."**
- **Anti-analogy**: the Liouville proof isn't a topological argument wearing analytic clothing —
  it never invokes winding numbers, degree, or any topological machinery at all.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the $z^4-1$ factor-and-reapply iteration to all four roots.
- **Demonstration 2 (targets MC-2)**: the $z^2+1$ full Liouville proof, and why it fails over
  $\mathbb{R}$.
- **Demonstration 3 (targets MC-3)**: the analytic-rigidity-versus-winding-number contrast.

## Discovery Questions
1. "Does FTA directly assert a polynomial of degree n has exactly n roots, or does it assert at
   least one root, with the full count requiring iteration?"
2. "Why does the Liouville-based proof fail to show every real polynomial has a real root?"
3. "Do the Liouville proof and the winding-number proof use the same core mathematical tool under
   different names, or are they genuinely independent arguments?"

## Teaching Sequence
1. **Representation shift**: work the $z^4-1$ iteration, isolating MC-1.
2. **Conflict evidence**: work the full $z^2+1$ Liouville proof and its real-variable failure,
   isolating MC-2.
3. **Contrast pair**: work the analytic-rigidity-versus-topological-degree contrast, isolating
   MC-3.
4. **Mastery gate**: require a correct statement distinguishing existence from the full-count
   iteration, a correct full execution of the Liouville proof on a concrete polynomial, a correct
   explanation of where the real-variable analog breaks, and a correct factoring of a degree-4
   polynomial with multiplicity, at the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept FTA stated as directly asserting exactly $n$ roots without the iteration step.
- Never accept the Liouville proof presented as valid over $\mathbb{R}$.
- Never accept the Liouville proof and the winding-number proof described as the same argument.

## Voice Teaching Notes
- Say "does FTA give you one root, or all n roots directly?" whenever FTA's statement is discussed.
- Ask "where exactly does that proof break if we try it over the reals?" whenever the Liouville
  proof is presented.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly states FTA as an existence theorem needing iteration
  for the full root count.
- **Rung 2 (application)**: learner correctly executes the full Liouville proof on a concrete
  non-constant polynomial.
- **Rung 3 (transfer)**: learner correctly identifies the distinct key tool each proof (Liouville
  vs. winding-number) depends on, and explains why the Liouville proof is not secretly
  topological.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the factor-and-reapply iteration.
- If MC-2 recurs, re-walk the $\sin x$ real-variable counterexample at the Liouville step.
- If MC-3 recurs, re-contrast analytic rigidity against topological degree theory.

## Memory Hooks
- "FTA gives one root — the full n roots come from iterating, never directly."
- "The proof needs growth AND Liouville — Liouville alone fails over the reals."
- "Liouville's route and winding-number's route are genuinely different tools, same conclusion."

## Transfer Connections
- `math.cx.liouville-theorem` (prerequisite, already authored, this campaign): supplies the
  bounded-entire-implies-constant rigidity this concept's entire proof is built directly on.

## Cross-Subject Connections
- `math.alg.fundamental-theorem-algebra` (cross-link, already authored): supplies the independent
  winding-number/topological-degree proof of the identical theorem, the explicit contrast this
  concept's third Core Understanding principle relies on.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.cx.fundamental-theorem-algebra.md`, reused
  by reference for its three worked examples and its three-misconception registry (birth types
  adopted directly as declared).
- Transfer probe: the Blueprint's own cross-link probe contrasting the Liouville proof's and the
  winding-number proof's distinct key tools, and refuting the "secretly circular" claim.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.cx.liouville-theorem`, unlocks none, cross_links `math.alg.fundamental-theorem-algebra`
  [confirmed authored on disk], expert/understand, mastery_threshold 0.85, estimated_hours 3) was
  directly verified against the live KG and matches exactly.

## Version History
- 2026-09-20 (Batch 244): authored. First entry this batch. Companion batch concept:
  `math.cx.laurent-series`.
