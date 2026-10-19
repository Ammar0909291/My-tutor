# My Tutor — Computer Science Curriculum Gap Expansion Audit

**Date:** 2026-10-20  
**Repository:** `Ammar0909291/My-tutor`  
**Branch:** `cs/kg-cs2023-expansion-2026-10-20-v2`  
**Scope:** Computer Science only  
**Status:** KG expansion authored; automated repository validation pending

## Executive summary

The original CS graph contained 119 concepts across 17 domains. A separate CS-only main-branch update added six mathematical-foundation concepts while this work was being prepared. This branch preserves those concepts and adds 20 further concepts without duplicating their IDs. The resulting graph contains **145 concepts across 25 domains**.

This is a practical coverage audit against the CS handover's undergraduate outcomes and common CS2023-style knowledge areas, not a formal accreditation determination or a claim of exhaustive clause-by-clause CS2023 conformance.

## Gap matrix

| Knowledge area / outcome | Existing coverage before this expansion | Status before change | Implemented action | Priority |
|---|---|---|---|---|
| Discrete mathematics, proof, sets, relations, functions, counting | Newly added discrete mathematics, proof/induction, sets/relations/functions, and counting concepts now exist on main | Partial | Retained the six-concept mathematical update; added explicit formal logic and linear algebra | Critical |
| Probability, statistics, and linear algebra for ML/graphics | Probability and statistics concepts now exist on main; linear algebra was not explicit | Partial | Retained existing probability/statistics; added linear algebra and wired ML to both statistics and linear algebra | Critical |
| Machine-level programming and performance measurement | CPU architecture and pipelining existed, but assembly, profiling, benchmarking, and speedup analysis were not explicit | Partial | Added assembly/machine-code execution and performance benchmarking | High |
| Programming paradigms, type systems, semantics, compiler construction | Intro programming mentioned paradigms; theory had grammars, but no progressive language/compiler path | Partial | Added paradigms, type systems/semantics, compiler/interpreter design | High |
| Parallel computing and concurrency models | OS threads and synchronization existed; parallel performance and concurrency models were not explicit | Partial | Added parallel-computing fundamentals and concurrency models | High |
| Distributed systems, replication, consistency | Networking, cloud, and ACID existed, but distributed failure/consistency were not explicit | Missing as dedicated outcomes | Added distributed-systems fundamentals and replication/consistency | High |
| Human-computer interaction, usability, accessibility, evaluation | No dedicated HCI concept | Missing | Added HCI and usability | Medium |
| Computer graphics and rendering | No dedicated graphics concept | Missing | Added computer graphics fundamentals | Medium |
| Requirements engineering and system architecture | SDLC and design patterns existed, but requirements and architecture decisions were not explicit | Partial | Added requirements specification and software architecture | High |
| Debugging, reliability, defensive programming | Exception handling and testing existed separately | Partial | Added integrated debugging/reliability/defensive programming | High |
| Secure software engineering | Security topics existed, but secure-by-design workflow and threat modelling were not explicit | Partial | Added secure software engineering | High |
| Symbolic AI and responsible ML evaluation | ML models existed; symbolic AI and responsible evaluation were underrepresented | Partial | Added AI search/planning, knowledge representation, responsible ML evaluation | High |
| Bloom's `create` outcomes and assessed synthesis | Original graph had no concepts classified as `create` | Missing in KG classification | Three design/build-oriented concepts now use `create` | High |

## Concepts added by this branch

### `cs.math`
- `cs.math.propositional-predicate-logic`
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

- Existing concept IDs were preserved; the six mathematical concepts already present on current main were retained.
- The `unlocks` arrays were regenerated from `requires` to guarantee exact inverse relationships.
- The original root remains `cs.found.intro-computers`.
- Seven new domain keys were registered in the generic knowledge-graph bridge as CS-specific labels; the existing `cs.math` domain is retained from the concurrent main update.
- The canonical 10-field concept schema and six-level difficulty taxonomy are unchanged.
- Introductory machine learning now explicitly depends on statistics and linear algebra.
- Three design-oriented concepts use Bloom's `create`, which must later be supported by authored project tasks and assessment rubrics.

## Validation performed

Content-level structural checks on the proposed graph found:
- 145 concepts with unique IDs.
- 25 domains.
- 192 prerequisite edges and 192 matching inverse unlock entries.
- No missing prerequisite references.
- No prerequisite cycles detected by topological traversal.
- 145/145 concepts reachable from the single root.
- Exact 10-field schema retained for every concept.

The repository validator, TypeScript smoke test, type-check, and production build have not yet been run. Their outcomes remain unverified.

## Not included / remaining work

The CS teaching-assets file remains at 119 entries and its entries were previously reported as placeholders. This branch does not create placeholder assets for missing concepts and does not claim complete instructional content. New and existing concepts still need blueprints, complete teaching assets, Educational Brain coverage where required, meaningful assessments, and learner-flow QA.

No Mathematics, Physics, Chemistry, Biology, or English curriculum files were edited. Shared generated progress/state files were deliberately left untouched because they contain other-subject data.

## Recommendation

The expanded KG is a stronger curriculum map, but it is not yet teaching-ready. Before calling the curriculum complete, run the repository validator and updated CS smoke test, then author the missing CS instructional layers and assess outcomes with practical programming and design tasks.
