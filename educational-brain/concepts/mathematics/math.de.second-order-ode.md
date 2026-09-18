# math.de.second-order-ode

## Identity
- **KG id**: `math.de.second-order-ode`
- **Domain**: math.de
- **Requires**: `math.de.first-order-ode`
- **Unlocks**: `math.de.higher-order-ode`, `math.de.systems-ode`
- **Cross-links**: none
- **Difficulty**: advanced
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 6

## Learning Objective
Solve homogeneous linear second-order constant-coefficient ODEs $ay''+by'+cy=0$ via the
characteristic equation $ar^2+br+c=0$, handling all THREE root cases (distinct real, repeated
real, complex); apply TWO initial conditions $y(x_0),y'(x_0)$ to fix BOTH arbitrary constants,
never just one; and correctly handle the repeated-root case's second solution $xe^{rx}$ (never
merely $C_1e^{rx}+C_2e^{rx}$, which collapses to one effective constant).

## Core Understanding
ORDER 2 MEANS TWO CONSTANTS AND TWO CONDITIONS, ALWAYS: reusing `math.de.first-order-ode`'s own
exponential-trial technique directly, guessing $y=e^{rx}$ in $y''-5y'+6y=0$ gives
$(r^2-5r+6)e^{rx}=0\Rightarrow r^2-5r+6=0\Rightarrow r=2,3$. By superposition, $y=C_1e^{2x}+
C_2e^{3x}$ is the general solution — TWO independent exponentials, TWO constants. A second-order
equation prescribes acceleration; pinning one trajectory requires BOTH a starting position
$y(x_0)$ AND a starting velocity $y'(x_0)$ — two independent choices demand two dials, never one.

THE THREE ROOT CASES ARE DECIDED BY THE DISCRIMINANT, BUT ALL GIVE EXACTLY TWO CONSTANTS:
$\Delta=b^2-4ac>0$ gives distinct real roots, $y=C_1e^{r_1x}+C_2e^{r_2x}$; $\Delta=0$ gives a
repeated root $r$, $y=(C_1+C_2x)e^{rx}$; $\Delta<0$ gives complex roots $\alpha\pm\beta i$,
$y=e^{\alpha x}(C_1\cos\beta x+C_2\sin\beta x)$ (via Euler's formula, extracting the real and
imaginary parts of $e^{(\alpha+\beta i)x}$ as two independent real solutions). Only the BUILDING
BLOCKS change across cases — the count of constants never does.

A REPEATED ROOT'S NAIVE SUM COLLAPSES TO ONE CONSTANT, REQUIRING THE $x$-FACTOR FIX: for
$y''-4y'+4y=0$, $(r-2)^2=0$ gives a double root $r=2$. Writing $y=C_1e^{2x}+C_2e^{2x}=(C_1+
C_2)e^{2x}$ MERGES the two constants into one — a disguised one-parameter family that cannot meet
two initial conditions. The genuine second, independent solution is $xe^{2x}$ (verified directly
by substitution), giving the correct $y=(C_1+C_2x)e^{2x}$.

## Mental Models
- **"Order 2 always means two dials — position and velocity — regardless of which of the three
  root cases you land in."**
- **"A repeated root's two exponentials look different but ARE the same function — the genuine
  second solution needs the x-factor, not a second copy of the same exponential."**

## Why Students Fail

### MC-1: SINGLE-CONSTANT-SOLUTION
- **Surface form**: writes the general solution with one arbitrary constant (e.g. $y=Ce^{r_1x}$),
  or applies only one initial condition.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared Foundational severity —
  carrying over the single-constant habit from first-order equations directly).
- **Repair**: re-count degrees of freedom physically (position AND velocity), confirming a
  one-constant answer cannot satisfy both.

### MC-2: REPEATED-ROOT-COLLAPSE
- **Surface form**: for a double root $r$, writes $y=C_1e^{rx}+C_2e^{rx}$, which is really one
  merged constant, missing the $xe^{rx}$ second solution.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared trigger — the distinct-root
  formula is applied by pattern-matching without noticing the two exponentials are identical).
- **Repair**: re-simplify the naive answer to show the merge directly, then verify $xe^{rx}$ by
  substitution as the genuine second solution.

### MC-3: COMPLEX-ROOTS-MISREAD
- **Surface form**: misextracts $\alpha$ and $\beta$ from roots $\alpha\pm\beta i$ (sign errors,
  swapping), or leaves complex exponentials in the final answer instead of the real cos/sin form.
- **Birth type**: Type 4, notation-induced (Blueprint's own declared trigger — $\alpha$ and
  $\beta$ both come from the same quadratic-formula computation, making them easy to swap or
  mis-sign).
- **Repair**: re-anchor on the roles explicitly — $\alpha$ (real part) becomes the exponential
  envelope, $\beta$ (imaginary coefficient) becomes the oscillation frequency.

## Misconceptions

### MC-1: SINGLE-CONSTANT-SOLUTION
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: REPEATED-ROOT-COLLAPSE
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-3: COMPLEX-ROOTS-MISREAD
- **Surface form**: as described above.
- **Root cause (Type 4)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A second-order IVP is like specifying both where a ball starts AND how fast it's thrown —
  one number alone can't launch a unique trajectory."**
