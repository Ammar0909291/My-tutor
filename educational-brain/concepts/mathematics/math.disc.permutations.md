# math.disc.permutations

## Identity
- **KG ID**: `math.disc.permutations`
- **Domain**: math.disc (Discrete Mathematics)
- **Requires**:
  - `math.disc.counting-principles` — load-bearing part: the entire $P(n,r)=n!/(n-r)!$ formula is
    a direct, repeated application of the multiplication principle already secured there — $n$
    choices for the first position, $n-1$ for the second, and so on — this concept's job is
    building that repeated-application chain into a named formula and its variants, not
    introducing a new counting mechanism.
  - `math.arith.multiplication` — load-bearing part: computing the actual products (and
    factorials) this formula requires is a direct application of multiplication already secured
    there.
- **Unlocks**: `math.disc.combinations` (the order-doesn't-matter counterpart, directly previewed
  by this concept's own Example 3/MC-1 distinction)
- **Cross-links**: none declared in the KG
- **Difficulty**: developing
- **Bloom level**: apply
- **Mastery threshold**: 0.9 (MAMR = ⌈0.9×5⌉ = 5/5)
- **Estimated hours**: 4
- **Blueprint**: `docs/curriculum/blueprints/math.disc.permutations.md` (reused by reference
  throughout)
- **KG note**: the KG description names all four variants this entry organizes around precisely —
  the basic ordered-arrangement formula $P(n,r)=n!/(n-r)!$, circular permutations $(n-1)!$,
  permutations with repetition $n^r$, and permutations with identical objects
  $n!/(n_1!n_2!\cdots)$ — matching the Blueprint's own LO1/LO2 split exactly.

## Learning Objective
- The learner can apply the ordered-arrangement formula $P(n,r)=\frac{n!}{(n-r)!}$ to count the
  number of ways to arrange $r$ items chosen from $n$ distinct items when ORDER MATTERS, and can
  derive this formula directly from the multiplication principle (`math.disc.counting-principles`)
  as a chain of $r$ sequential "choose one of the remaining items" steps.
- The learner can distinguish and correctly apply three permutation variants: CIRCULAR
  permutations ($(n-1)!$, arrangements around a circle where rotations are identical),
  permutations WITH REPETITION allowed ($n^r$, when items can be reused), and permutations with
  IDENTICAL objects ($\frac{n!}{n_1!n_2!\cdots}$, when some of the $n$ items are indistinguishable).
- The learner can recognize the defining test that separates a permutation problem from any other
  counting problem — ORDER MATTERS — correctly refuting the assumption that "permutation" means
  any "choose $r$ from $n$" scenario, including ones where order is actually irrelevant.

## Core Understanding
To arrange $r$ items chosen from $n$ distinct items, where the ORDER of selection matters, the
multiplication principle applies sequentially: $n$ choices for the first position, then $n-1$
REMAINING choices for the second (one item is now used), then $n-2$ for the third, and so on, down
to $n-r+1$ choices for the $r$-th position. Multiplying these together gives
$P(n,r)=n(n-1)(n-2)\cdots(n-r+1)=\frac{n!}{(n-r)!}$ — the $(n-r)!$ in the denominator exactly
cancels the unused "tail" of the full factorial, leaving only the $r$ factors actually used.

Three named variants modify this basic count in specific, justified directions. **Circular
permutations**: arranging $n$ distinct items around a circle (not a line) means rotating the WHOLE
arrangement produces what's considered the SAME arrangement (there's no fixed starting point).
Fixing one item's position (removing the redundant rotations) and arranging the remaining $n-1$
items relative to it gives $(n-1)!$ — FEWER than the $n!$ linear count, since each circular
arrangement corresponds to $n$ different linear ones. **Permutations with repetition allowed**: if
items can be REUSED at each position (e.g. a PIN code where digits repeat), each of the $r$
positions independently has all $n$ options — giving $n^r$, MORE than $P(n,r)$, since nothing is
ever "used up" between positions. **Permutations with identical objects**: if the $n$ items being
fully arranged include duplicates (say $n_1$ copies of one type, $n_2$ of another), the naive $n!$
OVERCOUNTS, since swapping two identical items produces an arrangement that looks the same but was
counted as different; dividing by $n_1!n_2!\cdots$ (the ways to permute the identical copies among
themselves) corrects this — $\frac{n!}{n_1!n_2!\cdots}$, FEWER than the naive $n!$.

