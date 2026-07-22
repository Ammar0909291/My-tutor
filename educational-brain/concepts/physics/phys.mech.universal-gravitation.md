# Newton's Law of Universal Gravitation — `phys.mech.universal-gravitation`

## Identity

- **Concept ID**: `phys.mech.universal-gravitation` (canonical physics KG)
- **Curriculum location**: physics / mechanics — dependency level 6 (per
  `AUTHORING_QUEUE.md`), the first gravitation-specific concept beyond the
  generic force/acceleration machinery.
- **Prerequisites**: `phys.mech.newtons-second-law` — the load-bearing part
  is F = ma itself: universal gravitation is introduced as a specific force
  law that gets plugged into the already-secure F = ma framework, not a new
  kind of mechanics.
- **Unlocks** (from KG): `phys.astro.stellar-structure` (gravity as the
  force holding stars together against their own pressure), `phys.mech.gravitational-field`
  (reframing the force law as a field surrounding any mass).
- **Difficulty**: proficient · **Bloom**: apply · **Mastery threshold**: 0.80
  · **Est. hours**: 4

## Learning Objective

The learner can: (1) state Newton's law of universal gravitation, F = Gm₁m₂/r²,
and correctly identify which quantities it depends on (both masses, separation
distance) and which it does not (composition, shape, whether the masses are
touching); (2) correctly compute how the gravitational force between two
masses changes when either mass or the separation distance is scaled by a
given factor, using the inverse-square relationship; (3) correctly explain why
gravity is universal — it acts between literally any two masses, not just
between a planet and objects on its surface; (4) correctly distinguish "the
force stops at some distance" from the true behavior — the force weakens
continuously with distance but is mathematically nonzero at any finite
separation.

## Core Understanding

Every pair of masses in the universe attracts each other with a force whose
magnitude is F = Gm₁m₂/r², where G is a single universal constant
(6.674×10⁻¹¹ N·m²/kg²) that is the same everywhere and for every pair of
masses — nothing about the objects' composition, shape, or history matters,
only their mass and the distance between their centers. This is the same
force, quantitatively, whether it is holding the Moon in orbit, making an
apple fall, or acting (immeasurably weakly) between two people standing in a
room — Newton's insight was precisely that these are not three different
phenomena requiring three different explanations, but one single law applied
at three different scales. The force is always attractive, always present at
any finite separation (falling off as 1/r² but never reaching exactly zero),
and always acts along the line connecting the two masses' centers.

## Mental Models

**Beginner (arriving model, often already wrong)**: "Gravity is a property
Earth has, and it pulls things down." This model treats gravity as
Earth-specific and direction-specific ("down"), with no sense that gravity is
a general mass-mass interaction. Upgrade trigger: showing that the Moon's
orbit and an apple's fall are explained by the exact same force law
(Newton's own unifying argument) forces the "gravity = Earth pulling down"
model to expand into "gravity = any two masses pulling toward each other."

**Intermediate**: "Gravity is a universal attractive force between any two
masses, following an inverse-square law." This model correctly generalizes
beyond Earth but often treats the inverse-square relationship as a rule to
apply mechanically without yet reasoning fluently about how doubling distance
or mass changes the force. Shelf-life warning: this model is fully correct as
far as it goes, but will feel incomplete once the learner meets orbital
mechanics, where the force law must be combined with circular-motion
reasoning (centripetal force = gravitational force) to derive orbital
periods and radii.

**Advanced**: "Gravitational force is the source term for a gravitational
field, g = Gm/r², that exists at every point in space around a mass, whether
or not anything is there to feel it." This model reframes force as a
field property of the source mass alone — directly setting up
`phys.mech.gravitational-field`, the immediate unlock.

**Expert**: "Newtonian gravitation is the weak-field, low-velocity limit of
general relativity's description of spacetime curvature; it is exquisitely
accurate for essentially all everyday and most astronomical calculations, but
breaks down in extreme regimes (near black holes, for GPS timing precision,
for Mercury's orbital precession) where relativistic corrections matter."
This model is not required for mastery of this concept, but should be
mentioned as a genuine "this simplification has known limits" flag rather
than presented as absolute truth with no further layer.

## Why Students Fail

The dominant failure mode is scale-blindness: students who have only ever
experienced gravity as "the thing that makes objects fall to the ground" have
no intuitive sense that the same force, following the same equation, is
responsible for planetary orbits, tides, and the structure of galaxies —
and separately, that the inverse-square relationship means the force never
truly reaches zero, just becomes too small to notice, which conflicts with an
intuitive sense that "far enough away, there's no gravity at all."

## Misconceptions

This concept's Blueprint (`docs/curriculum/blueprints/phys.mech.universal-gravitation.md`,
Component 3 — Misconception Engine) already documents two misconceptions in
full (trigger, conflict evidence, bridge, replacement text) — reused by
reference below, with only the birth-type classification added, per
`../misconceptions/01-birth-taxonomy.md`.

- **MC-GRAVITY-STOPS** (Blueprint Priority 1): the belief that gravity has a
  finite range and simply stops beyond some altitude or distance (e.g.,
  "there's no gravity in space," a phrase that conflates weightlessness in
  orbit with the actual absence of gravitational force, which is in fact
  still present and doing the work of holding the orbit together). **Birth
  type**: overgeneralization (Type 1) — from everyday experience where
  gravity's effect becomes imperceptible a few meters up, generalized
  incorrectly to "gravity has a cutoff," compounded by language contamination
  (Type 3) from the popular phrase "zero gravity" describing orbital
  weightlessness. Detection probe: "Does the International Space Station,
  orbiting about 400 km up, experience Earth's gravity? If astronauts float,
  why don't they fly off into space?" A student giving "there's no gravity up
  there" is showing MC-GRAVITY-STOPS.
- **MC-INVERSE-LINEAR** (Blueprint Priority 2): the belief that gravitational
  force decreases linearly with distance (double the distance, half the
  force) rather than as the inverse square (double the distance, quarter the
  force). **Birth type**: notation-induced (Type 4) — the "1/r²" is often
  misread or under-attended, with students defaulting to the simpler, more
  familiar linear "1/r" pattern seen in some other contexts. Detection probe:
  "If you triple the distance between two masses, what happens to the
  gravitational force between them?" An answer of "one third" (rather than
  "one ninth") reveals MC-INVERSE-LINEAR.

