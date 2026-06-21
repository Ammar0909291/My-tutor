# Universal 3D Engine — Consolidation Audit

Read-only architectural audit of every 3D-related system, performed before considering a
Computer Science subject. No code was modified.

## Task 1 — Universal 3D inventory

**Core (3 files, ~390 lines):**
- `ThreeDVisual.tsx` (84 lines) — the single shared scene host. Owns: `<Canvas dpr={[1,2]}>`,
  ambient + two directional lights, `OrbitControls` (no-pan, autorotate gated by
  `prefers-reduced-motion`), a `role="img"` wrapper div (`aspectRatio: 4/3`, `maxHeight: 360`,
  `touchAction: 'none'`). Accepts `children`, `revealStep` (passthrough only — not consumed here),
  `ariaLabel`, `cameraDistance`, `enableControls`. Every one of the 44 Foundation/Interactive
  components renders through this one file — zero duplication of camera/lighting/canvas setup.
- `ParticleSystem3D.tsx` (155 lines) — a generic reusable particle-cloud engine (positions,
  motion, proximity interaction, highlighted particle). Built in the 3D Educational Engine
  Foundation Sprint but **not consumed by any of the four subjects' Foundation components** — each
  subject built its own bespoke particle/sphere arrays inline instead (see Task 2).
- `ThreeDEngineStub.tsx` (46 lines) — `WaveSimulation3D`/`FieldVisualization3D`/
  `StructureVisualization3D`, three near-identical placeholder surfaces registered as
  `VisualType`s but never produced by `detectVisual()` for any subject — dead weight in the
  dispatch surface.

**Primitives (4 files, ~? lines):**
- `Vector3D.tsx` (79 lines) — labeled arrow (quaternion-aligned cylinder shaft + cone head +
  `Html` label). Subject-independent by design; reused directly by Mechanics, Mathematics
  (`CoordinateSystem3D`, `VectorVisualization3D`, `SurfaceVisualization3D` axes), and indirectly
  referenced in interactive Mathematics components.
- `ForceArrow3D.tsx` (42 lines) — a near-duplicate of `Vector3D` predating it (Quantum/Mechanics
  era), narrower props, same shaft+cone-head shape. Used only by `NewtonForces3D`/
  `NewtonForcesInteractive3D`. Functionally redundant with `Vector3D`.
- `MolecularNode3D.tsx` / `Bond3D.tsx` — labeled-sphere and multi-strand-cylinder primitives from
  the Chemistry sprint. `MolecularNode3D` is reused outside Chemistry (Mathematics'
  `CoordinateSystem3D`/`CoordinateSystemInteractive3D`); `Bond3D` is Chemistry-only so far.

**Framework:**
- `VisualCard.tsx` — single dispatcher: `VISUAL_STEP_COUNTS` (all values hardcoded to `5`) +
  one large `switch` (now ~40 cases) on `VisualType`, importing every Foundation component
  directly (no lazy-loading/code-splitting — see Task 4/9).
- `visualTypes.ts` — one large `VisualType` union (~45 members) + `VISUAL_META` + `VISUAL_SUBJECTS`
  allowlist. Purely additive growth, no structural change across 4 subjects.
- `detectVisual.ts` — one keyword-rule table per subject's 3D set
  (`QUANTUM_3D_RULES`/`MECHANICS_3D_RULES`/`CHEMISTRY_3D_RULES`/`MATHEMATICS_3D_RULES`), each
  checked first under its `subjectSlug` branch with the subject's 2D rules as fallback — a
  hand-copied 5-rule-table-per-subject pattern (see Task 2).
- Narration: `synchronizedPlayback.ts` + `narrationProgress.ts` + `useTeachingPlayback` — fully
  generic over `stepCount`, zero `VisualType` branching, confirmed unaffected by all 4 subjects.
- `VisualPlaybackControls.tsx` — generic Play/Pause/Replay/speed UI, subject-agnostic.
- `GuidedSimulationMode.tsx` — generic step-through wrapper (local 1-indexed `revealStep`-style
  state), `steps: GuidedStep[]` supplied per-call-site in `VisualDemo.tsx` (not co-located with
  the components it wraps — see Task 2/9).
- `SimulationControlPanel.tsx` — generic slider/toggle/dropdown/reset panel, fully reused.
- `visualMastery.ts` — `createMasteryEmitter()` factory; every one of 19 Interactive components
  calls it with the same `visualType: 'quantum_interactive'` literal (a single catch-all bucket,
  not subject-named) and a unique `defaultConcept` string (19 distinct concepts found).

