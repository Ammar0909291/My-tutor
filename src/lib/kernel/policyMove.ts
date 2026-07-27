/**
 * K3 — the single owner of "what move is this turn".
 *
 * WHY THIS FILE EXISTS. The conversation ladder's move (`teach | show | ask`)
 * is not the kernel's PolicyMove: RECOVER is owned by the interrupt
 * controller and CLOSE by the session layer, and neither is derivable from
 * the ladder — decideNextMove() returns 'teach' on a recovery turn, and
 * CLOSING lives entirely in the session machine.
 *
 * That mapping was being written out by hand at each consumer, and it had
 * already drifted: the K5 milestone fixed the verifier's copy to check
 * recovery and CLOSING first, while the kernel shadow adapter kept the older
 * three-way form. A parity harness comparing the two would have been
 * measuring a decision the route no longer makes — false divergence from a
 * stale duplicate rather than a real one.
 *
 * One function, three consumers (verifier context, kernel shadow, parity),
 * so the mapping cannot drift again. Pure; no I/O; deterministic.
 */
import type { PolicyMove } from './types'

/**
 * The subset this mapping can produce. CELEBRATE and WAIT are real PolicyMoves
 * but are not derivable from (recovery, session phase, ladder) — they are
 * decided elsewhere, so the return type says so rather than widening to
 * PolicyMove and forcing every consumer to handle cases that cannot occur.
 */
export type MappedMove = Extract<PolicyMove, 'TEACH' | 'SHOW' | 'ASK' | 'RECOVER' | 'CLOSE'>

export interface MoveInputs {
  /** recoveryGuard's failure-state key, or null. Highest authority: an
   *  interrupt owns the turn regardless of what the ladder decided. */
  recoveryKey: string | null
  /** sessionLifecycle phase. CLOSING outranks the concept ladder because the
   *  close is protected — it is never sacrificed to content. */
  episodePhase: string | null | undefined
  /** decideNextMove()'s output for the concept ladder. */
  ladderMove: 'teach' | 'show' | 'ask' | string | null
}

/**
 * Authority order — interrupt, then session layer, then concept ladder.
 * Mirrors the band ordering the rest of the runtime already uses; a lower
 * authority can never override a higher one.
 */
export function toPolicyMove(input: MoveInputs): MappedMove | null {
  if (input.recoveryKey !== null) return 'RECOVER'
  if (input.episodePhase === 'CLOSING') return 'CLOSE'
  if (input.ladderMove === 'teach') return 'TEACH'
  if (input.ladderMove === 'show') return 'SHOW'
  if (input.ladderMove === 'ask') return 'ASK'
  return null
}

/**
 * The per-turn question budget follows the MAPPED move, not the ladder's.
 * A recovery or closing turn carries 0 regardless of what the ladder wanted —
 * which is the whole reason the mapping has to happen before the budget is
 * computed rather than after.
 */
export function maxQuestionsFor(move: MappedMove | null): 0 | 1 {
  return move === 'ASK' ? 1 : 0
}
