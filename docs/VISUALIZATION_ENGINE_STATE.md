# Teaching Visualization Engine — State Snapshot

Handoff document. Factual status only, no pitch. Last updated: 2026-06-22.

Scope: a staged pipeline that decides whether tutor explanation text should
be visualized (Part 1), resolves low-confidence decisions with an LLM
(Part 1.5), generates a `SceneSpec` from text (Part 2 — unverified), and
validates any `SceneSpec` structurally before rendering (validator). Each
part was built and approved as a separate, isolated step.

---

## 1. DONE — Part 1: deterministic decision layer

Given tutor explanation text, decide whether to visualize and which coarse
`SceneType` category, with a confidence score. Pure regex/heuristics, no
LLM, no network.

- **File:** `src/lib/teaching/visualizationDecision.ts`
- **Type:** `VisualizationDecision { shouldVisualize, category, confidence, reasoning, matchedText }`
- **Test harness:** `scripts/test-visualization-decision.ts`
- **Run:** `npx tsx scripts/test-visualization-decision.ts`
- **Result:** 17 passed / 0 failed / 3 documented-limitation (of 20 cases)
- **Commits:** `977da7d` (initial + harness), `e8963f2` (hardened with
  messy/adversarial cases, suppressors added)

## 1.5. DONE — Part 1.5: confidence-gated semantic tie-breaker

For Part 1 decisions with `shouldVisualize === true` and
`confidence < 0.65`, makes one narrow LLM call (via the existing
`generateJSON` in `src/lib/ai/client.ts`) to confirm or override. Never
re-decides from scratch.

- **File:** `src/lib/teaching/visualizationTieBreaker.ts`
- **Type:** `TieBreakResult { resolution: 'confirm'|'override', shouldVisualize, category, rationale }`
- **Threshold:** `CONFIDENCE_THRESHOLD = 0.65`, derived from real Part 1
  harness data (documented in-file).
- **Test harness:** `scripts/test-visualization-tiebreaker.ts`
- **Run:** `npx tsx scripts/test-visualization-tiebreaker.ts`
- **Verified:** gating logic and fallback-to-`confirm` degrade path are
  REAL and confirmed (every eligible case in this dev environment hits a
  live Groq `403 Forbidden` and correctly degrades to `confirm`). The
  actual `isLiteral` semantic judgment quality has NOT been verified — see
  §2, same root cause.
- **Commit:** `e590475`

## Validator: DONE — deterministic SceneSpec structural validator

Given any value (real, LLM-generated, or hand-crafted), checks it against
the real `SceneSpec` schema. Pure, synchronous, no network, never throws.
Independent of whether Part 2 generation is ever proven feasible — needed
by any future SceneSpec producer.

- **File:** `src/lib/teaching/sceneSpecValidator.ts`
- **Function:** `validateSceneSpec(spec: unknown): { valid: boolean; errors: { path, message }[] }`
- **Three layers:** structural (required fields/types/literals), sanity
  (finite numbers, Vec3 shape, coordinate bounds, string-length bounds,
  per-step object-count cap), consistency (per-type geometry presence,
  duplicate ids, degenerate all-identical-coordinates, zero-length
  vector/arrow/bond endpoints).
- **Test harness:** `scripts/test-scenespec-validator.ts`
- **Run:** `npx tsx scripts/test-scenespec-validator.ts`
- **Result:** 20 passed / 0 failed (12 baseline + 8 adversarial/regression)
- **Commits:** `69e03b1` (initial, 12/12), `f201387` (adversarial
  hardening, 20/20)
- **Known deliberate non-check:** does not flag `sceneType` mismatched
  against its own objects (e.g. `plot` with no point/bar objects) — the
  schema marks `sceneType` as advisory-only, never branched on by the
  renderer; that's a semantic-plausibility judgment, out of scope for a
  structural validator.

---

## 2. BUILT BUT UNVERIFIED — Part 2: SceneSpec generation feasibility probe

