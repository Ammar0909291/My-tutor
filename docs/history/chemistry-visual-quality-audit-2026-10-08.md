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
