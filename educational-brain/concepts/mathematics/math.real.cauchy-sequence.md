# math.real.cauchy-sequence

## Identity
- **KG id**: `math.real.cauchy-sequence`
- **Domain**: math.real
- **Requires**: `math.real.convergence-sequences`
- **Unlocks**: none
- **Cross-links**: `math.fnal.completeness` (NOT yet authored — confirmed via `ls`; independence
  mode used, matching the Blueprint's own correct self-report)
- **Difficulty**: expert
- **Bloom level**: understand
- **Mastery threshold**: 0.9
- **Estimated hours**: 4

## Learning Objective
State the CAUCHY criterion — $(a_n)$ is Cauchy iff $\forall\varepsilon>0\,\exists N:m,n>N
\Rightarrow|a_m-a_n|<\varepsilon$ — a condition on terms RELATIVE TO EACH OTHER, never referencing
a limit $L$; explain why this lets a sequence's convergence be CERTIFIED without ever naming $L$;
and state the Cauchy Criterion for $\mathbb R$ (Cauchy $\Leftrightarrow$ convergent, by
completeness), recognizing this equivalence as genuinely SPECIAL to complete spaces, not universal.

## Core Understanding
CAUCHY IS DEFINED PURELY FROM THE SEQUENCE'S OWN TERMS, NEVER REQUIRING A KNOWN LIMIT FIRST: for
$a_n=1/n$, given $\varepsilon>0$, choosing $N>2/\varepsilon$ gives, for $m,n>N$:
$|a_m-a_n|\le1/m+1/n<2/N<\varepsilon$ — verified using ONLY the terms' relationship to each other,
with NO mention of the limit 0 anywhere in the argument. This directly reuses `math.real.
convergence-sequences`'s own $\varepsilon$-$N$ template, substituting "terms close to each other"
for "terms close to $L$."

CAUCHY CERTIFIES CONVERGENCE WITHOUT EVER NAMING THE LIMIT — THE ENTIRE PRACTICAL POINT OF THE
DEFINITION: for the Newton's-method recursion $a_1=1$, $a_{n+1}=\frac12(a_n+2/a_n)$ approximating
$\sqrt2$, showing directly from the recursion that $|a_{n+1}-a_n|$ shrinks geometrically
establishes the Cauchy condition — and hence, by the Cauchy Criterion, CONVERGENCE — before ever
identifying $L=\sqrt2$ in closed form. Many real problems (recursive sequences, iterative
numerical methods) make this the ONLY practical route to certifying convergence.

CAUCHY $\Leftrightarrow$ CONVERGENT IS A SPECIAL FACT ABOUT COMPLETE SPACES, NEVER A UNIVERSAL
PROPERTY: in $\mathbb R$, Cauchy $\Leftrightarrow$ convergent, by completeness. But the decimal
truncations $a_1=1.4,a_2=1.41,a_3=1.414,\ldots$ (successive approximations to $\sqrt2$) form a
Cauchy sequence OF RATIONAL NUMBERS (consecutive terms differ by at most $10^{-n}$), yet its limit
$\sqrt2$ is irrational — the sequence does NOT converge WITHIN $\mathbb Q$, even though it is
Cauchy there. This proves the equivalence genuinely depends on completeness: true in $\mathbb R$
precisely because $\mathbb R$ has no "holes," false in $\mathbb Q$, which has a hole exactly where
$\sqrt2$ should be.

## Mental Models
- **"Convergence to L needs a known target; Cauchy needs only that the terms get close to EACH
  OTHER — no target required, which is exactly what makes it practically checkable."**
- **"Cauchy implies convergent only where the space has no holes — R has none, Q has one exactly
  at every irrational."**

## Why Students Fail

### MC-1: LIMIT-REQUIRED-BEFORE-CAUCHY-CHECK
- **Surface form**: believes the sequence's limit must be known or found first, before the Cauchy
  condition can be checked.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared Foundational severity —
  ordinary convergence always references a limit, making its absence in the Cauchy definition feel
  like an omission rather than the entire point).
- **Repair**: re-walk the $1/n$ proof line by line, pointing out the limit value never appears —
  only $a_m$ and $a_n$.

### MC-2: CAUCHY-CONVERGENT-EQUIVALENCE-TREATED-AS-UNIVERSAL
- **Surface form**: treats "Cauchy $\Rightarrow$ convergent" as true in any set of numbers, rather
  than a special consequence of completeness.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared Foundational severity — the
  equivalence is usually first encountered stated for $\mathbb R$ alone, inviting an unstated
  universal generalization).
- **Repair**: re-present the $\sqrt2$-truncation sequence as a direct counterexample in
  $\mathbb Q$, restating the Criterion as specifically about $\mathbb R$'s completeness.

### MC-3: CAUCHY-CONFUSED-WITH-CONSECUTIVE-TERMS-SHRINKING
- **Surface form**: believes it suffices to check that consecutive terms $|a_{n+1}-a_n|$ shrink to
  0, rather than requiring ALL sufficiently late pairs to be close.
- **Birth type**: Type 3, language contamination (Blueprint's own declared Moderate severity —
  "terms getting close" is easy to narrow to "neighboring terms" rather than "every pair").
- **Repair**: re-anchor on the harmonic-sum counterexample, where consecutive gaps shrink to 0 yet
  the sequence diverges.

## Misconceptions

