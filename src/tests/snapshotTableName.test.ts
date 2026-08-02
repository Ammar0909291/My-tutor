import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'
import { LEARN_SESSION_TABLE, SNAPSHOT_VERSION_KEY } from '@/lib/db/snapshotWrite'

/**
 * P14 regression — the bug that froze the entire Brain state pipeline.
 *
 * writeSnapshotDelta is the SOLE writer of LearnSession.contextSnapshot
 * (pinned by snapshotWriterDiscipline.test.ts). Its raw SQL said
 * `UPDATE "LearnSession"`, but prisma/schema.prisma maps that model to the
 * physical table `learn_sessions`. Raw SQL does not go through Prisma's
 * mapping layer, so every write threw 42P01 and was swallowed by the
 * module's own never-throw contract.
 *
 * Verified against production 2026-08-02:
 *   to_regclass('public."LearnSession"')            -> null
 *   sessions carrying the '_v' key this module stamps -> 0 of 130
 * i.e. not one snapshot write had ever landed. Downstream, conversation
 * state, the session episode, the parsed SIGNAL and the concept id all
 * reset every turn, which is why memory never served, the phase never
 * advanced and lesson_attempts stayed empty.
 *
 * Every other test of this module drives a FAKE db, which validates the
 * arguments but never executes the SQL — so none of them could see a wrong
 * table name. This test closes that specific hole by checking the identifier
 * against the schema that defines it.
 */

const SCHEMA = readFileSync(join(process.cwd(), 'prisma', 'schema.prisma'), 'utf8')
const MODULE_SRC = readFileSync(
  join(process.cwd(), 'src', 'lib', 'db', 'snapshotWrite.ts'), 'utf8',
)

/**
 * Comments stripped. The assertions below are about the SQL this module
 * EXECUTES; the doc comments deliberately quote the old broken statement to
 * explain the bug, and matching that prose would be a false positive.
 */
const MODULE_CODE = MODULE_SRC
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/^[ \t]*\/\/.*$/gm, '')

/** The @@map value declared on a Prisma model, or null when unmapped. */
function mappedTableFor(model: string): string | null {
  const block = SCHEMA.match(new RegExp(`model\\s+${model}\\s*\\{[\\s\\S]*?\\n\\}`))
  if (!block) return null
  const map = block[0].match(/@@map\("([^"]+)"\)/)
  return map ? map[1] : null
}

describe('snapshot raw SQL targets the real table', () => {
  it('schema.prisma really does map LearnSession to a different physical name', () => {
    // If this ever fails, the premise of the bug changed — read the schema
    // before trusting anything else in this file.
    const mapped = mappedTableFor('LearnSession')
    expect(mapped).not.toBeNull()
    expect(mapped).not.toBe('LearnSession')
  })

  it('the constant equals the @@map value, not the Prisma model name', () => {
    expect(LEARN_SESSION_TABLE).toBe(mappedTableFor('LearnSession'))
  })

  it('the SQL never names the Prisma model — that table does not exist', () => {
    expect(MODULE_CODE).not.toMatch(/UPDATE\s+"LearnSession"/)
    expect(MODULE_CODE).not.toMatch(/FROM\s+"LearnSession"/)
  })

  it('the UPDATE statement is built from the constant', () => {
    expect(MODULE_CODE).toMatch(/UPDATE\s+"\$\{LEARN_SESSION_TABLE\}"/)
  })

  it('still writes the columns the schema actually declares', () => {
    const block = SCHEMA.match(/model\s+LearnSession\s*\{[\s\S]*?\n\}/)![0]
    expect(block).toMatch(/contextSnapshot/)
    expect(MODULE_CODE).toMatch(/"contextSnapshot"/)
  })

  it('the version key is written and read under the same name', () => {
    expect(SNAPSHOT_VERSION_KEY).toBe('_v')
    expect(MODULE_CODE).toMatch(/\$\{SNAPSHOT_VERSION_KEY\}/)
  })
})

describe('the same mistake is not made anywhere else', () => {
  it('no source file issues raw SQL against a Prisma model name', () => {
    // Collect every @@map'd model, then assert no raw-SQL statement in src/
    // names the MODEL instead of the mapped table.
    const mapped = [...SCHEMA.matchAll(/model\s+(\w+)\s*\{[\s\S]*?@@map\("([^"]+)"\)/g)]
      .map((m) => ({ model: m[1], table: m[2] }))
      .filter((m) => m.model !== m.table)
    expect(mapped.length).toBeGreaterThan(0)

    const offenders: string[] = []
    for (const { model } of mapped) {
      const re = new RegExp(`(UPDATE|INSERT\\s+INTO|DELETE\\s+FROM|FROM)\\s+"${model}"`)
      if (re.test(MODULE_CODE)) offenders.push(`${model} in snapshotWrite.ts`)
    }
    expect(offenders).toEqual([])
  })
})
