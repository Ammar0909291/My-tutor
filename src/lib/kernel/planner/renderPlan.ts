/**
 * K4 — RenderPlan builder (RS §7).
 *
 * Assembles the RenderPlan from typed decision + action inputs. This is
 * the module that will progressively OWN prompt construction as blocks
 * retire from route.ts (RS §13 inventory). K4 v1 owns:
 *   - TURN DIRECTIVE (formalized as data-driven)
 *   - VOCABULARY BAN block
 *   - LENGTH BUDGET reminder
 *   - OPENING reminder on fresh boundaries
 *
 * The rest of the prompt (persona, learning laws, Wave 0 recovery/first-
 * lesson/placement blocks, curriculum context, teaching engine decision,
 * learner intelligence) continues to be supplied by route.ts adapters and
 * threaded through unchanged. As those blocks migrate one at a time, they
 * become typed builders in promptBlocks.ts and their route.ts
 * concatenations retire.
 */
import type { EnginePolicyDecision } from '../policy/types'
import type { ResolvedAction } from '../actions/resolver'
import {
  buildTurnDirectiveBlock, buildVocabularyBanBlock,
  buildLengthBudgetBlock, buildOpeningReminderBlock,
} from './promptBlocks'

export interface RenderPlanInput {
  learnerId: string
  turnId: string
  phase: string
  decision: EnginePolicyDecision
  action: ResolvedAction
  /** The system prompt STEM supplied by the caller (persona + LEARNING
   *  LAWS + Wave 0 blocks not yet retired). K4 v1 appends its own
   *  typed blocks to this stem; K5+ retires more of it. */
  systemPromptStem: string
  history: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>
  freshBoundary?: boolean
  retroWinOwed?: boolean
  dueReviewCount?: number
}

export interface EngineRenderPlan {
  planId: string
  turnId: string
  systemPrompt: string
  history: RenderPlanInput['history']
  budgets: EnginePolicyDecision['budgets']
  vocabularyBans: string[]
  provenance: string[]
  /** The typed blocks the runtime OWNS this turn (retired from prompt-
   *  hoping to policy-driven). Tracked so tests / dashboards can show
   *  retirement progress. */
  ownedBlocks: string[]
}

let counter = 0
function id(prefix: string): string {
  counter = (counter + 1) & 0xffffff
  return `${prefix}_${Date.now().toString(36)}_${counter.toString(36)}`
}

export function buildRenderPlan(input: RenderPlanInput): EngineRenderPlan {
  const owned: string[] = []
  const parts: string[] = [input.systemPromptStem]

  const directive = buildTurnDirectiveBlock(input.decision, input.phase)
  parts.push(directive); owned.push('TURN_DIRECTIVE')

  const vocab = buildVocabularyBanBlock(input.decision.vocabularyBans)
  if (vocab) { parts.push(vocab); owned.push('VOCABULARY_BAN') }

  const length = buildLengthBudgetBlock(input.decision.budgets)
  if (length) { parts.push(length); owned.push('LENGTH_BUDGET') }

  if (input.freshBoundary) {
    const opening = buildOpeningReminderBlock(true, input.retroWinOwed === true, input.dueReviewCount ?? 0)
    if (opening) { parts.push(opening); owned.push('SESSION_OPENING') }
  }

  return {
    planId: id('p'),
    turnId: input.turnId,
    systemPrompt: parts.join(''),
    history: input.history,
    budgets: input.decision.budgets,
    vocabularyBans: input.decision.vocabularyBans,
    provenance: input.decision.provenance.map((t) => t.ruleId),
    ownedBlocks: owned,
  }
}
