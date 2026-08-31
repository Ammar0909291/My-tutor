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

**The scene form is NOT yet demonstrated authorable.** `validateGeneratedScene`
requires a structural pass, at least 2 objects of a DRAWN type, narration on at
least one step, and concept anchoring. I supplied all four and it still returned
`structurally-invalid`, so `validateSceneSpec` enforces more than I have matched.
I stopped rather than reverse-engineer it, because scenes are Session A's area
and the schema should come from them, not from my guessing.

That matters for sequencing: `phys.em.magnetic-field`, `phys.mech.buoyancy`,
`phys.therm.entropy` and the spacetime pair are all scene-shaped. **The
graph/number_line half of population (B) can start immediately; the scene half
is blocked on the SceneSpec authoring contract.**

## What I propose to do, in order

1. **Nothing yet** — this document is the proposal Session A asked for, and the
   headline is that the job is smaller and differently shaped than the brief.
2. If agreed: author **population (B)**, ~11 concepts, in existing forms, one
   bounded batch at a time with a guard test, same method as the probe campaign.
   Start with `phys.em.magnetic-field` and `chem.org.spectroscopy` — the two
   whose titles name the figure they are missing.
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
