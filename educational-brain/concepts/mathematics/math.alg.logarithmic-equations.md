# math.alg.logarithmic-equations — Logarithmic Equations

## Identity
- **KG ID:** `math.alg.logarithmic-equations`
- **Domain:** math.alg (Algebra)
- **Requires:** `math.alg.logarithm-properties`, `math.alg.exponential-equations`
- **Unlocks:** (none in KG)
- **Cross-links:** (none)
- **Difficulty:** proficient
- **Bloom level:** apply
- **Mastery threshold:** 0.8 (MAMR 4/5)
- **Estimated hours:** 5

## Learning Objective
By the end of this concept, the student can: (1) solve a logarithmic equation by CONDENSING multiple logarithm terms into a single logarithm using the product/quotient/power rules, then EXPONENTIATING both sides to eliminate the logarithm; (2) solve the resulting algebraic equation using appropriate prior techniques; (3) check every candidate solution against the DOMAIN of the original logarithms — arguments must be strictly positive — correctly identifying and discarding extraneous solutions.

## Core Understanding
A logarithmic equation is an equation in which the unknown appears as the ARGUMENT of a logarithm — for example, $\log_2(x)+\log_2(x-2)=3$. Solving proceeds in four stages: (1) CONDENSE any multiple logarithm terms into a single logarithm using the already-mastered product/quotient/power rules from `math.alg.logarithm-properties`; (2) EXPONENTIATE both sides — raising the log's base to the power of both sides — to eliminate the logarithm entirely, mirroring in reverse the solving process of `math.alg.exponential-equations`; (3) solve the resulting purely algebraic equation; (4) CHECK every candidate solution against the domain requirement that every ORIGINAL logarithm's argument must be strictly positive.

This final domain-checking stage is not optional bookkeeping — it is structurally necessary. Exponentiation, like squaring in radical equations, is not an invertible operation on the full real line in the relevant sense here: it can produce algebraic candidates that satisfy the exponentiated equation but do not satisfy the domain restrictions of the ORIGINAL logarithmic expressions. A candidate that makes any original logarithm's argument zero or negative is EXTRANEOUS and must be discarded, regardless of how cleanly it emerged from the algebra.

The condensing step matters not just for convenience but for correctness of approach: attempting to manipulate several separate logarithm terms individually, without first combining them into one logarithm, makes the algebra needlessly complicated and error-prone, and in some equation forms (like $\log(x+1)-\log(x-1)=\log(3)$) the condense-first approach is what makes a clean, direct solution path visible at all — condensing both sides into single logarithms of the SAME base lets their arguments be equated directly.

## Mental Models
1. **Rung 1 — a four-stage pipeline.** Condense → exponentiate → solve → domain-check, in that fixed order; skipping or reordering stages produces either unsolvable algebra or unverified (possibly wrong) answers.
2. **Rung 2 — exponentiation is the log-equation's "squaring."** Just as squaring both sides of a radical equation can introduce extraneous roots, exponentiating both sides of a logarithmic equation can introduce extraneous solutions — the same verification discipline applies, in a different (domain-restriction rather than sign-loss) form.
3. **Rung 3 — the domain check interrogates the ORIGINAL equation, not the transformed one.** A candidate is checked against where the logarithm started, not where the algebra ended — the transformed (exponentiated) equation has no domain restriction of its own to violate.
4. **Rung 4 — condensing same-base logs lets arguments be equated directly.** When both sides of an equation reduce to a single logarithm of the SAME base, the logarithm function's one-to-one property lets the equation be reduced to equating the arguments — no exponentiation needed in that specific case.

## Why Students Fail
The domain-checking stage is the single most frequently skipped step, because the exponentiated equation's algebra often produces two "equally valid-looking" algebraic solutions, and nothing in the SYMBOLIC manipulation itself flags which one is extraneous — the invalidity only becomes visible by substituting back into the ORIGINAL logarithmic expressions, a step students without a strong "always verify" habit tend to omit. Separately, students who have not internalized the condense-first strategy often attempt ad hoc term-by-term manipulation of separate logarithms, producing dead ends or unnecessarily complicated algebra.

## Misconceptions

