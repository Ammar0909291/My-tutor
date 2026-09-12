# math.trig.unit-circle — Unit Circle

## Identity
- **KG id**: `math.trig.unit-circle`
- **Domain**: math.trig (Trigonometry)
- **Requires**: `math.trig.right-triangle-trig`, `math.geom.circle`
- **Unlocks**: `math.trig.trig-functions`, `math.trig.reference-angles`
- **Cross-links**: none
- **Difficulty**: proficient · **Bloom level**: understand
- **Mastery threshold**: 0.85 · **Estimated hours**: 8

## Learning Objective
The learner locates the coordinates $(\cos\theta,\sin\theta)$ of any angle $\theta$ on the unit circle by combining the reference-angle method (magnitude from a Q1 special-triangle value) with quadrant sign analysis, and verifies each result against the Pythagorean identity $\sin^2\theta+\cos^2\theta=1$.

## Core Understanding
The unit circle does not introduce a second, competing definition of sine and cosine — it is the **same** right-triangle ratio definition from `math.trig.right-triangle-trig`, applied to the one right triangle whose hypotenuse happens to equal exactly 1. Once $\text{hyp}=1$:
$$\cos\theta=\frac{\text{adj}}{\text{hyp}}=\frac{\text{adj}}{1}=\text{adj}=x,\qquad \sin\theta=\frac{\text{opp}}{\text{hyp}}=\frac{\text{opp}}{1}=\text{opp}=y$$
so the ratio *collapses* to a raw coordinate value: $x=\cos\theta$, $y=\sin\theta$. Because the point $(x,y)$ lies on a circle of radius 1 centered at the origin, the circle's own equation $x^2+y^2=1$ (from `math.geom.circle`, with $r=1$) becomes, after substitution, the Pythagorean identity $\cos^2\theta+\sin^2\theta=1$ — not a new fact requiring separate proof, but the Pythagorean theorem wearing trigonometric notation.

This framework extends trigonometry past the 0°–90° range a right triangle alone can represent, by letting $\theta$ be measured as a **counter-clockwise rotation** from the positive $x$-axis, landing the terminal side in any of the four quadrants. Two further pieces make every angle computable from a small anchor set:
- **Quadrant sign analysis**: the sign of $x$ (=$\cos\theta$) and $y$ (=$\sin\theta$) is determined entirely by which quadrant the terminal side falls in (memory anchor: "All Students Take Calculus" — All positive in Q1, Sine in Q2, Tangent in Q3, Cosine in Q4).
- **Reference angle**: the acute angle between the terminal side and the nearest $x$-axis. Its magnitude gives the Q1 base value; the quadrant supplies the sign. This reduces "memorize the whole circle" to "know 5 Q1 values (0°, 30°, 45°, 60°, 90°) and apply a 2-step algorithm."

## Mental Models
- **A scaled-down right triangle, not a new object.** Picture any right triangle with hypotenuse $c$ and angle $\theta$ at the origin; shrink it uniformly until the hypotenuse is exactly 1. The tip of the hypotenuse now sits on the unit circle, and its coordinates *are* $(\cos\theta,\sin\theta)$ by definition — nothing about the ratios themselves changed, only the scale.
- **Reference angle as "fold back to Q1."** Any angle in Q2, Q3, or Q4 can be mentally folded back across the nearest axis into an acute angle in Q1; the folded acute angle is the reference angle, and its Q1 value gives the magnitude directly.
- **Verification via the unit-radius equation.** Every computed point should satisfy $x^2+y^2=1$ — this is a built-in self-check, not an optional extra step, and catches sign errors and coordinate-swap errors immediately.

