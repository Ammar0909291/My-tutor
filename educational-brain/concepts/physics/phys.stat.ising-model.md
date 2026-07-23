# Ising Model — `phys.stat.ising-model`

## Identity

- **Concept ID**: `phys.stat.ising-model` (canonical physics KG)
- **Curriculum location**: physics / statistical mechanics — dependency
  level 16.
- **Prerequisites**: `phys.stat.phase-transitions`, `phys.stat.
  fluctuations-correlations` — the Ising model is the concrete, exactly
  solvable (in 1D and 2D) test case for the Landau mean-field framework
  and fluctuation theory already established.
- **Unlocks** (from KG): `phys.stat.phase-transitions-critical-
  phenomena`, `phys.stat.monte-carlo-basics`.
- **Difficulty**: expert · **Bloom**: analyze · **Mastery threshold**: 0.85
  · **Est. hours**: 10

## Learning Objective

The learner can: (1) correctly explain that the 1D Ising model has NO
finite-temperature phase transition — the Peierls argument shows a
domain wall costs only FINITE energy (2J) but gains ENTROPY that grows as
kT ln(N), so entropy always wins at any T>0 for large N, unlike the 2D
case where a domain wall's energy cost grows with system size;
(2) correctly explain that mean-field theory's critical temperature is
NOT merely "approximately right" in low dimensions — for 2D Ising,
mean-field predicts T_c=4J/k while the exact (Onsager) result is
T_c≈2.27J/k, a 76% systematic overestimate, because mean-field ignores
exactly the fluctuations that lower the true transition temperature.

## Core Understanding

The Ising model assigns binary spins σᵢ=±1 to lattice sites with
nearest-neighbor coupling H=−JΣσᵢσⱼ; the 1D model is exactly solvable
(no phase transition), while the 2D model (Onsager, 1944) exhibits a
continuous phase transition at kT_c/J≈2.269. A first persistent error
expects the 1D model to order at low temperature, reasoning "there must
be SOME ordered phase at low enough T" — but the Peierls argument shows
a single domain wall in a 1D chain costs a FIXED energy 2J regardless of
chain length, while the ENTROPY gain from the wall's N possible
positions grows as kT ln(N); the free-energy change ΔF=2J−kT ln(N) is
negative for any T>0 once N is large enough, so domain walls always
proliferate and destroy long-range order — a structural fact about 1D
geometry, not a limitation of the specific model parameters. This
contrasts sharply with 2D, where a domain wall spanning the system costs
energy proportional to its PERIMETER (~L), which overwhelms the entropy
(~L²) at low enough T, allowing genuine order to survive. A second error
treats mean-field theory's predicted T_c as at least roughly correct
even below the upper critical dimension — but for 2D Ising, mean-field
gives T_c^MF=zJ/k=4J/k (z=4 for a square lattice) while the exact
Onsager result is T_c≈2.269J/k, a 76% overestimate; this is not a small
correction but a SYSTEMATIC failure, because mean-field theory
completely ignores the spatial fluctuations that make it EASIER for
thermal agitation to disorder the system than the mean-field's
"average-field" approximation suggests.

## Mental Models

**Beginner**: "Any interacting spin system should order at low enough
temperature, even in 1D; mean-field theory's T_c should be a reasonable
approximation even in low dimensions." Upgrade trigger: applying the
Peierls argument explicitly (computing ΔF=2J−kT ln(N) and finding it
negative for any T>0 as N grows) directly confronts the 1D-must-order
assumption; comparing mean-field T_c=4J/k against Onsager's exact
T_c≈2.27J/k side by side directly confronts the mean-field-is-roughly-
right assumption.

**Intermediate**: "The 1D Ising model's absence of ordering is a
structural, dimension-dependent fact — domain-wall energy stays finite
while entropy grows with system size; mean-field theory's error in 2D is
systematic (~76%), a real quantitative failure from ignoring
fluctuations, not just a rounding difference." This model correctly
captures both points but may still need to explicitly re-derive the
Peierls argument or re-check the specific mean-field-vs-exact comparison
for an unfamiliar lattice geometry (e.g., triangular, z=6) rather than
assuming the square-lattice numbers transfer.

**Advanced**: "Always check whether domain-wall energy scales with
system size (2D+) or stays fixed (1D) before predicting ordering
behavior, and always treat mean-field T_c as a qualitative starting
point only, expecting a large systematic overestimate whenever the
system's dimension is below the upper critical dimension."

