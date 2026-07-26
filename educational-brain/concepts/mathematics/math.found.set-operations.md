# Set Operations — `math.found.set-operations`

## Identity

- **Concept ID**: `math.found.set-operations` (canonical mathematics KG)
- **Curriculum location**: mathematics / foundations (parent:
  `math.found.set-theory`; children in KG: `math.found.union`,
  `math.found.intersection`, `math.found.set-difference`,
  `math.found.complement` — none yet authored)
- **Prerequisites**: `math.found.subset` — the general set-comparison
  facility union/intersection/difference/complement build directly on.
- **Unlocks**: `math.found.venn-diagram` (the standard pictorial
  representation of exactly these four operations), `math.disc.boolean-circuits`
  (not yet authored — cross-link, see Cross-Subject Connections).
- **Related** (from KG): `math.found.venn-diagram`.
- **Difficulty**: foundational · **Bloom**: apply · **Mastery
  threshold**: 0.85 · **Est. hours**: 5
- **Blueprint**: `docs/curriculum/blueprints/math.found.set-operations.md`
  (PACKAGE_READY).

## Learning Objective

The learner can: compute the union (A∪B), intersection (A∩B), and
difference (A\B) of two given sets; compute the complement Aᶜ relative
to a specified universal set U, correctly recognizing that complement
is only well-defined once U is fixed; and correctly apply combinations
of these operations in a specified grouping, distinguishing operations
whose result is grouping-independent (repeated ∪ or repeated ∩ alone)
from mixed-operation expressions where grouping genuinely changes the
result.

## Core Understanding

