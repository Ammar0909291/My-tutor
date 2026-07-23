# Big Bang Cosmology — `phys.astro.cosmology`

## Identity

- **Concept ID**: `phys.astro.cosmology` (canonical physics KG)
- **Curriculum location**: physics / astrophysics — dependency level 19.
- **Prerequisites**: `phys.rel.spacetime` (the four-vector/metric
  framework the Friedmann equations apply to a homogeneous, isotropic
  universe), `phys.astro.stellar-structure` (stellar nucleosynthesis
  context for the cosmic element-synthesis timeline).
- **Unlocks** (from KG): `phys.astro.dark-matter`.
- **Difficulty**: expert · **Bloom**: understand · **Mastery threshold**:
  0.75 · **Est. hours**: 8

## Learning Objective

The learner can: (1) correctly explain that the Big Bang was an
expansion of space itself, not an explosion at a specific location
within pre-existing space — Hubble's law is isotropic from every
vantage point precisely because there is no center; (2) correctly
explain that the cosmic microwave background is relic radiation from
the recombination epoch (~380,000 years after the Big Bang, when the
universe cooled enough for atoms to form and become transparent), not
light from the initial singularity itself; (3) correctly distinguish
cosmological redshift (a stretching of photon wavelength by the
expansion of space itself, valid even at recession "speeds" exceeding c
for sufficiently distant objects) from an ordinary Doppler shift, which
the simple v=cz approximation only mimics for nearby, low-redshift
sources.

## Core Understanding

The universe began ~13.8 billion years ago in an extremely hot, dense
state and has been expanding ever since, with its history recorded in
three independent observations: Hubble expansion, the cosmic microwave
background, and Big Bang nucleosynthesis. A first persistent error
pictures the Big Bang as a conventional explosion centered at some
location in pre-existing empty space, missing that Hubble's law
v=H₀d is isotropic from every vantage point with no preferred center —
because the Big Bang is an expansion of space itself, not matter
expanding into a pre-existing void. A second error takes "afterglow of
the Big Bang" literally, assuming the CMB is light from the moment of
the singularity itself, missing that the CMB was emitted at
recombination (t~380,000 years, z~1100) when the universe first became
transparent — the earliest ~380,000 years remain permanently hidden
behind an opaque, pre-recombination universe that no photon can escape.
A third error over-applies the ordinary Doppler formula to cosmological
redshift, missing that at high z the recession described by Hubble's
law can formally exceed c (permitted for space expansion in general
relativity, forbidden for material motion in special relativity) — the
correct relation 1+z=a(t₀)/a(t_emit) describes wavelength stretching by
expanding space, only approximating the Doppler form z≈v/c for small,
nearby redshifts.

## Mental Models

**Beginner**: "The Big Bang exploded from a center; the CMB is the glow
of that initial explosion; distant galaxies are redshifted because
they're moving away, exactly like an ordinary Doppler shift." Upgrade
trigger: noting that Hubble's law shows every galaxy receding
isotropically from every vantage point, with no detectable center,
directly confronts the explosion-from-a-center assumption; computing the
CMB's z~1100 and connecting it to a specific epoch (recombination, not
t=0) directly confronts the initial-glow assumption; computing that a
z~5.4 galaxy would require v>c under the naive Doppler formula directly
confronts the Doppler-shift overextension.

**Intermediate**: "The Big Bang is space itself expanding, isotropic
from any point, with no center; the CMB is relic radiation from
recombination (z~1100), not the initial singularity; cosmological
redshift is a wavelength-stretching effect described by
1+z=a(t₀)/a(t_emit), only approximating Doppler for small z." This model
correctly captures the three key distinctions but may still need
practice distinguishing comoving distance from light-travel distance
when reasoning about the size of the observable universe.

**Advanced**: always distinguish light-travel distance from comoving
(proper, current) distance when discussing "how far away" a
high-redshift object is, and always use the full 1+z=a(t₀)/a(t_emit)
relation rather than the Doppler approximation for z not small.

**Expert**: the connection between the Friedmann equations and general
relativity's Robertson-Walker metric applied to a homogeneous, isotropic
universe (making the scale factor a(t) the master variable of cosmic
history) and the ΛCDM energy budget (5% ordinary matter, 27% dark
matter, 68% dark energy) as the current standard model — not required
for mastery, natural bridge to `phys.astro.dark-matter`.

## Why Students Fail