## Analogies

**Best analogy — the universal handshake.** Every mass in the universe
"reaches out" to every other mass with a pull whose strength depends only on
how much mass each has and how far apart they are — like every person in a
crowd being connected to every other person by an invisible, ever-present
handshake whose grip strength depends only on the two people's "weight" and
how far apart they're standing, never on who they are, what they're wearing,
or how they've behaved. **Breaking point**: handshakes are chosen and
occasional; gravity is unconditional, unbreakable, and always present for
every pair of masses, with no possibility of choosing not to participate.

**Alternative analogy — spreading light intensity.** The inverse-square
falloff of gravitational force is mathematically the same pattern as how a
light bulb's brightness falls off with distance (spread over an
ever-larger sphere as you move away) — useful specifically for building
intuition about why doubling distance gives one-quarter the effect, not
one-half. **Breaking point**: light can be blocked by an opaque object;
gravity cannot be shielded by any known material — every mass's
gravitational pull passes through matter untouched.

**Story analogy**: Newton's own (likely embellished, but pedagogically
durable) apple story — watching an apple fall and wondering whether the same
force reaches all the way to the Moon — is worth telling not as trivia but as
the actual conceptual leap this concept requires: extending a phenomenon
you've only ever seen at your own scale to a phenomenon happening
astronomically far away.

**Visual analogy**: a field-line diagram showing arrows pointing toward a
central mass, growing sparser (weaker) at greater distances but never
reaching zero density anywhere in the diagram — directly countering
MC-GRAVITY-STOPS visually.

**Anti-analogy**: do NOT describe gravity as "like a magnet" without an
immediate, explicit caveat — magnetism requires specific magnetic materials
and can attract or repel depending on pole orientation; gravity acts on
literally all mass, always attractively, with no equivalent to "poles." Left
unqualified, the magnet analogy installs an expectation that gravity might
someday repel, or might only affect "gravity-sensitive" materials — both
false.

## Demonstrations

**Physical**: hold two objects of very different mass at the same height and
drop them simultaneously (a classic, easily reproducible demonstration) —
they land together, which surfaces the (separate, but often co-occurring)
misconception that heavier objects fall faster, and sets up the point that
gravitational force scales with mass but so does the resistance to
acceleration (inertia), so acceleration itself is mass-independent — worth
flagging explicitly as a distinct point from this concept's own two MCs.

**Digital/interactive**: an inverse-square-law simulator where the learner
drags two masses closer/farther apart and watches a force-meter update in
real time, with a prediction elicited (see below) before each drag.

**Teacher-demo with elicited prediction**: before revealing the actual
1/r² relationship, ask "if I double the distance between these two masses,
what do you predict happens to the force — half, a quarter, or something
else?" and have students commit to a prediction before any calculation is
shown — directly surfacing MC-INVERSE-LINEAR for diagnosis before
instruction.

