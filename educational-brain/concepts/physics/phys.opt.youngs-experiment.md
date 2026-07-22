# Young's Double-Slit Experiment — `phys.opt.youngs-experiment`

## Identity

- **Concept ID**: `phys.opt.youngs-experiment` (canonical physics KG)
- **Curriculum location**: physics / optics — dependency level 6, the
  historically pivotal experiment establishing light's wave nature.
- **Prerequisites**: `phys.opt.wave-optics` (light treated explicitly as a
  wave, the precondition for interference reasoning to apply at all) and
  `phys.wave.interference` (the load-bearing part: the double-slit pattern
  IS an interference pattern, the same superposition principle already
  established for generic waves, now applied specifically to light).
- **Unlocks** (from KG): `phys.opt.diffraction` (extending single-source
  interference reasoning to the broader wave-diffraction phenomena a single
  slit or aperture produces on its own).
- **Difficulty**: proficient · **Bloom**: apply · **Mastery threshold**: 0.85
  · **Est. hours**: 5

## Learning Objective

The learner can: (1) explain why passing light through two closely-spaced
narrow slits produces a pattern of alternating bright and dark fringes on a
screen, in terms of constructive and destructive interference between the
light waves emerging from each slit; (2) correctly compute fringe spacing
(or fringe position) given slit separation, wavelength, and screen
distance, using the small-angle double-slit relation; (3) correctly predict
how fringe spacing changes when slit separation, wavelength, or screen
distance is changed independently, including correctly reasoning that
increasing slit separation makes fringes CLOSER together, not farther
apart; (4) correctly explain why the central fringe is always the brightest
and located exactly at the point equidistant from both slits (zero path
difference), and correctly identify this location for asymmetric setups.

## Core Understanding

When coherent light (light with a fixed, definite phase relationship — in
Young's original experiment, achieved by passing sunlight through a single
narrow slit first, ensuring both subsequent slits are illuminated by
identical wavefronts) passes through two closely-spaced narrow slits, each
slit acts as a new source of circular (cylindrical) wavefronts, per
Huygens' principle. At any point on a distant screen, light from the two
slits arrives having traveled slightly different path lengths; where this
path difference is a whole number of wavelengths, the two waves arrive in
phase and interfere constructively (a bright fringe); where the path
difference is a half-integer number of wavelengths, they arrive exactly out
of phase and interfere destructively (a dark fringe). Because slit
separation d is very small compared to the screen distance L, the fringe
spacing on the screen is given (for small angles) by Δy = λL/d — critically,
fringe spacing is INVERSELY proportional to slit separation: a WIDER slit
separation produces path-difference changes more rapidly across the screen,
producing CLOSER-together fringes, the opposite of a naive "wider slits,
wider spread" intuition. The central fringe (directly between the two slits,
at zero path difference for any point equidistant from both) is always
bright, since zero path difference is always exactly constructive
interference (a path difference of zero wavelengths, trivially a whole
number), and this landmark fringe is the reference point from which all
other fringe positions are measured.

## Mental Models

**Beginner (arriving model, often already wrong)**: "Light passing through
two slits should just produce two bright spots (one behind each slit), or a
single wide bright region." This model treats light as behaving like a
stream of particles or as a simple beam that either passes through a slit or
doesn't, with no wave-interference behavior anticipated at all. Upgrade
trigger: showing an actual double-slit interference pattern (multiple
fringes, not two spots) directly confronts the two-spots expectation with
an observed pattern the beginner model cannot explain.

**Intermediate**: "The two slits act as two coherent wave sources, and the
resulting pattern of bright and dark fringes comes from constructive and
destructive interference depending on path difference." This model
correctly captures the interference mechanism, but often applies the
Δy = λL/d formula mechanically without a robust intuition for HOW each
variable affects fringe spacing — in particular, the inverse relationship
between slit separation and fringe spacing is frequently mis-predicted in
the wrong direction. Shelf-life warning: this model, without the
inverse-relationship intuition explicitly built, will produce systematically
wrong predictions whenever a problem varies slit separation rather than
just asking for a direct formula plug-in.

**Advanced**: "Fringe spacing is inversely proportional to slit separation
because a larger d produces a more RAPID path-difference change per unit
screen distance, packing the same sequence of constructive/destructive
conditions into a smaller physical span on the screen." This model explains
WHY the inverse relationship holds, rather than just stating it, enabling
correct qualitative predictions without needing to re-derive or
mis-remember which direction the formula goes.

**Expert**: "Young's experiment was historically decisive because it
produced a result (an interference pattern with fringe spacing dependent on
wavelength) that a strictly particle-based (corpuscular) theory of light,
dominant at the time, could not explain — the experiment's real significance
is as a specific, falsifiable test that distinguished between two competing
physical theories of light's fundamental nature, not merely as a source of
a computational formula." Not required for mastery, but worth flagging as
the historical-epistemological significance for a student ready for it.

