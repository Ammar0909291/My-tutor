# math.prob.discrete-distributions

## Identity
- **KG id**: `math.prob.discrete-distributions`
- **Domain**: math.prob
- **Requires**: `math.prob.discrete-rv`, `math.prob.pmf`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.9
- **Estimated hours**: 8

## Learning Objective
State the PMF, mean, and variance of Bernoulli($p$), Binomial($n,p$), Geometric($p$), Negative
Binomial($r,p$), Poisson($\lambda$), and Hypergeometric($N,K,n$); identify which real-world
process generates each; recognize FAMILY RELATIONSHIPS (Geometric as Negative Binomial's $r=1$
case; Poisson as a Binomial LIMIT, never merely an approximation restricted to that limit;
Binomial as a SUM of Bernoullis); and select the correct distribution by matching structural
features (fixed vs. unlimited trials, with vs. without replacement).

## Core Understanding
GEOMETRIC HAS TWO GENUINELY DIFFERENT CONVENTIONS — ALWAYS IDENTIFY WHICH BEFORE COMPUTING:
Version A (trials UNTIL first success, support $\{1,2,\ldots\}$): $P(X=k)=(1-p)^{k-1}p$,
$E[X]=1/p$. Version B (FAILURES before first success, support $\{0,1,\ldots\}$):
$P(X=k)=(1-p)^kp$, $E[X]=(1-p)/p$. They're related by $X_A=X_B+1$ — genuinely different means
($1/p$ vs $(1-p)/p$), never interchangeable without first identifying which question is being
asked ("how many flips TO get heads" is trials-based; "how many tails BEFORE heads" is
failures-based).

POISSON IS A PRIMARY DISTRIBUTION IN ITS OWN RIGHT, NEVER MERELY A BINOMIAL-LARGE-$n$-SMALL-$p$
APPROXIMATION: while Poisson($\lambda$) DOES arise as the limit of Binomial($n,p$) as $n\to\infty,
p\to0,np=\lambda$ fixed, it also arises DIRECTLY from the Poisson-process axioms (events at
constant rate $\lambda$, independent, one at a time) — radioactive decay, customer arrivals,
mutation rates are Poisson because of these axioms, never because some hidden $n$ is large and
$p$ is small. Poisson's own defining property $\text{Var}(X)=E[X]=\lambda$ (equal, not merely
related) makes it a genuinely distinct, primary model for count data.

HYPERGEOMETRIC IS "BINOMIAL WITHOUT REPLACEMENT," BUT THE PROBABILITY GENUINELY CHANGES EACH
DRAW — NEVER STAYS FIXED AT $K/N$: sampling without replacement means each draw changes the
remaining population's composition, so the success probability shifts draw to draw — using
Binomial's fixed-$p=K/N$ PMF when $n/N$ isn't negligible ignores this and gives the WRONG
variance. Hypergeometric's variance $\frac{nK(N-K)(N-n)}{N^2(N-1)}$ includes the finite-population
correction factor $\frac{N-n}{N-1}<1$, making it SMALLER than Binomial's $np(1-p)$ — sampling
without replacement genuinely reduces variability, a structural fact Binomial's fixed-$p$ model
cannot capture.

## Mental Models
- **"Ask three questions before picking a distribution: fixed n or unlimited trials? With or
  without replacement? Counting successes, or counting until a success?"**
- **"Poisson isn't a shortcut for 'Binomial when n is big and p is small' — it's its own
  primary model, derived directly from a constant arrival-rate process."**

## Why Students Fail

### MC-1: GEOMETRIC-COUNTS-FAILURES-OR-TRIALS
- **Surface form**: confuses the two Geometric conventions (failures before success vs. trials
  until success), applying the wrong PMF and confusing mean $p$-related formulas.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared severity — different
  textbooks use different conventions, both called "Geometric," so students switching sources
  conflate them).
- **Repair**: re-derive both conventions side by side, re-anchoring on $X_A=X_B+1$ and always
  identifying which question is asked first.

### MC-2: POISSON-REQUIRES-LARGE-N-SMALL-P
- **Surface form**: believes Poisson only applies as a Binomial approximation, missing it as a
  primary distribution for count data in its own right.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared severity — Poisson is
  often first DERIVED as a Binomial limit in introductory courses, cementing an exclusive
  association with the approximation context).
- **Repair**: re-anchor on the Poisson-process axioms as an independent, direct derivation route.

### MC-3: HYPERGEOMETRIC-IS-BINOMIAL-WITHOUT-REPLACEMENT
- **Surface form**: treats Hypergeometric as "Binomial but without replacement," correctly noting
  the sampling difference but keeping $p$ fixed at $K/N$ rather than updating it each draw.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared severity — the
  without-replacement intuition is correct; the error is failing to propagate that into a changing
  probability and a smaller variance).
- **Repair**: re-derive the finite-population correction factor directly, showing why the variance
  is genuinely smaller than Binomial's.

