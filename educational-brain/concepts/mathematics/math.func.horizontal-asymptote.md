# math.func.horizontal-asymptote

## Identity
- **KG ID**: `math.func.horizontal-asymptote`
- **Domain**: math.func (Functions)
- **Requires**: `math.func.rational-function`
- **Unlocks**: none listed in the KG
- **Cross-links**: none listed in the KG
- **Difficulty**: proficient
- **Bloom level**: analyze
- **Mastery threshold**: 0.80 (MAMR 4/5)
- **Estimated hours**: 3
- **CPA stage**: Concrete (a numerical table of $f(x)$ at $x=10,100,1000$ and $x=-10,-100,-1000$ showing convergence to a finite limit, before the algebraic rule is derived)

## Learning Objective
By the end of this concept, the learner can:
1. Determine a rational function's horizontal asymptote (or its absence) using degree comparison: $\deg(P)<\deg(Q)\Rightarrow y=0$; $\deg(P)=\deg(Q)\Rightarrow y=a_n/b_n$ (ratio of leading coefficients); $\deg(P)>\deg(Q)\Rightarrow$ no horizontal asymptote.
2. Recognize that a function CAN cross its horizontal asymptote — unlike a vertical asymptote, a horizontal asymptote is a statement about the tails only.
3. Identify an oblique (slant) asymptote when $\deg(P)=\deg(Q)+1$, found via polynomial long division.
4. Verify an asymptotic claim by evaluating the function at large $x$-values, using this as a CHECK on the algebraic answer, never as the primary derivation method.

## Core Understanding
`math.func.rational-function` already introduced, at orientation level, that a rational function's long-run behavior comes from comparing the degrees of numerator and denominator. This concept develops that comparison into a complete, precise rule with three cases (plus a fourth, oblique, case), and corrects the single most consequential misunderstanding about ANY asymptote in this family: what "approaches" actually permits.

**THE THREE-CASE DEGREE RULE COMES DIRECTLY FROM DIVIDING BY THE HIGHEST POWER.** For $f(x)=\dfrac{a_nx^n+\cdots}{b_mx^m+\cdots}$, dividing every term by $x^{\max(n,m)}$ isolates exactly which terms survive as $x\to\pm\infty$. If $n<m$: after dividing by $x^m$, the numerator's every term still has a positive power of $x$ in the denominator and vanishes, while the denominator's leading term survives as $b_m$ — so $f(x)\to0/b_m=0$. If $n=m$: dividing by $x^n=x^m$ leaves $a_n$ over $b_m$ exactly, so $f(x)\to a_n/b_n$. If $n>m$: the numerator's leading term survives division by $x^m$ while growing without bound, so $f(x)\to\pm\infty$ — no finite horizontal asymptote exists, though an oblique one may.