## Why Students Fail

The dominant failure mode is directional-intuition failure on the
slit-separation relationship: because "wider apart" intuitively suggests
"more spread out" in countless everyday contexts (wider speakers produce a
wider stereo image, a wider light source produces a more spread-out shadow
penumbra), students default to predicting that increasing slit separation
increases fringe spacing, exactly the opposite of the true inverse
relationship, unless this specific intuition is directly and explicitly
confronted.

## Misconceptions

This concept's Blueprint (`docs/curriculum/blueprints/phys.opt.youngs-experiment.md`,
Component 3 — Misconception Engine) documents two misconceptions in full;
reused by reference with birth-type classification added.

- **MC-FRINGE-WIDTH-INCREASES-WITH-SLIT-SEPARATION (Priority 1)**: the
  belief that increasing the distance between the two slits increases the
  fringe spacing on the screen, rather than decreasing it (the true
  inverse relationship, Δy = λL/d). **Birth type**: overgeneralization
  (Type 1) — a broadly reliable everyday heuristic ("wider apart sources
  produce a wider spread of effect") is incorrectly extended to
  interference fringe spacing, which behaves in the opposite direction
  because fringe spacing depends on the RATE of path-difference change,
  not a simple geometric spread. Detection probe: "If you increase the
  distance between the two slits while keeping everything else the same,
  do the fringes on the screen get closer together or farther apart?" An
  answer of "farther apart" reveals this misconception.
- **MC-CENTRAL-FRINGE-IS-ALWAYS-AT-CENTER (Priority 2)**: the belief that
  the brightest, central fringe is always located at the exact geometric
  center of the screen (the midpoint between where the two slits would
  project straight through), regardless of the specific experimental
  setup — failing to recognize that the central (zero-path-difference)
  fringe's location depends on the actual symmetry of the setup, and in an
  asymmetric arrangement (e.g., the light source not equidistant from both
  slits, or the screen not perpendicular to the slit plane) the brightest
  fringe shifts away from the naive geometric center. **Birth type**:
  overgeneralization (Type 1) — the standard, symmetric textbook diagram
  (source centered, screen perpendicular) is the only configuration most
  students ever see, so the coincidence that "central fringe = geometric
  center" in that ONE configuration is overgeneralized into a universal
  rule rather than understood as a consequence of that setup's particular
  symmetry. Detection probe: "In a standard symmetric double-slit setup,
  the brightest fringe is at the geometric center. Would this still be
  true if the light source were moved so it was much closer to one slit
  than the other?" An answer of "yes, it's always at the center" reveals
  this misconception.

## Analogies

**Best analogy — ripples from two dropped stones.** Drop two stones into a
still pond at the same time, close together, and watch the resulting
overlapping ripple patterns — regions where two wave crests coincide
produce extra-high water (constructive interference, analogous to a bright
fringe), while regions where a crest meets a trough produce calm, nearly
flat water (destructive interference, analogous to a dark fringe). Moving
the two stones closer together or farther apart before dropping them changes
the ripple interference pattern's spacing in the same inverse-relationship
direction as light through two slits, offering a directly observable,
intuitive analog for the counter-intuitive inverse relationship. **Breaking
point**: water ripples are visible and slow enough to watch directly, while
light's interference pattern is the RESULT built up from a much faster,
invisible wave process — the analogy is for the interference mechanism and
the geometric inverse-relationship pattern, not for visualizing light waves
literally.

**Alternative analogy — two loudspeakers playing the same tone.** Standing
in a room with two speakers playing an identical pure tone, a listener
walking across the room passes through spots of louder and quieter sound (an
audible interference pattern) — moving the speakers closer together changes
the spacing of loud/quiet spots, providing an audible (rather than visual)
analog reinforcing that interference-pattern spacing depends on source
separation in the same inverse-relationship way.

**Story analogy**: Thomas Young's own 1801 experiment and its historical
context — presented at a time when Newton's particle theory of light was
scientific orthodoxy, and Young's interference results were initially
resisted specifically because they seemed to require light to behave as a
wave, contradicting Newton's authority — is a genuinely motivating story
about how strong, well-supported physical evidence can and should overturn
even long-established scientific consensus.

**Visual analogy**: a ray/wavefront diagram showing the two slits as
sources of expanding circular wavefronts, with the resulting fringe pattern
directly traced from where wavefront crests overlap (bright) versus where a
crest overlaps a trough (dark) — this diagram, drawn with two different
slit-separation values side by side, directly and visually counters
MC-FRINGE-WIDTH-INCREASES-WITH-SLIT-SEPARATION by showing the actual
resulting spacing change.

**Anti-analogy**: do NOT describe increasing slit separation as
"spreading the light sources further apart, so the pattern spreads too" —
this framing directly installs MC-FRINGE-WIDTH-INCREASES-WITH-SLIT-SEPARATION
by analogizing to a simple, non-interference "spread" intuition rather than
the actual path-difference-rate mechanism.

## Demonstrations

**Physical**: a laser pointed through an actual double-slit slide (widely
available as an inexpensive physics demonstration kit) projected onto a
distant wall or screen, with slit-separation slides of different spacing
available to directly compare fringe patterns — the single most convincing
demonstration for this concept, since the counter-intuitive inverse
relationship is otherwise easy to disbelieve without seeing it directly.

**Digital/interactive**: a double-slit interference simulator allowing the
learner to adjust slit separation, wavelength, and screen distance
independently, observing the resulting fringe pattern in real time.

**Teacher-demo with elicited prediction**: before switching to a
wider-separation slit slide, ask "will the fringes get closer together or
farther apart?" — directly surfacing MC-FRINGE-WIDTH-INCREASES-WITH-SLIT-SEPARATION
for diagnosis before the demonstration provides the (counter-intuitive)
answer.

## Discovery Questions

**Argued call: a genuine discovery design fits well here**, mirroring the
actual historical arc of the experiment's significance. Need: "does light
passing through two narrow slits produce two simple bright spots, or
something more complex — and if more complex, what determines its exact
pattern?" Playground: the learner (via the laser demonstration or
simulator) observes the actual fringe pattern and experiments with varying
slit separation, wavelength, and screen distance independently, recording
how fringe spacing responds to each. Invention: the learner is guided to
notice, from their own data, the specific (and likely counter-intuitive, in
the slit-separation case) relationships, proposing the general form before
being given the formula. Collision: explicitly test the learner's own
proposed slit-separation relationship against the elicited-prediction
demonstration above — the collision is the moment their (likely
"wider = more spread") prediction meets the "wider = closer fringes" reality.
Formalization: name the relationship Δy = λL/d explicitly, connecting each
variable to what the learner already observed. Compression: "fringe
spacing is proportional to wavelength and screen distance, but INVERSELY
proportional to slit separation — wider slits make CLOSER fringes."

