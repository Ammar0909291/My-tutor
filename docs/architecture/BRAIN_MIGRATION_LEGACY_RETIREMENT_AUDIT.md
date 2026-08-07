# Brain Migration — Phase 5: Legacy Retirement Audit

**Status: DELETION PLAN ONLY. Nothing deleted, nothing disabled.**
Per the migration brief, retirement happens only *after* feature parity is
proven. Parity is **not** proven — see "Parity blockers" below — so every
legacy path listed here remains live and untouched.

## 1. Obsolete-on-parity orchestration paths

These are the paths the Brain would replace, *if* it could become the active
orchestration path. Each is currently the only working implementation.

| # | Path | File / anchor | Replaced by | Safe to delete? |
|---|---|---|---|---|
| L1 | Lesson-locked concept derivation (`convConceptId` from `currentLesson.topicSlug`) | `route.ts:309`, `route.ts:1949` | Concept Understanding Engine | **No** — the Brain cannot yet drive orchestration |
| L2 | Registry/keyword visual selection (`getConceptVisualType` → `detectVisual`) | `route.ts:2080-2087` | VIE → `VisualIntent` → ADR 12 | **No** — VKR covers 26 of ~1,656 concepts |
| L3 | LLM `VISUAL:` tag confirmation (`resolveResponseVisual`) | `route.ts:3098`, `visualRegistry.ts:686-734` | Deterministic VIE selection | **No** — depends on L2 |
| L4 | Text-driven scene generation (`planVisualTeaching`, `generateRoutedScene`, `buildSceneSpec`, `generateSceneSpec`) | `route.ts:3427-3494` | VIE (single visual owner) | **No** — this is the *second* live visual pipeline; retiring it needs VIE parity first |
| L5 | `detectLearnerRequest` 3-type request detection | `masteryGate.ts:231-238` | Teaching Planner intents | **Partial** — the Brain *consumes* this signal today; it is reuse, not duplication |
| L6 | Keyword visual rules | `detectVisual.ts` (`SCIENCE_RULES` etc.) | VKR patterns | **No** — sole coverage for ~1,630 concepts |

## 2. Deletion order (when, and only when, parity is proven)

Strictly dependency-ordered; each step gated on the one before it.

1. **L4** — retire the duplicate scene pipeline once the VIE demonstrably
   covers its cases. Removing the *second* pipeline first shrinks the blast
   radius before touching the primary one.
2. **L3** — remove the LLM-tag confirmation path once the VIE is the sole
   selector (nothing left to confirm against).
3. **L2 + L6 together** — they are one mechanism; splitting them would leave
   a registry with no fallback or a fallback with no registry.
4. **L1 last** — concept derivation is load-bearing for every other
   subsystem in `route.ts`, not just visuals. It must be the final removal.
5. **L5 never (as written)** — the Teaching Planner reuses it deliberately.
   Retire only if intent detection is fully absorbed, and even then the
   regexes are the behaviour of record.

## 3. Parity blockers (why nothing is deletable today)

| Blocker | Evidence |
|---|---|
| **B1 — Two of five subsystems have no implementation** | `lessonPlanner.ts` is a stub (`buildLessonPlan` returns an empty plan, `buildLessonPlanBlock` returns `''`); no assessment-generation entry point exists (`mcq.ts` is tag parsing + a prompt instruction). Production teaching is **one LLM call with an assembled system prompt**, not composable engines. |
| **B2 — VKR coverage is 26 / ~1,656 concepts (1.6%)** | Retiring L2/L6 would remove visuals from ~99% of concepts. |
| **B3 — Brain has never executed against a real request** | No DB, no LLM, and no live traffic reachable from this environment. |
| **B4 — No cross-turn persistence** | Excursion state, `deferredSteps` and `pendingSteps` die with the turn; resume-after-clarification cannot work yet. |
| **B5 — `WAIT_FOR_STUDENT` has undefined HTTP semantics** | Undecided what "waiting" means when a turn is a request/response cycle. |

## 4. What this migration *did* establish

- Dispatcher adapters exist and wrap **real** implementations for the three
  subsystems that have one (Explanation Memory, VIE, ADR 12).
- The two that do not are **declared unavailable**, not faked — they return
  null and the plan's own failure policy applies.
- The full brain composes end-to-end and the original Newton's-Second-Law bug
  is **fixed at the Brain level**, verified against the live physics KG.
- A real defect was found and fixed by testing against live data: KG titles
  carry glosses (`"Newton's Second Law — F=ma"`), and the matcher previously
  required the whole title, making those concepts unmatchable.

## 5. Recommended next step

Do **not** pursue deletion. The highest-value next work is closing **B1** —
either by extracting real Assessment/Lesson engines from the single-LLM-call
design, or by accepting that the Brain orchestrates *prompt assembly* rather
than discrete engine calls, and re-shaping the dispatcher contract to match.
That is an architectural decision, and it belongs to the owner.