### MC-1: LOGARITHMIC-EQUATION-CANDIDATES-NOT-DOMAIN-CHECKED
- **Birth type:** Type 1 (overgeneralization) — foundational
- **Description:** Accepting a candidate solution without checking that every original logarithm's argument is positive, missing an extraneous solution.
- **Why this birth type:** An overgeneralization of the correct general habit "solve the equation and report all algebraic solutions" — appropriate for most equation types encountered so far (linear, most polynomial), but incomplete here because logarithms carry a domain restriction the transformed equation does not inherit automatically. The student has not yet distinguished "an equation whose solving process is domain-neutral" from "an equation whose solving process can silently escape the original domain."
- **Detection probe:** "Solve $\log_2(x)+\log_2(x-2)=3$ and list all solutions." A student with MC-1 reports both $x=4$ and $x=-2$ without checking either against the original logarithms.
- **Repair:** Substitute each candidate back into the ORIGINAL (uncondensed) equation's individual logarithm terms, not the condensed or exponentiated form. For $x=-2$: $\log_2(-2)$ is undefined — visibly, concretely invalid, not merely "technically excluded."
- **Verification of death:** The student, given a novel logarithmic equation with two algebraic candidates, checks BOTH against the original logarithms without being prompted and correctly discards the extraneous one.

### MC-2: LOGARITHMIC-EQUATION-SOLVED-BEFORE-CONDENSING
- **Birth type:** Type 1 (overgeneralization) — foundational
- **Description:** Attempting to manipulate separate logarithm terms individually before first condensing them into a single logarithm, complicating the solution process.
- **Why this birth type:** An overgeneralization of general-purpose "isolate the variable" solving habits from linear/polynomial equations, applied to an equation TYPE (logarithmic) where a different, condense-first strategy is required before conventional isolation techniques become tractable. The habit itself is not wrong in general — it is applied here before the equation has been reduced to a form where it works cleanly.
- **Detection probe:** "Solve $\log(x+1)-\log(x-1)=\log(3)$." A student with MC-2 attempts to isolate $x$ across the separate log terms directly, rather than first applying the quotient rule to condense the left side into $\log\left(\frac{x+1}{x-1}\right)$.
- **Repair:** Explicitly demonstrate that condensing FIRST turns the equation into "logarithm of something equals logarithm of something else" (same base on both sides), which can then be resolved by equating the arguments directly — a much shorter and more reliable path than manipulating separate terms.
- **Verification of death:** Given a new multi-term logarithmic equation, the student's first move is to apply a log property to condense, before attempting any other algebraic manipulation.

### MC-3: LOGARITHM-CONDENSING-RULE-MISAPPLIED
- **Birth type:** Type 4 (notation-induced) — moderate
- **Description:** Using the wrong log property when condensing multiple log terms — for example, adding instead of multiplying arguments, or vice versa.
- **Why this birth type:** Notation-induced: the surface symbols "$+$" and "$-$" between log terms visually resemble ordinary addition/subtraction, inviting a naive "just combine the numbers" response that skips the actual rule (sum of logs = log of product; difference of logs = log of quotient) the notation is meant to trigger. The visual similarity between "$\log A + \log B$" and ordinary arithmetic addition is the source of the slip, not a conceptual misunderstanding of what condensing means in principle.
- **Detection probe:** "Condense $\log(x+1)-\log(x-1)$ into a single logarithm." A student with MC-3 may write $\log\left((x+1)-(x-1)\right)$ (treating the log subtraction as if it distributes over the arguments) instead of the correct $\log\left(\frac{x+1}{x-1}\right)$.
- **Repair:** Re-state the exact correspondence explicitly: addition of logs condenses via MULTIPLICATION of arguments; subtraction of logs condenses via DIVISION of arguments — cite the specific rule from `math.alg.logarithm-properties` by name each time, rather than relying on visual pattern-matching.
- **Verification of death:** The student correctly condenses both an addition-of-logs and a subtraction-of-logs expression without confusing which arithmetic operation applies to the arguments.

