# 09 · Scaling — designing for 100 M students

> *Three numbers govern the design: 100 M learners, 10 M assets,
> hundreds of languages. Every architectural decision in docs 01-08
> is re-evaluated here against those numbers.*

---

## 1. The scaling targets, restated

| Axis | Target | Notes |
|------|--------|-------|
| Learners | 100 M total, 5 M DAU at peak | DAU is the dimension that drives infra |
| Concepts | 1 M | covers school → undergrad across all subjects globally |
| Assets | 10 M | ~10 assets per concept on average (multiple languages × styles) |
| Curricula | 5,000 | every major exam board × every major grade × multi-year revisions |
| Languages | 200 | the long tail (smaller language populations) |
| Peak QPS | 50,000 turns/sec | back-of-envelope: 5M DAU × 10 turns/day × peak-of-2x |
| Evidence events/sec | 200,000 | each turn emits ~4 events |

The architecture survives these numbers, **as designed**. This
document specifies how.

---

## 2. The single most important scaling property

The Brain's hot path is **retrieval-bound, not generation-bound**.
At Year-5 asset coverage (≥ 99 % of learner requests served from
catalogue), 99 % of QPS is database reads + an in-process graph
walk + a string composition. The 1 % that triggers an LLM call is
slow (1-3 s) but isolated to its own latency tail.

This means the system can scale almost like a CDN. The expensive
parts are bounded by AI authoring (which is amortized) and by
write-side persistence (which scales horizontally).

---

## 3. Component-by-component scaling

### 3.1 Concept graph

| Component | Capacity / target |
|-----------|-------------------|
| Vertex count | 1 M concepts + 5 M misconceptions + 100 K objectives |
| Edge count | ~10 M typed edges total |
| In-memory size | ~600 MB (string-interned ids; CSR adjacency) |
| Read path | in-process traversal; ~100 µs for 4-hop neighborhood |
| Update path | < 100 updates/day (curators write rarely); atomic snapshot rebuild |

**Decision**: the graph fits in process memory at 100 % of target
scale. Every app server holds the same snapshot, refreshed on
`GraphChanged` events. No graph database needed; this is a
materialized projection from Postgres.

### 3.2 Knowledge Asset catalogue

| Component | Capacity / target |
|-----------|-------------------|
| Row count | 10 M Asset rows |
| Index size | `(conceptId, family, familyKind, language, gradeBand)` covering index: ~3 GB |
| Hot row size | ~4 KB per asset |
| QPS | 50,000 retrieval reads/sec (every turn does ≥ 1 read) |
| Cache hit rate target | > 95% via per-concept-language-grade-band cell-level cache |

**Decision**: Postgres + Redis cache layer + pgvector for semantic
search. Asset rows are immutable once published; cache is
write-through on publish (low churn).

Sharding: by `family` first (Explanation / Visual / Probe), then by
hash of `conceptId` if a single shard exceeds capacity. Cross-family
joins through `AssetIdentity` work as a global hub-and-spoke (a
single-shard index with FKs into the family shards).

### 3.3 Student Memory

| Component | Capacity / target |
|-----------|-------------------|
| Row count | 100 M Profile rows |
| Per-concept rows | 100 M × ~500 concepts attempted = 50 B `ConceptMastery` rows |
| Hot working set | 5 M DAU × ~50 active concepts = 250 M hot rows |
| QPS | 50,000 reads/sec + ~30,000 writes/sec |

**Decision**: shard by `userId` hash. Each shard is a Postgres
instance with read replicas. Per-shard, the hot working set fits in
RAM with cache.

Sharding by `userId` is correct because (1) every read is
`userId`-scoped, (2) writes don't cross learners, (3) backups and
restores are per-shard.

### 3.4 Evidence event log

| Component | Capacity / target |
|-----------|-------------------|
| Event rate | 200,000 events/sec peak |
| Daily volume | ~10 B events/day at peak |
| Retention | 90 days hot in Postgres / Citus / similar; 5 years in cold S3-equivalent |
| Aggregation latency | < 60 s for rolling windows; < 24 h for nightly authoritative |

**Decision**: an append-only log table partitioned by day +
`shardKey = hash(conceptId)`. Aggregation workers read partitions in
parallel; rolling windows in Redis serve the Decision Pipeline.

The nightly rollup is a Spark/Beam job scanning the prior 30-day
partitions, producing the authoritative scores. Compute cost: a
single-day window of 10B rows aggregated in ~2 hours on modest
compute; nightly is well under budget.

### 3.5 Session Memory

| Component | Capacity / target |
|-----------|-------------------|
| Concurrent sessions | 1 M peak |
| Per-session size | ~10 KB |
| Total Redis | ~10 GB hot + ~50 GB warm |

**Decision**: Redis cluster, sharded by `sessionId`. TTL-driven
eviction (30 min idle = expire). Survives a single-node failure
because session state is recoverable from the persisted `Message`
table on failover.

### 3.6 Brain config + experiments

| Component | Capacity / target |
|-----------|-------------------|
| Active experiments | < 100 simultaneous |
| Config read rate | 50,000/sec (every turn reads at least the ranking weights and the current strategy table) |
| Update rate | < 100/day |

