# Rhyming — `eng.phonics.rhyming`

## Identity

- **KG ID**: `eng.phonics.rhyming`
- **Name**: Rhyming
- **Domain**: English / Phonics
- **Difficulty**: foundational
- **Bloom level**: remember
- **Mastery threshold**: 0.80
- **Estimated hours**: 1
- **Requires**: `eng.phonics.phonemic-awareness` — load-bearing part: the learner must be able to hold a word in mind *as sound* and attend to a part of it. Rhyming does not require full segmentation; it requires the weaker ability to notice that a word has an inside.
- **Unlocks**: `eng.phonics.blending-segmenting`
- **Cross-links**: (none in the KG)
- **Blueprint**: `docs/curriculum/blueprints/eng.phonics.rhyming.md`

## Learning Objective

The learner can:
1. Pick the non-rhyming word from a spoken set of three, with the odd word in any position.
2. Generate three or more words rhyming with a given word (real or nonsense words both count).
3. Judge a rhyme correctly when the spelling is misleading in either direction ("bear/chair" true, "love/move" false).
4. Distinguish rhyme (ending match) from alliteration (beginning match) and name which is which.
5. State the checking rule in their own words without referring to letters.

## Core Understanding

Rhyme is a **partial-match judgement over the sound structure of a word**, and its real content is that words have *internal parts you can compare*. Technically: two words rhyme when their **rimes** match — the rime being the vowel of the stressed syllable plus everything after it (*c-at* / *h-at* share the rime /-æt/). The part before, the **onset**, is irrelevant. That onset/rime split is the actual discovery, and it is the reason this tiny-looking concept is a genuine prerequisite for decoding: a learner who can hear "cat" as /k/ + /-æt/ has performed their first decomposition of a word, and every later phonics skill is a refinement of that move. Three things follow. Rhyme is **auditory and dialect-relative** — spelling is not evidence, and pairs that rhyme in one accent may not in another (*bath/hearth*, *pour/poor*), so the tutor's own accent is the reference frame and must be treated as such rather than as universal truth. Rhyme is **coarser than phoneme awareness**, which is why it comes first developmentally: matching a whole chunk is far easier than isolating a single sound. And rhyme is **not the same as a shared ending sound** — "cat" and "hit" both end in /t/ and do not rhyme, because the vowel is part of the rime.

## Mental Models

**Beginner — "rhyming words sound the same."**
The runnable simulation: say both words, ask "do they sound similar?", answer by overall impression. This is imprecise rather than wrong, and it produces the classic confusions — it accepts *cat/cup* (shared onset), it accepts *cat/hit* (shared final consonant), and it is very hard to argue with because the learner's evidence really is a genuine similarity.
*Upgrade trigger*: a pair the learner accepts as rhyming that the tutor rejects, forcing "same how?"
*Shelf-life warning*: "Sounding similar is a good first clue. We're going to get fussier about *where* they're similar."

**Intermediate — "check the end."**
The simulation: mentally chop the word and compare only the last chunk. This is the workhorse model and it is correct for almost all cases. It has one real failure: "end" is vague, so the learner may compare the final *consonant* rather than the vowel-plus-consonant, accepting *cat/hit*.
*Upgrade trigger*: exactly that pair — *"do 'cat' and 'hit' rhyme? They both end in /t/."*
*Shelf-life warning*: "The end means from the vowel onwards — not just the very last sound."

**Advanced — "onset and rime."**
The simulation: the learner splits a word at the vowel and can name both parts. This is the model that transfers to decoding, to word families, and to spelling by analogy.
*Upgrade trigger*: multi-syllable words, where rime is defined on the *stressed* syllable.
*Shelf-life warning*: "For longer words we listen to the strong beat and rhyme from there."

**Expert — "rhyme is one of several sound-patterning devices, and it is dialect-relative."**
The learner holds rhyme alongside alliteration, assonance and consonance as a family of partial-match relations, and understands that a poet's rhymes are evidence about that poet's accent. This is `eng.literature.*` territory and is named here only to show the arc.

## Why Students Fail

