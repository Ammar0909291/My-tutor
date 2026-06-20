# Visual Learning Sprint N — Connecting Visual Mastery to Educational Intelligence

**Goal**: Connect persisted Visual Mastery evidence (Sprint M's
`EvidenceRecord(type: VISUAL, weight: 0)` rows) to the existing Educational
Intelligence Layer — new, read-only aggregation and weakness-detection only;
no curriculum, grading, XP, or Tutor Max changes.

## 1. Intelligence architecture

```
EvidenceRecord (type: VISUAL, Sprint M)
   -> getVisualLearningProfile(userId)         (src/lib/visuals/visualMasteryProfile.ts, Sprint N)
        -> buildVisualLearningProfile(rows)     pure aggregation, per visualType
   -> detectVisualWeaknesses(profile)           pure threshold classifier
   -> GET /api/visual-mastery/persist           now also returns { profile, weaknesses }
   -> VisualMasteryViewer (dev-only)            displays profile + weak areas
```

`docs/VISUAL_INTELLIGENCE_AUDIT.md` (Task 1) audited the four named
Educational Intelligence systems — recommendations
(`learningNavigator.ts`/`learningOrchestrator.ts`), progress systems
(`learningEffectiveness.ts`/`getDashboardV2Data.ts`), revision
(`spacedRevision.ts`), and weak-point detection
(`masteryIntelligence.ts`/`weakTopics.ts`) — and confirmed none of them
read `EvidenceRecord` today, and the only write among them
(`spacedRevision.advanceRevision()`) touches a `TopicProgress` field this
sprint's code never writes to. This meant the new intelligence module
could be built as a fully standalone, parallel read path with zero
modification to any existing file in those five systems — and that's what
was built: `src/lib/visuals/visualMasteryProfile.ts` is a new file, not
called by and not calling into any of the five audited modules. The only
existing file touched is the Sprint M API route's `GET` handler (additive
response fields) and the Sprint M dev viewer (additive display sections) —
both purely additive, never read by the audited intelligence systems.

## 2. Visual profile model

`VisualLearningProfile` (`src/lib/visuals/visualMasteryProfile.ts`):

```ts
type VisualLearningProfile = Partial<Record<VisualMasteryEngine, {
  shown: number
  interacted: number
  completed: number
  completionRatePct: number | null   // completed/shown * 100, rounded; null if never shown
}>>
```

`buildVisualLearningProfile(rows)` is a pure function: it sums each
persisted row's `notes.shown`/`interacted`/`completed` per `notes.visualType`
across every `EvidenceRecord(type: VISUAL)` row passed in, then computes
`completionRatePct` per type. `getVisualLearningProfile(userId)` is the only
function in this module that touches Prisma — one read query
(`findMany({ where: { userId, type: 'VISUAL' }, select: { notes: true } })`)
— and is the sole way the profile is produced from the database. Matches
the brief's example shape exactly (`{ graph: { shown, completed, ... } }`),
with `interacted` and `completionRatePct` kept as additive extra fields,
consistent with Sprint L's existing `VisualMasterySummary` precedent of
carrying `interacted` alongside `shown`/`completed`.

No schema changes — built entirely on the `EvidenceRecord` table and
`notes` JSON shape Sprint M already established.

## 3. Weakness analysis model

`detectVisualWeaknesses(profile, thresholdPct = 50)`:

- Scans each visual type's `completionRatePct`; flags any type below the
  threshold (default 50%) that has actually been shown at least once
  (`completionRatePct === null` — never shown — is excluded; absence of
  evidence is not evidence of weak engagement).
- Output is a plain list, sorted weakest-first:
  ```ts
  { visualType, shown, completed, completionRatePct, recommendation: string }
  ```
