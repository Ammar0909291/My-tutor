# ADR 16 · Time-Stepped Simulation Layer — Newton's Second Law Proof of Concept

**Status:** ACCEPTED (owner, 2026-09-29) for the Newton POC direction. **G1, G2 and G3 implemented.**
G3 binds exactly ONE production concept (`phys.mech.newtons-second-law`) with no flag (owner decision
on U8). Mass migration is not started; G5 needs its own future ADR. U1–U7 decided and U8
deferred to G3 (see §13).
**Date:** 2026-09-29
**Roadmap:** Educational Brain forward roadmap item 7, "Visualization & Simulation Architecture"
(`docs/project-memory/PROJECT_STATE.md` §4c). Binding per-ADR discipline: design only, zero
production code without explicit per-ADR approval.
**Extends (does not replace):** ADR 12 (Visualization & Simulation Architecture, Proposed) and
ADR 15 (Rendered Reality Model). This ADR fills ADR 12's reserved, unspecified
`interactive_widget` slot for exactly one case. It does so **without** adding a new renderer or
registry.
**Proof of concept only:** `phys.mech.newtons-second-law`, 1-D, constant net force.

---

## 0. Decision in one paragraph

A time-stepped simulation is added as an **optional `simulation` member on an existing
`PARAMETRIC_SCENES` entry**. That entry is the same registry, the same pure-builder discipline, the
same validators and the same `SceneSpec` output as today. Time becomes a first-class state variable
(`t`) that is advanced by a pure, deterministic model at a fixed timestep. Every frame is an
ordinary `SceneSpec` produced by the kind's own pure builder and gated by `validateSceneSpec`, then
drawn by the existing renderer inside the existing `ExplainerFigure`. The t = 0 frame is identical
to today's static canonical figure, so the server, snapshots, the figure critic and no-JS clients
see nothing new. The prediction → experiment → observation → explanation loop and its evidence stay
entirely client-side and in memory. Nothing reaches Tutor Max, mastery, learner state or the
database.

---

## 1. Existing capabilities reused (evidence from the repository at `fa77ed50`)

