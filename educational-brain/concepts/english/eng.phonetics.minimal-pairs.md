# Minimal Pairs — `eng.phonetics.minimal-pairs`

## Identity

- **Concept ID**: `eng.phonetics.minimal-pairs` (canonical English KG)
- **Curriculum location**: English / phonetics / "Minimal Pairs" —
  the diagnostic application of the IPA transcription skill just
  installed, teaching a precise, testable definition of phonemic
  contrast rather than a loose intuition of "similar-sounding words."
- **Prerequisites**: `eng.phonetics.ipa-basics` — specifically fluent
  transcription in both directions; load-bearing because this
  concept's entire method (judge minimal-pair status by transcribing
  and comparing symbol-by-symbol) is impossible without a learner
  already able to produce an accurate IPA transcription on demand.
- **Unlocks** (from KG): `eng.phonetics.syllable-stress`. Minimal pairs
  and syllable-level stress marking both depend on precise, symbol-
  level attention to a word's sound structure; the discipline of
  checking sound-by-sound (rather than by impression) that this
  concept installs is the direct prerequisite habit for the fine-
  grained stress judgments the downstream concept requires.
- **Difficulty**: developing · **Bloom**: apply · **Mastery
  threshold**: 0.75 · **Est. hours**: 2

## Learning Objective

The learner can:
1. Determine whether two words are a true minimal pair by transcribing
   both into IPA and verifying exactly one phoneme position differs.
2. Correctly judge minimal-pair status for words whose spelling
   misleadingly suggests agreement or disagreement with their actual
   pronunciation.
3. Identify which word of a known minimal pair was spoken, from sound
   alone, with no spelling shown.
4. Generate a valid minimal-pair partner for a given word by changing
   exactly one phoneme.
5. Identify or generate a minimal pair that isolates a specific target
   phoneme contrast, connecting the technique to its diagnostic
   purpose.

## Core Understanding

A minimal pair is two words that differ in exactly ONE phoneme, in the
same position, with every other sound identical — this precise,
countable definition is the entire point of the concept, not an
incidental detail. The precision matters because a minimal pair is a
DIAGNOSTIC INSTRUMENT: by holding every sound constant except one, it
isolates that single contrast for targeted perception or production
testing, which is exactly why a pair differing in two or more sounds
fails to serve the same purpose — it cannot tell you whether a learner
struggles with sound A, sound B, or both. A second, equally load-
bearing fact is that minimal-pair status is determined entirely by
SOUND, never by spelling — English orthography is unreliable enough
that some visually very different word pairs are pronounced
identically (true homophones, which have ZERO sound difference and are
therefore NOT a minimal pair either, despite superficially "matching"
the concept's spirit), while some visually similar-looking pairs
differ in several sounds when transcribed accurately. The only reliable
method is to transcribe first, using the prerequisite concept's IPA
skill, and judge from the transcription.

## Mental Models

- **Beginner model — "minimal pairs are words that sound similar to
  each other"**: a loose, imprecise starting intuition, directly
  targeted by TA-1's contrastive true/false sorting, which uses the
  Component 3 one-slot-swap anchor to make the exact one-phoneme-
  difference definition physically countable rather than an impression.
- **Intermediate model — "I verify minimal-pair status by transcribing
  both words and counting exactly how many phoneme positions differ"**:
  the correct, operational model, installed by TA-1 and reinforced by
  TA-2's spelling-trap cases. Upgrade trigger: correctly rejecting a
  loosely-similar but two-phoneme-different pair (cat/bad) as not a
  minimal pair, using the transcription check rather than an impression
  of overall similarity.
- **Advanced model — "minimal-pair judgment is entirely sound-based;
  spelling is irrelevant and can actively mislead"**: installed by
  TA-2, resolving MC-SPELLING-DIFFERENCE-EQUALS-SOUND-DIFFERENCE
  directly — the learner correctly identifies a homophone pair
  (night/knight) as having ZERO sound difference (and therefore not a
  minimal pair either) despite very different spelling, and correctly
  identifies genuine sound differences hidden behind superficially
  similar spelling. Upgrade trigger: correct judgment on a word pair
  whose spelling actively suggests the wrong answer.
- **Expert model — "I can both perceive a target contrast auditorily
  and generate new pairs that isolate it, connecting the technique to
  its actual diagnostic purpose"**: installed by TA-3 (auditory-only
  perception, no spelling shown), TA-4 (generation), and TA-5 (targeted
  contrast selection), culminating in the concept's genuine functional
  use — testing or training perception/production of one specific,
  chosen phoneme contrast, often one the learner's own L1 background
  makes genuinely difficult.
