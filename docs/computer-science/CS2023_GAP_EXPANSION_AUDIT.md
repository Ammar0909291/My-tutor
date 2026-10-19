# My Tutor — Computer Science Curriculum Gap Expansion Audit

**Date:** 2026-10-20  
**Repository:** `Ammar0909291/My-tutor`  
**Branch:** `cs/kg-cs2023-expansion-2026-10-20`  
**Scope:** Computer Science only; read-only comparison followed by CS-only KG changes  
**Status:** KG expansion authored; automated repository validation pending

## Executive summary

The previous canonical graph had 119 concepts across 17 domains. It provided a useful introductory-to-university-introductory structure, but important undergraduate outcomes were absent or not explicit in the graph. This expansion adds 24 concepts and 8 domains, bringing the graph to 143 concepts across 25 domains.

The audit is an explicit coverage review against the topic areas named in the CS handover and common undergraduate CS outcomes. It is not a claim of formal accreditation or exhaustive clause-by-clause CS2023 conformance.

## Gap matrix and implemented response

| Knowledge area / outcome | Previous graph coverage | Status before change | Action in this change | Priority |
|---|---|---|---|---|
| Discrete mathematics, logic, sets, relations, functions, combinatorics | No dedicated CS mathematics domain; some prerequisites were implicit in algorithms/theory | Partial | Added 5 concepts in `cs.math` | Critical |
| Probability, statistics, and linear algebra for ML/graphics | No explicit CS-local foundations | Missing as explicit CS concepts | Added 2 concepts; wired both as prerequisites for introductory ML | Critical |
| Machine-level programming and performance measurement | CPU architecture and pipelining existed, but assembly, profiling, benchmarking, and Amdahl-style reasoning were not explicit | Partial | Added 2 concepts in `cs.arch` | High |
| Programming paradigms, type systems, semantics, compiler construction | Intro programming mentioned paradigms; theory had grammars, but no progressive language/compilers path | Partial | Added 3 concepts in `cs.lang` | High |
| Parallel computing and concurrency models | OS threads and synchronization existed; parallel performance and models were not explicit | Partial | Added 2 concepts in `cs.parallel` | High |
| Distributed systems, replication, consistency | Networking, cloud, and ACID existed, but distributed failure/consistency were not explicit | Missing as dedicated outcomes | Added 2 concepts in `cs.dist` | High |
| Human-computer interaction, usability, accessibility, evaluation | No dedicated HCI concept | Missing | Added `cs.hci.human-computer-interaction` | Medium |
| Computer graphics, transformations, rendering pipeline | No dedicated graphics concept | Missing | Added `cs.graphics.computer-graphics` | Medium |
| Requirements engineering and system architecture | SDLC and design patterns existed, but requirements and architecture decisions were not explicit | Partial | Added 2 concepts in `cs.se` | High |
| Debugging, reliability, defensive programming | Exception handling and testing existed separately | Partial | Added 1 integrated engineering concept in `cs.se` | High |
| Secure software engineering | Security topics existed, but secure-by-design workflow and threat modelling were not explicit | Partial | Added 1 concept in `cs.sec` | High |
| AI search, planning, knowledge representation, responsible ML evaluation | ML models existed; symbolic AI and evaluation/responsibility outcomes were underrepresented | Partial | Added 3 concepts in `cs.ai` | High |
| Bloom's `create` outcomes and assessed synthesis | Existing graph had no concepts classified as `create` | Missing in KG classification | Three design/build-oriented concepts now use `create` | High |

## New concept IDs

### `cs.math`
- `cs.math.discrete-mathematics`
- `cs.math.propositional-predicate-logic`
- `cs.math.sets-relations-functions`
- `cs.math.combinatorics`
- `cs.math.probability-statistics`
- `cs.math.linear-algebra`

### `cs.arch`
- `cs.arch.assembly-machine-code`
- `cs.arch.performance-analysis`

### `cs.lang`
- `cs.lang.programming-paradigms`
- `cs.lang.type-systems-semantics`
- `cs.lang.compilers-interpreters`

### `cs.parallel`
- `cs.parallel.parallel-computing`
- `cs.parallel.concurrency-models`

### `cs.dist`
- `cs.dist.distributed-systems`
- `cs.dist.consistency-replication`

### `cs.hci`
- `cs.hci.human-computer-interaction`

### `cs.graphics`
- `cs.graphics.computer-graphics`

### Existing domains expanded
- `cs.se.requirements-specification`
- `cs.se.software-architecture`
- `cs.se.debugging-reliability`
- `cs.sec.secure-software-engineering`

### `cs.ai`
- `cs.ai.search-planning-reasoning`
- `cs.ai.knowledge-representation`
- `cs.ai.ml-evaluation-responsibility`

## Prerequisite and architecture notes

- Existing concept IDs were preserved.
- `unlocks` arrays were regenerated from `requires` so the two edge directions remain exact inverses.
- The original root remains `cs.found.intro-computers`.
- New domains are registered in `src/lib/curriculum/knowledgeGraph.ts`; no other subject adapter or label was changed.
- The graph retains its exact 10-field concept schema and canonical difficulty taxonomy.
- Three design-oriented concepts use Bloom's `create`; this classification still needs to be matched by authored assessments and projects.

## Validation performed

Content-level structural checks on the proposed graph found:
- 143 unique concepts.
- 25 domains.
- 188 prerequisite edges and matching inverse unlock edges.
- No missing prerequisite references.
- No prerequisite cycles detected by topological traversal.
- 143/143 concepts reachable from the single root.
- Exact 10-field schema retained for every concept.

The repository validator, TypeScript smoke test, type-check, and production build have not yet been run in this session. Their outcomes remain unverified.

## Not included / remaining work

This change intentionally does **not** create teaching-asset placeholders or claim complete instructional content. The existing CS teaching-assets file still contains 119 entries, all previously reported as placeholders, while the graph now contains 143 concepts. New and existing concepts still need blueprints, complete teaching assets, Educational Brain coverage where required, meaningful assessments, and learner-flow QA.

No files for Mathematics, Physics, Chemistry, Biology, or English were changed. The shared global progress/state files were deliberately left untouched because they contain other-subject data and are generated artifacts.

## Recommendation

The expanded KG is a stronger structural curriculum map, but it is not yet ready to be declared teaching-ready. Before treating the new concepts as production-complete, run the repository validator and updated CS smoke test, then author the missing CS instructional layers and assess each outcome against practical programming/design tasks.
