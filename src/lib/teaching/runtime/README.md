# Brain Runtime

The component that **executes** a completed `ExecutionPlan`. Not a planner,
not an engine — pure orchestration.

```
ExecutionPlan
  ↓
Runtime Executor          ← this module
  ↓
Dispatcher (per subsystem)
  ↓
Explanation Engine · VIE → ADR 12 · Assessment · Lesson Engine
  ↓
RuntimeResult
```

## Responsibility

Take an `ExecutionPlan`, run each step in order, invoke the registered
dispatchers, collect outputs, return a `RuntimeResult`. That is all.

No teaching, no visualization, no rendering, no explanation generation, no
business logic, no database, no Prisma, no LLM.

## The executor owns no policy

Every failure decision comes from the step's own `failurePolicy`, authored by
the Execution Planner. The executor's `applyFailurePolicy()` is an exhaustive
switch over `FailurePolicy` — it selects among the plan's policies, it never
invents one, and it terminates only where the plan says to:

- a `WAIT_FOR_STUDENT` step (a plan-authored halt, not a failure), or
- a step whose policy is `REQUEST_CLARIFICATION`.

Everything else continues, so no subsystem failure can end a turn.

## Dispatchers

The executor must not know implementation details, so every subsystem is
reached through a port:

```ts
interface SubsystemDispatcher {
  subsystem: Subsystem
  execute(input: DispatchInput): Promise<DispatchOutput | null> | DispatchOutput | null
}
```

`DispatchOutput.payload` is deliberately `unknown` — the executor never
inspects it, which is what structurally keeps business logic out of this
layer. A dispatcher signals failure by **throwing or returning null**; both
are normalised to the same path. A subsystem with **no registered
dispatcher** is treated exactly like an unavailable one — the plan's policy
applies and nothing is invented.

`ExecutionContext` carries `priorOutputs`, so a chained subsystem can consume
its predecessor's result — ADR 12 reads the `VisualIntent` the VIE just
produced. It deliberately does **not** carry the plan, so a dispatcher cannot
re-plan or reach back into orchestration.

## Status semantics

| Status | Meaning |
|---|---|
| `COMPLETED` | every subsystem in the chain produced output |
| `SKIPPED` | not run, or recovered from per policy — **including substitution** |
| `FAILED` | attempted and failed; execution continued |
| `PENDING` | never reached, because execution halted earlier |
| `HALTED` | this step deliberately stopped execution |

**A substituted step reports `SKIPPED`, not `COMPLETED`.** When the visual
fails and an explanation covers for it, the *visualization* did not happen —
reporting it as completed would overstate what the runtime achieved. The
substitute's output is still collected, so the turn has content either way.

`SKIPPED` (declined) and `PENDING` (deferred) are kept distinct: conflating
them would hide whether work was refused or merely not yet reached.

## Determinism

Steps run strictly in order. Subsystem chains run strictly in order. Nothing
is parallelised. No clock, no randomness. Given deterministic dispatchers, the
`RuntimeResult` is deterministic — asserted in the tests.

## Status

Built, tested (22 tests), **not wired into the runtime**, per scope. No
dispatcher implementations exist yet — see the blockers.
