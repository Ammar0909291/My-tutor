# Overview of Word Classes — `eng.grammar.word-classes-overview`

## Identity

- **KG ID**: `eng.grammar.word-classes-overview`
- **Name**: Overview of Word Classes
- **Domain**: English / Grammar
- **Difficulty**: foundational
- **Bloom level**: remember
- **Mastery threshold**: 0.80
- **Estimated hours**: 2
- **Requires**: `eng.vocab.word-recognition` — load-bearing part: the learner must already recognize words' meanings, not merely decode them, since classifying a word's grammatical job in a sentence presupposes the learner already knows what the word means and can attend to its function rather than fighting to identify it at all.
- **Unlocks**: `eng.grammar.nouns`, `eng.grammar.verbs`, `eng.grammar.prepositions`, `eng.grammar.conjunctions`, `eng.grammar.interjections`
- **Cross-links**: none encoded in the KG.
- **Blueprint**: `docs/curriculum/blueprints/eng.grammar.word-classes-overview.md`

## Learning Objective

The learner can:
1. Identify the noun(s) and verb(s) in a sentence by their grammatical function (naming vs. showing action/being), not by surface meaning alone.
2. Identify adjectives and adverbs by what they describe (a noun, or a verb/adjective/other adverb, respectively).
3. Identify pronouns, prepositions, and conjunctions by their connecting/substituting function.
4. Classify the same word into two different word classes across two different sentences, correctly attending to each sentence's specific grammatical role for that word.
5. Use grammatical signals (determiners, tense markers, modification targets) rather than surface meaning to resolve cases where meaning alone would mislead.

## Core Understanding

