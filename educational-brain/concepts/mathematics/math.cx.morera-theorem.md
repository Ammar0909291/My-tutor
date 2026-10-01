# math.cx.morera-theorem

## Identity
- **KG id**: `math.cx.morera-theorem`
- **Domain**: math.cx
- **Requires**: `math.cx.cauchy-integral-formula`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.8
- **Estimated hours**: 3

## Learning Objective
State Morera's theorem as the CONVERSE of Cauchy's theorem, requiring vanishing integrals over
EVERY triangle — NEVER over every closed contour; apply it as a genuine holomorphicity TEST via
the antiderivative construction — NEVER as a shortcut around computing a derivative directly; and
recognize its proof mechanism as path-independent antiderivative construction followed by
Cauchy's-formula-guaranteed infinite differentiability — NEVER an unrelated, separate argument.

## Core Understanding
MORERA'S THEOREM REQUIRES ONLY EVERY TRIANGLE, NEVER EVERY CLOSED CONTOUR: for $f$ continuous on
domain $D$, the hypothesis is $\oint_Tf\,dz=0$ for EVERY triangle $T\subset D$ — a dramatically
WEAKER requirement than checking every possible closed contour (circles, arbitrary polygons,
self-intersecting loops). Once holomorphicity is established from the triangle-only hypothesis,
Cauchy's theorem THEN guarantees vanishing over every closed contour — but that conclusion is
NEVER part of Morera's own hypothesis. Believing Morera's theorem requires checking vanishing
integrals over every closed contour to apply is WRONG — checking triangles alone suffices, a
dramatically smaller and more tractable family.

UNIFORM LIMITS OF HOLOMORPHIC FUNCTIONS ARE HOLOMORPHIC — NEVER OBVIOUS BY REAL-ANALYSIS ANALOGY:
in real analysis, $g_n(x)=|x|^{1+1/n}$ is differentiable everywhere and converges UNIFORMLY to
$|x|$ — which is NOT differentiable at $x=0$. This REAL counterexample shows uniform limits of
differentiable functions need NOT be differentiable. Yet in $\mathbb{C}$, Morera's theorem makes
the analogous claim TRUE: each $\oint_Tg_n\,dz=0$ (Cauchy's theorem, $g_n$ holomorphic), and
uniform convergence lets the limit pass through the integral, giving $\oint_Tg\,dz=0$ for every
triangle $T$ — so Morera certifies $g=\lim g_n$ is holomorphic. Believing this complex-analysis
closure fact is obvious by analogy with real analysis is WRONG — the real-variable analogue is
FALSE, making the complex result a genuine, nontrivial payoff of Morera's theorem specifically.

MORERA'S PROOF MECHANISM IS A PATH-INDEPENDENT ANTIDERIVATIVE, NEVER DIRECT DERIVATIVE
COMPUTATION: the triangle-vanishing hypothesis makes $F(z)=\int_{z_0}^zf(w)\,dw$ well-defined
(path-independent, since any two paths bound a triangle-decomposable region with vanishing
integral), and direct differentiation gives $F'=f$ EVERYWHERE. Since $F$ is holomorphic with
$F'=f$, and holomorphic functions are automatically $C^\infty$ (their derivatives holomorphic too,
by the higher-derivatives formula), $f=F'$ is ITSELF holomorphic — reached WITHOUT ever directly
computing or estimating $f'$ from a difference quotient. Believing Morera's theorem's proof
proceeds via some direct computation of $f$'s derivative is WRONG — it constructs an antiderivative
$F$ first and inherits $f$'s holomorphicity from $F$'s automatic infinite differentiability.

## Mental Models
- **"Morera only asks about triangles — a small, tractable family — never every closed contour;
  that weaker hypothesis is exactly what makes the theorem a practical test."**
- **"Real analysis has a genuine derivative-closure gap under uniform limits; Morera's theorem is
  precisely why complex analysis doesn't — it's a nontrivial payoff, not an obvious analogy."**
- **"Morera proves holomorphicity backwards through an antiderivative: build F with F'=f, then let
  F's automatic smoothness hand holomorphicity down to f — never compute f' directly."**

## Why Students Fail

### MC-1: MORERA-REQUIRES-ALL-CLOSED-CONTOURS
- **Surface form**: believes Morera's theorem requires checking vanishing integrals over every
  possible closed contour, missing that checking triangles alone suffices.
- **Birth type**: overgeneralization (Blueprint's own declared foundational severity — Cauchy's
  theorem's own conclusion, about every closed contour, is misremembered as Morera's hypothesis
  too).
- **Repair**: re-walk the triangle-only hypothesis versus the closed-contour conclusion distinction.

### MC-2: UNIFORM-LIMITS-HOLOMORPHIC-OBVIOUS
- **Surface form**: believes uniform limits of holomorphic functions being holomorphic is an
  obvious fact, missing the real-analysis counterexample showing the analogous real claim is false.
- **Birth type**: overgeneralization (Blueprint's own declared high severity — students assume
  complex analysis simply inherits real-analysis intuitions about limits and derivatives).
- **Repair**: re-walk the $|x|^{1+1/n}\to|x|$ real counterexample contrasted with the complex
  Morera-based proof.

