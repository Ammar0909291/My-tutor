# math.calc.curve-sketching

## Identity

- **KG ID**: `math.calc.curve-sketching`
- **Domain**: Calculus (`math.calc`)
- **Title**: Curve Sketching
- **Requires**: `math.calc.concavity`, `math.calc.local-extrema`, `math.calc.limits-at-infinity`
- **Unlocks**: (none)
- **Cross-links**: (none)
- **Difficulty**: advanced
- **Bloom level**: apply
- **Mastery threshold**: 0.75
- **Estimated hours**: 8

## Learning Objective

By the end of this concept, the learner can produce a geometrically accurate
sketch of a function's graph by systematically working through a fixed
seven-step procedure — domain, intercepts, symmetry, asymptotes, monotonicity
(via the sign of $f'$), local extrema, and concavity/inflection (via the sign
of $f''$) — in order, synthesizing first- and second-derivative information
into one coherent picture rather than treating any single step as sufficient
on its own.

## Core Understanding

Curve sketching is this domain's SYNTHESIS concept — the point where every
calculus tool built across the preceding chain
(`limits-at-infinity`$\to$`local-extrema`$\to$`concavity`) is finally combined
into a single coherent task, rather than practiced in isolation. Each
prerequisite concept answers one narrow question about a function
(monotonicity from `local-extrema`'s own derivative sign analysis, concavity
and inflection points from `concavity`, end behavior and asymptotic behavior
from `limits-at-infinity`) — and none of those questions, alone, is enough to
draw an accurate graph.

The Blueprint's own seven-step procedure imposes an ORDER, and the order
matters as much as the individual steps: domain first (excluding points the
function is not even defined at), then intercepts and symmetry, THEN
asymptotic behavior (from `limits-at-infinity`), and only after all of that,
the derivative-based analysis (increasing/decreasing from $f'$, concavity
from $f''$). Skipping straight to derivative analysis — treating "find
$f'$ and $f''$" as the whole task — risks a graph that is locally correct at
every point checked yet globally wrong, because domain gaps and asymptotes
change the overall SHAPE (how many separate pieces the graph has, where it
runs off to infinity) in ways no amount of derivative information alone can
reveal.

## Mental Models

**Level 1 (concrete)**: A seven-item checklist a detective works through in
a fixed order before closing a case — skipping an early item (domain,
asymptotes) can make later items (derivative signs) technically correct but
answering the wrong overall picture.

**Level 2 (representational)**: The graph as a picture assembled from
several INDEPENDENT layers of information — where it's defined (domain),
where it crosses the axes (intercepts), what it looks like far away
(asymptotes/end behavior), where it rises or falls (monotonicity), and where
it bends (concavity) — each layer contributes something the others cannot.

