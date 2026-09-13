# math.alg.change-of-base — Change of Base Formula

## Identity
- **KG ID:** `math.alg.change-of-base`
- **Domain:** math.alg (Algebra)
- **Requires:** `math.alg.logarithm-properties`
- **Unlocks:** (none in KG)
- **Cross-links:** (none)
- **Difficulty:** proficient
- **Bloom level:** apply
- **Mastery threshold:** 0.85 (MAMR 5/5)
- **Estimated hours:** 2

## Learning Objective
By the end of this concept, the student can: (1) apply the change-of-base formula $\log_a(x)=\frac{\log_b(x)}{\log_b(a)}$ to evaluate a logarithm in a base not directly available on a calculator, typically converting to base 10 or base $e$; (2) correctly identify which quantity goes in the numerator (the original argument $x$) versus the denominator (the original base $a$) — the primary point of reversal error; (3) recognize the formula works for any valid new base $b$, and that the result is identical regardless of which convenient base is chosen.

## Core Understanding
Most calculators compute only two logarithm bases directly: base 10 ($\log$) and base $e$ ($\ln$). But real problems routinely require logarithms in other bases — $\log_5(12)$, $\log_3(50)$, and so on. The change-of-base formula bridges this gap: $\log_a(x)=\frac{\log_b(x)}{\log_b(a)}$ lets any base-$a$ logarithm be computed using logarithms in a different, more convenient base $b$.

The formula's structure is precise and asymmetric: the ORIGINAL ARGUMENT $x$ goes in the numerator; the ORIGINAL BASE $a$ goes in the denominator — both re-expressed as logarithms in the new base $b$. This is not an arbitrary convention; it falls directly out of solving $a^y = x$ for $y$ using logarithms in base $b$: taking $\log_b$ of both sides gives $y \cdot \log_b(a) = \log_b(x)$, so $y = \frac{\log_b(x)}{\log_b(a)}$ — and $y$ is exactly $\log_a(x)$ by definition. The formula is therefore a direct consequence of the logarithm's own defining relationship, not a separately memorized rule.

Crucially, the choice of new base $b$ is a matter of computational convenience only — ANY valid base (any positive number $\ne 1$) produces the identical final numerical answer for $\log_a(x)$. Base 10 and base $e$ are the conventional choices simply because they are what standard calculators provide, not because they are mathematically privileged in this formula.

## Mental Models
1. **Rung 1 — a translation device.** The formula translates a logarithm expressed in one "language" (base $a$) into an equivalent expression in another "language" (base $b$) that the calculator actually understands.
2. **Rung 2 — argument on top, base on bottom.** A fixed structural rule: whatever was the argument stays the argument (now in the numerator); whatever was the base stays the base (now in the denominator).
3. **Rung 3 — derived, not decreed.** The formula falls directly out of solving $a^y=x$ using logarithms — it is a consequence of the logarithm's defining relationship, which is why it cannot have "the wrong direction" as a hidden alternative version.
4. **Rung 4 — the answer is base-independent.** Since $\log_a(x)$ is one specific real number, computing it via base 10 vs. base $e$ must give the same result; if two computations disagree, one of them has an arithmetic or setup error, not a legitimate "different but valid" answer.

## Why Students Fail
The formula's numerator/denominator asymmetry is easy to invert because both the correct and flipped fraction PRODUCE a plausible-looking decimal number — there is no obvious red flag (like an undefined expression or a wildly implausible magnitude) signaling the reversal, unlike many other algebra errors. Students also sometimes doubt that different base choices give identical results, treating the formula's flexibility as introducing ambiguity rather than recognizing it as a convenience with a guaranteed-consistent outcome.

## Misconceptions

### MC-1: CHANGE-OF-BASE-NUMERATOR-DENOMINATOR-REVERSED
- **Birth type:** Type 1 (overgeneralization) — foundational
- **Description:** Placing the original base in the numerator and the original argument in the denominator, inverting the correct formula structure.
- **Why this birth type:** This is an overgeneralization of a plausible but wrong pattern-matching heuristic: many other algebraic re-expressions place the "smaller" or "earlier-mentioned" quantity first, and without re-deriving the formula from $a^y=x$ each time, a student may default to whichever ordering feels more natural rather than the ordering the derivation actually produces. The error is a memory/pattern-matching slip, not a perceptual illusion or notation artifact.
- **Detection probe:** "Evaluate $\log_3(50)$ using base 10." A student exhibiting MC-1 computes $\frac{\log(3)}{\log(50)}\approx0.281$ instead of the correct $\frac{\log(50)}{\log(3)}\approx3.561$ — the reciprocal of the right answer.
- **Repair:** Re-derive the formula live: state $a^y=x$, take $\log_b$ of both sides to get $y\log_b(a)=\log_b(x)$, solve for $y=\frac{\log_b(x)}{\log_b(a)}$, and explicitly label which side has the original argument and which has the original base. Then re-compute the flipped version numerically alongside the correct one to show they are reciprocals — genuinely different numbers, not cosmetic variants.
- **Verification of death:** The student evaluates a novel base-conversion problem correctly on the first attempt, and when asked "which goes on top?", answers "the argument" without hesitation or re-derivation.