The dominant mechanism is **under-specification, not inability**. "Rhyme" is taught as "sounds the same at the end", and both "sounds the same" and "the end" are vague enough to license the wrong answer. A learner pairing *sun/sit* is not failing to hear; they are applying a rule that was genuinely ambiguous as delivered. The second mechanism is **print interference**, and it arrives on a schedule: learners who meet rhyming *before* reading rarely make spelling-based errors, and the same learners start making them a few months into letter instruction. That timing is diagnostic — a spelling-driven rhyme error is a sign the learner is *progressing* in print and needs the ear/eye split reasserted, not a sign of regression. Third, and least discussed: some rhyme judgements are genuinely accent-dependent, and a learner marked wrong for a correct judgement in their own dialect learns that their ear cannot be trusted. That is an expensive lesson to install for a concept whose entire method is "trust your ear."

## Misconceptions

The Blueprint's **Component 1 — Misconception Register** owns the trigger signals, conflict evidence, bridge/replacement text, and discrimination pairs for both. Reused by reference; birth typing and consequences added.

### MC-SPELLING-MUST-MATCH
*(Blueprint Component 1, MC-SPELLING-MUST-MATCH — includes the *love/move* and *bear/chair* discrimination pairs.)*
- **Birth type**: Type 4 (notation-induced). The written form is a notation for the word, and the learner reasons *from the notation* instead of from the thing notated — the same failure shape as reading a graph's gridlines as data. It is not caused by bad teaching of rhyme; it is caused by the arrival of print.
- **Teaching consequence of the birth type**: notation-induced misconceptions are repaired by **removing the notation**, not by arguing with it. Run every rhyme judgement with eyes closed or with no print present during repair. Attempting to fix this while the words are visible pits the learner's ear against a written form sitting right in front of them, and the written form wins.
- **Timing note**: this misconception is *absent* before print instruction and appears afterwards. Its appearance is expected and should be pre-empted with a standing rule ("we always judge rhyme with our ears") installed *before* letters arrive, not after.
- **Verification of death**: correct on both directions of the trap — rejects *love/move* (looks alike, isn't) **and** accepts *bear/chair* (looks different, is). One direction alone is passable with a "spelling is a trick" heuristic that is itself a misconception.

### MC-FIRST-SOUND-IS-ENOUGH
*(Blueprint Component 1, MC-FIRST-SOUND-IS-ENOUGH.)*
- **Birth type**: Type 5 (instruction-induced). Early literacy teaches initial-sound attention *heavily and first* — "what does your name start with?" is often a learner's first ever phonological task. The learner correctly infers that the front of the word is the interesting part, and applies it here.
- **Teaching consequence**: because it comes from a genuinely useful prior skill, do not suppress initial-sound attention. Name the two skills as two named things — this is *rhyme* (ends), that is *alliteration* (beginnings) — and give the learner both labels. Type-5 misconceptions born of over-taught prior skills die when the prior skill is given its own boundary, not when it is discouraged.
- **Verification of death**: given a mixed set, the learner sorts into three piles — rhyme, alliteration, neither — unprompted. Two-pile sorting can be passed by elimination.

### MC-FINAL-CONSONANT-IS-THE-RIME (not in the Blueprint — new)
- **Birth type**: Type 1 (overgeneralization), from the tutor's own instruction "check the end." The learner takes "the end" at its most literal and compares only the final sound.
- **Symptom / characteristic phrase**: accepts *cat/hit*, *dog/pig*, *sun/man* — always pairs sharing a final consonant with different vowels. Phrase: *"they both end in a /t/."*
- **Detection probe (verbatim)**: *"Do 'cat' and 'hit' rhyme? Say them both out loud first."* A learner with the intermediate model as stated will say yes, confidently and quickly.
- **Recovery path**: do not correct the answer — correct the *rule*. "You did exactly what I said: you checked the end. I said it wrong. The end means from the vowel — the 'a' in cat, the 'i' in hit. Try again with that." Owning the imprecision is not politeness here; it protects the learner's willingness to apply rules literally, which is a habit worth keeping.
- **Verification of death**: rejects *cat/hit* **and** still accepts *cat/hat*, on the same run.

## Analogies

**Best — the family name.** Rhyming words are a family: *cat, hat, mat, sat* all share the family name *-at*, and the different first sounds are their first names. This is the strongest analogy available because it survives all the way to word families in decoding and spelling-by-analogy — the same structure the learner meets again with a different label.
*Breaking point*: families are closed and rhyme sets are open (nonsense words join freely). Say so; it is actually a useful licence for generation tasks.

**Alternative — matching train carriages.** Each word is a little train; rhyming words have the same back carriage.
*Breaking point*: it implies one carriage = one sound, so it will license MC-FINAL-CONSONANT-IS-THE-RIME. Use only if the "back carriage" is explicitly demonstrated as vowel-plus-ending.

**Story analogy — songs and nursery rhymes.** Most learners arrive already holding hundreds of rhymes in memory from songs; the concept is nearly always *naming something they already do*, not teaching something new. Opening by having the learner supply the missing rhyme in a song they know is the single fastest route into the concept.
*Breaking point*: none. Underused.

**Visual analogy — the chip line with the last two chips highlighted.** Connects forward to `eng.phonics.blending-segmenting`'s chip anchor, which is deliberate: the same physical representation should carry across both concepts.

### ANTI-ANALOGIES (do not use)

- **"Rhyming words look the same at the end."** Directly installs MC-SPELLING-MUST-MATCH. It is also the most commonly used explanation of rhyme in print materials, so expect the learner to have met it already.
- **"Rhyming words end with the same letter."** Worse — installs both MC-SPELLING-MUST-MATCH and MC-FINAL-CONSONANT-IS-THE-RIME at once.
- **"Rhyming words go together / belong together."** Vague enough to license *cat/kitten*, *dog/bone* — semantic association. Rare but genuinely appears in very young learners, and this phrasing is what causes it.

## Demonstrations

Prediction first in every case.

1. **The missing rhyme (learner activity).** *Predict first*: recite a known nursery rhyme and stop before the rhyming word. The learner supplies it involuntarily. Then name what they just did: "You already know how to do this. We're just going to learn what it's called and how to check it."
2. **Odd-one-out by ear (learner activity).** Blueprint Component 3 anchor — full script there. *Predict first* on the set before saying it slowly.
3. **The spelling trap, both directions (teacher demo).** *Predict first*: "Do these two rhyme?" for *love/move* (written, visible) and separately for *bear/chair*. Then say each pair aloud. Running both directions in the same demonstration is what prevents the "spelling is always a lie" over-correction.
4. **The nonsense-word licence (learner activity).** *Predict first*: "Is *zat* a rhyme for *cat*, even though it isn't a word?" Learners often say no. Establishing yes matters: it proves the judgement is about sound alone, and it makes generation tasks unfailable.

## Discovery Questions

Guided discovery wins here, decisively — the learner already possesses hundreds of rhymes from songs, so the concept exists in them and needs *naming*, not installing. Direct instruction wastes an unusually strong prior.

1. **Need**: stop a familiar rhyme one word short. The learner completes it. "How did you know which word came next? I didn't tell you."
2. **Playground**: "Give me as many words as you can that could have gone there." Free generation, nonsense allowed.
3. **Invention**: "What do all your words have in common? Where exactly are they the same?" The learner articulates the ending match — this is the invention, and they do it themselves.
4. **Collision**: offer *sun / sit*. "These are the same too — same first sound. Do they rhyme?" The learner must now sharpen their own rule from "the same somewhere" to "the same at the end."
5. **Second collision** (only if the intermediate model is stated as "the last sound"): offer *cat / hit*.
6. **Formalization**: name it. *Rhyme* = ends match from the vowel; *alliteration* = beginnings match. Both get a name; neither is the wrong one.
7. **Compression**: "Rhyme lives at the back of the word — and you listen for it, you never look for it."

## Teaching Sequence

The pedagogical logic:

- **Recognition before generation.** Odd-one-out requires only comparison; generation requires search through the mental lexicon under a phonological constraint, which is a substantially harder retrieval operation. A learner failing generation while succeeding at recognition has a retrieval-load problem, not a rhyme problem — and the fix is allowing nonsense words, not reteaching.
- **Nonsense words must be licensed *before* generation is asked for**, not after the learner stalls. Licensing them afterwards reads as lowering the bar. Licensing them upfront is the difference between an unfailable task and an anxious one.
- **Alliteration is introduced deliberately, as a contrast, and only after rhyme is secure.** Introducing both together is the reliable way to create MC-FIRST-SOUND-IS-ENOUGH rather than treat it. This mirrors the mirror-pair staggering rule at `eng.phonics.alphabet-recognition` and for the same reason.
- **The spelling trap comes last and only for learners who have met print.** For a pre-print learner it is incomprehensible and pointless; running it "just in case" introduces a distinction the learner cannot yet perceive.
- **Position of the odd word must be varied from the first set onward** (Blueprint TA-1 states this). A learner who has heard three sets with the odd word last has already learned a positional heuristic that will pass every subsequent item.

Turn-by-turn scripting: Blueprint **Component 7 — Session Architecture**; adaptive routing: **Component 8**.

## Tutor Actions

From `../teaching-actions/`, in order:

1. **Prediction** (TEST-THINKING) — the missing-rhyme-in-a-song opener. Highest-value single action at this concept because it establishes competence before any instruction.
2. **Matching** (DO) — odd-one-out and pair-sorting, the core practice form. Bidirectional diagnostic: judging supplied pairs while failing to generate is the common asymmetry and it names the next task precisely.
3. **Game** (DO) — genuinely appropriate: rhyme generation is intrinsically playful, the target skill is fast retrieval, and nonsense words make it low-stakes. Standard chocolate-covered-broccoli guard: re-verify with a plain odd-one-out item outside the game before certifying.
4. **Error Analysis** (TEST-THINKING) — "someone says *said* and *maid* rhyme. Are they right?" Safe here, and it is the only action that reliably produces the *reasoning* rather than the answer.
5. **Concept Map** (ORGANIZE) — the three-pile sort (rhyme / alliteration / neither). This is the artefact that proves the boundary rather than the rule.

**Does not fit**: **Worked Example** — no procedure to model; demonstrating a rhyme judgement teaches nothing that hearing one doesn't. **Drawing** — picture cards are a *support* for the auditory task, not a visual representation of rhyme; treating them as the latter drifts toward semantic matching.

## Voice Teaching Notes

This concept is **purely auditory** — it is one of the few in the whole English tree where print is not merely unnecessary but actively harmful during acquisition. Voice is the evidence channel, not the reporting channel. (Channel reality: `../foundations/03-voice-first-learning-model.md §7`.)

What the ideal tutor perceives:

- **Sub-vocal rehearsal before answering** — the learner quietly says both words to themselves. This is the target strategy, and it should be named and praised explicitly: "I saw you say them to yourself first. That's exactly the right move." Learners who answer without rehearsing are guessing or reading.
- **Eyes going to the page** before a rhyme judgement. The single clearest MC-SPELLING-MUST-MATCH tell, and it is visible before the wrong answer arrives — which makes it the one signal that permits pre-emption rather than repair.
- **Prosodic over-match in generation.** Asked to rhyme with *day*, the learner offers *play* with exaggerated matched intonation. Harmless and a good sign; they are using melody as a retrieval cue.
- **Latency asymmetry between recognition and generation.** Fast on odd-one-out, long silence on generation. Not a knowledge gap — a lexical-search gap. Respond by supplying a first example and re-asking, never by reteaching the rule.
- **A rising, checking tone on nonsense words** ("...*zat*?"). The learner is seeking permission. Grant it immediately and warmly; hesitation here is what shuts generation down.

**Load-bearing sentence, delivered slowly**: *"Rhyme is something you hear, never something you see."*

## Assessment Signals

Item bank: Blueprint **Component 6 — Mastery Probe Set** (MP-1…MP-5). Response-pattern reads:

- **Odd-one-out (MP-1).**
  - *Fast-correct* → the comparison is automatic. Target state.
  - *Slow-correct* → the learner is rehearsing sub-vocally. This is **acceptable at mastery** for this concept, unlike at `eng.phonics.alphabet-recognition` — rhyme judgement does not need to be instantaneous, and rehearsal is a correct strategy, not a crutch.
  - *Fast-wrong* → check *which* pair they grouped. Onset-match means MC-FIRST-SOUND-IS-ENOUGH; final-consonant-match means MC-FINAL-CONSONANT-IS-THE-RIME. These are different repairs and the raw score cannot distinguish them.
  - *Slow-wrong* → likely a prerequisite gap; route back to `eng.phonics.phonemic-awareness` rather than reteaching rhyme.
- **Generation (MP-2).** Count *distinct rimes attempted*, not correct words. A learner producing three valid rhymes plus two rejected nonsense attempts has stronger evidence of the concept than one producing three memorised words from a taught set.
- **Spelling conflict (MP-3).** Only meaningful for print-exposed learners. For a pre-print learner, a correct answer here is uninformative — they had no trap to fall into.
- **Rhyme vs. alliteration (MP-4).** The learner must *name* which relation holds, not just answer no. "No" alone is passable by chance at 50%.
- **Explanation (MP-5).** Listen for whether "letters" or "spelling" appears anywhere in the explanation. Their presence is a live misconception regardless of every preceding item being correct.

**Mastery certification trigger**: odd-one-out correct with the odd word in all three positions across a set; three self-generated rhymes for a novel prompt; correct on both directions of the spelling trap *if* the learner is print-exposed; and an explanation containing no reference to letters. The KG's 0.80 threshold is appropriate — this is a gateway skill, but unlike letter recognition a residual gap self-corrects during decoding practice rather than compounding.

## Tutor Recovery Strategy

Generic engine: `../foundations/01-recovery-engine.md`. Concept-specific:

- **"I can't think of any"** — by far the most common utterance here, and it is a *retrieval* failure, not a comprehension failure. Never re-explain the rule; that is the wrong repair and it tells the learner their understanding was doubted. Supply one example and immediately re-ask: *"I'll start — cat, hat. Your turn."* Priming solves this in one move about ninety percent of the time.
- **"Is that a real word?"** — the nonsense-word anxiety. Answer without hedging: *"Doesn't matter. If it sounds right, it counts."* Any hesitation here converts an open generation task into a vocabulary test, and generation stops.
- **"I don't get it"** appearing after the alliteration contrast — the learner had a working rule and it has just been complicated. Retreat to the two-name framing, not to more examples: *"There are two different games. We just gave the other one a name."*
- **The smaller question to shrink to**: from generation, down to *binary judgement on a maximally obvious pair* — *"Do 'cat' and 'hat' rhyme?"* Two words, one yes/no, a pair from a nursery rhyme they know. Essentially unfailable, and it restores the "I can hear this" stance that generation failure erodes.
- **Never shrink to showing the words written.** It is the instinctive move (making it "clearer") and it is the one move that installs MC-SPELLING-MUST-MATCH.

## Memory Hooks

- **Concept type**: concept (a relation to be recognised), with a **procedural** attachment (the checking routine: say both aloud, compare from the vowel). The two need different review — the relation is durable once acquired, the routine decays.
- **Review form**: brief spaced discrimination items on *novel* pairs. Rhyme is unusually resistant to decay once genuinely acquired, so review here is cheap and short — the exception is the checking routine, which lapses and must be re-primed when the learner starts making fast-wrong judgements again.
- **Concept-specific deviation**: MC-SPELLING-MUST-MATCH requires an **extended re-probe tail keyed to print progress, not to time**. Schedule a re-probe after every major print milestone (letter-sound correspondence, digraphs, silent-e) — those are the moments the misconception is born, and a purely time-based schedule will miss all of them.
- **Interleaving partners**: alliteration items, once the boundary is taught — that contrast *is* the discrimination target and blocked rhyme-only practice will not build it. Also interleave with `eng.phonics.blending-segmenting` once available: rhyme is chunk-level and blending is phoneme-level, and mixing them keeps the learner attending to *which grain size* is being asked for.

## Transfer Connections

- **Near**: `eng.phonics.blending-segmenting` — the direct unlock. Rhyme establishes that words have inside parts; blending/segmenting refines the split from chunk to phoneme. A learner without rhyme meets segmentation as an arbitrary demand.
- **Near**: word families in decoding — *-at*, *-ig*, *-op*. This is rhyme relabelled for print, and a learner who holds the family-name analogy gets these nearly free.
- **Far**: `eng.writing.spelling-strategies` — spelling by analogy ("*fight* is like *light*") is a rhyme judgement applied in reverse, from sound to spelling. This is one of the highest-yield spelling strategies there is, and it is unavailable to a learner without secure rhyme.
- **Far**: `eng.literature.*` — poetry, rhyme scheme, meter. The concept reappears as an analytic tool rather than a perceptual skill.
- **Real-world**: song lyrics, advertising jingles, mnemonics, name-play. The learner already lives in a world of rhyme; naming it makes it noticeable.
- **Expert transfer**: the durable skill is **partial-match comparison over structured objects** — comparing two things on a specified sub-part while deliberately ignoring the rest. That is the same operation as comparing chemical formulae by functional group, or matching musical phrases by cadence.

## Cross-Subject Connections

KG records no `cross_links`. Honest assessment: this concept's cross-subject reach is **weak but real**, and it should not be inflated.

- **Music — rhythm and phrase matching.** Genuine and mechanically close: matching the ends of phrases is the same perceptual operation in a different medium, and many learners who struggle with rhyme succeed with musical phrase-matching, which makes it a usable alternative entry route. No KG edge exists, and the KG has no music domain to link to — recorded as an observation, not as a missing edge.
- **Mathematics — pattern recognition.** `math.found.pattern-recognition` is genuinely the same cognitive move (identify the invariant across instances). Real, if abstract. Worth a mention for a learner working both domains; not worth teaching toward.
- **No claimed link to physics or chemistry.** There isn't one. Stated explicitly so a future author does not manufacture one to fill the section.

## Blueprint References

Blueprint exists: `docs/curriculum/blueprints/eng.phonics.rhyming.md`. Reused by reference, **not restated**:

- **Component 1 — Misconception Register**: MC-SPELLING-MUST-MATCH and MC-FIRST-SOUND-IS-ENOUGH — trigger signals, conflict evidence, bridge/replacement text, discrimination pairs. This entry adds birth typing, timing notes, and a third misconception (MC-FINAL-CONSONANT-IS-THE-RIME) the Blueprint does not carry.
- **Component 2 — Prerequisite Diagnostic Block**: PD-1 and its fail-route to `eng.phonics.phonemic-awareness`.
- **Component 3 — Concrete Anchor**: the ending-match game.
- **Component 4 — Conceptual Development Sequence**: TA-1…TA-3, including the odd-word-position-variation constraint (flagged as load-bearing above, not re-derived).
- **Component 5 — Worked Examples**: WE-1…WE-3.
- **Component 6 — Mastery Probe Set**: MP-1…MP-5.
- **Components 7–8**: session architecture, protocol routing, adaptive flags.

## Runtime Asset References

No seeded `AssetIdentity` records exist for this concept as of 2026-08-03. English carries no `HUMAN_CURATOR` authored-seed rows in production (CLAUDE.md, AssetIdentity Global Audit). No assets created by this entry.

## Curriculum Feedback

- **Third misconception recorded.** MC-FINAL-CONSONANT-IS-THE-RIME is authored here and is not in the Blueprint's register. It is produced by the standard instructional phrasing "check the end", which makes it near-universal in learners taught that way. Recommended for addition to the Blueprint's Component 1 by the Curriculum Production Pipeline; recorded here, not added there.
- **Dialect-relativity is unrepresented.** The Blueprint's MP-3 uses *said/maid* as a non-rhyme, which is correct in the reference accent. Several standard rhyme-judgement items are accent-dependent, and neither the KG description nor the Blueprint flags this. Worth an adaptive-flag entry (comparable to the existing S9 L1-transfer flags elsewhere in the English blueprints), so a learner is never marked wrong for a correct judgement in their own variety.
- **Bloom level `remember` is a mismatch.** Rhyme judgement is a comparison and a discrimination — `understand` at minimum. As with `eng.phonics.alphabet-recognition`, a `remember` label invites recall-style assessment, which for this concept means asking the learner to *recall taught rhyme pairs* — an assessment that passes without the concept.
- **Estimated 1 hour is realistic** for a learner with typical nursery-rhyme exposure, and materially optimistic for one without it. This node's duration depends more on prior informal exposure than on anything the tutor does.

## Version History

- v1.0 (2026-08-03): Initial entry. Blueprint reused by reference (Components 1–8). 2 Blueprint misconceptions classified by birth type; 1 new misconception (MC-FINAL-CONSONANT-IS-THE-RIME) authored via the birth-taxonomy diagnostic and recorded as Curriculum Feedback. Dialect-relativity gap and Bloom-level mismatch recorded as Curriculum Feedback.
