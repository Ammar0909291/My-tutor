# Alphabet Recognition — `eng.phonics.alphabet-recognition`

## Identity

- **Concept ID**: `eng.phonics.alphabet-recognition` (canonical English KG)
- **Curriculum location**: English / phonics / "Alphabet Recognition" — the
  first concept beyond English's zero-prerequisite floor on the print
  branch, sitting directly downstream of `eng.phonics.print-concepts`.
- **Prerequisites**: `eng.phonics.print-concepts` — specifically its
  advanced model, "print is organized in nested units: letters inside
  words inside sentences" (`eng.phonics.print-concepts.md`, Mental models).
  A learner must already hold LETTERS as a distinct, countable unit
  category before individual letter identity is a meaningful teaching
  target; a learner still at print-concepts' beginner model
  (print-vs-picture only) has no unit to hang a letter name on yet.
- **Unlocks** (from KG): `eng.phonics.letter-sound-correspondence`,
  `eng.writing.handwriting-and-formation`. This is the floor for BOTH the
  entire sound-mapping chain and the entire production/writing chain —
  a learner cannot be taught what sound a letter makes, or how to write
  one, before the letter is a reliably recognized, individually nameable
  object.
- **Difficulty**: foundational · **Bloom**: remember · **Mastery
  threshold**: 0.90 (KG-authored — the highest threshold of this batch;
  see Assessment Signals below) · **Est. hours**: 2
- **Learning objectives** — the learner can:
  1. Name any of the 26 uppercase letters shown in randomized (non-
     alphabetical) order, without reciting from A.
  2. Name any of the 26 lowercase letters shown in randomized order,
     as an independently secure skill, not inferred from uppercase
     fluency.
  3. Match an uppercase letter to its lowercase partner and name both
     together ("big T, little t"), demonstrating the pair is one letter
     in two forms.
  4. Correctly discriminate mirror-pair letters (b/d, p/q) using a
     self-check strategy, not a guess.
  5. State what letter comes immediately before or after a given letter
     without reciting the full alphabet from the start.

## Learning Objective

(See Identity above — objectives 1–5 are what this concept's mastery
gate certifies; restated here only as a pointer per the Standard's
promotion of this content to its own section, not duplicated verbatim a
second time.)

## Core Understanding

A letter is a single abstract symbol-category with three independent
surface properties a learner must learn to hold together without
confusing any pair of them: an ARBITRARY VISUAL FORM (which itself comes
in two conventional variants, uppercase and lowercase, that must be
recognized as the same category), a CONVENTIONAL NAME (spoken aloud, no
necessary relationship to the sound it will later represent), and a
FIXED POSITION in a conventionally ordered sequence (the alphabet). None
of these three properties is derivable from either of the others — case
identity, the name, and the sequence position are each separately
memorized conventions of the Latin writing system, not facts that follow
from shape alone. This is what makes the concept genuinely hard despite
its "foundational" tag and "remember" Bloom level: it is 26 arbitrary
three-part bindings, several of which (the mirror pairs, and the
case-variant pairs) are adversarially close to each other in visual
form, with no causal structure to lean on for any of them.

## Mental Models

- **Beginner model — "each letter is a picture with its own name"**: a
  letter is treated the way an unfamiliar animal picture is treated —
  an arbitrary visual icon, matched to a spoken label by rote
  association, no internal structure yet. This model is sufficient for
  objectives 1–2 (naming uppercase and lowercase SEPARATELY) but
  actively obstructs objective 3, because under this model "A" and "a"
  are simply two different pictures that happen to share a name by
  coincidence, not two forms of one thing. Shelf-life warning to deliver
  at installation (Universal Principle 6,
  `../../foundations/04-universal-teaching-principles.md`): "right now
  each letter has just one look — soon you'll learn every letter
  actually has TWO looks that are secretly the same letter."
