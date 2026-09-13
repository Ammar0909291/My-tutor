# math.trig.reference-angles — Reference Angles

## Identity
- **KG id**: `math.trig.reference-angles`
- **Domain**: math.trig (Trigonometry)
- **Requires**: `math.trig.unit-circle`
- **Unlocks**: `math.trig.trig-functions`
- **Cross-links**: none
- **Difficulty**: proficient · **Bloom level**: apply
- **Mastery threshold**: 0.85 · **Estimated hours**: 3

## Learning Objective
The learner computes the reference angle for any angle in standard position using the correct quadrant-specific formula, applies the ASTC sign rule to recover the correctly-signed trig value from the reference angle's Q1 value, and recognizes that a reference angle is always acute regardless of the original angle's size.

## Core Understanding
`math.trig.unit-circle` already established that the reference-angle method reduces the entire circle to five memorized Q1 values plus a sign lookup. This concept develops that method's own mechanics in full, deliberately not re-teaching angle placement or quadrant identification (`unit-circle`'s own job).

The reference angle is the **acute** angle between an angle's terminal side and the $x$-axis. The critical fact this concept centers on: **the formula for computing it genuinely depends on which quadrant the angle falls in** — there is no single universal subtraction that works everywhere:
- Q1 ($0°$–$90°$): the reference angle **is** $\theta$ itself.
- Q2 ($90°$–$180°$): $180°-\theta$.
- Q3 ($180°$–$270°$): $\theta-180°$.
- Q4 ($270°$–$360°$): $360°-\theta$.

Each formula measures the distance back to the *nearest* part of the $x$-axis — but the specific arithmetic changes by quadrant, since "nearest" means something different in each one.

Once the reference angle is found, the trig **value** of the original angle equals the same trig function applied to the reference angle, but with a **sign** supplied by ASTC ("All Students Take Calculus" — Q1: all three positive; Q2: only sine; Q3: only tangent; Q4: only cosine). The reference angle supplies the *magnitude*; ASTC supplies the *sign* — two separate pieces of information that must both be applied.

## Mental Models
- **Fold-back to the nearest axis.** Any angle beyond Q1 can be mentally folded across the nearest $x$-axis crossing into an acute angle — the reference angle is that fold's size.
- **Two independent lookups, not one.** Computing a trig value at a non-Q1 angle is genuinely a two-step retrieval: (1) magnitude from the reference angle's Q1 table entry, (2) sign from ASTC for the specific function being computed. Skipping either step gives a wrong or incomplete answer.
- **Acute no matter how deep into the quadrant.** However far an angle travels into its quadrant, the reference angle measures only the small remaining distance to the nearest axis — it never grows past $90°$.

