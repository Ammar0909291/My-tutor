# Power Set — `math.found.power-set`

## Identity

- **Concept ID**: `math.found.power-set` (canonical mathematics KG)
- **Curriculum location**: mathematics / foundations (parent:
  `math.found.set-theory`)
- **Prerequisites**: `math.found.subset` — the power set's elements
  ARE the subsets `math.found.subset` already defines.
- **Unlocks**: `math.found.cardinality` (the power set's own size, 2ⁿ,
  is a foundational example in developing general cardinality reasoning).
- **Related** (from KG): `math.found.cardinality`.
- **Difficulty**: developing · **Bloom**: understand · **Mastery
  threshold**: 0.8 · **Est. hours**: 3
- **Blueprint**: `docs/curriculum/blueprints/math.found.power-set.md`
  (cross-link engaged: `math.top.topological-space`, already authored).

## Learning Objective

The learner can: define 𝒫(A) as the set whose elements are exactly the
subsets of A, correctly listing 𝒫(A) completely for a small concrete
set, including both ∅ and A itself as members; state and justify the
counting formula |𝒫(A)|=2^|A| for finite A using the "each element is
either IN or OUT" binary-choice argument, correctly computing |𝒫(A)|
for sets of specified sizes including the boundary case |𝒫(∅)|=1; and
recognize the discrete topology on A (from `math.top.topological-space`)
as a concrete instance of 𝒫(A) used directly as a topology τ, verifying
the three topology axioms hold precisely because 𝒫(A) already contains
every possible subset.

## Core Understanding

The power set collects ALL subsets of A into a single new set: every
possible S with S⊆A becomes ONE element of 𝒫(A) — including ∅
(vacuously a subset of every set, per `math.found.subset`) and A itself
(trivially a subset of itself), both of which must always be listed
even though it can feel tempting to treat them as trivial exceptions to
skip. The 2ⁿ counting formula is not an arbitrary result to memorize —
it counts the number of independent IN/OUT decisions available when
building a subset: go through A's n elements one at a time, decide
independently for each whether it's in or out of the candidate subset,
giving 2×2×⋯×2 = 2ⁿ total distinct choice-sequences, hence 2ⁿ distinct
subsets. The boundary case A=∅ (n=0) gives 2⁰=1 — correct, since
𝒫(∅)={∅} has exactly ONE element (the empty set itself, which genuinely
IS a subset of ∅), not zero. Finally, the discrete topology named in
`math.top.topological-space` as "the whole power set" is not merely
similar to 𝒫(A) — taking τ=𝒫(A) automatically satisfies all three
topology axioms (∅,A∈τ; closure under arbitrary unions; closure under
finite intersections) precisely because 𝒫(A) already contains every
possible subset, leaving nothing a union or intersection could ever
produce outside of it.

## Mental Models

- **Beginner model — "the power set is just a fancy list of subsets, no
  special structure"**: the learner lists subsets but treats ∅ and A as
  optional or trivial, often omitting one or both. Shelf-life warning:
  this model produces systematically incomplete listings the moment
  completeness is checked.
- **Intermediate model — "the power set has exactly 2ⁿ elements, and I
  can count them by listing"**: the learner correctly lists small power
  sets completely (including ∅ and A) and verifies counts against 2ⁿ,
  but may still treat the formula as memorized rather than derived.
  Upgrade trigger: being asked WHY the formula is 2ⁿ specifically,
  rather than just applying it.
- **Advanced model — "2ⁿ counts independent binary choices, and 𝒫(A)
  as a whole can itself be used as a mathematical object (e.g. a
  topology)"**: the learner derives 2ⁿ from the IN/OUT choice argument
  unprompted and recognizes 𝒫(A) is not merely a list but a genuine set
  in its own right, usable as an ingredient in further constructions.
  Upgrade trigger: being asked to verify that 𝒫(A), taken as τ, satisfies
  a topology's closure axioms.
- **Do not upgrade early**: a learner still struggling to list 𝒫(A)
  completely for a concrete small set (beginner model) should not be
  pushed into the topology cross-link (advanced model) before both the
  inclusive-listing habit and the 2ⁿ derivation are independently
  secure — the topology connection presupposes both are already fluent.

## Why Students Fail

