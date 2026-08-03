# IPA Basics for English — `eng.phonetics.ipa-basics`

## Identity

- **KG ID**: `eng.phonetics.ipa-basics`
- **Name**: IPA Basics for English
- **Domain**: English / Phonetics
- **Difficulty**: developing
- **Bloom level**: apply
- **Mastery threshold**: 0.75
- **Estimated hours**: 3
- **Requires**: `eng.phonetics.consonant-sounds`, `eng.phonetics.vowel-sounds` — load-bearing part: the learner must already be able to classify any consonant by voicing/place/manner and any vowel by height/backness/rounding, and must already hold that spelling and sound are separate systems (established across the whole phonetics strand). This entry does not teach new sounds; it teaches a new, precise way to *write down* sounds already known.
- **Unlocks**: `eng.phonetics.minimal-pairs`, `eng.phonetics.syllable-stress`, `eng.phonetics.phonetic-transcription`
- **Cross-links**: (none in the KG)
- **Blueprint**: `docs/curriculum/blueprints/eng.phonetics.ipa-basics.md`

## Learning Objective

The learner can:
1. Produce the sound represented by any IPA symbol drawn from the English phoneme inventory, including symbols with no resemblance to a Latin letter.
2. Transcribe a phonetically regular English word into IPA by sounding it out, not by copying its spelling.
3. Transcribe a word with a genuine spelling-sound mismatch (silent letters, digraphs, unexpected vowel spellings) correctly into IPA.
4. Read (decode) an IPA transcription aloud as a spoken word.
5. Explain that IPA transcribes sound only, and correctly identify when a transcription is ambiguous between two different spellings (homophones).

## Core Understanding

The International Phonetic Alphabet is a **one-symbol-one-phoneme notation system**, and its entire value proposition is that it does what English spelling conspicuously fails to do: guarantee a strict, unambiguous, bidirectional mapping between symbol and sound. Every symbol the learner meets here is not a new sound — it is a new *label* for a sound already fully specified by the three-dimension consonant model (voicing × place × manner) or the vowel model (height × backness × rounding) established upstream. This reframing is the concept's entire content: IPA is a skill of **notation fluency**, not a skill of phonetic discovery. Two structural properties follow directly from the one-symbol-one-phoneme design. First, IPA transcription is **produced by listening**, never by reading spelling — a transcriber says the word, attends to what they actually hear, and writes symbols for that, discarding silent letters entirely and representing digraphs (which spell one sound with two letters) with a single symbol. Second, because IPA discards spelling, it necessarily **cannot distinguish homophones** — "night" and "knight" both transcribe to /naɪt/, and a learner who understands IPA correctly recognises this as a *feature* of representing sound alone, not a flaw in the system or an error in their own transcription.

## Mental Models

**Beginner — "IPA symbols are like exotic letters, and I should sound them out the way I sound out English spelling."**
The runnable simulation: encountering an unfamiliar symbol, apply ordinary English letter-reading habits — try to guess a name for it, or decompose it into pieces that look like familiar letters. This is not tutor-installed; it is the default response to seeing an unfamiliar written symbol, reasonably imported wholesale from a lifetime of reading Latin-alphabet text. It fails immediately on any symbol without a Latin-letter resemblance.
*Upgrade trigger*: the Blueprint's own conflict evidence — reading /ʃ/ as if it were "s" followed by "h," then being asked whether /ʃ/ is a new sound or a known one (the sound at the start of "ship").
*Shelf-life warning at replacement*: "These symbols aren't a new alphabet to sound out — each one is a name-tag for a sound you can already make. Your job is matching the tag to the sound, not decoding the tag."

**Intermediate — "each symbol names one known sound, but transcription should still roughly track spelling."**
The simulation: correctly retrieve the sound for a symbol, but when transcribing a whole word, expect a rough correspondence in symbol-count and symbol-order to the original spelling — silent letters get *something*, and every written letter contributes *something* to the transcription. This model has correctly solved the symbol-recognition half of the concept and not yet let go of spelling's grip on the transcription task itself.
*Upgrade trigger*: transcribing "knife" and discovering the transcription has fewer symbols than the word has letters, with the "k" simply gone.
*Shelf-life warning*: "Recognising a symbol is the easy half. The harder habit is transcribing only what you hear, with zero reference to how the word is spelled."