## Why Students Fail
None of this Blueprint's three misconceptions carry an explicit birth-type column (the same gap found across virtually every math.trig Blueprint this campaign), so each is independently classified here:
- **MC-1** is a **Type 1 (overgeneralization)**: having learned one quadrant-specific formula (commonly Q2's $180°-\theta$, from an early textbook example), the learner extends it as a universal rule to every quadrant, since the formulas share a surface resemblance (all subtract from a boundary value).
- **MC-2** is a **Type 5 (instruction-induced)** gap: once a reference angle is found, "read off the Q1 value" is an easy habit to over-apply, and if the sign-adjustment step isn't drilled as a genuinely separate action, it gets silently skipped.
- **MC-3** is a **Type 2 (perceptual intuition)** conflict: a large original angle (like $300°$) *feels* like it should correspond to a "large" measurement, so the idea that its reference angle is a small acute value can seem counterintuitive without the fold-back picture made explicit.

## Misconceptions
**MC-1 — REFERENCE-ANGLE-FORMULA-ASSUMED-UNIVERSAL** *(Foundational, Type 1)*
- Surface form: applying the same subtraction formula (e.g. always $180°-\theta$) to angles in every quadrant.
- Root cause: overgeneralizing one memorized formula past the quadrant it was learned in.
- Repair: contrast three angles — $150°$ (Q2), $210°$ (Q3), $330°$ (Q4) — that all happen to share the identical reference angle ($30°$) despite requiring three genuinely different formulas ($180°-150°=30°$; $210°-180°=30°$; $360°-330°=30°$). The shared result proves the formula, not the reference angle itself, is what varies by quadrant.

**MC-2 — TRIG-VALUE-COPIED-WITHOUT-SIGN-ADJUSTMENT**
- Surface form: computing $\cos(150°)$ as $+\cos(30°)=+\sqrt3/2$ by copying the reference angle's value unchanged.
- Root cause: treating "find the reference angle" as the entire procedure, omitting the separate sign-check step.
- Repair: direct conflict evidence — at the *same* reference angle ($30°$) in the *same* quadrant (Q2), $\sin(150°)=+\sin(30°)=+1/2$ (sign unchanged) but $\cos(150°)=-\cos(30°)=-\sqrt3/2$ (sign flipped). Same setup, opposite outcomes for different functions — proving the sign must be checked per-function via ASTC, never assumed.

**MC-3 — REFERENCE-ANGLE-ASSUMED-NON-ACUTE-FOR-LARGE-ANGLES** *(Moderate, Type 2)*
- Surface form: expecting a "large" angle like $300°$ to have a correspondingly large (obtuse or reflex) reference angle.
- Root cause: perceptual intuition that scale should be preserved between an angle and its derived reference angle.
- Repair: work $300°$ directly — reference angle $=360°-300°=60°$, genuinely acute, even though $300°$ is deep into Q4. The reference angle always measures back to the *nearest* axis direction, which stays small regardless of how far the original angle has traveled.

## Analogies
- **The "distance to shore" analogy**: however far out to sea a swimmer has gone (however large the original angle), the reference angle measures only their distance back to the *nearest* shoreline (the nearest $x$-axis direction) — a quantity that stays bounded and small even when the swimmer is far from the starting point.
- **Anti-analogy — the reference angle is NOT "how far past $90°$/$180°$/$270°$/$360°$ the angle has traveled" measured as a raw fraction of the full angle.** That framing would predict a "large" reference angle for a "large" original angle (MC-3's exact error); the correct framing is always "distance to the *nearest* axis," which resets to small at each quadrant boundary.

## Demonstrations
1. **Three-formula contrast**: work $150°$, $210°$, $330°$ side by side, showing three different quadrant-specific subtractions converging on the identical reference angle $30°$ — directly breaking MC-1.
2. **Sign-flip conflict pair**: compute $\sin(150°)$ and $\cos(150°)$ from the same reference angle $30°$, showing one sign unchanged and one flipped — directly breaking MC-2.
3. **Deep-Q4 acute check**: compute the reference angle for $300°$ ($=60°$), verifying it is acute despite $300°$ being close to a full revolution — directly breaking MC-3.

## Discovery Questions
1. "$150°$, $210°$, and $330°$ all have reference angle $30°$, but you compute it a different way for each. What's different about the *formula*, and what's the same about the *result*?"
2. "$\sin(150°)$ and $\cos(150°)$ share the same reference angle, $30°$. Compute both — do they come out with the same sign, or different signs? Why?"
3. "$300°$ is a big angle — almost a full revolution. What's its reference angle? Is it big too?"

## Teaching Sequence
1. **Anchor in `math.trig.unit-circle`**: restate the reference-angle method as the tool that reduces "the whole circle" to "five Q1 values plus a lookup" — this concept develops that lookup's mechanics.
2. **Contrast pair (breaks MC-1)**: the $150°/210°/330°$ demonstration, ending with the explicit statement that the formula genuinely depends on the quadrant.
3. **Conflict evidence (breaks MC-2)**: the $\sin(150°)$ vs. $\cos(150°)$ sign-flip demonstration, ending with "check ASTC for the specific function, every time."
4. **Representation shift (breaks MC-3)**: the $300°$ deep-Q4 demonstration, ending with "acute, always — the formula measures to the nearest axis, not a fraction of the full angle."
5. **Mastery gate**: 4-item problem set (reference angle at $240°$, $\tan(240°)$, $\cos(315°)$, and an explain-why-not-$95°$ item) plus 1 independence-mode transfer probe (a navigation-bearing problem at $255°$ with an embedded "the reference angle should be large" misconception to refute directly).

## Tutor Actions
- **Contrast pair** (MC-1): the three-quadrant-formula demonstration converging on one reference angle.
- **Conflict evidence** (MC-2): the same-reference-angle, opposite-sign sin/cos pair.
- **Representation shift** (MC-3): the deep-Q4 acute-angle check.
- **Mastery gate**, 4-item problem set plus 1 transfer probe with an embedded misconception-refutation task.

## Voice Teaching Notes
- Say the quadrant-formula aloud as a lookup, not a single memorized rule: "which quadrant — then which formula" — reinforcing the two-step nature of the computation before any arithmetic happens.
- For the sign step, narrate it as a spoken checklist item every time: "magnitude from the reference angle... now, sign — check ASTC for *this* function" — building the habit of treating sign-checking as a mandatory, separate action rather than an afterthought.
- For MC-3, physically gesture the fold-back (a hand sweeping from the terminal side to the nearest axis) even for a "far" angle like $300°$, so the small resulting gesture visually contradicts the expectation of a "large" reference angle.

## Assessment Signals
- **Early warning for MC-1**: applying the identical formula to angles clearly in different quadrants (e.g., using $180°-\theta$ on a Q3 or Q4 angle).
- **Early warning for MC-2**: a correct reference-angle magnitude paired with a wrong or missing sign — this signals the sign-check step was skipped, independent of whether the final numeric magnitude happens to be right.
- **Early warning for MC-3**: any claim, explicit or implicit, that a "large" original angle should produce anything other than a small acute reference angle.
- **Mastery evidence**: correctly identifying both the quadrant-appropriate formula AND the ASTC sign for a fresh, unseen angle, without being told which quadrant it falls in first.

## Tutor Recovery Strategy
- On MC-1: return to the three-angle contrast rather than restating the four formulas in the abstract — the misconception persists because the quadrant-dependence was never demonstrated concretely.
- On MC-2: isolate the sign-check as its own explicit step, using the sin/cos-at-150° conflict pair as the recovery route each time, since the fix must show the sign varies even when the reference angle doesn't.
- On MC-3: re-walk the deep-Q4 case with the physical fold-back gesture — an abstract restatement of "always acute" is less effective than seeing the small gesture directly.
- If a learner correctly finds the reference angle but consistently fails the sign step (or vice versa), treat these as two separate, independently-diagnosable failure modes rather than re-drilling the whole procedure — the Blueprint's own P74 routing table makes exactly this distinction.

## Memory Hooks
- "Different quadrant, different formula, same result" — for MC-1, anchored to the $150°/210°/330°$ trio.
- "Magnitude from the reference angle, sign from ASTC — two separate lookups" — for MC-2.
- "Always acute — fold back to the *nearest* axis, never a fraction of the whole angle" — for MC-3.

## Transfer Connections
- **`math.trig.trig-functions`** (unlocked): the reference-angle method authored here is the standard technique that concept uses to evaluate sin, cos, and tan at any real-number input beyond the first quadrant — this entry supplies the exact mechanism that concept's own Component 4 Step 2 (extension to all quadrants) builds directly on.
- **`math.trig.unit-circle`** (prerequisite, already authored): this entry deliberately does not re-teach angle placement or quadrant identification, division of labor stated explicitly in the Blueprint's own Teaching Notes.

## Cross-Subject Connections
- No cross-links are declared in the KG for this concept (`cross_links: []`), and none are asserted here beyond the KG's own record.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.trig.reference-angles.md` (a mixed-numbering format — Components 0-8 and 10 present, Component 9 intentionally omitted per the corpus's own established convention). All worked examples (the $150°/210°/330°$ trio, the $\sin/\cos(150°)$ sign contrast, the $300°$ acute-angle check), the complete misconception registry (MC-1/MC-2/MC-3, none carrying an explicit birth-type column), and the mastery-gate problem set are reused by reference, never restated verbatim beyond the minimal illustrative excerpts above.
- Blueprint metadata (`requires`, `unlocks`, `cross_links: []`, `difficulty`, `bloom`, `mastery_threshold`, `estimated_hours`, `P76_mode: independence`) verified against the live KG — see Curriculum Feedback below: **zero discrepancy**.
- Independent transfer probe (independence mode, per the Blueprint's own stated `P76_mode: independence` and `cross_links: []`): "A navigation system computes a ship's bearing angle as $255°$ and needs the exact sine value for a course calculation. (a) Determine the reference angle for $255°$, identifying the correct quadrant formula. (b) Using ASTC, determine the correct sign for $\sin(255°)$ and compute its exact value. (c) A junior engineer argues 'since $255°$ is a fairly large angle, its reference angle should also be relatively large, maybe around $75°$ or more.' Using this lesson's acute-angle guarantee, explain specifically why this reasoning is incorrect, and state the actual reference angle." *(Expected: (a) $255°$ is Q3 ($180°$–$270°$), reference angle $=255°-180°=75°$. (b) Q3: sine is negative (only tangent positive). $\sin(75°)$ is the Q1 magnitude; $\sin(255°)=-\sin(75°)$. (c) The engineer's reasoning is wrong — the reference angle always measures the acute distance to the *nearest* $x$-axis, never a fraction of the original angle's size; $255°$'s actual reference angle is $75°$, which happens to be numerically close to the engineer's guess by coincidence, not because "large angle implies large reference angle" is a valid rule — a genuinely large angle like $359°$ would still have a tiny reference angle of $1°$.)*

## Runtime Asset References
- No AssetIdentity (ADR 14) explanation or probe assets exist yet for this concept in `src/lib/teaching/assets/`. Per this program's established layer-ownership boundary, Layer 3/7 (DB-backed serving assets) is out of scope for this Educational Brain authoring campaign — this entry is Layer 2 (Educational Brain) content only.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy** for `requires`, `unlocks`, `cross_links`, `difficulty`, `bloom`, `mastery_threshold`, and `estimated_hours` — every field in the Blueprint's Component 0 metadata table matches the live KG exactly (verified by direct Python query against `docs/mathematics/kg/graph.json`).

## Version History
- **2026-09-12 (Batch 54)**: authored as part of the Mathematics Educational Brain completion campaign. One of two `math.trig` concepts authored this batch (companion: `math.trig.trig-functions`), both unblocked by the already-authored `math.trig.unit-circle` (Batch 53). `math.trig` moves from 4/25 to 6/25 this batch. Unlocks `math.trig.trig-functions` (authored in the same batch — see that entry).
