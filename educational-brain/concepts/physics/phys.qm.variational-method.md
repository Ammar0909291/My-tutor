# Variational Method — `phys.qm.variational-method`

## Identity

- **Concept ID**: `phys.qm.variational-method` (canonical physics KG)
- **Curriculum location**: physics / quantum mechanics — dependency
  level 18.
- **Prerequisites**: `phys.qm.hydrogen-atom-qm` (a known exact solution to
  check trial functions against), `phys.qm.perturbation-theory` (the
  other systematic approximation method, contrasted throughout).
- **Unlocks** (from KG): `phys.qm.wkb-approximation`.
- **Difficulty**: expert · **Bloom**: apply · **Mastery threshold**: 0.85
  · **Est. hours**: 8

## Learning Objective

The learner can: (1) correctly explain that the variational theorem
E[ψ] ≥ E₀ is an absolute guarantee for ANY normalized trial state, so a
computed energy below the true ground-state energy always signals an
arithmetic error, never a better answer; (2) correctly distinguish
accuracy of the trial WAVEFUNCTION from accuracy of the resulting
ENERGY — a trial function that looks visually similar to the true ground
state can still give an energy far from E₀ if it has the wrong symmetry
or node structure, and conversely a crude-looking trial function can give
a very tight energy bound; (3) correctly explain that the simple
Rayleigh-Ritz bound applies ONLY to the ground state — using the same
unconstrained minimization for an excited state always collapses toward
E₀, unless orthogonality to all lower states is explicitly imposed.

## Core Understanding

The variational method estimates the ground-state energy without solving
the Schrödinger equation exactly, by minimizing the Rayleigh quotient
E[ψ]=⟨ψ|H|ψ⟩/⟨ψ|ψ⟩ over a family of trial wavefunctions with adjustable
parameters. The variational theorem proves E[ψ]≥E₀ for any normalized
trial state, with equality if and only if ψ is the exact ground state —
so every result is an upper bound, never an underestimate. A first
persistent error assumes a trial function that "looks like" the true
ground state must give an accurate energy — but accuracy of shape and
accuracy of energy are separate questions: a trial function with wrong
symmetry or missing curvature can give E_trial far above E₀ despite
visual similarity, since the Rayleigh quotient is sensitive to how well
the trial function matches the true kinetic and potential energy
distributions, not just its overall silhouette. A second error
over-extends the method to excited states directly — but the bound
E[ψ]≥E₀ says nothing about E₁ unless the trial function is explicitly
constrained orthogonal to the true ground state; without that
constraint, unconstrained minimization always drifts back toward E₀,
since E₀ is the global minimum of the Rayleigh quotient over all states.

## Mental Models

**Beginner**: "A good-looking trial wavefunction gives a good energy
estimate; the variational method works for any energy level the same
way; getting a lower number always means I'm doing better." Upgrade
trigger: computing E_trial for a badly-normalized or wrong-symmetry trial
function that looks reasonable but gives a poor bound directly confronts
the shape-versus-energy conflation; attempting the same minimization for
an excited state and watching it collapse to E₀ directly confronts the
excited-state overextension.

**Intermediate**: "E[ψ]≥E₀ always, for any normalized trial state;
tightness of the bound depends on how well ψ matches the TRUE
wavefunction's kinetic and potential energy balance, not its rough shape;
excited-state bounds require an explicit orthogonality constraint." This
model correctly captures the theorem's scope but may still need to work
through the linear variational method's secular equation for multi-basis
trial functions.

**Advanced**: always check dE/dα=0 gives a minimum (not saddle), always
verify normalization before comparing E_trial across different trial
families, and always state orthogonality constraints explicitly before
claiming an excited-state bound.

**Expert**: the connection to the linear variational method as a
finite-basis diagonalization (the secular equation IS an eigenvalue
problem, and adding basis functions can only lower the ground-state
bound further, never raise it) and the WKB approximation as a
complementary semiclassical method for slowly-varying potentials — not
required for mastery, natural bridge to `phys.qm.wkb-approximation`.

## Why Students Fail

