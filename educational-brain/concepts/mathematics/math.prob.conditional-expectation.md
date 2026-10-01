# math.prob.conditional-expectation

## Identity
- **KG id**: `math.prob.conditional-expectation`
- **Domain**: math.prob
- **Requires**: `math.prob.conditional-distribution`
- **Unlocks**: none
- **Cross-links**: `math.prob.martingale` (not yet authored in the EB corpus — see Curriculum
  Feedback)
- **Difficulty**: expert
- **Bloom level**: analyze
- **Mastery threshold**: 0.8
- **Estimated hours**: 6

## Learning Objective
Recognize $E[X\mid Y]$ as a RANDOM VARIABLE (a function of $Y$), NEVER a single number like
$E[X\mid Y=y]$ for one fixed $y$; apply the tower property $E[X]=E[E[X\mid Y]]$ as an EXACT
identity, NEVER an approximation; and recognize (orientation level) the law of total variance
decomposes $\text{Var}(X)$ into within-group and between-group parts, NEVER merely a value-check
formula.

## Core Understanding
$E[X\mid Y]$ IS A RANDOM VARIABLE, A FUNCTION OF $Y$ — NEVER A SINGLE NUMBER: for the joint PMF
$f(1,1)=0.1,f(1,2)=0.2,f(2,1)=0.3,f(2,2)=0.4$: $E[X\mid Y=1]=1.75$ and $E[X\mid Y=2]\approx1.67$.
$E[X\mid Y]$ (without fixing $y$) is the FUNCTION $g$ with $g(1)=1.75$ and $g(2)\approx1.67$ — a
genuinely different object from either single number, since it packages BOTH conditional
expectations as one function of $Y$. Believing $E[X\mid Y]$ (unconditioned on a specific value) is
just another way of writing a single number misses that it is a random variable — taking a
different value depending on which value $Y$ happens to take.

THE TOWER PROPERTY IS AN EXACT IDENTITY — NEVER AN APPROXIMATION: continuing the example, with
$f_Y(1)=0.4$, $f_Y(2)=0.6$: $E[E[X\mid Y]]=1.75(0.4)+\frac53(0.6)=0.7+1=1.7$ — matching EXACTLY
the directly-computed marginal expectation $E[X]=1.7$. Believing the tower property gives only an
APPROXIMATE estimate of $E[X]$ misses that conditioning on $Y$ and then averaging over $Y$'s own
distribution is mathematically GUARANTEED to reproduce $E[X]$ exactly, every time — never merely
approximately or by coincidence.

THE LAW OF TOTAL VARIANCE REVEALS WHERE VARIANCE COMES FROM — NEVER JUST A VALUE-CHECK: for a
factory with two production lines with EQUAL within-line variability ($E[\text{Var}(X\mid Y)]=
0.5$) but very different average defect counts ($E[X\mid Y=1]=0.5$ vs. $E[X\mid Y=2]=5$, giving a
LARGE $\text{Var}(E[X\mid Y])$): MOST of $X$'s total variance comes from the BETWEEN-line
difference in averages, not from within-line randomness. Believing the law of total variance
mainly serves to double-check $\text{Var}(X)$'s numeric value, without revealing anything about
WHERE that variance comes from, misses that its real value is decomposing total variance into
interpretable within-group and between-group sources.

## Mental Models
- **"E[X|Y] is a packaged function — one conditional expectation per possible value of Y, never
  collapsed into a single number."**
- **"The tower property isn't a shortcut estimate — condition then average, and you get the exact
  marginal expectation every time."**
- **"Total variance has a source — the law of total variance splits it into within-group noise
  and between-group difference, never leaving that split unexamined."**

## Why Students Fail

### MC-1: E-X-GIVEN-Y-ASSUMED-SINGLE-NUMBER
- **Surface form**: believes $E[X\mid Y]$ (unconditioned on a specific value) is just another way
  of writing a single number, missing that it is a random variable — a function of $Y$.
