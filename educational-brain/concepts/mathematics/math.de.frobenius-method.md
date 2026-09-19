# math.de.frobenius-method

## Identity
- **KG id**: `math.de.frobenius-method`
- **Domain**: math.de
- **Requires**: `math.de.series-solution`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.75 (Blueprint's own Component 0 stated `0.7` — the live KG's current
  value used as authoritative, see Curriculum Feedback)
- **Estimated hours**: 7 (Blueprint's own Component 0 stated `8` — the live KG's current value
  used as authoritative, see Curriculum Feedback)

## Learning Objective
Recognize that the ordinary series ansatz $y=\sum a_nx^n$ FAILS at a regular singular point,
motivating the Frobenius modification $y=x^r\sum a_nx^n$ (a targeted fix, never an unrelated
technique); derive the INDICIAL EQUATION FIRST (determining $r$ BEFORE any coefficient
recurrence — never treated as an afterthought); and recognize (orientation level) that the two
roots' DIFFERENCE (never their individual size) determines whether a logarithmic term is needed
in the second solution.

## Core Understanding
THE ORDINARY ANSATZ FAILS AT A SINGULAR POINT — FROBENIUS'S $x^r$ FACTOR IS A TARGETED FIX, NEVER
AN UNRELATED TECHNIQUE: for $x^2y''+xy'-y=0$ (regular singular point at $x=0$): the known solution
$y=x^{-1}$ is NOT representable as an ordinary power series $\sum a_nx^n$ starting at $a_0\ne0$
(it blows up at $x=0$) — the ordinary ansatz genuinely CANNOT capture this behavior. The Frobenius
modification's extra factor $x^r$ (with $r$ not necessarily a nonnegative integer) specifically
accommodates such non-integer or negative power-law behavior.

THE INDICIAL EQUATION IS DERIVED FIRST — DETERMINING $r$ BEFORE ANY COEFFICIENT RECURRENCE, NEVER
AN AFTERTHOUGHT: substituting $y=\sum a_nx^{n+r}$ into $x^2y''+xy'-y=0$ gives
$\sum a_n[(n+r)^2-1]x^{n+r}=0$. The LOWEST-order term ($n=0$, $a_0\ne0$) forces $r^2-1=0$ — the
INDICIAL equation, obtained with NO coefficient recurrence needed yet, giving $r=\pm1$ — matching
the already-known solutions $y=x$ ($r=1$) and $y=x^{-1}$ ($r=-1$) exactly. Only AFTER $r$ is
determined does the rest of the substitution proceed to find coefficients.

THE ROOTS' DIFFERENCE — NEVER THEIR INDIVIDUAL SIZE — DETERMINES WHETHER A LOG TERM IS NEEDED: for
$r_1=1,r_2=-1$: difference $r_1-r_2=2$, an INTEGER — placing this in the case where the second
solution CAN require a logarithmic term $Cy_1\ln x$ (though in this particular instance it happens
not to be needed). Contrast a hypothetical $r_1=1.5,r_2=0.3$ (difference $1.2$, non-integer): both
roots AUTOMATICALLY give independent Frobenius series with NO risk of a log complication —
confirming it is the DIFFERENCE (integer, non-integer, or zero) that classifies the case, never
how large or small either root is individually.

## Mental Models
- **"The x^r factor is a precision patch for exactly where the ordinary ansatz breaks down — not
  a whole new method."**
- **"Solve for r first, from the indicial equation alone — coefficients come only after, never
  before."**

## Why Students Fail

### MC-1: FROBENIUS-ASSUMED-UNRELATED-TECHNIQUE
- **Surface form**: believes the Frobenius ansatz is entirely unrelated to the ordinary
  series-solution ansatz.
- **Birth type**: Foundational severity (Blueprint's own declared severity — the new $x^r$ factor
  and indicial equation look like an entirely separate apparatus).
- **Repair**: re-walk the demonstration that the ordinary ansatz cannot represent $x^{-1}$,
  re-anchoring on Frobenius's $x^r$ as a targeted fix for exactly this failure.

### MC-2: INDICIAL-EQUATION-ASSUMED-AFTERTHOUGHT
- **Surface form**: believes the Frobenius method starts with the same coefficient-recurrence
  derivation as the ordinary method, with the indicial equation appearing only afterward.
- **Birth type**: High severity (Blueprint's own declared severity — the recurrence-first order is
  the familiar pattern from the ordinary method, making the indicial-equation-first order feel
  reversed).
- **Repair**: re-walk the indicial-equation-first derivation for $x^2y''+xy'-y=0$.

### MC-3: LOG-TERM-NEED-ASSUMED-DETERMINED-BY-ROOT-SIZE
- **Surface form**: believes whether a logarithmic term is needed is determined by the roots'
  individual size, rather than their difference.
