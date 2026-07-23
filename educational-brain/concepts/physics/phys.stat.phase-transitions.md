# Phase Transitions and Landau Mean-Field Theory — `phys.stat.phase-transitions`

## Identity

- **Concept ID**: `phys.stat.phase-transitions` (canonical physics KG)
- **Curriculum location**: physics / statistical mechanics — dependency
  level 15.
- **Prerequisites**: `phys.stat.free-energy` — Landau theory expands the
  free energy in powers of an order parameter, building directly on the
  already-established free-energy framework.
- **Unlocks** (from KG): `phys.stat.ising-model`.
- **Difficulty**: expert · **Bloom**: analyze · **Mastery threshold**: 0.85
  · **Est. hours**: 10

## Learning Objective

The learner can: (1) correctly explain that "first-order" and "second-
order" in the Ehrenfest classification refer to WHICH DERIVATIVE of the
free energy is discontinuous, NOT how many times the transition occurs;
(2) correctly explain that mean-field critical exponents (β=1/2, γ=1,
etc.) are exact only ABOVE the upper critical dimension (d_c=4 for Ising)
— below d_c, fluctuations (ignored by mean-field theory) change the
exponents, so a measured β≈0.5 is NOT automatic confirmation of mean-field
theory without ruling out narrow-fitting-range artifacts.

## Core Understanding

Phase transitions are classified by the continuity of the free energy and
its derivatives; Landau theory constructs F as a polynomial in an order
parameter φ to predict transition type and critical behavior. A first
persistent error interprets "second-order transition" as meaning the
transition physically happens twice — but the Ehrenfest classification
refers to WHICH derivative of Gibbs free energy G is discontinuous:
first-order means the FIRST derivative (entropy S=−∂G/∂T, volume
V=∂G/∂P) is discontinuous (giving latent heat and a density jump, as in
ice→water); second-order (continuous) means first derivatives are
continuous but SECOND derivatives (heat capacity C_P, compressibility
κ_T, susceptibility χ) diverge, with no latent heat, as in a ferromagnet
at its Curie temperature. A second error treats mean-field critical
exponents as universally exact — but mean-field theory (which assumes
every particle sees only the average field, ignoring spatial fluctuations)
is exact only above the upper critical dimension d_c=4 for the Ising
universality class; in 3D, the Ising model's real exponent is β≈0.326, not
the mean-field β=1/2, and in 2D it is β=1/8. A student who measures β≈0.5
in some system has NOT thereby confirmed mean-field theory without ruling
out an incorrect T_c estimate, insufficient resolution near T_c, or
fitting over a temperature range too far from T_c where crossover behavior
dominates — a proper critical-exponent measurement requires fitting only
within the true critical region and checking that multiple exponents
satisfy scaling relations (e.g. α+2β+γ=2).

## Mental Models

**Beginner**: "'Second-order' means the transition happens a second time;
if I measure a critical exponent and it matches the mean-field value,
mean-field theory is confirmed for my system." Upgrade trigger: computing
latent heat and density jump for ice→water (finding S and V genuinely
discontinuous, a FIRST-order transition by the derivative criterion, with
"first"/"second" clearly about derivative order, not repetition count)
directly confronts the "happens twice" misreading; comparing the 2D
Ising exact exponent β=1/8 to the mean-field β=1/2 directly confronts the
exponents-are-universal assumption.

**Intermediate**: "First-order = first derivative of G discontinuous
(latent heat); second-order = second derivatives diverge, first
derivatives continuous; mean-field exponents are only exact above the
upper critical dimension, and any measured exponent needs proper
critical-region fitting and scaling-relation verification before being
called a confirmation." This model correctly captures both points but may
still need to explicitly verify the Ginzburg criterion (mean-field valid
for d>d_c) for an unfamiliar system's dimensionality.

**Advanced**: "Always classify a transition by which specific G-derivative
is discontinuous, never by transition count, and always check the
Ginzburg criterion (system dimension vs. d_c) before trusting a mean-field
critical exponent as exact."

