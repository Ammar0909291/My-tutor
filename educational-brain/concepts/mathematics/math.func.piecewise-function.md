# math.func.piecewise-function — Piecewise Functions (Boundary Ownership, Continuity Testing, Domain-Partition Discipline)

## Identity
- **KG ID:** `math.func.piecewise-function`
- **Domain:** math.func (Functions)
- **Requires:** `math.func.function-concept`
- **Unlocks:** none listed in the KG
- **Cross-links:** none listed in the KG
- **Difficulty:** proficient
- **Bloom level:** apply
- **Mastery threshold:** 0.80 (MAMR 4/5)
- **Estimated hours:** 5

## Learning Objective
By the end of this concept, the student can: (1) given a piecewise-defined function, evaluate it at a specified input by selecting the correct piece — including boundary cases, where exactly one piece "owns" the boundary via its inequality symbol; (2) graph a piecewise function by drawing each piece on its restricted domain with correct open/closed endpoints; (3) determine whether the function is continuous at each boundary by checking that the left limit, right limit, and function value all agree; (4) write a piecewise formula from a graph, ensuring domain pieces partition the input space without overlap, and recognize the absolute value function as the canonical piecewise function.

## Core Understanding
`math.func.function-concept` supplies the general single-output rule. A piecewise function satisfies that rule by combining SEVERAL formulas, each active on its own restricted portion of the domain — the rule's "exactly one output" guarantee is preserved only if the pieces never overlap.

BOUNDARY EVALUATION IS DECIDED BY WHICH PIECE'S INEQUALITY "OWNS" THE POINT: at a boundary value, exactly ONE piece's domain condition includes it (via $\le$, $\ge$, or $=$ — a CLOSED condition); the other piece's condition EXCLUDES it (via $<$ or $>$ — an OPEN condition). Evaluating at the boundary means substituting into the piece that OWNS it, never the piece that merely approaches it.

CONTINUITY IS A THREE-WAY AGREEMENT, TESTED EXPLICITLY: a piecewise function is continuous at $x=a$ if and only if the left-hand limit, the right-hand limit, AND the function value $f(a)$ all agree: $\lim_{x\to a^-}f(x)=\lim_{x\to a^+}f(x)=f(a)$. Nothing about the piecewise NOTATION forces a jump — continuity depends entirely on whether the pieces' values genuinely agree at the boundary, checked explicitly, never assumed either way from the notation's appearance.

THE DOMAIN PIECES MUST PARTITION THE INPUT SPACE EXACTLY ONCE: every input must belong to EXACTLY one piece's domain. The standard technique is to use a strict inequality ($<$ or $>$) for all but one boundary condition, which alone gets the closed condition ($\le$, $\ge$, or $=$). Assigning a closed condition to BOTH neighboring pieces at a shared boundary creates a genuine ambiguity — two pieces both claiming the same input — which breaks the function definition itself.

ABSOLUTE VALUE IS THE CANONICAL PIECEWISE FUNCTION: $|x|=\begin{cases}x & x\ge0\\-x & x<0\end{cases}$ is a genuine piecewise function, and it is CONTINUOUS at its boundary $x=0$ (both pieces agree there: $0=-0=0$) — directly disproving any assumption that piecewise functions must have jumps.

## Mental Models
1. **Rung 1 — at a boundary, exactly one piece's inequality symbol owns that point; substitute into that piece, never the other.** Check the symbol ($\le$/$\ge$/$=$ vs. $<$/$>$), not just the formula.
2. **Rung 2 — continuity requires the left limit, right limit, and function value to ALL agree — check explicitly, since notation alone decides nothing.** Piecewise notation is a tool for organizing formulas, not a claim about jump behavior.
3. **Rung 3 — every input belongs to exactly one piece; assigning a closed condition to both sides of a boundary breaks the function.** Exactly one side gets $\le$/$\ge$; the other must be strict.

## Why Students Fail
Having practiced boundary conditions mostly with strict inequalities in early examples, students can evaluate a piecewise function at a boundary point using whichever piece "feels closer" without checking which inequality symbol actually contains that value, missing that ownership is decided precisely by the closed-vs-open symbol, not by proximity or intuition. Having encountered the most memorable piecewise examples as ones with visible jumps, students can assume ALL piecewise functions must be discontinuous at their boundaries, missing that piecewise notation is simply an organizational tool — continuity depends entirely on whether the pieces' values genuinely agree, and the absolute value function is a perfectly continuous counterexample. Finally, having focused on making sure the pieces together "cover everything," students can carelessly assign a closed condition (like $\le$) to BOTH neighboring pieces at a shared boundary, missing that this creates a genuine ambiguity — the boundary point would then belong to two pieces at once, which a function cannot allow.