### MC-2: DIFFERENT-CHOSEN-BASES-ASSUMED-TO-GIVE-DIFFERENT-ANSWERS
- **Birth type:** Type 1 (overgeneralization) — moderate
- **Description:** Believing the choice of new base $b$ affects the final numerical result, rather than recognizing it only affects the convenience of computation.
- **Why this birth type:** An overgeneralization of the reasonable intuition "different inputs to a formula give different outputs" — true for most formulas encountered so far, but false here because $b$ is a FREE CHOICE of computational pathway, not a property of the quantity being computed. The student has not yet distinguished "a parameter that changes the answer" from "a parameter that changes only the route to the same answer."
- **Detection probe:** "If I compute $\log_2(7)$ using base 10, and you compute it using base $e$, should we get the same answer or different answers?" A student with MC-2 answers "different" or expresses uncertainty.
- **Repair:** Compute the same logarithm using two different bases side by side, showing numerical agreement to several decimal places, and connect this to the underlying algebraic identity: $\frac{\log_b(x)}{\log_b(a)}$ is just a different symbolic route to the same value of $y$ solving $a^y=x$, which doesn't depend on $b$ at all.
- **Verification of death:** The student, given a novel logarithm to evaluate, confidently states in advance (before computing) that base 10 and base $e$ will agree, and then confirms this by computing both.

## Analogies
1. **The currency-exchange analogy.** Converting $\log_a(x)$ to a new base is like converting a price from one currency to another to use a calculator that only accepts one currency — the underlying VALUE doesn't change, only the units used to express the intermediate calculation.
2. **The unit-conversion analogy.** Just as a length can be measured in meters or feet and still be the same physical length, $\log_a(x)$ can be computed via base 10 or base $e$ and still be the same number — the base is a "unit of measurement" for the computation, not a property of the answer.

## Demonstrations
### Demonstration 1 — basic application (mirrors Blueprint Ex1)
Evaluate $\log_5(12)$ using base 10: $\log_5(12)=\frac{\log(12)}{\log(5)}\approx\frac{1.079}{0.699}\approx1.544$.

### Demonstration 2 — numerator/denominator roles, breaking MC-1 (mirrors Blueprint Ex2)
Evaluate $\log_3(50)$ using base 10. Correct: $\log_3(50)=\frac{\log(50)}{\log(3)}\approx\frac{1.699}{0.477}\approx3.561$. The flipped (incorrect) version, $\frac{\log(3)}{\log(50)}\approx0.281$, is the reciprocal of the correct answer — a genuinely different, not merely differently-formatted, number.

### Demonstration 3 — any base gives the same result (mirrors Blueprint Ex3)
Evaluate $\log_2(7)$ via base 10: $\frac{\log(7)}{\log(2)}\approx\frac{0.845}{0.301}\approx2.807$. Evaluate the same $\log_2(7)$ via base $e$: $\frac{\ln(7)}{\ln(2)}\approx\frac{1.946}{0.693}\approx2.807$ — identical result.

## Discovery Questions
1. "If $\log_a(x)$ is one specific number, and we can compute it two different ways (base 10 or base $e$), what should happen if we compute it both ways and compare?"
2. "Starting from $a^y=x$, if you take $\log_b$ of both sides, what equation do you get — and can you solve it for $y$ yourself?"
3. "If flipping the fraction in the change-of-base formula gives the WRONG answer, what mathematical relationship does the flipped (wrong) answer have to the correct one?"

## Teaching Sequence
Best taught by **direct instruction with a live re-derivation**, not open discovery — the formula's structure follows from a short, teachable algebraic derivation ($a^y=x\to y\log_b(a)=\log_b(x)$) that is more efficient to walk through directly than to have a student rediscover unaided, though the derivation itself should always be shown rather than simply asserted.
1. State the problem: a calculator only computes base 10 and base $e$ directly — how do we evaluate $\log_5(12)$?
2. Derive the formula live from $a^y=x$, taking $\log_b$ of both sides.
3. Apply it to Example 1 ($\log_5(12)$), labeling argument and base explicitly before substituting.
4. Work Example 2, contrasting the correct computation against the flipped (reciprocal) version numerically.
5. Work Example 3, computing the same logarithm via two different bases to confirm agreement.
6. Assess with a mixed problem set (P77) and the transfer probe.

