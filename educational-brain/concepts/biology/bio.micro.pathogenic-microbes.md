# Pathogenic Microorganisms and Disease — `bio.micro.pathogenic-microbes`

## Identity

- **Concept ID**: `bio.micro.pathogenic-microbes` (canonical biology
  KG)
- **Curriculum location**: biology / microbiology (`bio.micro`)
- **Prerequisites**: `bio.micro.microbial-diversity` — the load-bearing
  part is the five-group microorganism taxonomy (bacteria, archaea,
  fungi, protozoa, algae) plus viruses' separate acellular status; this
  concept surveys the SMALL pathogenic subset within that broader
  taxonomy, requiring the full group structure already in place to
  correctly locate each pathogen type.
- **Unlocks** (from KG): `bio.immuno.innate-adaptive-immunity`,
  `bio.micro.antimicrobial-resistance` — this concept's pathogen-type
  taxonomy and treatment-strategy logic are the direct foundation for
  understanding how the immune system responds to each pathogen type,
  and for the specific mechanism of antimicrobial resistance.
- **Difficulty**: proficient · **Bloom**: analyze · **Mastery
  threshold**: 0.75 · **Est. hours**: 4

## Learning Objective

The learner can: name the major pathogen categories (bacteria, viruses,
fungi, protozoa, prions) and state each category's basic biological
nature and a representative disease; explain WHY antibiotics kill
bacteria without harming human cells (targeting prokaryote-specific
features absent from human cells) and why this same logic means
antibiotics have NO effect on viral infections; and explain antibiotic
resistance as a natural-selection process occurring within a bacterial
population, not an individual bacterium adaptively "learning"
resistance during treatment.

## Core Understanding

Pathogens are microorganisms (or, in the case of prions, non-cellular
infectious agents) that cause disease, and the major pathogen categories
differ fundamentally in their biological structure, requiring entirely
different treatment strategies as a direct consequence. Bacteria are
single-celled prokaryotes; bacterial diseases (tuberculosis, cholera,
pneumonia) are treatable with antibiotics, which work specifically
because they target structural or biochemical features unique to
prokaryotic cells — the bacterial cell wall (absent in human cells) and
70S ribosomes (structurally distinct from human 80S ribosomes) — so
antibiotics can disrupt bacterial function while leaving human cells,
which lack these specific targets, unaffected. Viruses are not cells at
all — a protein coat (capsid) surrounding genetic material (DNA or
RNA); viral diseases (influenza, HIV, measles) require antiviral drugs
or vaccines, because antibiotics have literally nothing to target: a
virus has no cell wall, no 70S ribosomes, and no independent metabolism
of its own to disrupt. Fungi are eukaryotes; fungal diseases (athlete's
foot, candidiasis, aspergillosis) require antifungal drugs, which are
inherently harder to design selectively because fungi, being eukaryotes
like human cells, share far more cellular machinery with human cells
than bacteria do. Protists (protozoa) are eukaryotes; protist-caused
diseases include malaria (Plasmodium) and sleeping sickness
(Trypanosoma). Prions are misfolded proteins with no nucleic acid at
all, causing diseases such as Creutzfeldt-Jakob disease (CJD) and
bovine spongiform encephalopathy (BSE, "mad cow disease") — prions are
essentially untreatable by conventional means, since there is no
nucleic-acid-based or cell-wall-based target to disrupt. The single
most consequential misapplication of this framework is prescribing
antibiotics for viral infections (most common colds, most flu, most
sore throats) — this is not merely ineffective but actively harmful at
a population level, since it accelerates antibiotic resistance without
providing any therapeutic benefit for the viral infection itself.
Antibiotic resistance arises through natural selection operating on a
bacterial population in real time: within any large bacterial
population, rare pre-existing resistant variants already exist by
chance; antibiotic exposure kills the sensitive majority while these
rare resistant variants survive and then reproduce, making the NEXT
generation of the population predominantly resistant — the bacteria did
not individually "learn" or "adapt" to the antibiotic during treatment;
selection simply favoured pre-existing resistant variants. This
explains why completing a full prescribed antibiotic course, even after
symptoms improve, is medically important: stopping early kills the
fully sensitive bacteria first but may leave behind partially-resistant
survivors, which then reproduce and expand the resistant sub-population.

## Mental Models

- **Beginner model — "antibiotics fight infections, generically"**:
  "antibiotic" and "infection-fighting medicine" are treated as
  synonymous, without distinguishing which infection TYPES antibiotics
  can actually address.
