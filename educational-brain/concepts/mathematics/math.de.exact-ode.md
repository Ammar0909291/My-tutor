# math.de.exact-ode

## Identity
- **KG id**: `math.de.exact-ode`
- **Domain**: math.de
- **Requires**: `math.de.first-order-ode`, `math.calc.partial-derivatives`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: advanced
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 5

## Learning Objective
Identify when $M(x,y)dx+N(x,y)dy=0$ is EXACT by checking $\partial M/\partial y=\partial N/\partial
x$ (equal to EACH OTHER, never both required to be zero); find the potential function $F(x,y)$
via successive integration, correctly treating the "constant" from integrating $M$ in $x$ as an
ARBITRARY FUNCTION $g(y)$ (never a true constant), determined from $\partial F/\partial y=N$;
write the general solution $F(x,y)=C$; and when not exact, find an integrating factor $\mu(x)$ or
$\mu(y)$, recognizing this SIMPLE form does not always exist.

## Core Understanding
EXACTNESS MEANS THE TWO MIXED PARTIALS EQUAL EACH OTHER — NEVER THAT EACH EQUALS ZERO: for
$(2xy+y^2)dx+(x^2+2xy)dy=0$: $\partial M/\partial y=2x+2y$ and $\partial N/\partial x=2x+2y$ — EQUAL
to each other (neither is zero) — confirming exactness. "Exact" in everyday language suggests
precision or zero-error, but the mathematical test is an EQUALITY between the two partials, not a
requirement that either vanish.

THE "CONSTANT" FROM PARTIAL INTEGRATION IS ACTUALLY A FUNCTION OF THE OTHER VARIABLE, NEVER A TRUE
NUMBER: integrating $M=2xy+y^2$ with respect to $x$ (treating $y$ as fixed) gives
$F=x^2y+xy^2+g(y)$ — where $g(y)$ is an UNKNOWN FUNCTION of $y$, not simply "$+C$". Differentiating
$\partial F/\partial y=x^2+2xy+g'(y)$ and setting it equal to $N=x^2+2xy$ gives $g'(y)=0$, so
$g$ happens to be a true constant HERE — but this must be VERIFIED each time by differentiating
and solving for $g'(y)$, never assumed.

A SIMPLE $\mu(x)$-OR-$\mu(y)$ INTEGRATING FACTOR DOES NOT ALWAYS EXIST FOR A NON-EXACT ODE: for
$ydx-xdy=0$: $\partial M/\partial y=1$, $\partial N/\partial x=-1$ — not exact. Testing
$\mu(x)$: $(\partial M/\partial y-\partial N/\partial x)/N=(1-(-1))/(-x)=-2/x$, a function of $x$
ALONE — so $\mu=e^{\int-2/x\,dx}=1/x^2$ works here. But this test can FAIL for both $\mu(x)$ and
$\mu(y)$ simultaneously — in that case an integrating factor may depend on BOTH $x$ and $y$,
requiring a PDE to find (harder than the original ODE) — textbook problems are specifically chosen
so a simple $\mu(x)$ or $\mu(y)$ works, never guaranteed in general.

## Mental Models
- **"Exactness is an equality test between two partial derivatives — never a zero test on
  either."**
- **"Integrating a partial-x expression leaves behind an unknown FUNCTION of y, not a number —
  always solve for it using the other equation."**

## Why Students Fail

### MC-1: EXACT-MEANS-BOTH-PARTIALS-EQUAL-ZERO
- **Surface form**: thinks exactness means $\partial M/\partial y=0$ AND $\partial N/\partial x=0$,
  rather than the two being equal to each other.
- **Birth type**: Type 3, language contamination (Blueprint's own declared birth type — "exact" in
  everyday language means precise or zero-error, confused with the mathematical equality test).
- **Repair**: re-verify the exactness test on $(2xy+y^2)dx+(x^2+2xy)dy=0$, where both partials are
  $2x+2y$, genuinely nonzero yet equal.

### MC-2: FORGETTING-THE-FUNCTION-OF-Y-IN-INTEGRATION
- **Surface form**: integrates $M$ with respect to $x$ to get $F=\int M\,dx$, then writes $g(y)=0$
  without actually determining $g(y)$ from $\partial F/\partial y=N$.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared birth type — ordinary
  single-variable integration produces a constant $+C$, and students apply the same idea to
  partial integration, treating the "constant" as a number rather than a function of $y$).
- **Repair**: re-walk the $g'(y)=e^y$ example, showing the "constant" is genuinely a
  non-trivial function requiring its own integration.

### MC-3: INTEGRATING-FACTOR-ALWAYS-EXISTS-EASILY
- **Surface form**: assumes every non-exact ODE can be made exact by a simple $\mu(x)$ or
  $\mu(y)$ integrating factor.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared birth type — textbook
  problems are deliberately chosen so $\mu(x)$ or $\mu(y)$ always works, leading students to assume
  this always holds).
- **Repair**: re-verify both the $\mu(x)$ and $\mu(y)$ tests explicitly, and acknowledge that when
  both fail, a different solution method (linear, Bernoulli, homogeneous) should be tried instead.

