# Sentence Stress — `eng.phonetics.sentence-stress`

## Identity

- **KG ID**: `eng.phonetics.sentence-stress`
- **Name**: Sentence Stress
- **Domain**: English / Phonetics
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.75
- **Estimated hours**: 2
- **Requires**: `eng.phonetics.syllable-stress` — load-bearing part: the learner must already produce and perceive word-level stress reliably, including schwa reduction, since this entry extends the same length/pitch/vowel-quality bundle and the same reduction mechanism from the syllable level up to the sentence level.
- **Unlocks**: `eng.phonetics.intonation-patterns`
- **Cross-links**: (none in the KG)
- **Blueprint**: `docs/curriculum/blueprints/eng.phonetics.sentence-stress.md`

## Learning Objective

The learner can:
1. Identify content words (nouns, main verbs, adjectives, adverbs) versus function words (articles, prepositions, auxiliaries, pronouns, conjunctions) in a given sentence.
2. Produce a sentence with natural rhythm, stressing content words and reducing function words, including common schwa reductions ("to" → /tə/, "and" → /ən/, "of" → /əv/).
3. Distinguish natural, unevenly-stressed sentence rhythm from unnatural, flat, equally-stressed reading, and explain why the former sounds more natural.
4. Recognise that a word's content/function status can shift with its grammatical role in a given sentence (auxiliary "can" versus noun "can").
5. Produce and explain contrastive or emphatic stress on a normally-unstressed function word, when context calls for it.

## Core Understanding

Sentence stress extends word-level stress to the scale of a whole utterance, and its central structural fact is that natural English sentences are **not evenly stressed** — **content words**, which carry the sentence's core referential meaning (nouns, main verbs, adjectives, adverbs), receive stress, while **function words**, which carry mainly grammatical structure (articles, prepositions, auxiliary verbs, pronouns, conjunctions), are typically unstressed and frequently **reduced**, their vowels weakening toward schwa exactly as an unstressed syllable's vowel does within a single word ("to" becomes /tə/, "and" becomes /ən/, "the" becomes /ðə/). This produces English's characteristic **stress-timed rhythm**: the perceptually salient beats fall roughly at even intervals on the stressed content words, regardless of how many unstressed function words are compressed into the gaps between them — a structurally different rhythmic organisation from a "syllable-timed" language, where each syllable receives roughly equal time regardless of stress. The content/function classification is a **strong, reliable default**, not an absolute or unchangeable rule, and it is qualified in two genuine, systematic ways: first, the same word can shift category with its **grammatical role** in a specific sentence (the modal auxiliary "can," normally reduced, versus the noun "can," a full content word, stressed); second, a speaker can deliberately apply **contrastive or emphatic stress** to a normally-unstressed function word specifically to highlight a contrast or intensify a claim ("I did NOT say that"). Both qualifications are real, rule-governed, communicatively meaningful phenomena — not noise that undermines the default pattern, but a further, expressive layer built on top of it.

## Mental Models

**Beginner — "every word in a sentence gets said with about the same weight."**
The runnable simulation: read or produce a sentence giving each word roughly equal emphasis, length, and clarity. This is not tutor-installed — it is the natural output of careful, word-by-word reading (as when sounding out unfamiliar text) or of early L2 production, where the learner is still consciously assembling the sentence rather than producing it as a fluent, integrated unit.
*Upgrade trigger*: the Blueprint's own conflict evidence — comparing an all-equal-stress reading of a sentence against a natural speaker's rendering of the same sentence.
*Shelf-life warning at replacement*: "Equal weight can feel careful and clear, but natural English leans hard into some words and glides quickly past others — that unevenness is what actually sounds fluent."

