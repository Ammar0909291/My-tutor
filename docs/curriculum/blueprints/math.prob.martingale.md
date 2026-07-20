# Teaching Blueprint: Martingale (`math.prob.martingale`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.prob.martingale` |
| name | Martingale |
| domain | Probability |
| difficulty | research |
| bloom | analyze |
| mastery_threshold | 0.55 → MAMR = ⌈0.55×5⌉ = 3/5 |
| estimated_hours | 8 |
| requires | `math.prob.conditional-expectation` |
| unlocks | none |
| cross_links | none |
| CPA_entry_stage | C (Concrete) — verifying the martingale property for one specific simple random walk before naming the general definition |
| description (KG) | A sequence $\{M_n\}$ is a martingale if $E[M_{n+1}\mid M_0,\dots,M_n]=M_n$ (fairness condition). Submartingale: $\ge$; supermartingale: $\le$. Optional stopping theorem and martingale convergence are key results. |

## Component 1 — Learning Objectives

- LO1: Verify the martingale "fairness" condition $E[M_{n+1}\mid M_0,\dots,M_n]=M_n$ for a specific sequence, recognizing this as a DIRECT application of `math.prob.conditional-expectation`'s own $E[X\mid Y]$ machinery — here conditioning on the ENTIRE PAST $M_0,\dots,M_n$ rather than a single random variable $Y$, but the SAME conditional-expectation formalism.
- LO2: Distinguish martingales ($E[M_{n+1}\mid\text{past}]=M_n$, exactly fair), SUBmartingales ($\ge M_n$, favorable/increasing on average), and SUPERmartingales ($\le M_n$, unfavorable/decreasing on average) — correctly classifying a given sequence based on which inequality (or equality) its conditional expectation satisfies.
- LO3 (orientation level — full optional-stopping/convergence-theorem proof deferred): recognize, without full derivation, that the OPTIONAL STOPPING THEOREM (under suitable conditions, $E[M_\tau]=E[M_0]$ even for a RANDOM stopping time $\tau$, not just a fixed time $n$) and MARTINGALE CONVERGENCE (a bounded martingale converges almost surely) are the theorem's two central payoffs — previewing why "no clever betting/stopping strategy can create an advantage from a fair game" is a precise mathematical consequence, not merely an intuitive gambling maxim.

## Component 2 — Prerequisite Check

Assumes mastery of `math.prob.conditional-expectation` ($E[X\mid Y]$ as a random variable, the tower property $E[X]=E[E[X\mid Y]]$).

## Component 3 — Core Explanation

**The martingale condition is `math.prob.conditional-expectation`'s own machinery, applied to the entire past**: `math.prob.conditional-expectation` computes $E[X\mid Y]$ for conditioning on a SINGLE random variable $Y$. A martingale's defining condition, $E[M_{n+1}\mid M_0,\dots,M_n]=M_n$, applies the IDENTICAL conditional-expectation idea, just conditioning on the ENTIRE observed history $M_0,\dots,M_n$ (often written $\mathcal{F}_n$, the "information available up to time $n$") rather than one variable — no new conceptual machinery is introduced, only a richer conditioning set.

**"Fair" means the BEST prediction of the next value, given everything known so far, is exactly the current value**: the martingale condition says: given the ENTIRE history up to time $n$, your best (conditional-expectation) PREDICTION for $M_{n+1}$ is simply $M_n$ itself — no systematic drift upward (which would be a submartingale) or downward (supermartingale). This formalizes the intuitive idea of a "fair game": knowing the full past gives you no informational edge for predicting whether the NEXT step will move up or down on average.

**Optional stopping and convergence are precise consequences, not intuitive gambling folklore (orientation level)**: the OPTIONAL STOPPING THEOREM makes precise the gambler's intuition "you can't beat a fair game by choosing WHEN to stop" — under suitable conditions (e.g. bounded stopping time, or bounded increments), $E[M_\tau]=E[M_0]$ even when $\tau$ is a RANDOM stopping time (a rule for stopping that depends only on information available so far, not future knowledge) — a genuinely nontrivial mathematical theorem, not merely folk wisdom. MARTINGALE CONVERGENCE separately guarantees that a BOUNDED martingale converges almost surely to some limiting random variable. Full derivation of both results, and the precise conditions under which they hold, is deferred beyond this concept's core scope.

## Component 4 — Worked Examples

