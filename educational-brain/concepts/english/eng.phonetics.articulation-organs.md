# Organs of Articulation — `eng.phonetics.articulation-organs`

## Identity

- **Concept ID**: `eng.phonetics.articulation-organs` (canonical
  English KG)
- **Curriculum location**: English / phonetics / "Organs of
  Articulation" — the entry point of the phonetics domain's descriptive
  system, giving speech sounds a physical, mechanistic vocabulary
  (place, manner, voicing) that every subsequent phonetics concept
  builds on.
- **Prerequisites**: `eng.phonetics.speech-sounds-overview` —
  specifically the sound/letter distinction that entry establishes;
  load-bearing because this concept assumes the learner already accepts
  that a "sound" is a physical, spoken event independent of its letter
  spelling, which is the precondition for asking HOW that physical
  event is produced.
- **Unlocks** (from KG): `eng.phonetics.consonant-sounds` and
  `eng.phonetics.vowel-sounds`, both branching directly from this
  concept. Neither downstream concept's classification system (place/
  manner/voicing for consonants; tongue-height/backness/rounding for
  vowels) is meaningful without the physical articulator vocabulary and
  the voicing/volume distinction this concept installs first.
- **Difficulty**: developing · **Bloom**: understand · **Mastery
  threshold**: 0.75 · **Est. hours**: 2

## Learning Objective

The learner can:
1. Name and physically locate the major articulators (lips, teeth,
   tongue tip/back, alveolar ridge, palate, velum, vocal folds) on
   their own face and mouth.
2. Identify which articulator(s) form the primary "place" for a given
   consonant sound.
3. Distinguish voiced from voiceless sounds using the throat-vibration
   ("buzz") test, independent of volume.
4. Classify a sound by manner (stop, fricative, or nasal) based on how
   airflow is shaped, not merely where it is produced.
5. Describe a consonant sound using all three dimensions (place,
   manner, voicing) together, in plain language if formal terms are not
   yet secure.

## Core Understanding

Every speech sound is produced by a specific, physically describable
configuration of the vocal tract — a whole coordinated system of
articulators (lips, teeth, tongue, palate, velum, vocal folds), not any
single organ acting alone. Two independent physical dimensions govern
this configuration and must be held as genuinely separate facts: PLACE
(where in the vocal tract the airflow is narrowed or blocked — bilabial,
alveolar, velar, and so on) and VOICING (whether the vocal folds
vibrate during the sound, a physical on/off condition entirely
independent of loudness). A third dimension, MANNER (how the airflow is
shaped once the place of constriction is set — fully blocked and
released as a stop, forced through a narrow channel as a fricative, or
routed through the nose as a nasal), is introduced here at an
foundational level and given its full systematic treatment in the
downstream `eng.phonetics.consonant-sounds` concept. The single most
important corrective this concept delivers is that voicing is a
vibration test, never a loudness test — a fact that is genuinely
counterintuitive because loud and forceful speech feels, impressionistically,
like it should correlate with "more voiced," when in fact the two
properties are entirely orthogonal.

## Mental Models

- **Beginner model — "different sounds involve the tongue in different
  ways"**: a plausible, partially-correct starting intuition, since the
  tongue genuinely is the primary articulator for many common sounds.
  This model is pre-instructional rather than taught, and this
  concept's job is to correct its overreach (MC-ONLY-TONGUE-MATTERS)
  rather than build it from scratch.
- **Intermediate model — "I can physically locate and name each
  articulator on my own face, and identify which ones a given sound
  uses"**: installed by the Component 3 vocal-tract-tour anchor, which
  pairs each articulator name with a felt, physical action. Upgrade
  trigger: correctly identifying that a sound like /m/ or /f/ barely
  involves the tongue at all, directly resolving MC-ONLY-TONGUE-MATTERS
  through concrete counter-examples rather than abstract correction.
- **Advanced model — "voicing is a vocal-fold vibration test,
  completely independent of volume"**: installed by TA-3's buzz-test
  procedure, deliberately tested at multiple volumes to break the
  loudness-voicing conflation directly. Upgrade trigger: correctly
  identifying a quietly-whispered voiced sound as still voiced, or a
  loudly-shouted voiceless sound as still voiceless.
