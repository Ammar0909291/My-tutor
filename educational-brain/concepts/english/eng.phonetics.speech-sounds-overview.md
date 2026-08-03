# Overview of Speech Sounds — `eng.phonetics.speech-sounds-overview`

## Identity

- **KG ID**: `eng.phonetics.speech-sounds-overview`
- **Name**: Overview of Speech Sounds
- **Domain**: English / Phonetics
- **Difficulty**: foundational
- **Bloom level**: understand
- **Mastery threshold**: 0.75
- **Estimated hours**: 2
- **Requires**: `eng.phonics.phonemic-awareness` — load-bearing part: the learner must already be able to *hear a word as a sequence of separable sound-chunks*. This entry does not teach that ability; it takes it and asks the learner to look at where those chunks come from physically.
- **Unlocks**: `eng.phonetics.articulation-organs`
- **Cross-links**: (none in the KG)
- **Blueprint**: `docs/curriculum/blueprints/eng.phonetics.speech-sounds-overview.md`

## Learning Objective

The learner can:
1. Count the sounds in a spoken word independently of counting its letters, and state when the two counts differ.
2. Feel and name a physical difference between two speech sounds (voicing, lip closure) without using any letter vocabulary.
3. Identify the same sound across words that spell it differently ("fish", "phone", "laugh").
4. Judge a dialect difference as variation rather than error, and say why.
5. Explain in their own words why English's sound inventory and its alphabet cannot map one-to-one.

## Core Understanding

Speech is a physical event before it is anything else: air from the lungs is set vibrating (or not) at the vocal folds, then shaped by the movable parts of the mouth into a stream of distinguishable acoustic units. A **phoneme** is a category of such units that a given language treats as meaningfully distinct — swap one for another and the word changes. Writing is a *later, lossy, historically-accreted attempt* to record that stream. English has roughly 44 phonemes (the exact count varies by dialect and by analytic convention) and 26 letters, so the mapping is necessarily many-to-many: one phoneme can have several spellings (/f/ as *f*, *ph*, *gh*), and one letter can represent several phonemes (*c* in *cat* vs. *city*). Crucially, a phoneme is a **category, not a stamp** — its physical realisation varies with dialect, speed, and neighbouring sounds (the *t* of "butter" is a tap for most Americans and a plosive for most southern English speakers), and both realisations belong to the same category for their respective speakers. Studying speech sounds means describing this real, variable physical behaviour, not enforcing one correct pronunciation.

## Mental Models

**Beginner — "sounds are the letters you say."**
The runnable simulation: to find the sounds in a word, picture the spelling and read the letters off. This is the model the learner *arrives with* — it is already wrong, and it is not tutor-installed. It survives because it works on the easy cases ("cat" = 3 letters, 3 sounds) and fails silently on the rest.
*Upgrade trigger*: a word where the counts diverge and the learner cannot explain it — "ship" (4/3) or "box" (3/4).
*Shelf-life warning to deliver at replacement*: "You'll notice letters and sounds match on lots of short words. That's a coincidence of English spelling, not a rule — so we always count them separately."

**Intermediate — "sounds are things my mouth does."**
The simulation: to find the sounds, say the word slowly and notice each separate mouth action. This is the first genuinely usable model. It licenses the voiced/voiceless throat check and the "same sound, different spelling" discovery.
*Upgrade trigger*: the learner hears two people say "butter" differently and asks which one is right.
*Shelf-life warning*: "This model gets you a long way. What it doesn't yet handle is that the *same* sound can come out slightly differently depending on who's speaking."

**Advanced — "a sound is a category, and speakers vary inside it."**
The simulation: hearing a variant, the learner asks *which category does this belong to for this speaker?* rather than *is this correct?* This is the model that makes dialect data interpretable instead of threatening.
*Upgrade trigger*: encountering a language where a distinction English ignores is meaningful (or vice versa) — typically at `eng.phonetics.minimal-pairs` or later.
*Shelf-life warning*: "Categories are per-language. What counts as 'the same sound' in English isn't universal."

**Expert — "phonemes are contrastive units; phonetics describes, phonology categorises."**
The simulation: the learner separates the *physical* description of a sound from its *functional* role in a language's system, and knows which question they are asking at any moment. This is the model `eng.phonetics.ipa-basics` and `eng.phonetics.minimal-pairs` formalise.

## Why Students Fail

