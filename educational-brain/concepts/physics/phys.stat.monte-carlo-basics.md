# Monte Carlo Methods (Basics) — `phys.stat.monte-carlo-basics`

## Identity

- **Concept ID**: `phys.stat.monte-carlo-basics` (canonical physics KG)
- **Curriculum location**: physics / statistical mechanics — dependency
  level 17.
- **Prerequisites**: `phys.stat.ising-model` — Monte Carlo methods are
  taught concretely as the numerical engine for simulating the Ising
  model already established.
- **Unlocks** (from KG): none — leaf node (cross-linked to `phys.stat.
  phase-transitions-critical-phenomena`, `phys.stat.fluctuations-
  correlations`).
- **Difficulty**: expert · **Bloom**: apply · **Mastery threshold**: 0.85
  · **Est. hours**: 8

## Learning Objective

The learner can: (1) correctly explain that Monte Carlo simulation is
NOT unbiased random sampling — the Metropolis algorithm deliberately
BIASES sampling toward low-energy configurations (proportional to the
Boltzmann weight e^{−βE}), since uniform random sampling would be
catastrophically inefficient for any large system; (2) correctly explain
that detailed balance is NOT an optional technical nicety — it is
NECESSARY for the Markov chain to converge to the correct equilibrium
distribution P_i∝e^{−βEᵢ}; an acceptance rule violating detailed balance
can converge to an entirely WRONG stationary distribution, not merely a
slower-converging correct one.

## Core Understanding

Monte Carlo simulation generates samples from a statistical ensemble
using the Metropolis algorithm — an importance-sampling Markov chain
satisfying detailed balance — enabling computation of thermal averages
where exact partition functions are intractable. A first persistent
error assumes that because Monte Carlo sampling is "random," it must
sample all configurations with equal (unbiased) probability — but
Metropolis importance sampling is DELIBERATELY biased toward low-energy
states via the Boltzmann weight; for a large system, the overwhelming
majority of configurations have near-zero statistical weight, so uniform
random sampling would waste nearly all computational effort on
irrelevant states — importance sampling generates configurations with
probability proportional to e^{−βE}/Z specifically, never uniformly. A
second error treats detailed balance (W_{ij}P_j=W_{ji}P_i at
equilibrium) as a mere technical formality, assuming "any acceptance
rule works as long as the simulation runs long enough" — but detailed
balance is a NECESSARY condition for the Markov chain to converge to the
CORRECT equilibrium distribution P_i∝e^{−βEᵢ}; violating it does not
merely slow convergence, it can cause convergence to an entirely WRONG
stationary distribution (e.g., always accepting every proposed move,
A=1, converges instead to the UNIFORM distribution over all
configurations — correct only for infinite temperature, wrong for any
finite T). The Metropolis rule A=min(1,e^{−βΔE}) is one specific,
verifiable choice that satisfies detailed balance.

## Mental Models

**Beginner**: "Monte Carlo is random, so it samples everything equally;
as long as the simulation runs long enough, any acceptance rule
eventually converges correctly." Upgrade trigger: computing the
resulting distribution if all moves are accepted (A=1 always) and
finding it converges to the UNIFORM distribution rather than the
Boltzmann distribution directly confronts both misconceptions
simultaneously — showing that (a) unbiased sampling is not what
Metropolis does, and (b) an acceptance rule violating detailed balance
converges to the WRONG answer, not just slowly.

**Intermediate**: "Metropolis sampling is deliberately biased toward low
energy via the Boltzmann weight, essential for efficiency; detailed
balance is a necessary mathematical condition for converging to the
CORRECT distribution, not an optional refinement." This model correctly
captures both points but may still need to explicitly verify detailed
balance for an unfamiliar proposed acceptance rule rather than assuming
any reasonable-seeming rule will work.

**Advanced**: "Always verify a proposed Monte Carlo acceptance rule
satisfies detailed balance algebraically before trusting it to converge
to the correct equilibrium distribution, and always recognize importance
sampling as intentional bias toward the physically relevant
(Boltzmann-weighted) configurations, not an approximation to uniform
sampling."

**Expert**: the full treatment of autocorrelation time and critical
slowing down (τ~L^z near T_c, motivating cluster algorithms like Wolff
and Swendsen-Wang that achieve τ~1 by flipping correlated clusters) and
the subtlety of measuring spontaneous magnetization below T_c (where a
local Markov chain gets trapped in one broken-symmetry sector,
requiring |m| rather than signed ⟨m⟩) — not required for mastery,
natural bridge to production-scale simulation methodology.

