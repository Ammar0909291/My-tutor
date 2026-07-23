# WKB Approximation (Semiclassical Limit) — `phys.qm.wkb-approximation`

## Identity

- **Concept ID**: `phys.qm.wkb-approximation` (canonical physics KG)
- **Curriculum location**: physics / quantum mechanics — dependency
  level 19.
- **Prerequisites**: `phys.qm.quantum-tunneling` (the concrete
  constant-barrier tunneling result this generalizes), `phys.qm.
  variational-method` (the other systematic approximation method,
  cross-referenced throughout).
- **Unlocks** (from KG): none — leaf node.
- **Difficulty**: expert · **Bloom**: apply · **Mastery threshold**: 0.85
  · **Est. hours**: 8

## Learning Objective

The learner can: (1) correctly explain that WKB validity requires the
potential to vary slowly on the scale of the local de Broglie
wavelength (|dλ/dx|≪1) — a geometric condition about how fast the
potential changes, not a statement about ℏ being small; (2) correctly
compute the WKB tunneling exponent for a spatially varying barrier as
the full integral −2∫|p(x)|dx/ℏ across the classically forbidden region,
never reducing it to the constant-barrier formula −2κa unless the
barrier is genuinely constant; (3) correctly explain that WKB's apparent
divergence at classical turning points (1/√p→∞ as p→0) is a breakdown of
the approximation, not a physical divergence, and is patched by
connection formulas derived from the Airy equation.

## Core Understanding

The WKB approximation constructs approximate wavefunctions from the
local de Broglie wavelength when the potential varies slowly compared to
that wavelength, bridging quantum and classical mechanics. A first
persistent error assumes WKB becomes exact in some vague "classical
limit," missing that the approximation fails specifically at classical
turning points (where the local momentum p(x)=0 and the local wavelength
diverges) regardless of how slowly the potential otherwise varies —
connection formulas, not the basic WKB ansatz itself, are required to
patch the solution across each turning point. A second error reduces the
WKB tunneling factor to the simple constant-barrier formula e^(−κa) for
any barrier shape, missing that the general result is
T∝exp(−2∫|p(x)|dx/ℏ), an integral over the entire classically forbidden
region that only collapses to κa when the barrier height and hence |p(x)|
is genuinely constant — using the simplified formula for a
spatially-varying barrier (like a Coulomb barrier in alpha decay) discards
essential physics of the barrier's actual shape.

## Mental Models

**Beginner**: "WKB is basically exact once ℏ is small enough; tunneling
through any barrier just uses e^(−κa); the 1/√p divergence at turning
points means the theory is broken." Upgrade trigger: computing the WKB
tunneling exponent for a genuinely varying barrier (like the parabolic
barrier in MP-3) and comparing to the naive −κa formula directly
confronts the constant-barrier-formula overreach; working through the
Airy-function connection-formula story directly confronts the
turning-point "broken theory" assumption.

**Intermediate**: "WKB validity is a geometric condition (|dλ/dx|≪1),
not an ℏ-smallness statement; the tunneling exponent is a full integral
over the forbidden region, not a single κ times a width; turning-point
divergence is an approximation artifact patched by connection formulas,
not a physical singularity." This model correctly captures WKB's scope
but may still need practice applying the Bohr-Sommerfeld quantization
condition to potentials beyond the harmonic oscillator.

**Advanced**: always verify the validity condition explicitly for a new
potential before trusting a WKB result, and always compute the full
tunneling integral rather than reaching for the constant-barrier shortcut
whenever V(x) is not literally constant across the barrier.

**Expert**: the connection between the WKB phase S(x)=∫p(x)dx and the
Hamilton-Jacobi principal function (WKB's leading order IS the classical
action, with ψ∝e^(iS/ℏ) making the classical-quantum bridge explicit)
and the Maslov-index bookkeeping for the (n+1/2) phase in Bohr-Sommerfeld
quantization — not required for mastery, connects to
`phys.mech.hamilton-jacobi-equation`.

## Why Students Fail

