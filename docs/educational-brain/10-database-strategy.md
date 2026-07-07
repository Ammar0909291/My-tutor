# 10 · Database Strategy — concrete schema sketch

> *The docs above specified the architecture. This one shows it
> landing in Postgres. Phase 2's first migration is built against
> these tables.*

---

## 1. Scope

A concrete, reviewable schema. Not a migration script — the schema
sketch lets the Phase 2 implementer write the migration with a
clear target. Conventions follow the existing Prisma codebase (camel
case, FK relations, indices).

---

## 2. Schema overview

```
                      ┌─────────────────────────┐
                      │  AssetIdentity (hub)    │
                      └──┬────────┬─────────┬───┘
                         │        │         │
                         ▼        ▼         ▼
                  Explanation  Visual   Probe
                                            │
                                            ▼
                                    targets_misconception
                                            │
                                            ▼
                  ┌──────────┐   ┌────────────────┐
                  │ Concept  │◄──│ Misconception  │
                  └────┬─────┘   └────────────────┘
                       │   ▲
                       │   │
                       ▼   │
               LearningObjective
                       │   ▲
                       ▼   │
                  Curriculum / Module
```

Plus per-learner: `StudentMemory*` tables. Plus evidence:
`EvidenceEvent`, `AssetScore`. Plus Brain config: `BrainConfig`,
`Experiment`.

---

## 3. Knowledge-side tables

### Concept

```prisma
model Concept {
  id                       String   @id          // 'physics.kinematics.projectile_motion'
  title                    String                // Default-language title
  description              String   @db.Text
  primaryDomain            String                // 'physics', 'math', ...
  alsoInDomains            String[]              // ['math.geometry', 'engineering.ballistics']
  abstractionLevel         AbstractionLevel
  modality                 Modality[]
  authoritativeFormula     String?               // optional LaTeX
  canonicalDefinitionId    String?               // FK → AssetIdentity (one canonical Explanation)
  difficultyByGrade        Json                  // { k_5: null, 6_8: 'foundational', ... }
  estimatedMinutesToMastery Json                 // { k_5: null, 9_10: [15, 30], ... }
  titleTranslations        Json                  // { hi: '...', ru: '...', ... }
  descriptionTranslations  Json
  createdAt                DateTime @default(now())
  updatedAt                DateTime @updatedAt
  version                  Int      @default(1)

  // Edges (modeled as separate tables; this side is just the inverse view)
  outgoingEdges            ConceptEdge[] @relation("from")
  incomingEdges            ConceptEdge[] @relation("to")
  objectives               ObjectiveConcept[]
  misconceptions           ConceptMisconception[]

  @@index([primaryDomain])
  @@index([id, version])
}

enum AbstractionLevel { concrete symbolic abstract meta }
enum Modality { visual numerical symbolic linguistic kinesthetic }
```

### ConceptEdge — every typed graph edge

```prisma
model ConceptEdge {
  id              String   @id @default(uuid())
  fromConceptId   String
  toConceptId     String
  edgeKind        EdgeKind
  weight          Float    @default(1.0) // for ranked traversal (e.g., strongest prereq first)
  createdAt       DateTime @default(now())
  source          String?              // why this edge exists ('curator:alice', 'imported:cbse-2024')

  fromConcept     Concept  @relation("from", fields: [fromConceptId], references: [id])
  toConcept       Concept  @relation("to",   fields: [toConceptId],   references: [id])

  @@unique([fromConceptId, toConceptId, edgeKind])
  @@index([toConceptId, edgeKind])      // for "what depends on me?"
  @@index([fromConceptId, edgeKind])    // for "what do I depend on?"
}

enum EdgeKind {
  prerequisite_of
  part_of
  is_a
  analogous_to
  commonly_confused_with
}
```

### Misconception

