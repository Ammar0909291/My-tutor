# math.func.end-behavior

## Identity
- **KG ID**: `math.func.end-behavior`
- **Domain**: math.func (Functions)
- **Requires**: `math.func.polynomial-function`
- **Unlocks**: none listed in the KG
- **Cross-links**: none listed in the KG
- **Difficulty**: proficient
- **Bloom level**: analyze
- **Mastery threshold**: 0.80 (MAMR 4/5)
- **Estimated hours**: 3
- **CPA stage**: Concrete (an explicit table of large positive and negative $x$-values showing the leading term dominating every other term — numerical pattern before algebraic generalization)

## Learning Objective
By the end of this concept, the learner can:
1. Determine a polynomial's end behavior (what happens as $x\to+\infty$ and separately as $x\to-\infty$) using the leading-term rule: degree and sign of the leading coefficient.
2. Write end behavior using arrow notation ($f(x)\to+\infty$ as $x\to+\infty$, etc.).
3. Draw the correct tail directions on a graph from the four degree/sign combinations.
4. Extend the analysis, at orientation level, to rational functions via degree comparison and the leading-coefficient ratio.
5. Distinguish end behavior (the tails, for very large $|x|$) from local behavior (zeros, turning points, dips and bumps in the middle) — the two are independent, and a polynomial's middle can do almost anything while its ends remain fixed by the leading term alone.

## Core Understanding
`math.func.polynomial-function` already cautioned that end-behavior alone cannot predict a polynomial's FULL shape — a live counterexample there showed a quartic going up on both ends while still dipping below the x-axis in the middle. This concept develops what end-behavior itself actually IS and precisely how far its claim extends: not "the whole graph," but specifically and only the tails, for $x$ far enough from the origin that every term except the leading one becomes negligible.

**AS $x\to\pm\infty$, A POLYNOMIAL BEHAVES LIKE ITS LEADING TERM ALONE.** For $f(x)=a_nx^n+a_{n-1}x^{n-1}+\cdots+a_0$, dividing through by $x^n$ gives $f(x)/x^n = a_n + a_{n-1}/x + \cdots + a_0/x^n$, and every term after $a_n$ vanishes as $x\to\pm\infty$ (each is a constant divided by a growing power of $x$). So for large enough $|x|$, $f(x)\approx a_nx^n$ — the leading term completely swamps every other term, which is exactly why end-behavior needs only two facts (degree, leading-coefficient sign) rather than the entire polynomial.

**DEGREE PARITY DETERMINES SAME-VS-OPPOSITE TAILS; LEADING-COEFFICIENT SIGN DETERMINES THE DIRECTION.** For $f(x)=x^n$: if $n$ is even, $(-x)^n=x^n$ — no sign change, so both tails go the SAME direction (both up if $a_n>0$, both down if $a_n<0$). If $n$ is odd, $(-x)^n=-x^n$ — the sign FLIPS at $x\to-\infty$, so the tails go in OPPOSITE directions. This produces exactly four patterns: even+positive (both up, like a wide $U$), even+negative (both down), odd+positive (right up, left down — an "S" rising to the right), odd+negative (right down, left up).

**END BEHAVIOR AND LOCAL BEHAVIOR ARE INDEPENDENT AXES.** A degree-$n$ polynomial can have up to $n-1$ turning points and up to $n$ real zeros, all wiggling however the coefficients dictate — while the two TAILS remain locked in place by the leading term alone, regardless of what happens in between. Reading a sketch correctly requires treating "what do the tails do" and "what does the middle do" as two genuinely separate questions, each answered by different evidence (the leading term for the former, evaluation or factoring for the latter).

**FOR RATIONAL FUNCTIONS, END BEHAVIOR COMES FROM COMPARING DEGREES, NOT FROM EITHER POLYNOMIAL ALONE.** At orientation level: if $\deg(p)<\deg(q)$, $f(x)=p(x)/q(x)\to0$ (horizontal asymptote at $y=0$); if $\deg(p)=\deg(q)$, $f(x)\to$ the ratio of leading coefficients; if $\deg(p)=\deg(q)+1$, there is a slant asymptote found via polynomial long division. This is the same leading-term-dominance idea from polynomials, now applied to a ratio of two polynomials at once.