**Intermediate — "I can identify and produce the content/function stress pattern, and I treat each word's category as a fixed property of that word."**
The simulation: correctly label and stress most sentences using the content/function default, while treating the classification as a permanent label attached to the word itself rather than to its role in a specific sentence. This model handles the great majority of ordinary cases correctly and fails specifically when a word's grammatical role shifts, or when a speaker deliberately overrides the default for emphasis.
*Upgrade trigger*: the Blueprint's own conflict evidence — "I CAN swim" (reduced, default auxiliary) versus "Yes, I CAN!" (stressed, emphatic reinforcement of the same word).
*Shelf-life warning*: "The default is a strong starting guess, not a permanent label. Always check what job the word is doing in this specific sentence, and whether the speaker seems to be adding emphasis."

**Advanced — "sentence stress follows the content/function default as a strong baseline, adjusted for a word's actual grammatical role in context, and further overridable for deliberate contrastive or emphatic effect — and the whole system produces English's characteristic stress-timed rhythm."**
The simulation: given any sentence, the learner correctly applies the default, checks for role-based exceptions, and remains alert to context suggesting deliberate emphasis, producing genuinely natural-sounding rhythm. This is the target model, matching TA-4 and TA-5.
*Upgrade trigger*: `eng.phonetics.intonation-patterns` (the direct unlock), where pitch contour across a sentence — not merely which words are stressed — becomes the object of study, adding a further, coordinated layer on top of the stress pattern this concept establishes.
*Shelf-life warning*: "This gets the rhythm — which words stand out and which glide past. There's a whole further layer of *how the pitch rises and falls* across the sentence, which is the next piece."

**Expert — "stress-timed versus syllable-timed rhythm is a genuine typological parameter along which languages vary systematically, and a speaker's L1 rhythmic category is one of the most persistent, hardest-to-fully-acquire features in second-language pronunciation, often surviving long after individual sound errors have been corrected."**
Named here to mark the arc; this concept deliberately does not attempt the full cross-linguistic typology, but the Blueprint's own S9 protocol routing directly anticipates this expert-level fact by budgeting significantly more practice time for syllable-timed-L1 learners rather than treating slow progress here as a sign of general difficulty.

## Why Students Fail

The dominant failure mechanism is that **careful, deliberate speech and natural, fluent speech genuinely differ in rhythm, and the learner's model of "correct" pronunciation is frequently built from careful, deliberate examples** (reading aloud slowly, early instruction emphasising clear articulation of every word) — a learner who has been repeatedly praised for clear, careful pronunciation has, in a real sense, been reinforced toward exactly the equal-stress pattern that sounds unnatural in fluent conversation, and unlearning this is not correcting an error so much as adding a second, context-appropriate register on top of a first one that remains valid for its own purposes (the Blueprint's own S6 routing makes this validation explicit).

The second mechanism is the same **prior-knowledge-as-a-single-fixed-fact** pattern already seen at `eng.phonics.consonants`' hard/soft c/g rule and `eng.phonics.long-vowels-silent-e`'s core rule, now recurring at the level of an entire word's grammatical category rather than a single letter's sound: a learner who has correctly learned that "can" is usually reduced has learned a genuinely reliable default and has not yet been given a reason to check whether that default still applies in a specific sentence, since most encounters with "can" as an auxiliary will not challenge the default at all.

The third mechanism is specific to and predictable from L1 rhythmic typology: a learner whose first language is **syllable-timed** (giving each syllable comparatively equal duration, regardless of stress — a pattern shared by many widely-spoken languages including Spanish, French, and Mandarin) is not merely unfamiliar with English's stress-timed rhythm but has a different, well-practised, and unmarked default rhythmic pattern of their own actively competing for control of their English production — this is a genuine, well-documented instance of prosodic L1 transfer, not a general difficulty with the concept, and the Blueprint's own S9 routing correctly anticipates it requiring substantially more deliberate practice than for a learner whose L1 is itself stress-timed.

## Misconceptions

The Blueprint's **Component 1 — Misconception Register** owns the trigger signals, conflict evidence, bridge/replacement text, and discrimination pairs for both entries below. Reused by reference; birth-type classification and teaching consequence added here.

