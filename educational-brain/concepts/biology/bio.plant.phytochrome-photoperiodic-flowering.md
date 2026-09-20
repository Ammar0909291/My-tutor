# bio.plant.phytochrome-photoperiodic-flowering — Phytochrome and the Molecular Basis of Photoperiodic Flowering

## Identity
- **Concept ID**: `bio.plant.phytochrome-photoperiodic-flowering`
- **Subject**: Biology
- **Domain**: Plant Biology (`bio.plant`)
- **Prerequisites**: `bio.plant.plant-growth-hormones`
- **Unlocks**: (none in KG)
- **Cross-links (KG)**: (none)
- **Difficulty**: expert
- **Bloom level**: analyze
- **Mastery threshold**: 0.80
- **Estimated hours**: 5

## Learning Objective
The student can correctly explain that plants specifically measure the LENGTH OF
UNINTERRUPTED DARKNESS (the critical NIGHT length), not day length directly, to
determine flowering timing, and correctly explain florigen (FT protein) as a MOBILE
signal produced in the LEAF but acting at the SHOOT APEX (a different location
entirely) — not a signal that acts where it is produced.

## Core Understanding
**Phytochrome** is a plant photoreceptor pigment that exists in TWO
photo-INTERCONVERTIBLE forms: **Pr** (absorbs red light, converting to Pfr) and
**Pfr** (absorbs far-red light, converting back to Pr) — red light converts Pr to Pfr,
while far-red light (or the slow, spontaneous dark-reversion process occurring during
darkness) converts Pfr back to Pr. Pfr is generally considered the biologically ACTIVE
form for many phytochrome-mediated responses. Critically, because Pfr slowly reverts
to Pr during DARKNESS (in addition to being directly converted by far-red light), the
RELATIVE proportion of Pr versus Pfr present in a plant's tissues at any given time
serves as an internal MOLECULAR indicator of how much UNINTERRUPTED DARKNESS the
plant has recently experienced.

This directly underlies the **critical-night-length model** of flowering induction —
the single most important corrective concept in this topic: plants do NOT directly
measure DAY length to determine flowering timing (despite historical terminology like
"short-day" and "long-day" plants, which can be misleading); they specifically measure
the LENGTH OF CONTINUOUS, UNINTERRUPTED DARKNESS (the "critical night length") via the
Pr/Pfr conversion dynamics described above. A "short-day" plant is, more precisely,
a "long-night" plant — it flowers when the CONTINUOUS DARK period exceeds a
critical THRESHOLD duration; a "long-day" plant is more precisely a "short-night"
plant — it flowers when the continuous dark period is SHORTER than its critical
threshold. This distinction has a striking, DIRECTLY testable experimental
consequence: briefly interrupting an otherwise-long night with even a short pulse of
light can PREVENT a short-day (long-night) plant from flowering — because that light
pulse resets the Pr/Pfr dynamics, effectively "breaking" the continuous dark period
into two shorter segments, neither of which reaches the critical threshold —
demonstrating conclusively that it is NIGHT LENGTH, not day length, that is actually
being measured.

The actual FLOWERING SIGNAL itself, once the appropriate night-length condition is
detected, is **florigen** (identified as the **FT protein**) — a MOBILE signalling
molecule. Critically, florigen is PRODUCED in the plant's LEAVES (where the
phytochrome-mediated night-length detection actually occurs) but TRANSMITTED, via the
plant's vascular tissue, to the SHOOT APEX (the growing tip, a physically DIFFERENT
location entirely), where it ACTS to trigger the developmental transition to flowering
— the leaf DETECTS the appropriate photoperiodic condition, but the shoot apex is
where the actual flowering RESPONSE occurs, connected by this specific long-distance
mobile signal. Finally, the overall photoperiodic response is further modulated by
**circadian gating** — the plant's internal circadian clock influences WHEN during the
daily cycle the plant is actually SENSITIVE to light signals for photoperiodic
purposes, adding a further layer of temporal regulation beyond the simple night-length
measurement alone.

## Mental Models
- **Measuring darkness, not daylight — a "time since the lights went off" clock, not
  a "how much daylight" clock**: think of the Pr/Pfr system as a clock that
  specifically tracks "how long has it been dark, uninterrupted?" rather than
  measuring daylight hours directly — this is why a brief interruption of darkness
  resets the measurement, while a brief interruption of daylight would NOT have the
  same disruptive effect.
