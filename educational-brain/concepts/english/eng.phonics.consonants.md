# Consonant Sounds — `eng.phonics.consonants`

## Identity

- **Concept ID**: `eng.phonics.consonants` (canonical English KG)
- **Curriculum location**: English / phonics / "Consonant Sounds" — the
  first content concept downstream of the blending/decoding gateway,
  where letter-sound knowledge begins to specialize into the two major
  sound classes (consonants here; vowels at the sibling
  `eng.phonics.short-vowels` node).
- **Prerequisites**: `eng.phonics.letter-sound-correspondence` —
  specifically the general symbol-to-sound mapping principle that entry
  installs; load-bearing because this concept assumes the learner
  already accepts that letters stand for sounds and is now asking WHICH
  sound, for the specific case of consonants, including the two letters
  ("c," "g") whose sound is context-dependent.
- **Unlocks** (from KG): `eng.phonics.consonant-blends`. Consonant
  blends (two or more consonant sounds pronounced in sequence without a
  vowel between them, e.g., "st," "bl") are meaningless to a learner who
  cannot yet reliably produce single consonant sounds in isolation —
  this concept's TA-1 fluency is the direct prerequisite skill blends
  compose.
- **Difficulty**: foundational · **Bloom**: understand · **Mastery
  threshold**: 0.85 · **Est. hours**: 2

## Learning Objective

The learner can:
1. Produce the correct sound for each of the 18 core single consonant
   letters (excluding c, g, x, q, which need special handling) in
   isolation, on sight of the letter.
2. Isolate and produce the initial consonant sound of a spoken word
   before attempting to read or blend the whole word.
3. Determine whether "c" or "g" takes its hard or soft sound by
   checking the letter immediately following it, on both familiar and
   novel words.
4. Distinguish a genuine silent-letter exception (e.g., the "k" in
   "knife") from evidence that the single-consonant-sound system is
   unreliable in general.

## Core Understanding

Eighteen of the twenty-one English consonant letters map to one
consistently reliable sound each, and this reliability is the actual
foundation the rest of English decoding is built on — it is not a
convenient simplification but a genuinely true statistical property of
the writing system. Two letters, "c" and "g," are conditioned: each
represents one of two possible sounds, and which one is fully
predictable from a single, checkable rule — the identity of the very
next letter (a, o, u following → hard sound; e, i, y following → soft
sound). This is categorically different from true irregularity: it is
not an exception to memorize per word but a second-order rule, itself
completely reliable once known. A small number of true exceptions exist
on top of this system (silent letters in specific words: "knife,"
"island," "write") — these are genuinely arbitrary and must be learned
per word, but they are statistically rare and do not undermine the
core system's reliability for the vast majority of words.

## Mental Models

- **Beginner model — "each consonant letter has one sound that always
  applies"**: the correct starting model for 18 of 21 letters, installed
  directly by the Component 3 sound-wall anchor pairing each letter with
  a fixed picture referent. Sufficient for TA-1/TA-2 but breaks the
  moment "c" or "g" appears in a word whose sound differs from the
  learner's first-taught example.
- **Intermediate model — "'c' and 'g' are exceptions to memorize per
  word"**: a plausible but incorrect stopgap a learner may form when
  first encountering "cent" or "gem" without yet being taught the
  conditioning rule — treats each hard/soft instance as an arbitrary
  fact rather than a predictable pattern. This is not a stage to pass
  through approvingly; it should be intercepted by TA-3 before it
  hardens, since per-word memorization does not generalize to novel
  words (Learning Objective 3 specifically tests generalization).
- **Advanced model — "'c' and 'g' are conditioned by the following
  letter, and I can predict the sound before saying it"**: the correct,
  operational model — installed by TA-3's guided discovery and verified
  by TA-4's application to unseen words. Upgrade trigger: successful
  prediction (not just recognition) of hard/soft sound on a genuinely
  novel word before confirming.
- **Expert model — "the reliable system and its exceptions are two
  separate layers, and I check which one applies"**: TA-5's explicit
  reliable-vs-exception sort installs the discipline of NOT treating a
  silent-letter exception as evidence the whole system is unpredictable
  — this is the model that must be secure before the much larger
  exception inventory encountered in `eng.phonics.digraphs` and beyond
  can be integrated without eroding confidence in the reliable core.
