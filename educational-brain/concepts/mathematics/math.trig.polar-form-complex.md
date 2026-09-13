# math.trig.polar-form-complex

## Identity
- **KG id**: `math.trig.polar-form-complex`
- **Domain**: math.trig
- **Requires**: `math.found.complex-numbers`, `math.trig.trig-functions`, `math.geom.polar-coordinates`
- **Unlocks**: `math.trig.de-moivres-theorem`, `math.cx.complex-numbers-analysis`
- **Cross-links**: `math.cx.complex-numbers-analysis`
- **Difficulty**: advanced
- **Bloom level**: apply
- **Mastery threshold**: 0.75
- **Estimated hours**: 8

## Learning Objective
Convert a complex number between Cartesian form $a+bi$ and polar form $r(\cos\theta+i\sin\theta) =
re^{i\theta}$, with correct quadrant-aware computation of the argument $\theta$; use the polar
multiplication rule (multiply moduli, add arguments) and De Moivre's theorem to multiply complex
numbers and raise them to powers far more easily than in Cartesian form.

## Core Understanding
`math.found.complex-numbers` established the Cartesian description of a complex number,
$z=a+bi$, and `math.geom.polar-coordinates` established that any point in a plane can equally be
described by a distance $r$ from the origin and an angle $\theta$ from a reference direction. The
polar form of a complex number simply applies this second description to the Argand plane, where
$z=a+bi$ is plotted as the point $(a,b)$: the **modulus** $|z|=r=\sqrt{a^2+b^2}$ is the distance
from the origin, and the **argument** $\arg(z)=\theta$ is the angle counterclockwise from the
positive real axis. The polar form is $z=r(\cos\theta+i\sin\theta)=re^{i\theta}$ (the exponential
form via Euler's formula).

Converting from Cartesian to polar requires care with the argument: the raw reference angle
$\varphi=\arctan(|b/a|)$ always lies in $[0,\pi/2]$ regardless of which quadrant $(a,b)$ is
actually in, because the arctangent function's range is restricted to $(-\pi/2,\pi/2)$. The
correct argument $\theta$ must be reconstructed from $\varphi$ using the quadrant of $(a,b)$:
Q1 keeps $\theta=\varphi$, Q2 uses $\theta=\pi-\varphi$, Q3 uses $\theta=\pi+\varphi$, and Q4 uses
$\theta=2\pi-\varphi$. Skipping this quadrant adjustment is the single most common error on this
concept.

The payoff for converting to polar form is that multiplication becomes geometrically simple:
$(r_1e^{i\theta_1})(r_2e^{i\theta_2})=r_1r_2\,e^{i(\theta_1+\theta_2)}$ — **multiply the moduli,
add the arguments**. This is a direct consequence of the exponential law, since $e^{i\theta}$
behaves exactly like an ordinary exponential under multiplication. De Moivre's theorem,
$z^n=r^n(\cos n\theta+i\sin n\theta)$, follows immediately by applying this multiplication rule
$n$ times to $z$ multiplied by itself — powers of a complex number that would require tedious
repeated expansion in Cartesian form become a single computation in polar form.

## Mental Models
- **"Distance and direction, not real and imaginary parts."** The polar form describes the same
  point using a different pair of coordinates — how far, and which way.
- **"Multiplication scales and rotates."** Multiplying by $re^{i\theta}$ scales the modulus by
  $r$ and rotates by $\theta$ — this is why moduli multiply (compose scalings) while arguments
  add (compose rotations).
- **"Always plot it first."** The Argand diagram makes the true quadrant, and therefore the true
  range of $\theta$, visually unmistakable before any arctangent computation begins.

## Why Students Fail
- **MC-1 (Type 1, overgeneralization)**: `arctan` is first encountered almost exclusively in Q1
  examples, where its raw output IS the correct angle — that experience overgeneralizes into
  treating `arctan(b/a)`'s raw output as the argument in every quadrant, when its restricted
  range $(-\pi/2,\pi/2)$ only ever covers Q1 and Q4 directly.
- **MC-2 (Type 1, overgeneralization)**: the modulus-SQUARED formula $|z|^2=a^2+b^2$ appears
  naturally in conjugate-product calculations ($z\bar z=|z|^2$), and that adjacent, frequently-used
  formula is overgeneralized into standing in for the modulus itself, silently dropping the
  required square root.
- **MC-3 (Type 1, overgeneralization)**: Cartesian ADDITION of complex numbers combines
  components by adding them — that "combine by adding" habit, correct for addition, is
  overgeneralized onto MULTIPLICATION, where the correct rule multiplies moduli rather than
  adding them.

## Misconceptions

### MC-1: ARGUMENT-FROM-ARCTAN-ONLY
- **Surface form**: for $z=-1+i$, computing $\arctan(1/-1)=\arctan(-1)=-\pi/4$ and reporting
  $\theta=-\pi/4$, without checking that $z$ actually lies in Q2, where the true argument is
  $3\pi/4$.
- **Frequency band**: Foundational — the Blueprint's own note states this single error pattern
  produces a wrong answer on roughly 75% of inputs (every case outside Q1).
- **Root cause (Type 1)**: as described above — Q1-only training experience overgeneralized to
  every quadrant.
- **Repair**: plot $z$ on the Argand plane FIRST, identify the quadrant, compute the raw reference
  angle $\varphi=\arctan(|b/a|)\in[0,\pi/2]$, then adjust by quadrant before ever writing down
  $\theta$ as a final answer.

### MC-2: MODULUS-SQUARED-AS-MODULUS
- **Surface form**: for $z=3+4i$, reporting $|z|=3^2+4^2=25$ instead of
  $|z|=\sqrt{3^2+4^2}=5$.
- **Frequency band**: High.
- **Root cause (Type 1)**: overgeneralizing the adjacent, frequently-encountered
  modulus-squared formula ($|z|^2=a^2+b^2$, used in conjugate products) onto the modulus itself.
- **Repair**: anchor the modulus explicitly as a DISTANCE — the Pythagorean-theorem hypotenuse of
  the right triangle with legs $a$ and $b$ — a distance is never reported without taking the
  square root.

### MC-3: MULTIPLICATION-BY-ADDING-MODULI
- **Surface form**: for $z_1=2e^{i\pi/3}$, $z_2=3e^{i\pi/6}$, computing $z_1z_2=5e^{i\pi/2}$
  (adding the moduli $2+3=5$) instead of $z_1z_2=6e^{i\pi/2}$ (multiplying $2\times3=6$).
- **Frequency band**: Moderate to High.
- **Root cause (Type 1)**: Cartesian addition's "combine components by adding" habit
  overgeneralized onto polar multiplication, where the geometric operation (scaling, not
  translating) requires multiplying moduli instead.
- **Repair**: reframe multiplication as scaling-and-rotating rather than combining — scaling by
  $r_1$ and then by $r_2$ composes to scaling by $r_1r_2$, never $r_1+r_2$, exactly as scaling a
  photograph by $2\times$ and then by $3\times$ gives $6\times$ overall, not $5\times$.

## Analogies
- **The navigator analogy**: a ship's position is described by how far from port (distance $r$)
  and which compass bearing (angle $\theta$) — exactly the modulus-and-argument description of a
  complex number.
- **Anti-analogy**: multiplying two complex numbers is NOT like adding two navigational distances
  — it is like composing two successive scalings-and-rotations, which is why moduli multiply
  rather than add.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: convert $z=-1+i$ using the naive un-adjusted arctan value
  and the correctly quadrant-adjusted value, verifying by direct substitution which one actually
  reproduces $z=-1+i$ when converted back to Cartesian form.
- **Demonstration 2 (targets MC-2)**: compute $|z|$ for $z=3+4i$ both ways side by side (25 vs.
  5), and confirm 5 is correct by measuring the Pythagorean distance on a sketched Argand diagram.
- **Demonstration 3 (targets MC-3)**: multiply $z=i$ by $w=i$ (both modulus 1) using the addition
  rule (predicting modulus 2) versus the multiplication rule (predicting modulus 1), and check
  against the direct Cartesian computation $i\cdot i=-1$, which has modulus 1.

## Discovery Questions
1. "If $z=-1+i$ is plotted in the second quadrant, can its true argument possibly be a NEGATIVE
   angle like $-\pi/4$? What range of angles must a Q2 argument actually fall in?"
2. "Is $|z|$ a distance, or the square of a distance? What formula computes a distance from a
   right triangle's two legs?"
3. "If multiplying by $z_2$ scales a shape by $r_2$, and you already scaled it by $r_1$, what is
   the OVERALL scaling factor — $r_1+r_2$, or $r_1\times r_2$?"

## Teaching Sequence
1. **Anchor**: connect to `math.geom.polar-coordinates`'s $(r,\theta)$ description, introducing
   the Argand plane as the same idea applied to complex numbers.
2. **Quadrant-aware conversion**: teach the full rule (reference angle plus quadrant adjustment)
   as one inseparable procedure, always beginning with a sketch.
3. **Multiplication as geometry**: derive the multiply-moduli-add-arguments rule from the
   scale-and-rotate interpretation, then derive De Moivre's theorem as the same rule applied
   repeatedly.
4. **Conflict evidence**: the three demonstrations above, each isolating one misconception.
5. **Mastery gate**: require a full Cartesian-to-polar conversion in a non-Q1 quadrant, a polar
   multiplication, and an application of De Moivre's theorem to a power.

## Tutor Actions
- Never accept an argument value without first confirming the learner has identified the correct
  quadrant.
- When a learner computes a modulus, confirm the square root was taken before accepting the
  answer.
- When multiplying in polar form, ask separately "what happens to the moduli?" and "what happens
  to the arguments?" so the two rules are never silently merged.

## Voice Teaching Notes
- Introduce every conversion by asking the learner to sketch the point first — "where is this
  point, roughly?" — before any formula is applied, so the quadrant becomes a visual fact rather
  than an afterthought.
- When a learner states an argument outside the quadrant their own sketch shows, point back at
  the sketch rather than immediately correcting the formula.

## Assessment Signals
- **Rung 1 (recognition)**: learner identifies the quadrant of a complex number before computing
  its argument.
- **Rung 2 (application)**: learner correctly converts a complex number to polar form in any
  quadrant, and correctly multiplies two complex numbers in polar form.
- **Rung 3 (transfer)**: learner correctly applies De Moivre's theorem to compute a power of a
  complex number and verifies the result against direct Cartesian expansion.

## Tutor Recovery Strategy
- If MC-1 recurs, require the learner to sketch the point and state its quadrant out loud before
  computing any angle.
- If MC-2 recurs, re-anchor on the Pythagorean-distance framing with a concrete right triangle.
- If MC-3 recurs, re-run the scale-and-rotate demonstration with the learner's own numbers.

## Memory Hooks
- "Plot first, then compute the angle."
- "The modulus is a distance — always take the square root."
- "Multiply moduli, add arguments — never the reverse."

## Transfer Connections
- `math.found.complex-numbers` (already authored): supplies the Cartesian form and modulus this
  entry re-expresses in polar coordinates.
- `math.trig.trig-functions` (already authored): supplies the sine and cosine values needed for
  both directions of conversion.
- `math.geom.polar-coordinates` (already authored): supplies the $(r,\theta)$ coordinate system
  this entry applies directly to the Argand plane.

## Cross-Subject Connections
- None formal. The cross-link `math.cx.complex-numbers-analysis` (unauthored — math.cx has no
  Educational Brain entries yet) is handled via the Blueprint's own cross-link-probe content
  below, connecting this entry's exponential form $re^{i\theta}$ to the broader idea of a complex
  exponential function.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.trig.polar-form-complex.md`, reused by
  reference for its quadrant-aware argument rule, its worked multiplication/De Moivre examples,
  and its three-misconception registry (independently birth-type-classified above, since the
  Blueprint carries severity labels but no birth-type column).
- Transfer probe cited by reference: the Blueprint's own cross-link-probe scenario connecting
  $z=-1+i\sqrt3$'s polar form and cube to Euler's formula and the complex exponential — genuinely
  usable as a cross-link probe per the Blueprint's own declaration, since `math.cx` is a Tier-1
  concept named directly in the KG's `cross_links` field (this entry does not fabricate a deeper
  claim about `math.cx.complex-numbers-analysis`'s own content, which has no Educational Brain
  entry yet, but the probe itself asks only for a structural connection the learner can reason
  about from Euler's formula alone).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy.** `requires`, `unlocks`, `cross_links`, `difficulty`,
  `bloom`, `mastery_threshold`, and `estimated_hours` all match exactly between the Blueprint and
  the live KG.

## Version History
- 2026-09-13 (Batch 63): authored. Unblocked by `math.found.complex-numbers` (Batch 18-era
  `math.found` certification), `math.trig.trig-functions` (Batch 54), and `math.geom.polar-
  coordinates` (already authored under `math.geom`'s own certification). Companion batch
  concepts: `math.seq.series-convergence`, `math.disc.recurrence-relation`,
  `math.disc.asymptotic-notation`. `math.trig` reaches **23/25** this batch — only 2 concepts
  remain.
