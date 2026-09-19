# math.de.variation-of-parameters

## Identity
- **KG id**: `math.de.variation-of-parameters`
- **Domain**: math.de
- **Requires**: `math.de.wronskian`, `math.de.second-order-homogeneous`,
  `math.calc.integration-by-parts`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: advanced
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 5

## Learning Objective
Derive the variation-of-parameters formula $y_p=u_1y_1+u_2y_2$ with
$u_1'=-y_2f/W,u_2'=y_1f/W$ where $f=g/a$ (the ODE DIVIDED by the leading coefficient $a$ FIRST,
never using $g$ directly when $a\ne1$); verify $W\ne0$ before applying the formula (never plugging
in without checking $y_1,y_2$ are genuinely independent); and recognize this method applies to ANY
$g(x)$ (including $\tan x,\ln x,1/x$) where undetermined coefficients fails — but should NOT be
preferred over undetermined coefficients when the latter applies, since VoP can produce
non-elementary integrals.

## Core Understanding
THE FORMULA USES $f=g/a$ — NEVER THE RAW $g$ WHEN THE LEADING COEFFICIENT $a\ne1$: the derivation
requires first dividing the ODE by $a$ to standard form $y''+Py'+Qy=f$, giving
$u_1'=-y_2f/W,u_2'=y_1f/W$ with NO leading coefficient in the denominator. Using $g$ directly
instead of $f=g/a$ makes the final $y_p$ wrong by a factor of $a$.

$W\ne0$ MUST BE VERIFIED — NEVER ASSUMED, SINCE A ZERO WRONSKIAN MEANS THE FORMULA FAILS
ENTIRELY: if $y_1,y_2$ are linearly DEPENDENT ($W\equiv0$), the formula's denominator vanishes and
there is no valid fundamental set to build $y_p$ from. For $y''+y=\tan x$: $y_1=\cos x,y_2=\sin x$
give $W=\cos^2x+\sin^2x=1\ne0$ — genuinely independent, confirmed BEFORE proceeding, giving
$u_1'=-\sin^2x/\cos x=\cos x-\sec x$, $u_2'=\sin x$, and ultimately
$y_p=-\cos x\ln|\sec x+\tan x|$.

VoP IS ALWAYS VALID BUT SHOULD NOT BE PREFERRED WHEN UNDETERMINED COEFFICIENTS APPLIES — NEVER
CHOSEN JUST BECAUSE IT'S "THE GENERAL METHOD": undetermined coefficients, when $g$ is a
polynomial/exponential/trig product, produces only ALGEBRAIC equations — no integration needed.
VoP, applied to the SAME $g$, may produce integrals expressible only via special functions (Ei,
Si, Ci) or requiring much more work — e.g. $\int e^{2x}/x\,dx$ is not elementary. The decision
rule: use undetermined coefficients FIRST when $g$ fits its trial-function table; use VoP
specifically when $g$ does NOT fit (like $\tan x,\sec x,\ln x,1/x$).

## Mental Models
- **"Vary the constants: yₕ's C₁,C₂ become functions u₁(x),u₂(x) — two constraints (an imposed
  condition plus the ODE itself) give exactly two equations to solve for u₁′,u₂′."**
- **"VoP always works, but 'always works' doesn't mean 'always the easiest' — check whether
  undetermined coefficients applies first."**

## Why Students Fail

### MC-1: FORGETTING-THE-LEADING-COEFFICIENT
- **Surface form**: applies the formula using $g$ directly without dividing by the leading
  coefficient $a$ when $a\ne1$, getting an answer off by a factor of $1/a$.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared birth type — the formula
  is often stated for the monic form where $a=1$, and students apply it without checking whether
  the equation has been divided by $a$ first).
- **Repair**: re-derive Step 0 explicitly — divide by $a$ to get $f=g/a$ before using the VoP
  formulas.

### MC-2: WRONSKIAN-IN-DENOMINATOR-CAN-BE-ZERO
- **Surface form**: doesn't check $W\ne0$ before applying the formula; if $y_1,y_2$ are
  dependent, the formula fails entirely.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared birth type — students treat
  the Wronskian as just a number to compute rather than verifying nonzero independence first).
- **Repair**: re-verify $W\ne0$ explicitly before applying the formula, citing Abel's theorem for
  the one-point-suffices shortcut.

### MC-3: VARIATION-OF-PARAMETERS-ALWAYS-GIVES-A-CLEANER-ANSWER-THAN-UNDETERMINED-COEFFICIENTS
- **Surface form**: prefers VoP even when undetermined coefficients applies, then struggles with
  difficult integrals that undetermined coefficients would have avoided entirely.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared birth type — VoP is learned
  as "the general method" and over-applied even when a simpler algebraic method suffices).
- **Repair**: re-verify the decision rule — undetermined coefficients first when $g$ fits its
  table, VoP only when it doesn't.

## Misconceptions