**Expert**: the renormalization-group explanation for why fluctuations
matter below d_c, and the universality-class framework unifying seemingly
different systems (ferromagnets, liquid-gas critical points) under shared
critical exponents — not required for mastery, natural bridge to
`phys.stat.ising-model`.

## Why Students Fail

The dominant failure is misreading "first-order"/"second-order" as a
count of how many times the transition happens, rather than as a
classification of which free-energy derivative is discontinuous; a
closely related failure is treating mean-field critical exponents as
universally exact rather than as an approximation valid only above the
upper critical dimension, leading to premature "confirmation" claims from
a single exponent fit.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.stat.phase-transitions.md`,
C2 Misconception Register) documents two; reused by reference with
birth-type added.

- **MC-PT-FIRST-SECOND-TERMINOLOGY (second-order transition means the
  phase transition happens twice)**: believing the ordinal numbering
  literally counts transition occurrences. **Birth type**: language
  contamination (Type 3) — the everyday meaning of "second" (occurring a
  second time) is mapped onto the Ehrenfest classification's technical
  meaning (which derivative is discontinuous), missing that "order" here
  refers to the order of the discontinuous derivative, not a count of
  events. Probe: "Why is it called 'second order'?"
- **MC-PT-MF-EXACT (mean-field theory gives the exact critical
  exponents)**: believing "β=1/2 is the exact critical exponent for
  magnetization" universally. **Birth type**: instruction-induced (Type
  5) — mean-field theory is often taught first and without immediate
  caveat, leading students to treat its clean, easily-derived exponents
  as universally correct, missing that fluctuations (ignored by mean-
  field) change the exponents below the upper critical dimension. Probe:
  "A student fits m(T) data near T_c to a power law and extracts β=0.5.
  Have they confirmed mean-field theory?"

## Analogies

**Best**: iron losing its magnetism at 770°C (Curie temperature, a
continuous/second-order transition, order parameter shrinking smoothly to
zero) contrasted directly with ice melting at 0°C (a discontinuous/
first-order transition, with latent heat and a density jump) — directly
targets MC-PT-FIRST-SECOND-TERMINOLOGY by anchoring the classification to
concrete, contrasting physical behavior rather than an ordinal count.

**Anti-analogy**: do NOT say "mean-field theory is basically exact, just
with small corrections" — this directly reinforces MC-PT-MF-EXACT; below
the upper critical dimension, the corrections are not small tweaks but a
qualitatively different exponent (e.g. β=0.326 vs. 0.5 in 3D Ising) driven
by genuinely divergent, long-range fluctuations near T_c.

## Demonstrations

Worked-example: derive the mean-field exponent β=1/2 by minimizing
F=aφ²+bφ⁴ with a=a₀(T−T_c), finding m∝(T_c−T)^{1/2} below T_c — grounds
the abstract Ehrenfest classification in an explicit, derivable result.
Worked-example: compare the derived mean-field γ=1 (susceptibility
divergence) directly against the exact 2D Ising γ=7/4 — directly targets
MC-PT-MF-EXACT by making the fluctuation-driven discrepancy concrete and
quantitative.

## Discovery Questions

Discovery-style: "Water freezing at 0°C — is this first- or second-order?
How do you actually tell, rather than guess from the name?" — learner
checks for latent heat (present) and a density jump (present, ice is less
dense than water), concluding first-order by the DERIVATIVE criterion,
directly confronting MC-PT-FIRST-SECOND-TERMINOLOGY by forcing an
evidence-based classification rather than a name-based guess.

## Teaching Sequence

Blueprint's C4 Teaching-Action Sequence cited by reference (7 TAs:
iron/ice motivation → Ehrenfest classification and order-parameter
notation → Landau-minimization derivation of β=1/2 → MC-PT-FIRST-SECOND-
TERMINOLOGY diagnostic via the water-freezing classification exercise →
susceptibility-divergence worked example with 2D-Ising comparison →
pattern drill on first- vs. second-order structure from F's polynomial
form → independent practice). MC-PT-FIRST-SECOND-TERMINOLOGY is addressed
first via the Ehrenfest-classification introduction and diagnostic probe,
before MC-PT-MF-EXACT during the mean-field-vs-exact-exponent comparison.

## Tutor Actions

WORKED-EXAMPLE (β=1/2 derived from Landau free-energy minimization);
WORKED-EXAMPLE (mean-field γ=1 vs. exact 2D Ising γ=7/4 comparison);
THOUGHT-EXPERIMENT (classify water freezing as first- or second-order
using derivative evidence, not the name alone); ANALOGY (iron's Curie
transition vs. ice's melting transition as continuous vs. discontinuous).

## Voice Teaching Notes

Listen for "second-order means it happens twice" or "my exponent matched
mean-field, so mean-field is confirmed" — the two direct misconception
tells. Load-bearing sentence: "the 'order' refers to which derivative of
the free energy jumps, not how many times anything happens; and matching
a mean-field exponent isn't proof — check the dimension against the upper
critical dimension, and check scaling relations, before calling it
confirmed." Channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner interpreting "second-order" as a repetition count signals
MC-PT-FIRST-SECOND-TERMINOLOGY (full repair via the water-freezing
derivative-classification exercise). A learner treating a matched mean-
field exponent as automatic confirmation signals MC-PT-MF-EXACT (full
repair via the Ginzburg-criterion/scaling-relation discussion). Mastery
trigger: correctly classifying a transition via the Ehrenfest derivative
criterion AND correctly deriving mean-field exponents from the Landau
expansion AND correctly identifying when fluctuation corrections apply
(via the Ginzburg criterion) rather than assuming universal mean-field
exactness. Blueprint's C5 Mastery-Probe Set (MP-1 through MP-5) cited for
the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget phase transitions for a second — if I said a
graph has a 'first derivative discontinuity,' does that mean the graph
happens once, or does it describe the SHAPE of the graph at one point?"
(isolating the derivative-order-vs-event-count distinction in the abstract
before reapplying it to the Ehrenfest classification specifically). See
`../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (order = which G-derivative is discontinuous, not an event count;
mean-field exponents exact only above d_c, fluctuations dominate below)
bound to procedure (classifying a transition via latent heat/density-jump
evidence; deriving β, γ from the Landau free-energy expansion; checking
the Ginzburg criterion before trusting an exponent). Interleave with
`phys.stat.free-energy` and, once authored,
`phys.stat.ising-model`/`phys.stat.chemical-potential`.

