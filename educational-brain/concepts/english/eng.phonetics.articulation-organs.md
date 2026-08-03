# Organs of Articulation — `eng.phonetics.articulation-organs`

## Identity

- **KG ID**: `eng.phonetics.articulation-organs`
- **Name**: Organs of Articulation
- **Domain**: English / Phonetics
- **Difficulty**: developing
- **Bloom level**: understand
- **Mastery threshold**: 0.75
- **Estimated hours**: 2
- **Requires**: `eng.phonetics.speech-sounds-overview` — load-bearing part: the learner must already hold that speech sounds are *physical events distinct from letters*, and must already have felt voicing with a hand on the throat. This entry takes that felt distinction and gives every part of it an address.
- **Unlocks**: `eng.phonetics.consonant-sounds`, `eng.phonetics.vowel-sounds`
- **Cross-links**: (none in the KG)
- **Blueprint**: `docs/curriculum/blueprints/eng.phonetics.articulation-organs.md`

## Learning Objective

The learner can:
1. Locate and name the major articulators on their own face and mouth — lips, teeth, alveolar ridge, hard palate, velum, tongue tip/blade/back, vocal folds.
2. For a given English sound, state which articulators are actually doing the work and which are passive.
3. Apply the throat-vibration test to determine voicing, independent of loudness.
4. Explain why sounds like /m/ and /f/ are counterexamples to a tongue-only account of speech.
5. Predict, for an unfamiliar sound, roughly where in the mouth it is being made, by attending to their own production.

## Core Understanding

Speech is produced by a **valve system with three functional layers**, and the whole concept is understanding that these layers are independent. An airstream comes up from the lungs. At the **larynx**, the vocal folds either vibrate (voiced: /z/, /b/, /m/, all vowels) or stay apart (voiceless: /s/, /p/, /f/) — this is a binary on/off switch and it is completely independent of loudness. Above that, the **velum** either seals off the nasal cavity or lowers to open it, routing air through the nose (/m/, /n/, /ŋ/) or the mouth (everything else). Above that, the **oral articulators** constrict the airway somewhere along its length. Some articulators move — lower lip, tongue tip, tongue blade, tongue back — and some are fixed targets that get moved *towards* — upper teeth, alveolar ridge (the bumpy shelf behind the upper front teeth), hard palate. A sound's identity is therefore a coordinate in a three-dimensional space: **voicing × place of constriction × manner of constriction**. This is exactly why /p/ and /b/ differ only in voicing, /p/ and /t/ only in place, and /p/ and /m/ only in nasality — and it is why the learner who holds this can *derive* the consonant chart at `eng.phonetics.consonant-sounds` instead of memorising it. The tongue is the most versatile articulator, not the only one, and treating it as the only one makes /m/, /f/, /p/, /b/, /w/ and /h/ inexplicable.

## Mental Models

**Beginner — "sounds come from the tongue."**
The runnable simulation: to make a different sound, move the tongue. The learner arrives with this — it is not tutor-installed — and it is a reasonable induction, because the tongue genuinely does most of the visible work in the sounds an untrained observer notices. It fails on the labials and on anything involving the nose or the larynx.
*Upgrade trigger*: hold /m/ for three seconds and ask where the tongue is. It is resting, doing nothing.
*Shelf-life warning at replacement*: "The tongue does a lot. It just isn't the whole story, and the exceptions are some of the commonest sounds in the language."

**Intermediate — "different sounds are made at different places in the mouth."**
The simulation: to identify or produce a sound, find where the constriction is. This is the first genuinely productive model. It supports the whole place-of-articulation dimension and makes the vocal-tract diagram meaningful rather than decorative. It cannot yet distinguish /s/ from /t/ (same place) or /p/ from /b/ (same place, same manner).
*Upgrade trigger*: two sounds the learner locates at the same place but hears as different.
*Shelf-life warning*: "Place tells you *where*. It doesn't yet tell you *what you're doing* there, or whether the voice is on."

**Advanced — "voicing, place, and manner are three independent switches."**
The simulation: any sound is a setting of three dials, and changing one dial at a time produces a predictable neighbour. This is the model that makes the IPA consonant chart readable as a *grid with axes* rather than a table to memorise, and it is the actual target of this concept.
*Upgrade trigger*: encountering a sound in another language that occupies a cell English leaves empty.
*Shelf-life warning*: "The dials have more settings than English uses."

