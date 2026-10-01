# math.fnal.uniform-boundedness

## Identity
- **KG id**: `math.fnal.uniform-boundedness`
- **Domain**: math.fnal
- **Requires**: `math.fnal.bounded-operator`, `math.real.baire-category`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: understand
- **Mastery threshold**: 0.75
- **Estimated hours**: 4

## Learning Objective
Distinguish pointwise boundedness (the hypothesis, per-$x$) from uniform boundedness (the
conclusion, a single bound for all $\alpha$) — NEVER assume pointwise boundedness trivially gives
uniform boundedness; recognize completeness of $X$ (via Baire Category) is the ESSENTIAL
mechanism — NEVER assume the theorem holds for any normed space; and recognize a pointwise-
convergent operator sequence has AUTOMATICALLY uniformly bounded norms — NEVER assume the limit
could be unbounded without appeal to UBP.

## Core Understanding
POINTWISE BOUNDEDNESS NEVER TRIVIALLY GIVES UNIFORM BOUNDEDNESS — THE UBP IS A GENUINELY DEEP
THEOREM: for $T_n:\ell^1\to\mathbb{R}$, $T_n(x)=\sum_{k=1}^n kx_k$: for $x_k=1/k^2$,
$\sum_{k=1}^\infty k/k^2=\sum1/k=\infty$, so pointwise boundedness FAILS for this $x$ — and
correspondingly $\|T_n\|=\sum_{k=1}^n k\to\infty$, uniform boundedness also fails. When the
hypothesis holds on a Banach space, though, the conclusion is forced: the UBP says pointwise
boundedness on a COMPLETE space collapses into a SINGLE global bound on ALL operator norms
simultaneously. Believing that if $\|T_\alpha x\|<\infty$ for each fixed $x$, the same bound
automatically works for all $\alpha$ (treating UBP as a tautology) is WRONG — this is a genuinely
non-trivial theorem, not an immediate consequence of the per-point estimates.

COMPLETENESS OF $X$, VIA THE BAIRE CATEGORY THEOREM, IS THE ESSENTIAL MECHANISM — NEVER ASSUME
THE PRINCIPLE HOLDS FOR ANY NORMED SPACE: on $c_{00}$ (finitely-supported sequences, sup norm —
NOT complete), $T_n(x)=nx_n$: for each fixed $x\in c_{00}$ (finitely many nonzero entries),
$T_nx=0$ for all large $n$ — POINTWISE bounded. But $\|T_n\|\ge n|e_n^{(n)}|=n$ (achieved at
$x=e_n$), so $\sup_n\|T_n\|=\infty$ — UNIFORMLY UNBOUNDED, exactly what the UBP would rule out on
a COMPLETE space. Believing the Uniform Boundedness Principle holds for any normed space,
including non-Banach ones, is WRONG — the Baire Category theorem (which requires completeness)
is exactly the mechanism that fails here, since an incomplete metric space CAN be a countable
union of nowhere-dense sets.

A POINTWISE-CONVERGENT OPERATOR SEQUENCE HAS AUTOMATICALLY UNIFORMLY BOUNDED NORMS — NEVER
ASSUME OTHERWISE WITHOUT INVOKING UBP: for $T_n(f)=\int_0^1f(t)\sin(nt)\,dt$ on $C([0,1])$: the
Riemann-Lebesgue lemma gives $T_n(f)\to0$ for EACH fixed $f$, so $\sup_n|T_n(f)|<\infty$
pointwise; UBP then IMMEDIATELY guarantees $\sup_n\|T_n\|<\infty$ — no individual norm bound is
needed to state pointwise convergence, yet UBP supplies one anyway. Believing that when $T_nx\to
Tx$ pointwise but $T_n$'s norms aren't individually verified bounded, the limit $T$ could still
somehow be unbounded is WRONG — UBP already forces $\sup_n\|T_n\|<\infty$ from pointwise
convergence alone, which then directly bounds $\|Tx\|=\lim_n\|T_nx\|\le(\sup_n\|T_n\|)\|x\|$.

## Mental Models
- **"Pointwise boundedness gives a bound that could vary wildly with α — the UBP is the genuinely
  surprising theorem that, on a complete space, one single bound always works for everyone."**
- **"Completeness isn't a technical footnote here — it's the exact engine (via Baire Category)
  that makes pointwise bounds collapse into a uniform one."**
- **"Pointwise convergence of operators secretly buys you a uniform norm bound for free — that's
  UBP quietly doing work behind the scenes."**

## Why Students Fail

### MC-1: POINTWISE-BOUND-ASSUMED-UNIFORM
- **Surface form**: believes that if each $\|T_\alpha x\|$ is finite, a single bound automatically
  works for all $\alpha$, treating the UBP as a trivial tautology rather than a genuinely
  non-trivial theorem.
