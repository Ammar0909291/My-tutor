# Word Families — `eng.vocab.word-families`

## Identity

- **KG ID**: `eng.vocab.word-families`
- **Name**: Word Families
- **Domain**: English / Vocab
- **Difficulty**: developing
- **Bloom level**: understand
- **Mastery threshold**: 0.75
- **Estimated hours**: 2
- **Requires**: `eng.vocab.word-recognition` — load-bearing part: the learner must already recognize a base word's meaning, since identifying genuine word-family membership requires checking whether related-looking words share that actual meaning, not merely spelling.
- **Unlocks**: `eng.vocab.compound-words`, `eng.vocab.prefixes`, `eng.vocab.suffixes`
- **Cross-links**: none encoded in the KG.
- **Blueprint**: `docs/curriculum/blueprints/eng.vocab.word-families.md`

## Learning Objective

The learner can:
1. Confirm that a group of words genuinely shares a root and a related meaning, constituting a true word family.
2. Distinguish a true word family from words that merely share similar spelling with no actual meaning connection.
3. Identify the word class (verb, noun, adjective, adverb) of each member within a word family, recognizing that members typically span multiple classes.
4. Generate additional members of a word family given its root word.
5. Use knowledge of a known root's meaning to infer the meaning of an unfamiliar word from the same family.

## Core Understanding

A true word family shares a **common base word or root with a related meaning**, not merely similar-looking letters — this is the concept's first load-bearing fact, and the test for genuine membership is always meaning, never spelling alone: "act," "action," "active," and "reaction" all relate to the idea of "doing," making them a genuine family, while "car," "care," and "card" merely happen to share letters at the start with no meaning connection whatsoever, making them spelling lookalikes rather than a family at all. The concept's second load-bearing fact is that **word-family members typically span multiple grammatical word classes**, all built from the same root meaning — "act" (verb), "action" (noun), "active" (adjective), and "actively" (adverb) are all genuine members of one family despite belonging to four different classes, because the shared-meaning test that defines family membership has nothing to do with matching word class; expecting every family member to share the founding word's class is a mismatched expectation, since word families are specifically a pattern of one meaning wearing several different grammatical "costumes."

## Mental Models

**Beginner — "if words start with the same letters, they're probably related — a word family."**
The runnable simulation: group words by shared spelling at the start, without checking whether the words actually mean anything related to each other. This is a reasonable default, since spelling similarity is the most immediately visible signal, and for many genuine word families (built by adding prefixes/suffixes to a shared root), spelling similarity and meaning connection do happen to coincide.
*Upgrade trigger*: the Blueprint's own conflict evidence — grouping "car," "care," and "card" together by spelling, then being asked whether any of the three actually relate to each other in meaning.
*Shelf-life warning at replacement*: "Shared letters can be a coincidence — check for an actual shared meaning before calling something a word family."

**Intermediate — "I check for shared meaning now, but I still expect every member of a family to be the same part of speech as the root word."**
The simulation: correctly rejects spelling-only lookalikes, but assumes a family built from a verb root must consist entirely of verbs, misclassifying or resisting members that are actually nouns, adjectives, or adverbs built from that same root.
*Upgrade trigger*: the Blueprint's own conflict evidence — being asked whether "action," in "his action surprised everyone," is doing a verb's job or a noun's job, after having assumed it must be a verb since "act" is.
*Shelf-life warning*: "Word families spread across different word classes on purpose — expect a verb, a noun, an adjective, and an adverb all from the same root."

**Advanced — "I check for genuine shared meaning to confirm family membership, and I expect (and can identify) multiple word classes within one family."**
The simulation: correctly tests any candidate group by meaning rather than spelling, and correctly anticipates and classifies the different grammatical forms a genuine family will typically include. This is the target model, matching TA-3/TA-4.
*Upgrade trigger*: the three direct unlocks (`eng.vocab.compound-words`, `eng.vocab.prefixes`, `eng.vocab.suffixes`), where this concept's root-and-affix pattern recognition becomes the foundation for analyzing exactly how words are built and combined.
*Shelf-life warning*: "This gives you the general pattern — root plus meaning, spread across word classes. The next steps go deep on the specific building blocks (compounds, prefixes, suffixes) that actually construct these families."

**Expert — "morphological analysis, at full fluency, happens largely automatically when encountering an unfamiliar word that shares a recognizable root with known vocabulary, with deliberate root-tracing reserved for genuinely opaque or unfamiliar-root cases."**
Named here to mark the arc; this concept's explicit root-checking routine is a scaffold for a skill that, at true vocabulary fluency, operates largely below conscious awareness for common, high-frequency roots — named here so the tutor understands the routine's eventual goal is fluent, automatic recognition, not a permanently maintained conscious procedure.