## Why Students Fail
None of this Blueprint's three misconceptions carry an explicit birth-type column (consistent with the pattern across this campaign's math.trig/math.calc/math.seq Blueprints), so each is independently classified here:
- **MC-1** is a **Type 5 (instruction-induced)** gap: the bridge between the right-triangle ratio definition and the unit-circle coordinate definition is rarely made explicit in first exposure — the learner sees two formulas presented in two different visual contexts and, absent an explicit linking statement, treats them as two parallel, potentially conflicting systems rather than one definition viewed at two scales.
- **MC-2** is a **Type 4 (notation-induced)** confusion: the ordered pair $(x,y)$ carries no visual cue for which coordinate is sine and which is cosine — nothing about writing "$x$" signals "cosine" the way, say, "adj" visually pairs with cosine in the right-triangle picture. Without an explicit memory anchor, the assignment is arbitrary from the notation alone and gets swapped or guessed.
- **MC-3** is a **Type 2 (perceptual intuition)** conflict imported from everyday experience: clockwise rotation dominates common physical contexts (clock hands, compass bearings, steering wheels), so when mathematics asserts counter-clockwise as the positive direction, it feels arbitrary and is easily reversed under pressure, especially since right-triangle work (Q1 only) never forces the learner to commit to a rotational direction at all.

## Misconceptions
**MC-1 — UNIT-CIRCLE-CONTRADICTS-RIGHT-TRIANGLE** *(Foundational, Type 5)*
- Surface form: "But in the right triangle $\sin\theta=\text{opp/hyp}$. On the unit circle $\sin\theta=y$. These are different formulas — which one is right?"
- Root cause: the embedding (unit circle = right triangle with hyp=1) is never made explicit; two formulas in two visual contexts read as two competing systems.
- Repair: representation shift across three views — the familiar right triangle (hyp=5, opp=3, adj=4), the same triangle rescaled to hyp=1 (opp=3/5, adj=4/5, landing at coordinate $(4/5,3/5)$), and the abstract rule $(\cos\theta,\sin\theta)$ — with the explicit linking statement: "The ratio collapses to the coordinate value because dividing by 1 changes nothing; the unit circle is the right-triangle definition, not an alternative to it."

**MC-2 — X-IS-SIN-Y-IS-COS** *(Type 4)*
- Surface form: "$\cos 90°=1$ because at 90° the $x$-value is 0 and $y$-value is 1, and cos is the $y$-coordinate."
- Root cause: no memory anchor distinguishing which coordinate is which; the notation $(x,y)$ doesn't visually cue the assignment.
- Repair: the memory anchor "cosine → adjacent → $x$-axis → horizontal; sine → opposite → vertical" plus a direct consistency check — at $\theta=0°$ the terminal side lies along the positive $x$-axis, so adjacent = 1, opposite = 0, giving $\cos0°=1,\sin0°=0$, matching the known point $(1,0)$; the reversed assignment would place $\theta=0°$'s point at $(0,1)$, which is actually the point at $\theta=90°$ — a direct contradiction.

**MC-3 — ANGLE-INCREASES-CLOCKWISE** *(Type 2)*
- Surface form: "At 90° we go right and down, so the point is (something positive, something negative)."
- Root cause: clockwise rotation dominates everyday physical experience; counter-clockwise-as-positive is never reinforced during right-triangle work, where no rotational direction is ever needed.
- Repair: show that counter-clockwise from $(1,0)$ by 90° reaches $(0,1)$ — the top of the circle, where $y=1$ is the **maximum** possible value, matching $\sin90°=1$ from right-triangle work. The clockwise alternative reaches $(0,-1)$, giving $\sin90°=-1$, which directly contradicts every right-triangle computation at 90°. Counter-clockwise isn't an arbitrary convention layered on top of right-triangle trigonometry — it's the only direction consistent with it.

