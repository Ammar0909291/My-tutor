# The Schrödinger Equation — `phys.qm.schrodinger-equation`

## Identity

- **Concept ID**: `phys.qm.schrodinger-equation` (canonical physics KG)
- **Curriculum location**: physics / quantum mechanics — dependency
  level 14.
- **Prerequisites**: `phys.qm.wave-function` — the Schrödinger equation
  is the dynamical law governing the time evolution of the already-secure
  probability-amplitude wave function.
- **Unlocks** (from KG): `phys.qm.harmonic-oscillator-qm`,
  `phys.qm.hydrogen-atom-qm`, `phys.qm.operators`,
  `phys.qm.particle-in-box`, `phys.qm.quantum-tunneling` — a major hub
  concept feeding five downstream quantum-mechanics branches.
- **Difficulty**: expert · **Bloom**: apply · **Mastery threshold**: 0.80
  · **Est. hours**: 10

## Learning Objective

The learner can: (1) correctly explain that the Schrödinger equation does
NOT give the particle's TRAJECTORY (a definite position at each time) —
it governs the evolution of the PROBABILITY AMPLITUDE ψ(x,t), whose
squared modulus |ψ(x,t)|² gives a probability DISTRIBUTION, not a single
predicted position; (2) correctly explain that STATIONARY states do NOT
have zero energy — "stationary" describes the unchanging PROBABILITY
DISTRIBUTION |ψ|² over time, not the absence of energy; even the lowest
(ground) state has a strictly positive energy eigenvalue (zero-point
energy); (3) correctly explain that NOT any function satisfying the
boundary conditions is automatically a valid solution — a valid solution
must simultaneously satisfy the DIFFERENTIAL EQUATION itself, the
boundary conditions, AND normalizability, all three required
simultaneously; (4) correctly explain that a superposition state
ψ=(1/√2)φ₁+(1/√2)φ₂ does NOT have a definite energy equal to the average
(E₁+E₂)/2 — each INDIVIDUAL measurement yields either E₁ or E₂ (never
their average), with the average emerging only as the STATISTICAL MEAN
over many repeated measurements.

## Core Understanding

The Schrödinger equation does NOT give the particle's TRAJECTORY — this
is a natural but incorrect carryover from classical mechanics, where
Newton's equation F=ma directly yields x(t), a definite path. The
Schrödinger equation instead governs the time evolution of the
probability AMPLITUDE ψ(x,t) — the particle's position remains
fundamentally unknowable until measured, and even then only |ψ(x,t)|²
(the probability DENSITY) is directly connected to measurement outcomes,
never a deterministic position path. A second, frequently inverted point:
STATIONARY states do NOT have zero energy — the everyday association of
"stationary" with "motionless" and therefore "no energy" is simply wrong
in this technical context. "Stationary" specifically means the
PROBABILITY DISTRIBUTION |ψ|² does not change in time (∂|ψ|²/∂t=0), which
is entirely compatible with — indeed REQUIRES — a nonzero energy
eigenvalue Eₙ. For a particle in a box, the ground-state energy
E₁=π²ℏ²/(2mL²) is ALWAYS strictly positive — this "zero-point energy" is
experimentally confirmed (liquid helium famously never freezes at
atmospheric pressure because zero-point energy prevents crystallization).
A third point addresses what counts as a genuine solution to the
time-independent Schrödinger equation (TISE): satisfying the BOUNDARY
CONDITIONS ALONE is NOT sufficient — a candidate function must
simultaneously (a) satisfy the differential equation itself, (b) satisfy
the boundary conditions, AND (c) be normalizable; a function like
ψ=x(L−x) for a particle in a box on [0,L] satisfies the boundary
conditions (ψ(0)=ψ(L)=0) but FAILS the differential equation itself
(d²/dx²[x(L−x)]=−2, which is not proportional to x(L−x) for any constant
k², so it cannot equal −k²ψ) — boundary conditions are NECESSARY but
never SUFFICIENT on their own. A fourth point concerns the energy of a
superposition state: for ψ=(1/√2)φ₁+(1/√2)φ₂ (a superposition of two
energy eigenstates), the energy is NOT simply the average (E₁+E₂)/2 as a
single deterministic value — each INDIVIDUAL measurement of energy
yields EITHER E₁ OR E₂ (each with probability 1/2, per the Born rule),
NEVER an intermediate value; the average ⟨E⟩=(E₁+E₂)/2 emerges only as
the STATISTICAL MEAN computed over MANY repeated measurements on
identically-prepared systems, exactly analogous to how a biased coin's
"average outcome" (say, 0.5 heads) is never the result of any single
flip (which is always definitively heads or tails).

## Mental Models