## Tutor Actions
1. **On introducing the formula:** always derive it live from $a^y=x$ before stating it as a rule — this immediately forecloses the "wrong direction" alternative, since the derivation only produces one valid ordering.
2. **On a numerator/denominator question:** ask the student to identify the original argument and original base explicitly, in words, before writing the fraction.
3. **On a "which base should I use?" question:** confirm any valid base works and offer base 10 or $e$ purely as calculator convenience, never implying one is "more correct."
4. **On an incorrect (flipped) computation:** compute the reciprocal of the student's answer and show it matches the correct value — this makes the nature of the error (inversion, not random miscalculation) visible.

## Voice Teaching Notes
1. **Register:** procedural and precise — this is a formula-application skill, so clarity of structure matters more than exploratory tone.
2. **Load-bearing sentence, spoken slowly:** "The argument goes on top, the original base goes on the bottom — flip that, and you get the reciprocal, not a different valid answer."
3. **Wait time:** pause after asking "argument or base — which goes on top?" before revealing the answer, so the student commits to labeling the quantities rather than passively substituting.

## Assessment Signals
1. **Gate concept:** correctly evaluates a novel base-$a$ logarithm using base 10 without reversing numerator/denominator.
2. **Cross-verification:** given the same logarithm, computes it via two different bases and confirms agreement without being prompted.
3. **Error diagnosis:** given a flipped (incorrect) computation, identifies it as the reciprocal of the correct answer, not merely "wrong."
4. **Transfer:** applies the formula in an unfamiliar context (e.g. an octave/doubling-scale calculation) requiring the same base-10-or-$e$ substitution.
5. **Misconception probe:** when asked whether two different base choices should give the same or different final answers, answers "same" confidently and explains why.

## Tutor Recovery Strategy
If the student consistently inverts the fraction, do not just restate the rule — re-derive it from $a^y=x$ each time until the derivation itself becomes the anchor, since a memorized "argument on top" rule without the derivation is exactly the kind of pattern that MC-1 shows is fragile under pressure. If the student doubts base-independence, run a live side-by-side numeric comparison rather than asserting it.

## Memory Hooks
1. "Argument on top, base on bottom — flip it, get the reciprocal."
2. "Derive it from $a^y=x$: take $\log_b$ of both sides, solve for $y$."
3. "Any valid base gives the same answer — the base is just your computational route."

## Transfer Connections
- **`math.alg.logarithm-properties`:** the product/quotient/power rules this formula's derivation implicitly relies on being comfortable with logarithm manipulation.
- **`math.alg.logarithmic-equations`:** uses the change-of-base formula when solving equations involving logarithms of uncommon bases.
- **`math.alg.exponential-equations`:** the base-$a^y=x$ relationship this formula's derivation solves for $y$.

## Cross-Subject Connections
- **Music/acoustics (octave and decibel scales):** doubling-based logarithmic scales (e.g. musical octaves as $\log_2$) routinely require change-of-base to compute using a standard calculator.
- **Computer Science (algorithmic complexity):** logarithms in base 2 are common in complexity analysis; change-of-base connects this to more familiar base-10/base-$e$ computation.

## Blueprint References
- Primary source: `docs/curriculum/blueprints/math.alg.change-of-base.md` — reused by reference throughout (Learning Objectives, worked examples Ex1–Ex3, misconception inventory MC-1–MC-2, transfer probe P76). Not restated verbatim; this entry adds birth-type classification, mental-model ladder, analogies, discovery-vs-direct-instruction argument, voice teaching notes, and cross-subject connections per `EDUCATIONAL_BRAIN_STANDARD.md`'s ownership boundary.

## Runtime Asset References
- No AssetIdentity rows exist for this concept yet (Layer 3/7 DB-backed assets are populated separately, by live LLM generation plus admin review or by deliberate seed-script batches — never by this authoring layer). This entry is Layer 1/2 content only.

## Curriculum Feedback
- No genuine Blueprint/KG metadata discrepancy found — requires, unlocks, cross_links, difficulty, bloom, mastery_threshold, and estimated_hours all match the live KG exactly.
- No genuine content-overlap was found between this entry and its sibling `math.alg.logarithm-properties` — this entry's misconceptions concern the specific numerator/denominator structure and base-independence of THIS formula, distinct from that entry's product/quotient/power-rule derivations, though it explicitly reuses those rules by cross-reference.
- This entry, together with `logarithmic-equations` and `pascals-triangle` (both authored this same batch), completes `math.alg` — the domain reaches 59/59, its fifth CERTIFICATION after math.found/math.geom/math.arith/math.nt.

## Version History
- **Batch 18** (2026-09-11): initial authoring, part 1 of 3 this batch (with `math.alg.logarithmic-equations` and `math.alg.pascals-triangle`), closing the math.alg domain. Blueprint reused by reference; 2 misconceptions birth-type classified (MC-1 Type 1 foundational, MC-2 Type 1 moderate).
