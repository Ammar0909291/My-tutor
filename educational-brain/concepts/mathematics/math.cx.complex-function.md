# math.cx.complex-function

## Identity
- **KG id**: `math.cx.complex-function`
- **Domain**: math.cx
- **Requires**: `math.cx.complex-numbers-analysis`, `math.func.function-concept`
- **Unlocks**: `math.cx.cauchy-riemann`, `math.cx.analytic-functions`
- **Cross-links**: none
- **Difficulty**: advanced
- **Bloom level**: understand
- **Mastery threshold**: 0.9
- **Estimated hours**: 3

## Learning Objective
Write $f(z)=u(x,y)+iv(x,y)$ with BOTH $u,v$ depending on BOTH $x$ AND $y$ — NEVER as separate
single-variable functions $u(x)+iv(y)$; verify a complex limit requires agreement along EVERY
path in the plane — NEVER just the real and imaginary axes; and recognize joint continuity of
$u,v$ in $(x,y)$ — NEVER separate continuity in $x$ and $y$ individually.

## Core Understanding
BOTH $u$ AND $v$ DEPEND ON BOTH $x$ AND $y$ — NEVER $u(x)+iv(y)$ AS SEPARATE SINGLE-VARIABLE
TRACKS: for $f(z)=z^2$: $f(1+i)=(1+i)^2=2i$, so $u(1,1)=0,v(1,1)=2$; but $u(x,y)=x^2-y^2$ and
$v(x,y)=2xy$ — checking $u(2,2)=0\neq u(2,1)=3$ (same $x=2$, different $y$) shows $u$ genuinely
depends on $y$ too. Writing $f(x+iy)=u(x)+iv(y)$, treating the components as functions of one
variable each, is WRONG — $z=x+iy$ specifies a 2D point $(x,y)$, and $f$ maps it to another 2D
point $(u,v)$; both are height functions over the ENTIRE 2D input plane, generally depending on
both coordinates jointly.

A COMPLEX LIMIT REQUIRES AGREEMENT ALONG EVERY PATH — NEVER JUST TWO AXES: for
$g(z)=x^2/(x^2+y^2)$ approaching $z_0=0$: along $y=0$, $g=x^2/x^2=1$; along $x=0$,
$g=0/y^2=0$ — two paths give DIFFERENT values, so $\lim_{z\to0}g(z)$ does NOT exist. Checking only
the real and imaginary axes and concluding a complex limit exists is WRONG — in $\mathbb{C}\cong
\mathbb{R}^2$ there are INFINITELY many approach paths (straight lines at every angle, parabolas,
spirals); a single pair of disagreeing paths is enough to prove non-existence, but agreement on a
few paths never proves existence — some untried path might disagree.

CONTINUITY REQUIRES JOINT CONTINUITY OF $u,v$ IN $(x,y)$ — NEVER SEPARATE CONTINUITY IN $x$ AND
$y$ ALONE: for $u(x,y)=xy/(x^2+y^2)$ (with $u(0,0)=0$): fixing $y=0$, $u(x,0)=0$ for all $x$ —
continuous in $x$; fixing $x=0$, $u(0,y)=0$ for all $y$ — continuous in $y$. But along $y=x$,
$u(x,x)=x^2/(2x^2)=1/2\neq u(0,0)=0$ — separate continuity holds, yet $u$ is NOT jointly continuous
at $(0,0)$. Believing $f$ is continuous at $z_0$ if $u$ is continuous in $x$ (with $y$ fixed) and
$v$ is continuous in $y$ (with $x$ fixed) SEPARATELY is WRONG — complex continuity requires
$\lim_{z\to z_0}f(z)=f(z_0)$ along EVERY 2D path, which is a strictly stronger, JOINT condition.

## Mental Models
- **"z=x+iy is a point in a 2D plane — u and v are height functions over that whole plane, not
  separate tracks depending on x or y alone."**
- **"A real limit needs only left and right to agree; a complex limit needs EVERY path in the
  plane to agree — infinitely many, not just the two axes."**
- **"Separate continuity along each axis is necessary but never sufficient — joint continuity
  demands agreement along every path simultaneously."**

## Why Students Fail

### MC-1: COMPONENT-INDEXED-WRONG
- **Surface form**: writes $f(x+iy)=u(x)+iv(y)$: each component depends only on one real
  variable.
- **Birth type**: procedural slip (Blueprint's own declared foundational severity — the notation
  $z=x+iy$ visually separates $x$ and $y$, inviting the assumption that $u$ and $v$ each track
  only one).
- **Repair**: compute a concrete example (e.g. $f(z)=z^2$ at multiple points) and show that
  changing $y$ alone changes $u$.

### MC-2: REAL-AXIS-SUFFICES-FOR-LIMIT
- **Surface form**: checks the limit along $y=0$ and $x=0$ only, concludes the complex limit
  exists from those two paths alone.
- **Birth type**: overgeneralization (Blueprint's own declared birth type — the 1D real-limit
  intuition of "check both directions" is overgeneralized to the 2D case).
- **Repair**: exhibit a path-dependence failure example, showing two axes agreeing is not enough
  to establish a complex limit.

