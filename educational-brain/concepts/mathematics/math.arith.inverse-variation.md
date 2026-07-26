# Inverse Variation — `math.arith.inverse-variation`

## Identity

- **Concept ID**: `math.arith.inverse-variation` (canonical mathematics
  KG)
- **Curriculum location**: mathematics / arithmetic — child of
  `math.arith.proportion` (no children in KG)
- **Prerequisites**: `math.arith.proportion` (inverse variation is a
  related but structurally different proportional relationship
  building on the same ratio-constancy reasoning).
- **Unlocks**: `math.func.rational-function`.
- **Related** (from KG): `math.arith.direct-variation`.
- **Difficulty**: developing · **Bloom**: understand · **Mastery
  threshold**: 0.8 · **Est. hours**: 4
- **Blueprint**: none exists at `docs/curriculum/blueprints/
  math.arith.inverse-variation.md` (verified via directory listing).
  Misconceptions below authored directly via the birth-taxonomy
  diagnostic procedure (`educational-brain/misconceptions/
  01-birth-types.md`).
- **Aliases** (from KG): "inverse proportion", "y = k/x".

## Learning Objective

The learner can: state that an inverse variation is a relationship
y=k/x for a fixed constant k, meaning y DECREASES as x increases and
their product xy remains constant; correctly compute the constant of
variation k from given data by checking that x×y is the same across
all data points, distinguishing this test from direct variation's
y/x-constant test; and correctly recognize that an inverse variation's
graph is a curve (a hyperbola), not a straight line, unlike direct
variation.

## Core Understanding

An inverse variation is the relationship y=k/x for a fixed constant
k — as x increases, y DECREASES, and critically, the PRODUCT xy stays
constant across every data pair: xy=k always. This is structurally
different from direct variation's y=kx, where the RATIO y/x (not the
product xy) stays constant. Verifying which kind of variation a data
set represents requires checking the correct test: for direct
variation, check whether y/x is the same across all points; for
inverse variation, check whether x×y is the same across all points —
using the wrong test on the wrong relationship will fail to detect the
actual pattern present. Graphically, y=kx (direct variation) is a
straight line through the origin, while y=k/x (inverse variation) is a
curve called a hyperbola, approaching but never touching either axis —
a fundamentally different shape, not simply "a differently-sloped
line."

## Mental Models

- **Beginner model — "'variation' means x and y are related somehow,
  and since I just learned direct variation is y=kx, inverse variation
  probably works the same way, just with a minus sign or something"**:
  the learner, having just mastered direct variation, defaults to
  treating inverse variation as a small modification of the same
  y=kx structure rather than a structurally different relationship
  (y=k/x, a quotient, not a product). Shelf-life warning: this model
  can produce answers that are numerically close on small example
  sets, delaying detection until a clear-cut test (checking xy versus
  y/x) is applied.
- **Intermediate model — "inverse variation is y=k/x specifically, and
  I check xy for constancy correctly, but I still picture its graph as
  some kind of straight line, since that's what 'variation' meant for
  direct variation"**: the learner correctly identifies and tests for
  inverse variation algebraically but hasn't yet updated the
  GRAPHICAL expectation, still picturing a straight line rather than a
  curve. Upgrade trigger: being asked to plot or describe the shape of
  an inverse variation's graph and explain why it cannot be a straight
  line.
- **Advanced model — "inverse and direct variation are genuinely
  different relationships (quotient vs. product structure, xy-constant
  vs. y/x-constant tests, hyperbola vs. line graphs), and I select the
  correct test based on which structure the data actually exhibits,
  never assuming one because I've recently studied the other"**: the
  learner fluently distinguishes and tests for both relationship types
  using the correct constancy check for each, and correctly describes
  the qualitatively different graph shapes. Upgrade trigger: being
  asked to connect y=k/x to the more general rational-function
  framework, identifying its domain restriction and asymptotic
  behavior.
- **Do not upgrade early**: a learner who still confuses inverse
  variation's structure with direct variation's (beginner model, MC-1)
  should not be pushed toward the graph-shape distinction (advanced
  model) before the underlying algebraic difference (product vs.
  ratio constancy) is fully secure — MC-1 is FOUNDATIONAL, since every
  later test and graphing skill depends on first correctly
  distinguishing the two relationship types.

## Why Students Fail

