# Syllable Types — `eng.phonics.syllable-types`

## Identity

- **KG ID**: `eng.phonics.syllable-types`
- **Name**: Syllable Types
- **Domain**: English / Phonics
- **Difficulty**: developing
- **Bloom level**: apply
- **Mastery threshold**: 0.75
- **Estimated hours**: 3
- **Requires**: `eng.phonics.digraphs`, `eng.phonics.long-vowels-silent-e` — load-bearing part: digraphs supplies the letter-combination-to-single-sound skill vowel-team syllables draw on directly; long-vowels-silent-e supplies both the closed/CVCe contrast (two of the six types) and the general strategic habit — check the structure before committing to a vowel sound — this concept now formalises and extends to four further categories.
- **Unlocks**: `eng.phonics.decoding-fluency`, `eng.writing.spelling-strategies`
- **Cross-links**: (none in the KG)
- **Blueprint**: `docs/curriculum/blueprints/eng.phonics.syllable-types.md`

## Learning Objective

The learner can:
1. Classify a single syllable into one of the six standard types (closed, open, silent-e, vowel team, r-controlled, consonant-le) and produce its corresponding vowel sound.
2. Divide a two-syllable word into its component syllables using standard division patterns.
3. Apply the correct, type-specific vowel rule to each syllable in a divided word, rather than defaulting to one rule for every syllable.
4. Correctly read words containing the two least-intuitive types — r-controlled and consonant-le.
5. Divide, type, and fluently read a genuinely novel multisyllabic word, demonstrating the system generalises beyond any drilled example.

## Core Understanding

English syllables fall into **six standard structural types**, and each type reliably signals a specific, predictable vowel sound — this concept's entire content is the formal unification of a principle the learner has already met twice, unnamed, in this curriculum: **syllable structure, not syllable count or letter identity alone, determines vowel sound**. The six types are: **closed** (a vowel followed by one or more consonants, no final silent e — short vowel, established at `eng.phonics.short-vowels`); **open** (a syllable ending in the vowel itself, with nothing closing it off — long vowel, e.g. "ba-" in "baby"); **silent-e** (a vowel-consonant-silent-e pattern — long vowel, established at `eng.phonics.long-vowels-silent-e`); **vowel team** (two vowel letters together representing one sound, usually the first vowel's long sound — established at `eng.phonics.digraphs`); **r-controlled** (a vowel immediately followed by "r," which changes the vowel to a distinct, r-coloured quality that is neither short nor long — "ar" in "car"); and **consonant-le** (an unstressed final syllable with a schwa-like vowel preceding "consonant + le," as in "-ble" in "table"). The concept's practical payoff is a general, powerful decoding strategy for **any** multisyllabic word, however unfamiliar: **divide the word into syllables first, identify each syllable's type second, then decode each one using its type-specific rule** — converting what looks like one large, unfamiliar, potentially unreadable chunk into a small sequence of individually familiar, individually decodable pieces, each governed by a rule the learner already partially knows.

## Mental Models

**Beginner — "long, unfamiliar-looking words are a different kind of problem — you have to guess at them from their overall shape."**
The runnable simulation: encountering a multisyllabic word, glance at its overall length and a few salient letters, and guess a similar-looking, already-known word rather than attempting systematic decoding. This is not tutor-installed — it is a reasonable coping strategy for a learner whose decoding skill has, until now, been built and practised almost entirely on single-syllable words, leaving no obvious extension to something visually much longer.
*Upgrade trigger*: the Blueprint's own conflict evidence — guessing "repeat" for "reptile," then being shown the word splits cleanly into "rep" (already-known closed-syllable pattern) and "tile" (already-known silent-e pattern).
*Shelf-life warning at replacement*: "A long word isn't a different kind of problem — it's several small, familiar problems in a row. Break it apart first."

