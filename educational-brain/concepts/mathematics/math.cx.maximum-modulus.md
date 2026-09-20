# math.cx.maximum-modulus

## Identity
- **KG id**: `math.cx.maximum-modulus`
- **Domain**: math.cx
- **Requires**: `math.cx.analytic-functions`, `math.cx.cauchy-integral-formula`
- **Unlocks**: none
- **Cross-links**: `math.de.harmonic-functions`
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 4

## Learning Objective
Recognize the Maximum Modulus Principle as DIRECTLY transported from `math.de.harmonic-functions`'s
already-proven maximum principle via $\log|f|$'s harmonicity — NEVER an independent new proof;
recognize that BOUNDARY VALUES ALONE suffice to bound $|f|$ everywhere in $D$ — NEVER requiring an
interior check; and recognize that ANY interior maximum of $|f|$ FORCES $f$ constant — NEVER
merely permitted for a non-constant function tied with the boundary value.

## Core Understanding
$\log|f|$'S HARMONICITY TRANSPORTS THE ALREADY-PROVEN MAXIMUM PRINCIPLE — NEVER AN INDEPENDENT
PROOF: for $f(z)=z^2$ on $D=\{|z|<1\}$ away from $z=0$: $\log|f(z)|=2\log|z|$ satisfies
$\nabla^2u=0$ — genuinely HARMONIC, since locally $f=e^g$ for holomorphic $g$ and
$\log|f|=\operatorname{Re}(g)$, and the real part of any holomorphic function is automatically
harmonic. This makes $u=\log|f|$ satisfy EXACTLY `math.de.harmonic-functions`'s own maximum
principle hypotheses, transporting its boundary-only-maximum conclusion DIRECTLY to $\log|f|$ and,
since $\log$ is increasing, to $|f|$ itself. Believing the Maximum Modulus Principle requires an
entirely new, independent proof technique specific to complex analysis is WRONG — it follows
directly from already-proven real-harmonic-function theory via the $\log|f|$ connection.

BOUNDARY VALUES ALONE BOUND $|f|$ EVERYWHERE — NEVER REQUIRING AN INTERIOR CHECK: for
$f(z)=z^2+1$ on $D=\{|z|<1\}$: rather than scanning interior points, checking ONLY the boundary
$|z|=1$ (where $z=e^{i\theta}$, $f(z)=e^{2i\theta}+1$) gives $|f(z)|\le|e^{2i\theta}|+1=2$, with
equality at $z=1$ — so $\max_{\bar D}|f|=2$, found ENTIRELY from boundary values. Believing
finding $|f|$'s maximum over a closed bounded domain requires checking interior points as well as
the boundary is WRONG — the theorem GUARANTEES the maximum lives on the boundary, so a boundary-
only check is not an approximation but the complete, exact answer.

ANY INTERIOR MAXIMUM FORCES CONSTANCY — NEVER MERELY PERMITTED FOR A NON-CONSTANT FUNCTION: if
$f$ is non-constant holomorphic on $D$ and $|f|$ genuinely attained an interior maximum at some
$z_0\in D$, then $\log|f|=\operatorname{Re}(g)$ would attain an interior maximum too — and
`math.de.harmonic-functions`'s maximum principle (via its mean-value-property proof) forces a
harmonic function attaining an INTERIOR maximum to be CONSTANT, which forces $f$ constant,
contradicting the non-constant hypothesis. For $f(z)=5$ (genuinely constant): $|f|=5$ EVERYWHERE,
consistent with the theorem's exception. Believing a non-constant holomorphic function's $|f|$
could attain a non-strict interior maximum (merely tied with the boundary value) is WRONG — ANY
interior maximum, strict or not, forces $f$ to be constant; there is no non-constant exception.

## Mental Models
- **"log|f| is harmonic wherever f≠0 — the whole theorem is just harmonic-function theory,
  already proven, transported through that one identity."**
- **"You never need to scan the interior — the theorem guarantees the maximum lives on the
  boundary, making a boundary-only check the complete answer, not a shortcut."**
- **"An interior maximum isn't just unlikely for a non-constant holomorphic function — it's
  impossible; spotting one is itself proof the function must be constant."**

## Why Students Fail

### MC-1: MAX-MODULUS-ASSUMED-INDEPENDENT-PROOF
- **Surface form**: believes the Maximum Modulus Principle requires an entirely new, independent
  proof specific to complex analysis, missing that it follows directly from
  `math.de.harmonic-functions`'s already-proven theory via $\log|f|$'s harmonicity.
- **Birth type**: foundational (Blueprint's own declared severity — a named complex-analysis
  "principle" looks self-contained, obscuring its real-analysis ancestry).
- **Repair**: re-walk the $z^2$ direct harmonicity verification of $\log|f|$.

### MC-2: INTERIOR-CHECK-ASSUMED-NECESSARY-FOR-MAX-MODULUS
- **Surface form**: believes finding $|f|$'s maximum over a closed domain requires checking
  interior points as well as the boundary, missing that the theorem guarantees the boundary alone
  suffices.
- **Birth type**: high severity (Blueprint's own declared severity — ordinary function-maximizing
  intuition from calculus expects both interior critical points and boundary values to be
  checked).
- **Repair**: re-walk the $z^2+1$ boundary-only computation confirmed as the true overall maximum.

### MC-3: NON-STRICT-INTERIOR-MAXIMUM-ASSUMED-PERMITTED
- **Surface form**: believes a non-constant holomorphic function could have $|f|$ attain a
  non-strict interior maximum (tied with the boundary value), missing that ANY interior maximum
  forces constancy.