### MC-1: LIMIT-REQUIRED-BEFORE-CAUCHY-CHECK
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: CAUCHY-CONVERGENT-EQUIVALENCE-TREATED-AS-UNIVERSAL
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-3: CAUCHY-CONFUSED-WITH-CONSECUTIVE-TERMS-SHRINKING
- **Surface form**: as described above.
- **Root cause (Type 3)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Convergence needs a map with a marked destination; Cauchy only needs to see the travelers
  bunching up together — no destination marked, and yet that's still enough to prove they're
  going somewhere, in a space with no holes."**
- **Anti-analogy**: Cauchy does NOT mean merely that neighboring terms get close — the harmonic
  sum's consecutive gaps shrink to 0 while the sequence diverges to infinity, proving that
  consecutive-closeness alone is not the Cauchy condition.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: $a_n=1/n$'s Cauchy proof, verified using only $a_m,a_n$'s
  relationship, no limit value referenced.
- **Demonstration 2 (targets MC-2)**: the decimal-truncation sequence toward $\sqrt2$ is Cauchy in
  $\mathbb Q$ but does not converge within $\mathbb Q$ — a genuine counterexample to universal
  Cauchy-implies-convergent.
- **Demonstration 3 (targets MC-3)**: the harmonic sum $H_n$'s consecutive gaps $1/(n+1)\to0$, yet
  $H_{2n}-H_n\ge1/2$ forever — not Cauchy, despite shrinking consecutive gaps.

## Discovery Questions
1. "To prove a sequence is Cauchy, do you first need to know what it converges to?"
2. "Is every Cauchy sequence convergent, in any set of numbers you pick it from?"
3. "Does it suffice to check that consecutive terms get close together, or must ALL sufficiently
   late pairs be close?"

## Teaching Sequence
1. **Contrast pair**: state the Cauchy-vs-convergence-to-$L$ distinction directly, working
   Demonstration 1, isolating MC-1 by requiring the limit's absence from the proof noted
   explicitly.
2. **Conflict evidence**: the Newton's-method recursion's Cauchy-without-knowing-$L$ certification,
   directly resolving MC-1's hook with worked evidence.
3. **Contrast pair**: Demonstration 2's $\mathbb Q$-vs-$\mathbb R$ contrast, isolating MC-2 by
   requiring the completeness-dependence stated precisely.
4. **Mastery gate**: require a correct Cauchy proof for a new sequence without reference to its
   limit, a correct explanation of why Cauchy-implies-convergent depends on the ambient set, and a
   correct rejection of the consecutive-terms-only criterion via the harmonic-sum counterexample,
   at the Blueprint's own stated MAMR of 5/5 (⌈0.9×5⌉).

## Tutor Actions
- Never accept a Cauchy proof that first requires identifying the sequence's limit.
- Never accept "Cauchy implies convergent" stated as a universal fact without the completeness
  qualifier.
- Never accept "consecutive terms shrinking" as sufficient for the Cauchy condition.

## Voice Teaching Notes
- Say "does that proof ever mention the limit, or only the terms themselves?" whenever a Cauchy
  argument is presented.
- When Cauchy-implies-convergent is stated, ask "is that true in any set of numbers, or
  specifically because of completeness?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly proves a new sequence is Cauchy without referencing
  its limit.
- **Rung 2 (application)**: learner correctly explains why the Cauchy Criterion's converse depends
  on completeness, using the $\mathbb Q$-truncation counterexample.
- **Rung 3 (transfer)**: learner correctly applies a shrinking-gap bound to certify convergence of
  a new numerical-algorithm sequence before its exact limit is known.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the $1/n$ proof, pointing out the limit's absence.
- If MC-2 recurs, re-present the $\sqrt2$-truncation counterexample in $\mathbb Q$.
- If MC-3 recurs, re-anchor on the harmonic-sum counterexample.

## Memory Hooks
- "Cauchy needs the terms close to each other — never a known target."
- "Cauchy implies convergent only where there are no holes — R has none, Q has one at every
  irrational."
- "All pairs must be close, not just neighbors — the harmonic sum proves it."

## Transfer Connections
- `math.real.convergence-sequences` (already authored, this campaign, Batch 112): supplies the
  $\varepsilon$-$N$ template this concept's Cauchy definition directly reuses, substituting
  inter-term distance for distance-to-limit.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.real.cauchy-sequence.md`, reused by
  reference for its Cauchy-vs-convergence-to-$L$ contrast, its Newton's-method
  certify-without-knowing-$L$ example, its $\mathbb Q$-truncation completeness counterexample, and
  its three-misconception registry (severity levels adopted directly as declared).
- Transfer probe: the Blueprint correctly self-reports its cross-link target `math.fnal.
  completeness` as NOT yet authored (confirmed via `ls` this batch) — independence mode used, the
  Blueprint's own self-contained shrinking-gap numerical-algorithm probe treated as complete
  without correction.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `math.real.
  convergence-sequences`, unlocks none, cross_links `math.fnal.completeness`, expert/understand,
  mastery_threshold 0.9, estimated_hours 4) was directly verified against the live KG and matches
  exactly. The Blueprint's own correctly-declared independence-mode P76 (cross-link target
  confirmed NOT authored via `ls`) required no correction.

## Version History
- 2026-09-19 (Batch 114): authored. Second entry this batch. Companion batch concept:
  `math.meas.simple-function`.
