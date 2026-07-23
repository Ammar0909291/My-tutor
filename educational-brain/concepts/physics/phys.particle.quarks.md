# Quarks — `phys.particle.quarks`

## Identity

- **Concept ID**: `phys.particle.quarks` (canonical physics KG)
- **Curriculum location**: physics / particle physics — dependency
  level 18.
- **Prerequisites**: `phys.particle.particle-classification` (the
  hadron category quarks are the constituents of).
- **Unlocks** (from KG): `phys.particle.hadron-quark-model`,
  `phys.particle.strong-interaction`.
- **Difficulty**: proficient · **Bloom**: understand · **Mastery
  threshold**: 0.80 · **Est. hours**: 4

## Learning Objective

The learner can: (1) correctly compute a hadron's total charge by summing
its constituent quarks' fractional charges (up-type +⅔e, down-type −⅓e),
verifying the sum always comes out to a whole-number multiple of e; (2)
correctly explain WHY free quarks are never observed — the strong force
between quarks grows (rather than weakens) with separation, so before two
quarks can be pulled apart the invested energy becomes sufficient to
create a new quark-antiquark pair, always leaving two color-neutral
hadrons rather than one isolated quark; (3) correctly identify that only
up and down quarks build ordinary matter — the four heavier flavors
(charm, strange, top, bottom) are equally fundamental but far too
massive and short-lived to persist outside high-energy collisions.

## Core Understanding

Quarks are the fundamental constituents of hadrons, carrying fractional
electric charge (multiples of ⅓e), coming in six flavors across three
generations, and are never observed as free, isolated particles due to
confinement. A first persistent error assumes that with a powerful
enough accelerator, physicists could eventually isolate a single free
quark — by analogy to splitting atoms or molecules apart with enough
energy — but the strong force between quarks grows stronger, not weaker,
with distance, so the energy invested in separation always becomes
sufficient to create a new quark-antiquark pair before separation is
achieved, leaving two color-neutral hadrons flying apart, never a lone
quark. A second error assumes a quark's fractional charge (like +⅔e)
should be directly measurable with a sufficiently precise charge
detector, missing that every charge ever measured directly in an
experiment has been a whole-number multiple of e — a direct experimental
consequence of confinement, since quarks only exist bound into hadrons
whose total charge always sums to a whole multiple of e. A third error
assumes all six quark flavors are equally present in everyday matter,
missing that only up and down quarks (the lightest, most stable flavor)
are light and stable enough to build ordinary protons and neutrons — the
four heavier flavors appear only fleetingly in high-energy collisions or
cosmic-ray interactions before decaying via the weak interaction.

## Mental Models

**Beginner**: "With enough energy, a single quark could eventually be
pulled free and studied alone; a sensitive enough detector should
eventually measure a fractional charge directly; all six quark flavors
should be equally common in everyday matter." Upgrade trigger: physically
demonstrating a rubber band snapping into two pieces (rather than
stretching indefinitely, like pulling apart two magnets) directly
confronts the free-quark-isolation assumption; computing the
proton/neutron charge from quark fractions and seeing the whole-number
result directly confronts the directly-measurable-fractional-charge
assumption; comparing the mass table (up/down at a few MeV/c² versus top
at ~173,000 MeV/c²) directly confronts the equally-common-flavors
assumption.

**Intermediate**: "Free quarks cannot be isolated because the strong
force grows with separation, not because of a practical energy
limitation; fractional charge is inferred from whole-number hadron
charges, never measured directly and in isolation; only up and down
quarks are light/stable enough for ordinary matter." This model
correctly captures confinement's structural (not merely practical)
nature but may still need practice generalizing the charge-arithmetic
method to less familiar hadrons.

**Advanced**: always frame confinement as a structural feature of the
strong force itself (not a limitation awaiting a more powerful
accelerator), and always verify quark-composition charge sums come out
to a whole number before accepting a proposed hadron composition.

**Expert**: the connection to deep inelastic scattering (the 1968
experimental evidence for point-like structures inside the proton,
establishing quarks as physically real rather than a convenient
bookkeeping device) and the quark-gluon plasma believed to have existed
microseconds after the Big Bang, recreated in heavy-ion collider
experiments — not required for mastery, natural bridge to
`phys.particle.strong-interaction`.

