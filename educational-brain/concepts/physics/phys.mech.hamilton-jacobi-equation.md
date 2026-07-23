# Hamilton-Jacobi Equation and Action-Angle Variables — `phys.mech.hamilton-jacobi-equation`

## Identity

- **Concept ID**: `phys.mech.hamilton-jacobi-equation` (canonical physics KG)
- **Curriculum location**: physics / classical mechanics (Hamiltonian
  formalism) — dependency level 16.
- **Prerequisites**: `phys.mech.canonical-transformations` — the HJ
  equation is the special case of a canonical transformation chosen
  specifically to drive the new Hamiltonian K to zero.
- **Unlocks** (from KG): none — leaf node (cross-linked to
  `phys.mech.hamiltons-equations`, `phys.qm.wkb-approximation`).
- **Difficulty**: expert · **Bloom**: evaluate · **Mastery threshold**: 0.85
  · **Est. hours**: 10

## Learning Objective

The learner can: (1) correctly explain that Hamilton's principal function
S is NOT simply the action integral computed along a known trajectory —
S(q,α,t) is a FUNCTION of coordinates and constants of motion α,
determined by solving the HJ equation itself, independent of whether a
trajectory is already known; (2) correctly explain that separability of
the HJ equation into independent single-coordinate pieces is NOT
guaranteed for every multi-coordinate system — it requires the
Hamiltonian to actually decompose as a sum of single-coordinate terms
(or satisfy Stäckel-type conditions), never assumed just because there
are multiple coordinates.

## Core Understanding

The Hamilton-Jacobi equation −∂S/∂t = H(q,∂S/∂q,t) converts solving
Hamilton's equations into finding a single scalar function S — Hamilton's
principal function — such that all new momenta Pᵢ=αᵢ become constants of
the motion. A first persistent error treats S as "just the action
integral," something you compute BY integrating L dt along an
already-known path — but the HJ equation instead determines S(q,α,t) as a
function satisfying a PDE, valid regardless of whether the trajectory is
known in advance; S depends on the coordinates AND the constants of
motion α, not merely on a single numerical value for one path. A second
error assumes that whenever a system has multiple coordinates, S can
always be written as a sum S=S₁(q₁)+S₂(q₂)+... — but separability is a
genuine PROPERTY of the Hamiltonian, not a free choice: it requires H to
actually decompose into independent single-coordinate pieces (cyclic
coordinates always separate; a coupled term like xy prevents separation
in x,y), formalized by the Stäckel conditions.

## Mental Models

**Beginner**: "S is the action, computed by integrating the Lagrangian
along the trajectory; if a Hamiltonian has several coordinates, I can
always try S = S₁+S₂+... to solve it." Upgrade trigger: verifying that
S=px−p²t/(2m) satisfies the free-particle HJ equation directly (without
ever integrating along a trajectory) directly confronts the
action-integral assumption; being asked to separate H=(p₁²+p₂²)/(2m)+xy
and finding it genuinely impossible directly confronts the
always-separable assumption.

**Intermediate**: "S(q,α,t) is determined by solving the HJ equation
itself as a PDE, playing the role of a generating function for a
canonical transformation to constant new variables; separability
requires the Hamiltonian to actually decompose into independent pieces,
checked case by case." This model correctly captures both points but may
still need to explicitly verify the H=ΣHᵢ(qᵢ,pᵢ) decomposition before
attempting separation on an unfamiliar system.

**Advanced**: "Always treat S as the solution of the HJ PDE (with α as
the new constant momenta), never as a pre-computed action-integral
number, and always verify a Hamiltonian's actual decomposability before
attempting separation of variables."

**Expert**: the time-independent reduction (S=W(q,α)−Et when H has no
explicit time dependence) and the connection to action-angle variables
for integrable systems, plus the historical bridge to quantum mechanics
(S/ℏ becoming the phase of the wave function in the WKB approximation)
— not required for mastery, natural conceptual bridge forward.

## Why Students Fail

