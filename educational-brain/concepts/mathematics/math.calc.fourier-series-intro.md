# math.calc.fourier-series-intro — Fourier Series (Introduction)

## Identity
- **KG id**: `math.calc.fourier-series-intro`
- **Domain**: math.calc (Calculus)
- **Requires**: `math.calc.definite-integral`, `math.trig.trig-functions`, `math.seq.series`
- **Unlocks**: `math.de.heat-equation`
- **Cross-links**: `math.de.heat-equation`, `math.fnal.hilbert-space` (both unauthored — **P76_mode: independence**)
- **Difficulty**: expert · **Bloom level**: analyze
- **Mastery threshold**: 0.7 · **Estimated hours**: 12

## Learning Objective
The learner states the Fourier series representation $f(x)=\frac{a_0}2+\sum_{n=1}^\infty(a_n\cos(nx)+b_n\sin(nx))$ as a genuine infinite sum, computes Fourier coefficients via the orthogonality integrals, explains why orthogonality isolates exactly one coefficient, and recognizes (at an orientation level) that computing a coefficient is an inner-product projection onto an orthogonal function basis.

## Core Understanding
This concept sits at the confluence of its three prerequisites: `math.seq.series`'s own infinite-sum machinery, `math.trig.trig-functions`'s periodic sine and cosine building blocks, and `math.calc.definite-integral`'s integration machinery. A periodic function $f$ (period $2\pi$) is represented as $f(x)=\frac{a_0}2+\sum_{n=1}^\infty(a_n\cos(nx)+b_n\sin(nx))$ — a genuinely INFINITE series. Except for very special functions, no finite truncation exactly equals $f$; the series (or its limit of partial sums) is genuinely required.

The coefficients are recovered via the **orthogonality integrals** $a_n=\frac1\pi\int_{-\pi}^\pi f(x)\cos(nx)\,dx$ and $b_n=\frac1\pi\int_{-\pi}^\pi f(x)\sin(nx)\,dx$. These specific integrals work because $\int_{-\pi}^\pi\sin(mx)\sin(nx)\,dx=0$ whenever $m\ne n$ (similarly for cosine pairs, and for every mixed sine-cosine pair, always $0$) — **orthogonality**. Formally substituting the full series into one of these integrals and integrating term by term, every term EXCEPT the one matching frequency $n$ vanishes by orthogonality, leaving exactly the single coefficient being solved for, cleanly isolated.

At an orientation level, the functions $\{1,\cos(x),\sin(x),\cos(2x),\sin(2x),\ldots\}$ form an ORTHOGONAL set under the $L^2$ inner product $\langle f,g\rangle=\int_{-\pi}^\pi fg\,dx$ — the framework `math.fnal.hilbert-space` develops in full. Computing a Fourier coefficient like $b_n$ is literally computing $\langle f,\sin(nx)\rangle$ (up to a normalizing constant) — exactly the same operation as finding one coordinate of a vector by taking its inner product against an orthogonal basis vector, just applied to an infinite-dimensional space of functions instead of finitely many vectors.

## Mental Models
- **Genuinely infinite, not a convenient shorthand.** A Fourier series is not a compressed way of writing a finite sum — for most functions, EVERY term contributes, and truncating produces only an approximation (sometimes a persistently imperfect one, as at a jump discontinuity).
- **Orthogonality is a filter, not a formula to memorize.** Multiplying by $\sin(nx)$ and integrating makes every OTHER term in the series vanish — the coefficient formulas are the direct consequence of this filtering property, not an arbitrary rule.
- **Fourier coefficients are coordinates in an infinite-dimensional space.** Exactly as a vector's coordinate along one axis is found via an inner product with that axis's unit vector, a Fourier coefficient is found via an inner product with one member of an infinite orthogonal function basis.

## Why Students Fail
All three of this Blueprint's misconceptions carry explicit severity ratings but no birth-type column, so each is independently classified here:
- **MC-1** is a **Type 1 (overgeneralization)**: a learner's prior experience with "series" in more elementary contexts (e.g. a Taylor polynomial truncated to a few terms for practical use) may generalize into an assumption that a Fourier series, too, can always be captured exactly by finitely many terms.
- **MC-2** is a **Type 5 (instruction-induced)** gap: without an explicit connection to WHY the orthogonality integrals work, they present as a fixed formula to apply, indistinguishable in character from any other memorized computational rule.
- **MC-3** is a **Type 5 (instruction-induced)** gap: the connection between Fourier coefficients and orthogonal-basis projection requires an inner-product framework (`math.fnal.hilbert-space`) that this concept can only preview at an orientation level, so without an explicit re-expression showing the identical underlying operation, the two ideas remain unconnected.

