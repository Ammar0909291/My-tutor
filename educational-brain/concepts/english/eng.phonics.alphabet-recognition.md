# Alphabet Recognition — `eng.phonics.alphabet-recognition`

## Identity

- **KG ID**: `eng.phonics.alphabet-recognition`
- **Name**: Alphabet Recognition
- **Domain**: English / Phonics
- **Difficulty**: foundational
- **Bloom level**: remember
- **Mastery threshold**: 0.90
- **Estimated hours**: 2
- **Requires**: `eng.phonics.print-concepts` — load-bearing part: the learner must already treat print as *marks that carry meaning, read in a direction*. Without that, letters are decoration and there is nothing for a name to attach to.
- **Unlocks**: `eng.phonics.letter-sound-correspondence`, `eng.writing.handwriting-and-formation`
- **Cross-links**: (none in the KG)
- **Blueprint**: `docs/curriculum/blueprints/eng.phonics.alphabet-recognition.md`

## Learning Objective

The learner can:
1. Name each of the 26 uppercase letters, presented in randomised order, without reciting the alphabet from A.
2. Name each of the 26 lowercase letters under the same conditions.
3. Match any uppercase letter to its lowercase partner and say aloud that they are one letter.
4. Discriminate the mirror pairs b/d and p/q reliably, using a self-check strategy when unsure.
5. State what comes immediately before and after a given letter without reciting from the start.

## Core Understanding

A letter is an **abstract identity with multiple visual instantiations**. "A", "a", a handwritten *a*, a serif *a*, and a child's wobbly *a* are all the same object — not because they look alike (A and a share almost no visual features) but because English typography assigns them one name and one slot in an ordered sequence. This is the concept's real content and its real difficulty: it is a **categorisation** task masquerading as a memorisation task. Two structural facts follow. First, uppercase/lowercase pairing is *arbitrary* for about a third of the alphabet (A/a, G/g, R/r, Q/q share no form) and *predictable* for the rest (C/c, S/s, O/o) — so it cannot be learned by one rule and must be learned as pairs. Second, the Latin alphabet contains genuine mirror-image pairs (b/d, p/q) and near-rotations (n/u, m/w), which means letter identity depends on **orientation**, unlike every other object the learner has ever categorised: a chair rotated is still a chair, a *b* rotated is a different letter. Alphabetic *order* is a third, separable fact — a memorised sequence with no internal logic, useful for lookup and nothing else.

## Mental Models

**Beginner — "the alphabet is a song."**
The runnable simulation: to identify a letter, start singing from A and count along until you arrive. This is what nearly every learner arrives with and it is not wrong so much as *unusable* — it produces correct answers at unusable latency, and it collapses entirely when letters appear out of order (i.e. in every word ever written).
*Upgrade trigger*: a letter presented in isolation, out of sequence, under mild time pressure.
*Shelf-life warning at installation*: "The song is a great way to remember the order. It's a slow way to name one letter — we're going to get faster than the song."

**Intermediate — "each letter is a shape with a name."**
The simulation: look at the shape, retrieve the name directly. Fast, and correct for most letters. It fails precisely on the mirror pairs, because "shape" as the learner encodes it does not include orientation.
*Upgrade trigger*: the first confident b/d reversal.
*Shelf-life warning*: "Shape is nearly enough. For a few letters you also have to check which way round it is."

**Advanced — "a letter is one identity with several costumes, and orientation is part of the shape."**
The simulation: the learner sees *A* and *a* as one thing, checks direction on the mirror pairs without being told to, and recognises unfamiliar fonts and handwriting as the same letters.
*Upgrade trigger*: reading real text in a font or hand they have not seen.
*Shelf-life warning*: none needed — this model is durable and correct.

**Expert — "letters are graphemes: functional units in a writing system."**
The learner understands that letters exist to encode sounds, that some letters work in teams (*sh*, *ea*), and that a letter's identity is defined by its role, not its shape. This is properly the territory of `eng.phonics.letter-sound-correspondence` and `eng.phonics.digraphs`; it is named here only so the tutor knows where the arc is going and does not stall at the intermediate model.

