# The Hamiltonian and Legendre Transform — `phys.mech.hamiltonian`

## Identity

- **Concept ID**: `phys.mech.hamiltonian` (canonical physics KG)
- **Curriculum location**: physics / mechanics — dependency level 12.
- **Prerequisites**: `phys.mech.euler-lagrange-equation` — the
  Hamiltonian is a distinct but related reformulation built directly on
  the already-secure Lagrangian, via a Legendre transform to a new set
  of variables.
- **Unlocks** (from KG): `phys.mech.hamiltons-equations`,
  `phys.qm.scattering-theory-born-approximation` — a genuine hub
  concept, bridging classical mechanics to quantum mechanics.
- **Difficulty**: expert · **Bloom**: understand · **Mastery threshold**: 0.85
  · **Est. hours**: 6

## Learning Objective

The learner can: (1) correctly explain that the Hamiltonian H is NOT
"just the Lagrangian L with different notation" — H and L are genuinely
DIFFERENT mathematical objects, defined over DIFFERENT variable domains:
L(q,q̇,t) depends on coordinates and VELOCITIES, while H(q,p,t) depends on
coordinates and MOMENTA, related by a Legendre transform, H=Σp q̇-L, NOT
simply H=T-V rewritten; (2) correctly explain that H does NOT always
equal the total energy T+V — this equality holds only under specific
conditions (time-independent constraints, no explicit time dependence in
L) — for systems with explicitly time-dependent Lagrangians or
time-dependent constraints, H≠E, a genuinely important exception that
must be checked case by case, not assumed automatically.

## Core Understanding

The Hamiltonian H is NOT simply the Lagrangian L rewritten in different
notation — they are genuinely DIFFERENT mathematical objects, defined
over DIFFERENT sets of independent variables: the Lagrangian is a
function of generalized coordinates AND VELOCITIES, L(q,q̇,t), while the
Hamiltonian is a function of generalized coordinates AND MOMENTA,
H(q,p,t) — converting between them requires a LEGENDRE TRANSFORM,
H=Σ(p_i q̇_i)-L (summed over all generalized coordinates), a specific
mathematical operation that changes which variables are treated as
independent, NOT a mere notational relabeling; writing H=T-V (confusing
it with L) misses this fundamental structural distinction entirely. A
second, equally important and easily over-generalized claim: H does NOT
ALWAYS equal the total mechanical energy, T+V — this equality holds
ONLY under specific conditions, essentially requiring that the
coordinate transformation to generalized coordinates be TIME-INDEPENDENT
(no explicit time dependence in the constraints or the Lagrangian
itself); for systems where the Lagrangian DOES depend explicitly on
time (e.g. a pendulum with a moving pivot, or constraints that change
with time), H genuinely does NOT equal T+V — this must be checked
case-by-case by examining whether the Lagrangian's constraints are
time-independent, never assumed as an automatic universal equality.

## Mental Models

**Beginner**: "H is just L with different notation, H=T-V; H always
equals the total energy T+V." Upgrade trigger: attempting to state the
different variable domains (L depends on velocities; H depends on
momenta) directly confronts the same-object assumption; examining a
system with an explicitly time-dependent Lagrangian (finding H≠E)
directly confronts the H-always-energy assumption.

**Intermediate**: "H(q,p,t) is obtained from L(q,q̇,t) via the Legendre
transform H=Σp q̇-L, a genuinely different object over different
variables; H=T+V only when constraints are time-independent, checked
case by case." This model correctly captures both core results, but
sometimes still writes H=T-V by habit, confusing it with L's own
definition.

**Advanced**: "Always explicitly perform the Legendre transform (solving
for q̇ in terms of p, then substituting into Σp q̇-L) rather than
assuming H's form by analogy to L; always verify time-independence of
constraints before equating H with total energy."

**Expert**: Hamilton's equations (q̇=∂H/∂p, ṗ=-∂H/∂q) as the direct
consequence of the Legendre transform, providing a first-order
(phase-space) reformulation of dynamics — a natural consolidation
directly connecting to the KG unlocks `phys.mech.hamiltons-equations`
and `phys.qm.scattering-theory-born-approximation` (the bridge to
quantum mechanics), not required for mastery.

## Why Students Fail