## Misconceptions

### MC-1: GEOMETRIC-COUNTS-FAILURES-OR-TRIALS
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-2: POISSON-REQUIRES-LARGE-N-SMALL-P
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-3: HYPERGEOMETRIC-IS-BINOMIAL-WITHOUT-REPLACEMENT
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

## Analogies
- **"The six distributions form a family tree — Binomial is a stack of Bernoullis, Negative
  Binomial generalizes Geometric, and Poisson is where that stack's limit lands when trials
  become infinitely many and individually infinitesimal."**
- **Anti-analogy**: Hypergeometric is NOT Binomial with a fixed probability plugged in — the
  probability itself shifts with every draw, which is exactly what the finite-population
  correction factor captures.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: flipping until first head (Version A, $E[X]=1/p$) versus
  counting tails before first head (Version B, $E[X]=(1-p)/p$) — genuinely different means for the
  same coin.
- **Demonstration 2 (targets MC-2)**: a website's 300 visitors/hour modeled directly as Poisson
  (rate-based), computing $P(X=5\text{ in one minute})=e^{-5}5^5/5!\approx0.175$ with no reference
  to any underlying Binomial approximation.
- **Demonstration 3 (targets MC-3)**: drawing 10 items from a batch of 100 with 5% defective:
  Hypergeometric's variance includes the correction factor $\frac{90}{99}<1$, genuinely smaller
  than the naive Binomial variance.

## Discovery Questions
1. "Does 'Geometric distribution' always mean the same thing, or are there two conventions to
   check first?"
2. "Does Poisson only apply when Binomial's $n$ is large and $p$ is small?"
3. "If you sample without replacement, does the success probability stay fixed at $K/N$ for every
   draw?"

## Teaching Sequence
1. **Representation shift**: the unified table of all six distributions, working Demonstration 1's
   Geometric-convention contrast, isolating MC-1.
2. **Pattern induction**: Poisson's three independent derivations (Binomial limit, process axioms,
   rare events), working Demonstration 2, isolating MC-2 by requiring the direct rate-based
   derivation used.
3. **Conceptual shift**: Demonstration 3's finite-population correction, isolating MC-3 by
   requiring the changing draw-to-draw probability acknowledged.
4. **Mastery gate**: require correct PMF/mean/variance computations across multiple distributions,
   a correct Geometric-convention identification, a correct Poisson computation used directly
   (not via Binomial approximation), and a correct Hypergeometric-vs-Binomial variance comparison,
   at the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept a Geometric computation without first identifying which convention is in use.
- Never accept Poisson applied only as a Binomial-approximation justification.
- Never accept Hypergeometric's variance computed with a fixed $p=K/N$ when $n/N$ isn't
  negligible.

## Voice Teaching Notes
- Say "trials until success, or failures before success — which one is this?" whenever Geometric
  is invoked.
- When Poisson is used, ask "is this a Binomial approximation, or a primary rate-based model?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly selects the appropriate distribution family for a
  new scenario based on its structural features.
- **Rung 2 (application)**: learner correctly computes PMF, mean, and variance for a new instance
  of each family.
- **Rung 3 (transfer)**: learner correctly compares a Hypergeometric scenario against its Binomial
  approximation, quantifying when the approximation breaks down, and correctly derives one
  family's relationship to another (e.g. Binomial as a sum of Bernoullis).

## Tutor Recovery Strategy
- If MC-1 recurs, re-derive both Geometric conventions side by side.
- If MC-2 recurs, re-anchor on the Poisson-process axioms as an independent derivation.
- If MC-3 recurs, re-derive the finite-population correction factor directly.

## Memory Hooks
- "Two Geometric conventions exist — always check which before computing."
- "Poisson is a primary model, not just a Binomial shortcut."
- "Without replacement means the probability genuinely shifts — the correction factor proves it."

## Transfer Connections
- `math.prob.discrete-rv` (already authored, this campaign, Batch 115): supplies the discrete
  random variable framework this concept populates with six named families.
- `math.prob.pmf` (already authored, this campaign, Batch 117): supplies the PMF validity
  machinery each named distribution's formula must satisfy.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.prob.discrete-distributions.md`, reused by
  reference for its unified six-distribution table, its Geometric-convention contrast, its
  Poisson-in-depth derivations, its Hypergeometric finite-population correction, and its
  three-misconception registry (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe, examining compound Poisson sums,
  the Conway-Maxwell-Poisson generalization, and zero-inflated Poisson models.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `math.prob.discrete-
  rv`/`math.prob.pmf`, unlocks none, cross_links none, proficient/apply, mastery_threshold 0.9,
  estimated_hours 8) was directly verified against the live KG and matches exactly.

## Version History
- 2026-09-19 (Batch 120): authored. Second entry this batch. Companion batch concept:
  `math.meas.radon-nikodym`.