The dominant failure is conflating "ℏ is small" with "the potential
varies slowly," missing that WKB's validity condition is fundamentally
geometric (about the potential's rate of change relative to the local
wavelength) and fails at turning points regardless of ℏ; a closely
related failure applies the constant-barrier tunneling formula to any
barrier shape, missing that the general WKB result requires integrating
|p(x)| across the actual, possibly-varying barrier profile; a further
failure treats the 1/√p turning-point divergence as evidence the
approximation or the underlying physics has failed entirely, rather than
recognizing it as a known, patchable breakdown of this specific
approximation.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.qm.wkb-approximation.md`, C2
Misconception Register) documents two; reused by reference with
birth-type added.

- **MC-WKB-EXACT-CLASSICALLY (WKB is exact in the classical limit)**:
  believing "since ℏ is small, WKB is exact for any problem." **Birth
  type**: overgeneralization (Type 1) — the genuine sense in which WKB
  approaches classical mechanics is extended without qualification to
  "always exact," missing that turning points break the approximation
  independent of any ℏ-smallness argument. Probe: "WKB gives the exact
  answer in the classical limit ℏ→0 — is this always true?"
- **MC-WKB-TUNNELING-FORMULA (tunneling probability is always
  e^(−κa))**: believing "just use the simple exponential decay." **Birth
  type**: overgeneralization (Type 1) — the constant-barrier tunneling
  result (correctly learned in the prerequisite concept) is applied
  without modification to any barrier shape, missing that a spatially
  varying V(x) requires the full integral form. Probe: "A barrier has
  V(x)=V₀(1−x²/a²) for |x|<a — write the WKB tunneling exponent."

## Analogies

**Best**: a wave traveling through a medium where the local wave speed
changes slowly — the wave locally looks like a plane wave with a local
wavelength set by the local speed, exactly as WKB's ψ locally looks like
a plane wave with local de Broglie wavelength λ(x)=h/p(x); directly
targets the geometric nature of WKB's validity condition by grounding it
in an ordinary-wave-physics analog rather than an abstract ℏ-smallness
claim.

**Anti-analogy**: do NOT say "WKB tunneling is just e^(−κa)" without
immediately specifying that this only holds for a constant barrier —
this vague framing directly feeds MC-WKB-TUNNELING-FORMULA.

## Demonstrations

Worked-example: Bohr-Sommerfeld quantization applied to the harmonic
oscillator, ∮p dx=(n+1/2)·2πℏ, recovering the exact result E=(n+1/2)ℏω —
directly targets MC-WKB-EXACT-CLASSICALLY by showing WKB can be exactly
correct for a specific potential (quadratic), which is a genuinely
different claim from "WKB is always exact." Worked-example: the Gamow
factor for alpha decay through a Coulomb barrier,
G=exp(−2∫_R^{r₂}|p(r)|dr/ℏ), showing the sensitivity of the tunneling
rate to the actual barrier shape and energy — directly targets
MC-WKB-TUNNELING-FORMULA by requiring the full spatially-varying integral
rather than a single κ times a width.

## Discovery Questions

Discovery-style: "At a classical turning point, p(x)=0, so the WKB
amplitude 1/√p(x) blows up. Does this mean the wavefunction is actually
infinite there, or is something else going on?" — learner discovers
(through guided reasoning toward the Airy-function connection formulas)
that the divergence signals a breakdown of THIS approximation's validity
condition at that specific point, not a physical singularity, directly
confronting the "theory is broken" reading of the turning-point
divergence.

## Teaching Sequence

Blueprint's C4 Teaching-Action Sequence cited by reference (7 actions,
session_cap 7: local-wavelength hook and validity-condition notation →
Bohr-Sommerfeld quantization derivation → MC-WKB-TUNNELING-FORMULA
diagnostic → harmonic-oscillator worked example → three-step WKB
procedure pattern drill → independent practice). MC-WKB-EXACT-
CLASSICALLY is addressed via the validity-condition notation and the
harmonic-oscillator worked example, before MC-WKB-TUNNELING-FORMULA is
addressed via the diagnostic probe and the alpha-decay Gamow-factor
example.

## Tutor Actions

WORKED-EXAMPLE (Bohr-Sommerfeld quantization for the harmonic oscillator,
recovering the exact energy levels); WORKED-EXAMPLE (Gamow factor for
alpha decay through a Coulomb barrier); DERIVATION (WKB ansatz
ψ=A(x)exp(iS(x)/ℏ) leading-order expansion giving S₀=±∫p(x)dx); ANALOGY
(a wave in a medium with slowly-varying local speed, locally resembling a
plane wave with a local wavelength).

## Voice Teaching Notes

Listen for "WKB is exact since ℏ is basically zero" or "just use e^(−κa)
for the tunneling probability" — the two direct misconception tells.
Load-bearing sentence: "WKB's validity is about how slowly the potential
changes compared to the local wavelength, not about ℏ being small, and it
genuinely breaks down at classical turning points no matter what; and the
tunneling exponent is always a full integral of the local momentum across
the barrier, not a single number times a width, unless the barrier
happens to be perfectly constant." Channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner claiming WKB is exact whenever ℏ is small signals MC-WKB-
EXACT-CLASSICALLY (full repair via the harmonic-oscillator worked
example distinguishing genuine exactness for one potential from a general
claim). A learner applying the constant-barrier formula to a varying
barrier signals MC-WKB-TUNNELING-FORMULA (full repair via the alpha-decay
Gamow-factor worked example). Mastery trigger: correctly writing the WKB
wavefunction and stating its geometric validity condition, correctly
computing a Bohr-Sommerfeld quantization result, and correctly computing
a tunneling exponent as a full integral for a spatially-varying barrier.
Blueprint's C5 Mastery-Probe Set (MP-1 through MP-5) cited for the full
item bank.

## Tutor Recovery Strategy

Shrink-to question: "if a rule for approximating something works great
everywhere except right at one specific troublesome point, does the rule
failing AT that point mean the whole underlying physics is wrong, or just
that you need a patch right there?" (isolating the localized-breakdown-
versus-wrong-physics distinction before reapplying it to the WKB
turning-point divergence specifically). See
`../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (validity is geometric, not an ℏ-smallness statement; tunneling
exponent is a full spatial integral, not a single κ times width;
turning-point divergence is a patchable approximation breakdown) bound
to procedure (identifying turning points where p=0; writing the
classically-allowed and classically-forbidden WKB forms; applying
Bohr-Sommerfeld quantization). Interleave with `phys.qm.quantum-
tunneling`, `phys.qm.variational-method`, and
`phys.mech.hamilton-jacobi-equation`.

