# Counting Sequence — `math.arith.counting-sequence`

## Identity

- **Concept ID**: `math.arith.counting-sequence` (canonical mathematics KG)
- **Curriculum location**: mathematics / arithmetic — child of
  `math.arith.counting` (no children in KG)
- **Prerequisites**: `math.arith.counting` (the bijection-construction
  process this concept names and formalizes as the ordered tag
  sequence 1, 2, 3, …).
- **Unlocks**: `math.arith.place-value` (place value requires
  understanding the sequence extends beyond single digits, into tens,
  hundreds, …).
- **Related** (from KG): `math.arith.counting`.
- **Difficulty**: foundational · **Bloom**: remember · **Mastery
  threshold**: 0.95 · **Est. hours**: 4
- **Blueprint**: `docs/curriculum/blueprints/math.arith.counting-sequence.md`
  (PACKAGE_READY; MAMR: MC-1 SEQUENCE-HAS-GAPS is FOUNDATIONAL; P76_mode
  independence, cross_links=[]).
- **Aliases** (from KG): "number sequence", "rote counting".

## Learning Objective

The learner can: state the counting sequence 1, 2, 3, 4, … and its
three defining properties (starts at 1; each successor is exactly one
more than the previous; contains no gaps); correctly identify the
successor of any given number; verify that a proposed sequence is or
is not a valid counting sequence by checking these three properties;
and correctly explain why the TOTAL count of a finite set is invariant
regardless of which order its elements are counted in.

## Core Understanding

`math.arith.counting` established that counting a finite set means
constructing a bijection f:{1,…,n}→S. This concept names and
formalizes the DOMAIN of that bijection — the ordered sequence
1, 2, 3, 4, … — as an object in its own right, with three
non-negotiable properties: (1) it starts at 1; (2) each successor is
exactly the previous number plus 1, with no skips; (3) it contains no
gaps, so if 1 through k are all present, k+1 is always next. The total
count of a finite set equals the LAST number reached when the sequence
is applied as tags — and because the sequence itself is rigid and
gapless, this last number (the cardinality) never depends on which
object receives which tag, only on how many objects exist.

## Mental Models

- **Beginner model — "the counting sequence is just a memorized list of
  number-words in a fixed order"**: the learner can recite 1, 2, 3, …
  fluently but does not track WHY the order is fixed or what a "gap"
  would mean; this model tolerates learned errors like starting from
  0 (importing a different convention) without noticing anything is
  wrong. Shelf-life warning: rote fluency can mask an unexamined
  starting-point error for a long time, since the recited sequence
  "sounds right" either way.
- **Intermediate model — "the sequence has three checkable rules: starts
  at 1, steps by exactly 1, never skips"**: the learner can verify
  whether an arbitrary sequence (e.g., 1, 2, 4, 5) is a valid counting
  sequence by explicitly checking each rule, and can identify exactly
  where and why a proposed sequence fails. Upgrade trigger: being asked
  to explain WHY the total count doesn't change when counting order
  changes (not just whether it does).
- **Advanced model — "the sequence's rigidity is exactly what GUARANTEES
  order-independence of the total"**: the learner explains that because
  the sequence has no gaps and steps by exactly 1, matching it
  one-to-one against any set produces the same final label regardless
  of which object gets which position — the rigidity of the sequence,
  not the specific pairing, is what fixes the total. Upgrade trigger:
  being asked to predict the consequence of a single skipped label on
  the reported total (not just detect that a skip occurred).
- **Do not upgrade early**: a learner who cannot yet reliably detect a
  gap in a written sequence (intermediate-model checkable rules) should
  not be pushed toward the order-independence argument (advanced
  model) — MC-1 (gap detection) is FOUNDATIONAL per the Blueprint's
  own MAMR and must clear first.

## Why Students Fail

The dominant, FOUNDATIONAL failure believes the counting sequence can
skip numbers (treating 1, 2, 4, 5 as valid), having never
internalised the successor rule as a strict, non-negotiable +1 step
rather than "the numbers roughly in order." A second failure believes
the total count changes depending on which object is counted first,
conflating the ORDER objects are counted in with the TOTAL that
results — not yet grasping that the same rigid sequence, applied to
the same set, always terminates at the same last label regardless of
starting point. A third failure begins the sequence at 0 rather than
1 when counting a finite set's elements, importing a convention from a
different context (array indexing, computer science) where it does
not apply to physical counting.

## Misconceptions

Reusing the Blueprint's Misconception Registry, birth-type
classification added per this program's diagnostic procedure — not
re-derived:

