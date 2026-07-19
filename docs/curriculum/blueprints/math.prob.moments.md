# Teaching Blueprint: Moments (`math.prob.moments`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.prob.moments` |
| name | Moments |
| domain | Probability |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.prob.expected-value` |
| unlocks | `math.prob.mgf` |
| cross_links | none |
| CPA_entry_stage | C (Concrete) — a fair die roll's mean, before the general moment machinery |
| description (KG) | The kth moment of X is E[Xᵏ]; the kth central moment is E[(X−μ)ᵏ]. Skewness = E[(X−μ)³]/σ³; kurtosis = E[(X−μ)⁴]/σ⁴ − 3. Moments characterize distributions. |

## Component 1 — Learning Objectives

- LO1: Define the $k$th **moment** $E[X^k]$ and the $k$th **central moment** $E[(X-\mu)^k]$ (where $\mu=E[X]$), correctly distinguishing them — the first moment about the origin ($E[X]=\mu$ itself) vs. the first CENTRAL moment ($E[X-\mu]$, which is ALWAYS exactly zero for every random variable, by linearity of expectation) — and compute both for a simple discrete random variable.
- LO2: Compute **skewness** $=E[(X-\mu)^3]/\sigma^3$ and interpret its sign (positive = right-skewed, negative = left-skewed, zero = symmetric), correctly distinguishing a genuinely symmetric distribution (zero skewness) from one that merely looks roughly symmetric but has substantial nonzero skewness due to tail behavior.
- LO3 (orientation level — the concept's own unlocked child and further terminology): recognize the **moment generating function (MGF)** as a technique encoding ALL moments simultaneously into a single function, deferred to `math.prob.mgf`, and recognize **kurtosis** $=E[(X-\mu)^4]/\sigma^4-3$ at orientation level, understanding the "$-3$" as recalibrating the scale so $0$ represents the normal distribution's own baseline tail-heaviness.

## Component 2 — Prerequisite Check

Assumes mastery of `math.prob.expected-value` ($E[X]$, its computation for discrete and continuous random variables, and linearity of expectation).

## Component 3 — Core Explanation

**Moments vs. central moments — a structural distinction**: the $k$th moment $E[X^k]$ measures the random variable's behavior about the ORIGIN; the $k$th central moment $E[(X-\mu)^k]$ measures it about its OWN MEAN $\mu$. For $k=1$: the first moment is simply $E[X]=\mu$, while the first central moment is $E[X-\mu]=E[X]-\mu=\mu-\mu=0$ — ALWAYS exactly zero, for EVERY random variable, by linearity of expectation. This is a structural fact following directly from the definition of $\mu$, not a coincidence to check per distribution.

**Skewness measures asymmetry, sensitive to tails**: skewness $=E[(X-\mu)^3]/\sigma^3$ is a normalized third central moment. A distribution symmetric about its mean has skewness EXACTLY zero (every positive deviation is matched by an equal negative one, and cubing preserves sign, so the cubed deviations cancel). Because cubing amplifies large deviations, skewness is especially sensitive to TAIL behavior — a distribution whose "bulk" looks roughly symmetric can still have substantial nonzero skewness if it has even a modest but genuinely asymmetric tail.

**MGF and kurtosis (orientation level)**: the moment generating function $M(t)=E[e^{tX}]$ encodes EVERY moment simultaneously — its $k$th derivative at $t=0$ gives $E[X^k]$ directly ($M^{(k)}(0)=E[X^k]$), a technique fully developed in `math.prob.mgf`. Kurtosis's "$-3$" convention is not arbitrary: the normal distribution's own fourth standardized central moment $E[(X-\mu)^4]/\sigma^4$ equals EXACTLY $3$, so subtracting $3$ recalibrates the scale so kurtosis $=0$ represents normal-like tail-heaviness, positive means heavier tails than normal, and negative means lighter tails.

## Component 4 — Worked Examples

**Example 1 (LO1 — first moment vs. first central moment, breaking MC-1)**: for a fair die roll $X$ (values $1$–$6$, each probability $1/6$), $E[X]=3.5$ (the first moment, $\mu$). The first CENTRAL moment $E[X-\mu]=E[X]-\mu=3.5-3.5=0$ — this is ALWAYS zero for ANY random variable, by linearity of expectation ($E[X-\mu]=E[X]-\mu=\mu-\mu=0$ in general), not a special property of the die specifically. The "first moment" and "first central moment" are genuinely different quantities, with the central one trivially zero by construction for every random variable.

**Example 2 (LO2 — skewness sign and tail sensitivity, breaking MC-2)**: a random variable representing household income — most values cluster near a moderate level, but a small number of extremely high values create a long right tail. This produces POSITIVE skewness (the cubed deviations from the rare, very large values dominate the sum), even though the bulk of the distribution (excluding the tail) might look roughly symmetric to casual inspection. Contrast with a genuinely symmetric distribution like the fair die roll from Example 1: skewness $=0$ EXACTLY, since every deviation above the mean $\mu=3.5$ is matched by an equal deviation below it, and cubing preserves this cancellation.

**Example 3 (LO3, orientation level — MGF preview and the kurtosis "$-3$" convention)**: the moment generating function $M(t)=E[e^{tX}]$ encodes every moment: $M'(0)=E[X]$, $M''(0)=E[X^2]$, and so on — a single object from which any desired moment can be extracted by differentiation, fully developed in `math.prob.mgf`. Separately: the normal distribution's fourth standardized central moment $E[(X-\mu)^4]/\sigma^4$ equals exactly $3$ — so the kurtosis formula's "$-3$" is not an arbitrary adjustment, it recalibrates the scale so that $0$ specifically represents the normal distribution's own baseline, making kurtosis a measure of DEVIATION from normal tail-heaviness rather than an absolute, unanchored quantity.

## Component 5 — Teaching Actions

### Teaching Action A01 — The First Central Moment Is Always Zero, by Construction (Primitive P11: Representation Shift)

State: "the first central moment isn't something you compute and hope comes out small — it's EXACTLY zero for every random variable, because $\mu$ is defined as the value that makes this true." Work Example 1's general algebraic argument ($E[X-\mu]=E[X]-\mu=\mu-\mu=0$), not just the die-specific numeric check.

- **MC-1 hook**: ask "could a random variable have a nonzero first central moment, if its distribution happened to be unusual enough?" — a "yes" answer reveals MC-1 (missing that $E[X-\mu]=0$ is a structural fact true for every random variable, not a property some distributions might lack).

### Teaching Action A02 — Skewness Is Driven by Tails, Not the "Bulk" Appearance (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: an income distribution that looks roughly symmetric in its bulk still has substantial POSITIVE skewness, driven entirely by a small number of extreme high values whose cubed deviations dominate. State: "skewness doesn't care what most of the distribution looks like — it's especially sensitive to the tails, because cubing amplifies large deviations far more than small ones."

- **MC-2 hook**: ask "if a distribution's 'main body' looks roughly symmetric, must its skewness be close to zero?" — a "yes" answer reveals MC-2 (missing that even a modest but genuinely asymmetric tail can produce substantial nonzero skewness).

### Teaching Action A03 — Kurtosis's "$-3$" Recalibrates Against the Normal Distribution (Primitive P06: Contrast Pair)

Contrast a RAW fourth standardized central moment (which is always positive, with no natural zero point) against KURTOSIS specifically (which subtracts $3$, so $0$ means "normal-like tails"). State: "the $-3$ isn't decoration — it's there specifically because the normal distribution's own value is exactly $3$, so kurtosis measures how far a distribution's tails deviate from that baseline."

- **MC-3 hook**: ask "is the '$-3$' in the kurtosis formula an arbitrary adjustment with no particular meaning?" — a "yes" answer reveals MC-3 (missing that it specifically recalibrates the scale against the normal distribution's own baseline value).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. For a random variable $Y$ taking values $\{2,4,6\}$ each with probability $1/3$, compute $E[Y]$ (the first moment) and verify $E[Y-\mu]=0$ (the first central moment).
  2. Explain, in general terms (without computing a specific integral/sum), why $E[X-\mu]$ is ALWAYS exactly zero for any random variable $X$ with mean $\mu$.
  3. A dataset of exam scores is mostly clustered near $80$ but has a few very low outlier scores (near $20$). Predict the SIGN of this distribution's skewness, and explain your reasoning.
  4. Explain, referencing this lesson's preview, why the moment generating function is a useful single object to compute, rather than calculating each moment $E[X^k]$ separately from scratch.
- **P76 (Transfer Probe, mode = independence)**: "A city's household wealth distribution has most households clustered near a moderate value, but a small number of extremely wealthy households create a long right tail. (a) Predict the sign of this distribution's skewness, and justify your prediction using this lesson's tail-sensitivity discussion. (b) Explain why simply reporting the MEAN wealth might be misleading given this skewness, even though the mean is a perfectly well-defined statistic. (c) If a second, hypothetical city's wealth distribution had IDENTICAL mean and standard deviation to the first city, but was perfectly symmetric (no long tail), explain what this implies about the difference in the two cities' skewness values, even though their means and standard deviations match exactly."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | FIRST-CENTRAL-MOMENT-ASSUMED-VARIABLE | Believing a random variable could have a nonzero first central moment under unusual circumstances, missing that $E[X-\mu]=0$ is a structural fact true for every random variable | Foundational |
| MC-2 | SKEWNESS-JUDGED-BY-BULK-APPEARANCE | Believing a distribution whose "main body" looks roughly symmetric must have near-zero skewness, missing that skewness is especially sensitive to tail behavior | High |
| MC-3 | KURTOSIS-MINUS-3-ASSUMED-ARBITRARY | Believing the "$-3$" in the kurtosis formula is an arbitrary adjustment, missing that it specifically recalibrates the scale against the normal distribution's own baseline fourth standardized central moment | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "First Central Moment Assumed Variable") → P41 (detect: ask whether a random variable could have a nonzero first central moment) → P64 (conceptual shift: re-walk Example 1's general algebraic argument, re-anchoring on "$E[X-\mu]=0$ is forced by the definition of $\mu$ itself, for every random variable").
- **B02 (targets MC-2)**: P27 (name it: "Skewness Judged by Bulk Appearance") → P41 (detect: ask whether a roughly-symmetric-looking distribution must have near-zero skewness) → P64 (conceptual shift: re-walk Example 2's income-distribution case, re-anchoring on "skewness is driven by tails, which cubing amplifies far more than the bulk of the distribution").
- **B03 (targets MC-3)**: P27 (name it: "Kurtosis Minus 3 Assumed Arbitrary") → P41 (detect: ask whether the "$-3$" in the kurtosis formula is an arbitrary adjustment) → P64 (conceptual shift: re-walk Example 3's normal-distribution baseline fact, re-anchoring on "the $-3$ recalibrates the scale so 0 means normal-like tails").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.prob.expected-value` ($E[X]$ and linearity of expectation, the foundation this concept's entire moment machinery builds on).
- **Unlocks**: `math.prob.mgf` (will fully develop the moment generating function previewed at orientation level in LO3; not yet authored).
- **Cross-link**: KG lists no cross_links for this concept (checked via `ls docs/curriculum/blueprints/` before setting P76_mode — none to check). $P76_{mode}=$ **independence**.

## Component 8 — Teaching Notes

- estimated_hours = 4 with a proficient/apply tag supports the "3 TAs + gate" tier, with LO1 and LO2 at full computational/conceptual depth (the general first-central-moment argument and the skewness tail-sensitivity discussion) and LO3 kept orientation-level, appropriately deferring the MGF's full development to this concept's own unlocked child.
- **Division of labor**: `math.prob.expected-value` owns $E[X]$ itself and linearity of expectation; this concept owns the SPECIALIZATION into moments, central moments, skewness, and (at orientation level) kurtosis and the MGF — deliberately proving the first-central-moment-is-always-zero fact GENERALLY (via linearity of expectation) rather than merely checking it numerically for one example, since the generality of that fact is itself the point being taught.
- Example 2's income-distribution scenario was chosen deliberately over a purely abstract numerical example because skewness's practical importance (a statistic that mean/variance alone cannot capture) is best motivated by a case where the mean could otherwise be misleading — directly setting up the P76 transfer probe's follow-up question about mean-reporting caveats.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (no cross_links listed → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: a fair die roll's mean before the general moment machinery) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