## Misconceptions

### MC-1: OPEN-ENDPOINT-IGNORED
- **Birth type:** Type 5 (instruction-induced) — Blueprint designates this "the" primary evaluation misconception, independently confirmed
- **Description:** Evaluating the function at a boundary using only one piece without checking which endpoint is included (open vs. closed); assigning a value at a point where the function is undefined or using the wrong branch.
- **Why this birth type:** Instruction-induced: early examples typically use strict inequalities only, so open-circle notation and its decisive role at boundaries are introduced late and under-emphasized, leaving the habit of "just pick a formula" unexamined.
- **Detection probe:** "For $f(x)=\begin{cases}2x+1 & x<3\\x^2 & x\ge3\end{cases}$, what is $f(3)$?" A student with MC-1 answers using the first piece ($2(3)+1=7$) instead of checking ownership.
- **Repair:** At $x=3$: which condition CONTAINS $x=3$? $x\ge3$ does (closed) — so $f(3)=3^2=9$ from the SECOND piece, not $f(3)=7$ from the first. Check the inequality symbol, not just the formula: $<$ and $>$ mean EXCLUDED (open); $\le$, $\ge$, $=$ mean INCLUDED (closed). Ownership determines which formula applies at the exact boundary.
- **Verification of death:** Given a piecewise function and a boundary input, the student identifies which piece's inequality symbol includes that exact value before substituting, never guessing based on proximity.

### MC-2: PIECEWISE-MUST-BE-DISCONTINUOUS
- **Birth type:** Type 1 (overgeneralization) — Blueprint designates this the domain's central conceptual misconception, independently confirmed
- **Description:** Assuming all piecewise functions have jumps; not recognizing that pieces can meet continuously, as in the absolute value function.
- **Why this birth type:** Overgeneralization: the most memorable, textbook-emphasized piecewise examples are those WITH visible jumps (tax brackets, postal rates), so continuous piecewise functions are perceived as "not really piecewise" even though they satisfy the identical definition.
- **Detection probe:** "Is a piecewise function always discontinuous at its boundary points?" A student with MC-2 answers "yes."
- **Repair:** $|x|=\begin{cases}x & x\ge0\\-x & x<0\end{cases}$: at $x=0$, the left limit is $\lim_{x\to0^-}(-x)=0$, the right limit is $\lim_{x\to0^+}x=0$, and $f(0)=0$ (from the closed piece) — ALL THREE agree, so $|x|$ is CONTINUOUS at $x=0$, despite being genuinely piecewise. "Piecewise" describes the FORM of the definition, never the behavior at the boundaries — that must be tested explicitly every time.
- **Verification of death:** Given a piecewise function, the student explicitly tests left limit, right limit, and function value at each boundary rather than assuming discontinuity (or continuity) from the notation alone.

### MC-3: DOMAIN-PIECES-OVERLAP
- **Birth type:** Type 1 (overgeneralization) — Blueprint rates this as a genuine construction-time hazard, independently confirmed
- **Description:** Writing a piecewise formula where two pieces share a boundary point with BOTH given closed conditions (e.g. $x\le3$ AND $x\ge3$), making the boundary ambiguous.
- **Why this birth type:** Overgeneralization: students correctly recognize that "the pieces together must cover the whole domain" but fail to apply the stricter mutual-exclusion requirement at the shared boundary point itself, assuming symmetric closed conditions on both sides is simply thorough coverage rather than a genuine ambiguity.
- **Detection probe:** "You wrote $x\le3$ for piece 1 and $x\ge3$ for piece 2. Both claim $x=3$ — is this a valid piecewise function?" A student with MC-3 answers "yes."
- **Repair:** A function must assign EXACTLY ONE output to each input. If both $x\le3$ and $x\ge3$ are used, then $x=3$ belongs to BOTH pieces — potentially producing two different values at the same input, which breaks the function rule. Fix by making ownership unambiguous: $x<3$ for the first piece and $x\ge3$ for the second (or $x\le3$ and $x>3$) — exactly ONE inequality per boundary is closed; the other must be strict.
- **Verification of death:** Given a piecewise formula under construction, the student checks each boundary point and ensures exactly one piece's condition is closed there, correcting any shared-closed-condition ambiguity.

