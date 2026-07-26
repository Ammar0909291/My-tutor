# Relation — `math.found.relation`

## Identity

- **Concept ID**: `math.found.relation` (canonical mathematics KG)
- **Curriculum location**: mathematics / foundations
- **Prerequisites**: `math.found.cartesian-product` — a relation is
  formally a subset of a Cartesian product A×B.
- **Unlocks**: function, equivalence relation, partial order, and their
  properties (per KG node data).
- **Related** (from KG `cross_links`): `math.graph.graph` (Blueprint
  authored, Educational Brain entry not yet authored — different domain,
  out of this program's current scope).
- **Difficulty**: developing · **Bloom**: understand · **Mastery
  threshold**: 0.75 · **Est. hours**: 6
- **Blueprint**: `docs/curriculum/blueprints/math.found.relation.md`.

## Learning Objective

The learner can: define a relation as a subset of A×B and determine
whether a given set of pairs constitutes a relation; represent a
relation in multiple forms (enumerated pairs, arrow diagram, relation
matrix, algebraic predicate); identify the domain, codomain, and image
(range) of a relation and distinguish image from codomain; and
recognize that relations impose no uniqueness or totality constraints,
contrasting directly with functions.

## Core Understanding

A (binary) relation from set A to set B is any subset R of the
Cartesian product A×B — a collection of ordered pairs (a,b) indicating
which elements of A are related to which elements of B. This is the
general abstraction underlying functions, equivalences, and order:
every function is a relation with extra constraints (each element of A
maps to exactly one element of B), while a relation by itself has no
such constraint — one element of A can point to many B-elements, or
none, and one element of B can receive many arrows, or none. The same
relation can be represented four equivalent ways: as a set of pairs, as
an arrow diagram, as a relation matrix (rows = A, columns = B, marking 1
at each related pair), or as a predicate ((x,y)∈R iff some condition on
x and y). Domain and codomain are declared sets fixed in advance (A and
B respectively); the image is computed AFTER the relation is defined —
it is only the subset of the codomain actually reached by some element
of the domain, which can be a strict subset of the codomain even when
every element of the domain participates.

## Mental Models

- **Beginner model — "a relation means every a in A points to exactly
  one b in B"**: the learner applies the function template to every
  relation, rejecting or "correcting" multi-valued or partial relations.
  Shelf-life warning: this model is literally the definition of
  function, not relation, and fails the moment a genuinely multi-valued
  or partial relation is presented.
- **Intermediate model — "a relation is any subset of A×B, and I can
  represent it multiple equivalent ways"**: the learner correctly
  accepts arbitrary pair sets as valid relations and can translate
  between pairs/arrows/matrix/predicate, but may still conflate image
  with codomain. Upgrade trigger: being asked to state the image of a
  relation whose codomain is only partially reached.
- **Advanced model — "domain/codomain are declared; image is computed;
  function is relation plus extra rules"**: the learner treats function
  as the special case and relation as the general case, and correctly
  distinguishes declared sets (domain, codomain) from computed sets
  (image). Upgrade trigger: being asked what additional rule would need
  to be added to turn a given relation into a function.
- **Do not upgrade early**: a learner who still expects every relation
  to behave like a function (beginner model) should not be pushed into
  the image-versus-codomain distinction (intermediate-to-advanced)
  before the "any subset of A×B is valid" foundation is itself secure —
  the image/codomain distinction presupposes relations are already
  accepted as genuinely more general than functions.

## Why Students Fail

The dominant failure is carrying the function template into the more
general concept of relation: because functions are typically taught
first and become the default mental model for "relates," students
reject or "correct" perfectly valid multi-valued or partial relations,
spontaneously applying a vertical-line-test-like criterion where none
applies. A second, independent failure is conflating image with
codomain — many sources use "range" ambiguously for both, so students
carry that ambiguity forward and do not distinguish the declared target
set (codomain) from the set of elements actually reached (image). A
third failure is assuming every relation must be definable by an
algebraic formula or rule, over-generalizing from school experience with
formula-defined functions, and becoming uncomfortable with arbitrary,
rule-free pair sets.

## Misconceptions

Reusing the Blueprint's Misconception Registry, birth-type
classification added per this program's diagnostic procedure — not
re-derived:

### MC-1: Relation as Function (Type 5 — instruction-induced)
**Verbatim probe phrases**: "Is {(1,2),(1,3),(2,4)} a valid relation?
No — 1 maps to both 2 and 3." / "A relation has to be well-defined."
**Mechanism**: Students learn functions first; "well-defined" (one
output per input) becomes the default criterion for any relational
structure. The more general concept of relation is filtered through the
function template.
**Diagnostic signature**: Rejects multi-valued or partial relations;
spontaneously applies the vertical-line test.
**Repair**: Present the definition explicitly: a relation is any subset
of A×B, with no constraint on how many times any element appears on the
left or right. Then show {(1,2),(1,3)} is a perfectly valid relation —
draw the arrow diagram. Ask: "What additional rule would turn this
relation into a function?" (One output per input.) Student sees that
function = relation + extra rule, not the default.

### MC-2: Image Equals Codomain (Type 3 — language contamination)
**Verbatim probe phrases**: "The range of R is B." / "The codomain is
everything the relation outputs."
**Mechanism**: Many sources use "range" for both image and codomain, or
define range = codomain. Students carry this ambiguity.
**Diagnostic signature**: Does not distinguish B (declared codomain)
from the set of actually-reached elements.
**Repair**: Explicitly contrast: R = {(1,3),(2,3)} from A={1,2,3} to
B={1,2,3,4,5}. Codomain = B = {1,2,3,4,5}. Image = {3} (only 3 is
actually reached). "The codomain is the declared destination; the image
is where you actually land."
**Burned-collision note**: Some prior curricula use "range = image"
consistently. Name this as a convention conflict, not a student error —
they learned a different (valid) convention, and here we use the
domain/codomain/image triple.

### MC-3: Relations Must Have Rules (Type 1 — overgeneralization)
**Verbatim probe phrases**: "What's the formula for this relation?" /
"You can't just list random pairs — what's the pattern?"
**Mechanism**: School mathematics almost exclusively uses relations
defined by formulas (y = 2x, y = x²) — students over-generalise to
"relations require a defining rule."
**Diagnostic signature**: Demands an algebraic formula when given an
enumerated relation; uncomfortable with arbitrary pair sets.
**Repair**: Present a relation as a list of pairs: R = {(Alice, Bob),
(Alice, Carol), (Bob, Dana)} on a set of people. "What is the formula?"
There is none. "Is it a valid relation?" Yes — it is just the
'is-friends-with' relation, captured as a set of pairs. Arbitrary
subsets of A×B are allowed.

## Analogies

**Primary — the social network follow graph**: A relation is like a
social network follow graph. Person A can follow 0, 1, or many people.
Person B can be followed by 0, 1, or many people. There is no rule
requiring everyone to follow exactly one person. The relation is just
the set of (follower, followed) pairs.

**Secondary — airport routes for image vs. codomain**: The codomain is
the set of all airport destinations that COULD be reached from an
airport; the image is the set of destinations that flights ACTUALLY go
to. Many airports in the codomain may have no direct flight.

**Anti-analogy to retire**: "A relation is like a function, but it can
be multi-valued." This framing still treats function as the default and
relation as the exception — invert it. Relations are the general
concept; functions are relations with extra rules.

## Demonstrations

**Any subset is valid**: List all 4 pairs in {1,2}×{a,b}: (1,a),(1,b),
(2,a),(2,b). Ask student to "pick any pairs they like." Whatever they
pick is a valid relation. Include the empty selection (∅ is a valid —
trivial — relation) and the full selection (all 4 pairs is also valid).

**Four representations**: Take R = {(1,2),(1,3),(2,3)} on A=B={1,2,3}.
Build all four representations together: pair listing → arrow diagram →
relation matrix → predicate ("x relates to y if y > x"). Student sees
all four are the same object in different clothes.

**Image vs codomain**: Relation R from {1,2,3} to {1,2,3,4,5}: R =
{(1,2),(2,2),(3,4)}. Codomain: {1,2,3,4,5}. Image: {2,4}. "Which
elements of the codomain are never reached?" 1, 3, 5. "Those are in the
codomain but not in the image."

## Discovery Questions

Present a social network of 4 people and a list of who follows whom.
"Is this a valid mathematical structure?" Let student grapple with how
to formalise it. Guide toward: pair (follower, followed) — list all
such pairs. Introduce the term "relation" after the student has already
constructed one. Then ask: "What if we required each person to follow
exactly one other person?" — this leads the student to discover the
function constraint independently. Recommendation: discovery for the
"any subset is valid" insight; direct instruction for the domain/
codomain/image vocabulary triple and the function-vs-relation
distinction.

## Teaching Sequence

MC-1 (relation-as-function) is addressed first and given the most
weight, since it is the highest-frequency misconception at this node
and corrupts every subsequent example if left unresolved — a learner
who "corrects" multi-valued relations cannot engage with the rest of
the concept honestly. MC-3 (relations must have rules) is addressed
second, since it is closely related (both stem from over-applying
school-formula intuitions) and is naturally resolved by the same
arbitrary-pair-set demonstrations. MC-2 (image equals codomain) is
addressed last, as a distinct, representational-vocabulary issue rather
than a conceptual one about what a relation IS.

## Tutor Actions

| Student state | Recommended action | Source |
|---|---|---|
| MC-1 active (relation=function) | ERROR ANALYSIS: present a multi-valued relation, ask "what's wrong?" — reveal nothing is wrong | Teaching Actions: TEST-THINKING §5 |
| MC-2 active (image=codomain) | WORKED EXAMPLE: build codomain and image for the same relation side by side | Teaching Actions: SHOW §1 |
| MC-3 active (needs a formula) | DEMONSTRATION: social-network example with no formula | Teaching Actions: SHOW §3 |
| FRAGILE on representations | MATCHING: given four representations of the same relation, match them | Teaching Actions: ORGANIZE §3 |
| Ready for transfer | THOUGHT EXPERIMENT: "Can a relation have the empty set as its image? What would that look like?" | Teaching Actions: TEST-THINKING §4 |

## Voice Teaching Notes

**Register**: Exploratory and generative. Relation is a deliberately
general concept — lean into that generality. "What would happen if we
allowed…?" is more productive than "Here is the definition."

**Wait-time**: After showing a multi-valued example, wait for the
student to respond before validating. Students often spontaneously
reject it (MC-1) — the wait surfaces the misconception before the
correction.

**Load-bearing sentences**:
- "A relation is just a set of pairs — any pairs at all."
- "A function is a relation with a rule: each input has exactly one
  output."
- "The image is where you actually land; the codomain is where you were
  aiming."

**Voice channel note**: See `foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

**Gate 1 (DEFINITION)**: Is R = {(1,3),(1,4),(2,3)} a valid relation
from {1,2} to {3,4,5}? Justify. Pass: YES — it is a subset of
{1,2}×{3,4,5}; the fact that 2 maps to one element and 1 maps to two
elements is acceptable.

**Gate 2 (REPRESENTATION)**: Draw the arrow diagram for the relation R
= {(a,1),(a,2),(b,1),(c,3)} from {a,b,c} to {1,2,3}. Pass: correct
diagram with a→1, a→2, b→1, c→3 and no spurious arrows.

**Gate 3 (IMAGE vs CODOMAIN)**: Given R = {(1,2),(2,2)} from A={1,2,3}
to B={1,2,3,4}, state the image of R and explain how it differs from
the codomain. Pass: image = {2}; codomain = {1,2,3,4}; student explains
that 1,3,4 are in the codomain but unreached.

**Gate 4 (FUNCTION DISTINCTION)**: Which of these is a function and
which is only a relation? (i) {(1,a),(2,a),(3,b)}; (ii) {(1,a),(1,b),
(2,c)}. Pass: (i) is a function (each left element has exactly one
right partner); (ii) is a relation but not a function (1 maps to both a
and b).

## Tutor Recovery Strategy

**If Gate 1 fails**: MC-1 is active. Run Error Analysis: show the pair
listing and ask "Which rule is violated?" — student names a function
rule. Confirm that no function rule applies here because the definition
of relation has no such rule.

**If Gate 3 fails**: MC-2 is active. Run the image-vs-codomain
demonstration contrast. Emphasise: codomain is declared before the
relation is defined; image is computed after.

**If Gate 4 fails**: Prerequisite gap in distinguishing function from
relation. Re-expose the function definition and explicitly place
function as a special case of relation.

## Memory Hooks

**Memory type**: Declarative + representational (multiple equivalent
representations must all be mastered).

**Forgetting profile**: The pair-listing definition is robust. The
image/codomain distinction is fragile — it collapses to "image =
codomain" within weeks without reinforcement. The multi-representation
equivalence (pairs ↔ arrows ↔ matrix) requires periodic cross-
translation practice to remain accessible.

**Spaced retrieval targets**:
- Session +1: Convert a pair listing to an arrow diagram and a relation
  matrix.
- Session +7: Identify image vs codomain for a new relation.
- Session +21: Use the relation concept in the definition of a
  function: "A function is a relation such that…"

## Transfer Connections

**Near transfer**:
- Function (relation + uniqueness + totality constraints)
- Equivalence relation (relation + reflexivity + symmetry + transitivity)
- Partial order (relation + reflexivity + antisymmetry + transitivity)

**Far transfer**:
- Database join operations (Cartesian product with subset selection)
- Graph theory (directed graph = binary relation on a vertex set)
- Social network analysis (edges as relation pairs)

## Cross-Subject Connections

KG lists `math.graph.graph` as a cross-link; confirmed a Blueprint
exists (`docs/curriculum/blueprints/math.graph.graph.md`) but no
Educational Brain entry yet (different domain, out of this program's
current math.found scope). The relationship — a directed graph IS a
binary relation on a vertex set — is named in Transfer Connections above
and will be developed further once `math.graph.graph` is authored.

## Blueprint References

Blueprint: `docs/curriculum/blueprints/math.found.relation.md`.

Key teaching objectives reused by reference (not duplicated in full):
LO1 (define relation as subset of A×B), LO2 (four representations), LO3
(domain/codomain/image), LO4 (no uniqueness/totality constraints). All
three Blueprint misconceptions (MC-1 through MC-3) cited above with
birth-type classification added.

## Runtime Asset References

- Explanation Memory: the Core Understanding paragraph (multiple
  representations) and the MC-1 repair explanation are suitable seeds.
- Probe assets: Gate 4 (function-distinction) is a strong misconception-
  probe seed.
- Visual asset: arrow diagram with no-constraint arrows (one-to-many and
  zero allowed) — ADR 12.

## Curriculum Feedback

No structural KG issues found. MC-1 (relation=function) is the highest-
frequency misconception at this node and warrants the first teaching
action slot. The image/codomain vocabulary triple was chosen over the
domain/range usage because the domain/codomain/image triple is more
precise and avoids the "range = codomain or image?" ambiguity documented
in MC-2. Birth-type classifications applied using
`educational-brain/misconceptions/01-birth-types.md`.

## Version History

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-07-23 | Human Curator (Domain Certification Mode, Wave 6) | Initial entry |
| 1.1 | 2026-07-26 | Curriculum Completion Program (Quality Gate 3 repair) | Restructured from the retired numbered "1. Concept Identity"..."21. Certification Status" heading scheme to the current `EDUCATIONAL_BRAIN_STANDARD.md` 21-section scheme. All content preserved losslessly; added standalone Learning Objective and Why Students Fail sections; merged the two duplicate Blueprint References sections into one; dropped the non-Standard Certification Status section. No factual or pedagogical content removed. |
