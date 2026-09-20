# math.fnal.fourier-transform

## Identity
- **KG id**: `math.fnal.fourier-transform`
- **Domain**: math.fnal
- **Requires**: `math.fnal.hilbert-space`, `math.meas.l2-space`
- **Unlocks**: none
- **Cross-links**: `math.de.fourier-transform`, `math.de.fourier-series`
- **Difficulty**: research
- **Bloom level**: analyze
- **Mastery threshold**: 0.65
- **Estimated hours**: 7

## Learning Objective
Recognize the $L^2$ Fourier transform requires extension by DENSITY, NEVER the same direct
integral formula as the $L^1$-based classical transform; apply "unitary" as EXACT norm
preservation — NEVER conflated with mere bijectivity/invertibility; and recognize
"diagonalizes differentiation" as a PRECISE fact about operator diagonalization via a basis
change — NEVER a loose metaphor.

## Core Understanding
THE $L^2$ FOURIER TRANSFORM REQUIRES EXTENSION BY DENSITY — NEVER THE SAME DIRECT INTEGRAL FORMULA
AS THE CLASSICAL $L^1$ TRANSFORM: $f(t)=\sin(t)/t$ is in $L^2(\mathbb{R})$ but NOT in $L^1$ (since
$\int|\sin t/t|\,dt$ diverges). The classical improper-integral formula $\int
f(t)e^{-i\omega t}\,dt$ CANNOT be applied directly. Instead, the $L^2$ transform is built by
approximating $f$ with a sequence $f_n\in L^1\cap L^2$ converging to $f$ in $L^2$ norm, and taking
the $L^2$-limit of $\hat f_n$ (guaranteed to converge by Plancherel's norm-preservation on the
dense subset). Believing the $L^2$ Fourier transform is essentially the same construction as the
$L^1$-based classical integral, just applied to a bigger class of functions using the same
formula, is WRONG — $L^2$ genuinely requires this density-based extension, not direct integration.

"UNITARY" MEANS EXACT NORM PRESERVATION — NEVER CONFLATED WITH MERE BIJECTIVITY: $T(f)=2f$ on
$L^2(\mathbb{R})$ is BIJECTIVE (invertible, $T^{-1}(f)=f/2$), but $\|T(f)\|_2=2\|f\|_2\neq\|f\|_2$
in general — NOT norm-preserving, hence NOT unitary, despite being perfectly bijective. Contrast
with Plancherel: $\|\hat f\|_2=\|f\|_2$ EXACTLY, no scaling factor whatsoever. Believing "unitary"
just means "invertible" or "bijective" is WRONG — unitary is a STRICTLY STRONGER property,
specifically requiring exact norm preservation; a bijective linear map can rescale norms
arbitrarily and remain invertible, but never remain unitary while doing so.

"DIAGONALIZES DIFFERENTIATION" IS A PRECISE FACT ABOUT OPERATOR DIAGONALIZATION — NEVER A LOOSE
METAPHOR: `math.de.fourier-transform`'s property $\widehat{f'}(\omega)=i\omega\hat f(\omega)$,
reinterpreted here: the differentiation operator $D=d/dx$ on $L^2(\mathbb{R})$, expressed in the
"frequency basis" via the Fourier transform (a genuine change of orthonormal basis), becomes SIMPLE
MULTIPLICATION by $i\omega$ — exactly analogous to a diagonal matrix multiplying each basis vector
by its own eigenvalue. Believing the "Fourier-transform-diagonalizes-differentiation" connection is
a loose figure of speech is WRONG — it is a precise, formal fact about operator diagonalization via
a genuine Hilbert-space basis change, the actual foundation of spectral theory for differential
operators.

## Mental Models
- **"The L² Fourier transform isn't the L¹ integral formula stretched to a bigger domain — it's
  built by density, extending the formula via completeness for functions the direct integral
  can't reach."**
- **"Unitary demands the norm be preserved exactly — invertibility alone lets you rescale freely
  and still qualify; unitary never does."**
- **"Diagonalizing differentiation is a formal basis-change fact, not a slogan — the frequency
  basis turns d/dx into plain multiplication by iω."**

## Why Students Fail

### MC-1: L2-TRANSFORM-CONFLATED-WITH-CLASSICAL-INTEGRAL-FORMULA
- **Surface form**: believes the $L^2$ Fourier transform is the same construction as the
  $L^1$-based classical improper integral, missing that $L^2$ requires a genuinely different
  density-based extension.
- **Birth type**: overgeneralization (Blueprint's own declared foundational severity — the
  transform's defining formula is so central to the $L^1$ theory that its limits are easy to
  overlook).
- **Repair**: re-walk the $\sin(t)/t$ density-based construction, re-anchoring on "L² requires
  extension by density, not direct integration."

### MC-2: UNITARY-CONFLATED-WITH-INVERTIBLE
- **Surface form**: believes "unitary" means the same thing as "invertible" or "bijective,"
  missing the stronger, exact norm-preservation requirement.
- **Birth type**: overgeneralization (Blueprint's own declared foundational severity — both terms
  describe "nice," structure-preserving bijections, inviting conflation).
- **Repair**: re-walk the $T(f)=2f$ norm-preservation check, re-anchoring on "unitary specifically
  requires exact norm preservation, a stronger property than bijectivity."

### MC-3: DIAGONALIZATION-TREATED-AS-METAPHOR
- **Surface form**: believes the Fourier-transform-diagonalizes-differentiation connection is a
  loose metaphor, missing that it is a precise fact about operator diagonalization via a
  Hilbert-space basis change.