A word's class is not a fixed, permanent label stapled to that word — it is **the job the word is doing in one specific sentence**, and the same word can hold different jobs in different sentences. This is the concept's first load-bearing fact: many ordinary English words (run, light, book, cut, fast) shift word class depending on their grammatical role, so "run" is a verb in "I run every day" (an action) but a noun in "I went for a run" (a thing/activity referred to) — the word itself hasn't changed, but the job it's doing in that particular sentence has. The concept's second load-bearing fact follows directly: because class is about function rather than meaning, the correct way to classify a word is to check its **grammatical signals** — does it take a determiner like "the" or "a"? does it show tense? does it describe another word? — and its position/role in the sentence, not to classify by what the word's underlying concept "feels like" (action-like, thing-like, quality-like). This is why "arrival" functions as a noun (it takes "the" and acts as a sentence's subject) even though the concept it names feels action-like, and why "quickly" (an adverb, modifying the verb "ran") and "quick" (an adjective, modifying the noun "runner") carry nearly the same core meaning but differ in grammatical signal and function. The eight word classes (noun, verb, adjective, adverb, pronoun, preposition, conjunction, interjection) are the vocabulary this program uses going forward to describe exactly which job any given word is doing.

## Mental Models

**Beginner — "each word has one, fixed job, and I can tell what it is by thinking about what the word means."**
The runnable simulation: look up the word's meaning (or its "feel" — is it an action? a thing? a description?) and assign a class from that meaning alone, treating the assignment as permanent regardless of which sentence the word appears in. This is a reasonable default for a learner who has never before needed to think about a word's grammatical role, since most everyday vocabulary work up to this point has focused on meaning, not function.
*Upgrade trigger*: the Blueprint's own conflict evidence — being shown "run" functioning as a noun in "I went for a run," directly after having confidently classified it as "always a verb."
*Shelf-life warning at replacement*: "The word's meaning is a clue, not the final answer — the sentence it's actually in tells you the real job it's doing."

**Intermediate — "class depends on the sentence, not just the word, but I still classify by whether the underlying idea feels action-like, thing-like, or quality-like."**
The simulation: correctly checks the specific sentence rather than assuming a fixed label, but still uses meaning/topic as the deciding test rather than grammatical signals — leading to errors precisely where meaning and grammatical role diverge, such as classifying "arrival" as verb-like because "arrive" feels like an action, missing that "arrival" itself takes "the" and functions as the subject.
*Upgrade trigger*: the Blueprint's own conflict evidence — being shown "the arrival surprised everyone" and asked whether "arrival" is doing the surprising (verb-like) or is the thing that did the surprising (noun), with the determiner "the" as the decisive clue.
*Shelf-life warning*: "Meaning can point you toward the wrong class, especially for words built from other word classes. Grammatical signals — like whether 'the' can go in front of it — are the more reliable test."

**Advanced — "word class is determined by grammatical function and signal in one specific sentence, and this test resolves cases where meaning would mislead."**
The simulation: given any word in any sentence, check its grammatical signals and role directly, independent of whether its meaning feels action-like or thing-like, correctly resolving cases like arrival/arrive and quickly/quick where surface meaning would produce the wrong classification. This is the target model, matching TA-5.
*Upgrade trigger*: the five direct unlocks (`eng.grammar.nouns`, `eng.grammar.verbs`, `eng.grammar.prepositions`, `eng.grammar.conjunctions`, `eng.grammar.interjections`), where this concept's eight broad categories and function-over-meaning test become the entry point into dedicated, class-by-class depth.
*Shelf-life warning*: "This gets you the general map of all eight classes and the right test for using it. The next steps go deep on each class individually — its full range of jobs, its exceptions, its finer distinctions."

**Expert — "word-class identification, at fluency, is largely automatic and unconscious; explicit grammatical-signal checking is a scaffold for cases genuinely ambiguous or novel, not a step a fluent reader or writer consciously performs on every word."**
Named here to mark the arc; this concept's explicit signal-checking routine is a deliberate, temporary tool for building an accurate mental model of word class, not a permanent conscious procedure — most classification, at expert fluency, happens instantly and beneath awareness, with the explicit test reserved for genuinely tricky or novel cases.

## Why Students Fail

The dominant failure mechanism is that **classifying by meaning is the natural, well-practiced habit from every prior vocabulary concept in this program** — up to this point, understanding a word has meant knowing what it refers to or describes, and nothing in that prior work has required distinguishing a word's meaning from its grammatical role, because grammatical role was never the object of attention before now.

The second mechanism is that **English genuinely allows extensive word-class flexibility without any change in spelling**, so a learner's assumption that a word's class is a fixed, inherent property is not an arbitrary error but a reasonable generalization from many words that genuinely do stay in one class most of the time — the specific overreach is failing to check, case by case, whether the *current* sentence's usage matches that default assumption.

The third mechanism, activated specifically by cases like arrival/arrive or quickly/quick, is that **meaning and grammatical signal usually agree, but not always** — words derived from another word class (nouns built from verbs, adverbs built from adjectives) can carry over enough of the source word's "feel" that meaning-based classification produces a confident but wrong answer, and this specific mismatch is exactly what the concept's second misconception targets.

## Misconceptions

The Blueprint's **Component 1 — Misconception Register** owns the trigger signals, conflict evidence, bridge/replacement text, and discrimination pairs for both entries below. Reused by reference; birth-type classification and teaching consequence added here.

### MC-WORD-CLASS-IS-FIXED-PER-WORD
*(Blueprint Component 1, MC-WORD-CLASS-IS-FIXED-PER-WORD — includes the run-as-verb/run-as-noun and light-as-adjective/noun/verb discrimination pairs.)*
- **Birth type**: Type 1 (overgeneralization), from the genuine fact that many everyday words do stay in one class most of the time, extended into a universal assumption that every word has exactly one permanent class regardless of sentence.
- **Teaching consequence of the birth type**: because the underlying generalization is mostly true and not unreasonable, the repair works best through **direct, concrete counterexamples using common, familiar words** (run, light, book) rather than abstract argument — seeing a genuinely familiar word shift class in real sentences is more convincing than being told the rule abstractly.
- **Verification of death**: given a novel sentence pair using the same word in two different classes, the learner classifies each instance independently by its function in that specific sentence, rather than defaulting to whichever class they first learned for that word.

### MC-WORD-CLASS-DETERMINED-BY-MEANING-ALONE
*(Blueprint Component 1, MC-WORD-CLASS-DETERMINED-BY-MEANING-ALONE — includes the arrival/arrive and quickly/quick discrimination pairs.)*
- **Birth type**: Type 1 (overgeneralization) of the reasonable strategy "classify by meaning," extended past the cases where meaning and grammatical function agree into cases where they diverge.
- **Teaching consequence**: the repair must supply a **concrete, checkable alternative test** (grammatical signals: determiners, tense markers, modification targets) rather than simply telling the learner meaning is unreliable — an unreliable test with no replacement leaves the learner with nothing to do differently.
- **Verification of death**: given a novel word whose meaning suggests one class but whose grammatical signals indicate another, the learner classifies by checking the signal (does it take "the"? does it show tense?) rather than by what the underlying concept feels like.

## Analogies

**Best — a person's job title depends on which shift they're working, not on who they are as a person.** The same person might be "the driver" on one shift and "the mechanic" on another — their identity (the word) hasn't changed, but their job (the word class) depends entirely on which specific shift (sentence) they're currently working. Asking "what's this person's job?" without specifying which shift gives an incomplete, potentially wrong answer.
*Breaking point*: a person's actual skillset is fixed regardless of shift, while a word genuinely has no class at all outside of a specific sentence — useful for the shift-dependence intuition, not for implying the word "contains" multiple latent classes waiting to be selected.

**Alternative — a stage actor playing different characters in different scenes of the same play.** The actor (the word) is a single person, but which character they're playing (the word class) depends entirely on which scene (sentence) is currently running — the actor playing the villain in Act One and the hero's friend in Act Two isn't "wrong" in either scene, they're doing the job that scene calls for.
*Breaking point*: an actor deliberately chooses roles across scenes with foresight; a word's class shift across sentences is not an intentional performance but simply a structural feature of how the word is being used — useful for the identity-versus-role distinction, less precise for implying intentional variation.

**Visual analogy — the word-class sorting stations** (Blueprint Component 3): physically sorting word cards from a sentence to labeled stations, then re-sorting the same word to a different station when it appears in a second sentence with a different role. Not a metaphor but the actual working instrument this concept's core teaching is organized around.

### ANTI-ANALOGIES (do not use)

- **"Each word has a home base it always returns to."** Reinforces MC-WORD-CLASS-IS-FIXED-PER-WORD by implying a word's "true" class exists independent of any sentence, with other-class uses framed as temporary detours rather than equally genuine.
- **"If it sounds like an action, it's a verb."** Directly installs MC-WORD-CLASS-DETERMINED-BY-MEANING-ALONE as a stated shortcut, precisely the meaning-over-signal error this concept's second misconception's repair must counter.

## Demonstrations

Prediction first in every case.

1. **The word-class sorting stations (learner activity).** Blueprint Component 3 — full script there. *Predict first*: "Before we sort this sentence's words, guess which station each word will land at." Then sort, and re-sort a second sentence reusing one word in a different class.
2. **The run/run collision (teacher-led, learner-resolved).** Blueprint's own conflict evidence for MC-WORD-CLASS-IS-FIXED-PER-WORD. *Predict first*: "Is 'run' always going to be a verb, in every sentence you can think of?" Then present "I went for a run" and resolve.
3. **The arrival/arrive collision (teacher-led, learner-resolved).** Blueprint's own conflict evidence for MC-WORD-CLASS-DETERMINED-BY-MEANING-ALONE. *Predict first*: "'Arrival' is about an action — arriving. Do you think that makes it a verb?" Then check for "the" and tense-marking and resolve.
4. **The context-dependent classification task (learner activity, TA-4).** *Predict first*: "Given these two sentences using the same word, do you think its class will be the same both times?" Then classify each and confirm together.

## Discovery Questions

This concept is well suited to **guided discovery**, since the evidence for both structural facts (class depends on sentence, not just word; grammatical signal beats meaning) is directly available through sorting and testing the learner's own sentences.

1. **Need**: "Does 'run' always do the same job in every sentence it appears in?"
2. **Playground**: the learner sorts a mixed set of word cards from several sentences to labeled stations, freely, without being told the classification rule in advance.
3. **Invention**: "For the word 'run,' can you find two sentences where it's doing two different jobs?" The learner searches and discovers class-shifting firsthand.
4. **Collision**: present "arrival" and ask the learner to classify it by feel, then check what "the" and tense-marking actually indicate.
5. **Formalization**: name the two structural facts — class depends on sentence-specific function, and grammatical signals (not meaning) are the reliable test — from the learner's own sorting evidence.
6. **Compression**: "Check the job, not the word — and check the signal, not the feel."

## Teaching Sequence

The pedagogical logic behind this arc:

- **The two most intuitive classes (nouns, verbs — TA-1) are established first**, giving the learner a secure foundation in the two categories most learners already have some informal sense of, before the harder describing-word distinction is introduced.
- **Describing words (adjectives, adverbs — TA-2) come second**, building on the noun/verb foundation since both adjectives and adverbs are defined by what they modify (a noun, or a verb/adjective/other adverb respectively) — a definition that only makes sense once nouns and verbs are already secure.
- **Connecting and substituting words (pronouns, prepositions, conjunctions — TA-3) come third**, deliberately grouped together as the more abstract, function-only categories, introduced only after the more concrete naming/describing categories are established, per the Blueprint's own chunked-introduction adaptive flag.
- **Context-dependent classification (TA-4) and grammatical-signal detection (TA-5) come last**, since both require the learner to already hold all eight classes in mind and apply them flexibly — TA-4 directly confronting MC-WORD-CLASS-IS-FIXED-PER-WORD and TA-5 directly confronting MC-WORD-CLASS-DETERMINED-BY-MEANING-ALONE, in that order, since TA-5's meaning-versus-signal distinction is harder and presupposes TA-4's class-shifting acceptance is already secure.

Turn-by-turn scripting, protocol routing, and adaptive flags: Blueprint **Component 7 — Session Architecture** and **Component 8 — Adaptive Flags** (in particular the function-over-meaning framing, the class-shifting-is-normal framing, the chunked introduction by function-group, and the L1-signal-transfer caution for S9 learners).

## Tutor Actions

In recommended order, from `../teaching-actions/`:

1. **Demonstration** (SHOW) — the word-class sorting stations and the run/run and arrival/arrive collisions.
2. **Matching** (DO) — sorting word cards to labeled stations is fundamentally a matching/classification action, directly exercising the core skill.
3. **Error Analysis** (TEST-THINKING) — both collisions function as guided error analysis against the learner's own plausible-but-incorrect assumption (fixed class, or meaning-based classification).
4. **Prediction** (TEST-THINKING) — predicting a word's class before checking grammatical signals, directly exercising the target discrimination and surfacing the learner's untested prior.
5. **Concept Map** (ORGANIZE) — a simple eight-station map (or a three function-group map, per the chunked-introduction flag) built from a real sentence, giving a compact artifact of the full class system.

**Does not fit**: **Game** — the eight-category system benefits from careful, deliberate sorting rather than speed-pressured competition, which could reward guessing over genuine signal-checking. **Role-Play** — no natural fit for a classification skill with no social or dialogic dimension.

## Voice Teaching Notes

This concept's core evidence is **spoken classification with justification** — the learner states a word's class and, critically, the *reason* (the grammatical signal or sentence role) rather than only the answer, since a correct class with no stated signal-check leaves the tutor unable to distinguish genuine signal-based reasoning from a lucky guess or residual meaning-based classification that happened to land correctly.

What the ideal tutor perceives:

- **A pause specifically before naming a class for a context-dependent or signal-versus-meaning-conflicting word** (run in "I went for a run," arrival) — positive evidence the learner is actually checking rather than reflexively answering from the word's most familiar class.
- **A justification citing grammatical signal ("it has 'the' in front of it," "it's showing an action right now") rather than meaning ("it's about arriving")** — the direct behavioral signature of having internalized the function-over-meaning test this concept exists to install.
- **Confident, immediate classification of a class-shifted word using its most familiar class, with no hesitation** — the direct behavioral signature of MC-WORD-CLASS-IS-FIXED-PER-WORD still active, distinguishable from a genuine signal-based classification that happens to agree with the familiar class by the complete absence of any checking pause.

**Load-bearing sentence, delivered slowly**: *"Don't ask what the word means — ask what job it's doing, right here, in this sentence."*

## Assessment Signals

Item bank: Blueprint **Component 6 — Mastery Probe Set** (MP-1…MP-5). Response-pattern reads, which the Blueprint does not own:

- **Noun/verb and adjective/adverb identification (MP-1, MP-2).** *Correct identification with a stated function ("cat" is the noun because it's the thing doing the action)* → full target evidence; *correct identification with no stated reasoning* → weaker evidence, since a correct guess cannot be distinguished from genuine function-based classification without the stated reason.
- **Pronoun/preposition/conjunction identification (MP-3).** These are the most abstract classes taught; watch specifically for confident misclassification of a preposition as a "describing word" (a common confusion given prepositions' relatively unfamiliar, purely relational function).
- **Context-dependent classification (MP-4).** This is this concept's most diagnostic item for MC-WORD-CLASS-IS-FIXED-PER-WORD — *correctly classifying the same word differently across the two sentences, with a stated reason for each* → the target evidence; *classifying both instances identically, matching the word's more familiar class* → the misconception still active.
- **Explanation (MP-5).** Listen for whether the explanation names both required elements — that class depends on sentence-specific function, not a fixed property, and that many words can shift class by context.

**Mastery certification trigger**: correct classification with stated grammatical-signal or functional reasoning (not meaning alone) across novel noun/verb, adjective/adverb, and pronoun/preposition/conjunction items; correct, independently-justified classification of the same word across two context-shifted sentences; and an explanation naming both the function-over-fixed-label principle and the signal-over-meaning test.

## Tutor Recovery Strategy

Generic engine: `../foundations/01-recovery-engine.md`. Concept-specific notes only:

- **"But 'run' is DEFINITELY a verb, it's an action word"** — take this as an accurate statement about run's *most common* class, not a mistake to be dismissed outright; respond by adding rather than contradicting: "You're right that 'run' is very often a verb — that's its most common job. But words can take on different jobs in different sentences, and I want to show you one where 'run' is doing a different job."
- **The smaller question to shrink to**: from full eight-class sorting, down to **classifying just the noun and verb in a single, simple sentence with no class-shifting or meaning/signal conflict at all.** This removes both misconceptions' trigger conditions entirely, isolating the most basic classification task before returning to harder, discrimination-testing cases.
- **Never shrink to "just guess based on what feels right."** This directly licenses the meaning-based shortcut MC-WORD-CLASS-DETERMINED-BY-MEANING-ALONE consists of, and would undermine the function-over-meaning habit this concept specifically builds.

## Memory Hooks

- **Concept type**: categorical classification skill requiring a specific, checkable test (grammatical signal/function) rather than a fixed lookup, plus a **discrimination component** (same word, different class) that must be actively maintained against the pull of a word's most familiar class.
- **Review form**: spaced items always mixing straightforward single-class words with class-shifted and meaning/signal-conflicting words in the same review cycle, never presenting only the easy cases, per this program's established interleaving principle for discrimination-skill concepts.
- **Interleaving partners**: the five direct unlocks (`eng.grammar.nouns`, `eng.grammar.verbs`, `eng.grammar.prepositions`, `eng.grammar.conjunctions`, `eng.grammar.interjections`) will each deepen one class individually; this overview's function-over-meaning test should continue to be invoked explicitly as each deeper class-specific concept introduces its own finer distinctions.

## Transfer Connections

- **Near**: `eng.grammar.nouns`, `eng.grammar.verbs`, `eng.grammar.prepositions`, `eng.grammar.conjunctions`, `eng.grammar.interjections` — all five direct unlocks, each taking one of this overview's eight broad classes to a much finer level of detail.
- **Real-world**: editing one's own writing for clarity often requires recognizing which word class is doing (or failing to do) its job in a sentence — e.g., recognizing a sentence lacks a clear verb, or that a modifier is misplaced relative to what it should describe.
- **Expert transfer**: the durable skill is **classifying by function/role rather than by surface feature or familiar category**, the same transfer skill needed in recognizing that a chemical's classification depends on its behavior in a specific reaction context rather than a fixed label, or that a musical chord's function (tonic, dominant) depends on its role within a specific key and progression rather than the notes themselves in isolation.

## Cross-Subject Connections

The KG records no `cross_links` entries for this concept.

- **No genuine mechanism-level connection to mathematics, physics, chemistry, or biology.** This concept's content (classifying words by grammatical function) does not describe a physical mechanism — stated explicitly, following established practice for concepts of this kind.
- **A genuine, general connection to the function-over-form reasoning pattern** (see Transfer Connections' expert-transfer note) — a transferable reasoning principle, not a KG-encodable subject-matter link given this curriculum's current domain structure.

## Blueprint References

Blueprint exists: `docs/curriculum/blueprints/eng.grammar.word-classes-overview.md`. Reused by reference, **not restated**:

- **Component 1 — Misconception Register**: both misconceptions' trigger signals, conflict evidence, bridge/replacement text, discrimination pairs. This entry adds birth-type classification and teaching consequences.
- **Component 2 — Prerequisite Diagnostic Block**: PD-1 and its fail-route to `eng.vocab.word-recognition`.
- **Component 3 — Concrete Anchor**: the word-class sorting stations script.
- **Component 4 — Conceptual Development Sequence**: TA-1…TA-5.
- **Component 5 — Worked Examples**: WE-1…WE-3.
- **Component 6 — Mastery Probe Set**: MP-1…MP-5, the item bank. This entry adds only the response-pattern reads.
- **Components 7–8**: session architecture, protocol routing (S0/S1/S6/S9, including the L1-grammar-system-transfer caution), and adaptive flags (function-over-meaning framing, class-shifting normalization, chunked introduction, L1-signal-transfer caution).

## Runtime Asset References

No seeded `AssetIdentity` records exist for this concept as of 2026-08-03. English carries no `HUMAN_CURATOR` authored-seed rows in production; existing English rows are `AI_AUTHORED` live-capture only (CLAUDE.md, AssetIdentity Global Audit). No assets created as part of authoring this entry.

## Curriculum Feedback

- **No missing cross-links identified.** The KG records no `cross_links` for this concept, and none is warranted — the concept's content is self-contained grammatical classification with no genuine cross-domain mechanism.
- **This program's first `eng.grammar.*` domain entry.** As with the first entries in `eng.listening.*`, `eng.speaking.*`, and `eng.vocab.*` (this program's three most recent domain-opening entries), this entry establishes a distinct evidence profile — spoken classification with stated justification — worth flagging to the Pipeline as a further data point on how domain-opening concepts' assessment needs vary systematically by domain.

## Version History

- v1.0 (2026-08-03): Initial entry. Blueprint reused by reference (Components 1–8). 2 misconceptions classified by birth type (both Type 1, overgeneralization). No cross-links to reconcile. First `eng.grammar.*` domain entry, evidence-profile observation recorded as Curriculum Feedback.
