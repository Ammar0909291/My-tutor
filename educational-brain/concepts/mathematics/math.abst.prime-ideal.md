# math.abst.prime-ideal

## Identity
- **KG id**: `math.abst.prime-ideal`
- **Domain**: math.abst
- **Requires**: `math.abst.ideal`
- **Unlocks**: `math.abst.field`
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: analyze
- **Mastery threshold**: 0.8
- **Estimated hours**: 4

## Learning Objective
State the definitions of PRIME ideal ($ab\in P\Rightarrow a\in P$ or $b\in P$) and MAXIMAL ideal
(no proper ideal properly contains it); apply the QUOTIENT-RING CRITERION — $P$ prime iff $R/P$
is an integral domain, $M$ maximal iff $R/M$ is a field (reusing `math.abst.ideal`'s own quotient-
ring construction directly as the classification tool) — to determine whether a given ideal in
$\mathbb Z$ or $\mathbb Z[x]$ is prime, maximal, both, or neither; and correctly distinguish the
two notions by counterexample (every maximal ideal is prime, but NOT conversely).

## Core Understanding
An ideal $P\subsetneq R$ (in a commutative ring $R$) is PRIME if, for all $a,b\in R$, $ab\in P$
FORCES $a\in P$ or $b\in P$. An ideal $M\subsetneq R$ is MAXIMAL if no ideal $I$ satisfies
$M\subsetneq I\subsetneq R$ — $M$ sits as high as possible in the containment order of proper
ideals.

Checking either property ELEMENT-BY-ELEMENT is generally intractable (infinitely many pairs to
test). The QUOTIENT-RING CRITERION gives a practical shortcut, directly reusing `math.abst.
ideal`'s own $R/I$ construction: $P$ is prime **iff** $R/P$ is an INTEGRAL DOMAIN (no zero
divisors); $M$ is maximal **iff** $R/M$ is a FIELD. Since every field is automatically an
integral domain, this immediately gives the THEOREM: every maximal ideal is prime. The CONVERSE
is FALSE — a prime ideal need not be maximal.

In $\mathbb Z$: $\langle4\rangle$ is NOT prime ($\mathbb Z/\langle4\rangle\cong\mathbb Z_4$ has
$2\cdot2=0$ with $2\ne0$ — a zero divisor); $\langle5\rangle$ IS prime and maximal
($\mathbb Z/\langle5\rangle\cong\mathbb Z_5$, a field, since 5 is prime). For NONZERO ideals in
$\mathbb Z$ (a PID), prime and maximal genuinely coincide — but this coincidence is a special
property of $\mathbb Z$'s structure, NOT the general rule, and $\mathbb Z[x]$ breaks it directly:
$\langle x\rangle$ is prime ($\mathbb Z[x]/\langle x\rangle\cong\mathbb Z$, an integral domain)
but NOT maximal ($\mathbb Z$ is not a field), since $\langle x\rangle\subsetneq\langle2,x\rangle
\subsetneq\mathbb Z[x]$ — a genuine chain showing $\langle x\rangle$ is not maximal. By contrast,
$\langle2,x\rangle$ IS maximal ($\mathbb Z[x]/\langle2,x\rangle\cong\mathbb Z_2$, a field).

## Mental Models
- **"Don't check ideal primeness element by element — compute the quotient ring and ask: integral
  domain (prime) or field (maximal)?"**
- **"Maximal always implies prime (field implies integral domain) — but prime never guarantees
  maximal."**
- **"$\mathbb Z$ makes prime and maximal coincide for nonzero ideals; $\mathbb Z[x]$'s $\langle
  x\rangle$ is the canonical example where they genuinely split apart."**

## Why Students Fail

### MC-1: PRIME-ELEMENT-PRIME-IDEAL-CONFLATION
- **Surface form**: decides primeness of $\langle p\rangle$ by checking whether $p$ itself is a
  prime element, rather than applying the ideal-absorption definition or the quotient criterion.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared FOUNDATIONAL trigger, here
  attributed to $\mathbb Z$'s own coincidence: prime integer $p$ $\iff$ $\langle p\rangle$ prime
  ideal genuinely holds there, so element-level reasoning produces correct answers and is never
  corrected until a ring like $\mathbb Z[x]$, where element-primeness and ideal-primeness diverge,
  is encountered).
