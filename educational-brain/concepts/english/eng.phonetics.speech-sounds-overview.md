# Overview of Speech Sounds — `eng.phonetics.speech-sounds-overview`

## Identity

- **Concept ID**: `eng.phonetics.speech-sounds-overview` (canonical
  English KG)
- **Curriculum location**: English / phonetics / "Overview of Speech
  Sounds" — the entry node of the entire phonetics domain, sitting
  directly downstream of `eng.phonics.phonemic-awareness` and
  introducing the idea that speech sounds are a subject of study in
  their own right, separate from the phonics domain's letter-mapping
  concerns.
- **Prerequisites**: `eng.phonics.phonemic-awareness` — specifically the
  ability to segment a word into its component phonemes
  (`eng.phonics.phonemic-awareness.md`, Learning objectives 1–4). This
  concept assumes segmentation is already possible and extends it: where
  phonemic-awareness treats a phoneme as an isolable unit to find,
  speech-sounds-overview treats it as a PHYSICAL EVENT with describable
  properties to examine.
- **Unlocks** (from KG): `eng.phonetics.articulation-organs`. This
  concept's TA-2 (feel-your-mouth sorting by voiced/voiceless) is the
  direct precursor to formally naming and studying the vocal organs that
  produce that distinction — this node builds the felt, pre-terminology
  experience that articulation-organs will name.
- **Difficulty**: foundational · **Bloom**: understand · **Mastery
  threshold**: 0.75 · **Est. hours**: 2
- **Learning objectives** — the learner can:
  1. Count the sounds and the letters in a spoken-then-written word
     separately, and correctly report when the two counts diverge.
  2. Sort a set of sounds into "voiced" (throat buzzes) and "voiceless"
     (no buzz) by physically feeling the distinction, without relying on
     memorized labels alone.
  3. Identify a shared sound across words that spell that sound
     differently (e.g. the /f/ in "fish," "phone," "laugh").
  4. Correctly judge that two different pronunciations of the same word
     (dialect variants) are both valid English, not one correct and one
     wrong.
  5. State, in the learner's own words, why letters and sounds cannot
     always be counted the same way.

## Learning Objective

(See Identity above — objectives 1–5 are what this concept's mastery
gate certifies; restated here only as a pointer per the Standard's
promotion of this content to its own section, not duplicated verbatim a
second time.)

## Core Understanding

Speech sounds and letters are two independent systems that were never
guaranteed to correspond one-to-one, and in English frequently do not:
a phoneme is a physical, producible unit of speech (a specific
configuration and action of the vocal tract), while a letter is a
graphic convention that a specific writing system uses to represent
sound — sometimes exactly, sometimes approximately, and sometimes
through multi-letter combinations, silent letters, or one letter
covering several distinct sounds depending on context. English's
particular history (borrowing spelling conventions across centuries
from multiple source languages, and undergoing sound changes after
spelling had already stabilized) makes the mismatch between its ~44
phonemes and its 26 letters unusually large among alphabetic writing
systems. Additionally, a phoneme itself is not a single fixed acoustic
event but a CATEGORY of sounds that listeners of a given language treat
as functionally the same, tolerating real variation across dialect,
speaker, and phonetic context — studying speech sounds means describing
this variation accurately, not policing a single "correct" realization
of each sound.

## Mental Models

Unlike this batch's other two concepts, the ARRIVING (pre-instruction)
model at this node is already wrong, not merely incomplete — parallel
to `phys.mech.newtons-first-law`'s impetus model in the Standard's own
worked example. Every learner arrives from literacy instruction that
taught letters first, and the default assumption "one letter, one
sound, and the count of each is the same" is the very misconception
this concept exists to dismantle (MC-SOUNDS-EQUAL-LETTERS, below), not
a legitimate first stage to build on.

- **Model 0 — arriving, incorrect: "sounds and letters are basically the
  same count"**: not a teaching stage but the default entry state this
  concept must displace; see Misconceptions.