The dominant, FOUNDATIONAL failure confuses inverse variation with
direct variation, defaulting to y=kx-style reasoning (assuming y
increases with x, or checking y/x for constancy) simply because the
shared word "variation" primes an assumption that both relationships
work the same way — the two concepts are typically studied back to
back, and the terminology itself doesn't visually or verbally signal
the structural difference (quotient versus product). A second failure
assumes an inverse variation's graph must be a straight line, since
direct variation (studied first, and often the only "variation" graph
seen so far) IS a straight line — this over-extends the straight-line
graph expectation onto a relationship whose graph is actually a curved
hyperbola. A third failure, when checking whether a data set
represents an inverse variation, checks y/x for constancy (the
DIRECT-variation test) instead of x×y (the correct inverse-variation
test), applying the wrong verification procedure to the relationship
being tested.

## Misconceptions

Authored directly via the birth-taxonomy diagnostic procedure — no
Blueprint exists for this concept:

### MC-1: INVERSE-VARIATION-CONFUSED-WITH-DIRECT-VARIATION (Foundational; Type 3 — language contamination)
**Description**: Learner treats y=k/x the same as y=kx, assuming y
increases with x — the shared word "variation" across both concept
names contaminates the assumption that both relationships behave the
same way, when the underlying structure (product vs. quotient) is
fundamentally different.
**Trigger condition**: shortly after studying direct variation, given
an inverse-variation data set or equation and asked to describe how y
changes as x increases.
**Repair target**: state explicitly and contrast directly — direct
variation is y=kx (a PRODUCT of a constant and x; y increases with x
when k>0); inverse variation is y=k/x (a QUOTIENT; y DECREASES as x
increases) — the shared word "variation" names two structurally
opposite relationships, not two similar ones.
**MAMR**: FOUNDATIONAL — every later test-selection and graphing skill
depends on first correctly distinguishing inverse variation's
structure from direct variation's; must clear before MC-2 or MC-3.

### MC-2: INVERSE-VARIATION-ASSUMED-LINEAR-GRAPH (Moderate; Type 6 — analogy overextension)
**Description**: Learner believes an inverse variation's graph is a
straight line, over-extending direct variation's straight-line graph
shape (the only "variation" graph typically seen so far) onto inverse
variation, whose graph is actually a curved hyperbola.
**Trigger condition**: asked to describe, sketch, or predict the shape
of an inverse variation's graph.
**Repair target**: plot several points of a specific inverse variation
(e.g., y=12/x: (1,12), (2,6), (3,4), (4,3), (6,2), (12,1)) and observe
they do NOT fall on a straight line — they trace a curve that gets
closer to, but never touches, either axis, called a hyperbola.

