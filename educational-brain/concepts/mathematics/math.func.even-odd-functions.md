# math.func.even-odd-functions — Even and Odd Functions (Symmetry Test, Product/Sum Rules, Symmetric Integrals)

## Identity
- **KG ID:** `math.func.even-odd-functions`
- **Domain:** math.func (Functions)
- **Requires:** `math.func.graph-of-function`
- **Unlocks:** none listed in the KG
- **Cross-links:** none listed in the KG
- **Difficulty:** proficient
- **Bloom level:** apply
- **Mastery threshold:** 0.80 (MAMR 4/5)
- **Estimated hours:** 3

## Learning Objective
By the end of this concept, the student can: (1) classify a function as even ($f(-x)=f(x)$ for all $x$), odd ($f(-x)=-f(x)$ for all $x$), or neither, by algebraic substitution; (2) interpret even symmetry as reflection about the $y$-axis and odd symmetry as $180°$ rotational symmetry about the origin, correctly ruling out $x$-axis symmetry as impossible for any nonzero function; (3) apply the product/sum parity rules (even$\times$even=even, odd$\times$odd=even, even$\times$odd=odd, even+odd=neither unless one is zero) and use symmetry to simplify definite integrals over symmetric intervals.

## Core Understanding
`math.func.graph-of-function` established the graph as the set of $(x,f(x))$ pairs. Symmetry is a structural PROPERTY of that set — whether it looks the same (even) or precisely inverted (odd) when reflected through the origin's two axes.

THE ALGEBRAIC TEST IS THE GROUND TRUTH, NOT THE PICTURE: $f$ is even iff $f(-x)=f(x)$ for EVERY $x$ in the domain; $f$ is odd iff $f(-x)=-f(x)$ for EVERY $x$. These are universal claims, verified by substituting $-x$ into the formula and simplifying — never by checking one convenient number or by eyeballing a graph. A function can also be NEITHER even nor odd; this is a genuine third category, not a failure state requiring further classification.

