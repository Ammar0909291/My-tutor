# Word Stress — `eng.phonetics.syllable-stress`

## Identity

- **KG ID**: `eng.phonetics.syllable-stress`
- **Name**: Word Stress
- **Domain**: English / Phonetics
- **Difficulty**: developing
- **Bloom level**: apply
- **Mastery threshold**: 0.75
- **Estimated hours**: 2
- **Requires**: `eng.phonetics.ipa-basics` — load-bearing part: the learner must already transcribe fluently, since this concept adds the stress mark (ˈ) to existing transcriptions and depends on the vowel classification work (specifically, recognising the reduced schwa vowel) already established upstream.
- **Unlocks**: `eng.phonetics.sentence-stress`
- **Cross-links**: (none in the KG)
- **Blueprint**: `docs/curriculum/blueprints/eng.phonetics.syllable-stress.md`

## Learning Objective

The learner can:
1. Identify, by ear, which syllable of a multisyllabic word carries primary stress, using length, pitch, and vowel quality together rather than volume alone.
2. Recognise the schwa (/ə/) as the characteristic reduced vowel of an unstressed syllable.
3. Correctly mark primary stress in an IPA transcription.
4. Identify and correctly produce the stress shift in common noun/verb pairs (record, present, object).
5. Apply stress identification to novel, previously unheard multisyllabic words, including recognising that stress can shift as suffixes are added to a base word.

## Core Understanding

Word stress is the relative prominence given to one syllable within a word, and it is realised as a **bundle of simultaneous acoustic cues — increased length, a pitch change, and full vowel quality — never by loudness alone**, though loudness contributes a small part of the bundle. The clearest and most teachable single marker of *unstressed* status is **vowel reduction**: in English, unstressed syllables very frequently reduce their vowel to **schwa** (/ə/), a weak, central, "unclear" vowel that discards the specific quality the letter would otherwise suggest — the second syllable of "banana" is spelled with the same letter "a" as the stressed syllable, yet sounds nothing like it, because it has reduced to schwa. This produces the concept's second major structural fact: **English spelling never marks stress**, unlike some other languages that use written accent marks — stress placement must be learned by ear, by reference, or by pattern, never read directly off the letters. Despite this, stress placement is **not fully random**: a genuine, bounded, and highly useful pattern exists in a specific category of two-syllable words that function as both nouns and verbs, where **the noun form typically stresses the first syllable and the verb form the second** (REcord the noun, reCORD the verb; PRESent the noun, preSENT the verb) — identical spelling, different grammatical role, different stress. This pattern does not cover every word (many words, like "happy," have only one possible stress pattern regardless of use), but it is real, common, and worth learning explicitly as a foothold in an otherwise largely unpredictable system.

## Mental Models

**Beginner — "stress means saying a syllable louder."**
The runnable simulation: to mark or perceive stress, attend to and produce volume differences alone. This is not tutor-installed — it is the most intuitive, everyday-language reading of "stress" or "emphasis" (as in emphasising a word by shouting it), and it produces a specific, recognisable failure: stress that sounds unnaturally shouted or robotic, because natural English stress relies on length/pitch/vowel-quality far more than on raw volume.
*Upgrade trigger*: the Blueprint's own conflict evidence — comparing an all-loud, unnatural rendition of "banana" against a natural one that uses length and pitch instead.
*Shelf-life warning at replacement*: "Volume is part of the bundle, but a small part. Length, pitch, and how clear the vowel stays matter more for sounding natural."

**Intermediate — "I can hear which syllable is stressed by feel, but I don't yet have a reliable check for it."**
The simulation: correctly perceive stress on familiar, previously-heard words through general auditory impression, without yet having a specific, checkable marker to fall back on for less certain or novel cases. This model works reasonably well on familiar vocabulary and provides no clear strategy when confidence is low.
*Upgrade trigger*: the schwa-recognition work (TA-3) — discovering that the *unstressed* syllable has a specific, nameable, checkable signature (a reduced, unclear vowel) rather than stress itself being the only thing to listen for.
*Shelf-life warning*: "Instead of only asking 'which one is stressed,' also ask 'which ones sound reduced, unclear, almost like just \"uh\"?' — those are your unstressed syllables, and that's often the easier thing to spot first."

