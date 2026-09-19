# math.num.root-finding

## Identity
- **KG id**: `math.num.root-finding`
- **Domain**: math.num
- **Requires**: `math.calc.continuity`, `math.real.ivt`
- **Unlocks**: `math.num.newtons-method`
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.8
- **Estimated hours**: 6

## Learning Objective
Apply bisection to locate a root, recognizing it as the DIRECT algorithmic realization of IVT's
existence guarantee (never an unrelated algorithm); apply Newton's method and recognize its
QUADRATIC convergence near a root, while recognizing its real failure modes (bad starting point,
vanishing derivative — never assumed to always succeed given "any reasonable" start); and
recognize the secant method's SUPERLINEAR convergence without $f'$ (never assumed to match
Newton's exact quadratic rate).

## Core Understanding
BISECTION IS IVT'S EXISTENCE GUARANTEE, MADE ALGORITHMIC — NEVER AN UNRELATED PROCEDURE: for
$f(x)=x^2-2$ on $[1,2]$: $f(1)=-1<0$, $f(2)=2>0$ — IVT guarantees a root in $(1,2)$. BISECT:
midpoint $m=1.5$, $f(1.5)=0.25>0$ — since $f(1)<0$ and $f(1.5)>0$, the root is in $(1,1.5)$.
Continuing this HALVES the interval each step, converging to $\sqrt2\approx1.41421$. This is
EXACTLY IVT's existence guarantee, APPLIED REPEATEDLY to shrinking sub-intervals — never a
separate, unrelated algorithm.

NEWTON'S METHOD'S SPEED COMES WITH GENUINE, NON-THEORETICAL FAILURE MODES: for the SAME
$f(x)=x^2-2$, starting at $x_0=1.5$: $x_1=1.5-0.25/3\approx1.4167$; $x_2\approx1.41421$ —
essentially exact after just 2 iterations, roughly DOUBLING correct digits each step (quadratic
convergence). But starting at $x_0=0$ (where $f'(0)=0$) causes DIVISION BY ZERO — a genuine
FAILURE, never merely a theoretical edge case. Newton's dramatic speed advantage over bisection is
real, but so is its real vulnerability: a bad starting point or a vanishing derivative is a
concrete way the method can fail outright, never just "converge more slowly."

SECANT ACHIEVES SUPERLINEAR CONVERGENCE WITHOUT $f'$ — NEVER MATCHING NEWTON'S EXACT QUADRATIC
RATE: for the SAME $f(x)=x^2-2$, starting with $x_0=1,x_1=2$: the secant method approximates
$f'$ via the SLOPE between the two most recent points, $x_2=2-2\cdot\frac{2-1}{2-(-1)}\approx
1.333$. Continuing (using only function VALUES, no explicit derivative formula ever) converges
FASTER than bisection but SLOWER than Newton on the identical function — secant's derivative-free
approximation genuinely COSTS some convergence speed (superlinear, never quadratic), never a "free
lunch" replacement for Newton.

## Mental Models
- **"Bisection is IVT with a stopwatch — the same existence guarantee, run over and over on
  shrinking intervals until you're close enough."**
- **"Newton's speed is real, but so is its trapdoor — a bad start or a flat derivative doesn't
  slow it down, it breaks it."**
- **"Secant trades Newton's exact slope for an approximate one — faster than bisection, but that
  approximation costs real speed compared to Newton."**

## Why Students Fail

### MC-1: BISECTION-ASSUMED-UNRELATED-TO-IVT
- **Surface form**: believes bisection is an unrelated new algorithm disconnected from IVT,
  missing that it is directly IVT's existence guarantee applied repeatedly.
- **Birth type**: Foundational severity (Blueprint's own declared severity — bisection is often
  taught as a standalone numerical recipe, obscuring its direct theoretical origin).
- **Repair**: re-walk the step-by-step halving toward $\sqrt2$, connecting each step back to IVT.

### MC-2: NEWTONS-METHOD-ASSUMED-ALWAYS-SUCCEEDS
- **Surface form**: believes Newton's fast convergence means it will always succeed given any
  reasonable starting guess, missing its genuine failure modes.
- **Birth type**: High severity (Blueprint's own declared severity — the impressive speed
  advantage overshadows the method's real fragility).
- **Repair**: re-walk the division-by-zero failure case at $x_0=0$.

### MC-3: SECANT-ASSUMED-SAME-RATE-AS-NEWTON
- **Surface form**: believes the secant method achieves Newton's exact quadratic convergence
  rate without needing the derivative, missing that its derivative-free approximation costs some
  speed.
- **Birth type**: Moderate severity (Blueprint's own declared severity — "derivative-free but
  just as fast" sounds like an appealing but false free lunch).
- **Repair**: re-walk secant's slower-than-Newton convergence on the identical function.

## Misconceptions

### MC-1: BISECTION-ASSUMED-UNRELATED-TO-IVT
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: NEWTONS-METHOD-ASSUMED-ALWAYS-SUCCEEDS
- **Surface form**: as described above.
- **Root cause (High)**: as described above.
- **Repair**: as described above.

### MC-3: SECANT-ASSUMED-SAME-RATE-AS-NEWTON
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Bisection is a guaranteed slow-and-steady search; Newton is a fast but occasionally
  reckless sprint that can trip over a flat spot; secant is a careful jog that estimates the
  ground ahead instead of measuring it exactly."**
- **Anti-analogy**: secant is not "Newton's method minus the annoying derivative, at no cost" —
  approximating the slope genuinely slows convergence compared to using the true derivative.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the step-by-step bisection halving toward $\sqrt2$.
- **Demonstration 2 (targets MC-2)**: Newton's method's rapid convergence from $x_0=1.5$
  contrasted with its division-by-zero failure from $x_0=0$.
- **Demonstration 3 (targets MC-3)**: the secant method's convergence on the same function,
  positioned between bisection and Newton.

## Discovery Questions
1. "Is bisection an unrelated new algorithm, disconnected from the Intermediate Value Theorem's
   own existence guarantee?"
2. "Does Newton's method's much faster convergence rate mean it will always succeed, given any
   reasonable starting guess?"
3. "Does the secant method achieve the exact same quadratic convergence rate as Newton's method,
   just without needing an explicit formula for $f'$?"

## Teaching Sequence
1. **Representation shift**: bisection as IVT made algorithmic, working Demonstration 1,
   isolating MC-1.
2. **Conflict evidence**: Newton's method's speed contrasted with its division-by-zero failure,
   working Demonstration 2, isolating MC-2.
3. **Contrast pair**: secant's superlinear rate contrasted directly against Newton's quadratic
   rate, working Demonstration 3, isolating MC-3.
4. **Mastery gate**: require correct bisection and Newton iterations on a given function, a
   correct explanation of Newton's failure when $f'(x_0)=0$, and a correct qualitative placement
   of secant's convergence rate between bisection and Newton, at the Blueprint's own stated MAMR
   of 4/5.

## Tutor Actions
- Never accept bisection presented as unrelated to IVT's existence guarantee.
- Never accept a claim that Newton's method always succeeds given any reasonable starting point.
- Never accept a claim that the secant method matches Newton's exact quadratic convergence rate.

## Voice Teaching Notes
- Say "which half still has the sign change — and why does IVT guarantee that?" whenever
  bisection is run.
- Ask "what happens if the derivative is zero at your starting point?" whenever Newton's method
  is applied.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly performs bisection iterations, tracking which
  half-interval is retained via the sign-change condition.
- **Rung 2 (application)**: learner correctly performs Newton's method iterations and correctly
  identifies why a zero-derivative starting point causes failure.
- **Rung 3 (transfer)**: learner correctly explains why secant's convergence rate sits between
  bisection's and Newton's, and correctly chooses between methods given a stated constraint (e.g.
  no derivative available).

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the bisection-as-IVT connection.
- If MC-2 recurs, re-walk the division-by-zero failure case.
- If MC-3 recurs, re-walk secant's slower-than-Newton convergence.

## Memory Hooks
- "Bisection is IVT, run repeatedly — never a separate algorithm."
- "Newton's speed has a real trapdoor — a bad start or flat derivative breaks it outright."
- "Secant is faster than bisection, slower than Newton — never as fast as Newton."

## Transfer Connections
- `math.calc.continuity` (already authored, certified domain): supplies the continuity
  hypothesis these methods' guarantees depend on.
- `math.real.ivt` (already authored, certified domain): supplies the rigorous existence
  guarantee bisection directly algorithmizes.
- `math.num.newtons-method` (not yet authored, KG's declared unlock): builds directly on this
  concept's introduction to Newton's method, developing its full convergence analysis.

## Cross-Subject Connections
- Engineering: root-finding for nonlinear stress or design equations, where derivative
  availability (or its absence, with noisy experimental data) directly determines which method
  applies.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.num.root-finding.md`, reused by reference
  for its bisection-toward-√2 walkthrough, its Newton's-method success-and-failure contrast, its
  secant-method rate comparison, and its three-misconception registry (severity levels adopted
  directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe on an engineer choosing between
  bisection and secant for noisy experimental data lacking derivative access, and the consequence
  of a failed sign-change hypothesis.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Stale KG metadata discrepancy found**: the Blueprint's Component 0 and Component 7 both state
  `unlocks: none listed in the KG for this concept`, but the LIVE KG shows
  `unlocks: ['math.num.newtons-method']`. This EB file adopts the live KG value
  (`math.num.newtons-method`) as authoritative, per this campaign's established discipline of
  trusting the live KG over a Blueprint's possibly-stale Component 0/7 snapshot.
  `math.num.newtons-method` independently confirmed NOT YET authored in this EB corpus. All other
  fields (requires `math.calc.continuity`/`math.real.ivt`, cross_links none, proficient/apply,
  mastery_threshold 0.8, estimated_hours 6) verified exact matches.

## Version History
- 2026-09-19 (Batch 194): authored. Second entry this batch. Companion batch concept:
  `math.num.floating-point`.