A throwaway, disposable script — explicitly NOT the production generator —
testing whether an LLM (Groq) can reliably generate a correct `SceneSpec`
from tutor explanation text.

- **File:** `scripts/probe-scenespec-generation.ts`
- **Run:** `npx tsx scripts/probe-scenespec-generation.ts`
- **Commit:** `50952fd`
- **Status:** built, `tsc --noEmit` clean, has **never produced real
  output**. Every run attempt (in this dev environment, on the network
  available throughout this work) returns `403 Forbidden` directly from
  Groq's API. This has been independently confirmed (by the user, across
  multiple test scripts including the Part 1.5 harness and this probe) to
  be a **geo/IP access restriction on the current network** — Groq is
  reachable from India, not from this environment. Not a code defect, not
  a missing/invalid key, not a timeout or rate-limit issue.
- **Net result: the core feasibility question — can an LLM reliably
  generate a correct SceneSpec from real explanation text — remains
  completely unanswered.** No semantic assessment (correct vs.
  structurally-valid-but-wrong vs. invalid) has been performed, because
  there is no real output to assess.

---

## 3. Exact next step the moment Groq is reachable

Run in this order, from a network where `api.groq.com` is reachable:

1. `npx tsx scripts/probe-scenespec-generation.ts` — produces real raw
   `SceneSpec` JSON for each of its 4 cases (1 real narration from
   `sceneSpecExamples.ts`, 3 realistic-but-constructed cases matching
   `detectVisual.ts`'s own proven keyword targets).
2. Pipe each raw result through `validateSceneSpec()` (from
   `src/lib/teaching/sceneSpecValidator.ts`) — this gives an automatic,
   deterministic **structural** pass/fail for free, no manual review
   needed for that half.
   - Note: the probe currently has its own inline, cheaper structural
     check (`!!spec.id && !!spec.title && ...`). Swapping that one line
     for `validateSceneSpec(raw)` is a ~2-line edit and should be done as
     part of this run so the structural check is the same one used
     everywhere else, not a separate ad hoc check.
3. Do a **manual semantic read** only on the cases that pass structural
   validation — does the geometry actually represent correct physics /
   geometry / chemistry (right object count, sane positions, plausible
   trajectory), or is it confidently-wrong (structurally valid but
   semantically false — the single most important failure mode to catch,
   per explicit prior instruction)?
4. Report honestly per-case: structurally-valid-and-correct vs.
   structurally-valid-but-semantically-wrong vs. structurally-invalid. A
   single instance of the "wrong but confident" case should dominate the
   report and the recommendation on whether to proceed to a real Part 2
   generator at all.

---

## 4. Known v1 limitations (Part 1, carried forward for the future tie-breaker)

Documented in `visualizationDecision.ts` and the Part 1 harness
(`scripts/test-visualization-decision.ts`), confirmed via real harness
runs:

1. **"versus" as a proper noun** (e.g. "Roe versus Wade") is matched as a
   `comparison` signal. Pure regex cannot distinguish a real comparison
   from a proper noun. Confidence lands at 0.61 — within Part 1.5's
   tie-breaker gate, so it CAN be resolved once Part 1.5's semantic
   judgment is verified (currently blocked, see §2).
2. **"as X increases, Y increases" about feelings/abstract states**, not a
   quantitative relationship (e.g. confidence/motivation increasing as
   students get comfortable), is matched as a `plot` signal. Same
   confidence band (0.61), same tie-breaker-gate fix path, same
   verification blocker.
3. **References to an already-shown visual** (e.g. "remember the diagram
   I showed you before...") score high confidence (0.82) because the
   regex match looks like a strong, correct diagram signal. This is
   explicitly OUT OF SCOPE for Part 1.5 — it is a **session-state**
   problem, not a confidence-resolvable semantic ambiguity. No amount of
   re-asking the model about isolated text can answer it; it requires
   passing session/conversation history into a future Part 2 (or a new
   step), not a tie-breaker fix.

---

## 5. Production wiring status — explicit

**Part 1, Part 1.5, the Part 2 probe, and the validator described above are
still NOT imported or reachable from any production code path.** Verified
by search: none of `visualizationDecision.ts`, `visualizationTieBreaker.ts`,
`sceneSpecValidator.ts`, or `probe-scenespec-generation.ts` is referenced
anywhere under `src/app`. This is intentional, staged work — each part was
built standalone, tested in isolation, and explicitly approved one step at
a time before moving to the next, with no wiring into the live lesson/chat
flow at any point.

**This is now distinct from a separate, later, fully-wired system —
`sceneRouter.ts` + `generateRoutedScene()`.** That system (15 parametric
generators: projectile/triangle/molecule/vector/circular/pendulum/electron
shells/lattice/collision/ray_optics/historical_timeline/economics_curves/
calculus_graph/civics_org_chart/electric_circuit — see
`src/lib/teaching/sceneGenerators/sceneRouter.ts`) **IS wired into and
reachable from production**, gated behind
`ENABLE_PARAMETRIC_SCENE_GENERATION=true` (the default in `.env.example`).
The interception point is `src/app/api/learn/chat/route.ts` lines
1234-1248:

```ts
if (!detectedVisualSpec && !detectedSceneSpec && isParametricSceneGenerationEnabled()) {
  try {
    detectedSceneSpec = await generateRoutedScene(cleanText)
  } catch { /* non-fatal */ }
}
```

It runs third in the detection pipeline (after the 2D `planVisualTeaching()`
check and the older `buildSceneSpec()` 3D detector, before the oldest
free-form `generateSceneSpec()` generator), and only when nothing earlier
in the chain already matched. The fallback chain is silent end-to-end: if
`routeSceneGenerator()` finds no keyword match, or any generator's
extract/build/validate step fails, `generateRoutedScene()` resolves to
`null` (never throws — wrapped in `try/catch` here too) and the pipeline
falls through unchanged to the next, older generator. Flag-off behavior is
identical to before this system existed.

**Also distinct from both of the above:** the live chat route also
imports and calls a third, separate, pre-existing detector, `buildSceneSpec()`
from `src/lib/teaching/buildSceneSpec.ts` (added in commit `0e212a8`, before
this body of work began). That detector is a different, simpler,
deterministic keyword-based system (mirroring the existing 2D `VisualSpec`
detection pattern) that renders 3D vector/molecule scenes in `LessonScreen`.
It runs before `generateRoutedScene()` in the pipeline and is unaffected by
it. Do not conflate the three: `buildSceneSpec.ts` and
`sceneRouter.ts`/`generateRoutedScene()` are both live production code;
Part 1, Part 1.5, the Part 2 probe, and the validator above remain
standalone and unwired.

---

## Quick reference — all commits this engine

| Commit | What |
|---|---|
| `977da7d` | Part 1 decision layer + harness |
| `e8963f2` | Part 1 hardened with messy/adversarial cases |
| `e590475` | Part 1.5 tie-breaker |
| `50952fd` | Part 2 feasibility probe (unverified) |
| `69e03b1` | SceneSpec validator + harness (12/12) |
| `f201387` | Validator adversarial hardening (20/20) |

All on branch `claude/my-tutor-foundation-KDSUO`.

### Separate system: `sceneRouter.ts` / `generateRoutedScene()` (production-wired)

Not part of the Part 1/1.5/probe/validator pipeline above. Listed here for
completeness since it shares the "scene generation" name and this doc was
previously read as covering all scene-generation work.

| Commit | What |
|---|---|
| `3d937e1` | Wire the first 9 parametric scene generators into the chat route, flag-gated |
| `d08e88a` | Document `ENABLE_PARAMETRIC_SCENE_GENERATION` as a dev-only smoke-test flag |
| `6463d1c` | Enable parametric scene generation in production (`=true`) |
| (+6 more) | Added ray_optics, historical_timeline, economics_curves, calculus_graph, civics_org_chart, electric_circuit — grew 9 → 15 generators |

All on branch `claude/my-tutor-foundation-KDSUO`.
