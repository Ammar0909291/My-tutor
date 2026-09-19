# math.de.heat-equation

## Identity
- **KG id**: `math.de.heat-equation`
- **Domain**: math.de
- **Requires**: `math.de.separation-of-variables-pde`, `math.de.fourier-series`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.8
- **Estimated hours**: 7

## Learning Objective
Solve the IBVP for $u_t=ku_{xx}$ on $[0,L]$ by full separation of variables, assembling the
SUPERPOSITION $u(x,t)=\sum b_ne^{-k(n\pi/L)^2t}\sin(n\pi x/L)$ (never stopping at a single
separated solution); recognize the heat equation SMOOTHS instantaneously with infinite effective
propagation speed (never propagating like a wave); and correctly identify the decay rate as
PROPORTIONAL TO $n^2$ (never $n$) — because the eigenvalue $\lambda_n=(n\pi/L)^2$ is itself
quadratic in $n$.

## Core Understanding
THE FULL SOLUTION IS A SUPERPOSITION OVER ALL EIGENVALUES — NEVER A SINGLE SEPARATED SOLUTION:
separation gives $X''+\lambda X=0$ with $X(0)=X(L)=0$, an eigenvalue problem with INFINITELY MANY
eigenvalues $\lambda_n=(n\pi/L)^2$ and eigenfunctions $X_n(x)=\sin(n\pi x/L)$, each pairing with
$T_n(t)=e^{-k(n\pi/L)^2t}$. Since the PDE is linear, EVERY linear combination of these separated
solutions is also a solution — the general IC $f(x)$ is almost never a single sine, so the correct
solution requires the full sum $u(x,t)=\sum_nb_n\sin(n\pi x/L)e^{-k(n\pi/L)^2t}$, with $b_n$
extracted via the Fourier sine series exactly as in `math.de.fourier-series`.

THE HEAT EQUATION SMOOTHS INSTANTANEOUSLY — NEVER PROPAGATES LIKE A WAVE: "heat flows" language
from physics is often misread as heat TRAVELING like a wave with a finite speed. In truth, at ANY
$t>0$ (however small), EVERY point of the bar is influenced by any local temperature change — an
infinite effective propagation speed, though the influence decreases exponentially with distance.
The solution becomes infinitely SMOOTH for $t>0$ regardless of how rough $f(x)$ was — this
instantaneous smoothing, never wave-like propagation, is the heat equation's defining qualitative
behavior.

DECAY RATE IS PROPORTIONAL TO $n^2$ — NEVER $n$: the eigenvalue of $-d^2/dx^2$ for $\sin(n\pi x/L)$
is $(n\pi/L)^2$, so mode $n$ decays as $e^{-k(n\pi/L)^2t}$. Mode $n=2$ decays $4\times$ faster than
$n=1$ (not $2\times$); mode $n=10$ decays $100\times$ faster. This quadratic scaling — never linear
— means higher harmonics vanish almost immediately, leaving only the fundamental mode
$\sin(\pi x/L)e^{-k(\pi/L)^2t}$ to dominate for moderate $t$. For Neumann (insulated) BCs, the
eigenfunctions become $\cos(n\pi x/L)$ with $\lambda_0=0$, giving a nonzero steady state
$u\to a_0/2$ (the average temperature) — CONSERVED, since no heat escapes through insulated ends.

## Mental Models
- **"Separation gives infinitely many building-block solutions — the real answer is the sum that
  matches your specific initial condition, never just one term."**
- **"Heat doesn't travel like a wave — it smooths everywhere at once, instantly, with the effect
  fading exponentially with distance rather than arriving after a delay."**
- **"Decay rate scales as n squared, not n — mode 2 is four times faster than mode 1, not twice."**

## Why Students Fail

### MC-1: SEPARATION-GIVES-ONLY-ONE-SOLUTION
- **Surface form**: believes the separation $u=X(x)T(t)$ directly gives the full solution, not
  realizing each eigenvalue gives one separated solution and the full answer is a superposition.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared birth type — the separation
  step is presented as a procedure that "solves the PDE," and students stop after writing one
  separated solution without recognizing the eigenvalue problem has infinitely many solutions).
- **Repair**: re-walk the superposition-principle argument and the necessity of matching $f(x)$'s
  full Fourier sine series.

### MC-2: HEAT-EQUATION-SOLUTION-PROPAGATES
- **Surface form**: believes the heat equation's solution shows "heat waves" traveling from hot to
  cold, like the wave equation.
- **Birth type**: Type 3, language contamination (Blueprint's own declared birth type — "heat
  flows" language from physics triggers a wave-propagation mental model rather than the actual
  instantaneous-diffusion behavior).
- **Repair**: re-anchor on the infinite-effective-speed, instantaneous-smoothing contrast with
  finite wave-propagation speed.

### MC-3: DECAY-RATE-PROPORTIONAL-TO-N
- **Surface form**: believes the $n$-th mode decays at rate $n$ (linearly) rather than $n^2$
  (quadratically).
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared birth type — the frequency
  eigenvalue $\lambda_n=(n\pi/L)^2$ is often conflated with its square root, or the linear
  dependence $n\pi/L$ is mistakenly carried into the exponent unsquared).
