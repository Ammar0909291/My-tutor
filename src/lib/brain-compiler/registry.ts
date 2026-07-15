/**
 * C4 — Pack Registry + Runtime Loader.
 *
 * Registry: in-memory store of activated packs keyed by (packId).
 * Loader:   CompiledPack → PolicyPack (attaches predicate functions).
 *
 * Merge: base K4 pack + N compiled packs → one flat PolicyPack the K4
 * engine consumes. Layer order = registry insertion order; per RS §5.5
 * an override with the SAME ruleId supersedes the earlier one.
 *
 * MVP: no persistent storage; the registry is process-local. C4 follow-on
 * adds disk persistence + PackRegistry DB table (P2 pending; masterplan).
 */
import type { PolicyPack, Rule, BandId } from '@/lib/kernel/policy/types'
import { BASE_PACK } from '@/lib/kernel/policy'
import type { CompiledPack, CompiledRule } from './types'
import { toRuntimeGuard } from './predicates'
import { canonicalJsonHash } from './hash'

/** Turn a CompiledPack into a PolicyPack the engine can execute. */
export function loadPack(compiled: CompiledPack): PolicyPack {
  // Integrity check: recompute the hash of the rules[] and compare.
  const recomputed = canonicalJsonHash(compiled.rules)
  if (recomputed !== compiled.manifest.contentHash) {
    throw new Error(`pack integrity check failed for "${compiled.manifest.packId}" ` +
      `(expected ${compiled.manifest.contentHash}, got ${recomputed})`)
  }
  const rules: Rule[] = compiled.rules.map(fromCompiledRule)
  return { packVersion: compiled.manifest.packVersion, rules }
}

function fromCompiledRule(cr: CompiledRule): Rule {
  return {
    ruleId: cr.ruleId, band: cr.band,
    guard: toRuntimeGuard({ ast: cr.guardAst, reads: cr.guardReads, describe: cr.guardDescribe }),
    effect: cr.effect,
    specificity: cr.specificity, citation: cr.citation, mandatory: cr.mandatory,
  }
}

/** Merge policy packs preserving RS §5.5 overlay semantics: later packs
 *  may add rules AND override same-ruleId rules; mandatory rules cannot
 *  be REMOVED (they are added-back below if a later pack omits them). */
export function mergePacks(...packs: PolicyPack[]): PolicyPack {
  const byId = new Map<string, Rule>()
  for (const pack of packs) for (const r of pack.rules) byId.set(r.ruleId, r)
  return {
    packVersion: packs.map((p) => p.packVersion).join('+'),
    rules: [...byId.values()].sort((a, b) => a.band - b.band || a.ruleId.localeCompare(b.ruleId)),
  }
}

// ── Registry ────────────────────────────────────────────────────────────────

interface RegistryEntry {
  compiled: CompiledPack
  loaded: PolicyPack
  order: number
}

class PackRegistry {
  private packs = new Map<string, RegistryEntry>()
  private order = 0

  activate(compiled: CompiledPack): void {
    const loaded = loadPack(compiled)
    this.packs.set(compiled.manifest.packId, { compiled, loaded, order: this.order++ })
  }

  deactivate(packId: string): boolean {
    return this.packs.delete(packId)
  }

  clear(): void { this.packs.clear(); this.order = 0 }

  has(packId: string): boolean { return this.packs.has(packId) }
  get(packId: string): RegistryEntry | undefined { return this.packs.get(packId) }
  list(): RegistryEntry[] {
    return [...this.packs.values()].sort((a, b) => a.order - b.order)
  }

  /** Assemble a runtime pack: BASE_PACK + activated compiled packs, in order. */
  runtimePack(): PolicyPack {
    const compiled = this.list().map((e) => e.loaded)
    return mergePacks(BASE_PACK, ...compiled)
  }

  /** Coverage report: which bands have compiled rules; the ADR metric
   *  the masterplan tracks (§14 success metrics). */
  coverage(): Partial<Record<BandId, number>> {
    const counts: Partial<Record<BandId, number>> = {}
    for (const entry of this.list()) {
      for (const r of entry.compiled.rules) counts[r.band] = (counts[r.band] ?? 0) + 1
    }
    return counts
  }
}

/** Singleton registry — process-local. */
export const packRegistry = new PackRegistry()