The dominant failure is assuming a visually plausible trial wavefunction
automatically yields an accurate energy, missing that the Rayleigh
quotient's sensitivity to kinetic and potential energy balance is
independent of superficial shape; a closely related failure is forgetting
to divide by ⟨ψ|ψ⟩ when the trial function is not normalized, silently
corrupting the energy estimate; a third failure applies the ground-state
variational bound to excited states without imposing the required
orthogonality constraint, producing a nonsensical result below the true
excited-state energy.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.qm.variational-method.md`,
C2 Misconception Register) documents two; reused by reference with
birth-type added.

- **MC-VAR-EXACT (a close-looking trial function gives an accurate
  energy)**: believing "I got a good wavefunction so my energy is
  accurate." **Birth type**: perceptual intuition (Type 2) — visual or
  qualitative similarity between trial and true wavefunctions feels like
  it should transfer directly to energy accuracy, missing that the
  variational theorem only bounds E[ψ] from above and says nothing about
  HOW close a merely similar-looking ψ brings that bound. Probe: "A
  trial ψ matches the true ψ₀ in shape but misses a node — how does
  E_trial compare to E₀?"
- **MC-VAR-ANY-STATE (variational method finds excited states the same
  way)**: believing "minimize with a different trial function to get
  E₁." **Birth type**: overgeneralization (Type 1) — the ground-state
  bound is extended without modification to excited states, missing that
  the theorem's guarantee E[ψ]≥E₀ is specifically about the GLOBAL
  minimum of the Rayleigh quotient, which any unconstrained trial family
  will always find first. Probe: "A student minimizes E[ψ_α] over α for
  an excited-state trial function and gets a value below E₁ — what went
  wrong?"

## Analogies

**Best**: bidding at an auction where you know the true price is at most
X — you adjust your bid (trial function) to get as close to X from above
as possible, and no matter how you bid, you can never go below the true
price; directly targets the "upper bound, never below" guarantee at the
heart of the variational theorem.

**Anti-analogy**: do NOT say "a closer-looking trial function always
gives a better bound" without immediately qualifying "closer in the
Rayleigh-quotient sense, not visual similarity" — this vague framing
directly feeds MC-VAR-EXACT; always pair any trial-function comparison
with an explicit energy computation, not a visual inspection.

## Demonstrations

Worked-example: Gaussian trial function for the hydrogen atom
(ψ_α=(2α/π)^(3/4)e^(−αr²)) — compute ⟨T⟩=3ℏ²α/(2m) and
⟨V⟩=−e²√(8α/π)/(4πε₀), minimize over α, and compare E_min≈−11.5 eV to
the true E₁=−13.6 eV — directly targets MC-VAR-EXACT by making concrete
that even a well-chosen, smooth, physically reasonable trial function
gives an energy visibly above the exact value, quantifying "upper bound"
numerically. Worked-example: linear harmonic oscillator ground-state
check using the exact Gaussian as trial function, showing E_trial=ℏω/2
exactly matches E₀ — demonstrating the bound is TIGHT precisely when the
trial function IS the true eigenstate, closing the loop on what "close"
actually means.

## Discovery Questions

Discovery-style: "Minimize E[ψ_α] over α for a trial function with one
node (an excited-state-shaped guess), without imposing any orthogonality
constraint to the ground state. What value do you get, and how does it
compare to E₁?" — learner discovers the minimization collapses toward
E₀, directly confronting MC-VAR-ANY-STATE by making the ground-state-only
scope of the simple theorem a discovered fact rather than an asserted
rule.

## Teaching Sequence

Blueprint's C4 Teaching-Action Sequence cited by reference (7 actions,
session_cap 7: auction hook and Rayleigh quotient notation → proof that
E[ψ]≥E₀ from expanding ψ in true eigenstates → MC-VAR-EXACT diagnostic →
hydrogen Gaussian worked example → linear variational method pattern
drill → independent practice). MC-VAR-EXACT is addressed during the
proof-plus-diagnostic core, before MC-VAR-ANY-STATE is addressed via the
linear variational method drill, where the excited-state overextension
becomes concrete.

## Tutor Actions

WORKED-EXAMPLE (Gaussian trial function for hydrogen: compute ⟨T⟩, ⟨V⟩,
minimize, compare to exact E₁); WORKED-EXAMPLE (harmonic oscillator exact
trial function showing the bound is tight when ψ=ψ₀ exactly);
DERIVATION (proof of E[ψ]≥E₀ by expanding an arbitrary trial state in the
true eigenbasis); ANALOGY (auction bidding with a known upper price
bound).

## Voice Teaching Notes

Listen for "this wavefunction looks right so the energy should be
accurate" or "I'll minimize again to find the next energy level" — the
two direct misconception tells. Load-bearing sentence: "the variational
theorem guarantees your energy is never below the true ground state, no
matter what trial function you pick — but a good-looking guess and an
accurate energy are two different questions, and the simple bound only
ever targets the ground state unless you explicitly force your trial
function to avoid it." Channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner claiming a visually similar trial function must give an
accurate energy signals MC-VAR-EXACT (full repair via the hydrogen
Gaussian worked example's explicit ~15% energy gap despite a smooth,
reasonable-looking trial function). A learner attempting unconstrained
minimization for an excited state signals MC-VAR-ANY-STATE (full repair
via the discovery question showing collapse to E₀). Mastery trigger:
correctly deriving E[ψ]≥E₀, correctly computing and minimizing a
Rayleigh quotient for a concrete trial family, and correctly explaining
why excited-state bounds require an orthogonality constraint. Blueprint's
C5 Mastery-Probe Set (MP-1 through MP-5) cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "if I hand you any normalized function and tell you
its Rayleigh quotient can never fall below one fixed number, what does
that tell you about a computed value that comes out BELOW that number?"
(isolating the absolute-guarantee structure of the theorem before
reapplying it to trial-wavefunction energy comparisons specifically). See
`../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (E[ψ]≥E₀ always; bound tightness tracks Rayleigh-quotient
accuracy, not visual similarity; ground-state-only scope without
orthogonality constraints) bound to procedure (computing ⟨T⟩ and ⟨V⟩ for
a trial function, minimizing over free parameters, checking normalization
before comparing). Interleave with `phys.qm.hydrogen-atom-qm`,
`phys.qm.perturbation-theory`, and `phys.qm.wkb-approximation`.

