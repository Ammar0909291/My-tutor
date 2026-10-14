# Tutor Max — defects found by live QA on the Test7 account, and what was done about each (2026-10-14)

Two live production QA runs (one Physics + one Mathematics concept each, then a second pair) were driven on the
`Test7@gmail.com` account through the deployed app, with the figures observed in a real browser. The findings were listed
as D1–D15 plus R1 (a flaky test). "Fix all" was the instruction; this record says, per item, what was changed, what
evidence backs it, and what was deliberately NOT changed and why. Nothing here is a claim of production verification —
that is recorded separately in the live re-check section at the end, if and when it was run.

## Fixed (with regression tests)

| # | Defect | Root cause | Fix | Tests |
|---|---|---|---|---|
| D1 | "Read more" preview ended inside Markdown/LaTeX and showed raw `\(e^{z}=1 + z + \frac{z^{2}}{2!` / `**“η … = 0.` | `truncate()` in `LessonScreen` counted every `.`, `!`, `?` as a sentence end — decimals, factorials, abbreviations, and ends inside `**bold**`, `\(…\)`, `` `code` `` | `src/lib/learn/previewTruncate.ts`: a sentence end must be followed by whitespace/end, not sit inside a protected range (reuses `progressiveReveal`'s `computeProtectedRanges`/`isInsideProtected`, now exported), and not follow a known abbreviation | `previewTruncate.test.ts` (the two real production messages, the verbatim legacy function as a reproduction control, prose parity for n = 1..6, a 300-trial random balanced-marker property test, a wiring pin) |
| D2 | Euler's complex plane / Carnot P–V graph could be spun edge-on; every label then piled up | Labels are solved for one fixed camera; a full orbit makes every solved position false. There was also no way back | `orbit` prop on `ThreeDVisual`: a **planar** scene (`sceneOrbit.isPlanarScene` — all z equal in every step) gets a ±0.5 rad / ±0.35 rad window; a scene with real depth keeps the free orbit. A **Reset view** button (`data-reset-view`) appears once the camera has left the authored view (rotation, tilt, zoom or pan) and calls the controls' own `reset()` | `figureEngineDefects.test.ts` (Carnot / Euler / Frenet / torque are planar; vector-products and crystal packing stay free; one off-plane object in ANY step makes a scene free; wiring pins) |
| D4 | Carnot cycle: no direction arrows, no corner labels | The loop was four unlabelled curves | Carnot scene now has A–D corner labels, an arrowhead on each branch pointing the way the gas travels (A→B→C→D→A), narrations that walk the cycle, and an "enclosed area = net work W" note | `figureEngineDefects.test.ts` — each arrowhead is matched to its branch by exact point membership and its direction is checked against the corner order. **A mutation check caught a real bug in my first version (the D→A arrowhead was reversed)**; the test fails on that and passes on the fix |
| D5 | Tutor said "I can't make multiple-choice questions" while the app attached a card | The model is told never to write MCQs (`AUTHORED_ONLY_INSTRUCTION`) while the app still serves an authored card | `quizRequest.replaceQuizRefusal`: a short refusal paragraph that mentions a quiz is replaced by "Here is a quick check — choose an answer below."; the unanswered-card branch strips it before the lead. No-card branches unchanged | `tutorTextDefects.test.ts` |
| D6 | "the green arc labelled θ = 90°" over a torque figure whose arc is grey | The fidelity check asked only whether a colour was anywhere on screen (green was — as a label) | `figureFidelity.enforcePartColours`: if the scene has objects of the named kind and none carries the claimed colour, the colour word is removed ("the arc"). Ambiguous nouns, world colours and kinds with no objects are untouched. Wired into the chat route's `[figure-fidelity]` block | `tutorTextDefects.test.ts` (including route source pins) |
| D7 | θ label floated on the far side of the lever, away from its arc | Fixed offset (`end − 3`) | `angleLabelPosition`: on the arc's bisector at 1.55 × the arc radius | `figureEngineDefects.test.ts` (seven lever/force/angle cases: bearing within 1°, outside the arc, close to it) |
| D8 | Several identical "Check a common idea" chips | Same label for every registered contrast | With several, chips read "Check a common idea (i of n)" with the claim as `title` and in the accessible name; a lone chip is unchanged | `figureEngineDefects.test.ts` (source pins) |
| D9 | Inline KaTeX touched the words around it | No spacing | `margin: 0 0.1em` on inline math only; display math unchanged | `figureEngineDefects.test.ts` |
| D10 | `T_h`, `e^(iπ)`, `V_rms` drawn literally in figures | Plain text rendering | `scriptedText.splitScripts` + `ScriptedText` (used by `SceneLabel` and by the explainer's expression / narration / panel text). Conservative rules: `snake_case`, `a_b_c`, `$3.50`, a lone `^` are untouched. Script size is `max(10px, 0.72em)` — **the first version used a bare 0.72em and the physics re-audit FAILED Carnot at 8.3 px / 9.7 px (RD-01); the floor is the fix and is pinned** | `scriptedText.test.ts` (31) + `figureEngineDefects.test.ts` |
| R1 | `quickCheckClosePreservesAssessment` "3/4/5" timed out at 5 s on a cold full-suite run | Three route turns on a cold worker (the first imports the whole teaching engine) | Per-test timeout 30 s. Assertions unchanged | the test itself |

## Re-assessed, not changed

- **D3 (stage chips "do nothing")** — a misdiagnosis. The chips (Situation → Diagram → Relationship → Answer) are
  *representation views*, not step buttons; they work as designed (`representation.ts`). Making them look like step controls
  would be a UI redesign, which is out of scope. Reported rather than "fixed".
- **D14** — already fixed by another session (`3197d7d`) before this pass. No work.
- **D11 (small figures on a phone)** — the figure has an Expand control and `fitToCanvas`; shrinking is inherent to a 390 px
  column. No change.
- **D12 / D13** — wording quality of an LLM reply. Not deterministic; no code fix is honest here.
- **D15** — a transient frame while a path draws on. Not reproduced as a stable state; no change.
- **T1** — owner-requested, not a defect.
- **D7 remainder** — the τ label vs the axis gizmo can still touch at large F. Not addressed.

## Known limits

- Carnot's loop is inherently thin (enclosed area ≈ 9 % of its bounding box at Tc/Th = 0.6 for any volume ratio), so the
  "enclosed area" note sits beside the loop rather than inside it.
- The `desktop` viewport (1280 px) is not part of the committed physics audit (`mobile` + `desktop-column` only). Rendered
  once as an extra, `phys.mech.torque` / `rotational-dynamics` at θ = max show the "F = 10 N" label overlapping the lever
  (38 % of its box, a REVIEW finding). That code path (`forceLabel`) was not touched by this change; at θ = 180° the force
  points back along the lever. Not in the committed record, not fixed here.

## Audit gates

- Physics: `phys.mech.torque`, `phys.mech.rotational-dynamics` and `phys.therm.carnot-cycle` changed spec, so
  `physicsVisualAudit.test.ts` failed, naming exactly those three. Re-rendered in Chromium (mobile + desktop-column, dark +
  light), validated, merged with `merge-audit.ts`: all three PASS, 0 FAIL. The 41 other physics concepts whose labels now
  draw scripts were re-rendered the same way (see the section below if it is present).
- Mathematics / Chemistry audits: unchanged specs, tests pass.