**Expert**: the renormalization-group explanation for WHY mean-field
theory becomes exact only above the upper critical dimension (d_c=4 for
Ising), and the exact 2D critical exponents (β=1/8, γ=7/4) as concrete,
historically pivotal confirmations of universality theory — not required
for mastery, natural bridge to `phys.stat.phase-transitions-critical-
phenomena`.

## Why Students Fail

The dominant failure is assuming any interacting spin system must order
at sufficiently low temperature regardless of dimension, missing that 1D
systems have a structurally different domain-wall energy-versus-entropy
balance than 2D+ systems; a closely related failure is treating mean-
field theory's predicted critical temperature as a reasonable
approximation in low dimensions, rather than recognizing it as a
systematic overestimate from ignoring spatial fluctuations.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.stat.ising-model.md`, C2
Misconception Register) documents two; reused by reference with
birth-type added.

- **MC-IS-1D-ORDERS (the 1D Ising model has a ferromagnetic phase
  transition at finite T)**: believing "in 1D there must be an ordered
  phase." **Birth type**: overgeneralization (Type 1) — the intuition
  that sufficiently strong coupling J should eventually produce order at
  low enough T (true in 2D and 3D) is extended uncritically to 1D,
  missing the Peierls argument's structural point that domain-wall
  energy in 1D stays FIXED while entropy grows with system size,
  guaranteeing disorder at any T>0. Probe: "Why is there no phase
  transition in 1D Ising at T>0?"
- **MC-IS-MF-ACCURATE-ANY-D (mean-field theory gives the correct
  critical temperature T_c even if exponents are wrong)**: believing
  "T_c^MF is approximately right even in 2D." **Birth type**:
  instruction-induced (Type 5) — mean-field theory is often introduced
  as a "good first approximation," and this framing is over-applied to
  its quantitative predictions specifically, missing that the SAME
  fluctuations that make mean-field's critical EXPONENTS wrong below the
  upper critical dimension also make its T_c prediction systematically
  too high. Probe: "A student fits m(T) data near T_c to a power law and
  extracts β=0.5. Have they confirmed mean-field theory?"

## Analogies

**Best**: the Ising model as "the hydrogen atom of statistical
mechanics" — simple enough to solve exactly in 2D, yet rich enough to
display phase transitions, universality, and spontaneous symmetry
breaking; every technique tested on more complex models was first
verified here — this framing motivates WHY the exact 1D-vs-2D contrast
(MC-IS-1D-ORDERS) and the mean-field-vs-exact comparison
(MC-IS-MF-ACCURATE-ANY-D) matter: they are the model system where these
general statistical-mechanics lessons are first learned rigorously.

**Anti-analogy**: do NOT say "mean-field theory is basically exact, just
with small corrections" in the context of the Ising model specifically —
this directly reinforces MC-IS-MF-ACCURATE-ANY-D; the 76% T_c
overestimate in 2D is not a small correction, it is a qualitative
failure mode that mean-field theory has by construction whenever spatial
fluctuations matter.

## Demonstrations

Worked-example: apply the Peierls argument explicitly to a 1D chain —
domain-wall energy cost 2J versus entropy gain kT ln(N) from N possible
wall positions, showing ΔF<0 for any T>0 as N→∞ — directly targets
MC-IS-1D-ORDERS. Worked-example: compute mean-field T_c=zJ/k for both a
square lattice (z=4, T_c^MF=4J/k) and compare directly against Onsager's
exact T_c≈2.269J/k (76% overestimate) — directly targets
MC-IS-MF-ACCURATE-ANY-D with a concrete, checkable number.

## Discovery Questions

Discovery-style: "A simulation of the 2D Ising model gives m~(T_c−T)^0.12
near T_c, while mean-field theory predicts β=0.5 and the exact Onsager
result is β=0.125. Is 0.12 a confirmation of mean-field theory, the
exact result, or neither without more information?" — learner discovers
that raw exponent agreement with the EXACT value (not mean-field) is
suggestive but still requires finite-size-scaling analysis before being
called definitive, directly reinforcing MC-IS-MF-ACCURATE-ANY-D by
forcing a careful distinction between the two competing predictions.

## Teaching Sequence

Blueprint's C4 Teaching-Action Sequence cited by reference (7 TAs:
hydrogen-atom-of-statistical-mechanics motivation → Ising Hamiltonian and
spontaneous-symmetry-breaking notation → mean-field self-consistency
derivation → MC-IS-1D-ORDERS diagnostic via the Peierls argument →
Onsager exact-2D-result worked example with mean-field comparison →
graphical self-consistency drill across three temperatures → independent
practice). MC-IS-1D-ORDERS is addressed directly via the Peierls-argument
diagnostic (TA-4), before MC-IS-MF-ACCURATE-ANY-D during the Onsager-
vs-mean-field worked example (TA-5).

## Tutor Actions

WORKED-EXAMPLE (Peierls argument: domain-wall energy vs. entropy in 1D,
ΔF<0 for any T>0); WORKED-EXAMPLE (mean-field T_c=4J/k vs. Onsager exact
T_c≈2.269J/k, 76% overestimate quantified); THOUGHT-EXPERIMENT
(evaluating whether a measured critical exponent β=0.12 confirms mean-
field or the exact result); ANALOGY (Ising model as the "hydrogen atom
of statistical mechanics").

## Voice Teaching Notes

Listen for "1D should still order at low enough T" or "mean-field's T_c
is close enough" — the two direct misconception tells. Load-bearing
sentence: "in 1D, a domain wall costs the same fixed energy no matter how
big the system gets, but the entropy of placing it keeps growing — so
disorder always wins; and mean-field's transition temperature isn't
close in 2D, it's off by three-quarters, because it ignores exactly the
fluctuations that matter." Channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner expecting the 1D Ising model to order at finite T signals
MC-IS-1D-ORDERS (full repair via the explicit Peierls free-energy
calculation). A learner treating mean-field T_c as roughly accurate in
2D signals MC-IS-MF-ACCURATE-ANY-D (full repair via the side-by-side
T_c comparison and the finite-size-scaling discussion). Mastery trigger:
correctly explaining WHY the 1D model has no finite-T phase transition
via the Peierls argument AND correctly quantifying the mean-field-vs-
exact T_c discrepancy AND correctly evaluating whether a measured
critical exponent constitutes confirmation of a specific theory.
Blueprint's C5 Mastery-Probe Set (MP-1 through MP-5) cited for the full
item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget spins for a second — if placing ONE flaw
anywhere along a very long line costs a fixed price, but there are more
and more PLACES to put that flaw as the line gets longer, does the flaw
eventually become 'free' in a thermodynamic sense?" (isolating the fixed-
cost-vs-growing-entropy intuition before reapplying it to 1D domain
walls specifically). See `../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (1D: fixed domain-wall energy loses to growing entropy, no order
at any T>0; 2D+: domain-wall energy grows with system size, order
survives; mean-field T_c is a systematic, large overestimate below the
upper critical dimension) bound to procedure (applying the Peierls
free-energy argument; computing and comparing mean-field vs. exact T_c
values). Interleave with `phys.stat.phase-transitions` and, once
authored, `phys.stat.phase-transitions-critical-phenomena`/`phys.stat.
monte-carlo-basics`.

