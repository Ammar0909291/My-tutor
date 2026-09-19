# math.real.archimedean

## Identity
- **KG id**: `math.real.archimedean`
- **Domain**: math.real
- **Requires**: `math.real.completeness`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: understand
- **Mastery threshold**: 0.9
- **Estimated hours**: 2

## Learning Objective
State the ARCHIMEDEAN PROPERTY — for any real $x$, there exists $n\in\mathbb N$ with $n>x$
(equivalently, $\mathbb N$ is UNBOUNDED ABOVE in $\mathbb R$) — and derive it from
`math.real.completeness` via proof by contradiction, never treating it as an independent axiom;
use it to prove that for any $\varepsilon>0$, some $n$ satisfies $1/n<\varepsilon$; and apply it
to prove $\mathbb Q$ is DENSE in $\mathbb R$.

## Core Understanding
THE ARCHIMEDEAN PROPERTY IS A PROVEN THEOREM, NEVER AN INDEPENDENT AXIOM: suppose $\mathbb N$
WERE bounded above in $\mathbb R$. By completeness, $\mathbb N$ would have a supremum
$u=\sup(\mathbb N)$. Since $u$ is the LEAST upper bound, $u-1$ is NOT an upper bound, so some
$n\in\mathbb N$ satisfies $n>u-1$, i.e. $n+1>u$. But $n+1\in\mathbb N$ too, and $n+1>u$ CONTRADICTS
$u$ being an upper bound of $\mathbb N$ in the first place. This contradiction proves $\mathbb N$
cannot be bounded above — the Archimedean property is a genuine CONSEQUENCE of completeness,
reusing `math.real.completeness`'s own supremum machinery directly, never a separately assumed
fact.

ARBITRARILY SMALL $1/n$ IS A DIRECT, JUSTIFIED CONSEQUENCE, NEVER SELF-EVIDENT WITHOUT PROOF:
given any $\varepsilon>0$, applying the Archimedean property to $x=1/\varepsilon$ gives some
$n\in\mathbb N$ with $n>1/\varepsilon$, hence $1/n<\varepsilon$. For $\varepsilon=0.0001$: take
$n>10{,}000$, e.g. $n=10{,}001$, giving $1/10{,}001\approx0.00009999<0.0001$. This single fact —
that $1/n$ can be forced below ANY prescribed positive tolerance — is the exact machinery
underlying every "$\varepsilon$-$N$" limit argument; it is a JUSTIFIED consequence of the
Archimedean property, not an assumption that needs no proof.

DENSITY OF $\mathbb Q$ IN $\mathbb R$ RELIES SPECIFICALLY ON THE ARCHIMEDEAN PROPERTY, NEVER
MERELY ON $\mathbb Q$ "HAVING INFINITELY MANY ELEMENTS": for any $a<b$ in $\mathbb R$, choose
$n$ with $1/n<b-a$ (possible by the corollary above); then some multiple $q=\lceil na\rceil/n$ of
$1/n$ lands strictly in $(a,b)$, since consecutive multiples of $1/n$ are spaced closer together
than the gap $b-a$. For $a=\sqrt2$, $b=\sqrt2+0.001$: choosing $n=2000$ ($1/n=0.0005<0.001$)
locates $q=2829/2000=1.4145$ strictly between them. Having "infinitely many" rationals alone
never guarantees this fine spacing — it is specifically the Archimedean property's
arbitrarily-small-$1/n$ guarantee that makes the density argument go through.

## Mental Models
- **"The Archimedean property feels obvious, but it is a proven theorem built on completeness's
  own supremum machinery — never a separate assumption granted for free."**
- **"Arbitrarily small 1/n is the specific tool that makes every 'however small you pick, I can
  still get closer' argument in analysis actually work — it is a justified fact, not an intuition
  to wave at."**

## Why Students Fail

### MC-1: ARCHIMEDEAN-PROPERTY-TREATED-AS-INDEPENDENT-AXIOM
- **Surface form**: believes the Archimedean property is a separate, independently-assumed axiom
  of $\mathbb R$, rather than a theorem proven from completeness.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared Foundational severity — the
  property "feels obvious" enough to seem like a basic assumption rather than something requiring
  proof).
- **Repair**: re-walk the full contradiction proof from completeness's own supremum machinery,
  step by step.

### MC-2: DENSITY-OF-RATIONALS-TREATED-AS-UNRELATED-FACT
- **Surface form**: believes $\mathbb Q$'s density in $\mathbb R$ follows from $\mathbb Q$ simply
  "having infinitely many elements," missing the Archimedean property's specific role.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared Moderate severity —
  "infinitely many" intuitively feels sufficient for "arbitrarily close," obscuring the specific
  mechanism required).
- **Repair**: re-walk the density argument's Archimedean-based spacing choice explicitly.

### MC-3: ARBITRARILY-SMALL-1/N-ASSUMED-OBVIOUS-WITHOUT-JUSTIFICATION
- **Surface form**: treats "$1/n$ can be made smaller than any $\varepsilon$" as self-evidently
  true without recognizing it requires the Archimedean property to justify rigorously.
- **Birth type**: Type 2, perceptual intuition (Blueprint's own declared Moderate severity — the
  fact matches strong numerical intuition, making the underlying justification feel unnecessary).
