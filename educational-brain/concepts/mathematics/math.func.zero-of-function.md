# math.func.zero-of-function — Zeros of a Function (X-Intercepts vs. Y-Intercept, Holes vs. Zeros)

## Identity
- **KG ID:** `math.func.zero-of-function`
- **Domain:** math.func (Functions)
- **Requires:** `math.func.graph-of-function`
- **Unlocks:** `math.num.root-finding`
- **Cross-links:** `math.num.root-finding` (confirmed genuinely unauthored — independence mode, see Blueprint References)
- **Difficulty:** proficient
- **Bloom level:** understand
- **Mastery threshold:** 0.85 (MAMR 5/5)
- **Estimated hours:** 3

## Learning Objective
By the end of this concept, the student can: (1) define a zero of $f$ as a value $x^*$ where $f(x^*)=0$, equivalently an $x$-intercept of the graph, and find zeros algebraically by solving $f(x)=0$; (2) count zeros using graphical/algebraic analysis, correctly handling functions with no real zeros, one repeated zero, or several distinct zeros; (3) distinguish a genuine zero from a REMOVABLE DISCONTINUITY (hole) in a rational function, requiring both that the numerator vanishes AND the denominator does not; (4) recognize when a closed-form algebraic solution does not exist and the problem transfers to numerical root-finding methods.

## Core Understanding
`math.func.graph-of-function` established the graph as the set of $(x,f(x))$ pairs. A zero is the specific case where that pair has $y=0$ — the point where the graph crosses or touches the $x$-axis.

A ZERO IS AN $x$-VALUE, NOT A $y$-VALUE: $x^*$ is a zero of $f$ iff $f(x^*)=0$. Geometrically this is an $x$-intercept — a point $(x^*,0)$ on the graph. This is the OPPOSITE role from the $y$-intercept, which is the single point $(0,f(0))$ where the graph crosses the $y$-axis. For $f(x)=x^2-4$: the $y$-intercept is $(0,-4)$ (evaluate at $x=0$); the zeros are $x=\pm2$ (solve $f(x)=0$) — two entirely different questions with two entirely different kinds of answer.

NOT EVERY FUNCTION HAS A ZERO: a function can have zero, one, or many zeros depending on whether and how many times its graph crosses the $x$-axis. $f(x)=x^2+1\ge1>0$ for every real $x$ — the graph never reaches the $x$-axis, so there is NO real zero (the equation $x^2=-1$ has only complex solutions). $f(x)=e^x>0$ always — likewise no zero. A repeated zero (like $x=0$ for $f(x)=x^2$) touches the axis without crossing it.

A ZERO REQUIRES $f(x^*)=0$ — NOT $f(x^*)$ UNDEFINED: for a rational function like $f(x)=\frac{x^2-1}{x-1}$, setting the NUMERATOR to zero gives candidate values $x=\pm1$ — but $x=1$ also makes the DENOMINATOR zero, so $f(1)$ is undefined (a hole/removable discontinuity), not a zero. Only $x=-1$, where the numerator vanishes and the denominator does not, is a genuine zero. A zero demands the function actually EVALUATE to zero, never merely "the numerator vanishing" in isolation.

WHEN ALGEBRA RUNS OUT, NUMERICAL METHODS TAKE OVER: for algebraic functions (polynomials, simple rational functions), zeros are found by factoring, the quadratic formula, or the rational root theorem. For transcendental equations like $x-\cos(x)=0$, no closed-form solution exists — this is precisely where `math.num.root-finding`'s numerical methods (bisection, Newton's method) take over, using the Intermediate Value Theorem to guarantee a zero exists between sign-change endpoints.

## Mental Models
1. **Rung 1 — a zero is an $x$-value found by solving $f(x)=0$; the $y$-intercept is a $y$-value found by evaluating $f(0)$.** These are inverse operations on different axes, never the same question.
2. **Rung 2 — check whether the graph actually reaches the $x$-axis before assuming a zero exists.** No sign change, no minimum below zero, no zero.
3. **Rung 3 — a candidate zero of a rational function must survive BOTH conditions: numerator zero AND denominator nonzero.** Failing the second makes it a hole, not a zero.

