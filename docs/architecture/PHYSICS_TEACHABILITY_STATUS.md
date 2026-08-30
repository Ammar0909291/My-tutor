# Physics Teachability Program — status

**Purpose.** Make physics (238 KG concepts) genuinely teachable end to end for a
real learner — not "content authored", not a coverage percentage, but: a
struggling, visually-dependent learner can open any physics lesson, ask for a
diagram, get one, be assessed with a real gradeable question, and reach recorded
mastery inside a normal session.

**How to resume.** Run `npx tsx scripts/physics/state.ts` first. It is the
source of truth for this subject. Do not trust a number in this file, or in
CLAUDE.md, over that script's output.

Last updated: 2026-08-30.

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

### Measured: three runs of the same 12-concept seeded sample

Same seed, same concepts, all six difficulty tiers, run against the deployed app
after each fix. Provider-degraded sessions are excluded as UNMEASURED rather
than counted as failures.

| run | visual | verified mastery |
|---|---|---|
| qa3 baseline (harness fixes only) | 10/12 | **5/12 (42%)** |
| qa4 after the manner-adverb fix | 11/12 | 5/12 (42%) |
| qa5 after the budget-extension fix | 9/11 | **8/11 (73%)** |

The manner-adverb fix did NOT move the aggregate, and that is reported rather
than smoothed: it cleared a real contamination (`phys.qm.hydrogen-atom-qm` went
from stalling in GUIDE under English adverb drills to reaching CHECK) without
changing how many concepts closed. The budget-extension fix is what moved the
number.

**Do not read 73% as a pass.** At n=11 the 95% interval is roughly +/-26 points,
and per-concept churn between runs is large — `phys.particle.neutrinos` and
`phys.em.magnetic-field` each mastered in one run and not another with no code
change between them. This is a strong signal that the bottleneck was real and is
now released; it is not yet the >=60-concept evidence completion criterion 2
asks for.

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


---

# The 60-concept certification run (2026-08-30)

**What was run.** `scripts/qa/strugglingLearnerHarness.ts physics`, all six
difficulty tiers, `--count=60 --seed=2026`, against the deployed app with a real
QA account. A struggling, visually-dependent persona: weak English, asks for
pictures, says "too hard", answers the first closed-choice probe WRONG by
construction and correctly thereafter.

The container restarted mid-run at concept 34. The 34 finished transcripts were
still on disk and the harness had no way to use them, so `--resume` was added
(commit after `9c08fea`): it skips concepts that already recorded `ok:true` and
still hold a transcript, and retries any that failed. The run continued from 35.

## Headline

| Measure | Result |
|---|---|
| Concepts attempted | 60/60 completed, 0 discarded for lesson drift |
| Excluded as UNMEASURED (provider degraded) | 2 — `phys.mod.diode-rectification`, `phys.mech.center-of-mass` |
| **Measured sample** | **58** |
| Showed a real visual at least once | **46/58 (79%)** |
| Reached VERIFIED mastery (`correctAtCheck>=1` and `correctAtPractice>=2`) | **47/58 (81%)** |

81% clears the program's >=70% mastery bar. The two degraded sessions are
excluded rather than counted as failures — the app did not get a fair turn in
them, and counting them either way would be a claim the run did not measure.

### By difficulty tier

| Tier | n | visual | mastery |
|---|---|---|---|
| foundational | 2 | 2/2 | 1/2 |
| developing | 10 | 9/10 | 9/10 |
| proficient | 18 | 14/18 | 12/18 |
| advanced | 13 | 9/13 | 10/13 |
| expert | 13 | 11/13 | 13/13 |
| research | 2 | 1/2 | 2/2 |

Mastery does NOT fall off with difficulty — expert is the strongest tier at
13/13. The weak tier is `proficient` (12/18), which is where most of the
mid-lesson stalls below land.

## The 11 sessions that did not reach mastery, split by cause

Two of the three are instrument limits, not product failures, and are labelled
as such rather than folded into a single number:

