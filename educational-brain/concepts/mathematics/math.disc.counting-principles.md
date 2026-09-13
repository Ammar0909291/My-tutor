# math.disc.counting-principles

## Identity
- **KG ID**: `math.disc.counting-principles`
- **Domain**: math.disc (Discrete Mathematics) — the FIRST entry authored in this domain by this
  program, reached via a small, deliberately bounded cross-domain excursion out of `math.alg`
  (see Curriculum Feedback below for the full rationale).
- **Requires**:
  - `math.arith.multiplication` — load-bearing part: the multiplication principle's core claim
    (m independent choices, each with n options, gives m×n total outcomes) is literally an
    application of multiplication as repeated grouping, already secured there; this concept's job
    is teaching WHEN to apply that operation to a counting scenario, not re-teaching the operation
    itself.
  - `math.found.set-theory` — load-bearing part: "how many ways" questions are fundamentally about
    the cardinality of a set of outcomes (a Cartesian product for AND-scenarios, a union of
    disjoint sets for OR-scenarios), and the addition principle's mutual-exclusivity requirement is
    precisely the disjoint-union condition already secured there.
- **Unlocks**: `math.disc.combinatorics` (not yet authored)
- **Cross-links**: none declared in the KG
- **Difficulty**: developing
- **Bloom level**: apply
- **Mastery threshold**: 0.95 (MAMR = ⌈0.95×5⌉ = 5/5 — the highest threshold encountered so far in
  this campaign; the Blueprint's own Component 8 states explicitly that a score of 4/5 does NOT
  earn mastery credit and routes to repair before a retake, reflecting how foundational this
  AND/OR classification skill is for the entire combinatorics sequence it unlocks)
- **Estimated hours**: 3
- **Blueprint**: `docs/curriculum/blueprints/math.disc.counting-principles.md` (reused by
  reference throughout; note this Blueprint uses a different internal labelling convention —
  `TA-A01`/`TA-B01`/numbered Components — than the `A01`/`B01`/lettered-Component convention seen
  in most `math.alg` Blueprints so far; the underlying content maps onto this Standard's sections
  identically, and the convention difference is recorded here rather than silently normalized
  away)
- **KG note**: the KG names this concept precisely via its aliases — "multiplication principle,"
  "addition principle," "rule of product" — and its description states both halves explicitly:
  independent sequential tasks multiply (m·n), mutually exclusive tasks add (m+n). This entry
  treats the AND/OR CLASSIFICATION step — not the arithmetic itself — as the concept's real
  content, matching the Blueprint's own naming of this as the "threshold concept."

## Learning Objective
- The learner can classify a counting scenario as an AND-scenario (independent, sequential
  choices — apply the multiplication principle) or an OR-scenario (mutually exclusive choices —
  apply the addition principle), using the presence or absence of pairing between the choices as
  the deciding test, not surface wording alone.
- The learner can chain the multiplication principle across more than two independent sequential
  stages ($m_1\times m_2\times\cdots\times m_k$), correctly identifying the number of independent
  stages in a multi-part scenario (e.g. a lock with several digit wheels).
- The learner can recognize when the multiplication principle's INDEPENDENCE requirement fails —
  when one stage's available options are affected by, or overlap with, another stage's outcome —
  and correctly avoids applying a fixed product in that case.

## Core Understanding
Two foundational rules answer "how many ways?" questions, and the entire skill lies in correctly
choosing WHICH one applies, not in the arithmetic itself (multiplying or adding is trivial once the
right rule is identified). The **multiplication principle** governs AND-scenarios: if task A can be
done in $m$ independent ways and task B can be done in $n$ independent ways, and B's available
options don't change depending on which choice was made for A, then doing BOTH A and B (in
sequence) can be done in $m\times n$ ways — every option for A pairs with every option for B,
producing a genuine Cartesian product of outcomes. The **addition principle** governs OR-scenarios:
if task A can be done in $m$ ways OR task B can be done in $n$ ways, and the two sets of options are
MUTUALLY EXCLUSIVE (no overlap, and only ONE of the tasks is actually performed, not both), then the
total number of ways is $m+n$ — the two option sets are simply combined without any pairing.