The failure is not difficulty — it is **prior installation**. Almost every learner arrives at this concept having spent years being taught letters as the atomic unit of language, so "sound" has already been quietly redefined in their head as "the thing a letter makes." Asking them to count sounds therefore does not feel like a new task; it feels like the letter task they already know, so they run the letter procedure and get an answer that is confidently wrong. The second failure mode is affective rather than cognitive: dialect variation reads as *error* to a learner whose entire prior schooling framed pronunciation as right-or-wrong, so the correct answer ("both are valid") feels like the tutor being permissive rather than being accurate.

## Misconceptions

The Blueprint's **Component 1 — Misconception Register** is the authoritative source for the trigger signals, conflict evidence, bridge/replacement text, and discrimination pairs of both misconceptions below. They are reused by reference here; this entry adds only birth-type classification and the teaching consequence of each type.

### MC-SOUNDS-EQUAL-LETTERS
*(Blueprint Component 1, MC-SOUNDS-EQUAL-LETTERS — probes and discrimination pairs cited, not restated.)*
- **Birth type**: Type 3 (language contamination) compounded by Type 5 (instruction-induced). The word "sound" is contaminated by classroom usage — "what sound does B make?" teaches the learner that sounds are properties *of letters*. The alphabet-first ordering of nearly all early instruction then supplies the false generalisation for free.
- **Teaching consequence of the birth type**: because this is contamination of a *word*, not a false inference from evidence, collision alone is not enough — the learner will agree that "ship" has 3 sounds and still revert next week. The repair must include a **terminology split**: name the two counting tasks differently ("count-by-listening" vs. "count-by-looking") and always name which one is being asked for. A Type-3 misconception dies when the contaminated word stops being ambiguous, not when a counterexample is produced.
- **Verification of death**: the learner spontaneously asks "sounds or letters?" when given an ambiguous counting instruction — this is the signal, not merely getting "thing" (5/3) right.

### MC-SPEECH-SOUNDS-ARE-FIXED-UNITS
*(Blueprint Component 1, MC-SPEECH-SOUNDS-ARE-FIXED-UNITS.)*
- **Birth type**: Type 1 (overgeneralization), with a strong affective carrier. The learner has correctly learned that letters are fixed shapes and generalises fixedness to sounds; prescriptive correction from adults ("say it properly") reinforces it.
- **Teaching consequence**: the affective carrier means this repair must be run *without any implication that the learner's own accent is the deviant one*. Present the variation with the learner's own pronunciation as one of the two valid samples, never as the thing being corrected. A learner who suspects their accent is on trial will produce the right answer and keep the misconception.
- **Verification of death**: presented with a third, previously unheard variant, the learner classifies it as variation without being prompted — and, on a genuine substitution error, still correctly says *that* one is a deviation. Both halves are needed; a learner who now calls everything valid has overshot into a new error.

## Analogies

**Best — the recipe and the photograph of the dish.** Speech is the cooking; writing is a photograph someone took of the result, years ago, with a bad camera. The photo is useful and mostly recognisable, but you cannot read the ingredient list off it, and two different dishes can photograph almost identically.
*Breaking point*: it implies writing is merely an imperfect copy. Writing is also a system in its own right with its own logic — do not let the learner conclude spelling is arbitrary noise.

**Alternative — footprints and the walk.** Letters are footprints; the sounds are the walking. You can infer a lot about the walk from the prints, but the prints are not the walk, and different surfaces record the same walk differently.
*Breaking point*: footprints are a passive trace; spelling was deliberately designed (badly, repeatedly, by committee). Don't extend this to "nobody chose the spelling."

**Story analogy — the 26 costumes for 44 actors.** A theatre company has 44 actors but only 26 costumes. Some actors have to share a costume (*c* plays both /k/ and /s/), and some actors need two costumes at once to be recognisable (*sh* for /ʃ/). The play still works; the wardrobe is just overloaded.
*Breaking point*: implies a deliberate shortage. Fine for the age band, but it will need retiring before etymology comes up.

**Visual analogy — a hand on the throat.** Not a metaphor but a genuine instrument: /z/ buzzes, /s/ does not. The learner's own body is the clearest "diagram" this concept has.

### ANTI-ANALOGIES (do not use)

- **"Sounds are the building blocks and letters are the labels on the blocks."** Installs a clean one-to-one mapping — precisely the misconception MC-SOUNDS-EQUAL-LETTERS. Breaks the moment "sh" appears.
- **"English is spelled wrong / English spelling makes no sense."** Emotionally satisfying and factually misleading. It installs learned helplessness about spelling, and it is false: English spelling is highly regular once morphology and etymology are accounted for. This one actively damages `eng.writing.spelling-strategies` downstream.
- **"Each letter has its own sound."** The single most damaging sentence in early literacy instruction. It is the direct cause of MC-SOUNDS-EQUAL-LETTERS. Never say it, even as a simplification, even to a five-year-old.

