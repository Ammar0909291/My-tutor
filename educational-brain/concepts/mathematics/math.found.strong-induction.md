# Strong Induction — `math.found.strong-induction`

## Identity

- **Concept ID**: `math.found.strong-induction` (canonical mathematics
  KG)
- **Curriculum location**: mathematics / foundations (parent:
  `math.found.proof-by-induction`; no children in KG)
- **Prerequisites**: `math.found.proof-by-induction` (the standard
  two-part base-case/inductive-step structure this concept modifies).
- **Unlocks**: none listed in KG `unlocks` for this node.
- **Related** (from KG): `math.found.well-ordering-principle`.
- **Difficulty**: developing · **Bloom**: create · **Mastery
  threshold**: 0.75 · **Est. hours**: 4
- **Blueprint**: none exists yet in `docs/curriculum/blueprints/` for
  this concept — this entry states that fact explicitly per this
  program's standing convention rather than fabricating one.
- **Aliases** (from KG): "complete induction", "course-of-values
  induction".

## Learning Objective

The learner can: state the structural difference between standard
(weak) induction and strong induction — the inductive step may assume
P holds for ALL values from the base up to n, not just P(n) alone;
correctly identify when a proof genuinely requires strong induction
because the inductive step needs to reach back further than the
immediately preceding case; and recognize that strong induction and
standard induction are logically equivalent in proving power, so
"strong" refers to the richer HYPOTHESIS available, not to a larger
class of provable statements.

## Core Understanding

`math.found.proof-by-induction` already establishes the standard
two-part structure: base case P(n₀), plus inductive step P(k)⟹P(k+1)
for arbitrary k. **Strong induction** modifies only the inductive step:
instead of assuming just P(k), it assumes P(n₀), P(n₀+1), …, P(k) ALL
hold (everything from the base case up through k), and derives P(k+1)
from this entire accumulated set. This is useful precisely when
deriving P(k+1) genuinely requires reaching back further than the
single immediately-preceding case — for example, proving every integer
≥2 factors into primes: to factor a composite k+1=a×b (with a,b<k+1),
one needs the prime-factorization property to already hold for BOTH a
and b, which could be any smaller values, not necessarily k itself.
Standard induction's single hypothesis P(k) cannot directly supply
information about an arbitrary smaller a or b; strong induction's full
accumulated hypothesis can. Critically, standard induction and strong
induction are **logically equivalent** in what they can prove — any
statement provable by strong induction is also provable by standard
induction (via a suitable auxiliary statement Q(n) := "P(n₀) AND P(n₀+1)
AND … AND P(n) all hold", to which standard induction applies
directly) — so "strong" describes the richer HYPOTHESIS available at
each step, not a larger class of theorems reachable. The base case
requirement does not disappear; some proofs by strong induction require
verifying MULTIPLE base cases directly (whenever the inductive step's
reach-back genuinely needs more than one prior value to be already
established before it can even be invoked).

## Mental Models

- **Beginner model — "strong induction just lets you assume more, so
  it's automatically more powerful than regular induction"**: the
  learner treats "strong" as meaning "provides genuinely new proving
  power," missing that both techniques prove exactly the same class of
  statements. Shelf-life warning: this model leads to reflexively
  reaching for strong induction even when standard induction's single
  hypothesis already suffices, obscuring which technique is more
  natural for a given proof.
- **Intermediate model — "strong induction lets the inductive step use
  ALL prior cases, useful when the (k+1)-th case genuinely depends on
  some earlier value other than k"**: the learner correctly identifies
  situations warranting strong induction (like prime factorization,
  where a and b could be any smaller values) but may not yet see the
  equivalence-in-power fact, still believing strong induction proves
  strictly more. Upgrade trigger: being asked whether every statement
  provable by strong induction could, in principle, also be proven by
  standard induction.
- **Advanced model — "strong and standard induction are logically
  equivalent in proving power; strong induction is a convenience that
  supplies a richer hypothesis exactly when a proof's inductive step
  needs to reach back further than n alone"**: the learner fluently
  chooses whichever technique is more natural for a given statement,
  correctly reasons about the equivalence via the auxiliary-statement
  construction, and recognizes when multiple base cases are required.
  Upgrade trigger: being asked to construct the auxiliary statement
  Q(n) that converts a strong-induction proof into a standard one.