- **Intermediate model — "if antibiotics are strong medicine, they
  should help against any serious infection, viral or bacterial"**: the
  direct substrate of one of this concept's central misconceptions —
  since antibiotics are correctly understood as powerful, effective
  medicine against bacteria, that effectiveness is overgeneralized to
  infections generally, including viral ones antibiotics cannot touch
  at all. Upgrade trigger: being shown precisely WHAT antibiotics target
  (bacterial cell walls, 70S ribosomes) and that viruses simply lack
  these targets entirely, not that antibiotics are merely "weaker"
  against viruses.
- **Advanced model — "bacterial resistance to an antibiotic can spread
  within an existing population during a single treatment course,
  without the bacterium adapting individually"**: the learner can
  explain the population-level selection mechanism (pre-existing
  resistant variants surviving and reproducing) without invoking
  individual-bacterium learning or adaptation.
- **Expert model — "treatment strategy as a direct, logical consequence
  of pathogen biology, not an arbitrary medical choice"**: the learner
  can predict, for a NEWLY-DESCRIBED pathogen (given only its basic
  biological category), which broad treatment strategy would plausibly
  work and why, reasoning from structural features rather than
  memorising a drug-to-disease lookup table.
- **Do not upgrade early**: a learner who still believes antibiotics
  have some effect on viral infections should not be advanced to
  antibiotic-resistance population-genetics reasoning — resistance
  evolution specifically depends on antibiotics exerting SELECTIVE
  PRESSURE on a bacterial population, and this reasoning collapses if
  the learner has not yet secured that antibiotics act ONLY on
  bacteria, with zero effect on any other pathogen type.

## Why Students Fail

"Antibiotic" is frequently used in everyday language as a loose
synonym for "strong medicine for an infection," without the specific,
structural reason for its selectivity (targeting features unique to
prokaryotic cells) ever being made explicit — so when a viral infection
is described using similar everyday "infection" language, there is no
built-in signal in the language itself to flag that the SAME medicine
category cannot possibly work, since the underlying biological target
simply does not exist in that pathogen type.

## Misconceptions

No Blueprint exists yet for this concept; both misconceptions
classified directly against the concept's own seed content using the
birth-taxonomy diagnostic procedure
(`../../misconceptions/01-birth-taxonomy.md`).

- **M1 — "Antibiotics treat infections generally, including viral
  ones" (Type 1, overgeneralization)**: born from antibiotics' genuine,
  well-known effectiveness against bacterial infections being
  overgeneralized to infections generally, without the prokaryote-
  specific targeting mechanism that actually explains and LIMITS that
  effectiveness. Matches Type 1's signature: a real, correct fact
  (antibiotics are effective medicine) applied past its actual scope
  (only bacterial infections, never viral ones). Characteristic phrase:
  requesting or expecting antibiotics for a cold, flu, or other viral
  illness. Verbatim detection probe (seed corpus,
  `misconception_probe`): "A patient with influenza (viral) is
  prescribed antibiotics by a worried relative. Is this appropriate?"
  Recovery path: state the precise mechanism explicitly — antibiotics
  target bacterial cell walls and 70S ribosomes, structures a virus
  simply does not have — and explain the population-level harm of
  inappropriate antibiotic use (accelerating resistance with zero
  therapeutic benefit for the viral infection). Verification-of-death:
  the learner correctly explains, for a new described viral illness,
  why antibiotics would have zero effect, citing the absence of a
  bacterial target.
