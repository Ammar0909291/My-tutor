# bio.plant.plant-growth-hormones — Plant Growth and Hormones

## Identity
- **Concept ID**: `bio.plant.plant-growth-hormones`
- **Subject**: Biology
- **Domain**: Plant Biology (`bio.plant`)
- **Prerequisites**: `bio.plant.mineral-nutrition`
- **Unlocks**: `bio.repro.sexual-reproduction-plants`, `bio.plant.phytochrome-photoperiodic-flowering`, `bio.plant.plant-biotechnology-applications`
- **Cross-links (KG)**: none currently listed
- **Difficulty**: proficient
- **Bloom level**: understand
- **Mastery threshold**: 0.75
- **Estimated hours**: 4

## Learning Objective
The student can correctly trace phototropism's mechanism (auxin redistributes away from
light, shaded side elongates more), correctly explain auxin's opposite effects on shoots
versus roots via differential sensitivity, and correctly identify cytokinins and
ethylene as an antagonistic pair for leaf/tissue senescence.

## Core Understanding
Plant growth hormones (phytohormones) are chemical signals that coordinate development
across the entire plant, and five major groups each have a distinct, specific role.
**Auxins** (IAA) promote cell elongation in shoot tips and redistribute asymmetrically in
response to light and gravity. **Gibberellins** promote stem elongation, seed
germination, and breaking dormancy. **Cytokinins** promote cell division and DELAY leaf
senescence (a property exploited commercially to keep cut flowers fresh longer).
**Abscisic acid (ABA)**, the "stress hormone," promotes stomatal closure during drought
and promotes dormancy and seed maturation. **Ethylene**, notably a GAS rather than a
liquid-phase signal, promotes fruit ripening and leaf/fruit abscission (falling) — put to
commercial use in artificially ripening bananas.

**Phototropism** — a shoot bending toward light — deserves precise, step-by-step
attention as the concept's central mechanistic example, because the naive explanation
gets the mechanism backward. Auxin migrates AWAY from the light source, concentrating on
the SHADED side of the shoot tip. The shaded side, now carrying a higher auxin
concentration, elongates MORE than the lit side — and this differential (asymmetric)
elongation is specifically what bends the shoot toward the light. Auxin is not
"attracting" the plant toward light in any direct sense — it is creating differential
growth through its asymmetric distribution, and that differential growth is what produces
the bending.

A second precise, load-bearing fact: **auxin's effect depends entirely on concentration
and tissue type — "auxins always promote growth" is false.** The exact same auxin
concentration that promotes shoot elongation actively INHIBITS root elongation, because
roots are roughly 1000× more sensitive to auxin than shoots are — a concentration that is
optimal for one tissue is already inhibitory for the other. This differential sensitivity
has a direct commercial application: herbicides like 2,4-D exploit exactly this property,
using high concentrations of auxin-like molecules to cause abnormal, uncontrolled growth
specifically in broad-leaved weeds (which are more auxin-sensitive), killing them while
narrow-leaved grasses are comparatively less affected.

## Mental Models
- **Redistribution creates asymmetric growth, not attraction**: phototropism works
  because auxin moves TO one side (away from light), and that side then grows MORE —
  the light itself never directly attracts the plant tissue; the mechanism is entirely
  mediated by auxin's asymmetric distribution and its growth-promoting effect wherever
  it accumulates.
- **Same molecule, opposite effect, different sensitivity**: auxin's dual effect (promotes
  shoot growth, inhibits root growth) at the SAME concentration is a direct consequence
  of differential tissue sensitivity, not a contradiction or an exception requiring a
  different hormone.
- **Antagonistic hormone pairs control specific developmental switches**: cytokinins
  (delay senescence) and ethylene (promote it) function as an opposing pair controlling
  the same developmental switch (whether a leaf or fruit ages/falls), exactly as
  insulin/glucagon oppose each other for blood glucose.

## Why Students Fail
1. They interpret phototropism as light directly "attracting" plant growth, rather than
   tracking the specific two-step mechanism (auxin redistributes away from light →
   shaded side elongates more) that actually produces the bending.
2. They assume a hormone must have a single, fixed effect (auxin = "growth promoter"),
   missing that the same molecule can have opposite effects on different tissues due to
   differential sensitivity.
3. They treat all five phytohormones as functionally similar "growth-promoting"
   substances, without tracking which specific pairs function antagonistically
   (cytokinins vs. ethylene for senescence) versus which act more independently.

## Misconceptions

