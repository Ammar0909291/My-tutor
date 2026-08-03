# Teaching Blueprint: Credible Interval (`math.stats.credible-interval`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.stats.credible-interval` |
| name | Credible Interval |
| domain | Statistics |
| difficulty | expert |
| bloom | evaluate |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 4 |
| requires | `math.stats.bayesian-inference` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | A 95% credible interval [a,b] satisfies P(θ∈[a,b]|data)=0.95. Unlike frequentist CI, this is a direct probability statement about the parameter. Highest Posterior Density (HPD) intervals are narrowest credible intervals.

 |

## Component 1 — Learning Objectives

- LO1: Define a 95% CREDIBLE interval $[a,b]$ as satisfying $P(\theta\in[a,b]\mid\text{data})=0.95$ — a DIRECT probability statement about where the parameter $\theta$ itself likely lies, GIVEN the observed data and the posterior distribution (from `math.stats.bayesian-inference`).
- LO2: Contrast this DIRECT interpretation against `math.stats.confidence-interval`'s INDIRECT (frequentist) interpretation — a credible interval genuinely says "there's a 95% probability $\theta$ is in this range," while a confidence interval's 95% refers to the PROCEDURE's long-run capture rate, NEVER a direct probability statement about the specific computed interval containing the fixed $\theta$.
- LO3: Recognize the HIGHEST POSTERIOR DENSITY (HPD) interval as the NARROWEST possible credible interval at a given confidence level — for a given posterior distribution, MULTIPLE different intervals could each achieve "95% probability containing $\theta$," but the HPD interval is specifically the SHORTEST one among all these valid options (achieved by including only the highest-density regions of the posterior).

## Component 2 — Prerequisite Check

Assumes mastery of `math.stats.bayesian-inference` — the credible interval is constructed directly from the posterior distribution this framework produces.

## Component 3 — Core Explanation

A 95% **credible interval** $[a,b]$ satisfies $P(\theta\in[a,b]\mid\text{data})=0.95$ — a DIRECT probability statement: given the observed data (and the resulting posterior distribution), there's a genuine 95% probability that $\theta$ itself lies within this specific range.

This CONTRASTS sharply with `math.stats.confidence-interval`'s frequentist interpretation. A 95% confidence interval's "95%" refers to the PROCEDURE's long-run behavior across HYPOTHETICAL repeated sampling — 95% of intervals CONSTRUCTED this way (across many hypothetical repetitions) would contain the TRUE (fixed) $\theta$. It is NEVER a direct probability statement about the SPECIFIC computed interval containing $\theta$ (since in the frequentist framework, $\theta$ is a fixed constant — it's either IN the specific interval or NOT, with no meaningful "probability" attached to that already-determined fact). The credible interval's direct-probability interpretation is a genuine advantage some find more intuitive, but it comes with the philosophical commitment of treating $\theta$ as random (per `math.stats.bayesian-inference`'s core framework).

For a given posterior distribution and confidence level, MULTIPLE different intervals could each satisfy the "$P(\theta\in\text{interval})=0.95$" requirement (e.g. different choices of how much probability to leave in each tail). The **Highest Posterior Density (HPD)** interval is specifically the NARROWEST such interval — achieved by including exactly the regions of highest posterior density until the desired probability (e.g. 95%) is accumulated, guaranteeing the SHORTEST possible interval at that confidence level.

## Component 4 — Worked Examples

**Example 1 (LO1 — the direct probability interpretation, breaking MC-1)**: For a posterior distribution on a proportion $p$ giving a 95% credible interval of $[0.3,0.5]$, state precisely what this means. It means: given the observed data, there is a 95% probability that the TRUE proportion $p$ lies between 0.3 and 0.5. A common error interprets this the SAME way one would (incorrectly) interpret a frequentist confidence interval — as "if we repeated this experiment many times, 95% of such intervals would contain $p$" — this describes the WRONG (frequentist procedural) framing; the credible interval's actual meaning is a DIRECT probability statement about $\theta$ itself, given THIS specific data, not a claim about hypothetical repetitions.

**Example 2 (LO2 — credible vs. confidence interval interpretation, breaking MC-2)**: Contrast the interpretations of a 95% credible interval $[a,b]$ and a 95% confidence interval $[c,d]$ for the SAME parameter from the SAME data. Credible interval: "$P(\theta\in[a,b]\mid\text{data})=0.95$" — directly about $\theta$'s likely location. Confidence interval: "if this exact procedure were repeated many times with fresh data, 95% of the resulting intervals would contain the TRUE $\theta$" — a statement about the PROCEDURE's long-run behavior, not this specific interval. A common error asserts BOTH intervals mean the "same thing," just derived via different computational methods — they represent genuinely DIFFERENT probability claims arising from fundamentally different statistical philosophies (Bayesian vs. frequentist), even though they sometimes produce numerically similar bounds in practice.