**Beginner**: "Solving the Schrödinger equation tells you where the
particle is at each moment, like Newton's equations; a stationary state
must have zero energy since nothing is 'moving'; any smooth function
satisfying the boundary conditions should work as a solution; a
superposition of two energy states has energy equal to their average."
Upgrade trigger: computing |ψ(x,t)|² for a two-state superposition
(finding it oscillates, clearly a distribution rather than a fixed
point) directly confronts the trajectory assumption; computing the
ground-state energy for a particle in a box explicitly (finding it
strictly positive) directly confronts the zero-energy assumption.

**Intermediate**: "The Schrödinger equation governs probability-amplitude
evolution, not trajectories; stationary describes an unchanging
probability distribution, fully compatible with positive energy;
solutions must satisfy the differential equation itself, not just
boundary conditions; individual energy measurements on a superposition
give E₁ or E₂, never their average." This model correctly captures all
four results, but sometimes still needs to explicitly verify a candidate
function against the differential equation (not just boundary
conditions) when working an unfamiliar system.

**Advanced**: "Always distinguish |ψ|² (a probability distribution) from
a classical trajectory when interpreting the Schrödinger equation's
solutions; always verify BOTH the differential equation and boundary
conditions (and normalizability) before accepting a candidate wave
function as a valid solution."

**Expert**: the full operator formalism (the Hamiltonian operator Ĥ, the
time-dependent Schrödinger equation iℏ∂ψ/∂t=Ĥψ as an eigenvalue problem
for stationary states, and the general superposition-state time
evolution ψ(t)=Σcₙe^(−iEₙt/ℏ)φₙ) — a natural consolidation directly
connecting to the KG unlocks `phys.qm.operators`,
`phys.qm.particle-in-box`, `phys.qm.harmonic-oscillator-qm`,
`phys.qm.hydrogen-atom-qm`, and `phys.qm.quantum-tunneling`, not
required for mastery.

## Why Students Fail