**Example 1 (LO1 — verifying the martingale condition for a simple random walk, breaking MC-1)**: let $M_n=\sum_{i=1}^nX_i$ where each $X_i$ is $+1$ or $-1$ with probability $\frac12$ each, independently (a symmetric simple random walk, $M_0=0$). Check: $E[M_{n+1}\mid M_0,\dots,M_n]=E[M_n+X_{n+1}\mid M_0,\dots,M_n]=M_n+E[X_{n+1}\mid M_0,\dots,M_n]$. Since $X_{n+1}$ is INDEPENDENT of the past (a fresh coin flip), $E[X_{n+1}\mid M_0,\dots,M_n]=E[X_{n+1}]=\frac12(1)+\frac12(-1)=0$ — using `math.prob.conditional-expectation`'s own machinery directly, this gives $E[M_{n+1}\mid M_0,\dots,M_n]=M_n+0=M_n$ ✓, confirming the martingale property holds.

**Example 2 (LO2 — distinguishing martingale, submartingale, supermartingale, breaking MC-2)**: MODIFY Example 1's random walk so each $X_i$ is $+1$ with probability $0.6$ and $-1$ with probability $0.4$ (a BIASED walk): $E[X_{n+1}]=0.6(1)+0.4(-1)=0.2>0$, so $E[M_{n+1}\mid\text{past}]=M_n+0.2>M_n$ — a SUBMARTINGALE (systematically favorable, increasing on average). Now consider $-M_n$ (the negative of this biased walk): $E[-M_{n+1}\mid\text{past}]=-M_n-0.2<-M_n$ — a SUPERMARTINGALE. The SAME underlying process, viewed with a sign flip, switches from submartingale to supermartingale — confirming these classifications depend precisely on which direction the inequality points, not merely on "the sequence isn't perfectly fair."

**Example 3 (LO3, orientation level — optional stopping as a precise consequence, not folklore, breaking MC-3)**: for Example 1's FAIR random walk, a gambler might try the strategy "keep playing until $M_n$ first reaches $+10$, then stop" (a random stopping time $\tau$). Naive intuition might suggest this GUARANTEES a profit of $10$. But the Optional Stopping Theorem's PRECISE conditions matter: for this UNBOUNDED stopping time (the walk could in principle take arbitrarily long, or never reach $+10$ with probability approaching... actually it reaches $+10$ almost surely for a symmetric walk, but $E[\tau]=\infty$), the theorem's HYPOTHESES (e.g. bounded stopping time or bounded increments with $E[\tau]<\infty$) genuinely FAIL here, so $E[M_\tau]=E[M_0]=0$ does NOT straightforwardly follow — reflecting the mathematically precise fact that "you can't systematically profit from a fair game" requires careful hypothesis-checking, not a blanket, hypothesis-free gambling maxim.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Martingale Condition Reuses Conditional Expectation, Conditioning on the Whole Past (Primitive P11: Representation Shift)

State: "you already know how to compute $E[X\mid Y]$ — the martingale condition just conditions on the ENTIRE observed history instead of one variable, using the exact same conditional-expectation machinery." Walk Example 1's direct application of independence to compute $E[X_{n+1}\mid\text{past}]=0$.

- **MC-1 hook**: ask "does verifying the martingale condition require a fundamentally new probabilistic tool, beyond `math.prob.conditional-expectation`'s own $E[X\mid Y]$ machinery?" — a "yes" answer reveals MC-1 (missing that the martingale condition is exactly this same machinery, applied to conditioning on the entire past).

### Teaching Action A02 — Sub- and Supermartingale Classification Flips With a Sign Change (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: the biased walk is a submartingale, but its negation is a supermartingale — the SAME underlying randomness, opposite classification. State: "sub- and supermartingale aren't vague labels for 'somewhat unfair' — they're precisely determined by which direction the conditional-expectation inequality points, and flipping the sign of the sequence flips the classification entirely."

- **MC-2 hook**: ask "is classifying a sequence as a submartingale versus a supermartingale a loose, qualitative judgment about how 'favorable' it seems, rather than a precise inequality check?" — a "yes" answer reveals MC-2 (missing that the classification is precisely determined by the direction of the conditional-expectation inequality).

### Teaching Action A03 — Optional Stopping Requires Checking Real Hypotheses, Not Just Gambling Intuition (Primitive P06: Contrast Pair)

Contrast the naive "can't beat a fair game" intuition against Example 3's demonstration that the "stop at $+10$" strategy's stopping time FAILS the optional stopping theorem's own hypotheses (unbounded $E[\tau]$). State: "'you can't beat a fair game' is a precise mathematical theorem with real, checkable hypotheses — not a blanket folk maxim that applies to every conceivable stopping strategy without qualification."