## Analogies
- **The zoom-out/zoom-in pair:** zooming a right triangle down to hyp=1 is exactly like converting a photograph to a fixed print size — the proportions (the ratios) never change, only the absolute scale, and the unit circle is simply the "1-inch print" version of every right triangle at a given angle.
- **The four-neighborhood mnemonic ("All Students Take Calculus"):** a spatial/verbal anchor for quadrant signs, reused directly from the Blueprint rather than re-derived, since it is already the standard mnemonic this concept's own learner population is likely to encounter elsewhere.
- **Anti-analogy — the unit circle is NOT a clock face.** Explicitly naming and rejecting the clock analogy (which reinforces MC-3's clockwise intuition) is worth doing directly: a clock's 12 is at the top like the unit circle's 90°, but a clock's hands sweep clockwise while unit-circle angles sweep counter-clockwise — the visual similarity (a circle with a marked "12 o'clock"/"90°" position) makes this a genuinely tempting false analogy rather than a strawman.

## Demonstrations
1. **Three-representation shift, live**: draw the hyp=5 triangle, then the rescaled hyp=1 triangle landing at $(4/5,3/5)$, then write the abstract rule $(\cos\theta,\sin\theta)$ — narrating the linking statement at each transition.
2. **Consistency check at $\theta=0°$**: derive $\cos0°=1,\sin0°=0$ from the adjacent/opposite-at-zero-rotation argument, then show the reversed assignment lands at the *wrong* known point (θ=90° instead of 0°), directly falsifying MC-2.
3. **Counter-clockwise vs. clockwise arrival points**: physically trace both directions from $(1,0)$ by 90°, landing at $(0,1)$ vs. $(0,-1)$, and check each against the already-known fact $\sin90°=1$ from right-triangle work.
4. **Reference-angle algorithm on 210°**: identify quadrant (Q3), compute reference angle ($210°-180°=30°$), read the Q1 value ($\cos30°=\sqrt3/2,\sin30°=1/2$), apply Q3 signs (both negative) → $(-\sqrt3/2,-1/2)$, then verify $x^2+y^2=(\tfrac34)+(\tfrac14)=1$ ✓.

## Discovery Questions
1. "If the unit circle is really the same trigonometry as a right triangle, what happens to the ratio $\text{opp/hyp}$ when $\text{hyp}=1$?"
2. "At $\theta=0°$, the terminal side lies exactly along the positive $x$-axis. What are the opposite and adjacent side lengths in that degenerate triangle? What does that make $\cos0°$ and $\sin0°$?"
3. "Trace 90° counter-clockwise from $(1,0)$, and then 90° clockwise from $(1,0)$. Which one lands where $\sin\theta=1$ (matching the known right-triangle maximum), and which one gives $\sin\theta=-1$?"

## Teaching Sequence
1. **Entry check**: confirm the learner can state $\sin\theta=\text{opp/hyp}$ and $\cos\theta=\text{adj/hyp}$ for a right triangle with hyp=1 — this is the prerequisite gate the Blueprint's own entry assessment uses, confirming readiness to treat the unit circle as an *extension* rather than a fresh start.
2. **Representation shift (breaks MC-1)**: the three-view demonstration above, ending with the explicit linking statement that the two definitions are identical, only differently scaled.
3. **Contrast pair — quadrant signs vs. rotational direction (breaks MC-2 and MC-3 together)**: teach the quadrant sign table alongside the counter-clockwise convention, using the consistency-check argument (MC-2's repair) and the arrival-point argument (MC-3's repair) as the justification for each, rather than presenting either as an arbitrary rule to memorize.
4. **Pattern induction — the reference-angle algorithm**: derive the five Q1 base values from special-triangle ratios (0°,30°,45°,60°,90°), then extend to all four quadrants via the fold-back reference-angle method, ending in the generalized 3-step algorithm (find reference angle → read Q1 value → apply quadrant sign).
5. **Mastery gate**: 4-item problem set (coordinates at 90°, a true/false coordinate-assignment item targeting MC-2 directly, and axis-value items at 180°/270° targeting MC-3) plus 1 independence-mode transfer probe (reference-angle computation at 315° with Pythagorean-identity verification).

## Tutor Actions
- **Representation shift** (MC-1): the hyp=5 → hyp=1 → abstract-rule sequence, always ending in the explicit "one definition, two scales" statement.
- **Contrast pair** (MC-2/MC-3): quadrant sign table alongside the counter-clockwise arrival-point argument.
- **Pattern induction**: the five-Q1-value table plus reference-angle fold-back, generalized into the 3-step algorithm.
- **Mastery gate**, 4-item set (0°/90°/180°/270° axis and quadrant coverage) plus 1 transfer probe at 315°.

## Voice Teaching Notes
- When introducing the unit circle, explicitly say aloud "this is not a new formula — it's your right-triangle formula with the hypotenuse shrunk to exactly 1" before showing any diagram, so the linking statement is heard *before* the potentially conflicting visual is seen (front-loading the repair for MC-1 rather than treating it reactively).
- For the coordinate assignment, pair the verbal anchor "cosine is horizontal, like the $x$-axis; sine is vertical, like the $y$-axis" with a physical gesture (a flat horizontal hand sweep for cosine, a vertical hand sweep for sine) every time the pair $(\cos\theta,\sin\theta)$ is written.
- For rotational direction, physically trace the counter-clockwise sweep with a finger from $(1,0)$ toward $(0,1)$ while saying "this direction, up and over, is positive" — deliberately contrasting with a clock's sweep, which goes the other way.

## Assessment Signals
- **Early warning for MC-1**: a learner who, when asked "is the unit-circle sine the same as the right-triangle sine," answers "no, they're different but related" (rather than "yes, identical, just at hyp=1") is holding the misconception even if their coordinate answers happen to be numerically correct by memorization.
- **Early warning for MC-2**: any instance of reading $x$ as sine or $y$ as cosine during a coordinate read-off, independent of whether the final numeric answer happens to be right (e.g., at 45° both coordinates are equal, so a swap produces no visible error — this angle is a poor diagnostic probe for MC-2 for exactly that reason; 0°, 90°, 180°, 270° are the diagnostic angles).
- **Early warning for MC-3**: placing 90° in Q4 or 270° in Q2 — the signature of a clockwise mental model.
- **Mastery evidence**: correctly executing the full reference-angle algorithm (quadrant identification → reference angle → Q1 lookup → sign application) on an angle not among the standard memorized set, and independently verifying the result against $x^2+y^2=1$.

## Tutor Recovery Strategy
- On MC-1: never simply assert "they're the same" — walk the three-representation shift again, since the misconception persists precisely because the bridge was never *shown*, only *claimed*.
- On MC-2: use the 0°/90°/180°/270° axis angles as recovery probes specifically (never 45°, where a swap is invisible), and anchor the repair in the physical "horizontal = cosine" gesture rather than a verbal rule alone.
- On MC-3: re-trace both directions physically from $(1,0)$ and check each against the already-known right-triangle fact $\sin90°=1$ — the repair works by contradiction with prior knowledge, not by simply restating the convention.
- If a learner fails the reference-angle algorithm itself (correct on quadrant/reference-angle steps but wrong Q1 lookup, or vice versa), isolate which of the three sub-steps is failing before re-drilling the whole algorithm — the Blueprint's own P74 routing table makes exactly this per-step distinction.

## Memory Hooks
- "One definition, two scales" — for MC-1, the standing phrase for the right-triangle/unit-circle bridge.
- "Cosine is horizontal, sine is vertical" — for MC-2, paired with the horizontal/vertical hand-sweep gesture.
- "Counter-clockwise goes up and over" — for MC-3, paired with the finger-trace gesture from $(1,0)$ to $(0,1)$.
- "Fold back to Q1, then flip the sign" — for the reference-angle algorithm as a whole.

## Transfer Connections
- **`math.trig.trig-functions`** (unlocked): sine and cosine as continuous periodic functions of an angle variable are built directly by reading the $y$- and $x$-coordinates off the unit circle as $\theta$ sweeps continuously — this concept supplies every coordinate value that graph will later need.
- **`math.trig.reference-angles`** (unlocked): this concept's own reference-angle algorithm (Teaching Sequence step 4) is the direct prerequisite skill that entry will formalize and extend.
- **`math.trig.trig-identities`** (downstream, not yet authored per the KG's `unlocks`): the Pythagorean identity $\sin^2\theta+\cos^2\theta=1$ derived here from $x^2+y^2=1$ is the seed identity that entry's full family (quotient identity $\tan\theta=\sin\theta/\cos\theta$, reciprocal identities, etc.) will build from.

## Cross-Subject Connections
- No cross-links are declared in the KG for this concept (`cross_links: []`), and none are asserted here beyond the KG's own record, consistent with this program's standing discipline of not inventing cross-subject connections the curriculum data doesn't support.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.trig.unit-circle.md` (older 10-component format: Metadata, Cognitive Map, Misconception Registry, Scaffolding Protocol, Protocol A main sequence with 4 teaching actions including the mastery gate, Protocol B repair sequences, P89 spaced repetition, Cross-Blueprint Dependencies, Teaching Notes, Validation Checklist). All worked examples (the hyp=5/hyp=1 rescaling, the axis-value derivations at 0°/90°/180°/270°, the full reference-angle table for 30°/45°/60° across all four quadrants), the complete misconception registry (MC-1/MC-2/MC-3, none carrying an explicit birth-type column), and the spaced-repetition schedule (Day 3/10/30 prompts) are reused by reference, never restated verbatim beyond the minimal illustrative excerpts above.
- Blueprint metadata (`requires`, `unlocks`, `cross_links`, `difficulty`, `bloom`, `mastery_threshold`, `estimated_hours`, `P76_mode: independence`) verified against the live KG — see Curriculum Feedback below: **zero discrepancy**.
- Independent transfer probe (independence mode, per the Blueprint's own stated `P76_mode: independence` and `cross_links: []` — no discrepancy to resolve here, unlike this batch's `math.calc.sequence-limits` entry): "Find the exact coordinates of the unit-circle point at $\theta=315°$. (a) Identify the quadrant and the reference angle. (b) State the Q1 base values for the reference angle. (c) Apply quadrant signs to find $(\cos315°,\sin315°)$. (d) Verify the point satisfies $x^2+y^2=1$." *(Expected: (a) Q4, reference angle $360°-315°=45°$. (b) $\cos45°=\sin45°=\sqrt2/2$. (c) Q4 signs (cos+, sin−): $(\sqrt2/2,-\sqrt2/2)$. (d) $(\sqrt2/2)^2+(-\sqrt2/2)^2=1/2+1/2=1$ ✓.)*

## Runtime Asset References
- No AssetIdentity (ADR 14) explanation or probe assets exist yet for this concept in `src/lib/teaching/assets/`. Per this program's established layer-ownership boundary, Layer 3/7 (DB-backed serving assets) is out of scope for this Educational Brain authoring campaign — this entry is Layer 2 (Educational Brain) content only.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy** for `requires`, `unlocks`, `cross_links`, `difficulty`, `bloom`, `mastery_threshold`, and `estimated_hours` — every field in the Blueprint's Component 0 metadata matches the live KG exactly (verified by direct Python query against `docs/mathematics/kg/graph.json`). This concept's Blueprint declares `cross_links: []` and `P76_mode: independence` consistently with each other, unlike this batch's `math.calc.sequence-limits` entry (whose Blueprint declares a non-empty `cross_links` and a "cross-link probe" mode resting on a stale existence check — see that entry's own Curriculum Feedback section for the full finding).

## Version History
- **2026-09-12 (Batch 53)**: authored as part of the Mathematics Educational Brain completion campaign. One of two `math.trig` concepts authored this batch (companion: `math.trig.degree-radian-conversion`), both unblocked by the already-authored `math.trig.right-triangle-trig` (Batch 52). `math.trig` moves from 2/25 to 4/25 this batch. Unlocks `math.trig.trig-functions` and `math.trig.reference-angles` (neither yet authored).
