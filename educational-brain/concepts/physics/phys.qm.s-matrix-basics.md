# S-Matrix and Scattering Amplitudes — `phys.qm.s-matrix-basics`

## Identity

- **Concept ID**: `phys.qm.s-matrix-basics` (canonical physics KG)
- **Curriculum location**: physics / quantum mechanics — dependency
  level 19.
- **Prerequisites**: `phys.qm.scattering-theory-born-approximation` (the
  amplitude/cross-section formalism this concept generalizes into a
  complete, non-perturbative framework).
- **Unlocks** (from KG): none — leaf node.
- **Difficulty**: expert · **Bloom**: evaluate · **Mastery threshold**:
  0.85 · **Est. hours**: 10

## Learning Objective

The learner can: (1) correctly distinguish the S-matrix (S=1+iT, unitary,
containing the "no scattering" identity plus the dynamics) from the
T-matrix (the transition matrix carrying the dynamics alone), never using
them interchangeably; (2) correctly explain that unitarity (S†S=1) IS
probability conservation, not merely a desirable property — an
approximation that breaks unitarity must be used only within its known
range of validity, and a large or resonant cross-section does not violate
unitarity as long as |S_l|=1 is maintained; (3) correctly distinguish
S-matrix poles corresponding to true bound states (real negative energy,
imaginary momentum, first Riemann sheet) from poles corresponding to
resonances (complex energy, second Riemann sheet, finite width and
lifetime).

## Core Understanding

The S-matrix maps asymptotic in-states to asymptotic out-states and
encodes all scattering observables; its unitarity is equivalent to
conservation of probability, and its poles in the complex-energy plane
locate bound states and resonances. A first persistent error conflates
the S-matrix and T-matrix as interchangeable, missing that S=1+iT
decomposes scattering into an identity part (no interaction) and a
transition part (T, carrying all the dynamics) — misapplying this
decomposition leads to wrong optical-theorem bookkeeping and
misidentified pole structures. A second error treats unitarity as a nice
mathematical property that approximate calculations can dispense with
without consequence, missing that S†S=1 is literally the statement that
total scattering probability is conserved — a large but merely
resonant cross-section (where sin²(δ_l)=1 at resonance) is fully
consistent with unitarity (|S_l|=1 throughout), while a genuinely
non-unitary approximation (like uncorrected first Born for real
potentials, whose Im[f(0)]=0 contradicts a nonzero cross-section via the
optical theorem) signals the approximation's breakdown, not new physics.
A third error conflates bound-state poles with resonance poles, missing
that bound states correspond to real, negative-energy poles on the
physical (first) Riemann sheet with strictly zero width, while
resonances correspond to complex-energy poles reached only by analytic
continuation onto the second Riemann sheet, with a finite width Γ
determining a finite lifetime τ=ℏ/Γ.

## Mental Models

**Beginner**: "S and T are basically the same matrix; unitarity is a nice
mathematical property but approximate calculations can ignore it without
real consequence; bound states and resonances are basically the same
kind of pole." Upgrade trigger: writing S=1+iT explicitly and asking
whether T contains the identity part directly confronts the S-versus-T
conflation; computing that first Born approximation gives Im[f(0)]=0 for
real V, contradicting a nonzero cross-section, directly confronts the
"unitarity doesn't matter" assumption; comparing a bound-state pole
(real negative energy) to a resonance pole (complex energy, second
sheet) directly confronts the poles-are-the-same assumption.

**Intermediate**: "S=1+iT with S unitary and T carrying the dynamics;
unitarity IS probability conservation, and violating it signals an
approximation's breakdown within a specific regime, not a general
license to ignore it; bound states are real-negative-energy poles on the
physical sheet, resonances are complex poles on the second sheet with
finite width." This model correctly captures the core distinctions but
may still need practice computing the optical theorem directly from the
unitarity condition for an unfamiliar partial-wave setup.

**Advanced**: always check which sign/normalization convention for S=1+iT
(or S=1−2πiT) a given text uses before applying formulas, and always
distinguish σ_total from σ_elastic when invoking the optical theorem for
inelastic processes.

**Expert**: the connection to Landauer-formula transport in mesoscopic
condensed-matter devices (an S-matrix framework applied to electron
transmission rather than particle scattering) and the universal role of
S-matrix elements squared as literally every observable measured in a
particle collider — not required for mastery, connects to
`phys.qm.density-matrix` for the open-system/mixed-state generalization.

## Why Students Fail