## Transfer Connections

Near: any phase-transition classification or Landau-expansion critical-
exponent derivation problem. Far: the Ising model (exact low-dimensional
solutions contrasting with mean-field predictions) and renormalization-
group theory (explaining why fluctuations dominate below d_c). Real-world:
ferromagnetism (Curie-point demagnetization) and superfluidity (the
lambda transition in helium-4, a stronger-than-second-order logarithmic
divergence). Expert: the universality-class framework unifying disparate
physical systems under shared critical exponents.

## Cross-Subject Connections

KG `cross_links` lists `phys.stat.ising-model`,
`phys.stat.fluctuations-correlations`, `phys.stat.chemical-potential`
(all physics, not yet authored except chemical-potential, authored this
same wave). A real cross-subject connection exists to chemistry
(solid-liquid-gas phase diagrams, chemical thermodynamics) — recorded
honestly as a Curriculum Feedback item, not fixed (no KG file modified).

## Blueprint References

Blueprint exists (`docs/curriculum/blueprints/phys.stat.phase-
transitions.md`, C0-C9 format). Reuses: C2 Misconception Register and its
C5 Mastery-Probe Set by reference. Not restated: C0 Concept Metadata, C3
full worked-example derivations, C4 full Teaching-Action Sequence detail,
C6 Known Sticking Points, C7 Adaptive-Teaching Rules, C8 Session-Flow
Template.

## Runtime Asset References

No seeded `AssetIdentity` records — checked against `brainSeedAssets.ts`.
None created.

## Curriculum Feedback

A real, if not KG-encoded, cross-subject connection exists to chemistry
(phase diagrams, chemical thermodynamics of phase equilibria) — recorded
honestly, not fixed (no KG or Blueprint file modified).

## Version History

- 2026-07-23 (physics EB Wave 15): initial authoring.
