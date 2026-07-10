# Fractions — `math.arith.fractions`

## Identity

- **Concept ID**: `math.arith.fractions` (canonical mathematics KG)
- **Curriculum location**: mathematics / arithmetic / "Fractions" (aliases:
  common fractions, p/q, proper and improper fractions)
- **Prerequisites** (from KG `requires`, with the load-bearing part):
  - `math.arith.division` — the load-bearing part is division-as-sharing
    (partitive division: 12 shared among 4), NOT the long-division algorithm.
    A learner fluent in the algorithm but weak on sharing-meaning will fail
    here anyway; probe the meaning, not the procedure.
  - `math.found.rational-numbers` — only the *idea* that numbers can name
    quantities between whole numbers. Full rational-number formality is not
    needed and teaching it first inverts the natural order (children
    fair-share before they axiomatize).
- **Unlocks** (from KG): `math.arith.decimals`, `math.arith.percentages`,
  `math.arith.ratios` — plus six child concepts (equivalence, simplification,
  addition, multiplication, mixed numbers, improper fractions). This node is
  a **cut-node**: essentially all later proportional reasoning stands on it.
  Teaching it badly is the single largest documented source of secondary-school
  mathematics failure.
- **Difficulty**: developing · **Bloom**: understand · **Mastery threshold**:
  KG-authored · **Est. hours**: ~4
- **Learning objectives** — the learner can:
  1. State what the bottom number counts and what the top number counts, in
     their own words, for any fraction shown.
  2. Place 1/2, 1/3, 1/4, 3/4, 5/4 correctly on a number line 0–2.
  3. Compare two unit fractions (which of 1/3, 1/4 is larger) and *explain
     why* at mechanism level (rubric ≥3).
  4. Produce a fraction for a fair-share situation they haven't seen
     ("5 pancakes, 4 people").
  5. Accept and explain a fraction greater than 1.

## Mental models

- **Beginner model — "pieces of one thing"**: a fraction is a number of
  pieces cut from one whole (pizza model). Runnable, correct for proper
  fractions of one object. *Shelf-life warning to deliver at installation*:
  "this picture will need to grow — one day fractions will be bigger than
  the pizza, and that's a promotion, not a problem."
- **Intermediate model — "a point on the number line"**: a fraction is a
  NUMBER with a place, between (or beyond) the whole numbers. 5/4 stops
  being paradoxical. Upgrade trigger: the first improper fraction, or the
  first "which is bigger" comparison the pizza can't settle cleanly.
- **Advanced model — "division waiting to happen / an operator"**: a/b IS
  a÷b, and also a thing you can do to other quantities (3/4 *of* 20). The
  two meanings (number and operator) are consciously held together.
- **Expert model — "equivalence class"**: 1/2 = 2/4 = 3/6 are the same
  number wearing different clothes; a fraction is the whole family, and
  choosing a representative is a tactical choice (common denominators are
  just choosing convenient clothes). Boundary knowledge: knows why division
  by zero is excluded, and why "fraction" and "rational number" aren't
  quite synonyms.
- **Do not upgrade early**: the pieces model is the correct FIRST model —
  number-line-first instruction fails young learners (nothing to run the
  simulation on). Upgrade on the first failure the pizza can't handle,
  which arrives naturally within the first few lessons.

## Why beginners fail here

Fractions are the first numbers that break every rule whole numbers taught.
The learner arrives with hard-won whole-number instincts — bigger digits mean
bigger numbers, multiplication makes bigger, between 3 and 4 there is nothing
— and fractions violate all three at once. Most fraction failure is not
failure to learn fractions; it is **whole-number knowledge defending itself**
(misconception birth type 1: correct inductions from the old domain). The
teaching consequence: fraction instruction must *explicitly* mark which
whole-number rules survive and which retire, or the learner will discover the
breakages alone and conclude that mathematics has become arbitrary.

## Misconception library

**M1 — "Bigger denominator = bigger fraction" (1/8 > 1/3)**
- *Why*: whole-number ordering transferred (8 > 3). Birth type 1.
- *Symptom / phrase*: "an eighth is more, eight is bigger."
- *Detection probe (verbatim)*: "Would you rather have 1/3 of this chocolate
  bar or 1/8 of it? Why?" — fast-wrong answer with the phrase above = M1.
- *Recovery*: physical collision — cut a real (or drawn) bar both ways, let
  them CHOOSE the piece. Then the mechanism sentence: "more pieces means
  each piece is smaller — the bottom number tells you how small the pieces
  are." Then the contrast step: "why did 1/8 *feel* bigger?" (they must say:
  because 8 is bigger — naming the old rule and its retirement).
