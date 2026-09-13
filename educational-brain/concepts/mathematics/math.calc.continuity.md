# math.calc.continuity

## Identity
- **KG ID**: `math.calc.continuity`
- **Domain**: math.calc (Calculus)
- **Requires**: `math.calc.limits`
- **Unlocks**: none listed in the KG (the Blueprint additionally names `math.calc.differentiation`/`math.calc.intermediate-value-theorem` as forward-pointing guidance, neither authored yet)
- **Cross-links**: `math.real.continuity-rigorous`, `math.top.continuity-top` — both confirmed genuinely unauthored (math.real and math.top are entirely unstarted domains) — **independence mode**
- **Difficulty**: advanced
- **Bloom level**: analyze
- **Mastery threshold**: 0.80 (MAMR 4/5)
- **Estimated hours**: 8
- **CPA stage**: Concrete (a motion analogy — a continuous path has no teleportation; a discontinuity is a jump or hole in the path — before graphical and algebraic representations)

## Learning Objective
By the end of this concept, the learner can:
1. State and apply the three-condition definition of continuity at a point: (C1) $f(a)$ is defined; (C2) $\lim_{x\to a}f(x)$ exists; (C3) $\lim_{x\to a}f(x)=f(a)$ — ALL three required simultaneously.
2. Classify a discontinuity as removable, jump, or infinite based on precisely which condition(s) fail.
3. Apply the three-condition test systematically to piecewise-defined functions at their boundary points, computing $f(a)$ and both one-sided limits separately before comparing.
4. Recognize that continuity on an interval requires continuity at EVERY point in that interval, and that a piecewise function's formula change at a boundary does not by itself imply discontinuity there.

## Core Understanding
Continuity is the precise resolution of the "limit versus value" distinction `math.calc.limits` first established: a function is continuous at a point exactly when its limit there EXISTS AND AGREES with the function's actual value. Every discontinuity is a specific, nameable failure of one or more of three independently-checkable conditions.

**ALL THREE CONDITIONS ARE REQUIRED SIMULTANEOUSLY — NONE IS OPTIONAL, AND NONE IMPLIES ANOTHER.** (C1) $f(a)$ is defined; (C2) $\lim_{x\to a}f(x)$ exists; (C3) $\lim_{x\to a}f(x)=f(a)$. A function passing all three at a point is continuous there — informally, "you can draw through that point without lifting your pencil." Any single failure produces a discontinuity, and WHICH condition fails determines WHICH type of discontinuity results. Crucially, C2 (limit exists) is necessary but never sufficient on its own — C3's additional requirement, that the limit must specifically MATCH the function's actual value, is a separate, independently-checkable fact.

**THE TYPE OF DISCONTINUITY IS DETERMINED BY WHICH CONDITION FAILS.** A REMOVABLE discontinuity (a hole) occurs when the limit exists (C2 holds) but either $f(a)$ is undefined (C1 fails) or $f(a)$ disagrees with the limit (C3 fails) — this is the ONLY type fixable by redefining a single point, since the "correct" value is already known from the limit. A JUMP discontinuity occurs when the one-sided limits exist individually but disagree (C2 fails via disagreement) — no single-point redefinition can fix this, since there is no one value the function could take that would make both sides agree. An INFINITE discontinuity occurs when at least one one-sided limit is itself unbounded ($\pm\infty$, C2 fails via non-existence in this different way) — producing a vertical asymptote.

**A PIECEWISE FUNCTION'S FORMULA CHANGE AT A BOUNDARY DOES NOT, BY ITSELF, PRODUCE A DISCONTINUITY.** The three-condition test must be applied explicitly at every boundary point: compute $f(a)$ from whichever piece's domain condition literally contains $a$; compute the left-hand limit from the piece valid for $x<a$; compute the right-hand limit from the piece valid for $x>a$; then compare all three. Many well-behaved, smooth functions (like $|x|$, itself piecewise-defined) are perfectly continuous everywhere despite a formula change at their boundary — the formula changing is irrelevant to the OUTCOME; only whether the pieces' values and limits actually agree matters.