- **Do not upgrade early**: a learner still uncertain WHEN strong
  induction is genuinely needed versus merely convenient
  (beginner/intermediate boundary) should not be pushed toward the
  formal equivalence construction (advanced model) before at least one
  worked example (prime factorization) has made the reach-back
  necessity concrete.

## Why Students Fail

The dominant failure believes strong induction is a strictly more
powerful technique that proves a larger class of statements than
standard induction, missing that the two are logically equivalent —
every strong-induction proof can be converted into a standard-induction
proof of a suitably constructed auxiliary statement. A second failure
reaches for strong induction reflexively on every problem, unable to
recognize when the inductive step's single-preceding-case hypothesis
already suffices, obscuring which technique most naturally fits a given
proof and unnecessarily complicating simple inductions. A third failure
forgets that some strong-induction proofs require verifying MULTIPLE
explicit base cases — not just P(n₀) — because a inductive step's
reach-back may need two or more small values to already be established
directly (rather than derivable from even smaller ones) before the
step can be invoked at all.

## Misconceptions

No Blueprint exists for this concept; misconceptions authored directly
via the birth-taxonomy diagnostic procedure
(`educational-brain/misconceptions/01-birth-types.md`).

### MC-1: STRONG-INDUCTION-ASSUMED-MORE-POWERFUL (Foundational; Type 3 — language contamination)
**Trigger**: asked whether strong induction can prove statements that
standard induction cannot, the learner answers "yes, that's why it's
called strong."
**Diagnostic procedure applied**: (1) Ambiguous phrasing? Partially —
the word "strong" itself, in ordinary English, connotes greater
capability, directly inviting this reading. (2) Perceptual/language
shortcut? Yes — the technical term "strong" is imported with its
everyday-English connotation of superiority rather than its precise
technical meaning (a richer hypothesis, not a larger provable class).
(3) Classified Type 3 language contamination: the ordinary-language
sense of "strong" is imported wholesale as the technical meaning.
**Repair**: any statement provable by strong induction can be converted
into a standard-induction proof of the auxiliary statement Q(n) := "P
holds for every value from the base case through n." Q(n) is proven by
STANDARD induction (Q(k)⟹Q(k+1) uses exactly the same reasoning strong
induction's step used), and Q(n)⟹P(n) trivially. So the two techniques
prove the identical class of statements — "strong" names the
hypothesis's richness, not the technique's reach.

### MC-2: STRONG-INDUCTION-OVERUSED-BY-DEFAULT (Moderate; Type 1 — overgeneralization)
**Trigger**: given a straightforward problem where P(k) alone
(standard induction) already suffices, the learner reaches for strong
induction's full accumulated hypothesis anyway, unable to identify that
the simpler tool applies.
**Repair**: for the sum formula 1+2+⋯+n=n(n+1)/2, the inductive step
needs only P(k) (the sum up to k) to derive P(k+1) — no reach-back to
smaller values is required. Contrast directly with prime factorization,
where factoring k+1=a×b genuinely requires the property to hold for a
and b, which could be any values smaller than k+1, not necessarily k
itself — THIS is when strong induction earns its keep. The diagnostic
question: "does deriving the next case require information about the
immediately preceding case only, or about some possibly-much-smaller
earlier case?"

### MC-3: MULTIPLE-BASE-CASES-OMITTED (Moderate; Type 1 — overgeneralization)
**Trigger**: constructing a strong-induction proof, the learner states
only a single base case P(n₀), even when the inductive step's
reach-back genuinely requires two or more small values to already be
directly established.
**Repair**: for a recurrence like "every integer n≥2 can be written as
a sum of 2s and 3s" (n=2: 2; n=3: 3; n=4: 2+2; n≥5: (n−2)+2 or use the
n−3 case plus a 3), the inductive step for n≥5 reaches back to n−2 or
n−3 — but the argument only becomes fully general once n=2 AND n=3 are
BOTH verified directly as base cases, since the reach-back for n=4
would otherwise point to n=2 and n=1, and n=1 isn't representable at
all under this problem's own domain (n≥2). Multiple base cases are
sometimes structurally necessary, not optional thoroughness.

## Analogies