- **Repair**: re-derive the specific ideal's primeness via the quotient-ring criterion (compute
  $R/P$, check for zero divisors) rather than reasoning about the generating element alone.

### MC-2: EVERY-PRIME-IS-MAXIMAL
- **Surface form**: assumes prime $\Rightarrow$ maximal; claims $\langle x\rangle$ in $\mathbb
  Z[x]$ is maximal "because it is prime," without checking whether the quotient ring is a field.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared trigger, here attributed to
  the SAME $\mathbb Z$-coincidence driving MC-1 — nonzero prime ideals in $\mathbb Z$ genuinely
  ARE always maximal, so no counterexample has ever surfaced until a ring of higher Krull
  dimension like $\mathbb Z[x]$ is tried).
- **Repair**: re-verify, for the specific ideal in question, whether the quotient ring is
  additionally a FIELD (not merely an integral domain) before claiming maximality.

### MC-3: QUOTIENT-CRITERION-UNUSED
- **Surface form**: attempts direct element-wise verification of the prime-ideal definition
  (checking pairs $a,b$ with $ab\in P$) instead of computing $R/P$ and identifying its ring type.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared trigger, here attributed
  to the DEFINITION being introduced and practiced first via direct element checks — Component 3's
  own Stage C concrete examples — before the quotient-ring shortcut is established as the
  practical tool, so the slower, definitional method is what gets reached for by default).
- **Repair**: re-solve the specific classification in question via the quotient-ring criterion,
  contrasting the one-step computation against how impractical the direct element search would be.

## Misconceptions

### MC-1: PRIME-ELEMENT-PRIME-IDEAL-CONFLATION
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: EVERY-PRIME-IS-MAXIMAL
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-3: QUOTIENT-CRITERION-UNUSED
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

## Analogies
- **"The quotient ring is a diagnostic test — instead of manually inspecting every possible pair
  of ingredients for a reaction (element-wise checking), run the one test (compute $R/P$) that
  tells you everything at once: integral domain or field?"**
- **Anti-analogy**: prime and maximal are NOT interchangeable labels for "important" ideals — they
  are two distinct, independently-verifiable properties, related by a ONE-WAY implication
  (maximal $\Rightarrow$ prime), never a two-way equivalence in general.

## Demonstrations
- **Demonstration 1 (targets MC-1, MC-3)**: in $\mathbb Z$, $\langle4\rangle$: compute $\mathbb
  Z/\langle4\rangle\cong\mathbb Z_4$; find $2\cdot2=4\equiv0$ with $2\ne0$ — a zero divisor, so
  $\mathbb Z_4$ is NOT an integral domain, confirming $\langle4\rangle$ is NOT prime, in one step
  rather than an element-by-element search.
- **Demonstration 2 (targets MC-2)**: in $\mathbb Z[x]$, $\langle x\rangle$: $\mathbb Z[x]/\langle
  x\rangle\cong\mathbb Z$ (evaluation at $x=0$) is an integral domain (prime ✓) but NOT a field
  ($2$ has no inverse in $\mathbb Z$, maximal ✗); contrast $\langle2,x\rangle$: $\mathbb Z[x]/
  \langle2,x\rangle\cong\mathbb Z_2$, a field (maximal ✓, hence also prime).
- **Demonstration 3 (targets MC-1, MC-2)**: in $\mathbb Z[x]$, $\langle x^2+1\rangle$: $\mathbb
  Z[x]/\langle x^2+1\rangle\cong\mathbb Z[i]$ (Gaussian integers, via $x\mapsto i$) — an integral
  domain (prime ✓) but NOT a field, since $2$ has no multiplicative inverse in $\mathbb Z[i]$
  ($|2z|^2=4|z|^2\ge4\ne1$ for any Gaussian integer $z$) — so $\langle x^2+1\rangle$ is prime but
  NOT maximal.

## Discovery Questions
1. "If $p$ is a prime number, is $\langle p\rangle$ automatically a prime ideal — and does that
   argument work the same way in $\mathbb Z[x]$?"
2. "Does every prime ideal have to be maximal? What would a counterexample even look like?"
3. "Is there a faster way to classify an ideal than checking every possible pair of elements?"

## Teaching Sequence
1. **Anchor**: connect to `math.abst.ideal`'s own quotient-ring construction $R/I$, framing prime/
   maximal as PROPERTIES of that already-familiar quotient ring's structure.
