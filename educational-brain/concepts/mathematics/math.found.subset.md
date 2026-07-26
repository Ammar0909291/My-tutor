# Subset — `math.found.subset`

## Identity

- **Concept ID**: `math.found.subset` (canonical mathematics KG)
- **Curriculum location**: mathematics / foundations
- **Prerequisites**: `math.found.set-membership` — subset is a claim about
  the membership of every element of A, so element-level membership
  ("is this in that set?") must already be secure.
- **Unlocks**: set operations, set equality, power set, and containment-
  based proofs (per KG node data; not yet all individually authored).
- **Related** (from KG): none via `cross_links` (empty for this node).
- **Difficulty**: foundational · **Bloom**: understand · **Mastery
  threshold**: 0.75 · **Est. hours**: 2
- **Blueprint**: `docs/curriculum/blueprints/math.found.subset.md`.

## Learning Objective

The learner can: distinguish ∈ (element-of) from ⊆ (subset-of) with
correct notation; verify subset relationships by checking every element
of the candidate set against the target set; and apply the special
cases A⊆A (reflexivity) and ∅⊆B (the empty set is a subset of every
set) correctly, including recognizing A⊆B and B⊆A together mean A=B.

## Core Understanding

Set A is a subset of set B (written A⊆B) when every element of A is
also an element of B. This is a "for all" check: go through every
element of A and confirm it is in B — one missing element is enough to
break the subset claim. Two special cases follow directly from the
definition rather than being exceptions to it: A⊆A always holds (every
element of A is certainly in A), and ∅⊆B holds for every set B (there
is no element in ∅ to fail the check, so the claim is vacuously true).
A⊆B and B⊆A together mean A=B — this is how set equality is formally
defined, making subset the foundation the equality relation is built
on, not a separate, unrelated idea.

## Mental Models

- **Beginner model — "subset means A and B share some elements"**: the
  learner treats subset as a weaker form of overlap. Shelf-life warning:
  this model is actually the definition of intersection, not subset, and
  fails the moment a fully-contained-but-non-overlapping-looking case is
  presented.
- **Intermediate model — "subset means every element of A passes a
  membership check against B"**: the learner correctly applies the
  element-by-element check on concrete listed sets, but may still
  hesitate on the special cases (A⊆A, ∅⊆B). Upgrade trigger: being asked
  to justify ∅⊆B directly from the definition rather than citing it as a
  rule.
- **Advanced model — "A⊆B is a universal claim, vacuously true when
  there's nothing to fail it, and A⊆B∧B⊆A defines equality"**: the
  learner derives the special cases from the definition itself and uses
  mutual subset-hood as the standard technique for proving set equality.
  Upgrade trigger: being asked to prove two abstractly-described sets are
  equal using the mutual-subset technique.
- **Do not upgrade early**: a learner who still confuses subset with
  intersection (beginner model) should not be pushed into the vacuous-
  truth justification of ∅⊆B (advanced model) before the basic element-
  by-element check is itself reliable on concrete, non-trivial examples.

## Why Students Fail

The dominant failure is conflating subset with intersection or general
"overlap" — since both involve sets sharing elements, and subset's
stronger, one-directional requirement (ALL of A's elements, not just
some) is easy to relax under the pull of the more familiar idea of two
sets having something in common. A second, independent failure is the
∅⊆B special case: learners who correctly perform the element-by-element
check on non-empty sets often reject ∅⊆B outright, since there is
nothing to visibly "pass" the check, missing that the absence of any
element to fail the check is itself what makes the claim vacuously
true. A third failure is treating ⊆ and ⊂ (used inconsistently across
sources for "subset" vs. "proper subset") as if the two notations always
carry the same meaning, when the convention genuinely varies by source.

## Misconceptions

Reusing the Blueprint's Misconception Registry, birth-type
classification added per this program's diagnostic procedure — not
re-derived:

### MC-1: Element–Subset Symbol Confusion (Type 3 — notation-induced)
**Verbatim probe phrases**: "3⊆{1,2,3}" / "Is {a}∈{a,b,c}?" (using ∈
where ⊆ is meant) / "∅∈A for any A."
**Mechanism**: ∈ and ⊆ are introduced together, look superficially
similar, and test the same containment intuition — notation
contamination causes substitution.
**Diagnostic signature**: Mixes relations in written expressions; may
compute correct answers while writing the wrong symbol.
**Repair**: Force explicit type-checking: "Is the left side an element
(a single object) or a set (a collection)?" Drill with typed
categorisation before returning to mixed notation.
**Burned-collision note**: If the student correctly categorises types
verbally but still writes wrong symbols, check whether they are
confusing the test with actual practice. Use delayed practice (not
same-session) after the category drill.

