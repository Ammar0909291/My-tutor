# math.cx.residue-theorem

## Identity
- **KG id**: `math.cx.residue-theorem`
- **Domain**: math.cx
- **Requires**: `math.cx.residue`, `math.cx.cauchy-theorem`
- **Unlocks**: `math.cx.real-integral-residues`
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.9
- **Estimated hours**: 6

## Learning Objective
Recognize the Residue Theorem as a strict GENERALIZATION of Cauchy's theorem, collapsing to it
exactly at zero enclosed poles — NEVER an unrelated tool; sum EVERY enclosed pole's OWN residue
individually — NEVER a single combined computation; and determine which poles a contour actually
ENCLOSES — NEVER including a pole lying outside the specific contour used.

## Core Understanding
THE RESIDUE THEOREM COLLAPSES TO CAUCHY'S THEOREM AT ZERO ENCLOSED POLES — NEVER AN UNRELATED
TOOL: for $f(z)=1/z$, $C:|z|=1$ (Cauchy's theorem's own counterexample): the Residue Theorem gives
$\oint_Cf\,dz=2\pi i\cdot\text{Res}(f,0)=2\pi i\cdot1=2\pi i$ — EXACTLY matching that concept's own
result. For any curve NOT enclosing $z=0$: zero enclosed poles gives an EMPTY sum, so
$\oint_Cf\,dz=2\pi i\cdot0=0$ — matching Cauchy's theorem's ordinary conclusion precisely, since
$f$ is holomorphic throughout that curve's interior. Believing the Residue Theorem is an entirely
new, unrelated tool from Cauchy's theorem is WRONG — it strictly generalizes Cauchy's theorem,
collapsing to it exactly when no poles are enclosed.

MULTIPLE ENCLOSED POLES REQUIRE SUMMING EACH RESIDUE INDIVIDUALLY — NEVER ONE COMBINED
COMPUTATION: for $f(z)=1/(z(z-2))$, $C:|z|=3$ (enclosing BOTH $z=0$ and $z=2$): computed
SEPARATELY, $\text{Res}(f,0)=\lim_{z\to0}z\cdot f(z)=-1/2$ and $\text{Res}(f,2)=\lim_{z\to2}(z-2)
\cdot f(z)=1/2$. Summing: $-1/2+1/2=0$, so $\oint_Cf\,dz=0$. Believing multiple enclosed poles can
be handled with a single combined computation rather than finding and summing each pole's own
residue individually is WRONG — each enclosed pole contributes its OWN residue, individually
found, to the sum; there is no shortcut that skips this.