**Expert — "articulation is coordinated gesture over time, not a static configuration."**
Sounds overlap and blend; the /k/ in *key* and in *caw* are made at genuinely different places because the following vowel has already begun. This is coarticulation, and it is why the categories are useful abstractions rather than physical facts. Named here to mark the arc; it belongs to later phonetics work.

## Why Students Fail

The primary mechanism is **inaccessibility of the evidence**. Almost everything this concept describes happens inside a closed cavity the learner cannot see, cannot easily feel, and has spent their whole life not attending to. Unlike the prerequisite concept — where a hand on the throat gives instant, unambiguous evidence — the alveolar ridge and the velum are genuinely hard to notice. Learners therefore fall back on the diagram, and the diagram becomes the object of study: they learn to label a picture of a head and cannot locate the same structures in their own mouth. That substitution is the characteristic failure of this concept, and it passes most assessments.

The second mechanism is **terminology load arriving before the distinctions are felt**. "Alveolar", "velum", "labiodental" are all opaque, and if they arrive before the learner has felt the corresponding contrast, they become the whole task — the learner is now doing vocabulary, not phonetics.

Third, and specific to this node: **voicing gets recoded as volume**. Voiced sounds *are* typically slightly louder, so the correlation is real and the induction is reasonable. It is wrong, and it survives casual assessment because loudness and voicing agree most of the time.

## Misconceptions

The Blueprint's **Component 1 — Misconception Register** owns trigger signals, conflict evidence, bridge/replacement text, and discrimination pairs for both. Reused by reference; birth typing and consequences added here.

### MC-ONLY-TONGUE-MATTERS
*(Blueprint Component 1, MC-ONLY-TONGUE-MATTERS — includes the /m/-vs-/t/ and /f/-vs-/θ/ discrimination pairs.)*
- **Birth type**: Type 1 (overgeneralization) from a genuinely valid partial observation. The tongue is the most active articulator, and it is the one anyone would notice first without instruction. This is induction from a biased sample, not a reasoning error.
- **Teaching consequence of the birth type**: the repair is a **counterexample the learner produces themselves**, not a list of articulators. Overgeneralizations die on a single vivid, self-generated exception, and /m/ is the ideal one — hold it, notice the tongue is resting, notice the lips are shut and the nose is buzzing. Presenting a labelled diagram first inverts this: it makes the counterexample a fact to accept rather than a discovery to make, and the misconception survives underneath the accepted fact.
- **Verification of death**: given an *unfamiliar* sound (a click, a French /ʁ/, an unpractised /h/), the learner asks or checks *which* articulators are involved rather than assuming the tongue. The question is the evidence, not the answer.

### MC-VOICED-VOICELESS-IS-VOLUME
*(Blueprint Component 1, MC-VOICED-VOICELESS-IS-VOLUME.)*
- **Birth type**: Type 2 (perceptual intuition), reinforced by a real statistical correlation. Voiced sounds do carry more acoustic energy, so the learner's perception is not deceiving them — it is under-determining the cause.
- **Teaching consequence**: because the correlation is real, argument fails and only **decorrelation** works. The Blueprint's conflict evidence is exactly the right instrument: whisper a voiced sound (quiet, still buzzes) and shout a voiceless one (loud, never buzzes). Both halves are required. Running only the whisper half leaves the learner with "quiet things can still buzz", which is compatible with the misconception.
- **Second-order risk**: a learner who over-corrects concludes that voicing has *nothing* to do with how a sound seems. It does — it just isn't loudness. Do not oversell the independence.
- **Verification of death**: correct voicing judgements on whispered *and* shouted stimuli in the same run, plus a stated reason referencing vibration rather than sound level.

