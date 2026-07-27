/**
 * K6 — EOS integration feature flags.
 *
 * Master flag: ENABLE_EOS_RUNTIME. When set to '1', it implies every
 * sub-flag ON. When unset/0, all sub-flags default OFF and today's
 * behaviour is byte-identical.
 *
 * Sub-flags exist so canary rollouts and QA matrices can activate
 * subsystems individually before flipping the master flag.
 */

function on(v: string | undefined): boolean {
  return v === '1' || v === 'true' || v === 'on' || v === 'primary'
}

/**
 * K5 runs in two modes (Masterplan K5: "ENABLE_OUTPUT_VERIFIER
 * (log→enforce two-step)"). The two-step was specified but never
 * implemented — until now the flag was binary and went straight to
 * enforcement, which is the riskiest possible first activation:
 * a false REJECT costs a wasted LLM call and, on a second failure,
 * replaces real teaching with a template.
 *
 *   'off'     — the gate does not run at all.
 *   'log'     — the gate runs, records every violation, and delivers
 *               the ORIGINAL draft byte-identically. No rerender, no
 *               template, no added latency, no added cost. This is the
 *               false-positive measurement instrument: it answers "what
 *               would we have rejected?" without any learner paying for
 *               a wrong answer to that question.
 *   'enforce' — RS §9.3 in full: rerender once, then template.
 */
export type VerifierMode = 'off' | 'log' | 'enforce'

export interface EosFlags {
  eosRuntime: boolean       // ENABLE_EOS_RUNTIME (master)
  policyPacks: boolean      // ENABLE_POLICY_PACKS
  brainPacks: boolean       // ENABLE_BRAIN_PACKS
  outputVerifier: boolean   // ENABLE_OUTPUT_VERIFIER — gate runs at all
  verifierMode: VerifierMode
}

/** ENABLE_OUTPUT_VERIFIER accepts: unset/0 → off · 'log'/'observe' → log
 *  · 1/true/on/enforce → enforce. The master ENABLE_EOS_RUNTIME implies
 *  'log', NOT 'enforce': turning the whole runtime on must not silently
 *  hand the verifier the power to replace a learner's lesson with a
 *  template. Enforcement is always an explicit, separate decision. */
function readVerifierMode(master: boolean): VerifierMode {
  const raw = (process.env.ENABLE_OUTPUT_VERIFIER ?? '').trim().toLowerCase()
  if (raw === 'log' || raw === 'observe' || raw === 'log-only') return 'log'
  if (on(raw) || raw === 'enforce') return 'enforce'
  return master ? 'log' : 'off'
}

/** Read at call time (never cached) so flags remain hot-swappable
 *  across tests without process restarts. */
export function readEosFlags(): EosFlags {
  const master = on(process.env.ENABLE_EOS_RUNTIME)
  const verifierMode = readVerifierMode(master)
  return {
    eosRuntime: master,
    policyPacks: master || on(process.env.ENABLE_POLICY_PACKS),
    brainPacks: master || on(process.env.ENABLE_BRAIN_PACKS),
    outputVerifier: verifierMode !== 'off',
    verifierMode,
  }
}

/** Convenience: any EOS subsystem active this turn? */
export function anyEosActive(flags: EosFlags = readEosFlags()): boolean {
  return flags.policyPacks || flags.brainPacks || flags.outputVerifier
}
