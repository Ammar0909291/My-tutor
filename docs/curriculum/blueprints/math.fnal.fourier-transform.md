# Teaching Blueprint: Fourier Transform (Functional Analysis) (`math.fnal.fourier-transform`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.fnal.fourier-transform` |
| name | Fourier Transform (Functional Analysis) |
| domain | Functional Analysis |
| difficulty | research |
| bloom | analyze |
| mastery_threshold | 0.65 → MAMR = ⌈0.65×5⌉ = 4/5 |
| estimated_hours | 7 |
| requires | `math.fnal.hilbert-space`, `math.meas.l2-space` |
| unlocks | (none) |
| cross_links | `math.de.fourier-transform`, `math.de.fourier-series` |
| CPA_entry_stage | A (Abstract) — research-level learner already fluent in Hilbert spaces and L²; the extension-by-density construction is presented directly |
| description (KG) | The Fourier transform extends from L¹∩L² to a unitary operator on L²(ℝ) (Plancherel theorem): \|f̂\|₂ = \|f\|₂. Makes L²(ℝ) self-dual. Foundation of spectral theory for differential operators and signal processing. |

## Component 1 — Learning Objectives

- LO1: State the **Plancherel theorem** — the Fourier transform extends from $L^1\cap L^2$ to a UNITARY operator on $L^2(\mathbb{R})$, satisfying $\|\hat f\|_2=\|f\|_2$ — and recognize this L² extension is a genuinely DIFFERENT construction from `math.de.fourier-transform`'s own $L^1$-based improper-integral formula, requiring extension by density rather than direct integration.
- LO2: Apply the precise meaning of "unitary" — norm-PRESERVING, $\|\hat f\|_2=\|f\|_2$ EXACTLY — a genuinely STRONGER property than mere invertibility/bijectivity.
- LO3 *(orientation-level, given the research-level scope of this concept)*: Recognize the L² Fourier transform as the foundation of SPECTRAL THEORY for differential operators — the differentiation operator is DIAGONALIZED by the Fourier transform, directly extending `math.de.fourier-transform`'s own differentiation-to-multiplication property into genuine operator diagonalization via a Hilbert-space change of basis.

## Component 2 — Prerequisite Check

