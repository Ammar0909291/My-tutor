# Blueprint Classification Schema v1.0

**Document type:** Permanent classification standard
**Status:** FROZEN
**Date:** 2026-07-11
**Scope:** All Teaching Blueprints — current and future — across all subjects in the Educational Brain

---

## 1. Purpose

The Blueprint Classification Schema defines the canonical metadata layer that sits above the Knowledge Graph (KG) and above each Teaching Blueprint file. Its sole function is to enable:

- **Search** — find blueprints by subject, domain, bloom level, difficulty, tags
- **Retrieval** — look up one blueprint by its canonical concept ID
- **Analytics** — count, aggregate, and report on the blueprint corpus
- **Recommendation** — feed the Teaching Engine's concept-selection logic
- **QA** — track which blueprints are validated, reviewed, and production-ready
- **Future AI retrieval** — supply structured metadata to embedding/retrieval pipelines

A classification record contains NO teaching content. It is a pointer and descriptor — never a duplicate of the KG or blueprint it describes.

---

## 2. Governing Principles

**P-1 — One source of truth per fact.**
Every fact exists in exactly one location. The KG owns concept facts (name, difficulty, bloom, prerequisites, etc.). The blueprint owns teaching content (TAs, misconceptions, protocols, validation results). The classification record owns only what is in neither.

**P-2 — Derived means computed, never authored twice.**
If a field value can be deterministically computed from the KG or blueprint, it is DERIVED. It must not be manually entered in the classification record. If a derived value conflicts with its source, the source wins.

**P-3 — The blueprint_id is the only shared key.**
`blueprint_id` (= the KG concept ID) is the foreign key that links the three layers. It is the only field that appears in both the KG and the classification record — as a pointer, not a duplicate.

**P-4 — Classification is read-only with respect to content.**
The classification record never describes WHAT a blueprint teaches. It describes WHAT KIND of thing the blueprint is. No concept definitions, no TA descriptions, no misconception labels.

**P-5 — Schema fields must be stable for years.**
Each field must have a stable definition that does not depend on curriculum decisions, teaching strategy revisions, or framework updates. Fields that would change when the Teaching Blueprint Specification changes do not belong in the classification.

**P-6 — This schema is not another Educational Brain.**
It must not replicate KG graph topology, teaching strategy, or any system already designed in the Educational Brain Architecture (ADRs 05-14). It is metadata, not intelligence.

---

## 3. What Already Exists — Do Not Duplicate

### 3.1 Fields owned by the Knowledge Graph

The following fields exist in the KG for all six subjects. They must NOT be authored or stored in the classification record. The classification record derives summary statistics from them only where explicitly specified.

| KG Field | Type | Present in all subjects |
|---|---|---|
| `id` | string | YES |
| `name` | string | YES |
| `description` | string | YES |
| `difficulty` | string enum | YES |
| `bloom` | string enum | YES |
| `mastery_threshold` | float | YES |
| `estimated_hours` | float | YES |
| `requires` | list[string] | YES |
| `unlocks` | list[string] | YES |
| `cross_links` | list[string] | YES |
| `aliases` | list[string] | Some subjects (math, eng, phys) |
| `parent` | string | Some subjects (math, eng, phys) |
| `children` | list[string] | Some subjects (math, eng, phys) |
| `related` | list[string] | Some subjects (math, eng, phys) |
| `references` | list[string] | Some subjects (math, eng, phys) |

### 3.2 Content owned by the Teaching Blueprint

The following are in the blueprint file. They must NOT appear in the classification record.

- Component 0: Concept profile (mirrors KG + derived CPA/session cap — both already in the blueprint)
- Component 1: Learning objective
- Component 2: Prerequisite verification
- Component 3: Misconception registry (labels, descriptions, MAMR detail)
- Component 4: All student state protocols with TAs, primitive sequences, P49 branches
- Component 5: Prerequisite chain verification table
- Component 6: Cross-link bridge map (full text)
- Component 7: P91 compound reference
- Component 8: GR compliance table (all 10 GRs)
- Component 9: AIR test (all 5 AIR items with rationale)
- Component 10: All 20 V-check results individually

The classification record derives SUMMARY STATISTICS from components 3, 4, 9, and 10. It does not store their content.

### 3.3 Data owned by the Runtime (Database)

The following belong to the student-facing runtime. They are not classification data.

- Student mastery scores per concept
- Session history and progress
- Spaced repetition schedule (P89) per student per concept
- ConceptMasteryRecord, EvidenceRecord, SessionMemory (ADR 10)
- Recommendation signals and orchestration state (ADR 11)