The dominant failure is treating the Hamiltonian as merely a relabeled
Lagrangian (writing H=T-V), missing the genuine Legendre-transform
relationship and the different variable domains involved; a second,
distinct failure is assuming H always equals total energy T+V without
checking whether the underlying constraints/Lagrangian are genuinely
time-independent.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.mech.hamiltonian.md`,
Misconception Engine) documents two; reused by reference with birth-type
added.

- **MC-H-IS-L**: believing "the Hamiltonian H is just the Lagrangian
  with different notation," writing H=T-V. **Birth type**:
  overgeneralization (Type 1) — both H and L are built from T and V,
  and this shared ingredient list is incorrectly taken to mean they are
  the same object, missing the genuinely different variable domains
  (velocities vs. momenta) and the Legendre-transform relationship
  between them. Probe: "Is the Hamiltonian H the same mathematical
  object as the Lagrangian L, just written differently, or are they
  functions of genuinely different variables?"
- **MC-H-ALWAYS-ENERGY**: assuming "H always equals the total energy
  T+V" without checking whether constraints are time-dependent. **Birth
  type**: overgeneralization (Type 1) — the common, simple case (where H
  does equal T+V) is incorrectly assumed to be universal, missing the
  specific time-independence condition required for this equality to
  hold. Probe: "For a system with an explicitly time-dependent
  Lagrangian (e.g. a moving constraint), does H necessarily equal the
  total energy T+V?"

## Analogies

**Best**: converting between position-velocity coordinates and
position-momentum coordinates in a graph — the SAME physical system
looks different depending on which pair of axes you use, and converting
between them requires a specific mathematical procedure (the Legendre
transform), not just relabeling — directly targets MC-H-IS-L by giving
a concrete image of genuinely different variable representations.

**Anti-analogy**: do NOT say "the Hamiltonian is basically the energy of
the system" as an unqualified simplification — this directly installs
MC-H-ALWAYS-ENERGY by omitting the time-independence condition.

## Demonstrations

Conceptual: perform the Legendre transform explicitly for a simple
system (e.g. a free particle), deriving H(q,p) from L(q,q̇) step by step
— directly targets MC-H-IS-L. Worked-example: construct a system with an
explicitly time-dependent Lagrangian (e.g. a bead on a rotating,
time-varying-radius wire) and show H≠T+V — directly targets
MC-H-ALWAYS-ENERGY.

## Discovery Questions

Discovery-style: "if L depends on velocity q̇, and H depends on momentum
p instead, can H simply BE L with a different name, or must something
change in the actual mathematical relationship?" — learner reasons
through the Legendre transform, directly confronting MC-H-IS-L.

## Teaching Sequence

Blueprint's assessment component cited by reference. MC-H-IS-L is
addressed first (establishing H and L as genuinely distinct objects via
the Legendre transform), before MC-H-ALWAYS-ENERGY, since correctly
understanding H's actual DEFINITION is the prerequisite for then
correctly reasoning about WHEN it happens to equal total energy.

## Tutor Actions

WORKED-EXAMPLE (Legendre transform performed explicitly for a simple
system); COMPARE-CONTRAST (time-independent vs. time-dependent
constraint system, H=E vs. H≠E); ANALOGY (position-velocity vs.
position-momentum coordinate conversion).

## Voice Teaching Notes

Listen for "H is just L relabeled" or "H is always the total energy" —
the two direct misconception tells. Load-bearing sentence: "H comes from
L through a real mathematical transform, changing velocities into
momenta — and it only equals total energy when the constraints don't
depend on time." Channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner writing H=T-V (confusing it with L) signals MC-H-IS-L
(MISCONCEIVING, full repair via the explicit Legendre-transform
derivation). A learner assuming H=T+V without checking time-independence
signals MC-H-ALWAYS-ENERGY (full repair via the time-dependent-
constraint counterexample). Mastery trigger: correctly performing the
Legendre transform from L to H, AND correctly identifying when H does
and doesn't equal total energy. Blueprint's assessment component cited
for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget the formula for a second — is L written in
terms of q̇ (velocity), or p (momentum)? And is H written in terms of
q̇, or p?" (isolating the different variable domains before discussing
the transform). See `../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (Legendre-transform relationship between L and H; conditional
equality with total energy) bound to procedure (H=Σp q̇-L calculation).
Interleave with `phys.mech.euler-lagrange-equation` and, once authored,
`phys.mech.hamiltons-equations` (the direct KG unlock).

## Transfer Connections

Near: any Hamiltonian-formulation mechanics problem. Far: quantum
mechanics (the Hamiltonian operator as the direct quantum generalization
of this classical concept, central to the Schrödinger equation) and
statistical mechanics (phase-space formulations built directly on
Hamiltonian variables). Real-world: understanding why quantum mechanics
textbooks universally use "the Hamiltonian" as the central object
governing time evolution, directly inheriting this classical concept.
Expert: Hamilton's equations as the phase-space reformulation of
dynamics, and the bridge to quantum scattering theory.

## Cross-Subject Connections

KG `cross_links` empty. No strong cross-subject connection identified;
honest "weak but real" assessment.

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

No cross-subject connection found beyond physics itself.

## Version History

- 2026-07-23 (physics EB Wave 12): initial authoring.