### MC-1: SEQUENCE-HAS-GAPS (Foundational; Type 5 — instruction-induced)
**Trigger**: asked what comes after 3 in the counting sequence, learner
answers 5 (or any other non-successor).
**Repair**: make the successor rule explicit and non-negotiable — every
next number is exactly the previous plus 1, verified by rebuilding the
sequence from a concrete touch-and-count of physical objects rather
than relying on memorized recitation alone.
**MAMR**: FOUNDATIONAL — the sequence's rigidity (no gaps) is the
property every other property (order-independence, correct totals)
depends on; must clear before MC-2 or MC-3.

### MC-2: COUNT-ORDER-CHANGES-TOTAL (Moderate; Type 2 — perceptual intuition)
**Trigger**: after counting 5 apples starting from the left and getting
5, the learner expects counting the same apples from the right to give
a different total.
**Repair**: count the identical set of objects twice, in two different
orders, side by side, and confirm both totals agree — directly
isolating the confusion between the ORDER objects are labeled in
(which changes) and the TOTAL that results (which does not).

### MC-3: ZERO-STARTS-SEQUENCE (Moderate; Type 6 — analogy overextension)
**Trigger**: counts 5 objects as "0, 1, 2, 3, 4" and reports 4 as the
total, importing zero-indexed array conventions from a different
domain (computer programming) into physical-object counting, where the
convention does not transfer.
**Repair**: explicitly distinguish the two domains — physical counting
of things that exist starts at 1 (there is no "zeroth" object); the
label 0 corresponds to no object, so starting from 0 always undercounts
by exactly one.

## Analogies

**Primary — the ordered ticket line (extending the Blueprint's own
apple-counting example)**: at a ticket counter, each customer receives
the NEXT numbered ticket in an unbroken sequence — ticket 1, then 2,
then 3, with no ticket skipped and none starting from 0. If a ticket
were skipped (say, ticket 3 misprinted and voided), every later
customer's ticket number would be one higher than their actual place
in line — exactly the effect of a gap in the counting sequence.

**Anti-analogy to retire**: "The counting sequence is just the numbers,
roughly in order." This directly invites MC-1 by suggesting the
ordering is approximate or flexible rather than a strict, checkable
rule with no exceptions.

## Demonstrations

