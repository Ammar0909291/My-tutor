# math.func.vertical-asymptote

## Identity
- **KG ID**: `math.func.vertical-asymptote`
- **Domain**: math.func (Functions)
- **Requires**: `math.func.rational-function`
- **Unlocks**: none listed in the KG
- **Cross-links**: none listed in the KG
- **Difficulty**: proficient
- **Bloom level**: analyze
- **Mastery threshold**: 0.80 (MAMR 4/5)
- **Estimated hours**: 3
- **CPA stage**: Concrete (a numerical table approaching the asymptote from both sides, showing values growing without bound, explicit before graphical analysis)

## Learning Objective
By the end of this concept, the learner can:
1. Locate a rational function's vertical asymptotes by identifying where $Q(x)=0$ AND $P(x)\neq0$, after fully factoring and cancelling any common factors.
2. Distinguish a vertical asymptote from a removable discontinuity (hole), where both $P$ and $Q$ share a common zero that cancels.
3. Describe one-sided behavior ($f\to+\infty$ or $f\to-\infty$ from each side) using sign analysis of the factored numerator and denominator.
4. Sketch the graph near a vertical asymptote with correct direction arrows on each side.
5. Correctly interpret a vertical asymptote as a line the graph approaches but never crosses — the function is genuinely undefined there.

## Core Understanding
`math.func.rational-function` already established the hole-versus-asymptote distinction for a single worked example. This concept develops that distinction into a complete, systematic procedure — factor, cancel, then classify what remains — and adds the one-sided sign analysis that reveals HOW the function blows up on each side of a genuine vertical asymptote.

**A VERTICAL ASYMPTOTE OCCURS EXACTLY WHERE $Q(x)=0$ AFTER CANCELLATION, WITH $P(x)\neq0$ THERE.** The identification procedure is mechanical and sequential: fully factor $P(x)$ and $Q(x)$; cancel any common factors (a cancelled factor produces a hole, not an asymptote — this was already established); set the REMAINING denominator equal to zero and solve. Each surviving zero of the denominator, after cancellation, is a genuine vertical asymptote, because the function's magnitude there grows without bound (dividing by something approaching zero, with a nonzero numerator).

**THE ZEROS OF THE NUMERATOR AND THE ZEROS OF THE DENOMINATOR PLAY OPPOSITE, NOT SIMILAR, ROLES.** A zero of the numerator (with the denominator nonzero there) is a ZERO of the function itself — the graph crosses the $x$-axis at that point, a perfectly well-defined value of $0$. A zero of the denominator (with the numerator nonzero there) is a VERTICAL ASYMPTOTE — the function is undefined and blows up. These are structurally opposite features (one is "the output is exactly zero," the other is "the output doesn't exist"), even though both start from "a factor equals zero somewhere."

**ONE-SIDED BEHAVIOR IS DETERMINED BY SIGN ANALYSIS OF THE FACTORED FORM NEAR THE ASYMPTOTE.** Approaching a vertical asymptote at $x=a$ from the right ($x\to a^+$) or from the left ($x\to a^-$), the sign of each factor in the numerator and denominator (evaluated at a point just barely on that side) determines whether the overall fraction is heading toward $+\infty$ or $-\infty$. The multiplicity of the zero matters: an ODD-multiplicity denominator zero produces opposite signs on the two sides (the function flips sign crossing the asymptote, like $1/x$); an EVEN-multiplicity denominator zero produces the SAME sign on both sides (the function stays on one side, like $1/x^2$).

**A VERTICAL ASYMPTOTE IS NEVER CROSSED, BECAUSE THE FUNCTION IS GENUINELY UNDEFINED THERE — A HARD, STRUCTURAL FACT.** Unlike a horizontal asymptote (a limit statement about the tails, which the graph is free to cross at finite $x$), a vertical asymptote marks an $x$-value where the function simply has no output at all. There is no point on the graph directly above or below $x=a$ when $x=a$ is a genuine vertical asymptote — the graph consists of two separate branches, one on each side, that approach the vertical line but structurally cannot touch it.

## Mental Models
1. **Rung 1 — Factor, cancel, THEN classify.** The identification procedure is a fixed sequence — skipping the cancellation step (jumping straight from "denominator zero" to "asymptote") is exactly how a hole gets mistaken for an asymptote.
2. **Rung 2 — Numerator zeros and denominator zeros are mirror-opposite features.** One produces "the output is exactly zero" (a crossing point); the other produces "the output doesn't exist" (a blow-up) — remembering which is which by their opposite ROLES, not just their locations.
3. **Rung 3 — Odd multiplicity flips, even multiplicity holds.** The parity of the cancelled-out denominator zero's multiplicity is the single fact that determines whether the two branches near an asymptote point in opposite directions or the same direction.