## Why Students Fail
Having learned "zero" as a word that sounds like "the value zero" (a $y$-value in casual speech), students can report a function's $y$-intercept when asked for its zero, missing that a zero is specifically an $x$-coordinate where the OUTPUT is zero — a fundamentally different axis and a fundamentally different question from "what is $f(0)$?" Having worked almost exclusively with early textbook examples chosen to have clean integer zeros, students can come to assume every function crosses the $x$-axis somewhere, missing that a function whose minimum value is positive (like $x^2+1$) or that never changes sign (like $e^x$) genuinely has no real zeros at all. Finally, having practiced factoring rational-function numerators to find zeros, students can apply that procedure blindly to a value that ALSO zeroes the denominator, missing that a zero requires the function to actually evaluate to zero — not merely become undefined — so a removable discontinuity (hole) gets mistaken for a genuine zero.

## Misconceptions

### MC-1: ZEROS-ARE-Y-VALUES
- **Birth type:** Type 3 (language contamination) — per this Blueprint's own classification, independently confirmed
- **Description:** Confusing zeros of $f$ with the $y$-intercept — saying "the zero is 5" when the $y$-intercept $f(0)=5$ is meant, not distinguishing $x$-intercepts (zeros) from $y$-intercept (value at $x=0$).
- **Why this birth type:** Language contamination: the word "zero" sounds like "the numerical value zero," which the everyday ear associates with an output/$y$-value, obscuring that a zero of a function is specifically an $x$-coordinate.
- **Detection probe:** "For $f(x)=x^2-4$: is the y-intercept a zero of the function?" A student with MC-1 answers "yes" or conflates the two values.
- **Repair:** For $f(x)=x^2-4$: $y$-intercept $=f(0)=-4$, giving the point $(0,-4)$ — ONE point, found by evaluating. Zeros: solve $x^2-4=0 \Rightarrow x=\pm2$, giving the points $(-2,0)$ and $(2,0)$ — found by SOLVING, not evaluating. Domain and range's IN/OUT distinction (from `math.func.real-valued-function`) applies here too: a zero is about what makes the OUTPUT zero, never a reported output value itself.
- **Verification of death:** Given a function, the student correctly computes both the $y$-intercept (evaluate at $x=0$) and the zeros (solve $f(x)=0$) as two separate, non-interchangeable quantities.

### MC-2: EVERY-FUNCTION-HAS-A-ZERO
- **Birth type:** Type 5 (instruction-induced) — per this Blueprint's own classification, independently confirmed
- **Description:** Assuming every function crosses the $x$-axis; not considering functions with no real zeros (e.g. $f(x)=x^2+1$, $f(x)=e^x$).
- **Why this birth type:** Instruction-induced: early examples are deliberately chosen to have clean integer zeros so the solving procedure can be practiced, and the no-zero case is introduced later or not at all — so the pattern "every function I've seen has a zero" generalizes incorrectly.
- **Detection probe:** "Does $f(x)=x^2+1$ have a real zero?" A student with MC-2 answers "yes" or attempts to solve $x^2+1=0$ over the reals without recognizing the contradiction.
- **Repair:** $f(x)=x^2+1$: since $x^2\ge0$ for every real $x$, $f(x)=x^2+1\ge1>0$ always — the graph, a parabola with vertex $(0,1)$, never touches the $x$-axis. Solving $x^2=-1$ has no real solution. Similarly $f(x)=e^x>0$ for all $x$ (range $(0,\infty)$) — no zero. A quick check: does the function's minimum (or maximum, for a function bounded above) ever reach or cross zero?
- **Verification of death:** Given a function, the student checks whether it can actually reach zero (via minimum/maximum analysis or sign-change reasoning) before attempting to solve for zeros, correctly reporting "no real zeros" when appropriate.

### MC-3: HOLE-VS-ZERO
- **Birth type:** Type 5 (instruction-induced) — per this Blueprint's own classification, independently confirmed
- **Description:** Treating a removable discontinuity (hole in a rational function) as a zero; not checking that the function must evaluate to zero (not be undefined) at a candidate zero.
- **Why this birth type:** Instruction-induced: both holes and zeros arise from setting a numerator factor to zero, and the additional denominator-nonzero condition is often glossed over in early rational-function instruction, so the shared surface procedure (factor and set to zero) is applied without the necessary second check.
- **Detection probe:** "For $f(x)=\frac{x^2-1}{x-1}$, is $x=1$ a zero of $f$?" A student with MC-3 answers "yes" without checking whether $f(1)$ is defined.
- **Repair:** For $f(x)=\frac{x^2-1}{x-1}$: setting the numerator to zero gives $x^2-1=0\Rightarrow x=\pm1$. But at $x=1$, the DENOMINATOR is also zero — $f(1)$ is UNDEFINED (a removable discontinuity, a hole), not a zero. At $x=-1$: $f(-1)=\frac{1-1}{-1-1}=\frac{0}{-2}=0$ — the denominator is nonzero here, so this genuinely IS a zero. A zero requires $x^*$ to be in the domain of $f$ AND $f(x^*)=0$; both conditions, not just the first.
- **Verification of death:** Given a rational function, the student correctly identifies which candidate values are genuine zeros (numerator zero, denominator nonzero) and which are holes (both zero), sorting them into the two distinct categories.

