# math.de.eigenfunction-expansion

## Identity
- **KG id**: `math.de.eigenfunction-expansion`
- **Domain**: math.de
- **Requires**: `math.de.sturm-liouville`
- **Unlocks**: none
- **Cross-links**: `math.fnal.hilbert-space` (Blueprint's own Component 7 claimed this concept
  authored — this checked the wrong corpus; the EDUCATIONAL-BRAIN corpus does NOT yet have this
  concept authored — corrected to independence mode, see Curriculum Feedback)
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.7
- **Estimated hours**: 6 (Blueprint's own Component 0 stated `7` — the live KG's current value
  used as authoritative, see Curriculum Feedback)

## Learning Objective
Compute expansion coefficients $c_n=\langle f,\varphi_n\rangle/\langle\varphi_n,\varphi_n\rangle$
as a DIRECT consequence of Sturm-Liouville's own eigenfunction orthogonality — the SAME projection
idea as decomposing a vector along orthogonal axes, applied to functions; recognize ordinary
FOURIER SERIES as the SPECIAL CASE where the Sturm-Liouville problem is the simplest one (never a
separate, unrelated technique); and recognize (orientation level) that the expansion's genuine
CONVERGENCE relies on Hilbert-space completeness, the SAME guarantee regardless of which specific
system (Fourier, Legendre, Bessel) is used.

## Core Understanding
THE COEFFICIENT FORMULA IS ORTHOGONAL PROJECTION — NEVER AN INDEPENDENTLY MEMORIZED FORMULA:
taking the inner product of $f=\sum_mc_m\varphi_m$ with $\varphi_n$: by orthogonality,
$\langle f,\varphi_n\rangle=\sum_mc_m\langle\varphi_m,\varphi_n\rangle=c_n\langle\varphi_n,
\varphi_n\rangle$ (every term but $m=n$ vanishes) — directly giving
$c_n=\langle f,\varphi_n\rangle/\langle\varphi_n,\varphi_n\rangle$. For $f(x)=x$ on $[0,\pi]$ with
$\varphi_n=\sin(nx)$: $\langle\varphi_n,\varphi_n\rangle=\pi/2$, $\langle f,\varphi_n\rangle=
(-1)^{n+1}\pi/n$, giving $c_n=2(-1)^{n+1}/n$ — the identical "project, divide by squared length"
procedure already used for finite-dimensional vectors.

FOURIER SERIES IS THIS EXPANSION SPECIALIZED TO THE SIMPLEST SYSTEM — NEVER A SEPARATE
TECHNIQUE: the classical Fourier sine series arises from the simplest Sturm-Liouville problem
($y''+\lambda y=0,y(0)=y(L)=0$, $w=1$, eigenfunctions $\sin(n\pi x/L)$). The result
$x=\sum_{n=1}^\infty\frac{2(-1)^{n+1}}{n}\sin(nx)$ IS the standard Fourier sine series for
$f(x)=x$ — not a coincidental resemblance; Fourier series IS this general formula, applied to the
simplest Sturm-Liouville system.

CONVERGENCE RELIES ON HILBERT-SPACE COMPLETENESS — THE SAME GUARANTEE FOR EVERY SYSTEM, NEVER
SYSTEM-SPECIFIC: whether expanding in Fourier sines OR Legendre polynomials, genuine convergence
(not merely a formal series) requires $\{\varphi_n\}$ to form a COMPLETE orthogonal set — exactly
the Hilbert-space orthonormal-basis property. This is the SAME underlying guarantee regardless of
which specific system (Fourier, Legendre, Bessel) is being used, never a coincidence unique to any
one system.

## Mental Models
- **"Expansion coefficients come from projecting onto each eigenfunction and dividing by its own
  squared length — the exact same procedure as decomposing a vector along orthogonal axes."**
- **"Fourier series isn't a separate subject — it's the simplest possible instance of this general
  eigenfunction expansion."**

## Why Students Fail

### MC-1: COEFFICIENT-FORMULA-ASSUMED-INDEPENDENT-FACT
- **Surface form**: believes the coefficient formula is an independently memorized formula,
  unrelated to orthogonality.
- **Birth type**: Foundational severity (Blueprint's own declared severity — the formula is often
  presented as a rule to memorize rather than derived).
- **Repair**: re-walk the direct orthogonality-based derivation of $c_n$.

### MC-2: FOURIER-SERIES-ASSUMED-SEPARATE-TECHNIQUE
- **Surface form**: believes Fourier series is an unrelated, separate technique from
  Sturm-Liouville eigenfunction expansion.
- **Birth type**: High severity (Blueprint's own declared severity — Fourier series is typically
  learned before, and separately from, general Sturm-Liouville theory).
- **Repair**: re-walk the exact-match identification between the general formula and the familiar
  Fourier sine coefficient formula.

### MC-3: CONVERGENCE-ASSUMED-SYSTEM-SPECIFIC
- **Surface form**: believes convergence depends on properties unique to each specific
  Sturm-Liouville system.
- **Birth type**: Moderate severity (Blueprint's own declared severity — each system's specific
  eigenfunctions look different, obscuring the shared underlying guarantee).
- **Repair**: re-walk the Fourier-versus-Legendre completeness parallel.

## Misconceptions

