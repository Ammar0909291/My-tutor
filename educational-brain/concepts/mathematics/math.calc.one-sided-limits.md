# math.calc.one-sided-limits

## Identity
- **KG ID**: `math.calc.one-sided-limits`
- **Domain**: math.calc (Calculus)
- **Requires**: `math.calc.limits`
- **Unlocks**: `math.calc.continuity`
- **Cross-links**: none listed in the KG
- **Difficulty**: advanced
- **Bloom level**: apply
- **Mastery threshold**: 0.80 (MAMR 4/5)
- **Estimated hours**: 4
- **CPA stage**: Pictorial (graph-approach-from-one-side visuals before the formal statement — `math.calc.limits` already did the deepest concrete/intuitive grounding)

## Learning Objective
By the end of this concept, the learner can:
1. Evaluate the right-hand limit $\lim_{x\to a^+}f(x)$ and left-hand limit $\lim_{x\to a^-}f(x)$ from a graph or piecewise formula, correctly restricting attention to values of $x$ approaching $a$ from only one side.
2. Apply the equivalence theorem — the two-sided limit exists and equals $L$ if and only if both one-sided limits exist and both equal $L$ — to determine two-sided limit existence, especially for piecewise-defined functions.
3. Identify functions/points where the two-sided limit fails to exist specifically because the one-sided limits disagree (a jump discontinuity), distinguishing this from other reasons a limit might fail to exist.

## Core Understanding
`math.calc.limits` established the general, two-sided notion of a limit. This concept refines that idea by direction — restricting the approach to only one side — and delivers the precise existence test that decides when the general two-sided limit is even legitimate to speak of.

**A ONE-SIDED LIMIT RESTRICTS THE APPROACH TO VALUES STRICTLY ON ONE SIDE OF $a$.** $\lim_{x\to a^+}f(x)=L$ means $f(x)$ gets arbitrarily close to $L$ as $x$ approaches $a$ ONLY through values greater than $a$ — approaching from the right. $\lim_{x\to a^-}f(x)=M$ is the mirror notion, approaching only through values less than $a$. For a piecewise-defined function, computing a one-sided limit at a boundary point $a$ means plugging $a$ into whichever PIECE actually governs that side of $a$ — never the piece that happens to contain $a$ itself in its domain condition, if that differs from the approaching side.

**THE EQUIVALENCE THEOREM: THE TWO-SIDED LIMIT EXISTS IF AND ONLY IF BOTH ONE-SIDED LIMITS EXIST AND AGREE.** $\lim_{x\to a}f(x)=L\iff\lim_{x\to a^+}f(x)=L\text{ and }\lim_{x\to a^-}f(x)=L$. This gives a complete, practical test: compute both one-sided limits; if they match, that common value IS the two-sided limit; if they disagree (or either fails to exist), the two-sided limit does not exist. Both existence AND agreement are required — neither condition alone is sufficient.

**A JUMP DISCONTINUITY IS PRECISELY THE CASE WHERE BOTH ONE-SIDED LIMITS EXIST INDIVIDUALLY BUT DISAGREE.** A piecewise function whose pieces approach genuinely different heights from the left and right of a breakpoint has a perfectly well-defined left-hand limit and a perfectly well-defined right-hand limit — neither one-sided computation itself is problematic — yet the two-sided limit still fails to exist, precisely because agreement, not mere existence, is the requirement. This is a specific, nameable failure mode (disagreement, not non-existence) distinct from other ways a limit can fail.

## Mental Models
1. **Rung 1 — Approach direction is a filter on which values of $x$ count.** A one-sided limit throws away half the approach entirely — only values on the specified side are ever considered, regardless of what happens on the other side.
2. **Rung 2 — A bilateral agreement, restated.** Building directly on `math.calc.limits`'s own "bilateral agreement" model: the two-sided limit is a claim that BOTH one-sided reports independently arrive at the same number — one side's report alone settles nothing.
3. **Rung 3 — Disagreement is a specific diagnosis, not a vague failure.** When a two-sided limit doesn't exist because the one-sided limits disagree, that's a nameable, precise situation (a jump) — different from a limit failing to exist because one side oscillates or blows up.

