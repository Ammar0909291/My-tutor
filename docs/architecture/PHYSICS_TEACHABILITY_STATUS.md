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

## Gap 3 — why the assessment loop does not close

Not yet root-caused. Ruled out so far:

- **Probe pool exhaustion / missing probes** — ruled out. 262/262 pairs at
  contract; physics averages >3 gradeable probes per concept.
- **Band mismatch** — ruled out, see Correction 1.

Still open, in priority order: the turn deadline (9s covering generate +
validate + judge) abandoning figures on a slow provider; the per-session
generation budget (6); and whatever keeps sessions in OBSERVE/GUIDE rather than
reaching CHECK. Note that a real, closely-related defect was already fixed on
2026-08-29 (`c98ea7b`): recovery turns synthesised `{correctness:false}`, so two
"I don't understand" utterances spent the affect budget and forced the episode
into CLOSING, which denies authored probes. That fix is deployed; the QA run
that produced the 5.7/10 finding may predate it.

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
