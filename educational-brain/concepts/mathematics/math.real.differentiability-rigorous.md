# math.real.differentiability-rigorous

## Identity
- **KG id**: `math.real.differentiability-rigorous`
- **Domain**: math.real
- **Requires**: `math.real.continuity-rigorous`, `math.calc.derivative-definition`
- **Unlocks**: `math.real.mvt`, `math.real.taylor-rigorous`
- **Cross-links**: `math.calc.derivative-definition` (confirmed genuinely authored via `ls`;
  genuine cross-link probe used, consistent with the Blueprint's own correctly-checked claim)
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.9
- **Estimated hours**: 5

## Learning Objective
State the rigorous $\varepsilon$-$\delta$-style meaning of $f'(a)=\lim_{h\to0}\frac{f(a+h)-f(a)}
{h}$ existing, and use it to PROVE non-differentiability at a specific point via disagreeing
one-sided difference quotients; prove DIFFERENTIABILITY IMPLIES CONTINUITY as a genuine theorem
(never folklore to be cited), and state precisely why the CONVERSE fails; and state the
multivariable total derivative $Df(a)$ as a linear map, recognizing all partials existing is
NECESSARY BUT NOT SUFFICIENT for total differentiability.

## Core Understanding
NON-DIFFERENTIABILITY IS RIGOROUSLY PROVEN VIA DISAGREEING ONE-SIDED DIFFERENCE QUOTIENTS, NEVER
JUST "THE GRAPH HAS A CORNER": for $f(x)=|x|$ at $0$: the right-hand quotient
$\frac{|h|}{h}=\frac{h}{h}=1$ for $h>0$; the left-hand quotient $\frac{|h|}{h}=\frac{-h}{h}=-1$
for $h<0$. Since $1\ne-1$, the two-sided limit defining $f'(0)$ does not exist — rigorously
confirmed by one-sided-limit disagreement, the SAME machinery already used for continuity, applied
here to the difference-quotient function of $h$.

DIFFERENTIABILITY IMPLIES CONTINUITY — A GENUINE PROOF FROM LIMIT LAWS, NEVER A FACT TO MERELY
CITE: suppose $f'(a)$ exists. Then $f(a+h)-f(a)=\frac{f(a+h)-f(a)}{h}\cdot h\to f'(a)\cdot0=0$ as
$h\to0$ (product of the first factor $\to f'(a)$ and the second $\to0$) — so $f(a+h)\to f(a)$,
exactly continuity at $a$. THE CONVERSE GENUINELY FAILS: $f(x)=|x|$ is continuous everywhere
(including at 0) but NOT differentiable at 0 — differentiability is a strictly STRONGER condition
than continuity, never equivalent to it.

IN $\mathbb R^n$: ALL PARTIALS EXISTING IS NECESSARY BUT NOT SUFFICIENT FOR TOTAL
DIFFERENTIABILITY: for $f(x,y)=xy/(x^2+y^2)$ (with $f(0,0)=0$): along the $x$-axis, $f(x,0)=0$
for all $x$, so $\partial f/\partial x(0,0)=0$; similarly $\partial f/\partial y(0,0)=0$ — BOTH
partials exist. But along $y=x$: $f(x,x)=\frac{x^2}{2x^2}=\frac12$ for all $x\ne0$ — $f$ doesn't
even APPROACH $f(0,0)=0$ along this direction, so $f$ isn't even continuous at the origin, let
alone totally differentiable, DESPITE both partials existing there. Partials only probe behavior
along the coordinate axes; total differentiability requires one linear approximation valid in
EVERY direction simultaneously.

## Mental Models
- **"Differentiability implies continuity is a one-way street — the proof runs in exactly one
  direction, and $|x|$ at 0 is the standing proof the return trip doesn't exist."**
- **"Partial derivatives are like checking a hillside's slope only along north-south and
  east-west paths — a function can look perfectly smooth along both axes and still misbehave
  along a diagonal."**

## Why Students Fail

### MC-1: NON-DIFFERENTIABILITY-IMPLIES-DISCONTINUITY
- **Surface form**: believes that if $f$ is not differentiable at a point, it must also be
  discontinuous there.
- **Birth type**: Foundational severity (Blueprint's own declared severity — incorrectly treating
  the converse of "differentiable ⟹ continuous" as also true, a natural logical slip).
- **Repair**: re-anchor on formal logic — $A\Rightarrow B$ true says nothing about $\neg A
  \Rightarrow\neg B$, which would require the (false) converse $B\Rightarrow A$.

### MC-2: PARTIALS-EXIST-IMPLIES-TOTAL-DIFFERENTIABILITY
- **Surface form**: believes all partial derivatives existing at a point guarantees total
  differentiability there.
- **Birth type**: Foundational severity (Blueprint's own declared severity — partials feel like
  they should "add up" to the full picture, obscuring that they only see axis-aligned behavior).
- **Repair**: re-check a non-axis direction (e.g. $y=x$), showing the function can fail continuity
  entirely along that path despite both partials existing.

### MC-3: IMPLICATION-CITED-WITHOUT-PROOF
- **Surface form**: treats "differentiable ⟹ continuous" as a fact to recall rather than a
  theorem requiring its own limit-law proof.
- **Birth type**: Moderate severity (Blueprint's own declared severity — the implication is often
  encountered informally well before its proof, inviting rote citation).
- **Repair**: re-walk the algebraic identity and limit-law argument mechanically.

## Misconceptions

### MC-1: NON-DIFFERENTIABILITY-IMPLIES-DISCONTINUITY
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

### MC-2: PARTIALS-EXIST-IMPLIES-TOTAL-DIFFERENTIABILITY
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

### MC-3: IMPLICATION-CITED-WITHOUT-PROOF
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

## Analogies
- **"A smooth ride along two perpendicular test tracks doesn't guarantee a smooth ride along every
  possible diagonal path — partials are the two test tracks; total differentiability demands
  smoothness along all of them at once."**
- **Anti-analogy**: "not differentiable" is NOT the same claim as "not continuous" — $|x|$ at 0 is
  the standing counterexample proving these are genuinely different properties.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: $|x|$ at 0 — perfectly continuous, rigorously
  non-differentiable via disagreeing one-sided quotients.
- **Demonstration 2 (targets MC-3)**: the algebraic identity and limit-law proof of
  differentiability implying continuity, applied concretely to $f(x)=x^2$ at $a=3$.
- **Demonstration 3 (targets MC-2)**: $f(x,y)=xy/(x^2+y^2)$'s both-partials-exist-yet-not-even-
  continuous origin behavior.

## Discovery Questions
1. "Is f(x)=|x| continuous at 0?" (asked immediately after establishing it's non-differentiable
   there).
2. "If all partial derivatives of a multivariable function exist at a point, must the function be
   (totally) differentiable there?"
3. "Can you justify 'differentiable implies continuous' by citing the algebraic identity, or only
   by restating the conclusion?"

## Teaching Sequence
1. **Representation shift**: the rigorous one-sided-difference-quotient proof of non-
   differentiability, working Demonstration 1, isolating MC-1.
2. **Contrast pair**: the implication-and-failed-converse proof (Demonstration 2) alongside the
   partials-versus-total-derivative contrast (Demonstration 3), isolating MC-3 and MC-2
   respectively.
4. **Mastery gate**: require a correct rigorous non-differentiability proof for a new function, a
   correct walk-through of the differentiability-implies-continuity proof, and a correct
   partials-exist-but-not-differentiable counterexample, at the Blueprint's own stated MAMR of 5/5
   (⌈0.9×5⌉).

## Tutor Actions
- Never accept non-differentiability at a point treated as implying discontinuity there.
- Never accept all-partials-exist presented as sufficient for total differentiability.
- Never accept "differentiable implies continuous" cited without its limit-law proof.

## Voice Teaching Notes
- Say "does non-differentiable also mean discontinuous, or are those genuinely separate claims?"
  whenever a non-differentiability result is discussed.
- When partial derivatives are computed, ask "have you checked a non-axis direction too?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly proves non-differentiability at a new point via
  one-sided difference quotients.
- **Rung 2 (application)**: learner correctly walks through the differentiability-implies-
  continuity proof using the algebraic identity and limit laws.
- **Rung 3 (transfer)**: learner correctly completes the rigorous proofs that
  `math.calc.derivative-definition` left informal, and correctly explains why "all partials exist"
  is strictly weaker than single-variable differentiability.

## Tutor Recovery Strategy
- If MC-1 recurs, re-anchor on the formal logic of implication versus converse.
- If MC-2 recurs, re-check a non-axis direction for continuity failure.
- If MC-3 recurs, re-walk the algebraic identity and limit-law proof mechanically.

## Memory Hooks
- "Differentiable implies continuous — the reverse is false, and |x| at 0 proves it."
- "Partials only test the axes — total differentiability needs every direction at once."
- "The implication has a proof, not just a name — the algebraic identity times the limit laws."

## Transfer Connections
- `math.real.continuity-rigorous` (already authored, this campaign, Batch 130): supplies the
  $\varepsilon$-$\delta$ limit machinery this concept's difference-quotient limit directly reuses.
- `math.calc.derivative-definition` (already authored, certified domain): supplies the calculus-
  level derivative definition and informal awareness of non-differentiability points, rigorously
  completed here.
- `math.real.mvt` (not yet authored): the KG's declared unlock, requiring this concept's precise
  differentiability definition for its rigorous proof.
- `math.real.taylor-rigorous` (not yet authored): the KG's declared unlock, requiring rigorous
  higher-order differentiability built on this concept.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.real.differentiability-rigorous.md`, reused
  by reference for its rigorous $|x|$ non-differentiability proof, its differentiability-implies-
  continuity algebraic proof, its multivariable partials-versus-total-derivative counterexample,
  and its three-misconception registry (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own genuine cross-link probe against
  `math.calc.derivative-definition`, supplying the rigorous proofs that concept's own informal
  content deferred (the $|x|$ corner's rigorous justification and the differentiability-implies-
  continuity proof), and explaining the $\mathbb R^n$ generalization's new content.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.real.continuity-rigorous`/`math.calc.derivative-definition`, unlocks `math.real.mvt`/
  `math.real.taylor-rigorous`, cross_links `math.calc.derivative-definition`, expert/apply,
  mastery_threshold 0.9, estimated_hours 5) was directly verified against the live KG and matches
  exactly. The Blueprint's own cross-link-probe P76 mode was independently re-verified via `ls
  educational-brain/concepts/mathematics/` (`math.calc.derivative-definition` genuinely authored)
  and required no correction.

## Version History
- 2026-09-19 (Batch 132): authored. First entry this batch. Companion batch concept:
  `math.real.uniform-continuity`.