- **Expert model — "any consonant can be fully described by combining
  place, manner, and voicing together"**: installed by TA-4/TA-5,
  where the learner produces a complete, three-dimension description of
  a sound using whichever register of vocabulary (plain-language or
  formal) they currently command. This model is the direct foundation
  for the systematic full-inventory work of `eng.phonetics.consonant-
  sounds`.
- **Do not upgrade early**: per the Blueprint's own explicit Adaptive
  Flag, formal terminology (bilabial, nasal, fricative) should never
  gate mastery ahead of the underlying physical understanding — a
  learner who correctly describes /m/ as "lips together, air through
  the nose, and it buzzes" has met this concept's actual bar even
  without yet using the word "nasal."

## Why Students Fail

Two independent failure mechanisms operate here. The tongue-only
failure exists because the tongue genuinely IS the dominant, most
visually and kinesthetically salient articulator for a large share of
consonants (all the alveolar and velar sounds, for instance), so a
learner's attention is drawn there first and most strongly — the error
is an availability bias toward the most noticeable articulator, not a
belief that other articulators literally cannot exist. The voicing-as-
volume failure exists because loudness and vocal-fold activity are, in
ordinary untrained experience, frequently correlated in casual speech
(shouting often does involve more vocal-fold engagement in a loose,
impressionistic sense) even though they are formally and precisely
independent properties — a learner has no prior reason to have isolated
"vibration" as a distinct physical event from "loudness" until this
concept's buzz test explicitly separates them.

## Misconceptions

The existing Blueprint (`docs/curriculum/blueprints/
eng.phonetics.articulation-organs.md`, Component 1) documents both
misconceptions this concept produces, with full trigger/probe/bridge/
replacement/discrimination content — reused by reference below, with
birth-type classification added
(`../../misconceptions/01-birth-taxonomy.md`).

**MC-ONLY-TONGUE-MATTERS (Blueprint Component 1) — Type 2, perceptual
intuition**
- *Why (birth-type addition)*: this is a genuine perceptual-salience
  effect rather than a wrongly-taught rule — the tongue's role in
  speech is the most kinesthetically noticeable to the speaker
  themselves (it moves the most, and its movement is easiest to feel),
  so it dominates a learner's naive theory of speech production by
  availability, not by an incorrect prior instruction.
- *Full trigger/probe/bridge/replacement/discrimination content*: see
  Blueprint Component 1, verbatim — not restated here.
- *Characteristic phrase (addition)*: a learner who, on being asked
  about /m/, initially says "I don't know, my tongue isn't really doing
  anything" (rather than confidently insisting the tongue must be
  involved) is showing early, productive uncertainty — a more advanced
  state than a learner who confidently but incorrectly describes tongue
  movement that isn't actually occurring.

**MC-VOICED-VOICELESS-IS-VOLUME (Blueprint Component 1) — Type 2,
perceptual intuition**
- *Why (birth-type addition)*: also perceptual rather than rule-based
  — loudness and vocal-fold vibration are two genuinely different
  physical phenomena that happen to co-occur often enough in casual,
  emphatic speech that a learner has no prior occasion to have
  distinguished them; this is a case of two correlated-but-independent
  variables being conflated through lack of prior need to separate
  them, not an overextended rule.
- *Full trigger/probe/bridge/replacement/discrimination content*: see
  Blueprint Component 1, verbatim — not restated here.
- *Characteristic phrase (addition)*: a learner who, mid-test, spontaneously
  notices "wait, it still buzzes even when I whisper it" is
  demonstrating the exact conflict-evidence moment working as intended
  — this specific phrasing ("it still buzzes") is strong positive
  evidence the volume/voicing separation has landed, and further
  drilling of the same test is not needed once this phrase appears.

## Analogies

- **Best analogy — a factory with different stations, each doing a
  different job on the same material (air)**: air passes through a
  sequence of possible "stations" (lips, teeth, tongue, palate, velum,
  throat), and different sounds engage different combinations of
  stations, not always the same one. Breaking point: a factory implies
  a fixed sequential order, whereas speech articulators can act
  simultaneously (e.g., lips and vocal folds together for /b/) rather
  than strictly in sequence — the analogy targets the MULTIPLE-STATIONS
  idea, not a strict production-line order.
