# Teaching Blueprint: L² Space (`math.meas.l2-space`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.meas.l2-space` |
| name | L² Space |
| domain | Measure Theory |
| difficulty | expert |
| bloom | analyze |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 5 |
| requires | `math.meas.lp-space` |
| unlocks | (none) |
| cross_links | `math.fnal.hilbert-space`, `math.de.fourier-transform` |
| CPA_entry_stage | A (Abstract) — expert learner already fluent in Lᵖ spaces; the inner product is introduced directly |
| description (KG) | L²(μ) with inner product ⟨f,g⟩=∫fḡ dμ is a Hilbert space (complete inner product space). Orthonormal bases and Fourier series are central. Parseval's theorem: ∑\|⟨f,eₙ⟩\|² = \|f\|². |

## Component 1 — Learning Objectives

- LO1: Define the inner product $\langle f,g\rangle=\int f\bar g\,d\mu$ on $L^2(\mu)$ and verify $L^2$ is a genuine Hilbert space (`math.fnal.hilbert-space`'s own "complete inner product space" definition) — recognizing $p=2$ is SPECIAL among the $L^p$ family: only $p=2$ admits this inner-product structure, verified via the parallelogram law holding for $L^2$ but failing for other $p$.
- LO2: Apply orthonormal bases in $L^2$ to represent $f=\sum\langle f,e_n\rangle e_n$ — recognizing this is the SAME Fourier decomposition already familiar from `math.de.fourier-transform`, now understood as genuine ORTHOGONAL PROJECTION in a Hilbert space, reusing `math.fnal.hilbert-space`'s own orthonormal-basis machinery.
- LO3: Apply Parseval's theorem $\sum|\langle f,e_n\rangle|^2=\|f\|^2$ concretely, recognizing it as the $L^2$ analogue of the Pythagorean theorem — a direct consequence of orthonormality and completeness, not an independent, unrelated fact about Fourier coefficients.

## Component 2 — Prerequisite Check

Assumes mastery of `math.meas.lp-space` ($L^p=\{f\text{ measurable}:\int|f|^p\,d\mu<\infty\}$, the norm $\|f\|_p$, completeness via Riesz-Fischer).

## Component 3 — Core Explanation

**Only $p=2$ admits a genuine inner product — the parallelogram law is the test**: $L^2(\mu)$ carries the inner product $\langle f,g\rangle=\int f\bar g\,d\mu$, making it a genuine Hilbert space per `math.fnal.hilbert-space`'s own definition (a complete inner product space — completeness already established via $L^p$'s Riesz-Fischer theorem). This inner-product structure is SPECIAL to $p=2$: the parallelogram law $\|f+g\|^2+\|f-g\|^2=2\|f\|^2+2\|g\|^2$ (a direct algebraic consequence of any genuine inner product) holds for $L^2$ but genuinely FAILS for $L^p$ with $p\ne2$ — no other $L^p$ space admits a compatible inner product.

**Fourier series ARE orthogonal projection in a Hilbert space, not a separate technique**: `math.de.fourier-transform`'s frequency decomposition is, in the $L^2$ setting, literally the same thing as expressing $f$ in terms of an orthonormal basis $\{e_n\}$: $f=\sum_n\langle f,e_n\rangle e_n$, using EXACTLY `math.fnal.hilbert-space`'s own orthonormal-basis machinery. The functions $e_n(x)=e^{inx}/\sqrt{2\pi}$ form an orthonormal basis of $L^2([0,2\pi])$, and Fourier coefficients are literally the inner products $\langle f,e_n\rangle$ — the "formal series" already familiar from calculus is genuinely an orthogonal-projection expansion in a Hilbert space.

**Parseval's theorem is the Pythagorean theorem, generalized to infinite dimensions**: $\sum_n|\langle f,e_n\rangle|^2=\|f\|^2$ says the sum of squared "coordinates" (inner products against an orthonormal basis) equals the squared "length" ($L^2$ norm) — exactly the Pythagorean theorem's statement (sum of squared components equals squared length), now holding in an infinite-dimensional Hilbert space, a direct consequence of orthonormality and completeness rather than an independent fact requiring separate justification.

## Component 4 — Worked Examples

**Example 1 (LO1 — the parallelogram law holds for L², fails elsewhere, breaking MC-1)**: For $f=1$, $g=x$ on $[0,1]$ (Lebesgue measure): $\|f\|_2^2=\int_0^1 1\,dx=1$, $\|g\|_2^2=\int_0^1 x^2\,dx=\frac13$. $\|f+g\|_2^2=\int_0^1(1+x)^2\,dx=\int_0^1(1+2x+x^2)\,dx=1+1+\frac13=\frac73$. $\|f-g\|_2^2=\int_0^1(1-x)^2\,dx=1-1+\frac13=\frac13$. Check the parallelogram law: $\|f+g\|_2^2+\|f-g\|_2^2=\frac73+\frac13=\frac83$, and $2\|f\|_2^2+2\|g\|_2^2=2(1)+2(\frac13)=\frac83$ — MATCHES exactly, confirming $L^2$'s genuine inner-product structure. The analogous computation using $L^1$ or $L^\infty$ norms for the same $f,g$ does NOT satisfy this identity — confirming only $p=2$ admits a compatible inner product.

