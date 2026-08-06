# Syllable Types — `eng.phonics.syllable-types`

## Identity

- **Concept ID**: `eng.phonics.syllable-types` (canonical English KG)
- **Curriculum location**: English / phonics / "Syllable Types" — the
  concept that generalizes every single-syllable vowel-sound rule
  taught so far (closed, silent-e, digraph vowel-teams) into a unified
  six-type framework, and the direct enabler of multisyllabic-word
  decoding.
- **Prerequisites**: `eng.phonics.digraphs` — specifically the vowel-
  digraph (vowel-team) pattern, which becomes one of the six syllable
  types this concept names explicitly; load-bearing because a learner
  cannot classify a vowel-team SYLLABLE without already recognizing
  vowel-team SPELLING. `eng.phonics.long-vowels-silent-e` — specifically
  the closed-vs-silent-e structural check; load-bearing because two of
  the six syllable types (closed, silent-e) are precisely the two
  categories that concept already taught, now given formal names within
  a larger system.
- **Unlocks** (from KG): `eng.phonics.decoding-fluency`. Fluent
  reading of connected text requires effortless multisyllabic word
  decoding, which this concept's syllable-division-then-type-
  identification procedure directly enables — a learner cannot become
  fluent while still treating longer words as unpredictable guessing
  targets.
- **Difficulty**: developing · **Bloom**: apply · **Mastery
  threshold**: 0.75 · **Est. hours**: 3

## Learning Objective

The learner can:
1. Classify a single-syllable word into one of six syllable types
   (closed, open, silent-e, vowel-team, r-controlled, consonant-le) and
   produce its correct vowel sound.
2. Divide a two-syllable word into its component syllables using
   standard division patterns.
3. Apply the correct vowel-sound rule for each identified syllable type,
   checking type before defaulting to any single rule.
4. Decode the two least-intuitive syllable types (r-controlled,
   consonant-le) with the same reliability as the four more familiar
   types.
5. Divide, type, and read a genuinely unseen multisyllabic word,
   demonstrating the systematic approach generalizes beyond practiced
   examples.

## Core Understanding