## Why Students Fail

The dominant failure is assuming free quarks could eventually be
isolated given enough energy, by false analogy to splitting atoms or
molecules, missing that the strong force's growth with distance makes
confinement a structural rule rather than a practical limitation; a
closely related failure assumes fractional quark charge should be
directly, individually measurable, missing that confinement guarantees
only whole-number charges are ever detected; a further failure assumes
all six quark flavors are equally present in ordinary matter, missing
that only the lightest generation (up, down) is stable enough to persist
outside high-energy collisions.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.particle.quarks.md`, Section
4 Misconception Library) documents three; reused by reference with
birth-type added.

- **MC-1 (a powerful enough collider will eventually isolate a free
  quark)**: believing "more energy should eventually separate them, like
  splitting an atom." **Birth type**: overgeneralization (Type 1) — the
  correct intuition that enough energy separates atoms or molecules
  (where the binding force weakens with distance) is extended without
  modification to quarks, where the binding force instead grows with
  distance. Probe: "If you had an arbitrarily powerful particle
  accelerator, could you eventually pull a single quark out of a proton
  and study it alone?"
- **MC-2 (fractional charge should be directly measurable)**: believing
  "if quarks have ⅔ charge, some detector should eventually see exactly
  that fraction." **Birth type**: overgeneralization (Type 1) — the real
  and well-established existence of fractional quark charge is extended
  into an assumption that it must therefore be independently observable,
  missing that confinement means quarks are never free to be measured
  that way. Probe: "Could a very precise experiment measure a charge of
  exactly +⅔e sitting alone in a detector?"
- **MC-3 (all six quark flavors are equally present in everyday
  matter)**: believing "matter is made of quarks, and there are six
  kinds, so all six should be around us." **Birth type**:
  overgeneralization (Type 1) — learning that six flavors exist without
  learning that only two are stable at everyday energy scales leads to
  an unwarranted uniform-presence assumption. Probe: "Is there a strange
  quark or a top quark inside the atoms in this table right now?"

## Analogies

**Best**: LEGO bricks sold only in sealed sets of exactly three (baryons)
or two complementary pieces (mesons) — you can examine the finished
model and infer what pieces must be inside from its shape and color, but
the manufacturer has made it physically impossible to ever open the set
and hold one brick alone; directly targets MC-1 by reframing confinement
as a structural, unbreakable rule rather than a packaging inconvenience
that a clever-enough tool could someday circumvent.

**Anti-analogy**: do NOT say "quarks are like electrons, just smaller" —
quarks and electrons are both believed equally fundamental (point-like,
no known substructure); the real difference is that quarks feel the
strong force (and are therefore confined) while electrons do not; this
vague framing obscures the actual distinguishing property and can feed
MC-1 by implying confinement is merely a size or scale effect.

## Demonstrations

Worked-example: build the proton (uud: ⅔+⅔−⅓=+1) and neutron
(udd: ⅔−⅓−⅓=0) charge sums live from labeled quark-charge cards —
directly targets MC-2 by making the fractional-to-whole-number
transformation a concrete, checkable arithmetic exercise. Worked-example:
physically pull a rubber band until it snaps into two separate pieces,
alongside pulling apart two magnets on a spring that separate cleanly —
directly targets MC-1 by mapping the rubber band (force growing with
distance, snapping into new pieces) to quark confinement and the magnets
(force weakening with distance, clean separation) to the electromagnetic
case that does NOT apply to quarks.

## Discovery Questions

Discovery-style: "A proton has charge +1. I'm going to tell you it's
built from three pieces, each with a FRACTIONAL charge — a fraction of an
electron's charge. How can three fractions add up to a clean whole
number? Guess what fractions might work." — learner discovers (through
guided trial) the +⅔e/−⅓e charge values that make the arithmetic work,
directly confronting MC-2 by building the fractional-charge concept from
a constraint-satisfaction puzzle rather than being told the values.

## Teaching Sequence

Blueprint's Section 9 Teaching Actions cited by reference (4 actions,
session_cap 4: charge-arithmetic live build probing MC-2 → six-flavor
generation/mass table probing MC-3 → rubber-band-versus-magnet challenge
directly confronting MC-1 → deep-inelastic-scattering transfer
consolidating quarks as experimentally real despite never being seen
alone). MC-2 is addressed first via the charge-arithmetic build, before
MC-3 via the generation/mass table, before MC-1 via the rubber-band
challenge.

## Tutor Actions

WORKED-EXAMPLE (proton and neutron charge built live from quark-charge
cards); DEMONSTRATE (rubber-band-snapping versus magnet-separating
physical comparison); WORKED-EXAMPLE (six-flavor generation/mass table
with mass-based ranking of collision-energy requirements); THOUGHT-
EXPERIMENT (deep inelastic scattering as indirect but airtight evidence
of quark reality).

## Voice Teaching Notes

Listen for "eventually we'll isolate a single quark" or "all six quark
flavors should be around us" — the two most frequent misconception
tells. Load-bearing sentence: "the strong force between quarks doesn't
weaken with distance like gravity or electric attraction does — it
grows, so pulling harder never isolates a quark, it just creates a new
quark-antiquark pair instead; and only up and down quarks are light
enough to build the ordinary matter around you, the other four flavors
only exist for a fraction of a second in high-energy collisions."
Channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner claiming a free quark could eventually be isolated with enough
energy signals MC-1 (full repair via the rubber-band-versus-magnet
demonstration). A learner claiming fractional charge should be directly
measurable signals MC-2 (full repair via the proton/neutron
charge-arithmetic build). A learner claiming all six flavors are equally
present in ordinary matter signals MC-3 (full repair via the mass-table
ranking exercise). Mastery trigger: correctly computing a hadron's charge
from its quark composition, correctly explaining confinement's growing-
force mechanism (not merely restating "they're stuck"), and correctly
identifying which quark flavors build ordinary matter. Blueprint's
Section 11 Assessment (FA-1 through FA-4) cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "if a rubber band gets HARDER to stretch the more
you pull it — instead of easier, like a spring — will pulling harder
ever make it separate into one continuous piece, or will it snap into
two?" (isolating the growing-versus-weakening force distinction before
reapplying it specifically to why quarks are never isolated). See
`../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (fractional charge sums to whole numbers in hadrons; confinement
is structural, not a practical energy limitation; only up/down build
ordinary matter) bound to procedure (computing hadron charge from quark
composition; ranking quark flavors by mass to predict collision-energy
requirements). Interleave with `phys.particle.particle-classification`,
`phys.particle.hadron-quark-model`, and `phys.particle.strong-
interaction`.

