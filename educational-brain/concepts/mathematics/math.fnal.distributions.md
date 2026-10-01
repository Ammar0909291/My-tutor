# math.fnal.distributions

## Identity
- **KG id**: `math.fnal.distributions`
- **Domain**: math.fnal
- **Requires**: `math.fnal.dual-space-functional`, `math.calc.derivative-definition`
- **Unlocks**: none
- **Cross-links**: `math.de.greens-function`
- **Difficulty**: research
- **Bloom level**: analyze
- **Mastery threshold**: 0.6
- **Estimated hours**: 8

## Learning Objective
Recognize the Dirac delta $\delta(\varphi)=\varphi(0)$ as a RIGOROUS linear functional on test
functions — NEVER an ordinary (if hard-to-describe) function; recognize every locally integrable
function embeds as a distribution — NEVER treat distribution theory as disconnected from ordinary
functions; and recognize the weak derivative makes differentiation ALWAYS possible — NEVER assume
a jump discontinuity has no derivative at all.

## Core Understanding
THE DIRAC DELTA IS A RIGOROUS LINEAR FUNCTIONAL — NEVER AN ORDINARY FUNCTION, JUST HARD TO
DESCRIBE: $\delta(\varphi)=\varphi(0)$ satisfies $\delta(a\varphi+b\psi)=(a\varphi+b\psi)(0)
=a\varphi(0)+b\psi(0)=a\delta(\varphi)+b\delta(\psi)$ — perfectly linear, exactly the condition
`math.fnal.dual-space-functional` established for functionals generally. No ordinary function is
zero everywhere except one point yet integrates to $1$ there — $\delta$ was never trying and
failing to be such a function. Believing the Dirac delta is an ordinary function that happens to
be hard to describe is WRONG — it is a genuinely DIFFERENT kind of rigorous object: a linear
functional on test functions, resolving `math.de.greens-function`'s own flagged concern about
$\delta$'s true nature.

EVERY LOCALLY INTEGRABLE FUNCTION EMBEDS AS A DISTRIBUTION — NEVER A DISCONNECTED FRAMEWORK: for
$f(x)=x^2$, $T_f(\varphi)=\int x^2\varphi(x)\,dx$ is linear in $\varphi$ by linearity of
integration, built DIRECTLY from the ordinary function $f$, with NO information lost (different
$f$'s give different $T_f$'s). Believing distribution theory is a wholly separate, disconnected
framework from ordinary functions is WRONG — every ordinary locally integrable function embeds
directly as a distribution; distribution theory properly CONTAINS ordinary function theory as a
special case, never replaces or ignores it.

THE WEAK DERIVATIVE MAKES DIFFERENTIATION ALWAYS POSSIBLE — NEVER ASSUME A JUMP HAS NO DERIVATIVE
AT ALL: the Heaviside step function $H(x)$ has NO ordinary derivative at $x=0$. Its weak
derivative: $\langle H',\varphi\rangle=-\langle H,\varphi'\rangle=-\int_0^\infty\varphi'(x)\,dx
=-[\varphi(x)]_0^\infty=\varphi(0)=\delta(\varphi)$ — so $H'=\delta$ DISTRIBUTIONALLY. Ordinary
calculus has NOTHING to say at $x=0$, but the weak derivative — shifting the derivative onto the
always-smooth test function via integration by parts — handles the jump cleanly. Believing a
function with a jump discontinuity simply has no derivative in any sense is WRONG — the weak
derivative $\langle T',\varphi\rangle=-\langle T,\varphi'\rangle$ is ALWAYS well-defined for
distributions, with no exceptions, exactly why `math.de.greens-function`'s equation
$LG=\delta(x-\xi)$ (no ordinary-function solution) makes complete rigorous sense.

## Mental Models
- **"δ was never trying and failing to be an ordinary function — it's a genuinely different,
  completely rigorous kind of object: a linear functional on test functions."**
- **"Distribution theory doesn't replace ordinary functions with something foreign — every
  locally integrable function embeds directly, with nothing lost."**
- **"The weak derivative shifts the work onto the smooth test function — it produces a fully
  meaningful answer exactly where ordinary calculus gives up."**

## Why Students Fail

### MC-1: DELTA-ASSUMED-ORDINARY-FUNCTION
- **Surface form**: believes the Dirac delta is an ordinary (if hard-to-describe) function,
  missing that it is properly understood as a genuinely different kind of object — a linear
  functional on test functions.
- **Birth type**: perceptual intuition (Blueprint's own declared foundational severity — $\delta$
  is often first introduced informally as "a function that's infinite at 0 and zero elsewhere,"
  inviting a pointwise-function reading).
- **Repair**: re-walk the linearity verification, re-anchoring on "$\delta$ is a rigorous linear
  functional, a fundamentally different kind of object from a pointwise function."

### MC-2: DISTRIBUTIONS-ASSUMED-DISCONNECTED-FROM-FUNCTIONS
- **Surface form**: believes distribution theory is a wholly separate, disconnected framework
  from ordinary functions, missing that every ordinary locally integrable function embeds
  directly as a distribution.
- **Birth type**: instruction-induced (Blueprint's own declared high severity — distributions are
  often introduced as a wholly new abstract apparatus, without stressing the embedding).
- **Repair**: re-walk the embedding construction, re-anchoring on "every ordinary function embeds
  directly as a distribution — nothing is lost."

### MC-3: JUMP-ASSUMED-TO-HAVE-NO-DERIVATIVE-AT-ALL
- **Surface form**: believes a function with a jump discontinuity simply has no derivative in any
  sense, missing that the weak derivative is always well-defined for distributions, even at a
  jump.