## Transfer Connections

Near: any 1D-vs-higher-dimensional ordering question, or any mean-field-
vs-exact critical-temperature comparison. Far: critical phenomena and
the renormalization group (explaining precisely why mean-field becomes
exact only above the upper critical dimension) and Monte Carlo
simulation methods (developed and validated first on the Ising model).
Real-world: real ferromagnetic materials' Curie temperatures, understood
via lattice dimensionality and universality-class arguments rooted in
this exact model. Expert: the 2D exact critical exponents (β=1/8,
γ=7/4) as historically pivotal, parameter-free confirmations of scaling
theory.

## Cross-Subject Connections

KG `cross_links` lists `phys.stat.phase-transitions-critical-phenomena`
and `phys.stat.monte-carlo-basics` (both physics, not yet authored). A
real cross-subject connection exists to computer science (the Ising
model is the canonical test case for Monte Carlo/Metropolis algorithms
and simulated annealing) — recorded honestly as a Curriculum Feedback
item, not fixed (no KG file modified).

## Blueprint References

Blueprint exists (`docs/curriculum/blueprints/phys.stat.ising-model.md`,
C0-C9 format). Reuses: C2 Misconception Register and its C5 Mastery-
Probe Set by reference. Not restated: C0 Concept Metadata, C3 full
worked-example derivations (1D partition function, Onsager's exact
result, mean-field self-consistency), C4 full Teaching-Action Sequence
detail, C6 Known Sticking Points, C7 Adaptive-Teaching Rules, C8
Session-Flow Template.

## Runtime Asset References

No seeded `AssetIdentity` records — checked against `brainSeedAssets.ts`.
None created.

## Curriculum Feedback

A real, if not KG-encoded, cross-subject connection exists to computer
science (Monte Carlo/Metropolis simulation methods, first developed and
validated on this exact model) — recorded honestly, not fixed (no KG or
Blueprint file modified).

## Version History

- 2026-07-23 (physics EB Wave 16): initial authoring.
