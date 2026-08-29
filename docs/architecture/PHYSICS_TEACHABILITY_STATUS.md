# Physics Teachability Program — status

**Purpose.** Make physics (238 KG concepts) genuinely teachable end to end for a
real learner — not "content authored", not a coverage percentage, but: a
struggling, visually-dependent learner can open any physics lesson, ask for a
diagram, get one, be assessed with a real gradeable question, and reach recorded
mastery inside a normal session.

**How to resume.** Run `npx tsx scripts/physics/state.ts` first. It is the
source of truth for this subject. Do not trust a number in this file, or in
CLAUDE.md, over that script's output.

Last updated: 2026-08-29.

---

## Step 0 — what was actually measured

Every number below was read from source or from production this session, not
carried over. Three of the program's own founding assumptions were wrong.

| Dimension | Measured | Source |
|---|---|---|
| KG concepts | 238 | `scripts/physics/state.ts` |
| Blueprints | 238/238 | same |
| Educational Brain entries | 238/238 | same |
| Asset contract (concept, band) pairs | **262/262 meet `assetContract.ts` v1** | Supabase, production |
| Concepts with ACTIVE serving content | 238/238 | Supabase, production |
| Registry visual bindings | exact 76 · domain-default 0 · **none 162** | `scripts/physics/state.ts` |
| Can produce no figure by any registry tier | **151/238 (63%)** | tier-3 `detectVisual` sweep |
| Physics concepts generation has ever attempted | 91 (70 accepted, 68 served) | `visual_generation_outcome` |

---

## Correction 1 — the asset contract is not a gap. It is already closed.

The program brief ranked "asset contract compliance" as gap #1, the highest
leverage item, on the assumption that physics content might be authored but
DRAFT, or short of the per-band contract.

Measured against production: **all 238 physics concepts hold ACTIVE content, and
every one of the 262 (concept, band) pairs carrying teaching content meets the
contract** (>= 1 explanation and >= 3 closed-choice probes). There is nothing to
promote and nothing to author. Physics is the subject the contract's own header
cites as the proof that the bar is reachable.

**One measurement trap, recorded so it is not re-dug.** The contract covers
EXPLANATION and PROBE. A VISUAL asset also carries a `gradeBand`, so grouping
over every family invents a (concept, band) pair holding zero of each and
reports it as a shortfall — `phys.meas.unit-conversion` ADULT is exactly that
artefact, and it is the only "shortfall" a naive query finds.
`scripts/physics/state.ts` restricts the inventory to EXPLANATION and PROBE.
`scripts/math/state.ts` does not, and will drift the moment a mathematics visual
is promoted.

### A band hypothesis that was raised and then falsified

7 physics concepts hold content ONLY at UNDERGRADUATE — `phys.astro.black-holes`,
`phys.astro.cosmology`, `phys.mod.photoelectric-effect`,
`phys.qm.schrodinger-equation`, `phys.qm.spin`, `phys.rel.time-dilation`,
`phys.stat.maxwell-boltzmann`. Every general/Library learner with no grade set
maps to `ADULT` (`gradeToGradeBand(null)`), and running the REAL matcher across
all 36 band pairs shows ADULT scores **60 against UNDERGRADUATE, below the 65
threshold**, while ADULT↔HIGH reaches exactly 65 via `isHighAdultCompatible`.

That looked like a clean defect — taught but never quizzed, on seven
advanced/expert concepts, exactly the tier the QA run sampled.

