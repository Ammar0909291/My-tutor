# Quantum Physics — Integration Implementation Plan

**Status: PLAN ONLY. No code, no database changes, no engine changes.**
This document describes exactly how the (to-be-finalized) Quantum Physics curriculum integrates
into My Tutor's existing **Subject Library** architecture without touching any completed engine.

---

## ⚠️ Pre-flight finding (must read first)

The continuation handoff states that three documents already exist:

- `docs/QUANTUM_PHYSICS_CURRICULUM_AUDIT.md`
- `docs/QUANTUM_PHYSICS_MASTER_CURRICULUM.md`
- `docs/QUANTUM_PHYSICS_CURRICULUM_REPORT.md`

**None of these files exist in the repository.** Verified by directory listing (`docs/`), a
repo-wide content search (`grep -rli quantum`), and full git history (`git log --all`). The only
"quantum" occurrences are incidental topic words inside the existing CBSE/UP science knowledge
graphs (e.g. "Quantum Mechanical Model of the Atom" in `chemistryKnowledgeGraph` /
`scienceKnowledgeGraph`). There is **no `quantum_physics` subject, curriculum spec, or seed data**
anywhere in the codebase.

**Consequence for this plan.** The *integration mechanics* below are fully grounded in the real
codebase and are correct regardless. However, the *curriculum content* (the exact 30 units / 110
lessons, their titles, prerequisite chains, and level placement) is **not yet present** and must be
authored or located before any seeding step can run. This plan therefore treats the curriculum
content as an **input to be supplied** (Step 0) and specifies the precise shape it must take. The
plan deliberately does **not** invent that curriculum.

A second discrepancy to resolve during Step 0: the handoff describes **7 levels**, but the platform's
level system (`LEVELS` in `subjectCatalog.ts`) is a fixed **0–5 index** (Complete Beginner → Expert).
The 7-level progression must be **mapped onto the existing 0–5 index** (see Step 3), not added as new
levels — adding levels would be an engine change and is out of scope.

---

## 1. How the existing architecture works (audit result)

My Tutor has **two parallel curriculum systems**. Quantum Physics belongs to the second one.

| System | For | Source of truth | Storage |
|---|---|---|---|
| **School (board) curriculum** | CBSE / UP Board grades | `KnowledgeNode[]` graphs in `src/lib/education/*KnowledgeGraph.ts` + `*Catalog.ts` | static code |
| **Subject Library** | Self-paced "library" subjects (Math, Physics, Chemistry, AI, languages, programming, …) | `SUBJECT_LIBRARY` in `src/lib/curriculum/subjectCatalog.ts` | static code + lazy DB rows |

The handoff explicitly classifies Quantum Physics as a **Library Subject (not CBSE, not UP Board)**,
so it integrates **exclusively through the Subject Library system** and does **not** require a
`KnowledgeNode` graph file.

### Subject Library data shape (`subjectCatalog.ts`)

```
LibrarySubject { slug, name, category, icon, description, modules: CurriculumModule[], visible? }
CurriculumModule { slug, title, nodes: CurriculumNode[], levelRange: [0..5, 0..5], estimatedHours }
CurriculumNode { slug, title }
```

- A subject is **registered** purely by appending one `LibrarySubject` object to the
  `SUBJECT_LIBRARY` array. `VISIBLE_SUBJECT_LIBRARY`, `findLibrarySubject`,
  `librarySubjectsByCategory`, `modulesForLevelSpan`, and `renderCurriculumTree` all derive from it
  automatically — **no other registry edit is needed**.
- **Units → `CurriculumModule`**, **Lessons → `CurriculumNode`**. So 30 units = 30 modules, 110
  lessons = 110 nodes distributed across those modules.

### How a subject reaches the database (no manual seeding)

The DB row is created **lazily on first enrollment**, not by a seed script. In
`src/app/api/subjects/enroll/route.ts`:

```ts
const subject = await prisma.subject.upsert({
  where: { slug: librarySubject.slug },
  create: { slug, name, type: CATEGORY_TO_TYPE[category], description },
  update: {},
})
```

So **the curriculum lives in code**; Postgres only ever stores a thin `Subject` row (+ the learner's
`ProfileSubject`, `LearningPath`, progress). **No migration and no seed script are required** to add
Quantum Physics. Progress models (`TopicProgress`, `EvidenceRecord`, `MistakeRecord`, `Curriculum`,
etc.) are keyed by `subjectSlug` / `topicSlug` strings and need no schema change for a new subject.

### How lessons are produced

Library subjects do **not** ship hand-authored lesson bodies. The AI tutor generates lessons from the
module tree (`renderCurriculumTree(subject)` is embedded into prompts so the tutor follows the
prerequisite chain), and generated lessons are cached in the `Curriculum` model keyed by
`subjectCode` (= slug) + `topicSlug` (= node slug). **Defining the module/node tree is therefore the
entire authoring task** — no separate "lesson definition" content layer exists or is required.

---

## 2. Integration requirements checklist (the six items requested)