### MC-EVERY-WORD-GETS-EQUAL-STRESS
*(Blueprint Component 1, MC-EVERY-WORD-GETS-EQUAL-STRESS — includes the "I WANT TO GO TO THE STORE" and "She's READING a BOOK" discrimination pairs.)*
- **Birth type**: Type 5 (instruction-induced), and specifically induced by a *genuinely valuable* prior instructional emphasis — clear, careful, fully-articulated speech is a real and appropriate register for some contexts (public speaking, teaching pronunciation, reading aloud to a young child), and the learner has not done anything wrong in having internalised it; the misconception is applying that register's rhythm indiscriminately to ordinary conversational speech, where a different, unevenly-stressed rhythm is the actual native-speaker norm.
- **Teaching consequence of the birth type**: because the source pattern is itself a valid register, the repair must **add a second register alongside the first, not replace or invalidate it** — the Blueprint's own s6_path does this correctly ("word-by-word equal stress isn't wrong, just unnatural for conversational speech — context-appropriate register matters"), and framing this as register-flexibility rather than correction protects the learner's existing, genuinely useful careful-speech skill.
- **Verification of death**: given a context cue suggesting a specific register (a casual conversational prompt versus a "read this aloud clearly for a young child" prompt), the learner correctly and deliberately shifts rhythm to match, rather than applying one fixed rhythm regardless of context — demonstrating register control, not merely acquisition of the new pattern in isolation.

### MC-CONTENT-FUNCTION-SPLIT-IS-FIXED-PER-WORD
*(Blueprint Component 1, MC-CONTENT-FUNCTION-SPLIT-IS-FIXED-PER-WORD — includes the "I CAN swim" / "Yes, I CAN!" and "put it ON the table" / "Turn it ON, not off" discrimination pairs.)*
- **Birth type**: Type 1 (overgeneralization), of a strong, genuinely reliable default rule to the full space of possible uses, missing the two systematic qualifications (grammatical-role shift; deliberate emphatic override) the Core Understanding identifies as real and rule-governed rather than exceptional noise.
- **Teaching consequence**: because the default itself remains correct and valuable in the large majority of cases, the repair must **preserve the default as the correct first move while adding an explicit checking step** — the Blueprint's own replacement text does this precisely ("use the content/function default as a strong starting guess, but always check...") — and the two qualifications should be taught as *legitimate, rule-governed flexibility* (per Component 8's explicit framing), never as arbitrary exceptions that threaten the default's reliability, mirroring the now-familiar exceptions-framing principle established at several phonics concepts in this program.
- **Verification of death**: given a genuinely novel sentence where a normally-function word is used with a shifted grammatical role, or where context strongly implies contrastive emphasis, the learner correctly applies stress to that word while explaining the specific reason (role change, or emphasis) rather than treating it as an unexplained exception or, in the opposite failure, refusing to deviate from the default at all.

## Analogies

**Best — a spotlight operator following the meaning of a story, not the actors' names.** In a stage play, the spotlight follows whoever is doing something important to the plot right now — not always the same actor, and never every actor equally. Content words are where the "spotlight" of a sentence lands — they carry what the sentence is actually about — while function words are the actors standing quietly in the background, present and necessary but not currently lit.
*Breaking point*: a spotlight operator makes a deliberate, conscious choice each time; sentence stress is largely automatic and unconscious for a fluent speaker — useful for the *selective prominence* idea, not for implying stress placement requires ongoing deliberate decision-making once fluent.

**Alternative — a text message where only the important words are capitalized, and the rest are typed quickly and carelessly.** "i WANT to go to the STORE" — capitalising only the words that carry the real information mirrors exactly which words get stressed and which get glided over in natural speech.
*Breaking point*: capitalisation is a discrete, binary visual choice; sentence stress involves the continuous length/pitch/vowel-quality bundle already established at `eng.phonetics.syllable-stress` — useful for the *which words matter* selection, not for the acoustic mechanism itself.

