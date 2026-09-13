# math.trig.de-moivres-theorem

## Identity
- **KG id**: `math.trig.de-moivres-theorem`
- **Domain**: math.trig
- **Requires**: `math.trig.polar-form-complex`
- **Unlocks**: `math.cx.complex-numbers-analysis`
- **Cross-links**: `math.cx.complex-numbers-analysis` (see Curriculum Feedback — handled in
  independence mode, not the Blueprint's declared cross-link-probe mode)
- **Difficulty**: advanced
- **Bloom level**: apply
- **Mastery threshold**: 0.75
- **Estimated hours**: 6

## Learning Objective
State and apply De Moivre's Theorem, $(\cos\theta+i\sin\theta)^n=\cos(n\theta)+i\sin(n\theta)$,
to compute powers of complex numbers (correctly raising the modulus to the $n$-th power
separately from the angle computation); find ALL $n$ distinct complex $n$-th roots of a number;
and derive multiple-angle trigonometric formulas via binomial expansion and comparison of real
and imaginary parts.

## Core Understanding
`math.trig.polar-form-complex` already established that multiplying complex numbers in polar
form multiplies moduli and ADDS arguments. De Moivre's Theorem is exactly this multiplication
rule applied $n$ times to a number multiplied by itself: multiplying
$(\cos\theta+i\sin\theta)$ by itself $n$ times adds the argument $\theta$ to itself $n$ times,
giving $n\theta$, while the modulus (each factor being 1) stays 1 — so
$(\cos\theta+i\sin\theta)^n=\cos(n\theta)+i\sin(n\theta)$. For a general
$z=r(\cos\theta+i\sin\theta)$, the modulus raises to the $n$-th power separately:
$z^n=r^n(\cos(n\theta)+i\sin(n\theta))$.

The theorem also runs BACKWARD to find $n$-th roots. To solve $w^n=z$, write $z=r(\cos\theta+
i\sin\theta)$ and seek $w=s(\cos\varphi+i\sin\varphi)$. By De Moivre, $w^n=s^n(\cos(n\varphi)+
i\sin(n\varphi))$, so $s^n=r$ (giving $s=r^{1/n}$) and $n\varphi=\theta+2\pi k$ for some integer
$k$ — since angles are only determined up to full-circle multiples of $2\pi$, ALL integer values
of $k$ satisfying $n\varphi=\theta+2\pi k$ must be considered. Dividing the ENTIRE right side by
$n$ gives $\varphi_k=(\theta+2\pi k)/n$. Taking $k=0,1,\ldots,n-1$ produces exactly $n$ genuinely
DISTINCT roots (any $k$ outside this range just repeats an angle already found, modulo $2\pi$) —
every nonzero complex number has EXACTLY $n$ distinct $n$-th roots, evenly spaced around a circle
of radius $r^{1/n}$.

De Moivre's Theorem also provides a purely algebraic route to multiple-angle formulas: expanding
$(\cos\theta+i\sin\theta)^n$ via the binomial theorem produces a sum of terms in powers of
$\cos\theta$ and $i\sin\theta$; separating this expansion into its real and imaginary parts and
comparing against De Moivre's own closed form $\cos(n\theta)+i\sin(n\theta)$ (whose real part is
$\cos(n\theta)$, imaginary part is $\sin(n\theta)$) yields explicit polynomial formulas for
$\cos(n\theta)$ and $\sin(n\theta)$ — no separate geometric argument needed.

## Mental Models
- **"Raising to the $n$-th power is multiplying by itself $n$ times — the argument just keeps
  adding."**
- **"Every nonzero complex number has EXACTLY $n$ distinct $n$-th roots — never just one, however
  familiar one of them looks."**
- **"Divide the WHOLE numerator by $n$ — including the $2\pi k$ term — never just the angle
  part."**

## Why Students Fail
- **MC-1 (Type 1, overgeneralization)**: the real-number habit of "the" $n$-th root (a single,
  familiar answer) is overgeneralized into the complex setting, where every nonzero number
  genuinely has $n$ DISTINCT roots — a learner who correctly finds one obvious (often real) root
  may simply stop, never generating the remaining $n-1$.
