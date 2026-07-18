# Teaching Blueprint: Differentiability (Rigorous) (`math.real.differentiability-rigorous`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.real.differentiability-rigorous` |
| name | Differentiability (Rigorous) |
| domain | Real Analysis |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.9 → MAMR = ⌈0.9×5⌉ = 5/5 |
| estimated_hours | 5 |
| requires | `math.real.continuity-rigorous`, `math.calc.derivative-definition` |
| unlocks | `math.real.mvt`, `math.real.taylor-rigorous` |
| cross_links | `math.calc.derivative-definition` (**authored** — verified via `ls`; P76_mode = cross-link probe, see Component 7) |
| CPA_entry_stage | A (Abstract) — direct rigorous limit-definition restatement, continuing the analysis strand's established abstract entry pattern |
| description (KG) | f′(a) = lim_{h→0} [f(a+h)−f(a)]/h. Differentiable ⟹ continuous; converse fails (|x| at 0). In ℝⁿ: total derivative Df(a) is a linear map; differentiable implies all partials exist but not conversely. |

## Component 1 — Learning Objectives

- LO1: State the rigorous ε-δ-style meaning of $f'(a) = \lim_{h\to0}\frac{f(a+h)-f(a)}{h}$ existing — that this limit itself satisfies the formal ε-δ limit definition (from `math.real.continuity-rigorous`'s machinery) — and use this to rigorously prove differentiability fails at a specific point (e.g. $|x|$ at $x=0$) by showing the one-sided difference quotients disagree.
- LO2: Prove that **differentiability implies continuity** (a genuine theorem, not just an observation) using the algebraic identity $f(a+h)-f(a) = \frac{f(a+h)-f(a)}{h}\cdot h$ and limit laws, and state precisely why the **converse fails** — differentiability is a strictly stronger condition than continuity.
- LO3: State the multivariable generalization — the **total derivative** $Df(a)$ as a linear map (rather than a single number) — and recognize that the existence of all partial derivatives is **necessary but not sufficient** for (total) differentiability in $\mathbb{R}^n$.

## Component 2 — Prerequisite Check

Assumes mastery of `math.real.continuity-rigorous` (the ε-δ definition of continuity, and the equivalent sequential characterization) and `math.calc.derivative-definition` (the calculus-level derivative definition, informal understanding that differentiability implies continuity, and identification of non-differentiability points like corners/cusps — see Component 7 for the precise division of labor between the two blueprints).

## Component 3 — Core Explanation

The derivative $f'(a) = \lim_{h\to0}\frac{f(a+h)-f(a)}{h}$ **exists** precisely when this limit satisfies the rigorous ε-δ limit definition: for every $\varepsilon>0$, there exists $\delta>0$ such that $0<|h|<\delta \Rightarrow \left|\frac{f(a+h)-f(a)}{h} - f'(a)\right| < \varepsilon$. This is the same limit machinery from `math.real.continuity-rigorous`, applied to the difference-quotient function of $h$ rather than to $f$ directly.