**Gap detection (Blueprint's own Pattern Induction set)**: 1, 3, 5, 7
is NOT a valid counting sequence (steps by 2, gaps at 2, 4, 6); 0, 1,
2, 3, 4 is NOT a valid counting sequence for 5 objects (starts at 0,
undercounting by one). Contrast both against the valid 1, 2, 3, 4, 5.

**Order-invariance (Blueprint's own librarian scenario)**: a librarian
counts 8 books on a shelf as "1, 2, …, 8." After the books are
rearranged, recounting in a completely different physical order still
reaches 8 — the rearrangement changes which book gets which label, not
the final total, because the underlying sequence (1 through 8, no
gaps) is unchanged.

## Discovery Questions

Present 6 physical objects and ask the learner to count them twice,
starting from a different object each time — the learner discovers
both counts agree before any formal rule is stated. Recommendation:
guided discovery for the order-invariance observation (directly
experiential); direct instruction for the formal "why" (the sequence's
rigidity, not the specific pairing, fixes the total), since the causal
explanation is not independently rediscoverable from the observation
alone.

## Teaching Sequence

MC-1 (gaps in the sequence) is addressed first, since a rigid, gapless
sequence is the property every later claim depends on. MC-2
(order-dependence of the total) is addressed second, since it concerns
applying an already-valid sequence in two different pairings. MC-3
(zero-starting) is addressed last, since it is a comparatively rarer,
context-specific import from outside mathematics rather than a
structural misunderstanding of the sequence itself.

## Tutor Actions

| Student state | Recommended action | Source |
|---|---|---|
| MC-1 active (sequence has gaps) | WORKED EXAMPLE: gap-detection contrast set (1,3,5,7 vs. 1,2,3,4,5) | Teaching Actions: SHOW §1 |
| MC-2 active (order changes total) | DEMONSTRATION: same set counted in two different orders, same total (librarian scenario) | Teaching Actions: SHOW §3 |
| MC-3 active (zero-starting) | WORKED EXAMPLE: 0-indexed vs. 1-indexed contrast, cross-domain distinction named explicitly | Teaching Actions: SHOW §1 |
| Ready for transfer | THOUGHT EXPERIMENT: librarian's skipped-label error analysis (Blueprint P76) | Teaching Actions: TEST-THINKING §4 |

## Voice Teaching Notes

**Register**: Say "the sequence steps by exactly one, with no gaps"
rather than just "count in order" — the word "exactly" and "no gaps"
are load-bearing, since MC-1 tolerates approximate ordering.

**Wait-time**: After the librarian's skipped-label scenario, give
extended wait-time before revealing the off-by-one consequence — let
the learner work out that skipping one label shifts every subsequent
total by one.

**Load-bearing sentences**:
- "Every next number is exactly one more than the last — no skips, no
  exceptions."
- "The total is always the last label used, no matter which object got
  which label."

**Voice channel note**: See `foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

Directly reusing the Blueprint's own P77 4-problem gate set and P76
transfer probe, not restated in full — cite by reference:

**Gate 1** (Blueprint Item 1): what number comes immediately after 9?
Pass: 10.

**Gate 2** (Blueprint Item 2): is 1, 2, 3, 5, 6 a valid counting
sequence? Pass: no — 4 is missing, a gap.

**Gate 3** (Blueprint Item 3): true/false — counting 8 objects starting
from the 3rd instead of the 1st changes the total. Pass: false.

**Gate 4** (Blueprint Item 4): what is the 7th number in the counting
sequence? Pass: 7.

**Gate 5** (Blueprint P76, independence transfer probe): the librarian
scenario — does rearrangement change the count (no); what total results
from a skipped label (one more than the true count); why, and how could
the error be caught. Pass: correct identification of the off-by-one
effect and a valid detection method (recount, or check against known
capacity).

**Mastery criterion**: 5/5 on the full Blueprint item bank (4 P77 items
+ P76), consistent with KG mastery_threshold 0.95 (⌈0.95×5⌉=5).

## Tutor Recovery Strategy

Likeliest utterance: "but I counted them in a different order and
still got the same number, so does the order even matter?" — the
concept-specific smaller question: "did every object still get exactly
one label, with none skipped?" reframes the observation the learner
already made (same total) into the underlying reason (an unbroken
sequence applied one-to-one always terminates at the same label),
rather than leaving it as an unexplained coincidence.

## Memory Hooks

**Type**: procedural (verifying gap-free, one-to-one sequence
construction via touch-and-count) + declarative (the three defining
properties: starts at 1, steps by 1, no gaps). Review form: fresh
"is this a valid counting sequence?" spot-checks mixing gapped,
zero-started, and valid examples. Interleaving partner:
`math.arith.counting` (the bijection-construction process this
concept's sequence serves as the domain for).

## Transfer Connections

**Near transfer**:
- `math.arith.place-value` (per KG `unlocks`; place value requires the
  sequence to extend coherently past 9 into multi-digit positions)

**Far transfer**:
- `math.arith.number-line` (the sequence's equal-step, no-gap structure
  is exactly what a number line visualizes geometrically)
- `math.arith.subitizing` (sibling child of `math.arith.counting`; both
  concepts concern recognizing "how many," one via the formal sequence,
  the other via instant perceptual recognition of small sets)

## Cross-Subject Connections

Per KG `cross_links` [] (empty) — no Tier 1 cross-subject link exists
for this concept. The zero-indexing misconception (MC-3) draws an
explicit CONTRAST with computer science's array-indexing convention,
but this is a distinguishing note, not a cross_links-driven transfer
probe — not fabricated beyond what the KG states.

## Blueprint References

Blueprint: `docs/curriculum/blueprints/math.arith.counting-sequence.md`
(PACKAGE_READY, all structural/grammar/content/AIR checks PASS).

Full Protocol A teaching sequence (TA-A01 through TA-A03/mastery
gate), Protocol B repair chains (B01, B02), and the P89
spaced-repetition schedule reused by reference above and not restated
in full; the Misconception Registry (MC-1 through MC-3) and the P77/P76
mastery-gate item bank cited directly by ID.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any.

## Curriculum Feedback

No structural KG issues found. This concept's single prerequisite
(`math.arith.counting`) and single unlock (`math.arith.place-value`)
match the Blueprint's own Component 7 exactly. The empty `cross_links`
is consistent with this concept's narrow, foundational scope (naming
and formalizing a sequence already implicit in `math.arith.counting`).

## Version History

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-07-26 | Curriculum Completion Program (math.arith domain, Wave 3, autonomous loop) | Initial entry, grounded in the existing PACKAGE_READY Blueprint. |
