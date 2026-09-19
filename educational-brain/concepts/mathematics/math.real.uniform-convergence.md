# math.real.uniform-convergence

## Identity
- **KG id**: `math.real.uniform-convergence`
- **Domain**: math.real
- **Requires**: `math.real.continuity-rigorous`, `math.seq.series-convergence`
- **Unlocks**: `math.real.weierstrass-approximation`
- **Cross-links**: `math.de.fourier-convergence` (NOT yet authored — confirmed via `ls`;
  independence mode used, matching the Blueprint's own correct self-report)
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 6

## Learning Objective
Define UNIFORM convergence ($\forall\varepsilon>0\,\exists N: n>N\Rightarrow\sup_{x\in E}
|f_n(x)-f(x)|<\varepsilon$), distinguishing it from POINTWISE convergence where $N$ may depend on
$x$; apply "a uniform limit of continuous functions is continuous," identifying a case where
POINTWISE convergence fails to preserve continuity; and apply termwise integration/differentiation
theorems, distinguishing that integration needs only $f_n\to f$ uniformly while differentiation
needs the DERIVATIVES $f_n'$ to converge uniformly — a genuinely separate, stronger requirement.

## Core Understanding
UNIFORM CONVERGENCE DEMANDS ONE $N$ FOR EVERY POINT AT ONCE: for $f_n(x)=x^n$ on $[0,1)$: at
$x=0.5$, a moderate $N$ suffices; at $x=0.9$, the SAME $\varepsilon$ needs a much larger $N$; as
$x\to1^-$, the needed $N$ grows without bound. Indeed $\sup_{x\in[0,1)}|x^n-0|=1$ for EVERY $n$ —
the supremum distance NEVER shrinks below 1. So $f_n\to0$ POINTWISE (each individual $x$
converges) but NOT uniformly (no single $N$ controls every point at once).

UNIFORM CONVERGENCE IS WHAT ACTUALLY PRESERVES CONTINUITY — POINTWISE IS NOT ENOUGH: extending
$f_n(x)=x^n$ to $[0,1]$: each $f_n$ is continuous, but the pointwise limit is $f(x)=0$ for
$x\in[0,1)$, $f(1)=1$ — DISCONTINUOUS at $x=1$, despite every term being continuous. This is
possible precisely because the convergence is only pointwise: the continuity-preservation
theorem's hypothesis (uniform convergence) genuinely fails here, so its conclusion correctly fails
too.

TERMWISE INTEGRATION NEEDS UNIFORM CONVERGENCE OF $f_n$; TERMWISE DIFFERENTIATION NEEDS UNIFORM
CONVERGENCE OF $f_n'$ — A SEPARATE, STRONGER CONDITION: for $g_n(x)=\sin(nx)/\sqrt n$:
$\sup_x|g_n(x)|=1/\sqrt n\to0$, so $g_n\to0$ UNIFORMLY — termwise integration is valid. But
$g_n'(x)=\sqrt n\cos(nx)$, with $\sup_x|g_n'(x)|=\sqrt n\to\infty$ — the DERIVATIVES do NOT
converge uniformly (they don't converge at all). So even though $g_n\to0$ uniformly, one CANNOT
conclude $g_n'\to0$ — termwise differentiation's separate, stronger hypothesis genuinely fails,
correctly blocking a false conclusion.

## Mental Models
- **"Pointwise convergence lets each point set its own convergence speed; uniform convergence
  demands one universal speed limit — the supremum distance — that itself must shrink to zero."**
- **"Uniform convergence of the functions is a ticket for swapping limit and integral — it says
  nothing about being allowed to swap limit and derivative too."**

## Why Students Fail

### MC-1: POINTWISE-CONVERGENCE-CONFLATED-WITH-UNIFORM
- **Surface form**: believes pointwise convergence at every point automatically implies uniform
  convergence.
- **Birth type**: Foundational severity (Blueprint's own declared severity — "true at every
  point" naturally feels like it should compose into a single uniform guarantee).
- **Repair**: re-walk the ever-growing required $N$ as $x\to1^-$ for $x^n$.

### MC-2: POINTWISE-LIMIT-OF-CONTINUOUS-ASSUMED-CONTINUOUS
- **Surface form**: believes the pointwise limit of continuous functions must always be
  continuous.
- **Birth type**: Foundational severity (Blueprint's own declared severity — continuity feels
  like a property that should "pass through" a limit of continuous functions).
- **Repair**: re-walk the $x^n$ example's discontinuous pointwise limit at $x=1$.

### MC-3: UNIFORM-CONVERGENCE-OF-FUNCTIONS-ASSUMED-SUFFICIENT-FOR-TERMWISE-DIFFERENTIATION
- **Surface form**: believes uniform convergence of $f_n$ to $f$ is sufficient to conclude
  $f_n'\to f'$.
- **Birth type**: Moderate severity (Blueprint's own declared severity — integration and
  differentiation both feel like symmetric operations, obscuring their genuinely different
  hypotheses here).
- **Repair**: re-walk the $\sin(nx)/\sqrt n$ case, uniformly convergent yet with divergent
  derivatives.

## Misconceptions

### MC-1: POINTWISE-CONVERGENCE-CONFLATED-WITH-UNIFORM
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

### MC-2: POINTWISE-LIMIT-OF-CONTINUOUS-ASSUMED-CONTINUOUS
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

### MC-3: UNIFORM-CONVERGENCE-OF-FUNCTIONS-ASSUMED-SUFFICIENT-FOR-TERMWISE-DIFFERENTIATION
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

## Analogies
- **"Pointwise convergence is like a race where each runner finishes eventually, at their own
  pace; uniform convergence needs a single finish-line deadline that works for every runner at
  once."**
- **Anti-analogy**: uniform convergence of a function sequence does NOT hand you uniform
  convergence of its derivatives for free — that must be checked as its own, separate condition.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: $x^n$ on $[0,1)$'s ever-growing required $N$ as $x\to1^-$,
  with $\sup$ distance stuck at 1 forever.
- **Demonstration 2 (targets MC-2)**: $x^n$'s pointwise limit on $[0,1]$, discontinuous at $x=1$
  despite every term being continuous.
- **Demonstration 3 (targets MC-3)**: $\sin(nx)/\sqrt n\to0$ uniformly, yet its derivatives'
  supremum $\sqrt n\to\infty$, never converging.

## Discovery Questions
1. "If fₙ(x)→f(x) for every individual x in E, does that automatically mean fₙ→f uniformly on
   E?"
2. "If every function in a sequence is continuous, must its pointwise limit also be continuous?"
3. "If fₙ→f uniformly, is it automatically valid to conclude fₙ'→f' as well?"

## Teaching Sequence
1. **Representation shift**: the one-N-for-every-point-at-once contrast, working Demonstration 1,
   isolating MC-1.
2. **Conflict evidence**: Demonstration 2's discontinuous pointwise limit, isolating MC-2.
3. **Contrast pair**: Demonstration 3's uniform-functions-but-divergent-derivatives case,
   isolating MC-3.
4. **Mastery gate**: require a correct uniform-convergence verification via a direct supremum
   computation, a correct explanation of why the continuity-preservation hypothesis is genuinely
   necessary, and a correct example distinguishing termwise integration from termwise
   differentiation's requirements, at the Blueprint's own stated MAMR of 5/5 (⌈0.85×5⌉).

## Tutor Actions
- Never accept pointwise convergence at every point presented as automatically implying uniform
  convergence.
- Never accept a pointwise limit of continuous functions assumed continuous without checking
  uniformity.
- Never accept uniform convergence of $f_n$ treated as sufficient for termwise differentiation
  without separately verifying the derivatives' uniform convergence.

## Voice Teaching Notes
- Say "does the same N work for every point, or does it need to grow as you approach some edge?"
  whenever uniform convergence is being checked.
- When termwise differentiation is applied, ask "have you verified the derivatives converge
  uniformly too, separately from the functions themselves?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly verifies uniform convergence via a direct supremum
  computation for a new sequence.
- **Rung 2 (application)**: learner correctly identifies why a continuity-preservation argument
  fails for a sequence converging only pointwise.
- **Rung 3 (transfer)**: learner correctly explains, for a numerical polynomial approximation
  scheme, why uniform convergence of the approximations guarantees the limit's continuity but
  requires a separate check before differentiating termwise.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the ever-growing required $N$ for $x^n$.
- If MC-2 recurs, re-walk the discontinuous pointwise limit example.
- If MC-3 recurs, re-walk the $\sin(nx)/\sqrt n$ divergent-derivatives case.

## Memory Hooks
- "Uniform convergence needs one N for every point at once — not a fresh N per point."
- "Continuity of the limit needs uniform convergence — pointwise alone can produce a jump."
- "Termwise differentiation needs the derivatives to converge uniformly, checked separately —
  never assumed automatic."

## Transfer Connections
- `math.real.continuity-rigorous` (already authored, this campaign, Batch 130): supplies the
  $\varepsilon$-$\delta$ continuity definition this concept's continuity-preservation theorem
  builds on.
- `math.seq.series-convergence` (already authored, certified domain): supplies the sequence/series
  convergence machinery this concept's sup-norm definition extends.
- `math.real.weierstrass-approximation` (not yet authored): the KG's declared unlock, using
  uniform convergence directly (every continuous function on a closed interval is a uniform limit
  of polynomials).
- `math.de.fourier-convergence` (not yet authored): the KG's declared cross-link, where Fourier
  series convergence is famously often only pointwise, or weaker, without extra conditions.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.real.uniform-convergence.md`, reused by
  reference for its $x^n$ pointwise-versus-uniform demonstration, its discontinuous-pointwise-
  limit example, its $\sin(nx)/\sqrt n$ termwise-differentiation counterexample, and its
  three-misconception registry (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe, reasoning about a numerical
  polynomial approximation scheme's continuity guarantee and the separate check needed before
  termwise differentiation.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.real.continuity-rigorous`/`math.seq.series-convergence`, unlocks
  `math.real.weierstrass-approximation`, cross_links `math.de.fourier-convergence`, expert/apply,
  mastery_threshold 0.85, estimated_hours 6) was directly verified against the live KG and matches
  exactly. The Blueprint's own correctly-declared independence-mode P76 (cross-link target
  confirmed NOT authored via `ls`) required no correction.

## Version History
- 2026-09-19 (Batch 135): authored. Second entry this batch. Companion batch concept:
  `math.real.riemann-integral`.
