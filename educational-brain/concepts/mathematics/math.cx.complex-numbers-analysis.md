# math.cx.complex-numbers-analysis

## Identity
- **KG id**: `math.cx.complex-numbers-analysis`
- **Domain**: math.cx
- **Requires**: `math.found.complex-numbers`, `math.trig.polar-form-complex`
- **Unlocks**: `math.cx.analytic-functions`
- **Cross-links**: `math.trig.eulers-formula`
- **Difficulty**: advanced
- **Bloom level**: understand
- **Mastery threshold**: 0.9
- **Estimated hours**: 3

## Learning Objective
Compute $|z|=\sqrt{x^2+y^2}$ — NEVER the taxicab sum $|x|+|y|$; compute $\bar z=x-iy$ — NEVER
negate both parts; and distinguish $z\bar z=|z|^2$ (always real, non-negative) from $z^2$ (complex
in general) — NEVER conflate the two.

## Core Understanding
THE MODULUS IS THE PYTHAGOREAN DISTANCE — NEVER THE SUM OF THE COORDINATES: for $z=5+12i$:
$|z|=\sqrt{5^2+12^2}=\sqrt{169}=13$ — the Euclidean distance from the origin on the Argand plane.
Computing $|z|=5+12=17$ instead is WRONG — that is the taxicab ($L^1$) distance, never the
modulus; the modulus is ALWAYS the Pythagorean $\sqrt{x^2+y^2}$, the direct analogue of ordinary
Euclidean distance in $\mathbb{R}^2$.

CONJUGATION NEGATES ONLY THE IMAGINARY PART — NEVER BOTH PARTS: for $z=-2+5i$: $\bar z=-2-5i$ —
the real part $-2$ stays UNCHANGED; only the imaginary part flips sign. Writing $\bar z=2-5i$
(negating the real part too) is WRONG — that computes $-z$'s real part combined with $\bar z$'s
imaginary part, neither $\bar z$ nor $-z$ correctly; conjugation is geometrically a reflection
across the real axis, which by definition leaves the real coordinate fixed.

$z\bar z=|z|^2$ IS ALWAYS REAL AND NON-NEGATIVE — NEVER THE SAME AS $z^2$: for $z=1+2i$:
$z\bar z=(1+2i)(1-2i)=1+4=5=|z|^2$ (real, non-negative), while $z^2=(1+2i)^2=1+4i+4i^2=-3+4i$
(genuinely complex, with a nonzero imaginary part). Confusing $z\bar z$ with $z^2$ is WRONG — they
are computed from entirely different formulas and give different TYPES of results in general:
$z\bar z=x^2+y^2$ is always real and non-negative, while $z^2=(x^2-y^2)+2xyi$ is complex unless
$y=0$.

## Mental Models
- **"The modulus is the Pythagorean hypotenuse of x and y — never the taxicab sum of the legs."**
- **"Conjugation flips only the imaginary sign — a mirror reflection across the real axis, the
  real coordinate never moves."**
- **"z times its own conjugate always lands back on the real line at |z|² — squaring z itself
  almost never does."**

## Why Students Fail

### MC-1: MODULUS-IS-SUM
- **Surface form**: computes $|z|=|x|+|y|$ (sum of absolute coordinates) instead of
  $\sqrt{x^2+y^2}$.
- **Birth type**: overgeneralization (Blueprint's own declared foundational severity — the
  "add the pieces" intuition from ordinary addition of real numbers is overgeneralized to
  distance).
- **Repair**: switch from "add absolute values" to "square, add, take square root" (Pythagorean
  theorem); mnemonic $|z|^2=x^2+y^2$.

### MC-2: CONJUGATE-NEGATES-BOTH
- **Surface form**: writes $\bar z=-x-iy$, negating both real and imaginary parts instead of only
  the imaginary part.
- **Birth type**: overgeneralization (Blueprint's own declared birth type — "conjugate" sounds like
  it should mean a total sign flip, similar to negation).
- **Repair**: switch from "negate everything" to "reflect across the real axis — only the
  imaginary part changes sign."

### MC-3: ZZ-BAR-AS-Z-SQUARED
- **Surface form**: confuses $z\bar z=|z|^2$ (always real and positive) with
  $z^2=(x^2-y^2)+2xyi$ (complex in general).
- **Birth type**: overgeneralization (Blueprint's own declared birth type — both notations look
  like "z times something related to z," inviting conflation).
- **Repair**: re-derive both formulas side by side, confirming $z\bar z$ is always real while $z^2$
  is complex unless $y=0$.

## Misconceptions

