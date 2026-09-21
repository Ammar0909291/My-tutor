# bio.behav.mating-systems-sexual-selection — Mating Systems and Sexual Selection

## Identity
- **Concept ID**: `bio.behav.mating-systems-sexual-selection`
- **Subject**: Biology
- **Domain**: Behaviour (`bio.behav`)
- **Prerequisites**: `bio.behav.animal-communication`, `bio.evo.natural-selection`
- **Unlocks**: `bio.behav.social-behavior-eusociality`
- **Cross-links (KG)**: (none)
- **Difficulty**: advanced
- **Bloom level**: analyze
- **Mastery threshold**: 0.78
- **Estimated hours**: 5

## Learning Objective
The student can correctly explain sexual selection as a DISTINCT selective force from
survival-based natural selection — one that can favour traits that REDUCE survival if
they sufficiently increase mating success — and correctly distinguish INTRAsexual
selection (competition between same-sex individuals for mates) from INTERsexual
selection (mate choice/preference by the opposite sex), rather than treating "sexual
selection" as a single undifferentiated mechanism.

## Core Understanding
**Sexual selection** is a selective force operating specifically on traits that affect
an individual's SUCCESS AT OBTAINING MATES, and it is analytically DISTINCT from
ordinary natural selection, which operates on traits affecting SURVIVAL. Critically,
these two forces can PULL IN OPPOSITE DIRECTIONS: a trait can be actively favoured by
sexual selection (because it increases mating success) even while it SIMULTANEOUSLY
reduces the bearer's survival chances (a peacock's enormous tail is more visible to
predators and more metabolically costly, yet persists because its mating-success
benefit outweighs its survival cost). The trait persists specifically because the NET
effect on reproductive success — survival cost combined with mating-success benefit —
remains positive, not because the survival cost is absent.

Sexual selection operates through two distinct mechanisms. **Intrasexual selection**
is competition BETWEEN members of the SAME sex (typically males) for access to mates —
this favours traits useful in direct competition or combat: large body size, weapons
(antlers, horns), and aggression. **Intersexual selection** is mate CHOICE/PREFERENCE
exercised by members of ONE sex (typically females) selecting among potential mates
of the OTHER sex — this favours traits that make an individual more ATTRACTIVE or
signal higher quality to choosers: elaborate ornamentation, courtship displays, song
complexity. These two mechanisms are not mutually exclusive within a single species,
and BOTH mechanisms draw on the honest-signalling and handicap-principle logic already
established for communication generally: a trait favoured by either mechanism must
either directly confer a competitive advantage (intrasexual) or reliably indicate
underlying quality to a chooser (intersexual).

**Mating systems** describe the recurring PATTERN of mating relationships within a
species and are diverse: **monogamy** (one male, one female, typically per breeding
season or lifetime), **polygyny** (one male mates with multiple females — the most
common vertebrate mating system), and **polyandry** (one female mates with multiple
males — comparatively rare). A species' mating system is not an arbitrary label; it
is CAUSALLY connected to the intensity and direction of sexual selection acting on
each sex. Where **polygyny** predominates, competition among males for access to the
limited number of receptive females is intense, so intrasexual selection on males is
correspondingly strong. **Sexual dimorphism** — pronounced morphological or
behavioural DIFFERENCES between males and females of the same species (size,
coloration, ornamentation, weaponry) — is the evolutionary OUTCOME of this asymmetric
selection pressure: strong sexual dimorphism is a predictable signature of strong
sexual selection (most often under polygyny), while species with weak sexual selection
(often under monogamy, where both sexes contribute more equally to mate acquisition
and often to parental care) tend to show comparatively LOW sexual dimorphism.

## Mental Models
- **The dial, not the switch**: sexual selection and natural selection are two
  independently-turning dials acting on the same trait simultaneously — the trait's
  fate depends on the NET combined reading, not on either dial alone reading
  "favourable."
- **The mating-system-predicts-dimorphism rule**: read a species' mating system as
  a predictor — heavy polygyny predicts strong dimorphism (intense male-male
  intrasexual competition); monogamy predicts weak dimorphism (more symmetric
  selection pressure on both sexes).

## Why Students Fail
- They treat "sexual selection" as a vague single mechanism ("attracting mates")
  rather than analytically separating intrasexual competition from intersexual choice,
  so they cannot predict which traits (weapons vs. ornaments) each mechanism should
  favour.
- They assume any trait that reduces survival must be evolutionarily maladaptive,
  missing that sexual selection can make a survival-reducing trait NET adaptive via a
  sufficiently large mating-success benefit.
