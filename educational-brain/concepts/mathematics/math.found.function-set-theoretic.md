# Function (Set-Theoretic) — `math.found.function-set-theoretic`

## Identity

- **Concept ID**: `math.found.function-set-theoretic` (canonical
  mathematics KG)
- **Curriculum location**: mathematics / foundations (parent:
  `math.found.set-theory`)
- **Prerequisites**: `math.found.cartesian-product` — a function f:A→B
  is a subset of A×B; `math.found.relation` — a function is a special
  kind of relation (right-unique + left-total).
- **Unlocks**: `math.func.function-concept`.
- **Related** (from KG): `math.func.function-concept`.
- **Difficulty**: developing · **Bloom**: understand · **Mastery
  threshold**: 0.85 · **Est. hours**: 4
- **Blueprint**: `docs/curriculum/blueprints/math.found.function-set-theoretic.md`
  (PACKAGE_READY, cross-link to `math.func.function-concept`).
- **Aliases** (from KG): "mapping", "map", "morphism (informal)".

## Learning Objective

The learner can: define a function as a relation that is both right-
unique and left-total; verify whether a given relation R⊆A×B is a
function by checking both conditions; distinguish domain, codomain, and
image/range of a function; represent a function in three equivalent
forms (set of pairs, arrow diagram, formula); and connect the set-
theoretic definition to the informal input-output notion of function.

## Core Understanding

A function f from A to B is a relation f⊆A×B satisfying two conditions
together: LEFT-TOTAL (domain coverage) — for every a∈A, there exists
some b∈B with (a,b)∈f, meaning every domain element has AT LEAST one
output; and RIGHT-UNIQUE (determinism) — for every a∈A and every
b₁,b₂∈B, if (a,b₁)∈f and (a,b₂)∈f then b₁=b₂, meaning every domain
element has AT MOST one output. Together, "left-total" and "right-
unique" (memory aid: LT-RU) guarantee every domain element has EXACTLY
one output — write f:A→B, with A the domain and B the codomain, and
f(a)=b when (a,b)∈f. Multiple domain elements MAY share the same output
(two inputs mapping to the same output does not violate right-
uniqueness, which only constrains what happens to a single INPUT, never
how many inputs may share an output). The same function can be
represented three equivalent ways: as a set of ordered pairs, as an
arrow diagram (each domain element sends exactly one arrow out), or as
a formula — all three describe the identical underlying set of pairs.
The range (or image) is the actual set of outputs that occur — which
can be a strict subset of the declared codomain, exactly as
`math.found.relation`'s own image-versus-codomain distinction already
established for relations generally.

## Mental Models

- **Beginner model — "a function needs a formula"**: the learner accepts
  only formula-defined mappings (f(x)=x²+1) as genuine functions,
  rejecting lookup tables or arbitrary finite pair sets. Shelf-life
  warning: this model fails the moment a function defined only by an
  enumerated table or a real-world lookup (like a vending machine's
  button-to-item mapping) is presented.
- **Intermediate model — "a function is a relation where every input has
  exactly one output, checked by two separate conditions"**: the learner
  correctly checks both left-totality and right-uniqueness, but may
  still conflate the range (actual outputs) with the codomain (declared
  target set). Upgrade trigger: being asked whether a function is
  surjective, which requires the range/codomain distinction to answer
  correctly.
- **Advanced model — "LT-RU relation, with range and codomain kept
  strictly separate, connecting directly to the informal input-output
  notion"**: the learner fluently verifies both conditions on arbitrary
  relations, correctly distinguishes range from codomain when classifying
  injective/surjective/bijective functions, and recognizes the set-
  theoretic LT-RU definition as the rigorous foundation beneath the
  informal "plug in x, get out y" notion used elsewhere in mathematics.
  Upgrade trigger: being asked to classify a specific function as
  injective, surjective, both, or neither, using range vs. codomain
  correctly.