**Decision**: in-process snapshot; refreshed on `ConfigChanged`
pub-sub message. Per-app-server memory cost: ~5 MB.

### 3.7 Long-term Memory

Pure object storage (S3 / R2 / GCS). Daily Parquet snapshots of
the asset catalogue, graph, and evidence rollup. Append-only event
log archive partitioned by month.

Cost: dominated by event log retention. At 10 B events/day × ~500
bytes each (compressed) × 5 years = ~7 PB. At commodity object
storage prices (~ $5/TB/month), ~$420 K/year. Affordable; budget
line item.

---

## 4. Latency budgets at scale

The Decision Pipeline's stage budgets (doc 03 § 8) translate to
infra requirements:

| Stage | Budget | Bottleneck at scale | Solution |
|-------|--------|---------------------|----------|
| Frame | 5 ms | none | trivial |
| Intent | 10 ms deterministic | regex evaluation | precompiled patterns at app-server startup |
| Retrieval | 20 ms | Postgres seek | covering index; cache for hot concepts |
| Memory | 30 ms | Postgres seek | per-user read replica |
| Strategy | 5 ms | none | pure function over in-memory state |
| Composition | 50 ms | Postgres seek + asset payload read | cache top-ranked asset per cell |
| Visual | 100 ms | Postgres seek | as above |
| Probe | 20 ms | Postgres seek | as above |
| Narration | 50 ms | string compose | in-process |
| Checkpoint | 200 ms | LLM for free-text | gated by intent stage; rare |
| Persist | 100 ms | DB writes | batched fire-and-forget |

**End-to-end retrieval-only turn at p50: 250 ms; p99: 600 ms.**
Generation turns are p99 2.5 s. These are achievable with the
infra plan above.

---

## 5. Multi-region

100 M learners are not all in one region. The Brain must serve from
multiple regions with reasonable latency from each.

### Read path

Replication: `AssetIdentity` + `Knowledge` + `BrainConfig` are
**globally replicated** (rarely written, read everywhere). Postgres
logical replication, async, with ~5 s lag — acceptable because
these change rarely.

### Write path

`StudentMemory` and `EvidenceEvent` are **regionally homed** —
each learner has a primary region; writes go there; reads from
other regions go through that region (rare cross-region path, only
for learners traveling).

Failover: region-level outage promotes a secondary region. RPO
~30 s for Student Memory, ~5 min for Evidence (acceptable; evidence
loss is recoverable from the log on the original region returning).

### Cost shape

Multi-region adds ~25% to compute and ~40% to bandwidth vs. single
region. At the user volumes specified, that's acceptable; the
alternative (single-region serving learners across continents at
300 ms+ network round trip) breaks the latency budget.

---

## 6. Multi-language scaling

Hundreds of languages. The Brain's design treats each as a
first-class dimension on the asset (doc 01 § 5). Scaling concerns:

- **Cold-start by language**: a new language launches with ~0
  assets. The first 6 months are dominated by acquisition + LLM
  authoring; ADI is elevated (doc 06 § 11). Acceptable per design.
- **Long-tail languages**: languages with < 10 K active learners
  may never reach the asset-density needed for retrieval-dominant
  serving. For these, the Brain falls back to LLM authoring + a
  human-translator review queue. Quality is preserved; ADI is
  higher; cost per learner is higher. Acceptable.
- **Translation as authoring**: translating an English asset to
  Hindi via LLM (Type-A call) followed by bilingual curator
  review is the dominant path for moderate-population languages.

Per-language storage cost is linear in (concepts × asset-styles); a
small language's storage is small.

---

## 7. The compute-per-learner shape

Steady-state, year-5 estimate (ADI ≈ 0.005):

| Cost per learner-turn | Component |
|----------------------|-----------|
| ~$0.000001 | DB reads (10 indexed seeks) |
| ~$0.0000003 | Redis hits |
| ~$0.000005 | App server CPU (~10 ms of one core) |
| ~$0.0000003 | Network |
| ~$0.0000005 | Event log write |
| ~$0.00000003 | Aggregation (amortized) |
| **~$0.0000071** | **Total infrastructure per turn** |
| ~$0.0001 per 1/200 turns | **AI cost** (one call per 200 turns at $0.02/call) |
| **~$0.000507** | **Total all-in per turn** at year-5 |

At 5 M DAU × 10 turns/day = 50 M turns/day × $0.000507 = **$25 K/day,
$9 M/year** total operational cost at year-5 steady state.

Per learner per year: $0.18. The economics are workable.

The current state (regenerate per turn, ADI ≈ 1.0) would cost
50× more for AI alone. This is the financial argument for the
asset-catalogue approach: ~$430 M/year just in AI at Year-5 scale
under the current model; ~$2 M/year under the Phase-1 design.

---

## 8. The compute-per-AUTHORING shape

When the Brain authors an asset (Type-A LLM call), the cost amortizes
over future learners:

Cost per authoring call: ~$0.02 (1,500 tokens out + ~500 tokens in
at gpt-oss-20b-comparable rates).

