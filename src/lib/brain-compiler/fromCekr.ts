/**
 * C4 — the CEKR front end.
 *
 * The masterplan's C4 opens with "EBC front-end (loads CEKR snapshots)", and
 * that was the missing half of this pipeline: `compile()` consumed .bs source
 * only, so nothing the C3 importers produced could ever reach a pack. This
 * module closes it.
 *
 *     CEKR snapshot ──► PackAST ──► emitCompiledPack ──► CompiledPack
 *                                        (existing)          (existing)
 *
 * REUSES the existing back end wholesale. `lowerToAST` is the .bs front end
 * and is not touched; this is a second front end onto the SAME PackAST, so
 * rule emission, hashing, the manifest and the registry loader are shared.
 * Two emitters would be two answers to "what is a compiled pack".
 *
 * ── What it compiles, and why only this ──────────────────────────────────
 * Band 3 is "authored per-concept dispatch: if authored, it wins outright —
 * retrieval beats derivation, always" (v2 arch §6.1). That is precisely what
 * a CEKR constellation is: an authored statement about one concept. So the
 * front end emits Band-3 dispatch rules and nothing else. Bands 0-2 are
 * legality and interrupts — they are kernel invariants, not authored content,
 * and compiling them from a corpus would move safety rules into data that any
 * import could rewrite. Bands 4-6 are generic tables that exist in BASE_PACK.
 *
 * Scope discipline is the masterplan's own: "enough passes to ship K4's pack
 * needs; set-cover/dominator optimizations later."
 */
import type {
  CekrEdge, CekrEnvelope, CekrRecord,
} from '@/lib/cekr/types'
import { isEdge, slugOf } from '@/lib/cekr/types'
import type { Diagnostic, GuardAST, PackAST, RuleAST, SourceSpan } from './types'
import type { GuardClause } from './types'
import { fieldsRead, describeGuard } from './predicates'
import type { ContentSlot } from '@/lib/kernel/policy/types'

export interface CekrCompileOptions {
  packId: string
  packVersion: string
  description?: string
  /** Only entities whose status is in this set contribute rules. DRAFT is
   *  excluded by default: an unreviewed import must not silently become
   *  runtime policy (the ADR-14 lifecycle rule, inherited). */
  servableStatuses?: ReadonlySet<string>
}

export interface CekrCompileResult {
  pack: PackAST | null
  diagnostics: Diagnostic[]
}

const NO_SPAN: SourceSpan = { file: 'cekr://snapshot', startLine: 0, endLine: 0 }

/**
 * Dispatch is keyed on the active concept — the one guard field that makes a
 * rule "per-concept". The GuardAST wrapper (ast + reads + describe) is built
 * with the SAME helpers the .bs path uses (`fieldsRead`, `describeGuard`), so
 * a CEKR-compiled rule is indistinguishable from an authored one downstream.
 */
function conceptGuard(conceptId: string, phase?: string): GuardAST {
  const clauses: GuardClause[] = [
    { kind: 'eq', field: 'currentConceptId', value: conceptId },
  ]
  if (phase) clauses.push({ kind: 'eq', field: 'phase', value: phase })
  const ast: GuardClause = { kind: 'all', clauses }
  return { ast, reads: fieldsRead(ast), describe: describeGuard(ast) }
}

/**
 * Specificity is the count of bound predicates (RS §5.3's own definition), so
 * a phase-scoped rule outranks a concept-only rule without any extra
 * bookkeeping. Computed here rather than authored, because an authored
 * specificity can disagree with the guard it labels.
 */
function specificityOf(guard: GuardAST): number {
  return guard.ast.kind === 'all' ? guard.ast.clauses.length : 1
}

