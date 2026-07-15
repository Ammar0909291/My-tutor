/**
 * K4 — TSM: phase ladder (RS §5.1) and the ISS-01 mapping.
 *
 * Runtime ships with the 10-state RS ladder as canonical. The Phase-C/G
 * 6-phase names are STILL emitted by conversationState.ts for the shadow
 * pipeline and legacy call sites; this module owns the bidirectional
 * mapping declared in the Issue Register.
 */

export type CanonicalPhase =
  | 'DIAGNOSE' | 'ANCHOR' | 'DEMONSTRATE' | 'NAME' | 'FORMALIZE'
  | 'GUIDED' | 'INDEPENDENT' | 'REFLECT' | 'ASSESS' | 'TRANSFER'

export const PHASE_ORDER_10: readonly CanonicalPhase[] = [
  'DIAGNOSE', 'ANCHOR', 'DEMONSTRATE', 'NAME', 'FORMALIZE',
  'GUIDED', 'INDEPENDENT', 'REFLECT', 'ASSESS', 'TRANSFER',
] as const

/** Per-phase Question Stage ceiling (RS §4.10 + K4 extension for the new
 *  states). OBSERVE-class max 2; GUIDED/CHECK-class 4; PRACTICE Stage 6;
 *  TRANSFER 7. */
export const STAGE_CEILING: Record<CanonicalPhase, number> = {
  DIAGNOSE: 2, ANCHOR: 2, DEMONSTRATE: 2, NAME: 3, FORMALIZE: 4,
  GUIDED: 4, INDEPENDENT: 5, REFLECT: 4, ASSESS: 6, TRANSFER: 7,
}

/** Ceilings for the legacy 6-phase names still emitted by
 *  conversationState.ts (Phase C–G). */
export const LEGACY_STAGE_CEILING: Record<string, number> = {
  OBSERVE: 2, DEMONSTRATE: 2, GUIDE: 4, CHECK: 4, PRACTICE: 6, TRANSFER: 7,
}

/** ISS-01 mapping: legacy → canonical.
 *  OBSERVE→ANCHOR, DEMONSTRATE→DEMONSTRATE (+NAME/FORMALIZE unsplit),
 *  GUIDE→GUIDED, CHECK→ASSESS (inline), PRACTICE→INDEPENDENT,
 *  TRANSFER→TRANSFER. */
export function legacyToCanonical(legacy: string): CanonicalPhase {
  switch (legacy) {
    case 'OBSERVE': return 'ANCHOR'
    case 'DEMONSTRATE': return 'DEMONSTRATE'
    case 'GUIDE': return 'GUIDED'
    case 'CHECK': return 'ASSESS'
    case 'PRACTICE': return 'INDEPENDENT'
    case 'TRANSFER': return 'TRANSFER'
    // Already canonical:
    case 'DIAGNOSE': case 'ANCHOR': case 'NAME': case 'FORMALIZE':
    case 'GUIDED': case 'INDEPENDENT': case 'REFLECT': case 'ASSESS':
      return legacy as CanonicalPhase
    default:
      return 'ANCHOR'
  }
}

/** Canonical → legacy 6-phase name (surjective — used to talk to the
 *  Phase-C/G modules that still exist). */
export function canonicalToLegacy(canonical: CanonicalPhase): string {
  switch (canonical) {
    case 'DIAGNOSE': case 'ANCHOR': return 'OBSERVE'
    case 'DEMONSTRATE': case 'NAME': return 'DEMONSTRATE'
    case 'FORMALIZE': case 'GUIDED': return 'GUIDE'
    case 'REFLECT': case 'ASSESS': return 'CHECK'
    case 'INDEPENDENT': return 'PRACTICE'
    case 'TRANSFER': return 'TRANSFER'
  }
}

/** Total: accepts either legacy or canonical name and returns the ceiling. */
export function getStageCeiling(phase: string): number {
  if (phase in STAGE_CEILING) return STAGE_CEILING[phase as CanonicalPhase]
  if (phase in LEGACY_STAGE_CEILING) return LEGACY_STAGE_CEILING[phase]
  return 2 // conservative fallback (RS §5.4 mandatory legality set)
}

export function isCanonicalPhase(x: string): x is CanonicalPhase {
  return (PHASE_ORDER_10 as readonly string[]).includes(x)
}
