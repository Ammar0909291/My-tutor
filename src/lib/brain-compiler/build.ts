/**
 * C4 — the build entry point: CEKR snapshot → CompiledPack + brain.lock.
 *
 * Two things the masterplan's C4 DoD names and the pipeline lacked:
 * `brain.lock`, and the double-build determinism check.
 *
 * ── Why the determinism check is a BUILD step, not a test ────────────────
 * "Byte-reproducible" is a property of every build, not of the one build the
 * test suite happens to run. Checking it inside `build()` means a
 * non-deterministic pass is caught on the developer's machine at the moment it
 * is introduced, rather than in CI against a different corpus. It costs one
 * extra compile of an already-in-memory snapshot.
 */
import { emitCompiledPack } from './lowering'
import { compileFromCekr, type CekrCompileOptions } from './fromCekr'
import { canonicalJsonHash } from './hash'
import type { CekrRecord } from '@/lib/cekr/types'
import type { CompiledPack, Diagnostic } from './types'

export interface BrainLock {
  /** Pack identity, so a lock cannot be read against the wrong pack. */
  packId: string
  packVersion: string
  /** The hash the build produced. A mismatch on a later build means the
   *  inputs changed — which is exactly what a lockfile is for. */
  contentHash: string
  /** CEKR source files that contributed, with their record counts. */
  sources: Record<string, number>
  ruleCount: number
  /** Every rule id, sorted. A rule silently disappearing is the failure mode
   *  a hash alone reports as "something changed"; this says WHAT. */
  ruleIds: string[]
}

export interface BuildResult {
  ok: boolean
  pack: CompiledPack | null
  lock: BrainLock | null
  diagnostics: Diagnostic[]
  /** True when two independent compiles of the same snapshot agreed. */
  deterministic: boolean
}

export function buildFromCekr(
  records: readonly CekrRecord[],
  opts: CekrCompileOptions,
): BuildResult {
  const first = compileFromCekr(records, opts)
  const diagnostics = [...first.diagnostics]
  if (!first.pack) {
    return { ok: false, pack: null, lock: null, diagnostics, deterministic: false }
  }

  const sourceLock: Record<string, string> = {}
  for (const f of first.pack.sourceFiles) sourceLock[f] = canonicalJsonHash({ file: f })
  const pack = emitCompiledPack(first.pack, sourceLock)

  // ── the double-build check ───────────────────────────────────────────────
  const second = compileFromCekr(records, opts)
  const secondPack = second.pack ? emitCompiledPack(second.pack, sourceLock) : null
  // compiledAtIso is informational and explicitly excluded from the hash, so
  // the RULES are what must match — comparing whole manifests would fail on a
  // clock tick and prove nothing.
  const deterministic =
    secondPack !== null &&
    secondPack.manifest.contentHash === pack.manifest.contentHash &&
    canonicalJsonHash(secondPack.rules) === canonicalJsonHash(pack.rules)

  if (!deterministic) {
    diagnostics.push({
      code: 'E4900', severity: 'E',
      message: 'double-build determinism check FAILED — two compiles of the same snapshot produced different packs',
    })
  }

  const sources: Record<string, number> = {}
  for (const r of records) {
    const f = r.citations[0]?.file ?? 'unknown'
    sources[f] = (sources[f] ?? 0) + 1
  }

  const lock: BrainLock = {
    packId: pack.manifest.packId,
    packVersion: pack.manifest.packVersion,
    contentHash: pack.manifest.contentHash,
    sources,
    ruleCount: pack.rules.length,
    ruleIds: pack.rules.map((r) => r.ruleId).sort(),
  }

  return {
    ok: deterministic && !diagnostics.some((d) => d.severity === 'E'),
    pack, lock, diagnostics, deterministic,
  }
}

/** Serialize the lock. Sorted keys so it diffs cleanly in review. */
export function serializeLock(lock: BrainLock): string {
  return JSON.stringify(lock, Object.keys(lock).sort(), 2) + '\n'
}

/** Does a fresh build still match a recorded lock? The regression question. */
export function lockMatches(lock: BrainLock, fresh: BrainLock): { ok: boolean; reasons: string[] } {
  const reasons: string[] = []
  if (lock.contentHash !== fresh.contentHash) reasons.push(`contentHash ${lock.contentHash} → ${fresh.contentHash}`)
  if (lock.ruleCount !== fresh.ruleCount) reasons.push(`ruleCount ${lock.ruleCount} → ${fresh.ruleCount}`)
  const before = new Set(lock.ruleIds)
  const after = new Set(fresh.ruleIds)
  for (const id of lock.ruleIds) if (!after.has(id)) reasons.push(`rule removed: ${id}`)
  for (const id of fresh.ruleIds) if (!before.has(id)) reasons.push(`rule added: ${id}`)
  return { ok: reasons.length === 0, reasons }
}
