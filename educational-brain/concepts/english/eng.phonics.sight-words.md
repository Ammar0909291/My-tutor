# High-Frequency Sight Words — `eng.phonics.sight-words`

## Identity

- **KG ID**: `eng.phonics.sight-words`
- **Name**: High-Frequency Sight Words
- **Domain**: English / Phonics
- **Difficulty**: foundational
- **Bloom level**: remember
- **Mastery threshold**: 0.80
- **Estimated hours**: 2
- **Requires**: `eng.phonics.letter-sound-correspondence` — load-bearing part: the learner must already have basic letter-sound pairs available to attempt decoding, since this concept's central move is testing whether a "sight word" can in fact be sounded out before treating it as an item for pure memorisation.
- **Unlocks**: `eng.phonics.decoding-fluency`
- **Cross-links**: `eng.vocab.word-recognition` — sight-word automaticity is the phonics-side foundation broader vocabulary-level word recognition builds on; this concept does not duplicate that broader content.
- **Blueprint**: `docs/curriculum/blueprints/eng.phonics.sight-words.md`

## Learning Objective

The learner can:
1. Correctly decode a phonetically regular high-frequency word by sounding it out, rather than assuming it must be memorised.
2. Correctly read a genuinely irregular high-frequency word, and identify which specific letter or letters behave unexpectedly.
3. Recognise a taught sight word rapidly from a brief exposure, confirmed by a full letter-by-letter check.
4. Discriminate between commonly confused "twin" word pairs (was/saw, there/three, what/that) by processing letter order, not overall shape.
5. Read taught sight words fluently within connected text, alongside decodable words.

## Core Understanding

"Sight word" is a **pedagogical category defined by frequency and the goal of automatic recognition, not a phonetic category defined by decodability** — and conflating the two is this concept's central hazard. A word earns "sight word" status because it appears often enough in text that instant, effortless recognition is worth building deliberately, independent of whether that word happens to be phonetically regular. Empirically, most high-frequency sight words (and, big, can, get, him, not) **are** fully regular and can be sounded out using ordinary letter-sound correspondences — they are taught as sight words purely because their frequency makes automaticity valuable, not because they resist decoding. A genuinely smaller subset (said, was, of, the, they, one) contain a real spelling-sound irregularity — one or more letters that do not behave as their ordinary correspondence would predict — and these specific irregular items require an element of direct memorisation *for the irregular part specifically*, while the rest of the word may still be perfectly regular. The second major structural fact is that automatic recognition, once built, must remain **letter-order-sensitive, not shape-based** — many high-frequency words share overall length, general shape, or a subset of letters with a different high-frequency word (was/saw, there/three, what/that), and true sight-word automaticity means fast-but-complete letter processing, never a fast-but-partial glance that guesses from shape, length, or an initial letter alone.

## Mental Models

**Beginner — "sight words are a special category of words that can't be sounded out; they just have to be memorised as shapes."**
The runnable simulation: encountering a word flagged as a "sight word," bypass decoding entirely and attempt to recall a memorised whole-word image. This model is not tutor-installed — it is a reasonable, if incorrect, inference from the *label* "sight word" itself, which sounds like it means "recognised by sight alone, not by sound." It fails specifically on the majority of sight words, which are in fact decodable.
*Upgrade trigger*: the Blueprint's own conflict evidence — attempting to sound out "and" and discovering it works perfectly well.
*Shelf-life warning at replacement*: "'Sight word' just means a common word we want you to recognise fast — it doesn't mean it can't be sounded out. Most of them actually can."

**Intermediate — "some sight words can be sounded out and some can't, and I check each one individually as I meet it."**
The simulation: for any given sight word, attempt to decode first; if it resolves correctly, treat it as regular; if it doesn't, flag it as one to memorise. This model has correctly abandoned the "all sight words are unreadable" assumption and has not yet built fast, automatic recognition for the words already confirmed regular — it still consciously re-decodes words it has, in principle, already resolved.
*Upgrade trigger*: repeated successful decoding of the same regular sight word across several encounters, at which point conscious re-decoding becomes unnecessary and should give way to instant recognition.
*Shelf-life warning*: "Checking each time is a great way to learn a new word. Once you've confirmed it a few times, you don't need to sound it out anymore — you'll just know it."

