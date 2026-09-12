# math.calc.continuity-types

## Identity
- **KG ID**: `math.calc.continuity-types`
- **Domain**: math.calc (Calculus)
- **Requires**: `math.calc.continuity`, `math.calc.one-sided-limits`
- **Unlocks**: none listed in the KG
- **Cross-links**: none listed in the KG
- **Difficulty**: advanced
- **Bloom level**: analyze
- **Mastery threshold**: 0.75 (MAMR 4/5)
- **Estimated hours**: 4
- **CPA stage**: Pictorial (graphs of each discontinuity type before classification)

## Learning Objective
By the end of this concept, the learner can:
1. Classify a REMOVABLE discontinuity (a "hole") — where $\lim_{x\to a}f(x)$ EXISTS (both one-sided limits agree) but either $f(a)$ is undefined or $f(a)\neq\lim_{x\to a}f(x)$.
2. Classify a JUMP discontinuity — where the left and right one-sided limits BOTH exist but are DIFFERENT from each other, so no overall two-sided limit exists.
3. Classify an INFINITE discontinuity — where at least one one-sided limit is $\pm\infty$ (a vertical asymptote), distinguishing this from a jump discontinuity where both one-sided limits are FINITE but merely unequal.

## Core Understanding
`math.calc.continuity` already established that a discontinuity is a failure of one or more of the three continuity conditions. This concept develops the precise classification scheme: EXACTLY three types exist, and each is distinguished by systematically examining the one-sided limits `math.calc.one-sided-limits` already taught how to compute.

**A REMOVABLE DISCONTINUITY OCCURS WHEN THE TWO-SIDED LIMIT EXISTS BUT $f(a)$ FAILS TO MATCH IT.** Both one-sided limits agree on a common finite value $L$ (so the two-sided limit genuinely exists), but $f(a)$ is either undefined or disagrees with $L$. This is called "removable" precisely because redefining $f(a)=L$ would fix the discontinuity entirely — a single-point patch is sufficient, since the "correct" value is already known from the limit.

**A JUMP DISCONTINUITY OCCURS WHEN BOTH ONE-SIDED LIMITS ARE FINITE BUT DISAGREE.** Neither one-sided limit itself is problematic — each is a perfectly well-defined finite number — but they disagree with each other, so the two-sided limit does not exist by `math.calc.one-sided-limits`'s own equivalence theorem. Unlike a removable discontinuity, NO single-point redefinition can fix a jump: there is no one value $f(a)$ could take that would simultaneously match both disagreeing one-sided limits.

**AN INFINITE DISCONTINUITY OCCURS WHEN AT LEAST ONE ONE-SIDED LIMIT IS ITSELF UNBOUNDED.** This is fundamentally different from a jump: a jump has both one-sided limits FINITE (merely unequal); an infinite discontinuity has at least one side growing without bound ($\pm\infty$), producing a vertical asymptote. The distinguishing question is never "do the two sides differ" (true for both jump and infinite cases) but specifically "is either side itself unbounded."

**A ZERO DENOMINATOR IN THE ORIGINAL EXPRESSION DOES NOT, BY ITSELF, DETERMINE THE DISCONTINUITY TYPE.** Whether a given denominator-zero point produces a removable or infinite discontinuity depends entirely on whether the corresponding numerator factor CANCELS (removable, since the limit still exists finitely after cancellation) or does not cancel (infinite, since the function genuinely blows up). The type cannot be read off from "there's a zero in the denominator" alone — it requires the full factor-and-classify procedure.

## Mental Models
1. **Rung 1 — Three types, one diagnostic question each.** Removable: does the two-sided limit exist but disagree with (or lack) a value? Jump: do both one-sided limits exist but disagree with each other? Infinite: is at least one one-sided limit itself unbounded? Each type has its own precise, checkable signature.
2. **Rung 2 — "Fixable by one point" is the removable discontinuity's defining feature.** Only removable discontinuities can be patched by redefining a single value — this practical consequence is a direct test of which type is present.
3. **Rung 3 — A denominator zero is a starting question, never a final answer.** Reaching a zero-denominator point always requires the SAME follow-up: does the numerator cancel (removable) or not (infinite)? The zero alone never decides.