## Why Students Fail

Three distinct mechanisms, which need distinct responses and are routinely conflated:

**Sequence-substituting-for-recognition.** The learner appears to know the alphabet and cannot name a single letter out of order. Nothing is wrong with their memory; they have learned a *sequence* and been assessed on the sequence, so recognition was never built. This is the most common false positive in early literacy and it is an assessment-design failure, not a learner failure.

**Case as separate identity.** Because A/a look genuinely unrelated, the learner reasonably concludes they are different letters — a correct inference from the visual evidence available. It is only wrong because the writing system is arbitrary here.

**Orientation-blindness on mirror pairs.** This one is *developmentally normal and near-universal*, and it has a real cause: every prior categorisation the learner has ever performed has been orientation-invariant. A cup on its side is a cup. Nothing in four years of life has prepared them for a system where left-facing and right-facing are different objects. Treating b/d reversals as a warning sign rather than an expected stage is one of the most damaging things a tutor can do at this concept.

## Misconceptions

The Blueprint's **Component 1 — Misconception Register** owns the trigger signals, conflict evidence, bridge/replacement text, and discrimination pairs for both entries below. Reused by reference; birth-type classification and teaching consequence added here.

### MC-CASE-ARE-DIFFERENT-LETTERS
*(Blueprint Component 1, MC-CASE-ARE-DIFFERENT-LETTERS.)*
- **Birth type**: Type 2 (perceptual intuition). The learner is reading the visual evidence correctly — *A* and *a* really do not resemble each other — and drawing the reasonable conclusion. This is not a reasoning error; it is a correct inference from a system that happens to be arbitrary.
- **Teaching consequence of the birth type**: never frame this as a mistake. A Type-2 misconception born of accurate perception is repaired by **supplying the missing information** (that the pairing is a convention, not a resemblance), not by collision. The learner should hear "you're right that they look different — that's the strange part, they're the same letter anyway." Collision-style correction here teaches the learner that their own eyes are unreliable, which is expensive and untrue.
- **Verification of death**: matches a *novel* pair the learner has not drilled (e.g. shown *Q* and *q* for the first time in an unfamiliar font) and treats them as one letter. Drilled pairs prove memorisation, not the concept.

### MC-SHAPE-CONFUSION-MIRROR-LETTERS
*(Blueprint Component 1, MC-SHAPE-CONFUSION-MIRROR-LETTERS.)*
- **Birth type**: Type 1 (overgeneralization) — of orientation-invariance, generalised from every physical object the learner has ever named. Notably it is generalised from *true and useful* prior knowledge, which is why it is so robust.
- **Teaching consequence**: because the source generalisation is correct everywhere else, the repair cannot be "stop generalising." It must be **scoped**: orientation matters *inside writing* and nowhere else. The Blueprint's hand-shape check is the right instrument precisely because it is a physical, external referent — it gives the learner something to check *against* rather than a rule to remember.
- **Critical sequencing constraint**: the Blueprint's Component 4 TA-4 states it and it is worth flagging as load-bearing — never introduce both members of a mirror pair for the first time in the same session. Simultaneous first exposure is the single most reliable way to *create* this misconception rather than repair it.
- **Verification of death**: correct discrimination under mild speed pressure, in running text rather than isolation, sustained across a session gap. Isolated slow correctness does not count; the learner is running the hand check consciously and will revert when reading.

## Analogies

**Best — the same person in different clothes.** *A* in a suit and *a* in pyjamas. Same person, same name, you greet them the same way. The learner already has fluent, effortless machinery for recognising a person across radical appearance changes; this analogy borrows it wholesale.
*Breaking point*: clothes are chosen and changeable; letter case is governed by rules (sentence starts, proper nouns). Do not let the learner conclude case is free choice — that belongs to `eng.grammar.capitalization` and this analogy will need a caveat there.