```prisma
model Misconception {
  id                       String   @id          // 'physics.kinematics.heavier_falls_faster'
  title                    String
  description              String   @db.Text
  scope                    MisconScope @default(universal)
  language                 String?              // non-null when scope=language_specific
  prevalenceByGrade        Json                 // { 6_8: 'high', 9_10: 'medium' }
  detectableByProbeIds     String[]             // FK → Probe-family AssetIdentity ids
  repairableByAssetIds     String[]             // FK → Explanation-family AssetIdentity ids
  unrepairableWithoutHuman Boolean  @default(false)
  createdAt                DateTime @default(now())
  source                   String?              // 'paper:Smith2018', 'curator:bob'

  concepts                 ConceptMisconception[]
}

enum MisconScope { universal language_specific }

model ConceptMisconception {
  conceptId       String
  misconceptionId String
  confidence      Float  @default(0.5) // how strongly this concept is associated with this misconception
  source          String?

  concept         Concept       @relation(fields: [conceptId],       references: [id])
  misconception   Misconception @relation(fields: [misconceptionId], references: [id])

  @@id([conceptId, misconceptionId])
  @@index([misconceptionId])
}
```

### LearningObjective + Curriculum + Module

```prisma
model LearningObjective {
  id                  String   @id          // 'cbse.10.science.physics.7.derive_range'
  title               String
  titleTranslations   Json
  bloomLevel          BloomLevel
  examplePrompt       String?  @db.Text

  concepts            ObjectiveConcept[]
  modules             ModuleObjective[]
}

enum BloomLevel { remember understand apply analyze evaluate create }

model ObjectiveConcept {
  objectiveId   String
  conceptId     String
  required      Boolean  @default(true)

  objective     LearningObjective @relation(fields: [objectiveId], references: [id])
  concept       Concept           @relation(fields: [conceptId],   references: [id])

  @@id([objectiveId, conceptId])
}

model Curriculum {
  id              String   @id          // 'cbse_class_10_science_2025'
  title           String
  authority       String                // 'cbse', 'icse', 'ib', ...
  grade           Int
  language        String
  effectiveFrom   DateTime
  effectiveTo     DateTime?             // null = current
  metadata        Json                  // anything board-specific
  createdAt       DateTime @default(now())

  modules         Module[]
}

model Module {
  id              String     @id        // 'cbse.10.sci.physics.7'
  curriculumId    String
  title           String
  orderIndex      Int
  estimatedHours  Int

  curriculum      Curriculum @relation(fields: [curriculumId], references: [id])
  objectives      ModuleObjective[]

  @@index([curriculumId, orderIndex])
}

model ModuleObjective {
  moduleId      String
  objectiveId   String
  orderIndex    Int

  module        Module             @relation(fields: [moduleId],    references: [id])
  objective     LearningObjective  @relation(fields: [objectiveId], references: [id])

  @@id([moduleId, objectiveId])
  @@index([moduleId, orderIndex])
}
```

---

## 4. Asset-side tables

### AssetIdentity — the cross-family hub