- **Birth type**: Moderate severity (Blueprint's own declared severity — "large" or "small" roots
  feel like a more natural classifying feature than their difference).
- **Repair**: re-walk the integer-versus-non-integer-difference contrast, re-anchoring on the
  difference as the classifying feature.

## Misconceptions

### MC-1: FROBENIUS-ASSUMED-UNRELATED-TECHNIQUE
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: INDICIAL-EQUATION-ASSUMED-AFTERTHOUGHT
- **Surface form**: as described above.
- **Root cause (High)**: as described above.
- **Repair**: as described above.

### MC-3: LOG-TERM-NEED-ASSUMED-DETERMINED-BY-ROOT-SIZE
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"The Frobenius ansatz is the ordinary series ansatz wearing an extra x^r coat, specifically
  fitted for the singular-point cold the plain series can't survive."**
- **Anti-analogy**: the roots r₁,r₂ being "large" or "small" numbers is NOT what determines the
  solution's structure — only whether their difference is an integer, non-integer, or zero
  matters.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the verification that $y=x^{-1}$ cannot be represented by
  the ordinary ansatz.
- **Demonstration 2 (targets MC-2)**: the indicial-equation-first derivation
  $r^2-1=0\Rightarrow r=\pm1$.
- **Demonstration 3 (targets MC-3)**: the integer-difference ($r_1-r_2=2$) versus
  non-integer-difference ($1.2$) contrast.

## Discovery Questions
1. "Is the Frobenius ansatz an entirely unrelated technique from the ordinary series ansatz, or a
   targeted modification of it?"
2. "Does the Frobenius method start with the same coefficient-recurrence derivation as the
   ordinary method, with the indicial equation as an afterthought?"
3. "Is whether a logarithmic term is needed determined by how large the roots are, or by their
   difference?"

## Teaching Sequence
1. **Representation shift**: the ordinary-ansatz-failure demonstration, working Demonstration 1,
   isolating MC-1.
2. **Conflict evidence**: the indicial-equation-first derivation, working Demonstration 2,
   isolating MC-2.
3. **Contrast pair**: the roots'-difference classification, working Demonstration 3, isolating
   MC-3.
4. **Mastery gate**: require a correct verification that the ordinary ansatz fails at a singular
   point, a correct indicial-equation derivation and solution, and a correct classification of
   the roots' difference case, at the Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept the Frobenius ansatz described as entirely unrelated to the ordinary series
  ansatz.
- Never accept the coefficient recurrence derived before the indicial equation.
- Never accept the need for a logarithmic term determined by root size rather than root
  difference.

## Voice Teaching Notes
- Say "why does the ordinary ansatz fail here?" whenever a regular singular point is introduced.
- When roots are found, ask "is their difference an integer, non-integer, or zero?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly identifies a regular singular point and explains why
  the ordinary ansatz fails there.
- **Rung 2 (application)**: learner correctly derives and solves the indicial equation for a given
  ODE.
- **Rung 3 (transfer)**: learner correctly sets up the Frobenius ansatz and indicial equation for
  Bessel's equation, anticipating the structural complication for an integer root difference.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the ordinary-ansatz-failure demonstration.
- If MC-2 recurs, re-walk the indicial-equation-first derivation.
- If MC-3 recurs, re-walk the roots'-difference classification contrast.

## Memory Hooks
- "The x^r factor is a targeted fix for the ordinary ansatz's failure — not an unrelated method."
- "Solve for r first, from the indicial equation alone — coefficients come after."
- "It's the roots' difference — integer, non-integer, or zero — that decides the case, never their
  size."

## Transfer Connections
- `math.de.series-solution` (already authored, this campaign, Batch 156): supplies the ordinary
  power-series ansatz and coefficient-recurrence procedure this concept's Frobenius modification
  directly extends.

## Cross-Subject Connections
- Physics: Bessel's equation for radially symmetric wave problems.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.de.frobenius-method.md`, reused by
  reference for its Euler-Cauchy-type running example ($x^2y''+xy'-y=0$) across all three learning
  objectives, and its three-misconception registry (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe, setting up the Frobenius ansatz and
  indicial equation for Bessel's equation near its regular singular point.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Stale Blueprint metadata found and corrected**: the Blueprint's own Component 0 states
  `mastery_threshold=0.7`, `estimated_hours=8` — the live KG's current values (`0.75`, `7`) used
  as authoritative throughout this entry. Requires (`math.de.series-solution`), unlocks (none),
  and cross_links (none) matched exactly.

## Version History
- 2026-09-19 (Batch 158): authored. Second entry this batch. Companion batch concept:
  `math.de.inverse-laplace`.
