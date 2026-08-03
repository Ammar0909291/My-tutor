# Consonant Sounds — `eng.phonics.consonants`

## Identity

- **KG ID**: `eng.phonics.consonants`
- **Name**: Consonant Sounds
- **Domain**: English / Phonics
- **Difficulty**: foundational
- **Bloom level**: understand
- **Mastery threshold**: 0.85
- **Estimated hours**: 2
- **Requires**: `eng.phonics.letter-sound-correspondence` — load-bearing part: the learner must already hold the general principle that letters map to sounds and must have some working letter-sound pairs; this entry surveys the single-letter consonants systematically and introduces the first genuine letter-to-sound *branching* rule (hard/soft c and g).
- **Unlocks**: `eng.phonics.consonant-blends`
- **Cross-links**: (none in the KG)
- **Blueprint**: `docs/curriculum/blueprints/eng.phonics.consonants.md`

## Learning Objective

The learner can:
1. Produce the correct sound for each single-letter consonant taught (b, d, f, g, h, j, k, l, m, n, p, r, s, t, v, w, y, z), in isolation.
2. Isolate and correctly produce the initial consonant sound of a spoken word.
3. Determine, for "c" or "g," whether the hard or soft sound applies, by checking the letter that follows.
4. Apply the hard/soft rule to a novel, previously unseen word.
5. Distinguish a genuine silent-letter exception from evidence that the single-consonant-sound system as a whole is unreliable.

## Core Understanding

The single-letter consonants of English are, for the large majority of letters, a **highly reliable one-letter-one-sound system** — b, d, f, h, j, k, l, m, n, p, r, s, t, v, w, y, z each map to one predictable phoneme in the overwhelming majority of their occurrences, and this reliability is the concept's foundation and its main teaching asset. Two letters break the simple pattern in a *systematic*, rule-governed way rather than a random one: **"c" and "g" each represent two different sounds, and which one applies is fully predictable from the very next letter** — before a, o, or u, both take their "hard" sound (/k/ for c, /g/ for g); before e, i, or y, both take their "soft" sound (/s/ for c, /dʒ/ for g). This is not an exception list to memorise letter-by-letter; it is a single, general, applies-to-both-letters rule based on one simple check. Separately, a genuinely small set of words contain **silent consonant letters** (the "k" in "knife," the "w" in "write," the "s" in "island") — real exceptions, historically motivated, that must be learned as a separate, bounded list layered on top of the reliable core, never treated as evidence that the core system itself is unreliable. The concept's structural point is therefore threefold: most single consonants are simply reliable; c/g follow one predictable rule, not two unrelated rules or an exception list; and silent letters are a small, separate, bounded layer that does not undermine anything else.

## Mental Models

**Beginner — "each letter makes its own sound, full stop."**
The runnable simulation: see a letter, retrieve one fixed sound, produce it. This model is correct for the majority of single consonants and is not tutor-installed — it is the natural, and largely accurate, generalisation from basic letter-sound instruction. It fails specifically and only at "c" and "g," and at the small silent-letter set.
*Upgrade trigger*: the Blueprint's own conflict evidence — "cat" versus "city," where the same letter clearly produces two different sounds.
*Shelf-life warning at replacement*: "Almost every consonant really does keep one sound. Two of them — c and g — need one extra check before you commit to a sound."

**Intermediate — "c and g are unpredictable; I'll guess or memorise word by word."**
The simulation: encountering "c" or "g," the learner has correctly noticed the sound varies, but has not yet discovered the following-letter rule, so treats each occurrence as an independent fact to be memorised or guessed at. This is a genuine intermediate resting point — the noticing is correct, the resolution is not yet efficient.
*Upgrade trigger*: the Blueprint's own TA-3 discovery sequence — contrasting several hard/soft pairs side by side until the following-letter pattern becomes visible.
*Shelf-life warning*: "It feels random right now because you're looking at each word separately. There's actually one rule that covers all of it — the letter right after 'c' or 'g' tells you which sound to use."