**Advanced — "sight-word fluency is fast, automatic, complete letter-by-letter recognition, built either directly (for regular words, via decoding-to-automaticity) or via targeted memorisation of the specific irregular element (for irregular words) — and recognition speed never comes at the cost of processing every letter in order."**
The simulation: any taught sight word is recognised instantly, and the learner can, on request, justify the recognition by reference to the full letter sequence rather than only a partial cue — critically, this holds even under the speed pressure that a flash-recognition task deliberately introduces. This is the target model, matching TA-3 and TA-4.
*Upgrade trigger*: encountering a genuinely novel twin-word pair not previously drilled, where shape-based recognition would produce a plausible-looking but wrong answer.
*Shelf-life warning*: "Fast doesn't mean sloppy. Every letter still counts, every time — speed comes from practice, not from skipping steps."

**Expert — "the sight-word/decodable-word distinction is itself provisional and skill-dependent; a fluent reader eventually recognises the vast majority of words 'by sight' in the sense of near-instant whole-word retrieval, having originally built that retrieval through decoding, so 'sight word' teaching is best understood as deliberately accelerating a process that will eventually happen for almost all words anyway."**
Named here to mark the arc; this concept's scope is the beginning-reader version of this idea (a deliberately curated high-frequency list), not the general theory of orthographic word recognition.

## Why Students Fail

The dominant failure mechanism is a **direct consequence of the category's own name** — "sight word" is genuinely ambiguous between "a word taught for fast sight-based recognition" (the correct reading) and "a word that can only be read by sight, not by sound" (the incorrect but linguistically plausible reading), and nothing about encountering the term for the first time disambiguates which is meant. This is not a reasoning error on the learner's part; it is an artefact of terminology that happens to support two readings, one of which is wrong for most of the words it will be applied to.

The second mechanism is that, once a learner has correctly abandoned blanket refusal-to-decode, **fast recognition is frequently built on partial cues (initial letter, overall length, general shape) that succeed often enough in early, low-stakes practice to feel adequate**, because the initial small set of taught sight words rarely contains a close "twin." The failure becomes visible only once a genuinely confusable pair is introduced or encountered in real text, at which point a shape-based strategy that has been "working" for weeks suddenly produces a specific, describable error (reading "was" as "saw," or vice versa) — and this delayed manifestation is precisely why deliberate twin-word contrast (TA-4) cannot be skipped in favour of assuming general practice will surface the issue on its own.

The third, less prominent mechanism is that **the irregular subset, if introduced without explicit boundaries, can trigger the same "the whole system is unreliable" overcorrection** already identified at `eng.phonics.consonants`' silent-letter exceptions — a learner who meets "said" or "was" without a clear sense that these are a small, bounded, specifically-flagged set may generalise doubt about decodability onto every subsequent sight word, including the majority that are genuinely regular.

## Misconceptions

The Blueprint's **Component 1 — Misconception Register** owns the trigger signals, conflict evidence, bridge/replacement text, and discrimination pairs for both entries below. Reused by reference; birth-type classification and teaching consequence added here.

### MC-SIGHT-WORDS-CANNOT-BE-SOUNDED-OUT-AT-ALL
*(Blueprint Component 1, MC-SIGHT-WORDS-CANNOT-BE-SOUNDED-OUT-AT-ALL — includes the and/was and big/the discrimination pairs.)*
- **Birth type**: Type 3 (language contamination) — the term "sight word" itself carries an ambiguous, misleading surface meaning that the learner reasonably but incorrectly resolves toward "unreadable by sound," directly paralleling the terminology-contamination pattern already identified at `eng.phonetics.speech-sounds-overview` (the word "sound" contaminated by letter-teaching practice) and now recurring at the category-label level rather than the individual-word level.
- **Teaching consequence of the birth type**: because the contamination is baked into the *name* of the category itself, the repair cannot rely on collision alone eventually resolving it through incidental exposure — it requires an explicit, early, direct redefinition of the term ("sight word" means fast+common, not unreadable), stated before the learner has a chance to settle on the plausible-but-wrong reading, exactly as the Blueprint's own bridge text does.
- **Verification of death**: given a genuinely novel word explicitly labelled a "sight word" for the first time, the learner's first move is an attempt to decode it, not an assumption of unreadability — evidence the corrected definition, not merely the specific drilled examples, has generalised.

