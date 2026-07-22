# Standing Waves — `phys.wave.standing-waves`

## Identity

- **Concept ID**: `phys.wave.standing-waves` (canonical physics KG)
- **Curriculum location**: physics / waves — dependency level 6.
- **Prerequisites**: `phys.wave.interference` — the load-bearing part is
  superposition itself: a standing wave IS an interference pattern, the
  specific case of two identical waves traveling in opposite directions,
  so the general interference-of-waves reasoning already secured is applied
  to this one specific, highly structured configuration.
- **Unlocks** (from KG): none directly listed — this is a terminal
  application node within the wave domain, though it is a genuine
  conceptual prerequisite (not KG-encoded as such) for simple harmonic
  motion in extended systems and for musical-instrument acoustics generally.
- **Difficulty**: proficient · **Bloom**: apply · **Mastery threshold**: 0.80
  · **Est. hours**: 4

## Learning Objective

The learner can: (1) explain why two identical waves traveling in opposite
directions produce a pattern with fixed points of zero displacement (nodes)
and fixed points of maximum displacement (antinodes), rather than a
traveling wave; (2) correctly identify that a standing wave, despite its
name, is NOT motionless — every point between nodes continues to oscillate
up and down, only the overall pattern's shape (where the nodes and
antinodes sit) stays fixed in place; (3) correctly determine the allowed
standing-wave patterns (harmonics) for a string fixed at both ends or a
pipe open/closed at various ends, and correctly reason about how boundary
conditions (fixed vs. free ends) determine which harmonics are possible;
(4) correctly compute the relationship between wavelength, string/pipe
length, and harmonic number for a given boundary configuration.

## Core Understanding

A standing wave is the interference pattern produced when two identical
waves (matched in wavelength, frequency, and amplitude) travel through the
same medium in opposite directions — typically arising when a wave reflects
back on itself from a fixed or open boundary. At points where the two
traveling waves are always exactly out of phase, destructive interference is
permanent, producing a node (zero displacement at all times); at points
where they are always exactly in phase, constructive interference is
permanent, producing an antinode (maximum oscillation amplitude). Crucially,
the pattern does not travel — the nodes and antinodes stay in fixed
locations — but this does NOT mean the medium itself is motionless; every
non-node point continues oscillating up and down with its own fixed
amplitude, it simply does so in place rather than the disturbance
propagating along the medium. Which specific standing-wave patterns
(harmonics) are physically possible on a given string or in a given pipe is
entirely determined by the boundary conditions at each end: a fixed end
must be a node (it cannot move); a free (open) end must be an antinode
(maximum displacement is unconstrained there) — this boundary-matching
requirement is what restricts a vibrating string or air column to only a
discrete, specific set of allowed wavelengths, rather than any wavelength
whatsoever.

## Mental Models

**Beginner (arriving model, often already wrong)**: "A standing wave is a
wave that has stopped moving / is stationary." This model takes the name
"standing wave" literally in the wrong sense — treating the entire medium
as motionless rather than understanding that the PATTERN (node/antinode
locations) is stationary while the medium itself continues oscillating.
Upgrade trigger: pointing to any specific non-node location on a visibly
oscillating standing wave (a vibrating string, an animation) and asking "is
this point moving right now?" directly confronts the stationary-medium
assumption with an observable counterexample.

**Intermediate**: "A standing wave is an interference pattern with fixed
nodes and antinodes; every non-node point oscillates in place, but the
pattern's shape doesn't travel." This model is correct and captures the
key node/antinode/oscillation distinction, but often treats which harmonics
are "allowed" as a memorized list of pictures (first harmonic, second
harmonic, etc.) rather than a reasoned consequence of boundary conditions.
Shelf-life warning: this model, without the boundary-condition reasoning
below, will fail the moment the learner meets an unfamiliar boundary
configuration (e.g., a pipe closed at one end, open at the other) that
wasn't among the memorized pictures.

**Advanced**: "Which harmonics are possible is determined entirely by
requiring nodes at fixed ends and antinodes at free ends; this single rule
generates the correct harmonic series for any boundary combination without
needing to memorize separate rules for strings vs. open pipes vs. closed
pipes." This model generalizes the boundary-matching logic into a portable
reasoning tool rather than a set of memorized cases.