| # | Requirement | Verdict for Quantum Physics | Action |
|---|---|---|---|
| 1 | **Subject registration** | Append one `LibrarySubject` to `SUBJECT_LIBRARY` | Step 3 |
| 2 | **Knowledge graph** | **Not required** — library subjects use the module/node tree, not `KnowledgeNode[]` | none (optional future) |
| 3 | **Curriculum seeding** | **Not required** — `Subject` row auto-upserts on first enrollment | none |
| 4 | **Lesson definition** | **Not required** as static content — tutor generates from the tree; cached in `Curriculum` | none |
| 5 | **Existing DB structures** | `Subject`, `ProfileSubject`, `LearningPath`, `TopicProgress`, `Curriculum` — all slug/topic-keyed | reused unchanged |
| 6 | **Architecture compatibility** | Fully compatible **if** category maps to an existing `SubjectType` (see risk R1) | Step 3 decision |

---

## 3. Implementation steps (when authorized — NOT executed here)

### Step 0 — Supply the curriculum content (blocking prerequisite)
Produce/locate the finalized curriculum as a structured list of **30 units** and **110 lessons** with,
for each unit: title, slug, ordered lesson titles, an `estimatedHours`, and a target **0–5 level
range** (mapping the 7-level progression onto the existing index, e.g. L1 Foundations→0, L2 Core→1,
L3 Systems→2, L4 Advanced→3, L5 Quantum Information→4, L6 Technologies→5, L7 Modern→5). This is the
only missing input; everything below is mechanical once it exists.

### Step 1 — Choose the category mapping (decision, see risk R1)
Recommended: register under the **existing `physics` category** so it maps to the existing
`SubjectType.PHYSICS` via `CATEGORY_TO_TYPE` with **zero schema change**. (A dedicated
`quantum`/`physics_advanced` category would require a new `SubjectType` enum value → Prisma change →
`db push` → out of scope.)

### Step 2 — Author the module tree (single file, additive)
In `src/lib/curriculum/subjectCatalog.ts`, add a `QUANTUM_PHYSICS_TREE: CurriculumModule[]` built with
the existing `mod(...)` helper (30 entries), then append one `LibrarySubject`:

```ts
{ slug: 'quantum_physics', name: 'Quantum Physics', category: 'physics', icon: '⚛️',
  description: '…', modules: QUANTUM_PHYSICS_TREE }
```

Optionally set `visible: false` initially to stage it privately, then flip to `true` to launch — this
uses the **existing** visibility flag and needs no other change.

### Step 3 — (Optional) localization
Add `quantum_physics` to `SUBJECT_I18N` and any new unit titles to `MODULE_TITLE_I18N`. Entirely
optional — both lookups already fall back to English when a key is absent.

### Step 4 — Verify (no engine touched)
`npx prisma generate && npx tsc --noEmit -p tsconfig.json && npm run build`. Manually confirm the
subject appears in `/library`, enrolls (auto-upserting the `Subject` row), and that the tutor receives
the tree via `renderCurriculumTree`. No data migration, no backfill.

---

## 4. What is explicitly NOT changed

- **No Prisma schema change, no `db push`, no seed script** (subject row is lazy-upserted).
- **No Knowledge Graph files** (`*KnowledgeGraph.ts`) touched — library subjects don't use them.
- **No Tutor Max prompt/adaptation change** — it already consumes any subject's tree generically.
- **No Educational Intelligence change** (S1–S11 are subject-agnostic, keyed by `subjectSlug`).
- **No Visual Learning change** (Sprints B–U untouched; visuals attach generically by topic).
- **No change to the School (CBSE/UP) board architecture**, XP, grading, or assessment engines.

The total integration surface is **one file** (`subjectCatalog.ts`), plus optional i18n entries.

---

## 5. Risks & open decisions

- **R1 — Category/SubjectType (decision needed):** reuse `physics` → `SubjectType.PHYSICS` (no schema
  change, **recommended**) vs. a new category/enum (schema change, out of scope). Default to reuse.
- **R2 — Missing curriculum spec (blocking):** the 30-unit/110-lesson content does not exist in-repo
  and must be supplied/authored in Step 0 before Step 2 can be written. This plan does not invent it.
- **R3 — 7→6 level mapping:** the handoff's 7 levels must collapse onto the 0–5 `LevelIndex`; choose
  the grouping in Step 0 so `levelRange` values are well-defined.
- **R4 — Depth vs. library norm:** existing library trees average ~6–13 nodes per subject; 110 lessons
  is far larger. It fits the types without change, but confirm the tutor-prompt size from
  `renderCurriculumTree` stays within token budget (may warrant level-sliced prompts via the existing
  `modulesForLevelSpan` — already supported, no new code).

---

## 6. Bottom line

Integrating Quantum Physics is a **single-file, additive registration** in `subjectCatalog.ts` that
reuses every existing engine and needs **no DB, schema, KG, tutor, intelligence, or visual change**.
The only true blocker is that the **curriculum content itself is not present in the repository** (the
three referenced spec docs do not exist) and must be supplied first. Once that content exists and the
two decisions (category mapping R1, level mapping R3) are made, implementation is mechanical.

**No code was written, no database was modified, and no engine was changed in producing this plan.**