**Advanced — "stress is a length/pitch/vowel-quality bundle, marked in IPA with a stress symbol, largely unpredictable from spelling but with a genuine, learnable noun/verb-shift pattern for a bounded category of words."**
The simulation: given any multisyllabic word, familiar or not, the learner listens for the schwa-marked unstressed syllables to locate the stressed one by elimination, checks whether the word participates in a noun/verb stress-shift pattern if it has both uses, and marks the result correctly in IPA. This is the target model, matching TA-4 and TA-5.
*Upgrade trigger*: `eng.phonetics.sentence-stress` (the direct unlock), where stress operates at the level of a whole utterance rather than a single word, and can shift for reasons of meaning and emphasis that go beyond any single word's fixed lexical stress.
*Shelf-life warning*: "This is a word's own, fairly fixed stress pattern. Once we build whole sentences, stress can move around for other reasons — that's the next layer."

**Expert — "English word stress is governed by a complex, only partially rule-governed system involving syllable weight, morphological category, and etymology (Germanic vs. Romance-derived vocabulary strata), which linguists model but do not fully reduce to a small rule set."**
Named here to mark the arc; this concept deliberately does not attempt the full rule system, teaching instead the single most productive, most teachable pattern (noun/verb shift) alongside a general auditory-cue-based strategy for everything else.

## Why Students Fail

The dominant failure mechanism is that **"stress" and "emphasis" are everyday words with a strong prior meaning tied to volume and forcefulness**, and this prior is imported wholesale into the technical, phonetic sense of the term — a further instance of the terminology-contamination pattern already identified repeatedly in this program (`eng.phonics.sight-words`'s category label, `eng.phonetics.minimal-pairs`' informal "minimal"), here contaminating the very name of the phenomenon being taught. A learner who marks stress by shouting has correctly identified *that* something is different about the stressed syllable; they have simply reached for the wrong, most-available cue to represent that difference.

The second mechanism is a genuine structural discomfort: the learner has, by this point in the curriculum, been repeatedly reassured that spelling, while imperfect, generally *does* carry useful information about pronunciation (letter-sound correspondence, hard/soft c/g, silent-e). Word stress is the first concept in this batch where spelling carries **zero** direct information at all — not imperfect information, but none — and a learner accustomed to searching print for a clue may search fruitlessly and conclude, incorrectly, either that stress must therefore be entirely arbitrary (missing the genuine noun/verb pattern) or that some undiscovered spelling clue must exist (searching for a nonexistent rule, mirroring the silent-letter overcorrection risk already flagged at `eng.phonics.consonants`).

The third mechanism, specific to learners whose first language has a fundamentally different prosodic system, is genuine **L1 transfer**: a learner from a fixed-stress language (which stresses, say, always the final syllable) will predictably default to that position on English words regardless of the word's actual pattern; a learner from a tonal language (where pitch contour carries lexical meaning, not prominence) risks conflating English stress's use of pitch with their L1's entirely different tonal system, a confusion the Blueprint's own S9 routing identifies as needing explicit, direct contrast rather than assuming the concept transfers cleanly.

## Misconceptions

The Blueprint's **Component 1 — Misconception Register** owns the trigger signals, conflict evidence, bridge/replacement text, and discrimination pairs for both entries below. Reused by reference; birth-type classification and teaching consequence added here.

