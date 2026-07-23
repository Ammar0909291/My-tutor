# Postulates of Special Relativity — `phys.rel.postulates`

## Identity

- **Concept ID**: `phys.rel.postulates` (canonical physics KG)
- **Curriculum location**: physics / relativity — dependency level 9.
  First Relativity domain concept authored in this program; entry point
  reached via classical mechanics' relative motion and classical
  electromagnetism's wave capstone.
- **Prerequisites**: `phys.mech.relative-motion`, `phys.em.electromagnetic-waves`
  — special relativity's postulates directly extend the already-secure
  relativity-of-motion concept while resolving the tension it creates
  with light's constant speed (established via the EM-wave prerequisite).
- **Unlocks** (from KG): `phys.rel.simultaneity` — a genuine hub concept,
  the entry into relativity's counterintuitive consequences.
- **Difficulty**: proficient · **Bloom**: understand · **Mastery threshold**: 0.80
  · **Est. hours**: 4

## Learning Objective

The learner can: (1) correctly state that the speed of light does NOT
add like ordinary velocities — a beam of light emitted from a spaceship
moving at 0.8c toward Earth is measured at exactly c by an Earth
observer, NOT 1.8c, a direct experimental result (confirmed originally by
Michelson-Morley and repeatedly since) that breaks familiar Galilean
velocity addition; (2) correctly explain Einstein's first postulate (laws
of physics are the same in all INERTIAL frames) applies only to
INERTIAL (non-accelerating) frames — a rotating or otherwise
accelerating frame is explicitly NOT covered, since objects in it
experience genuine centrifugal/Coriolis effects absent in truly inertial
frames; (3) correctly explain that relativity of simultaneity (two
events simultaneous in one frame but not another) means BOTH observers
are correct in their own frame — it is not that one observer is
"wrong" or "lying," but that simultaneity itself is frame-dependent, not
absolute; (4) correctly explain that the Michelson-Morley null result
(failing to detect the hypothesized aether) does not merely mean
"they hadn't found it yet" — it has been repeatedly confirmed by
increasingly precise experiments and is fully consistent with, not
merely "not yet disproving," special relativity's postulates.

## Core Understanding

Einstein's special relativity rests on two postulates: (1) the laws of
physics are identical in all INERTIAL reference frames, and (2) the
speed of light in vacuum is the same constant, c, for all inertial
observers, regardless of the light source's motion. This second
postulate directly breaks the everyday, deeply intuitive rule of
Galilean velocity addition: a spaceship moving toward Earth at 0.8c that
turns on its headlight does NOT produce a beam measured at 0.8c+c=1.8c
by an Earth observer — the beam is measured at EXACTLY c, no more, no
less, a result directly confirmed by the historical Michelson-Morley
experiment (which searched for a directional variation in light's speed
due to Earth's own orbital motion and found none) and reconfirmed by
many subsequent, increasingly precise experiments. The first postulate's
scope is specifically restricted to INERTIAL frames — non-accelerating
reference frames — and this restriction genuinely matters: a person on a
spinning merry-go-round experiences real centrifugal and Coriolis
effects that have no counterpart in a true inertial frame, so "all
motion is relative" (a correct, general statement) must NOT be conflated
with "all frames are equivalent" (false without the inertial
restriction) — a rotating frame is explicitly non-inertial and outside
the first postulate's scope. A further, deeply important consequence
(simultaneity's relativity, developed fully in the KG unlock) can feel
paradoxical: when two events are simultaneous in one observer's frame but
NOT in another's (moving) frame, this does NOT mean one observer is
mistaken — physics has no single, absolute, frame-independent "true"
simultaneity to appeal to, so both observers' frame-relative
descriptions are equally, genuinely correct. Finally, the historical
Michelson-Morley null result is often misunderstood as merely an
inconclusive failure to find something that might still exist — but this
undersells the evidence: the experiment has been REPLICATED with
ever-increasing precision, and subsequent, independent experiments
(Kennedy-Thorndike, Ives-Stilwell, modern laser interferometry) all
CONFIRM light's constant speed, providing robust, repeated, positive
support for special relativity's postulates, not merely a single
inconclusive negative result.

## Mental Models

**Beginner**: "Velocities should always add up normally, even for light
(0.8c+c=1.8c); 'all motion is relative' means any reference frame,
including a spinning one, works equally well for physics; if two events
seem simultaneous to one observer but not another, one of them must be
wrong; Michelson-Morley just means scientists hadn't found the aether
YET." Upgrade trigger: examining the actual measured result (light beam
still measures exactly c) directly confronts the velocity-addition
assumption; considering a spinning merry-go-round's genuine centrifugal
effects directly confronts the all-frames-equivalent assumption;
carefully tracing through the moving-train thought experiment (both
observers genuinely correct in their own frame) directly confronts the
one-is-wrong assumption; examining the repeated, precision-improving
confirmations since Michelson-Morley directly confronts the
not-found-yet framing.

**Intermediate**: "Light's speed is invariant (doesn't add like normal
velocities); the first postulate applies only to inertial frames, not
rotating ones; simultaneity is genuinely frame-dependent, with no single
observer being 'wrong'; light-speed invariance has been repeatedly,
positively confirmed, not just once inconclusively." This model
correctly captures all four core results, but sometimes still reaches
for Galilean-addition intuitions by reflex in unfamiliar
high-speed scenarios.

