# math.real.riemann-integral

## Identity
- **KG id**: `math.real.riemann-integral`
- **Domain**: math.real
- **Requires**: `math.real.continuity-rigorous`, `math.calc.definite-integral`
- **Unlocks**: `math.real.riemann-integrability`, `math.real.ftc-rigorous`
- **Cross-links**: `math.meas.lebesgue-integral` (Blueprint-claimed as "not yet authored," correct
  when the Blueprint was written — but NOW authored, verified via `ls`; upgraded to a GENUINE
  cross-link probe, see Curriculum Feedback)
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 6

## Learning Objective
Define a PARTITION of $[a,b]$ and the upper/lower DARBOUX SUMS $U(f,P)$ (using the SUPREMUM on
each subinterval) and $L(f,P)$ (using the INFIMUM); state rigorous Riemann integrability
($\inf_P U(f,P)=\sup_P L(f,P)$) and interpret why this "squeeze" condition captures a well-defined
area; and state that Riemann integrable functions are BOUNDED (necessary, not sufficient) and
continuous functions ARE integrable, identifying a bounded function (the Dirichlet function) that
FAILS to be integrable.

## Core Understanding
DARBOUX SUMS SQUEEZE THE TRUE AREA FROM ABOVE AND BELOW: for $f(x)=x^2$ on $[0,2]$, partition
$P=\{0,1,2\}$: on $[0,1]$, $\sup f=1,\inf f=0$; on $[1,2]$, $\sup f=4,\inf f=1$. $U(f,P)=1+4=5$,
$L(f,P)=0+1=1$. Refining to $P'=\{0,0.5,1,1.5,2\}$: $U(f,P')=3.75$, $L(f,P')=1.75$ — both bounds
moving CLOSER to the true value $8/3\approx2.67$.

RIEMANN INTEGRABILITY REQUIRES THE BEST POSSIBLE BOUNDS TO COINCIDE EXACTLY, OVER ALL PARTITIONS:
$f$ is Riemann integrable iff $\inf_P U(f,P)=\sup_P L(f,P)$ — the smallest possible upper estimate
and the largest possible lower estimate, taken over EVERY partition, must match exactly. This
common value IS $\int_a^b f\,dx$, making the informal "limit of Riemann sums" from
`math.calc.definite-integral` fully rigorous: the bounds must genuinely converge to the SAME
number, never merely "look close."

BOUNDEDNESS IS NECESSARY BUT NOT SUFFICIENT — THE DIRICHLET FUNCTION PROVES IT: for $f(x)=1$ if
$x$ rational, $0$ if irrational, on $[0,1]$: every subinterval, however small, contains BOTH
rationals and irrationals (density), so EVERY partition gives $U(f,P)=1$ and $L(f,P)=0$. Thus
$\inf_P U=1\ne0=\sup_P L$ — NOT Riemann integrable, despite being perfectly bounded (values only 0
or 1). Boundedness rules out one failure mode (unbounded functions definitely fail) but never
guarantees success on its own.

## Mental Models
- **"Upper and lower Darboux sums are over- and under-rectangles bracketing the true area — Riemann
  integrability demands the tightest possible versions of each converge to the identical number."**
- **"Boundedness only rules out one way to fail — it never guarantees the squeeze condition
  actually closes."**

## Why Students Fail

### MC-1: BOUNDEDNESS-ASSUMED-SUFFICIENT-FOR-INTEGRABILITY
- **Surface form**: believes a bounded function must automatically be Riemann integrable.
- **Birth type**: Foundational severity (Blueprint's own declared severity — boundedness is the
  concept's own stated necessary condition, making it easy to over-read as sufficient too).
- **Repair**: re-walk the Dirichlet function's explicit $U=1,L=0$ computation for every partition.

### MC-2: UPPER-LOWER-SUMS-CONFUSED-WITH-SUP-INF-OVER-ALL-PARTITIONS
- **Surface form**: confuses $U(f,P)$/$L(f,P)$ for one specific partition with $\inf_P U(f,P)$/
  $\sup_P L(f,P)$ over ALL partitions.
- **Birth type**: Moderate severity (Blueprint's own declared severity — the notation for a single
  partition's sums and the best-over-all-partitions quantities look deceptively similar).
- **Repair**: re-anchor on the definition explicitly requiring the infimum/supremum over EVERY
  possible partition, not one data point.

### MC-3: FINER-PARTITION-ASSUMED-TO-ALWAYS-CLOSE-THE-GAP
- **Surface form**: believes refining a partition always eventually closes the $U-L$ gap for any
  function.
- **Birth type**: Moderate severity (Blueprint's own declared severity — the continuous-function
  case where refinement genuinely closes the gap makes this feel like a universal pattern).
- **Repair**: re-derive that every subinterval of the Dirichlet function, however small, still
  contains both rationals and irrationals, so the gap persists at every refinement level.

## Misconceptions

### MC-1: BOUNDEDNESS-ASSUMED-SUFFICIENT-FOR-INTEGRABILITY
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

### MC-2: UPPER-LOWER-SUMS-CONFUSED-WITH-SUP-INF-OVER-ALL-PARTITIONS
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

### MC-3: FINER-PARTITION-ASSUMED-TO-ALWAYS-CLOSE-THE-GAP
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

## Analogies
- **"Darboux sums are like squeezing a number between an ever-tighter ceiling and floor — Riemann
  integrability means those two constructions eventually meet at a single point, not just get
  close."**
- **Anti-analogy**: boundedness is NOT a green light for integrability — the Dirichlet function is
  perfectly bounded yet the squeeze condition fails completely, at every partition, no matter how
  fine.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the Dirichlet function's persistent $U=1,L=0$ gap despite
  boundedness.
- **Demonstration 2 (targets MC-2)**: the refinement from $P$ to $P'$ for $x^2$ on $[0,2]$,
  narrowing toward but not yet reaching $\inf U=\sup L$.
- **Demonstration 3 (targets MC-3)**: the contrast between $x^2$'s shrinking gap under refinement
  and the Dirichlet function's persistent, unshrinkable gap.

## Discovery Questions
1. "Since the Dirichlet function is bounded (only takes values 0 and 1), must it be Riemann
   integrable?"
2. "Is computing U(f,P) for one specific partition enough to determine Riemann integrability?"
3. "Does refining a partition always eventually close the U−L gap, for any function?"

## Teaching Sequence
1. **Representation shift**: the Darboux-sum squeezing process, working the $x^2$ refinement
   example.
2. **Contrast pair**: the Dirichlet function's persistent gap versus $x^2$'s shrinking gap,
   isolating MC-1 and MC-3.
3. **Conceptual anchor**: the single-partition-versus-all-partitions distinction, isolating MC-2.
4. **Mastery gate**: require a correct Darboux sum computation for a new partition, a correct
   explanation of why an unbounded function cannot be integrable, and a correct explanation of why
   the Dirichlet function's boundedness doesn't save it, at the Blueprint's own stated MAMR of 5/5
   (⌈0.85×5⌉).

## Tutor Actions
- Never accept boundedness alone presented as sufficient for Riemann integrability.
- Never accept a single partition's $U(f,P)$/$L(f,P)$ treated as determining integrability on its
  own.
- Never accept a claim that refining a partition always closes the gap for every function.

## Voice Teaching Notes
- Say "is that true for one partition, or for the best possible bound over every partition?"
  whenever integrability is being checked.
- When a bounded function's integrability is discussed, ask "does the squeeze condition actually
  close, or just the boundedness condition hold?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes Darboux sums for a new function and
  partition.
- **Rung 2 (application)**: learner correctly explains why an unbounded function cannot be
  Riemann integrable, connecting to the definition of $U(f,P)$.
- **Rung 3 (transfer)**: learner correctly explains why a genuinely continuous physical quantity's
  integral is guaranteed to exist, and why a hypothetical rational/irrational-valued signal
  function's integral would not exist in the Riemann sense.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the Dirichlet function's persistent gap computation.
- If MC-2 recurs, re-anchor on the all-partitions definition.
- If MC-3 recurs, re-derive the density argument showing the gap never closes for the Dirichlet
  function.

## Memory Hooks
- "Boundedness rules out one failure mode — it never guarantees success on its own."
- "Integrability needs the BEST possible bounds over ALL partitions to match — not just one
  partition's sums."
- "Some bounded functions never let the gap close, no matter how fine the partition."

## Transfer Connections
- `math.real.continuity-rigorous` (already authored, this campaign, Batch 130): supplies the
  $\varepsilon$-$\delta$ continuity definition underlying the continuous-implies-integrable fact.
- `math.real.riemann-integrability` (not yet authored): the KG's declared unlock, building a
  deeper characterization of exactly which functions are Riemann integrable.
- `math.real.ftc-rigorous` (not yet authored): the KG's declared unlock, requiring this concept's
  precise integral definition for the rigorous Fundamental Theorem of Calculus.
- `math.meas.lebesgue-integral` (already authored, verified via `ls` — corrected from the
  Blueprint's stale "not yet authored" claim): the KG's declared cross-link, whose own treatment
  of the IDENTICAL Dirichlet function shows Lebesgue integration succeeding ($\int f\,d\mu=0$,
  since the rationals have measure zero) exactly where Riemann integration fails completely.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.real.riemann-integral.md`, reused by
  reference for its Darboux-sum worked examples, its Dirichlet-function non-integrability proof,
  and its three-misconception registry (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own content (originally independence-mode, upgraded here to a
  genuine cross-link probe against `math.meas.lebesgue-integral`), contrasting the physicist's
  genuinely continuous temperature integral against the engineer's Dirichlet-style signal, now
  connected directly to that concept's own demonstration that Lebesgue integration handles the
  identical Dirichlet function trivially ($\int f\,d\mu=1\cdot\mu(\mathbb Q\cap[0,1])=0$) where
  Riemann integration has no answer at all — a genuine extension, not equivalence.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Blueprint/P76-mode discrepancy found and corrected (reverse direction, parallel to Batches
  112/122/123/131's pattern)**: the Blueprint's own Component 7 states `math.meas.lebesgue-
  integral` was checked via `ls docs/curriculum/blueprints/` and confirmed NOT YET authored at
  write-time — correct then, but verified via `ls educational-brain/concepts/mathematics/` that
  `math.meas.lebesgue-integral` IS now authored. Upgraded from independence mode to a GENUINE
  CROSS-LINK PROBE, directly connecting this concept's Dirichlet-function non-integrability proof
  to that concept's own demonstration of Lebesgue integration succeeding on the identical
  function. All other fields (requires `math.real.continuity-rigorous`/`math.calc.definite-
  integral`, unlocks `math.real.riemann-integrability`/`math.real.ftc-rigorous`, cross_links
  `math.meas.lebesgue-integral`, expert/apply, mastery_threshold 0.85, estimated_hours 6) matched
  exactly.

## Version History
- 2026-09-19 (Batch 135): authored. First entry this batch. Companion batch concept:
  `math.real.uniform-convergence`.