The dominant failure is treating the S-matrix and T-matrix as
interchangeable notation for "the scattering matrix," missing the
specific S=1+iT decomposition and its consequences for the optical
theorem; a closely related failure treats unitarity as an optional nicety
rather than the literal statement of probability conservation, leading to
uncritical trust in approximations (like first Born) that are known to
violate it in specific regimes; a further failure conflates bound-state
poles with resonance poles, missing the qualitative difference between a
zero-width, real-energy, first-sheet pole and a finite-width,
complex-energy, second-sheet pole.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.qm.s-matrix-basics.md`, C2
Misconception Register) documents two; reused by reference with
birth-type added.

- **MC-SMAT-S-IS-JUST-T (S and T are the same thing)**: believing "S=T,
  so I can use them interchangeably." **Birth type**: notation-induced
  (Type 4) — both symbols are casually called "the scattering matrix" in
  informal treatments, obscuring that S=1+iT is a specific decomposition
  with the identity part carrying distinct physical meaning (no
  scattering) from the T part (the dynamics). Probe: "Is the optical
  theorem σ=(4π/k)Im[T_αα] or Im[f(0)]?"
- **MC-SMAT-UNITARITY-OPTIONAL (unitarity is just a nice property)**:
  believing "my approximate S doesn't need to be unitary." **Birth
  type**: overgeneralization (Type 1) — the general engineering habit of
  treating exact mathematical properties as negotiable "nice-to-haves"
  in an approximation is over-applied to unitarity, missing that S†S=1
  IS probability conservation, so violating it produces genuinely
  non-physical predictions rather than merely "less precise" ones. Probe:
  "A model gives S=e^(2iδ) with complex δ — is this physical for elastic
  scattering?"

## Analogies

**Best**: a complete accounting ledger where the S-matrix is the full
balance sheet (everything that goes in must come out somewhere, which is
exactly what unitarity S†S=1 states) and the T-matrix is only the
"transactions" column, excluding the trivial "nothing happened" entries
that the identity part of S represents — directly targets MC-SMAT-S-IS-
JUST-T by giving S and T structurally distinct roles within one
accounting framework, rather than treating them as synonyms.

**Anti-analogy**: do NOT say "unitarity is just like energy conservation
— a nice-to-have that approximations can slightly violate" without
immediately clarifying that unitarity IS a conservation law (of
probability) with the same non-negotiable status — this vague framing
directly feeds MC-SMAT-UNITARITY-OPTIONAL.

## Demonstrations

Worked-example: derive the optical theorem directly from unitarity
(S†S)_αα=1 → Σ_β|S_βα|²=1, expanding S=1+iT to get
Im[T_αα]=(1/2)Σ_β|T_βα|², arriving at σ=(4π/k)Im[f(0)] — directly targets
MC-SMAT-S-IS-JUST-T by showing exactly where the identity-versus-T
distinction enters the derivation. Worked-example: apply first Born
approximation to a real potential V, showing f_B(0) is purely real so
Im[f_B(0)]=0, then compare to the nonzero dσ/dΩ=|f_B|² the same
approximation predicts — directly targets MC-SMAT-UNITARITY-OPTIONAL by
exhibiting a concrete, checkable unitarity violation and explaining it as
the approximation's known first-order limitation (resolved by the second
Born correction).

## Discovery Questions

Discovery-style: "A resonance is modeled as S_l(E)=(E−E_R−iΓ/2)/
(E−E_R+iΓ/2). Compute |S_l|² exactly at E=E_R. Is unitarity preserved at
resonance, even though the cross-section is unusually large there?" —
learner discovers |S_l(E_R)|²=1 (unitarity holds) while the LARGE
cross-section comes from sin²(δ_l)=1 at resonance, not from any
unitarity violation, directly confronting MC-SMAT-UNITARITY-OPTIONAL's
implicit assumption that large or unusual cross-sections signal broken
unitarity.

## Teaching Sequence

Blueprint's C4 Teaching-Action Sequence cited by reference (7 actions,
session_cap 7: physical motivation that "if you knew the complete S you'd
know everything" → S/T notation and unitarity → optical-theorem
derivation from unitarity → MC-SMAT-S-IS-JUST-T diagnostic → phase-shift
worked example → Breit-Wigner resonance pattern drill → independent
practice). MC-SMAT-S-IS-JUST-T is addressed via the notation-building and
optical-theorem-derivation core, before MC-SMAT-UNITARITY-OPTIONAL is
addressed via the Breit-Wigner resonance drill and the first-Born
counter-example.

## Tutor Actions

DERIVATION (optical theorem proven directly from unitarity S†S=1 via the
S=1+iT decomposition); WORKED-EXAMPLE (phase-shift partial-wave S-matrix
elements S_l=e^(2iδ_l), extracting f(θ) and verifying the optical
theorem); WORKED-EXAMPLE (Breit-Wigner resonance form, verifying
|S_l(E_R)|²=1 at resonance); THOUGHT-EXPERIMENT (first Born approximation
for a real potential exhibiting a checkable unitarity violation,
resolved only by higher-order corrections).

## Voice Teaching Notes

Listen for "S and T are the same matrix" or "my approximation doesn't
need to be unitary" — the two direct misconception tells. Load-bearing
sentence: "S equals one plus i-T — the one is 'nothing happened,' T is
all the actual scattering, and they play genuinely different roles; and
unitarity isn't a nice-to-have, it's literally probability conservation,
so an approximation that breaks it isn't just 'less precise,' it's
predicting something that can't physically happen outside its known range
of validity." Channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner conflating S and T signals MC-SMAT-S-IS-JUST-T (full repair via
the optical-theorem derivation making the identity-versus-T roles
explicit). A learner dismissing unitarity as optional for an approximate
calculation signals MC-SMAT-UNITARITY-OPTIONAL (full repair via the
first-Born real-potential counter-example). Mastery trigger: correctly
stating the S=1+iT relationship and its physical meaning, correctly
deriving the optical theorem from unitarity, and correctly distinguishing
a bound-state pole from a resonance pole by Riemann sheet and width.
Blueprint's C5 Mastery-Probe Set (MP-1 through MP-5) cited for the full
item bank.

## Tutor Recovery Strategy

Shrink-to question: "if a rule says 'everything that goes into this
system must come back out somewhere, in some form,' is that rule a
suggestion, or a hard constraint on any physically sensible
description?" (isolating the conservation-law status of unitarity before
reapplying it specifically to why a non-unitary S-matrix signals a
broken approximation, not a valid alternative). See
`../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (S=1+iT with distinct identity/dynamics roles; unitarity as
literal probability conservation, not optional; bound states = real
negative-energy first-sheet poles, resonances = complex second-sheet
poles with finite width) bound to procedure (deriving the optical
theorem from unitarity; extracting phase shifts and cross-sections from
partial-wave S-matrix elements; reading Breit-Wigner resonance parameters
E_R and Γ). Interleave with `phys.qm.scattering-theory-born-
approximation`, `phys.qm.operators`, and `phys.qm.density-matrix`.