**Primary — climbing scaffolding versus a domino chain**: standard
induction is like a row of dominoes, where each domino's fall depends
only on the ONE immediately before it. Strong induction is like
climbing scaffolding where each new platform's stability depends on
ALL platforms built so far, not just the one directly below — useful
when a new platform's construction genuinely needs support from
several earlier platforms, not just the adjacent one.

**Anti-analogy to retire**: "Strong induction is the upgraded, more
powerful version of induction — use it whenever you can." This directly
invites both MC-1 (implying greater proving power) and MC-2
(encouraging reflexive overuse) by framing strong induction as a
strictly superior default rather than a tool suited to a specific
structural need (reach-back beyond the immediately preceding case).

## Demonstrations

**Prime factorization (the canonical case for strong induction)**:
prove every integer n≥2 has a prime factorization. Base case (n=2):
2 is itself prime. Inductive step: assume every integer from 2 through
k has a prime factorization (the FULL accumulated hypothesis). For k+1:
either k+1 is prime (done), or k+1=a×b for some 2≤a,b≤k — by the
accumulated hypothesis, BOTH a and b have prime factorizations
(since both are ≤k, covered by the hypothesis range), so k+1's
factorization is their combination.

**Sum-of-2s-and-3s (illustrates MC-3's multiple-base-case requirement)**:
prove every integer n≥2 can be written as a sum of 2s and 3s. Base
cases n=2 (2) and n=3 (3) verified directly. Inductive step for n≥4:
assuming the property holds for n−2 (which is ≥2, covered by the
accumulated hypothesis), write n=(n−2)+2.

**Equivalence-construction sketch (breaks MC-1)**: given a strong-
induction proof of P(n), define Q(n):="P(n₀) and P(n₀+1) and … and
P(n) all hold." Q(n₀) is exactly the strong-induction base case.
Q(k)⟹Q(k+1): Q(k) already IS the strong-induction hypothesis, so the
strong-induction step directly gives P(k+1), and combined with Q(k)
gives Q(k+1). This is now a completely standard induction proof, of Q
rather than P directly — demonstrating strong induction proves nothing
standard induction couldn't, via this systematic conversion.

## Discovery Questions

Present the prime-factorization goal and ask the learner what happens
if they try to prove it with ONLY the assumption "P(k) holds" (standard
induction's single hypothesis) — the learner discovers that factoring
k+1=a×b requires knowing whether a and b individually factor into
primes, and neither a nor b is necessarily k, directly experiencing the
reach-back need before strong induction is named. Recommendation:
guided discovery for the reach-back-necessity insight (directly
experiential from attempting the standard-induction approach and
getting stuck); direct instruction for the formal equivalence-via-Q(n)
construction (MC-1's repair), since constructing the correct auxiliary
statement is not independently rediscoverable without guidance.

## Teaching Sequence

MC-1 (strong induction assumed more powerful) is addressed first, since
it is the most foundational conceptual error, misrepresenting what the
technique fundamentally is. MC-2 (overused by default) is addressed
second, once the equivalence fact from MC-1's repair makes clear that
strong induction is a convenience rather than a strictly stronger tool
— this naturally motivates asking WHEN it's actually needed. MC-3
(multiple base cases omitted) is addressed last, as a narrower,
execution-level error that surfaces specifically when a learner
attempts to construct a full strong-induction proof themselves.

## Tutor Actions

| Student state | Recommended action | Source |
|---|---|---|
| MC-1 active (strong induction assumed more powerful) | DEMONSTRATION: equivalence-via-Q(n) construction | Teaching Actions: SHOW §3 |
| MC-2 active (overused by default) | CONTRAST PAIR: sum-formula (standard suffices) vs. prime-factorization (strong needed) | Teaching Actions: SHOW §2 |
| MC-3 active (multiple base cases omitted) | WORKED EXAMPLE: sum-of-2s-and-3s with both base cases explicit | Teaching Actions: SHOW §1 |
| Ready for transfer | THOUGHT EXPERIMENT: recursive algorithm whose correctness depends on multiple smaller recursive calls, not just the immediately preceding one | Teaching Actions: TEST-THINKING §4 |

## Voice Teaching Notes

**Register**: Say "the accumulated hypothesis, from the base case up
through k" explicitly whenever introducing the strong-induction step —
never let "assume it holds" go unqualified as to WHICH prior cases are
available, since that ambiguity is exactly what MC-2 exploits.

**Wait-time**: After posing the prime-factorization goal and asking the
learner to attempt it with standard induction's single hypothesis, give
extended wait-time before revealing the reach-back problem — let the
learner discover the sticking point themselves.

**Load-bearing sentences**:
- "Strong induction doesn't prove more — it just gives you a richer
  hypothesis to work with at each step."
- "Use strong induction when the next case might depend on ANY smaller
  case, not just the one right before it."

**Voice channel note**: See `foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

**Gate 1**: state the structural difference between standard and
strong induction's inductive-step hypothesis. Pass: correctly
identifies the accumulated-hypothesis distinction.

**Gate 2**: prove every integer n≥2 has a prime factorization using
strong induction, correctly citing why the accumulated hypothesis (not
just P(k)) is needed. Pass: correct proof, correctly explains the
reach-back necessity.

**Gate 3**: given a proof already using strong induction, sketch the
auxiliary statement Q(n) that would convert it into a standard-
induction proof. Pass: correctly constructs Q(n)="P holds for all
values from the base through n."

**Gate 4**: given a simple statement (e.g., a sum formula) where P(k)
alone suffices, explain why strong induction, while still valid, is
unnecessary here. Pass: correctly identifies that the inductive step
doesn't need to reach back beyond k.

**Mastery criterion**: score ≥3/4 (informal weighting, MAMR-style),
consistent with KG mastery_threshold 0.75.

## Tutor Recovery Strategy

Likeliest utterance: "why would I ever use regular induction if strong
induction lets me assume more?" — the concept-specific smaller
question: "does assuming more at each step let you prove NEW
statements you couldn't prove before, or does it just make some proofs
easier to WRITE?" reframes the confusion from "strong is strictly
better" (MC-1's power-comparison framing) to "strong is a convenience
for a specific structural need," directly isolating MC-1's language-
contamination root without dismissing the learner's reasonable
instinct that a richer hypothesis should help somehow.

## Memory Hooks

**Type**: procedural (constructing strong-induction proofs across
prime-factorization and multi-base-case types, directly reusing
`math.found.proof-by-induction`'s own base-case/inductive-step
vocabulary in extended form) + declarative (the equivalence-in-power
fact, the multiple-base-case requirement). Review form: fresh
"does this proof need strong or standard induction" diagnostic prompts,
periodically paired with a full prime-factorization-style proof to keep
MC-3's guard-rail active. Interleaving partner: `math.found.
proof-by-induction` (the base technique this concept directly extends
and remains logically equivalent to).

## Transfer Connections

**Near transfer**:
- `math.found.well-ordering-principle` (per KG `related`; the
  minimal-counterexample technique there is closely related to strong
  induction's reach-back structure — both can access "any smaller
  case," not just the immediately preceding one)
- `math.found.proof-by-induction` (the base technique this concept
  directly extends)

**Far transfer**:
- Computer science: recursive algorithms whose correctness proofs
  require multiple smaller recursive calls (e.g., merge sort, Fibonacci-
  style recurrences), directly structured as strong-induction arguments
- Well-founded recursion in programming language theory, a direct
  generalization of strong induction's reach-back principle

## Cross-Subject Connections

None via KG `cross_links` (empty for this node). Not fabricated beyond
what the KG states.

## Blueprint References

None — no Blueprint exists yet for `math.found.strong-induction`. This
entry states that fact explicitly rather than fabricating references,
per this program's standing convention (see e.g. `math.found.
finite-set.md`'s own precedent for a no-Blueprint entry).

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any.

## Curriculum Feedback

No structural KG issues found. This concept's single prerequisite
(`math.found.proof-by-induction`) is exactly sufficient to state the
structural modification strong induction introduces. Its `related` link
to `math.found.well-ordering-principle` correctly anticipates the
closely related minimal-counterexample technique. Estimated hours (4)
and mastery threshold (0.75, notably lower than `math.found.
proof-by-induction`'s own 0.8) are appropriate for a concept that
extends an already-secure technique rather than introducing an entirely
new one.

## Version History

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-07-26 | Curriculum Completion Program (math.found domain, Wave 13, autonomous loop) | Initial entry, no Blueprint available; misconceptions authored via the birth-taxonomy diagnostic procedure. |
