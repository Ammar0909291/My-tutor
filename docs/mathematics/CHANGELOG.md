# Mathematics Knowledge Graph — Changelog

## [1.0.1] — 2026-06-29 — VALIDATION LAYER + EDGE REPAIR

### Added
- `docs/mathematics/kg/validate.py` — structural validator: cycle detection (DFS), orphan audit, dependency integrity, learner-track model
- `docs/mathematics/kg/repair.py` — automated edge repair script
- `docs/mathematics/kg/cycle_report.json` — 0 cycles detected
- `docs/mathematics/kg/orphan_report.json` — 0 true orphans, 1 intentional root
- `docs/mathematics/kg/dependency_report.json` — 0 broken edges (after repair)
- `docs/mathematics/kg/learner_tracks.json` — T0–T4 five-tier progressive track model
- `docs/mathematics/kg/validation_summary.json` — machine-readable summary (PASS)

### Fixed — 156 broken edges repaired across 20 domain files
- 42 broken `requires` edges (slug mismatches: antiderivative→antiderivatives, partial-derivative→partial-derivatives, field-extensions→field-extension, etc.)
- 34 broken `unlocks` edges (missing targets: boolean-algebra→boolean-circuits, completeness-axiom→completeness, etc.)
- 80 broken `cross_links` (fixed 48, removed 32 aspirational/non-existent targets)

### Graph v1.0.1 Statistics
- Concepts: **908** (unchanged)
- Requires edges: **1,353** (unchanged — repairs were in-place substitutions)
- Unlocks edges: **665** (was 673 — 8 non-existent targets removed)
- Cross-links: **363** (was 386 — 23 non-existent targets removed)
- Aspirational cross-links: 1 (math.de.ode → math.phys.classical-mechanics, documented)

### Learner Tracks
| Track | Name | Concepts |
|-------|------|----------|
| T0 | Absolute Foundations | 140 |
| T1 | Pre-University Mathematics | 239 |
| T2 | Undergraduate Core | 314 |
| T3 | Upper Undergraduate / Early Graduate | 169 |
| T4 | Graduate / Research Mathematics | 46 |

---

## [1.0.0] — 2026-06-29 — CANONICAL MATHEMATICS KNOWLEDGE GRAPH v1 FROZEN

### Added — All 24 Domains Complete
- Domain 01: Mathematical Foundations — 82 concepts (math.found)
- Domain 02: Arithmetic — 58 concepts (math.arith)
- Domain 03: Number Theory — 36 concepts (math.nt)
- Domain 04: Algebra — 59 concepts (math.alg)
- Domain 05: Geometry — 69 concepts (math.geom)
- Domain 06: Trigonometry — 25 concepts (math.trig)
- Domain 07: Functions — 29 concepts (math.func)
- Domain 08: Sequences & Series — 21 concepts (math.seq)
- Domain 09: Calculus — 76 concepts (math.calc)
- Domain 10: Differential Equations — 56 concepts (math.de)
- Domain 11: Linear Algebra — 61 concepts (math.linalg)
- Domain 12: Probability — 49 concepts (math.prob)
- Domain 13: Statistics — 40 concepts (math.stats)
- Domain 14: Discrete Mathematics — 32 concepts (math.disc)
- Domain 15: Abstract Algebra — 37 concepts (math.abst)
- Domain 16: Real Analysis — 30 concepts (math.real)
- Domain 17: Complex Analysis — 31 concepts (math.cx)
- Domain 18: Topology — 23 concepts (math.top)
- Domain 19: Measure Theory — 13 concepts (math.meas)
- Domain 20: Functional Analysis — 18 concepts (math.fnal)
- Domain 21: Numerical Analysis — 16 concepts (math.num)
- Domain 22: Optimization — 16 concepts (math.opt)
- Domain 23: Graph Theory — 16 concepts (math.graph)
- Domain 24: Category Theory — 15 concepts (math.cat)
- Merged graph: `docs/mathematics/kg/graph.json`
- Project memory: ROADMAP.md, PROJECT_STATE.md, NEXT_ACTION.md, KNOWLEDGE_LOG.md, VALIDATION_REPORT.md, CHANGELOG.md

### Statistics
- Total concepts: **908**
- Total edges: **2,412** (1,353 requires + 673 unlocks + 386 cross-links)
- Level range: 0 (absolute beginner) — 7 (research mathematics)
- Difficulty range: foundational → developing → proficient → advanced → expert → research

### Commits
- 943ba0a — domains 01–03 + project memory
- 133c2b0 — domains 04–05
- f716aff — domains 06–08
- 73bb3f4 — domain 09
- (pushed) a954828
- 757adef — domain 10 + project memory update
- bf42036 — domain 11
- b3f42e9 — domain 12
- abc26f8 — domain 13
- a082714 — domain 14
- (pushed)
- b996178 — domain 15
- b14eed1 — domain 16
- 401559f — domain 17
- 5fdefbf — domain 18
- (pushed)
- e6dba86 — domains 19–20
- 8591d9a — domains 21–24
- (final push — graph.json + project memory freeze)