## Transfer Connections

Near: computing cross-sections and identifying resonances for other
scattering setups (nuclear reactions, atomic collisions) using the same
S-matrix/phase-shift framework. Far: particle physics (every observable
measured at a collider is fundamentally an S-matrix element squared) and
condensed-matter mesoscopic transport (the Landauer formula describes
electron transmission through a device using an S-matrix framework
structurally identical to scattering theory). Real-world: nuclear
resonance spectroscopy identifies unstable states via their Breit-Wigner
lineshape in scattering data. Expert: the density matrix as the natural
generalization when scattering is incomplete or coherence is partially
lost (open quantum systems), directly connecting to
`phys.qm.density-matrix`.

## Cross-Subject Connections

KG `cross_links` empty. No cross-subject connection currently
identified — recorded honestly as a null finding, not fixed (no KG file
modified).

## Blueprint References

Blueprint exists (`docs/curriculum/blueprints/phys.qm.s-matrix-
basics.md`, Component-format). Reuses: C2 Misconception Register by
reference. Not restated: C0 Concept Metadata, C3 full worked-example
derivations (1D step-barrier S-matrix, full Breit-Wigner algebra), C5
full Mastery-Probe text, C6 Known Sticking Points, C7 Adaptive-Teaching
Rules, C8 Session-Flow Template, C9 V-Check Trace.

## Runtime Asset References

No seeded `AssetIdentity` records — checked against `brainSeedAssets.ts`.
None created.

## Curriculum Feedback

No open issues found this batch — prerequisites, unlocks, and difficulty
calibration are internally consistent with this concept's role as the
capstone of the scattering-theory thread (Born approximation → S-matrix)
within the quantum mechanics domain.

## Version History

- 2026-07-23 (physics EB Wave 19): initial authoring.
