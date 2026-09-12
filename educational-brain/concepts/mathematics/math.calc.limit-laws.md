# math.calc.limit-laws

## Identity
- **KG ID**: `math.calc.limit-laws`
- **Domain**: math.calc (Calculus)
- **Requires**: `math.calc.limits`
- **Unlocks**: none listed in the KG
- **Cross-links**: none listed in the KG
- **Difficulty**: advanced
- **Bloom level**: apply
- **Mastery threshold**: 0.85 (MAMR 5/5)
- **Estimated hours**: 5
- **CPA stage**: Abstract (the laws are stated and applied symbolically; the concrete/pictorial grounding of what a limit means was already established in `math.calc.limits`)

## Learning Objective
By the end of this concept, the learner can:
1. State and apply the sum/difference law $\lim(f\pm g)=\lim f\pm\lim g$ and the product law $\lim(fg)=(\lim f)(\lim g)$, provided both individual limits exist.
2. Apply the quotient law $\lim(f/g)=(\lim f)/(\lim g)$ ONLY when $\lim g\neq0$ — recognizing that a zero denominator limit invalidates the law entirely, requiring a different technique rather than a different symbolic answer.
3. Apply the power law $\lim(f^n)=(\lim f)^n$, and recognize that combining several limit laws in sequence requires each individual piece's limit to exist first, before combining.

## Core Understanding
The limit laws let a learner compute the limit of a COMBINED expression directly from the limits of its individual pieces — without redoing the full "approach" analysis from scratch every time. This concept's entire difficulty lies not in the laws themselves (each is a natural, almost obvious-sounding statement) but in correctly recognizing WHEN each law's precondition is actually satisfied.

**EACH LAW APPLIES ONLY WHEN THE INDIVIDUAL PIECE LIMITS ALREADY EXIST.** $\lim(f\pm g)=\lim f\pm\lim g$ (sum/difference), $\lim(fg)=(\lim f)(\lim g)$ (product), and $\lim(f^n)=(\lim f)^n$ (power) all let a learner build a complex limit from simpler known pieces — PROVIDED each individual piece's limit is already established to exist. For a compound expression like $\lim(f\cdot g+h)$, the correct procedure confirms $\lim f$, $\lim g$, and $\lim h$ EACH individually exist first, then combines them via the product and sum laws in sequence — skipping this individual verification usually causes no visible problem when the pieces happen to behave well, but the laws themselves are only VALID because that verification holds, a distinction that becomes essential the moment one piece's limit might fail to exist.

**THE QUOTIENT LAW'S CONDITION, $\lim g\neq0$, IS NOT OPTIONAL — WHEN IT FAILS, THE LAW SIMPLY DOES NOT APPLY.** $\lim(f/g)=(\lim f)/(\lim g)$ requires $\lim g\neq0$. When the denominator's limit IS zero, this does not mean the overall limit is automatically undefined, automatically "$0$," or automatically some symbolic infinity produced by treating the law as still valid — it means this PARTICULAR LAW cannot be used, and a genuinely different technique (factoring and cancelling, rationalizing, or a more advanced method) is required to determine what actually happens. The overall limit in that case could be a finite value (if cancellation reveals one), $+\infty$, $-\infty$, or genuinely not exist — the zero-denominator-limit condition tells you only that THIS TOOL has failed, not what the answer is.

**COMBINING SEVERAL LAWS IN SEQUENCE REQUIRES EACH PIECE'S EXISTENCE TO BE VERIFIED BEFORE COMBINING, NOT ASSUMED.** For $\lim[f(x)^2\cdot g(x)]$ with $\lim f=2$ and $\lim g=3$ both given: first apply the power law ($\lim f^2=4$), then the product law ($4\times3=12$). The verification step (confirming each piece's limit exists) is what makes each subsequent law's application legitimate — this becomes the ENTIRE difference between a correct and incorrect approach the moment one piece, like a quotient with a vanishing denominator, cannot simply be assumed to exist.