## Transfer Connections

Near: computing the charge and quark composition of newly encountered
hadrons (kaons, sigma baryons) using the same charge-arithmetic method.
Far: particle accelerator experiment design (colliders built at specific
energies precisely to produce heavier quark flavors) and quark-gluon
plasma research in heavy-ion physics. Real-world: nuclear physics's
explanation of beta decay as a down quark converting to an up quark at
the constituent level. Expert: the general scientific principle that
indirect evidence (scattering patterns, charge bookkeeping) can establish
a particle's physical reality even when it is never directly, individually
observed — recurring in condensed-matter quasiparticle physics.

## Cross-Subject Connections

KG `cross_links` empty. No cross-subject connection currently
identified beyond the general indirect-evidence-of-hidden-constituents
pattern already covered under Transfer Connections — recorded honestly
as a null finding for KG-level cross-links specifically, not fixed (no
KG file modified).

## Blueprint References

Blueprint exists (`docs/curriculum/blueprints/phys.particle.quarks.md`,
numbered-Section format). Reuses: Section 4 Misconception Library by
reference. Not restated: Section 0 Concept Metadata, Section 1 Concept
Spine full formula derivations, Section 5 Explanation Library, Section 7
Demonstration Library full walkthroughs, Section 8 Discovery Lesson full
sequence, Section 11 Assessment full item text, Section 12 Recovery
Notes, Section 13 Memory and Review schedule, Section 14 Transfer Map.

## Runtime Asset References

No seeded `AssetIdentity` records — checked against `brainSeedAssets.ts`.
None created.

## Curriculum Feedback

No open issues found this batch — prerequisites, unlocks, and difficulty
calibration are internally consistent with this concept's role as the
direct prerequisite for both the hadron-quark combination model and the
full strong-interaction/confinement mechanism.

## Version History

- 2026-07-23 (physics EB Wave 18): initial authoring.