```prisma
model AssetIdentity {
  assetId             String        @id @default(uuid())
  family              AssetFamily
  familyKind          String                       // 'definition' | 'core_explanation' | 'visual_spec_2d' | 'mcq' | ...
  conceptId           String
  language            String                       // ISO 639-1
  gradeBand           GradeBand
  style               String?                      // 'rigorous' | 'concrete' | 'analogy' | ...
  authorId            String?                      // FK → User; null for SYSTEM
  authorKind          AuthorKind
  sourceTraceId       String?                      // FK → KnowledgeAcquisitionTrace
  createdAt           DateTime      @default(now())
  version             Int           @default(1)
  parentVersionId     String?                      // FK → AssetIdentity (previous version)
  status              AssetStatus   @default(DRAFT)
  deprecationReason   String?
  qualityScore        Float         @default(0.5)  // written by Evidence Engine
  qualityConfidence   Float         @default(0.1)  // written by Evidence Engine
  sampleSize          Int           @default(0)
  costCents           Int           @default(0)    // cumulative AI authoring cost in cents
  embedding           Unsupported("vector(768)")?  // pgvector
  tags                String[]
  curriculumMappings  Json                         // [(curriculumId, codeRef)]
  prerequisiteConceptIds  String[]                 // asset-specific extras beyond concept-level
  incompatibilityMisconceptionIds  String[]
  intellectualProperty IPClass     @default(unknown)

  concept           Concept   @relation(fields: [conceptId], references: [id])
  explanation       Explanation?
  visual            Visual?
  probe             Probe?

  @@unique([conceptId, family, familyKind, language, gradeBand, style, version])
  @@index([conceptId, family, familyKind, language, gradeBand, status])  // hot read path
  @@index([conceptId, status, qualityScore(sort: Desc)])                  // ranking
  @@index([status])
  @@index([costCents])                                                    // for cost dashboards
}

enum AssetFamily { EXPLANATION VISUAL PROBE }
enum AuthorKind  { HUMAN_CURATOR AI_AUTHORED AI_AUTHORED_REVIEWED IMPORTED STUDENT_CONTRIBUTION SYSTEM }
enum AssetStatus { DRAFT REVIEW ACTIVE SHADOW_ACTIVE EXPERIMENT_VARIANT DEPRECATED RETIRED }
enum GradeBand   { k_5 g_6_8 g_9_10 g_11_12 undergrad postgrad }
enum IPClass     { public_domain cc_by cc_by_sa proprietary_licensed fair_use pending unknown }
```

### Explanation, Visual, Probe — family tables

```prisma
model Explanation {
  assetId           String   @id
  content           String   @db.Text
  contentHash       String                // SHA-256
  length            Int                   // char count
  readingLevel      Float?                // Flesch-Kincaid
  asset             AssetIdentity @relation(fields: [assetId], references: [assetId])

  @@index([contentHash])
}

model Visual {
  assetId           String   @id
  renderer          VisualRenderer
  specPayload       Json                  // typed per renderer; Zod-validated at write
  specHash          String
  a11yDescription   String   @db.Text     // mandatory; non-empty enforced at write
  estimatedRenderMs Int      @default(100)
  deviceCapabilities Json    @default("{}")  // { needsWebGL: bool, ... }
  asset             AssetIdentity @relation(fields: [assetId], references: [assetId])

  @@index([renderer])
  @@index([specHash])
}

enum VisualRenderer { katex recharts three animation interactive_widget }

model Probe {
  assetId                  String   @id
  probeKind                ProbeKind
  stem                     String   @db.Text
  choices                  Json                 // for mcq: [{ text, correct, misconceptionId? }]
  correctValue             Json?                // for true_false / numeric / short_answer
  tolerance                Float?               // for numeric
  keywords                 String[]             // for short_answer
  sampleAnswer             String?
  difficulty               Difficulty
  discriminationScore      Float    @default(0.5)
  targetedMisconceptionIds String[]
  requiredVisualAssetIds   String[]             // for "in the diagram..." probes
  asset                    AssetIdentity @relation(fields: [assetId], references: [assetId])

  @@index([difficulty])
}

enum ProbeKind  { mcq true_false short_answer numeric step_check misconception_probe checkpoint }
enum Difficulty { foundational developing proficient advanced }
```

---

## 5. Acquisition + provenance

```prisma
model KnowledgeAcquisitionTrace {
  traceId             String           @id @default(uuid())
  sourceKind          SourceKind
  sourceTitle         String
  sourceUri           String?
  contentHash         String
  licenseClass        IPClass
  licenseDocumentUri  String?
  contributedById     String?         // FK → User
  ingestedAt          DateTime         @default(now())
  metadata            Json             @default("{}")

  segments            SourceSegment[]
}

enum SourceKind { book video syllabus research expert_dictation external_ai }

model SourceSegment {
  id                  String   @id @default(uuid())
  traceId             String
  segmentIndex        Int
  text                String   @db.Text
  pageOrTimestamp     String?
  segmentHash         String
  embedding           Unsupported("vector(768)")?

  trace               KnowledgeAcquisitionTrace @relation(fields: [traceId], references: [traceId])

  @@index([traceId, segmentIndex])
}
```

