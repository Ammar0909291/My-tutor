# math.trig.amplitude-period-phase — Amplitude, Period, Phase Shift

## Identity
- **KG id**: `math.trig.amplitude-period-phase`
- **Domain**: math.trig (Trigonometry)
- **Requires**: `math.trig.trig-functions`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: proficient · **Bloom level**: apply
- **Mastery threshold**: 0.8 · **Estimated hours**: 6

## Learning Objective
The learner extracts amplitude, period, phase shift, and vertical shift from $y=A\sin(Bx+C)+D$ and its cosine counterpart, applies the four-parameter formula to describe compression, reflection, translation, and vertical shift, and produces a sketch by transforming five key points.

## Core Understanding
`math.trig.trig-functions` establishes the base graphs $y=\sin x$ and $y=\cos x$ — amplitude 1, period $2\pi$, no shift. This concept treats the standard form $y=A\sin(Bx+C)+D$ as four independent transformations layered on that base graph, each controlled by exactly one parameter:

| Parameter | Formula | Effect |
|---|---|---|
| **Amplitude** | $\lvert A\rvert$ | Vertical stretch/compression; reflection if $A<0$ |
| **Period** | $\frac{2\pi}{\lvert B\rvert}$ | Horizontal compression ($B>1$) or stretch ($0<B<1$) |
| **Phase shift** | $-\frac{C}{B}$ | Horizontal translation |
| **Vertical shift** | $D$ | Moves the midline from $y=0$ to $y=D$ |

The **period** formula is not $B$ itself — it is $\frac{2\pi}{\lvert B\rvert}$, since $B$ is a rate multiplier (how many cycles fit where one used to) rather than a length. The **phase shift** formula requires factoring $B$ out first: rewriting $Bx+C$ as $B\left(x+\frac{C}{B}\right)$ shows the shift is read as $x-\left(-\frac{C}{B}\right)$, so the shift is $-\frac{C}{B}$, not the bare value $C$ — a POSITIVE $C$ therefore produces a shift to the LEFT, the opposite of what the sign might visually suggest. The **amplitude** is always $\lvert A\rvert$: a negative $A$ flips the graph vertically (a reflection) but the wave's actual height above and below the midline is a distance, which cannot be negative.

Sketching uses a **five-key-point algorithm**: compute amplitude, period $T$, phase shift $\varphi=-C/B$, and midline $D$; locate the starting point at $x=\varphi$; mark four further points at $\varphi+T/4,\varphi+T/2,\varphi+3T/4,\varphi+T$; assign $y$-values $D,D+A,D,D-A,D$ (for sine with $A>0$); connect with a smooth curve.

## Mental Models
- **Four independent knobs, four independent formulas.** Each of $A$, $B$, $C$, $D$ controls exactly one visual property, and none of the four formulas is "just the parameter itself" except $D$.
- **$B$ is a speed multiplier, not a length.** $B=4$ means the wave runs four times faster, completing four cycles where $B=1$ completes one — so the period must be DIVIDED by $B$, not equated to it.
- **Factor before reading the shift.** Rewriting $Bx+C=B(x+C/B)$ makes the shift readable directly as $-C/B$ — skipping this factoring step is the single most reliable route to a sign error.

## Why Students Fail
All three of this Blueprint's misconceptions are independently classified here, since the Blueprint supplies a "Trigger" column rather than a birth-type column:
- **MC-1** is a **Type 4 (notation-induced)**: on a graph, counting cycles per $2\pi$ directly gives $B$, and $B$ is visually adjacent to the period concept in every worked problem, so the two are easily conflated without the explicit division step.
- **MC-2** is a **Type 3 (language contamination)**: a "+" sign in $Bx+C$ visually suggests "rightward" or "more," but the correct reading requires an inverted, divided transformation ($-C/B$) that has no visual resemblance to the symbol itself.
- **MC-3** is a **Type 1 (overgeneralization)**: in most everyday numerical contexts, a quantity's "size" and its signed value are the same thing, so applying that same intuition to amplitude — a genuinely unsigned, distance-like quantity — produces the wrong answer whenever $A$ is negative.

## Misconceptions
**MC-1 — PERIOD-IS-B** *(Foundational)*
- Surface form: stating the period equals $B$ itself, ignoring the $\frac{2\pi}{\lvert B\rvert}$ formula.
- Root cause: $B$ is visually read directly off cycle-counting, and the required division step is easy to skip under the notation's surface similarity.
- Repair: for $y=\sin(4x)$, count how many full cycles fit in $[0,2\pi]$ — four — so each individual cycle occupies $\frac{2\pi}{4}=\frac\pi2$, confirming the period is DIVIDED by $B$, not equal to it.

**MC-2 — PHASE-SHIFT-SIGN** *(High)*
- Surface form: reading the phase shift as bare $C$ rather than $-C/B$ — e.g., treating $y=\sin(x+\pi/3)$ as a rightward shift of $\pi/3$.
- Root cause: the visual "+" sign suggests rightward motion, but the true transformation requires negating and dividing.
- Repair: factor first — $x+\pi/3=x-(-\pi/3)$ — so the shift is $-\pi/3$, a shift to the LEFT; the factoring step makes the sign inversion mechanical rather than intuitive-and-error-prone.