## Misconceptions
**MC-1 — FOURIER-SERIES-ASSUMED-FINITE** *(Foundational)*
- Surface form: believing a periodic function's Fourier series can always be captured exactly using only finitely many terms.
- Root cause: overgeneralizing from prior, more elementary series contexts where a finite truncation is the practical norm.
- Repair: the square wave $f(x)=1$ on $(0,\pi)$, $f(x)=-1$ on $(-\pi,0)$ has Fourier series $\frac4\pi\left(\sin x+\frac{\sin(3x)}3+\frac{\sin(5x)}5+\cdots\right)$ — an INFINITE series of odd harmonics; no finite truncation exactly reproduces the sharp jumps, and even a many-term partial sum famously OVERSHOOTS near the jump (the Gibbs phenomenon) rather than eliminating the error.

**MC-2 — ORTHOGONALITY-INTEGRALS-TREATED-AS-ARBITRARY-FORMULAS** *(Foundational)*
- Surface form: treating the Fourier coefficient formulas as arbitrary rules to memorize, with no deeper reason they extract the correct value.
- Root cause: presented without connection to the underlying orthogonality mechanism, the formulas read as an isolated computational rule.
- Repair: for $f(x)=x$ on $(-\pi,\pi)$, computing $b_1=\frac1\pi\int_{-\pi}^\pi x\sin(x)\,dx=2$ via integration by parts is exactly the operation of multiplying the formal series by $\sin(x)$ and integrating — every term except the $n=1$ one vanishes by $\int\sin(x)\sin(nx)\,dx=0$ for $n\ne1$, leaving only the coefficient being solved for.

**MC-3 — FOURIER-COEFFICIENTS-TREATED-AS-UNRELATED-TO-ORTHOGONAL-PROJECTION** *(Moderate)*
- Surface form: believing computing Fourier coefficients is a separate technique unrelated to the general idea of projecting onto an orthogonal basis.
- Root cause: the inner-product framework connecting the two ideas belongs to a not-yet-authored concept, so without an explicit bridge, the parallel remains invisible.
- Repair: re-express the already-computed $b_1=2$ as $b_1=\frac1\pi\langle f,\sin(x)\rangle$ — the IDENTICAL computation, in inner-product notation — showing that finding a Fourier coefficient is the same operation as finding a vector's coordinate along one basis axis, applied to an infinite orthogonal set of functions.

## Analogies
- **The two-notations-one-computation analogy**: exactly like `math.trig.sum-difference-formulas`'s own product-to-sum derivation (the same algebraic content, viewed two ways), $b_1=2$ computed by direct integration and $b_1=\frac1\pi\langle f,\sin(x)\rangle$ computed via inner product are the SAME operation, re-expressed.
- **Anti-analogy — a Fourier series is NOT like a Taylor polynomial truncated for convenience.** This is MC-1's exact error, worth naming explicitly: a Taylor series' early terms often already give a good local approximation with more terms optional; a Fourier series' behavior near a discontinuity (the Gibbs phenomenon) does not improve toward exactness as more terms are added — it converges in a weaker sense while the overshoot persists.

## Demonstrations
1. **The genuinely-infinite square wave**: the Fourier series of a square wave, an infinite sum of odd harmonics, with the Gibbs phenomenon's persistent overshoot near the jump — directly breaking MC-1.
2. **The full coefficient computation with orthogonality-as-filter framing**: $f(x)=x$, computing $b_1=2$ via integration by parts, explicitly connecting the result to "every other term vanishes by orthogonality" — directly breaking MC-2.
3. **The inner-product re-expression**: the identical $b_1=2$ computation, rewritten as $\frac1\pi\langle f,\sin(x)\rangle$ — directly breaking MC-3 by showing the same computation under two notations.

## Discovery Questions
1. "Can the square wave's Fourier series be captured EXACTLY by any finite number of sine terms? What happens near the jump as more terms are added?"
2. "When you multiply the whole series by $\sin(x)$ and integrate, why does every term except the $n=1$ term vanish?"
3. "Is computing $b_1=\frac1\pi\int_{-\pi}^\pi x\sin(x)\,dx$ a completely different kind of operation from finding a vector's coordinate along one axis, or is it structurally the same thing?"

