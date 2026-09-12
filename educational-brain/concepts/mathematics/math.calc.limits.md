# math.calc.limits

## Identity
- **KG ID**: `math.calc.limits`
- **Domain**: math.calc (Calculus)
- **Requires**: `math.func.real-valued-function`, `math.found.real-numbers`
- **Unlocks**: `math.calc.continuity`, `math.calc.derivative-definition` (per the Blueprint; not listed in the live KG's own `unlocks` field, treated as forward-pointing guidance rather than a KG fact)
- **Cross-links**: none listed in the KG
- **Difficulty**: advanced
- **Bloom level**: analyze
- **Mastery threshold**: 0.80 (MAMR 4/5)
- **Estimated hours**: 15
- **CPA stage**: Pictorial entry (numerical tables of $f(x)$ approaching a target value from both sides, and graphs showing holes/jumps/asymptotes, before the formal $\varepsilon$-$\delta$ statement)

## Learning Objective
By the end of this concept, the learner can:
1. Explain, informally, that $\lim_{x\to a}f(x)=L$ means $f(x)$ can be made arbitrarily close to $L$ by taking $x$ sufficiently close (but not equal) to $a$ — and that this says nothing about $f(a)$ itself.
2. Distinguish a limit from a function value: $f(a)$ can be undefined, different from $L$, or equal to $L$, and the limit process is entirely indifferent to which case holds.
3. Compute one-sided limits ($\lim_{x\to a^-}f(x)$ and $\lim_{x\to a^+}f(x)$) and apply the existence criterion: a two-sided limit exists if and only if both one-sided limits exist and agree.
4. Apply the limit laws (sum, product, quotient, constant-multiple) to compute limits of compound expressions, and recognize when an indeterminate ($0/0$) form signals that algebraic cancellation is required first.
5. Recognize a removable discontinuity as the specific case where a limit exists but disagrees with (or the function lacks) a value at that point.

## Core Understanding
This is `math.calc`'s entry concept — the first idea in the entire domain, and the single conceptual gateway to derivatives, continuity, and everything else built on the calculus sequence. Everything else in this concept follows from getting exactly one distinction right: a limit is a claim about APPROACH, never about ARRIVAL.

**THE LIMIT DESCRIBES WHAT HAPPENS NEAR $a$, NOT AT $a$ — THE VALUE $f(a)$ IS IRRELEVANT TO IT.** For $f(x)=\dfrac{x^2-1}{x-1}$, $f(1)=0/0$ is undefined — yet evaluating nearby, $f(0.9)=1.9$, $f(0.99)=1.99$, $f(1.01)=2.01$, $f(1.1)=2.1$: the values approach $2$ from both sides, regardless of the fact that $f$ has no value at $x=1$ itself. Algebraically, $\dfrac{x^2-1}{x-1}=\dfrac{(x+1)(x-1)}{x-1}=x+1$ for $x\neq1$, and as $x\to1$ (but never equalling $1$), $x+1\to2$ — so $\lim_{x\to1}f(x)=2$, entirely independent of $f(1)$'s undefined status. This is exactly why the formal $\varepsilon$-$\delta$ definition requires $0<|x-a|<\delta$ (strictly excluding $x=a$) rather than $|x-a|<\delta$: the exclusion of $a$ itself is built into the definition, not an afterthought.

**A TWO-SIDED LIMIT EXISTS IF AND ONLY IF BOTH ONE-SIDED LIMITS EXIST AND AGREE.** Approaching $a$ from the left ($x\to a^-$) and from the right ($x\to a^+$) are two genuinely separate computations, and the two-sided limit is only defined when both give the same answer. For $f(x)=|x|/x$: from the right, $x>0$ gives $|x|/x=1$; from the left, $x<0$ gives $|x|/x=-1$. Since $1\neq-1$, the two-sided limit $\lim_{x\to0}f(x)$ does not exist (DNE) — even though each one-sided limit individually exists perfectly well. A function can have a genuine jump discontinuity precisely because its two one-sided limits disagree.

**AN INDETERMINATE FORM LIKE $0/0$ IS A SIGNAL TO CANCEL, NEVER A CLAIM THAT THE LIMIT FAILS TO EXIST.** Substituting $x=a$ directly into $\dfrac{P(x)}{Q(x)}$ and getting $0/0$ tells you that BOTH $P$ and $Q$ share a factor $(x-a)$ — factoring and cancelling that shared factor, then substituting into the simplified expression, reveals the actual limit. The $0/0$ itself carries no information about whether the limit exists; it only signals that direct substitution was the wrong tool for this particular input.

**THE LIMIT LAWS LET YOU BUILD COMPLEX LIMITS FROM SIMPLE PIECES, PROVIDED NO INDETERMINATE FORM ARISES.** $\lim[f\pm g]=\lim f\pm\lim g$, $\lim[f\cdot g]=\lim f\cdot\lim g$, $\lim[f/g]=\lim f/\lim g$ (provided $\lim g\neq0$), and $\lim[c\cdot f]=c\cdot\lim f$ — these laws apply directly whenever the individual limits are already known and no division-by-zero-in-the-limit arises; when a $0/0$ form appears, the laws cannot be applied directly to the original expression, and algebraic simplification (cancellation) must happen FIRST.

## Mental Models
1. **Rung 1 — The journey, not the destination.** Imagine approaching a city on a road but the city gate is closed (whether $f(a)$ is undefined, or different from $L$). You can still observe exactly how close you're getting on the approach — that observation is the limit, entirely independent of whether you actually reach (or could reach) the gate itself.
2. **Rung 2 — A bilateral agreement.** The two-sided limit is a claim that BOTH parties — the approach from the left and the approach from the right — arrive at the identical value. If you've only heard from one party, you haven't established the two-sided limit at all, only a one-sided one.
3. **Rung 3 — $0/0$ is a locked door with a key nearby, not a dead end.** The indeterminate form signals a shared factor waiting to be found and cancelled — the true limit lies just behind that cancellation, not in the $0/0$ symbol itself.

## Why Students Fail
MC-1 and MC-2 share a single root cause: every function a learner has evaluated up to this point has been continuous wherever it's defined, so "the limit equals the function value" has held true in literally every example encountered so far — without ever meeting a removable discontinuity, a hole, or a piecewise-defined function where the limit and the value genuinely diverge, there has been no evidence yet to distinguish "evaluate $f$ at $a$" from "find what $f$ approaches near $a$," and the two ideas remain fused in the learner's mind until a case forces them apart. MC-3 happens because computing a one-sided limit (typically the side that comes most naturally, often the right side by convention or by whichever direction the worked examples emphasize first) is itself the entire visible computation in many early practice problems, and the REQUIREMENT to separately check the other side and compare is an additional step that, absent explicit and repeated reinforcement, is easy to treat as optional rather than mandatory — especially since a learner who has correctly computed one legitimate one-sided limit has done nothing wrong procedurally, only stopped one step early.

## Misconceptions

### MC-1: LIMIT-IS-THE-FUNCTION-VALUE
- **Birth type**: Type 1 — Overgeneralization (independently classified; this Blueprint, from an earlier Curriculum Production Pipeline format distinct from the newer "Component 0 Concept Identity" template used by most Blueprints in this campaign, carries no explicit birth-type column — this classification is this program's own, not adopted from the Blueprint)
- **Description**: The learner equates $\lim_{x\to a}f(x)$ with $f(a)$, believing the limit always equals the function value at $a$.
- **Why this birth type**: Every function encountered up to this point has been continuous wherever defined, so "limit equals value" has held true in every prior example — the learner has not yet met a removable discontinuity or a case where $f(a)$ is undefined, so the pattern has never been contradicted and gets applied as a universal rule.
- **Detection probe**: "For $f(x)=(x^2-1)/(x-1)$, evaluate $f(1)$ and find $\lim_{x\to1}f(x)$." — a learner holding this misconception evaluates $f(1)=0/0$ and reports "the limit is undefined" or "the limit is $0/0$," rather than computing the actual limit of $2$.
- **Repair**: Build the numerical table live: $f(0.9)=1.9$, $f(0.99)=1.99$, $f(1.01)=2.01$, $f(1.1)=2.1$ — the values clearly converge to $2$ despite $f(1)$ being undefined. State explicitly: "the limit process explicitly excludes $x=a$ — we say $x$ APPROACHES $a$, never $x$ EQUALS $a$. The limit is about the behavior of $f$ NEAR $a$, not AT $a$."
- **Verification of death**: Given a function with a removable discontinuity, the learner correctly computes the limit via factoring and cancellation, explicitly stating that the function's undefined (or different) value at the target point does not affect the limit's value.

### MC-2: LIMIT-REQUIRES-f(a)-DEFINED
- **Birth type**: Type 1 — Overgeneralization (independently classified, same reason as MC-1: no Blueprint birth-type column; this Blueprint's own text states MC-2 shares "the same root" as MC-1)
- **Description**: The learner believes a limit can exist only if $f$ is defined at $x=a$, concluding "no limit" whenever $f(a)$ is undefined.
- **Why this birth type**: This is the identical overgeneralization as MC-1, expressed as a stronger, more definitive-sounding conclusion ("no limit exists," rather than merely misreporting its value) — both stem from having only encountered continuous functions where evaluation and limit-taking coincide.
- **Detection probe**: "Does $\lim_{x\to2}(x^2-4)/(x-2)$ exist?" — a learner holding this misconception says "no limit exists, because $f(2)$ is undefined."
- **Repair**: Factor and cancel: $(x^2-4)/(x-2)=(x+2)(x-2)/(x-2)=x+2$ for $x\neq2$. As $x\to2$, this simplified expression clearly approaches $4$ — the limit genuinely exists and equals $4$, entirely independently of $f(2)$'s undefined status.
- **Verification of death**: Given a function undefined at the target point, the learner does NOT default to "no limit exists" and instead attempts algebraic simplification (factoring, cancellation) to determine whether a genuine limit exists despite the undefined value.

### MC-3: ONE-SIDED-EQUALS-TWO-SIDED
- **Birth type**: Type 5 — Instruction-induced (independently classified, same reason as MC-1: no Blueprint birth-type column)
- **Description**: The learner computes only the right-hand (or left-hand) limit and reports it as the full two-sided limit, without checking the other side.
- **Why this birth type**: Computing a one-sided limit is itself a complete, correct computation in isolation, and checking the OTHER side is a separate, additional step that many early practice problems don't force — a learner who computes one legitimate one-sided limit hasn't made an error in that computation, only stopped one required step short of the full existence check.
- **Detection probe**: "For $f(x)=|x|/x$, what is $\lim_{x\to0}f(x)$?" — a learner holding this misconception computes only the right-hand limit ($=1$) and reports it as the two-sided answer, missing that the left-hand limit is $-1$.
- **Repair**: Compute both sides explicitly side by side: right ($x>0$): $|x|/x=1$; left ($x<0$): $|x|/x=-1$. State the existence criterion plainly: "the two-sided limit exists ONLY if both one-sided limits agree. Here, $1\neq-1$, so the two-sided limit does not exist (DNE) — even though each individual side has a perfectly well-defined limit."
- **Verification of death**: Given any function with a potential jump, the learner computes BOTH one-sided limits before making any claim about the two-sided limit's existence, treating the comparison step as mandatory rather than optional.

## Analogies
1. **The city with a closed gate (Rung 1)**: how close you get to a city (the limit) is a fact about your journey, independent of whether the city gate happens to be open, closed, or leads somewhere unexpected (the function's actual value, or lack of one, at the destination).
2. **A bilateral treaty, not a unilateral declaration (Rung 2, for MC-3)**: a two-sided limit is a claim that two independent parties (left approach, right approach) reached the SAME agreement — one party's report alone settles nothing about whether the treaty holds.
3. **A locked door with the key one step away (Rung 3, for MC-1/MC-2)**: an indeterminate $0/0$ form isn't a dead end — it's a signal that a shared factor (the "key") is waiting to be found and cancelled, revealing the actual limit just behind the door that direct substitution couldn't open.

## Demonstrations
1. **D1 — The convergence table with a hole.** Build the numerical table for $f(x)=(x^2-1)/(x-1)$ approaching $x=1$ from both sides, watching convergence to $2$ despite $f(1)$ being undefined — directly confronting MC-1 and MC-2 with concrete numerical evidence before any algebra.
2. **D2 — The disagreeing sides.** Compute $|x|/x$'s one-sided limits at $x=0$ explicitly, side by side, showing $1\neq-1$ and concluding DNE — directly confronting MC-3.
3. **D3 — The cancellation reveal.** Present $(x^2-9)/(x-3)$, substitute directly to get $0/0$, then factor and cancel live to reveal the genuine limit of $6$ — reinforcing that $0/0$ signals a required algebraic step, not a failure.

## Discovery Questions
1. "A function is undefined at $x=1$. Does that automatically mean it has no limit there? What would you need to check to find out?"
2. "You compute the limit from the right side of a point and get $1$. Is that automatically the two-sided limit? What else would you need to check?"
3. "Substituting $x=a$ directly into a fraction gives $0/0$. Does that mean the limit doesn't exist, or does it mean something else?"

## Teaching Sequence
Entry stage: Pictorial (numerical tables of approach from both sides, and graphs showing holes/jumps/asymptotes, before the formal $\varepsilon$-$\delta$ statement — CPA entry level P, appropriate for this concept's advanced difficulty).
1. The convergence table with a hole (D1) — establishing "approach, not arrival" as the foundational idea, pre-empting MC-1 and MC-2 with direct numerical evidence.
2. One-sided limits and the existence criterion (D2) — directly confronting MC-3 with a genuine jump-discontinuity example.
3. Limit laws and algebraic computation (the cancellation reveal, D3) — pattern induction across sum/product/quotient/constant-multiple laws, always cancelling BEFORE applying the quotient law when a $0/0$ form appears.
4. Transfer probe (P76, independence mode): a piecewise-defined function where $f(a)$ is explicitly assigned a value different from the limit, requiring the learner to compute both, state they differ, and name the removable-discontinuity classification.

## Tutor Actions
1. Whenever a learner is asked to find a limit at a point where $f$ is undefined, ask them first whether "undefined at $a$" automatically means "no limit" — surface MC-1/MC-2 as an explicit question before any computation begins.
2. Whenever a one-sided limit is computed, always ask for the OTHER side before accepting any claim about the two-sided limit's value or existence — never let a single-sided computation stand alone as a final answer.
3. When a learner substitutes and gets $0/0$, ask what that result actually signals (a shared factor to find, not a failure) before allowing "undefined" or "DNE" as a conclusion.

## Voice Teaching Notes
- **Register**: advanced/analyze — this is the entry concept of an entirely new domain (calculus), and the learner should be treated as someone bringing genuine algebraic fluency (factoring, function evaluation) into a conceptually new territory (reasoning about approach rather than arrival) for the first time.
- **Load-bearing sentence**: "A limit asks what $f$ does NEAR $a$ — never what $f$ does AT $a$. Those can be the same, or they can be completely different; the limit doesn't care which."
- **Wait time note**: after presenting a function undefined at the target point, allow enough silence for the learner to attempt (unprompted) an algebraic simplification (factoring) rather than immediately declaring "undefined" — this is the single most diagnostic moment for catching MC-1/MC-2 before they harden.

## Assessment Signals
1. Correctly computes a limit via factoring and cancellation for an indeterminate $0/0$ form.
2. Correctly determines whether a two-sided limit exists by computing and comparing BOTH one-sided limits.
3. Correctly states, when asked, that $\lim_{x\to a}f(x)$ and $f(a)$ are independent facts that may or may not agree.
4. Correctly applies the sum/product/quotient/constant-multiple limit laws to compute a compound limit, cancelling first when an indeterminate form would otherwise arise.
5. **P76 Transfer Probe** (independence mode): given a piecewise function where $f(a)$ is explicitly defined differently from $\lim_{x\to a}f(x)$, correctly computes both, states they differ, and names the removable-discontinuity classification.

## Tutor Recovery Strategy
If a learner has just been corrected on MC-1/MC-2 (limit vs. value) but still hesitates when both the limit and the value happen to genuinely AGREE (the continuous case), clarify that agreement is the SPECIAL case, not a sign the distinction doesn't matter — the two facts are still independently checked, they simply happen to coincide for continuous functions. If a learner correctly checks both one-sided limits (MC-3 resolved) but then cannot conclude what to do when they disagree, state plainly: disagreement means the two-sided limit does not exist (DNE) — this is itself a complete, valid answer, not a sign of an error in the computation.

## Memory Hooks
1. "Approach, not arrival — the limit is about the journey, never the destination."
2. "Both sides must agree — one side's report alone never settles a two-sided limit."
3. "$0/0$ means cancel, not give up — the real limit is one factoring step away."

## Transfer Connections
- `math.func.real-valued-function` — this concept's own prerequisite; the function-evaluation fluency (domain, range, substitution) that this concept immediately extends into reasoning about approach rather than evaluation.
- `math.found.real-numbers` — this concept's own prerequisite; the real-number-line distance intuition ($|x-a|$) underlying both the informal "arbitrarily close" language and the formal $\varepsilon$-$\delta$ definition this concept introduces at orientation level.
- `math.calc.continuity` — the Blueprint's own stated forward connection: a function is continuous at $a$ exactly when $\lim_{x\to a}f(x)=f(a)$ — the precise resolution of the limit-versus-value distinction this concept establishes, for the special case where they DO agree.

## Cross-Subject Connections
- Physics: instantaneous velocity and other rate-of-change quantities are fundamentally defined as limits (of average rates over shrinking intervals) — the "approach, not arrival" intuition this concept establishes is the direct conceptual foundation for the derivative, which physics uses immediately once introduced.
- Engineering/computer science: numerical methods that approximate a quantity by taking finer and finer steps (e.g. iterative refinement, convergence of an algorithm) directly embody the "arbitrarily close by taking $x$ sufficiently close" intuition this concept formalizes.

## Blueprint References
- `docs/curriculum/blueprints/math.calc.limits.md` — fully reused by reference. This Blueprint uses an earlier Curriculum Production Pipeline format (Teaching Actions TA-A01/TA-B01, primitives P11/P49/P91, etc.) distinct from the newer "Component 0 — Concept Identity" table format used by most Blueprints in this campaign, and its Misconception Registry carries no explicit birth-type column — the THIRD such gap found in this campaign (after `math.func.polynomial-function` and `math.func.rational-function`). All 3 misconceptions in this entry are therefore **independently classified** by this program (MC-1 Type 1, MC-2 Type 1, MC-3 Type 5), not adopted from the Blueprint — stated here explicitly and honestly, per this program's standing discipline for concepts lacking a pre-assigned birth type.
- No cross-link listed in the KG for this concept; none to verify.

## Runtime Asset References
No AssetIdentity rows exist for this concept yet — Layer 3/7 (DB-backed Explanation/Probe assets) is populated separately by production LLM-generation-plus-admin-review or deliberate seed-script batches, per this program's own layer-ownership mapping. This Educational Brain entry is the Layer 2 authored source those future runtime assets will draw from.

## Curriculum Feedback
The Blueprint's own Component 7 states `unlocks: [math.calc.continuity, math.calc.derivative-definition]`, but the live KG's own `unlocks` field for this concept is empty (this entry's own Identity section states "not listed in the live KG's own `unlocks` field" accordingly, per this program's standing rule of following the KG on any divergence) — a genuine Blueprint/KG metadata discrepancy, recorded not fixed. Separately: this Blueprint uses an older document format than most Blueprints read so far in this campaign (Teaching Action / primitive-code structure rather than the newer Component-0-table format), and lacks the explicit birth-type column present in most (but not all — this is the third exception) other Blueprints in this campaign — worth flagging to the Curriculum Production Pipeline as a possible format-version artifact rather than a content gap.

## Version History
- **Batch 35** (2026-09-13): initial authoring, part 3 of 3 this batch (with `math.func.horizontal-asymptote`, `math.func.vertical-asymptote`, which closed `math.func` to DOMAIN CERTIFICATION) — the first concept in `math.calc` (Calculus), the largest unstarted mathematics domain (76 concepts), selected as the highest-leverage next step after certification (verified programmatically: authoring this single entry-node concept unblocks 7 further `math.calc` concepts at once — `derivative-intro`, `limits-at-infinity`, `riemann-sums`, `one-sided-limits`, `parametric-curves`, `continuity`, `limit-laws`). Blueprint reused by reference; 3 misconceptions independently classified (MC-1 Type 1, MC-2 Type 1, MC-3 Type 5) since this Blueprint (an older document format) lacks an explicit birth-type column.