---

## 4. Field Definitions

The schema has **28 fields** organized into four groups:

| Group | Fields | Owned by |
|---|---|---|
| Identity | 1 | Classification |
| KG-Derived | 10 | KG (read-only copies) |
| Blueprint-Derived | 12 | Blueprint (computed summaries) |
| Classification-Native | 5 | Classification (genuinely new) |

---

### Group A — Identity (1 field)

---

#### A-1 · `blueprint_id`

| Attribute | Value |
|---|---|
| **Purpose** | Primary key; links this classification record to the KG concept and the blueprint file |
| **Definition** | The canonical KG concept identifier. Identical to the `id` field in the KG concept record. Used to locate the blueprint file at `docs/curriculum/blueprints/{blueprint_id}.md` |
| **Allowed values** | Any valid KG concept ID — pattern: `{prefix}.{domain_segment}.{concept_slug}` where prefix ∈ {math, phys, chem, bio, cs, eng} |
| **Data type** | string |
| **Owner** | Classification record (as foreign key to KG) |
| **Source** | KG concept `id` field — verified to exist before classification |
| **Authored or derived** | Authored once, at classification creation |
| **Mandatory or optional** | MANDATORY |
| **Uniqueness** | Must be unique across the entire classification registry. One classification record per KG concept. |
| **Validation rule** | The concept ID must exist in the KG for its subject. The file `docs/curriculum/blueprints/{blueprint_id}.md` must exist. |
| **Examples** | `math.found.abstraction`, `phys.mech.velocity`, `eng.phonics.phonemic-awareness` |

---

### Group B — KG-Derived (10 fields)

These fields are computed from the KG at classification time. The KG is authoritative. If the KG changes, these values must be recomputed. They are stored in the classification record for search and analytics efficiency only — never edited manually.

---

#### B-1 · `subject`

| Attribute | Value |
|---|---|
| **Purpose** | Identifies which subject corpus this blueprint belongs to; primary filter for subject-scoped search |
| **Definition** | The human-readable subject name corresponding to the ID prefix of `blueprint_id` |
| **Allowed values** | `mathematics`, `physics`, `chemistry`, `biology`, `computer_science`, `english` |
| **Data type** | string enum |
| **Owner** | KG (derived via subject prefix registry) |
| **Source** | First segment of `blueprint_id`, mapped via Subject Registry (Section 5.1) |
| **Authored or derived** | DERIVED |
| **Mandatory or optional** | MANDATORY |
| **Derivation rule** | `blueprint_id.split('.')[0]` → Subject Registry lookup |
| **Examples** | `math.*` → `mathematics`; `phys.*` → `physics`; `eng.*` → `english` |

---

#### B-2 · `domain_id`

| Attribute | Value |
|---|---|
| **Purpose** | Identifies the domain within the subject; enables domain-scoped analytics and curriculum coverage tracking |
| **Definition** | The machine-readable domain segment — the second dot-delimited segment of `blueprint_id` |
| **Allowed values** | Any valid second segment of a KG concept ID for the subject (e.g., `found`, `arith`, `geom`, `mech`, `therm`) |
| **Data type** | string |
| **Owner** | KG |
| **Source** | `blueprint_id.split('.')[1]` |
| **Authored or derived** | DERIVED |
| **Mandatory or optional** | MANDATORY |
| **Examples** | `math.found.*` → `found`; `phys.mech.*` → `mech`; `eng.phonics.*` → `phonics` |

---

#### B-3 · `domain_label`

| Attribute | Value |
|---|---|
| **Purpose** | Human-readable domain name for display and search; avoids requiring domain_id decoding by consumers |
| **Definition** | The full English name of the domain, sourced from the KG's `domains` registry array |
| **Allowed values** | Any `domain_name` value from the KG `domains` array for the subject. For subjects whose KG lacks a `domains` registry, derives from domain_id via the Domain Label Fallback table (Section 5.2) |
| **Data type** | string |
| **Owner** | KG |
| **Source** | KG `domains[*].domain_name` where `domains[*].id_prefix` matches the concept's subject prefix + domain_id |
| **Authored or derived** | DERIVED |
| **Mandatory or optional** | MANDATORY |
| **Examples** | `found` → `Mathematical Foundations`; `mech` → `Mechanics`; `phonics` → `Phonics` |

---

#### B-4 · `bloom_level`