- **Birth type**: instruction-induced (Blueprint's own declared moderate severity — "diagonalizes"
  is often used loosely in popular explanations of the Fourier transform).
- **Repair**: re-walk the explicit basis-change framing, re-anchoring on "this is a precise fact
  about operator diagonalization, not a figure of speech."

## Misconceptions

### MC-1: L2-TRANSFORM-CONFLATED-WITH-CLASSICAL-INTEGRAL-FORMULA
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

### MC-2: UNITARY-CONFLATED-WITH-INVERTIBLE
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

### MC-3: DIAGONALIZATION-TREATED-AS-METAPHOR
- **Surface form**: as described above.
- **Root cause (instruction-induced)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Extending the Fourier transform to L² is like tiling around a jagged coastline by filling in
  from the nearest completed tiles — density lets you reach shapes the original direct formula
  never could."**
- **Anti-analogy**: a unitary map isn't just "invertible with extra polish" — rescaling by any
  factor other than 1 destroys unitarity instantly, even though it changes nothing about
  invertibility.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the $\sin(t)/t\in L^2\setminus L^1$ density-extension
  construction.
- **Demonstration 2 (targets MC-2)**: the $T(f)=2f$ bijective-but-not-unitary contrast against
  Plancherel's exact norm preservation.
- **Demonstration 3 (targets MC-3)**: the differentiation-operator basis-change diagonalization
  via the frequency basis.

## Discovery Questions
1. "Is the L² Fourier transform essentially the same object as the L¹-based classical Fourier
   transform, just applied to a bigger class of functions using the same integral formula?"
2. "Does 'unitary' just mean the same thing as 'invertible' or 'bijective'?"
3. "Is the connection between the Fourier transform and 'diagonalizing differential operators'
   merely a loose metaphor?"

## Teaching Sequence
1. **Conflict evidence**: work the $\sin(t)/t$ density-extension example, isolating MC-1.
2. **Contrast pair**: work the $T(f)=2f$-versus-Plancherel norm-preservation contrast, isolating
   MC-2.
3. **Representation shift**: work the differentiation-diagonalization basis-change framing,
   isolating MC-3.
4. **Mastery gate**: require a correct determination of when the direct integral formula applies
   versus requiring density extension, a correct unitary-versus-bijective distinction with a
   concrete example, and a correct explanation of the diagonalization fact, at the Blueprint's
   own stated MAMR of 4/5.

## Tutor Actions
- Never accept the L² Fourier transform computed via the direct L¹ integral formula for a function
  outside $L^1$.
- Never accept "unitary" and "invertible"/"bijective" treated as synonyms.
- Never accept the diagonalization connection dismissed as a loose metaphor.

## Voice Teaching Notes
- Say "is that function actually in L¹, or do you need the density construction?" whenever the L²
  transform is computed.
- Ask "does that map preserve the norm exactly, or just happen to be invertible?" whenever
  unitarity is claimed.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly identifies when a function requires the
  density-based L² construction rather than the direct integral.
- **Rung 2 (application)**: learner correctly distinguishes a bijective-but-not-unitary map from a
  genuinely unitary one via direct norm computation.
- **Rung 3 (transfer)**: learner correctly explains why unitarity (not mere invertibility)
  guarantees a quantum wavefunction's total probability is preserved under the Fourier transform.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the $\sin(t)/t$ density-extension construction.
- If MC-2 recurs, re-walk the $T(f)=2f$ norm-preservation check.
- If MC-3 recurs, re-walk the differentiation-diagonalization basis-change framing.

## Memory Hooks
- "L² needs density extension — the L¹ integral formula alone can't reach every L² function."
- "Unitary means exact norm preservation — invertibility alone never guarantees it."
- "Diagonalizing differentiation is a precise basis-change fact, never a metaphor."

## Transfer Connections
- `math.fnal.hilbert-space` (prerequisite, already authored, this campaign): supplies the general
  inner-product-space/orthonormal-basis theory this concept's unitary-operator framing uses.
- `math.meas.l2-space` (prerequisite, already authored): supplies the $L^2$ inner product, Fourier
  orthonormal basis, and Parseval's theorem this concept extends.
- `math.de.fourier-transform` (already authored, cross-link): supplies the classical $L^1$-based
  improper-integral formula and differentiation property this concept extends and reframes as
  diagonalization.
- `math.de.fourier-series` (already authored, cross-link): supplies the discrete-frequency
  machinery this concept connects to via `math.meas.l2-space`'s orthonormal Fourier basis.

## Cross-Subject Connections
- Quantum mechanics: converting a differential equation involving the momentum operator into an
  algebraic equation via the Fourier transform is a direct application of this concept's
  diagonalization fact, with unitarity guaranteeing conservation of total probability.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.fnal.fourier-transform.md`, reused by
  reference for its three worked examples and its three-misconception registry (birth types
  adopted directly as declared).
- Transfer probe: the Blueprint's own cross-link probe engaging both `math.de.fourier-transform`
  and `math.de.fourier-series`, on a quantum-mechanical wavefunction's momentum-operator equation
  and why unitarity (not mere invertibility) preserves total probability.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.fnal.hilbert-space`/`math.meas.l2-space`, unlocks none, cross_links
  `math.de.fourier-transform`/`math.de.fourier-series`, research/analyze, mastery_threshold 0.65,
  estimated_hours 7) was directly verified against the live KG and matches exactly. Both
  cross-link targets confirmed authored, matching the Blueprint's own dual cross-link-probe
  determination.

## Version History
- 2026-09-20 (Batch 233): authored. Second entry this batch. Companion batch concept:
  `math.fnal.compact-operator-spectrum`.