**Alternative — the left and right shoe.** For mirror pairs specifically. Shoes are the one object in a child's life where mirror-image *does* matter and where getting it backwards is immediately, physically obvious. It is the only pre-existing orientation-sensitive category most learners have.
*Breaking point*: shoes come in pairs that belong together; b and d are unrelated letters that merely happen to look mirrored. Don't extend to "b and d are partners."

**Story analogy — the theatre programme.** Every letter is an actor with a stage name (its letter name), and the programme lists them in a fixed order. The order is just how the programme is printed; it tells you nothing about the actors. This separates *identity* from *sequence*, which is the split this concept most needs and most rarely gets.
*Breaking point*: none serious at this level.

**Visual analogy — the hand-shape check** (Blueprint Component 1). Left fist, thumb up, forms *b*; right fist forms *d*. Not a metaphor — a portable physical instrument the learner carries with them.

### ANTI-ANALOGIES (do not use)

- **"Uppercase is the grown-up letter and lowercase is the baby letter."** Installs a hierarchy and implies developmental replacement — the learner infers they will stop using lowercase, or that uppercase is more correct. It also actively obstructs the "one identity, two costumes" model by making them two *different-status* things.
- **"b has a big belly, d has a... "** — belly/bat mnemonics for the mirror pairs. These are extremely common and they fail because they are themselves left-right dependent: the learner must already know which side is which to apply them, which is precisely the thing they cannot do. The hand-shape check works because the hands are physically distinguishable without any prior orientation knowledge.
- **"The alphabet has 26 letters and 26 sounds."** Directly installs `eng.phonetics.speech-sounds-overview`'s MC-SOUNDS-EQUAL-LETTERS, one concept before that entry has a chance to prevent it. Never state a letter/sound count correspondence at this concept.

## Demonstrations

Elicit the prediction first in each case.

1. **The out-of-order challenge (learner activity).** *Predict first*: "Do you know all your letters?" (Answer will be yes.) Then present five letters in randomised order. The gap between the confident yes and the actual performance is the entire diagnostic value — and it must be framed as *interesting*, never as a gotcha.
2. **Case pairing (learner activity).** The Blueprint's Component 3 letter-hunt anchor — full script there. *Predict first*: "Which little letter do you think goes with this big one?" for a non-obvious pair (G/g) before revealing.
3. **Font surprise (teacher demo).** Show the same letter in four wildly different fonts and a handwritten form. *Predict first*: "How many different letters am I showing you?" Learners at the beginner model often answer four or five. This demonstration is the cleanest available evidence that letters are identities rather than shapes.
4. **The rotation test (learner activity, mirror pairs only).** *Predict first*: "If I turn this *b* around, what will it be?" Physically rotate a cut-out. The learner watches a *b* become a *d* — the fact that letters are the only things in the world that do this is the point, and it should be named as strange, not as a rule.

## Discovery Questions

**Direct instruction wins here, and the reason is specific: letter names and their pairings are pure convention, containing no discoverable structure.** There is nothing for the learner to invent. Asking "why do you think this letter is called *em*?" wastes attention and, worse, implies there is a reason — which sets the learner hunting for a pattern that does not exist and undermines their trust in patterns where they *do* exist (letter-*sound* mapping, next concept).

Discovery does have a genuine role at exactly two points, and it should be used at both:

- **Discovering the pairing problem, not the pairings.** "Here are all the big letters and all the little letters, mixed up. Can you sort out which goes with which?" The learner discovers *that* some pairs are obvious (C/c) and some are not (G/g, R/r) — a real, true, discoverable structural fact that makes the arbitrary ones feel like a known challenge rather than a personal failure.
- **Discovering orientation-sensitivity.** The rotation test above. The learner genuinely discovers that writing behaves unlike every other object category. That discovery is worth having; the names *b* and *d* are not.

Everything else at this concept: tell them, then practise.

## Teaching Sequence

The pedagogical logic behind the ordering:

