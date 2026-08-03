# Consonant Phoneme Classification — `eng.phonetics.consonant-sounds`

## Identity

- **KG ID**: `eng.phonetics.consonant-sounds`
- **Name**: Consonant Phoneme Classification
- **Domain**: English / Phonetics
- **Difficulty**: developing
- **Bloom level**: understand
- **Mastery threshold**: 0.75
- **Estimated hours**: 3
- **Requires**: `eng.phonetics.articulation-organs` — load-bearing part: the learner must already hold the voicing × place × manner three-dimension model and have the throat-buzz test, the touch-locate test, and basic airflow attention as working instruments. This entry does not build those instruments; it applies them exhaustively.
- **Unlocks**: (none in the KG)
- **Cross-links**: (none in the KG)
- **Blueprint**: `docs/curriculum/blueprints/eng.phonetics.consonant-sounds.md`

## Learning Objective

The learner can:
1. Classify any English consonant by place of articulation, using the touch/locate test rather than recall.
2. Classify any English consonant by manner of articulation, using the airflow-shape test.
3. Classify any English consonant by voicing, using the throat-buzz test.
4. State a complete three-dimension description (voicing + place + manner) for a given consonant, never fewer than all three.
5. Apply the three-test procedure live to a genuinely novel or unfamiliar sound and derive its classification, rather than recalling a memorised label.

## Core Understanding

The consonant inventory of English is not a list of ~24 unrelated facts — it is the **complete, exhaustive application** of the three-dimension model (voicing × place × manner) established at the prerequisite concept, run systematically across every consonant the language uses. Place answers *where* the airstream is constricted (bilabial, labiodental, dental, alveolar, post-alveolar, palatal, velar, glottal — a front-to-back inventory of possible constriction points). Manner answers *how* it is constricted (stop/plosive: full closure then release; fricative: narrow gap, turbulent friction; affricate: stop immediately released into a fricative, one phoneme, not two sounds glued together; nasal: oral closure with the velum lowered, air escaping through the nose; liquid: minimal, non-turbulent constriction with distinctive resonance; glide/approximant: barely any constriction at all, closer to a vowel). Voicing answers whether the vocal folds vibrate. A consonant's identity is the **unique intersection of all three** — no single dimension, and no pair of dimensions, is sufficient to specify a sound, because English systematically reuses each value across multiple sounds (voiceless bilabial alone could be /p/ with no manner specified; bilabial stop alone could be /p/ or /b/ with no voicing specified). The genuinely powerful structural fact this concept reveals is the **cognate-pair system**: English consonants overwhelmingly come in voiced/voiceless pairs sharing identical place and manner (p/b, t/d, k/g, f/v, θ/ð, s/z, ʃ/ʒ, tʃ/dʒ), which reduces the "24 independent facts" burden to roughly 12 place-manner combinations, each with a voicing switch — the chunking structure the Blueprint's adaptive flags name explicitly as a scalability aid.

## Mental Models

