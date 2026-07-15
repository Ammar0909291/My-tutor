# EOS Kernel (K3) — Runtime Pipeline

The strangler frame for the EOS v2 runtime. Fifteen typed stages
(`INGEST → SENSE → COMMIT-1 → FOLD → INTERRUPT-SCAN → SCHEDULE → TSM-STEP →
POLICY → RESOLVE → PLAN → RENDER → VERIFY → COMMIT-2 → PERSIST → POST`),
each in its own module under `stages/`. See:

- `docs/architecture/EOS_V2_RUNTIME_SPECIFICATION.md` §1 (the pipeline)
- `docs/architecture/EOS_IMPLEMENTATION_MASTERPLAN.md` (K3 scope)

## K3 status (what shipped)

- ✅ Typed contracts for every stage (`types.ts`) — immutable artifact
  chain; downstream stages MUST NOT mutate upstream artifacts (RS §1).
- ✅ One module per stage with a stable public API.
- ✅ Pipeline orchestrator (`pipeline.ts`) with STAGE_ORDER guard.
- ✅ Shadow-mode entry point (`shadow.ts`); route.ts calls it once per
  Library turn behind `ENABLE_KERNEL_PIPELINE`.
- ✅ Verifier INTERFACE only (`stages/verify.ts`); K5 enforces.
- ✅ Deterministic RENDER driver interface with lazy LLM adapter.
- ✅ Comprehensive tests: stages, pipeline, replay, determinism.
- ⏸ **Full behavior migration is a follow-on** — each stage currently
  either does real deterministic work (INGEST, SENSE, COMMIT-1,
  INTERRUPT-SCAN, POLICY, RESOLVE) or accepts adapters supplied by
  route.ts (FOLD, SCHEDULE, TSM-STEP, PLAN, RENDER, COMMIT-2, PERSIST,
  POST). This is the strangler pattern honestly named.

## Modes (flag `ENABLE_KERNEL_PIPELINE`)

| Value | Mode | Effect |
|---|---|---|
| unset/`0` | `off` | route.ts owns turns end-to-end. Default. |
| `1`/`shadow` | `shadow` | pipeline runs alongside route.ts, produces artifacts + trace, DOES NOT touch response/DB. Safe for prod. |
| `2`/`primary` | `primary` | (K4+) pipeline owns the turn. Not yet safe. |

## The strangler discipline

1. Route.ts continues to compute every teaching fact it computes today.
2. It hands those facts to the pipeline via the shadow adapter.
3. Stages record artifacts (immutable, typed, provenance-bearing).
4. K4/K5 progressively promote stages from adapter-fed to
   self-computing, one at a time; each promotion is a self-contained
   milestone whose regression surface is one stage's tests + a
   golden-transcript replay.
5. When every stage is self-computing, the route becomes
   `load → runPipeline() → persist → return` — the masterplan §9 end
   state.

## Testing

- `src/tests/kernelStages.test.ts` — stage-by-stage unit tests
- `src/tests/kernelPipeline.test.ts` — end-to-end pipeline including
  replay, determinism (byte-identical outputs across runs), stage
  ordering enforcement, error containment
