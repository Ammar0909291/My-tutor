# Authored visual assets — proposal, and why the population is not what it looks like

Session B, 2026-08-31. Requested by Session A: propose the asset shape before
authoring in bulk, because VISUAL is a family neither of us has seeded.

**Short version: do not let me author 42 figures. Measured per concept, that
population is four different problems, and only about a third is an authoring
job. Two of the three flagship examples are concepts the generator was
DELIBERATELY TAUGHT to refuse, and authoring them would re-introduce the exact
defect the refusal was added to fix.**

## The population, classified by its LATEST outcome per concept

`visual_generation_outcome`, one row per concept, most recent attempt:

| outcome | physics | chemistry | what it means | is authoring the fix? |
|---|---|---|---|---|
| ACCEPTED | 95 | 68 | already has a figure | — |
| `no-suitable-form` | 20 | 10 | the GENERATOR declined: concept is none of forms A–E | **mostly no** |
| `generation-failed` | 2 | 7 | provider or parse failure | **no — retry** |
| `not-anchored-to-concept` | 2 | 2 | the CRITIC rejected: figure was about something else | **yes** |
| `structurally-invalid` | 0 | 1 | STATIC layer rejected the geometry | yes |

44 concepts are not accepted. Only **5** were rejected by the critic or the
static layer — the case where "the model tried and produced something wrong, so
a human should author it" actually holds. **30 of 44 are `no-suitable-form`,
which is the generator declining, and 9 are infrastructure failures.**

## Why `no-suitable-form` is mostly not an authoring job

`visualEngine.ts` states a closed set of forms to the model — graph,
number_line, geometry, process_flow, scene — plus `{"type":"none"}`, described
in the prompt as "A CORRECT ANSWER and is expected often: most concepts are not
pictures."

The prompt then names, verbatim, the cases that must NOT be drawn:

> A LIST of things that coexist (**the seven SI base units**; the
> characteristics of a living organism) and a CLASSIFICATION (**matter divides
> into pure substances and mixtures**) are NOT processes. Drawing either as a
> flow asserts a sequence the concept does not have, which is worse than
> drawing nothing.

Session A's three flagship concepts are:

| concept | title | in the prompt as a negative example? |
|---|---|---|
| `chem.found.measurement` | Physical Quantities and SI Units | **yes — "the seven SI base units"** |
| `chem.found.matter` | Nature of Matter | **yes — matter's taxonomy** |
| `chem.found.pure-substances` | Pure Substances and Mixtures | **yes — quoted verbatim** |

All three declined with `no-suitable-form` on every attempt across three
separate dates. They are not failing. They are doing what they were changed to
do, and the change was made because the first cohort drew all three as ordered
process flows and was confidently wrong.

Authoring a `process_flow` or `scene` for these would restore the defect by
hand. The blocker is a **missing FORM**, not missing content.

## The 30, split by what would actually rescue them

Reading the titles, they are not one kind of thing:

**(A) Needs a form that does not exist — a classification / table (~13).**
`chem.found.matter`, `chem.found.pure-substances`, `chem.found.measurement`,
`phys.meas.units`, `phys.em.magnetic-materials` (dia/para/ferro — three
categories), `phys.particle.quarks` (six flavours), `phys.particle.standard-model`
(the canonical table in all of physics), `phys.particle.antimatter`,
`chem.pblock.group13`, `chem.pblock.group17`, `chem.sblock.hydrogen`,
`chem.carb.named-reactions`, `phys.rel.postulates`.

A classification form — a titled set of named categories, each with members, no
implied order — would serve every one of these honestly. **This is engine work
in `src/lib/teaching/visual/**`, which is Session A's. I am not proposing to
build it, only that it is the single highest-value item in this whole area:
one form unlocks ~13 concepts including the first three a chemistry learner
meets.**

**(B) Drawable in an EXISTING form; the generator under-called (~11).**
This is the genuinely good news, and it IS my lane:

| concept | the figure it obviously wants |
|---|---|
| `phys.em.magnetic-field` | field lines — the title is "Magnetic Field and Field Lines" |
| `chem.org.spectroscopy` | a spectrum — a graph, absorbance against wavelength |
| `phys.mech.buoyancy` | a scene: block in fluid, weight and upthrust |
| `phys.therm.specific-heat` | a graph: heat added against temperature |
| `phys.mech.power` | a graph: work against time |
| `phys.qm.pauli-exclusion` | an energy-level diagram with paired arrows |
| `phys.rel.simultaneity` | a spacetime diagram |
| `phys.rel.spacetime` | a spacetime diagram with an interval |
| `phys.meas.significant-figures` | a number_line |
| `chem.equil.le-chatelier` | a graph: concentration before and after a shift |
| `phys.therm.entropy` | a scene: ordered against disordered arrangement |