- **Do not upgrade early**: a learner who still requires a formula to
  accept something as a function (beginner model) should not be pushed
  into injective/surjective classification (advanced model) before the
  LT-RU definition itself is secure on non-formula examples (lookup
  tables, arbitrary finite pair sets).

## Why Students Fail

The dominant failure forgets left-totality: students check that every
domain element WITH an assigned output has exactly one such output
(right-uniqueness), but do not separately verify that EVERY domain
element has at least one output at all — a relation missing some domain
elements entirely is incorrectly accepted as a function because the
elements that DO appear behave correctly. A second, independent failure
believes a function must be expressible as a formula, overgeneralizing
from school experience where nearly every function encountered (linear,
quadratic, trigonometric) happened to be formula-based, and rejecting
functions defined by finite lookup tables or arbitrary pair listings as
somehow not "real" functions. A third failure conflates range (the
actual set of outputs that occur) with codomain (the declared target
set) — an error directly inherited from `math.found.relation`'s own
image-versus-codomain confusion, now specifically corrupting the
surjective/non-surjective classification.

## Misconceptions

Reusing the Blueprint's Misconception Registry, birth-type
classification added per this program's diagnostic procedure — not
re-derived:

### MC-1: DOMAIN-COVERAGE-OMISSION (Foundational; Type 1 — overgeneralization from partial checking)
**Trigger**: R={(1,a),(2,b)} on domain A={1,2,3} and codomain B={a,b,c}
— the learner says "every element that appears as a first component
maps to exactly one output → function," missing that 3∈A has no pair in
R at all.
**Repair**: State both conditions explicitly and check each
independently: "Is every element of A ACCOUNTED FOR — does each one
appear as a first component at least once?" For this R, 3 never
appears — left-totality fails, so R is NOT a function on domain A,
regardless of how well-behaved 1 and 2 are.

### MC-2: FORMULA-ONLY (Type 5 — instruction-induced, school experience is exclusively formula-based)
**Trigger**: given f={(1,a),(2,b),(3,b)} on {1,2,3}→{a,b,c}, the learner
says "this isn't a function because there's no formula for it."
**Repair**: Verify LT-RU directly on the pair listing: every element of
{1,2,3} appears exactly once as a first component (1→a, 2→b, 3→b) —
left-total and right-unique both hold. "A function is defined by its
behavior — one output per input, every input covered — not by whether
that behavior happens to be describable by a formula. Lookup tables,
finite pair sets, and recursive definitions are all equally valid
functions."

### MC-3: RANGE-CODOMAIN-CONFLATION (Type 3 — language contamination, inherited directly from `math.found.relation`'s MC-2)
**Trigger**: f:{1,2,3}→{a,b,c,d}, f={(1,a),(2,b),(3,b)} — the learner
says "the range is {a,b,c,d}," mistakenly including c and d which are
never actually output.
**Repair**: Directly contrast: codomain = {a,b,c,d} (the declared
target set, fixed before the function is even defined); range/image =
{a,b} (only the elements actually reached). "c and d are in the
codomain but never in the range — they're 'available' destinations the
function simply never uses."

## Analogies

**Primary — the vending machine**: A vending machine is a function:
every button press (input) produces exactly one item (output), and
every button is guaranteed to work (no unresponsive buttons). If a
button could give you two different items, or if some buttons gave
nothing at all, the machine would be broken — it would fail to be a
"functional" machine in the mathematical sense. This directly models
both LT-RU conditions: every button works (left-total), and each button
gives exactly one item (right-unique).

**Anti-analogy to retire**: "A function is a rule you plug numbers
into." "Rule" smuggles in the formula requirement that drives MC-2 —
prefer "a function is a complete, deterministic assignment," which
covers formulas, tables, and arbitrary pair sets equally.

## Demonstrations

**Three representations of one function**: f:{1,2,3}→{a,b,c,d} defined
by f(1)=a, f(2)=b, f(3)=b. Set of pairs: f={(1,a),(2,b),(3,b)}⊆
{1,2,3}×{a,b,c,d}. Arrow diagram: 1→a; 2→b←3 (two inputs sharing an
output — allowed); c and d receive no arrows (in codomain, not in
range). Tabular form: input/output pairs listed directly. All three
describe the identical function.