The single deciding test, per the Blueprint's own framing, is: "am I choosing one from EACH group
(pairing every option with every other), or one from EITHER group (picking exactly one, with the
groups never combining)?" The first case multiplies; the second adds. This generalizes cleanly: the
multiplication principle chains across any number of independent sequential stages
($m_1\times m_2\times\cdots\times m_k$ for $k$ stages), which is exactly how counting problems with
many stages — like a multi-wheel combination lock — are solved without listing every outcome. The
one genuine subtlety beneath the surface rule is INDEPENDENCE itself: the multiplication principle
only applies cleanly when one stage's count of options doesn't shift depending on what happened at
an earlier stage, and when the same physical option can't be counted at more than one stage in a
way that causes double-counting.

## Mental Models
1. **Beginner — counting problems are solved by listing every possible outcome and counting the
   list, or by "putting the numbers together" without a clear rule for how.** A learner at this
   stage may add when multiplication is needed, or vice versa, essentially guessing which
   operation "feels right." *Upgrade trigger*: being shown a tree diagram or grid where the total
   count can be verified by direct enumeration against the guessed operation — revealing the
   mismatch immediately when the guess is wrong. *Shelf life*: brief, resolved as soon as the
   tree/grid visualization is introduced and connected to the formula.
2. **Intermediate — correctly distinguishes multiplication (AND) from addition (OR) using surface
   language cues ("and"/"then" versus "or"/"either"), and can apply either principle to a two-stage
   scenario.** This model is fragile because it is keyed to WORDS rather than STRUCTURE — a problem
   phrased ambiguously, or requiring the learner to notice hidden overlap between categories (as in
   MC-3), can defeat a purely lexical rule. *Upgrade trigger*: encountering a scenario where the
   surface wording is ambiguous or where naive multiplication double-counts an overlapping option
   (e.g. a "no topping" choice appearing at two stages) — revealing whether the underlying
   AND/OR-and-independence structure is understood, or only the surface language cue.
