# math.calc.lhopitals-rule

## Identity
- **KG ID**: `math.calc.lhopitals-rule`
- **Domain**: math.calc (Calculus)
- **Requires**:
  - `math.calc.derivative-definition` — load-bearing part: the rule replaces $\lim\frac{f}{g}$ with $\lim\frac{f'}{g'}$, so the derivatives $f'$ and $g'$ must already be computable.
  - `math.calc.limits` — load-bearing part: the rule applies only when direct substitution into the original limit produces an INDETERMINATE form, which requires already being fluent at evaluating limits and recognizing what "indeterminate" means.
- **Unlocks**: none in the KG.
- **Cross-links**: none in the KG.
- **Difficulty**: advanced
- **Bloom level**: apply
- **Mastery threshold**: 0.80 (MAMR = ⌈0.80×5⌉ = 4/5)
- **Estimated hours**: 5
- **Blueprint**: `docs/curriculum/blueprints/math.calc.lhopitals-rule.md` (reused by reference throughout)

## Learning Objective
- The learner can apply L'Hôpital's rule ($\lim\frac{f}{g}=\lim\frac{f'}{g'}$ when the original limit is indeterminate of the form $\frac00$ or $\frac{\infty}{\infty}$) and can VERIFY the indeterminate form FIRST, recognizing that applying the rule when the form is not indeterminate produces a wrong answer.
- The learner can handle other indeterminate forms ($0\cdot\infty$, $\infty-\infty$, $1^\infty$, $0^0$, $\infty^0$) by first algebraically REWRITING them into a $\frac00$ or $\frac{\infty}{\infty}$ quotient before applying the rule.
- The learner can recognize that L'Hôpital's rule may need to be applied MULTIPLE times in succession when, after one application, the resulting limit is still indeterminate.