- **Do not upgrade early**: a learner not yet reliably transcribing
  both words of a candidate pair before judging (TA-1) should not be
  given TA-3's auditory-only perception task — perception without a
  transcription check removes the very verification method this
  concept is built around, and should only be introduced once the
  underlying transcribe-then-compare discipline is already secure in
  writing.

## Why Students Fail

Two independent failure mechanisms operate here. The loose-similarity
failure exists because "sounds kind of alike" is a genuinely useful and
common everyday judgment, and nothing in ordinary language use requires
the stricter, technical, exactly-one-phoneme definition this concept
introduces — a learner reasonably applies their pre-existing, looser
notion of similarity until the precise definition is explicitly
demonstrated as different and more useful. The spelling-based-judgment
failure exists for the identical structural reason already established
across this domain (in `eng.phonetics.ipa-basics` and even earlier in
the phonics domain): a learner's entire prior literacy experience has
trained them to judge word relationships from their WRITTEN form, and
extending that entirely reasonable habit into a domain (phoneme-level
sound comparison) where it specifically and predictably fails is not a
new error type, but the same overextension pattern recurring for the
third time in this curriculum's phonetics/phonics arc.

## Misconceptions

The existing Blueprint (`docs/curriculum/blueprints/
eng.phonetics.minimal-pairs.md`, Component 1) documents both
misconceptions this concept produces, with full trigger/probe/bridge/
replacement/discrimination content — reused by reference below, with
birth-type classification added
(`../../misconceptions/01-birth-taxonomy.md`).

**MC-ANY-SIMILAR-WORDS-ARE-MINIMAL-PAIRS (Blueprint Component 1) — Type
1, overgeneralization**
- *Why (birth-type addition)*: the learner's pre-existing, correct-in-
  its-own-context notion of "similar-sounding words" is extended,
  unmodified, into a domain (formal phonetic analysis) that requires a
  much stricter, countable criterion — a genuinely useful everyday
  concept over-applied to a technical context where precision is the
  entire point, the classic Type 1 signature of a valid-elsewhere rule
  meeting an unmarked boundary.
- *Full trigger/probe/bridge/replacement/discrimination content*: see
  Blueprint Component 1, verbatim — not restated here.
- *Characteristic phrase (addition)*: a learner who, after transcribing
  both words of a rejected candidate pair, says something like "oh,
  that's actually two things different, not one" (rather than needing
  the tutor to point out the count) is showing the transcribe-and-count
  discipline has already become a genuine self-check, not merely a
  tutor-prompted correction.

