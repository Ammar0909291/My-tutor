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
