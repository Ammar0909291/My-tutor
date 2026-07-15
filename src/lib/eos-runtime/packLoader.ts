/**
 * K6 — Brain pack loader (lazy, idempotent).
 *
 * Scans brain/*.bs on first invocation, compiles each file via the C4
 * compiler, and activates the resulting Compiled Packs in the shared
 * packRegistry. Subsequent calls are no-ops (idempotent). The
 * registry.list() output determines pack order.
 *
 * Failure isolation: an individual pack that fails to compile is
 * logged and SKIPPED; other packs continue to load. A missing brain/
 * directory is not an error (dev environments without authored
 * packs). This preserves today's behaviour when brain/ is empty.
 */
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { compileSingle, packRegistry } from '@/lib/brain-compiler'

interface LoadReport {
  scanned: number
  activated: number
  failed: Array<{ file: string; error: string }>
}

let loaded = false
let cachedReport: LoadReport | null = null

/** Load once per process. Returns the report on every call. */
export function ensureBrainPacksLoaded(): LoadReport {
  if (loaded && cachedReport) return cachedReport
  const report: LoadReport = { scanned: 0, activated: 0, failed: [] }
  try {
    const dir = resolve(process.cwd(), 'brain')
    if (!existsSync(dir) || !statSync(dir).isDirectory()) {
      loaded = true; cachedReport = report; return report
    }
    // Deterministic order: sorted filenames (lex).
    const files = readdirSync(dir).filter((f) => f.endsWith('.bs')).sort()
    for (const f of files) {
      report.scanned += 1
      const path = join(dir, f)
      try {
        const src = readFileSync(path, 'utf8')
        const { ok, pack, diagnostics } = compileSingle(`brain/${f}`, src)
        if (!ok || !pack) {
          const errs = diagnostics.filter((d) => d.severity === 'E').map((d) => d.code).join(',') || 'unknown'
          report.failed.push({ file: f, error: `compile failed: ${errs}` })
          continue
        }
        if (!packRegistry.has(pack.manifest.packId)) {
          packRegistry.activate(pack)
        }
        report.activated += 1
      } catch (err) {
        report.failed.push({ file: f, error: err instanceof Error ? err.message : String(err) })
      }
    }
  } catch (err) {
    // Never let a filesystem hiccup break the turn.
    console.warn('[eos-runtime] pack loader skipped:', err)
  }
  loaded = true
  cachedReport = report
  return report
}

/** Test-only: reset the loader so a fresh scan runs next call. */
export function __resetBrainPacksLoaderForTests(): void {
  loaded = false; cachedReport = null; packRegistry.clear()
}
