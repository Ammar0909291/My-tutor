# Diffraction of Light — `phys.opt.diffraction`

## Identity

- **Concept ID**: `phys.opt.diffraction` (canonical physics KG)
- **Curriculum location**: physics / optics — dependency level 7.
- **Prerequisites**: `phys.opt.youngs-experiment` — the load-bearing part
  is the already-secure interference/path-difference reasoning, now
  applied to a SINGLE aperture rather than two discrete slits.
- **Unlocks** (from KG): `phys.opt.single-slit`.
- **Difficulty**: advanced · **Bloom**: analyze · **Mastery threshold**: 0.80
  · **Est. hours**: 6

## Learning Objective

The learner can: (1) correctly explain diffraction as the spreading and
interference of light passing through or around an aperture/obstacle,
arising from every point across the aperture acting as a coherent
secondary wave source (Huygens' principle) that interferes with light from
every other point; (2) correctly predict that a NARROWER single slit
produces a WIDER diffraction pattern (the opposite of double-slit fringe
spacing's relationship to slit separation), and correctly explain why;
(3) correctly distinguish diffraction (spreading/interference from a
SINGLE aperture's own extended width) from double-slit interference
(interference between TWO separate, point-like coherent sources);
(4) correctly explain that diffraction occurs for light passing any
aperture or edge, not only at the specific narrow slits used in classroom
demonstrations.

## Core Understanding

Diffraction is the spreading and interference pattern produced when light
passes through or near an aperture or obstacle, arising because every
point ACROSS the aperture's own width acts as a coherent secondary wave
source (Huygens' principle), and these many secondary wavelets interfere
with each other — constructively and destructively — producing a
characteristic diffraction pattern (a bright central maximum flanked by
progressively dimmer secondary maxima) rather than a sharp-edged geometric
shadow. A defining, counter-intuitive relationship is that a NARROWER
single slit produces a WIDER diffraction pattern — the opposite direction
from double-slit interference's fringe-spacing relationship to slit
separation — because a narrower aperture means secondary wavelets
originating across it have LESS path-length variation available, requiring
a LARGER diffraction angle to accumulate the same interference-producing
path difference. Diffraction and (two-slit) interference are related but
distinct phenomena: diffraction concerns the spreading pattern from ONE
extended aperture (many secondary sources across its own width);
interference (in the Young's-experiment sense) concerns two SEPARATE,
effectively point-like coherent sources — real double-slit experiments
actually exhibit BOTH simultaneously (each slit individually diffracts,
while the two slits together interfere), producing a combined pattern.
Diffraction is not a special, rare phenomenon confined to narrow slits —
it occurs for light passing any aperture or edge, including ordinary
doorways, camera apertures, and telescope openings, though it becomes
noticeable only when the aperture size is comparable to the light's
wavelength.

## Mental Models

**Beginner**: "Diffraction is light bending around corners, a special
effect only noticeable with narrow slits." Upgrade trigger: asking whether
light passing through a telescope's aperture or a camera lens also
diffracts (yes, always, though the effect is often too small to notice at
everyday aperture sizes) directly confronts the "only at narrow slits"
assumption.

**Intermediate**: "Diffraction arises from every point across an aperture
acting as a wave source; narrower slits produce WIDER patterns." This
model correctly captures the inverse width relationship, but sometimes
still conflates diffraction (single-aperture spreading) with
interference (two-source overlap) as the same phenomenon.

**Advanced**: "Diffraction (single-aperture spreading, many secondary
sources across one width) and interference (two or more discrete,
separate coherent sources) are distinct effects that CO-OCCUR in a real
double-slit setup — each individual slit diffracts on its own, while the
two slits' centers interfere with each other, and the observed pattern is
the PRODUCT of both effects."

**Expert**: diffraction as the general wave-optics limit governing ANY
imaging system's ultimate resolution (the Rayleigh criterion, setting a
hard limit on telescope/microscope resolving power regardless of
magnification) — not required for mastery, but a natural connection to
`phys.opt.optical-instruments`'s own diffraction-limit mention.

## Why Students Fail

The dominant failure is treating diffraction as a rare, narrow-slit-only
special effect rather than a universal wave phenomenon occurring at any
aperture; a second, distinct and genuinely counter-intuitive failure is
expecting narrower slits to produce narrower (not wider) diffraction
patterns, by false analogy to double-slit fringe spacing's opposite
relationship; a third conflates diffraction with interference as
identical phenomena; a fourth restricts diffraction incorrectly to slits
specifically.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.opt.diffraction.md`,
Misconception Engine, MC-1 through MC-4) documents four; reused by
reference with birth-type added.

- **MC-1 (MC-DIFFRACTION-IS-BENDING-AROUND-CORNERS)**: diffraction
  reduced to a vague "bending around corners" without the interference
  mechanism. **Birth type**: language contamination (Type 3) — "bending"
  is the common informal description, obscuring the actual
  many-secondary-source interference mechanism. Probe: "Explain WHY light
  bends around an edge or through a narrow slit — what's actually
  happening at the wave level?"
- **MC-2 (MC-NARROWER-SLIT-GIVES-NARROWER-PATTERN)**: expecting a narrower
  single slit to produce a NARROWER diffraction pattern, by false analogy
  to double-slit spacing. **Birth type**: analogy overextension (Type 6)
  — directly overextending the already-secure double-slit
  fringe-spacing/separation inverse relationship to a structurally
  different (single-aperture) situation with the OPPOSITE direction.
  Probe: "If you make a single slit narrower, does its diffraction pattern
  get wider or narrower?"
- **MC-3 (MC-DIFFRACTION-SAME-AS-INTERFERENCE)**: diffraction and
  (two-source) interference treated as identical phenomena. **Birth
  type**: overgeneralization (Type 1) — both produce bright/dark patterns
  from wave superposition, inviting conflation without the
  one-source-many-points vs. two-discrete-sources distinction. Probe: "Is
  diffraction from a single slit the same phenomenon as interference
  between two separate slits, or are they related but distinct?"
- **MC-4 (MC-DIFFRACTION-ONLY-AT-SLITS)**: belief diffraction only occurs
  at narrow slits specifically, not other apertures or edges. **Birth
  type**: overgeneralization (Type 1) — the standard classroom
  demonstration uses narrow slits exclusively, and this specific
  apparatus is mistaken for the phenomenon's actual scope. Probe: "Does
  light diffract when passing through a camera lens or a telescope
  aperture, or only through narrow slits?"

## Analogies

**Best**: water waves passing through a harbor entrance — a NARROW harbor
mouth produces waves spreading out widely into the harbor (like a narrow
slit's wide diffraction pattern), while a WIDE harbor mouth lets waves
pass through with much less spreading (like a wide slit's narrow
pattern) — directly targets MC-2 with a physically identical wave
phenomenon in a more visualizable medium. **Breaking point**: water waves
are directly visible and macroscopic; light's wavelength is vastly
smaller, so the SAME physics only becomes noticeable for light at much
smaller aperture sizes — worth flagging explicitly.

**Anti-analogy**: do NOT say "diffraction is when light spreads out after
squeezing through a narrow gap" as a complete definition — this framing
(while not wrong) omits the interference mechanism and the
narrower-means-wider relationship, inviting MC-1 and MC-2 to persist
unaddressed.

## Demonstrations

Physical: shine a laser through single slits of two different widths,
projecting onto a screen — directly, numerically targets MC-2 by showing
the narrower slit produces the WIDER pattern. Physical/conceptual: shine
light through a simple round aperture (not a slit) or observe diffraction
around a razor blade's edge — directly targets MC-4 by showing diffraction
occurring at non-slit apertures/edges.

## Discovery Questions

Discovery-style: "if you make a slit narrower, does the light spread out
more or less?" — learner predicts (often incorrectly, by false analogy to
double-slit spacing), then the two-different-width-slit demonstration
resolves it, directly confronting MC-2 with a genuinely surprising result.

## Teaching Sequence

Blueprint's assessment-probe and session-flow components cited by
reference. MC-1 (vague "bending") repaired first via the Huygens'-principle
mechanism explanation, before MC-2 (narrower/wider relationship), since
understanding WHY diffraction happens (many interfering secondary
sources) is prerequisite to reasoning correctly about how slit width
affects the pattern. MC-3 (diffraction vs. interference conflation) is
addressed once both are individually secure, using the real double-slit
setup (which exhibits both) as the unifying case. MC-4 (only-at-slits) is
addressed last, as a scope-generalizing capstone once the mechanism is
trusted.

## Tutor Actions

DEMONSTRATION (two-different-width-slit comparison; round-aperture/edge
diffraction); ANALOGY (harbor-entrance water waves); COMPARE-CONTRAST
(diffraction vs. interference, explicitly tabulated: one-source-many-points
vs. two-discrete-sources).

## Voice Teaching Notes

Listen for "it just bends around the edge" given as a complete explanation
with no interference mechanism named — the MC-1 tell. Load-bearing
sentence: "a NARROWER slit gives a WIDER pattern — the opposite of what
you'd expect from double-slit spacing." Channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner predicting a narrower pattern for a narrower slit signals MC-2
(MISCONCEIVING, full repair via the two-slit-width demonstration). Mastery
trigger: correctly predicting the inverse width-pattern relationship,
correctly distinguishing diffraction from interference, and correctly
affirming diffraction occurs at any aperture, not just slits. Blueprint's
assessment-probe component cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget the pattern width for a second — through a
NARROWER opening, does a wave have MORE or LESS 'room' to spread as
different paths?" (isolating the mechanism before the width-pattern
relationship). See `../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (diffraction vs. interference; inverse width-pattern relationship)
bound to procedure (single-slit pattern-width reasoning). Interleave with
`phys.opt.youngs-experiment` (the double-slit sibling this concept must be
kept distinct from) and `phys.opt.wave-optics`.

## Transfer Connections

Near: any single-aperture wave-spreading problem. Far: telescope and
microscope resolution limits (the Rayleigh criterion, a direct diffraction
consequence setting a hard resolving-power ceiling regardless of
magnification — connecting directly back to `phys.opt.optical-instruments`'s
Expert-model mention) and radio antenna design (diffraction determines
signal spreading around obstacles). Real-world: why sound diffracts
around corners far more noticeably than light (sound's much longer
wavelength compared to typical everyday aperture/obstacle sizes). Expert:
the Rayleigh criterion as the fundamental diffraction-limited resolution
ceiling for any imaging system.

## Cross-Subject Connections

KG `cross_links` empty. No strong cross-subject connection identified
beyond the intra-physics connection to `phys.opt.optical-instruments`
already discussed above; honest "weak but real" assessment at the
cross-SUBJECT level specifically.

## Blueprint References

Blueprint exists (Component-format). Reuses: Misconception Engine and its
assessment-probe/session-flow components by reference. Not restated:
Concept Metadata, Concept Spine, Prerequisite Dependency Map, Teaching
Action Sequence detail, Formative Assessment Strategy, Anxiety &
Confidence Protocols, Spaced Retrieval & Interleaving Plan, V-Check Trace.

## Runtime Asset References

No seeded `AssetIdentity` records — checked against `brainSeedAssets.ts`.
None created.

## Curriculum Feedback

No genuine cross-SUBJECT connection found; the strongest connection
(optical instrument resolution limits) is intra-physics, honestly
recorded rather than stretched into a fabricated cross-subject link.

## Version History

- 2026-07-22 (physics EB Wave 7): initial authoring.
