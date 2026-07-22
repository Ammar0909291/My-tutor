# Generalization — `math.found.generalization`

## Identity

- **Concept ID**: `math.found.generalization` (canonical mathematics KG)
- **Curriculum location**: mathematics / foundations
- **Prerequisites**: `math.found.pattern-recognition` (the load-bearing
  part: the 4-step process of finding a rule that fits given instances)
  and `math.found.abstraction` (the load-bearing part: identifying which
  observed properties are essential vs. incidental) — generalization is
  a further, distinct act built on top of both: it asserts the
  identified structure holds for an entire broad class, most of which
  was never directly examined.
- **Unlocks** (from KG): `math.found.proof`, `math.found.axiom` — a
  generalization is a conjecture; proof is what would be needed to
  establish it, and axioms are the kind of foundational generalization
  a system simply accepts without proof.
- **Difficulty**: foundational · **Bloom**: evaluate · **Mastery
  threshold**: 0.75 · **Est. hours**: 4

## Learning Objective

The learner can: distinguish generalization (asserting a claim for a
broad, often infinite class beyond the examined cases) from pattern
recognition (fitting a rule to a specific given sequence) and
abstraction (identifying essential shared properties); recognize that a
generalization is a conjecture, never proven by confirming examples
alone; and distinguish a valid generalization (genuine invariant
structure across the full class) from an overgeneralization (holds only
for the examined cases) using a concrete counterexample test.

## Core Understanding

Generalization takes pattern-recognition's rule and abstraction's
essential-property judgment one step further: it asserts the identified
structure extends to an entire class of cases, the overwhelming majority
of which have never been checked. This is precisely why a generalization
is a CLAIM requiring justification, not a report of what was observed —
and why no finite number of confirming cases, however large, can prove
it: $n^2+n+41$ is prime for every one of $n=0$ through $39$ (forty
straight confirmations) and then fails at $n=40$. Confirmation increases
plausibility; only a proof, or an exhaustive check of a genuinely finite
class, establishes certainty.

## Mental Models

- **Beginner model — "if it worked every time I tried, it always
  works"**: a claim confirmed on every tested case is treated as
  established. This is the arriving, incorrect default rather than a
  useful first step — the whole concept exists to replace it. Shelf-life
  warning delivered at installation: "checking more cases will make a
  claim feel MORE certain, but feeling certain and being proven are
  different things — we're about to see exactly how different."
- **Intermediate model — "confirmation is evidence, not proof"**: the
  learner accepts that more confirming cases raise plausibility without
  establishing certainty, and actively looks for a genuine counterexample
  rather than stopping at confirmation. Upgrade trigger: the
  $n^2+n+41$ example's failure at $n=40$ after 40 straight successes.
- **Advanced model — "test structurally atypical cases, not just more of
  the same kind"**: the learner recognizes that testing many
  SIMILAR cases (e.g. only odd primes) doesn't genuinely test a claim
  about a broader, structurally varied class (all primes) — the Blueprint's
  own even-prime counterexample ($2+3=5$) is the canonical demonstration.
- **Expert model — "identify the genuine invariant structure before
  generalizing"**: the learner asks, before generalizing from several
  similar cases, WHAT specific structural property those cases share
  that would actually cause the pattern to hold — and generalizes only
  to the class that genuinely has that property (e.g. "every
  parallelogram's diagonals bisect each other," not the broader,
  false "every quadrilateral's diagonals bisect each other").
- **Do not upgrade early**: a learner who has not yet internalized that
  confirmation ≠ proof (intermediate model) should not be pushed into
  identifying genuine invariant structure (expert model) — the
  Blueprint's own Teaching Action sequence (A01 introduces the
  generalization-as-further-act idea using the polynomial failure
  before any structural-cause reasoning is asked for) reflects this
  ordering.

## Why Students Fail

Two separable failure mechanisms, matching the Blueprint's own
misconception registry. First, learners transfer an everyday intuition
that repeated confirmation IS proof (if something works every single
time you try it, what more could you want?) — this intuition is
correct enough in daily life that its failure in mathematics is
genuinely surprising and requires a dramatic counterexample to dislodge.
Second, and more subtly, learners who DO understand that testing matters
often fail to test cases that are STRUCTURALLY different from each
other, unknowingly restricting their tests to a narrow, similar-looking
subset and mistaking that subset's confirmation for confirmation of the
full intended class.