### MC-STRESS-IS-JUST-LOUDNESS
*(Blueprint Component 1, MC-STRESS-IS-JUST-LOUDNESS — includes the banana and photo/phoTO discrimination pairs.)*
- **Birth type**: Type 3 (language contamination) — the everyday sense of "stress"/"emphasis" as forcefulness or volume contaminates the technical, multi-cue phonetic definition, joining the growing set of terminology-contamination cases already identified across this program (`eng.phonics.sight-words`, `eng.phonetics.minimal-pairs`).
- **Teaching consequence of the birth type**: the repair requires **direct comparative evidence of the bundle's other components in isolation from volume**, exactly as the Blueprint's own conflict evidence supplies (a natural, non-shouted rendering that still clearly marks stress via length and pitch) — a purely verbal correction ("it's not just loudness") without an audible demonstration of the alternative cues would leave the learner with no replacement strategy to substitute for the familiar, if incomplete, one.
- **Verification of death**: the learner correctly identifies stress on a quietly, evenly spoken word (with no volume differential at all between syllables, deliberately produced by the tutor to remove the loudness cue entirely) — since a learner still relying primarily on loudness will fail specifically when that cue is withheld, while a learner who has integrated length/pitch/vowel-quality will succeed regardless.

### MC-STRESS-PATTERN-IS-FIXED-BY-SPELLING
*(Blueprint Component 1, MC-STRESS-PATTERN-IS-FIXED-BY-SPELLING — includes the REcord/reCORD contrast.)*
- **Birth type**: Type 1 (overgeneralization), but of an unusual and instructive shape — the Blueprint's own trigger signal correctly identifies that this misconception can manifest as *either* of two opposite over-generalisations (assuming stress is fully predictable from spelling with no exceptions, or assuming it is fully random with no pattern at all), both stemming from the same underlying gap: the learner has not yet been told the specific, bounded, genuinely learnable noun/verb-shift pattern that occupies the middle ground between those two false extremes.
- **Teaching consequence**: because this misconception can present as two opposite-seeming symptoms, the repair must address both directions explicitly rather than assuming correcting one automatically corrects the other — the Blueprint's own bridge text does this correctly, stating plainly both that spelling never marks stress *and* that a real, learnable pattern exists for a specific word category, preventing the learner from over-correcting toward "therefore stress is totally arbitrary" after learning that spelling doesn't help.
- **Verification of death**: given a novel noun/verb pair not previously drilled (from the Blueprint's own set: object, produce, permit), the learner correctly predicts and produces the stress shift for both grammatical roles — and, separately, correctly states that a word like "happy," which has no noun/verb dual use, simply has one fixed pattern to learn by ear, showing the learner has not over-extended the shift pattern to every word.

## Analogies

**Best — a spotlight moving across a stage, with the spotlight's brightness, hold-time, and colour clarity all shifting together, not just its brightness.** The syllable currently "in the spotlight" is longer-held, its "colour" (vowel quality) stays vivid and full, and there's a pitch change accompanying it — while the syllables in shadow are shorter, dimmer, and their colour washes out toward grey (the schwa). This captures the multi-cue bundle directly, with the "washing out to grey" image mapping cleanly onto vowel reduction.
*Breaking point*: a spotlight is a single, simple visual variable; stress is genuinely multi-dimensional in a way one visual analogy can only partially represent. Useful as an entry point, not as the full model.

**Alternative — a weightlifter's grip: strongest exactly where the bar is held, weaker and looser everywhere else along the arm.** The point of stress is where the "grip" is firmest — held longest, most controlled, clearest — while the rest of the word is comparatively loose and less distinct.
*Breaking point*: physical grip strength doesn't have a clean equivalent to pitch change; best used to reinforce length and clarity specifically, not the full bundle.

**Story analogy — a name everyone in a family calls one specific person by, versus nicknames that blur together for everyone else.** In a family photo, one person is named specifically and clearly by everyone; the others get vague, interchangeable nicknames that don't distinguish them much. The stressed syllable is the "clearly named" one; unstressed syllables blur toward the same vague "uh" sound (schwa) regardless of which specific vowel letter spelled them.
*Breaking point*: none serious; a reasonably close mapping to the "blur toward one common sound" property of schwa specifically.

**Visual analogy — the stress-clap-and-stretch** (Blueprint Component 3): clapping louder AND holding the stressed syllable longer, contrasted explicitly against an unnaturally mis-stressed version. Not a metaphor but the actual working instrument this concept opens with, deliberately combining two of the three bundle cues (loudness and length) in one felt, physical routine before pitch and vowel quality are added.

### ANTI-ANALOGIES (do not use)

- **"Stress is like shouting one syllable."** Directly installs MC-STRESS-IS-JUST-LOUDNESS by name — the exact framing this concept's first misconception consists of.
- **"English words have accent marks like Spanish or French, you just have to spot them."** False, and directly contradicts the concept's second major structural fact (English spelling never marks stress) — this analogy would actively send the learner searching print for a nonexistent cue.
- **"Stress placement is basically a coin flip — you just have to memorise every single word."** Overstates the system's randomness and forfeits the genuine, teachable noun/verb-shift pattern this concept specifically aims to give the learner as a foothold — the correct framing is "largely unpredictable from spelling, but not without any pattern at all."

## Demonstrations

Prediction first in every case.

1. **The stress-clap-and-stretch (learner activity).** Blueprint Component 3 — full script there. *Predict first*, before hearing the deliberately mis-stressed version: "If I stress the wrong syllable in this word, do you think it'll still sound like a real word, or will it sound off?"
2. **The banana loud-versus-natural contrast (teacher-led, learner-resolved).** Blueprint's own conflict evidence. *Predict first*: "Do you think shouting the middle syllable is the same as what a natural speaker actually does?" Then produce both versions back to back.
3. **The REcord/reCORD reveal (teacher-led, learner-resolved).** Blueprint's own conflict evidence for the second misconception. *Predict first*: "Same spelling, same letters — do you think the stress could actually be different depending on how the word is used?" Then produce both, in context ("I need to reCORD this" / "This is my REcord collection").
4. **The schwa-spotting task (learner activity, TA-3).** *Predict first*: "In 'banana,' which syllables do you think will sound clear and full, and which will sound weak or mushy?" Then listen and confirm against the prediction.

## Discovery Questions

This concept is well suited to a **direct-instruction-for-the-terminology, discovery-for-the-cues** pattern, closely paralleling the treatment already established at `eng.phonics.consonants`' hard/soft rule: the *fact* that stress is realised as a multi-cue bundle rather than pure loudness is best delivered through comparative demonstration (as above) rather than pure discovery, but the **noun/verb-shift pattern is excellent discovery material**, since it is directly extractable from a handful of contrastive examples the learner can examine themselves.

1. **Need**: "Does 'record' always get said the same way, no matter how you use it in a sentence?"
2. **Playground**: the learner says "record" in a few different sentences freely, some using it as a noun, some as a verb, without being told to expect any pattern.
3. **Invention**: "Did you notice anything change depending on how you used the word?" The learner notices the stress shift, and its correlation with grammatical role, themselves.
4. **Collision**: introduce "happy" — a word with only one possible stress pattern regardless of use — to confirm the pattern is a real, bounded phenomenon specific to certain words, not a universal rule.
5. **Formalization**: name the pattern — for a specific category of two-syllable noun/verb pairs, the noun form typically stresses syllable one, the verb form syllable two — and name its scope (not every word participates).
6. **Compression**: "Check if it's a noun or a verb — for some words, that alone tells you where the stress goes."

Beyond this specific pattern, the general skill of *hearing* stress via length/pitch/vowel-quality is built through direct demonstration and guided listening practice (TA-1 through TA-3), not through open-ended discovery, since there is no equivalent single discoverable rule for the general case.

## Teaching Sequence

The pedagogical logic behind this arc:

- **Basic stress identification by ear (TA-1) comes before formal IPA stress-marking (TA-2)**, and before either, before the specific schwa-recognition instrument (TA-3) — the Blueprint sequences perception before notation before the concept's most reliable diagnostic marker, giving the learner a felt, holistic sense of stress first, then a way to record it, then the single most teachable specific cue to check when confidence is low.
- **The MC-STRESS-IS-JUST-LOUDNESS collision is placed specifically after schwa-recognition (TA-3), not before it** — this ordering matters: the schwa-recognition work supplies the concrete, replacement cue (a reduced, unclear vowel signals *unstressed*) the misconception's repair needs, so introducing the collision only once that replacement is available avoids leaving the learner with a correction ("it's not just volume") and no alternative strategy to substitute.
- **Noun/verb stress-shift work (TA-4) comes after the general perceptual and notational skills are secure**, since it is a specific, bounded application of the general stress-identification skill rather than an independent topic — attempting it before general stress perception is reliable would conflate two sources of potential difficulty.
- **Novel/longer-word application (TA-5) comes last and deliberately includes morphologically related word families (photograph, photography, photographic) that shift stress as suffixes are added** — this is a genuinely harder case than any single-word judgement, since it requires the learner to recognise that stress is not a fixed property of a word's spelling but can move as the word's morphological form changes, extending the "spelling doesn't fix stress" insight to its least intuitive consequence.

Turn-by-turn scripting, protocol routing, and adaptive flags: Blueprint **Component 7 — Session Architecture** and **Component 8 — Adaptive Flags** (in particular the multi-cue-bundle framing, schwa-as-the-clearest-marker strategy, the noun/verb-shift-as-genuine-pattern framing, and L1 stress/tone transfer anticipation for S9 learners).

## Tutor Actions

In recommended order, from `../teaching-actions/`:

1. **Demonstration** (SHOW) — the stress-clap-and-stretch, the loud-versus-natural contrast, and the REcord/reCORD reveal, all benefiting from direct comparative hearing, ideally with learner echo/repetition rather than only passive listening.
2. **Error Analysis** (TEST-THINKING) — presenting a deliberately mis-stressed word (the Blueprint's own "taBLE" example) and asking the learner to identify what's wrong and why it sounds off, directly practising the discrimination between correct and incorrect stress placement on externalised, safe material.
3. **Prediction** (TEST-THINKING) — predicting stress placement or the presence of a noun/verb shift before confirming, exercising the target skills directly, exactly as established at the analogous rule-discovery tasks elsewhere in this batch.
4. **Concept Map** (ORGANIZE) — building the noun/verb-shift word family (record, present, object, produce, permit) as an explicit, growing list, giving the learner a compact, expandable artefact for this concept's single most productive learnable pattern.
5. **Matching** (DO) — IPA transcription to spoken word, specifically checking that the stress mark's position matches the actual spoken stress, connecting this concept back to the notational fluency built at `eng.phonetics.ipa-basics`.

**Does not fit**: **Worked Example** in the procedural-derivation sense — there is no multi-step calculation to model beyond listening and marking, better served by Demonstration and Matching. **Game** — moderate risk: a fast stress-identification game could reward volume-based guessing (the exact misconception this concept targets) if introduced before the length/pitch/vowel-quality cues are independently secure.

## Voice Teaching Notes

This concept's core evidence is **audio, and specifically prosodic** — length, pitch contour, and vowel quality across a spoken word — making it, alongside `eng.phonics.blending-segmenting`, one of the concepts in this program where the runtime's plain-text STT capture gap is most directly consequential: the very features this concept is built on (timing, pitch, vowel clarity) are exactly the signal `../foundations/03-voice-first-learning-model.md §7` identifies as discarded before reaching the decision layer in the current architecture.

What the ideal tutor perceives:

- **A stressed syllable marked only by increased volume, with no accompanying length or pitch change.** The direct auditory signature of MC-STRESS-IS-JUST-LOUDNESS, and it typically sounds subtly unnatural even to an untrained ear, which can itself be used diagnostically: "does that sound like how you'd really say it, or does it sound a little off?"
- **A reduced, schwa-quality vowel correctly produced on an unstressed syllable**, even if the learner cannot yet name it as "schwa." This is strong positive evidence the vowel-reduction cue has been internalised, independent of whether the terminology has been learned.
- **Full, undiminished vowel quality maintained on every syllable of a multisyllabic word**, with no reduction anywhere. This is the inverse signature — a learner producing this pattern has likely not yet distinguished stressed from unstressed syllables at all, treating every syllable as equally prominent, and needs the basic perceptual contrast (TA-1) reinforced before any refinement.
- **A consistent, predictable default stress position applied regardless of the specific word** (e.g., always the final syllable, or always the first) — the direct behavioural signature of L1 fixed-stress transfer (per the S9 routing), distinguishable from random error by its very consistency, and should be met with explicit contrastive practice against the learner's L1 pattern rather than treated as inattention.

**Load-bearing sentence, delivered slowly**: *"Listen for length and pitch and how clear the vowel stays — not just how loud it is."*

## Assessment Signals

Item bank: Blueprint **Component 6 — Mastery Probe Set** (MP-1…MP-5). Response-pattern reads, which the Blueprint does not own:

- **Stress identification (MP-1).** *Correct, on a word produced without exaggerated volume* → strong evidence against reliance on the loudness-only strategy. *Correct only when the tutor's own production exaggerates volume* → treat as unverified; re-test with a naturally, evenly produced stimulus before certifying.
- **IPA stress marking (MP-2).** A correct mark here confirms notational fluency but, on its own, under-determines whether the underlying *perception* of stress (versus a memorised transcription) produced it — cross-check against MP-1's live, unwritten identification for the same or a similar word.
- **Schwa identification (MP-3).** *Correct, naming the vowel as reduced/unclear even without the term "schwa"* → sufficient positive evidence; the concept-level skill (noticing reduction) matters more than vocabulary recall at this stage. *Correct only with the term "schwa" supplied by the tutor first* → weaker evidence; the perceptual skill may not yet be independently accessible without the verbal prompt.
- **Noun/verb shift (MP-4).** *Correct on a drilled pair* → establishes the specific example is known; *correct on a genuinely novel pair from the Blueprint's own extended set (produce, permit)* → the stronger, generalisation-confirming evidence this item type requires, per the same logic already established for rule-application items throughout this batch.
- **Explanation (MP-5).** Listen for whether the explanation names all three required elements — the multi-cue bundle (not just loudness), the fact that spelling doesn't mark stress, and the existence of the bounded noun/verb pattern — a response missing any one of the three has an incomplete model, even if it happens to answer correctly on other items by other means.

**Mastery certification trigger**: correct stress identification on a naturally-produced (non-exaggerated) novel multisyllabic word; correct IPA stress-marking matching that identification; correct schwa recognition on an unstressed syllable, by ear; correct stress production for both roles of a genuinely novel noun/verb-shift pair; and an explanation naming all three structural elements (multi-cue bundle, spelling-independence, the bounded pattern). The naturally-produced requirement on the first item is essential, matching the verification-of-death criterion for the loudness misconception above — an exaggerated stimulus cannot distinguish genuine multi-cue perception from loudness-only reliance.

## Tutor Recovery Strategy

Generic engine: `../foundations/01-recovery-engine.md`. Concept-specific notes only:

- **"I can't hear anything different, they all sound the same to me"** — take this seriously as a genuine perceptual starting point rather than inattention, particularly likely for a learner from a syllable-timed or fixed-stress L1 background (per the S9 routing); the response should scale back to the most exaggerated, most physically-felt version of the contrast (the clap-and-stretch at full exaggeration) before attempting any subtler natural-speech example.
- **"Why doesn't the spelling just show this?"** — a reasonable frustration given how much of this curriculum *has* relied on spelling as a genuine, if imperfect, clue up to this point; validate the frustration directly and specifically, per the Blueprint's own s6_path, rather than only restating that stress isn't marked: "You're right that this is different from almost everything else we've done — English genuinely doesn't write this down, which really is a strange and sometimes frustrating gap."
- **The smaller question to shrink to**: from full stress identification or the noun/verb shift, down to **the single, most exaggerated clap-and-stretch contrast on one already-familiar word**, with the mis-stressed version played immediately alongside for direct comparison. This removes the schwa-identification and IPA-marking demands entirely, isolating the most basic, most physically evident version of the perceptual contrast.
- **Never shrink to "just say it louder on whichever syllable feels emphasised."** This directly reinstates the loudness-only strategy this concept exists to move the learner beyond.

## Memory Hooks

- **Concept type**: perceptual/procedural skill (identifying and marking a multi-cue acoustic bundle) plus a **bounded, learnable exception pattern** (the noun/verb shift) layered on top of an otherwise largely unpredictable, memorise-by-ear system. The three components need distinct review treatment.
- **Review form — general stress perception**: spaced listening items using genuinely natural (non-exaggerated) speech, specifically because, as established under Assessment Signals, an exaggerated stimulus cannot distinguish genuine multi-cue perception from residual loudness-only reliance — review items drawn only from clearly-exaggerated model speech would risk certifying a skill that hasn't actually generalised to normal speech.
- **Review form — the noun/verb-shift pattern**: review specifically using words *not* in the originally-drilled set (record, present, object, produce, permit), since, as with every rule-application item in this batch, reviewing only the drilled set cannot distinguish genuine pattern application from memorisation of specific examples.
- **Review form — individual word stress placement (the largely unpredictable remainder)**: this component is, honestly, closer to vocabulary-item memorisation than to rule application, and benefits from ordinary spaced retrieval tied to the specific words the learner is actively encountering in reading or listening, rather than a dedicated abstract drill.
- **Interleaving partners**: `eng.phonetics.ipa-basics` transcription review should continue alongside this concept's stress-marking practice, since the two skills (transcribing sounds, marking which syllable is prominent) are naturally combined in any full transcription task. Stressed and reduced-vowel items should be interleaved together rather than drilled separately, since the discrimination between them (not merely recognising one in isolation) is the actual target skill.

## Transfer Connections

- **Near**: `eng.phonetics.sentence-stress` — the direct unlock, extending fixed, lexical (word-level) stress to the more fluid, meaning-and-emphasis-driven stress patterns of whole utterances; a learner secure in word stress has the foundational unit sentence stress operates on top of.
- **Far**: vocabulary acquisition generally — correct stress placement is frequently the single feature that determines whether a spoken word is recognised as the intended word at all by a listener, independent of whether every individual phoneme is pronounced with native-like accuracy; a learner who mispronounces a phoneme but stresses correctly is often more intelligible than one who nails every phoneme but stresses the wrong syllable.
- **Far**: poetry and verse — meter in English poetry is built directly on the stressed/unstressed syllable pattern this concept establishes, and a learner with a secure felt sense of stress has a genuine head start on scanning verse, well before any formal instruction in poetic meter.
- **Real-world**: dictionary use — most learner's dictionaries mark primary (and sometimes secondary) stress explicitly, and a learner who understands why this marking exists (because spelling alone cannot convey it) is equipped to actually use that feature rather than skip past it.
- **Expert transfer**: the durable skill is **attending to a multi-dimensional, simultaneously-realised signal (a bundle of cues arriving together) rather than collapsing it onto the single most salient or most familiar dimension** — the same transfer skill needed in recognising that a chemical reaction's "driving force" is a bundle of enthalpy and entropy effects rather than either alone, or that a piece of music's expressive emphasis comes from a bundle of dynamics, articulation, and timing together, not volume alone.

## Cross-Subject Connections

KG records no `cross_links`. A genuine connection exists, extending a pattern already established at multiple phonetics-domain concepts in this program:

- **Physics — acoustic prosody.** Pitch is fundamental frequency, length is duration, and even vowel-quality reduction has an acoustic-formant correlate — stress, like the phonemic contrasts examined at `eng.phonetics.consonant-sounds` and `eng.phonetics.vowel-sounds`, is ultimately a description of a physically measurable acoustic signal. This extends the consolidated missing-cross-link finding already recorded across this program's phonetics-domain authoring to a sixth site, reinforcing rather than repeating the recommendation that the Curriculum Production Pipeline conduct a single domain-wide audit.
- **Music — rhythm, meter, and prosodic phrasing.** Word stress is, structurally, the linguistic analogue of a strong/weak beat pattern in music, and the connection is genuinely close (see Transfer Connections' poetry-meter note) — but the KG has no music domain to link to, so this is recorded as an observation rather than a proposed edge.

## Blueprint References

Blueprint exists: `docs/curriculum/blueprints/eng.phonetics.syllable-stress.md`. Reused by reference, **not restated**:

- **Component 1 — Misconception Register**: both misconceptions' trigger signals, conflict evidence, bridge/replacement text, discrimination pairs. This entry adds birth-type classification and the teaching consequences that follow from type, identifying the first misconception as a further terminology-contamination instance and noting the second misconception's unusual two-opposite-symptoms presentation.
- **Component 2 — Prerequisite Diagnostic Block**: PD-1 and its fail-route to `eng.phonetics.ipa-basics`.
- **Component 3 — Concrete Anchor**: the stress-clap-and-stretch script.
- **Component 4 — Conceptual Development Sequence**: TA-1…TA-5, including the deliberately morphologically-related word family in TA-5.
- **Component 5 — Worked Examples**: WE-1…WE-3.
- **Component 6 — Mastery Probe Set**: MP-1…MP-5, the item bank. This entry adds only the response-pattern reads.
- **Components 7–8**: session architecture, protocol routing (S0/S1/S6/S9, including L1 stress/tone transfer anticipation), and adaptive flags (multi-cue-bundle framing, schwa-as-clearest-marker, noun/verb-shift-as-genuine-pattern).

## Runtime Asset References

No seeded `AssetIdentity` records exist for this concept as of 2026-08-03. English carries no `HUMAN_CURATOR` authored-seed rows in production; existing English rows are `AI_AUTHORED` live-capture only (CLAUDE.md, AssetIdentity Global Audit). No assets created as part of authoring this entry.

## Curriculum Feedback

- **Missing cross-link (physics — acoustic prosody), sixth occurrence.** This concept extends the now well-established finding that `eng.phonetics.*` nodes systematically lack encoded links to the physical acoustics underlying their content. Recorded as a further data point for the single consolidated Pipeline audit already recommended at `eng.phonetics.consonant-sounds` and reinforced at every subsequent phonetics-domain concept in this program; not repeated here as an independent new recommendation.
- **Terminology-contamination pattern, further instance.** The first misconception extends the pattern already identified at `eng.phonics.sight-words` and `eng.phonetics.minimal-pairs` to the everyday sense of "stress"/"emphasis" itself — a further data point for the same cross-domain notation/terminology-contamination lens already recommended to the Pipeline.
- **`estimated_hours: 2` is plausible for the general concept and the noun/verb pattern specifically, and likely optimistic for reliable, natural-speech stress perception** to generalise fully beyond exaggerated demonstration material — consistent with the recurring pattern in this batch that prosodic/perceptual skills requiring real-time performance under natural conditions take measurably longer to consolidate than their underlying conceptual content.

## Version History

- v1.0 (2026-08-03): Initial entry. Blueprint reused by reference (Components 1–8). 2 misconceptions classified by birth type; the first identified as a further terminology-contamination instance, the second noted for its unusual two-opposite-symptoms presentation. 1 missing cross-link (physics — acoustic prosody) recorded as the sixth occurrence of the established cross-batch pattern. Duration-estimate observation recorded as Curriculum Feedback.