### MC-DIAGRAM-IS-THE-TERRITORY (not in the Blueprint — new)
- **Birth type**: Type 4 (notation-induced). The mid-sagittal vocal-tract diagram is a notation, and the learner studies the notation instead of the thing. It is induced entirely by how this concept is conventionally taught.
- **Symptom / characteristic phrase**: fluent labelling of the diagram, total inability to locate the alveolar ridge in their own mouth. Phrase: *"it's the bit here"* while pointing at the paper, or *"I know it's behind the teeth but I can't feel it."*
- **Detection probe (verbatim)**: *"Put your tongue on your alveolar ridge. Don't look at the diagram — just do it, then tell me what it feels like."* A learner with this misconception either cannot comply or reports a texture that doesn't match (the ridge is distinctly bumpy and hard; a learner reporting "soft" has found the palate).
- **Recovery path**: withdraw the diagram entirely and re-run the Blueprint's Component 3 vocal-tract tour as pure self-touch with narration. Reintroduce the diagram only afterwards, and explicitly as *a picture of what you already found* — the ordering is the repair.
- **Verification of death**: locates three named structures by touch, eyes closed, no diagram present.

## Analogies

**Best — the trumpet (or any brass instrument).** The lungs are the player's breath, the vocal folds are the buzzing lips at the mouthpiece, and the tube above shapes the buzz into a particular note. Change the buzz, change the voicing; change the tube shape, change the sound. This is the strongest analogy available because the mapping is not metaphorical — it is nearly the actual physics.
*Breaking point*: a trumpet's tube changes length, not shape, and it has no equivalent of the velum. Do not extend to nasals.

**Alternative — a garden hose with your thumb over the end.** Constricting the flow at different points and by different amounts changes the sound and the spray. Good for *manner* specifically (full stop vs. narrow gap vs. open) which the place-focused models under-serve.
*Breaking point*: only one constriction point exists on a hose; the vocal tract has many, at fixed anatomical locations.

**Story analogy — the airport with several gates.** Air leaving the lungs has to get out, and the route it takes — which gate is open, which is narrowed, whether the nasal terminal is in use — determines what you hear.
*Breaking point*: gates are discrete and the vocal tract is continuous. Fine at this level; retire before coarticulation.

**Visual analogy — the learner's own hand and mouth, not a diagram.** Finger on the throat for voicing; finger under the nose for nasality (/m/ vs. /b/ — same lips, air comes out somewhere different); fingertip on the ridge behind the teeth for place. These are instruments, and per MC-DIAGRAM-IS-THE-TERRITORY they must come *before* any printed diagram.

### ANTI-ANALOGIES (do not use)

- **"Your tongue is like a paintbrush making different shapes."** Directly installs MC-ONLY-TONGUE-MATTERS, and does so charmingly enough to be memorable.
- **"Voiced sounds are the strong ones, voiceless are the weak ones."** Installs MC-VOICED-VOICELESS-IS-VOLUME in a single sentence. "Strong/weak" is the exact recoding the misconception consists of.
- **"The mouth is like a speaker."** A speaker reproduces a signal generated elsewhere; the vocal tract *generates* the signal by filtering. It puts the sound-making in the wrong place and makes the articulators passive.
- **"Your voice box makes the sounds and your mouth just lets them out."** Makes place of articulation causally irrelevant, which removes the entire content of this concept.

## Demonstrations

Prediction first, every time. On this concept the prediction step is doing more work than usual, because the learner has no prior attention to the inside of their own mouth and the prediction is what creates it.

1. **The /m/ tongue check (learner activity).** *Predict first*: "When you say *mmmm*, what is your tongue doing?" Almost every learner predicts movement. Then hold /m/ for three seconds. The tongue is doing nothing. This is the single highest-value demonstration at this node — it kills MC-ONLY-TONGUE-MATTERS with one self-generated counterexample.
2. **The vocal-tract tour (learner activity).** Blueprint Component 3 — full script there. Touch each location while producing a sound that uses it. Run this *before* any diagram is shown.
3. **Whisper/shout decorrelation (learner activity).** *Predict first*: "If I whisper *zzzz* really quietly, will it still buzz?" Then hand on throat, whisper it. Then shout *ssss*. Both halves, same run.
4. **The nose pinch (learner activity).** *Predict first*: "What will happen if you pinch your nose and try to say *mmmm*?" Then do it — the sound is strangled, because it had nowhere to go. Contrast with /b/, which is unaffected. This makes the velum's existence audible without ever naming it, and it is the cleanest evidence for a structure the learner cannot feel.
5. **Same place, different manner (learner activity).** *Predict first*: "Are /t/ and /s/ made in the same part of your mouth?" Most say no. Both are alveolar; they differ in whether the air is stopped or squeezed. This is the demonstration that forces the second dimension into existence.