**Intermediate — "I can divide words into syllables and apply *a* vowel rule to each piece, usually the closed-syllable short-vowel rule since that's the one I know best."**
The simulation: correctly perform syllable division and then apply the single most heavily-drilled prior rule (closed-syllable, short vowel) indiscriminately to every resulting syllable, regardless of that syllable's actual structure. This model has correctly solved the division half of the problem and has not yet recognised that division alone is insufficient — each piece still requires its own, correctly-identified type before a vowel rule can be safely applied.
*Upgrade trigger*: the Blueprint's own conflict evidence — reading "ba" in "baby" with a short vowel (as if closed), then checking whether anything actually closes off that syllable the way "bat" is closed.
*Shelf-life warning*: "Splitting the word is step one. Each piece still needs its own type check — treating every piece as 'closed' will get plenty of them wrong."

**Advanced — "any syllable, once correctly identified as one of six structural types, reliably signals its own vowel sound; any multisyllabic word can therefore be divided, typed piece-by-piece, and decoded systematically, including two less-intuitive types (r-controlled, consonant-le) that require dedicated attention."**
The simulation: given any novel multisyllabic word, the learner divides it, checks each resulting syllable's type individually (never defaulting), and reads the whole word fluently. This is the target model, matching TA-4 and TA-5.
*Upgrade trigger*: `eng.phonics.decoding-fluency` (one of two direct unlocks), where this systematic, type-by-type approach must become fast and automatic rather than a consciously-worked-through procedure, and `eng.writing.spelling-strategies` (the other), where the same six-type structure becomes a tool for predicting spelling rather than only for decoding it.
*Shelf-life warning*: "This system works. The next steps are making it fast enough to feel automatic, and using the same structure in reverse, for spelling."

**Expert — "the six-syllable-type framework is a pedagogically standard simplification of a more continuous underlying phonological reality (syllable weight, stress placement, and historical spelling layers all genuinely interact more intricately than six discrete categories capture), adopted because it reliably resolves the overwhelming majority of decoding cases a beginning-to-intermediate reader will actually encounter."**
Named here to mark the arc; this concept deliberately does not attempt the fuller phonological account, and the advanced learner benefits from knowing the six-type system is a genuinely useful, deliberately-simplified teaching tool rather than a complete theoretical description of English syllable structure.

## Why Students Fail

The dominant failure mechanism is that **multisyllabic words genuinely look categorically different from anything the learner's decoding skill has previously been exercised on**, and nothing in prior instruction has explicitly bridged the gap — every phonics concept up to this point has worked with single-syllable words, and a learner has had no occasion to discover that the same underlying rules simply repeat, piece by piece, across a longer word, rather than requiring an entirely new, unfamiliar skill. The whole-word-guessing strategy this concept's first misconception describes is not evidence of poor decoding skill; it is evidence of a genuine, previously-unaddressed scope gap between "decoding single syllables" and "decoding words made of several syllables."

The second mechanism is the largest-scale instance yet in this program of the now-familiar **single-rule-overgeneralisation pattern** — here compounding across *five* structurally distinct alternative rules (open, silent-e, vowel-team, r-controlled, consonant-le) that the closed-syllable default, simply by virtue of having been taught first, most heavily, and most repeatedly across this program's phonics strand, is well-positioned to overshadow. This is a genuinely larger-scale version of the same interference pattern already seen in miniature at `eng.phonics.consonants`' hard/soft c/g rule and `eng.phonics.digraphs`' fresh blend-to-digraph carryover, but scaled up from "one alternative rule to remember" to "five."

The third mechanism, specific to the two least-intuitive types, is that **r-controlled and consonant-le syllables produce vowel qualities that are neither clearly "short" nor clearly "long"** — the entire vowel-sound vocabulary the learner has built up to this point (short versus long, the two categories every other phonics concept in this program has worked with) simply does not have a ready-made slot for the r-coloured vowel in "car" or the unstressed schwa-plus-consonant-l pattern in "table," and a learner reaching for the only two categories they have previously needed will predictably misclassify or mispronounce these two types unless they receive dedicated, separate attention — exactly the treatment the Blueprint's own Component 8 flag specifies.

## Misconceptions