The dominant failure is treating S as a pre-computed action integral
along a known path rather than as the unknown function determined by
solving the HJ PDE itself; a closely related failure is assuming
separability of S into independent single-coordinate pieces is always
available for multi-coordinate systems, rather than a genuine,
checkable property of the specific Hamiltonian.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.mech.hamilton-jacobi-
equation.md`, C2 Misconception Register) documents two; reused by
reference with birth-type added.

- **MC-HJ-S-IS-ACTION (S is just the action integral; compute it
  separately)**: believing "I'll integrate L dt to get S." **Birth
  type**: language contamination (Type 3) — the shared name "action" for
  both the Lagrangian path integral ∫L dt and Hamilton's principal
  function S invites conflating the two, missing that S(q,α,t) satisfies
  the HJ equation as a function of coordinates and constants of motion,
  determined independently of any known trajectory. Probe: "For a free
  particle H=p²/2m, verify that S=px−p²t/(2m) satisfies the HJ equation
  — did you need to know the trajectory first?"
- **MC-HJ-ALWAYS-SEPARABLE (if there are multiple coordinates, you can
  always separate them)**: believing "just separate S=S₁(q₁)+S₂(q₂)."
  **Birth type**: overgeneralization (Type 1) — the frequent success of
  separation for textbook examples (cyclic coordinates, central-force
  problems) is generalized to all multi-coordinate systems, missing that
  separability requires H to genuinely decompose into independent
  single-coordinate pieces. Probe: "A student uses separation
  S=S_x(x)+S_y(y) for H=p_x²/(2m)+p_y²/(2m)+xy. Critique this approach."

## Analogies

**Best**: choosing the perfect canonical transformation so that K=0
everywhere (directly reusing the framework from
`phys.mech.canonical-transformations`) — the HJ equation is precisely the
CONDITION on the generating function S that forces this, giving trivial
equations of motion (all new Q,P constant) in the transformed variables —
this grounds S as a solution to a specific PDE-based requirement, not a
separately-computed action number.

**Anti-analogy**: do NOT say "S is basically the same thing as the
action integral you compute in the Lagrangian formulation" without
qualification — this directly installs MC-HJ-S-IS-ACTION by suggesting S
is obtained by integration along a trajectory rather than by solving the
HJ PDE as an independent determination.

## Demonstrations

Worked-example: verify S=px−p²t/(2m) satisfies the free-particle HJ
equation ∂S/∂t+(1/2m)(∂S/∂x)²=0 directly by substitution, then recover
the trajectory x=pt/m+x₀ from Q=∂S/∂α=const — directly targets
MC-HJ-S-IS-ACTION by showing S is verified/derived via the PDE, not
computed by integrating a known path. Worked-example: fully separate the
harmonic-oscillator HJ equation via W(q,E), deriving q(t)=A sin(ωt+φ) —
demonstrates a genuine, verifiable separation.

## Discovery Questions

Discovery-style: "A student wants to separate S=S_x(x)+S_y(y) for
H=(p_x²+p_y²)/(2m)+xy — a Hamiltonian with a coupling term between x and
y. Try it. What goes wrong?" — learner discovers that no constant can be
consistently assigned to the x-only or y-only piece because of the xy
cross term, directly confronting MC-HJ-ALWAYS-SEPARABLE.

## Teaching Sequence

Blueprint's C4 Teaching-Action Sequence cited by reference (7 TAs: K=0
motivation hook → S/W notation building → HJ-from-F₂ derivation →
MC-HJ-ALWAYS-SEPARABLE diagnostic via a separable-vs-coupled Hamiltonian
comparison → harmonic-oscillator worked example → 5-step time-independent
procedure drill → independent practice). MC-HJ-S-IS-ACTION is addressed
first via the free-particle S-verification exercise (TA-3), before
MC-HJ-ALWAYS-SEPARABLE during the diagnostic-probe comparison (TA-4).

## Tutor Actions

WORKED-EXAMPLE (free-particle S verified directly against the HJ
equation, trajectory recovered from Q=∂S/∂α); WORKED-EXAMPLE (harmonic
oscillator fully separated via W(q,E), q(t)=A sin(ωt+φ) recovered);
THOUGHT-EXPERIMENT (attempting separation on a coupled Hamiltonian
H=(p_x²+p_y²)/(2m)+xy and discovering it fails); ANALOGY (K=0 canonical
transformation as the unifying motivation for the HJ equation).

## Voice Teaching Notes

Listen for "I'll just integrate L dt to find S" or "there are two
coordinates, so I can separate" — the two direct misconception tells.
Load-bearing sentence: "S isn't something you integrate along a path —
it's the function that SOLVES the HJ equation itself; and separating
into pieces only works if the Hamiltonian actually splits apart, not just
because you have more than one coordinate." Channel-reality caveats owned
by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner attempting to compute S by integrating along a trajectory
signals MC-HJ-S-IS-ACTION (full repair via the free-particle direct-
substitution verification). A learner assuming automatic separability for
any multi-coordinate Hamiltonian signals MC-HJ-ALWAYS-SEPARABLE (full
repair via the coupled-Hamiltonian critique exercise). Mastery trigger:
correctly writing the HJ equation for a given Hamiltonian AND correctly
distinguishing S (time-dependent) from W (time-independent characteristic
function) AND correctly determining whether a given Hamiltonian is
separable before attempting separation. Blueprint's C5 Mastery-Probe Set
(MP-1 through MP-5) cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget the Hamilton-Jacobi equation for a second —
if I hand you a function and a differential equation, how do you check
whether the function actually SOLVES the equation? Do you need to know
how the function was originally derived?" (isolating the
verify-by-substitution skill, independent of derivation history, before
reapplying it to S specifically). See `../foundations/01-recovery-
engine.md`.

## Memory Hooks

Concept (S solves the HJ PDE as a function of coordinates and constants
of motion, not a pre-computed action integral; separability is a
checkable property of H, not automatic) bound to procedure (verifying a
candidate S against the HJ equation by direct substitution; checking
H=ΣHᵢ(qᵢ,pᵢ) decomposition before attempting separation). Interleave with
`phys.mech.canonical-transformations` and, as a forward conceptual
bridge, `phys.qm.schrodinger-equation` (S/ℏ becomes the wave-function
phase in the WKB limit).

## Transfer Connections

Near: any HJ-equation setup, verification, or separation-of-variables
problem in classical mechanics. Far: the WKB approximation in quantum
mechanics (the classical-to-quantum bridge via S/ℏ as phase) and
action-angle variables in perturbation theory (adiabatic invariants).
Real-world: none direct — this is a formal mathematical-physics bridge
concept rather than an experimentally-measured phenomenon. Expert: the
Stäckel separability conditions and integrable-system theory.

## Cross-Subject Connections

KG `cross_links` empty. No genuine cross-subject connection identified —
this is a purely classical/quantum-mechanics bridge structure with no
natural analog surfaced in chemistry, biology, or CS at this authoring
pass.

## Blueprint References

Blueprint exists (`docs/curriculum/blueprints/phys.mech.hamilton-jacobi-
equation.md`, C0-C9 format). Reuses: C2 Misconception Register and its C5
Mastery-Probe Set by reference. Not restated: C0 Concept Metadata, C3
full worked-example derivations (free particle, harmonic oscillator,
Kepler problem), C4 full Teaching-Action Sequence detail, C6 Known
Sticking Points, C7 Adaptive-Teaching Rules, C8 Session-Flow Template.

## Runtime Asset References

No seeded `AssetIdentity` records — checked against `brainSeedAssets.ts`.
None created.

## Curriculum Feedback

None. Prerequisite (`phys.mech.canonical-transformations`) is necessary
and sufficient; no ambiguity or overlap found with sibling concepts.

## Version History

- 2026-07-23 (physics EB Wave 16): initial authoring.
