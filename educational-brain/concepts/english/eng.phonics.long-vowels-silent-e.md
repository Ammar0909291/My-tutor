# Long Vowels and Silent E — `eng.phonics.long-vowels-silent-e`

## Identity

- **KG ID**: `eng.phonics.long-vowels-silent-e`
- **Name**: Long Vowels and Silent E
- **Domain**: English / Phonics
- **Difficulty**: foundational
- **Bloom level**: apply
- **Mastery threshold**: 0.80
- **Estimated hours**: 2
- **Requires**: `eng.phonics.short-vowels` — load-bearing part: the learner must already reliably produce the five short vowel sounds and already hold the boundary-level awareness (established at the prerequisite) that a final silent "e" is a signal worth checking for; this entry takes that detection habit and teaches the full mechanics of what the silent "e" actually does.
- **Unlocks**: `eng.phonics.syllable-types`
- **Cross-links**: (none in the KG)
- **Blueprint**: `docs/curriculum/blueprints/eng.phonics.long-vowels-silent-e.md`

## Learning Objective

The learner can:
1. Read a CVCe (consonant-vowel-consonant-silent e) word correctly, producing the long vowel sound rather than the short one.
2. Predict, before reading, that a word ending in a single consonant plus silent "e" will have a long vowel, based on the spelling pattern alone.
3. Spell a spoken long-vowel word correctly, including the final silent "e," rather than spelling it as if it were a short-vowel CVC word.
4. Recognise a small set of high-frequency exception words (have, give, love, come, some, done) that end in silent "e" but keep the short vowel sound.
5. Read a novel CVCe word within connected text, applying the rule by default while remaining alert to possible exceptions.

## Core Understanding

The final "e" in a word like "cape" is **silent in the sense that it is not itself pronounced, but it is not inert** — it functions as a **signal, acting at a distance, that changes how an earlier letter in the same word is pronounced**. Specifically, a single vowel followed by a single consonant followed by a silent final "e" (the CVCe pattern) signals that the vowel should take its **long sound** — its alphabet name — rather than the short sound the same CVC pattern would produce without the trailing "e" (cap → short /æ/; cape → long /eɪ/). This is a structurally unusual kind of spelling rule for a beginning reader to meet: most phonics patterns learned so far are *local* (a letter or letter-combination determines its own sound, or the sound of an immediately adjacent letter, as with hard/soft c/g), whereas silent-e reaches *across* an intervening consonant to change a vowel that is not adjacent to it. The concept's second structural fact is that this pattern, while genuinely the single most common reason a one-syllable English word ends in "e," is **not universal**: a small, specific, high-frequency set of words (have, give, live, love, come, some, done, and similar) end in silent "e" for a *different* historical reason — largely because English orthography avoids ending written words in the letters "v" or "u" — and these words retain their short vowel sound despite the trailing "e." This exception set is bounded and learnable as a specific list, not a sign that the underlying rule is unreliable.

## Mental Models

**Beginner — "the final e is silent, which means it does nothing."**
The runnable simulation: encountering a word ending in "e," ignore the letter entirely when decoding or omit it entirely when spelling, since it isn't pronounced. This is not tutor-installed — it is a reasonable, literal reading of the word "silent," and it is precisely wrong: this letter is silent in the sense of not being voiced, but it is doing real, distance-acting work.
*Upgrade trigger*: the Blueprint's own conflict evidence — reading "cap" and then "cape" and discovering the vowel sound itself changes, despite the only spelling difference being a letter that isn't even pronounced.
*Shelf-life warning at replacement*: "It's silent because you don't say it out loud — not because it doesn't matter. This particular silent letter has a real job: changing the vowel before it."