## Demonstrations

Elicit the prediction **first** in every case — the demonstration's value is entirely in the gap between what the learner expects and what their own body does.

1. **The throat check (learner activity).** *Predict first*: "Do you think /z/ and /s/ are made in different places in your mouth, or the same place?" Then hand on throat, "zzzz" then "ssss". The mouth position is identical; only the buzzing differs. This is the Blueprint's Component 3 anchor — see it there for the full script.
2. **Count-twice (learner activity).** *Predict first*: "How many sounds in 'ship'? Write your guess." Then count by listening (3) and by looking (4). Do not resolve the mismatch immediately; let it sit for one beat.
3. **The /f/ hunt (teacher demo → learner activity).** *Predict first*: "Which of these three words is the odd one out: fish, phone, laugh?" Most learners pick by spelling. Then say all three aloud slowly.
4. **The "butter" pair (teacher demo).** *Predict first*: "I'm going to say this word two ways. One of them is wrong — which?" Then produce both. The correct answer is "neither" and the setup is deliberately a trap; debrief the trap explicitly, because being tricked into a prescriptive judgement is what makes the point land.

## Discovery Questions

Guided discovery is right here — the evidence is on the learner's own body and requires no equipment, which is the ideal condition for invention over instruction.

1. **Need**: "You already know how to break a word into sounds. Where do those sounds actually *come from*?"
2. **Playground**: free exploration — say /a/, /m/, /s/, /z/, /p/ with a hand on the throat and a hand in front of the lips. "What can you feel changing?"
3. **Invention**: "Sort these five sounds into two groups, any way you like, and tell me your rule." Learners reliably invent voicing, or lip-closure, or airflow — all three are real phonetic dimensions and all three are correct answers at this stage.
4. **Collision**: "Here's 'ship'. Count the sounds. Now count the letters." The learner's own sorting rule (built from mouth actions) has no way to produce 4.
5. **Formalization**: name what they built — sounds are physical actions, letters are marks, and the two are counted by different senses.
6. **Compression**: "Ears for sounds, eyes for letters." One sentence, and it is the sentence they will actually retrieve under load.

## Teaching Sequence

The pedagogical logic that shapes this arc:

- **Physical evidence must precede the letter collision.** If you open with "ship has 4 letters but 3 sounds", the learner has no model to resolve the conflict with and will simply memorise the exception. Establishing "sounds are mouth actions" first gives the collision somewhere to land.
- **Voicing before place of articulation.** Voicing is the only phonetic dimension the learner can detect with their own hand, unaided. Every other dimension needs either a mirror or a teacher's description. Start with the one that is self-verifiable.
- **The "same sound, different spelling" task must come after the count-mismatch task, not before.** Both attack MC-SOUNDS-EQUAL-LETTERS, but the count task attacks it with numbers (unambiguous) and the spelling task attacks it with identity judgements (which a committed learner can argue with). Win the unambiguous fight first.
- **Dialect variation goes last in the arc, and only once the learner is succeeding.** It is the only part of this concept with an affective load. A learner who is currently getting things wrong will hear "there are multiple valid pronunciations" as an excuse being offered to them.

The turn-by-turn session script, protocol tags, and adaptive flags live in the Blueprint's **Component 7 — Session Architecture** and **Component 8 — Adaptive Flags**; they are not re-derived here.

## Tutor Actions

In recommended order, from `../teaching-actions/`:

1. **Prediction** (TEST-THINKING) — the load-bearing action for this concept. Every demonstration above is worthless without it; the learning is in the prediction error, not the observation.
2. **Demonstration** (SHOW) — but specifically *learner-performed*, not tutor-performed. The throat check done by the tutor teaches nothing.
3. **Matching** (DO) — the /f/-across-spellings task. Note the bidirectional diagnostic: a learner who can go sound→spellings but not spellings→sound has a partial model, and that asymmetry names the next lesson.
4. **Error Analysis** (TEST-THINKING) — the "butter" trap. Safe here because the flaw is planted in a *judgement about others*, not in the learner's own production.
5. **Concept Map** (ORGANIZE) — two columns, "counted by ear" / "counted by eye", built by the learner. This is the artefact that survives the session.

**Does not fit**: **Worked Example** — there is no procedure with steps here to model. **Game** — the chocolate-covered-broccoli risk is unusually high, because a sorting game rewards speed and this concept's whole point is slowing down enough to notice. **Role-Play** — no interpersonal content.

## Voice Teaching Notes

