# Mathematics visual campaign — unregistered drafts (not compiled)

Text copies (`.txt`, so neither tsc nor vitest sees them) of work that was drafted but not yet installed when a session ended.

## Batch 39 (drafted 2026-10-12; 9 figures; audit-clean, 0 card-host label moves, tests NOT yet run)
- `mathCoreScenesB39.ts.txt` -> install as `src/lib/teaching/sceneGenerators/mathCoreScenesB39.ts`. Figures: differentiability-rigorous,
  taylor-rigorous, ftc-rigorous, measure, lebesgue-measure, measure-zero, convergence-theorems, lp-space, l2-space (ids `math.real.*` / `math.meas.*`).
- `mathCoreScenesBatch39.test-body.ts.txt` -> the body (`describe('the mathematics each figure draws', …)`) of `src/tests/mathCoreScenesBatch39.test.ts`.
  Create the file with `python3 scripts/math/campaign-tools/new-batch-test.py 39 mathCoreScenesB39 <concept>:<builder>:<scene id> …`, then replace the generated
  `describe('the mathematics each figure draws'` block with this body (it needs `import * as M …B39` only; helpers `toG`, `trapezoid`, `valueAt` are defined inside the body).
- Register the nine builders in `src/lib/teaching/visual/conceptSceneParams.ts` (one import block + one dated block, as for batch 38), raise the threshold in
  `src/tests/mathVisualCampaignAudit.test.ts` from 470 to 479, then run the normal per-batch loop in `docs/history/MATHEMATICS_VISUAL_HANDOVER.md`.
- The test body was written against the draft but has not been executed: expect to adjust tolerances (read-back noise, see the handover "rules / gotchas").
