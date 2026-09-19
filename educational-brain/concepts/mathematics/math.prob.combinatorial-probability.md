# math.prob.combinatorial-probability

## Identity
- **KG id**: `math.prob.combinatorial-probability`
- **Domain**: math.prob
- **Requires**: `math.prob.classical-probability`, `math.disc.permutations`, `math.disc.combinations`
- **Unlocks**: none
- **Cross-links**: `math.disc.combinatorics` (Blueprint's older format declared no cross-link or
  P76 mode at all — confirmed genuinely authored via `ls`; a genuine cross-link probe is used
  here, see Curriculum Feedback)
- **Difficulty**: developing
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 5

## Learning Objective
Identify whether a counting problem requires PERMUTATIONS (order matters) or COMBINATIONS (order
doesn't matter) as the first, decisive question; compute $|\Omega|$ and $|A|$ using the SAME
counting model consistently for both; apply $P(A)=|A|/|\Omega|$ after completing the count; and
use COMPLEMENTARY counting ($P(A)=1-P(A^c)$) when the complement is dramatically easier to count
than the event directly.

## Core Understanding
"DOES ORDER MATTER?" IS THE FIRST, DECISIVE QUESTION: for 5 people applying for 3 IDENTICAL
committee seats: "Alice, Bob, Carol" and "Carol, Alice, Bob" form the SAME committee — order does
NOT matter, so only $C(5,3)=10$ applies, never $P(5,3)=5\times4\times3=60$. Contrast choosing a
president, VP, and treasurer from 8 people: these ARE distinct roles, so $P(8,3)=336$ applies —
the SAME $n=8,r=3$ numbers, but genuinely different counts ($336=56\times3!$, since each unordered
group of 3 corresponds to $3!=6$ ordered role-assignments).

$|\Omega|$ AND $|A|$ MUST USE THE SAME COUNTING MODEL — NEVER MIXED: for $P(\text{all 5 cards are
hearts})$ from a 5-card hand: choosing UNORDERED combinations throughout, $|\Omega|=C(52,5)=
2{,}598{,}960$ and $|A|=C(13,5)=1{,}287$, giving $P=1{,}287/2{,}598{,}960\approx0.000495$.
Computing $|\Omega|$ as ordered ($52\times51\times50\times49\times48$) while leaving $|A|$
unordered (or vice versa) produces a WRONG answer — both counts must consistently use the SAME
model, ordered or unordered, never a mismatch of the two.

COMPLEMENTARY COUNTING IS OFTEN THE EASIER ROUTE, NEVER JUST "HARDER BUT MORE THOROUGH": for
$P(\text{at least 2 of 10 people share a birthday})$: directly summing "exactly 2," "exactly 3,"
etc. requires many cases. The COMPLEMENT "all 10 birthdays different" is one clean computation:
$P(\text{all different})=\frac{365\times364\times\cdots\times356}{365^{10}}$, then
$P(\text{at least 2 share})=1-P(\text{all different})$ — dramatically simpler, not more work.

## Mental Models
- **"Ask 'does order matter?' before anything else — that single question routes you to
  permutations or combinations and determines everything downstream."**
- **"Complementary counting isn't a fallback for when direct counting fails — it's often the
  cleanest route, especially for 'at least one' or 'at least k' events."**

## Why Students Fail

### MC-1: ORDER-ALWAYS-MATTERS-WHEN-PICKING-ITEMS
- **Surface form**: uses $5\times4\times3=60$ for a committee of identical seats, treating order
  as mattering when it doesn't.
- **Birth type**: the multiplication rule's ordered-selection intuition is the more naturally
  salient default, obscuring when a selection is actually a set rather than a sequence.
- **Repair**: re-walk the committee-versus-officers contrast, showing $C(5,3)=10$ versus
  $P(5,3)=60$ for the identical $n=5,r=3$.

### MC-2: |Ω|-AND-|A|-COUNTED-SEPARATELY-WITHOUT-CONSISTENCY-CHECK
- **Surface form**: computes $|\Omega|$ ordered and $|A|$ unordered (or vice versa) without
  verifying they use the same model.
- **Birth type**: each count feels like an independent computation, obscuring the requirement
  that both must share one consistent framework.
- **Repair**: re-verify the all-hearts flush probability using the SAME (unordered) model
  throughout for both counts.

### MC-3: COMPLEMENTARY-COUNTING-IS-JUST-HARDER
- **Surface form**: insists on directly summing "exactly $k$" cases for an "at least" event,
  believing this is more thorough than using the complement.
- **Birth type**: direct enumeration feels more rigorous than "taking a shortcut" via the
  complement, obscuring that the complement is often a genuinely simpler, cleaner computation.
- **Repair**: re-walk the birthday-matching problem, contrasting the clean complement computation
  against the many-case direct sum.

## Misconceptions

### MC-1: ORDER-ALWAYS-MATTERS-WHEN-PICKING-ITEMS
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

### MC-2: |Ω|-AND-|A|-COUNTED-SEPARATELY-WITHOUT-CONSISTENCY-CHECK
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

### MC-3: COMPLEMENTARY-COUNTING-IS-JUST-HARDER
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

## Analogies
- **"Choosing an outfit (shirt first, then pants) is an ordered sequence; choosing a project team
  is an unordered group — the same 'pick some items' framing hides two genuinely different
  counting problems."**
- **Anti-analogy**: complementary counting is NOT a lazy shortcut — for "at least one/at least k"
  events, it's frequently the mathematically cleanest path, not a compromise.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the committee ($C(5,3)=10$) versus officer-selection
  ($P(5,3)=60$) contrast on identical numbers.
- **Demonstration 2 (targets MC-2)**: the all-hearts flush probability computed consistently in
  the unordered model throughout.
- **Demonstration 3 (targets MC-3)**: the birthday-matching problem's clean complement computation
  versus the many-case direct sum.

## Discovery Questions
1. "Five people apply for 3 identical committee seats — does the order in which they're named
   matter?"
2. "If |Ω| is counted using ordered sequences, must |A| also use ordered sequences, or can it use
   a different model?"
3. "Is complementary counting just a harder, roundabout way to solve 'at least one' problems?"

## Teaching Sequence
1. **Representation shift**: the order-matters decision tree, working Demonstration 1, isolating
   MC-1.
2. **Conflict evidence**: the flush-probability consistency check, working Demonstration 2,
   isolating MC-2.
3. **Conceptual anchor**: the birthday-matching complement computation, working Demonstration 3,
   isolating MC-3.
4. **Mastery gate**: require a correct permutation-versus-combination classification for a new
   problem, a correct consistent-model computation for a card-hand probability, and a correct
   complementary-counting solution for an "at least" event.

## Tutor Actions
- Never accept order-matters reasoning applied to an unordered selection like a committee.
- Never accept $|\Omega|$ and $|A|$ computed using inconsistent (mixed ordered/unordered) models.
- Never accept complementary counting dismissed as merely "harder" for an "at least" event.

## Voice Teaching Notes
- Say "does order matter here, or are we choosing a group?" whenever a counting problem begins.
- When both $|\Omega|$ and $|A|$ are computed, ask "did you use the same counting model for
  both?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly classifies a new problem as requiring permutations
  or combinations.
- **Rung 2 (application)**: learner correctly computes a card-hand probability using a
  consistent counting model throughout.
- **Rung 3 (transfer)**: learner correctly solves an "at least one/at least k" probability
  problem via complementary counting, recognizing it as the cleaner route.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the committee-versus-officers contrast.
- If MC-2 recurs, re-verify the flush probability's consistent model.
- If MC-3 recurs, re-walk the birthday-matching complement computation.

## Memory Hooks
- "Does order matter? — the first question, every time."
- "Ω and A must use the same counting model — never mixed."
- "Complementary counting is often the cleanest route for 'at least one' events, not a
  compromise."

## Transfer Connections
- `math.prob.classical-probability` (already authored, this campaign, Batch 141): supplies the
  $P(A)=|A|/|\Omega|$ formula this concept applies after completing the combinatorial count.
- `math.disc.permutations`, `math.disc.combinations` (already authored, certified domain): supply
  $P(n,r)$ and $C(n,r)$ directly.
- `math.disc.combinatorics` (already authored, certified domain): the KG's declared cross-link,
  developing bijective and recursive counting techniques beyond this concept's permutation/
  combination toolkit.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.prob.combinatorial-probability.md`, reused
  by reference for its committee-versus-officers demonstration, its poker-hand flush/ace
  examples, its birthday-paradox complement computation, and its three-misconception library
  (adopted directly as declared).
- Transfer probe: connecting this concept's permutation/combination toolkit to
  `math.disc.combinatorics`'s bijective and recursive counting techniques, applied to a counting
  problem that doesn't superficially resemble a standard $\binom nr$ setup.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Cross-link mode established (Blueprint predates this corpus's cross-link discipline, no P76
  mode declared)**: the Blueprint (an older, Section 0-15 format) declares no cross_links field
  and no explicit P76 transfer probe mechanism, only a general "Transfer Map" (Section 14) listing
  forward connections informally. The live KG lists `math.disc.combinatorics` as a formal
  cross-link, confirmed genuinely authored via `ls`. This entry treats it as a genuine cross-link
  probe, connecting this concept's core toolkit to that concept's bijective/recursive counting
  techniques. All other fields (requires `math.prob.classical-probability`/
  `math.disc.permutations`/`math.disc.combinations`, unlocks none, developing/apply,
  mastery_threshold 0.85, estimated_hours 5) matched the live KG exactly.

## Version History
- 2026-09-19 (Batch 142): authored. First entry this batch. Companion batch concept:
  `math.prob.transition-matrix`.