**Differentiability implies continuity — a genuine proof, not folklore**: suppose $f'(a)$ exists. Then:
$$f(a+h)-f(a) = \frac{f(a+h)-f(a)}{h}\cdot h \xrightarrow{h\to0} f'(a)\cdot 0 = 0$$
(using the limit product law: the first factor $\to f'(a)$ by assumption, the second factor $\to 0$ trivially). So $f(a+h)\to f(a)$ as $h\to0$, which is exactly the statement that $f$ is continuous at $a$.

**The converse genuinely fails**: $f(x)=|x|$ is continuous everywhere (including at 0), but **not differentiable at 0**. The right-hand difference quotient $\frac{|0+h|-|0|}{h} = \frac{h}{h}=1$ (for $h>0$) while the left-hand difference quotient $\frac{|{-h}|-0}{-h} = \frac{h}{-h}=-1$ (for $h<0$, writing $h=-|h|$) — these one-sided limits disagree ($1\neq-1$), so the two-sided limit defining $f'(0)$ does not exist, even though $f$ is perfectly continuous there.

**In $\mathbb{R}^n$**: the derivative generalizes from a single number to the **total derivative** $Df(a)$, a **linear map** $\mathbb{R}^n\to\mathbb{R}^m$ satisfying $f(a+h) = f(a)+Df(a)(h) + o(\|h\|)$ as $h\to0$ (the linear map is the best linear approximation to $f$ near $a$). A crucial asymmetry: **differentiability (total) implies all partial derivatives exist**, but the **converse fails** — a function can have all its partial derivatives exist at a point without being (totally) differentiable there, because partial derivatives only probe behavior along the coordinate axes, while total differentiability requires a single linear approximation valid in *every* direction simultaneously.

## Component 4 — Worked Examples

**Example 1 (LO1 — rigorously proving non-differentiability of |x| at 0)**: For $f(x)=|x|$, compute the right-hand difference quotient as $h\to0^+$: $\frac{|h|}{h}=\frac{h}{h}=1$ for all $h>0$, so this one-sided limit is exactly 1. Compute the left-hand quotient as $h\to0^-$: $\frac{|h|}{h}=\frac{-h}{h}=-1$ for all $h<0$, so this one-sided limit is exactly $-1$. Since $1\neq-1$, the two-sided limit $\lim_{h\to0}\frac{|h|}{h}$ does not exist — $f'(0)$ does not exist, rigorously confirmed by the disagreement of one-sided difference-quotient limits (not merely "the graph has a corner").

**Example 2 (LO2 — the implication proof applied concretely)**: $f(x)=x^2$ at $a=3$. $f'(3)=\lim_{h\to0}\frac{(3+h)^2-9}{h} = \lim_{h\to0}\frac{6h+h^2}{h}=\lim_{h\to0}(6+h)=6$. Applying the general implication: $f(3+h)-f(3) = \frac{(3+h)^2-9}{h}\cdot h \to 6\cdot 0=0$, confirming $f(3+h)\to f(3)$, i.e. continuity at 3 — obtained purely from the existence of $f'(3)$, without separately checking the continuity limit.

**Example 3 (LO3 — partials exist but total derivative doesn't, breaking MC-2)**: Consider $f(x,y) = \frac{xy}{x^2+y^2}$ for $(x,y)\neq(0,0)$, $f(0,0)=0$. Along the $x$-axis ($y=0$): $f(x,0)=0$ for all $x$, so $\partial f/\partial x(0,0) = \lim_{h\to0}\frac{f(h,0)-f(0,0)}{h}=\lim_{h\to0}\frac{0-0}{h}=0$. Similarly $\partial f/\partial y(0,0)=0$ — **both partials exist** at the origin. But approaching along the line $y=x$ instead: $f(x,x) = \frac{x^2}{2x^2}=\frac12$ for all $x\neq0$, so $f$ does **not** even approach $f(0,0)=0$ along this direction — $f$ isn't even continuous at the origin, let alone totally differentiable, despite both partial derivatives existing there.

## Component 5 — Teaching Actions

### Teaching Action A01 — Rigorous Non-Differentiability via One-Sided Difference Quotients (Primitive P11: Representation Shift)

Recall from `math.calc.derivative-definition` that $|x|$ was already identified informally as "non-differentiable at 0 because of the corner." Shift representation to the rigorous proof: work Example 1 explicitly, computing both one-sided difference-quotient limits ($+1$ and $-1$) and concluding the two-sided limit fails to exist by the same one-sided-limit-disagreement machinery already learned in `math.calc.one-sided-limits`. State: "the picture (a visible corner) and the rigorous proof (disagreeing one-sided difference quotients) are two views of the identical fact — this lesson supplies the second."

- **MC-1 hook**: ask "is $f(x)=|x|$ continuous at 0?" immediately after establishing it's non-differentiable there — an answer of "no" reveals MC-1 (believing non-differentiability at a point implies discontinuity there, i.e. incorrectly treating the *converse* of the implication as also true).

### Teaching Action A02 — The Implication and Its Failed Converse (Primitive P06: Contrast Pair)

**Contrast 1 (targets MC-1)**: Prove the implication (differentiable $\Rightarrow$ continuous) via the algebraic identity, working Example 2 to show the proof's mechanics concretely. Then immediately place $|x|$ at $x=0$ beside it: continuous (easily checked directly), but not differentiable (Example 1). State precisely: "differentiability $\Rightarrow$ continuity is a true, proven implication. Continuity $\Rightarrow$ differentiability is FALSE — $|x|$ at 0 is the standard counterexample proving the converse fails."

**Contrast 2 (targets MC-2, multivariable partials vs. total differentiability)**: Work Example 3 — both partial derivatives exist at the origin (computed directly along the axes), yet $f$ isn't even continuous there, let alone totally differentiable. State the rule: "partial derivatives only look along the coordinate axes — total differentiability demands a single linear approximation good in EVERY direction at once; existence of the (weaker) axis-only partials never guarantees the (stronger) all-directions total derivative."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Prove rigorously, using one-sided difference quotients, that $f(x)=|x-2|$ is not differentiable at $x=2$.
  2. Using the algebraic identity $f(a+h)-f(a)=\frac{f(a+h)-f(a)}{h}\cdot h$, prove that if $f'(5)$ exists then $f$ is continuous at 5 — do not just cite the theorem, walk through the limit-law argument.
  3. Give an example (can reuse or adapt Example 3's function) illustrating that a function can have both partial derivatives exist at a point without being continuous there.
  4. A student claims: "since $f$ is continuous everywhere, it must be differentiable everywhere too." Identify the specific logical error and supply a concrete counterexample.
- **P76 (Transfer Probe, mode = cross-link probe against `math.calc.derivative-definition`)**: "Recall from your `math.calc.derivative-definition` lesson that $f'(x)=\lim_{h\to0}\frac{f(x+h)-f(x)}{h}$ was introduced via the secant-line-rotating-to-tangent-line picture, and that lesson already flagged corners, cusps, and vertical tangents as visually identifiable non-differentiability points, including that lesson's own note that 'differentiability implies continuity, but continuity does not imply differentiability.' Using THIS lesson's rigorous machinery: (a) take that lesson's informal claim about $|x|$'s corner at $x=0$ and supply the missing rigorous proof — the explicit one-sided difference-quotient computation that lesson deferred. (b) That lesson's own implication statement was asserted without proof — supply the missing algebraic proof here, using the identity from this lesson's Component 3. (c) Explain what NEW content this lesson adds beyond that one — specifically the $\mathbb{R}^n$ generalization to the total derivative as a linear map, and why 'all partials exist' is a strictly weaker condition than that lesson's single-variable differentiability."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | NON-DIFFERENTIABILITY-IMPLIES-DISCONTINUITY | Believing that if $f$ is not differentiable at a point, it must also be discontinuous there — incorrectly treating the converse of "differentiable ⟹ continuous" as also true | Foundational |
| MC-2 | PARTIALS-EXIST-IMPLIES-TOTAL-DIFFERENTIABILITY | Believing that if all partial derivatives of a multivariable function exist at a point, the function must be (totally) differentiable there | Foundational |
| MC-3 | IMPLICATION-CITED-WITHOUT-PROOF | Treating "differentiable ⟹ continuous" as a fact to be recalled/cited rather than a genuine theorem requiring its own limit-law-based proof | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Converse-of-Implication Error") → P41 (detect: ask whether $|x|$ is continuous at 0, right after establishing non-differentiability there — an incorrect "no" reveals MC-1) → P64 (conceptual shift: re-anchor on formal logic — "A⟹B being true says nothing about whether ¬A⟹¬B holds; that would require the converse B⟹A, which is exactly what fails here").
- **B02 (targets MC-2)**: P27 (name it: "Partials-Suffice Overgeneralization") → P41 (detect: present Example 3's function, confirm both partials exist at the origin, and ask if the function is therefore differentiable there) → P64 (conceptual shift: re-derive by checking a non-axis direction, e.g. the line $y=x$, showing the function isn't even continuous along that path — partials alone never see off-axis behavior).
- **B03 (targets MC-3)**: P27 (name it: "Unproven Implication Citation") → P41 (detect: ask a student to justify "differentiable implies continuous" and check whether they cite the algebraic identity or merely restate the conclusion) → P64 (conceptual shift: walk through the proof mechanically — $f(a+h)-f(a) = \frac{f(a+h)-f(a)}{h}\cdot h$, then apply limit laws to each factor separately).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.real.continuity-rigorous` (the ε-δ limit machinery this concept's difference-quotient limit relies on), `math.calc.derivative-definition` (the calculus-level derivative definition and informal awareness of non-differentiability points, rigorously completed here).
- **Unlocks**: `math.real.mvt` (the rigorous Mean Value Theorem proof requires this concept's precise differentiability definition), `math.real.taylor-rigorous` (rigorous Taylor series require rigorous higher-order differentiability).
- **Cross-link**: KG lists `math.calc.derivative-definition` as a cross-link. Verified via directory listing that `docs/curriculum/blueprints/math.calc.derivative-definition.md` **is already authored** — read directly (via grep) to confirm its exact content: it already introduces $f'(x)=\lim_{h\to0}\frac{f(x+h)-f(x)}{h}$ via the secant/tangent picture, already flags "differentiability implies continuity, not conversely," and already identifies non-differentiability points (corners, cusps, vertical tangents) informally. Division of labor: that blueprint owns the calculus-level intuition and informal statement; this blueprint owns the rigorous proofs and the $\mathbb{R}^n$ generalization, deliberately not re-teaching the informal content. The P76 cross-link probe directly asks the learner to supply the rigorous proofs that blueprint's own content left informal — the fourth instance in this corpus (after `math.graph.graph`, `math.meas.sigma-algebra`, `math.meas.measure`) of a genuine, content-verified cross-link probe that completes an earlier blueprint's deliberately-deferred content.

## Component 8 — Teaching Notes

- estimated_hours = 5 with an expert/apply tag places this at the "2 main TAs + gate" tier — A01 (rigorous non-differentiability proof) and A02 (the implication-and-failed-converse contrast, spanning both the single-variable and multivariable cases) jointly cover all three LOs, appropriate for an apply-level concept whose content is a small number of specific rigorous arguments rather than broad computational technique.
- This is the first blueprint in the corpus whose cross-link probe requires the learner to supply a proof that the EARLIER (prerequisite) blueprint explicitly stated but did not prove — a different relationship than the previous three cross-link-probe instances (which mostly re-derived or restated content in new notation); this reflects the genuine curriculum structure where an introductory calculus concept states results informally and a later rigorous-analysis concept is specifically responsible for proving them.
- The $\mathbb{R}^n$ generalization (LO3) was deliberately kept to the minimum needed to state the partials-vs-total-derivative distinction with one clear counterexample (Example 3), rather than developing the full total-derivative/Jacobian-matrix machinery, which belongs to a dedicated multivariable-analysis concept not yet in scope here.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (both) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.calc.derivative-definition` confirmed present → cross-link probe) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe, completes target's deferred proofs) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.9×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract, consistent with analysis-strand convention) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