## Mental Models
1. **Rung 1 — The leading term wins the race at the extremes.** Every other term is a straggler that falls infinitely behind as $x$ grows; only the fastest-growing term (the leading term) determines the finish-line direction.
2. **Rung 2 — Even is a mirror, odd is a rotation.** An even-degree leading term treats $+\infty$ and $-\infty$ identically (mirror symmetry in sign); an odd-degree leading term flips the sign between them (180° rotational relationship) — this is exactly WHY the four patterns split cleanly by parity.
3. **Rung 3 — Tails are a claim about the horizon, not the landscape.** End behavior describes what a hiker sees looking toward the horizon from very far away; local behavior (zeros, turning points) describes the terrain directly underfoot — both are true simultaneously about the same graph, at different distances.

## Why Students Fail
MC-1 happens because a learner's most practiced instinct for "what does this function do" is substitution at a specific, convenient value (0, 1, or another small number) — end behavior instead requires reasoning about a LIMIT as $x$ grows without bound, a genuinely different kind of question that the substitution instinct doesn't naturally distinguish from ordinary evaluation. MC-2 happens because the earliest and most memorable polynomial examples a learner meets are typically even-degree (the symmetric parabola), so "both tails go the same way" becomes an unconsciously over-applied default; odd-degree behavior (opposite tails) genuinely contradicts that early-formed expectation and needs deliberate confrontation to correct. MC-3 happens because right-side ($x\to+\infty$) analysis is usually taught first and practiced more heavily, while the $x\to-\infty$ sign-reversal rule for odd powers is introduced later and often without matched practice — so the habit of "just use the leading coefficient's sign" persists uncorrected into cases where it silently fails for the left tail.

## Misconceptions

