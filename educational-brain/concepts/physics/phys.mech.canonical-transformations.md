# Canonical Transformations and Generating Functions — `phys.mech.canonical-transformations`

## Identity

- **Concept ID**: `phys.mech.canonical-transformations` (canonical physics KG)
- **Curriculum location**: physics / classical mechanics (Hamiltonian formalism)
  — dependency level 15.
- **Prerequisites**: `phys.mech.poisson-brackets` — canonicity is defined
  directly in terms of preserved Poisson-bracket structure.
- **Unlocks** (from KG): `phys.mech.hamilton-jacobi-equation`.
- **Difficulty**: expert · **Bloom**: analyze · **Mastery threshold**: 0.85
  · **Est. hours**: 8

## Learning Objective

The learner can: (1) correctly explain that NOT every coordinate change
(q,p)→(Q,P) is canonical — only those satisfying {Qᵢ,Pⱼ}=δᵢⱼ,
{Qᵢ,Qⱼ}=0, {Pᵢ,Pⱼ}=0 qualify, so canonicity must be checked, never
assumed from the transformation "looking reasonable"; (2) correctly
explain that a generating function F is NOT analogous to a potential
energy — it is a bridge function relating old and new variables via
partial derivatives, with units of action (J·s), not energy.

## Core Understanding

A canonical transformation (q,p)→(Q,P) is one that preserves the form of
Hamilton's equations — equivalently, one that preserves the Poisson
bracket structure {Qᵢ,Pⱼ}_{q,p}=δᵢⱼ. This is NOT automatic for an
arbitrary relabeling of coordinates: a transformation can look perfectly
reasonable (e.g., a scaling or a nonlinear mix of q and p) and still fail
the Poisson-bracket test, or pass it unexpectedly. The four generating
functions F₁(q,Q), F₂(q,P), F₃(p,Q), F₄(p,P) are the constructive
machinery for BUILDING canonical transformations with guaranteed
canonicity — each type suits different boundary data (which old/new
variables are known), and the partial-derivative relations (e.g. for F₂:
p=∂F₂/∂q, Q=∂F₂/∂P) generate the transformation directly. A second
persistent confusion: the generating function is not a form of stored
energy the way a potential energy is — it is dimensionally an action (its
derivatives yield momenta and coordinates), and it can carry explicit time
dependence, in which case the new Hamiltonian is K=H+∂F/∂t rather than
simply K=H expressed in new variables.

## Mental Models

**Beginner**: "Any relabeling of (q,p) as new variables should be fine as
long as it's invertible; the generating function is basically a new
potential energy for the transformed system." Upgrade trigger: computing
{Q,P} explicitly for a plausible-looking but non-canonical transformation
(e.g. Q=q², P=p/2q) and finding it ≠1 directly confronts the "any
relabeling works" assumption.

**Intermediate**: "Canonicity must be verified via the Poisson-bracket
condition; the generating function produces the transformation through
partial derivatives, not by analogy to energy." This model handles most
cases but may still need to explicitly check whether F has explicit time
dependence before concluding K=H.

**Advanced**: "Always verify {Q,P}=1 (or the general δᵢⱼ condition) before
accepting a claimed canonical transformation, and always check ∂F/∂t
before equating K to H in new variables."

**Expert**: the symplectic-matrix formulation MᵀJM=J (equivalent to the
Poisson-bracket condition) and the connection to the Hamilton-Jacobi
equation, where a generating function F₂ is chosen specifically to make
K=0 identically — not required for mastery, but the natural next step
(`phys.mech.hamilton-jacobi-equation`).

## Why Students Fail