## Why Students Fail

The dominant failure is assuming Monte Carlo's randomness implies
unbiased, uniform sampling rather than deliberately Boltzmann-weighted
importance sampling; a closely related failure is treating detailed
balance as an optional refinement rather than a mathematically necessary
condition, missing that violating it can cause convergence to an
entirely incorrect stationary distribution rather than merely slower
convergence to the correct one.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.stat.monte-carlo-basics.md`,
C2 Misconception Register) documents two; reused by reference with
birth-type added.

- **MC-MC-RANDOM-MEANS-CORRECT (Monte Carlo is random so it must sample
  all configurations equally)**: believing "it's random, so it's
  unbiased." **Birth type**: language contamination (Type 3) — the
  everyday association of "random" with "unbiased/uniform" is mapped
  onto Metropolis sampling, missing that the algorithm deliberately
  weights toward low-energy configurations via the Boltzmann factor,
  since uniform sampling would be catastrophically inefficient for any
  large system. Probe: "A student accepts all proposed moves (A=1
  always). What distribution does this converge to?"
- **MC-MC-DETAILED-BALANCE-OPTIONAL (detailed balance is a technical
  condition — you just need to reach equilibrium eventually)**:
  believing "as long as the simulation runs long enough, any acceptance
  rule works." **Birth type**: overgeneralization (Type 1) — the
  general intuition that "given enough time, any reasonable process
  settles down" is applied without checking the specific mathematical
  requirement, missing that detailed balance is NECESSARY for
  convergence to the CORRECT distribution P_i∝e^{−βEᵢ}, not merely a
  convenience for faster convergence. Probe: "Does the Metropolis
  acceptance rule need to satisfy any particular mathematical
  condition, or does any reasonable rule eventually work?"

## Analogies

**Best**: the impossible-to-sum partition function reframed as a
sampling problem — Z=Σ_states e^{−βE} has 2^{10000} terms for a modest
100×100 Ising lattice, impossible to sum exactly; instead of summing all
terms, Metropolis GENERATES states with probability proportional to
e^{−βE} and simply counts — transforming an impossible sum into a
manageable average — directly targets MC-MC-RANDOM-MEANS-CORRECT by
making explicit that the "random" generation process is engineered
specifically to match the Boltzmann weighting, not to sample uniformly.

**Anti-analogy**: do NOT say "just accept moves randomly and it'll
average out correctly" — this directly installs both misconceptions;
"randomly" without the Boltzmann-weighted acceptance criterion (and
without detailed balance built in) converges to the wrong (uniform)
distribution, not the correct one, no matter how long the simulation
runs.

## Demonstrations

Worked-example: verify the Metropolis acceptance rule A=min(1,e^{−βΔE})
satisfies detailed balance algebraically — writing both sides of
P_eq(i)T(i→j)A(i→j)=P_eq(j)T(j→i)A(j→i) for the ΔE>0 and ΔE<0 cases and
confirming exact cancellation — directly targets MC-MC-DETAILED-BALANCE-
OPTIONAL by making the necessity of the specific rule rigorous rather
than assumed. Worked-example: compute the effective number of
independent samples N_eff=N/(2τ) for a simulation with autocorrelation
time τ=200 sweeps over N=10⁶ total sweeps, showing the naive 1/√N error
estimate underestimates the true statistical error by a factor of ~20 —
grounds the practical consequence of correlated sampling.

## Discovery Questions

Discovery-style: "If a student sets the acceptance probability to
A=1 always (accept every proposed move, never reject), what stationary
distribution does the resulting Markov chain converge to? Is it the
Boltzmann distribution?" — learner discovers analytically that A=1
always converges to the UNIFORM distribution (correct only for T=∞),
directly confronting MC-MC-RANDOM-MEANS-CORRECT by showing that
"accepting everything" is not more random or more correct, it is simply
wrong for any finite temperature.

## Teaching Sequence

Blueprint's C4 Teaching-Action Sequence cited by reference (7 TAs:
impossible-partition-function-sum concrete hook → Markov chain/
detailed-balance notation → Metropolis detailed-balance proof →
MC-MC-RANDOM-MEANS-CORRECT diagnostic (A=1 always) → thermalization/
autocorrelation worked example → manual Metropolis-step pattern drill →
independent practice). MC-MC-RANDOM-MEANS-CORRECT is addressed directly
via the A=1-always diagnostic (TA-4), before MC-MC-DETAILED-BALANCE-
OPTIONAL during the detailed-balance proof (TA-3).

## Tutor Actions

WORKED-EXAMPLE (detailed balance verified algebraically for the
Metropolis rule); WORKED-EXAMPLE (effective sample count N_eff=N/2τ
computed, showing naive error estimates underestimate true error);
THOUGHT-EXPERIMENT (A=1-always converges to the uniform, not Boltzmann,
distribution); ANALOGY (transforming an impossible 2^{10000}-term sum
into a manageable importance-sampled average).

## Voice Teaching Notes

Listen for "Monte Carlo is random so it's unbiased" or "any acceptance
rule works if you run long enough" — the two direct misconception
tells. Load-bearing sentence: "Monte Carlo is deliberately biased toward
low-energy states — that's the whole point, since uniform sampling
would waste nearly all your effort; and detailed balance isn't optional,
break it and you converge to the WRONG answer, not just a slower right
one." Channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner assuming Monte Carlo samples uniformly signals MC-MC-RANDOM-
MEANS-CORRECT (full repair via the A=1-always uniform-distribution
demonstration). A learner treating detailed balance as optional signals
MC-MC-DETAILED-BALANCE-OPTIONAL (full repair via the algebraic detailed-
balance verification). Mastery trigger: correctly stating the Metropolis
acceptance criterion and the detailed-balance condition it satisfies AND
correctly computing statistical errors accounting for autocorrelation
time AND correctly diagnosing common simulation pitfalls (insufficient
thermalization, below-T_c symmetry-breaking trapping). Blueprint's C5
Mastery-Probe Set (MP-1 through MP-5) cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget Monte Carlo for a second — if I told you to
'randomly' sample from a bag where 99.999% of the marbles are one color
and 0.001% are another, would picking marbles 'at random' from the WHOLE
bag efficiently show you anything interesting about the rare color? Or
would you want to deliberately bias your search toward the rare
marbles?" (isolating the importance-sampling-beats-uniform-sampling
intuition before reapplying it to Boltzmann-weighted configurations
specifically). See `../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (Metropolis sampling is deliberately Boltzmann-biased, not
uniform; detailed balance is necessary for correct convergence, not
optional) bound to procedure (verifying detailed balance algebraically
for a proposed rule; computing autocorrelation-corrected statistical
errors; running manual Metropolis steps for small systems). Interleave
with `phys.stat.ising-model` and, once authored, `phys.stat.phase-
transitions-critical-phenomena`/`phys.stat.fluctuations-correlations`.