| Attribute | Value |
|---|---|
| **Purpose** | Enables filtering by Bloom's Taxonomy level; feeds bloom-distribution analytics and Teaching Engine strategy selection |
| **Definition** | The Bloom's Taxonomy cognitive level at which this concept is taught, verbatim from the KG |
| **Allowed values** | `remember`, `understand`, `apply`, `analyze`, `evaluate`, `create` |
| **Data type** | string enum |
| **Owner** | KG |
| **Source** | KG concept `bloom` field |
| **Authored or derived** | DERIVED |
| **Mandatory or optional** | MANDATORY |

---

#### B-5 · `bloom_tier`

| Attribute | Value |
|---|---|
| **Purpose** | Two-tier grouping of Bloom levels for coarse filtering and analytics (Lower-Order Thinking vs. Higher-Order Thinking) |
| **Definition** | LOT = Lower-Order Thinking (remember, understand, apply); HOT = Higher-Order Thinking (analyze, evaluate, create) |
| **Allowed values** | `LOT`, `HOT` |
| **Data type** | string enum |
| **Owner** | Classification |
| **Source** | Derived from `bloom_level` via mapping: {remember, understand, apply} → LOT; {analyze, evaluate, create} → HOT |
| **Authored or derived** | DERIVED |
| **Mandatory or optional** | MANDATORY |

---

#### B-6 · `difficulty_string`

| Attribute | Value |
|---|---|
| **Purpose** | Verbatim difficulty label from KG for human display and exact-match filtering |
| **Definition** | The difficulty level as authored in the KG concept record |
| **Allowed values** | `foundational`, `developing`, `proficient`, `advanced`, `expert`, `research` |
| **Data type** | string enum |
| **Owner** | KG |
| **Source** | KG concept `difficulty` field |
| **Authored or derived** | DERIVED |
| **Mandatory or optional** | MANDATORY |

---

#### B-7 · `difficulty_integer`

| Attribute | Value |
|---|---|
| **Purpose** | Numeric difficulty for range queries, sorting, and mathematical operations (e.g., "all blueprints with difficulty ≥ 3") |
| **Definition** | Integer mapping of `difficulty_string` per the canonical difficulty scale |
| **Allowed values** | 1, 2, 3, 4, 5, 6 |
| **Data type** | integer |
| **Owner** | Classification |
| **Source** | Mapped from `difficulty_string` via: foundational=1, developing=2, proficient=3, advanced=4, expert=5, research=6 |
| **Authored or derived** | DERIVED |
| **Mandatory or optional** | MANDATORY |

---

#### B-8 · `mastery_threshold`

| Attribute | Value |
|---|---|
| **Purpose** | Used by analytics to report threshold distribution across the corpus; cross-referenced with Evidence Engine scoring |
| **Definition** | The mastery threshold fraction (0.0–1.0) from the KG, representing the minimum score for concept mastery |
| **Allowed values** | Any float in [0.0, 1.0] |
| **Data type** | float |
| **Owner** | KG |
| **Source** | KG concept `mastery_threshold` field |
| **Authored or derived** | DERIVED |
| **Mandatory or optional** | MANDATORY |

---

#### B-9 · `estimated_hours`

| Attribute | Value |
|---|---|
| **Purpose** | Used to verify session_ta_cap derivation and to compute corpus-wide coverage estimates |
| **Definition** | Estimated learning hours for this concept, from the KG |
| **Allowed values** | Any positive float |
| **Data type** | float |
| **Owner** | KG |
| **Source** | KG concept `estimated_hours` field |
| **Authored or derived** | DERIVED |
| **Mandatory or optional** | MANDATORY |

---

#### B-10 · `prerequisite_count`

| Attribute | Value |
|---|---|
| **Purpose** | Indicates dependency complexity; used to identify entry-point concepts (count=0) vs. deeply-chained concepts |
| **Definition** | The number of direct prerequisite concepts listed in the KG `requires` array for this concept |
| **Allowed values** | Any non-negative integer |
| **Data type** | integer |
| **Owner** | KG |
| **Source** | `len(KG_concept.requires)` |
| **Authored or derived** | DERIVED |
| **Mandatory or optional** | MANDATORY |

---

### Group C — Blueprint-Derived (12 fields)

These fields are computed by reading the blueprint file. The blueprint is authoritative. All are DERIVED — never authored in the classification record.

---

#### C-1 · `cpa_entry_stage`

