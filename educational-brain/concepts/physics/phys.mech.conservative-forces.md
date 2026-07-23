# Conservative and Non-Conservative Forces — `phys.mech.conservative-forces`

## Identity

- **Concept ID**: `phys.mech.conservative-forces` (canonical physics KG)
- **Curriculum location**: physics / mechanics — dependency level 9.
- **Prerequisites**: `phys.mech.conservation-of-energy` — this concept
  formalizes and generalizes the already-secure "no friction" validity
  condition into the precise, general definition of what makes a force
  conservative in the first place.
- **Unlocks** (from KG): `phys.mech.generalized-coordinates` — a genuine
  hub concept.
- **Difficulty**: advanced · **Bloom**: analyze · **Mastery threshold**: 0.80
  · **Est. hours**: 5

## Learning Objective

The learner can: (1) correctly state that a conservative force's work
depends ONLY on start and end positions, never on the specific path taken
between them — and correctly verify this by computing gravity's work
along two different paths (a straight vertical drop and a longer,
angled ramp) between the same two heights, finding identical values;
(2) correctly explain that friction has NO associated potential energy
function, since it converts mechanical energy irreversibly to heat — a
"friction PE" is not a meaningful concept, since that energy can never be
recovered as KE by releasing it.

## Core Understanding

A force is CONSERVATIVE if the work it does moving an object between two
points depends ONLY on the start and end positions — never on the
specific path taken, or equivalently, if the work done around any closed
loop is exactly zero. Gravity is a canonical example: computing gravity's
work along a straight vertical drop of height h versus a longer, angled
frictionless ramp connecting the same two heights gives IDENTICAL work
values (W=mgh in both cases) — the path's length and shape genuinely
don't matter, only the net height change. Gravity, spring force, and
electric force are all conservative; friction and air drag are NOT — for
these, work genuinely DOES depend on path length (a longer sliding
distance means more friction work, hence more energy dissipated).
Because potential energy is DEFINED only for conservative forces (via
F = -dU/dx, a function that only exists when work is path-independent),
friction has NO associated potential energy function at all — this is not
merely an unconventional choice but a genuine impossibility: friction
converts mechanical energy irreversibly into heat, and this converted
energy can never be recovered as kinetic energy by "releasing" some
imagined stored friction-PE, a direct consequence of the second law of
thermodynamics (heat doesn't spontaneously convert back to organized
kinetic energy).

## Mental Models

**Beginner**: "Gravity does more work when you fall along a longer path
(like a ramp) than a direct vertical drop; friction should have its own
potential energy, recoverable like a spring's." Upgrade trigger:
computing gravity's work along both a vertical drop and an angled ramp
between the same two heights, finding identical results, directly
confronts the path-dependence assumption; considering whether a warmed
floor (from friction) can ever spontaneously cool and return that energy
as motion directly confronts the friction-PE assumption.

**Intermediate**: "Conservative forces (gravity, spring, electric) have
path-independent work and an associated PE function; non-conservative
forces (friction, air drag) have path-DEPENDENT work and no PE function,
since they dissipate energy irreversibly." This model correctly captures
both distinctions, but sometimes still tries to force a PE-like term into
friction calculations out of habit from conservative-force problems.

**Advanced**: "Before assigning any potential energy to a force, verify
it is actually conservative (path-independent work, zero work around any
closed loop) — friction fails this test categorically, and no PE
function can ever be constructed for it."

**Expert**: the mathematical equivalence between path-independence and a
force being expressible as the negative gradient of a scalar potential
(F = -∇U), directly connecting to the broader mathematical structure of
conservative vector fields — not required for mastery.

## Why Students Fail

