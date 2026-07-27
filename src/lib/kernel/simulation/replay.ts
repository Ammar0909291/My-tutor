/**
 * C6 — Replay theater (SDK-M5).
 *
 * "Authors SEE their knowledge teach before any human ever meets it."
 *
 * This module RENDERS an episode; it does not run one. runEpisode (K6) drives
 * the real kernel stages and is the only thing allowed to produce a decision —
 * a replay that computed its own turns would be a second teaching engine
 * wearing a transcript costume, and would show authors something the runtime
 * never does.
 *
 * So the whole of C6's core is: take the EpisodeTurn[] the battery already
 * verified, and make it legible. Pure formatting, no I/O, no decisions.
 *
 * SCOPE. The masterplan names three replays; all three are this one function
 * over a differently-seeded episode, which is why there is one renderer and
 * not three:
 *   · teaching replay  — a persona traversing the concept turn by turn
 *   · recovery replay  — a persona whose utterances trip the interrupt
 *   · question-stage replay — the stage ceiling column, checked per turn
 * The webview and the ≤5 s incremental edit loop are the editor half of C6
 * and belong with the extension shell, not here.
 */
import { PHASE_ORDER } from '@/lib/teaching/conversationState'
import type { EpisodeTurn } from './invariants'
import type { EpisodeResult } from './run'

export interface ReplayOptions {
  /** Render the ENGINE's decisions instead of the adapter path's. Requires
   *  the episode to have been run with engineShadow. */
  engine?: boolean
  /** Include the rule path per turn. The point of the whole feature — an
   *  author needs to see WHY, not just what — but long enough to be worth
   *  suppressing when scanning many episodes. */
  rules?: boolean
}

function pad(s: string, n: number): string {
  return s.length >= n ? s.slice(0, n) : s + ' '.repeat(n - s.length)
}

/** One turn as a transcript line pair: what the learner said, what the
 *  kernel decided, and (optionally) which rules produced it. */
export function formatTurn(t: EpisodeTurn, opts: ReplayOptions = {}): string {
  const head =
    `  ${String(t.turnIndex).padStart(2)}  ` +
    `${pad(t.stateBefore.phase, 12)} ` +
    `stage≤${t.decision.stageCeiling}  ` +
    `${pad(t.decision.move ?? '—', 8)} ` +
    `${pad(t.decision.actionClass ?? '—', 22)}` +
    `${t.recoveryActive ? ' [RECOVERY]' : ''}`
  const said = `      learner: ${JSON.stringify(t.message ?? '')}`
  const rules = opts.rules && t.decision.provenance.length > 0
    ? `\n      rules:   ${t.decision.provenance.join(' · ')}`
    : ''
  return `${said}\n${head}${rules}`
}

/**
 * The full transcript. Reports violations LAST and prominently: a replay that
 * looked fine and buried a violated invariant would teach an author exactly
 * the wrong lesson about their content.
 */
export function formatReplay(result: EpisodeResult, opts: ReplayOptions = {}): string {
  const source = opts.engine ? result.engine?.turns : result.turns
  const violations = opts.engine ? result.engine?.violations : result.violations
  if (!source) {
    return 'engine replay requested but this episode was not run with engineShadow'
  }

  const lines: string[] = [
    `replay · persona=${result.personaId} seed=${result.seed} ` +
    `path=${opts.engine ? 'ENGINE (K4 pack)' : 'adapter (shipping ladder)'}`,
    '',
  ]
  for (const t of source) lines.push(formatTurn(t, opts))

  lines.push('')
  lines.push(
    `  asks=${result.outcome.asks} gives=${result.outcome.gives} ` +
    `recoveries=${result.outcome.recoveries} finalPhase=${result.outcome.finalPhase}`,
  )
  lines.push(`  phases reached: ${result.outcome.reachedPhase.join(' → ')}`)

  if (result.engine && !opts.engine) {
    lines.push(`  engine-vs-adapter move divergences: ${result.engine.moveDivergences.length}`)
  }

  const v = violations ?? []
  lines.push('')
  lines.push(v.length === 0
    ? '  INVARIANTS: clean'
    : `  INVARIANTS: ${v.length} VIOLATION(S)`)
  for (const x of v) lines.push(`    turn ${x.turnIndex}  ${x.code}  ${x.detail}`)

  return lines.join('\n')
}

/**
 * The question-stage replay, as its own answer rather than something an
 * author has to eyeball down a column. Empty is the expected result — this
 * exists to prove a skip did NOT happen.
 *
 * A NOTE ON WHAT "JUMP" MEANS, because the obvious definition is wrong.
 * The first version of this function flagged the stage CEILING rising by more
 * than one between consecutive turns. Running it against the real personas
 * showed that is not a defect at all: PHASE_MAX_QUESTION_STAGE goes
 * OBSERVE 2 → DEMONSTRATE 2 → GUIDE 4 → CHECK 4 → PRACTICE 6 → TRANSFER 7,
 * so the ceiling legitimately rises by two across adjacent phases. The
 * arithmetic looked plausible and measured nothing real.
 *
 * The defect worth surfacing is a skipped PHASE — the ladder advancing more
 * than one position in PHASE_ORDER in a single turn. Asking above the ceiling
 * is a different failure and already has an owner: invariant I-1 in the
 * battery. This does not duplicate it.
 */
export function stageJumps(
  turns: readonly EpisodeTurn[],
): Array<{ turnIndex: number; from: string; to: string }> {
  const jumps: Array<{ turnIndex: number; from: string; to: string }> = []
  for (let i = 1; i < turns.length; i++) {
    const from = turns[i - 1].stateBefore.phase
    const to = turns[i].stateBefore.phase
    const a = PHASE_ORDER.indexOf(from)
    const b = PHASE_ORDER.indexOf(to)
    // Only FORWARD skips. Dropping back is legal and deliberate — a failure
    // moves the learner down the ladder, sometimes several steps.
    if (a >= 0 && b > a + 1) jumps.push({ turnIndex: turns[i].turnIndex, from, to })
  }
  return jumps
}
