# math.cx.cauchy-integral-formula

## Identity
- **KG id**: `math.cx.cauchy-integral-formula`
- **Domain**: math.cx
- **Requires**: `math.cx.cauchy-theorem`
- **Unlocks**: `math.cx.higher-derivatives`
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.9
- **Estimated hours**: 6

## Learning Objective
Always verify $z_0$ is STRICTLY INSIDE $C$ before applying the formula — NEVER apply it
regardless of interior/exterior placement, since a genuinely different rule (Cauchy's Theorem,
giving zero) governs the exterior case; recognize the formula as revealing PROFOUND RIGIDITY —
NEVER treat it as merely a computational shortcut; and recognize the integrand
$f(z)/(z-z_0)$ has a genuine singularity AT $z_0$ — NEVER assume Cauchy's Theorem alone applies
there.

## Core Understanding
$z_0$ MUST BE VERIFIED STRICTLY INSIDE $C$ — NEVER APPLY THE FORMULA REGARDLESS OF POSITION: for
$f\equiv1$, $C$ the unit circle: with $z_0=0$ (inside, $|0|=0<1$), the formula gives
$\oint_C(1/z)\,dz=2\pi i\cdot1=2\pi i$, matching the already-known fact. But with $z_0=2$
(OUTSIDE, $|2|=2>1$): the formula's hypothesis FAILS — since $1/(z-2)$ IS holomorphic everywhere
ON AND INSIDE the unit circle (its only singularity, $z=2$, lies OUTSIDE), CAUCHY'S THEOREM (not
the Integral Formula) applies instead, giving $\oint_C\frac1{z-2}\,dz=0$ — a COMPLETELY different
answer, purely because $z_0$ moved from inside to outside. Believing the Cauchy Integral Formula
gives the same kind of answer regardless of whether $z_0$ is inside or outside $C$ is WRONG —
ALWAYS check interior versus exterior FIRST; they are governed by entirely different rules.

THE FORMULA REVEALS PROFOUND RIGIDITY — NEVER MERELY A COMPUTATIONAL SHORTCUT: the formula says a
holomorphic function's value at ONE interior point, $f(z_0)$, can be recovered ENTIRELY from an
integral involving only the function's values ON the boundary curve — nothing like this holds for
general real-valued functions. Viewing the formula only as "a way to compute integrals fast,"
without recognizing its deeper structural meaning, is WRONG — it says a holomorphic function's
values EVERYWHERE INSIDE a curve are COMPLETELY DETERMINED by its values ON the boundary alone, a
"boundary determines interior" rigidity property unique to holomorphic functions, and the
foundation for essentially all deeper results in complex analysis.

THE INTEGRAND $f(z)/(z-z_0)$ GENUINELY HAS A SINGULARITY AT $z_0$ — NEVER ASSUME CAUCHY'S THEOREM
ALONE APPLIES DIRECTLY: when $z_0$ is inside $C$, $f(z)/(z-z_0)$ is NOT holomorphic at $z_0$
(division by zero there) — so Cauchy's Theorem's hypothesis (holomorphic throughout the interior)
genuinely FAILS, which is EXACTLY why the separate Cauchy Integral Formula machinery is needed
rather than simply concluding the integral is zero via Cauchy's Theorem. Failing to recognize why
$f(z)/(z-z_0)$ is not itself holomorphic at $z_0$ is WRONG — this singularity is precisely the
reason a dedicated formula (rather than Cauchy's Theorem's zero conclusion) is required.

## Mental Models
- **"Check interior versus exterior FIRST — inside gives 2πi·f(z₀) via the Integral Formula,
  outside gives 0 via Cauchy's Theorem, and they're never interchangeable."**
- **"Boundary values completely determine interior values — this is a statement about how special
  holomorphic functions are, with fast computation being a convenient side-benefit."**
- **"The integrand f(z)/(z−z₀) has its own singularity right at z₀ — that's exactly why Cauchy's
  Theorem's zero conclusion doesn't apply, and a separate formula is needed."**

## Why Students Fail

