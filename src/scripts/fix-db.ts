import { prisma } from '../lib/db/prisma'

async function main() {
  const cols = [
    [`ALTER TABLE profiles ADD COLUMN IF NOT EXISTS country VARCHAR(10) DEFAULT 'global'`],
    [`ALTER TABLE profiles ADD COLUMN IF NOT EXISTS "voicePreference" TEXT DEFAULT 'female'`],
    [`ALTER TABLE profiles ADD COLUMN IF NOT EXISTS "levelDescription" TEXT`],
  ]

  for (const [sql] of cols) {
    try {
      await prisma.$executeRawUnsafe(sql)
      console.log('✅', sql.slice(0, 60))
    } catch (e: any) {
      console.log('⚠ (already exists?):', e.message?.slice(0, 80))
    }
  }

  await prisma.$disconnect()
}

main()