---

## 6. Student Memory tables

```prisma
model LearnerConceptMastery {
  userId            String
  conceptId         String
  language          String
  masteryScore      Float    @default(0)
  masteryConfidence Float    @default(0.1)
  decayedScore      Float    @default(0)
  attemptCount      Int      @default(0)
  lastSeenAt        DateTime?
  firstAttemptAt    DateTime?
  updatedAt         DateTime @updatedAt

  @@id([userId, conceptId, language])
  @@index([userId, language, decayedScore])  // for "what should I review?"
}

model LearnerActiveMisconception {
  userId             String
  misconceptionId    String
  language           String
  confidence         Float    @default(0.5)
  firstDetectedAt    DateTime @default(now())
  lastDetectedAt     DateTime @default(now())
  repairAttempts     Int      @default(0)
  status             MisconStatus @default(active)

  @@id([userId, misconceptionId, language])
  @@index([userId, status])
}

enum MisconStatus { active repaired escalated }

// LearnerSessionMemory — Redis-backed; sketch left as comment
// model LearnerSessionMemory { ... }
```

---

## 7. Evidence

```prisma
model EvidenceEvent {
  eventId           String   @id @default(uuid())
  occurredAt        DateTime @default(now())
  turnId            String?
  userId            String
  sessionId         String?
  conceptId         String
  language          String
  gradeBand         GradeBand
  category          EvidenceCategory
  assetId           String?
  misconceptionId   String?
  curriculumId      String?
  outcome           String                       // 'pass' | 'fail' | 'partial' | 'shown' | 'reused' | 'flagged'
  strength          Float
  rawScore          Float?
  contextHash       String?

  @@index([assetId, occurredAt])
  @@index([conceptId, occurredAt])
  @@index([userId, occurredAt])
  @@index([occurredAt])
}

enum EvidenceCategory {
  ASSET_SHOWN
  PROBE_OUTCOME
  MISCONCEPTION_DETECTED
  LEARNER_FEEDBACK
  RE_ASK
  SUMMATIVE_OUTCOME
}

// AssetScore — the authoritative nightly-rollup result;
// AssetIdentity.qualityScore is a denormalized copy for the read path
model AssetScore {
  assetId           String
  gradeBand         GradeBand
  language          String
  learningStyle     String?         // null = aggregated; populated for stratified scores
  windowEnd         DateTime        // last day of the 30-day window
  qualityScore      Float
  qualityConfidence Float
  sampleSize        Int
  positiveEvents    Int
  negativeEvents    Int

  @@id([assetId, gradeBand, language, learningStyle, windowEnd])
  @@index([assetId, windowEnd])
}
```

The `EvidenceEvent` table is **partitioned by day** (Postgres
declarative partitioning) — adding `PARTITION BY RANGE (occurredAt)`
in the actual SQL. Phase 2 may also enable a Citus or Timescale
extension for time-series scale; the schema accepts either.

---

## 8. Brain config + experiments

```prisma
model BrainConfig {
  id            String   @id                  // 'ranking_weights' | 'strategy_table' | ...
  name          String   @unique
  value         Json
  version       Int      @default(1)
  effectiveFrom DateTime @default(now())
  effectiveTo   DateTime?
  changedBy     String?              // FK → User
  reason        String?  @db.Text

  @@index([name, version])
}

model Experiment {
  id                String   @id @default(uuid())
  kind              ExperimentKind
  hypothesis        String   @db.Text
  primaryMetric     String
  arms              Json                 // [{ armId, definition, assignmentRule, weight }]
  populationTotalN  Int?
  status            ExperimentStatus
  startedAt         DateTime?
  endedAt           DateTime?
  conclusion        String?  @db.Text

  arms_assignments  ExperimentAssignment[]
}

enum ExperimentKind     { ASSET_AB STRATEGY_AB RANKING_BANDIT PROMPT_AB }
enum ExperimentStatus   { designing running analyzing shipped aborted }

model ExperimentAssignment {
  userId         String
  experimentId   String
  armId          String
  assignedAt     DateTime @default(now())

  experiment     Experiment @relation(fields: [experimentId], references: [id])

  @@id([userId, experimentId])
  @@index([experimentId, armId])
}
```

