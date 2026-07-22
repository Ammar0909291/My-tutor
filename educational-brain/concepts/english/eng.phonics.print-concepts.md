# Print Concepts — `eng.phonics.print-concepts`

## Identity

- **Concept ID**: `eng.phonics.print-concepts` (canonical English KG)
- **Curriculum location**: English / phonics / "Print Concepts" — one of
  English's two true zero-prerequisite entry nodes (`requires: []` in the
  live KG; the other is `eng.phonics.phonemic-awareness`, already
  authored). This entry closes the coverage gap `eng.phonics.
  phonemic-awareness.md`'s own Curriculum feedback section flagged as the
  highest-priority remaining item — the KG's other zero-floor entry point.
- **Relationship to `eng.phonics.phonemic-awareness`**: the two zero-
  prerequisite nodes cover different channels, not a shared one —
  phonemic-awareness is entirely ORAL (no print exists yet in that
  lesson), while this concept is specifically about the PRINT channel
  (conventions of the written page: directionality, word boundaries,
  print-vs-picture). A learner can hold either model without the other;
  neither is a prerequisite for the other in the live KG, and this entry
  does not assume phonemic awareness has been taught first.
- **Prerequisites**: none (`requires: []` in the live KG) — a genuine
  zero-floor entry node. In place of a prerequisite-gap check, use the
  book-handling readiness probe already specified in the existing
  Blueprint (`docs/curriculum/blueprints/eng.phonics.print-concepts.md`
  Component 2, PD-1) — referenced here, not re-derived.
- **Unlocks** (from KG): `eng.phonics.alphabet-recognition` — this
  concept is the floor for the entire chain of letter/name/sound work;
  a learner who cannot yet track print directionality or word boundaries
  will misattribute letter-naming practice to the wrong on-page location,
  so alphabet recognition genuinely depends on the CONVENTIONS taught
  here, not merely on generic "reading readiness."
- **Difficulty**: foundational · **Bloom**: remember · **Mastery
  threshold**: 0.85 (KG-authored — high for a "foundational" tag; see
  Assessment below) · **Est. hours**: 2
- **Learning objectives** — the learner can:
  1. Point to the print on a page (not the illustration) as the part
     that "says the same thing every time," on a page never seen before.
  2. Demonstrate correct reading directionality — left-to-right along a
     line, then a return sweep to the start of the next line — on an
     unfamiliar multi-line passage.
  3. Count the words in a spoken-then-written sentence using only the
     white-space boundaries between letter clusters, not letter or
     syllable counts.
  4. Correctly classify a given unit as a letter, a word, or a sentence
     when shown examples of each nested inside one printed sentence.
  5. Do all of the above without yet knowing any letter names or sounds
     — this concept certifies conventions of print, not decoding.

## Mental models

- **Beginner model — "the marks on the page are what's being read, not
  the picture"**: a page has two different things on it — a picture
  (which can be described differently by different people) and print
  (which says the exact same thing every time, to everyone). Runnable
  and correct: it is sufficient for objective 1 and is the load-bearing
  distinction the rest of the concept builds on. Shelf-life warning to
  deliver at installation (Universal Principle 6): "right now we're just
  telling print apart from pictures — soon we'll start figuring out what
  the print actually says."
- **Intermediate model — "print has a fixed direction and fixed
  boundaries"**: reading is not just "look at the marks," it follows a
  specific path (left-to-right, top-to-bottom, with a return sweep) and
  the marks are pre-grouped into words by the spaces between them.
  Upgrade trigger: the first time the learner is asked to track more than
  one line (surfaces the return-sweep requirement) or to count words in a
  sentence (surfaces the space-as-boundary rule) — both TA-2 and TA-3 in
  the existing Blueprint.
- **Advanced model — "print is organized in nested units: letters inside
  words inside sentences"**: the learner holds a containment hierarchy —
  a sentence is made of words, a word is made of letters — as a stable
  structural model of what print IS, independent of what any specific
  letter or word says. This is the model that makes later letter-naming
  and decoding instruction land on a pre-organized structure instead of
  an undifferentiated string of marks.
- **Expert model — "print conventions are one specific script's choice,
  not a universal law"** (well past this node, informing the L1-
  script-transfer adaptation below): eventual awareness that
  left-to-right, word-spacing, and Latin letterforms are conventions of
  THIS writing system, not properties of "reading" in general — not
  needed for mastery at this node, but the direction the beginner→
  advanced arc is heading, and directly load-bearing for any learner
  transferring from a differently-directioned script (see Adaptive
  flags in the Blueprint, S9).