**It is not a defect.** Both retrieval paths already carry a grade-band fallback:
`findBestProbe` and `findBestExplanation` re-run `pickBest` with `threshold: 0`
when nothing clears the normal bar ("authored probe for the right concept is
always better than Groq generating one — serve the best available grade band").
The content is served. No change was made, and the matcher must not be "fixed"
here — recorded so the next session does not re-derive the same wrong conclusion.

---

## Correction 2 — AI scene generation is LIVE in production, not blocked

CLAUDE.md states, in several places, that generation "stays disabled in
production until a human sets `ENABLE_AI_SCENE_GENERATION=true`". **That note is
stale and it is now wrong**, because the 2026-08-10 flag inversion made
`ENABLE_AI_SCENE_GENERATION` a KILL SWITCH: only `false`/`0`/`off`/`no` disables
it, and unset PERMITS.

Read directly from the deployed app, `GET /api/health`:

```json
"visual": { "scope": "rule-based", "narrowedTo": [], "heldForReview": [], "providerKey": true }
```

`scope: 'rule-based'` is `isGenerationKilled() === false`. `narrowedTo: []` means
no allowlist narrowing. `heldForReview: []` means policy resolves to `auto`.

And it is not merely permitted — it is working. `visual_generation_outcome`, one
day (2026-08-29):

| outcome | rows | of which physics |
|---|---|---|
| accepted + served (cached) | 200 | 138 |
| accepted + served (fresh) | 44 | 20 |
| rejected `not-anchored-to-concept` | 12 | 10 |
| rejected `no-suitable-form` | 5 | 2 |
| rejected `generation-failed` | 3 | 2 |
| rejected `structurally-invalid` | 2 | 1 |

~92% acceptance. The critic pipeline is doing its job and declining rather than
serving wrong figures.

**Consequence for the program's plan.** The brief offered two paths for visual
coverage. Both need restating:

- **Path (a) — turn generation on, review-only.** Generation is ALREADY on, and
  already reviewed by the critic. The remaining sub-question (whether to move
  from `auto` to `VISUAL_AI_SCENE_REVIEW_ONLY`) still cannot be actioned from a
  session: the Vercel MCP surface exposes projects, deployments, logs, runtime
  errors and deployment protection, and **no environment-variable tool of any
  kind** — verified this session by enumerating it, not assumed from history.
  That is a genuine infrastructure blocker, not an approval one.
- **Path (b) — extend the domain-default visual registry.** **Do not do this.**
  Physics has zero domain-default rules because a P0/P2 audit deliberately
  REMOVED all four (`phys.em`, `phys.opt`, `phys.wave`, `phys.meas`) after
  measuring that 61 concepts were reaching a figure only through those blanket
  rules and most were WRONG — `circuit_diagram` for Gauss's Law and 20 other
  field/magnetism concepts, `force_diagram` for the Doppler Effect and 13 other
  wave concepts. Re-adding them would reintroduce exactly that defect class. The
  brief's suggestion here is based on a CLAUDE.md line that does not describe
  physics.

Exact per-concept binding headroom is also nearly exhausted: of the physics-
relevant renderers, only 8 are bound to nothing (`bloch_sphere`,
`quantum_circuit`, `entanglement_pair`, `three_bloch_sphere`, `solar_system`,
`three_particle_system`, `three_coordinate_system`, `three_surface_visualization`)
and none faithfully depicts any of the 151 uncovered concepts — the quantum-
computing renderers have no matching KG concept, and `solar_system` does not
depict stellar evolution, cosmology, dark matter or black holes.

**So the honest position on visuals:** the registry cannot close this gap and
should not be forced to. Generation already closes part of it and is live. The
open question is not "should generation be enabled" but "why is it not ATTEMPTED
on the sessions that produce no figure" — a generation attempt that is never made
writes no `visual_generation_outcome` row at all, so the rejection table cannot
answer it. That is the live investigation.

---

## Correction 3 — the mastery headline was the harness, not the product

**"Only 1 of 30 sessions reached verified mastery" is not evidence about the
product.** It is an arithmetic artefact of the instrument, and no product at any
quality could have passed the bar as it was set.

Verified mastery is THREE server-graded correct answers (`correctAtCheck >= 1`
plus `correctAtPractice >= 2`), and the gate never re-asks a spent probe, so each
needs its own MCQ turn. The persona also answers the FIRST MCQ deliberately
wrong, and spends a seven-line opening arc before the engine attaches any MCQ at
all. `MAX_TURNS` was **9**. At that budget the persona can answer at most ONE MCQ
correctly, against a bar of three.

Measured end to end on `phys.stat.boltzmann-factor` (real account, deployed app,
2026-08-29):

```
T1-T6  opening arc — first MCQ arrives WITH the T6 response
T7     answers it deliberately wrong          -> checkCorrect 0
T8     persona line, engine teaches
T9     second MCQ arrives WITH the T9 response — and the run ENDS
```

The second MCQ was never answered, because answering it would have been turn 10.
Recorded as phase GUIDE, check 0, practice 0 — a teaching failure. It was not
one. The engine attached authored, keyed MCQs (`correctIndex` present) exactly
when it should have, and correctly refused to credit the deliberately wrong
answer.

Fixed in `c846703`: `MAX_TURNS` 9 -> 20, and the persona no longer clamps to its
last line (which was "can i go to next lesson now", so every turn past the sixth
repeated a request to leave — invisible at 9 turns, corrupting at 20).

This is the same class of defect this harness has hit repeatedly. CLAUDE.md's own
warning stands: **read the captured turn before believing a verdict.**

### What is genuinely ruled out for the assessment loop

- **Probe pool exhaustion / missing probes** — ruled out. 262/262 pairs at
  contract; physics averages >3 gradeable probes per concept.
- **Band mismatch** — ruled out, Correction 1.
- **Probes not attaching** — ruled out. Authored keyed MCQs attached on schedule
  in the captured session.
- **Turn deadline** — ruled out for generation: across three days of production
  attempts, p90 elapsed is 3.4s and the maximum is 5.9s against a 9s deadline.
  **Zero** attempts exceeded it.
- **Provider degradation** — not present in the captured run
  (`providerDegraded: false`, every turn served by `groq` or `memory`).

A real, closely-related defect was already fixed on 2026-08-29 (`c98ea7b`):
recovery turns synthesised `{correctness:false}`, so two "I don't understand"
utterances spent the affect budget and forced the episode into CLOSING, which
denies authored probes. Deployed, and the run that produced the 5.7/10 finding
predates it.

**Open:** whether mastery closes within 20 turns. A re-run at the corrected
budget is the falsifiable test and is the next thing to do.

---

## Visual coverage — the corrected picture

The registry number (151 of 238 with no binding at any registry tier) is real but
it is **not** the served experience, and quoting it alone would overstate the
gap. Generation is live and fills much of it on demand. Both halves matter:

| | |
|---|---|
| Registry exact bindings | 76 |
| Tier-3 keyword rescue | 11 |
| Physics concepts generation has ever attempted | 91 |
| …of which produced an accepted figure | **70 (77%)** |
| …attempted and ALWAYS declined | **21** |

Generation is demand-driven, so the 147 never-attempted concepts are simply ones
no learner has reached yet, not failures. Observed live this session:
`phys.qm.operators` and `phys.stat.boltzmann-factor` — both registry-unbound
expert concepts — were served generated figures at ~320ms from cache.

### The 21 concepts generation has tried and always declined

This is the actionable set. `no-suitable-form` dominates, and for several of them
that verdict is questionable rather than honest — `phys.em.magnetic-field` is
titled "Magnetic Field and Field **Lines**", and a field-line diagram is its
canonical textbook figure:

```
phys.mech.generalized-coordinates   phys.em.biot-savart        phys.em.maxwells-equations
phys.meas.units                     phys.particle.quarks       phys.meas.dimensions
phys.meas.significant-figures       phys.particle.antimatter   phys.qm.perturbation-theory
phys.em.electric-charge             phys.em.magnetic-field     phys.em.magnetic-materials
phys.mech.buoyancy                  phys.mech.power            phys.particle.standard-model
phys.qm.pauli-exclusion             phys.rel.postulates        phys.rel.simultaneity
phys.rel.spacetime                  phys.therm.entropy         phys.therm.specific-heat
```

Some declines ARE correct: `phys.particle.standard-model` is a CLASSIFICATION,
and the form menu explicitly (and rightly) forbids drawing one as a process
flow. There is no table form, so declining is the honest answer.

### A staleness mechanism worth knowing about

`writeDecline`/`readDecline` (`verdictCache.ts`) key a cached decline on
`conceptId` + a grounding hash, with a 30-day TTL — deliberately shorter than a
verdict's, and the module's own comment says why: "a decline says 'no figure
exists for this text', which is a claim about today's generator as much as about
the topic."

It is **not** keyed on a generator or prompt version. So an improvement to the
generation prompt cannot reach a concept that declined under the older one until
the TTL expires. Most of the 21 declines above are dated 2026-08-11 to 08-19 —
before the 2026-08-29 visual-engine work. Adding a generator-version component to
the decline key would make engine improvements take effect immediately instead of
up to 30 days later. **Not changed** — it alters a production cost-control path
and deserves its own measured change, not a drive-by edit.

---

## What has been done

- `scripts/physics/state.ts` — the subject's source of truth (commit `8db692a`).
  Repo half always runs; DB half reports UNAVAILABLE rather than zero without
  `DATABASE_URL`.
- Production measurement of the asset contract, visual bindings, generation
  policy and generation outcomes (this document).

## What is genuinely blocked

- **Setting any Vercel environment variable.** No env-var tool exists in the
  Vercel MCP surface available to a session, and there is no `VERCEL_TOKEN` in
  the sandbox. Only relevant now to the `auto` → review-only policy question,
  which is an owner decision rather than a defect.
- **Writing to the production database** is NOT blocked for reads; write access
  via the Supabase MCP has historically been a read-only transaction for DDL.
  Not needed so far — physics required no seeding.