**Left-totality violation**: R={(1,a),(2,b)} on domain {1,2,3} —
element 3 never appears as a first component. Right-uniqueness holds
for 1 and 2 individually, but left-totality fails for the domain as a
whole — R is not a function on {1,2,3}.

**Formula-free function**: f={(Alice,Bob),(Carol,Bob),(Dana,Eve)} on a
set of people, assigning each person their "emergency contact." No
formula exists, yet every person (in the domain) has exactly one
assigned contact — a genuine function.

## Discovery Questions

Present the vending-machine scenario and ask: "what would make this
machine 'broken,' in a mathematical sense?" The learner proposes two
distinct failure modes independently — a button that gives nothing
(left-totality failure) and a button that gives two different items on
different presses (right-uniqueness failure) — before either term is
named. Then formalize LT-RU as the label for what the learner already
identified as "working correctly." Recommendation: guided discovery for
the two-condition definition itself (naturally surfaces from the
"broken machine" framing); direct instruction for the range-versus-
codomain distinction, since it is a vocabulary precision issue rather
than a discoverable insight.

## Teaching Sequence

MC-1 (left-totality forgotten) is addressed first and given the most
weight, as the FOUNDATIONAL misconception per the Blueprint's own MAMR
protocol — a learner who checks only right-uniqueness will
systematically misclassify relations with domain gaps as functions.
MC-2 (formula-only) is addressed second, since it concerns which
EXAMPLES count as functions at all, independent of the LT-RU check
itself. MC-3 (range-codomain conflation) is addressed last, as a
vocabulary-precision issue that only becomes consequential once
injective/surjective classification is introduced.

## Tutor Actions

| Student state | Recommended action | Source |
|---|---|---|
| MC-1 active (left-totality forgotten) | ERROR ANALYSIS: relation missing a domain element, otherwise well-behaved | Teaching Actions: TEST-THINKING §5 |
| MC-2 active (formula required) | DEMONSTRATION: formula-free function (emergency-contact assignment) | Teaching Actions: SHOW §3 |
| MC-3 active (range=codomain) | WORKED EXAMPLE: build range and codomain for the same function side by side | Teaching Actions: SHOW §1 |
| FRAGILE on representations | MATCHING: match pair-listing, arrow-diagram, and tabular forms of the same function | Teaching Actions: ORGANIZE §3 |
| Ready for transfer | THOUGHT EXPERIMENT: "Can a function have a smaller range than codomain and still be a valid function?" | Teaching Actions: TEST-THINKING §4 |

## Voice Teaching Notes

**Register**: Concrete and behavior-first — describe functions by what
they DO (every input, exactly one output) before any formula or
notation is introduced.

**Wait-time**: After presenting a relation for the LT-RU check, wait for
the learner to check BOTH conditions independently before confirming —
a learner who checks only one condition and stops is showing MC-1
silently.

**Load-bearing sentences**:
- "Left-total: every input has an output. Right-unique: no input has
  two. A function needs both."
- "Two inputs can share an output — that's allowed. One input with two
  outputs is not."
- "The codomain is the declared destination set; the range is where the
  function actually lands — often a strict subset."