The dominant failure is expecting a longer or more complex path to
involve "more work" from a conservative force like gravity, not
recognizing that conservative forces' work depends only on
displacement/height change; a second, distinct failure is attempting to
define a "friction potential energy," not recognizing that PE requires
path-independence, which friction categorically lacks.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.mech.conservative-forces.md`,
Misconception Engine) documents two; reused by reference with birth-type
added.

- **MC-PATH-INDEPENDENCE-HARD**: believing gravity does more work when
  falling a longer path (e.g. along a ramp vs. vertically), confusing
  path length with work done by a conservative force. **Birth type**:
  overgeneralization (Type 1) — the reasonable-seeming "longer path,
  more work" intuition (correctly true for NON-conservative forces like
  friction) is incorrectly extended to conservative forces like gravity,
  where path length is irrelevant. Probe: "A block moves from a height
  of 2m to the ground via a vertical drop, and separately via a longer,
  frictionless angled ramp. Does gravity do more work along the longer
  path?"
- **MC-FRICTION-HAS-PE**: attempting to write "friction potential
  energy" or expecting friction's work to be stored and recoverable.
  **Birth type**: overgeneralization (Type 1) — the PE concept, secure
  for conservative forces like gravity and springs, is incorrectly
  extended to friction without checking whether friction actually
  satisfies the path-independence condition PE requires. Probe: "After
  sliding a block along a rough floor (warming it slightly via friction),
  can that heat spontaneously convert back into the block's kinetic
  energy, the way a compressed spring's PE converts back into KE?"

## Analogies

**Best**: a hiker's total elevation gain from base camp to a mountain
summit — it depends only on the START and END altitudes, never on which
trail was taken (a short steep trail or a long winding one) — directly
targets MC-PATH-INDEPENDENCE-HARD by giving a familiar, physical
precedent for path-independence.

**Anti-analogy**: do NOT say "every force has some potential energy
associated with it" as a general statement — this directly invites
MC-FRICTION-HAS-PE by suggesting PE is universal rather than specific to
conservative forces.

## Demonstrations

Physical/conceptual: compute gravity's work along a vertical drop and an
angled frictionless ramp between the same two heights, showing identical
values (both 19.6 J for the Blueprint's specific numbers) — directly
targets MC-PATH-INDEPENDENCE-HARD. Conceptual: consider whether a
warmed floor (from friction) can spontaneously cool and return that
energy as block motion — directly targets MC-FRICTION-HAS-PE via the
second-law-of-thermodynamics argument.

## Discovery Questions

Discovery-style: "does gravity do more total work on a ball rolling down
a long, gentle slope than on the same ball dropped straight down the same
height?" — learner computes both cases, directly confronting
MC-PATH-INDEPENDENCE-HARD.

## Teaching Sequence

Blueprint's assessment component cited by reference.
MC-PATH-INDEPENDENCE-HARD is addressed first (establishing the general
path-independence test for conservative forces), before
MC-FRICTION-HAS-PE, since correctly grasping WHY conservative forces have
associated PE functions (via path-independence) is the prerequisite for
then correctly reasoning why friction, which fails that test, cannot have
one.

## Tutor Actions

WORKED-EXAMPLE (gravity's work computed along two different paths,
identical result); THOUGHT-EXPERIMENT (can dissipated friction heat
spontaneously become kinetic energy again?); ERROR-ANALYSIS (a solution
attempting to define a friction PE term).

## Voice Teaching Notes

Listen for "longer path means more gravitational work" or attempts to
define a friction PE — the two direct misconception tells. Load-bearing
sentence: "conservative forces only care about where you START and END —
never the road you took; friction isn't conservative, so it simply has no
PE at all." Channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner computing different gravitational work values for different
paths between the same two heights signals MC-PATH-INDEPENDENCE-HARD
(MISCONCEIVING, full repair via the dual-path computation). A learner
attempting to define a friction PE term signals MC-FRICTION-HAS-PE (full
repair via the irreversibility thought experiment). Mastery trigger:
correctly verifying path-independence for a conservative force, AND
correctly explaining why friction has no PE function. Blueprint's
assessment component cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget the specific path for a second — does
gravity's work depend on ANYTHING except how far up or down the object
moved?" (isolating the height-only dependence before generalizing to
path-independence). See `../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (path-independence test; PE existence requires conservativeness)
bound to procedure (verifying conservativeness via multi-path work
comparison). Interleave with `phys.mech.conservation-of-energy` and,
once authored, `phys.mech.generalized-coordinates` (the direct KG
unlock).

## Transfer Connections

Near: any problem distinguishing conservative from non-conservative
forces, including energy-loss analysis in machines. Far: thermodynamics
(the irreversibility of friction's heat generation directly connects to
entropy and the second law) and Lagrangian mechanics (conservative
forces' central role in formulating the Lagrangian via potential energy).
Real-world: understanding why regenerative braking (recovering some
kinetic energy electrically) is fundamentally different from ordinary
friction braking (which irreversibly dissipates energy as heat). Expert:
the mathematical equivalence between path-independence and F=-∇U.

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

- 2026-07-23 (physics EB Wave 9): initial authoring.
