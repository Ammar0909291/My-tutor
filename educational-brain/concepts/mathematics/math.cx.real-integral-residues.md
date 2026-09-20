# math.cx.real-integral-residues

## Identity
- **KG id**: `math.cx.real-integral-residues`
- **Domain**: math.cx
- **Requires**: `math.cx.residue-theorem`
- **Unlocks**: none
- **Cross-links**: `math.calc.improper-integrals`
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.7
- **Estimated hours**: 7

## Learning Objective
Recognize CLOSING the contour with a semicircular arc as the essential setup step — NEVER
assuming the residue theorem applies directly to the open real-axis integral; recognize the ARC'S
VANISHING as a SEPARATE step requiring explicit justification — NEVER assuming it automatically
follows from the residue theorem's value; and recognize OSCILLATORY integrands need JORDAN'S
LEMMA's specifically different estimate — NEVER assuming the same simple bound transfers
universally.

## Core Understanding
CLOSING THE CONTOUR IS THE ESSENTIAL SETUP STEP — NEVER SOMETHING THE RESIDUE THEOREM SKIPS: to
evaluate $\int_{-\infty}^\infty1/(x^2+1)\,dx$: extend to $f(z)=1/(z^2+1)$ (poles at $z=\pm i$),
close the real segment $[-R,R]$ with the upper semicircular arc $C_R$. For $R>1$, this closed
contour ENCLOSES $z=i$ but NOT $z=-i$ — setting up exactly the situation the residue theorem
applies to. Believing the residue theorem can be applied directly to the OPEN real-axis integral
$\int_{-\infty}^\infty f(x)\,dx$, without first closing it into a genuine closed contour, is
WRONG — closing the contour with a semicircular arc is the essential setup move making the residue
theorem applicable AT ALL.

THE ARC'S VANISHING MUST BE SEPARATELY JUSTIFIED — NEVER ASSUMED AUTOMATIC: continuing the
example: $\text{Res}(f,i)=1/(2i)$, so the residue theorem gives $\oint f\,dz=2\pi i\cdot1/(2i)=\pi$
for the CLOSED contour. But this is NOT yet the real integral — bounding the arc: $|f(z)|\le
1/(R^2-1)$ on $C_R$, so $|\int_{C_R}f\,dz|\le\pi R/(R^2-1)\to0$ as $R\to\infty$. ONLY after this
SEPARATE vanishing argument does $\int_{-\infty}^\infty f\,dx=\pi$ follow. Believing the
closed-contour value from the residue theorem automatically equals the real integral wanted, with
no further justification needed, is WRONG — the residue theorem hands you the CLOSED contour's
value; the arc's own contribution must be explicitly shown to vanish before equating that to the
real integral.

OSCILLATORY INTEGRANDS NEED JORDAN'S LEMMA — NEVER THE SAME SIMPLE BOUND: for
$\int_{-\infty}^\infty\cos x/(x^2+1)\,dx$, using $f(z)=e^{iz}/(z^2+1)$: the naive ML-bound from the
polynomial case doesn't directly transfer, since $|e^{iz}|=e^{-y}$ (for $z=x+iy$) DECAYS in the
upper half-plane rather than staying bounded the way a polynomial's magnitude does — a genuinely
DIFFERENT, oscillatory-decay behavior that Jordan's lemma is specifically designed to exploit.
Believing the same simple arc-vanishing bound works for any integrand, including one with an
oscillatory factor like $e^{iax}$, is WRONG — oscillatory integrands require Jordan's lemma's
specifically different, tailored estimate; the simpler polynomial-decay bound does not
automatically transfer.

## Mental Models
- **"You can't hand the residue theorem an open segment — closing it into a genuine closed
  contour with a semicircular arc is the non-negotiable first move."**
- **"The residue theorem gives you the closed-contour answer — proving the arc vanishes is a
  separate job you still have to do before that answer becomes the real integral you wanted."**
- **"A polynomial's magnitude bound and an oscillating exponential's decay are different kinds of
  evidence — Jordan's lemma is the tool built specifically for the second kind."**

## Why Students Fail

### MC-1: RESIDUE-THEOREM-ASSUMED-DIRECTLY-APPLICABLE-TO-OPEN-INTEGRAL
- **Surface form**: believes the residue theorem applies directly to the open real-axis integral,
  missing that closing the contour with a semicircular arc is the essential setup step.
- **Birth type**: foundational (Blueprint's own declared severity — the residue theorem's
  statement is about closed contours, but the real integral looks deceptively similar to one
  already).
- **Repair**: re-walk the $1/(x^2+1)$ contour-closing setup and pole identification.

### MC-2: ARC-VANISHING-ASSUMED-AUTOMATIC
- **Surface form**: believes the closed-contour value automatically equals the real integral with
  no further justification needed, missing that the arc's vanishing must be separately shown.
- **Birth type**: high severity (Blueprint's own declared severity — once the residue theorem
  produces a clean number, it feels like the computation is already finished).
- **Repair**: re-walk the explicit $\pi R/(R^2-1)\to0$ ML-bound computation.

### MC-3: ARC-VANISHING-BOUND-ASSUMED-UNIVERSAL
- **Surface form**: believes the same simple arc-vanishing bound works for any integrand, missing
  that oscillatory integrands require Jordan's lemma's specifically different estimate.