## Why Students Fail
MC-1 happens because ordinary function evaluation habitually asks "which piece's domain condition CONTAINS this $x$-value" (including the boundary point itself), and this habit transfers, incorrectly, to one-sided limit computation — where the relevant question is instead "which piece governs the SIDE I'm approaching from," a distinction easy to miss when the boundary point's own containing piece happens to differ from the approaching-side piece. MC-2 happens because computing both one-sided limits (a real, substantial piece of work) feels like it should settle the question, and the additional, separate requirement that the two answers must AGREE is easy to treat as automatically satisfied once both individually exist — especially since in the majority of early, well-behaved examples, they do happen to agree, masking the need to check. MC-3 happens because this concept sits directly on top of `math.calc.limits`'s own limit-versus-value confusion (already documented there as MC-1/MC-2), and the one-sided framing gives the identical confusion a fresh surface to recur on: a learner who has not fully internalized "the limit describes approach, never arrival" will re-apply the old habit of reading off the function's actual plotted value rather than the height the curve is heading toward.

## Misconceptions

### MC-1: WRONG-PIECE-SELECTED
- **Birth type**: Type 4 — Notation-induced (independently classified; this Blueprint's Misconception Registry table does not carry an explicit birth-type column — this classification is this program's own, not adopted from the Blueprint)
- **Description**: The learner evaluates a one-sided limit using the piecewise-formula branch that includes the point $a$ itself, rather than the branch valid strictly on the approaching side.
- **Why this birth type**: The superscript notation ($x\to a^-$ versus $x\to a^+$) that specifies the approach DIRECTION is easy to overlook in favor of the more familiar habit of selecting a piece by which domain condition literally contains $a$ — a notational subtlety (the small superscript sign) gets lost against a more deeply practiced procedural default.
- **Detection probe**: For $f(x)=\begin{cases}x+1 & x<2\\x^2-1 & x\geq2\end{cases}$, "find $\lim_{x\to2^-}f(x)$." — a learner holding this misconception uses the $x\geq2$ piece (which contains $x=2$ itself) rather than the $x<2$ piece (which governs the left-approaching side).
- **Repair**: Trace a finger along the graph approaching $x=2$ strictly from the left, asking "which formula draws THIS part of the curve?" — the $x<2$ piece, giving $2+1=3$. Contrast explicitly against evaluating $f(2)$ itself (using the $x\geq2$ piece, giving $4-1=3$ — coincidentally equal here, but for a different reason and by a different rule).
- **Verification of death**: Given a piecewise function, the learner correctly identifies which piece governs a one-sided limit by the approaching DIRECTION, explicitly distinguishing this from which piece contains the boundary point in its own domain condition.

### MC-2: ONE-SIDED-EXISTENCE-IMPLIES-TWO-SIDED
- **Birth type**: Type 1 — Overgeneralization (independently classified, same reason as MC-1: no Blueprint birth-type column)
- **Description**: The learner believes the two-sided limit exists merely because both one-sided limits individually exist, without checking that they agree.
- **Why this birth type**: Computing both one-sided limits is real, substantial work that feels complete once finished, and the additional agreement check is a separate condition that many early, well-behaved examples happen to satisfy automatically — masking the fact that it must be explicitly verified, not assumed.
- **Detection probe**: For $g(x)=\begin{cases}2x & x<1\\x+4 & x\geq1\end{cases}$, "does $\lim_{x\to1}g(x)$ exist?" — a learner holding this misconception computes both one-sided limits ($2$ and $5$) and concludes the two-sided limit exists (perhaps averaging them, or picking one), rather than recognizing the disagreement means it does NOT exist.
- **Repair**: State the equivalence theorem's precise wording aloud: "exists AND agree" — both conditions, not either alone. Since $2\neq5$ here, the two-sided limit does not exist, full stop — this is itself the complete, correct answer, not a sign that more computation is needed.
- **Verification of death**: Given any pair of one-sided limits, the learner explicitly compares them for equality before making any claim about the two-sided limit, treating disagreement as a definitive "does not exist" conclusion rather than an incomplete result.

### MC-3: FUNCTION-VALUE-CONFUSED-WITH-LIMIT
- **Birth type**: Type 1 — Overgeneralization (independently classified, same reason as MC-1: no Blueprint birth-type column; directly cross-referenced to `math.calc.limits`'s own MC-1/MC-2, the identical confusion recurring in this concept's one-sided framing)
- **Description**: The learner believes the limit at $a$ must equal $f(a)$ (the actual function value), rather than recognizing the limit depends only on nearby behavior, independent of the value (or absence of a value) at $a$ itself.
- **Why this birth type**: This is the same overgeneralization already documented in `math.calc.limits`'s MC-1/MC-2 — every function encountered where limit and value coincide reinforces "they're the same thing" until a case forces them apart — recurring here because the one-sided framing offers a fresh surface for the identical confusion.
- **Detection probe**: Given a graph with an open circle at height $5$ approaching $x=3$ from both sides, but a filled dot at height $7$ plotted exactly at $x=3$: "what is $\lim_{x\to3}f(x)$?" — a learner holding this misconception answers $7$ (the plotted value) rather than $5$ (the approach height).
- **Repair**: Point explicitly at the open circle (the height the curve is heading toward) versus the filled dot (where the function is separately defined to sit) — state plainly: "the limit describes where the function is HEADING, completely independent of whether it arrives there, or where it's separately defined to sit."
- **Verification of death**: Given a graph or formula where the limit and the function's actual value differ, the learner correctly reports the limit as the approach height, not the plotted/defined value at the point.