- **Do not upgrade early**: a learner still unreliable on TA-1's basic
  18-consonant set should not be given hard/soft c/g work (TA-3) —
  the conditioning rule is a refinement layered ON TOP of secure single-
  sound production, not a substitute path around it.

## Why Students Fail

Two independent failure mechanisms operate here. The hard/soft c/g
failure exists because the learner's very first exposure to each letter
typically comes from a single word (often "cat" for c, "goat" for g),
which silently teaches an implicit one-sound-per-letter rule that is
true for 18 letters and false for these two — the learner is not wrong
to have generalized from their evidence, they simply have not yet met
the conditioning rule that resolves the apparent inconsistency. The
one-letter-one-sound rigidity failure exists because the reliable
18-letter system is taught so thoroughly and successfully that a learner
reasonably extends it into an absolute, universal claim — when a silent
letter then breaks that absolute claim (as in "knife" or "write"), a
learner who has over-generalized the rule's reliability into
in-fallibility experiences this as the whole system failing, rather
than as one specific, listable exception on top of an otherwise-intact
system.

## Misconceptions

The existing Blueprint (`docs/curriculum/blueprints/
eng.phonics.consonants.md`, Component 1) documents both misconceptions
this concept produces, with full trigger/probe/bridge/replacement/
discrimination content — reused by reference below, with birth-type
classification added (`../../misconceptions/01-birth-taxonomy.md`).

**MC-C-AND-G-ARE-SINGLE-SOUND-LETTERS (Blueprint Component 1) — Type 1,
overgeneralization**
- *Why (birth-type addition)*: the one-letter-one-sound rule is
  genuinely valid for 18 of 21 consonant letters — this is Type 1's
  exact signature, a rule correctly learned in its dominant domain
  (most consonants) silently extended into the two letters where it
  does not hold, with nothing marking the boundary until it is crossed.
- *Full trigger/probe/bridge/replacement/discrimination content*: see
  Blueprint Component 1, verbatim — not restated here.
- *Characteristic phrase (addition)*: a learner who, on meeting "city"
  for the first time, reads it with a hard /k/ and shows no surprise or
  self-correction is demonstrating the misconception is still fully
  active — a learner who pauses or hesitates on the same word is likely
  already sensing the conflict, even before it is named, which is a
  more advanced (if still unresolved) state than confident misreading.

**MC-EVERY-LETTER-MAKES-EXACTLY-ONE-SOUND (Blueprint Component 1) — Type
1, overgeneralization**
- *Why (birth-type addition)*: symmetric in mechanism to the c/g
  misconception above but operating at a higher level of generality —
  here the over-extended rule is not "this specific letter has one
  sound" but "the ENTIRE consonant system never has silent letters or
  digraph exceptions," extended from the correctly-learned reliable
  core into territory (silent letters, digraphs) the core rule was
  never meant to cover.
- *Full trigger/probe/bridge/replacement/discrimination content*: see
  Blueprint Component 1, verbatim — not restated here.
- *Characteristic phrase (addition)*: a learner who insists a silent
  letter "must" be pronounced, even after hearing a fluent native
  pronunciation of the word, is showing a stronger and more entrenched
  form of this misconception than one who simply mispronounces the word
  once and self-corrects on hearing feedback — the former needs the
  reliable-core-vs-exception framing (TA-5) explicitly, not merely a
  single correction.

## Analogies

- **Best analogy — a locked-and-predictable combination for c/g: "check
  the letter right after, then choose"**: framing the hard/soft rule as
  a simple, mechanical two-step check (look at the next letter; a/o/u →
  hard, e/i/y → soft) rather than a fact to memorize per word. Breaking
  point: a learner may over-apply this exact mnemonic to other
  consonants that have no such conditioning (e.g., expecting "d" or "n"
  to also vary by following letter) — this analogy should be explicitly
  scoped to c/g only.
- **Alternative — a reliable machine with two switches**: 18 letters are
  fixed dials that never move; "c" and "g" are switches that flip based
  on what comes next. Breaking point: implies only two states exist for
  the whole system, understating that beyond hard/soft there are further
  digraph and silent-letter layers still to come.
