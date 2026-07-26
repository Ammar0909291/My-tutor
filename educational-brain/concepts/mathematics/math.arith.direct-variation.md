# Direct Variation — `math.arith.direct-variation`

## Identity

- **Concept ID**: `math.arith.direct-variation` (canonical mathematics
  KG)
- **Curriculum location**: mathematics / arithmetic — child of
  `math.arith.proportion` (no children in KG)
- **Prerequisites**: `math.arith.proportion` (direct variation is the
  specific proportional relationship y=kx built on proportion's own
  equal-ratios definition).
- **Unlocks**: `math.func.linear-function`.
- **Related** (from KG): `math.arith.inverse-variation`, `math.func.
  linear-function`.
- **Difficulty**: developing · **Bloom**: apply · **Mastery
  threshold**: 0.8 · **Est. hours**: 4
- **Blueprint**: none exists at `docs/curriculum/blueprints/
  math.arith.direct-variation.md` (verified via directory listing).
  Misconceptions below authored directly via the birth-taxonomy
  diagnostic procedure (`educational-brain/misconceptions/
  01-birth-types.md`).
- **Aliases** (from KG): "direct proportion", "y = kx".

## Learning Objective

The learner can: state that a direct variation is a relationship
y=kx for a fixed constant k, meaning y is proportional to x with a
graph passing through the origin; correctly identify and compute the
constant of variation k from given data, distinguishing it from x and
y themselves; and correctly distinguish a genuine direct variation
from a general linear relationship y=mx+b with a nonzero b, which is
linear but NOT a direct variation.

## Core Understanding

