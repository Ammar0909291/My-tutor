# Consonant and Vowel Digraphs — `eng.phonics.digraphs`

## Identity

- **KG ID**: `eng.phonics.digraphs`
- **Name**: Consonant and Vowel Digraphs
- **Domain**: English / Phonics
- **Difficulty**: foundational
- **Bloom level**: apply
- **Mastery threshold**: 0.80
- **Estimated hours**: 2
- **Requires**: `eng.phonics.consonant-blends`, `eng.phonics.short-vowels` — load-bearing part: consonant-blends supplies the slow-sounding-out test and the direct experience of a visually-identical category (two adjacent consonant letters) that behaves oppositely; short-vowels supplies the vowel-sound vocabulary and the felt sense that a vowel's sound can be determined by surrounding spelling structure, both of which this entry extends to a new letter-combination category.
- **Unlocks**: `eng.phonics.syllable-types`
- **Cross-links**: (none in the KG)
- **Blueprint**: `docs/curriculum/blueprints/eng.phonics.digraphs.md`

## Learning Objective

The learner can:
1. Produce the single, correct sound for a common consonant digraph (sh, ch, th [voiced and voiceless], wh, ph, ck), treating it as one unit.
2. Read words containing consonant digraphs, correctly treating the digraph as one sound rather than two.
3. Apply the slow-sounding-out test to distinguish a digraph (one merged sound) from a blend (multiple separate sounds), on both familiar and novel two-letter combinations.
4. Read a regular vowel digraph (ai, ay, ea, ee, oa, ow) using the "two vowels go walking, the first one does the talking" pattern.
5. Recognise a small set of vowel-digraph exception words (said, bread, head, again) where the usual long-first-vowel pattern does not hold.

## Core Understanding

A **digraph** is two letters representing **one single, new sound** — the structural and behavioural opposite of a blend (`eng.phonics.consonant-blends`), which is two letters representing two separately-pronounced sounds. "Sh" is not /s/ followed by /h/; it is /ʃ/, a single sound that resembles neither letter alone — and this is the concept's central, load-bearing fact, made more consequential by the fact that blends and digraphs are **visually indistinguishable**: both are simply two adjacent consonant letters on the page, and nothing about spelling alone signals which behaviour applies until the combination is actually sounded out. The concept's second major structural fact is an important **asymmetry in reliability between the two digraph categories**: **consonant digraphs** (sh, ch, th, wh, ph, ck) are highly reliable — each one almost always produces its one expected sound, regardless of the surrounding word — while **vowel digraphs** (vowel teams like ai, ay, ea, ee, oa, ow) are meaningfully **less** reliable, following a real, common, and genuinely useful default pattern — informally, "when two vowels go walking, the first one does the talking," meaning the *first* vowel typically supplies its own long sound while the second is silent (rain → long /eɪ/; boat → long /oʊ/) — but with a specific, bounded set of common exception words (said, bread, head, again) where this pattern does not hold. This asymmetry is not a flaw in the teaching; it is an accurate description of a genuine difference in how reliably these two digraph sub-categories actually behave in real English, and treating vowel digraphs with the same absolute confidence appropriate to consonant digraphs would itself be a teaching error.

## Mental Models

**Beginner — "a digraph is basically a blend — two consonant letters, each keeping its own sound."**
The runnable simulation: encountering two adjacent consonant letters, apply the blend strategy just secured at the immediately prior concept — sound out each letter separately, then speed up while keeping both. This model is not tutor-installed — it is the direct, reasonable, and almost inevitable carryover of freshly-learned prior knowledge to a category that looks visually identical and arrives immediately afterward in the curriculum.
*Upgrade trigger*: the Blueprint's own conflict evidence — attempting "s" then "h" separately for "sh," then saying "ship" naturally and discovering only one sound is actually produced.
*Shelf-life warning at replacement*: "Blends and digraphs look exactly the same on the page. This one behaves the opposite way — both letters become one brand-new sound, not two kept separate."