- They treat mating system and sexual dimorphism as two unrelated facts to memorise
  separately, rather than seeing dimorphism as the PREDICTABLE CONSEQUENCE of a given
  mating system's selection asymmetry.

## Misconceptions

No Blueprint exists yet for this concept, and no seed content exists in
`biologySeedAssets.ts` or `biologyDepthSeedAssets.ts` (confirmed via direct grep before
authoring): this concept is one of the 91 added by the 2026-09-14 KG extension and
currently has zero authored explanations or probes of any kind. Both misconceptions
below are therefore authored directly from first principles using the birth-taxonomy
diagnostic procedure (`educational-brain/misconceptions/01-birth-taxonomy.md`), and are
NOT tied to any existing seed-corpus probe — there is none to cite.

### M1 — "A trait that reduces survival cannot be favoured by evolution" (Type 1: Overgeneralization)
**Statement**: A trait that measurably reduces an individual's survival chances (e.g.,
a peacock's tail increasing predation risk) is assumed to be evolutionarily
maladaptive or a tolerated flaw, rather than potentially being actively FAVOURED
overall because of a sufficiently large mating-success benefit.
**Origin**: Overgeneralizing from the correct general principle "natural selection
favours survival" to the incorrect specific inference that ANY survival-reducing trait
must be non-adaptive, without separately tracking that REPRODUCTIVE success (not
survival alone) is what selection ultimately maximises.
**Why it persists**: Without an explicit statement that survival and mating success
are two SEPARATE components of overall reproductive success that can trade off
against each other, "reduces survival" can seem to settle the adaptiveness question on
its own.
**Repair**: State explicitly that natural selection maximises reproductive success,
which decomposes into BOTH survival AND mating success; a trait can reduce the first
component while increasing the second by a larger amount, making its NET effect on
reproductive success positive — this is precisely what happens with sexually-selected
ornaments and weapons.
**Verification-of-death**: given a scenario describing a trait that lowers survival by
a small amount but substantially increases mating success, the learner correctly
predicts that the trait would be favoured overall, citing the net reproductive-success
calculation rather than the survival cost alone.