The single deciding test for whether a "choose $r$ from $n$" scenario is a permutation problem AT
ALL is whether ORDER (or, equivalently, distinct ROLES assigned to the chosen items) genuinely
matters — swapping two chosen items must produce a genuinely DIFFERENT outcome. A scenario where
the chosen items simply form an unordered GROUP (mere membership, no roles) is a fundamentally
different kind of counting problem — the exact case `math.disc.combinations` (this concept's
KG-declared unlock) formalizes next.

## Mental Models
1. **Beginner — counting an "arrangement" problem means computing $n!$ (or a similar factorial
   expression) without first checking whether the scenario's specific structure (order-matters?
   circular? repetition allowed? identical items?) actually matches the plain $n!$ case.** A
   learner at this stage may apply the basic factorial formula even to scenarios needing one of
   the three named adjustments. *Upgrade trigger*: being presented with a circular-arrangement or
   identical-objects scenario and asked to check the answer against direct listing for a small
   case — revealing the mismatch between the naive count and the true count. *Shelf life*: brief,
   resolved once a concrete mismatch is demonstrated.
2. **Intermediate — correctly applies the basic $P(n,r)$ formula and can name the three variants
   when explicitly prompted for which one applies, but does not yet reliably check, UNPROMPTED,
   whether "order matters" applies at all before reaching for a permutation formula.** This model
   handles most standard permutation-labeled exercises correctly but is vulnerable to MC-1 the
   moment a problem is NOT explicitly labeled as a permutation problem. *Upgrade trigger*: the
   Blueprint's own Example 3 (committee selection, superficially similar to a race-placement
   scenario) — requiring the learner to apply the order-matters test as the FIRST step, before any
   formula, rather than assuming every "choose $r$" problem is automatically a permutation. *Shelf
   life*: persists until directly confronted with a genuinely non-permutation "choose $r$"
   scenario, since permutation-labeled practice sets rarely include this trap.
3. **Advanced — reliably applies the order-matters test as the first step for any "choose $r$ from
   $n$" scenario, and correctly selects among the basic formula and all three named variants based
   on the scenario's actual structure (circular? repeats allowed? identical items among the $n$?),
   not by matching to a memorized keyword.** *Upgrade trigger*: the Blueprint's own P76 transfer
   probe (a relay race's running order versus a strategy-meeting attendee selection, using the
   SAME 4 people) — requiring the order-matters test to be applied twice, on two structurally
   different questions about the same underlying group. *Shelf life*: durable once the test itself,
   not surface cues, governs classification.
4. **Expert — recognizes all four variants as applications of the SAME underlying multiplication-
   principle machinery, adjusted for the specific structural feature (rotational symmetry,
   reusability, indistinguishability) each scenario introduces, and anticipates that removing the
   order-matters requirement entirely — rather than adjusting the counting for a structural
   feature — is what defines a genuinely DIFFERENT counting problem (combinations), not merely
   another permutation variant.** *Shelf life*: permanent, and this framing is the direct
   conceptual bridge to `math.disc.combinations`'s own definition.