| Attribute | Value |
|---|---|
| **Purpose** | Identifies where on the Concrete-Pictorial-Abstract continuum a student enters this blueprint; enables CPA-filtered search |
| **Definition** | The CPA stage at which Protocol A begins, as stated in the blueprint Component 0 |
| **Allowed values** | `C` (Concrete), `P` (Pictorial), `A` (Abstract) |
| **Data type** | string enum |
| **Owner** | Blueprint (Component 0) |
| **Source** | Blueprint Component 0 `cpa_entry_stage` field |
| **Authored or derived** | DERIVED |
| **Mandatory or optional** | MANDATORY |
| **Note** | The framework rule for CPA derivation is: difficulty ≤ 2 AND domain ≠ physics → C; difficulty = 3 → C or P; difficulty ≥ 4 → P. The blueprint is authoritative — do not re-derive in the classification record. |

---

#### C-2 · `session_ta_cap`

| Attribute | Value |
|---|---|
| **Purpose** | Identifies the maximum number of TAs that can be delivered per session; used to estimate session load |
| **Definition** | The maximum TA count per session as determined by `estimated_hours` and stated in the blueprint |
| **Allowed values** | `3`, `5`, `7` |
| **Data type** | integer |
| **Owner** | Blueprint (Component 0) |
| **Source** | Blueprint Component 0 session cap statement |
| **Authored or derived** | DERIVED |
| **Mandatory or optional** | MANDATORY |
| **Derivation rule** | estimated_hours ≤ 0.5 → 3; 0.5 < estimated_hours ≤ 1 → 5; estimated_hours > 1 → 7 |

---

#### C-3 · `protocol_a_ta_count`

| Attribute | Value |
|---|---|
| **Purpose** | Indicates the depth of new-learner instruction; used to compare coverage across similar-difficulty concepts |
| **Definition** | The number of Teaching Activities (TAs) authored in Protocol A (State S0: No Prior Exposure) in the blueprint |
| **Allowed values** | Any positive integer, must not exceed `session_ta_cap` |
| **Data type** | integer |
| **Owner** | Blueprint (Component 4, Protocol A) |
| **Source** | Count of TA blocks in Protocol A section of blueprint Component 4 |
| **Authored or derived** | DERIVED |
| **Mandatory or optional** | MANDATORY |

---

#### C-4 · `total_protocol_count`

| Attribute | Value |
|---|---|
| **Purpose** | Verifies that all required student-state protocols are present; flags incomplete blueprints |
| **Definition** | The number of student state protocols authored (A, B, C, D, E) |
| **Allowed values** | 5 (all protocols present); values below 5 indicate an incomplete blueprint |
| **Data type** | integer |
| **Owner** | Blueprint (Component 4) |
| **Source** | Count of distinct Protocol sections (A through E) in blueprint Component 4 |
| **Authored or derived** | DERIVED |
| **Mandatory or optional** | MANDATORY |

---

#### C-5 · `total_misconception_count`

| Attribute | Value |
|---|---|
| **Purpose** | Characterises the schema-repair complexity of this concept; used in QA and analytics |
| **Definition** | The total number of misconceptions (MC-1, MC-2, MC-3, ...) registered in the blueprint's Misconception Registry |
| **Allowed values** | Any positive integer |
| **Data type** | integer |
| **Owner** | Blueprint (Component 3) |
| **Source** | Count of MC rows in blueprint Component 3 Misconception Registry table |
| **Authored or derived** | DERIVED |
| **Mandatory or optional** | MANDATORY |

---

#### C-6 · `has_foundational_misconception`

| Attribute | Value |
|---|---|
| **Purpose** | Flags concepts with a gating misconception that must be repaired before secondary MCs; used in MAMR-aware recommendation |
| **Definition** | True if any misconception in the registry is designated as Foundational (MAMR priority = 1st) |
| **Allowed values** | `true`, `false` |
| **Data type** | boolean |
| **Owner** | Blueprint (Component 3) |
| **Source** | Presence of MAMR Priority "1st" in Misconception Registry |
| **Authored or derived** | DERIVED |
| **Mandatory or optional** | MANDATORY |

---

#### C-7 · `has_cross_link_bridge`

| Attribute | Value |
|---|---|
| **Purpose** | Identifies blueprints with inter-subject connections; enables cross-subject curriculum alignment analytics |
| **Definition** | True if the KG `cross_links` array for this concept is non-empty (i.e., the blueprint contains a documented cross-link bridge in Component 6) |
| **Allowed values** | `true`, `false` |
| **Data type** | boolean |
| **Owner** | Blueprint (Component 6) / KG (`cross_links`) |
| **Source** | `len(KG_concept.cross_links) > 0` |
| **Authored or derived** | DERIVED |
| **Mandatory or optional** | MANDATORY |

---

#### C-8 · `cross_link_subjects`

