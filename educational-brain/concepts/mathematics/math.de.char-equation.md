# math.de.char-equation

## Identity
- **KG id**: `math.de.char-equation`
- **Domain**: math.de
- **Requires**: `math.de.second-order-homogeneous`, `math.alg.quadratic-formula`
- **Unlocks**: none
- **Cross-links**: `math.linalg.characteristic-polynomial` (Blueprint's own Component 7 declared
  this concept NOT YET authored at write-time — it has SINCE been authored (Batch 78, well before
  this campaign reached this concept); upgraded to a genuine cross-link probe, see Curriculum
  Feedback)
- **Difficulty**: advanced
- **Bloom level**: apply
- **Mastery threshold**: 0.9
- **Estimated hours**: 4

## Learning Objective
Derive the characteristic equation $ar^2+br+c=0$ by substituting the ansatz $y=e^{rx}$ into
$ay''+by'+cy=0$; handle the DISTINCT REAL ROOTS case, reusing the Wronskian to VERIFY (never
assume) the resulting exponentials form a genuine fundamental set; and recognize (orientation
level) that REPEATED roots require $y=(c_1+c_2x)e^{rx}$ and COMPLEX roots require
$y=e^{\alpha x}(c_1\cos\beta x+c_2\sin\beta x)$, the three-way split governed by the same
discriminant already familiar from the quadratic formula.

## Core Understanding
$y=e^{rx}$ CONVERTS A DIFFERENTIAL EQUATION INTO A PURELY ALGEBRAIC ONE — BECAUSE ITS DERIVATIVES
ARE SELF-PROPORTIONAL: for $y''-5y'+6y=0$: substituting $y=e^{rx},y'=re^{rx},y''=r^2e^{rx}$ gives
$r^2e^{rx}-5re^{rx}+6e^{rx}=0$; since $e^{rx}$ is NEVER zero, it factors out completely, leaving
$r^2-5r+6=0$ — the exponential has vanished entirely from the equation to solve, exactly because
its self-proportional derivative is what makes the factoring work.

DISTINCT ROOTS DO NOT AUTOMATICALLY GUARANTEE A FUNDAMENTAL SET — THE WRONSKIAN STILL MUST VERIFY
IT: continuing $r^2-5r+6=0=(r-2)(r-3)$: roots $r_1=2,r_2=3$ give candidates $y_1=e^{2x},y_2=e^{3x}$.
The Wronskian STILL must confirm independence:
$W=e^{2x}(3e^{3x})-e^{3x}(2e^{2x})=3e^{5x}-2e^{5x}=e^{5x}\ne0$ — confirmed. Finding two distinct
roots is not automatically the same as having verified a fundamental set; the Wronskian test from
`math.de.second-order-homogeneous` is still the concept doing the actual verification work.

A REPEATED ROOT REQUIRES A GENUINELY DIFFERENT SOLUTION FORM — $e^{rx}$ USED TWICE COLLAPSES THE
SOLUTION SPACE: for $r^2-4r+4=0$: discriminant $=0$, repeated root $r=2$. The naive
$y=c_1e^{2x}+c_2e^{2x}$ collapses to the single-term $(c_1+c_2)e^{2x}$ — NOT a genuine
two-dimensional general solution. The correct form is $y=(c_1+c_2x)e^{2x}$, the extra factor of
$x$ specifically restoring the missing dimension. Contrast $r^2+4r+13=0$: discriminant $=-36<0$,
COMPLEX roots $r=-2\pm3i$, requiring the real-valued oscillatory form
$y=e^{-2x}(c_1\cos3x+c_2\sin3x)$ — all three cases governed by the SAME discriminant sign already
familiar from the quadratic formula.

## Mental Models
- **"e^(rx)'s self-proportional derivative is exactly why substituting it converts calculus into
  algebra — not an arbitrary trick."**
- **"Two roots aren't automatically a fundamental set — the Wronskian is still the concept doing
  the real verification work."**

## Why Students Fail

### MC-1: EXPONENTIAL-ANSATZ-ASSUMED-ARBITRARY
- **Surface form**: believes the substitution $y=e^{rx}$ is an arbitrary trick with no clear
  motivation.
- **Birth type**: Foundational severity (Blueprint's own declared severity — the ansatz is often
  presented as a memorized starting move rather than a motivated choice).
- **Repair**: re-walk the factoring-out demonstration for $y''-5y'+6y=0$, re-anchoring on the
  exponential's self-proportional derivative as the reason it works.

### MC-2: DISTINCT-ROOTS-ASSUMED-TO-AUTOMATICALLY-GIVE-FUNDAMENTAL-SET
- **Surface form**: believes two distinct roots automatically produce a genuine fundamental set,
  missing that the Wronskian test is still required.
- **Birth type**: High severity (Blueprint's own declared severity — "different roots" feels like
  it should obviously mean "different, independent solutions").
- **Repair**: re-walk the explicit Wronskian verification for $e^{2x},e^{3x}$.

### MC-3: REPEATED-ROOT-ASSUMED-TO-GIVE-TWO-INDEPENDENT-SOLUTIONS
- **Surface form**: believes a repeated root still yields two independent solutions via $e^{rx}$
  used twice.