## Analogies
1. **Reading only half the road (Rung 1, for MC-1)**: a one-sided limit is like reading only the left half of a road map — you never look at what the right half says, no matter how it's drawn; the direction you've chosen fully determines which half you consult.
2. **Two witnesses, not one (Rung 2, for MC-2)**: the two-sided limit needs testimony from BOTH witnesses (left approach, right approach) to agree — a single witness's report, however clear, never settles a two-party question.
3. **The signpost versus the parked car (for MC-3)**: the limit is like a signpost pointing toward a destination (where the curve is heading) — the function's actual defined value at that exact point is like a car that might be parked somewhere completely different; reading the signpost's direction is not the same as reading where the car happens to sit.

## Demonstrations
1. **D1 — Tracing one side only.** On a piecewise graph with a visible jump, trace a finger approaching the breakpoint strictly from the left, then strictly from the right, narrating that each trace only "sees" its own side — directly confronting MC-1.
2. **D2 — Agreement versus disagreement, side by side.** Compute both one-sided limits for two contrasting piecewise functions — one where they agree (two-sided limit exists) and one where they don't (DNE) — stating the equivalence theorem's exact wording each time.
3. **D3 — The open circle versus the filled dot.** Present a graph with an open circle (the approach height) and a separately plotted filled dot (the defined value) at the same $x$, asking for the limit and then the function value as two separate questions — directly confronting MC-3.

## Discovery Questions
1. "A piecewise function's boundary point $a$ falls under one specific piece by the formula's own rule. Does that piece also tell you the LEFT-hand limit, or could a different piece be needed?"
2. "You've computed the left-hand limit and the right-hand limit, and they're different numbers. Does the two-sided limit exist? What does that tell you about the graph at that point?"
3. "A graph has an open circle at one height and a separately plotted dot at a different height, both at the same $x$-value. Which one is the limit?"

## Teaching Sequence
Entry stage: Pictorial (graph-approach-from-one-side visuals before formal notation — `math.calc.limits` already established the deepest concrete grounding of what a limit means).
1. Tracing one side only (D1), shifting to the formal $x\to a^-$/$x\to a^+$ notation and the piecewise-formula-piece-selection rule — directly pre-empting MC-1.
2. Agreement versus disagreement, side by side (D2) — the equivalence theorem stated and applied to both a matching and a disagreeing case, pre-empting MC-2.
3. The open circle versus the filled dot (D3) — directly confronting MC-3, cross-referencing `math.calc.limits`'s own limit-versus-value distinction.
4. Transfer probe (P76, independence mode): a shipping cost function with a weight threshold, using one-sided limits to determine whether the per-unit rate structure jumps at the threshold.

## Tutor Actions
1. Whenever a learner computes a one-sided limit for a piecewise function, ask them to state explicitly WHICH piece they used and WHY (by approach direction, never by which piece contains $a$) — catch MC-1 at the selection step, before any arithmetic.
2. After both one-sided limits are computed, always ask "do they agree?" as an explicit, separate question before accepting any claim about the two-sided limit — never let existence of both sides alone stand as a complete answer, catching MC-2.
3. When presenting any limit question (one-sided or two-sided), ask the learner to state whether they're being asked about the approach (the limit) or the actual defined value ($f(a)$) before they answer — catch MC-3 at the question-reading step.

## Voice Teaching Notes
- **Register**: advanced/apply — the learner is refining an already-mastered general concept (the limit) by direction; language should treat this as a narrow, precise extension rather than wholly new territory.
- **Load-bearing sentence**: "One-sided limits ask about only one direction of approach. The two-sided limit exists only when BOTH directions agree — not when either one, alone, happens to exist."
- **Wait time note**: after presenting a piecewise function's boundary point, allow enough silence for the learner to attempt identifying the correct piece for a one-sided limit unprompted, resisting the urge to name the direction for them — this is the single most diagnostic moment for MC-1.

