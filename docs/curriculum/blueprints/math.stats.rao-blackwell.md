# Teaching Blueprint: Rao-Blackwell Theorem (`math.stats.rao-blackwell`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.stats.rao-blackwell` |
| name | Rao-Blackwell Theorem |
| domain | Statistics |
| difficulty | expert |
| bloom | analyze |
| mastery_threshold | 0.70 → MAMR = ⌈0.70×5⌉ = 4/5 |
| estimated_hours | 4 |
| requires | `math.stats.sufficient-statistic`, `math.stats.bias-variance` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | If θ̂ is an unbiased estimator and T is sufficient for θ, then θ̃ = E[θ̂|T] is also unbiased and has MSE no greater than θ̂. Conditioning on a sufficient statistic always improves or maintains an estimator.

 |

## Component 1 — Learning Objectives

- LO1: State the Rao-Blackwell theorem — if $\hat\theta$ is an UNBIASED estimator of $\theta$ and $T$ is a SUFFICIENT statistic for $\theta$ (from `math.stats.sufficient-statistic`), then $\tilde\theta=E[\hat\theta\mid T]$ is ALSO unbiased, and has MSE (from `math.stats.bias-variance`) NO GREATER than $\hat\theta$'s.
- LO2: Recognize the theorem's guarantee is "NO GREATER" (i.e., $\le$), NOT "STRICTLY LESS" — conditioning on a sufficient statistic can sometimes leave the estimator UNCHANGED (if $\hat\theta$ was already a function of $T$ alone), but NEVER makes it WORSE — the theorem gives a one-directional, non-strict improvement guarantee.
- LO3: Recognize "Rao-Blackwellization" as a PROCEDURE for IMPROVING a given unbiased estimator — starting from ANY unbiased $\hat\theta$ (even a "crude" or inefficient one) and a KNOWN sufficient statistic $T$, computing $E[\hat\theta\mid T]$ SYSTEMATICALLY produces an estimator that is AT LEAST as good, often strictly better.

## Component 2 — Prerequisite Check

Assumes mastery of `math.stats.sufficient-statistic` (the key statistic being conditioned on) and `math.stats.bias-variance` (the MSE framework used to compare estimators).

## Component 3 — Core Explanation

The **Rao-Blackwell theorem** states: if $\hat\theta$ is an UNBIASED estimator of $\theta$, and $T$ is a SUFFICIENT statistic for $\theta$, then $\tilde\theta=E[\hat\theta\mid T]$ (the CONDITIONAL EXPECTATION of $\hat\theta$ given $T$) is ALSO an unbiased estimator, and its MSE is NO GREATER than $\hat\theta$'s MSE.

The theorem's guarantee is specifically "NO GREATER than" ($\le$), NOT a guarantee of STRICT improvement — if $\hat\theta$ HAPPENS to already be a function of $T$ alone (i.e., $\hat\theta$ was already "using" all the sufficient information), then $\tilde\theta=\hat\theta$ EXACTLY (no change occurs). But conditioning on a sufficient statistic NEVER makes the estimator WORSE — this is a one-directional, non-strict IMPROVEMENT (or at-worst-preservation) guarantee.

"**Rao-Blackwellization**" refers to the practical PROCEDURE this theorem enables: starting from ANY valid unbiased estimator $\hat\theta$ (even a deliberately crude or inefficient one, perhaps easy to construct but statistically wasteful) and a KNOWN sufficient statistic $T$, SYSTEMATICALLY computing $E[\hat\theta\mid T]$ produces an improved (or at-worst-equal) estimator — this gives a genuine, mechanical RECIPE for improving estimators, rather than requiring ad hoc cleverness each time.

## Component 4 — Worked Examples

