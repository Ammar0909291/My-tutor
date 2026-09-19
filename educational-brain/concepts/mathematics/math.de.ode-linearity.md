# math.de.ode-linearity

## Identity
- **KG id**: `math.de.ode-linearity`
- **Domain**: math.de
- **Requires**: `math.de.ode`
- **Unlocks**: `math.de.linear-first-order`, `math.de.second-order-linear`
- **Cross-links**: `math.linalg.linear-map` (already authored — verified via `ls`; genuine
  cross-link probe used, see Blueprint References)
- **Difficulty**: advanced
- **Bloom level**: understand
- **Mastery threshold**: 0.85
- **Estimated hours**: 2

## Learning Objective
Define an ODE as LINEAR if it can be written as $a_n(x)y^{(n)}+\cdots+a_1(x)y'+a_0(x)y=f(x)$ with
coefficients depending ONLY on $x$ — never on $y$ or its derivatives; identify the specific
structural features that make an ODE NONLINEAR (a product of $y$-terms, or $y$/a derivative
inside a nonlinear function); and recognize that linearity is a property of the equation's
STRUCTURE, entirely independent of how complicated the $x$-dependent coefficients look.

## Core Understanding
LINEARITY IS A PRECISE STRUCTURAL TEST, NOT A JUDGMENT OF VISUAL COMPLEXITY: reusing
`math.de.ode`'s own order vocabulary directly, an ODE is linear iff it is a linear combination
$a_n(x)y^{(n)}+\cdots+a_0(x)y=f(x)$ where each $a_i(x)$ depends ONLY on $x$, and $y,y',\dots,
y^{(n)}$ each appear to the FIRST power, unmultiplied by each other. For
$x^3y''-2xy'+\sqrt{x}\,y=e^x$: every coefficient ($x^3,-2x,\sqrt x$) depends only on $x$, and
$y,y',y''$ each appear alone to the first power — LINEAR, despite the coefficients looking
complicated.

TWO DISTINCT STRUCTURAL FAILURES DISQUALIFY LINEARITY: (1) a PRODUCT of $y$-terms — e.g. $y''+
yy'-3y=0$ fails purely because of the single $yy'$ term, however simple the rest of the equation
looks; (2) $y$ (or a derivative) appearing inside a NONLINEAR FUNCTION — e.g. $y'+\sin(y)=x$
fails because $\sin(y)$ cannot be written as (function of $x$ alone) $\times y$, even with no
product of $y$-terms present anywhere.

LINEARITY NEVER TRACKS THE COEFFICIENTS' OWN COMPLEXITY: the simple-looking $y'+y^2=0$ is
NONLINEAR purely due to the single $y^2$ term, while the visually complicated
$x^2\sin(x)y''+e^xy'-\frac1xy=\cos x$ is genuinely LINEAR — every coefficient depends only on $x$
and every $y$-term appears alone to the first power. "Looks simple" and "looks complicated" are
never valid tests; only the precise structural criterion is.

## Mental Models
- **"Linearity checks whether $y$ and its derivatives ever touch each other or a nonlinear
  function — never how messy the $x$-only coefficients happen to look."**
- **"One offending term anywhere in the equation disqualifies the whole thing — scan every term,
  not just the first one."**

## Why Students Fail

### MC-1: LINEARITY-JUDGED-BY-VISUAL-COMPLEXITY
- **Surface form**: judges whether an ODE is linear based on overall visual complexity rather
  than the precise structural criterion.
- **Birth type**: Type 3, language contamination (Blueprint's own declared Foundational severity
  — "linear" carries an everyday connotation of "simple," directly conflicting with the genuinely
  structural, complexity-independent definition).
- **Repair**: re-anchor on the precise structural test, checking coefficient dependence and each
  $y$-term's power/multiplication status, ignoring overall visual impression.

### MC-2: PRODUCT-OF-Y-AND-DERIVATIVE-OVERLOOKED
- **Surface form**: fails to notice a product term like $yy'$ or $(y')^2$ when scanning an
  equation, especially when it isn't the first term encountered.
- **Birth type**: Type 2, perceptual intuition (Blueprint's own declared Moderate severity — a
  product term embedded among several unambiguously linear terms is easy to skim past).
- **Repair**: re-scan every term systematically, confirming a single product term anywhere
  disqualifies the whole equation.

### MC-3: Y-INSIDE-NONLINEAR-FUNCTION-NOT-RECOGNIZED-AS-DISQUALIFYING
- **Surface form**: doesn't recognize that $y$ inside $\sin(y)$, $e^y$, or $\sqrt y$ disqualifies
  linearity, even without an explicit product term present.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared Moderate severity — the
  product-term criterion is often learned first and mistaken for the ONLY disqualifying
  condition).
- **Repair**: re-anchor on the second disqualifying criterion explicitly — $y$ or a derivative
  inside ANY nonlinear function.

## Misconceptions

### MC-1: LINEARITY-JUDGED-BY-VISUAL-COMPLEXITY
- **Surface form**: as described above.
- **Root cause (Type 3)**: as described above.
- **Repair**: as described above.

### MC-2: PRODUCT-OF-Y-AND-DERIVATIVE-OVERLOOKED
- **Surface form**: as described above.
- **Root cause (Type 2)**: as described above.
- **Repair**: as described above.

### MC-3: Y-INSIDE-NONLINEAR-FUNCTION-NOT-RECOGNIZED-AS-DISQUALIFYING
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Linearity is a background-check on $y$'s behavior — it doesn't care how ornate the $x$-only
  paperwork (coefficients) looks."**