**Advanced — "c and g are single letters governed by one predictable following-letter rule, and the reliable core is unaffected by a small, separate list of silent-letter exceptions."**
The simulation: presented with any novel word containing "c" or "g," the learner checks the following letter and predicts the sound before confirming; presented with a silent letter, the learner correctly files it as a bounded exception rather than doubting the system generally. This is the target model, matching TA-4 and TA-5.
*Upgrade trigger*: consonant blends and digraphs (`eng.phonics.consonant-blends`, downstream), where letter combinations — rather than single letters with a following-letter rule — determine the sound.
*Shelf-life warning*: "This rule is specific to c and g being followed by a vowel. Letter combinations like 'sh' or 'th' work completely differently — that's the next layer."

**Expert — "English consonant spelling reflects layered historical borrowing (Latin-derived soft-c/g patterns, Old English silent letters preserved in spelling after pronunciation shifted), and its apparent irregularities are mostly principled once the history is known."**
Named here to mark the arc; this concept does not require or attempt historical explanation, but the advanced learner benefits from knowing that the hard/soft rule and the silent-letter exceptions are not arbitrary even at a level beyond what is taught here.

## Why Students Fail

The dominant failure mechanism is a **premature and overly broad generalisation from the very first sound this concept introduces**: because most single consonants genuinely are one-letter-one-sound, and because this reliability is correctly and necessarily emphasised early to build confidence, the learner extends "this letter always makes this sound" further than it holds — specifically to "c" and "g," where it is false, and less commonly to letters that participate in silent-letter exceptions. This is not carelessness; it is the expected cost of teaching a mostly-true generalisation before its exceptions, which is itself pedagogically necessary (a learner cannot hold "it depends" as a first move with no anchor).

The second, more specific mechanism is that the hard/soft pattern, once noticed, is frequently treated as **two independent, unrelated facts about two different letters** rather than one shared rule — a learner who has separately memorised "cat has a hard c" and "cent has a soft c" as isolated word-facts has not yet extracted the general, transferable rule (check the next letter) that would let them handle a genuinely novel word with either letter.

The third mechanism is that **any silent letter, once discovered, threatens the learner's confidence in the entire single-consonant system**, precisely because the system was taught as maximally reliable. A learner who has just been told "letters make one sound" and then encounters "knife" may reasonably (if incorrectly) conclude the whole premise was wrong, rather than that a small, separate, listable exception exists alongside an otherwise-intact rule.

## Misconceptions

The Blueprint's **Component 1 — Misconception Register** owns the trigger signals, conflict evidence, bridge/replacement text, and discrimination pairs for both entries below. Reused by reference; birth-type classification and teaching consequence added here.

### MC-C-AND-G-ARE-SINGLE-SOUND-LETTERS
*(Blueprint Component 1, MC-C-AND-G-ARE-SINGLE-SOUND-LETTERS — includes the cat/cent and gum/gem discrimination pairs.)*
- **Birth type**: Type 1 (overgeneralization), and a particularly well-motivated one — it is the direct, reasonable extension of the concept's own correctly-taught opening generalisation (most letters, one sound) to two letters where it happens not to hold.
- **Teaching consequence of the birth type**: because the source generalisation is correct and valuable everywhere else, the repair must be **scoped precisely to these two letters** rather than framed as undermining the general reliability principle — the Blueprint's own bridge text does this correctly, explicitly calling the hard/soft pattern "a real, learnable pattern, not randomness," which keeps the learner's trust in systematic rules intact rather than eroding it.
- **Verification of death**: given a novel word containing "c" or "g" followed by a vowel not used in prior drilling, the learner checks the following letter and predicts correctly *before* sounding out the whole word — evidence the rule, not a memorised word list, is driving the prediction.