- **Recognition before sequence, always.** The near-universal instructional default is the reverse (song first), and it is the direct cause of the sequence-substituting-for-recognition failure. Alphabetic order is a lookup tool; it is not a prerequisite for reading and should not gate it.
- **Uppercase before lowercase**, but only as an *entry point*, not a completion gate. Uppercase forms are visually more distinct and contain only one true mirror hazard, so early success is cheaper. But lowercase is what text is actually made of — do not let uppercase fluency be mistaken for the objective.
- **Case matching only after both cases are independently secure.** Matching is a two-source retrieval task; running it while either case is still effortful produces failure attributable to load rather than to the pairing.
- **Mirror pairs are staggered, deliberately and by a real interval.** Teach *b* to security, insert unrelated letters, then teach *d*, then contrast. This is the single highest-leverage sequencing decision at this concept and the most commonly violated.
- **Sequence recall goes last**, when it can be attached to already-solid identities instead of substituting for them.

Turn-by-turn scripting, protocol tags, and adaptive flags: Blueprint **Component 7 — Session Architecture** and **Component 8 — Adaptive Flags**.

## Tutor Actions

From `../teaching-actions/`, in recommended order:

1. **Matching** (DO) — the core action for this concept, and the bidirectional diagnostic matters: uppercase→lowercase succeeding while lowercase→uppercase fails is a real, common asymmetry and it names exactly what to drill next.
2. **Retrieval-Schedule Prompt** (TEST-THINKING) — this is a high-volume, low-depth recognition target, which is the ideal profile for spaced retrieval. It should open most sessions during the acquisition period.
3. **Demonstration** (SHOW) — the rotation test and the font surprise, both learner-performed where possible.
4. **Game** (DO) — one of the few concepts where a game is genuinely appropriate: the target *is* speed of recognition, so a game's speed pressure is measuring the actual objective rather than skinning it. The chocolate-covered-broccoli guard still applies — re-verify recognition outside the game before certifying.
5. **Drawing** (DO) — tracing letter forms, but *only* as recognition support. Formation proper is `eng.writing.handwriting-and-formation`'s territory and must not be smuggled in here; a learner blocked on motor control will fail a recognition task for entirely unrelated reasons.

**Does not fit**: **Worked Example** and **Thought Experiment** — there is no procedure and no reasoning chain. **Analogy** as a primary action — the analogies above are framing devices, not teaching vehicles; the letters have to be seen and named.

## Voice Teaching Notes

This concept's core evidence is **visual and pointing-based**, not audio — the learner's *response* is spoken, but the thing being assessed is a visual discrimination. Voice is the reporting channel, not the evidence. (Channel reality: `../foundations/03-voice-first-learning-model.md §7`.)

What the ideal tutor perceives:

- **The alphabet-song tell.** A pause of a second or more, sometimes with sub-vocal muttering, before naming an out-of-order letter. The answer arrives *correct*, which is why this is so easily missed — it is a latency signal exclusively, and it means recognition has not been built. Track latency here or you will certify a learner who cannot read.
- **Sound-instead-of-name.** Asked to name *m*, the learner says /m/. This is not an error and should not be corrected — it is often a sign the learner is *ahead*, having already absorbed letter-sound links. Accept it, note it, and ask for the name separately.
- **Self-correction on mirror pairs** ("d — no, b"). This is the single most positive signal at this concept. It means the learner has an active checking strategy running, which is exactly the intermediate→advanced transition. Praise the *checking*, explicitly and by name, not the final answer.
- **Falling-away confidence across a run.** Naming letters gets slower and quieter as a set proceeds — this is fatigue in a high-frequency retrieval task, not deterioration in knowledge. Stop the run; do not interpret it as a knowledge signal.

**Load-bearing sentence, delivered slowly**: *"Big B and little b are the same letter wearing different clothes."*

## Assessment Signals

Item bank: Blueprint **Component 6 — Mastery Probe Set** (MP-1…MP-5). Response-pattern reads, which the Blueprint does not own:

- **Randomised naming (MP-1/MP-2).**
  - *Fast-correct* → genuine recognition. This is the target state.
  - *Slow-correct* → the alphabet song is running. **Not mastery**, despite a perfect accuracy score. This is the most important read at this concept, because accuracy-only scoring reports it as success. A learner in this state cannot read; they can recite.
  - *Fast-wrong* → almost always a mirror pair or a case-pair confusion; check which before responding, they need different repairs.
  - *Slow-wrong* → genuine non-acquisition of that specific letter. Unremarkable, expected mid-acquisition, and the cheapest thing on this list to fix.