Given sets A, B (subsets of a universal set U), four standard
operations combine them into new sets: union (everything in EITHER),
intersection (only what's in BOTH), difference (what's in A with B's
elements removed), and complement (everything in U that's NOT in A).
Together these form a Boolean algebra whose laws — most notably De
Morgan's laws, (A∪B)ᶜ=Aᶜ∩Bᶜ and (A∩B)ᶜ=Aᶜ∪Bᶜ — mirror the logical
connectives OR/AND/NOT directly, since a set can be read as "the things
satisfying a condition" and an element's membership as "satisfying that
condition." Two structural facts distinguish complement from the other
three: it requires external context (a fixed universal set U) that
union/intersection/difference don't need, and it is the operation most
likely to be attempted without that context ever being specified.
Separately, while union alone (or intersection alone) is associative —
repeated grouping never changes the result — MIXING union and
intersection makes grouping genuinely matter, exactly as mixing
addition and multiplication does in ordinary arithmetic.

## Mental Models

- **Beginner model — "these are just four separate vocabulary words to
  memorize"**: the learner recalls definitions in isolation without a
  unifying picture, prone to swapping ∪/∩ under time pressure. Shelf-life
  warning: memorized vocabulary collapses on any problem requiring
  computation rather than definition recall.
- **Intermediate model — "each operation is a specific region of an
  overlapping-circles picture"**: the learner correctly computes each
  operation via a mental (or drawn) two-circle sketch — the whole
  combined region for union, only the overlap for intersection, one
  circle minus the overlap for difference. Upgrade trigger: being asked
  to compute complement, which has no natural "two-circle overlap"
  picture without first drawing in a bounding universal-set rectangle.
- **Advanced model — "complement needs a stated universal set, and
  mixed-operation grouping needs explicit parentheses respected"**: the
  learner treats complement as fundamentally different from the other
  three (context-dependent) and treats grouping in mixed expressions
  with the same care as arithmetic order-of-operations. Upgrade trigger:
  being given the SAME set A with two DIFFERENT universal sets and
  asked to compute Aᶜ for each, landing on genuinely different answers.
- **Do not upgrade early**: a learner still relying purely on the two-
  circle picture (intermediate model) should not be pushed into
  De Morgan's law derivations (a further, expert-level extension not
  required at this concept's `bloom: apply` level) before complement's
  universal-set dependency and mixed-grouping sensitivity are both
  independently secure.

## Why Students Fail

The dominant failure is attempting to compute a complement without
first asking "complement relative to WHAT?" — of the four operations,
complement is uniquely underspecified without external context, and
learners accustomed to union/intersection/difference (which need only
the two given sets) default to treating complement the same way. A
second, independent failure is over-applying the correct fact that
union-alone and intersection-alone are associative to the INCORRECT
belief that grouping never matters for MIXED expressions like
(A∪B)∩C — a direct parallel to assuming multiplication's associativity
implies parentheses are irrelevant when addition and multiplication are
combined.

## Misconceptions

Reusing the Blueprint's Misconception Registry (Component 6), birth-type
classification added per this program's diagnostic procedure — not
re-derived:

**MC-1 — COMPLEMENT-COMPUTED-WITHOUT-UNIVERSAL-SET (Type 5,
instruction-induced: union/intersection/difference are all correctly
introduced as needing only two sets, and complement is easy to
mis-extend into the same pattern without the universal-set caveat being
made sufficiently salient)**
- *Trigger*: asked "what is Aᶜ for A={2,4,6}?" without a stated
  universal set, the learner attempts to answer anyway rather than
  asking "relative to what?"
- *Repair*: work the SAME set A={2,4,6} against two different universal
  sets — U={1,...,10} gives Aᶜ={1,3,5,7,8,9,10}; U={2,4,6,8,10} gives
  Aᶜ={8,10} — a genuinely different, much smaller answer, using the
  identical A. "Complement is ALWAYS relative to a specific universal
  set — always ask 'complement of what, within what?' before computing."

**MC-2 — MIXED-OPERATION-GROUPING-ASSUMED-IRRELEVANT (Type 1,
overgeneralization from the correct associativity of a single repeated
operation to the mixed-operation case, where it no longer holds)**
- *Trigger*: presented (A∪B)∩C and A∪(B∩C) for specific sets, the
  learner assumes they're equal without checking.
- *Repair*: for A={1,2}, B={2,3}, C={3,4}: (A∪B)∩C = {1,2,3}∩{3,4} =
  {3}; A∪(B∩C) = {1,2}∪{3} = {1,2,3} — genuinely different results
  ({3} vs. {1,2,3}). "Using the SAME operation repeatedly, grouping
  never changes the answer — that's associativity. Mixing DIFFERENT
  operations, exactly like mixing addition and multiplication, means
  parentheses genuinely change the result."

**MC-3 — DIFFERENCE-ASSUMED-SYMMETRIC (Moderate severity; Type 1,
overgeneralization from union/intersection, both of which genuinely ARE
symmetric — A∪B=B∪A and A∩B=B∩A — making it natural to assume
difference shares this property)**
- *Trigger*: asked whether A\B equals B\A in general.
- *Repair*: for A={1,2,3,4}, B={3,4,5,6}: A\B={1,2} (A's elements not
  in B) but B\A={5,6} (B's elements not in A) — genuinely different
  sets. "Difference is order-dependent — A\B removes B's elements FROM
  A; B\A removes A's elements FROM B. These are not the same operation
  run backward; they're two different results."

## Analogies

- **Best analogy — library catalog tags**: two overlapping circles
  labeled "fiction" and "available now" — union is every book tagged
  either way, intersection is books tagged both, difference is fiction
  books currently checked out excluded (fiction minus available), and
  complement of "fiction" needs the librarian to specify the CATALOG
  being complemented against (the whole library? just the new-releases
  shelf?) before "not fiction" means anything definite. Breaking point:
  physical library shelving doesn't naturally represent the difference
  operation's asymmetry as vividly as it represents overlap.
- **ANTI-ANALOGY — do NOT say "complement is just 'everything else,'
  full stop"**: "everything else" without naming a bounding universal
  set is precisely the error MC-1 makes — "everything else" is only
  meaningful once "everything" itself has been fixed.

## Demonstrations

- **Four-operations-on-one-pair demonstration**: for A={1,2,3,4},
  B={3,4,5,6}, compute all four quantities side by side — A∪B, A∩B,
  A\B, B\A — making the asymmetry of difference (A\B≠B\A) directly
  visible against the symmetry of union and intersection — directly
  targets MC-3.
- **Two-universal-sets demonstration**: compute Aᶜ for the SAME A under
  two different U's, landing on genuinely different answers — directly
  targets MC-1.
- **Mixed-grouping demonstration**: compute (A∪B)∩C and A∪(B∩C) for the
  same three sets, landing on genuinely different results — directly
  targets MC-2.

## Discovery Questions

**Need** — asked to describe "patients with diabetes but not
hypertension" from two hospital tag-sets, the learner naturally invents
a "remove one set's elements from the other" operation (difference).
**Playground** — the learner computes union, intersection, and
difference for several concrete pairs, noticing union/intersection stay
the same when the sets swap order but difference doesn't. **Invention**
— the learner proposes that "complement" needs a stated boundary before
it means anything, having tried and failed to answer "what's NOT in A"
without one. **Collision** — computing (A∪B)∩C two different ways and
getting two different answers forces confronting the mixed-grouping
sensitivity directly. **Formalization** — naming all four operations
and the complement's universal-set dependency explicitly. **Compression**
— given a fresh multi-operation expression with explicit grouping,
computing it correctly by respecting the given parentheses.

## Teaching Sequence

MC-1 (complement without a universal set) is addressed first and given
the most weight, since complement is the one operation, among the four,
that behaves fundamentally differently from the other three — it
requires context the others don't need — making it a natural point of
oversight the moment it's introduced. MC-2 (mixed-operation grouping) is
addressed second, directly parallel to arithmetic's own order-of-
operations lesson. MC-3 (difference symmetry) is woven into the initial
four-operations demonstration rather than treated as a separate stage,
since it is most naturally caught by direct side-by-side comparison
with the two operations that genuinely ARE symmetric.

## Tutor Actions

From `../../teaching-actions/`: **Demonstration** (overlapping-circles
sketch for union/intersection/difference, the primary action for
introducing the four operations) → **Worked Example** (the two-
universal-sets complement contrast, targeting MC-1, and the mixed-
grouping contrast, targeting MC-2) → **Drill** (rapid four-operation
computations on varied set pairs for FRAGILE/correct-but-slow learners).
**What doesn't fit**: a formal Boolean-algebra axiomatic treatment or
full De Morgan's-law derivation — those belong to later, more abstract
treatment; this concept's `bloom: apply` level targets correct
computation, not axiomatic proof.

## Voice Teaching Notes

Listen for a learner answering a complement question without first
asking "relative to what?" — this is MC-1's clearest verbal signature,
and should be met immediately with "and what's the universal set here?"
rather than supplying it for them. A learner computing A\B and B\A and
expecting the same answer is showing MC-3 — prompt directly: "which set
are we removing FROM which?" The load-bearing sentence: "complement
always needs a stated universal set — always ask 'complement of what,
within what?' before computing anything."

## Assessment Signals

Blueprint's P77/P76 items are suitable seeds for gate-style checks:
computing all four operations on one concrete pair; computing the SAME
set's complement against two different universal sets; verifying a
mixed-grouping expression two ways to confirm they differ; verifying
one direction of De Morgan's law directly by computation. Because MC-1's
defining signature is proceeding WITHOUT asking a clarifying question,
assessment should specifically include at least one complement item
with NO universal set given, to see whether the learner flags the
missing information rather than guessing.

## Tutor Recovery Strategy

Likeliest utterance: "so the complement is everything not in A?" — the
concept-specific smaller question: "not in A, out of WHAT total
collection?" reframes the confusion from "complement is a self-
contained operation on one set" to "complement is a relationship
between a set and a stated boundary" — directly isolating MC-1's
missing universal-set anchor.

## Memory Hooks

**Type**: procedural (four related computation procedures, plus one
context-dependency rule for complement specifically). Review form:
fresh set pairs requiring all four operations computed together,
periodically paired with a deliberately ambiguous complement prompt (no
U stated) to keep MC-1's guard-rail active. Interleaving partners:
`math.found.subset` (the containment facility these operations build
on) and, once authored, `math.found.venn-diagram` (the pictorial
formalization of exactly these four regions).

## Transfer Connections

- **Near**: `math.found.venn-diagram`, which formalizes this concept's
  informal circle-sketches into the standard pictorial representation.
- **Far**: `math.disc.boolean-circuits` (not yet authored) — AND/OR/NOT
  logic gates directly parallel intersection/union/complement, and
  De Morgan's laws directly parallel standard circuit-simplification
  identities; this parallel is named but not developed further here,
  pending that concept's authoring.
- **Real-world**: database query logic (WHERE clauses combining AND/OR/
  NOT filters directly mirror ∩/∪/complement over record sets), tag-
  based filtering systems (the hospital patient-database framing used
  in the Blueprint's own transfer probe).
- **Expert transfer**: the learner, meeting an unfamiliar Boolean-
  algebra-like structure (circuits, database filters, propositional
  logic), automatically checks for the same four-operation pattern and
  the same "does this operation need external context" question that
  complement raised here.

## Cross-Subject Connections

KG lists `math.disc.boolean-circuits` as a cross-link; confirmed via
directory listing that no blueprint yet exists at
`docs/curriculum/blueprints/math.disc.boolean-circuits.md` (matching
the Blueprint's own Component 7 finding), so this entry does not
fabricate a cross-subject connection beyond naming the anticipated
relationship (AND/OR/NOT gates as the circuit-level image of
intersection/union/complement) for future reference once that concept
exists.

## Blueprint References

Blueprint: `docs/curriculum/blueprints/math.found.set-operations.md`.
Key objectives and misconception registry reused by reference above,
not duplicated in full (Components 1-6 and the P76 hospital-database
transfer probe in particular).

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any. The
Blueprint's four-operation worked example (Component 4) and the two-
universal-sets contrast are suitable future Explanation Memory seeds;
the P77 problem set is a suitable future Probe asset seed.

## Curriculum Feedback

No structural KG issues found. The Blueprint's own cross-link
verification (`math.disc.boolean-circuits` confirmed absent) is
reconfirmed current as of this entry's authoring date. Estimated hours
(5) and mastery threshold (0.85) appropriately reflect this concept's
genuinely broader scope (four operations plus a context-dependency rule
plus a grouping-sensitivity rule) relative to the single-clause
concepts authored earlier in this Wave.

## Version History

- 2026-07-26 — initial authoring (Curriculum Completion Program,
  math.found domain, Wave 7). Grounded in the existing Blueprint;
  misconception registry cited by ID with birth-type classification
  added, not restated in full.