## Assessment Signals
1. Correctly computes a one-sided limit from a piecewise formula, selecting the piece governing the approaching side rather than the piece containing the boundary point.
2. Correctly applies the equivalence theorem to determine whether a two-sided limit exists, explicitly checking both existence and agreement of the one-sided limits.
3. Correctly identifies a jump discontinuity as the specific case where both one-sided limits exist but disagree.
4. Correctly distinguishes the limit (approach height) from the function's actual defined value at a point, when a graph presents both.
5. **P76 Transfer Probe** (independence mode): given a shipping cost function with a weight threshold, computes both one-sided limits explicitly and determines whether the rate structure has a genuine jump at the threshold.

## Tutor Recovery Strategy
If a learner has just resolved MC-1 (correctly selecting the approaching-side piece) but then hesitates on which piece to use for the FUNCTION VALUE $f(a)$ itself, clarify these are two separate questions with potentially two different rules: the function value uses whichever piece's domain condition literally contains $a$; the one-sided limits use whichever piece governs each approaching side — these can coincide or differ, and both must be checked independently. If a learner correctly identifies a jump discontinuity (MC-2 resolved) but then tries to "average" or "pick" a single value for the nonexistent two-sided limit, state plainly that "does not exist" is itself the complete, correct final answer — no further number is needed or appropriate.

## Memory Hooks
1. "The direction of approach picks the piece — never the piece that happens to contain the point itself."
2. "Both sides must agree, not just both exist — disagreement means DNE, full stop."
3. "The open circle is where it's heading; the filled dot is where it's parked — read the right one for a limit question."

## Transfer Connections
- `math.calc.limits` — this concept's own prerequisite; its general two-sided limit definition and its own limit-versus-value distinction (MC-1/MC-2) are directly refined and reused here in the one-sided framing.
- `math.calc.continuity` — the Blueprint's own stated forward connection: continuity at a point is defined using exactly this one-sided-limit machinery ($\lim_{x\to a^-}f(x)=\lim_{x\to a^+}f(x)=f(a)$), the precise mechanism this concept builds directly toward.
- `math.func.piecewise-function` — this concept's own piece-selection procedure directly reuses that concept's own boundary-ownership and domain-partition discipline, now applied specifically to one-sided limit computation rather than ordinary evaluation.

## Cross-Subject Connections
- Economics/commerce: tiered pricing structures (like the P76 transfer probe's shipping cost example) are the direct real-world instance of a piecewise rate function, where a jump discontinuity in the RATE (not necessarily the total cost) has genuine consequences for customers crossing a threshold.
- Physics/engineering: a system whose governing equation changes at a threshold (e.g. a circuit component switching behavior at a voltage threshold) requires exactly this one-sided-limit analysis to determine whether the transition is smooth (continuous) or produces a genuine jump in behavior.

## Blueprint References
- `docs/curriculum/blueprints/math.calc.one-sided-limits.md` — fully reused by reference. This Blueprint's Misconception Registry table does NOT include an explicit birth-type column (matching `math.calc.limits`'s own Blueprint, an older document format, from the immediately preceding batch). All 3 misconceptions in this entry are therefore **independently classified** by this program (MC-1 Type 4, MC-2 Type 1, MC-3 Type 1), not adopted from the Blueprint — stated here explicitly and honestly, per this program's standing discipline for concepts lacking a pre-assigned birth type.
- No cross-link listed in the KG for this concept; none to verify.

## Runtime Asset References
No AssetIdentity rows exist for this concept yet — Layer 3/7 (DB-backed Explanation/Probe assets) is populated separately by production LLM-generation-plus-admin-review or deliberate seed-script batches, per this program's own layer-ownership mapping. This Educational Brain entry is the Layer 2 authored source those future runtime assets will draw from.

## Curriculum Feedback
No genuine Blueprint/KG metadata discrepancy found — requires, unlocks, cross_links, difficulty, bloom, mastery_threshold, and estimated_hours all match the live KG exactly. The recurring missing-birth-type-column finding continues, now affecting the fourth Blueprint in this campaign (`polynomial-function`, `rational-function`, `math.calc.limits`, and this entry).

## Version History
- **Batch 36** (2026-09-13): initial authoring, part 1 of 4 this batch (with `math.calc.limit-laws`, `math.calc.limits-at-infinity`, `math.calc.continuity`), continuing `math.calc` as a standalone domain campaign. Blueprint reused by reference; 3 misconceptions independently classified (MC-1 Type 4, MC-2 Type 1, MC-3 Type 1) since this Blueprint lacks an explicit birth-type column.