**A HORIZONTAL ASYMPTOTE IS A LIMIT STATEMENT ABOUT THE TAILS, NOT A HARD BOUNDARY THE GRAPH CANNOT TOUCH.** This is the single most important distinction in this concept, and it is exactly where a vertical asymptote's behavior (never crossed, ever, because the function is undefined there) gets wrongly transferred. A horizontal asymptote describes what happens as $x\to\pm\infty$ specifically — it says nothing at all about finite $x$-values, where the function remains perfectly well-defined and free to equal, exceed, or oscillate around the asymptote's value. Finding where a horizontal asymptote is crossed is a straightforward equation: set $f(x)=L$ (the asymptote's value) and solve; any real solution is a genuine crossing point.

**AN OBLIQUE (SLANT) ASYMPTOTE APPEARS EXACTLY WHEN $\deg(P)=\deg(Q)+1$, VIA POLYNOMIAL LONG DIVISION.** Dividing $P(x)$ by $Q(x)$ gives $f(x)=(ax+b)+\dfrac{R(x)}{Q(x)}$ where $\deg(R)<\deg(Q)$. As $x\to\pm\infty$, the remainder term $R(x)/Q(x)\to0$ (a smaller-degree-over-larger-degree ratio), so $f(x)\approx ax+b$ — the line $y=ax+b$ IS the oblique asymptote, found by the exact same long-division mechanics already familiar from `math.func.polynomial-function` and `math.func.end-behavior`. Like horizontal asymptotes, an oblique asymptote describes tail behavior only and can also be crossed in the interior.

**A NUMERICAL EVALUATION APPROXIMATES; IT NEVER PROVES THE EXACT ASYMPTOTE VALUE.** Evaluating $f(1000)$ and getting $2.003$ is genuine evidence the asymptote is NEAR $2$ — but it is not the exact value $2$ itself, and no finite evaluation, however large, can ever BE the limit. The exact value comes only from the algebraic degree-comparison rule; numerical evaluation is a useful sanity check afterward, never a substitute for the derivation.

## Mental Models
1. **Rung 1 — Dividing by the biggest power reveals who survives.** Dividing every term by $x^{\max(n,m)}$ is the single mechanical move that produces all three degree-comparison cases from one procedure, rather than three separate memorized rules.
2. **Rung 2 — The horizon is a direction, not a wall.** A horizontal asymptote describes where the graph is HEADED at the far edges of the picture — it places no restriction whatsoever on what the graph does closer to the center.
3. **Rung 3 — Long division splits a function into "the trend" plus "the fading correction."** $f(x)=(\text{asymptote line})+(\text{a term that vanishes at infinity})$ — this decomposition, already familiar for polynomial-over-constant cases, generalizes directly to the oblique-asymptote case.

## Why Students Fail
MC-1 happens because a learner has already internalized, correctly, that a VERTICAL asymptote can never be crossed (the function is genuinely undefined there — a hard, structural fact) and over-generalizes that same hard rule onto horizontal asymptotes, which are a fundamentally different kind of statement (a limit at infinity, not an undefined point) — the surface similarity of "there's a dashed line the graph approaches" masks a real difference in what kind of constraint each dashed line represents. MC-2 happens because plugging in a large value of $x$ is a legitimate and commonly-taught checking strategy, introduced BEFORE the exact algebraic degree-comparison rule — so a learner who has only encountered the numerical approach stops there, mistaking an approximation (however close) for the exact asymptote value, never having been shown that the algebra alone gives the precise answer the numerical approach can only estimate. MC-3 happens because the three-case degree rule (less than, equal, greater than) is typically memorized as a closed, complete system before the fourth, adjacent case ($\deg(P)=\deg(Q)+1$, requiring long division rather than the same three-case rule) is introduced separately — so a learner applies the "greater than" branch's conclusion ("no horizontal asymptote") and stops, missing that an OBLIQUE asymptote still exists in that specific sub-case.

## Misconceptions

### MC-1: HORIZONTAL-NEVER-CROSSED
- **Birth type**: Type 1 — Overgeneralization (adopted directly from the Blueprint's own explicit classification)
- **Description**: The learner believes the graph can NEVER cross a horizontal asymptote, transferring the vertical-asymptote rule (never crossed, because the function is undefined there) universally onto horizontal asymptotes.
- **Why this birth type**: Vertical asymptotes are never crossed for a structural reason (the function is undefined at that $x$-value); horizontal asymptotes are a limit statement only, with no such structural prohibition at finite $x$ — the learner extends a correct, hard rule about one kind of asymptote onto a different kind, where it doesn't apply.
- **Detection probe**: "$f(x)=\dfrac{x^2-1}{x^2+1}$. Can $f$ ever equal $0$?" — a learner holding this misconception says no, reasoning that $0$ can't be reached because it lies "on the asymptote" (confusing this with a different asymptote value).
- **Repair**: Solve $f(x)=0$ directly: $x^2-1=0\Rightarrow x=\pm1$, and indeed $f(1)=f(-1)=0$ — the function genuinely crosses $y=0$ at two finite points. Separately, the actual horizontal asymptote here is $y=1$ (ratio of leading coefficients, both $1$), and $f$ never equals $1$ for a different, specific algebraic reason ($x^2-1=x^2+1$ has no solution) — not because crossing an HA is universally forbidden.
- **Verification of death**: Given any rational function, the learner correctly states that its horizontal asymptote describes tail behavior only, and separately checks (by solving $f(x)=L$) whether the graph crosses it in the interior, never assuming crossing is impossible by default.

### MC-2: PLUG-IN-LARGE-NUMBER
- **Birth type**: Type 5 — Instruction-induced (adopted directly from the Blueprint's own explicit classification)
- **Description**: The learner substitutes a large value like $x=1000$, reads off an approximate value like $2.003$, and reports the horizontal asymptote as "$y=2.003$" — a numerical approximation mistaken for the exact asymptote.
- **Why this birth type**: Plugging in large numbers is a legitimate and commonly-taught checking strategy, introduced before the exact algebraic degree-comparison rule — a learner who stops at this numerical step never derives the true limit, since the instructional sequence itself invites treating the approximation as the answer.
- **Detection probe**: "For $f(x)=\dfrac{2x+1}{x-3}$, you compute $f(1000)\approx2.007$. What is the exact horizontal asymptote?" — a learner holding this misconception answers "$y=2.007$" (or similar) rather than the exact value $y=2$.
- **Repair**: Derive the exact value algebraically: dividing by $x$, $\dfrac{2+1/x}{1-3/x}\to\dfrac{2}{1}=2$ as $x\to\infty$. Contrast against the approximation $2.007$ at $x=1000$ — close, but not exact, precisely because $x=1000$ is large but not infinite. State plainly: "numerical evaluation gets you CLOSE; algebra gets you EXACT."
- **Verification of death**: Given a rational function, the learner derives the horizontal asymptote via the degree-comparison rule FIRST, using a large-$x$ evaluation only afterward as a confirming check, never as the primary source of the answer.

### MC-3: OBLIQUE-IS-HORIZONTAL
- **Birth type**: Type 5 — Instruction-induced (adopted directly from the Blueprint's own explicit classification)
- **Description**: When $\deg(P)=\deg(Q)+1$ (the function has an oblique asymptote $y=mx+b$), the learner either reports "no asymptote" or mistakes the $y$-intercept $b$ of the oblique line for a horizontal asymptote.
- **Why this birth type**: The three-case horizontal-asymptote rule is typically memorized as a complete, closed system before the adjacent fourth case (requiring long division rather than the same degree-comparison rule) is introduced separately — the earlier, seemingly-complete pattern persists uncorrected when a genuinely different case appears.
- **Detection probe**: "$f(x)=\dfrac{x^2+2x-1}{x+1}$. Does $f$ have a horizontal asymptote?" — a learner holding this misconception says "no, since $\deg(P)>\deg(Q)$" and stops, missing the oblique asymptote that exists in this specific sub-case.
- **Repair**: Perform the long division live: $x^2+2x-1=(x+1)(x+1)+(-2)$, so $f(x)=(x+1)+\dfrac{-2}{x+1}$. As $x\to\pm\infty$, the remainder term vanishes, so $f(x)\approx x+1$ — a SLANTED line, not a horizontal one, is the asymptote here. State explicitly: "$\deg(P)>\deg(Q)$ means no HORIZONTAL asymptote, but if $\deg(P)$ is exactly one more than $\deg(Q)$, there IS an oblique one — a different phenomenon from a horizontal asymptote, found by an entirely different method (long division, not degree-ratio)."
- **Verification of death**: Given a rational function with $\deg(P)=\deg(Q)+1$, the learner correctly identifies the oblique asymptote via long division, distinct from stating "no asymptote" or confusing it with a horizontal one.

## Analogies
1. **The horizon versus a wall (for MC-1)**: a horizontal asymptote is like the horizon on a long road — the road's DIRECTION points toward it far away, but nothing stops the road from crossing back and forth near where you're actually standing. A vertical asymptote is like a wall with no door — you genuinely cannot be on the other side of it at all.
2. **A photograph versus the actual destination (for MC-2)**: evaluating at $x=1000$ is like taking a photo from very far down the road — it shows you're close to the horizon, but the photo itself is never the horizon; only the algebraic limit tells you exactly where the horizon is.
3. **A fourth lane that wasn't on the original map (for MC-3)**: the three-case rule is like a map with three roads (left, straight, right); the oblique-asymptote case is a genuinely fourth, DIFFERENT road that only appears under a very specific condition ($\deg(P)$ exactly one more than $\deg(Q)$) — missing it isn't wrong about the three roads you know, it's simply not yet knowing the fourth exists.

## Demonstrations
1. **D1 — The convergence table.** Build a numerical table of $f(x)$ at $x=\pm10,\pm100,\pm1000$ for a chosen rational function, watching the values converge toward a specific number — then derive that exact number algebraically and compare.
2. **D2 — The horizontal-asymptote crossing.** Take $f(x)=\dfrac{x^2-1}{x^2+1}$, find its horizontal asymptote ($y=1$) and separately find where it crosses zero ($x=\pm1$), showing both facts coexist without contradiction — directly confronting MC-1.
3. **D3 — The fourth-case reveal.** Present a rational function with $\deg(P)=\deg(Q)+1$, first apply the three-case rule (correctly concluding "no HORIZONTAL asymptote"), then perform long division live to reveal the oblique asymptote that DOES exist — directly confronting MC-3.

## Discovery Questions
1. "If a vertical asymptote means the graph can never touch a certain vertical line, does a horizontal asymptote mean the same thing about a horizontal line? Why might these be different kinds of statements?"
2. "You evaluate $f(1000)$ and get $2.007$. Is $2.007$ the horizontal asymptote, or just close to it? How would you find the EXACT value?"
3. "The degree of the numerator is exactly one more than the degree of the denominator. Does that mean there's no asymptote at all, or might there be a different KIND of asymptote?"

## Teaching Sequence
Entry stage: Concrete (a numerical table showing convergence to a finite limit, before the algebraic degree-comparison rule is derived).
1. The convergence table (D1) and the leading-term-division derivation of all three degree-comparison cases.
2. The horizontal-asymptote crossing (D2), directly confronting MC-1 with a concrete counterexample.
3. Exact-versus-approximate derivation (targeting MC-2): always derive algebraically first, verify numerically second.
4. The fourth-case reveal (D3), directly confronting MC-3, then transfer probe (P76: full oblique-asymptote analysis, verifying the remainder vanishes and solving for interior crossing points).

## Tutor Actions
1. Whenever a learner reports a horizontal asymptote from a numerical evaluation alone, ask them to derive the exact value algebraically before accepting the answer — catch MC-2 at the moment of the claim, not after.
2. When a learner concludes "no horizontal asymptote" for a rational function, ask them to state the exact degree difference between numerator and denominator before moving on — if the difference is exactly 1, prompt for the oblique-asymptote check, catching MC-3.
3. After stating any horizontal or oblique asymptote, ask the learner whether the graph could still cross it, and require them to justify the answer by attempting to solve $f(x)=L$ (or $f(x)=mx+b$) rather than assuming the answer from the asymptote's existence alone.

## Voice Teaching Notes
- **Register**: proficient/analyze — the learner is combining an already-mastered degree-comparison intuition with a genuinely new distinction (limit-at-infinity versus undefined-point); language should make that distinction explicit rather than assumed.
- **Load-bearing sentence**: "A horizontal asymptote tells you where the graph is headed far away — it says nothing about what the graph does close to home."
- **Wait time note**: after presenting a rational function whose horizontal asymptote has just been found, pause long enough for the learner to attempt (unprompted) checking whether the graph crosses it — this is the single most diagnostic moment for catching MC-1 before it hardens.

## Assessment Signals
1. Correctly applies the three-case degree-comparison rule to find a horizontal asymptote (or its absence) for a rational function.
2. Correctly determines, by solving $f(x)=L$, whether and where a given rational function crosses its horizontal asymptote.
3. Correctly derives a horizontal asymptote's exact value algebraically rather than reporting a large-$x$ numerical approximation as the final answer.
4. Correctly identifies an oblique asymptote via long division when $\deg(P)=\deg(Q)+1$, distinguishing it from both "no asymptote" and a horizontal asymptote.
5. **P76 Transfer Probe** (independence mode): given a rational function with an oblique asymptote, performs long division, verifies the remainder term vanishes at infinity, and solves for all interior crossing points of the oblique asymptote.

## Tutor Recovery Strategy
If a learner has just been corrected on MC-1 (horizontal asymptotes can be crossed) and overcorrects by assuming EVERY horizontal asymptote is crossed somewhere, clarify that crossing depends on whether $f(x)=L$ actually has a real solution — some rational functions' graphs never reach their horizontal asymptote at any finite $x$, and this must be checked case by case, not assumed either way. If a learner correctly performs long division for an oblique asymptote (MC-3 resolved) but then cannot verify the remainder vanishes, walk the explicit limit computation: show that the remainder's degree is strictly less than the denominator's, so dividing by the denominator's leading power sends it to zero as $x\to\pm\infty$.

## Memory Hooks
1. "Divide by the biggest power — that one move gives you all three cases at once."
2. "The horizon is a direction, not a wall — a horizontal asymptote can be crossed near home."
3. "One more degree on top means look for a SLANTED line, not a flat one."

## Transfer Connections
- `math.func.rational-function` — this concept's own prerequisite; its orientation-level degree-comparison preview is developed here into the complete three-case rule plus the oblique-asymptote fourth case.
- `math.func.end-behavior` — that concept's own P76 transfer probe (rational-function end behavior via degree comparison) is the exact content this concept now develops as core material, closing that forward reference.
- `math.func.polynomial-function` — the long-division mechanics used to find an oblique asymptote reuse that concept's own evaluation-and-division machinery, now applied to extract a linear quotient rather than a remainder alone.

## Cross-Subject Connections
- Physics: a decaying or saturating quantity (e.g. a capacitor's charge approaching a maximum value over time) modeled as a rational function has a horizontal asymptote representing the eventual steady-state value, which the quantity may approach non-monotonically (oscillating around it) before settling — directly mirroring the "crossing is allowed" lesson here.
- Economics: an average-cost function that approaches a fixed per-unit cost as production scales up is a canonical horizontal-asymptote application, where the "can it be crossed" question translates directly to "can average cost momentarily equal (or dip below) its long-run limit."

## Blueprint References
- `docs/curriculum/blueprints/math.func.horizontal-asymptote.md` — fully reused by reference. All 3 misconceptions' birth types adopted directly from the Blueprint's own classification (MC-1 Type 1, MC-2 Type 5, MC-3 Type 5), independently confirmed rather than re-derived.
- No cross-link listed in the KG for this concept; none to verify.

## Runtime Asset References
No AssetIdentity rows exist for this concept yet — Layer 3/7 (DB-backed Explanation/Probe assets) is populated separately by production LLM-generation-plus-admin-review or deliberate seed-script batches, per this program's own layer-ownership mapping. This Educational Brain entry is the Layer 2 authored source those future runtime assets will draw from.

## Curriculum Feedback
No genuine Blueprint/KG metadata discrepancy found — requires, unlocks, cross_links, difficulty, bloom, mastery_threshold, and estimated_hours all match the live KG exactly (unlocks and cross_links both empty per the KG, matching the Blueprint's own declaration).

## Version History
- **Batch 35** (2026-09-13): initial authoring, part 1 of 2 this batch (with `math.func.vertical-asymptote`), the final concepts before `math.func` reaches DOMAIN CERTIFICATION. Blueprint reused by reference; 3 misconceptions adopted at the Blueprint's own classified birth types (MC-1 Type 1, MC-2 Type 5, MC-3 Type 5).