### MC-1: END-BEHAVIOR-FROM-ZERO
- **Birth type**: Type 1 — Overgeneralization (adopted directly from the Blueprint's own explicit classification)
- **Description**: The learner evaluates $f(0)$ or $f(1)$ to determine what the function does "at the ends," not recognizing that end behavior specifically requires $x\to\pm\infty$.
- **Why this birth type**: Learners are practiced at evaluating functions at specific convenient values; "what does $f$ do" triggers substitution at a convenient value by default, over-generalizing that habit into a question it doesn't answer.
- **Detection probe**: "What is the end behavior of $f(x)=x^2-100x+2499$?" — a learner holding this misconception evaluates $f(0)=2499$ or $f(1)$ and concludes the function is large/positive "at the ends," missing that $x=0$ and $x=1$ are nowhere near the actual tails.
- **Repair**: Show $f(50)=-1$ (small, negative) right beside $f(0)=2499$ (large, positive) — wildly different values at two "ordinary" inputs prove that no single finite evaluation captures end behavior. Then evaluate at $x=10^6$: $f(10^6)\approx(10^6)^2=10^{12}$, enormous and positive — matching the leading term $x^2$'s prediction regardless of what happens at small $x$.
- **Verification of death**: Given any polynomial, the learner identifies the leading term FIRST and reasons about $x\to\pm\infty$ directly from it, without evaluating at any specific finite value.

### MC-2: ODD-DEGREE-SAME-ENDS
- **Birth type**: Type 1 — Overgeneralization (adopted directly from the Blueprint's own explicit classification)
- **Description**: The learner believes odd-degree polynomials have the same tail direction on both sides (like even-degree polynomials do), drawing both tails up or both down.
- **Why this birth type**: Most early polynomial examples are even-degree (the symmetric parabola), imprinting "both ends go the same way" as a default; the genuinely asymmetric behavior of odd-degree functions contradicts that early pattern and feels counter-intuitive until directly confronted.
- **Detection probe**: "$f(x)=x^3-x$. Describe both tails." — a learner holding this misconception says both tails go up (or both down), rather than right-up/left-down.
- **Repair**: A direct numeric contrast: $x^3$ at $x=10$ is $1000$; at $x=-10$ it is $-1000$ — opposite signs. Compare against $x^2$ at $x=10$ (=100) and $x=-10$ (also 100) — identical signs. The even power is symmetric under sign-flip; the odd power is antisymmetric, which is exactly why the tails diverge for odd degree.
- **Verification of death**: Given any odd-degree polynomial, the learner correctly states the tails go in OPPOSITE directions before computing anything, citing $(-x)^n=-x^n$ for odd $n$ as the reason.

### MC-3: LEADING-COEFFICIENT-ONLY-POSITIVE
- **Birth type**: Type 5 — Instruction-induced (adopted directly from the Blueprint's own explicit classification)
- **Description**: The learner correctly uses the leading coefficient's sign to determine behavior for $x\to+\infty$, but ignores the sign reversal at $x\to-\infty$ for odd-degree polynomials, writing the same direction for both ends.
- **Why this birth type**: Right-side ($x\to+\infty$) analysis is typically taught first and practiced more heavily; the $(-x)^n$ sign-reversal step needed for $x\to-\infty$ with odd $n$ is introduced later and not always drilled with matched intensity, so the habit "just use the leading coefficient's sign" persists uncorrected for the left tail.
- **Detection probe**: "$f(x)=3x^5$. What happens as $x\to-\infty$?" — a learner holding this misconception says $f(x)\to+\infty$ (matching the $x\to+\infty$ answer) rather than $-\infty$.
- **Repair**: Walk the substitution explicitly and mechanically: $x\to-\infty$ means substitute a large negative number; $(-\text{large})^5$ is negative (odd power of a negative number), so $3\times(\text{negative})=\text{negative}$, i.e. $f(x)\to-\infty$. Contrast against $x\to+\infty$: $(+\text{large})^5$ is positive, so $f(x)\to+\infty$ — genuinely opposite directions from the same leading coefficient's sign.
- **Verification of death**: Given an odd-degree polynomial, the learner separately computes the sign for $x\to+\infty$ and $x\to-\infty$ (never assuming they match) and correctly identifies opposite tails whenever the degree is odd.

## Analogies
1. **The race with a runaway leader (Rung 1)**: as the race (large $|x|$) goes on longer and longer, the leading term pulls so far ahead that every other term might as well not be running — the finish-line direction is entirely the leader's doing.
2. **Mirror versus 180°-rotation symmetry (for MC-2)**: an even-degree leading term is like a mirror — whatever happens on the right happens identically on the left. An odd-degree leading term is like a 180° rotation — whatever happens on the right happens in REVERSE on the left. Assuming mirror symmetry when the actual symmetry is rotational is exactly MC-2.
3. **Two separate stopwatches (for MC-3)**: timing the trip toward $+\infty$ and the trip toward $-\infty$ are two SEPARATE measurements, each requiring its own substitution — reading one stopwatch and assuming the other shows the same time is the mistake.

## Demonstrations
1. **D1 — The numerical table.** Build a table of $f(x)$ at $x=\pm10,\pm100,\pm1000$ for a chosen polynomial, watching the leading term's prediction converge as $|x|$ grows — establishing end behavior as a genuine limiting trend, not a single evaluation.
2. **D2 — The four-pattern gallery.** Walk all four degree/sign combinations side by side (even+, even−, odd+, odd−) on one page, matching each to its tail-direction picture, so the parity/sign relationship is seen as a single unified rule rather than four unrelated cases.
3. **D3 — The odd-degree sign-flip proof.** Compute $x^3$ at $x=10$ and $x=-10$ live, side by side with $x^2$ at the same two inputs, letting the contrast between antisymmetric and symmetric behavior speak for itself before stating the general rule.

## Discovery Questions
1. "If $f(x)=x^2-100x+2499$, is $f(0)$ a good guide to what $f$ does when $x$ is a million? Why or why not?"
2. "For $f(x)=x^3$, what is $f(10)$? What is $f(-10)$? Are they related by a sign flip, or are they the same?"
3. "A degree-6 polynomial can have up to how many turning points? Does that number tell you anything about which direction its tails point?"

## Teaching Sequence
Entry stage: Concrete (a table of $f$ at large positive and negative $x$-values, watching the leading term dominate, before any algebraic generalization).
1. The numerical table (D1) — establish end behavior as a limiting trend from direct evidence.
2. The four-pattern gallery (D2) and the leading-term-dominance derivation ($f(x)/x^n\to a_n$).
3. The odd-degree sign-flip proof (D3), directly confronting MC-2 and MC-3 together.
4. End behavior vs. local behavior discrimination (turning points, zeros, "wiggles" in the middle are independent of tail direction), then the rational-function extension at orientation level, then transfer probe (P76: rational function end behavior via degree comparison, deriving horizontal and oblique asymptotes).

## Tutor Actions
1. Whenever a learner is asked "what does this function do," first ask whether the question means end behavior (tails, $x\to\pm\infty$) or local behavior (a specific point or region) — never let the two questions blur together, catching MC-1 before any computation starts.
2. For any odd-degree polynomial, require the learner to compute $x\to+\infty$ and $x\to-\infty$ as two SEPARATE steps, never inferring one from the other — directly targeting MC-3.
3. After stating end behavior, ask the learner whether they can now say anything about the number of zeros or turning points in the middle — reinforce that a correct end-behavior answer says nothing about the interior.

## Voice Teaching Notes
- **Register**: proficient/analyze — the learner has already handled polynomial evaluation and root-location in `math.func.polynomial-function`; this concept asks them to reason about limiting trends rather than single computations.
- **Load-bearing sentence**: "Look at the leading term only. Even degree: both tails match the leading coefficient's sign. Odd degree: the tails point opposite ways, and only the right one matches the leading coefficient directly."
- **Wait time note**: after presenting an odd-degree polynomial's leading coefficient, allow enough silence for the learner to attempt BOTH tails before confirming either — resist the urge to validate the (usually-correct) right tail immediately, since that risks reinforcing MC-3's habit of stopping there.

## Assessment Signals
1. Correctly states end behavior (both $x\to+\infty$ and $x\to-\infty$) for a polynomial from its leading term alone, without evaluating at any specific finite input.
2. Correctly identifies whether a polynomial's tails match (even degree) or oppose (odd degree) before computing either direction numerically.
3. Correctly separately computes the $x\to-\infty$ direction for an odd-degree polynomial, distinct from the $x\to+\infty$ direction.
4. Correctly states that end behavior alone does not determine the number of zeros or turning points in the middle of the graph.
5. **P76 Transfer Probe** (independence mode): given a rational function, applies degree comparison ($\deg(p)$ vs. $\deg(q)$) to determine horizontal, oblique, or no asymptote, and uses polynomial long division to find an oblique asymptote when one exists.

## Tutor Recovery Strategy
If a learner correctly identifies the $x\to+\infty$ direction for an odd-degree polynomial but then freezes on $x\to-\infty$ (uncertain whether to flip the sign), return to the mechanical substitution from MC-3's repair: substitute a large NEGATIVE number into the leading term step by step, computing the sign of the odd power first, then applying the leading coefficient's sign — never skip directly to "the same as before." If a learner has just been corrected on MC-2 (odd-degree same-ends) and overcorrects by claiming EVERY polynomial has opposite tails, explicitly re-confirm that even-degree polynomials genuinely do have matching tails, contrasting a fresh even-degree example immediately.

## Memory Hooks
1. "The leading term wins the race — every other term falls behind as $x$ grows."
2. "Even is a mirror, odd is a flip — check both tails separately for odd degree."
3. "Tails tell you about the horizon, not the terrain — the middle can do anything."

## Transfer Connections
- `math.func.polynomial-function` — this concept's own prerequisite; that entry's own end-behavior caution ("end-behavior alone is insufficient for full shape") is directly developed here into the complete leading-term rule and its four degree/sign patterns.
- `math.alg.polynomial` — the KG concept whose own end-behavior rule this entry extends into arrow notation, the four-pattern classification, and the rational-function generalization.
- `math.func.rational-function` — this concept's own orientation-level rational-function extension is the direct entry point into that concept's fuller domain/asymptote/hole treatment.

## Cross-Subject Connections
- Physics: a modeled quantity's long-run behavior as time grows large (e.g. a cooling curve or a population model) is directly analogous to end-behavior reasoning — asking "what happens far in the future" rather than "what is the value right now."
- Economics/business: a cost or revenue model's long-run trend as production scales up (does cost stabilize, grow without bound, or approach a fixed ratio) is the exact real-world use of degree-comparison end-behavior reasoning for rational functions.

## Blueprint References
- `docs/curriculum/blueprints/math.func.end-behavior.md` — fully reused by reference. All 3 misconceptions' birth types adopted directly from the Blueprint's own classification (MC-1 Type 1, MC-2 Type 1, MC-3 Type 5), independently confirmed rather than re-derived.
- No cross-link listed in the KG for this concept; none to verify.

## Runtime Asset References
No AssetIdentity rows exist for this concept yet — Layer 3/7 (DB-backed Explanation/Probe assets) is populated separately by production LLM-generation-plus-admin-review or deliberate seed-script batches, per this program's own layer-ownership mapping. This Educational Brain entry is the Layer 2 authored source those future runtime assets will draw from.

## Curriculum Feedback
No genuine Blueprint/KG metadata discrepancy found — requires, unlocks, cross_links, difficulty, bloom, mastery_threshold, and estimated_hours all match the live KG exactly (unlocks and cross_links both empty per the KG, matching the Blueprint's own declaration).

## Version History
- **Batch 34** (2026-09-13): initial authoring, part 1 of 3 this batch (with `math.func.rational-function`, `math.func.rational-root`), continuing `math.func` as a standalone domain campaign. Blueprint reused by reference; 3 misconceptions adopted at the Blueprint's own classified birth types (MC-1 Type 1, MC-2 Type 1, MC-3 Type 5).
