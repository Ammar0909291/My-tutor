# math.trig.half-angle-formulas — Half-Angle Formulas

## Identity
- **KG id**: `math.trig.half-angle-formulas`
- **Domain**: math.trig (Trigonometry)
- **Requires**: `math.trig.double-angle-formulas`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: proficient · **Bloom level**: apply
- **Mastery threshold**: 0.75 · **Estimated hours**: 3

## Learning Objective
The learner derives $\sin(\theta/2)=\pm\sqrt{\frac{1-\cos\theta}{2}}$ and $\cos(\theta/2)=\pm\sqrt{\frac{1+\cos\theta}{2}}$ from `math.trig.double-angle-formulas`'s own power-reducing identities via the substitution $2\alpha=\theta$, determines the correct $\pm$ sign from the quadrant of $\theta/2$ (not $\theta$), and applies the formulas — including the sign-safe rationalized tangent form — to compute exact values at non-standard angles.

## Core Understanding
`math.trig.double-angle-formulas` already derived the power-reducing identities $\sin^2\theta=\frac{1-\cos2\theta}{2}$ and $\cos^2\theta=\frac{1+\cos2\theta}{2}$. This concept does not re-derive those — it performs the SAME substitution technique double-angle-formulas itself used ($A=B=\theta$), run in the opposite direction: setting $\theta=2\alpha$ (equivalently $\alpha=\theta/2$) to read the power-reducing identities backward as half-angle formulas.

**The half-angle formulas fall out of substituting $2\alpha=\theta$ into the already-known power-reducing identities**: starting from $\sin^2\theta=\frac{1-\cos2\theta}{2}$ and $\cos^2\theta=\frac{1+\cos2\theta}{2}$, let $\alpha=\theta/2$ so $2\alpha=\theta$. Replacing $\theta$ with $\alpha$ and $2\theta$ with $\theta$ throughout: $\sin^2(\theta/2)=\frac{1-\cos\theta}{2}$ and $\cos^2(\theta/2)=\frac{1+\cos\theta}{2}$. Taking square roots: $\sin(\theta/2)=\pm\sqrt{\frac{1-\cos\theta}{2}}$, $\cos(\theta/2)=\pm\sqrt{\frac{1+\cos\theta}{2}}$ — this derivation is exactly the double-angle derivation read backward, since $\cos2\alpha=1-2\sin^2\alpha$ rearranges directly to $\sin^2\alpha=\frac{1-\cos2\alpha}{2}$.

**The $\pm$ sign is determined by the quadrant of $\theta/2$, not the quadrant of $\theta$ — these can genuinely differ**: if $\theta=270°$ (in Q3), then $\theta/2=135°$, which is in Q2, where $\sin$ is positive. Determining the sign requires computing $\theta/2$ NUMERICALLY first, then checking which quadrant that specific value lands in — the quadrant of $\theta$ itself carries no direct information about the quadrant of $\theta/2$.

**The rationalized tangent form avoids the sign question entirely**: $\tan(\theta/2)=\frac{\sin\theta}{1+\cos\theta}=\frac{1-\cos\theta}{\sin\theta}$ carries its own correct sign automatically, via the signs of its numerator and denominator, without requiring a separate quadrant check — a genuine practical advantage over the radical form $\tan(\theta/2)=\pm\sqrt{\frac{1-\cos\theta}{1+\cos\theta}}$.

**A boundary check at $\theta=0$ distinguishes which formula is which**: at $\theta=0$, $\sin(0)=0$ and $\cos(0)=1$. Testing $\frac{1-\cos0}{2}=0$ matches $\sin(0/2)=\sin(0)=0$, confirming $(1-\cos\theta)$ belongs to the SINE formula; testing $\frac{1+\cos0}{2}=1$ matches $\cos(0/2)=\cos(0)=1$, confirming $(1+\cos\theta)$ belongs to the COSINE formula — a reliable check whenever the two forms are confused.

## Mental Models
- **Read the double-angle derivation backward.** The half-angle formulas are not new content — they are the power-reducing identities' own equation solved for the half-angle instead of the full angle, via one substitution.
- **Check the half-angle's OWN quadrant, not the original angle's.** $\theta$ and $\theta/2$ can land in entirely different quadrants — always compute $\theta/2$ numerically first, then determine its sign.
- **A boundary test at $\theta=0$ always sorts out which formula is which.** $(1-\cos\theta)$ vanishes at $\theta=0$ (matching $\sin(0)=0$); $(1+\cos\theta)$ equals $2$ at $\theta=0$ (matching $\cos(0)=1$ after halving) — a reliable check whenever the two forms are confused.

