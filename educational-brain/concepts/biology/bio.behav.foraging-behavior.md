# bio.behav.foraging-behavior — Foraging Behaviour

## Identity
- **Concept ID**: `bio.behav.foraging-behavior`
- **Subject**: Biology
- **Domain**: Behaviour (`bio.behav`)
- **Prerequisites**: `bio.behav.innate-behavior-instinct`, `bio.eco.population-ecology`
- **Unlocks**: (none in KG)
- **Cross-links (KG)**: `math.calc.optimization`
- **Difficulty**: advanced
- **Bloom level**: analyze
- **Mastery threshold**: 0.78
- **Estimated hours**: 4

## Learning Objective
The student can correctly explain the marginal value theorem's core prediction — an
animal should LEAVE a depleting food patch when that patch's CURRENT intake rate falls
to the AVERAGE intake rate available across the WHOLE HABITAT (not when the patch is
fully depleted or empty) — and correctly explain risk-sensitive foraging as a
strategy shift driven by the forager's CURRENT ENERGY STATE, not a fixed,
state-independent preference.

## Core Understanding
**Optimal foraging theory** applies a COST-BENEFIT framework — directly analogous to
mathematical optimisation — to predict animal foraging decisions: it assumes natural
selection favours foraging strategies that maximise net energy gain (benefits, like
caloric intake, minus costs, like energy expended searching/handling and predation
risk exposure). This framework generates specific, TESTABLE predictions about diet
choice (which prey/food types an animal should include or ignore, based on their
specific energetic profitability relative to handling time) and PATCH-USE decisions
(how long an animal should remain foraging within a specific food patch before moving
on).

The **marginal value theorem** addresses patch-use decisions specifically, and its
core prediction is genuinely counter-intuitive without careful statement: an animal
foraging within a food patch experiences a DECLINING intake RATE over time as that
patch's food resources become progressively DEPLETED (each additional minute spent
yields progressively LESS additional food than the minute before). The marginal value
theorem predicts that an animal should LEAVE the current patch specifically when that
patch's CURRENT (marginal) intake rate DECLINES to match the AVERAGE intake rate
achievable across the WHOLE HABITAT (accounting for the travel time cost of moving to
a new patch) — NOT when the current patch becomes fully DEPLETED or empty. This means
an animal should generally leave patches while SOME food still remains — leaving
"money on the table" in the current patch is actually the OPTIMAL strategy, because
continuing to forage in an increasingly depleted patch eventually yields LESS than
what could be gained, on average, by moving to a fresh patch elsewhere (once travel
time is properly accounted for).

**Risk-sensitive foraging** adds a further, important layer: an animal's OPTIMAL
foraging strategy — specifically, its willingness to accept variance/uncertainty in
food intake — can SHIFT depending on the forager's CURRENT ENERGY STATE, rather than
being a FIXED, state-independent preference. An animal in a relatively SECURE energy
state (with adequate reserves) can generally afford to be RISK-AVERSE, preferring a
predictable, lower-variance food source over a riskier, higher-variance one, even if
their AVERAGE expected payoffs are similar. An animal in a more DESPERATE energy state
(with insufficient reserves to survive on the "safe," predictable option alone) can
instead become RISK-PRONE — actively preferring the higher-variance option, because
only a risky "gamble" offers ANY realistic chance of meeting the animal's urgent
energetic needs, even though it also carries a higher chance of complete failure. This
demonstrates that OPTIMAL foraging strategy is not fixed; it genuinely depends on the
forager's specific physiological/energetic circumstances.

## Mental Models
- **The marginal value theorem as "leave while there's still fruit on the tree, once
  picking has slowed down enough"**: think of foraging a patch like picking fruit from
  a tree — early on, fruit comes quickly and easily; as the easy fruit gets picked, you
  have to work harder for each additional piece; the OPTIMAL time to move to a
  fresh tree is when your CURRENT picking rate slows to match what you'd expect,
  ON AVERAGE, from switching trees (accounting for the walk to get there) — NOT when
  the current tree is entirely bare.
- **Risk sensitivity as a gambling strategy that flips based on how desperate you
  are**: an animal with a comfortable energy cushion plays it SAFE, preferring a
  reliable, modest payout; an animal facing genuine energetic crisis switches to
  playing RISKY, since only a gamble offers any realistic chance of meeting an urgent
  need, even though it might also fail completely.

## Why Students Fail
1. They assume an animal should stay in a food patch until it is COMPLETELY depleted
   or empty, missing the marginal value theorem's actual prediction — leaving when the
   CURRENT intake rate matches the HABITAT AVERAGE, typically while food still
   remains.
2. They treat risk sensitivity in foraging as a FIXED, universal preference (either
   always risk-averse or always risk-prone), missing that the OPTIMAL strategy
   genuinely SHIFTS depending on the forager's current energy state.
3. They fail to connect optimal foraging theory's cost-benefit logic to genuine
   mathematical optimisation, treating foraging decisions as unpredictable or
   arbitrary rather than as the outcome of a specific, analysable cost-benefit
   trade-off.

## Misconceptions