Assumes mastery of `math.fnal.hilbert-space` (complete inner product spaces, orthonormal bases) and `math.meas.l2-space` (the $L^2$ inner product, orthonormal Fourier basis, Parseval's theorem).

## Component 3 — Core Explanation

**The L² Fourier transform requires extension by density, not direct integration**: for $f\in L^1\cap L^2$, the classical formula $\hat f(\omega)=\int f(t)e^{-i\omega t}\,dt$ (already mastered in `math.de.fourier-transform`) converges as an ordinary improper integral. But for a GENERAL $f\in L^2$ (not necessarily in $L^1$), this integral may fail to converge absolutely — so the L² Fourier transform is defined by DENSITY: approximate $f$ by a sequence $f_n\in L^1\cap L^2$ with $f_n\to f$ in $L^2$ norm, and define $\hat f$ as the $L^2$-limit of $\hat f_n$ (guaranteed to converge, by Plancherel's own norm-preservation on the dense subset $L^1\cap L^2$). This is a genuinely different construction from the direct integral formula, extending it via completeness rather than computing it directly.

**Unitary means norm-preserving, exactly — a stronger property than mere invertibility**: Plancherel's theorem, $\|\hat f\|_2=\|f\|_2$, says the Fourier transform preserves $L^2$ norms EXACTLY — no scaling factor at all. This is stronger than simply being bijective (invertible): a bijective linear map can rescale norms arbitrarily and still be invertible, but "unitary" specifically demands the norm is preserved on the nose. This makes $L^2(\mathbb{R})$ SELF-DUAL — the transform maps the space to itself, preserving its full inner-product-space structure.

**Diagonalizing differentiation — the precise content of spectral theory here**: `math.de.fourier-transform`'s own differentiation property ($f'$ transforms to $i\omega\hat f$) is, in this Hilbert-space setting, literally an instance of operator DIAGONALIZATION: the differentiation operator $d/dx$ on $L^2(\mathbb{R})$ becomes, after applying the Fourier transform (a change to the "frequency" orthonormal basis), simple multiplication by $i\omega$ at each frequency — exactly like a diagonal matrix multiplies each basis vector by its own eigenvalue. This is the precise, non-metaphorical foundation of spectral theory for differential operators.

## Component 4 — Worked Examples

**Example 1 (LO1 — a function in L² but not L¹, requiring the density extension, breaking MC-1)**: $f(t)=\dfrac{\sin t}t$ is in $L^2(\mathbb{R})$ (its square is integrable) but NOT in $L^1(\mathbb{R})$ (since $\int|\sin t/t|\,dt$ diverges — the absolute value doesn't decay fast enough). The classical improper-integral formula $\int f(t)e^{-i\omega t}\,dt$ (already mastered in `math.de.fourier-transform`) cannot be directly applied here, since it requires absolute integrability. Instead, the L² Fourier transform of $f$ must be defined by approximating $f$ with a sequence of $L^1\cap L^2$ functions converging to $f$ in $L^2$ norm, and taking the $L^2$-limit of their transforms — a genuinely different (density-based) construction from the direct integral.

**Example 2 (LO2 — unitary means exact norm-preservation, stronger than bijectivity, breaking MC-2)**: Consider $T(f)=2f$ on $L^2(\mathbb{R})$ — this map is BIJECTIVE (invertible, with $T^{-1}(f)=f/2$), but is it unitary? Check: $\|T(f)\|_2=\|2f\|_2=2\|f\|_2\ne\|f\|_2$ in general — NOT norm-preserving, hence NOT unitary, despite being perfectly bijective. Contrast: the Fourier transform's Plancherel property, $\|\hat f\|_2=\|f\|_2$ EXACTLY (no scaling factor whatsoever) — a genuinely stronger claim than $T$'s mere bijectivity satisfies.

**Example 3 (orientation-level — diagonalizing differentiation, breaking MC-3)**: `math.de.fourier-transform` already established $\widehat{f'}(\omega)=i\omega\hat f(\omega)$. Reinterpreted via spectral theory: the differentiation operator $D=d/dx$ on $L^2(\mathbb{R})$, when expressed in the "frequency basis" (via the Fourier transform, a genuine change of orthonormal basis per `math.meas.l2-space`'s own machinery), becomes simple MULTIPLICATION by $i\omega$ — exactly analogous to how a diagonal matrix acts by multiplying each basis vector by its own eigenvalue. This is the precise content of "the Fourier transform diagonalizes differentiation" — a formal fact about operator diagonalization via a genuine Hilbert-space basis change, not a loose figure of speech.

## Component 5 — Teaching Actions

### Teaching Action A01 — L² Extension Requires Density, Not Direct Integration (Primitive P28: Conflict Evidence)

Present Example 1's direct evidence: $\sin(t)/t\in L^2$ but $\notin L^1$, so the classical integral formula cannot be applied directly — the L² transform must be built via density instead. State: "the L² Fourier transform is a genuinely different construction from the L¹-based improper integral you already know — it extends that formula via completeness, for functions the direct integral can't reach."

- **MC-1 hook**: ask "is the L² Fourier transform essentially the same object as the L¹-based classical Fourier transform, just applied to a bigger class of functions using the same integral formula?" — a "yes" answer reveals MC-1 (missing that a genuinely different, density-based construction is required).

### Teaching Action A02 — Unitary Means Exact Norm Preservation, Not Just Bijectivity (Primitive P06: Contrast Pair)

Contrast Example 2's two cases: $T(f)=2f$ (bijective, NOT unitary) against the Fourier transform (unitary, exact norm preservation). State: "unitary is a strictly stronger property than invertibility — it specifically requires the norm to be preserved exactly, with no rescaling at all."

- **MC-2 hook**: ask "does 'unitary' just mean the same thing as 'invertible' or 'bijective'?" — a "yes" answer reveals MC-2 (missing the specific, stronger norm-preservation requirement).

### Teaching Action A03 — Diagonalization Is a Precise Fact, Not a Metaphor (Primitive P11: Representation Shift)

State: "'the Fourier transform diagonalizes differentiation' isn't a vague slogan — it's a precise statement about operator diagonalization via a genuine change of orthonormal basis, directly extending the differentiation-to-multiplication property you already know." Work Example 3's explicit basis-change framing.

- **MC-3 hook**: ask "is the connection between the Fourier transform and 'diagonalizing differential operators' merely a loose metaphor?" — a "yes" answer reveals MC-3 (missing that this is a precise, formal fact about operator diagonalization).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Determine whether $f(t)=1/(1+t^2)$ is in $L^1\cap L^2$, and explain what this implies about how its Fourier transform can be computed.
  2. Determine whether $T(f)=f(\cdot-1)$ (translation by 1) is unitary on $L^2(\mathbb{R})$, checking norm preservation directly.
  3. Explain why "unitary" is a strictly stronger requirement than "bijective," using a specific bijective-but-not-unitary example.
  4. Explain, in your own words, what it means for the Fourier transform to "diagonalize" the differentiation operator.
- **P76 (Transfer Probe, mode = cross-link probe against `math.de.fourier-transform` and `math.de.fourier-series`)**: "A physicist working with quantum-mechanical wavefunctions in $L^2(\mathbb{R})$ needs to solve a differential equation involving the momentum operator (proportional to $d/dx$), and uses the Fourier transform to convert it to an algebraic equation, exactly as in `math.de.fourier-transform`'s own differentiation property. (a) Using this lesson's diagonalization framing, explain why this technique works — what precisely is being diagonalized, and by what change of basis. (b) The physicist's wavefunction happens to not be absolutely integrable (only in $L^2$, not $L^1$). Explain, using this lesson's density-extension reasoning, why the Fourier transform can still be applied, even though the classical improper-integral definition from `math.de.fourier-transform` cannot be used directly. (c) A colleague argues 'since the Fourier transform is invertible, it must automatically preserve the wavefunction's total probability (proportional to its L² norm squared).' Explain specifically why invertibility ALONE would not guarantee this, and what additional property (unitarity) is actually doing the work."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | L2-TRANSFORM-CONFLATED-WITH-CLASSICAL-INTEGRAL-FORMULA | Believing the L² Fourier transform is the same construction as the L¹-based classical improper integral, missing that L² requires a genuinely different density-based extension | Foundational |
| MC-2 | UNITARY-CONFLATED-WITH-INVERTIBLE | Believing "unitary" means the same thing as "invertible" or "bijective," missing the stronger, exact norm-preservation requirement | Foundational |
| MC-3 | DIAGONALIZATION-TREATED-AS-METAPHOR | Believing the Fourier-transform-diagonalizes-differentiation connection is a loose metaphor, missing that it is a precise fact about operator diagonalization via a Hilbert-space basis change | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "L² Transform Conflated with Classical Integral Formula") → P41 (detect: ask a student to compute the L² Fourier transform of sin(t)/t via the direct integral formula, checking whether they proceed without noticing the convergence failure) → P64 (conceptual shift: re-walk Example 1's density-based construction, re-anchoring on "L² requires extension by density, not direct integration").
- **B02 (targets MC-2)**: P27 (name it: "Unitary Conflated with Invertible") → P41 (detect: ask a student whether T(f)=2f, being invertible, is also unitary, checking for "yes") → P64 (conceptual shift: re-walk Example 2's norm-preservation check, re-anchoring on "unitary specifically requires exact norm preservation, a stronger property than bijectivity").
- **B03 (targets MC-3)**: P27 (name it: "Diagonalization Treated as Metaphor") → P41 (detect: ask a student whether the diagonalization connection is a formal fact or a loose metaphor, checking for "metaphor") → P64 (conceptual shift: re-walk Example 3's explicit basis-change framing, re-anchoring on "this is a precise fact about operator diagonalization, not a figure of speech").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.fnal.hilbert-space` (the general inner-product-space/orthonormal-basis theory this concept's unitary-operator framing directly uses), `math.meas.l2-space` (the L² inner product, Fourier orthonormal basis, and Parseval's theorem this concept extends).
- **Unlocks**: (none — KG lists no unlocks for this concept).
- **Cross-link**: KG lists BOTH `math.de.fourier-transform` and `math.de.fourier-series` as cross-links — **both authored** (checked via `ls docs/curriculum/blueprints/` before setting P76_mode). $P76_{mode}=$ **cross-link probe**, directly connecting to `math.de.fourier-transform`'s own classical improper-integral formula and differentiation property (contrasted against the density-based L² extension and reframed as diagonalization), and to `math.de.fourier-series`'s discrete-frequency machinery (via `math.meas.l2-space`'s own orthonormal Fourier basis).

## Component 8 — Teaching Notes

- estimated_hours = 7 with a research/analyze tag places this at a "3 TAs + gate" tier; LO3 (spectral theory/diagonalization) is deliberately kept at ORIENTATION level, per established precedent for research-tier concepts, stating the precise diagonalization fact without deriving the full spectral theorem for unbounded operators.
- **Division of labor**: `math.fnal.hilbert-space` owns general inner-product-space theory; `math.meas.l2-space` owns the specific L² inner product and Fourier orthonormal basis. This concept, `math.fnal.fourier-transform`, deliberately does not re-derive either; it owns the SPECIFIC extension of the Fourier transform from L¹∩L² to all of L² via density, the precise unitary/Plancherel property this extension satisfies, and the spectral-theory (diagonalization) interpretation this unlocks.
- Example 1's $\sin(t)/t$ was deliberately chosen as the standard textbook instance of a function in L² but not L¹, since it is the cleanest, most commonly-cited illustration of exactly why the L¹-based classical formula cannot handle all of L², motivating the density-extension construction concretely rather than asserting the need for it abstractly.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (both math.de.fourier-transform and math.de.fourier-series authored → cross-link probe) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe against both math.de.fourier-transform and math.de.fourier-series) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.65×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: research-level learner already fluent in Hilbert spaces/L²; density extension presented directly) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3 orientation-level) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