### MC-1: INTERIOR-EXTERIOR-DISTINCTION-FOR-Z0-IGNORED
- **Surface form**: applies the Cauchy Integral Formula without checking whether $z_0$ is
  genuinely inside the curve $C$, missing that a different rule (Cauchy's Theorem, giving zero)
  applies when $z_0$ is outside.
- **Birth type**: overgeneralization (Blueprint's own declared foundational severity — the formula
  looks like a universal rule for $\frac{f(z)}{z-z_0}$-shaped integrals, obscuring the interior
  hypothesis).
- **Repair**: re-walk the inside-versus-outside contrast with $f\equiv1$, showing $2\pi i$ versus
  $0$.

### MC-2: CAUCHY-INTEGRAL-FORMULA-TREATED-AS-MERE-COMPUTATIONAL-TRICK
- **Surface form**: views the formula only as a shortcut for evaluating integrals, without
  recognizing its deeper structural meaning — that holomorphic functions are entirely determined
  by their boundary values.
- **Birth type**: instruction-induced (Blueprint's own declared foundational severity — the
  formula's practical computational use is often taught before or instead of its structural
  significance).
- **Repair**: re-anchor on "boundary values completely determine interior values."

### MC-3: INTEGRAND-SINGULARITY-AT-Z0-OVERLOOKED-AS-A-PROBLEM
- **Surface form**: fails to recognize why $f(z)/(z-z_0)$ is not itself holomorphic at $z_0$,
  hence why Cauchy's Theorem alone doesn't apply directly.
- **Birth type**: procedural slip (Blueprint's own declared moderate severity — the singularity is
  easy to overlook when focused on evaluating the formula's right-hand side).
- **Repair**: re-anchor on the integrand's own singularity at $z_0$ being why the separate formula
  is needed.

## Misconceptions

### MC-1: INTERIOR-EXTERIOR-DISTINCTION-FOR-Z0-IGNORED
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

### MC-2: CAUCHY-INTEGRAL-FORMULA-TREATED-AS-MERE-COMPUTATIONAL-TRICK
- **Surface form**: as described above.
- **Root cause (instruction-induced)**: as described above.
- **Repair**: as described above.

### MC-3: INTEGRAND-SINGULARITY-AT-Z0-OVERLOOKED-AS-A-PROBLEM
- **Surface form**: as described above.
- **Root cause (procedural slip)**: as described above.
- **Repair**: as described above.

## Analogies
- **"The Cauchy Integral Formula is like reconstructing the temperature at the center of a room
  purely from thermometer readings along the walls — a genuinely surprising recovery, never
  available to arbitrary (non-holomorphic) temperature fields."**
- **Anti-analogy**: this isn't a computational trick that happens to work — it's evidence that a
  holomorphic function has almost no freedom left once its boundary values are fixed.

## Demonstrations
- **Demonstration 1**: the $f(z)=z^2+1$ direct evaluation via the formula, no parametrization
  needed.
- **Demonstration 2 (targets MC-1)**: the $f\equiv1$, $z_0=0$-versus-$z_0=2$ interior/exterior
  contrast.
- **Demonstration 3 (targets MC-3)**: the identification of $f(z)/(z-z_0)$'s own singularity at
  $z_0$.

## Discovery Questions
1. "Does the Cauchy Integral Formula give the same kind of answer regardless of whether z₀ is
   inside or outside the curve C?"
2. "Is the Cauchy Integral Formula just a computational shortcut, or does it mean something
   deeper?"
3. "Why doesn't Cauchy's Theorem alone (giving zero) apply directly to ∮_C f(z)/(z−z₀)dz when z₀
   is inside C?"

## Teaching Sequence
1. **Representation shift**: verify the formula against the known $1/z$ fact, then work fast
   evaluation examples.
2. **Conflict evidence**: work the interior-versus-exterior contrast, isolating MC-1 and MC-3.
3. **Mastery gate**: require a correct hypothesis-verified evaluation, a correct fast-evaluation
   application, a correct interior/exterior determination with the right rule identified, and a
   correct explanation of the rigidity implication, at the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept the formula applied without first verifying $z_0$ is strictly inside $C$.
- Never accept the formula described as merely a computational shortcut.
- Never accept the integrand's own singularity at $z_0$ overlooked when explaining why the formula
  (not Cauchy's Theorem alone) is needed.

## Voice Teaching Notes
- Say "is z₀ actually inside the curve, or could it be outside?" whenever the formula is invoked.
- Ask "what does this formula actually tell you about how rigid holomorphic functions are?"
  whenever the formula is applied.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly verifies hypotheses and evaluates a contour integral
  via the formula.
- **Rung 2 (application)**: learner correctly determines which rule (Cauchy's Theorem or the
  Integral Formula) applies based on $z_0$'s position.
- **Rung 3 (transfer)**: learner correctly explains how a physical field's interior value could be
  recovered purely from boundary measurements, and why this fails for non-holomorphic fields.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the interior-versus-exterior contrast.
- If MC-2 recurs, re-anchor on the boundary-determines-interior rigidity statement.
- If MC-3 recurs, re-identify the integrand's own singularity at $z_0$.

## Memory Hooks
- "Check interior versus exterior first — the rules are never interchangeable."
- "Boundary values determine interior values — this is rigidity, not just a shortcut."
- "The integrand has its own singularity at z₀ — that's why a separate formula is needed."

## Transfer Connections
- `math.cx.cauchy-theorem` (prerequisite, already authored, this campaign): supplies
  $\oint_Cf(z)\,dz=0$ for holomorphic $f$ on a simply connected domain, and the
  $\oint_C(1/z)\,dz=2\pi i$ counterexample this concept's formula directly generalizes.

## Cross-Subject Connections
- Physics and engineering: boundary-value recovery of holomorphic fields (electrostatic potentials,
  fluid flow) is a direct application of this concept's core rigidity result.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.cx.cauchy-integral-formula.md`, reused by
  reference for its three worked examples and its three-misconception registry (birth types
  adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe on an engineer recovering a
  holomorphic field's interior value from boundary measurements, and diagnosing the failure mode
  for an exterior point.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.cx.cauchy-theorem`, unlocks `math.cx.higher-derivatives`, cross_links none, expert/apply,
  mastery_threshold 0.9, estimated_hours 6) was directly verified against the live KG and matches
  exactly.

## Version History
- 2026-09-20 (Batch 241): authored. First entry this batch. Companion batch concept:
  `math.cx.singularities`.