- **Birth type**: moderate severity (Blueprint's own declared severity — "tied with the boundary"
  feels like a harmless edge case rather than a forbidden one).
- **Repair**: re-walk the constancy-forcing argument via $\log|f|$'s harmonic maximum principle.

## Misconceptions

### MC-1: MAX-MODULUS-ASSUMED-INDEPENDENT-PROOF
- **Surface form**: as described above.
- **Root cause (foundational)**: as described above.
- **Repair**: as described above.

### MC-2: INTERIOR-CHECK-ASSUMED-NECESSARY-FOR-MAX-MODULUS
- **Surface form**: as described above.
- **Root cause (high severity / instruction-induced by calculus habit)**: as described above.
- **Repair**: as described above.

### MC-3: NON-STRICT-INTERIOR-MAXIMUM-ASSUMED-PERMITTED
- **Surface form**: as described above.
- **Root cause (moderate severity / overgeneralization)**: as described above.
- **Repair**: as described above.

## Analogies
- **"log|f| is a bridge back to already-solved territory — cross it once, and the entire
  harmonic-function maximum principle is already there waiting, no new proof needed."**
- **Anti-analogy**: unlike ordinary real-valued optimization, checking a holomorphic function's
  boundary isn't a partial shortcut hoping to catch the true maximum — it's guaranteed complete.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the $z^2$ direct harmonicity verification of $\log|f|$.
- **Demonstration 2 (targets MC-2)**: the $z^2+1$ boundary-only maximum computation.
- **Demonstration 3 (targets MC-3)**: the interior-maximum-forces-constancy argument, contrasted
  with the genuinely constant $f(z)=5$ exception.

## Discovery Questions
1. "Does the Maximum Modulus Principle require an entirely new, independent proof technique, or
   does it follow directly from already-proven real-harmonic-function theory?"
2. "To find the maximum of |f| over a closed bounded domain, is it necessary to check interior
   points, or does checking the boundary alone suffice?"
3. "Can a non-constant holomorphic function's |f| attain an interior maximum, as long as it
   doesn't exceed the boundary values?"

## Teaching Sequence
1. **Representation shift**: work the $z^2$ harmonicity verification, isolating MC-1.
2. **Conflict evidence**: work the $z^2+1$ boundary-only maximum computation, isolating MC-2.
3. **Contrast pair**: work the interior-maximum-forces-constancy argument, isolating MC-3.
4. **Mastery gate**: require a correct explanation of the $\log|f|$-harmonic transport mechanism,
   a correct boundary-only maximum computation, a correct explanation of why non-constant
   functions cannot have an interior maximum, and a correct explanation of why a genuinely
   constant function is consistent with the theorem, at the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept the Maximum Modulus Principle presented as requiring an independent new proof.
- Never accept an interior check treated as necessary to find $|f|$'s maximum.
- Never accept a non-constant holomorphic function described as permitted to have an interior
  maximum, even a non-strict one.

## Voice Teaching Notes
- Say "what does log|f| have to do with harmonic functions?" whenever the Maximum Modulus
  Principle is introduced.
- Ask "do you actually need to check the interior, or does the theorem already guarantee where
  the maximum is?" whenever a maximum-modulus computation is performed.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly explains why $\log|f|$'s harmonicity transports the
  maximum principle to $|f|$.
- **Rung 2 (application)**: learner correctly computes $|f|$'s maximum over a closed domain using
  boundary values only.
- **Rung 3 (transfer)**: learner correctly reuses an already-proven electrostatic-potential
  maximum-principle result to conclude a related holomorphic function's modulus also achieves its
  maximum only on the boundary, and correctly diagnoses an apparent interior peak as implying
  constancy.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the $z^2$ harmonicity verification.
- If MC-2 recurs, re-walk the $z^2+1$ boundary-only computation.
- If MC-3 recurs, re-walk the constancy-forcing argument.

## Memory Hooks
- "log|f| is harmonic — the whole theorem is transported harmonic-function theory."
- "Boundary values alone give the complete answer — never a partial shortcut."
- "Any interior maximum forces constancy — never permitted for a genuinely non-constant function."

## Transfer Connections
- `math.cx.analytic-functions` (prerequisite, already authored, this campaign): supplies the
  local $f=e^g$ decomposition underlying $\log|f|$'s harmonicity.
- `math.cx.cauchy-integral-formula` (prerequisite, already authored, this campaign): supplies the
  boundary-recovers-interior machinery the deeper theory this principle sits within relies on.

## Cross-Subject Connections
- `math.de.harmonic-functions` (cross-link, already authored): supplies the real-harmonic-function
  maximum principle (mean value property, boundary-only extrema) this concept's entire mechanism
  directly transports via $\log|f|$'s harmonicity, rather than re-proving from scratch.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.cx.maximum-modulus.md`, reused by reference
  for its three worked examples and its three-misconception registry (birth types adopted directly
  as declared).
- Transfer probe: the Blueprint's own cross-link probe engaging `math.de.harmonic-functions`'s
  electrostatic-potential maximum-principle result and the interior-peak constancy diagnosis.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.cx.analytic-functions`, `math.cx.cauchy-integral-formula`, unlocks none, cross_links
  `math.de.harmonic-functions` [confirmed authored on disk], expert/apply, mastery_threshold 0.85,
  estimated_hours 4) was directly verified against the live KG and matches exactly.

## Version History
- 2026-09-20 (Batch 247): authored. Second entry this batch. Companion batch concept:
  `math.cx.argument-principle`.