- **Anti-analogy**: a "simple-looking" equation is not automatically linear — $y'+y^2=0$ fails
  from a single squared term despite its brevity.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: $x^3y''-2xy'+\sqrt x\,y=e^x$ (complicated coefficients,
  genuinely LINEAR) placed directly beside $y'+y^2=0$ (simple-looking, genuinely NONLINEAR) —
  visual complexity predicts nothing.
- **Demonstration 2 (targets MC-2)**: $y''+yy'-3y=0$ fails linearity specifically because of the
  $yy'$ product term — every other term is unambiguously linear.
- **Demonstration 3 (targets MC-3)**: $y'+\sin(y)=x$ fails linearity because $y$ sits inside
  $\sin(\cdot)$ — no product of $y$-terms is present anywhere, yet the equation is still
  nonlinear.

## Discovery Questions
1. "Between a linear ODE with complicated-looking $x$-coefficients and a simple-looking nonlinear
   one, which is actually linear?"
2. "Does scanning only the first term of an equation reliably catch every product term that could
   disqualify linearity?"
3. "Does $y$ appearing inside $\sin(y)$ disqualify linearity even if there's no product of
   $y$-terms anywhere else?"

## Teaching Sequence
1. **Anchor**: connect to `math.de.ode`'s own order/degree vocabulary, framing this concept as a
   new classification test applied to the same equations.
2. **Representation shift**: Demonstration 1's complicated-linear-versus-simple-nonlinear
   contrast, isolating MC-1 by requiring the precise structural test, never visual impression.
3. **Contrast pair**: Demonstration 2 and Demonstration 3 worked side by side as the TWO distinct
   disqualifying criteria, isolating MC-2 and MC-3 by requiring both be checked explicitly.
4. **Mastery gate**: require a correct linear/nonlinear classification for several new ODEs
   (including one with complicated coefficients and one simple-looking nonlinear case), and a
   correctly verified cross-link connection to `math.linalg.linear-map`'s own additivity
   property, at the Blueprint's own stated MAMR of 5/5 (⌈0.85×5⌉).

## Tutor Actions
- Never accept a linearity judgment based on how complicated or simple an equation looks overall.
- Never accept a "linear" classification without every term explicitly checked for products and
  nonlinear-function wrapping.

## Voice Teaching Notes
- Say "does that answer come from checking the actual structure, or from how complicated it
  looks?" whenever a linearity judgment is given.
- When a nonlinear classification is claimed, ask "which specific term is responsible — a
  product, or a nonlinear function wrapping $y$?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly classifies a new ODE as linear or nonlinear,
  independent of coefficient complexity.
- **Rung 2 (application)**: learner correctly identifies the specific disqualifying term in a
  new nonlinear ODE.
- **Rung 3 (transfer)**: learner correctly verifies that a linear ODE's operator satisfies
  additivity (matching `math.linalg.linear-map`'s own criterion) and correctly demonstrates that
  a nonlinear operator fails it, using concrete functions.

## Tutor Recovery Strategy
- If MC-1 recurs, re-anchor on the precise structural test directly.
- If MC-2 recurs, re-scan every term systematically for product terms.
- If MC-3 recurs, re-anchor on the nonlinear-function-wrapping criterion explicitly.

## Memory Hooks
- "Complicated coefficients don't make an ODE nonlinear — only y touching itself or a nonlinear
  function does."
- "Scan every term — one product term anywhere disqualifies the whole equation."
- "y inside sin, exp, or a root is just as disqualifying as a product — check both criteria."

## Transfer Connections
- `math.de.ode` (already authored, this campaign): supplies the order vocabulary and unknown
  -function framing this concept's classification test is applied to.
- `math.linalg.linear-map` (already authored, this campaign, Batch 96): supplies the
  additivity/homogeneity criterion this concept's operator $L[y]=y''-3y'+2y$ is directly verified
  against — "linear ODE" and "linear map" are the SAME underlying linearity concept, applied to
  differential operators on function spaces rather than matrices on vector spaces.
- `math.de.linear-first-order`, `math.de.second-order-linear` (not yet authored): the KG's
  declared unlocks, building solving techniques specifically for the linear case this concept
  classifies.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.de.ode-linearity.md`, reused by reference
  for its complicated-coefficient linear example, its product-term and nonlinear-function-wrapping
  contrast, and its three-misconception registry (severity levels adopted directly as declared;
  birth types independently classified since this Blueprint states Description but not a formal
  Type label).
- Transfer probe cited by reference: the Blueprint's own GENUINE cross-link probe against
  `math.linalg.linear-map` (confirmed authored via `ls`, so independence mode was NOT used) —
  verifying directly that the linear-ODE operator $L[y]=y''-3y'+2y$ satisfies additivity
  ($L[y_1+y_2]=L[y_1]+L[y_2]$, reusing $(y_1+y_2)'=y_1'+y_2'$ termwise), and that the nonlinear
  operator $N[y]=yy'$ concretely FAILS additivity for specific functions $y_1=x,y_2=x^2$ —
  making "linear ODE" and "linear map" the same underlying concept, not merely a shared word.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `math.de.ode`, unlocks
  `math.de.linear-first-order`+`math.de.second-order-linear`, cross_links
  `math.linalg.linear-map`, advanced/understand, mastery_threshold 0.85, estimated_hours 2) was
  directly verified against the live KG and matches exactly. The Blueprint's own
  correctly-declared cross-link-probe P76 mode (target confirmed authored via `ls`) required no
  correction.

## Version History
- 2026-09-18 (Batch 101): authored. First entry this batch. Companion batch concept:
  `math.de.solution-types`. `math.de` moves 2/56 → **3/56** this batch.