## Discovery Questions

Guided discovery wins for the **structure**; direct instruction is required for the **names**. This split is the concept's central design decision and it should be made explicitly rather than drifted into.

The dimensions — voicing, place, manner — are genuinely discoverable, because the evidence is in the learner's own mouth and requires no equipment. The terms *alveolar*, *velum*, *labiodental* are pure convention with no discoverable content; hunting for them wastes attention and, as with letter names, implies a reason where there is none.

1. **Need**: "You know sounds are made in your mouth. Can you make a map of *where*?"
2. **Playground**: produce /p/, /t/, /k/, /f/, /s/, /m/ slowly, one at a time, attending to what touches what. No names, no diagram, no writing.
3. **Invention**: "Sort these six sounds into groups, any way you like, and tell me your rule." Learners reliably invent front/middle/back (place), or stopped/continuous (manner), or buzzy/not (voicing). All three are real phonetic dimensions and every one of them is a correct answer.
4. **Collision**: give them a pair their rule cannot separate. A place-sorter gets /t/ and /s/. A manner-sorter gets /p/ and /b/. Their own rule fails in front of them, and the failure names the missing dimension.
5. **Second invention**: "So you need another question. What is it?" The learner adds the dimension themselves.
6. **Formalization**: only now supply the names — for the dimensions they built and the locations they touched. The names land on structures that already exist for them.
7. **Compression**: "Every sound answers three questions: is the voice on, where is the squeeze, and how tight is it?"

## Teaching Sequence

The pedagogical logic:

- **Self-touch strictly before the diagram.** This is the load-bearing sequencing decision at this concept, and violating it is how MC-DIAGRAM-IS-THE-TERRITORY is manufactured. A diagram shown first becomes the object of study; a diagram shown after becomes a map of known territory.
- **Voicing first among the three dimensions**, because it is the only one with an unambiguous, self-verifiable, binary test. Place is continuous and hard to feel; manner is subtle. Establish that this concept *has reliable evidence* using the dimension where the evidence is cleanest, then extend the stance to the harder dimensions.
- **The /m/ counterexample must precede any survey of articulators.** If the learner is walked through lips-teeth-tongue-palate-velum first, /m/ arrives as item four on a list rather than as a shock. The misconception needs to be *live* when the counterexample lands.
- **Place before manner.** Place is locatable by touch; manner requires attending to airflow, which is a subtler percept. Also, the collision that forces manner into existence (/t/ vs /s/) only works if place is already secure enough that the learner is confident they're at the same spot.
- **Names last, and only for structures already located.** Every term should be introduced as a label for something the learner has already touched.
- **Nasality is introduced as a discovery (the nose pinch), not as a fourth dimension to memorise.** The velum is the one structure with no direct tactile access; it must be inferred from an effect, and the pinch supplies that effect.

Turn-by-turn scripting, protocol routing, adaptive flags: Blueprint **Components 7–8**.

## Tutor Actions

From `../teaching-actions/`, in recommended order:

1. **Prediction** (TEST-THINKING) — load-bearing here beyond the usual. The learner has no habit of attending to their own mouth, and the prediction is what creates the attention. Skipping it turns every demonstration below into a fact delivered.
2. **Demonstration** (SHOW) — but *learner-performed without exception*. A tutor demonstrating articulation teaches nothing, because the evidence is proprioceptive and does not transmit by observation. This is stronger than the usual preference for learner-performed demonstrations; here the tutor-performed version is genuinely worthless.
3. **Concept Map** (ORGANIZE) — the three-dimension grid, built by the learner from their own sort in the discovery sequence. This artefact *is* the consonant chart the next concept formalises, and building it here means `eng.phonetics.consonant-sounds` inherits a structure rather than a table.
4. **Matching** (DO) — sound to articulator set. Bidirectional diagnostic is informative: sound→articulators succeeding while articulators→sound fails means the learner can analyse but not synthesise, and synthesis is what `eng.phonetics.vowel-sounds` will demand.
5. **Error Analysis** (TEST-THINKING) — "someone says /f/ is made with the tongue. Check." Safe here because the flaw is in a third party's claim, and the learner has a physical test available to settle it.