## Analogies
1. **The mailing-address-versus-package-contents analogy (targets MC-1).** A zero is like the ADDRESS where a delivery arrives empty-handed (an $x$-location where the output happens to be nothing); the $y$-intercept is like asking "what's inside the package sent to address zero" (evaluating the output at one specific input). Confusing the two is confusing "where" with "what."
2. **The valley-floor analogy (targets MC-2).** A function whose entire graph sits above a certain height (like a valley whose floor never dips to sea level) simply never reaches zero — no amount of searching finds a crossing point, because the terrain itself never gets there.
3. **The locked-door-versus-open-door analogy (targets MC-3).** A candidate value that zeroes the numerator is like a key that fits the lock (the equation looks solvable); but if the denominator is also zero, the door itself doesn't exist at that address (the function is undefined there) — the key fits a door that isn't there.

## Demonstrations
### Demonstration 1 — zeros vs. y-intercept, four representations (mirrors Blueprint A01)
For $f(x)=x^2-4$: algebraically, solve $x^2-4=0\Rightarrow x=\pm2$; graphically, the parabola crosses the $x$-axis at $(-2,0)$ and $(2,0)$; in factored form $f(x)=(x-2)(x+2)$, the zeros are the negatives of the constants, $x=2,-2$; the $y$-intercept, by contrast, is $f(0)=-4$, giving $(0,-4)$ — computed by evaluation, not solving.

### Demonstration 2 — functions with no zero, one zero, many zeros (mirrors Blueprint A02)
$f(x)=x^2-1$: two real zeros, $x=\pm1$. $f(x)=x^2$: one repeated zero at $x=0$ (the graph touches but does not cross the axis). $f(x)=x^2+1$: no real zeros (discriminant $0-4=-4<0$). $f(x)=x^3$: one zero at $x=0$ (the graph crosses).

### Demonstration 3 — hole vs. zero in a rational function (mirrors Blueprint A02 gate)
For $f(x)=\frac{x^2-1}{x-1}$: setting the numerator to zero gives candidates $x=\pm1$. At $x=1$: the denominator $x-1=0$ too, so $f(1)$ is undefined — a HOLE, not a zero. At $x=-1$: $f(-1)=\frac{(-1)^2-1}{-1-1}=\frac{0}{-2}=0$ — the denominator is nonzero, so this IS a genuine zero.

## Discovery Questions
1. "For $f(x)=x^2-4$: is the $y$-intercept the same kind of quantity as a zero of the function? What is each one measuring?"
2. "Does every function have a real zero? Test $f(x)=x^2+1$ by trying to solve $x^2+1=0$ over the real numbers."
3. "For $f(x)=\frac{x^2-1}{x-1}$, setting the numerator to zero gives $x=\pm1$. Is $x=1$ actually a zero of $f$? What do you need to check first?"

## Teaching Sequence
Best taught by the **Concrete CPA entry stage — a graph overlaid with the $x$-axis, marking $x$-intercepts explicitly, before the algebraic solving procedure**, matching the Blueprint's own CPA justification.
1. Work Demonstration 1's zero-vs-$y$-intercept contrast for $f(x)=x^2-4$, posing Discovery Question 1 before confirming the two are different quantities on different axes.
2. Work Demonstration 2's gallery of no-zero/one-zero/many-zero functions, posing Discovery Question 2 before confirming $x^2+1$ genuinely has no real zero.
3. Work Demonstration 3's hole-vs-zero rational-function case, posing Discovery Question 3 before confirming $x=1$ is a hole and $x=-1$ is the genuine zero.
4. Assess with the P77 problem set and the bisection-method transfer probe (P76, cross-link mode against `math.num.root-finding`).

## Tutor Actions
1. **On any zero-versus-$y$-intercept question:** require the student to state which operation applies — solving $f(x)=0$ for zeros, or evaluating $f(0)$ for the $y$-intercept — before answering.
2. **On any "does this function have a zero" question:** require the student to check the function's minimum/maximum or sign behavior before concluding a zero exists or does not.
3. **On any rational-function zero-finding task:** require the student to verify BOTH that the numerator vanishes AND the denominator does not, at every candidate value.