The dominant failure is picturing the Big Bang as an explosion centered
somewhere in pre-existing space, missing that it is an expansion of
space itself with no center or edge, evidenced by Hubble's law's
isotropy from any vantage point; a closely related failure takes "Big
Bang afterglow" literally for the CMB, missing that it dates specifically
to the recombination epoch (~380,000 years, z~1100), not the initial
singularity; a further failure over-applies the ordinary Doppler formula
to cosmological redshift at high z, missing that the correct description
is a general-relativistic stretching of space itself, not material
motion through a medium; a final failure equates the observable
universe's radius with the light-travel distance (13.8 billion light-
years), missing that continued expansion during the light's transit
makes the true comoving radius (~46 billion light-years) substantially
larger.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.astro.cosmology.md`, Section
4 Misconception Library) documents four; reused by reference with
birth-type added.

- **MC-1 (the Big Bang occurred at a specific location in space)**:
  believing "at the center of the universe, wherever that is." **Birth
  type**: analogy overextension (Type 6) — the familiar conventional-
  explosion schema (center, edge, expansion into existing space) is
  applied wholesale to cosmological expansion, missing that space itself
  is what expanded, so there is no center or edge to locate. Probe:
  "Where did the Big Bang happen?"
- **MC-2 (the CMB is light from the moment of the Big Bang)**: believing
  "it's the afterglow of the Big Bang explosion." **Birth type**:
  language contamination (Type 3) — the popular-science phrase "Big Bang
  afterglow" is interpreted literally as light from t=0, missing that
  the CMB specifically dates to the recombination epoch (t~380,000
  years) when the universe first became transparent. Probe: "What is the
  cosmic microwave background?"
- **MC-3 (cosmological redshift is a Doppler shift)**: believing "they're
  moving away from us, so we see a Doppler shift." **Birth type**:
  overgeneralization (Type 1) — the correct-for-nearby-galaxies Doppler
  approximation is extended without qualification to all redshifts,
  missing that high-z cosmological redshift is fundamentally a
  space-stretching effect, not material motion. Probe: "Why are distant
  galaxies redshifted?"
- **MC-4 (the observable universe is 13.8 billion light-years in
  radius)**: believing "13.8 billion light-years — because that's how
  long light has had to travel." **Birth type**: overgeneralization
  (Type 1) — the static-universe intuition that light-travel distance
  equals light-travel-time times c is applied without accounting for
  continued expansion during the photon's transit. Probe: "How large is
  the observable universe?"

## Analogies

**Best**: raisin bread dough expanding in an oven — raisins (galaxies)
embedded in the expanding dough (space) see every other raisin receding,
with raisins farther away receding faster because more dough lies
between them, and no raisin is the center; directly targets MC-1 by
making the no-center, isotropic-expansion structure a concrete, visible
image rather than an abstract denial.

**Anti-analogy**: do NOT say "distant galaxies are just moving away from
us fast, like a Doppler shift" without immediately qualifying that this
approximation only holds for small, nearby redshifts — this vague
framing directly feeds MC-3, especially since Hubble's law permits
recession "speeds" exceeding c for sufficiently distant objects, which
the Doppler formula alone cannot accommodate.

## Demonstrations

Worked-example: compute the CMB temperature from the recombination
temperature and redshift, T_CMB=T_recomb/(1+z)=3000/1100≈2.73 K —
directly targets MC-2 by grounding the CMB's origin in a specific,
computable epoch rather than the initial singularity. Worked-example: a
distant galaxy's Lyman-alpha line observed at λ=780 nm (rest wavelength
121.6 nm) gives z≈5.4, and the naive Doppler approximation v≈zc would
imply v≈5.4c, exceeding the speed of light — directly targets MC-3 by
exhibiting the Doppler approximation's concrete breakdown at high z,
motivating the full expansion-of-space description.

## Discovery Questions

Discovery-style: "Plot recession velocity versus distance for a set of
galaxies. What is the slope? If this rate has been constant, when were
all galaxies at the same point?" — learner discovers Hubble's law
(v=H₀d) and the resulting age estimate (~1/H₀) directly from data,
setting up the isotropy observation (no preferred direction or center)
that directly confronts MC-1 before any explicit correction is given.

## Teaching Sequence

Blueprint's Section 9 Teaching Actions cited by reference (3 actions,
session_cap 3: rubber-sheet/raisin-bread analogy for isotropic
no-center expansion → CMB temperature calculation from z~1100 → Big Bang
nucleosynthesis n/p≈1/7 prediction compared to observed helium
abundance). MC-1 is addressed first via the raisin-bread analogy and
Hubble-diagram isotropy discussion, before MC-2 via the CMB temperature
calculation, before MC-3 via the high-z Doppler-breakdown demonstration,
with MC-4 addressed throughout via the comoving-versus-light-travel-
distance distinction.

## Tutor Actions

WORKED-EXAMPLE (CMB temperature computed from the recombination redshift
z~1100); WORKED-EXAMPLE (Big Bang nucleosynthesis neutron-proton
freeze-out ratio predicting a ~25% helium mass fraction, matched against
observation); THOUGHT-EXPERIMENT (a z=5.4 galaxy's naive Doppler
"velocity" exceeding the speed of light, motivating the expansion-of-
space description); ANALOGY (raisin bread dough expanding in an oven,
with no raisin as the center).

## Voice Teaching Notes

Listen for "where did the Big Bang happen" treated as a meaningful
location question, "the CMB is the glow of the Big Bang itself," or
"redshift means they're moving away, like a Doppler shift" — the most
frequent misconception tells. Load-bearing sentence: "the Big Bang
wasn't an explosion in space, it was an explosion of space itself, so
there's no center and no edge; the cosmic microwave background isn't
light from the very beginning, it's light from four hundred thousand
years later, when the universe first became transparent; and
cosmological redshift is space itself stretching the light's wavelength
during its journey, which is why it can describe recession 'speeds' that
would be impossible for an ordinary Doppler shift." Channel-reality
caveats owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner asking where the Big Bang happened as if it has a location
signals MC-1 (full repair via the raisin-bread analogy and isotropy
discussion). A learner describing the CMB as light from the initial
singularity signals MC-2 (full repair via the recombination-epoch
temperature calculation). A learner attributing cosmological redshift to
ordinary Doppler motion signals MC-3 (full repair via the high-z
superluminal-velocity breakdown). A learner equating the observable
universe's radius with 13.8 billion light-years signals MC-4 (full
repair via the comoving-versus-light-travel-distance distinction).
Mastery trigger: correctly explaining Hubble's law and its isotropy,
correctly computing the CMB temperature from its recombination origin,
and correctly stating all three independent observational pillars for
the Big Bang. Blueprint's Section 11 Assessment (FA-1 through FA-4)
cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "if you drew dots all over a balloon and then
inflated it, would any one dot be 'the center' that all the others move
away from, or would every dot see every other dot receding equally?"
(isolating the no-center, isotropic-expansion structure before
reapplying it specifically to why the Big Bang has no location). See
`../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (Big Bang is space expanding, no center; CMB dates to
recombination at z~1100, not t=0; cosmological redshift stretches
wavelength via expanding space, only approximating Doppler at low z;
comoving distance exceeds light-travel distance) bound to procedure
(computing CMB temperature from a given redshift; distinguishing
comoving from light-travel distance; applying Hubble's law to estimate
cosmic age). Interleave with `phys.rel.spacetime`, `phys.astro.stellar-
structure`, and `phys.astro.dark-matter`.