### MC-3: CONTINUITY-SEPARATED
- **Surface form**: believes $f$ is continuous at $z_0$ if $u$ is continuous in $x$ (with $y$
  fixed) and $v$ is continuous in $y$ (with $x$ fixed); misses the joint $(x,y)$ requirement.
- **Birth type**: overgeneralization (Blueprint's own declared birth type — 1D continuity
  knowledge is naturally but incorrectly extended axis-by-axis).
- **Repair**: exhibit a function separately continuous along each axis but not jointly continuous
  along a diagonal path.

## Misconceptions

### MC-1: COMPONENT-INDEXED-WRONG
- **Surface form**: as described above.
- **Root cause (procedural slip)**: as described above.
- **Repair**: as described above.

### MC-2: REAL-AXIS-SUFFICES-FOR-LIMIT
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

### MC-3: CONTINUITY-SEPARATED
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

## Analogies
- **"u and v are like two topographic maps of the same terrain — the height at any point depends
  on both coordinates, never just one."**
- **Anti-analogy**: a complex limit isn't a 1D "check both sides" exercise scaled up slightly —
  it's an infinite-path requirement, genuinely harder in kind, not just in degree.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the $f(z)=z^2$ table showing $u,v$ depend jointly on
  $(x,y)$.
- **Demonstration 2 (targets MC-2)**: the $g(z)=x^2/(x^2+y^2)$ path-dependence failure.
- **Demonstration 3 (targets MC-3)**: the $u(x,y)=xy/(x^2+y^2)$ separate-but-not-joint-continuity
  example.

## Discovery Questions
1. "For f(z)=z², does the real part u depend only on x, or on both x and y?"
2. "If a limit agrees along the real axis and the imaginary axis, does the complex limit exist?"
3. "If u is continuous in x with y fixed, and continuous in y with x fixed, is f jointly
   continuous?"

## Teaching Sequence
1. **Representation shift**: compute $f(z)=z^2$ concretely, build the $(x,y)\to(u,v)$ table,
   state the general decomposition, isolating MC-1.
2. **Contrast pair**: contrast 1D real limits against 2D complex limits, work the path-dependence
   failure example, isolating MC-2; then the separate-vs-joint continuity example, isolating MC-3.
3. **Mastery gate**: require correct $u,v$ extraction for a given $f(z)$, a correct
   multi-path limit investigation, and a correct explanation of why a real-axis oscillation alone
   can rule out continuity, at the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept $u,v$ extracted as separate single-variable functions of $x$ or $y$ alone.
- Never accept a complex limit concluded to exist from only the real and imaginary axes.
- Never accept continuity established from separate axis-continuity alone.

## Voice Teaching Notes
- Say "does that component actually depend on both x and y, or did you only check one?" whenever
  $u,v$ are extracted.
- Ask "have you tried a diagonal or curved path, not just the axes?" whenever a complex limit is
  investigated.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly extracts $u(x,y)$ and $v(x,y)$ for a given complex
  function.
- **Rung 2 (application)**: learner correctly investigates a limit along multiple paths and
  determines existence or non-existence.
- **Rung 3 (transfer)**: learner correctly determines whether a function is purely real- or
  imaginary-valued and investigates a ratio limit along several paths.

## Tutor Recovery Strategy
- If MC-1 recurs, recompute the concrete $f(z)=z^2$ table, showing $u$ changes with $y$ alone.
- If MC-2 recurs, re-walk the two-axes-disagree path-dependence example.
- If MC-3 recurs, re-walk the separate-continuity-but-not-joint-continuity example.

## Memory Hooks
- "u and v are joint functions of (x,y) — never separate single-variable tracks."
- "A complex limit needs every path to agree — two axes are never enough to prove existence."
- "Joint continuity beats separate continuity — check a diagonal path before trusting the axes."

## Transfer Connections
- `math.cx.complex-numbers-analysis` (prerequisite, already authored, this campaign): supplies the
  modulus, conjugate, and exponential form this concept's function framework builds on.
- `math.func.function-concept` (prerequisite, already authored): supplies the $f:A\to B$
  domain/codomain framework this concept specializes to $f:\mathbb{C}\to\mathbb{C}$.

## Cross-Subject Connections
- Fluid dynamics and electromagnetism: complex potential functions model 2D flow and field
  problems, with $u,v$'s joint dependence on $(x,y)$ directly encoding streamlines and equipotential
  curves.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.cx.complex-function.md`, reused by reference
  for its concrete $f(z)=z^2$ table, its path-dependence and separate/joint-continuity contrasts,
  and its three-misconception registry (birth types adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe on $f(z)=z^2-\bar z^2$, determining
  whether it is real- or imaginary-valued and investigating a ratio limit along multiple paths.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.cx.complex-numbers-analysis`/`math.func.function-concept`, unlocks
  `math.cx.cauchy-riemann`/`math.cx.analytic-functions`, cross_links none, advanced/understand,
  mastery_threshold 0.9, estimated_hours 3) was directly verified against the live KG and matches
  exactly.

## Version History
- 2026-09-20 (Batch 236): authored. First entry this batch. Companion batch concept:
  `math.opt.semidefinite-programming`.