| Attribute | Value |
|---|---|
| **Purpose** | Lists which other subjects this blueprint bridges to; enables cross-subject recommendation and curriculum mapping |
| **Definition** | The distinct subjects of all concepts listed in the KG `cross_links` array, derived using the Subject Registry |
| **Allowed values** | Any subset of {mathematics, physics, chemistry, biology, computer_science, english} |
| **Data type** | list[string] |
| **Owner** | KG (`cross_links`) |
| **Source** | For each ID in KG concept `cross_links`, extract subject prefix → Subject Registry lookup → collect distinct subjects |
| **Authored or derived** | DERIVED |
| **Mandatory or optional** | MANDATORY (empty list `[]` when `has_cross_link_bridge` = false) |
| **Examples** | `math.found.abstraction` cross_links `math.abst.algebraic-structure` → `["mathematics"]`; a concept bridging to physics and chemistry → `["physics", "chemistry"]` |

---

#### C-9 · `validation_status`

| Attribute | Value |
|---|---|
| **Purpose** | Summary QA gate; identifies blueprints that have passed all 20 V-checks; primary filter for production readiness |
| **Definition** | PASS if and only if all 20 V-checks (V-1 through V-20) in blueprint Component 10 show PASS. FAIL if any V-check shows FAIL or is absent. |
| **Allowed values** | `PASS`, `FAIL` |
| **Data type** | string enum |
| **Owner** | Blueprint (Component 10) |
| **Source** | Component 10 Validation Checklist — all rows must show ✓ |
| **Authored or derived** | DERIVED |
| **Mandatory or optional** | MANDATORY |

---

#### C-10 · `air_test_status`

| Attribute | Value |
|---|---|
| **Purpose** | Verifies that the blueprint can be delivered without real-time AI decisions at runtime; core Educational Brain quality gate |
| **Definition** | PASS if all five AIR test items (AIR-1 through AIR-5) in blueprint Component 9 are PASS. FAIL otherwise. |
| **Allowed values** | `PASS`, `FAIL` |
| **Data type** | string enum |
| **Owner** | Blueprint (Component 9) |
| **Source** | Component 9 AIR Test result line |
| **Authored or derived** | DERIVED |
| **Mandatory or optional** | MANDATORY |

---

#### C-11 · `package_ready`

| Attribute | Value |
|---|---|
| **Purpose** | Single boolean gate for production eligibility; primary field queried by the Teaching Engine and Recommendation Intelligence to determine whether a blueprint can be deployed |
| **Definition** | True if and only if `validation_status = PASS` AND `air_test_status = PASS` |
| **Allowed values** | `true`, `false` |
| **Data type** | boolean |
| **Owner** | Classification (derived from C-9 and C-10) |
| **Source** | `validation_status == "PASS" AND air_test_status == "PASS"` |
| **Authored or derived** | DERIVED |
| **Mandatory or optional** | MANDATORY |

---

#### C-12 · `format_version`

| Attribute | Value |
|---|---|
| **Purpose** | Records which revision of the Teaching Blueprint Specification was followed when the blueprint was authored; enables parser version selection and corpus-wide format migration tracking |
| **Definition** | The framework version string as stated in the blueprint file header |
| **Allowed values** | Any valid framework version string as declared in the blueprint. Current: `"1.0"`. Legacy physics-format blueprints declare no version — use `"legacy"`. |
| **Data type** | string |
| **Owner** | Blueprint (file header) |
| **Source** | Blueprint header `Framework Version:` field. If absent: `"legacy"`. |
| **Authored or derived** | DERIVED |
| **Mandatory or optional** | MANDATORY |

---

### Group D — Classification-Native (5 fields)

These fields exist nowhere else. They are the genuinely new information introduced by the classification record.

---

#### D-1 · `authored_date`

| Attribute | Value |
|---|---|
| **Purpose** | Enables chronological ordering, recency filtering, and corpus age analytics |
| **Definition** | The ISO 8601 date on which the blueprint was authored and first committed to the repository |
| **Allowed values** | ISO 8601 date string: `YYYY-MM-DD` |
| **Data type** | string (ISO 8601 date) |
| **Owner** | Classification |
| **Source** | The date in the blueprint file header, or the date of the git commit that introduced the blueprint file (`git log --follow --diff-filter=A --format=%as -- docs/curriculum/blueprints/{id}.md`) |
| **Authored or derived** | Authored (from git history or blueprint header; git is authoritative on conflict) |
| **Mandatory or optional** | MANDATORY |

---

#### D-2 · `commit_hash`

