# math.arith.estimation

## Identity
- **KG ID**: `math.arith.estimation`
- **Domain**: math.arith (Arithmetic)
- **Requires**: `math.arith.rounding`
- **Unlocks**: (none in current KG)
- **Related**: `math.arith.rounding`, `math.arith.significant-figures`
- **Cross-links**: `math.num.error-analysis` — confirmed NOT yet authored (no Blueprint, no Educational Brain entry found via directory listing) — independence mode for the transfer probe below.
- **Difficulty**: developing
- **Bloom level**: apply
- **Mastery threshold**: 0.8 (⌈0.8×5⌉ = 4/5)
- **Estimated hours**: 5
- **Blueprint**: none found (`docs/curriculum/blueprints/math.arith.estimation.md` does not exist — verified by directory listing). Misconceptions authored directly via the birth-taxonomy diagnostic procedure.

## Learning Objective
The student will produce a quick, purposefully-rounded approximate answer to a numerical problem BEFORE (or instead of) computing an exact answer, choosing a rounding direction and precision level appropriate to the purpose of the estimate (e.g., a safety margin, a quick sanity check, a budget ceiling), and will treat the estimate as a legitimately useful answer in its own right rather than an inferior placeholder for the "real" exact computation.

## Core Understanding
Estimation is a deliberate, purpose-driven skill built on `math.arith.rounding`, not merely "rounding applied without thinking about why." The central habit of mind is: decide what the estimate is FOR before deciding how to round. A construction supply estimate should round UP (never run short of material); a "can I afford this" budget check should round UP the costs and DOWN the available cash (a conservative safety margin); a quick sanity check on a calculator result just needs "close enough, either direction" to catch gross errors. Estimation is genuinely useful precisely because it is faster and lower-cognitive-load than exact computation, and a good mathematician reaches for it constantly — as a first move to catch errors before they compound, not only as a fallback when exact computation isn't possible.

## Mental Models
1. **The purpose-first model**: before rounding a single number, ask "what is this estimate protecting me from — running out, overspending, being surprised?" — the answer determines whether to round up, down, or either way, and this question comes BEFORE any arithmetic.
2. **The safety-margin model**: rounding "the wrong way on purpose" (e.g., always rounding costs up and income down) builds in a buffer against being caught short — a deliberate asymmetry, not sloppiness.
3. **The compass-check model**: an estimate computed first acts like a compass bearing — it doesn't need to be exact, only close enough to tell you whether your later exact computation is heading in a sensible direction, immediately flagging a wildly wrong exact answer (e.g., a misplaced decimal point) as implausible.

## Why Students Fail
The dominant failure mode is treating estimation as a lesser, second-class version of "real" math to be tolerated only when exact computation is impossible or too slow — this framing, if left unaddressed, causes students to either skip estimation entirely and jump straight to (sometimes calculator-assisted) exact computation, or to treat any deviation from the exact value as itself an error to be apologized for, rather than an intentional feature of a good estimate. A second failure is applying a single fixed rounding convention (e.g., "always round to the nearest whole") regardless of the situation's actual purpose, producing technically-rounded but practically useless estimates (e.g., rounding DOWN the amount of paint needed for a wall, then running short).

## Misconceptions
- **MC-1 — ESTIMATION-REQUIRES-EXACT-COMPUTATION-FIRST** (FOUNDATIONAL)
  - **Statement**: The student computes the exact answer first and then rounds it to "produce" the estimate, rather than estimating directly from rounded inputs before any exact computation — defeating the entire purpose of estimation as a fast, low-load, error-catching first move.
  - **Birth type**: Type 5, instruction-induced — many students first encounter "estimating an answer" as a check performed AFTER solving a problem exactly (e.g., "solve this, then round your exact answer to see if it's reasonable"), which teaches the sequence backward relative to estimation's actual real-world value as an upfront, cheap, fast approximation computed before the effortful exact work.
  - **Diagnostic probe**: Give a multi-digit multiplication problem and ask the student to "estimate the answer" under a short time limit that makes exact computation implausible; MC-1 shows as the student attempting the exact computation anyway (often incompletely, running out of time) rather than rounding the inputs first and multiplying the simpler rounded numbers.
  - **Repair approach**: Explicitly practice the "round the inputs, THEN compute" sequence as a distinct skill from "compute, then round the output," using time pressure deliberately (a short, friendly countdown) to make exact computation genuinely implausible and force the input-rounding-first habit to take hold.

