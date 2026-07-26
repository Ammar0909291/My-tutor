# Equivalence Class — `math.found.equivalence-class`

## Identity

- **Concept ID**: `math.found.equivalence-class` (canonical mathematics KG)
- **Curriculum location**: mathematics / foundations (parent:
  `math.found.equivalence-relation`)
- **Prerequisites**: `math.found.equivalence-relation`.
- **Unlocks**: `math.nt.congruence`, `math.abst.quotient-group`.
- **Related** (from KG): `math.found.partition`.
- **Difficulty**: developing · **Bloom**: understand · **Mastery
  threshold**: 0.8 · **Est. hours**: 3
- **Blueprint**: `docs/curriculum/blueprints/math.found.equivalence-class.md`
  (cross-link to `math.abst.quotient-group` checked, not yet authored →
  independence mode).
- **Aliases** (from KG): "quotient set", "[a]".

## Learning Objective

The learner can: define and compute the equivalence class [a]={x∈A :
x∼a} for an equivalence relation ∼ on A, and recognize a∈[a] always
(guaranteed by reflexivity); state and apply the criterion [a]=[b] iff
a∼b, recognizing that different elements can generate the identical
class as sets; and recognize that every element of A belongs to exactly
one distinct equivalence class, with the collection of distinct classes
forming a genuine partition of A.

## Core Understanding

For an equivalence relation ∼ on A, the equivalence class of a is
[a]={x∈A : x∼a} — collecting every element related to a. Since ∼ is
reflexive (one of `math.found.equivalence-relation`'s own three
combined properties), a∼a always holds, so a∈[a] is guaranteed for
EVERY a, with no exceptions. Two elements a and b generate the
IDENTICAL class (as sets) exactly when [a]=[b] iff a∼b — a direct,
checkable criterion. Critically, [a]=[b] does NOT require a=b: two
genuinely different elements can be related to each other, in which
case their classes are literally the SAME set, just reachable via two
different "representative" names. While every element a generates its
own named class [a], many different elements can generate the SAME
class (whenever they are all related to each other) — the collection of
genuinely DISTINCT classes, after collapsing duplicates named by
different representatives, satisfies `math.found.partition`'s three
conditions exactly (nonempty, pairwise disjoint, union equals A),
directly cashing out `math.found.equivalence-relation`'s own Partition
Theorem into concrete, computable objects.

## Mental Models

- **Beginner model — "an equivalence class is just the set of things
  related to some element, and might not include that element itself"**:
  the learner computes classes correctly for OTHER elements but doubts
  or overlooks self-membership. Shelf-life warning: this model produces
  hesitation or error on the single most basic fact about equivalence
  classes — that a always belongs to [a].
- **Intermediate model — "[a]=[b] happens when a and b are related, even
  if a≠b"**: the learner correctly applies the equality criterion, but
  may still expect the number of distinct classes to equal the number
  of elements in A. Upgrade trigger: being asked to count the genuinely
  distinct classes for a relation where multiple elements share a
  class.
- **Advanced model — "distinct classes, not distinct representative
  names, are what matter, and they always form a genuine partition"**:
  the learner correctly counts distinct classes (which can be far fewer
  than |A|) and connects this directly to `math.found.partition`'s own
  three-condition definition. Upgrade trigger: being asked to explain
  why the collection of distinct equivalence classes necessarily
  satisfies all three partition conditions.
- **Do not upgrade early**: a learner who still doubts self-membership
  (beginner model) should not be pushed into distinct-class counting
  (advanced model) before the basic class-computation and self-
  membership facts are themselves secure.

## Why Students Fail

The dominant failure doubts or overlooks that an element always belongs
to its own equivalence class, missing that this follows directly and
unconditionally from reflexivity — one of `math.found.equivalence-
relation`'s own three required properties, not a separate fact needing
independent verification each time. A second, independent failure
believes [a]=[b] requires a and b to be the literal same element,
missing that the equality criterion is a∼b, not a=b — two genuinely
different elements can generate the identical class. A third failure
assumes the number of distinct equivalence classes must equal the
number of elements in A, missing that several different elements
routinely share the same class, often reducing the true count of
distinct classes far below |A|.

## Misconceptions