- **Do not upgrade early**: a learner who cannot yet reliably distinguish
  print from picture (the beginner model) should not be pushed into
  word-counting or directionality tasks "to see if they can" — those
  assume the beginner model is already secure, and testing them early
  produces confident-wrong answers that look like a different failure
  (the D1 grid's dangerous quadrant) when the actual cause is an
  unsecured floor.

## Why beginners fail here

The platform's own documented failure mode for English lesson one
(`../../first-lesson/07 §1`) names the sibling concept
(phonemic-awareness) as the origin case, but the same mechanism applies
here from the print side: a pre-reader's entire prior experience of
"being read to" trains them to attend to the picture and the adult's
voice, never to the print itself — nothing in that experience requires
noticing that the marks, not the pictures, carry the fixed message.
Failure here is not a deficit of intelligence or attention; it is the
absence of a reason to have ever looked at print as its own object
before. A second, distinct failure mode is specific to word-boundary
counting: syllable-clapping and rhyming games (which most learners meet
before formal reading instruction) train attention to SOUND chunks, and
nothing about that experience implies that visual white space marks the
same boundaries — a learner can be fully phonologically aware and still
have no reason to expect spaces to be meaningful, because the two skills
(hearing chunks, seeing gaps) have never been connected for them before.

## Misconception library

The existing Blueprint (`docs/curriculum/blueprints/eng.phonics.
print-concepts.md`, Component 1) already documents two misconceptions
with full trigger/probe/bridge/replacement/discrimination content —
reused by reference below, not re-copied, with the birth-type
classification (`../../misconceptions/01-birth-taxonomy.md`) added since
the Blueprint predates that taxonomy and did not classify them.

**MC-PICTURE-IS-THE-STORY (Blueprint Component 1) — Type 1,
overgeneralization**
- *Why (birth-type addition)*: "attend to the picture, not the marks" is
  not a random guess — it is a direct, correct extension of the
  learner's entire pre-print experience (every book read TO them was
  narrated from pictures, by an adult who did the print-reading
  invisibly). The misconception is a genuinely useful strategy
  (picture-attention) over-applied to a task (independent reading) it
  was never meant to solve.
- *Full trigger/probe/bridge/replacement/discrimination content*: see
  Blueprint Component 1, verbatim — not restated here.
- *Characteristic phrase (addition — free detection channel)*: a
  learner retelling the "same" page differently on two readings, or
  saying "it says [invented content matching the picture]" when asked
  to read print they cannot yet decode, is showing this misconception
  even before the formal probe is run.

**MC-SPACES-ARE-DECORATION (Blueprint Component 1) — Type 1,
overgeneralization (a different overgeneralized skill than MC-PICTURE)**
- *Why (birth-type addition)*: syllable-clapping (a skill most learners
  meet first, via rhymes and songs) trains "break the word into chunks
  by SOUND." Nothing in that training implies that visual spaces mark
  word boundaries — the learner is not ignoring a signal, they are
  applying their one existing chunking strategy (sound-based) to a
  visual task it was never built for, exactly the overgeneralization
  pattern.
- *Full trigger/probe/bridge/replacement/discrimination content*: see
  Blueprint Component 1, verbatim — not restated here.
- *Characteristic phrase (addition)*: a learner who touches or taps each
  LETTER while "reading" a short sentence (rather than each word-cluster)
  is showing non-verbal evidence of this misconception before any
  question is asked.

**P3 — Directionality assumed universal, not English-specific (Type 6,
analogy/prior-experience overextension) — new content, not in the
existing Blueprint**
- *Why*: for a learner whose only prior print exposure is a differently-
  directioned script (right-to-left, e.g. Arabic/Hebrew/Urdu; or
  top-to-bottom columns, e.g. traditional vertical Chinese/Japanese),
  "which way does reading go" is not an open question requiring
  discovery — it already has a confident, correct-for-a-different-system
  answer, transferred wholesale.
- *Symptom / phrase*: on TA-2 (directionality tracing), the learner's
  finger sweeps right-to-left or top-to-bottom with full confidence and
  no hesitation — this is NOT the same signal as a beginner genuinely
  guessing; confident-fluent tracing in the wrong direction is diagnostic
  of L1-script transfer, not of directionality being unlearned.
- *Detection probe (verbatim)*: "In the way you've read or seen writing
  before, which way does your eye go — this way [gesture left-to-right]
  or this way [gesture right-to-left]? English always goes this way
  [demonstrate] — let's practice this specific direction together."
