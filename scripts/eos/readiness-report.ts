/**
 * CLI for the EOS readiness reader.
 *
 *   npx tsx scripts/eos/readiness-report.ts                 # reads the database
 *   npx tsx scripts/eos/readiness-report.ts --file rows.json  # offline
 *   npx tsx scripts/eos/readiness-report.ts --json          # machine-readable
 *
 * The database path needs a real DATABASE_URL. No session in this sandbox has
 * one, so the aggregation is unit-tested through the --file path instead
 * (src/tests/eosReadinessReader.test.ts) and the query below is deliberately
 * the smallest thing that can be wrong: one findMany, no joins, no writes.
 *
 * READ-ONLY BY CONSTRUCTION. It selects two columns and prints. It never
 * writes, and it must never be given a writing sibling — a reporting tool
 * that can mutate a snapshot is a second writer of the state it reports on.
 */
import { readFileSync } from 'node:fs'
import { aggregate, verdicts, formatReport, type SessionSnapshotRow } from './aggregate'

async function loadFromDatabase(limit: number): Promise<SessionSnapshotRow[]> {
  const { PrismaClient } = await import('@prisma/client')
  const prisma = new PrismaClient()
  try {
    const rows = await prisma.learnSession.findMany({
      where: { contextSnapshot: { not: null } },
      select: { id: true, contextSnapshot: true },
      orderBy: { updatedAt: 'desc' },
      take: limit,
    })
    return rows.map((r) => ({ sessionId: r.id, contextSnapshot: r.contextSnapshot }))
  } finally {
    await prisma.$disconnect()
  }
}

function loadFromFile(path: string): SessionSnapshotRow[] {
  const parsed = JSON.parse(readFileSync(path, 'utf8'))
  if (!Array.isArray(parsed)) throw new Error(`${path}: expected an array of { sessionId, contextSnapshot }`)
  return parsed as SessionSnapshotRow[]
}

async function main() {
  const argv = process.argv.slice(2)
  const fileIdx = argv.indexOf('--file')
  const limitIdx = argv.indexOf('--limit')
  const limit = limitIdx >= 0 ? Number(argv[limitIdx + 1]) : 5000

  const rows = fileIdx >= 0
    ? loadFromFile(argv[fileIdx + 1])
    : await loadFromDatabase(limit)

  const report = aggregate(rows)
  const v = verdicts(report)
  if (argv.includes('--json')) {
    console.log(JSON.stringify({ report, verdicts: v }, null, 2))
  } else {
    console.log(formatReport(report, v))
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : String(err))
  process.exit(1)
})
