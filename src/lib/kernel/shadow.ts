/**
 * K3 — Shadow-mode adapter.
 *
 * The FIRST integration point between route.ts and the pipeline. In shadow
 * mode, route.ts builds a KernelState from facts it has ALREADY computed
 * (no new work, no new queries, no new prompt paths), runs the read-only
 * subset of stages (1-10, VERIFY), and traces the result — without touching
 * the response or the DB. This proves the pipeline is invocable end-to-end
 * on every Library turn, feeds the golden-transcript harness with real
 * traces, and stays strangler-safe: turning the flag off returns byte-
 * identical behaviour.
 *
 * K4/K5 progressively promote stages from shadow to primary; only when
 * every stage has real logic does route.ts become
 *   `load → pipeline.run() → persist → return response` (masterplan §9).
 */
import { ingestStage } from './stages/ingest'
import { senseStage } from './stages/sense'
import { commit1Stage } from './stages/commit1'
import { foldStage, type FoldAdapters } from './stages/fold'
import { interruptScanStage } from './stages/interruptScan'
import { scheduleStage, type ScheduleAdapters } from './stages/schedule'
import { tsmStepStage, type TsmAdapters } from './stages/tsmStep'
import { policyStage, type PolicyAdapters } from './stages/policy'
import { resolveStage, type ResolveAdapters } from './stages/resolve'
import { planStage, type PlanAdapters } from './stages/plan'
import { runPipeline, pipelineModeFromEnv } from './pipeline'
import { initialState, makeTurnContext } from './context'
import type { KernelState, PipelineMode } from './types'

export interface ShadowInput {
  learnerId: string
  sessionId: string
  subjectSlug: string
  message: string
  isSchoolMode: boolean
  fold: FoldAdapters
  schedule: ScheduleAdapters
  tsm: TsmAdapters
  policy: PolicyAdapters
  resolve: ResolveAdapters
  plan: PlanAdapters
}

export interface ShadowResult {
  invoked: boolean
  mode: PipelineMode
  state?: KernelState
  trace?: Array<{ stage: string; durationMs: number }>
  error?: string
}

/**
 * Run stages 1–10 (INGEST through PLAN). NO render, NO verify, NO DB
 * writes, NO async work — shadow mode is strictly read-only observation
 * of the decision-plane artifacts. VERIFY needs a render draft, so it
 * runs only in primary mode (K5+). Safe to call fire-and-forget.
 */
export async function runShadowPipeline(input: ShadowInput): Promise<ShadowResult> {
  const mode = pipelineModeFromEnv()
  if (mode === 'off') return { invoked: false, mode: 'off' }
  if (input.isSchoolMode) return { invoked: false, mode }        // School Mode untouched (K3 scope)

  const context = makeTurnContext({
    learnerId: input.learnerId,
    sessionId: input.sessionId,
    subjectSlug: input.subjectSlug,
    messageLength: input.message.length,
    isSchoolMode: input.isSchoolMode,
  })

  try {
    const result = await runPipeline(
      initialState(context),
      [
        ingestStage,
        senseStage({ message: input.message }),
        commit1Stage,
        foldStage(input.fold),
        interruptScanStage,
        scheduleStage(input.schedule),
        tsmStepStage(input.tsm),
        policyStage(input.policy),
        resolveStage(input.resolve),
        planStage(input.plan),
        // RENDER onward omitted in shadow (no LLM, no DB writes).
      ],
      { mode, quiet: true },
    )
    return {
      invoked: true, mode,
      state: result.finalState,
      trace: result.trace.map((t) => ({ stage: t.stage, durationMs: t.durationMs })),
      error: result.error?.message,
    }
  } catch (err) {
    return { invoked: true, mode, error: err instanceof Error ? err.message : String(err) }
  }
}
