# math.real.inverse-function-theorem

## Identity
- **KG id**: `math.real.inverse-function-theorem`
- **Domain**: math.real
- **Requires**: `math.real.differentiability-rigorous`, `math.linalg.matrix-inverse`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.75
- **Estimated hours**: 5

## Learning Objective
State the Inverse Function Theorem: if $f:\mathbb R^n\to\mathbb R^n$ is $C^1$ and $Df(a)$ is
INVERTIBLE, then $f$ is LOCALLY invertible near $a$ with a $C^1$ inverse; apply the derivative
formula $D(f^{-1})(f(a))=[Df(a)]^{-1}$ — the genuine MATRIX inverse, never an entrywise
reciprocal; and recognize the theorem gives ONLY a LOCAL guarantee, never implying global
invertibility even when $Df$ is invertible at every point.

## Core Understanding
THE THEOREM IS THE 1D INVERSE-DERIVATIVE RULE, GENERALIZED: for $f:\mathbb R\to\mathbb R$ with
$f'(a)\ne0$, $f$ is locally invertible with $(f^{-1})'(f(a))=1/f'(a)$. The multivariable theorem
generalizes exactly this: "invertible derivative" becomes "invertible Jacobian MATRIX" (nonzero
determinant, not merely a nonzero scalar), and the reciprocal $1/f'(a)$ becomes the matrix inverse
$[Df(a)]^{-1}$. For $f(x,y)=(x+y^2,y+x^2)$ at $a=(1,1)$: $Df(1,1)=\begin{pmatrix}1&2\\2&1
\end{pmatrix}$, determinant $=-3\ne0$ — invertible, so $f$ is locally invertible near $(1,1)$, with
$D(f^{-1})(f(1,1))=[Df(1,1)]^{-1}=\frac1{-3}\begin{pmatrix}1&-2\\-2&1\end{pmatrix}$ — obtained
PURELY from inverting the Jacobian, with NO need for an explicit formula for $f^{-1}$ itself.

THE DERIVATIVE FORMULA IS THE GENUINE MATRIX INVERSE, NEVER AN ENTRYWISE RECIPROCAL: computing
$[Df(a)]^{-1}$ requires the actual matrix-inversion procedure (via the determinant and adjugate,
or row reduction) — never taking $1/(\text{each entry})$ separately. The $-3$ example above shows
this concretely: the correct inverse mixes ALL four entries via the determinant, producing values
like $2/3$ and $-1/3$ that bear no resemblance to simple reciprocals of $1,2,2,1$.

LOCAL INVERTIBILITY EVERYWHERE DOES NOT SUM TO GLOBAL INVERTIBILITY: for $f(x,y)=(e^x\cos y,
e^x\sin y)$ (the real form of $z\mapsto e^z$): $\det Df(x,y)=e^{2x}>0$ EVERYWHERE — the theorem
applies locally at EVERY point. Yet $f(x,y)=f(x,y+2\pi)$ for all $x,y$ (periodicity in $y$) — $f$
genuinely FAILS to be globally injective, despite satisfying the theorem's local hypothesis
everywhere. The theorem's guarantee is honestly and strictly local, never automatically extending
to a global statement.

## Mental Models
- **"Matrix invertibility replaces 'nonzero' and matrix inverse replaces 'reciprocal' — same 1D
  idea, richer setting."**
- **"A guarantee that holds at every single point, one point at a time, is not automatically a
  guarantee about the whole space at once."**

## Why Students Fail

### MC-1: LOCAL-INVERTIBILITY-EVERYWHERE-CONFLATED-WITH-GLOBAL
- **Surface form**: believes that if $Df$ is invertible at every point of the domain, $f$ must be
  globally invertible.
- **Birth type**: Foundational severity (Blueprint's own declared severity — "true at every
  point" naturally feels like it should compose into a global statement, the central conceptual
  hazard this concept exists to correct).
- **Repair**: re-walk the $e^x\cos y,e^x\sin y$ periodicity counterexample directly.

### MC-2: JACOBIAN-INVERTIBILITY-CONFUSED-WITH-NONZERO-ENTRIES
- **Surface form**: believes the theorem's hypothesis is satisfied as long as SOME entries of
  $Df(a)$ are nonzero.
- **Birth type**: Foundational severity (Blueprint's own declared severity — the scalar 1D
  condition "nonzero" naturally but incorrectly generalizes to "nonzero entries" rather than
  "nonzero determinant").
- **Repair**: re-anchor on a matrix with all nonzero entries but zero determinant (e.g.
  $\begin{pmatrix}1&1\\1&1\end{pmatrix}$), showing the theorem does NOT apply there.

### MC-3: INVERSE-DERIVATIVE-FORMULA-MISAPPLIED-AS-ENTRYWISE-RECIPROCAL
- **Surface form**: believes $D(f^{-1})(f(a))$ is computed by taking the entrywise reciprocal of
  $Df(a)$'s entries.
- **Birth type**: Moderate severity (Blueprint's own declared severity — "inverse" in everyday
  language suggests "reciprocal," obscuring that matrix inversion is a genuinely different
  operation).
- **Repair**: re-walk the genuine matrix-inverse computation, contrasting with the wrong
  entrywise-reciprocal result.

## Misconceptions

