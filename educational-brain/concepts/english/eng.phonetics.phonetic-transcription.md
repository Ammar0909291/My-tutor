# Phonetic Transcription — `eng.phonetics.phonetic-transcription`

## Identity

- **Concept ID**: `eng.phonetics.phonetic-transcription` (canonical
  English KG)
- **Curriculum location**: English / phonetics / "Phonetic
  Transcription" — transcribing spoken English words and utterances
  using IPA symbols, taught as a sound-first (never letter-first)
  process with explicit dialect awareness.
- **Prerequisites**: `eng.phonetics.ipa-basics`,
  `eng.phonetics.minimal-pairs` — both load-bearing: transcription
  requires the specific IPA symbol vocabulary the first concept
  installed, and the precise, one-phoneme-at-a-time discrimination
  discipline the second concept installed (distinguishing minimal
  pairs like "ship"/"sheep" requires exactly the segment-by-segment
  precision transcription demands).
- **Unlocks** (from KG): `eng.phonetics.prosody`. Full prosodic
  transcription (marking stress, intonation, and rhythm together)
  builds directly on the basic segmental-transcription skill and
  stress-marking practice (TA-3) this concept installs.
- **Difficulty**: proficient · **Bloom**: apply · **Mastery threshold**:
  0.75 · **Est. hours**: 3

## Learning Objective

The learner can:
1. Transcribe phonetically regular words into IPA using the say-
   segment-symbol process.
2. Transcribe words containing silent letters or digraphs correctly,
   recognizing that the number of IPA symbols reflects sounds spoken,
   not letters written.
3. Transcribe multisyllabic words with correctly placed primary stress
   marking.
4. Transcribe words with well-known dialect-dependent pronunciation
   differences according to a specified dialect, recognizing multiple
   transcriptions as simultaneously valid for different varieties.
5. Transcribe a short, natural connected phrase, applying sentence-
   stress and reduction knowledge to represent how it is actually
   spoken, not word-by-word in isolation.

## Core Understanding

Phonetic transcription represents SOUNDS, not letters — the number of
IPA symbols in a transcription depends entirely on how many sounds are
actually spoken, which is frequently different from the letter count:
"know" has 4 letters but only 2 spoken sounds (/noʊ/, with the silent
"k" contributing nothing), while "sing" has 4 letters but only 3 sounds
(/sɪŋ/, since "ng" together represents one sound /ŋ/, not two). The
reliable process is say-segment-symbol: say the word naturally,
segment it into its actual spoken sounds, and only then assign one IPA
symbol per sound — treating spelling as irrelevant to this process
entirely. A second, equally load-bearing fact is that phonetic
transcription always reflects a SPECIFIC accent or dialect — there is
no single universally correct transcription for every English speaker,
since real pronunciation genuinely varies by dialect ("dance" is
/dæns/ in General American but /dɑːns/ in Received Pronunciation, and
both are correct for their respective varieties). A transcription is
correct if it accurately represents how a real speaker of a specified
variety actually says the word, not if it matches some single, fixed,
universal standard.

## Mental Models

- **Beginner model — "transcription means substituting one IPA symbol
  for each written letter"**: the arriving, pre-instructional model
  this concept exists to correct — a natural extension of how spelling
  itself works (a symbol-per-letter system), giving no built-in signal
  that IPA represents sound rather than orthography until directly
  contrasted against a word with silent letters.
- **Intermediate model — "I can apply the say-segment-symbol process to
  phonetically regular words and to words with silent letters or
  digraphs"**: installed by TA-1's regular-word practice and TA-2's
  silent-letter/digraph practice, using the Component 3 say-segment-
  symbol anchor to make the process concrete and repeatable, resolving
  MC-TRANSCRIPTION-IS-SYMBOL-SUBSTITUTION-FOR-LETTERS. Upgrade
  trigger: correctly transcribing a genuinely novel word with silent
  letters, producing fewer symbols than letters without hesitation.