**Intermediate — "I can distinguish blends from digraphs using the slow-sounding-out test, and I expect vowel digraphs to behave exactly as reliably as consonant digraphs."**
The simulation: correctly apply the discrimination test to consonant combinations and, having just secured a highly reliable pattern (consonant digraphs), extend the same expectation of near-perfect reliability to vowel digraphs, since nothing yet distinguishes the two sub-categories' expected trustworthiness.
*Upgrade trigger*: the Blueprint's own conflict evidence — reading "rain" and "said" and discovering "ai" does not produce the same sound in both, despite both being genuine vowel digraphs.
*Shelf-life warning*: "Consonant digraphs you can trust almost completely. Vowel digraphs are a strong first guess with some real, common exceptions — a genuinely different, less absolute kind of pattern."

**Advanced — "consonant digraphs are highly reliable one-sound units, distinguished from blends by the slow-sounding-out test; vowel digraphs follow the long-first-vowel default with a small, bounded, learnable exception list — and the same discrimination test applies to both categories on any novel combination."**
The simulation: given any novel two-letter combination, the learner applies the slow test to determine blend-versus-digraph status, and, for a confirmed vowel digraph, applies the long-first-vowel default while remaining alert for a known exception. This is the target model, matching TA-3 and TA-5.
*Upgrade trigger*: `eng.phonics.syllable-types` (the direct unlock), where vowel digraphs are formally named as one of several syllable-type categories (alongside closed, open, r-controlled, consonant-le) that jointly determine vowel sound from syllable structure.
*Shelf-life warning*: "Vowel teams are one whole category of syllable type. There are several more, each with its own signal to check for — this is the second one you've learned, after silent e."

**Expert — "the specific consonant and vowel digraphs used in Modern English orthography trace to a mix of genuine historical sound-representation choices and, for vowel teams especially, the Great Vowel Shift's effect of decoupling spelling (fixed earlier) from pronunciation (which continued to change), producing today's comparatively unreliable vowel-team correspondences alongside the much more stable consonant-digraph conventions."**
Named here to mark the arc; this belongs to the historical account already flagged as beyond scope at `eng.phonics.long-vowels-silent-e`, and the reliability asymmetry this concept teaches as an observed fact is, at the expert level, a direct consequence of that same historical process.

## Why Students Fail

The dominant failure mechanism is **immediate, high-salience negative transfer from the concept the learner has just completed** — unlike most instances of prior-knowledge overgeneralisation in this program, which arise from a pattern learned some time earlier and applied too broadly, this misconception arises from a strategy secured in the *immediately preceding* concept, still maximally fresh and available, being applied to visually identical material one lesson later. This makes the error unusually likely by default rather than merely possible, and the Blueprint's own Component 8 flag ("blend vs. digraph confusion is expected, not unusual... assume this confusion by default") correctly treats it as the expected starting state rather than an unusual error to watch for.

The second mechanism, once the blend/digraph discrimination is secure, is the now-familiar **overcorrection risk applied to a genuine reliability asymmetry rather than a genuine rule-versus-exception split**: unlike `eng.phonics.consonants`' or `eng.phonics.long-vowels-silent-e`'s rule-plus-bounded-exception-list structure, vowel digraphs are honestly *less reliable as a category*, not merely subject to a short memorised exception list on top of an otherwise-perfect rule — a learner accustomed, by this point in the curriculum, to every "rule" turning out to have a small, bounded exception list (hard/soft c/g plus silent letters; CVCe plus have/give/love) may reasonably but incorrectly expect the same clean structure here, when the actual epistemic status of the vowel-digraph pattern is genuinely weaker: a strong default with real, non-exhaustively-listable unreliability, closer to "usually works, stay flexible" than to "always works except for this specific list."

The third mechanism, specific to L1-transfer learners, is that some digraph sounds correspond to phonemic distinctions a learner's first language may not make (voiced/voiceless "th," or the /w/-/v/ contrast affecting "wh" in some dialects and L1 backgrounds) — a predictable, systematic substitution pattern rather than a general difficulty with the digraph concept itself, and the Blueprint's own S9 routing correctly anticipates specific, targeted discrimination practice as the appropriate response rather than generic additional drilling.

## Misconceptions

The Blueprint's **Component 1 — Misconception Register** owns the trigger signals, conflict evidence, bridge/replacement text, and discrimination pairs for both entries below. Reused by reference; birth-type classification and teaching consequence added here.