The Blueprint's **Component 1 — Misconception Register** owns the trigger signals, conflict evidence, bridge/replacement text, and discrimination pairs for both entries below. Reused by reference; birth-type classification and teaching consequence added here.

### MC-MULTISYLLABIC-WORDS-ARE-UNPREDICTABLE
*(Blueprint Component 1, MC-MULTISYLLABIC-WORDS-ARE-UNPREDICTABLE — includes the reptile/repeat and napkin discrimination examples.)*
- **Birth type**: Type 1 (overgeneralization) — but of an absence rather than a false rule: the learner has correctly generalised that single-syllable decoding rules apply to single-syllable words, and has had no positive evidence yet that the same rules extend, piece by piece, to longer words, so the resulting gap is filled with a guessing strategy by default, not by any actively incorrect belief about how longer words work.
- **Teaching consequence of the birth type**: because there is no false rule to correct, only a missing bridge to supply, the repair is **demonstrative rather than corrective** — the Blueprint's own conflict evidence (splitting "reptile" into "rep" and "tile," both already-familiar patterns) directly supplies the missing bridge by showing, not merely asserting, that the learner's existing single-syllable knowledge already covers most of what a longer word requires.
- **Verification of death**: given a genuinely unseen multisyllabic word, the learner's first move is to attempt division into syllables rather than to glance at the whole word and guess from its shape — the *strategy chosen first*, before any correct or incorrect decoding result, is the actual evidence, since a learner could in principle guess correctly by chance without the underlying systematic approach having taken hold.