**Intermediate — "silent e makes the earlier vowel long, and I check for it before reading any one-syllable word — but I expect this to hold for every word ending in e."**
The simulation: correctly apply the CVCe-signals-long-vowel rule as a default check, having internalised the boundary awareness carried over from `eng.phonics.short-vowels`. This model has correctly generalised the rule and has not yet learned that it has exceptions.
*Upgrade trigger*: the Blueprint's own conflict evidence for the second misconception — applying the rule to "have" and discovering the vowel stays short despite the trailing "e."
*Shelf-life warning*: "This rule is right most of the time — it's the single most common reason a word ends in e. A short, specific list of common words breaks it, and we'll learn exactly which ones."

**Advanced — "CVCe signals a long vowel as the default, strongly reliable pattern; a small, bounded, high-frequency exception list retains the short vowel despite the trailing e; and predicting the vowel sound before reading, then confirming, is a standing habit applied to every new one-syllable word."**
The simulation: given any novel one-syllable word, the learner checks the spelling pattern, predicts long or short accordingly, reads to confirm, and — for a word from the specific known exception list — correctly overrides the default prediction. This is the target model, matching TA-4 and TA-5.
*Upgrade trigger*: `eng.phonics.syllable-types` (the direct unlock), where further syllable categories (open syllables, vowel teams, r-controlled vowels, consonant-le) extend the "syllable structure determines vowel sound" principle well beyond the closed/CVCe contrast this concept establishes as the first, cleanest case.
*Shelf-life warning*: "This is the clearest example of syllable structure changing a vowel sound. There are several more patterns like this, each with its own signal to check for."

**Expert — "the CVCe pattern is one of several historically-motivated syllable-type categories in English orthography (alongside open, vowel-team, r-controlled, and consonant-le syllables), most of which trace to systematic sound changes (notably the Great Vowel Shift) that altered pronunciation while spelling remained comparatively fixed, producing the modern silent-e-as-a-marker convention."**
Named here to mark the arc; the historical account is not required for this concept's mastery, but the advanced learner benefits from knowing the pattern is a genuine linguistic-historical residue, not an arbitrary orthographic quirk.

## Why Students Fail

The dominant failure mechanism is a **literal, entirely reasonable misreading of the word "silent"** — a learner told a letter is silent has been given accurate information (it is not pronounced) that nonetheless invites the false inference that it therefore has no function at all, since in ordinary language "silent" and "irrelevant" are close enough in everyday use that the distinction (silent-but-functional versus silent-and-inert) is not obvious without explicit instruction. This is a further instance of the terminology-precision issue already identified repeatedly in this program, though here the contaminating source is not a technical term's informal double meaning but a perfectly ordinary word ("silent") whose most natural connotation happens to mislead in this specific technical context.

The second mechanism, once the first is resolved, is the identical overcorrection risk already flagged and explicitly designed against at `eng.phonics.short-vowels` and `eng.phonics.consonants`: a rule taught with confidence and then found to have exceptions, if not carefully bounded, risks the learner either abandoning trust in the rule generally (searching for a pattern in the genuinely arbitrary exception list, or doubting the rule on words it correctly governs) or, in the opposite direction, over-applying the rule to the exception words themselves, forcing an incorrect long-vowel reading onto "have" or "love." The Blueprint's own explicit sequencing (exceptions taught only after the core rule is secure, per Component 8) is the direct, designed response to this now-familiar risk.

The third mechanism, more subtle, is that this concept requires the learner to check something at the **far end of a word** in order to correctly pronounce something near its **beginning** — a genuinely unusual reading direction compared to every phonics pattern encountered so far in this curriculum, all of which have determined a sound from information at or immediately adjacent to that same sound's own position. A learner whose reading strategy has, until now, been purely left-to-right and local may need explicit encouragement to develop the habit of glancing ahead to the word's end before committing to the vowel sound — this is a strategic, not merely conceptual, adjustment.

## Misconceptions

The Blueprint's **Component 1 — Misconception Register** owns the trigger signals, conflict evidence, bridge/replacement text, and discrimination pairs for both entries below. Reused by reference; birth-type classification and teaching consequence added here.