## Why Students Fail
MC-1 happens because the ORIGINAL expression's zero denominator is a highly salient, immediately visible signal — and "denominator equals zero" gets pattern-matched directly to "infinite discontinuity" without performing the required factor-and-cancel check that would reveal whether the discontinuity is actually removable instead; the visible surface feature (a zero denominator) is treated as sufficient evidence on its own, skipping the verification step that determines the actual outcome. MC-2 happens because $f(a)$ being DEFINED feels like it should settle the classification question in favor of "removable" (since removability is intuitively linked to "the function has SOME value there"), when the actual determining test is whether the two ONE-SIDED LIMITS agree — a genuinely different, more precise condition that gets substituted with the more immediately checkable, but incorrect, "is $f(a)$ defined" question.

## Misconceptions

### MC-1: ZERO-DENOMINATOR-ASSUMED-TO-ALWAYS-MEAN-INFINITE-DISCONTINUITY
- **Birth type**: Type 1 — Overgeneralization (independently classified; this Blueprint's Misconception Registry table does not carry an explicit birth-type column — this classification is this program's own, not adopted from the Blueprint)
- **Description**: The learner assumes any zero-denominator point is automatically an infinite discontinuity, without checking whether the numerator cancels to produce a removable case instead.
- **Why this birth type**: A zero denominator in the original expression is a highly salient, immediately visible signal, and this visible surface feature gets pattern-matched directly to "infinite discontinuity" without performing the required factor-and-cancel verification that would reveal the actual outcome.
- **Detection probe**: "Classify the discontinuity of $f(x)=(x^2-4)/(x-2)$ at $x=2$." — a learner holding this misconception answers "infinite discontinuity, since the denominator is zero at $x=2$," without factoring.
- **Repair**: Factor explicitly: $f(x)=(x-2)(x+2)/(x-2)=x+2$ for $x\neq2$, so $\lim_{x\to2}f(x)=4$ EXISTS finitely, while $f(2)$ is undefined in the original — this is REMOVABLE, not infinite. State plainly: "a zero denominator alone does not automatically mean infinite discontinuity; it depends on whether the numerator ALSO vanishes there in a way that cancels."
- **Verification of death**: Given any zero-denominator point, the learner factors and checks for cancellation FIRST, before classifying the discontinuity type — never concluding "infinite" from the zero denominator alone.

### MC-2: REMOVABILITY-JUDGED-BY-WHETHER-F-OF-A-IS-DEFINED-RATHER-THAN-WHETHER-ONE-SIDED-LIMITS-AGREE
- **Birth type**: Type 1 — Overgeneralization (independently classified, same reason as MC-1: no Blueprint birth-type column)
- **Description**: The learner classifies a discontinuity as removable based on whether $f(a)$ is defined, rather than checking whether the one-sided limits themselves agree.
- **Why this birth type**: $f(a)$ being defined feels intuitively linked to "removability" (the function HAS a value there), substituting a more immediately checkable but incorrect question for the actual determining test — whether the two one-sided limits agree with each other.
- **Detection probe**: For $f(x)=x$ ($x<1$), $f(x)=x+2$ ($x\geq1$), "$f(1)=3$ is defined — is the discontinuity at $x=1$ removable?" — a learner holding this misconception says yes, reasoning from $f(1)$'s definedness alone.
- **Repair**: Compute both one-sided limits explicitly: $\lim_{x\to1^-}f(x)=1$, $\lim_{x\to1^+}f(x)=3$. They DISAGREE ($1\neq3$), so the two-sided limit does not exist — this is a JUMP discontinuity, regardless of $f(1)$ being defined. State plainly: "removability specifically requires the two-sided limit to exist — both one-sided limits AGREEING — which fails here."
- **Verification of death**: Given any discontinuity, the learner computes and compares both one-sided limits FIRST to determine removable-versus-jump status, never using $f(a)$'s definedness alone as the deciding factor.

