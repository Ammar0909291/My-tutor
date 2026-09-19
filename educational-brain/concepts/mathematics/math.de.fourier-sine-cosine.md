# math.de.fourier-sine-cosine

## Identity
- **KG id**: `math.de.fourier-sine-cosine`
- **Domain**: math.de
- **Requires**: `math.de.fourier-series`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.8
- **Estimated hours**: 4

## Learning Objective
Choose the correct half-range expansion for $f$ on $[0,L]$ — Fourier SINE series (FSS) matching
zero-VALUE (Dirichlet) boundary conditions, Fourier COSINE series (FCS) matching zero-DERIVATIVE
(Neumann) boundary conditions — by reading the PDE's boundary conditions FIRST, never guessing;
compute half-range coefficients with the correct $2/L$ factor (never the full-range $1/L$); and
recognize the FCS constant term $a_0/2$ CAN be zero (never assumed automatically nonzero) since it
equals twice $f$'s average value on $[0,L]$.

## Core Understanding
THE HALF-RANGE FACTOR IS $2/L$, NEVER THE FULL-RANGE $1/L$ — BECAUSE INTEGRATION HAPPENS OVER HALF
THE INTERVAL: the full Fourier series on $[-L,L]$ uses $a_n=\frac1L\int_{-L}^Lf\cos\frac{n\pi
x}{L}\,dx$ (normalizing over a length-$2L$ interval). The half-range cosine series on $[0,L]$ uses
$a_n=\frac2L\int_0^Lf\cos\frac{n\pi x}{L}\,dx$ — SAME form, but the factor DOUBLES to $2/L$ to
compensate for integrating over only half the interval. Copying the full-range $1/L$ factor to a
half-range problem is a persistent, purely mechanical error, never a conceptual one — the fix is
recognizing which interval length the specific formula was normalized against.

THE BOUNDARY CONDITION DICTATES THE SERIES CHOICE — READ THE PDE'S BCs FIRST, NEVER GUESS FROM THE
LABEL: $\sin(n\pi x/L)=0$ at BOTH $x=0$ and $x=L$ for every $n$ — so the FSS represents functions
vanishing at both endpoints (DIRICHLET BCs, $u=0$). Meanwhile $\frac{d}{dx}\cos(n\pi x/L)=0$ at
both endpoints for every $n$ — so the FCS represents functions with zero DERIVATIVE at both
endpoints (NEUMANN BCs, $u_x=0$). For the heat equation with Dirichlet BCs $u(0,t)=u(L,t)=0$: the
correct expansion is $u(x,t)=\sum b_n(t)\sin(n\pi x/L)$, giving $b_n(t)=b_n(0)e^{-k(n\pi/L)^2t}$.
For Neumann BCs $u_x(0,t)=u_x(L,t)=0$ (insulated ends): the correct expansion is $u(x,t)=
\frac{a_0}{2}+\sum a_n(t)\cos(n\pi x/L)$, with $a_0'(t)=0$ — the constant term (total heat) is
CONSERVED, a direct physical consequence of insulation, never a coincidence.

$a_0$ CAN GENUINELY BE ZERO — NEVER ASSUMED AUTOMATICALLY NONZERO: $a_0=\frac2L\int_0^Lf(x)\,dx$
is TWICE $f$'s average value on $[0,L]$. For $f(x)=\cos(\pi x)$ on $[0,1]$:
$\int_0^1\cos(\pi x)\,dx=0$, giving $a_0=0$ — the cosine series here has NO constant term at all,
despite $a_0$ "usually" being nonzero in textbook examples. Whether $a_0$ vanishes depends entirely
on $f$'s actual average value, never on some default assumption about cosine series.

## Mental Models
- **"The half-range factor is 2/L because you're integrating over half the interval — the full
  Fourier series' 1/L doubles to compensate."**
- **"Sine has zero VALUE at the endpoints (Dirichlet); cosine has zero DERIVATIVE at the endpoints
  (Neumann) — the boundary condition, read first, tells you which series to use."**
- **"a₀ is twice the average value of f — it can genuinely be zero, just like any average can."**

## Why Students Fail

### MC-1: FULL-FOURIER-FORMULA-USED-ON-HALF-INTERVAL
- **Surface form**: uses the full Fourier series formulas (with the $1/L$ factor, integrating over
  $[-L,L]$) for a function defined only on $[0,L]$, getting wrong coefficients and non-matching
  boundary behavior.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared birth type — the full
  Fourier series on $[-L,L]$ is taught first, and students copy the formula to the half-interval
  without registering that both the integration limits and the normalization factor change).
- **Repair**: re-walk the coefficient-comparison table contrasting the full-range $1/L$ formula
  against the half-range $2/L$ formula.

### MC-2: SINE-SERIES-FOR-ZERO-DERIVATIVE-BC
- **Surface form**: uses a Fourier sine series for a PDE with Neumann (zero-derivative) BCs and
  vice versa, without connecting the series choice to the boundary condition actually satisfied.
- **Birth type**: Type 3, language contamination (Blueprint's own declared birth type — "sine" and
  "cosine" sound like arbitrary labels, obscuring that sine's zero VALUE at endpoints matches
  Dirichlet BCs while cosine's zero DERIVATIVE at endpoints matches Neumann BCs).
- **Repair**: re-walk the explicit BC-to-series matching rule, checking $\sin$ and $\cos$'s
  endpoint behavior directly.

### MC-3: COSINE-SERIES-ALWAYS-HAS-NONZERO-AVERAGE
- **Surface form**: assumes the FCS constant term $a_0/2$ is always nonzero, missing that it can
  vanish when $f$'s average value on $[0,L]$ is zero.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared birth type — standard
  textbook cosine-series examples have $a_0\ne0$, and students don't connect $a_0$ to $f$'s
  average value, which can genuinely be zero).