The dominant failure is expecting the Schrödinger equation to yield a
classical trajectory rather than a probability-amplitude evolution;
closely related failures include assuming "stationary" implies zero
energy, accepting boundary-condition-satisfying functions as solutions
without verifying the differential equation itself, and averaging
energies for a superposition state rather than recognizing each
individual measurement yields one definite eigenvalue.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.qm.schrodinger-equation.md`,
Misconception Engine) documents four; reused by reference with birth-type
added.

- **MC-1 (the Schrödinger equation gives the trajectory of the
  particle)**: believing "after solving Schrödinger's equation, I know
  where the particle is at each time." **Birth type**: overgeneralization
  (Type 1) — the classical-mechanics habit of equations of motion
  yielding x(t) is incorrectly extended to quantum mechanics, missing
  that ψ(x,t) governs probability amplitude, not position directly.
  Probe: "What does solving the Schrödinger equation tell you about
  where the particle will be next?"
- **MC-2 (stationary states have zero energy)**: believing "if nothing
  changes in time, the energy must be zero." **Birth type**: language
  contamination (Type 3) — the everyday meaning of "stationary" (not
  moving, implying no energy) is incorrectly mapped onto its technical
  meaning (an unchanging probability distribution), missing that
  stationary states have a definite, generally nonzero energy
  eigenvalue. Probe: "The ground-state wave function of a particle in a
  box is constant in time. Does that mean E₁=0?"
- **MC-3 (any function can be a solution)**: believing "I'll just pick a
  smooth function that satisfies the boundary conditions," treating
  boundary conditions as sufficient. **Birth type**: instruction-induced
  (Type 5) — boundary conditions are emphasized heavily in introductory
  treatments, leading students to forget the equally necessary
  requirement that the function itself satisfy the differential
  equation. Probe: "If I write ψ=x(L−x) for a particle in [0,L], is this
  a solution to the TISE?"
- **MC-4 (the superposition state has definite energy (E₁+E₂)/2)**:
  believing "it's a mixture of E₁ and E₂, so the energy is
  (E₁+E₂)/2" as a single deterministic value. **Birth type**:
  overgeneralization (Type 1) — averaging is applied to individual
  measurement outcomes rather than correctly reserving the average for
  the statistical mean over many measurements, missing the Born rule's
  probabilistic, all-or-nothing outcome structure. Probe: "A particle is
  in state ψ=(1/√2)φ₁+(1/√2)φ₂. What energy will you measure in a single
  trial?"

## Analogies

**Best**: a biased coin, where each individual flip yields either heads
or tails (never "half heads"), but the AVERAGE outcome over many flips
approaches the coin's bias — directly targets MC-4 by giving a concrete,
familiar image of individual all-or-nothing outcomes versus a
statistical mean.

**Anti-analogy**: do NOT say "the Schrödinger equation is quantum
mechanics's version of Newton's equation, giving you the particle's
path" — this directly installs MC-1 by implying a deterministic
trajectory output, rather than a probability-amplitude evolution.

## Demonstrations

Worked-example: compute |ψ(x,t)|² for a two-state superposition
explicitly, showing it oscillates in time — directly targets MC-1.
Worked-example: compute the ground-state energy E₁=π²ℏ²/(2mL²) for an
electron in a 1 nm box numerically (≈0.376 eV, clearly nonzero) —
directly targets MC-2.

## Discovery Questions

Discovery-style: "if ψ=x(L−x) satisfies the boundary conditions ψ(0)=
ψ(L)=0, does that guarantee it satisfies the actual Schrödinger
equation?" — learner computes d²/dx²[x(L−x)] explicitly and finds it
fails, directly confronting MC-3.

## Teaching Sequence

Blueprint's assessment component cited by reference. MC-1 is addressed
first (establishing the amplitude-vs-trajectory distinction), before
MC-2 (stationary ≠ zero energy), before MC-3 (boundary conditions alone
are insufficient), before MC-4 (individual measurement vs. statistical
average) — this order builds from the most foundational reframing of
what the equation describes to progressively more specific technical
and interpretive subtleties.

## Tutor Actions

WORKED-EXAMPLE (|ψ(x,t)|² computed for a two-state superposition,
showing oscillation); WORKED-EXAMPLE (ground-state energy computed
numerically for an electron in a 1 nm box); THOUGHT-EXPERIMENT
(verifying ψ=x(L−x) against the differential equation); ANALOGY (biased
coin's individual outcomes vs. statistical average).

## Voice Teaching Notes

Listen for "the equation tells you where the particle is" or "stationary
means zero energy" or accepting boundary-condition-only solutions, or
"the energy is the average of E₁ and E₂" — the four direct misconception
tells. Load-bearing sentence: "it tells you the ODDS of where the
particle is, not its path — and a stationary state can absolutely have
positive energy; and each single measurement gives you one energy value,
never the average." Channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner expecting a trajectory from the Schrödinger equation signals
MC-1 (MISCONCEIVING, full repair via the oscillating-|ψ|² worked
example). A learner assuming stationary states have zero energy signals
MC-2 (full repair via the ground-state-energy worked example). A learner
accepting a boundary-condition-only function as a solution signals MC-3
(full repair via the differential-equation-verification discovery
question). A learner averaging energies for a superposition signals
MC-4. Mastery trigger: correctly distinguishing amplitude evolution from
trajectory, AND correctly identifying nonzero stationary-state energies,
AND correctly verifying full solutions (equation + boundary conditions +
normalizability), AND correctly applying the Born rule to superposition
measurements. Blueprint's assessment component cited for the full item
bank.

## Tutor Recovery Strategy

Shrink-to question: "forget the wave function for a second — if you flip
a biased coin once, do you get 'half heads,' or definitely heads or
definitely tails?" (isolating the individual-vs-average distinction
before applying it to energy measurements). See
`../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (amplitude evolution, not trajectory; stationary ≠ zero energy;
equation + boundary conditions + normalizability all required;
individual measurement vs. statistical average) bound to procedure
(solving the TISE and verifying candidate solutions). Interleave with
`phys.qm.wave-function` and, once authored, `phys.qm.particle-in-box`/
`phys.qm.operators`.

## Transfer Connections

Near: any TISE-solving or stationary-state-energy problem. Far: quantum
chemistry (molecular orbital theory built directly on Schrödinger-
equation solutions) and quantum computing (superposition states and
measurement statistics directly generalizing this concept's Born-rule
reasoning). Real-world: understanding why liquid helium never fully
solidifies at standard pressure, a direct experimental confirmation of
zero-point energy. Expert: the full operator formalism and its
application to the harmonic oscillator, hydrogen atom, and quantum
tunneling.

## Cross-Subject Connections

KG `cross_links` empty. A real cross-subject connection exists to
chemistry (quantum chemistry, molecular orbital theory) — recorded
honestly as a Curriculum Feedback item, not fixed (no KG file modified).

## Blueprint References

Blueprint exists (Component-format). Reuses: Misconception Engine and its
assessment component by reference. Not restated: Concept Identity &
Metadata, Concept Explanation Multi-Tier, Worked Examples, Lesson
Composition Grammar, Retrieval Spacing Schedule, Prerequisite & Unlock
Map, Validation Checklist.

## Runtime Asset References

No seeded `AssetIdentity` records — checked against `brainSeedAssets.ts`.
None created.

## Curriculum Feedback

A real, if not KG-encoded, cross-subject connection exists to chemistry
(quantum chemistry) — recorded honestly, not fixed (no KG or Blueprint
file modified).

## Version History

- 2026-07-23 (physics EB Wave 14): initial authoring.
