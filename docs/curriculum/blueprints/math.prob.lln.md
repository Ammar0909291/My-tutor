<!-- BLUEPRINT: math.prob.lln -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Law of Large Numbers
**Concept ID:** `math.prob.lln`
**KG Fields:** difficulty=expert | bloom=understand | estimated_hours=6 | mastery_threshold=0.85

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.prob.lln |
| name | Law of Large Numbers |
| difficulty | expert |
| bloom | understand |
| estimated_hours | 6 |
| mastery_threshold | 0.85 |
| CPA_entry_stage | C (Concrete) |
| requires (Tier-1) | math.prob.chebyshev, math.prob.independence |
| cross_links | (none) |
| P76_mode | independence |
| MAMR | 5/5 (⌈0.85 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.prob.chebyshev**: P(\|X−μ\|≥kσ)≤1/k² — the exact tool used to prove the weak LLN, bounding how far the sample mean can stray from μ
- **math.prob.independence**: P(A∩B)=P(A)P(B) — LLN's hypothesis requires the trials to be independent (and identically distributed); Var(sample mean) shrinks with n precisely because independence lets variances add rather than compound

### Target Knowledge State
Student can state the Law of Large Numbers (for iid random variables with finite mean μ, the sample mean $\bar X_n$ converges to μ as $n\to\infty$) and distinguish its two forms (weak: convergence in probability; strong: almost sure convergence) as a LIMITING statement, never a claim that $\bar X_n$ equals μ exactly at any finite n; correctly reject the "gambler's fallacy" (the folk belief that past imbalance makes an opposite outcome "due" to restore balance) and explain that LLN works by DILUTION of past imbalance through future averaging, not compensation; and sketch how Chebyshev's inequality is used to prove the weak LLN, connecting the two prerequisite concepts directly.

### Conceptual Obstacles
1. Believing LLN guarantees the sample mean will EQUAL μ exactly (or "settle down to" μ precisely) after enough trials — LLN is a statement about a LIMIT as $n\to\infty$; at any finite, however large, n, $\bar X_n$ is still a random variable that can differ from μ, just increasingly unlikely to differ by much
2. The gambler's fallacy — believing that after a run of one outcome (e.g. several heads in a row), the opposite outcome becomes "due" to balance the average; this fundamentally misunderstands the MECHANISM of LLN, which works by future draws diluting the RELATIVE weight of past imbalance in the running average, never by future draws compensating or being influenced by past ones (coin flips have no memory)
3. Conflating the weak LLN (convergence in probability: for every ε>0, $P(|\bar X_n-\mu|\ge\epsilon)\to0$) with the strong LLN (almost sure convergence: $P(\lim_{n\to\infty}\bar X_n=\mu)=1$) as identical statements — they are different, non-equivalent modes of convergence, with SLLN making the stronger claim

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | LLN-MEANS-EVENTUAL-EXACT-EQUALITY | Student believes the sample mean will exactly equal (or become indistinguishable from) μ after "enough" trials, treating LLN as a finite-n guarantee rather than a limiting statement | Any question asking "will the sample mean eventually equal μ" or "how many trials until it equals μ" |
| MC-2 | GAMBLERS-FALLACY | Student believes a run of one outcome makes the opposite outcome more likely on the NEXT trial, to "balance out" the average; misunderstands LLN as working via compensation rather than dilution | Any streak scenario (several heads in a row; "is tails due now?") |
| MC-3 | WEAK-STRONG-LLN-IDENTICAL | Student treats "converges in probability" and "converges almost surely" as the same claim, unable to state what distinguishes the weak and strong forms | Any question asking to distinguish WLLN from SLLN |

**Foundational Misconception:** MC-1 (LLN-MEANS-EVENTUAL-EXACT-EQUALITY) — it corrupts the entire logical content of the theorem (a genuine LIMIT statement) into a false finite-time guarantee, and it is the misconception that MC-2 (gambler's fallacy) directly springs from: a student who thinks the sample mean must reach μ exactly will naturally look for some mechanism (like compensating future outcomes) to explain HOW that exact convergence is achieved, when in reality no such mechanism exists — the convergence is purely a dilution effect with zero compensation.

---

## Component 3 — Scaffolding Protocol

**Entry point:** C (Concrete) — expert learner simulates/tabulates a running sample mean numerically across many coin flips, watching it approach 0.5 without ever needing to compensate for early imbalance, before the general theorem is stated.

**Scaffolding sequence:**
1. **A01 P11 REPRESENTATION SHIFT** — C: a running average table for repeated fair-coin flips, showing dilution (not compensation) in action; P: a shrinking-envelope-around-μ diagram; A: WLLN and SLLN stated formally, and the Chebyshev-based proof sketch of WLLN
2. **A02 P06 CONTRAST PAIR** — a finite, still-imperfect sample mean vs. the limiting claim (MC-1); dilution vs. the gambler's fallacy's compensation myth (MC-2); convergence in probability vs. almost sure convergence, stated side by side (MC-3)
3. **A03 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — Dilution, Not Compensation: Watching the Sample Mean Settle

**Primitive:** P11 REPRESENTATION SHIFT
**Purpose:** Show numerically how early imbalance gets DILUTED (not corrected) by later draws; state WLLN/SLLN formally; sketch the Chebyshev-based proof connecting both prerequisite concepts

---

**[P11 — REPRESENTATION SHIFT]**

**Stage C — Concrete (running average after a streak of heads, fair coin, H=1, T=0):**

Suppose the first 5 flips are all heads: running sum = 5, running mean $\bar X_5 = 5/5 = 1$ (badly off from $\mu=0.5$).

Continue flipping FAIRLY (no compensation, each flip still an independent 50/50 draw) — suppose the next 95 flips land heads roughly half the time, say 48 heads and 47 tails:

$$\bar X_{100} = \frac{5 + 48}{100} = \frac{53}{100} = 0.53$$

Much closer to 0.5, NOT because the coin "owed" any tails to fix the early streak (it has no memory — each flip is still independently 50/50), but because the initial imbalance (5 heads, 0 tails — 100% heads) is now just 5 out of 100 flips, and the other 95 flips (behaving normally) DILUTE that early anomaly's weight in the average. If flipping continued to 10,000 total flips, that same initial streak of 5 would contribute a vanishingly small fraction of the total, and the average would sit even closer to 0.5.

**Stage P — Pictorial (a shrinking envelope, not a homing-in mechanism):**

```
  X̄ₙ
   1.0┤●
      │  ●
      │    ●
   0.5┤┄┄┄┄┄●┄┄┄●┄┄●┄┄┄●┄●┄●┄●┄●┄●┄●┄●┄●┄●┄  ← envelope narrows around μ
      │              (width shrinking as n grows,
   0.0┤               via Chebyshev's bound on Var(X̄ₙ))
      └────────────────────────────────────→ n
       small n: X̄ₙ can be far from μ
       large n: X̄ₙ very likely close to μ (but never GUARANTEED equal)
```

**Stage A — Abstract (WLLN, SLLN, and the Chebyshev-based proof sketch):**

**Weak Law of Large Numbers (WLLN):** For iid $X_1,\ldots,X_n$ with $E[X_i]=\mu$ (finite), the sample mean $\bar X_n = \frac1n\sum X_i$ converges IN PROBABILITY to μ: for every $\epsilon>0$, $P(|\bar X_n-\mu|\ge\epsilon)\to0$ as $n\to\infty$.

**Strong Law of Large Numbers (SLLN):** Under the same hypotheses, $\bar X_n$ converges ALMOST SURELY to μ: $P\left(\lim_{n\to\infty}\bar X_n = \mu\right)=1$ — a stronger, sample-path-level claim (with probability 1, the ENTIRE sequence of running averages, not just each individual n, eventually settles at μ).

**Proof sketch of WLLN via Chebyshev:** By independence, $\text{Var}(\bar X_n) = \text{Var}\left(\frac1n\sum X_i\right) = \frac{1}{n^2}\sum\text{Var}(X_i) = \frac{\sigma^2}{n}$ (variances of independent variables add; dividing by $n^2$ from the averaging). Apply Chebyshev's inequality to $\bar X_n$ (mean μ, variance $\sigma^2/n$): for any $\epsilon>0$,
$$P(|\bar X_n-\mu|\ge\epsilon) \le \frac{\text{Var}(\bar X_n)}{\epsilon^2} = \frac{\sigma^2}{n\epsilon^2} \to 0 \text{ as } n\to\infty.$$
This is exactly WLLN — the proof uses independence (to make variances add instead of compound) and Chebyshev (to convert a shrinking variance into a shrinking probability bound), precisely the two prerequisite concepts.

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** After 10 fair coin flips, all 10 are heads ($\bar X_{10}=1$). A friend says: "The next 10 flips are more likely to be mostly tails, to balance things out." Evaluate this claim, and state what LLN actually predicts will happen to the running average as MANY more flips are added (not specifically the next 10).

**CORRECT:** The friend's claim is the gambler's fallacy and is FALSE — each future flip remains an independent, memoryless 50/50 event; the next 10 flips are exactly as likely to be any particular mix as any other 10 fair flips, with no bias toward tails. What LLN actually predicts: as the TOTAL number of flips grows very large (not just the next 10), the running average will very likely drift close to 0.5, not because future flips compensate, but because the fixed count of 10 early heads becomes a shrinking FRACTION of an ever-growing total.
→ "Correct — the key distinction is between 'the next few flips are biased to compensate' (false) and 'the LONG-RUN average dilutes the early imbalance' (true, and what LLN actually says)." → Proceed to A02.

**PARTIAL:** Student correctly rejects the friend's claim but cannot explain WHY the average still ends up near 0.5 eventually, or vaguely says "it evens out" without the dilution mechanism.
→ "Precisely: the coin has no memory, so no compensation occurs. What DOES happen is arithmetic, not physics: if the 10 heads are followed by $N$ more roughly-fair flips, the running average is $(10 + \text{about } N/2)/(10+N)$, which approaches $1/2$ as $N$ grows — not because anything is 'owed,' but because the fixed 10 becomes an ever-smaller fraction of the ever-larger denominator."

**INCORRECT:** Student agrees with the friend that tails is "due" (MC-2).
→ "Coin flips are independent — the coin does not know or care about its own past results. Each flip has exactly a 50% chance of heads regardless of the preceding streak (however long). The average returning toward 0.5 over many MORE flips happens through DILUTION (a large number of future normal flips outweighs a small number of past unusual ones in the average), never through any future flip 'compensating' for a past one."

**NO_RESPONSE:** → "The friend's claim (gambler's fallacy) is false — flips are independent and memoryless. LLN instead predicts that as many MORE flips are added, the running average drifts toward 0.5 through dilution: the fixed 10-head streak becomes a smaller and smaller fraction of the growing total, not because future flips compensate for it."

---

### Teaching Action A02 — Limit, Not Equality; Weak vs. Strong

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Break MC-1 by contrasting a finite (still imperfect) sample mean against the genuine limiting claim; break MC-3 by stating WLLN and SLLN side by side with their distinct convergence modes

---

**[P06 — CONTRAST PAIR]**

**Contrast 1 — "$\bar X_n$ gets close to μ" vs. "$\bar X_n$ equals μ" (MC-1):**

| Claim | True? |
|-------|-------|
| As $n\to\infty$, $\bar X_n$ converges to μ (in probability / almost surely) | **TRUE** — this is exactly WLLN/SLLN |
| At some large but FINITE $n$ (say $n=10^6$), $\bar X_n$ will EQUAL μ exactly | **FALSE** — $\bar X_n$ remains a genuine random variable at every finite n; it can (with shrinking but always positive probability) still differ from μ, even after a million trials |
| "Eventually the sample mean settles down and stops changing" | **FALSE, literally** — $\bar X_n$ keeps changing with every new observation (a new flip always shifts the running average by some nonzero, if tiny, amount); what "settles" is the PROBABILITY of being far from μ, shrinking toward 0 — not the value itself becoming static |

Chebyshev's bound from A01 makes this precise: $P(|\bar X_n-\mu|\ge\epsilon)\le\sigma^2/(n\epsilon^2)$ shrinks toward 0 as $n$ grows, for ANY fixed $\epsilon>0$ — but it is never exactly 0 at any finite n (only in the limit). "Very likely close" and "very likely far from an occasional exact value" are compatible with "never guaranteed exactly equal."

**Contrast 2 — Weak LLN vs. Strong LLN, stated side by side (MC-3):**

| | Weak LLN | Strong LLN |
|---|----------|-----------|
| Convergence type | In probability | Almost surely |
| Formal statement | $\forall\epsilon>0: P(\|\bar X_n-\mu\|\ge\epsilon)\to0$ | $P\left(\lim_{n\to\infty}\bar X_n=\mu\right)=1$ |
| What it says | For each LARGE $n$, being far from μ is unlikely | The ENTIRE random sequence of running averages, viewed as one infinite path, converges to μ with probability 1 |
| Relative strength | Weaker (a statement about each $n$ separately) | Stronger (a statement about the whole infinite sequence at once; SLLN implies WLLN, not conversely in general) |

The two are genuinely different modes of convergence (a technical distinction developed fully in real analysis); the practical takeaway for this concept is that they are NOT interchangeable restatements of the same idea — "weak" and "strong" name a real difference in what is being claimed, not just a difference in how confident the claim sounds.

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** (a) Is the statement "for n=1,000,000 fair coin flips, $\bar X_n$ is guaranteed to be exactly 0.5" implied by LLN? (b) State in one sentence what WLLN claims that is different from "$\bar X_n$ will equal μ."

**CORRECT:** (a) No — LLN never guarantees exact equality at any finite n; it guarantees the PROBABILITY of being far from 0.5 shrinks as n grows, not that $\bar X_n$ hits 0.5 exactly (in fact, for a million coin flips, $\bar X_n=0.5$ exactly requires exactly 500,000 heads, a specific, non-certain outcome among many possible close-but-not-exact outcomes). (b) WLLN claims the PROBABILITY that $\bar X_n$ differs from μ by at least any fixed amount ε shrinks toward 0 as n grows — a statement about probabilities converging, not about the value $\bar X_n$ itself becoming exactly μ.
→ "Correct — (b) captures the essential distinction: it's the PROBABILITY of a large deviation that vanishes, not the deviation itself becoming impossible." → Proceed to A03.

**PARTIAL:** Student answers (a) correctly but in (b) restates "WLLN says the sample mean gets close to μ" without noting the probabilistic (not certain) nature of "close."
→ "Be more precise: WLLN doesn't say $\bar X_n$ IS close to μ for large n — it says being FAR from μ becomes increasingly UNLIKELY (a statement about the probability, which shrinks) as n grows. There is always some chance, however small, of an unusual run of outcomes keeping $\bar X_n$ far from μ even at large n; WLLN only guarantees that chance shrinks toward zero, not that it hits zero for any finite n."

**INCORRECT:** Student answers (a) "yes, with a million flips it will average out to exactly 0.5" (MC-1).
→ "Exactly 500,000 heads out of 1,000,000 flips is one specific outcome among an enormous number of nearly-as-likely outcomes (499,900 heads, 500,200 heads, etc.) — there is no guarantee of hitting that exact number. What LLN guarantees is that outcomes far from 500,000 heads (say, fewer than 400,000 or more than 600,000) become extremely UNLIKELY as the number of flips grows, not that the exact halfway point is reached."

**NO_RESPONSE:** → "(a) No — LLN never guarantees exact equality at any finite n, only that large deviations become unlikely as n grows. (b) WLLN claims the PROBABILITY of $\bar X_n$ differing from μ by at least ε shrinks to 0 as n→∞ — a statement about probability, not about the value itself becoming exactly μ."

---

### Teaching Action A03 — Mastery Gate (P91)

**Primitive:** P91 = P77→P55→P76→P55→P75→P55→P74→P55→P78
**Purpose:** Assess the limit-vs-equality distinction, rejection of the gambler's fallacy, and weak/strong LLN discrimination under transfer

---

**[P77 — MULTI-PROBLEM SET]** *(4 problems)*

**Problem 1:** True or false: "LLN guarantees that after enough trials, the sample mean will never again differ from μ." Justify.

*Solution:* **False.** LLN guarantees the PROBABILITY of a large deviation shrinks toward 0 as n grows — it does not make deviation impossible at any finite n, and $\bar X_n$ remains a random variable that fluctuates with every new observation.

**Problem 2:** A roulette wheel has landed on red 8 times in a row. Using LLN correctly, explain what (if anything) this implies about the next spin.

*Solution:* Nothing about the next spin specifically — each spin is independent, so the probability of red on the 9th spin is unchanged by the streak (assuming a fair, memoryless wheel). LLN concerns the LONG-RUN average over many future spins converging toward the true probability, achieved through dilution of the streak's weight over a growing total, not through any bias on the very next spin.

**Problem 3:** State one difference between the weak and strong Law of Large Numbers.

*Solution:* WLLN is convergence in probability (for each fixed ε, $P(|\bar X_n-\mu|\ge\epsilon)\to0$); SLLN is almost sure convergence (the entire infinite sequence of sample means converges to μ with probability 1) — a strictly stronger mode of convergence.

**Problem 4:** Using the Chebyshev-based proof sketch, explain why independence of the $X_i$ is essential to the WLLN proof (what would fail if the trials were NOT independent?).

*Solution:* Independence is what makes $\text{Var}(\bar X_n)=\sigma^2/n$ (variances of independent variables simply add before dividing by $n^2$). Without independence, $\text{Var}\left(\sum X_i\right)$ would include covariance terms ($\sum_{i\ne j}\text{Cov}(X_i,X_j)$) that need not vanish or shrink, so $\text{Var}(\bar X_n)$ might not shrink toward 0 as n grows — breaking the Chebyshev argument that the deviation probability vanishes.

---

**[P55 — SCORE]**
Count correct responses. Record raw score S₁ (0–4) after P77.

---

**[P76 — TRANSFER PROBE]** *(P76_mode: independence)*

**Prompt:** A casino advertises: "Over millions of hands, the house edge guarantees our profits, even though any single customer might win big." 

(a) Using LLN correctly, explain the sense in which this statement is TRUE, and identify precisely which quantity is converging to what.
(b) A skeptical customer argues: "If the casino is so sure about the long-run average, that means each individual hand's outcome must be somewhat rigged toward the house, to guarantee that average." Explain precisely why this reasoning is wrong, connecting it to the gambler's fallacy / dilution distinction from A01.
(c) Suppose the casino's per-hand expected profit is $\mu = \$0.50$ (a small positive edge) with per-hand standard deviation $\sigma=\$50$ (payouts are volatile). Using the WLLN proof sketch (Chebyshev + independence), explain qualitatively why the casino's AVERAGE profit per hand becomes very predictable over millions of hands, even though $\sigma$ is 100 times larger than $\mu$.

**Expected solution:**

(a) The statement is true in the LLN sense: letting $X_i$ be the casino's profit on hand $i$ (independent across hands, identically distributed with mean $\mu>0$, the house edge), the AVERAGE profit per hand, $\bar X_n$, converges (in probability, and almost surely) to $\mu$ as the number of hands $n$ grows very large. This says nothing about any single hand (which remains highly variable, and any one customer can indeed win big) — it is a statement about the LONG-RUN AVERAGE across an enormous number of hands converging to the fixed per-hand edge $\mu$.

(b) The customer's reasoning is the gambler's-fallacy error in reverse: assuming a reliable long-run average requires SOME individual-hand mechanism enforcing it (rigging). In fact, exactly as in A01's coin-flip dilution argument, no single hand needs any bias at all — each hand is independently drawn from the SAME distribution (with its small positive mean $\mu$ and possibly wildly variable outcome), and the reliability of the LONG-RUN average emerges purely from AVERAGING many independent, unbiased-per-hand draws, never from adjusting or rigging any individual outcome. The casino's guaranteed long-run profit is a consequence of large numbers diluting the variability of any specific hand, not evidence of hand-by-hand manipulation.

(c) By the WLLN proof sketch, $\text{Var}(\bar X_n) = \sigma^2/n = 2500/n$ (using $\sigma=50$). Even though a SINGLE hand's outcome has huge relative variability compared to its tiny mean ($\sigma/\mu = 100$), the variance of the AVERAGE shrinks as $1/n$ — so after, say, $n=10,000,000$ hands, $\text{Var}(\bar X_n) = 2500/10{,}000{,}000 = 0.00025$, giving a standard deviation of the AVERAGE of about $\$0.016$ — tiny compared to the mean edge of $\$0.50$. The key insight is that dividing by $n$ (from averaging) shrinks the variance of the average much faster than any single hand's inherent volatility would suggest, precisely because Chebyshev's bound (using this shrinking variance) forces the probability of the average straying far from $\mu$ toward 0 — independence is what allowed the variance to shrink as $\sigma^2/n$ in the first place, rather than staying large due to correlated outcomes.

---

**[P55 — SCORE]**
Record transfer score S₂ (0 or 1) after P76.

Total score S = S₁ + S₂ (max 5).

---

**[P75 — MASTERY ASSESSMENT]**

MAMR: 5/5 (⌈0.85 × 5⌉ = ⌈4.25⌉ = 5)

- S ≥ 5: MASTERY ACHIEVED → proceed to P74
- S = 4: NEAR MASTERY → attempt repair on missed items; re-gate at next session
- S ≤ 3: MASTERY NOT ACHIEVED → execute Protocol B

---

**[P55 — SCORE]**
Record mastery determination (ACHIEVED / NEAR / NOT ACHIEVED).

---

**[P74 — ROUTING DECISION]**

- MASTERY ACHIEVED → unlock math.prob.clt; record completion
- NEAR MASTERY → flag for Protocol B on specific missed item(s); re-assess next session
- MASTERY NOT ACHIEVED → execute Protocol B immediately

---

**[P55 — SCORE]**
Record routing outcome.

---

**[P78 — COMPLETION]**

Session record: concept math.prob.lln assessed. Mastery status logged. Student directed to next concept or repair protocol per P74 routing.

---

## Component 5 — Protocol B (Misconception Repair)

### Repair Action B01 — LLN-MEANS-EVENTUAL-EXACT-EQUALITY (MC-1)

**[P27 — MISCONCEPTION NAMING]**
"Believing the sample mean must eventually equal μ exactly is LLN-MEANS-EVENTUAL-EXACT-EQUALITY. LLN is a LIMIT statement — the PROBABILITY of a large deviation shrinks to 0, but the sample mean remains a genuine random variable at every finite n, never guaranteed to hit μ exactly."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "After a billion fair coin flips, will the sample mean equal exactly 0.5?"
- MC-1 response: "Yes, with that many flips it must equal 0.5 exactly."

**[P64 — CONCEPTUAL SHIFT]**
"Exactly 500 million heads out of a billion flips is one specific outcome among an astronomically large number of nearly-as-likely alternatives (500,000,001 heads, 499,999,998 heads, etc.) — there's no mechanism forcing that exact count. What LLN guarantees is that the PROBABILITY of the sample mean being far from 0.5 (say, off by more than 0.001) becomes extremely small as the flip count grows — 'extremely likely close' is compatible with 'never certain to be exact.'"

Practice: State, using Chebyshev's bound (Var(X̄ₙ)=σ²/n), what happens to the bound on P(|X̄ₙ−μ|≥0.01) as n grows from 100 to 100,000,000 — does the bound ever reach exactly 0?

---

### Repair Action B02 — GAMBLERS-FALLACY (MC-2)

**[P27 — MISCONCEPTION NAMING]**
"Believing a streak makes the opposite outcome 'due' is GAMBLERS-FALLACY. LLN works through DILUTION (a shrinking streak's weight as the total grows), never through compensation (independent trials have no memory of past outcomes)."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "A fair coin has landed heads 6 times in a row. Is tails more likely on the next flip?"
- MC-2 response: "Yes, tails is due to balance things out."

**[P64 — CONCEPTUAL SHIFT]**
"The coin has no memory — the 7th flip is exactly 50/50, identical to any other flip, regardless of the preceding streak. The average returning toward 0.5 over MANY more flips happens purely through dilution: if the streak of 6 heads is followed by, say, 994 roughly-fair flips (about 497 heads), the running average is $(6+497)/1000 \approx 0.503$ — very close to 0.5, achieved NOT by tails being favored on any particular flip, but by the fixed streak of 6 becoming a tiny fraction of 1000 total flips."

Practice: Compute the running average after a streak of 4 heads followed by 96 roughly-fair flips (48 heads), and compare to the average after the same streak followed by only 6 more roughly-fair flips (3 heads) — confirm which case is closer to 0.5 and explain why using dilution, not compensation.

---

### Repair Action B03 — WEAK-STRONG-LLN-IDENTICAL (MC-3)

**[P27 — MISCONCEPTION NAMING]**
"Treating WLLN and SLLN as the same claim is WEAK-STRONG-LLN-IDENTICAL. They use different, non-equivalent modes of convergence — convergence in probability (weak) vs. almost sure convergence (strong) — and SLLN makes the stronger claim."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "What's the difference between the weak and strong Law of Large Numbers?"
- MC-3 response: "There's no real difference, they both just say the sample mean converges to μ."

**[P64 — CONCEPTUAL SHIFT]**
"Both do involve convergence to μ, but the TYPE of convergence differs: WLLN says, for each fixed n, the probability of a large deviation is small and shrinking (a statement re-evaluated separately at each n); SLLN says the entire infinite SEQUENCE of running averages, viewed as one random path, converges to μ with probability 1 (a statement about the whole path at once). SLLN is strictly the stronger claim (SLLN implies WLLN in general, but not the reverse) — naming them 'weak' and 'strong' reflects a genuine, technical difference in convergence mode, not just a difference in how the theorem is phrased."

Practice: State in your own words why "the probability of X̄ₙ being far from μ shrinks as n grows" (WLLN) is a weaker claim than "the whole sequence X̄₁, X̄₂, X̄₃,… converges to μ with probability 1" (SLLN).

---

## Component 6 — P89 Spaced Repetition Schedule

**[P89 — SPACED REPETITION]**

| Review | Delay | Focus |
|--------|-------|-------|
| SR-1 | +1 day | Restate WLLN and SLLN from memory, and re-derive the Chebyshev-based proof sketch of WLLN |
| SR-2 | +3 days | Re-explain the coin-streak dilution example, computing a fresh running average after a streak followed by many more fair flips |
| SR-3 | +7 days | Reject a fresh gambler's-fallacy scenario (e.g. roulette, dice) with the correct dilution-not-compensation explanation |
| SR-4 | +14 days | Reconstruct the casino transfer probe's argument for why a tiny per-hand edge becomes highly predictable over millions of hands |

Retrieval flag: if student claims the sample mean will eventually equal μ exactly (MC-1) or endorses a gambler's-fallacy argument (MC-2), re-execute B01/B02 before continuing.

---

## Component 7 — Cross-Blueprint Dependencies

**[GR-8: Cross-link documentation]**

| Direction | Concept | Relationship |
|-----------|---------|---------------|
| Requires (Tier-1) | math.prob.chebyshev | Directly supplies the bound used in A01's WLLN proof sketch: Var(X̄ₙ)=σ²/n plugged into Chebyshev gives the shrinking deviation-probability bound |
| Requires (Tier-1) | math.prob.independence | Makes Var(sum)=sum of variances valid (no covariance terms), the exact step that produces Var(X̄ₙ)=σ²/n in the proof |
| Unlocks | math.prob.clt | The Central Limit Theorem refines LLN by describing the SHAPE of the fluctuations around μ (approximately Normal), building directly on the same iid/averaging setup |

**GR-9:** cross_links: none in the KG for this concept; P76_mode = independence (the transfer probe applies the limit-vs-equality and dilution-vs-compensation distinctions to a casino profit scenario, a genuinely new applied context rather than a named cross-linked concept).

---

## Component 8 — Teaching Notes

**Structural decisions:**
- h=6 → compact structure (2 main TAs + gate), matching the concept's tightly focused scope (one theorem, its two forms, one proof sketch) despite expert difficulty
- bloom=understand → V-4 = N/A (no P07 required; conceptual explanation and correct-rejection tasks, not derivations beyond the proof sketch already provided)
- CPA_entry = C for an expert learner: a concrete running-average table (with a genuine early streak) grounds the dilution mechanism in arithmetic before the formal limit statement can be misread as a stronger, exact claim

**Key teaching insight:** MC-1 and MC-2 are causally linked, not independent errors — a student who believes LLN promises exact eventual equality (MC-1) has strong incentive to invent a compensating mechanism to explain how that equality is achieved, and the gambler's fallacy (MC-2) is exactly that invented mechanism. Correcting MC-1 first (the limit, not equality) removes the motivation for MC-2 to exist at all; A01 and A02 are sequenced with this dependency in mind, establishing "convergence is probabilistic, never exact" before directly confronting the gambler's fallacy by name.

**Reuse of a single running example:** The coin-flip running-average table (A01) is deliberately reused, with variations, across A01 (introduction), A02 Contrast 1, and the B01/B02 repair practice items — a single memorable numeric anchor (the specific arithmetic of "5 heads diluted by 95 more flips") makes the abstract dilution mechanism concrete and re-derivable from memory, rather than requiring a new example at each stage.

**Sequencing note:** No cross-link concept exists yet for math.prob.lln; the P76 transfer probe instead uses a casino house-edge scenario, chosen because it is a real, high-stakes domain where confusing "reliable long-run average" with "individually rigged outcomes" (the transfer probe's part (b)) is a genuinely common intuitive error, directly testing the dilution-not-compensation lesson in an unfamiliar surface context.

---

## Component 10 — Validation Checklist

| Code | Rule | Check | Status |
|------|------|-------|--------|
| V-1 | Concept ID matches KG | math.prob.lln ✓ | PASS |
| V-2 | All Tier-1 requires have existing blueprints | math.prob.chebyshev ✓, math.prob.independence ✓ | PASS |
| V-3 | CPA entry = C for expert difficulty | C (Concrete) ✓ | PASS |
| V-4 | bloom=understand → P07 N/A | bloom=understand; no P07; V-4=N/A ✓ | N/A |
| V-5 | GR-1: A01 opens with B-category primitive | P11 REPRESENTATION SHIFT ✓ | PASS |
| V-6 | GR-2: each non-gate TA has P49 with 4 branches | A01, A02 each have P49 CORRECT/PARTIAL/INCORRECT/NO_RESPONSE ✓ | PASS |
| V-7 | GR-3: gate TA (A03) is terminal | A03=P91; no further TAs ✓ | PASS |
| V-8 | GR-4: repair TAs open with P27+P41+P64 | B01, B02, B03 each: P27→P41→P64 ✓ | PASS |
| V-9 | GR-6: P91 terminal in its TA | P91 is A03; A03 is the last TA ✓ | PASS |
| V-10 | GR-7: P76 present in mastery gate | P76 in A03 between P77 and P75 ✓ | PASS |
| V-11 | GR-8: cross_links documented in Component 7 | requires and unlocks documented ✓ | PASS |
| V-12 | GR-9: P76 mode correct for cross_links | no cross_links → P76=independence ✓ | PASS |
| V-13 | GR-10: MAMR stated and enforced | MAMR=5/5 stated in C0 and P75 gate ✓ | PASS |
| V-14 | MAMR formula correct | ⌈0.85×5⌉=⌈4.25⌉=5; PASS=5/5 ✓ | PASS |
| V-15 | P91 structure complete | P77(4)→P55→P76(1)→P55→P75→P55→P74→P55→P78 ✓ | PASS |
| V-16 | P77 has exactly 4 problems | Problems 1–4 verified ✓ | PASS |
| V-17 | 3 misconceptions with FOUNDATIONAL declared | MC-1 FOUNDATIONAL, MC-2, MC-3 ✓ | PASS |
| V-18 | P89 spaced repetition present | Component 6 with 4 SR intervals ✓ | PASS |
| V-19 | Structure matches h | h=6, tightly-scoped → compact (2 main TAs + gate); A01+A02+A03 ✓ | PASS |
| V-20 | P76 transfer probe is novel and correct | Casino house-edge scenario; dilution-vs-rigging argument; variance-shrinkage-vs-mean argument ✓ | PASS |
| AIR | All internal references consistent | Concept IDs, MAMR, bloom, difficulty consistent throughout ✓ | PASS |