- **Birth type**: overgeneralization (Blueprint's own declared moderate severity — "the ordinary
  derivative fails at a jump" is overgeneralized to "no notion of derivative can succeed there").
- **Repair**: re-walk the Heaviside weak-derivative computation, re-anchoring on "the weak
  derivative is always well-defined, even at a jump, giving the rigorous result $H'=\delta$."

## Misconceptions

### MC-1: DELTA-ASSUMED-ORDINARY-FUNCTION
- **Surface form**: as described above.
- **Root cause (perceptual intuition)**: as described above.
- **Repair**: as described above.

### MC-2: DISTRIBUTIONS-ASSUMED-DISCONNECTED-FROM-FUNCTIONS
- **Surface form**: as described above.
- **Root cause (instruction-induced)**: as described above.
- **Repair**: as described above.

### MC-3: JUMP-ASSUMED-TO-HAVE-NO-DERIVATIVE-AT-ALL
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

## Analogies
- **"δ is like a measuring instrument that only reports one number — the value at 0 — rather than
  a curve you could plot; asking 'what does δ look like at x=3' is the wrong kind of question
  entirely."**
- **Anti-analogy**: the weak derivative isn't a workaround or an approximation for a jump's
  "missing" derivative — it's the FULL, exact, rigorous answer, just computed by pushing the
  differentiation onto the test function instead.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the Dirac delta's direct linearity verification.
- **Demonstration 2 (targets MC-2)**: the $T_f(\varphi)=\int x^2\varphi\,dx$ ordinary-function
  embedding.
- **Demonstration 3 (targets MC-3)**: the Heaviside function's weak derivative computation,
  $H'=\delta$.

## Discovery Questions
1. "Is the Dirac delta an ordinary function that happens to be hard to describe, or a
   fundamentally different kind of mathematical object?"
2. "Is distribution theory a completely separate, disconnected framework from ordinary function
   theory?"
3. "Does a function with a jump discontinuity, like the Heaviside function, simply have no
   derivative at all, full stop?"

## Teaching Sequence
1. **Representation shift**: work the Dirac delta's linearity verification, isolating MC-1.
2. **Conflict evidence**: work the ordinary-function-embedding example, isolating MC-2.
3. **Contrast pair**: work the Heaviside weak-derivative computation, isolating MC-3.
4. **Mastery gate**: require a correct linearity verification for a distribution, a correct
   evaluation of $\delta$ on a specific test function, a correct explanation of the weak
   derivative's "shift onto the test function" mechanism, and a correct explanation of why
   $H'=\delta$ is rigorous, at the Blueprint's own stated MAMR of 3/5.

## Tutor Actions
- Never accept the Dirac delta described as an ordinary pointwise function.
- Never accept distribution theory treated as disconnected from ordinary function theory.
- Never accept a jump discontinuity described as having no derivative in any rigorous sense.

## Voice Teaching Notes
- Say "is that a pointwise function, or a functional that eats test functions?" whenever δ is
  discussed.
- Ask "does the ordinary derivative fail here, or does no derivative concept apply at all?"
  whenever a jump discontinuity's derivative is discussed.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly verifies linearity of a distribution.
- **Rung 2 (application)**: learner correctly evaluates $\delta$ on a specific test function and
  constructs $T_f$ for an ordinary function $f$.
- **Rung 3 (transfer)**: learner correctly explains why $\delta(x-\xi)$ in a Green's function
  equation is a rigorous distributional statement, not an ordinary-function equation.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the Dirac delta's linearity verification.
- If MC-2 recurs, re-walk the ordinary-function-embedding construction.
- If MC-3 recurs, re-walk the Heaviside weak-derivative computation.

## Memory Hooks
- "δ is a linear functional, never a pointwise function — asking for its value at a point other
  than via a test function is the wrong question."
- "Every ordinary function embeds as a distribution — nothing is lost."
- "The weak derivative is always defined — a jump is never a dead end for differentiation."

## Transfer Connections
- `math.fnal.dual-space-functional` (prerequisite, already authored, this campaign): supplies the
  linear-functional definition and linearity check this concept specializes to test functions.
- `math.calc.derivative-definition` (prerequisite, already authored): supplies the ordinary
  pointwise-limit derivative this concept's weak derivative is explicitly contrasted against.
- `math.de.greens-function` (already authored, cross-link): supplies the flagged concern about the
  Dirac delta's true nature and the rigorous justification for $LG=\delta(x-\xi)$ this concept
  directly resolves.

## Cross-Subject Connections
- PDE theory and signal processing: distributions are the rigorous foundation for point sources,
  impulse responses, and Green's-function-based solution methods throughout physics and
  engineering.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.fnal.distributions.md`, reused by reference
  for its three worked examples (directly resolving `math.de.greens-function`'s own flagged gap)
  and its three-misconception registry (birth types adopted directly as declared).
- Transfer probe: the Blueprint's own cross-link probe engaging `math.de.greens-function`,
  explaining the Dirac delta's true nature and why $-G''=\delta(x-\xi)$ makes rigorous
  distributional sense despite having no ordinary-function solution.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.fnal.dual-space-functional`/`math.calc.derivative-definition`, unlocks none, cross_links
  `math.de.greens-function`, research/analyze, mastery_threshold 0.6, estimated_hours 8) was
  directly verified against the live KG and matches exactly. The cross-link target is confirmed
  authored, matching the Blueprint's own cross-link-mode determination.

## Version History
- 2026-09-20 (Batch 234): authored. First entry this batch. Companion batch concept:
  `math.fnal.special-functions`.