## Misconceptions

### MC-1: EXACT-MEANS-BOTH-PARTIALS-EQUAL-ZERO
- **Surface form**: as described above.
- **Root cause (Type 3)**: as described above.
- **Repair**: as described above.

### MC-2: FORGETTING-THE-FUNCTION-OF-Y-IN-INTEGRATION
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-3: INTEGRATING-FACTOR-ALWAYS-EXISTS-EASILY
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

## Analogies
- **"An exact ODE is a gradient field in disguise — M dx + N dy = 0 is really dF = 0 for some
  potential F, and solving it just means finding that hidden potential."**
- **Anti-analogy**: the "constant" left after partial integration is NOT a leftover number to
  discard — it's a placeholder function waiting to be pinned down by the other equation.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the $(2xy+y^2)dx+(x^2+2xy)dy=0$ exactness check, both
  partials equal to the nonzero $2x+2y$.
- **Demonstration 2 (targets MC-2)**: the $g'(y)=e^y$ example, where the "constant" is genuinely a
  function requiring integration.
- **Demonstration 3 (targets MC-3)**: the $ydx-xdy=0$ integrating-factor derivation, with an
  explicit note that both $\mu(x)$ and $\mu(y)$ tests can fail simultaneously in general.

## Discovery Questions
1. "Does exactness mean ∂M/∂y and ∂N/∂x are both zero, or that they equal each other?"
2. "After integrating M with respect to x, is the 'g(y)' term a true constant, or a function that
   still needs to be determined?"
3. "Does an integrating factor of the simple form μ(x) or μ(y) always exist for a non-exact ODE?"

## Teaching Sequence
1. **Representation shift**: the exactness test and potential-function method, working
   Demonstration 1, isolating MC-1.
2. **Pattern induction**: the full successive-integration method with $g(y)$ determination, working
   Demonstration 2, isolating MC-2.
3. **Contrast pair**: the integrating-factor tests and their limitations, working Demonstration 3,
   isolating MC-3.
4. **Mastery gate**: require a correct exactness check, a correct potential-function derivation
   with $g(y)$ genuinely determined (not assumed zero), and a correct integrating-factor
   derivation for a non-exact ODE, at the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept exactness verified by checking either partial equals zero, rather than the two
  partials equaling each other.
- Never accept $g(y)$ assumed to be zero or a true constant without deriving it from
  $\partial F/\partial y=N$.
- Never accept a claim that a simple $\mu(x)$ or $\mu(y)$ integrating factor always exists for a
  non-exact ODE.

## Voice Teaching Notes
- Say "are those two partials equal to each other, or are you checking if either is zero?"
  whenever exactness is tested.
- After partial integration, ask "have you actually determined g(y), or just assumed it's zero?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly tests exactness via the equality of mixed partials.
- **Rung 2 (application)**: learner correctly finds the potential function $F$, genuinely
  determining $g(y)$ rather than assuming it vanishes.
- **Rung 3 (transfer)**: learner correctly finds a $\mu(x)$ or $\mu(y)$ integrating factor for a
  non-exact ODE, and recognizes when neither simple form applies.

## Tutor Recovery Strategy
- If MC-1 recurs, re-verify the exactness test on a nonzero-but-equal-partials example.
- If MC-2 recurs, re-walk the $g'(y)=e^y$ determination.
- If MC-3 recurs, re-verify both integrating-factor tests explicitly on a non-exact ODE.

## Memory Hooks
- "Exact means the two partials equal each other — not that either is zero."
- "The leftover term after partial integration is a function of the other variable — never assume
  it's zero."
- "A simple μ(x) or μ(y) integrating factor isn't guaranteed — always verify the test conditions."

## Transfer Connections
- `math.de.first-order-ode` (already authored, certified domain): supplies the first-order ODE
  framework this concept's exactness test and potential-function method specialize.
- `math.calc.partial-derivatives` (already authored, certified domain): supplies the mixed-partial
  machinery underlying the exactness test and the successive-integration method.
- `math.de.linear-first-order` (already authored, this campaign, Batch 147): the KG's declared
  related concept, whose integrating factor is recovered as a special case of the exact-ODE
  integrating-factor framework.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.de.exact-ode.md`, reused by reference for its
  exactness-test worked example, its potential-function derivation, its integrating-factor
  derivation for $ydx-xdy=0$, and its three-misconception registry (birth types adopted directly
  as declared).
- Transfer probe: the Blueprint's own independence-mode probe, connecting exact ODEs to
  conservative vector fields, Green's theorem, and the Poincaré lemma on non-simply-connected
  domains.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.de.first-order-ode`/`math.calc.partial-derivatives`, unlocks none, cross_links none,
  advanced/apply, mastery_threshold 0.85, estimated_hours 5) was directly verified against the
  live KG and matches exactly.

## Version History
- 2026-09-19 (Batch 148): authored. First entry this batch. Companion batch concept:
  `math.de.homogeneous-ode`.
