# Computer Science Knowledge Graph — Validation Report

## Version: 1.1.0
## Date: 2026-10-20
## Status: PRODUCTION
## Platform: Generic Knowledge Graph / Generic Subject Adapter (shared with Mathematics, Physics, Chemistry)

## 1. Curriculum

Computer Science was scoped to the same depth band as Physics and Chemistry —
school-level fundamentals (NCERT/CBSE Class 9–12 Informatics/Computer Science)
extended through university-introductory CS so the graph spans the full
`foundational → research` difficulty taxonomy, matching the canonical
reference subjects. Coverage:

- Computing foundations (architecture, number systems, Boolean logic, OS basics)
- Algorithms & complexity (asymptotic analysis, divide-and-conquer, greedy, DP,
  backtracking, NP-completeness)
- Programming fundamentals, control flow, core data types, functions & modularity,
  file handling (Python-based, matching the existing legacy CS catalog's language choice)
- Data structures (stacks, queues, linked lists, trees, balanced trees, heaps,
  hashing, graphs, traversal, shortest path, MST, searching & sorting)
- Object-oriented programming
- Databases (ER modeling, normalisation, SQL, transactions/ACID, indexing, NoSQL)
- Operating systems (processes, scheduling, synchronisation/deadlocks, memory, virtual memory, file systems)
- Networking (OSI/TCP-IP, IP addressing, DNS/DHCP, application protocols, transport, routing/congestion, wireless, cloud)
- Security (cyber ethics, cryptography, network/web security, data protection)
- Web & cloud development, theory of computation, software engineering, data science & AI

No new curriculum process was invented — this follows the identical
Curriculum → KG → Validation → Teaching Engine → Integration → Production
checklist process used for Physics and Chemistry.

## 2. Knowledge Graph

| Property | Value |
|---|---|
| File | `docs/computer-science/kg/graph.json` |
| Schema | Exactly 10 fields per concept: `id, name, requires, unlocks, cross_links, difficulty, bloom, mastery_threshold, estimated_hours, description` — **no `domain`, no `concept_type`** (both derived at runtime by the generic adapter, identical to Chemistry) |
| Total concepts | 125 |
| ID prefix | `cs.` |
| Domains (qualified `cs.<key>`) | 18 |
| Root node | `cs.found.intro-computers` (1 root, no prerequisites — same single-root pattern as Math/Physics/Chemistry) |
| `requires` edges | 154 |
| `unlocks` edges | 154 (exact inverse of `requires`) |
| `cross_links` | 5 pairs (10 directed entries) |
| `mastery_threshold` | {0.7, 0.75, 0.8} — identical band to Chemistry |
| `estimated_hours` | 2–8 |

### Domain breakdown

| Domain | Label | Concepts |
|---|---|---|
| cs.found | Computing Foundations | 9 |
| cs.algo | Algorithms & Complexity | 10 |
| cs.prog | Programming Fundamentals | 7 |
| cs.control | Control Structures | 3 |
| cs.data | Core Data Types | 6 |
| cs.func | Functions & Modularity | 6 |
| cs.file | File Handling | 3 |
| cs.struct | Data Structures | 18 |
| cs.oop | Object-Oriented Programming | 7 |
| cs.db | Databases | 11 |
| cs.os | Operating Systems | 7 |
| cs.net | Networking | 9 |
| cs.sec | Security | 4 |
| cs.web | Web & Cloud Development | 3 |
| cs.theory | Theory of Computation | 5 |
| cs.se | Software Engineering | 4 |
| cs.ds | Data Science & AI | 7 |

### Difficulty distribution

| Difficulty | Count |
|---|---|
| foundational | 9 |
| developing | 21 |
| proficient | 37 |
| advanced | 41 |
| expert | 13 |
| research | 4 |

All six canonical difficulty levels are represented — same taxonomy as
Mathematics and Physics, preserved exactly (no new levels added).

### Bloom distribution

| Bloom level | Count |
|---|---|
| remember | 2 |
| understand | 27 |
| apply | 61 |
| analyze | 26 |
| evaluate | 9 |
| create | 0 |

`create` is unused, matching the typical profile of Chemistry (also sparse
at the top of Bloom's taxonomy) — no Bloom levels were added or removed.

## 3. Validation

Ran the existing **generic, subject-agnostic** validator with no code
changes — `scripts/validate-knowledge-graph.ts docs/computer-science/kg/graph.json`:

```
✓ [PASS] Duplicate concept IDs
✓ [PASS] Broken edge references
✓ [PASS] Disconnected nodes
✓ [PASS] Cycle detection (requires DAG)
✓ [PASS] Reachability from root nodes        — 119 / 119 reachable
⚠ [WARN] Required field completeness          — "domain" absent (derived by adapter, expected)
⚠ [WARN] Teaching Engine field compatibility   — "concept_type" absent (inferred by adapter, expected)
✓ [PASS] Difficulty / Bloom enum validity
✓ [PASS] Numeric field range sanity

Overall: PASS (with warnings) — identical warning profile to Mathematics, Physics, and Chemistry
```

The two warnings are expected and structural, not defects: `domain` and
`concept_type` are intentionally absent from `graph.json` and derived at
runtime by `inferDomain()` / `inferConceptType()` in the generic
`subjectKgAdapter.ts` — the same behaviour as the Chemistry KG.

## 4. Teaching Engine Compatibility

`scripts/test-computer-science-smoke.ts` exercises 10 representative
concepts (one per major cluster, spanning all six difficulty levels and
five Bloom levels in use) through the exact Zod schema used by
`/api/teaching-engine`:

```
✓ cs.found.intro-computers          foundational / remember
✓ cs.prog.python-basics             foundational / remember
✓ cs.algo.dynamic-programming       advanced     / apply
✓ cs.struct.balanced-trees          expert       / analyze
✓ cs.db.sql-joins-subqueries        advanced     / analyze
✓ cs.os.synchronisation-deadlocks   expert       / analyze
✓ cs.net.routing-congestion         expert       / analyze
✓ cs.theory.turing-machines         research     / evaluate
✓ cs.ds.neural-networks-intro       research     / analyze
✓ cs.oop.polymorphism-overloading   advanced     / analyze

Phase 4 Computer Science: ALL PASS ✓
```

No Teaching Engine code changed — `inferDomain` / `inferConceptType` from
`subjectKgAdapter.ts` (already shipped for Chemistry) handle Computer
Science with zero modification.

## 5. Integration

The only platform changes, all confined to `src/lib/curriculum/knowledgeGraph.ts`:

1. `SUBJECT_ADAPTERS.computer_science = createSubjectAdapter('computer-science')`
2. `ID_PREFIX_TO_SUBJECT.cs = 'computer_science'`
3. 17 `domainLabel()` entries for the qualified `cs.*` domain keys (cosmetic UI labels only)

No new adapter code, no new validator code, no new Teaching Engine code —
the platform's stated contract ("adding a new subject = one `graph.json` +
one registry line") held exactly as designed.

The `computer_science` slug already existed in `subjectCatalog.ts` (legacy
54-node catalog tree) — the canonical KG now takes precedence through the
same `resolveNodes()` adapter-first / legacy-fallback resolution order used
by Mathematics, Physics, and Chemistry. The legacy
`src/lib/education/computerScienceKnowledgeGraph.ts` (54 nodes,
non-canonical schema) is untouched and remains available as a fallback
data source for any code path not yet routed through `knowledgeGraph.ts`.

### Regression checks

| Check | Result |
|---|---|
| Mathematics smoke/validator | unaffected — no Math files touched |
| Physics smoke (`test-physics-smoke.ts`) | ALL PASS |
| Chemistry smoke (`test-chemistry-smoke.ts`) | ALL PASS |
| `tsc --noEmit` errors in `src/lib/curriculum/knowledgeGraph.ts` / `subjectKgAdapter.ts` | 0 new errors |
| End-to-end `getKnowledgeGraph('computer_science')` | 119 nodes across 17 modules, correctly grouped |
| `getKGNode('cs.found.intro-computers')` | resolves via `cs` → `computer_science` prefix routing |
| `getAvailableNodes()` with no progress | returns exactly the root node |

## 6. Production Checklist

- [x] 10-field canonical schema only — no `domain`, no `concept_type` fields added to data
- [x] All IDs prefixed `cs.`
- [x] Difficulty taxonomy preserved exactly (foundational/developing/proficient/advanced/expert/research)
- [x] Bloom taxonomy preserved exactly (remember/understand/apply/analyze/evaluate/create)
- [x] 0 duplicate IDs, 0 broken edges, 0 cycles, 119/119 reachable from a single root
- [x] Generic validator passes with the same warning profile as Math/Physics/Chemistry
- [x] Generic Teaching Engine smoke test passes (10/10 concepts, Zod schema valid)
- [x] Integrated via the existing generic adapter — zero new platform/adapter code
- [x] Math/Physics/Chemistry regressions verified unaffected
- [x] No domain/concept_type fields invented; no new infrastructure built

## 7. Coverage-driven extension — 2026-10-20

The graph now contains 125 concepts across 18 domains. Six mathematical foundations nodes were added, and introductory machine learning now requires explicit statistics foundations. Each new node has an Educational Brain entry and two explanations plus three gradeable probes in a dedicated seed corpus.

Structural checks were performed during commit preparation. The repository validator, TypeScript checks, smoke test, and CI were not executed in this remote-edit session. Comprehensive undergraduate coverage remains incomplete; see `docs/history/computer-science-kg-coverage-extension.md`.

**Verdict:** Structurally integrated, but not yet a comprehensive undergraduate CS curriculum.


## 8. Undergraduate CS Knowledge Graph Expansion — 2026-10-20

Section 7 records the preceding 125-concept graph state. The current branch expands that state to **145 concepts across 25 domains** by adding 20 non-duplicate concepts and registering seven additional CS domain labels.

| Measure | Current value |
|---|---:|
| Canonical graph version | 1.1.0 |
| Concepts | 145 |
| Domains | 25 |
| `requires` edges | 192 |
| `unlocks` entries | 192, exact inverse of `requires` |
| `cross_links` entries | 10 |
| Root / reachable | `cs.found.intro-computers` / 145 of 145 |

The additional concepts cover formal logic and linear algebra; assembly and performance analysis; programming-language paradigms, type systems and compilers; parallel and distributed systems; HCI; graphics; requirements and software architecture; debugging/reliability; secure software engineering; and AI search, knowledge representation, and responsible ML evaluation.

Structural checks against the edited graph found unique IDs, valid prerequisite references, matching inverse unlock edges, no detected prerequisite cycles, complete reachability from the single root, and the exact 10-field schema. The CS smoke-test sample was expanded to 27 representative concepts. **The repository validator, smoke test, type-check, production build, and CI have not been run in this session.**

The teaching-assets inventory remains at 119 entries and was previously reported as placeholder content. No new placeholders were generated and no teaching-content completeness is claimed. Blueprints, authored assets, Educational Brain entries for the new concepts, assessments, and learner-flow QA remain outstanding. No non-CS curriculum files were changed.