## Why Students Fail
The single most frequent and consequential failure, ranked foundational per the Blueprint's own
registry, is MC-1: treating any "choose $r$ from $n$" scenario as a permutation problem without
checking whether order or role genuinely matters in that specific scenario — an easy trap because
permutation and combination scenarios can be phrased in superficially identical language ("choose
3 from a group of 10"). The second failure, also foundational, is MC-2: applying the basic factorial
or $P(n,r)$ formula to a multiset containing indistinguishable items without dividing out the
redundant permutations of the identical copies, overcounting arrangements that look the same as
genuinely distinct. The third failure, MC-3 (moderate), is applying the LINEAR permutation count
$n!$ to a circular arrangement problem, without recognizing that rotations of the same arrangement
must be treated as identical, overcounting by a factor of $n$.

## Misconceptions
Reused by reference from the Blueprint's Component 6 registry (MC-1..MC-3), with birth-type
classification added.

- **MC-1 — PERMUTATION-ASSUMED-SYNONYMOUS-WITH-ANY-SELECTION** (foundational)
  - **Birth type**: Type 1, overgeneralization — early permutation practice is dominated by
    scenarios explicitly labeled or framed as ordered (races, rankings, passwords), and this
    surface pattern over-generalizes into "any 'choose $r$ from $n$' problem is a permutation
    problem," without the order-matters test being applied as an independent, first check.
  - **Characteristic phrase**: applying $P(n,r)$ directly to a committee-selection or group-
    membership scenario, where no distinct roles are actually assigned to the chosen items.
  - **Detection probe** (verbatim, Blueprint): present the committee-selection scenario from
    Example 3 (choosing 3 students from 10 for a role-less committee) and ask whether it's a
    permutation problem — answering "yes" confirms MC-1.
  - **Repair**: Blueprint Repair Action B01 — re-apply the order-matters test directly: "would
    swapping two chosen items give a different outcome here? If not, it isn't a permutation
    problem" — re-anchoring on the specific test rather than surface similarity to a known
    permutation scenario.
  - **Verification of death**: given a new "choose $r$ from $n$" scenario, the learner applies the
    order-matters test FIRST, before reaching for any formula, and correctly identifies whether a
    permutation formula applies at all.

- **MC-2 — IDENTICAL-OBJECTS-OVERCOUNTED-WITH-NAIVE-FACTORIAL** (foundational)
  - **Birth type**: Type 1, overgeneralization — the basic $n!$ (or $P(n,r)$) formula, learned and
    successfully applied to scenarios of genuinely DISTINCT items, over-generalizes onto scenarios
    containing indistinguishable duplicates, where the same "count every ordering" logic silently
    overcounts.
  - **Characteristic phrase**: computing the number of arrangements of the letters in "BANANA" as
    $6!=720$, without adjusting for the repeated letters.
  - **Detection probe** (verbatim, Blueprint): ask for the number of arrangements of "BANANA" and
    check whether the student answers $720$ without adjustment — confirming MC-2.
  - **Repair**: Blueprint Repair Action B02 — re-walk the division by $1!3!2!$ explicitly, showing
    concretely that swapping two identical A's (or the two identical N's) produces an arrangement
    that LOOKS the same, so the naive count treats indistinguishable outcomes as distinct and must
    be corrected by dividing out those redundant internal orderings.
  - **Verification of death**: given a new multiset-arrangement scenario, the learner identifies
    the repeated items and applies the correction $n!/(n_1!n_2!\cdots)$ unprompted.

- **MC-3 — CIRCULAR-PERMUTATION-COUNTED-AS-LINEAR** (moderate)
  - **Birth type**: Type 1, overgeneralization — the linear permutation formula $n!$, secure and
    familiar from ordinary (in-a-row) arrangement problems, over-generalizes onto circular
    arrangement problems without the rotational-symmetry adjustment being applied.
  - **Characteristic phrase**: computing the number of ways to seat 4 people around a round table
    as $4!=24$ without adjustment for rotational equivalence.
  - **Detection probe** (verbatim, Blueprint): ask for the number of ways to seat 4 people around
    a round table and check whether the student answers $24$ without adjustment — confirming MC-3.
  - **Repair**: Blueprint Repair Action B03 — physically rotate a small circular seating
    arrangement and show it "looks the same" from every rotation, then re-derive $(n-1)!$ by
    fixing one person's seat to eliminate the redundant rotations.
  - **Verification of death**: given a new circular-arrangement scenario, the learner applies
    $(n-1)!$ unprompted and can explain why it's fewer than the linear count $n!$.