- **Birth type**: moderate severity (Blueprint's own declared severity — a bound that worked once
  is easy to assume generalizes without checking the integrand's structure changed).
- **Repair**: re-contrast the polynomial-decay bound against Jordan's lemma's oscillatory-decay
  estimate.

## Misconceptions

### MC-1: RESIDUE-THEOREM-ASSUMED-DIRECTLY-APPLICABLE-TO-OPEN-INTEGRAL
- **Surface form**: as described above.
- **Root cause (foundational)**: as described above.
- **Repair**: as described above.

### MC-2: ARC-VANISHING-ASSUMED-AUTOMATIC
- **Surface form**: as described above.
- **Root cause (high severity)**: as described above.
- **Repair**: as described above.

### MC-3: ARC-VANISHING-BOUND-ASSUMED-UNIVERSAL
- **Surface form**: as described above.
- **Root cause (moderate severity)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Closing the contour is like building a fence around an open field before you can apply a
  rule that only works on enclosed land — the residue theorem simply doesn't apply to open
  ground."**
- **Anti-analogy**: the arc-vanishing bound for a polynomial integrand and Jordan's lemma for an
  oscillatory one aren't the same tool used twice — they're genuinely different estimates, chosen
  because the integrand's behavior on the arc is genuinely different.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the $1/(x^2+1)$ contour-closing setup and pole
  identification.
- **Demonstration 2 (targets MC-2)**: the explicit ML-bound arc-vanishing computation completing
  the evaluation.
- **Demonstration 3 (targets MC-3)**: the $\cos x/(x^2+1)$ Jordan's-lemma oscillatory-decay
  contrast.

## Discovery Questions
1. "Can the residue theorem be applied directly to the open real-axis integral, without first
   closing it into a genuine closed contour?"
2. "Once the residue theorem gives you the closed contour's value, is that automatically equal to
   the real integral you wanted?"
3. "Does the same simple arc-vanishing bound used for polynomial integrands automatically apply to
   integrands containing an oscillatory factor like e^{iax}?"

## Teaching Sequence
1. **Representation shift**: work the $1/(x^2+1)$ contour-closing setup, isolating MC-1.
2. **Conflict evidence**: work the explicit ML-bound arc-vanishing computation, isolating MC-2.
3. **Contrast pair**: work the polynomial-versus-oscillatory-decay contrast, isolating MC-3.
4. **Mastery gate**: require correct pole identification for a complex extension, a correct
   residue computation with the closed-contour result stated, a correct explicit arc-vanishing
   verification, and a correct explanation of why an oscillatory integrand needs Jordan's lemma,
   at the Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept the residue theorem applied directly to an open real-axis integral.
- Never accept a closed-contour residue-theorem value treated as automatically equal to the real
  integral without an arc-vanishing justification.
- Never accept the polynomial-integrand arc bound applied unchanged to an oscillatory integrand.

## Voice Teaching Notes
- Say "is that contour actually closed yet?" whenever the residue theorem is about to be invoked
  for a real integral.
- Ask "have you actually shown the arc's contribution vanishes, or just computed the residue?"
  whenever a real-integral-via-residues evaluation is presented as complete.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly sets up the closed-contour extension and identifies
  enclosed poles.
- **Rung 2 (application)**: learner correctly computes the residue and independently verifies the
  arc's contribution vanishes via an ML-bound.
- **Rung 3 (transfer)**: learner correctly identifies that an oscillatory-factor integrand requires
  Jordan's lemma and explains why the simpler polynomial bound does not suffice there.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the contour-closing setup.
- If MC-2 recurs, re-walk the explicit ML-bound computation.
- If MC-3 recurs, re-contrast the polynomial-versus-oscillatory-decay behavior.

## Memory Hooks
- "Close the contour first — the residue theorem never applies to an open segment."
- "The arc's vanishing is a separate job — never assumed automatic."
- "Oscillatory integrands need Jordan's lemma — never the same simple bound."

## Transfer Connections
- `math.cx.residue-theorem` (prerequisite, already authored, this campaign): supplies the
  closed-contour residue-summing machinery this concept applies to a real-axis-plus-arc contour.

## Cross-Subject Connections
- `math.calc.improper-integrals` (cross-link, already authored): supplies the limit-based
  definition of the real integral this concept's closed-contour technique evaluates, making clear
  the result is a genuine improper-integral evaluation, not a formal symbol manipulation.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.cx.real-integral-residues.md`, reused by
  reference for its three worked examples and its three-misconception registry (birth types
  adopted directly as declared).
- Transfer probe: the Blueprint's own cross-link probe engaging `math.calc.improper-integrals`'s
  limit-based definition for a signal-processing Fourier-type integral requiring Jordan's lemma.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.cx.residue-theorem`, unlocks none, cross_links `math.calc.improper-integrals` [confirmed
  authored on disk], expert/apply, mastery_threshold 0.7, estimated_hours 7) was directly verified
  against the live KG and matches exactly.

## Version History
- 2026-09-20 (Batch 248): authored. Second entry this batch. Companion batch concept:
  `math.cx.rouche-theorem`.