### MC-SILENT-E-DOES-NOTHING
*(Blueprint Component 1, MC-SILENT-E-DOES-NOTHING — includes the cap/cape and kit/kite discrimination pairs.)*
- **Birth type**: Type 3 (language contamination) — the everyday connotation of "silent" (absent, irrelevant, having no effect) contaminates the technical meaning intended here (not itself pronounced, but functionally active), a further instance of the terminology-precision pattern recurring throughout this program, distinct from the category-label contamination cases (`eng.phonics.sight-words`) in that the contaminating word here is a plain descriptive adjective rather than a compound technical term.
- **Teaching consequence of the birth type**: because the contaminating association comes from the word "silent" itself, the repair benefits from **explicitly naming and defeating the ambiguity directly**, exactly as the Blueprint's own bridge text does ("it's silent, but not meaningless") — a purely functional demonstration (cap/cape) without also naming *why* the confusion is natural in the first place leaves the underlying terminological trap available to resurface with a different silent letter later (as it will, in a milder form, at the silent-letter exceptions already flagged at `eng.phonics.consonants`).
- **Verification of death**: given a novel word ending in silent "e" that the learner has not previously encountered, the learner correctly predicts and produces the long vowel sound *before* being prompted to check for the "e," rather than defaulting to a short-vowel reading and only correcting after an explicit reminder.

### MC-ANY-E-AT-THE-END-MEANS-LONG-VOWEL
*(Blueprint Component 1, MC-ANY-E-AT-THE-END-MEANS-LONG-VOWEL — includes the cake/have and hope/love discrimination pairs.)*
- **Birth type**: Type 1 (overgeneralization), of a genuinely correct and valuable default rule to a small set of words where a different, unrelated historical spelling convention happens to produce the identical surface pattern (ending in silent e) without the corresponding sound change.
- **Teaching consequence**: because the source rule is correct for the overwhelming majority of cases, the repair must **not** undermine confidence in the rule generally — the Blueprint's own s6_path does this correctly, explicitly framing the exceptions as "a short, learnable list," and Component 8's adaptive flag correctly specifies these exceptions must be introduced only *after* the core rule (TA-1 through TA-3) is independently secure, never simultaneously, to avoid exactly this overcorrection.
- **Verification of death**: given a mixed set including both regular CVCe words and known exception words, the learner correctly applies the long-vowel rule by default to the regular items *and* correctly recognises each exception item as a specific, memorised departure — critically, without any loss of confidence or hesitation on the regular items in the same set, which would indicate the exceptions have destabilised trust in the rule rather than being cleanly filed alongside it.

## Analogies

**Best — a remote control that changes the channel on a TV across the room, even though the remote itself makes no sound.** The remote (silent e) doesn't itself produce the picture or sound you're watching, but it directly causes a change (the vowel switching from short to long) in something else, at a distance, without itself being the thing you perceive directly. This captures the "silent but causally active" property precisely.
*Breaking point*: a remote control's effect is instantaneous and doesn't depend on anything about the specific letters in between; the silent-e pattern specifically requires exactly one intervening consonant (CVCe) to work as expected — don't let the learner think silent e "reaches" indefinitely far or through any number of letters.
- **Best-for-exceptions — a rule with a small, named list of grandfathered exceptions, like a building code that applies to all new construction but doesn't retroactively force changes on a short list of older, already-standing buildings.** The rule is real and applies going forward/by default; a small, specific, named set of pre-existing cases is exempted for a separate historical reason, not because the rule itself is unreliable.
*Breaking point*: building-code exemptions are usually explicitly documented and easy to look up; the silent-e exception words must simply be memorised as a list, with no equivalent lookup mechanism — useful for the *concept* of a bounded, principled exemption, not for implying the learner has an external reference to consult.