### MC-1: FORGETTING-THE-LEADING-COEFFICIENT
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-2: WRONSKIAN-IN-DENOMINATOR-CAN-BE-ZERO
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-3: VARIATION-OF-PARAMETERS-ALWAYS-GIVES-A-CLEANER-ANSWER-THAN-UNDETERMINED-COEFFICIENTS
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Varying the parameters turns fixed constants into flexible functions, letting the same
  homogeneous 'shape' bend to absorb the forcing term — but the flexibility costs an integral,
  sometimes an ugly one."**
- **Anti-analogy**: VoP being "always valid" does NOT mean it's always the right tool —
  undetermined coefficients, when applicable, is a strictly cheaper algebraic shortcut that avoids
  integration entirely.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the Step-0 division-by-$a$ derivation, contrasted with the
  wrong-by-a-factor-of-$a$ result from skipping it.
- **Demonstration 2 (targets MC-2)**: the $y''+y=\tan x$ example, explicitly verifying
  $W=1\ne0$ before computing $u_1,u_2$.
- **Demonstration 3 (targets MC-3)**: the decision-rule contrast — undetermined coefficients'
  algebraic simplicity versus VoP's potentially non-elementary integrals for the same class of
  $g$.

## Discovery Questions
1. "If the ODE is ay''+by'+cy=g(x) with a≠1, do the VoP formulas use g directly, or g/a?"
2. "Before applying the VoP formula, have you verified the Wronskian is nonzero?"
3. "Should you always prefer variation of parameters over undetermined coefficients, or only when
   undetermined coefficients doesn't apply?"

## Teaching Sequence
1. **Representation shift**: the formula derivation via the two-constraint system, including
   Step 0's division by $a$, working Demonstration 1, isolating MC-1.
2. **Pattern induction**: the $\tan x$ worked example with explicit Wronskian verification,
   working Demonstration 2, isolating MC-2.
3. **Contrast pair**: the VoP-versus-undetermined-coefficients decision rule, working
   Demonstration 3, isolating MC-3.
4. **Mastery gate**: require a correct VoP derivation with the leading-coefficient division shown,
   a correct Wronskian verification before applying the formula, and a correct justification for
   choosing VoP over undetermined coefficients (or vice versa) for a given $g$, at the Blueprint's
   own stated MAMR of 5/5.

## Tutor Actions
- Never accept the VoP formula applied using $g$ directly when the leading coefficient $a\ne1$.
- Never accept the formula applied without first verifying the Wronskian is nonzero.
- Never accept VoP chosen over undetermined coefficients when the forcing term fits the
  trial-function table.

## Voice Teaching Notes
- Say "have you divided by the leading coefficient first?" whenever the VoP formula is set up.
- Before applying the formula, ask "have you verified the Wronskian is nonzero?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly derives $u_1',u_2'$ from the two-constraint system,
  including the leading-coefficient division.
- **Rung 2 (application)**: learner correctly solves a VoP problem with a nonelementary-appearing
  forcing term, verifying $W\ne0$ first.
- **Rung 3 (transfer)**: learner correctly connects the VoP formula to the Green's function and
  convolution representation for an initial value problem.

## Tutor Recovery Strategy
- If MC-1 recurs, re-derive Step 0's division by the leading coefficient.
- If MC-2 recurs, re-verify the Wronskian explicitly before applying the formula.
- If MC-3 recurs, re-verify the decision rule between the two methods.

## Memory Hooks
- "Divide by a first — the formula uses f=g/a, never raw g."
- "Check W≠0 before trusting the formula — dependence breaks it entirely."
- "VoP always works, but undetermined coefficients is cheaper when it applies."

## Transfer Connections
- `math.de.wronskian` (already authored, this campaign, Batch 152): supplies the Wronskian and
  Abel's theorem this concept's formula and independence check directly reuse.
- `math.de.second-order-homogeneous` (already authored, this campaign, Batch 151): supplies the
  fundamental-set concept the homogeneous solutions $y_1,y_2$ this formula requires.
- `math.calc.integration-by-parts` (already authored, certified domain): supplies the integration
  technique often needed to evaluate the $u_1,u_2$ integrals.
- `math.de.undetermined-coefficients` (companion batch concept): the KG's declared related
  concept, the preferred algebraic-only alternative when $g$ fits its trial-function table.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.de.variation-of-parameters.md`, reused by
  reference for its formula derivation, its $\tan x$ worked example, its decision-rule
  clarification, and its three-misconception library (birth types adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe, connecting VoP to Green's
  functions, the convolution representation for initial value problems, and the $n$th-order
  generalization.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `math.de.wronskian`/
  `math.de.second-order-homogeneous`/`math.calc.integration-by-parts`, unlocks none, cross_links
  none, advanced/apply, mastery_threshold 0.85, estimated_hours 5) was directly verified against
  the live KG and matches exactly.

## Version History
- 2026-09-19 (Batch 153): authored. Second entry this batch. Companion batch concept:
  `math.de.undetermined-coefficients`.