- **MC-2 — ESTIMATE-TREATED-AS-WRONG-ANSWER**
  - **Statement**: The student (or a student self-grading their own estimate against a later exact computation) treats any difference between the estimate and the exact value as evidence the estimate was "incorrect," rather than understanding that a reasonable estimate is expected and intended to differ from the exact value by a bounded, purpose-appropriate margin.
  - **Birth type**: Type 3, language contamination — the everyday word "estimate" is used correctly in casual language, but classroom framing that grades estimation exercises with a single "right answer" (the textbook's own rounded value) rather than accepting a reasonable range inadvertently imports the language of exactness ("wrong," "incorrect") into a task whose entire point is approximation, confusing the student about what success looks like.
  - **Diagnostic probe**: After a student produces a reasonable but not textbook-identical estimate, ask "do you think your estimate was wrong?" — MC-2 shows as an apologetic or self-correcting response even when the estimate was entirely reasonable for its stated purpose.
  - **Repair approach**: Explicitly grade/discuss estimation exercises using a RANGE of acceptable answers rather than one fixed target number, and use the language "reasonable" and "close enough for the purpose" consistently instead of "correct," reinforcing that the goal is fitness-for-purpose, not exactness.

- **MC-3 — ROUNDING-DIRECTION-NOT-CHOSEN-FOR-PURPOSE**
  - **Statement**: The student applies a single default rounding convention (typically "round to nearest") to every estimation task regardless of the task's actual purpose, producing estimates that are directionally wrong for their intended use (e.g., rounding DOWN the number of buses needed for a school trip, resulting in not enough seats).
  - **Birth type**: Type 1, overgeneralization — standard rounding practice (`math.arith.rounding`) is taught and practiced almost exclusively as "round to nearest," so the student overgeneralizes that single convention to every context, without the explicit purpose-first reasoning (Mental Model 1) that would flag when "round to nearest" is actually the wrong choice.
  - **Diagnostic probe**: Present a "how many buses are needed" or "how much rope should we buy" style problem where nearest-rounding produces an insufficient quantity, and ask the student to justify their rounding direction choice explicitly; MC-3 shows as a default "round to nearest" answer given without any purpose-based justification, or an answer that leaves the practical scenario unsatisfied (e.g., some students left standing, rope too short).
  - **Repair approach**: Explicitly teach and practice all three rounding-direction cases side-by-side using contrasting real scenarios — round-up-always ("how much material to buy so you never run short"), round-down-always ("how much cash you can safely assume you have"), and round-to-nearest ("what's a quick ballpark check of this calculation") — so the student builds an explicit decision habit (purpose-first, Mental Model 1) rather than a single default reflex.

## Analogies
- **Packing-for-a-trip analogy**: estimating how many clothes to pack is like estimating quantities for a purpose — you round UP (pack a few extra just in case) rather than packing the bare minimum calculated exactly, because the cost of being short is worse than the cost of a small surplus.
- **Speedometer-glance analogy**: a quick glance at a speedometer (an estimate of your speed) is enough to know you're driving safely, without needing the exact velocity to ten decimal places — illustrating that "close enough for the purpose" is often the actual goal, not a compromise.

## Demonstrations
- Side-by-side timed race: estimate an answer to a multi-digit problem in 5 seconds (rounding inputs first) versus computing it exactly, making the speed and cognitive-load difference concrete and directly motivating why estimation is a genuinely valuable standalone skill, not just a fallback.
- A "which way should I round?" sorting activity: present several real scenarios (buying material, budgeting cash, quick sanity-checking a calculator result) and have the student sort them into round-up / round-down / round-either-way categories before any calculation, directly targeting MC-3.

## Discovery Questions
1. "Before you do any exact math, what is this estimate actually FOR — what mistake is it trying to help you avoid?"
2. "If your estimate doesn't exactly match the exact answer later, does that mean your estimate was wrong?"
3. "Why might you deliberately round UP the cost of something and DOWN the money you have, even though 'round to nearest' is the rule you usually use?"

## Teaching Sequence
1. Confirm `math.arith.rounding` fluency (choosing a place value and rounding correctly) is solid.
2. Introduce the purpose-first model (Mental Model 1) using contrasting real scenarios before any formal estimation procedure.
3. Practice "round the inputs, then compute" (targeting MC-1) under mild time pressure that makes exact computation implausible, contrasted directly against "compute, then round" to make the sequencing distinction explicit.
4. Explicitly teach and contrast all three rounding-direction cases (round up / round down / round to nearest) tied to purpose, via the sorting activity (targeting MC-3).
5. Reframe assessment language throughout as "reasonable / close enough for the purpose" rather than "correct," and grade against a range (targeting MC-2).
6. Practice using estimation as a first-move sanity check on later exact-computation problems (the compass-check model), reinforcing estimation's standing value rather than treating it as a one-off unit topic.

## Tutor Actions
- **DO: Worked Example** — the timed round-inputs-first estimation race.
- **ORGANIZE: Matching/Sorting** — sort real scenarios into round-up/round-down/round-nearest categories.
- **TEST-THINKING: Prediction** — before an exact computation, predict a ballpark estimate and state its purpose.
- **SOCIAL: Discussion** — discuss why "wrong" is the wrong word for a reasonable estimate that differs from the exact value.

## Voice Teaching Notes
Consistently use the words "reasonable" and "close enough for the purpose" rather than "correct" or "wrong" when discussing estimates, and explicitly ask "what's this estimate protecting you from?" before any rounding-direction question — this pairing of vocabulary and question habit directly targets both MC-2 and MC-3 in ordinary conversational teaching, not only in formal assessment.

## Assessment Signals
- **P76 (transfer probe)**: cross-link mode = independence (`math.num.error-analysis` confirmed unauthored via directory listing, so no genuine Tier-1 cross-link is available yet). Present a self-contained scenario requiring the student to (a) choose a rounding direction justified by purpose and (b) estimate before computing exactly, then compare — assessing both the input-first sequencing (MC-1) and purpose-driven direction choice (MC-3) together.
- **P77 (mastery gate)**: 4/5 correct across a mixed set covering all three rounding-direction cases and at least one item explicitly requiring the student to justify (in words) why their estimate is expected to differ from the exact value, directly checking that MC-2 has not persisted.

## Tutor Recovery Strategy
If purpose-first reasoning (MC-3) remains shaky, regress to fully concrete, physically consequential scenarios the student can act out or visualize directly (e.g., "if you buy too little rope, you literally cannot finish tying the package — what does that tell you about which way to round?") before returning to abstract numeric-only practice problems.

## Memory Hooks
- "Estimate first, ask why, THEN round — never compute exact and round backward into an estimate."
- "Round the way that protects you: up for 'don't run short,' down for 'don't overspend,' nearest for 'just a quick check.'"

## Transfer Connections
- Significant figures (`math.arith.significant-figures`) and rounding (`math.arith.rounding`) both feed directly into estimation's input-preparation step.
- Later error-analysis and measurement-uncertainty concepts (e.g., the not-yet-authored `math.num.error-analysis`) will extend the purpose-first estimation habit into formal bounds on acceptable error.

## Cross-Subject Connections
- Physics and chemistry lab work: order-of-magnitude estimation before a detailed calculation is standard scientific practice for catching gross errors (the compass-check model applies directly).
- Everyday financial literacy: budgeting decisions (round costs up, round income down) are a direct real-world application of purpose-driven rounding direction.

## Blueprint References
None — no Blueprint exists for `math.arith.estimation` (verified via directory listing).

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
`math.num.error-analysis` (this concept's cross-link target) is confirmed not yet authored (no Blueprint, no Educational Brain entry) — the P76 transfer probe above therefore uses independence mode; this should be revisited as a genuine Tier-1 cross-link once that concept is authored. No KG or Blueprint file was modified in authoring this entry.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.arith Wave 6 part 2.