EVEN MEANS $y$-AXIS SYMMETRY; ODD MEANS ORIGIN SYMMETRY; $x$-AXIS SYMMETRY IS IMPOSSIBLE: even symmetry means the point $(x,f(x))$ has a mirror image $(-x,f(x))$ — same height, reflected across the $y$-axis. Odd symmetry means $(x,f(x))$ maps to $(-x,-f(x))$ — a $180°$ rotation about the origin. A function can NEVER be symmetric about the $x$-axis (except the zero function): $x$-axis symmetry would require both $(x,y)$ and $(x,-y)$ on the graph for the same $x$ — two different outputs for one input, directly violating the function definition (`math.func.graph-of-function`'s vertical line test).

PARITY COMBINES PREDICTABLY UNDER SUMS AND PRODUCTS: even+even=even, odd+odd=odd, but even+odd is generally NEITHER (unless one term is identically zero) — parity is NOT preserved under addition of mixed types. Products behave differently: even$\times$even=even, odd$\times$odd=even, even$\times$odd=odd. These rules follow directly from substituting $-x$ into the combined expression and tracking the signs.

SYMMETRY SIMPLIFIES DEFINITE INTEGRALS OVER SYMMETRIC INTERVALS: for an odd function, $\int_{-a}^{a} f(x)\,dx = 0$ (the negative and positive halves cancel exactly); for an even function, $\int_{-a}^{a} f(x)\,dx = 2\int_0^a f(x)\,dx$ (the two halves are identical, so compute one and double it). This is a genuine computational shortcut, not merely a decorative observation.

## Mental Models
1. **Rung 1 — the algebraic test $f(-x)$ vs. $f(x)$ vs. $-f(x)$ decides parity, always; a picture is a hint, never proof.** Substitute and simplify the WHOLE function, never just individual terms.
2. **Rung 2 — even reflects across the $y$-axis, odd rotates $180°$ about the origin; $x$-axis symmetry is not an option for any function.** The vertical line test forbids it structurally.
3. **Rung 3 — failing BOTH the even test and the odd test means "neither," a genuine third category, not a partial or combined state.** Only the zero function is both.

## Why Students Fail
Having learned that $x^n$ is even when $n$ is even and odd when $n$ is odd for a single monomial, students can generalize this shortcut to any function built from powers of $x$, missing that a SUM of terms with mixed parity (like $x^2+x$) has no clean per-term shortcut and must be tested as a whole by substituting $-x$ into the entire expression. Having correctly computed $f(-x)$ and found it equals neither $f(x)$ nor $-f(x)$, students can conclude the function is "both even and odd" rather than accepting "neither" as the correct, complete, and entirely ordinary third classification. Finally, having encountered the word "even" in contexts suggesting numerical or horizontal-line associations, students can mistake even symmetry for $x$-axis symmetry, missing that the correct axis is the $y$-axis, and that $x$-axis symmetry is structurally impossible for any function that assigns exactly one output per input.

## Misconceptions

### MC-1: EVEN-ODD-FROM-EXPONENTS
- **Birth type:** Type 5 (instruction-induced) — per this Blueprint's own classification, independently confirmed
- **Description:** Determining even/odd by looking at the exponent of $x$ only ($x^2$ is even, $x^3$ is odd), without handling sums (like $x^2+x$) or non-monomial functions.
- **Why this birth type:** Instruction-induced: the exponent shortcut genuinely works for pure monomials $cx^n$, and this narrow-but-correct rule is generalized to sums and other function types where it no longer applies.
- **Detection probe:** "Is $f(x)=x^2+x$ even, odd, or neither?" A student with MC-1 answers "even" (from the $x^2$ term) or "odd" (from the $x$ term) without testing the whole sum.
- **Repair:** For $f(x)=x^2+x$: $f(-x)=(-x)^2+(-x)=x^2-x$. Is $x^2-x=f(x)=x^2+x$? No (unless $x=0$). Is $x^2-x=-f(x)=-x^2-x$? No. So $f(x)=x^2+x$ is NEITHER even nor odd — the exponent shortcut works only for a single monomial, not for a sum with mixed-parity terms.
- **Verification of death:** Given a sum of terms with mixed parity, the student tests the ENTIRE function by substituting $-x$ and comparing to $f(x)$ and $-f(x)$, rather than applying the exponent shortcut term-by-term.

### MC-2: NEITHER-MEANS-BOTH
- **Birth type:** Type 1 (overgeneralization) — per this Blueprint's own classification, independently confirmed
- **Description:** Finding $f(-x)\ne f(x)$ AND $f(-x)\ne -f(x)$, and concluding the function is BOTH even and odd rather than NEITHER.
- **Why this birth type:** Overgeneralization: students confuse "the test for even fails, and the test for odd fails" with "something in between, combining both," rather than recognizing that failing both tests simply lands the function in the third category.
- **Detection probe:** "For $f(x)=e^x$: $f(-x)=e^{-x}\ne e^x$ and $e^{-x}\ne -e^x$. Is $f$ both even and odd?" A student with MC-2 answers "yes."
- **Repair:** $f(x)=e^x$: $f(-x)=e^{-x}$. Is $e^{-x}=e^x$? Only at $x=0$, not for all $x$ — not even. Is $e^{-x}=-e^x$? Never (both sides are always positive) — not odd. The correct conclusion is simply NEITHER — a genuine third category. The ONLY function that is both even and odd is $f(x)=0$ (since $0=-0$ satisfies both identities trivially); every other function is exactly one of even, odd, or neither.
- **Verification of death:** Given a function that fails both the even and odd tests, the student correctly reports "neither" as the complete answer, without inventing a combined or intermediate classification.

### MC-3: EVEN-MEANS-SYMMETRIC-ABOUT-x-AXIS
- **Birth type:** Type 3 (language contamination) — per this Blueprint's own classification, independently confirmed
- **Description:** Confusing $y$-axis symmetry (the correct meaning of "even") with $x$-axis symmetry, drawing the wrong axis of symmetry.
- **Why this birth type:** Language contamination: the word "even" carries loose associations with horizontal/numerical evenness that suggest the $x$-axis, when the correct geometric meaning is reflection across the $y$-axis.
- **Detection probe:** "Is the graph of $f(x)=x^2$ symmetric about the $x$-axis or the $y$-axis?" A student with MC-3 answers "$x$-axis."
- **Repair:** $f(x)=x^2$ is symmetric about the $y$-AXIS: the left half ($x<0$) and right half ($x>0$) are mirror images across the vertical $y$-axis. $x$-axis symmetry would require both $(x,y)$ and $(x,-y)$ on the graph for the same $x$ — but a function can have only ONE $y$-value per $x$, so $x$-axis symmetry is structurally IMPOSSIBLE for any nonzero function (it would fail the vertical line test).
- **Verification of death:** Given an even function, the student correctly identifies $y$-axis reflection (never $x$-axis) as its symmetry, and explains why $x$-axis symmetry cannot occur for a genuine function.

## Analogies
1. **The photocopy-mirror-image analogy (targets MC-1).** A single photocopied page (one monomial) flips predictably, but stapling together several DIFFERENT pages (a sum of mixed-parity terms) and asking "does the whole stack flip the same way" requires checking the stack as a whole, not just one page's behavior.
2. **The three-doors analogy (targets MC-2).** A building has exactly three door types: even-doors, odd-doors, and neither-doors — no door is ever "both an even-door and an odd-door" at once (except one special door, the zero function's). Failing to fit through the even-door and failing to fit through the odd-door simply means the neither-door is the right one.
3. **The reflected-versus-flipped-upside-down analogy (targets MC-3).** Holding a photo up to a vertical mirror ($y$-axis) gives an even reflection — left and right swap, up stays up. Turning a photo upside down and reversing left-right simultaneously (a $180°$ rotation, the odd case) is a completely different operation from flipping it top-to-bottom across a horizontal line ($x$-axis symmetry) — which a function's graph, with one output per input, can never actually exhibit.

## Demonstrations
### Demonstration 1 — the algebraic test on a gallery of functions (mirrors Blueprint A01)
$f(x)=2x^4-3x^2$: $f(-x)=2(-x)^4-3(-x)^2=2x^4-3x^2=f(x)$ — EVEN. $f(x)=x^5-x^3$: $f(-x)=(-x)^5-(-x)^3=-x^5+x^3=-(x^5-x^3)=-f(x)$ — ODD. $f(x)=x^2+x$: $f(-x)=x^2-x$, which equals neither $f(x)$ nor $-f(x)$ — NEITHER.

### Demonstration 2 — product and sum parity rules (mirrors Blueprint A02)
If $f$ and $g$ are both odd: $[fg](-x)=f(-x)g(-x)=(-f(x))(-g(x))=f(x)g(x)=[fg](x)$ — the product is EVEN. If both odd and summed: $[f+g](-x)=-f(x)-g(x)=-[f+g](x)$ — the sum is ODD. Applied to $\int_{-2}^{2}x^3\,dx$: since $x^3$ is odd, the integral is exactly $0$ by symmetry, with no antiderivative needed.

### Demonstration 3 — even means $y$-axis, never $x$-axis (mirrors Blueprint A03 gate)
$f(x)=x^2$: points $(1,1)$ and $(-1,1)$ are both on the graph — mirror images across the $y$-axis (same height, opposite sign of $x$) — confirming $y$-axis symmetry. $x$-axis symmetry would require both $(1,1)$ and $(1,-1)$ on the graph simultaneously — impossible, since $f(1)$ can only equal one value.

## Discovery Questions
1. "Is $f(x)=x^2+x$ even, odd, or neither? Does the exponent shortcut that worked for $x^2$ alone still work here?"
2. "If a function's $f(-x)$ equals neither $f(x)$ nor $-f(x)$, is the function both even and odd, or is there a different conclusion?"
3. "Is the graph of $f(x)=x^2$ symmetric about the $x$-axis or the $y$-axis? What would $x$-axis symmetry require of the function's outputs?"

## Teaching Sequence
Best taught by the **Concrete CPA entry stage — an explicit graph with symmetry lines drawn, and a numerical check at $x=3$ and $x=-3$, before the general algebraic proof**, matching the Blueprint's own CPA justification.
1. Work Demonstration 1's gallery of even/odd/neither classifications, posing Discovery Question 1 before confirming the exponent shortcut fails for sums.
2. Work Demonstration 2's product/sum parity rules and the symmetric-integral shortcut, posing Discovery Question 2 before confirming "neither" is the correct third category.
3. Work Demonstration 3's $y$-axis-versus-$x$-axis symmetry check, posing Discovery Question 3 before confirming $x$-axis symmetry is structurally impossible.
4. Assess with the P77 problem set and the Fourier-series transfer probe (P76, independence mode).

## Tutor Actions
1. **On any even/odd classification task:** require the student to substitute $-x$ into the ENTIRE function and compare to $f(x)$ and $-f(x)$, never applying a per-term or per-exponent shortcut to a sum.
2. **On any function failing both tests:** require the student to state "neither" as the complete, final classification, never "both."
3. **On any symmetry-axis question:** require the student to name the $y$-axis for even and the origin for odd, explicitly ruling out $x$-axis symmetry as impossible for a genuine function.

## Voice Teaching Notes
1. **Register:** proficient/apply — this concept assumes fluency with the graph-of-a-function concept and develops a concrete algebraic classification skill.
2. **Load-bearing sentence, spoken slowly:** "Test the whole function, not just one piece — substitute $-x$ everywhere and see what survives."
3. **Wait time:** pause after Discovery Question 2, letting the student genuinely wrestle with "both vs. neither" before confirming "neither" is correct.

## Assessment Signals
1. **Gate concept:** correctly classifies a function as even, odd, or neither via the algebraic substitution test.
2. **Sum-vs-monomial discrimination:** correctly identifies that a sum of mixed-parity terms is generally neither even nor odd, rejecting the per-exponent shortcut.
3. **Neither-as-complete-answer fluency:** correctly reports "neither" (not "both") when a function fails both tests.
4. **Product/sum rule application:** correctly determines the parity of a sum or product of known-parity functions.
5. **Transfer:** applies even/odd symmetry to eliminate vanishing Fourier coefficients (P76), correctly reasoning that an even periodic function's expansion contains only cosine terms.

## Tutor Recovery Strategy
If the student applies the exponent shortcut to a sum, require them to substitute $-x$ into the FULL expression on several fresh sums until testing the whole function becomes automatic. If the student concludes "both" for a function failing both tests, require them to state explicitly which test failed and why "neither" is the only remaining, correct option, on fresh examples until it is comfortable. If the student names the wrong symmetry axis, require them to plot specific mirrored points on fresh even and odd functions until the $y$-axis/origin distinction is automatic.

## Memory Hooks
1. "Test the whole function, not the pieces — a sum of mixed parities is usually neither."
2. "Failing both tests means neither — that's a real answer, not a dead end."
3. "Even is the $y$-axis, odd is the origin — the $x$-axis is off the table for any real function."

## Transfer Connections
- **`math.func.graph-of-function`:** the graph as the set of $(x,f(x))$ pairs, whose reflective structure (or lack of it) defines parity, and whose vertical line test rules out $x$-axis symmetry entirely.
- **`math.trig.trig-functions`** (not yet authored): $\cos(x)$ is the canonical even function and $\sin(x)$ is the canonical odd function — the parity framework developed here applies directly once trigonometric functions are introduced.

## Cross-Subject Connections
- **Physics (potential energy and force symmetry):** many physical potentials are even functions of displacement (symmetric restoring forces), and the resulting force (the derivative) is odd — directly using the derivative-of-even-is-odd rule this concept previews.
- **Signal processing (Fourier analysis):** decomposing a signal into even and odd parts, and exploiting symmetry to eliminate half the terms in a Fourier expansion, is one of the most-used real-world applications of this exact classification.

## Blueprint References
- Primary source: `docs/curriculum/blueprints/math.func.even-odd-functions.md` — reused by reference throughout (Learning Objectives, worked examples in A01–A03, misconception inventory MC-1–MC-3, transfer probe P76 on Fourier series, mode = independence per that Blueprint's own Component 8). Not restated verbatim; this entry adds the mental-model ladder, discovery-vs-direct-instruction argument, voice teaching notes, memory hooks, and cross-subject connections per `EDUCATIONAL_BRAIN_STANDARD.md`'s ownership boundary. All 3 misconceptions' birth types adopted directly from the Blueprint's own classification (MC-1 Type 5, MC-2 Type 1, MC-3 Type 3), independently confirmed rather than re-derived.
- No cross-link listed in the KG for this concept; none to verify.

## Runtime Asset References
- No AssetIdentity rows exist for this concept yet (Layer 3/7 DB-backed assets are populated separately, by live LLM generation plus admin review or by deliberate seed-script batches — never by this authoring layer). This entry is Layer 1/2 content only.

## Curriculum Feedback
- No genuine Blueprint/KG metadata discrepancy found — requires, unlocks, cross_links, difficulty, bloom, mastery_threshold, and estimated_hours all match the live KG exactly (unlocks and cross_links both empty per the KG, matching the Blueprint's own declaration).

## Version History
- **Batch 31** (2026-09-12): initial authoring, part 2 of 4 this batch (with `math.func.zero-of-function`, `math.func.transformations-functions`, `math.func.periodic-function`), continuing `math.func` as a standalone domain campaign. Blueprint reused by reference; 3 misconceptions adopted at the Blueprint's own classified birth types (MC-1 Type 5, MC-2 Type 1, MC-3 Type 3).
