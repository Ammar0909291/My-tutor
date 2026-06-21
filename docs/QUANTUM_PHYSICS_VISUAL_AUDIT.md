# Quantum Physics — Visual Learning Audit (Task 1)

**Status: audit only.** Maps the existing Visual Learning architecture and the additive registration
points for a Phase-1 quantum visual set.

## Summary / bottom line

The platform has two visual subsystems. The **VisualType / VisualCard** subsystem (Sprint BW + R/R.1
animation + S/T/U narration sync) is the step-based "teacher-at-a-whiteboard" engine — this is the one
Tasks 3–6 target. Adding a visual is **purely additive**: extend the `VisualType` union + metadata,
create a `revealStep`-gated SVG renderer, register it in the `VisualCard` switch + step-count map, and
optionally add detection keywords. No engine, hook, schema, or playback change is needed; narration
sync and mobile responsiveness come for free from `VisualCard`.

## 1. Components reviewed

| Component | Role | Quantum touch point |
|---|---|---|
| `lib/school/visuals/visualTypes.ts` | `VisualType` union, `VISUAL_META`, `VISUAL_SUBJECTS` | **+5 types, +meta, +'quantum_physics'** |
| `components/school/visuals/<Renderer>.tsx` | `revealStep`-gated SVG, reuses `visualAnim.module.css` | **+5 new renderers** |
| `components/school/visuals/VisualCard.tsx` | maps type→renderer; drives Sprint R.1 playback + S/T/U narration | **+5 switch cases, +5 step counts** |
| `lib/school/visuals/detectVisual.ts` | deterministic keyword → VisualType | **+QUANTUM_RULES, +quantum branch** |
| `hooks/useTeachingPlayback` + `lib/visuals/synchronizedPlayback` | timer + narration playback engine | **reused unchanged** |
| `lib/visuals/visualMastery*` (VisualSpec interactive subsystem) | challenge/assessment signals | **n/a — see §3** |

## 2. Registration points (additive only)

1. **Type + metadata** — one union member + `VISUAL_META` entry per visual.
2. **Renderer** — a `function X({ revealStep }: { revealStep?: number })` returning an SVG whose
   `<g>`/`<path>` groups are gated by `revealStep >= n` and animated via `anim.reveal` / `anim.drawLine`.
3. **VisualCard wiring** — a `case` in `VisualComponent` and an entry in `VISUAL_STEP_COUNTS` (the
   timeline length). The switch is exhaustive, so the compiler enforces completeness.
4. **Detection** — keyword rules + a `subjectSlug === 'quantum_physics'` branch; add the subject to
   `VISUAL_SUBJECTS`.

## 3. Visual Mastery compatibility

Visual **mastery/assessment** signals (Sprint G/L/M) belong to the *other* subsystem — the
interactive `VisualSpec`/`VisualRenderer` challenge renderers (drag-to-target). The VisualCard
teaching visuals (number_line, force_diagram, circuit_diagram, …) are **non-interactive teaching
diagrams** and do not emit mastery signals. The five quantum visuals are teaching visuals of exactly
this kind, so they reach **parity** with the existing teaching-visual set and require **no mastery
wiring or modification**. (Quantum subject-level mastery is already handled by the assessment
integration via `TopicProgress`.)

## 4. Required visual types (Phase 1)

Five `revealStep` SVG renderers: `double_slit`, `wave_function`, `potential_well`,
`quantum_tunneling`, `bloch_sphere` — covering the highest-difficulty conceptual nodes (duality,
Born rule, quantization, tunneling, qubits).

## 5. Safest integration strategy

- Additive registration only; the exhaustive `VisualComponent` switch makes omissions a compile error.
- Reuse `visualAnim.module.css` (already honors `prefers-reduced-motion`) and `VisualCard` (already
  responsive: `width:100%`, `maxWidth`, viewBox-scaled SVG) → mobile + a11y for free.
- Do **not** touch the school-gated `parseVisualTag`/`responseVisual` block in `learn/chat`
  (modifying it would redesign the Tutor Max response pipeline, out of scope). Quantum reaches full
  parity with the visual **registry**; runtime tag-emission in the `/learn` branch is a platform-wide
  concern deferred by design.
