# Feynman Diagrams (Qualitative) — `phys.particle.feynman-diagrams`

## Identity

- **Concept ID**: `phys.particle.feynman-diagrams` (canonical physics
  KG)
- **Curriculum location**: physics / particle physics — dependency
  level 21.
- **Prerequisites**: `phys.particle.gauge-bosons` (mediator line types),
  `phys.particle.conservation-laws` (the vertex-by-vertex checking
  procedure).
- **Unlocks** (from KG): none — a terminal, qualitative-literacy skill
  node.
- **Difficulty**: advanced · **Bloom**: apply · **Mastery threshold**:
  0.75 · **Est. hours**: 4

## Learning Objective

The learner can: (1) correctly read a Feynman diagram's line types
(straight arrowed = fermion, wavy/curly/dashed = gauge boson) and vertex
structure; (2) correctly identify which particles are incoming versus
outgoing and recognize that the identical diagram shape can represent
physically distinct processes depending on this direction; (3) correctly
apply the vertex-by-vertex conservation checklist (charge, and for weak
vertices baryon/lepton number) to determine whether a depicted process is
physically allowed; (4) correctly characterize the diagram as a
mathematical/calculational shorthand, not a literal picture of particle
trajectories through space.

## Core Understanding

A Feynman diagram represents a particle interaction as a picture:
incoming and outgoing particle lines meeting at vertices where an
exchanged gauge boson line connects them, read here purely qualitatively
— for what interaction is depicted and whether it is allowed — without
calculating any numerical amplitude. A first persistent error reads the
diagram as a literal picture of particles physically moving through
space along the drawn paths, missing that the actual quantum-mechanical
particles do not follow single, definite classical trajectories at all
— the diagram is a compact bookkeeping tool representing one term in a
mathematical sum, not a photograph. A second error takes the
antiparticle backward-arrow convention literally, as evidence that
antiparticles have been observed traveling backward through time,
missing that this is a specific mathematical bookkeeping device rooted
in quantum field theory's underlying equations, with no experimental
support for literal time-reversal. A third error assumes the same
diagram shape always represents the same physical process regardless of
which lines are labeled incoming versus outgoing, missing that the
identical "V"-shaped diagram represents either annihilation (matter to
energy) or pair production (energy to matter) depending entirely on this
directional reading.

## Mental Models

**Beginner**: "The diagram's lines show where the particles literally
travel through space; the backward-pointing antiparticle arrow means
antiparticles have actually been observed going backward in time; the
same diagram shape always means the same physical process." Upgrade
trigger: comparing the diagram explicitly to a circuit diagram (a
familiar abstraction representing logical relationships, not literal
electron paths) directly confronts the literal-trajectory assumption;
stating plainly that no experiment has ever recorded literal backward-
in-time motion directly confronts the backward-arrow misreading;
drawing the identical "V"-shape diagram twice, once as annihilation and
once as pair production, directly confronts the shape-determines-process
assumption.

**Intermediate**: "A Feynman diagram is a rule-governed mathematical
shorthand, not a literal spatial trajectory map; the backward-pointing
antiparticle arrow is a notational convention from the underlying
equations, not an observed physical time-reversal; diagram shape alone
is insufficient — incoming/outgoing direction determines which physical
process is actually depicted." This model correctly captures the three
core distinctions but may still need practice applying the full
vertex-by-vertex conservation checklist fluently across varied diagrams.

**Advanced**: always read a diagram via the explicit five-step
procedure (identify time direction, identify incoming/outgoing lines,
identify each vertex's interaction type, check conservation at every
vertex, conclude allowed/forbidden) rather than pattern-matching on
overall shape.

**Expert**: the connection to Feynman's original 1940s motivation
(simplifying otherwise extraordinarily cumbersome QED calculations —
diagrams as calculational shorthand, with more-vertex diagrams
corresponding to smaller, more suppressed contributions) and to real
collider data analysis (sketching candidate diagrams to organize
hypotheses about detector signatures) — not required for mastery,
natural bridge to `phys.particle.accelerators-detectors`.

## Why Students Fail