## Analogies
1. **The border-checkpoint-with-one-gate-open analogy (targets MC-1).** At a border crossing, exactly one checkpoint gate is marked "open" for travelers arriving at the exact boundary line — the other gate, though nearby, is marked "closed" and does not process that traveler. Substituting into the wrong piece is like processing the traveler at the closed gate.
2. **The seamless-versus-stepped-staircase analogy (targets MC-2).** Some staircases are built with a smooth ramp connecting sections (no jump — continuous), while others have visible steps (a jump). Both are "sectioned" (piecewise) constructions; only testing reveals which kind you have.
3. **The two-owners-one-house analogy (targets MC-3).** A property deed listing two different owners for the exact same address creates a genuine legal ambiguity — no valid transaction can proceed until exactly one owner is designated. A shared closed boundary condition creates the identical structural problem for a function.

## Demonstrations
### Demonstration 1 — evaluation and boundary ownership (mirrors Blueprint A01)
For $f(x)=\begin{cases}3x+1 & x\le2\\x^2-1 & x>2\end{cases}$: $f(-1)$: satisfies $x\le2$, so $f(-1)=3(-1)+1=-2$. $f(2)$: satisfies $x\le2$ (closed), so $f(2)=3(2)+1=7$. $f(3)$: satisfies $x>2$, so $f(3)=9-1=8$. Checking the limit from the other side at $x=2$: $\lim_{x\to2^+}(x^2-1)=3\ne7$ — a jump discontinuity at $x=2$.

### Demonstration 2 — continuity as a three-way agreement, using absolute value (mirrors Blueprint A02)
Testing $f(x)=\begin{cases}2x & x\le1\\x+1 & x>1\end{cases}$ at $x=1$: left limit $=2(1)=2$; right limit $=1+1=2$; $f(1)=2(1)=2$ (closed piece) — all three agree, CONTINUOUS. Contrast: $|x|=\begin{cases}x & x\ge0\\-x & x<0\end{cases}$: at $x=0$, left limit $=0$, right limit $=0$, $f(0)=0$ — CONTINUOUS, confirming absolute value is the canonical continuous piecewise function.

### Demonstration 3 — constructing an unambiguous piecewise formula (mirrors Blueprint A03)
From a graph: a line through $(0,-2)$ with slope $2$ for $x<1$ (open circle at $(1,0)$), and a horizontal line $y=3$ for $x\ge1$ (filled circle at $(1,3)$): $f(x)=\begin{cases}2x-2 & x<1\\3 & x\ge1\end{cases}$ — exactly one boundary condition ($x\ge1$) is closed; the other ($x<1$) is strict, so no ambiguity exists. Checking continuity: left limit as $x\to1^-$ is $2(1)-2=0$; $f(1)=3$; $0\ne3$ — a genuine jump.

## Discovery Questions
1. "For $f(x)=\begin{cases}2x+1 & x<3\\x^2 & x\ge3\end{cases}$, what is $f(3)$? Which inequality symbol actually contains $x=3$?"
2. "Is a piecewise function always discontinuous at its boundary points? Test it directly on the absolute value function at $x=0$."
3. "If you write $x\le3$ for one piece and $x\ge3$ for the next, is that a valid piecewise function? What happens exactly at $x=3$?"

## Teaching Sequence
Best taught by the **Concrete CPA entry stage — postal rate tables, taxi fare schedules, and income tax brackets as real piecewise rules, before symbolic notation is introduced**, matching the Blueprint's own CPA justification.
1. Work Demonstration 1's boundary-ownership evaluation, posing Discovery Question 1 before confirming the closed condition decides which piece owns the point.
2. Work Demonstration 2's three-way continuity test, applied to both a jump case and the continuous absolute value function, posing Discovery Question 2 before confirming piecewise functions can genuinely be continuous.
3. Work Demonstration 3's construction of an unambiguous formula from a graph, posing Discovery Question 3 before confirming a shared closed condition creates ambiguity.
4. Assess with the P77 problem set and the spline-conditions transfer probe (P76, independence mode).

## Tutor Actions
1. **On any boundary-evaluation task:** require the student to identify which piece's inequality symbol contains the exact boundary value before substituting.
2. **On any continuity question:** require the student to test the left limit, right limit, AND function value explicitly, never assuming continuity or discontinuity from the notation's appearance.
3. **On any piecewise-formula-construction task:** require the student to verify that exactly one condition is closed at each boundary, correcting any shared-closed-condition ambiguity.