## Discovery Questions

**Argued call: direct instruction wins here**, not full 6-step discovery
design. Reasoning: the specific numerical form of the law (F = Gm₁m₂/r²,
with G a measured, not derived, constant) is a historical empirical
discovery, not something a learner can plausibly re-derive from first
principles in a single session — Newton himself required Kepler's decades of
orbital data to arrive at it. What IS worth eliciting through guided
questioning is the conceptual leap (same force, three scales) and the
qualitative shape of the relationship (weaker with distance, stronger with
more mass) before the exact exponent is revealed — but the discovery
questions here should be framed as "what pattern do you notice in this data"
(e.g., presenting orbital periods at different distances and asking what
relationship would explain them) rather than a full need→playground→
invention arc, since the invention step (deriving 1/r² specifically) is not
a reasonable ask.

## Teaching Sequence

This concept's Blueprint (Component 4 — Teaching Action Sequence) provides
the turn-by-turn session script; cited by reference rather than restated.
The concept-specific sequencing logic this entry adds: MC-GRAVITY-STOPS must
be surfaced and repaired BEFORE introducing the gravitational-field
reframing (the Advanced mental model), because a student who still believes
gravity has a hard cutoff will misinterpret "the field exists everywhere
around a mass" as contradicting, rather than restating, what they already
believe — repair the finite-range misconception first, using the ISS
question, then the field language lands as a natural restatement rather than
a fight. MC-INVERSE-LINEAR should be surfaced early, via the elicited
prediction (Demonstrations, above), before any worked calculation — a
student who has not had this misconception surfaced and corrected will
mis-execute every subsequent 1/r² calculation even while appearing to
"know the formula."

## Tutor Actions

From `../teaching-actions/*`: WORKED-EXAMPLE (computing force at two
different separations to make the 1/r² scaling concrete numerically) and
ERROR-ANALYSIS (presenting a worked "half the force at double distance"
error and having the learner find what's wrong) both fit well here, directly
targeting MC-INVERSE-LINEAR. THOUGHT-EXPERIMENT (the ISS weightlessness
question) fits well for MC-GRAVITY-STOPS. GAME does not fit well here — this
concept's core difficulty is a specific mathematical relationship and a
specific factual correction, neither of which benefits from game-skin
dressing (per the chocolate-covered-broccoli guard in
`../teaching-actions/*`); a game risks obscuring exactly the numerical
precision this concept requires.

## Voice Teaching Notes

Listen for the phrase "no gravity" or "zero gravity" used casually when
discussing space or orbit — this is the single most diagnostic verbal tell
for MC-GRAVITY-STOPS and should trigger an immediate, gentle probe ("no
gravity at all, or just less than we're used to?") rather than a direct
correction, since the phrase is so embedded in casual astronomy language that
correcting it bluntly can feel like a "gotcha." The load-bearing sentence to
slow down on is the inverse-square statement itself — "the force falls off
as one over the distance SQUARED" — since rushing this sentence is exactly
how the linear-vs-quadratic distinction (MC-INVERSE-LINEAR) gets lost.
General channel-reality caveats for voice-based detection are owned by
`../foundations/03-voice-first-learning-model.md §7`; not repeated here.

## Assessment Signals

A fast, confident "half the force" answer to the doubling-distance probe is
a strong MC-INVERSE-LINEAR signal — fast because the linear relationship is
the more automatic, over-learned pattern, confident because the student
isn't aware there's a subtlety to get wrong. A slow, hedged "quarter... I
think?" answer suggests partial correct knowledge without full confidence —
appropriate for FRAGILE-quadrant handling (D1 grid) rather than a full
misconception-repair chain. Mastery-certification trigger: the learner
correctly computes the force-scaling factor for at least two different
distance-multiplier scenarios (not just the doubling case, which risks
being a memorized special case) without external cueing, plus correctly
answers the ISS/weightlessness question with the correct gravity-is-still-
acting explanation. This concept's Blueprint (Component 5 — Mastery Probe
Bank) contains the full item bank; check there before authoring new items.

## Tutor Recovery Strategy

Likeliest Recovery Engine trigger here: "I don't get it" following an
attempted 1/r² calculation, most often because the student is trying to
hold both the squaring operation and the inverse relationship in mind
simultaneously and losing track of which applies when. Concept-specific
shrink-to question: "Forget the formula for a second — if two masses get
farther apart, does the pull get stronger or weaker?" (isolating just the
direction of the relationship before re-introducing the specific exponent).
See `../foundations/01-recovery-engine.md` for the generic engine mechanics.

