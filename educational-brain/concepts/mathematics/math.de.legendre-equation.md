# math.de.legendre-equation

## Identity
- **KG id**: `math.de.legendre-equation`
- **Domain**: math.de
- **Requires**: `math.de.series-solution`
- **Unlocks**: none
- **Cross-links**: `math.fnal.special-functions` (Blueprint's own Component 7 claimed this concept
  "confirmed ALREADY authored," checked via `ls docs/curriculum/blueprints/` — this checked the
  wrong corpus; the EDUCATIONAL-BRAIN corpus does NOT yet have this concept authored — corrected
  to independence mode, see Curriculum Feedback)
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.7
- **Estimated hours**: 5 (Blueprint's own Component 0 stated `6` — the live KG's current value
  used as authoritative, see Curriculum Feedback)

## Learning Objective
Recognize $x=0$ as an ORDINARY point of Legendre's equation $(1-x^2)y''-2xy'+n(n+1)y=0$ (UNLIKE
Bessel's equation's regular singular point) — the STANDARD series ansatz applies directly, never
requiring the Frobenius modification; recognize that a NON-NEGATIVE INTEGER $n$ makes the series
TERMINATE into a genuine polynomial $P_n(x)$, while other $n$ values give a genuinely
non-terminating INFINITE series (never a polynomial regardless of $n$); and recognize
(orientation level) that Legendre polynomials form an ORTHOGONAL basis on $[-1,1]$, arising
naturally from SPHERICAL symmetry.

## Core Understanding
$x=0$ IS AN ORDINARY POINT — THE STANDARD ANSATZ APPLIES DIRECTLY, NEVER REQUIRING FROBENIUS: for
$(1-x^2)y''-2xy'+n(n+1)y=0$: at $x=0$, the leading coefficient $(1-x^2)=1\ne0$ — an ORDINARY
point. The standard ansatz $y=\sum a_kx^k$ (NO $x^r$ factor) applies directly — UNLIKE Bessel's
equation, whose $x=0$ is a regular SINGULAR point requiring the different Frobenius $x^r\sum
a_kx^k$ ansatz.

INTEGER $n$ PRODUCES A GENUINE TERMINATING POLYNOMIAL — OTHER $n$ NEVER TERMINATES: for $n=2$: the
substituted-ansatz recurrence FORCES coefficients to zero beyond a point, giving the genuine
degree-2 polynomial $P_2(x)=\frac12(3x^2-1)$. For $n=2.5$ (the SAME equation, non-integer $n$):
the SAME recurrence procedure NEVER terminates — an infinite series, qualitatively different in
KIND from a polynomial, not merely "a longer polynomial." Whether $n$ happens to be a
non-negative integer is a qualitative fork, never a minor detail.

LEGENDRE POLYNOMIALS FORM AN ORTHOGONAL BASIS ARISING FROM SPHERICAL SYMMETRY — NEVER AN
ARBITRARY EXAMPLE: $\int_{-1}^1P_m(x)P_n(x)\,dx=0$ for $m\ne n$ — exactly the Sturm-Liouville
eigenfunction orthogonality pattern. Separating variables for Laplace's equation in SPHERICAL
coordinates produces, for the polar-angle part (with $x=\cos\theta$), EXACTLY Legendre's
equation — analogous to how Bessel's equation arises from the radial part of a CYLINDRICAL
separation. Legendre's equation is the natural angular equation for spherically symmetric
problems, not a textbook curiosity.

## Mental Models
- **"Legendre's equation needs no Frobenius patch — x=0 is already ordinary, so the plain series
  ansatz works directly."**
- **"Whether n is a non-negative integer is a fork in the road — one path gives a genuine finite
  polynomial, the other an infinite series, never a matter of degree."**

## Why Students Fail

### MC-1: LEGENDRE-ASSUMED-TO-NEED-FROBENIUS
- **Surface form**: believes Legendre's equation requires the Frobenius method's modified ansatz,
  the same way Bessel's equation does.
