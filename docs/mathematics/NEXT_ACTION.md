# Next Action

## Status: INTEGRATION COMPLETE — Teaching Engine wired to 908-node KG

**Last updated: 2026-06-29**

## What Is Live (as of Steps A–D)

The 908-node canonical mathematics KG is fully wired into the application:

| Layer | Status | File |
|-------|--------|------|
| KG → KnowledgeNode adapter | LIVE | src/lib/curriculum/mathKgAdapter.ts |
| KG → ConceptNode (Teaching Engine) | LIVE | src/lib/curriculum/mathKgAdapter.ts |
| Difficulty union (expert, research) | LIVE | src/lib/education/educationTypes.ts |
| difficultyHours (expert=8h, research=12h) | LIVE | src/lib/curriculum/knowledgeGraph.ts |
| resolveNodes('mathematics') | 908-node | src/lib/curriculum/knowledgeGraph.ts |
| getKGNode() math.* IDs | 908-node | src/lib/curriculum/knowledgeGraph.ts |
| Validator baseline | PASS (warnings) | scripts/validate-knowledge-graph.ts |

## Validator Baseline (post-integration)

```
✓ Duplicate concept IDs
⚠ Broken edge references       1 aspirational cross-link (intentional)
✓ Disconnected nodes
✓ Cycle detection (requires DAG)
✓ Reachability from root nodes  908/908
⚠ Required field completeness   domain absent — adapter-derived (advisory)
⚠ Teaching Engine compat        concept_type absent — bloom-inferred (advisory)
✓ Difficulty / Bloom validity   expert/research now in Difficulty union
✓ Numeric field range sanity

Overall: PASS (with warnings)
```

## Advisory Warnings (not blocking)

1. **domain** — absent in raw graph.json; `mathKgAdapter.ts` derives it from
   the ID prefix (`math.found.xxx` → `math.found`) at runtime. No action needed.

2. **concept_type** — absent in raw graph.json; `mathKgAdapter.ts` infers it
   from bloom taxonomy (remember/understand→conceptual, apply→application,
   analyze/evaluate/create→problem_solving). Heuristic is reasonable for 908
   concepts but could be improved with expert classification per domain.

3. **aspirational cross-link** — `math.de.ode → math.phys.classical-mechanics`
   (documented in CHANGELOG.md; math.phys namespace is a future scope).

## CBSE Catalog Backward Compat

54-node `mathKnowledgeGraph.ts` is retained for:
- `educationGraph.ts` ALL_KG_NODES (catalog chapter→node ID mapping)
- `coverageAudit.ts`
- CBSE/UP math catalog kgNodeIds (e.g. `arithmetic.counting_numbers`)

These use different ID namespaces and are unaffected by the 908-node switch.

## Possible Next Steps (require explicit user instruction)

- **Teaching assets**: add explanations, visualizations, assessments,
  misconception data per concept in the 908-node KG
- **concept_type expert classification**: replace bloom heuristic with
  per-domain expert-assigned concept types
- **Cold-start fast-forward**: curriculum layer logic for students assessed
  above T0 to skip mastered prerequisite chains
- **Subject expansion**: repeat KG + adapter + wiring for physics, chemistry,
  biology using the new pattern established by mathematics
- **Hindi/Sanskrit**: per CLAUDE.md — do not touch without explicit instruction
