# math.num.euler-method

## Identity
- **KG id**: `math.num.euler-method`
- **Domain**: math.num
- **Requires**: `math.de.euler-method`, `math.num.error-analysis`
- **Unlocks**: `math.num.runge-kutta`
- **Cross-links**: `math.de.euler-method`
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 3

## Learning Objective
Apply explicit Euler $y_{n+1}=y_n+h\cdot f(t_n,y_n)$; distinguish LOCAL truncation error $O(h^2)$
from GLOBAL error $O(h)$ — NEVER confusing the two; recognize smaller $h$ is NEVER always
better — roundoff grows as $h\to0$; and diagnose wild oscillations as a STABILITY-REGION
violation, NEVER evidence the method itself is "wrong."

## Core Understanding
LOCAL TRUNCATION ERROR AND GLOBAL ERROR ARE GENUINELY DIFFERENT ORDERS — NEVER THE SAME: from
Taylor expansion, $y(t_n+h)=y(t_n)+hy'(t_n)+\frac12h^2y''(\xi)$, so the local truncation error
(one step) is $\frac12h^2y''(\xi)=O(h^2)$. But accumulating this over $N=(b-a)/h$ STEPS gives
global error $\approx N\times\text{LTE}=(b-a)/h\times Ch^2=C(b-a)h=O(h)$ — ONE order lower than
the LTE. Believing Euler's GLOBAL error is $O(h^2)$ because the LOCAL truncation error is $O(h^2)$
confuses per-step error with total accumulated error — halving $h$ HALVES the global error, never
quarters it.

SMALLER $h$ IS NEVER ALWAYS BETTER — ROUNDOFF GROWS AS $h\to0$: total error has two components:
truncation error (decreases as $h^p$) and roundoff error (accumulates over $N=T/h$ steps as
$Tu/h$, which GROWS as $h\to0$). Total error $\approx Ch^p+Tu/h$, minimized at some optimal
$h_{\text{opt}}\approx(Tu/C)^{1/(p+1)}$ — for Euler ($p=1$), roughly $10^{-8}$ for typical
problems. Reducing $h$ below this makes the accumulated roundoff WORSE, never better — driving
$h$ toward machine epsilon is WRONG.

WILD OSCILLATIONS SIGNAL A STABILITY-REGION VIOLATION — NEVER PROOF THE METHOD ITSELF IS WRONG:
applying explicit Euler to $y'=-100y$, $y(0)=1$ with $h=0.1$: $h\lambda=0.1\times(-100)=-10$,
$|1+h\lambda|=|1-10|=9>1$ — UNSTABLE, producing wild oscillations. The problem is $h=0.1$ is TOO
LARGE for this stiff ODE (required: $h<2/100=0.02$); with $h=0.01$: $h\lambda=-1$,
$|1-1|=0$ — stable and accurate. Dismissing Euler's method entirely because of oscillations or
blow-up ("Euler's method is wrong") is WRONG — the instability is caused by $h\lambda$ falling
OUTSIDE the method's stability region, fixed by REDUCING $h$ below $2/|\lambda|$ or switching to
an implicit (A-stable) method — never evidence the underlying formula is flawed.

## Mental Models
- **"Local truncation error is the mistake in ONE step; global error is what accumulates over ALL
  the steps — one order lower, never the same order."**
- **"Shrinking h forever doesn't keep improving accuracy — roundoff eventually takes over, exactly
  like in numerical differentiation."**
- **"Oscillations and blow-up mean hλ fell outside the stability region — a step-size problem,
  never proof the method is broken."**

## Why Students Fail

### MC-1: GLOBAL-ERROR-IS-O(h²)
- **Surface form**: believes Euler's global error is $O(h^2)$ because the local truncation error
  is $O(h^2)$, confusing local and global error accumulation.
- **Birth type**: language contamination (Blueprint's own declared birth type — "truncation
  error" sounds like the total error; "local" is easily forgotten, so students apply the per-step
  error directly as the total error).
- **Repair**: re-derive the accumulation explicitly: $N\times\text{LTE}=(T/h)\times Ch^2=CTh=
  O(h)$.

### MC-2: SMALLER-STEP-ALWAYS-BETTER
- **Surface form**: reduces $h$ without limit to improve accuracy, not recognizing that roundoff
  error grows as $1/h$ as the number of steps increases.
- **Birth type**: instruction-induced (Blueprint's own declared birth type — convergence tables
  always show error decreasing; the optimal truncation/roundoff trade-off is rarely taught in
  first courses).
- **Repair**: re-derive the total-error formula $Ch^p+Tu/h$ and its minimizing $h_{\text{opt}}$.

### MC-3: EULER-UNSTABLE-MEANS-WRONG
- **Surface form**: dismisses Euler's method entirely when it shows oscillations or blow-up, not
  recognizing the instability is caused by $h$ being outside the stability region.
- **Birth type**: overgeneralization (Blueprint's own declared birth type — the unstable output
  looks like a numerical bug; students conclude the method is unreliable rather than diagnosing
  the step-size/stability-region relationship).