These decline not because no honest figure exists but because the generator did
not find it. An authored figure in an EXISTING form is exactly right here, needs
no engine change, and is safe to review.

**(C) Honestly undrawable — leave alone (~6).**
`phys.meas.dimensions`, `phys.qm.perturbation-theory`,
`phys.mech.generalized-coordinates`, `phys.mech.euler-lagrange-equation`,
`chem.env.water-soil`, `phys.em.electric-charge`. For these the decline is the
correct answer and the tutor's honest refusal is the right learner experience.
**Authoring here would be forcing a picture to move a coverage number, which is
the failure this engine already fixed once.**

## Proposed asset shape

Read from the three ACTIVE VISUAL assets in production — not invented:

```
asset_identity   family        VISUAL
                 familyKind    concept_figure
                 canonicalSlug {conceptId}:concept_figure:{lang}
                 authorKind    HUMAN_CURATOR
                 status        DRAFT        (never ACTIVE from a seed script)

visual_assets    assetId       -> asset_identity
                 renderer      VISUAL_SPEC  (forms A-D)  |  SCENE_SPEC (form E)
                 specPayload   the same JSON the generator emits
                 a11yDescription  "Figure: <title>"
```

**One contract difference from probes, and it matters:** the VISUAL
canonicalSlug has **three** segments and carries **no gradeBand** —
`chem.found.stoichiometry:concept_figure:en`. One figure per concept per
language, not per band. A seed module must not append a band segment or it will
create a second lineage that never serves.

Two properties I would hold myself to, both borrowed from what the engine
already enforces:

1. **An authored figure is re-validated, not trusted.** `resolveVisualForTurn`'s
   APPROVED tier already re-runs `validateGeneratedFigure` — writing that test
   is what caught an approved photosynthesis figure being admitted for a linear
   function. Authored content earns no exemption.
2. **DRAFT only.** Promotion stays human through
   `/api/admin/knowledge-assets`, exactly as it does for explanations and
   probes. Chemistry's seed path bypassing DRAFT is a documented deliberate
   exception for text; I am not proposing to extend it to figures.

## I tested population (B) instead of asserting it

The list above came from reading concept TITLES, which is inference. Before
asking anyone to act on it I hand-authored five specs and ran them through the
engine's own `validateGeneratedFigure` with `requireAxisLabels: true` — the
strictest setting, the one generation itself uses.

| concept | form | result |
|---|---|---|
| `chem.org.spectroscopy` | graph | **PASS** |
| `phys.therm.specific-heat` | graph | **PASS** |
| `phys.mech.power` | graph | **PASS** |
| `phys.meas.significant-figures` | number_line | **PASS** |
| `phys.em.magnetic-field` | scene | **FAIL — structurally-invalid** |

So population (B) is real for the flat forms: four concepts the generator
declined accept a hand-authored figure with **no engine change at all**. That is
the claim I wanted to be able to make honestly, and it is now measured rather
than argued.

**Two of the four only passed after I fixed my own errors, and both are contract
details an authoring batch must know:**

1. The graph field is **`equation`**, not `expression`. My first three graphs
   were rejected `structurally-invalid` for that alone.
2. A spec is rejected **`not-anchored-to-concept`** unless its prose shares a
   content word with the concept's title or description. "An Absorption
   Spectrum" failed for `chem.org.spectroscopy`; "Spectroscopy: an absorption
   spectrum" passed. The anchor is vocabulary overlap, not meaning — an
   authored title must reuse the concept's own words.

**Correction, same session: the scene form IS authorable, and I had it wrong
twice.** My first report said scenes were blocked on a schema Session A would
have to supply. That was giving up too early. Reading `validateSceneSpec` and
`anchorReport` — measurement, not the trial-and-error I had declined to do —
produced a passing scene on the next attempt:

```
validateSceneSpec:        VALID
validateGeneratedFigure:  PASS (scene)
anchorReport: anchored=true, geometricObjects=4, challenger=null
  matchedLabels: ["magnetic north pole", "magnetic south pole",
                  "field line above the magnet", "field line below the magnet"]
```

So **all of population (B) is authorable with no engine change**, scenes
included. Nothing here is blocked on Session A.

### The scene authoring contract, as enforced

Every rule below cost me a failed run, so they are worth stating exactly:

| requirement | where enforced | what I got wrong |
|---|---|---|
| top-level `id`, `title`, `sceneType` | `validateSceneSpec` | omitted `id` and `sceneType` entirely |
| `sceneType` ∈ diagram, simulation, process, comparison, plot | `validateSceneSpec` | — |
| object label field is **`text`**, not `label` | `anchorReport` reads `obj.text` | used `label`; every object silently failed to anchor |
| ≥ 2 objects of a GEOMETRIC type | `anchorReport` | — |
| ≥ 2 **distinct** object `text` values each containing a content word from the concept's title or description | `MIN_ANCHORED_OBJECTS = 2` | "N pole" / "S pole" / "field line" ×2 gave ONE distinct anchored label; renaming to "magnetic north pole", "field line above the magnet" gave four |
| ≥ 1 step with non-empty `narration` | `validateGeneratedScene` | omitted |
| no other KG concept scores better on the labels | `crossConceptChallenger` | — |