ONLY ENCLOSED POLES COUNT — NEVER EVERY POLE OF THE FUNCTION REGARDLESS OF THE CONTOUR: using the
SAME $f(z)=1/(z(z-2))$ but now $C':|z|=1$ (enclosing ONLY $z=0$, since $z=2$ has modulus
$2>1$): $\oint_{C'}f\,dz=2\pi i\cdot(-1/2)=-\pi i$ — a genuinely DIFFERENT answer from the
$|z|=3$ case's $0$, even though $f$ never changed. Believing every pole of a function must be
included in the residue sum regardless of whether the specific contour actually encloses it is
WRONG — a pole lying outside the chosen contour contributes NOTHING to that integral; the same
function integrated over different contours can give genuinely different answers.

## Mental Models
- **"The Residue Theorem isn't a competing tool — it's Cauchy's theorem with the 'no
  singularities' restriction lifted, reducing to it exactly when zero poles are enclosed."**
- **"Each enclosed pole pays its own residue into the sum — there's no way to combine two poles
  into a single shortcut computation."**
- **"The contour is part of the answer, not just the function — always check which poles are
  actually inside before summing."**

## Why Students Fail

### MC-1: RESIDUE-THEOREM-AS-UNRELATED-TOOL
- **Surface form**: believes the Residue Theorem is an entirely new, unrelated tool from Cauchy's
  theorem, missing that it strictly generalizes it.
- **Birth type**: foundational (Blueprint's own declared severity — a named "theorem" with new
  vocabulary (residues) looks like an independent result rather than a generalization).
- **Repair**: re-walk the $1/z$ exact-match reproduction of Cauchy's theorem's own example.

### MC-2: ALL-POLES-INCLUDED-REGARDLESS-OF-ENCLOSURE
- **Surface form**: believes every pole of a function must be included in the residue sum
  regardless of whether the specific contour actually encloses it.
- **Birth type**: foundational (Blueprint's own declared severity — "the function's poles" feels
  like a fixed, contour-independent property, obscuring that enclosure is contour-specific).
- **Repair**: re-walk the two-contour ($|z|=3$ vs. $|z|=1$) comparison giving different answers.

### MC-3: MULTIPLE-POLES-TREATED-AS-ONE-COMBINED-COMPUTATION
- **Surface form**: believes multiple enclosed poles can be handled with a single combined
  computation rather than finding and summing each pole's own residue individually.
- **Birth type**: instruction-induced (Blueprint's own declared moderate severity — the summation
  formula's compact $\sum_k$ notation can look like it hides a single shortcut rather than an
  explicit per-pole sum).
- **Repair**: re-walk the separate $\text{Res}(f,0)$ and $\text{Res}(f,2)$ computations.

## Misconceptions

### MC-1: RESIDUE-THEOREM-AS-UNRELATED-TOOL
- **Surface form**: as described above.
- **Root cause (foundational)**: as described above.
- **Repair**: as described above.

### MC-2: ALL-POLES-INCLUDED-REGARDLESS-OF-ENCLOSURE
- **Surface form**: as described above.
- **Root cause (foundational)**: as described above.
- **Repair**: as described above.

### MC-3: MULTIPLE-POLES-TREATED-AS-ONE-COMBINED-COMPUTATION
- **Surface form**: as described above.
- **Root cause (instruction-induced)**: as described above.
- **Repair**: as described above.

## Analogies
- **"The Residue Theorem is like a tax form with a deduction line that becomes zero when there's
  nothing to deduct — set the poles to zero and you're back to Cauchy's original form exactly."**
- **Anti-analogy**: enclosure isn't a property of the function alone — the very same function's
  poles can be in or out depending purely on which contour you draw around them.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the $1/z$, $|z|=1$ exact reproduction of Cauchy's theorem.
- **Demonstration 2 (targets MC-3)**: the $1/(z(z-2))$, $|z|=3$ separate two-pole summation.
- **Demonstration 3 (targets MC-2)**: the same function's $|z|=1$-versus-$|z|=3$ enclosure
  contrast.

## Discovery Questions
1. "Is the Residue Theorem an entirely separate tool from Cauchy's Theorem, requiring unrelated
   reasoning?"
2. "When a contour encloses two poles, can the residue theorem be applied using just one combined
   computation for both poles at once?"
3. "Should every pole of a function be included in the residue sum, regardless of whether the
   specific contour actually encloses it?"

## Teaching Sequence
1. **Representation shift**: work the $1/z$ exact-match reproduction, isolating MC-1.
2. **Contrast pair**: work the two-pole separate-residue summation, isolating MC-3.
3. **Conflict evidence**: work the two-contour enclosure comparison, isolating MC-2.
4. **Mastery gate**: require a correct explanation of the zero-poles collapse, a correct multi-pole
   integral evaluation, a correct smaller-contour re-evaluation with an enclosure explanation, and
   a correct direct sum from given residues, at the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept the Residue Theorem described as unrelated to Cauchy's theorem.
- Never accept multiple enclosed poles handled by anything other than an explicit per-pole sum.
- Never accept a pole outside the given contour included in the residue sum.

## Voice Teaching Notes
- Say "what happens to this formula when there are zero poles inside?" whenever the Residue
  Theorem is introduced.
- Ask "is that pole actually inside this specific contour?" whenever a residue sum is being
  assembled.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly explains why zero enclosed poles collapses the
  Residue Theorem to Cauchy's theorem.
- **Rung 2 (application)**: learner correctly evaluates a contour integral enclosing multiple
  poles by summing individually computed residues.
- **Rung 3 (transfer)**: learner correctly determines which poles two different contours enclose
  for the same function and explains why both integral values are simultaneously correct.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the $1/z$ exact-match reproduction.
- If MC-2 recurs, re-walk the two-contour enclosure comparison.
- If MC-3 recurs, re-walk the separate two-pole residue computations.

## Memory Hooks
- "Zero enclosed poles collapses the Residue Theorem to Cauchy's theorem exactly."
- "Each enclosed pole pays its own residue — never a combined shortcut."
- "Only poles inside the contour count — the contour is part of the answer."

## Transfer Connections
- `math.cx.residue` (prerequisite, already authored, this campaign): supplies the per-pole residue
  extraction shortcuts this concept sums over.
- `math.cx.cauchy-theorem` (prerequisite, already authored, this campaign): supplies the
  zero-poles special case this theorem strictly generalizes, and whose own $1/z$ example this
  concept directly reuses.

## Cross-Subject Connections
- Control theory: evaluating a system's contour integral by summing residues at only the poles
  enclosed by a chosen stability contour applies exactly this concept's enclosure-sensitive
  summation logic.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.cx.residue-theorem.md`, reused by reference
  for its three worked examples and its three-misconception registry (birth types adopted directly
  as declared).
- Transfer probe: the Blueprint's own independence-mode probe on an engineer's $f(z)=1/((z-1)(z-4))$
  integral over two different contours, refuting the misapplied "Cauchy's theorem forces zero"
  argument.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `math.cx.residue`,
  `math.cx.cauchy-theorem`, unlocks `math.cx.real-integral-residues`, cross_links none,
  expert/apply, mastery_threshold 0.9, estimated_hours 6) was directly verified against the live
  KG and matches exactly.

## Version History
- 2026-09-20 (Batch 246): authored. First entry this batch. Companion batch concept:
  `math.cx.essential-singularity`.