Every English syllable belongs to one of six structural types, and each
type reliably signals its own vowel sound — this is the single
unifying insight that retroactively organizes everything the phonics
domain has taught piecemeal so far. Closed syllables (ending in a
consonant) take the short vowel; open syllables (ending in the vowel
itself, nothing closing it) take the long vowel; silent-e syllables
take the long vowel via the distance-acting mechanism already taught;
vowel-team syllables usually take a long vowel via the two-letter
spelling pattern already taught; r-controlled syllables produce a
DISTINCT third vowel quality that is neither short nor long (the "r"
changes the vowel's quality entirely, e.g. "car," "her," "bird");
consonant-le syllables are an unstressed final syllable pattern with a
schwa-like vowel (table, little, purple). The genuinely new content
here is not four of these six types (already taught under different
names) but the EXPLICIT NAMING and SYSTEMATIZATION of all six as one
checkable framework, plus the two previously-untaught types
(r-controlled, consonant-le), and — critically — the procedure for
applying this framework to multisyllabic words: divide into syllables
first, identify each syllable's type second, then decode using that
type's specific rule, never a single default rule applied uniformly.

## Mental Models

- **Beginner model — "I can sort single-syllable words into six labeled
  categories and say each one's vowel sound"**: installed by the
  Component 3 sorting-hats anchor, giving the six-type system a
  concrete, physical form before it is applied to anything more
  complex than single syllables the learner already knows how to read.
  This model retroactively re-labels prior knowledge (closed, silent-e,
  vowel-team) rather than teaching new content for those three types.
- **Intermediate model — "I can divide a two-syllable word and identify
  each piece's type"**: installed by TA-2, a genuinely new skill — 
  syllable DIVISION — layered on top of the type-recognition the
  beginner model already provides. Upgrade trigger: correct division of
  an unfamiliar two-syllable word into its syllable boundaries, not
  merely typing already-divided syllables.
- **Advanced model — "I check syllable type before applying a vowel
  rule, rather than defaulting to the earliest-learned rule"**:
  installed by TA-3, resolving MC-ALL-SYLLABLES-FOLLOW-THE-SAME-PATTERN
  directly. This is the model that prevents the closed-syllable rule
  (taught earliest, drilled most) from being over-applied to open,
  r-controlled, or consonant-le syllables. Upgrade trigger: correct
  vowel-sound production on an OPEN syllable specifically, since this is
  the type most likely to be mis-read as closed by a learner still
  under-checking type.
- **Expert model — "I can extend this system to genuinely unseen
  multisyllabic words, including the two less-intuitive types"**:
  installed by TA-4 (dedicated r-controlled/consonant-le practice) and
  TA-5 (full novel-word integration), resolving
  MC-MULTISYLLABIC-WORDS-ARE-UNPREDICTABLE — a long word stops being a
  guessing target once it is reliably decomposable into typed,
  individually-decodable pieces.
- **Do not upgrade early**: per the Blueprint's own explicit sequencing,
  a learner not yet secure classifying single syllables (TA-1) should
  not be given two-syllable division (TA-2) — division presupposes
  reliable per-syllable typing as its output, and a learner without that
  base has no way to check whether a division attempt produced correct,
  typeable pieces.

## Why Students Fail

Two independent failure mechanisms operate here. The whole-word-
guessing failure exists because multisyllabic words are visually
longer and denser than anything a beginning reader has decoded so far,
and the sheer visual load can trigger a shift away from systematic
decoding toward pattern-matching against known words the new word
superficially resembles (guessing "repeat" for "reptile") — this is a
strategy shift under cognitive load, not a belief that the word is
truly unreadable. The single-rule-over-application failure exists
because the closed-syllable/short-vowel rule is, by a wide margin, the
FIRST and most heavily drilled rule in the entire phonics domain
(introduced in `eng.phonics.short-vowels` and reinforced across several
subsequent concepts) — a learner reasonably reaches for the most
practiced, most available rule when faced with a new syllable, and this
default is silently wrong for five of the six types.

## Misconceptions

The existing Blueprint (`docs/curriculum/blueprints/
eng.phonics.syllable-types.md`, Component 1) documents both
misconceptions this concept produces, with full trigger/probe/bridge/
replacement/discrimination content — reused by reference below, with
birth-type classification added
(`../../misconceptions/01-birth-taxonomy.md`).

**MC-MULTISYLLABIC-WORDS-ARE-UNPREDICTABLE (Blueprint Component 1) —
Type 2, perceptual intuition**
- *Why (birth-type addition)*: this is a strategy shift under
  perceptual/cognitive load rather than a wrongly-generalized rule — the
  learner has not concluded "long words follow no rules," they have
  reflexively substituted a lower-effort strategy (whole-word visual
  matching) when the systematic decoding strategy feels too effortful to
  apply to a visually dense word, distinguishing this from Type 1's
  rule-overgeneralization mechanism.
- *Full trigger/probe/bridge/replacement/discrimination content*: see
  Blueprint Component 1, verbatim — not restated here.
- *Characteristic phrase (addition)*: a learner who, when shown the
  syllable division of a word they just mis-guessed, says something
  like "oh, that's actually easy when you break it up" is showing rapid
  and complete resolution — the misconception was a strategy-choice
  artifact, not a genuine belief the word was unreadable, and needs no
  further repair once the division technique is demonstrated once.

**MC-ALL-SYLLABLES-FOLLOW-THE-SAME-PATTERN (Blueprint Component 1) —
Type 1, overgeneralization**
- *Why (birth-type addition)*: exact Type 1 signature — the closed-
  syllable rule is genuinely, overwhelmingly the FIRST rule taught and
  most heavily reinforced across this domain's history, and a learner
  extends its reliability (correctly established in its own, narrower
  domain) into the five other syllable types where it does not apply,
  with nothing in prior instruction marking that boundary until this
  concept makes the six-way distinction explicit.
- *Full trigger/probe/bridge/replacement/discrimination content*: see
  Blueprint Component 1, verbatim — not restated here.
- *Characteristic phrase (addition)*: a learner who reads an open
  syllable with a short vowel and shows NO hesitation (fully confident)
  is showing the misconception in its strongest form; a learner who
  reads it wrong but then pauses, seeming to sense the syllable "looks
  different" from the closed pattern even without being able to say why,
  is already partway toward the advanced model and needs less
  intervention.

## Analogies

- **Best analogy — six different keys, each opening a different lock,
  and you must check which lock you're facing before choosing a key**:
  the six syllable types are distinct locks; the vowel-sound rules are
  the keys; checking structure BEFORE decoding is choosing the right key
  for the lock actually in front of you, not the key that happened to
  work last time. Breaking point: keys/locks implies a rigid, all-or-
  nothing match, whereas some syllable types (vowel-team) still carry
  some flexibility (exceptions) — the analogy targets the CHECKING
  discipline, not the absolute reliability of every type equally.
- **Alternative — sorting hats, reused directly from Component 3**: the
  physical sorting-hat anchor is itself the primary teaching analogy for
  this concept and should be referenced, not restated as new content.
- **ANTI-ANALOGY — do NOT describe multisyllabic words as "just longer
  versions of the same kind of word"**: this framing understates the
  genuine structural work syllable division and per-type checking
  require, and risks reinforcing the whole-word pattern-matching
  shortcut this concept exists to correct. Always frame a multisyllabic
  word as "several separate syllable puzzles joined together," not as
  one bigger version of a familiar single-syllable puzzle.

## Demonstrations

- **Physical/auditory-visual (syllable-type sorting hats)**: the
  Blueprint's Component 3 anchor — canonical, referenced not restated.
- **Home/no-equipment**: the six-type sort can be rehearsed verbally,
  without physical hat cards, once the categories are familiar; any
  household object labels can substitute for icon cards.
- **Interactive/learner-activity**: TA-2's syllable-division task and
  TA-5's full multisyllabic decoding are both hands-on, generative
  activities requiring the learner to produce a division and typing,
  not merely recognize one.
- **Teacher-demo (rule-mismatch contrast)**: the tutor models reading
  "ba" in "baby" first with a (wrong) short vowel, then with the
  correct long vowel, explicitly naming that the syllable is OPEN (no
  closing consonant) and therefore takes the long-vowel rule, not the
  closed-syllable default — making the type-check discipline audible.
- **Prediction to elicit FIRST, every time**: before confirming a
  syllable's type and vowel sound (TA-1/TA-3), ask the learner to
  predict the type from the spelling structure alone — Universal
  Principle 3.

## Discovery Questions

**A brief, argued discovery step suits recognizing the SIX-TYPE
FRAMEWORK as a unifying system; direct instruction is correct for the
two genuinely new types.** Four of the six types (closed, silent-e,
vowel-team, and implicitly open, via its contrast with closed) have
already been taught piecemeal across this domain — TA-1's own design
supports a discovery framing for the INSIGHT that these are members of
one system: **need** (the learner, secure on closed and silent-e
separately, meets "baby" and mis-reads its open first syllable);
**playground** (the sorting-hats anchor presents several single-
syllable examples across types to sort); **invention** (the learner is
guided to notice each hat/type has its OWN vowel rule, generalizing
from the already-known closed/silent-e/vowel-team cases to infer that
"open" must have a rule too); **collision/formalization** (TA-3's
explicit type-checking requirement, MP-5's own-words statement of why
six types matter); **compression** (TA-5's fluent application to novel
multisyllabic words). R-controlled and consonant-le, by contrast, are
genuinely new content with no prior partial exposure — these are
correctly taught by direct instruction in TA-4, since there is no prior
partial pattern for the learner to extend or discover; the r-colored
vowel quality and the consonant-le schwa pattern must simply be
demonstrated.

## Teaching Sequence

TA-1 (single-syllable typing) must precede TA-2 (two-syllable division)
because dividing a word into syllables is only useful once each
resulting piece can be reliably typed and decoded — division without
secure single-syllable typing produces pieces the learner cannot yet
do anything with. TA-3 (type-specific rule application) is placed
immediately after division, not folded into TA-1, because it is the
concept's core corrective content (checking type before applying a
rule) and depends on the learner already being able to both divide
AND type before the checking discipline can be meaningfully practiced.
TA-4 (r-controlled and consonant-le) is placed after the four more
familiar types are integrated, per the Blueprint's own explicit
Adaptive Flag naming these as needing "dedicated, separate attention" —
introducing them earlier, mixed in with the four already-partially-
known types, would not give them the proportionate focus their genuine
novelty requires. TA-5 (full multisyllabic decoding) is placed last as
the complete integration and generalization check, requiring division,
typing, and all six type-specific rules operating together on
genuinely unseen words. This entry does not restate the Blueprint's own
turn-by-turn session script (Component 7) — see Blueprint References
below.

