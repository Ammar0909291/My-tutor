# math.trig.special-angles — Trigonometric Values at Special Angles

## Identity
- **KG id**: `math.trig.special-angles`
- **Domain**: math.trig (Trigonometry)
- **Requires**: `math.trig.basic-ratios`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: proficient · **Bloom level**: remember
- **Mastery threshold**: 0.9 · **Estimated hours**: 5

## Learning Objective
The learner derives exact values of sin, cos, and tan at $0°,30°,45°,60°,90°$ from the 30-60-90 and 45-45-90 triangles placed on the unit circle, extends these to all angles in $[0°,360°)$ using the reference angle and ASTC sign rules, and evaluates trig expressions at multiples of $30°$ and $45°$ without a calculator.

## Core Understanding
`math.trig.basic-ratios` establishes SOH-CAH-TOA as a labeling procedure applicable to any right triangle. This concept applies that procedure to the two SPECIFIC right triangles whose side ratios are known exactly from geometry — the 45-45-90 (legs equal, hypotenuse $\sqrt2$ times a leg) and the 30-60-90 (sides in ratio $1:\sqrt3:2$) — scaled so the hypotenuse equals $1$ (placing them directly on the unit circle). Reading off Opposite, Adjacent, and Hypotenuse for each gives the complete first-quadrant table: $\sin30°=\frac12,\cos30°=\frac{\sqrt3}2,\tan30°=\frac{\sqrt3}3$; $\sin45°=\cos45°=\frac{\sqrt2}2,\tan45°=1$; $\sin60°=\frac{\sqrt3}2,\cos60°=\frac12,\tan60°=\sqrt3$.

Extending beyond $90°$ uses TWO ingredients together: the **reference angle** $\alpha$ (the acute angle between the terminal side and the x-axis — Q1: $\alpha=\theta$; Q2: $\alpha=180°-\theta$; Q3: $\alpha=\theta-180°$; Q4: $\alpha=360°-\theta$), which recovers the MAGNITUDE from the first-quadrant table, and the **ASTC sign rule** (All positive in Q1, Sine positive in Q2, Tangent positive in Q3, Cosine positive in Q4), which supplies the correct SIGN. ASTC is not an arbitrary mnemonic — it directly encodes the sign of the x-coordinate (cosine) and y-coordinate (sine) in each quadrant of the unit circle.

## Mental Models
- **Derive, don't memorize.** The entire table reconstructs in under 30 seconds from the two special triangles; a learner who can re-derive it never loses access to a forgotten value, while one who only memorizes has no recovery path.
- **The sin column is strictly increasing from $0°$ to $90°$.** Reading $0,\frac12,\frac{\sqrt2}2,\frac{\sqrt3}2,1$ as an increasing sequence directly settles which of $\sin30°$/$\sin60°$ is larger, without needing to recall either value in isolation.
- **ASTC is a coordinate fact, not an arbitrary rule.** It reports the sign of the x- and y-coordinates in each quadrant of the unit circle — a learner who understands this origin makes far fewer sign errors than one who has memorized ASTC as an isolated rule.

## Why Students Fail
All three of this Blueprint's misconceptions are independently classified here, since the Blueprint supplies a "Trigger" column rather than a birth-type column:
- **MC-1** is a **Type 3 (language contamination)**: $30°$ and $60°$ are both "small" special angles introduced together, and without an anchor distinguishing which value belongs to which, the two easily swap in memory — much like `math.trig.basic-ratios`' own sin/cos-swap misconception, but here between two ANGLES rather than two FUNCTIONS.
- **MC-2** is a **Type 1 (overgeneralization)**: a learner's first exposure to trig values is entirely within Q1, where every value genuinely is positive, so "trig values are positive" is a reasonable but incomplete generalization that breaks the moment an angle beyond $90°$ appears.
- **MC-3** is a **Type 4 (notation-induced)**: the visually similar formulas $180°-\alpha$ (Q2) and $180°+\alpha$ (Q3) differ only in one operator, making them easy to transpose under time pressure or when the visual distinction between "just before" and "just past" $180°$ is not held clearly.

## Misconceptions
**MC-1 — SIN-COS-30-60-SWAP** *(Foundational)*
- Surface form: writing $\sin30°=\frac{\sqrt3}2$ and $\cos30°=\frac12$ — the 30° and 60° values reversed.
- Root cause: $30°$ and $60°$ are introduced together as a pair with no strong independent anchor distinguishing them.
- Repair: read the sin column as an increasing sequence — $0,\frac12,\frac{\sqrt2}2,\frac{\sqrt3}2,1$ for $0°,30°,45°,60°,90°$ — since $30°<60°$, $\sin30°$ MUST be the smaller value ($\frac12$), settling the pairing without needing to recall either value from scratch.

