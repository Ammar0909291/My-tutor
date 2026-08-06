# Simple Sentences — `eng.grammar.simple-sentences`

## Identity

- **Concept ID**: `eng.grammar.simple-sentences` (canonical English KG)
- **Curriculum location**: English / grammar / "Simple Sentences" —
  sentences consisting of exactly one independent clause, however long
  or short, and however many compound elements (subjects, verbs,
  objects) it contains.
- **Prerequisites**: `eng.grammar.clauses` — load-bearing because
  "simple sentence" is defined ENTIRELY in terms of clause count
  (exactly one independent clause, zero dependent clauses); a learner
  who cannot reliably identify and count subject-verb pairs has no way
  to apply this concept's classification test at all, only guesswork.
- **Unlocks** (from KG): `eng.grammar.compound-sentences`,
  `eng.grammar.sentence-fragments`, `eng.writing.sentence-writing`.
  Compound sentences are formally defined as the direct extension of
  this concept's classification test (two independent clauses joined,
  instead of one standing alone); sentence fragments are defined as the
  failure case of this concept's own "one complete independent clause"
  requirement; sentence-writing (a different domain within English)
  applies this concept's structural understanding to composition
  practice.
- **Difficulty**: developing · **Bloom**: apply · **Mastery threshold**:
  0.80 · **Est. hours**: 1

## Learning Objective

The learner can:
1. Correctly classify a sentence as simple by counting independent
   clauses (exactly one), regardless of the sentence's word length.
2. Recognize that a simple sentence can contain a compound subject,
   compound verb, or compound object while remaining ONE clause,
   because there is still only one subject-verb PAIRING relationship.
3. Apply the conjunction-function test to sentences containing "and,"
   "or," or "but" — checking for a complete subject-verb pair on BOTH
   sides before classifying as compound, rather than treating the
   conjunction's presence alone as decisive.
4. Construct original simple sentences to a specification, including
   long simple sentences with compound elements, and self-verify using
   the clause-counting test.
5. Classify a mixed batch of unlabeled sentences (long simple, short
   compound, compound-element simple, conjunction-containing simple) by
   clause count alone, not length or surface conjunction presence.

## Core Understanding

A simple sentence is defined by exactly ONE property: it contains
exactly one independent clause, and no dependent clauses — nothing else
about it matters for this classification. Length is a trap: a simple
sentence can be long and elaborately dressed up with compound subjects,
compound predicates, and modifying phrases ("The exhausted,
determined marathon runners from twelve different countries crossed the
finish line together and collapsed onto the grass in relief" — still
ONE subject-verb pairing, just with compound and modified parts), while
a compound sentence can be short and plain ("She left. He stayed." —
TWO separate subject-verb pairs). A second, equally load-bearing
insight concerns the word "and" (and its relatives "or," "but"): its
mere presence does NOT automatically make a sentence compound. "And"
has more than one job — it can join two WHOLE independent clauses
(making the sentence compound), but it can also just join two subjects,
two verbs, or two objects WITHIN a single clause (keeping the sentence
simple: "Maya and Diego ran" is one clause with a compound subject, not
two clauses). The reliable test is always to check both sides of the
conjunction for a COMPLETE, separate subject-verb pair — only then does
the conjunction signal a compound sentence.

## Mental Models

- **Beginner model — "simple sentences are short sentences, and any
  sentence with 'and' in it is compound"**: the arriving, pre-
  instructional model this concept exists to correct — a natural
  default because "simple" carries an everyday connotation of brevity
  and plainness, and because "and" is the most visible, commonly
  recognized signal of sentence-joining, making its mere presence feel
  like sufficient evidence.
- **Intermediate model — "I count independent clauses, not words, to
  classify a sentence as simple"**: installed by TA-1, using the
  Component 3 One-Engine Train anchor, resolving
  MC-SIMPLE-SENTENCE-MEANS-SHORT-SENTENCE. Upgrade trigger: correctly
  classifying a fresh long sentence as simple, or a fresh short
  sentence as compound, based purely on clause count.
- **Advanced model — "I recognize that a simple sentence can have
  compound subjects, verbs, or objects while remaining one clause"**:
  installed by TA-2, extending the classification test to sentences
  with genuinely multiple grammatical parts but only one subject-verb
  pairing relationship.