## Transfer Connections

Near: any Metropolis-algorithm simulation, detailed-balance
verification, or autocorrelation-error-estimation problem. Far: finite-
size scaling and critical-exponent extraction (Monte Carlo is the
practical numerical engine making critical-phenomena predictions
testable) and cluster algorithms (Wolff, Swendsen-Wang, developed
specifically to overcome critical slowing down near T_c). Real-world:
computational materials science and molecular dynamics broadly rely on
the same importance-sampling and detailed-balance principles. Expert:
parallel tempering and histogram reweighting techniques for efficient
sampling near phase transitions.

## Cross-Subject Connections

KG `cross_links` lists `phys.stat.phase-transitions-critical-phenomena`
(authored in this same wave) and `phys.stat.fluctuations-correlations`
(already authored). A real cross-subject connection exists to computer
science (Markov chain Monte Carlo is a foundational algorithm in
computational statistics and machine learning, e.g. Bayesian inference)
— recorded honestly as a Curriculum Feedback item, not fixed (no KG
file modified).

## Blueprint References

Blueprint exists (`docs/curriculum/blueprints/phys.stat.monte-carlo-
basics.md`, C0-C9 format). Reuses: C2 Misconception Register and its C5
Mastery-Probe Set by reference. Not restated: C0 Concept Metadata, C3
full worked-example derivations, C4 full Teaching-Action Sequence
detail, C6 Known Sticking Points, C7 Adaptive-Teaching Rules, C8
Session-Flow Template.

## Runtime Asset References

No seeded `AssetIdentity` records — checked against `brainSeedAssets.ts`.
None created.

## Curriculum Feedback

A real, if not KG-encoded, cross-subject connection exists to computer
science (Markov chain Monte Carlo as a foundational algorithm in
computational statistics/machine learning) — recorded honestly, not
fixed (no KG or Blueprint file modified).

## Version History

- 2026-07-23 (physics EB Wave 17): initial authoring.