- **Intermediate model — "every letter has two costumes (case) but one
  identity"**: the learner holds a case-invariance model — uppercase
  and lowercase are the same underlying letter wearing different
  clothing, matched by name and (eventually) sound, not by shape.
  Upgrade trigger: the first time the learner is explicitly asked to
  pair a mismatched-case set (TA-3 in the existing Blueprint) rather
  than name each case in isolation — isolated naming can be mastered
  under the beginner model alone; pairing cannot.
- **Advanced model — "letters are a fixed, orderable set"**: beyond
  individual identity and case-invariance, the learner holds all 26
  letters as members of one stable, memorized SEQUENCE, enabling
  relative-position reasoning ("what comes right after M?") without
  full recitation. This is a genuinely separate skill from naming — a
  learner can name every letter in isolation while still being unable
  to answer a "what's next" question without reciting from A, which is
  exactly why the existing Blueprint tests it as its own objective
  (TA-5) rather than assuming it follows from naming fluency.
- **Expert model — "letters are visual symbols standing for a sound in
  the sound-system"** (well past this node, informing the immediately
  downstream `eng.phonics.letter-sound-correspondence`): eventual
  awareness that a letter's real job is not merely to have a name, but
  to stand for one or more sounds within the wider phonics system — not
  needed for mastery at THIS node (which certifies naming, matching,
  discrimination, and sequence only), but the direction the arc is
  heading immediately next.
- **Do not upgrade early**: a learner who cannot yet reliably name
  isolated uppercase letters (the beginner model, objective 1) should
  not be pushed into case-matching or mirror-discrimination tasks "to
  see if they can" — both assume individually secure naming as their
  input, and testing them early manufactures a confident-wrong signal
  that looks like a case-confusion or mirror-confusion problem when the
  actual cause is an unsecured naming floor underneath it.

## Why Students Fail

Three independent failure mechanisms operate at this node, and a tutor
who treats all wrong answers as "doesn't know the alphabet" will
misroute the repair. First, sheer arbitrary-association load: 26
symbols with no causal link between shape and name simply take
repeated, spaced exposure to bind — failure here is a volume problem,
not a reasoning problem. Second, and specific to objective 3, is a
genuine perceptual default that predates any teaching: the human visual
system is built for OBJECT recognition, where mirror-flipping an object
does not change its identity (a cup viewed from the left is still the
same cup viewed from the right) — this is adaptive for recognizing
objects in the world and actively maladaptive for letters, where
mirror-orientation is exactly the property that distinguishes b from d
and p from q. A learner reversing these letters is not being careless;
their visual system is applying a lifelong, correct-everywhere-else
rule to the one domain where it fails. Third, and specific to
objective 3's case-pairing task, is the same category of perceptual
default applied differently: a lifetime of experience says
differently-shaped things are usually different things (a cat and a
dog look different because they ARE different) — nothing in that
experience prepares a learner for a system where two visually distinct
shapes ("A" and "a") are stipulated to be the identical unit.

## Misconceptions

The existing Blueprint (`docs/curriculum/blueprints/
eng.phonics.alphabet-recognition.md`, Component 1) already documents two
misconceptions with full trigger/probe/bridge/replacement/discrimination
content — reused by reference below, not re-copied, with the birth-type
classification (`../../misconceptions/01-birth-taxonomy.md`) added since
the Blueprint predates that taxonomy and did not classify them. A third
misconception, discovered by applying the taxonomy's diagnostic
procedure (`../../misconceptions/01-birth-taxonomy.md §7`) directly to
this concept, is new content the Blueprint does not contain.

**MC-CASE-ARE-DIFFERENT-LETTERS (Blueprint Component 1) — Type 2,
perceptual intuition**
- *Why (birth-type addition)*: this is not a taught rule extended past
  its boundary — no one ever explicitly teaches "differently-shaped
  things are different things," yet every learner arrives having built
  that expectation from thousands of unlabeled lifetime observations
  (Type 2's defining signature: diffuse, never explicitly taught, and
  resistant to verbal correction alone). A learner can be TOLD "A and a
  are the same letter" and correctly repeat it, while still functionally
  treating them as different under time pressure — the hallmark of a
  perceptual-intuition misconception rather than a missing fact.