## Tutor Actions

Dispatch order for this concept, from `../../teaching-actions/`:
1. **Classification/Sorting** (`05-organize-family.md #20`) — TA-1's
   six-type sort, using the sorting-hats anchor.
2. **Guided Practice (generative)** — TA-2's syllable-division task,
   a production skill applied to progressively less familiar words.
3. **Guided discovery** (`04-test-thinking-family.md`,
   discovery-adjacent) — TA-3's type-checking discipline, elicited via
   guided noticing of the open-syllable contradiction rather than
   stated as a rule up front.
4. **Demonstration + Guided Practice** — TA-4's dedicated introduction
   to r-controlled and consonant-le syllables, justified as direct
   TELL/SHOW content since neither has a discoverable precedent.
5. **Self-Explanation Prompt** (`04-test-thinking-family.md #18`) —
   MP-5's own-words statement of why the six-type system matters.

**What does NOT fit, and why**: Error Analysis
(`04-test-thinking-family.md #17`) on the base four types is excluded
before TA-1/TA-2 are secure, per this domain's standing stability-guard
reasoning. It becomes strongly defensible on TA-3's type-checking
discipline specifically — presenting a plausible-but-wrong open-
syllable-read-as-closed error for analysis directly targets
MC-ALL-SYLLABLES-FOLLOW-THE-SAME-PATTERN once the learner has an
explicit six-type framework to check the error against.

