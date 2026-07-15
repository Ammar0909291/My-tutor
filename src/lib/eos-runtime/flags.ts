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

export interface EosFlags {
  eosRuntime: boolean       // ENABLE_EOS_RUNTIME (master)
  policyPacks: boolean      // ENABLE_POLICY_PACKS
  brainPacks: boolean       // ENABLE_BRAIN_PACKS
  outputVerifier: boolean   // ENABLE_OUTPUT_VERIFIER
}

/** Read at call time (never cached) so flags remain hot-swappable
 *  across tests without process restarts. */
export function readEosFlags(): EosFlags {
  const master = on(process.env.ENABLE_EOS_RUNTIME)
  return {
    eosRuntime: master,
    policyPacks: master || on(process.env.ENABLE_POLICY_PACKS),
    brainPacks: master || on(process.env.ENABLE_BRAIN_PACKS),
    outputVerifier: master || on(process.env.ENABLE_OUTPUT_VERIFIER),
  }
}

/** Convenience: any EOS subsystem active this turn? */
export function anyEosActive(flags: EosFlags = readEosFlags()): boolean {
  return flags.policyPacks || flags.brainPacks || flags.outputVerifier
}