The dominant failure is assuming any coordinate relabeling is
automatically canonical, rather than checking the Poisson-bracket
condition explicitly; a closely related failure is treating the
generating function as a potential-energy-like object rather than a
bridge function whose partial derivatives define the new variables, which
leads to dropping the ∂F/∂t term when computing the new Hamiltonian K.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.mech.canonical-transformations.md`,
C2 Misconception Register) documents two; reused by reference with
birth-type added.

- **MC-CT-ANY-COORD-CHANGE (any coordinate change is canonical)**:
  believing "I can transform to any variables I want" without checking
  canonicity. **Birth type**: overgeneralization (Type 1) — the general
  freedom to relabel coordinates in ordinary (non-Hamiltonian) mechanics
  is incorrectly extended to phase space, missing that Hamilton's
  equations' form is preserved only under the specific Poisson-bracket-
  preserving subset of transformations. Probe: "Is Q=q², P=p/2q
  canonical?"
- **MC-CT-GENERATING-IS-POTENTIAL (the generating function is like a
  potential energy)**: believing "F just generates the new coordinates"
  as an energy-like quantity. **Birth type**: analogy overextension (Type
  6) — the term "generating function" and its role in producing new
  variables invites a false analogy to potential energy, missing that F
  has units of action and that its explicit time dependence (∂F/∂t)
  directly enters the new Hamiltonian K=H+∂F/∂t. Probe: "What are the
  units of a generating function, and what happens to K if F depends
  explicitly on t?"

## Analogies

**Best**: rotations in ordinary space, which change coordinates but
preserve distances — canonical transformations change phase-space
coordinates but preserve Poisson brackets, the "distance" of Hamiltonian
mechanics. This directly targets MC-CT-ANY-COORD-CHANGE by giving a
familiar image of a restricted, structure-preserving class of
transformations rather than an arbitrary relabeling.

**Anti-analogy**: do NOT say "the generating function is a potential
energy for the new coordinates" — this directly installs
MC-CT-GENERATING-IS-POTENTIAL by suggesting F is an energy-like object
rather than a bridge function with action units.

## Demonstrations

Worked-example: verify {Q,P}={q²,p/2q}=−1/2≠1 for the claimed
transformation Q=q², P=p/2q, concluding it is NOT canonical — directly
targets MC-CT-ANY-COORD-CHANGE. Worked-example: derive the action-angle
transformation for the harmonic oscillator (I=E/ω, θ=ωt+θ₀), showing
K=ωI is cyclic in θ, making the equations of motion trivial (İ=0, θ̇=ω).

## Discovery Questions

Discovery-style: "A student claims Q=2q, P=p/2 is canonical 'because it's
just a scaling.' Verify or refute using the Poisson bracket." — learner
computes {Q,P}={2q,p/2}=1 and discovers the scaling IS canonical,
confronting the assumption that only obviously symmetric transformations
(like q↔p swap) can be canonical, and reinforcing that the Poisson-bracket
check — not visual inspection — is the actual criterion.

## Teaching Sequence

Blueprint's C4 Teaching-Action Sequence cited by reference (7 TAs: hook →
notation/four generating-function types → Poisson-bracket-preservation
derivation → MC-CT-ANY-COORD-CHANGE diagnostic → action-angle worked
example → four-type derivative-relation drill → independent practice).
MC-CT-ANY-COORD-CHANGE is addressed before MC-CT-GENERATING-IS-POTENTIAL
— establishing that canonicity must be checked comes before the subtler
point about the generating function's time-dependence and units.

## Tutor Actions

WORKED-EXAMPLE (Poisson-bracket verification of Q=q², P=p/2q, non-
canonical); WORKED-EXAMPLE (action-angle variables for the harmonic
oscillator, K=ωI); THOUGHT-EXPERIMENT (verify Q=2q, P=p/2 IS canonical,
countering the "only symmetric-looking transforms work" bias); ANALOGY
(rotations preserving distance vs. canonical transformations preserving
Poisson brackets).

## Voice Teaching Notes

Listen for "any relabeling should work" or "the generating function stores
energy" — the two direct misconception tells. Load-bearing sentence: "you
don't get to assume it's canonical — check {Q,P}, and remember F is an
action, not an energy, so watch for ∂F/∂t." Channel-reality caveats owned
by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner accepting an arbitrary coordinate change as canonical without
checking signals MC-CT-ANY-COORD-CHANGE (full repair via the {Q,P}=−1/2
counter-example). A learner treating the generating function as an energy
signals MC-CT-GENERATING-IS-POTENTIAL (full repair via the units/∂F/∂t
discussion). Mastery trigger: correctly verifying canonicity via Poisson
brackets before accepting any transformation, AND correctly identifying
when K=H+∂F/∂t applies vs. K=H alone. Blueprint's C5 Mastery-Probe Set
(MP-1 through MP-5) cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget generating functions for a second — for the
transformation Q=2q, P=p/2, what is {Q,P} using just the definition
{f,g}=∂f/∂q ∂g/∂p − ∂f/∂p ∂g/∂q?" (isolating the mechanical Poisson-
bracket computation before re-engaging with canonicity judgments). See
`../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (canonicity = Poisson-bracket preservation, not "any relabeling";
generating function = bridge function with action units, not potential
energy) bound to procedure (computing {Q,P} for a claimed transformation;
deriving Q,P from F via partial derivatives). Interleave with
`phys.mech.poisson-brackets` and, once authored,
`phys.mech.hamilton-jacobi-equation`.

## Transfer Connections

Near: any problem asking whether a given phase-space transformation is
canonical, or asking to construct one via a generating function. Far: the
Hamilton-Jacobi equation (chooses F₂ specifically to drive K to zero
everywhere) and action-angle variables in perturbation theory
(adiabatic invariants). Real-world: none direct — this is a structural
mathematical-physics tool rather than an experimentally-measured
phenomenon. Expert: the symplectic-matrix condition MᵀJM=J as the
coordinate-free statement of canonicity.

## Cross-Subject Connections

KG `cross_links` empty. No genuine cross-subject connection identified —
this is a purely classical-mechanics formal structure with no natural
analog surfaced in chemistry, biology, or CS at this authoring pass.

## Blueprint References

Blueprint exists (`docs/curriculum/blueprints/phys.mech.canonical-
transformations.md`, C0-C9 format). Reuses: C2 Misconception Register and
its C5 Mastery-Probe Set by reference. Not restated: C0 Concept Metadata,
C3 full worked-example derivations (identity and exchange transformations
via F₁/F₂), C4 full Teaching-Action Sequence detail, C6 Known Sticking
Points, C7 Adaptive-Teaching Rules, C8 Session-Flow Template.

## Runtime Asset References

No seeded `AssetIdentity` records — checked against `brainSeedAssets.ts`
(4-concept seed set) and the physics KG's Explanation Memory coverage.
None created.

## Curriculum Feedback

None. Prerequisite (`phys.mech.poisson-brackets`) is necessary and
sufficient; no ambiguity or overlap found with sibling concepts.

## Version History

- 2026-07-23 (physics EB Wave 15): initial authoring.
