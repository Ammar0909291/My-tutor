# math.trig.degree-radian-conversion — Degree–Radian Conversion

## Identity
- **KG id**: `math.trig.degree-radian-conversion`
- **Domain**: math.trig (Trigonometry)
- **Requires**: `math.trig.angle-measure`
- **Unlocks**: none listed in the KG (Blueprint's own "Unlocks" note names `math.trig.special-angles`, `math.trig.trig-functions`, `math.trig.unit-circle` (radian entry) as future consumers — see Curriculum Feedback)
- **Cross-links**: none
- **Difficulty**: proficient · **Bloom level**: apply
- **Mastery threshold**: 0.9 · **Estimated hours**: 2

## Learning Objective
The learner derives both degree–radian conversion factors from the single fact $2\pi\text{ rad}=360°$, converts fluently in both directions, and applies the radian requirement correctly inside context formulas (arc length $s=r\theta$, sector area $A=\tfrac12r^2\theta$) by converting first.

## Core Understanding
Degrees and radians are two different units for measuring the *same* rotation, related by one anchor fact: a full circle's circumference is $2\pi r$, so one full rotation's arc length is $2\pi$ times the radius — which is *by definition* what "$2\pi$ radians" means (a radian is the angle whose arc length equals the radius). Since a full circle is also $360°$:
$$2\pi\text{ rad}=360°$$
Dividing both sides by 360 gives $1°=\frac{\pi}{180}$ rad — so **multiplying a degree value by $\frac{\pi}{180}$** converts it to radians. Dividing both sides by $2\pi$ gives $1\text{ rad}=\frac{180°}{\pi}$ — so **multiplying a radian value by $\frac{180}{\pi}$** converts it to degrees. Both factors come from the *same* single equation; there is nothing to memorize beyond $2\pi\text{ rad}=360°$ itself and which direction division was performed in.

A size-check sanity anchor makes the direction self-correcting: degrees are the "bigger" unit (360 of them per circle) while radians are the "smaller" unit (only $2\pi\approx6.28$ per circle), so converting degrees→radians must *shrink* the number (multiply by the small factor $\pi/180\approx0.0175$), and converting radians→degrees must *grow* the number (multiply by the large factor $180/\pi\approx57.3$).

Radians are not merely an alternate notation — several formulas are defined **in terms of** radian measure specifically, because radian measure *is* the ratio (arc length)/(radius): arc length $s=r\theta$, sector area $A=\tfrac12r^2\theta$, and angular velocity $\omega=\theta/t$ all require $\theta$ in radians, and substituting a degree value directly produces an answer wrong by a factor of $180/\pi\approx57.3$.

## Mental Models
- **One equation, two divisions.** $2\pi\text{ rad}=360°$ is the entire fact; dividing by 360 gives one factor, dividing by $2\pi$ gives the other — there's no need to memorize "which fraction goes which way" as two separate facts.
- **Degrees are bigger, so converting to radians shrinks the number.** The size-check heuristic above, usable as an immediate sanity check on any conversion without re-deriving the formula each time.
- **Radians are a *ratio*, not an arbitrary unit.** A radian's value comes directly from (arc length)/(radius) — this is *why* formulas like $s=r\theta$ require radians specifically: the formula is really just "arc length = radius × (arc length/radius)" when $\theta$ is already the ratio, and using degrees breaks that identity.

## Why Students Fail
None of this Blueprint's three misconceptions carry an explicit birth-type column (the same gap found across virtually every math.trig/math.calc/math.seq Blueprint this campaign), so each is independently classified here:
- **MC-1** is a **Type 1 (overgeneralization)**: having learned "there's a conversion factor," the learner applies *a* memorized factor without re-deriving which direction it belongs to — an easy slip since the two factors ($\pi/180$ and $180/\pi$) are reciprocals of each other and look superficially similar.
- **MC-2** is a **Type 5 (instruction-induced)** gap: formulas like $s=r\theta$ are often presented without foregrounding *why* $\theta$ must be in radians (the ratio-definition reasoning above), so the requirement reads as an arbitrary rule to remember rather than a structural necessity, and gets skipped under the pressure of an unfamiliar problem.
- **MC-3** is a **Type 3 (language contamination)**: "half of $360$ is $\pi$" is sometimes mis-stated or mis-heard as "$360$ is $\pi$," conflating the half-circle fact ($180°=\pi$ rad) with the full-circle fact ($360°=2\pi$ rad) — a linguistic compression error rather than a computational one.

## Misconceptions
**MC-1 — WRONG-CONVERSION-DIRECTION** *(Foundational, Type 1)*
- Surface form: multiplying by $180/\pi$ to convert degrees to radians (or by $\pi/180$ to convert radians to degrees) — the exact reversal of the correct factors.
- Root cause: applying a memorized factor without re-deriving direction from the anchor fact $2\pi\text{ rad}=360°$.
- Repair: the size-check heuristic — $\pi/180\approx0.0175$ *shrinks* a number (appropriate for the large-to-small unit conversion, degrees→radians); $180/\pi\approx57.3$ *grows* a number (radians→degrees). If a conversion result is wildly out of the expected range (e.g. converting $150°$ produces something in the thousands), the direction was reversed.

**MC-2 — DEGREE-SUBSTITUTION-IN-RADIAN-FORMULA**
- Surface form: computing arc length or sector area by substituting a degree value directly, e.g. $A=\tfrac12\times4\times90=180$ for a radius-2 circle with a 90° sector angle (correct answer: convert first, $A=\tfrac12\times4\times\tfrac{\pi}{2}=\pi\approx3.14$).
- Root cause: the radian requirement in these formulas is memorized as an arbitrary rule rather than understood as following from radian measure's own ratio definition.
- Repair: re-derive the formula's origin — radian measure IS (arc length)/(radius), so arc length = radius × (radian measure) is not a separate fact requiring degrees vs. radians to be memorized as a rule, but a direct algebraic consequence of what a radian *means*. Build the habit: "see $\theta$ in a geometric formula → convert to radians first, before anything else."

**MC-3 — FULL-CIRCLE-IS-PI** *(Type 3)*
- Surface form: believing $360°=\pi$ (confusing the half-circle fact $180°=\pi$ rad with the full-circle fact $360°=2\pi$ rad).
- Root cause: linguistic compression — "half of $360°$ is $\pi$ radians" mis-heard or mis-stated as "$360°$ is $\pi$."
- Repair: anchor explicitly to the half-circle first — a straight angle is $180°$, and traveling along the arc from one end of a diameter to the other covers arc length $\pi r$ (half the full circumference $2\pi r$), giving angle $\pi r/r=\pi$ radians. So $180°=\pi$ rad is the anchor fact; $360°=2\pi$ rad follows by doubling both sides.

## Analogies
- **The "bigger unit, smaller number" scale analogy:** converting inches to feet shrinks the number (there are fewer feet than inches for the same length) exactly as converting degrees to radians shrinks the number (there are fewer radians than degrees per circle) — reusing a familiar unit-conversion intuition the learner likely already has from measurement contexts, to make the size-check heuristic feel motivated rather than arbitrary.
- **Anti-analogy — radians are NOT "just a different-looking number for the same angle," interchangeable with degrees inside any formula.** The temptation to treat radian and degree measures as freely interchangeable notations for "the angle" (rather than genuinely different numerical values requiring conversion before substitution) is exactly what produces MC-2; the analogy above should never be extended to suggest the *numeric value* doesn't matter inside a formula.

## Demonstrations
1. **Derive both factors from one equation, live.** Start from $2\pi\text{ rad}=360°$, divide by 360 to get $1°=\pi/180$ rad, divide by $2\pi$ to get $1\text{ rad}=180°/\pi$ — showing both factors come from the same starting fact.
2. **Size-check on a concrete conversion.** Convert $150°$ to radians using the correct factor ($150\times\pi/180=5\pi/6\approx2.6$, a "small" number) versus the wrong factor ($150\times180/\pi\approx8594$, an implausibly large number) — the size mismatch itself signals the error before any algebra is re-checked.
3. **Arc-length formula, correct vs. wrong substitution.** A wheel of radius 6 cm rotates $120°$. Correct: convert first ($120°\to2\pi/3$ rad), then $s=r\theta=6\times2\pi/3=4\pi\approx12.57$ cm. Wrong: substitute $120$ directly, $s=6\times120=720$ cm — a dramatic, easily-flagged error.
4. **Half-circle anchor for MC-3.** Trace a straight angle ($180°$) along a semicircular arc of radius $r$; the arc length is $\pi r$ (half of $2\pi r$), so the angle in radians is $\pi r/r=\pi$ — establishing $180°=\pi$ rad as the anchor before doubling to get $360°=2\pi$ rad.

## Discovery Questions
1. "If $2\pi$ radians equals $360°$, what do you get when you divide both sides by 360? What do you get when you divide both sides by $2\pi$?"
2. "Convert $150°$ to radians using each of the two factors ($\pi/180$ and $180/\pi$) and compare the two results. Which one looks like a 'reasonable' angle measure, and which looks obviously wrong?"
3. "A circle has radius 2 and a sector angle of $90°$. Try computing the sector area by plugging $90$ directly into $A=\tfrac12r^2\theta$. Now convert $90°$ to radians first and try again. Why is one of these answers about 57 times bigger than the other?"

## Teaching Sequence
1. **Anchor in `math.trig.angle-measure`**: restate degrees as a familiar rotational unit (protractor measurements, 1/360 of a full circle), establishing the shared prior knowledge this concept builds from.
2. **Derive both conversion factors** from $2\pi\text{ rad}=360°$ via the representation-shift demonstration above, immediately applying the size-check heuristic to break MC-1.
3. **Build the standard angle table** (0°, 30°=π/6, 45°=π/4, 60°=π/3, 90°=π/2, 120°=2π/3, 180°=π, 270°=3π/2, 360°=2π) by repeated application of the degree→radian factor, reinforcing fluency in one direction before drilling the reverse.
4. **Apply conversions in context formulas** (arc length, sector area, angular velocity), using the correct-vs-wrong substitution contrast to break MC-2.
5. **Address MC-3 directly** via the half-circle anchor demonstration, whenever a full-vs-half circle confusion surfaces (commonly triggered by problems involving angles near or past 180°/360°).
6. **Mastery gate**: 4-item problem set (both conversion directions, one arc-length context problem, one radian-to-degree exact-and-decimal problem) plus 1 independence-mode transfer probe (a pendulum arc-length problem with an embedded error-identification task).

## Tutor Actions
- **Representation shift** (MC-1): derive both factors from the single anchor equation, pairing with the size-check heuristic immediately.
- **Pattern induction**: gallery of conversions (both directions) plus the standard angle table, building fluency before introducing context formulas.
- **Contrast pair** (MC-2): correct-first-convert vs. wrong-direct-substitution side by side on the same arc-length problem.
- **Mastery gate**, 4-item problem set plus 1 transfer probe embedding a worked-error-identification task.

## Voice Teaching Notes
- State the anchor fact aloud as a single sentence every time conversion comes up: "one full circle is both 360 degrees and 2π radians — everything else follows from that one equation" — reinforcing that there is one fact to remember, not two separate factors to memorize independently.
- For the size-check heuristic, narrate it as a spoken sanity check after every conversion: "does this number look bigger or smaller than what we started with? Which direction should it have gone?" — building the self-correction habit directly into the learner's own problem-solving voice, not just the tutor's.
- For context formulas, say "see theta, think radians" as a fixed verbal trigger the moment a formula with $\theta$ appears, before any substitution happens — front-loading the repair for MC-2 rather than catching it after a wrong answer.

## Assessment Signals
- **Early warning for MC-1**: a converted value that is off by roughly a factor of $57.3$ (or its reciprocal, $\approx0.0175$) from the expected magnitude is a direct signature of the reversed factor, even before checking the algebra step by step.
- **Early warning for MC-2**: any context-formula computation (arc length, sector area, angular velocity) using a numeric $\theta$ value that visibly matches a degree measure (e.g. 90, 120, 240) rather than a radian expression (a multiple of $\pi$ or a decimal near $0$–$2\pi$) signals the substitution error before the final answer is even checked.
- **Early warning for MC-3**: stating or implying $360°=\pi$ rad, or equivalently treating $\pi$ as the *full*-circle radian measure rather than the half-circle one.
- **Mastery evidence**: fluent bidirectional conversion without hesitation on direction, correct radian substitution into context formulas without an explicit reminder, and correct identification of a worked error when one is embedded in a transfer problem (the Blueprint's own P76 transfer probe structure).

## Tutor Recovery Strategy
- On MC-1: never simply restate "the factor is $\pi/180$" — walk the size-check heuristic explicitly (is this conversion supposed to shrink or grow the number?) so the learner has a self-correcting tool for future conversions, not just a corrected instance.
- On MC-2: return to the ratio-definition of a radian ((arc length)/(radius)) rather than restating "the formula needs radians" as a bare rule — the repair only holds if the *reason* for the requirement is rebuilt, not merely the requirement itself.
- On MC-3: use the half-circle anchor (arc length $\pi r$ for a straight angle) as the recovery route every time, rather than simply re-asserting "$360°=2\pi$" — the misconception is a linguistic compression error and needs the physical derivation to unstick it.
- If a learner fails the embedded-error-identification transfer probe specifically (correctly performs the conversion and arc-length computation but cannot diagnose *why* a wrong worked solution is wrong), treat this as a distinct gap from computational fluency and revisit the correct-vs-wrong contrast-pair demonstration rather than re-drilling raw conversions.

## Memory Hooks
- "One equation, two divisions" — for deriving both conversion factors from $2\pi\text{ rad}=360°$.
- "Degrees are bigger, so converting to radians shrinks the number" — the size-check heuristic for MC-1.
- "See theta, think radians" — for MC-2, the context-formula trigger phrase.
- "Half circle is $\pi$, full circle is $2\pi$" — for MC-3, anchored to the half-circle arc-length derivation.

## Transfer Connections
- **`math.trig.unit-circle`** (already authored this same batch): that concept's key-angle table (0°, 30°, 45°, 60°, 90°, ...) is stated in degrees there; this concept supplies the radian equivalents of the identical angle set, and a future radian-based re-entry into the unit circle (named in the Blueprint's own "Unlocks" note, though not present in the KG's `unlocks` field for this concept — see Curriculum Feedback) would build directly on both.
- **`math.trig.special-angles`** and **`math.trig.trig-functions`** (named in the Blueprint's "Unlocks" note as future consumers of this concept, though neither is listed in the KG's own `unlocks` field for this concept — see Curriculum Feedback): both would rely on fluent degree-radian conversion once authored.
- **Physics angular-velocity formulas** ($\omega=\theta/t$, the R3 spaced-repetition probe's own RPM-to-rad/s conversion): this concept is the direct mathematical prerequisite for any physics treatment of rotational motion that expresses angular velocity in radians per second, though no such physics concept is cross-linked in the KG for this entry.

## Cross-Subject Connections
- No cross-links are declared in the KG for this concept (`cross_links: none`), and none are asserted here beyond the KG's own record. The Blueprint's own R3 spaced-repetition probe (RPM → rad/s) hints at a natural physics connection (rotational kinematics), but that connection is not claimed as a formal cross-link since the curriculum data doesn't support it.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.trig.degree-radian-conversion.md` (older 10-component format: Metadata table, Cognitive Map, Misconception Registry, Scaffolding Protocol, Protocol A main sequence with 2 teaching actions plus a mastery gate, Protocol B repair sequences, P89 spaced repetition with 3 review probes, Cross-Blueprint Dependencies, Teaching Notes, Validation Checklist). All worked examples (the wheel arc-length problem, the pendulum transfer probe, the standard angle table derivation), the complete misconception registry (MC-1/MC-2/MC-3, none carrying an explicit birth-type column), and the spaced-repetition schedule (R1/R2/R3) are reused by reference, never restated verbatim beyond the minimal illustrative excerpts above.
- Independent transfer probe (independence mode, per the Blueprint's own stated `P76_mode: independence` and `cross_links: none` — no discrepancy to resolve here): "A pendulum of length 1.5 m swings through a central angle of $5\pi/9$ radians. (a) Convert the angle to degrees. (b) Find the arc length of the pendulum's path. (c) A student computes the arc length as $1.5\times100°=150$ m. Identify the error." *(Expected: (a) $(5\pi/9)\times(180/\pi)=100°$. (b) $s=r\theta=1.5\times(5\pi/9)=5\pi/6\approx2.618$ m, using $\theta$ in radians. (c) The student substituted the degree value $100$ directly into $s=r\theta$, which requires radians; the correct $\theta=5\pi/9$ rad gives $5\pi/6$ m, not 150 m.)*

## Runtime Asset References
- No AssetIdentity (ADR 14) explanation or probe assets exist yet for this concept in `src/lib/teaching/assets/`. Per this program's established layer-ownership boundary, Layer 3/7 (DB-backed serving assets) is out of scope for this Educational Brain authoring campaign — this entry is Layer 2 (Educational Brain) content only.

## Curriculum Feedback
- **One genuine Blueprint/KG discrepancy found, resolved toward the KG (not fixed in the Blueprint)**: the Blueprint's Component 7 (Cross-Blueprint Dependencies) states "Unlocks: math.trig.special-angles, math.trig.trig-functions, math.trig.unit-circle (radian entry)" — but the live KG's `unlocks` field for `math.trig.degree-radian-conversion` is empty (`[]`). None of the three named concepts list `math.trig.degree-radian-conversion` as a prerequisite in the live KG either (verified: `math.trig.unit-circle`'s own `requires` is `[math.trig.right-triangle-trig, math.geom.circle]`, not including this concept). This entry's Identity and Transfer Connections sections above follow the KG (stating "none listed" for Unlocks) while still recording the Blueprint's forward-looking pedagogical intent honestly, per this program's standing rule of never fixing the KG.
- All other Blueprint metadata fields (`requires`, `cross_links`, `difficulty`, `bloom`, `mastery_threshold`, `estimated_hours`, `P76_mode: independence`) match the live KG exactly.

## Version History
- **2026-09-12 (Batch 53)**: authored as part of the Mathematics Educational Brain completion campaign. Second of two `math.trig` concepts authored this batch (companion: `math.trig.unit-circle`), unblocked by the already-authored `math.trig.angle-measure` (Batch 52). `math.trig` moves from 2/25 to 4/25 this batch. Records a genuine Blueprint/KG `unlocks`-field discrepancy (see Curriculum Feedback), resolved toward the KG.