The label rule is the sharp one: repeating a label counts once, and a label
that does not carry the concept's own vocabulary counts zero. A scene can be
structurally perfect and still be refused for naming its parts naturally.

### The flat-form contract, as enforced

| requirement | what I got wrong |
|---|---|
| graph field is **`equation`**, not `expression` | all three graphs rejected `structurally-invalid` |
| `xLabel` and `yLabel` required under `requireAxisLabels` | — |
| spec prose must share a content word with the concept | "An Absorption Spectrum" failed; "Spectroscopy: an absorption spectrum" passed |

## THE BLOCKER IS NOT THE CONTENT — THERE IS NO WRITER

Session A's caution was right, and the mismatch is worse than a schema detail.
**Nothing in the seed path can write a VISUAL asset at all.** Measured:

| writer | what it supports | VISUAL? |
|---|---|---|
| `scripts/brain/seed-knowledge-assets.ts` | `family: 'EXPLANATION'` and `family: 'PROBE'` as literals | **no** |
| `src/instrumentation.ts` cold-start bootstrap | `explanationAsset.createMany`, `probeAsset.createMany` | **no** |
| `brainSeedAssets.ts` types | `SeedExplanation`, `SeedProbe` | **no `SeedVisual`** |

`grep VISUAL` across all three returns nothing. Every ACTIVE visual asset in
production got there by GENERATION plus human approval — the seeding route that
carried 674 probes has never carried a figure.

So authoring visual content today produces content that nothing can write. That
is precisely the mathematics failure mode Session A flagged this session: 31
modules on disk, imported by no writer, ~750 probes that never reach a learner.

### And the obvious helper would produce an unservable slug

`seedCanonicalSlug(conceptId, familyKind, gradeBand, difficulty?)` returns
`conceptId:familyKind:en:gradeband` — **four** segments minimum. The VISUAL rows
actually serving in production carry **three** and no band:

    chem.found.stoichiometry:concept_figure:en

An authoring batch that reached for the existing helper would emit
`chem.org.spectroscopy:concept_figure:en:adult`, which no resolver looks up.
Rows present, nothing served, count rising — the same shape as the probe
slug-resolver trap, in a place nobody has been yet. This is exactly the "mismatch
discovered after 42 concepts" that the request to propose first was protecting
against, and it would have bitten on concept one.

### What has to exist before any visual authoring pays off

1. `SeedVisual` type — `brainSeedAssets.ts`, **mine**.
2. A VISUAL branch in `seed-knowledge-assets.ts` writing `family: 'VISUAL'` plus
   a `visualAssets` content row — **mine**.
3. A VISUAL branch in the cold-start bootstrap, **and the completeness guard's
   `hasContent` must learn `visualAsset`** — it currently reads only
   `probeAsset`/`explanationAsset`, so every seeded visual identity would read
   HOLLOW forever and be "repaired" on every cold start, in a loop.
   `src/instrumentation.ts` — **NOT mine**.
4. A slug rule that omits `gradeBand` for VISUAL — one figure per concept per
   language, per the production evidence above.

Items 1, 2 and 4 I can do. Item 3 is Session A's file, and it is the one that
turns a working seed into a silent repair loop if it is missed.

## What I propose to do, in order

1. **Nothing yet** — this document is the proposal Session A asked for, and the
   headline is that the job is smaller and differently shaped than the brief.
2. If agreed: author **population (B)**, ~11 concepts, in existing forms, one
   bounded batch at a time with a guard test, same method as the probe campaign.
   Five are already proven to pass the engine's own validator:
   `chem.org.spectroscopy`, `phys.therm.specific-heat`, `phys.mech.power`,
   `phys.meas.significant-figures` and `phys.em.magnetic-field`. No engine
   change is needed for any of them.
3. **Population (A) is blocked on Session A's form work** and I should not
   pre-author content for a form whose schema does not exist yet.
4. **Population (C) I propose we deliberately do not author**, and record that
   as a decision rather than an omission.
5. `generation-failed` (9 concepts, chemistry's largest bucket at 7) is a
   **retry**, and is likely already covered by Session A's warm pass.

## The number this changes

Criterion 3 is chemistry 27% / physics 66%. The brief attributed the gap to 42
concepts needing authored content. Measured, authoring can honestly move about
16 of them (11 in population B, 5 critic/static rejections). The larger lever,
~13 concepts including the three a chemistry learner meets first, is one new
form in the engine.
