# math.trig.trig-graphs — Graphs of Trigonometric Functions

## Identity
- **KG id**: `math.trig.trig-graphs`
- **Domain**: math.trig (Trigonometry)
- **Requires**: `math.trig.amplitude-period-phase`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: proficient · **Bloom level**: apply
- **Mastery threshold**: 0.8 · **Estimated hours**: 5

## Learning Objective
The learner sketches $y=\sin x$, $y=\cos x$, and $y=\tan x$ over one full period (labeling zeros, maxima, minima, and — for tan — vertical asymptotes), applies the five-key-point algorithm to sketch any transformed sinusoidal function, and explains why cos is a phase-shifted version of sin and why tan has period $\pi$.

## Core Understanding
`math.trig.amplitude-period-phase` establishes the four-parameter transformation framework and the five-key-point sketching algorithm in the abstract. This concept applies that framework concretely to the three base graphs and their transformations.

The **base graph key features**: $y=\sin x$ starts at $(0,0)$, rises to a maximum at $(\pi/2,1)$, returns to zero at $\pi$, falls to a minimum at $(3\pi/2,-1)$, and closes at $(2\pi,0)$ — amplitude 1, period $2\pi$, no asymptotes. $y=\cos x$ has the SAME amplitude and period but starts at its MAXIMUM, $(0,1)$ — the single most important visual distinction from sin — related analytically by $\cos x=\sin(x+\pi/2)$ (cos is sin shifted $\pi/2$ to the LEFT).

$y=\tan x$ is structurally different: it has **period $\pi$, not $2\pi$**, because $\tan x=\sin x/\cos x$ is undefined wherever $\cos x=0$ — at $x=\pi/2+k\pi$, spaced exactly $\pi$ apart — and each such zero of cosine generates a new vertical asymptote. Between consecutive asymptotes, tan rises smoothly from $-\infty$ to $+\infty$, crossing zero at the midpoint.

Applying the **five-key-point algorithm** from `amplitude-period-phase` to a transformed sinusoid $y=A\sin(Bx+C)+D$: compute amplitude, period $T=2\pi/|B|$, phase shift $\varphi=-C/B$, and midline $D$; the five points are $\varphi,\varphi+T/4,\varphi+T/2,\varphi+3T/4,\varphi+T$, with $y$-values $D,D+A,D,D-A,D$ (for sine). For a transformed TANGENT $y=A\tan(Bx+C)$, the same parameter logic applies differently: period $T=\pi/|B|$ (not $2\pi/|B|$), and asymptotes occur where $Bx+C=\pi/2+k\pi$.

## Mental Models
- **Cos is sin, shifted — not a different shape.** The two curves share amplitude and period exactly; the only difference is where the cycle "starts," which is fully explained by $\cos x=\sin(x+\pi/2)$.
- **Tangent's period comes from where cosine is zero, not from any property of tan itself directly.** Since $\tan x=\sin x/\cos x$, every zero of $\cos x$ (spaced $\pi$ apart) forces a new asymptote — the period-$\pi$ fact is a direct consequence of cosine's own zero-spacing.
- **The five-key-point algorithm is one tool, reused everywhere.** The same five-step procedure from `amplitude-period-phase` sketches any transformed sine or cosine graph; tangent needs only the asymptote-location adjustment layered on top.

