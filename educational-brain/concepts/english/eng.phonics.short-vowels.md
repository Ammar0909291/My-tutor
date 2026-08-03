# Short Vowel Sounds — `eng.phonics.short-vowels`

## Identity

- **KG ID**: `eng.phonics.short-vowels`
- **Name**: Short Vowel Sounds
- **Domain**: English / Phonics
- **Difficulty**: foundational
- **Bloom level**: understand
- **Mastery threshold**: 0.85
- **Estimated hours**: 2
- **Requires**: `eng.phonics.letter-sound-correspondence` — load-bearing part: the learner must already hold the general letter-to-sound mapping principle; this entry applies it specifically to the five vowel letters in their closed-syllable (short) form, and introduces the first genuine letter-name-versus-letter-sound conflict the curriculum forces the learner to resolve.
- **Unlocks**: `eng.phonics.digraphs`, `eng.phonics.long-vowels-silent-e`
- **Cross-links**: (none in the KG)
- **Blueprint**: `docs/curriculum/blueprints/eng.phonics.short-vowels.md`

## Learning Objective

The learner can:
1. Produce each of the five short vowel sounds in isolation, anchored to a fixed keyword.
2. Identify and correctly produce the short vowel sound within a CVC (consonant-vowel-consonant) word.
3. Distinguish a vowel letter's alphabet name from its short sound in a real word.
4. Determine, by checking for a final silent "e," whether a one-syllable word takes its short vowel sound or its long vowel sound.
5. Read a novel, previously unseen CVC word correctly, generalising beyond the taught word set.

## Core Understanding

Each of the five vowel letters (a, e, i, o, u) carries **at least two distinct identities that a beginning reader must learn to keep separate**: its **alphabet name** (what the letter is called when reciting the alphabet — "a" is called "ay") and its **sound**, which itself varies by context. In a **closed syllable** — one vowel letter, followed by one or more consonants, with no final silent "e" — the vowel takes its **short sound** (a→/æ/, e→/ɛ/, i→/ɪ/, o→/ɒ/, u→/ʌ/), which bears no resemblance to the letter's alphabet name. This is the concept's first and most important structural fact: the alphabet name a learner already knows fluently is actively the wrong answer for reading most real words, and the correct answer must be learned as a separate retrieval target tied to a different cue (word structure, not the letter in isolation). The second structural fact is that **syllable structure, not syllable count, governs vowel sound** — a one-syllable word is not automatically short-vowel; whether it is closed (short vowel: "cap") or has a final silent "e" (long vowel: "cape") is what actually determines the sound, and the difference between the two can be a single silent letter that is easy to overlook. This concept deliberately teaches only enough of the silent-e contrast to correctly *bound* what "short vowel" means (recognising when a word is NOT a short-vowel word); the full mechanics of how and why silent "e" produces the long vowel sound belongs to the downstream concept `eng.phonics.long-vowels-silent-e`, not here.

## Mental Models

**Beginner — "the vowel says its name."**
The runnable simulation: see a vowel letter, retrieve its alphabet name, use that as the sound. This model is not tutor-installed — it is the direct and entirely reasonable residue of alphabet instruction, which has spent far more time teaching letter names than letter sounds, and which necessarily preceded this concept. It produces a specific, predictable, and wrong result on every closed-syllable word.
*Upgrade trigger*: the Blueprint's own conflict evidence — saying the letter "a" by its alphabet name, then saying the real word "cat" naturally and noticing the middle sound is shorter and different.
*Shelf-life warning at replacement*: "The letter's name is what you say in the alphabet song. Inside most real words, it says something shorter instead — that's the sound we're building now."

**Intermediate — "in a real word, the vowel makes its short sound — and I check this by whether the word is one syllable."**
The simulation: given a one-syllable word, apply the short-vowel sound directly, without checking anything else. This model correctly replaces the letter-name habit and correctly handles the great majority of early closed-syllable words the learner encounters, but it over-generalises "one syllable" as the trigger condition rather than the true trigger, "closed syllable with no final silent e."
*Upgrade trigger*: the Blueprint's own cap/cape or pin/pine contrast — two one-syllable words, one short vowel, one long vowel, distinguished only by a final silent "e."
*Shelf-life warning*: "One syllable isn't quite the right test. It's whether the word ends in a consonant with nothing after — or whether there's a silent 'e' hiding at the end that changes everything."