**Subjects:** Quantum Physics (5 Foundation + 4 Interactive), Classical Mechanics (5 + 5),
Chemistry (5 + 5), Mathematics (5 + 5). 72 `.tsx` files total under
`src/components/school/visuals/`; combined `*3D.tsx` (Foundation) line count alone is ~4,331
lines (Interactive files add roughly a comparable amount on top, unmeasured precisely but visibly
similar per-file size ~80–130 lines × 19 files).

## Task 2 — Duplicate code audit

| Duplication | Locations | Severity | Worth consolidating? |
|---|---|---|---|
| Camera/lighting/canvas setup | None — fully centralized in `ThreeDVisual.tsx` | N/A | Already solved |
| `Scene`-gated-by-`revealStep` shape | Repeated by hand in all 20 Foundation components (`showX = revealStep >= n` boolean chains) | Low | Worth a thin `useRevealSteps(revealStep, n)` helper, but each component's gating logic differs enough (some hide-on-next-step, some additive) that a generic hook would only save ~5 lines/file |
| Comparison-row layout (`ROW_POS` + final comparison `Html` caption) | `GeometricSolids3D.tsx`, `Transformations3D.tsx` (near-identical `ROW_POS` array + `compare` boolean + caption `Html`) | Medium | Worth extracting a `ComparisonRow` helper — these two files are close to copy-pasted |
| Arrow/vector primitive | `Vector3D.tsx` vs `ForceArrow3D.tsx` — same quaternion-cylinder-cone technique, two separate implementations | Medium | `ForceArrow3D` should be retired in favor of `Vector3D` (already proven generic); only `NewtonForces3D`/`NewtonForcesInteractive3D` block this |
| Custom-surface mesh generation (`PlaneGeometry` vertex manipulation: `pos.setZ(i, fn(x,y))` → `needsUpdate` → `computeVertexNormals()`) | `SurfaceVisualization3D.tsx` and `SurfaceVisualizationInteractive3D.tsx` (literal copy of the technique, `heightFn` only varies) | Low | Self-contained to one subject so far; worth a `buildHeightFieldGeometry(fn, size, segments)` helper only once a second subject needs custom surfaces |
| Per-subject 3D keyword-rule tables in `detectVisual.ts` | `QUANTUM_3D_RULES`/`MECHANICS_3D_RULES`/`CHEMISTRY_3D_RULES`/`MATHEMATICS_3D_RULES` — identical shape (`MatchRule[]`), identical two-tier `matchRules(3D) ?? matchRules(2D)` call wrapped in an `if (subjectSlug === ...)` block, copy-pasted per subject | Medium | The *pattern* (not the data) is now copy-pasted 4 times; worth a `registerSubject3DRules(slug, rules3d, rules2d)` table-driven dispatcher before a 5th/6th subject, to stop the `if` chain from growing linearly |
| Mastery-emission wiring (`useMemo(() => new Set(), [])` touched-set + `handleChange` curry + `createMasteryEmitter` call) | Identical 6–8 line block repeated in all 19 Interactive components | Medium-High | Highest-value extraction candidate — a `useControlMastery(emit, threshold)` hook would remove ~150 lines of copy-pasted boilerplate across the codebase with zero behavior change |
| `GuidedSimulationMode` step scripts | Defined inline at each `VisualDemo.tsx` call site (19 separate 3-step arrays, ~600 lines total in one file) | Medium | Not duplicated logic, but a single 1,284-line dev-demo file is itself a maintainability concern (see Task 9) |

No code was modified to address any of the above — recommendations only.

## Task 3 — Reusable primitives audit