- *Full trigger/probe/bridge/replacement/discrimination content*: see
  Blueprint Component 1, verbatim — not restated here.
- *Characteristic phrase (addition — free detection channel)*: a
  learner who can recite "big A, little a" as a memorized chant but
  fails a cold case-matching task (TA-3, novel pairs, no chant cue) is
  showing the gap between verbal knowledge and the still-active
  perceptual default — this dissociation is itself diagnostic and
  should be watched for even when the chant sounds fluent.

**MC-SHAPE-CONFUSION-MIRROR-LETTERS (Blueprint Component 1) — Type 2,
perceptual intuition**
- *Why (birth-type addition)*: mirror-invariance in object recognition
  is one of the taxonomy's own clearest examples of a deep, lifelong,
  never-explicitly-taught perceptual default (see "Why Students Fail"
  above) — this is textbook Type 2, not a reasoning error, which is why
  the Blueprint's own adaptive flags correctly insist it must never be
  treated as a careless mistake.
- *Full trigger/probe/bridge/replacement/discrimination content*: see
  Blueprint Component 1, verbatim — not restated here.
- *Characteristic phrase (addition)*: per Type 2's diagnostic signature
  (`../../misconceptions/01-birth-taxonomy.md §2`), expect this
  confusion to REGROW under time pressure or fatigue even after a
  session where the hand-shape check was used successfully — a tutor
  seeing a previously-secure learner reverse b/d again on a later,
  faster-paced day should treat this as expected regrowth, not lost
  learning, and re-apply the same hand-shape check rather than
  reteaching from zero.

**MC-NONMIRROR-SHAPE-CONFUSION (new content, not in the existing
Blueprint) — Type 2, perceptual intuition**
- *Why*: the Blueprint's hand-shape trick (Component 1) resolves
  confusion specifically between MIRROR-oriented pairs (b/d, p/q) — it
  gives no traction on a structurally different confusion: letters that
  are shape-similar for a non-orientation reason, most commonly n/h/m
  (differing only in the number and height of vertical strokes) or u/n
  (differing only in which way a single curve opens). This is the same
  general perceptual-similarity mechanism as MC-SHAPE-CONFUSION-MIRROR-
  LETTERS, but a genuinely different discrimination problem — the
  hand-shape check does not apply, because there is no mirror-flip
  relating these letters, only a stroke-count/height difference.
- *Symptom / phrase*: a learner who has already passed mirror-pair
  discrimination (TA-4) but still swaps "n" for "h" or "m" for "n" in
  isolated naming is showing this distinct confusion, not a regression
  on the mirror-pair skill — the two should not be routed to the same
  recovery.
- *Detection probe (verbatim)*: "Look closely — how many little
  sticks (strokes) does this letter have standing up? Count them with
  me." (for n/h/m); "Which way does the curve open — up like a smile,
  or down like a frown?" (for u/n).