## Mental Models
1. **Rung 1 — Build up from verified pieces, never assumed ones.** Each law is a construction tool that only works on materials (individual limits) already confirmed solid — using an unconfirmed piece risks the whole structure, even if it looks fine in a given example.
2. **Rung 2 — A precondition failing means "wrong tool," not "no answer."** The quotient law's zero-denominator-limit failure is a statement about the TOOL, not about the underlying question — the actual limit might still exist and be findable by other means.
3. **Rung 3 — Sequential combination is a chain, and every link must independently hold.** Applying laws in sequence (power, then product, then sum) is only as strong as verifying each individual link (piece limit) exists before adding the next one.

## Why Students Fail
MC-1 happens because the quotient law, like the other three laws, is initially learned and practiced as a direct, mechanical substitution formula — and the precondition ($\lim g\neq0$) is a SCOPE restriction on when the formula may be invoked at all, a kind of qualifier that is naturally easy to overlook once the mechanical pattern (divide the two limits) has become the salient, memorable part of the rule; the learner over-generalizes the law's applicability beyond the narrow scope it was actually stated for. MC-2 happens because in the overwhelming majority of practice problems, the individual pieces' limits are simply given as existing (stated directly in the problem), so the explicit verification step ("does this piece's limit actually exist before I combine it with another?") never needs to be performed in practice — until a problem specifically constructs a case where one piece's limit does NOT exist, at which point skipping that verification step (which had never mattered before) produces a genuine error.

## Misconceptions

