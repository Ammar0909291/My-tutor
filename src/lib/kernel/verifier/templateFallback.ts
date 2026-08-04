/**
 * K5 — Deterministic template fallback (RS §9.3 step 2).
 *
 * When the constrained re-render still fails verification, the pipeline
 * MUST NOT attempt a third LLM call. Instead, a pack-scripted template
 * is chosen from PolicyDecision.fallbackChain and rendered with typed
 * inputs. Pure. No LLM.
 *
 * MVP: three built-in templates covering the frozen fallback ladder:
 *   SHOW_EASIEST_LEGAL — a phase-appropriate concrete demonstration
 *   ECHO_MICROWIN      — an echo-based single-win bank
 *   WARM_CLOSE         — a warm end-of-session close
 *
 * Every template is content-free (no fabricated pedagogy) and safe:
 * no questions, no formulas, no new terms, no assessment tags.
 * The templates themselves pass the verifier by construction (K5 tests
 * confirm this).
 */
import type { PolicyMove } from '../types'
import { degradedCopy } from '@/lib/teaching/degradedCopy'

export type FallbackKind = 'SHOW_EASIEST_LEGAL' | 'ECHO_MICROWIN' | 'WARM_CLOSE'

export interface TemplateContext {
  register: 'beginner' | 'intermediate' | 'expert'
  learnerText: string      // for a short echo-style acknowledgment (no verbatim reflection back)
}

export function renderFallback(kind: FallbackKind, ctx: TemplateContext): string {
  switch (kind) {
    case 'SHOW_EASIEST_LEGAL':
      // No imperative-task patterns; no questions; no new terms — the
      // template is a pure statement so V-Q1/V-Q2/V-STAGE pass by
      // construction under any move it might carry.
      return "Let's take one small step together. I'll walk through it with you and pause whenever it helps.\n\n" +
             "We can continue from here whenever you're ready."
    case 'ECHO_MICROWIN':
      return "Nice — that was a good start. We'll keep it just like this and go a bit further whenever you're ready."
    case 'WARM_CLOSE':
      return "This is a good place to stop for now. We can pick this up next time — you did solid work today."
  }
}

/** Choose a fallback per the policy chain. Never fails; falls back to
 *  a WARM_CLOSE if the pack chain is somehow empty. */
export function chooseFallback(chain: string[]): FallbackKind {
  for (const k of chain) {
    if (k === 'SHOW_EASIEST_LEGAL' || k === 'ECHO_MICROWIN' || k === 'WARM_CLOSE') return k
  }
  return 'WARM_CLOSE'
}

/**
 * Consecutive-outage escalation.
 *
 * Root cause of the observed transcript: when every provider failed, the SAME
 * template was returned on every turn. Six byte-identical replies landed in a
 * row while the learner typed "Got it", "Just start the damn lesson already"
 * and "I don't understand, explain differently" — the tutor looked broken and
 * ignored them, because the template is content-free by design and nothing
 * tracked that it had already been used.
 *
 * Note this could never be fixed by the P3 anti-repetition ledger: that
 * constrains the MODEL's prompt, and these turns never reach a model.
 *
 * `consecutiveFailures` is how many outage turns have now happened in a row
 * (1 = the first). Repeating the identical text is the single worst signal, so
 * the wording changes on the second, and by the third the learner is told
 * plainly that something is wrong rather than being left to conclude the
 * product is broken.
 */
export function renderOutage(consecutiveFailures: number, base: FallbackKind, ctx: TemplateContext): string {
  // P19: the escalation copy now lives in the shared catalog
  // (lib/teaching/degradedCopy.ts) so the server channel and the client
  // transport channel cannot drift apart again. The EXECUTION path is
  // unchanged — this is still the only place the chat route gets its degraded
  // text — and the rung-1 teaching template stays here, because a K5 policy
  // template is teaching-shaped content, not apology copy.
  const copy = degradedCopy({ channel: 'server_degraded', consecutiveFailures })
  return copy ?? renderFallback(base, ctx)
}

/** The template renderer suppresses questions; guarantees no LLM call. */
export function templateMove(kind: FallbackKind): PolicyMove {
  switch (kind) {
    case 'SHOW_EASIEST_LEGAL': return 'SHOW'
    case 'ECHO_MICROWIN':      return 'TEACH'
    case 'WARM_CLOSE':         return 'CLOSE'
  }
}