### MC-3: MORERA-IS-DIRECT-COMPUTATION
- **Surface form**: believes Morera's theorem's proof proceeds by some direct computation of $f$'s
  derivative, missing the antiderivative-construction mechanism.
- **Birth type**: instruction-induced (Blueprint's own declared moderate severity — "holomorphicity
  test" suggests a direct derivative check rather than an indirect antiderivative route).
- **Repair**: re-walk the $F(z)=\int_{z_0}^zf(w)\,dw$ construction and $F'=f$ derivation.

## Misconceptions

### MC-1: MORERA-REQUIRES-ALL-CLOSED-CONTOURS
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

### MC-2: UNIFORM-LIMITS-HOLOMORPHIC-OBVIOUS
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

### MC-3: MORERA-IS-DIRECT-COMPUTATION
- **Surface form**: as described above.
- **Root cause (instruction-induced)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Morera's theorem is like certifying a floor is level by checking only small triangular tiles —
  never every conceivable shape you could lay across it — yet that's already enough."**
- **Anti-analogy**: uniform convergence in ℂ isn't the same safety net as in ℝ — the real-variable
  derivative can vanish under a uniform limit; Morera is precisely the extra structure that
  prevents this from happening in ℂ.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the triangle-only hypothesis versus closed-contour-conclusion
  distinction.
- **Demonstration 2 (targets MC-2)**: the $|x|^{1+1/n}\to|x|$ real counterexample contrasted with
  the Morera-certified complex closure fact.
- **Demonstration 3 (targets MC-3)**: the $F(z)=\int_{z_0}^zf(w)\,dw$ antiderivative construction
  and its $F'=f$ derivation.

## Discovery Questions
1. "Does Morera's theorem require checking every possible closed contour, or only every triangle?"
2. "Is it obvious that a uniform limit of holomorphic functions must be holomorphic, given that the
   analogous real-variable claim is false?"
3. "Does Morera's theorem's proof compute f's derivative directly, or does it proceed through an
   antiderivative construction?"

## Teaching Sequence
1. **Representation shift**: work the triangle-only-hypothesis distinction, isolating MC-1.
2. **Conflict evidence**: work the $|x|^{1+1/n}$ real counterexample against the complex closure
   fact, isolating MC-2.
3. **Contrast pair**: work the antiderivative-construction proof mechanism, isolating MC-3.
4. **Mastery gate**: require a correct statement of Morera's theorem naming triangles specifically,
   a correct explanation of why uniform-limit holomorphicity is a nontrivial payoff (not an obvious
   analogy), and a correct sketch of the antiderivative-construction proof, at the Blueprint's own
   stated MAMR of 5/5.

## Tutor Actions
- Never accept Morera's theorem stated as requiring every closed contour rather than every
  triangle.
- Never accept uniform-limit holomorphicity presented as an obvious real-analysis analogy.
- Never accept Morera's proof described as a direct derivative computation.

## Voice Teaching Notes
- Say "is that a triangle, or every possible closed contour?" whenever Morera's hypothesis is
  stated.
- Ask "does the real-variable version of that claim actually hold?" whenever a uniform-limit
  holomorphicity claim is presented as obvious.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly states Morera's theorem with the triangle-only
  hypothesis.
- **Rung 2 (application)**: learner correctly applies Morera's theorem to certify a uniform limit
  of holomorphic functions is holomorphic.
- **Rung 3 (transfer)**: learner correctly proves a function defined by a parameterized integral
  (e.g., the Gamma function) is holomorphic via Morera's theorem combined with Fubini's theorem.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the triangle-only-hypothesis distinction.
- If MC-2 recurs, re-walk the real-variable counterexample contrast.
- If MC-3 recurs, re-derive the antiderivative construction.

## Memory Hooks
- "Morera checks triangles only — never every closed contour."
- "Uniform limits of holomorphic functions are holomorphic — a genuine Morera payoff, not a real-
  analysis obvious fact."
- "Morera builds an antiderivative first — never computes f' directly."

## Transfer Connections
- `math.cx.cauchy-integral-formula` (prerequisite, already authored, this campaign): supplies the
  automatic-infinite-differentiability guarantee this concept's antiderivative-based proof
  mechanism directly relies on.

## Cross-Subject Connections
- Probability theory: proving a moment-generating or characteristic function is holomorphic in a
  strip, via Morera's theorem combined with Fubini's theorem to swap integration and the triangle
  contour integral, directly applies this concept's Gamma-function-style technique.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.cx.morera-theorem.md`, reused by reference
  for its three worked examples and its three-misconception registry (birth types adopted directly
  as declared).
- Transfer probe: the Blueprint's own independence-mode probe on proving the Gamma function is
  holomorphic via Morera's theorem combined with Fubini's theorem.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.cx.cauchy-integral-formula`, unlocks none, cross_links none, expert/apply,
  mastery_threshold 0.8, estimated_hours 3) was directly verified against the live KG and matches
  exactly.

## Version History
- 2026-09-20 (Batch 243): authored. Second entry this batch. Companion batch concept:
  `math.cx.liouville-theorem`.
