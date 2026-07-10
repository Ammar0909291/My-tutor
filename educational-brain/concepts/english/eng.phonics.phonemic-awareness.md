# Phonemic Awareness — `eng.phonics.phonemic-awareness`

## Identity

- **Concept ID**: `eng.phonics.phonemic-awareness` (canonical English KG)
- **Curriculum location**: English / phonics / "Phonemic Awareness" —
  one of English's two true zero-prerequisite entry nodes (`requires: []`
  in the live KG; the other is `eng.phonics.print-concepts`, not yet
  authored — see Curriculum feedback below).
- **Why this entry exists now, ahead of file order**: `concepts/
  COVERAGE.md`'s own expansion protocol ranks "placement entry points
  first" above cut-nodes and misconception hubs — yet all 3 prior
  concept entries (fractions, Newton's First Law, letter-sound
  correspondence) are cut-nodes/misconception hubs further into their
  curricula, not entry points. This concept is the exact node named in
  `../first-lesson/07 §1` as the origin of the platform's own documented
  failure: "an AI that opens English with letters, definitions, or —
  worst — grammar vocabulary has skipped both real entry nodes and
  started mid-curriculum." It is the single most evidence-grounded
  coverage gap in the tree.
- **Prerequisites**: none (`requires: []` in the live KG) — this is a
  genuine zero-floor entry node.
- **Unlocks** (from KG): `eng.phonics.rhyming`, `eng.phonics.blending-
  segmenting`, `eng.phonetics.speech-sounds-overview`. This is a cut-node
  in its own right for the entire phonics branch — everything downstream
  in decoding and spelling assumes a learner can hear sounds as separate
  units.
- **Difficulty**: foundational · **Bloom**: remember · **Mastery
  threshold**: 0.85 (KG-authored — notably high; see Assessment below) ·
  **Est. hours**: 3