| Attribute | Value |
|---|---|
| **Purpose** | Provides a stable, verifiable link to the exact repository state when this blueprint was introduced; enables auditability and rollback |
| **Definition** | The full 40-character SHA-1 hash of the git commit that first introduced the blueprint file to the repository |
| **Allowed values** | 40-character hex string (git SHA-1) |
| **Data type** | string |
| **Owner** | Classification |
| **Source** | `git log --follow --diff-filter=A --format=%H -- docs/curriculum/blueprints/{id}.md` |
| **Authored or derived** | Authored (from git history) |
| **Mandatory or optional** | MANDATORY |

---

#### D-3 · `semantic_tags`

| Attribute | Value |
|---|---|
| **Purpose** | Enables free-form semantic search and AI retrieval beyond the structured fields; the only field intended for natural-language-adjacent query matching |
| **Definition** | A list of short, lowercase, hyphen-separated semantic labels that describe the teaching role, real-world application domain, or notable structural properties of this blueprint. Not a replacement for structured fields — supplements them for search cases the structured fields cannot cover. |
| **Allowed values** | List of strings, each matching `[a-z][a-z0-9-]*`. Maximum 10 tags per blueprint. |
| **Data type** | list[string] |
| **Owner** | Classification |
| **Source** | Authored at classification time (blueprint author or QA reviewer) |
| **Authored or derived** | Authored |
| **Mandatory or optional** | OPTIONAL (empty list `[]` if not tagged) |
| **Examples** | `["real-world-application", "proof-foundation", "computation", "visual-geometry", "algebraic-structure"]` |
| **Governance note** | Tags must not duplicate structured field values. `"foundational"` is not a valid tag (it duplicates `difficulty_string`). `"bloom-analyze"` is not a valid tag (it duplicates `bloom_level`). Valid tags describe aspects not captured by the 27 structured fields. |

---

#### D-4 · `production_status`

| Attribute | Value |
|---|---|
| **Purpose** | Lifecycle tracking; identifies which blueprints are available for deployment, under review, or retired |
| **Definition** | The current workflow state of the blueprint in the production lifecycle |
| **Allowed values** | `AUTHORED` (blueprint written, not yet reviewed), `REVIEWED` (reviewed by a second party), `ACTIVE` (approved and available for deployment), `DEPRECATED` (retired from active use) |
| **Data type** | string enum |
| **Owner** | Classification |
| **Source** | Set at classification creation as `AUTHORED`; updated as review and approval processes complete |
| **Authored or derived** | Authored |
| **Mandatory or optional** | MANDATORY |
| **State machine** | AUTHORED → REVIEWED → ACTIVE → DEPRECATED. DEPRECATED is terminal. Re-authoring a deprecated blueprint creates a NEW classification record with a new `blueprint_id` (if the KG concept changes) or resets to AUTHORED (if only the blueprint content is revised). |
| **Relationship to package_ready** | `package_ready = true` is a prerequisite for transitioning to ACTIVE. A blueprint can be `package_ready = true` and still be in AUTHORED or REVIEWED state. |

---

#### D-5 · `classification_schema_version`

| Attribute | Value |
|---|---|
| **Purpose** | Records which version of THIS schema was applied when the classification record was created; enables future schema migrations without reprocessing all records |
| **Definition** | The version string of the Blueprint Classification Schema document used to produce this classification record |
| **Allowed values** | Any valid schema version string. Current: `"1.0"` |
| **Data type** | string |
| **Owner** | Classification |
| **Source** | Hard-coded to the schema version at classification time |
| **Authored or derived** | Authored (set automatically at classification time) |
| **Mandatory or optional** | MANDATORY |

---

## 5. Supporting Registries

### 5.1 Subject Registry

Maps the first segment of a KG concept ID to its canonical subject name.

| ID Prefix | Subject Name | KG File |
|---|---|---|
| `math` | `mathematics` | `docs/mathematics/kg/graph.json` |
| `phys` | `physics` | `docs/physics/kg/graph.json` |
| `chem` | `chemistry` | `docs/chemistry/kg/graph.json` |
| `bio` | `biology` | `docs/biology/kg/graph.json` |
| `cs` | `computer_science` | `docs/computer-science/kg/graph.json` |
| `eng` | `english` | `docs/english/kg/graph.json` |

**Extension rule:** Adding a new subject requires adding one row to this table and a corresponding KG file. No other schema change is required.

### 5.2 Domain Label Fallback

For subjects whose KG does not include a `domains` registry array (currently: chemistry, biology, computer_science), the `domain_label` is derived by capitalizing the `domain_id` and replacing hyphens with spaces.

