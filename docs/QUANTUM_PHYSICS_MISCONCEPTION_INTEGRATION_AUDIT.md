# Quantum Physics — Misconception Integration Audit (Task 1)

**Status: audit only (no code in this document).** Maps how the existing Educational Intelligence
misconception architecture works and identifies the exact, additive registration points for the
Quantum Physics misconception catalog.

## Summary / bottom line

My Tutor already has a complete, runtime misconception system (Sprint CS): a **deterministic rule
taxonomy** in `src/lib/school/adaptive/misconceptionEngine.ts`, fed by existing `MistakeRecord` and
`LearningCheckpoint` signals, with detection → confidence → remediation → Tutor-prompt injection
already built. **No new engine, table, or type is needed.** Registering Quantum Physics misconceptions
means (a) adding rules to the existing `RULES` array whose `primaryPatterns` are quantum lesson slugs,
and (b) one additive call from the Library `/learn` branch into the same engine.

## 1. Components reviewed

### `MistakeRecord` (prisma/schema.prisma:420)
`{ id, userId, subjectSlug, topicSlug, sessionId, category, questionId, createdAt }`. The mistake
**taxonomy is a `category` string** — there is no misconception table. Misconceptions are *derived*
at read time from `topicSlug` patterns. Indexed by `(userId, subjectSlug)`,
`(userId, subjectSlug, topicSlug)`, `(userId, subjectSlug, category)`. Written by
`/api/practice/submit` (Library flow) with `topicSlug` = lesson slug and `category = topicSlug`, and
by the school assessment/practice/mock submit routes. **No schema change required.**

### `misconceptionEngine` (src/lib/school/adaptive/misconceptionEngine.ts)
- `RULES: MisconceptionRule[]` — each rule = `{ type, label, description, primaryPatterns[],
  secondaryPatterns?, remediationSteps[] }`.
- `primaryPatterns` are matched against `topicSlug` by **substring** (`topicSlug.includes(pattern)`).
- `detectMisconceptions(userId, subjectSlug, kgNodeIds, chapterId)` queries `MistakeRecord`
  (30-day) and `LearningCheckpoint` (14-day, non-fatal), counts matches per rule, assigns confidence
  (LOW 1–2 / MEDIUM 3–4 / HIGH 5+), returns sorted by evidence. **The query is `subjectSlug`-scoped**,
  so quantum patterns can never false-match another subject.
- `buildMisconceptionBlock()` / `buildRemediationStrategy()` produce the Tutor system-prompt blocks.

### Remediation systems
Remediation is **per-rule `remediationSteps[]`** surfaced to the Tutor via
`buildRemediationStrategy()` (top HIGH-confidence) and to the chapter UI. No separate remediation
engine — reused as-is.

### Teaching Plan integration
`src/lib/school/adaptive/teachingStrategy.ts` and `dailyPlan.ts` call `getChapterMisconceptions(...)`
(school flow). These consume the same `RULES`; quantum rules become available to them automatically
where applicable. No change needed for registration.

### Difficulty Intelligence integration
`src/lib/intelligence/learningDifficultyProfile.ts` and the difficulty signals key off
`MistakeRecord`/`topicProgress` generically by `subjectSlug`/`topicSlug` — no allowlist, so
quantum_physics participates with no change.

## 2. Registration points (the only places to touch)

| # | Point | Change | Type |
|---|---|---|---|
| R1 | `misconceptionEngine.RULES` | append quantum thematic rules (lesson slugs as `primaryPatterns`) | additive data |
| R2 | `learn/chat` Library branch | one additive `detectMisconceptions(...)` call mirroring the existing Sprint-CS school block (line ~388), scoped to the subject's lesson slugs | additive context |

R2 is required because the existing Sprint-CS detection block lives inside the **school-flow** branch
(`schoolCtx`); the Library `/learn` flow had no misconception surfacing. R2 reuses the engine
functions verbatim — no engine, schema, or architecture change.

## 3. Required mappings

- Quantum `MistakeRecord.topicSlug` = lesson node slug `l<unit>-<lesson>` (e.g. `l6-2`).
- Each misconception theme → a rule whose `primaryPatterns` = the theme's **anchor lesson slugs**
  (reconciled to Revision-2 numbering).
- Slugs include the leading `l` and the `-`, which makes substring matching collision-free against
  every other lesson slug (verified empirically).

## 4. Compatibility requirements

- **Additive only:** new array entries + one new try/catch; no edits to existing rules or detection logic.
- **No schema change:** reuse `MistakeRecord.category`/`topicSlug`.
- **Subject isolation:** detection query is `subjectSlug`-scoped → no cross-subject leakage.
- **Non-fatal:** all misconception context is wrapped in try/catch and never blocks a lesson.
- **Confidence gating preserved:** only MEDIUM/HIGH surface to the Tutor (unchanged behavior).

## Conclusion

The misconception architecture is registration-ready for Quantum Physics with two additive touch
points (R1 rules, R2 one Library-branch call) and zero schema/engine/Tutor-architecture changes.
