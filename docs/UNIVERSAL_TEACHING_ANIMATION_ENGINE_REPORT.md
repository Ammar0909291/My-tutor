# Universal Teaching Animation Engine — Final Report

Synthesis of `docs/UNIVERSAL_TEACHING_ANIMATION_ENGINE_AUDIT.md`. Assesses how close the platform is
to the long-term objective:

```
Concept → Teaching Goal → Teaching Strategy → Generated Teaching Action → Learning Outcome
```

Read-only — no code modified.

## 1. Current architecture assessment

The platform is a **mature library of parameterized animations**, not yet a **generator**. Six
subjects (Quantum, Classical Mechanics, Chemistry, Mathematics, Computer Science, Data Science) are
built on one shared substrate:

- **Rendering substrate (strong):** `ThreeDVisual` host + 3 generic primitives (`Vector3D`,
  `MolecularNode3D`, `Bond3D`) + inline `boxGeometry` express all 35 Foundation visuals; the two
  newest subjects needed **zero** new primitives.
- **Narration/playback substrate (strong):** narration is **generated from tutor explanation text**
  (`extractNarrationSegments`) and aligned to reveal steps by a playback engine with **zero
  `VisualType` branching** — fully generic over an integer `stepCount`.
- **Selection/dispatch substrate (weak/hardcoded):** `detectVisual()` keyword tables → a closed
  `VisualType` enum → a hand-written `VisualCard` switch → one bespoke component per concept.

The expensive, reusable half (primitives + narration + playback + mastery) is built. The missing
half is the **generative band**: a declarative scene description and a generic interpreter.

## 2. Hardcoded vs generated percentage

- **Pipeline decision points:** ≈ **70% hardcoded / 30% generated**. Hardcoded: keyword detection
  tables, subject gate, `VisualType` enum, `VisualCard` switch + imports, `VISUAL_STEP_COUNTS`
  (uniformly `5`), `VISUAL_META`, and every Foundation scene's constants. Generated: narration
  segments (from text), playback timing (from segment count), and Interactive scenes (from params).
- **Visual components:** **35 hardcoded demos (≈60%) / 24 parameterized (≈40%)**. Every Foundation
  visual is a hardcoded demo; every Interactive visual is genuinely parameterized
  (`scene = useMemo(fn(params))`).

## 3. Strongest reusable systems

1. **Narration + playback** (`extractNarrationSegments`, `synchronizedPlayback`, `narrationProgress`)
   — already generated, already generic over `stepCount`, zero per-visual coupling.
2. **The 3-primitive vocabulary + `ThreeDVisual` host** — proven to cover 6 subjects with no
   per-subject primitives.
3. **`SimulationControlPanel` + `GuidedSimulationMode` + `useControlMastery`** — generic control,
   guidance, and mastery layers reused unchanged across every Interactive subject.

## 4. Missing capabilities

1. A **SceneSpec schema** — a declarative type describing a scene (nodes, arrows, bars, curves,
   reveal steps) independent of any React component.
2. A **generic SceneSpec interpreter** — one `<SceneSpecRenderer spec>` that walks a spec and emits
   the existing primitives.
3. A **concept→spec mapping** — replacing/augmenting keyword `detectVisual` with a layer that emits a
   parameterized spec.
4. A **strategy→visual link** — wiring `teachingStrategy.ts` to emit a SceneSpec (Teaching Action)
   rather than a coarse engine bucket.
5. **Variant support** — level / misconception / objective fields that change which reveal steps
   render.
6. **Registry-driven dispatch** — replacing the closed enum + switch so generated visuals need no
   enum edit.

## 5. Largest blockers

1. **Closed `VisualType` enum + hand-written `VisualCard` switch** (one component per concept) — the
   structural reason new visuals require code, not data.
2. **No SceneSpec abstraction** — nothing to generate *into*.
3. **`detectVisual()` is keyword→enum, not concept→spec** — selection is lookup, not description.

Note: blockers 1–3 are all in the **selection/description/dispatch** band; the primitive, narration,
playback, and mastery bands are already generic and are *not* blockers.

## 6. Fastest path toward Concept → Generated Visualization

A spike that reuses everything already generic and changes nothing existing:

1. Define a **`SceneSpec`** type: `{ steps: SceneStep[] }`, where each step lists primitive
   instances (`{ kind: 'node'|'arrow'|'bar'|'curve'|'label', ...props }`).
2. Build **one `SceneSpecRenderer({ spec, revealStep })`** that maps spec entries to the existing
   `Vector3D` / `MolecularNode3D` / `Bond3D` / `boxGeometry` / `Html`, gated by `revealStep`
   exactly like every Foundation component.
3. Compute `stepCount = spec.steps.length` and feed it to the **unchanged** narration/playback
   engine.
4. Prove it by **re-expressing 1–2 existing Foundation visuals as specs** (e.g. `MachineLearningPipeline3D`
   — already a stage array — and `Correlation3D`), rendered through the new generic renderer
   side-by-side with the originals.

This delivers the full `spec → generated scene → generated narration → playback` loop without
touching `detectVisual`, the enum, or any existing component — additive and low-risk.

## 7. Recommended roadmap

1. **SceneSpec schema + generic renderer (spike)** — the path in §6.
2. **Registry-driven dispatch** — replace `VisualCard`'s switch + `VISUAL_STEP_COUNTS` with a
   registry; let a spec-typed entry render through `SceneSpecRenderer`; compute `stepCount` from the
   spec. (Also resolves the High-severity scalability debt from the Universal 3D audit.)
3. **Concept→Spec mapping** — extend `teachingStrategy.ts` to emit a `SceneSpec` (the Teaching
   Action), unifying the strategy track with the visual track.
4. **Variant support** — add `level` / `misconception` / `objective` to the spec; emit different
   reveal scripts; route runtime `MistakeRecord` misconceptions into spec selection.
5. **Closed-loop adaptation** — feed mastery signals back into strategy selection.

## What should be built next?

**A. Immediate next sprint — "Scene Specification Schema & Generic Renderer (spike)."**
Define the `SceneSpec` type and a single `SceneSpecRenderer` that interprets it through the existing
primitives, and prove it by reproducing 1–2 existing Foundation visuals from specs — rendered through
the unchanged `ThreeDVisual` + narration + playback. Purely additive; no existing visual, enum, or
`detectVisual` rule is modified. This converts the platform's biggest gap (no thing to generate into)
into a working, demonstrable primitive with the least risk, because every layer *below* the spec is
already generic.

**B. Next 3 recommended sprints:**
1. **Registry-driven dispatch** — replace the `VisualType` switch/enum with a registry so spec-driven
   visuals need no enum edit and `stepCount` comes from the spec (also clears the long-standing
   `VisualCard`/`VisualDemo` scalability debt).
2. **Concept→Spec mapping layer** — extend `teachingStrategy.ts` to emit a `SceneSpec` as its
   Teaching Action, wiring the existing strategy engine to the new renderer (closing the
   "Teaching Action → Generated Visualization" gap from Task 6).
3. **Spec variants (level / misconception)** — add variant fields to the spec and route runtime
   `MistakeRecord` misconceptions + learner level into which reveal script renders (Task 7), reusing
   the unchanged playback engine.

**C. Long-term Teaching Action Engine roadmap:**
```
Misconception / Learner Signal
   ↓  (teachingStrategy — extended)
Teaching Goal
   ↓
Teaching Action  = SceneSpec  (parameterized, level/misconception-aware)
   ↓  (SceneSpecRenderer — new, generic, over existing primitives)
Generated Visualization
   ↓  (narration + playback — UNCHANGED, already generic)
Generated Narration & Reveal
   ↓  (useControlMastery — UNCHANGED)
Learning Outcome / Mastery Signal
   └────────────── feedback ──────────────┘
```
The end state reuses the entire current rendering/narration/playback/mastery substrate unchanged and
adds only the generative band (spec schema, interpreter, concept→spec mapping, variants, feedback).
The platform is roughly **half-way** there: the hard, reusable rendering half exists; the generative
half is the remaining work, and it is unblocked by the strength of the layers beneath it.

## Validation

```
npx tsc --noEmit   → exit 0, ZERO errors (read-only audit; no source modified)
```

No source files were modified in this sprint; only the two audit documents were added.
