/**
 * Pre-flight duplicate-identity validation for the Educational Brain seed
 * writers (Remediation Item 3).
 *
 * THE PROBLEM THIS REPLACES
 * -------------------------
 * Every seed writer deduplicates like this:
 *
 *     const existing = await prisma.assetIdentity.findFirst({ where: { canonicalSlug } })
 *     if (existing) { skipped++; continue }
 *
 * That is correct as *re-run* idempotency, but it is also, silently, the
 * behaviour when two DIFFERENT authored assets map to the SAME canonical
 * identity: the first one inserted wins, every later one is dropped, and the
 * only trace is a "skip (exists)" line indistinguishable from a legitimate
 * re-run. Authored content disappears between the repository and the database
 * with no error and a zero exit code.
 *
 * This module makes that condition loud and fatal BEFORE any row is written.
 * It does not choose a winner, does not deduplicate, and does not alter
 * canonicalSlug — a colliding dataset is treated as invalid input that a human
 * must resolve, because only a human can know which of two real assets was
 * intended.
 *
 * WHY IDENTITIES ARE COMPARED ACROSS FAMILIES
 * -------------------------------------------
 * The writers' `findFirst({ where: { canonicalSlug } })` carries no `family`
 * predicate, so an EXPLANATION and a PROBE that produced the same slug would
 * collide in exactly the same way. To model what the writer will actually do,
 * explanations and probes are validated as ONE namespace, not two.
 *
 * Pure and dependency-free (no Prisma, no I/O) so it can run before a client
 * is constructed and be unit-tested directly.
 */

export type SeedFamily = 'EXPLANATION' | 'PROBE'

/** One authored item, reduced to the identity the writer will insert under. */
export interface SeedIdentityInput {
  /** Built with the SAME seedCanonicalSlug() call the writer uses. */
  canonicalSlug: string
  family: SeedFamily
  conceptId: string
  subjectSlug: string
  /** ExplanationKind for explanations, ProbeKind for probes. */
  familyKind: string
  gradeBand: string
  /** Short excerpt so the report names WHICH asset, not merely which slug. */
  preview: string
  /** Provenance line carried on the seed item, when present. */
  source?: string
}

export interface SeedIdentityConflict {
  canonicalSlug: string
  /** In writer iteration order: index 0 is the one that would have won. */
  items: SeedIdentityInput[]
}

export interface SeedIdentityValidation {
  ok: boolean
  totalItems: number
  distinctIdentities: number
  /** Items the writer's skip-on-slug dedup would have silently discarded. */
  discardedItems: number
  /** Sorted by canonicalSlug — the report is byte-stable across runs. */
  conflicts: SeedIdentityConflict[]
}

const PREVIEW_CHARS = 88

/** Collapse an asset body to a single-line excerpt for the report. */
export function previewOf(text: string): string {
  const flat = text.replace(/\s+/g, ' ').trim()
  return flat.length <= PREVIEW_CHARS ? flat : `${flat.slice(0, PREVIEW_CHARS)}…`
}

/**
 * Group the incoming dataset by canonical identity and report every identity
 * claimed more than once. Input order is preserved within a group so the
 * report can show which item the current writer would have kept.
 */
export function validateSeedIdentities(
  items: readonly SeedIdentityInput[],
): SeedIdentityValidation {
  const bySlug = new Map<string, SeedIdentityInput[]>()
  for (const item of items) {
    const group = bySlug.get(item.canonicalSlug)
    if (group) group.push(item)
    else bySlug.set(item.canonicalSlug, [item])
  }

  const conflicts: SeedIdentityConflict[] = []
  for (const [canonicalSlug, group] of bySlug) {
    if (group.length > 1) conflicts.push({ canonicalSlug, items: group })
  }
  // Deterministic ordering: Map preserves insertion order, which depends on
  // array composition, so sort explicitly to make the report reproducible.
  conflicts.sort((a, b) => (a.canonicalSlug < b.canonicalSlug ? -1 : a.canonicalSlug > b.canonicalSlug ? 1 : 0))

  const discardedItems = items.length - bySlug.size

  return {
    ok: conflicts.length === 0,
    totalItems: items.length,
    distinctIdentities: bySlug.size,
    discardedItems,
    conflicts,
  }
}

export interface ReportOptions {
  /**
   * Cap the number of conflict groups printed. Operator-facing scripts leave
   * this unbounded (the whole point is an actionable list); the server-side
   * cold-start bootstrap bounds it, because an unbounded dump would repeat on
   * every cold start.
   */
  maxConflicts?: number
  /** Label identifying which writer produced the report. */
  writer?: string
}

/** Human-readable, deterministic, copy-pasteable failure report. */
export function formatSeedIdentityReport(
  v: SeedIdentityValidation,
  options: ReportOptions = {},
): string {
  const { maxConflicts = Number.POSITIVE_INFINITY, writer } = options
  if (v.ok) {
    return `seed identity validation PASSED — ${v.totalItems} items, ${v.distinctIdentities} distinct identities, 0 duplicates`
  }

  const lines: string[] = []
  lines.push('')
  lines.push('═'.repeat(78))
  lines.push(`SEED IDENTITY VALIDATION FAILED${writer ? ` — ${writer}` : ''}`)
  lines.push('═'.repeat(78))
  lines.push('')
  lines.push(
    `${v.conflicts.length} canonical identities are claimed by more than one authored asset.`,
  )
  lines.push(
    `Seeding would silently discard ${v.discardedItems} of ${v.totalItems} items ` +
      `(${v.distinctIdentities} would survive).`,
  )
  lines.push('')
  lines.push('Refusing to write any row. No database changes have been made.')
  lines.push('')

  const shown = v.conflicts.slice(0, maxConflicts)
  for (const c of shown) {
    lines.push('─'.repeat(78))
    lines.push(`identity: ${c.canonicalSlug}`)
    lines.push(`  ${c.items.length} assets claim it; ${c.items.length - 1} would be discarded.`)
    c.items.forEach((item, i) => {
      const fate = i === 0 ? 'KEPT     ' : 'DISCARDED'
      lines.push(
        `  [${i + 1}] ${fate} ${item.subjectSlug} · ${item.family} · ${item.familyKind} · ${item.gradeBand}`,
      )
      lines.push(`      "${item.preview}"`)
      if (item.source) lines.push(`      src: ${item.source}`)
    })
  }

  if (v.conflicts.length > shown.length) {
    lines.push('─'.repeat(78))
    lines.push(
      `… and ${v.conflicts.length - shown.length} further duplicate identities not shown here.`,
    )
    lines.push('Run a seed script directly for the complete, unbounded report.')
  }

  lines.push('═'.repeat(78))
  lines.push(
    `TOTAL: ${v.conflicts.length} duplicate identities · ${v.discardedItems} assets would be discarded · 0 rows written`,
  )
  lines.push('')
  lines.push('Resolve by giving each asset a distinct identity (concept, kind or')
  lines.push('gradeBand), or by removing the redundant asset. This validator will')
  lines.push('not choose for you: both items are real authored content.')
  lines.push('═'.repeat(78))
  lines.push('')

  return lines.join('\n')
}