- **MC-2 (Type 1, overgeneralization)**: De Moivre's theorem's simplest statement is for a
  number already on the unit circle (modulus exactly 1), where the modulus never changes — that
  special-case simplicity is overgeneralized into forgetting the modulus needs its OWN
  computation ($r^n$) for any other modulus.
- **MC-3 (Type 4, notation-induced)**: the formula $\varphi_k=(\theta+2\pi k)/n$ visually
  separates into a "$\theta$" term and a "$2\pi k$" term, and the notation's own layout invites
  dividing only the first term by $n$ and adding the second term afterward, rather than dividing
  the entire numerator.

## Misconceptions

### MC-1: ONLY-OBVIOUS-ROOT-FOUND
- **Surface form**: for the cube roots of $z=8$, reporting only $w=2$ (the obvious real root)
  and missing the two additional complex roots $-1+i\sqrt3$ and $-1-i\sqrt3$.
- **Frequency band**: Foundational.
- **Root cause (Type 1)**: as described above.
- **Repair**: generate all $n$ roots explicitly by cycling through $k=0,1,\ldots,n-1$, plotting
  them on the complex plane to show they are evenly spaced around a circle, and verifying each
  one independently satisfies $w^n=z$.

### MC-2: MODULUS-NOT-RAISED-TO-POWER-SEPARATELY
- **Surface form**: for $[3(\cos\theta+i\sin\theta)]^4$, computing only the angle part
  $4\theta$ and reporting a modulus of $3$ instead of $3^4=81$.
- **Frequency band**: Moderate.
- **Root cause (Type 1)**: as described above.
- **Repair**: re-anchor that for modulus 1 the theorem's basic form applies unchanged, but for
  ANY other modulus $r$, it raises to the $n$-th power exactly like ordinary exponentiation,
  entirely separately from the angle computation.

### MC-3: ROOT-ANGLE-INCREMENT-MISCOMPUTED
- **Surface form**: computing $\varphi_k=\theta/n+2\pi k$ instead of the correct
  $\varphi_k=(\theta+2\pi k)/n$.
- **Frequency band**: Foundational.
- **Root cause (Type 4)**: as described above.
- **Repair**: re-derive from the defining equation $n\varphi=\theta+2\pi k$ — dividing BOTH sides
  by $n$ gives $\varphi=(\theta+2\pi k)/n$, with the entire right side divided, never just the
  $\theta$ term.

## Analogies
- **"Slicing a pie into $n$ equal pieces"**: the $n$-th roots of a complex number are evenly
  spaced around a circle, exactly like $n$ equally-sized pie slices — there are always exactly
  $n$ of them, not one.
- **Anti-analogy**: finding an $n$-th root is NOT like finding a real square root, where there is
  usually just one "principal" answer people care about by convention — in the complex setting,
  all $n$ roots are equally legitimate and equally required.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: find all three cube roots of $z=8$, plot them, and verify
  each satisfies $w^3=8$ by direct cubing.
- **Demonstration 2 (targets MC-2)**: compute $[3(\cos\theta+i\sin\theta)]^4$ both correctly
  (modulus $3^4=81$) and incorrectly (modulus left at $3$), and check which one matches direct
  Cartesian expansion for a specific $\theta$.
- **Demonstration 3 (targets MC-3)**: derive $\varphi_k$ from the defining equation
  $n\varphi=\theta+2\pi k$ step by step, showing the division applies to the whole right side.

## Discovery Questions
1. "If $w=2$ satisfies $w^3=8$, are there any OTHER complex numbers that also satisfy
   $w^3=8$? How many should there be in total?"
2. "Does De Moivre's Theorem in its simplest form (modulus exactly 1) tell you what happens to
   the modulus when it ISN'T 1?"
3. "In the equation $n\varphi=\theta+2\pi k$, if you divide both sides by $n$, does the $2\pi k$
   term get divided too?"

## Teaching Sequence
1. **Anchor**: connect to `math.trig.polar-form-complex`'s multiplication rule, deriving De
   Moivre's Theorem as repeated application of that rule.
2. **Contrast pair**: the full $n$-root computation for a concrete example, contrasted against
   stopping at one obvious root; the algebraic multiple-angle-formula derivation contrasted
   against a purely geometric approach.
3. **Conflict evidence**: the three demonstrations above.
4. **Mastery gate**: require computing a power (with nontrivial modulus), finding ALL $n$-th
   roots of a complex number, and deriving a multiple-angle formula via binomial expansion.