## Voice Teaching Notes

- **What to listen for**: whether the learner audibly pauses to check
  a syllable's TYPE before producing its vowel sound (even a brief,
  silent "checking" beat) versus immediately defaulting to the closed-
  syllable/short-vowel sound regardless of the actual structure — this
  checking behavior, present or absent, is the single most diagnostic
  signal for MC-ALL-SYLLABLES-FOLLOW-THE-SAME-PATTERN.
- **Characteristic hesitations**: a pause specifically on an open
  syllable (rather than a closed one) is expected and appropriate — open
  syllables are the type most likely to trigger the wrong default, so a
  deliberate check there is evidence the advanced model is developing,
  not a sign of struggle.
- **Pronunciation stakes**: real — an r-controlled vowel misread as a
  short or long vowel is genuinely incorrect (the r-colored quality is
  phonemically distinct), so this should be corrected directly rather
  than treated as dialect variation, though some regional r-controlled
  vowel realizations do vary and should be judged against the learner's
  own natural pronunciation of that quality, not a single reference
  accent.
- **The load-bearing sentence**: "what type is this syllable — check
  before you decode" is this concept's load-bearing sentence and should
  be repeated across every syllable-division task until it becomes the
  learner's own standing habit, per
  `../../foundations/03-voice-first-learning-model.md §3`.

## Assessment Signals

- **Diagnostic (golden probe)**: the Blueprint's own conflict-evidence
  probe (Component 1) — reading "ba" in "baby" with a short vowel and
  asking what's different about how the syllable ends compared to a
  closed syllable — cleanly separates a learner still defaulting to one
  rule from one who is beginning to check type.
- **Guided practice → independent practice**: the Blueprint's WE-1 → WE-2
  → WE-3 → MP-1 through MP-5 fading ladder is reused directly
  (Components 5–6) — not re-authored here.