## Misconceptions

Reused from the Blueprint's Component 6 Misconception Registry (MC-1
through MC-3) by reference, with birth-type classification added:

- **MC-1 — "Confirming cases constitute proof" (Type 1,
  overgeneralization from the everyday, largely reliable heuristic "if
  it happens every time, it's a rule")**: Foundational. Full conflict
  evidence, bridge, and replacement text: Blueprint Component 6, MC-1
  (the $n^2+n+41$ example, failing at $n=40$ after 40 confirmations).
- **MC-2 — "Insufficient variation in tested cases" (Type 1,
  overgeneralization — a subtler version of MC-1, where SOME testing
  discipline is present but the tested cases share an unexamined
  structural similarity)**: Foundational. Full content: Blueprint
  Component 6, MC-2 (the odd-primes-only sum test, refuted by
  $2+3=5$).
- **MC-3 — "Surface similarity mistaken for invariant structure" (Type
  1, overgeneralization from a genuine shared property of the examined
  cases to a broader class lacking that property)**: Moderate severity.
  Full content: Blueprint Component 6, MC-3 (the
  square/rectangle/rhombus diagonal-bisection example, refuted by a
  kite).

## Analogies

- **Best analogy — a weather forecaster's confidence vs. certainty**: a
  forecaster who has correctly predicted rain 40 days in a row is more
  CONFIDENT about day 41, but has not PROVEN it will rain — confidence
  from repetition and logical certainty are different things, exactly
  the MC-1 distinction. Breaking point: weather forecasting never
  achieves certainty even in principle; some mathematical generalizations
  (finite classes) genuinely CAN be exhaustively checked and thereby
  proven — the analogy should not imply mathematical generalizations are
  always merely probable.
- **Alternative — a sample survey vs. a full census**: testing several
  cases is like surveying a sample; if the sample isn't representative
  (all one type), the conclusion doesn't transfer to the full population
  — directly models MC-2's "insufficient variation" failure. Breaking
  point: surveys quantify uncertainty statistically; mathematical
  generalization's uncertainty is not usefully quantified the same way
  (one counterexample is fully fatal, not just "unlikely").
- **ANTI-ANALOGY — do NOT say "enough examples basically count as
  proof, mathematicians are just extra careful"**: this directly
  installs MC-1 by framing the confirmation/proof distinction as a
  matter of degree or professional caution rather than a genuine
  logical gap — a generalization with a million confirming cases and one
  failing case is simply FALSE, not "mostly true."

## Demonstrations

- **The $n^2+n+41$ demonstration** (Blueprint Example 1): forty
  consecutive confirming cases, then the $n=40$ failure — the canonical,
  dramatic MC-1 collision.
- **The odd-primes-sum demonstration** (Blueprint Example 2): several
  confirming odd-prime sums, then the $2+3=5$ refutation — the canonical
  MC-2 collision.
- **The quadrilateral-diagonals demonstration** (Blueprint Example 3):
  square/rectangle/rhombus all confirming, then the kite refutation,
  with the correct narrower generalization (parallelograms) recovered —
  the canonical MC-3 collision.

## Discovery Questions

**Need** — presented with the $n^2+n+41$ claim and asked to test it, the
learner checks several values and finds all prime, building confidence.
**Playground** — the learner is invited to keep testing further values.
**Invention** — the learner, after many confirmations, is asked to state
how confident they are that the pattern holds for ALL $n$, and typically
states high confidence or certainty. **Collision** — the tutor reveals
$n=40$: $1681=41^2$, composite. **Formalization** — naming the
confirmation/proof distinction and the "one counterexample is fatal"
asymmetry explicitly. **Compression** — immediate reapplication: the
learner is given the odd-primes-sum claim and asked to test it
critically, checking specifically for structural variation this time.

## Teaching Sequence

MC-1 (confirmation ≠ proof) must be repaired before MC-2 (insufficient
variation) is introduced, per the Blueprint's own structure — a learner
who still believes confirmation IS proof has no reason to worry about
WHICH cases they tested, since more of any kind would feel sufficient.
MC-3 (surface similarity vs. invariant structure) is the most advanced
of the three and is sequenced last, since it requires the learner to
already be actively hunting for what could go wrong (the disposition
MC-1 and MC-2's repairs install) before asking them to reason about WHY
a pattern might not transfer.

## Tutor Actions

From `../../teaching-actions/`: **Demonstration/Worked Example** (the
three collision examples in sequence) → **Prediction** (attached
throughout — "how confident are you, and why?" before each reveal) →
**Error Analysis** (given a claimed generalization with a subtle
insufficient-variation flaw, the learner identifies the gap). **What
doesn't fit**: presenting the confirmation/proof distinction as an
abstract rule before any collision — per the Blueprint's own design, all
three Teaching Actions lead with a concrete worked example, never with
the abstract statement first.

## Voice Teaching Notes

Listen for confidence language scaling with case count ("I've checked
so many, it HAS to be true") — this is MC-1's clearest verbal signature.
A learner who, when asked to test a claim, spontaneously reaches for
cases similar to ones already tried (rather than deliberately seeking a
structurally different case) is showing MC-2 behaviorally, even without
a verbal claim. The load-bearing sentence: "confirmation increases
plausibility; only proof — or one counterexample — settles it."

## Assessment Signals

The Blueprint's own Component 4 worked examples double as its assessment
items (each is explicitly mapped to breaking a specific MC) — not
re-authored here. Diagnostic interpretation this entry adds: a learner
who correctly identifies that MC-1's polynomial claim needs more testing
but STOPS after finding a few more confirming cases (rather than
continuing toward $n=40$ or reasoning about why an eventual failure is
possible) has partially but not fully internalized the asymmetry — this
is a different, shallower gap than confidently declaring the claim
proven, and should route to the "how would you know when to stop
testing" question rather than a full MC-1 re-repair.

## Tutor Recovery Strategy

Likeliest utterance: "but it worked every single time" as a defense of a
refuted generalization — the concept-specific smaller question: "how
many more times would you need to check before you could call it
proven — is there a number?" (there isn't, for a universal claim over
an infinite class) — this question makes the logical gap concrete
without requiring abstract argument.

## Memory Hooks

**Type**: concept (an evaluative judgment about a class of claims), with
an embedded procedural skill (deliberately seeking structurally atypical
test cases). Review form: fresh generalization claims across contexts,
never rote recall of "confirmation isn't proof" as a slogan.
Interleaving partners: `math.found.pattern-recognition` and
`math.found.abstraction` — mixed practice items requiring the learner to
say which of the three (pattern-recognition, abstraction,
generalization) a given step of reasoning represents directly targets
LO1's distinction and prevents the three from blurring together.

## Transfer Connections

- **Near**: a fresh numeric or geometric claim tested for confirmation
  vs. genuine proof.
- **Far**: statistical claims in other subjects (a scientific hypothesis
  confirmed by many experiments is still not "proven" the way a
  mathematical theorem is — a related but distinct epistemic standard).
- **Real-world**: evaluating a claim like "this always happens" heard in
  daily life by asking whether the supporting cases were genuinely
  varied or all similar.
- **Expert transfer**: the learner spontaneously asks, on hearing ANY
  broad claim supported only by examples, "were the examples
  structurally varied, and is there a reason this couldn't fail?" —
  evidence the disposition has become general, not classroom-bound.

## Cross-Subject Connections

None via KG `cross_links` (empty for this node). The confirmation/proof
distinction has an informal parallel in the philosophy of science
(Popperian falsifiability) and in statistical reasoning generally, but
this is not KG-encoded for this node; not fabricated here.

## Blueprint References

`docs/curriculum/blueprints/math.found.generalization.md` — read in
full. This entry reuses by reference: the Misconception Registry
(Component 6, MC-1–MC-3), the three worked examples (Component 4), and
the Teaching Actions ordering (Component 5). Not restated beyond what's
needed to cite it.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any.

## Curriculum Feedback

None found. The KG's two-item prerequisite list and two-item unlocks
list match the Blueprint's Component 0 exactly.

## Version History

- 2026-07-22 — initial authoring (Curriculum Completion Program,
  math.found domain, Wave 2). Anchored to the live KG node and the
  existing Blueprint; all 3 misconceptions reused by reference.