If the asset is served 1,000 times before its first quality update:
amortized cost per turn = $0.00002. If it survives 30 days and is
served 50,000 times before deprecation: amortized cost per turn =
$0.0000004.

**The economics work because assets compound.** A single high-
quality asset authored on Day 1 serves cumulative learners forever.
The Brain's design optimizes for this compounding — every authoring
event must produce an asset that can be reused.

---

## 9. Where this design breaks (the honest limits)

Three breaking points the architecture explicitly does NOT solve:

### Break 1 — A single learner with 100,000 daily turns

A learner doing 100,000 turns/day is either a bot or a content
scraper. The Brain rejects them via rate limits, not via
architectural accommodation.

### Break 2 — Real-time co-teaching across thousands of learners

If 10,000 learners are simultaneously in the same live class session
asking the same question, the Brain's per-learner architecture
isn't optimal — a broadcast-style "all learners get the same
explanation" mode would be more efficient. Out of scope for Phase 1;
solvable later as a "Cohort Mode" wrapping the existing per-learner
infrastructure.

### Break 3 — A curriculum that requires a completely novel knowledge graph slice

A new curriculum can be added cheaply (a view); a new *domain*
(e.g., "music theory" added to a system that only had STEM) requires
adding hundreds of concepts. The graph scales; the authoring effort
is the bottleneck. Mitigation: prioritize curricula that share the
most concepts with existing coverage.

---

## 10. What scales the WRONG way under the current architecture

A few patterns from the current codebase that would break at
Year-5 scale if left in place:

1. **Per-turn LLM generation of explanations** — at 50 M turns/day
   × $0.02 per turn = $1 M/day = $365 M/year. Not viable.
   *Fixed by Phase 1's asset model.*
2. **Per-turn rebuild of the system prompt by string concatenation**
   — at 50 M turns × ~5 KB prompt = 250 GB/day of prompt text sent
   to LLMs. Wasted bandwidth.
   *Fixed by Phase 1's stateful pipeline (system prompt is composed
   from cached fragments).*
3. **Per-turn graph queries via Prisma** — current code does ~10
   Prisma calls per turn. At 50,000 QPS that's 500,000 DB QPS.
   *Fixed by Phase 1's in-memory graph snapshot + cached asset
   reads.*
4. **No partitioning on EvidenceRecord** — 10 B rows/day in one
   unpartitioned table is unindexable.
   *Fixed by Phase 1's daily-partitioned event log + Redis rolling
   windows.*
5. **Mastery computation by recomputing from full event history**
   — would cost more than serving the lesson.
   *Fixed by Phase 1's incremental mastery updates + decay model.*

---

## 11. Capacity planning rules of thumb

To make the scale numbers actionable for the Phase 2+ build:

- Every new feature must declare its **per-turn cost** (DB reads,
  LLM calls, write events, latency).
- Every new feature must declare its **per-learner cost** (lifetime
  storage, memory footprint).
- Every new asset family must declare its **expected catalogue
  growth rate** and **per-asset storage**.
- Every new LLM call site must declare its **expected QPS** and
  **per-call cost**.

Code review rejects PRs that don't fill these in. They go into a
`capacity.md` line per feature.

---

## 12. Anti-patterns at scale

- ❌ **A single database without sharding**. Postgres-on-one-host
  caps at ~50 K writes/sec before becoming a bottleneck; the Brain
  needs that just for events.
- ❌ **Synchronous LLM calls on the chat-response path** for
  anything other than the rare authoring case. Async-emit the
  authoring; ship the deterministic fallback.
- ❌ **One global Redis instance**. Sharded cluster; multiple
  instances per region.
- ❌ **Logging everything**. Sample. The interesting events go to
  the EvidenceEvent log; the rest goes to a sampled
  observability stream.
- ❌ **Tightly coupling sessions to processes**. Stateless app
  servers; session state in Redis. A node dies; another picks up.
- ❌ **A unified "all data in Elasticsearch" approach**. ES is
  great for full-text search; bad for transactional asset writes
  and bad for graph traversal. Use it for what it's good at
  (asset semantic-search complement to pgvector) and nothing else.

---

## 13. Why this design is right for the next 5 years

The numbers work. At 100 M learners × Year-5 ADI of 0.005, the AI
cost is small enough to be amortizable; the infra cost is small
enough to be financeable; the latency budget is met without exotic
infrastructure (commodity Postgres + Redis + object storage); the
team can grow staff in proportion to *curricula and curators*, not
in proportion to learner volume.

The decisive scaling property is **horizontal everything**.
Learners horizontally shard. Evidence horizontally partitions.
Assets cache per-cell. The graph fits in process memory at any
plausible vertex count. No single bottleneck constrains the next
10× of learner growth.

The decisive cost property is **the asset-cache amortization**. A
fully-realized Phase-1 Brain spends ~3% of its compute on novel
content authoring and ~97% on serving cached content. That ratio
inverts (and the system becomes economically untenable) the moment
the asset-catalogue approach is abandoned. The architecture's job is
to keep that ratio honest.