### MC-MEMORIZING-THE-WORD-SHAPE-IS-ENOUGH
*(Blueprint Component 1, MC-MEMORIZING-THE-WORD-SHAPE-IS-ENOUGH.)*
- **Birth type**: Type 2 (perceptual intuition), reinforced by genuine early success — shape-, length-, or initial-letter-based recognition genuinely does produce correct answers on most early sight-word sets, since most early sets are chosen without close "twins," so the learner's evidence (this strategy has worked so far) is real, not imagined.
- **Teaching consequence**: because the strategy has been genuinely and repeatedly reinforced by success, the repair requires **deliberately constructed confusable evidence** (the twin-word pairs) rather than an appeal to accuracy or care — a learner told to "be more careful" without a concrete case where carelessness produces a specific, visible wrong answer has no actionable change to make, since their existing strategy hasn't yet failed them in a way they can perceive.
- **Verification of death**: correctly discriminates a genuinely novel twin-word pair (not previously drilled) under the same brief-exposure flash conditions used in TA-3/MP-3, rather than only under unhurried, careful reading — since the misconception's actual risk is specifically under speed pressure, where the shortcut is most tempting and least detectable to the learner themselves.

## Analogies

**Best — a nickname for a person versus verifying you have the right person by checking their full ID.** You call a close friend by a quick nickname without hesitation — that's fast, automatic recognition, the genuine goal. But if two people share a very similar nickname or look alike, you'd still check something more specific (a full name, a detail) before being certain — that's the letter-by-letter check twin-words require, done fast but not skipped.
*Breaking point*: nicknames are chosen by the person; word "nicknames" (fast whole-word recognition) are built by the reader's own practice, not assigned. Keep the analogy to the speed-versus-verification tension, not to the idea of naming.

**Alternative — recognising a friend's voice on the phone versus recognising a stranger's.** A close friend's voice, you recognise instantly, effortlessly — no conscious decoding needed. A stranger's, you listen more carefully, piece by piece. Sight words are meant to become like the close friend's voice: instant, but only after enough genuine exposure that the recognition is earned, not guessed.
*Breaking point*: voice recognition doesn't have an equivalent to the letter-order-reversal problem (was/saw) — useful for the automaticity half of this concept, not for the twin-word discrimination half.

**Story analogy — a word's "unreadable" label is like a warning sign that turns out to be overcautious.** A sign reading "difficult terrain ahead" might apply to only one small, specific patch of a mostly easy trail — treating the whole trail as difficult because of that one label would mean missing out on a lot of easy, walkable ground. Most sight words are the easy trail; only a few specific spots (the irregular subset) are the genuinely difficult terrain the label was actually warning about.
*Breaking point*: none serious; a reasonably close mapping to the actual regular/irregular proportion.

**Visual analogy — the word-card flash-and-check** (Blueprint Component 3), explicitly pairing a brief flash exposure with an immediate full letter-by-letter reveal, and explicitly including a "twin" word demonstration. Not a metaphor but the actual working instrument this concept's fluency-building is organised around.

### ANTI-ANALOGIES (do not use)