**Expert**: "Standing wave patterns are the normal modes (eigenmodes) of the
bounded medium — the specific spatial patterns that oscillate with a single,
well-defined frequency, and any general vibration of the medium can be
decomposed as a superposition of these normal modes (Fourier-like
decomposition)." Not required for mastery, but worth flagging as the "this
is the same underlying mathematical idea as quantum mechanical bound
states, molecular vibration modes, and Fourier analysis generally" insight
for a student ready for it.

## Why Students Fail

The dominant failure mode is the name-literalism trap: the term "standing
wave" strongly suggests, before any instruction, that the wave itself is not
moving at all — and because the visual pattern (nodes and antinodes) really
IS fixed in place, students often stop their model there rather than
recognizing that every point between the nodes is still actively oscillating
with its own time-varying displacement.

## Misconceptions

This concept's Blueprint (`docs/curriculum/blueprints/phys.wave.standing-waves.md`,
Component 3 — Misconception Engine) documents two misconceptions in full;
reused by reference with birth-type classification added.

- **MC-STANDING-WAVE-IS-STATIONARY**: the belief that a standing wave means
  the medium itself is not moving/oscillating, only that the wave pattern
  looks fixed. **Birth type**: language contamination (Type 3) — the word
  "standing" is read literally as "not moving," a direct and understandable
  misreading of terminology chosen to describe the PATTERN's fixed location,
  not the medium's motion. Detection probe: "Point to a spot on this
  vibrating string that is NOT a node. Is that point moving right now, or
  is it staying still?" An answer of "staying still" (for a genuinely
  non-node point) reveals this misconception.
- **MC-ALL-PIPES-SAME-HARMONICS**: the belief that the allowed harmonic
  series is the same regardless of whether a pipe is open at both ends,
  closed at both ends, or open at one end and closed at the other — i.e.,
  failing to apply the boundary-condition-specific reasoning and instead
  assuming one universal harmonic pattern applies everywhere. **Birth
  type**: overgeneralization (Type 1) — the string-fixed-at-both-ends case
  is often taught first and most memorably (with its familiar 1st, 2nd,
  3rd harmonic pictures), and this specific pattern is overgeneralized to
  all boundary configurations without re-deriving from the actual boundary
  conditions each time. Detection probe: "A pipe is open at both ends. Does
  it support the same harmonic series (all integer multiples of the
  fundamental) as a pipe closed at one end and open at the other?" An
  answer of "yes, the harmonics are the same" (when in fact a pipe closed at
  one end supports only odd harmonics of the fundamental, a genuinely
  different series) reveals this misconception.

## Analogies

**Best analogy — a jump rope held at both ends.** Two people holding a jump
rope taut and shaking it at just the right frequency produces a pattern
where the middle whips up and down dramatically (antinode) while the ends,
held fixed in the people's hands, don't move at all (nodes) — and critically,
every point along the rope between the hands IS moving, just each point
oscillating in its own fixed location rather than a "hump" traveling from
one end to the other. This directly targets MC-STANDING-WAVE-IS-STATIONARY
by making the continued oscillation of non-node points a directly observable,
kinesthetic experience.

**Alternative analogy — singing in the shower.** Certain notes "boom" much
louder in a shower stall than others — this is standing-wave resonance in
the enclosed air column, with the boosted notes corresponding to the
specific frequencies whose wavelength fits the boundary conditions of that
particular shower stall's dimensions — a familiar, everyday experience of
boundary-condition-dependent allowed frequencies.

**Story analogy**: the historical connection between standing waves in
strings and the mathematical foundations of musical harmony (why certain
string lengths and their simple integer-ratio divisions produce
consonant-sounding notes together) is a genuinely motivating tie between
physics and music worth a brief mention.

**Visual analogy**: a side-by-side diagram of a string fixed at both ends
(nodes at both ends) vs. a pipe open at both ends (antinodes at both ends,
since open ends are pressure nodes but displacement antinodes — a subtlety
worth flagging explicitly if pipe acoustics using pressure rather than
displacement is in scope) vs. a pipe closed at one end (node at the closed
end, antinode at the open end) — this triple comparison directly targets
MC-ALL-PIPES-SAME-HARMONICS by making the boundary-condition dependency
visually explicit rather than implicit.