This concept's core evidence is **audio and proprioceptive**, which makes it one of the few English concepts where the voice channel is genuinely load-bearing rather than incidental. (For what the runtime actually captures versus what an ideal tutor would perceive, see `../foundations/03-voice-first-learning-model.md §7` — that gap is owned there, not restated here.)

The ideal tutor listens for:
- **Letter-names leaking into sound production.** Asked for the sounds in "ship", the learner says "ess, aitch, eye, pee". This is not a near-miss; it is MC-SOUNDS-EQUAL-LETTERS speaking out loud, and it is the single highest-value signal this concept produces.
- **Sound-with-a-vowel-attached**: /puh/ for /p/, /muh/ for /m/. Extremely common, largely harmless at this stage, but it will corrupt blending downstream at `eng.phonics.blending-segmenting`. Note it; don't stop the lesson for it.
- **Hesitation located *before* the count rather than during it.** A pause before starting means the learner is deciding *which procedure to run* (ears or eyes) — that is a good sign, the split is taking. A pause mid-count means they are running the letter procedure and hit "sh".
- **Rising intonation on an answer** ("...three?") — the learner has the right answer and no confidence in the method. Do not simply confirm; ask how they got it.

**The load-bearing sentence, to be delivered slowly and once**: *"Letters are marks that try to record sounds — they are not the sounds themselves."* Everything else in this concept is elaboration of that sentence.

## Assessment Signals

The item bank lives in the Blueprint's **Component 6 — Mastery Probe Set** (MP-1…MP-5). What follows is the read on the *response pattern*, which the Blueprint does not own.

- **Count-mismatch probe ("thing": 5 letters / 3 sounds).**
  - *Fast-correct* → the ear/eye split is installed and automatic. Certify.
  - *Slow-correct* → the split exists but is being consciously executed each time. Not yet mastery; needs automaticity practice, not reteaching.
  - *Fast-wrong* (answers 5/5) → MC-SOUNDS-EQUAL-LETTERS is DOMINANT and undisturbed. This is the confident-wrong quadrant; route to repair, not to more examples.
  - *Slow-wrong* → the learner knows the two answers should differ and cannot execute the listening count. This is a **phonemic-awareness** gap, not a gap in this concept. Route back to `eng.phonics.phonemic-awareness` rather than re-teaching here.
- **Dialect probe (MP-4).** The *reasoning* is the whole signal; a bare "no, they're both fine" is not evidence. A learner who answers correctly but cannot say why has learned the expected answer, which is worse than a wrong answer honestly reasoned.
- **Explanation probe (MP-5).** Listen for whether the learner's explanation is *causal* ("because one letter can stand for different sounds") or *enumerative* ("because 'sh' is two letters"). Enumerative means they have memorised the examples.

**Mastery certification trigger**: three consecutive fast-correct count-mismatch judgements on *novel* words, at least one of which is an under-counting case (letters < sounds, e.g. "box"), plus a causal answer on MP-5. Under-counting cases are non-negotiable — a learner can pass every over-counting item with the rule "digraphs are one sound" and still hold the misconception intact.

## Tutor Recovery Strategy

Everything generic belongs to `../foundations/01-recovery-engine.md`. Concept-specific notes only:

- The likeliest utterance here is **"I don't get it"** delivered right after the count-mismatch collision — and it is usually honest and correct. The learner's model has just been broken and nothing has replaced it yet. Do not rush to resolve; name it: *"You're right that it doesn't add up yet. That's the interesting bit."*
- **"I'm just bad at spelling"** appears surprisingly often here, because the learner assumes any lesson touching letters is a spelling test. Correct the framing explicitly and immediately — this concept has no spelling requirement whatsoever, and letting that belief stand will suppress participation for the rest of the session.
- **The smaller question to shrink to**: from *"how many sounds in 'thing'?"* down to *"does 'zzzz' buzz?"* — hand on throat, single binary, physically self-verifiable, zero memory load. It is nearly impossible to fail and it re-establishes that this concept is about the body, not about knowing things.

## Memory Hooks

- **Concept type**: concept (not fact, not procedure) — the object being learned is a *distinction* between two systems, so review must take the form of re-drawing the distinction on new material, never recall of the 44/26 numbers.
- **Review form**: spaced *discrimination* items — a fresh word each time, "sounds or letters?" Recognition-style review (restating the definition) will pass without the distinction being live.
- **Concept-specific deviation**: this concept needs an **extended re-probe tail**. MC-SOUNDS-EQUAL-LETTERS is Type-3 (language contamination) and regrows whenever the learner returns to a letter-heavy context — which, in a literacy curriculum, is constantly. Schedule re-probes well past the normal decay window, and specifically *after* any spelling-focused concept.
- **Interleaving partners**: `eng.phonics.phonemic-awareness` (the prerequisite skill — mixing keeps the listening count fluent) and, once available, `eng.phonics.digraphs` (the sharpest source of count mismatches). Do **not** interleave with `eng.phonics.alphabet-recognition` during initial acquisition — running letter-naming and sound-counting in the same session is exactly the condition that grows the misconception back.