- *Recovery*: per Type 2's collision design
  (`../../misconceptions/02-the-repair-sequence.md §2`), the repair must
  be perceptual, not verbal — a feature-counting or feature-direction
  check the learner performs themselves (counting strokes, tracing the
  curve's opening direction with a finger), analogous to but distinct
  from the mirror-pair hand-check, since the discriminating FEATURE is
  different (count/height vs. orientation).
- *Verification*: correct naming of n, h, m, and u presented in
  randomized adjacency (deliberately placed near each other) on a fresh
  card set, using the feature-check strategy without prompting.

## Analogies

- **Best analogy — a letter is a person who wears a uniform at work
  (capital) and different clothes at home (lowercase), but is always
  the same person**: the person's identity (name) never changes even
  though the outfit does. Breaking point: clothing choice is free and
  optional in real life, but a letter's case is NOT freely chosen by
  the writer at will — it follows rules (sentence-start, proper nouns)
  that this concept does not yet teach; the analogy should not be
  stretched to explain WHEN each case is used, only THAT both forms are
  one identity.
- **Alternative — the hand-shape check for b/d, p/q (visual/kinesthetic,
  from the Blueprint)**: left-fist-thumb-up makes a "b" shape,
  right-fist-thumb-up makes a "d" shape — a physical, self-administered
  check rather than a verbal analogy; referenced here, not restated.
- **Story analogy**: "Every letter is an actor who owns two costumes but
  always says its own name the moment you ask it, no matter which
  costume it's wearing."
- **ANTI-ANALOGY — do NOT use "capital and lowercase letters are like
  twins"**: twins are two SEPARATE people who happen to look alike —
  this is the exact inverse of the truth at this node (one letter, two
  forms) and would directly reinforce MC-CASE-ARE-DIFFERENT-LETTERS by
  framing the pair as two individuals rather than one. If a learner
  proposes a "twins" framing themselves, correct it directly: "not
  twins — twins are two different people. This is one letter that just
  has two looks."

## Demonstrations

- **Physical (letter hunt)**: the Blueprint's Component 3 anchor
  (spread letter cards, call a letter name, student physically selects
  and holds up both case-forms together, naming them aloud) — canonical
  for this concept, referenced not restated.
- **Home/no-equipment**: any set of household letter magnets, alphabet
  blocks, or even hand-written cards on paper scraps works unmodified
  for the letter-hunt anchor and for TA-1/TA-2 naming drills.
- **Interactive/learner-activity**: case-matching (TA-3) is itself an
  interactive sorting activity — shuffled mixed-case cards physically
  paired by the learner, naming each pair aloud.
- **Teacher-demo (mirror-pair check)**: the tutor models the hand-shape
  trick once, explicitly, before asking the learner to use it
  independently on TA-4 items.
- **Prediction to elicit FIRST, every time**: before confirming a
  letter's name or a case-match, ask the learner to commit to a guess
  first ("what do you think this letter is called?" / "which lowercase
  letter do you think matches this one?") — Universal Principle 3,
  shared with every SHOW-family action.

## Discovery Questions

**Direct instruction wins here — argued, not defaulted to.** Letter
identity, case-pairing, naming, and alphabetic sequence are pure
CONVENTIONS of the Latin writing system — there is no causal mechanism
to discover, no "why" a learner could reason their way to (there is no
principled reason "A" is named "ay" rather than anything else, and no
principled reason the alphabet runs A-B-C rather than some other order).
A discovery-framework design (need → playground → invention →
collision → formalization → compression) would manufacture false
suspense around facts that must simply be told and drilled. The one
partial exception is TA-4's mirror-pair discrimination, which does
contain a genuine "aha" moment structurally similar to a compressed
discovery step: the learner does not need to be TOLD the hand-shape
check works, they can be led to notice, through guided contrast (b next
to d, hand shapes held up beside each letter), that the check reliably
predicts the letter — a noticing-through-contrast move, not a full
invention phase, exactly parallel to the compressed pattern the sibling
entry `eng.phonics.print-concepts.md` documents for its own
word-boundary rule. The Blueprint's TA-4 design already captures this
correctly; this entry does not propose replacing it with a full
discovery lesson.

## Teaching Sequence

Naming must be secure in BOTH cases independently (TA-1, then TA-2)
before case-matching is attempted (TA-3), because TA-3 requires
retrieving a name from a form the learner may not have practiced in
isolation yet — attempting matching before both cases are separately
secure conflates two different failure sources (not knowing the letter
at all vs. not yet linking its two forms) into one ambiguous wrong
answer. Mirror-pair discrimination (TA-4) must come AFTER general case
security, not folded into TA-1/TA-2, specifically because the Blueprint
stipulates never introducing both members of a mirror pair for the
first time in the same sitting — b and d must each be independently
secure before being placed in contrast, or the contrast itself becomes
the source of confusion rather than its resolution. Sequence knowledge
(TA-5) is placed last because "what comes after M" presupposes the
whole alphabet is already a stable, nameable set — testing sequence
before naming is secure produces a compound failure that misattributes
a naming gap to a sequence gap. This entry does not restate the
Blueprint's own turn-by-turn session script (Component 7) — see
Blueprint References below.

## Tutor Actions

Dispatch order for this concept, from `../../teaching-actions/`:
1. **Demonstration** (`01-show-family.md #1`) — the letter-hunt anchor;
   canonical opening for a concept whose content is pure convention.
2. **Enactment** (`03-do-family.md #13`) — physically selecting and
   holding up letter cards is a motor/procedural action, not merely
   cognitive recognition, so enactment has no substitute per that
   action's own fit rule; this covers TA-1 through TA-4.
3. **Prediction** (`04-test-thinking-family.md #15`) — attached to
   every Demonstration per the family-wide rule; also used standalone
   before each naming or matching reveal.
4. **Classification/Sorting** (`05-organize-family.md #20`) — TA-3's
   case-matching IS a sorting task (pairing a shuffled mixed set); this
   is the natural home for that Blueprint component within the
   dispatch library.
5. **Retrieval-Schedule Prompt** (`05-organize-family.md #23`) — TA-5's
   "what comes after M" task is functionally a retrieval-schedule-style
   prompt applied to sequence knowledge rather than to a fact already
   taught elsewhere; fits once naming is secure.

**What does NOT fit, and why**: TELL-family actions beyond a single
anchoring sentence are excluded for the same reason as both sibling
entries — this concept is naming-and-matching-heavy, and explanation
does not help a learner recall an arbitrary label any faster than
repeated, spaced retrieval practice does. Error Analysis
(`04-test-thinking-family.md #17`) is excluded outright at this node:
per its own stability guard, planting a deliberate flaw requires a
secure correct schema to contrast against, and introducing a
deliberately WRONG letter name before naming is independently fluent
risks the flawed pairing itself becoming what gets remembered.

## Voice Teaching Notes

- **What to listen for**: whether the learner names a letter instantly
  and confidently, or names it only after a visible pause that suggests
  active searching (the beginner model's rote-association retrieval
  taking effort) — both can be correct, but instant-confident naming is
  the actual mastery target; effortful-but-correct naming means the
  binding is not yet automatic and should continue in spaced practice
  rather than being marked complete.
- **Characteristic hesitations**: a learner who starts silently
  reciting the alphabet from "A" under their breath before answering a
  sequence question (TA-5) is using full recitation as a workaround
  rather than genuine relative-position knowledge — audible sub-vocal
  recitation is itself the detection signal for an unsecured advanced
  model, distinguishable from a learner who answers directly.
- **Pronunciation stakes**: letter NAMES have a small number of
  genuinely confusable pairs by ear alone — "B" and "D" said aloud, and
  "M" and "N" — a tutor should visually confirm which card the learner
  is pointing to or holding up rather than relying on the spoken name
  alone when the two could be confused acoustically, distinct from the
  b/d visual mirror-confusion this entry documents elsewhere.
- **The load-bearing sentence**: "what letter is this?" (or the
  case-matching / sequence equivalents) is this concept's load-bearing
  sentence and should be given a genuine pause before any confirmation,
  per `../../foundations/03-voice-first-learning-model.md §3` — rushing
  the pause risks the tutor supplying the answer before a genuinely
  retrievable-but-slow learner has finished searching.

## Assessment Signals

- **Diagnostic (golden probe)**: "Name these letters: F, K, X" (a short
  randomized-order uppercase set) — cleanly separates a learner with no
  naming fluency yet from one who has at least partial uppercase
  recognition, before deciding where in TA-1 through TA-5 to begin.
- **Guided practice items → independent practice items**: the
  Blueprint's WE-1 → WE-2 → WE-3 → MP-1 through MP-5 fading ladder is
  reused directly (Components 5–6) — not re-authored here.
- **Mastery gate set** (`../../assessment/05-mastery-verification.md
  §3`): production (name letters and match case on a fresh, randomized
  card set with no cueing — Blueprint MP-1/MP-2/MP-3); new-surface
  (letters not used during teaching, confirming genuine recognition
  rather than memorized card-order); mixed (embed a mirror-pair item
  among ordinary naming items to confirm TA-4's discrimination does not
  collapse back to guessing under mixed conditions); delayed (a
  next-session opening retrieval check on a small subset).
- **Why the mastery threshold is unusually high (0.90)**: this is the
  highest threshold in this batch, and appropriately so — the node
  gates BOTH the sound-mapping chain (`letter-sound-correspondence`)
  and the writing chain (`handwriting-and-formation`) simultaneously;
  an unsecured naming floor here would silently corrupt two entirely
  separate downstream skill chains at once, a wider blast radius than
  either sibling concept in this batch, justifying the highest bar.
- **Interpretation of response pattern**: fast-and-correct naming
  confirms automaticity; slow-and-correct naming confirms knowledge
  without yet confirming fluency (continue spaced practice, do not
  certify); fast-and-WRONG on a mirror pair specifically is the
  dangerous quadrant of the D1 grid
  (`../../foundations/02-adaptive-teaching-rules.md`) here — a
  confident, instant b/d reversal signals the perceptual default is
  actively firing, not merely untested, and should route straight to
  MC-SHAPE-CONFUSION-MIRROR-LETTERS' recovery rather than a generic
  re-ask.
- **Transfer items**: near (naming a letter never used in this
  session's card set); far (finding letters from the learner's own name
  scattered within a longer, unfamiliar word); real-world (identifying
  letters on any household print, e.g. a cereal box or sign).

## Tutor Recovery Strategy

Concept-specific application of `../../foundations/01-recovery-engine.md`:
- **"I don't know"** shrinks to a smaller identity question rather than
  a full re-explanation — for a naming failure, shrink to "is this a
  letter you've seen before, yes or no?" before re-attempting the full
  name; for a case-matching failure, shrink to "just point to ANY
  letter card that looks similar to this one," isolating recognition
  from correct pairing.
- **Likeliest utterance at this node**: a learner is more likely to
  produce a confident WRONG name (especially on mirror pairs) than to
  say "I don't know" outright, per the Type 2 mechanism documented
  above — when a stated "I don't know" does occur, it is most common on
  TA-5's sequence-position task specifically ("what comes after M"),
  where the smaller question to shrink to is: "let's just say the
  alphabet together starting from a letter you DO know is close by,"
  permitting a partial-recitation scaffold this concept's independent
  mastery gate does not.
- **Non-verbal signal specific to this node**: a learner who, when
  asked to name a letter, instead traces its SHAPE in the air or on the
  table without producing a name is showing genuine visual recognition
  without secure name-retrieval — this should route to spaced
  naming-only practice, not be scored as "doesn't know the letter,"
  since the visual side of the binding is clearly present.

## Memory Hooks

**Concept type**: fact/procedure hybrid, closer to pure declarative
fact-recall (26 arbitrary name-to-form bindings) than to phonemic
awareness's perceptual-motor skill — this follows a straightforward
spaced-retrieval pattern rather than an automaticity-burst pattern,
EXCEPT for the mirror-pair discrimination sub-skill, which — because
its underlying mechanism is Type 2 perceptual intuition with a
documented regrowth-under-fatigue pattern
(`../../misconceptions/01-birth-taxonomy.md §2`) — should remain in
permanent interleaved rotation rather than being retired once passed
once. Interleaving partners: mix mirror pairs (b/d, p/q) and the new
non-mirror confusions (n/h/m) into ordinary naming review periodically,
specifically to verify neither confusion has silently regrown, rather
than assuming a single successful mastery probe means the skill is
permanently secure.

## Transfer Connections

- **Near**: naming a letter in a font, card style, or handwriting the
  learner has not seen before.
- **Far**: locating and naming specific letters embedded within a full,
  unfamiliar word rather than presented in isolation (a direct preview
  of what `eng.phonics.letter-sound-correspondence` will require).
- **Real-world**: identifying letters on any environmental print — a
  cereal box, a street sign, a toy's packaging.
- **Expert-transfer**: the eventual, well-beyond-this-node awareness
  that Latin letterforms and case conventions are one specific writing
  system's choices, not a universal property of "letters" — directly
  load-bearing for an S9 learner whose L1 uses a non-Latin script or a
  different case system, matching the Blueprint's own S9 adaptive flag
  (treat the whole alphabet as genuinely new content, assume no
  shape/sound transfer).

## Cross-Subject Connections

None found in the KG's `cross_links` field (empty for this concept) and
none genuinely warranted — alphabet identity is specific to
English/Latin-script literacy and does not carry a real transfer
relationship into another subject at this foundational a level. "Weak
but real" is not an honest description here; there is simply no
cross-subject connection worth naming at this node, and this entry
states that plainly rather than manufacturing one.

## Blueprint References

A Blueprint exists: `docs/curriculum/blueprints/
eng.phonics.alphabet-recognition.md`. This entry reuses, by reference
and without restating: Component 1's full misconception
trigger/probe/bridge/replacement/discrimination text (both
misconceptions), Component 3's letter-hunt anchor scene, Components 5–6's
worked examples and mastery probe set (WE-1–3, MP-1–5), and Component 7's
full session architecture and protocol routing (S0/S1/S6/S9). This
entry's own contribution is the HOW-to-teach reasoning layer: mental
model progression, the failure-mechanism analysis in "Why Students
Fail," birth-type classification of the existing misconceptions, one
genuinely new misconception (non-mirror shape confusion) the Blueprint
does not contain, and the teaching-sequence/dispatch reasoning that
explains WHY the Blueprint's own component order is correct.

## Runtime Asset References

Seeded `AssetIdentity` records exist for this concept in
`src/lib/teaching/assets/authoredSeedAssets.ts` (the `ALPHA` constant
block), sourced directly from this concept's Blueprint (predating this
Educational Brain entry, since no `concepts/` entry existed at seeding
time). Seeded families present: `core_explanation` (EARLY and ADULT
grade bands) and `misconception_repair` (EARLY grade band), plus
`mastery_probe` (mcq) and `misconception_probe` probe items —
canonicalSlug pattern
`eng.phonics.alphabet-recognition:{familyKind}:en:{gradeband}`. No new
runtime asset is created, seeded, or proposed as part of authoring this
entry, per the Standard's ownership boundary — this section states what
already exists and does not add to it.

## Curriculum Feedback

None found — the KG node's prerequisite (`eng.phonics.print-concepts`),
`unlocks` (letter-sound-correspondence, handwriting-and-formation),
difficulty, and mastery threshold are all consistent with this
concept's actual teaching demands. The unusually high 0.90 threshold is
well-justified (see Assessment Signals above: this node gates two
independent downstream chains simultaneously, the widest blast radius
of any concept in this batch). One observation, not a defect: the KG
lists `cross_links: []` for this concept, which this entry's Cross-
Subject Connections section independently confirms is the honest
answer rather than an oversight — recorded here only to show the check
was actually performed, not assumed from the empty field alone.

## Version History

- 2026-08-04 — Initial authoring (English production-hardening session,
  level-1 batch alongside `eng.phonics.rhyming` and
  `eng.phonetics.speech-sounds-overview`). All 21 Standard sections
  authored fresh against the live KG and existing Blueprint; no prior
  version existed.
