# bio.behav.kin-selection-altruism — Kin Selection and Altruism

## Identity
- **Concept ID**: `bio.behav.kin-selection-altruism`
- **Subject**: Biology
- **Domain**: Behaviour (`bio.behav`)
- **Prerequisites**: `bio.behav.social-behavior-eusociality`, `bio.gen.population-genetics`
- **Unlocks**: `bio.behav.human-behavioral-ecology-evolutionary-psych`
- **Cross-links (KG)**: (none)
- **Difficulty**: expert
- **Bloom level**: evaluate
- **Mastery threshold**: 0.8
- **Estimated hours**: 5

## Learning Objective
The student can correctly apply Hamilton's rule (rB > C) to determine whether a
specific altruistic act should be favoured by selection, correctly explain
**inclusive fitness** as fitness measured through BOTH an individual's own direct
reproduction AND its effect on relatives' reproduction (weighted by relatedness), and
correctly distinguish kin selection (helping RELATIVES) from reciprocal altruism
(cooperating with NON-relatives via expected future repayment) as two SEPARATE
evolutionary routes to cooperative behaviour.

## Core Understanding
**Hamilton's rule**, rB > C, is the quantitative CONDITION under which an altruistic
act (one that costs the actor and benefits a recipient) will be favoured by natural
selection. Here, **r** is the coefficient of RELATEDNESS between the actor and the
recipient (the probability that a given gene in the actor is also present in the
recipient due to common descent — e.g., r = 0.5 for full siblings or parent-offspring,
r = 0.25 for half-siblings), **B** is the reproductive BENEFIT the recipient gains from
the act, and **C** is the reproductive COST the actor incurs. The rule states that
altruism is favoured PRECISELY when the relatedness-weighted benefit (rB) EXCEEDS the
cost (C) — meaning a costly act toward a CLOSE relative (high r) can be favoured even
when the identical act toward an unrelated individual would NOT be, because the gene
underlying the altruistic behaviour is more likely to be shared with (and therefore
propagated via) a close relative's offspring.

This logic is captured by the concept of **inclusive fitness**: an individual's total
genetic contribution to future generations should be measured through BOTH its OWN
direct reproduction AND its effect on the reproductive success of RELATIVES (weighted
by relatedness), rather than through direct reproduction alone. This reframing
resolves the apparent evolutionary puzzle of altruism (why would a costly, seemingly
self-sacrificing act ever be favoured?): an act that reduces an individual's DIRECT
reproduction can still INCREASE its inclusive fitness overall, if it sufficiently
boosts the reproduction of sufficiently closely-related relatives — the gene is being
propagated indirectly, through the relative's offspring, rather than lost.