export function compileFromCekr(
  records: readonly CekrRecord[],
  opts: CekrCompileOptions,
): CekrCompileResult {
  const diagnostics: Diagnostic[] = []
  const servable = opts.servableStatuses ?? new Set(['ACTIVE'])

  const entities = new Map<string, CekrEnvelope>()
  const edges: CekrEdge[] = []
  for (const r of records) {
    if (isEdge(r)) edges.push(r as CekrEdge)
    else entities.set(r.id, r as CekrEnvelope)
  }

  // concept id → the explanatory entities attached to it.
  const explainsByConcept = new Map<string, CekrEnvelope[]>()
  const repairsByMisconception = new Map<string, CekrEnvelope[]>()
  const misconceptionsByConcept = new Map<string, CekrEnvelope[]>()

  for (const e of edges) {
    const from = entities.get(e.from)
    const to = entities.get(e.to)
    if (!from || !to) continue
    if (e.edgeKind === 'EXPLAINS') {
      explainsByConcept.set(e.to, [...(explainsByConcept.get(e.to) ?? []), from])
    } else if (e.edgeKind === 'TARGETS') {
      misconceptionsByConcept.set(e.to, [...(misconceptionsByConcept.get(e.to) ?? []), from])
    } else if (e.edgeKind === 'REPAIRS') {
      repairsByMisconception.set(e.to, [...(repairsByMisconception.get(e.to) ?? []), from])
    }
  }

  const rules: RuleAST[] = []
  const sourceFiles = new Set<string>()

  // Stable iteration: sorted concept ids, so two builds emit rules in the same
  // order and the content hash is reproducible.
  const conceptIds = [...entities.values()]
    .filter((e) => e.kind === 'Concept')
    .map((e) => e.id)
    .sort()

  for (const conceptId of conceptIds) {
    const concept = entities.get(conceptId)!
    // The guard must key on the slug the RUNTIME sees. PolicyInputs
    // .currentConceptId is a KG slug, never a CEKR id — so falling back to the
    // raw entity id (as this did) emitted rules that compiled, loaded, and
    // could never fire. Imported concepts carry body.kgId; hand-authored ones
    // (C2 BrainScript) do not, and for those the slug is recoverable from the
    // id by its own inverse. Caught by the ISS-24 golden thread.
    const kgId = typeof concept.body.kgId === 'string' ? concept.body.kgId : slugOf(conceptId)

    const explanations = (explainsByConcept.get(conceptId) ?? [])
      .filter((x) => servable.has(x.status))
      .sort((a, b) => a.id.localeCompare(b.id))

    if (explanations.length === 0) continue      // nothing authored ⇒ no Band-3 rule

    for (const x of explanations) sourceFiles.add(x.citations[0]?.file ?? 'cekr://unknown')

    // The DEMONSTRATE dispatch: this concept has an authored explanation, so
    // Band 3 supplies it and Band 4's generic table is skipped for this field.
    const guard = conceptGuard(kgId, 'DEMONSTRATE')
    rules.push({
      ruleId: `B3.dispatch.${kgId}.demonstrate`,
      band: 3,
      specificity: specificityOf(guard),
      mandatory: false,
      citation: explanations[0].citations[0]?.file ?? 'cekr://snapshot',
      guard,
      effect: {
        actionClass: 'DEMONSTRATION',
        // The assets the runtime should RETRIEVE rather than regenerate —
        // the whole point of Band 3. The payload carries the CEKR entity id,
        // which is the runtime's evidence-join key (CEKR §13's stability
        // contract: pack ids embed CEKR ids).
        contentSlots: explanations.map((x): ContentSlot => ({
          kind: 'action-procedure',
          payload: { entityId: x.id, entityKind: x.kind, conceptId: kgId },
          citation: x.citations[0]?.file ?? 'cekr://snapshot',
        })),
      },
      span: NO_SPAN,
    })

    // A concept with a known misconception AND an authored repair gets a
    // repair dispatch. Without a repair script there is nothing to dispatch
    // to, so no rule is emitted — an empty dispatch would be worse than none.
    const misconceptions = (misconceptionsByConcept.get(conceptId) ?? [])
      .filter((m) => servable.has(m.status))
      .sort((a, b) => a.id.localeCompare(b.id))
    const repairs = misconceptions
      .flatMap((m) => repairsByMisconception.get(m.id) ?? [])
      .filter((r) => servable.has(r.status))
      .sort((a, b) => a.id.localeCompare(b.id))

    if (repairs.length > 0) {
      const repairGuard = conceptGuard(kgId)
      rules.push({
        ruleId: `B3.dispatch.${kgId}.repair`,
        band: 3,
        specificity: specificityOf(repairGuard),
        mandatory: false,
        citation: repairs[0].citations[0]?.file ?? 'cekr://snapshot',
        guard: repairGuard,
        effect: {
          actionClass: 'MISCONCEPTION_REPAIR',
          contentSlots: repairs.map((r): ContentSlot => ({
            kind: 'recovery-script',
            payload: { entityId: r.id, entityKind: r.kind, conceptId: kgId },
            citation: r.citations[0]?.file ?? 'cekr://snapshot',
          })),
        },
        span: NO_SPAN,
      })
      for (const r of repairs) sourceFiles.add(r.citations[0]?.file ?? 'cekr://unknown')
    }
  }

  if (rules.length === 0) {
    diagnostics.push({
      code: 'W4001', severity: 'W',
      message: `no servable content in the snapshot (statuses accepted: ${[...servable].join(', ')}) — emitting an empty pack`,
    })
  }

  // Deterministic rule order: ruleId is unique and sorts stably.
  rules.sort((a, b) => a.ruleId.localeCompare(b.ruleId))

  return {
    pack: {
      packId: opts.packId,
      packVersion: opts.packVersion,
      description: opts.description ?? `Compiled from a CEKR snapshot (${rules.length} rules)`,
      rules,
      sourceFiles: [...sourceFiles].sort(),
      span: NO_SPAN,
    },
    diagnostics,
  }
}