**Advanced — "IPA is a closed, unambiguous notation for sound, fully independent of spelling, and it runs both directions."**
The simulation: the learner can encode (say a word, write its IPA) and decode (read an IPA string, say the word) with equal fluency, and correctly predicts that a transcription may have more, fewer, or a different order of symbols than the source word has letters. This is the target model, matching TA-3 through TA-5's full arc.
*Upgrade trigger*: a transcription that is genuinely ambiguous between two spellings (the Blueprint's own "night"/"knight" case) — the learner must recognise this as expected, not as evidence something has gone wrong.
*Shelf-life warning*: "This gets you a clean, unambiguous record of sound. It deliberately throws away the information spelling carries — which is exactly the trade-off that makes it useful."

**Expert — "IPA is one particular phonetic notation convention among several, calibrated to a broad, cross-linguistically comparable phoneme inventory, and any given transcription reflects a chosen level of narrowness (broad vs. narrow transcription) and a chosen reference accent."**
The learner understands that the symbol set used here is a simplification suited to English pedagogy, that IPA can be used far more narrowly (marking allophonic detail) or dialect-neutrally, and that "the" IPA transcription of a word is itself an accent-dependent choice. Named here to mark the arc; this belongs to advanced phonetics, not this concept's scope.

## Why Students Fail

The dominant failure mechanism is **habit transfer from an entirely different notation system with superficially similar surface features** — both English spelling and IPA use written symbols arranged left-to-right to represent a spoken word, and the learner's only prior experience with exactly this surface format is English spelling, which is *not* a reliable phoneme-to-symbol system. The strategies that work for reading English spelling (partial cues, context, memorised whole-word shapes, tolerance for silent letters) are actively counterproductive here, and nothing about IPA's visual presentation signals to a new learner that a completely different, stricter set of rules is now in force.

The second mechanism is a **residual attachment to spelling as the ground truth**, even once individual symbols are correctly recognised — the learner can name every sound in isolation and still, when asked to transcribe a whole word, unconsciously use the word's spelling as a scaffold for how many symbols "should" appear and in roughly what order. This is not a symbol-recognition failure; it survives symbol mastery and only surfaces at the whole-word transcription task, which is exactly why the Blueprint sequences TA-3 (regular words, where spelling and sound roughly agree, so the error is invisible) before TA-4 (words with genuine mismatch, where the error becomes visible and correctable).

The third, more subtle mechanism is discomfort with the homophone-ambiguity property itself — a learner who has internalised that a transcription and a word should correspond one-to-one experiences a transcription mapping to two different real words as a *sign of failure* on their part, rather than as a correct and expected consequence of a system that discards spelling entirely.

## Misconceptions

The Blueprint's **Component 1 — Misconception Register** owns the trigger signals, conflict evidence, bridge/replacement text, and discrimination pairs for both entries below. Reused by reference; birth-type classification and teaching consequence added here.

### MC-IPA-SYMBOLS-ARE-JUST-FANCY-LETTERS
*(Blueprint Component 1, MC-IPA-SYMBOLS-ARE-JUST-FANCY-LETTERS — includes the /ʃ/ and /θ/ discrimination pairs.)*
- **Birth type**: Type 4 (notation-induced). The learner reasons from the *appearance* of the notation (symbols arranged in a row, resembling letters) rather than from what the notation represents — precisely the same failure shape as the notation-induced misconceptions already flagged at `eng.phonics.rhyming` (reasoning from spelling instead of sound) and `eng.phonetics.articulation-organs` (reasoning from the diagram instead of the mouth). This concept is a fourth instance of the same generic pattern, now applied to a brand-new notation system rather than to spelling or a diagram.
- **Teaching consequence of the birth type**: because the pattern is by now a recurring one in this program's authoring queue, the repair strategy that has worked elsewhere applies directly here — **strip the notation of its power to mislead by grounding every new symbol in already-known, embodied sound**, exactly as the Blueprint's own anchor does (starting with Latin-resembling symbols, then explicitly re-anchoring novel symbols to already-classified sounds via the consonant/vowel classification systems, rather than treating IPA as vocabulary to memorise from scratch).
- **Verification of death**: given a symbol never before drilled (drawn, if possible, from a sound the learner can classify via place/manner/voicing or height/backness/rounding but has not yet seen written as IPA), the learner correctly derives the sound by reasoning from the *phoneme itself*, not by pattern-matching the symbol's shape to a Latin letter.

### MC-IPA-MATCHES-ENGLISH-SPELLING
*(Blueprint Component 1, MC-IPA-MATCHES-ENGLISH-SPELLING.)*
- **Birth type**: Type 4 (notation-induced) again, but the inverse direction — here the learner reasons *from* the English spelling notation onto the IPA notation, assuming structural properties (letter count, letter order) should transfer between two systems that share only superficial visual format and nothing else.
- **Teaching consequence**: the repair requires an explicit **procedural discipline**, not merely a conceptual correction — "say it aloud first, transcribe only what you hear" is a standing habit to be drilled (per the Blueprint's own Component 8 adaptive flag naming this the single most important habit for the whole concept), because the misconception will resurface under time pressure or fatigue even after the underlying idea is understood.
- **Verification of death**: transcribes a word with a length mismatch between letters and symbols in *either direction* (more letters than symbols, as in "knife" → /naɪf/, or, less commonly drilled but equally diagnostic, fewer letters than symbols for a word with an affricate or diphthong compressed into fewer written letters than distinct sound-units) without hesitation or a spelling-based self-correction.

## Analogies

**Best — a universal currency exchange, versus each country's own idiosyncratic paper money.** English spelling is like a national currency with a confusing history — old designs, denominations that don't quite match their stated value, notes that look similar but aren't. IPA is a universal reference currency: one unit, one fixed value, usable to describe the "true worth" of any spoken sound regardless of which language's confusing paper money originally represented it.
*Breaking point*: currency exchange rates are continuous and vary; phoneme-to-symbol mapping in IPA is meant to be a fixed, discrete, one-to-one convention. Don't let the learner think IPA symbols have variable "value."

**Alternative — a universal translator for a specific, narrow purpose (pronunciation only).** IPA doesn't translate meaning, grammar, or spelling — it translates *sound*, precisely and only that, the way a specialised tool does one job extremely well rather than many jobs adequately.
*Breaking point*: "translator" can imply converting between two full languages; IPA converts between spoken sound and written notation within any language, which is a narrower and more specific operation.

**Story analogy — a musician's precise notation versus a hummed approximation.** English spelling is like humming a tune to a friend — recognisable, useful, but imprecise and dependent on shared context to interpret correctly. IPA is like standard musical notation — precise enough that a musician who has never heard the tune before can play it correctly from the page alone.
*Breaking point*: musical notation still requires interpretation (tempo, dynamics, expression) that varies by performer; IPA transcription, for a fixed accent, is meant to leave essentially no interpretive gap. Don't overstate musical notation's precision relative to IPA's.

**Visual analogy — the symbol-to-sound matching game** (Blueprint Component 3), moving explicitly from Latin-resembling symbols to novel ones. Not a metaphor but the actual instrument this concept's early teaching is built around, and it should remain the standing first move whenever a new batch of symbols is introduced.

### ANTI-ANALOGIES (do not use)

- **"IPA is just a more scientific spelling system."** "Spelling system" language invites exactly the letter-count and letter-order assumptions MC-IPA-MATCHES-ENGLISH-SPELLING consists of. IPA is a sound notation, categorically different in purpose from an orthography, even though both happen to use written symbols.
- **"Think of IPA symbols as a secret code for the regular alphabet."** "Code" implies a systematic, reversible letter-for-letter substitution — precisely the wrong model, since IPA symbols map to sounds, not to letters, and the mapping from English spelling to IPA is neither one-to-one nor systematic in the way a substitution code would be.
- **"IPA is like a foreign alphabet you have to learn from scratch, the way you learned the Latin alphabet."** This directly undercuts the concept's core reframe (every symbol names an *already-known* sound) and invites rote memorisation of shapes rather than grounding each symbol in the phoneme classification work already done.

## Demonstrations

Prediction first in every case.

1. **The symbol-to-sound matching game, familiar-then-novel (learner activity).** Blueprint Component 3 — full script there. *Predict first*, for each novel symbol before revealing its sound: "What do you think this symbol might sound like, based on its shape?" — deliberately eliciting the letter-reading-habit guess, so the subsequent correction is against the learner's own stated prediction rather than an abstract warning.
2. **The letter-count collision (teacher-led, learner-resolved).** Blueprint's own conflict evidence for "knife": count letters (5), then transcribe what is actually said (/naɪf/, 4 symbols), and ask directly where the "k" went. *Predict first*: "How many symbols do you think 'knife' will need?"
3. **The homophone reveal (teacher-led, learner-resolved).** *Predict first*: "If I give you the transcription /naɪt/, can you tell me for certain how to spell the word?" Reveal that both "night" and "knight" are valid, correct answers — reframing what might feel like an unresolvable ambiguity as a designed, expected feature.
4. **Bidirectional round-trip (learner activity).** *Predict first*: "If you transcribe a word and then I read your transcription back as sound only, do you think I'll say the same word?" Then have the learner transcribe a word, hand it to a peer or the tutor, and have it read back — directly testing that the notation is round-trip-faithful for sound, even when it loses spelling information.

## Discovery Questions

This is a clear case for **direct instruction on the specific symbol-to-sound mappings** (a closed, conventional inventory with no discoverable internal logic, exactly as with alphabet letter names) **combined with guided discovery on the two structural properties that make IPA worth having at all**: that it is sound-only, and that it is therefore round-trip-consistent regardless of spelling.

1. **Need**: "We have thirty-some different sounds in English and only twenty-six letters, plus a lot of spelling quirks. Is there a way to write down exactly what we hear, no matter how the word is spelled?"
2. **Playground**: transcribe a handful of phonetically regular words freely, using symbols already anchored to known sounds.
3. **Invention**: "Try 'knife.' Sound it out slowly and write down only what you hear." The learner discovers, through their own attempt, that the "k" has nowhere to go.
4. **Collision**: the homophone case — /naɪt/ maps to two different spellings, and the learner must resolve for themselves whether this is a mistake in the system.
5. **Formalization**: name the property — IPA transcribes sound only, discarding spelling entirely, which is exactly why homophones become indistinguishable and why letter-count and symbol-count needn't match.
6. **Compression**: "Say it, don't spell it."

Everything else — which specific symbol represents which specific phoneme — is a fixed convention, surveyed and told via the familiar-then-novel sequence, not discovered.

## Teaching Sequence

The pedagogical logic behind this arc:

- **Latin-resembling symbols before novel ones** (Blueprint's own TA-1/TA-2 ordering). Beginning with symbols that already look like known letters builds confidence in the "symbol names a known sound" framing on low-friction cases before the framing must survive genuinely unfamiliar shapes.
- **The MC-IPA-SYMBOLS-ARE-JUST-FANCY-LETTERS collision belongs specifically during the novel-symbol phase, not before** — the misconception cannot be demonstrated on Latin-resembling symbols, where reading habits happen to produce a correct-looking guess by coincidence (a learner "reading" /p/ using English letter habits gets lucky).
- **Regular-word transcription before mismatch-word transcription** (Blueprint's own TA-3/TA-4 ordering), for the same reason established at several concepts upstream in this batch: the mismatch misconception cannot be usefully demonstrated on a word where spelling and sound happen to roughly agree, because the error produces no visible symptom there.
- **Decoding (symbol-to-word, TA-5) comes last, after encoding (word-to-symbol) is secure** — decoding requires the learner to hold several symbols in mind and reconstruct a spoken output, a genuinely different cognitive direction from encoding, and attempting it before encoding is fluent would conflate two separate sources of difficulty.
- **The homophone-ambiguity property should be surfaced explicitly during or immediately after TA-5**, once the learner has direct, felt experience of decoding producing a valid but not uniquely determined word — introducing it purely as an abstract warning beforehand would be an assertion rather than a discovered, felt property of the system.

Turn-by-turn scripting, protocol routing, and adaptive flags: Blueprint **Component 7 — Session Architecture** and **Component 8 — Adaptive Flags** (in particular the notation-not-new-sounds framing, the transcribe-by-ear standing habit, symbol-chunking for cognitive load, and the S9 prior-IPA-exposure-as-asset flag).

## Tutor Actions

In recommended order, from `../teaching-actions/`:

1. **Matching** (DO) — the core action for symbol-to-sound and sound-to-symbol work, directly building the Blueprint's own anchor activity. Bidirectional diagnostic value is strong here: a learner who matches symbol→sound well but struggles sound→symbol has a retrieval, not a recognition, gap.
2. **Error Analysis** (TEST-THINKING) — the letter-count collision and the homophone reveal both function as guided error analysis, where the "error" under examination is the learner's own reasonable-but-incorrect prediction, made visible through a concrete case rather than asserted by the tutor.
3. **Prediction** (TEST-THINKING) — predicting symbol-count before transcribing, and predicting whether a decoded transcription uniquely determines a spelling, both directly exercising this concept's two structural insights.
4. **Retrieval-Schedule Prompt** (TEST-THINKING) — once a batch of symbols is secure, brief mixed-symbol recognition bursts function as spaced retrieval for what is, at bottom, a moderately large set of arbitrary symbol-to-sound associations layered on top of already-known sounds.

**Does not fit**: **Demonstration** in the sense used at the proprioceptive phonetics concepts upstream — the sounds themselves are already known and do not need re-demonstrating; what's new here is notation, which is a matching/retrieval task, not a physical one. **Game** — moderate chocolate-covered-broccoli risk: a fast symbol-naming game could reward exactly the letter-guessing shortcut MC-IPA-SYMBOLS-ARE-JUST-FANCY-LETTERS consists of if used before the grounding-in-known-sounds work is secure; safe only once individual symbols are independently verified.

## Voice Teaching Notes

This concept is unusual in the phonetics strand: its core evidence is **written** (the transcription itself, and the learner's ability to read it back), with voice functioning as the *verification* channel (saying a word aloud before transcribing it, and reading a transcription aloud to confirm decoding) rather than as the primary evidence, which is the reverse of the pattern at every purely-phonetic concept upstream in this batch. (Channel reality generally: `../foundations/03-voice-first-learning-model.md §7`.)

What the ideal tutor perceives:

- **Silent transcription with no audible sounding-out first.** For a learner still building the transcribe-by-ear habit, this is a warning sign specifically at the mismatch-word stage (TA-4) — a silently-produced transcription for "knife" that happens to be correct may indicate the learner recalled a taught example rather than genuinely transcribing from sound, and should be spot-checked with a genuinely novel mismatch word.
- **Audible sounding-out immediately followed by confident, correct transcription** — the target behaviour, and it should be named and reinforced explicitly ("you said it first, then wrote what you heard — that's exactly right").
- **Hesitation or a visible urge to check spelling** during transcription of a word the learner already knows how to spell conventionally. This is the live signature of residual spelling-attachment (see Why Students Fail, mechanism two) and is worth naming gently rather than only correcting the resulting transcription: "I noticed you paused right when you'd normally think about spelling — for this, we only care what you hear."
- **Fluent, confident reading-aloud of a decoded transcription**, even when the resulting word is unexpected to the learner (a homophone they didn't anticipate) — strong evidence the decoding skill itself is secure and separable from any expectation about which specific word "should" result.

**Load-bearing sentence, delivered slowly**: *"Say it first, and write down only what your ears actually heard — never what your eyes expect to see."*

## Assessment Signals

Item bank: Blueprint **Component 6 — Mastery Probe Set** (MP-1…MP-5). Response-pattern reads, which the Blueprint does not own:

- **Symbol recognition (MP-1, MP-2).**
  - *Fast-correct on a familiar (Latin-resembling) symbol* → unremarkable at this stage; on its own, insufficiently diagnostic of the target skill, since a coincidentally-correct letter-reading guess would look identical.
  - *Fast-correct on a genuinely novel symbol* → strong, specific evidence against MC-IPA-SYMBOLS-ARE-JUST-FANCY-LETTERS, since no letter-reading shortcut could produce a correct guess here.
  - *Wrong, with an answer resembling a Latin-letter reading of the symbol's shape* (e.g., naming /θ/ as resembling "o" or a Greek-letter name) → the misconception's textbook symptom; route to re-grounding the symbol in its already-classified phoneme via the place/manner/voicing system, not to more symbol-matching drill.
- **Transcription, regular word (MP-3).** A correct transcription here is only weak evidence for the target skill, because a regular word's transcription is largely compatible with (though not identical to) a naive spelling-based guess. Do not certify on this item type alone.
- **Transcription, mismatch word (MP-4).** This is the item type that actually discriminates the target skill from a spelling-based shortcut. *Correct, with silent letters or digraphs correctly dropped/merged* → strong positive evidence. *An attempt that includes a symbol for a silent letter, or separate symbols for a digraph representing one sound* → MC-IPA-MATCHES-ENGLISH-SPELLING is live, and the specific error (extra silent-letter symbol vs. un-merged digraph) tells the tutor exactly which half of the habit needs reinforcement.
- **Decoding (MP-5, the homophone item).** *Produces one plausible spelling with no acknowledgment of ambiguity* → the skill is present but the structural insight (sound-only, therefore homophone-blind) is not yet explicit; this is a genuinely different, and lesser, level of mastery than a response that names both valid spellings and explains why the transcription can't distinguish them. Certification requires the latter, not merely a correct single guess.

**Mastery certification trigger**: correct production of the sound for at least one genuinely novel (non-Latin-resembling) symbol; a correct, spelling-independent transcription of a novel word with a genuine mismatch (silent letter or digraph); correct decoding of a novel transcription into fluent speech; and, on a homophone-eligible transcription, an answer that explicitly names the ambiguity rather than committing to a single spelling as if it were uniquely determined. The explicit-ambiguity requirement on the final item is non-negotiable — it is the one piece of evidence that the *structural* insight (sound-only notation), not merely symbol fluency, has landed.

## Tutor Recovery Strategy

Generic engine: `../foundations/01-recovery-engine.md`. Concept-specific notes only:

- **"This just looks like a different alphabet I have to memorise"** — take this protest as a genuine, reasonable read of the surface presentation, not as resistance to correct: the visual format really does resemble "learn a new alphabet," and the response should directly name why that framing, while understandable, is off: "It looks that way, but every single symbol here is a sound you can already make — we're matching new labels to old knowledge, not learning new sounds from zero."
- **"I don't know how to spell it, so I don't know how to write it in IPA"** — the characteristic utterance when residual spelling-attachment blocks a mismatch-word transcription. The correct redirection removes spelling from the task entirely rather than trying to argue the learner out of needing it: "Forget spelling completely for a second. Just say the word out loud to me — now, what did you hear?"
- **The smaller question to shrink to**: from whole-word transcription, down to **naming the sound for a single, already-classified, familiar-shaped symbol** (e.g., /t/). This isolates the symbol-recognition half of the task entirely, with zero transcription or spelling-independence demand, and re-establishes that "a symbol names a known sound" before returning to the harder whole-word task.
- **Never shrink to "just copy the letters you know into IPA-looking symbols."** This would produce a plausible-looking attempt while actively reinforcing the exact spelling-dependence this concept exists to remove.

## Memory Hooks

- **Concept type**: procedure (a bidirectional encoding/decoding skill) layered on top of a moderately large set of fact-like symbol-to-sound associations. The two need different review: the procedure (say-then-transcribe-what-you-hear) is a standing habit to reinforce through use; the symbol set is a paired-associate memory load needing its own spaced retrieval.
- **Review form — the symbols**: spaced retrieval favouring **novel or rarely-drilled symbols over the frequently-practised familiar-shaped set**, matching the equivalent finding at `eng.phonetics.consonant-sounds` — over-reviewing easy, familiar-looking symbols will look like strong retention while leaving the harder, non-Latin-resembling symbols (the ones MC-IPA-SYMBOLS-ARE-JUST-FANCY-LETTERS actually targets) under-practised.
- **Review form — the procedure**: this is best reinforced through genuine use in the three concepts this entry unlocks (`eng.phonetics.minimal-pairs`, `eng.phonetics.syllable-stress`, `eng.phonetics.phonetic-transcription`) rather than through dedicated stand-alone drilling — all three require transcription as a working tool, not as an end in itself, so downstream use is the natural, self-sustaining review mechanism once this concept's initial acquisition is secure.
- **Interleaving partners**: mismatch-word transcription items should be interleaved with regular-word items throughout review (never drilled as a separate, later-introduced-and-then-blocked category), since the discrimination between "trust your ear" and "check if this one happens to be regular" is itself the skill, and blocked practice on mismatch words alone would let the learner adopt "always expect a mismatch" as a new, equally unhelpful default.

## Transfer Connections

- **Near**: `eng.phonetics.minimal-pairs`, `eng.phonetics.syllable-stress`, `eng.phonetics.phonetic-transcription` — all three direct unlocks require IPA as a working notation tool; a learner arriving at any of them without this concept secure would face the added burden of learning notation and new content simultaneously.
- **Far**: dictionary use — most learner's dictionaries provide an IPA (or IPA-like) pronunciation guide, and a learner who can read that guide gains independent access to correct pronunciation for any unfamiliar word, without needing to ask another person.
- **Far**: any future foreign-language study — IPA is language-neutral by design, and a learner who has internalised the notation (rather than merely the English-specific symbol set) can, in principle, use the same tool to represent sounds in a language they are learning next, including sounds English does not use at all.
- **Real-world**: understanding why pronunciation guides in different dictionaries sometimes look slightly different (different transcription conventions or reference accents), and why a word's "correct" pronunciation is sometimes genuinely dialect-dependent rather than singular.
- **Expert transfer**: the durable skill is **using a purpose-built notation system whose rules are internally consistent but visually resemble a more familiar, less rigorous system** — without letting the surface resemblance import the wrong rules. This is the same transfer skill needed for reading chemical formulae (which resemble but do not behave like ordinary algebra), musical notation (which resembles but is not prose), or specialised mathematical notation borrowed from natural language.

## Cross-Subject Connections

KG records no `cross_links`. No genuine subject-matter connection is claimed here, and that is stated explicitly rather than manufactured:

- **This concept's content (a notation convention) does not carry a mechanism-level link to physics, chemistry, biology, or mathematics** the way the preceding four `eng.phonetics.*` concepts in this batch do (see the consolidated finding recorded at `eng.phonetics.consonant-sounds` and `eng.phonetics.vowel-sounds`) — IPA notation is a human convention for recording already-physical phenomena, not itself a description of a physical mechanism, so extending that physics finding to this concept would misattribute the connection. The genuinely transferable content here is a *skill* (learning a rigorous notation that resembles a less rigorous one), not a *subject-matter mechanism*, and it is recorded as such under Transfer Connections above rather than forced into this section.

## Blueprint References

Blueprint exists: `docs/curriculum/blueprints/eng.phonetics.ipa-basics.md`. Reused by reference, **not restated**:

- **Component 1 — Misconception Register**: both misconceptions' trigger signals, conflict evidence, bridge/replacement text, discrimination pairs. This entry adds birth-type classification (both Type 4, notation-induced) and the teaching consequences that follow from type, and identifies this as the fourth occurrence of the notation-induced pattern already seen at `eng.phonics.rhyming` and `eng.phonetics.articulation-organs`.
- **Component 2 — Prerequisite Diagnostic Block**: PD-1 and PD-2 and their fail-routes to `eng.phonetics.consonant-sounds` and `eng.phonetics.vowel-sounds` respectively.
- **Component 3 — Concrete Anchor**: the symbol-to-sound matching game script.
- **Component 4 — Conceptual Development Sequence**: TA-1…TA-5.
- **Component 5 — Worked Examples**: WE-1…WE-3.
- **Component 6 — Mastery Probe Set**: MP-1…MP-5, the item bank. This entry adds only the response-pattern reads.
- **Components 7–8**: session architecture, protocol routing (S0/S1/S6/S9, including the prior-IPA-exposure-as-asset flag), and adaptive flags (notation-not-new-sounds framing, transcribe-by-ear habit, symbol chunking).

## Runtime Asset References

No seeded `AssetIdentity` records exist for this concept as of 2026-08-03. English carries no `HUMAN_CURATOR` authored-seed rows in production; existing English rows are `AI_AUTHORED` live-capture only (CLAUDE.md, AssetIdentity Global Audit). No assets created as part of authoring this entry.

## Curriculum Feedback

- **Notation-induced misconception pattern, fourth occurrence, cross-domain.** Both this concept's misconceptions are Type 4 (notation-induced), and this is now the fourth instance of that specific birth type identified across this program's English authoring (following `eng.phonics.rhyming`'s spelling-induced rhyme errors and `eng.phonetics.articulation-organs`'s diagram-as-territory misconception). Unlike the physics cross-link pattern (confined to the phonetics domain), this pattern spans phonics and phonetics, suggesting notation-induced misconceptions may be a productive general lens for the Curriculum Production Pipeline to apply when reviewing any concept that introduces a new written or symbolic representation.
- **No missing cross-links identified**, in explicit contrast to the four preceding phonetics-domain concepts — recorded so this absence is read as a deliberate finding, not an oversight, given the pattern established immediately upstream in this batch.
- **`unlocks` (3 concepts) is the widest fan-out of any English concept authored so far in this program.** This is accurate and reflects IPA's genuine role as infrastructure for later phonetics work; worth noting only because it means this concept's mastery threshold (0.75) is comparatively consequential — a shaky notation foundation would compound across three downstream concepts rather than one.

## Version History

- v1.0 (2026-08-03): Initial entry. Blueprint reused by reference (Components 1–8). 2 misconceptions classified by birth type (both Type 4, notation-induced), identified as the fourth occurrence of a cross-domain pattern. No missing cross-links found — recorded explicitly given the preceding pattern. Wide-fan-out observation recorded as Curriculum Feedback.
