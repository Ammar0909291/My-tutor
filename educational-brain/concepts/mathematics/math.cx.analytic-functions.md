# math.cx.analytic-functions

## Identity
- **KG id**: `math.cx.analytic-functions`
- **Domain**: math.cx
- **Requires**: `math.cx.cauchy-riemann`
- **Unlocks**: `math.cx.cauchy-theorem`, `math.cx.power-series-cx`
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: understand
- **Mastery threshold**: 0.9
- **Estimated hours**: 5

## Learning Objective
Recognize "holomorphic" as an OPEN-SET property — NEVER treat differentiability at a single
point as sufficient; recognize holomorphic $\iff$ analytic is an EXACT equivalence in
$\mathbb{C}$ — NEVER assume the real-analysis smooth-but-not-analytic gap transfers; and
distinguish "entire" (holomorphic on ALL of $\mathbb{C}$) from "analytic" (local power-series
representability on a possibly smaller domain) — NEVER conflate the two.

## Core Understanding
"HOLOMORPHIC" IS AN OPEN-SET PROPERTY — NEVER SATISFIED BY DIFFERENTIABILITY AT A SINGLE POINT:
for $f(z)=|z|^2=x^2+y^2$: $u=x^2+y^2,v=0$; CR requires $2x=0$ and $2y=0$, BOTH true only at
$(0,0)$. $f$ IS complex-differentiable at $z=0$ — but checking ANY nearby point (e.g. $z=0.01$)
shows CR fails there too, so NO open disk around $0$, however small, consists entirely of
differentiable points. Believing complex differentiability at a single point is sufficient for
"holomorphic" is WRONG — holomorphic is DEFINED as a property of an open set (f' exists at EVERY
point of some open $U$); a single isolated point is never an open set, so pointwise
differentiability never by itself establishes holomorphy.

HOLOMORPHIC $\iff$ ANALYTIC IS AN EXACT EQUIVALENCE IN $\mathbb{C}$ — NEVER THE SAME GAP AS
$\mathbb{R}$: in real analysis, $g(x)=e^{-1/x^2}$ (with $g(0)=0$) is $C^\infty$ yet its Taylor
series at $0$ is identically zero, NOT matching $g(x)$ for $x\neq0$ — a genuine smooth-but-not-
real-analytic gap. NO such gap exists in $\mathbb{C}$: if a complex function is differentiable
ONCE on an open set, it is AUTOMATICALLY infinitely complex-differentiable AND equals its own
convergent power series there. Believing a complex function could be "infinitely complex-
differentiable" on an open set without a convergent power series representation, by analogy with
the real case, is WRONG — complex differentiability, requiring the SAME limit from EVERY direction
in the plane, is a far more restrictive condition than real differentiability, restrictive enough
to force the full power-series conclusion for free.

"ENTIRE" MEANS HOLOMORPHIC ON ALL OF $\mathbb{C}$ — NEVER THE SAME AS "ANALYTIC" IN GENERAL: $f(z)
=z^2$, $e^z$, and all polynomials are ENTIRE (holomorphic on the WHOLE of $\mathbb{C}$). By
contrast, $f(z)=1/z$ is ANALYTIC at every point of $\mathbb{C}\setminus\{0\}$ but UNDEFINED at
$z=0$ — holomorphic on the open set $\mathbb{C}\setminus\{0\}$, NOT entire, because "entire"
specifically requires the domain to BE all of $\mathbb{C}$. Conflating "entire" with "analytic in
general" is WRONG — "analytic" is always relative to a stated domain (possibly a proper subset of
$\mathbb{C}$), while "entire" specifically asserts that domain is the ENTIRE complex plane.

## Mental Models
- **"Holomorphic is defined over a whole open set — a single differentiable point, however
  genuine, is never enough scope for the word to apply."**
- **"In ℂ, differentiable once on an open set means infinitely differentiable AND equal to your
  own power series — no gap like ℝ's e^(−1/x²), because the complex condition is far stronger."**
- **"Entire means the WHOLE plane, no exceptions — 1/z is perfectly analytic away from 0, but
  that single missing point already disqualifies 'entire.'"**

## Why Students Fail

### MC-1: POINTWISE-DIFFERENTIABLE-IS-HOLOMORPHIC
- **Surface form**: treats complex differentiability at a single point as sufficient for
  "holomorphic," missing the open-set requirement; misclassifies $f(z)=|z|^2$ as holomorphic at
  $z=0$.
- **Birth type**: overgeneralization (Blueprint's own declared foundational severity — passing a
  pointwise check "feels" like a positive result strong enough for the stronger claim).
- **Repair**: check any nearby point explicitly, showing no surrounding disk works, however small.

### MC-2: REAL-SMOOTH-GAP-TRANSFERS-TO-COMPLEX
- **Surface form**: assumes, by analogy with real analysis, that a complex function could be
  "infinitely complex-differentiable" without having a convergent power series representation.
- **Birth type**: overgeneralization (Blueprint's own declared birth type — the well-founded real
  fact is incorrectly transferred to the complex setting).
- **Repair**: contrast the weakness of real differentiability (only two directions) against the
  strength of complex differentiability (every direction simultaneously), explaining why the gap
  closes.

