/**
 * chemistryAdmission — the chemistry-specific part of the ONE admission gate
 * (`admitVisualAsset`, asset.ts). It adds no pipeline: it is a predicate that gate
 * calls, for `chem.*` concepts only, on every tier's payload (authored, default,
 * approved, generated, restored) — so a generated figure faces exactly the gates an
 * authored one does.
 *
 * WHAT BLOCKS. Only a deterministic FAIL from `chemistryFigureAudit`:
 *   • structural — a payload the client's own `validateSceneSpec` would silently
 *     drop (the contract would then tell the tutor a figure exists that no learner
 *     sees), non-finite numbers, placeholder/debug text, internal ids, dangling refs;
 *   • chemical — a contradiction the figure's own text/geometry settles: an
 *     unbalanced equation drawn as balanced, an impossible valence, an EMF whose sign
 *     contradicts its "spontaneous", a molten salt labelled "in solution", …
 *
 * WHAT DOES NOT BLOCK. `REVIEW_REQUIRED` — reference data, prose claims, fixed card
 * renderers, anything the audit cannot establish. Blocking those would blank almost
 * every chemistry figure. REVIEW is the human-promotion / CI signal, not a runtime
 * block (see the audit module's verdict rule).
 *
 * If the audit itself throws, the figure is ADMITTED: a validator bug is not evidence
 * the figure is wrong, and `chemistryAdmission.test.ts` asserts the audit never throws
 * on any chemistry figure the resolver serves.
 */

import type { VisualPayload } from './types'
import { auditChemistryPayload, type AuditablePayload } from './chemistryFigureAudit.pure'

/** `null` = admit. Otherwise a one-line, auditable reason naming the first FAIL findings. */
export function chemistryAdmissionFailure(conceptId: string, payload: VisualPayload): string | null {
  if (!conceptId.startsWith('chem.')) return null
  if (payload.renderer === 'card' || payload.renderer === 'ascii') return null     // nothing the payload can contradict
  try {
    const result = auditChemistryPayload(payload as unknown as AuditablePayload)
    if (result.verdict !== 'FAIL') return null
    const fails = result.findings.filter((f) => f.severity === 'FAIL')
    const shown = fails.slice(0, 3).map((f) => `${f.code} @ ${f.where}: ${f.detail}`)
    return `${fails.length} chemistry validation failure${fails.length === 1 ? '' : 's'} — ${shown.join(' | ')}`
  } catch {
    return null
  }
}