- *Verification*: comparison items with unlike denominators, delayed +
  speeded (the old rule rebids under time pressure); the tier-2 item "1/8 is
  smaller than 1/3 because ___".

**M2 — "Top and bottom are two separate numbers" (adds across:
1/2 + 1/3 = 2/5)**
- *Why*: notation-induced (birth type 4) — the fraction bar reads as "two
  numbers stacked" not "one number."
- *Symptom / phrase*: "you just add the tops and add the bottoms."
- *Detection probe*: "1/2 + 1/2 = ?" — the M2 learner says 2/4. This is a
  **golden probe**: the correct model says 1 ("two halves make a whole" —
  they KNOW this from life), M2 says 2/4, and the collision with their own
  real-world knowledge is immediate and self-administered.
- *Recovery*: run the collision above; then the mechanism: "the bottom
  number is the SIZE of piece — you can only count pieces together when
  they're the same size. Same size? Then count the tops." Physical: quarter
  pieces + third pieces refuse to stack neatly.
- *Verification*: 1/2 + 1/4 (must convert, not add across), delayed; and
  the error-analysis item: "a student wrote 1/2 + 1/3 = 2/5 — what were
  they thinking, and where does it break?"

**M3 — "A fraction can't be bigger than 1" (rejects 5/4)**
- *Why*: instruction-induced (birth type 5) — every early example was a
  piece of one pizza; the model was never told it had a shelf life.
- *Symptom / phrase*: "you can't have five quarters, there's only four."
- *Detection probe*: "Show me 5/4 on the number line" or "Two pizzas, cut
  in quarters — I eat five pieces. How much pizza did I eat?"
- *Recovery*: the second pizza IS the recovery. The model upgrade (pieces →
  number line) happens here; deliver the versioning line: "your pizza
  picture was right — it just needs a second pizza."
- *Verification*: places 7/4, 9/2 on a line; explains "improper" as a name,
  not a defect.

**M4 — "The whole doesn't matter" (compares 1/2 of X with 1/2 of Y)**
- *Why*: the "of what?" argument is invisible in the notation.
- *Symptom*: agrees that "half of my pizza equals half of yours" regardless
  of sizes; later, in percentages, compares 50% off different prices.
- *Detection probe*: "Half of an elephant or half of a mouse — same
  amount?" (absurdity is the point; laughter is diagnostic success).
- *Recovery*: institutionalize the question "...of WHAT?" as a reflex the
  learner asks aloud every time a fraction appears without its whole.
- *Verification*: the sophisticated distractor "D. it depends on the whole"
  from the assessment library's worked item — the M4-repaired learner
  chooses it *for the right reason* when wholes differ.

**M5 — "Multiplication makes bigger" arrives here to die**
- Not born here (born in whole-number arithmetic) but this is where it
  collides: 1/2 × 8 = 4 "got smaller." If unaddressed, the learner
  concludes fractions are an arbitrary-rules zone — the metastasis chain
  (Delivery 2 §4). Pre-empt at `math.arith.fraction-multiplication`; at THIS
  node, plant the seed: "half OF eight" language from day one, so × already
  smells like "of".

## Explanation library

- **Age 5–7 / no background (story frame)**: "You have one chocolate bar
  and two friends. Everyone gets a fair share. The bottom number says how
  many fair shares you cut. The top number says how many shares you get."
- **Age 8–11 (mechanism)**: "A fraction is two answers in one: the bottom
  says what SIZE of piece we're using — cut into 4, each piece is a
  'quarter'. The top COUNTS them — three quarters means three of those
  pieces. Bottom names the piece, top counts the pieces."
- **Returning-after-forgetting teen/adult**: "You probably remember rules —
  flip this, common denominator that. Park the rules. A fraction is just a
  division you haven't done yet: 3/4 IS 3 ÷ 4. Everything else — comparing,
  adding, simplifying — falls out of that one idea, and we can rebuild the
  rules from it in about ten minutes."
- **Visual frame**: number line 0 to 1; cut the unit into equal hops; a
  fraction is "how many hops from zero." (This is the intermediate-model
  installer — deploy at the M3 moment.)
- **Logical frame (older/advanced entry)**: "Whole numbers answer 'how
  many?' Fractions answer 'how much?' — they were invented because sharing
  broke counting" (leads directly into the discovery lesson below).
- **Anxious learner**: lead with what they already own: "You already use
  fractions every day — half an hour, quarter past. You know this; we're
  just writing down what you know."

## Analogy library