- **Expert model — "I apply the conjunction-function test, checking
  both sides for a complete subject-verb pair, and I construct and
  classify original sentences using this test"**: installed by TA-3 and
  TA-4, the concept's genuine mastery bar, resolving
  MC-A-SENTENCE-WITH-AND-IS-NEVER-SIMPLE by requiring the learner to
  actively check conjunction FUNCTION rather than relying on
  conjunction PRESENCE.
- **Do not upgrade early**: per the Blueprint's own Protocol Routing
  (S9), do not certify mastery unless the learner passes both MP-1
  (long-simple classification) and MP-2 (and-does-not-mean-compound)
  independently — a learner who only classifies short, conjunction-free
  sentences correctly has not yet demonstrated the actual discriminating
  skill this concept exists to build.

## Why Students Fail

Two independent failure mechanisms operate here, both explicitly
described by the Blueprint as shortcuts that avoid actually counting
subject-verb pairs. The length-means-simple failure exists because
"simple" carries a strong everyday connotation of brevity — extending
that everyday sense into the grammatical classification is a reasonable
default until a learner is directly shown a long sentence with only one
clause and asked to count subject-verb pairs rather than words. The
and-means-compound failure exists because "and" genuinely IS the most
visible, most commonly recognized signal for joining two things — over-
relying on its mere presence is a reasonable extension of real, partial
evidence (since "and" often DOES join two clauses), with nothing
marking the exception (and joining two subjects or two verbs within one
clause) until a learner is directly shown "Maya and Diego finished the
race and celebrated together" and asked to check both sides of each
"and" for a complete, separate subject-verb pair.

## Misconceptions

The existing Blueprint (`docs/curriculum/blueprints/
eng.grammar.simple-sentences.md`, Component 1) documents both
misconceptions this concept produces, with full trigger/probe/bridge/
replacement/discrimination content — reused by reference below, with
birth-type classification added
(`../../misconceptions/01-birth-taxonomy.md`).

**MC-SIMPLE-SENTENCE-MEANS-SHORT-SENTENCE (Blueprint Component 1) —
Type 3, language contamination**
- *Why (birth-type addition)*: Type 3, not Type 1 — this misconception
  is not an overextension of an English grammatical pattern, but a
  direct carryover of "simple" as an ordinary English WORD (meaning
  "plain," "uncomplicated," "brief") into a technical grammatical
  context where the term has a stricter, structural meaning defined
  purely by clause count; the everyday and technical senses of the same
  word genuinely diverge, mirroring the identical everyday-word-vs-
  technical-term pattern already identified for `eng.grammar.phrases`'s
  MC-A-PHRASE-IS-JUST-ANY-GROUP-OF-WORDS.
- *Full trigger/probe/bridge/replacement/discrimination content*: see
  Blueprint Component 1, verbatim — not restated here.
- *Characteristic phrase (addition)*: a learner who, when shown a long
  sentence, spontaneously starts counting subject-verb pairs rather
  than estimating length before classifying it is showing the count-
  the-engines discipline has been genuinely internalized.

**MC-A-SENTENCE-WITH-AND-IS-NEVER-SIMPLE (Blueprint Component 1) —
Type 1, overgeneralization**
- *Why (birth-type addition)*: exact Type 1 signature — "and" genuinely
  IS the most visible, most common signal for clause-joining, so
  treating its mere presence as decisive is a reasonable extension of
  real, frequently-correct partial evidence; the misconception survives
  because "and" joining two full clauses is a very common pattern,
  delaying the moment a compound-subject or compound-verb "and"
  directly contradicts the presence-alone rule.
- *Full trigger/probe/bridge/replacement/discrimination content*: see
  Blueprint Component 1, verbatim — not restated here.
- *Characteristic phrase (addition)*: a learner who, when shown a fresh
  "and"-containing sentence, spontaneously checks both sides for a
  complete subject-verb pair before classifying it, rather than
  reacting to the conjunction alone, is showing the conjunction-
  function test has generalized beyond the specific TA-3 practice
  items.

## Analogies

- **Best analogy — the One-Engine Train itself is the analogy, not a
  supplement to it** (Blueprint Component 3): a train with exactly one
  engine car — however long the line of freight cars it pulls — is
  still a one-engine train (a simple sentence with compound elements
  and modifiers), while a train with two coupled engine cars is a
  different kind of train (compound) even if short, directly embodying
  the "count the engines, not the length" principle as a concrete,
  physical, countable image. Breaking point: the train anchor
  demonstrates the length-independence insight well but doesn't on its
  own address the conjunction-function test (TA-3), which needs its own
  separate both-sides-of-the-conjunction demonstration.