**Anti-analogy**: do NOT describe a standing wave as "a wave that's frozen
in place" — this directly reinforces MC-STANDING-WAVE-IS-STATIONARY; if a
freezing/stillness metaphor is used at all, it must be immediately qualified
as applying only to the PATTERN's location, never to the medium's motion.

## Demonstrations

**Physical**: a taut rope or slinky, shaken at increasing frequencies until
a clear standing-wave pattern (visible nodes and antinodes) appears —
directly grounding the beginner concrete experience, and easily re-run at
different frequencies to show different harmonics.

**Physical (pipe resonance variant)**: a resonance tube with a movable
water level (or an open/closed pipe with a tuning fork), demonstrating that
sound is dramatically amplified at specific tube lengths corresponding to
resonant standing-wave conditions — directly targets MC-ALL-PIPES-SAME-HARMONICS
by letting the learner observe that different boundary configurations
resonate at different tube lengths for the same frequency.

**Digital/interactive**: a standing-wave simulator allowing the learner to
select boundary conditions (fixed/fixed, free/free, fixed/free) and
frequency, observing which combinations produce clean standing-wave
patterns and which do not.

**Teacher-demo with elicited prediction**: before revealing the pipe
resonance demonstration's result, ask "will a pipe closed at one end support
the exact same set of resonant frequencies as an identical pipe open at
both ends?" — directly surfacing MC-ALL-PIPES-SAME-HARMONICS for diagnosis
before the demonstration resolves it.

## Discovery Questions

**Argued call: a genuine discovery design fits well here.** Need: "why do
certain frequencies make a taut string or air column vibrate dramatically
while other, nearby frequencies barely produce any effect at all?"
Playground: the learner (physically or via simulation) sweeps through
frequencies on a fixed-length string or pipe, noting which produce strong,
clean standing-wave patterns. Invention: the learner is guided to notice
that only specific frequencies (with specific relationships to the string/
pipe length) work, and to propose that the boundary conditions (what's
happening at the ends) must be responsible. Collision: present a pipe
closed at one end alongside a pipe open at both ends of the same length,
and ask the learner to predict whether the resonant frequencies will match
— testing whatever generalized rule they've proposed so far. Formalization:
name nodes, antinodes, and the boundary-matching rule (fixed end = node,
free end = antinode) explicitly, connecting it to what the learner already
observed. Compression: "a standing wave's allowed patterns are entirely
determined by requiring nodes at fixed ends and antinodes at free ends."

## Teaching Sequence

This concept's Blueprint (Component 6 — Session Flow) provides the
turn-by-turn script; cited by reference. The concept-specific sequencing
logic this entry adds: MC-STANDING-WAVE-IS-STATIONARY must be surfaced and
repaired FIRST, before any harmonic-counting or boundary-condition work
begins — a student who believes the medium is motionless will have no
coherent mental model of what a "node" or "antinode" even refers to (both
terms only make sense in contrast to continued oscillation elsewhere), so
this misconception blocks meaningful progress on everything else in the
concept if left unaddressed. MC-ALL-PIPES-SAME-HARMONICS should be
addressed only after the single fixed-end-node/free-end-antinode rule is
secure for the simplest case (string fixed at both ends), using that secure
single-case understanding as the tool to re-derive the different boundary
configurations rather than presenting them as a separate list to memorize.

## Tutor Actions

From `../teaching-actions/*`: DEMONSTRATION (the rope/slinky and pipe
resonance demonstrations) fits centrally, since this concept is fundamentally
about an observable physical pattern. PREDICTION (eliciting a guess about
whether a point is moving, or whether two pipes share the same resonances)
should precede each demonstration. CONCEPT-MAP (relating the boundary
condition at each end to the required node/antinode there, then to the
resulting allowed wavelengths) fits well for consolidating the general
reasoning rule after the concrete cases are secure. GAME could work
(matching boundary configurations to correct harmonic diagrams) but is not
essential — direct demonstration and reasoned derivation are more central
here.

## Voice Teaching Notes