1. **Fair sharing / chocolate bar** (BEST — canonical): maps cut-count →
   denominator, share-count → numerator. *Breaking point*: improper
   fractions (one bar can't yield 5/4) — retire to the number line there.
2. **Money**: quarters and halves of a pound/dollar. Strong for 1/4, 1/2,
   3/4; *breaking point*: thirds (no coin), and it silently fixes the whole
   at one unit of currency (feeds M4 if never varied).
3. **Time**: half past, quarter to. Free prior knowledge; same breaking
   points as money.
4. **Story analogy**: three pirates sharing four gold bars — every pirate
   gets one bar and a fair piece of the fourth (4/3 arrives before the
   notation, painlessly).
5. **Visual analogy**: the measuring cup / marked jug — fractions as marks
   BETWEEN the whole-number lines (number-line model in kitchen clothing).

**ANTI-ANALOGIES**:
- **"Out of" language as the definition** ("3 out of 4") — it works for
  proper fractions and then *hard-installs M3*: "5 out of 4" is genuinely
  nonsense, so the learner who was taught "out of" as the meaning correctly
  rejects improper fractions. Use "out of" only as one reading, never as
  the definition; the definition is size-of-piece + count.
- **Two-separate-boxes visuals** (numerator box, denominator box, as in
  some worksheets) — reifies M2. The fraction must always be presented as
  ONE number with one position on a line, even when its parts are named.

## Demonstration library

- **Home/physical (no equipment)**: one sheet of paper. Fold in half, in
  half again — unfold and label the quarter-creases. Predict first: "when I
  fold it twice, how many regions?" Then: two sheets for improper fractions.
- **Teacher demo (predict-first)**: two identical drawn bars; "I'll cut this
  one in 3 and that one in 8 — point to which single piece will be bigger
  BEFORE I cut." (M1's collision, staged before M1 is even voiced.)
- **Learner activity**: the 3-bars-4-children fair-share task (see discovery
  lesson) — the learner does the cutting.
- **Digital/interactive**: a bar/number-line dual view where dragging the
  denominator slider visibly shrinks pieces while the count grows — the
  inverse relationship FELT. Second view: same fraction highlighted on bar
  and line simultaneously (representation-translation practice).

## Discovery lesson (this concept is discoverable — fully designed)

Fair sharing is the one mathematical instinct every child ships with; this is
the canonical discovery concept (Delivery 2 §2, worked design, expanded here
to the anchor node):

1. **Need**: "Three chocolate bars, four children, everyone gets exactly the
   same amount. Whole bars each? (No — not enough.) So...?" Whole numbers
   have run out, publicly.
2. **Playground**: paper "bars", scissors or drawn cuts. Constraint: shares
   must be *provably* fair.
3. **Invention**: learners cut. Common inventions: cut every bar in 4 (each
   child gets 3 small pieces); cut 3 bars in half then halve the halves;
   give whole-bar-minus-a-bite (rejected by the fairness constraint —
   the constraint is doing the teaching).
4. **Collision**: "Say EXACTLY how much chocolate one child got." They have
   the pieces but no name — the need for a new *number* is now felt, not
   announced.
5. **Formalization**: "What you made is called three quarters. Mathematicians
   write it 3/4: the 4 says you cut fair-shares-of-four; the 3 counts yours.
   You invented fractions — the writing is the only part I gave you."
6. **Compression**: immediately run the notation on a fresh case (5 pancakes,
   4 people → 5/4 — improper arrives on day one, from sharing, before M3
   can form). Close with the versioning line for the pieces model.

## Teaching actions (dispatch for this concept)

In order: **guided discovery** (above — this is a load-bearing cut-node;
spend the time) → **demonstration** (paper folding, predict-first) →
**worked examples** for notation handling → **game** (fraction war: flip two
cards, make the larger fraction — the mechanic IS comparison) → **drawing**
("draw 3/4 three different ways" — bar, set, number line; representation
flexibility) → **error analysis** (intermediate+: the M2 student's work) →
**teach-back** with the tutor performing M1 as the confused student.
*Poor fits*: animation (nothing here changes over time); simulation (no
parameter space worth exploring at this node — the interactive bar/line view
is a visualization, not a simulation).

## Voice teaching

- **Listen for the definite article**: "a third" vs "three" — learners who
  say "one three" or "three over four" as pure symbol-reading, with no
  quantity words, are running M2 (two numbers, not one).
- **Characteristic hesitation**: latency spike on "which is bigger, 1/3 or
  1/4?" even when answered correctly = the whole-number rule still bidding;
  keep it in review (calibration note: this item stays miscalibrated —
  confident-wrong — longer than almost any other primary item).
- **Pronunciation stakes**: "fourths" vs "quarters" vs "fourths of" — accept
  all, but the tutor consistently says size-words ("quarter-sized pieces")
  in early sessions; the language IS the model.
- **The load-bearing sentence** (slow, lower pitch, repeat once): "The
  bottom number tells you the SIZE of the pieces. The top number COUNTS
  them."
- Self-corrections ("2/5... wait, no, you need the same bottoms first") are
  M2 dying audibly — log and praise the catch.

## Assessment

- **Golden probe**: "1/2 + 1/2 = ?" (M2: 2/4 vs correct: 1). Secondary
  probe: the chocolate-bar choice ("1/3 or 1/8 of this bar?") for M1.
- **Distractor-mapped comparison item** (from `../assessment/03 §2`, worked
  example — that item was authored against this very concept): largest of
  1/3, 1/4 with distractors mapped to M1, gap-thinking, and the
  sophisticated "depends on the whole" (M4-aware) option.
- **Guided practice** (fading ladder): shade 3/4 of a drawn bar → complete
  a partially-shaded improper fraction → place given fractions on a marked
  line → place on an UNmarked line (learner chooses the cuts).
- **Independent practice**: fair-share word problems with fresh surfaces
  (pancakes/ribbons/hours); "draw it two ways" items.
- **Mastery gate set** (per `../assessment/05 §3`): two production items on
  unlike surfaces (a sharing story + a pure number-line placement); one
  mixed item arriving unannounced among whole-number work; delayed
  next-session retrieval ("what does the bottom number tell you?" +
  one placement); zero M1/M2 distractors chosen; explanation at rubric ≥3
  (mechanism: piece-size + count).
- **Transfer items**: near — new sharing surfaces; far — "half past four"
  to number line; cross-subject — reading a measuring cylinder between
  marks (physics/chemistry measurement); real-world — "which discount is
  bigger, 1/3 off or 25% off?" (forward-link to percentages); expert —
  spontaneous use of "of what?" when someone compares halves of different
  wholes.
- **Voice assessment**: oral fair-share ("five pancakes, four people —
  how much each? say it, don't write it"); confidence elicited before
  every comparison reveal (this concept's calibration is characteristically
  overconfident-wrong on M1 items — track it explicitly).

## Recovery notes (concept-specific only — engine: Delivery 1)

- Likeliest utterances here: **"I hate fractions"** (this concept is the #1
  named object of math identity statements — run the identity script, then
  find the exact spot: it is almost always M1 or M2, fixable within a
  session, which makes fractions the best identity-repair opportunity in
  mathematics) and **"I forgot which number goes on top"** (cued retrieval:
  "which number is the SIZE?" — the meaning regenerates the notation, never
  the reverse).
- The concept-specific smaller question (for "I don't know"): drop to
  "cut this bar so two people get fair shares — show me" — physical
  fair-sharing is below the floor of any learner who reached this node.

## Memory & review

- **Type**: concept (with an embedded micro-tool: instant recognition of
  1/2, 1/4, 3/4 positions, which gets automaticity bursts).
- **Review form**: re-explaining and re-applying in fresh contexts (concept
  review), NOT flashcards; the "what does the bottom number tell you?"
  question at expanding intervals.
- **Interleaving partners**: whole-number comparison items (forces the
  discrimination M1 needs); later, decimals (same number, different
  clothes) — mixing fractions with decimals is the single best
  discrimination diet for both.
- **Deviation from default**: keep M1/M2 verification items in rotation
  longer than the standard schedule — these misconceptions re-grow under
  time pressure for months (speeded re-probes per `../assessment/05 §3`).

## Transfer map

- **Near**: any fair-share situation; fractions of sets ("3/4 of 8
  sweets" — bridge to the operator model).
- **Far**: time ("three quarters of an hour"), music (quarter notes — same
  word, same idea), maps and scales.
- **Cross-subject** (KG cross_links lead to `math.alg.rational-expressions`):
  measurement readings between marks (physics `phys.meas.*`); concentrations
  ("half as strong") in chemistry.
- **Real-world**: recipes at half quantity (the kitchen is the fraction
  gym); discounts; fuel gauges.
- **Expert transfer**: the learner spontaneously asks "of what?" outside
  mathematics (news percentages, statistics claims) — record it as the
  strongest evidence this node ever produces.

## Curriculum feedback

None yet. The KG's prerequisite pair (division + rational-number idea) and
its unlocks match teaching reality at this node.