- **Alternative — a light switch for voicing (on/off), separate from a
  volume dial**: two independent controls on the same device, directly
  targeting the voicing/volume conflation. Breaking point: the
  switch/dial framing may suggest voicing is a simple, effortful choice
  the speaker makes each time, when in fact it is largely automatic in
  fluent native speech — useful for the DIAGNOSTIC test, not for
  suggesting conscious real-time control during ordinary talking.
- **ANTI-ANALOGY — do NOT describe voiceless sounds as "quiet" or
  "soft" sounds and voiced sounds as "loud" or "strong" sounds**: this
  framing directly installs MC-VOICED-VOICELESS-IS-VOLUME by encoding
  the false volume-voicing correlation directly into the descriptive
  vocabulary used to teach the distinction. Voiced/voiceless must always
  be introduced via the buzz test, never via a loudness-flavored
  synonym.

## Demonstrations

- **Physical/kinesthetic (vocal-tract tour)**: the Blueprint's
  Component 3 anchor — canonical, referenced not restated.
- **Home/no-equipment**: every articulator and both tests (place, buzz)
  require nothing beyond the learner's own face, mouth, and a hand on
  the throat.
- **Interactive/learner-activity**: TA-2's place-sorting task and TA-4's
  manner-classification task are both hands-on, felt-sensation
  activities requiring the learner to test and report, not merely
  recall.
- **Teacher-demo (voicing at multiple volumes)**: the tutor models the
  buzz test on the same sound pair at a whisper and at full volume,
  explicitly narrating that the vibration presence/absence does not
  change with volume — directly instantiating the Blueprint's own
  conflict-evidence probe.
- **Prediction to elicit FIRST, every time**: before confirming a
  place, manner, or voicing judgment (TA-2/TA-3/TA-4), ask the learner
  to predict from feel alone before the tutor confirms — Universal
  Principle 3.

## Discovery Questions

**Direct instruction wins for the articulator inventory itself; a
felt-experience discovery step suits the voicing/volume separation.**
The names and locations of the articulators are pure anatomical fact —
there is no regularity to discover in what the alveolar ridge is called
or where it sits, only a physical vocabulary to be demonstrated and
located, matching this domain's treatment of similarly convention-
bound content elsewhere. The voicing-is-vibration-not-volume insight,
however, is well-suited to a brief, directly-felt discovery moment
built into TA-3's own design: **need** (the learner, having just
assumed voicing tracks loudness, is asked to test this belief directly);
**playground/invention** (the buzz test performed across multiple
volumes on the SAME sound, letting the learner notice for themselves
that the vibration persists regardless of how loud or quiet the
production is); **formalization** (MP-5's own-words statement that
place refers to WHERE and that non-tongue articulators matter);
**compression** (TA-5's fluent three-dimension description of a sound
without needing to re-run every test explicitly each time). This is a
single-session, felt discovery rather than a multi-step induction arc,
appropriate to a directly testable physical fact rather than an
inducible abstract rule.

## Teaching Sequence

TA-1 (articulator identification) must precede TA-2 (place sorting)
because a learner cannot sort sounds by WHICH articulator is primary
until they can reliably name and physically locate each articulator
individually. TA-3 (voicing throat test) is placed after TA-1/TA-2, not
before, because introducing voicing alongside place risks conflating
two independent dimensions before either is separately secure — place
is established as its own complete skill first. TA-4 (manner
introduction) is placed after voicing rather than before, because
manner (how airflow is shaped) is conceptually the most abstract of the
three dimensions, benefiting from the learner already having two
concrete, physically-tested dimensions (place, voicing) as scaffolding
for understanding a third. TA-5 (full three-dimension description) is
placed last as the integration step, requiring all three dimensions
operating together, matching the eventual full-inventory work of
`eng.phonetics.consonant-sounds`. This entry does not restate the
Blueprint's own turn-by-turn session script (Component 7) — see
Blueprint References below.

## Tutor Actions

Dispatch order for this concept, from `../../teaching-actions/`:
1. **Demonstration** (`01-show-family.md #1`) — the vocal-tract-tour
   anchor for TA-1.
2. **Classification/Sorting** (`05-organize-family.md #20`) — TA-2's
   place-of-articulation sort.