- **ANTI-ANALOGY — do NOT frame English consonants as "unpredictable" or
  "full of exceptions" as an opening frame**: this directly installs
  MC-EVERY-LETTER-MAKES-EXACTLY-ONE-SOUND's mirror-image failure —
  learned helplessness about the system's reliability rather than
  confidence in a mostly-reliable system with a small, listable
  exception set. The correct opening frame is the reverse: "almost every
  consonant is completely reliable; here are the few that aren't."

## Demonstrations

- **Physical/auditory (consonant sound wall)**: the Blueprint's
  Component 3 anchor — picture cards paired with initial consonant
  sounds — canonical, referenced not restated.
- **Home/no-equipment**: pointing at real objects in the room and
  naming their initial sound substitutes directly for picture cards.
- **Interactive/learner-activity**: TA-5's reliable-core-vs-exception
  sort is itself a hands-on categorization activity using a mixed word
  set.
- **Teacher-demo (hard/soft contrast)**: the tutor models saying "cat"
  then "cent" back to back, exaggerating the sound change, before asking
  the learner what differed — directly instantiating the Blueprint's
  own conflict-evidence probe (Component 1).
- **Prediction to elicit FIRST, every time**: before confirming a
  hard/soft judgment on a novel word (TA-4), ask the learner to predict
  the sound from the rule before saying the word aloud — Universal
  Principle 3.

## Discovery Questions