**MC-3 — AMPLITUDE-IGNORES-SIGN** *(Moderate)*
- Surface form: stating amplitude $=-2$ for $y=-2\sin(x)$, treating the coefficient's sign as part of the amplitude.
- Root cause: overgeneralizing everyday numerical "size equals signed value" intuition onto a genuinely unsigned quantity.
- Repair: amplitude answers "how far does the wave travel from the midline?" — a distance, always non-negative — so $y=-2\sin(x)$ has amplitude $2$ (the reflection is a separate, orientation-only fact carried by the sign, not folded into the amplitude itself).

## Analogies
- **The speed-multiplier analogy for $B$**: exactly like `math.trig.trig-functions`' own periodicity, but now scaled — running the same wave-generating process $B$ times faster compresses the period by a factor of $B$.
- **Anti-analogy — the "+" sign is NOT a direction indicator.** This is MC-2's exact error, worth naming explicitly: unlike ordinary language where "+3" reads as "more" or "further right," the phase-shift formula's own negation makes the visual sign of $C$ an unreliable guide to the shift's actual direction.

## Demonstrations
1. **Parameters table with a worked full example**: $y=3\sin(2x-\pi/6)+1$ — extracting amplitude $3$, period $\pi$ (via $2\pi/2$), phase shift $\pi/12$ right (via factoring $2x-\pi/6=2(x-\pi/12)$), and vertical shift $1$ — grounding all four formulas in one concrete worked case.
2. **Five-key-point sketch**: $y=2\sin(2x-\pi/2)$ — phase shift $\pi/4$, period $\pi$, points at $(\pi/4,0),(\pi/2,2),(3\pi/4,0),(\pi,-2),(5\pi/4,0)$ — making the sketching algorithm concrete and repeatable.
3. **The sign-contrast pair**: $y=2\sin(x+\pi/4)$ (shift $-\pi/4$, i.e. LEFT) versus $y=2\sin(x-\pi/4)$ (shift $+\pi/4$, i.e. RIGHT) — same $A$ and $B$, opposite $C$, directly isolating MC-2's sign confusion.

## Discovery Questions
1. "If $B=4$ in $y=\sin(4x)$, how many full cycles fit in $[0,2\pi]$? Does that mean the period IS $4$, or something else?"
2. "For $y=\sin(x+\pi/2)$, does the graph shift left or right? What does factoring $x+\pi/2=x-(-\pi/2)$ tell you?"
3. "What is the amplitude of $y=-3\sin(x)$? Is it $-3$, or something else — and why?"

## Teaching Sequence
1. **Anchor in `math.trig.trig-functions`**: restate the base graphs $y=\sin x$, $y=\cos x$ (amplitude 1, period $2\pi$, no shift) as the reference this concept's four transformations are layered onto.
2. **Representation shift (breaks MC-1)**: the full worked parameters-table example, explicitly performing the $2\pi/\lvert B\rvert$ division step and the factoring step for phase shift.
3. **Pattern induction**: the equation-to-parameters gallery plus the five-key-point sketching algorithm, worked through one concrete example.
4. **Contrast pair (breaks MC-2)**: the sign-contrast pair (same $A,B$, opposite $C$), ending with the explicit "the shift OPPOSES the sign of $C$" rule.
5. **Mastery gate**: 4-item problem set (two full parameter-extraction problems; a reverse problem constructing an equation from given amplitude/period/phase shift; a verification problem using the sine sum formula to confirm $\sin(2x+\pi)=-\sin(2x)$) plus 1 independence-mode transfer probe (a sound-wave physics problem with an embedded frequency and phase-lag interpretation task).

## Tutor Actions
- **Representation shift**: the full worked parameters-table example with explicit period-division and phase-factoring steps.
- **Pattern induction**: the equation-to-parameters gallery and the five-key-point sketching algorithm.
- **Contrast pair** (MC-2): the sign-contrast pair isolating the phase-shift sign inversion.
- **Mastery gate**, 4-item problem set plus 1 transfer probe with an embedded physical-interpretation task.

## Voice Teaching Notes
- When $B$ is first extracted from an equation, immediately ask "so what's the period?" before moving on — never letting $B$ itself stand in for the period, directly targeting MC-1.
- For MC-2, say the fixed phrase "factor first, then read the shift" every time a phase shift is computed, making the factoring step a spoken habit rather than an optional shortcut.
- For MC-3, say "amplitude is a distance — always positive" whenever a negative $A$ appears, distinguishing the reflection (a separate, orientation-only fact) from the amplitude itself.

## Assessment Signals
- **Early warning for MC-1**: stating the period as the bare value of $B$ without the division step.
- **Early warning for MC-2**: reading a phase shift's direction directly from the visual sign of $C$ without factoring first.
- **Early warning for MC-3**: reporting a negative amplitude for an equation with negative $A$.
- **Mastery evidence**: correctly extracting all four parameters from a fresh, unseen equation without prompting, and correctly constructing an equation from a given set of target parameters (the reverse direction).