- **Alternative — a single delivery truck with multiple packages vs.
  two separate delivery trucks**: one truck (one independent clause)
  can carry many packages (compound subjects, objects, modifiers) and
  still be one truck making one trip; two trucks (two independent
  clauses) are two separate trips even if each carries just one small
  package. Breaking point: useful for the one-unit-many-parts insight,
  but doesn't address the conjunction-function test specifically, which
  the train anchor's own TA-3 practice handles directly.
- **ANTI-ANALOGY — do NOT describe "and" as "usually meaning compound,
  with exceptions"**: this framing risks reinforcing
  MC-A-SENTENCE-WITH-AND-IS-NEVER-SIMPLE by implying conjunction-
  presence is still the primary signal and function-checking is merely
  a backup; instead, frame the conjunction-function test as the ONLY
  reliable rule from the start — "and" alone never determines sentence
  type, checking both sides always does.

## Demonstrations

- **Physical/visual (the One-Engine Train)**: the Blueprint's Component
  3 anchor — canonical, referenced not restated.
- **Home/no-equipment**: any long, elaborately-described real event the
  learner can narrate in one clause supplies real TA-1 material (with
  many modifying words but one subject-verb pairing); any two people or
  things doing the same action together supply real TA-2 compound-
  subject material ("Maya and Diego ran").
- **Interactive/learner-activity**: TA-4's original-sentence
  construction task (writing sentences to a specification and self-
  checking with the engine-counting test) is inherently hands-on
  generative practice, requiring active construction, not merely
  recognition of a stated fact.
- **Teacher-demo (the count-the-engines test)**: the tutor models the
  Blueprint's own conflict-evidence demonstration — presenting a long
  simple sentence and a short compound sentence side by side and asking
  the learner to count subject-verb pairs, not length, in each, making
  the length-independence insight directly audible and testable.
- **Prediction to elicit FIRST, every time**: before confirming a
  simple/compound classification or sentence-construction attempt
  (TA-1 through TA-4), ask the learner to state their own attempt
  before the tutor confirms — Universal Principle 3.

## Discovery Questions

**A brief, argued discovery step suits both misconceptions, though this
is a genuinely concise, one-hour concept per the KG's own estimate.**
The length-independence insight and the conjunction-function test are
both genuine, directly testable phenomena well-suited to guided
discovery: **need** (the learner, having secured TA-1's engine-counting
practice, is shown a long sentence and asked to classify it by their
old length-based instinct, discovering the answer feels wrong once
subject-verb pairs are actually counted); **playground/invention**
(TA-1's length-independence practice builds initial confidence with the
core clause-counting test before the compound-element and conjunction
complications are introduced); **collision** (the Blueprint's own long-
simple-vs-short-compound pair breaks the length-means-simple assumption;
the "Maya and Diego finished the race and celebrated together" probe
breaks the and-means-compound assumption); **formalization** (MP-5's
mixed-batch classification requiring articulation of both the length-
independence insight and the conjunction-function test); **compression**
(TA-4's fluent original-sentence construction, applying both insights
directly without each instance separately re-derived). The specific
terms "simple sentence," "compound subject/verb/object," and
"conjunction-function test" are convention-bound grammatical
terminology best introduced by direct instruction once the learner has
already felt the underlying distinctions through the train anchor and
TA-1–2.

## Teaching Sequence

TA-1 (length is not the test) is placed first as the concept's most
directly counter-misconception entry point, per the Blueprint's own
One-Engine Train anchor — establishing the core length-independence
insight immediately, since this is the concept's most foundational
correction. TA-2 (compound subjects, verbs, and objects within one
clause) follows, extending the classification test to sentences with
genuinely multiple grammatical parts but only one subject-verb pairing,
building the vocabulary needed for TA-3's conjunction analysis. TA-3
(the conjunction-function test) directly targets
MC-A-SENTENCE-WITH-AND-IS-NEVER-SIMPLE, addressing a SECOND,
independent dimension (conjunction function, not length) once the
compound-element insight from TA-2 is secure — a learner cannot check
"is there a complete subject-verb pair on both sides of 'and'" without
already understanding what a compound subject/verb looks like within
one clause. TA-4 (building and classifying original sentences) is
placed last as the concept's integration capstone, requiring the
learner to actively CONSTRUCT sentences to a specification and self-
verify, not merely classify pre-written examples. This entry does not
restate the Blueprint's own turn-by-turn session script (Component 7)
— see Blueprint References below.