- **Advanced model — "I can integrate stress marking into full
  transcriptions"**: installed by TA-3's stress-marking practice,
  correctly combining the segmental transcription skill with the
  prerequisite chain's word-stress knowledge into one unified,
  complete transcription.
- **Expert model — "I understand transcription is dialect-specific, not
  universally singular, and I can transcribe connected, natural
  speech"**: installed by TA-4's dialect-variation practice (resolving
  MC-ONE-CORRECT-TRANSCRIPTION-EXISTS) and TA-5's connected-speech
  transcription, the concept's most integrated task, applying sentence-
  stress and reduction knowledge from prerequisite phonetics concepts
  to represent genuinely natural, connected speech rather than isolated
  words.
- **Do not upgrade early**: per the Blueprint's own Adaptive Flags, for
  S9 learners who speak a non-standard or regional English variety, or
  a non-native variety with systematic, legitimate differences from
  textbook RP/GA models, the tutor should explicitly validate the
  learner's own natural pronunciation as a legitimate transcription
  target in its own right — TA-4's dialect-awareness framing should be
  used to prevent the learner from feeling their own speech is
  "incorrect" relative to a textbook standard, not merely tolerated as
  an exception.

## Why Students Fail

Two independent failure mechanisms operate here, both reasonable
extensions of how the learner has been trained to relate letters to
sounds throughout literacy instruction. The letter-substitution failure
exists because the learner's entire prior experience of "representing
words in written symbols" is spelling itself, a genuinely letter-based
system — nothing in that extensive prior experience signals that IPA
transcription works by a completely different principle (sounds, not
letters) until a word with silent letters directly breaks the letter-
count-equals-symbol-count assumption. The single-correct-answer failure
exists because most of a learner's prior academic experience with
"correct answers" (spelling tests, math problems) genuinely does have
one right answer, so a learner reasonably extends this expectation to
transcription too, with nothing in typical early transcription practice
(which usually uses one dialect consistently) marking that legitimate
dialect variation produces multiple simultaneously-correct
transcriptions until directly confronted with two valid transcriptions
of the same word.

## Misconceptions

The existing Blueprint (`docs/curriculum/blueprints/
eng.phonetics.phonetic-transcription.md`, Component 1) documents both
misconceptions this concept produces, with full trigger/probe/bridge/
replacement/discrimination content — reused by reference below, with
birth-type classification added
(`../../misconceptions/01-birth-taxonomy.md`).

**MC-TRANSCRIPTION-IS-SYMBOL-SUBSTITUTION-FOR-LETTERS (Blueprint
Component 1) — Type 3, language contamination**
- *Why (birth-type addition)*: a Type 3 signature — the learner's
  entire, correctly-functioning spelling system (letters representing
  written words) intrudes into this new domain (IPA, representing
  spoken sounds), where a genuinely different principle operates; the
  learner is not misapplying a wrong rule, but rather correctly
  applying a well-learned, adjacent system (orthography) into a
  context where a different system (phonetic representation) actually
  governs.
- *Full trigger/probe/bridge/replacement/discrimination content*: see
  Blueprint Component 1, verbatim — not restated here.
- *Characteristic phrase (addition)*: a learner who, upon meeting a
  word with a silent letter, spontaneously says something like "wait,
  do I actually say that sound?" before transcribing is showing the
  say-segment-symbol discipline has generalized beyond the specific
  TA-1/TA-2 practice words.

**MC-ONE-CORRECT-TRANSCRIPTION-EXISTS (Blueprint Component 1) — Type 1,
overgeneralization**
- *Why (birth-type addition)*: exact Type 1 signature — the single-
  correct-answer expectation genuinely holds for the large majority of
  academic tasks a learner has encountered, so the learner extends this
  reliable pattern into transcription too, with nothing in typical
  single-dialect early practice marking that transcription is
  fundamentally descriptive of a specific variety, not prescriptive of
  one universal standard, until two valid transcriptions are directly
  compared.
- *Full trigger/probe/bridge/replacement/discrimination content*: see
  Blueprint Component 1, verbatim — not restated here.