| Primitive | Status | Future subjects it could support (estimate) |
|---|---|---|
| `Vector3D` | Already reusable | Any subject needing arrows: Electromagnetism (E/B field vectors), Astrophysics (velocity/orbital vectors), Data Science (gradient vectors) — 4–6+ |
| `MolecularNode3D` (generic labeled sphere) | Already reusable (proven by Mathematics' point-marking use) | Any subject needing a labeled node/point: Computer Science (graph nodes), Data Science (data points/clusters), Astrophysics (celestial bodies) — 4–6+ |
| `Bond3D` (multi-strand cylinder) | Potentially reusable | Computer Science (graph edges, weighted by strand count), Data Science (network connections) — 2–3, needs a generic rename/relabel (not chemistry-specific code, just chemistry-specific naming) |
| `ThreeDVisual` host | Already universal | All future subjects — this is the floor every subject sits on |
| `SimulationControlPanel` / `GuidedSimulationMode` / `createMasteryEmitter` | Already universal | All future subjects |
| Comparison-row pattern (cube/sphere/cylinder/cone-style side-by-side) | Potentially reusable | Computer Science (sorting algorithm comparison), Data Science (distribution comparison) — 2–3, not yet extracted into a primitive |
| Custom surface/height-field mesh builder | Potentially reusable | Data Science (loss surfaces, 3D scatter), AI (decision boundary surfaces) — 2–3, not yet extracted |
| `ParticleSystem3D` | Subject-specific (orphaned) | Built generically but zero subjects actually use it — every subject hand-rolled its own particle code instead (see Task 2). Either adopt it going forward or remove it as dead code |
| `ForceArrow3D` | Subject-specific (legacy duplicate) | Superseded by `Vector3D`; no future value, retire-candidate |
| Atomic/orbital/shell-specific meshes (torus shells, nucleus offset spirals) | Subject-specific | Chemistry/Quantum only — not generically reusable |

## Task 4 — Performance audit (no optimization performed)

- **Geometry counts:** mostly low-poly (`sphereGeometry args={[r, 24, 24]}` style, cylinder/cone
  at 12–24 radial segments) — fine for desktop, untested for low-end mobile GPUs at scale.
- **Particle/vertex counts:** small per-component (`Array.from({length: 6})` to `{length: 65}`
  for `BlochSphere3D`'s equator points; `SurfaceVisualization3D`'s `PlaneGeometry` at
  `SEGMENTS=24` → 625 vertices, recomputed in a `useMemo` keyed on inputs — acceptable, but the
  Interactive surface variant rebuilds the full geometry (`new PlaneGeometry(...)` + per-vertex
  loop) on every dropdown change with no debouncing).
- **Animation loops (`useFrame`):** found in 13 files. Each is independent — every visual that
  animates runs its own `useFrame` callback; with `VisualDemo.tsx` rendering ~40+ visuals
  simultaneously on one page (dev-only), this is a real CPU multiplier, though production lessons
  only ever render one `VisualCard` at a time so this is a dev-demo-only risk in practice.
  `OrbitControls`' `autoRotate` itself also runs a `useFrame`-equivalent internally per instance.
- **React re-render risk:** every Interactive component's `controls: SimulationControl[]` array
  is reconstructed on every render (new array literal each render) and passed to
  `SimulationControlPanel` — not memoized. Low risk at current scale (small component trees) but
  would compound if a future subject adds a per-frame-updating control array.
- **CPU risk:** the per-Interactive `touched` Set is created via `useMemo(() => new Set(), [])`
  (correctly memoized, stable identity) — no leak.
- **GPU risk:** `dpr={[1, 2]}` is set platform-wide in `ThreeDVisual.tsx` (good — caps device
  pixel ratio at 2 universally), but no per-component complexity budget exists; a future subject
  could add a high-poly mesh with no governance.
- **Memory risk:** none observed — no growing arrays, no uncle­aned listeners beyond the
  `matchMedia` listener in `ThreeDVisual.tsx` (correctly cleaned up in its `useEffect` return).

## Task 5 — Mobile readiness audit (no fixes performed)

- **Touch controls:** `touchAction: 'none'` is set on the wrapper div (prevents page-scroll
  hijack during orbit-drag) and `OrbitControls` handles touch natively via drei/three — no custom
  touch code, relying entirely on the library default. Untested on this audit for gesture
  conflicts inside a scrollable lesson page.
- **DPR handling:** capped at `[1, 2]` uniformly — reasonable mobile-safe default, applied once
  in `ThreeDVisual.tsx` so every subject inherits it automatically.
- **Canvas sizing:** `aspectRatio: '4 / 3'` + `maxHeight: 360` + `width: 100%` — responsive by
  CSS, no JS-driven resize observer; should behave correctly across viewport widths but was not
  visually verified on a real device in this audit (read-only).
- **Responsiveness:** card-level layout (`VisualCard`) uses a `maxWidth: 360` card; the dev demo's
  grid (`repeat(auto-fill, minmax(300-320px, 1fr))`) reflows correctly at narrow widths in markup
  but again unverified live.
- **Battery concerns:** `autoRotate` (continuous re-render via `useFrame` inside `OrbitControls`)
  runs by default whenever `prefers-reduced-motion` is not set — on a lesson page with one visual
  this is a small, continuous animation loop for as long as the card is mounted; acceptable for one
  visual, but `VisualDemo.tsx` mounting 40+ simultaneously is a real (dev-only) battery/CPU
  concern, not a production one.

## Task 6 — Narration and playback audit

- **revealStep architecture:** every Foundation component takes a single `revealStep: number` and
  derives boolean gates — this scales linearly with code volume (each subject adds N files) but
  not with *architectural* complexity; `VisualCard`'s `switch` statement is the only place that
  grows per visual type added.
- **`synchronizedPlayback.ts`/`narrationProgress.ts`:** operate purely on `stepCount` (an integer)
  and segment-progress state — confirmed to have zero knowledge of `VisualType`. This scales to
  any number of subjects/visuals without modification; the only per-visual data this layer needs
  is the single integer in `VISUAL_STEP_COUNTS`.
- **`VisualPlaybackControls`:** purely generic UI, scales without change.
- **Scalability for 50/100/500+ visuals:** the playback/narration layer itself scales fine (O(1)
  per visual — just a `VISUAL_STEP_COUNTS` entry). The actual scaling risk is concentrated
  entirely in `VisualCard.tsx`'s hand-written `switch`/import list and `visualTypes.ts`'s hand
  -written union/`VISUAL_META` object — both grow linearly and require a manual edit per new
  visual. At 500+ visuals this becomes a very large switch statement and a very large bundle
  (every Foundation/Interactive component is statically imported into `VisualCard.tsx` with no
  code-splitting — see Task 9) — a real future risk, not yet a problem at the current ~45 types.

## Task 7 — Visual mastery audit

- **`createMasteryEmitter`:** a pure factory, no React/DOM dependency, called once per Interactive
  component render. Confirmed all 19 Interactive components pass the same literal
  `visualType: 'quantum_interactive'` — a single generic "3D interactive" bucket shared across all
  four subjects (not subject-named), with subject differentiation carried only by the free-text
  `defaultConcept`/`masteryContext.concept` string (19 distinct concept strings found, one per
  component).
- **Scalability:** the architecture scales fine mechanically (the emitter is a stateless factory;
  adding a 20th, 50th, 200th component just adds another `defaultConcept` string) — but the
  *analytics* value of a single `'quantum_interactive'` bucket degrades as subject count grows:
  any dashboard reading `summarizeVisualMastery()` by `visualType` cannot currently distinguish
  Mathematics interactions from Quantum interactions without parsing the free-text `concept`
  string, since `VisualMasteryEngine` (the type `visualType` is drawn from) was never extended
  with subject-specific buckets.
  - This was a deliberate, repeated constraint across every Interactive Layer sprint ("no new
    engine type"), so it is **not a defect**, but it is worth flagging as a forward-looking
    abstraction gap before a 5th/6th subject: a future sprint may want a `subjectSlug`-based
    aggregation view over the existing `concept`/`context.subjectSlug` fields (both of which
    already exist on `VisualMasterySignal` and are already populated correctly by every component)
    rather than inventing new engine types.
- **No implementation performed** — this is a forward-looking observation only.

## Task 8 — Subject expansion readiness

| Subject | New primitives needed | Reusable today | Difficulty | Educational impact |
|---|---|---|---|---|
| Computer Science | Graph/tree node-and-edge renderer (extend `MolecularNode3D`+`Bond3D` generically), array/stack/queue bar visualizer, sorting-comparison row (extend the cube/sphere/cylinder/cone comparison-row pattern) | `ThreeDVisual`, `MolecularNode3D` (as graph node), `Bond3D` (as edge), `Vector3D` (pointer arrows), full framework/narration/mastery stack | Low–Medium — mostly new Scene compositions over existing primitives | High — algorithms/data-structures visualization is a well-established high-value 3D use case |
| Data Science | Scatter-point cloud (extend `ParticleSystem3D` — finally giving it a real consumer), height-field/surface builder (extend `SurfaceVisualization3D`'s technique), distribution/histogram bars | `ThreeDVisual`, `ParticleSystem3D`, the surface height-field technique, `Vector3D` (gradient arrows) | Medium — statistical concepts (regression planes, clustering) need new derived-geometry logic | High |
| Artificial Intelligence | Neural-network layer/node renderer (extends graph-node pattern from CS), decision-boundary surface (reuses Data Science's surface builder) | Same as CS/Data Science once those exist — high primitive reuse if built after CS/Data Science | Medium — best sequenced *after* CS and Data Science to inherit their primitives | High |
| Electromagnetism | Field-line renderer (new — distinct from a single `Vector3D`, needs many curved lines), charge sphere (reuses `MolecularNode3D`) | `ThreeDVisual`, `Vector3D` (field vectors at a point), `MolecularNode3D` (charges) | Medium — field-line curve geometry is new, everything else reuses existing primitives | High — strong existing Physics-track precedent (Quantum/Mechanics already live) |
| Relativity | Spacetime-grid distortion mesh (reuses the `SurfaceVisualization3D` height-field technique directly — a warped grid is the same primitive as a paraboloid), light-cone wireframe (new) | `ThreeDVisual`, the surface/height-field builder, `Vector3D` | Medium — the core "warped grid" visual is nearly free given the existing surface code | Medium-High — conceptually rich but narrower curriculum footprint than EM |
| Astrophysics | Orbit-path renderer (reuses `Vector3D`/trajectory-tracing technique from `ProjectileMotion3D`), celestial-body sphere (reuses `MolecularNode3D`) | `ThreeDVisual`, `MolecularNode3D`, the trajectory-path technique already proven in Classical Mechanics | Low — closest fit to existing Mechanics patterns of any subject on this list | Medium-High |

**Recommended build order:** Electromagnetism or Astrophysics first (lowest new-primitive cost,
direct extension of the existing Physics-track primitives already proven in Mechanics/Quantum),
then Computer Science (unlocks the graph/node-edge primitive needed by AI later), then Data
Science (gives `ParticleSystem3D` its first real consumer, unlocks the surface/height-field
primitive for Relativity), then AI (reuses CS + Data Science primitives), then Relativity (nearly
free given the surface builder), with Astrophysics absorbed earlier or folded alongside
Electromagnetism since both reuse Mechanics-era primitives most directly.

## Task 9 — Technical debt report

**Critical:** none found. No correctness bugs, no broken contracts, no security issues identified
in this audit.

**High:**
- `VisualCard.tsx`'s manually-maintained `switch`/static-import list will not scale gracefully
  past the next 1–2 subjects without a registry-driven refactor (Task 6 finding) — *future
  concern*, not urgent today at ~45 types.
- Mastery-emission boilerplate (`touched` Set + curried `handleChange` + `createMasteryEmitter`
  call) is copy-pasted in all 19 Interactive components — *immediate concern*, cheap to fix later,
  zero behavior risk, pure maintainability debt.

**Medium:**
- `ForceArrow3D` is a redundant, narrower duplicate of `Vector3D` used by only one subject —
  *immediate concern*, low-risk retirement candidate.
- `ParticleSystem3D` is unused dead-weight (built generically, never adopted) — *immediate
  concern*, either adopt for Data Science or mark explicitly as unused.
- `ThreeDEngineStub.tsx`'s three placeholder `VisualType`s are registered but never reachable from
  `detectVisual()` for any subject — *immediate concern*, dead surface area in the dispatch table.
- `detectVisual.ts`'s per-subject 3D-rule-table pattern is hand-copied 4 times — *future concern*,
  worth a table-driven dispatcher before subject 5 or 6.
- `VisualDemo.tsx` has grown to 1,284 lines covering all 4 subjects' Foundation + Interactive demo
  sections in one file — *future concern*, worth splitting per-subject before more subjects are
  added, purely for developer navigability (no runtime impact).
- The `quantum_interactive` single mastery bucket loses subject granularity at the
  `VisualMasteryEngine` type level — *future concern*, addressable via existing `concept`/
  `subjectSlug` fields without inventing new engine types.

**Low:**
- Comparison-row pattern duplicated between `GeometricSolids3D.tsx`/`Transformations3D.tsx` —
  *future concern*, cosmetic-level duplication, cheap to extract once a 3rd consumer appears.
- Custom-surface-geometry technique duplicated between `SurfaceVisualization3D.tsx`/
  `SurfaceVisualizationInteractive3D.tsx` — *future concern*, same as above.
- `controls: SimulationControl[]` arrays rebuilt every render in Interactive components — *future
  concern*, negligible at current scale.

## Verdict

The Universal 3D Engine's foundational layers (`ThreeDVisual`, narration/playback,
`SimulationControlPanel`, `GuidedSimulationMode`, `createMasteryEmitter`) have held up across four
subjects with zero structural modification — strong evidence the core architecture is sound.
Accumulated debt is concentrated in three places: (1) per-subject boilerplate that was
deliberately hand-copied rather than abstracted (mastery-emission wiring, detectVisual rule-table
registration), (2) two genuinely unused/redundant pieces (`ParticleSystem3D`, `ForceArrow3D`,
`ThreeDEngineStub`'s placeholder types), and (3) one growing single-file bottleneck
(`VisualCard.tsx`'s switch + `VisualDemo.tsx`'s length). None of these are urgent at the current
scale (4 subjects, ~45 visual types); all are addressable later without redesigning anything load
-bearing. See the companion `docs/UNIVERSAL_3D_ENGINE_CONSOLIDATION_REPORT.md` for the ranked
roadmap recommendation.