**Example 3 (LO3 — HPD as the narrowest credible interval, breaking MC-3-merged)**: For a SYMMETRIC (unimodal, bell-shaped) posterior distribution, explain why the HPD interval and the "EQUAL-TAILED" credible interval (leaving 2.5% probability in each tail) happen to COINCIDE, while for a SKEWED (asymmetric) posterior, they would GENERALLY DIFFER. For a symmetric posterior, the highest-density region naturally forms a SYMMETRIC interval around the center — matching the equal-tailed approach exactly. For a SKEWED posterior, the highest-density region is NOT symmetric (it favors the "peak" side more than the "long tail" side) — the HPD interval would be NARROWER than the equal-tailed interval by deliberately excluding some low-density regions near one tail while including slightly more of the high-density region near the peak. A common error assumes the equal-tailed credible interval is ALWAYS identical to the HPD interval regardless of the posterior's shape — this coincidence is SPECIFIC to symmetric posteriors and does NOT generalize to genuinely skewed ones.

## Component 5 — Teaching Actions

### Teaching Action A01 — Credible Interval Is a Direct Probability Statement About θ (Primitive P64: Conceptual Shift)

Work Example 1, explicitly stating the correct direct-probability interpretation and contrasting with the incorrect procedural framing.

- **MC-1 hook**: this directly targets MC-1 (interpreting a credible interval using frequentist procedural language rather than its correct direct-probability meaning).

### Teaching Action A02 — Credible vs. Confidence Interval: Genuinely Different Probability Claims (Primitive P06: Contrast Pair)

Work Example 2, explicitly contrasting the two interval types' interpretations side by side.

- **MC-2 hook**: this directly targets MC-2 (treating credible and confidence intervals as interchangeable, meaning "the same thing").

### Teaching Action A03 — HPD Coincides with Equal-Tailed Only for Symmetric Posteriors (reused procedure)

Work Example 3, explicitly demonstrating when the two interval-construction methods agree versus diverge.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.75×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. State the precise direct-probability interpretation of a 90% credible interval $[0.4,0.6]$ for a proportion.
  2. Explain, in one sentence, the key interpretive difference between a credible interval and a confidence interval.
  3. Explain why the HPD interval and the equal-tailed credible interval coincide for a symmetric posterior but generally differ for a skewed one.
  4. Explain why the HPD interval is described as the "narrowest" credible interval at a given confidence level.
- **P76 (Transfer Probe, mode = independence)**: "A biologist estimates a species' true population growth rate using Bayesian methods, obtaining a genuinely SKEWED posterior distribution (since growth rates can't be negative but can be arbitrarily large, producing a long right tail), and needs to report a 95% interval for this rate. (a) Explain why choosing the HPD interval, rather than the simpler equal-tailed interval, would produce a genuinely narrower and more informative range given this skewed posterior. (b) Explain what the resulting 95% HPD interval would directly tell other researchers about the true growth rate, in a way a frequentist confidence interval technically would not."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | CREDIBLE-INTERVAL-INTERPRETED-USING-FREQUENTIST-PROCEDURAL-LANGUAGE-INSTEAD-OF-DIRECT-PROBABILITY | Interpreting a credible interval using frequentist "repeated sampling" procedural language, rather than its correct direct-probability-about-θ meaning | Foundational |
| MC-2 | CREDIBLE-AND-CONFIDENCE-INTERVALS-TREATED-AS-INTERCHANGEABLE-MEANING-THE-SAME-THING | Treating credible intervals and confidence intervals as interchangeable, meaning the same underlying probability claim despite arising from different statistical philosophies | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Credible Interval Interpreted Using Frequentist Procedural Language Instead of Direct Probability") → P41 (detect: present Example 1 and check whether the interpretation uses frequentist repeated-sampling language) → P64 (conceptual shift: re-state the direct-probability interpretation explicitly, connecting to the posterior distribution it's derived from).
- **B02 (targets MC-2)**: P27 ("Credible and Confidence Intervals Treated as Interchangeable Meaning the Same Thing") → P41 (detect: present Example 2 and check whether the two interval types are (incorrectly) treated as equivalent) → P64 (conceptual shift: re-contrast the two interpretations explicitly side by side, connecting to `math.stats.bayesian-inference`'s framework distinction).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.stats.bayesian-inference`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.stats.confidence-interval` (the contrasting frequentist counterpart).
- **Parent**: `math.stats.bayesian-inference`.

## Component 8 — Teaching Notes

- difficulty = expert and bloom = evaluate reflect that correctly articulating the philosophical distinction from confidence intervals requires genuine evaluative reasoning, not just computation.
- Both misconceptions were ranked Foundational because each reflects the single most common and consequential misinterpretation in the entire Bayesian-vs-frequentist distinction, mirroring `math.stats.bayesian-inference`'s own core contrast.
- The skewed-population-growth-rate transfer probe was deliberately chosen because a genuinely skewed posterior (a realistic scenario for naturally-bounded quantities like growth rates) makes the HPD-vs-equal-tailed distinction concretely consequential rather than a purely theoretical curiosity.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.stats.bayesian-inference`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.75×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