- **"Sight words are the words you just have to know."** Vague enough to support either reading of "sight word" (know how to decode it, or know it as a memorised shape) and resolves nothing — it will not counter MC-SIGHT-WORDS-CANNOT-BE-SOUNDED-OUT-AT-ALL because it doesn't take a position on decodability at all.
- **"Just glance at the shape and you'll know the word."** Directly installs MC-MEMORIZING-THE-WORD-SHAPE-IS-ENOUGH by name, instructing exactly the shortcut this concept exists to prevent.
- **"Irregular sight words are the ones that break all the rules."** Overstates the irregularity (typically one or two specific letters misbehave, not the whole word) and risks the same overcorrection flagged under Why Students Fail — better framed, per the Blueprint's own TA-2 instruction, as "which specific letter(s) behave unexpectedly," never as a wholesale rule-breaking event.

## Demonstrations

Prediction first in every case.

1. **The and-decoding attempt (learner activity).** Blueprint's own conflict evidence. *Predict first*: "Do you think 'and' can be sounded out, or does it have to be memorised because it's a sight word?" Then attempt /æ/-/n/-/d/ and confirm it resolves correctly.
2. **The word-card flash-and-check, including the twin-word demo (learner activity).** Blueprint Component 3 — full script there. *Predict first*, before the flash: "You're going to see this word for just a second — what do you think you'll catch?" Then, for the twin-word portion specifically: *predict first*, "Do you think 'was' and 'saw' will be easy or easy to mix up?"
3. **The "of" irregularity reveal (teacher-led, learner-resolved).** *Predict first*: "If you sounded out 'of' using the regular rule for 'f', what would you expect it to sound like? Now listen to how it's actually said." The gap between the predicted /ɒf/ and the actual /ʌv/ makes the specific irregularity (the "f" behaving as a voiced sound) concrete rather than abstract.
4. **The twin-word letter-by-letter check (learner activity, TA-4).** *Predict first*: "Before I show you either word — if you only glanced quickly, which one do you think you'd be more likely to mix up?" Then work through was/saw letter by letter, confirming or disconfirming the prediction.

## Discovery Questions

This concept is well suited to a **direct-instruction-first, discovery-confirms** pattern rather than open-ended discovery: the *category definition* ("sight word" means frequency-plus-automaticity, not unreadability) is a fact about pedagogical convention with nothing to discover, and should be stated early and explicitly (per the terminology-contamination repair above); but the **specific regular/irregular boundary for any given word**, and the **twin-word confusability**, are both genuinely discoverable from direct evidence the learner can generate themselves.

1. **Need**: "Some words are called 'sight words.' Does that mean none of them can be sounded out?"
2. **Playground**: attempt to decode several taught sight words freely, some of which will succeed and some of which won't.
3. **Invention**: "Which ones worked when you sounded them out, and which ones didn't quite match what you expected?" The learner sorts their own attempts into two piles.
4. **Collision**: for a word that didn't work (e.g., "of"), ask specifically which letter behaved unexpectedly, rather than accepting "the whole word is weird" as the conclusion.
5. **Formalization**: name the two categories — regular sight words (decodable, just taught for speed) and irregular sight words (a specific letter or letters need direct memorisation) — from the learner's own sorted evidence.
6. **Compression**: "Try to sound it out first. If most of it works but one part doesn't, that's the only part to memorise."

## Teaching Sequence

The pedagogical logic behind this arc:

- **Regular sight words (TA-1) are introduced before irregular ones (TA-2), and this ordering is deliberate and load-bearing** (the Blueprint's own sequencing) — establishing, on the very first examples, that most sight words *are* decodable directly counters MC-SIGHT-WORDS-CANNOT-BE-SOUNDED-OUT-AT-ALL before the learner has had a chance to form the opposite impression from an unlucky first encounter with an irregular word.
- **Each irregular word's specific misbehaving letter(s) must be flagged explicitly at introduction** (Blueprint's own TA-2 instruction and Component 8 adaptive flag) — introducing irregular words as an undifferentiated block to memorise wholesale would forfeit the phonics-based processing that is still available for the *regular* portion of each irregular word (e.g., in "said," only the vowel team "ai" is genuinely irregular; "s" and "d" behave exactly as expected).
- **Flash recognition with the letter-order check (TA-3) comes after both regular and irregular words have been introduced individually**, because it is a fluency-building and verification task applied across the whole taught set, not a vehicle for introducing new words — attempting it too early, before any words are individually secure, would conflate speed-building with initial acquisition.
- **Twin-word discrimination (TA-4) must come after general flash-recognition fluency is underway, specifically because the misconception it targets is invisible until a genuine confusable pair is deliberately introduced** — as established under Why Students Fail, shape-based recognition can appear to "work" for an extended period before a twin-word pair exposes it, so this task must be a deliberate, planned confrontation rather than left to incidental discovery in connected text.
- **Connected-text reading (TA-5) comes last**, integrating both regular and irregular taught words alongside genuinely decodable non-sight-word vocabulary, as the concept's culminating, most naturalistic application.