## Tutor Actions
- Whenever roots are requested, ask "how many roots should there be in total?" before accepting
  any single answer as complete.
- When a modulus other than 1 is involved, confirm the modulus was raised to the $n$-th power
  separately from the angle computation.
- When computing a root angle, ask the learner to state the defining equation before dividing by
  $n$.

## Voice Teaching Notes
- Introduce root-finding by asking "how many roots does an $n$-th-degree equation have?" first,
  connecting to the learner's existing sense that equations of degree $n$ have $n$ roots, before
  presenting the specific formula.
- When a learner reports only one root, ask "is that the ONLY number whose $n$-th power gives
  this result?" rather than immediately supplying the remaining roots.

## Assessment Signals
- **Rung 1 (recognition)**: learner states that a nonzero complex number has exactly $n$ distinct
  $n$-th roots.
- **Rung 2 (application)**: learner correctly computes a power of a complex number with nontrivial
  modulus, and correctly finds all $n$-th roots of a complex number.
- **Rung 3 (transfer)**: learner correctly derives a multiple-angle trigonometric formula via
  binomial expansion and comparison of real and imaginary parts.

## Tutor Recovery Strategy
- If MC-1 recurs, re-run the full root-generation demonstration, explicitly cycling through every
  value of $k$.
- If MC-2 recurs, re-anchor on the modulus-1 special case and contrast it with a nontrivial
  modulus example.
- If MC-3 recurs, re-derive the root-angle formula from the defining equation with the learner.

## Memory Hooks
- "Every nonzero number has exactly $n$ distinct $n$-th roots."
- "The modulus raises to the power too — never left behind."
- "Divide the WHOLE numerator by $n$."

## Transfer Connections
- `math.trig.polar-form-complex` (already authored): supplies the polar form and the
  multiplication rule this entire theorem is built directly from.

## Cross-Subject Connections
- None formal. The cross-link `math.cx.complex-numbers-analysis` (unauthored — math.cx has no
  Educational Brain entries yet) is handled via independence mode below.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.trig.de-moivres-theorem.md`, reused by
  reference for its power-computation and root-finding worked examples, its multiple-angle-
  formula derivation, and its three-misconception registry (independently birth-type-classified
  above, since the Blueprint carries severity labels but no birth-type column).
- Transfer probe, adapted to INDEPENDENCE MODE (see Curriculum Feedback below): the Blueprint's
  own five-fifth-roots scenario ($z=32i$) is preserved in substance — this entry asks the learner
  to find all five fifth roots of a complex number and verify one root's modulus matches the
  original modulus-formula computation applied directly to the computed $a+bi$ form, without
  assuming any content specific to `math.cx.complex-numbers-analysis` is available for direct
  citation.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Genuine Blueprint-staleness finding on P76 cross-link mode.** The Blueprint declares
  cross-link-probe mode against `math.cx.complex-numbers-analysis`, verified via `ls` that the
  BLUEPRINT FILE exists — but that check does not confirm an Educational Brain entry exists.
  Direct verification (`ls educational-brain/concepts/mathematics/math.cx.complex-numbers-
  analysis.md`) confirmed no such file exists — `math.cx` has zero Educational Brain entries.
  Per this program's established precedent (Batch 48/53/58/62/63), Blueprint-file-existence is
  not a sufficient condition for cross-link-probe mode. This entry uses INDEPENDENCE MODE
  instead, preserving the Blueprint's underlying transfer-probe content without assuming
  `math.cx.complex-numbers-analysis`'s own Educational Brain content is available for citation.
- Zero discrepancy on all other substantive fields (`requires`, `unlocks`, `difficulty`, `bloom`,
  `mastery_threshold`, `estimated_hours`).

## Version History
- 2026-09-13 (Batch 64): authored. Unblocked by `math.trig.polar-form-complex` (Batch 63).
  Companion batch concepts: `math.trig.eulers-formula`, `math.calc.power-series`,
  `math.seq.divergence-test`. Authoring this entry ALONGSIDE `math.trig.eulers-formula` in the
  same batch brings `math.trig` to **25/25 — DOMAIN CERTIFIED**, the seventh mathematics domain
  after math.found/math.geom/math.arith/math.nt/math.alg/math.func.
