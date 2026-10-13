# Chemistry visual quality audit — 2026-10-08 (history entry)

Full record, numbers and the REVIEW_REQUIRED list: `docs/qa/CHEMISTRY_VISUAL_QUALITY_AUDIT.md`. This file keeps the
things a future session must not have to rediscover.

**Final measured state (complete re-render on the final, merged code):** baseline 728 states / 82 instances = 448 PASS · 140 REVIEW ·
**140 FAIL** → final 820 states / 84 instances = **736 PASS · 84 REVIEW · 0 FAIL** (instances 35/21/26 → 55/29/0). The same figures
before merging `origin/main` (the Physics campaign's shared label solver) were 702/118/0.
Chemistry-semantic: 374 instances, 238 PASS · 136 REVIEW · 0 FAIL. Not committed to production by this pass (see QA doc §11).

## What was built (permanent)
* `scripts/chemistry/visual-audit/` — `inventory.ts` (real resolver, no DB/network), `semantic-audit.ts` (pure
  chemistry validators over every figure), `render-measure.mjs` (real Chromium, 1280/390, both themes, every
  stage/control; `--selftest` 22/22) and the dev page `/dev/chem-visual-audit` (404 in production).
* `src/lib/teaching/visual/chemistryFigureAudit.pure.ts` — deterministic validators; `PASS` is hard to earn on purpose
  (REVIEW_REQUIRED when anything claim-bearing is unverifiable).
* `src/lib/text/chemSpecies.pure.ts` — element table, species parser, figure-text typesetter, ligand charges.
* `typesetSceneChemistry.ts` (wired in `makeVisualAsset`, `chem.*` only), `chemistryAdmission.ts` (the one admission gate
  refuses a deterministic FAIL), `layoutStages.ts` (per-stage, budgeted layout predicate).

## Rules learned the hard way
* **The browser is the authority; the model is a quick filter.** `checkSceneLayout` checks every label at once and uses a
  992px "desktop" host; the real lesson canvas at 1280px in the harness replica is ~560px wide, and the renderer shows at
  most 9 labels at a time. The model over-predicted on some scenes and under-predicted desktop on others. Iterate with
  `render-measure.mjs --only '<glob>' --viewports 1280,390 --themes light --states default` (10-20 s per instance).
* **Do not edit the client import graph while the harness runs** (`layout.ts`, `parametricScenes.ts`, `ExplainerFigure*`,
  `SceneLabel*`, the `*.pure.ts` generators): HMR reloads the page mid-measurement. Develop in a `git worktree`.
* **Never `pkill -f 'next dev'` from a shell whose own command line contains that text** — it kills the shell (exit 144).
  Use `ps -eo pid,args | grep '[n]ext dev'`.
* **A CSS variable that is valid for one property can be invalid inside another.** `--fig-scene-h: none` is valid for
  `max-height` but makes `min-height: min(260px, var(--fig-scene-h))` invalid; an invalid inline declaration computes to
  `auto` and still beats the stylesheet, so the floor vanished and fullscreen at 390px shrank the scene to 223x167.
* **A verifier written against ASCII labels silently becomes a no-op (or a false FAIL) once figures are served typeset.**
  The audit now verifies a notation-neutral view; `chemistryAdmission.test.ts` pins verdict/verified/FAIL parity for all
  29 authored scenes before and after typesetting.
* **Bare `x^2` must not be treated as raw LaTeX in the critic**: `figureText()` includes a graph's `equation`.
* Do not run the full vitest suite while still editing test or source files: a file imported mid-edit fails spuriously.
* **Keep "decorative" findings as REVIEW, do not wave them off.** `CLIPPED_AWAY` (text in the DOM but outside the frame) was
  274 baseline REVIEWs, nearly all invisible axis letters — and one was the third hydrogen of ammonia. Perspective: a point
  `z` nearer the camera is magnified by `d/(d−z)`, so a fit computed from x/y alone pushes near atoms out of the canvas
  (`fitSceneToFrame` now counts it; the blast radius was measured as exactly NH₃ and CH₄ out of 463 scenes and 129 picker builds).
* **Desktop label type is ~15.5px, a phone's is 11.5px, in canvases of about the same height.** A ladder that fits at 390px can
  be unfittable at 1280px — which is why Born–Haber passed on the phone and failed on the desktop. Anchor lanes to the content
  actually drawn (Hess's Law descends from 0: anchoring the title to the scale ceiling wasted eight units and shrank every label).
* **A shared layout cannot know the viewport**: a longer outward label offset fixed the desktop and ran a 23-character label 31px
  off a 282px phone canvas; the right-hand offset therefore stays at the bar edge.
* Contrast sampling must exclude the control's own border (it is a "second background" otherwise), and a failure produced only
  by a minority background bucket while the dominant background and the ring both pass is REVIEW, not FAIL.
* **Two campaigns edited the same shared files in parallel** (the Physics visual audit and this one: `layout.ts`, `asset.ts`,
  `figureCritic.ts`, `SceneLabelLayer.tsx`, `VisualPlaybackControls.tsx`) and had independently built the same wrap-to-fit label
  solver and the same `--on-accent` fix. Fetch `origin/main` before starting shared-renderer work, not only before pushing; at
  the merge the upstream solver (a superset) won and the duplicate was dropped. Re-run the browser audit after a merge — the
  shared solver changed what Chemistry looks like (contrast reviews 98 → 61).
* The pin `figureFitsOneViewport.test.ts` asserted `--fig-scene-h: none`; the pinned value was the bug. Read what a test pins
  before treating it as a requirement.

## Not done (see the QA doc §8)
Tier 2/3 figures cannot be enumerated offline; the advanced level shows every label at once (Born–Haber at phone width);
the expanded view scrolls (the chrome is taller than the window); labels on saturated 3D fills read through a halo, not WCAG
contrast; figure reference data (ΔH, IE, EA, standard potentials…) is checked for consistency only; molecule figures draw no lone pairs or bond order; domain-default cards claimed at `domain` scope; the seed probe
for `chem.elect.industrial` has an unbalanced equation (`C + O²⁻ → CO₂ + 4e⁻`) — content, owner's call.


---

# Follow-up — Chemistry visual closure (2026-10-09 → 2026-10-12)

Full record, R1–R19 dispositions, numbers and the owner-decision list: `docs/qa/CHEMISTRY_VISUAL_QUALITY_AUDIT.md` §12. The baseline above is
preserved unchanged. This section keeps what a future session must not have to rediscover.

**Final measured state (merged code):** 186 concepts classified (E served 100 · D 59 · B 14 · A 13); 134 audited instances (Tier 0/1 + 47 variants + 45
Tier 2/3), 1,086 rendered states = **990 PASS · 96 REVIEW · 0 FAIL**; 81 REVIEW figures carry a human decision (22 PASS · 23 FIXED→PASS · 36
REVIEW_REQUIRED). CI now re-checks the record: `chemistryVisualAudit.test.ts`, `chemistrySemanticReview.test.ts`.

## What was built (permanent)
* `scripts/chemistry/visual-audit/` gained `tier23Replay.ts` (+ CLI `tier23-resolve.ts`): the REAL `resolveVisualForTurn` over a read-only cache client backed by the
  committed production snapshot, so Tier 2/3 are enumerable offline; `final-audit.ts` (the committed record and the per-state manifest).
* `retired.ts` `RETIRED_GENERATED_FIGURES`: one specific cached figure, named by content fingerprint, refused on every tier **without** retiring its concept.
* `chemistryFigureAudit.pure` per-molecule verification (several molecules per figure, D/T isotopes), lone-pair and bond-order checks, graph-domain repair
  (`repairChemistryPayload`); `bondGeometry.ts` (parallel bonds); the opt-in `captioned` layout of the comparison generator.

## Rules learned the hard way
* **The semantic-moat doctrine governs `RETIRED_VISUAL_BINDINGS`.** Retiring "unfaithful" domain-default cards (20 rows added in a first pass) broke 12 pinned tests,
  correctly: inert figures are kept and demoted, only a HARMFUL one (it depicts the position the concept refutes) is retired. A *wrong generated figure* is a different
  thing and has its own table keyed by content.
* **A figure can pass every collision check and still be unreadable.** In the legacy comparison layout, 40–55 character items made one column's captions interleave with the
  next group's: no overlap, but no way to tell which caption belonged to which header. Read the screenshots, not only the finding counts.
* **The layout model is a filter, the browser is the authority** (again): the model passed the R18 `b` label that the browser measured clipped and colliding at 1280 px.
* **A CSS variable that exists nowhere is silent.** `GraphRenderer` used `var(--surface, #0d1117)`; `--surface` is defined nowhere, so every halo was near-black.
* **An independent reviewer finds what the author cannot**: the dry cell called "electrolytic", "8 g O : 1 g H" as exact, Tyndall shown as unique to colloids, a PLA label with no
  composting condition. Give a reviewer the figure text only (not your conclusion), and re-read after each rewrite.
* **A generated figure is never edited in place**, and an approved (Tier 2) row is production data: both are reported with prepared corrections, not changed.
* **A Tier 0 scene shadows an approved row and many tests use `chem.found.significant-figures` as the no-figure concept** — do not "fix" a Tier 2 figure by authoring one.
* **Do not trust a background job across a worker restart**: use `setsid nohup … < /dev/null`, re-check the dev server (`curl /dev/chem-visual-audit`) before every render, and
  regenerate the manifest before re-rendering (a stale manifest renders stale scenes).
* Long vitest filters (`src/tests/visual src/tests/chem …`) are substring filters over all files: ~4 minutes, 119 files.

## Production verification follow-up (2026-10-13) — what the deployed run found that the local audit could not
Deployed `5465509` (READY, `my-tutor-flame.vercel.app`); the browser harness ran 35 concepts × 390/1280 px × both themes, with disposable accounts (all deleted). Tier 0/1
fingerprints on the wire equal the checkout's for every concept measured (20, 0 mismatches). Four findings, recorded in QA doc §12.3/§12.4/§13:
* **Periodic Trends drew only text** (`chem.period.modern-periodic-law`, `chem.period.periodic-properties`): ST-03 fired in production, and the *local* render had called it PASS in 28 states because
  `render-measure.mjs` does not measure canvas ink. Fixed (each atom is a sphere to the scale of its calculated radius) and gated statically (`chemistryClosureGates.test.ts`: no Chemistry scene may hold only
  labels). 31 instances re-rendered, 148 PASS.
* **Tier-2 approved figures are not restored after a reload** (code reading: the restore paths read Tier 0/1 and the Tier-3 cache, never the approved `visual_assets` row). Not changed — session persistence; owner decision.
* **Retired concepts regenerate figures** (3 of 6 sampled). A content fingerprint cannot stop a new generation. Owner decision: author the 14 or add a pre-generation withhold.
* **A header label can sit on its sphere** (colloids). Not machine-detectable (WebGL pixels). A larger gap was tried, did not help and was reverted: the cause is framing headroom (Biology-only `fitToCanvas`).

Re-verified after the deploy (`6fe384b`, `dpl_8xJhAhCHsRz7gCvnGWVUjwHjAdR5`): the three periodic/control concepts passed 12/12 at 390/1280 px in both themes with the audited fingerprint on the wire. The tutor's own text quoted a different radius for Cl (99 pm, covalent) than the figure's calculated 79 pm — recorded in QA §13.1, not a figure defect.

## Rules learned the hard way (production follow-up)
* **A local audit is a model of production, not production.** Run the deployed harness before calling a visual set closed; it found a defect in the one figure family whose machine verdict was a clean PASS.
* **A check you did not run is not a PASS.** The local render has no ink check; the new static gate states the property directly instead of waiting for a browser to see it.
* **Do not "fix" a layout symptom by turning the nearest constant.** The gap change moved nothing and made the expanded view overflow; measure what moves before keeping it.

## Closure (2026-10-13)
The Chemistry visual quality audit is CLOSED at `a2138c9` (CI `validate` success, production deployment READY). The nine open owner decisions are consolidated in
QA doc §14; closing the audit does not resolve them. No Chemistry work is queued until a new defect or an explicit owner instruction.

## Not done (see QA doc §14)
33 MINOR Tier-3 figures, the two Tier-2 flows, the chelate-effect chart's data and the R1 production row await owner decisions; the 14 retired-as-wrong concepts
have no figure; production verification is recorded in QA doc §13.