- **Case matching (MP-3).** A learner who matches the transparent pairs (C/c, S/s, O/o) and fails the opaque ones (A/a, G/g, R/r, Q/q) does not have MC-CASE-ARE-DIFFERENT-LETTERS — they have the concept and an incomplete pair inventory. Different problem, much smaller.
- **Mirror discrimination (MP-4).** Read *latency and self-correction*, not just correctness. Correct-with-visible-hand-check is a strictly different state from correct-immediately, and only the second is mastery.
- **Sequence (MP-5).** Deliberately assessed last and weighted least. A learner who nails recognition and cannot say what follows M is fine and ready to move on.

**Mastery certification trigger**: all 26 letters in both cases named correctly at low latency in randomised order across two separate sessions (the session gap is required — same-session fluency can be warm-up carryover), plus mirror-pair discrimination in running text without a visible hand check. The 0.90 KG threshold is appropriately high; this is a recognition floor for everything downstream, and a 10% letter gap becomes a 10% failure rate on every word ever decoded.

## Tutor Recovery Strategy

Generic engine: `../foundations/01-recovery-engine.md`. Concept-specific only:

- **"I already know my letters"** — delivered defensively, usually by an older learner or one who has been drilled. Take it at face value and *agree*: they very likely do know the sequence. Reframe rather than test: "Let's find out how fast." Turning it into a speed challenge preserves face and produces the diagnostic anyway.
- **"I keep getting it wrong"** — appears almost exclusively at the mirror pairs, and it is the highest-risk utterance at this concept because b/d reversals are frequently pathologised at home or school before the learner arrives. The response has a required factual component: *"Almost every single person mixes up b and d. It's the most normal thing in reading."* This is true, it is load-bearing, and withholding it in favour of generic encouragement wastes the one thing that actually helps.
- **The smaller question to shrink to**: from naming a randomised letter, down to *"is this the same letter as this one?"* with two identical letters side by side. Pure matching, no retrieval, no naming. It is essentially unfailable and it re-establishes that the learner can do the visual task, which is what has usually collapsed.
- **Never shrink to reciting the alphabet.** It feels like an easy win and it is the one move that reinforces the failing model. Shrink to matching instead.

## Memory Hooks

- **Concept type**: fact (26 × 2 arbitrary paired associations) plus one embedded discrimination skill (the mirror pairs). The two halves need genuinely different review regimes and should not be scheduled as one thing.
- **Review form — the facts**: high-frequency, low-duration spaced retrieval. Recognition is a paired-associate task with no internal structure to reason from, so there is nothing to reconstruct — retrieval frequency is the only lever. Short daily bursts beat long weekly sessions decisively here.
- **Review form — the mirror discrimination**: this is a *tool skill* and needs **automaticity bursts**, not accuracy checks. Speeded discrimination under mild pressure, because the failure mode is not "doesn't know" but "doesn't check in time while reading."
- **Concept-specific deviation**: letters that appear rarely in early text (*q*, *x*, *z*, *j*) decay much faster than their frequency-matched peers and need their own review tail. Do not treat the 26 as a homogeneous set with one decay curve.
- **Interleaving partners**: mirror pairs must be interleaved *with each other* once both are secure — that is the entire discrimination target, and blocked practice on b alone will produce b-fluency with no discrimination. Also interleave uppercase and lowercase presentation once each is independently solid. Do **not** interleave with `eng.phonics.letter-sound-correspondence` during acquisition: running name-retrieval and sound-retrieval on the same stimulus concurrently produces interference at exactly the wrong moment.

## Transfer Connections