**VISUAL INSPECTION OF A GRAPH CAN MISS A REMOVABLE DISCONTINUITY ENTIRELY.** A function like $g(x)=(x^2-1)/(x-1)$, algebraically simplified to $x+1$ for $x\neq1$, produces a graph that LOOKS like a perfectly smooth, unbroken line — but the original function is genuinely undefined at $x=1$ (a hole exists there, invisible unless specifically checked). The algebraic three-condition test catches this precisely because it doesn't rely on how the SIMPLIFIED graph happens to look; it checks the ORIGINAL function's defined status at the point directly.

## Mental Models
1. **Rung 1 — Three independent locks, all must open.** Continuity is not a single yes/no check but three separate conditions, each independently verifiable, all of which must hold — checking two and assuming the third is exactly how discontinuities get missed.
2. **Rung 2 — The failure mode names the discontinuity type.** Removable (C1 or C3 fails, limit still exists), jump (C2 fails via disagreement), infinite (C2 fails via unboundedness) — each type is a direct, mechanical consequence of exactly which condition broke, not a separate classification to memorize independently.
3. **Rung 3 — A formula change is neutral; only the actual numbers decide.** Whether a piecewise boundary is continuous or not is decided entirely by whether the computed values and limits happen to agree — the fact that two different formulas are involved carries no predictive weight on its own.

## Why Students Fail
MC-1 happens because continuity is typically FIRST introduced informally via the "draw without lifting your pencil" analogy — a genuinely useful entry-point intuition that a learner never moves beyond into the formal three-condition algebraic test, so visual inspection of a graph (which can be deceived by a simplified or misleading rendering) remains the DECISION PROCEDURE rather than a supplementary intuition alongside the actual test. MC-2 happens because a learner correctly checks C1 (defined) and C2 (limit exists) but then treats C3 (limit equals value) as automatically satisfied once the first two hold — an entirely separate condition gets silently folded into "the limit existing," rather than being recognized as its own independently-checkable fact that can fail even when both prior conditions hold. MC-3 happens because piecewise functions are frequently INTRODUCED specifically as canonical examples of discontinuity in textbooks (jump discontinuities are the most visually dramatic and memorable examples), so the learner over-generalizes from a biased sample of examples: "formula changes at a boundary" gets associated with "discontinuity" as if it were a causal rule, rather than recognizing that many piecewise functions (like $|x|$) are perfectly continuous at their boundaries.

## Misconceptions