3. **Guided discovery** (`04-test-thinking-family.md`,
   discovery-adjacent) — TA-3's multi-volume buzz test, eliciting the
   voicing/volume separation through direct, felt testing.
4. **Fact/concept introduction** (`02-tell-family.md`) — TA-4's manner
   introduction, since the three manner categories (stop, fricative,
   nasal) are convention-bound terms best demonstrated directly rather
   than induced.
5. **Self-Explanation Prompt** (`04-test-thinking-family.md #18`) —
   MP-5's own-words statement of the place-of-articulation system and
   why the tongue alone is insufficient.

**What does NOT fit, and why**: Error Analysis
(`04-test-thinking-family.md #17`) on the base articulator-identification
skill is excluded before TA-1/TA-2 are secure, per this domain's
standing stability-guard reasoning. It becomes more defensible once
TA-3's voicing test is established, where a deliberately mis-applied
"loudness test" (rather than the buzz test) can be productively
analyzed as an error, since the learner by then has the correct test to
check it against.

## Voice Teaching Notes

- **What to listen for**: whether the learner physically demonstrates
  the buzz test (audible hand-on-throat checking, or a genuinely
  vibrating vs. non-vibrating production) rather than merely stating a
  voicing judgment from memory or guesswork — the physical test itself
  is the skill, not just its eventual correct answer.
- **Characteristic hesitations**: a pause before answering a voicing
  question, accompanied by an audible re-production of the sound
  (re-testing rather than recalling), is a strong positive sign — it
  shows the buzz test has become the learner's actual go-to procedure
  rather than a one-time demonstration.
- **Pronunciation stakes**: largely low for this concept specifically —
  the goal is DESCRIBING how a sound is produced (place, manner,
  voicing), not correcting the learner's own accent or pronunciation;
  per the Blueprint's own Adaptive Flag, an L1-influenced production of
  an English sound is a legitimate object of comparison and description,
  not an error to fix.
- **The load-bearing sentence**: "hand on your throat — does it buzz?"
  is this concept's single load-bearing sentence, and per the
  Blueprint's own explicit instruction, must be modeled and repeated at
  multiple volumes deliberately, per
  `../../foundations/03-voice-first-learning-model.md §3`.

## Assessment Signals

- **Diagnostic (golden probe)**: the Blueprint's own conflict-evidence
  probe (Component 1) — saying "mmmm" and asking where the tongue is,
  then contrasting with "ffff" — cleanly separates a learner still
  defaulting to tongue-only explanations from one who is beginning to
  consider the full articulator system.
- **Guided practice → independent practice**: the Blueprint's WE-1 → WE-2
  → WE-3 → MP-1 through MP-5 fading ladder is reused directly
  (Components 5–6) — not re-authored here.
- **Mastery gate set** (`../../assessment/05-mastery-verification.md
  §3`): production (fresh articulator identification, MP-1); voicing-
  discrimination (a novel voiced/voiceless pair, MP-2 — tested via the
  buzz test, not guessed); manner-classification (MP-3); volume-
  independence (MP-4, the concept's single most diagnostic item for the
  voicing/volume separation, since it explicitly probes whether volume
  can be trusted as a proxy); explanation (MP-5).
- **Interpretation of response pattern**: fast-and-correct application
  of the buzz test on a fresh pair confirms the voicing/volume
  separation is internalized; fast-and-WRONG judgments based on
  apparent loudness (rather than an actual physical check) is the
  dangerous quadrant — it signals the volume heuristic is still the
  dominant, unexamined strategy, and warrants re-running the multi-
  volume buzz test rather than more practice at a single volume.