### MC-DIGRAPH-IS-A-BLEND
*(Blueprint Component 1, MC-DIGRAPH-IS-A-BLEND — includes the sh/ship-vs-sp/spin and th/this-vs-tw/twin discrimination pairs.)*
- **Birth type**: Type 1 (overgeneralization), of a strategy secured at the immediately prior concept, and notable among the overgeneralisation instances catalogued across this program for the unusual freshness and immediacy of the source knowledge — most overgeneralisations in this program draw on knowledge secured well before the concept where they surface; this one draws on knowledge secured in the literal previous lesson.
- **Teaching consequence of the birth type**: because the source strategy (the slow-to-fast blend technique) is itself correct and valuable, and remains correct for every genuine blend the learner will continue to meet, the repair must **sharply distinguish when the technique applies from when it doesn't**, never suppress the technique itself — the Blueprint's own physical card-slide instrument (Component 3), contrasting a digraph's merge with a blend's retained-both-sounds slide in the same demonstration, is exactly the right tool for this, since it makes the *behavioural* difference visible using the *same* physical action (sliding two cards together) applied to both categories.
- **Verification of death**: given a novel two-consonant-letter combination not previously drilled as either category, the learner applies the slow test and correctly classifies it without first attempting to apply the blend technique by default — the *order of operations* (test first, then choose a strategy) is the actual evidence, not merely the eventual correct classification.

### MC-VOWEL-DIGRAPHS-FOLLOW-SHORT-VOWEL-RULES
*(Blueprint Component 1, MC-VOWEL-DIGRAPHS-FOLLOW-SHORT-VOWEL-RULES — includes the rain/said and boat/bread discrimination pairs. Note: despite its name, this misconception's actual content, per the Blueprint's own trigger signal and bridge text, concerns over-rigid application of *either* a short-vowel expectation *or* an over-confident long-first-vowel expectation — the shared root error is treating vowel-team behaviour as more absolute than it genuinely is.)*
- **Birth type**: Type 1 (overgeneralization), but of a structurally different and more consequential kind than the parallel exception-list misconceptions elsewhere in this program — here the learner over-generalises not a rule-with-exceptions but a *reliability level* (near-total, as with consonant digraphs) onto a category that is genuinely, honestly less reliable, meaning the correct target state is not "learn the short exception list" but "hold the whole category with appropriately reduced confidence."
- **Teaching consequence**: because the target state is a *calibrated confidence level* rather than a memorised list, the repair cannot be fully resolved by teaching a fixed exception set (though TA-5 does teach the most common ones) — it requires the more general, more durable habit the Blueprint's own replacement text specifies: "try the long-first-vowel-sound pattern, but stay ready to adjust," which is a standing verification stance, not a completed, closed piece of knowledge.
- **Verification of death**: given a genuinely novel vowel-team word not in the drilled exception set, the learner applies the long-first-vowel default as a first guess but readily revises it (rather than insisting on it) if the tutor confirms the word doesn't actually follow it in real speech — the *willingness to revise a confident default*, on ambiguous or unfamiliar material, is the actual target evidence, distinct from and harder to achieve than correctly sorting an already-known set of exception words.

## Analogies

**Best — a card-slide where the cards fuse into one new card, versus a card-slide where both cards remain, just moved close together.** The Blueprint's own Component 3 anchor is already an analogy in physical form: sliding "s" and "h" together and having them become a single new symbol /ʃ/, contrasted directly against sliding "s" and "p" together where both /s/ and /p/ remain fully present and audible. This is the strongest available instrument precisely because it uses the *same physical action* to produce two visibly different outcomes, mapping directly onto the auditory distinction.
*Breaking point*: none serious; this is the concept's own designed core instrument rather than a supplementary metaphor.

**Alternative — two chemical elements combining into a genuinely new compound, versus two elements simply placed side by side in a mixture.** Combining hydrogen and oxygen produces water — a new substance with different properties from either starting element (a digraph). Placing two marbles side by side in a jar leaves both marbles fully intact and separately identifiable (a blend).
*Breaking point*: a chemical compound's new properties are a real, deep, causal transformation; a digraph's "new" sound is simply conventional, not caused by any interaction between the letters themselves — useful for the *fusion produces something genuinely new* intuition, not for implying any causal mechanism.