Reusing the Blueprint's Misconception Registry, birth-type
classification added per this program's diagnostic procedure — not
re-derived:

### MC-1: SELF-MEMBERSHIP-IN-OWN-CLASS-DOUBTED (Foundational; Type 2 — perceptual intuition)
**Trigger**: asked whether an element a might not belong to its own
equivalence class [a], the learner answers "yes" or expresses
uncertainty.
**Repair**: for "same parity" on A={1,2,3,4}, verify directly:
[1]={x∈A : x has the same parity as 1}={1,3} — 1∈[1] directly, since
1∼1 by reflexivity. "Reflexivity guarantees this every single time, for
every equivalence relation."

### MC-2: CLASS-EQUALITY-CONFUSED-WITH-ELEMENT-EQUALITY (Foundational; Type 1 — overgeneralization)
**Trigger**: asked whether [a]=[b] requires a and b to be the literal
same element, the learner answers "yes."
**Repair**: for the same relation, [3]={x : x∼3}={1,3} — IDENTICAL to
[1]. Checking the criterion: [1]=[3] iff 1∼3 — TRUE (both odd). "The
criterion is a∼b, not a=b — the classes can coincide even when the
elements are genuinely different."

### MC-3: DISTINCT-CLASS-COUNT-ASSUMED-EQUAL-TO-ELEMENT-COUNT (Foundational; Type 1 — overgeneralization)
**Trigger**: asked how many distinct classes an equivalence relation on
a 4-element set must produce, the learner automatically answers "4."
**Repair**: listing every element's class for the same relation:
[1]={1,3}, [2]={2,4}, [3]={1,3}=[1] (not a third distinct class),
[4]={2,4}=[2] (not a fourth). Only 2 genuinely DISTINCT classes among 4
elements. "Count the distinct SETS, not the number of representative
names."

## Analogies

**Primary — grouping students by major**: A university groups students
by declaring two students "equivalent" if they share the same major.
The equivalence class of a specific student Alex represents every
student sharing Alex's major, including Alex themselves (Alex always
shares Alex's own major). Two different students, Alex and Priya, have
the EXACT same equivalence class precisely when they share the same
major — a genuinely different pair of people, one identical class. If
the university has 500 students but only 12 majors, there are only 12
genuinely distinct equivalence classes, not 500.

**Anti-analogy to retire**: "Each element gets its own personal
equivalence class." This invites MC-3 directly by suggesting classes
are inherently one-per-element rather than potentially shared.

## Demonstrations

**Self-membership verification**: for "same parity" on {1,2,3,4},
directly verify 1∈[1], 2∈[2], 3∈[3], 4∈[4] — every element belongs to
its own class, confirmed by reflexivity in each case.

**Same class, different representative names**: [1]={1,3} and [3]=
{1,3} — literally identical sets, verified by the criterion 1∼3 (both
odd) — one class, two valid representative names.

**Distinct classes partition A**: {1,3} and {2,4} are the only two
genuinely distinct classes for the same-parity relation on {1,2,3,4} —
both nonempty, disjoint from each other, union equals all of {1,2,3,4}
— exactly satisfying `math.found.partition`'s three conditions.

## Discovery Questions

Present the same-parity relation on {1,2,3,4} and ask the learner to
compute [1], [2], [3], and [4] independently — the learner discovers
[3]=[1] and [4]=[2] through direct computation before being told to
expect duplication. Recommendation: guided discovery for the same-
class-different-representative discovery (directly computational);
direct instruction for the connection to `math.found.partition`'s three
conditions, since that connection requires explicit citation of an
already-established, separate definition.

## Teaching Sequence

MC-1 (self-membership doubted) is addressed first, since it concerns
the single most basic fact about any equivalence class — a learner who
doubts a∈[a] cannot reliably compute anything else. MC-2 (class equality
confused with element equality) is addressed second, since it concerns
the equality CRITERION directly. MC-3 (distinct-class count assumed
equal to element count) is addressed third, as its COUNTING consequence
— deliberately split from MC-2 per the Blueprint's own stated
rationale, since MC-2 and MC-3 are two faces of the same underlying
insight worth teaching separately.

## Tutor Actions

