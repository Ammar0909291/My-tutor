# Brain Compiler (C4 MVP)

The first working compiler from authored educational knowledge to Policy
Packs the K4 Policy Engine executes. Zero LLM calls. Fully deterministic.
Byte-reproducible across builds.

See:
- `docs/architecture/EDUCATIONAL_BRAIN_COMPILER.md` (the frozen spec)
- `docs/architecture/EOS_IMPLEMENTATION_MASTERPLAN.md` (C4 scope)

## Pipeline

```
.bs authored source
        │
        ▼  parser.ts (BIR-H)
   RawBlock[]
        │
        ▼  lowering.ts (BIR-M)
   PackAST (RuleAST[])
        │
        ▼  lowering.ts + hash.ts (BIR-L)
   CompiledPack (manifest + rules; JSON-serializable)
        │
        ▼  registry.ts → loadPack()
   PolicyPack (guard functions attached)
        │
        ▼  mergePacks(BASE_PACK, ...)
   Runtime pack consumed by the K4 engine (decide())
```

## Scope (MVP)

Supported:
- `::pack <id> [<semver>]` block declaring a source file's pack identity
- `::rule <ruleId> [v<n>]` blocks with typed fields: `band`, `citation`,
  `specificity`, `mandatory`, `guard`, `effect`
- Predicate DSL over PolicyInputs (closed field set): `true`/`false`,
  `eq`/`neq`/`gt`/`gte`/`lt`/`lte`, `in`/`nin`, `all`/`any`
- Deterministic canonical hashing (sha256 over sorted-key JSON)
- Registry with runtime-pack assembly (BASE_PACK + compiled overlays)
- Integrity verification on load
- Multi-severity diagnostics with stable codes (E01xx…W04xx)

Deferred to C4 follow-on / later milestones:
- Multi-file packs (C4 emits a single-file pack per compile)
- Age/board/cohort overlays
- All block kinds beyond `::pack` and `::rule` (SDK D2 mapping)
- Content-addressed on-disk store (git-backed v1)
- Set-cover / dominator optimization passes
- Full validation matrix (EBC §8: coverage lints, misconception birth,
  analogy retirement) — those require CEKR (C1–C3, not in C4 scope)

## Feature Flag

Nothing in this module changes runtime behaviour by default. To use a
compiled pack in the K4 engine, callers explicitly do:

```ts
import { compileSingle, packRegistry } from '@/lib/brain-compiler'
import { decide } from '@/lib/kernel/policy'

const { pack } = compileSingle('physics.bs', source)
packRegistry.activate(pack!)
const runtimePack = packRegistry.runtimePack()   // BASE_PACK + compiled
decide(runtimePack, inputs)                       // Band 3 now non-empty
```

The chat route is NOT modified in C4 — it continues to use BASE_PACK.
The seam is proven by tests; wiring is a K4 follow-on task per masterplan.

## Diagnostic codes

| Code  | Sev | Meaning |
|-------|-----|---------|
| E0001 | E   | no source files provided |
| E0101 | E   | `::end` without matching open |
| E0102 | E   | nested block open before `::end` |
| E0103 | E   | unrecognized line inside block |
| E0104 | E   | bad field value (non-JSON, non-token) |
| W0105 | W   | duplicate field in block |
| E0106 | E   | unterminated block |
| E0201 | E   | missing `::pack` header |
| E0202 | E   | multiple `::pack` headers |
| E0203 | E   | invalid `::pack` header |
| W0204 | W   | unknown block kind ignored |
| E0301 | E   | duplicate rule id |
| E0401 | E   | invalid `::rule` header |
| E0402 | E   | rule band out of range [0,6] |
| E0403 | E   | rule missing citation (RS L3) |
| E0404 | E   | rule specificity must be non-negative integer |
| E0405 | E   | rule mandatory must be boolean |
| E0406 | E   | rule missing/non-object guard |
| E0407 | E   | rule guard AST invalid |
| E0408 | E   | rule missing/non-object effect |
| W0409 | W   | unknown effect field ignored |
| E0410 | E   | rule effect.move invalid value |
| E0411 | E   | rule effect.bannedMoves must be array of moves |
| E0412 | E   | rule effect.vocabularyBans must be array of strings |
| E0413 | E   | rule effect.stageCeiling must be integer |
| I0002 | I   | multi-file input ignored (MVP scope) |

The build FAILS on any E-severity diagnostic; W and I are informational.