**Story analogy — for vowel digraphs specifically, a reliable friend who is nearly always on time, versus one who's usually on time but occasionally, for a few specific and known reasons, isn't.** Consonant digraphs are the first friend; vowel digraphs are the second — worth trusting as a strong default, while keeping in mind the small, specific set of times they don't come through.
*Breaking point*: none serious; a reasonably close mapping to the reliability-asymmetry insight this concept's second misconception's repair depends on.

**Visual analogy — "two vowels go walking, the first one does the talking"** (Blueprint Component 4's own mnemonic rhyme). Not a novel analogy authored here, but worth flagging as the standing, revisitable mnemonic this concept's vowel-digraph half is organised around, explicitly paired, per Component 8, with equally explicit acknowledgment of its exceptions.

### ANTI-ANALOGIES (do not use)

- **"A digraph is like a compound word for sounds."** "Compound word" implies the combination is built from two recognisable, meaning-bearing parts joined together, which is not how digraphs work — "sh" is not "s-plus-h" in any compositional sense; it is a single, conventionally-assigned sound that happens to be written with two letters. This framing risks the learner searching for a compositional relationship between the letters and the resulting sound that does not exist.
- **"Vowel digraphs work exactly like consonant digraphs, just with vowels instead."** Directly installs the reliability-asymmetry misconception by asserting parity between two categories this concept's Core Understanding specifically distinguishes as behaving with meaningfully different reliability.
- **"If a two-letter combination looks like a digraph, just trust it."** "Looks like" reintroduces a visual, appearance-based judgement precisely where this concept (like `eng.phonics.consonant-blends` before it) requires an *auditory* test — visual familiarity cannot distinguish a blend from a digraph, since both look identical, and cannot distinguish a reliable vowel digraph from an exception either.

## Demonstrations

Prediction first in every case.

1. **The merge-into-one card-slide (learner activity).** Blueprint Component 3 — full script there, contrasting "s"+"h" against "s"+"p". *Predict first*, before each slide: "Do you think both sounds will stay, or will they turn into one new sound?"
2. **The sh/sp slow-test collision (teacher-led, learner-resolved).** *Predict first*: "Say 'sh' slowly — do you think you'll hear an /s/ then an /h/, or just one sound the whole time?" Then stretch it and confirm together.
3. **The rain/said collision (teacher-led, learner-resolved).** Blueprint's own conflict evidence for the second misconception. *Predict first*: "Both of these words have 'ai' — do you think the vowel sound will be the same in both?" Then read both aloud and let the mismatch register.
4. **The novel-combination challenge (learner activity, TA-3).** *Predict first*, for a genuinely unfamiliar two-consonant-letter pair: "Blend or digraph — what's your guess, and how will you check?" — deliberately eliciting a stated test procedure, not just an eventual answer.

## Discovery Questions

Following the pattern established at `eng.phonics.consonant-blends`, the **specific inventory of which combinations are digraphs (versus blends) is a fixed, conventional fact, surveyed directly**, but the **discrimination test itself — and, separately, the reliability-asymmetry insight for vowel digraphs — are both genuinely well suited to guided discovery**.

1. **Need**: "'sh' and 'sp' both look like two consonant letters together. Do they behave the same way when you say them?"
2. **Playground**: the learner slowly sounds out a handful of familiar two-consonant combinations from both categories (sh, sp, ch, cl) freely.
3. **Invention**: "Which ones turned into one new sound, and which ones kept both sounds separate?" The learner sorts their own examples using the just-applied slow test — this reuses and extends the identical discovery sequence already run at `eng.phonics.consonant-blends`, now with the category boundary approached from the opposite direction.
4. **Collision (vowel digraphs)**: introduce "said" immediately after the learner has extracted the "two vowels go walking" pattern from regular examples (rain, boat) — does the pattern hold here too? It does not, motivating the reliability-asymmetry insight as a discovered, felt fact rather than an asserted caveat.
5. **Formalization**: name the two categories (again, from the opposite direction of `eng.phonics.consonant-blends`) and name the reliability asymmetry between consonant and vowel digraphs specifically.
6. **Compression**: "Say it slowly. One new sound means digraph. For vowel teams, trust the first-vowel pattern as a strong guess — but stay ready to adjust."

## Teaching Sequence

The pedagogical logic behind this arc:

- **Consonant digraph sound production (TA-1) comes before consonant digraphs in words (TA-2), which comes before the blend/digraph re-discrimination task (TA-3)** — this mirrors the identical sequencing logic already established at `eng.phonics.consonant-blends`: perceptual/production security on isolated material before the harder discrimination task, and before that discrimination task is asked to override the maximally fresh, high-interference blend strategy.
- **The blend/digraph re-discrimination (TA-3) is deliberately framed as continuing and extending the identical test first built at `eng.phonics.consonant-blends`, not as a new, unrelated skill** — the Blueprint's own TA-3 language ("reinforcing and extending the discrimination first built in eng.phonics.consonant-blends") makes this continuity explicit, and it matters pedagogically: presenting this as a genuinely new test to learn, rather than the same test now applied bidirectionally, would forfeit the transfer value of the immediately preceding concept's hard-won discrimination skill.
- **Vowel digraphs (TA-4, TA-5) are introduced only after the consonant-digraph half of this concept is secure**, and the regular long-first-vowel pattern (TA-4) is established before the exception words (TA-5) — this is the by-now well-established rule-before-exceptions sequencing principle this program has confirmed at multiple prior concepts, here applied across the concept's two major sub-categories (consonant, then vowel) as well as within the vowel-digraph half itself.
- **The reliability-asymmetry insight is not delivered as an abstract warning before any evidence, but discovered directly from the rain/said contrast (TA-5)**, exactly as established under Discovery Questions above — stating the asymmetry as a caveat before the learner has felt a genuine counterexample would risk it being received as pedantic hedging rather than as a discovered, motivated fact about how the category actually behaves.

Turn-by-turn scripting, protocol routing, and adaptive flags: Blueprint **Component 7 — Session Architecture** and **Component 8 — Adaptive Flags** (in particular the reliability-asymmetry framing, the merge-vs-slide reinforcement instrument, the "two vowels go walking" mnemonic paired with explicit exceptions, and L1 phoneme-contrast transfer anticipation for S9 learners).

## Tutor Actions

In recommended order, from `../teaching-actions/`:

1. **Demonstration** (SHOW) — the merge-into-one card-slide, contrasted directly against a blend slide, and the rain/said and boat/bread contrasts, all benefiting from being heard aloud, with the card-slide ideally learner-performed.
2. **Matching** (DO) — the blend/digraph re-discrimination task (TA-3) is fundamentally a matching/classification action, directly extending the identical action already established at the prior concept, now exercised bidirectionally with a wider, mixed set of combinations.
3. **Prediction** (TEST-THINKING) — the novel-combination challenge and the vowel-digraph rain/said prediction both directly exercise the target discrimination and calibration skills.
4. **Error Analysis** (TEST-THINKING) — presenting a digraph sounded out as two separate letters (a puppet's or peer's hypothetical error, not the learner's own live one) as a flaw to identify, directly practising the discrimination MC-DIGRAPH-IS-A-BLEND's repair targets.
5. **Concept Map** (ORGANIZE) — a three-category sort (consonant digraph / blend / vowel digraph, with a fourth sub-note for known vowel-digraph exceptions), consolidating the full set of distinctions this concept and its immediate prerequisite jointly establish into one compact artefact.

**Does not fit**: **Worked Example** in the derivation sense — no multi-step calculation exists, only a perceptual test better served by Demonstration and Matching. **Game** before the blend/digraph discrimination is independently secure — speed pressure risks reinforcing exactly the fresh, high-interference blend-strategy default this concept's first misconception consists of.

## Voice Teaching Notes

This concept's core evidence is **audio**, closely paralleling `eng.phonics.consonant-blends`: the critical diagnostic difference between a merged digraph sound and a two-sound blend attempt is directly audible, and — as with the blend concept — the runtime's plain-text STT capture gap (`../foundations/03-voice-first-learning-model.md §7`) is directly relevant, since a transcription-only channel receiving "sip" cannot distinguish a genuine attempt at that word from a dropped- or mis-merged-digraph attempt at "ship" without the missing acoustic detail.

What the ideal tutor perceives:

- **An audible two-part attempt on a digraph** ("s" then "h" produced as genuinely separate, sequential sounds rather than one merged sound). The direct auditory signature of MC-DIGRAPH-IS-A-BLEND, and — unlike the equivalent blend error (a dropped sound producing a different real word) — this error often produces a sound that isn't a real word at all, which can make it easier to notice than the blend concept's parallel error, but should still be checked explicitly rather than assumed self-evident.
- **A confident long-vowel production on a genuine vowel-digraph exception word**, forcing the long-first-vowel pattern onto "said" or "bread." The direct auditory signature of MC-VOWEL-DIGRAPHS-FOLLOW-SHORT-VOWEL-RULES, distinguishable from a simple unfamiliarity error by the learner's apparent confidence and lack of self-correction.
- **A hesitant, checking pause on a genuinely unfamiliar vowel-team word, followed by either the default long-vowel attempt or a correction if the resulting sound doesn't match a known word.** This is the target calibrated-confidence behaviour — trying the default, but remaining open to revision — and should be named and reinforced explicitly when observed, exactly as the equivalent behaviour is praised at `eng.phonics.short-vowels` and `eng.phonics.long-vowels-silent-e`.
- **Systematic, dialect-consistent substitution on a specific digraph sound** (e.g., "th" consistently produced as /s/ or /d/ across multiple words, rather than inconsistently). The direct behavioural signature of L1 phoneme-contrast transfer (per the S9 routing), distinguishable from random error by its consistency, and should route to targeted discrimination practice on that specific contrast rather than general digraph review.

**Load-bearing sentence, delivered slowly**: *"Say it slowly — one new sound means digraph, and for vowel teams, trust the pattern but stay ready to adjust."*

## Assessment Signals

Item bank: Blueprint **Component 6 — Mastery Probe Set** (MP-1…MP-5). Response-pattern reads, which the Blueprint does not own:

- **Consonant digraph production (MP-1).** *Fast, correct, single-sound production* → strong basic evidence, though, as with the equivalent finding at `eng.phonics.consonant-blends`, this alone cannot rule out a lucky, familiarity-based guess on a frequently-drilled digraph.
- **Blend vs. digraph, novel pair (MP-2).** This item explicitly requires classifying *two* combinations (one blend, one digraph) in the same probe, which is well-designed: a learner who correctly classifies only one of the two, or classifies both the same way, reveals a genuine, specific discrimination failure a single-item probe would miss.
- **Vowel digraph, regular pattern (MP-3).** Carries similar limited weight to MP-1 on its own — correct production on a regular pattern word does not, by itself, distinguish "correctly applying the calibrated default" from "having simply memorised this specific word."
- **Vowel digraph exception (MP-4).** This is this concept's most diagnostic single item for the second misconception, precisely because — per the Blueprint's own careful phrasing — it explicitly requires "reasoning explicitly checked rather than blindly applying the rule." A correct identification with no stated reasoning should be treated as weaker evidence than one where the learner explicitly notes the mismatch between expected and actual sound.
- **Explanation (MP-5).** Listen for whether the explanation states the definitional difference (digraph = one new sound; blend = multiple separate sounds) *and*, separately, whether a follow-up probe reveals awareness of the vowel-digraph reliability asymmetry — the Blueprint's own MP-5 targets only the first; this program's response-pattern practice recommends a follow-up question ("are vowel digraphs and consonant digraphs equally reliable?") to fully verify the second misconception's repair, since the base MP-5 item alone would not detect it.

**Mastery certification trigger**: correct, single-sound production of a novel consonant digraph; correct classification of both members of a novel blend/digraph pair in the same item; correct application of the long-first-vowel default on a novel regular vowel-team word; correct identification of a novel exception word as a genuine exception, with stated reasoning (mismatch between expected and actual sound) rather than bare recognition; and an explanation covering both the blend/digraph distinction and the reliability asymmetry between consonant and vowel digraphs specifically. The reliability-asymmetry component of the final explanation is essential and not fully captured by the Blueprint's own MP-5 wording alone — see Curriculum Feedback below.

## Tutor Recovery Strategy

Generic engine: `../foundations/01-recovery-engine.md`. Concept-specific notes only:

- **"But I just learned to keep both sounds!"** — the characteristic protest given the freshness and immediacy of the interfering prior knowledge; take this at face value as evidence the prior learning succeeded, and respond by preserving rather than contradicting it: "You did, and that's exactly right for blends — you're going to keep using that. This one just happens to work the opposite way, and the only way to tell which is which is the same slow test you already know how to do."
- **"First you said the rule works, now it doesn't?"** — the vowel-digraph reliability-asymmetry overcorrection, and it should be met with the specific, honest framing this concept's Core Understanding establishes rather than a general reassurance: "This rule really is a bit different from the others — it's a strong guess that usually works, not a promise that always works. That's genuinely less tidy than some of the other rules you've learned, and it's worth knowing that up front."
- **The smaller question to shrink to**: from full classification or reading, down to **the merge-into-one card-slide on a single, maximally familiar digraph, with the tutor performing the slide and the learner only confirming "one sound or two?"** This removes the production and classification demands entirely, isolating the most basic perceptual judgement before returning to the harder combined tasks.
- **Never shrink to "just try to remember whether this specific pair was a blend or a digraph."** This licenses memorisation over the slow test precisely where generalisation to novel combinations is the actual target skill.

## Memory Hooks

- **Concept type**: fact (which specific combinations are consonant digraphs) plus a **discrimination procedure** (the slow test, extending the identical skill from `eng.phonics.consonant-blends`) plus a **calibrated-confidence rule** (the vowel-digraph default, genuinely distinct in kind from a simple rule-plus-exception-list structure).
- **Review form — consonant digraphs**: brief, high-frequency spaced retrieval, since these are simple, highly reliable associations with minimal internal structure to reconstruct.
- **Review form — the blend/digraph discrimination**: review using genuinely novel combinations on a rotating basis, always paired (one blend, one digraph per review set), mirroring the diagnostic design already identified as strong in MP-2 above.
- **Review form — vowel digraphs**: review must include both regular-pattern and exception items in every cycle, and — distinctively for this concept relative to other rule-plus-exception concepts in this program — should periodically include a genuinely ambiguous or unfamiliar vowel-team word with no confirmed classification, specifically to check whether the learner's calibrated-confidence stance (try the default, stay open to revision) persists, rather than only checking recall of an already-settled classification.
- **Interleaving partners**: `eng.phonics.consonant-blends` items should continue to be interleaved directly with this concept's consonant-digraph items, exactly as recommended at the prior concept itself, since the discrimination between the two categories is a single, shared, standing skill neither concept can fully maintain in isolation. `eng.phonics.short-vowels`' closed-syllable and `eng.phonics.long-vowels-silent-e`'s CVCe items should be periodically interleaved with vowel-digraph items, since all three are instances of the same broader "syllable structure determines vowel sound" principle this concept's direct unlock (`eng.phonics.syllable-types`) will formally unify.

## Transfer Connections

- **Near**: `eng.phonics.syllable-types` — the direct unlock, formally naming vowel digraphs (vowel-team syllables) as one of several syllable-type categories alongside closed and CVCe syllables already established, and extending the same "check the structure, predict the sound" strategic habit this concept and its prerequisites have progressively built.
- **Near**: `eng.phonics.consonant-blends` — the shared prerequisite relationship is genuinely bidirectional in maintenance terms even though unidirectional in the KG's dependency graph: this concept's core discrimination skill is a direct extension of that concept's, and both benefit from continued joint practice rather than either being considered independently "finished."
- **Far**: `eng.writing.spelling-strategies` — a learner who understands *why* certain sound-to-spelling mappings are more reliable than others (consonant digraphs, near-total; vowel digraphs, strong-default-with-exceptions; hard/soft c/g, rule-governed; silent letters, arbitrary list) has a genuinely calibrated, differentiated toolkit for spelling unfamiliar words, rather than a single undifferentiated "sound it out" strategy applied with uniform confidence regardless of the actual reliability of the pattern involved.
- **Real-world**: understanding and correctly pronouncing unfamiliar proper nouns and loanwords, where vowel-team-style spellings are especially prone to genuine irregularity (place names, surnames) — a learner who has internalised "vowel teams are a strong guess, not a certainty" approaches such words with appropriately calibrated confidence rather than either false certainty or unwarranted anxiety.
- **Expert transfer**: the durable skill is **holding two structurally similar-looking categories to different, empirically-warranted confidence levels, rather than assuming uniform reliability because the categories look alike** — the same epistemic discipline required in evaluating two apparently similar scientific claims that actually rest on different strengths of evidence, or two historical sources that look equally authoritative but warrant different degrees of trust.

## Cross-Subject Connections

KG records no `cross_links`. Honest assessment, consistent with the other phonics-domain (as opposed to phonetics-domain) concepts in this program: this concept's cross-subject reach is limited.

- **No genuine mechanism-level connection to mathematics, physics, chemistry, or biology.** This concept's content (English digraph spelling and pronunciation conventions) does not describe a physical mechanism the way the phonetics-domain concepts in this batch do — stated explicitly, following established practice for this category of concept.
- **A structural parallel to calibrated confidence in categorical reasoning exists broadly across scientific and historical epistemics** (see Transfer Connections' expert-transfer note) — a genuine reasoning-skill transfer, not a KG-encodable subject-matter link.

## Blueprint References

Blueprint exists: `docs/curriculum/blueprints/eng.phonics.digraphs.md`. Reused by reference, **not restated**:

- **Component 1 — Misconception Register**: both misconceptions' trigger signals, conflict evidence, bridge/replacement text, discrimination pairs. This entry adds birth-type classification and the teaching consequences that follow from type, identifying the first misconception's unusual freshness/immediacy as a source (drawing on knowledge from the literal preceding lesson) and clarifying the second misconception's actual target as a calibrated-confidence stance rather than a completable exception list.
- **Component 2 — Prerequisite Diagnostic Block**: PD-1 and PD-2 and their fail-routes to `eng.phonics.consonant-blends` and `eng.phonics.short-vowels` respectively.
- **Component 3 — Concrete Anchor**: the merge-into-one card-slide script, contrasted against a blend slide.
- **Component 4 — Conceptual Development Sequence**: TA-1…TA-5, including the "two vowels go walking" mnemonic.
- **Component 5 — Worked Examples**: WE-1…WE-3.
- **Component 6 — Mastery Probe Set**: MP-1…MP-5, the item bank. This entry adds only the response-pattern reads, including a recommended follow-up probe to fully verify the reliability-asymmetry component of MP-5's explanation target.
- **Components 7–8**: session architecture, protocol routing (S0/S1/S6/S9, including L1 phoneme-contrast transfer anticipation), and adaptive flags (reliability-asymmetry framing, merge-vs-slide reinforcement, mnemonic-plus-exceptions framing).

## Runtime Asset References

No seeded `AssetIdentity` records exist for this concept as of 2026-08-03. English carries no `HUMAN_CURATOR` authored-seed rows in production; existing English rows are `AI_AUTHORED` live-capture only (CLAUDE.md, AssetIdentity Global Audit). No assets created as part of authoring this entry.

## Curriculum Feedback

- **No missing cross-links identified**, consistent with `eng.phonics.consonant-blends` and the other phonics-domain concepts in this program — this concept's content is a spelling/pronunciation convention rather than a physical mechanism.
- **MP-5's target response does not fully capture the second misconception's repair on its own.** The Blueprint's own MP-5 asks only for the blend/digraph definitional distinction; verifying the reliability-asymmetry insight (this entry's second misconception) requires a follow-up probe not currently in the mastery probe set. Recommended for the Curriculum Production Pipeline's consideration as an addition to Component 6; recorded here, not added to the Blueprint directly.
- **The "fresh, immediately-preceding-concept" source of the first misconception** is a genuinely distinct sub-pattern within the broader overgeneralisation category this program has catalogued, worth flagging to the Pipeline as a specific authoring consideration: concepts immediately following a closely-related prior concept in the same domain should proactively anticipate this kind of high-salience, high-immediacy negative transfer, treating it as the expected default (as this Blueprint already correctly does) rather than a remediation-only contingency.

## Version History

- v1.0 (2026-08-03): Initial entry. Blueprint reused by reference (Components 1–8). 2 misconceptions classified by birth type; the second clarified as targeting a calibrated-confidence stance distinct from a completable exception list. No missing cross-links found — recorded explicitly. MP-5 coverage gap and fresh-negative-transfer authoring pattern recorded as Curriculum Feedback.
