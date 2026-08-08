/**
 * Visual Resolver V2 rollout switch.
 *
 * ON by default: V2's whole purpose is to make graphical visualization the
 * default, so shipping it behind an opt-in flag would preserve the exact
 * behaviour it exists to replace. Set `VISUAL_RESOLVER_V2=0` (or `false`) to
 * fall back to the legacy four-pipeline path — an escape hatch for incident
 * response, not a long-term configuration.
 *
 * This is a MIGRATION flag, not a capability flag. It is scheduled for removal
 * once V2 is validated in production, at which point the legacy pipelines and
 * their own three capability flags are deleted with it.
 */
export function isVisualResolverV2Enabled(): boolean {
  const raw = process.env.VISUAL_RESOLVER_V2
  if (raw === undefined || raw === '') return true
  return raw !== '0' && raw.toLowerCase() !== 'false'
}

/**
 * Runtime scene-generation authorization — the ONE authority.
 *
 * The engine previously had a single global switch, so turning it on would
 * have exposed runtime generation to every concept without a curated visual
 * (1,279 of 1,775). A canary needs a scope, and this is it.
 *
 * Generation is permitted only when BOTH hold:
 *   ENABLE_AI_SCENE_GENERATION === 'true'
 *   AND conceptId appears verbatim in VISUAL_AI_SCENE_ALLOWLIST
 *
 * This is an ELIGIBILITY gate, not merely a generation gate: it is consulted
 * before the cache is read, so a concept that leaves the allowlist — or a flag
 * that is switched off — immediately stops serving generated scenes that were
 * already cached. That preserves the verified property that disabling
 * generation removes generated visuals from learners at once.
 *
 * Matching is exact after trimming. There is deliberately NO wildcard, prefix,
 * regex or subject-wide form: 'physics' and 'phys.*' match nothing, because a
 * canary that can be widened by a typo is not a canary. An empty or unset
 * allowlist denies everything and never means "allow all". Duplicate and empty
 * comma-separated entries are harmless.
 *
 * The mechanism is subject-agnostic; the first cohort happens to be Physics.
 * Curated registry and generator visuals never consult this — they are
 * unaffected by any value here.
 */
export function isRuntimeSceneGenerationAllowed(conceptId: string | null | undefined): boolean {
  if (!conceptId) return false
  if (process.env.ENABLE_AI_SCENE_GENERATION !== 'true') return false
  return runtimeSceneAllowlist().has(conceptId.trim())
}

/** The parsed allowlist. Parsing lives here alone — never in the engine or the route. */
export function runtimeSceneAllowlist(): ReadonlySet<string> {
  const raw = process.env.VISUAL_AI_SCENE_ALLOWLIST
  if (!raw || !raw.trim()) return EMPTY_ALLOWLIST
  const out = new Set<string>()
  for (const entry of raw.split(',')) {
    const id = entry.trim()
    if (id) out.add(id)
  }
  return out
}

const EMPTY_ALLOWLIST: ReadonlySet<string> = new Set()