- **Birth type**: overgeneralization (Blueprint's own declared foundational severity — "bounded at
  every point" sounds like it should obviously imply "bounded everywhere at once").
- **Repair**: exhibit a concrete example where individual norms vary widely even as pointwise
  bounds are finite, and re-state UBP as the non-trivial theorem that collapses this gap for
  Banach $X$.

### MC-2: UBP-ASSUMED-INDEPENDENT-OF-COMPLETENESS
- **Surface form**: believes the Uniform Boundedness Principle holds for any normed space, missing
  that the Baire Category theorem (and hence completeness of $X$) is the essential mechanism.
- **Birth type**: overgeneralization (Blueprint's own declared foundational severity — the
  theorem's statement is easily remembered without its Banach-space hypothesis attached).
- **Repair**: re-walk the $c_{00}$ counterexample, identifying the exact Baire-category step that
  fails for an incomplete space.

### MC-3: POINTWISE-CONVERGENT-LIMIT-NOT-AUTOMATICALLY-BOUNDED
- **Surface form**: believes that when $T_nx\to Tx$ pointwise but $T_n$ is not eventually
  norm-bounded, the limit $T$ could still be bounded — missing that UBP already guarantees
  $\sup_n\|T_n\|<\infty$ from the pointwise convergence alone.
- **Birth type**: instruction-induced (Blueprint's own declared moderate severity — the connection
  between pointwise convergence and uniform boundedness requires an explicit invocation of UBP
  that's easy to skip).
- **Repair**: invoke UBP to get $\sup_n\|T_n\|<\infty$ from pointwise convergence, then use this
  bound to bound $\|Tx\|$.

## Misconceptions

### MC-1: POINTWISE-BOUND-ASSUMED-UNIFORM
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

### MC-2: UBP-ASSUMED-INDEPENDENT-OF-COMPLETENESS
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

### MC-3: POINTWISE-CONVERGENT-LIMIT-NOT-AUTOMATICALLY-BOUNDED
- **Surface form**: as described above.
- **Root cause (instruction-induced)**: as described above.
- **Repair**: as described above.

## Analogies
- **"UBP is like discovering that if every single customer's bill is finite, the store's total
  daily revenue capacity must also be finite — a genuinely nontrivial leap from 'each' to 'all
  at once,' true only when the space of customers is 'complete.'"**
- **Anti-analogy**: pointwise boundedness isn't a weaker cousin of uniform boundedness that
  automatically strengthens itself — on an incomplete space, it genuinely can stay weak forever,
  as the $c_{00}$ example shows.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the $\ell^1$ truncated-weighted-sum failure-of-both-
  hypothesis-and-conclusion example.
- **Demonstration 2 (targets MC-3)**: the Riemann-Lebesgue pointwise-convergence-to-uniform-bound
  application.
- **Demonstration 3 (targets MC-2)**: the $c_{00}$ pointwise-bounded-but-uniformly-unbounded
  counterexample.

## Discovery Questions
1. "If ‖Tαx‖<∞ for each fixed x, does this automatically mean the same bound works for all α, or
   do we need extra structure?"
2. "Does the UBP hold for any normed space X, or does completeness genuinely matter?"
3. "If Tn is a pointwise-convergent sequence of bounded operators, must the limit operator be
   bounded?"

## Teaching Sequence
1. **Contrast pair**: state the theorem, work Example 1's explicit hypothesis-and-conclusion
   failure, isolating MC-1.
2. **Counterexample**: work Example 3's $c_{00}$ counterexample, isolating MC-2.
3. **Deductive**: work Example 2's Riemann-Lebesgue pointwise-convergence application, isolating
   MC-3.
4. **Mastery gate**: require a correct theorem statement distinguishing pointwise from uniform
   boundedness, a correct identification of the Baire-Category step where completeness enters, and
   a correct explanation of why a pointwise-convergent operator sequence's limit is automatically
   bounded, at the Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept pointwise boundedness treated as automatically implying uniform boundedness.
- Never accept the UBP applied without verifying the domain space is Banach.
- Never accept a pointwise-convergent operator sequence's limit assumed possibly unbounded without
  invoking UBP.

## Voice Teaching Notes
- Say "is that bound the same for every α, or could it vary?" whenever pointwise-versus-uniform
  boundedness is discussed.
- Ask "is the domain space actually complete here?" whenever the UBP is invoked.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly distinguishes pointwise from uniform boundedness in
  the theorem's statement.
- **Rung 2 (application)**: learner correctly computes pointwise and uniform boundedness for a
  concrete operator family.
- **Rung 3 (transfer)**: learner correctly explains, for a numerical-quadrature sequence, what UBP
  guarantees about operator norms from mere pointwise convergence, and why this fails without
  completeness.

## Tutor Recovery Strategy
- If MC-1 recurs, exhibit the concrete example where individual norms vary despite finite
  pointwise bounds.
- If MC-2 recurs, re-walk the $c_{00}$ counterexample.
- If MC-3 recurs, re-derive the bound on $\|Tx\|$ from UBP's uniform norm bound.

## Memory Hooks
- "Pointwise boundedness is per-x — uniform boundedness is one bound for everyone; UBP is the
  non-trivial bridge."
- "Completeness (via Baire Category) is the engine — drop it, and the bridge collapses."
- "Pointwise convergence of operators secretly buys uniform norm boundedness for free."

## Transfer Connections
- `math.fnal.bounded-operator` (prerequisite, already authored, this campaign): supplies the
  operator norm and the objects the principle concerns.
- `math.real.baire-category` (prerequisite, already authored): supplies the Baire Category
  theorem, the proof mechanism that makes completeness productive.

## Cross-Subject Connections
- Numerical analysis: quadrature-formula convergence theory relies on UBP to guarantee that a
  pointwise-convergent sequence of integration rules has uniformly bounded weights, ruling out
  numerical instability.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.fnal.uniform-boundedness.md`, reused by
  reference for its three worked examples and its three-misconception registry (birth types
  adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe on numerical-analysis quadrature
  formulas, connecting UBP to convergence theory for numerical integration schemes.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.fnal.bounded-operator`/`math.real.baire-category`, unlocks none, cross_links none,
  expert/understand, mastery_threshold 0.75, estimated_hours 4) was directly verified against the
  live KG and matches exactly.

## Version History
- 2026-09-20 (Batch 232): authored. First entry this batch. Companion batch concept:
  `math.fnal.spectral-theory`.