- **Florigen as a message sent from the sensor to a distant control room**: the leaf
  acts like a SENSOR detecting the right conditions (night length), and florigen is
  the MESSAGE sent via the plant's internal "postal system" (vascular tissue) to a
  distant CONTROL ROOM (the shoot apex) where the actual decision to flower is
  executed — the sensor and the control room are in different physical locations.

## Why Students Fail
1. They assume plants directly measure DAY length (consistent with the "short-day"/
   "long-day" terminology), missing that plants actually measure the length of
   CONTINUOUS, UNINTERRUPTED DARKNESS (night length) via Pr/Pfr dynamics.
2. They fail to predict that briefly interrupting a long night with light would
   PREVENT flowering in a short-day plant, missing the direct experimental
   consequence of the critical-night-length model.
3. They assume florigen ACTS at the SAME location where it is produced (the leaf),
   missing that it is a MOBILE signal specifically transmitted to and acting at the
   shoot apex, a different location entirely.

## Misconceptions

No Blueprint exists yet for this concept, and no seed content exists in
`biologySeedAssets.ts`: this concept is one of the 91 added by the 2026-09-14 KG
extension and currently has zero authored explanations or probes of any kind (confirmed
via direct grep against `biologySeedAssets.ts` and `biologyDepthSeedAssets.ts` before
authoring). Both misconceptions below are therefore authored directly from first
principles using the birth-taxonomy diagnostic procedure
(`educational-brain/misconceptions/01-birth-taxonomy.md`), and are NOT tied to any
existing seed-corpus probe — there is none to cite.

