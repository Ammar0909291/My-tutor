# bio.neuro.audition-vestibular-system — Audition and the Vestibular System

## Identity
- **Concept ID**: `bio.neuro.audition-vestibular-system`
- **Subject**: Biology
- **Domain**: Neuroscience (`bio.neuro`)
- **Prerequisites**: `bio.neuro.sensory-transduction`
- **Unlocks**: (none in KG)
- **Cross-links (KG)**: (none)
- **Difficulty**: advanced
- **Bloom level**: analyze
- **Mastery threshold**: 0.78
- **Estimated hours**: 4

## Learning Objective
The student can correctly explain tonotopic coding — that a SPECIFIC LOCATION along
the basilar membrane responds MAXIMALLY to a SPECIFIC sound frequency (a spatial map of
frequency, not amplitude) — and correctly explain that the vestibular system detects
head MOVEMENT and position (not sound), using the SAME hair-cell mechanotransduction
mechanism as hearing but in a mechanistically and functionally DISTINCT organ system.

## Core Understanding
The ear's anatomy is organised into three connected regions. The **outer ear**
(pinna and ear canal) collects and channels sound waves toward the eardrum. The
**middle ear** (containing three small bones — malleus, incus, stapes) MECHANICALLY
amplifies and transmits the eardrum's vibrations to the inner ear. The **inner ear**
contains the cochlea (for hearing) and the vestibular apparatus (for balance),
both of which rely on the SAME underlying sensory mechanism: **hair-cell
mechanotransduction** — specialised hair cells bearing stereocilia (hair-like
projections) that, when physically DEFLECTED, open mechanically-gated ion channels,
converting physical/mechanical movement directly into an electrical signal (extending
the general sensory-transduction principle already covered, specifically for a
MECHANICAL stimulus).

Within the cochlea, sound-induced vibrations travel along the **basilar membrane**, and
this membrane's PHYSICAL properties (stiffness and width) vary systematically along its
length — producing **tonotopic coding**: a SPECIFIC LOCATION along the basilar
membrane vibrates MAXIMALLY in response to a SPECIFIC sound FREQUENCY (high
frequencies maximally activate hair cells near the cochlea's base; low frequencies
maximally activate hair cells near its apex) — this creates a genuine SPATIAL MAP of
sound frequency along the membrane's length, distinct from how sound INTENSITY is
separately coded (via action-potential firing frequency, as covered in general sensory
transduction).

The **vestibular system**, located in the inner ear alongside the cochlea, serves an
ENTIRELY DIFFERENT sensory function: detecting **balance** and **head movement/position**
— NOT sound. It uses the SAME hair-cell mechanotransduction mechanism as the cochlea,
but organised into DIFFERENT specific structures serving DIFFERENT specific detection
tasks: the **semicircular canals** detect ROTATIONAL head movement (angular
acceleration, via fluid movement deflecting hair cells within the canals), while the
**otolith organs** (utricle and saccule) detect LINEAR acceleration and the head's
STATIC position relative to gravity (via tiny calcium carbonate crystals, otoliths,
whose movement under gravity or acceleration deflects hair cells). The vestibular
system and cochlea are ANATOMICALLY adjacent and mechanistically SIMILAR (both using
hair-cell mechanotransduction), but they are FUNCTIONALLY entirely distinct sensory
systems serving completely different purposes (balance/movement detection versus sound
detection).

## Mental Models
- **Tonotopic coding as a piano keyboard laid out along the membrane**: think of the
  basilar membrane as being like a piano keyboard laid out lengthwise — each specific
  KEY position (location along the membrane) is "tuned" to respond maximally to one
  specific note (frequency), creating a genuine spatial map, rather than the whole
  membrane vibrating equally for every pitch.
- **Same sensor technology, two completely different jobs**: the cochlea and
  vestibular system are like two DIFFERENT devices built using the SAME underlying
  sensor technology (hair-cell mechanotransduction) — like a microphone and a
  motion-detector both using similar underlying transducer principles, but serving
  completely different purposes (detecting sound versus detecting movement).

## Why Students Fail
1. They assume sound frequency is coded the SAME way as sound intensity (via firing
   RATE alone), missing that frequency is specifically coded SPATIALLY (tonotopically)
   — a particular basilar-membrane LOCATION responding maximally to a particular
   frequency.
2. They assume the vestibular system detects SOUND (since it's located right next to
   the cochlea in the inner ear), missing that it specifically detects HEAD MOVEMENT
   and POSITION, an entirely different sensory function.
3. They fail to recognise that the cochlea and vestibular system, despite serving
   completely different functions, share the SAME underlying hair-cell
   mechanotransduction mechanism.

## Misconceptions