- **Anti-analogy**: two exponentials with the SAME root are not two independent building blocks —
  they're the same function twice, contributing only one real degree of freedom.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: for $y''-9y=0$ ($r=\pm3$), the one-constant answer
  $y=Ce^{3x}$ fails $y(0)=0,y'(0)=1$ (forces $C=0$, then $y'(0)=0\ne1$) — only the two-constant
  $y=C_1e^{3x}+C_2e^{-3x}$ (giving $C_1=1/6,C_2=-1/6$) is solvable.
- **Demonstration 2 (targets MC-2)**: for $y''-4y'+4y=0$, the naive $C_1e^{2x}+C_2e^{2x}$
  collapses to $(C_1+C_2)e^{2x}$; direct substitution confirms $y=xe^{2x}$ genuinely satisfies the
  equation, giving the correct $y=(C_1+C_2x)e^{2x}$.
- **Demonstration 3 (targets MC-3)**: for roots $-1\pm2i$: $\alpha=-1$ (decay envelope
  $e^{-x}$), $\beta=2$ (oscillation $\cos2x,\sin2x$), giving $y=e^{-x}(C_1\cos2x+C_2\sin2x)$ —
  swapping would wrongly claim a GROWING envelope $e^{2x}$ from a system with negative real part.

## Discovery Questions
1. "If you're only given one initial condition for a second-order ODE, can you find a unique
   solution?"
2. "For a double root $r$, is $C_1e^{rx}+C_2e^{rx}$ really a two-constant family, or does it
   secretly collapse?"
3. "For roots $\alpha\pm\beta i$, which one becomes the exponential envelope, and which becomes
   the oscillation frequency?"

## Teaching Sequence
1. **Representation shift**: derive the characteristic equation by trying $y=e^{rx}$ directly in
   a concrete equation, establishing superposition and the two-constant principle before any case
   taxonomy.
2. **Worked example pair**: a full IVP with distinct real roots (2×2 system for $C_1,C_2$), and a
   complex-root case with Euler extraction to the real form.
3. **Contrast pair**: the three root cases side by side in one table, isolating MC-1 by
   confirming all three retain exactly two constants.
4. **Contrast pair**: Demonstration 2's explicit collapse-and-fix, isolating MC-2 by showing the
   merge directly before introducing $xe^{rx}$.
5. **Contrast pair**: Demonstration 3's $\alpha$/$\beta$ role anchoring, isolating MC-3 by
   requiring the correct assignment justified via Euler's formula.
6. **Mastery gate**: require correctly solved IVPs across all three root cases, at the
   Blueprint's own stated MAMR of 5/5 (⌈0.85×5⌉).

## Tutor Actions
- Never accept a second-order general solution with only one arbitrary constant.
- Never accept $C_1e^{rx}+C_2e^{rx}$ as the final answer for a repeated root without the
  $x$-factor fix.

## Voice Teaching Notes
- Say "does that solution have two independent constants, or do they secretly merge into one?"
  whenever a general solution is proposed.
- When complex roots are extracted, ask "which part becomes the envelope, and which becomes the
  frequency?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly writes the characteristic equation and identifies
  the discriminant's sign for a new ODE.
- **Rung 2 (application)**: learner correctly solves a full IVP (both conditions) for each of the
  three root cases.
- **Rung 3 (transfer)**: learner correctly models a NEW damped-oscillator scenario, identifying
  the decay envelope and oscillation frequency, and computing a specific zero-crossing time.

## Tutor Recovery Strategy
- If MC-1 recurs, re-count degrees of freedom physically and test the one-constant answer against
  both conditions.
- If MC-2 recurs, re-simplify the naive merged answer, then verify $xe^{rx}$ by substitution.
- If MC-3 recurs, re-anchor on the $\alpha$/$\beta$ roles via Euler's formula directly.

## Memory Hooks
- "Two constants, two conditions — always, regardless of root case."
- "Same root twice means the same function twice — the fix is an x-factor, not a second copy."
- "Alpha is the envelope, beta is the frequency — never swap them."

## Transfer Connections
- `math.de.first-order-ode` (already authored, this campaign, Batch 102): supplies the
  exponential-trial technique and general/particular solution framework this concept doubles the
  constants and conditions of.
- `math.de.higher-order-ode`, `math.de.systems-ode` (not yet authored): the KG's declared
  unlocks, generalizing the characteristic-polynomial method to order $n$ and converting to
  first-order systems respectively.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.de.second-order-ode.md`, reused by
  reference for its trial-solution discovery of the characteristic equation, its full-IVP worked
  example pair, its three-root-case table, its explicit repeated-root collapse demonstration, and
  its three-misconception registry (severity levels and trigger conditions adopted directly as
  declared).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe, examining a
  damped mass-spring system $x''+2x'+26x=0$, its solution, decay envelope, oscillation frequency,
  and first positive zero-crossing time.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.de.first-order-ode`, unlocks `math.de.higher-order-ode`+`math.de.systems-ode`,
  cross_links none, advanced/apply, mastery_threshold 0.85, estimated_hours 6) was directly
  verified against the live KG and matches exactly.

## Version History
- 2026-09-18 (Batch 103): authored. First entry this batch. Companion batch concept:
  `math.prob.total-probability`. `math.de` moves 5/56 → **6/56** this batch.