2. **Conflict evidence**: the $\langle x\rangle$-in-$\mathbb Z[x]$ demonstration (prime but not
   maximal), breaking MC-2 directly by separating the two notions in a concrete, computable case.
3. **Contrast pair**: $\langle x\rangle$ (prime, not maximal) directly against $\langle2,x\rangle$
   (both), isolating MC-2; the one-step quotient-criterion computation against the impractical
   element-wise search, isolating MC-3.
4. **Mastery gate**: require a correct prime/maximal classification via the quotient criterion in
   $\mathbb Z$, a correct classification in $\mathbb Z[x]$ distinguishing prime-not-maximal from
   both, and a correct application to a genuinely novel two-generator ideal, at the Blueprint's own
   stated MAMR of 4/5.

## Tutor Actions
- Never accept "prime because the generator looks prime" without requiring the quotient-ring
  criterion to be applied explicitly.
- Never accept "maximal because it's prime" without a separate check that the quotient ring is a
  FIELD, not merely an integral domain.

## Voice Teaching Notes
- Say "have you computed the quotient ring, or are you reasoning about the generator alone?"
  whenever element-level reasoning substitutes for the criterion.
- When maximality is claimed from primeness alone, ask "is the quotient a field, or just an
  integral domain — have you checked?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes the quotient ring for a specific ideal in
  $\mathbb Z$ and classifies it as prime, maximal, both, or neither.
- **Rung 2 (application)**: learner correctly distinguishes a prime-not-maximal ideal from a
  prime-and-maximal ideal in $\mathbb Z[x]$, citing the quotient ring's structure in each case.
- **Rung 3 (transfer)**: learner correctly classifies a genuinely novel two-generator ideal
  (e.g. $\langle2,x^2+1\rangle$) by computing its quotient ring and comparing it against a
  previously-classified sub-ideal.

## Tutor Recovery Strategy
- If MC-1 recurs, re-derive the specific ideal's primeness via the quotient criterion for the case
  in question.
- If MC-2 recurs, re-verify whether the quotient ring is additionally a field for the specific
  ideal in question.
- If MC-3 recurs, re-solve the specific classification via the quotient criterion, contrasting it
  against the impractical direct search.

## Memory Hooks
- "Prime: quotient has no zero divisors. Maximal: quotient is a field."
- "Maximal always implies prime — never assume the reverse."
- "$\langle x\rangle$ in $\mathbb Z[x]$: prime, not maximal — the canonical split case."

## Transfer Connections
- `math.abst.ideal` (already authored, this campaign): supplies the ideal definition, the
  quotient-ring construction $R/I$, and the principal-ideal notation this concept's classification
  criterion directly reuses.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.abst.prime-ideal.md`, reused by reference for
  its representation-shift concrete-to-abstract $\mathbb Z$ table, its contrast-pair $\langle
  x\rangle$-versus-$\langle2,x\rangle$ demonstration in $\mathbb Z[x]$, its four-problem mastery-
  gate set, and its three-misconception registry (birth types independently classified, since this
  Blueprint states Trigger but not a formal Type label).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe (classifying the
  two-generator ideal $\langle2,x^2+1\rangle$ in $\mathbb Z[x]$ and comparing it against $\langle
  x^2+1\rangle$).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `math.abst.ideal`,
  unlocks `math.abst.field`, cross_links none, expert/analyze, mastery_threshold 0.8, estimated_
  hours 4) was directly verified against the live KG and matches exactly. The Blueprint's own
  correctly-declared independence P76 mode (cross_links empty in KG) required no correction.
- **This concept CLOSES the concrete two-hop chain toward `math.abst.field`** (requires `math.
  abst.ring-theory` — authored Batch 85 — and `math.abst.prime-ideal` — this entry): authoring it
  makes `math.abst.field` itself immediately ready, resolving the shared blocker that has parked
  both `math.linalg` (since Batch 80) and `math.opt` (since Batch 83).

## Version History
- 2026-09-14 (Batch 87): authored. First entry this batch, the highest-priority pick — closes the
  chain to `math.abst.field`. Companion batch concepts: `math.abst.lagrange-theorem`, `math.abst.
  quotient-ring`, `math.abst.normal-subgroup`. `math.abst` moves from 11/37 toward **15/37** this
  batch.