## Transfer Connections

- **Near**: `eng.phonetics.articulation-organs` — this entry establishes *that* sounds are physical; that entry names the parts doing the work. The transfer is immediate and the KG edge is correct.
- **Near**: `eng.phonics.digraphs` — every digraph is a live instance of the count mismatch established here. A learner who holds this concept meets digraphs as confirmation rather than as an exception list to memorise.
- **Far**: `eng.writing.spelling-strategies` — the sound/spelling split is what makes spelling learnable as a *mapping problem* rather than as arbitrary memorisation.
- **Far**: `eng.linguistics.*` generally — the phoneme-as-category idea is the first appearance of the descriptive-not-prescriptive stance that the whole linguistics strand depends on.
- **Real-world**: understanding why a search engine finds "fone" for "phone", why voice assistants mishear proper nouns, why a name can be spelled several ways and sound identical.
- **Expert transfer**: learning any second language. The learner who holds "phonemes are per-language categories" can hear a distinction their own language ignores; the learner who holds "sounds are letters" will map every foreign word onto English spelling and fossilise the accent.

## Cross-Subject Connections

The KG records no `cross_links` for this node. Genuine connections that exist anyway:

- **Physics — sound waves, frequency, resonance.** Voicing *is* vocal-fold vibration frequency; the vowel/consonant distinction is a resonance-versus-turbulence distinction. This is a real, load-bearing link and the KG does not encode it. **Recorded as Curriculum Feedback below.**
- **Biology — the vocal tract as anatomy.** Handed off almost entirely to `eng.phonetics.articulation-organs`, which is the correct owner; noted here only so this entry does not duplicate it.
- **Computer science — encoding.** The many-to-many phoneme/grapheme mapping is a genuine encoding problem, and it is the same problem as character encoding. Real but abstract; worth raising only for an advanced or CS-interested learner.

## Blueprint References

Blueprint exists: `docs/curriculum/blueprints/eng.phonetics.speech-sounds-overview.md`. Components deliberately **reused by reference, not restated** in this entry:

- **Component 1 — Misconception Register**: both misconceptions' trigger signals, conflict evidence, bridge text, replacement text, and discrimination pairs. This entry adds birth-type classification and the teaching consequences that follow from type.
- **Component 3 — Concrete Anchor**: the "feel your mouth move" anchor script.
- **Component 4 — Conceptual Development Sequence**: TA-1…TA-5.
- **Component 5 — Worked Examples**: WE-1…WE-3.
- **Component 6 — Mastery Probe Set**: MP-1…MP-5, the item bank. This entry adds only the response-pattern reads.
- **Component 7 — Session Architecture** and **Component 8 — Adaptive Flags**: the runtime session script.

## Runtime Asset References

No seeded `AssetIdentity` records exist for this concept as of 2026-08-03 — no `HUMAN_CURATOR` rows in `src/lib/teaching/assets/brainSeedAssets.ts` or the English authored-seed sources, and English's production rows are `AI_AUTHORED` live-capture only (see CLAUDE.md, AssetIdentity Global Audit). No assets are created as part of authoring this entry; seeding is a separate Wave-0-gated step.

## Curriculum Feedback

- **Missing cross-link (physics).** The KG records `cross_links: []`, but voicing is literally vocal-fold vibration frequency and the vowel/consonant contrast is resonance versus turbulence. A link to the physics sound/wave domain is a genuine missing edge, not a stretch. Recorded for the Curriculum Production Pipeline; not fixed here.
- **Prerequisite ordering observation.** This node requires only `eng.phonics.phonemic-awareness`, which is correct. Worth noting that it does **not** require `eng.phonics.alphabet-recognition` — and shouldn't, since the whole concept is that letters are a separate system. The absence of that edge is deliberate-looking and correct; recorded so a future editor does not "helpfully" add it.
- **Difficulty label**: `foundational` with Bloom `understand` is accurate, but this node carries an unusually high misconception-repair load for a foundational node (a Type-3 contamination that regrows). The 2-hour estimate is optimistic if the repair is done properly rather than merely covered.

## Version History

- v1.0 (2026-08-03): Initial entry. Blueprint reused by reference (Components 1, 3, 4, 5, 6, 7, 8). 2 misconceptions classified by birth type. 1 missing cross-link recorded as Curriculum Feedback.