**Voice channel note**: See `foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

**Gate 1 (LT-RU VERIFICATION)**: Is R={(1,a),(1,b),(2,c)} on
{1,2,3}→{a,b,c} a function? Pass: NO — fails right-uniqueness (1 maps
to both a and b) AND left-totality (3 has no output); both failures
identified.

**Gate 2 (FORMULA-FREE RECOGNITION)**: Is f={(1,a),(2,b),(3,b)} on
{1,2,3}→{a,b,c,d} a function, despite having no algebraic formula?
Pass: YES — LT-RU verified directly from the pair listing.

**Gate 3 (RANGE vs CODOMAIN)**: For f={(1,a),(2,b),(3,b)} on
{1,2,3}→{a,b,c,d}, state the range and the codomain, and explain the
difference. Pass: range={a,b}; codomain={a,b,c,d}; explanation
distinguishes declared vs. actual.

**Gate 4 (REPRESENTATION)**: Given a function described in prose ("each
student is assigned exactly one locker"), represent it as a set of
pairs. Pass: correct pair-set construction, both LT-RU conditions
implicitly respected.

**Mastery criterion**: score ≥4/5, consistent with KG mastery_threshold
0.85.

## Tutor Recovery Strategy

**If Gate 1 fails (misses left-totality)**: MC-1 is active. Ask
explicitly: "does EVERY element of the domain appear at least once as a
first component? Check them one by one." The omission becomes visible
through the explicit enumeration.

**If Gate 2 fails**: MC-2 is active. Return to the vending-machine or
emergency-contact demonstration and re-run the LT-RU check directly on
the pair listing, with no formula involved at any point.

**If Gate 3 fails**: MC-3 is active. Return to `math.found.relation`'s
own image-versus-codomain repair pattern — the identical distinction,
now applied specifically to functions.

## Memory Hooks

**Memory type**: Declarative (LT-RU definition) + representational
(three equivalent forms of the same function).

**Forgetting profile**: Right-uniqueness (one output per input) is the
more salient, more durable half of the definition. Left-totality is
fragile and is the more commonly forgotten half — deliberately keep
domain-gap examples in rotation longer than range-codomain examples.

**Spaced retrieval targets**:
- Session +1: Verify LT-RU for a fresh relation, explicitly checking
  both conditions.
- Session +7: Distinguish range from codomain for a function with a
  strict subset range.
- Session +21: Classify a function as injective/surjective/bijective
  (requires this concept's range-vs-codomain distinction as a
  prerequisite skill).

## Transfer Connections

**Near transfer**:
- `math.func.function-concept` (the informal input-output/graph notion
  this set-theoretic definition rigorously grounds)
- Injective, surjective, and bijective classification, all requiring
  the range-versus-codomain distinction established here

**Far transfer**:
- Database keys (a primary key column defines a function from rows to
  key values — right-unique by design; a foreign key relationship is
  often NOT left-total)
- Programming: pure functions in software directly implement the LT-RU
  contract (deterministic, total on their declared input type)
- Cryptographic hash functions as a concrete, real-world right-unique
  (but typically non-injective) function example

## Cross-Subject Connections

KG lists `math.func.function-concept` as a cross-link; confirmed as
this concept's own direct KG `unlocks` target. The relationship — this
entry supplies the rigorous set-theoretic (LT-RU) foundation beneath
`math.func.function-concept`'s own informal input-output treatment — is
the Blueprint's own stated P76 cross-link transfer target, not yet
developed into a full transfer probe pending that concept's authoring.

## Blueprint References

Blueprint: `docs/curriculum/blueprints/math.found.function-set-theoretic.md`.

Key teaching objectives and misconception registry reused by reference
above; the full assessment item bank and P76 cross-link transfer probe
not restated in full.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any. The three-
representations demonstration and the formula-free-function example are
suitable future Explanation Memory seeds; Gate 1 is a suitable future
Probe asset seed.

## Curriculum Feedback

No structural KG issues found. This concept correctly builds on both
`math.found.cartesian-product` (the A×B structure) and
`math.found.relation` (the general relation this concept specializes),
and its MC-3 (range-codomain conflation) is an explicitly acknowledged
direct inheritance of `math.found.relation`'s own MC-2 — not re-derived
as new content, cited by relationship. Estimated hours (4) and mastery
threshold (0.85) are appropriate for a concept combining a two-condition
definition with a representation-fluency requirement.

## Version History

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-07-26 | Curriculum Completion Program (math.found domain, Wave 8) | Initial entry, grounded in the existing Blueprint. |
