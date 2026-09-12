# math.calc.volume-revolution

## Identity
- **KG ID**: `math.calc.volume-revolution`
- **Domain**: math.calc (Calculus)
- **Requires**:
  - `math.calc.integral-area` — load-bearing part: volume-by-revolution generalizes the "sum of thin cross-sectional pieces" idea from 2D area (thin vertical strips) to 3D volume (thin disks/washers/shells), reusing the identical Riemann-sum-as-a-limit foundation.
- **Unlocks**: none in the KG.
- **Cross-links**: none in the KG (`P76_mode=independence`, per the Blueprint).
- **Difficulty**: advanced
- **Bloom level**: apply
- **Mastery threshold**: 0.75
- **Estimated hours**: 10 (the highest in the domain so far — reflects the genuine breadth of three distinct methods, not padding)
- **Blueprint**: `docs/curriculum/blueprints/math.calc.volume-revolution.md` (reused by reference throughout)

## Learning Objective
- The learner can compute the volume of a solid formed by revolving a region around an axis using the **disk method**, $V=\pi\int f(x)^2\,dx$, when the region touches the axis of revolution directly.
- The learner can recognize when a region does NOT touch the axis (leaving a hollow gap) and correctly switch to the **washer method**, $V=\pi\int\bigl(f(x)^2-g(x)^2\bigr)\,dx$, subtracting the hollow inner volume rather than including it.
- The learner can recognize the **shell method**, $V=2\pi\int xf(x)\,dx$, as a genuine alternative for revolution around a vertical axis, and can state when it is more efficient than forcing disk/washer via an unnecessary inverse-function rewrite.

## Core Understanding
Volume by revolution is the SAME limiting idea as `math.calc.integral-area`'s own area-by-strips construction, one dimension up: instead of summing thin vertical strips of height $f(x)$ and width $dx$ to get area, revolving the region around an axis sweeps each thin strip into a thin 3D slice — a disk, a washer, or (viewed from a different orientation) a cylindrical shell — and the volume is the limit of the sum of these slice volumes as their thickness shrinks to zero, i.e., a definite integral. The **disk method** applies when the revolved region touches the axis directly, so each slice is a solid disk of radius $f(x)$ and volume $\pi f(x)^2\,dx$. The **washer method** applies when the region sits at a distance from the axis (a genuine gap), so each slice is a disk WITH a hole — an outer disk of radius $f(x)$ minus an inner disk of radius $g(x)$, giving $\pi\bigl(f(x)^2-g(x)^2\bigr)\,dx$; using the disk method alone here would overcount the hollow interior as solid material. The **shell method** takes a different slicing orientation entirely — thin cylindrical shells parallel to the axis of revolution, each of radius $x$, height $f(x)$, and thickness $dx$, giving volume $2\pi x f(x)\,dx$ — and is often the more efficient choice for revolution around a VERTICAL axis when the region is naturally described as a function of $x$, since it avoids solving for the inverse function $x=f^{-1}(y)$ that the disk/washer method would otherwise require.