- **Transfer items**: near (a fresh consonant's place/manner/voicing);
  far (a sound from the learner's own L1, if applicable, tested with the
  same three-dimension method — a genuine test of whether the framework
  is a general linguistic tool or an English-specific memorized list);
  real-world (noticing, in the learner's own ordinary speech, which
  articulators are engaged for a sound just produced naturally).

## Tutor Recovery Strategy

Concept-specific application of `../../foundations/01-recovery-engine.md`:
- **"I don't know"** on a place-or-voicing question shrinks to the
  Component 3 vocal-tract-tour anchor using the single most physically
  obvious sound available (typically /p/ or /m/, both lips), performed
  with the tutor modeling the physical touch-and-say action first.
- **Likeliest utterance/behavior at this node**: a confident but
  tongue-only explanation is more likely than "I don't know," per
  MC-ONLY-TONGUE-MATTERS's mechanism — route directly to that
  misconception's recovery (the /m/ vs. /f/ conflict-evidence probe)
  rather than treating it as a generic phonetics-vocabulary gap. On the
  voicing test specifically, a loudness-based guess (rather than a
  hand-on-throat check) is more likely than genuine uncertainty — route
  to the multi-volume buzz-test recovery.
- **Non-verbal signal specific to this node**: a learner who
  spontaneously touches their own throat before answering a voicing
  question, without being prompted, is showing the correct testing
  behavior has already generalized — this should be named and praised
  explicitly as exactly the target habit.

## Memory Hooks

**Concept type**: concept/procedure hybrid — the articulator names and
locations are facts (fixed vocabulary, standard spaced fact-review),
while the place/manner/voicing TESTING procedures (touch-test, airflow-
test, buzz-test) are procedures reviewed through continued application
to novel sounds rather than simple recall. Interleaving partners: mix
place, manner, and voicing questions within the same practice set
(rather than blocking by dimension) so the learner cannot predict which
test is being asked for from context alone, directly rehearsing the
three-dimension integration this concept's advanced model requires.

## Transfer Connections

- **Near**: identifying place, manner, and voicing for fresh, un-
  practiced consonant sounds.
- **Far**: this concept's articulator vocabulary and testing procedures
  transfer directly to `eng.phonetics.consonant-sounds`' full systematic
  inventory and `eng.phonetics.vowel-sounds`' parallel classification
  system for vowels — both downstream concepts assume this concept's
  physical vocabulary and buzz-test procedure are already automatic.
- **Real-world**: any spoken sound the learner produces or hears is
  immediately describable using this concept's framework — a genuinely
  ungated, always-available practice domain.
- **Expert-transfer**: eventual formal phonetic transcription
  (`eng.phonetics.phonetic-transcription`, well downstream) depends on
  this concept's descriptive categories being solid, since IPA symbols
  are themselves organized by exactly these place/manner/voicing
  dimensions.

## Cross-Subject Connections

None found in the KG's `cross_links` field (empty for this concept) and
none genuinely warranted at this level — articulatory phonetics is
specific to linguistics/English language study and does not carry a
real transfer relationship into another subject at this stage, beyond
the general linguistics-adjacent connection the domain itself
represents.

## Blueprint References

A Blueprint exists: `docs/curriculum/blueprints/
eng.phonetics.articulation-organs.md`. This entry reuses, by reference
and without restating: Component 1's full misconception trigger/probe/
bridge/replacement/discrimination text (both misconceptions),
Component 3's vocal-tract-tour anchor, Components 5–6's worked examples
and mastery probe set (WE-1–3, MP-1–5), and Component 7's full session
architecture and protocol routing (S0/S1/S6/S9). This entry's own
contribution is the HOW-to-teach reasoning layer: mental model
progression across four stages, the failure-mechanism analysis in "Why
Students Fail" (identifying both misconceptions as Type 2 perceptual
intuitions rather than rule-based errors), birth-type classification,
an explicit argued case for direct instruction on the articulator
inventory paired with a felt-discovery step for the voicing/volume
separation, and the teaching-sequence reasoning explaining why place
must be secured before voicing, and voicing before manner.

## Runtime Asset References

No seeded `AssetIdentity` records exist for this concept in
`src/lib/teaching/assets/authoredSeedAssets.ts`,
`src/lib/teaching/assets/brainSeedAssets.ts`, or any other seed source
file in this repository, and this entry does not create, seed, or
propose any as part of its authoring.

## Curriculum Feedback

None found — the KG node's prerequisite
(`eng.phonetics.speech-sounds-overview`), difficulty, and mastery
threshold are all consistent with this concept's actual teaching
demands.

## Version History

- 2026-08-06 — Initial authoring (English Educational Brain completion
  program, batch 7, concept 1 of 2). All 21 Standard sections authored
  fresh against the live KG and existing Blueprint; no prior version
  existed.