**Advanced — "short vowel sound applies specifically to closed syllables (vowel followed by a consonant, no final silent e), and I check syllable structure, not just syllable count, before committing to a sound."**
The simulation: given any novel one-syllable word, the learner checks specifically for a final silent "e" before applying the short vowel sound, and correctly predicts long-vowel pronunciation on sight when one is present. This is the target model, matching TA-4 and TA-5.
*Upgrade trigger*: multisyllabic words and further vowel-team patterns (downstream, beyond this concept's scope), where syllable division itself becomes a skill that must precede applying any vowel-sound rule.
*Shelf-life warning*: "This works perfectly for one-syllable words. Longer words need one more step first — finding where the syllables actually divide."

**Expert — "English vowel spelling is governed by a small number of syllable-type categories (closed, open, silent-e/VCe, vowel-team, r-controlled, consonant-le), of which closed and silent-e/VCe are the first two and form a genuine minimal contrastive pair."**
Named here to mark the arc; the full syllable-type taxonomy is beyond this concept's scope, but this entry deliberately establishes the first, cleanest contrast (closed vs. VCe) as the foundation the later categories will be added to.

## Why Students Fail

The dominant failure mechanism is **direct interference from a more fluent, more automatic, and more recently over-practised competing response** — alphabet-name retrieval for a given letter is typically faster and more secure than short-sound retrieval at exactly the point this concept is introduced, because alphabet instruction has had far more repetition. Under any time pressure or fatigue, the more automatic response (the name) intrudes on the less automatic one (the sound), and this is not a comprehension failure — a learner who can correctly state, when asked directly, that "a" makes a different sound in "cat" than its alphabet name may still default to the name during live, effortful reading.

The second mechanism is that **the silent-e contrast is genuinely almost invisible in isolation** — "cap" and "cape" differ by exactly one letter, appended at the very end, easy to miss on a quick glance, and the two words are otherwise visually near-identical. This is a real perceptual and attentional demand, not a conceptual one, and the Blueprint's own S6 protocol routing correctly validates this as "genuinely tricky" rather than treating difficulty here as a sign the learner has misunderstood the rule.

The third mechanism, more subtle, is that a learner who has correctly grasped "check for silent e" as a *specific instruction for this concept's contrastive pairs* may not yet have generalised it into a **standing habit applied automatically to every one-syllable word encountered**, including ones not deliberately set up as a minimal pair — TA-5's novel-word reading task exists specifically to test whether the checking habit has become general or remains tied to the drilled contrastive-pair format.

## Misconceptions

The Blueprint's **Component 1 — Misconception Register** owns the trigger signals, conflict evidence, bridge/replacement text, and discrimination pairs for both entries below. Reused by reference; birth-type classification and teaching consequence added here.

### MC-VOWEL-LETTER-NAME-IS-THE-SOUND
*(Blueprint Component 1, MC-VOWEL-LETTER-NAME-IS-THE-SOUND — includes the cat/"ay" and pin/pine discrimination pairs.)*
- **Birth type**: Type 3 (language contamination), compounding the same generic pattern already identified at `eng.phonetics.speech-sounds-overview` (where the word "sound" itself was found to be contaminated by letter-name-first instruction) — here the specific contamination is that the learner's most fluent retrieval for a given letter is quite literally the wrong answer for this task, not merely an imprecise one.
- **Teaching consequence of the birth type**: because this is contamination of what "counts as the answer" for a given letter, not a reasoning error, mere collision (hearing that "cat" doesn't sound like "cate") is necessary but not sufficient — the repair needs an explicit **terminology split**, exactly as at the speech-sounds concept: naming "the letter's name" and "the letter's sound in a real word" as two different, separately-askable questions (per the Blueprint's own MP-3, which asks for both explicitly in the same item), so the learner learns to check *which* is being asked for rather than only learning one additional fact.
- **Verification of death**: given a novel closed-syllable word using a vowel not recently drilled, the learner produces the short sound fluently on the first attempt, with no audible false start toward the alphabet name — and, separately, can still correctly state the letter's name when explicitly asked for it, showing both retrieval targets remain available and are no longer competing for the same slot.

### MC-ONE-SYLLABLE-WORDS-ALWAYS-SHORT-VOWEL
*(Blueprint Component 1, MC-ONE-SYLLABLE-WORDS-ALWAYS-SHORT-VOWEL.)*
- **Birth type**: Type 1 (overgeneralization), from a generalisation that is correct for the overwhelming majority of the words this concept deliberately introduces first (simple CVC words) — the learner is not wrong about the pattern they have seen, only about its scope.
- **Teaching consequence**: because the source pattern (most one-syllable words the learner has met so far are short-vowel) is a fair reading of the evidence provided, the repair requires **directly contrasting evidence**, not correction by assertion — the Blueprint's own cap/cape and pin/pine minimal pairs are exactly this, and their minimal-pair design (one letter of difference) is what makes the silent "e" salient enough to notice rather than dismissible as an unrelated different word.
- **Verification of death**: given a genuinely novel one-syllable word ending in silent "e" (not one of the drilled contrastive pairs), the learner correctly predicts the long vowel sound before attempting to sound it out with the short vowel — evidence the *checking habit* (always look for a final silent e), not merely the specific drilled pairs, has generalised.

## Analogies

**Best — a person's legal name versus their everyday nickname.** Every vowel letter has an official "name" (used in formal contexts like reciting the alphabet) and a different, shorter "nickname" it goes by in most everyday situations (inside real words). Knowing someone's legal name doesn't tell you what to call them day-to-day, and using the legal name in casual conversation would sound strange — directly mirroring how using the alphabet name inside a word produces a mispronunciation.
*Breaking point*: a person chooses which name to use in which context; a vowel's "choice" is determined entirely by surrounding spelling structure, not by any equivalent of social context. Keep the analogy to "two different, situation-dependent labels," not to agency or choice.

**Best-for-silent-e — a hidden switch at the end of a word that flips the vowel to a different setting.** The word "cap" has no switch; "cape" has one, tucked at the very end, easy to miss, and flipping it changes the vowel from short to long. This captures both the *location* (end of the word) and the *easy-to-overlook* nature of the silent "e" trigger.
*Breaking point*: implies a single mechanical switch metaphor that doesn't extend cleanly to vowel teams or other long-vowel spellings (beyond this concept's scope) — fine to use here, but should be explicitly bounded to "silent e specifically" rather than generalised to "anything that changes a vowel."