**Beginner — "consonant sounds are things I've heard named before."**
The runnable simulation: to classify a sound, search memory for whether a teacher has previously told you its label. This is not tutor-installed — it is what any learner defaults to immediately after `eng.phonetics.articulation-organs`, where most sounds encountered *were* explicitly labelled during the discovery-and-formalization sequence. It works perfectly for drilled sounds and fails completely for anything novel.
*Upgrade trigger*: presented with a genuinely unfamiliar or unclassified sound (the Blueprint's own /ʃ/ anchor, chosen specifically because it was not classified upstream) and no memorised label is available.
*Shelf-life warning at replacement*: "You're going to meet sounds we haven't named together. The label doesn't matter as much as knowing how to find it yourself."

**Intermediate — "I can run the three tests, but I check each dimension as a separate little fact."**
The simulation: apply the place test, get an answer; apply the manner test, get an answer; apply the voicing test, get an answer; treat each as complete on its own. This model can correctly execute all three tests and still produce an incomplete answer ("it's bilabial" — stated as if that alone identifies the sound), because the model has not yet grasped that the three results must be *combined*, not merely collected.
*Upgrade trigger*: given a single dimension's value (e.g., "voiceless and bilabial") and asked to name the sound with certainty — the learner discovers this is genuinely ambiguous until manner is added.
*Shelf-life warning*: "Each test gives you one piece. A sound isn't identified until you have all three pieces together."

**Advanced — "a consonant is a coordinate in a three-dimensional space, and the tests are how I read the coordinates."**
The simulation: any consonant, familiar or not, is treated as an address to be found by running all three tests and stating the result as one combined description. This is the target model, and it is the one Component 4's TA-4 (full classification, no scaffolding) and TA-5 (a genuinely novel sound) are designed to certify.
*Upgrade trigger*: encountering a consonant from another language that occupies a place-manner cell English leaves empty (a uvular stop, a click, a pharyngeal fricative) — the coordinate system extends naturally; the specific inventory does not.
*Shelf-life warning*: "This grid has more empty cells than English uses. Other languages fill in different ones."

**Expert — "the consonant system is a language-particular selection from a universal articulatory space, and cognate pairing is not incidental — it reflects how the system is organised."**
The learner recognises that the voiced/voiceless pairing is not a memory trick imposed from outside but a genuine organisational principle of how the phonological system economises its inventory (one place-manner "slot" hosting two phonemes via a single binary switch). Named here to mark the arc; this is IPA/phonology territory beyond this concept's scope.

## Why Students Fail

The dominant failure mechanism is a **direct continuation of the risk flagged at the prerequisite concept**: a learner who met /m/, /p/, /t/, /k/, /f/, /s/ as labelled examples during discovery at `eng.phonetics.articulation-organs` arrives here having quietly reverted to treating those labels as facts to recall, because recall is faster and, for drilled sounds, indistinguishable in outcome from genuine test-application. This concept exists specifically to force the distinction back into view, and it can only do so by presenting sounds the learner has never classified — which is why the Blueprint's TA-5 and MP-5 are not optional enrichment but the actual certification instrument.

The second mechanism is **combinatorial overload**: three dimensions, each with several possible values, genuinely produce more distinct facts than most learners can hold as independent items (roughly 24 consonants × up to 3 dimensions each). Unlike the prerequisite concept, where the learner discovered only three switches on a handful of sounds, here the same three switches must be applied exhaustively — and without the cognate-pairing chunking strategy, the sheer volume invites exactly the memorisation-over-method shortcut this concept is trying to prevent.

The third, more specific mechanism is treating **any single dimension, or any two, as sufficient**. This is not carelessness — it is a natural resting point for a learner who has correctly learned to run three separate tests but has not yet been forced to notice that "voiceless bilabial" underdetermines the sound. It typically survives until directly challenged, because most classroom presentation of a single sound states all three dimensions together, giving the learner no natural occasion to notice that fewer than three would have been ambiguous.

## Misconceptions

The Blueprint's **Component 1 — Misconception Register** owns the trigger signals, conflict evidence, bridge/replacement text, and discrimination pairs for both entries below. Reused by reference; birth-type classification and teaching consequence added here.

### MC-CLASSIFICATION-IS-JUST-LABELING
*(Blueprint Component 1, MC-CLASSIFICATION-IS-JUST-LABELING — includes the drilled-vs-novel-sound discrimination pair.)*
- **Birth type**: Type 5 (instruction-induced), and specifically a *carryover* birth type — this misconception is not newly formed here so much as inherited from how the prerequisite concept's discovery sequence necessarily used named examples. Discovery teaching that ends in formalisation (naming what was found) always creates some risk that the names, rather than the finding-procedure, become what is retained.
- **Teaching consequence of the birth type**: because the underlying skill (running the tests) genuinely exists and is not absent, the repair is **not** re-teaching the tests — it is forcing their use on material where recall cannot substitute, i.e., a sound the learner has never had labelled. Presenting more drilled sounds, however many, cannot diagnose or repair this misconception; only novelty can.
- **Verification of death**: given a sound with no prior label available (the Blueprint's own L1-sound accommodation for S9 learners is one legitimate source of such material), the learner narrates the three-test procedure unprompted, rather than guessing from the sound's similarity to something already known.

### MC-PLACE-MANNER-VOICING-ARE-INDEPENDENT
*(Blueprint Component 1, MC-PLACE-MANNER-VOICING-ARE-INDEPENDENT.)*
- **Birth type**: Type 1 (overgeneralization) from a genuinely correct procedural habit — the learner has correctly learned to run three *separate* tests, and reasonably (but wrongly) concludes that three separate results constitute three separate, independently sufficient facts, rather than three co-required coordinates of one fact.
- **Teaching consequence**: the repair must supply a **concrete case of ambiguity** the learner discovers for themselves — the Blueprint's own conflict evidence ("voiceless and bilabial — can you tell me for certain which sound that is?") is exactly this, and it is more effective than any assertion that "you need all three," because the learner's own inability to pin down the sound from two dimensions is the evidence, not the tutor's say-so.
- **Verification of death**: spontaneously states all three dimensions unprompted when asked to "classify" a sound, without needing the prompt "is that everything?" — the box/height-width-depth analogy below is aimed precisely at making the omission feel visibly incomplete rather than merely under-specified.

## Analogies

**Best — the three dimensions of a box (height, width, depth).** The Blueprint's own bridge text uses exactly this comparison, and it earns its place as the best analogy because it makes *incompleteness itself perceptible*: stating only a box's height leaves you with no idea of its width or depth, and the learner already has robust, hard-wired intuitions about why one measurement doesn't specify a box. Transferring that intuition to "voiceless" alone not specifying a sound is close to a direct mapping.
*Breaking point*: box dimensions are continuous and independent; place/manner/voicing are categorical and not fully independent in English (not every place-manner combination is actually used — there is no bilabial affricate in English, for instance). Don't let the learner conclude every combination of values is a real sound.

**Alternative — a locker combination.** Three numbers, and any two alone don't open the locker. Useful specifically for reinforcing that *all three together, and only together*, uniquely determine the outcome, with a slightly higher-stakes framing (you don't just get an incomplete answer, you get no access at all) than the box comparison.
*Breaking point*: a locker combination has an arbitrary correct answer with no internal logic; the three consonant dimensions are not arbitrary — each one is a real physical fact about production. Don't let this imply the classification is a code to memorise rather than a description to derive.

**Story analogy — the detective with three separate clues.** The Blueprint's own Component 3 anchor already frames classification as detective work; extending the metaphor, a detective who has a suspect's height alone, or height and hair colour but no name, hasn't solved the case — all available evidence must be assembled before the case (the sound's identity) is closed. This reinforces both misconceptions simultaneously: solving with only recalled "known suspects" (MC-CLASSIFICATION-IS-JUST-LABELING) versus solving with partial evidence (MC-PLACE-MANNER-VOICING-ARE-INDEPENDENT).
*Breaking point*: none serious; this is close to a restatement of the Blueprint's own framing rather than a new metaphor, which is appropriate here since the anchor already does most of the work.