- **Learning objectives** — the learner can:
  1. Isolate the first sound of a spoken word on request ("what's the
     first sound in 'sun'?" → /s/), without reference to letters.
  2. Recognize when two spoken words share a starting sound.
  3. Produce a word (real or invented) that starts with a given sound.
  4. Distinguish "sound" (a phoneme) from "syllable" (a chunk) when
     asked to compare two ways of breaking the same word apart.
  5. Do all of the above with the book closed, letters absent — the
     objectives are certified entirely by ear and mouth.

## Mental models

- **Beginner model — "words have a first noise"**: a spoken word has one
  identifiable sound at its start, findable by saying the word slowly
  and noticing what comes first. Runnable, correct, and sufficient for
  objectives 1–3 above. Shelf-life warning to deliver at installation
  (Universal Principle 6, `../foundations/04-universal-teaching-
  principles.md`): "right now we're just finding the FIRST sound —
  later we'll find sounds anywhere in a word, even hiding in the
  middle."
- **Intermediate model — "words are made of a sequence of separate
  sounds"**: a word is not one noise but a small ordered set of
  phonemes, each individually findable and each individually
  replaceable ("cat" minus its first sound plus /b/ makes "bat"). Upgrade
  trigger: the first time the learner is asked to isolate a MIDDLE or
  FINAL sound, or the first blending task (a different concept,
  `eng.phonics.blending-segmenting`, but the model shift belongs here).
- **Advanced model — "sounds are a different layer than letters or
  syllables"**: the learner holds phonemes as their own category,
  distinct from both syllables (bigger chunks) and letters (a later,
  separate written layer) — this is the model that makes spelling
  instruction possible without confusing "sound" and "spelling."
- **Expert model — "phonemes are a closed, describable inventory"**:
  eventual awareness (well past this node, informing
  `eng.phonetics.speech-sounds-overview`) that a language has a specific,
  countable set of phonemes, each describable by how it's produced —
  not needed at this node, but the direction beginner→intermediate→
  advanced is heading.
- **Do not upgrade early**: the beginner model (first-sound-only) is the
  correct FIRST model. A learner who cannot yet isolate a first sound
  reliably should never be asked for a middle or final sound "to see if
  they can" — that is testing the next model before this one is secure,
  which produces exactly the kind of visible early failure `../first-
  lesson/` was built to prevent.

## Why beginners fail here

The platform's own documented failure mode is the clearest illustration:
beginners fail here not because the skill is hard, but because it is
INVISIBLE to instruction that assumes print. A learner (child or adult)
who cannot yet segment spoken sound has never needed to before — speech
is produced and understood fluently without ever consciously noticing
its component phonemes, the same way walking doesn't require noticing
individual muscle contractions. The skill this node teaches is not new
KNOWLEDGE about language; it is a new ATTENTION — noticing something
that was always there but never needed conscious access. Any instruction
that opens with letters, spelling rules, or grammar terms has skipped
past this attention-shift entirely and started teaching a written-
language skill on top of an oral-language foundation that was never
built.

## Misconception library

Applying the birth-taxonomy diagnostic procedure
(`../misconceptions/01-birth-taxonomy.md §7`) to this concept for the
first time since the taxonomy was authored — the following three entries
are new content, discovered by running that procedure against this
concept rather than retrofitted from an existing observation.

**P1 — "Sound" means loudness or noise-in-general, not a phoneme (Type
3, language contamination)**
- *Why*: "sound" in everyday speech means any audible noise ("what's
  that sound?", "turn the sound down") — the everyday sense collides
  directly with the technical sense (one discrete speech segment).
- *Symptom / phrase*: asked "what sound does 'sun' start with?", the
  learner answers with volume or quality ("a hissy sound," "a quiet
  sound") rather than isolating /s/, or answers with the whole word
  again ("the 'sun' sound").
- *Detection probe (verbatim)*: "Say 'sun' slowly with me... sssssun.
  What's the very first noise your mouth makes, before anything else?"
  — a learner who answers with volume/quality language rather than
  attempting to isolate a specific mouth-sound shows P1.
- *Recovery*: per Type 3's collision design (`../misconceptions/02
  §1`), remove the contaminating word entirely rather than arguing with
  it — drop "sound" altogether and ask instead: "say 'sun' really
  slowly — sssss-un. What does your mouth do FIRST?" The word "sound" is
  the contaminant; teaching around it rather than through it resolves
  most cases immediately.
- *Verification*: the learner correctly isolates a first phoneme on a
  fresh word without the word "sound" appearing in the question at all.

**P2 — Syllable-counting confused with phoneme-counting (Type 1,
overgeneralization)**
- *Why*: syllable awareness (clapping "wa-ter" as two claps) typically
  develops before phonemic awareness and is usually taught first
  through rhymes and songs — a real, correct skill for its own domain,
  extended past where it works.
- *Symptom / phrase*: asked how many sounds are in "cat," the learner
  claps once (treating the whole word as one chunk, the syllable-
  counting habit) or says "one" — a genuine and predictable
  overgeneralization from a skill that IS correct for syllables.
- *Detection probe (verbatim)*: "Let's count the sounds in 'cat' — not
  the claps, the little sounds your mouth makes: c...a...t. How many did
  you hear?" — a learner who claps once or answers "one" without
  attempting the slow-sound-by-sound version shows P2.
- *Recovery*: per Type 1's collision design, extend the learner's OWN
  trusted method (clapping/chunking) one step further using a method
  they already trust — model the word in extreme slow motion, sound by
  sound, physically holding up a finger for each sound as it's produced,
  so the mismatch between "one clap" and "three separate mouth-
  movements" is felt through their own counting method, not argued
  verbally.
- *Verification*: the learner correctly separates a 3-phoneme word into
  three sounds (not claps) on a fresh word, without finger-cueing.

**P3 — "Same sound" means shares an ending only (Type 5,
instruction-induced)**
- *Why*: if a learner's only prior exposure to sound-awareness was
  rhyming games (which specifically require awareness of the ending/rime
  — "cat/hat/bat"), and no one ever named that rhyming is only ONE
  position a shared sound can occur in, the learner reasonably concludes
  "same sound" always means "matches at the end."
- *Symptom / phrase*: asked whether "sun" and "sock" share a sound, the
  learner says no (because they don't rhyme), missing the shared
  starting /s/ entirely — the child is not wrong about rhyme; they were
  never told rhyme was a special case, not the whole rule.
- *Detection probe (verbatim)*: "Do 'sun' and 'sock' sound the same
  anywhere?" — a learner who says "no" (having correctly ruled out
  rhyme) without checking the beginning shows P3.
- *Recovery*: per Type 5's collision design, frame the correction as a
  promotion, not a contradiction: "you're right that they don't rhyme —
  rhyme is matching at the END. But sounds can match ANYWHERE — listen
  to the front: sss-un, sss-ock. Same front sound! There's more than one
  place words can match." Name the shelf-life explicitly (Universal
  Principle 6) — this is the single highest-leverage prevention move for
  future learners taught by rhyme-first curricula.
- *Verification*: the learner correctly identifies a shared sound at the
  beginning, middle, or end across a mixed set of word pairs, at least
  one of which shares only a beginning sound and does not rhyme.

## Explanation library

- **By age/register (child)**: "Words are made of tiny sounds, like
  beads on a string. 'Cat' has three tiny sound-beads: c...a...t."
- **By age/register (adult, no infantilizing shift — `../foundations/
  03-voice-first-learning-model.md §5`)**: "Every word you say is built
  from a small set of individual sounds, produced in sequence — the same
  way this sentence is built from individual words. Right now we're
  training your ear to hear those individual sounds directly, the way
  you already hear individual words in a sentence."
- **By entry state (complete beginner, no background)**: the anchor-
  first version in `../first-lesson/07 §1` — "you know how the m-m-moon
  starts? That hum? Today is that hum" — is this concept's canonical
  lesson-one opening and should be used verbatim for a true zero-floor
  learner.
- **By entry state (returning learner, some prior phonics exposure)**:
  "You've met letters already — today we're doing something different:
  forget the letters for a minute and just listen. Every letter you know
  stands for one of these sounds — we're going straight to the sound
  itself."
- **By frame (visual, for a learner who processes visually even though
  this skill is oral)**: holding up one finger per sound as it's said,
  making the otherwise-invisible segmentation visible without using
  print.

## Analogy library

- **Best analogy — beads on a string**: a word is a string of separate
  sound-beads; you can count them, and pull them apart one at a time.
  Breaking point: beads implies rigid, fixed-size, separable objects —
  real phonemes blend into each other in fluent speech (coarticulation)
  in a way beads never do; useful for counting and isolating, not for
  explaining why "cat" said fast sounds different from "cat" said
  slowly.
- **Alternative — a sound each footstep makes**: walking makes a
  sequence of separate footfalls even though the walk feels continuous;
  breaking point: implies sounds are all equal "weight," which they are
  not (vowels carry more duration/stress than most consonants).
- **Story analogy**: "the word is hiding three little sounds inside it,
  like three kids hiding in a row behind a fence — we're going to find
  them one at a time."
- **ANTI-ANALOGY — do NOT use "letters make sounds"**: this is not an
  analogy at all but a category error at this specific node — letters
  are a written-language convention that arrives LATER
  (`eng.phonics.letter-sound-correspondence`); using letter-talk here
  installs exactly the letter-before-sound misconception `../first-
  lesson/07 §1` explicitly warns against ("NOT a letter — the letter is
  a later lesson; binding sound to symbol on day one stacks two
  concepts"). If a learner brings up letters unprompted, acknowledge
  briefly ("we'll get to the letter for that soon") and redirect to the
  sound.

## Demonstration library

- **Physical (mouth-watching)**: the tutor says a word slowly, letting
  the learner watch (or, on audio-only, listen closely to) the mouth
  shape change between each sound — for /m/: lips together, humming,
  then releasing.
- **Home/no-equipment**: clapping is explicitly reserved for syllables
  (to avoid contaminating this concept with the syllable-counting habit,
  per P2 above) — instead, use a raised finger per sound, held up slowly
  as each one is produced.
- **Interactive/learner-activity**: the learner says a familiar word
  (their own name, a pet's name) slowly and tries to catch the first
  sound themselves before the tutor confirms.
- **Prediction to elicit FIRST, every time**: before revealing how many
  sounds a word has, ask "how many sounds do you think 'sun' has?" —
  commit to a number before counting together (Universal Principle 3,
  the prediction-first rule this node shares with every SHOW-family
  action).

## Discovery lesson

**Direct instruction wins here — argued, not defaulted to.** The full
6-step Discovery Framework (Delivery 2 §2, not yet authored) is not the
right design for this specific node, for a reason specific to complete
beginners: `../first-lesson/04 §1` establishes demonstrate-before-explain
as LAW for novices at any concept, and this concept's entire content is
an ATTENTION shift (noticing something the learner's mouth already does
fluently) rather than a discoverable causal mechanism or a constructible
procedure. There is nothing to invent or construct here — the sounds
already exist in the learner's own fluent speech; the lesson's entire
job is directing attention to something already present, which is
squarely a demonstration-and-noticing task, not a discovery task. A
discovery-framework "need → playground → invention → collision →
formalization → compression" design would manufacture false suspense
around a fact the learner's own mouth already proves true every time
they speak.

## Teaching actions

Dispatch order for this concept, from `../teaching-actions/`:
1. **Demonstration** (`01-show-family.md #1`) — the tutor produces the
   word slowly, prediction-first, mouth-watchable. The canonical opening
   move, matching `../first-lesson/07 §1`'s script exactly.
2. **Enactment** (`03-do-family.md #13`) — the learner produces the
   sound themselves; this is a physical-procedure knowledge type at this
   node (making the sound is a motor/oral skill, not just a cognitive
   recognition), so enactment has no substitute per that action's own
   fit rule.
3. **Prediction** (`04-test-thinking-family.md #15`) — attached to every
   Demonstration per the family-wide rule; also used standalone before
   any sound-count reveal.
4. **Classification/Sorting** (`05-organize-family.md #20`) — once the
   beginner model is secure, sorting word-pairs into "same first sound /
   different first sound" consolidates the skill; genuine near-miss
   pairs (same first LETTER-shape sound-alike but different phoneme,
   e.g. "city" vs. "cat") should wait for a later session once the skill
   is stable, per that action's own near-miss design rule.

**What does NOT fit, and why**: TELL-family actions (Analogy, Story,
Direct Telling) are legal only as framing devices here, never as the
primary teaching move — `../first-lesson/07 §1` is explicit that this
node's entire vocabulary budget goes to zero technical words, and any
TELL action heavier than a single anchoring sentence risks spending that
budget on explanation instead of on the sound-play itself. Concept Map
and Thought Experiment (`05-organize-family.md #21`, `04-test-thinking-
family.md #16`) are excluded outright — both require meta-language below
this node's beginner floor.

## Voice teaching

This is, per `../first-lesson/07 §1`, "the tree's flagship voice-required
territory" — every success and failure is audible and nothing is
writable. Applying `../foundations/03-voice-first-learning-model.md`
specifically to this concept:

- **What to listen for**: whether the learner genuinely isolates a
  single phoneme, cleanly, or produces a schwa-contaminated version
  (a small vowel sound sneaking in after a consonant — "buh" instead of
  a clean /b/). The schwa-contamination risk BEGINS at this node even
  though the full schwa discipline is documented at the node where
  letters arrive (`eng.phonics.letter-sound-correspondence.md`) — a
  tutor modeling sounds here should already model them clipped and
  clean, since the habit formed now transfers directly.
- **Characteristic hesitations**: a long pause before attempting
  isolation (often P1 — the learner is searching for what "sound" even
  means in this context, not struggling with the phoneme itself) versus
  a confident, fast, WRONG answer (often P2 or P3 — a working but
  mismatched model, not an absence).
- **Pronunciation stakes**: none for the learner beyond producing the
  target phoneme reasonably — this is not an accent-correction context;
  any reasonable production of the target sound counts as success.
- **The load-bearing sentence**: "what does your mouth do FIRST" (or
  equivalent) is this concept's load-bearing sentence across nearly
  every probe and demonstration — it should be slowed and given space
  every time, per `../foundations/03 §3`.

## Assessment

- **Diagnostic (golden probe)**: "Say [familiar word] slowly with me...
  what's the very first sound?" — using a word from the learner's own
  name or a stated interest whenever possible (raises engagement, costs
  nothing).
- **Guided practice items**: tutor-and-learner say the word together,
  slowly, isolating the first sound jointly, 2–3 words.
- **Independent practice items**: learner isolates the first sound alone
  on a fresh word, 1 item for a true beginner (per `../first-lesson/02`'s
  hard limit), 2–3 for an established learner.
- **Mastery gate set** (`../assessment/05 §3`): production (isolate a
  fresh word's first sound with no cueing), new-surface (a word never
  used in teaching), mixed (embedded among syllable-counting items to
  confirm P2 doesn't resurface under mixing), delayed (next-session
  opening retrieval — this is completion criterion C2 for a lesson-one
  learner, `../first-lesson/04 §3`).
- **Why the mastery threshold is unusually high (0.85)**: this node
  gates essentially all of phonics and early reading — a shaky floor
  here produces exactly the metastasis-chain risk `../misconceptions/02
  §4` describes, propagating silently into blending, segmenting, and
  eventually spelling. The KG's own high threshold is consistent with
  this being one of the highest-leverage cut-nodes in the entire English
  curriculum despite its "foundational" difficulty tag.
- **Transfer items**: near (a new word, same position — first sound);
  far (identifying a sound in the MIDDLE of a word, which belongs to the
  intermediate model and should not be assessed until that model has
  been explicitly upgraded); real-world (catching the shared sound in a
  nursery rhyme or song the learner already knows).
- **Voice assessment notes**: latency on the isolation probe is itself
  diagnostic (long pause → likely P1, searching for task meaning;
  instant-but-wrong → likely P2 or P3, a working mismatched model) —
  apply the D1 grid (`../foundations/02-adaptive-teaching-rules.md`)
  directly: fast+wrong here is the dangerous quadrant exactly as it is
  everywhere else.

## Recovery notes

Concept-specific application of `../foundations/01-recovery-engine.md`,
lesson-one-modified per `../first-lesson/05`:
- **"I don't know"** shrinks to echo, per the lesson-one delta — for
  this concept specifically, echo means the tutor produces the isolated
  sound once, clean, and the learner repeats exactly that sound (not the
  whole word) — "say it with me: /m/." This is the single most reliable
  recovery move at this node because it cannot fail: a learner can
  always echo a single clean phoneme they just heard.
- **Likeliest utterance at this node**: "I don't get what you mean by
  sound" (a verbal expression of P1) rather than a stated failure to
  perform — when this appears, treat it as P1's detection signal
  directly, not as a generic confusion state, and apply P1's recovery
  (remove the word "sound," demonstrate instead).
- **Non-verbal signal specific to this node**: a learner who repeats the
  WHOLE WORD back instead of attempting isolation (echoing "sun" when
  asked for the first sound of "sun") is showing non-verbal evidence of
  P1 or P2 without having said anything wrong — this should route to
  the same P1/P2 recovery, not be scored as a wrong answer.

## Memory & review

**Concept type**: fact/procedure hybrid — closer to a perceptual-motor
skill (like early pronunciation) than a factual claim, so it follows the
tool-skill automaticity-burst pattern (`../foundations/04 -universal-
teaching-principles.md` Principle 3's fluency-not-correctness standard
applies with unusual force here: a learner who can isolate a sound
slowly and effortfully is not yet done, because the skill needs to
become automatic before it can support blending and segmenting, which
assume instant sound-access). Interleaving partners: mix with syllable-
counting items specifically and often, since P2's confusion is the most
persistent risk and interleaving is the direct verification method for
whether it has genuinely resolved (`../misconceptions/02 §1`'s APPLY
step, run on a schedule rather than once).

## Transfer map

- **Near**: isolating a DIFFERENT starting sound on a new word; this is
  the immediate, expected generalization.
- **Far**: isolating a sound in the middle or end of a word (the
  intermediate-model upgrade, technically the neighboring concept
  `eng.phonics.blending-segmenting`'s territory but anchored here).
- **Cross-subject**: weak but real — general auditory discrimination
  (noticing that two things sound "the same" in a specific dimension)
  has a loose family resemblance to early music pitch-matching; not
  strong enough to design a lesson around, worth naming once if a
  learner shows strong musical background.
- **Real-world**: nursery rhymes and songs the learner already knows are
  the highest-value real-world transfer target — the shared-sound
  noticing this concept teaches is already latent in every rhyme they
  can already sing.
- **Expert-transfer**: eventual phonetic transcription
  (`eng.phonetics.speech-sounds-overview`, well beyond this node) and,
  much later, second-language phoneme acquisition — adults with strong
  phonemic awareness in their first language transfer the ATTENTION
  SKILL (not the specific sounds) when learning a new language's sound
  system.

## Curriculum feedback

None found — the KG node's `requires: []`, `unlocks`, difficulty, and
mastery threshold are all consistent with this concept's actual teaching
demands; the unusually high 0.85 threshold is well-justified (see
Assessment above), not a KG error. One coverage-roadmap note, not a
curriculum defect: `eng.phonics.print-concepts`, the KG's OTHER zero-
prerequisite entry node, remains the highest-priority concept still
without a `concepts/` entry per `COVERAGE.md`'s own expansion protocol —
recorded here, not authored, since one node's entry should not
substitute for auditing the other.