## Tutor Recovery Strategy
- On MC-1: re-derive the period from a fresh $B$ value via the cycle-counting argument (how many cycles fit in $2\pi$), rather than simply restating the formula — the misconception is about a missing division step, not a missing formula.
- On MC-2: rework a fresh sign-contrast pair (different $C$ values than already seen), always requiring the factoring step to be shown explicitly before any direction is stated.
- On MC-3: return to the "amplitude is a distance" framing with a fresh negative-$A$ example, distinguishing the graph's reflection (real, sign-dependent) from its amplitude (unsigned) as two separate facts.
- If a learner correctly extracts parameters from equations but fails to construct equations from target parameters, treat the reverse-direction skill as a distinct gap and route to dedicated reverse-construction practice.

## Memory Hooks
- "$B$ is a speed multiplier — divide, don't copy" — for MC-1.
- "Factor first, then read the shift — the sign flips" — for MC-2.
- "Amplitude is a distance — always positive" — for MC-3.

## Transfer Connections
- **`math.trig.trig-functions`** (prerequisite, already authored): the base graphs and periodicity this concept's four-parameter transformation is layered directly onto.
- **`math.trig.trig-graphs`** (not yet authored): genuinely requires this concept per the live KG (`trig-graphs.requires` lists `amplitude-period-phase`), though that relationship is not mirrored onto this concept's own `unlocks` field — see Curriculum Feedback below.
- **`math.trig.trig-identities`** (sibling, already authored): the sum formula this concept's own mastery-gate Problem 4 uses to verify $\sin(2x+\pi)=-\sin(2x)$ algebraically.

## Cross-Subject Connections
- No cross-links are declared in the KG for this concept (`cross_links: []`); the Blueprint's own transfer probe uses a sound-wave physics context (pressure, frequency, phase lag) purely as an application vehicle, not a formal cross-subject curriculum link, consistent with the KG's own record.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.trig.amplitude-period-phase.md` (primitive-numbered format — P11/P04/P06/P91/P27/P41/P64/P89 scaffolding). All worked examples (the full parameters-table worked case, the five-key-point sketch, the sign-contrast pair), the complete misconception registry (MC-1 Foundational, MC-2 High, MC-3 Moderate), and the sound-wave transfer probe are reused by reference, never restated verbatim beyond the minimal illustrative excerpts above.
- Blueprint metadata (`requires`, `cross_links: none`, `difficulty`, `bloom`, `mastery_threshold`, `estimated_hours`) verified against the live KG — see Curriculum Feedback below for the one genuine `unlocks` discrepancy found.
- Independent transfer probe (independence mode, per the Blueprint's own stated `P76_mode: independence`): "A sound wave is modeled by $y=5\sin(800\pi t-\pi/4)$, where $y$ is pressure in Pa and $t$ is time in seconds. (a) Identify the amplitude and explain its physical meaning. (b) Find the frequency of the wave (frequency $=1/\text{period}$). (c) Find the phase shift and explain whether the wave leads or lags a reference wave $y=5\sin(800\pi t)$." *(Expected: (a) Amplitude $=5$ Pa, the maximum pressure variation from atmospheric equilibrium. (b) $B=800\pi$, period $=\frac{2\pi}{800\pi}=\frac1{400}$ s, frequency $=400$ Hz. (c) Phase shift $=-\frac{-\pi/4}{800\pi}=\frac1{3200}>0$ (rightward) — the wave LAGS the reference, reaching its peaks slightly later.)*

## Runtime Asset References
- No AssetIdentity (ADR 14) explanation or probe assets exist yet for this concept in `src/lib/teaching/assets/`. Per this program's established layer-ownership boundary, Layer 3/7 (DB-backed serving assets) is out of scope for this Educational Brain authoring campaign — this entry is Layer 2 (Educational Brain) content only.

## Curriculum Feedback
- **One genuine `unlocks`-field discrepancy found, resolved toward the KG (not fixed)**: the Blueprint's Component 4/Component 7 sections state "Unlocks: `math.trig.trig-graphs`," and that concept genuinely exists in the live KG with `amplitude-period-phase` genuinely listed in ITS OWN `requires` field — but the live KG's `unlocks` field for THIS concept is empty (`[]`). This is the same `requires`/`unlocks` asymmetry class already documented three times this campaign (`math.alg.exponential-equations`/`logarithm` Batch 16, `math.alg.inequality-2var` Batch 4, `math.trig.special-angles`/`basic-ratios` Batch 56). Not fixed (no KG file modified this batch); this entry's Identity section states `unlocks: none` per the KG, matching this program's standing rule.

## Version History
- **2026-09-12 (Batch 57)**: authored as part of the Mathematics Educational Brain completion campaign. Unblocked by the already-authored `math.trig.trig-functions` (Batch 54). One of four `math.trig` concepts authored this batch (companions: `math.trig.special-angles`, `math.trig.reciprocal-identities`, `math.trig.sum-difference-formulas`). `math.trig` moves from 12/25 to 13/25 this batch.