- **5 hit the harness's own 20-turn ceiling at PRACTICE** with
  `checkCorrect=1, practiceCorrect=1` — one graded answer short, still being
  served probes when the run stopped counting.
  (`conservation-of-angular-momentum`, `surface-tension`, `nuclear-fusion`,
  `refrigerators`, `sound-intensity`.)
- **1 ran only 4 turns** (`phys.mech.normal-force`) and was served no keyed
  probe at all — its trajectory reads `PRACTICE > CHECK`, i.e. it did not start
  at the beginning of the ladder. Not explained; a single instance.
- **5 genuinely stalled at GUIDE** with nothing graded at all — 0 correct at
  CHECK, 0 at PRACTICE — and the concept turn budget then expired, closing the
  lesson honestly with "Let's pause ... here for now".
  (`unit-conversion`, `gravitational-potential`, `mirrors`, `stress-strain`,
  `universal-gravitation`.)

### The five GUIDE stalls: what was measured, and three explanations that were falsified

The discriminator is **keyed-probe attachment rate**: those five sessions were
served an authored, server-keyed probe on **7 of 75 turns (9%)**, against
**295 of 844 (35%)** across the other 53. The gate simply asked far less, the
concept budget ran out, and nothing was ever graded.

Three plausible causes were tested and each is WRONG. Recorded so they are not
re-derived:

1. **"The probe pool ran dry."** No. `phys.opt.mirrors` holds **7** ACTIVE
   probes at the served band (HIGH) and the session used exactly **1**. Every
   one of the five holds 3-7. Checked against production:
   `asset_identity` where `family='PROBE' AND status='ACTIVE'`.
2. **"QL-2 blocks asking permanently after a non-answer."** No.
   `questionLegality.ts` already scopes QL-2 to `teachSegmentsSinceQuestion === 0`,
   so it lifts as soon as the tutor teaches anything — and these sessions taught
   on nearly every turn.
3. **"Authored probes only attach at CHECK/PRACTICE, so GUIDE is a deadlock."**
   No. Measured attachment by phase across the run: OBSERVE 6%, DEMONSTRATE 33%,
   **GUIDE 46%**, CHECK 62%, PRACTICE 66%, TRANSFER 0%. GUIDE attaches probes
   routinely.

**The symptom is localized; the cause is not.** This is the honest state of
gap 3 ("why the assessment loop doesn't close") and it is the named next gap.

One contributing behaviour IS confirmed and is worth its own note: the model
sometimes writes a well-formed four-option MCQ **in prose**, on a turn where no
authored probe was attached and the concept still holds unused ones. The server
has no answer key for it, so `shouldSuppressSignalCorrectness` correctly refuses
to grade the answer — the learner answers, and nothing counts it. Measured at
11 of 919 turns (1.2%), so it is real but is NOT the main driver of the stalls.
`assetContract.ts`'s own header predicts this failure for a dry pool; here it
happens with the pool full.

---

# Teaching quality — an honest rating

12 transcripts were read: 4 chosen at random (seeded) and 8 chosen because they
failed, so the raw mean is pessimistic by construction. Ratings out of 10.

| Concept | Tier | Mastered | Rating |
|---|---|---|---|
| `phys.mech.pressure-fluids` | developing | yes | 8 |
| `phys.qm.angular-momentum-addition` | expert | yes | 7 |
| `phys.meas.significant-figures` | developing | yes | 7 |
| `phys.qm.quantum-tunneling` | expert | yes | 7 |
| `phys.mech.universal-gravitation` | proficient | no | 6 |
| `phys.meas.unit-conversion` | foundational | no | 6 |
| `phys.mech.generalized-coordinates` | expert | yes | 5 |
| `phys.em.gauss-law` | proficient | yes | 5 |
| `phys.opt.mirrors` | proficient | no | 5 |
| `phys.mech.stress-strain` | proficient | no | 5 |
| `phys.mech.gravitational-potential` | proficient | no | 5 |
| `phys.therm.refrigerators` | advanced | no | 4 |

