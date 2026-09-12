# math.func.vertex-form — Vertex Form of a Quadratic (Sign-of-h Convention, Min-vs-Max Direction, Vertex vs. Y-Intercept)

## Identity
- **KG ID:** `math.func.vertex-form`
- **Domain:** math.func (Functions)
- **Requires:** `math.func.quadratic-function`, `math.alg.completing-the-square`
- **Unlocks:** none listed in the KG
- **Cross-links:** none listed in the KG
- **Difficulty:** proficient
- **Bloom level:** apply
- **Mastery threshold:** 0.80 (MAMR 4/5)
- **Estimated hours:** 4

## Learning Objective
By the end of this concept, the student can: (1) convert a quadratic function from standard form $f(x)=ax^2+bx+c$ to vertex form $f(x)=a(x-h)^2+k$ by completing the square; (2) read the vertex $(h,k)$ and axis of symmetry $x=h$ directly from vertex form, correctly applying the sign convention (the subtraction inside the bracket flips to the vertex's actual sign); (3) use the vertex to determine the function's minimum ($a>0$) or maximum ($a<0$) value, conditioning on the sign of $a$ rather than assuming a fixed direction; (4) convert back from vertex form to standard form by expanding, and correctly distinguish the vertex from the $y$-intercept.

## Core Understanding
`math.func.quadratic-function` established the vertex formula $\left(-\frac{b}{2a}, f\left(-\frac{b}{2a}\right)\right)$ as `math.alg.completing-the-square`'s own result, packaged for direct use. This concept develops the FULL vertex-form machinery: converting between forms, reading every feature directly, and correctly handling the sign conventions that trip up a first encounter.

THE SIGN INSIDE THE BRACKET IS OPPOSITE TO THE VERTEX'S ACTUAL SIGN: in $f(x)=a(x-h)^2+k$, the vertex is at $x=h$ — POSITIVE $h$, even though the formula shows a MINUS sign. This is because $x-h=0$ exactly when $x=h$, and the squared term vanishes precisely at the vertex. So $(x-3)^2$ has vertex $x=3$ (not $-3$), and $(x+2)^2=(x-(-2))^2$ has vertex $x=-2$. The minus sign is part of the formula's structure, never a signal to negate $h$.

$k$ IS THE MINIMUM OR MAXIMUM DEPENDING ENTIRELY ON THE SIGN OF $a$: $k$ is always the function's VALUE at the vertex — but whether that value is a minimum or a maximum depends on which way the parabola opens. $a>0$: opens up, vertex is the LOWEST point, $k$ is the MINIMUM. $a<0$: opens down, vertex is the HIGHEST point, $k$ is the MAXIMUM. The same numeric value of $k$ can be either, depending purely on the sign of $a$ — there is no universal rule that $k$ is "always the minimum."

COMPLETING THE SQUARE CONVERTS STANDARD TO VERTEX FORM SYSTEMATICALLY: for $f(x)=ax^2+bx+c$, factor $a$ from the $x$-terms, add and subtract the square of half the remaining coefficient inside the bracket, then factor the resulting perfect square: $f(x)=a\left(x+\frac{b}{2a}\right)^2+\left(c-\frac{b^2}{4a}\right)$, giving $h=-\frac{b}{2a}$ and $k=c-\frac{b^2}{4a}$ — matching the vertex formula from `math.func.quadratic-function` exactly, now derived by the underlying algebraic process rather than plugged into a formula.

THE VERTEX AND THE $y$-INTERCEPT ARE GENUINELY DIFFERENT POINTS: the vertex is $(h,k)$, the parabola's turning point. The $y$-intercept is $f(0)=a(0-h)^2+k=ah^2+k$ — a DIFFERENT point unless $h=0$. Confusing the two conflates a structural feature (the extremum) with an evaluation at one specific input ($x=0$).

## Mental Models
1. **Rung 1 — find the $x$ that makes the bracket zero; that $x$ IS the vertex's $x$-coordinate, regardless of the visible sign.** Never copy the sign directly from the formula.
2. **Rung 2 — check the sign of $a$ FIRST, then decide whether $k$ is a minimum or a maximum.** The vertex value alone never determines this.
3. **Rung 3 — the vertex and the $y$-intercept are two different points unless $h=0$; compute each by its own operation (locate the extremum vs. evaluate at $x=0$).**

## Why Students Fail
Having seen the minus sign inside $(x-h)^2$, students can read the vertex as $(-h,k)$ — applying an extra sign flip that isn't there — missing that $x-h=0$ occurs precisely at $x=h$ (a POSITIVE value when $h$ is positive), so the vertex's actual $x$-coordinate matches the sign of $h$ as written, never its negation. Having mostly encountered textbook examples with $a>0$ (giving a minimum), students can memorize "the vertex value is the minimum" as a universal rule, missing that the direction depends entirely on the sign of $a$ — a parabola opening downward has its vertex as a MAXIMUM instead. Finally, having practiced both "find the vertex" and "find the $y$-intercept" as separate skills, students can conflate the two when asked generally about a parabola's "key point," missing that the vertex is the turning point $(h,k)$ while the $y$-intercept is specifically $f(0)$ — genuinely different values unless the vertex happens to sit on the $y$-axis.

## Misconceptions

### MC-1: VERTEX-FROM-STANDARD-WRONG
- **Birth type:** Type 5 (instruction-induced) — Blueprint designates this "Foundational," independently confirmed
- **Description:** Reading the vertex directly from standard form $ax^2+bx+c$ as $(b,c)$, or computing the vertex incorrectly without the full formula $h=-b/(2a)$, $k=f(h)$.
- **Why this birth type:** Instruction-induced: the coefficients $b$ and $c$ are visually prominent in standard form, tempting students to read them off directly as vertex coordinates, rather than performing the derivation that produces the genuine vertex formula.
- **Detection probe:** "For $f(x)=x^2-6x+5$, is the vertex $(-6,5)$?" A student with MC-1 answers "yes."
- **Repair:** For $f(x)=x^2-6x+5$: the correct vertex requires $h=-\frac{-6}{2(1)}=3$ and $k=f(3)=9-18+5=-4$, giving vertex $(3,-4)$ — nowhere near the incorrect guess $(-6,5)$, which isn't even on the parabola. The vertex requires computing BOTH $a$ and $b$ together via the formula, then substituting back for $k$; it is never read directly from the visible coefficients.
- **Verification of death:** Given a quadratic in standard form, the student computes $h=-b/(2a)$ and $k=f(h)$ (or completes the square) rather than reading vertex coordinates directly from $b$ and $c$.

### MC-2: HORIZONTAL-SHIFT-SIGN-ERROR
- **Birth type:** Type 3 (language contamination) — Blueprint rates this "High," independently confirmed
- **Description:** Reading $f(x)=a(x-h)^2+k$ as vertex at $(-h,k)$, applying an extra sign flip — e.g. vertex form $(x-3)^2$ read as vertex at $(-3,0)$ instead of $(3,0)$.
- **Why this birth type:** Language contamination: the visible minus sign inside $(x-h)$ suggests "the $x$-coordinate is negative $h$" to the untrained eye, rather than the correct reading "the shift is $h$ units to the right."
- **Detection probe:** "For $f(x)=(x-3)^2$, is the vertex at $(-3,0)$?" A student with MC-2 answers "yes."
- **Repair:** $x-h=0$ exactly when $x=h$ — at that input, the squared term vanishes and $f(h)=k$. For $(x-3)^2$: the bracket is zero when $x=3$, so the vertex is at $x=3$ (not $-3$). Quick check: find the $x$ that makes the bracket zero — that $x$ IS the vertex's coordinate, never the sign shown in the formula.
- **Verification of death:** Given a vertex-form expression, the student correctly identifies the vertex's $x$-coordinate by solving "what makes the bracket zero," never by copying or negating the visible sign.

### MC-3: K-IS-THE-MINIMUM-VALUE-ALWAYS
- **Birth type:** Type 1 (overgeneralization) — Blueprint rates this "Foundational," independently confirmed
- **Description:** Identifying $k$ as the minimum (never the maximum) regardless of the sign of $a$, not connecting $k$ to a minimum when $a>0$ but a maximum when $a<0$.
- **Why this birth type:** Overgeneralization: the most common early examples use $a>0$ (giving a minimum), so the pattern "vertex value is the minimum" is memorized without the conditioning on the direction the parabola opens.
- **Detection probe:** "For $f(x)=-2(x-1)^2+8$, is $8$ the minimum value of $f$?" A student with MC-3 answers "yes."
- **Repair:** $f(x)=-2(x-1)^2+8$: $a=-2<0$, so the parabola opens DOWN, meaning the vertex is the HIGHEST point — $8$ is the MAXIMUM, not the minimum. Contrast $g(x)=2(x-1)^2+8$ (same vertex value $8$, but $a=2>0$, opens up, so $8$ IS the minimum here). Check the sign of $a$ FIRST, then interpret $k$ accordingly.
- **Verification of death:** Given a vertex-form expression, the student checks the sign of $a$ before declaring $k$ a minimum or maximum, correctly identifying downward-opening parabolas as maxima.

## Analogies
1. **The zero-key-unlocks-the-vertex analogy (targets MC-2).** A door's combination lock opens at the specific number that zeroes out the mechanism — for $(x-h)$, that number is $h$ itself, positive as written, never its negation. Finding "what unlocks the zero" always gives the true vertex coordinate.
2. **The valley-versus-hilltop analogy (targets MC-3).** The SAME elevation reading can describe the floor of a valley (a minimum, reached from above) or the peak of a hill (a maximum, reached from below) — the number alone doesn't tell you which; the surrounding terrain (here, the sign of $a$) decides.
3. **The home-address-versus-mailbox-check analogy (targets vertex-vs-$y$-intercept confusion).** A house's own address (the vertex, the parabola's defining "location") is a different piece of information from "what's inside the mailbox right now" (the $y$-intercept, a value observed at one specific input, $x=0$) — related to the same house, but genuinely different questions.