## Analogies
- **A relay race baton (permutation) versus a study group roster (not a permutation).** Deciding
  which of 4 runners carries the baton on legs 1, 2, 3, and 4 of a relay assigns each runner a
  distinct ROLE — swapping two runners' legs produces a genuinely different race plan, so this is
  a permutation. Deciding which 2 of the same 4 runners will attend a strategy meeting assigns NO
  roles at all — swapping which "slot" a chosen runner occupies changes nothing, since there are
  no slots, only membership. *Where it holds*: the "roles assigned versus mere membership"
  structure, directly targeting MC-1, using the SAME group of people in both halves to isolate the
  structural difference. *Where it breaks*: the relay-race framing conveniently makes "order"
  obviously meaningful (legs of a race happen in sequence); the analogy alone doesn't teach the
  three named VARIANTS (circular, repetition, identical objects), which must be taught via their
  own dedicated worked examples.
- **A circular keychain versus a straight shelf.** Arranging distinct charms on a straight shelf
  gives the full linear count $n!$, since each position is fixed relative to a definite start and
  end. Arranging the SAME charms on a circular keychain (or bracelet) gives FEWER distinct
  arrangements, $(n-1)!$, since rotating the whole keychain around produces what looks like the
  identical arrangement — there's no fixed "first" position to anchor against. *Where it holds*:
  the "removing a redundant degree of freedom (rotation) reduces the count" structure, directly
  targeting MC-3. *Where it breaks*: a keychain analogy doesn't naturally extend to REFLECTIONS
  (flipping the keychain over) — if reflections were also considered identical, the count would
  further reduce to $(n-1)!/2$, a refinement beyond this concept's own stated scope (the KG
  description covers rotation-only circular permutations).

## Demonstrations
1. **Deriving $P(n,r)$ from the multiplication principle, directly supporting LO1.** How many ways
   can a race with 8 runners produce a 1st/2nd/3rd place finish (order matters)?
   $P(8,3)=\frac{8!}{5!}=8\times7\times6=336$ — directly from the multiplication principle: 8
   choices for 1st, 7 remaining for 2nd, 6 remaining for 3rd.
2. **The three named variants, contrasted directly, supporting LO2.** (a) Circular: seating 5
   distinct people around a round table: $(5-1)!=4!=24$, not $5!=120$. (b) Repetition allowed: a
   3-digit lock code using digits 0–9, digits allowed to repeat: $10^3=1000$ — each of the 3
   positions independently has all 10 digits available, nothing used up. (c) Identical objects:
   arranging the letters of "BANANA" (1 B, 3 A's, 2 N's): $\frac{6!}{1!\,3!\,2!}=
   \frac{720}{1\cdot6\cdot2}=60$ — dividing out the redundant orderings of the identical letters.
3. **Recognizing when order genuinely matters versus doesn't, directly confronting MC-1.** A
   teacher must select 3 students from a class of 10 to form a committee (no distinct roles — just
   membership) — order does NOT matter here (choosing Alice-then-Bob-then-Carol is the identical
   outcome as Bob-then-Carol-then-Alice: the same 3-person committee). This superficially resembles
   the race-placement scenario (also "picking 3 from a larger group"), but the crucial difference
   is that the race assigns distinct roles (1st/2nd/3rd) while the committee assigns none — this
   is genuinely NOT a permutation problem, previewing `math.disc.combinations` directly.

## Discovery Questions
- "Here's a committee-selection problem, and here's a race-placement problem — both say 'choose 3
  from a group.' Are they the same TYPE of counting problem?" — surfaces MC-1 by requiring the
  order-matters test to be applied explicitly rather than assumed from surface similarity.
- "How many ways can the letters of 'BANANA' be arranged? Try listing a few and see if any look
  identical to each other." — surfaces MC-2 by inviting direct discovery of the overcounting
  problem through concrete listing.