- **Repair**: re-derive the corollary directly from the Archimedean property applied to
  $x=1/\varepsilon$.

## Misconceptions

### MC-1: ARCHIMEDEAN-PROPERTY-TREATED-AS-INDEPENDENT-AXIOM
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: DENSITY-OF-RATIONALS-TREATED-AS-UNRELATED-FACT
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-3: ARBITRARILY-SMALL-1/N-ASSUMED-OBVIOUS-WITHOUT-JUSTIFICATION
- **Surface form**: as described above.
- **Root cause (Type 2)**: as described above.
- **Repair**: as described above.

## Analogies
- **"The naturals racing toward infinity can never be outrun by any fixed real number — the
  Archimedean property is the proof that no finish line exists, derived from completeness, not
  assumed at the starting gun."**
- **Anti-analogy**: the Archimedean property is NOT a free assumption granted alongside
  completeness — it is completeness's own direct, provable consequence.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the full contradiction proof — assuming $\mathbb N$ bounded
  above yields a supremum $u$, then $n+1>u$ for some $n\in\mathbb N$ contradicts $u$'s upper-bound
  status.
- **Demonstration 2 (targets MC-3)**: for $\varepsilon=0.0001$, $n=10{,}001$ gives
  $1/n\approx0.00009999<\varepsilon$ — concretely justified via the Archimedean property applied
  to $x=1/\varepsilon$.
- **Demonstration 3 (targets MC-2)**: locating $q=1.4145$ strictly between $\sqrt2$ and
  $\sqrt2+0.001$ via $n=2000$'s fine-enough spacing, directly using the Archimedean-based
  corollary.

## Discovery Questions
1. "Is the Archimedean property an independent axiom of $\mathbb R$, separate from completeness,
   or can it be derived FROM completeness?"
2. "Does the density of $\mathbb Q$ in $\mathbb R$ hold for a completely unrelated reason, or does
   it rely specifically on the Archimedean property?"
3. "Is '$1/n$ can be made smaller than any $\varepsilon$' simply obvious, or does it require
   justification?"

## Teaching Sequence
1. **Deductive**: work the full contradiction proof from Component 3, isolating MC-1 by requiring
   the derivation from completeness stated explicitly, never asserted as a separate axiom.
2. **Representation shift**: Demonstration 2's concrete arbitrarily-small-$1/n$ computation,
   isolating MC-3 by requiring the corollary justified via the Archimedean property.
3. **Conceptual shift**: Demonstration 3's density application, isolating MC-2 by requiring the
   specific Archimedean mechanism (fine-enough spacing) identified, not mere infinitude.
4. **Mastery gate**: require a correct reproduction of the contradiction proof, a correct
   computation of $n$ for a new $\varepsilon$, a correct location of a rational in a new tiny
   interval, and a correct explanation of why the Archimedean property (not mere infinitude) drives
   density, at the Blueprint's own stated MAMR of 5/5 (⌈0.9×5⌉).

## Tutor Actions
- Never accept the Archimedean property stated as an independent axiom rather than a derived
  theorem.
- Never accept density of $\mathbb Q$ justified by "infinitely many rationals" alone, without the
  Archimedean mechanism named.

## Voice Teaching Notes
- Say "is that property assumed, or can you derive it from completeness?" whenever the Archimedean
  property is invoked.
- When density is discussed, ask "what specifically guarantees a rational lands in that tiny
  interval?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly reproduces the contradiction proof deriving the
  Archimedean property from completeness.
- **Rung 2 (application)**: learner correctly computes $n$ making $1/n$ smaller than a new
  prescribed $\varepsilon$.
- **Rung 3 (transfer)**: learner correctly explains, for a new convergence-definition scenario,
  why the Archimedean property is what guarantees an $N$ can always be found, and why its absence
  would break the standard $\varepsilon$-$N$ limit definition.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the full contradiction proof step by step.
- If MC-2 recurs, re-walk the density argument's Archimedean-based spacing choice.
- If MC-3 recurs, re-derive the corollary directly from the Archimedean property.

## Memory Hooks
- "The Archimedean property is proven, never assumed — completeness does the real work."
- "1/n can always be forced below any tolerance — that's a proven fact, not an intuition."
- "Density needs fine spacing, not just infinite count — the Archimedean property supplies the
  spacing."

## Transfer Connections
- `math.real.completeness` (already authored, this campaign, Batch 109): supplies the supremum
  machinery this concept's entire contradiction proof directly depends on.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.real.archimedean.md`, reused by reference
  for its completeness-based contradiction proof, its arbitrarily-small-$1/n$ corollary, its
  density-of-$\mathbb Q$ application, and its three-misconception registry (severity levels
  adopted directly as declared).
- Transfer probe: the Blueprint correctly self-reports no cross-links for this concept (empty in
  KG) — independence mode used, the Blueprint's own self-contained convergence-definition probe
  treated as complete without correction.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `math.real.
  completeness`, unlocks none, cross_links none, expert/understand, mastery_threshold 0.9,
  estimated_hours 2) was directly verified against the live KG and matches exactly.

## Version History
- 2026-09-18 (Batch 111): authored. Second entry this batch. Companion batch concept:
  `math.meas.measurable-function`.