### MC-3: ENTIRE-MEANS-ANALYTIC-SAME-DOMAIN
- **Surface form**: conflates "entire" (holomorphic/analytic on all of $\mathbb{C}$) with
  "analytic" in general (local power-series representability on whatever domain is specified,
  possibly a proper subset); misclassifies $1/z$ as entire.
- **Birth type**: overgeneralization (Blueprint's own declared birth type — "analytic everywhere
  it's defined" sounds equivalent to "entire" without noticing the domain restriction).
- **Repair**: emphasize that $1/z$'s domain already excludes $z=0$, so "everywhere it's defined"
  is not "everywhere."

## Misconceptions

### MC-1: POINTWISE-DIFFERENTIABLE-IS-HOLOMORPHIC
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

### MC-2: REAL-SMOOTH-GAP-TRANSFERS-TO-COMPLEX
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

### MC-3: ENTIRE-MEANS-ANALYTIC-SAME-DOMAIN
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Holomorphic at a point is shorthand for 'differentiable on a whole neighborhood of that
  point' — checking only the point itself is like checking one pixel and calling the whole photo
  in focus."**
- **Anti-analogy**: the complex holomorphic-analytic equivalence isn't a lucky coincidence for
  well-behaved functions — it's forced automatically, with none of real analysis's smooth-but-not-
  analytic exceptions.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the $|z|^2$ single-point-differentiable-nowhere-holomorphic
  computation.
- **Demonstration 2 (targets MC-2)**: the $e^{-1/x^2}$ real-analysis gap contrasted against the
  complex holomorphic-analytic equivalence.
- **Demonstration 3 (targets MC-3)**: the entire-versus-analytic-on-a-subset contrast using $1/z$.

## Discovery Questions
1. "Is a function differentiable at exactly one point automatically holomorphic at that point?"
2. "Could a complex function be infinitely complex-differentiable on an open set without equaling
   its own power series there?"
3. "Is 1/z entire?"

## Teaching Sequence
1. **Representation shift**: state holomorphic/analytic/entire together, work the $|z|^2$
   counterexample, isolating MC-1.
2. **Contrast pair**: contrast the real $e^{-1/x^2}$ gap against the complex equivalence, isolating
   MC-2; then contrast entire against analytic-on-a-subset via $1/z$, isolating MC-3.
3. **Mastery gate**: require a correct explanation of why pointwise differentiability and
   holomorphy differ, a correct CR-based classification of a given function's differentiability
   set, a correct identification of the largest domain where a function is holomorphic, and a
   correct statement of the holomorphic-analytic equivalence contrasted with the real case, at the
   Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept a function judged holomorphic from differentiability at a single point alone.
- Never accept the real smooth-but-not-analytic gap assumed to hold in the complex setting.
- Never accept "entire" and "analytic" treated as interchangeable without checking the domain.

## Voice Teaching Notes
- Say "does that hold on a whole neighborhood, or just at that one point?" whenever holomorphy is
  claimed.
- Ask "is that function actually defined everywhere in ℂ, or just analytic somewhere smaller?"
  whenever "entire" is invoked.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly distinguishes differentiable-at-a-point from
  holomorphic-on-a-set using the $|z|^2$ example.
- **Rung 2 (application)**: learner correctly classifies a set of functions as entire, analytic on
  a proper subset, or nowhere holomorphic.
- **Rung 3 (transfer)**: learner correctly diagnoses a direction-dependent limit failure at a
  point, distinguishing it from $|z|^2$'s weaker single-point success.

## Tutor Recovery Strategy
- If MC-1 recurs, re-check a nearby point explicitly to show no neighborhood works.
- If MC-2 recurs, re-contrast real versus complex differentiability's directional strength.
- If MC-3 recurs, re-emphasize the domain restriction implicit in "analytic everywhere it's
  defined."

## Memory Hooks
- "Holomorphic needs a whole open set — one differentiable point is never enough."
- "In ℂ, differentiable once on an open set means analytic there too — no exceptions like ℝ's
  e^(−1/x²)."
- "Entire means the WHOLE plane — 1/z is analytic but not entire, missing just one point."

## Transfer Connections
- `math.cx.cauchy-riemann` (prerequisite, already authored, this campaign): supplies the pointwise
  CR test this concept applies repeatedly while adding the open-set/whole-domain scope on top.

## Cross-Subject Connections
- Signal processing and control theory: transfer functions are required to be holomorphic
  (analytic) on regions of the complex plane away from their poles, directly using this concept's
  entire-versus-analytic-on-a-subset distinction.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.cx.analytic-functions.md`, reused by
  reference for its three-definition unification, its $|z|^2$ and $1/z$ contrasts, and its
  three-misconception registry (birth types adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe on $f(z)=z^5/\bar z^4$, showing the
  difference quotient's limit depends on the direction $\theta$ and fails to exist even at the
  single point $z=0$, a strictly weaker function than $|z|^2$.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.cx.cauchy-riemann`, unlocks `math.cx.cauchy-theorem`/`math.cx.power-series-cx`,
  cross_links none, expert/understand, mastery_threshold 0.9, estimated_hours 5) was directly
  verified against the live KG and matches exactly.

## Version History
- 2026-09-20 (Batch 238): authored. First entry this batch. Companion batch concept:
  `math.cx.harmonic-functions`.
