import { prisma } from '../lib/db/prisma'

async function fix() {
  try {
    await prisma.$executeRaw`
      ALTER TABLE profiles
      ADD COLUMN IF NOT EXISTS country VARCHAR(10) DEFAULT 'global'
    `
    console.log('✅ Column added successfully')
  } catch (error: any) {
    console.log('Column may already exist:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

fix()