## Analogies
1. **The unpacking-before-solving analogy.** Condensing multiple log terms into one is like combining several partial shipments into a single package before opening it — trying to unpack each piece separately, before combining them, makes the job needlessly harder.
2. **The ID-check-at-the-door analogy.** The domain check is like verifying a guest's invitation at the door AFTER they've already been let in through a side entrance (the exponentiation step) — the side entrance doesn't check invitations, so the front-door check afterward is the only safeguard against someone getting in who shouldn't have.

## Demonstrations
### Demonstration 1 — standard case (mirrors Blueprint Ex1)
Solve $\log_2(x)+\log_2(x-2)=3$. Condense: $\log_2(x(x-2))=3$. Exponentiate (base 2): $x(x-2)=2^3=8\Rightarrow x^2-2x-8=0\Rightarrow(x-4)(x+2)=0\Rightarrow x=4$ or $x=-2$.

### Demonstration 2 — domain check eliminates an extraneous candidate, breaking MC-1 (mirrors Blueprint Ex2)
Continuing Demonstration 1: check $x=4$ against the original domain requirements ($x>0$ and $x-2>0$, i.e. $x>2$): both satisfied — valid. Check $x=-2$: $\log_2(-2)$ is undefined — extraneous, discarded. Final solution: $x=4$ only.

### Demonstration 3 — condensing before exponentiating, breaking MC-2 (mirrors Blueprint Ex3)
Solve $\log(x+1)-\log(x-1)=\log(3)$. Condense using the quotient rule: $\log\left(\frac{x+1}{x-1}\right)=\log(3)$. Same base on both sides, so equate arguments directly: $\frac{x+1}{x-1}=3\Rightarrow x+1=3x-3\Rightarrow x=2$. Check domain: $x+1=3>0$ ✓, $x-1=1>0$ ✓ — valid.

## Discovery Questions
1. "If you square both sides of a radical equation, sometimes an extra 'solution' sneaks in that doesn't actually work. What's the analogous risky step here, and what should you check afterward?"
2. "Given $\log(x+1)-\log(x-1)=\log(3)$, what happens if you try to isolate $x$ term by term across the separate logs, versus condensing the left side into one logarithm first?"
3. "Both $x=4$ and $x=-2$ solve the EXPONENTIATED equation $x(x-2)=8$. Does that guarantee both solve the ORIGINAL logarithmic equation? How would you check?"

## Teaching Sequence
Best taught by **direct instruction of the four-stage pipeline, with discovery embedded in the domain-check stage** — the condense/exponentiate/solve sequence is a procedural skill best demonstrated directly, but the NECESSITY of the domain check is best discovered by the student encountering an extraneous solution firsthand rather than being told about it in the abstract.
1. State the four-stage pipeline: condense, exponentiate, solve, domain-check.
2. Work Example 1's condense-and-exponentiate steps directly.
3. Before revealing which candidate is valid, ask the student to check both against the original logarithms themselves (Discovery Question 3) — let them discover the extraneous solution.
4. Work Example 3, showing the condense-first approach for a two-sided log equation, contrasting against the term-by-term dead end.
5. Practice with the P77 problem set, requiring an explicit domain check on every problem.
6. Assess with the transfer probe.

## Tutor Actions
1. **On a submitted solution list:** always ask "did you check both candidates against the ORIGINAL logarithms?" before accepting the answer, even if it happens to be correct — the habit matters as much as the specific result.
2. **On a term-by-term manipulation attempt (MC-2):** redirect immediately to "what log property could combine these into ONE logarithm first?" before letting the algebra proceed further down the harder path.
3. **On a condensing step (potential MC-3):** ask the student to name which specific rule (product, quotient, or power) they are applying, rather than accepting a condensed expression without justification.
4. **On an extraneous-solution discovery:** frame it as the domain check "catching" something the algebra alone couldn't — reinforcing that the check is a genuine safeguard, not busywork.

## Voice Teaching Notes
1. **Register:** procedural but with a genuine "catch" moment built in — the domain check should land as a real discovery ("wait, that one doesn't work!"), not a rote final step.
2. **Load-bearing sentence, spoken slowly:** "Exponentiating can let in a solution that doesn't belong — always check every candidate back in the ORIGINAL logarithms before you're done."
3. **Wait time:** pause visibly after presenting both algebraic candidates, before revealing which is extraneous, giving the student room to attempt the domain check themselves.