### MC-1: QUOTIENT-LAW-APPLIED-DESPITE-ZERO-DENOMINATOR-LIMIT
- **Birth type**: Type 1 — Overgeneralization (independently classified; this Blueprint's Misconception Registry table does not carry an explicit birth-type column — this classification is this program's own, not adopted from the Blueprint)
- **Description**: The learner mechanically applies the quotient law even when the denominator's limit is $0$, rather than recognizing the law's precondition has failed and a different technique is needed.
- **Why this birth type**: The quotient law's mechanical pattern (divide the two limits) is the memorable, practiced part of the rule, while its precondition ($\lim g\neq0$) is a scope restriction that is easy to overlook once the mechanical pattern has become salient — the learner extends the law's applicability beyond the narrow scope it was actually stated for.
- **Detection probe**: "Given $\lim_{x\to2}f(x)=6$ and $\lim_{x\to2}g(x)=0$, find $\lim_{x\to2}[f(x)/g(x)]$." — a learner holding this misconception writes "$6/0=$ undefined, so the limit doesn't exist," treating this as though it were a valid application of the quotient law itself.
- **Repair**: State plainly: "the quotient law simply does NOT APPLY here — this doesn't mean the limit doesn't exist, only that this particular law can't answer the question." Show that without more information about the actual functions $f$ and $g$ near $x=2$, the true limit could be $+\infty$, $-\infty$, a finite value (if there's cancellation once the actual formulas are known), or genuinely nonexistent — the zero-denominator-limit condition rules out ONE tool, not the answer itself.
- **Verification of death**: Given a quotient where the denominator's limit is $0$, the learner correctly states that the quotient law cannot be used and that a different technique (examining the actual functions, factoring, etc.) is required, without treating "$6/0$" as a symbolic conclusion in its own right.

### MC-2: LIMIT-LAWS-COMBINED-WITHOUT-VERIFYING-EACH-PIECE-EXISTS-FIRST
- **Birth type**: Type 5 — Instruction-induced (independently classified, same reason as MC-1: no Blueprint birth-type column)
- **Description**: The learner combines several limit laws in sequence without first confirming each individual piece's limit exists.
- **Why this birth type**: In the overwhelming majority of practice problems, individual piece limits are simply given as existing, so the explicit verification step never needs to be performed in practice — the instructional pattern of always supplying pre-verified pieces means the verification habit is never actually exercised until a problem specifically withholds it.
- **Detection probe**: "Given $\lim_{x\to1}f(x)=2$, $\lim_{x\to1}g(x)=3$, find $\lim_{x\to1}[f(x)^2\cdot g(x)]$." followed later by a case where one piece's limit is NOT given as existing — a learner holding this misconception applies the same "combine directly" procedure in both cases, without ever explicitly checking existence in the second.
- **Repair**: Walk the correct procedure explicitly, narrating the verification step out loud each time: "first, confirm $\lim f$ exists (given: $2$). Confirm $\lim g$ exists (given: $3$). NOW apply the power law: $2^2=4$. NOW apply the product law: $4\times3=12$." Contrast against a case where one piece's existence CANNOT be assumed (e.g. a quotient with a vanishing denominator), showing that skipping the verification there would silently produce a wrong or meaningless result.
- **Verification of death**: Given any multi-step limit-law combination, the learner explicitly states each individual piece's limit exists (or verifies it) before applying the next law in the sequence, rather than combining directly from the final expression.

## Analogies
1. **A key that only fits one specific lock (for MC-1)**: the quotient law is a key shaped precisely for locks where the denominator's limit is nonzero — trying to force it into a different lock (a zero-denominator-limit case) doesn't open a different door, it just fails to turn, telling you nothing about what's actually behind that door.
2. **Checking each brick before laying the next (for MC-2)**: building a limit computation from several combined laws is like building a wall — each brick (piece limit) needs to be confirmed solid before the next one is set on top of it; skipping the check usually looks fine until one brick turns out to be missing.

## Demonstrations
1. **D1 — Sum, product, power in sequence.** Work a multi-step limit combining several laws, explicitly narrating "confirm this piece exists... now apply this law..." at every step — establishing the verification-before-combination discipline pre-emptively.
2. **D2 — The quotient law's failure, live.** Present a quotient with a zero-denominator limit, apply the law mechanically to get "$6/0$," then STOP and state explicitly that this is not a valid conclusion — the law has failed to apply, and a different technique (examining the actual functions) is needed instead.

## Discovery Questions
1. "You're given that two individual limits exist. Does that guarantee that combining them with a limit law will work correctly? What might go wrong?"
2. "A quotient's denominator has a limit of exactly $0$. Does that mean the overall limit doesn't exist, or does it mean something else?"
3. "You want to find $\lim[f(x)^2\cdot g(x)]$ using the power law and then the product law. What do you need to check about $f$ and $g$ BEFORE combining them this way?"

## Teaching Sequence
Entry stage: Abstract (the laws are stated and applied symbolically; `math.calc.limits` already grounded the concrete/pictorial meaning of a limit).
1. Sum, product, and power laws combining piece by piece (D1), explicitly narrating the verification-before-combination discipline — pre-empting MC-2.
2. The quotient law's failure, live (D2) — directly confronting MC-1 with a concrete zero-denominator-limit case.
3. Combining multiple laws in a longer sequence, with explicit verification at each step.
4. Transfer probe (P76, independence mode): an engineering signal-power model combining sum and product laws, plus a quotient-law-failure case requiring the learner to explain why more careful analysis (not the law itself) is needed.

## Tutor Actions
1. Whenever a learner applies the quotient law, ask them to first state whether the denominator's limit is nonzero — never let the law's application proceed without this explicit check, catching MC-1 before the arithmetic.
2. Whenever a learner combines multiple limit laws in one computation, ask them to name, out loud, each individual piece's limit before combining — catching MC-2 at the verification step, not after an incorrect combined result.
3. When a quotient law's precondition fails, ask the learner what CAN still be said (a different technique is needed) versus what CANNOT be concluded (the limit is automatically undefined) — make this an explicit checkpoint.

## Voice Teaching Notes
- **Register**: advanced/apply — the learner is applying already-understood limit concepts symbolically; language should emphasize precise conditions and scope of applicability over re-explaining what a limit fundamentally means.
- **Load-bearing sentence**: "Each law works only when its pieces' limits already exist — and the quotient law needs one more thing: a nonzero denominator limit."
- **Wait time note**: after presenting a quotient with a zero-denominator limit, allow enough silence for the learner to attempt applying the law mechanically and reach "$6/0$" before intervening — the moment of confronting that this isn't a valid stopping point is the single most diagnostic point for MC-1.

## Assessment Signals
1. Correctly applies the sum/difference and product laws to combine given individual limits.
2. Correctly recognizes when the quotient law's precondition ($\lim g\neq0$) fails and states that a different technique, not a direct symbolic answer, is required.
3. Correctly applies the power law, and correctly sequences multiple laws (power, then product, then sum) with explicit verification of each piece.
4. Given a multi-step combination, explicitly verifies each individual piece's limit exists before combining, rather than combining directly from the final expression.
5. **P76 Transfer Probe** (independence mode): given an engineering signal-power model combining sum and product laws, correctly computes the combined limit, and separately explains why a quotient-law failure signals a need for more careful analysis rather than an automatic conclusion.

## Tutor Recovery Strategy
If a learner correctly identifies a quotient-law failure (MC-1 resolved) but then cannot determine what the actual limit is, remind them that further analysis (factoring the actual functions, examining their specific behavior near the point) is the correct NEXT step — the law's failure is a signal to switch tools, not a dead end. If a learner has just been corrected on MC-2 (verify each piece first) but then over-applies the verification step even to already-given, explicitly-stated limits, clarify that verification means confirming the limit's EXISTENCE is established (which a given value already does) — the discipline matters specifically when existence is NOT already given.

## Memory Hooks
1. "The quotient law needs one extra thing: a nonzero denominator limit, or it simply doesn't apply."
2. "Confirm each piece exists before combining — never combine straight from the final expression."
3. "A failed law is a wrong-tool signal, never an automatic answer."

## Transfer Connections
- `math.calc.limits` — this concept's own prerequisite; the general limit definition and computation (factoring, cancellation for indeterminate forms) that these laws formalize into reusable algebraic rules.
- `math.calc.one-sided-limits` — a sibling concept sharing this domain's entry-point prerequisite; both concepts refine or extend `math.calc.limits`'s core machinery in complementary directions (direction restriction versus algebraic combination).
- `math.calc.derivative-intro` — the derivative's own definition as a limit of a difference quotient will directly require applying these limit laws (particularly the quotient law's precondition awareness) once that concept is reached.

