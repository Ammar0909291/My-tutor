# Advanced Subject Expansion — Reusable Template (Task 2)

**Status: template only.** Formalizes the Quantum Physics pattern (documented in
`ADVANCED_SUBJECT_FRAMEWORK_AUDIT.md`) into a step-by-step blueprint for building any future advanced
Library Subject. No code in this document; no subject implemented.

## 1. Curriculum structure

- Author a design doc: 25–35 units, 4–6 lessons/unit (~120–160 lessons total — Quantum's 33/144 is the
  reference scale).
- Convert with subject-specific builder helpers mirroring `qUnit`/`qL`:
  - `<prefix>Unit(num, title, level, hours, difficulty, prereqUnitNumbers, lessons)`
  - `<prefix>L(id, title, prereqLessonIds)`
- Each unit → `CurriculumModule { slug, title, nodes, levelRange: [LevelIndex,LevelIndex], estimatedHours, difficulty?, prerequisites? }`.
- Each lesson → `CurriculumNode { slug, title, prerequisites?, difficulty? }`.
- Register one `LibrarySubject { slug, name, category, icon, description, modules }` entry in
  `SUBJECT_LIBRARY` (`src/lib/curriculum/subjectCatalog.ts`).
- Map `category` → a `SubjectType` enum value in `CATEGORY_TO_TYPE`
  (`src/app/api/subjects/enroll/route.ts`). Reuse an existing `SubjectType` where the category fits
  (e.g. Physics/Chemistry/Math/Computing); add a new enum value only if no existing type applies.
- No Knowledge Graph code needed — the subject automatically falls through to the generic
  `findLibrarySubject` branch.

## 2. Level structure

- Reuse Quantum's 6-level progression as the default shape for any subject of comparable scope:

  | Level | Difficulty band | Approx. unit range |
  |---|---|---|
  | 1 | foundational | units 1–6 |
  | 2 | foundational→developing | units 7–12 |
  | 3 | developing | units 13–18 |
  | 4 | developing→proficient | units 19–24 |
  | 5 | proficient | units 25–29 |
  | 6 | proficient→advanced | units 30–33+ |

- `levelRange` on each module is the only place level is encoded — no separate level table or schema.
- Smaller subjects (e.g. a focused 10–15 unit subject) may compress to 3–4 levels; the level count is a
  curriculum-authoring choice, not an engine constraint.

## 3. Misconception structure

- Identify 4–8 canonical misconceptions during curriculum review (one per recurring conceptual error,
  not one per lesson).
- Add one `MisconceptionRule` per misconception to the `RULES` array in
  `src/lib/school/adaptive/misconceptionEngine.ts`:
  ```
  { type, label, description, primaryPatterns: [...lessonSlugs], secondaryPatterns?, remediationSteps }
  ```
- `primaryPatterns` should be the lesson slugs (or stable substrings of them) most likely to surface
  that misconception — matched via `topicSlug.includes(pattern)`.
- No engine change, no new injection block — the existing subject-agnostic `!schoolCtx` hookup in
  `learn/chat/route.ts` already serves every Library subject.

## 4. Assessment structure

- No code. Once curriculum is registered, `/api/assessment/evaluate` and `/api/practice/submit` work
  immediately — both are generic over `subjectSlug`/`topicSlug`.
- Produce a short design note (educator-facing, not code) describing how tiers/units map to assessment
  difficulty bands, for content-review reference only.

## 5. Visual structure (teaching visuals)

- Select 5–10 priority visual concepts from the curriculum's highest-misconception-density lessons
  (Quantum shipped 9 across 2 phases).
- For each: add a `VisualType` union member, a `VISUAL_META` entry, and a `revealStep`-gated SVG
  renderer (~40–60 lines, 4–5 reveal stages, reusing `visualAnim.module.css`'s `.reveal`/`.drawLine`).
- Add a `VisualCard.tsx` switch case + step count, and a `detectVisual.ts` keyword-rule branch
  (most-specific-pattern-first ordering).
- Add the subject to the `VISUAL_SUBJECTS` Set so the existing `!schoolCtx` live-injection block in
  `learn/chat/route.ts` serves it automatically — no new injection code.
- Extend `VALID`/`all` lists in `parseVisualTag`/`buildVisualsSystemBlock` with the new `VisualType`s.

## 6. Mastery structure (visual mastery challenges)

- Build one static challenge bank file: `{id, visual, concept, question, options, correctIndex,
  misconceptionType}[]`, 2 challenges per priority visual (Quantum: 10 challenges / 5 visuals).
- Build one bridging component `<Subject>VisualChallenge.tsx` (mirror `QuantumVisualChallenge.tsx`):
  renders the existing `VisualCard` for the challenge's `VisualType`, adds an MCQ UI, calls
  `createMasteryEmitter({ visualType: '<subject>_interactive', defaultConcept, context,
  onMasteryEvent })` on selection.
- Add exactly **one** new `VisualEngine` value (e.g. `'<subject>_interactive'`) in
  `teachingStrategy.ts` — never one per visual type.
- Add one `RECOMMENDATION_TEXT` entry (`visualMasteryRecommendations.ts`) and one `VISUAL_TYPE_LABEL`
  entry (`visualGuidance.ts`) for the new engine value.
- No schema change, no persistence/recommendation engine change — `EvidenceRecord` rows flow through
  unmodified with `notes.visualType = '<subject>_interactive'`.

## 7. Per-subject build checklist (condensed)

1. Curriculum design doc → builder-function tree → `SUBJECT_LIBRARY` entry → `CATEGORY_TO_TYPE` mapping.
2. 4–8 `MisconceptionRule` entries.
3. (No assessment code — design note only.)
4. 5–10 `VisualType`s + renderers + `detectVisual` rules + `VISUAL_SUBJECTS` entry + `VALID`/`all` list updates.
5. 1 challenge bank + 1 bridging component + 1 `VisualEngine` value + 2 text-map entries.
6. Validate: `npx prisma generate`, `npx tsc --noEmit`, `npm run build`.

This is the exact sequence Quantum Physics followed across its 6 sprints, now generalized.