## Core Understanding
L'Hôpital's rule is a technique for a specific, narrow situation: a limit $\lim\frac{f(x)}{g(x)}$ that direct substitution turns into an INDETERMINATE form — $\frac00$ or $\frac{\infty}{\infty}$ — where the original expression carries no usable information about the limit's actual value. In that specific case, and only that case, $\lim\frac{f(x)}{g(x)}=\lim\frac{f'(x)}{g'(x)}$: differentiate the numerator and denominator SEPARATELY (this is emphatically not the quotient rule, which would differentiate the whole fraction as one object) and re-evaluate. The gatekeeping step — checking that the original limit really is indeterminate — is not optional bookkeeping; a limit like $\frac50$ is already determinate (it evaluates to $\pm\infty$, a vertical asymptote), and differentiating top and bottom there produces a mathematically unrelated, generally wrong number. Indeterminate forms that are not already a bare quotient — $0\cdot\infty$, $\infty-\infty$, $1^\infty$, $0^0$, $\infty^0$ — must first be algebraically REWRITTEN into a $\frac00$ or $\frac{\infty}{\infty}$ quotient (via reciprocals, common denominators, or logarithms) before the rule can be invoked at all; the rule's hypothesis is stated for a quotient, and a product or a difference simply does not satisfy it. Finally, one application of the rule can leave a limit that is STILL indeterminate, in which case the rule is applied again to the new quotient $\frac{f'}{g'}$, and again as needed, until a determinate value emerges.

## Mental Models
1. **Beginner — "if a limit has a 0 in the denominator, take the derivative of the top and bottom."** The rule is triggered by a superficial feature (denominator approaching 0) rather than by verifying a genuine indeterminate form. *Upgrade trigger*: applying the "rule" to a limit like $\frac50$ and getting a nonsensical or contradictory answer.
2. **Intermediate — "check that the limit is genuinely $\frac00$ or $\frac{\infty}{\infty}$ by direct substitution FIRST, then differentiate top and bottom separately."** The gatekeeping check is now explicit and prioritized. *Upgrade trigger*: encountering a limit in the form $0\cdot\infty$ or $\infty-\infty$, which is indeterminate but not already a quotient.
3. **Advanced — "other indeterminate forms must be rewritten into a $\frac00$ or $\frac{\infty}{\infty}$ quotient before the rule applies at all; and one application may not be enough — check the form again after differentiating, and repeat if still indeterminate."** The full procedure (verify, rewrite if needed, apply, re-verify, repeat if needed) is now a single coherent loop rather than a one-shot recipe. *Upgrade trigger*: needing to justify, from the derivative's own definition, WHY the rule works at all (a question this concept does not itself resolve, deferred to a rigorous real-analysis treatment).
4. **Expert — L'Hôpital's rule is one tool within a broader toolkit for evaluating limits (alongside algebraic manipulation, series expansion, and squeeze arguments), chosen specifically because differentiation is often easier than direct algebraic simplification for the ratio at hand.** The learner weighs L'Hôpital's rule against alternative limit techniques rather than reaching for it automatically. *Shelf life*: permanent.

## Why Students Fail
The dominant failure is triggering the rule on the wrong feature: since the rule is most often introduced alongside limits where the denominator visibly approaches 0, a learner pattern-matches on "denominator → 0" alone and mechanically differentiates top and bottom without checking whether the NUMERATOR also approaches 0 or infinity — missing that a determinate infinite limit (like $\frac50$) looks superficially similar to an indeterminate one but is fundamentally different, and differentiating both sides there produces an unrelated, generally wrong number (MC-1, LHOPITALS-RULE-APPLIED-TO-A-NON-INDETERMINATE-FORM) — a Type 1 overgeneralization of the correct pattern ("differentiate top and bottom when the denominator vanishes") extended past the necessary companion condition (the numerator must ALSO vanish, or both must diverge). A second, distinct failure attempts to apply the rule's mechanics directly to a form the rule's own hypothesis does not cover: since $0\cdot\infty$, $\infty-\infty$, and the exponential indeterminate forms are all colloquially called "indeterminate," a learner assumes the SAME differentiate-top-and-bottom procedure applies directly, without recognizing these are not yet quotients at all — attempting to differentiate a product $f\cdot g$ "the L'Hôpital way" makes no sense, since the rule's statement is specifically about a ratio $\frac{f}{g}$ (MC-2, OTHER-INDETERMINATE-FORMS-NOT-REWRITTEN-AS-A-QUOTIENT-FIRST) — a Type 4 notation-induced gap, since the shared vocabulary word "indeterminate" obscures the structural difference between a quotient and a product or difference.

## Misconceptions
Reused by reference from the Blueprint's Component 6 registry (MC-1, MC-2) and its own repair actions B01–B02. **The Blueprint's Misconception Registry carries a Severity column (both "Foundational") but no explicit birth-type column**; both classifications below are independently assigned here.

- **MC-1 — LHOPITALS-RULE-APPLIED-TO-A-NON-INDETERMINATE-FORM** (the Blueprint's own "Foundational" misconception)
  - **Birth type**: Type 1, overgeneralization. The genuinely correct trigger — differentiate top and bottom when the original limit is indeterminate — is over-simplified to "differentiate top and bottom whenever the denominator approaches 0," dropping the required check on the numerator (or the joint infinite-over-infinite condition).
  - **Characteristic phrase**: differentiating both numerator and denominator of $\lim\frac{5}{x}$ (as $x\to0$) without first checking that the numerator also approaches 0.
  - **Detection probe** (Blueprint's A01 hook): this directly targets MC-1 (applying the rule to a determinate form).
  - **Repair**: Blueprint Repair Action B01 — re-check the form explicitly by direct substitution before deciding whether the rule applies at all.
  - **Verification of death**: given a fresh limit, the learner performs direct substitution FIRST, states explicitly whether the result is $\frac00$, $\frac{\infty}{\infty}$, or something determinate, and only proceeds to differentiate in the indeterminate case.

- **MC-2 — OTHER-INDETERMINATE-FORMS-NOT-REWRITTEN-AS-A-QUOTIENT-FIRST** (the Blueprint's own "Foundational" misconception)
  - **Birth type**: Type 4, notation-induced. The shared label "indeterminate form" is applied uniformly to $\frac00$, $0\cdot\infty$, $\infty-\infty$, and the exponential forms, obscuring that only the quotient forms are directly eligible for the rule — the other forms require an algebraic rewriting step first that the shared terminology gives no hint is necessary.
  - **Characteristic phrase**: attempting to "differentiate" $x\ln x$ (a product, $0\cdot(-\infty)$ form) directly, as if it were already a quotient eligible for the rule.
  - **Detection probe** (Blueprint's A02 hook): this directly targets MC-2 (attempting to apply the rule to a non-quotient form directly).
  - **Repair**: Blueprint Repair Action B02 — re-derive the quotient form explicitly, e.g. rewriting $f\cdot g$ as $\frac{f}{1/g}$, before applying the rule.
  - **Verification of death**: given a fresh $0\cdot\infty$, $\infty-\infty$, or exponential-form limit, the learner performs the algebraic rewriting into a genuine quotient BEFORE attempting to differentiate anything.

## Analogies
- **Best — a locked door with a specific key.** L'Hôpital's rule is the key, but it only fits the lock labeled "indeterminate quotient" — trying to force it into a differently-shaped lock (a determinate quotient, or a product/difference form) either does nothing useful or breaks something. Rewriting a product or difference into a quotient is like re-shaping the lock so the same key finally fits.
- **Alternative — a diagnostic test that must be run before treatment.** Just as a doctor confirms a diagnosis (the indeterminate form) before prescribing a specific treatment (differentiating top and bottom), skipping the diagnostic step and treating based on a superficial symptom (a zero denominator) risks the wrong treatment entirely.
- **ANTI-ANALOGY — "L'Hôpital's rule fixes any limit with a 0 somewhere in it."** This phrasing licenses MC-1 directly, implying the presence of a zero anywhere is sufficient grounds to apply the rule, when the actual requirement is a genuinely INDETERMINATE quotient, verified by direct substitution first. Say "L'Hôpital's rule applies only after confirming the limit is truly indeterminate — a zero alone proves nothing" instead.

## Demonstrations
- **The contrast pair.** Evaluate $\lim_{x\to0}\frac{\sin x}{x}$ (genuinely $\frac00$, rule applies, gives 1) beside $\lim_{x\to0}\frac{x+5}{x}$ (a determinate $\frac50$, rule does NOT apply). *Predict, by direct substitution alone, which of the two is indeterminate before differentiating either.* Getting the WRONG answer (1, instead of the true $\pm\infty$) by misapplying the rule to the second limit is the demonstration for MC-1.
- **The rewriting step.** Evaluate $\lim_{x\to0^+}x\ln x$ (a $0\cdot(-\infty)$ product form) by first rewriting it as $\lim_{x\to0^+}\frac{\ln x}{1/x}$ (a genuine $-\infty/\infty$ quotient), then applying the rule. *Predict whether the rule can be applied to the ORIGINAL product form directly, before attempting the rewrite.* Recognizing that the original form has no numerator/denominator to differentiate separately is the demonstration for MC-2.
- **The repeated-application chain.** Evaluate $\lim_{x\to0}\frac{x-\sin x}{x^3}$, applying the rule three times in succession, checking the indeterminate form fresh after each application. *Predict, after the first application, whether the new limit is already determinate.* Finding it is STILL $\frac00$ (twice more) before finally resolving is the demonstration that a single application is not always sufficient.

## Discovery Questions
Direct instruction is the argued call for the rule's own statement (a specific theorem best presented explicitly rather than rediscovered), but the form-verification discipline (MC-1) and the rewriting requirement (MC-2) are both genuinely discoverable by direct comparison.
1. **Need** — "Evaluate $\lim_{x\to0}\frac{x+5}{x}$ by differentiating top and bottom. Now evaluate it directly, without differentiating. Do the two methods agree?" They do not.
2. **Playground** — try applying the "differentiate top and bottom" method to a couple more limits with a zero denominator but a nonzero numerator.
3. **Invention** — "Why does differentiating top and bottom give the WRONG answer for $\frac50$-type limits, but the RIGHT answer for $\frac00$-type limits?" Let the learner connect it to the specific hypothesis the rule requires.
4. **Collision** — confront a learner who applied the rule to $\frac50$ with the direct disagreement between their answer and the true (infinite) limit.
5. **Formalisation** — state the rule's exact hypothesis: the ORIGINAL limit must already be $\frac00$ or $\frac{\infty}{\infty}$, verified by direct substitution, before differentiating anything.
6. **Compression** — "Check the form first — differentiate only if it's genuinely indeterminate."

## Teaching Sequence
The form-verification discipline (MC-1) must be established FIRST, since it is the rule's own gatekeeping condition and the most common and most consequential error; a learner who has not internalized "check the form before differentiating" cannot correctly judge whether the rewriting step (MC-2) is even needed, since that judgment itself depends on first recognizing a form as indeterminate. The rewriting requirement follows directly, per the Blueprint's own A02, once the verification habit is fluent. The repeated-application pattern (Example 3, reused procedure per the Blueprint) is folded in last as a natural extension: having verified the form once, the learner is now equipped to re-verify it after each application and continue as needed. Turn-level scripts for A01–A04 are owned by the Blueprint's Component 5 and are not restated here.

## Tutor Actions
- **DO: Worked Example** — the contrast pair ($\frac00$ vs. $\frac50$), with the learner predicting, by direct substitution alone, which limit is indeterminate BEFORE either is differentiated. First action; anchors the form-verification discipline concretely.
- **TEST-THINKING: Error Analysis** — "A student differentiated both the numerator and denominator of $\lim_{x\to2}\frac{x+3}{x-2}$ without checking the form first. What's wrong?" targets MC-1 directly.
- **DO: Demonstration** — the rewriting step (Example 2, the $0\cdot\infty$ form), with the learner attempting the rule on the ORIGINAL product form first and finding it inapplicable, before seeing the correct rewrite.
- **TEST-THINKING: Prediction** — "After one application of the rule, is the new limit definitely determinate, or might it still need another application?" asked BEFORE working Example 3's repeated-application chain. Surfaces the reused-procedure content (multiple applications) in one turn.
- **Does NOT fit: a rigorous proof of why the rule works (via the generalized Cauchy Mean Value Theorem), or evaluating limits by series expansion as an alternative technique, here.** This concept covers the rule's correct application and its scope, not its proof or its comparison against alternative limit-evaluation methods.

## Voice Teaching Notes
The load-bearing sentence is "check the form by direct substitution FIRST — differentiate only if it's genuinely 0 over 0, or infinity over infinity." Say it every time a new limit problem is set up, not just the first. Listen for a learner who reaches for differentiation the moment they see a denominator approaching zero, without stating what the numerator does — that specific jump is the tell for MC-1. Listen for a learner who tries to "apply L'Hôpital" to an expression written as a product or a difference, with no fraction bar in sight — that specific attempt is the tell for MC-2. Channel reality is owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals
- **Differentiates numerator and denominator without first verifying, by direct substitution, that the original limit is indeterminate** — MC-1. Route to the contrast pair, on the exact limit in question.
- **Attempts to apply the rule directly to a product, difference, or exponential form without first rewriting it as a genuine quotient** — MC-2. Route to the rewriting step, on the exact limit in question.
- **Correctly verifies the form, rewrites when necessary, applies the rule, and re-checks after each application** — the intended target state.
- **Mastery trigger**: the Blueprint's A04 gate, MAMR 4/5 (⌈0.80×5⌉=4). The 4-item P77 set plus the P76 transfer probe (the pendulum small-angle-approximation limit) must include at least one item requiring the learner to explicitly state the indeterminate form BEFORE differentiating, not merely arrive at a correct numeric answer — a gate made only of correct-final-value items risks certifying lucky pattern-matching without certifying the form-verification discipline against MC-1.

## Tutor Recovery Strategy
The likely utterance here is "why can't I just differentiate top and bottom whenever there's a zero in the denominator?" — a reasonable question given how often that pattern does correctly signal an indeterminate form. The concept-specific smaller question returns to a direct check: **"Before differentiating anything, plug the limiting value in directly. What does the NUMERATOR become — zero, infinity, or some nonzero number?"** The learner substitutes and sees a nonzero numerator over a zero denominator. Then return: "that's not indeterminate — that's already a determinate infinite limit, a vertical asymptote. L'Hôpital's rule only kicks in when BOTH the top and bottom vanish (or both blow up) together." If the frustration is instead about a non-quotient indeterminate form, shrink to the bare check: **"Is what you're looking at written as one thing DIVIDED by another? If not, that has to happen first."** Generic machinery is owned by `../foundations/01-recovery-engine.md`.

## Memory Hooks
- Concept type: **procedure with an embedded prerequisite-verification requirement** (confirming the indeterminate form is a mandatory gatekeeping step, not an optional formality, and must be checked explicitly every time, not assumed from surface features). Review by *requiring the learner to state the result of direct substitution — the specific form obtained — out loud before writing any derivative*, never accepting a correct final answer alone as evidence of understanding, since a learner can occasionally arrive at a correct numeric result by coincidence even after skipping the verification step.
- Concept-specific deviation: keep at least one review item that is a DETERMINATE form superficially resembling an indeterminate one (like $\frac50$), so the discrimination skill against MC-1 stays exercised and does not atrophy into blind pattern-matching on a visible zero.
- Interleaving partners: `math.calc.limits` (the discriminating partner — reviewing general limit evaluation techniques alongside this concept keeps L'Hôpital's rule positioned as ONE tool among several, not the automatic first resort) and `math.calc.derivative-definition`, whose own derivative machinery this rule directly consumes.

## Transfer Connections
- **Near**: `math.calc.limits` (the general limit-evaluation skill this rule specializes for indeterminate quotients).
- **Far**: proof by mathematical induction and other multi-step iterative procedures — the "check the condition, apply the step, re-check, repeat as needed" loop structure recurs whenever a single application of a technique may not fully resolve a problem.
- **Real-world**: the Blueprint's own transfer probe — the pendulum small-angle-approximation limit $\lim_{\theta\to0}\frac{\sin\theta-\theta}{\theta^3}$ — is a genuine physics derivation where this exact repeated-application pattern arises.
- **Expert transfer**: recognizing that a powerful tool's applicability is bounded by a precise hypothesis, and that verifying the hypothesis before invoking the tool is a general mathematical discipline, not specific to this one rule.

## Cross-Subject Connections
- **Physics**, real: the Blueprint's own transfer probe (the small-angle pendulum approximation) is a standard derivation in classical mechanics, where indeterminate limits of exactly this shape arise when justifying higher-order approximations.
- **Engineering**, real: evaluating transfer-function limits at critical frequencies (where both numerator and denominator of a system response vanish) is a routine application of this exact technique in signal and control systems analysis.
- **Economics**, real: marginal-analysis limits (e.g. average cost as production approaches a boundary value) sometimes take indeterminate forms resolved by this same rule.
- No genuine KG cross_link exists for this concept.

## Blueprint References
`docs/curriculum/blueprints/math.calc.lhopitals-rule.md`. Reused by reference, not restated: the Component 1 Learning Objectives, the Component 4 Worked Examples (Example 1 the contrast-pair verification breaking MC-1, Example 2 the rewriting-a-product-form computation breaking MC-2, Example 3 the repeated-application chain), the Component 5 Teaching Actions (A01 P06 contrast pair, A02 P64 conceptual shift, A03 reused procedure, A04 P91 mastery gate at MAMR 4/5), the Component 6 Misconception Registry (MC-1, MC-2) and repair actions (B01, B02), the four-item P77 problem set, and the P76 independence-mode transfer probe (the pendulum small-angle-approximation problem). This entry adds independent birth-type classification for both misconceptions (the Blueprint marks severities but assigns no birth type), the mental-model ladder, the anti-analogy, and the argued direct-instruction-for-the-rule-statement / guided-discovery-for-the-form-verification-and-rewriting split.

## Runtime Asset References
No seeded `AssetIdentity` records exist for this concept. None were created here.

## Curriculum Feedback
No Blueprint/KG metadata discrepancy was found for this concept — the Blueprint's stated requires (`math.calc.derivative-definition`, `math.calc.limits`), unlocks (none), cross_links (none), difficulty (advanced), bloom (apply), mastery_threshold (0.80), and estimated_hours (5) all match the live KG's own fields exactly, confirmed by direct query. This is the second of four zero-discrepancy concepts in this batch, continuing the streak restarted in Batch 43 after Batch 42's `arc-length` broke the prior five-consecutive-zero run.

## Version History
- v1.0 (2026-09-12): Initial authoring. Mathematics Educational Brain completion campaign, math.calc Wave (Batch 45).