| Capability | Where | Reused for |
|---|---|---|
| Declarative scene contract. `sceneType` already includes `'simulation'` (advisory). `SceneStep.intent/focus/predict` exist. | `src/lib/teaching/sceneSpec.ts` | Every simulation frame is a plain `SceneSpec`; no new render format |
| The variable layer: `defaults`, `variables` (with the causal `effect` clause), and a `build` run through the generator's own validator | `src/lib/teaching/visual/parametricScenes.ts` (`PARAMETRIC_SCENES`, `guarded`, `rebuildScene`, `canonicalParametricScene`) | The simulation registers **inside** the same entry; sliders and the effect text are unchanged |
| Server/client parity: `rebuildScene` applies `fitSceneToFrame` and the same `validateSceneSpec` gate as the server, and stamps `parametric: {kind, params}` | `parametricScenes.ts` | Frame generation reuses this gate; the stamp tells the client a figure is simulatable |
| Pure animation layer (trace / sweep / stages). The rule "animate only when motion communicates" is computed, and "the component owns the clock". | `src/lib/teaching/visual/sceneAnimation.ts` | Same philosophy; `sweep` stays as is (parameter animation ≠ time evolution) |
| Client frame with a `requestAnimationFrame` clock, Play/Pause, `usePrefersReducedMotion`, "drag to step through it" fallback, predict stages, misconception contrast, representation views | `src/components/school/visuals/ExplainerFigure.tsx` | Hosts the simulation controls; no new figure shell |
| Per-concept binding of a concept to a generator kind (`sceneGenerator`) | `src/lib/teaching/visualRegistry.ts` (Newton's second law is currently bound to the legacy `three_newton_forces` VisualSpec, with no `sceneGenerator`) | The single production switch (§11) |
| Pure-module split and the browser-safety guard | `sceneGenerators/*.pure.ts`, `src/tests/sceneGeneratorPurity.test.ts` | The Newton model lives in a `.pure.ts` module under the same guard |
| Kinematics geometry (x–t / v–t curves, bounds, consistency checks) | `sceneGenerators/kinematicsGraphs.pure.ts` | Optional v–t trace beside the track (decision U5) |
| Pedagogical knowledge tier: VKR and VIE (`VisualIntent`: purpose / claim / form class; misconception mappings; interaction recommendations) | `visualKnowledgeRegistry.ts`, `visualIntelligenceEngine.ts` (pure; not wired to runtime) | **Unchanged.** The simulation is a production-tier artefact (ADR 12 side of the boundary); VKR stays the pedagogical tier and neither imports the other |
| Rendered-reality discipline (what the tutor claims must be what is rendered) | ADR 15, `renderedRealityModel.test.ts` | Static t = 0 frame = the figure the tutor refers to (§8) |

**Explicitly NOT reused as runtime:** the dev-only `*Interactive3D` components
(`NewtonForcesInteractive3D` is a static force balance), `SimulationControlPanel`,
`GuidedSimulationMode`, `useControlMastery`, and the unwired `VisualMasterySignal`. They sit outside
the SceneSpec pipeline; promoting them would create the competing path this ADR forbids. Their UI
ideas (button layout) may be borrowed; their code and state are not.

## 2. The exact missing capability

The parametric layer can **re-derive a figure for any parameter value**. It cannot **evolve a
state through time**. Concretely, none of the following exist anywhere in the SceneSpec pipeline:

1. **Time as state.** There is no `t` and no state `S(t)` (position, velocity) that persists
   between frames. `sweep` interpolates a *parameter* and rebuilds statelessly. `trace` walks a
   path that was precomputed once.
2. **A deterministic evolution rule** (`initial(params)`, `advance(state, ticks)` or a closed form
   `at(params, t)`), with a fixed timestep that does not depend on frame rate or device.
3. **Run lifecycle semantics.** Run / Pause (state preserved) / single Step / Reset, and a terminal
   condition (end of track, max time) that auto-pauses.
4. **Parameter freezing during a run.** Today a slider change rebuilds instantly. During a run that
   would silently break the causal inference.
5. **Observable readouts over time** (t, x, v, a at the current tick) and a **run record** (what
   was set, what was measured).
6. **A prediction linked to a measured outcome.** `SceneStep.predict` reveals an authored stage.
   It has no notion of "the learner's experiment tested this prediction, and here is what it
   measured".
7. **A stable world frame across a run.** `rebuildScene` refits every frame, which is correct for
   static rebuilds. For a moving body it would re-zoom continuously, so the body would appear
   stationary.

Items 1–7 are the whole gap. Everything else (rendering, validation, a11y text, the clock host,
reduced motion, sliders, registry, binding) already exists.

## 3. Simulation contract and state model

Additive and optional on `ParametricScene`. A kind without `simulation` behaves exactly as today.

> **As implemented at G1.** The contract shipped in the closed-form shape the POC needs:
> `TimeSimulation { fixedDt, stepTicks, maxTicks, terminalTick(params), build(params, tick),
> observe(params, tick), predictions }` (`parametricScenes.ts`), plus `simulationFor(kind)` and
> `simulationFrame(kind, params, tick)`. `simulationFrame` passes every frame through the same
> gate as a slider rebuild (`finishFrame`: `fitSceneToFrame` → `validateSceneSpec` → parametric
> stamp). `initial`/`at`/`step`/`done`/`frame` below are the design-level description: `done` is
> `terminalTick`, `at` is `build`/`observe` at a tick, and the fixed world frame is built into the
> generator's geometry (a fixed bounding box), not a separate method. A future non-closed-form
> kind may add a `step` member when it is approved. The sketch is kept for the record.

```ts
// parametricScenes.ts — additive, optional (future; not implemented by this ADR)
export interface ParametricScene {
  defaults: SceneParams
  variables: SceneVariable[]
  build: (params: SceneParams) => SceneSpec | null
  simulation?: TimeSimulation          // NEW — absent = not simulatable (today's behaviour)
}

/** A pure, deterministic time model. No React, no timers, no randomness, no I/O. */
export interface TimeSimulation<S extends SimState = SimState> {
  /** Fixed physics tick, seconds. The wall clock only decides HOW MANY ticks to run. */
  fixedDt: number                                   // Newton POC: 0.02 s
  /** Display step for the Step button, in ticks. */
  stepTicks: number                                 // Newton POC: 5 (= 0.1 s)
  maxTicks: number                                  // hard stop
  /** Validated initial state, or null if the generator's validator refuses the params. */
  initial(params: SceneParams): S | null
  /** State after `tick` ticks. Closed form when one exists (exact, no integration error). */
  at?(params: SceneParams, tick: number): S | null
  /** Otherwise a pure one-tick step; the host folds it. Exactly one of at/step is required. */
  step?(state: S, params: SceneParams): S
  /** Terminal condition (end of track, left frame, maxTicks). */
  done(state: S, params: SceneParams): boolean
  /** World extent for the WHOLE run, computed once from params, so frames never re-zoom. */
  frame(params: SceneParams): { xMin: number; xMax: number }
  /** The kind's own pure builder, drawing this state. Output passes validateSceneSpec or is refused. */
  render(state: S, params: SceneParams): SceneSpec | null
  /** Learner-facing readouts for the current state. */
  observe(state: S, params: SceneParams): Readout[]
  /** Authored predictions this kind can test (see §6). */
  predictions: SimPrediction[]
}

export interface SimState { tick: number; t: number }
export interface Readout { key: string; label: string; value: number; unit: string }
```

**Determinism rule.** State is a pure function of `(params, tick)`. A host running at 30 fps and a
host running at 144 fps reach bit-identical states at the same tick. That is what makes Step exact
and tests reproducible.

**Invariant.** `render(initial(defaults), defaults)` must equal `rebuildScene(kind, defaults)` in
geometry (fingerprint via the existing `figureFingerprint`). So the static figure is literally
frame 0.

**Registry.** No new registry. `simulationFor(kind)` is a one-line accessor beside
`variablesFor(kind)`.

## 4. Newton F = ma simulation model (POC)

- **Kind:** `newton_second_law` — a new `SceneGeneratorKind` in
  `sceneGenerators/newtonSecondLaw.pure.ts`.
- **Routing:** bound **only** via `visualRegistry` `sceneGenerator`. It is **not** keyword-routed
  and has **no LLM parameter extractor**. This respects `sceneRouter.ts`'s standing note that
  open-ended free-body/net-force extraction is out of scope: this is a canonical, authored
  experiment, not an extractor.
- **World:** a block of mass *m* on a straight, frictionless horizontal track of length L = 20 m,
  starting from rest at x₀ = 0.
- **Variables** (via the existing `NumericVariable`, each with its causal `effect` clause):
  - `force` F: 0–20 N, step 1, default 10. Effect: "for the same mass, acceleration grows in
    direct proportion to the net force".
  - `mass` m: 0.5–10 kg, step 0.5, default 2. Effect: "for the same force, a heavier block
    accelerates less — acceleration is inversely proportional to mass".
- **Model (closed form, exact):** a = F / m; v(t) = a·t; x(t) = ½·a·t²; t = tick·fixedDt.
  Terminal when x ≥ L, or when tick ≥ maxTicks (10 s → 500 ticks at 0.02 s).
  - F = 0 gives a = 0: the block stays at rest (valid; the first-law boundary case).
- **Validator:** m > 0 and finite, 0 ≤ F ≤ bound, L fixed. Out-of-range values produce no figure
  (the existing `guarded` behaviour).
- **Render** (existing `SceneObjectType` only; as implemented): floor and start/finish lines (`bond`,
  reference role); the block (`node` at x, radius growing gently with m); applied-force arrow
  (`arrow`, length ∝ F, pushing from behind); acceleration arrow (∝ a, constant during the run);
  velocity arrow (∝ v, grows); labels (`label`). The v–t graph sits below the track with fixed axes
  (0–10 s, 0–45 m/s): a sampled trace (`path`, every 0.1 s) plus a current-point `node` (U5). The
  graph geometry is computed in the Newton module itself (a straight line from v = at), since
  `kinematicsGraphs.pure` exposes only a whole-scene builder.
- **Readouts:** t (s), x (m), v (m/s), a measured as Δv/Δt (m/s², once t > 0), and F, m (echoed).
  The model's a = F/m is deliberately NOT a readout, so the law is inferred from data.
- **Measured acceleration** for evidence: a_meas = Δv/Δt over the run, from recorded states.
  It is equal to F/m by construction. It is shown as a *measurement*, so the learner infers the law
  from data rather than being told it.
- **Misconceptions the POC is designed to surface:** "a constant force gives a constant speed";
  "heavier objects accelerate the same under the same force"; "force is proportional to velocity".
  These use the product's standing misconception vocabulary. They are not new EB/KG content, and no
  EB/KG file is edited.

## 5. Run / Pause / Step / Reset behaviour

A pure reducer (`simulationControl(state, event) → state`), testable in Vitest's node environment.
The component only dispatches events and owns `requestAnimationFrame`.

| State → Event | idle (t = 0) | running | paused (0 < t, not done) | finished (done) |
|---|---|---|---|---|
| **Run** | → running | — | → running (resumes, same state) | disabled |
| **Pause** | — | → paused (state preserved exactly) | — | — |
| **Step** | → paused at +stepTicks | disabled | +stepTicks (clamped at done) | disabled |
| **Reset** | no-op | → idle, tick 0 | → idle, tick 0 | → idle, tick 0 |
| **Slider change** | rebuild the t = 0 frame (today's behaviour) | **locked** (sliders disabled) | **resets to idle** with new params | resets to idle with new params |
| **done() becomes true** | — | → finished (auto-pause on the exact terminal tick) | → finished | — |

- **Clock:** a fixed-timestep accumulator. Each rAF callback adds elapsed wall time and runs
  `floor(acc / fixedDt)` ticks, capped per frame so a background tab never jumps. On
  `visibilitychange` → hidden, the simulation auto-pauses.
- **Speed:** 1× only in the POC (no speed control).
- **Reduced motion:** no autoplay and no continuous Run. Stepping and a time scrubber over
  [0, done] are shown instead (the existing "drag to step through it" pattern). Readouts are
  identical. The simulation is fully usable without seeing motion.
- **Accessibility:** buttons are keyboard reachable with labels. Readouts are announced through an
  `aria-live="polite"` region **only** on Pause, Step, finish and Reset (never per frame). The
  existing accessible description plus each variable's `effect` text carries the causal claim.
- **Frame failure:** if `render()` ever returns null or fails `validateSceneSpec`, the host keeps
  the last good frame, stops the run, and shows no fabricated state.

## 6. Prediction → experiment → observation → explanation

All four happen inside the figure; the tutor is not involved in the POC.

1. **Predict (before any run).** The figure offers one authored `SimPrediction`, for example:
   "Keep the force the same and double the mass. The acceleration will… (a) double (b) halve
   (c) stay the same."
   ```ts
   // As implemented (parametricScenes.ts). There is NO answer key: whether a prediction matched is
   // decided by comparing the learner's chosen relation with the relation the runs MEASURED.
   type SimRelation = 'proportional' | 'inverse' | 'unchanged'
   interface SimPrediction {
     id: string
     question: string
     options: readonly { label: string; relation: SimRelation }[]
     /** What a fair experiment for it looks like: vary one quantity, hold the rest, read `measure`. */
     tests: { vary: string; holdConstant: readonly string[]; measure: string }
     explanation: string   // authored; revealed at step 4
   }
   ```
   The learner may skip predicting; skipping is recorded as no prediction, not as wrong.
2. **Experiment.** The learner sets variables and runs, as many runs as they like. Each run is a
   `RunRecord` (params, terminal or paused state, a_meas).
3. **Observation.** A small run table shows F, m and a_meas for each run. The figure identifies the
   first **controlled pair**: two runs that differ only in `tests.vary`, with every `holdConstant`
   variable equal. Until such a pair exists the figure prompts "change only the mass and run again".
   This teaches the control-of-variables skill rather than just the formula.
4. **Explanation.** Once a controlled pair exists, the figure shows the observed ratio (e.g.
   "mass ×2 → a ×0.5"), states whether it matches the learner's prediction, and reveals the authored
   `explanation` and the variable's `effect` clause. The result is feedback inside the figure only.
   It is never a grade and never a probe.

## 7. Evidence model — client-side only for the POC

Three kinds of record are kept separate on purpose (action ≠ observation ≠ interpretation). This
prevents a click being mistaken for understanding:

```ts
type SimEvent =
  | { kind: 'prediction';     id: string; at: number; predictionId: string; choice: number | null }
  | { kind: 'action';         id: string; at: number; action: 'set' | 'run' | 'pause' | 'step' | 'reset'; params: SceneParams }
  | { kind: 'observation';    id: string; at: number; runId: string; params: SceneParams; tick: number; readouts: Readout[]; aMeasured: number; terminal: boolean }
  | { kind: 'interpretation'; id: string; at: number; predictionId: string; runIds: [string, string]; observedRatio: number; matchedPrediction: boolean | null }
```

- **Storage:** React state for the lifetime of the mounted figure. No `localStorage`, no network,
  no database, no analytics, and no route payload.
- **Pure reducer:** `recordSimEvidence(log, input, predictions)` (`visual/simulationEvidence.ts`). `interpretation` is only derivable from a controlled
  pair (§6.3). `matchedPrediction` is `null` when no prediction was made.
- **Hard boundary:** `SimEvent` is **not** `EvidenceEvent`, **not** `PROBE_OUTCOME`, **not**
  mastery, and **not** Tutor Max input. There is no answer key and nothing is graded. Connecting this to
  the server is a separate future ADR (§9, G5).
- **QA visibility:** a read-only evidence panel on `/dev/visual-demo` only (that route calls
  `notFound()` in production).

## 8. Integration with the existing visual rendering path

```
visualRegistry (concept → sceneGenerator: 'newton_second_law')      ← the only production switch (G3)
   → existing canonical path: rebuildScene(kind, defaults)             (server; unchanged code)
   → SceneSpec{ sceneType:'simulation', parametric:{kind, params} }  = frame 0 (static figure)
   → route payload `sceneSpec` → SceneSpecFigure → ExplainerFigure   (unchanged transport)
        ExplainerFigure: simulationFor(kind) ? <SimulationControls/> : existing sweep/trace
        each tick: sim.render(state) → validateSceneSpec → existing SceneRenderer
```

- **Server:** zero new code paths. The server only ever builds frame 0, via today's
  `rebuildScene`. Snapshots, restore, the figure critic, fingerprint caching and
  `turnRecord`/`visualContract` see an ordinary static SceneSpec.
- **Rendered reality (ADR 15):** the tutor's text refers to the figure. Frame 0 is exactly what is
  rendered before interaction, so no claim becomes untrue. The route does not tell the tutor a
  simulation "ran"; no evidence crosses back.
- **No new `VisualRenderer`:** ADR 12's `interactive_widget` placeholder is resolved as "a
  `scene_spec` asset with an optional time dimension". The ADR 12 asset/cache model, if it is ever
  implemented, needs no change for this.
- **VKR/VIE:** untouched. The simulation does not read VKR in the POC.
- **Bundle:** the pure model plus controls is estimated in the low single-digit kB; `/learn` first
  load is currently 613 kB. Verified at G2 by the build's route table.

## 9. Deliberately outside this ADR

- Any Tutor Max / `route.ts` link: evidence to the server, the tutor referencing runs, probes from
  simulations, mastery credit. Future ADR; gate G5.
- Educational Brain, KG, curriculum, learner-state / mastery architecture, `EvidenceEvent`, and
  the database. No edits.
- VKR / VIE edits, including authoring a VKR entry for Newton.
- LLM parameter extraction or keyword routing for the new kind.
- Friction, inclines, 2-D motion, multiple bodies, collisions, springs, and variable forces
  (the contract permits `step()` for these later; the POC does not use it).
- A general physics engine or numerical-integrator library.
- Speed controls, recording/replay, sharing, persistence, and analytics.
- Other subjects and other concepts, the 3-D `*Interactive3D` components, and ADR 12's
  VisualAsset/cache migration.
- GB+ grading. Closed and verified; untouched.

## 10. Testing strategy

All logic is pure and runs in Vitest's node environment (the repo has no component-test setup;
none is added).

1. **Model:** a = F/m over the whole parameter grid; closed-form x, v at sampled ticks; F = 0 →
   block at rest; the terminal tick is exact (first tick with x ≥ L); invalid m ≤ 0 or F out of
   bounds → `initial()` is null.
2. **Determinism:** `at(params, n)` equals folding n ticks (if `step` is ever supplied), and it is
   independent of how ticks are grouped into frames (simulate 1-tick vs 7-tick batching).
3. **Frame validity (property test):** for a grid of (F, m) × every stepTicks-th tick, `render()`
   passes `validateSceneSpec`; the world frame is constant across the run (no re-zoom).
4. **Parity invariant:** `figureFingerprint(render(initial(defaults)))` equals
   `figureFingerprint(rebuildScene('newton_second_law', defaults))`.
5. **Control reducer:** every transition in the §5 table, including sliders locked while running,
   slider-while-paused → reset, auto-finish on the exact tick, Step clamped at done, hidden tab →
   paused.
6. **Evidence reducer:** the three record kinds stay separate; an interpretation is emitted only
   for a controlled pair; `matchedPrediction` is null without a prediction; nothing is emitted as
   a grade.
7. **Guards:** `sceneGeneratorPurity.test.ts` covers the new `.pure.ts`;
   `curriculumKgRegistration`, `visualRegistry`, `visualCoverageValidator`,
   `renderedRealityModel`, `parametricSceneInteraction` and `sceneAnimation` stay green.
8. **Browser:** Playwright on `npm run dev` → `/dev/visual-demo` (Chromium is pre-installed):
   Run/Pause/Step/Reset, reduced-motion emulation, keyboard-only operation, and a screenshot per
   state.
9. **Gates before any push:** `tsc --noEmit` (ratchet 0), eslint, the full Vitest suite, and
   `npm run build`.

## 11. Rollout and rollback

| Phase | Exposure | Switch | Rollback |
|---|---|---|---|
| A. Pure model + contract + tests (G1) | None: no binding, and nothing imports the controls | none | `git revert`; no data or schema involved |
| B. Controls in `ExplainerFigure` + dev demo (G2) | `/dev/visual-demo` only (`notFound()` in production). `ExplainerFigure` shows controls only for a kind with `simulation`, and no production concept is bound to one yet | none | `git revert` |
| C. Production binding (G3) | `phys.mech.newtons-second-law` only | `visualRegistry` `sceneGenerator: 'newton_second_law'`, plus an env flag, default **off**, read where the registry entry resolves (pattern decided at G3; no allowlist resurrection) | flag off → the concept falls back to today's `three_newton_forces` figure; or revert the one registry line |
| D. Flag on + live verification (G4) | Real learners on that one concept | flag on | flag off (instant); frame 0 is a valid static figure, so there is nothing to migrate |

No database, migration or persisted state exists at any phase, so rollback never touches data.

## 12. Approval gates (explicit, in order; each is a separate owner decision)

- **G0 — approve this ADR** as roadmap item 7's per-ADR approval, for the Newton POC only. Confirm
  whether the CLAUDE.md G1/G2 Educational-Brain gate applies to a visual-only capability or is
  excepted for it.
- **G1 — implement Phase A** (pure model, contract extension, tests). Local commit; push only on
  approval.
- **G2 — implement Phase B** (controls, reducers, dev demo, Playwright evidence). Push on approval.
  Production-safe because nothing is bound.
- **G3 — production binding behind a default-off flag.** Push/deploy approval.
- **G4 — turn the flag on** for `phys.mech.newtons-second-law`, with a live verification report.
- **G5 — separate future ADR** before any simulation evidence reaches Tutor Max, mastery or the
  database.

## 13. Decisions (owner, 2026-09-29)

- **U1** APPROVED: standalone ADR 16, extending ADR 12.
- **U2** APPROVED: no friction in the POC.
- **U3** APPROVED: once explicitly bound, the simulation is the primary Newton figure, and the legacy
  `three_newton_forces` figure is kept as the fallback.
- **U4** APPROVED: parameters are locked while a run is active.
- **U5** APPROVED: the v–t graph is shown beside (below) the track.
- **U6** APPROVED: predictions are authored on the `PARAMETRIC_SCENES` entry, not in VKR.
- **U7** APPROVED: this ADR is committed to `docs/architecture/`, and PROJECT_STATE item 7 is corrected.
- **U8** DEFERRED to G3: no flag mechanism is chosen or implemented yet.

## 14. G1 implementation record (2026-09-29, local commit, not pushed)

- `src/lib/teaching/sceneGenerators/newtonSecondLaw.pure.ts` (new): the closed-form model
  (a = F/m, v = at, x = ½at², fixed 0.02 s tick, exact first-tick terminal at 20 m or 10 s), and the
  figure: block, force/acceleration/velocity arrows, and the v–t graph with FIXED axes so slopes
  compare across runs. A fixed bounding box keeps the camera still for the whole run. Arrows shorter
  than 0.05 units are omitted, because the validator refuses zero-length vectors. The F = 0 case
  has its own truthful narration.
- `src/lib/teaching/sceneGenerators/newtonSecondLaw.ts` (new): a re-export host (required by
  the purity test). It deliberately has no LLM extractor.
- `src/lib/teaching/visual/parametricScenes.ts`: the optional `simulation` member, the
  `TimeSimulation`/`SimPrediction`/`SimReadout`/`SimRelation` types, the `newton_second_law` entry
  (F 0–20 N, m 0.5–10 kg, two authored predictions), `simulationFor`, `simulationFrame`, and a
  behaviour-preserving extraction of `rebuildScene`'s gate into `finishFrame`.
- `src/lib/teaching/visual/conceptSceneParams.ts`: a `newton_second_law` canonical entry. It is
  required by the existing "canonical and variable registries cannot drift" invariant, and it is
  inert: the resolver reaches this table only through a concept's `visualRegistry` binding, and
  none exists.
- `src/lib/teaching/visual/resolveVisual.ts`: one data row, `newton_second_law: 'force_diagram'`
  in `SCENE_KIND_REPRESENTATION`. It is required by the existing "every activated scene kind has an
  explicit representation" invariant (which the canonical entry above triggers), and it is inert:
  the table is read only for a concept whose binding resolves to this kind. No resolver logic
  changed.
- `src/lib/teaching/visual/simulationControl.ts` (new): the Run/Pause/Step/Reset/seek/setParams
  reducer and the fixed-tick accumulator (a late frame releases at most 10 ticks).
- `src/lib/teaching/visual/simulationEvidence.ts` (new): the in-memory evidence reducer
  (prediction / action / observation / interpretation). An interpretation is emitted only for a
  fair pair of runs, and nothing is graded.
- `sceneRouter.ts` is NOT touched. The kind is not added to `SceneGeneratorKind` until G3 needs it
  for the binding, which is one production file fewer than the design report's G1 file list.
- Tests: `newtonSecondLawSimulation`, `simulationControl` and `simulationEvidence`, plus the existing
  registry-wide suites, which now cover the new kind automatically (canonical validity, range
  validity, animation honesty, label budget, label contract, representation views).

- **U1** Placement: a standalone ADR 16 (recommended; references ADR 12) versus an addendum inside
  ADR 12.
- **U2** Friction in the POC: no (recommended; net force = applied force) versus a μ slider.
- **U3** Newton's second law's primary figure once flagged on: the simulation, with the legacy
  `three_newton_forces` as fallback (recommended), versus offering both.
- **U4** Sliders during a run: locked (recommended) versus live-editable.
- **U5** Include the v–t trace beside the track in the POC: yes (recommended; reuses
  `kinematicsGraphs.pure` geometry) versus defer.
- **U6** Where predictions are authored: on the simulation entry in `PARAMETRIC_SCENES`
  (recommended; production tier) versus in VKR (pedagogical tier; would edit VKR, which is out of
  scope here).
- **U7** Documentation: commit this ADR to `docs/architecture/`, and correct `PROJECT_STATE.md`
  item 7 ("not started"), which is stale because ADR 12 exists.
- **U8** Flag mechanism at G3: a dedicated env var versus an existing visual configuration surface.

## 15. G2 implementation record (2026-09-29, dev-only)

- `useSimulation.ts` (client host: rAF clock feeding the pure reducer, visibilitychange → pause,
  in-memory evidence recorded on transitions only) and `SimulationControls.tsx` (prediction,
  Run/Pause/Step/Reset, reduced-motion time scrubber, readouts, runs table, interpretation).
- `ExplainerFigure.tsx`: when the kind declares a simulation, it draws the simulation frame, hides
  sweep/trace animations (one clock), offers only Explain mode (its challenge modes promise hidden
  values that the readouts show), and locks the sliders while running. It is inert for every other
  kind. It also gains an optional dev-only `onSimulationUpdate` prop.
- Dev-only page `/dev/visual-demo/simulation` (`notFound()` in production, verified 404 against a
  production build), linked from `/dev/visual-demo`.
- `e2e/simulation-newton.spec.ts`: Playwright coverage of the full interaction, zero network
  requests, no browser storage, and evidence held in memory only.
- Defects found in the browser and fixed: the explanation and hint were hidden (hover-only class);
  internal graph ids leaked into the legend; the runs table layout was broken; the host object was
  unstable; and the challenge modes contradicted the readouts.

## 16. G3 implementation record (2026-09-29): one-concept production pilot

- Concept: `phys.mech.newtons-second-law` (KG: "The net force on a body equals the product of its
  mass and acceleration: F = ma"). It is the only concept whose meaning is F = ma itself.
- Binding: the EXISTING `visualRegistry` field. `sceneGenerator: 'newton_second_law'` is added to the
  concept's existing row, and `primary: 'three_newton_forces'` is kept, so the resolver serves the
  simulation at Tier 0 and falls back to the card at Tier 1 (U3). `SceneGeneratorKind` gains the
  kind name as a type only: no keyword route and no extractor.
- U8 resolved by the owner: no flag. Rollback is reverting the one registry line, after which the
  card fallback returns automatically.
- Verified: across every canonical KG concept, only the pilot is served the simulation (unit test
  and browser test); the first law, third law, force and projectile motion are unchanged.
- Defect found on the served path and fixed: after a learner moved a slider, the first click on
  Run could be lost. Blurring the slider collapses its focus-only effect sentence, and at the bottom
  of the scroll the page shortens and the button jumps mid-click. The simulation buttons now keep
  focus on mouse press. The same pattern may affect other ExplainerFigure controls; that is outside
  this ADR.
- Governance ratchets updated with recorded judgment: `visualGeneratorDefaultScope` (the concept
  was judged genuine), `visualSemanticMoat` (physics widened 23 → 24), and
  `visualEngineArchitecture` (the curated-card example moved to the first law).

## 17. Pilot polish record (2026-09-29): Newton as the reference implementation

This pass was a master loop on the ONE pilot concept: audit, fix, test, browser review, deploy,
live review. It covered visuals only. The physics model (a = F/m, v = at, x = ½at², 0.02 s tick,
bounded parameters, no friction, deterministic), the binding, the registry and the fallback are
unchanged. No second concept was bound.

1. **Answer withheld until observed.** At tick 0 no surface states or encodes the acceleration:
   no acceleration arrow (its length is the answer too), no `a =` label, and no F / m in the
   title, narration, "What's happening?", description or goal. The slider guidance no longer
   states the relationship ("…change it, run again, and compare how the block moves"). The
   acceleration appears once the block is moving. Pinned by unit tests over the whole (F, m)
   grid and by a browser test that changes m before Run.
2. **Readable arrows, still true to the physics.** The arrows are drawn free-body style from the
   block. The scales are 0.4 per N, 1 per m/s² and 0.5 per m/s, with thickness 0.16. They stay
   proportional within a run and across runs. Past 8 units an arrow is drawn at the cap and its
   label says "(arrow capped)"; it is never silently shortened.
   - A simulation is now framed for the canvas it is drawn in. The server fits every figure for
     4:3, but a desktop lesson canvas is about 2.4:1, which left the figure under half the width.
   - `cameraDistanceForAspect` (`layout.ts`) brings the camera closer to fit the measured shape.
     It never moves it further away, and the label layer reads the same distance.
   - The distance depends on the fixed box and the canvas, not on the tick, so there is still no
     mid-run re-zoom.
   - It applies to simulations only. Every other figure keeps its framing.
3. **"What's happening?" follows the state.** The panel is authored per frame (start, moving,
   finished, no net force) and equals the step narration, so the two cannot disagree. When paused,
   it states the same t as the readout.
4. **v–t graph labels.** The label budget, which paces a stage walk, is not applied to a
   simulation. The graph now carries t (s), v (m/s), 0, 10 s and 45 m/s.
5. **Canvas/DOM drift.** Cause: the canvas labels live in the separate R3F root and are painted a
   frame after the DOM readouts. Fix: no per-tick value is drawn on the canvas (the `t =` and
   `v =` labels were removed). The DOM readouts are the single live source.
6. **Prediction controls** use a full-contrast choice style. A disabled `.chip` is now visibly
   disabled (opacity 0.4, not-allowed cursor).
7. **Generic chrome suppressed for simulations only.** Hidden while a simulation is active:
   representation chips, stage stepper, "more labels…", result chip, "More insights" and the
   figcaption. Other figures keep them (browser-tested on projectile motion).
8. **Layout.**
   - The value sliders sit inside the experiment block, between the prediction and Run.
   - At ≤ 430 px the header stays one row. Stacking it turned the title block's 200 px flex-basis
     into a 200 px empty band on every figure.
   - Browser-tested at 390 and 1280: no horizontal overflow and controls beside the figure.
9. **Description honesty.** The description claims a v–t line only once one is drawn. The frame-0
   text says the graph is empty and will record the motion.
   - The tutor sees every label on the figure plus the step narrations, through
     `visualSemantics.fromScene` → `buildSemanticsBlock`.
   - The live recheck of the first deploy caught the tutor saying the block "after 10 seconds
     reaches 45 m/s" on an EMPTY graph. It had read the axis-end labels "10 s" and "45 m/s" as a
     data point.
   - Fix: the axis ends are now bare tick numbers (0 / 10 / 45) beside the unit-bearing axis
     names. The apparatus narration states the ranges as ranges and, before the run, says the
     graph stays empty until the experiment runs.
10. **Network assertion.** `e2e/simulationNetwork.ts` allows exactly the app shell's
    `GET /api/auth/session` (same origin, empty query). Everything else is reported as
    unexpected: any other `/api` call, `POST /api/learn/chat`, a query string, or another origin.
    A classifier test and a live negative-control test show the assertion still fails when the
    page calls the tutor or an API.
