# Teaching Strategy Engine Audit — Sprint H

## 1. Full Pipeline Audit: Question → Tutor Max → Concept Detection → Visual Detection → VisualSpecBuilder → Renderer

```
STUDENT types a message
   │
   ▼
POST /api/learn/chat  (src/app/api/learn/chat/route.ts)
   │  - loads session/curriculum/learner-profile context
   ▼
CONCEPT DETECTION (general curriculum/topic tracking — pre-existing, untouched)
   │  Several independent, general-purpose mechanisms decide "what topic is
   │  this turn about" and feed the AI's system prompt as text:
   │    - currentConceptNodeId / nextConceptNodeId — knowledge-graph topic
   │      pointer persisted on the session snapshot (Sprint BY/CH);
   │      conceptChanged check (route.ts ~line 1021)
   │    - detectWorkedExampleIntent(message, subjectCode) (route.ts ~line 546)
   │      → a `concept` string used to inject a worked-example block
   │    - detectMisconceptions(...) (Sprint CS, route.ts ~line 390) and
   │      evaluateConceptTransfer(...) (Sprint CT, route.ts ~line 406) —
   │      distinguish memorized procedure from real understanding
   │    - getTeachingStrategy(...) (src/lib/school/adaptive/teachingStrategy.ts,
   │      route.ts ~lines 447–455) — the existing, UNRELATED pedagogical-mode
   │      selector (FOUNDATION_REBUILD, MOMENTUM_RECOVERY, ...) that only
   │      ever feeds the AI system prompt as text instructions
   │  None of these mechanisms touch visuals. They all run before the AI
   │  call and shape what Tutor Max is told to say, not what gets rendered.
   ▼
Tutor Max (AI response, system prompt built from the above; prompt unchanged)
   │  → "cleanText"
   ▼
VISUAL DETECTION (Sprint C, unchanged)
   │  detectVisualConcept(cleanText)  (src/lib/visuals/visualConceptDetector.ts)
   │  — deterministic regex/keyword rules, no AI reasoning
   │  → DetectedConcept | null  (graph | number_line | triangle | rectangle
   │     | circle | angle | process_flow)
   ▼
TEACHING STRATEGY ENGINE (Sprint H — this sprint's subject)
   │  selectTeachingStrategy(cleanText, concept)
   │  (src/lib/visuals/teachingStrategy.ts)
   │  → VisualTeachingStrategy { explanation, visualization, interaction, assessment }
   │  Decides, deterministically, whether/how richly to present the concept
   │  Visual Detection already found — a separate question from "what
   │  concept is this turn about" (Concept Detection, above) or "what shape
   │  is mentioned" (Visual Detection, above).
   ▼
VisualSpecBuilder (Sprint C, unchanged — only invoked when strategy.visualization is non-null)
   │  buildVisualSpec(cleanText)  (src/lib/visuals/visualSpecBuilder.ts)
   │  → VisualSpec | null  (zod-validated via parseVisualSpec)
   ▼
Merge: strategy.interaction/assessment onto the spec, re-validate  (Sprint H)
   │  → VisualSpec | null
   ▼
JSON response { ..., visualSpec }
   ▼
Renderer  (VisualRenderer.tsx → GraphRenderer / NumberLineRenderer /
   GeometryRenderer / ProcessFlowRenderer — Sprint B–G, unchanged)
   ▼
STUDENT sees the tutor's explanation, plus a visual only if the strategy
called for one, interactive only if the strategy called for it, and graded
only if the strategy called for it.
```

**Key distinction this audit makes explicit**: "Concept Detection" and "Visual Detection" are two different, pre-existing, already-separate stages, not the same stage under two names.
- **Concept Detection** = general curriculum/topic-level understanding (what subject-matter idea is this turn about, has the student moved to a new node, do they actually understand it vs. just pattern-match it). Drives the *text* of Tutor Max's response via the system prompt. Lives in `src/lib/school/adaptive/*` and `src/lib/school/tutoring/*`.
- **Visual Detection** = a narrow, separate question asked only of the tutor's *finished* text: "does this prose contain a graphable equation / number-line comparison / named geometric shape / known science process?" Lives in `src/lib/visuals/visualConceptDetector.ts`. It has no awareness of curriculum nodes, mastery, or pedagogy — it is pure regex/keyword matching on a string.

The Teaching Strategy Engine sits strictly between Visual Detection and VisualSpecBuilder. It does not call or depend on Concept Detection in any way this sprint — that remains a documented future-compatibility opportunity (Section 4), not a current integration.

## 2. Current limitations (pre-Sprint-H)

1. **Detection is necessary but not sufficient for good pedagogy.** `detectVisualConcept()` fires whenever its keyword/regex rules match, regardless of whether a visual actually helps at that moment.
2. **No notion of interaction or assessment existed in the detection→build path at all**, despite Sprint F/G fully implementing `interactive`/`challenge` in every renderer and the zod schema — a student in a real lesson never saw a draggable graph or graded challenge before this sprint wired anything up.
3. **One-size-fits-all**: every detected concept got the same (absent) interaction/assessment treatment, with no notion of "this deserves manipulation" vs. "this deserves a quick illustration only."
4. **The existing adaptive Teaching Strategy** (`src/lib/school/adaptive/teachingStrategy.ts`) only ever fed the AI's system prompt as text; it had zero connection to the visual pipeline.
5. **No single seam to extend** — detection, building, and rendering were three separate, narrowly-scoped modules with no place to add "should this be a visual at all, and how rich should it be."

## 3. Decision gaps

- **No decision layer between "what was detected" and "what gets rendered."** Visual Detection answers *what* concept is present; the builder answers *how to represent it as data*; nothing answered *whether and how richly to present it*.
- **No deterministic mapping from concept type/task to interaction/assessment policy** — Sprint F/G proved per-renderer interaction/assessment is safe and regression-proof, but nothing decided *when* to turn those flags on for real chat traffic.
- **No formal, inspectable contract type** a future caller could produce and have the rest of the pipeline honor.

## 4. Future Universal Learning compatibility

See the Sprint H report's dedicated per-domain section (finance, programming, history, engineering, medicine) for the detailed review. In short: `selectTeachingStrategy(content, concept)` is pure and synchronous and can later accept additional optional context (a learner profile, a subject tag, a confidence/mastery signal, or eventually a Concept Detection output) without changing its output shape, so nothing downstream needs to change when Universal Learning adds new domains or richer detectors.

## 5. What Sprint H adds (forward reference — see the Sprint H report for full detail)

A new, additive module `src/lib/visuals/teachingStrategy.ts` introduces `VisualTeachingStrategy` (the contract), `selectTeachingStrategy(content, concept)` (the deterministic selector), and `planVisualTeaching(content)` (the integration point wired into `src/app/api/learn/chat/route.ts`).

No existing renderer, schema, detector, or builder function changed signature; no database, curriculum, or Tutor Max prompt changed.