Example: `domain_id = "organic-chemistry"` → `domain_label = "Organic Chemistry"`

Mathematics and English KGs contain a `domains` array; their domain labels are sourced from `domains[*].domain_name` directly.

### 5.3 Difficulty Integer Mapping

| Difficulty String | Integer |
|---|---|
| `foundational` | 1 |
| `developing` | 2 |
| `proficient` | 3 |
| `advanced` | 4 |
| `expert` | 5 |
| `research` | 6 |

### 5.4 Bloom Tier Mapping

| Bloom Level | Tier |
|---|---|
| `remember` | LOT |
| `understand` | LOT |
| `apply` | LOT |
| `analyze` | HOT |
| `evaluate` | HOT |
| `create` | HOT |

---

## 6. Schema Summary

### 6.1 Field Count

| Group | Count | Description |
|---|---|---|
| A — Identity | 1 | Primary key |
| B — KG-Derived | 10 | Computed from KG at classification time |
| C — Blueprint-Derived | 12 | Computed from blueprint file at classification time |
| D — Classification-Native | 5 | New information owned by classification layer |
| **Total** | **28** | |

### 6.2 Authored vs. Derived

| | Count | Fields |
|---|---|---|
| **Authored** | 4 | `blueprint_id`, `authored_date`, `commit_hash`, `semantic_tags`, `production_status`, `classification_schema_version` |
| **Derived** | 24 | All remaining fields |

Note: `authored_date` and `commit_hash` are sourced from git history (authoritative) and `blueprint_id` is carried from the KG. Of the 4 "authored" fields, only `semantic_tags` and the initial `production_status` = AUTHORED require human judgment.

### 6.3 Mandatory vs. Optional

| | Count |
|---|---|
| **Mandatory** | 27 |
| **Optional** | 1 (`semantic_tags`) |

### 6.4 Fields Explicitly Removed (Would Duplicate)

| Removed field | Reason | Where it lives |
|---|---|---|
| `name` | Exact duplicate of KG `name` | KG |
| `description` | Exact duplicate of KG `description` | KG |
| `requires[]` | Exact duplicate of KG `requires` | KG |
| `unlocks[]` | Exact duplicate of KG `unlocks` | KG |
| `cross_links[]` (raw) | Exact duplicate of KG `cross_links` | KG |
| `aliases`, `parent`, `children`, `related`, `references` | Exact duplicate of KG optional fields | KG |
| V-1 through V-20 (individual) | In blueprint Component 10 (all 20 rows) | Blueprint |
| AIR-1 through AIR-5 (individual) | In blueprint Component 9 (all 5 items) | Blueprint |
| Misconception labels, descriptions | In blueprint Component 3 | Blueprint |
| TA descriptions, primitive sequences | In blueprint Component 4 | Blueprint |
| GR compliance details | In blueprint Component 8 | Blueprint |
| P91 expansion detail | In blueprint Component 7 | Blueprint |
| Response taxonomy entries | In blueprint Component 3/4 | Blueprint |
| Cross-link bridge text | In blueprint Component 6 | Blueprint |
| Student mastery, session state | Per-student, per-session | Runtime DB |

---

## 7. Canonical Record Shape

A classification record is a flat key-value document. The canonical format is JSON.

```json
{
  "blueprint_id":               "math.found.abstraction",
  "subject":                    "mathematics",
  "domain_id":                  "found",
  "domain_label":               "Mathematical Foundations",
  "bloom_level":                "analyze",
  "bloom_tier":                 "HOT",
  "difficulty_string":          "foundational",
  "difficulty_integer":         1,
  "mastery_threshold":          0.75,
  "estimated_hours":            4.0,
  "prerequisite_count":         1,
  "cpa_entry_stage":            "C",
  "session_ta_cap":             7,
  "protocol_a_ta_count":        5,
  "total_protocol_count":       5,
  "total_misconception_count":  3,
  "has_foundational_misconception": true,
  "has_cross_link_bridge":      true,
  "cross_link_subjects":        ["mathematics"],
  "validation_status":          "PASS",
  "air_test_status":            "PASS",
  "package_ready":              true,
  "format_version":             "1.0",
  "authored_date":              "2026-07-11",
  "commit_hash":                "7489ce2...",
  "semantic_tags":              [],
  "production_status":          "AUTHORED",
  "classification_schema_version": "1.0"
}
```

---

## 8. Risks