**Does not fit**: **Worked Example** — no multi-step procedure exists. **Game** — high chocolate-covered-broccoli risk, and worse than usual: a speed game rewards fast labelling, which is exactly the diagram-memorisation failure mode this concept must avoid. **Role-Play** — no interpersonal content, and mimicry of articulation without proprioceptive attention is precisely the empty performance to avoid.

## Voice Teaching Notes

This concept's core evidence is **proprioceptive** — what the learner feels inside their own mouth — with audio as a secondary channel and print as a distraction. This makes it unusual: the tutor's job is largely to direct attention inward and then interpret what the learner *reports*, which is a much weaker signal than hearing them get something right or wrong. (Channel reality: `../foundations/03-voice-first-learning-model.md §7`.)

What the ideal tutor perceives:

- **Isolated sounds produced with a vowel attached** — /puh/ for /p/, /muh/ for /m/. At this concept it is more than the usual harmless habit: an added vowel means the learner is producing a *syllable*, and the articulatory event they are supposed to be attending to has already ended before they start noticing. Ask for the sound held, or for the release only.
- **Answers phrased in diagram vocabulary while hesitating on self-location.** "It's the alveolar one" delivered fluently, followed by a stall on "show me where." The fluency-then-stall pattern is the MC-DIAGRAM-IS-THE-TERRITORY signature, and the fluent half is what makes it easy to miss.
- **Hesitation located *during* production rather than before it.** A learner who starts a sound, stops, restarts, and then answers is genuinely attending to their articulators — that is the target behaviour and should be named as such. Hesitation *before* production means they are searching memory for a taught answer.
- **Reported sensations that are wrong in an informative direction.** "It feels soft" for the alveolar ridge means they have found the hard palate — a real location, one step too far back. This is a correctable near-miss, not a failure, and treating it as a failure teaches the learner not to report sensations honestly, which removes this concept's only evidence channel.
- **Voicing judgements delivered with rising confidence across a run.** The throat test is genuinely unambiguous once trusted, so growing confidence is the expected trajectory. Flat or falling confidence means the learner is not actually feeling the vibration and is guessing — check hand placement before concluding anything about understanding.

**Load-bearing sentence, delivered slowly and once**: *"Every sound is your breath being interrupted somewhere — your job is to find out where, and how."*

## Assessment Signals

Item bank: Blueprint **Component 6 — Mastery Probe Set**. Response-pattern reads, which the Blueprint does not own:

- **Articulator identification for a given sound.**
  - *Fast-correct* → genuine, and at this concept it is only trustworthy if the learner can also *demonstrate*. Require the physical check alongside the answer for at least one item per session; a verbal-only fast-correct is compatible with diagram memorisation.
  - *Slow-correct with visible self-testing* → this is **mastery-quality behaviour**, not a deficit. The learner is running the instrument. Unlike most concepts, do not push for lower latency here — the checking routine is the skill.
  - *Fast-wrong* → nearly always MC-ONLY-TONGUE-MATTERS on a labial or nasal (/m/, /f/, /p/, /w/). Check which sound before responding.
  - *Slow-wrong* → terminology load, not conceptual failure. The learner usually knows the location and cannot retrieve its name. Ask them to point instead of name; if pointing succeeds, this is a vocabulary gap and should be scored as such.
- **Voicing sort.** The discriminating items are the whispered and shouted ones. A learner who sorts a normally-spoken set correctly has demonstrated nothing about MC-VOICED-VOICELESS-IS-VOLUME, because loudness and voicing agree there. **The decorrelated items are the only ones that carry signal**, and an assessment without them cannot certify this concept.
- **The /m/ probe specifically** is this concept's golden probe and is worth restating as an instrument: *"Say mmmm and hold it. What is your tongue doing?"* It is diagnostic in a way no other single item is, because the correct answer ("nothing") is unavailable to anyone still holding the tongue-only model.
- **Novel-sound prediction.** Given a sound they have not analysed, the learner predicts place and voicing. This is the transfer item and the strongest single evidence of the advanced model — it cannot be passed by recall.

**Mastery certification trigger**: correct voicing judgements including at least one whispered and one shouted stimulus; correct articulator identification for at least one labial, one alveolar and one nasal, *demonstrated physically* rather than only named; correct handling of the /m/ probe; and a reasoned prediction on one novel sound. Diagram labelling is explicitly **not** part of the certification — it is passable without the concept.