## Demonstrations
### Demonstration 1 — reading vertex form directly, sign convention (mirrors Blueprint A01)
$f(x)=2(x-3)^2+1$: $a=2$, $h=3$, $k=1$. Vertex $=(3,1)$, opens up, minimum $y=1$, axis $x=3$. $g(x)=-(x+2)^2+5$: rewritten as $-(x-(-2))^2+5$, so $a=-1$, $h=-2$, $k=5$. Vertex $=(-2,5)$, opens down, maximum $y=5$.

### Demonstration 2 — completing the square, $a\ne1$ case (mirrors Blueprint A02)
For $f(x)=3x^2-12x+13$: factor $3$ from the $x$-terms, $3(x^2-4x)+13$; complete the square inside, $3(x^2-4x+4)-12+13=3(x-2)^2+1$. Vertex $=(2,1)$. Check: $f(2)=12-24+13=1$ ✓.

### Demonstration 3 — vertex vs. $y$-intercept, min-vs-max contrast (mirrors Blueprint A03)
$f(x)=2(x-3)^2+1$: vertex $=(3,1)$; $y$-intercept $=f(0)=2(9)+1=19$ — a genuinely different point. Contrast $f(x)=-2(x-1)^2+8$ ($a<0$, maximum $8$) against $g(x)=2(x-1)^2+8$ (identical vertex value, $a>0$, minimum $8$) — the same $k$ meaning opposite things depending on the sign of $a$.