**Level 3 (structural)**: Local information (a derivative sign at one point)
versus global information (the domain's shape, the presence of asymptotes)
are genuinely DIFFERENT KINDS of facts about a function, and an accurate
sketch requires both — derivative analysis alone describes local trends
within whatever pieces the domain and asymptotes have already carved the
graph into.

**Level 4 (abstract)**: Curve sketching as the calculus-level generalization
of function analysis first introduced informally in `math.func` (domain,
range, symmetry, zeros) — every one of those earlier informal observations
is now made RIGOROUS and QUANTITATIVE using derivative tools, and the two
domains meet at exactly this concept.

## Why Students Fail

Having just spent an entire chapter mastering derivative-based tools
(`local-extrema`, `concavity`), students naturally treat "sketch this
function" as "apply the derivative tools I just learned" — jumping straight
to computing $f'$ and $f''$ and skipping the earlier, less recently-practiced
steps (domain, asymptotes) that don't involve differentiation at all. The
derivative work is genuinely correct in isolation; the resulting sketch is
wrong globally because a domain gap changes the graph's overall topology in
a way no derivative sign analysis reveals.

## Misconceptions

**MC-1: DOMAIN-AND-ASYMPTOTE-STEPS-SKIPPED-IN-FAVOR-OF-DIRECT-DERIVATIVE-ANALYSIS**
The student begins a curve-sketching task by immediately computing $f'(x)$
and $f''(x)$, without first determining the function's domain or checking
for asymptotic behavior via `limits-at-infinity`. Example: for
$f(x)=x^2/(x^2-1)$, jumping straight to derivative analysis produces
correct local increasing/decreasing and concavity information, but misses
that the function is UNDEFINED at $x=\pm1$ (vertical asymptotes there) and
approaches the horizontal asymptote $y=1$ as $x\to\pm\infty$ — facts that
fundamentally shape what the final graph looks like and that no derivative
computation alone reveals.
*Birth type*: Type 5 (instruction-induced). The immediately preceding
concepts in this domain (`local-extrema`, `concavity`) are BOTH pure
derivative-sign-analysis tasks with no domain/asymptote step of their own —
so the most recently reinforced procedural habit is "differentiate first,"
and this concept is the first point in the sequence where that habit is
insufficient on its own.

**MC-2: DOMAIN-GAPS-IGNORED-WHEN-DRAWING-A-SINGLE-CONTINUOUS-CURVE**
Even after correctly identifying a vertical asymptote or domain exclusion,
the student draws the function as ONE continuous, unbroken curve across the
gap — connecting the two sides of the asymptote as if the function passed
smoothly through the excluded point. Example: for $f(x)=1/x$, skipping
proper asymptote analysis risks drawing a single continuous curve through
$x=0$, when the true graph has TWO entirely disconnected branches, one in
each half-plane, that never touch or cross the vertical asymptote at $x=0$.
*Birth type*: Type 2 (perceptual intuition). Nearly every function a
student has sketched by hand up to this point (polynomials, most functions
encountered before `math.calc`) is a single smooth, unbroken curve — so
"a graph is one continuous piece" is a strong, hand-drawing-reinforced
visual intuition that a genuine domain gap directly contradicts, and the
contradiction is easy to miss unless the domain step was performed
explicitly and deliberately BEFORE sketching begins.

## Analogies

**Best analogy — assembling a jigsaw puzzle from the edges inward.** A
competent puzzle-solver builds the border first (the domain — which pieces
are even part of this section of the picture) and identifies the corner and
edge pieces (asymptotes, intercepts) before filling in interior detail
(derivative-based shape). Jumping straight to interior detail without first
placing the border risks a locally coherent cluster of pieces that doesn't
fit the overall picture's true shape.

**Anti-analogy — "just plot a few points and connect them."** This common
informal graphing shortcut from before calculus actively reinforces MC-2:
"connect the dots" implicitly assumes the function is continuous everywhere
between sample points, which is exactly false at a vertical asymptote or
domain exclusion — the very case curve sketching is often introduced to
handle correctly.

## Demonstrations

Full walkthrough of $f(x)=x^2/(x^2-1)$ (the Blueprint's own central worked
example), performed in the mandated order: (1) domain excludes $x=\pm1$
(denominator zero there); (2) even symmetry, since $f(-x)=f(x)$; (3)
$x$-intercept at $x=0$ (numerator zero), no $y$-axis crossing issue since
$x=0$ is in the domain; (4) vertical asymptotes at $x=\pm1$ (from the domain
exclusions), horizontal asymptote $y=1$ as $x\to\pm\infty$ (via
`limits-at-infinity`'s own leading-term technique); (5) sign of $f'$ gives
increasing/decreasing behavior on each of the domain's disconnected pieces
separately — NOT globally, since the pieces are disconnected by the vertical
asymptotes; (6) sign of $f''$ gives concavity on each piece. The final
sketch has THREE separate pieces (from the two vertical asymptotes cutting
the domain into three intervals), each approaching $y=1$ at its outer end
and blowing up toward $\pm\infty$ at its asymptote boundary — a shape no
amount of derivative analysis alone would reveal without the domain/
asymptote steps performed first.

## Discovery Questions

1. "If a function is undefined at $x=1$, what does that tell you about what
   the graph looks like right at $x=1$ — can it be a single smooth point
   there?"
2. "You've found where $f'$ is positive and negative. Before you start
   drawing — do you know yet whether the function's domain has any gaps in
   it?"
3. "For $f(x)=1/x$: is the graph one connected curve, or could it be more
   than one separate piece? How would you find out before you start
   sketching?"

## Teaching Sequence

1. Present the full seven-step procedure explicitly, in order, as a fixed
   checklist — not as a menu of optional techniques.
2. Emphasize that domain, intercepts, symmetry, and asymptotes come FIRST,
   before any derivative is computed.
3. Demonstrate MC-1 directly on $f(x)=x^2/(x^2-1)$: show what happens if
   derivative analysis is attempted first (locally correct, globally
   incomplete) versus performing the full ordered procedure.
4. Introduce $f(x)=1/x$ specifically to demonstrate MC-2: after correctly
   identifying the vertical asymptote at $x=0$, explicitly ask whether the
   graph is one piece or two before sketching.
5. Only after domain/intercepts/asymptotes are established, bring in
   `local-extrema`'s increasing/decreasing analysis and `concavity`'s
   concavity/inflection analysis, applied SEPARATELY on each disconnected
   piece of the domain.
6. Synthesize all seven steps into one final sketch, checking it against
   every fact gathered (does it respect the asymptotes? the intercepts? the
   symmetry?).

## Tutor Actions

- If the learner immediately begins differentiating without first stating
  the domain, pause and ask: "before we differentiate — is this function
  defined everywhere, or are there any excluded points?"
- If the learner draws a single continuous curve through a known vertical
  asymptote, ask: "what happens to $f(x)$ as $x$ approaches that point from
  each side — does the curve reach a specific height there, or does
  something else happen?"
- Do not accept a finished sketch that omits stating the domain and
  asymptotes explicitly, even if the derivative-based shape is correct.

## Voice Teaching Notes

Frame the seven steps as "gather all the facts before you draw," making
domain and asymptotes explicitly the FIRST facts gathered, not an
afterthought checked at the end. When a learner reaches for the derivative
first, redirect gently: "hold that thought — what do we know about where
this function even lives, before we ask how it behaves?"

## Assessment Signals

- **Early band**: Correctly states the domain and identifies vertical
  asymptotes before attempting any derivative-based analysis.
- **Middle band**: Correctly sketches $f(x)=1/x$ as two disconnected
  branches rather than one continuous curve.
- **Advanced band**: Correctly produces the full three-piece sketch of
  $f(x)=x^2/(x^2-1)$, synthesizing domain, symmetry, asymptotes, and both
  derivative-based analyses into one coherent, globally accurate picture.

## Tutor Recovery Strategy

If the learner has committed MC-1, do not correct the derivative work
(it may well be correct) — instead ask them to state the function's domain
explicitly, from scratch, before continuing. If the learner has committed
MC-2, show them the function's value at two points very close to the
asymptote from opposite sides (e.g., $f(-0.01)$ and $f(0.01)$ for
$f(x)=1/x$) and ask whether those two values look like they belong to the
same connected curve.

## Memory Hooks

"Domain and asymptotes first, derivatives second" — the seven-step order is
not arbitrary; the early non-derivative steps determine the graph's overall
shape and piece-count before any local behavior is analyzed. "A vertical
asymptote is a wall, not a bridge" — the graph never crosses it, and the
two sides may be entirely separate pieces.

## Transfer Connections

This concept is the domain's own capstone integration point — it does not
unlock a further math.calc concept, but it is the concept every learner
should be able to apply the full derivative toolkit (`limits-at-infinity`,
`local-extrema`, `concavity`) through, in combination, going forward. Any
future function-analysis task (in applied optimization, in physics
kinematics graphs, in economics marginal-analysis graphs) draws on this
exact synthesized procedure.

## Cross-Subject Connections

Physics: sketching position, velocity, or acceleration graphs from a given
function requires exactly this synthesis (where the function is undefined,
where it crosses zero, where it increases/decreases, where it curves).
Economics: sketching cost, revenue, or profit curves against production
quantity uses the identical seven-step procedure, often with a genuinely
meaningful vertical asymptote (e.g., average cost as production approaches
zero).

## Blueprint References

Grounded in `docs/curriculum/blueprints/math.calc.curve-sketching.md`
(reused by reference, not restated): LO1's exact seven-step procedure
statement; LO2's synthesis requirement; LO3's skip-a-step risk statement;
Example 1's full $f(x)=x^2/(x^2-1)$ walkthrough (reused above as this
entry's own Demonstrations section); Example 2's local-max-with-negative-
second-derivative consistency check; Example 3's $f(x)=1/x$ disconnected-
branches case; A03's business profit-function curve-sketching transfer
probe; and the Blueprint's own two-misconception classification
(DOMAIN-AND-ASYMPTOTE-STEPS-SKIPPED-IN-FAVOR-OF-DIRECT-DERIVATIVE-ANALYSIS,
DOMAIN-GAPS-IGNORED-WHEN-DRAWING-A-SINGLE-CONTINUOUS-CURVE), neither of
which carried an explicit birth-type column — both independently classified
above per this program's standing birth-taxonomy diagnostic procedure.

## Runtime Asset References

None seeded. No AssetIdentity rows exist for this concept as of authoring;
promotion into the servable asset layer is separate, gated production work
and is out of scope for Educational Brain authoring.

## Curriculum Feedback

Zero Blueprint/KG metadata discrepancy: `requires` (all three prerequisites),
`unlocks` (empty), `cross_links` (empty), `difficulty`, `bloom`,
`mastery_threshold`, and `estimated_hours` all match the live KG exactly,
verified via direct query against `docs/mathematics/kg/graph.json`.

## Version History

- v1.0 (2026-09-12): Initial authoring, Batch 48 of the Mathematics
  Educational Brain completion campaign. Second of four concepts in this
  batch.
