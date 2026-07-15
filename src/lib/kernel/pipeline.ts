/**
 * K3 — Pipeline orchestrator. RS §1: fifteen stages, in-order, synchronous,
 * with each stage's output immutable once produced. The orchestrator is
 * deliberately dumb: it threads state through stages, guards ordering, and
 * traces each stage's completion. All intelligence lives in stages.
 *
 * K3 SHIP MODE: 'shadow' by default in production (ENABLE_KERNEL_PIPELINE=1
 * runs shadow; =2 runs primary; unset/0 runs 'off' and route.ts owns the
 * turn). K4+ progressively fills stage bodies until primary is the default.
 */
import type { KernelState, PipelineMode, PipelineOptions, Stage, StageName } from './types'
import { STAGE_ORDER } from './context'

export interface PipelineResult {
  finalState: KernelState
  mode: PipelineMode
  trace: Array<{ stage: StageName; startedMs: number; durationMs: number }>
  error?: { stage: StageName; message: string }
}

/**
 * Run the pipeline with a specific stage set. Ordering is enforced against
 * STAGE_ORDER — a caller supplying stages out of order fails loudly (this
 * is an architecture invariant, not a user error).
 */
export async function runPipeline(
  initial: KernelState,
  stages: Stage<KernelState, KernelState>[],
  options: PipelineOptions,
): Promise<PipelineResult> {
  // Assert ordering: stages MUST appear in RS §1 order (missing stages are
  // legal in dev/tests; out-of-order is a bug).
  const seen: StageName[] = []
  const knownIdx = new Map<StageName, number>()
  STAGE_ORDER.forEach((n, i) => knownIdx.set(n, i))
  let lastIdx = -1
  for (const s of stages) {
    const idx = knownIdx.get(s.name)
    if (idx === undefined) throw new Error(`pipeline: unknown stage ${s.name}`)
    if (idx <= lastIdx) throw new Error(`pipeline: stage ${s.name} out of order`)
    lastIdx = idx
    seen.push(s.name)
  }

  const trace: PipelineResult['trace'] = []
  let state = initial
  const t0 = Date.now()
  for (const stage of stages) {
    const startedMs = Date.now() - t0
    try {
      state = await stage.run(state)
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      if (!options.quiet) console.warn(`[kernel] stage ${stage.name} threw: ${message}`)
      return {
        finalState: state, mode: options.mode, trace,
        error: { stage: stage.name, message },
      }
    }
    trace.push({ stage: stage.name, startedMs, durationMs: (Date.now() - t0) - startedMs })
  }
  return { finalState: state, mode: options.mode, trace }
}

/** Read the mode from env at call time; keeps the flag hot-swappable. */
export function pipelineModeFromEnv(): PipelineMode {
  const v = process.env.ENABLE_KERNEL_PIPELINE
  if (v === '2' || v === 'primary') return 'primary'
  if (v === '1' || v === 'shadow') return 'shadow'
  return 'off'
}