## Assessment Signals
1. **Gate concept:** solves a standard logarithmic equation (condense, exponentiate, solve) correctly.
2. **Domain-check habit:** checks every candidate against the original logarithms without being prompted, on a novel problem.
3. **Condense-first strategy:** condenses multi-term logarithmic expressions before attempting to isolate the variable.
4. **Rule accuracy:** correctly distinguishes which log property (product vs. quotient) applies when condensing addition vs. subtraction of logs.
5. **Transfer:** applies the full pipeline in a novel real-world-framed context (e.g. a Richter-scale-style equation) and correctly interprets what an extraneous solution would mean practically.

## Tutor Recovery Strategy
If the student consistently skips the domain check, do not just remind them — have them substitute the extraneous candidate back into the ORIGINAL uncondensed equation live and watch it fail, since a lived "this doesn't work" moment is more durable than a repeated instruction to "remember to check." If the student attempts term-by-term manipulation, redirect to naming the applicable log property before any further algebra.

## Memory Hooks
1. "Condense, exponentiate, solve, domain-check — in that order, every time."
2. "Exponentiating is this equation's 'squaring' — it can let in extraneous solutions."
3. "Check candidates in the ORIGINAL logarithms, not the exponentiated equation."

## Transfer Connections
- **`math.alg.logarithm-properties`:** the product/quotient/power rules this concept's condensing stage directly applies.
- **`math.alg.exponential-equations`:** the exponentiation step here mirrors that concept's solving process in reverse.
- **`math.alg.radical-equations`:** the structurally parallel extraneous-solution-checking discipline for a different equation type — reinforces the general "verify against the original" habit in a new context.
- **`math.alg.change-of-base`:** used when a logarithmic equation involves an uncommon base not directly computable.

## Cross-Subject Connections
- **Seismology (Richter scale):** logarithmic relationships between earthquake amplitudes and magnitude differences give this concept's domain check genuine physical stakes — an extraneous solution here would correspond to a physically impossible amplitude.
- **Chemistry (pH calculations):** pH is itself a logarithm ($-\log_{10}[\text{H}^+]$); equations relating pH values follow the same condense/exponentiate/domain-check pattern.

## Blueprint References
- Primary source: `docs/curriculum/blueprints/math.alg.logarithmic-equations.md` — reused by reference throughout (Learning Objectives, worked examples Ex1–Ex3, misconception inventory MC-1–MC-3, transfer probe P76). Not restated verbatim; this entry adds birth-type classification, mental-model ladder, analogies, discovery-vs-direct-instruction argument, voice teaching notes, and cross-subject connections per `EDUCATIONAL_BRAIN_STANDARD.md`'s ownership boundary.

## Runtime Asset References
- No AssetIdentity rows exist for this concept yet (Layer 3/7 DB-backed assets are populated separately, by live LLM generation plus admin review or by deliberate seed-script batches — never by this authoring layer). This entry is Layer 1/2 content only.

## Curriculum Feedback
- No genuine Blueprint/KG metadata discrepancy found — requires, unlocks, cross_links, difficulty, bloom, mastery_threshold, and estimated_hours all match the live KG exactly.
- No genuine content-overlap was found with sibling entries. MC-1's extraneous-solution-checking discipline is explicitly cross-referenced against `math.alg.radical-equations`'s parallel treatment rather than duplicated, and MC-3's log-property-condensing content is explicitly cross-referenced against (never re-derived from) `math.alg.logarithm-properties`.
- This entry, together with `change-of-base` and `pascals-triangle` (both authored this same batch), completes `math.alg` — the domain reaches 59/59, its fifth CERTIFICATION after math.found/math.geom/math.arith/math.nt.

## Version History
- **Batch 18** (2026-09-11): initial authoring, part 2 of 3 this batch (with `math.alg.change-of-base` and `math.alg.pascals-triangle`), closing the math.alg domain. Blueprint reused by reference; 3 misconceptions birth-type classified (MC-1 Type 1 foundational, MC-2 Type 1 foundational, MC-3 Type 4 moderate).