### MC-1: LOCAL-INVERTIBILITY-EVERYWHERE-CONFLATED-WITH-GLOBAL
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

### MC-2: JACOBIAN-INVERTIBILITY-CONFUSED-WITH-NONZERO-ENTRIES
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

### MC-3: INVERSE-DERIVATIVE-FORMULA-MISAPPLIED-AS-ENTRYWISE-RECIPROCAL
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

## Analogies
- **"A map that never gets stuck locally can still wrap all the way around and repeat itself
  globally — being locally fine everywhere is not the same as being globally one-to-one."**
- **Anti-analogy**: "invertible Jacobian" does NOT mean "some entries happen to be nonzero" — it
  means the WHOLE matrix has a nonzero determinant, a genuinely different and stricter condition.

## Demonstrations
- **Demonstration 1 (targets MC-2)**: $\begin{pmatrix}1&1\\1&1\end{pmatrix}$'s all-nonzero
  entries yet zero determinant, failing invertibility.
- **Demonstration 2 (targets MC-3)**: the genuine matrix inverse of $\begin{pmatrix}1&2\\2&1
  \end{pmatrix}$ contrasted against the wrong entrywise-reciprocal attempt.
- **Demonstration 3 (targets MC-1)**: $(e^x\cos y,e^x\sin y)$'s everywhere-invertible Jacobian
  yet global non-injectivity via $2\pi$-periodicity.

## Discovery Questions
1. "If Df(x) is invertible at every point of the domain, does that guarantee f is globally
   invertible?"
2. "To apply the theorem, is it enough that some entries of Df(a) are nonzero, or must the whole
   matrix be invertible?"
3. "Is D(f⁻¹)(f(a)) computed by taking the entrywise reciprocal of Df(a)'s entries?"

## Teaching Sequence
1. **Representation shift**: the theorem as a direct generalization of the 1D inverse-derivative
   rule, working full Jacobian computations and invertibility checks, isolating MC-2.
2. **Counterexample**: the $e^x\cos y,e^x\sin y$ everywhere-local-not-global case, isolating MC-1.
3. **Conceptual anchor**: the genuine matrix-inverse computation contrasted against the entrywise-
   reciprocal error, isolating MC-3.
4. **Mastery gate**: require a correct invertibility check via determinant, a correct application
   of the derivative formula, and a correct explanation of why everywhere-local invertibility
   doesn't imply global invertibility, at the Blueprint's own stated MAMR of 4/5 (⌈0.75×5⌉).

## Tutor Actions
- Never accept everywhere-local invertibility presented as sufficient for global invertibility.
- Never accept a matrix's invertibility judged from individual nonzero entries rather than its
  determinant.
- Never accept the inverse-derivative formula computed as an entrywise reciprocal.

## Voice Teaching Notes
- Say "is that true everywhere locally, or globally across the whole domain?" whenever
  invertibility is discussed at multiple points.
- When Jacobian invertibility is checked, ask "did you compute the determinant, or just look at
  individual entries?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly checks Jacobian invertibility via determinant for a
  new function and point.
- **Rung 2 (application)**: learner correctly computes the derivative of the local inverse via
  genuine matrix inversion.
- **Rung 3 (transfer)**: learner correctly connects the theorem's hypothesis to the change-of-
  variables formula's own $\det DT\ne0$ requirement, and explains why that formula additionally
  needs global injectivity beyond the theorem's local guarantee.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the periodicity counterexample.
- If MC-2 recurs, re-anchor on the all-nonzero-entries-zero-determinant example.
- If MC-3 recurs, re-walk the genuine matrix-inverse computation.

## Memory Hooks
- "Local everywhere is not global — a map can be fine at every point and still wrap around."
- "Invertibility means nonzero determinant of the whole matrix, not just nonzero entries."
- "The inverse derivative is a genuine matrix inverse, never an entrywise reciprocal."

## Transfer Connections
- `math.real.differentiability-rigorous` (already authored, this campaign, Batch 132): supplies
  the multivariable derivative $Df(a)$ as a Jacobian matrix and $C^1$ continuity, both hypotheses
  of this theorem.
- `math.linalg.matrix-inverse` (already authored, certified domain): supplies invertibility and
  computing $A^{-1}$, directly used in the theorem's conclusion formula.
- `math.real.implicit-function-theorem` (already authored, this campaign, Batch 138): the KG's
  `related` field (not a formal `cross_links` entry) names this concept, reflecting the deep
  shared invertibility idea between the two theorems.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.real.inverse-function-theorem.md`, reused
  by reference for its 1D-generalization framing, its full Jacobian-computation worked examples,
  its periodicity counterexample, and its three-misconception registry (severity levels adopted
  directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe, connecting the theorem's
  hypothesis to the change-of-variables formula's $\det DT\ne0$ requirement and its additional
  need for global injectivity.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.real.differentiability-rigorous`/`math.linalg.matrix-inverse`, unlocks none, cross_links
  none, expert/apply, mastery_threshold 0.75, estimated_hours 5) was directly verified against the
  live KG and matches exactly.

## Version History
- 2026-09-19 (Batch 139): authored. First entry this batch, closing out the differentiability-
  rigorous chain entirely (both implicit- and inverse-function theorems now authored). Companion
  batch concept: `math.prob.normal-distribution`.