## Why Students Fail
MC-1 happens because the word "asymptote" carries an association with "something going wrong = a zero," and without careful attention to WHICH polynomial's zero is meant, a learner anchors on the more immediately visible feature (the numerator, often factored and read first) rather than correctly identifying that the asymptote-producing zero belongs specifically to the denominator. MC-2 happens because horizontal asymptotes — which CAN be crossed, a fact a learner may encounter around the same time or shortly after — create a plausible-feeling generalization that bleeds backward onto vertical asymptotes, especially since both are drawn as dashed lines on a graph with superficially similar visual conventions. MC-3 happens because the very first encounter with "denominator equals zero" in a rational function is often taught, at an introductory level, as an unconditional rule ("denominator zero means vertical asymptote") before the full cancellation check is introduced — so a learner who has not yet integrated the cancellation step treats every denominator zero identically, missing that a matching numerator factor changes the outcome entirely.

## Misconceptions

### MC-1: NUMERATOR-ZERO-IS-ASYMPTOTE
- **Birth type**: Type 3 — Language contamination (adopted directly from the Blueprint's own explicit classification)
- **Description**: The learner identifies zeros of the numerator, $P(x)=0$, as locations of vertical asymptotes, rather than zeros of the denominator, $Q(x)=0$.
- **Why this birth type**: The word "asymptote" is associated with "something going wrong" and, loosely, with "a zero" — but the specific zero that causes a blow-up belongs to the DENOMINATOR, not the numerator; the learner anchors on the word "zero" itself rather than which polynomial's zero is structurally relevant.
- **Detection probe**: "$f(x)=\dfrac{x-3}{x-1}$. Where is the vertical asymptote?" — a learner holding this misconception answers $x=3$ (a numerator zero) rather than $x=1$ (the actual denominator zero).
- **Repair**: Evaluate $f(3)$ directly: $f(3)=\dfrac{3-3}{3-1}=\dfrac{0}{2}=0$ — a perfectly well-defined output of exactly zero, an $x$-intercept, not an undefined blow-up. Then evaluate $f$ near $x=1$: $f(1.01)\approx\dfrac{-1.99}{0.01}\approx-199$, a value that genuinely explodes — this is the asymptote.
- **Verification of death**: Given any rational function, the learner correctly locates vertical asymptotes from the DENOMINATOR's zeros and correctly locates $x$-intercepts from the NUMERATOR's zeros, treating the two as opposite roles rather than interchangeable "zero" features.

### MC-2: GRAPH-CROSSES-ASYMPTOTE
- **Birth type**: Type 5 — Instruction-induced (adopted directly from the Blueprint's own explicit classification)
- **Description**: The learner draws the graph touching or crossing the vertical asymptote line, treating it as just another value on the graph rather than as a line the function structurally cannot reach.
- **Why this birth type**: Horizontal asymptotes CAN be crossed (a fact usually learned around this same time), and this correct fact about a DIFFERENT kind of asymptote bleeds backward onto vertical asymptotes — "maybe it can cross too" is a plausible-feeling but incorrect generalization from one asymptote type to the other.
- **Detection probe**: "Sketch $f(x)=1/(x-2)$ near $x=2$." — a learner holding this misconception draws a single continuous curve passing through the dashed vertical line at $x=2$.
- **Repair**: State plainly the structural difference: a vertical asymptote at $x=a$ means $f$ is UNDEFINED at $x=a$ — there is literally no $y$-value to plot there, so no curve can pass through that vertical line at all. Contrast directly with a horizontal asymptote, where the function IS defined at every relevant finite $x$ and is free to equal the asymptote's value.
- **Verification of death**: Given a rational function, the learner sketches two SEPARATE branches on either side of each vertical asymptote, with neither branch touching or crossing the dashed vertical line.

### MC-3: HOLE-IS-AN-ASYMPTOTE
- **Birth type**: Type 5 — Instruction-induced (adopted directly from the Blueprint's own explicit classification)
- **Description**: The learner identifies a removable discontinuity (hole) — where both numerator and denominator vanish at the same $x$ — as a vertical asymptote, since both "seem to involve division by zero."
- **Why this birth type**: The first encounter with "denominator equals zero" in a rational function is often taught, at an introductory level, as an unconditional rule ("this always gives a vertical asymptote") before the full cancellation check is introduced — the earlier, incomplete rule persists uncorrected until directly confronted with a cancelling case.
- **Detection probe**: "$f(x)=\dfrac{x^2-4}{x-2}$. Is $x=2$ a vertical asymptote?" — a learner holding this misconception says yes, without checking that $(x-2)$ cancels.
- **Repair**: Factor and cancel live: $\dfrac{(x-2)(x+2)}{x-2}=x+2$ for $x\neq2$. As $x\to2$, this simplified form approaches $4$ — a FINITE value, not an infinite blow-up. Compare the two situations directly: a vertical asymptote gives an infinite limit; a hole gives a finite limit (just at a single missing point).
- **Verification of death**: Given a rational function, the learner factors and cancels FIRST, then classifies only the REMAINING denominator zeros as vertical asymptotes, correctly identifying any cancelled zero as a hole instead.

## Analogies
1. **Opposite job titles, not synonyms (for MC-1)**: a numerator zero and a denominator zero are like two employees with opposite job descriptions — one produces "the exact output zero" (a well-defined result), the other produces "no output exists" (a blow-up) — confusing their job titles because both involve the word "zero" is the mistake.
2. **A wall with no door (for MC-2)**: a vertical asymptote is a wall with no door anywhere in it — the two branches of the graph exist on either side of the wall, but nothing can pass through it, unlike a horizontal asymptote, which is more like a distant fence you can occasionally hop over.
3. **The self-erasing factor (for MC-3)**: a cancelling factor in both numerator and denominator erases itself from the story entirely — what's LEFT after that erasure is what actually determines the function's real behavior near that point, and what's left, in a hole's case, is a perfectly ordinary finite value.

## Demonstrations
1. **D1 — Opposite roles, side by side.** For one rational function, evaluate at both a numerator zero (getting exactly $0$) and a denominator zero (getting an exploding value), narrating the structurally opposite results explicitly — directly confronting MC-1.
2. **D2 — Two branches, no bridge.** Sketch a function with a genuine vertical asymptote, drawing the two separate branches on either side and explicitly marking that no curve connects them across the dashed line — directly confronting MC-2.
3. **D3 — The cancellation reveal.** Present $f(x)=(x^2-4)/(x-2)$, factor and cancel live, then evaluate the simplified form near $x=2$ to reveal a finite limit — directly confronting MC-3.

## Discovery Questions
1. "A rational function has a zero of the numerator at $x=3$ and a zero of the denominator at $x=1$. Are these the same kind of feature on the graph, or different? What happens to $f$ at each?"
2. "You've learned a horizontal asymptote can sometimes be crossed. Does that mean a vertical asymptote can be crossed too? What's different about what each one describes?"
3. "Both the numerator and the denominator of a rational function equal zero at the same $x$-value. Is that automatically a vertical asymptote? What extra step do you need to check?"

## Teaching Sequence
Entry stage: Concrete (a numerical table approaching the asymptote from both sides, showing values growing without bound, before graphical or algebraic generalization).
1. Opposite roles, side by side (D1) — establishing numerator-zero and denominator-zero as structurally different features, pre-empting MC-1.
2. Two branches, no bridge (D2) — directly confronting MC-2 with an explicit sketch.
3. The cancellation reveal (D3) — directly confronting MC-3 with a worked cancelling example.
4. One-sided sign analysis and the odd/even multiplicity contrast, then transfer probe (P76: reconstructing a rational function from a full description of its asymptotes, holes, and intercepts).

## Tutor Actions
1. Whenever a learner reports a vertical asymptote's location, ask them to state explicitly which polynomial's zero they used (numerator or denominator) before accepting the answer — catch MC-1 at the naming step.
2. When a learner sketches a graph near a vertical asymptote, check that the two branches are drawn as genuinely separate curves, never connected across the dashed line — catch MC-2 visually, before accepting the sketch.
3. Before classifying any denominator zero as a vertical asymptote, require the learner to state explicitly whether the numerator ALSO vanishes there, and if so, whether the shared factor cancels — never let a denominator-zero claim stand without this check, catching MC-3.

## Voice Teaching Notes
- **Register**: proficient/analyze — the learner combines a factoring-and-cancellation procedure with genuine sign-analysis reasoning about direction; language should treat both the mechanical procedure and the "why this direction" reasoning as equally important.
- **Load-bearing sentence**: "Numerator zero means the output IS zero. Denominator zero, after cancelling, means the output DOESN'T EXIST. These are opposite, not similar."
- **Wait time note**: after presenting a rational function with a shared zero in numerator and denominator, allow enough silence for the learner to attempt the cancellation check unprompted before confirming whether it is a hole or an asymptote — this is the single most diagnostic moment for MC-3.

## Assessment Signals
1. Correctly locates all vertical asymptotes of a rational function by factoring, cancelling, and identifying the remaining denominator zeros.
2. Correctly distinguishes a hole from a vertical asymptote at a shared zero of numerator and denominator, via the cancellation check.
3. Correctly determines one-sided behavior ($+\infty$ or $-\infty$ on each side) at a vertical asymptote via sign analysis, including the odd-versus-even multiplicity distinction.
4. Correctly sketches two separate branches on either side of a vertical asymptote, with neither branch touching or crossing the dashed line.
5. **P76 Transfer Probe** (independence mode): reconstructs a rational function's numerator and denominator from a full description of its vertical asymptotes, hole, intercept, and end behavior, then verifies the construction against every stated feature.

## Tutor Recovery Strategy
If a learner correctly distinguishes numerator-zero from denominator-zero (MC-1 resolved) but still hesitates on sign analysis for one-sided behavior, return to direct numerical evaluation just barely on each side of the asymptote (e.g. $x=a-0.01$ and $x=a+0.01$) rather than abstract sign tracking — concrete evaluation is the more reliable anchor while the sign-analysis procedure is still being internalized. If a learner has just resolved MC-3 (hole versus asymptote) but then treats EVERY shared zero as automatically a hole without checking cancellation actually occurs, walk a counterexample with a shared zero that does NOT fully cancel (e.g. differing multiplicities), showing that the check must be performed explicitly each time, not assumed from the mere presence of a shared factor.

## Memory Hooks
1. "Numerator zero: the output IS zero. Denominator zero: the output DOESN'T EXIST."
2. "A wall with no door — the two branches near a vertical asymptote never touch."
3. "Factor, cancel, THEN classify — never call a denominator zero an asymptote before checking cancellation."

## Transfer Connections
- `math.func.rational-function` — this concept's own prerequisite; its introductory hole-versus-asymptote distinction on a single worked example is developed here into the complete, general factor-cancel-classify procedure plus one-sided sign analysis.
- `math.func.horizontal-asymptote` — the sibling concept sharing this entry's own prerequisite; the two concepts together form the complete asymptote analysis of a rational function, and this entry's own "never crossed" rule is the direct point of contrast against that concept's "can be crossed" rule.
- `math.func.zero-of-function` — this concept's own numerator-zero/denominator-zero distinction directly reuses that concept's definition of a function's zeros, now contrasted against the structurally opposite vertical-asymptote feature.

## Cross-Subject Connections
- Physics: a quantity that genuinely diverges at a specific physical condition (e.g. the electric field magnitude near a point charge as distance approaches zero) is modeled by a function with a vertical-asymptote-like blow-up, and the "never crossed" structural fact mirrors the physical impossibility of the quantity taking a finite value at that exact condition.
- Engineering: resonance phenomena in circuit or mechanical systems, where a response function's denominator vanishes at a critical frequency, produce a vertical-asymptote-shaped blow-up in the idealized (undamped) model — directly modeling this concept's own algebraic structure.

## Blueprint References
- `docs/curriculum/blueprints/math.func.vertical-asymptote.md` — fully reused by reference. All 3 misconceptions' birth types adopted directly from the Blueprint's own classification (MC-1 Type 3, MC-2 Type 5, MC-3 Type 5), independently confirmed rather than re-derived.
- No cross-link listed in the KG for this concept; none to verify.

## Runtime Asset References
No AssetIdentity rows exist for this concept yet — Layer 3/7 (DB-backed Explanation/Probe assets) is populated separately by production LLM-generation-plus-admin-review or deliberate seed-script batches, per this program's own layer-ownership mapping. This Educational Brain entry is the Layer 2 authored source those future runtime assets will draw from.

## Curriculum Feedback
No genuine Blueprint/KG metadata discrepancy found — requires, unlocks, cross_links, difficulty, bloom, mastery_threshold, and estimated_hours all match the live KG exactly (unlocks and cross_links both empty per the KG, matching the Blueprint's own declaration).

## Version History
- **Batch 35** (2026-09-13): initial authoring, part 2 of 2 this batch (with `math.func.horizontal-asymptote`) — **the final two concepts, bringing `math.func` to 29/29, DOMAIN CERTIFIED**, the sixth mathematics domain after math.found/math.geom/math.arith/math.nt/math.alg. Blueprint reused by reference; 3 misconceptions adopted at the Blueprint's own classified birth types (MC-1 Type 3, MC-2 Type 5, MC-3 Type 5).
