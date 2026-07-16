# Physics Educational Package — Corpus Audit

**Generated:** 2026-07-16
**Pipeline:** `compileBlueprintToPackage` (Blueprint Front-End, unchanged) + `validateEducationalPackage` (Package Runtime, unchanged)
**Scope:** every `phys.*.md` file in `docs/curriculum/blueprints/` — 217 files

## Summary

| Metric | Count | % of corpus |
|---|---|---|
| Total blueprint files | 217 | 100% |
| Successfully compiled (semantic validation + lowering passed) | 212 | 97.7% |
| Failed to compile | 5 | 2.3% |
| Compiled AND deterministic AND schema-valid (production-ready artifact written) | 212 | 97.7% |
| Compiled but flagged (non-deterministic or schema-invalid — NOT written) | 0 | 0.0% |
| Warnings emitted (non-blocking) | 0 | — |

## Failed compiles — by diagnostic code

| Code | Meaning | Files | Example |
|---|---|---|---|
| BFV04 | broken misconception reference | 5 | `phys.therm.first-law`: docs/curriculum/blueprints/phys.therm.first-law.md: teaching action "TA-4" references "MC-ADIABATIC-IS-ISOTHERMAL", which is not defined in  |

## Failed compiles — full detail

### `phys.therm.first-law`
- **[BFV04]** docs/curriculum/blueprints/phys.therm.first-law.md: teaching action "TA-4" references "MC-ADIABATIC-IS-ISOTHERMAL", which is not defined in the Misconception section (defined: MC-ADIABATIC-MEANS-CONSTANT-TEMPERATURE, MC-WORK-IS-ONLY-MECHANICAL)

### `phys.therm.heat-transfer`
- **[BFV04]** docs/curriculum/blueprints/phys.therm.heat-transfer.md: teaching action "TA-6" references "MC-ALL-MECHANISMS-SAME", which is not defined in the Misconception section (defined: MC-HEAT-IS-A-SUBSTANCE, MC-CONDUCTION-CONVECTION-RADIATION-SAME-RATE)

### `phys.therm.phase-transitions`
- **[BFV04]** docs/curriculum/blueprints/phys.therm.phase-transitions.md: teaching action "TA-6" references "MC-LATENT-HEATS-SAME", which is not defined in the Misconception section (defined: MC-TEMPERATURE-RISES-DURING-PHASE-CHANGE, MC-LATENT-HEAT-SAME-FOR-ALL-TRANSITIONS)

### `phys.therm.second-law`
- **[BFV04]** docs/curriculum/blueprints/phys.therm.second-law.md: teaching action "TA-6" references "MC-ONLY-FOR-HEAT", which is not defined in the Misconception section (defined: MC-SECOND-LAW-IS-JUST-FIRST-LAW-RESTATEMENT, MC-SECOND-LAW-ONLY-APPLIES-TO-HEAT)

### `phys.therm.zeroth-law`
- **[BFV04]** docs/curriculum/blueprints/phys.therm.zeroth-law.md: teaching action "TA-8" references "MC-THERMAL-EQUILIBRIUM-TRIVIALLY-CIRCULAR", which is not defined in the Misconception section (defined: MC-ZEROTH-LAW-TRIVIAL, MC-THERMAL-EQUILIBRIUM-IS-SAME-TEMPERATURE-TRIVIALLY)

## Compiled but not written (determinism or schema-validity failure)

None. Every successfully compiled package is deterministic and schema-valid.

## Legacy / corpus anomalies (not compiler failures)

- `phys.mech.collisions`: authored blueprint has NO corresponding entry in `docs/physics/kg/graph.json` (216 concepts). Compiles fine as a standalone file (compile status: OK) but is not reachable via canonical KG traversal — a legacy/superseded blueprint, not a parser or content defect. Left untouched per "do not edit blueprint content" — flagged for an authoring-level decision (merge into its successor or formally retire).

## Asset issues — Knowledge-Layer lowering coverage gaps

Every package below compiled, is deterministic, and is schema-valid — these are NOT compilation failures. Each blueprint listed HAS the relevant content authored, under a section title (or internal block format) `assetLowering.ts` (the Knowledge-Layer lowerer) does not yet recognize, so the resulting package carries zero assets of that kind despite the source content existing. This is the same class of gap the parser-grammar-coverage pass closed in `parser.ts`, now surfacing one layer up in the Blueprint Front-End — reported per mission scope, not fixed (`assetLowering.ts` is part of "the compiler" this mission says not to change).

### core_explanation: 65 packages affected

Unrecognized section titles carrying real explanation content:

- "Concept Explanation (Multi-Tier)" — 20 packages (e.g. `phys.em.capacitance`)
- "Concept Explanation Blocks" — 16 packages (e.g. `phys.em.ac-basics`)
- "Narrative Spine" — 15 packages (e.g. `phys.therm.calorimetry`)
- "Concept Explanation (Multi-Level)" — 14 packages (e.g. `phys.em.electromagnetic-waves`)

### worked_example: 33 packages affected

All 33 have a section titled "Worked Examples" whose internal per-example header uses a bold-paragraph form (e.g. `**WE-1 (Foundational — venturi meter)**`) that `lowerWorkedExamples` does not match (it recognizes `### Example N —` / `### WE-N —` heading-level blocks, and a Concept-Spine-embedded `**Worked Example N (...)**` bold form — a third bold-abbreviated shape is unrecognized). Affected, e.g.: `phys.mech.bernoulli`, `phys.mech.buoyancy`, `phys.mech.center-of-mass`, `phys.mech.circular-motion`, `phys.mech.collisions-elastic`, `phys.mech.collisions-inelastic`, +27 more.

Remaining zero-asset packages for each kind (69 for core_explanation, 73 for worked_example) have genuinely no such section authored — not a lowering gap.

## Warnings (non-blocking, informational)

None.