## Voice Teaching Notes
1. **Register:** proficient/understand — this concept assumes fluency with the graph-of-a-function concept and adds solving-for-zero as the new procedural skill.
2. **Load-bearing sentence, spoken slowly:** "A zero is an input that makes the output zero — never the other way around."
3. **Wait time:** pause after Discovery Question 3, letting the student genuinely check whether $f(1)$ is defined before revealing that $x=1$ is a hole.

## Assessment Signals
1. **Gate concept:** correctly finds all zeros of a given function algebraically, distinguishing them from the $y$-intercept.
2. **No-zero recognition:** correctly identifies when a function has no real zeros, justifying via minimum/maximum or always-positive/negative reasoning.
3. **Hole discrimination:** correctly distinguishes a genuine zero from a removable discontinuity in a rational function by checking both numerator and denominator.
4. **Counting fluency:** correctly counts the number of real zeros of a given function (zero, one repeated, several distinct).
5. **Transfer:** applies the bisection method to locate a zero numerically (P76), deriving the error bound and justifying convergence via the Intermediate Value Theorem.

## Tutor Recovery Strategy
If the student conflates zeros with the $y$-intercept, require them to compute both separately for several fresh functions, explicitly stating which operation (solve vs. evaluate) produced each, until the distinction is automatic. If the student assumes every function has a zero, require them to check the function's range or sign behavior on fresh no-zero examples until "no real zero" becomes an expected, comfortable answer. If the student treats a hole as a zero, require them to verify the denominator explicitly at every candidate value on fresh rational functions until the two-condition check becomes standard practice.

## Memory Hooks
1. "Zero is an $x$-value from solving; $y$-intercept is a $y$-value from evaluating — never swap them."
2. "Check if the graph can even reach zero before hunting for one — some functions never touch the axis."
3. "A hole isn't a zero — the denominator has to survive too, not just the numerator."

## Transfer Connections
- **`math.func.graph-of-function`:** the graph as the set of $(x,f(x))$ pairs, which a zero specializes to the case $y=0$.
- **`math.num.root-finding`** (cross-link, currently unauthored): the bisection method and Newton's method, which locate zeros numerically for transcendental functions with no closed-form solution, using the Intermediate Value Theorem as the existence guarantee.

## Cross-Subject Connections
- **Physics (equilibrium points):** a zero of a net-force function corresponds to a physical equilibrium — where the system experiences no net force — directly reusing the "solve for the input that makes the output zero" skill.
- **Economics (break-even analysis):** a zero of a profit function is the break-even point — the production/sales level at which revenue exactly equals cost — a direct real-world instance of finding a function's zero.

## Blueprint References
- Primary source: `docs/curriculum/blueprints/math.func.zero-of-function.md` — reused by reference throughout (Learning Objectives, worked examples in A01–A03, misconception inventory MC-1–MC-3, transfer probe P76 on the bisection method, mode = cross-link per that Blueprint's own Component 8). Not restated verbatim; this entry adds the mental-model ladder, discovery-vs-direct-instruction argument, voice teaching notes, memory hooks, and cross-subject connections per `EDUCATIONAL_BRAIN_STANDARD.md`'s ownership boundary. All 3 misconceptions' birth types adopted directly from the Blueprint's own classification (MC-1 Type 3, MC-2 Type 5, MC-3 Type 5), independently confirmed rather than re-derived.
- Cross-link: `math.num.root-finding` re-verified genuinely unauthored (Blueprint exists, no Educational Brain entry, `math.num` domain 0/16 unstarted) — confirmed matching the Blueprint's own cross-link declaration.

## Runtime Asset References
- No AssetIdentity rows exist for this concept yet (Layer 3/7 DB-backed assets are populated separately, by live LLM generation plus admin review or by deliberate seed-script batches — never by this authoring layer). This entry is Layer 1/2 content only.

## Curriculum Feedback
- No genuine Blueprint/KG metadata discrepancy found — requires, unlocks, cross_links, difficulty, bloom, mastery_threshold, and estimated_hours all match the live KG exactly (unlocks and cross_links both `math.num.root-finding`, confirmed against the live KG).

## Version History
- **Batch 31** (2026-09-12): initial authoring, part 1 of 4 this batch (with `math.func.even-odd-functions`, `math.func.transformations-functions`, `math.func.periodic-function`), continuing `math.func` as a standalone domain campaign. Blueprint reused by reference; 3 misconceptions adopted at the Blueprint's own classified birth types (MC-1 Type 3, MC-2 Type 5, MC-3 Type 5).
