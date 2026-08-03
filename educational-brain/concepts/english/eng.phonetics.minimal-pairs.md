# Minimal Pairs — `eng.phonetics.minimal-pairs`

## Identity

- **KG ID**: `eng.phonetics.minimal-pairs`
- **Name**: Minimal Pairs
- **Domain**: English / Phonetics
- **Difficulty**: developing
- **Bloom level**: apply
- **Mastery threshold**: 0.75
- **Estimated hours**: 2
- **Requires**: `eng.phonetics.ipa-basics` — load-bearing part: the learner must already be able to transcribe a word into IPA fluently and by ear, since this concept's entire method depends on comparing two transcriptions symbol-by-symbol rather than judging similarity by spelling or overall impression.
- **Unlocks**: `eng.phonetics.phonetic-transcription`, `eng.listening.distinguishing-sounds-in-speech`
- **Cross-links**: (none in the KG)
- **Blueprint**: `docs/curriculum/blueprints/eng.phonetics.minimal-pairs.md`

## Learning Objective

The learner can:
1. Determine, by transcribing both words into IPA, whether a given pair of words is a true minimal pair (differing in exactly one phoneme, same position) or not.
2. Correctly classify a pair as a minimal pair, a homophone pair (zero difference), or neither, resisting spelling-based judgements in both directions.
3. Discriminate perceptually between the two members of a minimal pair from spoken input alone, with no spelling shown.
4. Generate a valid minimal-pair partner for a given word by changing exactly one phoneme.
5. Identify or generate a minimal pair that isolates a specific, named phoneme contrast.

## Core Understanding

A **minimal pair** is a precisely defined diagnostic instrument, not a loose description of "similar-sounding words": two words that differ in **exactly one phoneme, in the same position, with every other sound identical**. This precision is not pedantry — it is what gives the tool its diagnostic power. A pair differing in two or more sounds conflates multiple contrasts and cannot isolate which specific distinction a learner can or cannot perceive or produce; a true minimal pair (ship/chip, differing only in the initial consonant) isolates one contrast cleanly, making it possible to test, train, or certify exactly that one perceptual or articulatory distinction with nothing else varying to confound the result. The concept's second structural fact follows directly from everything established at `eng.phonetics.ipa-basics`: minimal-pair status is a fact about **sound**, determined by transcription, and is **completely independent of spelling**. This produces two systematic traps, both consequences of the same underlying independence: words that look very different in spelling can be pronounced identically (night/knight — homophones, zero phoneme difference, therefore *not* a minimal pair, despite intuitively "feeling" like a contrastive pair to a learner who hasn't transcribed them) and words that look similar in spelling can differ in far more than one sound (though/through — visually close, phonetically unrelated). Genuine minimal pairs exist specifically to be used diagnostically: as a perception-training tool for hearing a difficult contrast, or as a production target for practising it, and the concept's ultimate purpose (TA-5) is applying this precise tool to a learner's own known difficult contrast.

## Mental Models

**Beginner — "a minimal pair is any two words that sound pretty similar."**
The runnable simulation: given two words, judge similarity impressionistically and label anything close enough a "minimal pair." This is not tutor-installed; it is a reasonable, informal reading of "minimal" as "small difference" without the specific technical meaning (exactly one phoneme) attached.
*Upgrade trigger*: the Blueprint's own conflict evidence — transcribing "cat" and "bad" and discovering they differ in two positions, not one, despite feeling similar.
*Shelf-life warning at replacement*: "'Similar' isn't precise enough. We need exactly one sound different, in the same spot — everything else has to match exactly."

**Intermediate — "I can count phoneme differences by transcribing both words, but I sometimes still let spelling nudge my initial guess."**
The simulation: correctly apply the transcribe-and-compare procedure when prompted, but arrive at the task with a spelling-based expectation that occasionally survives the check unexamined (assuming "knight" must differ from "night" because more letters are present, or that visually similar words must be close in sound). This model has the *procedure* right and has not yet fully displaced the *prior* the procedure is meant to override.
*Upgrade trigger*: the night/knight homophone case, or the though/through near-miss — both specifically engineered to contradict a spelling-based prior even when the correct procedure is nominally being followed.
*Shelf-life warning*: "The transcription is the answer, not just a check on your first guess. Let it override whatever the spelling suggested."