---

## 9. Migration plan from the current schema

Phase 2's migrations, in order:

| Step | Change | Risk |
|------|--------|------|
| 1 | Add new tables (everything above) alongside existing tables. No drops. | Low — pure additive. |
| 2 | Backfill `Concept` from the 16 `KnowledgeGraph.ts` files (one-shot script). | Low — deterministic. |
| 3 | Backfill `Misconception` from the existing 20+ rules in `misconceptionEngine.ts`. | Low — well-defined rule set. |
| 4 | Backfill `Curriculum` views: one per existing subject (e.g., `legacy.classical_mechanics`). | Low. |
| 5 | Backfill `AssetIdentity` placeholders for the existing visual generators' outputs. | Medium — the existing generators don't produce stable canonical-slug content; need to create assets lazily on next request and cache. |
| 6 | New chat-route version reads from new tables, writes events to `EvidenceEvent`, falls back to old logic on miss. Feature-flagged per learner. | Medium — needs dual-write reconciliation. |
| 7 | Migrate `TopicProgress` → `LearnerConceptMastery`. Dual-write phase, then read-from-new, then drop old. | Medium — biggest hot table. |
| 8 | Migrate `MistakeRecord` history to `LearnerActiveMisconception` via the misconception engine. | Medium. |
| 9 | Eventually retire: `VisualizationCache`, `ChapterContentCache`, `TeachingStrategyEvent`, the 16 KG.ts files. | Low — pure removal once new path is dominant. |

Steps 1-5 are non-breaking (Phase 2 month 1-2). Step 6 is a feature
flag (Phase 2 month 2-4). Steps 7-9 are post-validation cleanup
(Phase 2 month 5+).

---

## 10. Cross-cutting concerns

### Index strategy

- Every FK has an index on the FK side.
- Every hot read path has a covering index (notable: AssetIdentity's
  `(conceptId, family, familyKind, language, gradeBand, status)`).
- Every JSON column that's queried has a GIN index on the queried
  path (e.g., `curriculumMappings` is queried by curriculumId).
- pgvector indexes (HNSW) on the embedding columns for KNN search.

### Partitioning

- `EvidenceEvent`: time-partitioned by day, sub-partitioned by
  `hash(conceptId)` modulo 8 for parallel aggregation.
- `LearnerConceptMastery`: hash-partitioned by `userId` when a shard
  exceeds ~500 GB.

### Constraints

- Foreign keys enforced everywhere (no informal references).
- Unique constraints enforced at the database, not just the
  application (e.g., one `ACTIVE` asset per canonical-slug group).
- NOT NULL on every column that doesn't model "optional in the
  domain."

### Soft-delete

Never. Lifecycle is `status` field; deletes are explicit user-data-
purge operations (account deletion) that hash-redact rather than
remove.

---

## 11. Anti-patterns

- ❌ **Polymorphic Asset with one giant payload column**. Family
  tables are typed (see § 4).
- ❌ **JSON columns for cross-asset queries**. Cross-asset queries
  go through `AssetIdentity` indexed columns, never through JSONB
  paths.
- ❌ **Hot-spotting on `userId` shard 0**. Hash-shard by `userId`
  with even distribution.
- ❌ **Reading `EvidenceEvent` on the read path**. Read path uses
  `AssetIdentity.qualityScore` (the denormalized rollup);
  `EvidenceEvent` is for the Engine and for audits.
- ❌ **Writing `qualityScore` from anywhere other than the Evidence
  Engine**. Enforced at the application layer with role-based DB
  credentials.
- ❌ **Adding fields without an evidence story**. Every new column
  must answer "what decision will read this?"