- **Repair**: re-derive $\lambda_n=(n\pi/L)^2$ directly from $X''=-\lambda_nX$ for $X_n=\sin(n\pi
  x/L)$.

## Misconceptions

### MC-1: SEPARATION-GIVES-ONLY-ONE-SOLUTION
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-2: HEAT-EQUATION-SOLUTION-PROPAGATES
- **Surface form**: as described above.
- **Root cause (Type 3)**: as described above.
- **Repair**: as described above.

### MC-3: DECAY-RATE-PROPORTIONAL-TO-N
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Each separated solution is one building block; the initial condition tells you exactly how
  much of each block to use — you can't build an arbitrary shape from just one block."**
- **Anti-analogy**: the heat equation is NOT a wave equation wearing a different name — it has no
  finite propagation speed and no traveling disturbance; it smooths instantly everywhere.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the $f(x)=3\sin(2x)$-style worked example, matching the
  Fourier sine series coefficient-by-coefficient to the full superposition.
- **Demonstration 2 (targets MC-2)**: the instantaneous-smoothing-versus-finite-speed-propagation
  contrast, directly opposing the wave equation's later treatment.
- **Demonstration 3 (targets MC-3)**: the direct $\lambda_n=(n\pi/L)^2$ eigenvalue derivation and
  the $4\times$/$100\times$ relative decay-rate comparison across modes.

## Discovery Questions
1. "Does writing one separated solution $X(x)T(t)$ that satisfies the PDE and boundary conditions
   solve the full initial-boundary value problem?"
2. "Does the heat equation's solution show heat traveling like a wave, or does it smooth
   everywhere instantly?"
3. "Does the n-th mode's decay rate scale proportionally to n, or to n squared?"

## Teaching Sequence
1. **Representation shift**: the full separation-eigenvalue-superposition derivation, working
   Demonstration 1, isolating MC-1.
2. **Contrast pair**: the instantaneous-smoothing-versus-wave-propagation distinction, working
   Demonstration 2, isolating MC-2.
3. **Pattern induction**: the $n^2$ decay-rate derivation and physical interpretation, working
   Demonstration 3, isolating MC-3.
4. **Mastery gate**: require a correct full-superposition solution matching a given IC, a correct
   explanation of the smoothing (not propagating) behavior, and a correct $n^2$-decay-rate
   computation and comparison across modes, at the Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept a single separated solution presented as the complete IBVP solution.
- Never accept the heat equation described as propagating disturbances like a wave.
- Never accept a decay rate stated as proportional to $n$ rather than $n^2$.

## Voice Teaching Notes
- Say "is one separated solution enough, or do you need the sum over every eigenvalue?" whenever
  the heat equation is solved.
- Ask "does heat travel to a point, or does every point feel it instantly, just by a different
  amount?" whenever the smoothing property is discussed.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly identifies the eigenvalue problem's infinitely many
  solutions and the need for superposition.
- **Rung 2 (application)**: learner correctly assembles a full Fourier-series solution matching a
  given initial condition, with correctly $n^2$-scaled decay rates.
- **Rung 3 (transfer)**: learner correctly handles Neumann BCs (cosine eigenfunctions, conserved
  average temperature) and the steady-state decomposition for non-homogeneous BCs.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the superposition-principle argument.
- If MC-2 recurs, re-anchor on the instantaneous-smoothing-versus-propagation contrast.
- If MC-3 recurs, re-derive $\lambda_n=(n\pi/L)^2$ directly.

## Memory Hooks
- "One separated solution is a building block, not the whole answer — sum every mode the IC
  actually needs."
- "Heat smooths instantly everywhere — it never travels like a wave."
- "Decay rate scales as n squared — mode 2 is four times faster, not twice."

## Transfer Connections
- `math.de.separation-of-variables-pde` (already authored, this campaign, Batch 165): supplies the
  general separation-eigenvalue-superposition technique this concept applies to the canonical
  parabolic PDE.
- `math.de.fourier-series` (already authored, this campaign, Batch 163): supplies the coefficient-
  extraction machinery used to match the initial condition.
- `math.de.wave-equation` (authored later this same batch, KG's declared related concept): the
  canonical hyperbolic PDE this concept is directly contrasted against (smoothing vs. propagating,
  irreversible vs. time-reversible).

## Cross-Subject Connections
- Physics: thermal diffusion in a rod; Brownian motion's probability density evolution.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.de.heat-equation.md`, reused by reference for
  its full separation-of-variables derivation, its Neumann/non-homogeneous-BC extensions, and its
  three-misconception registry (birth types adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe, connecting the solution to the heat
  kernel/Green's function, the maximum principle, and the irreversibility (entropy decrease)
  contrasted with the wave equation's time-reversibility.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.de.separation-of-variables-pde`/`math.de.fourier-series`, unlocks none, cross_links none,
  expert/apply, mastery_threshold 0.8, estimated_hours 7) was directly verified against the live
  KG and matches exactly.

## Version History
- 2026-09-19 (Batch 166): authored. First entry this batch. Companion batch concept:
  `math.de.wave-equation`.