- **Birth type**: Foundational severity (Blueprint's own declared severity — both equations are
  learned in close proximity, and Bessel's Frobenius requirement bleeds over).
- **Repair**: re-walk the direct standard-ansatz application, re-anchoring on $x=0$'s ordinary-
  point status here.

### MC-2: LEGENDRE-SERIES-ASSUMED-ALWAYS-POLYNOMIAL
- **Surface form**: believes the series-solution procedure applied to Legendre's equation always
  produces a polynomial regardless of $n$.
- **Birth type**: High severity (Blueprint's own declared severity — the name "Legendre
  polynomial" makes "polynomial" feel like the default, universal outcome).
- **Repair**: re-walk the $n=2$-versus-$n=2.5$ contrast on the identical equation.

### MC-3: LEGENDRE-EQUATION-ASSUMED-ARBITRARY-EXAMPLE
- **Surface form**: believes Legendre's equation is an arbitrary example ODE unconnected to
  physical geometry.
- **Birth type**: Moderate severity (Blueprint's own declared severity — the equation's abstract
  form gives no obvious hint of a spherical-symmetry origin).
- **Repair**: re-walk the spherical-coordinate separation-of-variables derivation.

## Misconceptions

### MC-1: LEGENDRE-ASSUMED-TO-NEED-FROBENIUS
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: LEGENDRE-SERIES-ASSUMED-ALWAYS-POLYNOMIAL
- **Surface form**: as described above.
- **Root cause (High)**: as described above.
- **Repair**: as described above.

### MC-3: LEGENDRE-EQUATION-ASSUMED-ARBITRARY-EXAMPLE
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Legendre's equation is the well-behaved sibling of Bessel's equation — same series-solution
  family, but no singular-point patch needed at x=0."**
- **Anti-analogy**: plugging in a non-integer n does NOT give "a Legendre polynomial with extra
  terms" — it gives a genuinely different kind of object, an infinite series, never a polynomial.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the direct standard-ansatz substitution for $n=2$, requiring
  no $x^r$ factor.
- **Demonstration 2 (targets MC-2)**: the $n=2$ (terminating, $P_2(x)$) versus $n=2.5$
  (non-terminating) contrast.
- **Demonstration 3 (targets MC-3)**: the spherical-coordinate separation-of-variables
  derivation producing Legendre's equation for the polar-angle part.

## Discovery Questions
1. "Does solving Legendre's equation require the Frobenius method's modified ansatz, the same way
   Bessel's equation does?"
2. "Does the series-solution procedure applied to Legendre's equation always produce a polynomial
   solution, regardless of n?"
3. "Is Legendre's equation an arbitrary example ODE, or does it arise from a specific physical
   geometry?"

## Teaching Sequence
1. **Representation shift**: the direct standard-ansatz application, working Demonstration 1,
   isolating MC-1.
2. **Conflict evidence**: the integer-versus-non-integer $n$ termination contrast, working
   Demonstration 2, isolating MC-2.
3. **Contrast pair**: the spherical-symmetry motivation, working Demonstration 3, isolating MC-3.
4. **Mastery gate**: require a correct verification that $x=0$ is ordinary and the standard
   ansatz applies, a correct explanation of the integer-termination condition, and a correct
   statement of the orthogonality domain and spherical-symmetry connection, at the Blueprint's
   own stated MAMR of 4/5.

## Tutor Actions
- Never accept Legendre's equation described as requiring the Frobenius method's modified ansatz.
- Never accept a claim that the series solution always produces a polynomial regardless of $n$.
- Never accept Legendre's equation described as an arbitrary example unconnected to physical
  geometry.

## Voice Teaching Notes
- Say "is x=0 ordinary or singular here?" whenever Legendre's equation is compared to Bessel's.
- When $n$ is given, ask "is it a non-negative integer, and does that matter for whether the
  series terminates?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly verifies $x=0$ is ordinary and applies the standard
  ansatz.
- **Rung 2 (application)**: learner correctly distinguishes the terminating (integer $n$) and
  non-terminating (non-integer $n$) outcomes.
- **Rung 3 (transfer)**: learner correctly connects Legendre's equation to the angular part of a
  spherically symmetric separation-of-variables problem, citing its orthogonality.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the direct standard-ansatz application.
- If MC-2 recurs, re-walk the $n=2$-versus-$n=2.5$ contrast.
- If MC-3 recurs, re-walk the spherical-coordinate separation derivation.

## Memory Hooks
- "x=0 is ordinary here — no Frobenius patch needed, unlike Bessel's equation."
- "Only non-negative integer n terminates into a genuine polynomial — other n gives an infinite
  series."
- "Legendre's equation is the natural angular equation for spherically symmetric problems."

## Transfer Connections
- `math.de.series-solution` (already authored, this campaign, Batch 156): supplies the
  ordinary-point ansatz and coefficient-recurrence procedure this concept applies directly.
- `math.de.bessel-equation` (already authored, this campaign, Batch 159, KG's declared related
  concept): the cylindrical-symmetry analogue, contrasted directly on ordinary-versus-singular
  point status.
- `math.fnal.special-functions` (not yet authored in this campaign): the KG's declared cross-link,
  supplying the general Sturm-Liouville-eigenfunction/orthogonal-polynomial framework Legendre
  polynomials instantiate.

## Cross-Subject Connections
- Physics: spherically symmetric problems (Laplace's equation, the Schrödinger equation for the
  hydrogen atom's angular wavefunction).

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.de.legendre-equation.md`, reused by
  reference for its $n=2$ standard-ansatz example, its integer-versus-non-integer termination
  contrast, its spherical-coordinate separation derivation, and its three-misconception registry
  (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own probe (independence mode here pending
  `math.fnal.special-functions`'s authoring), applying the ordinary-point ansatz and orthogonality
  framework to the hydrogen atom's angular wavefunction expansion.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Wrong-corpus cross-link discrepancy found and corrected**: the Blueprint's own Component 7
  claims `math.fnal.special-functions` is "confirmed ALREADY authored," checked via
  `ls docs/curriculum/blueprints/` — but that checks the BLUEPRINTS directory, where the concept's
  Blueprint does exist, not the EDUCATIONAL-BRAIN corpus, where it does NOT yet exist — corrected
  to independence mode here, the second such wrong-corpus discrepancy this campaign (after Batch
  157's `math.de.convolution-theorem`).
- **Stale Blueprint metadata found and corrected**: the Blueprint's own Component 0 states
  `estimated_hours=6` — the live KG's current value (`5`) used as authoritative. Requires
  (`math.de.series-solution`), unlocks (none), and mastery_threshold (0.7) matched exactly.

## Version History
- 2026-09-19 (Batch 160): authored. First entry this batch. Companion batch concept: `math.de.bvp`.