### MC-1: MODULUS-IS-SUM
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

### MC-2: CONJUGATE-NEGATES-BOTH
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

### MC-3: ZZ-BAR-AS-Z-SQUARED
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

## Analogies
- **"The modulus is a right-triangle hypotenuse — never a straight-line sum of the two legs."**
- **Anti-analogy**: conjugation isn't "negate the whole number" like negating a real number — it's
  a mirror reflection that leaves the real axis exactly where it was.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the $z=5+12i$ modulus computation, $\sqrt{169}=13$.
- **Demonstration 2 (targets MC-2)**: the $z=2+3i$ conjugate-versus-negation contrast,
  $\bar z=2-3i$ versus $-z=-2-3i$.
- **Demonstration 3 (targets MC-3)**: the $z=1+2i$ contrast between $z\bar z=5$ (real) and
  $z^2=-3+4i$ (complex).

## Discovery Questions
1. "For z=5+12i, is |z| the sum 5+12, or the Pythagorean √(5²+12²)?"
2. "Does conjugation negate both the real and imaginary parts, or just the imaginary part?"
3. "Is z·z̄ the same thing as z², or genuinely different?"

## Teaching Sequence
1. **Representation shift**: unify algebraic, geometric (Argand plane), and exponential
   (Euler's formula) representations, working the modulus computation, isolating MC-1.
2. **Contrast pair**: work the conjugate-versus-negation contrast, isolating MC-2; then the
   $z\bar z$-versus-$z^2$ contrast, isolating MC-3.
3. **Mastery gate**: require correct modulus and conjugate computations, a correct verification of
   $|z|^2=z\bar z$, exponential polar-form conversion, and De Moivre-style power computation, at
   the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept the modulus computed as a sum of absolute coordinates.
- Never accept the conjugate computed by negating both real and imaginary parts.
- Never accept $z\bar z$ and $z^2$ treated as the same quantity.

## Voice Teaching Notes
- Say "is that the Pythagorean distance, or just adding the pieces?" whenever a modulus is
  computed.
- Ask "does the real part change under conjugation?" whenever $\bar z$ is computed.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes $|z|$ and $\bar z$ for a given $z$.
- **Rung 2 (application)**: learner correctly verifies $|z|^2=z\bar z$ and converts between
  algebraic and exponential polar form.
- **Rung 3 (transfer)**: learner correctly computes $z^3$ for $z$ on the unit circle in exponential
  form and describes the geometric transformations mapping $z$ to $\bar z$ and to $-z$.

## Tutor Recovery Strategy
- If MC-1 recurs, re-derive via the Pythagorean-theorem mnemonic.
- If MC-2 recurs, re-anchor on the reflection-across-the-real-axis geometric picture.
- If MC-3 recurs, re-derive both formulas side by side.

## Memory Hooks
- "Modulus is Pythagorean — square, add, root. Never just add."
- "Conjugate flips only the imaginary sign — the real part never moves."
- "z·z̄ is always real; z² usually isn't — never confuse the two."

## Transfer Connections
- `math.found.complex-numbers` (prerequisite, already authored): supplies the algebraic form
  $z=a+bi$ and basic operations this concept builds a rigorous metric and polar structure on.
- `math.trig.polar-form-complex` (prerequisite, already authored): supplies the polar form
  $r(\cos\theta+i\sin\theta)$ this concept connects to the exponential form via Euler's formula.

## Cross-Subject Connections
- Electrical engineering: impedance in AC circuit analysis is represented as a complex number,
  with the modulus giving the magnitude and the conjugate used directly in power calculations.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.cx.complex-numbers-analysis.md`, reused by
  reference for its three-representation unification, its conjugate/negation and $z\bar z$/$z^2$
  contrasts, and its three-misconception registry (birth types adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe on $z=e^{i\pi/3}$ (unit circle),
  verifying $|z|^2=z\bar z=1$, computing $z^3$, and describing the geometric transformations to
  $\bar z$ and $-z$.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.found.complex-numbers`/`math.trig.polar-form-complex`, unlocks
  `math.cx.analytic-functions`, cross_links `math.trig.eulers-formula`, advanced/understand,
  mastery_threshold 0.9, estimated_hours 3) was directly verified against the live KG and matches
  exactly. The Blueprint's independence P76 mode reflects the cross-link's declared non-Tier-1
  status at write time, not its authored/unauthored status; this is consistent with the live KG
  and requires no correction.

## Version History
- 2026-09-20 (Batch 235): authored. First entry this batch. Companion batch concept:
  `math.graph.random-graph`.