3. **Advanced — classifies scenarios by their actual STRUCTURE (pairing versus mutual exclusion,
   independence versus dependence), chains the multiplication principle across arbitrarily many
   stages, and actively checks for independence and overlap before applying either rule.**
   *Upgrade trigger*: the Blueprint's own P76 transfer probe (ID-card scenario with overlapping
   subsets) — requiring the learner to recognize when two counted subsets are NOT mutually
   exclusive and therefore cannot simply be added. *Shelf life*: durable, and this is exactly the
   reasoning skill `math.disc.combinatorics` (this concept's KG-declared unlock) builds on when
   introducing permutations and combinations as refinements of these same two principles.
4. **Expert — recognizes the multiplication principle as counting the size of a Cartesian product
   of finite sets, and the addition principle as counting the size of a union of PAIRWISE DISJOINT
   finite sets — connecting both to `math.found.set-theory`'s own already-secured machinery rather
   than treating them as two independent arithmetic rules to memorize.** *Shelf life*: permanent,
   and this set-theoretic framing is precisely what will later generalize to the
   inclusion-exclusion principle for OVERLAPPING (non-disjoint) sets, beyond this concept's own
   scope.

## Why Students Fail
The single most frequent failure, ranked FOUNDATIONAL by the Blueprint's own registry, is MC-1:
adding when independent sequential choices should be multiplied — an intuitive but incorrect
treatment of "two things" as simply combining their counts, missing that each option at stage A
pairs with EVERY option at stage B, producing a Cartesian product rather than a union. The second
failure, MC-2, is the reverse error: multiplying when choices are mutually exclusive, over-applying
the just-learned multiplication principle to a scenario where only ONE choice is actually made, not
one from each category — a natural over-correction once the first rule feels newly memorized. The
third failure, MC-3, is applying the multiplication principle mechanically without checking that
the stages are genuinely INDEPENDENT — missing when the same option appears in more than one stage
(causing double-counting) or when one stage's available options actually depend on an earlier
choice, both of which invalidate a simple fixed-product calculation.

## Misconceptions
Reused by reference from the Blueprint's Component 2 registry (MC-1..MC-3), with birth-type
classification added.

- **MC-1 — ADDITION-NOT-MULTIPLICATION** (foundational)
  - **Birth type**: Type 1, overgeneralization — a learner's general-purpose intuition that
    "combining two things" means adding their counts (reinforced by countless earlier arithmetic
    contexts where combining genuinely does mean addition) over-generalizes to a scenario that is
    structurally a PAIRING (Cartesian product), not a combination.
  - **Characteristic phrase**: given 4 shirts and 3 trousers, stating there are $4+3=7$ outfit
    combinations.
  - **Detection probe** (verbatim, Blueprint): "A coin is flipped and a die is rolled. How many
    outcomes are possible?" — an answer of 8 (2+6, addition error) confirms MC-1.
  - **Repair**: Blueprint Repair TA-B01 — draw the tree diagram explicitly, showing that each of
    the 3 shirts pairs with all 4 trousers (4+4+4 leaves, i.e. $3\times4$ leaves), contrasting the
    tree's leaf count against the wardrobe's simple item count (7) that addition would mistakenly
    produce.
  - **Verification of death**: given a new two-stage independent scenario, the learner multiplies
    unprompted and can explain, in terms of pairing, why addition would undercount.

- **MC-2 — MULTIPLICATION-NOT-ADDITION** (moderate; the Blueprint records MC-1 alone as the sole
  FOUNDATIONAL flag among the three, so MC-2 and MC-3 are ranked at a lower, though still
  consequential, severity)
  - **Birth type**: Type 1, overgeneralization — having just learned and successfully applied the
    multiplication principle, the newly-formed rule "counting problems multiply" over-generalizes
    onto mutually-exclusive-choice scenarios where it does not apply.
  - **Characteristic phrase**: given 5 hot drinks or 3 cold drinks (customer picks exactly one),
    stating there are $5\times3=15$ options, as if ordering both.
  - **Detection probe** (verbatim, Blueprint): "A café offers 5 hot drinks and 3 cold drinks. A
    customer orders one drink. How many choices does the customer have?" — an answer of 15
    confirms MC-2.
  - **Repair**: Blueprint Repair TA-B02 — contrast explicitly: "if you could order a hot AND cold,
    you'd have $5\times3=15$ combinations. But you pick either hot OR cold — the two option sets
    don't pair up; they're simply combined: $5+3=8$."
  - **Verification of death**: given a new mutually-exclusive-choice scenario, the learner adds
    unprompted and can explain why multiplying would overcount (by implying both options are
    chosen together).

- **MC-3 — INDEPENDENCE-IGNORED** (moderate)
  - **Birth type**: Type 1, overgeneralization — the multiplication-principle FORMULA is applied
    mechanically to every multi-stage scenario without re-checking, each time, whether the
    independence condition (stage B's options don't depend on or overlap with stage A's) actually
    holds.
  - **Characteristic phrase**: given 5 flavours and 3 toppings where one topping option is
    "no topping" (also effectively available at every flavour independent of the others),
    multiplying $5\times3$ and then separately re-adding for the "no topping" case, double-counting
    it.
  - **Detection probe** (verbatim, Blueprint's own transfer probe, part (d)): given two counted
    subsets of a larger scenario (e.g. ID cards starting with a specific letter, and ID cards with
    a repeated first-two-letter pattern), asked whether the two subsets are mutually exclusive or
    overlap — failing to notice a genuine overlap and simply adding the two counts confirms MC-3.
  - **Repair**: reasoned directly from the Blueprint's own conceptual-shift guidance (Component 5,
    TA-B02's P64 equivalent) — ask explicitly, for any multi-stage count: "does stage B's option
    count ever change depending on stage A's outcome, or does the same option ever get counted at
    more than one stage?" If either holds, list the affected cases separately rather than applying
    one fixed product or sum.
  - **Verification of death**: given a scenario with a genuinely overlapping pair of counted
    subsets, the learner identifies the overlap explicitly and does not simply add the two raw
    counts.

## Analogies
- **A restaurant's fixed-price combo menu versus its à la carte "pick one" specials board.** The
  combo menu (choose ONE starter AND ONE main AND ONE dessert) is a pairing structure — every
  starter can be combined with every main and every dessert, so the number of possible combos is
  the PRODUCT of the three category sizes. The "pick one" specials board (today's special is either
  the soup, or the salad, or the sandwich — you choose exactly one dish from the whole board) is a
  mutually-exclusive structure — the total number of choices is simply the SUM of items across the
  board's categories. *Where it holds*: the "pairing across independent categories versus choosing
  one from a combined pool" structure, directly targeting the MC-1/MC-2 distinction. *Where it
  breaks*: a restaurant's actual menu rarely enforces true independence (a vegetarian main might
  restrict which desserts pair sensibly) — the analogy conveys the basic AND/OR distinction but not
  MC-3's independence-checking subtlety, which must be taught via the actual overlapping-option
  demonstration instead.
- **Rolling several distinguishable dice at once, versus rolling one die that could be any of
  several different kinds.** Rolling three distinguishable six-sided dice together is an AND
  scenario — every face of die 1 pairs with every face of die 2 and die 3, giving $6\times6\times6$
  outcomes. Choosing to roll EITHER a six-sided die OR an eight-sided die OR a twelve-sided die
  (only one die is actually rolled) is an OR scenario — the total number of distinct outcomes
  across the choice is $6+8+12$. *Where it holds*: directly targets the chaining extension (LO2)
  by naturally suggesting more dice can simply extend the product further. *Where it breaks*: real
  dice rolls are physically simultaneous, which can obscure the SEQUENTIAL framing ("first this
  choice, then that choice") the multiplication principle's justification actually relies on — the
  sequential framing must be taught via the tree diagram, not assumed transferable from the
  simultaneous-roll picture.

## Demonstrations
1. **The multiplication principle via a concrete grid, directly confronting MC-1.** 3 shirts
   (red, blue, green) and 4 trousers (black, grey, white, navy). Draw the $3\times4$ grid: each row
   a shirt, each column a trouser, each cell a distinct outfit. Counting cells directly: 12 —
   matching $3\times4=12$, not the wardrobe's item count $3+4=7$ that an addition error would
   produce.
2. **Chaining the multiplication principle across four independent stages, supporting LO2.** A
   lock has 4 position wheels with 3, 5, 4, and 6 symbols respectively. Each wheel's setting is
   chosen independently of the others. Total combinations: $3\times5\times4\times6=360$ — computed
   by multiplying the running product by each new stage's count in turn (3, then $3\times5=15$,
   then $15\times4=60$, then $60\times6=360$), making the chaining mechanism explicit rather than
   asserted as a single leap.
3. **The addition principle and its contrast against multiplication, directly confronting MC-2.**
   A café offers 5 hot drinks and 3 cold drinks; a customer orders exactly ONE drink. Since hot and
   cold are mutually exclusive single choices (not "hot AND cold"), the total is $5+3=8$ — contrast
   explicitly against the DIFFERENT scenario "how many ways to order one hot AND one cold drink"
   (a genuine pairing), which would correctly be $5\times3=15$, making vivid why the SAME two
   numbers (5 and 3) produce different totals depending on the AND/OR structure of the question
   asked.

## Discovery Questions
- "You have 4 shirts and 3 pairs of trousers. Does each shirt pair with just one pair of trousers,
  or with ALL of them? What does that tell you about how to count total outfits?" — surfaces MC-1
  by directing attention to the pairing structure rather than a surface "combine two numbers"
  instinct.
- "A menu offers 5 hot drinks or 3 cold drinks, and you order exactly one. Are you choosing one
  from EACH category, or one from EITHER category?" — surfaces MC-2 directly by forcing the
  AND/OR distinction to be stated explicitly.
- "Two counted groups of ID cards — one where the first letter is 'M', another where the first two
  letters match. Could a single card belong to BOTH groups? What would that mean for just adding
  the two counts?" — surfaces MC-3 by requiring the learner to check for overlap before combining
  counts.

## Teaching Sequence
1. **Anchor**: connect to `math.arith.multiplication`'s already-secured repeated-grouping meaning
   of multiplication, and `math.found.set-theory`'s cardinality and disjoint-union concepts — state
   plainly that this concept is about WHEN to apply each, not a new arithmetic operation.
2. **Establish the multiplication principle via the concrete grid** (Demonstration 1), directly
   pre-empting MC-1, then extend immediately to chaining across more stages (Demonstration 2),
   supporting LO2.
3. **Introduce the addition principle in direct contrast on the SAME numbers' worth of structure**
   (Demonstration 3), directly pre-empting MC-2, making the AND/OR distinction the explicit
   deciding question rather than a memorized pair of separate rules.
4. **Surface the independence/overlap subtlety** via the overlapping-topping or overlapping-ID-card
   scenario, directly pre-empting MC-3, after both principles are independently secure — this
   subtlety is deliberately taught LAST, since it requires both principles to already be reliably
   distinguished before its added nuance is meaningful.
5. **Practice mixed problems** deliberately requiring the AND/OR classification, the multi-stage
   chaining, and the independence/overlap check to each be produced without prompting which is
   needed — matching the Blueprint's own P77 4-item problem set (outfit combinations, café choice,
   lock combinations, a routes-via-B true/false trap).
6. **Bridge forward**: name explicitly that `math.disc.combinatorics` (this concept's KG-declared
   unlock, not yet authored) refines these same two principles into permutations (order matters)
   and combinations (order doesn't) — the AND/OR/independence reasoning developed here is the
   direct foundation that refinement builds on.

## Tutor Actions
- Before accepting any total count for a two-or-more-stage scenario, ask "are you pairing every
  option with every other option, or choosing just one from a combined pool?" — targeting the
  MC-1/MC-2 distinction directly.
- Before accepting a chained multiplication across several stages, ask the learner to name each
  stage explicitly and confirm none is missing or double-counted — supporting LO2's chaining skill.
- Before accepting a simple addition of two counted subsets, ask "could any single outcome belong
  to BOTH subsets?" — targeting MC-3 directly.
- Never accept "and means multiply, or means add" as a standalone rule without also confirming the
  learner can point to WHY (pairing versus combining) in the specific scenario at hand — surface
  language cues alone are known to be fragile (see Mental Model 2's shelf life).

## Voice Teaching Notes
- When introducing a new counting scenario aloud, ask the AND/OR classification question FIRST,
  before touching any numbers: "are we pairing these, or choosing between them?" — the audible
  ordering (classify before compute) reinforces that the classification step is the real skill,
  targeting both MC-1 and MC-2 at once.
- When chaining the multiplication principle aloud, narrate the running product explicitly at each
  stage: "three... times five is fifteen... times four is sixty..." — the audible running total
  makes the chaining mechanism concrete rather than a single unexplained multi-factor product.
- When checking for independence or overlap aloud, voice the check as a genuine pause: "wait — does
  this option show up anywhere else in my count?" — modeling the exact self-check a fluent counter
  performs internally, targeting MC-3.

## Assessment Signals
- **Correct + fast + classifies AND/OR from structure (not just surface wording) unprompted,
  chains multiplication across many stages correctly, catches independence/overlap issues before
  they cause errors** → MASTERED.
- **Adds counts for an independent, sequential (pairing) scenario** → MC-1 active; needs the
  pairing/grid repair.
- **Multiplies counts for a mutually-exclusive (single-choice) scenario** → MC-2 active; needs the
  AND-versus-OR contrast repair.
- **Applies a fixed product or sum without checking for dependence or overlap between stages** →
  MC-3 active; needs the independence/overlap-check repair.
- **Cannot compute even a simple two-stage count at all, or cannot state what a Cartesian product
  or disjoint union is** → prerequisite gap in `math.arith.multiplication` or
  `math.found.set-theory` respectively, not specific to this concept's own AND/OR classification
  content; route back accordingly.

## Tutor Recovery Strategy
If a learner has just had MC-1 corrected and reacts with "but adding always worked before" —
validate this directly: addition genuinely IS correct for combining SEPARATE, non-pairing
quantities (like counting total items in two piles), and the learner's instinct is not wrong in
general — it simply doesn't apply to THIS specific pairing structure. Frame the correction as
"you're right that adding combines two counts — but here, every option from the first group
connects to every option in the second, which is a different kind of combining," not as a blanket
correction of a previously reliable instinct. If MC-3 persists after one correction, avoid
re-stating the independence rule abstractly again — instead have the learner physically list (or
draw) the specific overlapping cases in the SCENARIO AT HAND, so the double-counting becomes
directly visible rather than an assertion to accept on authority.

## Memory Hooks
- "Pairing every option with every other? Multiply." — the multiplication principle's deciding
  test, directly targeting MC-1.
- "Choosing just one from a combined pool? Add." — the addition principle's deciding test, directly
  targeting MC-2.
- "Before you add or multiply — check for overlap." — the independence/overlap check, directly
  targeting MC-3.

## Transfer Connections
- **`math.arith.multiplication`** (prerequisite, reused): supplies the repeated-grouping meaning
  of multiplication that the multiplication principle's arithmetic step directly applies, once the
  AND-structure has been identified.
- **`math.found.set-theory`** (prerequisite, reused): supplies the cardinality and disjoint-union
  concepts that the addition principle's mutual-exclusivity requirement is precisely an instance
  of, and the Cartesian-product framing the Expert mental model connects the multiplication
  principle to.
- **`math.disc.combinatorics`** (KG-declared unlock, not yet authored): refines these same two
  principles into permutations (order matters) and combinations (order doesn't), building directly
  on the AND/OR/independence reasoning this concept establishes.

## Cross-Subject Connections
- **Computer science** (not a KG cross-link, general domain knowledge): the multiplication
  principle is the direct combinatorial basis for counting the size of a search space (e.g. the
  number of possible passwords of a given length and character set), and the independence/overlap
  check (MC-3) directly parallels avoiding double-counting in algorithm-complexity estimation.
- **Probability** (a natural forward application, not yet a KG cross-link from this concept):
  counting the size of a sample space via these two principles is the standard first step in
  computing a classical probability, making this concept's AND/OR classification skill a direct
  prerequisite skill for that later subject, even though no KG edge currently declares it.

## Blueprint References
- `docs/curriculum/blueprints/math.disc.counting-principles.md` — Component 1 (Cognitive Map:
  core concept, conceptual progression, CPA arc, threshold concept); Component 2 (Misconception
  Registry MC-1..MC-3, reused above with birth-type classification added); Component 4 (worked
  examples for the outfit grid, the chained lock combination, and the café addition-principle
  contrast, reused directly in the Demonstrations above); the P76 transfer probe (an ID-card
  format scenario requiring recognition of a genuine overlap between two counted subsets,
  independence mode) — held in the Blueprint's own mastery-gate item bank, not restated here per
  the Standard's ownership boundary.

## Runtime Asset References
- No AssetIdentity rows exist yet for this concept (mathematics EB authoring is ahead of the
  AssetIdentity seeding campaign for math.alg — see CLAUDE.md's "Mathematics Educational Brain
  serving-asset campaign" section for the seeding mechanism this concept will use once authored
  content is selected for transcription).

## Curriculum Feedback
- **This is the first `math.disc` (Discrete Mathematics) entry authored by this program**,
  reached via a deliberately bounded cross-domain excursion out of `math.alg`: 9 `math.alg`
  concepts remain unauthored, and all 9 require either `math.func.function-concept` (7 concepts,
  the exponential/logarithm family) or `math.disc.combinations` — which itself requires
  `math.disc.permutations`, which requires this concept — (2 concepts, the binomial-theorem/
  pascals-triangle pair). This concept was verified, programmatically, to be immediately ready
  (both its own KG-declared prerequisites already authored) before being selected — matching this
  program's established precedent (e.g. the `math.nt.divisibility`/`math.nt.gcd`/`math.nt.lcm`
  excursion that unblocked `math.alg.rational-root-theorem` and `math.alg.fraction-simplification`/
  `fraction-addition`).
- **Genuine Blueprint/KG metadata discrepancy found and resolved toward the KG, per established
  convention**: the Blueprint's own Component 7 declares `unlocks: [math.disc.combinatorics]` and
  is silent on `math.disc.permutations`/`math.disc.combinations` specifically; the live KG's
  `unlocks` field agrees (`['math.disc.combinatorics']`), while the KG's separate `children` field
  additionally lists `math.disc.permutations` and `math.disc.combinations` directly. This is not a
  contradiction (KG `unlocks` and `children` are documented as distinct relationship types
  elsewhere in this program's authored entries) but is recorded here for completeness, since it is
  the reason this concept's own downstream path to unblocking `math.alg.binomial-theorem` runs
  through `children`, not `unlocks`.
- No genuine content-overlap was found between this Blueprint and any already-authored mathematics
  sibling entry (this is the domain's first entry, so no sibling comparison was possible beyond
  the shared-prerequisite check above).

## Version History
- 2026-09-11 — Initial authoring (Batch 14 / math.alg-unblocking cross-domain excursion, part 1 of
  2, of the Mathematics Educational Brain completion campaign). Blueprint reused by reference in
  full. No KG or Blueprint file modified.