## Cross-Subject Connections
- Engineering: the P76 transfer probe's signal-power model is a direct instance of combining independently-measured or independently-modeled quantities (via sum and product laws) while recognizing when a ratio-based quantity (like a gain or transfer function) requires more careful analysis near a value where a component's contribution vanishes.
- Physics: combining several independently-limiting physical quantities (e.g. total force as a sum of individual force limits, or total energy as a product of mass and velocity-squared limits) is a direct real-world application of applying limit laws in sequence with verified individual pieces.

## Blueprint References
- `docs/curriculum/blueprints/math.calc.limit-laws.md` — fully reused by reference. This Blueprint's Misconception Registry table does NOT include an explicit birth-type column (matching the pattern already found in `math.calc.limits` and `math.calc.one-sided-limits`, both from this same batch/preceding batch). Both misconceptions in this entry are therefore **independently classified** by this program (MC-1 Type 1, MC-2 Type 5), not adopted from the Blueprint — stated here explicitly and honestly, per this program's standing discipline for concepts lacking a pre-assigned birth type.
- No cross-link listed in the KG for this concept; none to verify.

## Runtime Asset References
No AssetIdentity rows exist for this concept yet — Layer 3/7 (DB-backed Explanation/Probe assets) is populated separately by production LLM-generation-plus-admin-review or deliberate seed-script batches, per this program's own layer-ownership mapping. This Educational Brain entry is the Layer 2 authored source those future runtime assets will draw from.

## Curriculum Feedback
No genuine Blueprint/KG metadata discrepancy found — requires, unlocks, cross_links, difficulty, bloom, mastery_threshold, and estimated_hours all match the live KG exactly (unlocks and cross_links both empty per the KG, matching the Blueprint's own declaration). This is the fifth Blueprint in this campaign to lack an explicit birth-type column.

## Version History
- **Batch 36** (2026-09-13): initial authoring, part 2 of 4 this batch (with `math.calc.one-sided-limits`, `math.calc.limits-at-infinity`, `math.calc.continuity`), continuing `math.calc` as a standalone domain campaign. Blueprint reused by reference; 2 misconceptions independently classified (MC-1 Type 1, MC-2 Type 5) since this Blueprint lacks an explicit birth-type column.