| Student state | Recommended action | Source |
|---|---|---|
| MC-1 active (self-membership doubted) | WORKED EXAMPLE: direct self-membership verification via reflexivity | Teaching Actions: SHOW §1 |
| MC-2 active (class equality = element equality) | DEMONSTRATION: [1]=[3] despite 1≠3, verified by the criterion | Teaching Actions: SHOW §3 |
| MC-3 active (distinct count = element count) | DEMONSTRATION: full class listing showing only 2 distinct classes among 4 elements | Teaching Actions: SHOW §3 |
| Ready for transfer | THOUGHT EXPERIMENT: 500 students, 12 majors — how many distinct classes? | Teaching Actions: TEST-THINKING §4 |

## Voice Teaching Notes

**Register**: Precise about "distinct classes" versus "representative
names" — repeat the distinction whenever counting classes.

**Wait-time**: After computing several individual classes, pause and
ask "how many of these are actually different SETS?" before revealing
the count — surfaces MC-3 directly.

**Load-bearing sentences**:
- "Every element belongs to its own class — reflexivity guarantees it,
  always."
- "[a]=[b] means a∼b, never a=b — different elements, same class, is
  completely normal."

**Voice channel note**: See `foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

**Gate 1**: for A={1,...,6} and R={(a,b):a≡b (mod 3)}, compute [1] and
[4], and state whether they are equal. Pass: [1]={1,4}, [4]={1,4},
correctly identified as equal.

**Gate 2**: using the same relation, list all genuinely distinct
equivalence classes. Pass: {1,4}, {2,5}, {3,6} — three distinct classes.

**Gate 3**: explain why a∈[a] is guaranteed for any equivalence
relation, citing the specific property responsible. Pass: cites
reflexivity directly.

**Gate 4**: explain why the number of distinct equivalence classes can
be smaller than |A|. Pass: correctly cites shared classes among related
elements, using Gate 2's own result as an example.

**Mastery criterion**: score ≥4/5, consistent with KG mastery_threshold
0.8.

## Tutor Recovery Strategy

**If Gate 1 fails**: MC-1 or MC-2 is active. Return to the direct
self-membership and class-equality-criterion demonstrations before
re-attempting.

**If Gate 2 fails**: MC-3 is active. Require the learner to compute
EVERY individual element's class first, then group identical results,
rather than guessing the count.

## Memory Hooks

**Type**: procedural (class computation, directly reusing `math.found.
equivalence-relation`'s own membership-checking machinery) +
declarative (the equality criterion and partition connection). Review
form: fresh equivalence relations requiring full class enumeration and
explicit distinct-class counting, keeping all three misconceptions'
guard-rails active. Interleaving partners: `math.found.equivalence-
relation` (the combined property this concept's classes directly
instantiate) and `math.found.partition` (the three-condition structure
the distinct classes satisfy).

## Transfer Connections

**Near transfer**:
- `math.nt.congruence` (congruence classes mod n are the canonical
  number-theoretic instance of equivalence classes)
- `math.abst.quotient-group` (builds a new group structure directly on
  the set of equivalence classes)

**Far transfer**:
- Database normalization's equivalence-class-like grouping of
  functionally-dependent records
- Type theory's quotient types, directly generalizing this concept's
  class-collapsing structure

## Cross-Subject Connections

KG lists `math.abst.quotient-group` as a cross-link; confirmed via
directory listing that no Blueprint yet exists at
`docs/curriculum/blueprints/math.abst.quotient-group.md`, matching the
Blueprint's own independence-mode declaration. Not fabricated beyond
what the KG states.

## Blueprint References

Blueprint: `docs/curriculum/blueprints/math.found.equivalence-class.md`.

Key teaching objectives and misconception registry reused by reference
above; the P76 university-major transfer probe (three parts) not
restated in full.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any.

## Curriculum Feedback

No structural KG issues found. This concept directly cashes out
`math.found.equivalence-relation`'s own Partition Theorem into concrete,
computable objects, appropriately reusing that entry's own worked
example (same-parity relation on {1,2,3,4}) rather than introducing a
fresh one, per the Blueprint's own stated rationale.

## Version History

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-07-26 | Curriculum Completion Program (math.found domain, Wave 10, autonomous loop) | Initial entry, grounded in the existing Blueprint. |