## Transfer Connections

Near: estimating ground-state energies for any potential lacking an
exact solution (anharmonic oscillators, molecular bonding potentials).
Far: quantum chemistry's Hartree-Fock method (a systematic linear
variational method over molecular orbitals) and lattice quantum
chromodynamics' use of variational trial states for hadron masses.
Real-world: any optimization problem structured as "find the parameter
that minimizes a cost function subject to a provable lower bound" shares
the same logical structure. Expert: the linear variational method as
finite-basis diagonalization, directly connecting to the secular
equation formalism used throughout quantum chemistry and solid-state
physics.

## Cross-Subject Connections

KG `cross_links` empty. No cross-subject connection currently identified
beyond the general optimization-with-a-provable-bound pattern, which
recurs in applied mathematics but is not a KG-registered link — recorded
honestly as a null finding, not fixed (no KG file modified).

## Blueprint References

Blueprint exists (`docs/curriculum/blueprints/phys.qm.variational-
method.md`, Component-format). Reuses: C2 Misconception Register by
reference. Not restated: C0 Concept Metadata, C3 full worked-example
derivations (linear variational method secular equation, harmonic
oscillator full algebra), C5 full Mastery-Probe text, C6 Known Sticking
Points, C7 Adaptive-Teaching Rules, C8 Session-Flow Template, C9 V-Check
Trace.

## Runtime Asset References

No seeded `AssetIdentity` records — checked against `brainSeedAssets.ts`.
None created.

## Curriculum Feedback

No open issues found this batch — prerequisites, unlocks, and difficulty
calibration are internally consistent with this concept's role as the
Rayleigh-Ritz half of the two systematic approximation methods (alongside
perturbation theory) in the quantum mechanics domain.

## Version History

- 2026-07-23 (physics EB Wave 18): initial authoring.