- *Characteristic phrase (addition)*: a learner who, upon seeing a
  transcription differing from their own, spontaneously asks "is that
  just a different dialect, or did one of us make a mistake?" rather
  than assuming an error is showing the dialect-awareness model has
  generalized beyond the specific TA-4 practice examples.

## Analogies

- **Best analogy — the say-segment-symbol anchor itself is the analogy,
  not a supplement to it** (Blueprint Component 3): the explicit
  three-step process (say the word naturally, segment it into actual
  spoken sounds, symbol each segmented sound) applied first to a
  regular word and then to a silent-letter word directly embodies the
  sound-not-letter principle. Breaking point: a strict three-step
  sequence can make transcription feel more mechanical and slower than
  it eventually becomes with fluency — this entry treats the anchor as
  the introductory, deliberate-pace frame for building the discipline,
  not a claim that expert transcribers consciously perform three
  discrete steps every time.
- **Alternative — a musical transcription of a live performance, not a
  sheet-music lookup**: transcribing a live musical performance by ear
  (capturing what was actually played) is different from looking up a
  standard printed score — parallels capturing actual spoken sound
  rather than deriving from the written word's standard spelling.
  Breaking point: useful for reinforcing the by-ear, not by-reference
  process, but the say-segment-symbol anchor's explicit step structure
  more directly and concretely teaches the repeatable method itself.
- **ANTI-ANALOGY — do NOT describe a transcription that differs from a
  textbook's as potentially "wrong" before checking whether it reflects
  a different dialect**: framing any deviation from a textbook
  transcription as a likely error reinforces MC-ONE-CORRECT-
  TRANSCRIPTION-EXISTS directly; the correct default assumption for a
  differing transcription is "possible dialect difference, check
  first," not "probable error."

## Demonstrations

- **Physical/auditory (say-segment-symbol)**: the Blueprint's
  Component 3 anchor — canonical, referenced not restated.
- **Home/no-equipment**: any spoken word supplies real say-segment-
  symbol practice; no special materials are required beyond the
  learner's own voice and an IPA reference chart.
- **Interactive/learner-activity**: TA-4's dialect-comparison task and
  TA-5's connected-speech transcription are both hands-on, requiring
  the learner to actively produce and compare transcriptions, not
  merely recognize a stated fact.
- **Teacher-demo (silent-letter and dialect contrasts)**: the tutor
  models the Blueprint's own conflict-evidence demonstrations —
  segmenting "know" to reveal only 2 sounds despite 4 letters, and
  comparing /dæns/ with /dɑːns/ for "dance" — making both distinctions
  directly and memorably visible.
- **Prediction to elicit FIRST, every time**: before confirming a
  transcription (TA-1/TA-2) or a dialect-validity judgment (TA-4), ask
  the learner to attempt their own transcription before the tutor
  confirms — Universal Principle 3.

## Discovery Questions

**A brief, argued discovery step suits both misconceptions.** The
sound-not-letter principle and dialect variation are both genuine,
directly felt phenomena well-suited to guided discovery: **need** (the
learner, having secured IPA symbols and minimal-pair precision, is
asked to say "know" aloud and count the actual sounds); **playground/
invention** (TA-1's regular-word transcription across several examples
lets the learner build initial confidence in the say-segment-symbol
process); **collision** (the Blueprint's own "know" segmentation
breaks the letter-substitution assumption; the dance /dæns/ vs.
/dɑːns/ comparison breaks the single-correct-answer assumption);
**formalization** (MP-5's own-words explanation of both the process and
why spelling doesn't determine the answer); **compression** (TA-5's
fluent connected-speech transcription without each step separately
re-derived). There is no convention-bound terminology here requiring
separate direct instruction beyond IPA symbols themselves, already
covered by the prerequisite `eng.phonetics.ipa-basics` concept.

## Teaching Sequence