- **Beginner model — the first CORRECT model this node installs: "a
  speech sound is a physical, feelable mouth-event, separate from its
  letter"**: the throat-buzz anchor (Component 3) grounds "sound" as
  something the body DOES, not a written symbol — sufficient for
  objective 1 (separate counting) and the necessary displacement of
  Model 0. Shelf-life warning to deliver at installation (Universal
  Principle 6, `../../foundations/04-universal-teaching-principles.md`):
  "right now we're just noticing that sounds are physical things your
  mouth does — soon we'll describe exactly HOW your mouth makes each
  one."
- **Intermediate model — "sounds have physical FEATURES that can be
  felt and sorted"**: beyond noticing sounds are physical, the learner
  can sort them along a specific dimension (voiced/voiceless, by
  throat vibration) — TA-2's model, sufficient for objective 2.
  Upgrade trigger: the first time a same-sound-different-spelling item
  (TA-3) is presented, which requires generalizing "physical event" to
  "physical event that can recur under different written disguises."
- **Advanced model — "letters and sounds are only loosely coupled
  systems"**: the mature understanding that one sound may have several
  spellings and one spelling may represent several sounds, and that
  this is a structural fact about English, not a series of isolated
  exceptions — TA-3/TA-5's model, sufficient for objectives 3 and 5.
- **Expert model** (well past this node, informing the immediately
  downstream `eng.phonetics.articulation-organs`): the sound inventory
  is a closed, systematically describable set, each sound definable by
  exactly which vocal organs produce it and how — not needed for
  mastery at this node, but the direction TA-5's inventory-estimation
  exercise is already pointing.
- **Do not upgrade early**: a learner who has not yet displaced Model 0
  (still counting sounds by counting letters) should not be given
  dialect-variation items (TA-4) "to see if they understand" — TA-4
  presupposes sounds are already held as physical, variable events, not
  fixed written symbols, which is exactly the displacement Model 0
  blocks.

## Why Students Fail