- **MC-3 hook**: ask "does the optional stopping theorem guarantee $E[M_\tau]=E[M_0]$ for ANY stopping strategy applied to a fair martingale, with no further conditions needed?" — a "yes" answer reveals MC-3 (missing that the theorem requires genuine hypotheses — like a bounded stopping time — that can and do fail for some strategies).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Verify the martingale condition for $M_n=\sum_{i=1}^nX_i$ where $X_i$ are i.i.d. with $E[X_i]=0$, citing `math.prob.conditional-expectation`'s independence-based simplification.
  2. For a sequence with $E[Y_i]=-0.3$ (each step, i.i.d.), classify $S_n=\sum_{i=1}^nY_i$ as a martingale, submartingale, or supermartingale.
  3. For the SAME sequence from problem 2, classify $-S_n$, and explain how the classification changed.
  4. Explain, in one or two sentences, why the optional stopping theorem's hypotheses (such as a bounded stopping time) genuinely matter, rather than the theorem holding unconditionally for any stopping strategy.
- **P76 (Transfer Probe, mode = independence)**: "A trader models a stock price's DAILY LOG-RETURN as a fair game (a martingale), with $M_n$ representing cumulative log-return after $n$ days. (a) State precisely what the martingale condition $E[M_{n+1}\mid M_0,\dots,M_n]=M_n$ means in this financial context, citing the conditional-expectation machinery directly. (b) The trader proposes a strategy: 'sell as soon as cumulative log-return first reaches $+5\%$, guaranteeing a profit.' Using the optional stopping theorem's hypothesis requirements (citing Example 3's random-walk analogy), explain what could go wrong with this reasoning if the trader can't guarantee a bounded number of days before hitting the target. (c) Contrast this martingale-based model against a hypothetical scenario where the stock has a genuine long-term positive drift — explain which classification (martingale, submartingale, or supermartingale) would then be more appropriate, and why."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 3/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | MARTINGALE-CONDITION-ASSUMED-NEW-TOOL | Believing verifying the martingale condition requires a fundamentally new probabilistic tool, missing that it is exactly `math.prob.conditional-expectation`'s own machinery, applied to the whole past | Foundational |
| MC-2 | SUB-SUPERMARTINGALE-ASSUMED-QUALITATIVE-JUDGMENT | Believing sub- versus supermartingale classification is a loose qualitative judgment, missing that it is precisely determined by the direction of the conditional-expectation inequality | High |
| MC-3 | OPTIONAL-STOPPING-ASSUMED-UNCONDITIONAL | Believing the optional stopping theorem guarantees $E[M_\tau]=E[M_0]$ for any stopping strategy unconditionally, missing that it requires genuine, sometimes-failing hypotheses | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Martingale Condition Assumed New Tool") → P41 (detect: ask whether verifying the martingale condition requires a fundamentally new tool) → P64 (conceptual shift: re-walk Example 1's independence-based conditional-expectation computation, re-anchoring on "the same conditional-expectation machinery, applied to the whole past").
- **B02 (targets MC-2)**: P27 (name it: "Sub-Supermartingale Assumed Qualitative Judgment") → P41 (detect: ask whether sub-/supermartingale classification is a loose qualitative judgment) → P64 (conceptual shift: re-walk Example 2's sign-flip reclassification, re-anchoring on "precisely determined by the direction of the inequality").
- **B03 (targets MC-3)**: P27 (name it: "Optional Stopping Assumed Unconditional") → P41 (detect: ask whether the optional stopping theorem holds unconditionally for any stopping strategy) → P64 (conceptual shift: re-walk Example 3's failed-hypothesis stopping-time case, re-anchoring on "genuine, sometimes-failing hypotheses are required").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.prob.conditional-expectation` ($E[X\mid Y]$ and the tower property, directly extended here to conditioning on an entire observed history).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: none listed in the KG for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 8 with a research/analyze tag and a notably reduced mastery_threshold (0.55, MAMR 3/5) supports the "3 TAs + gate" tier at genuinely demanding scope, with LO1 and LO2 given full concrete verification (the independence-based martingale check and the sign-flip sub-/supermartingale reclassification) and LO3 kept orientation-level, appropriately illustrating the optional stopping theorem's hypothesis-dependence via a concrete failure case without proving the theorem itself.
- **Division of labor**: `math.prob.conditional-expectation` owns the general $E[X\mid Y]$ machinery and tower property; this concept owns the SPECIFIC "fairness" condition conditioning on an entire history, and the two headline theorems (optional stopping, convergence) built on top of it — deliberately reusing the SAME symmetric random walk across Examples 1 and 3 so the basic martingale verification and the optional-stopping hypothesis-failure connect to one running, intuitively accessible gambling-style example.
- Example 2's deliberate choice to derive BOTH the submartingale classification (biased walk) AND the supermartingale classification (its negation) from the SAME underlying random process was chosen to make MC-2's "loose qualitative judgment" misconception concretely falsifiable — showing the classification is a precise, sign-sensitive computation.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (none listed in KG) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.55×5⌉=3) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: verifying the martingale property for one specific simple random walk precedes the general definition) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