## Memory Hooks

Concept type: procedure (the force-scaling calculation) bound to a concept
(universality, the "same force at every scale" idea) — this dual nature
means review should alternate between a quick calculation retrieval ("what
happens to force if distance triples?") and a conceptual-explanation
retrieval ("explain why the same law describes an apple falling and the
Moon orbiting"), not just one or the other. Interleaving partners:
`phys.mech.newtons-second-law` (the F = ma frame this force law plugs into)
and, once authored, `phys.mech.gravitational-field` (the field reframing) —
mixing gravitation problems with generic F = ma problems helps prevent the
misconception that gravitation requires a wholly separate solution method.

## Transfer Connections

**Near transfer**: any two-body force-and-motion problem where a specific
force law must be combined with F = ma — the "identify the force law, plug
into F = ma, solve for the requested quantity" pattern transfers directly
to Coulomb's law problems (a mathematically identical inverse-square form).
**Far transfer**: tidal effects (why the Moon's gravity affects Earth's
oceans more on the near side than the far side — a direct consequence of
the inverse-square law's sensitivity to distance) and satellite orbit
design (choosing an orbital altitude requires balancing gravitational force
against desired orbital period, a direct engineering application).
**Real-world transfer**: understanding why astronauts in orbit are not
"escaping gravity" but are in continuous free-fall around the Earth — a
common point of public confusion this concept directly resolves.
**Expert-transfer**: the inverse-square law's mathematical form (any
"stuff spreading out from a point source in 3D space" phenomenon falls off
as 1/r²) recurs in electric fields, light intensity, and sound intensity —
recognizing this as one shared geometric pattern, not three separate laws
to memorize, is a hallmark of expert-level physics reasoning.

## Cross-Subject Connections

The KG's `cross_links` field is empty for this concept (verified against
`docs/physics/kg/graph.json`) — no cross-subject links are currently
encoded. A genuine, KG-unencoded connection exists to mathematics
(inverse-square/inverse-variation functions, `math.func.*` — not yet
enumerated as a specific cross_link) and to astronomy content within physics
itself (`phys.astro.stellar-structure`, already captured as a KG `unlocks`
edge, not a `cross_links` edge, so it is a same-subject dependency rather
than a genuine cross-subject connection). Recorded as Curriculum Feedback
below: the empty `cross_links` array may be an under-populated field rather
than a genuine absence of cross-subject relevance, given how directly this
concept's mathematical form recurs in electromagnetism.

## Blueprint References

A Blueprint exists: `docs/curriculum/blueprints/phys.mech.universal-gravitation.md`
(Component-format, `## Component 0` through `## Component 9`). This entry
reuses by reference: **Component 3 — Misconception Engine** (both
misconceptions, cited above with birth-type classification added, not
re-derived), **Component 4 — Teaching Action Sequence** (the turn-by-turn
session script, cited in Teaching Sequence above rather than restated), and
**Component 5 — Mastery Probe Bank** (the full assessment item bank, cited
in Assessment Signals above rather than restated). This entry does NOT
restate Component 1 (Concept Spine), Component 6 (Formative Assessment
Strategy), Component 7 (Anxiety & Confidence Protocols), or Component 8
(Spaced Retrieval & Interleaving Plan) — those remain the Blueprint's sole
content.

## Runtime Asset References

No seeded `AssetIdentity` records exist for this concept — checked against
`src/lib/teaching/assets/brainSeedAssets.ts` (the current seed file covers
only the 4 original Delivery-5 concept entries: `math.arith.fractions`,
`phys.mech.newtons-first-law`, `eng.phonics.letter-sound-correspondence`,
plus subsequently seeded batches for other subjects — `phys.mech.universal-gravitation`
is not among them). No assets are created as part of authoring this entry,
per the Standard's explicit prohibition on seeding as an automatic
consequence of concept-entry authoring.

## Curriculum Feedback

The KG's `cross_links` field is empty for this concept despite a strong,
genuine mathematical-form connection to Coulomb's law (`phys.em.coulombs-law`)
via the shared inverse-square structure — both concepts would benefit
pedagogically from an explicit cross-subject or cross-domain transfer
probe, but the KG currently encodes no such edge for either concept (checked:
`phys.em.coulombs-law`'s own `cross_links` is also empty). Flagged for the
Curriculum Production Pipeline's own backlog, not fixed here.

## Version History

- 2026-07-22 (this session, physics EB Wave 6 — first entry authored under
  `EDUCATIONAL_BRAIN_STANDARD.md` v1.0 for this subject): initial authoring.