The dominant failure mechanism is near-universal and curriculum-shaped,
not individual: every learner who has already learned to read arrives
having spent far more instructional time on LETTERS than on sounds as
such, so "count the letters" is an automatic, over-practiced habit that
substitutes for the less-practiced skill of counting sounds by
listening — this is not a reasoning failure, it is the direct, expected
consequence of literacy instruction's own necessary sequencing (letters
must be taught before most learners can productively study phonetics
in any formal sense). A second, distinct failure mode is specific to
dialect-variation judgments: a learner who has only ever heard one
dialect (their own, or their teacher's) has no experiential basis for
treating a different pronunciation as anything other than an error,
because nothing in ordinary language exposure explicitly frames
pronunciation variation as systematic and valid rather than as mistakes
some speakers happen to make.

## Misconceptions

The existing Blueprint (`docs/curriculum/blueprints/
eng.phonetics.speech-sounds-overview.md`, Component 1) already documents
two misconceptions with full trigger/probe/bridge/replacement/
discrimination content — reused by reference below, not re-copied, with
the birth-type classification (`../../misconceptions/01-birth-
taxonomy.md`) added since the Blueprint predates that taxonomy and did
not classify them. A third misconception, discovered by applying the
taxonomy's diagnostic procedure
(`../../misconceptions/01-birth-taxonomy.md §7`) directly to this
concept, is new content the Blueprint does not contain.

**MC-SOUNDS-EQUAL-LETTERS (Blueprint Component 1) — Type 1,
overgeneralization**
- *Why (birth-type addition)*: "one letter, one sound" is genuinely
  TRUE for the large class of simple, regularly-spelled CVC words a
  beginning reader meets first (cat, dog, run) — a real, validated rule
  in the learner's own prior reading experience, extended into a domain
  (digraphs, silent letters, multi-sound letters) where it silently
  breaks. This is structurally identical to the taxonomy's own given
  Type 1 example, regular past-tense "-ed" overextended to irregular
  verbs: a majority-case rule applied exactly where it stops working,
  not a random guess. Asked to count sounds/letters in a simple CVC
  word, the learner will typically get it right — the error surfaces
  specifically at the digraph/silent-letter boundary.
- *Full trigger/probe/bridge/replacement/discrimination content*: see
  Blueprint Component 1, verbatim — not restated here.
- *Characteristic phrase (addition — free detection channel)*: a
  learner who spells a word aloud letter-by-letter ("s-h-i-p, that's
  four sounds") when asked to count sounds, rather than saying the word
  slowly and listening, is showing the substitution directly — this
  should be treated as diagnostic even before a formal count is
  compared.

**MC-SPEECH-SOUNDS-ARE-FIXED-UNITS (Blueprint Component 1) — Type 5,
instruction-induced**
- *Why (birth-type addition)*: early reading/phonics instruction
  necessarily teaches "the sound letter X makes" as a single, fixed
  target pronunciation, for good pedagogical reason (a beginner needs
  one stable target, not a menu of dialect variants) — but if that
  simplification's boundary is never named ("this is ONE common
  pronunciation, not the only correct one"), the learner reasonably
  concludes fixity is a fact about the sound itself rather than a
  teaching simplification. Per Type 5's signature, this appears across
  entire cohorts taught by any letter-sound-first method, and
  disappears once a curriculum names dialect variation explicitly and
  early — exactly what this concept's TA-4 is designed to do.
- *Full trigger/probe/bridge/replacement/discrimination content*: see
  Blueprint Component 1, verbatim — not restated here.
- *Characteristic phrase (addition)*: a learner who describes a
  different-dialect pronunciation as the speaker "saying it wrong" or
  "talking funny" — evaluative language about the SPEAKER rather than
  descriptive language about the SOUND — is showing this misconception
  in a form worth correcting gently but directly, since the framing
  itself (not just the phonetic judgment) is what needs adjusting.

**MC-VOICING-IS-LOUDNESS (new content, not in the existing Blueprint) —
Type 2, perceptual intuition**
- *Why*: an untrained ear readily perceives voiced consonants (/z/,
  /v/, /b/, /m/) as subjectively "louder" or "stronger" than their
  voiceless counterparts (/s/, /f/, /p/) — vocal-fold vibration does add
  acoustic energy relative to a purely voiceless articulation, so the
  intuition has a real acoustic basis, but it substitutes a global
  loudness impression for the specific mechanism (vocal-cord vibration,
  feelable as a buzz) that TA-2 is designed to isolate. This is a
  diffuse, never-explicitly-taught auditory default, matching Type 2's
  mechanism rather than a taught rule extended past its boundary.
- *Symptom / phrase*: asked to sort sounds into "buzzes" and "doesn't
  buzz" (TA-2), a learner instead sorts by perceived volume or
  intensity when producing the sounds LOUDLY versus QUIETLY (e.g.
  insisting a loudly-said /s/ "buzzes" more than a quietly-said /z/) —
  the sort tracks the learner's own production volume rather than the
  vibration feature.
- *Detection probe (verbatim)*: "Say 'zzzz' very QUIETLY, almost a
  whisper, with your hand on your throat. Do you still feel the
  buzzing, even though it's quiet? Now say 'ssss' very LOUDLY. Does
  your throat buzz now, even though it's loud?"
- *Recovery*: per Type 2's collision design
  (`../../misconceptions/02-the-repair-sequence.md §2`), the repair
  must be a direct, self-administered physical check, not a verbal
  argument — the quiet-voiced/loud-voiceless contrast above forces the
  learner to feel that vibration and loudness vary independently,
  since no verbal explanation reliably overrides an auditory default
  this deeply built.
- *Verification*: correct voiced/voiceless sorting of a fresh sound set
  performed at a DELIBERATELY varied, mismatched volume (some voiced
  sounds said quietly, some voiceless sounds said loudly), confirming
  the sort tracks vibration rather than volume.

## Analogies

- **Best analogy — letters are a photograph of sounds, sometimes
  blurry, sometimes cropped wrong**: the photograph is a REPRESENTATION
  of something real, not the thing itself, and representations can be
  imperfect. Breaking point: a photograph is taken directly from its
  subject at one moment, while English spelling is a historically
  layered system that has drifted from the sounds it once matched more
  closely — the analogy should not be stretched to imply spelling is
  simply low-quality or random; it is a frozen historical record, not a
  poor recording.
- **Alternative — sounds are the ingredients, letters are someone's
  recipe card for them**: the ingredients (sounds) are what's actually
  used; the recipe card (spelling) is one person's attempt, long ago,
  to write down how to make them, and recipe cards can be sloppy,
  outdated, or copied with errors.
- **Story analogy**: "Long ago, English's sounds and letters were good
  friends who agreed on almost everything. Over hundreds of years, the
  sounds kept changing while the letters mostly stayed still — now they
  only agree some of the time."
- **ANTI-ANALOGY — do NOT use "letters make sounds"**: this frames a
  causal, agentive relationship (the letter DOES something) that is
  backwards — sounds exist independently in spoken language; letters
  are a later, human-invented representation of them. The sibling entry
  `eng.phonics.phonemic-awareness.md` warns against this same framing
  for a different reason (jumping ahead of that node's oral-only
  scope); here the stake is sharper, because this is precisely the node
  where the letter/sound relationship is being formalized, and "letters
  make sounds" would directly reinforce MC-SOUNDS-EQUAL-LETTERS by
  implying a tight, one-directional binding rather than the loosely
  coupled, historically contingent relationship Core Understanding
  describes.

## Demonstrations

- **Physical (feel-your-mouth-move)**: the Blueprint's Component 3
  anchor (hand on throat, "zzzz" vs. "ssss" buzz contrast; lips-together
  "mmmm" vs. lips-apart "aaaa") — canonical for this concept, referenced
  not restated.
- **Home/no-equipment**: the throat-buzz check requires nothing beyond
  a hand and a voice; TA-1's letter/sound count-check works with any
  spoken-then-written word, no materials needed.
- **Interactive/learner-activity**: TA-2's voiced/voiceless sorting is
  itself a physical, self-administered sorting activity — the learner
  checks their own throat for each sound rather than being told the
  answer.
- **Teacher-demo (dialect variation)**: the tutor models 2–3 real
  dialect variants of the same word (e.g. "butter" with a flap versus a
  plosive /t/), asking the learner to judge validity rather than
  correctness.
- **Prediction to elicit FIRST, every time**: before revealing a
  letter/sound count or a voiced/voiceless classification, ask the
  learner to commit to a guess first ("how many sounds do you think
  this word has?" / "do you think this one buzzes?") — Universal
  Principle 3, shared with every SHOW-family action.

## Discovery Questions

**Discovery wins here — argued, not defaulted to**, for a genuinely
different reason than `eng.phonics.rhyming`'s discovery design in this
same batch. Rhyming's discovery target is an inducible RULE (match the
ending sound); this concept's discovery target is an inducible
EMPIRICAL FACT about English specifically — that letters and sounds do
not correspond one-to-one, and that English has substantially more
sounds than letters. This is not arbitrary convention (ruling out
direct instruction, as at the sibling `alphabet-recognition` node) and
not a rule to be induced from examples in the ordinary sense (unlike
rhyme's ending-match rule) — it is a genuine surprise the learner can
discover by counting, exactly as the Blueprint's own TA-5 already
specifies: **need** (TA-1's count-check creates the puzzle — "ship" has
four letters but three sounds; why don't they match?); **playground**
(TA-1's repeated pairs, TA-3's same-sound-different-spelling sets let
the learner test the mismatch across several words); **invention** (the
learner begins forming their own working sense of WHERE mismatches
happen — digraphs, silent letters — before being told the general
pattern); **collision** (TA-4's dialect-variant contrast breaks any
remaining assumption that there is one fixed, correct sound per letter
at all); **formalization** (TA-5's explicit inventory-estimation task —
"how many distinct sounds does English actually have, compared to 26
letters?" — states the discovered fact directly); **compression**
(fluent recognition that spelling and sound are separate systems,
applied automatically on new words without re-deriving it each time).
The Blueprint's own TA-5 design already names this as guided discovery
("guide the student to discover"); this entry makes the full six-step
structure underlying that instruction explicit.

## Teaching Sequence

TA-1 (sounds vs. letters count-check) must come first, before any
terminology or feature-sorting, because it is the direct collision with
Model 0 (the arriving misconception) — until the learner has personally
observed at least one letter/sound mismatch, TA-2's voiced/voiceless
sorting has no motivating context ("why sort sounds at all, if sounds
and letters are the same thing?"). TA-2 (feel-your-mouth sorting) must
precede TA-3 (same sound, different spelling) because TA-3 requires the
learner to already hold "sound" as a stable, re-identifiable physical
category independent of any one word — TA-2 is where that category is
first built and practiced. TA-4 (dialect variation) is placed after
TA-1 through TA-3, not earlier, because it depends on sounds already
being held as physical, variable events (the intermediate model) —
introducing dialect variation while the learner is still under Model 0
would read as "which spelling is correct" rather than "which sound is
valid," missing the point entirely. TA-5 (inventory estimation) is
placed last as the formalization step of the discovery design above,
since it depends on every prior task's evidence (letter/sound
mismatches, feature categories, spelling variants, dialect variants) to
support a genuine estimate rather than a guess. This entry does not
restate the Blueprint's own turn-by-turn session script (Component 7)
— see Blueprint References below.

## Tutor Actions

Dispatch order for this concept, from `../../teaching-actions/`:
1. **Demonstration** (`01-show-family.md #1`) — the throat-buzz anchor
   and the letter/sound count-check are both demonstrations; the
   canonical opening move and the discovery design's "need" step.
2. **Contrasting Cases** (`01-show-family.md #3`) — TA-4's dialect-pair
   presentation (two valid pronunciations of the same word, side by
   side) is precisely a contrasting-cases action, and the correct
   dispatch home for that Blueprint component.
3. **Classification/Sorting** (`05-organize-family.md #20`) — TA-2's
   voiced/voiceless sort is a sorting task by physical feature; the
   correct dispatch home for consolidating the intermediate model.
4. **Prediction** (`04-test-thinking-family.md #15`) — attached to
   every Demonstration per the family-wide rule; also used standalone
   before each count or classification reveal.
5. **Self-Explanation Prompt** (`04-test-thinking-family.md #18`) —
   MP-5's "explain why sounds and letters can't always be counted the
   same way" is precisely a self-explanation prompt, and functions as
   this concept's formalization step, paired with TA-5's inventory
   estimate.

**What does NOT fit, and why**: Direct Telling
(`02-tell-family.md #8`) beyond a single anchoring sentence is excluded
as the PRIMARY move for the same reason the discovery design above
argues for — stating "English has more sounds than letters" up front
would forfeit the genuine discovery this concept's TA-5 is built to
produce; telling is legitimate only as a closing formalization after
the learner has already counted. Error Analysis
(`04-test-thinking-family.md #17`) is excluded until the intermediate
model (TA-2) is secure — analyzing a deliberately wrong voiced/voiceless
sort before the physical check is habitual risks the flawed sort
becoming what is remembered, per that action's own stability guard.

## Voice Teaching Notes

- **What to listen for**: whether the learner counts sounds by
  genuinely saying the word slowly and listening (audible, deliberate
  slow articulation) or by silently reading and mentally counting
  letters — the STRATEGY is audible even before the answer is given,
  and a tutor who only checks the final count misses this earlier,
  more diagnostic signal.
- **Characteristic hesitations**: a confident, instant letter-based
  count on a digraph/silent-letter word (e.g. immediately answering
  "four sounds" for "ship" without a slow, deliberate re-say) is a
  stronger signal of MC-SOUNDS-EQUAL-LETTERS than a hesitant, uncertain
  answer — per the D1 grid, fast-and-wrong here specifically indicates
  the letter-counting habit is actively substituting for genuine
  listening, not merely an untested skill.
- **Pronunciation stakes**: real and central to this concept — TA-4's
  dialect items require the tutor to accept the learner's own accent as
  authoritative for their own pronunciation, and to never model a
  single "correct" pronunciation as the only valid one when introducing
  voiced/voiceless contrasts, since that would directly undercut
  MC-SPEECH-SOUNDS-ARE-FIXED-UNITS' intended repair.
- **The load-bearing sentence**: "say it slowly and listen — how many
  sounds do you hear?" is this concept's load-bearing sentence and
  should be given genuine space, per
  `../../foundations/03-voice-first-learning-model.md §3` — rushing
  past this pause risks the tutor supplying the answer before the
  learner has genuinely re-said the word slowly.

## Assessment Signals

- **Diagnostic (golden probe)**: "How many letters are in 'chip'? How
  many sounds do you hear when you say it slowly?" (Blueprint WE-1) —
  cleanly separates a learner still under Model 0 from one who has
  already begun separating the two counting tasks, before deciding
  where in TA-1 through TA-5 to begin.
- **Guided practice items → independent practice items**: the
  Blueprint's WE-1 → WE-2 → WE-3 fading ladder → MP-1 through MP-5 is
  reused directly (Components 5–6) — not re-authored here.
- **Mastery gate set** (`../../assessment/05-mastery-verification.md
  §3`): production (count letters and sounds separately on a fresh,
  never-used word with a genuine mismatch — Blueprint MP-1); new-surface
  (a same-sound-different-spelling triple not used during teaching —
  MP-3); mixed (embed a dialect-judgment item among ordinary counting
  items — MP-4 — to confirm the two skills remain independently
  secure); delayed (a next-session opening retrieval check).
- **Interpretation of response pattern**: instant, confident letter-
  counting on a mismatch word is the dangerous quadrant of the D1 grid
  (`../../foundations/02-adaptive-teaching-rules.md`) — a fast, wrong
  answer here signals the old habit is actively substituting for
  genuine listening, and should route straight to
  MC-SOUNDS-EQUAL-LETTERS' recovery rather than a generic re-ask. A
  slow, deliberate, CORRECT count (visibly re-saying the word) is the
  target pattern at this stage, not yet a fluency concern — unlike most
  concepts, early correct-but-slow performance here is exactly what
  successful displacement of Model 0 looks like.
- **Transfer items**: near (counting sounds/letters in a fresh word with
  a comparable mismatch pattern); far (estimating, without a specific
  word prompt, roughly how many sounds versus letters English has
  overall — MP-5/TA-5's territory); real-world (noticing a letter/sound
  mismatch in the learner's own name or a familiar word).

## Tutor Recovery Strategy

Concept-specific application of `../../foundations/01-recovery-engine.md`:
- **"I don't know"** shrinks to the throat-buzz anchor specifically —
  rather than re-explaining the letter/sound distinction verbally,
  return to "put your hand on your throat, say 'zzzz'... do you feel
  that?", re-grounding the concept in the one demonstration that
  requires no verbal reasoning at all.
- **Likeliest utterance at this node**: a learner is more likely to
  produce a confident, letter-based WRONG count than to say "I don't
  know" outright (per MC-SOUNDS-EQUAL-LETTERS' mechanism) — when this
  specific pattern appears, route directly to that misconception's
  recovery (say the word slowly together, sound by sound) rather than
  treating it as a generic counting error.
- **Non-verbal signal specific to this node**: a learner who touches
  their throat unprompted while attempting a voiced/voiceless judgment
  is showing they have internalized the physical check as their own
  strategy, not just a tutor-modeled routine — this is a positive
  signal worth naming explicitly ("good — you're checking with your
  own hand now") rather than a neutral observation.

## Memory Hooks

**Concept type**: concept/procedure hybrid — the letter/sound
distinction itself is a conceptual understanding (once grasped, it does
not need re-deriving), while the voiced/voiceless sorting is closer to
a procedural check that benefits from repeated practice across many
sound pairs before it becomes fast and reliable. Interleaving partners:
mix same-sound-different-spelling items (TA-3) with ordinary
letter/sound counting periodically, since the underlying displacement
of Model 0 is the highest-value thing to verify has held — a single
successful mastery probe does not guarantee the old letter-counting
habit, deeply automatized by literacy instruction, has not partially
regrown.

## Transfer Connections

- **Near**: counting sounds and letters separately in a new word with a
  different mismatch pattern (a different digraph, a different silent
  letter).
- **Far**: recognizing a same-sound-different-spelling family the
  learner has not been explicitly taught (generalizing TA-3's specific
  examples to a genuinely novel one).
- **Real-world**: noticing letter/sound mismatches or dialect variation
  in everyday spoken and written language the learner already
  encounters — song lyrics, family speech patterns, regional accents.
- **Expert-transfer**: the immediately downstream
  `eng.phonetics.articulation-organs` formalizes the felt
  voiced/voiceless distinction into named vocal organs and mechanisms —
  this concept's TA-2 is the direct experiential foundation for that
  later, more technical vocabulary.

## Cross-Subject Connections

None found in the KG's `cross_links` field (empty for this concept).
One weak but real connection worth naming: the voiced/voiceless
distinction is fundamentally an ACOUSTIC/physical phenomenon (vocal-fold
vibration, a measurable event), which loosely previews the general idea
that language has a physical, scientifically describable substrate —
not strong enough to design a lesson around, and not encoded as a KG
`cross_link`, but worth naming once if a learner shows interest in why
sounds physically differ. This entry states this honestly as "weak but
real" rather than either fabricating a stronger link or omitting the
observation.

## Blueprint References

A Blueprint exists: `docs/curriculum/blueprints/
eng.phonetics.speech-sounds-overview.md`. This entry reuses, by
reference and without restating: Component 1's full misconception
trigger/probe/bridge/replacement/discrimination text (both
misconceptions), Component 3's feel-your-mouth-move anchor scene,
Components 5–6's worked examples and mastery probe set (WE-1–3, MP-1–5),
and Component 7's full session architecture and protocol routing
(S0/S1/S6/S9). This entry's own contribution is the HOW-to-teach
reasoning layer: an explicit statement that the arriving model is
already wrong (paralleling the Standard's own Newton's-First-Law
example), the failure-mechanism analysis in "Why Students Fail," birth-
type classification of the existing misconceptions, one genuinely new
misconception (voicing-as-loudness) the Blueprint does not contain, an
explicit argued case for a fact-discovery lesson design (distinct in
kind from the rule-discovery design argued for the sibling
`eng.phonics.rhyming` entry), and the teaching-sequence/dispatch
reasoning that explains WHY the Blueprint's own component order is
correct.

## Runtime Asset References

Seeded `AssetIdentity` records exist for this concept in
`src/lib/teaching/assets/authoredSeedAssets.ts` (the `SNDO` constant
block), sourced directly from this concept's Blueprint (predating this
Educational Brain entry, since no `concepts/` entry existed at seeding
time). No new runtime asset is created, seeded, or proposed as part of
authoring this entry, per the Standard's ownership boundary — this
section states what already exists and does not add to it.

## Curriculum Feedback

None found — the KG node's prerequisite
(`eng.phonics.phonemic-awareness`), `unlocks`
(`eng.phonetics.articulation-organs`), difficulty, and mastery threshold
are all consistent with this concept's actual teaching demands. One
observation, not a defect: this concept is the entry point of the
`eng.phonetics` domain (as `eng.phonics.phonemic-awareness` and
`eng.phonics.print-concepts` are entry points of the `eng.phonics`
domain) — its `estimated_hours: 2` and mastery threshold 0.75 are
consistent with a foundational-but-not-uniquely-high-stakes node
(unlike `eng.phonics.alphabet-recognition`'s 0.90, which gates two
separate downstream chains simultaneously), appropriately calibrated
for a node gating a single domain's continuation.

## Version History

- 2026-08-04 — Initial authoring (English production-hardening session,
  level-1 batch alongside `eng.phonics.alphabet-recognition` and
  `eng.phonics.rhyming`). All 21 Standard sections authored fresh
  against the live KG and existing Blueprint; no prior version existed.