- **Near**: `eng.phonics.letter-sound-correspondence` — the direct unlock. Recognition is the addressing system; sound-correspondence writes values into it. A shaky address makes the value unreachable, which is why the 0.90 threshold matters.
- **Near**: `eng.writing.handwriting-and-formation` — the other direct unlock, and the relationship is bidirectional in practice: forming a letter reinforces recognising it, and the motor trace is genuinely one of the more effective repairs for the mirror pairs.
- **Far**: `eng.phonics.sight-words` — whole-word recognition is built out of letter-identity as its parts, and a learner with weak letter identity memorises word *silhouettes* instead, which fails the moment two words have similar shapes.
- **Real-world**: alphabetical lookup — dictionaries, indexes, contact lists, filing. This is where the sequence half of the concept earns its keep, and it is worth naming so the learner knows what the song is *for*.
- **Expert transfer**: the deep skill is *categorising by convention rather than resemblance* — recognising that a system's groupings can be arbitrary and must be learned rather than derived. That transfers to every symbolic system the learner will meet: musical notation, chemical symbols, mathematical operators.

## Cross-Subject Connections

KG records no `cross_links`. Genuine connections:

- **Mathematics — symbol recognition.** Digits are the same kind of object as letters: arbitrary shapes with conventional names and one genuine mirror hazard (6/9, and 2/5 in some hands). A learner working through mirror-pair discrimination here is building the machinery that digit reversal needs. This is a real transfer and the KG encodes no edge. **Recorded as Curriculum Feedback.**
- **Mathematics — ordering.** Alphabetical order is an early, concrete instance of a total order on a set, and it is very often a learner's *first* one. Weak but genuinely real; worth naming only if the learner is also working in `math.found`.
- **Art / visual discrimination** — orientation-sensitive shape discrimination is a visual-processing skill, not a language skill. Honest but thin; no teaching action follows from it.

## Blueprint References

Blueprint exists: `docs/curriculum/blueprints/eng.phonics.alphabet-recognition.md`. Reused by reference, **not restated**:

- **Component 1 — Misconception Register**: both misconceptions' trigger signals, conflict evidence, bridge/replacement text, discrimination pairs, and the hand-shape check. This entry adds birth typing and the consequences that follow.
- **Component 2 — Prerequisite Diagnostic Block**: PD-1 print-concept readiness check and its fail-route.
- **Component 3 — Concrete Anchor**: the letter-hunt anchor script.
- **Component 4 — Conceptual Development Sequence**: TA-1…TA-5, including the mirror-pair staggering constraint (flagged as load-bearing above, not re-derived).
- **Component 5 — Worked Examples**: WE-1…WE-3.
- **Component 6 — Mastery Probe Set**: MP-1…MP-5.
- **Components 7–8**: session architecture and adaptive flags.

## Runtime Asset References

No seeded `AssetIdentity` records exist for this concept as of 2026-08-03. English has no `HUMAN_CURATOR` authored-seed rows in production (see CLAUDE.md, AssetIdentity Global Audit — English's rows are `AI_AUTHORED` live-capture only). No assets created as part of this entry.

## Curriculum Feedback

- **Missing cross-link (mathematics — symbol/digit recognition).** Digit recognition and letter recognition share the arbitrary-shape-to-name mapping *and* the mirror-hazard problem (6/9). No KG edge exists. Recorded, not fixed.
- **Bloom level `remember` under-describes this node.** Case-pairing is a categorisation judgement and mirror-pair discrimination is a perceptual discrimination skill — both are `understand`/`apply` work wearing a `remember` label. The consequence is real, not cosmetic: a `remember`-labelled node invites recall-style assessment, which is exactly the assessment design that produces the sequence-substituting-for-recognition false positive documented above. Recorded for the Curriculum Production Pipeline.
- **Estimated hours (2) is optimistic** for a genuine beginner reaching a 0.90 threshold across 52 forms plus mirror discrimination. It is realistic for a partial learner consolidating. Not a defect — worth noting that this node's true duration is bimodal by learner history, which the single estimate cannot express.

## Version History

- v1.0 (2026-08-03): Initial entry. Blueprint reused by reference (Components 1–8). 2 misconceptions classified by birth type. 1 missing cross-link and 1 Bloom-level observation recorded as Curriculum Feedback.