## Transfer Connections

Near: Type Ia supernovae as standard candles for measuring cosmic
expansion history, CMB anisotropy analysis as a diagnostic of
early-universe physics. Far: particle physics at early-universe energies
(the early universe as the highest-energy physics laboratory that ever
existed, constraining the number of neutrino species via BBN) and
large-scale structure formation (CMB temperature fluctuations ΔT/T~10⁻⁵
as the seeds of all galaxies and clusters). Real-world: the historic
1998 discovery of accelerated cosmic expansion via Type Ia supernovae,
implying nonzero dark energy. Expert: the Friedmann equations as
general relativity's Robertson-Walker metric applied to a homogeneous,
isotropic universe, directly connecting to `phys.rel.spacetime`.

## Cross-Subject Connections

KG `cross_links` empty. No cross-subject connection currently
identified beyond the general early-universe-particle-physics link
already covered under Transfer Connections — recorded honestly as a
null finding for KG-level cross-links specifically, not fixed (no KG
file modified).

## Blueprint References

Blueprint exists (`docs/curriculum/blueprints/phys.astro.cosmology.md`,
numbered-Section format). Reuses: Section 4 Misconception Library by
reference. Not restated: Section 0 Concept Metadata, Section 1 Concept
Spine full formula derivations, Section 5 Explanation Library, Section 6
Analogy Library full breaking-point/anti-analogy detail, Section 7
Demonstration Library full numeric walkthroughs, Section 8 Discovery
Lesson full sequence, Section 11 Assessment full item text, Section 12
Recovery Notes, Section 13 Memory and Review schedule, Section 14
Transfer Map.

## Runtime Asset References

No seeded `AssetIdentity` records — checked against `brainSeedAssets.ts`.
None created.

## Curriculum Feedback

No open issues found this batch — prerequisites, unlocks, and difficulty
calibration are internally consistent with this concept's role bridging
relativity and stellar physics into the Astrophysics domain's
cosmological capstone, directly preparing for dark matter.

## Version History

- 2026-07-23 (physics EB Wave 19): initial authoring.
