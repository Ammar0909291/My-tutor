# Blueprint Front-End (Phase 1)

Bridges Teaching Blueprint markdown (`docs/curriculum/blueprints/*.md`) into
the **existing, unchanged** Educational Brain Compiler
(`src/lib/brain-compiler/`), so blueprint authoring becomes a second
front-end into the same `CompiledPack` → `packRegistry` pipeline that `.bs`
policy packs already use.

```
Blueprint Markdown
      │
      ▼
Blueprint Parser        (parser.ts)              — format-agnostic over the
      │                                            corpus's 3+ header conventions
      ▼
Blueprint AST            (types.ts)
      │
      ▼
Semantic Validation      (semanticValidator.ts)   — BEFORE lowering, per spec
      │
      ▼
RawBlock[]                (lowering.ts)            — same shape .bs files parse into
      │
      ▼
lowerToAST()   ◄──────────────────────────────────  REUSED, UNCHANGED
      │            src/lib/brain-compiler/lowering.ts
      ▼
emitCompiledPack() ◄───────────────────────────────  REUSED, UNCHANGED
      │
      ▼
CompiledPack  (wrapped as { status: 'DRAFT', ... })
```

## What's new vs. reused

| Layer | Status |
|---|---|
| Blueprint Parser (`parser.ts`) | **New** — nothing in the repo parsed C0-C9 into a structured AST before this |
| Blueprint AST (`types.ts`) | **New** |
| Semantic Validator (`semanticValidator.ts`) | **New** |
| RawBlock lowering (`lowering.ts` — `lowerBlueprintToRawBlocks`) | **New**, but only glue: produces the exact shape `.bs` sources parse into |
| `lowerToAST`, `emitCompiledPack`, `hashSource` | **Reused, unchanged** — imported directly from `src/lib/brain-compiler`, not copied |
| `Diagnostic` type | **Reused** from `brain-compiler/types.ts` |
| `packRegistry`, K4 Policy Engine, serving path (`route.ts`) | **Untouched** — nothing in this directory calls `packRegistry.activate()` |

## Scope boundary (Phase 1, documented)

A blueprint's C0-C9 sections split across two different runtime targets that
already exist (see `docs/architecture/` audit in this session's history):

- **Decision/dispatch logic** (C4 Teaching Action Sequence) → lowers here,
  into `RuleAST`/`CompiledPack`, because it fits the existing guard/effect
  shape: one `currentConceptId`-guarded rule per teaching action.
- **Content** (worked examples, misconception explanations, mastery probes)
  → belongs on the `AssetIdentity`/`ExplanationAsset`/`ProbeAsset` family
  (`src/lib/teaching/assets/`), NOT this compiler. `CompiledPack`'s
  `RuleEffect` has no field for prose content, and inventing one here would
  be exactly the kind of ad-hoc extension `predicates.ts` warns against.
  This front-end folds misconception ids referenced by a Teaching Action
  into that rule's `citation` string (for provenance) but does not attempt
  to lower misconception content itself. That lowering target is a
  separate, later piece of work — not built in this pass.

## Governance

Per this repo's standing rule (no production runtime changes without
explicit per-item approval; no new parallel pipeline without justifying why
extending the live one is insufficient): this front-end reuses the live
compiler's validator, hashing, and manifest format unchanged. It:

- **Never** calls `packRegistry.activate()` — draft packs are returned as
  data, never registered.
- **Never** touches `route.ts`, `packLoader.ts`, the K4 engine, or any
  serving path.
- **Never** invents a new guard field, effect field, or PackAST/CompiledPack
  shape — every rule it lowers passes through the existing `validateAst` /
  `validateEffect` exactly as a hand-authored `.bs` rule would.

Batch-converting the full corpus and any DRAFT→ACTIVE promotion decision are
explicitly out of scope for this phase and require separate review.