- **Mastery gate set** (`../../assessment/05-mastery-verification.md
  §3`): production (fresh single-syllable typing, MP-1 — specifically
  testing r-controlled, the least intuitive type, per the Blueprint's
  own MP-1 choice); division (a novel two-syllable word divided and
  typed, MP-2); consonant-le specifically (MP-3 — the other
  least-intuitive type, given its own dedicated probe); full-integration
  (a genuinely novel multisyllabic word divided, typed, and read, MP-4 —
  the concept's single strongest mastery signal, per the Blueprint's own
  Adaptive Flag naming novel-word generalization as "the actual mastery
  bar"); explanation (MP-5).
- **Interpretation of response pattern**: fast-and-correct typing and
  reading of a novel multisyllabic word confirms the system is fully
  internalized; fast-and-WRONG on an open or r-controlled syllable
  (applying the closed-syllable default without hesitation) is the
  dangerous quadrant — it signals the type-check has not become
  standing practice, and warrants returning to TA-3's explicit checking
  discipline rather than more single-syllable drilling. A visible but
  brief pause before correctly typing a less-familiar type (r-
  controlled, consonant-le) is an acceptable, even expected,
  intermediate state.
- **Transfer items**: near (a fresh two-syllable word using familiar
  types); far (a three-syllable word combining multiple types, e.g.
  "adventure," testing whether the system scales beyond two syllables);
  real-world (any multisyllabic word encountered in the learner's own
  reading).

## Tutor Recovery Strategy

Concept-specific application of `../../foundations/01-recovery-engine.md`:
- **"I don't know"** on a multisyllabic word shrinks to the Component 3
  sorting-hats task using a single, already-classified syllable from the
  word (isolate just the first syllable and ask "what type is this
  one?") rather than asking the learner to divide and type the whole
  word at once.
- **Likeliest utterance/behavior at this node**: a confident whole-word
  guess based on visual resemblance (rather than "I don't know") is
  more likely, per MC-MULTISYLLABIC-WORDS-ARE-UNPREDICTABLE's mechanism
  — when this pattern appears, route directly to that misconception's
  recovery (immediately model the syllable division, showing the word
  is not actually a mystery) rather than treating it as a generic
  reading error.
- **Non-verbal signal specific to this node**: a learner who visibly
  traces or marks syllable boundaries with a finger before attempting
  to read a long word is showing the correct division-first behavior
  even on items where the final read is imperfect — this should be
  praised explicitly as correct process.

## Memory Hooks

**Concept type**: procedure — a checking-and-decoding procedure (divide,
type, apply the type-specific rule) rather than a stored fact set,
following a skill-fluency pattern: correctness first (each type
correctly identified and decoded, even slowly), then speed, with
ongoing attention to the two least-intuitive types (r-controlled,
consonant-le) as a standing review priority since they are most prone
to being under-practiced relative to the four more familiar types.
Interleaving partners: mix all six syllable types within the same
practice set (never block practice by type) so the learner cannot
predict a syllable's type from context or position, directly rehearsing
the type-CHECKING discipline rather than pattern-matched recall.

## Transfer Connections

- **Near**: dividing, typing, and reading fresh two-syllable and
  three-syllable words.
- **Far**: this concept's systematic division-then-type approach
  transfers directly to `eng.phonics.decoding-fluency`, where fluent
  reading of connected text depends on this concept's multisyllabic-
  word skill being effortless enough to leave attention free for
  comprehension and expression.
- **Real-world**: any multisyllabic word in the learner's environment
  (signs, books, their own or others' names) is immediate, ungated
  practice.
- **Expert-transfer**: fluent, automatic multisyllabic decoding during
  silent reading, and eventual awareness of how syllable structure
  interacts with spelling patterns in vocabulary and spelling
  instruction well beyond this node.

## Cross-Subject Connections

None found in the KG's `cross_links` field (empty for this concept) and
none genuinely warranted at this level — the six-syllable-type
framework is specific to English orthography and does not carry a real
transfer relationship into another subject.

## Blueprint References

A Blueprint exists: `docs/curriculum/blueprints/
eng.phonics.syllable-types.md`. This entry reuses, by reference and
without restating: Component 1's full misconception trigger/probe/
bridge/replacement/discrimination text (both misconceptions),
Component 3's syllable-type sorting-hats anchor, Components 5–6's
worked examples and mastery probe set (WE-1–3, MP-1–5), and Component
7's full session architecture and protocol routing (S0/S1/S6/S9). This
entry's own contribution is the HOW-to-teach reasoning layer: mental
model progression across four stages, the failure-mechanism analysis in
"Why Students Fail" (distinguishing a perceptual strategy-shift under
load from a genuine rule-overgeneralization), birth-type classification,
an explicit argued case for a brief unifying discovery step on the
already-partially-known types paired with direct instruction on the two
genuinely novel types, and the teaching-sequence reasoning explaining
why r-controlled/consonant-le deserve dedicated, separate attention
rather than being folded into the earlier TAs.

## Runtime Asset References

No seeded `AssetIdentity` records exist for this concept in
`src/lib/teaching/assets/authoredSeedAssets.ts`,
`src/lib/teaching/assets/brainSeedAssets.ts`, or any other seed source
file in this repository, and this entry does not create, seed, or
propose any as part of its authoring.

## Curriculum Feedback

None found — the KG node's prerequisites
(`eng.phonics.digraphs`, `eng.phonics.long-vowels-silent-e`), `unlocks`
(`eng.phonics.decoding-fluency`), difficulty, and mastery threshold are
all consistent with this concept's actual teaching demands. The step up
to `developing` difficulty (from `foundational` at every prior phonics
concept) and the correspondingly lower 0.75 mastery threshold
appropriately reflect this concept's genuinely higher integration
demand — six categories rather than one or two, applied to
multisyllabic rather than single-syllable words.

## Version History

- 2026-08-06 — Initial authoring (English Educational Brain completion
  program, batch 6, concept 1 of 2). All 21 Standard sections authored
  fresh against the live KG and existing Blueprint; no prior version
  existed.