- **Birth type**: Moderate severity (Blueprint's own declared severity — a "double root" feels
  like it should naturally give two things, obscuring that they're identical/proportional).
- **Repair**: re-walk the collapse demonstration for $r^2-4r+4=0$, showing $c_1e^{2x}+c_2e^{2x}$
  reduces to one dimension, requiring the $(c_1+c_2x)e^{2x}$ fix.

## Misconceptions

### MC-1: EXPONENTIAL-ANSATZ-ASSUMED-ARBITRARY
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: DISTINCT-ROOTS-ASSUMED-TO-AUTOMATICALLY-GIVE-FUNDAMENTAL-SET
- **Surface form**: as described above.
- **Root cause (High)**: as described above.
- **Repair**: as described above.

### MC-3: REPEATED-ROOT-ASSUMED-TO-GIVE-TWO-INDEPENDENT-SOLUTIONS
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"The exponential ansatz is a translator — it converts the language of derivatives into the
  language of algebra, because e^(rx) speaks both fluently."**
- **Anti-analogy**: a repeated root is NOT "the same case, twice" — using the same exponential
  twice gives one direction, not two, and the extra x factor is what recovers the missing
  dimension.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the full substitution derivation for $y''-5y'+6y=0$,
  spotlighting the exponential's complete disappearance.
- **Demonstration 2 (targets MC-2)**: the explicit Wronskian verification for $e^{2x},e^{3x}$.
- **Demonstration 3 (targets MC-3)**: the three-case discriminant contrast — distinct real,
  repeated, complex — for $r^2-5r+6=0$, $r^2-4r+4=0$, $r^2+4r+13=0$.

## Discovery Questions
1. "Is substituting y=e^(rx) an arbitrary trick, or is there a specific property of exponentials
   that makes it work?"
2. "If the characteristic equation has two distinct roots, does that automatically guarantee the
   resulting exponentials form a genuine fundamental set?"
3. "For a repeated root, do y₁=e^(rx) and y₂=e^(rx) (or any constant multiple) form a genuine
   fundamental set?"

## Teaching Sequence
1. **Representation shift**: the substitution derivation, working Demonstration 1, isolating MC-1.
2. **Conflict evidence**: the Wronskian verification for distinct roots, working Demonstration 2,
   isolating MC-2.
3. **Contrast pair**: the three-case discriminant split, working Demonstration 3, isolating MC-3.
4. **Mastery gate**: require a correct characteristic-equation derivation, a correct
   Wronskian-verified distinct-roots general solution, and a correct three-case discriminant
   classification (without full derivation of the repeated/complex forms), at the Blueprint's own
   stated MAMR of 5/5.

## Tutor Actions
- Never accept the exponential ansatz described as an arbitrary, unmotivated trick.
- Never accept distinct roots treated as automatically giving a fundamental set without a
  Wronskian check.
- Never accept a repeated root's general solution written as $c_1e^{rx}+c_2e^{rx}$ without the
  extra $x$ factor.

## Voice Teaching Notes
- Say "why does substituting an exponential turn this into algebra?" whenever the ansatz is
  introduced.
- After finding distinct roots, ask "have you verified independence via the Wronskian, or just
  assumed it?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly derives the characteristic equation from a
  constant-coefficient ODE.
- **Rung 2 (application)**: learner correctly solves the characteristic equation for distinct
  roots and verifies the fundamental set via the Wronskian.
- **Rung 3 (transfer)**: learner correctly uses the discriminant to classify a new equation's
  solution-form case before solving, and explains the physical meaning of a complex-root solution
  for a damped oscillator.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the factoring-out demonstration.
- If MC-2 recurs, re-walk the explicit Wronskian verification for distinct roots.
- If MC-3 recurs, re-walk the repeated-root collapse demonstration.

## Memory Hooks
- "e^(rx)'s self-proportional derivative is why the substitution turns calculus into algebra."
- "Distinct roots still need the Wronskian to confirm a genuine fundamental set."
- "A repeated root needs an extra x factor — using e^(rx) twice collapses to one dimension."

## Transfer Connections
- `math.de.second-order-homogeneous` (already authored, this campaign, Batch 151): supplies the
  Wronskian test and fundamental-set machinery this concept's distinct-roots case directly reuses.
- `math.alg.quadratic-formula` (already authored, certified domain): supplies the solving method
  for the characteristic equation and the discriminant governing the three-way case split.
- `math.linalg.characteristic-polynomial` (already authored, Batch 78, formal KG cross-link):
  supplies the general characteristic-polynomial/eigenvalue framework this concept's constant-
  coefficient-ODE version directly parallels.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.de.char-equation.md`, reused by reference
  for its substitution derivation, its distinct-roots Wronskian verification, its three-case
  discriminant contrast, and its three-misconception registry (severity levels adopted directly as
  declared).
- Transfer probe: extending the Blueprint's own independence-mode probe (damped spring-mass system
  classification) into a genuine cross-link probe against `math.linalg.characteristic-polynomial`,
  connecting the ODE's characteristic equation to the general linear-algebra characteristic
  polynomial and its eigenvalue interpretation.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Reverse-direction cross-link discrepancy found and corrected**: the Blueprint's own
  Component 7 declares `math.linalg.characteristic-polynomial` NOT YET authored at its own
  write-time, correctly setting `P76_mode=independence` under that state. Checking the live corpus
  now shows it WAS authored (Batch 78 of this campaign), well before this campaign reached
  `math.de.char-equation` — this entry upgrades the transfer probe to a genuine cross-link probe
  against that concept, consistent with the established reverse-direction-discrepancy correction
  pattern (last seen at Batch 131's `math.real.ivt`). All other fields (requires
  `math.de.second-order-homogeneous`/`math.alg.quadratic-formula`, unlocks none, advanced/apply,
  mastery_threshold 0.9, estimated_hours 4) matched the live KG exactly.

## Version History
- 2026-09-19 (Batch 152): authored. Second entry this batch. Companion batch concept:
  `math.de.wronskian`.
