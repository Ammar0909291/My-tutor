/**
 * DR.6 — Reset auth test data (dev-only, run once, then delete this file).
 *
 * Usage:
 *   npx tsx scripts/dr6-reset-test-data.mts
 *
 * What it does:
 *   1. Prints current User table
 *   2. Deletes listed test users (cascade FK-safe via Prisma's deleteMany)
 *   3. Verifies User count = 0 and no orphan VerificationTokens
 *   4. Creates one clean credential account
 *   5. Verifies the new account is eligible for password reset
 */

import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'
import { POST as forgotPOST } from '@/app/api/auth/forgot-password/route'
import { NextRequest } from 'next/server'

const prisma = new PrismaClient()

const USERS_TO_DELETE = [
  'suaibamr@gmail.com',
  'explorewithpappu@gmail.com',
]

const NEW_USER = {
  name: 'Admin Test',
  email: 'suaibamr2@gmail.com',
  password: 'Test123456!',
}

async function main() {
  // ── TASK 1: inspect User table ──────────────────────────────────────────────
  const allUsers = await prisma.user.findMany({
    select: { id: true, email: true, name: true, passwordHash: true, isDeleted: true },
  })
  console.log(`\n=== TASK 1: User table (${allUsers.length} rows) ===`)
  for (const u of allUsers) {
    console.log(` • ${u.email}  name=${u.name}  hasPassword=${!!u.passwordHash}  isDeleted=${u.isDeleted}`)
  }

  // ── TASK 2 & 3: delete test users + related records ────────────────────────
  // Collect all targets: listed emails + any deleted_* pattern + obvious test accounts
  const toDelete = allUsers
    .filter(u =>
      USERS_TO_DELETE.includes(u.email) ||
      u.email.startsWith('deleted_') ||
      u.isDeleted,
    )
    .map(u => u.email)

  console.log(`\n=== TASK 2: Deleting ${toDelete.length} user(s): ${toDelete.join(', ') || '(none matched)'} ===`)

  if (toDelete.length > 0) {
    // Prisma cascade: User has onDelete:Cascade on most relations; for any
    // that don't, delete dependents first.
    const ids = await prisma.user.findMany({ where: { email: { in: toDelete } }, select: { id: true } })
    const userIds = ids.map(u => u.id)

    // Manually cascade tables that may not have onDelete:Cascade in schema
    await prisma.verificationToken.deleteMany({
      where: { identifier: { in: toDelete.map(e => `password-reset:${e}`) } },
    })
    await prisma.topicProgress.deleteMany({ where: { userId: { in: userIds } } })
    await prisma.studentProgress.deleteMany({ where: { userId: { in: userIds } } })
    await prisma.moduleProgress.deleteMany({ where: { userId: { in: userIds } } })

    // Delete users — schema has Cascade on most relations
    const deleted = await prisma.user.deleteMany({ where: { email: { in: toDelete } } })
    console.log(`Deleted ${deleted.count} user(s) and cascaded related records.`)
  }

  // ── TASK 4: Prisma verification ─────────────────────────────────────────────
  console.log('\n=== TASK 4: Post-delete verification ===')
  const remainingUsers = await prisma.user.count()
  const orphanTokens = await prisma.verificationToken.count({
    where: { identifier: { startsWith: 'password-reset:' } },
  })
  console.log(` User count = ${remainingUsers}`)
  console.log(` Orphan password-reset tokens = ${orphanTokens}`)
  if (remainingUsers !== 0) console.warn(' ⚠️  User table not empty — non-test users may exist (left untouched)')
  if (orphanTokens > 0) console.warn(' ⚠️  Orphan reset tokens remain')

  // ── TASK 5: create fresh credential account ──────────────────────────────────
  console.log(`\n=== TASK 5: Creating credential account: ${NEW_USER.email} ===`)
  const passwordHash = await bcrypt.hash(NEW_USER.password, 12)
  const created = await prisma.user.upsert({
    where: { email: NEW_USER.email },
    update: { name: NEW_USER.name, passwordHash, isDeleted: false, deletedAt: null },
    create: { email: NEW_USER.email, name: NEW_USER.name, passwordHash },
  })
  console.log(` Created user id = ${created.id}`)

  // ── TASK 6: verify account is password-reset eligible ────────────────────────
  console.log('\n=== TASK 6: Verification ===')
  const check = await prisma.user.findUnique({
    where: { email: NEW_USER.email },
    select: { id: true, email: true, passwordHash: true },
  })
  console.log(` User exists:         ${!!check}`)
  console.log(` passwordHash is set: ${!!check?.passwordHash}`)

  // Verify bcrypt.compare (= login succeeds)
  const loginOk = check?.passwordHash ? await bcrypt.compare(NEW_USER.password, check.passwordHash) : false
  console.log(` Login (bcrypt):      ${loginOk ? 'PASS ✅' : 'FAIL ❌'}`)

  // Trigger real forgot-password route to prove sendPasswordResetEmail() is reached
  await prisma.verificationToken.deleteMany({ where: { identifier: `password-reset:${NEW_USER.email}` } })
  const req = new NextRequest('http://localhost/api/auth/forgot-password', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-forwarded-for': '127.0.0.1' },
    body: JSON.stringify({ email: NEW_USER.email }),
  })
  console.log('\n--- Triggering forgot-password route (watch for [email:diag] output) ---')
  const res = await forgotPOST(req)
  console.log(`Route HTTP ${res.status}:`, JSON.stringify(await res.json()))

  const token = await prisma.verificationToken.findFirst({
    where: { identifier: `password-reset:${NEW_USER.email}` },
  })
  console.log(` VerificationToken created: ${!!token}  ${token ? '(token=' + token.token.slice(0, 12) + '…)' : ''}`)

  // ── TASK 7: summary report ───────────────────────────────────────────────────
  console.log('\n=== TASK 7: Summary ===')
  console.log(` Deleted users count: ${toDelete.length}`)
  console.log(` Created user ID:     ${created.id}`)
  console.log(` passwordHash:        ${!!check?.passwordHash ? 'YES ✅' : 'NO ❌'}`)

  await prisma.$disconnect()
}

main().catch(async e => {
  console.error('Script error:', e)
  await prisma.$disconnect()
  process.exit(1)
})