- *Recovery*: per Type 6's collision design, do not treat this as an
  error to correct through repetition alone — name the difference
  explicitly as a convention-swap ("your other reading goes this way;
  English goes this way — it's not wrong, it's just a different rule for
  a different writing system"), matching the Blueprint's own S9 adaptive
  flag, which this misconception entry formalizes with a birth-type and
  a verbatim probe the Blueprint did not include.
- *Verification*: correct left-to-right, top-to-bottom sweep with a
  return-sweep on a fresh, unfamiliar English passage, without
  re-prompting.

## Explanation library

- **By age/register (child)**: "These marks on the page — that's called
  print — always say the exact same thing, every single time anyone
  reads them. The picture is just a helper; the print is the real
  story."
- **By age/register (adult/older learner, no infantilizing shift —
  `../../foundations/03-voice-first-learning-model.md §5`)**: "Right
  now we're going to look at exactly how print works as a system —
  which direction it runs, how it marks off individual words — before
  we get into what any specific word says."
- **By entry state (complete beginner, no background)**: the Blueprint's
  own Component 3 anchor script (cover-the-picture / cover-the-print
  comparison) is this concept's canonical opening and should be used
  verbatim for a true zero-floor learner — not restated here.
- **By entry state (returning learner, some book exposure but
  inconsistent directionality)**: "You've handled books before — today
  we're going to get really precise about exactly which way the reading
  goes and how to tell where one word stops and the next starts."
- **By frame (visual)**: token-placement in the gaps between word
  clusters (Blueprint TA-3) makes the otherwise-invisible word boundary
  visible as a countable physical object rather than an abstract rule.

## Analogy library

- **Best analogy — the picture is a friend describing the story; the
  print is the story itself, word for word**: a friend's description
  changes depending on the friend and the day; the print underneath
  never changes. Breaking point: this analogy implies the picture is
  unreliable or unimportant, when in fact skilled readers DO use
  pictures productively (as a comprehension aid) once decoding is
  established — the analogy should be retired once the print/picture
  distinction is secure, not carried forward as "pictures don't matter."
- **Alternative — a line of people walking in single file (for
  directionality)**: the group always moves in one direction, one after
  another; you follow the line from front to back, then start a new line
  at the front again. Breaking point: implies each "person" (word) takes
  equal time/space, which real print doesn't (word lengths vary), so
  this analogy supports directionality only, not word-boundary counting.
- **Story analogy**: "print is a secret code that always unlocks to the
  exact same message, no matter who's holding the key — the picture is
  just a hint about what the code might say."
- **ANTI-ANALOGY — do NOT use "the picture and the print are two ways of
  telling the same story, pick whichever is easier"**: this instantly
  reinforces MC-PICTURE-IS-THE-STORY by framing print and picture as
  interchangeable, equally valid channels, when the entire point of this
  concept is that only one of them is fixed. If a learner proposes this
  framing themselves, name it directly and correct it ("they're not
  interchangeable — the print is the one that never changes; that's what
  makes it print").

## Demonstration library

- **Physical (cover-and-compare)**: the Blueprint's Component 3 anchor
  (cover the picture, read the print aloud; cover the print, ask what
  the page says) — canonical for this concept, referenced not restated.
- **Home/no-equipment**: any picture book already in the home works
  unmodified; a hand or a card serves as the cover-up tool for the
  cover-and-compare demonstration.
- **Interactive/learner-activity**: token-placement in word gaps
  (Blueprint TA-3) — the learner physically places a small object in
  each space and counts objects-plus-one.
- **Teacher-demo (directionality)**: finger-sweep modeling on a two-line
  then three-line passage (Blueprint TA-2), with the learner tracing the
  same path immediately after watching.
- **Prediction to elicit FIRST, every time**: before revealing a word
  count or confirming a directionality trace, ask the learner to commit
  to a guess first ("how many words do you think are in this sentence?"
  / "which way do you think reading goes on this page?") — Universal
  Principle 3, shared with every SHOW-family action.

## Discovery lesson

**Direct instruction wins here — argued, not defaulted to**, for the
same structural reason as the sibling entry
(`eng.phonics.phonemic-awareness.md`): this concept's content is a set
of ARBITRARY CONVENTIONS (which direction print runs, that spaces mark
words) rather than a discoverable causal mechanism. A learner cannot
"discover" that English reads left-to-right through reasoning or
experimentation — it is a fact about a specific writing system that must
be demonstrated and stated, not derived. The one partial exception is
the word-boundary rule (TA-3), which has a genuine "collision" moment
built in (comparing spaced vs. unspaced text) that functions like a
compressed discovery step — but even there, the full 6-step Discovery
Framework (need → playground → invention → collision → formalization →
compression) is not warranted: there is no "invention" phase, because
the rule to be found (spaces mark words) cannot be invented, only
noticed once contrasted against its absence. The Blueprint's TA-3 design
already captures this compressed noticing-through-contrast move
correctly; this entry does not propose replacing it with a full
discovery lesson.

## Teaching actions

Dispatch order for this concept, from `../../teaching-actions/`:
1. **Demonstration** (`01-show-family.md #1`) — the cover-and-compare
   anchor and the directionality finger-sweep are both demonstrations;
   this is the canonical opening move for a concept whose content is
   convention rather than derivation.
2. **Enactment** (`03-do-family.md #13`) — the learner physically traces
   the reading path and physically places boundary tokens; both are
   motor/procedural, not merely cognitive-recognition tasks, so
   enactment has no substitute per that action's own fit rule.
3. **Prediction** (`04-test-thinking-family.md #15`) — attached to every
   Demonstration per the family-wide rule, and used standalone before
   each word-count or directionality reveal.
4. **Classification/Sorting** (`05-organize-family.md #20`) — once the
   beginner model is secure, sorting nested units (letter / word /
   sentence, Blueprint TA-4) consolidates the containment-hierarchy
   advanced model.

**What does NOT fit, and why**: TELL-family actions beyond a single
anchoring sentence are excluded for the same budget reason as the
sibling concept — this is a pre-reader-facing, low-vocabulary-budget
node, and heavy explanation risks spending the session's attention on
talk instead of on the print-handling itself. Error Analysis
(`03-do-family.md #14`) is excluded outright: per its own stability
guard, planting a deliberate flaw requires a secure correct schema to
contrast against, and at this entry node there is no secure schema yet
to perturb.

## Voice teaching

Unlike its sibling entry, this concept is NOT flagship voice-required
territory — print concepts are inherently visual/physical (the page, the
print, the pointing finger), so a purely audio-only channel loses real
information here (which the sibling concept, phonemic-awareness, does
not — that one is fully audible). Applying
`../../foundations/03-voice-first-learning-model.md` to the parts that
ARE voice-relevant:
- **What to listen for**: hesitation or a wrong confident answer on the
  verbal half of the cover-and-compare demonstration ("what does this
  page say?") — a long pause suggests the learner is genuinely
  uncertain which channel to trust (early-stage confusion); a fast,
  confident, picture-based answer suggests MC-PICTURE-IS-THE-STORY is
  actively held, not merely untested.
- **Characteristic hesitations**: word-counting is where verbal latency
  is most diagnostic — a learner who counts letters or syllables aloud
  ("c-a-t, three... two... ") before answering is audibly applying the
  wrong (but real) counting method, distinguishable from a learner who
  is silently unsure.
- **Pronunciation stakes**: none — this concept does not require
  producing any specific sound.
- **The load-bearing sentence**: "which part stays exactly the same
  every time?" (or the directionality equivalent, "which way does
  reading go?") is this concept's load-bearing sentence and should be
  slowed and given space, per `../../foundations/03 §3`.
- **Channel-reality note**: this concept's core content (pointing,
  tracing, token-placement) is not capturable through the text/voice
  channels the runtime currently instruments at all — the honest gap
  here is larger than the STT-discards-prosody gap documented centrally
  (`../../foundations/03 §7`), since the primary evidence (WHERE the
  learner's finger goes) has no channel at all in a text/voice-only
  product. This is recorded as a channel-reality note, not re-litigated
  as a new finding — it is a direct consequence of the already-documented
  gap, applied to a concept whose core skill happens to be pointing
  rather than speaking.

## Assessment

- **Diagnostic (golden probe)**: "Here's a page you've never seen —
  point to the part that says the exact same thing every time anyone
  reads it." (Blueprint MP-1, reused as the diagnostic probe as well as
  a mastery probe — appropriate here since the same item cleanly
  separates print-vs-picture at any point in instruction.)
- **Guided practice items → independent practice items**: the
  Blueprint's WE-1/WE-2/WE-3 → MP-1 through MP-5 fading ladder is
  reused directly (Components 5–6) — not re-authored here.
- **Mastery gate set** (`../../assessment/05 §3`): production (trace
  directionality and count words on a fresh, never-seen passage with no
  cueing — Blueprint MP-3/MP-4); new-surface (a passage in unfamiliar
  vocabulary, confirming the skill is about print CONVENTIONS, not
  memorized content); mixed (embed a nested-unit classification item,
  MP-5, among directionality items to confirm the two skills don't
  collapse into one); delayed (next-session opening retrieval — this is
  completion criterion C2 for a lesson-one learner,
  `../../first-lesson/04 §3`).
- **Why the mastery threshold is unusually high (0.85)**: this node is
  the KG's floor for `eng.phonics.alphabet-recognition` and, through it,
  everything downstream in decoding — an unsecured print-convention
  floor produces the same silent metastasis-chain risk
  (`../../misconceptions/02 §4`) documented for the sibling entry: a
  learner who has not internalized "spaces mark words" will
  misattribute later letter-naming and word-recognition practice to the
  wrong on-page unit. The high threshold matches this being a
  high-leverage cut-node despite its "foundational" tag.
- **Transfer items**: near (a new page, same skill — print-vs-picture or
  directionality on unfamiliar content); far (nested-unit classification
  on a full paragraph rather than one sentence); real-world (any
  household print — a cereal box, a sign — asked "which part is the
  print, and which way would you read it?").
- **Voice assessment notes**: see Voice teaching above — latency and
  confidence on the verbal half of each probe are diagnostic exactly as
  the D1 grid predicts (fast+wrong is the dangerous quadrant here too:
  a confident, quick picture-based "reading" is a stronger misconception
  signal than a hesitant one).

## Recovery notes

Concept-specific application of `../../foundations/01-recovery-engine.md`,
lesson-one-modified per `../../first-lesson/05`:
- **"I don't know"** shrinks to echo — for this concept, echo means the
  tutor re-runs the cover-and-compare demonstration once more, slower,
  and asks the same yes/no question ("was I looking at the picture, or
  at these marks?") rather than open-ended re-explanation; a yes/no
  re-ask cannot fail the way an open question can.
- **Likeliest utterance at this node**: a learner is unlikely to verbally
  express confusion here (the failure mode is usually a confident wrong
  answer, per MC-PICTURE-IS-THE-STORY, rather than a stated "I don't
  know") — when a learner DOES say "I don't know," it most often follows
  the word-counting task specifically (TA-3), and the smaller question
  to shrink to is: "just find ONE gap — point to any space between two
  clusters of letters," isolating the atomic unit of the skill before
  asking for a full count.
- **Non-verbal signal specific to this node**: a learner who taps each
  LETTER (not each word-cluster) while attempting to count words is
  showing non-verbal evidence of MC-SPACES-ARE-DECORATION without having
  said anything wrong — this should route to that misconception's
  recovery, not be scored as a simple counting error.

## Memory & review

**Concept type**: fact/procedure hybrid, closer to a perceptual
convention (like phonemic awareness) than a factual claim — the skill
needs to become automatic (instant, unconscious print-tracking) before
it can support fluent later reading, so it follows the same
automaticity-burst pattern as the sibling entry
(`../../foundations/04-universal-teaching-principles.md` Principle 3).
Interleaving partners: mix directionality items with nested-unit
classification items (MP-3 with MP-5) periodically to confirm the two
skills remain distinct rather than merging into one vague "print
awareness" impression.

## Transfer map

- **Near**: applying print-vs-picture and directionality judgments to a
  new, unseen page or book.
- **Far**: nested-unit classification (letter/word/sentence) applied to
  a full paragraph rather than a single sentence card.
- **Cross-subject**: weak but real — the containment-hierarchy advanced
  model (letters inside words inside sentences) is a light preview of
  hierarchical/nested-structure thinking that recurs generically across
  subjects (e.g. later outline/paragraph structure); not strong enough
  to design a lesson around, worth naming once if relevant.
- **Real-world**: any printed material in the learner's environment —
  cereal boxes, street signs, a shopping list — as directionality and
  word-boundary practice outside the lesson.
- **Expert-transfer**: the L1-script-transfer adaptation (misconception
  P3 above) is itself a transfer target in the other direction — an
  adult literate in a differently-directioned script is transferring
  FROM a mature print-convention model TO this one, not building the
  convention concept from nothing; this concept's role for that learner
  is contrastive labeling, not ground-up construction.

## Curriculum feedback

None found — the KG node's `requires: []`, `unlocks`, difficulty, and
mastery threshold are all consistent with this concept's actual teaching
demands; the 0.85 threshold is well-justified (see Assessment above,
same reasoning pattern as the sibling entry's justification for its own
0.85 threshold). One cross-reference note, not a curriculum defect: the
existing Blueprint's YAML header lists `alphabet-recognition` under
`cross_links`, while the live KG lists it under `unlocks` — this entry
uses the KG's field directly (Identity above) rather than the
Blueprint's YAML, and flags the discrepancy here as a note for whoever
next touches the Blueprint file, not as a KG defect.
