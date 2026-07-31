/**
 * K6 — Degraded deterministic mode (RS P-3).
 *
 * ROOT CAUSE. RS P-3: "LLM unavailable/degraded → DEGRADED DETERMINISTIC
 * MODE: template renders + scripted moves … banner-free (learner not told
 * 'AI down')." The route's reality: when every provider in the failover
 * chain failed, the turn ended in HTTP 500 with "AI service temporarily
 * unavailable" — a banner, the precise thing P-3 forbids, and the K6 DoD's
 * outage drill ("learner gets teaching-shaped turns") could not pass.
 *
 * Every mechanism already existed: K5's templateFallback owns the three
 * deterministic, verifier-clean-by-construction templates, and the K3
 * fallback chain orders them. This module only CONNECTS them to the outage
 * path — it renders nothing of its own, because a second template body
 * would be a second owner of degraded pedagogy.
 *
 * Scope, honestly: this is P-3's template-render arm. The spec's fuller
 * degraded mode (asset serving, deterministic sensor subset, assessment
 * pause) matures with the subsystems it names; a health-check TRIGGER
 * (violation-rate spike per cfg:driver.violationSlo) is likewise future —
 * v1 degrades on the ground truth of this turn (every provider threw),
 * which needs no estimation to be correct.
 */
import { chooseFallback, renderFallback, templateMove } from '@/lib/kernel/verifier'
import type { PolicyMove } from '@/lib/kernel/types'

/** The K3 default chain (kernel/policy basePack B6 + engine completeness
 *  rule use the same order). Accepted as a parameter so a turn that has a
 *  real PolicyDecision can pass its own chain. */
export const DEFAULT_FALLBACK_CHAIN = ['SHOW_EASIEST_LEGAL', 'ECHO_MICROWIN', 'WARM_CLOSE']

/**
 * The provider value a degraded turn carries, and the single owner of the
 * question "did a model actually author this turn?".
 *
 * The value already existed on DegradedTurn; what did not exist was any
 * consumer of it. Downstream code treated a degraded turn as ordinary model
 * output, so a content-free outage template was recorded as authored teaching
 * — see the two guards that import this. Exported as a named constant and a
 * predicate so those consumers cannot drift from the producer by comparing a
 * bare string literal.
 */
export const DEGRADED_PROVIDER = 'degraded'

/** True when this turn's text is a degraded template rather than model output.
 *  The templates are content-free by construction (see templateFallback.ts),
 *  so nothing downstream may treat them as teaching the learner received. */
export function isDegradedProvider(provider: string | null | undefined): boolean {
  return provider === DEGRADED_PROVIDER
}

export interface DegradedTurn {
  text: string
  /** Distinguishable in Message.provider analytics; never shown as a banner. */
  provider: typeof DEGRADED_PROVIDER
  finishReason: 'template'
  move: PolicyMove
  kind: string
}

/** Pure. Deterministic in its inputs. Never throws (the outage path is the
 *  one place a second failure has nowhere left to go). */
export function degradedTurn(args: {
  register: 'beginner' | 'intermediate' | 'expert'
  learnerText: string
  fallbackChain?: string[]
}): DegradedTurn {
  const kind = chooseFallback(args.fallbackChain ?? DEFAULT_FALLBACK_CHAIN)
  return {
    text: renderFallback(kind, { register: args.register, learnerText: args.learnerText }),
    provider: 'degraded',
    finishReason: 'template',
    move: templateMove(kind),
    kind,
  }
}