**Alternative — a light switch on one side of a room that controls a lamp on the other side.** Flipping the switch (adding the silent e) doesn't itself light up (isn't itself pronounced), but it directly changes the state of something else across the room (the vowel's sound).
*Breaking point*: a light switch's effect is binary and immediate with no exceptions; useful mainly for the core mechanism, not for the exception-list half of this concept.

**Story analogy — a secret signal passed backward through a chain of people, changing what the person at the front does, even though the signal itself is silent.** Person C (silent e) passes a silent nudge to Person B (the intervening consonant), which changes what Person A (the vowel) does — the nudge itself makes no sound, but its effect is real and traceable back through the chain.
*Breaking point*: none serious; a reasonably close mapping to the distance-acting-signal property.

**Visual analogy — the magic-e wand** (Blueprint Component 3): physically adding an "e" to "cap" with a drawn arrow connecting it back to the vowel, narrated as "the e reaches back and changes the vowel's sound." Not a metaphor but the actual working instrument this concept's core teaching is organised around, and it directly visualises the distance-acting, cross-consonant mechanism this concept's Core Understanding identifies as structurally unusual.

### ANTI-ANALOGIES (do not use)

- **"The e is like a ghost — it's there but you can't see or hear it."** "Ghost" language, while popular in some phonics materials, emphasises invisibility and absence rather than function, and risks reinforcing exactly the "therefore irrelevant" inference MC-SILENT-E-DOES-NOTHING consists of — a ghost, in most everyday framing, doesn't *do* anything to the physical world; this concept's entire point is that the silent e does.
- **"Every word ending in e follows the magic-e rule."** Directly installs the second misconception by overstating the rule's universality before the exception list has even been introduced — even as an initial simplification "for now," this framing will need active unlearning rather than mere supplementing once exceptions are introduced.
- **"The exceptions are just weird words you have to accept."** Frames the exception list as arbitrary and unexplainable rather than as a genuine, bounded, historically-motivated category — while the full historical account (Expert model) is beyond this concept's scope, "weird" language invites the same rule-distrust overcorrection the Blueprint's own s6_path is specifically designed to prevent.

## Demonstrations

Prediction first in every case.

1. **The magic-e wand (learner activity).** Blueprint Component 3 — full script there. *Predict first*, before the "e" is added: "If I add an 'e' to the end of 'cap,' what do you think will happen to how it sounds?"
2. **The cap/cape minimal-pair collision (teacher-led, learner-resolved).** Blueprint's own conflict evidence. *Predict first*: "These two words differ by just one silent letter — do you think that one letter changes anything?" Then read both aloud together.
3. **The prediction-before-reading task (learner activity, TA-2).** *Predict first*, for a genuinely new word: "Before you read this out loud, look at the spelling — long vowel or short? Why?" Confirming or disconfirming the stated prediction, rather than the eventual reading alone, is the actual target behaviour.
4. **The have/love exception reveal (teacher-led, learner-resolved).** Blueprint's own conflict evidence for the second misconception. *Predict first*: "Based on the rule, what vowel sound do you expect in 'have'? Now say it naturally — does it match?"

## Discovery Questions

This concept splits cleanly, following the now-established pattern for rule-plus-exception content in this batch: **the CVCe-signals-long-vowel mechanism is genuinely well suited to guided discovery**, since the evidence (a systematic, felt sound change tied to a specific, visible spelling feature) is directly available from a handful of contrastive examples; **the specific exception list is a fixed, bounded, historically-arbitrary set, told directly**, exactly as with silent consonant letters at `eng.phonics.consonants` — there is nothing for the learner to discover about *why* "have" resists the rule beyond "it's one of a short list to simply learn."

1. **Need**: "Does adding a letter that isn't even pronounced actually change anything about how a word sounds?"
2. **Playground**: the learner examines several CVC/CVCe minimal pairs (cap/cape, kit/kite, hop/hope) freely, reading each pair aloud.
3. **Invention**: "What's the pattern? What does the silent e seem to be doing every time?" The learner articulates, in their own words, that the earlier vowel changes to its long sound whenever the trailing "e" is present.
4. **Collision**: introduce "have" — does the pattern the learner just extracted hold here too? It does not, and this collision motivates the exception list as a genuine, separately-necessary addition rather than an arbitrary imposition.
5. **Formalization**: name the rule (CVCe → long vowel) and name the bounded exception category (a short list of common words that keep the short vowel despite the trailing e, for a different spelling reason).
6. **Compression**: "See an e at the end, after one consonant and one vowel? Expect the vowel to say its name — unless it's one of the few you've learned by heart that don't."

## Teaching Sequence

The pedagogical logic behind this arc:

- **Minimal-pair contrast (TA-1) comes before prediction practice (TA-2), which comes before spelling application (TA-3)** — the Blueprint sequences perception (hearing the contrast) before prospective application (predicting from spelling before reading) before productive application (spelling from sound), moving the skill through increasingly demanding directions of use, each building on the previous.
- **The exception list (TA-4) is deliberately sequenced after the core rule (TA-1 through TA-3) is independently secure, never simultaneously** — this is the Blueprint's own explicit, load-bearing design decision (Component 8's adaptive flag), and it is the direct, designed response to the overcorrection risk established under Why Students Fail: introducing exceptions before the rule itself is trusted would risk the learner concluding the whole pattern is unreliable before ever experiencing its genuine, high reliability on the majority of cases.
- **Novel-word reading in connected text (TA-5) comes last** and deliberately requires the learner to apply *both* halves at once — defaulting to the rule while remaining alert for a possible exception — which is a genuinely harder integration task than either half alone, and appropriately reserved for the concept's culminating stage.
- **The predict-before-reading habit, established in TA-2, is explicitly intended to become a standing decoding practice extending well beyond this concept** (per Component 8's own flag) — this concept is not merely teaching one specific pattern but installing a general strategic habit (check the spelling structure before committing to a sound) that the downstream `eng.phonics.syllable-types` concept will need as a foundation for its further, more numerous syllable-type categories.

Turn-by-turn scripting, protocol routing, and adaptive flags: Blueprint **Component 7 — Session Architecture** and **Component 8 — Adaptive Flags** (in particular the active-silent-e framing, the exceptions-after-the-rule sequencing rule, the predict-before-reading standing-habit goal, and the S9 allowance for learners from consistently phonetic L1 orthographies).

## Tutor Actions

In recommended order, from `../teaching-actions/`:

1. **Demonstration** (SHOW) — the magic-e wand and the cap/cape and have/love contrasts, all benefiting from being heard aloud, with the wand demonstration ideally involving the learner physically adding the "e" themselves rather than only watching.
2. **Prediction** (TEST-THINKING) — the predict-before-reading task (TA-2) is the load-bearing action for this entire concept, converting the CVCe pattern from a fact recalled after the fact into a genuinely prospective, checkable strategy applied before decoding.
3. **Matching** (DO) — CVC/CVCe minimal pairs to their respective vowel sounds, and spoken long-vowel words to their correctly-spelled (silent-e-included) written forms (TA-3).
4. **Error Analysis** (TEST-THINKING) — presenting a word decoded with the wrong vowel length (either a short-vowel misreading of a genuine CVCe word, or a forced long-vowel misreading of an exception word) as a hypothetical error to identify and correct, directly practising both misconceptions' discrimination.
5. **Concept Map** (ORGANIZE) — a simple two-column sort (follows the rule / known exception) built from a mixed word set, giving a compact artefact that keeps the two categories visually and conceptually distinct throughout review.

**Does not fit**: **Worked Example** in the multi-step derivation sense — the "rule" here is a single spelling-pattern check, better practised through Prediction than walked through as a procedure with several steps. **Role-Play** — no interpersonal content.

## Voice Teaching Notes

This concept's core evidence is a mix of **visual** (the spelling pattern itself — is a final "e" present, and how many letters precede it) and **audio** (the resulting vowel sound), making it structurally similar to `eng.phonics.consonants`' hard/soft c/g concept: a visual check step feeding into an audio production outcome, with the learner's spoken output as the primary evidence for whether the check was correctly applied.

What the ideal tutor perceives:

- **A short-vowel production on a genuine CVCe word, delivered with no apparent hesitation or checking.** The direct auditory signature of MC-SILENT-E-DOES-NOTHING — the final "e" was present in print but evidently not attended to before the vowel sound was committed to.
- **A brief pause at the end of a word, specifically before the vowel sound is produced**, followed by a correct long-vowel reading. Positive: this is the predict-before-reading check taking real, brief time, exactly the target strategic habit, and should be named and reinforced as such.
- **A forced, unnatural-sounding long-vowel attempt on a known exception word** (attempting to make "have" rhyme with "cave," producing something like "hayv"). The direct auditory signature of MC-ANY-E-AT-THE-END-MEANS-LONG-VOWEL, and it is often accompanied by visible effort or a corrected restart, since the resulting sound genuinely doesn't match any word the learner has actually heard used.
- **Confident, immediate, correct short-vowel production on an exception word, with no forced long-vowel attempt at all.** The target state for the exception-list half of this concept, and it should be distinguished from mere lucky familiarity by occasionally following up with "is that one following the rule, or is it one of the special ones you've learned?"

**Load-bearing sentence, delivered slowly**: *"Check the end before you commit to the vowel — a silent e there usually means say the vowel's name, unless it's one of the words you've learned that don't."*

## Assessment Signals

Item bank: Blueprint **Component 6 — Mastery Probe Set** (MP-1…MP-5). Response-pattern reads, which the Blueprint does not own:

- **Minimal pair (MP-1).** *Correct, with the vowel-length contrast clearly and confidently produced* → strong basic evidence. This item type carries relatively less diagnostic weight than the prediction item below, since a learner could in principle produce the correct sounds for two already-familiar words without the general checking habit having generalised.
- **Prediction before reading (MP-2).** This is this concept's most diagnostic single item type, precisely because it separates the *prospective* application of the rule (predicting before seeing the outcome) from mere post-hoc correct reading — a learner who reads a word correctly but cannot or does not predict its vowel length beforehand has not yet built the standing habit this concept aims to install, even if their eventual reading is accurate.
- **Spelling application (MP-3).** *Correctly includes the final silent e* → strong evidence the rule operates productively (sound-to-spelling), not merely receptively (spelling-to-sound) — this is a genuinely harder direction, matching the recognition-before-generation principle established throughout this batch, and should not be assumed to follow automatically from reading success alone.
- **Exception identification (MP-4).** *Correctly identifies the word as an exception and explains why (i.e., that the vowel stays short despite the trailing e)* → the full target evidence. *Correctly reads the word but cannot articulate that it is an exception when asked* → partial evidence; the specific pronunciation is known (likely from prior sight-word-style exposure, connecting back to `eng.phonics.sight-words`) but the *categorisation* relative to the rule has not yet been made explicit, which matters for whether the learner will correctly generalise the exception-list strategy to a genuinely novel exception word later.
- **Explanation (MP-5).** Listen for whether the explanation states both halves — that silent e usually signals a long vowel, *and* that a small set of common words are exceptions to watch for — a response naming only one half has an incomplete model, mirroring the equivalent two-part-explanation requirement already established at `eng.phonics.consonants` and `eng.phonics.short-vowels`.

**Mastery certification trigger**: correct minimal-pair vowel-length production; a stated, correct prediction (not merely a correct eventual reading) on a novel CVCe word; correct spelling of a novel long-vowel word including the silent e; correct identification and explanation of a known exception word as an exception rather than a rule-follower; and an explanation naming both the default rule and the bounded exception category. The stated-prediction requirement on the second item is essential, per the diagnostic reasoning given above — it is the one piece of evidence distinguishing prospective rule application from lucky or memorised correct reading.

## Tutor Recovery Strategy

Generic engine: `../foundations/01-recovery-engine.md`. Concept-specific notes only:

- **"But you said it's silent — how can it change anything if you don't even say it?"** — a genuine, reasonable logical objection given the term's everyday meaning, and it deserves a direct, respectful answer rather than only a repeated demonstration: "You're using the word exactly right — it really isn't pronounced. It just also happens to change something else, which is a strange, unusual thing for a silent letter to do. That's exactly why this one's worth learning carefully."
- **"I thought we just learned the rule, now there are exceptions already?"** — the characteristic frustration when the exception list is first introduced, and it should be met with the specific, bounded framing established throughout this batch's rule-plus-exception concepts, not with a general reassurance alone: name the actual size of the list ("just a handful of common words — have, give, love, some, come, done — that's most of them") and note explicitly that the rule remains reliable everywhere else.
- **The smaller question to shrink to**: from full prediction-and-reading or spelling, down to **the magic-e wand demonstration on a single, maximally familiar pair, with the tutor adding the "e" and asking only "does the sound change, yes or no?"** This removes the prediction, spelling, and exception-recognition demands entirely, isolating the most basic perceptual fact (silent e changes the vowel) before returning to the harder combined tasks.
- **Never shrink to "just sound it out letter by letter and see what comes out."** For a CVCe word, this risks producing the short-vowel reading directly (since a purely sequential, letter-by-letter strategy has no natural mechanism for looking ahead to the final "e" before committing to the vowel), reinforcing rather than repairing the core difficulty.

## Memory Hooks

- **Concept type**: rule-application skill (a spelling-pattern-to-sound signal, checked prospectively) plus a small **bounded exception list** requiring targeted memorisation, closely paralleling the dual structure already established at `eng.phonics.consonants` (hard/soft c/g rule plus silent-letter list) and `eng.phonics.short-vowels` (closed-syllable rule plus the boundary-awareness this concept now completes).
- **Review form — the core rule**: review specifically using **novel CVCe words the learner has not previously predicted on**, with the prediction step itself, not merely the eventual reading, as the reviewed behaviour — reviewing only final reading accuracy risks missing a quiet reversion to post-hoc guessing rather than genuine prospective prediction.
- **Review form — the exception list**: ordinary spaced recall of the specific words, since, as with silent consonant letters, there is no rule to keep exercising here, only a fixed list to retain.
- **Interleaving partners**: rule-following CVCe words and known exception words should always be interleaved together in review, never blocked into separate sessions, mirroring the interleaving rationale already established at every rule-plus-exception concept in this program — the actual target skill is the *decision* of which category a given word belongs to, which blocked practice cannot exercise. This concept's items should also be interleaved with `eng.phonics.short-vowels`' closed-syllable items, since the core discrimination both concepts jointly build (closed syllable → short vowel; CVCe → long vowel) is a single, unified checking habit that should not be allowed to fragment into two separately-cued skills.

## Transfer Connections

- **Near**: `eng.phonics.syllable-types` — the direct unlock, generalising the "syllable structure, not syllable count, determines vowel sound" principle this concept and its own prerequisite jointly establish to several further syllable categories (open, vowel-team, r-controlled, consonant-le).
- **Far**: `eng.writing.spelling-strategies` — a learner who correctly understands *why* silent e is added (to signal vowel length) rather than merely *that* certain words happen to have one has a genuine predictive spelling tool, not merely a memorised list, extending the same "understanding the rule enables spelling, not just reading" transfer already established at `eng.phonics.consonants`' hard/soft c/g rule.
- **Real-world**: understanding common spelling confusions in casual or informal writing (e.g., a learner or even an adult writer occasionally omitting a silent e in quick, informal text — "hop" for "hope" — and recognising this as a specific, nameable, correctable pattern rather than a general spelling weakness).
- **Expert transfer**: the durable skill is **checking for a signal located at a distance from the thing it affects, rather than assuming all relevant information is local** — the same reading strategy needed for many more advanced orthographic and grammatical patterns in English (a word's ending affecting a stem's pronunciation or spelling elsewhere, as in "hoping" vs. "hopping"), and a genuinely general strategic habit (look ahead before committing) applicable well beyond spelling, in any task where an early decision should be informed by information appearing later in a sequence.

## Cross-Subject Connections

KG records no `cross_links`. Honest assessment, consistent with the other phonics-domain (as opposed to phonetics-domain) concepts in this batch: this concept's cross-subject reach is limited.

- **No genuine mechanism-level connection to mathematics, physics, chemistry, or biology.** This concept's content (a historically-motivated English spelling convention) does not describe a physical mechanism — stated explicitly, following the established practice for this category of concept in this program.
- **A structural parallel to "look ahead before committing" exists broadly in procedural and mathematical reasoning** (see Transfer Connections' expert-transfer note) — a genuine reasoning-skill transfer, not a KG-encodable subject-matter link.

## Blueprint References

Blueprint exists: `docs/curriculum/blueprints/eng.phonics.long-vowels-silent-e.md`. Reused by reference, **not restated**:

- **Component 1 — Misconception Register**: both misconceptions' trigger signals, conflict evidence, bridge/replacement text, discrimination pairs. This entry adds birth-type classification and the teaching consequences that follow from type, identifying the first misconception as a further instance of the terminology-precision pattern recurring throughout this program.
- **Component 2 — Prerequisite Diagnostic Block**: PD-1 and its fail-route to `eng.phonics.short-vowels`.
- **Component 3 — Concrete Anchor**: the magic-e wand script.
- **Component 4 — Conceptual Development Sequence**: TA-1…TA-5, including the deliberate exceptions-after-the-rule sequencing.
- **Component 5 — Worked Examples**: WE-1…WE-3.
- **Component 6 — Mastery Probe Set**: MP-1…MP-5, the item bank. This entry adds only the response-pattern reads.
- **Components 7–8**: session architecture, protocol routing (S0/S1/S6/S9, including the novel-orthographic-convention allowance for consistently-phonetic-L1 learners), and adaptive flags (active-silent-e framing, exceptions-after-the-rule, predict-before-reading standing habit).

## Runtime Asset References

No seeded `AssetIdentity` records exist for this concept as of 2026-08-03. English carries no `HUMAN_CURATOR` authored-seed rows in production; existing English rows are `AI_AUTHORED` live-capture only (CLAUDE.md, AssetIdentity Global Audit). No assets created as part of authoring this entry.

## Curriculum Feedback

- **No missing cross-links identified**, consistent with the other phonics-domain concepts in this batch — this concept's content is a historically-motivated spelling convention rather than a physical mechanism.
- **Terminology-precision pattern, further instance, distinct source.** The first misconception extends the recurring pattern already identified at several concepts in this program, but is worth distinguishing in the Pipeline's eventual audit as arising from an ordinary descriptive word ("silent") rather than a technical or compound term — a broader category of contaminating source than previously catalogued, suggesting the audit should consider plain vocabulary choices, not only specialised terminology.
- **The exceptions-after-the-rule sequencing principle, now confirmed at a third concept** (following `eng.phonics.consonants`' silent letters and `eng.phonics.short-vowels`' silent-e boundary-awareness), is a well-established, recurring, and apparently reliable design pattern across this batch's rule-plus-exception phonics concepts — worth formalising as explicit general authoring guidance for the Curriculum Production Pipeline, rather than continuing to be independently rediscovered concept by concept.

## Version History

- v1.0 (2026-08-03): Initial entry. Blueprint reused by reference (Components 1–8). 2 misconceptions classified by birth type; the first identified as a further terminology-precision instance with a distinct contaminating source (plain vocabulary rather than technical terminology). No missing cross-links found — recorded explicitly. Exceptions-after-the-rule pattern confirmed at a third concept and recommended for formalisation as general Pipeline authoring guidance.

