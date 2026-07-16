/**
 * Package Runtime — Phase 1: Educational Package Loader.
 *
 * Loads ONE compiled DRAFT package artifact from brain/packages/ and
 * validates it completely before anything downstream may read it:
 *
 *   1. Structural shape (manifest/rulePack/assets present, conceptId match)
 *   2. Schema version   (manifest.compiler ∈ SUPPORTED_PACKAGE_COMPILERS)
 *   3. Package version  (semver format)
 *   4. Status           (DRAFT expected in this phase — ACTIVE does not
 *                        exist yet and is rejected rather than trusted)
 *   5. Integrity        (BOTH hashes recomputed via the existing
 *                        brain-compiler canonicalJsonHash:
 *                        rule layer: hash(rulePack.rules) must equal
 *                          rulePack.manifest.contentHash — the same check
 *                          the .bs loader performs;
 *                        package:    hash({ruleContentHash, assets}) must
 *                          equal manifest.contentHash)
 *
 * Never activates anything: no packRegistry call exists in this module.
 * Never reads blueprint markdown: the only I/O is the .package.json artifact.
 * Never throws: failures surface as { ok: false, reason }.
 */
import fs from 'fs'
import path from 'path'
import { canonicalJsonHash } from '@/lib/brain-compiler/hash'
import type { EducationalPackage, PackageLoadResult } from './types'
import { SUPPORTED_PACKAGE_COMPILERS } from './types'

const SEMVER_RE = /^[0-9]+\.[0-9]+\.[0-9]+(?:-[A-Za-z0-9.\-]+)?$/

const packageCache = new Map<string, EducationalPackage>()

export function packageArtifactPath(conceptId: string): string {
  return path.join(process.cwd(), 'brain', 'packages', `${conceptId}.package.json`)
}

/** True when a compiled artifact exists for the concept (cheap existence
 *  probe for the serving seam — full validation happens on load). */
export function hasPackageArtifact(conceptId: string): boolean {
  return packageCache.has(conceptId) || fs.existsSync(packageArtifactPath(conceptId))
}

export function clearPackageCache(): void {
  packageCache.clear()
}

export function loadEducationalPackage(conceptId: string): PackageLoadResult {
  const cached = packageCache.get(conceptId)
  if (cached) return { ok: true, pkg: cached }

  const filePath = packageArtifactPath(conceptId)
  if (!fs.existsSync(filePath)) {
    return { ok: false, reason: `no package artifact for "${conceptId}" at ${filePath}` }
  }

  let raw: string
  try {
    raw = fs.readFileSync(filePath, 'utf-8')
  } catch (err) {
    return { ok: false, reason: `failed to read package artifact: ${String(err)}` }
  }

  let pkg: EducationalPackage
  try {
    pkg = JSON.parse(raw) as EducationalPackage
  } catch (err) {
    return { ok: false, reason: `package artifact is not valid JSON: ${String(err)}` }
  }

  const validation = validateEducationalPackage(conceptId, pkg)
  if (validation) return { ok: false, reason: validation }

  packageCache.set(conceptId, pkg)
  return { ok: true, pkg }
}

/** Full validation chain. Returns null when valid, else the failure reason.
 *  Exported so tests can exercise each gate against tampered packages. */
export function validateEducationalPackage(conceptId: string, pkg: EducationalPackage): string | null {
  // 1 — structural shape
  if (!pkg || typeof pkg !== 'object') return 'package is not an object'
  if (!pkg.manifest || typeof pkg.manifest !== 'object') return 'missing manifest'
  if (!pkg.rulePack || !Array.isArray(pkg.rulePack.rules) || !pkg.rulePack.manifest) return 'missing or malformed rulePack'
  if (!Array.isArray(pkg.assets)) return 'missing assets array'
  if (pkg.manifest.conceptId !== conceptId) {
    return `conceptId mismatch: artifact says "${pkg.manifest.conceptId}", requested "${conceptId}"`
  }

  // 2 — schema version (compiler id gate)
  if (!SUPPORTED_PACKAGE_COMPILERS.includes(pkg.manifest.compiler)) {
    return `unsupported package compiler "${pkg.manifest.compiler}" (supported: ${SUPPORTED_PACKAGE_COMPILERS.join(', ')})`
  }

  // 3 — package version
  if (!SEMVER_RE.test(pkg.manifest.packageVersion)) {
    return `invalid packageVersion "${pkg.manifest.packageVersion}" (expected semver)`
  }

  // 4 — status: this phase serves DRAFT proofs only; anything else is
  // rejected rather than silently accepted (activation is a later, gated phase).
  if (pkg.status !== 'DRAFT') {
    return `unexpected package status "${pkg.status}" (this runtime phase loads DRAFT packages only)`
  }

  // 5a — rule-layer integrity (same recomputation the .bs loader performs)
  const ruleHash = canonicalJsonHash(pkg.rulePack.rules)
  if (ruleHash !== pkg.rulePack.manifest.contentHash) {
    return `rule-layer integrity failure: recomputed ${ruleHash}, manifest says ${pkg.rulePack.manifest.contentHash}`
  }

  // 5b — whole-package integrity (rule hash + every asset, canonicalized)
  const packageHash = canonicalJsonHash({ ruleContentHash: pkg.rulePack.manifest.contentHash, assets: pkg.assets })
  if (packageHash !== pkg.manifest.contentHash) {
    return `package integrity failure: recomputed ${packageHash}, manifest says ${pkg.manifest.contentHash}`
  }

  return null
}