### M2 — "Intrasexual competition and intersexual choice are the same thing" (Type 1: Overgeneralization)
**Statement**: Male-male competition for mates (intrasexual selection) and female
mate choice (intersexual selection) are treated as a single undifferentiated
phenomenon ("sexual selection"), without distinguishing which specific traits
(weapons/size vs. ornaments/displays) each mechanism should be expected to favour.
**Origin**: Overgeneralizing from the shared broad category ("selection related to
mating") to an incorrect inference that both routes to increased mating success work
through the SAME kind of trait, without separately tracking that direct competition
and being chosen are functionally different tasks.
**Why it persists**: Without an explicit contrast naming which mechanism favours
which trait type, "traits that help you mate" can substitute for the two distinct
causal pathways.
**Repair**: State the distinction explicitly: intrasexual selection favours traits
useful in DIRECT competition or combat between rivals (size, weapons, aggression);
intersexual selection favours traits that make an individual more ATTRACTIVE or
signal quality to a CHOOSING member of the opposite sex (ornamentation, courtship
displays, song). A species can show evidence of both mechanisms operating
simultaneously on different traits.
**Verification-of-death**: given a description of a novel trait (e.g., elaborate
antlers vs. an elaborate courtship song), the learner correctly classifies which
selection mechanism most plausibly produced it and justifies the classification by
naming the trait's specific function (fighting vs. attracting).

## Analogies
- The two-dials model for natural vs. sexual selection: imagine two independent dials,
  "survival benefit" and "mating benefit," both feeding into one final "reproductive
  success" reading — a trait can turn one dial down and the other up dramatically and
  still come out net positive overall.
- The tournament-vs-audition model for intrasexual vs. intersexual selection:
  intrasexual selection is a wrestling tournament (only physical competitive traits
  matter); intersexual selection is a talent audition judged by choosers (only
  attractive/quality-signalling traits matter).

## Demonstrations
- Present the small-survival-cost/large-mating-benefit trait scenario and ask the
  student to predict whether the trait would be favoured overall, requiring them to
  compute the net reproductive-success effect rather than reasoning from survival
  alone.
- Present pairs of traits (elaborate antlers; elaborate courtship song; large body
  size in a fighting species; complex plumage in a lekking species) and ask the
  student to classify each as most plausibly produced by intrasexual or intersexual
  selection, justifying by function.

## Discovery Questions
- "If a trait makes an animal easier for predators to catch, could it still spread
  through a population? What OTHER factor besides survival would need to be true?"
- "Would you expect the same kind of trait to help a male WIN A FIGHT against a rival
  and to help him get CHOSEN by a picky female? Why or why not?"
- "If a species has heavy polygyny (one male monopolising many females), what would
  you predict about how different males and females look from each other, and why?"

## Teaching Sequence
1. Establish natural selection's target (survival) versus sexual selection's target
   (mating success) as two distinct components of reproductive success before
   introducing any specific trait examples.
2. Directly correct the reduces-survival-means-maladaptive misconception using the
   net-reproductive-success framing and the small-cost/large-benefit scenario.
3. Introduce intrasexual versus intersexual selection as two distinct mechanisms,
   directly correcting the same-thing misconception using the trait-classification
   exercise.
4. Close by connecting mating system diversity (monogamy/polygyny/polyandry) and
   sexual dimorphism back to the intensity and direction of the selection mechanisms
   already covered, treating dimorphism as dimorphism's PREDICTABLE CONSEQUENCE.

## Tutor Actions
- If a student calls a survival-reducing trait automatically maladaptive: ask them to
  compute its NET effect on reproductive success including any mating-success benefit.
- If a student conflates intrasexual and intersexual selection: ask them to classify a
  specific trait by the specific FUNCTION it serves (fighting a rival vs. attracting a
  chooser).
- If a student treats mating system and sexual dimorphism as unrelated facts: ask them
  to predict a species' dimorphism level FROM its stated mating system, forcing the
  causal link.

## Voice Teaching Notes
Say "net reproductive success, not survival alone" whenever a survival-reducing trait
comes up, to keep the two-component framing explicit. Say "which mechanism, which
function?" whenever intrasexual and intersexual selection are discussed together, to
keep the distinction active.

## Assessment Signals
No seed corpus exists for this concept, so no item-bank diagnostic interpretation can
be given yet (see Runtime Asset References). The general diagnostic principle for M1,
once probes exist: a learner who computes the net reproductive-success effect before
judging a trait's adaptiveness shows the repaired model; a learner who judges purely
from survival cost is showing M1 in its cleanest, most-detectable form.

## Tutor Recovery Strategy
For M1, present the small-survival-cost/large-mating-benefit scenario and ask the
student to predict the trait's fate BEFORE revealing the answer, deriving the
net-effect conclusion from the prediction task itself. For M2, present the
trait-classification exercise and require the student to name the SPECIFIC function
(competition vs. attraction) justifying their classification, rather than accepting an
unspecific "it helps with mating" answer.

## Memory Hooks
- "Two dials, one reading — survival and mating success both feed reproductive
  success, and one can outweigh the other."
- "Fighting traits come from competing with rivals; pretty traits come from being
  chosen by pickier mates."
- "Heavy polygyny, heavy dimorphism — the mating system predicts how different the
  sexes will look."

## Transfer Connections
- `bio.behav.animal-communication` (prerequisite): supplies the honest-signalling and
  handicap-principle framework this concept applies specifically to mate-choice
  contexts.
- `bio.evo.natural-selection` (prerequisite): supplies the general selection framework
  this concept refines into the survival-vs-mating-success distinction.
- `bio.behav.social-behavior-eusociality` (unlocks): applies mating-system and
  reproductive-strategy concepts introduced here to the extreme reproductive
  specialisation seen in eusocial species.

## Cross-Subject Connections
No cross-subject connection is authored; the KG's own `cross_links` field for this
concept is empty.

## Blueprint References
No Blueprint exists for biology as a subject (per the standing note for this authoring
campaign). This concept has zero seed content of any kind (confirmed via direct grep
against `biologySeedAssets.ts` and `biologyDepthSeedAssets.ts`); both misconceptions
above were authored directly from first principles using the birth-taxonomy diagnostic
procedure (`educational-brain/misconceptions/01-birth-taxonomy.md`), following the
established precedent set by `bio.behav.animal-communication` and
`bio.behav.foraging-behavior`.

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
The KG description's named sub-topics (mate choice as a distinct selective force;
intrasexual versus intersexual selection; mating system diversity — monogamy,
polygyny, polyandry; sexual dimorphism as an evolutionary outcome) are all covered in
this EB entry directly from first principles, since no seed content exists to check
against. No additional Curriculum Feedback gap is recorded for this entry.

## Version History
- 2026-09-21: Initial authoring (forty-sixth recomputed topological frontier, batch of
  3 with `bio.neuro.autonomic-stress-physiology` and
  `bio.neuro.neural-circuits-computation`, all first-principles entries — a TWELFTH
  consecutive fully zero-seed-content batch, 0 of 22 frontier candidates), EB concept
  153/199.
