# math.real.ftc-rigorous

## Identity
- **KG id**: `math.real.ftc-rigorous`
- **Domain**: math.real
- **Requires**: `math.real.riemann-integral`, `math.real.differentiability-rigorous`
- **Unlocks**: none
- **Cross-links**: `math.calc.ftc-part1` (confirmed genuinely authored via `ls`; genuine
  cross-link probe used, consistent with the Blueprint's own correctly-checked claim)
- **Difficulty**: expert
- **Bloom level**: understand
- **Mastery threshold**: 0.9
- **Estimated hours**: 4

## Learning Objective
Recognize `math.calc.ftc-part1`'s known statement as a SPECIAL CASE of this concept's more
general Part 1, which additionally proves $F(x)=\int_a^xf$ is LIPSCHITZ whenever $f$ is merely
integrable, and $F'(x_0)=f(x_0)$ at any INDIVIDUAL point of continuity even amid other
discontinuities; prove the Lipschitz bound from boundedness alone and the differentiability
conclusion via $\varepsilon$-$\delta$ at a continuity point; and prove Part 2 via the Mean Value
Theorem's telescoping sum, recognizing it as LOGICALLY INDEPENDENT of Part 1 — Part 2 assumes an
antiderivative exists, Part 1 constructs one.

## Core Understanding
PART 1 GENERALIZES `math.calc.ftc-part1` IN TWO GENUINE WAYS: for $f(t)=t$ ($t\ne0$), $f(0)=5$ (a
function discontinuous at $t=0$ but bounded, hence integrable): `math.calc.ftc-part1`'s version
(requiring continuity EVERYWHERE) cannot apply directly. But THIS concept's Part 1 applies at any
point of continuity, e.g. $x_0=2$: $F'(2)=f(2)=2$, genuinely provable despite the discontinuity
elsewhere — confirming Part 1's strictly BROADER applicability, not a mere restatement.

THE LIPSCHITZ BOUND USES ONLY BOUNDEDNESS; DIFFERENTIABILITY NEEDS CONTINUITY AT THE POINT — TWO
SEPARATE HYPOTHESES: since $f$ integrable implies bounded ($|f(t)|\le M$), additivity gives
$|F(y)-F(x)|=\left|\int_x^yf\,dt\right|\le M|x-y|$ — the Lipschitz condition, needing ONLY
boundedness. For $f(t)=\sin t$ on $[0,\pi]$ ($M=1$): $F(x)=1-\cos x$, and $|F(y)-F(x)|=
|\cos x-\cos y|\le|x-y|$, matching $M=1$ exactly — verified with NO continuity argument. Separately,
$F'(x_0)=f(x_0)$ at a continuity point $x_0$ uses an $\varepsilon$-$\delta$ argument: the
difference quotient is an average of $f$ over a shrinking interval, forced within $\varepsilon$ of
$f(x_0)$ by continuity AT that point specifically — verified at $x_0=\pi/2$: $F'(\pi/2)=\sin(\pi/2)
=1$.

PART 2'S PROOF USES MVT'S TELESCOPING SUM, AND RUNS IN THE OPPOSITE LOGICAL DIRECTION FROM PART 1:
given an antiderivative $F$ of $f$ ALREADY ASSUMED to exist (not the Part-1-constructed $F$),
partition $[a,b]$ and apply MVT on each subinterval: $F(x_i)-F(x_{i-1})=f(c_i)(x_i-x_{i-1})$ for
some $c_i$. Summing telescopically: $F(b)-F(a)=\sum_if(c_i)(x_i-x_{i-1})$ — EXACTLY a Riemann sum
for $f$, converging to $\int_a^bf$ as the partition refines. For $f(t)=2t$ on $[1,3]$,
$F(t)=t^2$: partitioning at $\{1,2,3\}$ gives $c_1=1.5,c_2=2.5$, and $F(3)-F(1)=8=f(c_1)+f(c_2)$
matches $\int_1^32t\,dt=8$ exactly. Part 1 CONSTRUCTS $F$ from the integral; Part 2 ASSUMES $F$
exists and evaluates the integral from it — logically opposite directions, never the same claim
twice.

## Mental Models
- **"Part 1's Lipschitz guarantee needs only boundedness — its differentiability guarantee needs
  continuity, but only exactly where you're checking, never everywhere."**
- **"Part 1 builds a candidate antiderivative from the integral and studies it; Part 2 starts from
  an antiderivative you already have and reads the integral off of it — opposite directions,
  never the same proof twice."**

## Why Students Fail

### MC-1: RIGOROUS-FTC1-ASSUMED-MERE-RESTATEMENT
- **Surface form**: believes this concept's Part 1 is just a restatement of
  `math.calc.ftc-part1`'s FTC1.
- **Birth type**: Foundational severity (Blueprint's own declared severity — the same named
  theorem, seen again, naturally reads as a repeat rather than a genuine strengthening).
- **Repair**: re-walk the single-discontinuity function example where the calculus-level version
  cannot apply directly but this concept's version still does.

### MC-2: LIPSCHITZ-CONCLUSION-CONFLATED-WITH-DIFFERENTIABILITY-HYPOTHESIS
- **Surface form**: believes proving $F$ is Lipschitz requires $f$ to be continuous, like the
  differentiability conclusion does.
- **Birth type**: High severity (Blueprint's own declared severity — both conclusions concern $F$
  built from $f$, making their genuinely different hypotheses easy to merge).
- **Repair**: re-walk the separate verifications — Lipschitz from boundedness alone,
  differentiability from continuity at the specific point.

### MC-3: PART-1-AND-PART-2-ASSUMED-SAME-DIRECTION
- **Surface form**: believes Part 1 and Part 2 prove the same claim in the same logical
  direction.
- **Birth type**: High severity (Blueprint's own declared severity — both parts relate $F$ and
  $f$ via the integral, obscuring their opposite construction-versus-assumption structure).
- **Repair**: re-walk the MVT telescoping proof, re-anchoring on $F$ being GIVEN in Part 2, never
  constructed.

## Misconceptions

### MC-1: RIGOROUS-FTC1-ASSUMED-MERE-RESTATEMENT
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

### MC-2: LIPSCHITZ-CONCLUSION-CONFLATED-WITH-DIFFERENTIABILITY-HYPOTHESIS
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

### MC-3: PART-1-AND-PART-2-ASSUMED-SAME-DIRECTION
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

## Analogies
- **"Part 1 is like building a smooth ramp out of raw materials and then testing how smooth it
  turned out; Part 2 is like being handed a finished ramp and reading off how much material was
  used — opposite tasks, not the same inspection twice."**
- **Anti-analogy**: Lipschitz continuity of $F$ does NOT require $f$ to be continuous anywhere —
  boundedness alone is the entire hypothesis for that conclusion.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: $f(t)=t$ ($t\ne0$), $f(0)=5$'s single discontinuity, with
  Part 1 still applying at $x_0=2$.
- **Demonstration 2 (targets MC-2)**: $\sin t$'s Lipschitz bound (from boundedness alone) versus
  its pointwise differentiability (from continuity at $\pi/2$).
- **Demonstration 3 (targets MC-3)**: the MVT telescoping proof for $f(t)=2t$, $F(t)=t^2$, with
  $F$ given as a hypothesis.

## Discovery Questions
1. "Is this concept's Part 1 just a restatement of the calculus-level FTC1, or does it prove
   something genuinely more general?"
2. "Does proving F is Lipschitz require f to be continuous, the same way proving F'(x₀)=f(x₀)
   does?"
3. "Do Part 1 and Part 2 prove the same claim in the same logical direction, just phrased
   differently?"

## Teaching Sequence
1. **Representation shift**: the single-discontinuity function showing Part 1's broader
   applicability, isolating MC-1.
2. **Conflict evidence**: the separate Lipschitz-from-boundedness and differentiability-from-
   continuity verifications, isolating MC-2.
3. **Contrast pair**: Part 1's construction versus Part 2's assumption-and-evaluation structure,
   isolating MC-3.
4. **Mastery gate**: require a correct identification of where a discontinuous-but-integrable
   function's $F$ is differentiable, a correct Lipschitz-bound proof from boundedness, and a
   correct MVT-telescoping verification of Part 2, at the Blueprint's own stated MAMR of 5/5
   (⌈0.9×5⌉).

## Tutor Actions
- Never accept this concept's Part 1 dismissed as a mere restatement of the calculus-level FTC1.
- Never accept the Lipschitz conclusion's hypothesis conflated with the differentiability
  conclusion's hypothesis.
- Never accept Part 1 and Part 2 treated as the same claim proved in the same direction.

## Voice Teaching Notes
- Say "does that conclusion need only boundedness, or does it need continuity at a specific
  point?" whenever Part 1's two conclusions are discussed.
- When Part 2 is invoked, ask "is the antiderivative given, or are you constructing it from the
  integral?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly identifies at which points a discontinuous-but-
  integrable function's $F$ is guaranteed differentiable.
- **Rung 2 (application)**: learner correctly proves the Lipschitz bound directly from the
  integral's additivity for a new bounded function.
- **Rung 3 (transfer)**: learner correctly explains, for a velocity function with a single
  discontinuity, at which times position is differentiable, why position remains Lipschitz
  regardless, and how Part 2 would be used separately given a known antiderivative.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the single-discontinuity function example.
- If MC-2 recurs, re-walk the separate Lipschitz and differentiability verifications.
- If MC-3 recurs, re-walk the MVT telescoping proof with $F$ given as a hypothesis.

## Memory Hooks
- "Part 1 is broader than the calculus version — pointwise continuity and mere integrability both
  suffice for their respective conclusions."
- "Lipschitz needs only boundedness; differentiability needs continuity exactly where you check."
- "Part 1 builds F from the integral; Part 2 assumes F and reads the integral off it — opposite
  directions."

## Transfer Connections
- `math.real.riemann-integral` (already authored, this campaign, Batch 135): supplies Darboux
  sums, integrability, and the boundedness-of-integrable-functions fact this concept's Lipschitz
  proof directly uses.
- `math.real.differentiability-rigorous` (already authored, this campaign, Batch 132): supplies
  the rigorous differentiability definition and Mean Value Theorem framework Part 2's proof
  directly uses.
- `math.calc.ftc-part1` (already authored, certified domain): the KG's declared cross-link, whose
  global-continuity-hypothesis version is exactly the special case of this concept's Part 1.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.real.ftc-rigorous.md`, reused by reference
  for its single-discontinuity generalization example, its separate Lipschitz/differentiability
  verifications, its MVT telescoping proof of Part 2, and its three-misconception registry
  (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own genuine cross-link probe against `math.calc.ftc-part1`,
  reasoning about a velocity function with a single instantaneous discontinuity and its position
  function's differentiability and Lipschitz properties.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.real.riemann-integral`/`math.real.differentiability-rigorous`, unlocks none, cross_links
  `math.calc.ftc-part1`, expert/understand, mastery_threshold 0.9, estimated_hours 4) was directly
  verified against the live KG and matches exactly. The Blueprint's own cross-link-probe P76 mode
  was independently re-verified via `ls educational-brain/concepts/mathematics/`
  (`math.calc.ftc-part1` genuinely authored) and required no correction.

## Version History
- 2026-09-19 (Batch 136): authored. First entry this batch. Companion batch concept:
  `math.real.riemann-integrability`.