Listen for the phrase "it's not moving" or "it stopped" when a learner
describes a standing wave pattern in their own words — this is the direct
verbal tell for MC-STANDING-WAVE-IS-STATIONARY and should trigger an
immediate clarifying question ("which part isn't moving — the whole string,
or just the pattern's shape?") rather than a direct correction. The
load-bearing sentence to slow down on is the node/antinode distinction
itself — "a node never moves; an antinode moves the most; everywhere in
between moves some amount" — since rushing this sentence is exactly how the
all-points-are-frozen misreading gets reinforced rather than corrected.
General channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A fast, confident "it's not moving" answer to the point-on-the-string probe
signals MC-STANDING-WAVE-IS-STATIONARY firmly held (MISCONCEIVING quadrant,
full repair chain needed). A correct-but-hesitant answer suggests the
correct idea is present but not yet confidently held, appropriate for
lighter reinforcement rather than a full repair sequence. Mastery-
certification trigger: the learner correctly identifies node/antinode
locations and correctly states that non-node points continue oscillating,
AND correctly derives (not just recalls) the allowed harmonic series for at
least two different boundary configurations without external cueing. This
concept's Blueprint (Component 4 — Diagnostic Probe Set) contains the full
item bank; check there before authoring new items.

## Tutor Recovery Strategy

Likeliest Recovery Engine trigger here: "I don't see how this is different
from a regular wave" expressed when first confronting the standing-wave
pattern — the concept-specific shrink-to question is "forget the whole
pattern for a second — just watch ONE point in the middle. Is it moving up
and down, or not?" (isolating a single point's motion before re-introducing
the whole-pattern, node/antinode language). See
`../foundations/01-recovery-engine.md` for generic engine mechanics.

## Memory Hooks

Concept type: concept (the interference mechanism) bound to a procedure
(deriving allowed harmonics from boundary conditions) — review should
alternate between a conceptual check ("is a standing wave's medium
motionless?") and a derivation check ("derive the allowed wavelengths for
this specific boundary configuration"), since a learner can hold one
securely while still missing the other. Interleaving partners:
`phys.wave.interference` (the general superposition principle this concept
specializes) and `phys.wave.beats` (the sibling concept in this same
dependency-level wave, another specific interference-pattern consequence,
useful for discriminating "standing waves = spatial interference pattern"
from "beats = temporal interference pattern").

## Transfer Connections

**Near transfer**: any bounded-medium vibration problem, including electron
standing waves in a simple 1D quantum well (a direct, though more advanced,
mathematical analog). **Far transfer**: musical instrument design (why a
guitar string's length and boundary conditions determine its pitch and
overtone structure; why organ pipes of different lengths and open/closed
configurations produce their characteristic timbres). **Real-world
transfer**: understanding resonance-related engineering concerns (why
structures can be dangerously excited at specific frequencies matching their
own standing-wave-like normal modes) as a distant but genuine cousin of this
concept. **Expert-transfer**: recognizing standing waves as the physical,
directly observable instance of the general "normal modes of a bounded
system" pattern that recurs throughout physics (quantum bound states,
vibrating membranes, molecular vibrations).

## Cross-Subject Connections

The KG's `cross_links` field is empty for this concept. A genuine,
KG-unencoded connection exists to mathematics (Fourier series/analysis, the
mathematical machinery for decomposing arbitrary vibrations into normal
modes) — not currently captured as a cross_link, and appropriately advanced
beyond this concept's own Bloom level, but worth flagging as a forward
connection. Recorded as Curriculum Feedback below.

## Blueprint References

A Blueprint exists: `docs/curriculum/blueprints/phys.wave.standing-waves.md`
(Component-format). This entry reuses by reference: **Component 3 —
Misconception Engine** (both misconceptions, birth-type classification
added, not re-derived), **Component 6 — Session Flow** (cited in Teaching
Sequence), and **Component 4 — Diagnostic Probe Set** (cited in Assessment
Signals). Not restated here: Component 0 (Concept Identity), Component 1
(Narrative Spine), Component 2 (Worked Examples), Component 5 (Socratic
Thread), Component 7 (Differentiation Variants), Component 8 (Retrieval
Schedule).

## Runtime Asset References

No seeded `AssetIdentity` records exist for this concept — checked against
`src/lib/teaching/assets/brainSeedAssets.ts`. None created as part of
authoring this entry.

## Curriculum Feedback

The KG's `cross_links` field is empty despite a genuine, forward-pointing
connection to mathematics' Fourier analysis content. Flagged for the
Curriculum Production Pipeline's own backlog, not fixed here.

## Version History

- 2026-07-22 (this session, physics EB Wave 6): initial authoring.