**Example 1 (LO1 — the theorem's statement and guarantee, breaking MC-1)**: State precisely what the Rao-Blackwell theorem guarantees about $\tilde\theta=E[\hat\theta\mid T]$'s BIAS and MSE, given $\hat\theta$ unbiased and $T$ sufficient. $\tilde\theta$ is GUARANTEED unbiased (same as $\hat\theta$) AND has MSE $\le\hat\theta$'s MSE. A common error assumes the theorem ALSO guarantees $\tilde\theta$ is unbiased EVEN IF $\hat\theta$ ISN'T (attempting to apply the theorem starting from a BIASED estimator) — the theorem's unbiasedness conclusion specifically REQUIRES starting from an ALREADY unbiased $\hat\theta$; it doesn't magically remove bias from a biased starting estimator.

**Example 2 (LO2 — "no greater than," not "strictly less," breaking MC-2)**: If $\hat\theta$ is ALREADY a function of the sufficient statistic $T$ alone (e.g. $\hat\theta=g(T)$ for some function $g$), determine what $\tilde\theta=E[\hat\theta\mid T]$ equals. Since $\hat\theta$ is already a function of $T$, conditioning on $T$ doesn't change anything: $E[g(T)\mid T]=g(T)=\hat\theta$ EXACTLY — so $\tilde\theta=\hat\theta$, with NO improvement (but also no worsening). A common error assumes Rao-Blackwellization must ALWAYS produce a STRICTLY better (lower MSE) estimator, expecting genuine improvement even when starting from an estimator that's already optimal-given-$T$ — the theorem's guarantee is "no worse," which includes the possibility of "exactly the same," not an unconditional promise of strict improvement.

**Example 3 (LO3 — Rao-Blackwellization as a practical improvement recipe)**: Given a crude, inefficient unbiased estimator (e.g. using just the FIRST observation $X_1$ alone to estimate a population mean, ignoring the rest of the sample) and knowing the sample MEAN $\bar{X}$ is sufficient for this parameter, explain how Rao-Blackwellization would improve this crude estimator. Computing $E[X_1\mid\bar{X}]$ (conditioning the crude estimator on the sufficient statistic $\bar{X}$) produces a NEW estimator that is GUARANTEED at least as good as $X_1$ alone (and, in this classic case, works out to be exactly $\bar{X}$ itself — a dramatic improvement over using just one observation) — demonstrating the theorem's practical value as a systematic improvement procedure, not merely an abstract inequality.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Theorem Requires Starting from an Already-Unbiased Estimator (Primitive P64: Conceptual Shift)

Work Example 1, explicitly emphasizing the theorem's precondition (unbiased $\hat\theta$) before its conclusion applies.

- **MC-1 hook**: check whether the theorem is correctly recognized as requiring an already-unbiased starting estimator, not a biased one.

### Teaching Action A02 — "No Greater Than" Allows for Exact Equality, Not Just Strict Improvement (Primitive P06: Contrast Pair)

Work Example 2, explicitly demonstrating the no-change case when $\hat\theta$ is already a function of $T$.

- **MC-2 hook**: this directly targets MC-2 (expecting the theorem to always guarantee strict improvement, rather than "no worse").

### Teaching Action A03 — Rao-Blackwellization as a Systematic Estimator-Improvement Recipe (reused procedure)

Work Example 3, demonstrating the practical improvement procedure on a genuinely crude starting estimator.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.70×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. State the Rao-Blackwell theorem's two key conclusions about $\tilde\theta=E[\hat\theta\mid T]$.
  2. Explain why the theorem requires $\hat\theta$ to already be unbiased before it applies.
  3. Explain what happens to Rao-Blackwellization when $\hat\theta$ is already a function of the sufficient statistic $T$.
  4. Explain, in one sentence, why Rao-Blackwellization is described as a "systematic improvement recipe" rather than an ad hoc technique.
- **P76 (Transfer Probe, mode = independence)**: "A statistician has constructed a simple but wasteful unbiased estimator for a Poisson rate parameter, using only the FIRST observation in a sample of size 50 (ignoring the other 49), and knows the sample total (or equivalently the sample mean) is a sufficient statistic for this parameter. (a) Explain why Rao-Blackwellizing this crude estimator — conditioning it on the sufficient statistic — is guaranteed to produce an estimator at least as good, and likely much better. (b) Explain why this guarantee doesn't require any new cleverness or insight about the specific problem, just the mechanical application of the theorem."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | THEOREM-APPLIED-STARTING-FROM-A-BIASED-ESTIMATOR-EXPECTING-UNBIASEDNESS | Attempting to apply the Rao-Blackwell theorem starting from a biased estimator, expecting the conclusion of unbiasedness despite the theorem's precondition not being met | Foundational |
| MC-2 | RAO-BLACKWELLIZATION-EXPECTED-TO-ALWAYS-PRODUCE-STRICT-IMPROVEMENT | Expecting Rao-Blackwellization to always strictly improve an estimator's MSE, rather than recognizing the theorem's "no greater than" guarantee allows for exact equality | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Theorem Applied Starting from a Biased Estimator Expecting Unbiasedness") → P41 (detect: check whether the starting estimator's unbiasedness is verified before applying the theorem) → P64 (conceptual shift: re-confirm the starting estimator $\hat\theta$ is genuinely unbiased before invoking the theorem's conclusion).
- **B02 (targets MC-2)**: P27 ("Rao-Blackwellization Expected to Always Produce Strict Improvement") → P41 (detect: present Example 2 and check whether strict improvement is (incorrectly) expected even when $\hat\theta$ is already a function of $T$) → P64 (conceptual shift: re-derive the no-change case explicitly, confirming the "no greater than" guarantee includes equality).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.stats.sufficient-statistic`, `math.stats.bias-variance`.
- **Unlocks**: none recorded in the KG.

## Component 8 — Teaching Notes

- difficulty = expert and bloom = analyze reflect the genuine theoretical sophistication of this theorem, synthesizing sufficiency and MSE concepts into a powerful general result.
- MC-1 was ranked Foundational because misapplying the theorem's precondition leads to an unjustified conclusion, while MC-2 was ranked Moderate as an overstatement of the theorem's guarantee that doesn't lead to a genuinely wrong estimator, just an incorrect expectation about the degree of improvement.
- The crude-first-observation-only transfer probe was deliberately chosen because it's the classic, maximally clear illustration of Rao-Blackwellization's practical power — starting from an almost absurdly wasteful estimator and mechanically deriving a dramatically better one.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.stats.sufficient-statistic`, `math.stats.bias-variance`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.70×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
