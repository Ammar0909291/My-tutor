# Advanced Subject Expansion — Framework Audit (Task 1)

**Status: audit only.** Reviews everything built for Quantum Physics across 6 sprints and extracts the
reusable pattern. No Quantum Physics content modified.

## 1. Curriculum

- **Structure**: `LibrarySubject { slug, name, category, icon, description, modules }` in
  `src/lib/curriculum/subjectCatalog.ts`. `CurriculumModule` (= "unit") has `slug, title, nodes
  (lessons), levelRange: [LevelIndex,LevelIndex], estimatedHours, difficulty?, prerequisites?`.
  `CurriculumNode` (= "lesson") has `slug, title, prerequisites?, difficulty?`.
- **Builder pattern**: `qUnit(num, title, level, hours, difficulty, prereqUnits, lessons)` +
  `qL(id, title, prereqs)` helpers turned a 33-unit/144-lesson design doc into typed data with minimal
  boilerplate — **fully reusable verbatim** for any subject (rename prefix only).
- **Registration**: one entry pushed into `SUBJECT_LIBRARY`, `category` mapped to a `SubjectType` via
  `CATEGORY_TO_TYPE` in `/api/subjects/enroll/route.ts`. Lazy `Subject` DB row created via
  `prisma.subject.upsert()` on first enrollment — **no schema change per subject, ever**.
- **Knowledge Graph routing**: subjects not in `getKnowledgeGraph`'s switch fall through to the generic
  `findLibrarySubject` branch everywhere — this is the **default, zero-effort path** every new subject
  gets automatically.

## 2. Misconceptions

- **Taxonomy**: `MisconceptionRule { type, label, description, primaryPatterns: string[],
  secondaryPatterns?, remediationSteps }` in `misconceptionEngine.ts`'s `RULES` array — matched by
  `topicSlug.includes(pattern)` substring against `primaryPatterns` = lesson slugs.
- **Pattern**: identify 4–8 canonical misconceptions per subject from curriculum review, write 1 rule
  per misconception with `primaryPatterns` = the lesson slugs where it's likely to surface. Pure
  additive array append — no engine change.
- **Library-subject runtime hookup**: one `if (!schoolCtx) { ... }` block in `learn/chat/route.ts`
  (added once, subject-agnostic — reused by every Library subject automatically; no per-subject code).

## 3. Assessments

- **Finding**: the assessment engine (`/api/assessment/evaluate`, `/api/practice/submit`) is **fully
  generic with no per-subject registry**. Registering curriculum = registering assessment capability.
  **Zero code required per subject** — only a design doc describing tier/unit mapping for educator
  reference.

## 4. Visuals (teaching)

- **`VisualType`/`VisualCard`** subsystem: add N union members + `VISUAL_META` entries + N
  `revealStep`-gated SVG renderers (`anim.reveal`/`anim.drawLine` from `visualAnim.module.css`) + N
  `VisualCard.tsx` switch cases/step counts + N `detectVisual.ts` keyword rules (ordered
  most-specific-first) + extend `VALID`/`all` lists in `parseVisualTag`/`buildVisualsSystemBlock`.
- **Live injection**: one `!schoolCtx` sibling block in `learn/chat/route.ts` (added once during the
  Production Visual Injection Sprint) — **automatically serves any subject in `VISUAL_SUBJECTS`**; a new
  subject only needs to be added to that `Set` plus get its own `detectVisual` branch.
- **Renderer pattern**: ~40–60 lines of flat SVG per visual, 4–5 `revealStep` stages, no dynamics
  framework — proven to scale linearly (9 quantum visuals shipped across 2 phases with zero engine
  changes).

## 5. Visual Mastery

- **Bridge pattern**: a static challenge bank (`{id, visual, concept, question, options,
  correctIndex, misconceptionType}[]`) + one bridging component (`<Subject>VisualChallenge.tsx`) that
  renders the existing teaching `VisualCard` plus an MCQ, emitting through the **unchanged**
  `createMasteryEmitter`/`VisualMasterySignal`/`EvidenceRecord` pipeline.
- **One new `VisualEngine` value per subject** (e.g. `'quantum_interactive'`) is sufficient — covers
  all of that subject's mastery challenges; no need for one engine value per visual type.

## 6. Educational Intelligence

- **Finding**: Teaching Plans, Difficulty Intelligence, Retest/Revision Intelligence, Transparency
  Layer, and the Visual Mastery evidence trail are **all subject-agnostic by construction** — none
  required modification for Quantum Physics, and none require modification for any future subject,
  because they operate on `subjectSlug`/`topicSlug` strings and `EvidenceRecord`/`TopicProgress` rows,
  never on a hardcoded subject list.

## Reusable patterns extracted (summary)

| Layer | Code required per new subject | Code required once (already exists) |
|---|---|---|
| Curriculum | 1 tree (builder functions) + 1 `SUBJECT_LIBRARY` entry | builders, KG fallback, enrollment, progress |
| Misconceptions | N `MisconceptionRule` entries | the `!schoolCtx` injection block |
| Assessments | 0 (design doc only) | generic engine |
| Visuals (teaching) | N `VisualType`s + renderers + detection rules + `VISUAL_SUBJECTS` entry | playback/narration engine, live-injection block |
| Visual Mastery | 1 challenge bank + 1 bridging component + 1 `VisualEngine` value | signal/persistence/recommendation pipeline |
| Educational Intelligence | 0 | fully generic |

**Conclusion**: Quantum Physics validated that exactly **two layers** (curriculum tree, visual
renderers) require meaningful per-subject code; every other layer is either zero-cost or a small,
mechanical, additive registration. This is the blueprint formalized in `ADVANCED_SUBJECT_TEMPLATE.md`.