## Analogies
1. **A locked door versus a missing address (for MC-1)**: a zero denominator is like arriving at an address and finding SOMETHING blocking the door — but you still have to check whether it's a genuinely sealed wall (infinite discontinuity — the numerator doesn't cancel) or just a curtain that pulls back the moment you check (removable — the numerator cancels). The blockage alone doesn't tell you which.
2. **Two witnesses who must agree, not just show up (for MC-2)**: removability requires BOTH one-sided-limit witnesses to independently arrive at the SAME testimony — a function's actual defined value being present at the scene is a completely separate fact from whether the two witnesses agree with each other.

## Demonstrations
1. **D1 — The factor-and-reveal.** Present $(x^2-4)/(x-2)$'s zero-denominator point, factor live to reveal the finite limit, classifying it removable despite the visible zero denominator — directly confronting MC-1.
2. **D2 — Defined but disagreeing.** Present a piecewise function where $f(a)$ IS defined but the two one-sided limits genuinely disagree, classifying it correctly as a JUMP despite the function having a value there — directly confronting MC-2.
3. **D3 — The three-way gallery.** Present one example each of removable, jump, and infinite discontinuity side by side, applying the same diagnostic checklist (do the one-sided limits exist? do they agree? is either unbounded?) to distinguish all three cleanly.

## Discovery Questions
1. "A function's denominator equals zero at a specific point. Does that automatically tell you the discontinuity type, or do you need to check something else first?"
2. "A function is defined at a point — it has a real, actual value there. Does that guarantee the discontinuity (if any) at that point is removable?"
3. "Both a jump discontinuity and an infinite discontinuity involve the one-sided limits disagreeing in some sense. What's the precise difference between them?"

## Teaching Sequence
Entry stage: Pictorial (graphs of each discontinuity type before classification).
1. The factor-and-reveal (D1) — directly confronting MC-1 with a concrete removable-despite-zero-denominator case.
2. Defined but disagreeing (D2) — directly confronting MC-2 with a concrete jump-despite-defined-value case.
3. The three-way gallery (D3) — establishing the complete diagnostic checklist across all three types side by side.
4. Transfer probe (P76, independence mode): contrasting a genuinely unfixable real-world jump (a shipping cost pricing-tier boundary) against a merely apparent, algebraically-removable discontinuity in a related cost-estimation formula.

## Tutor Actions
1. Whenever a zero-denominator point is encountered, require the learner to factor and check for cancellation BEFORE stating a discontinuity type — never accept "infinite" as a conclusion from the zero denominator alone, catching MC-1.
2. Whenever a learner classifies a discontinuity as removable, ask them to state the VALUE of both one-sided limits and confirm they agree — never accept $f(a)$'s definedness alone as sufficient justification, catching MC-2.
3. When presenting a new discontinuity example, ask the learner to work through the diagnostic checklist explicitly (one-sided limits exist? agree? either unbounded?) rather than pattern-matching to a type from surface features alone.

## Voice Teaching Notes
- **Register**: advanced/analyze — the learner combines `math.calc.continuity`'s condition framework with `math.calc.one-sided-limits`'s computational machinery into a genuine three-way discrimination task; language should emphasize the diagnostic procedure over memorized type labels.
- **Load-bearing sentence**: "A zero denominator is a question, not an answer — factor first, then classify. Removable means the limit exists and matches; jump means both sides exist but disagree; infinite means at least one side is unbounded."
- **Wait time note**: after presenting a zero-denominator point, allow enough silence for the learner to attempt factoring unprompted before confirming any classification — this is the single most diagnostic moment for MC-1.

