# Quantum Physics — Visual Mastery Integration Audit (Task 1)

**Status: audit only.** Maps the existing Visual Mastery architecture and the additive registration
points for quantum mastery challenges.

## 1. Two separate visual subsystems (confirmed)

- **`VisualType`/`VisualCard`** (`src/lib/school/visuals/`, `src/components/school/visuals/`) — the
  9 production quantum **teaching** visuals (double_slit, wave_function, …). No challenge/correctness
  concept; pure step-revealed diagrams.
- **`VisualSpec`/`VisualRenderer`** (`src/lib/visuals/`, `src/components/visuals/`) — the **interactive
  mastery challenge** subsystem (`graph`, `number_line`, `geometry`, `process_flow`), each with a
  `challenge` object, live correctness checking, and `VisualMasterySignal` emission.

These are independent and do not share renderers. Quantum mastery integration must **bridge** them —
render the existing `VisualCard` diagram, attach a challenge, and emit signals through the existing
mastery contract — without merging or redesigning either subsystem.

## 2. Visual Mastery signal/persistence pipeline (reusable as-is)

```
renderer's challenge interaction
  → createMasteryEmitter({ visualType, defaultConcept, context, onMasteryEvent })  (visualMastery.ts)
  → VisualMasterySignal { concept, visualType, shown, interacted, challengeAttempted, challengeCompleted, ... }
  → useVisualMastery().recordMasteryEvent  (dedup'd per-instance, in-memory)
  → summary: Partial<Record<VisualMasteryEngine, { shown, interacted, completed }>>
  → POST /api/visual-mastery/persist  → EvidenceRecord rows (type:'VISUAL', weight:0, method:'visual_mastery')
```

`VisualMasteryEngine = Exclude<VisualEngine, null>` (`teachingStrategy.ts`'s `VisualEngine` union).
**No subject/topic enum anywhere in this pipeline** — `EvidenceRecord.subjectSlug`/`topicSlug` are
free-form strings, and `visualMasteryProfile.ts`/`visualMasteryRecommendations.ts`/`visualGuidance.ts`
are subject-agnostic, keyed only by `VisualMasteryEngine`. The only hardcoded lists are **visual-type**
maps (`RECOMMENDATION_TEXT`, `VISUAL_TYPE_LABEL`), not subject lists.

## 3. Registration points (additive only)

1. **`VisualEngine` union** (`teachingStrategy.ts`) — add one new engine value.
2. **Recommendation/guidance text maps** (`visualMasteryRecommendations.ts`, `visualGuidance.ts`) — add
   one entry each for the new engine.
3. **A bridging component** that renders an existing `VisualCard` quantum diagram plus a challenge UI,
   and calls `createMasteryEmitter` on answer — no change to `VisualCard`, `VisualRenderer`, or any of
   the four existing challenge renderers.
4. **A static challenge bank** mapping each priority quantum `VisualType` to question(s) — no new spec
   schema, no AI detection, no Zod union change (`VisualSpec`'s graph/number_line/geometry/process_flow
   union is untouched).

## 4. Remediation / misconception coupling

By design, the existing Visual Mastery subsystem is **read-only and non-blocking**: `EvidenceRecord`
rows are written with `weight: 0` and are never read back by `misconceptionEngine.ts` or any adaptive
flow, for **any** subject (math/science included). This is existing, unmodified behavior — confirmed by
reading `visualMasteryProfile.ts`/`visualMasteryRecommendations.ts`, both explicitly read-only/
non-mutating. Quantum mastery attempts therefore reach the same evidence trail every other subject's
visual mastery does, with **no new remediation wiring required or added**.

## 5. Selected single new engine value

Rather than one new `VisualMasteryEngine` per quantum visual type (which would require 5+ new
recommendation/guidance entries and complicate the aggregate), the safest additive choice is **one**
new value, `'quantum_interactive'`, shared by all quantum mastery challenges — mirroring how
`process_flow` already aggregates multiple distinct flow topics under one engine type. The specific
`VisualType` diagram shown for each challenge is tracked in the challenge's own data
(`QuantumMasteryChallenge.visual`), not in the mastery-engine type.