## Discovery Questions
1. "For $f(x)=(x-3)^2$, is the vertex at $(-3,0)$ or $(3,0)$? Find the $x$ that makes the bracket equal to zero."
2. "For $f(x)=-2(x-1)^2+8$, is $8$ the minimum value of $f$? Check the sign of $a$ first."
3. "For $f(x)=2(x-3)^2+1$, is the vertex the same point as the $y$-intercept? Compute both."

## Teaching Sequence
Best taught by the **Concrete CPA entry stage — an explicit graph of $y=x^2$ shifted and scaled, with the vertex identified visually before the algebraic formula, and completing the square shown geometrically as a square area**, matching the Blueprint's own CPA justification.
1. Work Demonstration 1's direct vertex-form readings, posing Discovery Question 1 before confirming the sign convention.
2. Work Demonstration 2's completing-the-square derivation for $a\ne1$, reinforcing that vertex form comes from a systematic process.
3. Work Demonstration 3's vertex-vs-$y$-intercept and min-vs-max contrasts, posing Discovery Questions 2 and 3 before confirming both distinctions.
4. Assess with the P77 problem set and the conic-sections transfer probe (P76, independence mode).

## Tutor Actions
1. **On any vertex-reading task:** require the student to find the $x$ that zeroes the bracket, never copying or negating the visible sign directly.
2. **On any min/max claim:** require the student to check the sign of $a$ explicitly before declaring $k$ a minimum or maximum.
3. **On any "key point" question:** require the student to state explicitly whether they mean the vertex (turning point) or the $y$-intercept ($f(0)$), computing each by its own operation.