**MC-SPELLING-DIFFERENCE-EQUALS-SOUND-DIFFERENCE (Blueprint Component
1) — Type 1, overgeneralization**
- *Why (birth-type addition)*: this is the third appearance of the
  same underlying overgeneralization pattern in this curriculum's
  phonetics/phonics arc (following the vowel-digraph and silent-e
  concepts' own reliable-pattern overreach, and the immediately-prior
  IPA-basics concept's spelling-matches-transcription error) — a
  correctly-learned prior habit (letters and sounds broadly correspond)
  extended into a domain specifically designed to expose its
  exceptions. This recurring pattern across the curriculum is itself
  worth naming explicitly to a learner who has met it before, rather
  than treating each instance as an isolated surprise.
- *Full trigger/probe/bridge/replacement/discrimination content*: see
  Blueprint Component 1, verbatim — not restated here.
- *Characteristic phrase (addition)*: a learner who, on being shown
  "night"/"knight," immediately reaches for a transcription rather than
  a visual comparison ("let me write these out first") is showing the
  advanced model is already the default strategy — a stronger and
  faster resolution than a learner who needs the specific homophone
  example demonstrated before adopting the transcribe-first habit.

## Analogies

- **Best analogy — the one-slot-swap game itself is the analogy, not a
  supplement to it** (Blueprint Component 3): physically swapping
  exactly one symbol slot to produce a valid pair, versus swapping two
  to produce an invalid one, makes the countable, precise definition
  directly visible and manipulable. Breaking point: the slot-swap game
  presents words as a fixed-length sequence of discrete slots, which
  works cleanly for same-length CVC-style words but understates that
  minimal pairs can also involve words of different phoneme COUNTS in
  some analyses (e.g., an added or deleted sound) — this entry restricts
  the anchor's use to same-position substitution cases, matching the
  Blueprint's own worked examples, and does not extend it to insertion/
  deletion pairs without qualification.
- **Alternative — a single-letter word-ladder puzzle (cat→bat→bad, one
  letter changed per step)**: reinforces the one-change-at-a-time
  discipline in a familiar puzzle format. Breaking point: word-ladder
  puzzles operate on LETTERS, while minimal pairs operate on SOUNDS —
  this analogy must be explicitly reframed as sound-slots, not letter-
  slots, or it risks reinforcing the very spelling-based misconception
  this concept exists to correct.
- **ANTI-ANALOGY — do NOT describe minimal pairs as "words that look
  almost the same"**: a "look" framing directly installs
  MC-SPELLING-DIFFERENCE-EQUALS-SOUND-DIFFERENCE by anchoring the
  judgment to visual/spelling similarity rather than sound. Minimal
  pairs must always be introduced and described in terms of SOUND
  ("words that are pronounced almost the same, differing in exactly one
  sound"), never appearance.

## Demonstrations

- **Physical/auditory-visual (one-slot-swap game)**: the Blueprint's
  Component 3 anchor — canonical, referenced not restated.
- **Home/no-equipment**: the slot-swap can be performed verbally or
  with written IPA symbols on paper, requiring no special materials.
- **Interactive/learner-activity**: TA-3's auditory-only perception task
  and TA-4's generation task are both hands-on, felt/generative
  activities requiring live production or discrimination, not
  recognition of pre-made examples.
- **Teacher-demo (homophone contrast)**: the tutor models transcribing
  "night" and "knight" side by side, showing the identical result and
  explicitly naming this as a homophone pair (zero difference) rather
  than a minimal pair (exactly one difference) — directly instantiating
  the Blueprint's own conflict-evidence probe and reinforcing that both
  "too many differences" and "zero differences" fail the minimal-pair
  test.
- **Prediction to elicit FIRST, every time**: before confirming a
  minimal-pair judgment (TA-1/TA-2) or an auditory identification
  (TA-3), ask the learner to predict/guess before the tutor confirms —
  Universal Principle 3.

## Discovery Questions

**A brief, argued discovery step suits the precise definition itself;
direct instruction is correct for its diagnostic PURPOSE.** The exact
one-phoneme-difference criterion is well-suited to a felt discovery
moment built directly into the Blueprint's own TA-1/Component-3 design:
**need** (the learner's loose "similar words" intuition is challenged
by being asked to compare cat/bat against cat/bad); **playground/
invention** (the one-slot-swap game lets the learner manipulate the
comparison directly, sliding one symbol versus two); **collision**
(TA-2's spelling-trap cases, especially the homophone example, directly
break any purely visual or impressionistic rule the learner may have
silently adopted); **formalization** (MP-5's own-words statement of the
exact definition); **compression** (TA-4's fluent generation of valid
pairs without needing to re-derive the counting rule each time). The
DIAGNOSTIC PURPOSE of minimal pairs (isolating one contrast for
targeted testing) is better served by direct instruction — this is a
functional fact about why the tool is useful, not a pattern to
rediscover, and TA-5 explicitly states and applies this purpose once
the definitional skill is secure.

## Teaching Sequence

TA-1 (identifying true minimal pairs) must precede TA-2 (spelling-trap
cases) because the base transcribe-and-count skill must be secure on
straightforward examples before it is tested against cases specifically
designed to mislead a learner relying on spelling. TA-3 (auditory-only
perception) is placed after both written-analysis TAs, deliberately,
because — per the Blueprint's own explicit Adaptive Flag — auditory
practice with no spelling shown is what actually builds the perceptual
discrimination skill real-world listening requires; introducing it
before the written definition is secure would conflate learning the
DEFINITION with practicing the PERCEPTION skill the definition serves.
TA-4 (generation) is placed after perception because generating a
valid pair is a more demanding, productive task than merely judging or
perceiving a given pair, requiring the learner to search their own
vocabulary against the one-phoneme-change constraint. TA-5 (targeted-
contrast pairs) is placed last as the concept's functional capstone,
connecting the whole skill to its genuine diagnostic purpose — testing
or training a SPECIFIC, often L1-relevant, phoneme contrast — which
only makes sense once identification, spelling-independence, perception,
and generation are all separately secure. This entry does not restate
the Blueprint's own turn-by-turn session script (Component 7) — see
Blueprint References below.

## Tutor Actions

Dispatch order for this concept, from `../../teaching-actions/`:
1. **Demonstration** (`01-show-family.md #1`) — the one-slot-swap game
   anchor for TA-1.
2. **Guided discovery** (`04-test-thinking-family.md`,
   discovery-adjacent) — TA-2's spelling-trap cases, eliciting the
   sound-not-spelling principle through direct conflict with visual
   expectation.
3. **Classification/Discrimination** (`04-test-thinking-family.md`,
   perception-adjacent) — TA-3's auditory-only which-word-did-you-hear
   task.
4. **Generation** (`04-test-thinking-family.md #19`) — TA-4's minimal-
   pair-partner generation, a direct instance of producing novel
   instances satisfying a constraint.
5. **Self-Explanation Prompt** (`04-test-thinking-family.md #18`) —
   MP-5's own-words statement of the definition and its diagnostic
   purpose.

**What does NOT fit, and why**: Error Analysis
(`04-test-thinking-family.md #17`) on the base one-phoneme-difference
definition is excluded before TA-1/TA-2 are secure, per this domain's
standing stability-guard reasoning. It becomes well-suited to TA-2's
spelling-trap territory specifically once the transcribe-first
discipline is established — a deliberately spelling-matched (incorrect)
judgment of a homophone pair can be productively analyzed there, since
the learner has an explicit transcription-based check to apply.

## Voice Teaching Notes

- **What to listen for**: whether the learner audibly or visibly
  transcribes both candidate words BEFORE stating a minimal-pair
  judgment, versus answering immediately from impression — this
  transcribe-first behavior is the primary diagnostic signal for
  whether the correct method (not merely the correct occasional answer)
  has been internalized.
- **Characteristic hesitations**: a pause on a spelling-trap pair,
  accompanied by visibly writing out both transcriptions before
  answering, is a strong positive sign; a fast, confident judgment based
  on how the words look (with no transcription attempt) is the
  concerning pattern, independent of whether the eventual answer
  happens to be correct.
- **Pronunciation stakes**: central and dialect-sensitive — several of
  this concept's own worked examples (route/root, night/knight) are
  genuinely dialect-dependent for whether they are homophones at all,
  so minimal-pair judgments must be made against the LEARNER's own
  natural pronunciation, never a single reference accent; this is
  explicitly a place where "it depends on how you say it" is a
  legitimate, correct answer, not evasion.
- **The load-bearing sentence**: "transcribe both, then count — how
  many sounds are actually different?" is this concept's load-bearing
  sentence and should be repeated before every judgment task, per
  `../../foundations/03-voice-first-learning-model.md §3`.

## Assessment Signals

- **Diagnostic (golden probe)**: the Blueprint's own conflict-evidence
  probe (Component 1) — transcribing "cat"/"bad" and counting the
  differing positions — cleanly separates a learner still using a loose
  similarity judgment from one applying the precise, countable
  definition.
- **Guided practice → independent practice**: the Blueprint's WE-1 → WE-2
  → WE-3 → MP-1 through MP-5 fading ladder is reused directly
  (Components 5–6) — not re-authored here.
- **Mastery gate set** (`../../assessment/05-mastery-verification.md
  §3`): production (fresh true/false minimal-pair judgment, MP-1);
  spelling-independence (MP-2, a dialect-sensitive homophone case — the
  concept's single most diagnostic item for resisting spelling-based
  judgment); perception (MP-3, auditory-only, no spelling); generation
  (MP-4); explanation-and-purpose (MP-5, requiring the learner to state
  not just the definition but WHY the precision matters diagnostically).
- **Interpretation of response pattern**: fast-and-correct judgment on
  a spelling-trap pair (accompanied by a visible or narrated
  transcription step) confirms the sound-based method is fully
  internalized. Fast-and-WRONG judgment on a spelling-trap pair (going
  with the visually suggested answer with no transcription attempt) is
  the dangerous quadrant, signaling the spelling-matching habit remains
  dominant and warranting a return to TA-2's transcribe-first modeling
  rather than more straightforward-pair practice.
- **Transfer items**: near (a fresh, non-trap minimal-pair judgment);
  far (a minimal pair or near-miss using a phoneme contrast not heavily
  rehearsed during teaching); real-world (a minimal pair targeting the
  learner's own known difficult L1 contrast, per TA-5 — this concept's
  single most practically valuable application).

## Tutor Recovery Strategy

Concept-specific application of `../../foundations/01-recovery-engine.md`:
- **"I don't know"** on a minimal-pair judgment shrinks to the
  Component 3 one-slot-swap game using the most familiar pair available
  (typically "cat"/"bat," the first taught), with the tutor modeling
  the physical/written slot-count first.
- **Likeliest utterance/behavior at this node**: a confident but
  imprecise "yes, they sound similar" judgment (rather than "I don't
  know") is more likely on a near-miss pair, per
  MC-ANY-SIMILAR-WORDS-ARE-MINIMAL-PAIRS's mechanism — route directly
  to that misconception's recovery (transcribe both, count positions)
  rather than treating it as generic uncertainty. On a spelling-trap
  pair, a confident judgment matching the visual impression (rather
  than the actual sound) is more likely than hesitation — redirect
  explicitly to "transcribe first" rather than confirming or denying
  the guess.
- **Non-verbal signal specific to this node**: a learner who reaches
  for paper or visibly mouths both words slowly before answering is
  showing the correct transcribe-or-carefully-listen-first behavior
  even on items where the final judgment needs correction — this should
  be named and praised explicitly.

## Memory Hooks

**Concept type**: procedure — a verification procedure (transcribe,
then count differing positions) applied to novel word pairs, following
a skill-fluency pattern: correctness first (accurate transcription and
counting, even slowly), then speed, with particular attention to
spelling-trap cases as a standing review category, since the spelling-
matching shortcut is deeply overlearned from ordinary literacy and prone
to resurfacing under time pressure even after initial correction.
Interleaving partners: mix true minimal pairs, near-misses (2+
differences), and homophones (0 differences) within the same practice
set, rather than blocking by category, so the learner cannot predict
the answer type from context and must apply the actual counting
procedure each time.

## Transfer Connections

- **Near**: judging and generating fresh, previously-unpracticed
  minimal pairs.
- **Far**: this concept's precise, sound-based comparison discipline
  transfers directly to `eng.phonetics.syllable-stress`, which requires
  the same fine-grained, symbol-level attention to a word's sound
  structure rather than an impressionistic reading.
- **Real-world**: minimal-pair practice is the standard, widely-used
  technique for targeted pronunciation training on a specific difficult
  contrast — directly applicable to the learner's own ongoing spoken-
  English development outside the lesson.
- **Expert-transfer**: eventual accent/dialect analysis and formal
  phonological contrast studies, both well downstream, depend on the
  minimal-pair concept being genuinely precise and diagnostic rather
  than loosely understood.

## Cross-Subject Connections

None found in the KG's `cross_links` field (empty for this concept) and
none genuinely warranted at this level — minimal-pair analysis is
specific to phonetics/linguistics and does not carry a real transfer
relationship into another subject in this platform's canonical KG.

## Blueprint References

A Blueprint exists: `docs/curriculum/blueprints/
eng.phonetics.minimal-pairs.md`. This entry reuses, by reference and
without restating: Component 1's full misconception trigger/probe/
bridge/replacement/discrimination text (both misconceptions),
Component 3's one-slot-swap game anchor, Components 5–6's worked
examples and mastery probe set (WE-1–3, MP-1–5), and Component 7's full
session architecture and protocol routing (S0/S1/S6/S9). This entry's
own contribution is the HOW-to-teach reasoning layer: mental model
progression across four stages, the failure-mechanism analysis in "Why
Students Fail" (identifying both misconceptions as Type 1
overgeneralizations, and explicitly naming this as the third recurrence
of the spelling-vs-sound overreach pattern in this curriculum's
phonetics/phonics arc), birth-type classification, an explicit argued
case for felt discovery on the precise definition paired with direct
instruction on its diagnostic purpose, and the teaching-sequence
reasoning explaining why auditory-only perception must follow, not
precede, the written definitional work, and why targeted-contrast
practice is deliberately placed last as the concept's functional
capstone.

## Runtime Asset References

No seeded `AssetIdentity` records exist for this concept in
`src/lib/teaching/assets/authoredSeedAssets.ts`,
`src/lib/teaching/assets/brainSeedAssets.ts`, or any other seed source
file in this repository, and this entry does not create, seed, or
propose any as part of its authoring.

## Curriculum Feedback

None found — the KG node's prerequisite
(`eng.phonetics.ipa-basics`), `unlocks`
(`eng.phonetics.syllable-stress`), difficulty, and mastery threshold
are all consistent with this concept's actual teaching demands.

## Version History

- 2026-08-06 — Initial authoring (English Educational Brain completion
  program, batch 9, concept 1 of N). All 21 Standard sections authored
  fresh against the live KG and existing Blueprint; no prior version
  existed.