## Tutor Recovery Strategy

Generic engine: `../foundations/01-recovery-engine.md`. Concept-specific:

- **"I can't feel anything"** — the characteristic utterance of this concept, and it is usually literally true rather than a withdrawal. The learner has no practice attending to intra-oral sensation. Do not reassure and repeat; **change the instrument**. Move from a subtle percept to a gross one: from "feel your tongue on the ridge" to "hold your lips shut and try to say /b/ — feel the pressure build." Pressure is unmissable. Once *something* has been felt, sensitivity to subtler contrasts follows quickly.
- **"This is weird"** — extremely common and worth taking at face value rather than reframing. It *is* weird to attend to the inside of one's own mouth, and agreeing ("it is — most people never do this") does more for participation than encouragement does. Suppressing the strangeness makes the learner suspect the task is trivial and they are failing at something trivial.
- **"I don't know the words"** — a vocabulary anxiety, not a conceptual one, and it is frequently the real content of a stall at this concept. Answer it structurally: *"You don't need the words. Point."* Pointing is a full, valid answer here and saying so removes most of the load.
- **The smaller question to shrink to**: from articulator identification down to *"put your lips together and hum — can you feel your nose buzzing?"* Binary, gross, physically unmissable, no vocabulary, no location judgement. It restores the "I can feel things in my mouth" stance, which is what collapses.
- **Never shrink to the diagram.** It is the instinctive move — the diagram looks like a support — and it converts a proprioceptive stall into a labelling task, which the learner may pass while learning nothing.

## Memory Hooks

- **Concept type**: concept (a structural model of a system) with an embedded **tool** skill (the voicing test and the self-location routine). The two decay at different rates and need separate handling: the structural model is durable, the tool skill lapses without use.
- **Review form** — the model: spaced *application* items on novel sounds, never recall of the articulator list. Listing articulators is passable from the diagram and certifies nothing.
- **Review form** — the tool skill: brief automaticity bursts on voicing judgements, including decorrelated (whispered/shouted) stimuli. Without the decorrelated items the burst re-drills a judgement the learner can make on loudness alone.
- **Concept-specific deviation**: this concept needs **re-probing tied to downstream use rather than to elapsed time**. It is a scaffolding concept — its whole purpose is to be used by `eng.phonetics.consonant-sounds` and `eng.phonetics.vowel-sounds` — so the natural re-probe moment is the start of each of those, where a failure is immediately consequential and immediately repairable in context.
- **Interleaving partners**: minimal-pair items from `eng.phonetics.minimal-pairs` once available (each minimal pair is a one-dial change and is the cleanest possible exercise of the three-dimension model). During acquisition, interleave sounds that differ on *one* dimension only — /p/-/b/ (voicing), /p/-/t/ (place), /t/-/s/ (manner) — rather than randomly chosen sounds. Random sets let the learner succeed by gross discrimination without ever isolating a dimension.

## Transfer Connections

- **Near**: `eng.phonetics.consonant-sounds` — the direct unlock, and the relationship is unusually tight. The consonant chart *is* the three-dimension grid built here, filled in. A learner arriving without this concept meets that chart as a table of forty items to memorise; a learner arriving with it meets it as a grid they already have axes for.
- **Near**: `eng.phonetics.vowel-sounds` — the other unlock, and the transfer is *partial in an important way*: vowels have no constriction, so "place" must be reconceived as tongue *position* in an open tract. This is a genuine model extension and it will feel like a contradiction to a learner who has over-fitted place to constriction. Flag it at handover.
- **Far**: `eng.phonetics.ipa-basics` — the IPA symbol set is organised by exactly these dimensions, which is why IPA is learnable at all. Without this concept it is an arbitrary alphabet; with it, symbol position on the chart is itself information.
- **Far**: pronunciation work in any second language — the learner who can ask "where is my tongue and is the voice on?" can diagnose their own accent. This is the single most practically valuable transfer this concept produces.
- **Real-world**: understanding speech therapy, singing technique, why a cold changes your voice (nasal blockage — the velum route), why some sounds are hard to say with a mouthful.
- **Expert transfer**: the durable skill is **decomposing an apparently unitary percept into independent dimensions**, then verifying each independently. Same operation as separating hue/saturation/brightness in colour, or pitch/timbre/loudness in music.