- **Repair**: re-compute $h\lambda$ and $|1+h\lambda|$ explicitly, identifying the required
  $h<2/|\lambda|$ fix.

## Misconceptions

### MC-1: GLOBAL-ERROR-IS-O(h²)
- **Surface form**: as described above.
- **Root cause (language contamination)**: as described above.
- **Repair**: as described above.

### MC-2: SMALLER-STEP-ALWAYS-BETTER
- **Surface form**: as described above.
- **Root cause (instruction-induced)**: as described above.
- **Repair**: as described above.

### MC-3: EULER-UNSTABLE-MEANS-WRONG
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Each Euler step introduces a tiny lean off course — the global error is the accumulated
  drift over the whole walk, never just one lean's size."**
- **Anti-analogy**: an oscillating Euler solution isn't a broken calculator — it's a car going too
  fast around a curve (h too large for the ODE's stiffness); slow down (reduce h) or take a
  different road (switch to implicit) rather than blaming the car.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the LTE-to-global-error accumulation derivation, $O(h^2)\to
  O(h)$.
- **Demonstration 2 (targets MC-2)**: the truncation-plus-roundoff total-error minimization.
- **Demonstration 3 (targets MC-3)**: the $y'=-100y$, $h=0.1$-unstable-versus-$h=0.01$-stable
  comparison.

## Discovery Questions
1. "If the local truncation error is O(h²), is the global error also O(h²), or one order lower?"
2. "Does shrinking the step size indefinitely keep improving Euler's accuracy?"
3. "If Euler's method oscillates wildly, does that mean the method is fundamentally wrong?"

## Teaching Sequence
1. **Representation shift**: the four-representation Euler derivation (geometric, algebraic,
   error analysis, code), working Demonstration 1, isolating MC-1.
2. **Pattern induction**: the stability gallery across step sizes, isolating MC-2's shadow
   (roundoff) and setting up MC-3.
3. **Misconception detector**: the instability-diagnosis gate question, working Demonstration 3,
   isolating MC-3.
4. **Reused procedure**: the truncation-versus-roundoff optimal step-size derivation, isolating
   MC-2.
5. **Mastery gate**: require a correct LTE-versus-global-error distinction, a correct stability-
   region computation, and a correct instability diagnosis with a proposed fix, at the Blueprint's
   own stated MAMR of 5/5.

## Tutor Actions
- Never accept Euler's global error stated as $O(h^2)$.
- Never accept indefinitely shrinking $h$ recommended without acknowledging roundoff growth.
- Never accept instability blamed on the method itself rather than the step size relative to the
  stability region.

## Voice Teaching Notes
- Say "is that the error in one step, or the error accumulated over the whole interval?"
  whenever LTE and global error are discussed.
- Ask "is hλ inside or outside the stability region here?" whenever Euler's method shows
  oscillation or blow-up.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly applies explicit Euler and computes the global
  error's order.
- **Rung 2 (application)**: learner correctly computes the stability boundary $h<2/|\lambda|$ for
  a given ODE.
- **Rung 3 (transfer)**: learner correctly analyzes the stability of a stiff system via the
  Jacobian's eigenvalues, comparing explicit and implicit Euler.

## Tutor Recovery Strategy
- If MC-1 recurs, re-derive the LTE-to-global-error accumulation.
- If MC-2 recurs, re-derive the truncation-plus-roundoff total-error minimization.
- If MC-3 recurs, re-compute $h\lambda$ and identify the stability-region fix.

## Memory Hooks
- "Local error is O(h²); global error is O(h) — one order lower, never the same."
- "Shrinking h forever eventually loses to roundoff — just like numerical differentiation."
- "Oscillation means h is outside the stability region — never proof the method is wrong."

## Transfer Connections
- `math.de.euler-method` (already authored, certified domain; cross-link): supplies the general
  Euler's method framework this concept applies with explicit numerical error and stability
  analysis.
- `math.num.error-analysis` (already authored, this campaign, Batch 217): supplies the roundoff-
  versus-truncation framework this concept's optimal-step-size trade-off directly applies.
- `math.num.runge-kutta` (unlocked by this concept, not yet authored): will build on Euler's
  first-order accuracy to develop higher-order explicit methods.

## Cross-Subject Connections
- Population and epidemiological modeling: simulating a logistic growth ODE numerically requires
  exactly this stability-versus-accuracy step-size reasoning near equilibrium points.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.num.euler-method.md`, reused by reference
  for its four-representation derivation, its stability gallery, its instability-diagnosis gate
  question, and its three-misconception registry (birth types adopted directly as declared).
- Transfer probe: the Blueprint's own cross-link-mode probe (`math.de.euler-method`) on stability
  analysis for a stiff linear system, deriving the stability condition from eigenvalues of $A$.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.de.euler-method`/`math.num.error-analysis`, unlocks `math.num.runge-kutta`, cross_links
  `math.de.euler-method`, proficient/apply, mastery_threshold 0.85, estimated_hours 3) was
  directly verified against the live KG and matches exactly.

## Version History
- 2026-09-19 (Batch 219): authored. Second entry this batch. Companion batch concept:
  `math.num.cholesky`.