## Transfer Connections

Near: computing tunneling rates and quantization conditions for other
model potentials (Coulomb, Morse) encountered in later problems. Far:
nuclear physics's Gamow theory of alpha decay (explaining the enormous
range of observed half-lives, 10⁻⁷ s to 10¹⁰ years, from small energy
differences) and semiclassical quantization methods used broadly across
molecular and solid-state physics. Real-world: scanning tunneling
microscopy relies on essentially the same tunneling-through-a-barrier
physics this concept formalizes. Expert: the deep connection between the
WKB phase and the classical Hamilton-Jacobi principal function, making
explicit how quantum mechanics reduces to classical mechanics in the
appropriate limit.

## Cross-Subject Connections

KG `cross_links` empty. No cross-subject connection currently
identified — recorded honestly as a null finding, not fixed (no KG file
modified).

## Blueprint References

Blueprint exists (`docs/curriculum/blueprints/phys.qm.wkb-
approximation.md`, Component-format). Reuses: C2 Misconception Register
by reference. Not restated: C0 Concept Metadata, C3 full worked-example
derivations (allowed-region amplitude derivation, full Bohr-Sommerfeld
and Gamow-factor algebra), C5 full Mastery-Probe text, C6 Known Sticking
Points, C7 Adaptive-Teaching Rules, C8 Session-Flow Template, C9 V-Check
Trace.

## Runtime Asset References

No seeded `AssetIdentity` records — checked against `brainSeedAssets.ts`.
None created.

## Curriculum Feedback

No open issues found this batch — prerequisites, unlocks, and difficulty
calibration are internally consistent with this concept's role as the
semiclassical bridge concluding the quantum-mechanics domain's
approximation-methods thread (perturbation theory, variational method,
WKB).

## Version History

- 2026-07-23 (physics EB Wave 19): initial authoring.