| ID | Risk | Severity | Notes |
|---|---|---|---|
| R-1 | **KG field evolution** — If the KG adds, renames, or removes fields (e.g., `difficulty` renamed or new values added), all B-group derived fields must be recomputed. | Medium | Mitigated by KG frozen status (math v1.0.1). Recomputation is mechanical; no human judgment required. |
| R-2 | **Blueprint format heterogeneity** — 29 existing blueprints span at least two distinct header formats (v1.0 new format; legacy physics format with no Framework Version, different Component numbering). C-group fields cannot be extracted with a single parser. | High | A two-parser strategy is needed before mass classification: one for `format_version = "1.0"`, one for `format_version = "legacy"`. All legacy blueprints should be identified before classification begins. |
| R-3 | **Schema version drift** — If this schema is updated, existing classification records created under v1.0 may be incomplete or inconsistent with new fields. | Low | `classification_schema_version` in every record makes this detectable and auto-filterable. Version 1.0 records remain valid for all fields they contain. |
| R-4 | **`semantic_tags` abuse** — Tags that duplicate structured fields, are too broad, or vary inconsistently across similar blueprints will degrade search quality. | Medium | Mitigated by the governance rule in D-3 and by centralised tag vocabulary review before first use. |
| R-5 | **`production_status` staleness** — If blueprints are revised after being classified as ACTIVE, the production_status may not reflect the current state. | Low | Any blueprint file change should trigger a classification record update. Enforced as a pre-commit check when the CI pipeline is extended to cover classification. |
| R-6 | **Cross-subject `cross_link_subjects` accuracy** — If a KG concept is cross-linked to a concept in a subject whose KG is not yet registered in the runtime (e.g., English, which is not yet registered per project memory), the subject lookup may fail or produce an incorrect result. | Low | The classification schema uses the Subject Registry (Section 5.1), which is independent of the runtime subject registry. All 6 subjects are resolvable via the Subject Registry for classification purposes. |

---

## 9. Migration Strategy

### Phase 0 — Before any classification begins

1. Identify all existing blueprints in `docs/curriculum/blueprints/` by subject.
2. Identify blueprint format version for each: `"1.0"` (new format with `PACKAGE_READY` header) vs. `"legacy"` (physics format with no Framework Version field).
3. Verify every blueprint has a corresponding KG concept ID (V-1 check; already done for PACKAGE_READY blueprints).
4. Build the two parsers for extracting C-group fields from each format.

### Phase 1 — Mass classification

5. For each PACKAGE_READY blueprint: compute all 28 fields using KG + blueprint parsers + git history.
6. Set `production_status = AUTHORED` for all records created in this phase.
7. Store all records in the classification registry (storage format decided separately from this schema).
8. Run validation: every record must have all 27 mandatory fields; `package_ready` must be true for all PACKAGE_READY blueprints.

### Phase 2 — Legacy blueprint handling

9. Legacy-format blueprints (physics; any pre-v1.0 blueprints): classify with `format_version = "legacy"`.
10. Set `validation_status` and `air_test_status` by reading their equivalent sections, mapped to the legacy component numbering.
11. If a legacy blueprint does not have an equivalent to Component 9 or 10, set `validation_status = "UNKNOWN"` and `air_test_status = "UNKNOWN"` — and `package_ready = false`.

### Phase 3 — Review and promotion

12. Blueprint owners review classification records and add `semantic_tags` where appropriate.
13. QA reviewer promotes records to `production_status = REVIEWED` after confirming all derived fields are accurate.
14. Production owner promotes to `production_status = ACTIVE` to authorise deployment.

---

## 10. Readiness for Mass Classification

| Criterion | Status |
|---|---|
| Schema complete and frozen | YES — this document |
| All 28 fields defined with derivation rules | YES |
| Subject Registry complete (6 subjects) | YES |
| Difficulty and Bloom mappings defined | YES |
| KG access confirmed for all 6 subjects | YES (1,712 concepts across 6 KGs) |
| Blueprint file location convention established | YES — `docs/curriculum/blueprints/{blueprint_id}.md` |
| Legacy format risk identified | YES — R-2 (requires two-parser strategy before Phase 1) |
| Storage format for classification records | NOT YET DECIDED — separate implementation decision |
| Two-parser implementation | NOT YET BUILT |
| Semantic tag vocabulary | NOT YET DEFINED (optional; can be added incrementally) |

**READY for schema adoption: YES**
**READY for mass classification execution: NO — requires Phase 0 two-parser implementation first**

---

*Blueprint Classification Schema v1.0 — frozen 2026-07-11*
*All future subjects and blueprints must conform to this schema without modification.*
*Schema changes require a version increment and a migration plan for existing records.*