### MC-ALL-SYLLABLES-FOLLOW-THE-SAME-PATTERN
*(Blueprint Component 1, MC-ALL-SYLLABLES-FOLLOW-THE-SAME-PATTERN — includes the napkin/baby and cat/cape/car discrimination examples.)*
- **Birth type**: Type 1 (overgeneralization), of the single most heavily-practised prior rule (closed-syllable, short vowel) onto a space of six genuinely distinct types — the largest-scale instance of this specific overgeneralisation pattern in this program's authoring to date, given that five alternative categories, not merely one exception list, compete for the single default's territory.
- **Teaching consequence**: because the over-applied rule remains completely correct for its own type (closed syllables), and because the scale of the correction (five further categories, not one) is genuinely larger than any prior instance of this pattern in the curriculum, the repair requires an explicit, standing **type-check-before-decode habit**, not a one-time correction — the Blueprint's own replacement text specifies exactly this ("before applying a vowel-sound rule to any syllable, first identify which of the six syllable types it is"), and Component 8's own flag ("check, don't default") names this as the concept's single most important standing procedural habit.
- **Verification of death**: given a novel two-syllable word combining two *different* types in the same word (mirroring the Blueprint's own "reptile" example, closed-plus-silent-e), the learner correctly applies a *different* vowel rule to each syllable within the same word, rather than applying one rule uniformly across both — the within-word type-switching, not merely correct typing of isolated single syllables presented separately, is the strongest available evidence the checking habit (rather than a slightly-expanded but still uniform default) has actually taken hold.

## Analogies

**Best — six different keys, each opening exactly one of six different locks, and a locksmith who checks which lock they're facing before selecting a key.** A skilled locksmith doesn't try the same key on every lock and force it; they identify the lock type first, then reach for the matching key. Six syllable types are six lock types; the vowel-sound rules are the six matching keys; syllable division is walking up to each lock in turn.
*Breaking point*: locks and keys are discrete, physical, and don't share any structural features across types; syllable types do share genuine structural overlap (e.g., open and closed syllables differ by exactly one feature — whether a consonant closes the syllable) — useful for the *check-before-applying* discipline, not for implying the six types are as unrelated to each other as six different locks would be.

**Alternative — six different traffic-light configurations at six different kinds of intersections, each requiring the driver to check which configuration is in effect before proceeding the same way every time.** A four-way stop, a roundabout, and a standard light-controlled intersection all require genuinely different driver behaviour, and a driver who applies "just go when the light's green" everywhere will fail badly at a four-way stop that has no light at all.
*Breaking point*: traffic configurations are visually distinguishable in a way that maps loosely (but not perfectly) onto syllable types' visual cues (does a consonant follow the vowel? is there a final silent e? is there an "r"?) — useful for the *different situations need different rules* discipline, less precise as a structural mapping.

**Story analogy — six different currencies, each with its own exchange rate to "vowel sound," and a traveller who has to check which currency they're holding before converting.** A traveller who assumes every banknote is in the same currency will convert incorrectly; checking the currency (syllable type) first is the necessary, non-optional first step before any conversion (decoding) can proceed correctly.
*Breaking point*: currency exchange rates are continuous numerical relationships; syllable-type-to-vowel-sound mappings are categorical, fixed correspondences — useful for the *check-first, convert-second* discipline, not for implying any numerical or continuous relationship.

**Visual analogy — the syllable-type sorting hats** (Blueprint Component 3): six labelled hat cards with simple icons (a closed door for closed syllables, an open door for open syllables), with single-syllable word-cards sorted underneath. Not a metaphor but the actual working instrument this concept's early teaching is organised around, giving the six-type system a concrete, physically sortable structure before it is applied to the harder task of multisyllabic division.

### ANTI-ANALOGIES (do not use)

- **"Once you know the six types, decoding any word is basically automatic."** Understates the genuine, ongoing effort the checking habit requires, particularly for the two less-intuitive types, and risks the learner feeling they have failed at something that was supposed to be simple when r-controlled or consonant-le syllables prove harder than the framing suggested.
- **"Most syllables are closed, so when in doubt, just go with short vowel."** Directly reinstates the single-rule default this concept's second misconception consists of, dressed up as a probabilistic heuristic rather than a genuine checking procedure.
- **"Long words are basically several short words stuck together."** Overstates the compositional relationship — syllables within a multisyllabic word are frequently not themselves complete, independently meaningful words (as in "rep" from "reptile," which is not a standalone English word), and this framing risks the learner searching for word-level meaning in each syllable rather than treating syllables as purely phonological, structural units.

## Demonstrations

Prediction first in every case.

1. **The syllable-type sorting hats (learner activity).** Blueprint Component 3 — full script there. *Predict first*, for each single-syllable word-card before sorting: "Which hat do you think this word belongs under, and what vowel sound do you expect?"
2. **The reptile/repeat collision (teacher-led, learner-resolved).** Blueprint's own conflict evidence. *Predict first*: "If you had to guess this word from its overall shape, what would you guess? Now let's split it instead — rep, tile. Do you recognise either piece?"
3. **The baby closed-versus-open collision (teacher-led, learner-resolved).** Blueprint's own conflict evidence for the second misconception. *Predict first*: "Does 'ba' in 'baby' have a consonant closing it off, the way 'bat' does?" Then compare the two syllables' structure directly.
4. **The novel multisyllabic word challenge (learner activity, TA-5).** *Predict first*, before dividing: "How many syllables do you think this word has, and what's your plan for reading it?" — deliberately eliciting a stated strategy (divide, then type, then decode), not just an eventual answer.

## Discovery Questions

Following the pattern established at multiple phonics concepts throughout this program, this concept splits: **the specific six-type inventory and their vowel-sound correspondences are largely told directly** (surveyed systematically via the sorting-hats anchor, drawing on prior knowledge for closed, silent-e, and vowel-team types already established), but **the syllable-division-and-type-checking strategy itself, as a general decoding method for previously "unreadable" long words, is genuinely well suited to guided discovery**.

1. **Need**: "You already know how to read short, one-syllable words really well. Does any of that knowledge help with a longer word like 'reptile'?"
2. **Playground**: the learner examines a long word freely, without instruction, and attempts whatever strategy comes naturally (likely whole-word guessing, per the established default).
3. **Invention**: "What if you split it into smaller pieces — does either piece look like something you already know how to read?" The learner discovers, through their own attempt, that the pieces are individually familiar even when the whole word wasn't.
4. **Collision**: present a word combining two *different* syllable types (mirroring "reptile" itself) to confirm the checking habit generalises across type combinations, not just within a single type repeated.
5. **Formalization**: name the general strategy — divide first, identify each piece's type second, decode each piece using its own rule — as a systematic method that works on any multisyllabic word, not a trick specific to a few drilled examples.
6. **Compression**: "Split it. Type each piece. Decode piece by piece — never guess the whole thing at once."

## Teaching Sequence

The pedagogical logic behind this arc:

- **All six types are surveyed on single syllables (TA-1) before syllable division in multisyllabic words is attempted (TA-2)** — establishing the type-to-sound mapping on the simplest possible material (already-segmented single syllables, using the sorting-hats anchor) before adding the further demand of correctly locating syllable boundaries within a longer, undivided word.
- **Syllable division (TA-2) is introduced before type-specific rule application is drilled as its own explicit focus (TA-3)** — separating the mechanical division skill from the type-checking skill allows either to be diagnosed independently if difficulty arises, exactly the same separation-of-skills principle established at `eng.phonics.consonant-blends`' sound-counting-before-production sequencing.
- **The two least-intuitive types (r-controlled, consonant-le) are deliberately held back to their own dedicated stage (TA-4), after the other four are reasonably secure** — this is the Blueprint's own explicit, load-bearing design choice (Component 8's flag that these two types are "the least intuitive and most often under-taught relative to the other four"), and delaying them protects the learner from having to master six genuinely different categories, two of them producing an entirely new kind of vowel quality, all in one undifferentiated pass.
- **Full novel-word decoding (TA-5) comes last and is explicitly the mastery bar**, per Component 8's own flag naming Component 6's most demanding items as the actual certification standard — this concept's culminating task must include genuinely unseen material, mirroring the generalisation-testing principle established at every rule-application concept throughout this program, now applied at the largest scale (a full multisyllabic word, potentially combining several types) yet.