**Advanced**: "Always check whether a frame is genuinely INERTIAL before
applying the first postulate; treat frame-dependent results
(simultaneity, and later time dilation/length contraction) as
descriptions of physical reality from different valid perspectives, not
as puzzles requiring one 'correct' resolution."

**Expert**: the Lorentz transformation as the precise mathematical
machinery unifying both postulates into a single, self-consistent
framework replacing Galilean transformations — a natural consolidation
directly connecting to the KG unlock `phys.rel.simultaneity`, not
required for mastery.

## Why Students Fail

The dominant failure is applying familiar Galilean velocity addition to
light, expecting speeds to simply sum; secondary failures include
conflating "all motion is relative" with "all frames (including
non-inertial ones) are equivalent," expecting one observer to be
objectively "wrong" when simultaneity differs between frames, and
underestimating the Michelson-Morley result's strength as repeatedly
confirmed evidence rather than a single inconclusive null finding.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.rel.postulates.md`,
Misconception Engine, MC-1 through MC-4) documents four; reused by
reference with birth-type added.

- **MC-1 (MC-SPEED-OF-LIGHT-ADDS-LIKE-OTHER-SPEEDS)**: expecting
  0.8c+c=1.8c for a headlight beam from a fast-moving spaceship. **Birth
  type**: overgeneralization (Type 1) — Galilean velocity addition,
  correct and deeply intuitive for everyday speeds, is incorrectly
  extended to light, whose speed is experimentally invariant regardless
  of source motion. Probe: "A spaceship moves toward Earth at 0.8c and
  turns on its headlight. How fast does the beam travel, as measured by
  an Earth observer?"
- **MC-2 (MC-POSTULATE-1-APPLIES-TO-ALL-FRAMES)**: believing "all motion
  is relative, so all frames are equivalent," including rotating ones.
  **Birth type**: overgeneralization (Type 1) — the correct, general
  statement that motion is relative is incorrectly extended past its
  actual scope (inertial frames only) to include non-inertial
  (accelerating/rotating) frames, which experience genuinely different
  physics. Probe: "A person on a spinning merry-go-round says 'the laws
  of physics are the same in my frame.' Is this consistent with
  Einstein's first postulate?"
- **MC-3 (MC-SIMULTANEITY-IS-AN-ILLUSION)**: believing one observer must
  be "wrong" or "lying" when simultaneity differs between frames. **Birth
  type**: overgeneralization (Type 1) — the deeply held expectation that
  physical facts must be absolute and frame-independent is incorrectly
  extended to simultaneity, which is genuinely frame-relative in special
  relativity. Probe: "In the moving-train thought experiment, two
  lightning strikes are simultaneous in the ground frame but not in the
  train frame. Does this mean one observer is wrong?"
- **MC-4 (MC-AETHER-DISPROVED-RELATIVITY-IS-JUST-A-THEORY)**: believing
  Michelson-Morley merely "failed to find" the aether, implying it might
  still exist and relativity remains unconfirmed. **Birth type**:
  instruction-induced (Type 5) — a null result is often colloquially
  read as "inconclusive," obscuring how repeated, precision-improving
  replications (Kennedy-Thorndike, Ives-Stilwell, modern laser
  experiments) have transformed it into strong, positive, repeatedly
  confirmed evidence. Probe: "Does the Michelson-Morley experiment's null
  result just mean scientists 'haven't found the aether yet,' or does it
  constitute strong, repeatedly confirmed evidence for something
  specific?"

## Analogies

**Best**: measuring the speed of a sound wave from a moving source (where
the MEDIUM's properties, not the source's speed, determine the wave
speed heard) — contrasted explicitly with light, which has NO medium at
all and whose speed is a fundamental constant independent of source
motion — directly targets MC-1 by highlighting light's genuinely
different (non-Galilean-additive) behavior.

**Anti-analogy**: do NOT say "everything is relative" as an unqualified
summary of relativity — this vague phrasing directly invites MC-2 by
suggesting no frame-based restrictions exist at all.

## Demonstrations

Conceptual: trace the Michelson-Morley setup and its null result,
extended by later replications with improving precision — directly
targets MC-4. Thought-experiment: the moving-train simultaneity scenario,
explicitly tracing both observers' internally consistent, equally valid
frame-relative accounts — directly targets MC-3. Conceptual: contrast a
truly inertial frame against a spinning merry-go-round's genuine
centrifugal effects — directly targets MC-2.

## Discovery Questions

Discovery-style: "if a spaceship moving at 0.8c toward Earth turns on its
headlight, and Galilean addition were correct, the beam should travel at
1.8c. Does the actual, measured speed of that beam confirm or refute
this?" — learner examines the invariant-speed result directly,
confronting MC-1.

## Teaching Sequence

Blueprint's assessment component cited by reference. MC-1 (velocity
addition) is addressed first (establishing light's invariant speed as the
foundational, most surprising postulate), before MC-4 (Michelson-Morley's
evidential strength, directly supporting MC-1's resolution), then MC-2
(the inertial-frame restriction on the first postulate) and MC-3
(simultaneity's genuine frame-relativity, a direct consequence once both
postulates are accepted) — this order lets the evidence for light's
invariant speed anchor the more abstract, consequence-level
misconceptions that follow from it.

## Tutor Actions

WORKED-EXAMPLE (velocity-addition comparison: sound-from-a-moving-source
vs. light); THOUGHT-EXPERIMENT (moving-train simultaneity scenario);
COMPARE-CONTRAST (inertial frame vs. rotating/non-inertial frame);
DATA-ANALYSIS (Michelson-Morley and its subsequent replications).

## Voice Teaching Notes

Listen for Galilean velocity addition applied to light, "all frames are
equivalent" stated without the inertial qualifier, or one observer
declared "wrong" about simultaneity — the clearest tells. Load-bearing
sentence: "light's speed doesn't add like ordinary speeds — it's always
exactly c for everyone, in every INERTIAL frame, and 'simultaneous'
genuinely depends on which frame you're in, with no single frame being
the 'true' one." Channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner predicting light speed adds like ordinary velocities signals
MC-1 (MISCONCEIVING, full repair via the invariant-speed evidence). A
learner applying the first postulate to a rotating frame signals MC-2
(full repair via the inertial-vs-rotating contrast). A learner declaring
one observer "wrong" about simultaneity signals MC-3 (full repair via
the moving-train thought experiment). A learner underselling
Michelson-Morley's evidential strength signals MC-4 (full repair via the
replication-history data). Mastery trigger: correctly stating light's
invariant speed, AND correctly scoping the first postulate to inertial
frames, AND correctly explaining frame-relative simultaneity without
declaring either observer wrong. Blueprint's assessment component cited
for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget the spaceship's speed for a second — what
does the Earth observer's measuring instrument actually record for the
beam's speed?" (isolating the direct experimental result before
discussing why it's surprising). See `../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (light's invariant speed; inertial-frame restriction;
frame-relative simultaneity) bound to procedure (identifying whether a
given frame is genuinely inertial). Interleave with
`phys.mech.relative-motion`, `phys.em.electromagnetic-waves`, and, once
authored, `phys.rel.simultaneity` (the direct KG unlock, developing the
simultaneity consequence fully).

## Transfer Connections

Near: any problem distinguishing inertial from non-inertial frames, or
reasoning about light-speed invariance. Far: GPS satellite engineering
(relativistic corrections, both special and general, are essential for
GPS accuracy) and particle accelerator physics (particles routinely
reach speeds where relativistic effects are unavoidable, not
approximations). Real-world: understanding why GPS satellites must
apply relativistic time corrections to remain accurate. Expert: the
Lorentz transformation unifying both postulates mathematically.

## Cross-Subject Connections

KG `cross_links` empty. No strong cross-subject connection identified;
honest "weak but real" assessment.

## Blueprint References

Blueprint exists (Component-format). Reuses: Misconception Engine
(MC-1 through MC-4) and its assessment component by reference. Not
restated: Concept Identity & Metadata, Concept Explanation Library,
Worked Examples, Lesson Composition Grammar, Retrieval Spacing Schedule,
Prerequisite & Unlock Map, Validation Checklist.

## Runtime Asset References

No seeded `AssetIdentity` records — checked against `brainSeedAssets.ts`.
None created.

## Curriculum Feedback

No cross-subject connection found beyond physics itself.

## Version History

- 2026-07-23 (physics EB Wave 9): initial authoring.