### MC-2: Empty-Set Non-Subset Intuition (Type 2 — perceptual intuition)
**Verbatim probe phrases**: "∅ can't be a subset — it has nothing in
it." / "There's no element to check so it doesn't qualify."
**Mechanism**: Student applies a membership-checking heuristic ("I need
to find at least one element that passes") rather than the correct
universal quantifier logic ("there must be NO element that fails").
**Diagnostic signature**: Rejects ∅⊆B for specific B; often accepts
∅∈B (a different, usually false claim) instead.
**Repair**: Restate the definition as its logical contrapositive: "A⊆B
is FALSE only if we can find an element in A that is NOT in B. For ∅ we
cannot find any such element — so the condition for falsity cannot be
met. ∅⊆B is vacuously true."
**Collision design**: Ask "Can you give me one element in ∅ that is NOT
in B?" — student realizes they cannot, and the vacuous truth becomes
self-evident rather than imposed.

### MC-3: Proper-Subset/Subset Conflation (Type 5 — instruction-induced)
**Verbatim probe phrases**: "A⊆A is false because a set can't be a
subset of itself." / "⊆ means strictly smaller."
**Mechanism**: Some textbooks use ⊂ exclusively (for ⊆), while others
use ⊂ for proper subset (A⊊B). Students who have seen only the strict-
subset usage import that meaning into ⊆.
**Repair**: Make the ≤ analogy explicit: just as 5≤5 is true, A⊆A is
true — ⊆ includes the "equals" case. If the student's prior text used ⊂
differently, name the convention conflict directly; do not pretend it
does not exist.

## Analogies

**Primary — the team roster check**: To decide if team A's roster is a
subset of team B's roster, go through every name on A's list and check:
is this person also on B's list? If every single name passes, A's
roster ⊆ B's roster. One name missing from B's list breaks the subset
claim.

**Secondary — the Venn diagram containment**: A⊆B is the picture where
the A circle sits entirely inside the B circle — no part of A sticks
out. The empty set ∅ is a set with no circle at all: a circle with zero
radius sits inside every other circle by default.

**Anti-analogy to retire**: "A is a subset of B if A and B share some
elements" — that is intersection, not subset. A⊆B requires ALL of A's
elements to be in B, not just some.

## Demonstrations

**Manual roster check**: Given A = {cat, dog} and B = {cat, dog, fish,
bird}, walk through element by element with the student naming each
element and checking membership. Student records: cat→✓, dog→✓.
Conclusion: A⊆B.

**Find the counterexample**: Given A = {1, 2, 7} and B = {1, 2, 3, 4,
5}: "Can you find one element of A that is NOT in B?" Student finds 7.
Done — A⊄B. This trains the efficient falsification strategy (find one
failure rather than checking every element).

**Vacuous truth**: "Here is an empty bag (∅). Check whether any item in
the bag violates the rule 'everything in A must be in B.' Can you find
an item that violates it?" Student picks up the bag, finds nothing. "So
the rule was never violated. ∅⊆B."

## Discovery Questions

Pose "Is {2,4}⊆{1,2,3,4,5}?" and ask student to invent a checking
procedure. Student typically devises element-by-element verification
independently — confirm and name it as the formal definition. Then
introduce ∅⊆B as a puzzle: "Now try ∅⊆B. Walk me through your checking
procedure." When the procedure produces no steps, guide the
interpretation toward vacuous truth. Recommendation: brief discovery for
the membership-checking procedure; direct instruction with explicit
examples for the two special cases (A⊆A, ∅⊆B), since both are
counterintuitive and argument-resistant without named explanation.

## Teaching Sequence

MC-1 (symbol confusion) is addressed first, since notation confusion
corrupts every subsequent check regardless of conceptual understanding.
MC-2 (empty-set non-subset intuition) is addressed second, as the
sharpest test of whether the definition (rather than a memorized
heuristic) has been internalized. MC-3 (proper-subset conflation) is
addressed last and briefly, as a notation-convention issue rather than a
conceptual one.

## Tutor Actions

| Student state | Recommended action | Source |
|---|---|---|
| MC-1 active (symbol confusion) | MATCHING: sort expressions into "element relation" vs "set relation" piles | Teaching Actions: ORGANIZE §3 |
| MC-2 active (∅ not subset) | THOUGHT EXPERIMENT: "Find a counterexample element in ∅" collision | Teaching Actions: TEST-THINKING §4 |
| MC-3 active (proper subset) | DIRECT INSTRUCTION: state the ⊆ vs ⊂ convention explicitly; use the ≤ analogy | Teaching Actions: TELL §1 |
| Correct but slow (FRAGILE) | DRILL: 10 rapid membership checks on varied sets | Teaching Actions: DO §3 |
| Ready for transfer | WORKED EXAMPLE: prove A=B by proving A⊆B and B⊆A | Teaching Actions: SHOW §1 |

## Voice Teaching Notes

**Register**: Warm and concrete. Subset is a student's first encounter
with containment proof — keep the language procedural ("go through every
element") rather than abstract ("for all x").

**Wait-time rule**: After presenting A and B, pause before checking any
element — ask the student to begin the check themselves. Intervene only
if the student checks in the wrong direction (checking elements of B
against A, not elements of A against B).

**Load-bearing sentences**:
- "Subset is about A's elements, not B's — we start from A and ask: does
  B have this?"
- "One missing element is enough to break a subset claim."
- "For the empty set: name one element that fails. You can't — so it
  passes."

**Voice channel note**: See `foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

**Gate 1 (RECOGNITION)**: Given A = {a, e} and B = {a, b, c, d, e, f},
state whether A⊆B and explain in one sentence. Pass: correct verdict
with "every element of A is in B."

**Gate 2 (INDEPENDENT)**: Given A = {1, 3, 5} and C = {1, 2, 3, 4},
determine whether A⊆C, C⊆A, or neither. Pass: A⊄C (5∉C identified),
C⊄A (2,4∉A identified).

**Gate 3 (SPECIAL CASES)**: State without a truth table: Is ∅⊆{1,2,3}?
Is {1,2,3}⊆{1,2,3}? Justify each. Pass: both true with correct
justifications (vacuous truth; reflexivity).

**Gate 4 (MISCONCEPTION probe)**: "A student wrote 3⊆{1,2,3}. What
error did they make?" Pass: identifies that 3 is an element, not a set
— the correct relation is 3∈{1,2,3}.

## Tutor Recovery Strategy

**If Gate 2 fails**: Student is applying the check in the wrong
direction (checking B⊆A instead of A⊆B). Restate: "We start from A and
ask about B. A⊆B is a claim about A's elements."

**If Gate 3 fails (∅ case)**: MC-2 is active. Deploy the vacuous-truth
collision: "Give me one element in ∅ that is not in the set." After the
student cannot, explain that no counterexample = the claim stands.

**If Gate 4 fails**: MC-1 is active. Return to typed-categorisation
drill before re-attempting notation practice.

## Memory Hooks

**Memory type**: Declarative definition + procedural check.

**Forgetting profile**: The checking procedure is durable after three or
four successful applications. The special cases (∅⊆B, A⊆A) are fragile
— they may be re-doubted at transfer even after being correctly assessed.
Treat them as retrieval targets for later sessions.

**Spaced retrieval targets**:
- Session +1: Reproduce the definition from memory; apply to two
  examples.
- Session +7: Use A⊆B and B⊆A together to prove A=B for a concrete pair.
- Session +21: Transfer to set-equality proofs in a slightly different
  domain.

## Transfer Connections

**Near transfer**:
- Set equality (A=B iff A⊆B and B⊆A) — natural next step in this domain
- Power set (every element of the power set is a subset of A)

**Far transfer**:
- Implication as subset (in logic, P→Q corresponds to the set of
  P-worlds being a subset of Q-worlds)
- Divisibility as subset of factor sets in number theory
- Subgroup conditions in algebra (analogous containment + closure)

## Cross-Subject Connections

None via KG `cross_links` (empty for this node). Not fabricated beyond
what the KG states.

## Blueprint References

Blueprint: `docs/curriculum/blueprints/math.found.subset.md`.

Key teaching objectives reused by reference (not duplicated in full):
LO1 (distinguish ∈ from ⊆), LO2 (verify by element-by-element check),
LO3 (apply the reflexivity/vacuous-truth/equality special cases). All
three Blueprint misconceptions (MC-1 through MC-3) cited above with
birth-type classification added.

## Runtime Asset References

- Explanation Memory: the Core Understanding paragraph and the vacuous-
  truth repair explanation are suitable seeds.
- Probe assets: Gate 2 and Gate 4 are suitable MCQ/misconception-probe
  seeds.
- Visual asset: Venn diagram showing circle-inside-circle containment,
  with the empty-set case illustrated as a single point inside the outer
  circle — ADR 12 pipeline.

## Curriculum Feedback

No structural KG issues found. MC birth-type classifications applied
using `educational-brain/misconceptions/01-birth-types.md`. MC-1
(notation-induced) and MC-2 (perceptual intuition) are the highest-
frequency repair targets, confirmed by the Blueprint's registry
ordering.

## Version History

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-07-23 | Human Curator (Domain Certification Mode, Wave 6) | Initial entry |
| 1.1 | 2026-07-26 | Curriculum Completion Program (Quality Gate 3 repair) | Restructured from the retired numbered "1. Concept Identity"..."21. Certification Status" heading scheme to the current `EDUCATIONAL_BRAIN_STANDARD.md` 21-section scheme. All content preserved losslessly; added standalone Learning Objective and Why Students Fail sections (previously folded into Concept Identity/Explanation Library); merged the two duplicate Blueprint References sections into one; dropped the non-Standard Certification Status section (fully redundant with Blueprint References). No factual or pedagogical content removed. |