### MC-EVERY-LETTER-MAKES-EXACTLY-ONE-SOUND
*(Blueprint Component 1, MC-EVERY-LETTER-MAKES-EXACTLY-ONE-SOUND.)*
- **Birth type**: Type 1 (overgeneralization) again, but distinct from the c/g case in an important way — here the overgeneralisation is not resolved by finding a *rule* (as with hard/soft c/g) but by learning a *bounded, unruled list* (silent letters are genuinely arbitrary holdovers, not predictable from context the way hard/soft c/g is). The repair strategy must therefore differ from the c/g repair even though the underlying birth type is the same.
- **Teaching consequence**: because there is no rule to extract here, the repair is **explicit scope-bounding and reassurance that the list is small**, not a search for a pattern (which does not exist) — the Blueprint's own s6_path does this correctly by naming the reliable core as "the vast majority of words" and framing silent letters as "a smaller, separate list," which prevents the learner from either giving up on rules generally or fruitlessly hunting for a nonexistent silent-letter pattern.
- **Verification of death**: encountering a new silent-letter word, the learner treats it as an item to note and learn individually (rather than searching for a rule, and rather than concluding the whole consonant system is compromised), while continuing to apply full confidence to the reliable core elsewhere in the same reading session.

## Analogies

**Best — traffic lights that are almost always the same colour code, with two intersections that have one extra, clearly-marked rule.** Most intersections: red means stop, full stop, everywhere, always. Two special intersections have a clearly posted additional sign ("turn on red permitted when clear") — a real, learnable exception to the general pattern, not proof that traffic lights are unreliable everywhere.
*Breaking point*: traffic-light exceptions are geographically fixed and signposted; the hard/soft c/g rule is checked letter-by-letter in the moment, not memorised location-by-location. Useful mainly for the *trust-preserving* framing, not for the mechanics.

**Alternative — a light switch with a dimmer built in for exactly two rooms in the house.** Every other room: flip the switch, light comes on, same brightness every time. Two rooms have a dimmer that responds to a second control (here, the following letter) — a genuine additional rule for those two rooms specifically, not evidence the whole house's wiring is unpredictable.
*Breaking point*: a dimmer is a continuous control; hard/soft is a binary switch. Keep the analogy to "two rooms have one extra rule," not to the specific mechanism.

**Story analogy — a reliable friend who has two nicknames depending on who's talking to them.** Almost everyone in your life is called one thing, always. One friend answers to "Alex" from family and "Lex" from close friends — genuinely two names, and genuinely predictable from *who is speaking*, not random. This maps closely onto "c" and "g" having two sounds predictable from *what follows*.
*Breaking point*: none serious; a clean, close mapping.

**Visual analogy — the consonant sound wall** (Blueprint Component 3), a picture-card set anchoring each reliable single sound to a concrete referent before any hard/soft or exception content is introduced. Not a metaphor but the actual working instrument this concept opens with.

### ANTI-ANALOGIES (do not use)

- **"C and g are tricky, unpredictable letters."** Directly reinforces the "randomness" framing the Blueprint's own bridge text is specifically designed to counter — the entire point of this misconception's repair is that the pattern is predictable, not that it is tricky.
- **"Some words just break the rules."** Applied to silent letters, this framing invites the learner to distrust the rules generally, exactly the MC-EVERY-LETTER-MAKES-EXACTLY-ONE-SOUND failure mode. The correct framing is that silent letters are a separate, small, listable layer — never that "the rules" are broken.
- **"Just memorise which words have a soft c or g."** Directly installs a word-by-word memorisation strategy in place of the following-letter rule, pre-empting exactly the generalisation TA-4 (applying the rule to novel words) is designed to test.

## Demonstrations

Prediction first in every case.

1. **The consonant sound wall (learner activity).** Blueprint Component 3 — full script there. *Predict first*, for each picture card before naming it: "What sound do you think this word starts with?"
2. **The cat/city contrast (teacher-led, learner-resolved).** Blueprint's own conflict evidence. *Predict first*: "Do you think 'c' makes the same sound in 'cat' and 'city'?" Then say both aloud and let the contrast register.
3. **The rule-discovery set (learner activity, TA-3).** Present several hard/soft pairs (cat/cent, gum/gem, cot/city, gap/giant) in quick succession and *predict first* each time before confirming: "Before I tell you — hard or soft, and why do you think so?" Building the prediction habit here is what converts memorised examples into an applied rule.
4. **The silent-letter reveal (teacher-led, learner-resolved).** Blueprint's own conflict evidence — say "knife" naturally and ask whether a /k/ is actually heard. *Predict first*: "Do you think every letter in 'knife' gets said out loud?"