### M1 — "Auxin makes the plant grow toward light, or the lit side grows more" (Type 4: Notation/mechanism-induced)
**Statement**: Since phototropism results in a shoot bending toward light, either light
directly attracts growth, or auxin must accumulate on the LIT side (where growth toward
the light would seem to originate).
**Origin**: A surface-level, outcome-focused reading of phototropism ("the shoot ends up
facing the light, so growth must be happening on the light-facing side, or light must be
directly causing that growth") that gets the actual mechanism backward — auxin
accumulates on the SHADED side, and the SHADED side is what elongates more.
**Why it persists**: Without tracing the specific two-step mechanism (auxin migration
first, then differential elongation second), the final outcome (bending toward light)
can be explained with an intuitively simpler but incorrect "grows toward the light
directly" story.
**Repair**: Trace the mechanism in its correct order and direction explicitly: auxin
migrates AWAY from light → concentrates on the SHADED side → the SHADED side elongates
MORE → the shoot bends TOWARD the light as a geometric consequence of one side growing
faster than the other — never assert light itself as a direct growth-promoting cause.
**Diagnostic probe**: the existing MCQ asking what happens when auxin migrates to the
shaded side, with the lit-side-elongates-more-because-light-activates-auxin distractor
flagged to this misconception.

### M2 — "Auxin always promotes growth, regardless of tissue" (Type 1: Overgeneralization)
**Statement**: Since auxin is introduced as the hormone that "promotes cell elongation,"
it should promote growth in every plant tissue it reaches, including roots.
**Origin**: Overgeneralizing auxin's shoot-specific growth-promoting effect (the first,
more commonly emphasized example) into a universal rule applying to all tissues,
without registering that root tissue's dramatically higher sensitivity flips the same
concentration's effect from promoting to inhibiting.
**Why it persists**: Without an explicit statement of the specific sensitivity
difference (roots ~1000× more sensitive than shoots), auxin's shoot-elongation effect
can be assumed to generalize straightforwardly to any tissue it reaches.
**Repair**: State the sensitivity difference explicitly and numerically (roots ~1000×
more sensitive than shoots), and connect it directly to the 2,4-D herbicide example: the
same molecule, the same general mechanism, but a concentration-and-tissue-dependent
outcome that can be either growth-promoting or growth-inhibiting to the point of being
lethal.
**Diagnostic probe**: the existing misconception_probe asking why the same auxin
inhibits root elongation while promoting shoot elongation, with the roots-lack-
receptors-and-block-entry distractor flagged to this misconception.

## Analogies
- The shadow-side-grows-more model: think of dough rising unevenly — if one side of a
  loaf rises faster than the other, the loaf tilts toward the SLOWER-rising side (the
  higher side pushes it over) — exactly as the faster-growing shaded side pushes the
  shoot to bend toward the light.
- The same-dose-different-tolerance model: like a medication dose that is therapeutic for
  an adult but toxic for a much smaller child due to different sensitivity — the same
  auxin concentration is "therapeutic" (growth-promoting) for shoot tissue but "toxic"
  (growth-inhibiting) for the far more sensitive root tissue.

## Demonstrations
- Diagram a shoot tip with light coming from one side, tracing auxin's migration
  direction, its resulting concentration on each side, and the resulting differential
  elongation and bending direction — step by step, in the correct causal order.
- Present the 2,4-D herbicide example directly: the same molecule class that promotes
  shoot elongation at normal concentrations causes lethal, uncontrolled growth in
  broad-leaved weeds at herbicidal concentrations, connecting differential sensitivity
  to a real-world agricultural application.

## Discovery Questions
- "If auxin concentrated on the LIT side of a shoot tip instead of the shaded side,
  which side would you expect to elongate more, and which direction would the shoot
  bend? Does that match the actual observed direction of phototropic bending?"
- "The exact same auxin concentration promotes shoot growth but inhibits root growth.
  Does this mean auxin somehow 'knows' which tissue it's in, or is there a simpler
  explanation involving each tissue's sensitivity?"
- "Cytokinins delay leaf senescence; ethylene promotes it. What would happen to a cut
  flower's freshness if you artificially increased ethylene exposure instead of
  cytokinin exposure?"

## Teaching Sequence
1. Introduce the five phytohormone groups with their specific, distinct roles before
   detailing any single mechanism in depth.
2. Walk phototropism's mechanism in strict causal order (auxin migrates away from light
   → concentrates on shaded side → shaded side elongates more → shoot bends toward
   light), directly correcting the light-attracts-growth misconception.
3. Present auxin's shoot-promoting/root-inhibiting dual effect explicitly, anchored to
   the specific ~1000× sensitivity difference between the two tissue types.
4. Connect the sensitivity difference to the 2,4-D herbicide application as a concrete,
   consequential real-world example.
5. Close by presenting cytokinins and ethylene as an antagonistic pair for senescence,
   using the cut-flower commercial application to make the antagonism concrete.

## Tutor Actions
- If a student describes light as directly attracting growth, or the lit side as
  elongating more: have them trace the mechanism step by step (auxin migration
  direction first) rather than jumping to the final outcome.
- If a student assumes auxin always promotes growth: ask them to state the specific
  sensitivity difference between shoots and roots before accepting any claim about
  auxin's effect on a given tissue.