- `recommendation` is a static, templated string ("Low completion on
  process_flow visuals (25%, 1/4) — consider revisiting process_flow-based
  practice.") — descriptive text only, never a write to any
  recommendation/curriculum table, never consumed by
  `getTopRecommendation()`'s 8-tier ordering or `getWeakTopics()`'s
  mistake-based scoring.
- The 50% default threshold was chosen so the brief's own worked example
  (Graph 80%, Geometry 90%, Process Flow 25%) flags only Process Flow,
  matching the brief's intent.
- No scoring, no grading: `completionRatePct` is an engagement statistic
  (how often a shown visual challenge was completed), computed entirely
  separately from `masteryIntelligence.classify()`'s AT_RISK/FALSE_MASTERY
  thresholds and from `score`/`weight` on the underlying `EvidenceRecord`
  rows (still `weight: 0`, untouched).

## 4. Demonstration results

Verified end-to-end against the local dev server and the seeded demo
account (`shot.student@mytutor-demo.local`), persisting three fresh visual
sessions across three engines, then reading back the new profile/weakness
fields from the (now-extended) `GET /api/visual-mastery/persist` response:

```
POST graph         -> 200 {"saved":1}   (shown:4 interacted:4 completed:4)
POST geometry       -> 200 {"saved":1}   (shown:5 interacted:4 completed:4)
POST process_flow   -> 200 {"saved":1}   (shown:4 interacted:1 completed:1)
GET  -> 200

Visual Learning Profile:
  process_flow  shown:4 interacted:1 completed:1  completionRatePct: 25
  geometry      shown:5 interacted:4 completed:4  completionRatePct: 80
  graph         shown:4 interacted:4 completed:4  completionRatePct: 100

Weak Visual Areas:
  [{ visualType: "process_flow", shown: 4, completed: 1, completionRatePct: 25,
     recommendation: "Low completion on process_flow visuals (25%, 1/4) —
     consider revisiting process_flow-based practice." }]
```

Only `process_flow` (25%, below the 50% threshold) was flagged; `geometry`
(80%) and `graph` (100%) were correctly excluded — matching the brief's
own worked example pattern. Confirmed separately that this demonstration
produced **zero** new `TopicProgress` rows for the three demo topic slugs
used (`topicProgress.findMany(...)` returned 0 rows) — the new intelligence
read path is fully isolated from grading tables. Demo `EvidenceRecord` rows
were deleted after verification; no demo data was left behind.

## 5. Future adaptive-learning opportunities (Task 5 — review only, not implemented)

- **Revision suggestions** (`src/lib/school/adaptive/spacedRevision.ts`):
  `detectVisualWeaknesses()`'s output could one day filter or annotate
  `getDueRevisions()`'s results — e.g. surfacing "this due revision topic
  also has a weak `process_flow` visual" — as a read-only enrichment layered
  on top of the existing due-list, never by changing `advanceRevision()` or
  the interval schedule itself.
- **Concept review targeting**: topics where `VisualLearningProfile` shows
  high `shown` but low `completionRatePct` for a given engine could be
  matched against that topic's dominant visual type (via the
  `concept`/`visualType` pairing already embedded in persisted `notes`) to
  suggest *which* concept review to prioritize — a read of historical
  engagement, not a change to the review's content or scheduling logic.
- **Practice targeting**: a student with a low `process_flow` completion
  rate but high `graph`/`geometry` rates could be offered more
  `process_flow`-shaped practice questions specifically — distinct from
  `getWeakTopics()`'s mistake-severity-based targeting, since it targets a
  *visual representation gap* rather than a wrong-answer pattern, and could
  be surfaced as a supplementary signal alongside (never instead of) the
  existing weak-topics list.
- **Recommendations** (`getTopRecommendation()`'s 8-tier order): the
  weakness list could become a 9th, lowest-priority tier — "try this visual
  again" — only ever surfaced when none of the existing 8 tiers already
  produced a recommendation, preserving every existing tier's behavior
  exactly.

All four are described as *possible future reads* of
`VisualLearningProfile`/`detectVisualWeaknesses()` — none are implemented
this sprint, per the brief's "No implementation" instruction for this task.

## 6. Remaining gaps

- The weakness threshold (50%) is a fixed constant
  (`VISUAL_WEAKNESS_THRESHOLD_PCT`), not user- or grade-configurable —
  reasonable for this sprint's scope, but a future sprint may want it tuned
  per subject or student level.
- `buildVisualLearningProfile()` aggregates across a user's *entire*
  persisted history with no time-windowing (e.g. last 30 days vs.
  all-time) — a topic mastered visually months ago counts the same as one
  practiced yesterday. Acceptable for this sprint; worth revisiting if the
  "weak area" signal needs to reflect *recent* engagement specifically.
- The extended `GET /api/visual-mastery/persist` route computes `profile`
  and `weaknesses` from the same capped `take: 50` rows used for the raw
  `records` list (inherited from Sprint M), not the user's full history —
  fine for the dev viewer's demonstration purposes, but a dedicated
  full-history profile endpoint would be needed before any production
  surface (e.g. a future recommendation tier) consumes it.
- As with Sprint M, the route remains a normal authenticated route, not
  itself environment-gated — only `VisualMasteryViewer` and
  `/dev/visual-demo` hide the data from end users.
- No screenshots were captured of the extended viewer sections (same gap
  noted in Sprints L and M).

## Validation results

```
npx tsc --noEmit   -> clean, zero errors
npm run build      -> succeeded, exit code 0; all 82 pages generated;
                      /api/visual-mastery/persist present in the route list.
```

Sprint B–M functionality unchanged: no edits to any renderer, collector,
persistence adapter, or quiz component's scoring/control flow this sprint.
The only modified existing files are `src/app/api/visual-mastery/persist/route.ts`
(GET handler gains two additive response fields, `profile` and
`weaknesses`, computed from rows it already fetched — POST handler and
existing `records` field unchanged) and
`src/components/visuals/VisualMasteryViewer.tsx` (two new dev-only display
sections added; existing sections unchanged). All five audited Educational
Intelligence files (`learningNavigator.ts`, `learningOrchestrator.ts`,
`learningEffectiveness.ts`, `getDashboardV2Data.ts`, `spacedRevision.ts`,
`masteryIntelligence.ts`, `weakTopics.ts`) were not modified. `TopicProgress`,
`StudentProgress`, XP, pass/fail rules, and Tutor Max prompts were not read
or written by any new Sprint N code — confirmed directly during the
Section 4 demonstration (zero new `TopicProgress` rows from the
verification POSTs).