### MC-1: CONTINUOUS-MEANS-NO-GAPS
- **Birth type**: Type 6 — Analogy overextension (independently classified; this Blueprint, using an older Curriculum Production Pipeline document format like `math.calc.limits`, carries no explicit birth-type column — this classification is this program's own, not adopted from the Blueprint)
- **Description**: The learner judges continuity by visual inspection alone — if the graph "looks connected," the function is deemed continuous — missing removable discontinuities where a hole exists but the SIMPLIFIED graph appears smooth.
- **Why this birth type**: Continuity was introduced informally via the "draw without lifting your pencil" analogy, a genuinely useful entry-point device — but the learner treats the analogy itself as the actual decision procedure, never moving to the formal three-condition algebraic test the analogy was only meant to motivate.
- **Detection probe**: "Without simplifying, evaluate $g(x)=(x^2-1)/(x-1)$ at $x=1$. What does the graph look like near $x=1$?" — a learner holding this misconception reports the graph "looks like a straight line, so it's continuous," missing that $g(1)$ is genuinely undefined.
- **Repair**: Show the algebraic cancellation explicitly: $(x^2-1)/(x-1)=(x+1)(x-1)/(x-1)=x+1$ ONLY when $x\neq1$ — at $x=1$, the original function is undefined, and the cancelled/simplified form hides this fact visually. Apply the three-condition test: C1 fails because $g(1)$ is undefined, regardless of how smooth the simplified graph looks. State plainly: "always apply the three-condition algebraic test; never rely on the visual alone."
- **Verification of death**: Given a function whose simplified form looks smooth but whose original form has an undefined point, the learner correctly applies the algebraic three-condition test and identifies the removable discontinuity, rather than trusting the visual appearance.

### MC-2: LIMIT-EXISTS-MEANS-CONTINUOUS
- **Birth type**: Type 1 — Overgeneralization (independently classified, same reason as MC-1: no Blueprint birth-type column)
- **Description**: The learner believes that if $\lim_{x\to a}f(x)$ exists, then $f$ is automatically continuous at $x=a$, ignoring the third condition that the limit must also equal $f(a)$.
- **Why this birth type**: The first two conditions (defined, limit exists) are genuinely checked correctly, but the third condition (limit equals value) gets silently treated as automatically satisfied once the limit exists — a compound requirement collapsed into its more visible, more frequently-checked component.
- **Detection probe**: "For $f(x)=\begin{cases}x^2+1 & x\neq2\\6 & x=2\end{cases}$, the limit as $x\to2$ is $5$. Is $f$ continuous at $x=2$?" — a learner holding this misconception answers yes, since "the limit exists."
- **Repair**: State the three-condition requirement explicitly and check each: C1 — $f(2)=6$, defined. C2 — the limit is $5$, exists. C3 — is $5=6$? NO. C3 fails, so $f$ is NOT continuous at $x=2$ — this is a removable discontinuity (a hole at the approach height $5$, with the function separately, "incorrectly," parked at $6$). Fixable by redefining $f(2)=5$.
- **Verification of death**: Given a case where the limit exists but the function's defined value differs, the learner correctly identifies that continuity fails specifically because C3 (limit equals value) is violated, never assuming C3 follows automatically from C2.

### MC-3: PIECEWISE-ALWAYS-DISCONTINUOUS
- **Birth type**: Type 1 — Overgeneralization (independently classified, same reason as MC-1: no Blueprint birth-type column; the Blueprint's own text explicitly attributes this to biased textbook examples)
- **Description**: The learner assumes piecewise-defined functions are always discontinuous at their boundary points, simply because the formula changes there.
- **Why this birth type**: Piecewise functions are frequently introduced specifically AS canonical examples of discontinuity (jump discontinuities being the most visually memorable case), so the learner over-generalizes from this biased sample: "formula change at a boundary" gets treated as a causal signal of discontinuity, rather than a neutral fact requiring the actual three-condition check.
- **Detection probe**: "Is $f(x)=\begin{cases}2x & x\leq1\\x+1 & x>1\end{cases}$ continuous at $x=1$?" — a learner holding this misconception answers no, reasoning "the formula changes at $x=1$, so it must be discontinuous," without checking the actual values.
- **Repair**: Apply the three-condition test explicitly: $f(1)=2(1)=2$ (C1 holds). $\lim_{x\to1^-}f(x)=2$; $\lim_{x\to1^+}f(x)=1+1=2$ — both sides agree at $2$ (C2 holds). $\lim=2=f(1)$ (C3 holds). ALL three hold — $f$ IS continuous at $x=1$, despite the formula changing there. Name a further example: $|x|=\begin{cases}x & x\geq0\\-x & x<0\end{cases}$ is continuous everywhere, despite being piecewise-defined throughout its entire domain.
- **Verification of death**: Given any piecewise function, the learner applies the three-condition test explicitly at each boundary rather than assuming discontinuity from the mere presence of a formula change, correctly identifying cases (like this one) where the pieces genuinely "join up."

## Analogies
1. **The road with three ways to fail (Rung 1)**: a car's continuous path along a road can fail in exactly three ways — the road has no marking at a point (C1: undefined), the road suddenly teleports the car elsewhere (C2: limit doesn't exist, a jump), or the car ends up parked somewhere different from where the road actually leads (C3: limit exists but disagrees with the value, a removable hole).
2. **A hidden trapdoor under a painted floor (for MC-1)**: the simplified graph is like a floor painted to look perfectly solid — but the original function's undefined point is a genuine trapdoor hidden beneath the paint, invisible until you check the actual structure (the algebraic test) rather than trust the paint job (the visual).
3. **Two matching train schedules arriving at different platforms (for MC-3)**: two different formulas (like two train lines with different schedules) can still deliver passengers to the EXACT SAME platform at the EXACT SAME time — the fact that they're different lines (different formulas) says nothing by itself about whether they actually coincide at the junction.

## Demonstrations
1. **D1 — The road-teleportation motion analogy.** Walk through the three ways a car's path on a road can fail (undefined marking, sudden teleportation, arriving at the wrong spot), mapping each directly to C1, C2, C3 before any algebra — establishing the three-condition structure concretely.
2. **D2 — The hidden hole beneath a smooth-looking graph.** Present $(x^2-1)/(x-1)$'s simplified graph (looks like a straight line), then reveal via the algebraic test that $x=1$ is genuinely undefined in the original — directly confronting MC-1.
3. **D3 — Same formula-change, opposite outcomes.** Present one piecewise function that IS continuous at its boundary and one that is NOT, both with a visible formula change, applying the three-condition test to each and contrasting the results — directly confronting MC-3.

## Discovery Questions
1. "A function's graph, after simplifying its formula, looks perfectly smooth with no visible gap. Does that guarantee the original function is continuous everywhere on that graph?"
2. "You've confirmed a function is defined at a point AND that its limit exists there. Is that enough to conclude it's continuous? What else would you need to check?"
3. "A piecewise function's formula genuinely changes at a specific point. Does that automatically mean the function is discontinuous there? What would you need to check to find out?"

## Teaching Sequence
Entry stage: Concrete (the road-teleportation motion analogy, mapping each failure mode directly to a condition, before graphical or algebraic representation).
1. The road-teleportation motion analogy (D1), establishing the three-condition structure concretely before any formula.
2. The hidden hole beneath a smooth-looking graph (D2) — directly confronting MC-1 with the algebraic test's power to catch what visual inspection misses.
3. The systematic piecewise boundary-point procedure (compute $f(a)$, compute both one-sided limits, compare all three) applied across removable, jump, and infinite discontinuity examples — pre-empting MC-2 by making C3's independence explicit at every step.
4. Same formula-change, opposite outcomes (D3) — directly confronting MC-3, then transfer probe (P76, independence mode): analyzing two closely-related piecewise functions side by side, one continuous and one with a removable discontinuity at the identical boundary point.

## Tutor Actions
1. Whenever a learner claims a function is continuous "because the graph looks smooth," require the algebraic three-condition test as the deciding procedure before accepting the claim — catch MC-1 by demanding the formal check, not the visual impression.
2. Whenever a learner has confirmed C1 and C2 hold, explicitly ask "does the limit ALSO equal the function's actual value?" as a separate, required question — never let C3 be assumed once C1 and C2 are established, catching MC-2.
3. Whenever a piecewise function's boundary point is analyzed, ask the learner to state their conclusion BEFORE computing anything, then compare against the actual three-condition result — surfacing MC-3 as a testable prediction rather than an unexamined assumption.

## Voice Teaching Notes
- **Register**: advanced/analyze — the learner combines the fully-mastered limit machinery (`math.calc.limits`, one-sided limits) into a genuinely new, three-part synthesis; language should treat the synthesis itself, and the precise classification scheme it enables, as the new content.
- **Load-bearing sentence**: "All three conditions must hold — defined, limit exists, AND limit equals the value. Missing any one names a specific type of discontinuity."
- **Wait time note**: after presenting a case where C1 and C2 both hold, allow enough silence for the learner to attempt checking C3 independently before confirming continuity — this is the single most diagnostic moment for catching MC-2 before it hardens.

## Assessment Signals
1. Correctly applies the three-condition test (C1, C2, C3) to determine continuity at a point.
2. Correctly classifies a discontinuity as removable, jump, or infinite based on which condition(s) fail.
3. Correctly applies the systematic boundary-point procedure to a piecewise function, computing $f(a)$ and both one-sided limits separately before comparing.
4. Correctly identifies a continuous piecewise function despite a formula change at its boundary, without assuming discontinuity from the formula change alone.
5. **P76 Transfer Probe** (independence mode): given two closely-related piecewise functions at the same boundary point (one continuous, one with a removable discontinuity), applies the three-condition test to each and correctly classifies both outcomes.

## Tutor Recovery Strategy
If a learner correctly identifies that C3 failed (MC-2 resolved) but cannot state what TYPE of discontinuity results, walk through the classification table explicitly: C3 failing while the limit exists is specifically a REMOVABLE discontinuity (the "fixable" type, since a redefinition at that one point resolves it) — distinguish this from C2 failing, which produces a jump or infinite discontinuity that cannot be fixed by redefining a single point. If a learner has just resolved MC-3 (piecewise formula change doesn't imply discontinuity) but then over-corrects by assuming EVERY piecewise function is automatically continuous, return to a genuine jump-discontinuity example and apply the three-condition test fresh, showing that formula change is neutral — sometimes the pieces agree, sometimes they don't, and only the actual check decides.

## Memory Hooks
1. "All three conditions, every time — defined, limit exists, AND they match."
2. "The failure names the type: removable is fixable, jump and infinite are not."
3. "A formula change is neutral — only the actual numbers decide continuity."

## Transfer Connections
- `math.calc.limits` — this concept's own prerequisite; the general limit definition and the limit-versus-value distinction (MC-1/MC-2 there) that this concept's C2/C3 conditions directly formalize and resolve.
- `math.calc.one-sided-limits` — the systematic piecewise boundary-point procedure this concept teaches directly reuses that concept's own one-sided-limit computation and the equivalence theorem (both sides must agree for C2 to hold).
- `math.func.vertical-asymptote` — already authored; the "infinite discontinuity" classification this concept names is the exact same phenomenon that concept's own "never crossed, because undefined" vertical-asymptote rule describes, now framed through the continuity lens.

## Cross-Subject Connections
- Physics: a physical quantity modeled as continuous (e.g. position as a function of time, for an object that cannot teleport) directly embodies this concept's own motion analogy — a genuine discontinuity in a physical model usually signals either an idealization breaking down or a genuine physical transition (like a phase change) worth flagging.
- Engineering/computer science: a control system or algorithm whose behavior "jumps" at a threshold (a discontinuous response) can produce unstable or unpredictable behavior precisely at that threshold — the three-condition test is the exact tool for verifying whether a modeled system's response is safely continuous across its operating range.

## Blueprint References
- `docs/curriculum/blueprints/math.calc.continuity.md` — fully reused by reference. This Blueprint uses an older Curriculum Production Pipeline document format (Teaching Actions TA-A01/TA-B01, primitives P11/P49/P91), matching `math.calc.limits`'s own format, and carries no explicit birth-type column. All 3 misconceptions in this entry are therefore **independently classified** by this program (MC-1 Type 6, MC-2 Type 1, MC-3 Type 1), not adopted from the Blueprint — stated here explicitly and honestly, per this program's standing discipline for concepts lacking a pre-assigned birth type.
- Cross-links `math.real.continuity-rigorous` and `math.top.continuity-top` confirmed genuinely unauthored (both math.real and math.top are entirely unstarted domains, 0 concepts each) — **independence mode**, matching the Blueprint's own P76_mode declaration.

## Runtime Asset References
No AssetIdentity rows exist for this concept yet — Layer 3/7 (DB-backed Explanation/Probe assets) is populated separately by production LLM-generation-plus-admin-review or deliberate seed-script batches, per this program's own layer-ownership mapping. This Educational Brain entry is the Layer 2 authored source those future runtime assets will draw from.

## Curriculum Feedback
The Blueprint's own Component 7 names `math.calc.differentiation` and `math.calc.intermediate-value-theorem` as "unlocked" concepts, but the live KG's own `unlocks` field for this concept is empty — a genuine Blueprint/KG metadata discrepancy, recorded not fixed, per this program's standing rule of following the KG on any divergence. Separately: this is the seventh Blueprint in this campaign to lack an explicit birth-type column, and the second (after `math.calc.limits`) to use the older Teaching-Action/primitive-code document format rather than the newer Component-0-table format.

## Version History
- **Batch 36** (2026-09-13): initial authoring, part 4 of 4 this batch (with `math.calc.one-sided-limits`, `math.calc.limit-laws`, `math.calc.limits-at-infinity`). Blueprint reused by reference; 3 misconceptions independently classified (MC-1 Type 6, MC-2 Type 1, MC-3 Type 1) since this Blueprint (an older document format) lacks an explicit birth-type column. Cross-links to `math.real.continuity-rigorous`/`math.top.continuity-top` confirmed genuinely unauthored — independence mode.
