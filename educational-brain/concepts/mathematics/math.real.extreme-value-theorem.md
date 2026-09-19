# math.real.extreme-value-theorem

## Identity
- **KG id**: `math.real.extreme-value-theorem`
- **Domain**: math.real
- **Requires**: `math.real.compactness`, `math.real.continuity-rigorous`
- **Unlocks**: none
- **Cross-links**: `math.calc.optimization` (confirmed genuinely authored via `ls`; genuine
  cross-link probe used, consistent with the Blueprint's own correctly-checked claim)
- **Difficulty**: expert
- **Bloom level**: understand
- **Mastery threshold**: 0.85
- **Estimated hours**: 3

## Learning Objective
Recognize this theorem as answering the EXISTENCE question `math.calc.optimization`'s own
critical-points-and-endpoints method silently PRESUPPOSES — that a global max/min genuinely
EXISTS to be found; prove the theorem's two-step structure (continuous image of a compact set is
compact; a compact subset of $\mathbb R$ is closed and bounded, hence CONTAINS its own supremum
and infimum); and identify why DROPPING either hypothesis (continuity or compactness) breaks the
conclusion, via a concrete counterexample for each.

## Core Understanding
THIS THEOREM SUPPLIES THE EXISTENCE GUARANTEE `math.calc.optimization`'S METHOD PRESUPPOSES:
that method finds global extrema by checking critical points and endpoints — an effective
procedure that implicitly ASSUMES a global max and min actually exist among those candidates. For
$f(x)=x^3-3x$ on $[-2,2]$: critical points at $x=\pm1$ ($f'(x)=3x^2-3=0$), evaluated alongside
endpoints $x=\pm2$, give candidates $\{f(-2),f(-1),f(1),f(2)\}=\{-2,2,-2,2\}$. This method's
RELIABILITY — that the true global extrema are guaranteed to appear among these finitely many
candidates — rests entirely on THIS theorem: $f$ continuous and $[-2,2]$ compact guarantees a max
and min exist at all.

THE PROOF'S TWO STEPS: CONTINUOUS IMAGE OF COMPACT IS COMPACT, THEN CLOSED-AND-BOUNDED SECURES
ATTAINMENT: for $f(x)=x^2$ on $K=[-1,2]$: $f(K)=[0,4]$. STEP 1 (via `math.real.compactness`'s own
fact): $f(K)$ is compact since $K$ is. STEP 2 (Heine-Borel): $[0,4]$ being CLOSED means its
supremum (4) and infimum (0) are genuinely CONTAINED in $f(K)$, not merely approached — contrast
a hypothetical open image $(0,4)$, where the same numeric bounds would be approached but never
attained. BOUNDEDNESS ALONE only guarantees a supremum/infimum exists as a number; CLOSEDNESS is
the extra ingredient guaranteeing that number is actually a member of $f(K)$, i.e. some point of
$K$ genuinely maps to it.

BOTH HYPOTHESES ARE INDEPENDENTLY NECESSARY — DROPPING EITHER BREAKS THE CONCLUSION: dropping
COMPACTNESS: $f(x)=x$ on non-compact $(0,1)$ is continuous, yet has no maximum (values approach 1
but $1\notin(0,1)$) and no minimum. Dropping CONTINUITY: $g(x)=x$ for $x\in[0,1)$, $g(1)=0$ (a
jump discontinuity) on the COMPACT $[0,1]$: $\sup g=1$ (approached as $x\to1^-$) but $g(1)=0\ne1$
— the supremum is never attained, despite compactness genuinely holding. Each counterexample
isolates exactly one hypothesis's failure.

## Mental Models
- **"Checking finitely many candidate points for a global optimum only makes sense if there's
  genuinely something to find among them — this theorem is what guarantees that."**
- **"Boundedness gives you a number to aim at; closedness is what guarantees some point actually
  hits it."**

## Why Students Fail

### MC-1: OPTIMIZATION-METHOD-ASSUMED-SELF-GUARANTEEING
- **Surface form**: believes `math.calc.optimization`'s critical-points-and-endpoints method
  automatically guarantees a global maximum exists.
- **Birth type**: Foundational severity (Blueprint's own declared severity — a reliable-feeling
  computational procedure naturally seems self-justifying, obscuring its dependence on a separate
  existence guarantee).
- **Repair**: re-walk the direct connection between this theorem's guarantee and the
  optimization method's reliability.

### MC-2: BOUNDEDNESS-ASSUMED-SUFFICIENT-FOR-ATTAINMENT
- **Surface form**: believes boundedness of $f(K)$ alone guarantees $f$ attains a maximum.
- **Birth type**: High severity (Blueprint's own declared severity — boundedness is the more
  visually obvious condition, making closedness's independent role easy to overlook).
- **Repair**: re-walk the closed-versus-hypothetical-open image contrast.

### MC-3: COMPACTNESS-ASSUMED-TO-SUBSUME-CONTINUITY-REQUIREMENT
- **Surface form**: believes compactness of the domain alone suffices for the extreme value
  guarantee, regardless of continuity.
- **Birth type**: Moderate severity (Blueprint's own declared severity — compactness feels like
  the "main" structural hypothesis, making continuity's independent necessity easy to
  underweight).
- **Repair**: re-walk the discontinuous-function-on-compact-domain counterexample.

## Misconceptions

### MC-1: OPTIMIZATION-METHOD-ASSUMED-SELF-GUARANTEEING
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

### MC-2: BOUNDEDNESS-ASSUMED-SUFFICIENT-FOR-ATTAINMENT
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

### MC-3: COMPACTNESS-ASSUMED-TO-SUBSUME-CONTINUITY-REQUIREMENT
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

## Analogies
- **"Checking a finite candidate list for the best option only works if the best option is
  guaranteed to be somewhere on the list — this theorem is what puts it there."**
- **Anti-analogy**: a bounded set of output values is NOT automatically a set where the extreme
  values are achieved — boundedness alone leaves open the possibility that the extreme values are
  only approached, never reached.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the cubic $f(x)=x^3-3x$ on $[-2,2]$, whose optimization-
  method reliability depends entirely on this theorem.
- **Demonstration 2 (targets MC-2)**: $f(K)=[0,4]$'s closedness securing genuine attainment,
  contrasted against a hypothetical open image.
- **Demonstration 3 (targets MC-3)**: the two isolated counterexamples — non-compact domain with
  continuity, and compact domain with discontinuity — each independently breaking the conclusion.

## Discovery Questions
1. "Does checking critical points and endpoints automatically guarantee a global maximum exists?"
2. "Is boundedness of f(K) alone sufficient to guarantee f attains a maximum?"
3. "If a domain is compact but the function is discontinuous, can the extreme value guarantee
   still fail?"

## Teaching Sequence
1. **Representation shift**: the optimization-method-reliability connection, working
   Demonstration 1, isolating MC-1.
2. **Conflict evidence**: Demonstration 2's closed-versus-open-image contrast, isolating MC-2.
3. **Contrast pair**: Demonstration 3's two isolated counterexamples, isolating MC-3.
4. **Mastery gate**: require a correct explanation of why the optimization method's reliability
   depends on this theorem, a correct verification that a new $f(K)$ is closed and bounded, and
   correct counterexamples for dropping each hypothesis separately, at the Blueprint's own stated
   MAMR of 5/5 (⌈0.85×5⌉).

## Tutor Actions
- Never accept the optimization method treated as self-guaranteeing existence of a global
  extremum.
- Never accept boundedness alone presented as sufficient for attainment.
- Never accept compactness treated as subsuming the continuity requirement.

## Voice Teaching Notes
- Say "what guarantees an extremum actually exists here, before you even start checking
  candidates?" whenever the optimization method is invoked.
- When an image set's boundedness is noted, ask "is it also closed — does that number get
  actually reached?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly explains why the optimization method's reliability
  depends on this theorem.
- **Rung 2 (application)**: learner correctly verifies a new function's image is closed and
  bounded, confirming attainment.
- **Rung 3 (transfer)**: learner correctly reasons, for an engineering optimization over a closed
  bounded range, why removing the endpoints or introducing a discontinuity each independently
  jeopardizes the existence guarantee.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the optimization-method-reliability connection.
- If MC-2 recurs, re-walk the closed-versus-open-image contrast.
- If MC-3 recurs, re-walk the discontinuous-on-compact counterexample.

## Memory Hooks
- "The optimization method's reliability isn't automatic — this theorem is what backs it up."
- "Boundedness gives a number; closedness makes sure something actually reaches it."
- "Compactness and continuity are both independently required — dropping either breaks the
  guarantee."

## Transfer Connections
- `math.real.compactness` (already authored, this campaign, Batch 126): supplies the compactness
  definition and Heine-Borel characterization this theorem's proof directly uses.
- `math.real.continuity-rigorous` (already authored, this campaign, Batch 130): supplies the
  continuity definition underlying the continuous-image-of-compact-is-compact fact.
- `math.calc.optimization` (already authored, certified domain): the KG's declared cross-link,
  whose critical-points-and-endpoints method's reliability this theorem directly justifies.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.real.extreme-value-theorem.md`, reused by
  reference for its optimization-method-reliability framing, its two-step proof verification, its
  hypothesis-necessity counterexamples, and its three-misconception registry (severity levels
  adopted directly as declared).
- Transfer probe: the Blueprint's own genuine cross-link probe against `math.calc.optimization`,
  reasoning about an engineering optimization's existence guarantee and what breaks it when the
  domain or continuity assumption fails.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.real.compactness`/`math.real.continuity-rigorous`, unlocks none, cross_links
  `math.calc.optimization`, expert/understand, mastery_threshold 0.85, estimated_hours 3) was
  directly verified against the live KG and matches exactly. The Blueprint's own cross-link-probe
  P76 mode was independently re-verified via `ls educational-brain/concepts/mathematics/`
  (`math.calc.optimization` genuinely authored) and required no correction.

## Version History
- 2026-09-19 (Batch 131): authored. First entry this batch. Companion batch concept:
  `math.real.ivt`.