The dominant failure is treating ∅ and A itself as "trivial exceptions"
to be omitted from 𝒫(A)'s listing, carrying over an instinct that
"trivial" cases don't need to be explicitly written down. A second,
independent failure is the boundary case 𝒫(∅): learners who correctly
apply 2ⁿ to nonempty sets often guess |𝒫(∅)|=0 ("nothing in A, so
nothing to list"), missing that ∅ itself is a genuine subset of ∅ and
therefore a genuine element of 𝒫(∅). A third failure, specific to the
cross-linked material, is treating "the discrete topology" and "the
power set" as merely similar or numerically coincidental rather than
literally the identical set used two different ways.

## Misconceptions

Reusing the Blueprint's Misconception Registry (Component 6), birth-type
classification added per this program's diagnostic procedure — not
re-derived:

**MC-1 — EMPTY-AND-FULL-SET-OMITTED-FROM-POWER-SET (Foundational
severity; Type 1, overgeneralization of "trivial cases can be
skipped" from ordinary listing habits)**
- *Trigger*: asked whether ∅ and A should be included in 𝒫(A), the
  learner answers "they're trivial, skip them."
- *Repair*: re-walk a complete listing for A={x,y}: ∅, {x}, {y}, {x,y}
  — all FOUR genuinely belong, re-anchoring on `math.found.subset`'s
  own inclusive definition (∅⊆A and A⊆A both hold unconditionally).

**MC-2 — POWER-SET-OF-EMPTY-SET-ASSUMED-EMPTY (High severity; Type 1,
overgeneralization from "A has nothing in it" to "so 𝒫(A) has nothing
in it either," conflating a property of A with a property of 𝒫(A))**
- *Trigger*: asked how many elements 𝒫(∅) has, the learner answers
  "zero."
- *Repair*: directly verify ∅⊆∅ holds (vacuously — nothing in ∅ to
  fail the check), so ∅ is a genuine element of 𝒫(∅), making
  𝒫(∅)={∅} — exactly ONE element, matching 2⁰=1.

**MC-3 — DISCRETE-TOPOLOGY-ASSUMED-DIFFERENT-FROM-POWER-SET (Moderate
severity; Type 3, notation/framing-induced — the two concepts are
introduced in different courses/contexts, so their literal identity is
easy to miss)**
- *Trigger*: asked whether the discrete topology and the power set are
  the same object or merely coincidentally the same size, the learner
  answers "different objects."
- *Repair*: for A={x,y}, directly verify τ=𝒫(A)={∅,{x},{y},{x,y}}
  satisfies all three topology axioms specifically because 𝒫(A) already
  contains every possible subset of A — there is no separate
  "discrete-topology set" being constructed; it IS 𝒫(A), taken directly
  as τ.

## Analogies

- **Best analogy — a menu of every possible combo order**: if a
  sandwich shop has toppings {lettuce, tomato}, the "menu of every
  possible topping combination" includes the no-toppings order (∅) and
  the everything order ({lettuce,tomato}) as genuine, orderable options
  — not exceptions to skip — giving 2²=4 total combinations. Breaking
  point: physical toppings have an obvious "more is more" framing that
  doesn't fully convey why 𝒫(A) itself is treated as a single new SET
  (a "menu," one object) rather than just a count.
- **ANTI-ANALOGY — do NOT say "the power set is basically just counting
  subsets, ∅ and A don't really count as 'real' subsets"**: this
  directly reinforces MC-1 by suggesting the boundary cases are
  exceptions rather than genuine, required members.

## Demonstrations

- **Complete-listing demonstration**: for A={x,y}, list all four subsets
  explicitly (∅,{x},{y},{x,y}), deliberately narrating why ∅ and {x,y}
  are included rather than skipped — directly targets MC-1.
- **Boundary-case demonstration**: for A=∅, directly verify 𝒫(∅)={∅} has
  exactly one element by checking ∅⊆∅ holds vacuously — directly
  targets MC-2.
- **Topology-axiom-verification demonstration**: for A={x,y},
  τ=𝒫(A)={∅,{x},{y},{x,y}}, check all three topology axioms explicitly
  (∅,A∈τ; {x}∪{y}={x,y}∈τ; {x}∩{y}=∅∈τ), confirming they hold
  automatically because nothing a union or intersection could produce
  falls outside 𝒫(A) — directly targets MC-3.

## Discovery Questions

**Need** — asked to list "every possible team roster you could form
from {Alex, Bo}, including the option of fielding no one," the learner
naturally arrives at ∅ and the full pair as legitimate options.
**Playground** — the learner lists 𝒫(A) for several small sets, noticing
the count doubles each time an element is added. **Invention** — the
learner proposes the IN/OUT binary-choice explanation for why the count
doubles per element. **Collision** — asked how many elements 𝒫(∅) has,
the learner's "count subsets" instinct collides with "there's nothing
in ∅," forcing the vacuous-truth resolution — directly targeting MC-2.
**Formalization** — naming 𝒫(A) and the 2ⁿ formula explicitly.
**Compression** — given a fresh set, correctly listing 𝒫(A) completely
and computing |𝒫(A)| via the binary-choice argument without prompting.

## Teaching Sequence

MC-1 (omitting ∅/A) is addressed first, since a learner who has not
internalized inclusive listing cannot reliably reach the correct count
for anything, including the boundary case. MC-2 (𝒫(∅) assumed empty) is
addressed second, as the sharpest test of MC-1's lesson applied to the
smallest possible case. MC-3 (topology identity) is addressed last and
only after both prior misconceptions are resolved, since the topology
cross-link presupposes fluent, correct power-set construction as a
prerequisite skill, not a simultaneous new topic.

## Tutor Actions

From `../../teaching-actions/`: **Demonstration** (the complete-listing
walk, the primary action for MC-1) → **Thought Experiment** (the
𝒫(∅) boundary-case collision, targeting MC-2) → **Worked Example** (the
topology-axiom verification, targeting MC-3, engaging the cross-linked
concept directly). **What doesn't fit**: general topology theory beyond
the discrete-topology instance — that belongs entirely to
`math.top.topological-space`'s own scope; this concept supplies only
the power-set-specific derivation that concept's own treatment assumes.

## Voice Teaching Notes

Listen for "do I really need to write down the empty set and the whole
set, or can I skip those?" — this is MC-1's clearest verbal signature,
and should be met with "every single subset counts, including those
two — try leaving one out and count again." A learner answering "zero"
for |𝒫(∅)| is showing MC-2 directly — prompt: "is ∅ itself a subset of
∅?" The load-bearing sentence: "𝒫(A)'s elements aren't A's elements —
they're A's SUBSETS, every one of them, with no exceptions."

## Assessment Signals

Blueprint's P77/P76 items are suitable seeds for gate-style checks:
complete listing of 𝒫(A) for a 3-element set; computing |𝒫(A)| for a
5-element set via the binary-choice argument (not just citing the
formula); stating and justifying |𝒫(∅)|; verifying the union-closure
axiom for τ=𝒫(A) on a specific pair of subsets. Because MC-1's defining
signature is a systematically incomplete listing rather than a wrong
count, assessment should specifically check whether ∅ and A appear in
the learner's own listing, not just whether the final cardinality
matches 2ⁿ (a learner could reach the right COUNT while genuinely
omitting ∅ and instead including some other set by miscount).

## Tutor Recovery Strategy

Likeliest utterance: "so the power set of nothing is nothing?" — the
concept-specific smaller question: "is the empty set itself a subset of
the empty set?" (walking the subset definition literally: "is every
element of ∅ — of which there are none — also in ∅? vacuously yes")
reframes the confusion from "𝒫(∅) inherits ∅'s emptiness" to "∅ is
itself one genuine member of 𝒫(∅)" — directly isolating MC-2's missing
vacuous-truth step.

## Memory Hooks

**Type**: concept (a construction-and-counting skill built directly on
the already-typed subset relation, plus one context-dependent cross-
link application). Review form: fresh small sets requiring complete
𝒫(A) listings including the boundary case 𝒫(∅), interleaved
periodically with the topology-axiom check to keep the cross-link
connection active rather than isolated to a single lesson. Interleaving
partners: `math.found.subset` (the relation 𝒫(A)'s elements are built
from) and `math.found.cardinality` (this concept's own unlocked
successor, which generalizes the 2ⁿ counting argument further).

## Transfer Connections

- **Near**: `math.found.cardinality`, which generalizes this concept's
  finite counting argument to infinite sets (including the genuinely
  surprising fact that |𝒫(A)|>|A| even for infinite A, Cantor's theorem,
  out of scope here but directly seeded by this concept's own counting
  habit).
- **Far**: `math.top.topological-space`'s discrete topology, verified
  directly in this entry as a concrete instance of τ=𝒫(A).
- **Real-world**: enumerating all possible configurations of a set of
  binary options (e.g. every possible combination of features enabled/
  disabled in a settings menu) as a direct application of the IN/OUT
  binary-choice argument.
- **Expert transfer**: the learner, meeting an unfamiliar mathematical
  object described as "the collection of ALL substructures of a given
  type," automatically checks whether it exhibits power-set-like
  closure properties (as the discrete topology does here).

## Cross-Subject Connections

KG lists `math.top.topological-space` as a cross-link; confirmed
already authored (per the Blueprint's own Component 7 verification).
This entry's Component 3/Demonstrations directly supply the missing
derivation — WHY τ=𝒫(A) satisfies the topology axioms — that
`math.top.topological-space`'s own treatment names but does not itself
re-derive in power-set terms, per the established division-of-labor
convention documented in the Blueprint.

## Blueprint References

Blueprint: `docs/curriculum/blueprints/math.found.power-set.md`.
Key objectives and misconception registry reused by reference above;
the P76 transfer probe (server access-control topology scenario) not
restated in full.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any. The
complete-listing demonstration and the 𝒫(∅) boundary-case walk are
suitable future Explanation Memory seeds; the topology-axiom
verification is a suitable future Probe asset seed.

## Curriculum Feedback

No structural KG issues found. The Blueprint's cross-link verification
(`math.top.topological-space` confirmed authored) is reconfirmed
current as of this entry's authoring date. `math.found.subset`'s own
Unlocks section already names the power set as its principal
successor, correctly deferring all power-set-specific content to this
node rather than pre-empting it — no overlap or duplication found.

## Version History

- 2026-07-26 — initial authoring (Curriculum Completion Program,
  math.found domain, Wave 7). Grounded in the existing Blueprint;
  misconception registry cited by ID with birth-type classification
  added, not restated in full.