**Advanced — "minimal-pair status is determined solely by counting phoneme differences via transcription, is independent of spelling in either direction, and the tool exists to isolate one specific contrast for targeted perception or production work."**
The simulation: given any two words, the learner transcribes, compares position-by-position, and correctly classifies the result — and, crucially, can work in the *other* direction, generating a valid partner for a given word or a given target contrast on demand. This is the target model, matching TA-4 and TA-5.
*Upgrade trigger*: multi-syllable words, where minimal-pair judgements must also account for stress placement (a genuine complication beyond this concept's core scope, connecting forward to `eng.phonetics.syllable-stress`).
*Shelf-life warning*: "This works cleanly for the words we've been using. Longer, multi-syllable words add one more thing to check — where the stress falls — which is its own concept."

**Expert — "minimal pairs are the standard empirical method linguists use to establish which sound distinctions are phonemically contrastive (versus merely allophonic) in a given language, and the specific pairs a curriculum selects for a given learner are themselves diagnostic of that learner's particular L1-transfer profile."**
Named here to mark the arc; this belongs to phonology proper and to individualised pronunciation-coaching practice, both beyond this concept's foundational scope.

## Why Students Fail

The dominant failure mechanism is that **"minimal" is used informally elsewhere in everyday language to mean "small" or "slight," and the learner's most available prior meaning for the word gets imported wholesale**, producing a judgement based on overall impression of closeness rather than the specific, countable, positional definition this concept requires. This is a definitional precision problem, not a perceptual one — the learner may be perfectly capable of transcribing both words correctly and still apply an informal, impressionistic standard when deciding whether the result "counts."

The second mechanism is the now-familiar notation-versus-appearance failure, here in its most acute form yet in this batch: because English spelling and pronunciation are only loosely coupled, a learner's spelling-based intuition about similarity is **actively anti-correlated with correctness** in the specific cases (homophones spelled very differently; near-homographs pronounced very differently) that this concept deliberately foregrounds as its primary teaching examples — meaning the learner's most natural first guess is systematically wrong exactly where the concept is testing hardest.

The third mechanism is that the perceptual half of this concept (TA-3, auditory-only discrimination with no spelling shown) draws on a genuinely different skill from the analytical half (TA-1/TA-2, transcribe-and-compare) — a learner who can flawlessly determine minimal-pair status from written transcriptions may still be unable to reliably *hear* the difference live, in real time, with no written support, particularly for a contrast their own L1 does not distinguish; conflating "can analyse on paper" with "can perceive by ear" risks certifying a skill that has not actually been built.

## Misconceptions

The Blueprint's **Component 1 — Misconception Register** owns the trigger signals, conflict evidence, bridge/replacement text, and discrimination pairs for both entries below. Reused by reference; birth-type classification and teaching consequence added here.

### MC-ANY-SIMILAR-WORDS-ARE-MINIMAL-PAIRS
*(Blueprint Component 1, MC-ANY-SIMILAR-WORDS-ARE-MINIMAL-PAIRS — includes the cat/bad and ship/chop discrimination pairs.)*
- **Birth type**: Type 3 (language contamination) — the everyday, informal meaning of "minimal" (slight, small) contaminates the term's precise technical definition here, a close structural cousin of the "sight word" category-label contamination already identified at `eng.phonics.sight-words`, though the specific contaminating source differs (an everyday adjective's meaning, rather than a compound term's surface-plausible alternate reading).
- **Teaching consequence of the birth type**: because the contamination comes from the term itself rather than from any misleading evidence, the repair requires an explicit, early, precise redefinition — stated as a countable rule ("exactly one position, verified by transcription"), not as a comparative adjective ("very similar") — exactly as the Blueprint's own bridge text does, and exactly as the terminology-contamination repairs elsewhere in this program have required.
- **Verification of death**: given a pair that feels intuitively "close" but differs in two phoneme positions, the learner correctly rejects it as a minimal pair after transcribing, rather than accepting the impressionistic closeness as sufficient — the rejection, specifically against a felt-similar pair, is the diagnostic evidence, not acceptance of an obviously-different pair.

### MC-SPELLING-DIFFERENCE-EQUALS-SOUND-DIFFERENCE
*(Blueprint Component 1, MC-SPELLING-DIFFERENCE-EQUALS-SOUND-DIFFERENCE.)*
- **Birth type**: Type 4 (notation-induced) — reasoning from spelling's surface appearance rather than from the sound it represents, the same generic failure shape already flagged repeatedly across this program's phonetics-domain concepts (`eng.phonics.rhyming`, `eng.phonetics.articulation-organs`, `eng.phonetics.ipa-basics`), now recurring at what is arguably its most consequential site: this concept's entire diagnostic value depends on the learner having fully displaced spelling as evidence, since minimal pairs are frequently chosen or encountered specifically because their spelling misleads.
- **Teaching consequence**: given how frequently this exact repair strategy (ground the judgement in transcription, never in spelling) has already succeeded elsewhere in this program, the same approach applies directly and with high confidence here — but with added urgency, since this is the concept where the stakes of the misconception surviving are highest (a learner who reverts to spelling-based judgement here cannot use minimal pairs diagnostically at all, defeating the concept's entire purpose).
- **Verification of death**: correctly classifies both a homophone pair spelled very differently (night/knight — zero difference, not a minimal pair, despite different spelling) and a near-homograph pair pronounced very differently (though/through — several differences, not a minimal pair, despite similar spelling) in the same session, without a spelling-based hedge on either judgement.

## Analogies

**Best — a scientific control in an experiment.** A minimal pair is like two identical experimental setups that differ in exactly one controlled variable — everything else held constant — which is precisely what lets you attribute any observed difference in outcome (perception, production difficulty) to that one variable alone. Change two things at once, and you can no longer tell which one caused the effect.
*Breaking point*: experimental variables are continuous and can be finely tuned; phoneme differences are categorical (a sound either matches or it doesn't). Keep the analogy to the *isolating-one-variable* logic, not to any implied continuity.

**Alternative — a "spot the difference" puzzle with a strict one-difference rule.** Ordinary spot-the-difference puzzles often have several differences; imagine a stricter version of the game where exactly one, and only one, detail may differ between two otherwise-identical pictures — that is the discipline a minimal pair imposes on two words' sound sequences.
*Breaking point*: visual spot-the-difference puzzles show all differences simultaneously and statically; a minimal pair's single difference must be extracted from a temporally unfolding, transient auditory signal, which is genuinely harder.

**Story analogy — a locksmith testing which single pin in a lock is faulty.** To isolate the one faulty pin, a locksmith changes exactly one pin at a time and tests the result — changing several pins simultaneously would leave no way to know which change fixed (or broke) anything. This maps closely onto why TA-5's targeted-contrast generation task matters: minimal pairs let a tutor isolate exactly the one "pin" (phoneme contrast) a specific learner struggles with.
*Breaking point*: none serious; a close structural mapping to the diagnostic-isolation purpose.

**Visual analogy — the one-slot-swap game** (Blueprint Component 3): three IPA "slots" for a word, with exactly one slot physically swapped to produce a genuine minimal pair, versus two slots swapped to produce a non-pair. Not a metaphor but the actual working instrument this concept's early teaching is organised around, and it should remain the standing reference whenever the "exactly one" rule needs re-grounding.

### ANTI-ANALOGIES (do not use)

- **"Minimal pairs are words that almost rhyme."** Rhyme concerns only the rime (vowel-plus-ending); a minimal pair can differ at the *onset* (ship/chip) with the rime identical, or differ in the vowel with both onset and coda identical (pen/pin) — the two concepts overlap only coincidentally and conflating them will produce systematic errors in exactly the cases where the differing phoneme is not at the word's end.
- **"Minimal pairs are just word families, like 'cat,' 'bat,' 'hat,' 'mat.'" ** A word family built by varying the onset while holding the rime constant does produce a set of pairwise minimal pairs, but presenting the *family* framing risks the learner concluding any two words drawn from a family-style list automatically qualify, without checking — precisely the shortcut MC-ANY-SIMILAR-WORDS-ARE-MINIMAL-PAIRS consists of. Safe only if every pairwise comparison is still individually verified by transcription.
- **"If two words look almost the same when written, they're probably a minimal pair."** Directly installs MC-SPELLING-DIFFERENCE-EQUALS-SOUND-DIFFERENCE, in the exact form this concept's second misconception takes.

## Demonstrations

Prediction first in every case.

1. **The one-slot-swap game (learner activity).** Blueprint Component 3 — full script there. *Predict first*, before each swap: "If I change just this one slot, what word do you think we'll get? And if I change two, do you think it'll still count as a minimal pair with the original?"
2. **The cat/bad collision (teacher-led, learner-resolved).** Blueprint's own conflict evidence. *Predict first*: "Do you think 'cat' and 'bad' are a minimal pair?" Then transcribe both and count differing positions together.
3. **The night/knight homophone reveal (teacher-led, learner-resolved).** *Predict first*: "These are spelled very differently — do you think that means they're a strong minimal pair, a weak one, or not a pair at all?" Then transcribe both to /naɪt/ and reveal the zero-difference result.
4. **The blind listening test (learner activity, TA-3).** *Predict first*: "Without seeing either word written down, do you think you'll be able to tell 'ship' from 'chip' just by ear?" Then run the actual auditory-only discrimination task.

## Discovery Questions

The **precise definition itself is best delivered directly** (there is nothing to discover about the convention that "minimal" means "exactly one phoneme" — it is a technical term with a fixed meaning, told once, clearly, per the Blueprint's own bridge text), but the **two systematic spelling traps are excellent discovery material**, since the learner can generate the disconfirming evidence themselves from words they already know.

1. **Need**: "If two words look really different when spelled, does that mean they must sound really different too?"
2. **Playground**: the learner examines a handful of familiar homophone pairs (their/there, to/too/two) and familiar near-homograph pairs (though/through) freely, without being told which category either belongs to.
3. **Invention**: "Sort these into 'sound the same' and 'sound different,' ignoring the spelling completely." The learner discovers, from their own examination, that spelling similarity and sound similarity are only loosely related.
4. **Collision**: apply the exactly-one-phoneme test specifically to a pair the learner has just sorted — do any of the "sound the same" pairs actually differ by zero phonemes (homophones, not minimal pairs) versus one (true minimal pairs)?
5. **Formalization**: name the precise category — a minimal pair differs by exactly one phoneme, verified by transcription, and is neither a homophone (zero difference) nor a loosely-similar pair (two or more differences).
6. **Compression**: "Transcribe first. Count the differences. Exactly one, or it doesn't count."

## Teaching Sequence

The pedagogical logic behind this arc:

- **True-pair identification (TA-1) comes before the spelling-trap material (TA-2)**, and this ordering is deliberate: the learner must first be secure in the mechanical procedure (transcribe both words, count differing positions) on relatively transparent examples before that procedure is asked to override a strong, misleading spelling-based intuition — attempting the spelling traps before the counting procedure itself is fluent would compound two sources of difficulty simultaneously.
- **Written/analytical work (TA-1, TA-2) precedes auditory-only perception training (TA-3)**, matching the general principle already established at several concepts in this batch: the *concept* of what a minimal pair is should be secure on the page before the *harder, real-time* skill of perceiving the contrast live, with no written support, is attempted — conflating acquisition of the definition with acquisition of the perceptual skill would make it unclear which difficulty a given failure reflects.
- **Generation (TA-4) comes after recognition (TA-1–TA-3) is secure**, following the same recognition-before-generation sequencing already justified at `eng.phonics.rhyming` — generating a valid partner from scratch is a harder retrieval operation than judging a supplied pair, and should not be asked for until the underlying definition and the transcribe-and-compare procedure are both fluent.
- **Targeted-contrast work (TA-5) comes last and is explicitly personalised** (per the Blueprint's own S9 protocol routing and Component 8 adaptive flag) — this is the concept's actual payoff, connecting the abstract skill back to a concrete, individually relevant application (the learner's own known difficult contrast), and it should not be attempted until every preceding skill is independently secure, since it compounds all of them.

Turn-by-turn scripting, protocol routing, and adaptive flags: Blueprint **Component 7 — Session Architecture** and **Component 8 — Adaptive Flags** (in particular the precision-is-the-point framing, the transcribe-before-judging standing habit, the necessity of auditory-only practice, and the S9 personalised-contrast-targeting flag).

## Tutor Actions

In recommended order, from `../teaching-actions/`:

1. **Error Analysis** (TEST-THINKING) — the cat/bad and night/knight collisions both function as guided error analysis against the learner's own plausible-but-incorrect first judgement, made concrete through direct transcription and counting rather than assertion.
2. **Matching** (DO) — the auditory-only discrimination task (TA-3) is fundamentally a matching action (heard word to written label), and it is this concept's most direct test of genuine perceptual, rather than merely analytical, mastery.
3. **Prediction** (TEST-THINKING) — predicting minimal-pair status before transcribing, and predicting the auditory outcome before listening, both directly exercise the target skills and surface the learner's untested prior before it is confirmed or disconfirmed.
4. **Concept Map** (ORGANIZE) — a simple three-category sort (true minimal pair / homophone, zero difference / neither, two-or-more differences) built from a mixed set of examples, giving the learner a compact artefact distinguishing the three possible outcomes this concept's classification task can produce.

**Does not fit**: **Demonstration** in the proprioceptive sense — the sounds themselves were already established at earlier phonetics concepts; what's new here is a comparative, analytical procedure, better exercised through Error Analysis and Matching than through physical demonstration. **Game**, with a specific caution unlike the more permissive treatment at `eng.phonics.sight-words`: a fast-paced minimal-pair-spotting game risks rewarding quick, spelling-based impression over the slower, transcription-verified judgement this concept's precision requirement depends on — safe only once the transcribe-and-verify habit is independently confirmed secure.

## Voice Teaching Notes

This concept has a genuinely **split evidence profile**: the analytical half (TA-1, TA-2, TA-4) is primarily written/transcription-based, while the perceptual half (TA-3) is purely auditory and is, in fact, one of the few points in this program's English authoring where the runtime's plain-text STT capture gap (per `../foundations/03-voice-first-learning-model.md §7`) is directly load-bearing: the entire diagnostic value of TA-3 depends on the *learner's* perception of a spoken stimulus, not on anything the tutor needs to hear from the learner beyond their final identification.

What the ideal tutor perceives, specifically for the auditory-perception half:

- **Confident, immediate identification on the auditory task.** Strong positive evidence of genuine perceptual discrimination, distinct from and not guaranteed by success on the written transcription tasks.
- **Hesitation or a guess-then-self-correct pattern specifically on a contrast the learner's own L1 does not distinguish** (per the S9 routing) — this is expected, diagnostic, and should be met with validation rather than surprise: "That contrast is genuinely hard if your first language doesn't use it — that's exactly why we practise it specifically."
- **Confident but wrong identification, delivered with no apparent uncertainty.** On the auditory task specifically, this is more informative than a hesitant wrong answer — it suggests the learner may not yet perceive the contrast as a contrast at all (the two sounds may be perceptually merged for them), which is a different and generally harder-to-repair state than simple uncertainty, and should route to substantially more targeted TA-5-style practice on that specific contrast.

**Load-bearing sentence, delivered slowly**: *"Transcribe first, count the differences — never trust a spelling-based guess for this one."*

## Assessment Signals

Item bank: Blueprint **Component 6 — Mastery Probe Set** (MP-1…MP-5). Response-pattern reads, which the Blueprint does not own:

- **True/false minimal-pair classification (MP-1).** *Correct, with a visible or stated transcription step* → strong evidence of the target procedure. *Correct with no stated reasoning* → treat as unverified per this program's now-standard practice for novel-application items; a correct classification could reflect a lucky impressionistic guess rather than the verified procedure, and should be followed up before certifying.
- **Spelling trap (MP-2).** This is the item type that most directly discriminates genuine mastery from a merely-procedural but not-yet-trusted skill — a learner who correctly resolves the route/root dialect-dependent case (acknowledging pronunciation, not spelling, as the deciding factor) has demonstrated the concept's core insight in its hardest form.
- **Auditory discrimination (MP-3).** *Fast-correct* → genuine perceptual mastery, the concept's most valuable and hardest-to-fake evidence. *Slow-correct, with an audible self-correction or hedge* → the contrast is perceptible but not yet automatic; expected mid-acquisition, particularly for an L1-relevant difficult contrast, and should prompt continued TA-3/TA-5-style practice rather than being treated as failure.
- **Generation (MP-4).** As at `eng.phonics.rhyming`, count the *number and validity* of distinct single-phoneme changes the learner is willing to attempt, not merely whether one correct answer is produced — a learner offering only one memorised-feeling example has weaker evidence of genuine generative fluency than one who readily proposes several different valid changes (onset, vowel, coda) for the same source word.
- **Explanation (MP-5).** Listen specifically for whether the explanation names the *diagnostic purpose* (isolating one contrast for targeted testing/training) alongside the definition — a response that states the one-phoneme-difference rule correctly but cannot say *why* that precision matters has learned the rule without its rationale, which risks the rule feeling arbitrary rather than purposeful under later difficulty.

**Mastery certification trigger**: correct true/false classification of a novel pair with the transcription step demonstrated or reliably inferable; correct resolution of a genuine spelling-trap pair (either direction — homophone-despite-different-spelling, or non-pair-despite-similar-spelling); correct, ideally fast, auditory-only discrimination on a novel pair; successful generation of at least two distinct valid single-phoneme-change partners for a novel word; and, for a learner with a known L1-relevant difficult contrast, at least one correctly identified or generated minimal pair targeting that specific contrast.

## Tutor Recovery Strategy

Generic engine: `../foundations/01-recovery-engine.md`. Concept-specific notes only:

- **"But they sound so close, why doesn't that count?"** — take this as a genuine, reasonable objection to the concept's precision requirement, not as resistance, and answer it by returning directly to the diagnostic-purpose rationale rather than merely restating the rule: "Closeness is exactly why we need to be strict — if we let 'close enough' count, we couldn't tell which one specific sound you're actually working on." Validating the frustration paired with the concrete purpose is more effective than authority alone.
- **"I can't hear the difference at all"** on the auditory task, particularly for a known L1-non-contrastive pair — validate this explicitly and immediately as expected and specifically why this practice exists, per the S9 routing, rather than as a sign something has gone wrong: "That's completely normal if your first language treats those as the same sound — this is exactly the kind of practice that builds the new distinction."
- **The smaller question to shrink to**: from full classification or generation, down to **the one-slot-swap game's simplest form** — a single, already-correct minimal pair with the one differing slot pointed to directly, asked only "is this one slot, or two?" This removes both the transcription-production demand and the auditory-discrimination demand, isolating the core counting judgement, and re-establishes the definition before returning to the harder combined tasks.
- **Never shrink to "just go with what sounds similar to you."** This is precisely the informal-similarity standard MC-ANY-SIMILAR-WORDS-ARE-MINIMAL-PAIRS consists of, and falling back to it under difficulty actively undoes the concept's central precision requirement.

## Memory Hooks

- **Concept type**: procedure (transcribe-and-compare, applied bidirectionally to recognition and generation) built on a precise fact-like definition, plus a genuinely separate **perceptual skill** (auditory discrimination) that does not automatically follow from analytical mastery.
- **Review form — the definition and procedure**: spaced classification items specifically including both spelling-trap directions (homophone-despite-different-spelling; non-pair-despite-similar-spelling) in every review cycle, never only the more transparent true/false items, mirroring the diagnostic emphasis already established in Assessment Signals.
- **Review form — the perceptual skill**: review must include genuine auditory-only items with no written support, on a schedule independent of the analytical items' review — an analytical-only review regimen will look like strong retention while the perceptual skill, which decays through disuse like any perceptual discrimination, quietly weakens unnoticed.
- **Concept-specific deviation**: for a learner with an identified L1-relevant difficult contrast, that specific contrast's minimal pairs deserve a standing, elevated review priority relative to the general taught set, since this is the concept's actual highest-value long-term application (per TA-5) and the contrast most likely to regress without continued, targeted exposure.
- **Interleaving partners**: `eng.phonetics.ipa-basics` transcription items should continue to be interleaved here, since this concept's entire method depends on that skill remaining fluent — allowing IPA fluency to lapse while continuing minimal-pair practice would silently degrade this concept's foundation. True minimal pairs, homophone pairs, and clearly-non-minimal pairs should always be interleaved together in any review set, never blocked by category, so the learner continually practises the classification judgement itself rather than only confirming an already-known category.

## Transfer Connections

- **Near**: `eng.phonetics.phonetic-transcription` and `eng.listening.distinguishing-sounds-in-speech` — both direct unlocks draw explicitly on the transcribe-and-compare procedure and the auditory discrimination skill this concept builds, respectively.
- **Far**: `eng.phonetics.syllable-stress` — as noted under Mental Models, multi-syllable minimal-pair judgements must also account for stress placement, connecting this concept's core skill forward to a genuinely new complication once monosyllabic examples are no longer the only case.
- **Real-world**: pronunciation coaching and accent-reduction work generally, where minimal pairs are the standard practical tool for isolating and drilling a specific difficult contrast — a learner who understands *why* the pairs used in such training must be true minimal pairs (not merely similar-sounding words) is equipped to evaluate whether a given pronunciation resource is actually well-designed.
- **Real-world**: understanding and correctly using rhyming dictionaries, pronunciation guides, and any resource that distinguishes homophones from near-homophones — the night/knight-style trap this concept deliberately confronts is exactly the kind of confusion such resources are designed to resolve.
- **Expert transfer**: the durable skill is **isolating a single controlled variable for diagnostic testing, by first converting an ambiguous or misleading surface representation into a precise, comparable one** — directly transferable to any domain requiring controlled comparison (a scientific experiment's single-variable design, debugging code by changing one variable at a time, or comparing two data sets that differ on several confounded dimensions at once).

## Cross-Subject Connections

KG records no `cross_links`. A genuine, if abstract, connection exists:

- **Mathematics/logic — controlled comparison and variable isolation.** The core methodological principle this concept teaches (hold everything constant except one variable, to attribute any difference in outcome to that variable alone) is the same principle underlying controlled experimental design and, more abstractly, the mathematical notion of varying one parameter while holding others fixed. This is a genuine transferable *reasoning skill*, recorded here and under Transfer Connections' expert-transfer note, though it is a methodological parallel rather than a subject-matter mechanism link, and no KG cross-link exists or is proposed for it.
- **No genuine mechanism-level connection to physics, chemistry, or biology at this concept specifically.** Unlike several phonetics-domain concepts in this batch, this concept's content (a diagnostic linguistic method) does not itself describe a physical mechanism — stated explicitly rather than manufactured.

## Blueprint References

Blueprint exists: `docs/curriculum/blueprints/eng.phonetics.minimal-pairs.md`. Reused by reference, **not restated**:

- **Component 1 — Misconception Register**: both misconceptions' trigger signals, conflict evidence, bridge/replacement text, discrimination pairs. This entry adds birth-type classification and the teaching consequences that follow from type, identifying the second misconception as the concept where the recurring notation-induced pattern's stakes are highest yet in this program's authoring.
- **Component 2 — Prerequisite Diagnostic Block**: PD-1 and its fail-route to `eng.phonetics.ipa-basics`.
- **Component 3 — Concrete Anchor**: the one-slot-swap game script.
- **Component 4 — Conceptual Development Sequence**: TA-1…TA-5.
- **Component 5 — Worked Examples**: WE-1…WE-3.
- **Component 6 — Mastery Probe Set**: MP-1…MP-5, the item bank. This entry adds only the response-pattern reads.
- **Components 7–8**: session architecture, protocol routing (S0/S1/S6/S9, including the personalised-contrast-targeting flag), and adaptive flags (precision-is-the-point, transcribe-before-judging, auditory-only necessity, personalisation to L1-relevant contrasts).

## Runtime Asset References

No seeded `AssetIdentity` records exist for this concept as of 2026-08-03. English carries no `HUMAN_CURATOR` authored-seed rows in production; existing English rows are `AI_AUTHORED` live-capture only (CLAUDE.md, AssetIdentity Global Audit). No assets created as part of authoring this entry.

## Curriculum Feedback

- **Notation-induced misconception pattern, now identified as concept-specific "highest stakes" instance.** This concept's second misconception is the fifth identified instance of the notation-induced/reasoning-from-appearance pattern already flagged at `eng.phonics.rhyming`, `eng.phonetics.articulation-organs`, and `eng.phonetics.ipa-basics`, but it is worth distinguishing from the others in the Pipeline's eventual audit: here, the misconception surviving does not merely produce an occasional wrong answer but defeats the concept's entire diagnostic purpose, since minimal pairs are specifically valuable *because* they can be chosen where spelling misleads.
- **No missing cross-links identified**, matching the finding already recorded at `eng.phonetics.ipa-basics` — this concept's content (a diagnostic method) is not itself a physical mechanism.
- **`estimated_hours: 2` is plausible for the analytical half and likely optimistic for the perceptual half** to reach genuine fast, confident auditory discrimination on a learner's specific difficult contrast — consistent with the general pattern noted at several concepts in this batch, that skills requiring reliable performance under real-time, unsupported conditions take measurably longer to consolidate than the underlying conceptual or procedural knowledge they are built on.

## Version History

- v1.0 (2026-08-03): Initial entry. Blueprint reused by reference (Components 1–8). 2 misconceptions classified by birth type; the second identified as the highest-stakes instance yet of the recurring notation-induced pattern. No missing cross-links found — recorded explicitly. Duration-estimate observation recorded as Curriculum Feedback.