### MC-1: COEFFICIENT-FORMULA-ASSUMED-INDEPENDENT-FACT
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: FOURIER-SERIES-ASSUMED-SEPARATE-TECHNIQUE
- **Surface form**: as described above.
- **Root cause (High)**: as described above.
- **Repair**: as described above.

### MC-3: CONVERGENCE-ASSUMED-SYSTEM-SPECIFIC
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Expanding a function in eigenfunctions is decomposing it along infinitely many orthogonal
  axes — the same projection formula, just applied to a function instead of a finite vector."**
- **Anti-analogy**: Fourier series is NOT a separate, prior subject unrelated to Sturm-Liouville
  theory — it's the simplest possible case of the same general expansion.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the direct orthogonal-projection derivation of $c_n$ for
  $f(x)=x$.
- **Demonstration 2 (targets MC-2)**: the exact match between the general formula and the
  standard Fourier sine series.
- **Demonstration 3 (targets MC-3)**: the Fourier-versus-Legendre-polynomial completeness
  parallel.

## Discovery Questions
1. "Is the coefficient formula cₙ = ⟨f,φₙ⟩/⟨φₙ,φₙ⟩ an independently memorized formula, or does it
   follow directly from orthogonality?"
2. "Is ordinary Fourier series an unrelated, separate technique from Sturm-Liouville eigenfunction
   expansion?"
3. "Does convergence of an eigenfunction expansion depend on properties unique to each specific
   system, or on one shared guarantee?"

## Teaching Sequence
1. **Representation shift**: the orthogonal-projection derivation, working Demonstration 1,
   isolating MC-1.
2. **Conflict evidence**: the exact-match Fourier-series identification, working Demonstration 2,
   isolating MC-2.
3. **Contrast pair**: the shared Hilbert-space completeness guarantee, working Demonstration 3,
   isolating MC-3.
4. **Mastery gate**: require a correct coefficient derivation citing orthogonality, a correct
   identification of Fourier series as a special case, and a correct explanation of the role of
   Hilbert-space completeness in convergence, at the Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept the coefficient formula stated without deriving it from orthogonality.
- Never accept Fourier series described as unrelated to Sturm-Liouville eigenfunction expansion.
- Never accept convergence described as depending on properties unique to a specific system
  rather than the shared Hilbert-space completeness guarantee.

## Voice Teaching Notes
- Say "where does that coefficient formula actually come from?" whenever an eigenfunction
  expansion is computed.
- When Fourier series is mentioned, ask "which Sturm-Liouville problem is this the simplest case
  of?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly derives the coefficient formula from orthogonality.
- **Rung 2 (application)**: learner correctly identifies a Fourier cosine series as another
  special case, citing the underlying boundary conditions.
- **Rung 3 (transfer)**: learner correctly computes an expansion coefficient for a non-constant-
  weight Sturm-Liouville system and explains why convergence still holds via Hilbert-space
  completeness.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the orthogonal-projection derivation.
- If MC-2 recurs, re-walk the exact-match Fourier-series identification.
- If MC-3 recurs, re-walk the Fourier-versus-Legendre completeness parallel.

## Memory Hooks
- "The coefficient formula is projection, divided by squared length — never an independent rule."
- "Fourier series is the simplest Sturm-Liouville expansion, not a separate subject."
- "Convergence always rests on Hilbert-space completeness, regardless of the specific system."

## Transfer Connections
- `math.de.sturm-liouville` (already authored, this campaign, Batch 161): supplies the boundary
  value problem, its orthogonal eigenfunctions, and its completeness claim this concept's
  expansion formula and convergence argument directly reuse.
- `math.de.fourier-series` (not yet authored): the KG's declared related concept, the classical
  special case this concept generalizes.
- `math.fnal.hilbert-space` (not yet authored in this campaign): the KG's declared cross-link,
  supplying the general completeness/orthonormal-basis machinery this concept's convergence
  argument relies on.

## Cross-Subject Connections
- Physics/engineering: generalized Fourier analysis for non-uniform media (e.g. heat conduction
  in a non-uniform rod).

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.de.eigenfunction-expansion.md`, reused by
  reference for its $f(x)=x$ coefficient derivation, its Fourier-series identification, its
  Fourier-versus-Legendre completeness parallel, and its three-misconception registry (severity
  levels adopted directly as declared).
- Transfer probe: the Blueprint's own probe (independence mode here pending
  `math.fnal.hilbert-space`'s authoring), computing expansion coefficients for a non-uniform-rod
  heat-conduction Sturm-Liouville problem.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Wrong-corpus cross-link discrepancy found and corrected**: the Blueprint's own Component 7
  claims `math.fnal.hilbert-space` is "already authored" — checked against the BLUEPRINTS
  directory, where its Blueprint does exist, not the EDUCATIONAL-BRAIN corpus, where it does NOT
  yet exist — corrected to independence mode here, the fifth such wrong-corpus discrepancy this
  campaign (after Batches 128-129, 157, 160, and 161).
- **Stale Blueprint metadata found and corrected**: the Blueprint's own Component 0 states
  `estimated_hours=7` — the live KG's current value (`6`) used as authoritative. Requires
  (`math.de.sturm-liouville`), unlocks (none), and mastery_threshold (0.7) matched exactly.

## Version History
- 2026-09-19 (Batch 162): authored. First entry this batch, closing
  `math.de.sturm-liouville`'s declared unlock. Companion batch concept: `math.de.nonlinear-ode`.