## Assessment Signals
1. Correctly classifies a removable discontinuity by factoring and confirming the two-sided limit exists despite an undefined or mismatched function value.
2. Correctly classifies a jump discontinuity by computing and comparing both one-sided limits, independent of whether $f(a)$ is defined.
3. Correctly classifies an infinite discontinuity by identifying at least one unbounded one-sided limit, distinguishing it from a finite-but-unequal jump case.
4. Correctly states, in one sentence, the key difference between a jump discontinuity and an infinite discontinuity.
5. **P76 Transfer Probe** (independence mode): given a genuine real-world pricing-tier jump and a separate, merely-apparent removable discontinuity in a related formula, correctly classifies both and explains why only one is genuinely "fixable."

## Tutor Recovery Strategy
If a learner has just resolved MC-1 (factoring before classifying) but then over-applies factoring even where it's unnecessary (e.g. a genuinely infinite discontinuity with no cancelling factor), confirm that factoring is a VERIFICATION step, not a guarantee of finding a removable case — sometimes the factoring confirms the discontinuity IS genuinely infinite, and that is itself a correct, complete answer. If a learner correctly distinguishes jump from removable (MC-2 resolved) but then struggles to distinguish jump from infinite, return to the precise question: "is either one-sided limit itself unbounded, or are both simply finite-but-different?" as the deciding diagnostic.

## Memory Hooks
1. "A zero denominator is a question, not an answer — always factor first."
2. "Defined doesn't mean removable — check whether the one-sided limits actually agree."
3. "Jump: both sides finite, just different. Infinite: at least one side runs away."

## Transfer Connections
- `math.calc.continuity` — this concept's own prerequisite; the three-condition failure framework this concept develops into a precise, three-way classification scheme.
- `math.calc.one-sided-limits` — this concept's own prerequisite; the one-sided-limit computation and equivalence-theorem machinery this concept applies directly as its diagnostic procedure.
- `math.func.vertical-asymptote` — already authored; the "infinite discontinuity" this concept names is the exact same phenomenon that concept's own vertical-asymptote classification describes, now framed through the continuity/discontinuity lens rather than the rational-function lens.

## Cross-Subject Connections
- Economics/commerce: the P76 transfer probe's shipping cost pricing-tier boundary is a direct real-world instance of a genuine, unfixable jump discontinuity, contrasted against a purely mathematical, algebraically-removable discontinuity in an internal cost-estimation formula — the practical stakes of "fixable versus not" have direct real consequences.
- Engineering: distinguishing a sensor reading's genuine discontinuity (a jump, signaling a real physical transition) from an artifact of the measurement formula (a removable discontinuity, signaling a computational quirk rather than a real phenomenon) is a direct real-world application of this concept's classification scheme.

## Blueprint References
- `docs/curriculum/blueprints/math.calc.continuity-types.md` — fully reused by reference. This Blueprint's Misconception Registry table does NOT include an explicit birth-type column (the EIGHTH such gap this campaign). Both misconceptions in this entry are therefore **independently classified** by this program (MC-1 Type 1, MC-2 Type 1), not adopted from the Blueprint — stated here explicitly and honestly, per this program's standing discipline for concepts lacking a pre-assigned birth type.
- No cross-link listed in the KG for this concept; none to verify.

## Runtime Asset References
No AssetIdentity rows exist for this concept yet — Layer 3/7 (DB-backed Explanation/Probe assets) is populated separately by production LLM-generation-plus-admin-review or deliberate seed-script batches, per this program's own layer-ownership mapping. This Educational Brain entry is the Layer 2 authored source those future runtime assets will draw from.

## Curriculum Feedback
No genuine Blueprint/KG metadata discrepancy found — requires, unlocks, cross_links, difficulty, bloom, mastery_threshold, and estimated_hours all match the live KG exactly (unlocks and cross_links both empty per the KG, matching the Blueprint's own declaration). This is the eighth Blueprint in this campaign to lack an explicit birth-type column.

## Version History
- **Batch 37** (2026-09-13): initial authoring, part 1 of 4 this batch (with `math.calc.ivt`, `math.calc.derivative-intro`, `math.calc.squeeze-theorem`), continuing `math.calc` as a standalone domain campaign. Blueprint reused by reference; 2 misconceptions independently classified (MC-1 Type 1, MC-2 Type 1) since this Blueprint lacks an explicit birth-type column.
