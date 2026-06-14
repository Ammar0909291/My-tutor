'use server'
import { prisma } from '@/lib/db/prisma'
import { requireAdmin } from '@/lib/auth/admin'
import { revalidatePath } from 'next/cache'

export async function promoteUser(userId: string) {
  await requireAdmin()
  await prisma.user.update({ where: { id: userId }, data: { role: 'ADMIN' } })
  revalidatePath('/admin/users')
}

export async function demoteUser(userId: string) {
  await requireAdmin()
  await prisma.user.update({ where: { id: userId }, data: { role: 'STUDENT' } })
  revalidatePath('/admin/users')
}

export async function disableUser(userId: string) {
  await requireAdmin()
  await prisma.user.update({ where: { id: userId }, data: { isDeleted: true, deletedAt: new Date() } })
  revalidatePath('/admin/users')
}

export async function enableUser(userId: string) {
  await requireAdmin()
  await prisma.user.update({ where: { id: userId }, data: { isDeleted: false, deletedAt: null } })
  revalidatePath('/admin/users')
}