## Tutor Actions

Dispatch order for this concept, from `../../teaching-actions/`:
1. **Demonstration** (`01-show-family.md #1`) — the One-Engine Train
   anchor for TA-1's length-independence insight.
2. **Guided Practice (contextual)** — TA-2's compound-subject/verb/
   object identification within single clauses.
3. **Guided discovery** (`04-test-thinking-family.md`,
   discovery-adjacent) — TA-3's conjunction-function test, eliciting
   the both-sides-check insight through the "Maya and Diego finished
   the race and celebrated together" vs. "Maya finished the race, and
   Diego celebrated" contrast rather than stating the rule first.
4. **Guided Practice (contextual)** — TA-4's original-sentence
   construction to a specification, the concept's integration
   capstone, given the Blueprint's own explicit framing of this task as
   generative, not merely recognition-based.

**What does NOT fit, and why**: Error Analysis
(`04-test-thinking-family.md #17`) is excluded before TA-1–3 are
secure, per this domain's standing stability-guard reasoning — planting
a deliberately misclassified sentence before the length-independence
and conjunction-function insights are established risks the learner
absorbing the flawed structure as plausible; TA-3's own contrastive
pair and MP-5's own mixed-batch task already supply the needed
challenge once the basic tests are secure. The Blueprint's own lower
session_cap (4 TAs, vs. the standard 5) is preserved here without
adding a fifth Tutor Action, consistent with this being a genuinely
concise, one-hour concept.

## Voice Teaching Notes

- **What to listen for**: whether the learner spontaneously counts
  subject-verb pairs rather than estimating length when classifying a
  fresh sentence, and whether the learner spontaneously checks both
  sides of a fresh "and"/"or"/"but" for a complete subject-verb pair
  before classifying — these are the primary diagnostic signals for
  whether TA-1 and TA-3's disciplines have genuinely generalized beyond
  the specific practice items.
- **Characteristic hesitations**: a brief pause before classifying a
  fresh conjunction-containing sentence, followed by a correct,
  function-based classification, suggests the learner is consciously
  checking both sides rather than reacting to the conjunction alone —
  a good sign. Instant, confident classification of any "and"-
  containing sentence as compound (without checking function) is the
  concerning pattern for MC-A-SENTENCE-WITH-AND-IS-NEVER-SIMPLE.
- **Native-intuition-gap stakes**: not specifically flagged for L1-
  transfer in this Blueprint — both misconceptions here stem from
  everyday-word-meaning carryover (Type 3) and reasonable surface-
  pattern overgeneralization (Type 1) rather than L1-specific
  structural transfer, so no S9-specific routing beyond standard
  practice depth is called for.
- **The load-bearing sentence**: "is there a complete subject-verb pair
  on both sides of that 'and'?" is this concept's load-bearing sentence
  for MC-A-SENTENCE-WITH-AND-IS-NEVER-SIMPLE, per
  `../../foundations/03-voice-first-learning-model.md §3` — asked
  whenever a fresh conjunction-containing sentence is introduced,
  making the both-sides check a routinely-invited response rather than
  an afterthought.

## Assessment Signals

- **Diagnostic (golden probe)**: the Blueprint's own conflict-evidence
  probes (Component 1) — the long-simple-vs-short-compound pair for
  MC-SIMPLE-SENTENCE-MEANS-SHORT-SENTENCE, and the "Maya and Diego
  finished the race and celebrated together" vs. "Maya finished the
  race, and Diego celebrated" contrast for
  MC-A-SENTENCE-WITH-AND-IS-NEVER-SIMPLE — each cleanly separates a
  learner still holding the misconception from one who has moved past
  it.
- **Guided practice → independent practice**: the Blueprint's WE-1 →
  WE-2 → WE-3 → MP-1 through MP-5 fading ladder is reused directly
  (Components 5–6) — not re-authored here.