## Cross-Subject Connections

KG records no `cross_links`. Genuine connections, and two of them are strong:

- **Biology — anatomy of the head and neck, and the respiratory system.** This is not a loose association: the articulators *are* anatomical structures, and the airstream *is* the respiratory system doing a secondary job. A learner studying either subject can bring real knowledge across in both directions. **No KG edge exists; recorded as Curriculum Feedback.**
- **Physics — resonance, standing waves, and source-filter behaviour.** The vocal folds are the source and the vocal tract is the filter; vowel identity is determined by which resonant frequencies the tract shape reinforces. This is the physical mechanism underneath everything in this entry, and it is the same content as resonance in a tube. Strong, real, and unencoded. **Recorded as Curriculum Feedback** (this compounds the same finding recorded at `eng.phonetics.speech-sounds-overview`).
- **Music — vocal technique.** Register, breath support, and vowel modification in singing are the same articulatory system under different constraints. Real, but the KG has no music domain to link to; recorded as an observation only.

## Blueprint References

Blueprint exists: `docs/curriculum/blueprints/eng.phonetics.articulation-organs.md`. Reused by reference, **not restated**:

- **Component 1 — Misconception Register**: MC-ONLY-TONGUE-MATTERS and MC-VOICED-VOICELESS-IS-VOLUME — trigger signals, conflict evidence, bridge/replacement text, discrimination pairs. This entry adds birth typing, teaching consequences, and a third misconception (MC-DIAGRAM-IS-THE-TERRITORY) the Blueprint does not carry.
- **Component 2 — Prerequisite Diagnostic Block**: PD-1 sound/letter-distinction readiness and its fail-route to `eng.phonetics.speech-sounds-overview`.
- **Component 3 — Concrete Anchor**: the vocal-tract tour script.
- **Component 4 — Conceptual Development Sequence**: the TA sequence.
- **Component 5 — Worked Examples** and **Component 6 — Mastery Probe Set**: the item banks. This entry adds only response-pattern reads.
- **Components 7–8**: session architecture, protocol routing, adaptive flags.

## Runtime Asset References

No seeded `AssetIdentity` records exist for this concept as of 2026-08-03. English carries no `HUMAN_CURATOR` authored-seed rows in production; its production rows are `AI_AUTHORED` live-capture only (CLAUDE.md, AssetIdentity Global Audit). No assets created by this entry.

## Curriculum Feedback

- **Third misconception recorded.** MC-DIAGRAM-IS-THE-TERRITORY is authored here and is not in the Blueprint's register. It is induced by the conventional diagram-first presentation of this concept, which makes it near-universal wherever that presentation is used — and it is the one misconception at this node that *passes* standard assessment. Recommended for addition to the Blueprint's Component 1 by the Curriculum Production Pipeline; recorded here, not added there.
- **Missing cross-links (biology, physics).** `cross_links: []` is a genuine under-encoding at this node. The articulators are anatomy and the acoustics are source-filter resonance — both are mechanism-level connections, not thematic ones. This compounds the identical finding recorded at `eng.phonetics.speech-sounds-overview`; the two together suggest the phonetics domain as a whole is missing its science edges rather than this node being an isolated case.
- **Assessment-design hazard worth flagging to the Pipeline.** Diagram labelling is the conventional assessment for this concept and it is passable without the concept. The Blueprint's probe set is already better than that convention; an explicit adaptive-flag entry stating "physical demonstration required, labelling insufficient" would harden it.
- **`developing` difficulty and 2 estimated hours are both reasonable**, with one caveat: the terminology load is front-loaded and separable from the conceptual load. A learner given the dimensions without the Greek/Latin names could reach the advanced mental model in well under 2 hours; most of the estimate is vocabulary.

## Version History

- v1.0 (2026-08-03): Initial entry. Blueprint reused by reference (Components 1–8). 2 Blueprint misconceptions classified by birth type; 1 new misconception (MC-DIAGRAM-IS-THE-TERRITORY) authored via the birth-taxonomy diagnostic and recorded as Curriculum Feedback. 2 missing cross-links (biology, physics) and 1 assessment-design hazard recorded as Curriculum Feedback.