TA-1 (transcribing regular words) is placed first as the concept's
most accessible entry point, applying the say-segment-symbol process to
phonetically straightforward words before any complication is
introduced. TA-2 (transcribing words with silent letters or digraphs)
follows immediately, directly targeting MC-TRANSCRIPTION-IS-SYMBOL-
SUBSTITUTION-FOR-LETTERS — per the Blueprint's own session
architecture, this conflict-evidence probe comes right after TA-2,
once the learner has secure regular-word practice to contrast against
the silent-letter exception. TA-3 (transcribing with stress marking)
integrates the prerequisite chain's word-stress knowledge into full
transcriptions, extending the segmental skill (TA-1/TA-2) to include
suprasegmental marking. TA-4 (dialect variation in transcription) is
placed next, directly targeting MC-ONE-CORRECT-TRANSCRIPTION-EXISTS —
per the Blueprint's own explicit Adaptive Flags, this is deliberately
sequenced early enough (right after basic regular-word transcription is
secure) that dialect variation is framed as an interesting, expected
feature of the skill rather than a confusing contradiction discovered
much later. TA-5 (transcribing connected speech) is placed last as the
concept's fully integrated capstone, requiring segmental transcription,
stress marking, and now sentence-level connected-speech phenomena
(reduction, linking) all applied together to a natural phrase rather
than an isolated word. This entry does not restate the Blueprint's own
turn-by-turn session script (Component 7) — see Blueprint References
below.

## Tutor Actions

Dispatch order for this concept, from `../../teaching-actions/`:
1. **Demonstration** (`01-show-family.md #1`) — the say-segment-symbol
   anchor for TA-1/TA-2.
2. **Guided Practice (contextual)** — TA-1 and TA-2's regular-word and
   silent-letter transcription practice.
3. **Guided Practice (contextual)** — TA-3's stress-marking
   integration.
4. **Guided discovery** (`04-test-thinking-family.md`,
   discovery-adjacent) — TA-4's dialect-comparison task, eliciting the
   both-can-be-correct insight through direct dialect contrasts rather
   than stating the rule first.
5. **Guided Practice (contextual, extended)** — TA-5's connected-speech
   transcription, the concept's most integrated and productive task.

**What does NOT fit, and why**: Error Analysis
(`04-test-thinking-family.md #17`) is excluded before TA-1/TA-2 are
secure, per this domain's standing stability-guard reasoning —
planting a deliberately wrong transcription before the say-segment-
symbol process is established risks the learner absorbing the flawed
letter-substitution pattern as plausible; TA-4's own dialect-comparison
task already serves a closely related error-checking function once
the process is secure, distinguishing genuine dialect variation from
actual transcription errors.

## Voice Teaching Notes

- **What to listen for**: whether the learner says the target word
  aloud FIRST before attempting a transcription (rather than looking
  directly at the spelling and mapping letters) — this is the primary
  diagnostic signal for whether the say-segment-symbol discipline has
  genuinely become the default approach rather than a step performed
  only when reminded.
- **Characteristic hesitations**: a brief pause before finalizing a
  transcription that differs from an expected form, followed by a
  spontaneous check ("is this just a dialect thing?"), is a good sign
  — it suggests the learner is consciously applying TA-4's dialect-
  awareness discipline rather than assuming error. Instant, anxious
  self-correction toward a "standard" transcription with no
  consideration of dialect is the concerning pattern for MC-ONE-
  CORRECT-TRANSCRIPTION-EXISTS.
- **Own-dialect validation stakes**: real and specifically named in the
  Blueprint's own Adaptive Flags — for learners with non-standard or
  non-native English varieties, this concept genuinely is an
  opportunity to affirm that their own natural pronunciation is a
  valid, legitimate transcription target, not a deviation from a single
  "correct" model; this validation should be explicit and proactive,
  not merely reactive to an expressed anxiety.
- **The load-bearing sentence**: "say the word first — how many sounds
  do you actually hear?" is this concept's load-bearing sentence for
  MC-TRANSCRIPTION-IS-SYMBOL-SUBSTITUTION-FOR-LETTERS, per
  `../../foundations/03-voice-first-learning-model.md §3` — asked
  whenever a fresh word is presented for transcription, making the
  say-first step a routinely-invited response rather than an
  afterthought.