- **Mastery gate set** (`../../assessment/05-mastery-verification.md
  §3`): long-simple-sentence recognition (MP-1, a strong diagnostic
  item for residual MC-SIMPLE-SENTENCE-MEANS-SHORT-SENTENCE);
  conjunction-function test application (MP-2, a strong diagnostic item
  for residual MC-A-SENTENCE-WITH-AND-IS-NEVER-SIMPLE); short-compound-
  sentence recognition (MP-3); original-sentence construction (MP-4, a
  generative task per the Blueprint's own V-14 requirement); mixed-
  batch classification (MP-5, requiring both insights applied
  simultaneously across 5 unlabeled sentences). Per the Blueprint's own
  Protocol Routing (S9), mastery must NOT be certified unless MP-1 and
  MP-2 both pass independently.
- **Interpretation of response pattern**: classifying a long sentence
  as compound based purely on length (MP-1) is the dangerous pattern
  for MC-SIMPLE-SENTENCE-MEANS-SHORT-SENTENCE, warranting a return to
  TA-1's engine-counting practice with progressively longer simple
  sentences. Classifying any "and"-containing sentence as compound
  without checking both sides (MP-2) is the dangerous pattern for
  MC-A-SENTENCE-WITH-AND-IS-NEVER-SIMPLE, warranting a return to TA-3's
  conjunction-function test with the length variable isolated out.
- **Transfer items**: near (classifying fresh sentences by clause count
  regardless of length, applying the conjunction-function test to fresh
  "and"/"or"/"but" sentences, constructing fresh original simple
  sentences to a specification); far (this concept's clause-counting
  framework transferring directly into
  `eng.grammar.compound-sentences`'s formal extension — explicitly
  reusing the "count the engines, not the words" framing per the
  Blueprint's own Adaptive Flags — and `eng.grammar.sentence-
  fragments`'s definition as the failure case of this concept's own
  "exactly one complete independent clause" requirement); real-world
  (constructing clear, well-formed sentences of varied length and
  complexity in the learner's own everyday writing, while correctly
  distinguishing them from compound sentences for comma-usage and
  sentence-combining purposes).

## Tutor Recovery Strategy

Concept-specific application of `../../foundations/01-recovery-engine.md`:
- **"I don't know"** on a simple/compound classification task shrinks
  to the Component 3 One-Engine Train anchor using the simplest, most
  familiar short-simple-sentence example available, with the tutor
  modeling the engine-counting process before the learner attempts a
  fresh long-simple or conjunction-containing sentence independently.
- **Likeliest utterance/behavior at this node**: for
  MC-SIMPLE-SENTENCE-MEANS-SHORT-SENTENCE, classifying a long sentence
  as compound purely by length is more likely than "I don't know" —
  route directly to the Blueprint's own conflict-evidence probe rather
  than treating it as a generic comprehension gap. For
  MC-A-SENTENCE-WITH-AND-IS-NEVER-SIMPLE, classifying any "and"-
  containing sentence as compound without checking function is more
  likely than confusion — route directly to TA-3's both-sides check.
- **Non-verbal signal specific to this node**: a learner who
  spontaneously self-corrects a length-based classification upon
  actually counting subject-verb pairs ("that's compound — wait, I
  only find one subject-verb pairing, so it's simple") before being
  told is showing the count-the-engines discipline has generalized —
  this should be named and praised explicitly, per the Blueprint's own
  regulation-tail guidance (the Session Architecture's protocol
  routing paragraph, which frames both misconceptions as shortcuts to
  be redirected to the engine-counting and conjunction-function tests
  rather than simply marked wrong).

## Memory Hooks

**Concept type**: procedural/framework — a single-property
classification test (exactly one independent clause) combined with a
compound-element awareness and a conjunction-function discrimination
rule, applied to genuinely novel sentences of varying length; mastery
is demonstrated by correctly classifying fresh sentences regardless of
length or conjunction presence (MP-1 through MP-3, MP-5) and by
actively constructing fresh original sentences to specification (MP-4)
rather than by recognizing a fixed, previously-taught example list.
Interleaving partners: mix long-simple items (testing TA-1) with
compound-element items (testing TA-2) and conjunction-containing items
(testing TA-3) in ongoing review, isolating the length variable and the
conjunction-presence variable separately before combining them in
MP-5-style mixed batches, per the Blueprint's own Adaptive Flags.

## Transfer Connections

- **Near**: classifying fresh sentences by clause count regardless of
  length; applying the conjunction-function test to fresh "and"/"or"/
  "but" sentences; constructing fresh original simple sentences to a
  specification.
- **Far**: this concept's clause-counting framework and its explicit
  "count the engines, not the words" reasoning are the direct
  foundation for `eng.grammar.compound-sentences` — the Blueprint's own
  Adaptive Flags mandate reusing this exact framing when that concept
  is introduced, since its core distinction (one clause vs. two joined
  clauses) is a direct extension of this concept's test; this concept
  also defines `eng.grammar.sentence-fragments` by contrast, as the
  failure case of the "exactly one COMPLETE independent clause"
  requirement; and it supplies the structural foundation
  `eng.writing.sentence-writing` (a different domain within English)
  applies to composition practice.
- **Real-world**: every sentence the learner writes — long or short,
  plain or elaborately modified — depends on correctly understanding
  whether it forms one complete clause or requires combination/
  punctuation rules for multiple clauses.
- **Expert-transfer**: varied, sophisticated sentence construction at
  any advanced level depends on the ability to deliberately choose
  between long simple sentences (for controlled, unified emphasis) and
  compound or complex sentences (for combined ideas) — a rhetorical
  choice that presupposes the learner can reliably tell the two apart
  by structure, not surface length or conjunction presence.

## Cross-Subject Connections

The KG's `unlocks` field lists one entry outside the `eng.grammar`
domain: `eng.writing.sentence-writing` (within English, a different
domain — writing — not a genuinely cross-subject connection into
another platform subject). This concept's clause-counting classification
test is the direct structural foundation that writing concept applies
to composition practice — this entry notes the connection but does not
restate or anticipate that concept's own content, which remains its own
authoring responsibility when reached in topological order. No
genuinely cross-subject connection into another platform subject (math,
physics, chemistry, biology, computer science) is warranted at this
level. The KG's `cross_links` field is empty for this concept (the
source Blueprint's own YAML header lists its three `unlocks` targets
under `cross_links` as well, but the live KG's `cross_links` field for
this concept is empty — this entry follows the KG as authoritative per
the standing rule, treating those three as `unlocks` relationships
only).

## Blueprint References

A Blueprint exists: `docs/curriculum/blueprints/
eng.grammar.simple-sentences.md`. This entry reuses, by reference and
without restating: Component 1's full misconception trigger/probe/
bridge/replacement/discrimination text (both misconceptions), Component
3's One-Engine Train anchor, Components 5–6's worked examples and
mastery probe set (WE-1–3, MP-1–5), and Component 7's full session
architecture and protocol routing paragraph. This entry's own
contribution is the HOW-to-teach reasoning layer: mental model
progression across four stages, the failure-mechanism analysis in "Why
Students Fail" (identifying the length-means-simple failure as Type 3
language contamination from "simple" carrying a strong everyday
brevity connotation — the same everyday-word-vs-technical-term pattern
already identified for `eng.grammar.phrases` — and the and-means-
compound failure as Type 1 overgeneralization from "and"'s genuine,
frequent role in joining independent clauses), birth-type
classification, an explicit argued case for guided discovery on both
misconception-correcting insights with terminology introduced only
after the underlying distinctions are felt, and the teaching-sequence
reasoning explaining why the length-independence insight (TA-1) and the
compound-element vocabulary (TA-2) must be secure before the
conjunction-function test (TA-3) is introduced, converging in TA-4's
generative construction capstone.

## Runtime Asset References

No seeded `AssetIdentity` records exist for this concept in
`src/lib/teaching/assets/authoredSeedAssets.ts`,
`src/lib/teaching/assets/brainSeedAssets.ts`, or any other seed source
file in this repository, and this entry does not create, seed, or
propose any as part of its authoring.

## Curriculum Feedback

None found — the KG node's prerequisite (`eng.grammar.clauses`) and
`unlocks` (`eng.grammar.compound-sentences`,
`eng.grammar.sentence-fragments`, `eng.writing.sentence-writing`) are
consistent with this concept's actual teaching demands, and the reduced
`estimated_hours: 1` (matching `eng.grammar.comparatives-and-
superlatives`'s equally concise scope) appropriately reflects that this
concept applies a single, already-secured clause-counting test to a new
classification category, rather than introducing an entirely new
grammatical structure. One minor discrepancy noted for completeness,
not fixed (no Blueprint file modified): the source Blueprint's own
YAML header lists its three `unlocks` targets a second time under
`cross_links`, while the live KG's `cross_links` field for this concept
is empty — this entry follows the KG as authoritative per the standing
rule (see Cross-Subject Connections above).

## Version History

- 2026-08-06 — Initial authoring (English Educational Brain completion
  program, batch 32, concept 1 of N). All 21 Standard sections authored
  fresh against the live KG and existing Blueprint; no prior version
  existed.