## Voice Teaching Notes
1. **Register:** proficient/apply — this concept assumes fluency with the quadratic-function evaluation framework and develops the full vertex-form conversion skill.
2. **Load-bearing sentence, spoken slowly:** "Find what zeroes the bracket — that's the vertex, sign and all, exactly as it looks."
3. **Wait time:** pause after Discovery Question 2, letting the student genuinely check the sign of $a$ before revealing that $8$ is a maximum, not a minimum.

## Assessment Signals
1. **Gate concept:** correctly converts between standard and vertex forms by completing the square.
2. **Sign-convention fluency:** correctly reads the vertex's $x$-coordinate from vertex form without an erroneous sign flip.
3. **Min/max discrimination:** correctly determines whether $k$ is a minimum or maximum based on the sign of $a$.
4. **Vertex-vs-$y$-intercept discrimination:** correctly distinguishes the vertex from the $y$-intercept, computing each via its own operation.
5. **Transfer:** applies the sign-flip vertex/center-identification pattern to circle and ellipse equations (P76), recognizing vertex form as an instance of a broader conic-section convention.

## Tutor Recovery Strategy
If the student applies an extra sign flip to the vertex, require them to solve "what makes the bracket zero" explicitly on fresh vertex-form expressions until the correct sign reading is automatic. If the student assumes $k$ is always the minimum, require them to check the sign of $a$ explicitly on fresh examples (including downward-opening parabolas) until the conditional reasoning is automatic. If the student conflates the vertex with the $y$-intercept, require them to compute both separately on fresh functions until the distinction is automatic.

## Memory Hooks
1. "Find what zeroes the bracket — that IS the vertex, sign included."
2. "Check the sign of $a$ before calling $k$ a max or a min — the same number can be either."
3. "Vertex is the turning point; $y$-intercept is just $f(0)$ — two different questions, two different points."

## Transfer Connections
- **`math.func.quadratic-function`:** the vertex formula this concept fully develops via completing the square, matching that concept's own already-derived result.
- **`math.alg.completing-the-square`:** the algebraic process this concept applies as the standard-to-vertex-form conversion technique.
- **`math.func.transformations-functions`:** vertex form $a(x-h)^2+k$ is a direct instance of that concept's canonical transformation form $af(b(x-h))+k$, applied specifically to $f(x)=x^2$.

## Cross-Subject Connections
- **Physics (projectile motion optimization):** identifying a projectile's maximum height and the time it occurs directly reuses the vertex-form extraction skill, with the sign of $a$ (always negative for gravity-driven motion) determining that the vertex is a maximum.
- **Engineering and architecture (parabolic arch design):** designing a parabolic archway or reflector dish requires locating the vertex precisely, using the same sign conventions and min/max reasoning developed here.

## Blueprint References
- Primary source: `docs/curriculum/blueprints/math.func.vertex-form.md` — reused by reference throughout (Learning Objectives, worked examples in A01–A03, misconception inventory MC-1–MC-3, transfer probe P76 on conic sections, mode = independence per that Blueprint's own Component 8). Not restated verbatim; this entry adds the mental-model ladder, discovery-vs-direct-instruction argument, voice teaching notes, memory hooks, and cross-subject connections per `EDUCATIONAL_BRAIN_STANDARD.md`'s ownership boundary. All 3 misconceptions' birth types adopted directly from the Blueprint's own classification (MC-1 Type 5, MC-2 Type 3, MC-3 Type 1), independently confirmed rather than re-derived.
- No cross-link listed in the KG for this concept; none to verify.

## Runtime Asset References
- No AssetIdentity rows exist for this concept yet (Layer 3/7 DB-backed assets are populated separately, by live LLM generation plus admin review or by deliberate seed-script batches — never by this authoring layer). This entry is Layer 1/2 content only.

## Curriculum Feedback
- No genuine Blueprint/KG metadata discrepancy found — requires, unlocks, cross_links, difficulty, bloom, mastery_threshold, and estimated_hours all match the live KG exactly (unlocks and cross_links both empty per the KG, matching the Blueprint's own declaration).

## Version History
- **Batch 33** (2026-09-13): initial authoring, part 1 of 3 this batch (with `math.func.polynomial-function`, `math.func.step-function`), continuing `math.func` as a standalone domain campaign. Blueprint reused by reference; 3 misconceptions adopted at the Blueprint's own classified birth types (MC-1 Type 5, MC-2 Type 3, MC-3 Type 1).
