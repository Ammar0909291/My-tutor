# Excursion Prevalence Counter & Electric Dipole Visual (history)

> Extracted verbatim from CLAUDE.md during the 2026-09-17 memory-file
> collapse (CLAUDE.md kept to <500 lines of live rules). Dated entries below
> are historical record — read them for context, not as live instructions.
> Live rules remain in CLAUDE.md; see docs/history/INDEX.md for the full map.

## Excursion prevalence counter — the instrument, not the number (2026-09-03, `f9125ae`)

**Read `src/lib/teaching/excursionTelemetry.ts` and the proposal's §9 "Step 0"
table before writing any aggregation query.** The definitions live there so a
query and the code cannot drift.

Observability only. No excursion behaviour, gate, mastery, completion, grading
or content change; **no database write, no schema, no new table** — one
structured line per turn, `[learn/chat] EXCURSION_EVENT={…}`, emitted at the
single site that calls `decideExcursion` (route.ts, right after the existing
pretty `[excursion]` line), modelled on `BRAIN_EVENT`.

**The denominator is on every line, on purpose.** An event fires on EVERY turn
reaching the excursion decision, ordinary ones included (`kind:'none'`), so
eligible turns, eligible sessions, opens and closes come from ONE stream with no
join. Cost: ~230 bytes/turn of Vercel log volume beside the ~1 kB BRAIN_EVENT
that already fires. Not Supabase egress.

**`transition:'started'` is NOT the question "did an excursion open".** Found by
test, not by reading — excursion.ts's request branch emits
`active && state.targetConceptId !== requestedConceptId ? 'switched' : 'started'`,
so re-requesting the concept an excursion is ALREADY on yields `'started'` again.
A retry, or a learner asking twice, would have been counted as a second
excursion. `kind` is therefore derived from the PERSISTED prior state — an open
is a transition INTO an excursion — and the repeat is emitted as `kind:'restate'`
rather than hidden. Same class of trap: `turnsHeld` reads the PRIOR state,
because `decideExcursion` resets to NO_EXCURSION on a close, so the closing
decision's own counter is 0 and would have reported every excursion as zero
turns long. Both pinned by `excursionLifecycleTelemetry.test.ts` (35 tests
against the REAL decideExcursion driven turn by turn).

**PRODUCTION-VERIFIED** (dpl_A1oZ2VEo2Tvxx9b6utDL6hWKZNWq / `f9125ae`, session
`cmtkzjed50001kz0477h4xb8o`, account quiet beforehand — 0 spine_events in 15 min
— so no concurrent-session contamination). Six turns, five events read from
runtime logs: ordinary → `kind:'none'`; "Hold on — can you explain momentum to me
first?" → exactly ONE `kind:'open'`; two follow-ups → `kind:'continue'` (no
second open); "ok got it thanks" → exactly ONE `kind:'close'`,
`transition:'closed-satisfied'`, `turnsHeld:2`, `turnsBlocked:4`, `atBound:false`,
`anchorHeld:true`. `turnsHeld:2` matches `contextSnapshot->'excursion'` read from
the database mid-run (`{"turns":2,…}`) — verified against state, not just the log.
**PII:** the excursion opened on an UNRESOLVED TITLE, so the pretty `[excursion]`
line printed the learner's own words (`unresolvedTopic:'momentum to me first'`,
`requestedTopic:'direction matter for it'`) while every EXCURSION_EVENT carried
only `targetKind:'topic'` and no userId — the contrast is visible in the same log
block, beside a BRAIN_EVENT that does carry userId.

**PREVALENCE IS STILL NOT MEASURED, and must not be reported as if it were.**
The only traffic in the window is this session's own scripted verification;
computing a rate from it would measure the script. A population figure needs
organic learner traffic, and nothing in this repo aggregates Vercel logs (the
same limit `brainMetrics.ts` records for BRAIN_EVENT). **Do NOT revisit R2=6 on
this instrument's output until a real-traffic sample exists.**

**Known limits, stated not papered over:** two truly concurrent executions of the
same turn would both read the state as inactive and both emit an open (no
per-turn lock exists); a `switch` resets the counter, so `turnsBlocked` for a
switched excursion counts only since the last switch; a turn throwing before the
excursion decision emits nothing.


## Electric Dipole interactive visual (2026-09-06, commit `4683122`)
- Implemented the Physics Interactive Lesson Upgrade for `phys.em.electric-dipole`
  (previously unmapped to any visual — no existing visual type modelled a
  field-lines diagram). New `src/lib/teaching/sceneGenerators/electricDipole.pure.ts`,
  registered in the existing parametric-scene engine (`parametricScenes.ts`)
  exactly like `torque_diagram` — no new visualization framework. A learner
  moves θ, q, d, E (and, at the advanced complexity level, a uniform/non-uniform
  field choice) and the same pure builder re-derives the figure client-side:
  two charges + the dipole moment p = qd, forces on each charge (equal-and-
  opposite / net force exactly zero in a uniform field, genuinely unequal in a
  non-uniform one — net force derived from F ≈ p·(dE/dx)·cosθ, correctly zero
  again at θ=90° even in a non-uniform field since there is no component along
  the gradient), torque τ = pE sinθ (identical in both field types, since only
  the average field enters torque about the dipole's own centre), an
  equilibrium panel (θ=0° STABLE / θ=180° UNSTABLE, U = −pE cosθ), a predict-
  mode question, and one registered misconception contrast. Bound to the
  concept as concept-owned (`CONCEPT_SCENES`, not a shared kind default — it
  is the only concept on this generator). 42 new deterministic tests; physics
  visual coverage floor bumped 76→77; `CONCEPT_SCENE_OVERRIDES` count bumped
  16→17 (both pre-existing audit tests updated per their own established
  convention, not weakened). Full suite green, tsc clean, build clean.
- **Real-account production validation, same day.** Verified end-to-end against
  the deployed app (`my-tutor-flame.vercel.app`, confirmed via Vercel API to be
  running exactly commit `4683122`) using a real learner account: requesting a
  diagram served the genuine `electric_dipole` sceneSpec (q=4nC, d=3cm, E=8N/C,
  θ=60°, uniform); four authored MCQs were served and graded correctly across
  the run; the lesson reached `verified:true`, `phase:TRANSFER`,
  `checkCorrect:1`, `practiceCorrect:2`, `lessonComplete.complete:true` in 8
  real chat turns. τ=pE sinθ, U=−pE cosθ, and the uniform/non-uniform net-force
  model were independently re-derived from the exact deployed code at θ =
  0°/30°/60°/90°/120°/150°/180° using the account's own served parameters —
  exact agreement (θ=0°→τ=0 STABLE, θ=90°→τ=9.6×10⁻¹⁰ N·m max, θ=180°→τ=0
  UNSTABLE). No regressions observed (topic resolution, grading, mastery,
  no cross-subject excursion). One real, non-obvious finding: this account's
  own profile is `currentLevel: beginner`, under which the visual's adaptive-
  complexity policy (pre-existing, shared by every generator) shows only 2 of
  5 sliders (θ, q) and offers no Predict/Practice/Test-me mode chips — the
  field-type control and the visual's own predict toggle are reachable only at
  higher levels. This is intentional platform behaviour, not a defect, and was
  not bypassed. Chromium in this sandbox cannot reach the public internet
  (confirmed again: `ERR_CONNECTION_RESET` against the live domain, while
  plain HTTPS/fetch succeeds), so pixel-level UI verification used the
  byte-identical production code via the local dev server rather than the
  literal hosted page; production itself was driven over real HTTP the same
  way a real browser's requests would be. No code was changed as part of this
  validation.