- **Repair**: re-derive $a_0=0$ directly for $f(x)=\cos(\pi x)$ on $[0,1]$.

## Misconceptions

### MC-1: FULL-FOURIER-FORMULA-USED-ON-HALF-INTERVAL
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-2: SINE-SERIES-FOR-ZERO-DERIVATIVE-BC
- **Surface form**: as described above.
- **Root cause (Type 3)**: as described above.
- **Repair**: as described above.

### MC-3: COSINE-SERIES-ALWAYS-HAS-NONZERO-AVERAGE
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

## Analogies
- **"FSS and FCS are two different mirrors held up to f — the odd-extension mirror produces pure
  sines, the even-extension mirror produces pure cosines, and the boundary condition tells you
  which mirror the physics actually demands."**
- **Anti-analogy**: the FCS constant term is NOT a guaranteed nonzero baseline — it's just twice an
  average value, and averages can be exactly zero.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the coefficient-comparison table contrasting full-range
  $1/L$ against half-range $2/L$ formulas.
- **Demonstration 2 (targets MC-2)**: the heat equation solved with Dirichlet BCs (FSS) versus
  Neumann BCs (FCS), showing the BC-to-series correspondence directly from endpoint behavior.
- **Demonstration 3 (targets MC-3)**: the direct $a_0=0$ computation for $f(x)=\cos(\pi x)$ on
  $[0,1]$.

## Discovery Questions
1. "For a function defined only on [0,L], does the coefficient formula use the same 1/L factor as
   the full Fourier series on [-L,L], or does something change?"
2. "Does sin(nπx/L) vanish at the endpoints, or does its derivative vanish there — and which
   boundary condition does that match?"
3. "Is the constant term a₀/2 of a Fourier cosine series always nonzero, or can it be zero?"

## Teaching Sequence
1. **Representation shift**: half-range sine and cosine series and the odd/even extension
   correspondence, working Demonstration 1, isolating MC-1.
2. **Pattern induction**: the boundary-condition matching rule applied to the heat equation,
   working Demonstration 2, isolating MC-2.
3. **Contrast pair**: the genuinely-zero $a_0$ case, working Demonstration 3, isolating MC-3.
4. **Mastery gate**: require a correct half-range coefficient computation with the $2/L$ factor, a
   correct BC-to-series matching for a given PDE, and a correct recognition of when $a_0=0$, at the
   Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept a half-range coefficient computed with the full-range $1/L$ factor.
- Never accept an FSS or FCS chosen without first reading the PDE's actual boundary conditions.
- Never accept $a_0$ assumed nonzero without checking $f$'s actual average value.

## Voice Teaching Notes
- Say "are you integrating over the full interval or just half of it — which factor does that
  require?" whenever half-range coefficients are set up.
- Before choosing FSS or FCS, ask "what are this PDE's actual boundary conditions — zero value or
  zero derivative?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly identifies the half-range $2/L$ factor and the
  odd/even extension correspondence.
- **Rung 2 (application)**: learner correctly matches Dirichlet BCs to FSS and Neumann BCs to FCS
  for a given heat equation problem.
- **Rung 3 (transfer)**: learner correctly recognizes and computes a genuinely zero $a_0$ case, and
  solves a full boundary value problem using the appropriate half-range expansion.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the coefficient-comparison table.
- If MC-2 recurs, re-walk the BC-to-series endpoint-behavior matching rule.
- If MC-3 recurs, re-derive $a_0$ directly from $f$'s average value.

## Memory Hooks
- "Half-range coefficients use 2/L, not 1/L — you're only integrating over half the interval."
- "Sine zeroes at the endpoints matches zero-value BCs; cosine's zero derivative matches
  zero-derivative BCs."
- "a₀ is twice the average value of f — it can genuinely be zero."

## Transfer Connections
- `math.de.fourier-series` (already authored, this campaign, Batch 163): supplies the full-range
  series, coefficient-orthogonality mechanism, and symmetry-shortcut framework this concept
  specializes to half-range odd and even extensions.
- `math.de.fourier-convergence` (authored earlier this same batch): supplies the general Fourier
  convergence framework this concept's half-range series also obeys (Dirichlet's theorem, Gibbs
  phenomenon at any jump in the extended function).

## Cross-Subject Connections
- Signal processing: the discrete cosine transform (DCT, used in JPEG compression) as the digital
  analogue of the Fourier cosine series.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.de.fourier-sine-cosine.md`, reused by
  reference for its FSS/FCS worked examples, its heat-equation Dirichlet/Neumann BC applications,
  and its three-misconception registry (birth types adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe (cross_links = []), connecting
  half-range series to discrete sine/cosine transforms and the Gibbs phenomenon's algebraic
  overshoot limit.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.de.fourier-series`, unlocks none, cross_links none, expert/apply, mastery_threshold 0.8,
  estimated_hours 4) was directly verified against the live KG and matches exactly.

## Version History
- 2026-09-19 (Batch 164): authored. Second entry this batch. Companion batch concept:
  `math.de.fourier-convergence`.