- "4 people sit around a round table. Does rotating everyone one seat to the right create a NEW
  seating, or the SAME one?" — surfaces MC-3 by forcing the rotational-equivalence question into
  the open.

## Teaching Sequence
1. **Anchor**: connect explicitly to `math.disc.counting-principles`'s already-secured
   multiplication principle and `math.arith.multiplication`'s computation machinery — state
   plainly that $P(n,r)$ is a repeated, sequential application of the multiplication principle,
   not a new counting mechanism.
2. **Derive the basic formula concretely** (per the Blueprint's own CPA entry: physically arranging
   labeled books on a shelf, counting choices aloud), then formalize via Demonstration 1, directly
   supporting LO1.
3. **Work all three named variants side by side** (Demonstration 2), directly pre-empting MC-2 and
   MC-3 together, explicitly stating the DIRECTION each adjustment moves the count (fewer for
   circular and identical-objects; more for repetition-allowed) and why.
4. **Confront the order-matters defining test last**, using the deliberately-similar-surface-form
   committee/race contrast (Demonstration 3), directly pre-empting MC-1 — taught last because it
   requires the basic formula to already be secure before the "when does it even apply" question
   is meaningful.
5. **Practice mixed problems** deliberately requiring the order-matters test, the basic formula,
   and correct selection among the three variants to each be produced without prompting which is
   needed.
6. **Bridge forward**: state explicitly that `math.disc.combinations` (this concept's KG-declared
   unlock) formalizes the order-DOESN'T-matter case this concept's own Example 3 previews —
   the direct next step once the order-matters test is reliably applied.

## Tutor Actions
- Before accepting any permutation-formula application, ask "would swapping two of the chosen items
  give a genuinely different outcome here?" — targeting MC-1 directly, as the first check on any
  new scenario.
- Before accepting a factorial-based count for a multiset, ask "are all the items being arranged
  genuinely distinct, or are some identical to each other?" — targeting MC-2 directly.
- Before accepting a linear-arrangement count for a circular scenario, ask "does rotating the whole
  arrangement produce something that counts as different, or the same?" — targeting MC-3 directly.
- Never accept "permutation" as a scenario label without the learner first justifying it via the
  order-matters test, even when the scenario is phrased using the word "arrange" or "order."

## Voice Teaching Notes
- When starting any new "choose $r$ from $n$" scenario aloud, ask the order-matters question FIRST,
  before naming any formula: "if I swap two of these, is that a different outcome?" — the audible
  ordering (test before formula) targets MC-1.
- When working an identical-objects scenario aloud, narrate the overcounting concretely: "swap
  these two A's... does the word look any different? No — so we're counting some arrangements more
  than once" — targeting MC-2.
- When working a circular scenario aloud, physically (or verbally) rotate the arrangement and ask:
  "does this look like a NEW arrangement, or the SAME one from before?" — targeting MC-3.

## Assessment Signals
- **Correct + fast + applies the order-matters test unprompted before reaching for a formula,
  correctly selects among all three named variants, derives $P(n,r)$ from the multiplication
  principle rather than reciting it** → MASTERED.
- **Applies a permutation formula to a scenario where order genuinely doesn't matter** → MC-1
  active; needs the order-matters-test repair.
- **Computes a multiset arrangement using the naive factorial, without dividing out identical
  items** → MC-2 active; needs the overcounting repair.
- **Computes a circular arrangement using the linear count $n!$** → MC-3 active; needs the
  rotational-equivalence repair.
- **Cannot compute even a simple two-stage count, or cannot state the multiplication principle** →
  prerequisite gap in `math.disc.counting-principles` or `math.arith.multiplication` respectively,
  not specific to this concept's own variant/order-matters content; route back accordingly.