Turn-by-turn scripting, protocol routing, and adaptive flags: Blueprint **Component 7 — Session Architecture** and **Component 8 — Adaptive Flags** (in particular the "sight word ≠ unreadable" framing, explicit per-word irregular-letter flagging, deliberate twin-word paired practice, and the cross-link boundary with `eng.vocab.word-recognition`).

## Tutor Actions

In recommended order, from `../teaching-actions/`:

1. **Error Analysis** (TEST-THINKING) — the and-decoding attempt and the of-irregularity reveal both function as guided error analysis against the learner's own prior assumption (that the word can't be decoded, or will decode in a specific predictable way), made concrete through direct attempt rather than assertion.
2. **Matching** (DO) — the twin-word discrimination task (TA-4) is fundamentally a matching/discrimination action, and its bidirectional character (was→saw confusion and saw→was confusion are genuinely separate error directions worth checking independently) mirrors the diagnostic value already established for matching tasks elsewhere in this batch.
3. **Retrieval-Schedule Prompt** (TEST-THINKING) — the flash-and-check technique (TA-3) is, at bottom, a spaced/repeated-exposure retrieval task for a bounded high-frequency word set, and benefits from the same brief, frequent practice pattern already established for consonant and vowel sound retrieval.
4. **Game** (DO) — flash-card-style speed games are broadly appropriate here specifically because the target skill genuinely is speed (automatic recognition), unlike several concepts in this batch where speed pressure risks rewarding a shortcut — the chocolate-covered-broccoli guard still applies: any game-based recognition must be re-verified with a full letter-by-letter check (per TA-3's own design) before being certified as genuine automaticity rather than a lucky shape-guess.
5. **Prediction** (TEST-THINKING) — predicting decodability before attempting a new sight word, directly building the "try to sound it out first" standing habit this concept's replacement text specifies.

**Does not fit**: **Demonstration** in the proprioceptive sense used elsewhere in this batch — this concept is visual-word-recognition-based, not articulatory, so there is no physical test to demonstrate beyond the decoding attempt itself (already covered under Error Analysis and the demonstrations above). **Concept Map / Organize** as a primary action — a simple two-column regular/irregular sort suffices and does not warrant a dedicated concept-map artefact at this concept's scale.

## Voice Teaching Notes

This concept's core evidence is primarily **visual** (word recognition speed and accuracy from a printed card), with voice carrying the learner's spoken identification and any self-correction, making the balance closer to `eng.writing.handwriting-and-formation`'s pattern (voice reports on a mainly non-audio process) than to the purely auditory phonics concepts elsewhere in this batch.

What the ideal tutor perceives:

- **A confident answer produced faster than the flash exposure would allow for genuine full-word reading**, especially on a twin-word-eligible item. This is the auditory-timing signature of MC-MEMORIZING-THE-WORD-SHAPE-IS-ENOUGH: an answer that arrives too fast to have processed every letter is itself diagnostic, independent of whether that particular answer happens to be correct this time.
- **A brief pause before answering on a flashed word, followed by a correct answer, with the learner able to state the full letter sequence when asked afterward.** This is the target behaviour — fast, but verifiably complete — and should be explicitly praised as such rather than only the correctness of the final answer.
- **Attempted sounding-out on a regular sight word, gradually speeding up across repeated encounters of the same word.** This is the expected and healthy trajectory from decoding to automaticity (the Intermediate-to-Advanced model transition), and should not be rushed or discouraged even though the eventual target is instant recognition without audible sounding-out.
- **Refusal or a long stall before even attempting a newly-introduced word explicitly labelled a "sight word."** The direct behavioural signature of MC-SIGHT-WORDS-CANNOT-BE-SOUNDED-OUT-AT-ALL, distinguishable from a genuine decoding difficulty by the specific pattern of not attempting at all rather than attempting and getting it wrong.

**Load-bearing sentence, delivered slowly**: *"Sight word just means common and worth knowing fast — try sounding it out first, every time."*

## Assessment Signals

Item bank: Blueprint **Component 6 — Mastery Probe Set** (MP-1…MP-5). Response-pattern reads, which the Blueprint does not own:

- **Regular sight word (MP-1).** *Fast-correct via apparent instant recognition* → target state, provided it can be confirmed as genuine (see flash recognition below) rather than a lucky partial-cue guess. *Correct via audible sounding-out* → acceptable and expected mid-acquisition; not yet automaticity, but not a failure either.
- **Irregular sight word (MP-2).** This item explicitly asks the learner to identify *which* element is irregular, not merely to read the word correctly — a correct reading with no ability to name the specific irregular letter(s) indicates the word may have been previously memorised as an undifferentiated whole rather than processed with the "regular parts decoded, irregular part flagged" strategy this concept aims to build, and should be treated as partial, not full, evidence of the target skill.
- **Flash recognition (MP-3).** *Correct from the brief flash, confirmed by a subsequent full letter check that matches* → strong evidence of genuine, complete, fast processing. *Correct from the flash, but the subsequent full check reveals the learner cannot actually recall or verify the specific letters* → treat as **unverified** rather than passed; this is precisely the profile MC-MEMORIZING-THE-WORD-SHAPE-IS-ENOUGH predicts, where the final answer is right but for reasons other than complete letter processing.
- **Twin-word discrimination (MP-4).** *Correct, citing the differing letters or letter order as the reason* → the strongest possible evidence for this concept's second misconception's repair. *Correct with no stated reason* → treat as unverified per the same logic as the flash-recognition item, and follow up with a second, more time-pressured attempt on a different twin pair before certifying.
- **Explanation (MP-5).** Listen for whether the explanation correctly separates the two independent facts — that sight words are chosen for frequency (not decodability), and that only some are genuinely irregular — versus a response that conflates or drops one half.

**Mastery certification trigger**: correct decoding of a novel regular sight word; correct reading and irregular-letter identification for a taught irregular sight word; correct flash recognition on at least one item, confirmed by a subsequent full letter-by-letter check that matches the flash answer; correct discrimination of a novel or under-time-pressure twin-word pair with the differing letters cited as the reason; and an explanation that correctly separates frequency/automaticity from decodability. The confirmed-flash and stated-reason requirements are both essential, for the identical reason established at every other novel-application item in this batch: a correct final answer alone under-determines whether the target skill or a coincidentally-successful shortcut produced it.

## Tutor Recovery Strategy

Generic engine: `../foundations/01-recovery-engine.md`. Concept-specific notes only:

- **"I can't sound it out, it's a sight word"** — the characteristic refusal utterance for the first misconception, and it should be met not with reassurance but with an immediate, concrete counter-attempt: "Let's just try — sound it out with me right now" on a word the learner has not yet pre-judged as unreadable, converting the protest directly into disconfirming evidence rather than debating the claim in the abstract.
- **"I thought I knew that word"** after a twin-word confusion — take this as a genuinely accurate self-report (the learner likely *did* recognise something correctly, just not the right something) rather than a sign of not having studied enough, and redirect specifically to the letter-order check rather than to more general practice: "You did recognise something real about it — let's check exactly which letters, in exactly which order."
- **The smaller question to shrink to**: from flash recognition or twin-word discrimination, down to **untimed, full-view reading of a single, well-drilled regular sight word** (e.g., "big"), with no speed pressure and no confusable twin present. This removes both the automaticity demand and the discrimination demand entirely, re-establishing that the underlying decoding skill for the reliable core is intact before returning to the harder, combined fluency-and-discrimination tasks.
- **Never shrink to "just tell me the first letter and I'll help you guess the rest."** This directly licenses the partial-cue shortcut MC-MEMORIZING-THE-WORD-SHAPE-IS-ENOUGH consists of, precisely when the learner is already under difficulty and most likely to adopt whatever strategy is modelled for them.

## Memory Hooks

- **Concept type**: fact (the specific taught word list, and which are regular vs. irregular) plus a **fluency/automaticity skill** (fast, complete letter processing) plus, for the irregular subset specifically, a small **bounded exception list** requiring targeted memorisation of just the misbehaving element. All three need distinct review treatment, closely paralleling the three-way split already established at `eng.phonics.consonants` and `eng.phonics.short-vowels`.
- **Review form — regular sight words**: brief, high-frequency spaced retrieval, ideally transitioning from occasional audible sounding-out toward purely silent, instant recognition over successive reviews — the review schedule itself can track this transition by simply noting whether sounding-out is still occurring, without needing a separate instrument.
- **Review form — irregular sight words**: review specifically the *flagged irregular element* of each word, not the word as an undifferentiated whole — asking "which part of 'said' is the tricky part?" is a more diagnostic review item than simply asking the learner to read "said" correctly, since the latter can be passed by rote memorisation without the element-level awareness this concept aims to build.
- **Review form — twin-word discrimination**: review under genuine time pressure (a brief flash, not unhurried reading), since, as established above, the misconception this targets is specifically invisible under unhurried conditions — a review protocol that never re-creates speed pressure will not detect regression.
- **Interleaving partners**: regular and irregular sight words should always be interleaved in review, never blocked, so the learner continually practises the *decision* of which strategy (decode versus targeted memorisation) applies to a given word, mirroring the interleaving rationale already established for hard/soft c/g and closed-syllable/silent-e items elsewhere in this batch. Twin-word pairs should be interleaved with their own non-twin high-frequency neighbours (not drilled as an isolated "confusable words" block), so the learner does not learn to expect confusability generally.

## Transfer Connections

- **Near**: `eng.phonics.decoding-fluency` — the direct unlock, where the automaticity built here for a bounded high-frequency set generalises into the broader skill of fluent, effortless reading across a much wider vocabulary, most of which the learner will not have pre-memorised as an individual sight word.
- **Cross-link**: `eng.vocab.word-recognition` — per the KG's own encoded cross-link and the Blueprint's explicit boundary, this concept is the phonics-side foundation (letter-level automaticity for a specific curated list) that broader vocabulary-level word recognition (meaning, usage, context) builds on; this entry does not duplicate that content, consistent with the Blueprint's own adaptive flag.
- **Far**: silent reading comprehension generally — automatic sight-word recognition frees the same kind of working-memory capacity for meaning-making that automatic letter formation frees for composition (per the parallel argument already made at `eng.writing.handwriting-and-formation`), and sight words specifically matter here because they are, by construction, the words that would otherwise interrupt fluent reading most frequently if left un-automatised.
- **Real-world**: reading any dense, functional text quickly and accurately — road signs, forms, instructions — where high-frequency function words (and, the, of, was) appear constantly and where a stumble on any one of them disrupts comprehension of the whole sentence disproportionately to the word's own informational content.
- **Expert transfer**: the durable skill is **building targeted automaticity for a high-value, high-frequency subset of a larger skill domain, while correctly distinguishing which parts of that subset are governed by the domain's general rules versus which parts are genuine, bounded exceptions requiring separate handling** — the same strategic move used in learning a musical instrument's most common chord shapes, a new language's most frequent irregular verbs, or any skill domain with a Pareto-distributed frequency structure.

## Cross-Subject Connections

The KG records one `cross_links` entry, `eng.vocab.word-recognition`, already addressed fully under Transfer Connections above per the Blueprint's own explicit scope boundary — this section covers only genuinely different-*subject* connections, none of which the KG encodes.

- **No genuine mechanism-level connection to mathematics, physics, chemistry, or biology.** This concept's content (a curated high-frequency word list and the automaticity/decodability distinction) is a fact about English pedagogy and word-frequency distribution, not a physical mechanism — stated explicitly rather than manufactured, consistent with this program's established practice for concepts of this kind.
- **A structural parallel to Pareto/frequency-distribution reasoning exists in mathematics and statistics** (see Transfer Connections' expert-transfer note) — genuinely abstract and not a KG-encodable subject link; recorded there, not here.

## Blueprint References

Blueprint exists: `docs/curriculum/blueprints/eng.phonics.sight-words.md`. Reused by reference, **not restated**:

- **Component 1 — Misconception Register**: both misconceptions' trigger signals, conflict evidence, bridge/replacement text, discrimination pairs. This entry adds birth-type classification and the teaching consequences that follow from type, identifying the first misconception as a category-label-level instance of the terminology-contamination pattern already found at `eng.phonetics.speech-sounds-overview`.
- **Component 2 — Prerequisite Diagnostic Block**: PD-1 and its fail-route to `eng.phonics.letter-sound-correspondence`.
- **Component 3 — Concrete Anchor**: the word-card flash-and-check script, including the twin-word demonstration.
- **Component 4 — Conceptual Development Sequence**: TA-1…TA-5.
- **Component 5 — Worked Examples**: WE-1…WE-3.
- **Component 6 — Mastery Probe Set**: MP-1…MP-5, the item bank. This entry adds only the response-pattern reads.
- **Components 7–8**: session architecture, protocol routing (S0/S1/S6/S9, including anticipation of non-alphabetic-L1 learners finding the sight-word category less intuitive), and adaptive flags ("sight word ≠ unreadable" framing, per-word irregular-letter flagging, twin-word paired practice, the word-recognition cross-link boundary).

## Runtime Asset References

No seeded `AssetIdentity` records exist for this concept as of 2026-08-03. English carries no `HUMAN_CURATOR` authored-seed rows in production; existing English rows are `AI_AUTHORED` live-capture only (CLAUDE.md, AssetIdentity Global Audit). No assets created as part of authoring this entry.

## Curriculum Feedback

- **No missing cross-links identified beyond the one already encoded and correctly scoped.** The KG's single cross-link (`eng.vocab.word-recognition`) is genuine, well-placed, and already respected by the Blueprint's own explicit boundary — a positive finding, in contrast to the missing-link findings recorded at several phonetics-domain concepts in this batch.
- **Terminology-contamination pattern, now identified at the category-label level, not just the individual-word or individual-symbol level.** This concept's first misconception is caused by the term "sight word" itself, extending the pattern already found at `eng.phonics.rhyming` (spelling), `eng.phonetics.articulation-organs` (the diagram), and `eng.phonetics.ipa-basics` (the notation's visual resemblance to letters) to a new source: a pedagogical *category name* that happens to support a plausible but incorrect reading. Recorded as a further data point for the domain-wide notation/terminology audit already recommended to the Curriculum Production Pipeline at `eng.phonetics.ipa-basics`.
- **`estimated_hours: 2` is plausible** for the core regular/irregular distinction and initial flash-recognition work, and likely optimistic for the twin-word discrimination habit to become genuinely robust under time pressure — consistent with the general pattern, noted at several concepts in this batch, that habits requiring performance under speed or fatigue take measurably longer to consolidate than the underlying conceptual distinction they are built on.

## Version History

- v1.0 (2026-08-03): Initial entry. Blueprint reused by reference (Components 1–8). 2 misconceptions classified by birth type; the first identified as a category-label-level instance of the recurring terminology-contamination pattern. Existing cross-link confirmed correctly scoped, no missing links found. Terminology-contamination pattern data point and duration-estimate observation recorded as Curriculum Feedback.