### MC-3: PRODUCT-CONSTANT-NOT-CHECKED (Moderate; Type 5 — instruction-induced)
**Description**: When verifying whether a data set represents an
inverse variation, learner checks y/x for constancy (direct
variation's test) instead of x×y — applying the WRONG verification
procedure, likely because y/x-checking was the first and
more-practiced test learned for direct variation.
**Trigger condition**: given a table of (x,y) values and asked to
determine whether it represents an inverse variation.
**Repair target**: explicitly state and apply the correct test for
inverse variation — compute x×y for each data pair and check whether
the PRODUCT (not the ratio) stays constant; for (2,6),(3,4),(6,2): x×y
= 12, 12, 12 — constant, confirming inverse variation with k=12.

## Analogies

**Primary — splitting a fixed pizza budget (a genuine inverse
relationship, contrasted against direct variation's per-hour wage)**:
if a $24 pizza budget is split evenly among x friends, each friend's
share is y=24/x — as MORE friends join (x increases), EACH friend's
share DECREASES, and the product x×y (number of friends × share per
friend) always equals the fixed total, $24. This is structurally
opposite to a per-hour wage (direct variation), where MORE hours
worked means MORE total pay, not less.

**Anti-analogy to retire**: "Inverse variation is basically the
'opposite version' of direct variation, so it should work the same way
but backwards." This directly invites MC-1 by suggesting a vague,
undefined "opposite" relationship rather than the specific quotient
structure (y=k/x) and product-constancy test that actually
characterizes inverse variation.

## Demonstrations

**Structure contrast (targets MC-1)**: direct variation y=3x (a
PRODUCT: y=3×x, y increases with x) directly beside inverse variation
y=12/x (a QUOTIENT: y=12÷x, y decreases as x increases) — evaluating
both at x=2, x=4, x=6 side by side shows the opposite behavior
explicitly (direct: 6,12,18 — increasing; inverse: 6,3,2 —
decreasing).

**Hyperbola-vs-line plot (targets MC-2)**: plotting y=12/x's points
(1,12),(2,6),(3,4),(4,3),(6,2),(12,1) — visibly a curve bending toward
both axes without touching them, contrasted against y=3x's points
(1,3),(2,6),(3,9) falling exactly on a straight line through the
origin.

**Correct-test contrast (targets MC-3)**: given (2,6),(3,4),(6,2) —
checking y/x (6/2=3, 4/3≈1.33, 2/6≈0.33 — NOT constant, so this is not
a direct variation) versus checking x×y (2×6=12, 3×4=12, 6×2=12 —
constant, confirming this IS an inverse variation with k=12) — only
the correct test for the relationship actually present reveals the
pattern.

## Discovery Questions

Present the pizza-budget scenario ($24 split among a growing number of
friends) and ask the learner to compute each friend's share as the
number of friends goes from 2 to 4 to 6 to 8, before any formula is
stated — the learner discovers each friend's share shrinks as more
friends join, and that the number-of-friends × share-per-friend
product stays fixed at $24 throughout, directly motivating both the
decreasing-y behavior and the product-constancy test from a concrete,
relatable scenario. Recommendation: guided discovery for the
decreasing-y-as-x-increases behavior and the product-constancy pattern
(directly experiential from the pizza-budget computation); direct
instruction for the hyperbola graph shape (MC-2's repair), since
recognizing the specific curve shape is not independently
rediscoverable without plotting several points and observing the
pattern.

## Teaching Sequence

MC-1 (inverse variation confused with direct variation) is addressed
first, since correctly distinguishing the two relationships'
underlying structure is the foundation every later test-selection and
graphing skill depends on. MC-3 (product constant not checked) is
addressed alongside/immediately after MC-1, establishing the correct
verification procedure. MC-2 (inverse variation assumed linear graph)
is addressed last, as a graphical-representation issue building on the
already-established algebraic understanding.

## Tutor Actions

| Student state | Recommended action | Source |
|---|---|---|
| MC-1 active (confused with direct variation) | DEMONSTRATION: side-by-side structure contrast (y=3x vs. y=12/x, evaluated at matching x values) | Teaching Actions: SHOW §3 |
| MC-3 active (product constant not checked) | WORKED EXAMPLE: correct-test contrast (y/x fails, x×y succeeds, on the same data) | Teaching Actions: SHOW §1 |
| MC-2 active (assumed linear graph) | DEMONSTRATION: hyperbola-vs-line point-plotting contrast | Teaching Actions: SHOW §3 |
| Ready for transfer | THOUGHT EXPERIMENT: connect y=k/x to the general rational-function framework's domain and asymptote analysis (cross-link probe) | Teaching Actions: TEST-THINKING §4 |

## Voice Teaching Notes

**Register**: Say "check the PRODUCT x times y" explicitly whenever
verifying inverse variation — naming which operation (product, not
ratio) is load-bearing and directly guards against MC-3.

**Wait-time**: After presenting the pizza-budget scenario, give
extended wait-time before revealing the product-constancy pattern —
let the learner compute several friend-counts and their shares, and
notice the fixed-total pattern themselves.

**Load-bearing sentences**:
- "Inverse variation means y DECREASES as x increases — the opposite
  direction from direct variation."
- "Test for inverse variation by checking whether x times y stays the
  same — not y divided by x."

**Voice channel note**: See `foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

### Gate 1 (MC-1 check)
For y=k/x, does y increase or decrease as x increases (assuming
positive k and x)? Pass: decreases.

### Gate 2 (MC-3 check)
Given the data (2,10), (5,4), (4,5), determine whether this represents
an inverse variation, and if so, find k. Pass: checks x×y for each —
2×10=20, 5×4=20, 4×5=20 — constant, confirming inverse variation with
k=20.

### Gate 3 (MC-2 check)
Describe the shape of the graph of y=8/x. Pass: a curve (hyperbola)
approaching but never touching either axis, not a straight line.

### Gate 4 (application)
The time to complete a fixed-distance trip varies inversely with
speed: at 60 mph, the trip takes 2 hours. How long does it take at 80
mph? Pass: k=60×2=120; at 80 mph, time=120/80=1.5 hours.

### Gate 5 (cross-link transfer probe, mode = cross-link probe to
`math.func.rational-function`)
`math.func.rational-function`'s own Blueprint establishes that a
rational function f(x)=p(x)/q(x) has a domain excluding zeros of
q(x), and its end-behavior depends on comparing the degrees of p and
q — specifically, if deg(p)<deg(q), f(x)→0 as x→±∞ (a horizontal
asymptote at y=0). Recognize y=k/x as the rational function
f(x)=k/x (with p(x)=k, degree 0, and q(x)=x, degree 1). Determine: (a)
what value of x must be excluded from the domain, and why; (b) using
the degree comparison rule, what is this function's end behavior as
x→±∞. Pass: (a) x=0 must be excluded, since division by zero is
undefined; (b) deg(p)=0<deg(q)=1, so f(x)→0 as x→±∞ — a horizontal
asymptote at y=0, consistent with y=k/x's graph approaching but never
touching the x-axis.

**Mastery criterion**: correct performance on all 4 gates plus the
transfer probe, consistent with KG mastery_threshold 0.8.

## Tutor Recovery Strategy

Likeliest utterance: "wait, I thought variation meant y goes up when x
goes up — why is this one going down?" — the concept-specific smaller
question: "is this relationship a product (kx) or a quotient (k/x)?"
directly surfaces MC-1 by pointing the learner at the specific
structural difference between the two "variation" types, converting a
vague sense that "variation should behave like the other one" into a
concrete, checkable algebraic distinction.

## Memory Hooks

**Type**: procedural (testing for inverse variation via x×y
constancy; distinguishing it from direct variation's y/x test) +
declarative (y decreases as x increases; the hyperbola graph shape).
Review form: fresh data-set classification prompts mixing direct and
inverse variation examples, periodically paired with a "sketch the
graph shape" spot-check to keep MC-2's guard-rail active. Interleaving
partner: `math.arith.direct-variation` (the structurally contrasting
relationship this concept is most often confused with).

## Transfer Connections

**Near transfer**:
- `math.func.rational-function` (per KG `unlocks`; inverse variation
  is the simplest possible rational function, f(x)=k/x, directly
  instantiating that concept's domain-exclusion and end-behavior
  framework)

**Far transfer**:
- `math.arith.direct-variation` (per KG `related`; the paired
  contrasting relationship, essential to study together to prevent
  MC-1's confusion)
- Physics: Boyle's law (pressure and volume at constant temperature)
  and many other physical laws are genuine inverse variations

## Cross-Subject Connections

Per KG `cross_links` [`math.func.rational-function`]: verified via
directory listing that a Blueprint EXISTS at `docs/curriculum/
blueprints/math.func.rational-function.md` (dated 2026-07-22) — since
a Blueprint exists, this entry treats the cross-link as genuine
(Tier 1) and constructs a real cross-link transfer probe (Gate 5
above) grounded in that Blueprint's own documented content (domain
exclusion via zeros of the denominator; end-behavior via degree
comparison), rather than using independence mode. No Educational Brain
entry yet exists for `math.func.rational-function` itself (verified
via directory listing) — only its Blueprint.

## Blueprint References

None exists at `docs/curriculum/blueprints/math.arith.
inverse-variation.md` (verified via directory listing before authoring
this entry). All misconceptions, demonstrations, and assessment items
above are authored directly for this Educational Brain entry, not
sourced from a Blueprint. The transfer probe (Gate 5) cites `docs/
curriculum/blueprints/math.func.rational-function.md`'s own Component
3 content (domain exclusion, degree-comparison end-behavior rule) by
reference, not restated in full.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any.

## Curriculum Feedback

No structural KG issues found. This concept's single prerequisite
(`math.arith.proportion`) and single unlock (`math.func.
rational-function`) are coherent — inverse variation is exactly the
simplest nonzero-numerator, degree-1-denominator rational function,
matching the prerequisite-to-unlock progression.

## Version History

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-07-26 | Curriculum Completion Program (math.arith domain, Wave 4 part 2, autonomous loop) | Initial entry. No Blueprint exists; misconceptions authored directly via the birth-taxonomy diagnostic procedure. |