- **M2 — "Bacteria individually adapt or 'learn' resistance to an
  antibiotic during treatment" (Type 2, perceptual intuition)**: born
  from an intuitive, agency-attributing framing of "the bacteria
  learned to resist the drug," which feels like a natural way to
  describe a population becoming resistant, but incorrectly implies
  individual, directed adaptation rather than population-level natural
  selection acting on pre-existing variation. Matches Type 2's
  signature: an intuitive, plausible-sounding narrative framing, not a
  taught rule misapplied. Characteristic phrase: describing bacteria as
  having "learned," "adapted to," or "gotten used to" an antibiotic
  during a course of treatment. Verbatim detection probe (this
  concept's own explanation, reframed as a direct question):
  "Did the bacteria in a patient's infection 'learn' to resist the
  antibiotic during treatment, or is something else going on?" Recovery
  path: state the population-genetics mechanism explicitly — rare
  resistant variants ALREADY EXISTED in the population by chance before
  treatment began; the antibiotic killed the sensitive majority,
  leaving the pre-existing resistant variants to survive and reproduce,
  making the next generation predominantly resistant. Verification-of-
  death: the learner correctly explains antibiotic resistance emergence
  without any language implying individual bacterial learning or
  intentional adaptation.

## Analogies

- **Best analogy — a lock designed to fit only a specific keyway
  (prokaryotic cell wall/ribosome) that a different lock type (viral
  capsid) doesn't even have**: antibiotics are keys shaped specifically
  for bacterial "locks"; a virus doesn't have a matching lock at all,
  so the key simply cannot do anything, no matter how well it was
  designed for bacteria.
- **Alternative — a natural disaster killing most of a mixed population,
  leaving only the naturally disaster-resistant survivors to repopulate**:
  parallels antibiotic resistance directly — the disaster (antibiotic)
  did not teach anyone to be resistant; it simply removed the
  non-resistant majority, leaving pre-existing resistant individuals to
  become the new majority.
- **Story analogy — the full-course-completion public health message**:
  stopping antibiotics early because symptoms improved leaves behind
  exactly the partially-resistant survivors most likely to breed a
  fully resistant population — a concrete, practically important anchor
  for M2's correction.
- **ANTI-ANALOGY — do NOT say "bacteria are smart and figure out how to
  beat antibiotics"**: this directly reinforces the agency-attributing
  misconception (M2) the concept needs to correct.

## Demonstrations

- **Discrimination demonstration — pathogen-to-treatment matching**:
  present several pathogens (a bacterium, a virus, a fungus, a
  protozoan, a prion) and have the learner match each to its
  appropriate treatment category and explain WHY, based on structural
  features, before being told, directly targeting M1.
- **Teacher-demo — the resistant-survivor population walkthrough**:
  visually or numerically represent a bacterial population before and
  after antibiotic exposure, showing that resistant individuals were
  already present at low frequency BEFORE treatment began, directly
  targeting M2.

## Discovery Questions

A genuine discovery design fits: **Need** — "antibiotics work great
against bacterial infections — so why don't doctors just prescribe
them for colds and flu too, to be safe?" **Playground** — the learner
considers what antibiotics actually DO at the molecular level (target
bacterial cell walls/ribosomes). **Invention** — the learner proposes
that a virus, lacking these structures entirely, simply has nothing for
an antibiotic to act on. **Collision** — confronted with the common
practice of requesting antibiotics "just in case" for any infection,
creating tension with the just-reasoned conclusion. **Formalization** —
the precise mechanism (prokaryote-specific targets) and its limits are
stated explicitly. **Compression** — given a new pathogen type, the
learner correctly predicts whether antibiotics could plausibly be
effective, based on structural features alone.

## Teaching Sequence

The prokaryote-specific antibiotic-targeting mechanism should be
established BEFORE discussing which pathogen types are treatable with
which drug class, since understanding the antibiotics-target-viruses
misconception (M1) requires the mechanistic "why" to be secure first,
rather than memorising a lookup table of drug-to-pathogen pairings. The
resistance-evolution mechanism (targeting M2) should follow, once the
learner already accepts that antibiotics act through a specific,
structural mechanism rather than a vague "kills germs" framing.

## Tutor Actions

From `../../teaching-actions/`: **Definition/Orientation** (the five
pathogen categories, each with a representative disease) → **Error
Analysis** (the antibiotics-treat-viral-infections misconception, using
the prokaryote-specific targeting mechanism) → **Causal Reasoning**
(antibiotic resistance as population-level selection, not individual
adaptation). **What doesn't fit**: teaching antibiotic resistance before
the prokaryote-specific targeting mechanism (M1's correction) is
secure.

## Voice Teaching Notes

Listen for antibiotics requested or expected for a clearly viral
illness (a cold, flu) — M1's clearest verbal signature. Also listen for
bacteria described as having "learned" or "adapted to" an antibiotic —
M2's signature. The load-bearing sentence: "antibiotics attack things
only bacteria have — a cell wall, a specific kind of ribosome — a virus
just doesn't have those parts, so there's nothing for the antibiotic to
attack." Channel-reality limits owned by `../foundations/
03-voice-first-learning-model.md §7`.

## Assessment Signals

Seed corpus probes are this concept's item bank, supplemented by this
entry's own probe-depth batch addition. A learner who answers the
antibiotics-target-prokaryote-features `mcq` correctly but fails the
antibiotics-for-flu `misconception_probe` has M1 specifically — they
know the MECHANISM but still misapply it to a viral scenario, which
should route to the viral-scenario recovery rather than re-teaching the
mechanism itself. The probe-depth batch's own fungal-infection-
extension `short_answer` probe (Batch 8) verifies the advanced-model
generalisation to a THIRD pathogen category (fungi), distinct from
either misconception check above.

## Tutor Recovery Strategy

Likeliest utterance: requesting or endorsing antibiotics for a
clearly-viral illness, or describing bacteria as having "adapted" to an
antibiotic during treatment (not distress-shaped — both are common,
everyday-language-driven habits, not signs of confusion about the
underlying biology once corrected). Concept-specific smaller question:
"does a virus have a cell wall or ribosomes for an antibiotic to
attack?" Generic recovery machinery owned by `../foundations/
01-recovery-engine.md`.

## Memory Hooks

**Type**: concept (a pathogen taxonomy mapped to treatment strategy)
with an embedded mechanistic-reasoning skill (structure-determines-
treatability) and a population-genetics reasoning skill (resistance as
selection, not learning). Review form: periodic re-presentation of a
new pathogen or infection scenario for treatment-strategy prediction,
and periodic re-presentation of a resistance-emergence scenario for
mechanism explanation. Interleaving partners: `bio.micro.microbial-
diversity` (this concept's own prerequisite, providing the pathogen
taxonomy's structural foundation) and `bio.immuno.innate-adaptive-
immunity` (a direct KG unlock and the one genuine `cross_links` entry
this concept records, building on how the immune system responds to
each pathogen type).

## Transfer Connections

- **Near**: a new pathogen or infection scenario, correctly matched to
  its appropriate treatment category with mechanistic justification.
- **Far**: recognising the same "a tool's effectiveness against one
  category gets overgeneralized to a superficially similar but
  structurally different category" structure elsewhere (e.g. assuming a
  software security patch for one operating system will work identically
  on an entirely different one).
- **Real-world**: making informed decisions about antibiotic use,
  understanding why a doctor might decline to prescribe antibiotics for
  a viral illness despite the patient's genuine discomfort.
- **Expert transfer**: on meeting any claim that a treatment or tool
  effective against one category should work against a related but
  structurally distinct category, the learner spontaneously checks
  whether the SPECIFIC mechanism the treatment relies on is actually
  present in the new category.

## Cross-Subject Connections

The KG records ONE genuine `cross_links` entry for this concept:
`bio.immuno.innate-adaptive-immunity` — how the immune system responds
differently to each pathogen type is a direct, KG-encoded extension of
this concept's own pathogen taxonomy, not a fabricated addition.

## Blueprint References

No Blueprint exists for this concept at `docs/curriculum/blueprints/
bio.micro.pathogenic-microbes.md` as of this entry's authoring
(confirmed by direct directory listing — biology has zero Blueprint
files in total).

## Runtime Asset References

Seeded in the seed corpus (production DB ACTIVE status not
independently re-verified this session): `src/lib/teaching/assets/
biologySeedAssets.ts` carries `core_explanation` and
`misconception_repair` explanations plus `mcq` (PROFICIENT) and
`misconception_probe` (DEVELOPING) probes, both at gradeBand HIGH;
`src/lib/teaching/assets/biologyDepthSeedAssets.ts` (Batch 8, `bio.micro`)
adds one further `short_answer` probe at gradeBand HIGH, PROFICIENT
difficulty (the fungal-infection antibiotic-selectivity extension
check), closing this concept to the 3-probe asset contract floor. No
new asset created by authoring this entry.

## Curriculum Feedback

None found. This concept's one genuine `cross_links` entry
(`bio.immuno.innate-adaptive-immunity`) and its two `unlocks` are each
plausible, well-founded consequences of establishing pathogen taxonomy
and treatment logic.

## Version History

- 2026-09-20 — initial authoring (Biology End-User Readiness Program,
  Wave 2, thirty-ninth entry, strict KG-prerequisite order — first of
  the eighth recomputed frontier, from the 38-concept baseline). No
  Blueprint exists for this concept; both misconceptions classified
  directly against the concept's own seed content using the
  birth-taxonomy diagnostic procedure.