Direct variation is the specific proportional relationship (per
`math.arith.proportion`'s own equal-ratios definition) where y=kx for
a fixed CONSTANT k — the constant of variation. Since y/x=k for every
nonzero x, the ratio between y and x never changes as both scale
together; graphically, y=kx is a straight line passing through the
ORIGIN (when x=0, y=k×0=0). This is a SPECIAL CASE of the general
linear form y=mx+b, specifically the case where b=0 — a general linear
relationship with a nonzero b (like y=mx+7) is still linear, and y
still grows as x grows, but it is NOT a direct variation, since y/x is
NOT constant across different x values (the fixed offset b breaks the
constant-ratio property). The constant k itself can be positive OR
negative — a negative k still produces a genuine direct variation
(y decreasing as x increases), still passing through the origin, still
satisfying y=kx.

## Mental Models

- **Beginner model — "direct variation just means y and x are related
  by some formula involving multiplication"**: the learner recognizes
  y=kx as "some formula" but hasn't cleanly separated the CONSTANT k
  from the VARIABLES x and y, sometimes miscomputing k or confusing
  which symbol in a given equation is the constant of variation.
  Shelf-life warning: this model can produce correct answers on simple
  problems where k is explicitly labeled, while breaking down on tasks
  requiring the learner to SOLVE for k from a data pair.
- **Intermediate model — "I can correctly identify and compute k, and
  I know direct variation means y=kx specifically, but I still
  sometimes call any linear relationship 'direct variation' without
  checking whether it passes through the origin"**: the learner
  reliably computes k but hasn't fully internalized the origin-passing
  requirement as a NECESSARY condition, occasionally misclassifying
  y=mx+b (b≠0) relationships as direct variations. Upgrade trigger:
  being given a table of (x,y) values from a linear relationship with
  a nonzero y-intercept and asked to determine whether it represents a
  direct variation.
- **Advanced model — "direct variation is EXACTLY the linear
  relationship y=kx with b=0 — I check the origin-passing condition
  explicitly (or verify y/x stays constant across all given points)
  before ever classifying a relationship as a direct variation, and I
  recognize k can be positive or negative"**: the learner fluently
  distinguishes direct variation from general linear relationships
  using the origin/constant-ratio test, and correctly handles negative
  k. Upgrade trigger: being asked to explain, using the constant-rate-
  of-change framing from linear functions, why y=kx's rate of change
  (its slope) is exactly k itself.
- **Do not upgrade early**: a learner who still confuses which symbol
  is the constant k (beginner model, MC-1) should not be pushed toward
  the origin-passing classification test (intermediate/advanced
  models) before correctly identifying k from data is fully secure —
  MC-1 is FOUNDATIONAL, since every classification and computation task
  depends on first correctly isolating k.

## Why Students Fail

The dominant, FOUNDATIONAL failure confuses which quantity in a direct
variation is the CONSTANT k, sometimes treating x or y itself as "the
constant" or miscomputing k from a given data pair — the formula
y=kx introduces three symbols (x, y, k) and without explicit practice
isolating k via k=y/x, students may not reliably distinguish the fixed
multiplier from the two varying quantities. A second failure believes
ANY linear relationship (including y=mx+b with a nonzero b) qualifies
as a direct variation, missing the requirement that the graph must
pass through the origin — this is `math.arith.proportion`'s own
"any-increasing-relationship-assumed-proportional" misconception
generalized specifically to the y=kx notation. A third failure
believes the constant of variation k must always be positive, having
only encountered early examples with positive k, missing that a
negative k still produces a valid direct variation (y decreasing as x
increases, still passing through the origin).

## Misconceptions

Authored directly via the birth-taxonomy diagnostic procedure — no
Blueprint exists for this concept:

### MC-1: CONSTANT-K-MISIDENTIFIED (Foundational; Type 5 — instruction-induced)
**Description**: Learner confuses which quantity is the constant k in
y=kx, sometimes treating x or y as "the constant," or miscomputing k
from a given data pair — the formula's three symbols (x, y, k) are
often introduced together without enough explicit isolated practice
solving for k specifically.
**Trigger condition**: given a data pair (x,y) satisfying a direct
variation and asked to find k.
**Repair target**: explicitly isolate k via k=y/x — given (4,12)
satisfying y=kx, compute k=12/4=3, confirming y=3x; always solve for k
by dividing y by x, never the reverse.
**MAMR**: FOUNDATIONAL — every classification and prediction task in
this concept depends on first correctly identifying k; must clear
before MC-2 or MC-3.

### MC-2: ANY-LINEAR-RELATIONSHIP-ASSUMED-DIRECT-VARIATION (Foundational; Type 1 — overgeneralization)
**Description**: Learner believes any linear relationship (y=mx+b,
even with a nonzero b) qualifies as a direct variation — this is
`math.arith.proportion`'s own "any-increasing-relationship-assumed-
proportional" misconception generalized specifically to the y=kx
notation, over-generalizing "y grows as x grows" to "this must be
y=kx."
**Trigger condition**: given a linear relationship with a nonzero
y-intercept (e.g., y=2x+5) and asked whether it is a direct variation.
**Repair target**: check explicitly whether the graph passes through
the origin (x=0 gives y=0) — for y=2x+5, x=0 gives y=5, not 0, so this
is NOT a direct variation, even though it is still linear and y still
increases as x increases.

### MC-3: DIRECT-VARIATION-ASSUMED-ONLY-POSITIVE-K (Moderate; Type 1 — overgeneralization)
**Description**: Learner believes the constant of variation k must be
positive, having only encountered early examples with positive k
(where y increases as x increases), over-generalizing from those
examples to a false universal rule.
**Trigger condition**: given a data pair where y decreases as x
increases (e.g., (2,-6) and (4,-12)) and asked whether this could
represent a direct variation.
**Repair target**: compute k directly — k=-6/2=-3, confirming y=-3x is
a genuine direct variation with a NEGATIVE constant; the graph still
passes through the origin, still satisfies y=kx, y simply decreases as
x increases because k itself is negative.

## Analogies

**Primary — a fixed hourly wage (extending `math.arith.proportion`'s
own flat-fee-vs-flat-rate contrast)**: earning $15 per hour worked is
direct variation — pay=15×hours, passing through the origin (0 hours
worked, $0 pay) — contrasted against a job paying $15/hour PLUS a $50
signing bonus (pay=15×hours+50), which is still linear (pay still
increases with hours) but is NOT a direct variation, since even at 0
hours worked, pay is $50, not $0.

**Anti-analogy to retire**: "Direct variation just means one thing
increases when the other does." This directly invites MC-2 by
describing co-increasing behavior without the origin-passing/
constant-ratio requirement that actually distinguishes direct
variation from any general linear relationship.

## Demonstrations

**Isolating k contrast (targets MC-1)**: given (4,12) satisfying
y=kx, compute k=12/4=3 (not k=4, not k=12) — confirming y=3x, then
verifying against a second data point, e.g. (5,15): 3×5=15 ✓.

**Origin-passing classification contrast (targets MC-2)**: y=2x
(direct variation — at x=0, y=0) versus y=2x+5 (linear, but NOT direct
variation — at x=0, y=5, not 0); computing y/x at two different x
values for each: for y=2x, y/x=2 always (constant); for y=2x+5, y/x
changes (at x=1, y/x=7; at x=5, y/x=3) — confirming only the first is
genuinely proportional.

**Negative-k contrast (targets MC-3)**: (2,-6) and (4,-12) — computing
k=-6/2=-3 and verifying k=-12/4=-3 (consistent) — confirms y=-3x is a
valid direct variation with a negative constant, y decreasing as x
increases, still passing through the origin.

## Discovery Questions

Present two wage scenarios — "$15/hour, no bonus" and "$15/hour plus a
$50 signing bonus" — and ask the learner to compute pay at 0 hours for
each before any origin-passing rule is stated — the learner discovers
the first scenario gives $0 at 0 hours (matching y=kx) while the
second gives $50 (not matching), directly motivating the
origin-passing test from a concrete, self-checkable comparison.
Recommendation: guided discovery for the origin-passing classification
test (directly experiential from the two-scenario pay comparison);
direct instruction for isolating k via k=y/x (MC-1's repair), since
the algebraic isolation step is not independently rediscoverable
without being demonstrated.

## Teaching Sequence

MC-1 (constant k misidentified) is addressed first, since correctly
isolating k from given data is the foundational skill every
classification and prediction task depends on. MC-2 (any linear
relationship assumed direct variation) is addressed second, via the
explicit origin-passing/constant-ratio classification test. MC-3
(direct variation assumed only positive k) is addressed last, as a
narrower scope-restriction error rather than a structural
misunderstanding of the relationship itself.

## Tutor Actions

| Student state | Recommended action | Source |
|---|---|---|
| MC-1 active (constant k misidentified) | WORKED EXAMPLE: isolating k via k=y/x from a given data pair, verified against a second point | Teaching Actions: SHOW §1 |
| MC-2 active (any linear relationship assumed direct variation) | DEMONSTRATION: origin-passing classification contrast (y=2x vs. y=2x+5) | Teaching Actions: SHOW §3 |
| MC-3 active (direct variation assumed only positive k) | DEMONSTRATION: negative-k data-pair contrast | Teaching Actions: SHOW §3 |
| Ready for transfer | THOUGHT EXPERIMENT: connect y=kx's constant rate of change to linear function's slope-as-rate-of-change framing (cross-link probe) | Teaching Actions: TEST-THINKING §4 |

## Voice Teaching Notes

**Register**: Say "solve for k by dividing y by x" as the default
opening move whenever k must be found from data — the explicit
isolation step is load-bearing and directly guards against MC-1.

**Wait-time**: After presenting the two wage scenarios (with and
without a signing bonus), give extended wait-time before revealing the
origin-passing distinction — let the learner compute pay at 0 hours
for both scenarios themselves.

**Load-bearing sentences**:
- "The constant of variation is found by dividing y by x, always."
- "Check whether the graph passes through the origin before calling
  anything a direct variation."

**Voice channel note**: See `foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

### Gate 1 (MC-1 check)
Given that y=kx and the point (7,21) satisfies it, find k. Pass: k=3
(21/7).

### Gate 2 (MC-2 check)
Is y=4x-8 a direct variation? Explain. Pass: no — at x=0, y=-8, not 0;
the graph does not pass through the origin, so despite being linear,
it is not a direct variation.

### Gate 3 (MC-3 check)
Given the data pair (3,-15), could this satisfy a direct variation?
If so, find k. Pass: yes, k=-5 (-15/3); a negative constant of
variation is still a valid direct variation.

### Gate 4 (application)
A recipe uses ingredients in direct variation with the number of
servings: 2 servings require 3 cups of flour. How much flour is needed
for 7 servings? Pass: k=3/2=1.5 cups per serving; 7 servings require
10.5 cups.

### Gate 5 (cross-link transfer probe, mode = cross-link probe to
`math.func.linear-function`)
`math.func.linear-function`'s own Blueprint establishes that for a
linear function f(x)=mx+b, the slope m is the function's CONSTANT rate
of change: for any two inputs x₁,x₂, (f(x₂)-f(x₁))/(x₂-x₁)=m always.
For a direct variation y=kx (the special case where b=0), compute the
rate of change between x=2 and x=5 (using y=3x), and separately
between x=10 and x=20. Confirm both give the same value, and identify
what that value equals in terms of k. Pass: rate of change = 3 in both
cases, confirming it equals k itself — a direct variation's constant
of variation IS its constant rate of change (its slope), exactly the
b=0 special case of the general linear-function framing.

**Mastery criterion**: correct performance on all 4 gates plus the
transfer probe, consistent with KG mastery_threshold 0.8.

## Tutor Recovery Strategy

Likeliest utterance: "I'm not sure which number is supposed to be k in
this problem" — the concept-specific smaller question: "if you divide
y by x, what do you get?" directly supplies the isolation procedure as
an on-demand, mechanical check the learner can apply to any data pair,
converting an abstract "which symbol is which" confusion into a
concrete arithmetic step.

## Memory Hooks

**Type**: procedural (isolating k via k=y/x; checking the
origin-passing/constant-ratio classification test) + declarative (k
can be positive or negative; direct variation is the b=0 special case
of general linear relationships). Review form: fresh data-pair and
classification prompts periodically including a negative-k case and a
nonzero-b non-example, paired with an occasional "does this pass
through the origin?" spot-check to keep MC-2's guard-rail active.
Interleaving partner: `math.arith.proportion` (the equal-ratios
definition direct variation specializes).

## Transfer Connections

**Near transfer**:
- `math.func.linear-function` (per KG `unlocks`; direct variation is
  exactly the b=0 special case of the general linear function
  y=mx+b, with k playing the role of the slope m)

**Far transfer**:
- `math.arith.inverse-variation` (per KG `related`; the paired
  contrasting relationship, y=k/x, where y DECREASES as x increases
  rather than scaling proportionally)
- Physics: many physical laws (e.g., Hooke's law, Ohm's law at
  constant resistance) are direct variations between two measured
  quantities

## Cross-Subject Connections

Per KG `cross_links` [`math.func.linear-function`]: verified via
directory listing that a Blueprint now EXISTS at `docs/curriculum/
blueprints/math.func.linear-function.md` (dated 2026-07-22) — this
corrects an inconsistency found in this same batch: `math.arith.
proportion`'s own Blueprint (authored earlier and reused by this
program in Wave 3) stated this same target concept was "not yet
authored," which was accurate at THAT Blueprint's own authoring time
but is now stale. Since a Blueprint exists, this entry treats the
cross-link as genuine (Tier 1) and constructs a real cross-link
transfer probe (Gate 5 above) grounded in `math.func.linear-function`'s
own documented content (the constant-rate-of-change framing for slope
m), rather than using independence mode. No Educational Brain entry
yet exists for `math.func.linear-function` itself (verified via
directory listing) — only its Blueprint.

## Blueprint References

None exists at `docs/curriculum/blueprints/math.arith.
direct-variation.md` (verified via directory listing before authoring
this entry). All misconceptions, demonstrations, and assessment items
above are authored directly for this Educational Brain entry, not
sourced from a Blueprint. The transfer probe (Gate 5) cites `docs/
curriculum/blueprints/math.func.linear-function.md`'s own Component 3
content (the rate-of-change formula) by reference, not restated in
full.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any.

## Curriculum Feedback

No structural KG issues found. This concept's single prerequisite
(`math.arith.proportion`) and single unlock (`math.func.
linear-function`) are coherent — direct variation is exactly the b=0
special case of the general linear function, matching the
prerequisite-to-unlock progression. **Genuine finding**: `math.arith.
proportion.md` (authored Wave 3, this program) and `math.arith.
ratios.md` (authored Wave 2, this program) both state, citing their
respective Blueprints, that `math.func.linear-function` has "no
Blueprint yet" — this was accurate when those Blueprints were
themselves authored, but a Blueprint for `math.func.linear-function`
now exists (dated 2026-07-22, verified via direct file inspection this
batch). This is a stale claim inherited from an external Blueprint,
not an error introduced by this program — recorded here honestly; not
retroactively corrected in `proportion.md`/`ratios.md` this batch
(out of this batch's own declared scope), but flagged as a known,
minor documentation-currency gap for a future maintenance pass.

## Version History

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-07-26 | Curriculum Completion Program (math.arith domain, Wave 4 part 2, autonomous loop) | Initial entry. No Blueprint exists; misconceptions authored directly via the birth-taxonomy diagnostic procedure. Discovered and recorded a stale "not yet authored" claim about math.func.linear-function's Blueprint in two prior entries from this program (proportion, ratios) — a Blueprint now exists; not retroactively corrected this batch. |
