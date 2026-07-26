# Counting — `math.arith.counting`

## Identity

- **Concept ID**: `math.arith.counting` (canonical mathematics KG)
- **Curriculum location**: mathematics / arithmetic (no parent in KG;
  children: `math.arith.counting-sequence`, `math.arith.subitizing`) —
  the domain's zero-prerequisite entry node, the first `math.arith.*`
  concept authored under this program
- **Prerequisites**: `math.found.natural-numbers` (ℕ supplies the tag
  sequence {1,2,3,…} counting assigns to a set's elements).
- **Unlocks**: `math.arith.addition`, `math.arith.place-value`.
- **Related** (from KG): `math.found.natural-numbers`.
- **Difficulty**: foundational · **Bloom**: apply · **Mastery
  threshold**: 0.95 · **Est. hours**: 8
- **Blueprint**: `docs/curriculum/blueprints/math.arith.counting.md`
  (PACKAGE_READY; MAMR: MC-1 COUNTING-WITHOUT-BIJECTION is
  FOUNDATIONAL; P76_mode independence, cross_links=[math.disc.
  combinatorics], not Tier 1).
- **Aliases** (from KG): "enumeration", "one-to-one correspondence",
  "cardinality-finite".

## Learning Objective

The learner can: state that counting a finite set S means constructing
a bijection f:{1,…,n}→S, and correctly execute this construction by
tagging each element with exactly one successive natural number; verify
a counting assignment satisfies both injectivity (no element tagged
twice) and surjectivity (no element skipped); and explain why any two
different bijections to the same set S always yield the same
cardinality n, correctly distinguishing the bijection (the specific
assignment) from the cardinality (the resulting count).

## Core Understanding

`math.found.natural-numbers` already supplies ℕ={1,2,3,…} (or {0,1,2,…}
depending on convention) as the tag sequence this concept's bijection
targets. **Counting** a finite set S means constructing a **bijection**
f:{1,2,…,n}→S for some n∈ℕ₀ — the **cardinality** of S, written |S|=n,
is the size of this bijection's domain. A bijection requires BOTH
**injectivity** (f(i)≠f(j) for i≠j — each element receives AT MOST one
tag) and **surjectivity** (every element of S is tagged — no element is
skipped). The special case |∅|=0 holds because the unique function
f:{}→∅ is vacuously a bijection (no elements exist to violate either
condition). Critically, cardinality is **well-defined**: if f:{1,…,n}→S
and g:{1,…,m}→S are both bijections, then n=m — informally, because
composing f⁻¹∘g produces a bijection {1,…,m}→{1,…,n}, and a bijection
between two initial segments of ℕ forces their sizes to match. This is
why counting the SAME set in two different orders (different
bijections) always produces the SAME cardinality: the cardinality is a
property of the SET, not of which particular bijection was used to
count it.

## Mental Models

- **Beginner model — "counting means reciting number words in sequence
  while pointing at objects"**: the learner treats counting as a
  rhythmic verbal-motor procedure, without tracking which objects have
  already been tagged, so an object may be tagged twice or skipped
  while the recited sequence still "sounds complete." Shelf-life
  warning: this model produces genuinely invalid counts (tagging one
  object twice while skipping another) that nonetheless feel procedurally
  finished to the learner.
- **Intermediate model — "counting means assigning each object exactly
  one tag, in order, with none skipped and none doubled; the last tag
  used is the count"**: the learner correctly executes valid bijections
  and can verify injectivity/surjectivity explicitly, but may still
  believe counting the same set in a different order could yield a
  different total. Upgrade trigger: being asked to count the same set
  twice, starting from a different element each time.
- **Advanced model — "cardinality is a well-defined property of the
  set itself — ANY valid bijection to S reveals the same n, because two
  bijections to S would otherwise force a bijection between {1,…,n}
  and {1,…,m} for n≠m, which is impossible"**: the learner fluently
  constructs multiple distinct bijections to the same set and correctly
  explains, using the bijection-composition argument, why they must
  agree. Upgrade trigger: being asked to prove, using bijection
  language, why order of counting cannot affect the final cardinality.
- **Do not upgrade early**: a learner still producing invalid bijections
  (tagging twice, skipping elements — beginner model, directly
  triggering MC-1) should not be pushed toward the well-definedness
  proof (advanced model) before basic bijection validity is fully
  secure — MC-1 is FOUNDATIONAL per the Blueprint's own MAMR.

## Why Students Fail

The dominant, FOUNDATIONAL failure treats counting as a memorized
verbal-motor habit (reciting "1, 2, 3…" while pointing) rather than a
bijection construction, so an object can be tagged twice or skipped
entirely while the learner still believes the count is valid — the
one-to-one correspondence requirement is never explicitly tracked. A
second failure believes that counting the same set in a different
order could yield a genuinely different cardinality, conflating the
SPECIFIC bijection (which element gets which tag) with the resulting
CARDINALITY (the size of the domain, which never changes). A third
failure dismisses the bijection framing as unnecessary formal jargon
around an obviously simple procedure, missing that the bijection
language is precisely what PROVES order-independence — without it, "it
just doesn't matter" is an assertion, not an explanation.

## Misconceptions

Reusing the Blueprint's Misconception Registry, birth-type
classification added per this program's diagnostic procedure — not
re-derived:

### MC-1: COUNTING-WITHOUT-BIJECTION (Foundational; Type 1 — overgeneralization)
**Trigger**: counting S={□,△,○,★,♦} by pointing, tagging one object
twice and skipping another, yet still reporting 5.
**Repair**: emphasize the one-to-one rule explicitly — each object
receives exactly one tag, no element is left untagged. Model explicit
tracking (marking or crossing out each object immediately after
tagging it) to convert the procedural habit into a verifiable
bijection.
**MAMR**: FOUNDATIONAL — bijection validity underlies every other
counting property; must be cleared before MC-2 or MC-3.

### MC-2: ORDER-DEPENDENT-CARDINALITY (Moderate; Type 1 — overgeneralization)
**Trigger**: counting the same set twice in different orders and
believing the two counts, though both correct, might legitimately
disagree — "which one is right?"
**Repair**: distinguish the bijection (the specific tag assignment)
from the cardinality (the final n). Both orderings produce valid
bijections with the SAME domain {1,…,n} — cardinality is the size of
that domain, a property of the set S, never of which bijection was
used to reveal it.

### MC-3: PROCEDURE-REPLACES-STRUCTURE (Moderate; Type 1 — overgeneralization)
**Trigger**: dismissing the bijection framing as unnecessary jargon —
"counting just works, order doesn't matter because it doesn't."
**Repair**: without bijection language, WHY order doesn't matter cannot
be explained, only asserted. With it: any bijection f:{1,…,n}→S reveals
n by inspecting its domain — and any two bijections to S must have
domains of the same size, since a bijection between {1,…,n} and
{1,…,m} for n≠m is impossible for finite sets. This is a proof, not a
procedure.

## Analogies

**Primary — the wristband check-in (Blueprint's own analogy)**: at a
party with 5 guests, each guest receives exactly one numbered
wristband at the door — no guest gets two, no wristband is skipped.
When all wristbands are handed out, the last number used tells you
exactly how many guests arrived. Counting a set follows the identical
logic: hand out number tags one by one until every element has exactly
one tag; the last tag number is the count.

**Anti-analogy to retire**: "Counting is just saying the number words
in order while pointing." This directly invites MC-1 by framing
counting as a purely verbal-rhythmic act with no explicit tracking
mechanism, making it impossible to notice a double-tag or a skip.

## Demonstrations

**Valid vs. invalid bijection contrast (Blueprint's own contrast
pair)**: for S={a,b,c,d}, the valid assignment 1→a,2→b,3→c,4→d
satisfies both injectivity and surjectivity, giving |S|=4. An invalid
assignment 1→a,2→a,3→c,4→d tags a twice (violating injectivity) and
skips b entirely (violating surjectivity) — this is NOT a valid
bijection and does not establish |S|=4 or any cardinality at all.

**Order-independence (Blueprint's own two-bijection demonstration)**:
counting T={Monday,…,Friday} via f(1)=Monday,…,f(5)=Friday, and again
via g(1)=Friday,…,g(5)=Tuesday (starting from the opposite end) — both
are valid bijections with domain {1,…,5}, so |T|=5 both times, despite
being genuinely different bijections.

**|∅|=0**: the empty function f:{}→∅ is vacuously a bijection (there
are no elements to violate injectivity or surjectivity), so its domain
has 0 elements and |∅|=0.

## Discovery Questions

Present a small set of 5-6 distinct objects and ask the learner to
count them twice, starting from a different object each time — the
learner discovers both counts agree, directly experiencing
order-independence before the bijection-composition argument is stated
formally. Recommendation: guided discovery for the order-independence
observation (directly experiential from the two-count comparison);
direct instruction for the formal well-definedness proof sketch (f⁻¹∘g
argument, MC-3's repair), since the composition argument is not
independently rediscoverable without scaffolding.

## Teaching Sequence

MC-1 (counting without bijection) is addressed first, since bijection
validity is the foundational requirement every subsequent property
(order-independence, well-definedness) depends on. MC-2
(order-dependent cardinality) is addressed second, once valid
bijection construction is secure, since it specifically concerns
comparing two already-valid bijections. MC-3 (procedure replaces
structure) is addressed last, as the most abstract, meta-level
resistance — convincing a fluent counter that the formal bijection
language adds genuine explanatory power, not just jargon.

## Tutor Actions

| Student state | Recommended action | Source |
|---|---|---|
| MC-1 active (counting without bijection) | WORKED EXAMPLE: valid-vs-invalid bijection contrast with explicit marking strategy | Teaching Actions: SHOW §1 |
| MC-2 active (order-dependent cardinality believed) | DEMONSTRATION: same set counted in two different orders, same cardinality | Teaching Actions: SHOW §3 |
| MC-3 active (bijection framing dismissed as jargon) | DEMONSTRATION: well-definedness proof sketch (f⁻¹∘g composition argument) | Teaching Actions: SHOW §3 |
| Ready for transfer | THOUGHT EXPERIMENT: two genuinely different bijections to a 5-color set, confirming the same cardinality (Blueprint P76) | Teaching Actions: TEST-THINKING §4 |

## Voice Teaching Notes

**Register**: Say "construct a bijection" rather than just "count" —
and keep "the bijection f" (the assignment) and "the cardinality |S|"
(the result) explicitly distinct throughout, since collapsing the two
terms is exactly what MC-2 exploits.

**Wait-time**: After presenting the invalid-bijection example
(tagged-twice, skipped element), give extended wait-time before
revealing what's wrong — let the learner locate the violation
themselves by re-checking each object.

**Load-bearing sentences**:
- "Each object gets exactly one tag — no object skipped, no object
  tagged twice."
- "The cardinality is the size of the bijection's domain — it never
  depends on which particular bijection you happened to construct."

**Voice channel note**: See `foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

Directly reusing the Blueprint's own P77 4-problem gate set and P76
transfer probe, not restated in full — cite by reference:

**Gate 1** (Blueprint Problem 1): count the vowels in "equation" by
constructing an explicit bijection, listing all pairs. Pass: {e,u,a,i,o},
|V|=5.

**Gate 2** (Blueprint Problem 2): count W={x∈ℕ:1≤x≤7, x odd} using two
different bijections (tagging orders), confirming the same cardinality.
Pass: W={1,3,5,7}, |W|=4 both times.

**Gate 3** (Blueprint Problem 3): identify what goes wrong in a
proposed "counting" function that omits one element of the target set.
Pass: correctly identifies the surjectivity failure.

**Gate 4** (Blueprint Problem 4): explain why |∅|=0 using the bijection
definition. Pass: correct vacuous-bijection explanation.

**Gate 5** (Blueprint P76, independence transfer probe): construct two
distinct bijections from {1,…,5} to a 5-color set, verify both are
valid, and explain in one sentence why any bijection from {1,…,n} to a
finite set S must have n=|S| regardless of which bijection is used.
Pass: correct construction and correct well-definedness explanation.

**Mastery criterion**: 5/5 on the full Blueprint item bank (4 P77 items
+ P76), consistent with KG mastery_threshold 0.95 (⌈0.95×5⌉=5).

## Tutor Recovery Strategy

Likeliest utterance: "I counted 5, my friend counted 5 too but tagged
things in a different order — is one of us wrong?" — the
concept-specific smaller question: "how many tags did each of you use
in total?" reframes the confusion from "different orderings might give
different totals" (MC-2's root) to "both bijections have the same
domain size, {1,…,5}, so both are correct," directly isolating MC-2
using the learner's own already-correct arithmetic (both used 5 tags)
as the resolving evidence.

## Memory Hooks

**Type**: procedural (constructing and verifying bijections via
explicit tagging and marking, directly reusing `math.found.
natural-numbers`'s own successor-based tag sequence) + declarative (the
bijection/cardinality distinction, the well-definedness argument).
Review form: fresh "count this set two different ways" prompts,
periodically paired with an invalid-bijection spotting exercise
(tagged-twice or skipped element) to keep MC-1's guard-rail active.
Interleaving partner: `math.found.natural-numbers` (the tag-sequence
source this concept's entire bijection construction depends on).

## Transfer Connections

**Near transfer**:
- `math.arith.counting-sequence` and `math.arith.subitizing` (both
  children in KG, directly building on this concept's own bijection
  foundation)
- `math.arith.addition` (per KG `unlocks`; addition of cardinalities
  |S|+|T| for disjoint sets formalizes as the cardinality of the
  disjoint union S⊔T, directly reusing this concept's own definition)

**Far transfer**:
- `math.arith.place-value` (per KG `unlocks`; place value represents a
  counted cardinality n in base-10 positional notation)
- `math.disc.combinatorics` (per KG `cross_links`, not Tier 1;
  combinatorics counts bijections (permutations), injections
  (arrangements), and general functions — this concept's bijection
  framework is the direct foundation, per the Blueprint's own
  Cross-Blueprint Dependencies note)
- Computer science: array indexing and loop-based enumeration directly
  instantiate the bijection-to-{1,…,n} structure

## Cross-Subject Connections

Per KG `cross_links` [`math.disc.combinatorics`]: not Tier 1 per the
Blueprint's own GR-9 determination, so the P76 transfer probe uses
independence mode (a self-contained two-bijection construction) rather
than a genuine cross-link probe. Not fabricated beyond what the KG and
Blueprint state.

## Blueprint References

Blueprint: `docs/curriculum/blueprints/math.arith.counting.md`
(PACKAGE_READY, all structural/grammar/content/AIR checks PASS).

Full Protocol A teaching sequence (TA-A01 through TA-A04/mastery
gate), Protocol B repair chains (B-1 through B-3), and the P89
spaced-repetition schedule reused by reference above and not restated
in full; the Misconception Registry (MC-1 through MC-3) and the P77/P76
mastery-gate item bank cited directly by ID.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any.

## Curriculum Feedback

No structural KG issues found. This concept's single prerequisite
(`math.found.natural-numbers`) is exactly sufficient to supply the tag
sequence this concept's bijection construction depends on. Its two
`unlocks` (`math.arith.addition`, `math.arith.place-value`) match the
Blueprint's own Component 7 Outgoing Unlocks exactly. Estimated hours
(8, notably higher than most math.found concepts) and the "apply"
Bloom level with a high mastery threshold (0.95) are appropriate for a
foundational skill requiring reliable, verifiable execution — this is
the mathematics KG's canonical `math.arith` domain entry point, the
first concept authored in this newly-opened domain.

## Version History

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-07-26 | Curriculum Completion Program (math.arith domain, Wave 1, autonomous loop) | Initial entry, grounded in the existing PACKAGE_READY Blueprint. First concept authored in the math.arith domain, opened immediately after math.found reached 82/82 Domain Certification. |