**MC-2 — SIGN-OMISSION-BEYOND-90** *(High)*
- Surface form: applying positive values for sin/cos/tan regardless of which quadrant an angle beyond $90°$ falls in.
- Root cause: overgeneralizing from exclusively Q1 exposure, where every value genuinely is positive.
- Repair: find the quadrant FIRST, then attach ASTC's sign — e.g. $\cos150°$: $150°$ is in Q2 where cosine is negative, so $\cos150°=-\cos30°=-\frac{\sqrt3}2$, never the bare positive value.

**MC-3 — QUADRANT-FORMULA-CONFUSION** *(Moderate)*
- Surface form: using $180°-\alpha$ (the Q2 formula) for a Q3 angle, or vice versa.
- Root cause: the two formulas are visually near-identical, differing only in the sign of one operator.
- Repair: think of $180°$ as a boundary — Q2 sits just BEFORE it (subtract: $180°-\alpha$), Q3 sits just PAST it (add: $180°+\alpha$); $210°=180°+30°$ places it correctly in Q3, never $180°-30°=150°$ (which is Q2).

## Analogies
- **The increasing-sequence analogy**: the sin column's monotonic increase from $0$ to $1$ across $0°$ to $90°$ is a checkable structural fact, not a coincidence — any claimed value can be sanity-checked against its neighbors.
- **Anti-analogy — trig values are NOT always positive beyond Q1.** This is MC-2's exact error, worth naming explicitly: the Q1-only intuition that feels universal from early exposure genuinely fails for every angle outside the first quadrant.

## Demonstrations
1. **Deriving the table from two triangles**: place the 45-45-90 and scaled 30-60-90 triangles on the unit circle, reading off exact values for all five angles — grounding the table in geometry rather than presenting it as a fact to memorize.
2. **Reference-angle-plus-ASTC gallery**: work a sequence of angles beyond $90°$ ($120°,135°,150°,210°,225°,270°,315°,330°$), applying reference angle then sign at each step — directly breaking MC-2 through repeated explicit sign attachment.
3. **Q2-versus-Q3 contrast**: the same reference angle ($30°$) placed in Q2 ($150°$) and Q3 ($210°$), showing the sign pattern differs (Q2: $+,-,-$; Q3: $-,-,+$) even though the magnitude is identical — directly breaking MC-3.

## Discovery Questions
1. "Without recalling either value directly, can you tell whether $\sin30°$ or $\sin60°$ is larger, just from knowing $30°<60°$ and that sine increases from $0°$ to $90°$?"
2. "Is $\cos150°$ positive or negative? What tells you the sign, separately from the magnitude?"
3. "$210°$ and $150°$ both have reference angle $30°$. Do they give the same trig values, or different ones? What's the difference?"

## Teaching Sequence
1. **Anchor in `math.trig.basic-ratios`**: restate SOH-CAH-TOA as the labeling procedure this concept applies to two specific, exactly-known triangles.
2. **Representation shift (breaks MC-1)**: derive the complete first-quadrant table from the 45-45-90 and 30-60-90 unit-circle triangles, ending with the increasing-sequence memory device.
3. **Pattern induction (breaks MC-2)**: the reference-angle-plus-ASTC gallery across all four quadrants, explicitly stating quadrant then sign at each step.
4. **Contrast pair (breaks MC-3)**: the Q2-versus-Q3 same-reference-angle comparison, ending with the "before/past $180°$" memory rule.
5. **Mastery gate**: 4-item problem set (exact values at $225°$; a sum/difference-flavored numerical evaluation; solving $\tan\theta=-1$ over $[0°,360°)$; a Pythagorean-identity-style simplification) plus 1 independence-mode transfer probe (an analogue-clock-hand geometry problem with an embedded claim-evaluation task).

## Tutor Actions
- **Representation shift**: the two-triangle derivation of the first-quadrant table, ending in the increasing-sequence device.
- **Pattern induction**: the reference-angle-plus-ASTC gallery across all four quadrants.
- **Contrast pair** (MC-3): the Q2-versus-Q3 same-reference-angle comparison.
- **Mastery gate**, 4-item problem set plus 1 transfer probe with an embedded claim-evaluation task.

## Voice Teaching Notes
- When first presenting $30°$ and $60°$ together, say explicitly "smaller angle, smaller sine — $30°$ is smaller than $60°$, so $\sin30°$ is the smaller value" as a fixed spoken anchor, directly targeting MC-1.
- For MC-2, use a standing two-step spoken checklist for every angle beyond $90°$: "First — what quadrant? Second — what sign does ASTC give there?" — never skip stating both steps.
- For MC-3, say "before $180°$, subtract; past $180°$, add" as a fixed phrase whenever a Q2/Q3 classification is needed.

## Assessment Signals
- **Early warning for MC-1**: stating $\sin30°=\frac{\sqrt3}2$ or $\cos30°=\frac12$ (the swapped values) on direct recall.
- **Early warning for MC-2**: reporting a positive value for a trig function evaluated at an angle where ASTC requires a negative sign.
- **Early warning for MC-3**: computing $210°$ as $180°-30°=150°$ or $150°$ as $180°+30°=210°$ — transposing the two formulas.
- **Mastery evidence**: correctly deriving an unfamiliar special-angle value from the underlying triangles without prompting, and correctly determining both magnitude and sign for a fresh angle beyond $90°$ in one pass.