**Story analogy — a headline versus the small print.** A newspaper headline uses large, bold text for the words that carry the story's core content; the smaller supporting text (bylines, captions) is present but visually de-emphasised. Content words are a sentence's headline; function words are its small print.
*Breaking point*: headlines and small print are permanently, visually fixed categories on a page; a word's stress status in speech can shift with grammatical role or emphasis, which this analogy doesn't capture — useful only for the *default* pattern, not the concept's qualifications.

**Visual analogy — the stress-beat sentence walk** (Blueprint Component 3): stomping on content-word cards, tiptoeing on function-word cards, physically embodying English's stress-timed rhythm as a walkable beat pattern. Not a metaphor but the actual working instrument this concept's core teaching is organised around, and it directly visualises the "roughly equal time between stressed beats, regardless of how many unstressed words fall between them" structural fact from the Core Understanding.

### ANTI-ANALOGIES (do not use)

- **"Stress the important words and don't worry about the rest."** Vague enough to fail to distinguish "important to the meaning" (the correct, content/function-based criterion) from "important to me personally" or "long/hard-to-say words" — imprecise framing here risks the learner stressing words for the wrong reason even while landing on a superficially similar-sounding result.
- **"Function words don't matter, so you can rush through them however you like."** Overstates function words' unimportance — they carry essential grammatical structure and must still be intelligible, merely reduced and unstressed, not slurred into incomprehensibility; "don't matter" risks licensing genuine unintelligibility rather than correct, controlled reduction.
- **"Once a word is a function word, it's always unstressed, no exceptions."** Directly installs MC-CONTENT-FUNCTION-SPLIT-IS-FIXED-PER-WORD in its most rigid form, foreclosing exactly the grammatical-role-shift and emphatic-override content this concept must teach.

## Demonstrations

Prediction first in every case.

1. **The stress-beat sentence walk (learner activity).** Blueprint Component 3 — full script there. *Predict first*: "Before we walk it — which cards do you think we'll stomp on, and which will we tiptoe past?"
2. **The equal-stress-versus-natural collision (teacher-led, learner-resolved).** Blueprint's own conflict evidence. *Predict first*: "Do you think a sentence said with every word exactly equal will sound like normal talking, or something else?" Then produce both versions back to back.
3. **The CAN role-shift reveal (teacher-led, learner-resolved).** Blueprint's own conflict evidence for the second misconception. *Predict first*: "Is 'can' always said the same way, no matter what?" Then produce "I CAN swim" as a plain statement, followed by "Yes, I CAN!" as an emphatic reply, and let the contrast register.
4. **The contrastive-stress task (learner activity, TA-5).** *Predict first*: "If someone doubts you did something, and you want to correct them strongly, do you think you'd stress a different word than usual?" Then produce "I said I WOULD go, not that I DID go" and identify the shifted stress.

## Discovery Questions

Following the pattern established at `eng.phonetics.syllable-stress`, this concept splits into **direct instruction for the terminology and mechanism** (content/function classification and the schwa-reduction mechanism are best delivered directly, drawing on already-secure prior knowledge from `eng.phonetics.syllable-stress`) and **guided discovery for the two qualifications**, both of which are directly extractable from contrastive evidence the learner can generate or examine themselves.

1. **Need**: "Is 'can' always said the exact same way, no matter how you use it in a sentence?"
2. **Playground**: the learner says "can" in a few different sentences and contexts freely — as a plain modal statement, and as an emphatic reply to doubt — without being told in advance to expect any difference.
3. **Invention**: "Did anything change about how you said 'can' depending on the situation?" The learner notices the shift themselves.
4. **Collision**: introduce a case using "can" as a noun ("get me a CAN") — confirming the shift is tied to grammatical role and communicative intent, not to the word "can" having two arbitrary, unrelated behaviours.
5. **Formalization**: name the two qualifications — grammatical role can shift a word's default category; deliberate emphasis can override the default for contrast — as legitimate, rule-governed flexibility layered on the content/function default.
6. **Compression**: "The default is a strong first guess. Check the word's job in this sentence, and whether someone's making a point."

## Teaching Sequence