## Why Students Fail
All three of this Blueprint's misconceptions are independently classified here, since the Blueprint supplies a "Trigger" column rather than a birth-type column:
- **MC-1** is a **Type 1 (overgeneralization)**: having just learned sin and cos both have period $2\pi$, a learner reasonably but incorrectly extends "all trig functions have period $2\pi$" to tan, without separately verifying tan's own structurally different behavior.
- **MC-2** is a **Type 1 (overgeneralization)**: sin and cos share nearly every visual property (amplitude, period, general wave shape), so a learner may assume they are visually identical curves, missing the one genuine difference (starting value) between them.
- **MC-3** is a **Type 3 (language contamination)**: the visual "+" sign in $\sin(x+C)$ suggests "more" or "rightward" in everyday usage, but the true transformation (per `amplitude-period-phase`'s own $-C/B$ formula) requires an inverted reading.

## Misconceptions
**MC-1 — TANGENT-PERIOD-2PI** *(Foundational)*
- Surface form: graphing $\tan x$ with one full period spanning $[0,2\pi]$ rather than $[0,\pi]$.
- Root cause: overgeneralizing sin and cos's shared period-$2\pi$ property onto tan without separately verifying it.
- Repair: mark two consecutive vertical asymptotes of $\tan x$ — they occur at $-\pi/2$ and $\pi/2$, exactly $\pi$ apart, since $\cos x=0$ at those two points and nowhere in between — confirming the period is $\pi$, not $2\pi$.

**MC-2 — COS-STARTS-ZERO** *(High)*
- Surface form: drawing $\cos x$ starting at $y=0$ (treating it like $\sin x$), missing the initial maximum at $(0,1)$.
- Root cause: sin and cos share nearly every other visual property, so the one genuine difference (starting value) is easy to overlook.
- Repair: on the unit circle at $\theta=0$, the point is $(1,0)$ — cos is the x-coordinate ($=1$), sin is the y-coordinate ($=0$) — so cos genuinely starts at its maximum while sin starts at zero, a direct consequence of the unit-circle definitions, not an arbitrary rule.

**MC-3 — PHASE-SHIFT-DIRECTION** *(Moderate)*
- Surface form: shifting the graph right when the equation indicates a left shift, or vice versa.
- Root cause: the visual "+" sign suggests rightward motion in everyday intuition, opposite the true $-C/B$ transformation `amplitude-period-phase` already establishes.
- Repair: factor first — $\sin(x+\pi/2)=\sin(x-(-\pi/2))$ — confirming the shift is $-\pi/2$, a LEFT shift, directly reusing `amplitude-period-phase`'s own factoring technique rather than reading the sign visually.

## Analogies
- **The one-tool-many-graphs analogy**: exactly like `amplitude-period-phase`'s own four independent parameters, this concept's five-key-point algorithm is a single reusable procedure applied identically to every transformed sine or cosine graph.
- **Anti-analogy — sin and cos are NOT visually identical curves.** This is MC-2's exact error, worth naming explicitly: despite sharing amplitude, period, and general shape, the two curves genuinely start at different points and this difference propagates through every transformation.

## Demonstrations
1. **The three reference graphs with key features**: $\sin x$, $\cos x$, $\tan x$ over $[0,2\pi]$ (or $(-\pi/2,\pi/2)$ for tan), with all zeros, extrema, and asymptotes explicitly labeled — grounding MC-1 and MC-2's corrections in one shared visual.
2. **The five-key-point sketch applied to a fresh transformed sinusoid**: $y=2\sin(x-\pi/4)$, producing the five points $(\pi/4,0),(3\pi/4,2),(5\pi/4,0),(7\pi/4,-2),(9\pi/4,0)$ — directly instantiating `amplitude-period-phase`'s own algorithm.
3. **The sin-versus-cos side-by-side contrast**: identical amplitude and period, different starting value, verified analytically via $\cos x=\sin(x+\pi/2)$ — directly breaking MC-2.

## Discovery Questions
1. "Where are the first two vertical asymptotes of $\tan x$ on either side of the origin? How far apart are they?"
2. "At $x=0$, is $\cos x$ equal to $0$ or to $1$? What about $\sin x$? Why do they differ?"
3. "For $y=\sin(x+\pi/2)$, does the graph shift left or right? What does factoring the argument tell you?"

## Teaching Sequence
1. **Anchor in `math.trig.amplitude-period-phase`**: restate the five-key-point algorithm and the four-parameter transformation framework as the tools this concept applies to concrete base graphs.
2. **Representation shift (breaks MC-1, MC-2)**: the three reference graphs with fully labeled key features, ending in the summary comparison table (period, amplitude, starting value, asymptotes).
3. **Pattern induction**: the equation-to-graph and graph-to-equation gallery, applying the five-key-point algorithm and the tangent-specific asymptote formula.
4. **Contrast pair (breaks MC-2)**: the sin-versus-cos side-by-side comparison, verified analytically via $\cos x=\sin(x+\pi/2)$.
5. **Mastery gate**: 4-item problem set (a full transformed-cosine sketch with five key points; a reverse-construction problem from given amplitude/period/first-maximum; a transformed-tangent sketch with asymptotes; an analytic verification that $-\sin(x+\pi)=\sin x$) plus 1 independence-mode transfer probe (an EEG signal problem with an embedded intermediate-value interpretation task).

## Tutor Actions
- **Representation shift**: the three reference graphs with fully labeled key features and the summary comparison table.
- **Pattern induction**: the equation-to-graph gallery, including the tangent-specific asymptote formula.
- **Contrast pair** (MC-2): the sin-versus-cos side-by-side comparison, verified analytically.
- **Mastery gate**, 4-item problem set plus 1 transfer probe with an embedded interpretation task.

## Voice Teaching Notes
- When first introducing tangent's graph, say explicitly "tangent's period is $\pi$, not $2\pi$ — its asymptotes come from cosine's zeros, which are $\pi$ apart" before sketching, pre-empting MC-1.
- For MC-2, say "cos starts at the TOP" as a fixed phrase every time cosine's graph is introduced or reviewed, anchoring the one genuine difference from sine.
- For MC-3, reuse `amplitude-period-phase`'s own "factor first, then read the shift" phrase whenever a phase shift's direction is in question.

## Assessment Signals
- **Early warning for MC-1**: sketching tangent's asymptotes $2\pi$ apart instead of $\pi$ apart.
- **Early warning for MC-2**: drawing cosine's graph starting at $(0,0)$ rather than $(0,1)$.
- **Early warning for MC-3**: shifting a graph in the direction visually suggested by the sign of $C$ rather than the computed $-C/B$ value.
- **Mastery evidence**: correctly sketching a fresh transformed sinusoid (sine, cosine, or tangent) from its equation without prompting, and correctly reading an equation's key parameters back off a given graph.

## Tutor Recovery Strategy
- On MC-1: return to the cosine-zeros-generate-asymptotes argument with a fresh tangent transformation, rather than simply restating "period is $\pi$" — the misconception is about a missing causal link, not a missing fact.
- On MC-2: rework the unit-circle-at-$\theta=0$ argument with a fresh comparison point, reinforcing that the starting-value difference is a structural fact, not an arbitrary convention to memorize.
- On MC-3: reuse `amplitude-period-phase`'s own factoring repair with a fresh sign example — the misconception is identical to that concept's own MC-2, recurring here in the graphing context.
- If a learner correctly sketches sine and cosine but fails every tangent problem, treat tangent's asymptote-and-period structure as a distinct sub-skill and route to dedicated tangent practice.

## Memory Hooks
- "Cosine's zeros are $\pi$ apart — so are tangent's asymptotes" — for MC-1.
- "Cos starts at the top" — for MC-2.
- "Factor first, then read the shift" — for MC-3 (reused from `amplitude-period-phase`).

## Transfer Connections
- **`math.trig.amplitude-period-phase`** (prerequisite, already authored): the four-parameter framework and five-key-point algorithm this concept applies concretely to the three base graphs.
- **`math.trig.trig-functions`** (grandparent prerequisite, already authored): the original periodicity and value tables this concept's graphs visually instantiate.
- **`math.calc.fourier-series-intro`** (sibling, authored this same batch): the Blueprint's own completion note names Fourier series and signal-processing applications as a natural extension of graphing periodic functions — a genuine forward connection, not developed further here.

## Cross-Subject Connections
- No cross-links are declared in the KG for this concept (`cross_links: []`); the Blueprint's own transfer probe uses an EEG signal context purely as an application vehicle, not a formal cross-subject curriculum link, consistent with the KG's own record.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.trig.trig-graphs.md` (primitive-numbered format — P11/P04/P06/P91/P27/P41/P64/P89 scaffolding). All worked examples (the three reference graphs, the transformed-sinusoid gallery, the sin-versus-cos contrast), the complete misconception registry (MC-1 Foundational, MC-2 High, MC-3 Moderate), and the EEG transfer probe are reused by reference, never restated verbatim beyond the minimal illustrative excerpts above.
- Blueprint metadata (`requires`, `cross_links: none`, `difficulty`, `bloom`, `mastery_threshold`, `estimated_hours`) verified against the live KG — see Curriculum Feedback below: **zero technical discrepancy** (the Blueprint's own "Unlocks" prose is descriptive, naming no specific concept id, and does not contradict the KG's empty `unlocks` field).
- Independent transfer probe (independence mode, per the Blueprint's own stated `P76_mode: independence`): "An EEG signal is modeled by $y=3\sin(16\pi t+\pi/3)$ µV, where $t$ is in seconds. (a) Find the amplitude, frequency (Hz), and phase shift in seconds. (b) At $t=0$, is the signal at a zero, maximum, minimum, or intermediate value? Determine the exact value." *(Expected: (a) Amplitude $=3$ µV; $B=16\pi$, period $=\frac{2\pi}{16\pi}=\frac18$ s, frequency $=8$ Hz; phase shift $=-\frac{\pi/3}{16\pi}=-\frac1{48}$ s (left). (b) $y(0)=3\sin(\pi/3)=3\cdot\frac{\sqrt3}2=\frac{3\sqrt3}2\approx2.598$ µV — an intermediate positive value.)*

## Runtime Asset References
- No AssetIdentity (ADR 14) explanation or probe assets exist yet for this concept in `src/lib/teaching/assets/`. Per this program's established layer-ownership boundary, Layer 3/7 (DB-backed serving assets) is out of scope for this Educational Brain authoring campaign — this entry is Layer 2 (Educational Brain) content only.

## Curriculum Feedback
- **Zero technical Blueprint/KG metadata discrepancy** for `requires`, `unlocks`, `cross_links`, `difficulty`, `bloom`, `mastery_threshold`, and `estimated_hours` — every field in the Blueprint's Component 0 metadata table matches the live KG exactly (verified by direct Python query against `docs/mathematics/kg/graph.json`). This concept RESOLVES the `unlocks`-field asymmetry recorded in `math.trig.amplitude-period-phase`'s own Curriculum Feedback (Batch 57): that entry's Blueprint names `math.trig.trig-graphs` as unlocked, and this concept's own `requires` field genuinely confirms `amplitude-period-phase` as its prerequisite — the KG relationship holds in both directions even though only one side's `unlocks` field records it. The Blueprint's own completion note ("Unlocks: Fourier series; signal processing applications; inverse trig functions graphically") is descriptive prose naming no specific concept id — not counted as a further metadata mismatch.

## Version History
- **2026-09-12 (Batch 58)**: authored as part of the Mathematics Educational Brain completion campaign. Unblocked by the already-authored `math.trig.amplitude-period-phase` (Batch 57) — closes the `unlocks`-field asymmetry that entry's own Curriculum Feedback recorded, since `trig-graphs` is exactly the downstream consumer that relationship predicted. `math.trig` moves from 15/25 to 16/25 this batch.