## Mental Models
1. **Beginner — "revolving a region gives a 3D shape; slice it and integrate."** No distinction yet between disk, washer, and shell. *Upgrade trigger*: encountering a region that does not touch the axis, where the disk-only approach silently overcounts.
2. **Intermediate — "does the region touch the axis? Disk if yes, washer if no; check for a gap first, every time."** The gap-check becomes a deliberate, explicit step before choosing a formula. *Upgrade trigger*: revolving around a VERTICAL axis where the function is naturally $y=f(x)$, forcing an awkward inverse-function rewrite for disk/washer.
3. **Advanced — "three slicing orientations exist (disk, washer, shell); pick the one that avoids an unnecessary rewrite."** The shell method is recognized as a genuinely different slicing direction (parallel to the axis, not perpendicular), not merely a formula variant. *Upgrade trigger*: needing to justify WHY the shell formula $2\pi x f(x)$ correctly measures volume (the shell's circumference $2\pi x$ times its height $f(x)$ times its thickness $dx$), not merely apply it.
4. **Expert — all three methods are the SAME Riemann-sum-as-a-limit idea from `math.calc.integral-area`, applied to different cross-sectional shapes (disk, washer, or shell) chosen for computational convenience, never for correctness.** Any solid of revolution can in principle be computed by any applicable method; the choice is efficiency, not correctness, provided the gap and axis orientation are both correctly diagnosed. *Shelf life*: permanent.

## Why Students Fail
The dominant failure is a scope-overextension: a learner who has practiced the disk method on region-touches-axis problems applies the SAME formula unreflectively to a region with a genuine gap from the axis, silently including the hollow interior as if it were solid material — an overgeneralization of a formula beyond the boundary condition (region touches the axis) that makes it valid (MC-1, DISK-METHOD-USED-WHEN-A-GAP-FROM-THE-AXIS-REQUIRES-THE-WASHER-METHOD). A second, distinct failure is one of missing exposure rather than misapplied procedure: because most introductory treatments present disk and washer methods far more heavily than the shell method, a learner facing a vertical-axis revolution defaults to forcing an inverse-function rewrite to make disk/washer work, never considering that the shell method handles the SAME region directly in terms of $x$ — the shell method is not incorrectly applied, it is simply never considered as an available alternative (MC-2, SHELL-METHOD-NOT-CONSIDERED-AS-THE-MORE-EFFICIENT-ALTERNATIVE-FOR-VERTICAL-AXIS-ROTATION).

## Misconceptions
Reused by reference from the Blueprint's Component 2 registry (MC-1, MC-2) and its own worked-example contrasts (Example 2 breaks MC-1, Example 3 breaks MC-2). **The Blueprint's Misconception Registry carries a Severity column (Foundational, Moderate) but no explicit birth-type column**; both classifications below are independently assigned here.

- **MC-1 — DISK-METHOD-USED-WHEN-A-GAP-FROM-THE-AXIS-REQUIRES-THE-WASHER-METHOD** (the Blueprint's own "Foundational" misconception — a substantial overcount, not merely an inefficiency)
  - **Birth type**: Type 1, overgeneralization. The disk method's formula is applied beyond its valid boundary condition (region touching the axis) without first checking whether the region actually touches the axis or sits at a distance from it.
  - **Characteristic phrase**: computing $V=\pi\int f(x)^2\,dx$ for a region that visibly sits above (or beside) the axis, without subtracting an inner-radius term.
  - **Detection probe** (Blueprint's Example 2): the region between $\sqrt x$ and $x/2$ on $[0,4]$, revolved around the x-axis — a learner using disk-only overcounts by including the hollow region between the inner curve and the axis.
  - **Repair**: explicitly ask "does the revolved region touch the axis of revolution, or is there a gap?" as a mandatory first step before choosing disk versus washer, on EVERY revolution problem, regardless of how routine it looks.
  - **Verification of death**: given a fresh region with a gap from the axis, the learner states "washer, because there's a gap" before writing any formula, and correctly identifies the outer radius $f(x)$ and inner radius $g(x)$.

- **MC-2 — SHELL-METHOD-NOT-CONSIDERED-AS-THE-MORE-EFFICIENT-ALTERNATIVE-FOR-VERTICAL-AXIS-ROTATION** (the Blueprint's own "Moderate" misconception — inefficient rather than incorrect, since a correct answer can still be reached via disk/washer with the inverse-function rewrite)
  - **Birth type**: Type 5, instruction-induced. Most introductory practice sets emphasize disk/washer methods far more heavily than the shell method, so the shell method is simply undertaught relative to its usefulness, leaving it absent from the learner's default toolkit rather than misapplied.
  - **Characteristic phrase**: for a vertical-axis revolution of a region naturally given as $y=f(x)$, immediately attempting to solve for $x$ in terms of $y$ to force the disk/washer method, without considering the shell method.
  - **Detection probe** (Blueprint's Example 3): $f(x)=x^2$ on $[0,2]$ revolved around the y-axis — a learner who rewrites $x=\sqrt y$ to force disk/washer, rather than using the shell method directly on $f(x)=x^2$, demonstrates MC-2.
  - **Repair**: explicitly name the shell method as a genuine third option whenever the axis of revolution is vertical and the function is naturally expressed as $y=f(x)$ — ask "would an inverse-function rewrite be needed for disk/washer here? If so, try shells first."
  - **Verification of death**: given a vertical-axis revolution of a function naturally expressed as $y=f(x)$, the learner considers the shell method as a candidate BEFORE attempting an inverse-function rewrite.

## Analogies
- **Best — a solid cake versus a bundt cake (a cake with a hole through the middle).** The disk method bakes a solid cake (radius $f(x)$, no hole); the washer method bakes a bundt cake (outer radius $f(x)$, a hole of radius $g(x)$ scooped out). Forgetting to scoop out the hole (disk-only on a gapped region) overstates how much cake there actually is.
- **Alternative — wrapping paper around a cylinder versus stacking coins.** The disk/washer method stacks thin coins (perpendicular to the axis) to build the solid; the shell method wraps thin cylindrical sheets (parallel to the axis) around it instead — two different, equally valid ways of filling the same solid.
- **ANTI-ANALOGY — "just square the function and integrate, like every other revolution problem."** This vague phrasing licenses MC-1 directly, since it never asks whether the region touches the axis. Say "check for a gap first — squaring the OUTER radius and subtracting the squared INNER radius is only needed when there's a gap" instead.

## Demonstrations
- **The overcounted bundt cake.** Compute the volume of revolving the region between $\sqrt x$ and $x/2$ on $[0,4]$ around the x-axis using disk-only (ignoring the gap) versus the correct washer method. *Predict whether the two answers will be the same before computing.* Getting a strictly LARGER (wrong) disk-only answer, because it included the hollow interior as solid, is the demonstration for MC-1.
- **The rewrite-avoidance race.** Compute the volume of revolving $f(x)=x^2$ on $[0,2]$ around the y-axis via (a) solving for $x=\sqrt y$ and using disk/washer, and (b) the shell method directly on $f(x)=x^2$. *Predict which route will take fewer algebraic steps before computing both.* Reaching the SAME answer with visibly less algebra via shells is the demonstration for MC-2.
- **The disk-versus-washer visual check.** Sketch the revolved region's cross-section at a single value of $x$: a solid disk (touches axis) versus an annulus/washer shape (gap from axis). *Predict, from the sketch alone, which formula applies before computing anything.*

## Discovery Questions
Direct instruction is the argued call for the three formulas themselves (each is a specific geometric consequence of the Pythagorean-free disk/shell cross-sectional area formula, not independently rediscoverable at this level), but the GAP-CHECK discipline (MC-1) and the method-choice efficiency comparison (MC-2) are both genuinely discoverable by direct visual/numeric comparison.
1. **Need** — "Sketch the region between $\sqrt x$ and $x/2$ on $[0,4]$. Does it touch the x-axis everywhere, or is there a gap somewhere?" The learner should notice a visible gap near $x=4$.
2. **Playground** — sketch a couple more regions and classify each as "touches the axis" or "has a gap."
3. **Invention** — "If there's a gap, what would happen if you used the disk formula anyway? What would you be including that shouldn't be there?" Let the learner connect the gap to the hollow interior being wrongly counted as solid.
4. **Collision** — confront a learner who used disk-only on a gapped region with the visibly-too-large answer from the disk-versus-washer demonstration.
5. **Formalisation** — state the washer formula explicitly, $V=\pi\int(f(x)^2-g(x)^2)dx$, as "outer squared minus inner squared."
6. **Compression** — "Touches the axis: disk. Has a gap: washer, subtract the hole. Vertical axis and messy inverse: try shells."

## Teaching Sequence
The gap-check discipline (MC-1) must be established FIRST, before the shell-method alternative (MC-2) is introduced, since a learner who cannot yet reliably distinguish "touches the axis" from "has a gap" is not ready to layer a THIRD method-choice decision (disk/washer versus shell) on top of an unresolved first decision (disk versus washer). Once the disk-versus-washer gap-check is fluent, the shell method is introduced as a genuinely different slicing orientation — per the Blueprint's own A03, framed explicitly as an efficiency alternative for vertical-axis revolutions, never as a replacement for disk/washer. Turn-level scripts for A01–A04 are owned by the Blueprint's Component 4 and are not restated here.

## Tutor Actions
- **DO: Worked Example** — the overcounted bundt cake (disk-only versus washer on the same gapped region), with the learner sketching the region and identifying the gap BEFORE any formula is written. First action; anchors the gap-check concretely.
- **TEST-THINKING: Prediction** — "Does this region touch the axis of revolution, or is there a gap?" asked on a fresh region, BEFORE any formula is chosen. Surfaces MC-1 in one turn.
- **DO: Demonstration** — the rewrite-avoidance race (disk/washer-via-inverse-rewrite versus shells directly), run with the learner comparing algebraic effort as well as final answers.
- **TEST-THINKING: Error Analysis** — "A student revolved the region between $y=x$ and $y=x^2$ around the x-axis using only $\pi\int x^2\,dx$. What's missing?" targets MC-1 directly.
- **Does NOT fit: deriving the shell-method formula from first principles via a full Riemann-sum limit argument here.** This concept states and applies the shell formula as a geometric consequence (circumference times height times thickness); a full limit-based derivation is beyond this concept's scope.

## Voice Teaching Notes
The load-bearing sentence is "does the region touch the axis, or is there a gap? — check that FIRST, before writing any formula." Say it every time a new revolution problem is introduced, not just the first. Listen for a learner who writes $\pi\int f(x)^2\,dx$ without ever mentioning the axis or the region's position relative to it — that omission is the tell for MC-1. Listen for a learner who, on a vertical-axis problem, immediately reaches for "solve for $x$" without pausing to consider an alternative — that reflexive rewrite is the tell for MC-2. Channel reality is owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals
- **Uses the disk formula on a region with a genuine gap from the axis** — MC-1. Route to the overcounted bundt cake demonstration, on the exact region in question.
- **Forces an inverse-function rewrite for a vertical-axis revolution without considering the shell method** — MC-2. Route to the rewrite-avoidance race, on the exact function in question.
- **Correctly diagnoses touches-axis versus gap, and considers shells as an option for vertical-axis revolutions** — the intended target state.
- **Mastery trigger**: the Blueprint's A04 gate, MAMR 4/5 (⌈0.75×5⌉). The 4-item P77 set plus the P76 independence-mode transfer probe (a ceramic vase engineering problem requiring the washer method to compute material volume, explicitly distinguishing "material used" from "hollow interior included") must include at least one item requiring the learner to state WHY a gap requires the washer method, not merely apply the correct formula by pattern-matching — a gate made only of correct-formula-selection items risks certifying pattern-matching without certifying the underlying gap-check reasoning against MC-1.

## Tutor Recovery Strategy
The likely utterance here is "how do I know if I need the disk or washer method?" — a reasonable question given that both formulas look structurally similar (a squared function, integrated, times $\pi$). The concept-specific smaller question returns to a concrete sketch: **"Draw the region. Does any part of it touch the axis line, or does the whole region sit away from it?"** The learner answers from the picture, not from formula memory. Then return: "if it touches, disk — the disk is solid all the way to the axis. If there's a gap, washer — you have to subtract the hollow part in the middle." If the frustration is instead about the shell method feeling unfamiliar, shrink to the bare check: **"For revolution around a VERTICAL axis, is your function naturally written as $y=f(x)$? If yes, shells often avoid an awkward rewrite — try that first."** Generic machinery is owned by `../foundations/01-recovery-engine.md`.

## Memory Hooks
- Concept type: **procedure with an embedded diagnostic gate** (the gap-check and the axis-orientation check are both prerequisite diagnostic decisions, not conceptual judgments, that must be made correctly before the formula is even chosen). Review by *requiring the learner to state the diagnostic answer (touches/gap; horizontal/vertical axis) OUT LOUD before writing any formula*, never accepting a bare final numeric answer, since skipping the visible diagnostic step lets MC-1 pass undetected even when a learner happens to choose the right formula by guessing.
- Concept-specific deviation: keep at least one region in the review rotation where the gap is SUBTLE (e.g., the region barely lifts off the axis at one endpoint) rather than obviously large, so the gap-check habit doesn't atrophy into "eyeball it, it's probably fine."
- Interleaving partners: `math.calc.integral-area` (the direct 2D-to-3D generalization this concept's own core understanding depends on) and the upcoming arc-length concept, which applies the SAME Riemann-sum-as-a-limit idea to a third geometric quantity (length, rather than area or volume).

## Transfer Connections
- **Near**: `math.calc.arc-length` (the same Riemann-sum-as-a-limit construction, applied to curve length via straight-line-segment approximation rather than to volume via disk/washer/shell slices).
- **Far**: multivariable calculus's own volume-by-cross-section and shell-integration techniques in higher dimensions, which generalize this concept's single-axis revolution to more general solids.
- **Real-world**: the Blueprint's own transfer probe — a ceramic vase's material volume via the washer method, explicitly distinguishing "material used" from "hollow interior included" — is a direct, literal manufacturing/engineering application.
- **Expert transfer**: recognizing that a single geometric quantity (volume, here) can often be computed by MULTIPLE valid slicing strategies (disk, washer, shell), with the choice governed by computational efficiency rather than correctness — the same discriminating habit (multiple valid representations, chosen for convenience) recurs across mathematics.

## Cross-Subject Connections
- **Engineering/manufacturing**, real: the Blueprint's own transfer probe (a ceramic vase's material volume, computed via the washer method) is a standard, literal application in manufacturing and materials engineering.
- **Physics**, real: computing the volume (and, with a density function, the mass) of solids of revolution — lathe-turned parts, pressure vessels, and similar axially symmetric objects — uses this exact technique.
- **Architecture/design**, real: volumes of domes, columns, and other axially symmetric structural elements are computed via disk/washer/shell integration.
- The KG records `cross_links: []`, and no strong cross-subject KG omission is flagged here — the engineering/manufacturing connection, while genuine and central to this concept's own transfer probe, is an application rather than a structural KG dependency.

## Blueprint References
`docs/curriculum/blueprints/math.calc.volume-revolution.md`. Reused by reference, not restated: the Component 0 metadata, the Component 4 Worked Examples' Teaching Actions (A01 disk method, A02 washer method breaking MC-1, A03 shell method breaking MC-2, A04 P91 mastery gate at MAMR 4/5), the four-item P77 problem set, and the P76 independence-mode transfer probe (the ceramic vase engineering problem). This entry adds independent birth-type classification for both misconceptions (the Blueprint marks severities but assigns no birth type), the mental-model ladder, the anti-analogy, and the argued direct-instruction-for-the-three-formulas / guided-discovery-for-the-gap-check-and-efficiency-comparison split.

## Runtime Asset References
No seeded `AssetIdentity` records exist for this concept. None were created here.

## Curriculum Feedback
No Blueprint/KG metadata discrepancy was found for this concept — the Blueprint's stated requires (`math.calc.integral-area`), unlocks (none), cross_links (none), difficulty, bloom, mastery_threshold (0.75), and estimated_hours (10) all match the live KG's own fields exactly, confirmed by direct query.

## Version History
- v1.0 (2026-09-12): Initial authoring. Mathematics Educational Brain completion campaign, math.calc Wave (Batch 42).
