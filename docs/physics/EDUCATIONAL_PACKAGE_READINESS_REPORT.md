# Physics Educational Package — Production Readiness Report

**Generated:** 2026-07-16
**Scope:** Educational Package corpus for Physics (`brain/packages/phys.*.package.json`) — the compiled artifact layer consumed by the Package Runtime, distinct from the earlier blueprint-injection-era report (`PHYSICS_PRODUCTION_READINESS.md`).

## Package coverage

**212/217 (97.7%)** physics blueprints have a validated, deterministic DRAFT Educational Package artifact in `brain/packages/`.

Of the 217 authored blueprint files, 216 correspond 1:1 to the 216-concept canonical Physics KG (`docs/physics/kg/graph.json`); 1 (`phys.mech.collisions`) is a legacy file superseded by `phys.mech.collisions-elastic`/`phys.mech.collisions-inelastic` and outside canonical KG traversal (see Corpus Audit).

## Asset coverage (within production-ready packages)

Total assets lowered: **3604** across 212 packages. Total dispatch rules lowered: **1438**.

| Asset kind | Packages with ≥1 asset of this kind | Coverage |
|---|---|---|
| core_explanation (optional per spec) | 78/212 | 36.8% |
| learning_objective (optional per spec) | 23/212 | 10.8% |
| worked_example (optional per spec) | 106/212 | 50.0% |
| misconception (mandatory — guaranteed by semantic validation) | 212/212 | 100.0% |
| teaching_action_meta (mandatory — guaranteed by semantic validation) | 212/212 | 100.0% |
| mastery_probe (optional per spec) | 197/212 | 92.9% |
| adaptive_rule (optional per spec) | 66/212 | 31.1% |
| session_flow (optional per spec) | 48/212 | 22.6% |
| teaching_note (optional per spec) | 114/212 | 53.8% |
| reference (optional per spec) | 50/212 | 23.6% |

**Asset-lowering coverage gaps (not content gaps):** of the packages with zero `core_explanation` assets, **65** have the content authored under an unrecognized section title ("Concept Explanation (Multi-Tier)" / "Concept Explanation Blocks" / "Concept Explanation (Multi-Level)" / "Narrative Spine") — a Knowledge-Layer lowerer coverage gap, not a content gap. Of the packages with zero `worked_example` assets, **33** have a "Worked Examples" section whose bold-paragraph internal header format (`**WE-1 (...)**`) is unrecognized by `lowerWorkedExamples`. See Corpus Audit "Asset issues" for the full breakdown. Both are reported findings, not fixed, per this mission's "do not change the compiler" scope.

## Compiler coverage

**97.7%** of the physics corpus parses and lowers successfully through the Blueprint Front-End (212/217). This equals the parser-grammar-coverage figure measured in the prior grammar-expansion session (212/217 at the format-recognition level) — every file that PARSES also fully COMPILES here; the 5 that don't fail at semantic validation only (broken misconception cross-references, BFV04), not at parsing.

Within the 212 compiled packages, the Knowledge-Layer (asset) lowerer has its own, narrower coverage gap: **65** packages have real core-explanation content the lowerer doesn't recognize by section title, and **33** have real worked-example content under an unrecognized internal block format (see Asset coverage above and Corpus Audit "Asset issues"). Rule-Layer (dispatch) lowering is unaffected — every teaching action is captured regardless of these two title/format gaps.

## Remaining blockers before Physics is fully production-ready

1. **5 blueprint(s) fail to compile** — see Corpus Audit "Failed compiles" for exact diagnostics. These are genuine content-authoring inconsistencies (e.g. a misconception cited under a paraphrased id that shares no contiguous token run with any defined slug), not parser gaps; per mission scope, blueprint content was not edited.
2. **65 package(s) missing core_explanation assets despite having the content authored** — a Knowledge-Layer (`assetLowering.ts`) section-title recognition gap, not a compile failure or content gap. Fixing requires extending `lowerCoreExplanation`'s title regex to recognize "Concept Explanation (Multi-Tier/Level/Blocks)" and "Narrative Spine" — out of scope for this mission ("do not change the compiler"); flagged for a follow-up pass.
3. **33 package(s) missing worked_example assets despite having a "Worked Examples" section authored** — a Knowledge-Layer internal-block-format recognition gap (bold-paragraph `**WE-1 (...)**` headers unrecognized). Same fix boundary as above — out of scope here.

Outside package-compilation scope (unchanged by this pass, per mission "do not activate / do not touch runtime"):
- DRAFT → ACTIVE promotion / `packRegistry` activation — not performed, per mission and standing governance.
- Package Runtime wiring into the live serving path (`ENABLE_PACKAGE_RUNTIME`) — out of scope; runtime untouched.
- Non-textual extension points (diagrams/animations/simulations) — `extensionPoints` remains empty-by-construction for every package, as designed in Phase 1.5.