No Blueprint exists yet for this concept, and no seed content exists in
`biologySeedAssets.ts`: this concept is one of the 91 added by the 2026-09-14 KG
extension and currently has zero authored explanations or probes of any kind (confirmed
via direct grep against `biologySeedAssets.ts` and `biologyDepthSeedAssets.ts` before
authoring). Both misconceptions below are therefore authored directly from first
principles using the birth-taxonomy diagnostic procedure
(`educational-brain/misconceptions/01-birth-taxonomy.md`), and are NOT tied to any
existing seed-corpus probe — there is none to cite.

### M1 — "Sound frequency is coded the same way as sound intensity, by firing rate alone" (Type 1: Overgeneralization)
**Statement**: Sound FREQUENCY (pitch) is assumed to be coded the SAME way as sound
INTENSITY (loudness) — via action-potential FIRING RATE alone — missing the SPATIAL
coding mechanism (tonotopy) specifically responsible for frequency discrimination.
**Origin**: Overgeneralizing from the general sensory-coding principle already
covered (stimulus intensity coded by firing frequency) to ALL aspects of a sensory
stimulus, without registering that sound has TWO separate dimensions (frequency AND
intensity) that are coded through TWO DIFFERENT specific mechanisms — one spatial
(tonotopy, for frequency), one rate-based (for intensity).
**Why it persists**: Without an explicit statement that frequency specifically requires
its OWN separate coding mechanism (distinct from the general intensity-coding
principle), it can seem natural to apply the single, already-learned intensity-coding
rule to frequency as well.
**Repair**: State the two-dimension, two-mechanism distinction explicitly: sound
INTENSITY is coded by ACTION-POTENTIAL FIRING RATE (as with general sensory
transduction); sound FREQUENCY is instead coded SPATIALLY — by WHICH SPECIFIC LOCATION
along the basilar membrane is maximally activated (tonotopy), based on that location's
specific physical properties (stiffness, width) — two entirely separate coding
mechanisms for two separate stimulus dimensions.
**Verification-of-death**: given a scenario comparing a LOUD low-pitched sound and a
QUIET high-pitched sound, the learner correctly identifies that PITCH is determined by
WHICH location on the basilar membrane is maximally activated, while LOUDNESS is
determined by the FIRING RATE at that location, rather than conflating the two into a
single coding mechanism.

### M2 — "The vestibular system detects sound, since it's located in the inner ear" (Type 1: Overgeneralization)
**Statement**: The vestibular system is assumed to detect SOUND (given its close
anatomical proximity to the cochlea within the inner ear), rather than its actual
function — detecting head MOVEMENT and POSITION (balance).
**Origin**: Overgeneralizing from the vestibular system's SHARED anatomical location
(the inner ear) and SHARED underlying mechanism (hair-cell mechanotransduction) with
the cochlea to an incorrect inference about SHARED FUNCTION, without separately
tracking that anatomical proximity and mechanistic similarity do NOT imply identical
sensory function.
**Why it persists**: Without an explicit statement that the vestibular system and
cochlea, despite their proximity and shared underlying transduction mechanism, detect
COMPLETELY DIFFERENT specific stimuli (movement/position versus sound), the shared
"inner ear" location can suggest a shared "hearing-related" function.
**Repair**: State the functional distinction explicitly: the vestibular system detects
HEAD MOVEMENT and POSITION — the semicircular canals detect ROTATIONAL movement
(via fluid deflecting hair cells), and the otolith organs detect LINEAR acceleration
and STATIC head position relative to gravity (via otolith-crystal movement deflecting
hair cells) — this is a BALANCE-detection system, not a sound-detection system,
despite sharing the same hair-cell mechanotransduction mechanism and inner-ear location
with the cochlea.
**Verification-of-death**: given a scenario describing a person spinning in place with
their eyes closed, the learner correctly identifies the vestibular system (not the
cochlea) as responsible for their sense of rotation, and correctly names the specific
vestibular structure (semicircular canals) involved.

## Analogies
- The piano-keyboard-along-the-membrane model for tonotopic coding: each location
  along the basilar membrane is like a specific KEY on a piano, tuned to respond
  maximally to one specific pitch — creating a spatial "keyboard" of frequency
  response, distinct from how hard any individual key is struck (intensity).
- The shared-sensor-different-purpose model for the vestibular system versus cochlea:
  a microphone and a seismometer might use SIMILAR underlying vibration-sensing
  technology, but one detects sound and the other detects ground movement — the
  cochlea and vestibular system similarly share hair-cell mechanotransduction while
  serving entirely different detection purposes.

## Demonstrations
- Present the loud-low-pitch-versus-quiet-high-pitch scenario and ask the student to
  identify which basilar-membrane location and which firing rate would be involved for
  each sound.
- Present the spinning-with-eyes-closed scenario and ask the student to identify which
  system (cochlea or vestibular) and which specific structure is responsible for the
  resulting sense of rotation.

## Discovery Questions
- "If a sound gets LOUDER but stays the SAME pitch, does the LOCATION of maximum
  basilar-membrane activation change, or does something else change instead? What
  about if the PITCH changes but the loudness stays the same?"