Raw mean **5.8/10**. Re-weighted to the real 47-mastered / 11-not split the
sample was drawn from, roughly **6.0/10**.

**So the ">=7.5/10 average" criterion is NOT met.** The "nothing below 4/10"
criterion IS met — the floor is 4, and no transcript was incoherent, unsafe or
factually broken end to end.

What is genuinely good: the physics is correct; the opening reframe after "this
is too hard" is consistently well-pitched and concrete (coins for spin addition,
a ruler for significant figures, a pool for fluid pressure); wrong answers get a
real diagnosis rather than a restatement (`universal-gravitation`: "Weight equals
mass times acceleration, so to find acceleration you divide weight by mass, not
multiply"); and `quantum-tunneling` pre-empts a genuine misconception unprompted
("a tunneling particle does NOT borrow energy — that is a pop-science
misapplication of the energy-time uncertainty relation").

What pulls the average down, in order of how often it appeared:

1. **The authored explanation is re-emitted verbatim (fixed this session, below).**
2. **A correct substantive answer is sometimes answered with prose that ignores
   it.** `phys.therm.refrigerators` is the worst case in the sample: the learner
   gives three correct answers in a row and one of them is met with a statement
   that contradicts it and is itself wrong ("the coefficient of performance
   measures its efficiency" — COP is deliberately not an efficiency, and the
   learner had just said so correctly). Rated 4/10 for that reason.
3. **Content-free lead-in turns** — "Here is a question to check your
   understanding:", "Let's stay with this idea for a moment." These carry the
   MCQ in the payload widget, so they are not broken in the real UI, but they
   read as filler in a transcript.
4. **ASCII-art figures where no real visual exists.** `phys.em.gauss-law` falls
   back to a text sketch that renders as broken slashes — for a
   visually-dependent learner that is worse than the honest "I can't show you a
   picture of this one" that `significant-figures` gives.

## The one defect fixed from this evidence

**The authored explanation was being reproduced word-for-word by a later model
turn in 37 of 57 sessions (65%)** — 56 of 584 model turns (9.6%). Measured by
taking each turn served as `provider: "memory"` and searching every later
model-generated turn for its opening 200 characters.

It lands worst exactly where it costs most: as the reply to "can you show the
picture again, i want to look one more time", and as the reply to a CORRECT
substantive answer — which reads to the learner as not having been heard at all.
`phys.mech.generalized-coordinates` served the identical paragraph on T1
(`memory`), then again on T3, T6 and T10 (`groq`), the last of those in reply to
a correct answer.

Root cause: `buildTeachingMemoryBlock` names every other already-used artefact
with an explicit "do NOT repeat" — analogies, demonstrations, visuals, probes,
strategies — but never mentioned `explanationsServed`, which it has recorded all
along. The asset text is in the model's context (that is how it can copy it);
the instruction not to copy it was simply absent.

Fixed by adding the missing line, in the same shape and at the same authority as
its five siblings. 4 regression cases in `teachingMemory.test.ts`, including the
fresh-attempt and legacy-row paths.

**Not yet re-measured against production.** The fix is a prompt-contract change
whose effect can only be confirmed by another full run; the honest claim today is
that the defect is measured and the cause is identified, not that the number has
moved.

---

# Completion criteria — status

| # | Criterion | Status |
|---|---|---|
| 1 | Asset contract compliance | **MET** — 262/262 (concept, band) pairs; was already met before the program started (Correction 1) |
| 2 | >=60-concept evidence run | **MET** — 60 attempted, 58 measured |
| 3 | Assessment loop closes | **PARTIAL** — 81% of sessions close it; 5 stall at GUIDE with the cause localized but not isolated |
| 4 | >=70% verified mastery | **MET** — 81% |
| 5 | Quality >=7.5/10 average, none below 4/10 | **NOT MET on the average** (~6.0/10); the floor of 4/10 IS met |
| 6 | CLAUDE.md updated | **MET** |

Two of six are not fully met, and neither is being reported as met.


---

# Validation run after the repetition fix (2026-08-30)

Same harness, same seed, first 20 concepts of the same sample, run against the
deployed app **after** `5c1d7c8` reached production. Directly comparable to the
matching subset of the 60-run.

| Measure | Before (`9c08fea`) | After (`5c1d7c8`) |
|---|---|---|
| Sessions containing a VERBATIM repeat of the authored explanation | **11/17 (65%)** | **5/16 (31%)** |
| Model turns that reproduce it | 14/172 (8.1%) | 11/154 (7.1%) |
| Verified mastery | 14/17 (82%) | 13/16 (81%) |
| Showed a real visual | 13/17 (76%) | 11/16 (69%) |

Degraded sessions excluded from both sides (1 before, 2 after).

**What this does and does not show.**

- The share of sessions carrying at least one verbatim repeat **roughly halved**,
  65% → 31%. Fisher exact two-tailed **p = 0.084** — suggestive, not conclusive,
  at n=17 vs n=16.
- The **per-turn** rate barely moved (8.1% → 7.1%). So the sessions that still
  repeat, repeat more. The fix reduced how many lessons are affected more than
  how badly an affected lesson repeats.
- **Mastery is unchanged** (82% → 81%), which is the expected result — this was a
  quality fix, not a gating one.

**A tempting claim that the data does NOT support.** All three concepts that
stalled in the 60-run and reappear here — `unit-conversion`,
`gravitational-potential`, `conservation-of-angular-momentum` — now reach
TRANSFER with full verified mastery. That looks like the fix curing the GUIDE
stall. It is not: over the 15 concepts common to both runs, 3 went FAIL→PASS and
**2 went PASS→FAIL** (`electric-current`, `thermal-expansion`), net +1. That is
the same per-concept churn already recorded between the earlier qa3/qa4/qa5 runs
with no code change between them. The GUIDE stall is NOT fixed and is not being
reported as fixed.

**Net position after validation:** the repetition defect is measured, its cause
identified, a fix shipped, and the fix shows a halving of affected sessions that
falls just short of significance at this sample size. Criterion 5 (quality
average >= 7.5/10) and the GUIDE stall under criterion 3 both remain open.


---

# The GUIDE stall, narrowed to a mechanism (2026-08-30, production logs)

The 60-run localized the stall to a collapsed probe-attachment rate but could not
say why. Production `[gate-eligibility]` logs — the same instrument that found
the `c98ea7b` root cause — narrow it substantially.

## The gate is not the thing withholding probes

28 gate-eligibility records pulled from production. Per-phase blockers on
ineligible turns:

| phase | blockers recorded |
|---|---|
| OBSERVE | `phaseAllowsProbe` 9, `probeAttachablePhase` 9, `arbitrationAllowsProbe` 6, `hasMemoryState` 2, `notExcursion` 2 |
| DEMONSTRATE | `phaseAllowsProbe` 3, `probeAttachablePhase` 3, `arbitrationAllowsProbe` 2, `notExcursion` 1 |
| **GUIDE** | **`phaseAllowsProbe` 3 — and nothing else, ever** |
| PRACTICE | `arbitrationAllowsProbe` 1 |

At GUIDE the ONLY blocker ever recorded is `phaseAllowsProbe: false`, and it
appears exclusively on turns whose move is `show` or `teach`. Every GUIDE turn
whose move was `ask` was **eligible** (2 of 2). So the gate is not refusing to
attach a probe at GUIDE. The move simply is not `ask`.

## What chooses `teach` instead — a confirmed contributing mechanism

The same log lines carry the decision that produced the move:

```
CUE decision={"decision":"ESCALATE_TO_LLM","ruleId":"D4b-ANSWER-STUDENT-FIRST",
  "rationale":["The student asked something (a question or an explicit help
  request): respond to what they actually said before any teaching move.",
  "Never drill past a question — unanswered questions teach the learner to stop
  asking (conversation-engine register law)."]}
```

D4b is a good rule. It also has **no ceiling**, and this persona trips it
constantly: "can you help me again please", "can you explain one more time
slowly", "can you give me one more example please", "can you show the picture
again" are all explicit help requests.

Tested against the 58-session transcript corpus — does a help-request turn get a
keyed probe on the reply?

| learner turn | keyed probe attached |
|---|---|
| is a help request | **64 / 305 (21%)** |
| is not | **238 / 556 (43%)** |

A learner who asks for help is assessed at **half** the rate of one who does
not. And the five stalled sessions carry a **median help-request fraction of
0.50**, against **0.31** for the sessions that mastered.

## Why this is reported as PARTIAL and not as the root cause

Inside the five stalled sessions the suppression is much deeper than D4b alone
predicts — 1/38 (3%) on help-request turns, but also only 6/32 (19%) on their
NON-help turns, against a population rate of 43%. So something further depresses
those sessions on turns D4b does not touch. **D4b is a confirmed contributing
mechanism, not the complete explanation.**

## What was deliberately NOT changed

No change was made to the CUE decision layer. Adding a ceiling to D4b — "after N
consecutive help-request turns with nothing graded, answer AND attach a probe" —
is a plausible fix and may well be the right one, but it is a behavioural change
to the hot path justified by a partial explanation. This file's own history is a
list of times a plausible mechanism turned out to be wrong (three in the section
above alone). It is written down as the next step, with the evidence needed to
act on it, rather than shipped on a hunch.


---

# The 4-turn session, explained — restart over an abandoned attempt

The 60-run left one anomaly unexplained: `phys.mech.normal-force` ran only 4
turns, was served no keyed probe at all, and its trajectory read
`PRACTICE > CHECK` — it did not start at the beginning of the ladder. It is a
real defect, and the transcript names it.

The completion payload on turn 3 carried **`durationSeconds: 928967`** — 10.7
days. The harness sent `mode: 'restart'`; what it got was a resumption of an
attempt abandoned ten days earlier by some previous run on the same account.
Turn one arrived already at PRACTICE, the concept turn budget was already spent,
and the lesson closed on turn three with "Let's pause Normal Force and Constraint
Forces here for now" — having taught nothing and graded nothing.

## Cause

`lesson-init/route.ts` decided whether to open an attempt with:

```ts
const reason = latest === null
  ? 'first-start'
  : latest.status === 'COMPLETED' && isReteach ? `re-open for mode=${mode}`
  : null
```

An **IN_PROGRESS** attempt falls through to `null`, so nothing opens,
`attemptIsFreshStart` stays false, and `clearTransientStateForNewAttempt` never
runs. That is right for `resume` — the file's own comment calls resume "the ONE
mode that never means start again" — and silently wrong for `restart`, whose own
lesson-opening prompt reads "Open lesson X now and teach it from the beginning."

An abandoned attempt is the COMMON case, not an edge one: a learner who walks
away mid-lesson leaves an IN_PROGRESS row that nothing ever completes. This is
not a QA-only artefact — a real learner returning to a lesson after a break gets
a lesson that closes on its third turn.

## Fix

The rule is extracted into a pure `lessonAttemptStartDecision(latest, mode)` in
`lessonAttempt.ts` and given the missing case: `restart`/`review` over an
IN_PROGRESS attempt is a fresh start. Because `openLessonAttempt` reuses the row
rather than duplicating it, the decision also carries `resetStartedAt`, so the
restarted attempt's clock moves to now instead of inheriting the ten-day one.

`resume` and `next` are untouched, and that is pinned by test: resume must carry
on (clearing there would drop the ladder the learner earned and the MCQ still on
their screen) and next addresses a different lessonKey.

**Six existing source-text guards asserted the old inlined literals.** Each was
moved to assert the same invariant against the pure function — behaviour rather
than a regex over route source, which is strictly stronger. One of them,
`"reads the latest attempt first, so an IN_PROGRESS one is never disturbed"`,
asserted an invariant this change deliberately narrows; it is rewritten with the
reason rather than deleted, and now pins the part that actually matters (a lesson
genuinely in flight is not discarded, via resume and next).

**Not yet re-measured against production** — the same standing rule as the
repetition fix. n=1 in this corpus, so the frequency in real traffic is unknown.

---

# Two quality measurements that did NOT justify a change

Recorded because measuring and then NOT acting is the point of the rule.

- **ASCII-art fallback figures.** `phys.em.gauss-law` answers a
  visually-dependent learner with a text sketch that renders as broken slashes.
  Measured across the corpus: **1 of 58 sessions (2%)**. A one-off, not a
  systemic defect; no change made.
- **"38% of correct answers are ungraded" — a real number with a wrong reading.**
  Of 245 correct answers to server-keyed probes, 94 (38%) moved no mastery
  counter. That headline is misleading. 76 of the 94 are `GUIDE > CHECK` (53) or
  `DEMONSTRATE > GUIDE` (23) — the ladder *advancing*, which is the documented
  and intended design (`65d1f28`: a correct answer at a delivery phase advances
  and credits nothing, because the hollow-advancement protection lives at the
  gates). The tutor acknowledges these conversationally ("Correct—", "Great
  job!"). The genuinely suspicious residue is **18 of 245 (7%)** where a correct
  answer produced neither credit nor forward movement, **3 of which moved the
  learner BACKWARDS** — including one `CHECK > GUIDE` on a correct CHECK answer.
  Three instances is too few to act on; it is written down as a named anomaly.


---

# The GUIDE stall — ROOT CAUSE FOUND (2026-08-30)

The section above reported the stall as PARTIAL, with `D4b-ANSWER-STUDENT-FIRST`
a confirmed contributing mechanism and something else unexplained. That
something else is now found, and it is a genuine deadlock.

## Ruling out the remaining innocent explanation

If the stalled sessions simply never left the low-attachment early phases, their
collapsed probe rate would need no further cause. Tested against the corpus,
using the 53 non-stalled sessions to set a per-phase baseline (OBSERVE 0.07,
DEMONSTRATE 0.34, GUIDE 0.54, CHECK 0.62, PRACTICE 0.66) and applying each
stalled session's OWN phase mix:

| | turns | probes observed | predicted by phase mix |
|---|---|---|---|
| the 5 stalled sessions | 70 | **7 (10%)** | **23.6 (34%)** |

Phase mix does not explain it. A 3.4x shortfall survives controlling for it.

## The discriminator: a latch, not a gradient

Splitting every session at its FIRST wrong answer to a server-keyed probe:

| | before first wrong answer | after |
|---|---|---|
| the 53 other sessions | 62/363 (17%) | **233/425 (55%)** |
| the 5 stalled sessions | 7/49 (14%) | **0/21 (0%)** |

A wrong answer normally *starts* the assessment loop — attachment more than
triples. In the stalled sessions it stops it dead. Zero, across 21 turns. That
is a latch, and latches have a switch.

## The switch — two reasonable behaviours that deadlock

1. `chat/route.ts` suppresses the mastery gate while a probe is pending and
   ungraded (`unansweredProbeOnScreen = pendingMcqHoisted !== null &&
   mcqGradeHoisted === null`), so `findBestProbe` — whose `excludeProbeStem`
   guarantees a FRESH probe every time — cannot swap a different question in
   underneath the learner. Its comment states the assumption that makes this
   safe: *"the widget keeps rendering it from `pendingMcq`"*.
2. **The widget does not.** `LessonScreen.tsx` sets `activeMcq` from `data.mcq`
   and has a bare `else setActiveMcq(null)`. The response carried
   `mcq: mcqHoisted ?? undefined` — only a probe attached THIS turn, never one
   merely outstanding. So a response that omits the field **erases the question
   from the screen.**

Composed: the server withholds every new probe because it believes one is on
display; the learner is looking at none, cannot answer what they cannot see, and
so never produces the grade that would release the gate. The lesson runs out its
concept budget at GUIDE with nothing ever assessed.

`phys.opt.mirrors` shows it in the transcript: the tutor asks **"What led you to
pick option B?"** on a turn whose payload carries no `mcq` at all. The learner is
being asked to reason about an option that is no longer on their screen.

This is the same defect the route's own comment block already records fixing on
the server side — *"the tutor then referred them to a question that was no longer
on screen"* — reappearing across the API boundary.

## Fix

A shared `mcqToServe(attachedThisTurn, pending, gradedThisTurn)` in `mcq.ts`,
used by BOTH the response payload and the persisted `pendingMcq` snapshot. They
are two halves of one fact — what is on the learner's screen — and each half is
useless alone:

- response without persist → the learner sees a question nothing can grade next
  turn (the E6 defect `gateAssessmentRouteWiring.test.ts` guards, which caught
  exactly this while the fix was being written).
- persist without response → the deadlock above.

A probe GRADED this turn is deliberately not carried forward: it has produced its
evidence, and re-serving it would let one question be answered twice — the
hollow advancement `probeSpentOnTheGradingTurn.test.ts` exists to prevent.

Three existing wiring guards pinned the old `mcqHoisted` literal. Each now pins
the shared helper, which is strictly stronger: the old literal permitted the
inverse defect this fix repairs.

**Not yet re-measured against production.** A full 60-concept re-run on this
build is the next step. An in-flight run was stopped and discarded rather than
allowed to straddle two builds.


## Was the D4b finding just the latch in disguise?

Worth asking, because the latch was found afterwards and the five latched
sessions were also the most help-request-heavy — exactly the confound that would
manufacture a spurious D4b effect. Re-tested three ways:

| sample | help-request turns | other turns |
|---|---|---|
| all 58 sessions (as first reported) | 64/305 (21%) | 238/556 (43%) |
| **excluding the 5 latched sessions** | 63/267 (**24%**) | 232/524 (44%) |
| **only turns before any wrong answer** (no latch possible) | 14/185 (**8%**) | 55/230 (24%) |

The effect survives both controls at roughly the same ratio. D4b is independent
of the latch, and the earlier finding stands as written.

**No change is being made to D4b, and the sequencing is deliberate.** D4b
answering a learner's question instead of quizzing them is correct behaviour;
the open question is only whether it needs a ceiling. Until the latch fix is
measured, there is no way to tell whether a help-request-heavy session still
fails without it — the two mechanisms were always measured together. Changing
both at once would make the next run uninterpretable.


---

# `scripts/qa/teachingDefectScan.ts` — making the evidence re-derivable

Every quality claim in this document so far rested on one person reading twelve
transcripts. That is thin, and it is not reproducible: a later session cannot
check it without repeating the reading, and a regression would be invisible.

The scan counts six defect signatures, each one found by READING the 60-run
transcripts, verified against the code that produced it, and only then made
countable. Run against the same corpus it reproduces every number this document
derived by hand — 37/58 repetition, exactly the 5 latched sessions, 3 stranded
option references, 3 phase regressions, 1 ASCII fallback.

**It is explicitly NOT a quality score, and must never be reported as one.**
`strugglingLearnerHarness.ts`'s own header already says why and is right: "no
regex substitutes for that judgment." A lesson can trip zero signatures and
still teach badly — thin explanations, a correct answer met with prose that
ignores it, a fact stated backwards. `phys.therm.refrigerators`, the worst
transcript in the hand sample at 4/10, trips almost none of them. The ~6.0/10
average therefore still rests on reading, and criterion 5 stays unmet on the
evidence I actually have.

What the scan buys is the other half: a fix's effect becomes a number anyone can
re-derive from the same transcripts, rather than a claim resting on which
sessions someone happened to read.

    npx tsx scripts/qa/teachingDefectScan.ts <runDir> [<baselineDir>]

With two directories it compares only the concepts both runs measured, which is
the only fair reading of two different samples.

## Repetition fix, re-derived by the scan (17 shared concepts)

| signature | before | after |
|---|---|---|
| authoredExplanationRepeated | 12/17 (71%) | **6/17 (35%)** |
| probeLatch | 2/17 | 0/17 |
| correctAnswerNoCredit | 3/17 | 2/17 |
| **phaseRegressionOnCorrect** | 0/17 | **2/17** |
| verified mastery | 13/17 (76%) | 14/17 (82%) |

Two things to be honest about. The `probeLatch` drop to 0/17 is NOT the latch
fix — that run predates it; at n=2 it is noise. And `phaseRegressionOnCorrect`
moved the WRONG way, 0 to 2. Also n=2, also noise on its face, but it is a
counter-signal and is recorded rather than omitted, precisely because it is the
kind of number that is easy not to mention.


---

# Quality, re-rated on a properly random sample (2026-08-30)

The ~6.0/10 figure in this file came from 12 transcripts of which 8 were chosen
BECAUSE they failed. That is a biased sample, and re-weighting it was an
estimate, not a measurement. Eight more were drawn at random (seeded) from the
46 measured sessions not already read, and read end to end.

| concept | tier | mastered | rating |
|---|---|---|---|
| `phys.mech.pressure-fluids` | developing | yes | 8 |
| `phys.em.electrical-power` | developing | yes | 8 |
| `phys.qm.quantum-tunneling` | expert | yes | 7 |
| `phys.em.electric-field` | proficient | yes | 6 |
| `phys.mech.generalized-coordinates` | expert | yes | 5 |
| `phys.em.gauss-law` | proficient | yes | 5 |
| `phys.mod.nuclear-reactions` | advanced | yes | 5 |
| `phys.em.magnetic-dipole` | proficient | yes | 5 |
| `phys.astro.black-holes` | expert | yes | 5 |
| `phys.wave.sound-intensity` | proficient | no | 4 |

**Random-sample mean: 5.8/10 (n=10).** That is LOWER than the 6.0 this file
previously reported, so the earlier re-weighting was mildly optimistic and the
number is corrected downward. The floor criterion still holds — nothing below
4/10 — and criterion 5 remains clearly unmet.

`phys.em.electrical-power` is what a good one looks like: concrete throughout
(a kettle element beside its own flex, then a battery/bulb/switch loop), a
genuine four-option question, a wrong answer met with the actual reason
("the switch is almost a perfect conductor"), and mastery reached in twelve
turns with no filler.

## A seventh defect, found by reading and then measured

**A request to SEE the figure answered by teaching the learner the words to ask
with.** In `phys.wave.sound-intensity` the learner types "can you show the
picture again, i want to look one more time" and the tutor replies:

> When you want to see a diagram or image again, you can simply say, "Show me
> the picture again" or "Can you show it one more time?"

The learner then dutifully types "Show me the picture again." and is told "I
can't display the image again." Two turns of a physics lesson spent on how to
operate the tutor, ending in a refusal.

Measured across the corpus: **5 of 58 sessions (9%)** — `longitudinal-waves`,
`mirrors`, `sound-intensity`, `electric-current`, `nuclear-reactions`. Every
instance is triggered by the same learner sentence, and the reply quotes that
sentence back as the phrase to say, which points at the topic extractor reading
the request as a subject. It is the same family as the manner-adverb excursion
fixed in `86a5346`, where "explain it slowly" became a lesson on the adverb
*slowly*. Note that `phys.opt.mirrors` is also one of the five latched sessions.

Added to `teachingDefectScan.ts` as `taughtHowToAsk` so the fix, when it comes,
has a before number to be judged against.

**NOT FIXED YET, and deliberately so.** The fix is server-side — topic
extraction or the visual-request path — and a deploy would land in the middle of
the 60-concept run now measuring the three fixes already shipped. It is the
first thing to do once that run lands.