**Discovery wins specifically for the hard/soft c/g rule; direct
instruction is correct for the base 18-consonant set.** The Blueprint's
own TA-3 is explicitly a "Rule Discovery" step ("guide the student to
discover the vowel-following pattern... rather than stating the rule
first"), and this entry endorses that choice with its reasoning made
explicit: the hard/soft pattern is a genuine, statable regularity (which
letter follows determines the sound) that a learner can induce from
contrastive pairs, exactly the kind of content discovery design suits.
The base 18-consonant sounds themselves (TA-1/TA-2), by contrast, are
pure arbitrary convention — there is no regularity to discover in why
"b" sounds the way it does, only a pairing to be shown and rehearsed —
so direct instruction is correct there, matching this concept's own
prerequisite node's reasoning. The discovery arc for hard/soft c/g:
**need** (the learner has just confidently read "cat" and now meets
"city," producing a genuine surprise or error); **playground** (TA-3
presents several hard/soft contrastive pairs for the learner to examine);
**invention** (the learner is guided to notice what differs about the
following letter in each pair, forming a candidate rule); **collision**
(a pair that would falsify a wrong candidate rule, e.g. testing whether
the learner's rule holds for "y" as well as "e/i"); **formalization**
(MP-5's own-words statement of the rule); **compression** (TA-4's fluent
prediction on unseen words without re-deriving the rule each time).

## Teaching Sequence

TA-1 (single consonant production) must precede TA-2 (word-initial
isolation) because producing a sound in isolation is easier than
extracting it from a word's onset, which requires segmenting attention
away from the rest of the word. TA-3 (hard/soft discovery) is placed
AFTER both, not folded into TA-1, because introducing the c/g
conditioning rule before the reliable 18-consonant baseline is fluent
would present a genuinely harder case (a conditioned rule) before the
easier case (fixed pairing) is secure, risking the conditioning rule
being over-applied to consonants that do not need it. TA-4 (novel-word
application) must follow TA-3's discovery directly, since prediction on
unseen words is the only way to distinguish a learner who has
internalized the RULE from one who has merely memorized the specific
taught examples. TA-5 (reliable-core-vs-exception sorting) is placed
last because it requires both the hard/soft rule (now secure) and the
base reliable system (from TA-1/TA-2) to be integrated into one coherent
picture — sorting requires the learner to already hold both categories
distinctly. This entry does not restate the Blueprint's own turn-by-turn
session script (Component 7) — see Blueprint References below.

## Tutor Actions

Dispatch order for this concept, from `../../teaching-actions/`:
1. **Demonstration** (`01-show-family.md #1`) — the consonant sound
   wall anchor for TA-1/TA-2.
2. **Guided discovery** (`04-test-thinking-family.md`, discovery-
   adjacent) — TA-3's contrastive hard/soft pairs, guided toward learner-
   stated rule rather than tutor-stated rule.
3. **Prediction** (`04-test-thinking-family.md #15`) — attached to every
   TA-4 item before confirmation, and to every Demonstration per the
   family-wide rule.
4. **Classification/Sorting** (`05-organize-family.md #20`) — TA-5's
   reliable-core-vs-exception sort.
5. **Self-Explanation Prompt** (`04-test-thinking-family.md #18`) —
   MP-5's own-words rule statement, this concept's formalization step.

**What does NOT fit, and why**: Error Analysis
(`04-test-thinking-family.md #17`) on the base 18-consonant set is
excluded — presenting a deliberately wrong single-consonant sound before
the reliable baseline is fluent risks the wrong form sticking, per that
action's stability guard. It is more defensible once the hard/soft rule
is secure (TA-4/TA-5), since by then the learner has an explicit rule to
check an error against rather than only a felt sense of "sounds right."

## Voice Teaching Notes

- **What to listen for**: whether the learner's hard/soft judgment on a
  c/g word is preceded by an audible check of the following letter
  (even a brief "o... so hard" muttered aloud) or produced instantly
  from memory of a specific word — the former is evidence the rule is
  being actively applied; instant recall of a specific memorized word
  does not confirm the rule generalizes.
- **Characteristic hesitations**: a pause specifically before a c/g word
  the learner has not seen before (rather than before a familiar one)
  is a good sign — it suggests the rule is being consciously consulted,
  not merely pattern-matched from memory.
- **Pronunciation stakes**: moderate — the hard/soft distinction is
  phonemically real (a wrong choice changes the word's identity, e.g.
  a hard "c" in "cent" is simply incorrect, not a dialect variant), so
  this is one of the places a wrong sound should be corrected rather
  than accepted as a pronunciation variant.
- **The load-bearing sentence**: "check the very next letter — that
  tells you whether to use the hard or soft sound" is this concept's
  single load-bearing sentence and should be repeated verbatim across
  sessions until it becomes the learner's own internal check, per
  `../../foundations/03-voice-first-learning-model.md §3`.

## Assessment Signals

- **Diagnostic (golden probe)**: the Blueprint's own conflict-evidence
  probe (Component 1) — "say 'cat'... now say 'city'... are they the
  same?" — cleanly separates a learner who has not yet met the hard/soft
  pattern from one who is already aware of it, before deciding how much
  time TA-3 needs.
- **Guided practice → independent practice**: the Blueprint's WE-1 → WE-2
  → WE-3 → MP-1 through MP-5 fading ladder is reused directly
  (Components 5–6) — not re-authored here.
- **Mastery gate set** (`../../assessment/05-mastery-verification.md
  §3`): production (fresh single-consonant sounds, MP-1); new-surface
  (word-initial isolation on a novel word, MP-2); rule-application
  (hard/soft judgment on a genuinely unseen word, MP-3 — this is the
  strongest evidence of RULE possession rather than memorization);
  boundary-discrimination (silent-letter exception correctly identified
  as an exception rather than disproof of the system, MP-4);
  explanation (MP-5).
- **Interpretation of response pattern**: fast-and-correct hard/soft
  judgment on a novel word (MP-3-class item) confirms the rule is
  internalized and automatic; slow-and-correct is an acceptable
  intermediate state (rule being consciously applied) and should not be
  treated as a problem. Fast-and-WRONG on a novel hard/soft item is the
  dangerous quadrant — it suggests a guess or a wrongly-generalized
  rule (e.g. checking the PRECEDING rather than following letter) rather
  than the correct rule applied carelessly, and warrants re-running
  TA-3's discovery rather than simple re-practice.
- **Transfer items**: near (a fresh hard/soft c/g word); far (a word
  with "y" as the following letter, since "y" is less frequently modeled
  in initial teaching than "e/i" and tests whether the rule generalizes
  to its full stated scope); real-world (the learner's own name or a
  family name containing "c" or "g," if applicable).

## Tutor Recovery Strategy

Concept-specific application of `../../foundations/01-recovery-engine.md`:
- **"I don't know"** on a hard/soft item shrinks to the Blueprint's own
  conflict-evidence probe using the most familiar possible pair
  ("cat"/"cent," already heavily rehearsed) rather than a fresh unseen
  pair, rebuilding the rule-recall pathway before returning to whatever
  triggered the failure.
- **Likeliest utterance/behavior at this node**: a confident WRONG
  hard/soft guess (rather than "I don't know") is more likely than an
  outright refusal, per MC-C-AND-G-ARE-SINGLE-SOUND-LETTERS's mechanism
  — when this pattern appears, route directly to that misconception's
  recovery (re-run the conflict-evidence probe) rather than treating it
  as a generic wrong answer.
- **Non-verbal signal specific to this node**: a learner who visibly
  looks at or points to the letter following "c"/"g" before answering is
  showing the correct rule-checking behavior even if the final answer
  is occasionally wrong from a slip — this should be praised as correct
  process even when the outcome needs correction.

## Memory Hooks

**Concept type**: mixed — the base 18-consonant sounds are facts (fixed
pairings, reviewed via standard spaced fact-review), while the hard/soft
c/g rule is a procedure (a checking habit, reviewed via continued
application to novel words rather than simple recall). Interleaving
partners: mix hard-c and soft-c items (and hard-g/soft-g) within the
same practice set rather than blocking all-hard-then-all-soft, since
blocked practice would let the learner predict the answer from position
in the set rather than from the actual rule.

## Transfer Connections

- **Near**: applying the hard/soft rule to fresh, unpracticed c/g words.
- **Far**: the reliable-core-vs-exception discipline (TA-5) transfers
  directly to `eng.phonics.digraphs` and `eng.phonics.long-vowels-
  silent-e`, both of which introduce further letter-combination
  exceptions on top of the same reliable base — this concept is the
  first place the learner practices NOT letting an exception erode
  confidence in an otherwise-reliable system, a discipline reused
  repeatedly downstream.
- **Real-world**: any signage, book, or text the learner encounters
  containing "c" or "g" words is an immediate, ungated practice
  opportunity.
- **Expert-transfer**: fluent silent reading, where hard/soft judgment
  happens automatically and unconsciously, well past this node.

## Cross-Subject Connections

None found in the KG's `cross_links` field (empty for this concept) and
none genuinely warranted at this foundational a level — consonant sound
production and the hard/soft conditioning rule are specific to English
phonics and do not carry a real transfer relationship into another
subject at this stage.

## Blueprint References

A Blueprint exists: `docs/curriculum/blueprints/eng.phonics.consonants.md`.
This entry reuses, by reference and without restating: Component 1's
full misconception trigger/probe/bridge/replacement/discrimination text
(both misconceptions), Component 3's consonant-sound-wall anchor,
Components 5–6's worked examples and mastery probe set (WE-1–3,
MP-1–5), and Component 7's full session architecture and protocol
routing (S0/S1/S6/S9). This entry's own contribution is the HOW-to-teach
reasoning layer: mental model progression across four stages, the
failure-mechanism analysis in "Why Students Fail," birth-type
classification of both misconceptions, an explicit argued case for
discovery design on the hard/soft rule specifically (contrasted with
direct instruction for the base 18-consonant set), and the teaching-
sequence reasoning explaining why the Blueprint's own TA ordering is
correct.

## Runtime Asset References

No seeded `AssetIdentity` records exist for this concept in
`src/lib/teaching/assets/authoredSeedAssets.ts`,
`src/lib/teaching/assets/brainSeedAssets.ts`, or any other seed source
file in this repository, and this entry does not create, seed, or
propose any as part of its authoring.

## Curriculum Feedback

None found — the KG node's prerequisite
(`eng.phonics.letter-sound-correspondence`), `unlocks`
(`eng.phonics.consonant-blends`), difficulty, and mastery threshold are
all consistent with this concept's actual teaching demands.

## Version History

- 2026-08-06 — Initial authoring (English Educational Brain completion
  program, batch 2, concept 1 of 2). All 21 Standard sections authored
  fresh against the live KG and existing Blueprint; no prior version
  existed.