**Reciprocal altruism** is an ENTIRELY SEPARATE evolutionary route to cooperative
behaviour, and students must not conflate it with kin selection. Reciprocal altruism
explains cooperation between NON-relatives (individuals with LOW or ZERO relatedness,
where Hamilton's rule as stated would not favour a costly act) via a DIFFERENT
mechanism: an individual pays a cost to help another now, with the EXPECTATION of
receiving a reciprocal benefit from that same individual in the FUTURE. This mechanism
depends on repeated interactions between the same individuals (so reciprocation is
possible) and the ability to recognise and preferentially cooperate with previous
cooperators (and withhold cooperation from cheaters who fail to reciprocate) — it does
NOT rely on shared genes at all, unlike kin selection, and therefore requires an
entirely different set of behavioural/cognitive preconditions (individual recognition,
memory of past interactions) to function.

## Mental Models
- **The shared-gene-discount model for Hamilton's rule**: helping a relative is like
  paying into a shared account you partly co-own (weighted by r) — the "discount" on
  the cost is precisely how closely related the recipient is, which is why the SAME
  costly act is favoured for a close relative but not for a stranger.
- **The now-vs-later-ledger model for reciprocal altruism**: cooperation between
  non-relatives is a running ledger of favours given and expected to be repaid later —
  it requires remembering who has paid their debts and who has not, unlike kin
  selection, which requires no memory of past interactions at all.

## Why Students Fail
- They evaluate an altruistic act's cost/benefit WITHOUT weighting by relatedness r,
  missing that Hamilton's rule specifically requires the relatedness-WEIGHTED benefit
  (rB), not the raw benefit (B) alone, to exceed the cost.
- They conflate inclusive fitness with simple direct reproductive success, missing
  that inclusive fitness EXPLICITLY includes the reproductive success of relatives,
  weighted by relatedness, as a genuine component of total fitness.
- They treat kin selection and reciprocal altruism as the same underlying phenomenon
  ("cooperation"), missing that they operate via genuinely different mechanisms (shared
  genes vs. expected future repayment) and apply to different situations (relatives vs.
  non-relatives).

## Misconceptions

No Blueprint exists yet for this concept, and no seed content exists in
`biologySeedAssets.ts` or `biologyDepthSeedAssets.ts` (confirmed via direct grep before
authoring): this concept is one of the 91 added by the 2026-09-14 KG extension and
currently has zero authored explanations or probes of any kind. Both misconceptions
below are therefore authored directly from first principles using the birth-taxonomy
diagnostic procedure (`educational-brain/misconceptions/01-birth-taxonomy.md`), and are
NOT tied to any existing seed-corpus probe — there is none to cite.

### M1 — "Hamilton's rule compares raw benefit to cost, ignoring relatedness" (Type 4: Notation-Induced)
**Statement**: Whether an altruistic act should be favoured is evaluated by comparing
the raw benefit B to the recipient against the cost C to the actor, without WEIGHTING
the benefit by the relatedness coefficient r, contrary to the actual rule rB > C.
**Origin**: The compressed shorthand "benefit must exceed cost" (a common intuitive
cost-benefit framing) omits the relatedness-weighting term that makes Hamilton's rule
specifically about KIN selection rather than a generic cost-benefit comparison.
**Why it persists**: Without explicitly multiplying B by r before comparing to C, the
simpler unweighted "B versus C" comparison can seem sufficient.
**Repair**: State Hamilton's rule explicitly as rB > C, and require r to be assigned a
value first (e.g., r = 0.5 for full siblings) before multiplying it by B — the SAME
raw benefit and cost can favour altruism toward a close relative (high r, so rB is
large) while NOT favouring the identical act toward a distant relative or stranger
(low or zero r, so rB is small or zero).
**Verification-of-death**: given the same numerical B and C but two different
relatedness values (e.g., r = 0.5 versus r = 0.125), the learner correctly computes rB
for each and correctly determines that the act is favoured in one case but not the
other, based on the relatedness-weighted comparison.

### M2 — "Kin selection and reciprocal altruism are the same mechanism" (Type 1: Overgeneralization)
**Statement**: Kin selection (favouring relatives due to shared genes) and reciprocal
altruism (cooperating with non-relatives via expected future repayment) are treated as
the same underlying phenomenon ("cooperative behaviour"), without distinguishing their
different mechanisms and the different situations (related vs. unrelated individuals)
each explains.
**Origin**: Overgeneralizing from the shared broad category ("helping another
individual") to an incorrect inference that a single mechanism accounts for all
cooperative behaviour, without separately tracking that shared genes (kin selection)
and expected future repayment (reciprocal altruism) are genuinely DIFFERENT causal
routes.
**Why it persists**: Without an explicit contrast naming which mechanism applies to
which relationship type (relatives vs. non-relatives), "individuals helping each
other" can substitute for the two distinct explanations.
**Repair**: State the distinction explicitly: kin selection explains helping
RELATIVES via Hamilton's rule (shared genes, no memory of past interactions required);
reciprocal altruism explains helping NON-relatives via expected future repayment
(requires repeated interactions, individual recognition, and memory of who has and has
not reciprocated) — a species can show BOTH mechanisms operating in different
relationship contexts.
**Verification-of-death**: given a scenario describing cooperation between two
UNRELATED individuals with a history of repeated interactions, the learner correctly
identifies reciprocal altruism (not kin selection) as the explanatory mechanism,
citing the absence of relatedness and the presence of repeated interaction/memory
requirements.

## Analogies
- The shared-gene-discount model for Hamilton's rule (see Mental Models): paying into
  a shared account you partly co-own, discounted by relatedness.
- The now-vs-later-ledger model for reciprocal altruism (see Mental Models): a running
  ledger of favours requiring memory of past interactions, unlike kin selection's
  memory-free shared-gene logic.

## Demonstrations
- Present the same-B-and-C/different-relatedness scenario and ask the student to
  compute rB for each relatedness value and determine whether the act is favoured in
  each case.
- Present the unrelated-individuals-with-repeated-interactions scenario and ask the
  student to identify the correct explanatory mechanism (kin selection vs. reciprocal
  altruism), justifying with relatedness and interaction-history evidence.

## Discovery Questions
- "Would you expect an animal to risk more to save a full sibling (r = 0.5) or a
  first cousin (r = 0.125), all else being equal? What does Hamilton's rule predict?"
- "If reproducing DIRECTLY isn't the only way to pass on your genes, what's the other
  route inclusive fitness accounts for?"
- "Could two individuals with ZERO genetic relatedness still evolve to cooperate with
  each other? What would need to be true about their relationship for this to work?"

## Teaching Sequence
1. Introduce Hamilton's rule with the relatedness-weighting term explicit, directly
   correcting the raw-benefit-vs-cost misconception using the same-B-and-C/different-
   relatedness computation exercise.
2. Introduce inclusive fitness as the reframing that resolves the altruism puzzle,
   connecting it explicitly back to Hamilton's rule.
3. Introduce reciprocal altruism as a SEPARATE mechanism for non-relatives, directly
   correcting the kin-selection-and-reciprocal-altruism-are-the-same misconception
   using the unrelated-individuals scenario.
4. Close by contrasting the preconditions each mechanism requires (shared genes vs.
   repeated interaction and memory).

## Tutor Actions
- If a student compares B to C without weighting by r: ask them to assign a specific
  relatedness value and recompute rB before comparing to C.
- If a student conflates kin selection and reciprocal altruism: ask them to check
  whether the individuals in a given scenario are related or unrelated, and what
  interaction history is described.
- If a student cannot explain why costly altruism persists evolutionarily: ask them to
  consider the recipient's reproductive success as part of the actor's OWN inclusive
  fitness.

## Voice Teaching Notes
Say "weight it by r first" whenever Hamilton's rule comes up, to keep the relatedness-
weighting explicit. Say "related, or repeat interaction?" whenever cooperation is
discussed, to keep the kin-selection-versus-reciprocal-altruism distinction active.

## Assessment Signals
No seed corpus exists for this concept, so no item-bank diagnostic interpretation can
be given yet (see Runtime Asset References). The general diagnostic principle for M1,
once probes exist: a learner who computes rB before comparing to C shows the repaired
model; a learner who compares raw B to C directly is showing M1 in its cleanest,
most-detectable form.

## Tutor Recovery Strategy
For M1, present the same-B-and-C/different-relatedness scenario and ask the student to
compute BEFORE revealing the answer, deriving the relatedness-weighting conclusion
from the computation task itself. For M2, present the unrelated-individuals scenario
and require the student to identify the specific mechanism with justification, rather
than accepting an unspecific "they're cooperating" answer.

## Memory Hooks
- "rB > C — weight the benefit by relatedness before you compare it to the cost."
- "Helping genes reach the next generation through a relative counts too — that's
  inclusive fitness."
- "No shared genes? Then it's a ledger of favours, not kin selection."

## Transfer Connections
- `bio.behav.social-behavior-eusociality` (prerequisite): supplies the reproductive
  division-of-labour framework this concept explains via genetic relatedness.
- `bio.gen.population-genetics` (prerequisite): supplies the allele-frequency
  framework underlying the relatedness coefficient r.
- `bio.behav.human-behavioral-ecology-evolutionary-psych` (unlocks): applies kin
  selection and reciprocal altruism introduced here to human social behaviour.

## Cross-Subject Connections
No cross-subject connection is authored; the KG's own `cross_links` field for this
concept is empty.

## Blueprint References
No Blueprint exists for biology as a subject (per the standing note for this authoring
campaign). This concept has zero seed content of any kind (confirmed via direct grep
against `biologySeedAssets.ts` and `biologyDepthSeedAssets.ts`); both misconceptions
above were authored directly from first principles using the birth-taxonomy diagnostic
procedure (`educational-brain/misconceptions/01-birth-taxonomy.md`), following the
established precedent set by `bio.behav.social-behavior-eusociality` and
`bio.behav.mating-systems-sexual-selection`.

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
The KG description's named sub-topics (Hamilton's rule rB > C; inclusive fitness
measured through direct reproduction and relatives' reproductive success; reciprocal
altruism as an alternative route to cooperation between non-relatives) are all covered
in this EB entry directly from first principles, since no seed content exists to check
against. No additional Curriculum Feedback gap is recorded for this entry.

## Version History
- 2026-09-21: Initial authoring (forty-eighth recomputed topological frontier, batch
  of 3 with `bio.behav.learning-and-behavior` and `bio.eco.predator-prey-dynamics`,
  all first-principles entries — a FOURTEENTH consecutive fully zero-seed-content
  batch, 0 of 24 frontier candidates), EB concept 159/199.