## Tutor Recovery Strategy
- On MC-1: re-anchor on the increasing-sequence pattern with a fresh recall attempt, rather than simply restating the correct values — the misconception is a specific pairwise swap, not a missing derivation.
- On MC-2: rework a fresh beyond-$90°$ example, requiring the quadrant-then-sign checklist to be stated explicitly before any value is given — the misconception is a systematically missing step.
- On MC-3: return to the "before/past $180°$" boundary framing with a different reference angle than already seen, since the misconception is a formula-transposition error specific to the visual similarity of the two formulas.
- If a learner correctly derives Q1 values but fails every extension beyond $90°$, treat the reference-angle-plus-ASTC procedure as a distinct sub-skill and route to dedicated practice there rather than re-deriving the base table.

## Memory Hooks
- "Smaller angle, smaller sine" — for MC-1.
- "Find the quadrant first, then attach the sign" — for MC-2.
- "Before 180°, subtract; past 180°, add" — for MC-3.

## Transfer Connections
- **`math.trig.basic-ratios`** (prerequisite, already authored): the SOH-CAH-TOA labeling procedure this concept applies to two specific, exactly-solvable triangles.
- **`math.trig.trig-identities`** (sibling, already authored): the Pythagorean and sum/difference identities that Problem 2 of this concept's own mastery gate directly instantiates (sin(150°−120°) as a sine-difference computation).

## Cross-Subject Connections
- No cross-links are declared in the KG for this concept (`cross_links: []`); the Blueprint's own transfer probe uses an analogue-clock-hand geometry context purely as an application vehicle, not a formal cross-subject curriculum link, consistent with the KG's own record.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.trig.special-angles.md` (primitive-numbered format — P11/P04/P06/P91/P27/P41/P64/P89 scaffolding). All worked examples (the two-triangle derivation, the reference-angle-plus-ASTC gallery, the Q2-versus-Q3 contrast table), the complete misconception registry (MC-1 Foundational, MC-2 High, MC-3 Moderate), and the clock-hand transfer probe are reused by reference, never restated verbatim beyond the minimal illustrative excerpts above.
- Blueprint metadata (`requires`, `cross_links: none`, `difficulty`, `bloom`, `mastery_threshold`, `estimated_hours`) verified against the live KG — see Curriculum Feedback below: **zero technical discrepancy** (the Blueprint's own "Unlocks" prose is descriptive, naming no specific concept id, and does not contradict the KG's empty `unlocks` field).
- Independent transfer probe (independence mode, per the Blueprint's own stated `P76_mode: independence`): "An analogue clock has an hour hand 8 cm long. At 5:00, the hour hand points to the '5', which corresponds to an angle of 150° measured clockwise from the 12 o'clock position (equivalently, 210° in standard mathematical notation measured counterclockwise from the positive x-axis). (a) How far below the centre of the clock face is the tip of the hour hand? (b) A student says the tip is 4 cm to the right of the centre. Evaluate this claim." *(Expected: (a) $y=8\sin210°=8\cdot(-\frac12)=-4$ cm — 4 cm below centre. (b) $x=8\cos210°=8\cdot(-\frac{\sqrt3}2)=-4\sqrt3\approx-6.93$ cm — approximately 6.93 cm to the LEFT, not the right; the student's claim is wrong in both direction and magnitude.)*

## Runtime Asset References
- No AssetIdentity (ADR 14) explanation or probe assets exist yet for this concept in `src/lib/teaching/assets/`. Per this program's established layer-ownership boundary, Layer 3/7 (DB-backed serving assets) is out of scope for this Educational Brain authoring campaign — this entry is Layer 2 (Educational Brain) content only.

## Curriculum Feedback
- **Zero technical Blueprint/KG metadata discrepancy** for `requires`, `unlocks`, `cross_links`, `difficulty`, `bloom`, `mastery_threshold`, and `estimated_hours` — every field in the Blueprint's Component 0 metadata table matches the live KG exactly (verified by direct Python query against `docs/mathematics/kg/graph.json`). The Blueprint's Component 7/completion-note "Unlocks" text ("Unit circle fluency; exact-value computations in calculus; trig identities involving special angles") is descriptive prose naming no specific concept id, matching this campaign's own established distinction between genuine `unlocks`-field discrepancies and merely-descriptive prose — not counted as a metadata mismatch.

## Version History
- **2026-09-12 (Batch 57)**: authored as part of the Mathematics Educational Brain completion campaign. Unblocked by the already-authored `math.trig.basic-ratios` (Batch 56) — this concept is `basic-ratios`' own genuine downstream consumer, resolving the `unlocks`-field asymmetry that entry's own Curriculum Feedback recorded (the KG's `basic-ratios.unlocks` field is empty, but `special-angles.requires` genuinely lists `basic-ratios`). `math.trig` moves from 11/25 to 12/25 this batch.
