import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const before = await prisma.profile.findMany({
    where: { teachingLanguage: 'ru', NOT: { country: 'ru' } },
    select: { userId: true, teachingLanguage: true, country: true },
  })
  console.log('BEFORE — affected rows:', before)

  const result = await prisma.profile.updateMany({
    where: { teachingLanguage: 'ru', NOT: { country: 'ru' } },
    data: { country: 'ru' },
  })
  console.log('Rows updated:', result.count)

  const after = await prisma.profile.findMany({
    where: { userId: { in: before.map((b) => b.userId) } },
    select: { userId: true, teachingLanguage: true, country: true },
  })
  console.log('AFTER — same rows:', after)
}
main().catch((e) => { console.error('DB error:', e.message); process.exit(1) }).finally(() => prisma.$disconnect())