## Why Students Fail
This Blueprint's three misconceptions carry no explicit birth-type column, so each is independently classified here:
- **MC-1** is a **Type 1 (overgeneralization)**: the everyday linear intuition that "half the input gives half the output" (true for a straight-line function) overgeneralizes onto $\sin$, which is nonlinear — $\sin(\theta/2)\ne\frac12\sin\theta$, exactly the same overgeneralization mechanism `double-angle-formulas`' own MC-1 documented for doubling instead of halving.
- **MC-2** is a **Type 4 (notation-induced)** gap: the visual and verbal proximity of "$\theta$" inside "$\theta/2$" invites reading off the sign from $\theta$'s own quadrant, since the notation does not visually separate "the angle you started with" from "the angle whose quadrant actually matters."
- **MC-3** is a **Type 1 (overgeneralization)**: without a reliable check like the $\theta=0$ boundary test, the two nearly-symmetric formulas (differing only in a $+$ versus $-$ sign under the radical) are easy to swap from memory alone, especially under time pressure.

## Misconceptions
**MC-1 — HALF-ANGLE-SCALING** *(Foundational)*
- Surface form: writing $\sin(\theta/2)=\frac12\sin\theta$, treating the half-angle as a simple scalar multiple.
- Root cause: overgeneralizing everyday linear intuition (halving the input halves a linear function's output) onto the nonlinear $\sin$ function.
- Repair: compare $\sin(45°)=\frac{\sqrt2}{2}\approx0.707$ against $\frac12\sin(90°)=\frac12\cdot1=0.5$ — genuinely different numbers, proving the scaling rule fails; then compute $\sin(22.5°)$ correctly via the actual formula, $\sqrt{\frac{1-\cos45°}{2}}=\sqrt{\frac{2-\sqrt2}{4}}$.

**MC-2 — SIGN-FROM-THETA-NOT-HALF**
- Surface form: determining the $\pm$ sign of $\sin(\theta/2)$ from the quadrant of $\theta$ rather than the quadrant of $\theta/2$.
- Root cause: the notation "$\theta/2$" visually contains "$\theta$," inviting the sign check to be applied to the wrong angle.
- Repair: given $\theta=270°$ (Q3), explicitly compute $\theta/2=135°$ and check ITS quadrant (Q2, where $\sin$ is positive) — a two-step discipline: (1) compute $\theta/2$ numerically, (2) determine which quadrant that specific result falls in.

**MC-3 — FORMULA-SWAP**
- Surface form: using $(1+\cos\theta)$ under the radical for $\sin(\theta/2)$ and $(1-\cos\theta)$ for $\cos(\theta/2)$, reversing the two formulas.
- Root cause: the two nearly-symmetric formulas are easy to confuse from memory alone, without a reliable check to distinguish them.
- Repair: apply the boundary test at $\theta=0$ — $\sin(0)=0$, so the formula giving $0$ at $\theta=0$ (namely $(1-\cos\theta)$, since $1-\cos0=0$) must be the sine formula; $\cos(0)=1$, so the formula giving $1$ (namely $(1+\cos\theta)$, since $\frac{1+\cos0}{2}=1$) must be the cosine formula.

## Analogies
- **The read-backward analogy**: exactly as `math.trig.double-angle-formulas` itself derives cofunction identities as a special case of the difference formula, this concept derives the half-angle formulas by running the SAME power-reducing substitution ($2\alpha=\theta$) in reverse — no new derivation technique, only the direction of algebraic manipulation.
- **Anti-analogy — $\sin(\theta/2)$ is NOT half of $\sin\theta$.** This is MC-1's exact error, mirroring `double-angle-formulas`' own MC-1 in the opposite direction: halving the angle does not halve the sine's output, because $\sin$ is not a linear function.

## Demonstrations
1. **The full algebraic derivation via $2\alpha=\theta$**: starting from $\sin^2\theta=\frac{1-\cos2\theta}{2}$, substituting $\alpha=\theta/2$ throughout to obtain $\sin^2(\theta/2)=\frac{1-\cos\theta}{2}$ and the analogous cosine result — directly breaking MC-1 by showing the formula is a genuine algebraic consequence, not a scaled value.
2. **The quadrant-of-the-half, not-the-original demonstration**: computing $\theta/2=135°$ (Q2) from $\theta=270°$ (Q3), and determining $\sin(135°)>0$ from Q2's own sign rule — directly breaking MC-2.
3. **The $\theta=0$ boundary sort**: testing both $(1-\cos0)/2=0$ (matches $\sin0=0$) and $(1+\cos0)/2=1$ (matches $\cos0=1$) side by side to definitively assign each formula — directly breaking MC-3.

## Discovery Questions
1. "You know $\sin^2\theta=\frac{1-\cos2\theta}{2}$. If you set $\alpha=\theta/2$ so that $2\alpha=\theta$, what formula do you get for $\sin^2(\theta/2)$?"
2. "If $\theta=270°$, what is the actual numeric value of $\theta/2$ — and which quadrant does THAT value fall into?"
3. "At $\theta=0$, $\sin(0)=0$ and $\cos(0)=1$. Which of the two half-angle formulas, $(1-\cos\theta)$ or $(1+\cos\theta)$, gives $0$ when you plug in $\theta=0$?"

## Teaching Sequence
1. **Anchor in `math.trig.double-angle-formulas`**: state directly, "you already have the power-reducing identities — today you read them backward, substituting $\theta/2$ for the half-angle."
2. **Representation shift (breaks MC-1)**: the full derivation via $2\alpha=\theta$ substitution, plus the numeric contrast disproving the scaling shortcut.
3. **Pattern induction**: a gallery of exact-value computations at non-standard angles (15°, $\pi/8$, 75°), building fluency with the three-step procedure (identify $\theta$, look up $\cos\theta$, apply the formula and determine the sign).
4. **Contrast pair (breaks MC-2 and MC-3)**: the quadrant-of-the-half demonstration, plus the $\theta=0$ boundary sort distinguishing the sine and cosine forms.
5. **Mastery gate**: 4-item problem set (find $\sin(\pi/8)$ exactly; find $\cos(15°)$ exactly; given $\cos\theta=-3/5$ with $\theta$ in Q3, find $\sin(\theta/2)$; find $\tan(\pi/12)$ via the rationalized form) plus 1 independence-mode transfer probe (deriving $\sin^2(\theta/2)=\frac{1-\cos\theta}{2}$ from the double-angle formula and verifying it numerically at $22.5°$).

## Tutor Actions
- **Representation shift**: the full $2\alpha=\theta$ substitution derivation, contrasted numerically against the false scaling shortcut.
- **Pattern induction**: a gallery of exact-value computations at non-standard angles, building the three-step procedure.
- **Contrast pair**: the quadrant-of-the-half sign determination, plus the $\theta=0$ boundary test for formula assignment.
- **Mastery gate**, 4-item problem set plus 1 transfer probe requiring the reverse derivation and a numerical verification.

## Voice Teaching Notes
- Open with the explicit division-of-labor statement: "no new formulas today — you're reading the double-angle power-reducing identities backward."
- For MC-1, before accepting any half-angle value, ask "is that a radical expression involving $\cos\theta$, or did you just halve one value?"
- For MC-2, whenever a sign is needed, insist on two explicit steps: "what is $\theta/2$ numerically, and which quadrant is THAT in?"
- For MC-3, whenever the two formulas might be confused, ask "what does each formula give at $\theta=0$ — which one matches $\sin(0)=0$?"

## Assessment Signals
- **Early warning for MC-1**: writing $\sin(\theta/2)=\frac12\sin\theta$ or an equivalent scalar-halving expression.
- **Early warning for MC-2**: determining the $\pm$ sign from the quadrant of $\theta$ rather than computing and checking the quadrant of $\theta/2$.
- **Early warning for MC-3**: using $(1+\cos\theta)$ for sine or $(1-\cos\theta)$ for cosine, reversing the two forms.
- **Mastery evidence**: correctly re-deriving either half-angle formula from the power-reducing identities on a fresh prompt, correctly determining the sign from the quadrant of $\theta/2$ specifically, and correctly distinguishing the sine and cosine forms via the boundary check.

## Tutor Recovery Strategy
- On MC-1: re-derive the formula from the power-reducing identity with the learner performing the $\alpha=\theta/2$ substitution themselves, then verify numerically against the false scaling shortcut.
- On MC-2: present a FRESH angle where $\theta$ and $\theta/2$ land in different quadrant families and require the learner to compute $\theta/2$ numerically before determining any sign.
- On MC-3: require the learner to run the $\theta=0$ boundary test explicitly before committing to either formula, on a fresh pair of values.
- If a learner correctly derives and applies both formulas but struggles specifically with the tangent half-angle form, route to dedicated practice with the rationalized form $\tan(\theta/2)=\frac{1-\cos\theta}{\sin\theta}$, which sidesteps the sign question entirely.

## Memory Hooks
- "Halving the angle doesn't halve the value — it's a radical, not a scale" — for MC-1.
- "Compute $\theta/2$ first, THEN check its quadrant" — for MC-2.
- "At $\theta=0$: minus gives zero (sine), plus gives one (cosine)" — for MC-3.

## Transfer Connections
- **`math.trig.double-angle-formulas`** (prerequisite, already authored): supplies the power-reducing identities this concept reads backward via the substitution $2\alpha=\theta$ — the derivation technique is identical, run in the opposite direction; also supplies the precedent for MC-1's exact mirror-image misconception (scaling doubled versus halved angles incorrectly).
- **Advanced integration and Fourier techniques** (future work, per the Blueprint's own forward-looking Teaching Notes, not yet authored as specific concepts): the half-angle formulas are named as a standing tool for such future work, though no specific KG concept currently names this concept in its own `requires` field.

## Cross-Subject Connections
- No cross-links are declared in the KG for this concept (`cross_links: []`); the Blueprint's own transfer probe is a purely internal mathematics identity-proof-and-verification task, not a cross-subject application.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.trig.half-angle-formulas.md` (primitive-numbered format — P11/P04/P06/P91/P27/P41/P64/P89 scaffolding). All worked examples (the full $2\alpha=\theta$ derivation with the sign rule and tangent forms; the exact-value gallery for 15°, $\pi/8$, and 75°; the quadrant-of-the-half and $\theta=0$ boundary demonstrations), the complete misconception registry (MC-1 Foundational, MC-2, MC-3, none carrying an explicit birth-type column), and the mastery-gate transfer probe are reused by reference, never restated verbatim beyond the minimal illustrative excerpts above.
- Blueprint metadata (`requires`, `unlocks: none`, `cross_links: []`, `difficulty`, `bloom`, `mastery_threshold`, `estimated_hours`) verified against the live KG — see Curriculum Feedback below: **zero discrepancy**.
- Independent transfer probe (independence mode, per the Blueprint's own stated `P76_mode: independence`): "Prove the identity $\sin^2(\theta/2)=\frac{1-\cos\theta}{2}$, then use it to find $\sin(22.5°)$ exactly and verify that $2\sin^2(22.5°)=1-\cos(45°)$." *(Expected: (a) $\cos2\alpha=1-2\sin^2\alpha\Rightarrow\sin^2\alpha=\frac{1-\cos2\alpha}{2}$; letting $\alpha=\theta/2$ gives the identity. (b) $\theta=45°$: $\sin^2(22.5°)=\frac{1-\sqrt2/2}{2}=\frac{2-\sqrt2}{4}$, so $\sin(22.5°)=+\sqrt{\frac{2-\sqrt2}{4}}$ (positive since $22.5°\in$ Q1). (c) $2\sin^2(22.5°)=\frac{2-\sqrt2}{2}=1-\frac{\sqrt2}{2}=1-\cos45°$ ✓.)*, reused by reference.

## Runtime Asset References
- No AssetIdentity (ADR 14) explanation or probe assets exist yet for this concept in `src/lib/teaching/assets/`. Per this program's established layer-ownership boundary, Layer 3/7 (DB-backed serving assets) is out of scope for this Educational Brain authoring campaign — this entry is Layer 2 (Educational Brain) content only.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy** for `requires`, `unlocks`, `cross_links`, `difficulty`, `bloom`, `mastery_threshold`, and `estimated_hours` — every field in the Blueprint's Component 0 metadata matches the live KG exactly (verified by direct Python query against `docs/mathematics/kg/graph.json`). The Blueprint's own Component 7/P78 text names "Advanced integration techniques" and "Fourier coefficient derivations" as future beneficiaries of this concept, but these are descriptive prose, not concrete KG concept ids — the KG's own `unlocks` field is correctly empty, and no discrepancy applies.

## Version History
- **2026-09-13 (Batch 61)**: authored as part of the Mathematics Educational Brain completion campaign. Unblocked by the already-authored `math.trig.double-angle-formulas` (Batch 60). One of four concepts authored this batch (companions: `math.calc.trig-substitution`, `math.seq.arithmetic-series`, `math.seq.telescoping-series`). `math.trig` moves from 20/25 toward 21/25 this batch.