- "The vestibular system and the cochlea are right next to each other and use the same
  basic hair-cell mechanism. Does this mean they detect the same thing? What does the
  vestibular system actually detect?"
- "If you spin around with your eyes closed, what specific structure lets you sense
  that you're rotating, even without seeing anything move?"

## Teaching Sequence
1. Introduce ear anatomy (outer, middle, inner) and hair-cell mechanotransduction as
   the shared underlying mechanism before discussing hearing and balance separately.
2. Introduce tonotopic coding, directly correcting the frequency-coded-like-intensity
   misconception using the loud-low-pitch/quiet-high-pitch scenario.
3. Introduce the vestibular system's structures (semicircular canals, otolith organs),
   directly correcting the vestibular-system-detects-sound misconception using the
   spinning scenario.
4. Close by explicitly connecting the shared mechanism (hair-cell
   mechanotransduction) across both systems while reinforcing their distinct functions.

## Tutor Actions
- If a student conflates frequency and intensity coding: ask them to separately state
  what determines pitch (location) versus loudness (firing rate).
- If a student describes the vestibular system as detecting sound: ask them what
  SPECIFIC stimulus (movement, not sound) it actually detects, and name the specific
  structure involved.
- If a student cannot connect the cochlea and vestibular system's shared mechanism:
  ask them what underlying cellular mechanism (hair-cell mechanotransduction) both
  systems use.

## Voice Teaching Notes
Say "location for pitch, rate for loudness" whenever tonotopic coding comes up, to keep
the two separate coding mechanisms explicit. Say "same sensor, different job" whenever
comparing the cochlea and vestibular system, to keep their functional distinction
active despite their shared mechanism.

## Assessment Signals
No seed corpus exists for this concept, so no item-bank diagnostic interpretation can be
given yet (see Runtime Asset References). The general diagnostic principle for M2, once
probes exist: a learner who correctly identifies the vestibular system (not the
cochlea) as responsible for detecting rotation shows the repaired model; a learner who
attributes this sense to the cochlea or to "hearing" is showing M2 in its cleanest,
most-detectable form.

## Tutor Recovery Strategy
For M1, present the loud-low-pitch/quiet-high-pitch scenario and ask the student to
predict BOTH the basilar-membrane location AND the firing rate involved for each sound,
forcing them to apply the two-separate-mechanisms distinction themselves. For M2,
present the spinning scenario and ask the student to name the specific responsible
system and structure BEFORE revealing the answer, testing whether the functional
distinction has been adopted.

## Memory Hooks
- "Pitch is about WHERE on the membrane; loudness is about HOW FAST it fires."
- "The vestibular system senses movement and position, not sound — same hair cells,
  totally different job."
- "Semicircular canals: rotation. Otolith organs: linear movement and gravity."

## Transfer Connections
- `bio.neuro.sensory-transduction` (prerequisite): supplies the general graded-
  receptor-potential and intensity-coding framework this concept applies specifically
  to mechanotransduction in hearing and balance.

## Cross-Subject Connections
No cross-subject connection is authored; the KG's own `cross_links` field for this
concept is empty.

## Blueprint References
No Blueprint exists for biology as a subject (per the standing note for this authoring
campaign). This concept has zero seed content of any kind (confirmed via direct grep
against `biologySeedAssets.ts` and `biologyDepthSeedAssets.ts`); both misconceptions
above were authored directly from first principles using the birth-taxonomy diagnostic
procedure (`educational-brain/misconceptions/01-birth-taxonomy.md`), following the
established precedent set by `bio.found.scientific-method-in-biology` and
`bio.found.unifying-themes-in-biology`.

## Runtime Asset References
No seed content of any kind exists for this concept in `biologySeedAssets.ts` or
`biologyDepthSeedAssets.ts` — this is one of the 91 concepts added by the 2026-09-14 KG
extension. This EB entry is authored entirely from first principles and does not cite
any runtime asset. Seeding `core_explanation`/`misconception_repair`/`mcq`/
`misconception_probe` content for this concept, and a probe-depth `short_answer` to
reach the 3-probe contract floor, remain outstanding tasks for whichever future
initiative seeds content for the 91-concept KG-extension pool (a separate, larger,
not-yet-started task per the standing note in `CLAUDE.md`'s Biology program section).

## Curriculum Feedback
The KG description's named sub-topics (ear anatomy including outer/middle/inner ear,
hair-cell mechanotransduction in the cochlea, tonotopic coding along the basilar
membrane, the vestibular system's role in balance and head-movement detection) are all
covered in this EB entry directly from first principles, since no seed content exists
to check against. No additional Curriculum Feedback gap is recorded for this entry.

## Version History
- 2026-09-20: Initial authoring (forty-second recomputed topological frontier, batch of
  3 with `bio.gen.quantitative-genetics-heritability` and `bio.physio.endocrine-
  disorders-feedback`, all first-principles entries — an EIGHTH consecutive fully
  zero-seed-content batch, 0 of 27 frontier candidates), EB concept 142/199.