## Voice Teaching Notes
1. **Register:** proficient/apply — this concept assumes fluency with the general function concept and develops the concrete skill of managing multiple domain-restricted formulas.
2. **Load-bearing sentence, spoken slowly:** "Check which piece owns the boundary point — the closed symbol decides it, not which formula looks closer."
3. **Wait time:** pause after Discovery Question 2, letting the student genuinely test all three continuity conditions on the absolute value function before confirming it is continuous.

## Assessment Signals
1. **Gate concept:** correctly evaluates a piecewise function at boundary and interior points, identifying the owning piece by its inequality symbol.
2. **Continuity-testing fluency:** correctly tests left limit, right limit, and function value at a boundary, reaching the correct continuous/discontinuous verdict.
3. **Continuous-piecewise recognition:** correctly identifies that a piecewise function (like absolute value) can be genuinely continuous, rejecting the "must be discontinuous" assumption.
4. **Domain-partition discipline:** correctly constructs a piecewise formula with exactly one closed condition per boundary, avoiding shared-ownership ambiguity.
5. **Transfer:** applies value-continuity (C⁰) and derivative-continuity (C¹) conditions to construct a smooth spline (P76), solving the resulting system for unknown coefficients.

## Tutor Recovery Strategy
If the student ignores boundary ownership, require them to identify the owning inequality symbol explicitly before evaluating, on fresh boundary values, until the check is automatic. If the student assumes all piecewise functions are discontinuous, require them to run the full three-way continuity test on fresh examples — including continuous ones — until "test, don't assume" is the default. If the student creates overlapping domain conditions, require them to check every boundary for exactly-one-closed-condition on fresh formulas until the discipline is automatic.

## Memory Hooks
1. "The closed symbol owns the boundary — check $\le$/$\ge$/$=$ versus $<$/$>$ before substituting."
2. "Piecewise doesn't mean jumpy — test the three-way agreement every time; absolute value proves it can be smooth."
3. "Exactly one side gets the closed condition at each boundary — never both, or the function breaks."

## Transfer Connections
- **`math.func.function-concept`:** the single-output rule this concept preserves across multiple domain-restricted pieces, provided the domains never overlap.
- **`math.func.transformations-functions`:** the absolute value function, a canonical piecewise function here, is also the standard example for reflection transformations, connecting the two concepts through a shared function family.

## Cross-Subject Connections
- **Economics (progressive tax brackets):** income tax computed via marginal rates across income ranges is a direct real-world piecewise function, with careful boundary conditions determining which bracket a specific income falls into.
- **Computer graphics and engineering (splines):** smooth curve fitting via piecewise polynomials (splines) directly extends this concept's continuity-testing discipline to also require matching derivatives at breakpoints.

## Blueprint References
- Primary source: `docs/curriculum/blueprints/math.func.piecewise-function.md` — reused by reference throughout (Learning Objectives, worked examples in A01–A03, misconception inventory MC-1–MC-3, transfer probe P76 on spline conditions, mode = independence per that Blueprint's own Component 8). Not restated verbatim; this entry adds the mental-model ladder, discovery-vs-direct-instruction argument, voice teaching notes, memory hooks, and cross-subject connections per `EDUCATIONAL_BRAIN_STANDARD.md`'s ownership boundary. All 3 misconceptions' birth types adopted directly from the Blueprint's own classification (MC-1 Type 5, MC-2 Type 1, MC-3 Type 1), independently confirmed rather than re-derived.
- No cross-link listed in the KG for this concept; none to verify.

## Runtime Asset References
- No AssetIdentity rows exist for this concept yet (Layer 3/7 DB-backed assets are populated separately, by live LLM generation plus admin review or by deliberate seed-script batches — never by this authoring layer). This entry is Layer 1/2 content only.

## Curriculum Feedback
- No genuine Blueprint/KG metadata discrepancy found — requires, unlocks, cross_links, difficulty, bloom, mastery_threshold, and estimated_hours all match the live KG exactly (unlocks and cross_links both empty per the KG, matching the Blueprint's own declaration).

## Version History
- **Batch 32** (2026-09-12): initial authoring, part 4 of 4 this batch (with `math.func.quadratic-function`, `math.func.exponential-function`, `math.func.logarithmic-function`), continuing `math.func` as a standalone domain campaign. This batch closes the entire topologically-ready frontier available at batch start. Blueprint reused by reference; 3 misconceptions adopted at the Blueprint's own classified birth types (MC-1 Type 5, MC-2 Type 1, MC-3 Type 1).