### M1 — "Plants directly measure day length to determine flowering timing" (Type 3: Language contamination)
**Statement**: Consistent with the terms "short-day" and "long-day" plants, plants are
assumed to directly measure and respond to DAY (light-period) length, rather than
specifically measuring the length of CONTINUOUS, UNINTERRUPTED darkness (night
length).
**Origin**: The everyday, historical terminology itself ("short-day plant," "long-day
plant") directly names DAY length as the apparent variable being measured, colliding
with the actual underlying mechanism (Pr/Pfr dynamics specifically tracking
uninterrupted darkness), a Type 3 language-contamination collision analogous to the
"it's just a theory" case.
**Why it persists**: The terminology itself was coined before the underlying
mechanism was understood, and without an explicit correction, the terms' surface
meaning (day length) naturally suggests the wrong measured variable.
**Repair**: State the correction explicitly, rephrasing away from the misleading
terminology: a "short-day" plant is more accurately a "LONG-NIGHT" plant — it flowers
when CONTINUOUS DARKNESS exceeds a critical threshold; a "long-day" plant is more
accurately a "SHORT-NIGHT" plant. The Pr/Pfr phytochrome system specifically tracks
uninterrupted darkness duration, not daylight duration, which is directly confirmed by
the light-interruption experiment (see M2).
**Verification-of-death**: given the terms "short-day plant," the learner correctly
restates the actual measured variable as night length, not day length, and can
explain why the terminology is historically misleading.

### M2 — "Florigen acts at the same location (the leaf) where it is produced" (Type 4: Notation/mechanism-induced)
**Statement**: Florigen (FT protein) is assumed to exert its flowering-inducing
effect directly WITHIN the leaf tissue where it is produced, rather than being
TRANSPORTED to and acting at the shoot apex, a physically different location.
**Origin**: Without an explicit statement of florigen's MOBILE, long-distance
signalling role, a signalling molecule can be assumed by default to act locally,
where it is produced, rather than being specifically transported elsewhere to act.
**Why it persists**: Many signalling molecules in introductory biology act locally or
in the immediate vicinity of their production; without explicitly naming florigen's
SPECIFIC long-distance transport mechanism (via vascular tissue, from leaf to shoot
apex), a local-action default assumption can persist.
**Repair**: State the mechanism explicitly: florigen (FT protein) is PRODUCED in the
LEAF (where phytochrome-mediated night-length detection occurs) but is TRANSPORTED
via the plant's vascular tissue to the SHOOT APEX — a physically DIFFERENT location —
where it ACTS to trigger the developmental transition to flowering. The leaf detects;
the shoot apex responds; florigen is the long-distance messenger connecting the two.
**Verification-of-death**: given a scenario where a plant's leaves are exposed to the
correct night-length condition but the shoot apex is somehow isolated from the leaf's
vascular connection, the learner correctly predicts that flowering would NOT be
induced, reflecting florigen's dependence on actual physical transport to the shoot
apex.

## Analogies
- The "time since dark" stopwatch model for M1: the Pr/Pfr system is like a stopwatch
  that starts counting the MOMENT the lights go off and resets the moment ANY light
  appears — it measures elapsed DARKNESS specifically, not elapsed daylight, which is
  why even a brief light pulse during the night resets the count.
- The sensor-and-distant-control-room model for florigen: the leaf is a SENSOR
  detecting the right environmental conditions; florigen is a SIGNAL WIRE running from
  that sensor to a distant CONTROL ROOM (the shoot apex) where the actual flowering
  "switch" gets flipped — the sensor doesn't flip its own switch; it sends the signal
  elsewhere.

## Demonstrations
- Present the light-interruption experiment explicitly: a short-day plant given a
  long night, interrupted briefly by a light pulse partway through — ask the student
  to predict whether flowering occurs, and why.
- Present the isolated-shoot-apex scenario (leaf detects correct night length, but
  vascular connection to the shoot apex is severed) and ask the student to predict
  whether flowering would occur.

## Discovery Questions
- "If 'short-day plants' actually measure DAY length, would interrupting the NIGHT
  briefly with a flash of light matter? What if they're actually measuring something
  else entirely — what would you predict then?"
- "If florigen is produced in the leaf, does it exert its flowering effect right
  there in the leaf, or does it need to go somewhere else first? What would happen if
  it couldn't get there?"
- "Why might the historical terms 'short-day plant' and 'long-day plant' be
  misleading, given what phytochrome actually measures?"

## Teaching Sequence
1. Introduce phytochrome's Pr/Pfr interconversion before discussing flowering timing.
2. Directly correct the day-length misconception using the critical-night-length model
   and the light-interruption experiment.
3. Introduce florigen (FT protein), directly correcting the local-action
   misconception using the isolated-shoot-apex scenario.
4. Close by introducing circadian gating as a further layer of temporal regulation on
   top of the night-length measurement.

## Tutor Actions
- If a student describes plants as measuring day length: ask them to predict the
  light-interruption experiment's outcome, testing whether the night-length model has
  been adopted.
- If a student describes florigen as acting in the leaf: ask them where florigen
  actually travels to and acts, redirecting toward the shoot apex.
- If a student cannot explain the "short-day"/"long-night" terminology mismatch: ask
  them to restate a "short-day plant" in terms of night length instead.

## Voice Teaching Notes
Say "measuring darkness, not daylight" whenever photoperiodic timing comes up, to keep
the night-length model explicit. Say "detected here, acts over there" whenever
florigen's mechanism is discussed, to keep the leaf-to-shoot-apex transport active.

## Assessment Signals
No seed corpus exists for this concept, so no item-bank diagnostic interpretation can be
given yet (see Runtime Asset References). The general diagnostic principle for M1, once
probes exist: a learner who correctly predicts that a light pulse during a long night
would PREVENT flowering in a short-day plant shows the repaired model; a learner who
predicts no effect (assuming day length, not night length, is measured) is showing M1
in its cleanest, most-detectable form.

## Tutor Recovery Strategy
For M1, present the light-interruption experiment and ask the student to predict the
outcome BEFORE revealing it, forcing them to apply (or discover the need to revise)
the day-length assumption themselves. For M2, present the isolated-shoot-apex
scenario and ask the student to predict whether flowering occurs, deriving the
mobile-signal mechanism from the prediction task itself.

## Memory Hooks
- "Short-day plants are really long-night plants — a light flash during the night
  resets the clock and blocks flowering."
- "Florigen is made in the leaf but does its job at the shoot apex — a long-distance
  messenger."
- "Pr and Pfr track darkness duration, not daylight duration."

## Transfer Connections
- `bio.plant.plant-growth-hormones` (prerequisite): supplies the general plant
  hormone-signalling framework this concept extends into florigen's specific
  long-distance flowering-signal role.

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
The KG description's named sub-topics (phytochrome interconversion between Pr and Pfr
forms, the critical-night-length model of flowering induction, florigen (FT protein)
as the mobile leaf-to-shoot-apex signal, circadian gating of the photoperiodic
response) are all covered in this EB entry directly from first principles, since no
seed content exists to check against. No additional Curriculum Feedback gap is
recorded for this entry.

## Version History
- 2026-09-20: Initial authoring (forty-fourth recomputed topological frontier, batch of
  3 with `bio.behav.innate-behavior-instinct` and `bio.neuro.sleep-circadian-biology`,
  all first-principles entries — a TENTH consecutive fully zero-seed-content batch, 0
  of 25 frontier candidates), EB concept 148/199.