## Teaching Sequence

This concept's Blueprint (Component 4 — Teaching Action Sequence) provides
the turn-by-turn script; cited by reference. The concept-specific
sequencing logic this entry adds: MC-FRINGE-WIDTH-INCREASES-WITH-SLIT-SEPARATION
(Blueprint Priority 1) must be surfaced and repaired BEFORE any
quantitative Δy = λL/d practice problems are attempted — a student holding
this misconception will systematically invert their answers on any problem
that varies slit separation, and this error is easy to miss if only
wavelength- or distance-varying problems are practiced first (since those
relationships ARE in the intuitive, "more of X means more of the effect"
direction, and only the slit-separation variable behaves counter-intuitively).
MC-CENTRAL-FRINGE-IS-ALWAYS-AT-CENTER (Priority 2) should be addressed once
the symmetric-case reasoning is fully secure, using an explicitly asymmetric
setup as the direct repair mechanism.

## Tutor Actions

From `../teaching-actions/*`: DEMONSTRATION (the laser double-slit
demonstration, with prediction elicited first) is the single best-fit
action for this concept, since the counter-intuitive inverse relationship is
far more convincing observed directly than argued verbally.
WORKED-EXAMPLE (computing fringe spacing for at least two scenarios that
vary slit separation specifically, not just wavelength or distance) directly
targets MC-FRINGE-WIDTH-INCREASES-WITH-SLIT-SEPARATION through deliberate,
repeated practice on the specific variable most prone to error.
ERROR-ANALYSIS (presenting a worked solution that predicts wider fringes
from wider slit separation) directly confronts the same misconception.
GAME does not fit especially well here — the core content is a specific,
counter-intuitive quantitative relationship best corrected through direct
observation and calculation practice.

## Voice Teaching Notes