- If a student cannot explain the cut-flower cytokinin/ethylene application: ask them
  to state each hormone's specific effect on senescence before predicting the outcome of
  increasing or decreasing either one.

## Voice Teaching Notes
Say "away from light, not toward it" whenever auxin's phototropic migration comes up, to
keep the correct direction explicit. Say "same molecule, different sensitivity" whenever
auxin's shoot/root dual effect is discussed, to block the always-promotes-growth
generalization.

## Assessment Signals
- **Early recovery**: after tracing phototropism's mechanism once, correctly predicts
  the bending direction for a novel light-exposure scenario (e.g., light from below)
  using the same step-by-step reasoning, without needing this restated.
- **Fragile**: can state "auxin inhibits roots at the same concentration that promotes
  shoots" as a memorized fact but cannot explain the specific sensitivity-difference
  mechanism when asked directly.
- **Deep gap**: continues to describe the lit side as elongating more after the
  step-by-step mechanism has been explicitly traced — indicates the correct causal
  sequence was never actually adopted, only the final "bends toward light" outcome was
  retained.

## Tutor Recovery Strategy
For M1, do not just restate "auxin goes to the shaded side" — have the student redraw
the full mechanism themselves, labeling auxin's migration direction, the resulting
concentration on each side, and the resulting elongation and bending direction in the
correct causal order. For M2, ask the student to predict what would happen if root
tissue had the SAME sensitivity as shoot tissue (would auxin still inhibit root growth?),
testing whether the sensitivity-based reasoning (not just the memorized outcome) has
been adopted.

## Memory Hooks
- "Auxin moves away from light. The shaded side grows more and pushes the bend toward
  the light."
- "Same auxin, same concentration — shoots grow, roots are inhibited. Sensitivity, not
  contradiction."
- "Cytokinins delay aging. Ethylene promotes it. Opposite hormones, same developmental
  switch."

## Transfer Connections
- `bio.plant.mineral-nutrition`: supplies the general plant-physiology and active-
  transport context this concept's hormone-signaling mechanisms build upon.
- `bio.cell.cell-signalling`: the general receptor/signal-transduction framework
  established there is applied here to specific plant hormone mechanisms.
- `bio.plant.phytochrome-photoperiodic-flowering` (unlocks): extends this concept's
  light-response framework (phototropism) into the fuller photoperiodic and flowering-
  timing signaling system.

## Cross-Subject Connections
No `cross_links` entry exists in the KG for this concept. No cross-subject connection is
authored here since this concept's content is entirely intra-biology plant physiology
detail.

## Blueprint References
No Blueprint exists for biology as a subject (per the standing note for this authoring
campaign); classification of both misconceptions above was performed directly against
`biologySeedAssets.ts`'s existing seed content and the probe-depth campaign's own
cytokinin/ethylene-antagonism short_answer probe, using the birth-taxonomy diagnostic
procedure (`educational-brain/misconceptions/01-birth-taxonomy.md`).

## Runtime Asset References
- `core_explanation` (HIGH band): five phytohormone groups and their roles,
  phototropism mechanism, auxin shoot/root differential sensitivity —
  `biologySeedAssets.ts`, `PLHORM_EXPLANATIONS[0]`.
- `misconception_repair` (HIGH band): auxin-redistributes-rather-than-attracts
  correction; auxin's concentration/tissue-dependent effect with 2,4-D herbicide
  example — `PLHORM_EXPLANATIONS[1]`.
- `mcq` (PROFICIENT): phototropic bending mechanism, lit-side-elongates-more distractor
  flagged to M1 — `PLHORM_PROBES[0]`.
- `misconception_probe` (ADVANCED): why the same auxin inhibits roots but promotes
  shoots, roots-lack-receptors distractor flagged to M2 — `PLHORM_PROBES[1]`.
- `short_answer` (PROFICIENT, probe-depth Batch 4): cytokinin/ethylene antagonistic-
  pair identification task for cut-flower freshness, closing this concept's 3-probe
  floor — `biologyDepthSeedAssets.ts`, conceptId `bio.plant.plant-growth-hormones`.

## Curriculum Feedback
The KG description additionally names photoperiodism and vernalisation by name as part
of this concept's scope, but the existing seed corpus covers the five phytohormone
groups and phototropism without detailing photoperiodism or vernalisation specifically.
This EB entry is scoped to what is actually taught; photoperiodism and vernalisation are
a genuine content gap flagged here as Curriculum Feedback, not fabricated — photoperiodism
specifically is previewed as the subject of `bio.plant.phytochrome-photoperiodic-
flowering`, this concept's own unlock.

## Version History
- 2026-09-20: Initial authoring (twenty-fourth recomputed topological frontier, batch of
  3 with `bio.repro.fertilisation-development` and `bio.micro.microbes-in-human-
  welfare`), EB concept 88/199.