**Story analogy — a costume that only comes out for one specific occasion.** The vowel's alphabet name is like a costume worn only for the "alphabet parade" (reciting the ABCs); inside real words, at the "everyday event," the vowel wears its short-sound outfit instead.
*Breaking point*: costumes are chosen freely; vowel sound is determined by spelling structure. As with the nickname analogy, keep this to the two-identities framing and avoid implying choice.

**Visual analogy — the five short-vowel keyword pictures** (Blueprint Component 3): apple, elephant, igloo, octopus, umbrella (or the curriculum's chosen equivalent set). Not a metaphor but the actual standing reference instrument this concept is built around, explicitly intended (per Component 8) to remain available for self-checking throughout instruction, not only during initial teaching.

### ANTI-ANALOGIES (do not use)

- **"The vowel's real sound is the short one; the alphabet name is just wrong."** This inverts the correct relationship and will confuse the learner's already-secure alphabet knowledge — the letter name is not wrong, it is simply the answer to a *different question* (what is this letter called) than the one this concept asks (what sound does this letter make in this word).
- **"Silent e is silent because it doesn't matter."** The opposite of true, and actively damaging: the silent "e" is silent (not itself pronounced) precisely because it *does* matter — it is the trigger that changes the preceding vowel's sound. Framing it as unimportant will produce exactly the failure to check for it that MC-ONE-SYLLABLE-WORDS-ALWAYS-SHORT-VOWEL consists of.
- **"Short vowels are the easy ones and long vowels are the hard ones."** Difficulty-ranking language here risks implying long-vowel words are a separate, harder category to worry about later, rather than an ever-present possibility that must be checked for on every one-syllable word from the outset (the checking habit this concept must install now, not defer).

## Demonstrations

Prediction first in every case.

1. **The five keyword pictures (learner activity).** Blueprint Component 3 — full script there. *Predict first*, for each keyword before hearing it exaggerated: "What sound do you think is in the middle of this word?"
2. **The name-versus-sound contrast (teacher-led, learner-resolved).** Blueprint's own conflict evidence. *Predict first*: "Do you think the letter 'a' sounds the same in the alphabet song as it does in the word 'cat'?" Then say the letter name, then say "cat" naturally, and let the contrast register.
3. **The cap/cape minimal pair (teacher-led, learner-resolved).** Blueprint's own conflict evidence for the second misconception. *Predict first*: "These two words look almost the same — do you think they sound the same?" Then say both slowly, side by side.
4. **The novel-word reading challenge (learner activity, TA-5).** *Predict first*, before attempting: "Have you seen this exact word before? What are you going to check before you decide how to say the vowel?" — deliberately eliciting a statement of the checking procedure itself, not just the eventual answer, since the procedure is what TA-5 and this concept's certification actually test.

## Discovery Questions

This concept splits, as several phonics concepts in this batch have: **the specific short-vowel sound for each letter is a fixed convention, told directly** (there is nothing to discover about why "a" sounds like /æ/ in a closed syllable — it is surveyed via the keyword anchors, not derived); **the letter-name-versus-sound distinction and the closed-syllable-versus-silent-e boundary are genuinely well suited to guided discovery**, because both are directly perceptible from contrastive evidence the learner can generate or examine themselves.

1. **Need**: "You already know the alphabet names for all five vowels. Do those names show up the same way inside real words?"
2. **Playground**: say several familiar CVC words slowly and listen to the middle sound, without reference to the alphabet song.
3. **Invention**: "Is the middle sound the same as the letter's name, or something different?" The learner notices the mismatch themselves, across several words, rather than being told.
4. **Collision (silent e)**: present cap/cape or pin/pine side by side. "These look almost the same — sound them out. Are they the same word?" The learner's own attempt reveals the mismatch is real and specifically tied to the final "e."
5. **Formalization**: name the two facts — vowels have a name and a (different, shorter) short sound in closed syllables; a final silent "e" changes a short vowel to its long sound.
6. **Compression**: "Inside a word, check the ending before you trust the short sound."

## Teaching Sequence

The pedagogical logic behind this arc:

- **Isolated short-vowel production (TA-1) before the letter-name contrast is introduced (TA-3)** — the Blueprint sequences these deliberately: establishing the five short sounds fluently, anchored to keywords, first gives the learner a secure, positive target to fall back on once the (potentially destabilising) discovery that the alphabet name is "wrong" here is introduced. Introducing the name/sound conflict before the short sounds are themselves secure would leave the learner with neither a working name-strategy nor a working sound-strategy simultaneously.
- **CVC word reading (TA-2) is interleaved between isolated sound production and the name/sound contrast**, giving the learner a chance to apply the short sound in real (if simple) words before the harder conceptual distinction is introduced — this matches the general principle, seen throughout this batch, of establishing a skill in its simplest form before complicating it with an exception or a competing frame.
- **The silent-e contrast (TA-4) must come after the letter-name/sound distinction (TA-3) is reasonably secure, not before or simultaneously** — introducing two potentially destabilising discoveries (the alphabet name is wrong here; also, syllable count doesn't fully determine the sound either) in the same breath would compound difficulty rather than isolate it, and per the Blueprint's own Component 8 flag, this concept deliberately teaches the silent-e contrast only to the extent needed to *bound* short-vowel recognition, explicitly deferring full long-vowel mechanics to `eng.phonics.long-vowels-silent-e`.
- **Novel-word reading (TA-5) comes last and must include words not part of any drilled contrastive pair** — testing generalisation specifically requires material the specific-pair-matching strategy cannot succeed on by pattern-matching alone, exactly the same principle already established at `eng.phonics.consonants`' hard/soft-rule application task.

Turn-by-turn scripting, protocol routing, and adaptive flags: Blueprint **Component 7 — Session Architecture** and **Component 8 — Adaptive Flags** (in particular the keyword-anchor-as-standing-reference flag, the name/sound-conflict-as-default-assumption flag, the deliberate silent-e scope boundary, and L1 vowel-inventory transfer anticipation for S9 learners).

## Tutor Actions

In recommended order, from `../teaching-actions/`:

1. **Demonstration** (SHOW) — the five keyword pictures and the name/sound and cap/cape contrasts, all benefiting from being heard aloud, with the keyword demonstrations ideally learner-repeated rather than only tutor-modelled.
2. **Retrieval-Schedule Prompt** (TEST-THINKING) — the five short-vowel sounds are a small, high-frequency, low-structure retrieval set ideally suited to brief, frequent practice bursts, matching the treatment already established for the alphabet-recognition and blending-segmenting concepts in this batch.
3. **Matching** (DO) — CVC word to vowel sound, and closed-syllable word to its silent-e minimal-pair partner.
4. **Prediction** (TEST-THINKING) — the novel-word reading challenge (TA-5), where stating the checking procedure before attempting is the load-bearing move that distinguishes rule-application from pattern-matching, exactly as established at `eng.phonics.consonants`.
5. **Error Analysis** (TEST-THINKING) — presenting a word read with the alphabet name instead of the short sound (a puppet's or a peer's hypothetical mistake, not the learner's own live error) and asking the learner to identify and correct it — safe because the flaw is externalised, and directly practises the discrimination this concept's first misconception targets.

**Does not fit**: **Worked Example** in the derivation sense — there is no multi-step procedure to model beyond the "check for silent e" habit, better practised through prediction than walked through. **Concept Map / Organize** as a primary action — this concept's content (five sounds, one contrast rule) is compact enough that a full concept-map artefact would be disproportionate; a simple keyword reference (already provided by Component 3) suffices.

## Voice Teaching Notes

This concept's core evidence is **audio production**, closely paralleling `eng.phonics.consonants` — the learner's spoken vowel sound is the primary evidence, with the silent-e check functioning as a visual/attentional step whose *presence or absence* is often audible through timing rather than through the sound itself.

What the ideal tutor perceives:

- **The alphabet name substituted for the short sound**, especially audible at the very start of a reading attempt before any self-correction. This is the direct auditory signature of MC-VOWEL-LETTER-NAME-IS-THE-SOUND, and unlike some substitution errors, it is nearly unmistakable once named — the two sounds are simply different enough that there is little ambiguity about which one occurred.
- **A brief pause specifically before the vowel in a one-syllable word**, followed by a correct short-sound production. This is a positive sign at this concept — it suggests the learner is actively checking (for a final silent "e," or simply retrieving the correct sound rather than the name) rather than defaulting automatically to either answer.
- **Confident short-vowel production on a word that actually ends in silent "e"** (reading "cape" with a short /æ/, producing something like "cap" or an unnatural blend). This is the direct auditory signature of MC-ONE-SYLLABLE-WORDS-ALWAYS-SHORT-VOWEL, and it is often accompanied by the learner not noticing or commenting on the final "e" at all — worth explicitly asking "did you see anything at the end of that word?" as a diagnostic follow-up.
- **Self-correction after producing the short vowel on a silent-e word** ("cap — wait, cape!"). Strongly positive: evidence the checking habit is active, even if it isn't yet fully automatic (fully automatic would mean catching it before production, not after).

**Load-bearing sentence, delivered slowly**: *"Inside a real word, check the ending — then trust the short sound, not the letter's name."*

## Assessment Signals

Item bank: Blueprint **Component 6 — Mastery Probe Set** (MP-1…MP-5). Response-pattern reads, which the Blueprint does not own:

- **Isolated sound production (MP-1).** *Fast-correct* → the reliable core is secure; carries limited diagnostic weight beyond basic fluency, since neither misconception specifically lives here.
- **CVC word reading (MP-2).** *Fast-correct* → genuine, straightforward application. *Wrong, with the alphabet name substituted* → MC-VOWEL-LETTER-NAME-IS-THE-SOUND is live; route to the name/sound terminology-split repair, not to more CVC reading practice at normal difficulty.
- **Name vs. sound (MP-3).** This item explicitly asks for both the name and the in-context sound in the same probe, which is exactly the right design for this misconception — a learner who can supply one correctly but not the other has not yet separated the two retrieval targets; both must be correct, separately stated, for this item to count as passed.
- **Silent-e discrimination (MP-4).** *Correct, with the learner explicitly noting the final "e"* (spontaneously or in response to "how do you know?") → strong, specific evidence for the checking habit. *Correct by chance on a single item with no stated reason* → treat as unverified per the same logic applied at `eng.phonics.consonants`' hard/soft rule; confirm with a second, genuinely novel pair before certifying.
- **Explanation (MP-5).** Listen specifically for whether the explanation names the *closed syllable / no silent e* condition precisely, versus a vaguer "one-syllable words are short" — the latter is exactly the over-generalisation this concept's second misconception consists of, restated as an explicit (if unintentionally incorrect) rule rather than merely an implicit default.

**Mastery certification trigger**: fluent, correct isolated production of all five short vowel sounds; correct CVC word reading with no letter-name substitution on at least one novel word per vowel; correct, separately-stated answers for both a vowel's alphabet name and its in-context short sound on the same item; and correct silent-e discrimination on a genuinely novel minimal pair, with the final "e" cited as the reason. The genuinely-novel requirement on the silent-e item is essential — a learner who has only ever seen the drilled cap/cape-style pairs may be recognising specific memorised words rather than applying a general checking habit, and only a new pair can distinguish the two.

## Tutor Recovery Strategy

Generic engine: `../foundations/01-recovery-engine.md`. Concept-specific notes only:

- **"But that's not how you say the letter"** — delivered with genuine puzzlement when the short sound is first introduced, and it should be validated directly rather than brushed past: "You're completely right that it's not the letter's name — it's a different thing the letter does inside words. Both are real and both matter; they're just for different jobs." This response protects the learner's correct, secure alphabet knowledge rather than implying it was wrong all along.
- **"I can't tell them apart, they look the same"** on a cap/cape-style pair — a genuine, reasonable perceptual difficulty (the words really are visually near-identical), not a comprehension failure, and should be met by making the difference maximally salient rather than by more explanation: physically point to or circle the final "e" before asking the learner to attempt either word, temporarily externalising the checking step until it becomes internalised.
- **The smaller question to shrink to**: from novel-word reading, down to **producing the isolated short sound for a single vowel with its keyword picture visibly present** (e.g., "what sound is in 'apple'? Now just make that sound"). This removes both the letter-name-competition demand and the silent-e checking demand entirely, isolating the most basic, most secure piece of this concept, and re-establishes confidence before returning to the harder combined tasks.
- **Never shrink to "just say the letter's name if you're not sure."** This is precisely the wrong fallback, since the letter's name is the specific competing response this concept exists to overcome — falling back to it under difficulty actively reinforces the interference rather than resolving it.

## Memory Hooks

- **Concept type**: fact (the five short-vowel sound associations, anchored to keywords) plus a **discrimination skill** (letter name vs. sound) plus a **procedural checking habit** (final-silent-e detection). All three need distinct review treatment.
- **Review form — the five sounds**: brief, high-frequency spaced retrieval using the keyword anchors as a standing, always-available reference, per the Blueprint's own explicit instruction that these remain available throughout instruction rather than only during initial teaching.
- **Review form — the name/sound discrimination**: review using items that explicitly ask for both the name and the in-context sound together (mirroring MP-3's own design), never the sound alone — reviewing only the sound in isolation cannot reveal whether the two retrieval targets have actually been kept separate versus one having simply overwritten the other.
- **Review form — the silent-e checking habit**: review specifically using **novel minimal pairs, never the originally-drilled set**, matching the certification requirement above and the equivalent principle already established for the hard/soft c/g rule at `eng.phonics.consonants` — a checking habit reviewed only on familiar pairs will look retained while quietly reverting to specific-word memorisation.
- **Interleaving partners**: `eng.phonics.consonants`' hard/soft c/g items interleave well once both concepts are underway, since both concepts share the deep structural theme "check something specific about the surrounding letters before committing to a sound," and mixing them strengthens that general checking habit rather than letting it remain concept-specific. Closed-syllable and silent-e items should always be interleaved with each other, never blocked, for the reasons given throughout this batch.

## Transfer Connections

- **Near**: `eng.phonics.long-vowels-silent-e` — the direct unlock, which takes the boundary-level silent-e awareness this concept deliberately limits itself to and develops the full long-vowel mechanics; a learner arriving already able to detect "this word has a silent e, so something changes" needs only to learn *what* changes, not *that* something does.
- **Near**: `eng.phonics.digraphs` — the other direct unlock, extending the theme that letter combinations (rather than single letters read in isolation) can determine vowel or consonant sound, in a structurally different way (two letters together represent one sound, rather than one letter changing based on a trailing silent letter).
- **Far**: reading fluency generally — the letter-name-versus-sound discrimination, once fully automatic, frees working-memory capacity that a learner still consciously suppressing the name in favour of the sound does not have available for comprehension, directly paralleling the argument already made for `eng.writing.handwriting-and-formation`'s relationship to spelling and composition.
- **Real-world**: understanding why some spelling-focused games or apps (that show only isolated letters, disconnected from real words) can inadvertently reinforce the letter-name habit rather than the in-word sound — a genuinely practical implication for choosing supplementary reading materials.
- **Expert transfer**: the durable skill is **suppressing a more automatic, more fluent competing response in favour of a less practised but contextually correct one, and doing so reliably under the exact conditions (speed, fatigue) where interference is most likely** — the same skill needed whenever a learner must apply a specialised convention that overrides a more general, more deeply ingrained habit (e.g., scientific notation overriding ordinary number-reading habits, or a foreign language's different stress pattern overriding a first language's default).

## Cross-Subject Connections

KG records no `cross_links`. Honest assessment, consistent with `eng.phonics.consonants` immediately upstream: this concept's cross-subject reach is limited.

- **No genuine mechanism-level connection to mathematics, physics, chemistry, or biology.** This concept's content (English vowel spelling conventions) is a fact about the writing system, not a physical mechanism — stated explicitly rather than manufactured, following this program's established practice.
- **A structural parallel to the letter-name/letter-sound distinction exists in mathematics — the same symbol having a "name" versus a "value" depending on context** (e.g., a variable's letter-name versus the number it represents in a given equation) — genuinely too abstract and too distant to warrant more than this passing note; no teaching action follows from it.

## Blueprint References

Blueprint exists: `docs/curriculum/blueprints/eng.phonics.short-vowels.md`. Reused by reference, **not restated**:

- **Component 1 — Misconception Register**: both misconceptions' trigger signals, conflict evidence, bridge/replacement text, discrimination pairs. This entry adds birth-type classification and the teaching consequences that follow from type, identifying the first misconception as a direct compounding of the language-contamination pattern already found at `eng.phonetics.speech-sounds-overview`.
- **Component 2 — Prerequisite Diagnostic Block**: PD-1 and its fail-route to `eng.phonics.letter-sound-correspondence`.
- **Component 3 — Concrete Anchor**: the five short-vowel keyword pictures script.
- **Component 4 — Conceptual Development Sequence**: TA-1…TA-5, including the deliberate silent-e scope boundary.
- **Component 5 — Worked Examples**: WE-1…WE-3.
- **Component 6 — Mastery Probe Set**: MP-1…MP-5, the item bank. This entry adds only the response-pattern reads.
- **Components 7–8**: session architecture, protocol routing (S0/S1/S6/S9, including L1 vowel-inventory transfer anticipation), and adaptive flags (keyword-anchor persistence, name/sound-conflict default assumption, silent-e scope boundary).

## Runtime Asset References

No seeded `AssetIdentity` records exist for this concept as of 2026-08-03. English carries no `HUMAN_CURATOR` authored-seed rows in production; existing English rows are `AI_AUTHORED` live-capture only (CLAUDE.md, AssetIdentity Global Audit). No assets created as part of authoring this entry.

## Curriculum Feedback

- **No missing cross-links identified**, consistent with `eng.phonics.consonants` immediately upstream — this concept's content is a spelling-convention fact rather than a physical mechanism.
- **The Blueprint's explicit silent-e scope boundary** (Component 8: "this concept introduces the contrast only to the extent needed to correctly bound 'short vowel,' without fully teaching silent-e's long-vowel rules") is a well-reasoned scoping decision worth cross-referencing for a future author of `eng.phonics.long-vowels-silent-e` — it establishes exactly what that downstream concept can assume is already in place (detection of a final silent e as a trigger condition) versus what it must still teach in full (what the resulting long-vowel sound actually is and why).
- **`estimated_hours: 2` is plausible** for the core five-sound production and CVC reading, and — as with the hard/soft c/g rule at `eng.phonics.consonants` — likely optimistic for the silent-e checking habit to become a genuinely general, spontaneously-applied procedure rather than a pattern recognised only on drilled pairs; the certification requirements in this entry's Assessment Signals section are calibrated to detect that specific shortfall rather than to pass on pattern-matched success alone.

## Version History

- v1.0 (2026-08-03): Initial entry. Blueprint reused by reference (Components 1–8). 2 misconceptions classified by birth type; the first identified as a further instance of the language-contamination pattern first flagged at `eng.phonetics.speech-sounds-overview`. No missing cross-links found — recorded explicitly. Silent-e scope-boundary cross-reference recorded as Curriculum Feedback for the downstream concept's future author.