The pedagogical logic behind this arc:

- **Content/function identification (TA-1) comes before production (TA-2)**, establishing the analytical classification skill before asking the learner to simultaneously classify and produce correct rhythm — separating perception/analysis from production exactly as established at several concepts throughout this program.
- **Production practice (TA-2) precedes the equal-versus-natural contrast (TA-3)**, giving the learner direct, felt experience producing the natural pattern before being asked to judge and articulate why it differs from the flat alternative — a contrast is more meaningful once the learner has firsthand experience of what is being contrasted.
- **Both qualifications (TA-4, TA-5) are deliberately sequenced after the core content/function default (TA-1 through TA-3) is secure, never introduced simultaneously with it** — this is the Blueprint's own explicit Component 8 framing ("content/function is the essential organizing default... this is the single most important pattern to establish first... before any of the contextual nuance is introduced"), directly paralleling the now-familiar rule-before-exceptions sequencing principle established at multiple phonics concepts earlier in this program, here applied to a grammatical/pragmatic rather than orthographic rule.
- **Grammatical-role shift (TA-4) comes before deliberate emphatic override (TA-5)**, since role-shift is a comparatively mechanical, syntactically-triggered pattern (check the word's part of speech in this sentence), while emphatic override requires the additional, genuinely pragmatic judgement of inferring the speaker's communicative intent — the harder, more context-dependent skill is reserved for last.

Turn-by-turn scripting, protocol routing, and adaptive flags: Blueprint **Component 7 — Session Architecture** and **Component 8 — Adaptive Flags** (in particular the content/function-as-essential-default framing, the explicit schwa-reduction teaching flag, the legitimate-flexibility framing for both qualifications, and syllable-timed-L1 patience for S9 learners).

## Tutor Actions

In recommended order, from `../teaching-actions/`:

1. **Demonstration** (SHOW) — the stress-beat sentence walk and the equal-versus-natural and CAN-role-shift contrasts, all benefiting from being heard aloud, with the walk technique ideally learner-performed (physically stepping) rather than only observed.
2. **Concept Map** (ORGANIZE) — a running content/function classification of sentences, extended over the course of the concept to include role-shift and emphatic-override annotations, giving a compact artefact that keeps the default and its two qualifications visually and conceptually distinct.
3. **Error Analysis** (TEST-THINKING) — presenting a flatly, equally-stressed reading (a puppet's or peer's hypothetical rendering, not the learner's own live attempt) and asking the learner to identify what makes it sound unnatural, directly practising the discrimination MC-EVERY-WORD-GETS-EQUAL-STRESS's repair targets.
4. **Prediction** (TEST-THINKING) — predicting stress shift before producing a role-changed or emphatically-contrasted sentence, exercising the target skills directly.
5. **Matching** (DO) — sentence to correctly-marked stress pattern, and stress pattern to the communicative context (plain statement versus emphatic reply) that would license it.

**Does not fit**: **Worked Example** in the multi-step derivation sense — there is no calculation to model, only a perceptual-and-production skill better served by Demonstration and Prediction. **Game** at speed before the default pattern is secure — a fast sentence-reading game risks rewarding equal-stress fluency (reading every word quickly and clearly) over the actually-target uneven rhythm, precisely inverting this concept's goal if introduced too early.

## Voice Teaching Notes

This concept's core evidence is **audio and prosodic** — length, pitch, and vowel reduction distributed across an entire sentence rather than a single word — making it, alongside `eng.phonetics.syllable-stress` and the connected-speech extension of `eng.phonetics.phonetic-transcription`, one of the concepts in this program most directly affected by the runtime's plain-text STT capture gap identified at `../foundations/03-voice-first-learning-model.md §7`: the entire diagnostic content of this concept — which words are prominent, which are reduced — is exactly the signal a transcription-only channel discards.

What the ideal tutor perceives:

- **Roughly equal length, pitch, and clarity across every word in a sentence, with no differential prominence.** The direct auditory signature of MC-EVERY-WORD-GETS-EQUAL-STRESS, often accompanied by a slower-than-conversational overall pace, since equal-weighting and careful, deliberate speech tend to co-occur.
- **Schwa reduction correctly applied to function words** ("to" as /tə/, "and" as /ən/) even if the learner cannot yet name the phenomenon. Strong positive evidence the target rhythm has been internalised at the production level, independent of metalinguistic labelling.
- **A rigid, unvarying stress pattern applied to a word regardless of its grammatical role or the surrounding communicative context** — the direct behavioural signature of MC-CONTENT-FUNCTION-SPLIT-IS-FIXED-PER-WORD, and it is often most visible on exactly the words the Blueprint's own TA-4 targets (auxiliary/noun homographs like "can," "object," "record").
- **A consistent, syllable-by-syllable evenness across an entire utterance**, distinguishable from ordinary equal-stress-on-content-words by its persistence even on words the learner has independently, correctly classified as content versus function in a prior analytical task — this differential pattern (correct classification, incorrect production) is the specific signature of L1 syllable-timed rhythmic transfer (per the S9 routing), and should be met with the extended, patient practice the Blueprint's own routing specifies, not with re-teaching the classification itself.

**Load-bearing sentence, delivered slowly**: *"Lean into the words that carry the meaning, and glide quickly past the ones that just hold the sentence together."*

## Assessment Signals

Item bank: Blueprint **Component 6 — Mastery Probe Set** (MP-1…MP-5). Response-pattern reads, which the Blueprint does not own:

- **Content/function identification (MP-1).** *Correct classification* → establishes the analytical skill; carries limited diagnostic weight on its own for the production half of this concept, since correct labelling does not guarantee correct production.
- **Producing the pattern (MP-2).** *Correct stress and reduction, produced fluently* → the target state. *Correct when consciously monitored, reverting to equal stress under any distraction or speed pressure* → the pattern is known but not yet automatic; expected mid-acquisition, particularly for a syllable-timed-L1 learner, and should prompt continued natural-speech practice rather than being treated as failure.
- **Equal-versus-natural judgement (MP-3).** This item's value lies specifically in the *stated reason*, not merely the correct choice — a learner who picks the natural-sounding version but cannot articulate why (content/function distinction) has weaker evidence of the underlying model than one who names the specific mechanism.
- **Contextual shift (MP-4).** *Correct stress shift for the grammatical-role change, with the reason stated* → the strongest possible evidence for this misconception's repair, per this program's now-standard practice of requiring stated reasoning on novel-application items rather than accepting a correct answer alone.
- **Explanation (MP-5).** Listen for whether the explanation names all three required elements — the content/function default, the possibility of grammatical-role shift, and the possibility of deliberate emphatic override — a response naming only the default, without acknowledging either qualification, has an incomplete model even if prior items were answered correctly by other means.

**Mastery certification trigger**: correct content/function classification of a novel sentence; fluent, correctly-stressed and correctly-reduced production of that sentence at natural conversational speed (not merely when consciously monitored); a correctly-reasoned judgement favouring the natural-rhythm version over an equal-stress alternative; correct stress production for a genuinely novel grammatical-role-shift case, with the reason stated; and an explanation naming all three structural elements. The natural-speed requirement on the production item is essential, matching the equivalent finding at `eng.phonetics.syllable-stress` — a learner who can only produce correct rhythm when deliberately, consciously monitoring themselves has not yet reached the automaticity this concept ultimately targets.

## Tutor Recovery Strategy

Generic engine: `../foundations/01-recovery-engine.md`. Concept-specific notes only:

- **"But I was taught to say every word clearly"** — take this as an accurate report of genuinely valid prior instruction, not as a habit to be corrected away; respond with the register-addition framing the Blueprint's own s6_path specifies directly: "You're right, and that's a real, useful way to speak in some situations — reading aloud carefully, or speaking to someone who needs extra clarity. Conversational speech uses a different rhythm, and we're adding that as a second tool, not replacing the first."
- **"This feels unnatural, like I'm mumbling the small words on purpose"** — a genuine, common discomfort, particularly for a learner whose L1 doesn't reduce function words this way; validate directly rather than only reassuring: "It can feel that way at first because you're doing it deliberately right now — for a natural speaker, this happens automatically, without any sense of 'mumbling' at all. It'll stop feeling deliberate with practice."
- **The smaller question to shrink to**: from full sentence production, down to **the stress-beat walk on a single, short, maximally familiar sentence, with the tutor walking alongside and stepping in unison** — removing the independent-production demand entirely and isolating the felt, physical rhythm pattern before returning to unsupported speech.
- **Never shrink to "just say it faster, that'll make it sound more natural."** Speed alone does not produce the differential stress-and-reduction pattern this concept requires — a fast, still-equally-stressed sentence remains unnatural, merely more rushed, and this shortcut would not address the actual target skill.

## Memory Hooks

- **Concept type**: perceptual/analytical skill (content/function classification) plus a **production/fluency skill** (stress-and-reduction rhythm, requiring automaticity under natural speed) plus **two qualification rules** (grammatical-role shift; emphatic override) requiring contextual judgement rather than fixed recall.
- **Review form — classification and basic production**: spaced items using genuinely novel sentences, checking both the analytical labelling and the natural-speed production together, since, as established under Assessment Signals, the two do not automatically co-occur and a review protocol testing only one would miss regression in the other.
- **Review form — the qualifications**: review specifically using role-shift homographs (can, record, object, present) and contrastive-emphasis contexts on a rotating, non-repeating basis, mirroring the generalisation-testing principle established at every rule-application item throughout this program.
- **Concept-specific deviation**: for an S9 learner with a syllable-timed L1, review should track production fluency *at natural speed* specifically, rather than accepting correct performance under deliberate, monitored conditions as evidence of consolidation — per the Voice Teaching Notes' differential-pattern diagnostic, this is precisely the gap most likely to persist silently if not actively checked.
- **Interleaving partners**: `eng.phonetics.syllable-stress`'s word-level stress and schwa-reduction items should continue to be interleaved here, since sentence stress is a direct scaling-up of that same underlying mechanism, and allowing word-level fluency to lapse would undermine the sentence-level skill built on top of it.

## Transfer Connections

- **Near**: `eng.phonetics.intonation-patterns` — the direct unlock, adding pitch-contour analysis across a sentence to the stress pattern this concept establishes, extending "which words are prominent" to "how does pitch rise and fall across the whole utterance."
- **Far**: `eng.phonetics.phonetic-transcription`'s connected-speech extension (TA-5) — that concept's most demanding task, transcribing a natural phrase with genuine reduction, depends directly on this concept's content/function distinction and schwa-reduction mechanism as prerequisite knowledge, even though the KG does not encode this concept as a formal prerequisite of transcription (only of `eng.phonetics.intonation-patterns`); this represents a genuine, if informal, cross-concept dependency worth flagging for the Pipeline's attention.
- **Real-world**: listening comprehension of natural, fast conversational speech — a learner who expects every word to be equally clear and prominent will find genuine native-speed speech confusing specifically at the reduced function words, while a learner who has internalised this concept's pattern can predict which parts of an utterance will be less acoustically clear and compensate using context, rather than experiencing every reduction as an incomprehensible gap.
- **Expert transfer**: the durable skill is **allocating differential prominence across a structured sequence based on which elements carry the core informational content, while maintaining but de-emphasising the structurally necessary remainder** — the same allocation principle used in visual design (emphasising a headline over supporting text), in summarising a text (extracting content words as keywords while implicitly discarding function words), and in prioritising information generally within any communicative act.

## Cross-Subject Connections

KG records no `cross_links`. A genuine connection exists, extending the pattern already established at every phonetics-domain concept in this program:

- **Physics — acoustic prosody, cumulatively.** Sentence stress is the direct scaling-up of the same length/pitch/vowel-quality acoustic bundle already established at `eng.phonetics.syllable-stress` as carrying a genuine, unencoded physics link — this concept inherits that same missing link rather than introducing a new, independent one, extending the consolidated Pipeline-audit recommendation to an eighth site without treating it as a new discovery.
- **Cognitive science / information theory — differential allocation of communicative prominence by informational content.** A genuine, abstract parallel (see Transfer Connections' expert-transfer note), but a transferable reasoning skill rather than a KG-encodable subject-matter link.

## Blueprint References

Blueprint exists: `docs/curriculum/blueprints/eng.phonetics.sentence-stress.md`. Reused by reference, **not restated**:

- **Component 1 — Misconception Register**: both misconceptions' trigger signals, conflict evidence, bridge/replacement text, discrimination pairs. This entry adds birth-type classification and the teaching consequences that follow from type, identifying the first misconception as induced by a genuinely valuable prior register rather than an error to eliminate, and the second as a further instance of the rule-versus-qualification pattern already established at several phonics concepts in this program.
- **Component 2 — Prerequisite Diagnostic Block**: PD-1 and its fail-route to `eng.phonetics.syllable-stress`.
- **Component 3 — Concrete Anchor**: the stress-beat sentence walk script.
- **Component 4 — Conceptual Development Sequence**: TA-1…TA-5.
- **Component 5 — Worked Examples**: WE-1…WE-3.
- **Component 6 — Mastery Probe Set**: MP-1…MP-5, the item bank. This entry adds only the response-pattern reads.
- **Components 7–8**: session architecture, protocol routing (S0/S1/S6/S9, including syllable-timed-L1 patience), and adaptive flags (content/function-as-essential-default, explicit schwa-reduction teaching, legitimate-flexibility framing for both qualifications).

## Runtime Asset References

No seeded `AssetIdentity` records exist for this concept as of 2026-08-03. English carries no `HUMAN_CURATOR` authored-seed rows in production; existing English rows are `AI_AUTHORED` live-capture only (CLAUDE.md, AssetIdentity Global Audit). No assets created as part of authoring this entry.

## Curriculum Feedback

- **Missing cross-link (physics — acoustic prosody), eighth occurrence, inherited from the direct prerequisite.** This concept's link is a direct scaling-up of the identical missing link already recorded at `eng.phonetics.syllable-stress` — recorded as confirming evidence for the systemic, domain-wide Pipeline audit already recommended, not as an independent new finding.
- **Informal cross-concept dependency identified.** `eng.phonetics.phonetic-transcription`'s connected-speech task (TA-5) genuinely depends on this concept's content/function distinction and reduction mechanism, but the KG does not encode `eng.phonetics.sentence-stress` as a prerequisite of transcription — only of `eng.phonetics.intonation-patterns`. This program authored transcription before sentence-stress in its topological ordering (transcription at level 6, sentence-stress also at level 6, both unlocked independently by different, earlier prerequisites), meaning the two concepts happened to be authored in the same batch, masking what could otherwise be a genuine sequencing risk for a learner reaching transcription without also having sentence-stress. Recorded for the Curriculum Production Pipeline's consideration; not treated as a KG defect requiring correction, since both concepts' own prerequisite chains are independently well-formed.
- **`estimated_hours: 2` is plausible for the content/function default and likely optimistic for genuinely automatic, natural-speed production to consolidate**, particularly for a syllable-timed-L1 learner — consistent with the recurring pattern across this program's phonetics-domain concepts that prosodic skills requiring real-time, unmonitored fluency take measurably longer than their underlying conceptual content.

## Version History

- v1.0 (2026-08-03): Initial entry. Blueprint reused by reference (Components 1–8). 2 misconceptions classified by birth type. 1 missing cross-link (physics — acoustic prosody) recorded as inherited, confirming evidence for the systemic Pipeline audit. 1 informal cross-concept dependency (with `eng.phonetics.phonetic-transcription`) and 1 duration-estimate observation recorded as Curriculum Feedback.