## Teaching Sequence
1. **Anchor in the three prerequisites**: restate `math.seq.series`'s infinite-sum machinery, `math.trig.trig-functions`'s periodic building blocks, and `math.calc.definite-integral`'s integration tools as the three ingredients this concept combines.
2. **Conflict evidence (breaks MC-1)**: the square-wave Fourier series and the Gibbs phenomenon, establishing the representation's genuine infinitude.
3. **Representation shift (breaks MC-2)**: the full coefficient computation, explicitly framing orthogonality as the mechanism that filters out every other term.
4. **Contrast pair (breaks MC-3, orientation level)**: the same computation re-expressed in inner-product notation, connecting to the `math.fnal.hilbert-space` framework this concept previews but does not develop.
5. **Mastery gate**: 4-item problem set (explaining the square wave's genuine infinitude; computing $a_1$ for $f(x)=x$ and predicting it should be zero via odd/even symmetry; explaining why multiplying by $\sin(2x)$ isolates $b_2$; connecting Fourier coefficients to orthogonal-basis coordinates) plus 1 cross-link-probe-mode transfer probe against `math.fnal.hilbert-space` (independence mode used instead — see Curriculum Feedback).

## Tutor Actions
- **Conflict evidence**: the square-wave series and the Gibbs phenomenon, establishing genuine infinitude.
- **Representation shift**: the full orthogonality-filtering coefficient computation.
- **Contrast pair**: the inner-product re-expression of the identical computation, at orientation level.
- **Mastery gate**, 4-item problem set plus 1 transfer probe engaging the heat-equation cross-link conceptually, without assuming its unauthored technical content.

## Voice Teaching Notes
- When first presenting the series, say explicitly "this is genuinely infinite — most functions need every single term, not just the first few" before showing any coefficient formula, pre-empting MC-1.
- For MC-2, narrate the filtering mechanism out loud whenever a coefficient is computed: "multiply by $\sin(nx)$, integrate — every OTHER frequency's term vanishes, leaving exactly this one."
- For MC-3, at orientation level only, say "this is the same move as finding a coordinate in a basis — just with infinitely many basis functions instead of finitely many vectors" without requiring the learner to have full Hilbert-space fluency.

## Assessment Signals
- **Early warning for MC-1**: assuming a finite number of terms will exactly reproduce a periodic function, or expressing confusion when told the representation genuinely never terminates.
- **Early warning for MC-2**: applying the coefficient formulas correctly but being unable to explain why they isolate one specific coefficient.
- **Early warning for MC-3**: treating the coefficient computation as unrelated to any broader structural idea when the inner-product framing is introduced.
- **Mastery evidence**: correctly explaining why a fresh orthogonality integral isolates its specific coefficient, and correctly connecting a fresh coefficient computation to the orthogonal-basis-projection framing without prompting.

## Tutor Recovery Strategy
- On MC-1: return to the Gibbs-phenomenon evidence with a fresh discontinuous function example, rather than simply re-asserting "it's infinite" — the misconception is about a missing concrete counterexample, not a missing definition.
- On MC-2: rework a fresh coefficient computation, requiring the orthogonality-filtering explanation to be stated explicitly before or alongside the numeric answer.
- On MC-3: re-walk the SAME computation already performed, now in inner-product notation, rather than introducing a new example — the misconception is about connecting two representations of one already-mastered computation, not about learning new content.
- If a learner correctly computes coefficients but cannot explain the orthogonality mechanism, treat the WHY-question as a distinct conceptual gap and route to dedicated explanation practice rather than more computation drills.

## Memory Hooks
- "Infinite in general — a finite sum only approximates" — for MC-1.
- "Multiply and integrate — every other term vanishes by orthogonality" — for MC-2.
- "Same computation, different notation — an inner product either way" — for MC-3.

## Transfer Connections
- **`math.seq.series`** (prerequisite, already authored): the infinite-sum machinery this concept's entire representation genuinely depends on.
- **`math.trig.trig-functions`** (prerequisite, already authored): the periodic sine/cosine building blocks at every integer frequency.
- **`math.calc.definite-integral`** (prerequisite, already authored): the integration machinery the coefficient formulas are computed with.
- **`math.fnal.hilbert-space`** (cross-linked, **unauthored — P76_mode: independence**): supplies the full inner-product/orthogonal-basis framework this concept previews only at orientation level; see Curriculum Feedback below for the Blueprint-staleness finding on this cross-link's stated mode.
- **`math.de.heat-equation`** (unlocked, unauthored): the concept's own transfer probe engages this target conceptually (Fourier decomposition as a natural first step toward solving heat-flow problems) without assuming its specific unauthored technical content.

## Cross-Subject Connections
- Cross-links to `math.de.heat-equation` (differential equations) and `math.fnal.hilbert-space` (functional analysis) are declared in the KG; neither is yet authored in this Educational Brain tree, so both are engaged only at a conceptual, forward-pointing level per this program's established handling of unauthored cross-link targets.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.calc.fourier-series-intro.md` (mixed-numbering format — Components 0-8 and 10 present, Component 9 intentionally omitted). All three worked examples (the square-wave Gibbs-phenomenon demonstration, the full $b_1=2$ orthogonality computation, the inner-product re-expression), the complete misconception registry (MC-1 Foundational, MC-2 Foundational, MC-3 Moderate, none carrying an explicit birth-type column), and the transfer probe are reused by reference, never restated verbatim beyond the minimal illustrative excerpts above.
- Blueprint metadata (`requires`, `unlocks: [math.de.heat-equation]`, `cross_links: [math.de.heat-equation, math.fnal.hilbert-space]`, `difficulty`, `bloom`, `mastery_threshold`, `estimated_hours`) verified against the live KG — see Curriculum Feedback below: zero KG-field discrepancy, but one genuine P76-mode staleness finding.
- Transfer probe (independence mode used instead of the Blueprint's stated cross-link-probe mode — see Curriculum Feedback): "Recall that an orthonormal basis lets you decompose any vector into a sum of coordinate-times-basis-vector terms, each coordinate found via an inner product. (a) Explain precisely how the Fourier series is exactly this kind of decomposition, with $\{1,\cos(x),\sin(x),\ldots\}$ playing the role of an orthogonal basis for a suitable space of periodic functions. (b) Explain why the coefficient formulas divide by $\pi$, referencing $\int_{-\pi}^\pi\sin^2(nx)\,dx$ (each basis function's own squared 'length'). (c) Explain, in general terms, why representing a temperature distribution as a Fourier series might be a natural first step toward solving a heat-flow problem." *(Expected: (a) each coefficient is an inner-product projection onto one basis function, exactly paralleling vector-coordinate extraction. (b) $\int_{-\pi}^\pi\sin^2(nx)\,dx=\pi$ for every $n\ge1$ — dividing by this squared length normalizes the projection, exactly as dividing by a basis vector's squared length normalizes an ordinary coordinate extraction. (c) decomposing a temperature distribution into simple sine/cosine "modes" lets each mode's time-evolution be tracked independently, since the heat equation acts on each frequency component in a simple, separable way — a preview only, not requiring `math.de.heat-equation`'s own specific content.)*

## Runtime Asset References
- No AssetIdentity (ADR 14) explanation or probe assets exist yet for this concept in `src/lib/teaching/assets/`. Per this program's established layer-ownership boundary, Layer 3/7 (DB-backed serving assets) is out of scope for this Educational Brain authoring campaign — this entry is Layer 2 (Educational Brain) content only.

## Curriculum Feedback
- **Zero KG-field metadata discrepancy** for `requires`, `unlocks`, `cross_links`, `difficulty`, `bloom`, `mastery_threshold`, and `estimated_hours` — every field in the Blueprint's Component 0 metadata table matches the live KG exactly (verified by direct Python query against `docs/mathematics/kg/graph.json`).
- **One genuine Blueprint-staleness finding on P76 mode, resolved by using independence mode instead (not fixed in the Blueprint)**: the Blueprint declares `P76_mode = cross-link probe` against `math.fnal.hilbert-space`, describing it as "already authored" — but per this program's own established authoring-check convention (Blueprint-file-existence is NOT sufficient; an Educational-Brain-entry-existence check is required), `math.fnal.hilbert-space` has a Blueprint on disk but **no Educational Brain entry** (the entire `math.fnal` domain is unstarted, 0/18). This is the same staleness pattern already documented for `math.calc.sequence-limits`' own cross-link to `math.seq.convergent` (Batch 53) and the `math.opt.*` cross-links in Batch 48 — independence mode is used instead, per that established precedent.
- This closes math.calc's final currently-ready concept on the math.trig/math.seq cross-domain excursion's own downstream chain (begun Batch 52) — the 10 remaining `math.calc` concepts all require prerequisites beyond this campaign's current authored set.

## Version History
- **2026-09-12 (Batch 58)**: authored as part of the Mathematics Educational Brain completion campaign. Unblocked by the already-authored `math.calc.definite-integral`, `math.trig.trig-functions`, and `math.seq.series`, all long-authored. `math.calc` moves from 65/76 to 66/76 this batch.