- **Birth type**: Foundational severity (Blueprint's own declared severity).
- **Repair**: re-walk the packaging of $g(1)$ and $g(2)$ into one function, re-anchoring on
  "$E[X\mid Y]$ is a random variable, a function of $Y$."

### MC-2: TOWER-PROPERTY-ASSUMED-APPROXIMATE
- **Surface form**: believes the tower property $E[X]=E[E[X\mid Y]]$ gives only an approximate
  estimate of $E[X]$, missing that it is an exact identity.
- **Birth type**: High severity (Blueprint's own declared severity).
- **Repair**: re-walk the exact-match verification, re-anchoring on "the tower property is an
  exact identity, not an approximation."

### MC-3: TOTAL-VARIANCE-ASSUMED-UNDIFFERENTIATED
- **Surface form**: believes the law of total variance mainly double-checks $\text{Var}(X)$'s
  value without revealing its sources, missing that it decomposes variance into within-group and
  between-group parts.
- **Birth type**: Moderate severity (Blueprint's own declared severity).
- **Repair**: re-walk the within-versus-between decomposition, re-anchoring on "its real value is
  revealing WHERE variance comes from."

## Misconceptions

### MC-1: E-X-GIVEN-Y-ASSUMED-SINGLE-NUMBER
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: TOWER-PROPERTY-ASSUMED-APPROXIMATE
- **Surface form**: as described above.
- **Root cause (High)**: as described above.
- **Repair**: as described above.

### MC-3: TOTAL-VARIANCE-ASSUMED-UNDIFFERENTIATED
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"E[X|Y] is a vending machine's price list — one number per selection, never a single fixed
  price until you actually pick one."**
- **Anti-analogy**: the tower property is not a rough shortcut — it's a guaranteed exact
  accounting identity, like summing a bill's line items and always matching the total.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the $g(1)=1.75$, $g(2)\approx1.67$ function-packaging
  construction.
- **Demonstration 2 (targets MC-2)**: the exact $E[E[X\mid Y]]=1.7$-matches-$E[X]=1.7$
  verification.
- **Demonstration 3 (targets MC-3)**: the two-production-line within-versus-between variance
  decomposition.

## Discovery Questions
1. "Is E[X|Y] (without fixing Y) a single number, or a function that depends on which value Y
   takes?"
2. "Does the tower property give an approximate estimate of E[X], or the exact value?"
3. "Does the law of total variance just double-check a number, or does it tell you WHERE the
   variance comes from?"

## Teaching Sequence
1. **Representation shift**: the function-packaging construction, working Demonstration 1,
   isolating MC-1.
2. **Conflict evidence**: the exact tower-property verification, working Demonstration 2,
   isolating MC-2.
3. **Contrast pair**: the within-versus-between variance decomposition, working Demonstration 3,
   isolating MC-3.
4. **Mastery gate**: require a correct description of $E[X\mid Y]$ as a function, a correct exact
   tower-property computation, and a correct qualitative explanation of which variance source
   dominates in a given scenario, at the Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept $E[X\mid Y]$ (unconditioned on a value) treated as a single number.
- Never accept the tower property described as merely approximate.
- Never accept the law of total variance treated as only a numeric double-check with no
  interpretive content.

## Voice Teaching Notes
- Say "is that a function of Y, or a number for one specific value of Y?" whenever $E[X\mid Y]$ is
  discussed without a fixed value.
- Ask "is this exact, or just an estimate?" whenever the tower property is applied.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly constructs $E[X\mid Y]$ as a function from given
  conditional expectations.
- **Rung 2 (application)**: learner correctly verifies the tower property reproduces a
  directly-computed marginal expectation exactly.
- **Rung 3 (transfer)**: learner correctly determines whether within-type or between-type
  variability dominates in an insurance claim-size scenario, using the law of total variance.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the function-packaging construction.
- If MC-2 recurs, re-walk the exact tower-property verification.
- If MC-3 recurs, re-walk the within-versus-between decomposition.

## Memory Hooks
- "E[X|Y] is a packaged function — never a single number until Y is fixed."
- "Tower property is exact — condition then average, every time, no approximation."
- "Total variance has a source — within-group noise versus between-group difference."

## Transfer Connections
- `math.prob.conditional-distribution` (already authored, certified domain): supplies
  $E[X\mid Y=y]$ for one fixed $y$, directly extended here to the random variable $E[X\mid Y]$.
- `math.prob.martingale` (unauthored cross-link target, see Curriculum Feedback): will build on
  the law of total variance's role as the variance analogue of the tower property.

## Cross-Subject Connections
- Insurance actuarial modeling: computing overall average claim size across policy types via the
  tower property, and diagnosing whether policy type is a useful variable via the law of total
  variance, is a genuine actuarial application.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.prob.conditional-expectation.md`, reused by
  reference for its $E[X\mid Y]$ function-packaging example, its exact tower-property
  verification, its two-production-line variance decomposition, and its three-misconception
  registry (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe on an insurance company's claim
  size conditional on policy type, applying the tower property and the law of total variance.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Wrong-corpus-status cross-link claim — corrected using independence mode**: the Blueprint's
  Component 7 correctly identifies `math.prob.martingale` as the KG's cross-link and explicitly
  notes (having checked `docs/curriculum/blueprints/`) it was not yet authored as a Blueprint,
  setting P76_mode to independence. Direct verification via `ls
  educational-brain/concepts/mathematics/math.prob.martingale.md` confirms it is likewise NOT YET
  authored in the EB corpus — this EB file follows the Blueprint's own independence-mode probe
  accordingly, no correction needed beyond confirming the same unauthored status persists. All
  other fields (requires `math.prob.conditional-distribution`, unlocks none, expert/analyze,
  mastery_threshold 0.8, estimated_hours 6) were directly verified against the live KG and match
  exactly.

## Version History
- 2026-09-19 (Batch 217): authored. First entry this batch. Companion batch concept:
  `math.num.error-analysis`.