## Discovery Questions

This concept splits cleanly: **the reliable single-consonant sounds are told directly** (there is nothing to discover about which sound "b" makes — it is a fixed convention, surveyed systematically, exactly as with alphabet letter names); **the hard/soft c/g rule is genuinely well suited to guided discovery**, because the evidence (a following-letter pattern visible across several examples) is directly available to the learner without needing any prior phonetic theory.

1. **Need**: "Sometimes 'c' sounds like /k/ and sometimes like /s/. Is that random, or is there a pattern?"
2. **Playground**: lay out several already-encountered hard and soft examples (cat, cent, cot, city) and let the learner examine them freely.
3. **Invention**: "What's different about the words with a hard c compared to the words with a soft c?" The learner notices the following letter, themselves.
4. **Collision**: present a case that tests the boundary of the noticed pattern — a word with "c" followed by a vowel not yet seen (e.g., "cup" if only a/o examples were used) — to confirm the rule generalises rather than being tied to the specific examples drilled.
5. **Formalization**: name the rule — a/o/u after c or g → hard; e/i/y after c or g → soft — as a general check, not a list of memorised words.
6. **Compression**: "Check the very next letter before you commit to a sound."

Silent letters are **not** a discovery target — they are told directly, as a small, bounded, historically-arbitrary list, per the Teaching Sequence below.

## Teaching Sequence

The pedagogical logic behind this arc:

- **The reliable core (TA-1, TA-2) is established first and given the most confident, unqualified framing of the whole concept** — this is deliberate: the learner needs a strong baseline of trust in the one-letter-one-sound principle before either exception category (hard/soft, or silent letters) is introduced, or the exceptions will be over-weighted relative to their actual, small footprint.
- **Hard/soft c/g (TA-3, TA-4) comes before silent letters (TA-5)**, and the two exception categories must be kept visibly distinct throughout, never introduced in the same breath — hard/soft is a *rule* (predictable, general, worth deriving) and silent letters are a *list* (arbitrary, bounded, worth naming but not worth searching for a pattern in). Blurring the two invites the learner either to hunt fruitlessly for a silent-letter rule or to treat the hard/soft pattern as arbitrary memorisation.
- **The hard/soft rule must be discovered from contrast, not stated first** (per Discovery Questions above and the Blueprint's own TA-3 instruction to guide discovery "rather than stating the rule first") — a rule handed down before the learner has felt the pattern's presence in several examples is more likely to be applied as a recalled fact than as a checkable procedure, undermining exactly the transfer TA-4 requires.
- **Silent letters are introduced with explicit scope-bounding language from the first example** (Blueprint's own s6_path and Component 8 adaptive flag) — never presented as a growing, open-ended category, since the learner's confidence in the reliable core depends on perceiving this list as small and closed, not as the beginning of an unpredictable pattern of exceptions.

Turn-by-turn scripting, protocol routing, and adaptive flags: Blueprint **Component 7 — Session Architecture** and **Component 8 — Adaptive Flags** (in particular the hard/soft-as-rule framing, silent-letter scope-bounding, the deliberate deferral of "q" and "x," and L1 phoneme-transfer anticipation for S9 learners).

## Tutor Actions

In recommended order, from `../teaching-actions/`:

1. **Demonstration** (SHOW) — the consonant sound wall, and the cat/city and knife contrasts, all benefiting from being heard aloud by the learner (and, for the sound wall, learner-produced) rather than only read.
2. **Prediction** (TEST-THINKING) — the rule-discovery set (TA-3) and the silent-letter reveal are both built around predicting before confirming, which is the load-bearing action for converting noticed examples into an applied, transferable rule.
3. **Matching** (DO) — sound-to-picture (Component 3 anchor) and, for the hard/soft rule, following-letter-to-predicted-sound.
4. **Error Analysis** (TEST-THINKING) — the Blueprint's own TA-5 sorting task (reliable-core vs. genuine exception) is a form of guided error analysis: the learner examines a mixed set and classifies which words follow the simple pattern and which contain a real exception, directly practising the discrimination this concept's second misconception targets.
5. **Concept Map** (ORGANIZE) — a simple two-column sort (reliable single sound / hard-soft-rule letters), useful as a compact artefact distinguishing the two structurally different kinds of "irregularity" this concept introduces (a rule versus a list).

**Does not fit**: **Worked Example** in the derivation sense — there is no multi-step procedure to model beyond "check the next letter," which is better practised through prediction than walked through as a worked derivation. **Role-Play** — no interpersonal content.

## Voice Teaching Notes

This concept's core evidence is **audio production** — the learner saying the correct sound for a letter or word — layered with a **visual checking step** (looking at the letter following "c" or "g"). Voice carries the primary evidence for the reliable core and for whether the hard/soft rule was correctly applied; the visual check itself is not directly audible but its *absence* often is.

What the ideal tutor perceives:

- **A hard/soft answer given with no visible glance at the following letter, arrived at instantly.** For a familiar, previously-drilled word, this is unremarkable. For a genuinely novel word, instant correct production with no apparent checking step may indicate either strong automaticity (the target eventual state) or a lucky guess — worth a light follow-up ("how did you know?") specifically on novel items to distinguish the two.
- **A visible pause specifically at "c" or "g," followed by a correct answer.** Positive: this is the checking procedure taking real, brief time, and it should be named as the correct habit rather than treated as hesitation to be minimised.
- **Confident production of a silent letter's sound** (e.g., voicing the "k" in "knife"). This is the direct auditory signature of MC-EVERY-LETTER-MAKES-EXACTLY-ONE-SOUND being applied to a word it does not cover, and it is often accompanied by the learner sounding out the whole word unnaturally slowly, letter by letter, rather than producing it as the natural, known whole word.
- **Self-correction on a hard/soft item** ("/k/ — wait, it's followed by an 'i', so — /s/"). Strongly positive: direct evidence the rule, not a recalled answer, is being actively applied.

**Load-bearing sentence, delivered slowly**: *"For c and g, check the very next letter before you say the sound out loud."*

## Assessment Signals

Item bank: Blueprint **Component 6 — Mastery Probe Set** (MP-1…MP-5). Response-pattern reads, which the Blueprint does not own:

- **Single consonant production (MP-1).** *Fast-correct* → the reliable core is secure. This item type carries little diagnostic weight beyond basic fluency, since it is not where either misconception lives.
- **Word-initial isolation (MP-2).** As with MP-1, mainly a fluency check; a wrong answer here more often indicates a segmentation gap (see `eng.phonics.blending-segmenting`) than a consonant-specific issue, unless the initial sound happens to be a hard/soft-governed letter.
- **Hard/soft rule, novel word (MP-3).**
  - *Correct, with the learner citing the following letter as the reason* → genuine rule application; the strongest possible evidence.
  - *Correct, with no stated reason or a reason referencing something other than the following letter* (e.g., "it just sounded right") → treat as **unverified**, not as failure — the correct answer may be a lucky guess or a memorised word rather than rule-driven, and should be followed up with a second, harder novel item before certifying.
  - *Wrong* → check whether the error is hard-for-soft or soft-for-hard; both are equally informative about which direction of the rule needs reinforcement, and neither indicates the rule concept is entirely absent if the *other* direction is handled correctly.
- **Reliable-core-vs.-exception discrimination (MP-4).** *Correctly identifies a silent letter as an exception while maintaining full confidence in the reliable core elsewhere in the same item* → this is the actual target state for the second misconception, and it requires observing behaviour across the *whole* item, not just the specific silent-letter judgement — a learner who correctly flags the silent letter but then hesitates on an unrelated, fully reliable consonant in the same word has not yet fully separated the two categories.
- **Explanation (MP-5).** Listen for whether the explanation names the *following letter* specifically, versus a vaguer "it depends on the word" — the latter indicates the pattern has been noticed but not yet extracted into a checkable, general rule.

**Mastery certification trigger**: fluent, correct single-consonant production across the reliable set; correct hard/soft classification on a novel word for both "c" and "g," each with the following-letter reason stated or reliably inferable from a follow-up question; and correct discrimination between a genuine silent-letter exception and the reliable core on a mixed novel set, without loss of confidence in the reliable items. The stated-reason requirement on the hard/soft item is important precisely because, as noted above, a correct answer alone under-determines whether the rule or a guess produced it.

## Tutor Recovery Strategy

Generic engine: `../foundations/01-recovery-engine.md`. Concept-specific notes only:

- **"I thought c always said /k/"** — take this as evidence the reliable-core teaching succeeded rather than as a problem: the learner has correctly generalised from strong, valid evidence, and the response should validate this before narrowing it: "You're right that it almost always does — there's just one small check for two letters specifically." Framing the exception as rare and specific, rather than apologising for having "lied" about reliability, protects the learner's trust in the reliable-core teaching for every other letter.
- **"Now I don't trust any of the letters"** — the characteristic overcorrection after a silent-letter discovery, and it should be met with immediate, concrete reassurance rather than a general pep talk: name the actual size of the exception list ("there are only a handful of these — not hundreds") and return promptly to a reliable-core word to re-anchor confidence before continuing with exceptions.
- **The smaller question to shrink to**: from applying the hard/soft rule to a novel word, down to **a single, maximally clear contrastive pair already drilled** (cat vs. cent), asked to state which is hard and which is soft with the words visibly present. This removes the novel-application demand entirely and re-establishes that the *concept* of two sounds for one letter is intact before returning to unaided rule application.
- **Never shrink to "just say the sound you think is right."** This licenses guessing precisely where the rule-checking habit is what's actually being built.

## Memory Hooks

- **Concept type**: fact (the reliable single-consonant associations) plus a **procedural rule** (hard/soft c/g, following-letter check) plus a small **bounded exception list** (silent letters). All three need distinct review treatment.
- **Review form — the reliable core**: brief, high-frequency spaced retrieval, since these are simple paired associations with no internal structure to reconstruct.
- **Review form — the hard/soft rule**: review specifically on **novel words the learner has not seen the rule applied to before**, never on a fixed drilled set — reviewing only familiar hard/soft examples risks the rule quietly reverting to word-by-word memorisation without anyone noticing, exactly the failure mode TA-4 exists to prevent.
- **Review form — silent letters**: ordinary spaced recall of the specific list is appropriate here, since (unlike hard/soft c/g) there is no rule to keep exercising — the goal is simply retaining which specific words are exceptions.
- **Interleaving partners**: hard/soft items should be interleaved with reliable-core items throughout review (never blocked into an "exceptions" session), so the learner continually practises the *decision* of which category a given letter belongs to, not just the correct answer once the category is already known. Silent-letter items likewise should never be drilled as their own isolated block long enough to make the learner start expecting exceptions generally.

## Transfer Connections

- **Near**: `eng.phonics.consonant-blends` — the direct unlock, where letter *combinations* rather than single letters with a following-letter rule govern the sound; a learner secure in this concept's letter-by-letter reliability has a stable baseline against which blend behaviour reads as a clearly different, additional layer rather than more of the same unpredictability.
- **Near**: `eng.phonics.digraphs` (downstream in the KG) — digraphs are a further case where a fixed letter combination represents one sound, extending the "sometimes it's not simple one-letter-one-sound" theme this concept opens, in a structurally different way (two letters, one symbol) from hard/soft c/g (one letter, two possible sounds depending on context).
- **Far**: spelling — a learner who understands *why* c and g are soft in certain contexts (rather than only which specific words are soft) has a genuine predictive tool for spelling unfamiliar words correctly, not merely for reading them.
- **Real-world**: understanding loanwords and names — many soft-c/g exceptions and near-exceptions in English trace to French- or Latin-derived vocabulary, and a learner alert to the pattern has a head start on an enormous swath of everyday vocabulary (city, cent, circle, giant, gem, gym) without needing the etymology explained.
- **Expert transfer**: the durable skill is **distinguishing a predictable, rule-governed variation from a genuinely arbitrary exception, and applying the appropriate strategy (rule-derivation versus bounded memorisation) to each** — directly transferable to any domain with both regular patterns and irregular forms (verb conjugation, unit conversion with special-case exceptions, any classification system with a "usually, except for a short named list" structure).

## Cross-Subject Connections

KG records no `cross_links`. Honest assessment: this concept's cross-subject reach is limited and should not be inflated.

- **No genuine mechanism-level connection to mathematics, physics, chemistry, or biology.** Unlike the phonetics-domain concepts in this batch, this concept's content (letter-to-sound spelling conventions) is a fact about the English writing system specifically, with no underlying physical or scientific mechanism to link to. Stated explicitly, following this program's established practice of naming a genuine absence rather than manufacturing a connection to fill the section.
- **A structural, not subject-matter, parallel exists to mathematics — "usually true, with a small named exception set" reasoning** (see Transfer Connections' expert-transfer note) — this is a transferable reasoning pattern, not a KG-encodable subject link, and is recorded there rather than here.

## Blueprint References

Blueprint exists: `docs/curriculum/blueprints/eng.phonics.consonants.md`. Reused by reference, **not restated**:

- **Component 1 — Misconception Register**: both misconceptions' trigger signals, conflict evidence, bridge/replacement text, discrimination pairs. This entry adds birth-type classification and the teaching consequences that follow from type, including the distinction between rule-based and list-based repair strategies for the two misconceptions despite their shared birth type.
- **Component 2 — Prerequisite Diagnostic Block**: PD-1 and its fail-route to `eng.phonics.letter-sound-correspondence`.
- **Component 3 — Concrete Anchor**: the consonant sound wall script.
- **Component 4 — Conceptual Development Sequence**: TA-1…TA-5, including the deliberate deferral of "q" and "x" to `eng.phonics.consonant-blends`.
- **Component 5 — Worked Examples**: WE-1…WE-3.
- **Component 6 — Mastery Probe Set**: MP-1…MP-5, the item bank. This entry adds only the response-pattern reads.
- **Components 7–8**: session architecture, protocol routing (S0/S1/S6/S9, including L1 phoneme-transfer anticipation), and adaptive flags (hard/soft-as-rule framing, silent-letter scope-bounding, q/x deferral).

## Runtime Asset References

No seeded `AssetIdentity` records exist for this concept as of 2026-08-03. English carries no `HUMAN_CURATOR` authored-seed rows in production; existing English rows are `AI_AUTHORED` live-capture only (CLAUDE.md, AssetIdentity Global Audit). No assets created as part of authoring this entry.

## Curriculum Feedback

- **No missing cross-links identified.** Consistent with `eng.phonetics.ipa-basics` immediately upstream in this batch, this concept's content is a spelling-convention fact rather than a physical mechanism, and no genuine science-domain link was found or should be manufactured.
- **The Blueprint's explicit deferral of "q" and "x"** (Component 8) is a well-reasoned scoping decision, correctly avoiding dilution of the core 18-consonant reliable set with blend-like behaviour — noted here as a positive design finding, not a gap, and cross-referenced so a future author of `eng.phonics.consonant-blends` knows this deferral was deliberate.
- **`estimated_hours: 2` is plausible** for the reliable core and the hard/soft rule together, though as with several foundational phonics concepts in this program, true time-to-mastery for the hard/soft rule specifically depends heavily on how much contrastive-pair practice (TA-3) precedes the novel-word application task (TA-4) — a learner rushed through discovery is more likely to fall back on word-by-word memorisation, which would not fail MP-3 outright but would fail the stated-reason check this entry's Assessment Signals section identifies as necessary for genuine certification.

## Version History

- v1.0 (2026-08-03): Initial entry. Blueprint reused by reference (Components 1–8). 2 misconceptions classified by birth type, both Type 1 (overgeneralization) but requiring distinct repair strategies (rule-derivation vs. bounded-list memorisation). No missing cross-links found — recorded explicitly. 1 positive design finding (q/x deferral) recorded as Curriculum Feedback.