**Visual analogy — the cognate-pair table**, built by the learner (see Tutor Actions), with place across the top, manner down the side, and each cell holding a voiced/voiceless pair. Not a metaphor — the actual structural artefact this concept produces, and it should be built progressively across TA-1 through TA-4 rather than presented finished.

### ANTI-ANALOGIES (do not use)

- **"Each consonant has its own special recipe."** "Recipe" implies a fixed, memorised list of steps per item — exactly MC-CLASSIFICATION-IS-JUST-LABELING's error, applied to the *procedure* rather than only to the *label*.
- **"Voiced and voiceless sounds are pairs, like siblings."** Family language ("siblings," "partners") is common in teaching this content and it is imprecise in a way that matters here: it implies the pairing is about relatedness or resemblance rather than about sharing two coordinates and differing on exactly one. A learner who has internalised "siblings" may accept /p/ and /f/ as a pair (both voiceless, both involve the lips loosely) rather than the true pair /p/-/b/.
- **"Just remember the chart."** Directly installs MC-CLASSIFICATION-IS-JUST-LABELING by naming memorisation as the goal. The chart is a *record* of applying the method, never a substitute for it.

## Demonstrations

Prediction first in every case.

1. **The detective routine on an unfamiliar sound (learner activity).** Blueprint Component 3 — full script there, using /ʃ/. *Predict first*: "What do you think this sound's place, manner, and voicing might be — before we test it?" Then run all three tests in order.
2. **The two-dimension trap (teacher-led, learner-resolved).** *Predict first*: "I'll tell you a sound is voiceless and bilabial. Can you tell me for certain which sound I mean?" (Blueprint's own conflict evidence for MC-PLACE-MANNER-VOICING-ARE-INDEPENDENT.) Then add manner and watch the ambiguity resolve.
3. **Cognate-pair discovery (learner activity).** *Predict first*: "If /p/ and /b/ share their place and manner and differ only in voicing, what do you predict /t/'s voiced partner sounds like — before I tell you?" Let the learner produce /d/ by analogy, then verify with the throat test. This demonstration does double duty: it builds the chunking structure and it exercises transfer of the three-dimension model to a new pair without direct instruction.
4. **The novel-sound challenge (learner activity, ideally using a genuine L1 sound for S9 learners per the Blueprint's adaptive flag).** *Predict first*: "You haven't classified this sound today — what's your plan for figuring it out?" This is the demonstration that most directly tests MC-CLASSIFICATION-IS-JUST-LABELING, because a plan that begins "I'll try to remember what this is called" versus "I'll run the three tests" is diagnostic before any answer is given.

## Discovery Questions

This concept sits between guided discovery and direct instruction, and the split should be explicit: **the method (three tests, applied together) is discoverable and was already discovered at the prerequisite concept; the specific inventory of English consonants is not discoverable, it is a closed, conventional list that must be surveyed systematically.**

The genuinely discoverable content here is the **cognate-pairing structure** itself — nothing forces a learner to notice that English's ~24 consonants collapse into roughly 12 place-manner slots with a voicing switch, and discovering this is worth deliberate guided sequencing:

1. **Need**: "We're going to classify every consonant sound in English. That's a lot of separate facts — is there a shortcut?"
2. **Playground**: lay out several already-classified sounds (from TA-1/TA-2) and let the learner notice that some share place and manner.
3. **Invention**: "What's the same about /p/ and /b/? What's different?" The learner names the shared coordinates and the one differing switch, themselves.
4. **Collision**: present /f/ and /θ/ — same manner (fricative), different place, and ask whether they're a pair. They are not (they don't share place), which sharpens exactly what "pair" means.
5. **Formalization**: name the structure — cognate pairs, sharing place and manner, differing only in voicing — as a chunking tool, not a new fact to memorise on top of the individual sounds.
6. **Compression**: "Find the partner: same spot, same shape, just flip the voice switch."

Everything else — which sound occupies which specific cell, the full inventory of places and manners — is surveyed and told, per Component 4's systematic TA-1/TA-2/TA-3 sweep, not discovered.

## Teaching Sequence

The pedagogical logic behind this arc:

- **One dimension at a time, fully, before combining** (Blueprint's own S0 routing, generalised as the default sequencing rather than only a remediation for a specific student state). Running place, then manner, then voicing as separate systematic sweeps (TA-1, TA-2, TA-3) before requiring the combination (TA-4) means the learner secures each test independently before the harder task of holding all three simultaneously is asked of them.
- **The MC-PLACE-MANNER-VOICING-ARE-INDEPENDENT collision belongs after the individual sweeps and before or during the combination task**, never earlier — the misconception cannot even be demonstrated until the learner has individually correct dimension-values to be shown as insufficient. Presenting the box analogy before any dimension is secure would be abstract and unearned.
- **Cognate-pair chunking should be introduced during the voicing sweep (TA-3), not held back until the full-classification task (TA-4)** — voicing is the dimension that most naturally exposes pairing (it is, after all, the "shared place and manner, differing voicing" relationship), so the chunking structure and the voicing dimension should be taught together rather than sequentially.
- **The novel-sound challenge (TA-5) must come last and must be genuinely novel** — introducing it early, before the method is even secure on familiar sounds, would conflate "learning the method" with "learning the method under maximum difficulty" and likely produce failure attributable to load rather than to the specific MC-CLASSIFICATION-IS-JUST-LABELING pattern it is designed to isolate.
- **For S9 learners, the L1-sound accommodation should be reserved specifically for TA-5**, not scattered earlier — using it as the culminating novel-sound challenge simultaneously validates the learner's existing phonological knowledge (per the Blueprint's adaptive flag) and supplies the cleanest possible test of transfer, since an L1 sound is guaranteed unfamiliar to the classification method regardless of the learner's English proficiency.

Turn-by-turn scripting, protocol routing, and adaptive flags: Blueprint **Component 7 — Session Architecture** and **Component 8 — Adaptive Flags**.

## Tutor Actions

In recommended order, from `../teaching-actions/`:

1. **Demonstration** (SHOW) — learner-performed physical testing (touch, throat, airflow) on each new sound, exactly as at the prerequisite concept; this remains proprioceptive evidence and tutor-performed demonstration remains largely non-transmissive here.
2. **Concept Map** (ORGANIZE) — the cognate-pair table, built progressively across the session rather than presented complete. This is the single most valuable artefact this concept produces and it directly counters both misconceptions: building it forces all-three-dimensions-together (countering MC-PLACE-MANNER-VOICING-ARE-INDEPENDENT) and organises the inventory as a structure to derive rather than a list to recall (countering MC-CLASSIFICATION-IS-JUST-LABELING).
3. **Matching** (DO) — sound-to-classification and classification-to-sound, bidirectionally. The asymmetry is diagnostic: a learner who can classify a heard sound but cannot produce a sound given its classification (e.g., "produce a voiced alveolar fricative") has one-directional knowledge, and production-from-description is the harder, more valuable direction to certify.
4. **Error Analysis** (TEST-THINKING) — present an incomplete classification ("it's a fricative") and ask the learner to identify what's missing. Directly exercises MC-PLACE-MANNER-VOICING-ARE-INDEPENDENT's repair.
5. **Prediction** (TEST-THINKING) — the cognate-pair-by-analogy demonstration above, and more generally predicting a novel sound's classification before testing it, which is the behaviour TA-5/MP-5 certify.

**Does not fit**: **Worked Example** in the traditional derivation sense — classification is testing, not calculation, and the Blueprint's own "worked examples" function as scripted demonstrations rather than procedural derivations, consistent with the pattern already noted at `eng.phonics.blending-segmenting`. **Game** — real chocolate-covered-broccoli risk: a speed-classification game rewards fast recall of drilled sounds, which is precisely the shortcut MC-CLASSIFICATION-IS-JUST-LABELING consists of; if used at all, it must be restricted to sounds already independently verified as testable-not-just-recallable.

## Voice Teaching Notes

This concept's core evidence remains **proprioceptive and physical-testing based**, inherited directly from `eng.phonetics.articulation-organs`; voice carries the learner's spoken classification answer and their narration of the test procedure, not the primary evidence itself. (Channel reality: `../foundations/03-voice-first-learning-model.md §7`.)

What the ideal tutor perceives:

- **Fluent labelling with no narrated test.** The single clearest MC-CLASSIFICATION-IS-JUST-LABELING signature: a confident, immediate answer with no audible reference to checking anything. This is indistinguishable from genuine mastery *on drilled sounds*, which is exactly why it must always be checked against a novel sound before being trusted (see Assessment Signals).
- **Narrated testing that stalls partway through** ("it's... let me check... voiceless, and... "). This is *positive*, not a sign of difficulty — the learner is genuinely running the procedure rather than retrieving a label, and the pause is the procedure taking real time. Do not rush a learner who is audibly mid-test.
- **A classification answer that stops after one or two dimensions**, delivered with apparent finality (falling intonation, no continuation). This is the auditory signature of MC-PLACE-MANNER-VOICING-ARE-INDEPENDENT and it precedes any explicit check — the intonational "I'm done" is itself diagnostic before the tutor even asks "is that all three?"
- **Self-correction on cognate pairs** ("/p/... no wait, that one's voiced, so /b/"). Strongly positive: evidence the pairing structure is active and being used to self-check, not merely recited.

**Load-bearing sentence, delivered slowly**: *"Don't tell me what you remember — tell me what you just tested."*

## Assessment Signals

Item bank: Blueprint **Component 6 — Mastery Probe Set** (MP-1…MP-5). Response-pattern reads, which the Blueprint does not own:

- **Single-dimension probes (MP-1, MP-2, MP-3).**
  - *Fast-correct with all values stated for the dimension asked* → competent execution of that specific test.
  - *Fast-wrong, but wrong in a way that suggests a different dimension was tested* (e.g., asked for place, answers with a manner term) → a category confusion between dimension-types, not a factual error about the sound; this is a distinct repair from a wrong place value.
- **Full classification (MP-4).**
  - *All three dimensions stated together, correct, on a novel sound* → genuine target-state evidence.
  - *Two dimensions stated with apparent completeness* (no self-correction, no "and voicing?" prompt needed) → MC-PLACE-MANNER-VOICING-ARE-INDEPENDENT is live regardless of whether the two stated dimensions are themselves correct — the omission itself is the finding, independent of accuracy.
  - *Three dimensions stated but requiring a prompt to add the third* → the repair has partially landed; the learner knows all three matter but has not yet made producing all three automatic. Continue combination practice; do not treat as failure.
- **The novel-sound challenge (MP-5) is this concept's golden probe** and the only item that can distinguish genuine method-mastery from successful memorisation of the drilled set. A learner who passes MP-1 through MP-4 flawlessly and stalls or guesses on MP-5 has NOT mastered this concept — they have mastered the drilled subset, and the certification must not be granted on MP-1–4 alone.
- **Narration quality on MP-5** matters as much as the final answer: a correct classification reached by *narrating* the three tests in order is strictly stronger evidence than the same correct classification reached silently, since a silent correct answer on a "novel" sound may indicate the sound was less novel to this particular learner than intended (e.g., an L2 English learner whose L1 already contains the sound).

**Mastery certification trigger**: correct single-dimension classification across place, manner, and voicing on separate novel items; a spontaneous (unprompted) full three-dimension classification on at least one item; and a correctly narrated three-test procedure applied live to a sound with no available prior label, culminating in a correct classification. The narrated-procedure requirement on the final item is non-negotiable — it is the only evidence this concept has that distinguishes its actual target skill from a superficially identical memorisation shortcut.

## Tutor Recovery Strategy

Generic engine: `../foundations/01-recovery-engine.md`. Concept-specific notes only:

- **"There are too many sounds to remember"** — an extremely common and entirely reasonable protest given the raw inventory size (~24 consonants × 3 dimensions), and it should be met by **immediately reframing the task, not by reassurance**: "You're right — that's why we don't memorise them. Let's find the shortcut." Pivot directly to cognate-pair chunking (Blueprint's own scalability adaptive flag) rather than encouraging more memorisation effort, which would validate exactly the wrong strategy.
- **"I don't know, I've never heard that one before"** on the novel-sound challenge — take this at face value as potentially a *correct* diagnostic response in progress, not a failure to redirect away from. The correct next move is not to supply the answer but to ask "so what can you test?" — pushing the learner back onto the method they already have rather than rescuing them with the label.
- **The smaller question to shrink to**: from full three-dimension classification, down to **a single dimension on a single, well-drilled sound with the physical test explicitly narrated aloud** ("touch where /t/ happens — where is it?"). This isolates one test, on secure material, and re-establishes that individual tests work before recombining them.
- **Never shrink to "just tell me if it sounds like a p or a b."** This substitutes a same-sounding-word guess for the actual physical test and will produce an apparently correct answer with zero diagnostic value about whether the method is present.

## Memory Hooks

- **Concept type**: concept (a classification system) with an embedded **tool skill** (the three physical tests, applied fluently and quickly). The system itself, once understood, is durable; the tests need continued practice to stay fast and automatic.
- **Review form**: spaced classification items specifically favouring **novel-to-the-learner sounds over re-drilling the same ~24**, since re-drilling familiar sounds risks reinforcing exactly the recall shortcut this concept works against. A review schedule built entirely from the drilled set will look like successful retention while quietly permitting MC-CLASSIFICATION-IS-JUST-LABELING to regrow undetected.
- **Concept-specific deviation**: because this concept has no unlocking child in the KG (`unlocks: []`), its natural re-probe schedule cannot rely on being exercised by a downstream concept the way `eng.phonetics.articulation-organs` is exercised by this one. Deliberate, independent spaced review is required rather than assumed.
- **Interleaving partners**: `eng.phonetics.vowel-sounds` once available — interleaving consonant and vowel classification items, once both are underway, sharpens the boundary between the two systems (vowels lack place/manner in the consonant sense) and prevents the learner from over-extending consonant-specific tests onto vowels. Cognate-pair items should always be interleaved *with each other* (rather than drilled one pair exhaustively before moving to the next) to build the pairing structure as a genuine retrieval aid rather than a sequence of isolated facts.

## Transfer Connections

- **Near**: `eng.phonetics.ipa-basics` — the IPA consonant chart is a direct visual formalisation of exactly the three-dimension grid this concept builds by hand; a learner arriving with the cognate-pair table already constructed meets the IPA chart as a confirmation of known structure rather than a new thing to learn.
- **Near**: `eng.phonetics.minimal-pairs` — minimal pairs for consonants are, almost without exception, single-dimension contrasts (differ in exactly one of place/manner/voicing) — this concept's classification system is the analytic tool that makes minimal-pair contrasts precisely describable rather than merely "sound different."
- **Far**: `eng.phonics.consonants` and `eng.phonics.digraphs` — the letter-level phonics work downstream benefits from a learner who already has a place-and-manner vocabulary for *why* certain letter combinations (like "th" representing /θ/ or /ð/, or "ch" representing /tʃ/) group the way they do, though the print-focused concept does not require this analytic depth to succeed on its own terms.
- **Real-world**: understanding accent and dialect variation systematically — many dialect differences are describable as a single-dimension shift (e.g., a stop realised as a fricative, or a shift in place), and a learner holding this concept can describe *what* varies rather than only noticing that something does.
- **Expert transfer**: the durable skill is **exhaustive, systematic application of a general classification method to a bounded inventory, while resisting the shortcut of memorising outcomes instead of re-deriving them** — directly transferable to any domain with a categorical multi-dimensional taxonomy (biological classification, chemical functional-group identification, periodic-table trends).

## Cross-Subject Connections

KG records no `cross_links`. A genuine connection exists, compounding a finding already recorded twice upstream in this batch:

- **Physics — acoustic phonetics.** Manner of articulation is, physically, a description of airflow turbulence and pressure release patterns; voicing is glottal source-frequency; this concept's entire classification system is a linguistic re-description of acoustic and aerodynamic phenomena with real physics content. This is the third consecutive phonetics-domain node in this program's authoring queue found to have this missing link — a pattern strong enough to be worth stating explicitly rather than repeating as an isolated observation each time (see Curriculum Feedback).
- **No genuine connection to mathematics, chemistry, or biology at this concept specifically** — the three-dimension classification *structure* is abstractly similar to any multi-dimensional taxonomy (noted under Transfer Connections as an expert-level transfer), but that is a structural resemblance in the learner's cognitive skillset, not a subject-matter link the KG's `cross_links` field is designed to encode. Stated explicitly so this is not later mistaken for an oversight.

## Blueprint References

Blueprint exists: `docs/curriculum/blueprints/eng.phonetics.consonant-sounds.md`. Reused by reference, **not restated**:

- **Component 1 — Misconception Register**: both misconceptions' trigger signals, conflict evidence, bridge/replacement text, discrimination pairs. This entry adds birth-type classification and the teaching consequences that follow from type.
- **Component 2 — Prerequisite Diagnostic Block**: PD-1 and its fail-route to `eng.phonetics.articulation-organs`.
- **Component 3 — Concrete Anchor**: the three-test detective routine script, using /ʃ/.
- **Component 4 — Conceptual Development Sequence**: TA-1…TA-5, including the full place/manner/voicing inventories.
- **Component 5 — Worked Examples**: WE-1…WE-3.
- **Component 6 — Mastery Probe Set**: MP-1…MP-5, the item bank. This entry adds only the response-pattern reads.
- **Components 7–8**: session architecture, protocol routing (S0/S1/S6/S9, including the L1-sound-as-asset flag), and adaptive flags (method-over-memorisation, three-dimension co-occurrence, cognate-pair chunking).

## Runtime Asset References

No seeded `AssetIdentity` records exist for this concept as of 2026-08-03. English carries no `HUMAN_CURATOR` authored-seed rows in production; existing English rows are `AI_AUTHORED` live-capture only (CLAUDE.md, AssetIdentity Global Audit). No assets created as part of authoring this entry.

## Curriculum Feedback

- **Missing cross-link (physics — acoustic phonetics), third consecutive occurrence.** This is the third phonetics-domain node in this batch (`eng.phonetics.speech-sounds-overview`, `eng.phonetics.articulation-organs`, and now this one) found to have a genuine, unencoded mechanism-level link to physics. The pattern is now strong enough to recommend the Curriculum Production Pipeline audit the entire `eng.phonetics.*` domain for this class of missing edge in one pass, rather than treating each occurrence as an independent finding.
- **No unlocks recorded (`unlocks: []`).** This is accurate — consonant classification is a terminal analytic skill in the current English KG, feeding no further concept directly — but it does mean this concept's mastery has no downstream concept to reinforce it through use (unlike, say, `eng.phonetics.articulation-organs`, which is continuously re-exercised by this very concept). Worth noting for the Memory Hooks section above and for any future scheduling design, not a defect in the KG itself.
- **`estimated_hours: 3` is reasonable** given the genuine combinatorial scope (up to 24 sounds × 3 dimensions), and the cognate-pair chunking strategy is what makes the estimate plausible at all — a learner taught without that chunking would very likely need substantially longer.

## Version History

- v1.0 (2026-08-03): Initial entry. Blueprint reused by reference (Components 1–8). 2 misconceptions classified by birth type. 1 missing cross-link (physics — acoustic phonetics) recorded as Curriculum Feedback, flagged as the third consecutive occurrence in this batch and recommended for a domain-wide Pipeline audit.