## Assessment Signals

- **Diagnostic (golden probe)**: the Blueprint's own conflict-evidence
  probes (Component 1) — the "know" letter-count-vs-sound-count check
  for MC-TRANSCRIPTION-IS-SYMBOL-SUBSTITUTION-FOR-LETTERS, and the
  dance /dæns//dɑːns/ comparison for MC-ONE-CORRECT-TRANSCRIPTION-
  EXISTS — each cleanly separate a learner still holding the
  misconception from one who has moved past it.
- **Guided practice → independent practice**: the Blueprint's WE-1 →
  WE-2 → WE-3 → MP-1 through MP-5 fading ladder is reused directly
  (Components 5–6) — not re-authored here.
- **Mastery gate set** (`../../assessment/05-mastery-verification.md
  §3`): regular-word transcription (MP-1); silent-letter/digraph
  transcription (MP-2, a strong diagnostic item for residual MC-
  TRANSCRIPTION-IS-SYMBOL-SUBSTITUTION-FOR-LETTERS); stress marking
  (MP-3); dialect-variation recognition (MP-4, a strong diagnostic item
  for residual MC-ONE-CORRECT-TRANSCRIPTION-EXISTS); explanation
  (MP-5, requiring articulation of both the say-segment-symbol process
  and the dialect-specificity principle in the learner's own words).
- **Interpretation of response pattern**: fast-and-correct
  transcription of regular words (MP-1) combined with a letter-count-
  matching (rather than sound-count-matching) transcription of a
  silent-letter word (MP-2) is the dangerous quadrant for MC-
  TRANSCRIPTION-IS-SYMBOL-SUBSTITUTION-FOR-LETTERS, warranting a
  return to TA-2's silent-letter practice. A learner who declares one
  of two dialect-different transcriptions "wrong" (MP-4) is showing
  MC-ONE-CORRECT-TRANSCRIPTION-EXISTS still active, warranting a
  return to TA-4.
- **Transfer items**: near (transcribing fresh regular and silent-
  letter words, recognizing fresh dialect variation); far (this
  concept's segmental and stress-marking skill transferring directly
  into `eng.phonetics.prosody`'s fuller treatment of stress,
  intonation, and rhythm together in transcription); real-world
  (transcribing genuinely everyday sentences and phrases the learner
  says, per the Blueprint's own retrieval seed).

## Tutor Recovery Strategy

Concept-specific application of `../../foundations/01-recovery-engine.md`:
- **"I don't know"** on a transcription task shrinks to the
  Component 3 say-segment-symbol anchor using the simplest, most
  familiar regular word available (e.g., "cat"), with the tutor
  modeling all three steps before the learner attempts a fresh word
  independently.
- **Likeliest utterance/behavior at this node**: for MC-TRANSCRIPTION-
  IS-SYMBOL-SUBSTITUTION-FOR-LETTERS, a confident letter-by-letter
  transcription attempt (rather than "I don't know") is more likely,
  especially on silent-letter words — route directly to the
  Blueprint's own conflict-evidence probe (say the word, count the
  actual sounds) rather than treating it as a generic transcription
  error. For MC-ONE-CORRECT-TRANSCRIPTION-EXISTS, anxious insistence
  that a differing transcription must be wrong is more likely than
  confusion — route directly to TA-4's dialect-awareness framing,
  explicitly reassuring the learner before continuing.
- **Non-verbal signal specific to this node**: a learner who
  spontaneously says a word aloud slowly, stretching each sound, before
  writing a transcription, without being prompted, is showing the
  say-segment-symbol discipline has generalized — this should be named
  and praised explicitly, per the Blueprint's own regulation-tail
  guidance (praising transcribing by ear over transcribing by
  spelling).

## Memory Hooks

**Concept type**: procedure — a repeatable transcription routine (say,
segment, symbol; add stress marking; account for dialect) applied to
genuinely novel words and phrases, rather than a fixed fact set,
following a skill-fluency pattern: correctness first (reliably applying
the three-step process, even slowly), then fluent, integrated
connected-speech transcription (TA-5) without needing each step
separately deliberated. Interleaving partners: mix regular-word and
silent-letter items (testing TA-1/TA-2) with stress-marking and
dialect-comparison items (testing TA-3/TA-4) in ongoing review, so the
learner continues exercising both the segmental process and the
suprasegmental/dialect-awareness dimensions as distinct, separately-
verified competencies.

## Transfer Connections

- **Near**: transcribing fresh regular and silent-letter words with
  correct stress marking, and recognizing fresh dialect variation as
  legitimate rather than erroneous.
- **Far**: this concept's segmental transcription and stress-marking
  skill is the direct foundation for `eng.phonetics.prosody`, which
  builds full prosodic transcription (stress, intonation, rhythm
  together) directly on top of this concept's foundational
  transcription competence.
- **Real-world**: every spoken word or sentence the learner produces or
  hears is an immediate, ungated opportunity to apply the say-segment-
  symbol process, including the learner's own everyday speech, per the
  Blueprint's own retrieval seed instruction.
- **Expert-transfer**: advanced work in linguistics, speech pathology,
  language teaching, or dialectology depends on fluent, accurate
  phonetic transcription as a foundational documentation and analysis
  tool.

## Cross-Subject Connections

None found in the KG's `cross_links` field (empty for this concept) and
none genuinely warranted at this level — phonetic transcription is
specific to English phonetics and does not carry a distinct,
separately-tracked transfer relationship into another subject in this
platform's canonical KG, beyond the within-English unlocking of
`eng.phonetics.prosody`, already covered under Transfer Connections
above.

## Blueprint References

A Blueprint exists: `docs/curriculum/blueprints/
eng.phonetics.phonetic-transcription.md`. This entry reuses, by
reference and without restating: Component 1's full misconception
trigger/probe/bridge/replacement/discrimination text (both
misconceptions), Component 3's say-segment-symbol anchor, Components
5–6's worked examples and mastery probe set (WE-1–3, MP-1–5), and
Component 7's full session architecture and protocol routing
(S0/S1/S6/S9). This entry's own contribution is the HOW-to-teach
reasoning layer: mental model progression across four stages, the
failure-mechanism analysis in "Why Students Fail" (identifying the
letter-substitution failure as Type 3 language contamination from the
learner's own correctly-functioning spelling system, and the single-
correct-answer failure as Type 1 overgeneralization of the genuinely
reliable single-answer pattern in most prior academic tasks), birth-
type classification, an explicit argued case for guided discovery on
both misconception-correcting insights, and the teaching-sequence
reasoning explaining why regular-word transcription (TA-1) must
precede the silent-letter exception (TA-2), which precedes stress
integration (TA-3) and early dialect-awareness introduction (TA-4),
converging in TA-5's fully integrated connected-speech capstone.

## Runtime Asset References

No seeded `AssetIdentity` records exist for this concept in
`src/lib/teaching/assets/authoredSeedAssets.ts`,
`src/lib/teaching/assets/brainSeedAssets.ts`, or any other seed source
file in this repository, and this entry does not create, seed, or
propose any as part of its authoring.

## Curriculum Feedback

None found — the KG node's prerequisites (`eng.phonetics.ipa-basics`,
`eng.phonetics.minimal-pairs`) and `unlocks`
(`eng.phonetics.prosody`) are both consistent with this concept's
actual teaching demands, and the continued `proficient` difficulty
(matching most of the domain's other concepts) appropriately reflects
the genuinely high integration demand of combining IPA symbol
knowledge, precise sound discrimination, stress marking, and dialect
awareness into one applied production skill.

## Version History

- 2026-08-06 — Initial authoring (English Educational Brain completion
  program, batch 19, concept 1 of N — completing eng.phonetics domain).
  All 21 Standard sections authored fresh against the live KG and
  existing Blueprint; no prior version existed.