The dominant failure is reading a Feynman diagram as a literal picture of
particle trajectories in space, missing its role as a mathematical
bookkeeping device; a closely related failure misreads the backward-
pointing antiparticle arrow as a literal claim about time-reversal,
missing that it is purely a notational convention; a further failure
believes the same diagram shape always represents the same physical
process, missing that reading direction (incoming vs. outgoing)
determines the actual process depicted; a final failure assumes any
diagram that "looks plausible" (matching line types at a vertex)
automatically represents an allowed process, without explicitly checking
conservation laws at each vertex.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.particle.feynman-
diagrams.md`, Section 4 Misconception Library) documents three; reused
by reference with birth-type added.

- **MC-1 ("a Feynman diagram is a literal picture of particles
  physically moving through space")**: believing "the lines show where
  the particles actually go, like a map of their motion." **Birth
  type**: perceptual intuition (Type 2) — the diagram's visual
  resemblance to a simple space-time trajectory plot invites a literal,
  classical-trajectory reading. Probe: "In a Feynman diagram, do the
  drawn lines represent the actual physical paths particles travel
  through space, the way a trajectory diagram would?"
- **MC-2 ("the backward-pointing arrow means antiparticles literally
  travel backward through time")**: believing "antiparticles go
  backward in time — that's a real, observed phenomenon." **Birth
  type**: language contamination (Type 3) — the vivid, literal-sounding
  phrase "backward in time," used as shorthand in popular science, is
  taken at face value. Probe: "Does the backward-arrow convention mean
  antiparticles have actually been observed traveling backward through
  time?"
- **MC-3 ("the same diagram shape always represents the same physical
  process")**: believing "same shape means same process, no matter
  which end you call 'in' and which you call 'out.'" **Birth type**:
  overgeneralization (Type 1) — students focus on the diagram's static
  shape without attending to the crucial role of incoming/outgoing
  labeling. Probe: "If two Feynman diagrams have the exact same shape
  and line types, do they always represent the exact same physical
  process?"

## Analogies

**Best**: a circuit diagram — both a Feynman diagram and a circuit
diagram are precise, rule-governed abstractions representing logical
relationships (which components/particles interact with which), not
literal photographs of physical motion. Explicitly breaks down at one
point: a circuit diagram's components are macroscopic, classical objects
with well-defined locations, while a Feynman diagram's "components"
(particles, vertices) are fundamentally quantum-mechanical, without
well-defined classical trajectories at all — the analogy captures
"abstraction, not literal picture" but not the deeper quantum nature of
what is represented.

**Anti-analogy**: do NOT say "antiparticles literally travel backward in
time, and that's what the diagram shows" — this directly reinforces
MC-2; always immediately qualify the backward-arrow convention as a
mathematical bookkeeping device, never a literal, experimentally
observed claim.

## Demonstrations

Worked-example: physically build a simple electron-photon vertex diagram
using colored string or pipe cleaners on a table, having the learner
correctly identify line types and label the vertex's interaction type —
directly targets MC-1 by grounding the abstraction concretely. Worked-
example: draw the identical "V"-shaped diagram twice, labeling one
reading as annihilation (e⁻, e⁺ in; photon out) and the other as pair
production (photon in; e⁻, e⁺ out) — directly targets MC-3 by making the
direction-not-shape principle concrete and visible.

## Discovery Questions

Discovery-style: "Here's a simple diagram: two lines come in, meet at a
point, and one line goes out. This exact same drawing can mean two
completely different things in physics — one where matter turns into
energy, and one where energy turns into matter. How can the same picture
mean two different things?" — learner discovers (through the
annihilation/pair-production side-by-side resolution) that direction,
not shape, determines the physical process, directly confronting MC-3.

## Teaching Sequence

Blueprint's Section 9 Teaching Actions cited by reference (4 actions,
session cap 4: physical string-and-arrow build establishing basic
vocabulary → annihilation/pair-production side-by-side directly
confronting MC-3 → vertex conservation-check worksheet applying the
prerequisite's conservation-law checklist → direct challenge of MC-1 and
MC-2 via the circuit-diagram analogy, connecting to Feynman's original
calculational purpose). MC-1 and MC-2 are addressed together at the end
via the circuit-diagram analogy, after MC-3 has been resolved via the
annihilation/pair-production demonstration.

## Tutor Actions

EXPLAIN + DEMONSTRATE (physical string-and-arrow diagram build,
establishing line-type vocabulary); CHALLENGE (annihilation/pair-
production side-by-side, directly confronting MC-3); DEMONSTRATE
(vertex conservation-check worksheet, applying the prerequisite's
checklist to five diagrams); CHALLENGE + TRANSFER (circuit-diagram
analogy directly probing MC-1 and MC-2, connecting to Feynman's original
calculational motivation).

## Voice Teaching Notes

Listen for "the lines show where the particles actually go," "the
backward arrow means antiparticles really go back in time," or "same
shape means same process" — the three most frequent misconception
tells. Load-bearing sentence: "A Feynman diagram packs an enormous
amount of precise information into a simple-looking picture — but
reading it correctly requires knowing the rules: what each line type
means, which direction is 'in' versus 'out,' and checking conservation
laws at every single vertex. Get any of these wrong, and you'll misread
what the diagram is actually telling you." Channel-reality caveats owned
by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner describing the diagram's lines as literal spatial paths
signals MC-1 (full repair via the circuit-diagram analogy). A learner
insisting antiparticles have been observed traveling backward in time
signals MC-2 (full repair via the direct "no experiment has ever
recorded this" statement). A learner assuming identical diagram shapes
must represent identical processes signals MC-3 (full repair via the
annihilation/pair-production side-by-side demonstration). Mastery
trigger: correctly reading a diagram's incoming/outgoing particles and
vertex interaction type, correctly distinguishing annihilation from pair
production using the identical shape, and correctly applying the
vertex-by-vertex conservation check. Blueprint's Section 11 Assessment
(FA-1 through FA-4) cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "does a circuit diagram show you exactly where every
electron physically travels, or does it show you the logical
relationships between components?" (isolating the abstraction-not-
literal-picture pattern using a familiar diagram type before re-applying
it specifically to Feynman diagrams). See
`../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (Feynman diagrams as rule-governed mathematical shorthand, not
literal trajectory maps; the backward-arrow antiparticle convention as
notation, not observed time-reversal; direction, not shape, determines
the physical process depicted) bound to procedure (the five-step
diagram-reading procedure: identify time direction, identify
incoming/outgoing lines, identify each vertex's interaction, check
conservation at every vertex, conclude allowed/forbidden). Interleave
with `phys.particle.gauge-bosons` (prerequisite — mediator line types)
and `phys.particle.conservation-laws` (prerequisite — the vertex-
checking procedure).