Listen for confident predictions of "farther apart" when a learner is asked
what happens to fringe spacing as slit separation increases — this is the
direct verbal tell for MC-FRINGE-WIDTH-INCREASES-WITH-SLIT-SEPARATION and
should trigger the prediction-then-demonstration sequence rather than an
immediate verbal correction, since this misconception is best repaired by
direct observation, not argument. The load-bearing sentence to slow down on
is the inverse-relationship statement itself — "fringe spacing goes UP with
wavelength and screen distance, but DOWN as slit separation increases" —
since compressing all three relationships into one rushed sentence is
exactly how the one counter-intuitive relationship (slit separation) gets
lost among the two intuitive ones. This concept's core evidence is
substantially visual (the fringe pattern itself); general channel-reality
caveats owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A fast, confident "farther apart" answer to the slit-separation probe
signals MC-FRINGE-WIDTH-INCREASES-WITH-SLIT-SEPARATION firmly held
(MISCONCEIVING quadrant, full repair via demonstration required). A
hesitant, self-correcting answer suggests the correct relationship is
present but not yet confidently held. Mastery-certification trigger: the
learner correctly computes fringe spacing given slit separation,
wavelength, and screen distance, AND correctly predicts the direction of
change (closer/farther) when each variable is independently varied,
including specifically the slit-separation case, without external cueing.
This concept's Blueprint (Component 5 — Mastery Probe Bank) contains the
full item bank; check there before authoring new items.

## Tutor Recovery Strategy

Likeliest Recovery Engine trigger here: "that doesn't make sense" expressed
when the demonstration contradicts the learner's "wider slits, wider
pattern" prediction — this is productive confusion, directly signaling the
misconception is being confronted rather than avoided, and the
concept-specific shrink-to question is "forget the whole pattern — just
think about ONE point on the screen. As the slits get farther apart, does
the path difference to that one point change faster or slower per bit of
slit movement?" (isolating the path-difference-rate mechanism from the
whole-pattern spacing question). See `../foundations/01-recovery-engine.md`
for generic engine mechanics.

## Memory Hooks

Concept type: procedure (the Δy = λL/d calculation) bound to a
discrimination skill (correctly predicting the DIRECTION of change for each
of three variables, one of which is counter-intuitive) — review should
specifically and repeatedly test the slit-separation direction alongside
the other two variables, since this is the highest-failure-rate component
and the one most likely to silently decay back toward the intuitive (wrong)
direction without deliberate retrieval practice. Interleaving partners:
`phys.wave.interference` (the general superposition principle this concept
specializes to light) and, once authored, `phys.opt.diffraction` (the
immediate KG unlock, extending interference reasoning to single-aperture
diffraction).

## Transfer Connections

**Near transfer**: any two-coherent-source interference problem, including
thin-film interference (soap bubbles, oil slicks) and radio/antenna array
interference patterns, both using the identical path-difference reasoning.
**Far transfer**: diffraction grating spectroscopy (a direct extension using
many slits rather than two, still governed by the same path-difference
mechanism, refined to much sharper fringes) and interferometry generally
(precision measurement techniques, including gravitational wave detection,
that fundamentally rely on interference-pattern analysis). **Real-world
transfer**: understanding thin-film color effects (soap bubbles, oil on
water) as everyday, directly observable instances of the same interference
mechanism. **Expert-transfer**: recognizing Young's experiment as the
historically decisive evidence establishing light's wave nature — a case
study in how a single, well-designed experiment can resolve a long-standing
theoretical dispute (particle vs. wave theories of light), a pattern
worth connecting to other decisive-experiment case studies in physics
history.

## Cross-Subject Connections

The KG's `cross_links` field is empty for this concept. This is a
reasonably honest gap rather than an under-populated field — while
interference concepts recur in acoustics and even quantum mechanics
(electron double-slit experiments), no genuinely strong cross-SUBJECT
(as opposed to cross-domain-within-physics) connection is evident for
this specific concept at this curriculum level. Recorded as Curriculum
Feedback below as a "weak but real" honest assessment rather than a
fabricated link.

## Blueprint References

A Blueprint exists: `docs/curriculum/blueprints/phys.opt.youngs-experiment.md`
(Component-format). This entry reuses by reference: **Component 3 —
Misconception Engine** (both misconceptions, birth-type classification
added, not re-derived), **Component 4 — Teaching Action Sequence** (cited
in Teaching Sequence), and **Component 5 — Mastery Probe Bank** (cited in
Assessment Signals). Not restated here: Component 0 (Concept Metadata),
Component 1 (Concept Spine), Component 2 (Prerequisite Dependency Map),
Component 6 (Formative Assessment Strategy), Component 7 (Anxiety and
Confidence Protocols), Component 8 (Spaced Retrieval and Interleaving Plan).

## Runtime Asset References

No seeded `AssetIdentity` records exist for this concept — checked against
`src/lib/teaching/assets/brainSeedAssets.ts`. None created as part of
authoring this entry.

## Curriculum Feedback

No genuinely strong cross-subject connection was found for this concept
beyond physics itself — an honest "weak but real" assessment rather than a
fabricated cross_link, consistent with the KG's currently empty
`cross_links` field for this node.

## Version History

- 2026-07-22 (this session, physics EB Wave 6): initial authoring.