## Tutor Recovery Strategy
If a learner has just had MC-1 corrected and reacts with "but it LOOKED just like the race
problem" — validate this directly: the surface similarity is genuine and deliberate (both are
"choose $r$ from $n$" scenarios), and the confusion is entirely reasonable at first glance. Frame
the correction as "you're right that they look alike on the surface — the one question that tells
them apart is whether swapping the chosen items changes anything," not as a correction of careless
reading. If MC-2 persists after one correction, avoid re-stating the division rule abstractly
again — instead have the learner physically (or on paper) list out a few of the "different"
arrangements the naive count would produce for a SMALL multiset, so the duplicate listings become
directly visible rather than an assertion to accept on authority.

## Memory Hooks
- "Swap two chosen items — different outcome? Then order matters, and it's a permutation." —
  directly targeting MC-1.
- "Identical items in the group? Divide out their redundant orderings." — directly targeting MC-2.
- "Arranged in a circle? Rotating doesn't count as new — divide by $n$." — directly targeting MC-3.

## Transfer Connections
- **`math.disc.counting-principles`** (prerequisite, reused): supplies the multiplication principle
  this concept's basic formula is a direct, repeated application of.
- **`math.arith.multiplication`** (prerequisite, reused): supplies the arithmetic this formula's
  computation directly requires.
- **`math.disc.combinations`** (KG-declared unlock): the order-doesn't-matter counterpart, directly
  previewed and motivated by this concept's own Example 3/MC-1 distinction — the exact next step
  in the `math.alg.binomial-theorem`/`math.alg.pascals-triangle` unblocking chain this program's
  cross-domain excursion is working toward.

## Cross-Subject Connections
- **Computer science**: permutation counting underlies password/key-space size estimation (the
  repetition-allowed variant, $n^r$, is exactly the calculation behind "how many possible
  passwords of length $r$ using an alphabet of $n$ characters"), and the identical-objects variant
  underlies counting distinct arrangements of data with repeated elements.
- **Biology/chemistry**: arranging DNA bases or molecular chains with repeated units is a direct
  real-world instance of the identical-objects permutation variant, structurally identical to the
  "BANANA" letter-arrangement example.

## Blueprint References
- `docs/curriculum/blueprints/math.disc.permutations.md` — Component 0 (metadata: difficulty
  developing, bloom apply, mastery_threshold 0.9, estimated_hours 4, requires
  [math.disc.counting-principles, math.arith.multiplication], no cross_links); Component 6
  (Misconception Registry MC-1..MC-3, reused above with birth-type classification added);
  Component 4 (worked examples for the basic formula derivation, the three named variants
  side by side, and the order-matters committee/race contrast, reused directly in the
  Demonstrations above); the P76 transfer probe (a relay-race running-order versus a
  strategy-meeting-attendance scenario using the same 4 people, requiring the order-matters test
  applied twice, independence mode) — held in the Blueprint's own mastery-gate item bank, not
  restated here per the Standard's ownership boundary.

## Runtime Asset References
- No AssetIdentity rows exist yet for this concept (mathematics EB authoring is ahead of the
  AssetIdentity seeding campaign for math.alg — see CLAUDE.md's "Mathematics Educational Brain
  serving-asset campaign" section for the seeding mechanism this concept will use once authored
  content is selected for transcription).

## Curriculum Feedback
- **Continues the bounded math.disc excursion**: `math.disc.counting-principles`'s own
  already-authored entry (Batch 14) is this concept's direct prerequisite; this entry, in turn,
  unblocks `math.disc.combinations` (KG-declared unlock), which is itself the final blocker for
  `math.alg.binomial-theorem` and `math.alg.pascals-triangle` — the last remaining leg of the
  math.disc side of this program's math.alg-unblocking excursion.
- No genuine content-overlap or metadata discrepancy was found between this Blueprint and the live
  KG, or against any already-authored mathematics sibling entry — the Blueprint's Component 0
  matches the KG's `requires`/`unlocks`/`cross_links` fields exactly.

## Version History
- 2026-09-11 — Initial authoring (Batch 15 / math.alg-unblocking cross-domain excursion continued,
  part 2 of 2, of the Mathematics Educational Brain completion campaign). Blueprint reused by
  reference in full. No KG or Blueprint file modified.
