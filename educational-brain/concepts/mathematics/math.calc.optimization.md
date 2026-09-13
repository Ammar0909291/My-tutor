# math.calc.optimization

## Identity

- **KG ID**: `math.calc.optimization`
- **Domain**: Calculus (`math.calc`)
- **Title**: Optimization Problems
- **Requires**: `math.calc.local-extrema`
- **Unlocks**: `math.opt.unconstrained-optimization`
- **Cross-links**: `math.opt.unconstrained-optimization`
- **Difficulty**: advanced
- **Bloom level**: apply
- **Mastery threshold**: 0.75
- **Estimated hours**: 10

## Learning Objective

By the end of this concept, the learner can find the global maximum or minimum
of a function using the Closed Interval Method — evaluating the function at
every critical point AND at both endpoints of a closed, bounded interval —
and can correctly recognize when a domain is unbounded or open, in which case
global extrema may fail to exist at all and end-behavior analysis is required
instead.

## Core Understanding

`local-extrema` (this domain's immediately preceding concept) taught how to
find and classify points where a function's behavior turns from increasing to
decreasing or back — LOCAL peaks and valleys, judged only against nearby
points. Optimization asks the harder, more useful question: over an entire
interval, which single point is the BEST — the actual overall maximum or
minimum, judged against every other point in the domain simultaneously.

The procedure sounds almost too simple once stated: on a closed interval
$[a,b]$, list every critical point of $f$ that lies inside $(a,b)$, add the
two endpoints $a$ and $b$ to that list, evaluate $f$ at every point on the
combined list, and read off the largest and smallest values. The Extreme
Value Theorem guarantees this works whenever $f$ is continuous on a closed,
bounded interval — a global max and global min are GUARANTEED to exist, and
one of the finitely many candidates must be it.

The subtlety is not the arithmetic — it is knowing exactly when this
guarantee applies. Two structural conditions must both hold: the interval
must be CLOSED (endpoints included) and BOUNDED (finite length). Drop either
condition — an open interval, a half-line, or all of $\mathbb{R}$ — and the
guarantee evaporates. A function can have local extrema everywhere and still
have no global maximum or minimum at all, because the domain lets it run off
to $+\infty$ or $-\infty$, or approach but never reach a boundary value.

## Mental Models

**Level 1 (concrete)**: Walking along a fenced hiking trail from one end to
the other. The highest point of your walk could be a genuine hilltop
partway along (a local max that happens to also be the overall highest), or
it could be right at one of the two fence-ends if the trail is still
climbing when it stops. You have to check both kinds of place.

**Level 2 (representational)**: A finite list of numbers — the function's
value at every critical point AND at both endpoints. Global extrema of a
continuous function on $[a,b]$ MUST be the largest and smallest ENTRIES on
this finite, computable list. No other candidate is possible.

**Level 3 (structural)**: The Extreme Value Theorem as a CONDITIONAL
guarantee: continuous function + closed + bounded interval $\Rightarrow$
global max and min exist. Remove any one condition from the hypothesis and
the conclusion is no longer guaranteed — not "guaranteed to fail," simply
no longer promised, so it must be checked directly via limits/end behavior
instead of assumed.

**Level 4 (abstract)**: Optimization over a compact domain reduces an
infinite search (every real number in an interval) to a finite one (a
short, explicit candidate list) — the entire reason calculus-based
optimization is TRACTABLE. Later, in multivariable calculus, this exact
Closed Interval Method generalizes into finding critical points via the
gradient plus checking the entire BOUNDARY of a region (`math.calc.gradient`,
`math.calc.multivariable-extrema`) — boundary behavior plays the same
structural role there that endpoints play here.

## Why Students Fail

Students who have just mastered `local-extrema`'s classification test
(First or Second Derivative Test) treat optimization as "the same thing,
plus a comparison step" — and specifically, they treat critical points as
the ONLY kind of candidate. Endpoints get silently dropped from
consideration because nothing about the derivative singles them out as
"special" the way a critical point is. The failure is not computational; it
is a category error about which points are even eligible to be checked.

A second, structurally different failure happens on unbounded domains:
students apply the exact same procedure (find critical points, evaluate,
compare) without first asking whether the Extreme Value Theorem's
hypotheses are even satisfied — producing a confident, well-computed answer
to a question that may not have one.

## Misconceptions

**MC-1: ENDPOINTS-SKIPPED-WHEN-NO-CRITICAL-POINTS**
The student solves $f'(x)=0$, finds no solutions inside the interval (or
finds solutions that turn out to be neither max nor min), and concludes the
function has no extrema on the interval at all — never checking the
endpoints. Example: $f(x)=x^2$ on $[1,5]$ has ZERO interior critical points
($f'(x)=2x=0$ only at $x=0$, outside $[1,5]$), yet BOTH global extrema occur
at endpoints (minimum $1$ at $x=1$, maximum $25$ at $x=5$) — a case where
the entire answer lives at the boundary and the derivative-based search
contributes nothing.
*Birth type*: Type 1 (overgeneralization). The student correctly learned
from `local-extrema` that critical points are where interesting behavior
happens for LOCAL classification, and overgeneralizes this into "critical
points are the only places worth checking" for the GLOBAL question — but a
global search is fundamentally a different, larger candidate set that
always includes the boundary regardless of what the derivative does there.

**MC-2: UNBOUNDED-DOMAIN-ASSUMED-TO-STILL-GUARANTEE-GLOBAL-EXTREMA**
The student applies the Closed Interval Method's procedure — find critical
points, evaluate, compare — to a function on an unbounded domain (all of
$\mathbb{R}$, or a half-line) without checking end behavior first, and
reports whichever critical-point value came out largest/smallest as "the"
global extremum. Example: $f(x)=x^3-3x$ over ALL of $\mathbb{R}$ has the
identical critical points $x=\pm1$ as the bounded example on $[-2,3]$, but
here they give only LOCAL extrema — as $x\to+\infty$, $f\to+\infty$, and as
$x\to-\infty$, $f\to-\infty$, so NO global maximum or minimum exists at all.
*Birth type*: Type 1 (overgeneralization). The Extreme Value Theorem's
guarantee is silently overgeneralized from "closed, bounded intervals" to
"any interval a critical-point search can be run on" — the procedure's
MECHANICS (differentiate, set to zero, solve) work identically regardless
of domain, so nothing about executing the algorithm signals that its
underlying guarantee has quietly stopped applying.

**MC-3: LOCAL-EXTREMUM-ASSUMED-AUTOMATICALLY-GLOBAL**
The student finds a single local extremum via the First or Second
Derivative Test and reports it as THE global extremum without comparing it
against other candidates (other critical points, or the endpoints).
*Birth type*: Type 1 (overgeneralization). This is `local-extrema`'s own
scope silently extended past its stated boundary: that concept explicitly
classifies extrema as LOCAL, judged only against nearby points, but the
comparison step that promotes "local" to "global" is a genuinely separate
operation this concept introduces — skipping it treats the two concepts as
identical rather than as parent and child.

## Analogies

**Best analogy — the shortlist interview.** A hiring committee does not
declare a winner the moment one strong candidate walks in; they build a
SHORTLIST of every candidate worth considering (which, for this problem,
means every critical point AND the two "automatic finalists" who applied
right at the deadline — the endpoints) and then compare the whole
shortlist side by side. Skipping the endpoints is like refusing to
interview the two candidates who applied exactly on time, on the mistaken
assumption that only candidates who applied at an unusual moment (a
critical point) could possibly be worth considering.

**Anti-analogy — "just find where the derivative is flattest."** This
phrase, sometimes used loosely to describe finding extrema, actively
reinforces MC-1: it frames the ENTIRE search as being about the derivative,
with no role at all for the boundary. The Closed Interval Method's
endpoints are not found by the derivative being anything in particular —
they are automatic candidates simply because the interval ends there.

## Demonstrations

Trace $f(x)=x^3-3x$ on $[-2,3]$ (`local-extrema`'s own worked
example, now carried into a global comparison). Critical points at $x=\pm1$
($f'(x)=3x^2-3=0$). The FULL candidate list for the Closed Interval Method
is four points, not two: $x=-2$ (left endpoint), $x=-1$ (critical point),
$x=1$ (critical point), $x=3$ (right endpoint). Evaluate all four:
$f(-2)=-2$, $f(-1)=2$, $f(1)=-2$, $f(3)=18$. Reading off the extremes: global
maximum is $18$ at $x=3$ — an ENDPOINT, not a critical point at all — and
the global minimum is $-2$, achieved TWICE, tied between the left endpoint
$x=-2$ and the critical point $x=1$. This single trace demonstrates three
facts at once: endpoints can win outright, a tie between an endpoint and a
critical point is possible, and the comparison step is what actually
answers the question — the derivative work alone never would have found
$x=3$.

## Discovery Questions

1. "If I gave you $f(x)=x^2$ and asked for its lowest point on the interval
   $[1,5]$, and you found that $f'(x)=0$ only at $x=0$ — a point that isn't
   even IN your interval — what would you conclude, and would you be
   confident in that conclusion?"
2. "Does a function need to have a critical point at all, in order to have
   a highest and lowest value on a closed interval?"
3. "If I remove the boundary — ask about $f(x)=x^3-3x$ on ALL real numbers
   instead of just $[-2,3]$ — does the highest value you found before still
   hold? What happens to $f(x)$ as $x$ gets very large?"

## Teaching Sequence

1. Recall `local-extrema`'s classification test as ALREADY SOLVED — the
   learner already knows how to find and classify critical points as local
   max/min/neither.
2. Introduce the NEW question: not "is this point a local peak," but "which
   single point, among ALL points in the domain, gives the biggest/smallest
   value overall."
3. State the Closed Interval Method explicitly as a procedure with three
   steps: (a) find all critical points inside the open interval, (b) add
   both endpoints to that list unconditionally, (c) evaluate $f$ at every
   point on the combined list and compare.
4. Demonstrate MC-1 directly: $f(x)=x^2$ on $[1,5]$ has NO interior critical
   points, and the endpoints alone carry the entire answer.
5. Introduce the Extreme Value Theorem as the reason the method is
   guaranteed to work — and explicitly name its two conditions (closed,
   bounded) as things to check FIRST, before running the procedure.
6. Demonstrate MC-2: the same function $f(x)=x^3-3x$ loses its global
   extrema entirely once the interval becomes all of $\mathbb{R}$ — same
   critical points, no interval, no guarantee.
7. Apply to a composite optimization problem (fencing/area/volume style)
   requiring the learner to first build the function to be optimized, then
   apply the full method including endpoint checking.

## Tutor Actions

- If the learner reports "no critical points, so no extrema exist," ask
  them to evaluate the function at the two endpoints before concluding
  anything — do not simply state MC-1's counterexample; let them compute it.
- If the learner runs the derivative-based search on an unbounded domain
  without comment, ask explicitly: "is this interval closed and bounded?
  What does $f(x)$ do as $x$ gets very large in either direction?"
- If the learner finds one local extremum and stops, ask: "is this the ONLY
  candidate, or are there others you haven't compared it against?"

## Voice Teaching Notes

Say "check the ends too" as a short, memorable refrain the first several
times endpoints could be forgotten — the phrase should become as automatic
as "don't forget the $+C$" is for antiderivatives. When a learner names only
critical points as candidates, do not immediately correct — ask "and what
about $x=a$ and $x=b$ themselves — are they candidates?" and let the answer
land as their own realization.

## Assessment Signals

- **Early band**: Given a function with interior critical points AND asked
  to find the global max/min on a closed interval, correctly builds the full
  candidate list (critical points + both endpoints) rather than critical
  points alone.
- **Middle band**: Correctly handles $f(x)=x^2$ on $[1,5]$ — recognizes zero
  interior critical points does not mean zero extrema, and correctly
  identifies both endpoints as the answer.
- **Advanced band**: Correctly determines that $f(x)=x^3-3x$ has no global
  extrema over all of $\mathbb{R}$, citing end behavior (limits to
  $\pm\infty$) as the reason the Extreme Value Theorem's hypothesis fails.

## Tutor Recovery Strategy

If the learner has just committed MC-1 (dropped endpoints), do not simply
tell them the answer — hand them $f(x)=x^2$ on $[1,5]$ and ask them to
compute $f(1)$ and $f(5)$ directly, THEN ask whether either value could
possibly be beaten by anything else on the interval. If the learner has
committed MC-2 (ignored an unbounded domain), ask what happens to $f(x)$ as
$x\to\infty$ using their own critical-point example — let them discover the
function keeps growing past every critical-point value they found.

## Memory Hooks

"Check the ends too" — endpoints are automatic candidates, never optional,
regardless of what the derivative does there. "Closed and bounded, or all
bets are off" — the Extreme Value Theorem's guarantee has exactly two
conditions, and either one failing means the procedure's mechanics still
run but its promise no longer holds.

## Transfer Connections

Feeds forward into `math.calc.multivariable-extrema`'s own boundary-checking
requirement — in two variables, the analogue of "check the endpoints" is
"check the entire boundary curve of the region," a direct structural
generalization of this concept's endpoint step. Also feeds the eventual
Lagrange-multiplier method for constrained optimization
(`math.opt.unconstrained-optimization`, cross-linked below), where the
"constraint" plays a role analogous to this concept's interval boundary.

## Cross-Subject Connections

Physics: minimizing time or maximizing range in projectile-motion problems,
minimizing potential energy to find stable equilibria — both are literally
this Closed Interval Method applied to a physical quantity as the function
being optimized. Economics: profit-maximization and cost-minimization
problems over a bounded range of production quantities are a direct
real-world instance of exactly this procedure.

## Blueprint References

Grounded in `docs/curriculum/blueprints/math.calc.optimization.md`
(reused by reference, not restated): LO1's exact statement of the Closed
Interval Method; LO2's endpoints-always-candidates rule; LO3's
unbounded-domain caveat; Example 1's four-point $f(x)=x^3-3x$ on $[-2,3]$
trace (reused above as this entry's own Demonstrations section);
Example 2's $f(x)=x^2$ on $[1,5]$ zero-interior-critical-point case;
Example 3's unbounded-domain counterexample using the identical function
and critical points as Example 1; A03's composite fencing/area optimization
application; and the Blueprint's own three-misconception classification
(ENDPOINTS-SKIPPED-WHEN-NO-CRITICAL-POINTS, UNBOUNDED-DOMAIN-ASSUMED-TO-
STILL-GUARANTEE-GLOBAL-EXTREMA, LOCAL-EXTREMUM-ASSUMED-AUTOMATICALLY-GLOBAL),
none of which carried an explicit birth-type column — all three
independently classified above per this program's standing birth-taxonomy
diagnostic procedure.

## Runtime Asset References

None seeded. No AssetIdentity rows exist for this concept as of authoring;
promotion into the servable asset layer is separate, gated production work
(see `assetContract.ts` and the AssetIdentity Completion Program elsewhere
in this project's memory) and is out of scope for Educational Brain
authoring.

## Curriculum Feedback

Zero Blueprint/KG metadata discrepancy: `requires`, `unlocks`, `cross_links`,
`difficulty`, `bloom`, `mastery_threshold`, and `estimated_hours` all match
the live KG exactly, verified via direct query against
`docs/mathematics/kg/graph.json`.

A genuine Blueprint-STALENESS finding, not a KG discrepancy, is recorded
honestly here rather than fixed: this concept's own Blueprint states, in
its cross-link component, that `math.opt.unconstrained-optimization` "has
no Blueprint yet — verified via `ls docs/curriculum/blueprints/`." That
claim is now stale — `math.opt.unconstrained-optimization.md` DOES exist as
a Blueprint file on disk (independently re-verified this batch). However,
no Educational Brain entry exists for that concept (`math.opt` is an
entirely unstarted EB domain), so independence mode remains the correct
choice for THIS entry's own cross-link treatment — the staleness is purely
about the sibling Blueprint's own internal claim about a THIRD file, not
about anything this entry asserts, and the Blueprint file itself is left
unmodified per this program's standing rule of recording, never fixing,
such findings.

## Version History

- v1.0 (2026-09-12): Initial authoring, Batch 48 of the Mathematics
  Educational Brain completion campaign. Third of four concepts in this
  batch.