No Blueprint exists yet for this concept, and no seed content exists in
`biologySeedAssets.ts`: this concept is one of the 91 added by the 2026-09-14 KG
extension and currently has zero authored explanations or probes of any kind (confirmed
via direct grep against `biologySeedAssets.ts` and `biologyDepthSeedAssets.ts` before
authoring). Both misconceptions below are therefore authored directly from first
principles using the birth-taxonomy diagnostic procedure
(`educational-brain/misconceptions/01-birth-taxonomy.md`), and are NOT tied to any
existing seed-corpus probe — there is none to cite.

### M1 — "An animal should stay in a patch until it is completely depleted" (Type 2: Perceptual intuition)
**Statement**: An animal foraging in a resource patch is assumed to behave OPTIMALLY
by remaining until the patch is COMPLETELY depleted or empty, leaving no food
"wasted," rather than leaving EARLIER, once the patch's current intake rate matches
the wider habitat average.
**Origin**: Drawing on an everyday perceptual intuition ("don't leave food behind,
that would be wasteful") and applying it to optimal foraging, without registering
that the marginal value theorem's actual optimality criterion concerns the TRADE-OFF
between the current patch's declining rate and the AVERAGE rate available elsewhere
(accounting for travel time), NOT simple resource exhaustion.
**Why it persists**: Without an explicit statement of the marginal value theorem's
specific decision RULE (compare current patch rate to habitat average, not to zero),
the intuitively "efficient-sounding" complete-depletion strategy can seem like the
obviously optimal choice.
**Repair**: State the marginal value theorem's actual decision rule explicitly: an
animal should leave its current patch when that patch's CURRENT (marginal) intake
rate DECLINES to match the AVERAGE intake rate achievable across the WHOLE HABITAT
(accounting for travel time to a new patch) — this typically means leaving WHILE
SOME food still remains, since continuing to forage a heavily depleted patch would
yield LESS, on average, than moving to a fresh patch elsewhere.
**Verification-of-death**: given a scenario describing a patch's declining intake
rate over time and the habitat's average intake rate, the learner correctly
identifies the OPTIMAL departure point as when the two rates converge, not when the
patch reaches zero.

### M2 — "Risk sensitivity in foraging is a fixed, universal preference" (Type 1: Overgeneralization)
**Statement**: An animal's preference for risk-averse or risk-prone foraging
strategies is assumed to be a FIXED, universal trait of that species or individual,
rather than a strategy that genuinely SHIFTS depending on the forager's CURRENT
energy state.
**Origin**: Overgeneralizing from observing a species exhibiting risk-averse (or
risk-prone) behaviour in ONE specific context to an incorrect inference that this
represents a FIXED, state-independent preference, without registering that the SAME
individual can shift its optimal strategy as its own energy state changes.
**Why it persists**: Without an explicit statement that risk sensitivity is
SPECIFICALLY driven by current energy state (not a fixed personality trait), a single
observed instance of risk-averse or risk-prone behaviour can be over-generalised into
a universal characteristic.
**Repair**: State the state-dependence explicitly: an animal in a SECURE energy state
can generally afford to be RISK-AVERSE, preferring a predictable, lower-variance food
source; an animal in a more DESPERATE energy state can instead become RISK-PRONE,
preferring a higher-variance option because only a "gamble" offers a realistic chance
of meeting urgent energetic needs — the SAME individual can shift between these
strategies as its own energy state changes, meaning risk sensitivity is a
STATE-DEPENDENT strategy, not a fixed trait.
**Verification-of-death**: given a scenario describing the SAME individual animal's
energy state changing from secure to desperate over time, the learner correctly
predicts a SHIFT from risk-averse to risk-prone foraging strategy, rather than
predicting the SAME strategy regardless of the state change.

## Analogies
- The declining-fruit-picking-rate model for the marginal value theorem: picking
  fruit from a tree starts fast and easy, then slows as the easy fruit runs out — the
  optimal moment to walk to a fresh tree is when your CURRENT picking rate slows to
  match what you'd expect on average elsewhere (accounting for the walk), not when
  the current tree is completely bare.
- The safe-bet-versus-desperate-gamble model for risk sensitivity: someone with a
  comfortable financial cushion chooses the safe, modest, reliable investment; someone
  facing genuine financial crisis might instead take the risky gamble, since only
  the gamble offers a realistic chance of meeting an urgent need — the SAME person
  might make either choice depending on their CURRENT financial state.

## Demonstrations
- Present a patch's declining intake-rate curve alongside the habitat's average
  intake rate and ask the student to identify the optimal departure point, testing
  whether they predict complete depletion or the theorem's actual convergence point.
- Present the same-individual, changing-energy-state scenario (secure, then
  desperate) and ask the student to predict the resulting shift in foraging risk
  strategy.

## Discovery Questions
- "If a food patch still has SOME food left, but the rate of finding more food has
  slowed considerably, should an optimal forager stay and finish it off, or move on?
  What specifically would determine the right answer?"
- "Would you expect the SAME animal to always prefer the SAME level of risk in its
  foraging choices, regardless of its current energy reserves? What might change its
  preference?"
- "Optimal foraging theory borrows its logic from mathematical optimisation. What
  specific 'cost' and 'benefit' would need to be weighed to predict an animal's diet
  choice?"

## Teaching Sequence
1. Introduce optimal foraging theory's cost-benefit framework before discussing
   specific patch-use predictions.
2. Introduce the marginal value theorem, directly correcting the complete-depletion
   misconception using the declining-rate-versus-habitat-average scenario.
3. Introduce risk-sensitive foraging, directly correcting the fixed-preference
   misconception using the same-individual-changing-state scenario.

## Tutor Actions
- If a student predicts an animal should stay until a patch is fully depleted: ask
  them to compare the patch's CURRENT rate to the habitat's AVERAGE rate, redirecting
  toward the theorem's actual decision rule.
- If a student treats risk sensitivity as fixed: ask them to predict how the SAME
  individual's strategy might change if its energy state shifted from secure to
  desperate.
- If a student cannot connect foraging theory to optimisation: ask them to name the
  specific cost and benefit being weighed in a described foraging decision.

## Voice Teaching Notes
Say "match the habitat average, not zero" whenever the marginal value theorem comes
up, to keep the actual decision rule explicit. Say "which energy state?" whenever risk
sensitivity is discussed, to keep the state-dependence framing active rather than a
fixed-trait reading.

## Assessment Signals
No seed corpus exists for this concept, so no item-bank diagnostic interpretation can be
given yet (see Runtime Asset References). The general diagnostic principle for M1, once
probes exist: a learner who correctly identifies the departure point as where current
and average rates converge (not zero) shows the repaired model; a learner who predicts
complete depletion is showing M1 in its cleanest, most-detectable form.

## Tutor Recovery Strategy
For M1, present the declining-rate-versus-habitat-average scenario and ask the
student to identify the optimal departure point BEFORE revealing the theorem's rule,
testing their initial intuition against the actual prediction. For M2, present the
same-individual-changing-state scenario and ask the student to predict the strategy
shift, testing whether the state-dependence framing has been adopted.

## Memory Hooks
- "Leave when the current rate matches the habitat average — not when the patch runs
  dry."
- "Secure state: play it safe. Desperate state: take the gamble — the SAME animal,
  different state."
- "Foraging decisions are optimisation problems: weigh the cost against the
  benefit."

## Transfer Connections
- `bio.behav.innate-behavior-instinct` (prerequisite): supplies the innate-behaviour
  framework this concept applies specifically to foraging-decision analysis.
- `bio.eco.population-ecology` (prerequisite): supplies the resource-availability and
  habitat framework this concept applies specifically to patch-use and diet-choice
  decisions.
- `math.calc.optimization` (cross-linked in the KG): supplies the mathematical
  optimisation framework this concept's cost-benefit foraging models are directly
  built on.

## Cross-Subject Connections
The KG's own `cross_links` field connects this concept to `math.calc.optimization`
(Mathematics' calculus-based optimisation concept) — optimal foraging theory's
cost-benefit framework and the marginal value theorem are direct biological
applications of mathematical optimisation, authored here from first principles since
no seed content exists to draw the connection from directly.

## Blueprint References
No Blueprint exists for biology as a subject (per the standing note for this authoring
campaign). This concept has zero seed content of any kind (confirmed via direct grep
against `biologySeedAssets.ts` and `biologyDepthSeedAssets.ts`); both misconceptions
above were authored directly from first principles using the birth-taxonomy diagnostic
procedure (`educational-brain/misconceptions/01-birth-taxonomy.md`), following the
established precedent set by `bio.found.scientific-method-in-biology` and
`bio.found.unifying-themes-in-biology`.

## Runtime Asset References
No seed content of any kind exists for this concept in `biologySeedAssets.ts` or
`biologyDepthSeedAssets.ts` — this is one of the 91 concepts added by the 2026-09-14 KG
extension. This EB entry is authored entirely from first principles and does not cite
any runtime asset. Seeding `core_explanation`/`misconception_repair`/`mcq`/
`misconception_probe` content for this concept, and a probe-depth `short_answer` to
reach the 3-probe contract floor, remain outstanding tasks for whichever future
initiative seeds content for the 91-concept KG-extension pool (a separate, larger,
not-yet-started task per the standing note in `CLAUDE.md`'s Biology program section).

## Curriculum Feedback
The KG description's named sub-topics (optimal foraging theory as a cost-benefit
framework predicting diet and patch-use decisions, the marginal value theorem for
patch-leaving decisions, risk-sensitive foraging influenced by energy state) are all
covered in this EB entry directly from first principles, since no seed content exists
to check against. No additional Curriculum Feedback gap is recorded for this entry.

## Version History
- 2026-09-20: Initial authoring (forty-fifth recomputed topological frontier, batch of
  3 with `bio.behav.animal-communication` and `bio.neuro.neurodevelopment`, all
  first-principles entries — an ELEVENTH consecutive fully zero-seed-content batch, 0
  of 24 frontier candidates), EB concept 151/199.