## Transfer Connections

Near: sketching and reading candidate Feynman diagrams for any newly
encountered particle process, including in accelerator/detector analysis
(`phys.particle.accelerators-detectors`). Far: reading any rule-governed
diagrammatic notation system in another field (electrical circuit
diagrams, chemical reaction mechanism arrows, UML software diagrams)
with the same discipline of learning the notation rules first rather
than over-literalizing the visual metaphor. Real-world: physicists'
actual practice of sketching candidate diagrams as a first-pass
organizational tool before detailed calculation. Expert: the general
principle that a diagram's shape alone is not its full meaning —
direction and labeling context determine what it actually represents —
recurring in reading graphs, flowcharts, and other diagrammatic notation.

## Cross-Subject Connections

KG `cross_links` not separately checked this batch (not required by the
Blueprint's Section 15 Curriculum Feedback, which records no open
issues); the "shape alone isn't full meaning, direction/context matters"
structural pattern is the primary cross-subject bridge, already covered
under Transfer Connections above.

## Blueprint References

Blueprint exists (`docs/curriculum/blueprints/phys.particle.feynman-
diagrams.md`, numbered-Section format). Reuses: Section 4 Misconception
Library by reference. Not restated: Section 0 Concept Metadata, Section
1 Concept Spine full formula derivations, Section 5 Explanation Library,
Section 7 Demonstration Library full walkthroughs, Section 8 Discovery
Lesson full sequence, Section 11 Assessment full item text, Section 12
Recovery Notes, Section 13 Memory and Review schedule, Section 14
Transfer Map.

## Runtime Asset References

No seeded `AssetIdentity` records — checked against `brainSeedAssets.ts`.
None created.

## Curriculum Feedback

No open issues found this batch — this concept functions as a terminal,
qualitative-literacy skill node (no direct KG unlock recorded),
appropriate given its role as an applied skill rather than a prerequisite
for further conceptual content, consistent with the Blueprint's own
Section 15 findings.

## Version History

- 2026-07-23 (physics EB Wave 21): initial authoring.
