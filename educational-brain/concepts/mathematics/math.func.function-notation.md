# math.func.function-notation — Function Notation (f(x) as Substitution, Not Multiplication)

## Identity
- **KG ID:** `math.func.function-notation`
- **Domain:** math.func (Functions)
- **Requires:** `math.func.function-concept`
- **Unlocks:** none
- **Cross-links:** none
- **Difficulty:** proficient
- **Bloom level:** apply
- **Mastery threshold:** 0.9 (MAMR 5/5)
- **Estimated hours:** 2

## Learning Objective
By the end of this concept, the student can: given a function defined by a rule, read and write $f(x)$ notation fluently — evaluating $f(a)$ for a specific value, evaluating $f(\text{expression})$ by full substitution, interpreting $f(a)=b$ as "input $a$ gives output $b$," correctly distinguishing $f(x)$ (the function's value) from $f$ (the function itself), and computing the difference quotient $[f(x+h)-f(x)]/h$ via correct full substitution.

## Core Understanding
`math.func.function-concept` established what a function IS. This concept develops fluent READING and WRITING of the notation used to express function evaluation — a compact but genuinely non-obvious symbolic convention.

$f(x)$ MEANS SUBSTITUTION, NEVER MULTIPLICATION: $f$ is the NAME of the function; $(x)$ denotes the INPUT written in parentheses immediately after that name. There is no multiplication occurring — $f(x)$ is read "$f$ evaluated at $x$," exactly parallel to how $\cos(x)$ means cosine evaluated at $x$, never "cosine times $x$." Every evaluation requires FULL substitution: for $f(a)$, replace every occurrence of $x$ in the rule with $a$; for $f(x+h)$, replace every occurrence of $x$ with the ENTIRE expression $(x+h)$, not just the standalone variable.

$f(a+b)\ne f(a)+f(b)$ IN GENERAL — LINEARITY IS A SPECIAL PROPERTY, NOT A UNIVERSAL RULE: the identity $f(a+b)=f(a)+f(b)$ (and its cousin $f(ca)=cf(a)$) holds specifically for LINEAR functions of the form $f(x)=kx$ (lines through the origin) — not even for all linear functions in the broader sense, and certainly not for quadratic, exponential, absolute-value, or most other function families. A single concrete counterexample settles this decisively: for $f(x)=x^2$, $f(3+4)=f(7)=49$ while $f(3)+f(4)=9+16=25$ — these differ sharply. Every occurrence of $f(a+b)$ or $f(ca)$ must be expanded by substituting the FULL expression into the rule, never split across the operation without first checking whether the function is genuinely linear.

THE DIFFERENCE QUOTIENT REQUIRES TWO FULL, SEPARATE SUBSTITUTIONS: $[f(x+h)-f(x)]/h$ — the foundational expression of differential calculus, measuring average rate of change — demands substituting $(x+h)$ fully into $f$'s rule (expanding all resulting algebra) and separately substituting $x$, before subtracting and dividing by $h$. Correct function-notation fluency (never splitting $f(a+b)$ prematurely) is the exact skill this computation depends on.

## Mental Models
1. **Rung 1 — $f(x)$ is a naming-and-evaluation convention, structurally identical to $\cos(x)$ or $\log(x)$ — never a multiplication.** Reading "$f$ of $x$," never "$f$ times $x$," prevents the entire class of notation-based errors.
2. **Rung 2 — every function evaluation is a FULL substitution of the entire argument, performed before any simplification.** $f(x+h)$ means "put the whole expression $x+h$ everywhere $x$ appeared" — not "add $h$ to $f(x)$" or any partial shortcut.
3. **Rung 3 — linearity ($f(a+b)=f(a)+f(b)$) is a special, checkable property some functions have and most don't — never a default assumption to fall back on.**

## Why Students Fail
Having spent years in algebra where juxtaposition (writing two symbols next to each other, like $2x$) always means multiplication, students transfer this deeply-practiced pattern directly onto $f(x)$, reading the parenthetical notation as "$f$ times $x$" rather than recognizing it as an entirely different naming-and-evaluation convention that merely happens to share a visual resemblance with multiplication notation. Having correctly learned that $f(x)=kx$ satisfies the clean additive property $f(a+b)=f(a)+f(b)$, students naturally extend this pleasant, useful-feeling rule to functions in general, missing that this additivity is a genuinely special property of proportional (origin-through-line) functions and fails for the vast majority of other function types they will encounter. Finally, because $f(a)$, $f\cdot a$ (multiplication), and $f-a$ (subtraction) can all appear in visually similar contexts across different algebraic expressions, students sometimes blur the boundaries between these genuinely distinct operations — most consequentially when computing expressions like $f(x+h)-f(x)$, where a slip toward treating $f$ as a factor rather than a function name produces systematically wrong algebra.

## Misconceptions

### MC-1: f(x)-MEANS-f-TIMES-x
- **Birth type:** Type 3 (language contamination) — per this Blueprint's own classification, independently confirmed
- **Description:** Interpreting $f(x)$ as multiplication ($f\times x$), leading to errors like treating $2f(3)$ as $2\times f\times 3=6f$.
- **Why this birth type:** Language contamination: juxtaposition in ordinary algebra ($2x$ means $2\times x$) is an extremely well-practiced pattern, and $f(x)$'s superficially similar visual form (a symbol immediately followed by parentheses) invites the same multiplicative reading despite representing a completely different mathematical operation.
- **Detection probe:** "If $f(x)=x^2$, what is $2f(3)$?" A student with MC-1 may compute this as if $f$ were a numerical factor rather than evaluating $f(3)=9$ first, then multiplying by 2 to get 18.
- **Repair:** Draw the direct parallel to trigonometric notation: $\cos(x)$ means cosine evaluated at $x$, never "cosine times $x$" — nobody reads $\cos(x)$ as multiplication, and $f(x)$ follows the identical naming-and-evaluation convention, just with a custom function name $f$ instead of a standard one like $\cos$.
- **Verification of death:** Given any $f(\text{expression})$, the student correctly substitutes the expression into the function's rule rather than treating the parentheses as multiplication.

### MC-2: f(a+b)=f(a)+f(b)
- **Birth type:** Type 1 (overgeneralization) — per this Blueprint's own classification, independently confirmed
- **Description:** Assuming all functions are additive, applying $f(a+b)=f(a)+f(b)$ even when $f$ is quadratic, exponential, absolute-value, or any other non-proportional function.
- **Why this birth type:** Overgeneralization from the genuinely true special case $f(x)=kx$ (a line through the origin), where this additive property holds exactly, extended incorrectly to all functions without checking whether the specific function in question actually has this property.
- **Detection probe:** "Is $f(2x)=2f(x)$ for $f(x)=x^2$?" A student with MC-2 answers "yes" by default.
- **Repair:** Compute directly: $f(2x)=(2x)^2=4x^2$ while $2f(x)=2x^2$ — these are NOT equal for any $x\ne0$, decisively refuting the assumed identity for this quadratic function.
- **Verification of death:** Given a non-linear function, the student explicitly computes $f(a+b)$ by full substitution rather than splitting it into $f(a)+f(b)$, and states that linearity must be checked, never assumed.

### MC-3: f(a)-IS-f-APPLIED-AMBIGUOUSLY
- **Birth type:** Type 3 (language contamination) — per this Blueprint's own classification, independently confirmed
- **Description:** Confusing $f(a)$ ("$f$ evaluated at $a$") with $f\cdot(a)$ (multiplication) or $f-a$ (subtraction), producing errors such as computing $g(x+h)-g(x)$ as $g\cdot(h)-g\cdot x$.
- **Why this birth type:** Language contamination: the same parenthetical notation used consistently across algebra for grouping and multiplication is extended inconsistently to function evaluation, and without deliberate attention the boundary between these genuinely different uses of parentheses can blur.
- **Detection probe:** "Compute $g(3+4)$ and $g(3)+g(4)$ for $g(x)=|x|$. Are they equal?" A student with MC-3 may conflate the two expressions or apply an incorrect operation to one of them.
- **Repair:** Work both computations explicitly and separately: $g(3+4)=g(7)=|7|=7$; $g(3)+g(4)=|3|+|4|=3+4=7$ — here they HAPPEN to agree (since $|x|$ restricted to positive inputs behaves additively), but the two expressions represent genuinely different operations that must each be computed by their own correct procedure, not assumed equal by pattern-matching.
- **Verification of death:** Given expressions like $f(a)$, $f\cdot a$, and $f-a$ side by side, the student correctly identifies which operation each notation represents and computes each independently.

## Analogies
1. **The vending-machine-code analogy (targets MC-1).** Pressing button "B4" on a vending machine doesn't mean "B times 4" — it's a NAME for a specific selection, and the machine performs a lookup-and-dispense action based on that name. $f(x)$ works the same way: $(x)$ names which input you're asking about, and $f$ performs its own internal rule on that input — no multiplication involved.
2. **The recipe-doubling analogy (targets MC-2).** Doubling the amount of flour in a recipe doesn't automatically double the finished cake's height — some recipe outcomes scale proportionally with an ingredient and some genuinely don't. $f(2x)=2f(x)$ is exactly this kind of claim: true for some functions (proportional ones), false for most others, and never safe to assume without checking.

## Demonstrations
### Demonstration 1 — full substitution across multiple representations (mirrors Blueprint A01)
For $f(x)=2x^2-3x+1$: $f(0)=1$, $f(2)=8-6+1=3$, $f(-1)=2+3+1=6$. Evaluating $f(x+1)$ requires substituting the ENTIRE expression $x+1$ everywhere $x$ appears: $f(x+1)=2(x+1)^2-3(x+1)+1=2x^2+x$ after full expansion. Computing $f(x+h)-f(x)$ similarly requires two full, separate substitutions before subtracting, yielding $h(4x+2h-3)$ after simplification.

### Demonstration 2 — linearity is special, not universal (mirrors Blueprint A02)
For $f(x)=x^2$: $f(3+4)=f(7)=49$ while $f(3)+f(4)=9+16=25$ — these genuinely differ, decisively refuting the additive assumption. Checking $f(2x)=2f(x)$: $f(2x)=4x^2$ versus $2f(x)=2x^2$ — again unequal for $x\ne0$. The identity $f(ca)=cf(a)$ holds ONLY for functions of the exact form $f(x)=kx$; for quadratic, exponential, absolute-value, and most other function families, it fails outright.

### Demonstration 3 — the difference quotient as the culmination of correct substitution (transfer content, mirrors Blueprint's P76)
For $f(x)=x^2$: $\frac{f(x+h)-f(x)}{h}=\frac{(x+h)^2-x^2}{h}=\frac{2xh+h^2}{h}=2x+h$, which approaches $2x$ as $h\to0$ — the derivative of $x^2$. For $g(x)=x^3$: the identical procedure, requiring correct full substitution of $(x+h)$ into the cubic rule before simplification, yields a difference quotient approaching $3x^2$ as $h\to0$.

## Discovery Questions
1. "In $\cos(x)$, does the parenthetical $x$ mean multiplication? What does it actually mean, and how is $f(x)$ the same kind of notation?"
2. "For $f(x)=kx$ (a line through the origin), $f(a+b)=f(a)+f(b)$ is true. Does this mean it's true for EVERY function, or just this specific family?"
3. "Compute $f(3+4)$ and $f(3)+f(4)$ for $f(x)=x^2$. What do you notice, and what does that tell you about splitting function evaluations across addition?"

## Teaching Sequence
Best taught by **direct instruction establishing the substitution convention FIRST via concrete input-output machine diagrams**, given the Concrete CPA entry stage — the notational convention itself is best grounded in explicit numerical substitution before any algebraic generalization.
1. Establish full substitution across representations via Demonstration 1, posing Discovery Question 1 before drawing the $\cos(x)$ parallel explicitly.
2. Work the linearity counterexample via Demonstration 2, posing Discovery Question 2 before confirming the additive property is special, not universal.
3. Build toward the difference quotient via Demonstration 3, reinforcing that correct full substitution is the exact prerequisite skill this calculus-foundational computation depends on.
4. Assess with the P77 problem set and the difference-quotient transfer probe (P76, independence mode).

## Tutor Actions
1. **On any $f(\text{expression})$ evaluation:** require the student to state explicitly that they are substituting the FULL expression, not treating the parentheses as multiplication.
2. **On any $f(a+b)$-shaped expression:** require the student to check (or explicitly state they are not assuming) linearity before splitting the expression across the addition.
3. **On any difference-quotient computation:** require two separate, fully-expanded substitutions before subtraction, never a shortcut.

## Voice Teaching Notes
1. **Register:** proficient/applied — this concept assumes fluency with basic function vocabulary and requires careful, deliberate algebraic substitution practice.
2. **Load-bearing sentence, spoken slowly:** "$f(x)$ is $f$ evaluated at $x$ — never $f$ times $x$."
3. **Wait time:** pause after Discovery Question 3, letting the student genuinely compute and compare both sides before confirming they differ.

## Assessment Signals
1. **Gate concept:** correctly evaluates $f$ at both specific numbers and compound expressions via full substitution.
2. **Linearity discrimination:** correctly identifies that $f(a+b)=f(a)+f(b)$ does not hold in general, and verifies or refutes it for a specific function via direct computation.
3. **Notation discrimination:** correctly distinguishes $f(x)$, $f\cdot x$, and $f-x$ as three genuinely different operations.
4. **Difference-quotient fluency:** correctly computes and simplifies $[f(x+h)-f(x)]/h$ via two full, separate substitutions.
5. **Transfer:** applies the difference quotient to a new function family (e.g. $x^3$) and correctly identifies the limiting behavior as $h\to0$.

## Tutor Recovery Strategy
If the student reads $f(x)$ as multiplication, work several trigonometric-notation parallels ($\cos(x)$, $\sin(x)$) alongside $f(x)$ until the naming-and-evaluation convention is automatic. If the student assumes linearity by default, work several fresh non-linear functions' $f(a+b)$ versus $f(a)+f(b)$ computations until the general failure of additivity is expected rather than surprising. If the student conflates evaluation with multiplication or subtraction notation, work side-by-side computations of $f(a)$, $f\cdot a$, and $f-a$ on the same function until each is computed correctly and independently.

## Memory Hooks
1. "$f(x)$ reads like $\cos(x)$ — evaluated at, never multiplied by."
2. "Splitting $f(a+b)$ into $f(a)+f(b)$ only works for lines through the origin — check before you split."
3. "Every evaluation is a full substitution — replace the WHOLE input, then simplify."

## Transfer Connections
- **`math.func.function-concept`:** the domain/codomain/rule structure this concept's notation directly expresses and evaluates.
- **`math.func.domain-range`:** correct substitution fluency is a direct prerequisite for evaluating domain restrictions on compound expressions and for computing range via the algebraic (solve-for-$x$) technique.
- **`math.func.composition`:** composed functions $f(g(x))$ require the identical full-substitution discipline developed here, applied to a nested rather than single expression.

## Cross-Subject Connections
- **Physics (rate-of-change formulas):** the difference quotient developed here is the direct algebraic precursor to instantaneous velocity and other rate-of-change quantities computed via calculus.
- **Computer Science (function calls and argument passing):** the substitution discipline in $f(x)$ evaluation directly parallels how a programming function call substitutes an argument value into a function body before execution.

## Blueprint References
- Primary source: `docs/curriculum/blueprints/math.func.function-notation.md` — reused by reference throughout (Learning Objective, misconception register MC-1–MC-3, teaching action sequence A01–A02, worked evaluations, the difference-quotient transfer probe, mode = independence per that Blueprint's own Component 8). Not restated verbatim; this entry adds the mental-model ladder, discovery-vs-direct-instruction argument, voice teaching notes, memory hooks, and cross-subject connections per `EDUCATIONAL_BRAIN_STANDARD.md`'s ownership boundary. All 3 misconceptions confirmed against this program's own taxonomy, matching the Blueprint's own birth-type classification: MC-1 Type 3, MC-2 Type 1, MC-3 Type 3.
- Cross-link: KG lists no cross-links for this concept — independence mode, matching the Blueprint's own declaration.

## Runtime Asset References
- No AssetIdentity rows exist for this concept yet (Layer 3/7 DB-backed assets are populated separately, by live LLM generation plus admin review or by deliberate seed-script batches — never by this authoring layer). This entry is Layer 1/2 content only.

## Curriculum Feedback
- No genuine Blueprint/KG metadata discrepancy found — requires, unlocks, cross_links, difficulty, bloom, mastery_threshold, and estimated_hours all match the live KG exactly.

## Version History
- **Batch 28** (2026-09-12): initial authoring, part 2 of 4 this batch (with `math.func.domain-range`, `math.func.injectivity`, `math.func.surjectivity`), resuming `math.func` as a standalone domain campaign. Blueprint reused by reference; 3 misconceptions confirmed matching the Blueprint's own birth-type classification (MC-1 Type 3, MC-2 Type 1, MC-3 Type 3).