**Example 2 (LO2 — Fourier series as orthogonal projection, reusing Hilbert-space machinery, breaking MC-2)**: The functions $e_n(x)=e^{inx}/\sqrt{2\pi}$ on $[0,2\pi]$ satisfy $\langle e_n,e_m\rangle=\int_0^{2\pi}\frac{e^{inx}}{\sqrt{2\pi}}\cdot\overline{\frac{e^{imx}}{\sqrt{2\pi}}}\,dx=\frac1{2\pi}\int_0^{2\pi}e^{i(n-m)x}\,dx=\delta_{nm}$ (the Kronecker delta: $1$ if $n=m$, $0$ otherwise) — a direct orthonormality verification, EXACTLY `math.fnal.hilbert-space`'s own orthonormal-basis criterion. Representing $f\in L^2([0,2\pi])$ as $f=\sum_n\langle f,e_n\rangle e_n$ is the IDENTICAL Fourier decomposition already familiar from `math.de.fourier-transform`, now understood as genuine orthogonal projection onto basis vectors in a Hilbert space, not a separate formal technique invented independently for Fourier analysis.

**Example 3 (LO3 — Parseval's theorem as the Pythagorean theorem, generalized, breaking MC-3)**: For $f(x)=x$ on $[0,2\pi]$, with its standard Fourier coefficients (computed via the orthonormal basis $e_n$ from Example 2): Parseval's theorem asserts $\sum_n|\langle f,e_n\rangle|^2=\|f\|_2^2=\int_0^{2\pi}x^2\,dx=\frac{(2\pi)^3}3$. This is not an isolated fact about Fourier coefficients specifically — it is the DIRECT Hilbert-space consequence of $\{e_n\}$ being a complete orthonormal basis: exactly as the Pythagorean theorem says the sum of squared coordinate components equals squared length in finite dimensions, Parseval's theorem says the identical thing here, in this infinite-dimensional setting.

## Component 5 — Teaching Actions

### Teaching Action A01 — Only p=2 Admits the Parallelogram Law (Primitive P28: Conflict Evidence)

Present Example 1's direct evidence: the parallelogram law holds exactly for $L^2$'s specific $f,g$ computation, and fails for the analogous $L^1$/$L^\infty$ computation. State: "the inner-product structure — and everything that follows from it, like the parallelogram law — is a special property of p=2, not shared by other Lᵖ spaces."

- **MC-1 hook**: ask "does every Lᵖ space admit a natural inner product, making it a Hilbert space?" — a "yes" answer reveals MC-1 (missing that only p=2 admits this special structure).

### Teaching Action A02 — Fourier Series Are Orthogonal Projection, Not a Separate Technique (Primitive P11: Representation Shift)

State: "the Fourier series you already know from calculus isn't a separate formal trick — it's exactly the Hilbert-space orthonormal-basis expansion, applied to this specific L² setting, using the identical machinery already mastered." Work Example 2's orthonormality verification and the resulting expansion.

- **MC-2 hook**: ask "are Fourier series in L² merely a formal analogy to the calculus-level Fourier series already studied, rather than a genuine instance of Hilbert-space orthogonal projection?" — a "yes" answer reveals MC-2 (missing that L² Fourier series ARE the Hilbert-space machinery, not a separate parallel technique).

### Teaching Action A03 — Parseval Is the Pythagorean Theorem, Generalized (Primitive P06: Contrast Pair)

Contrast the finite-dimensional Pythagorean theorem (sum of squared coordinates equals squared length) against Example 3's Parseval computation (sum of squared Fourier coefficients equals squared L² norm) — the identical structural statement. State: "Parseval's theorem isn't an independent fact about Fourier series specifically — it's the Pythagorean theorem, holding in this infinite-dimensional Hilbert space."

- **MC-3 hook**: ask "is Parseval's theorem an independent, unrelated fact about Fourier coefficients, with no connection to more basic geometric facts?" — a "yes" answer reveals MC-3 (missing that it is a direct consequence of orthonormality and completeness, the same structure underlying the Pythagorean theorem).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Verify the parallelogram law for $f=x$, $g=x^2$ on $[0,1]$ with Lebesgue measure.
  2. Verify $\langle e_2,e_3\rangle=0$ directly for $e_n(x)=e^{inx}/\sqrt{2\pi}$ on $[0,2\pi]$.
  3. Explain why Parseval's theorem is a consequence of completeness and orthonormality, rather than a fact specific to trigonometric functions.
  4. Explain why $L^1$ and $L^\infty$ do not admit a Hilbert-space structure, referencing the parallelogram law.
- **P76 (Transfer Probe, mode = cross-link probe against `math.fnal.hilbert-space` and `math.de.fourier-transform`)**: "A signal-processing engineer represents an audio signal $f\in L^2$ using its Fourier coefficients (from `math.de.fourier-transform`) and wants to verify the representation preserves the signal's total energy (proportional to $\|f\|_2^2$). (a) Using this lesson's Parseval's theorem, explain why summing the squared Fourier coefficients gives exactly this energy quantity, connecting it to the Pythagorean-theorem analogy. (b) A colleague, familiar with `math.fnal.hilbert-space`'s general orthonormal-basis theory but not with Fourier analysis specifically, asks whether Parseval's theorem here is a special result unique to trigonometric Fourier series, or a general Hilbert-space fact. Explain which, and why. (c) The colleague also wonders whether the same orthonormal-basis/Parseval framework would work equally well in $L^1$ instead of $L^2$, for simplicity. Explain specifically why this substitution would fail, referencing the parallelogram law."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | ALL-LP-SPACES-ASSUMED-TO-HAVE-INNER-PRODUCTS | Believing every Lᵖ space admits a natural inner product, missing that only p=2 has this special Hilbert-space structure | Foundational |
| MC-2 | L2-FOURIER-SERIES-TREATED-AS-FORMAL-ANALOGY | Believing Fourier series in L² are merely a formal analogy to calculus-level Fourier series, missing that they ARE the Hilbert-space orthonormal-basis expansion | Foundational |
| MC-3 | PARSEVAL-TREATED-AS-INDEPENDENT-FACT | Believing Parseval's theorem is an independent fact specific to Fourier coefficients, missing that it is the Pythagorean theorem generalized via orthonormality and completeness | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "All Lᵖ Spaces Assumed to Have Inner Products") → P41 (detect: ask a student whether L¹ or L^∞ admit an inner product like L², checking for "yes") → P64 (conceptual shift: re-walk Example 1's parallelogram-law verification, re-anchoring on "only p=2 has this special structure").
- **B02 (targets MC-2)**: P27 (name it: "L² Fourier Series Treated as Formal Analogy") → P41 (detect: ask a student whether L² Fourier series are genuinely the same as Hilbert-space orthogonal projection, checking for "no, just an analogy") → P64 (conceptual shift: re-walk Example 2's orthonormality verification and expansion, re-anchoring on "this IS orthogonal projection, using the identical Hilbert-space machinery").
- **B03 (targets MC-3)**: P27 (name it: "Parseval Treated as Independent Fact") → P41 (detect: ask a student whether Parseval's theorem is connected to the Pythagorean theorem, checking for "no") → P64 (conceptual shift: re-walk Example 3's direct structural parallel, re-anchoring on "Parseval IS the Pythagorean theorem, generalized to infinite dimensions").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.meas.lp-space` (the $L^p$ norm and completeness this concept's inner product and Hilbert-space status build directly on).
- **Unlocks**: (none — KG lists no unlocks for this concept).
- **Cross-link**: KG lists BOTH `math.fnal.hilbert-space` and `math.de.fourier-transform` as cross-links — **both authored** (checked via `ls docs/curriculum/blueprints/` before setting P76_mode). $P76_{mode}=$ **cross-link probe**, engaging directly with both: `math.fnal.hilbert-space`'s own orthonormal-basis and completeness machinery (LO1/LO2), and `math.de.fourier-transform`'s own frequency-decomposition content, now reframed as genuine orthogonal projection (LO2/LO3).

## Component 8 — Teaching Notes

- estimated_hours = 5 with an expert/analyze tag places this at a "3 TAs + gate" tier; the concept directly reuses both cross-linked concepts' own machinery (Hilbert-space theory, Fourier decomposition), focusing the budget on the SPECIFIC connection point — that $L^2$ is where these two previously-separate theories meet.
- **Division of labor**: `math.meas.lp-space` owns the general $L^p$ norm and completeness. `math.fnal.hilbert-space` owns the general inner-product-space/orthonormal-basis theory. `math.de.fourier-transform` owns the frequency-decomposition machinery. This concept, `math.meas.l2-space`, deliberately does not re-derive any of these; it owns the SPECIFIC recognition that $L^2$ is the concrete setting where all three meet — the one $L^p$ space that is genuinely a Hilbert space, in which Fourier series are genuine orthogonal projections, governed by Parseval's theorem as a direct Hilbert-space consequence.
- Example 1's parallelogram-law computation was deliberately worked with fully explicit numeric fractions (rather than left as a general symbolic claim) so the "only p=2 works" claim could be verified by direct arithmetic, not merely asserted as a known fact from functional analysis.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (both math.fnal.hilbert-space and math.de.fourier-transform authored → cross-link probe) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe against both math.fnal.hilbert-space and math.de.fourier-transform) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert learner already fluent in Lᵖ spaces; inner product introduced directly) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