Turn-by-turn scripting, protocol routing, and adaptive flags: Blueprint **Component 7 — Session Architecture** and **Component 8 — Adaptive Flags** (in particular the syllabify-before-decode standing procedure, the check-don't-default habit, the dedicated r-controlled/consonant-le attention, and the novel-word generalisation bar).

## Tutor Actions

In recommended order, from `../teaching-actions/`:

1. **Concept Map** (ORGANIZE) — the syllable-type sorting hats, built and referenced throughout, functioning as this concept's core organising artefact, exactly paralleling the cognate-pair table's role at `eng.phonics.consonants` and the vowel-space quadrilateral's role at `eng.phonetics.vowel-sounds`.
2. **Matching** (DO) — single syllable to type, and, at the harder combined stage, divided-syllable-piece to type, with the bidirectional check (does the learner's typing hold up when the same syllable appears embedded in a different, unfamiliar word) carrying real diagnostic value.
3. **Prediction** (TEST-THINKING) — predicting a syllable's type and vowel sound before confirming, and predicting a division strategy before attempting a novel multisyllabic word, both directly building the target checking habit.
4. **Error Analysis** (TEST-THINKING) — presenting a syllable decoded with the wrong (usually closed-syllable-default) rule as a hypothetical error to identify and correct, directly practising the discrimination MC-ALL-SYLLABLES-FOLLOW-THE-SAME-PATTERN's repair targets.
5. **Demonstration** (SHOW) — the reptile/repeat and baby collisions, both benefiting from being heard aloud and physically split (writing a clear division mark between syllables) rather than only discussed abstractly.

**Does not fit**: **Game** before the six-type system, and specifically the two less-intuitive types, are independently secure — speed pressure at this concept's early stages risks rewarding exactly the closed-syllable-default shortcut this concept's second misconception consists of. **Role-Play** — no interpersonal content.

## Voice Teaching Notes

This concept's core evidence is a mix of **visual** (identifying syllable boundaries and structural features — is there a final silent e? does "r" follow the vowel?) and **audio** (the resulting vowel sound produced), closely paralleling the evidence profile already established at `eng.phonics.long-vowels-silent-e` and `eng.phonics.digraphs`, now operating across a whole multisyllabic word rather than a single syllable.

What the ideal tutor perceives:

- **A short-vowel production applied uniformly across every syllable of a multisyllabic word**, regardless of each syllable's actual structure (e.g., short-vowelling both syllables of "baby"). The direct auditory signature of MC-ALL-SYLLABLES-FOLLOW-THE-SAME-PATTERN, and it is often the most audible signal this concept produces, since the resulting mispronunciation frequently doesn't match any real word.
- **A confident whole-word guess produced with no audible attempt at division** (no pause, no separately-sounded-out pieces) on a genuinely unfamiliar multisyllabic word. The direct behavioural signature of MC-MULTISYLLABIC-WORDS-ARE-UNPREDICTABLE, distinguishable from a division attempt that merely happens to be silent or internal by the immediate, undivided character of the response.
- **A brief pause at each syllable boundary, with audibly distinct type-checking behaviour** (e.g., a slight hesitation specifically before an r-controlled or consonant-le syllable, where the learner may be consciously retrieving the less-familiar rule). Positive: this is the target checking procedure taking real, brief time, and should be named and reinforced rather than rushed.
- **A consistent, specific mispronunciation pattern on r-controlled or consonant-le syllables specifically, while other syllable types are handled correctly and confidently in the same session.** This differential pattern isolates the difficulty to exactly the two types the Blueprint's own Component 8 flag identifies as needing dedicated attention, and should route to targeted TA-4-style practice rather than a general review of the whole six-type system.

**Load-bearing sentence, delivered slowly**: *"Split it, check each piece's type, then decode — never guess the whole word at once."*

## Assessment Signals

Item bank: Blueprint **Component 6 — Mastery Probe Set** (MP-1…MP-5). Response-pattern reads, which the Blueprint does not own:

- **Single-syllable type identification (MP-1).** *Correct type and vowel-sound description, on a novel word of a less-intuitive type (r-controlled)* → carries strong diagnostic value specifically because this item type is where the closed-syllable default is least likely to coincidentally produce a correct-sounding guess.
- **Two-syllable division and typing (MP-2).** A learner who correctly divides but mistypes one or both resulting syllables has a genuinely different, and generally easier-to-repair, gap than one who cannot divide the word at all — always distinguish which half (division, or type-checking) produced any observed error.
- **Consonant-le identification (MP-3).** Given that this and r-controlled are the two types Component 8 flags as least intuitive, a correct answer here, on a genuinely novel word, carries stronger evidence than an equivalent correct answer on a closed or open syllable, where prior, heavily-drilled knowledge could more easily produce a lucky guess.
- **Full multisyllabic decoding (MP-4).** This is this concept's actual mastery bar per the Blueprint's own explicit Component 8 designation — a learner who succeeds on every single- and two-syllable item but stalls or reverts to whole-word guessing here has not yet met the concept's real target, regardless of performance on the simpler preceding items.
- **Explanation (MP-5).** Listen for whether the explanation names the *general principle* (different syllable structures produce different, predictable vowel sounds, checkable even in novel words) rather than only enumerating the six type names — a response that can list all six types but cannot articulate why checking type-by-type matters has memorised the taxonomy without the underlying strategic insight.

**Mastery certification trigger**: correct type identification and vowel-sound description for a novel r-controlled or consonant-le syllable (not merely a closed, open, silent-e, or vowel-team syllable, where the default rule is more likely to coincidentally succeed); correct division and per-syllable typing of a novel two-syllable word combining two different types; and correct division, typing, and fluent reading of a genuinely novel multisyllabic word (three or more syllables), with a stated or observably-applied divide-then-type-then-decode strategy. The genuinely-novel, multi-type-combining requirement on the final item is essential and matches the Blueprint's own explicit designation of this item class as the concept's real mastery bar — success on isolated, single-type items alone is insufficient for certification.

## Tutor Recovery Strategy

Generic engine: `../foundations/01-recovery-engine.md`. Concept-specific notes only:

- **"This is way too much to remember — six whole types?"** — a genuine, reasonable reaction to the largest jump in categorical complexity this program's phonics strand has introduced at once, and it should be validated directly rather than minimised, per the Blueprint's own S6 protocol routing: "You're right, that's a real jump from one or two rules to six — let's go back to the sorting hats and take them one at a time, the way we did at the start." Returning to the concrete anchor, rather than pushing forward, is the correct response to this specific complaint.
- **"I keep forgetting which type this one is"** — particularly likely for r-controlled or consonant-le syllables specifically; take this as evidence those two types need more dedicated, separate practice time, not as a sign the whole six-type system needs re-teaching from scratch, since the other four types are very likely already secure.
- **The smaller question to shrink to**: from full multisyllabic decoding, down to **a single already-sorted syllable card under its hat, with only the vowel sound asked for, no division or multi-syllable integration required.** This removes the division and multi-piece-coordination demands entirely, isolating the most basic type-to-sound mapping before returning to the harder combined tasks.
- **Never shrink to "just try to remember whole words you've seen before that look similar."** This directly reinstates the whole-word-guessing shortcut this concept's first misconception consists of, precisely at the moment the learner is most likely to fall back on whatever strategy is modelled under difficulty.

## Memory Hooks

- **Concept type**: classification system (six syllable types, each with a fact-like type-to-sound correspondence) plus a **general procedural strategy** (divide, type, decode) that must generalise to genuinely novel material, plus **two categories requiring dedicated additional practice** (r-controlled, consonant-le) due to their lower intuitive salience.
- **Review form — the four more-intuitive types**: brief spaced retrieval on novel single- and multi-syllable examples, since these types build fairly directly on already-established prior knowledge (closed, silent-e, vowel-team) or a fairly transparent new pattern (open).
- **Review form — r-controlled and consonant-le**: dedicated, higher-frequency spaced review specifically for these two types, distinct from and in addition to the general six-type review cycle, given their established lower intuitive salience and the correspondingly higher risk of quiet regression if not separately tracked.
- **Review form — the general strategy**: review specifically using genuinely novel multisyllabic words the learner has not previously divided, with the *strategy chosen* (attempt division first, versus guess from shape) as the reviewed behaviour, not merely the eventual reading accuracy — mirroring the verification-of-death criterion established above for the first misconception.
- **Interleaving partners**: `eng.phonics.long-vowels-silent-e`'s closed/CVCe items and `eng.phonics.digraphs`' vowel-team items should continue to be interleaved with this concept's review, since three of the six types are direct extensions of those two concepts' own content, and allowing that foundational fluency to lapse would undermine this concept's structure from underneath.

## Transfer Connections

- **Near**: `eng.phonics.decoding-fluency` — one of two direct unlocks, taking this concept's consciously-applied, step-by-step divide-type-decode procedure and building it toward fast, automatic, unconscious application — the natural next stage once the underlying system itself is correct but still effortful.
- **Near**: `eng.writing.spelling-strategies` — the other direct unlock, applying the same six-type structure in the reverse direction: given a heard word's vowel sound, predicting which syllable type (and therefore which spelling pattern) is most likely, extending the sound-to-spelling transfer already established at several earlier phonics concepts in this program to the multisyllabic scale.
- **Far**: vocabulary growth generally — a learner with a secure, generalisable syllable-division-and-typing strategy can attempt to decode entirely unfamiliar, never-encountered words (technical terms, unfamiliar names, advanced vocabulary) independently, rather than depending on being told the pronunciation, directly extending the "the tutor is not the only source of pronunciation information" independence already noted as a transfer benefit at `eng.phonetics.ipa-basics`.
- **Expert transfer**: the durable skill is **decomposing an apparently large, unfamiliar problem into a sequence of smaller, individually-familiar sub-problems, each solved by checking which of several known categories it belongs to before applying the matching procedure** — directly transferable to any domain involving compositional problem-solving over a fixed, learnable taxonomy (parsing a long chemical name into its component functional groups, breaking a complex mathematical expression into recognisable sub-expressions, or debugging a large program by isolating and classifying each failing component individually).

## Cross-Subject Connections

KG records no `cross_links`. Honest assessment, consistent with the other phonics-domain (as opposed to phonetics-domain) concepts in this program: this concept's cross-subject reach is limited.

- **No genuine mechanism-level connection to physics, chemistry, or biology.** This concept's content (English syllable-structure spelling and pronunciation conventions) does not describe a physical mechanism the way the phonetics-domain concepts in this program do — stated explicitly, following established practice for this category of concept.
- **A genuine, if abstract, structural parallel to compositional decomposition in mathematics and computer science exists** (see Transfer Connections' expert-transfer note) — the general strategy of classifying sub-components against a fixed taxonomy before applying a matching rule is a transferable reasoning skill, not a KG-encodable subject-matter link.

## Blueprint References

Blueprint exists: `docs/curriculum/blueprints/eng.phonics.syllable-types.md`. Reused by reference, **not restated**:

- **Component 1 — Misconception Register**: both misconceptions' trigger signals, conflict evidence, bridge/replacement text, discrimination pairs. This entry adds birth-type classification and the teaching consequences that follow from type, identifying the second misconception as the largest-scale instance yet of the single-rule-overgeneralisation pattern catalogued repeatedly across this program's phonics-domain authoring.
- **Component 2 — Prerequisite Diagnostic Block**: PD-1 and PD-2 and their fail-routes to `eng.phonics.digraphs` and `eng.phonics.long-vowels-silent-e` respectively.
- **Component 3 — Concrete Anchor**: the syllable-type sorting hats script.
- **Component 4 — Conceptual Development Sequence**: TA-1…TA-5, including the deliberate deferral of r-controlled and consonant-le to their own dedicated stage.
- **Component 5 — Worked Examples**: WE-1…WE-3.
- **Component 6 — Mastery Probe Set**: MP-1…MP-5, the item bank. This entry adds only the response-pattern reads.
- **Components 7–8**: session architecture, protocol routing (S0/S1/S6/S9, including the treatment of the entire six-type system as genuinely new for learners from consistently phonetic/syllabic L1 orthographies), and adaptive flags (syllabify-before-decode, check-don't-default, dedicated r-controlled/consonant-le attention, novel-word generalisation bar).

## Runtime Asset References

No seeded `AssetIdentity` records exist for this concept as of 2026-08-03. English carries no `HUMAN_CURATOR` authored-seed rows in production; existing English rows are `AI_AUTHORED` live-capture only (CLAUDE.md, AssetIdentity Global Audit). No assets created as part of authoring this entry.

## Curriculum Feedback

- **No missing cross-links identified**, consistent with the other phonics-domain concepts in this program — this concept's content is a spelling/decoding-strategy convention rather than a physical mechanism.
- **This concept represents the largest-scale confirmed instance of the single-rule-overgeneralisation pattern in this program's authoring to date** (five alternative categories competing with one over-practised default, versus one or two alternatives at every prior instance) — worth flagging to the Curriculum Production Pipeline as a benchmark case for how the "establish the default very securely, then explicitly widen scope" repair strategy scales to a larger number of categories, since the same strategy has now been validated at both small (`eng.phonics.consonants`) and large (this concept) scale.
- **`estimated_hours: 3` is plausible for the four more-intuitive types and likely optimistic for r-controlled and consonant-le to reach full, confident, novel-word-generalising fluency** — consistent with the recurring pattern across this program that the least-intuitive sub-components of a multi-part concept take measurably longer to consolidate than the concept's average difficulty rating would suggest.

## Version History

- v1.0 (2026-08-03): Initial entry. Blueprint reused by reference (Components 1–8). 2 misconceptions classified by birth type; the second identified as the largest-scale confirmed instance of the single-rule-overgeneralisation pattern in this program to date. No missing cross-links found — recorded explicitly. Scaling benchmark and duration-estimate observation recorded as Curriculum Feedback.