## Why Students Fail

The dominant failure mechanism is that **spelling similarity is the single most immediately visible signal**, and for a genuinely large number of everyday word families, spelling similarity and meaning connection do coincide (since English word families are typically built by adding recognizable prefixes/suffixes to a root, which preserves spelling similarity) — a learner's spelling-based grouping strategy is therefore reasonably well-reinforced most of the time, with failures surfacing only in the minority of cases where spelling similarity happens to be coincidental rather than meaning-bearing.

The second mechanism is that **grammatical consistency is a reasonable default expectation from most other vocabulary learning up to this point**, where a learner has generally encountered one word with one clear word class at a time — nothing in that prior experience needed to anticipate that a single root's family could legitimately span several different grammatical categories, since word class has not previously been the dimension along which a "family" of related words was organized.

The third mechanism, specific to learners whose first language builds words very differently from English (per the Blueprint's own S9 routing), is that **the underlying assumption this concept teaches — that words are built from a shared root plus modifying affixes — may not map cleanly onto that learner's own language structure at all**, making this concept's very premise, not merely its specific patterns, something that may require more foundational explanation for this population than for a learner whose L1 already works this way.

## Misconceptions

The Blueprint's **Component 1 — Misconception Register** owns the trigger signals, conflict evidence, bridge/replacement text, and discrimination pairs for both entries below. Reused by reference; birth-type classification and teaching consequence added here.

### MC-SIMILAR-SPELLING-MEANS-SAME-FAMILY
*(Blueprint Component 1, MC-SIMILAR-SPELLING-MEANS-SAME-FAMILY — includes the "act"-family/"car"-"care"-"card" and "sign"-family/"sin"-"sing" discrimination pairs.)*
- **Birth type**: Type 4 (notation-induced), where the visual/spelling pattern itself (shared starting letters) is mistaken for the actual meaning-bearing signal, an error rooted in surface written form rather than in overgeneralizing a correct rule or in perceptual/spoken confusion.
- **Teaching consequence of the birth type**: because the error is rooted in over-trusting a visual signal, the repair requires **an explicit, deliberate meaning-check step inserted between noticing spelling similarity and concluding family membership** — the Blueprint's own bridge text does this precisely, framing the meaning check as the actual test, with spelling similarity demoted to a mere first hint.
- **Verification of death**: given a novel set of spelling-similar words, the learner explicitly checks for a shared meaning connection before concluding family membership, correctly rejecting a spelling-similar-only group and correctly confirming a genuine family.

### MC-WORD-FAMILY-MEMBERS-ARE-ALWAYS-SAME-WORD-CLASS
*(Blueprint Component 1, MC-WORD-FAMILY-MEMBERS-ARE-ALWAYS-SAME-WORD-CLASS — includes the "act"/"action" and "create"-family discrimination pairs.)*
- **Birth type**: Type 1 (overgeneralization), of the reasonable default that related words should behave grammatically alike, extended past the cases where word-family membership specifically doesn't require class-matching.
- **Teaching consequence**: the repair requires **direct, concrete exposure to a family's own class-diverse members**, since an abstract claim that "families span multiple classes" is less convincing than personally testing a specific word's grammatical role in a real sentence, as the Blueprint's own conflict evidence does with "action."
- **Verification of death**: given a novel word family, the learner correctly identifies each member's distinct word class without assuming they must all match the root word's class.

## Analogies

**Best — a family reunion where relatives wear very different professional uniforms (a doctor, a chef, a mechanic, a teacher) but are all clearly related by blood.** The uniforms (word classes) look completely different from each other, but that doesn't change the underlying family relationship (shared root meaning) connecting them — you wouldn't conclude two relatives aren't related just because one wears scrubs and another wears an apron.
*Breaking point*: family relationships by blood are fixed and biologically determined, while word-family membership is a linguistic pattern with fuzzier, sometimes debatable edges (how distantly related is distantly related enough?) — useful for the different-costumes-same-relation intuition, less precise for implying word-family membership is as cleanly binary as blood relation.

**Alternative — a company's employees all wearing different department uniforms (sales, engineering, finance) but all carrying the same company logo.** The logo (the shared root and its meaning) is what actually identifies the connection; the different uniforms (word classes) are just the different roles each employee performs, and two employees in totally different departments can still both genuinely work for the same company.
*Breaking point*: a company logo is an arbitrary, assigned symbol with no inherent meaning connection to what it represents, while a word root's meaning genuinely does carry semantic content shared across its family — useful for the surface-difference-doesn't-break-the-connection intuition, less precise for the arbitrary-symbol aspect of a logo.

**Visual analogy — the word-family tree** (Blueprint Component 3): not a metaphor but the actual working instrument this concept's core teaching is organized around, explicitly contrasting a genuine meaning-rooted tree against an unconnected set of spelling lookalikes.

### ANTI-ANALOGIES (do not use)

- **"If words look alike at the start, they're probably from the same family."** Directly installs MC-SIMILAR-SPELLING-MEANS-SAME-FAMILY as a stated shortcut, precisely the spelling-over-meaning error this concept's first misconception consists of.
- **"Once you know one word in a family is a verb, the rest are verbs too."** Directly installs MC-WORD-FAMILY-MEMBERS-ARE-ALWAYS-SAME-WORD-CLASS as a stated rule, exactly the class-matching assumption this concept's second misconception's repair must counter.

## Demonstrations

Prediction first in every case.

1. **The word-family tree (learner activity).** Blueprint Component 3 — full script there. *Predict first*: "Do you think 'car,' 'care,' and 'card' belong on the same tree as 'act,' 'action,' and 'reaction'?" Then build both groups and confirm which genuinely connects.
2. **The "car"/"care"/"card" collision (teacher-led, learner-resolved).** Blueprint's own conflict evidence for the first misconception. *Predict first*: "Does 'care' have anything to do with a 'car' or a 'card'?" Then confirm no shared meaning and resolve.
3. **The "action" word-class collision (teacher-led, learner-resolved).** Blueprint's own conflict evidence for the second misconception. *Predict first*: "If 'act' is a verb, must 'action' also be a verb?" Then check "his action surprised everyone" and resolve.
4. **The family-member generation task (learner activity, TA-4).** *Predict first*: "How many members of the 'act' family can you list?" Then generate and confirm together.

## Discovery Questions

This concept is well suited to **guided discovery for both structural facts**, since the evidence for each (meaning-over-spelling; class-diversity-within-a-family) is directly checkable by the learner through comparing familiar word groups.

1. **Need**: "If two words look alike at the start, does that guarantee they're actually related in meaning?"
2. **Playground**: the learner sorts a mixed set of word groups (some genuine families, some spelling-lookalikes) freely, before being told the "official" answer.
3. **Invention**: "For each group, does checking the actual meaning agree with how you sorted by spelling?" The learner re-checks their own sort against meaning.
4. **Collision**: present a family's own members in different word classes and ask whether they still belong to the same family.
5. **Formalization**: name the two structural facts — meaning, not spelling, defines a family, and families span multiple word classes — from the learner's own evidence.
6. **Compression**: "Check the meaning, not just the letters — and expect different jobs, same root."

## Teaching Sequence

The pedagogical logic behind this arc:

- **Identifying a genuine word family from a root (TA-1) comes first**, establishing what a true family actually looks like with clear, unambiguous examples before any lookalike complication is introduced.
- **Distinguishing true families from spelling lookalikes (TA-2) comes second**, directly confronting MC-SIMILAR-SPELLING-MEANS-SAME-FAMILY once the learner has a secure positive example (TA-1) to contrast against — this ordering matters because the lookalike-rejection skill presupposes the learner already knows what a genuine family's meaning-connection looks like.
- **Word class variation within a family (TA-3) comes third**, directly confronting MC-WORD-FAMILY-MEMBERS-ARE-ALWAYS-SAME-WORD-CLASS only once true-family recognition (TA-1/TA-2) is secure, since class-variation awareness is a further refinement of an already-established family concept, not a substitute for it.
- **Generating family members (TA-4) and using family knowledge to infer meaning (TA-5) come last**, with TA-4 building productive, generative use of the pattern and TA-5 applying the full pattern to genuine vocabulary expansion — matching this program's established sequencing principle that a concept's most integrative, applied tasks are reserved for its culminating stage.

Turn-by-turn scripting, protocol routing, and adaptive flags: Blueprint **Component 7 — Session Architecture** and **Component 8 — Adaptive Flags** (in particular the meaning-over-spelling test priority, the word-class-diversity-is-expected framing, the generative-practice emphasis, and the morphological-system-transfer scaffolding for S9 learners).

## Tutor Actions

In recommended order, from `../teaching-actions/`:

1. **Demonstration** (SHOW) — the word-family tree and both collision scenarios.
2. **Matching** (DO) — sorting genuine families from spelling lookalikes (TA-2) is fundamentally a matching/classification action, directly exercising the core discrimination.
3. **Error Analysis** (TEST-THINKING) — both collisions function as guided error analysis against the learner's own plausible-but-incorrect grouping (spelling-based, or class-matching).
4. **Concept Map** (ORGANIZE) — the word-family tree itself (TA-1/TA-3) is naturally a concept-map artifact, and building it directly for a novel root (TA-4) reinforces both the meaning-connection and class-diversity facts at once.

**Does not fit**: **Game** — competitive speed pressure could reward fast spelling-based guessing over the deliberate meaning-checking habit this concept specifically builds. **Role-Play** — no natural social or dialogic dimension to a lexical morphology skill.

## Voice Teaching Notes

This concept's core evidence is **spoken classification with stated reasoning about meaning connection** — the learner's family-membership judgment plus, critically, the stated basis (a shared meaning, or an absence of one), since a correct judgment with no stated reasoning cannot be distinguished from a lucky spelling-based guess that happened to be correct.

What the ideal tutor perceives:

- **A stated meaning check accompanying a family-membership judgment** ("'act' and 'action' both relate to doing something, so yes") — the direct behavioral signature of genuine meaning-based testing rather than spelling-based grouping.
- **Confident, immediate grouping by shared starting letters, with no reference to meaning at all** — the direct behavioral signature of MC-SIMILAR-SPELLING-MEANS-SAME-FAMILY still active.
- **Correct, confident word-class identification across a family's diverse members, without surprise or resistance** ("create" is a verb, "creation" a noun, "creative" an adjective") — the target evidence for MC-WORD-FAMILY-MEMBERS-ARE-ALWAYS-SAME-WORD-CLASS's repair.

**Load-bearing sentence, delivered slowly**: *"Check the meaning, not the letters — and expect the same root to wear several different grammatical jobs."*

## Assessment Signals

Item bank: Blueprint **Component 6 — Mastery Probe Set** (MP-1…MP-5). Response-pattern reads, which the Blueprint does not own:

- **Genuine word family (MP-1) and spelling lookalike rejection (MP-2).** *Correct judgment with a stated meaning-based reason* → full target evidence; *correct judgment with no stated reason* → cannot be distinguished from a lucky guess.
- **Word class variation (MP-3).** This concept's most direct test of the second misconception; a correct classification of all members, with no hesitation or attempted "correction" toward a single shared class, is the target evidence.
- **Generating family members (MP-4).** A generative, productive-use item distinct from the receptive-identification items above; a short or empty list may indicate either genuine unfamiliarity with the specific root's extended family or continued reluctance to apply the pattern productively — distinguish by offering a hint root and checking whether generation improves.
- **Explanation (MP-5).** Listen for whether the explanation names both required elements — that word families are defined by shared root meaning rather than spelling, and that members typically span multiple word classes.

**Mastery certification trigger**: correct genuine-family and lookalike-rejection judgments with stated meaning-based reasoning on novel items; correct word-class identification across a novel family's members; a productive generation of at least several additional family members from a novel root; and an explanation naming both the meaning-over-spelling principle and the class-diversity principle.

## Tutor Recovery Strategy

Generic engine: `../foundations/01-recovery-engine.md`. Concept-specific notes only:

- **"But they start with the same letters, that has to mean something"** — take this as an accurate observation about spelling, not a mistake to be dismissed; respond by adding rather than contradicting: "You're right that they share letters — that's a real, useful first clue to check. Now let's see if they actually share a meaning too, or if it's just a coincidence."
- **"If 'act' is a verb, why isn't 'action' also a verb — that seems weird"** — a genuine, reasonable expectation of grammatical consistency; respond by naming the actual pattern directly: "It does feel like it should match, but word families are specifically about sharing a root MEANING, not a grammatical job — the same root can show up as a verb, a noun, an adjective, all doing different jobs in different sentences."
- **The smaller question to shrink to**: from a full generation-and-classification task, down to **confirming just one, maximally obvious genuine word family (e.g., happy/happiness/unhappy) with no lookalike or class-diversity complication at all.** This removes both discrimination demands entirely, isolating the most basic family-recognition skill before returning to harder, discrimination-requiring cases.
- **Never shrink to "if the letters match, just call it a family."** This directly licenses MC-SIMILAR-SPELLING-MEANS-SAME-FAMILY's spelling-based shortcut, undermining the meaning-check habit this concept specifically builds.

## Memory Hooks

- **Concept type**: morphological pattern-recognition skill (root-plus-meaning identification, spelling-lookalike rejection) with a generative component (producing new family members from a root) beyond passive recognition.
- **Review form**: spaced items always mixing receptive identification (recognize a family, reject a lookalike) with generative production (list family members from a root) in the same review cycle, since this program's established principle holds that receptive and productive skill layers must both be actively maintained, not just the easier receptive layer.
- **Interleaving partners**: the three direct unlocks (`eng.vocab.compound-words`, `eng.vocab.prefixes`, `eng.vocab.suffixes`) should be interleaved with this concept once introduced, since all three examine the specific morphological mechanisms (compounding, prefixing, suffixing) that actually construct the word families this concept teaches learners to recognize.

## Transfer Connections

- **Near**: `eng.vocab.compound-words`, `eng.vocab.prefixes`, `eng.vocab.suffixes` — all three direct unlocks, each examining one specific mechanism by which word-family members are actually constructed from roots.
- **Real-world**: rapidly expanding vocabulary when encountering an unfamiliar word that shares a recognizable root with an already-known word (e.g., inferring "creativity" from known "create") — the direct, practical, efficiency-multiplying payoff of this concept's root-based inference skill.
- **Expert transfer**: the durable skill is **recognizing that surface similarity (spelling, appearance) is not the same as genuine structural or causal relationship, and that a true underlying connection can manifest in superficially very different forms** — the same transfer skill needed in recognizing that two chemical compounds with similar names may or may not share a genuine structural relationship, or that two historical events with similar surface descriptions may or may not share a genuine causal connection.

## Cross-Subject Connections

The KG records no `cross_links` entries for this concept.

- **No genuine mechanism-level connection to mathematics, physics, chemistry, or biology.** This concept's content (lexical morphology — root-and-affix word structure) does not describe a physical mechanism — stated explicitly, following established practice for concepts of this kind.
- **A genuine, general connection to the surface-similarity-versus-genuine-connection discrimination principle** (see Transfer Connections' expert-transfer note) — a transferable reasoning principle, not a KG-encodable subject-matter link given this curriculum's current domain structure.

## Blueprint References

Blueprint exists: `docs/curriculum/blueprints/eng.vocab.word-families.md`. Reused by reference, **not restated**:

- **Component 1 — Misconception Register**: both misconceptions' trigger signals, conflict evidence, bridge/replacement text, discrimination pairs. This entry adds birth-type classification (Type 4 for the first, notation-induced; Type 1 for the second, overgeneralization) and teaching consequences.
- **Component 2 — Prerequisite Diagnostic Block**: PD-1 and its fail-route to `eng.vocab.word-recognition`.
- **Component 3 — Concrete Anchor**: the word-family tree script.
- **Component 4 — Conceptual Development Sequence**: TA-1…TA-5.
- **Component 5 — Worked Examples**: WE-1…WE-3.
- **Component 6 — Mastery Probe Set**: MP-1…MP-5, the item bank. This entry adds only the response-pattern reads.
- **Components 7–8**: session architecture, protocol routing (S0/S1/S6/S9, including the L1-morphological-system-transfer caution), and adaptive flags (meaning-over-spelling test, class-diversity-expected framing, generative-practice priority, morphological-transfer scaffolding).

## Runtime Asset References

No seeded `AssetIdentity` records exist for this concept as of 2026-08-03. English carries no `HUMAN_CURATOR` authored-seed rows in production; existing English rows are `AI_AUTHORED` live-capture only (CLAUDE.md, AssetIdentity Global Audit). No assets created as part of authoring this entry.

## Curriculum Feedback

- **No missing cross-links identified.** The KG records no `cross_links` for this concept, and none is warranted given the concept's self-contained morphological content.
- **This concept's first misconception (Type 4, notation-induced) is a genuinely rare birth type in this program's authoring so far**, most prior misconceptions having been Type 1 (overgeneralization) or Type 3 (language contamination) — worth flagging to the Pipeline as confirmation that the birth-taxonomy's less-common types do appear in genuine authored content, not merely as theoretical categories.

## Version History

- v1.0 (2026-08-03): Initial entry. Blueprint reused by reference (Components 1–8). 2 misconceptions classified by birth type (Type 4 notation-induced; Type 1 overgeneralization). No cross-links to reconcile. Rare-birth-type observation recorded as Curriculum Feedback.
